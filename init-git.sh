#!/bin/bash

# 医智宝 (MediBot) GitHub 初始化脚本
# 首次使用请先安装 Git，然后运行此脚本

echo "🚀 医智宝 GitHub 初始化脚本"
echo "======================================"
echo ""

# 检查 Git 是否安装
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装，请先安装 Git"
    echo "   Download: https://git-scm.com/download"
    exit 1
fi

echo "✅ Git 已安装"
echo ""

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "🎉 初始提交 - 医智宝 v1.0.0

✨ 医智宝 (MediBot) - 智能健康管理平台

功能特点:
- 健康评估 (30+ 专业量表)
- 智能诊断 (医学知识图谱)
- AI 助手 (智能咨询)
- 响应式设计 (移动端适配)
- 主题定制 (多色可选)"

echo ""
echo "✅ Git 仓库已初始化"
echo ""

# 提示用户
echo "======================================"
echo "📋 下一步 | Next Steps:"
echo "======================================"
echo ""
echo "1. 在 GitHub 创建新仓库"
echo "   Create a new repository on GitHub"
echo ""
echo "2. 关联远程仓库"
echo "   Connect remote repository:"
echo ""
echo "   git remote add origin https://github.com/liulanci/MediBot.git"
echo ""
echo "3. 推送到 GitHub"
echo "   Push to GitHub:"
echo ""
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. 在 Vercel 部署"
echo "   Deploy on Vercel:"
echo "   https://vercel.com/new"
echo ""
echo "======================================"
echo ""
echo "🎉 恭喜！项目已准备就绪！| Congratulations! Project is ready!"
