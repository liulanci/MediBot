/**
 * 数据导入脚本
 * 导入所有量表题目和检验项目数据
 */

const mysql = require('mysql2/promise');
const dbConfig = require('./config');

async function seedData() {
    let connection;
    
    try {
        // 创建连接
        connection = await mysql.createConnection({
            host: dbConfig.database.host,
            port: dbConfig.database.port,
            user: dbConfig.database.user,
            password: dbConfig.database.password,
            database: dbConfig.database.database
        });
        
        console.log('✅ 数据库连接成功');
        
        // 导入评估量表
        const scales = [
            ['MBTI', 'MBTI 人格测试', 'MBTI Personality Test', 'Myers-Briggs Type Indicator人格测试', 26, 'psychology', 'personality'],
            ['HAMD', '汉密尔顿抑郁量表', 'Hamilton Depression Scale', '评估抑郁症状严重程度', 17, 'psychology', 'medical'],
            ['HAMA', '汉密尔顿焦虑量表', 'Hamilton Anxiety Scale', '评估焦虑症状严重程度', 14, 'psychology', 'medical'],
            ['SCL-90', '症状自评量表', 'Symptom Checklist 90', '90项症状清单', 90, 'psychology', 'medical'],
            ['MMPI', '明尼苏达多项人格测验', 'Minnesota Multiphasic Personality Inventory', '经典人格评估工具', 566, 'psychology', 'personality'],
            ['SDS', '抑郁自评量表', 'Self-Rating Depression Scale', 'Zung抑郁自评量表', 20, 'psychology', 'medical'],
            ['SAS', '焦虑自评量表', 'Self-Rating Anxiety Scale', 'Zung焦虑自评量表', 20, 'psychology', 'medical'],
            ['MMSE', '简易精神状态检查', 'Mini-Mental State Examination', '快速筛查认知功能障碍', 11, 'neurology', 'medical'],
            ['ADL', '日常生活活动能力', 'Activities of Daily Living', 'Barthel Index日常生活活动指数', 10, 'neurology', 'medical'],
            ['GCS', '格拉斯哥昏迷量表', 'Glasgow Coma Scale', '意识水平评估', 3, 'neurology', 'medical'],
            ['VAS', '视觉模拟量表', 'Visual Analog Scale', '疼痛评估', 1, 'orthopedics', 'medical'],
            ['ODI', 'Oswestry功能障碍指数', 'Oswestry Disability Index', '腰痛残疾评估', 10, 'orthopedics', 'medical'],
            ['EPDS', '爱丁堡产后抑郁量表', 'Edinburgh Postnatal Depression', '产后抑郁筛查', 10, 'obstetrics', 'medical'],
            ['SBTI', 'SBTI 傻大个性格测试', 'Silly Big Type Indicator', 'MBTI已死，SBTI当道！', 31, 'fun', 'fun'],
            ['SBTI_WORK', '职场SBTI', 'Workplace SBTI', '测测你在职场是什么类型', 15, 'fun', 'fun'],
            ['SBTI_LOVE', '恋爱SBTI', 'Love SBTI', '你在恋爱中是什么角色', 18, 'fun', 'fun'],
            ['SBTI_SLEEP', '睡眠SBTI', 'Sleep SBTI', '你的睡眠习惯暴露了什么', 12, 'fun', 'fun'],
            ['PET_TEST', '你适合哪种宠物？', 'Pet Personality Test', '测测你最适合养什么宠物', 8, 'fun', 'fun'],
            ['EMOJI_STATE', '当代年轻人情绪状态诊断仪', 'Youth Emotional State', '你的精神状态领先还是落后', 10, 'fun', 'fun'],
            ['ANIME_CHAR', '如果你是动漫角色', 'Anime Character Test', '二次元世界中的你会是谁', 15, 'fun', 'fun'],
            ['BRAIN_OS', '你的大脑操作系统', 'Brain OS Test', 'Windows还是Mac', 12, 'fun', 'fun'],
            ['ENNEAGRAM', '九型人格测试', 'Enneagram', '深入探索核心人格类型', 45, 'fun', 'personality'],
            ['BIGFIVE', '大五人格测试', 'Big Five Personality', '探索人格五大维度', 50, 'fun', 'personality'],
            ['ATTACHMENT', '依恋类型测试', 'Attachment Style Test', '了解依恋风格', 36, 'fun', 'personality']
        ];
        
        for (const scale of scales) {
            await connection.query(
                `INSERT IGNORE INTO assessment_scales 
                (scale_code, name_cn, name_en, description, questions_count, department, type) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                scale
            );
        }
        console.log(`✅ 成功导入 ${scales.length} 个评估量表`);
        
        // 导入检验项目数据
        const labTests = [
            ['HGB', '血红蛋白', 'Hemoglobin', 'Hemoglobinum', 'hematology', 'g/L', 'g/dL', 130, 175, 'g/L'],
            ['WBC', '白细胞计数', 'White Blood Cell Count', 'Numerus Leucocytorum', 'hematology', '×10⁹/L', '/μL', 4.0, 10.0, '×10⁹/L'],
            ['PLT', '血小板计数', 'Platelet Count', 'Numerus Thrombocytorum', 'hematology', '×10⁹/L', '/μL', 100, 300, '×10⁹/L'],
            ['RBC', '红细胞计数', 'Red Blood Cell Count', 'Numerus Erythrocytorum', 'hematology', '×10¹²/L', '×10⁶/μL', 4.3, 5.8, '×10¹²/L'],
            ['HCT', '红细胞压积', 'Hematocrit', 'Haematocritus', 'hematology', '%', '%', 40, 50, '%'],
            ['GLU', '血糖', 'Glucose', 'Glucosa', 'biochemistry', 'mmol/L', 'mg/dL', 3.9, 6.1, 'mmol/L'],
            ['CREA', '肌酐', 'Creatinine', 'Creatininum', 'biochemistry', 'μmol/L', 'mg/dL', 62, 115, 'μmol/L'],
            ['BUN', '尿素氮', 'Blood Urea Nitrogen', 'Urea Nitrogenium', 'biochemistry', 'mmol/L', 'mg/dL', 2.6, 7.5, 'mmol/L'],
            ['UA', '尿酸', 'Uric Acid', 'Acidum Uricum', 'biochemistry', 'μmol/L', 'mg/dL', 208, 428, 'μmol/L'],
            ['ALT', '谷丙转氨酶', 'ALT', 'Alanini Aminotransferasis', 'liver', 'U/L', 'μkat/L', 9, 50, 'U/L'],
            ['AST', '谷草转氨酶', 'AST', 'Aspartati Aminotransferasis', 'liver', 'U/L', 'μkat/L', 15, 40, 'U/L'],
            ['ALP', '碱性磷酸酶', 'ALP', 'Phosphatasis Alkalina', 'liver', 'U/L', 'μkat/L', 45, 125, 'U/L'],
            ['GGT', '谷氨酰转肽酶', 'GGT', 'Gamma-Glutamyl Transferase', 'liver', 'U/L', 'μkat/L', 10, 60, 'U/L'],
            ['TBIL', '总胆红素', 'Total Bilirubin', 'Bilirubinum Totale', 'liver', 'μmol/L', 'mg/dL', 5.1, 22.2, 'μmol/L'],
            ['DBIL', '直接胆红素', 'Direct Bilirubin', 'Bilirubinum Directum', 'liver', 'μmol/L', 'mg/dL', 0, 6.8, 'μmol/L'],
            ['ALB', '白蛋白', 'Albumin', 'Albuminum', 'liver', 'g/L', 'g/dL', 40, 55, 'g/L'],
            ['TP', '总蛋白', 'Total Protein', 'Proteinum Totale', 'liver', 'g/L', 'g/dL', 65, 85, 'g/L'],
            ['TC', '总胆固醇', 'Total Cholesterol', 'Cholesterolum Totale', 'lipid', 'mmol/L', 'mg/dL', 0, 5.2, 'mmol/L'],
            ['TG', '甘油三酯', 'Triglyceride', 'Triglyceridum', 'lipid', 'mmol/L', 'mg/dL', 0, 1.7, 'mmol/L'],
            ['HDL', '高密度脂蛋白', 'HDL', 'Lipoproteinum Densum', 'lipid', 'mmol/L', 'mg/dL', 1.04, 99, 'mmol/L'],
            ['LDL', '低密度脂蛋白', 'LDL', 'Lipoproteinum Densum Minus', 'lipid', 'mmol/L', 'mg/dL', 0, 3.4, 'mmol/L'],
            ['APOA1', '载脂蛋白A1', 'Apolipoprotein A1', 'Apolipoproteinum A1', 'lipid', 'g/L', 'g/dL', 1.0, 2.0, 'g/L'],
            ['APOB', '载脂蛋白B', 'Apolipoprotein B', 'Apolipoproteinum B', 'lipid', 'g/L', 'g/dL', 0.6, 1.2, 'g/L'],
            ['K', '钾', 'Potassium', 'Kalium', 'electrolyte', 'mmol/L', 'mEq/L', 3.5, 5.5, 'mmol/L'],
            ['NA', '钠', 'Sodium', 'Natrium', 'electrolyte', 'mmol/L', 'mEq/L', 135, 145, 'mmol/L'],
            ['CL', '氯', 'Chloride', 'Chloridum', 'electrolyte', 'mmol/L', 'mEq/L', 96, 106, 'mmol/L'],
            ['CA', '钙', 'Calcium', 'Calcium', 'electrolyte', 'mmol/L', 'mg/dL', 2.1, 2.6, 'mmol/L'],
            ['MG', '镁', 'Magnesium', 'Magnesium', 'electrolyte', 'mmol/L', 'mg/dL', 0.7, 1.1, 'mmol/L'],
            ['P', '磷', 'Phosphorus', 'Phosphorus', 'electrolyte', 'mmol/L', 'mg/dL', 0.8, 1.5, 'mmol/L'],
            ['TSH', '促甲状腺激素', 'TSH', 'Thyrotropinum', 'thyroid', 'mIU/L', 'μIU/mL', 0.3, 4.5, 'mIU/L'],
            ['FT3', '游离三碘甲状腺原氨酸', 'Free T3', 'Thyroxinum Liberum T3', 'thyroid', 'pmol/L', 'pg/mL', 3.5, 6.5, 'pmol/L'],
            ['FT4', '游离甲状腺素', 'Free T4', 'Thyroxinum Liberum T4', 'thyroid', 'pmol/L', 'ng/dL', 11.5, 23.5, 'pmol/L'],
            ['T3', '三碘甲状腺原氨酸', 'T3', 'Triiodothyroninum', 'thyroid', 'nmol/L', 'ng/dL', 1.3, 3.1, 'nmol/L'],
            ['T4', '甲状腺素', 'T4', 'Thyroxinum', 'thyroid', 'nmol/L', 'μg/dL', 66, 181, 'nmol/L'],
            ['TPOAb', '甲状腺过氧化物酶抗体', 'TPO Antibody', 'Anticorpus Thyroperoxidasis', 'thyroid', 'IU/mL', 'IU/mL', 0, 34, 'IU/mL'],
            ['TGAb', '甲状腺球蛋白抗体', 'TG Antibody', 'Anticorpus Thyroglobulini', 'thyroid', 'IU/mL', 'IU/mL', 0, 115, 'IU/mL'],
            ['INS', '胰岛素', 'Insulin', 'Insulinum', 'diabetes', 'pmol/L', 'μIU/mL', 0, 174, 'pmol/L'],
            ['CP', 'C肽', 'C-Peptide', 'Peptidum C', 'diabetes', 'nmol/L', 'ng/mL', 0.3, 1.3, 'nmol/L'],
            ['HbA1c', '糖化血红蛋白', 'HbA1c', 'Haemoglobinum Glycosylatum', 'diabetes', '%', '%', 4.0, 6.5, '%'],
            ['GA', '糖化白蛋白', 'Glycated Albumin', 'Albuminum Glycosylatum', 'diabetes', '%', '%', 11, 16, '%'],
            ['CRP', 'C反应蛋白', 'C-Reactive Protein', 'Proteinum C Reactive', 'inflammation', 'mg/L', 'mg/L', 0, 3.0, 'mg/L'],
            ['hsCRP', '超敏C反应蛋白', 'hsCRP', 'hs-Proteinum C Reactive', 'inflammation', 'mg/L', 'mg/L', 0, 1.0, 'mg/L'],
            ['ESR', '红细胞沉降率', 'ESR', 'Tarditas Sedimenti Erythrocytorum', 'inflammation', 'mm/h', 'mm/h', 0, 20, 'mm/h'],
            ['FER', '铁蛋白', 'Ferritin', 'Ferritinum', 'anemia', 'μg/L', 'ng/mL', 30, 400, 'μg/L'],
            ['FE', '血清铁', 'Serum Iron', 'Ferrum Seri', 'anemia', 'μmol/L', 'μg/dL', 10, 30, 'μmol/L'],
            ['TIBC', '总铁结合力', 'TIBC', 'Capacitas Ferri Totallis', 'anemia', 'μmol/L', 'μg/dL', 50, 77, 'μmol/L'],
            ['UIBC', '未饱和铁结合力', 'UIBC', 'Capacitas Ferri Insaturata', 'anemia', 'μmol/L', 'μg/dL', 25, 50, 'μmol/L'],
            ['VB12', '维生素B12', 'Vitamin B12', 'Vitaminum B12', 'vitamin', 'pmol/L', 'pg/mL', 150, 600, 'pmol/L'],
            ['FA', '叶酸', 'Folate', 'Acidum Folicum', 'vitamin', 'nmol/L', 'ng/mL', 7, 46, 'nmol/L'],
            ['VD3', '25羟维生素D', '25-OH Vitamin D', 'Vitaminum D3 Hydroxylatum', 'vitamin', 'nmol/L', 'ng/mL', 50, 250, 'nmol/L'],
            ['AFP', '甲胎蛋白', 'AFP', 'Alpha-Fetoproteinum', 'tumor', 'μg/L', 'ng/mL', 0, 20, 'μg/L'],
            ['CEA', '癌胚抗原', 'CEA', 'Antigenum Carcinomatosum Embryonicum', 'tumor', 'μg/L', 'ng/mL', 0, 5, 'μg/L'],
            ['CA125', 'CA125', 'CA125', 'CA125', 'tumor', 'kU/L', 'U/mL', 0, 35, 'kU/L'],
            ['CA153', 'CA153', 'CA153', 'CA153', 'tumor', 'kU/L', 'U/mL', 0, 25, 'kU/L'],
            ['CA199', 'CA199', 'CA199', 'CA199', 'tumor', 'kU/L', 'U/mL', 0, 37, 'kU/L'],
            ['CA724', 'CA724', 'CA724', 'CA724', 'tumor', 'kU/L', 'U/mL', 0, 6.9, 'kU/L'],
            ['NSE', '神经元特异性烯醇化酶', 'NSE', 'Enolasum Neurospecificum', 'tumor', 'μg/L', 'ng/mL', 0, 16.3, 'μg/L'],
            ['CYFRA211', '细胞角蛋白19片段', 'CYFRA 21-1', 'Fragmentum Cytokeratini 19', 'tumor', 'μg/L', 'ng/mL', 0, 3.3, 'μg/L'],
            ['SCC', '鳞状上皮细胞癌抗原', 'SCC', 'Antigenum Carcinomatosum Squamosum', 'tumor', 'μg/L', 'ng/mL', 0, 1.5, 'μg/L'],
            ['PSA', '前列腺特异性抗原', 'PSA', 'Antigenum Prostaticum Specificum', 'tumor', 'μg/L', 'ng/mL', 0, 4.0, 'μg/L'],
            ['FPSA', '游离前列腺特异性抗原', 'Free PSA', 'Antigenum Prostaticum Specificum Liberum', 'tumor', 'μg/L', 'ng/mL', 0, 1.0, 'μg/L'],
            ['HCG', '人绒毛膜促性腺激素', 'β-HCG', 'Humanum Chorionicum Gonadotropinum', 'tumor', 'IU/L', 'mIU/mL', 0, 5, 'IU/L'],
            ['CA242', 'CA242', 'CA242', 'CA242', 'tumor', 'kU/L', 'U/mL', 0, 20, 'kU/L'],
            ['PROGRP', '胃泌素释放肽前体', 'ProGRP', 'Propeptidum Gastrin Releasing', 'tumor', 'pmol/L', 'pg/mL', 0, 65, 'pmol/L']
        ];
        
        for (const test of labTests) {
            await connection.query(
                `INSERT IGNORE INTO lab_tests 
                (test_code, name_cn, name_en, name_latin, category, unit_si, unit_alt, reference_low, reference_high, reference_unit) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                test
            );
        }
        console.log(`✅ 成功导入 ${labTests.length} 个检验项目`);
        
        // 导入AI模型预设
        const aiModels = [
            ['openai_gpt4', 'OpenAI', 'GPT-4', 'https://api.openai.com/v1/chat/completions', NULL, TRUE, TRUE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['openai_gpt35', 'OpenAI', 'GPT-3.5-Turbo', 'https://api.openai.com/v1/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['anthropic_claude', 'Anthropic', 'Claude-3', 'https://api.anthropic.com/v1/messages', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['google_gemini', 'Google', 'Gemini Pro', 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['baidu_ernie', 'Baidu', 'ERNIE Bot', 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['ali_qwen', 'Alibaba', 'Qwen', 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['tencent_hunyuan', 'Tencent', 'Hunyuan', 'https://hunyuan.cloud.tencent.com/api/v1/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['byte_doubao', 'ByteDance', 'Doubao', 'https://ark.cn-beijing.volces.com/api/v3/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['minimax_abab', 'MiniMax', 'ABAB', 'https://api.minimax.chat/v1/text/chatcompletion_v2', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['moonshot_v1', 'Moonshot', 'Moonshot V1', 'https://api.moonshot.cn/v1/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['zhipu_glm4', 'Zhipu AI', 'GLM-4', 'https://open.bigmodel.cn/api/paas/v4/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}'],
            ['deepseek_chat', 'DeepSeek', 'DeepSeek Chat', 'https://api.deepseek.com/v1/chat/completions', NULL, TRUE, FALSE, '{"max_tokens": 2000, "temperature": 0.7}']
        ];
        
        for (const model of aiModels) {
            await connection.query(
                `INSERT IGNORE INTO ai_models 
                (model_code, provider, model_name, api_endpoint, api_key_encrypted, is_enabled, is_default, config_json) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                model
            );
        }
        console.log(`✅ 成功导入 ${aiModels.length} 个AI模型预设`);
        
        // 导入系统设置
        const settings = [
            ['theme', 'dark', 'string', '系统主题'],
            ['language', 'zh-CN', 'string', '系统语言'],
            ['unit_system', 'SI', 'string', '默认单位制'],
            ['auto_save', 'true', 'boolean', '自动保存'],
            ['notifications_enabled', 'true', 'boolean', '启用通知'],
            ['assessment_reminder', '30', 'number', '评估提醒天数'],
            ['data_retention', '365', 'number', '数据保留天数'],
            ['ai_model_default', 'openai_gpt4', 'string', '默认AI模型'],
            ['max_assessment_per_day', '10', 'number', '每日最大评估次数'],
            ['report_format', 'pdf', 'string', '报告导出格式']
        ];
        
        for (const setting of settings) {
            await connection.query(
                `INSERT IGNORE INTO system_settings 
                (setting_key, setting_value, setting_type, description) 
                VALUES (?, ?, ?, ?)`,
                setting
            );
        }
        console.log(`✅ 成功导入 ${settings.length} 个系统设置`);
        
        console.log('\n🎉 数据导入完成！');
        
    } catch (error) {
        console.error('❌ 数据导入失败:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// 执行数据导入
seedData()
    .then(() => {
        console.log('\n✅ 数据导入脚本执行成功');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ 数据导入脚本执行失败:', error);
        process.exit(1);
    });
