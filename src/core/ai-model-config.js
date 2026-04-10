/**
 * AI模型配置系统 - v2.0
 * 支持多种AI模型的自定义配置、参数调整、训练数据选择
 * 
 * 功能特性：
 * - 多模型支持（OpenAI、Anthropic、Google、国产大模型）
 * - 自定义参数配置（Temperature、Max Tokens、Top P等）
 * - 模型切换与配置保存
 * - API密钥安全管理
 */

class AIModelConfig {
    constructor() {
        this.models = this.initializeModels();
        this.currentModel = this.loadCurrentModel();
        this.customModels = this.loadCustomModels();
    }

    /**
     * 初始化所有支持的AI模型
     */
    initializeModels() {
        return {
            // ========== 国际大模型 ==========
            openai_gpt4: {
                id: 'openai_gpt4',
                name: 'GPT-4',
                provider: 'OpenAI',
                providerName: 'OpenAI',
                icon: '🤖',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0
                },
                paramRanges: {
                    temperature: { min: 0, max: 2, step: 0.1 },
                    max_tokens: { min: 100, max: 8000, step: 100 },
                    top_p: { min: 0, max: 1, step: 0.05 }
                },
                capabilities: ['chat', 'completion', 'function_calling'],
                contextWindow: 128000,
                description: '最强大的通用语言模型'
            },
            openai_gpt35: {
                id: 'openai_gpt35',
                name: 'GPT-3.5-Turbo',
                provider: 'OpenAI',
                providerName: 'OpenAI',
                icon: '🤖',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000,
                    top_p: 1.0
                },
                paramRanges: {
                    temperature: { min: 0, max: 2, step: 0.1 },
                    max_tokens: { min: 100, max: 4000, step: 100 }
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 16000,
                description: '快速、经济的对话模型'
            },
            anthropic_claude3: {
                id: 'anthropic_claude3',
                name: 'Claude-3',
                provider: 'Anthropic',
                providerName: 'Anthropic',
                icon: '🧠',
                endpoint: 'https://api.anthropic.com/v1/messages',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000,
                    top_p: 1.0
                },
                paramRanges: {
                    temperature: { min: 0, max: 1, step: 0.1 },
                    max_tokens: { min: 100, max: 4000, step: 100 }
                },
                capabilities: ['chat', 'completion', 'vision'],
                contextWindow: 200000,
                description: '长上下文处理能力强'
            },
            anthropic_claude3opus: {
                id: 'anthropic_claude3opus',
                name: 'Claude-3 Opus',
                provider: 'Anthropic',
                providerName: 'Anthropic',
                icon: '🧠',
                endpoint: 'https://api.anthropic.com/v1/messages',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'vision', 'code'],
                contextWindow: 200000,
                description: '最强大的Claude模型'
            },
            anthropic_claude3sonnet: {
                id: 'anthropic_claude3sonnet',
                name: 'Claude-3 Sonnet',
                provider: 'Anthropic',
                providerName: 'Anthropic',
                icon: '🧠',
                endpoint: 'https://api.anthropic.com/v1/messages',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'vision'],
                contextWindow: 200000,
                description: '平衡性能与速度'
            },
            google_gemini: {
                id: 'google_gemini',
                name: 'Gemini Pro',
                provider: 'Google',
                providerName: 'Google AI',
                icon: '💎',
                endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
                defaultParams: {
                    temperature: 0.7,
                    maxOutputTokens: 2000
                },
                capabilities: ['chat', 'completion', 'vision', 'multimodal'],
                contextWindow: 32000,
                description: '多模态能力强'
            },
            google_geminiultra: {
                id: 'google_geminiultra',
                name: 'Gemini Ultra',
                provider: 'Google',
                providerName: 'Google AI',
                icon: '💎',
                endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-ultra:generateContent',
                defaultParams: {
                    temperature: 0.7,
                    maxOutputTokens: 2000
                },
                capabilities: ['chat', 'completion', 'vision', 'multimodal', 'code'],
                contextWindow: 32000,
                description: '最强大的Gemini模型'
            },
            meta_llama: {
                id: 'meta_llama',
                name: 'Llama 3',
                provider: 'Meta',
                providerName: 'Meta AI',
                icon: '🦙',
                endpoint: 'https://api.together.xyz/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 8000,
                description: '开源大语言模型'
            },

            // ========== 国产大模型 ==========
            baidu_ernie4: {
                id: 'baidu_ernie4',
                name: '文心一言4.0',
                provider: 'Baidu',
                providerName: '百度',
                icon: '🌐',
                endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'function_calling'],
                contextWindow: 3000,
                description: '百度最新一代大语言模型'
            },
            baidu_ernie3: {
                id: 'baidu_ernie3',
                name: '文心一言3.5',
                provider: 'Baidu',
                providerName: '百度',
                icon: '🌐',
                endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 3000,
                description: '百度主力语言模型'
            },
            ali_qwen: {
                id: 'ali_qwen',
                name: '通义千问2',
                provider: 'Alibaba',
                providerName: '阿里云',
                icon: '☁️',
                endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'function_calling'],
                contextWindow: 32000,
                description: '阿里云最新大语言模型'
            },
            ali_qwenlong: {
                id: 'ali_qwenlong',
                name: '通义千问Long',
                provider: 'Alibaba',
                providerName: '阿里云',
                icon: '☁️',
                endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'long_context'],
                contextWindow: 100000,
                description: '支持超长上下文'
            },
            tencent_hunyuan: {
                id: 'tencent_hunyuan',
                name: '混元大模型',
                provider: 'Tencent',
                providerName: '腾讯云',
                icon: '🐧',
                endpoint: 'https://hunyuan.cloud.tencent.com/api/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 16000,
                description: '腾讯云大语言模型'
            },
            tencent_hunyuanpro: {
                id: 'tencent_hunyuanpro',
                name: '混元Pro',
                provider: 'Tencent',
                providerName: '腾讯云',
                icon: '🐧',
                endpoint: 'https://hunyuan.cloud.tencent.com/api/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'function_calling'],
                contextWindow: 16000,
                description: '腾讯云增强版大模型'
            },
            byte_doubao: {
                id: 'byte_doubao',
                name: '豆包大模型',
                provider: 'ByteDance',
                providerName: '字节跳动',
                icon: '🎵',
                endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 32000,
                description: '字节跳动火山引擎大模型'
            },
            minimax_abab: {
                id: 'minimax_abab',
                name: 'ABAB大模型',
                provider: 'MiniMax',
                providerName: 'MiniMax',
                icon: '🔵',
                endpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 16000,
                description: 'MiniMax自研大模型'
            },
            moonshot_v1: {
                id: 'moonshot_v1',
                name: 'Kimi V1',
                provider: 'Moonshot',
                providerName: 'Moonshot AI',
                icon: '🌙',
                endpoint: 'https://api.moonshot.cn/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'long_context'],
                contextWindow: 128000,
                description: '超长上下文支持，Kimi'
            },
            moonshot_v1_32k: {
                id: 'moonshot_v1_32k',
                name: 'Kimi 32K',
                provider: 'Moonshot',
                providerName: 'Moonshot AI',
                icon: '🌙',
                endpoint: 'https://api.moonshot.cn/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 32000,
                description: '32K上下文版本'
            },
            zhipu_glm4: {
                id: 'zhipu_glm4',
                name: 'GLM-4',
                provider: 'Zhipu AI',
                providerName: '智谱AI',
                icon: '⚡',
                endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'function_calling'],
                contextWindow: 128000,
                description: '智谱最新大语言模型'
            },
            zhipu_glm3: {
                id: 'zhipu_glm3',
                name: 'GLM-3',
                provider: 'Zhipu AI',
                providerName: '智谱AI',
                icon: '⚡',
                endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 32000,
                description: '智谱经典语言模型'
            },
            deepseek_chat: {
                id: 'deepseek_chat',
                name: 'DeepSeek Chat',
                provider: 'DeepSeek',
                providerName: 'DeepSeek',
                icon: '🔍',
                endpoint: 'https://api.deepseek.com/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion', 'code', 'math'],
                contextWindow: 32000,
                description: '深度求索对话模型'
            },
            deepseek_coder: {
                id: 'deepseek_coder',
                name: 'DeepSeek Coder',
                provider: 'DeepSeek',
                providerName: 'DeepSeek',
                icon: '🔍',
                endpoint: 'https://api.deepseek.com/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['code', 'completion'],
                contextWindow: 16000,
                description: '代码专用大模型'
            },
            yi_coder: {
                id: 'yi_coder',
                name: 'Yi-Coder',
                provider: 'ZeroOneAll',
                providerName: '零一万物',
                icon: '0️⃣',
                endpoint: 'https://api.lingyiwanwu.com/v1/chat/completions',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['code', 'chat'],
                contextWindow: 16000,
                description: '零一万物编程助手'
            },
            qwen_coder: {
                id: 'qwen_coder',
                name: '通义灵码',
                provider: 'Alibaba',
                providerName: '阿里云',
                icon: '☁️',
                endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['code', 'chat'],
                contextWindow: 8000,
                description: '阿里云代码助手'
            },

            // ========== 专业领域模型 ==========
            medical_gpt: {
                id: 'medical_gpt',
                name: '医疗大模型',
                provider: 'Medical AI',
                providerName: '医疗AI',
                icon: '🏥',
                endpoint: 'custom',
                defaultParams: {
                    temperature: 0.5,
                    max_tokens: 3000
                },
                capabilities: ['medical', 'diagnosis', 'prescription'],
                contextWindow: 8000,
                description: '专业医疗健康咨询'
            },
            mental_health_gpt: {
                id: 'mental_health_gpt',
                name: '心理健康大模型',
                provider: 'Mental Health AI',
                providerName: '心理健康AI',
                icon: '🧠',
                endpoint: 'custom',
                defaultParams: {
                    temperature: 0.6,
                    max_tokens: 2500
                },
                capabilities: ['psychology', 'counseling', 'therapy'],
                contextWindow: 8000,
                description: '专业心理健康支持'
            },
            nutrition_gpt: {
                id: 'nutrition_gpt',
                name: '营养健康大模型',
                provider: 'Nutrition AI',
                providerName: '营养AI',
                icon: '🥗',
                endpoint: 'custom',
                defaultParams: {
                    temperature: 0.6,
                    max_tokens: 2000
                },
                capabilities: ['nutrition', 'diet', 'health'],
                contextWindow: 4000,
                description: '专业营养健康建议'
            },

            // ========== 自定义模型 ==========
            custom: {
                id: 'custom',
                name: '自定义模型',
                provider: 'Custom',
                providerName: '自定义',
                icon: '🔧',
                endpoint: 'user_defined',
                defaultParams: {
                    temperature: 0.7,
                    max_tokens: 2000
                },
                capabilities: ['chat', 'completion'],
                contextWindow: 4000,
                description: '使用您自己的模型配置'
            }
        };
    }

    /**
     * 获取当前选中的模型
     */
    getCurrentModel() {
        return this.currentModel || this.models.openai_gpt4;
    }

    /**
     * 设置当前模型
     */
    setCurrentModel(modelId) {
        const model = this.models[modelId];
        if (model) {
            this.currentModel = model;
            this.saveCurrentModel(modelId);
            return true;
        }
        return false;
    }

    /**
     * 获取模型的默认参数
     */
    getDefaultParams(modelId) {
        const model = this.models[modelId];
        return model ? { ...model.defaultParams } : null;
    }

    /**
     * 获取参数范围
     */
    getParamRanges(modelId, paramName) {
        const model = this.models[modelId];
        if (model && model.paramRanges && model.paramRanges[paramName]) {
            return model.paramRanges[paramName];
        }
        return null;
    }

    /**
     * 添加自定义模型
     */
    addCustomModel(config) {
        const id = `custom_${Date.now()}`;
        this.customModels[id] = {
            ...config,
            id,
            isCustom: true
        };
        this.saveCustomModels();
        return id;
    }

    /**
     * 删除自定义模型
     */
    deleteCustomModel(id) {
        if (this.customModels[id]) {
            delete this.customModels[id];
            this.saveCustomModels();
            return true;
        }
        return false;
    }

    /**
     * 获取所有自定义模型
     */
    getCustomModels() {
        return this.customModels;
    }

    /**
     * 导出模型配置
     */
    exportConfig() {
        return {
            currentModelId: this.currentModel?.id,
            customModels: this.customModels
        };
    }

    /**
     * 导入模型配置
     */
    importConfig(config) {
        if (config.currentModelId) {
            this.setCurrentModel(config.currentModelId);
        }
        if (config.customModels) {
            this.customModels = config.customModels;
            this.saveCustomModels();
        }
    }

    /**
     * 保存当前模型到本地存储
     */
    saveCurrentModel(modelId) {
        try {
            localStorage.setItem('ai_current_model', JSON.stringify(modelId));
        } catch (e) {
            console.error('Failed to save model preference:', e);
        }
    }

    /**
     * 从本地存储加载当前模型
     */
    loadCurrentModel() {
        try {
            const saved = localStorage.getItem('ai_current_model');
            if (saved) {
                const modelId = JSON.parse(saved);
                return this.models[modelId] || this.models.openai_gpt4;
            }
        } catch (e) {
            console.error('Failed to load model preference:', e);
        }
        return this.models.openai_gpt4;
    }

    /**
     * 保存自定义模型到本地存储
     */
    saveCustomModels() {
        try {
            localStorage.setItem('ai_custom_models', JSON.stringify(this.customModels));
        } catch (e) {
            console.error('Failed to save custom models:', e);
        }
    }

    /**
     * 从本地存储加载自定义模型
     */
    loadCustomModels() {
        try {
            const saved = localStorage.getItem('ai_custom_models');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load custom models:', e);
        }
        return {};
    }

    /**
     * 获取按提供商分组的模型列表
     */
    getModelsByProvider() {
        const grouped = {};
        Object.values(this.models).forEach(model => {
            if (!grouped[model.provider]) {
                grouped[model.provider] = {
                    name: model.providerName,
                    icon: model.icon,
                    models: []
                };
            }
            grouped[model.provider].models.push(model);
        });
        return grouped;
    }

    /**
     * 验证API配置
     */
    validateConfig(modelId, apiKey) {
        const model = this.models[modelId];
        if (!model) {
            return { valid: false, error: '未知模型' };
        }
        if (!apiKey || apiKey.trim() === '') {
            return { valid: false, error: 'API密钥不能为空' };
        }
        return { valid: true };
    }

    /**
     * 创建API请求头
     */
    createHeaders(modelId, apiKey) {
        const model = this.models[modelId];
        const headers = {
            'Content-Type': 'application/json'
        };

        switch (model?.provider) {
            case 'OpenAI':
                headers['Authorization'] = `Bearer ${apiKey}`;
                break;
            case 'Anthropic':
                headers['x-api-key'] = apiKey;
                headers['anthropic-version'] = '2023-06-01';
                break;
            case 'Google':
                headers['Authorization'] = `Bearer ${apiKey}`;
                break;
            default:
                headers['Authorization'] = `Bearer ${apiKey}`;
        }

        return headers;
    }
}

// 导出单例
const aiModelConfig = new AIModelConfig();
