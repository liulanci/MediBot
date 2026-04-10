# 贡献指南 | Contributing Guide

感谢您考虑为 医智宝 (MediBot) 做出贡献！

Thank you for considering contributing to MediBot!

---

## 🤝 如何贡献 | How to Contribute

### 报告问题 | Reporting Issues

发现Bug？请告诉我们：

Found a bug? Let us know:

1. 搜索现有问题 | Search existing issues
2. 创建新Issue | Create new issue
3. 使用 Issue 模板 | Use issue template
4. 提供详细信息 | Provide details

**包含内容 | Include**:
- 问题描述 | Description
- 复现步骤 | Steps to reproduce
- 预期 vs 实际 | Expected vs actual
- 环境信息 | Environment info

---

### 代码贡献 | Code Contributions

#### Fork & Pull Request 工作流

1. **Fork 仓库** | Fork the repository
2. **克隆到本地** | Clone locally
   ```bash
   git clone https://github.com/liulanci/MediBot.git
   cd medibot
   ```
3. **创建分支** | Create branch
   ```bash
   git checkout -b feature/your-feature-name
   # 或 / fix/your-bug-fix
   ```
4. **编写代码** | Write code
5. **提交** | Commit
   ```bash
   git add .
   git commit -m "Add: 添加新功能 | Add new feature"
   ```
6. **推送** | Push
   ```bash
   git push origin feature/your-feature-name
   ```
7. **创建 Pull Request** | Create Pull Request

---

## 📝 代码规范 | Code Standards

### JavaScript 规范

- 使用语义化命名 | Use semantic naming
- 添加中文注释 | Add Chinese comments
- 遵循 ES6+ 语法 | Follow ES6+ syntax

**示例 | Example**:
```javascript
// ✅ 正确 | Correct
/**
 * 计算BMI
 * @param {number} weight 体重(kg)
 * @param {number} height 身高(m)
 * @returns {number} BMI值
 */
function calculateBMI(weight, height) {
    return weight / (height * height);
}

// ❌ 避免 | Avoid
function calc(w, h) {
    return w / (h * h);
}
```

### CSS 规范

- 使用 CSS 变量 | Use CSS variables
- 添加中文注释 | Add Chinese comments
- 移动端优先 | Mobile-first

**示例 | Example**:
```css
/* ✅ 正确 | Correct */
/* 主色调 */
:root {
    --primary: #5B7DB1;
}

/* ❌ 避免 | Avoid */
.test {
    color: #5B7DB1;
}
```

---

## 🧪 测试指南 | Testing Guide

### 本地测试 | Local Testing

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 测试不同屏幕尺寸
# Test different screen sizes
```

### 测试清单 | Testing Checklist

- [ ] 功能测试 | Functionality
- [ ] 响应式测试 | Responsiveness
- [ ] 浏览器兼容性 | Browser compatibility
- [ ] 移动端触摸 | Mobile touch
- [ ] 性能检查 | Performance

---

## 📖 文档贡献 | Documentation

### 需要文档 | Documentation Needed

- README 改进 | README improvements
- API 文档 | API documentation
- 使用教程 | Tutorials
- 示例代码 | Code examples

### 文档格式 | Documentation Format

使用 Markdown，保持简洁：

Use Markdown, keep it simple:

```markdown
## 标题 | Title

说明文字 | Description

### 子标题 | Subtitle

- 要点1 | Point 1
- 要点2 | Point 2

### 代码示例 | Code Example

\`\`\`javascript
// 代码
\`\`\`
```

---

## 🎯 贡献类型 | Types of Contributions

### 🐛 Bug 修复 | Bug Fixes
- 修复已知问题 | Fix known issues
- 改进错误处理 | Improve error handling

### ✨ 新功能 | New Features
- 健康评估功能 | Health assessment features
- AI 诊断能力 | AI diagnosis capabilities
- 用户界面改进 | UI improvements

### 📚 文档 | Documentation
- 改进说明 | Improve instructions
- 添加示例 | Add examples
- 翻译文档 | Translate

### 🎨 设计 | Design
- UI/UX 改进 | UI/UX improvements
- 响应式设计 | Responsive design
- 主题定制 | Theming

### ⚡ 性能 | Performance
- 加载优化 | Loading optimization
- 代码精简 | Code optimization
- 缓存策略 | Caching strategies

---

## 📋 Pull Request 指南 | Pull Request Guidelines

### PR 模板 | PR Template

```markdown
## 描述 | Description
<!-- 简要描述改动 | Briefly describe changes -->

## 改动类型 | Type of Change
- [ ] Bug 修复 | Bug fix
- [ ] 新功能 | New feature
- [ ] 文档更新 | Documentation
- [ ] 代码重构 | Refactoring

## 测试 | Testing
<!-- 描述测试方式 | Describe testing -->

## 截图 | Screenshots
<!-- 如有UI改动 | If UI changes -->

## 检查清单 | Checklist
- [ ] 代码符合规范 | Code follows standards
- [ ] 添加中文注释 | Chinese comments added
- [ ] 测试通过 | Tests passed
- [ ] 文档已更新 | Docs updated
```

---

## 🏷️ 版本标签 | Version Labels

| 标签 | 含义 | Description |
|------|------|-------------|
| `bug` | Bug 修复 | Bug fix |
| `enhancement` | 新功能 | New feature |
| `documentation` | 文档 | Documentation |
| `help wanted` | 需要帮助 | Help needed |
| `good first issue` | 入门 | Good for beginners |

---

## 💬 社区准则 | Community Guidelines

### 行为准则 | Code of Conduct

- **尊重** | Be respectful
- **包容** | Be inclusive
- **建设性** | Be constructive
- **专注** | Be focused

### 交流语言 | Communication Language

- 中文或英文均可 | Chinese or English
- 使用清晰简洁的语言 | Use clear language
- 添加必要的注释 | Add necessary comments

---

## 📞 联系 | Contact

- **GitHub Discussions**: https://github.com/liulanci/MediBot/discussions
- **Issue Tracker**: https://github.com/liulanci/MediBot/issues
- **邮箱**: liulanxime@outlook.com

---

## 🙏 致谢 | Acknowledgments

感谢所有贡献者！

Thank you to all contributors!

---

**让我们一起让 医智宝 变得更好！**

**Let's make MediBot better together!**

---

*Last updated: 2024*
