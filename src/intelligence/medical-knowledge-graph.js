/**
 * 医学知识图谱引擎 - Medical Knowledge Graph Engine
 * 构建完整的医学知识网络，实现症状、疾病、检验、药物的关联推理
 */

class MedicalKnowledgeGraph {
    constructor() {
        this.entities = new Map();
        this.relations = new Map();
        this.symptoms = new Map();
        this.diseases = new Map();
        this.labTests = new Map();
        this.medications = new Map();
        this.anatomies = new Map();
        this.initializeBaseKnowledge();
    }

    /**
     * 初始化基础知识库
     */
    initializeBaseKnowledge() {
        this.loadSymptoms();
        this.loadDiseases();
        this.loadLabTests();
        this.loadAnatomy();
        this.buildRelations();
    }

    /**
     * 加载症状数据
     */
    loadSymptoms() {
        const symptomsData = {
            // 全身症状
            fever: {
                name: '发热',
                nameEn: 'Fever',
                category: '全身症状',
                severity: { min: 37.3, max: 42, unit: '°C' },
                relatedSystems: ['immune', 'cardiovascular'],
                clinicalSignificance: '机体对感染或炎症的反应'
            },
            fatigue: {
                name: '乏力',
                nameEn: 'Fatigue',
                category: '全身症状',
                severity: ['轻度', '中度', '重度'],
                relatedSystems: ['endocrine', 'hematologic', 'immune']
            },
            weightLoss: {
                name: '体重下降',
                nameEn: 'Weight Loss',
                category: '全身症状',
                severity: { quick: '>5%体重/6月', slow: '慢性' },
                relatedSystems: ['endocrine', 'gastrointestinal', 'oncologic']
            },
            nightSweats: {
                name: '盗汗',
                nameEn: 'Night Sweats',
                category: '全身症状',
                relatedSystems: ['infectious', 'oncologic', 'endocrine']
            },
            
            // 心血管系统
            chestPain: {
                name: '胸痛',
                nameEn: 'Chest Pain',
                category: '心血管系统',
                characteristics: ['压榨样', '刺痛', '闷痛', '灼烧感'],
                severity: ['轻微', '中等', '剧烈'],
                relatedSystems: ['cardiovascular', 'respiratory', 'gastrointestinal']
            },
            palpitations: {
                name: '心悸',
                nameEn: 'Palpitations',
                category: '心血管系统',
                relatedSystems: ['cardiovascular', 'endocrine']
            },
            dyspnea: {
                name: '呼吸困难',
                nameEn: 'Dyspnea',
                category: '心血管系统',
                severity: ['I级', 'II级', 'III级', 'IV级'],
                relatedSystems: ['cardiovascular', 'respiratory']
            },
            edema: {
                name: '水肿',
                nameEn: 'Edema',
                category: '心血管系统',
                locations: ['双下肢', '颜面部', '全身'],
                relatedSystems: ['cardiovascular', 'renal', 'hepatic']
            },
            
            // 呼吸系统
            cough: {
                name: '咳嗽',
                nameEn: 'Cough',
                category: '呼吸系统',
                types: ['干咳', '痰咳', '夜间咳', '持续咳'],
                relatedSystems: ['respiratory', 'cardiovascular', 'gastrointestinal']
            },
            expectoration: {
                name: '咳痰',
                nameEn: 'Expectoration',
                category: '呼吸系统',
                characteristics: ['白痰', '黄痰', '绿痰', '血痰', '泡沫痰'],
                relatedSystems: ['respiratory']
            },
            hemoptysis: {
                name: '咯血',
                nameEn: 'Hemoptysis',
                category: '呼吸系统',
                severity: ['痰中带血', '小量咯血', '大量咯血'],
                relatedSystems: ['respiratory', 'cardiovascular']
            },
            
            // 消化系统
            abdominalPain: {
                name: '腹痛',
                nameEn: 'Abdominal Pain',
                category: '消化系统',
                locations: ['右上腹', '左上腹', '右下腹', '左下腹', '脐周', '全腹'],
                characteristics: ['钝痛', '锐痛', '绞痛', '隐痛'],
                relatedSystems: ['gastrointestinal', 'hepatic', 'genitourinary']
            },
            nausea: {
                name: '恶心',
                nameEn: 'Nausea',
                category: '消化系统',
                relatedSystems: ['gastrointestinal', 'neurologic', 'vestibular']
            },
            vomiting: {
                name: '呕吐',
                nameEn: 'Vomiting',
                category: '消化系统',
                characteristics: ['非喷射性', '喷射性', '呕血'],
                relatedSystems: ['gastrointestinal', 'neurologic']
            },
            diarrhea: {
                name: '腹泻',
                nameEn: 'Diarrhea',
                category: '消化系统',
                characteristics: ['急性<2周', '亚急性2-4周', '慢性>4周'],
                relatedSystems: ['gastrointestinal', 'endocrine']
            },
            constipation: {
                name: '便秘',
                nameEn: 'Constipation',
                category: '消化系统',
                relatedSystems: ['gastrointestinal', 'neurologic', 'endocrine']
            },
            
            // 神经系统
            headache: {
                name: '头痛',
                nameEn: 'Headache',
                category: '神经系统',
                characteristics: ['搏动性', '紧箍感', '锐痛', '钝痛'],
                locations: ['额部', '颞部', '枕部', '全头痛'],
                relatedSystems: ['neurologic', 'cardiovascular', 'ophthalmologic']
            },
            dizziness: {
                name: '头晕',
                nameEn: 'Dizziness',
                category: '神经系统',
                types: ['眩晕', '头昏', '晕厥前兆'],
                relatedSystems: ['neurologic', 'cardiovascular', 'vestibular']
            },
            syncope: {
                name: '晕厥',
                nameEn: 'Syncope',
                category: '神经系统',
                types: ['心源性', '血管迷走性', '体位性'],
                relatedSystems: ['cardiovascular', 'neurologic']
            },
            numbness: {
                name: '麻木',
                nameEn: 'Numbness',
                category: '神经系统',
                locations: ['单侧', '双侧', '四肢', '局部'],
                relatedSystems: ['neurologic', 'vascular']
            },
            
            // 精神心理
            anxiety: {
                name: '焦虑',
                nameEn: 'Anxiety',
                category: '精神心理',
                manifestations: ['紧张', '担忧', '恐惧', '坐立不安'],
                relatedSystems: ['psychiatric', 'endocrine']
            },
            depression: {
                name: '抑郁',
                nameEn: 'Depression',
                category: '精神心理',
                manifestations: ['情绪低落', '兴趣减退', '乏力', '睡眠障碍'],
                relatedSystems: ['psychiatric', 'endocrine', 'neurologic']
            },
            insomnia: {
                name: '失眠',
                nameEn: 'Insomnia',
                category: '精神心理',
                types: ['入睡困难', '睡眠维持障碍', '早醒'],
                relatedSystems: ['psychiatric', 'neurologic']
            },
            
            // 泌尿系统
            dysuria: {
                name: '尿痛',
                nameEn: 'Dysuria',
                category: '泌尿系统',
                relatedSystems: ['urinary', 'genital']
            },
            hematuria: {
                name: '血尿',
                nameEn: 'Hematuria',
                category: '泌尿系统',
                types: ['肉眼血尿', '镜下血尿'],
                relatedSystems: ['urinary', 'renal']
            },
            oliguria: {
                name: '少尿',
                nameEn: 'Oliguria',
                category: '泌尿系统',
                definition: '<400ml/24h',
                relatedSystems: ['renal', 'cardiovascular']
            },
            
            // 皮肤症状
            rash: {
                name: '皮疹',
                nameEn: 'Rash',
                category: '皮肤',
                types: ['斑疹', '丘疹', '斑丘疹', '水疱', '荨麻疹'],
                relatedSystems: ['dermatologic', 'immune', 'infectious']
            },
            pruritus: {
                name: '瘙痒',
                nameEn: 'Pruritus',
                category: '皮肤',
                relatedSystems: ['dermatologic', 'hepatic', 'renal']
            },
            jaundice: {
                name: '黄疸',
                nameEn: 'Jaundice',
                category: '皮肤',
                types: ['溶血性', '肝细胞性', '阻塞性'],
                relatedSystems: ['hepatic', 'hematologic']
            }
        };

        Object.entries(symptomsData).forEach(([code, data]) => {
            this.symptoms.set(code, { code, ...data });
            this.entities.set(code, { type: 'symptom', data: { code, ...data } });
        });
    }

