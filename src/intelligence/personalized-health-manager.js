/**
 * 个性化健康管理引擎 - Personalized Health Manager
 * 基于用户数据提供定制化的健康管理方案
 */

class PersonalizedHealthManager {
    constructor() {
        this.userProfile = null;
        this.healthGoals = [];
        this.healthRecords = [];
        this.recommendations = [];
        this.initializeHealthStandards();
    }

    /**
     * 初始化健康标准
     */
    initializeHealthStandards() {
        this.healthStandards = {
            // 生命体征
            bloodPressure: {
                normal: { systolic: [90, 120], diastolic: [60, 80] },
                elevated: { systolic: [120, 129], diastolic: [<80] },
                hypertension_stage1: { systolic: [130, 139], diastolic: [80, 89] },
                hypertension_stage2: { systolic: [>=140], diastolic: [>=90] }
            },
            
            // BMI标准
            bmi: {
                underweight: { min: 0, max: 18.5 },
                normal: { min: 18.5, max: 24 },
                overweight: { min: 24, max: 28 },
                obese: { min: 28, max: 100 }
            },
            
            // 血糖标准
            bloodGlucose: {
                fasting: { normal: [3.9, 6.1], prediabetes: [6.1, 7.0], diabetes: [>=7.0] },
                postprandial: { normal: [<7.8], prediabetes: [7.8, 11.1], diabetes: [>=11.1] },
                hba1c: { normal: [<5.7], prediabetes: [5.7, 6.4], diabetes: [>=6.5] }
            },
            
            // 血脂标准
            bloodLipids: {
                totalCholesterol: { optimal: [<5.2], borderline: [5.2, 6.2], high: [>=6.2] },
                ldl: { optimal: [<2.6], nearOptimal: [2.6, 3.3], borderline: [3.4, 4.1], high: [>=4.1] },
                hdl: { low: [<1.0], normal: [>=1.0] },
                triglycerides: { normal: [<1.7], borderline: [1.7, 2.3], high: [2.3, 5.6], veryHigh: [>=5.6] }
            },
            
            // 生活方式标准
            lifestyle: {
                sleep: { recommended: [7, 9], hours: '小时/天' },
                exercise: { recommended: [150, 300], unit: '分钟/周' },
                water: { recommended: [1500, 2000], unit: 'ml/天' },
                steps: { recommended: [6000, 10000], unit: '步/天' }
            }
        };
    }

    /**
     * 设置用户档案
     */
    setUserProfile(profile) {
        this.userProfile = {
            id: profile.id || Date.now(),
            name: profile.name || 'User',
            age: profile.age || 30,
            gender: profile.gender || 'other',
            height: profile.height || 170,
            weight: profile.weight || 65,
            bloodType: profile.bloodType || 'unknown',
            medicalHistory: profile.medicalHistory || [],
            familyHistory: profile.familyHistory || [],
            allergies: profile.allergies || [],
            medications: profile.medications || [],
            lifestyle: profile.lifestyle || {
                smoking: false,
                alcohol: false,
                exercise: 'moderate',
                diet: 'balanced'
            },
            createdAt: new Date().toISOString()
        };

        this.calculateBMI();
        return this.userProfile;
    }

    /**
     * 计算BMI
     */
    calculateBMI() {
        if (!this.userProfile?.height || !this.userProfile?.weight) return null;
        
        const heightM = this.userProfile.height / 100;
        const bmi = this.userProfile.weight / (heightM * heightM);
        
        this.userProfile.bmi = parseFloat(bmi.toFixed(1));
        this.userProfile.bmiCategory = this.getBMICategory(bmi);
        
        return this.userProfile.bmi;
    }

    /**
     * 获取BMI分类
     */
    getBMICategory(bmi) {
        if (bmi < 18.5) return '偏瘦';
        if (bmi < 24) return '正常';
        if (bmi < 28) return '超重';
        return '肥胖';
    }

    /**
     * 添加健康记录
     */
    addHealthRecord(record) {
        const healthRecord = {
            id: Date.now(),
            type: record.type,
            value: record.value,
            unit: record.unit,
            date: record.date || new Date().toISOString(),
            notes: record.notes || ''
        };

        this.healthRecords.push(healthRecord);
        this.analyzeRecord(healthRecord);
        
        return healthRecord;
    }

