/**
 * ============================================================================
 * API速率限制模块
 * ============================================================================
 * 
 * 功能：
 * - 基于IP的请求限制
 * - 基于用户的请求限制
 * - 滑动窗口算法
 * - 自动清理过期记录
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

/**
 * 速率限制配置
 */
const RateLimitConfig = {
    // 基于IP的限制
    ip: {
        windowMs: 15 * 60 * 1000,    // 15分钟窗口
        maxRequests: 100,              // 最大100次请求
        blockDurationMs: 60 * 1000    // 封禁1分钟
    },
    
    // 基于API的限制
    api: {
        windowMs: 60 * 1000,           // 1分钟窗口
        maxRequests: 30,             // 最大30次请求
        blockDurationMs: 30 * 1000  // 封禁30秒
    },
    
    // 严重限制
    strict: {
        windowMs: 60 * 1000,
        maxRequests: 10,
        blockDurationMs: 5 * 60 * 1000
    }
};

/**
 * 请求记录
 */
class RequestRecord {
    constructor(key) {
        this.key = key;
        this.requests = [];
        this.blocked = false;
        this.blockedUntil = null;
    }

    addRequest() {
        this.requests.push(Date.now());
    }

    getRequestCount(windowMs) {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < windowMs);
        return this.requests.length;
    }

    block(durationMs) {
        this.blocked = true;
        this.blockedUntil = Date.now() + durationMs;
    }

    isBlocked() {
        if (!this.blocked) return false;
        if (Date.now() > this.blockedUntil) {
            this.blocked = false;
            this.blockedUntil = null;
            return false;
        }
        return true;
    }

    getRemainingTime() {
        if (!this.blocked) return 0;
        return Math.max(0, this.blockedUntil - Date.now());
    }
}

/**
 * 速率限制器类
 */
class RateLimiter {
    constructor() {
        this.records = new Map();
        this.maxRecords = 10000;
        this.cleanupInterval = 60 * 1000; // 1分钟清理一次
        this.startCleanup();
    }

    /**
     * 检查请求是否允许
     */
    check(key, config = RateLimitConfig.ip) {
        let record = this.records.get(key);
        
        if (!record) {
            record = new RequestRecord(key);
            this.records.set(key, record);
        }

        // 检查是否被封禁
        if (record.isBlocked()) {
            return {
                allowed: false,
                reason: 'blocked',
                remainingTime: record.getRemainingTime(),
                limit: config.maxRequests,
                remaining: 0
            };
        }

        // 获取当前请求数
        const currentCount = record.getRequestCount(config.windowMs);

        // 检查是否超限
        if (currentCount >= config.maxRequests) {
            record.block(config.blockDurationMs);
            return {
                allowed: false,
                reason: 'rate_limit',
                remainingTime: config.blockDurationMs,
                limit: config.maxRequests,
                remaining: 0
            };
        }

        // 记录请求
        record.addRequest();

        return {
            allowed: true,
            remaining: config.maxRequests - currentCount - 1,
            limit: config.maxRequests,
            resetMs: config.windowMs
        };
    }

    /**
     * 获取限制头信息
     */
    getHeaders(checkResult, config) {
        return {
            'X-RateLimit-Limit': checkResult.limit.toString(),
            'X-RateLimit-Remaining': checkResult.remaining.toString(),
            'X-RateLimit-Reset': (Date.now() + (checkResult.resetMs || config.windowMs)).toString(),
            'Retry-After': checkResult.remainingTime ? 
                Math.ceil(checkResult.remainingTime / 1000).toString() : undefined
        };
    }

    /**
     * 获取当前限制状态
     */
    getStatus(key) {
        const record = this.records.get(key);
        if (!record) {
            return {
                exists: false,
                blocked: false,
                requestCount: 0
            };
        }

        return {
            exists: true,
            blocked: record.blocked,
            blockedUntil: record.blockedUntil,
            remainingTime: record.getRemainingTime(),
            requestCount: record.requests.length
        };
    }

    /**
     * 重置限制
     */
    reset(key) {
        this.records.delete(key);
    }

    /**
     * 清理过期记录
     */
    cleanup() {
        const now = Date.now();
        const keysToDelete = [];

        this.records.forEach((record, key) => {
            // 删除过期的记录
            if (record.requests.length === 0 && !record.blocked) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => this.records.delete(key));

        // 限制最大记录数
        if (this.records.size > this.maxRecords) {
            const entries = Array.from(this.records.entries());
            entries.slice(0, entries.length - this.maxRecords).forEach(([key]) => {
                this.records.delete(key);
            });
        }
    }

    /**
     * 启动自动清理
     */
    startCleanup() {
        this.cleanupTimer = setInterval(() => {
            this.cleanup();
        }, this.cleanupInterval);
    }

    /**
     * 停止自动清理
     */
    stopCleanup() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = null;
        }
    }

    /**
     * 获取统计信息
     */
    getStatistics() {
        let totalRequests = 0;
        let blockedKeys = 0;

        this.records.forEach(record => {
            totalRequests += record.requests.length;
            if (record.blocked) blockedKeys++;
        });

        return {
            totalRecords: this.records.size,
            totalRequests,
            blockedKeys,
            maxRecords: this.maxRecords
        };
    }
}

/**
 * 速率限制中间件
 */
function rateLimitMiddleware(options = {}) {
    const config = options.config || RateLimitConfig.ip;
    const keyGenerator = options.keyGenerator || ((req) => req.ip || req.connection.remoteAddress);
    const handler = options.handler || ((req, res) => {
        res.status(429).json({
            success: false,
            error: {
                code: 2003,
                message: '请求过于频繁，请稍后再试'
            }
        });
    });

    const limiter = new RateLimiter();

    return (req, res, next) => {
        const key = keyGenerator(req);
        const result = limiter.check(key, config);

        // 设置响应头
        const headers = limiter.getHeaders(result, config);
        Object.entries(headers).forEach(([name, value]) => {
            if (value !== undefined) {
                res.setHeader(name, value);
            }
        });

        if (!result.allowed) {
            return handler(req, res, result);
        }

        next();
    };
}

module.exports = {
    RateLimiter,
    RateLimitConfig,
    rateLimitMiddleware
};
