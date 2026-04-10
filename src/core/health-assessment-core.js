/**
 * 健康评估核心引擎
 * 负责处理所有评估量表的业务逻辑
 */

class HealthAssessmentEngine {
    constructor() {
        this.currentScale = null;
        this.currentQuestion = 0;
        this.answers = {};
        this.startTime = null;
    }

    /**
     * 开始评估
     */
    startAssessment(scaleCode) {
        const scale = AssessmentScales[scaleCode];
        if (!scale) {
            console.error(`Scale ${scaleCode} not found`);
            return false;
        }

        this.currentScale = {
            code: scaleCode,
            data: scale,
            questionGroups: scale.questionGroups || this.groupQuestions(scale.questions)
        };
        this.currentQuestion = 0;
        this.answers = {};
        this.startTime = Date.now();

        return true;
    }

    /**
     * 获取当前问题
     */
    getCurrentQuestion() {
        if (!this.currentScale) return null;

        const groups = this.currentScale.questionGroups;
        let questionIndex = 0;

        for (const group of groups) {
            for (const item of group.items) {
                if (questionIndex === this.currentQuestion) {
                    return {
                        group: group.category,
                        question: item.q,
                        options: item.options || item.choices,
                        index: questionIndex,
                        total: this.getTotalQuestions()
                    };
                }
                questionIndex++;
            }
        }

        return null;
    }

    /**
     * 记录答案
     */
    recordAnswer(questionIndex, answer) {
        this.answers[questionIndex] = {
            answer,
            timestamp: Date.now()
        };
    }

    /**
     * 获取答案
     */
    getAnswer(questionIndex) {
        return this.answers[questionIndex];
    }

    /**
     * 下一题
     */
    nextQuestion() {
        if (this.currentQuestion < this.getTotalQuestions() - 1) {
            this.currentQuestion++;
            return true;
        }
        return false;
    }

