# 测试指南 | Testing Guide

## 🧪 测试清单 | Testing Checklist

### 1. 功能测试 | Functionality Tests

#### 1.1 首页测试
- [ ] 页面加载正常
- [ ] 导航菜单可点击
- [ ] 响应式布局正常
- [ ] 动画效果流畅

#### 1.2 健康评估测试
- [ ] 量表列表显示完整
- [ ] 点击量表可进入
- [ ] 问题显示正常
- [ ] 提交功能正常

#### 1.3 AI助手测试
- [ ] 按钮可拖动
- [ ] 点击弹出提示
- [ ] 移动端正常显示

#### 1.4 设置功能测试
- [ ] 主题切换正常
- [ ] 布局切换正常
- [ ] 设置保存正常

### 2. 响应式测试 | Responsive Tests

#### 2.1 桌面端 (≥992px)
- [ ] 侧边栏显示
- [ ] 网格布局正常
- [ ] 悬浮按钮正常
- [ ] Footer 显示

#### 2.2 平板端 (768px - 991px)
- [ ] 侧边栏显示
- [ ] 网格两列
- [ ] 汉堡菜单隐藏

#### 2.3 手机端 (<576px)
- [ ] 汉堡菜单显示
- [ ] 侧边栏隐藏
- [ ] 全宽布局
- [ ] 网格单列

#### 2.4 手机横屏 (576px - 767px)
- [ ] 侧边栏显示
- [ ] 网格两列

### 3. 浏览器兼容性测试 | Browser Compatibility

#### 3.1 桌面浏览器
- [ ] Chrome 80+
- [ ] Firefox 75+
- [ ] Safari 13+
- [ ] Edge 80+

#### 3.2 移动浏览器
- [ ] iOS Safari 13+
- [ ] Chrome Mobile 80+
- [ ] Samsung Internet

### 4. 性能测试 | Performance Tests

#### 4.1 加载性能
- [ ] 首屏加载 < 3秒
- [ ] CSS 文件加载正常
- [ ] JS 文件加载正常
- [ ] 无 404 资源

#### 4.2 运行性能
- [ ] 动画流畅 (60fps)
- [ ] 页面切换流畅
- [ ] 无内存泄漏
- [ ] 无控制台错误

### 5. 安全性测试 | Security Tests

#### 5.1 基础安全
- [ ] 无 XSS 漏洞
- [ ] 无 SQL 注入风险
- [ ] 无敏感信息泄露
- [ ] HTTPS 可用

#### 5.2 敏感信息检查
- [ ] 无硬编码密码
- [ ] 无 API 密钥
- [ ] 无个人信息
- [ ] 无测试数据残留

### 6. 可访问性测试 | Accessibility Tests

#### 6.1 键盘导航
- [ ] Tab 键可导航
- [ ] Enter 键可点击
- [ ] Esc 键可关闭

#### 6.2 屏幕阅读器
- [ ] 图片有 alt 属性
- [ ] 表单有 label
- [ ] 颜色对比度足够

### 7. 部署测试 | Deployment Tests

#### 7.1 Vercel 部署
- [ ] 部署成功
- [ ] 域名可访问
- [ ] HTTPS 正常
- [ ] 功能完整

#### 7.2 Netlify 部署
- [ ] 部署成功
- [ ] 域名可访问
- [ ] 缓存正常

## 🛠️ 测试工具 | Testing Tools

### 在线测试
- [BrowserStack](https://www.browserstack.com) - 跨浏览器测试
- [GTmetrix](https://gtmetrix.com) - 性能测试
- [Google PageSpeed](https://pagespeed.web.dev) - 页面速度
- [WebPageTest](https://webpagetest.org) - 网页测试

### 浏览器开发工具
- Chrome DevTools (F12)
- Firefox Developer Tools
- Safari Web Inspector

### 代码检查
- ESLint - JavaScript 检查
- W3C Validator - HTML 验证
- CSS Validator - CSS 验证

## 📝 测试报告模板 | Test Report Template

```markdown
## 测试报告 | Test Report

### 测试信息 | Test Info
- 测试日期 | Date:
- 测试人员 | Tester:
- 测试版本 | Version:

### 测试结果 | Results
- ✅ 通过 | Passed:
- ❌ 失败 | Failed:
- ⚠️ 警告 | Warnings:

### 问题列表 | Issues
| ID | 描述 | 严重性 | 状态 |
|----|------|--------|------|
| 1  |      | 高/中/低 | 开放/已修复 |

### 备注 | Notes
```

## 🚨 常见问题 | Common Issues

### 问题1：页面样式错乱
**原因**：CSS 文件未加载
**解决**：
1. 检查 HTML 中的 CSS 引用
2. 确认文件路径正确
3. 清除浏览器缓存

### 问题2：响应式不工作
**原因**：视口设置错误
**解决**：
1. 确认 `<meta name="viewport">` 存在
2. 检查媒体查询语法
3. 刷新页面

### 问题3：移动端菜单不显示
**原因**：JavaScript 错误
**解决**：
1. 检查浏览器控制台
2. 确认 JS 文件加载
3. 检查 onclick 属性

### 问题4：按钮拖动不工作
**原因**：draggable.js 未加载
**解决**：
1. 确认 `<script src="js/draggable.js">` 存在
2. 确认元素有 `class="draggable"`
3. 检查控制台错误

## ✅ 质量标准 | Quality Standards

### 必须通过 | Must Pass
- 所有功能测试
- 手机端响应式
- 平板端响应式
- 桌面端响应式
- Chrome 兼容性

### 建议通过 | Should Pass
- 所有浏览器测试
- 性能测试
- 可访问性测试
- 安全测试

### 可选测试 | Nice to Have
- 其他移动浏览器
- 屏幕阅读器
- 自动化测试

---

**版本**: 1.0  
**更新**: 2024年
