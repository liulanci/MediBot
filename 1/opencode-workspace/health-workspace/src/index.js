/**
 * ============================================================================
 * 健康工作区 - 统一入口（重构优化版）
 * ============================================================================
 * 
 * 整合模块：
 * - MBTI人格诊断系统
 * - BMI健康评估系统
 * 
 * 架构设计：
 * - 模块化：每个功能独立模块
 * - 可扩展：易于添加新功能
 * - 可维护：清晰的代码结构
 * 
 * 作者：OpenCode Team
 * 版本：4.0.0
 * ============================================================================
 */

const MBTIModule = require('../../skills/mbti/src/index');
const BMIModule = require('../../skills/bmi-calculator/src/index');
const Validator = require('./utils/validator');
const Formatter = require('./utils/formatter');
const Constants = require('./config/constants');

/**
 * 健康工作区主类
 */
class HealthWorkspace {
    /**
     * 构造函数
     */
    constructor() {
        this.name = 'Health Workspace';
        this.version = '4.0.0';
        this.mbti = MBTIModule;
        this.bmi = BMIModule;
        this.validator = Validator;
        this.formatter = Formatter;
        this.constants = Constants;
    }

    // ==================== MBTI人格诊断 ====================

    /**
     * MBTI人格诊断
     * @param {Object} answers - 26题问卷答案
     * @returns {Object} 诊断结果
     */
    diagnoseMBTI(answers) {
        // 验证输入
        this.validator.validateMBTIAnswers(answers);
        
        // 执行诊断
        return this.mbti.diagnose(answers);
    }

    /**
     * 获取人格类型描述
     * @param {string} type - 4字母MBTI类型
     * @returns {Object} 人格描述
     */
    getPersonalityDescription(type) {
        return this.mbti.getPersonalityDescription(type);
    }

    /**
     * 获取所有人格类型
     * @returns {Array} 16种人格类型列表
     */
    getAllPersonalityTypes() {
        return this.mbti.getAllPersonalityTypes();
    }

    // ==================== BMI健康评估 ====================

    /**
     * BMI健康评估
     * @param {number} height - 身高(cm)
     * @param {number} weight - 体重(kg)
     * @param {number} age - 年龄
     * @param {string} gender - 性别('male'/'female')
     * @returns {Object} BMI评估结果
     */
    assessBMI(height, weight, age, gender) {
        // 验证输入
        this.validator.validateHeight(height);
        this.validator.validateWeight(weight);
        this.validator.validateAge(age);
        this.validator.validateGender(gender);
        
        // 执行评估
        return this.bmi.comprehensiveAssessment(height, weight, age, gender);
    }

    /**
     * 计算BMI值
     * @param {number} height - 身高(cm)
     * @param {number} weight - 体重(kg)
     * @returns {Object} BMI值
     */
    calculateBMI(height, weight) {
        this.validator.validateHeight(height);
        this.validator.validateWeight(weight);
        return this.bmi.calculate(height, weight);
    }

    /**
     * 获取BMI分类
     * @param {number} bmi - BMI值
     * @param {number} age - 年龄
     * @param {string} gender - 性别
     * @returns {Object} 分类结果
     */
    getBMICategory(bmi, age, gender) {
        this.validator.validateAge(age);
        this.validator.validateGender(gender);
        return this.bmi.getCategory(bmi, age, gender);
    }

    // ==================== 综合健康报告 ====================

    /**
     * 生成综合健康报告
     * @param {Object} mbtiAnswers - MBTI问卷答案
     * @param {number} height - 身高(cm)
     * @param {number} weight - 体重(kg)
     * @param {number} age - 年龄
     * @param {string} gender - 性别
     * @param {Object} userPreferences - 用户偏好(可选)
     * @returns {Object} 综合报告
     */
    generateComprehensiveReport(mbtiAnswers, height, weight, age, gender, userPreferences = {}) {
        // MBTI人格分析
        const mbtiResult = this.diagnoseMBTI(mbtiAnswers);
        
        // BMI健康评估
        const bmiResult = this.assessBMI(height, weight, age, gender);

        // 构建报告
        const report = {
            // 基本信息
            title: '综合健康评估报告',
            timestamp: new Date().toISOString(),
            id: this.formatter.generateId(),
            
            // 人格分析
            personality: {
                type: mbtiResult.agentProfile.type,
                typeName: mbtiResult.agentProfile.typeName,
                group: mbtiResult.agentProfile.group,
                traits: mbtiResult.agentProfile.traits,
                dimensions: mbtiResult.agentProfile.dimensions
            },
            
            // 健康评估
            health: {
                bmi: bmiResult.bmi,
                bmiRaw: bmiResult.bmiRaw,
                category: bmiResult.category,
                description: bmiResult.description,
                tips: bmiResult.tips,
                healthScore: bmiResult.healthScore,
                height: height,
                weight: weight,
                age: age,
                gender: gender
            },
            
            // 匹配度分析
            match: userPreferences && Object.keys(userPreferences).length > 0 ? {
                percentage: mbtiResult.comparison.matchPercentage,
                level: mbtiResult.comparison.matchLevel,
                gaps: mbtiResult.comparison.gaps,
                recommendations: mbtiResult.recommendations
            } : null,
            
            // 综合建议
            suggestions: this.generateSuggestions(mbtiResult, bmiResult)
        };

        return report;
    }

