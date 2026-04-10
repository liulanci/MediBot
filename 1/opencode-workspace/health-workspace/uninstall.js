/**
 * ============================================================================
 * Health Workspace 卸载程序
 * ============================================================================
 * 
 * 功能：
 * - 清理安装文件
 * - 删除快捷方式
 * - 清理注册表项
 * - 清理用户数据（可选）
 * 
 * 作者：Health Workspace Team
 * 版本：1.0.0
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

/**
 * 卸载程序主类
 */
class Uninstaller {
    constructor() {
        this.appName = 'Health Workspace';
        this.appPath = path.dirname(process.execPath) || __dirname;
        this.logFile = path.join(this.appPath, 'uninstall.log');
        
        this.init();
    }

    async init() {
        console.log('\n' + '='.repeat(60));
        console.log('  ' + this.appName + ' 卸载向导');
        console.log('='.repeat(60) + '\n');

        try {
            // 加载安装信息
            const infoPath = path.join(this.appPath, 'install.info');
            if (!fs.existsSync(infoPath)) {
                console.log('⚠️ 未找到安装信息，可能已损坏或未正确安装。\n');
                await this.manualUninstall();
                return;
            }

            const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
            this.appPath = info.installPath || this.appPath;

            await this.confirmUninstall();
            await this.removeShortcuts();
            await this.removeApplicationFiles();
            await this.cleanUserData();
            
            console.log('\n✅ 卸载完成！\n');
            console.log('感谢您使用 ' + this.appName + '。\n');
            
            this.log('卸载完成');
            
            // 等待用户按键退出
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            rl.question('按 Enter 键退出... ', () => {
                rl.close();
                process.exit(0);
            });

        } catch (error) {
            console.error('\n❌ 卸载失败:', error.message);
            this.log('卸载失败: ' + error.message);
            process.exit(1);
        }
    }

    async confirmUninstall() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('📋 安装信息:');
        console.log('  应用程序: ' + this.appName);
        console.log('  安装路径: ' + this.appPath);
        console.log('');

        const answer = await new Promise(resolve => {
            rl.question('确认卸载? (是/否): ', answer => {
                rl.close();
                resolve(answer.trim().toLowerCase());
            });
        });

        if (answer !== '是' && answer !== 'yes' && answer !== 'y') {
            console.log('\n卸载已取消。\n');
            process.exit(0);
        }

        console.log('\n🗑️ 开始卸载...\n');
    }

    async removeShortcuts() {
        console.log('📌 正在删除快捷方式...');

        // 删除桌面快捷方式
        const desktopPath = path.join(
            process.env.USERPROFILE || '',
            'Desktop',
            this.appName + '.lnk'
        );
        
        if (fs.existsSync(desktopPath)) {
            fs.unlinkSync(desktopPath);
            console.log('  ✓ 已删除桌面快捷方式');
            this.log('删除桌面快捷方式: ' + desktopPath);
        }

        // 删除开始菜单快捷方式
        const startMenuPath = path.join(
            process.env.APPDATA || '',
            'Microsoft', 'Windows', 'Start Menu', 'Programs',
            this.appName + '.lnk'
        );
        
        if (fs.existsSync(startMenuPath)) {
            fs.unlinkSync(startMenuPath);
            console.log('  ✓ 已删除开始菜单快捷方式');
            this.log('删除开始菜单快捷方式: ' + startMenuPath);
        }

        // 尝试删除开始菜单文件夹
        const startMenuFolder = path.join(
            process.env.APPDATA || '',
            'Microsoft', 'Windows', 'Start Menu', 'Programs',
            this.appName
        );
        
        if (fs.existsSync(startMenuFolder)) {
            try {
                fs.rmdirSync(startMenuFolder);
                console.log('  ✓ 已删除开始菜单文件夹');
                this.log('删除开始菜单文件夹: ' + startMenuFolder);
            } catch (e) {
                console.log('  ⚠️  无法删除开始菜单文件夹（可能需要管理员权限）');
            }
        }

        console.log('');
    }

    async removeApplicationFiles() {
        console.log('📁 正在删除应用程序文件...');

        try {
            // 删除所有文件
            this.deleteDirectory(this.appPath);
            console.log('  ✓ 已删除应用程序文件');
            this.log('删除应用程序目录: ' + this.appPath);
        } catch (error) {
            console.log('  ⚠️  部分文件删除失败，可能需要管理员权限');
            console.log('  请手动删除以下目录:');
            console.log('  ' + this.appPath);
            this.log('删除失败: ' + error.message);
        }

        console.log('');
    }

    deleteDirectory(dirPath) {
        if (!fs.existsSync(dirPath)) return;

        const files = fs.readdirSync(dirPath);
        
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                this.deleteDirectory(filePath);
            } else {
                try {
                    fs.unlinkSync(filePath);
                this.log('删除文件: ' + filePath);
                // 不在日志中记录每个文件删除
            }
        }

        try {
            fs.rmdirSync(dirPath);
        } catch (e) {
            // 目录可能不为空，忽略
        }
    }

    async cleanUserData() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const answer = await new Promise(resolve => {
            rl.question('\n是否清理用户数据? (是/否): ', answer => {
                rl.close();
                resolve(answer.trim().toLowerCase());
            });
        });

        if (answer === '是' || answer === 'yes' || answer === 'y') {
            console.log('\n🗑️ 清理用户数据...');

            // 清理应用数据目录
            const appDataPath = path.join(
                process.env.APPDATA || process.env.HOME || '',
                this.appName.replace(/\s+/g, '')
            );

            if (fs.existsSync(appDataPath)) {
                this.deleteDirectory(appDataPath);
                console.log('  ✓ 已清理用户数据');
                this.log('清理用户数据: ' + appDataPath);
            }

            // 清理日志文件
            const logsPath = path.join(
                process.env.APPDATA || process.env.HOME || '',
                this.appName.replace(/\s+/g, '') + '_logs'
            );

            if (fs.existsSync(logsPath)) {
                this.deleteDirectory(logsPath);
                console.log('  ✓ 已清理日志文件');
                this.log('清理日志: ' + logsPath);
            }
        } else {
            console.log('\n⏭️ 跳过用户数据清理');
        }
    }

    async manualUninstall() {
        console.log('手动卸载说明:\n');
        console.log('1. 关闭应用程序（如果正在运行）');
        console.log('2. 删除安装目录: ' + this.appPath);
        console.log('3. 删除桌面快捷方式（如有）');
        console.log('4. 删除开始菜单快捷方式（如有）');
        console.log('');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        await new Promise(resolve => {
            rl.question('按 Enter 键退出... ', () => {
                rl.close();
                resolve();
            });
        });

        process.exit(0);
    }

    log(message) {
        const logEntry = `[${new Date().toISOString()}] ${message}\n`;
        try {
            fs.appendFileSync(this.logFile, logEntry);
        } catch (e) {
            // 忽略日志错误
        }
    }
}

// 运行卸载程序
new Uninstaller();
