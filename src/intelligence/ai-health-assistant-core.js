/**
 * AI智能健康助手核心 - AI Intelligent Health Assistant Core
 * 整合医学知识图谱、智能诊断、个性化健康管理
 */

class AIHealthAssistant {
    constructor() {
        this.knowledgeGraph = null;
        this.diagnosisEngine = null;
        this.healthManager = null;
        this.conversationHistory = [];
        this.contextWindow = 10;
        this.initialize();
    }

    /**
     * 初始化
     */
    initialize() {
        // 初始化知识图谱
        if (typeof medicalKnowledgeGraph !== 'undefined') {
            this.knowledgeGraph = medicalKnowledgeGraph;
        }

        // 初始化诊断引擎
        if (typeof intelligentDiagnosisEngine !== 'undefined') {
            this.diagnosisEngine = intelligentDiagnosisEngine;
            this.diagnosisEngine.initialize(this.knowledgeGraph);
        }

        // 初始化健康管理器
        if (typeof personalizedHealthManager !== 'undefined') {
            this.healthManager = personalizedHealthManager;
        }
    }

    /**
     * 核心对话接口
     */
    async processMessage(userMessage, context = {}) {
        const startTime = Date.now();
        
        // 1. 理解用户意图
        const intent = this.understandIntent(userMessage);
        
        // 2. 构建响应
        let response = {
            type: intent.type,
            content: '',
            data: null,
            suggestions: []
        };

        switch (intent.type) {
            case 'diagnosis':
                response = await this.handleDiagnosis(intent.entities, context);
                break;
            case 'symptom_analysis':
                response = this.handleSymptomAnalysis(intent.entities);
                break;
            case 'health_query':
                response = this.handleHealthQuery(intent.entities);
                break;
            case 'lifestyle_advice':
                response = this.handleLifestyleAdvice(intent.entities);
                break;
            case 'medical_info':
                response = this.handleMedicalInfo(intent.entities);
                break;
            case 'general':
            default:
                response = this.handleGeneralQuery(userMessage);
                break;
        }

        // 3. 记录对话历史
        this.recordConversation(userMessage, response);

        // 4. 添加元信息
        response.metadata = {
            intent: intent.type,
            confidence: intent.confidence,
            processingTime: Date.now() - startTime,
            timestamp: new Date().toISOString()
        };

        return response;
    }

    /**
     * 理解用户意图
     */
    understandIntent(message) {
        const message_lower = message.toLowerCase();
        
        // 症状描述模式
        const symptomPatterns = [
            /我(最近|这几天|这几天|最近一段时间)(感觉|觉得|好像|好像有|有点)/,
            /(头痛|头晕|胸闷|心悸|咳嗽|发热|肚子疼)/,
            /(不舒服|难受|疼痛|不适)/,
            /出现了.*症状/,
            /(可能|也许|是不是).*得了/
        ];

        // 诊断咨询模式
        const diagnosisPatterns = [
            /帮我(诊断|看看|分析).*(什么|哪个)/,
            /(什么病|得了什么|诊断|病)/,
            /(什么原因|为什么|怎么会)/,
            /需要.*检查/
        ];

        // 健康查询模式
        const healthQueryPatterns = [
            /(我的|检查|报告|指标)/,
            /(正常|异常|偏高|偏低)/,
            /(血糖|血压|血脂|肝功能|肾功能)/,
            /(结果|数据|指标)/
        ];

        // 生活方式咨询模式
        const lifestylePatterns = [
            /(怎么|如何)(减肥|健身|养生|调理|保养)/,
            /(建议|应该|可以)(做|吃|喝|运动)/,
            /(健康|养生|保健|生活方式)/
        ];

        // 医学知识查询模式
        const medicalInfoPatterns = [
            /(什么是|解释|了解)(什么|如何|怎么样)/,
            /(疾病|病|症)的(原因|症状|治疗|预防)/,
            /(药物|药品|手术|治疗)/
        ];

        // 意图识别
        let intent = { type: 'general', entities: {}, confidence: 0.5 };

        if (symptomPatterns.some(p => p.test(message_lower))) {
            intent = { 
                type: 'symptom_analysis', 
                entities: this.extractSymptoms(message),
                confidence: 0.85 
            };
        } else if (diagnosisPatterns.some(p => p.test(message_lower))) {
            intent = { 
                type: 'diagnosis', 
                entities: this.extractSymptoms(message),
                confidence: 0.9 
            };
        } else if (healthQueryPatterns.some(p => p.test(message_lower))) {
            intent = { 
                type: 'health_query', 
                entities: this.extractHealthMetrics(message),
                confidence: 0.8 
            };
        } else if (lifestylePatterns.some(p => p.test(message_lower))) {
            intent = { 
                type: 'lifestyle_advice', 
                entities: {},
                confidence: 0.75 
            };
        } else if (medicalInfoPatterns.some(p => p.test(message_lower))) {
            intent = { 
                type: 'medical_info', 
                entities: this.extractMedicalTerms(message),
                confidence: 0.8 
            };
        }

        return intent;
    }

