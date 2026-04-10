const config = require('../config');
const AssessmentScales = require('./assessment-scales');

class AIQASystem {
    constructor() {
        this.history = [];
        this.notifications = [];
        this.context = {
            currentScale: null,
            userProfile: null,
            currentTopic: null
        };
    }
    
    async processQuestion(question, options = {}) {
        const { userProfile, scaleContext } = options;
        this.context.userProfile = userProfile;
        
        let response = {
            answer: '',
            suggestions: [],
            alerts: [],
            scaleRecommendation: null,
            confidence: 0.8
        };
        
        if (scaleContext && scaleContext.scaleId) {
            response = await this.handleScaleQuestion(question, scaleContext, userProfile);
        } else if (this.isMedicalInquiry(question)) {
            response = await this.handleMedicalQuestion(question, userProfile);
        } else if (this.isHealthAssessment(question)) {
            response = await this.handleAssessmentQuestion(question, userProfile);
        } else {
            response = await this.handleGeneralQuestion(question, userProfile);
        }
        
        this.history.push({
            question,
            response,
            timestamp: new Date().toISOString()
        });
        
        if (response.alerts && response.alerts.length > 0) {
            this.sendNotifications(response.alerts);
        }
        
        return response;
    }
    
    isMedicalInquiry(question) {
        const keywords = ['症状', '疾病', '治疗', '药', '诊断', '检查', '痛', '不舒服', '怎么办', 'medical', 'symptom', 'disease', 'treatment', 'medicine'];
        return keywords.some(keyword => question.includes(keyword));
    }
    
    isHealthAssessment(question) {
        const keywords = ['测试', '评估', '量表', '检查', 'score', 'assessment', 'test', 'scale'];
        return keywords.some(keyword => question.includes(keyword));
    }
    
    async handleScaleQuestion(question, scaleContext, userProfile) {
        const scale = AssessmentScales.getScale(scaleContext.scaleId);
        
        return {
            answer: `关于${scale.name}的问题解答。${this.getScaleGuidance(scale, userProfile)}`,
            suggestions: [
                '开始量表测试',
                '查看评分标准',
                '了解更多信息'
            ],
            alerts: this.getAlertsForScale(scale, scaleContext),
            confidence: 0.9
        };
    }
    
    async handleMedicalQuestion(question, userProfile) {
        const ageCategory = this.getAgeCategory(userProfile?.age);
        
        let answer = '这是一个基于医学知识的回答。\n\n重要提示：本系统仅供参考，不能替代专业医生诊断。\n\n';
        answer += `根据您的${ageCategory ? `年龄（${ageCategory.name}）` : ''}情况，建议您：\n`;
        answer += '1. 详细记录症状\n2. 测量生命体征\n3. 及时就医咨询\n';
        
        return {
            answer,
            suggestions: [
                '测量血压',
                '测量血糖',
                '预约医生',
                '查看健康档案'
            ],
            alerts: [
                { type: 'info', message: '建议咨询专业医生', priority: 'medium' }
            ],
            confidence: 0.7
        };
    }
    
    async handleAssessmentQuestion(question, userProfile) {
        const recommendedScales = this.getRecommendedScales(userProfile);
        
        return {
            answer: '根据您的需求，我为您推荐以下健康评估：',
            suggestions: recommendedScales.map(s => `开始${s.name}`),
            scaleRecommendation: recommendedScales[0]?.id,
            confidence: 0.85
        };
    }
    
    async handleGeneralQuestion(question, userProfile) {
        return {
            answer: '感谢您的提问。我可以帮助您进行健康评估、解答健康问题，或进行数据分析。\n\n您想：\n1. 进行健康评估？\n2. 分析健康数据？\n3. 了解更多健康知识？',
            suggestions: [
                '开始MBTI测试',
                '查看BMI评估',
                '健康数据分析',
                '设置用户资料'
            ],
            confidence: 0.6
        };
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
    
    getRecommendedScales(userProfile) {
        const ageCat = this.getAgeCategory(userProfile?.age);
        let scales = [];
        
        scales.push(AssessmentScales.getScale('MBTI'));
        
        if (ageCat) {
            switch (ageCat.key) {
                case 'newborn':
                case 'infant':
                case 'child':
                    scales.push(AssessmentScales.getScale('DDST'));
                    scales.push(AssessmentScales.getScale('RCADS'));
                    break;
                case 'teenager':
                case 'youngAdult':
                case 'adult':
                    scales.push(AssessmentScales.getScale('HAMD'));
                    scales.push(AssessmentScales.getScale('HAMA'));
                    scales.push(AssessmentScales.getScale('SCL-90'));
                    break;
                case 'middleAged':
                case 'elderly':
                case 'veryElderly':
                    scales.push(AssessmentScales.getScale('MMSE'));
                    scales.push(AssessmentScales.getScale('ADL'));
                    break;
            }
        }
        
        if (userProfile?.gender === 'female' && ageCat?.key === 'youngAdult') {
            scales.push(AssessmentScales.getScale('EPDS'));
        }
        
        return scales.filter(s => s !== undefined).slice(0, 5);
    }
    
    getScaleGuidance(scale, userProfile) {
        let guidance = '';
        
        if (userProfile) {
            const ageCat = this.getAgeCategory(userProfile.age);
            if (ageCat) {
                guidance += `\n\n基于您的年龄（${ageCat.name}），特别建议：`;
            }
        }
        
        return guidance;
    }
    
    getAlertsForScale(scale, context) {
        const alerts = [];
        
        if (scale.type === 'depression' || scale.type === 'anxiety') {
            alerts.push({
                type: 'warning',
                message: '如出现严重症状，请及时就医',
                priority: 'high'
            });
        }
        
        return alerts;
    }
    
    sendNotifications(alerts) {
        alerts.forEach(alert => {
            this.notifications.push({
                ...alert,
                timestamp: new Date().toISOString(),
                acknowledged: false
            });
            
            if (alert.type === 'warning' && alert.priority === 'high') {
                this.playAlertSound();
            }
        });
    }
    
    playAlertSound() {
        try {
            if (typeof Audio !== 'undefined') {
                const audio = new Audio('alert.mp3');
                audio.play().catch(() => {});
            }
        } catch (e) {
        }
    }
    
    getConversationHistory() {
        return this.history;
    }
    
    getNotifications() {
        return this.notifications;
    }
    
    clearHistory() {
        this.history = [];
    }
}

module.exports = AIQASystem;