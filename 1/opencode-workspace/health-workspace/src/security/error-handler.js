/**
 * ============================================================================
 * 结构化错误处理系统
 * ============================================================================
 * 
 * 功能：
 * - 统一的错误分类和编码
 * - 用户友好的错误信息
 * - 内部错误日志
 * - 错误恢复机制
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

/**
 * 错误分类
 */
const ErrorCategory = {
    VALIDATION: 'validation',     // 验证错误
    SECURITY: 'security',           // 安全错误
    TECHNICAL: 'technical',        // 技术错误
    BUSINESS: 'business',         // 业务错误
    SYSTEM: 'system'              // 系统错误
};

/**
 * 错误码定义
 */
const ErrorCode = {
    // 验证错误 (1000-1999)
    VALIDATION_ERROR: { code: 1000, category: 'validation', message: '验证错误' },
    INVALID_INPUT: { code: 1001, category: 'validation', message: '无效的输入' },
    MISSING_FIELD: { code: 1002, category: 'validation', message: '缺少必填字段' },
    OUT_OF_RANGE: { code: 1003, category: 'validation', message: '值超出范围' },
    INVALID_FORMAT: { code: 1004, category: 'validation', message: '格式错误' },
    
    // 安全错误 (2000-2999)
    SECURITY_ERROR: { code: 2000, category: 'security', message: '安全错误' },
    SQL_INJECTION: { code: 2001, category: 'security', message: '疑似SQL注入' },
    XSS_ATTACK: { code: 2002, category: 'security', message: '疑似XSS攻击' },
    RATE_LIMIT: { code: 2003, category: 'security', message: '请求过于频繁' },
    UNAUTHORIZED: { code: 2004, category: 'security', message: '未授权访问' },
    FORBIDDEN: { code: 2005, category: 'security', message: '禁止访问' },
    
    // 技术错误 (3000-3999)
    TECHNICAL_ERROR: { code: 3000, category: 'technical', message: '技术错误' },
    DATABASE_ERROR: { code: 3001, category: 'technical', message: '数据库错误' },
    NETWORK_ERROR: { code: 3002, category: 'technical', message: '网络错误' },
    TIMEOUT_ERROR: { code: 3003, category: 'technical', message: '请求超时' },
    
    // 业务错误 (4000-4999)
    BUSINESS_ERROR: { code: 4000, category: 'business', message: '业务错误' },
    NOT_FOUND: { code: 4001, category: 'business', message: '资源不存在' },
    CONFLICT: { code: 4002, category: 'business', message: '资源冲突' },
    BUSINESS_RULE_VIOLATION: { code: 4003, category: 'business', message: '违反业务规则' }
};

/**
 * 业务错误类
 */
class BusinessError extends Error {
    constructor(errorDef, details = {}) {
        super(errorDef.message);
        this.name = this.constructor.name;
        this.code = errorDef.code;
        this.category = errorDef.category;
        this.details = details;
        this.statusCode = this.getStatusCode();
        this.timestamp = new Date().toISOString();
        this.recoverable = this.isRecoverable();
    }

    getStatusCode() {
        switch (this.category) {
            case ErrorCategory.VALIDATION:
                return 400;
            case ErrorCategory.SECURITY:
                return this.code === ErrorCode.UNAUTHORIZED.code ? 401 : 
                       this.code === ErrorCode.FORBIDDEN.code ? 403 : 400;
            case ErrorCategory.TECHNICAL:
                return 500;
            case ErrorCategory.BUSINESS:
                return this.code === ErrorCode.NOT_FOUND.code ? 404 : 400;
            case ErrorCategory.SYSTEM:
                return 500;
            default:
                return 500;
        }
    }

    isRecoverable() {
        // 可恢复的错误
        const recoverableCodes = [
            ErrorCode.VALIDATION_ERROR.code,
            ErrorCode.NETWORK_ERROR.code,
            ErrorCode.TIMEOUT_ERROR.code,
            ErrorCode.RATE_LIMIT.code
        ];
        return recoverableCodes.includes(this.code);
    }

