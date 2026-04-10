/**
 * API安全处理器
 * 统一管理所有API调用，包含安全验证、错误处理、请求限流等
 */

class SecureAPIHandler {
    constructor() {
        this.requestQueue = [];
        this.rateLimits = {
            default: { maxRequests: 60, windowMs: 60000 },
            openai: { maxRequests: 50, windowMs: 60000 },
            anthropic: { maxRequests: 30, windowMs: 60000 },
            baidu: { maxRequests: 100, windowMs: 60000 }
        };
        this.requestHistory = {};
        this.maxRetries = 3;
        this.timeout = 30000;
    }

    /**
     * 发送安全的API请求
     */
    async sendRequest(config) {
        const {
            url,
            method = 'POST',
            headers = {},
            body,
            model,
            retries = this.maxRetries
        } = config;

        // 1. 输入验证
        if (!url || typeof url !== 'string') {
            throw new Error('无效的API地址');
        }

        if (!this.isValidUrl(url)) {
            throw new Error('API地址格式不安全');
        }

        // 2. API密钥验证
        const apiKey = this.getAPIKey(headers);
        if (!apiKey) {
            throw new Error('API密钥缺失');
        }

        // 3. 限流检查
        const provider = this.detectProvider(url);
        if (!this.checkRateLimit(provider)) {
            throw new Error('请求过于频繁，请稍后再试');
        }

        // 4. 发送请求（带重试）
        let lastError;
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const result = await this.executeRequest({
                    url,
                    method,
                    headers,
                    body,
                    timeout: this.timeout
                });

                // 记录成功请求
                this.recordRequest(provider);

                return result;

            } catch (error) {
                lastError = error;

                // 如果是网络错误或超时，尝试重试
                if (this.isRetryableError(error) && attempt < retries - 1) {
                    await this.delay(Math.pow(2, attempt) * 1000);
                    continue;
                }

                // 其他错误直接抛出
                throw error;
            }
        }

        throw lastError;
    }

    /**
     * 执行实际的HTTP请求
     */
    async executeRequest(config) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);

        try {
            const response = await fetch(config.url, {
                method: config.method,
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/json'
                },
                body: config.body ? JSON.stringify(config.body) : undefined,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // 检查响应状态
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new APIError(
                    errorData.error?.message || `HTTP ${response.status}`,
                    response.status,
                    errorData
                );
            }

            const data = await response.json();
            return this.normalizeResponse(data, config.url);

        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('请求超时');
            }

            throw error;
        }
    }

    /**
     * 标准化API响应
     */
    normalizeResponse(data, url) {
        // OpenAI 格式
        if (url.includes('openai.com')) {
            return {
                success: true,
                content: data.choices?.[0]?.message?.content || '',
                usage: data.usage,
                model: data.model
            };
        }

        // Anthropic 格式
        if (url.includes('anthropic.com')) {
            return {
                success: true,
                content: data.content?.[0]?.text || '',
                usage: {
                    input_tokens: data.usage?.input_tokens,
                    output_tokens: data.usage?.output_tokens
                },
                model: 'claude'
            };
        }

        // 百度文心一言格式
        if (url.includes('baidubce.com')) {
            return {
                success: true,
                content: data.result || '',
                usage: {},
                model: 'ernie'
            };
        }

        // 阿里通义千问格式
        if (url.includes('aliyuncs.com') || url.includes('dashscope')) {
            return {
                success: true,
                content: data.output?.text || data.output?.choices?.[0]?.text || '',
                usage: data.usage,
                model: 'qwen'
            };
        }

        // 默认格式
        return {
            success: true,
            content: data.content || data.text || data.result || JSON.stringify(data),
            usage: data.usage || {},
            model: 'unknown'
        };
    }

    /**
     * 获取API密钥
     */
    getAPIKey(headers) {
        const authHeader = headers['Authorization'] || headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }

        const apiKeyHeader = headers['x-api-key'] || headers['X-Api-Key'];
        if (apiKeyHeader) {
            return apiKeyHeader;
        }

        return null;
    }

    /**
     * 验证URL安全性
     */
    isValidUrl(url) {
        try {
            const parsed = new URL(url);

            // 只允许HTTPS
            if (parsed.protocol !== 'https:') {
                return false;
            }

            // 检查域名白名单
            const allowedDomains = [
                'api.openai.com',
                'api.anthropic.com',
                'generativelanguage.googleapis.com',
                'aip.baidubce.com',
                'dashscope.aliyuncs.com',
                'hunyuan.cloud.tencent.com',
                'ark.cn-beijing.volces.com',
                'api.minimax.chat',
                'api.moonshot.cn',
                'open.bigmodel.cn',
                'api.deepseek.com',
                'api.lingyiwanwu.com'
            ];

            const hostname = parsed.hostname.toLowerCase();
            return allowedDomains.some(domain => 
                hostname === domain || hostname.endsWith('.' + domain)
            );

        } catch (e) {
            return false;
        }
    }

    /**
     * 检测API提供商
     */
    detectProvider(url) {
        if (url.includes('openai.com')) return 'openai';
        if (url.includes('anthropic.com')) return 'anthropic';
        if (url.includes('baidubce.com')) return 'baidu';
        if (url.includes('aliyuncs.com') || url.includes('dashscope')) return 'ali';
        if (url.includes('tencent')) return 'tencent';
        if (url.includes('moonshot')) return 'moonshot';
        if (url.includes('deepseek')) return 'deepseek';
        return 'default';
    }

    /**
     * 检查限流
     */
    checkRateLimit(provider) {
        const limit = this.rateLimits[provider] || this.rateLimits.default;
        const now = Date.now();

        if (!this.requestHistory[provider]) {
            this.requestHistory[provider] = [];
        }

        // 清理过期记录
        this.requestHistory[provider] = this.requestHistory[provider].filter(
            time => now - time < limit.windowMs
        );

        // 检查是否超限
        if (this.requestHistory[provider].length >= limit.maxRequests) {
            return false;
        }

        return true;
    }

    /**
     * 记录请求
     */
    recordRequest(provider) {
        if (!this.requestHistory[provider]) {
            this.requestHistory[provider] = [];
        }
        this.requestHistory[provider].push(Date.now());
    }

    /**
     * 判断是否为可重试的错误
     */
    isRetryableError(error) {
        if (error.message?.includes('timeout')) return true;
        if (error.message?.includes('network')) return true;
        if (error.status === 429) return true;  // Rate limit
        if (error.status >= 500) return true;   // Server error
        return false;
    }

    /**
     * 延迟函数
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 构建ChatGPT请求
     */
    buildOpenAIRequest(messages, params = {}) {
        return {
            model: params.model || 'gpt-4',
            messages: messages.map(msg => ({
                role: msg.role || 'user',
                content: msg.content
            })),
            temperature: params.temperature ?? 0.7,
            max_tokens: params.max_tokens ?? 2000,
            top_p: params.top_p ?? 1.0,
            frequency_penalty: params.frequency_penalty ?? 0.0,
            presence_penalty: params.presence_penalty ?? 0.0
        };
    }

    /**
     * 构建Claude请求
     */
    buildClaudeRequest(messages, params = {}) {
        const systemMessage = messages.find(m => m.role === 'system');
        const userMessages = messages.filter(m => m.role !== 'system');

        return {
            model: params.model || 'claude-3-opus-20240229',
            messages: userMessages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            system: systemMessage?.content,
            max_tokens: params.max_tokens ?? 2000,
            temperature: params.temperature ?? 0.7
        };
    }

    /**
     * 构建百度请求
     */
    buildBaiduRequest(messages, params = {}) {
        return {
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            stream: false
        };
    }

    /**
     * 构建阿里请求
     */
    buildAliRequest(messages, params = {}) {
        return {
            model: params.model || 'qwen-turbo',
            input: {
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            },
            parameters: {
                temperature: params.temperature ?? 0.7,
                max_tokens: params.max_tokens ?? 2000
            }
        };
    }
}

/**
 * API错误类
 */
class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

// 导出单例
const secureAPIHandler = new SecureAPIHandler();