    /**
     * 提取症状
     */
    extractSymptoms(message) {
        const symptomKeywords = {
            '头痛': 'headache',
            '头晕': 'dizziness',
            '胸闷': 'chestTightness',
            '胸痛': 'chestPain',
            '心悸': 'palpitations',
            '呼吸困难': 'dyspnea',
            '咳嗽': 'cough',
            '发热': 'fever',
            '腹痛': 'abdominalPain',
            '恶心': 'nausea',
            '呕吐': 'vomiting',
            '腹泻': 'diarrhea',
            '便秘': 'constipation',
            '乏力': 'fatigue',
            '失眠': 'insomnia',
            '焦虑': 'anxiety',
            '抑郁': 'depression',
            '水肿': 'edema',
            '黄疸': 'jaundice',
            '皮疹': 'rash',
            '瘙痒': 'pruritus'
        };

        const symptoms = [];
        Object.entries(symptomKeywords).forEach(([keyword, code]) => {
            if (message.includes(keyword)) {
                symptoms.push({ code, name: keyword, severity: 'moderate' });
            }
        });

        return { symptoms };
    }

    /**
     * 提取健康指标
     */
    extractHealthMetrics(message) {
        const metrics = {};

        // 血压
        const bpMatch = message.match(/(\d{2,3})\/(\d{2,3})/);
        if (bpMatch) {
            metrics.bloodPressure = {
                systolic: parseInt(bpMatch[1]),
                diastolic: parseInt(bpMatch[2])
            };
        }

        // 血糖
        if (message.includes('血糖')) {
            const glucoseMatch = message.match(/血糖[为:]?(\d+\.?\d*)/);
            if (glucoseMatch) {
                metrics.bloodGlucose = parseFloat(glucoseMatch[1]);
            }
        }

        // BMI
        if (message.includes('BMI') || message.includes('体重')) {
            const bmiMatch = message.match(/BMI[为:]?(\d+\.?\d*)/);
            if (bmiMatch) {
                metrics.bmi = parseFloat(bmiMatch[1]);
            }
        }

        return metrics;
    }

    /**
     * 提取医学术语
     */
    extractMedicalTerms(message) {
        const terms = [];
        const medicalTerms = [
            '高血压', '糖尿病', '冠心病', '心肌梗死', '心绞痛',
            '肺炎', '支气管炎', '哮喘', '慢阻肺',
            '胃炎', '胃溃疡', '肝炎', '脂肪肝',
            '甲状腺', '甲亢', '甲减',
            '贫血', '白血病',
            '脑卒中', '偏头痛',
            '抑郁症', '焦虑症', '失眠'
        ];

        medicalTerms.forEach(term => {
            if (message.includes(term)) {
                terms.push(term);
            }
        });

        return { terms };
    }

    /**
     * 处理诊断请求
     */
    async handleDiagnosis(entities, context) {
        if (!entities.symptoms || entities.symptoms.length === 0) {
            return {
                type: 'diagnosis',
                content: '请描述您的症状，以便我为您提供更准确的健康建议。',
                data: null,
                suggestions: ['描述症状', '说明持续时间', '提及伴随症状']
            };
        }

        // 使用诊断引擎
        if (this.diagnosisEngine) {
            const patientData = {
                symptoms: entities.symptoms,
                labResults: entities.labResults || [],
                medicalHistory: this.healthManager?.userProfile?.medicalHistory || [],
                demographics: {
                    age: this.healthManager?.userProfile?.age,
                    gender: this.healthManager?.userProfile?.gender
                }
            };

            const diagnosisResult = await this.diagnosisEngine.diagnose(patientData);

            return {
                type: 'diagnosis',
                content: this.formatDiagnosisResponse(diagnosisResult),
                data: diagnosisResult,
                suggestions: this.generateDiagnosisSuggestions(diagnosisResult)
            };
        }

        // 基于知识图谱的简单诊断
        if (this.knowledgeGraph) {
            const symptomCodes = entities.symptoms.map(s => s.code);
            const results = this.knowledgeGraph.diagnose(symptomCodes, [], {});

            return {
                type: 'diagnosis',
                content: this.formatSimpleDiagnosis(results),
                data: results,
                suggestions: ['建议进一步检查', '如有不适请及时就医']
            };
        }

        return {
            type: 'diagnosis',
            content: '感谢您的描述。基于您的症状，建议您咨询专业医生进行详细检查。',
            data: entities.symptoms,
            suggestions: ['预约专业医生', '进行相关检查']
        };
    }

