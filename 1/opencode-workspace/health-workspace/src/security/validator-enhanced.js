/**
 * ============================================================================
 * 增强型输入验证模块
 * ============================================================================
 * 
 * 功能：
 * - 全面的数据类型验证
 * - 长度和范围限制
 * - 格式规范验证
 * - 业务规则验证
 * - SQL注入防护
 * - XSS攻击防护
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

/**
 * 验证结果类
 */
class ValidationResult {
    constructor() {
        this.valid = true;
        this.errors = [];
        this.warnings = [];
    }

    addError(field, message, code) {
        this.valid = false;
        this.errors.push({ field, message, code });
    }

    addWarning(field, message) {
        this.warnings.push({ field, message });
    }

    static success() {
        return new ValidationResult();
    }

    static failure(field, message, code) {
        const result = new ValidationResult();
        result.addError(field, message, code);
        return result;
    }

    merge(other) {
        this.valid = this.valid && other.valid;
        this.errors.push(...other.errors);
        this.warnings.push(...other.warnings);
        return this;
    }
}

/**
 * 增强验证器类
 */
class EnhancedValidator {
    /**
     * 验证身高
     * @param {number} height - 身高(cm)
     */
    static validateHeight(height) {
        const result = new ValidationResult();
        
        // 类型检查
        if (typeof height !== 'number' || isNaN(height)) {
            result.addError('height', '身高必须是有效数字', 'INVALID_TYPE');
            return result;
        }
        
        // 长度限制
        if (height < 50 || height > 250) {
            result.addError('height', '身高必须在50到250之间', 'OUT_OF_RANGE');
            return result;
        }
        
        // 精度检查
        if (!Number.isFinite(height)) {
            result.addError('height', '身高值无效', 'INVALID_VALUE');
            return result;
        }
        
        // 小数位检查
        if (height % 1 !== 0 && height.toString().split('.')[1].length > 1) {
            result.addWarning('height', '建议使用整数身高值');
        }
        
        return result;
    }

    /**
     * 验证体重
     * @param {number} weight - 体重(kg)
     */
    static validateWeight(weight) {
        const result = new ValidationResult();
        
        // 类型检查
        if (typeof weight !== 'number' || isNaN(weight)) {
            result.addError('weight', '体重必须是有效数字', 'INVALID_TYPE');
            return result;
        }
        
        // 长度限制
        if (weight < 10 || weight > 500) {
            result.addError('weight', '体重必须在10到500之间', 'OUT_OF_RANGE');
            return result;
        }
        
        // 精度检查
        if (!Number.isFinite(weight)) {
            result.addError('weight', '体重值无效', 'INVALID_VALUE');
            return result;
        }
        
        return result;
    }

    /**
     * 验证年龄
     * @param {number} age - 年龄
     */
    static validateAge(age) {
        const result = new ValidationResult();
        
        // 类型检查
        if (typeof age !== 'number' || isNaN(age)) {
            result.addError('age', '年龄必须是有效数字', 'INVALID_TYPE');
            return result;
        }
        
        // 长度限制
        if (age < 1 || age > 150) {
            result.addError('age', '年龄必须在1到150之间', 'OUT_OF_RANGE');
            return result;
        }
        
        // 整数检查
        if (!Number.isInteger(age)) {
            result.addError('age', '年龄必须是整数', 'INVALID_FORMAT');
            return result;
        }
        
        return result;
    }

    /**
     * 验证性别
     * @param {string} gender - 性别
     */
    static validateGender(gender) {
        const result = new ValidationResult();
        const validGenders = ['male', 'female'];
        
        if (!validGenders.includes(gender)) {
            result.addError('gender', '性别必须是male或female', 'INVALID_VALUE');
            return result;
        }
        
        return result;
    }

    /**
     * 验证MBTI答案
     * @param {Object} answers - MBTI答案
     */
    static validateMBTIAnswers(answers) {
        const result = new ValidationResult();
        
        // 基本检查
        if (!answers || typeof answers !== 'object') {
            result.addError('answers', '答案必须是对象', 'INVALID_TYPE');
            return result;
        }
        
        // 检查题目数量
        const questionCount = Object.keys(answers).length;
        if (questionCount !== 26) {
            result.addError('answers', `MBTI问卷必须包含26题，当前${questionCount}题`, 'INVALID_COUNT');
            return result;
        }
        
        // 检查题目ID重复
        const questionIds = Object.keys(answers).map(k => parseInt(k));
        const uniqueIds = new Set(questionIds);
        if (uniqueIds.size !== 26) {
            result.addError('answers', '问卷题目ID不能重复', 'DUPLICATE_ID');
            return result;
        }
        
        // 检查答案格式和安全性
        for (const [key, value] of Object.entries(answers)) {
            const questionId = parseInt(key);
            
            // 检查ID范围
            if (questionId < 1 || questionId > 26) {
                result.addError(`answers.question_${key}`, `无效的题目ID: ${questionId}`, 'INVALID_ID');
                continue;
            }
            
            // 检查答案格式
            const normalizedValue = String(value).toUpperCase();
            if (!['A', 'B'].includes(normalizedValue)) {
                result.addError(`answers.question_${key}`, `无效的答案: ${value}，必须是A或B`, 'INVALID_ANSWER');
                continue;
            }
            
            // SQL注入防护 - 检查特殊字符
            if (this.containsSQLPatterns(value)) {
                result.addError(`answers.question_${key}`, '答案包含非法字符', 'SQL_INJECTION_SUSPECTED');
            }
            
            // XSS防护 - 检查HTML标签
            if (this.containsXSSPatterns(value)) {
                result.addError(`answers.question_${key}`, '答案包含非法内容', 'XSS_SUSPECTED');
            }
        }
        
        return result;
    }

