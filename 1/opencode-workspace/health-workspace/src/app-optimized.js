/**
 * Health Workspace 主应用入口 (性能优化版)
 */
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
    }

    diagnoseMBTI(answers) {
        const rateCheck = this.rateLimiter.check('mbti-diagnosis');
        if (!rateCheck.allowed) {
            throw new Error('请求过于频繁，请稍后再试');
        }
        const validation = this.validator.validateMBTIAnswers(answers);
        if (!validation.valid) {
            throw validation.errors[0];
        }
        this.auditLogger.log('MBTI_DIAGNOSIS', { answerCount: Object.keys(answers).length });
        return this.workspace.diagnoseMBTI(answers);
    }

    assessBMI(height, weight, age, gender) {
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
        return this.workspace.assessBMI(height, weight, age, gender);
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
            rateLimitStats: this.rateLimiter.getStatistics()
        };
    }

    start() {
        this.auditLogger.log('APPLICATION_START', { version: '4.0.0' });
        return 'Health Workspace 启动成功';
    }
}

module.exports = HealthWorkspaceApp;
