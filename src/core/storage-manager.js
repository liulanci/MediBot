/**
 * 本地存储管理器
 * 提供安全的数据存储和检索功能
 */

class StorageManager {
    constructor() {
        this.prefix = 'health_ai_';
        this.storage = localStorage;
    }

    /**
     * 设置项目
     */
    set(key, value) {
        try {
            const serialized = this.serialize(value);
            this.storage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }

    /**
     * 获取项目
     */
    get(key, defaultValue = null) {
        try {
            const item = this.storage.getItem(this.prefix + key);
            if (item === null) return defaultValue;
            return this.deserialize(item);
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }

    /**
     * 删除项目
     */
    remove(key) {
        try {
            this.storage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    /**
     * 清空所有项目
     */
    clear() {
        try {
            const keys = this.getAllKeys();
            keys.forEach(key => this.storage.removeItem(this.prefix + key));
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }

    /**
     * 获取所有键
     */
    getAllKeys() {
        const keys = [];
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keys.push(key.replace(this.prefix, ''));
            }
        }
        return keys;
    }

    /**
     * 检查键是否存在
     */
    has(key) {
        return this.storage.getItem(this.prefix + key) !== null;
    }

    /**
     * 获取存储使用情况
     */
    getUsage() {
        let totalSize = 0;
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            const value = this.storage.getItem(key);
            if (key && key.startsWith(this.prefix)) {
                totalSize += (key.length + value.length) * 2; // UTF-16
            }
        }
        return {
            used: totalSize,
            usedFormatted: this.formatBytes(totalSize),
            max: 5 * 1024 * 1024, // 通常为5MB
            maxFormatted: '5 MB',
            percent: ((totalSize / (5 * 1024 * 1024)) * 100).toFixed(2) + '%'
        };
    }

    /**
     * 序列化值
     */
    serialize(value) {
        return JSON.stringify(value);
    }

    /**
     * 反序列化值
     */
    deserialize(value) {
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }

    /**
     * 格式化字节大小
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 设置用户配置
     */
    setUserConfig(config) {
        return this.set('user_config', config);
    }

    /**
     * 获取用户配置
     */
    getUserConfig() {
        return this.get('user_config', {
            theme: 'dark',
            language: 'zh-CN',
            notifications: true,
            autoSave: true
        });
    }

    /**
     * 保存AI配置
     */
    setAIConfig(config) {
        return this.set('ai_config', config);
    }

    /**
     * 获取AI配置
     */
    getAIConfig() {
        return this.get('ai_config', {
            provider: 'openai_gpt4',
            temperature: 0.7,
            maxTokens: 2000
        });
    }

    /**
     * 保存评估历史
     */
    saveAssessmentResult(result) {
        const history = this.getAssessmentHistory();
        history.unshift({
            ...result,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        // 只保留最近100条
        if (history.length > 100) {
            history.pop();
        }
        return this.set('assessment_history', history);
    }

    /**
     * 获取评估历史
     */
    getAssessmentHistory() {
        return this.get('assessment_history', []);
    }

    /**
     * 清除评估历史
     */
    clearAssessmentHistory() {
        return this.remove('assessment_history');
    }

    /**
     * 保存用户资料
     */
    setUserProfile(profile) {
        return this.set('user_profile', profile);
    }

    /**
     * 获取用户资料
     */
    getUserProfile() {
        return this.get('user_profile', {
            name: '',
            age: null,
            gender: null,
            height: null,
            weight: null,
            bloodType: null
        });
    }

    /**
     * 保存健康记录
     */
    addHealthRecord(record) {
        const records = this.getHealthRecords();
        records.push({
            ...record,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        return this.set('health_records', records);
    }

    /**
     * 获取健康记录
     */
    getHealthRecords(type = null) {
        const records = this.get('health_records', []);
        if (type) {
            return records.filter(r => r.type === type);
        }
        return records;
    }

    /**
     * 导出所有数据
     */
    exportAllData() {
        const data = {
            exportDate: new Date().toISOString(),
            userConfig: this.getUserConfig(),
            aiConfig: this.getAIConfig(),
            userProfile: this.getUserProfile(),
            assessmentHistory: this.getAssessmentHistory(),
            healthRecords: this.getHealthRecords()
        };
        return JSON.stringify(data, null, 2);
    }

    /**
     * 导入数据
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.userConfig) this.setUserConfig(data.userConfig);
            if (data.aiConfig) this.setAIConfig(data.aiConfig);
            if (data.userProfile) this.setUserProfile(data.userProfile);
            if (data.assessmentHistory) this.set('assessment_history', data.assessmentHistory);
            if (data.healthRecords) this.set('health_records', data.healthRecords);
            
            return true;
        } catch (error) {
            console.error('Import data error:', error);
            return false;
        }
    }
}

// 导出单例
const storageManager = new StorageManager();
