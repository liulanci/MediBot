# Health Workspace 安装说明

## 安装方式

### 方式一：直接运行安装程序（推荐）

1. 下载 `HealthWorkspace-Setup.exe`
2. 双击运行安装程序
3. 阅读并接受用户许可协议
4. 选择安装位置
5. 完成安装

### 方式二：命令行安装

```bash
node installer.js
```

### 方式三：便携版使用

1. 解压到任意目录
2. 运行 `Health Workspace.exe` 启动应用

---

## 系统要求

- **操作系统**: Windows 10/11
- **运行时**: Node.js 14.0+（如不使用便携版）
- **磁盘空间**: 100MB
- **内存**: 512MB RAM

---

## 安装功能

### ✅ 自动安装
- 安装到用户指定位置
- 创建桌面快捷方式
- 创建开始菜单快捷方式
- 注册卸载程序到控制面板

### ✅ 用户协议
- 安装前显示许可协议
- 需要用户明确接受协议
- 符合软件分发最佳实践

### ✅ 卸载功能
- 从开始菜单卸载
- 从控制面板程序和功能卸载
- 可选择清理用户数据

---

## 文件说明

```
Health Workspace/
├── src/
│   ├── index.js          # 主应用入口
│   ├── app.js            # 应用程序
│   ├── config/           # 配置
│   ├── utils/            # 工具函数
│   └── security/         # 安全模块
├── installer.js        # 安装脚本
├── uninstall.js        # 卸载脚本
├── EULA.txt          # 用户许可协议
├── package.json      # 项目配置
└── README.md         # 本文件
```

---

## 编译说明（开发者）

### 使用 pkg 编译为 EXE

1. 安装 pkg：
```bash
npm install -g pkg
```

2. 编译安装程序：
```bash
pkg installer.js -t node14-win-x64 -o HealthWorkspace-Setup.exe
```

3. 编译主程序：
```bash
pkg src/app.js -t node14-win-x64 -o "Health Workspace.exe"
```

### 使用 nexe 编译

1. 安装 nexe：
```bash
npm install -g nexe
```

2. 编译：
```bash
nexe -i installer.js -o HealthWorkspace-Setup.exe
```

---

## 常见问题

### Q: 安装程序被杀毒软件拦截？
A: 这是正常的，请选择"允许"或"信任"该程序。

### Q: 无法创建快捷方式？
A: 请尝试以管理员权限运行安装程序。

### Q: 卸载后文件未删除？
A: 请手动删除安装目录。

### Q: 如何彻底卸载？
A: 
1. 运行卸载程序
2. 删除安装目录
3. 删除用户数据目录 `%APPDATA%\HealthWorkspace`

---

## 技术支持

如有问题，请联系：support@healthworkspace.example.com

---

**版本**: 4.0.0  
**发布日期**: 2026-04-10