    /**
     * 加载疾病数据
     */
    loadDiseases() {
        const diseasesData = {
            // 心血管疾病
            hypertension: {
                name: '高血压',
                nameEn: 'Hypertension',
                category: '心血管疾病',
                icd10: 'I10',
                symptoms: ['headache', 'fatigue', 'dizziness', 'palpitations'],
                labTests: ['blood_pressure', 'ecg', 'renal_function', 'blood_lipids'],
                riskFactors: ['obesity', 'smoking', 'high_salt', 'stress', 'genetics'],
                medications: ['acei', 'arb', 'ccb', 'diuretic', 'beta_blocker']
            },
            coronaryHeartDisease: {
                name: '冠心病',
                nameEn: 'Coronary Heart Disease',
                category: '心血管疾病',
                icd10: 'I25',
                symptoms: ['chestPain', 'dyspnea', 'fatigue', 'palpitations'],
                labTests: ['ecg', 'cardiac_enzymes', 'blood_lipids', 'cardiac_ct'],
                riskFactors: ['hypertension', 'diabetes', 'smoking', 'hyperlipidemia', 'obesity'],
                medications: ['antiplatelet', 'statin', 'nitrate', 'beta_blocker', 'acei']
            },
            heartFailure: {
                name: '心力衰竭',
                nameEn: 'Heart Failure',
                category: '心血管疾病',
                icd10: 'I50',
                symptoms: ['dyspnea', 'edema', 'fatigue', 'cough'],
                labTests: ['bnp', 'nt_probnp', 'ecg', 'cardiac_ultrasound'],
                riskFactors: ['coronaryHeartDisease', 'hypertension', 'cardiomyopathy'],
                medications: ['acei', 'arb', 'beta_blocker', 'diuretic', 'mra']
            },
            
            // 内分泌疾病
            diabetesType2: {
                name: '2型糖尿病',
                nameEn: 'Type 2 Diabetes',
                category: '内分泌疾病',
                icd10: 'E11',
                symptoms: ['polyuria', 'polydipsia', 'weightLoss', 'fatigue', 'blurredVision'],
                labTests: ['fasting_glucose', 'hba1c', 'ogtt', 'blood_lipids', 'renal_function'],
                riskFactors: ['obesity', 'sedentary', 'genetics', 'diet', 'age'],
                medications: ['metformin', 'sglt2i', 'glp1ra', 'dpp4i', 'insulin']
            },
            hyperthyroidism: {
                name: '甲状腺功能亢进',
                nameEn: 'Hyperthyroidism',
                category: '内分泌疾病',
                icd10: 'E05',
                symptoms: ['palpitations', 'weightLoss', 'tremor', 'heatIntolerance', 'insomnia', 'anxiety'],
                labTests: ['tsh', 'ft3', 'ft4', 'thyroid_antibodies'],
                medications: ['methimazole', 'ptu', 'propranolol']
            },
            hypothyroidism: {
                name: '甲状腺功能减退',
                nameEn: 'Hypothyroidism',
                category: '内分泌疾病',
                icd10: 'E03',
                symptoms: ['fatigue', 'weightGain', 'coldIntolerance', 'constipation', 'depression'],
                labTests: ['tsh', 'ft4', 'ft3'],
                medications: ['levothyroxine']
            },
            
            // 呼吸系统疾病
            communityPneumonia: {
                name: '社区获得性肺炎',
                nameEn: 'Community-Acquired Pneumonia',
                category: '呼吸系统疾病',
                icd10: 'J18',
                symptoms: ['fever', 'cough', 'expectoration', 'chestPain', 'dyspnea'],
                labTests: ['chest_xray', 'blood_routine', 'crp', 'pct', 'sputum_culture'],
                riskFactors: ['smoking', 'copd', 'elderly', 'immunocompromised'],
                medications: ['antibiotics']
            },
            COPD: {
                name: '慢性阻塞性肺疾病',
                nameEn: 'COPD',
                category: '呼吸系统疾病',
                icd10: 'J44',
                symptoms: ['cough', 'expectoration', 'dyspnea', 'wheezing'],
                labTests: ['pulmonary_function', 'chest_ct', 'abg'],
                riskFactors: ['smoking', 'air_pollution', 'occupational_exposure'],
                medications: ['laba', 'lama', 'ics', 'theophylline']
            },
            asthma: {
                name: '支气管哮喘',
                nameEn: 'Bronchial Asthma',
                category: '呼吸系统疾病',
                icd10: 'J45',
                symptoms: ['wheezing', 'dyspnea', 'cough', 'chestTightness'],
                labTests: ['pulmonary_function', 'bronchial_dilation_test', 'feno'],
                riskFactors: ['allergy', 'genetics', 'air_pollution', 'infection'],
                medications: ['saba', 'laba', 'ics', 'lama', 'montelukast']
            },
            
            // 消化系统疾病
            gastritis: {
                name: '胃炎',
                nameEn: 'Gastritis',
                category: '消化系统疾病',
                icd10: 'K29',
                symptoms: ['abdominalPain', 'nausea', 'vomiting', 'acidReflux', 'bloating'],
                labTests: ['gastroscopy', 'h_pylori_test', 'blood_routine'],
                medications: ['ppi', 'antibiotics', 'antacid', 'mucosal_protectant']
            },
            pepticUlcer: {
                name: '消化性溃疡',
                nameEn: 'Peptic Ulcer',
                category: '消化系统疾病',
                icd10: 'K25-K27',
                symptoms: ['abdominalPain', 'acidReflux', 'nausea', 'vomiting', 'melena'],
                labTests: ['gastroscopy', 'h_pylori_test'],
                medications: ['ppi', 'antibiotics', 'mucosal_protectant']
            },
            fattyLiver: {
                name: '脂肪肝',
                nameEn: 'Fatty Liver Disease',
                category: '消化系统疾病',
                icd10: 'K76',
                symptoms: ['fatigue', 'rightUpperQuadrantPain', 'hepatomegaly'],
                labTests: ['liver_ultrasound', 'liver_function', 'blood_lipids', 'hba1c'],
                riskFactors: ['obesity', 'diabetes', 'hyperlipidemia', 'alcohol']
            },
            
            // 神经系统疾病
            migraine: {
                name: '偏头痛',
                nameEn: 'Migraine',
                category: '神经系统疾病',
                icd10: 'G43',
                symptoms: ['headache', 'nausea', 'photophobia', 'phonophobia', 'visualAura'],
                labTests: ['neurologic_exam', 'ct_mri'],
                medications: ['triptan', 'nsaid', 'antiemetic', 'prophylaxis']
            },
            tensionHeadache: {
                name: '紧张性头痛',
                nameEn: 'Tension Headache',
                category: '神经系统疾病',
                icd10: 'G44',
                symptoms: ['headache', 'neckPain', 'shoulderTension'],
                medications: ['analgesic', 'muscle_relaxant', 'antidepressant']
            },
            stroke: {
                name: '脑卒中',
                nameEn: 'Stroke',
                category: '神经系统疾病',
                icd10: 'I63-I64',
                symptoms: ['hemiplegia', 'facialParalysis', 'speechDisorder', 'consciousnessDisorder', 'headache'],
                labTests: ['ct', 'mri', 'ecg', 'carotid_ultrasound', 'blood_routine'],
                riskFactors: ['hypertension', 'diabetes', 'smoking', 'atrialFibrillation'],
                medications: ['antiplatelet', 'anticoagulant', 'statin', 'antihypertensive']
            },
            
            // 精神心理疾病
            anxietyDisorder: {
                name: '焦虑障碍',
                nameEn: 'Anxiety Disorder',
                category: '精神心理疾病',
                icd10: 'F41',
                symptoms: ['anxiety', 'palpitations', 'tremor', 'sweating', 'insomnia', 'dizziness'],
                labTests: ['thyroid_function', 'blood_routine', 'ecg'],
                medications: ['ssri', 'snri', 'benzodiazepine', 'buspirone']
            },
            depressionDisorder: {
                name: '抑郁症',
                nameEn: 'Depression',
                category: '精神心理疾病',
                icd10: 'F32-F33',
                symptoms: ['depression', 'anhedonia', 'fatigue', 'insomnia', 'appetiteChange', 'guilt', 'suicidalThought'],
                medications: ['ssri', 'snri', 'tca', 'maoi', 'atypical_antidepressant']
            },
            
            // 肾脏疾病
            chronicKidneyDisease: {
                name: '慢性肾脏病',
                nameEn: 'Chronic Kidney Disease',
                category: '肾脏疾病',
                icd10: 'N18',
                symptoms: ['edema', 'fatigue', 'nausea', 'anemia', 'pruritus'],
                labTests: ['creatinine', 'egfr', 'urea', 'uric_acid', 'urinalysis', 'renal_ultrasound'],
                riskFactors: ['diabetes', 'hypertension', 'glomerulonephritis'],
                medications: ['acei', 'arb', 'sglt2i', 'phosphate_binder', 'erythropoietin']
            },
            
            // 血液系统疾病
            ironDeficiencyAnemia: {
                name: '缺铁性贫血',
                nameEn: 'Iron Deficiency Anemia',
                category: '血液系统疾病',
                icd10: 'D50',
                symptoms: ['fatigue', 'pallor', 'dizziness', 'tachycardia', 'brittleNails', 'pica'],
                labTests: ['hemoglobin', 'ferritin', 'serum_iron', 'tibc', 'mcv', 'mch'],
                medications: ['iron_supplement', 'vitamin_c']
            },
            
            // 感染性疾病
            influenza: {
                name: '流感',
                nameEn: 'Influenza',
                category: '感染性疾病',
                icd10: 'J09-J11',
                symptoms: ['fever', 'fatigue', 'myalgia', 'headache', 'cough', 'soreThroat'],
                labTests: ['influenza_test', 'blood_routine', 'crp'],
                medications: ['oseltamivir', 'supportive_care']
            },
            COVID19: {
                name: '新冠肺炎',
                nameEn: 'COVID-19',
                category: '感染性疾病',
                icd10: 'U07',
                symptoms: ['fever', 'cough', 'fatigue', 'dyspnea', 'anosmia', 'diarrhea'],
                labTests: ['covid_test', 'ct', 'blood_routine', 'crp', 'd_dimer', 'lymphocyte'],
                medications: ['antiviral', 'antibiotic', 'corticosteroid', 'anticoagulant']
            },
            
            // 自身免疫性疾病
            rheumatoidArthritis: {
                name: '类风湿关节炎',
                nameEn: 'Rheumatoid Arthritis',
                category: '自身免疫性疾病',
                icd10: 'M05-M06',
                symptoms: ['joint_pain', 'morning_stiffness', 'swelling', 'fatigue', 'fever'],
                labTests: ['rf', 'anti_ccp', 'esr', 'crp', 'joint_xray'],
                medications: ['dmard', 'methotrexate', 'biologic', 'nsaid', 'corticosteroid']
            },
            systemicLupusErythematosus: {
                name: '系统性红斑狼疮',
                nameEn: 'Systemic Lupus Erythematosus',
                category: '自身免疫性疾病',
                icd10: 'M32',
                symptoms: ['fatigue', 'joint_pain', 'rash', 'fever', 'photosensitivity', 'oralUlcer'],
                labTests: ['ana', 'anti_dsdna', 'anti_sm', 'complement', 'urinalysis'],
                medications: ['corticosteroid', 'immunosuppressant', 'hydroxychloroquine', 'biologic']
            }
        };

        Object.entries(diseasesData).forEach(([code, data]) => {
            this.diseases.set(code, { code, ...data });
            this.entities.set(code, { type: 'disease', data: { code, ...data } });
        });
    }

