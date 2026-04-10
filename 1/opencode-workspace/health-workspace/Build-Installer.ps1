# Health Workspace 安装程序 - PowerShell版本
# 此脚本可编译为EXE使用: ps2exe .\Build-Installer.ps1 HealthWorkspace-Setup.exe

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$AppName = "Health Workspace"
$AppVersion = "4.0.0"
$InstallPath = Join-Path $env:APPDATA $AppName
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$StartMenuPath = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$LogFile = Join-Path $PSScriptRoot "install.log"

function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp $Message" | Out-File -FilePath $LogFile -Append -Encoding UTF8
    Write-Host $Message
}

function Show-EULA {
    Clear-Host
    Write-Host "=" * 60
    Write-Host "  $AppName 安装向导 v$AppVersion"
    Write-Host "=" * 60
    Write-Host ""
    
    $EulaPath = Join-Path $PSScriptRoot "EULA.txt"
    if (Test-Path $EulaPath) {
        Get-Content $EulaPath | Select-Object -First 40
        Write-Host "..."
        Write-Host ""
        Write-Host "-" * 60
    }
    
    $Response = Read-Host "是否接受许可协议? (是/否)"
    if ($Response -ne "是" -and $Response -ne "Y" -and $Response -ne "y") {
        Write-Host ""
        Write-Host "安装已取消。" -ForegroundColor Yellow
        exit 0
    }
}

function Select-InstallPath {
    Clear-Host
    Write-Host "选择安装位置" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "默认路径: $InstallPath" -ForegroundColor Gray
    Write-Host ""
    
    $Response = Read-Host "使用默认路径? (是/否)"
    if ($Response -eq "是" -or $Response -eq "Y" -or $Response -eq "y" -or $Response -eq "") {
        return $InstallPath
    }
    
    Write-Host ""
    $CustomPath = Read-Host "请输入自定义路径"
    if ($CustomPath -and (Test-Path (Split-Path $CustomPath -Parent)) {
        return $CustomPath
    }
    return $InstallPath
}

function New-Shortcuts {
    param([string]$TargetPath)
    
    # 创建桌面快捷方式
    $DesktopShortcut = Join-Path $DesktopPath "$AppName.lnk"
    $WScriptShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WShell.CreateShortcut($DesktopShortcut)
    $Shortcut.TargetPath = "node.exe"
    $Shortcut.Arguments = """$TargetPath\src\app.js"""
    $Shortcut.WorkingDirectory = $TargetPath
    $Shortcut.Description = "$AppName v$AppVersion"
    $Shortcut.Save()
    
    # 创建开始菜单快捷方式
    $StartMenuFolder = Join-Path $StartMenuPath $AppName
    if (-not (Test-Path $StartMenuFolder)) {
        New-Item -ItemType Directory -Path $StartMenuFolder -Force | Out-Null
    }
    
    $StartMenuShortcut = Join-Path $StartMenuFolder "$AppName.lnk"
    $Shortcut = $WScriptShell.CreateShortcut($StartMenuShortcut)
    $Shortcut.TargetPath = "node.exe"
    $Shortcut.Arguments = """$TargetPath\src\app.js"""
    $Shortcut.WorkingDirectory = $TargetPath
    $Shortcut.Description = "$AppName v$AppVersion"
    $Shortcut.Save()
    
    Write-Log "创建桌面快捷方式: $DesktopShortcut"
    Write-Log "创建开始菜单快捷方式: $StartMenuShortcut"
}

function Install-Application {
    param([string]$TargetPath)
    
    Write-Host ""
    Write-Host "正在安装..." -ForegroundColor Cyan
    
    # 复制文件
    Copy-Item -Path "$PSScriptRoot\*" -Destination $TargetPath -Recurse -Force
    Write-Log "复制文件到: $TargetPath"
    
    # 创建快捷方式
    New-Shortcuts -TargetPath $TargetPath
    
    # 创建卸载信息
    $InstallInfo = @{
        AppName = $AppName
        Version = $AppVersion
        InstallPath = $TargetPath
        InstallDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    } | ConvertTo-Json
    
    $InstallInfo | Out-File -FilePath (Join-Path $TargetPath "install.info") -Encoding UTF8
    
    # 创建卸载批处理
    $UninstallBatch = @"
@echo off
cd /d "$TargetPath"
del /q "$TargetPath\install.info"
for /d %%i in ("$TargetPath\*") do rmdir /s /q "%%i"
del /q "$TargetPath\*.js"
del /q "$TargetPath\*.json"
del /q "%~f0"
"@
    
    $UninstallBatch | Out-File -FilePath (Join-Path $TargetPath "卸载.bat") -Encoding ASCII
    
    Write-Host ""
    Write-Host "安装完成!" -ForegroundColor Green
}

# 主程序
try {
    Show-EULA
    $TargetPath = Select-InstallPath
    
    Write-Host ""
    Write-Host "安装位置: $TargetPath" -ForegroundColor Cyan
    
    # 确认安装
    $Confirm = Read-Host "确认安装? (是/否)"
    if ($Confirm -eq "是" -or $Confirm -eq "Y" -or $Confirm -eq "y" -or $Confirm -eq "") {
        Install-Application -TargetPath $TargetPath
        
        Write-Host ""
        Write-Host "快捷方式已创建在桌面。" -ForegroundColor Green
        Write-Host "您可以从开始菜单或桌面启动 $AppName。" -ForegroundColor Green
        Write-Host ""
        Write-Host "感谢安装!" -ForegroundColor Green
        
        Write-Log "安装成功完成"
    }
    else {
        Write-Host ""
        Write-Host "安装已取消。" -ForegroundColor Yellow
        Write-Log "用户取消安装"
    }
}
catch {
    Write-Host ""
    Write-Host "安装失败: $_" -ForegroundColor Red
    Write-Log "安装失败: $_"
    exit 1
}

Write-Host ""
Read-Host "按 Enter 键退出..."
