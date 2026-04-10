/**
 * 健康智AI后端服务器
 * 文件说明：Express服务器主文件，处理API请求和数据接口
 * 作者：健康智AI团队
 * 版本：2.0
 */

// 引入必要的依赖模块
const express = require('express');        // Web应用框架
const cors = require('cors');              // 跨域资源共享
const helmet = require('helmet');          // 安全HTTP头
const compression = require('compression'); // 响应压缩
const path = require('path');              // 路径处理
const config = require('./src/config');     // 应用配置

// 创建Express应用实例
const app = express();

/* ====================================
 * 中间件配置
 * 功能：配置请求处理的中间件
 * ==================================== */
app.use(helmet());                        // 安全头
app.use(cors());                          // 允许跨域
app.use(compression());                   // 压缩响应
app.use(express.json());                  // JSON解析
app.use(express.urlencoded({ extended: true })); // URL编码解析

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

/* ====================================
 * API路由定义
 * ==================================== */

/**
 * 健康检查接口
 * GET /api/health
 * 返回应用状态信息
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        name: config.app.name,
        version: config.app.version
    });
});

/**
 * 获取评估量表列表
 * GET /api/scales
 * 返回所有科室和对应的评估量表
 */
app.get('/api/scales', (req, res) => {
    const AssessmentScales = require('./src/data/assessment-scales');
    res.json({
        departments: AssessmentScales.getAllDepartments(),
        scales: AssessmentScales.getScalesByDepartment()
    });
});

/**
 * BMI身体质量指数分析
 * POST /api/analyze/bmi
 * 请求体：{ weight, height, age, gender }
 */
app.post('/api/analyze/bmi', (req, res) => {
    const { HealthDataAnalyzer } = require('./src/data/health-analyzer');
    const { weight, height, age, gender } = req.body;
    const bmi = HealthDataAnalyzer.bmi.calculate(weight, height);
    const result = HealthDataAnalyzer.bmi.analyze(bmi, age, gender);
    res.json(result);
});

/**
 * 血压分析
 * POST /api/analyze/bp
 * 请求体：{ systolic, diastolic }
 */
app.post('/api/analyze/bp', (req, res) => {
    const { HealthDataAnalyzer } = require('./src/data/health-analyzer');
    const { systolic, diastolic } = req.body;
    const result = HealthDataAnalyzer.bloodPressure.analyze(systolic, diastolic);
    res.json(result);
});

/**
 * 血糖分析
 * POST /api/analyze/glucose
 * 请求体：{ value, type }
 */
app.post('/api/analyze/glucose', (req, res) => {
    const { HealthDataAnalyzer } = require('./src/data/health-analyzer');
    const { value, type } = req.body;
    const result = HealthDataAnalyzer.bloodGlucose.analyze(value, type);
    res.json(result);
});

/**
 * 获取拉丁术语
 * GET /api/latin/:term
 * 根据术语名称查询拉丁文翻译
 */
app.get('/api/latin/:term', (req, res) => {
    const { LatinTerminology } = require('./src/data/health-analyzer');
    const term = LatinTerminology.getTerm(req.params.term);
    res.json(term ? { found: true, term } : { found: false });
});

/**
 * 搜索拉丁术语
 * GET /api/latin/search/:query
 * 模糊搜索术语
 */
app.get('/api/latin/search/:query', (req, res) => {
    const { LatinTerminology } = require('./src/data/health-analyzer');
    const results = LatinTerminology.searchTerm(req.params.query);
    res.json({ results });
});

/**
 * AI问答接口
 * POST /api/chat
 * 请求体：{ question, userProfile, context }
 */
app.post('/api/chat', (req, res) => {
    const AIQASystem = require('./src/ai/qa-system');
    const PersonalizedIntelligenceAgent = require('./src/ai/personalized-agent');
    
    const { question, userProfile, context } = req.body;
    
    const agent = new PersonalizedIntelligenceAgent(userProfile);
    const ai = new AIQASystem();
    
    ai.processQuestion(question, { userProfile, scaleContext: context })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({
                answer: '抱歉，处理您的问题时出现了错误。',
                suggestions: ['请重新提问', '尝试其他问题'],
                confidence: 0.5
            });
        });
});

/**
 * 获取个性化推荐量表
 * POST /api/recommended-scales
 * 请求体：{ userProfile }
 */
app.post('/api/recommended-scales', (req, res) => {
    const PersonalizedIntelligenceAgent = require('./src/ai/personalized-agent');
    const { userProfile } = req.body;
    const agent = new PersonalizedIntelligenceAgent(userProfile);
    const scales = agent.getPersonalizedScales();
    res.json({ scales });
});

/* ====================================
 * 前端路由
 * 功能：SPA应用的路由处理
 * ==================================== */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                                  ║
║          Health AI Pro - 智能健康系统 v${config.app.version}          ║
║                                                                  ║
║          服务器运行在: http://localhost:${PORT}                  ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════╝
    `);
});

// 导出app供启动脚本使用
module.exports = app;