    /**
     * 加载检验项目
     */
    loadLabTests() {
        const labTestsData = {
            // 血液学
            blood_routine: {
                name: '血常规',
                nameEn: 'Complete Blood Count',
                parameters: ['wbc', 'rbc', 'hemoglobin', 'platelet', 'neutrophil', 'lymphocyte'],
                category: '血液学检验'
            },
            blood_pressure: {
                name: '血压',
                nameEn: 'Blood Pressure',
                parameters: ['systolic', 'diastolic', 'pulse'],
                category: '心血管检验'
            },
            
            // 生化检验
            liver_function: {
                name: '肝功能',
                nameEn: 'Liver Function Tests',
                parameters: ['alt', 'ast', 'alp', 'ggt', 'total_bilirubin', 'albumin', 'total_protein'],
                category: '生化检验'
            },
            renal_function: {
                name: '肾功能',
                nameEn: 'Renal Function Tests',
                parameters: ['creatinine', 'urea', 'uric_acid', 'egfr', 'cystatin_c'],
                category: '生化检验'
            },
            blood_lipids: {
                name: '血脂',
                nameEn: 'Lipid Profile',
                parameters: ['total_cholesterol', 'ldl', 'hdl', 'triglyceride', 'vldl'],
                category: '生化检验'
            },
            blood_glucose: {
                name: '血糖',
                nameEn: 'Blood Glucose',
                parameters: ['fasting_glucose', 'postprandial_glucose', 'hba1c', 'glycated_albumin'],
                category: '生化检验'
            },
            
            // 甲状腺功能
            thyroid_function: {
                name: '甲状腺功能',
                nameEn: 'Thyroid Function Tests',
                parameters: ['tsh', 'ft3', 'ft4', 't3', 't4'],
                category: '内分泌检验'
            },
            thyroid_antibodies: {
                name: '甲状腺抗体',
                nameEn: 'Thyroid Antibodies',
                parameters: ['tpo_ab', 'tg_ab', 'tsi'],
                category: '免疫检验'
            },
            
            // 心脏标志物
            cardiac_enzymes: {
                name: '心肌酶',
                nameEn: 'Cardiac Enzymes',
                parameters: ['ck', 'ckmb', 'ldh', 'ast', 'troponin'],
                category: '心血管检验'
            },
            bnp: {
                name: 'B型利钠肽',
                nameEn: 'BNP',
                parameters: ['bnp', 'nt_probnp'],
                category: '心血管检验'
            },
            
            // 炎症标志物
            inflammation_markers: {
                name: '炎症标志物',
                nameEn: 'Inflammatory Markers',
                parameters: ['crp', 'hscrp', 'esr', 'procalcitonin', 'il6'],
                category: '免疫检验'
            },
            
            // 免疫学
            autoantibodies: {
                name: '自身抗体',
                nameEn: 'Autoantibodies',
                parameters: ['ana', 'rf', 'anti_ccp', 'anti_dsdna', 'anti_sm', 'anca'],
                category: '免疫检验'
            },
            
            // 凝血功能
            coagulation: {
                name: '凝血功能',
                nameEn: 'Coagulation Tests',
                parameters: ['pt', 'aptt', ' fibrinogen', 'd_dimer', 'inr'],
                category: '血液学检验'
            }
        };

        Object.entries(labTestsData).forEach(([code, data]) => {
            this.labTests.set(code, { code, ...data });
            this.entities.set(code, { type: 'labTest', data: { code, ...data } });
        });
    }

