# 医智宝 - 5分钟快速上手

## 🚀 5分钟部署到 Vercel

### 第一步：推送代码到 GitHub (2分钟)

```bash
# 1. 进入项目目录
cd mediBot

# 2. 初始化 Git
git init

# 3. 添加所有文件
git add .

# 4. 创建提交
git commit -m "🎉 医智宝 v1.0.0"

# 5. 关联 GitHub
git remote add origin https://github.com/liulanci/MediBot.git

# 6. 推送
git branch -M main
git push -u origin main
```

### 第二步：Vercel 部署 (2分钟)

1. 打开 https://vercel.com
2. 用 GitHub 登录
3. 点击 "Import Project"
4. 选择 `medibot` 仓库
5. 点击 "Deploy"
6. **完成！获得免费 URL**

### 第三步：测试 (1分钟)

- ✅ 网站是否正常访问
- ✅ 响应式布局是否正常
- ✅ AI按钮是否可拖动
- ✅ 导航是否正常

---

## 🎯 常见问题

### Q: Git 命令报错？
**A**: 确保已安装 Git https://git-scm.com

### Q: GitHub 推送失败？
**A**: 检查仓库是否已创建，或使用 token 认证

### Q: Vercel 部署失败？
**A**: 查看 Vercel 控制台的错误日志，通常是配置问题

### Q: 网站显示空白？
**A**: 清除浏览器缓存，或检查网络

---

## 📁 项目文件说明

| 文件 | 说明 | 重要性 |
|------|------|--------|
| `index.html` | 主页面 | ⭐⭐⭐ |
| `css/styles.css` | 样式表 | ⭐⭐⭐ |
| `js/draggable.js` | 拖动功能 | ⭐⭐ |
| `README.md` | 项目文档 | ⭐⭐⭐ |
| `package.json` | NPM配置 | ⭐⭐ |

---

## 🎨 快速定制

### 修改网站标题

编辑 `public/index.html`:

```html
<title>你的标题 · 智能健康管理平台</title>
```

### 修改主题颜色

编辑 `public/css/styles.css`:

```css
:root {
    --primary: #你的颜色;
}
```

### 修改版权信息

编辑 `public/index.html`:

```html
<div class="footer-brand">© 2024 你的名字</div>
```

---

## 🌐 托管平台对比

| 平台 | 免费额度 | 部署难度 | 推荐度 |
|------|---------|---------|--------|
| Vercel | 无限流量 | ⭐ 简单 | ⭐⭐⭐⭐⭐ |
| Netlify | 100GB/月 | ⭐⭐ 简单 | ⭐⭐⭐⭐ |
| GitHub Pages | 无限 | ⭐⭐⭐ 中等 | ⭐⭐⭐ |
| Cloudflare Pages | 无限 | ⭐⭐ 简单 | ⭐⭐⭐⭐ |

---

## 📞 获取帮助

- **文档**: README.md
- **部署**: DEPLOY.md
- **测试**: TESTING.md
- **问题**: GitHub Issues

---

## ✅ 检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送
- [ ] Vercel 部署成功
- [ ] 网站正常访问
- [ ] 功能测试通过

---

**5分钟即可上线！祝部署顺利！** 🎉