    /**
     * 处理症状分析
     */
    handleSymptomAnalysis(entities) {
        if (!entities.symptoms || entities.symptoms.length === 0) {
            return {
                type: 'symptom_analysis',
                content: '请告诉我您有哪些不适症状？',
                data: null
            };
        }

        const analysis = {
            symptoms: entities.symptoms,
            possibleCauses: [],
            recommendations: []
        };

        // 基于知识图谱分析症状
        entities.symptoms.forEach(symptom => {
            if (this.knowledgeGraph) {
                const symptomData = this.knowledgeGraph.getSymptomDetails(symptom.code);
                if (symptomData) {
                    analysis.possibleCauses.push(...(symptomData.relatedSystems || []));
                }
            }
        });

        return {
            type: 'symptom_analysis',
            content: this.formatSymptomAnalysis(analysis),
            data: analysis,
            suggestions: [
                '记录症状出现时间和频率',
                '观察症状与饮食/活动的关系',
                '如有加重及时就医'
            ]
        };
    }

    /**
     * 处理健康查询
     */
    handleHealthQuery(entities) {
        const results = [];

        if (entities.bloodPressure) {
            const bp = entities.bloodPressure;
            results.push({
                metric: '血压',
                value: `${bp.systolic}/${bp.diastolic}`,
                status: this.evaluateBloodPressure(bp),
                advice: this.getBloodPressureAdvice(bp)
            });
        }

        if (entities.bloodGlucose) {
            results.push({
                metric: '血糖',
                value: `${entities.bloodGlucose} mmol/L`,
                status: this.evaluateBloodGlucose(entities.bloodGlucose),
                advice: this.getBloodGlucoseAdvice(entities.bloodGlucose)
            });
        }

        return {
            type: 'health_query',
            content: this.formatHealthQueryResults(results),
            data: results,
            suggestions: ['定期监测', '保持记录', '必要时就医']
        };
    }

    /**
     * 处理生活方式建议
     */
    handleLifestyleAdvice(entities) {
        const advice = {
            nutrition: [],
            exercise: [],
            sleep: [],
            mental: []
        };

        // 基于用户档案生成个性化建议
        if (this.healthManager?.userProfile) {
            const profile = this.healthManager.userProfile;

            // 饮食建议
            if (profile.bmi >= 24) {
                advice.nutrition.push('控制总热量摄入', '减少高脂肪食物', '增加蔬菜水果');
            } else {
                advice.nutrition.push('均衡饮食', '适量蛋白质', '多吃蔬菜水果');
            }

            // 运动建议
            advice.exercise.push('每周至少150分钟中等强度运动', '力量训练每周2-3次', '久坐时每小时起身活动');
            
            // 睡眠建议
            advice.sleep.push('保证7-9小时睡眠', '固定作息时间', '睡前避免电子设备');
            
            // 心理健康
            advice.mental.push('保持积极心态', '适度社交', '学会压力管理');
        } else {
            advice.nutrition = ['均衡饮食', '定时定量', '细嚼慢咽'];
            advice.exercise = ['适度运动', '循序渐进', '持之以恒'];
            advice.sleep = ['规律作息', '充足睡眠'];
            advice.mental = ['心理健康同样重要'];
        }

        return {
            type: 'lifestyle_advice',
            content: this.formatLifestyleAdvice(advice),
            data: advice,
            suggestions: ['从小改变开始', '设定可实现目标', '记录进展']
        };
    }

    /**
     * 处理医学信息查询
     */
    handleMedicalInfo(entities) {
        if (!entities.terms || entities.terms.length === 0) {
            return {
                type: 'medical_info',
                content: '您想了解哪些健康知识？我可以为您提供医学科普信息。',
                data: null
            };
        }

        const info = [];
        entities.terms.forEach(term => {
            const diseaseInfo = this.knowledgeGraph?.diseases.get(term) || this.getDiseaseInfoByName(term);
            if (diseaseInfo) {
                info.push(diseaseInfo);
            }
        });

        return {
            type: 'medical_info',
            content: this.formatMedicalInfo(info),
            data: info,
            suggestions: ['仅供参考', '如有疑问请咨询医生']
        };
    }