    /**
     * 加载解剖结构
     */
    loadAnatomy() {
        const anatomyData = {
            cardiovascular: {
                name: '心血管系统',
                nameEn: 'Cardiovascular System',
                organs: ['heart', 'arteries', 'veins', 'capillaries'],
                relatedDiseases: ['hypertension', 'coronaryHeartDisease', 'heartFailure', 'arrhythmia']
            },
            respiratory: {
                name: '呼吸系统',
                nameEn: 'Respiratory System',
                organs: ['nose', 'pharynx', 'larynx', 'trachea', 'bronchi', 'lungs'],
                relatedDiseases: ['pneumonia', 'copd', 'asthma', 'lung_cancer']
            },
            gastrointestinal: {
                name: '消化系统',
                nameEn: 'Gastrointestinal System',
                organs: ['esophagus', 'stomach', 'small_intestine', 'large_intestine', 'liver', 'pancreas', 'gallbladder'],
                relatedDiseases: ['gastritis', 'pepticUlcer', 'fattyLiver', 'colorectal_cancer']
            },
            nervous: {
                name: '神经系统',
                nameEn: 'Nervous System',
                organs: ['brain', 'spinal_cord', 'nerves', 'ganglia'],
                relatedDiseases: ['stroke', 'migraine', 'epilepsy', 'parkinson', 'alzheimer']
            },
            endocrine: {
                name: '内分泌系统',
                nameEn: 'Endocrine System',
                organs: ['pituitary', 'thyroid', 'parathyroid', 'adrenal', 'pancreas', 'ovaries', 'testes'],
                relatedDiseases: ['diabetesType2', 'hyperthyroidism', 'hypothyroidism', 'cushing']
            },
            urinary: {
                name: '泌尿系统',
                nameEn: 'Urinary System',
                organs: ['kidneys', 'ureters', 'bladder', 'urethra'],
                relatedDiseases: ['chronicKidneyDisease', 'uti', 'nephrotic', 'kidney_stone']
            },
            hematologic: {
                name: '血液系统',
                nameEn: 'Hematologic System',
                organs: ['bone_marrow', 'lymph_nodes', 'spleen'],
                relatedDiseases: ['anemia', 'leukemia', 'lymphoma', 'myeloma']
            },
            immune: {
                name: '免疫系统',
                nameEn: 'Immune System',
                organs: ['thymus', 'spleen', 'lymph_nodes', 'tonsils', 'peyer_patches'],
                relatedDiseases: ['rheumatoidArthritis', 'sle', 'allergy', 'immunodeficiency']
            }
        };

        Object.entries(anatomyData).forEach(([code, data]) => {
            this.anatomies.set(code, { code, ...data });
            this.entities.set(code, { type: 'anatomy', data: { code, ...data } });
        });
    }