    /**
     * 上一题
     */
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            return true;
        }
        return false;
    }

    /**
     * 跳转到指定问题
     */
    goToQuestion(index) {
        if (index >= 0 && index < this.getTotalQuestions()) {
            this.currentQuestion = index;
            return true;
        }
        return false;
    }

    /**
     * 获取总题数
     */
    getTotalQuestions() {
        if (!this.currentScale) return 0;

        return this.currentScale.questionGroups.reduce((sum, group) => {
            return sum + (group.items ? group.items.length : 0);
        }, 0);
    }

    /**
     * 获取当前进度
     */
    getProgress() {
        return {
            current: this.currentQuestion + 1,
            total: this.getTotalQuestions(),
            percentage: Math.round(((this.currentQuestion + 1) / this.getTotalQuestions()) * 100),
            answered: Object.keys(this.answers).length
        };
    }

    /**
     * 完成评估
     */
    completeAssessment() {
        if (!this.currentScale) return null;

        const result = this.calculateResult();
        const duration = Date.now() - this.startTime;

        return {
            scale: this.currentScale.code,
            scaleName: this.currentScale.data.name,
            rawAnswers: this.answers,
            result,
            duration,
            completedAt: new Date().toISOString(),
            statistics: this.getStatistics()
        };
    }

    /**
     * 计算结果
     */
    calculateResult() {
        const scale = this.currentScale.data;
        const type = scale.type;

        switch (type) {
            case 'psychology':
                return this.calculatePsychologyResult();
            case 'medical':
                return this.calculateMedicalResult();
            case 'personality':
                return this.calculatePersonalityResult();
            case 'fun':
                return this.calculateFunResult();
            default:
                return this.calculateDefaultResult();
        }
    }

    /**
     * 计算心理学量表结果
     */
    calculatePsychologyResult() {
        const totalScore = Object.values(this.answers).reduce((sum, ans) => {
            const answer = ans.answer;
            if (typeof answer === 'number') {
                return sum + answer;
            } else if (typeof answer === 'string') {
                const optionIndex = this.currentScale.data.questions?.findIndex(
                    q => q.includes(answer)
                );
                return sum + (optionIndex >= 0 ? optionIndex : 0);
            }
            return sum;
        }, 0);

        const totalQuestions = this.getTotalQuestions();
        const normalizedScore = (totalScore / (totalQuestions * 4)) * 100;

        let severity = '正常';
        if (normalizedScore > 70) severity = '重度';
        else if (normalizedScore > 60) severity = '中度';
        else if (normalizedScore > 50) severity = '轻度';

        return {
            totalScore,
            maxScore: totalQuestions * 4,
            normalizedScore,
            severity,
            interpretation: this.getPsychologyInterpretation(normalizedScore),
            recommendations: this.getPsychologyRecommendations(normalizedScore)
        };
    }

    /**
     * 获取心理学解读
     */
    getPsychologyInterpretation(score) {
        if (score > 70) {
            return '您的测试结果显示可能有较为明显的心理困扰，建议寻求专业心理咨询师的帮助。';
        } else if (score > 50) {
            return '您的测试结果显示存在一定程度的心理压力，建议关注自己的情绪变化，必要时寻求专业帮助。';
        } else {
            return '您的测试结果显示心理状态基本正常，保持良好的生活习惯和积极的心态。';
        }
    }

    /**
     * 获取心理学建议
     */
    getPsychologyRecommendations(score) {
        if (score > 70) {
            return [
                '建议尽快预约专业心理咨询师',
                '可以向家人朋友寻求支持',
                '保持规律作息，避免过度劳累',
                '如有需要，可考虑心理治疗'
            ];
        } else if (score > 50) {
            return [
                '建议学习一些情绪管理技巧',
                '保持适度运动，缓解压力',
                '与亲友保持沟通交流',
                '如症状持续，建议咨询专业人士'
            ];
        } else {
            return [
                '继续保持良好的生活习惯',
                '适度运动，保持身心健康',
                '培养兴趣爱好，丰富生活',
                '定期进行心理健康自评'
            ];
        }
    }

    /**
     * 计算医学量表结果
     */
    calculateMedicalResult() {
        const scale = this.currentScale.code;
        let result = {};

        switch (scale) {
            case 'MMSE':
                result = this.calculateMMSEResult();
                break;
            case 'ADL':
                result = this.calculateADLResult();
                break;
            case 'VAS':
                result = this.calculateVASResult();
                break;
            default:
                result = this.calculateDefaultResult();
        }

        return result;
    }

    /**
     * 计算MMSE结果
     */
    calculateMMSEResult() {
        const totalScore = Object.values(this.answers).reduce((sum, ans) => {
            return sum + (typeof ans.answer === 'number' ? ans.answer : 0);
        }, 0);

        let level = '正常';
        if (totalScore < 9) level = '重度认知障碍';
        else if (totalScore < 20) level = '中度认知障碍';
        else if (totalScore < 27) level = '轻度认知障碍';

        return {
            totalScore,
            maxScore: 30,
            level,
            interpretation: `MMSE得分${totalScore}分，${level}`
        };
    }

    /**
     * 计算ADL结果
     */
    calculateADLResult() {
        const totalScore = Object.values(this.answers).reduce((sum, ans) => {
            return sum + (typeof ans.answer === 'number' ? ans.answer : 0);
        }, 0);

        let level = '自理';
        if (totalScore < 40) level = '重度依赖';
        else if (totalScore < 60) level = '中度依赖';
        else if (totalScore < 100) level = '轻度依赖';

        return {
            totalScore,
            maxScore: 100,
            level,
            interpretation: `ADL得分${totalScore}分，${level}`
        };
    }

    /**
     * 计算VAS结果
     */
    calculateVASResult() {
        const score = Object.values(this.answers)[0]?.answer || 0;

        let level = '无疼痛';
        if (score > 7) level = '重度疼痛';
        else if (score > 4) level = '中度疼痛';
        else if (score > 2) level = '轻度疼痛';

        return {
            totalScore: score,
            maxScore: 10,
            level,
            interpretation: `疼痛评分${score}分，${level}`
        };
    }

    /**
     * 计算人格测试结果
     */
    calculatePersonalityResult() {
        const scale = this.currentScale.code;

        switch (scale) {
            case 'MBTI':
                return this.calculateMBTIResult();
            case 'ENNEAGRAM':
                return this.calculateEnneagramResult();
            case 'BIGFIVE':
                return this.calculateBigFiveResult();
            case 'ATTACHMENT':
                return this.calculateAttachmentResult();
            default:
                return this.calculateDefaultResult();
        }
    }

    /**
     * 计算MBTI结果
     */
    calculateMBTIResult() {
        const dimensions = {
            E: 0, I: 0,  // 外向-内向
            S: 0, N: 0,  // 感觉-直觉
            T: 0, F: 0,  // 思考-情感
            J: 0, P: 0   // 判断-知觉
        };

        Object.values(this.answers).forEach(ans => {
            if (ans.answer && typeof ans.answer === 'string') {
                const type = ans.answer.toUpperCase();
                if (dimensions.hasOwnProperty(type)) {
                    dimensions[type]++;
                }
            }
        });

        const result = '';
        result += dimensions.E > dimensions.I ? 'E' : 'I';
        result += dimensions.S > dimensions.N ? 'S' : 'N';
        result += dimensions.T > dimensions.F ? 'T' : 'F';
        result += dimensions.J > dimensions.P ? 'J' : 'P';

        return {
            mbti: result,
            dimensions,
            description: this.getMBTIDescription(result)
        };
    }

    /**
     * 获取MBTI类型描述
     */
    getMBTIDescription(type) {
        const descriptions = {
            'INTJ': '建筑师 - 富有想象力和战略性的思想家',
            'INTP': '逻辑学家 - 创新的发明家',
            'ENTJ': '指挥官 - 富有魅力和鼓舞性的领导者',
            'ENTP': '辩论家 - 聪明好奇的思想家',
            'INFJ': '提倡者 - 安静而富有启发性的理想主义者',
            'INFP': '调停者 - 富有诗意的理想主义者',
            'ENFJ': '主人公 - 富有魅力和鼓舞性的领导者',
            'ENFP': '竞选者 - 热情而有创造力的社交者',
            'ISTJ': '物流师 - 实际且注重事实的思想家',
            'ISFJ': '守护者 - 温暖而专注的守护者',
            'ESTJ': '总经理 - 优秀的组织者',
            'ESFJ': '执政官 - 充满爱心和受欢迎的照顾者',
            'ISTP': '鉴赏家 - 大胆而务实的行动者',
            'ISFP': '探险家 - 灵活而有魅力的艺术家',
            'ESTP': '企业家 - 聪明、精力充沛的思考者',
            'ESFP': '表演者 - 自发、精力充沛的表演者'
        };

        return descriptions[type] || '独特的个性类型';
    }

    /**
     * 计算九型人格结果
     */
    calculateEnneagramResult() {
        const types = {
            '1': '完美型', '2': '助人型', '3': '成就型',
            '4': '艺术型', '5': '思考型', '6': '忠诚型',
            '7': '享乐型', '8': '领袖型', '9': '和平型'
        };

        const scores = {};
        Object.values(types).forEach(t => scores[t] = 0);

        Object.values(this.answers).forEach((ans, index) => {
            const typeIndex = Math.floor(index / 5) + 1;
            if (types[typeIndex.toString()]) {
                scores[types[typeIndex.toString()]] += (typeof ans.answer === 'number' ? ans.answer : 0);
            }
        });

        const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const primary = sortedTypes[0][0];
        const secondary = sortedTypes[1][0];

        return {
            primaryType: primary,
            secondaryType: secondary,
            allScores: scores,
            interpretation: `您的主要人格类型是${primary}，次要类型是${secondary}`
        };
    }

    /**
     * 计算大五人格结果
     */
    calculateBigFiveResult() {
        const dimensions = {
            '开放性': 0,
            '责任心': 0,
            '外向性': 0,
            '宜人性': 0,
            '神经质': 0
        };

        Object.values(this.answers).forEach((ans, index) => {
            const dimIndex = Math.floor(index / 10);
            const dimensionNames = ['开放性', '责任心', '外向性', '宜人性', '神经质'];
            if (dimensionNames[dimIndex]) {
                dimensions[dimensionNames[dimIndex]] += (typeof ans.answer === 'number' ? ans.answer : 2);
            }
        });

        const normalizedScores = {};
        Object.entries(dimensions).forEach(([key, value]) => {
            normalizedScores[key] = Math.round((value / 50) * 100);
        });

        return {
            rawScores: dimensions,
            normalizedScores,
            interpretation: this.getBigFiveInterpretation(normalizedScores)
        };
    }

    /**
     * 获取大五人格解读
     */
    getBigFiveInterpretation(scores) {
        const descriptions = [];
        
        if (scores['开放性'] > 70) {
            descriptions.push('您是一个高开放性的人，富有想象力和创造力');
        } else if (scores['开放性'] < 30) {
            descriptions.push('您较为务实，倾向于遵循传统');
        }

        if (scores['责任心'] > 70) {
            descriptions.push('您责任心强，做事有条理');
        } else if (scores['责任心'] < 30) {
            descriptions.push('您较为随性，不喜欢受约束');
        }

        if (scores['外向性'] > 70) {
            descriptions.push('您外向开朗，喜欢社交');
        } else if (scores['外向性'] < 30) {
            descriptions.push('您内向沉静，享受独处');
        }

        if (scores['宜人性'] > 70) {
            descriptions.push('您宜人性高，善于合作');
        } else if (scores['宜人性'] < 30) {
            descriptions.push('您较为独立，不易受影响');
        }

        if (scores['神经质'] > 70) {
            descriptions.push('您神经质倾向较高，情绪波动较大');
        } else if (scores['神经质'] < 30) {
            descriptions.push('您情绪稳定，抗压能力强');
        }

        return descriptions.join('；') + '。';
    }

    /**
     * 计算依恋类型结果
     */
    calculateAttachmentResult() {
        const dimensions = {
            '焦虑型': 0,
            '回避型': 0,
            '安全型': 0
        };

        Object.values(this.answers).forEach((ans, index) => {
            if (index < 8) dimensions['焦虑型'] += (typeof ans.answer === 'number' ? ans.answer : 2);
            else if (index < 14) dimensions['安全型'] += (typeof ans.answer === 'number' ? ans.answer : 2);
            else if (index < 20) dimensions['回避型'] += (typeof ans.answer === 'number' ? ans.answer : 2);
        });

        const primary = Object.entries(dimensions).sort((a, b) => b[1] - a[1])[0][0];

        return {
            primaryStyle: primary,
            allScores: dimensions,
            interpretation: this.getAttachmentInterpretation(primary)
        };
    }

    /**
     * 获取依恋类型解读
     */
    getAttachmentInterpretation(style) {
        const interpretations = {
            '安全型': '您拥有安全的依恋风格，能够健康地建立亲密关系',
            '焦虑型': '您在亲密关系中可能表现出焦虑和过度依赖',
            '回避型': '您在亲密关系中倾向于保持距离和独立'
        };
        return interpretations[style];
    }

    /**
     * 计算趣味测试结果
     */
    calculateFunResult() {
        const scale = this.currentScale.code;

        if (scale.startsWith('SBTI')) {
            return this.calculateSBTIResult();
        }

        return this.calculateDefaultResult();
    }

    /**
     * 计算SBTI结果
     */
    calculateSBTIResult() {
        const dimensions = { '傻': 0, '精': 0, '大': 0, '个': 0 };

        Object.values(this.answers).forEach(ans => {
            if (ans.answer && typeof ans.answer === 'string') {
                dimensions[ans.answer]++;
            }
        });

        const result = Object.entries(dimensions)
            .sort((a, b) => b[1] - a[1])
            .map(([key]) => key)
            .join('');

        return {
            sbti: result,
            allScores: dimensions,
            humor: 'SBTI是娱乐测试，仅供娱乐！'
        };
    }

    /**
     * 计算默认结果
     */
    calculateDefaultResult() {
        const totalScore = Object.values(this.answers).reduce((sum, ans) => {
            return sum + (typeof ans.answer === 'number' ? ans.answer : 0);
        }, 0);

        return {
            totalScore,
            answeredQuestions: Object.keys(this.answers).length
        };
    }

    /**
     * 获取统计数据
     */
    getStatistics() {
        const answered = Object.keys(this.answers).length;
        const total = this.getTotalQuestions();
        const duration = this.startTime ? Date.now() - this.startTime : 0;

        return {
            answered,
            unanswered: total - answered,
            total,
            completionRate: Math.round((answered / total) * 100),
            duration: Math.round(duration / 1000)
        };
    }

    /**
     * 将问题分组
     */
    groupQuestions(questions) {
        if (!questions || questions.length === 0) {
            return [{ category: '主问卷', items: [] }];
        }

        const groups = {};
        questions.forEach((q, index) => {
            const groupName = q.group || '主问卷';
            if (!groups[groupName]) {
                groups[groupName] = {
                    category: groupName,
                    items: []
                };
            }
            groups[groupName].items.push({
                q: q.q || q.text,
                options: q.options || q.choices
            });
        });

        return Object.values(groups);
    }

    /**
     * 导出结果
     */
    exportResult() {
        const result = this.completeAssessment();
        return JSON.stringify(result, null, 2);
    }
}

// 导出单例
const healthAssessmentEngine = new HealthAssessmentEngine();
