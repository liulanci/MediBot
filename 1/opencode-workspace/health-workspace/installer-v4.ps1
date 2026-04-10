# Health Workspace 完整安装程序 v4.0.2
try {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
} catch {
    try {
        [Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding(65001)
    } catch {
        [Console]::OutputEncoding = [System.Text.Encoding]::ASCII
    }
}

$Global:AppName = "Health Workspace"
$Global:AppVersion = "4.0.2"
$Global:InstallPath = Join-Path $env:LOCALAPPDATA "Health Workspace"
$Global:DesktopPath = [Environment]::GetFolderPath("Desktop")
$Global:StartMenuPath = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"

try {
    $LogDir = Join-Path $env:TEMP "HealthWorkspace"
    if (-not (Test-Path $LogDir)) {
        New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
    }
    $Global:LogFile = Join-Path $LogDir "Install_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
} catch {
    $Global:LogFile = "$env:TEMP\HealthWorkspace_Install.log"
}

$Global:ScriptRoot = $PSScriptRoot
if (-not $Global:ScriptRoot) {
    $Global:ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
}

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    try {
        $Timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
        $LogEntry = "[$Timestamp] [$Level] $Message"
        if ($Global:LogFile) {
            $LogEntry | Out-File -FilePath $Global:LogFile -Append -Encoding UTF8 -ErrorAction SilentlyContinue
        }
        Write-Host $Message
    } catch {
        Write-Host $Message
    }
}

function Test-NodeEnvironment {
    $nodeCheck = Get-Command node -ErrorAction SilentlyContinue
    if ($nodeCheck) {
        try {
            $nodeVersion = & node --version 2>$null
            $versionNum = [version]($nodeVersion -replace '^v', '')
            if ($versionNum -ge [version]"18.0.0") {
                return @{ Available = $true; Version = $nodeVersion; Type = "Node.js" }
            } else {
                return @{ Available = $true; Version = $nodeVersion; Type = "Node.js (Old)" }
            }
        } catch {
            return @{ Available = $true; Version = "Unknown"; Type = "Node.js" }
        }
    }
    
    $psCheck = Get-Command powershell -ErrorAction SilentlyContinue
    if ($psCheck) {
        return @{ Available = $true; Version = $PSVersionTable.PSVersion.ToString(); Type = "PowerShell" }
    }
    
    return @{ Available = $false; Version = "N/A"; Type = "None" }
}

function Show-EnvironmentWarning {
    param([hashtable]$EnvInfo)
    
    if (-not $EnvInfo.Available) {
        Write-Host ""
        Write-Host "=============================================================" -ForegroundColor Yellow
        Write-Host "                     警告" -ForegroundColor Yellow
        Write-Host "=============================================================" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "未检测到 JavaScript 运行环境 (Node.js)" -ForegroundColor Red
        Write-Host ""
        Write-Host "当前系统环境信息:" -ForegroundColor Yellow
        Write-Host "  - PowerShell: $($PSVersionTable.PSVersion)"
        Write-Host "  - .NET版本: $($PSVersionTable.CLRVersion)"
        Write-Host ""
        Write-Host "安装后将提供以下选项:" -ForegroundColor Cyan
        Write-Host "  1. 使用内置演示模式" -ForegroundColor Green
        Write-Host "  2. 安装后提示用户安装 Node.js" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "=============================================================" -ForegroundColor Yellow
        Write-Host ""
        
        $Continue = Read-Host "是否继续安装? (Y/N)"
        if ($Continue.ToUpper() -ne "Y") {
            Write-Host "安装已取消。" -ForegroundColor Yellow
            exit 0
        }
    } else {
        Write-Host ""
        Write-Host "[OK] 检测到运行环境: $($EnvInfo.Type) $($EnvInfo.Version)" -ForegroundColor Green
        Write-Host ""
    }
}

