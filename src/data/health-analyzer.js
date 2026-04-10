/**
 * 单位转换器模块
 * 功能：提供医疗健康数据的单位转换功能
 * 作者：健康智AI团队
 * 版本：2.0
 */
const UnitConverter = {
    // 转换规则定义
    conversions: {
        // 血糖单位转换
        bloodGlucose: {
            'mmol/L': { 'mg/dL': (val) => val * 18.0182 },
            'mg/dL': { 'mmol/L': (val) => val / 18.0182 }
        },
        // 血压单位转换
        bloodPressure: {
            'mmHg': { 'kPa': (val) => val * 0.1333 },
            'kPa': { 'mmHg': (val) => val / 0.1333 }
        },
        // 体重单位转换
        weight: {
            'kg': { 'lb': (val) => val * 2.20462 },
            'lb': { 'kg': (val) => val / 2.20462 }
        },
        // 身高单位转换
        height: {
            'cm': { 'ft/in': (val) => {
                const totalInches = val / 2.54;
                const feet = Math.floor(totalInches / 12);
                const inches = Math.round(totalInches % 12);
                return `${feet}'${inches}"`;
            }},
            'ft/in': { 'cm': (val) => {
                const match = val.match(/(\d+)'(\d+)"/);
                if (match) {
                    const feet = parseInt(match[1]);
                    const inches = parseInt(match[2]);
                    return Math.round((feet * 12 + inches) * 2.54);
                }
                return null;
            }}
        },
        // 体温单位转换
        temperature: {
            '°C': { '°F': (val) => (val * 9/5) + 32 },
            '°F': { '°C': (val) => (val - 32) * 5/9 }
        }
    },
    
    /**
     * 执行单位转换
     * @param {string} category - 转换类别
     * @param {number} value - 要转换的数值
     * @param {string} fromUnit - 原单位
     * @param {string} toUnit - 目标单位
     * @returns {number|null} 转换后的值，转换失败返回null
     */
    convert(category, value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
        const categoryConversions = this.conversions[category];
        if (categoryConversions && categoryConversions[fromUnit]) {
            const converter = categoryConversions[fromUnit][toUnit];
            if (converter) {
                return converter(value);
            }
        }
        return null;
    },
    
    /**
     * 获取指定类别支持的所有单位
     * @param {string} category - 转换类别
     * @returns {string[]} 支持的单位数组
     */
    getUnits(category) {
        return this.conversions[category] ? Object.keys(this.conversions[category]) : [];
    }
};

/**
 * 健康数据分析器
 * 功能：分析血压、血糖、BMI等健康指标
 * 作者：健康智AI团队
 * 版本：2.0
 */
const HealthDataAnalyzer = {
    /**
     * 血压分析模块
     */
    bloodPressure: {
        /**
         * 分析血压数据
         * @param {number} systolic - 收缩压(mmHg)
         * @param {number} diastolic - 舒张压(mmHg)
         * @returns {Object} 分析结果，包含分类、颜色、风险等级等
         */
        analyze(systolic, diastolic) {
            let category, color, risk;
            
            // 根据WHO血压分级标准进行分类
            if (systolic < 90 && diastolic < 60) {
                category = '低血压';
                color = 'blue';
                risk = '低';
            } else if (systolic < 120 && diastolic < 80) {
                category = '正常';
                color = 'green';
                risk = '正常';
            } else if (systolic < 130 && diastolic < 80) {
                category = '正常偏高';
                color = 'yellow';
                risk = '轻度';
            } else if (systolic < 140 || diastolic < 90) {
                category = '高血压1级';
                color = 'orange';
                risk = '中度';
            } else if (systolic < 180 || diastolic < 120) {
                category = '高血压2级';
                color = 'red';
                risk = '高';
            } else {
                category = '高血压危象';
                color = 'darkred';
                risk = '极高';
            }
            
            return {
                category,
                color,
                risk,
                systolic,
                diastolic,
                pulsePressure: systolic - diastolic,  // 脉压差
                map: Math.round(diastolic + (systolic - diastolic) / 3)  // 平均动脉压
            };
        },
        
        /**
         * 获取血压建议
         * @param {string} category - 血压分类
         * @returns {string[]} 健康建议数组
         */
        getRecommendations(category) {
            const recommendations = {
                '低血压': ['适当增加盐分摄入', '保证充足睡眠', '避免突然站立', '定期监测血压'],
                '正常': ['保持健康生活方式', '定期体检', '均衡饮食', '适度运动'],
                '正常偏高': ['减轻体重', '低盐饮食', '增加运动', '限制饮酒', '戒烟'],
                '高血压1级': ['就医咨询', '生活方式干预', '定期监测', '控制体重'],
                '高血压2级': ['立即就医', '遵医嘱服药', '严格监测', '改善生活方式'],
                '高血压危象': ['紧急就医', '呼叫急救', '保持安静']
            };
            return recommendations[category] || ['请咨询医生'];
        }
    },
    
    bloodGlucose: {
        analyze(value, type = 'fasting') {
            let category, color, targetRange;
            
            if (type === 'fasting') {
                if (value < 3.9) {
                    category = '低血糖';
                    color = 'blue';
                    targetRange = '3.9-6.1 mmol/L';
                } else if (value < 6.1) {
                    category = '正常';
                    color = 'green';
                    targetRange = '3.9-6.1 mmol/L';
                } else if (value < 7.0) {
                    category = '空腹血糖受损';
                    color = 'yellow';
                    targetRange = '<7.0 mmol/L';
                } else {
                    category = '糖尿病';
                    color = 'red';
                    targetRange = '<7.0 mmol/L';
                }
            } else {
                if (value < 7.8) {
                    category = '正常';
                    color = 'green';
                } else if (value < 11.1) {
                    category = '糖耐量异常';
                    color = 'yellow';
                } else {
                    category = '糖尿病';
                    color = 'red';
                }
            }
            
            return { category, color, value, type, targetRange };
        },
        
        getRecommendations(category) {
            const recommendations = {
                '低血糖': ['立即进食含糖食物', '随身携带糖果', '定期监测', '就医检查原因'],
                '正常': ['保持规律饮食', '适度运动', '定期体检', '控制体重'],
                '空腹血糖受损': ['控制碳水化合物摄入', '增加运动', '减轻体重', '定期监测'],
                '糖耐量异常': ['低糖饮食', '规律运动', '控制体重', '就医咨询'],
                '糖尿病': ['严格控制饮食', '遵医嘱治疗', '定期监测血糖', '定期复诊']
            };
            return recommendations[category] || ['请咨询医生'];
        }
    },
    
    bmi: {
        calculate(weight, height) {
            const heightM = height / 100;
            return Math.round(weight / (heightM * heightM) * 10) / 10;
        },
        
        analyze(bmi, age = 30, gender = 'adult') {
            let category, color, idealWeight, healthScore;
            
            if (bmi < 18.5) {
                category = '偏瘦';
                color = 'blue';
                healthScore = 70;
            } else if (bmi < 24) {
                category = '正常';
                color = 'green';
                healthScore = 95;
            } else if (bmi < 28) {
                category = '偏胖';
                color = 'yellow';
                healthScore = 75;
            } else if (bmi < 32) {
                category = '肥胖1级';
                color = 'orange';
                healthScore = 60;
            } else {
                category = '肥胖2级';
                color = 'red';
                healthScore = 50;
            }
            
            return {
                category,
                color,
                bmi,
                healthScore,
                risks: this.getRisks(category)
            };
        },
        
        getRisks(category) {
            const risks = {
                '偏瘦': ['营养不良风险', '免疫力下降', '骨质疏松风险'],
                '正常': ['低风险'],
                '偏胖': ['高血压风险', '糖尿病风险', '睡眠呼吸暂停风险'],
                '肥胖1级': ['高血压', '糖尿病', '心血管疾病', '关节问题'],
                '肥胖2级': ['严重健康风险', '需立即干预', '心血管疾病高风险']
            };
            return risks[category] || [];
        },
        
        getRecommendations(category) {
            const recommendations = {
                '偏瘦': ['增加营养摄入', '规律饮食', '适当运动', '就医检查'],
                '正常': ['保持健康饮食', '规律运动', '定期体检', '维持体重'],
                '偏胖': ['控制饮食热量', '增加有氧运动', '减少脂肪摄入', '定期监测体重'],
                '肥胖1级': ['就医咨询', '严格控制饮食', '制定运动计划', '专业指导'],
                '肥胖2级': ['立即就医', '专业减重计划', '医学监督', '综合治疗']
            };
            return recommendations[category] || ['请咨询医生'];
        }
    },
    
    lifestyle: {
        analyze(data) {
            const { smoking, alcohol, exercise, sleep, diet, stress } = data;
            let score = 0;
            let factors = [];
            
            if (!smoking) { score += 15; factors.push('不吸烟'); }
            if (alcohol === 'none' || alcohol === 'occasional') { score += 15; factors.push('适量饮酒'); }
            if (exercise >= 3) { score += 20; factors.push('规律运动'); }
            if (sleep >= 7 && sleep <= 9) { score += 20; factors.push('良好睡眠'); }
            if (diet === 'balanced') { score += 20; factors.push('均衡饮食'); }
            if (stress === 'low') { score += 10; factors.push('低压力'); }
            
            let category, color;
            if (score >= 85) { category = '优秀'; color = 'green'; }
            else if (score >= 70) { category = '良好'; color = 'lightgreen'; }
            else if (score >= 50) { category = '一般'; color = 'yellow'; }
            else { category = '需改善'; color = 'orange'; }
            
            return { score, category, color, factors };
        }
    }
};

const LatinTerminology = {
    terms: {
        'BP': { latin: 'Pressura sanguinis', meaning: '血压' },
        'HR': { latin: 'Pulsus', meaning: '心率' },
        'BMI': { latin: 'Index massa corporis', meaning: '体重指数' },
        'ECG': { latin: 'Electrocardiographia', meaning: '心电图' },
        'MRI': { latin: 'Imago resonantis magneticae', meaning: '磁共振成像' },
        'CT': { latin: 'Tomographia computata', meaning: '计算机断层扫描' },
        'CBC': { latin: 'Sanguinis analysis completa', meaning: '全血细胞计数' },
        'WBC': { latin: 'Leucocyta', meaning: '白细胞' },
        'RBC': { latin: 'Erythrocyta', meaning: '红细胞' },
        'Hb': { latin: 'Haemoglobinum', meaning: '血红蛋白' },
        'Hct': { latin: 'Haematocrit', meaning: '红细胞压积' },
        'Glu': { latin: 'Glucosum', meaning: '葡萄糖' },
        'Chol': { latin: 'Cholesterin', meaning: '胆固醇' },
        'LDL': { latin: 'Lipoproteinum densitatis parvae', meaning: '低密度脂蛋白' },
        'HDL': { latin: 'Lipoproteinum densitatis magnae', meaning: '高密度脂蛋白' },
        'TG': { latin: 'Triglyceridum', meaning: '甘油三酯' },
        'ALT': { latin: 'Alaninaminotransferasis', meaning: '谷丙转氨酶' },
        'AST': { latin: 'Aspartataminotransferasis', meaning: '谷草转氨酶' },
        'Cr': { latin: 'Creatininum', meaning: '肌酐' },
        'BUN': { latin: 'Nitrogenium ureicum sanguinis', meaning: '尿素氮' }
    },
    
    getTerm(abbr) {
        return this.terms[abbr.toUpperCase()] || null;
    },
    
    searchTerm(query) {
        const results = [];
        for (const [abbr, info] of Object.entries(this.terms)) {
            if (abbr.toLowerCase().includes(query.toLowerCase()) || 
                info.meaning.includes(query)) {
                results.push({ abbr, ...info });
            }
        }
        return results;
    }
};

module.exports = {
    UnitConverter,
    HealthDataAnalyzer,
    LatinTerminology
};