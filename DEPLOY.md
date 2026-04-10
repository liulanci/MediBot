# 部署指南 | Deployment Guide

## 🚀 快速部署 | Quick Deploy

### 方法一：Vercel（一键部署）

**最简单方式 | Simplest Method**

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 登录 | Login with GitHub
3. 点击 "Import Project"
4. 选择仓库 | Select repository
5. 点击 "Deploy"
6. **完成！** | **Done!**

**预计时间 | Time**: 2-3分钟

---

### 方法二：Netlify（拖拽部署）

**无需命令行 | No Command Line**

1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录 | Sign up/Login
3. 拖拽 `public` 文件夹到页面
4. **完成！** | **Done!**

**预计时间 | Time**: 1分钟

---

### 方法三：GitHub Pages（免费托管）

**永久免费 | Always Free**

1. 在 GitHub 创建新仓库 | Create new repo
2. 上传代码 | Upload code
3. Settings → Pages
4. Source: main branch
5. Save
6. 等待构建 | Wait for build
7. 访问 `https://username.github.io/repo-name`

**预计时间 | Time**: 5-10分钟

---

## 🐳 Docker 部署 | Docker Deploy

### 构建镜像 | Build Image

```bash
# 构建
docker build -t medibot:latest .

# 运行
docker run -d \
  --name medibot \
  -p 3000:3000 \
  -e DB_HOST=localhost \
  -e DB_PASSWORD=yourpassword \
  medibot:latest
```

### Docker Compose

```yaml
version: '3.8'
services:
  medibot:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      - db
  
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
      - MYSQL_DATABASE=medibot
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

运行：
```bash
docker-compose up -d
```

---

## 🌐 自定义域名 | Custom Domain

### Vercel

1. 项目设置 | Project Settings
2. Domains
3. 添加域名 | Add domain
4. 配置 DNS
5. 自动 HTTPS

### Netlify

1. Domain management
2. Add custom domain
3. 配置 DNS 记录 | Configure DNS

推荐 DNS 配置 | Recommended DNS:
```
A Record: @ → 76.76.21.21
CNAME: www → your-site.netlify.app
```

---

## ⚙️ 环境配置 | Environment Config

### 开发环境 | Development

```bash
# 创建 .env 文件
cp .env.example .env

# 编辑配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
PORT=3000
```

### 生产环境 | Production

**重要 | Important**: 
- 使用强密码 | Use strong passwords
- 启用 HTTPS | Enable HTTPS
- 限制数据库访问 | Restrict database access

```bash
# Vercel 环境变量
vercel env add DB_HOST
vercel env add DB_PASSWORD
vercel env add SECRET_KEY

# 部署
vercel --prod
```

---

## 🔒 安全配置 | Security Config

### 必做 | Must Do

1. **修改默认密码** | Change default passwords
2. **启用 HTTPS** | Enable HTTPS
3. **设置防火墙** | Configure firewall
4. **定期更新** | Regular updates

### 推荐 | Recommended

1. **使用 CDN** | Use CDN
2. **启用缓存** | Enable caching
3. **配置日志** | Configure logging
4. **设置监控** | Set up monitoring

---

## 📊 监控和维护 | Monitoring & Maintenance

### 日志查看 | View Logs

```bash
# Vercel
vercel logs your-project

# Docker
docker logs medibot

# PM2 (如果使用)
pm2 logs medibot
```

### 性能监控 | Performance Monitoring

推荐工具 | Recommended tools:
- **Vercel Analytics** - 内置分析
- **Google Analytics** - 访问统计
- **Sentry** - 错误追踪
- **Uptime Robot** - 在线监控

---

## 🔄 更新部署 | Update Deploy

### Vercel

自动检测 Git 更新 | Auto-detect Git updates:
```bash
git add .
git commit -m "Update"
git push
```

### Docker

```bash
# 重新构建
docker build -t medibot:latest .
docker stop medibot
docker rm medibot
docker run -d --name medibot -p 3000:3000 medibot:latest
```

### Docker Compose

```bash
docker-compose pull
docker-compose up -d
```

---

## 🆘 故障排除 | Troubleshooting

### 常见问题 | Common Issues

**Q: 页面空白 | Page is blank**
- 检查浏览器控制台 | Check browser console
- 确认文件路径 | Verify file paths
- 清除缓存 | Clear cache

**Q: 部署失败 | Deploy failed**
- 检查依赖 | Check dependencies
- 查看日志 | Check logs
- 确认 Git 状态 | Verify Git status

**Q: 数据库连接错误 | Database connection error**
- 检查环境变量 | Check environment variables
- 确认数据库运行 | Verify database is running
- 检查防火墙 | Check firewall

---

## 📞 获取帮助 | Get Help

- **GitHub Issues**: https://github.com/yourusername/medibot/issues
- **文档**: https://github.com/yourusername/medibot#readme
- **讨论**: https://github.com/yourusername/medibot/discussions

---

## ✅ 部署检查清单 | Deployment Checklist

### 部署前 | Pre-Deploy
- [ ] 代码已测试 | Code tested
- [ ] 无敏感信息 | No sensitive info
- [ ] 环境变量已配置 | Env vars configured
- [ ] 依赖已安装 | Dependencies installed

### 部署后 | Post-Deploy
- [ ] 网站可访问 | Site accessible
- [ ] HTTPS 已启用 | HTTPS enabled
- [ ] 功能测试通过 | Features work
- [ ] 监控已设置 | Monitoring set up

---

**Good luck with your deployment! | 祝部署顺利!**

---

*Last updated: 2024*