    /**
     * 构建实体间关系
     */
    buildRelations() {
        // 基于症状到疾病的关系
        this.diseases.forEach((disease, diseaseCode) => {
            if (disease.symptoms) {
                disease.symptoms.forEach(symptomCode => {
                    this.addRelation(symptomCode, diseaseCode, 'indicates');
                    this.addRelation(diseaseCode, symptomCode, 'manifests_as');
                });
            }
            
            // 疾病到检验的关系
            if (disease.labTests) {
                disease.labTests.forEach(labCode => {
                    this.addRelation(diseaseCode, labCode, 'diagnosed_by');
                    this.addRelation(labCode, diseaseCode, 'helps_diagnose');
                });
            }
        });

        // 基于解剖系统到疾病的关系
        this.anatomies.forEach((anatomy, anatomyCode) => {
            if (anatomy.relatedDiseases) {
                anatomy.relatedDiseases.forEach(diseaseCode => {
                    this.addRelation(anatomyCode, diseaseCode, 'related_to');
                    this.addRelation(diseaseCode, anatomyCode, 'affects');
                });
            }
        });
    }

    /**
     * 添加关系
     */
    addRelation(source, target, relationType) {
        const key = `${source}-${relationType}`;
        if (!this.relations.has(key)) {
            this.relations.set(key, []);
        }
        this.relations.get(key).push(target);
    }

