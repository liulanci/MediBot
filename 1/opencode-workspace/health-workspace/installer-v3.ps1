# Health Workspace 完整安装程序 v4.0.0
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Global:AppName = "Health Workspace"
$Global:AppVersion = "4.0.0"
$Global:InstallPath = Join-Path $env:LOCALAPPDATA "Health Workspace"
$Global:DesktopPath = [Environment]::GetFolderPath("Desktop")
$Global:StartMenuPath = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$Global:LogFile = Join-Path $env:TEMP "HealthWorkspace_Install_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"

$Global:ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $LogEntry = "[$Timestamp] $Message"
    $LogEntry | Out-File -FilePath $Global:LogFile -Append -Encoding UTF8
    Write-Host $Message
}

function Show-Header {
    param([string]$Title)
    Clear-Host
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host "    $Title" -ForegroundColor Cyan
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Show-Welcome {
    Show-Header "欢迎使用安装向导"
    
    Write-Host "欢迎安装 $AppName v$AppVersion" -ForegroundColor Green
    Write-Host ""
    Write-Host "功能特点:" -ForegroundColor Yellow
    Write-Host "  - MBTI 人格诊断系统"
    Write-Host "  - BMI 健康评估系统"
    Write-Host "  - 综合健康报告生成"
    Write-Host "  - 数据导出功能 (Markdown/JSON)"
    Write-Host ""
    Write-Host "安全特性:" -ForegroundColor Yellow
    Write-Host "  - 输入验证与安全过滤"
    Write-Host "  - AES-256-GCM 数据加密"
    Write-Host "  - 完整审计日志系统"
    Write-Host "  - 速率限制保护"
    Write-Host ""
    Write-Host "系统要求:" -ForegroundColor Yellow
    Write-Host "  - 操作系统: Windows 10/11"
    Write-Host "  - 运行环境: Node.js 18+ 或 PowerShell 5.1+"
    Write-Host "  - 存储空间: 100MB 可用空间"
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Show-EULA {
    Show-Header "许可协议"
    
    $EulaPath = Join-Path $Global:ScriptRoot "EULA.txt"
    if (Test-Path $EulaPath) {
        $EulaContent = Get-Content $EulaPath -Raw
        Write-Host $EulaContent
    } else {
        Write-Host @"

                        最终用户许可协议 (EULA)

版权所有 (c) 2024 OpenCode Team
版权所有

本软件仅供个人学习和评估使用。

使用本软件即表示您同意以下条款：

1. 许可证授予
   本软件按\"原样\"提供，仅供个人非商业用途。

2. 免责声明
   作者不对使用本软件导致的任何直接或间接损失负责。
   不提供任何明示或暗示的保证，包括但不限于适销性、
   针对特定用途的适用性保证。

3. 禁止行为
   禁止对本软件进行反向工程、反编译或修改。
   禁止分发、出售或转让本软件。

4. 隐私说明
   本软件不会收集、存储或传输任何个人信息。
   所有数据处理均在本地完成。

5. 终止条款
   如果您违反本协议的条款，本许可证将自动终止。

6. 争议解决
   本协议受中华人民共和国法律管辖。
   如有争议，应通过友好协商解决。

"@ -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "请仔细阅读以上许可协议。" -ForegroundColor Yellow
    Write-Host ""
    
    do {
        Write-Host "我已阅读并同意上述许可协议的所有条款" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "[Y] 同意并继续安装"
        Write-Host "[N] 不同意并退出"
        Write-Host ""
        $Response = Read-Host "请选择 (Y/N)"
        $Response = $Response.ToUpper()
        
        if ($Response -eq "N") {
            Write-Host ""
            Write-Host "安装已取消。" -ForegroundColor Yellow
            Write-Log "用户拒绝许可协议"
            exit 0
        }
    } while ($Response -ne "Y")
    
    Write-Host ""
    Write-Host "✓ 感谢您接受许可协议" -ForegroundColor Green
    Write-Log "用户接受许可协议"
}

function Show-InstallPath {
    Show-Header "选择安装位置"
    
    Write-Host "安装位置:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "默认: $Global:InstallPath" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "[1] 使用默认位置安装" -ForegroundColor Green
    Write-Host "[2] 自定义安装位置" -ForegroundColor Green
    Write-Host "[3] 浏览..." -ForegroundColor Green
    Write-Host ""
    Write-Host "[C] 取消安装" -ForegroundColor Red
    Write-Host ""
    
    $Choice = Read-Host "请选择 (1/2/3)"
    
    switch ($Choice) {
        "1" {
            if (-not (Test-Path (Split-Path $Global:InstallPath -Parent))) {
                New-Item -ItemType Directory -Path (Split-Path $Global:InstallPath -Parent) -Force | Out-Null
            }
            if (-not (Test-Path $Global:InstallPath)) {
                New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
            }
        }
        "2" {
            Write-Host ""
            $InputPath = Read-Host "请输入安装路径 (例如: C:\Program Files\Health Workspace)"
            if ($InputPath) {
                $Global:InstallPath = $InputPath
            }
        }
        "3" {
            Add-Type -AssemblyName System.Windows.Forms
            $FolderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog
            $FolderBrowser.Description = "选择安装位置"
            $FolderBrowser.SelectedPath = $Global:InstallPath
            if ($FolderBrowser.ShowDialog() -eq "OK") {
                $Global:InstallPath = $FolderBrowser.SelectedPath
            }
        }
        "C" {
            Write-Host ""
            Write-Host "安装已取消。" -ForegroundColor Yellow
            exit 0
        }
        default {
            if (-not (Test-Path (Split-Path $Global:InstallPath -Parent))) {
                New-Item -ItemType Directory -Path (Split-Path $Global:InstallPath -Parent) -Force | Out-Null
            }
            if (-not (Test-Path $Global:InstallPath)) {
                New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
            }
        }
    }
    
    Write-Host ""
    Write-Host "安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Log "安装路径: $Global:InstallPath"
    Write-Host ""
}

function Show-InstallProgress {
    Show-Header "正在安装"
    
    Write-Host "正在安装文件..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "[                                                  ]" -ForegroundColor Gray
    Write-Host ""
    
    if (-not (Test-Path $Global:InstallPath)) {
        New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
    }
    
    $SourceFiles = Get-ChildItem -Path $Global:ScriptRoot -File
    $TotalFiles = $SourceFiles.Count
    $CurrentFile = 0
    
    foreach ($File in $SourceFiles) {
        $CurrentFile++
        $Percent = [math]::Round(($CurrentFile / $TotalFiles) * 50)
        $ProgressBar = "[" + ("=" * $Percent).PadRight(50) + "]"
        
        Write-Host "`r$ProgressBar $($CurrentFile)/$TotalFiles 文件" -NoNewline
        Copy-Item -Path $File.FullName -Destination $Global:InstallPath -Force
    }
    
    $SubDirs = Get-ChildItem -Path $Global:ScriptRoot -Directory
    foreach ($Dir in $SubDirs) {
        $DestDir = Join-Path $Global:InstallPath $Dir.Name
        if (-not (Test-Path $DestDir)) {
            New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
        }
        
        $DirFiles = Get-ChildItem -Path $Dir.FullName -File -Recurse
        foreach ($File in $DirFiles) {
            $CurrentFile++
            $Percent = [math]::Round(($CurrentFile / ($TotalFiles + $DirFiles.Count)) * 50)
            $ProgressBar = "[" + ("=" * $Percent).PadRight(50) + "]"
            Write-Host "`r$ProgressBar 正在复制: $($File.Name)" -NoNewline
            
            $RelativePath = $File.FullName.Substring($Dir.FullName.Length)
            $TargetPath = Join-Path $DestDir (Split-Path $RelativePath -Parent)
            if (-not (Test-Path $TargetPath)) {
                New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
            }
            Copy-Item -Path $File.FullName -Destination (Join-Path $DestDir $RelativePath) -Force
        }
    }
    
    Write-Host ""
    Write-Host ""
    Write-Host "✓ 文件复制完成" -ForegroundColor Green
    Write-Log "文件安装完成: $Global:InstallPath"
}

function New-DesktopShortcut {
    param([string]$TargetPath)
    
    $ShortcutPath = Join-Path $Global:DesktopPath "$AppName.lnk"
    
    try {
        $WShell = New-Object -ComObject WScript.Shell
        $Shortcut = $WShell.CreateShortcut($ShortcutPath)
        
        $LauncherPath = Join-Path $TargetPath "setup.bat"
        if (Test-Path $LauncherPath) {
            $Shortcut.TargetPath = $LauncherPath
        } else {
            $Shortcut.TargetPath = "cmd.exe"
            $Shortcut.Arguments = "/c cd /d `"$TargetPath\src`" && node app-optimized.js"
        }
        
        $Shortcut.WorkingDirectory = $TargetPath
        $Shortcut.Description = "$AppName v$AppVersion"
        $Shortcut.IconLocation = "$TargetPath\icon.ico, 0"
        $Shortcut.Save()
        
        Write-Host "✓ 桌面快捷方式已创建: $ShortcutPath" -ForegroundColor Green
        Write-Log "桌面快捷方式: $ShortcutPath"
    } catch {
        Write-Host "✗ 桌面快捷方式创建失败: $_" -ForegroundColor Red
    }
}

function New-StartMenuShortcut {
    param([string]$TargetPath)
    
    $StartMenuFolder = Join-Path $Global:StartMenuPath $AppName
    if (-not (Test-Path $StartMenuFolder)) {
        New-Item -ItemType Directory -Path $StartMenuFolder -Force | Out-Null
    }
    
    try {
        $WShell = New-Object -ComObject WScript.Shell
        
        $ShortcutPath = Join-Path $StartMenuFolder "$AppName.lnk"
        $Shortcut = $WShell.CreateShortcut($ShortcutPath)
        
        $LauncherPath = Join-Path $TargetPath "setup.bat"
        if (Test-Path $LauncherPath) {
            $Shortcut.TargetPath = $LauncherPath
        } else {
            $Shortcut.TargetPath = "cmd.exe"
            $Shortcut.Arguments = "/c cd /d `"$TargetPath\src`" && node app-optimized.js"
        }
        
        $Shortcut.WorkingDirectory = $TargetPath
        $Shortcut.Description = "$AppName v$AppVersion"
        $Shortcut.Save()
        
        $UninstallShortcutPath = Join-Path $StartMenuFolder "卸载 $AppName.lnk"
        $UninstallShortcut = $WShell.CreateShortcut($UninstallShortcutPath)
        
        $UninstallBatPath = Join-Path $TargetPath "uninstall.bat"
        if (Test-Path $UninstallBatPath) {
            $UninstallShortcut.TargetPath = $UninstallBatPath
        } else {
            $UninstallShortcut.TargetPath = "cmd.exe"
            $UninstallShortcut.Arguments = "/c `"$TargetPath\uninstall.bat`""
        }
        
        $UninstallShortcut.WorkingDirectory = $TargetPath
        $UninstallShortcut.Description = "卸载 $AppName"
        $UninstallShortcut.Save()
        
        Write-Host "✓ 开始菜单快捷方式已创建" -ForegroundColor Green
        Write-Log "开始菜单快捷方式: $ShortcutPath"
    } catch {
        Write-Host "✗ 开始菜单快捷方式创建失败: $_" -ForegroundColor Red
    }
}

function Register-Uninstaller {
    param([string]$InstallPath)
    
    $UninstallerPath = Join-Path $InstallPath "uninstall.bat"
    $UninstallContent = @"
@echo off
title 卸载 $AppName
echo.
echo ============================================================
echo              正在卸载 $AppName
echo ============================================================
echo.
echo 正在删除安装文件...
rd /s /q "$InstallPath"
echo.
echo 正在删除桌面快捷方式...
del /q "%USERPROFILE%\Desktop\$AppName.lnk" 2>nul
echo.
echo 正在删除开始菜单快捷方式...
rd /s /q "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Health Workspace" 2>nul
echo.
echo ============================================================
echo                    卸载完成!
echo ============================================================
echo.
pause
"@
    Set-Content -Path $UninstallerPath -Value $UninstallContent -Encoding ASCII
    
    Write-Host "✓ 卸载程序已创建: $UninstallerPath" -ForegroundColor Green
    Write-Log "卸载程序: $UninstallerPath"
}

function Create-Launcher {
    param([string]$TargetPath)
    
    $LauncherPath = Join-Path $TargetPath "setup.bat"
    $LauncherContent = "@echo off
title $AppName
cd /d `"%~dp0src`"
if exist `"node.exe`" (
    node app-optimized.js
) else (
    echo Node.js 未找到，请安装 Node.js 18 或更高版本
    pause
)
"
    Set-Content -Path $LauncherPath -Value $LauncherContent -Encoding ASCII
    
    Write-Host "✓ 启动脚本已创建: $LauncherPath" -ForegroundColor Green
    Write-Log "启动脚本: $LauncherPath"
}

function Show-Complete {
    Show-Header "安装完成"
    
    Write-Host ""
    Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                    安装成功!                              ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "已创建:" -ForegroundColor Yellow
    Write-Host "  ✓ 桌面快捷方式" -ForegroundColor Green
    Write-Host "  ✓ 开始菜单快捷方式" -ForegroundColor Green
    Write-Host "  ✓ 卸载程序" -ForegroundColor Green
    Write-Host ""
    Write-Host "下一步:" -ForegroundColor Yellow
    Write-Host "  请运行桌面上的快捷方式来启动程序" -ForegroundColor White
    Write-Host ""
    Write-Log "安装完成"
    
    Write-Host ""
    Write-Host "[1] 打开安装文件夹" -ForegroundColor Cyan
    Write-Host "[2] 运行快捷方式" -ForegroundColor Cyan
    Write-Host "[3] 退出" -ForegroundColor Cyan
    Write-Host ""
    
    $Action = Read-Host "请选择 (1/2/3)"
    
    switch ($Action) {
        "1" { explorer.exe $Global:InstallPath }
        "2" { 
            $Shortcut = Join-Path $Global:DesktopPath "$AppName.lnk"
            if (Test-Path $Shortcut) {
                & $Shortcut
            }
        }
    }
}

function Start-Installation {
    Write-Host ""
    Write-Host "正在启动安装程序..." -ForegroundColor Green
    Write-Log "安装程序启动"
    
    Show-Welcome
    Show-EULA
    Show-InstallPath
    Show-InstallProgress
    
    New-DesktopShortcut -TargetPath $Global:InstallPath
    New-StartMenuShortcut -TargetPath $Global:InstallPath
    Register-Uninstaller -InstallPath $Global:InstallPath
    Create-Launcher -TargetPath $Global:InstallPath
    
    Show-Complete
}

Start-Installation