/**
 * 智能诊断推理引擎 - Intelligent Diagnosis Engine
 * 基于医学知识图谱进行多维度推理，生成诊断建议
 */

class IntelligentDiagnosisEngine {
    constructor() {
        this.knowledgeGraph = null;
        this.diagnosisRules = this.initializeRules();
        this.weightingFactors = this.initializeWeighting();
    }

    /**
     * 初始化诊断引擎
     */
    initialize(knowledgeGraph) {
        this.knowledgeGraph = knowledgeGraph;
    }

    /**
     * 初始化诊断规则
     */
    initializeRules() {
        return {
            // 诊断优先级规则
            emergencyRules: [
                { pattern: ['chestPain', 'dyspnea', 'sweating'], priority: 'emergency', condition: '急性冠脉综合征' },
                { pattern: ['syncope', 'hemiplegia', 'speechDisorder'], priority: 'emergency', condition: '急性脑卒中' },
                { pattern: ['highFever', 'stiffNeck', 'consciousnessDisorder'], priority: 'emergency', condition: '脑膜炎' },
                { pattern: ['severeAbdominalPain', 'vomiting', 'abdominalDistension'], priority: 'emergency', condition: '急腹症' },
                { pattern: ['dyspnea', 'wheezing', 'cyanosis'], priority: 'emergency', condition: '急性呼吸衰竭' }
            ],
            
            // 鉴别诊断规则
            differentialRules: {
                chestPain: [
                    { type: 'cardiac', symptoms: ['压迫感', '向左臂放射', '出汗'], diseases: ['coronaryHeartDisease'] },
                    { type: 'respiratory', symptoms: ['刺痛', '呼吸相关', '咳嗽'], diseases: ['pleurisy', 'pneumonia'] },
                    { type: 'gastrointestinal', symptoms: ['灼烧感', '反酸', '进食相关'], diseases: ['gastritis', 'reflux'] },
                    { type: 'musculoskeletal', symptoms: ['压痛', '运动加重', '局部'], diseases: ['costochondritis', 'muscle_strain'] }
                ],
                fever: [
                    { type: 'infectious', symptoms: ['寒战', '咽痛', '咳嗽'], diseases: ['influenza', 'pneumonia'] },
                    { type: 'inflammatory', symptoms: ['关节痛', '皮疹', '乏力'], diseases: ['rheumatoidArthritis', 'sle'] },
                    { type: 'malignant', symptoms: ['盗汗', '体重下降', '淋巴结肿大'], diseases: ['lymphoma', 'leukemia'] }
                ],
                fatigue: [
                    { type: 'endocrine', symptoms: ['体重变化', '情绪波动', '睡眠障碍'], diseases: ['hypothyroidism', 'diabetesType2'] },
                    { type: 'hematologic', symptoms: ['面色苍白', '头晕', '心悸'], diseases: ['ironDeficiencyAnemia'] },
                    { type: 'psychiatric', symptoms: ['兴趣减退', '情绪低落', '睡眠问题'], diseases: ['depressionDisorder', 'anxietyDisorder'] }
                ]
            },

            // 症状组合规则
            combinationRules: {
                fever_chestPain_cough: ['communityPneumonia', 'pulmonaryEmbolism'],
                fatigue_weightLoss_nightSweats: ['tuberculosis', 'lymphoma', 'aids'],
                headache_nausea_vomiting: ['migraine', 'meningitis', 'hypertension'],
                chestPain_dyspnea_palpitations: ['coronaryHeartDisease', 'heartFailure', 'arrhythmia'],
                polyuria_polydipsia_weightLoss: ['diabetesType1', 'diabetesType2'],
                abdominalPain_nausea_vomiting: ['gastritis', 'pepticUlcer', 'appendicitis'],
                cough_expectoration_fever: ['bronchitis', 'pneumonia', 'copd'],
                dizziness_headache_hypertension: ['hypertension', 'cerebrovascular']
            }
        };
    }

