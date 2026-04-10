@echo off
chcp 65001 >nul
echo ==========================================
echo   Health Workspace 编译工具
echo ==========================================
echo.

echo 检查 PowerShell 版本...
powershell -Command "$PSVersionTable.PSVersion.Major"

echo.
echo 可以使用以下命令编译为EXE:
echo.
echo 1. 使用 ps2exe (推荐):
echo    Install-Module ps2exe -Force
echo    ps2exe .\Build-Installer.ps1 HealthWorkspace-Setup.exe
echo    ps2exe .\Build-Uninstaller.ps1 HealthWorkspace-Uninstall.exe
echo.
echo 2. 使用 PowerShell 打包:
echo    右键点击 Build-Installer.ps1 选择"使用 PowerShell 运行"
echo.
echo 3. 手动编译:
echo    powershell.exe -ExecutionPolicy Bypass -File .\Build-Installer.ps1
echo.

echo.
set /p choice=是否现在编译安装程序? (Y/N):
if /i "%choice%"=="Y" (
    powershell -ExecutionPolicy Bypass -File ".\Build-Installer.ps1"
) else (
    echo 编译已取消。
)

pause
