/**
 * ============================================================================
 * 健康评估常量配置
 * ============================================================================
 * 
 * 定义所有健康评估相关的常量配置
 * 
 * 作者：OpenCode Team
 * 版本：1.0.0
 * ============================================================================
 */

module.exports = {
    // MBTI常量
    MBTI: {
        QUESTIONNAIRE_SIZE: 26,
        DIMENSIONS: ['E/I', 'S/N', 'T/F', 'J/P'],
        DIMENSION_LETTERS: ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'],
        PERSONALITY_TYPES: {
            'INTJ': { name: '建筑师', group: 'NT', traits: ['战略', '独立', '分析'] },
            'INTP': { name: '逻辑学家', group: 'NT', traits: ['分析', '理论', '创新'] },
            'ENTJ': { name: '指挥官', group: 'NT', traits: ['领导', '决策', '执行'] },
            'ENTP': { name: '辩论家', group: 'NT', traits: ['创意', '适应', '机智'] },
            'INFJ': { name: '提倡者', group: 'NF', traits: ['洞察', '理想', '和谐'] },
            'INFP': { name: '调停者', group: 'NF', traits: ['价值', '创造', '同理'] },
            'ENFJ': { name: '主人公', group: 'NF', traits: ['激励', '领导', '热情'] },
            'ENFP': { name: '竞选者', group: 'NF', traits: ['创意', '热情', '社交'] },
            'ISTJ': { name: '物流师', group: 'SJ', traits: ['负责', '实际', '可靠'] },
            'ISFJ': { name: '守卫者', group: 'SJ', traits: ['关怀', '忠诚', '务实'] },
            'ESTJ': { name: '总经理', group: 'SJ', traits: ['管理', '组织', '执行'] },
            'ESFJ': { name: '执政官', group: 'SJ', traits: ['支持', '友好', '负责'] },
            'ISTP': { name: '鉴赏家', group: 'SP', traits: ['分析', '灵活', '实用'] },
            'ISFP': { name: '探险家', group: 'SP', traits: ['艺术', '适应', '观察'] },
            'ESTP': { name: '企业家', group: 'SP', traits: ['行动', '现实', '社交'] },
            'ESFP': { name: '表演者', group: 'SP', traits: ['表现', '热情', '适应'] }
        }
    },

    // BMI常量
    BMI: {
        // BMI范围（成年人）
        ADULT: {
            UNDERWEIGHT: { max: 18.5, category: '偏瘦' },
            NORMAL: { min: 18.5, max: 24, category: '正常' },
            OVERWEIGHT: { min: 24, max: 28, category: '超重' },
            OBESE: { min: 28, category: '肥胖' }
        },
        // 年龄分界
        AGE_GROUPS: {
            CHILD: { max: 18 },
            ADULT: { min: 18, max: 65 },
            SENIOR: { min: 65 }
        },
        // 性别
        GENDER: {
            MALE: 'male',
            FEMALE: 'female'
        }
    },

    // 健康评分常量
    HEALTH: {
        MAX_SCORE: 100,
        MIN_SCORE: 0,
        // 评分等级
        LEVELS: {
            EXCELLENT: { min: 90, label: '优秀', color: 'green' },
            GOOD: { min: 75, label: '良好', color: 'blue' },
            FAIR: { min: 60, label: '一般', color: 'yellow' },
            POOR: { min: 0, label: '较差', color: 'red' }
        }
    },

    // 匹配度常量
    MATCH: {
        // 匹配度等级
        LEVELS: {
            PERFECT: { min: 100, label: '完美匹配' },
            HIGH: { min: 75, label: '高匹配' },
            MEDIUM: { min: 50, label: '中等匹配' },
            LOW: { min: 25, label: '低匹配' },
            NONE: { min: 0, label: '需优化' }
        }
    },

    // 强度常量
    STRENGTH: {
        STRONG: { min: 7, label: '强' },
        MEDIUM: { min: 4, label: '中' },
        WEAK: { min: 2, label: '弱' },
        NEUTRAL: { min: 0, label: '中性' }
    }
};
