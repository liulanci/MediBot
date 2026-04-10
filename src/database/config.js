/**
 * MySQL 数据库配置文件
 * 版本：1.0
 */

module.exports = {
    // 数据库连接配置
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'health_ai_pro',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    
    // 连接池配置
    pool: {
        min: 2,
        max: 10
    },
    
    // 表结构版本
    version: '1.0.0'
};
