# Health Workspace 完整安装程序 v4.0.0
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Global:AppName = "Health Workspace"
$Global:AppVersion = "4.0.0"
$Global:InstallPath = Join-Path $env:LOCALAPPDATA $AppName
$Global:DesktopPath = [Environment]::GetFolderPath("Desktop")
$Global:StartMenuPath = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$Global:LogFile = Join-Path $env:TEMP "HealthWorkspace_Install_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
$Global:ScriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }

function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $LogEntry = "[$Timestamp] $Message"
    $LogEntry | Out-File -FilePath $Global:LogFile -Append -Encoding UTF8
    Write-Host $Message
}

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
        Write-Host "EULA文件未找到，使用内嵌版本" -ForegroundColor Yellow
        Write-Host "默认许可协议内容..."
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
    
    if (-not (Test-Path (Split-Path $Global:InstallPath)) {
        Write-Host "父目录不存在，将创建" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Log "安装路径: $InstallPath"
}

function Install-Files {
    param([string]$TargetPath)
    
    Write-Host ""
    Write-Host "正在安装文件..." -ForegroundColor Cyan
    
    if (-not (Test-Path $TargetPath)) {
        New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
    }
    
    Copy-Item -Path "$Global:ScriptRoot\*" -Destination $TargetPath -Recurse -Force
    Write-Host "✓ 文件复制完成" -ForegroundColor Green
    Write-Log "文件安装完成: $TargetPath"
}

function New-DesktopShortcut {
    param([string]$TargetPath)
    
    $ShortcutPath = Join-Path $Global:DesktopPath "$AppName.lnk"
    $WShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = "powershell.exe"
    $Shortcut.Arguments = "-NoExit -Command `"$TargetPath\src\app-optimized.js`""
    $Shortcut.WorkingDirectory = $TargetPath
    $Shortcut.Description = "$AppName v$AppVersion"
    $Shortcut.Save()
    Write-Host "✓ 桌面快捷方式已创建" -ForegroundColor Green
    Write-Log "桌面快捷方式: $ShortcutPath"
}

function New-StartMenuShortcut {
    param([string]$TargetPath)
    
    $StartFolder = Join-Path $Global:StartMenuPath $AppName
    if (-not (Test-Path $StartFolder)) {
        New-Item -ItemType Directory -Path $StartFolder -Force | Out-Null
    }
    
    $ShortcutPath = Join-Path $StartFolder "$AppName.lnk"
    $WShell = New-Object -ComObject WShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = "powershell.exe"
    $Shortcut.Arguments = "-NoExit -Command `"$TargetPath\src\app-optimized.js`""
    $Shortcut.WorkingDirectory = $TargetPath
    $Shortcut.Description = "$AppName v$AppVersion"
    $Shortcut.Save()
    
    $UninstallShortcut = Join-Path $StartFolder "卸载 $AppName.lnk"
    $UninstallShortcut = $WShell.CreateShortcut($UninstallShortcut)
    $UninstallShortcut.TargetPath = "powershell.exe"
    $UninstallShortcut.Arguments = "-NoExit -Command `"$TargetPath\uninstall.ps1`""
    $UninstallShortcut.WorkingDirectory = $TargetPath
    $UninstallShortcut.Description = "卸载 $AppName"
    $UninstallShortcut.Save()
    
    Write-Host "✓ 开始菜单快捷方式已创建" -ForegroundColor Green
    Write-Log "开始菜单快捷方式: $StartFolder"
}

function Register-Uninstaller {
    param([string]$TargetPath)
    
    $UninstallScript = @"
# Health Workspace 卸载程序
`$ErrorActionPreference = 'SilentlyContinue'
`$TargetPath = '$TargetPath'
`$AppName = '$AppName'
`$ShortcutPath = Join-Path `$env:USERPROFILE 'Desktop' "`$AppName.lnk"
if (Test-Path `$ShortcutPath) { Remove-Item `$ShortcutPath -Force }
`$StartFolder = Join-Path `$env:APPDATA 'Microsoft\Windows\Start Menu\Programs' "`$AppName"
if (Test-Path `$StartFolder) { Remove-Item `$StartFolder -Recurse -Force }
if (Test-Path `$TargetPath) { Remove-Item `$TargetPath -Recurse -Force }
Write-Host '卸载完成'
"@
    
    $UninstallScript | Out-File -FilePath (Join-Path $TargetPath "uninstall.ps1") -Encoding UTF8
    Write-Log "卸载脚本已注册"
}

function Install-Application {
    Clear-Host
    Write-Host ""
    Write-Host "正在安装 $AppName..." -ForegroundColor Cyan
    
    try {
        Install-Files -TargetPath $Global:InstallPath
        New-DesktopShortcut -TargetPath $Global:InstallPath
        New-StartMenuShortcut -TargetPath $Global:InstallPath
        Register-Uninstaller -TargetPath $Global:InstallPath
        
        $Info = @{
            AppName = $AppName
            Version = $AppVersion
            InstallPath = $Global:InstallPath
            InstallDate = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
        } | ConvertTo-Json -Compress
        
        $Info | Out-File (Join-Path $Global:InstallPath "install.info") -Encoding UTF8
        
        Write-Host ""
        Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
        Write-Host "  安装完成！" -ForegroundColor Green
        Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "  安装位置: $Global:InstallPath" -ForegroundColor Cyan
        Write-Host "  桌面快捷方式: 已创建" -ForegroundColor Green
        Write-Host "  开始菜单: 已创建" -ForegroundColor Green
        Write-Host ""
        Write-Host "感谢使用 $AppName" -ForegroundColor Green
        
        $Shortcut = Join-Path $Global:DesktopPath "$AppName.lnk"
        Write-Host ""
        $Run = Read-Host "立即运行? (是/否)"
        if ($Run -eq "是") {
            Start-Process (Join-Path $Global:InstallPath "src\app-optimized.js")
        }
        
        Write-Log "安装完成: $InstallPath"
    }
    catch {
        Write-Host ""
        Write-Host "安装失败: $_" -ForegroundColor Red
        Write-Log "安装失败: $_"
    }
}

Write-Log "=" * 50
Write-Log "安装程序启动"
Write-Log "=" * 50

try {
    Show-EULA
    Get-InstallPath
    Install-Application
    
    Write-Host ""
    Write-Host "按 Enter 键退出..." -ForegroundColor Gray
    Read-Host
}
catch {
    Write-Host "安装程序错误: $_" -ForegroundColor Red
    Write-Log "错误: $_"
    Read-Host "按 Enter 键退出..."
}
