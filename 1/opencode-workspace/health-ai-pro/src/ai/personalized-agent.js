const config = require('../config');
const AssessmentScales = require('../data/assessment-scales');
const { HealthDataAnalyzer } = require('../data/health-analyzer');

class PersonalizedIntelligenceAgent {
    constructor(userProfile = null) {
        this.userProfile = userProfile || {
            id: null,
            name: '',
            age: null,
            gender: null,
            ageCategory: null,
            preferences: {
                theme: 'light',
                language: 'zh-CN',
                notifications: true
            },
            healthGoals: [],
            healthRecords: []
        };
    }
    
    setProfile(profile) {
        this.userProfile = { ...this.userProfile, ...profile };
        this.userProfile.ageCategory = this.getAgeCategory(this.userProfile.age);
        return this.userProfile;
    }
    
    getAgeCategory(age) {
        if (!age) return null;
        
        const categories = config.ageCategories;
        for (const [key, cat] of Object.entries(categories)) {
            if (age >= cat.min && age <= cat.max) {
                return { key, ...cat };
            }
        }
        return null;
    }
    
    getPersonalizedScales() {
        const scales = [];
        const ageCat = this.userProfile.ageCategory;
        
        scales.push({
            id: 'MBTI',
            ...AssessmentScales.getScale('MBTI'),
            recommended: true,
            reason: '基础人格评估'
        });
        
        if (ageCat) {
            switch (ageCat.key) {
                case 'newborn':
                case 'infant':
                case 'child':
                    this.addScaleIfExists(scales, 'DDST', '儿童发展评估');
                    this.addScaleIfExists(scales, 'RCADS', '儿童情绪评估');
                    break;
                    
                case 'teenager':
                case 'youngAdult':
                case 'adult':
                    this.addScaleIfExists(scales, 'HAMD', '抑郁筛查');
                    this.addScaleIfExists(scales, 'HAMA', '焦虑筛查');
                    this.addScaleIfExists(scales, 'SCL-90', '全面心理评估');
                    break;
                    
                case 'middleAged':
                case 'elderly':
                case 'veryElderly':
                    this.addScaleIfExists(scales, 'MMSE', '认知功能评估');
                    this.addScaleIfExists(scales, 'ADL', '日常生活能力');
                    this.addScaleIfExists(scales, 'HAMD', '情绪状态评估');
                    break;
            }
            
            if (this.userProfile.gender === 'female' && 
                (ageCat.key === 'youngAdult' || ageCat.key === 'adult')) {
                this.addScaleIfExists(scales, 'EPDS', '产后抑郁筛查');
            }
        }
        
        return scales;
    }
    
    addScaleIfExists(scales, scaleId, reason) {
        const scale = AssessmentScales.getScale(scaleId);
        if (scale) {
            scales.push({
                id: scaleId,
                ...scale,
                recommended: true,
                reason
            });
        }
    }
    
    getPersonalizedHealthGoals() {
        const goals = [];
        const ageCat = this.userProfile.ageCategory;
        
        if (!ageCat) return goals;
        
        switch (ageCat.key) {
            case 'teenager':
                goals.push(
                    { id: 'growth', name: '健康成长', priority: 'high' },
                    { id: 'study', name: '学习压力管理', priority: 'medium' },
                    { id: 'social', name: '社交技能发展', priority: 'medium' }
                );
                break;
                
            case 'youngAdult':
            case 'adult':
                goals.push(
                    { id: 'work', name: '工作压力管理', priority: 'high' },
                    { id: 'lifestyle', name: '健康生活方式', priority: 'high' },
                    { id: 'relationships', name: '人际关系', priority: 'medium' }
                );
                break;
                
            case 'middleAged':
                goals.push(
                    { id: 'health', name: '健康维护', priority: 'high' },
                    { id: 'stress', name: '压力管理', priority: 'high' },
                    { id: 'exercise', name: '规律运动', priority: 'medium' }
                );
                break;
                
            case 'elderly':
            case 'veryElderly':
                goals.push(
                    { id: 'cognitive', name: '认知功能保持', priority: 'high' },
                    { id: 'mobility', name: '活动能力', priority: 'high' },
                    { id: 'social', name: '社交活动', priority: 'medium' }
                );
                break;
        }
        
        return goals;
    }
    
