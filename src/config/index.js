const path = require('path');

const config = {
    app: {
        name: 'Health AI Pro',
        version: '1.0.0',
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    },
    
    llm: {
        providers: {
            openai: {
                apiKey: process.env.OPENAI_API_KEY,
                baseUrl: 'https://api.openai.com/v1',
                model: 'gpt-4'
            },
            claude: {
                apiKey: process.env.CLAUDE_API_KEY,
                baseUrl: 'https://api.anthropic.com/v1',
                model: 'claude-3-opus'
            },
            qwen: {
                apiKey: process.env.QWEN_API_KEY,
                baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
                model: 'qwen-max'
            },
            ernie: {
                apiKey: process.env.ERNIE_API_KEY,
                baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1',
                model: 'ernie-4.0'
            }
        },
        defaultProvider: 'qwen'
    },
    
    database: {
        type: 'sqlite',
        path: path.join(__dirname, '../data/health.db')
    },
    
    security: {
        jwtSecret: process.env.JWT_SECRET || 'health-ai-pro-secret-key-2024',
        jwtExpiry: '24h',
        encryptionKey: process.env.ENCRYPTION_KEY || 'health-ai-encryption-key-2024'
    },
    
    paths: {
        data: path.join(__dirname, '../data'),
        uploads: path.join(__dirname, '../uploads'),
        reports: path.join(__dirname, '../reports'),
        logs: path.join(__dirname, '../logs')
    },
    
    themes: {
        default: 'light',
        available: ['light', 'dark', 'blue', 'green', 'purple']
    },
    
    ageCategories: {
        newborn: { min: 0, max: 28, name: '新生儿' },
        infant: { min: 29, max: 365, name: '婴儿' },
        child: { min: 1, max: 12, name: '儿童' },
        teenager: { min: 13, max: 17, name: '青少年' },
        youngAdult: { min: 18, max: 34, name: '青年' },
        adult: { min: 35, max: 44, name: '成年' },
        middleAged: { min: 45, max: 59, name: '中年' },
        elderly: { min: 60, max: 74, name: '老年' },
        veryElderly: { min: 75, max: 120, name: '高龄老人' }
    },
    
    units: {
        bloodGlucose: ['mmol/L', 'mg/dL'],
        bloodPressure: ['mmHg', 'kPa'],
        weight: ['kg', 'lb'],
        height: ['cm', 'ft/in'],
        temperature: ['°C', '°F']
    }
};

module.exports = config;