    /**
     * 初始化权重因子
     */
    initializeWeighting() {
        return {
            symptomWeights: {
                primary: 0.4,      // 主要症状
                secondary: 0.25,   // 次要症状
                associated: 0.15,  // 伴随症状
                general: 0.2        // 一般症状
            },
            labTestWeights: {
                diagnostic: 0.5,    // 诊断性检验
                supportive: 0.3,    // 支持性检验
                exclusionary: 0.2  // 排除性检验
            },
            temporalFactors: {
                acute: 1.2,        // 急性发病
                subacute: 1.0,     // 亚急性
                chronic: 0.8,      // 慢性
                recurrent: 1.0      // 反复发作
            },
            patientFactors: {
                ageMultiplier: {
                    pediatric: ['childhood_diseases'],
                    adult: ['adult_diseases'],
                    elderly: ['geriatric_diseases']
                },
                genderSpecific: {
                    female: ['gynecologic_diseases', 'autoimmune'],
                    male: ['prostate_diseases']
                }
            }
        };
    }

    /**
     * 执行智能诊断
     */
    async diagnose(patientData) {
        const { symptoms, labResults, physicalExams, medicalHistory, demographics } = patientData;

        // 1. 紧急情况检测
        const emergencyResult = this.checkEmergency(symptoms);
        if (emergencyResult.isEmergency) {
            return {
                type: 'emergency',
                priority: 'immediate',
                diagnosis: emergencyResult.diagnosis,
                recommendation: '请立即就医或拨打急救电话',
                reasoning: emergencyResult.reasoning
            };
        }

        // 2. 构建诊断上下文
        const context = this.buildContext(symptoms, labResults, medicalHistory, demographics);

        // 3. 生成鉴别诊断
        const differentialDiagnoses = this.generateDifferentialDiagnosis(context);

        // 4. 智能推理
        const reasoningResult = await this.performReasoning(context, differentialDiagnoses);

        // 5. 生成诊断报告
        return this.generateDiagnosisReport(reasoningResult, context);
    }

    /**
     * 检查紧急情况
     */
    checkEmergency(symptoms) {
        for (const rule of this.diagnosisRules.emergencyRules) {
            const matchedSymptoms = rule.pattern.filter(p => symptoms.includes(p));
            if (matchedSymptoms.length >= 2) {
                return {
                    isEmergency: true,
                    diagnosis: rule.condition,
                    reasoning: `匹配紧急症状模式: ${matchedSymptoms.join(', ')}`
                };
            }
        }
        return { isEmergency: false };
    }

    /**
     * 构建诊断上下文
     */
    buildContext(symptoms, labResults, medicalHistory, demographics) {
        return {
            symptoms: symptoms.map(s => ({
                code: s.code,
                name: s.name,
                severity: s.severity || 'moderate',
                duration: s.duration || 'recent',
                onset: s.onset || 'unknown'
            })),
            labResults: labResults || [],
            medicalHistory: medicalHistory || [],
            demographics: demographics || {},
            temporalContext: this.analyzeTemporalPattern(symptoms),
            systemInvolvement: this.analyzeSystemInvolvement(symptoms)
        };
    }

    /**
     * 分析时间模式
     */
    analyzeTemporalPattern(symptoms) {
        const durations = symptoms.map(s => s.duration || 'unknown');
        if (durations.some(d => ['hours', 'days'].includes(d))) return 'acute';
        if (durations.some(d => ['weeks'].includes(d))) return 'subacute';
        return 'chronic';
    }

    /**
     * 分析系统参与
     */
    analyzeSystemInvolvement(symptoms) {
        const systems = new Set();
        symptoms.forEach(s => {
            if (this.knowledgeGraph?.symptoms.get(s.code)) {
                const symptom = this.knowledgeGraph.symptoms.get(s.code);
                if (symptom.relatedSystems) {
                    symptom.relatedSystems.forEach(sys => systems.add(sys));
                }
            }
        });
        return Array.from(systems);
    }