    /**
     * 查询症状相关疾病
     */
    findDiseasesBySymptoms(symptoms) {
        const diseaseScores = new Map();
        
        symptoms.forEach(symptom => {
            const key = `${symptom}-indicates`;
            const relatedDiseases = this.relations.get(key) || [];
            
            relatedDiseases.forEach(diseaseCode => {
                const score = diseaseScores.get(diseaseCode) || 0;
                diseaseScores.set(diseaseCode, score + 1);
            });
        });

        // 排序并返回结果
        return Array.from(diseaseScores.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([code, score]) => ({
                disease: this.diseases.get(code),
                matchScore: score,
                totalSymptoms: symptoms.length
            }));
    }

    /**
     * 查询检验与疾病关系
     */
    findDiseasesByLabTests(labTests) {
        const diseaseScores = new Map();
        
        labTests.forEach(lab => {
            const key = `${lab}-helps_diagnose`;
            const relatedDiseases = this.relations.get(key) || [];
            
            relatedDiseases.forEach(diseaseCode => {
                const score = diseaseScores.get(diseaseCode) || 0;
                diseaseScores.set(diseaseCode, score + 1);
            });
        });

        return Array.from(diseaseScores.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([code, score]) => ({
                disease: this.diseases.get(code),
                matchScore: score,
                totalTests: labTests.length
            }));
    }

