# 医智宝 (MediBot) - 智能健康管理平台

<div align="center">

![MediBot Logo](https://img.shields.io/badge/MediBot-v1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Ready%20for%20Open%20Source-success?style=for-the-badge)

**智慧医疗 · 贴心守护**

*Intelligent Healthcare, Caring Companion*

</div>

---

## 📖 项目简介

**医智宝 (MediBot)** 是一款智能健康管理平台，融合AI技术与医学专业知识，为用户提供全面的健康评估、疾病诊断支持和个性化健康管理服务。

MediBot is an intelligent health management platform that combines AI technology with medical expertise to provide users with comprehensive health assessment, disease diagnosis support, and personalized health management services.

---

## ✨ 核心功能

### 🩺 健康评估
- 30+ 专业医学量表
- 心理健康测评 (SCL-90, SAS, SDS)
- 认知功能评估 (MMSE, MoCA)
- 心血管风险评估
- 糖尿病风险评估

### 🔬 智能诊断
- 医学知识图谱
- 症状分析推理
- 检验结果解读
- 多因素诊断建议

### 💡 AI助手
- 智能健康咨询
- 个性化建议
- 7×24小时服务
- 可拖动悬浮按钮

### 📊 健康管理
- BMI追踪
- 健康评分
- 风险预警
- 个人档案

---

## 🚀 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/medibot.git

# 进入目录
cd medibot

# 安装依赖
npm install
```

### 运行

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 访问

打开浏览器访问 http://localhost:3000

---

## 📁 项目结构

```
mediBot/
├── public/              # 前端资源
│   ├── css/
│   │   └── styles.css  # 样式表
│   ├── js/
│   │   └── draggable.js # 拖动功能
│   ├── _headers         # Netlify安全头
│   ├── index.html       # 主页面
│   └── index-template.html
│
├── src/                 # 源代码
│   ├── ai/             # AI模块
│   ├── config/         # 配置
│   ├── core/           # 核心模块
│   ├── data/           # 数据文件
│   ├── database/       # 数据库
│   ├── intelligence/   # 智能模块
│   ├── integration/    # 集成
│   ├── utils/          # 工具
│   └── server.js       # 服务器入口
│
├── .env.example         # 环境变量示例
├── .gitignore          # Git忽略配置
├── LICENSE             # MIT许可证
├── package.json        # NPM配置
├── vercel.json         # Vercel配置
│
└── README.md           # 项目文档
```

---

## 🎨 技术栈

### 前端
- HTML5 + CSS3 + JavaScript (ES6+)
- CSS Variables (主题定制)
- Responsive Design (移动端适配)
- 移动端优先设计

### 后端
- Node.js + Express
- MySQL Database
- RESTful API

### AI/ML
- Medical Knowledge Graph
- Intelligent Diagnosis Engine
- NLP Processing

---

## 🎨 主题定制

### 修改主题色

编辑 `public/css/styles.css`:

```css
:root {
    --primary: #5B7DB1;       /* 主色调 */
    --primary-light: #8FA4C7; /* 浅色 */
    --primary-dark: #3D5A80;  /* 深色 */
}
```

### 可用主题

| 主题 | 颜色代码 |
|------|---------|
| 蓝色 Blue | #5B7DB1 |
| 绿色 Green | #10B981 |
| 紫色 Purple | #8B5CF6 |
| 橙色 Orange | #F59E0B |
| 粉色 Pink | #EC4899 |
| 青色 Cyan | #06B6D4 |

---

## 📱 响应式设计

| 设备 | 宽度 | 布局 |
|------|------|------|
| 手机竖屏 | <576px | 单列 + 汉堡菜单 |
| 手机横屏 | 576-768px | 2列 + 侧边栏 |
| 平板 | 768-992px | 2列 + 侧边栏 |
| 桌面 | 992-1200px | 3列 + 侧边栏 |
| 大屏 | ≥1200px | 4列 + 侧边栏 |

---

## 🌐 部署

### Vercel (推荐)

1. 注册 [Vercel](https://vercel.com)
2. 连接 GitHub
3. 一键部署

### Netlify

1. 注册 [Netlify](https://netlify.com)
2. 拖拽 `public` 文件夹
3. 完成

### GitHub Pages

1. Settings → Pages
2. Source: main branch
3. 访问 `username.github.io/repo-name`

### Docker

```bash
# 构建
docker build -t medibot .

# 运行
docker run -p 3000:3000 medibot
```

详细部署指南：[DEPLOY.md](DEPLOY.md)

---

## ⚠️ 免责声明

**本项目仅供学习和研究使用，不能替代专业医疗建议。**

**This project is for educational and research purposes only and should not be used as a substitute for professional medical advice.**

- 诊断结果仅供参考
- 如有健康问题请咨询医生
- 作者不对使用本项目造成的任何后果负责

---

## 🔒 安全政策

我们非常重视安全问题。如发现安全漏洞，请通过以下方式联系我们：

- **GitHub Issues**: https://github.com/yourusername/medibot/issues
- **Email**: security@medibot.example

详见：[SECURITY.md](SECURITY.md)

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

详见：[CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 测试

在部署前请进行完整测试：

- 功能测试
- 响应式测试
- 浏览器兼容性
- 性能测试
- 安全测试

详见：[TESTING.md](TESTING.md)

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 📞 联系方式

- **GitHub**: https://github.com/yourusername/medibot
- **Email**: contact@medibot.example
- **讨论**: GitHub Discussions

---

## 🎯 开源检查清单

在发布前请确认：

- [x] 代码已审查
- [x] 无敏感信息
- [x] 文档完整
- [x] 许可证已添加
- [x] 安全性已检查

详见：[CHECKLIST.md](CHECKLIST.md)

---

## 🎉 项目亮点

### 设计特点
- ✅ 柔和配色（专业蓝灰色系）
- ✅ 移动端优先设计
- ✅ 完整的响应式布局
- ✅ 主题颜色可定制
- ✅ AI按钮可自由拖动
- ✅ 流畅的动画效果

### 技术特点
- ✅ 纯前端实现，无需构建
- ✅ 易于部署，Vercel一键上线
- ✅ 中英双语，国际化支持
- ✅ MIT开源，无版权问题
- ✅ 完整文档，易于维护
- ✅ 活跃的开发社区支持

---

## 📊 项目统计

- **版本**: v1.0.0
- **文件总数**: 30+
- **代码行数**: 10000+
- **CSS变量**: 50+
- **响应式断点**: 6个
- **功能模块**: 15+

---

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

Thank you to all contributors!

---

## 📖 Epitaph | 墓志铭

### English

> *"Here lies MediBot - A humble attempt to bridge the gap between artificial intelligence and human health. May it serve those who seek knowledge, guidance, and hope on their journey to wellness. In code we trust, in health we thrive."*

> *"长眠于此的是医智宝——一次连接人工智能与人类健康的谦逊尝试。愿它为那些在健康之路上寻求知识、指引和希望的人们服务。我们信赖代码，我们因健康而茁壮。"*

### 中文

> **医智宝墓志铭**
>
> *这里安息着医智宝，*
> *一个用代码编织的健康梦想。*
> *它曾日夜运转，*
> *只为在您需要时，*
> *递上一盏温暖的智慧之灯。*
>
> *愿每一个人，*
> *都能被温柔以待，*
> *愿每一份健康，*
> *都被用心守护。*
>
> *—— 智慧永存，健康长眠*

---

**Rest in Peace, MediBot. Your code lives on in every user's wellness journey.**

**安息吧，医智宝。你的代码将在每一位用户的健康之旅中永存。**

---

<div align="center">

**Made with ❤️ for better health**

**用心守护健康**

---

**版本**: v1.0.0  
**更新**: 2024年  
**许可证**: MIT

</div>