    /**
     * 生成鉴别诊断
     */
    generateDifferentialDiagnosis(context) {
        const differentials = [];

        // 基于症状组合
        const symptomCodes = context.symptoms.map(s => s.code);
        Object.entries(this.diagnosisRules.combinationRules).forEach(([pattern, diseases]) => {
            const patternSymptoms = pattern.split('_');
            const matchCount = patternSymptoms.filter(p => symptomCodes.includes(p)).length;
            if (matchCount >= 2) {
                diseases.forEach(diseaseCode => {
                    differentials.push({
                        disease: this.knowledgeGraph?.diseases.get(diseaseCode) || { code: diseaseCode, name: diseaseCode },
                        matchScore: matchCount / patternSymptoms.length,
                        matchPattern: patternSymptoms.filter(p => symptomCodes.includes(p))
                    });
                });
            }
        });

        // 基于知识图谱推理
        if (this.knowledgeGraph) {
            const graphResults = this.knowledgeGraph.diagnose(
                symptomCodes,
                context.labResults.map(l => l.code),
                context.demographics
            );
            
            graphResults.forEach(result => {
                differentials.push({
                    disease: result,
                    matchScore: parseFloat(result.confidence) / 100,
                    matchPattern: symptomCodes
                });
            });
        }

        // 去重并排序
        const uniqueDifferentials = this.deduplicateAndSort(differentials);
        return uniqueDifferentials;
    }

    /**
     * 去重并排序
     */
    deduplicateAndSort(differentials) {
        const seen = new Map();
        
        differentials.forEach(diff => {
            const code = diff.disease.code || diff.disease.disease?.code;
            if (!seen.has(code)) {
                seen.set(code, diff);
            } else {
                const existing = seen.get(code);
                existing.matchScore = Math.max(existing.matchScore, diff.matchScore);
            }
        });

        return Array.from(seen.values())
            .sort((a, b) => b.matchScore - a.matchScore);
    }

    /**
     * 执行智能推理
     */
    async performReasoning(context, differentials) {
        const reasoningSteps = [];

        // 1. 症状分析
        const symptomAnalysis = this.analyzeSymptoms(context.symptoms);
        reasoningSteps.push({
            step: '症状分析',
            findings: symptomAnalysis,
            confidence: symptomAnalysis.confidence
        });

        // 2. 检验结果分析
        const labAnalysis = context.labResults.length > 0 
            ? this.analyzeLabResults(context.labResults) 
            : null;
        if (labAnalysis) {
            reasoningSteps.push({
                step: '检验结果分析',
                findings: labAnalysis,
                confidence: labAnalysis.confidence
            });
        }

        // 3. 病史综合分析
        const historyAnalysis = this.analyzeMedicalHistory(context);
        reasoningSteps.push({
            step: '病史综合分析',
            findings: historyAnalysis,
            confidence: historyAnalysis.confidence
        });

        // 4. 计算最终诊断概率
        const finalDiagnoses = this.calculateProbabilities(
            differentials,
            reasoningSteps,
            context
        );

        return {
            diagnoses: finalDiagnoses,
            reasoningSteps,
            context
        };
    }

    /**
     * 分析症状
     */
    analyzeSymptoms(symptoms) {
        const primarySymptoms = symptoms.filter(s => s.severity === 'severe');
        const secondarySymptoms = symptoms.filter(s => s.severity === 'moderate');
        const generalSymptoms = symptoms.filter(s => s.severity === 'mild');

        return {
            primary: primarySymptoms.map(s => s.name),
            secondary: secondarySymptoms.map(s => s.name),
            general: generalSymptoms.map(s => s.name),
            total: symptoms.length,
            confidence: Math.min(0.3 + (primarySymptoms.length * 0.15), 0.9)
        };
    }