    /**
     * 智能诊断推理
     */
    diagnose(inputSymptoms, inputLabTests, patientContext = {}) {
        // 1. 症状分析
        const symptomResults = this.findDiseasesBySymptoms(inputSymptoms);
        
        // 2. 检验结果分析
        const labResults = inputLabTests.length > 0 
            ? this.findDiseasesByLabTests(inputLabTests) 
            : [];

        // 3. 综合评分
        const combinedScores = new Map();
        
        symptomResults.forEach(({ disease, matchScore, totalSymptoms }) => {
            const symptomWeight = matchScore / totalSymptoms;
            const current = combinedScores.get(disease.code) || { disease, score: 0, reasons: [] };
            current.score += symptomWeight * 0.7; // 症状权重70%
            current.reasons.push({ type: 'symptom', match: matchScore });
            combinedScores.set(disease.code, current);
        });

        labResults.forEach(({ disease, matchScore, totalTests }) => {
            const labWeight = matchScore / totalTests;
            const current = combinedScores.get(disease.code) || { disease, score: 0, reasons: [] };
            current.score += labWeight * 0.3; // 检验权重30%
            current.reasons.push({ type: 'lab', match: matchScore });
            combinedScores.set(disease.code, current);
        });

        // 4. 结合患者上下文
        if (patientContext.age || patientContext.gender || patientContext.history) {
            combinedScores.forEach((data, code) => {
                const disease = data.disease;
                let contextMultiplier = 1.0;
                
                // 年龄因素
                if (disease.riskFactors?.includes('elderly') && patientContext.age > 65) {
                    contextMultiplier += 0.1;
                }
                
                // 性别因素
                if (disease.category === '妇科疾病' && patientContext.gender === 'male') {
                    contextMultiplier = 0;
                }
                
                data.score *= contextMultiplier;
            });
        }

        // 5. 排序并返回结果
        return Array.from(combinedScores.values())
            .sort((a, b) => b.score - a.score)
            .map(item => ({
                disease: item.disease.name,
                diseaseEn: item.disease.nameEn,
                category: item.disease.category,
                confidence: Math.min(item.score * 100, 99).toFixed(1) + '%',
                matchDetails: item.reasons,
                recommendedTests: item.disease.labTests || [],
                suggestedMedications: item.disease.medications || [],
                riskFactors: item.disease.riskFactors || []
            }));
    }

    /**
     * 获取症状详情
     */
    getSymptomDetails(symptomCode) {
        return this.symptoms.get(symptomCode);
    }

    /**
     * 获取疾病详情
     */
    getDiseaseDetails(diseaseCode) {
        return this.diseases.get(diseaseCode);
    }

    /**
     * 获取检验项目详情
     */
    getLabTestDetails(labCode) {
        return this.labTests.get(labCode);
    }

    /**
     * 导出知识图谱
     */
    exportGraph() {
        return {
            entities: Object.fromEntries(this.entities),
            relations: Object.fromEntries(this.relations),
            statistics: {
                symptoms: this.symptoms.size,
                diseases: this.diseases.size,
                labTests: this.labTests.size,
                anatomies: this.anatomies.size,
                relations: this.relations.size
            }
        };
    }
}

// 导出单例
const medicalKnowledgeGraph = new MedicalKnowledgeGraph();