    /**
     * 获取用户友好的错误信息
     */
    getUserMessage() {
        const messages = {
            [ErrorCode.VALIDATION_ERROR.code]: '输入数据验证失败，请检查您的输入',
            [ErrorCode.INVALID_INPUT.code]: '您提供的数据格式不正确',
            [ErrorCode.MISSING_FIELD.code]: '请填写所有必填项',
            [ErrorCode.OUT_OF_RANGE.code]: '输入的值超出允许范围',
            [ErrorCode.INVALID_FORMAT.code]: '输入格式不正确',
            [ErrorCode.SQL_INJECTION.code]: '检测到异常请求，已被拒绝',
            [ErrorCode.XSS_ATTACK.code]: '检测到异常内容，已被拒绝',
            [ErrorCode.RATE_LIMIT.code]: '请求过于频繁，请稍后再试',
            [ErrorCode.UNAUTHORIZED.code]: '请先登录',
            [ErrorCode.FORBIDDEN.code]: '您没有权限执行此操作',
            [ErrorCode.DATABASE_ERROR.code]: '服务暂时不可用，请稍后再试',
            [ErrorCode.NETWORK_ERROR.code]: '网络连接失败，请检查您的网络',
            [ErrorCode.TIMEOUT_ERROR.code]: '请求超时，请重试',
            [ErrorCode.NOT_FOUND.code]: '请求的资源不存在',
            [ErrorCode.CONFLICT.code]: '操作冲突，请刷新后重试'
        };
        return messages[this.code] || '发生了未知错误';
    }

    /**
     * 获取内部错误日志（不含敏感信息）
     */
    toLogEntry() {
        return {
            timestamp: this.timestamp,
            name: this.name,
            code: this.code,
            category: this.category,
            message: this.message,
            details: this.sanitizeDetails(),
            stack: this.stack,
            recoverable: this.recoverable
        };
    }

    /**
     * 清理详情中的敏感信息
     */
    sanitizeDetails() {
        const sensitiveKeys = ['password', 'token', 'secret', 'key', 'apiKey', 'authorization'];
        const sanitized = { ...this.details };
        
        for (const key of Object.keys(sanitized)) {
            if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
                sanitized[key] = '[REDACTED]';
            }
        }
        
        return sanitized;
    }

    /**
     * 获取API响应格式
     */
    toAPIResponse(includeDetails = false) {
        const response = {
            success: false,
            error: {
                code: this.code,
                message: this.getUserMessage(),
                category: this.category
            }
        };

        if (includeDetails && process.env.NODE_ENV === 'development') {
            response.error.details = this.sanitizeDetails();
        }

        if (this.recoverable) {
            response.retryAfter = 5; // 5秒后可重试
        }

        return response;
    }
}

/**
 * 错误处理器类
 */
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 1000;
        this.errorCallbacks = [];
    }

    /**
     * 注册错误回调
     */
    onError(callback) {
        this.errorCallbacks.push(callback);
    }

    /**
     * 处理错误
     */
    handle(error, context = {}) {
        // 确保是BusinessError实例
        if (!(error instanceof BusinessError)) {
            error = this.wrapError(error);
        }

        // 记录错误
        this.logError(error, context);

        // 触发回调
        this.errorCallbacks.forEach(callback => {
            try {
                callback(error, context);
            } catch (e) {
                console.error('Error in error callback:', e);
            }
        });

        return error;
    }

    /**
     * 包装普通错误
     */
    wrapError(error) {
        return new BusinessError(
            ErrorCode.TECHNICAL_ERROR,
            { originalError: error.message, stack: error.stack }
        );
    }

    /**
     * 记录错误
     */
    logError(error, context) {
        const entry = {
            ...error.toLogEntry(),
            context: this.sanitizeContext(context)
        };

        this.errorLog.push(entry);

        // 保持日志大小
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog.shift();
        }

        // 输出到控制台
        console.error(JSON.stringify(entry, null, 2));
    }

    /**
     * 清理上下文中的敏感信息
     */
    sanitizeContext(context) {
        const sensitiveKeys = ['password', 'token', 'secret', 'key', 'body', 'headers'];
        const sanitized = { ...context };

        for (const key of Object.keys(sanitized)) {
            if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
                sanitized[key] = '[REDACTED]';
            }
        }

        return sanitized;
    }

    /**
     * 获取错误统计
     */
    getStatistics() {
        const stats = {
            total: this.errorLog.length,
            byCategory: {},
            byCode: {},
            recoverable: 0,
            nonRecoverable: 0
        };

        this.errorLog.forEach(entry => {
            // 按类别统计
            if (!stats.byCategory[entry.category]) {
                stats.byCategory[entry.category] = 0;
            }
            stats.byCategory[entry.category]++;

            // 按错误码统计
            if (!stats.byCode[entry.code]) {
                stats.byCode[entry.code] = 0;
            }
            stats.byCode[entry.code]++;

            // 可恢复性统计
            if (entry.recoverable) {
                stats.recoverable++;
            } else {
                stats.nonRecoverable++;
            }
        });

        return stats;
    }

    /**
     * 获取最近错误
     */
    getRecentErrors(count = 10) {
        return this.errorLog.slice(-count);
    }

    /**
     * 清除错误日志
     */
    clearLog() {
        this.errorLog = [];
    }
}

/**
 * 错误工厂函数
 */
const createError = (errorDef, details) => new BusinessError(errorDef, details);

module.exports = {
    ErrorHandler,
    BusinessError,
    ErrorCategory,
    ErrorCode,
    createError
};