    /**
     * 分析检验结果
     */
    analyzeLabResults(labResults) {
        const abnormalResults = labResults.filter(r => r.status === 'abnormal');
        const criticalResults = labResults.filter(r => r.status === 'critical');

        return {
            abnormal: abnormalResults.length,
            critical: criticalResults.length,
            findings: abnormalResults.map(r => ({
                test: r.name,
                value: r.value,
                status: r.status,
                interpretation: r.interpretation
            })),
            confidence: abnormalResults.length > 0 ? 0.7 : 0.3
        };
    }

    /**
     * 分析病史
     */
    analyzeMedicalHistory(context) {
        const relevantHistory = [];
        let relevanceScore = 0;

        context.medicalHistory.forEach(history => {
            const relevance = this.evaluateHistoryRelevance(history, context.symptoms);
            if (relevance > 0.3) {
                relevantHistory.push({
                    condition: history.condition,
                    relevance: relevance,
                    notes: history.notes
                });
                relevanceScore += relevance;
            }
        });

        return {
            relevantConditions: relevantHistory,
            riskFactors: this.identifyRiskFactors(context),
            confidence: Math.min(0.2 + (relevanceScore * 0.3), 0.6)
        };
    }

    /**
     * 评估病史相关性
     */
    evaluateHistoryRelevance(history, symptoms) {
        // 简化版本，实际应基于知识图谱
        let score = 0;
        if (history.chronic) score += 0.3;
        if (history.familyHistory) score += 0.2;
        if (history.recentChange) score += 0.3;
        return Math.min(score, 0.8);
    }

    /**
     * 识别危险因素
     */
    identifyRiskFactors(context) {
        const riskFactors = [];
        
        // 年龄相关
        if (context.demographics.age > 65) {
            riskFactors.push({ factor: '老年', impact: '增加感染和心血管风险' });
        }
        
        // 生活方式
        if (context.demographics.smoking) {
            riskFactors.push({ factor: '吸烟', impact: '增加肺癌和心血管风险' });
        }
        
        return riskFactors;
    }

    /**
     * 计算诊断概率
     */
    calculateProbabilities(differentials, reasoningSteps, context) {
        const finalDiagnoses = [];

        differentials.forEach(diff => {
            let probability = diff.matchScore;

            // 应用时间因子
            const temporalFactor = this.weightingFactors.temporalFactors[context.temporalContext] || 1.0;
            probability *= temporalFactor;

            // 应用推理置信度
            const avgConfidence = reasoningSteps.reduce((sum, step) => sum + step.confidence, 0) / reasoningSteps.length;
            probability *= (0.5 + avgConfidence);

            // 应用患者因素
            if (context.demographics.age) {
                if (context.demographics.age > 65) {
                    probability *= 1.1; // 增加老年人常见疾病概率
                }
            }

            finalDiagnoses.push({
                diagnosis: diff.disease.name || diff.disease.disease?.name,
                diagnosisEn: diff.disease.nameEn || diff.disease.disease?.nameEn,
                category: diff.disease.category || diff.disease.disease?.category,
                probability: Math.min(probability * 100, 95).toFixed(1) + '%',
                confidence: Math.min(probability, 0.95),
                matchDetails: diff.matchPattern,
                evidenceStrength: this.evaluateEvidenceStrength(diff, reasoningSteps)
            });
        });

        // 排序
        return finalDiagnoses.sort((a, b) => b.confidence - a.confidence);
    }

    /**
     * 评估证据强度
     */
    evaluateEvidenceStrength(diagnosis, reasoningSteps) {
        let strength = '弱';
        const symptomMatch = diagnosis.matchDetails?.length || 0;
        const labSupport = reasoningSteps.find(s => s.step === '检验结果分析')?.confidence || 0;

        if (symptomMatch >= 3 && labSupport > 0.6) {
            strength = '强';
        } else if (symptomMatch >= 2 || labSupport > 0.4) {
            strength = '中等';
        }

        return strength;
    }