    /**
     * 处理一般查询
     */
    handleGeneralQuery(message) {
        // 简单的FAQ处理
        const faqResponses = {
            '你好': '您好！我是您的AI健康助手。有什么我可以帮您的吗？',
            'hello': 'Hello! I am your AI health assistant. How can I help you today?',
            '你是谁': '我是基于人工智能的健康助手，可以帮您分析症状、提供健康建议、管理健康档案等。',
            '能做什么': '我可以帮您：\n1. 分析症状，提供健康建议\n2. 解读检查报告\n3. 提供个性化养生方案\n4. 管理您的健康档案\n5. 解答医学知识\n\n有什么我可以帮您的吗？',
            '帮助': '您可以：\n- 描述症状，寻求建议\n- 查询健康指标\n- 了解疾病知识\n- 获取生活方式建议\n\n请告诉我您想了解什么？'
        };

        const lowerMsg = message.toLowerCase().trim();
        for (const [key, response] of Object.entries(faqResponses)) {
            if (lowerMsg.includes(key)) {
                return {
                    type: 'general',
                    content: response,
                    data: null,
                    suggestions: ['描述症状', '查询健康', '了解更多']
                };
            }
        }

        return {
            type: 'general',
            content: '感谢您的留言。作为AI健康助手，我可以帮您分析症状、解读报告、提供健康建议。请告诉我您想了解什么？',
            data: null,
            suggestions: ['描述您的症状', '查询检查指标', '了解健康知识']
        };
    }

    // ========== 辅助方法 ==========

    /**
     * 记录对话
     */
    recordConversation(userMessage, response) {
        this.conversationHistory.push({
            user: userMessage,
            assistant: response,
            timestamp: new Date().toISOString()
        });

        // 保持对话历史在限制内
        if (this.conversationHistory.length > this.contextWindow * 2) {
            this.conversationHistory = this.conversationHistory.slice(-this.contextWindow);
        }
    }

    /**
     * 格式化诊断响应
     */
    formatDiagnosisResponse(result) {
        if (result.type === 'emergency') {
            return `⚠️ **紧急提醒**：${result.diagnosis}\n\n${result.recommendation}`;
        }

        let response = '📋 **智能诊断分析**\n\n';
        
        if (result.primaryDiagnosis) {
            response += `**主要考虑**：${result.primaryDiagnosis.diagnosis} (${result.primaryDiagnosis.confidence})\n\n`;
        }

        if (result.differentialDiagnoses?.length > 0) {
            response += '**鉴别诊断**：\n';
            result.differentialDiagnoses.slice(0, 3).forEach((diag, i) => {
                response += `${i + 1}. ${diag.diagnosis} - 可能性 ${diag.probability}\n`;
            });
            response += '\n';
        }

        if (result.recommendations?.length > 0) {
            response += '**建议**：\n';
            result.recommendations.forEach(rec => {
                response += `• ${rec.details}\n`;
            });
        }

        return response;
    }

    /**
     * 格式化简单诊断
     */
    formatSimpleDiagnosis(results) {
        let response = '📊 **症状分析结果**\n\n';

        if (results.length === 0) {
            return response + '根据您描述的症状，暂时无法做出明确的诊断建议。请详细描述症状或咨询专业医生。';
        }

        response += '**可能相关**：\n';
        results.slice(0, 5).forEach((result, i) => {
            response += `${i + 1}. **${result.disease}** (匹配度: ${result.confidence})\n`;
            if (result.recommendedTests?.length > 0) {
                response += `   建议检查: ${result.recommendedTests.join(', ')}\n`;
            }
        });

        response += '\n⚠️ 仅供参考，请以专业医生诊断为准。';

        return response;
    }

    /**
     * 格式化症状分析
     */
    formatSymptomAnalysis(analysis) {
        let response = '🔍 **症状分析**\n\n';
        response += `您描述了 ${analysis.symptoms.length} 个症状：\n`;
        
        analysis.symptoms.forEach(s => {
            response += `• ${s.name}\n`;
        });

        if (analysis.possibleCauses.length > 0) {
            response += '\n**可能涉及的系統**：\n';
            const systems = [...new Set(analysis.possibleCauses)];
            systems.forEach(sys => {
                response += `• ${sys}\n`;
            });
        }

        return response;
    }