    /**
     * 分析健康记录
     */
    analyzeRecord(record) {
        let analysis = {
            status: 'normal',
            trend: 'stable',
            riskFactors: []
        };

        switch (record.type) {
            case 'bloodPressure':
                analysis = this.analyzeBloodPressure(record);
                break;
            case 'bloodGlucose':
                analysis = this.analyzeBloodGlucose(record);
                break;
            case 'bloodLipids':
                analysis = this.analyzeBloodLipids(record);
                break;
            case 'weight':
                analysis = this.analyzeWeight(record);
                break;
            case 'exercise':
                analysis = this.analyzeExercise(record);
                break;
            case 'sleep':
                analysis = this.analyzeSleep(record);
                break;
        }

        return analysis;
    }

    /**
     * 分析血压
     */
    analyzeBloodPressure(record) {
        const { systolic, diastolic } = record.value;
        const analysis = { status: 'normal', trend: 'stable', riskFactors: [] };

        if (systolic >= 140 || diastolic >= 90) {
            analysis.status = 'high';
            analysis.riskFactors.push('高血压风险');
        } else if (systolic >= 130 || diastolic >= 80) {
            analysis.status = 'elevated';
            analysis.riskFactors.push('血压偏高，需关注');
        }

        // 检查趋势
        const history = this.getRecordHistory('bloodPressure');
        if (history.length >= 2) {
            const recent = history[history.length - 1];
            const previous = history[history.length - 2];
            if (recent.value.systolic > previous.value.systolic + 10) {
                analysis.trend = 'increasing';
            } else if (recent.value.systolic < previous.value.systolic - 10) {
                analysis.trend = 'decreasing';
            }
        }

        return analysis;
    }

    /**
     * 分析血糖
     */
    analyzeBloodGlucose(record) {
        const { fasting, type } = record.value;
        const analysis = { status: 'normal', trend: 'stable', riskFactors: [] };

        if (fasting >= 7.0) {
            analysis.status = 'high';
            analysis.riskFactors.push('糖尿病风险');
        } else if (fasting >= 6.1) {
            analysis.status = 'prediabetes';
            analysis.riskFactors.push('糖尿病前期');
        }

        return analysis;
    }

    /**
     * 分析血脂
     */
    analyzeBloodLipids(record) {
        const { totalCholesterol, ldl, hdl, triglycerides } = record.value;
        const analysis = { status: 'normal', trend: 'stable', riskFactors: [] };

        if (totalCholesterol >= 6.2) {
            analysis.status = 'high';
            analysis.riskFactors.push('高胆固醇血症');
        }

        if (ldl >= 4.1) {
            analysis.riskFactors.push('LDL-C升高');
        }

        if (hdl < 1.0) {
            analysis.riskFactors.push('HDL-C偏低');
        }

        if (triglycerides >= 2.3) {
            analysis.riskFactors.push('高甘油三酯血症');
        }

        return analysis;
    }

    /**
     * 分析体重
     */
    analyzeWeight(record) {
        const analysis = { status: 'normal', trend: 'stable', riskFactors: [] };

        const currentBMI = this.userProfile?.bmi;
        if (currentBMI >= 28) {
            analysis.status = 'high';
            analysis.riskFactors.push('肥胖相关风险');
        } else if (currentBMI >= 24) {
            analysis.status = 'elevated';
            analysis.riskFactors.push('超重，建议控制');
        }

        // 检查趋势
        const history = this.getRecordHistory('weight');
        if (history.length >= 2) {
            const recent = history[history.length - 1];
            const previous = history[history.length - 2];
            const change = ((recent.value - previous.value) / previous.value) * 100;
            
            if (change > 5) {
                analysis.trend = 'increasing';
                analysis.riskFactors.push('体重快速增加');
            } else if (change < -5) {
                analysis.trend = 'decreasing';
            }
        }

        return analysis;
    }

    /**
     * 分析运动
     */
    analyzeExercise(record) {
        const { duration, type, calories } = record.value;
        const analysis = { status: 'normal', trend: 'stable', recommendations: [] };

        // 每周运动时间
        const weeklyMinutes = duration * 4; // 假设每月4周
        if (weeklyMinutes < 150) {
            analysis.status = 'insufficient';
            analysis.recommendations.push('建议每周至少运动150分钟');
        } else if (weeklyMinutes >= 300) {
            analysis.status = 'excellent';
        }

        return analysis;
    }