    /**
     * 生成诊断报告
     */
    generateDiagnosisReport(reasoningResult, context) {
        const { diagnoses, reasoningSteps, context: diagContext } = reasoningResult;

        return {
            type: 'intelligent_diagnosis',
            timestamp: new Date().toISOString(),
            summary: {
                totalSymptoms: context.symptoms.length,
                systemsInvolved: context.systemInvolvement,
                temporalPattern: context.temporalContext
            },
            primaryDiagnosis: diagnoses[0] || null,
            differentialDiagnoses: diagnoses.slice(0, 5),
            reasoningChain: reasoningSteps,
            recommendations: this.generateRecommendations(diagnoses[0], context),
            nextSteps: this.suggestNextSteps(diagnoses, context),
            patientEducation: this.generatePatientEducation(diagnoses[0])
        };
    }

    /**
     * 生成建议
     */
    generateRecommendations(primaryDiagnosis, context) {
        const recommendations = [];

        if (primaryDiagnosis) {
            // 基于诊断的建议
            recommendations.push({
                type: 'lifestyle',
                title: '生活方式调整',
                details: this.suggestLifestyleChanges(primaryDiagnosis.category)
            });

            // 基于症状的建议
            if (context.symptoms.some(s => s.severity === 'severe')) {
                recommendations.push({
                    type: 'urgent',
                    title: '尽快就医',
                    details: '您的症状较为严重，建议尽快到正规医院就诊'
                });
            }
        }

        return recommendations;
    }

    /**
     * 建议生活方式改变
     */
    suggestLifestyleChanges(diseaseCategory) {
        const suggestions = {
            '心血管疾病': ['低盐低脂饮食', '适度运动', '戒烟限酒', '规律作息'],
            '内分泌疾病': ['控制饮食', '适量运动', '定期监测', '按时服药'],
            '呼吸系统疾病': ['戒烟', '避免刺激性气体', '适度锻炼', '预防感冒'],
            '消化系统疾病': ['规律饮食', '避免刺激性食物', '细嚼慢咽', '戒烟酒'],
            '神经系统疾病': ['充足睡眠', '减少压力', '适度运动', '定期复查']
        };

        return suggestions[diseaseCategory] || ['保持健康生活方式', '定期体检'];
    }

    /**
     * 建议下一步检查
     */
    suggestNextSteps(diagnoses, context) {
        const nextSteps = [];

        // 如果没有检验结果，建议基础检验
        if (context.labResults.length === 0) {
            nextSteps.push({
                priority: 'high',
                action: '基础血液检查',
                tests: ['血常规', '肝肾功能', '血糖血脂', '甲状腺功能']
            });
        }

        // 基于可疑诊断的建议
        diagnoses.slice(0, 2).forEach(diag => {
            if (diag.evidenceStrength === '弱') {
                nextSteps.push({
                    priority: 'medium',
                    action: `进一步检查以确诊${diag.diagnosis}`,
                    tests: this.getRecommendedTests(diag.diagnosis)
                });
            }
        });

        return nextSteps;
    }

    /**
     * 获取推荐检查项目
     */
    getRecommendedTests(diagnosis) {
        const testRecommendations = {
            '冠心病': ['心电图', '心脏彩超', '冠脉CTA', '心肌酶谱'],
            '糖尿病': ['空腹血糖', '糖化血红蛋白', 'OGTT', '胰岛功能'],
            '肺炎': ['胸片', '血常规', 'CRP', 'PCT', '痰培养'],
            '甲状腺功能异常': ['TSH', 'FT3', 'FT4', '甲状腺抗体'],
            '贫血': ['血常规', '铁蛋白', '叶酸', '维生素B12']
        };

        return testRecommendations[diagnosis] || ['请咨询专业医生'];
    }

    /**
     * 生成患者教育
     */
    generatePatientEducation(diagnosis) {
        if (!diagnosis) return null;

        return {
            diseaseUnderstanding: `了解${diagnosis.diagnosis}的基本知识`,
            selfMonitoring: '关注症状变化，记录相关指标',
            warningSigns: '识别需要立即就医的危险信号',
            followUp: '按照医嘱定期复查'
        };
    }
}

// 导出单例
const intelligentDiagnosisEngine = new IntelligentDiagnosisEngine();
