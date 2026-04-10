@echo off
chcp 65001 >nul
echo ============================================
echo 医智宝 - GitHub 部署脚本
echo ============================================
echo.

:: 设置路径
set "SOURCE=C:\Users\34607\Documents\qianyi\1\opencode-workspace\health-ai-pro"
set "DEST=C:\Users\34607\Documents\GitHub\MediBot\MediBot"

echo [1/4] 正在复制文件到 GitHub 仓库...
xcopy "%SOURCE%\*" "%DEST%\" /E /Y /Q >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 文件复制成功
) else (
    echo ❌ 文件复制失败
    pause
    exit /b 1
)

echo.
echo [2/4] 进入 GitHub 仓库目录...
cd /d "%DEST%"

echo.
echo [3/4] 提交更改...
git add .
git commit -m "🎉 医智宝 v1.0.0 - 智能健康管理平台

✨ 完整功能：
- 健康评估 (30+ 专业量表)
- 智能诊断 (医学知识图谱)
- AI助手 (可拖动)
- 响应式设计 (移动端适配)
- 主题定制 (多色可选)

🔧 技术特点：
- 性能优化 (CSS/JS 压缩)
- 响应式设计 (6个断点)
- SEO优化 (Meta标签)
- 安全性检查 (无敏感信息)
- 中英双语 (完整文档)"

if %errorlevel% equ 0 (
    echo ✅ 提交成功
) else (
    echo ⚠️ 没有需要提交的更改
)

echo.
echo [4/4] 推送到 GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo ✅ 部署成功！
    echo ============================================
    echo.
    echo 🎉 您的项目已成功部署到 GitHub！
    echo.
    echo 📋 文档列表：
    echo    - README.md          项目主文档
    echo    - QUICKSTART.md      快速开始
    echo    - DEPLOY.md          部署指南
    echo    - OPTIMIZATION.md   性能优化报告
    echo    - FINAL_REPORT.md    完成报告
    echo.
    echo 🌐 下一步：
    echo    1. 访问 https://github.com 确认代码
    echo    2. 在 Vercel 部署：https://vercel.com
    echo.
) else (
    echo.
    echo ❌ 推送失败，请检查网络连接或 GitHub 认证
)

echo.
pause
