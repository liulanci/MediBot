# Health Workspace 完整安装程序 v4.0.0
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Global:AppName = "Health Workspace"
$Global:AppVersion = "4.0.0"
$Global:DesktopPath = [Environment]::GetFolderPath("Desktop")
$Global:StartMenuPath = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$Global:LogFile = Join-Path $env:TEMP "HealthWorkspace_Install_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"

function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $LogEntry = "[$Timestamp] $Message"
    $LogEntry | Out-File -FilePath $Global:LogFile -Append -Encoding UTF8
    Write-Host $Message
}

function Get-ScriptDirectory {
    if ($PSScriptRoot) { return $PSScriptRoot }
    $Invocation = (Get-Variable MyInvocation -Scope Script).Value
    return Split-Path $Invocation.MyCommand.Path
}

$Global:ScriptRoot = Get-ScriptDirectory

function Show-EULA {
    Clear-Host
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗"
    Write-Host "║     $AppName 安装向导 v$AppVersion"
    Write-Host "╚══════════════════════════════════════════════════════════════╝"
    Write-Host ""
    
    $EulaPath = Join-Path $Global:ScriptRoot "EULA.txt"
    if (Test-Path $EulaPath) {
        $EulaContent = Get-Content $EulaPath -Raw
        Write-Host $EulaContent
    } else {
        Write-Host "======================================"
        Write-Host "       最终用户许可协议 (EULA)"
        Write-Host "======================================"
        Write-Host ""
        Write-Host "版权所有 (c) 2024 OpenCode Team"
        Write-Host ""
        Write-Host "本软件仅供个人学习和评估使用。"
        Write-Host "使用本软件即表示您同意以下条款："
        Write-Host "1. 软件按\"原样\"提供，无任何明示或暗示保证"
        Write-Host "2. 作者不对使用本软件导致的任何损失负责"
        Write-Host "3. 禁止对本软件进行反向工程或修改"
    }
    
    Write-Host ""
    Write-Host "─" * 65
    Write-Host ""
    
    do {
        $Response = Read-Host "是否接受上述许可协议? (接受/不接受)"
        if ($Response -eq "不接受") {
            Write-Host ""
            Write-Host "您必须接受许可协议才能继续安装。" -ForegroundColor Yellow
            Write-Log "用户拒绝许可协议"
        }
    } while ($Response -ne "接受")
    
    Write-Host ""
    Write-Host "✓ 感谢您接受许可协议" -ForegroundColor Green
    Write-Log "用户接受许可协议"
}

function Get-InstallPath {
    $Global:InstallPath = Join-Path $env:LOCALAPPDATA $AppName
    
    Clear-Host
    Write-Host ""
    Write-Host "选择安装位置"
    Write-Host ""
    Write-Host "默认安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Host ""
    
    do {
        $Choice = Read-Host "使用默认位置安装? (是/否/自定义)"
        
        switch ($Choice) {
            "自定义" {
                $Global:InstallPath = Read-Host "请输入安装路径"
            }
            "是" {
                break
            }
            "否" {
                $Global:InstallPath = Read-Host "请输入安装路径"
            }
        }
    } while ($Choice -eq "")
    
    Write-Host ""
    Write-Host "安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Log "安装路径: $InstallPath"
}

function Install-Files {
    param([string]$SourcePath, [string]$TargetPath)
    
    Write-Host ""
    Write-Host "正在安装文件..." -ForegroundColor Cyan
    
    if (-not (Test-Path $TargetPath)) {
        New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
    }
    
    $Items = Get-ChildItem -Path $SourcePath -File
    foreach ($Item in $Items) {
        Copy-Item -Path $Item.FullName -Destination $TargetPath -Force
    }
    
    $SubDirs = Get-ChildItem -Path $SourcePath -Directory
    foreach ($Dir in $SubDirs) {
        $DestDir = Join-Path $TargetPath $Dir.Name
        if (-not (Test-Path $DestDir)) {
            New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
        }
        Copy-Item -Path "$($Dir.FullName)\*" -Destination $DestDir -Recurse -Force
    }
    
    Write-Host "✓ 文件复制完成" -ForegroundColor Green
    Write-Log "文件安装完成: $TargetPath"
}

