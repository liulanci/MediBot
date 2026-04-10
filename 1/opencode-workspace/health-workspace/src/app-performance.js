const HealthWorkspace = require('./index');
const EnhancedValidator = require('./security/validator-enhanced');
const ErrorHandler = require('./security/error-handler').ErrorHandler;
const RateLimiter = require('./security/rate-limiter').RateLimiter;
const AuditLogger = require('./security/audit-logger').AuditLogger;

class HealthWorkspaceApp {
    constructor() {
        this.workspace = HealthWorkspace;
        this.validator = EnhancedValidator;
        this.errorHandler = new ErrorHandler();
        this.rateLimiter = new RateLimiter();
        this.auditLogger = new AuditLogger();
        this.startTime = Date.now();
        this.cache = new Map();
        this.cacheTimeout = 300000;
    }

    diagnoseMBTI(answers) {
        const cacheKey = `mbti_${JSON.stringify(answers)}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const rateCheck = this.rateLimiter.check('mbti-diagnosis');
        if (!rateCheck.allowed) {
            throw new Error('请求过于频繁，请稍后再试');
        }
        const validation = this.validator.validateMBTIAnswers(answers);
        if (!validation.valid) {
            throw validation.errors[0];
        }
        this.auditLogger.log('MBTI_DIAGNOSIS', { answerCount: Object.keys(answers).length });
        const result = this.workspace.diagnoseMBTI(answers);
        this.cache.set(cacheKey, result);
        setTimeout(() => this.cache.delete(cacheKey), this.cacheTimeout);
        return result;
    }

    assessBMI(height, weight, age, gender) {
        const cacheKey = `bmi_${height}_${weight}_${age}_${gender}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const rateCheck = this.rateLimiter.check('bmi-assessment');
        if (!rateCheck.allowed) {
            throw new Error('请求过于频繁，请稍后再试');
        }
        const v1 = this.validator.validateHeight(height);
        if (!v1.valid) throw v1.errors[0];
        const v2 = this.validator.validateWeight(weight);
        if (!v2.valid) throw v2.errors[0];
        const v3 = this.validator.validateAge(age);
        if (!v3.valid) throw v3.errors[0];
        const v4 = this.validator.validateGender(gender);
        if (!v4.valid) throw v4.errors[0];
        this.auditLogger.log('BMI_ASSESSMENT', { height, weight, age, gender });
        const result = this.workspace.assessBMI(height, weight, age, gender);
        this.cache.set(cacheKey, result);
        setTimeout(() => this.cache.delete(cacheKey), this.cacheTimeout);
        return result;
    }

    generateComprehensiveReport(mbtiAnswers, height, weight, age, gender, userPreferences = {}) {
        return this.workspace.generateComprehensiveReport(mbtiAnswers, height, weight, age, gender, userPreferences);
    }

    exportMarkdownReport(mbtiAnswers, height, weight, age, gender, userPreferences = {}) {
        return this.workspace.exportMarkdownReport(mbtiAnswers, height, weight, age, gender, userPreferences);
    }

    getStatistics() {
        return {
            version: '4.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            rateLimitStats: this.rateLimiter.getStatistics(),
            cacheSize: this.cache.size,
            performance: {
                startupTime: Date.now() - this.startTime,
                cacheHitRate: this.calculateCacheHitRate()
            }
        };
    }

    calculateCacheHitRate() {
        return this.cache.size > 0 ? 'Active' : 'Inactive';
    }

    clearCache() {
        const size = this.cache.size;
        this.cache.clear();
        return { cleared: size, message: `已清除 ${size} 个缓存项` };
    }

    start() {
        this.auditLogger.log('APPLICATION_START', { version: '4.0.0' });
        return 'Health Workspace 启动成功';
    }

    shutdown() {
        this.auditLogger.log('APPLICATION_SHUTDOWN', { version: '4.0.0' });
        this.cache.clear();
        return 'Health Workspace 已关闭';
    }
}

module.exports = HealthWorkspaceApp;
