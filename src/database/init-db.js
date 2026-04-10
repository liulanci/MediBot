/**
 * 数据库初始化脚本
 * 创建所有必需的表结构和索引
 */

const mysql = require('mysql2/promise');
const dbConfig = require('./config');

async function initDatabase() {
    let connection;
    
    try {
        // 创建连接
        connection = await mysql.createConnection({
            host: dbConfig.database.host,
            port: dbConfig.database.port,
            user: dbConfig.database.user,
            password: dbConfig.database.password,
            multipleStatements: true
        });
        
        console.log('✅ 数据库连接成功');
        
        // 创建数据库
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database.database}`);
        await connection.query(`USE ${dbConfig.database.database}`);
        
        console.log(`✅ 数据库 '${dbConfig.database.database}' 已创建/选中`);
        
        // 创建用户表
        const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100),
            age INT,
            gender ENUM('male', 'female', 'other'),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_username (username),
            INDEX idx_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createUsersTable);
        console.log('✅ 用户表创建成功');
        
        // 创建评估量表主表
        const createScalesTable = `
        CREATE TABLE IF NOT EXISTS assessment_scales (
            id INT PRIMARY KEY AUTO_INCREMENT,
            scale_code VARCHAR(50) NOT NULL UNIQUE,
            name_cn VARCHAR(200) NOT NULL,
            name_en VARCHAR(200),
            description TEXT,
            questions_count INT DEFAULT 0,
            department VARCHAR(50),
            type ENUM('psychology', 'medical', 'fun', 'personality') DEFAULT 'medical',
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_scale_code (scale_code),
            INDEX idx_department (department),
            INDEX idx_type (type)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createScalesTable);
        console.log('✅ 评估量表主表创建成功');
        
        // 创建量表题目表
        const createQuestionsTable = `
        CREATE TABLE IF NOT EXISTS scale_questions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            scale_id INT NOT NULL,
            question_id INT NOT NULL,
            question_cn TEXT NOT NULL,
            question_en TEXT,
            options_json TEXT,
            scoring_type ENUM('binary', 'likert', 'numeric') DEFAULT 'likert',
            category VARCHAR(100),
            subcategory VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (scale_id) REFERENCES assessment_scales(id) ON DELETE CASCADE,
            INDEX idx_scale_id (scale_id),
            INDEX idx_question_id (question_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createQuestionsTable);
        console.log('✅ 量表题目表创建成功');
        
        // 创建评估结果表
        const createResultsTable = `
        CREATE TABLE IF NOT EXISTS assessment_results (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            scale_id INT NOT NULL,
            answers_json TEXT,
            raw_score DECIMAL(10, 2),
            normalized_score DECIMAL(5, 2),
            result_type VARCHAR(50),
            interpretation TEXT,
            recommendations TEXT,
            assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
            FOREIGN KEY (scale_id) REFERENCES assessment_scales(id) ON DELETE CASCADE,
            INDEX idx_user_id (user_id),
            INDEX idx_scale_id (scale_id),
            INDEX idx_assessment_date (assessment_date)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createResultsTable);
        console.log('✅ 评估结果表创建成功');
        
        // 创建检验项目表
        const createLabTestsTable = `
        CREATE TABLE IF NOT EXISTS lab_tests (
            id INT PRIMARY KEY AUTO_INCREMENT,
            test_code VARCHAR(50) NOT NULL UNIQUE,
            name_cn VARCHAR(200) NOT NULL,
            name_en VARCHAR(200),
            name_latin VARCHAR(200),
            category VARCHAR(50),
            unit_si VARCHAR(50),
            unit_alt VARCHAR(50),
            reference_low DECIMAL(10, 2),
            reference_high DECIMAL(10, 2),
            reference_unit VARCHAR(50),
            description TEXT,
            clinical_significance TEXT,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_test_code (test_code),
            INDEX idx_category (category)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createLabTestsTable);
        console.log('✅ 检验项目表创建成功');
        
        // 创建检验结果表
        const createLabResultsTable = `
        CREATE TABLE IF NOT EXISTS lab_results (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            test_id INT NOT NULL,
            value DECIMAL(10, 2) NOT NULL,
            unit VARCHAR(50),
            value_si DECIMAL(10, 2),
            unit_si VARCHAR(50),
            status ENUM('normal', 'low', 'high', 'critical_low', 'critical_high') DEFAULT 'normal',
            test_date DATE,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
            FOREIGN KEY (test_id) REFERENCES lab_tests(id) ON DELETE CASCADE,
            INDEX idx_user_id (user_id),
            INDEX idx_test_id (test_id),
            INDEX idx_test_date (test_date),
            INDEX idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createLabResultsTable);
        console.log('✅ 检验结果表创建成功');
        
        // 创建健康报告表
        const createReportsTable = `
        CREATE TABLE IF NOT EXISTS health_reports (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            report_type ENUM('assessment', 'lab', 'comprehensive') NOT NULL,
            title VARCHAR(200),
            content_json TEXT,
            summary TEXT,
            ai_insights TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
            INDEX idx_user_id (user_id),
            INDEX idx_report_type (report_type),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createReportsTable);
        console.log('✅ 健康报告表创建成功');
        
        // 创建AI模型配置表
        const createAIModelsTable = `
        CREATE TABLE IF NOT EXISTS ai_models (
            id INT PRIMARY KEY AUTO_INCREMENT,
            model_code VARCHAR(50) NOT NULL UNIQUE,
            provider VARCHAR(100) NOT NULL,
            model_name VARCHAR(100) NOT NULL,
            api_endpoint VARCHAR(500),
            api_key_encrypted TEXT,
            is_enabled BOOLEAN DEFAULT TRUE,
            is_default BOOLEAN DEFAULT FALSE,
            config_json TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_provider (provider),
            INDEX idx_is_enabled (is_enabled),
            INDEX idx_is_default (is_default)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createAIModelsTable);
        console.log('✅ AI模型配置表创建成功');
        
        // 创建系统设置表
        const createSettingsTable = `
        CREATE TABLE IF NOT EXISTS system_settings (
            id INT PRIMARY KEY AUTO_INCREMENT,
            setting_key VARCHAR(100) NOT NULL UNIQUE,
            setting_value TEXT,
            setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
            description VARCHAR(500),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_setting_key (setting_key)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        await connection.query(createSettingsTable);
        console.log('✅ 系统设置表创建成功');
        
        console.log('\n🎉 数据库初始化完成！所有表已创建。');
        
    } catch (error) {
        console.error('❌ 数据库初始化失败:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// 执行初始化
initDatabase()
    .then(() => {
        console.log('\n✅ 初始化脚本执行成功');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ 初始化脚本执行失败:', error);
        process.exit(1);
    });
