/**
 * ============================================================================
 * Health Workspace 安装程序
 * ============================================================================
 * 
 * 功能：
 * - 用户协议接受
 * - 自动安装到系统位置
 * - 创建桌面快捷方式
 * - 注册卸载功能
 * - 清理和回滚
 * 
 * 作者：Health Workspace Team
 * 版本：1.0.0
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');

/**
 * 安装程序主类
 */
class Installer {
    constructor() {
        this.appName = 'Health Workspace';
        this.appVersion = '4.0.0';
        this.installPath = this.getDefaultInstallPath();
        this.desktopPath = this.getDesktopPath();
        this.startMenuPath = this.getStartMenuPath();
        this.logFile = path.join(__dirname, 'install.log');
    }

    /**
     * 获取默认安装路径
     */
    getDefaultInstallPath() {
        const home = process.env.APPDATA || process.env.HOME || __dirname;
        return path.join(home, this.appName);
    }

    /**
     * 获取桌面路径
     */
    getDesktopPath() {
        const home = process.env.USERPROFILE || process.env.HOME || '';
        return path.join(home, 'Desktop');
    }

    /**
     * 获取开始菜单路径
     */
    getStartMenuPath() {
        const appData = process.env.APPDATA || process.env.HOME || '';
        return path.join(appData, 'Microsoft', 'Windows', 'Start Menu', 'Programs');
    }

    /**
     * 显示欢迎信息和协议
     */
    async showWelcome() {
        this.log('开始安装 ' + this.appName + ' v' + this.appVersion);
        
        console.log('\n' + '='.repeat(60));
        console.log('  Health Workspace 安装向导');
        console.log('  版本 ' + this.appVersion);
        console.log('='.repeat(60) + '\n');

        const eulaPath = path.join(__dirname, 'EULA.txt');
        if (fs.existsSync(eulaPath)) {
            const eula = fs.readFileSync(eulaPath, 'utf-8');
            console.log('📄 用户许可协议\n');
            console.log('-'.repeat(60));
            console.log(eula.substring(0, 1500) + '...\n');
            console.log('-'.repeat(60) + '\n');
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const answer = await new Promise(resolve => {
            rl.question('您是否接受许可协议? (是/否): ', answer => {
                rl.close();
                resolve(answer.trim().toLowerCase());
            });
        });

        if (answer !== '是' && answer !== 'yes' && answer !== 'y') {
            console.log('\n❌ 安装已取消。');
            console.log('如不接受协议，您将无法安装本软件。\n');
            process.exit(0);
        }

        console.log('\n✅ 感谢您接受许可协议。\n');
    }

    /**
     * 选择安装位置
     */
    async selectInstallPath() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('📁 安装位置\n');
        console.log('默认安装位置: ' + this.installPath + '\n');

        const answer = await new Promise(resolve => {
            rl.question('使用默认位置? (是/否): ', answer => {
                rl.close();
                resolve(answer.trim().toLowerCase());
            });
        });

        if (answer !== '是' && answer !== 'yes' && answer !== 'y') {
            const customPath = await new Promise(resolve => {
                const rl2 = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                
                rl2.question('请输入自定义安装路径: ', path => {
                    rl2.close();
                    resolve(path.trim() || this.installPath);
                });
            });

            if (customPath && customPath.trim()) {
                this.installPath = customPath.trim();
            }
        }

        console.log('\n📍 安装位置: ' + this.installPath + '\n');
    }

    /**
     * 执行安装
     */
    async install() {
        try {
            await this.showWelcome();
            await this.selectInstallPath();

            console.log('🚀 开始安装...\n');

            // 创建安装目录
            this.createDirectory(this.installPath);
            
            // 复制文件
            await this.copyFiles();
            
            // 创建桌面快捷方式
            await this.createDesktopShortcut();
            
            // 创建开始菜单快捷方式
            await this.createStartMenuShortcut();
            
            // 注册卸载程序
            this.registerUninstaller();
            
            // 创建安装信息文件
            this.createInstallInfo();

            console.log('\n✅ 安装完成!\n');
            console.log('快捷方式已创建在桌面。\n');
            console.log('您可以从开始菜单或桌面快捷方式启动 ' + this.appName + '。\n');
            console.log('卸载信息已注册到系统控制面板。\n');

            this.log('安装成功完成');

        } catch (error) {
            console.error('\n❌ 安装失败:', error.message);
            this.log('安装失败: ' + error.message);
            process.exit(1);
        }
    }