    /**
     * 分析睡眠
     */
    analyzeSleep(record) {
        const { hours, quality } = record.value;
        const analysis = { status: 'normal', trend: 'stable', recommendations: [] };

        if (hours < 6) {
            analysis.status = 'poor';
            analysis.recommendations.push('睡眠时间不足，建议保证7-9小时睡眠');
        } else if (hours >= 7 && hours <= 9) {
            analysis.status = 'good';
        }

        if (quality === 'poor') {
            analysis.recommendations.push('建议改善睡眠质量');
        }

        return analysis;
    }

    /**
     * 获取记录历史
     */
    getRecordHistory(type) {
        return this.healthRecords
            .filter(r => r.type === type)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * 生成健康评估
     */
    generateHealthAssessment() {
        if (!this.userProfile) {
            return { error: '请先设置用户档案' };
        }

        const assessment = {
            timestamp: new Date().toISOString(),
            profile: {
                age: this.userProfile.age,
                gender: this.userProfile.gender,
                bmi: this.userProfile.bmi,
                bmiCategory: this.userProfile.bmiCategory,
                bloodType: this.userProfile.bloodType
            },
            vitalSigns: this.assessVitalSigns(),
            lifestyle: this.assessLifestyle(),
            riskFactors: this.identifyRiskFactors(),
            healthScore: this.calculateHealthScore(),
            recommendations: []
        };

        // 生成个性化建议
        assessment.recommendations = this.generatePersonalizedRecommendations(assessment);

        return assessment;
    }

    /**
     * 评估生命体征
     */
    assessVitalSigns() {
        const vitals = {};

        // 血压评估
        const bpHistory = this.getRecordHistory('bloodPressure');
        if (bpHistory.length > 0) {
            const latest = bpHistory[0];
            vitals.bloodPressure = {
                latest: latest.value,
                status: this.analyzeBloodPressure(latest).status,
                trend: this.analyzeBloodPressure(latest).trend
            };
        }

        // 血糖评估
        const glucoseHistory = this.getRecordHistory('bloodGlucose');
        if (glucoseHistory.length > 0) {
            const latest = glucoseHistory[0];
            vitals.bloodGlucose = {
                latest: latest.value,
                status: this.analyzeBloodGlucose(latest).status
            };
        }

        // 血脂评估
        const lipidHistory = this.getRecordHistory('bloodLipids');
        if (lipidHistory.length > 0) {
            const latest = lipidHistory[0];
            vitals.bloodLipids = {
                latest: latest.value,
                status: this.analyzeBloodLipids(latest).status
            };
        }

        return vitals;
    }

    /**
     * 评估生活方式
     */
    assessLifestyle() {
        const lifestyle = {
            smoking: {
                status: this.userProfile.lifestyle?.smoking ? '是' : '否',
                risk: this.userProfile.lifestyle?.smoking ? '高风险' : '低风险'
            },
            alcohol: {
                status: this.userProfile.lifestyle?.alcohol ? '是' : '否',
                risk: this.userProfile.lifestyle?.alcohol ? '中风险' : '低风险'
            },
            exercise: {
                status: this.userProfile.lifestyle?.exercise || 'moderate',
                recommendations: this.getExerciseRecommendations()
            },
            diet: {
                status: this.userProfile.lifestyle?.diet || 'balanced',
                recommendations: this.getDietRecommendations()
            }
        };

        return lifestyle;
    }

    /**
     * 获取运动建议
     */
    getExerciseRecommendations() {
        const age = this.userProfile?.age || 30;
        const bmi = this.userProfile?.bmi || 23;

        let recommendations = [];

        if (age > 60) {
            recommendations.push('建议进行低强度有氧运动，如散步、太极');
        } else if (age > 40) {
            recommendations.push('建议进行中等强度运动，如快走、游泳、骑自行车');
        } else {
            recommendations.push('建议进行多样化运动，包括有氧和力量训练');
        }

        if (bmi >= 28) {
            recommendations.push('体重较大，建议先从低冲击运动开始，如游泳、骑自行车');
        }

        return recommendations;
    }

    /**
     * 获取饮食建议
     */
    getDietRecommendations() {
        const bmi = this.userProfile?.bmi || 23;
        const medicalHistory = this.userProfile?.medicalHistory || [];

        let recommendations = [];

        if (bmi >= 28) {
            recommendations.push('控制总热量摄入，减少高脂肪、高糖食物');
        }

        if (medicalHistory.includes('hypertension')) {
            recommendations.push('采用DASH饮食，控制钠盐摄入<6g/天');
        }

        if (medicalHistory.includes('diabetes')) {
            recommendations.push('选择低GI食物，碳水化合物摄入适中');
        }

        if (medicalHistory.includes('hyperlipidemia')) {
            recommendations.push('减少饱和脂肪和反式脂肪摄入，增加膳食纤维');
        }

        if (recommendations.length === 0) {
            recommendations.push('保持均衡饮食，多吃蔬菜水果，适量摄入蛋白质');
        }

        return recommendations;
    }

    /**
     * 识别风险因素
     */
    identifyRiskFactors() {
        const riskFactors = [];

        // BMI相关风险
        if (this.userProfile?.bmi >= 28) {
            riskFactors.push({
                factor: '肥胖',
                level: 'high',
                description: 'BMI指数偏高，增加多种疾病风险'
            });
        } else if (this.userProfile?.bmi >= 24) {
            riskFactors.push({
                factor: '超重',
                level: 'medium',
                description: 'BMI指数偏高，需要控制体重'
            });
        }

        // 家族史相关风险
        this.userProfile?.familyHistory?.forEach(history => {
            riskFactors.push({
                factor: history.condition,
                level: 'family',
                description: '家族史，需要定期筛查'
            });
        });

        // 生活方式相关风险
        if (this.userProfile?.lifestyle?.smoking) {
            riskFactors.push({
                factor: '吸烟',
                level: 'high',
                description: '吸烟是多种疾病的危险因素，建议戒烟'
            });
        }

        if (this.userProfile?.lifestyle?.alcohol) {
            riskFactors.push({
                factor: '饮酒',
                level: 'medium',
                description: '过量饮酒有害健康，建议限制饮酒'
            });
        }

        // 检验结果相关风险
        const bpAnalysis = this.assessVitalSigns().bloodPressure;
        if (bpAnalysis && bpAnalysis.status !== 'normal') {
            riskFactors.push({
                factor: '血压异常',
                level: bpAnalysis.status === 'high' ? 'high' : 'medium',
                description: '需要定期监测血压，及时干预'
            });
        }

        return riskFactors;
    }

    /**
     * 计算健康评分
     */
    calculateHealthScore() {
        let score = 100;

        // BMI扣分
        if (this.userProfile?.bmi) {
            if (this.userProfile.bmi >= 28) score -= 15;
            else if (this.userProfile.bmi >= 24) score -= 8;
            else if (this.userProfile.bmi < 18.5) score -= 5;
        }

        // 生活方式扣分
        if (this.userProfile?.lifestyle?.smoking) score -= 20;
        if (this.userProfile?.lifestyle?.alcohol) score -= 10;

        // 风险因素扣分
        const riskFactors = this.identifyRiskFactors();
        score -= riskFactors.filter(r => r.level === 'high').length * 10;
        score -= riskFactors.filter(r => r.level === 'medium').length * 5;

        return Math.max(0, Math.min(100, score));
    }

    /**
     * 生成个性化建议
     */
    generatePersonalizedRecommendations(assessment) {
        const recommendations = [];

        // 基于健康评分
        if (assessment.healthScore < 70) {
            recommendations.push({
                priority: 'high',
                category: '健康管理',
                title: '改善健康状况',
                details: '您的健康评分较低，建议从生活方式改变开始',
                actionableSteps: [
                    '设定可实现的健康目标',
                    '记录每日饮食和运动',
                    '定期监测关键指标',
                    '必要时寻求专业指导'
                ]
            });
        }

        // 基于风险因素
        assessment.riskFactors.forEach(risk => {
            if (risk.level === 'high' || risk.level === 'medium') {
                recommendations.push({
                    priority: risk.level === 'high' ? 'high' : 'medium',
                    category: '风险因素管理',
                    title: `关注${risk.factor}`,
                    details: risk.description,
                    actionableSteps: this.getStepsForRiskFactor(risk.factor)
                });
            }
        });

        // 基于生命体征
        if (assessment.vitalSigns.bloodPressure?.status !== 'normal') {
            recommendations.push({
                priority: 'high',
                category: '血压管理',
                title: '血压监测与管理',
                details: '建议定期监测血压，保持健康生活方式',
                actionableSteps: [
                    '每日测量血压并记录',
                    '减少钠盐摄入',
                    '增加钾的摄入',
                    '适度运动，控制体重',
                    '必要时药物治疗'
                ]
            });
        }

        // 基于生活方式
        if (this.userProfile?.lifestyle?.exercise === 'none' || 
            this.userProfile?.lifestyle?.exercise === 'low') {
            recommendations.push({
                priority: 'medium',
                category: '运动建议',
                title: '增加身体活动',
                details: '规律运动有助于改善整体健康',
                actionableSteps: [
                    '从每天散步10分钟开始',
                    '逐渐增加运动时间和强度',
                    '选择喜欢的运动方式',
                    '每周至少运动150分钟'
                ]
            });
        }

        // 排序
        return recommendations.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    /**
     * 获取风险因素应对步骤
     */
    getStepsForRiskFactor(factor) {
        const stepsMap = {
            '肥胖': ['控制饮食', '增加运动', '行为干预', '必要时医学干预'],
            '超重': ['调整饮食结构', '增加运动', '定期监测体重'],
            '吸烟': ['设定戒烟日期', '寻求支持', '使用戒烟辅助', '避免诱因'],
            '饮酒': ['限制饮酒量', '避免空腹饮酒', '选择低度酒'],
            '高血压': ['低盐饮食', '规律运动', '遵医嘱用药', '定期监测'],
            '高血糖': ['控制碳水化合物', '增加膳食纤维', '适度运动', '遵医嘱用药'],
            '高血脂': ['低脂饮食', '增加运动', '必要时药物治疗']
        };

        return stepsMap[factor] || ['咨询专业医生', '定期复查', '改善生活方式'];
    }

    /**
     * 生成健康报告
     */
    generateHealthReport() {
        const assessment = this.generateHealthAssessment();

        return {
            type: 'health_report',
            timestamp: new Date().toISOString(),
            summary: {
                healthScore: assessment.healthScore,
                overallStatus: this.getOverallStatus(assessment.healthScore),
                keyFindings: this.getKeyFindings(assessment)
            },
            details: assessment,
            actionPlan: this.generateActionPlan(assessment),
            followUp: this.generateFollowUpPlan(assessment)
        };
    }

    /**
     * 获取整体状态
     */
    getOverallStatus(score) {
        if (score >= 90) return '优秀';
        if (score >= 80) return '良好';
        if (score >= 70) return '一般';
        if (score >= 60) return '较差';
        return '需要改善';
    }

    /**
     * 获取关键发现
     */
    getKeyFindings(assessment) {
        const findings = [];

        if (assessment.vitalSigns.bloodPressure?.status !== 'normal') {
            findings.push({
                type: 'vital_signs',
                finding: '血压异常',
                significance: '需要关注'
            });
        }

        if (assessment.riskFactors.some(r => r.level === 'high')) {
            findings.push({
                type: 'risk_factor',
                finding: '存在高风险因素',
                significance: '需要干预'
            });
        }

        if (assessment.lifestyle.exercise?.status === 'insufficient') {
            findings.push({
                type: 'lifestyle',
                finding: '运动不足',
                significance: '建议增加活动'
            });
        }

        return findings;
    }

    /**
     * 生成行动计划
     */
    generateActionPlan(assessment) {
        return {
            immediate: assessment.recommendations.filter(r => r.priority === 'high').slice(0, 2),
            shortTerm: assessment.recommendations.filter(r => r.priority === 'medium').slice(0, 3),
            longTerm: assessment.recommendations.slice(0, 5)
        };
    }

    /**
     * 生成随访计划
     */
    generateFollowUpPlan(assessment) {
        const plan = {
            bloodPressure: { frequency: '每周', duration: '持续' },
            bloodGlucose: { frequency: '每月', duration: '持续' },
            weight: { frequency: '每周', duration: '持续' },
            fullCheckup: { frequency: '每年', next: '12个月后' }
        };

        if (assessment.riskFactors.some(r => r.level === 'high')) {
            plan.fullCheckup = { frequency: '每半年', next: '6个月后' };
        }

        return plan;
    }

    /**
     * 导出健康数据
     */
    exportHealthData() {
        return {
            userProfile: this.userProfile,
            healthRecords: this.healthRecords,
            healthAssessment: this.generateHealthAssessment(),
            healthReport: this.generateHealthReport(),
            exportDate: new Date().toISOString()
        };
    }
}

// 导出单例
const personalizedHealthManager = new PersonalizedHealthManager();
