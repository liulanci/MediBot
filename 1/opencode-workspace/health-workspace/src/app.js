/**
 * Health Workspace 主应用入口
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
    }

    setupErrorHandling() {
        this.errorHandler.onError((error, context) => {
            console.error('Application Error:', {
                code: error.code,
                message: error.message,
                category: error.category
            });
        });
    }

    setupAuditLogging() {
        this.auditLogger.log('APPLICATION_START', {
            version: this.workspace.version || '4.0.0',
            timestamp: new Date().toISOString()
        });
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

        this.auditLogger.log('MBTI_DIAGNOSIS', {
            answerCount: Object.keys(answers).length
        });

        return this.workspace.diagnoseMBTI(answers);
    }

    assessBMI(height, weight, age, gender) {
        const rateCheck = this.rateLimiter.check('bmi-assessment');
        if (!rateCheck.allowed) {
            throw new Error('请求过于频繁，请稍后再试');
        }

        const validation1 = this.validator.validateHeight(height);
        if (!validation1.valid) throw validation1.errors[0];

        const validation2 = this.validator.validateWeight(weight);
        if (!validation2.valid) throw validation2.errors[0];

        const validation3 = this.validator.validateAge(age);
        if (!validation3.valid) throw validation3.errors[0];

        const validation4 = this.validator.validateGender(gender);
        if (!validation4.valid) throw validation4.errors[0];

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
            version: this.workspace.version || '4.0.0',
            uptime: process.uptime(),
            rateLimiterStats: this.rateLimiter.getStatistics()
        };
    }

    start() {
        console.log('Health Workspace 启动中...');
        this.setupErrorHandling();
        this.setupAuditLogging();
        console.log('Health Workspace 已启动');
        console.log('版本: ' + (this.workspace.version || '4.0.0'));
    }
}

// 测试运行
if (require.main === module) {
    const app = new HealthWorkspaceApp();
    app.start();
}

module.exports = HealthWorkspaceApp;