    /**
     * 格式化健康查询结果
     */
    formatHealthQueryResults(results) {
        let response = '📈 **健康指标解读**\n\n';

        results.forEach(result => {
            response += `**${result.metric}**：${result.value}\n`;
            response += `状态：${result.status}\n`;
            response += `建议：${result.advice}\n\n`;
        });

        return response;
    }

    /**
     * 格式化生活方式建议
     */
    formatLifestyleAdvice(advice) {
        let response = '🌿 **个性化健康建议**\n\n';

        if (advice.nutrition?.length > 0) {
            response += '**饮食建议**：\n';
            advice.nutrition.forEach(item => response += `• ${item}\n`);
            response += '\n';
        }

        if (advice.exercise?.length > 0) {
            response += '**运动建议**：\n';
            advice.exercise.forEach(item => response += `• ${item}\n`);
            response += '\n';
        }

        if (advice.sleep?.length > 0) {
            response += '**睡眠建议**：\n';
            advice.sleep.forEach(item => response += `• ${item}\n`);
            response += '\n';
        }

        if (advice.mental?.length > 0) {
            response += '**心理健康**：\n';
            advice.mental.forEach(item => response += `• ${item}\n`);
        }

        return response;
    }

    /**
     * 格式化医学信息
     */
    formatMedicalInfo(info) {
        if (info.length === 0) {
            return '抱歉，暂无相关信息。';
        }

        let response = '📚 **医学知识**\n\n';

        info.forEach(item => {
            response += `**${item.name}** (${item.nameEn})\n`;
            response += `${item.description || '暂无详细描述'}\n\n`;
        });

        return response;
    }

    /**
     * 生成诊断建议
     */
    generateDiagnosisSuggestions(result) {
        const suggestions = [];

        if (result.primaryDiagnosis?.probability > 70) {
            suggestions.push('建议进行针对性检查');
        }

        suggestions.push('记录症状变化');
        suggestions.push('如有加重及时就医');

        return suggestions;
    }

    /**
     * 评估血压
     */
    evaluateBloodPressure(bp) {
        if (bp.systolic >= 140 || bp.diastolic >= 90) return '偏高';
        if (bp.systolic >= 130 || bp.diastolic >= 80) return '略高';
        if (bp.systolic < 90 || bp.diastolic < 60) return '偏低';
        return '正常';
    }

    /**
     * 获取血压建议
     */
    getBloodPressureAdvice(bp) {
        if (bp.systolic >= 140) {
            return '建议就医检查，必要时药物治疗';
        }
        if (bp.systolic >= 130) {
            return '注意低盐饮食，适度运动，定期监测';
        }
        if (bp.systolic < 90) {
            return '注意营养，如有不适应就医';
        }
        return '继续保持健康生活方式';
    }

    /**
     * 评估血糖
     */
    evaluateBloodGlucose(value) {
        if (value >= 7.0) return '偏高（糖尿病范围）';
        if (value >= 6.1) return '偏高（糖尿病前期）';
        if (value < 3.9) return '偏低';
        return '正常';
    }

    /**
     * 获取血糖建议
     */
    getBloodGlucoseAdvice(value) {
        if (value >= 7.0) {
            return '建议就医检查，确诊糖尿病可能';
        }
        if (value >= 6.1) {
            return '控制碳水化合物摄入，增加运动，定期监测';
        }
        if (value < 3.9) {
            return '注意规律进食，如频繁发生应就医';
        }
        return '继续保持健康饮食和运动习惯';
    }

    /**
     * 根据名称获取疾病信息
     */
    getDiseaseInfoByName(name) {
        const diseaseMap = {
            '高血压': { name: '高血压', nameEn: 'Hypertension', description: '以体循环动脉压升高为主要表现的临床综合征' },
            '糖尿病': { name: '糖尿病', nameEn: 'Diabetes', description: '以血糖升高为特征的代谢性疾病' },
            '冠心病': { name: '冠心病', nameEn: 'Coronary Heart Disease', description: '冠状动脉粥样硬化性心脏病的简称' }
        };
        return diseaseMap[name];
    }

    /**
     * 获取对话历史
     */
    getConversationHistory() {
        return this.conversationHistory;
    }

    /**
     * 清除对话历史
     */
    clearHistory() {
        this.conversationHistory = [];
    }

    /**
     * 导出健康分析报告
     */
    exportFullReport() {
        return {
            healthData: this.healthManager?.exportHealthData(),
            conversationSummary: this.conversationHistory.slice(-10),
            exportDate: new Date().toISOString()
        };
    }
}

// 导出单例
const aiHealthAssistant = new AIHealthAssistant();