    getPersonalizedRecommendations() {
        const recommendations = [];
        const ageCat = this.userProfile.ageCategory;
        
        if (!ageCat) return recommendations;
        
        recommendations.push({
            type: 'general',
            content: '保持规律作息，充足睡眠',
            priority: 'medium'
        });
        
        switch (ageCat.key) {
            case 'child':
                recommendations.push(
                    { type: 'nutrition', content: '保证均衡营养摄入', priority: 'high' },
                    { type: 'activity', content: '保证充足户外活动', priority: 'high' }
                );
                break;
                
            case 'teenager':
                recommendations.push(
                    { type: 'study', content: '合理安排学习时间', priority: 'high' },
                    { type: 'sleep', content: '保证8-10小时睡眠', priority: 'high' }
                );
                break;
                
            case 'youngAdult':
            case 'adult':
                recommendations.push(
                    { type: 'exercise', content: '每周至少150分钟中等强度运动', priority: 'high' },
                    { type: 'diet', content: '低盐低脂饮食', priority: 'high' },
                    { type: 'mental', content: '注意压力释放', priority: 'medium' }
                );
                break;
                
            case 'middleAged':
            case 'elderly':
                recommendations.push(
                    { type: 'checkup', content: '定期健康体检', priority: 'high' },
                    { type: 'medication', content: '遵医嘱用药', priority: 'high' },
                    { type: 'social', content: '保持社交活动', priority: 'medium' }
                );
                break;
        }
        
        return recommendations;
    }
    
    adjustReferenceValues(testType, value) {
        const ageCat = this.userProfile.ageCategory;
        let adjusted = { value, reference: null, status: 'normal' };
        
        switch (testType) {
            case 'bmi':
                if (ageCat) {
                    if (['child', 'teenager'].includes(ageCat.key)) {
                        adjusted.reference = '需要结合年龄性别百分位';
                    } else if (['elderly', 'veryElderly'].includes(ageCat.key)) {
                        adjusted.reference = '22-27 (老年人可略高)';
                        if (value >= 22 && value <= 27) adjusted.status = 'optimal';
                    }
                }
                break;
                
            case 'bloodPressure':
                if (ageCat && ['elderly', 'veryElderly'].includes(ageCat.key)) {
                    adjusted.reference = '150/90 mmHg (老年人标准)';
                }
                break;
        }
        
        return adjusted;
    }
    
    getContextAwareAssistance(currentContext) {
        const assistance = {
            suggestions: [],
            guidance: '',
            quickActions: []
        };
        
        switch (currentContext) {
            case 'assessment':
                assistance.guidance = '正在进行健康评估，有问题可以随时问我';
                assistance.quickActions = [
                    { label: '查看说明', action: 'showHelp' },
                    { label: '暂停测试', action: 'pause' },
                    { label: '保存进度', action: 'save' }
                ];
                break;
                
            case 'dataAnalysis':
                assistance.guidance = '分析您的健康数据中...';
                assistance.suggestions = this.getPersonalizedRecommendations();
                break;
                
            case 'results':
                assistance.guidance = '这是您的评估结果，需要详细解释吗？';
                assistance.quickActions = [
                    { label: '保存结果', action: 'save' },
                    { label: '分享报告', action: 'share' },
                    { label: '制定计划', action: 'plan' }
                ];
                break;
        }
        
        return assistance;
    }
    
    integrateUserExperience(currentFlow) {
        const integrated = {
            flow: currentFlow,
            enhancements: [],
            shortcuts: []
        };
        
        const ageCat = this.userProfile.ageCategory;
        if (ageCat) {
            if (['elderly', 'veryElderly'].includes(ageCat.key)) {
                integrated.enhancements.push(
                    { type: 'ui', feature: 'largerText', active: true },
                    { type: 'ui', feature: 'simplifiedNavigation', active: true },
                    { type: 'assistance', feature: 'autoSave', active: true }
                );
            }
        }
        
        if (this.userProfile.preferences.notifications) {
            integrated.shortcuts.push(
                { key: 'reminders', label: '健康提醒', enabled: true }
            );
        }
        
        return integrated;
    }
}

module.exports = PersonalizedIntelligenceAgent;