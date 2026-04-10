/**
 * ============================================================================
 * 数据加密模块
 * ============================================================================
 * 
 * 功能：
 * - 静态数据加密(AES-256-GCM)
 * - 传输层加密(TLS辅助)
 * - 密钥管理
 * - 数据脱敏
 * 
 * 作者：Security Team
 * 版本：2.0.0
 * ============================================================================
 */

const crypto = require('crypto');

/**
 * 加密算法配置
 */
const EncryptionConfig = {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16,
    saltLength: 64,
    pbkdf2Iterations: 100000
};

/**
 * 加密工具类
 */
class Encryption {
    /**
     * 生成随机密钥
     */
    static generateKey() {
        return crypto.randomBytes(EncryptionConfig.keyLength);
    }

    /**
     * 生成随机IV
     */
    static generateIV() {
        return crypto.randomBytes(EncryptionConfig.ivLength);
    }

    /**
     * 从密码派生密钥
     */
    static deriveKey(password, salt) {
        return crypto.pbkdf2Sync(
            password,
            salt,
            EncryptionConfig.pbkdf2Iterations,
            EncryptionConfig.keyLength,
            'sha512'
        );
    }

    /**
     * 加密数据
     */
    static encrypt(data, key) {
        // 确保key是Buffer
        const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key);
        
        // 生成IV
        const iv = this.generateIV();
        
        // 创建cipher
        const cipher = crypto.createCipheriv(
            EncryptionConfig.algorithm,
            keyBuffer,
            iv
        );
        
        // 加密
        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // 获取auth tag
        const authTag = cipher.getAuthTag();
        
        return {
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex'),
            encrypted: encrypted
        };
    }

    /**
     * 解密数据
     */
    static decrypt(encryptedData, key) {
        const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key);
        const iv = Buffer.from(encryptedData.iv, 'hex');
        const authTag = Buffer.from(encryptedData.authTag, 'hex');
        
        // 创建decipher
        const decipher = crypto.createDecipheriv(
            EncryptionConfig.algorithm,
            keyBuffer,
            iv
        );
        
        // 设置auth tag
        decipher.setAuthTag(authTag);
        
        // 解密
        let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return JSON.parse(decrypted);
    }

    /**
     * 加密敏感字段
     */
    static encryptFields(data, fieldsToEncrypt, key) {
        const result = { ...data };
        
        for (const field of fieldsToEncrypt) {
            if (result[field] !== undefined) {
                result[field] = this.encrypt(result[field], key);
            }
        }
        
        return result;
    }

    /**
     * 解密敏感字段
     */
    static decryptFields(data, fieldsToDecrypt, key) {
        const result = { ...data };
        
        for (const field of fieldsToDecrypt) {
            if (result[field] && typeof result[field] === 'object') {
                result[field] = this.decrypt(result[field], key);
            }
        }
        
        return result;
    }

    /**
     * 数据脱敏
     */
    static mask(data, fieldsToMask) {
        const result = { ...data };
        
        for (const field of fieldsToMask) {
            if (result[field] !== undefined) {
                result[field] = this.maskValue(result[field]);
            }
        }
        
        return result;
    }

    /**
     * 脱敏单个值
     */
    static maskValue(value) {
        const str = String(value);
        
        if (str.length <= 4) {
            return '****';
        }
        
        if (str.includes('@')) {
            // 邮箱脱敏
            const [local, domain] = str.split('@');
            const maskedLocal = local[0] + '***' + local[local.length - 1];
            return `${maskedLocal}@${domain}`;
        }
        
        if (/^\d+$/.test(str)) {
            // 手机号或身份证脱敏
            if (str.length === 11) {
                return str.substring(0, 3) + '****' + str.substring(7);
            }
            if (str.length === 18) {
                return str.substring(0, 6) + '********' + str.substring(14);
            }
        }
        
        // 默认脱敏
        return str.substring(0, 2) + '***' + str.substring(str.length - 1);
    }

    /**
     * 生成哈希
     */
    static hash(data, salt = '') {
        const str = typeof data === 'string' ? data : JSON.stringify(data);
        return crypto
            .createHash('sha256')
            .update(str + salt)
            .digest('hex');
    }

    /**
     * 生成HMAC
     */
    static hmac(data, key) {
        const str = typeof data === 'string' ? data : JSON.stringify(data);
        return crypto
            .createHmac('sha256', key)
            .update(str)
            .digest('hex');
    }

    /**
     * 比较哈希值（恒定时间）
     */
    static secureCompare(a, b) {
        const bufA = Buffer.from(a);
        const bufB = Buffer.from(b);
        
        if (bufA.length !== bufB.length) {
            return false;
        }
        
        return crypto.timingSafeEqual(bufA, bufB);
    }
}

/**
 * 密钥管理器
 */
class KeyManager {
    constructor() {
        this.masterKey = null;
        this.dataKey = null;
    }

    /**
     * 初始化密钥
     */
    initialize(masterKey) {
        this.masterKey = Buffer.from(masterKey, 'hex');
        this.dataKey = this.deriveDataKey();
    }

    /**
     * 从主密钥派生数据密钥
     */
    deriveDataKey() {
        const salt = 'health-workspace-data-key';
        return Encryption.deriveKey(this.masterKey, salt);
    }

    /**
     * 加密数据
     */
    encrypt(data) {
        if (!this.dataKey) {
            throw new Error('KeyManager not initialized');
        }
        return Encryption.encrypt(data, this.dataKey);
    }

    /**
     * 解密数据
     */
    decrypt(encryptedData) {
        if (!this.dataKey) {
            throw new Error('KeyManager not initialized');
        }
        return Encryption.decrypt(encryptedData, this.dataKey);
    }

    /**
     * 加密文件
     */
    encryptFile(inputPath, outputPath) {
        const data = fs.readFileSync(inputPath);
        const encrypted = this.encrypt(data);
        fs.writeFileSync(outputPath, JSON.stringify(encrypted, null, 2));
    }

    /**
     * 解密文件
     */
    decryptFile(inputPath, outputPath) {
        const encrypted = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
        const decrypted = this.decrypt(encrypted);
        fs.writeFileSync(outputPath, decrypted);
    }
}

module.exports = {
    Encryption,
    KeyManager,
    EncryptionConfig
};