    /**
     * 检查SQL注入模式
     * @param {string} value - 要检查的值
     */
    static containsSQLPatterns(value) {
        const sqlPatterns = [
            /('|"|;|--|\/\*|\*\/|xp_|exec|execute|drop|delete|insert|update|union)/gi,
            /(\bOR\b|\bAND\b).*(=|!|<|>)/gi,
            /union\s+select/gi,
            /into\s+outfile/gi,
            /load_file/gi,
            /benchmark/gi,
            /sleep\s*\(/gi
        ];
        
        const strValue = String(value).toLowerCase();
        return sqlPatterns.some(pattern => pattern.test(strValue));
    }

    /**
     * 检查XSS攻击模式
     * @param {string} value - 要检查的值
     */
    static containsXSSPatterns(value) {
        const xssPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /<iframe[^>]*>.*?<\/iframe>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<img[^>]+onerror/gi,
            /<svg[^>]+onload/gi,
            /<object[^>]*>/gi,
            /<embed[^>]*>/gi,
            /<link[^>]*>/gi,
            /<meta[^>]*>/gi
        ];
        
        const strValue = String(value).toLowerCase();
        return xssPatterns.some(pattern => pattern.test(strValue));
    }

    /**
     * 验证用户偏好设置
     * @param {Object} preferences - 用户偏好
     */
    static validateUserPreferences(preferences) {
        const result = new ValidationResult();
        
        if (!preferences || typeof preferences !== 'object') {
            result.addError('preferences', '用户偏好必须是对象', 'INVALID_TYPE');
            return result;
        }
        
        const validDimensions = ['E_I', 'S_N', 'T_F', 'J_P'];
        const validValues = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'];
        
        for (const [key, value] of Object.entries(preferences)) {
            if (!validDimensions.includes(key)) {
                result.addError(`preferences.${key}`, `无效的维度: ${key}`, 'INVALID_DIMENSION');
                continue;
            }
            
            if (!validValues.includes(value)) {
                result.addError(`preferences.${key}`, `无效的偏好值: ${value}`, 'INVALID_VALUE');
            }
        }
        
        return result;
    }

    /**
     * 验证综合健康报告请求
     * @param {Object} request - 报告请求
     */
    static validateComprehensiveReportRequest(request) {
        const result = new ValidationResult();
        
        // 验证基本字段
        if (!request || typeof request !== 'object') {
            result.addError('request', '请求必须是对象', 'INVALID_TYPE');
            return result;
        }
        
        // 验证身高
        if (request.height !== undefined) {
            const heightResult = this.validateHeight(request.height);
            result.merge(heightResult);
        } else {
            result.addError('height', '身高是必填项', 'MISSING_FIELD');
        }
        
        // 验证体重
        if (request.weight !== undefined) {
            const weightResult = this.validateWeight(request.weight);
            result.merge(weightResult);
        } else {
            result.addError('weight', '体重是必填项', 'MISSING_FIELD');
        }
        
        // 验证年龄
        if (request.age !== undefined) {
            const ageResult = this.validateAge(request.age);
            result.merge(ageResult);
        } else {
            result.addError('age', '年龄是必填项', 'MISSING_FIELD');
        }
        
        // 验证性别
        if (request.gender !== undefined) {
            const genderResult = this.validateGender(request.gender);
            result.merge(genderResult);
        } else {
            result.addError('gender', '性别是必填项', 'MISSING_FIELD');
        }
        
        // 验证MBTI答案
        if (request.mbtiAnswers !== undefined) {
            const answersResult = this.validateMBTIAnswers(request.mbtiAnswers);
            result.merge(answersResult);
        }
        
        // 验证用户偏好（可选）
        if (request.userPreferences !== undefined) {
            const prefsResult = this.validateUserPreferences(request.userPreferences);
            result.merge(prefsResult);
        }
        
        return result;
    }

    /**
     * 清理输入数据
     * @param {string} input - 输入字符串
     */
    static sanitize(input) {
        if (typeof input !== 'string') return input;
        
        // 移除HTML标签
        let cleaned = input.replace(/<[^>]*>/g, '');
        
        // 转义特殊字符
        cleaned = cleaned
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
        
        // 移除SQL注入特征
        cleaned = cleaned
            .replace(/('|"|;)/g, '')
            .replace(/--/g, '')
            .replace(/\/\*/g, '')
            .replace(/\*\//g, '');
        
        return cleaned.trim();
    }
}

module.exports = EnhancedValidator;
module.exports.ValidationResult = ValidationResult;