function Show-Header {
    param([string]$Title)
    try { Clear-Host } catch {}
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host "    $Title" -ForegroundColor Cyan
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Show-ScrollableText {
    param(
        [string]$Title,
        [string]$Content,
        [int]$Lines = 20
    )
    
    Show-Header $Title
    
    $contentLines = $Content -split "`n"
    $totalLines = $contentLines.Count
    $displayLines = [Math]::Min($totalLines, $Lines)
    
    for ($i = 0; $i -lt $displayLines; $i++) {
        Write-Host $contentLines[$i]
    }
    
    if ($totalLines -gt $displayLines) {
        Write-Host ""
        Write-Host "... (还有 $($totalLines - $displayLines) 行，按 Enter 继续) ..." -ForegroundColor Yellow
        $null = Read-Host
    }
}

function Show-EULA {
    Show-Header "许可协议"
    
    $EulaPath = Join-Path $Global:ScriptRoot "EULA.txt"
    $EulaContent = ""
    
    if (Test-Path $EulaPath) {
        try {
            $EulaContent = Get-Content $EulaPath -Raw -ErrorAction SilentlyContinue
        } catch {
            $EulaContent = ""
        }
    }
    
    if (-not $EulaContent) {
        $EulaContent = @"

                        最终用户许可协议

版权所有 (c) 2024 OpenCode Team

本软件仅供个人学习和评估使用。

【许可证授予】
本软件按"原样"提供，仅供个人非商业用途。

【免责声明】
作者不对使用本软件导致的任何直接或间接损失负责。
不提供任何明示或暗示的保证。

【禁止行为】
禁止对本软件进行反向工程、反编译或修改。
禁止分发、出售或转让本软件。

【隐私说明】
本软件不会收集、存储或传输任何个人信息。
所有数据处理均在本地完成。

【终止条款】
如果您违反本协议的条款，本许可证将自动终止。

【争议解决】
本协议受中华人民共和国法律管辖。

"@
    }
    
    $EulaLines = $EulaContent -split "`n"
    $displayLines = 25
    for ($i = 0; $i -lt [Math]::Min($EulaLines.Count, $displayLines); $i++) {
        Write-Host $EulaLines[$i]
    }
    
    if ($EulaLines.Count -gt $displayLines) {
        Write-Host ""
        Write-Host "... (协议正文共 $($EulaLines.Count) 行) ..." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "请仔细阅读以上许可协议。" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "    [Y] 同意并继续安装" -ForegroundColor Green
    Write-Host "    [N] 不同意并退出" -ForegroundColor Red
    Write-Host "    [V] 查看完整协议" -ForegroundColor Cyan
    Write-Host ""
    
    do {
        $Response = Read-Host "请选择 (Y/N/V)"
        $Response = $Response.ToUpper()
        
        switch ($Response) {
            "V" {
                Show-ScrollableText -Title "完整许可协议" -Content $EulaContent -Lines 30
                Show-Header "许可协议"
            }
            "N" {
                Write-Host ""
                Write-Host "安装已取消。" -ForegroundColor Yellow
                Write-Log "用户拒绝许可协议" -Level "WARN"
                exit 0
            }
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
    Write-Host "    [1] 使用默认位置安装" -ForegroundColor Green
    Write-Host "    [2] 自定义安装位置" -ForegroundColor Green
    Write-Host "    [3] 浏览文件夹..." -ForegroundColor Green
    Write-Host "    [C] 取消安装" -ForegroundColor Red
    Write-Host ""
    
    $Choice = Read-Host "请选择 (1/2/3/C)"
    
    switch ($Choice) {
        "1" {
            try {
                if (-not (Test-Path (Split-Path $Global:InstallPath -Parent))) {
                    New-Item -ItemType Directory -Path (Split-Path $Global:InstallPath -Parent) -Force -ErrorAction Stop | Out-Null
                }
                if (-not (Test-Path $Global:InstallPath)) {
                    New-Item -ItemType Directory -Path $Global:InstallPath -Force -ErrorAction Stop | Out-Null
                }
            } catch {
                Write-Host "警告: 无法创建默认目录，将使用备选位置" -ForegroundColor Yellow
                $Global:InstallPath = Join-Path $env:USERPROFILE "Health Workspace"
                try {
                    New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
                } catch {}
            }
        }
        "2" {
            Write-Host ""
            $InputPath = Read-Host "请输入安装路径"
            if ($InputPath) {
                $Global:InstallPath = $InputPath
            }
        }
        "3" {
            try {
                Add-Type -AssemblyName System.Windows.Forms
                $FolderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog
                $FolderBrowser.Description = "选择安装位置"
                $FolderBrowser.SelectedPath = $Global:InstallPath
                if ($FolderBrowser.ShowDialog() -eq "OK") {
                    $Global:InstallPath = $FolderBrowser.SelectedPath
                }
            } catch {
                Write-Host "无法打开文件夹选择器，请手动输入路径" -ForegroundColor Yellow
                $Global:InstallPath = Read-Host "请输入安装路径"
            }
        }
        "C" {
            Write-Host ""
            Write-Host "安装已取消。" -ForegroundColor Yellow
            exit 0
        }
        default {
            try {
                if (-not (Test-Path $Global:InstallPath)) {
                    New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
                }
            } catch {
                $Global:InstallPath = Join-Path $env:USERPROFILE "Health Workspace"
                New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
            }
        }
    }
    
    Write-Host ""
    Write-Host "安装位置: $Global:InstallPath" -ForegroundColor Cyan
    Write-Log "安装路径: $Global:InstallPath"
    Write-Host ""
}

function Show-ProgressBar {
    param(
        [string]$Activity,
        [int]$Percent,
        [string]$Status = ""
    )
    
    $width = 50
    $filled = [Math]::Floor(($Percent / 100) * $width)
    $empty = $width - $filled
    $bar = "[" + ("=" * $filled) + (" " * $empty) + "]"
    
    Write-Host "`r$Activity $bar $Percent% $Status" -NoNewline
}

function Show-InstallProgress {
    Show-Header "正在安装"
    
    Write-Host "正在准备安装环境..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        if (-not (Test-Path $Global:InstallPath)) {
            New-Item -ItemType Directory -Path $Global:InstallPath -Force | Out-Null
        }
    } catch {
        Write-Host "错误: 无法创建安装目录 - $_" -ForegroundColor Red
        exit 1
    }
    
    $SourceFiles = Get-ChildItem -Path $Global:ScriptRoot -File -ErrorAction SilentlyContinue
    $SubDirs = Get-ChildItem -Path $Global:ScriptRoot -Directory -ErrorAction SilentlyContinue
    
    $totalItems = $SourceFiles.Count
    foreach ($dir in $SubDirs) {
        $dirFiles = Get-ChildItem -Path $dir.FullName -File -Recurse -ErrorAction SilentlyContinue
        $totalItems += $dirFiles.Count
    }
    
    if ($totalItems -eq 0) {
        $totalItems = 1
    }
    
    $currentItem = 0
    
    Show-ProgressBar -Activity "复制文件" -Percent 0
    
    foreach ($File in $SourceFiles) {
        try {
            Copy-Item -Path $File.FullName -Destination $Global:InstallPath -Force -ErrorAction Stop
            $currentItem++
            $percent = [Math]::Floor(($currentItem / $totalItems) * 100)
            Show-ProgressBar -Activity "复制文件" -Percent $percent -Status $File.Name
        } catch {
            Write-Host "警告: 无法复制 $($File.Name)" -ForegroundColor Yellow
        }
    }
    
    foreach ($Dir in $SubDirs) {
        $DestDir = Join-Path $Global:InstallPath $Dir.Name
        try {
            if (-not (Test-Path $DestDir)) {
                New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
            }
            
            $DirFiles = Get-ChildItem -Path $Dir.FullName -File -Recurse -ErrorAction SilentlyContinue
            foreach ($File in $DirFiles) {
                try {
                    $RelativePath = $File.FullName.Substring($Dir.FullName.Length)
                    $TargetPath = Join-Path $DestDir (Split-Path $RelativePath -Parent)
                    if (-not (Test-Path $TargetPath)) {
                        New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
                    }
                    Copy-Item -Path $File.FullName -Destination (Join-Path $DestDir $RelativePath) -Force -ErrorAction Stop
                    $currentItem++
                    $percent = [Math]::Floor(($currentItem / $totalItems) * 100)
                    Show-ProgressBar -Activity "复制文件" -Percent $percent
                } catch {}
            }
        } catch {}
    }
    
    Write-Host ""
    Write-Host ""
    Write-Host "✓ 文件复制完成 (已完成 $currentItem 项)" -ForegroundColor Green
    Write-Log "文件安装完成: $Global:InstallPath"
}

function New-DesktopShortcut {
    param([string]$TargetPath)
    
    $ShortcutPath = Join-Path $Global:DesktopPath "$AppName.lnk"
    
    try {
        $WShell = New-Object -ComObject WScript.Shell -ErrorAction Stop
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
        
        Write-Host "✓ 桌面快捷方式" -ForegroundColor Green
        Write-Log "桌面快捷方式: $ShortcutPath"
    } catch {
        Write-Host "✗ 桌面快捷方式创建失败" -ForegroundColor Yellow
    }
}

function New-StartMenuShortcut {
    param([string]$TargetPath)
    
    $StartMenuFolder = Join-Path $Global:StartMenuPath $AppName
    try {
        if (-not (Test-Path $StartMenuFolder)) {
            New-Item -ItemType Directory -Path $StartMenuFolder -Force | Out-Null
        }
        
        $WShell = New-Object -ComObject WScript.Shell
        
        $ShortcutPath = Join-Path $StartMenuFolder "$AppName.lnk"
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
        
        Write-Host "✓ 开始菜单快捷方式" -ForegroundColor Green
        Write-Log "开始菜单快捷方式: $ShortcutPath"
    } catch {
        Write-Host "✗ 开始菜单快捷方式创建失败" -ForegroundColor Yellow
    }
}

function Register-Uninstaller {
    param([string]$InstallPath)
    
    $UninstallerPath = Join-Path $InstallPath "uninstall.bat"
    $UninstallContent = "@echo off
title 卸载 $AppName
echo.
echo ============================================================
echo              正在卸载 $AppName
echo ============================================================
echo.
echo 正在删除安装文件...
rd /s /q `"$InstallPath`" 2>nul
echo.
echo 正在删除桌面快捷方式...
del /q `"%USERPROFILE%\Desktop\$AppName.lnk`" 2>nul
echo.
echo 正在删除开始菜单...
rd /s /q `"%APPDATA%\Microsoft\Windows\Start Menu\Programs\Health Workspace`" 2>nul
echo.
echo ============================================================
echo                    卸载完成!
echo ============================================================
pause
"
    try {
        Set-Content -Path $UninstallerPath -Value $UninstallContent -Encoding ASCII -ErrorAction Stop
        Write-Host "✓ 卸载程序" -ForegroundColor Green
        Write-Log "卸载程序: $UninstallerPath"
    } catch {
        Write-Host "✗ 卸载程序创建失败" -ForegroundColor Yellow
    }
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
    echo ============================================================
    echo   错误: 未找到 Node.js 运行环境
    echo ============================================================
    echo.
    echo 请安装 Node.js 18 或更高版本
    echo 下载地址: https://nodejs.org
    echo.
    pause
)
"
    try {
        Set-Content -Path $LauncherPath -Value $LauncherContent -Encoding ASCII -ErrorAction Stop
        Write-Host "✓ 启动脚本" -ForegroundColor Green
    } catch {
        Write-Host "✗ 启动脚本创建失败" -ForegroundColor Yellow
    }
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
    Write-Host "  ✓ 桌面快捷方式"
    Write-Host "  ✓ 开始菜单快捷方式"
    Write-Host "  ✓ 卸载程序"
    Write-Host ""
    Write-Host "下一步: 请运行桌面快捷方式启动程序" -ForegroundColor White
    Write-Host ""
    Write-Log "安装完成"
    
    Write-Host ""
    Write-Host "    [1] 打开安装文件夹" -ForegroundColor Cyan
    Write-Host "    [2] 立即运行程序" -ForegroundColor Cyan
    Write-Host "    [3] 退出" -ForegroundColor Cyan
    Write-Host ""
    
    $Action = Read-Host "请选择 (1/2/3)"
    
    switch ($Action) {
        "1" { 
            try { explorer.exe $Global:InstallPath } catch {}
        }
        "2" { 
            $Shortcut = Join-Path $Global:DesktopPath "$AppName.lnk"
            if (Test-Path $Shortcut) {
                try { & $Shortcut } catch {}
            }
        }
    }
}

function Start-Installation {
    Write-Host ""
    Write-Host "正在启动 $AppName 安装程序..." -ForegroundColor Green
    Write-Log "安装程序启动" -Level "INFO"
    
    $EnvInfo = Test-NodeEnvironment
    Show-EnvironmentWarning -EnvInfo $EnvInfo
    
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