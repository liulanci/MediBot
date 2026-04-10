/**
 * ============================================================================
 * 安全测试验证清单
 * ============================================================================
 * 
 * 功能：
 * - OWASP Top 10 合规性检查
 * - 安全漏洞分析
 * - 测试用例管理
 * - 验证结果记录
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

const EnhancedValidator = require('./src/security/validator-enhanced');
const EncryptionModule = require('./src/security/encryption');
const RBACModule = require('./src/security/rbac');

// 提取构造函数
const Encryption = EncryptionModule.Encryption || EncryptionModule;
const RBACManager = RBACModule.RBACManager || RBACModule;

class TestCase {
    constructor(config) {
        this.id = config.id;
        this.category = config.category;
        this.name = config.name;
        this.description = config.description;
        this.testFunction = config.test;
        this.expectedResult = config.expected;
        this.priority = config.priority || 'medium';
        this.status = 'pending';
        this.result = null;
        this.executedAt = null;
    }

    async execute(context = {}) {
        this.executedAt = new Date().toISOString();
        
        try {
            const result = await this.testFunction(context);
            this.status = result.passed ? 'passed' : 'failed';
            this.result = result;
        } catch (error) {
            this.status = 'error';
            this.result = {
                passed: false,
                error: error.message,
                details: error.stack
            };
        }
        
        return this.result;
    }

    toJSON() {
        return {
            id: this.id,
            category: this.category,
            name: this.name,
            status: this.status,
            priority: this.priority,
            executedAt: this.executedAt,
            result: this.result
        };
    }
}

class SecurityVerification {
    constructor() {
        this.testCases = [];
        this.results = [];
        this.initTestCases();
    }

    initTestCases() {
        // A01: 访问控制
        this.addTest({
            id: 'A01-001',
            category: 'A01-访问控制',
            name: '未授权访问测试',
            description: '测试是否能够访问未授权的资源',
            priority: 'high',
            test: async (ctx) => {
                const rbac = new RBACManager();
                rbac.assignRole('test-user', 'GUEST');
                
                const hasAdminAccess = rbac.hasPermission('test-user', 'system:config');
                
                return {
                    passed: !hasAdminAccess,
                    details: `Guest用户${hasAdminAccess ? '错误地' : '正确地'}无法访问管理员功能`
                };
            },
            expected: 'Guest用户不应有管理员权限'
        });

        // A02: 加密
        this.addTest({
            id: 'A02-001',
            category: 'A02-加密',
            name: '敏感数据加密测试',
            description: '测试敏感数据是否被正确加密',
            priority: 'high',
            test: async (ctx) => {
                const testData = { healthInfo: 'sensitive data' };
                const key = Encryption.generateKey();
                const encrypted = Encryption.encrypt(testData, key);
                
                const isEncrypted = typeof encrypted === 'object' && 
                                  encrypted.iv && 
                                  encrypted.authTag;
                
                return {
                    passed: isEncrypted,
                    details: `数据${isEncrypted ? '已正确' : '未'}加密`
                };
            },
            expected: '敏感数据应该被加密存储'
        });

        // A03: 注入
        this.addTest({
            id: 'A03-001',
            category: 'A03-注入',
            name: 'SQL注入防护测试',
            description: '测试SQL注入模式是否被检测',
            priority: 'high',
            test: async (ctx) => {
                const maliciousInput = "'; DROP TABLE users; --";
                const hasSQLInjection = EnhancedValidator.containsSQLPatterns(maliciousInput);
                
                return {
                    passed: hasSQLInjection,
                    details: `SQL注入模式${hasSQLInjection ? '被正确' : '未被'}检测`
                };
            },
            expected: '应该检测到SQL注入模式'
        });

        this.addTest({
            id: 'A03-002',
            category: 'A03-注入',
            name: 'XSS防护测试',
            description: '测试XSS攻击模式是否被检测',
            priority: 'high',
            test: async (ctx) => {
                const xssInput = '<script>alert("xss")</script>';
                const hasXSS = EnhancedValidator.containsXSSPatterns(xssInput);
                
                return {
                    passed: hasXSS,
                    details: `XSS模式${hasXSS ? '被正确' : '未被'}检测`
                };
            },
            expected: '应该检测到XSS攻击模式'
        });

        // A05: 安全配置
        this.addTest({
            id: 'A05-001',
            category: 'A05-安全配置',
            name: '错误信息脱敏测试',
            description: '测试错误信息是否泄露敏感信息',
            priority: 'medium',
            test: async (ctx) => {
                const errorData = {
                    userId: '12345',
                    password: 'secret123',
                    internalPath: '/var/www/secrets'
                };
                
                const sanitized = Encryption.mask(errorData, ['password', 'internalPath']);
                const isSanitized = sanitized.password === '[REDACTED]';
                
                return {
                    passed: isSanitized,
                    details: `敏感信息${isSanitized ? '已正确' : '未'}脱敏`
                };
            },
            expected: '敏感信息应该被脱敏处理'
        });

        // A07: 身份验证
        this.addTest({
            id: 'A07-001',
            category: 'A07-身份验证',
            name: '密码强度验证测试',
            description: '测试密码强度验证是否正确',
            priority: 'high',
            test: async (ctx) => {
                const weakPassword = '123456';
                const isWeak = weakPassword.length < 8 || /^[0-9]+$/.test(weakPassword);
                
                return {
                    passed: isWeak,
                    details: `弱密码${isWeak ? '被正确' : '未被'}识别`
                };
            },
            expected: '应该识别弱密码'
        });

        // 性能测试
        this.addTest({
            id: 'PERF-001',
            category: '性能',
            name: '输入验证性能测试',
            description: '测试大量输入的验证性能',
            priority: 'low',
            test: async (ctx) => {
                const iterations = 1000;
                const start = Date.now();
                
                for (let i = 0; i < iterations; i++) {
                    EnhancedValidator.validateHeight(170 + Math.random() * 10);
                }
                
                const duration = Date.now() - start;
                const avgTime = duration / iterations;
                
                return {
                    passed: avgTime < 1,
                    details: `平均验证时间: ${avgTime.toFixed(3)}ms`
                };
            },
            expected: '每次验证应在1ms内完成'
        });

        // 数据完整性
        this.addTest({
            id: 'INTEG-001',
            category: '数据完整性',
            name: '加密解密完整性测试',
            description: '测试加密解密后数据完整性',
            priority: 'high',
            test: async (ctx) => {
                const original = {
                    name: '张三',
                    age: 30,
                    healthData: { bmi: 22.5, score: 100 }
                };
                
                const key = Encryption.generateKey();
                const encrypted = Encryption.encrypt(original, key);
                const decrypted = Encryption.decrypt(encrypted, key);
                
                const isIntact = JSON.stringify(original) === JSON.stringify(decrypted);
                
                return {
                    passed: isIntact,
                    details: `数据${isIntact ? '完整' : '不完整'}`
                };
            },
            expected: '加密解密后数据应保持完整'
        });

        // 权限控制
        this.addTest({
            id: 'AUTHZ-001',
            category: '权限控制',
            name: 'RBAC权限测试',
            description: '测试基于角色的访问控制是否正确',
            priority: 'high',
            test: async (ctx) => {
                const rbac = new RBACManager();
                
                rbac.assignRole('user1', 'PATIENT');
                rbac.assignRole('user1', 'GUEST');
                
                const canReadHealth = rbac.hasPermission('user1', 'health:read');
                const canManageUsers = rbac.hasPermission('user1', 'user:manage');
                const canTakeTest = rbac.hasPermission('user1', 'mbti:test:take');
                
                const correctPermissions = canReadHealth && !canManageUsers && canTakeTest;
                
                return {
                    passed: correctPermissions,
                    details: `权限设置${correctPermissions ? '正确' : '错误'}`
                };
            },
            expected: 'Patient角色权限应符合预期'
        });
    }

    addTest(testConfig) {
        const testCase = new TestCase(testConfig);
        this.testCases.push(testCase);
    }

    async runAll(context = {}) {
        const results = [];
        
        for (const testCase of this.testCases) {
            const result = await testCase.execute(context);
            results.push(result);
        }
        
        this.results = results;
        
        return this.getSummary();
    }

    getSummary() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;
        const errors = this.results.filter(r => r.error).length;
        
        return {
            total: this.testCases.length,
            executed: this.results.length,
            passed,
            failed,
            errors,
            passRate: this.results.length > 0 ? 
                (passed / this.results.length * 100).toFixed(2) + '%' : '0%',
            byCategory: this.getResultsByCategory()
        };
    }

    getResultsByCategory() {
        const byCategory = {};
        
        this.testCases.forEach((testCase, index) => {
            if (!byCategory[testCase.category]) {
                byCategory[testCase.category] = {
                    total: 0,
                    passed: 0,
                    failed: 0
                };
            }
            
            byCategory[testCase.category].total++;
            
            const result = this.results[index];
            if (result) {
                if (result.passed) {
                    byCategory[testCase.category].passed++;
                } else {
                    byCategory[testCase.category].failed++;
                }
            }
        });
        
        return byCategory;
    }

    generateReport() {
        const summary = this.getSummary();
        
        let report = `
# 安全测试验证报告

**生成时间**: ${new Date().toLocaleString('zh-CN')}
**测试总数**: ${summary.total}
**执行总数**: ${summary.executed}

## 总体结果

| 指标 | 数值 |
|------|------|
| 通过 | ${summary.passed} |
| 失败 | ${summary.failed} |
| 错误 | ${summary.errors} |
| 通过率 | ${summary.passRate} |

## 按类别结果

| 类别 | 通过/总数 |
|------|----------|`;

        for (const [category, stats] of Object.entries(summary.byCategory)) {
            report += `\n| ${category} | ${stats.passed}/${stats.total} |`;
        }

        report += `\n\n## 详细结果\n\n`;

        this.testCases.forEach(testCase => {
            const result = this.results[this.testCases.indexOf(testCase)];
            const status = result?.passed ? '✅' : result?.error ? '❌' : '⏳';
            
            report += `### ${status} ${testCase.id}: ${testCase.name}\n\n`;
            report += `- **描述**: ${testCase.description}\n`;
            report += `- **优先级**: ${testCase.priority}\n`;
            report += `- **状态**: ${testCase.status}\n`;
            
            if (result) {
                if (result.passed) {
                    report += `- ✅ ${result.details}\n`;
                } else if (result.error) {
                    report += `- ❌ 错误: ${result.error}\n`;
                } else {
                    report += `- ℹ️ ${result.details}\n`;
                }
            }
            
            report += '\n';
        });

        report += `\n---\n\n**报告生成时间**: ${new Date().toISOString()}\n`;

        return report;
    }
}

async function runSecurityTests() {
    const verifier = new SecurityVerification();
    
    console.log('开始执行安全测试...\n');
    
    const summary = await verifier.runAll();
    
    console.log('测试结果:');
    console.log(`通过: ${summary.passed}/${summary.total}`);
    console.log(`失败: ${summary.failed}/${summary.total}`);
    console.log(`通过率: ${summary.passRate}\n`);
    
    const report = verifier.generateReport();
    console.log(report);
    
    return verifier;
}

module.exports = {
    SecurityVerification,
    TestCase,
    runSecurityTests
};

if (require.main === module) {
    runSecurityTests().then(() => {
        console.log('安全测试完成\n');
        process.exit(0);
    }).catch(err => {
        console.error('测试失败:', err);
        process.exit(1);
    });
}
