@echo off
echo ==========================================
echo Health Workspace 安装程序
echo ==========================================
echo.
echo 正在解压安装包...
echo.

:: 创建临时目录
set TEMP_DIR=%TEMP%\HealthWorkspace_Setup_%RANDOM%
mkdir "%TEMP_DIR%"

:: 复制安装脚本
copy /Y "%~dp0installer.js" "%TEMP_DIR%\"
copy /Y /S "%~dp0src" "%TEMP_DIR%\"
copy /Y /S "%~dp0EULA.txt" "%TEMP_DIR%\"

:: 运行安装程序
cd /d "%TEMP_DIR%"
node installer.js
set INSTALLER_EXIT_CODE=%ERRORLEVEL%

:: 清理临时文件
cd /d "%TEMP_DIR%"
for /d %%i in (*) do rmdir /s /q "%%i"
del /f /q installer.js
rmdir /s /q "%TEMP_DIR%"

:: 返回安装结果
exit /B %INSTALLER_EXIT_CODE%
