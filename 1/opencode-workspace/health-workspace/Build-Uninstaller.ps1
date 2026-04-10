# Health Workspace 卸载程序 - PowerShell版本

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$AppName = "Health Workspace"
$AppPath = Split-Path (Get-Item $MyInvocation.PSCommandPath).DirectoryName
$LogFile = Join-Path $PSScriptRoot "uninstall.log"

function Write-Log {
    param([string]$Message)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp $Message" | Out-File -FilePath $LogFile -Append -Encoding UTF8
    Write-Host $Message
}

function Show-Uninstall {
    Clear-Host
    Write-Host "=" * 60
    Write-Host "  $AppName 卸载向导"
    Write-Host "=" * 60
    Write-Host ""
    
    # 加载安装信息
    $InfoPath = Join-Path $AppPath "install.info"
    if (Test-Path $InfoPath) {
        $Info = Get-Content $InfoPath | ConvertFrom-Json
        Write-Host "应用程序: $($Info.AppName)"
        Write-Host "版本: $($Info.Version)"
        Write-Host "安装位置: $($Info.InstallPath)"
        Write-Host ""
    }
    else {
        Write-Host "未找到安装信息。" -ForegroundColor Yellow
        Write-Host ""
    }
}

function Remove-Shortcuts {
    # 删除桌面快捷方式
    $DesktopShortcut = Join-Path ([Environment]::GetFolderPath("Desktop")) "$AppName.lnk"
    if (Test-Path $DesktopShortcut) {
        Remove-Item $DesktopShortcut -Force
        Write-Host "[OK] 删除桌面快捷方式" -ForegroundColor Green
        Write-Log "删除桌面快捷方式: $DesktopShortcut"
    }
    
    # 删除开始菜单快捷方式
    $StartMenuShortcut = Join-Path ([Environment]::GetFolderPath("StartMenu") "$AppName.lnk"
    if (Test-Path $StartMenuShortcut) {
        Remove-Item $StartMenuShortcut -Force
        Write-Host "[OK] 删除开始菜单快捷方式" -ForegroundColor Green
        Write-Log "删除开始菜单快捷方式: $StartMenuShortcut"
    }
    
    # 删除开始菜单文件夹
    $StartMenuFolder = Join-Path ([Environment]::GetFolderPath("StartMenu") $AppName
    if (Test-Path $StartMenuFolder) {
        Remove-Item $StartMenuFolder -Recurse -Force
        Write-Host "[OK] 删除开始菜单文件夹" -ForegroundColor Green
        Write-Log "删除开始菜单文件夹: $StartMenuFolder"
    }
}

function Remove-Files {
    param([string]$TargetPath)
    
    Write-Host ""
    Write-Host "正在删除文件..." -ForegroundColor Cyan
    
    if (Test-Path $TargetPath) {
        try {
            Remove-Item -Path $TargetPath -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "[OK] 删除应用程序文件" -ForegroundColor Green
            Write-Log "删除应用程序目录: $TargetPath"
        }
        catch {
            Write-Host "[警告] 部分文件可能未删除" -ForegroundColor Yellow
            Write-Log "删除失败: $_"
        }
    }
}

function Remove-UserData {
    $AppDataPath = Join-Path $env:APPDATA ($AppName -replace "\s", "")
    if (Test-Path $AppDataPath) {
        Write-Host ""
        Write-Host "用户数据目录存在: $AppDataPath"
        $Response = Read-Host "是否删除用户数据? (是/否)"
        
        if ($Response -eq "是" -or $Response -eq "Y" -or $Response -eq "y") {
            Write-Host ""
            Write-Host "正在删除用户数据..." -ForegroundColor Cyan
            Remove-Item -Path $AppDataPath -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "[OK] 用户数据已删除" -ForegroundColor Green
            Write-Log "删除用户数据: $AppDataPath"
        }
        else {
            Write-Host "[跳过] 用户数据保留" -ForegroundColor Gray
        }
    }
}

# 主程序
try {
    Show-Uninstall
    
    Write-Host ""
    $Confirm = Read-Host "确认卸载? (是/否)"
    
    if ($Confirm -eq "是" -or $Confirm -eq "Y" -or $Confirm -eq "y") {
        Write-Host ""
        Write-Host "正在卸载..." -ForegroundColor Cyan
        
        # 获取安装路径
        $InfoPath = Join-Path $AppPath "install.info"
        if (Test-Path $InfoPath) {
            $Info = Get-Content $InfoPath | ConvertFrom-Json
            $InstallPath = $Info.InstallPath
        }
        else {
            $InstallPath = $AppPath
        }
        
        # 删除快捷方式
        Remove-Shortcuts
        
        # 删除文件
        Remove-Files -TargetPath $InstallPath
        
        # 询问是否删除用户数据
        Remove-UserData
        
        Write-Host ""
        Write-Host "卸载完成!" -ForegroundColor Green
        Write-Host ""
        Write-Log "卸载成功完成"
    }
    else {
        Write-Host ""
        Write-Host "卸载已取消。" -ForegroundColor Yellow
        Write-Log "用户取消卸载"
    }
}
catch {
    Write-Host ""
    Write-Host "卸载失败: $_" -ForegroundColor Red
    Write-Log "卸载失败: $_"
}

Write-Host ""
Read-Host "按 Enter 键退出..."
