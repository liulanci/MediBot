/**
 * ============================================================================
 * 审计日志系统
 * ============================================================================
 * 
 * 功能：
 * - 记录所有关键操作
 * - 安全事件追踪
 * - 用户行为分析
 * - 合规审计支持
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

const fs = require('fs');
const crypto = require('crypto');

/**
 * 审计事件类型
 */
const AuditEventType = {
    // 用户操作
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    USER_REGISTER: 'USER_REGISTER',
    USER_PASSWORD_CHANGE: 'USER_PASSWORD_CHANGE',
    
    // 数据访问
    DATA_READ: 'DATA_READ',
    DATA_CREATE: 'DATA_CREATE',
    DATA_UPDATE: 'DATA_UPDATE',
    DATA_DELETE: 'DATA_DELETE',
    DATA_EXPORT: 'DATA_EXPORT',
    
    // 权限操作
    PERMISSION_GRANT: 'PERMISSION_GRANT',
    PERMISSION_REVOKE: 'PERMISSION_REVOKE',
    ROLE_CHANGE: 'ROLE_CHANGE',
    
    // 安全事件
    SECURITY_ALERT: 'SECURITY_ALERT',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE',
    AUTHORIZATION_FAILURE: 'AUTHORIZATION_FAILURE',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    
    // 系统操作
    SYSTEM_CONFIG_CHANGE: 'SYSTEM_CONFIG_CHANGE',
    API_ACCESS: 'API_ACCESS',
    REPORT_GENERATION: 'REPORT_GENERATION'
};

/**
 * 审计事件严重级别
 */
const AuditSeverity = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
};

/**
 * 审计日志条目
 */
class AuditLogEntry {
    constructor(eventType, data = {}) {
        this.id = this.generateId();
        this.timestamp = new Date().toISOString();
        this.eventType = eventType;
        this.severity = this.getSeverityForEvent(eventType);
        this.data = this.sanitizeData(data);
        this.hash = this.calculateHash();
    }

