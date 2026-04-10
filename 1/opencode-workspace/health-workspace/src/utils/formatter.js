/**
 * ============================================================================
 * 通用格式化工具模块
 * ============================================================================
 * 
 * 功能：
 * - 数据格式化
 * - 文本处理
 * - 报告生成辅助
 * 
 * 作者：OpenCode Team
 * 版本：1.0.0
 * ============================================================================
 */

/**
 * 格式化工具类
 */
class Formatter {
    /**
     * 格式化数字保留指定小数位
     * @param {number} value - 数字
     * @param {number} decimals - 小数位数
     */
    static round(value, decimals = 1) {
        const multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
    }

    /**
     * 格式化百分比
     * @param {number} value - 0-100的数值
     * @param {boolean} withSymbol - 是否带百分号
     */
    static percentage(value, withSymbol = true) {
        const rounded = this.round(value, 1);
        return withSymbol ? `${rounded}%` : rounded;
    }

    /**
     * 格式化时间戳为可读日期
     * @param {string|Date} timestamp - ISO时间戳
     */
    static formatDate(timestamp = new Date()) {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
        return date.toLocaleString('zh-CN');
    }

    /**
     * 生成唯一ID
     */
    static generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 首字母大写
     * @param {string} str - 字符串
     */
    static capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * 将下划线转换为驼峰
     * @param {string} str - 下划线字符串
     */
    static toCamelCase(str) {
        return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    /**
     * 生成进度条
     * @param {number} percentage - 百分比
     * @param {number} length - 条长度
     */
    static progressBar(percentage, length = 20) {
        const filled = Math.round((percentage / 100) * length);
        const empty = length - filled;
        return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;
    }
}

module.exports = Formatter;
