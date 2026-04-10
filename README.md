# 医智宝 (MediBot) - 智能健康管理平台

<div align="center">

**智慧医疗 · 贴心守护**

*Intelligent Healthcare, Caring Companion*

</div>

---

## 🤖 AI生成项目声明

**纯AI新代码，纯添加，无天然。**

**Pure AI new code, purely added, no natural/human-written content.**

**This project is 100% AI-generated, all code, documentation, and content are written by AI, with no human-written content.**

---

## 📖 项目简介

**医智宝 (MediBot)** 是一款智能健康管理平台，基于Web技术开发，为用户提供健康评估工具、检验结果参考解读及健康管理功能。

MediBot is a health management platform developed with web technologies, providing users with health assessment tools, laboratory test result reference interpretation, and health management features.

---

## ⚠️ 重要声明

**本项目为健康参考工具，不能替代专业医疗诊断和治疗。**

**This project is a health reference tool and cannot replace professional medical diagnosis and treatment.**

- 健康评估结果仅供参考
- 检验结果解读仅供参照
- 如有健康问题请务必咨询专业医生
- 本项目不承担任何医疗责任

---

## ✨ 核心功能

### 🩺 健康评估
- 专业医学量表工具
- 心理健康自评参考
- 健康风险因素筛查

### 🔬 检验参考
- 常见检验项目参考范围
- 检验结果初步解读
- 健康指标说明

### 📊 健康工具
- BMI身体质量指数计算
- 健康指标参考
- 健康信息查询

---

## 🚀 快速开始

### 本地运行

```bash
# 克隆项目
git clone https://github.com/liulanci/MediBot.git

# 进入目录
cd medibot

# 安装依赖（如需）
npm install

# 运行开发服务器
npm run dev

# 或直接打开
# 在浏览器中打开 public/index.html
```

### 直接使用

1. 下载或克隆项目
2. 进入 `public` 文件夹
3. 双击 `index.html` 在浏览器中打开

---

## 📁 项目结构

```
mediBot/
├── public/              # 前端资源
│   ├── css/
│   │   ├── styles.css      # 样式表
│   │   └── styles.min.css  # 压缩样式
│   ├── js/
│   │   ├── draggable.js        # 拖动功能
│   │   └── draggable.min.js    # 压缩脚本
│   ├── index.html           # 主页面
│   └── index-template.html  # HTML模板
│
├── src/                     # 源代码（Node.js后端）
│   ├── ai/                 # AI相关模块
│   ├── config/             # 配置
│   ├── core/              # 核心模块
│   ├── data/              # 数据文件
│   ├── database/          # 数据库
│   ├── intelligence/      # 智能模块
│   ├── integration/       # 集成
│   ├── utils/            # 工具函数
│   └── server.js         # 服务器入口
│
├── .env.example            # 环境变量示例
├── .gitignore             # Git忽略配置
├── LICENSE                # MIT许可证
├── package.json           # NPM配置
├── vercel.json           # Vercel配置
└── README.md             # 项目文档
```

---

## 🛠️ 技术栈

### 前端技术
- HTML5 + CSS3 + JavaScript
- CSS Variables（主题定制）
- Responsive Design（响应式设计）
- 移动端适配

### 后端技术（可选）
- Node.js + Express
- MySQL Database
- RESTful API

---

## 📱 响应式设计

| 设备类型 | 宽度范围 | 布局特点 |
|---------|---------|---------|
| 手机竖屏 | <576px | 单列布局 + 汉堡菜单 |
| 手机横屏 | 576-768px | 双列布局 + 侧边栏 |
| 平板 | 768-992px | 双列布局 + 侧边栏 |
| 桌面显示器 | 992-1200px | 三列布局 + 侧边栏 |
| 大屏 | ≥1200px | 四列布局 + 侧边栏 |

---

## 🌐 部署

### Vercel 部署

1. 注册 [Vercel](https://vercel.com)
2. 连接代码仓库
3. 一键部署

### Netlify 部署

1. 注册 [Netlify](https://netlify.com)
2. 拖拽 `public` 文件夹到页面
3. 自动部署完成

### GitHub Pages

1. 在 GitHub 仓库中启用 Pages
2. 选择源代码分支
3. 访问生成的网址

### 本地部署

```bash
# Python 方式
cd public
python -m http.server 8080

# Node.js 方式
npx http-server -p 8080
```

详细部署说明请参考：[DEPLOY.md](DEPLOY.md)

---

## ⚠️ 免责声明

**本项目仅供健康参考和学习研究使用，不能替代专业医疗建议。**

**This project is for health reference and educational purposes only and should not be used as a substitute for professional medical advice.**

1. 本项目提供的健康评估和检验解读仅供参考
2. 不能作为诊断依据
3. 如有健康疑虑，请及时就医
4. 作者和项目不对使用本工具造成的任何后果负责

---

## 📝 使用注意事项

### 健康评估
- 评估结果仅供参考
- 心理量表自评不能替代专业评估
- 如有严重心理困扰请寻求专业帮助

### 检验解读
- 检验结果需结合临床情况分析
- 不同医院检验方法可能有差异
- 结果异常时请咨询医生

### 健康工具
- 所有健康指标仅供参考
- 具体情况请咨询专业医生

---

## 🔒 安全使用

- 不收集个人隐私数据
- 数据仅存储在本地浏览器
- 无需提供真实个人信息
- 建议使用最新版本浏览器

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

感谢所有为这个项目提供帮助和建议的人。

Thank you to everyone who has contributed to this project.

---

<div align="center">

**用心守护健康 | Caring for Your Health**

---

**版本**: v1.0.0.1  
**更新时间**: 2024年  
**许可证**: MIT

</div>