    /**
     * 生成综合建议
     * @param {Object} mbtiResult - MBTI结果
     * @param {Object} bmiResult - BMI结果
     * @returns {Array} 建议列表
     */
    generateSuggestions(mbtiResult, bmiResult) {
        const suggestions = [];

        // MBTI建议
        if (mbtiResult.recommendations && mbtiResult.recommendations.length > 0) {
            suggestions.push({
                category: '人格发展',
                icon: '🧠',
                items: mbtiResult.recommendations.map(r => r.message)
            });
        }

        // BMI建议
        if (bmiResult.tips) {
            suggestions.push({
                category: '健康管理',
                icon: '⚖️',
                items: [bmiResult.tips]
            });
        }

        // 综合建议
        suggestions.push({
            category: '综合发展',
            icon: '🌟',
            items: [
                '保持身心健康是长期发展的基础',
                '建议定期进行健康检查',
                '注意工作与生活的平衡'
            ]
        });

        return suggestions;
    }

    // ==================== 报告导出 ====================

    /**
     * 导出Markdown报告
     * @param {Object} mbtiAnswers - MBTI答案
     * @param {number} height - 身高
     * @param {number} weight - 体重
     * @param {number} age - 年龄
     * @param {string} gender - 性别
     * @param {Object} userPreferences - 用户偏好(可选)
     * @returns {string} Markdown文本
     */
    exportMarkdownReport(mbtiAnswers, height, weight, age, gender, userPreferences = {}) {
        const report = this.generateComprehensiveReport(
            mbtiAnswers, height, weight, age, gender, userPreferences
        );

        let md = `# ${report.title}\n\n`;
        md += `**报告ID**: ${report.id}\n`;
        md += `**生成时间**: ${this.formatter.formatDate(report.timestamp)}\n\n`;

        // 人格分析
        md += `## 🧠 人格分析\n\n`;
        md += `**人格类型**: ${report.personality.type} (${report.personality.typeName})\n`;
        md += `**分组**: ${report.personality.group}\n`;
        md += `**特质**: ${report.personality.traits.join(', ')}\n\n`;

        md += `### 维度分析\n\n`;
        md += `| 维度 | 类型 | 分数 | 强度 |\n`;
        md += `|------|------|------|------|\n`;
        for (const dim of report.personality.dimensions) {
            md += `| ${dim.dimension} | ${dim.letter} | ${dim.score} | ${dim.strength} |\n`;
        }

        // 健康评估
        md += `\n## ⚖️ 健康评估\n\n`;
        md += `**BMI值**: ${report.health.bmi}\n`;
        md += `**分类**: ${report.health.category}\n`;
        md += `**描述**: ${report.health.description}\n`;
        md += `**健康评分**: ${report.health.healthScore}/100\n`;
        md += `**健康建议**: ${report.health.tips}\n`;

        // 匹配度分析
        if (report.match) {
            md += `\n## 📊 匹配度分析\n\n`;
            md += `**整体匹配**: ${report.match.level} (${report.match.percentage}%)\n`;
            
            if (report.match.gaps && report.match.gaps.length > 0) {
                md += `\n### 差距维度\n\n`;
                md += `| 维度 | Agent现状 | 用户期望 | 差距程度 |\n`;
                md += `|------|----------|----------|----------|\n`;
                for (const gap of report.match.gaps) {
                    md += `| ${gap.dimension} | ${gap.agent} | ${gap.user} | ${gap.severity} |\n`;
                }
            }
        }

        // 综合建议
        md += `\n## 💡 综合建议\n\n`;
        for (const suggestion of report.suggestions) {
            md += `### ${suggestion.icon} ${suggestion.category}\n\n`;
            for (const item of suggestion.items) {
                md += `- ${item}\n`;
            }
            md += `\n`;
        }

        return md;
    }

    // ==================== 工具方法 ====================

    /**
     * 获取帮助信息
     * @returns {string} 帮助文本
     */
    getHelp() {
        return `
=== Health Workspace v${this.version} ===

使用方法：

1. MBTI人格诊断
   diagnoseMBTI(answers)
   示例: diagnoseMBTI({1: 'B', 2: 'A', ...})

2. BMI健康评估
   assessBMI(height, weight, age, gender)
   示例: assessBMI(170, 65, 25, 'male')

3. 综合健康报告
   generateComprehensiveReport(mbtiAnswers, height, weight, age, gender)
   示例: generateComprehensiveReport(answers, 170, 65, 25, 'male')

4. 导出Markdown报告
   exportMarkdownReport(mbtiAnswers, height, weight, age, gender)
   示例: exportMarkdownReport(answers, 170, 65, 25, 'male')

获取帮助请参考 INTEGRATION.md 文档
        `.trim();
    }

    /**
     * 获取版本信息
     * @returns {Object} 版本信息
     */
    getVersion() {
        return {
            name: this.name,
            version: this.version,
            timestamp: new Date().toISOString()
        };
    }
}

// 导出单例
module.exports = new HealthWorkspace();
