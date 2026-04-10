# Health Workspace 编译指南

## 📋 编译为 EXE 文件

### 方法一：使用 ps2exe (推荐)

#### 1. 安装 ps2exe

```powershell
# 在 PowerShell 中以管理员身份运行
Install-Module -Name ps2exe -Scope CurrentUser -SkipPublisherCheck -Force
```

#### 2. 编译安装程序

```powershell
# 编译安装程序
ps2exe .\Build-Installer.ps1 HealthWorkspace-Setup.exe -NoConsole -RequireAdmin

# 编译卸载程序
ps2exe .\Build-Uninstaller.ps1 HealthWorkspace-Uninstall.exe -NoConsole -RequireAdmin
```

#### 3. 验证 EXE 文件

```powershell
Get-ChildItem *.exe
```

---

### 方法二：直接运行 PowerShell 脚本

#### 1. 运行安装程序

```powershell
# 方式1: 右键点击 Build-Installer.ps1，选择"使用 PowerShell 运行"

# 方式2: 命令行
powershell -ExecutionPolicy Bypass -File .\Build-Installer.ps1

# 方式3: 以管理员权限运行
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File `"$PWD\Build-Installer.ps1`"" -Verb RunAs
```

#### 2. 运行卸载程序

```powershell
powershell -ExecutionPolicy Bypass -File .\Build-Uninstaller.ps1
```

---

### 方法三：使用批处理文件

#### 运行编译工具

```bash
# 双击运行 build.bat
build.bat
```

---

## 📦 生成的 EXE 文件

| 文件名 | 功能 | 大小 | 说明 |
|-------|------|------|------|
| HealthWorkspace-Setup.exe | 安装程序 | ~50KB | 用户协议、安装、快捷方式 |
| HealthWorkspace-Uninstall.exe | 卸载程序 | ~30KB | 卸载、清理用户数据 |

---

## 🚀 功能特性

### 安装程序功能

- [x] 显示用户许可协议 (EULA)
- [x] 接受协议确认
- [x] 自定义安装路径选择
- [x] 自动创建安装目录
- [x] 复制所有应用程序文件
- [x] 创建桌面快捷方式
- [x] 创建开始菜单快捷方式
- [x] 注册卸载程序信息
- [x] 安装日志记录
- [x] 错误处理和回滚

### 卸载程序功能

- [x] 显示安装信息
- [x] 确认卸载
- [x] 删除桌面快捷方式
- [x] 删除开始菜单快捷方式
- [x] 删除应用程序文件
- [x] 可选删除用户数据
- [x] 完整卸载日志
- [x] 错误处理

---

## ⚙️ 系统要求

### 运行环境

- Windows 10/11
- PowerShell 5.1+
- 管理员权限（可选，用于系统目录安装）

### 磁盘空间

- 应用程序: ~50MB
- 临时文件: ~10MB

---

## 🔧 高级配置

### 修改安装路径

编辑 `Build-Installer.ps1` 中的变量：

```powershell
$AppName = "Health Workspace"
$InstallPath = Join-Path $env:APPDATA $AppName
```

### 修改快捷方式图标

```powershell
$Shortcut.IconLocation = "shell32.dll, 0"  # Windows 默认图标
$Shortcut.IconLocation = "C:\path\to\icon.ico"  # 自定义图标
```

### 添加更多快捷方式

编辑 `Build-Installer.ps1` 的 `New-Shortcuts` 函数添加更多快捷方式。

---

## 📝 日志文件

安装日志位置: `%TEMP%\HealthWorkspace_Setup.log`  
卸载日志位置: `安装目录\uninstall.log`

查看日志:

```powershell
Get-Content $env:TEMP\HealthWorkspace_Setup.log
```

---

## 🐛 故障排除

### 问题：安装程序被杀毒软件拦截

**解决方案**: 
- 将安装程序添加到白名单
- 禁用杀毒软件后安装

### 问题：无法创建快捷方式

**解决方案**: 
- 以管理员权限运行安装程序
- 检查桌面目录权限

### 问题：卸载不干净

**解决方案**: 
- 手动删除安装目录
- 使用系统清理工具

---

## 📞 支持

如有问题，请联系: support@healthworkspace.example.com

---

**版本**: 1.0.0  
**更新**: 2026-04-10
