/**
 * ============================================================================
 * 通用验证工具模块
 * ============================================================================
 * 
 * 功能：
 * - 参数验证
 * - 范围检查
 * - 类型检查
 * 
 * 作者：OpenCode Team
 * 版本：1.0.0
 * ============================================================================
 */

/**
 * 验证工具类
 */
class Validator {
    /**
     * 验证数字是否在范围内
     * @param {number} value - 要验证的值
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @param {string} fieldName - 字段名称
     */
    static validateRange(value, min, max, fieldName = '值') {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error(`${fieldName}必须是有效数字`);
        }
        if (value < min || value > max) {
            throw new Error(`${fieldName}必须在${min}到${max}之间`);
        }
        return true;
    }

    /**
     * 验证必填参数
     * @param {any} value - 要验证的值
     * @param {string} fieldName - 字段名称
     */
    static validateRequired(value, fieldName = '参数') {
        if (value === null || value === undefined || value === '') {
            throw new Error(`${fieldName}不能为空`);
        }
        return true;
    }

    /**
     * 验证身高
     * @param {number} height - 身高(cm)
     */
    static validateHeight(height) {
        return this.validateRange(height, 50, 250, '身高');
    }

    /**
     * 验证体重
     * @param {number} weight - 体重(kg)
     */
    static validateWeight(weight) {
        return this.validateRange(weight, 10, 500, '体重');
    }

    /**
     * 验证年龄
     * @param {number} age - 年龄
     */
    static validateAge(age) {
        return this.validateRange(age, 1, 150, '年龄');
    }

    /**
     * 验证性别
     * @param {string} gender - 性别
     */
    static validateGender(gender) {
        const validGenders = ['male', 'female'];
        if (!validGenders.includes(gender)) {
            throw new Error(`性别必须是'male'或'female'`);
        }
        return true;
    }

    /**
     * 验证MBTI答案
     * @param {Object} answers - MBTI答案
     */
    static validateMBTIAnswers(answers) {
        this.validateRequired(answers, '答案');

        for (const [key, value] of Object.entries(answers)) {
            const questionId = parseInt(key);
            if (questionId < 1 || questionId > 26) {
                throw new Error(`无效的题目ID: ${questionId}`);
            }
            if (!['A', 'B', 'a', 'b'].includes(value)) {
                throw new Error(`无效的答案: ${value}，必须是'A'或'B'`);
            }
        }
        return true;
    }
}

module.exports = Validator;