    /**
     * 创建目录
     */
    createDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            this.log('创建目录: ' + dirPath);
        }
    }

    /**
     * 复制文件
     */
    async copyFiles() {
        const sourceDir = __dirname;
        const files = fs.readdirSync(sourceDir);

        for (const file of files) {
            const srcPath = path.join(sourceDir, file);
            const destPath = path.join(this.installPath, file);

            if (fs.statSync(srcPath).isFile()) {
                fs.copyFileSync(srcPath, destPath);
                this.log('复制文件: ' + file);
            }
        }

        // 复制子目录
        const subDirs = ['src', 'logs'];
        for (const subDir of subDirs) {
            const srcDir = path.join(sourceDir, subDir);
            const destDir = path.join(this.installPath, subDir);
            
            if (fs.existsSync(srcDir)) {
                this.copyDirectory(srcDir, destDir);
            }
        }
    }

    /**
     * 复制目录
     */
    copyDirectory(src, dest) {
        this.createDirectory(dest);
        
        const files = fs.readdirSync(src);
        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            
            if (fs.statSync(srcPath).isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    /**
     * 创建桌面快捷方式
     */
    async createDesktopShortcut() {
        const shortcutPath = path.join(this.desktopPath, this.appName + '.lnk');
        
        // Windows 快捷方式脚本
        const vbsScript = `
Set WshShell = CreateObject("WScript.Shell")
Set Shortcut = WshShell.CreateShortcut("${shortcutPath.replace(/\\/g, '\\\\')}")
Shortcut.TargetPath = "node.exe"
Shortcut.Arguments = """${path.join(this.installPath, 'src', 'app.js').replace(/\\/g, '\\\\')}"""
Shortcut.WorkingDirectory = "${this.installPath.replace(/\\/g, '\\\\')}"
Shortcut.Description = "${this.appName} v${this.appVersion}"
Shortcut.IconLocation = "node.exe,0"
Shortcut.Save()
`;
        
        // 写入VBS脚本
        const vbsPath = path.join(__dirname, 'createshortcut.vbs');
        fs.writeFileSync(vbsPath, vbsScript);

        // 执行VBS脚本
        await this.exec('cscript //B "' + vbsPath + '"');
        
        // 清理VBS脚本
        if (fs.existsSync(vbsPath)) {
            fs.unlinkSync(vbsPath);
        }

        this.log('创建桌面快捷方式: ' + shortcutPath);
    }

    /**
     * 创建开始菜单快捷方式
     */
    async createStartMenuShortcut() {
        const menuPath = path.join(this.startMenuPath, this.appName);
        this.createDirectory(menuPath);
        
        const shortcutPath = path.join(menuPath, this.appName + '.lnk');
        
        const vbsScript = `
Set WshShell = CreateObject("WScript.Shell")
Set Shortcut = WshShell.CreateShortcut("${shortcutPath.replace(/\\/g, '\\\\')}")
Shortcut.TargetPath = "node.exe"
Shortcut.Arguments = """${path.join(this.installPath, 'src', 'app.js').replace(/\\/g, '\\\\')}"""
Shortcut.WorkingDirectory = "${this.installPath.replace(/\\/g, '\\\\')}"
Shortcut.Description = "${this.appName} v${this.appVersion}"
Shortcut.Save()
`;
        
        const vbsPath = path.join(__dirname, 'createmenushortcut.vbs');
        fs.writeFileSync(vbsPath, vbsScript);
        
        await this.exec('cscript //B "' + vbsPath + '"');
        
        if (fs.existsSync(vbsPath)) {
            fs.unlinkSync(vbsPath);
        }

        this.log('创建开始菜单快捷方式: ' + shortcutPath);
    }

    /**
     * 注册卸载程序
     */
    registerUninstaller() {
        const uninstallPath = path.join(this.installPath, 'uninstall.exe');
        const uninstallerScript = path.join(__dirname, 'uninstall.js');
        
        // 创建卸载批处理文件
        const batContent = `@echo off
cd /d "${this.installPath}"
node uninstall.js
del "%~f0"
`;
        
        const batPath = path.join(this.installPath, 'uninstall.bat');
        fs.writeFileSync(batPath, batContent);
        
        // 复制卸载脚本
        if (fs.existsSync(uninstallerScript)) {
            fs.copyFileSync(uninstallerScript, path.join(this.installPath, 'uninstall.js'));
        }

        this.log('注册卸载程序');
    }

    /**
     * 创建安装信息文件
     */
    createInstallInfo() {
        const info = {
            appName: this.appName,
            version: this.appVersion,
            installPath: this.installPath,
            installDate: new Date().toISOString(),
            uninstallerPath: path.join(this.installPath, 'uninstall.bat')
        };

        const infoPath = path.join(this.installPath, 'install.info');
        fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
        
        this.log('创建安装信息文件: ' + infoPath);
    }

    /**
     * 执行命令
     */
    exec(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    /**
     * 记录日志
     */
    log(message) {
        const logEntry = `[${new Date().toISOString()}] ${message}\n`;
        fs.appendFileSync(this.logFile, logEntry);
    }
}

// 运行安装
const installer = new Installer();
installer.install();