function New-DesktopShortcut {
    param([string]$TargetPath)
    
    $ShortcutPath = Join-Path $Global:DesktopPath "$AppName.lnk"
    $WShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = Join-Path $TargetPath "setup.bat"
    $Shortcut.WorkingDirectory = $TargetPath
    $Shortcut.Description = "$AppName v$AppVersion"
    $Shortcut.Save()
    Write-Host "✓ 桌面快捷方式已创建" -ForegroundColor Green
    Write-Log "桌面快捷方式: $ShortcutPath"
}

function New-StartMenuShortcut {
    param([string]$TargetPath)
    
    $StartMenuFolder = Join-Path $Global:StartMenuPath $AppName
    if (-not (Test-Path $StartMenuFolder)) {
        New-Item -ItemType Directory -Path $StartMenuFolder -Force | Out-Null
    }
    
    $ShortcutPath = Join-Path $StartMenuFolder "$AppName.lnk"
    $WShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = Join-Path $TargetPath "setup.bat"
    $Shortcut.WorkingDirectory = $TargetPath
    $Shortcut.Description = "$AppName v$AppVersion"
    $Shortcut.Save()
    
    $UninstallShortcutPath = Join-Path $StartMenuFolder "卸载 $AppName.lnk"
    $UninstallShortcut = $WShell.CreateShortcut($UninstallShortcutPath)
    $UninstallShortcut.TargetPath = Join-Path $TargetPath "uninstall.bat"
    $UninstallShortcut.WorkingDirectory = $TargetPath
    $UninstallShortcut.Description = "卸载 $AppName"
    $UninstallShortcut.Save()
    
    Write-Host "✓ 开始菜单快捷方式已创建" -ForegroundColor Green
    Write-Log "开始菜单快捷方式: $ShortcutPath"
}

function Register-Uninstaller {
    param([string]$InstallPath)
    
    $UninstallerPath = Join-Path $InstallPath "uninstall.bat"
    $UninstallContent = @"
@echo off
echo 正在卸载 $AppName...
rd /s /q "$InstallPath"
del /q "%USERPROFILE%\Desktop\$AppName.lnk"
echo 卸载完成
pause
"@
    Set-Content -Path $UninstallerPath -Value $UninstallContent -Encoding ASCII
    
    Write-Host "✓ 卸载程序已创建" -ForegroundColor Green
    Write-Log "卸载程序: $UninstallerPath"
}

function Create-Launcher {
    param([string]$TargetPath)
    
    $LauncherPath = Join-Path $TargetPath "setup.bat"
    $LauncherContent = @"
@echo off
cd /d "%~dp0src"
node app-optimized.js
pause
"@
    Set-Content -Path $LauncherPath -Value $LauncherContent -Encoding ASCII
    
    Write-Host "✓ 启动脚本已创建" -ForegroundColor Green
}

function Start-Installation {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "  欢迎使用 $AppName 安装程序" -ForegroundColor Cyan
    Write-Host "  版本: $AppVersion" -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host ""
    
    Show-EULA
    Get-InstallPath
    Install-Files -SourcePath $Global:ScriptRoot -TargetPath $Global:InstallPath
    New-DesktopShortcut -TargetPath $Global:InstallPath
    New-StartMenuShortcut -TargetPath $Global:InstallPath
    Register-Uninstaller -InstallPath $Global:InstallPath
    Create-Launcher -TargetPath $Global:InstallPath
    
    Clear-Host
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗"
    Write-Host "║           安装完成!                              ║"
    Write-Host "╚══════════════════════════════════════════════════════════════╝"
    Write-Host ""
    Write-Host "安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Host "桌面快捷方式: 已创建" -ForegroundColor Green
    Write-Host "开始菜单: 已创建" -ForegroundColor Green
    Write-Host "卸载程序: 已创建" -ForegroundColor Green
    Write-Host ""
    Write-Host "请运行桌面上的快捷方式来启动程序" -ForegroundColor Yellow
    Write-Host ""
    Write-Log "安装完成"
    
    $OpenFolder = Read-Host "是否打开安装文件夹? (是/否)"
    if ($OpenFolder -eq "是") {
        explorer.exe $Global:InstallPath
    }
}

Start-Installation