    generateId() {
        return `AUD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    getSeverityForEvent(eventType) {
        const criticalEvents = [
            AuditEventType.SECURITY_ALERT,
            AuditEventType.AUTHORIZATION_FAILURE
        ];
        
        const warningEvents = [
            AuditEventType.AUTHENTICATION_FAILURE,
            AuditEventType.RATE_LIMIT_EXCEEDED,
            AuditEventType.PERMISSION_CHANGE
        ];

        if (criticalEvents.includes(eventType)) return AuditSeverity.CRITICAL;
        if (warningEvents.includes(eventType)) return AuditSeverity.WARNING;
        return AuditSeverity.INFO;
    }

    sanitizeData(data) {
        const sensitiveKeys = [
            'password', 'token', 'secret', 'key', 'apiKey',
            'authorization', 'credential', 'ssn', 'creditCard'
        ];
        
        const sanitized = JSON.parse(JSON.stringify(data));
        
        const sanitizeObject = (obj) => {
            for (const key of Object.keys(obj)) {
                if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
                    obj[key] = '[REDACTED]';
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    sanitizeObject(obj[key]);
                }
            }
        };
        
        sanitizeObject(sanitized);
        return sanitized;
    }

    calculateHash() {
        const content = `${this.id}|${this.timestamp}|${this.eventType}`;
        return crypto.createHash('sha256').update(content).digest('hex').substr(0, 16);
    }

    toJSON() {
        return {
            id: this.id,
            timestamp: this.timestamp,
            eventType: this.eventType,
            severity: this.severity,
            data: this.data,
            hash: this.hash
        };
    }
}

/**
 * 审计日志器类
 */
class AuditLogger {
    constructor(options = {}) {
        this.logDir = options.logDir || './logs/audit';
        this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB
        this.retentionDays = options.retentionDays || 90;
        this.enableConsole = options.enableConsole !== false;
        this.currentFile = null;
        this.currentFileSize = 0;
        
        this.ensureLogDirectory();
    }

    /**
     * 确保日志目录存在
     */
    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * 获取当前日志文件
     */
    getCurrentLogFile() {
        const date = new Date().toISOString().split('T')[0];
        const filename = `audit-${date}.jsonl`;
        const filepath = `${this.logDir}/${filename}`;
        
        if (this.currentFile !== filepath) {
            this.currentFile = filepath;
            this.currentFileSize = 0;
            
            if (fs.existsSync(filepath)) {
                const stats = fs.statSync(filepath);
                this.currentFileSize = stats.size;
            }
        }
        
        return filepath;
    }

    /**
     * 记录审计事件
     */
    log(eventType, data = {}) {
        const entry = new AuditLogEntry(eventType, data);
        const entryStr = JSON.stringify(entry.toJSON()) + '\n';
        
        // 写入文件
        const filepath = this.getCurrentLogFile();
        fs.appendFileSync(filepath, entryStr);
        this.currentFileSize += entryStr.length;
        
        // 控制台输出
        if (this.enableConsole) {
            this.logToConsole(entry);
        }
        
        // 检查文件大小
        if (this.currentFileSize >= this.maxFileSize) {
            this.rotateLog();
        }
        
        return entry;
    }

    /**
     * 输出到控制台
     */
    logToConsole(entry) {
        const colors = {
            info: '\x1b[36m',
            warning: '\x1b[33m',
            error: '\x1b[31m',
            critical: '\x1b[35m'
        };
        
        const color = colors[entry.severity] || colors.info;
        const reset = '\x1b[0m';
        
        console.log(`${color}[AUDIT]${reset} ${entry.timestamp} ${entry.eventType} - ${JSON.stringify(entry.data)}`);
    }

    /**
     * 轮转日志文件
     */
    rotateLog() {
        if (this.currentFile) {
            const date = new Date().toISOString().replace(/:/g, '-');
            const rotatedFile = this.currentFile.replace('.jsonl', `-${date}.jsonl`);
            
            if (fs.existsSync(this.currentFile)) {
                fs.renameSync(this.currentFile, rotatedFile);
            }
        }
        
        this.currentFile = null;
        this.currentFileSize = 0;
    }

    /**
     * 查询审计日志
     */
    query(options = {}) {
        const results = [];
        const startDate = options.startDate ? new Date(options.startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const endDate = options.endDate ? new Date(options.endDate) : new Date();
        const eventTypes = options.eventTypes || [];
        const severity = options.severity;
        const limit = options.limit || 100;
        
        const files = fs.readdirSync(this.logDir)
            .filter(f => f.endsWith('.jsonl'))
            .sort()
            .reverse();
        
        for (const file of files) {
            if (results.length >= limit) break;
            
            const filepath = `${this.logDir}/${file}`;
            const stats = fs.statSync(filepath);
            const fileDate = new Date(file.replace('audit-', '').replace('.jsonl', ''));
            
            if (fileDate < startDate || fileDate > endDate) continue;
            
            const lines = fs.readFileSync(filepath, 'utf-8').split('\n').filter(l => l.trim());
            
            for (const line of lines) {
                if (results.length >= limit) break;
                
                try {
                    const entry = JSON.parse(line);
                    
                    // 过滤条件
                    if (eventTypes.length > 0 && !eventTypes.includes(entry.eventType)) {
                        continue;
                    }
                    
                    if (severity && entry.severity !== severity) {
                        continue;
                    }
                    
                    results.push(entry);
                } catch (e) {
                    // 忽略解析错误
                }
            }
        }
        
        return results;
    }

    /**
     * 生成审计报告
     */
    generateReport(startDate, endDate) {
        const logs = this.query({ startDate, endDate, limit: 10000 });
        
        const report = {
            period: { startDate, endDate },
            generatedAt: new Date().toISOString(),
            totalEvents: logs.length,
            byEventType: {},
            bySeverity: {},
            timeline: []
        };
        
        // 统计事件类型
        logs.forEach(log => {
            if (!report.byEventType[log.eventType]) {
                report.byEventType[log.eventType] = 0;
            }
            report.byEventType[log.eventType]++;
            
            if (!report.bySeverity[log.severity]) {
                report.bySeverity[log.severity] = 0;
            }
            report.bySeverity[log.severity]++;
        });
        
        // 时间线分析
        const timeline = {};
        logs.forEach(log => {
            const date = log.timestamp.split('T')[0];
            if (!timeline[date]) {
                timeline[date] = { total: 0, byType: {} };
            }
            timeline[date].total++;
            if (!timeline[date].byType[log.eventType]) {
                timeline[date].byType[log.eventType] = 0;
            }
            timeline[date].byType[log.eventType]++;
        });
        
        report.timeline = Object.entries(timeline).map(([date, data]) => ({
            date,
            ...data
        }));
        
        return report;
    }

    /**
     * 清理过期日志
     */
    cleanup() {
        const cutoffDate = new Date(Date.now() - this.retentionDays * 24 * 60 * 60 * 1000);
        
        const files = fs.readdirSync(this.logDir).filter(f => f.endsWith('.jsonl'));
        
        let deletedCount = 0;
        
        files.forEach(file => {
            const filepath = `${this.logDir}/${file}`;
            const stats = fs.statSync(filepath);
            const fileDate = new Date(file.replace('audit-', '').replace('.jsonl', ''));
            
            if (fileDate < cutoffDate) {
                fs.unlinkSync(filepath);
                deletedCount++;
            }
        });
        
        return { deletedCount };
    }

    /**
     * 验证日志完整性
     */
    verifyIntegrity(filepath) {
        const lines = fs.readFileSync(filepath, 'utf-8').split('\n').filter(l => l.trim());
        
        let validCount = 0;
        let invalidCount = 0;
        const errors = [];
        
        lines.forEach((line, index) => {
            try {
                const entry = JSON.parse(line);
                
                // 验证哈希
                const expectedHash = this.calculateHashForEntry(entry);
                if (entry.hash !== expectedHash) {
                    invalidCount++;
                    errors.push({ line: index + 1, error: 'Hash mismatch' });
                } else {
                    validCount++;
                }
            } catch (e) {
                invalidCount++;
                errors.push({ line: index + 1, error: e.message });
            }
        });
        
        return {
            total: lines.length,
            valid: validCount,
            invalid: invalidCount,
            errors: errors.slice(0, 10) // 只返回前10个错误
        };
    }

    calculateHashForEntry(entry) {
        const content = `${entry.id}|${entry.timestamp}|${entry.eventType}`;
        return crypto.createHash('sha256').update(content).digest('hex').substr(0, 16);
    }
}

/**
 * 便捷审计方法
 */
const auditLog = (eventType, data) => {
    const logger = new AuditLogger();
    return logger.log(eventType, data);
};

module.exports = {
    AuditLogger,
    AuditLogEntry,
    AuditEventType,
    AuditSeverity,
    auditLog
};
