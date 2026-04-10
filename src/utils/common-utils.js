/**
 * 通用工具函数库
 * 包含数据验证、格式化、转换等常用工具
 */

const CommonUtils = {
    /**
     * 数据验证工具
     */
    validators: {
        // 验证邮箱
        isEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // 验证手机号
        isPhone(phone) {
            const re = /^1[3-9]\d{9}$/;
            return re.test(phone);
        },

        // 验证URL
        isUrl(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },

        // 验证年龄
        isAge(age) {
            const num = parseInt(age);
            return !isNaN(num) && num > 0 && num < 150;
        },

        // 验证日期
        isDate(dateStr) {
            const date = new Date(dateStr);
            return date instanceof Date && !isNaN(date);
        },

        // 验证数字范围
        isInRange(num, min, max) {
            const n = parseFloat(num);
            return !isNaN(n) && n >= min && n <= max;
        },

        // 验证非空
        isNotEmpty(value) {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            return true;
        },

        // 验证API密钥格式
        isAPIKey(key) {
            if (!key || typeof key !== 'string') return false;
            return key.length >= 20 && /^[A-Za-z0-9_-]+$/.test(key);
        }
    },

    /**
     * 数据格式化工具
     */
    formatters: {
        // 格式化日期
        formatDate(date, format = 'YYYY-MM-DD') {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');

            return format
                .replace('YYYY', year)
                .replace('MM', month)
                .replace('DD', day)
                .replace('HH', hours)
                .replace('mm', minutes)
                .replace('ss', seconds);
        },

        // 格式化数字
        formatNumber(num, decimals = 2) {
            return parseFloat(num).toFixed(decimals);
        },

        // 格式化百分比
        formatPercent(num, decimals = 1) {
            return `${(num * 100).toFixed(decimals)}%`;
        },

        // 格式化文件大小
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        },

        // 脱敏处理
        maskSensitive(str, start = 3, end = 4) {
            if (!str || str.length < start + end) return str;
            const startStr = str.substring(0, start);
            const endStr = str.substring(str.length - end);
            const mask = '*'.repeat(Math.min(str.length - start - end, 10));
            return startStr + mask + endStr;
        },

        // 截断文本
        truncate(str, maxLength = 100, suffix = '...') {
            if (!str || str.length <= maxLength) return str;
            return str.substring(0, maxLength - suffix.length) + suffix;
        }
    },

    /**
     * 数据转换工具
     */
    converters: {
        // 字符串转对象
        parseJSON(str, defaultValue = {}) {
            try {
                return JSON.parse(str);
            } catch {
                return defaultValue;
            }
        },

        // 对象转字符串
        toJSON(obj, pretty = false) {
            try {
                return JSON.stringify(obj, null, pretty ? 2 : 0);
            } catch {
                return '{}';
            }
        },

        // 字符串转布尔值
        toBoolean(value) {
            if (typeof value === 'boolean') return value;
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true' || value === '1';
            }
            return Boolean(value);
        },

        // 首字母大写
        capitalize(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },

        // 驼峰转短横线
        camelToKebab(str) {
            return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },

        // 短横线转驼峰
        kebabToCamel(str) {
            return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        },

        // 千分位分隔
        addThousandsSeparator(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        // 阴阳历转换（简化版）
        lunarToSolar(lunarDate) {
            // 简化实现，实际需要更复杂的算法
            return lunarDate;
        }
    },

    /**
     * 数组工具
     */
    arrays: {
        // 去重
        unique(arr) {
            return [...new Set(arr)];
        },

        // 打乱顺序
        shuffle(arr) {
            const result = [...arr];
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }
            return result;
        },

        // 分组
        groupBy(arr, key) {
            return arr.reduce((result, item) => {
                const group = typeof key === 'function' ? key(item) : item[key];
                if (!result[group]) result[group] = [];
                result[group].push(item);
                return result;
            }, {});
        },

        // 求交集
        intersection(arr1, arr2) {
            return arr1.filter(item => arr2.includes(item));
        },

        // 求差集
        difference(arr1, arr2) {
            return arr1.filter(item => !arr2.includes(item));
        },

        // 扁平化
        flatten(arr) {
            return arr.reduce((result, item) => {
                return result.concat(Array.isArray(item) ? this.flatten(item) : item);
            }, []);
        },

        // 按属性排序
        sortBy(arr, key, order = 'asc') {
            return [...arr].sort((a, b) => {
                const aVal = typeof key === 'function' ? key(a) : a[key];
                const bVal = typeof key === 'function' ? key(b) : b[key];
                
                if (aVal < bVal) return order === 'asc' ? -1 : 1;
                if (aVal > bVal) return order === 'asc' ? 1 : -1;
                return 0;
            });
        }
    },

    /**
     * 对象工具
     */
    objects: {
        // 深拷贝
        deepClone(obj) {
            if (obj === null || typeof obj !== 'object') return obj;
            if (obj instanceof Date) return new Date(obj);
            if (obj instanceof Array) return obj.map(item => this.deepClone(item));
            if (obj instanceof Object) {
                const copy = {};
                Object.keys(obj).forEach(key => {
                    copy[key] = this.deepClone(obj[key]);
                });
                return copy;
            }
        },

        // 合并对象
        merge(target, ...sources) {
            return sources.reduce((result, source) => {
                Object.keys(source).forEach(key => {
                    if (source[key] instanceof Object && key in result) {
                        result[key] = this.merge(result[key], source[key]);
                    } else {
                        result[key] = source[key];
                    }
                });
                return result;
            }, { ...target });
        },

        // 提取子集
        pick(obj, keys) {
            return keys.reduce((result, key) => {
                if (key in obj) result[key] = obj[key];
                return result;
            }, {});
        },

        // 排除属性
        omit(obj, keys) {
            const result = { ...obj };
            keys.forEach(key => delete result[key]);
            return result;
        },

        // 检查空对象
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },

        // 获取嵌套属性
        getNestedValue(obj, path, defaultValue = undefined) {
            return path.split('.').reduce((current, key) => {
                return current && current[key] !== undefined ? current[key] : defaultValue;
            }, obj);
        }
    },

    /**
     * 字符串工具
     */
    strings: {
        // 移除HTML标签
        stripHTML(html) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || '';
        },

        // 转义HTML
        escapeHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        // 反转义HTML
        unescapeHTML(str) {
            const div = document.createElement('div');
            div.innerHTML = str;
            return div.textContent;
        },

        // 生成随机字符串
        randomString(length = 16, charset = 'alphanumeric') {
            const charsets = {
                alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                numeric: '0123456789',
                hex: '0123456789abcdef'
            };
            
            const chars = charsets[charset] || charset;
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },

        // 替换占位符
        replacePlaceholders(template, values) {
            return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
                return values[key] !== undefined ? values[key] : `{{${key}}}`;
            });
        }
    },

    /**
     * 数学工具
     */
    math: {
        // 随机整数
        randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // 限制范围
        clamp(num, min, max) {
            return Math.min(Math.max(num, min), max);
        },

        // 四舍五入到指定小数位
        round(num, decimals = 0) {
            return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        },

        // 计算平均值
        average(arr) {
            if (arr.length === 0) return 0;
            return arr.reduce((sum, val) => sum + val, 0) / arr.length;
        },

        // 计算标准差
        standardDeviation(arr) {
            if (arr.length === 0) return 0;
            const avg = this.average(arr);
            const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
            return Math.sqrt(this.average(squareDiffs));
        },

        // 等比缩放
        scale(num, inMin, inMax, outMin, outMax) {
            return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        }
    },

    /**
     * 浏览器工具
     */
    browser: {
        // 获取用户代理
        getUserAgent() {
            return navigator.userAgent;
        },

        // 检测是否为移动设备
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
        },

        // 检测浏览器类型
        getBrowser() {
            const ua = navigator.userAgent;
            if (ua.includes('Chrome')) return 'Chrome';
            if (ua.includes('Firefox')) return 'Firefox';
            if (ua.includes('Safari')) return 'Safari';
            if (ua.includes('Edge')) return 'Edge';
            if (ua.includes('MSIE') || ua.includes('Trident')) return 'IE';
            return 'Unknown';
        },

        // 获取屏幕尺寸
        getScreenSize() {
            return {
                width: window.screen.width,
                height: window.screen.height
            };
        },

        // 获取视口尺寸
        getViewportSize() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        },

        // 复制到剪贴板
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                // fallback
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                const success = document.execCommand('copy');
                document.body.removeChild(textarea);
                return success;
            }
        },

        // 下载文件
        downloadFile(content, filename, type = 'text/plain') {
            const blob = new Blob([content], { type });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    },

    /**
     * 防抖和节流
     */
    performance: {
        // 防抖
        debounce(func, wait = 300) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // 节流
        throttle(func, limit = 300) {
            let inThrottle;
            return function executedFunction(...args) {
                if (!inThrottle) {
                    func(...args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // 缓存函数结果
        memoize(func) {
            const cache = new Map();
            return function memoized(...args) {
                const key = JSON.stringify(args);
                if (cache.has(key)) {
                    return cache.get(key);
                }
                const result = func.apply(this, args);
                cache.set(key, result);
                return result;
            };
        }
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommonUtils;
}
