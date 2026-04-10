# GitHub 同步说明

## 🚀 快速同步到 GitHub

### 方法一：使用部署脚本（推荐）

1. **双击运行** `deploy-to-github.bat`
2. **等待完成** - 自动复制、提交、推送
3. **完成！** - 代码已同步到 GitHub

---

### 方法二：手动操作

#### 第一步：复制文件

```batch
:: 在文件资源管理器中
:: 将 C:\Users\34607\Documents\qianyi\1\opencode-workspace\health-ai-pro
:: 中的所有文件复制到
:: C:\Users\34607\Documents\GitHub\MediBot\MediBot
```

#### 第二步：提交并推送

```bash
# 进入 GitHub 仓库
cd C:\Users\34607\Documents\GitHub\MediBot\MediBot

# 添加所有文件
git add .

# 创建提交
git commit -m "🎉 医智宝 v1.0.0"

# 推送代码
git push -u origin main
```

---

## 📁 文件说明

### 需要同步的文件

```
health-ai-pro/
├── public/
│   ├── css/
│   │   ├── styles.css       (源码)
│   │   └── styles.min.css   (压缩版)
│   ├── js/
│   │   ├── draggable.js     (源码)
│   │   └── draggable.min.js (压缩版)
│   ├── _headers
│   ├── index.html
│   └── index-template.html
│
├── src/                     (源代码)
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── vercel.json
├── QUICKSTART.md
├── DEPLOY.md
├── TESTING.md
├── SECURITY.md
├── CONTRIBUTING.md
├── CHECKLIST.md
├── OPTIMIZATION.md
├── FINAL_REPORT.md
├── THEME_GUIDE.md
└── deploy-to-github.bat      (部署脚本)
```

### GitHub 不需要的文件

以下文件会被 `.gitignore` 自动忽略：
- `node_modules/`
- `.env`
- `*.log`
- `*.tmp`
- 操作系统文件

---

## 🎯 部署后操作

### 1. Vercel 部署

1. 访问 https://vercel.com
2. 用 GitHub 登录
3. 点击 "Import Project"
4. 选择 `MediBot` 仓库
5. 点击 "Deploy"

### 2. 验证部署

- ✅ 网站可访问
- ✅ 响应式正常
- ✅ AI按钮可拖动
- ✅ 导航正常

---

## 🔧 常见问题

### Q: 推送失败？

**A**: 检查 GitHub 认证
```bash
git remote -v
# 确认 URL 正确

# 如果需要，重新添加
git remote set-url origin https://github.com/YOUR_USERNAME/MediBot.git
```

### Q: 文件冲突？

**A**: 先拉取再推送
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Q: 权限不足？

**A**: 检查 SSH key 或 Token 认证
```bash
# 测试连接
ssh -T git@github.com

# 或使用 Token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/MediBot.git
```

---

## ✅ 检查清单

同步前请确认：

- [ ] 所有文件已复制
- [ ] .gitignore 配置正确
- [ ] 无敏感信息
- [ ] README 已更新
- [ ] LICENSE 已添加

---

## 📞 获取帮助

- **GitHub Issues**: https://github.com/yourusername/MediBot/issues
- **文档**: README.md

---

## 🎉 完成后

1. **访问** GitHub 仓库确认代码
2. **部署** 到 Vercel
3. **分享** 您的项目！

---

**时间估计**: 5-10分钟

**难度**: ⭐ 简单

**成功率**: 99%
