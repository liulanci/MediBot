const LabTestsDatabase = {
    metadata: {
        totalTests: 500,
        categories: 8,
        version: '2.0',
        lastUpdated: '2024-01-15'
    },
    
    categories: {
        hematology: {
            name: '血液与体液检验',
            nameEn: 'Hematology Tests',
            icon: '🩸',
            items: [
                { id: 'CBC', code: 'HEM001', name: '血常规', nameEn: 'Complete Blood Count', specimen: '全血', price: '25', items: ['WBC', 'RBC', 'HGB', 'HCT', 'PLT', 'MCV', 'MCH', 'MCHC'] },
                { id: 'URINE', code: 'HEM002', name: '尿常规', nameEn: 'Urine Routine', specimen: '尿液', price: '20' },
                { id: 'STOOL', code: 'HEM003', name: '粪便常规+潜血', nameEn: 'Stool Routine+OB', specimen: '粪便', price: '15' },
                { id: 'COAG', code: 'HEM004', name: '凝血功能', nameEn: 'Coagulation Panel', specimen: '血浆', price: '120', items: ['PT', 'APTT', 'TT', 'FIB', 'INR', 'D_DIMER'] },
                { id: 'BG', code: 'HEM005', name: '血型鉴定', nameEn: 'Blood Group', specimen: '全血', price: '50', items: ['ABO', 'Rh', 'CROSS'] },
                { id: 'CSF', code: 'HEM006', name: '脑脊液检查', nameEn: 'CSF Analysis', specimen: '脑脊液', price: '80' },
                { id: 'BF', code: 'HEM007', name: '胸腹水检查', nameEn: 'Pleural/Ascites Fluid', specimen: '胸腹水', price: '60' },
                { id: 'BM', code: 'HEM008', name: '骨髓涂片', nameEn: 'Bone Marrow Smear', specimen: '骨髓', price: '150' }
            ]
        },
        
        biochemistry: {
            name: '生化检验',
            nameEn: 'Biochemistry Tests',
            icon: '🧪',
            items: [
                { id: 'LFT', code: 'BIO001', name: '肝功能', nameEn: 'Liver Function', specimen: '血清', price: '80', items: ['ALT', 'AST', 'ALP', 'GGT', 'TBIL', 'DBIL', 'ALB', 'TP', 'TBA'] },
                { id: 'RFT', code: 'BIO002', name: '肾功能', nameEn: 'Renal Function', specimen: '血清', price: '60', items: ['CREA', 'UREA', 'UA', 'CYSC', 'EGFR'] },
                { id: 'GLU', code: 'BIO003', name: '血糖', nameEn: 'Blood Glucose', specimen: '全血', price: '15', items: ['GLU_FASTING', 'GLU_RANDOM', 'HBA1C', 'GA'] },
                { id: 'LIPID', code: 'BIO004', name: '血脂', nameEn: 'Lipid Panel', specimen: '血清', price: '50', items: ['TC', 'TG', 'LDL_C', 'HDL_C', 'VLDL', 'APO_A', 'APO_B', 'LP_A'] },
                { id: 'ELEC', code: 'BIO005', name: '电解质', nameEn: 'Electrolytes', specimen: '血清', price: '30', items: ['NA', 'K', 'CL', 'CA', 'MG', 'P'] },
                { id: 'BGAS', code: 'BIO006', name: '血气分析', nameEn: 'Blood Gas', specimen: '动脉血', price: '80', items: ['PH', 'PCO2', 'PO2', 'HCO3', 'BE', 'SO2'] },
                { id: 'ENZY', code: 'BIO007', name: '心肌酶谱', nameEn: 'Cardiac Enzymes', specimen: '血清', price: '100', items: ['CK', 'CKMB', 'LDH', 'AST', 'TROP', 'NTPROBNP'] },
                { id: 'AMYL', code: 'BIO008', name: '胰酶', nameEn: 'Pancreatic Enzymes', specimen: '血清', price: '40', items: ['AMY', 'LIPASE'] },
                { id: 'METAB', code: 'BIO009', name: '代谢物', nameEn: 'Metabolites', specimen: '血清', price: '50', items: ['HCY', 'LACTATE', 'AMMONIA'] }
            ]
        },
        
        immunology: {
            name: '免疫检验',
            nameEn: 'Immunology Tests',
            icon: '🛡️',
            items: [
                { id: 'INF', code: 'IMM001', name: '感染标志物', nameEn: 'Infection Markers', specimen: '血清', price: '60', items: ['CRP', 'PCT', 'ESR', 'SAA'] },
                { id: 'HEP', code: 'IMM002', name: '肝炎标志物', nameEn: 'Hepatitis Markers', specimen: '血清', price: '120', items: ['HBSAG', 'HBSAB', 'HBEAG', 'HBEAB', 'HBCAB', 'HAVIGM', 'HEVIGM'] },
                { id: 'HIV', code: 'IMM003', name: 'HIV/梅毒', nameEn: 'HIV/Syphilis', specimen: '血清', price: '80', items: ['HIV_AB', 'HIV_AG', 'TPPA', 'RPR'] },
                { id: 'AUTO', code: 'IMM004', name: '自身抗体', nameEn: 'Autoantibodies', specimen: '血清', price: '200', items: ['ANA', 'DSDNA', 'ENA', 'ANCA', 'RF', 'ACCP'] },
                { id: 'TUMOR', code: 'IMM005', name: '肿瘤标志物', nameEn: 'Tumor Markers', specimen: '血清', price: '250', items: ['AFP', 'CEA', 'CA199', 'CA125', 'CA153', 'PSA', 'FPSA', 'CYFRA', 'NSE', 'SCC'] },
                { id: 'THY', code: 'IMM006', name: '甲状腺功能', nameEn: 'Thyroid Function', specimen: '血清', price: '120', items: ['TSH', 'FT3', 'FT4', 'TGAB', 'TPOAB'] },
                { id: 'IG', code: 'IMM007', name: '免疫球蛋白', nameEn: 'Immunoglobulins', specimen: '血清', price: '100', items: ['IGG', 'IGA', 'IGM', 'IGE', 'C3', 'C4'] },
                { id: 'ALLERGY', code: 'IMM008', name: '过敏原筛查', nameEn: 'Allergen Screen', specimen: '血清', price: '200', items: ['IGE_TOTAL', 'IGE_SPECIFIC'] }
            ]
        },
        
        microbiology: {
            name: '微生物检验',
            nameEn: 'Microbiology Tests',
            icon: '🦠',
            items: [
                { id: 'BC', code: 'MIC001', name: '细菌培养', nameEn: 'Bacterial Culture', specimen: '多标本', price: '80', items: ['BC_BLOOD', 'BC_URINE', 'BC_SPUTUM', 'BC_WOUND'] },
                { id: 'GC', code: 'MIC002', name: '真菌培养', nameEn: 'Fungal Culture', specimen: '多标本', price: '100' },
                { id: 'AFS', code: 'MIC003', name: '抗酸染色', nameEn: 'Acid-Fast Stain', specimen: '痰/尿', price: '30' },
                { id: 'TSPOT', code: 'MIC004', name: '结核感染T细胞检测', nameEn: 'T-SPOT.TB', specimen: '全血', price: '600' },
                { id: 'XPERTTB', code: 'MIC005', name: 'GeneXpert结核检测', nameEn: 'Xpert MTB/RIF', specimen: '痰', price: '400' },
                { id: 'HPV', code: 'MIC006', name: 'HPV DNA检测', nameEn: 'HPV DNA Test', specimen: '宫颈拭子', price: '300', items: ['HPV_28_TYPES', 'HPV_16_18'] },
                { id: 'NAAT', code: 'MIC007', name: '病原体核酸检测', nameEn: 'Pathogen NAAT', specimen: '多标本', price: '200', items: ['HBV_DNA', 'HCV_RNA', 'CMV_DNA', 'EBV_DNA', 'HSV_DNA'] },
                { id: 'MP', code: 'MIC008', name: '支原体/衣原体', nameEn: 'Mycoplasma/Chlamydia', specimen: '拭子', price: '150', items: ['MP_PCR', 'CT_PCR'] }
            ]
        },
        
        molecular: {
            name: '分子诊断',
            nameEn: 'Molecular Diagnostics',
            icon: '🧬',
            items: [
                { id: 'EGFR', code: 'MOL001', name: 'EGFR基因突变', nameEn: 'EGFR Mutation', specimen: '组织/血液', price: '3000' },
                { id: 'KRAS', code: 'MOL002', name: 'KRAS基因突变', nameEn: 'KRAS Mutation', specimen: '组织', price: '2500' },
                { id: 'ALK', code: 'MOL003', name: 'ALK融合基因', nameEn: 'ALK Rearrangement', specimen: '组织', price: '2800' },
                { id: 'CYP', code: 'MOL004', name: '药物代谢基因', nameEn: 'Drug Metabolism Genes', specimen: '全血', price: '800', items: ['CYP2C19', 'VKORC1', 'CYP2D6'] },
                { id: 'MSI', code: 'MOL005', name: '微卫星不稳定性', nameEn: 'MSI Testing', specimen: '组织', price: '2000' },
                { id: 'NIPT', code: 'MOL006', name: '无创产前检测', nameEn: 'Non-Invasive Prenatal Test', specimen: '孕妇血浆', price: '2500' },
                { id: 'WES', code: 'MOL007', name: '全外显子组测序', nameEn: 'Whole Exome Sequencing', specimen: '全血', price: '8000' },
                { id: 'CMA', code: 'MOL008', name: '染色体微阵列', nameEn: 'Chromosomal Microarray', specimen: '全血', price: '3500' }
            ]
        },
        
        endocrinology: {
            name: '内分泌检验',
            nameEn: 'Endocrinology Tests',
            icon: '⚖️',
            items: [
                { id: 'THYROID', code: 'END001', name: '甲状腺功能全套', nameEn: 'Complete Thyroid Panel', specimen: '血清', price: '200', items: ['TSH', 'FT3', 'FT4', 'TT3', 'TT4', 'TGAB', 'TPOAB', 'TG'] },
                { id: 'SEX', code: 'END002', name: '性激素', nameEn: 'Sex Hormones', specimen: '血清', price: '250', items: ['FSH', 'LH', 'E2', 'P', 'T', 'PRL', 'AMH', 'INHB'] },
                { id: 'ADRENAL', code: 'END003', name: '肾上腺激素', nameEn: 'Adrenal Hormones', specimen: '血清/尿', price: '300', items: ['CORTISOL', 'ACTH', 'ALD', 'RENIN'] },
                { id: 'DIAB', code: 'END004', name: '糖尿病相关', nameEn: 'Diabetes Panel', specimen: '血清', price: '150', items: ['GLU_FASTING', 'GLU_2H', 'HBA1C', 'GA', 'CPEP', 'INSULIN'] },
                { id: 'BONE', code: 'END005', name: '骨代谢', nameEn: 'Bone Metabolism', specimen: '血清/尿', price: '200', items: ['CALCIUM', 'PHOSPHORUS', 'ALP_BONE', 'OSTEOCALCIN', 'CTX', '25OH_VITD', 'PTH'] },
                { id: 'GH', code: 'END006', name: '生长相关', nameEn: 'Growth Related', specimen: '血清', price: '180', items: ['GH', 'IGF1', 'IGFBP3'] }
            ]
        },
        
        bloodProducts: {
            name: '输血相关',
            nameEn: 'Blood Banking',
            icon: '💉',
            items: [
                { id: 'TYPE', code: 'BLD001', name: '血型鉴定全套', nameEn: 'Blood Type Panel', specimen: '全血', price: '80', items: ['ABO', 'Rh', 'MN', 'P', 'KELL'] },
                { id: 'CROSS', code: 'BLD002', name: '交叉配血', nameEn: 'Crossmatch', specimen: '全血', price: '60' },
                { id: 'COOMBS', code: 'BLD003', name: 'Coombs试验', nameEn: 'Coombs Test', specimen: '全血', price: '80', items: ['COOMBS_DIRECT', 'COOMBS_INDIRECT'] },
                { id: 'ANTIBODY', code: 'BLD004', name: '不规则抗体筛查', nameEn: 'Irregular Antibody Screen', specimen: '全血', price: '120' }
            ]
        },
        
        specialized: {
            name: '特殊检验',
            nameEn: 'Specialized Tests',
            icon: '🔬',
            items: [
                { id: 'AUTOIMMUNE', code: 'SPE001', name: '自身免疫病', nameEn: 'Autoimmune Disease', specimen: '血清', price: '500', items: ['ANA_IF', 'ANA_PROFILE', 'AIPSA', 'AQP4'] },
                { id: 'CEREBROSPINAL', code: 'SPE002', name: '脑脊液专项', nameEn: 'CSF Special', specimen: '脑脊液', price: '400', items: ['CSF_OB', 'CSF_MBP', 'CSF_OLIGOCLONAL'] },
                { id: 'NEUROIMMUNE', code: 'SPE003', name: '神经免疫', nameEn: 'Neuroimmune', specimen: '血清/CSF', price: '600', items: ['NMDA_R', 'LGI1', 'GBS_M', 'MG_R'] },
                { id: 'TOXICOLOGY', code: 'SPE004', name: '毒物药物监测', nameEn: 'Toxicology/TDM', specimen: '血/尿', price: '300', items: ['HEAVY_METALS', 'DRUG_SCREEN', 'LITHIUM', 'CYCLOSPORIN'] },
                { id: 'GENETIC', code: 'SPE005', name: '遗传代谢', nameEn: 'Genetic/Metabolic', specimen: '血/尿', price: '800', items: ['AMINO_ACIDS', 'ORGANIC_ACIDS', 'FATTY_ACIDS'] },
                { id: 'FERTILITY', code: 'SPE006', name: '生殖相关', nameEn: 'Fertility', specimen: '多标本', price: '600', items: ['SPERM', 'ANTISPERM_AB', 'EMBRYO_FACTOR'] }
            ]
        }
    },
    
    testDetails: {
        CBC: {
            name: '血常规', nameEn: 'Complete Blood Count', nameLatin: 'Numerus Sanguinis Completus',
            specimen: '全血', container: '紫头管(EDTA)', volume: '2mL', turnaround: '30分钟', price: '25',
            items: {
                WBC: { name: '白细胞计数', nameEn: 'WBC Count', unit: '×10⁹/L', ref: { general: { min: 3.5, max: 9.5 } }, significance: '感染/炎症/白血病' },
                RBC: { name: '红细胞计数', nameEn: 'RBC Count', unit: '×10¹²/L', ref: { male: { min: 4.3, max: 5.8 }, female: { min: 3.8, max: 5.1 } }, significance: '贫血/红细胞增多' },
                HGB: { name: '血红蛋白', nameEn: 'Hemoglobin', unit: 'g/L', ref: { male: { min: 130, max: 175 }, female: { min: 115, max: 150 } }, significance: '贫血诊断' },
                HCT: { name: '红细胞压积', nameEn: 'Hematocrit', unit: '%', ref: { male: { min: 40, max: 50 }, female: { min: 35, max: 45 } }, significance: '血液浓缩评估' },
                PLT: { name: '血小板计数', nameEn: 'Platelet Count', unit: '×10⁹/L', ref: { general: { min: 125, max: 350 } }, significance: '出血/血栓风险' },
                MCV: { name: '平均红细胞体积', nameEn: 'MCV', unit: 'fL', ref: { general: { min: 80, max: 100 } }, significance: '贫血分类' },
                MCH: { name: '平均红细胞血红蛋白量', nameEn: 'MCH', unit: 'pg', ref: { general: { min: 27, max: 34 } }, significance: '贫血分类' },
                MCHC: { name: '平均红细胞血红蛋白浓度', nameEn: 'MCHC', unit: 'g/L', ref: { general: { min: 316, max: 354 } }, significance: '溶血评估' }
            }
        },
        LFT: {
            name: '肝功能', nameEn: 'Liver Function Tests', nameLatin: 'Probationes Functionis Hepatis',
            specimen: '血清', container: '黄头管', volume: '4mL', turnaround: '60分钟', price: '80',
            items: {
                ALT: { name: '丙氨酸氨基转移酶', nameEn: 'ALT', unit: 'U/L', ref: { male: { min: 9, max: 50 }, female: { min: 7, max: 40 } }, significance: '肝细胞损伤最敏感指标' },
                AST: { name: '天门冬氨酸氨基转移酶', nameEn: 'AST', unit: 'U/L', ref: { male: { min: 15, max: 40 }, female: { min: 13, max: 35 } }, significance: '肝炎/心梗/肌病' },
                ALP: { name: '碱性磷酸酶', nameEn: 'ALP', unit: 'U/L', ref: { male: { min: 45, max: 125 }, female: { min: 35, max: 100 } }, significance: '胆道/骨病/妊娠' },
                GGT: { name: 'γ-谷氨酰转移酶', nameEn: 'GGT', unit: 'U/L', ref: { male: { min: 10, max: 60 }, female: { min: 7, max: 45 } }, significance: '酒精肝/胆道疾病' },
                TBIL: { name: '总胆红素', nameEn: 'Total Bilirubin', unit: 'μmol/L', ref: { general: { min: 3.4, max: 20.5 } }, significance: '黄疸评估' },
                DBIL: { name: '直接胆红素', nameEn: 'Direct Bilirubin', unit: 'μmol/L', ref: { general: { min: 0, max: 6.8 } }, significance: '梗阻性黄疸' },
                ALB: { name: '白蛋白', nameEn: 'Albumin', unit: 'g/L', ref: { general: { min: 35, max: 50 } }, significance: '营养/肝功能' },
                TP: { name: '总蛋白', nameEn: 'Total Protein', unit: 'g/L', ref: { general: { min: 60, max: 80 } }, significance: '营养状态' },
                TBA: { name: '总胆汁酸', nameEn: 'Total Bile Acid', unit: 'μmol/L', ref: { general: { min: 0, max: 10 } }, significance: '肝功能敏感指标' }
            }
        },
        RFT: {
            name: '肾功能', nameEn: 'Renal Function Tests', nameLatin: 'Probationes Functionis Renis',
            specimen: '血清', container: '黄头管', volume: '3mL', turnaround: '60分钟', price: '60',
            items: {
                CREA: { name: '肌酐', nameEn: 'Creatinine', unit: 'μmol/L', ref: { male: { min: 62, max: 115 }, female: { min: 53, max: 97 } }, significance: '肾小球滤过功能' },
                UREA: { name: '尿素氮', nameEn: 'BUN', unit: 'mmol/L', ref: { general: { min: 2.6, max: 7.5 } }, significance: '肾功能/氮质血症' },
                UA: { name: '尿酸', nameEn: 'Uric Acid', unit: 'μmol/L', ref: { male: { min: 208, max: 428 }, female: { min: 155, max: 357 } }, significance: '痛风/肾功能' },
                CYSC: { name: '胱抑素C', nameEn: 'Cystatin C', unit: 'mg/L', ref: { general: { min: 0.5, max: 1.25 } }, significance: '早期肾功能损害' },
                EGFR: { name: '估算肾小球滤过率', nameEn: 'eGFR', unit: 'mL/min/1.73m²', ref: { general: { min: 90, max: 120 } }, significance: '慢性肾病分期' }
            }
        },
        COAG: {
            name: '凝血功能', nameEn: 'Coagulation Tests', nameLatin: 'Probationes Coagulationis',
            specimen: '血浆', container: '蓝头管(枸橼酸钠)', volume: '2.7mL', turnaround: '60分钟', price: '120',
            items: {
                PT: { name: '凝血酶原时间', nameEn: 'Prothrombin Time', unit: '秒', ref: { general: { min: 11.0, max: 14.0 } }, significance: '外源性凝血' },
                APTT: { name: '活化部分凝血活酶时间', nameEn: 'APTT', unit: '秒', ref: { general: { min: 28.0, max: 40.0 } }, significance: '内源性凝血' },
                TT: { name: '凝血酶时间', nameEn: 'Thrombin Time', unit: '秒', ref: { general: { min: 14.0, max: 21.0 } }, significance: '纤维蛋白原' },
                FIB: { name: '纤维蛋白原', nameEn: 'Fibrinogen', unit: 'g/L', ref: { general: { min: 2.0, max: 4.0 } }, significance: '炎症/凝血' },
                INR: { name: '国际标准化比值', nameEn: 'INR', unit: '', ref: { general: { min: 0.8, max: 1.2 } }, significance: '抗凝监测' },
                D_DIMER: { name: 'D-二聚体', nameEn: 'D-Dimer', unit: 'mg/L', ref: { general: { min: 0, max: 0.55 } }, significance: '血栓排除/DIC' }
            }
        },
        GLU: {
            name: '血糖及糖化', nameEn: 'Glucose & Glycated Hemoglobin', nameLatin: 'Glucosa et HbA1c',
            specimen: '全血/血清', container: '灰头管/黄头管', volume: '2mL', turnaround: '30分钟', price: '40',
            items: {
                GLU_FASTING: { name: '空腹血糖', nameEn: 'Fasting Glucose', unit: 'mmol/L', ref: { normal: { max: 6.1 }, prediabetes: { min: 6.1, max: 7.0 }, diabetes: { min: 7.0 } }, significance: '糖尿病诊断' },
                GLU_RANDOM: { name: '随机血糖', nameEn: 'Random Glucose', unit: 'mmol/L', ref: { diabetes: { min: 11.1 } }, significance: '糖尿病诊断' },
                HBA1C: { name: '糖化血红蛋白', nameEn: 'HbA1c', unit: '%', ref: { normal: { max: 6.0 }, prediabetes: { min: 6.0, max: 6.5 }, diabetes: { min: 6.5 } }, significance: '近2-3月血糖控制' },
                GA: { name: '糖化白蛋白', nameEn: 'Glycated Albumin', unit: '%', ref: { general: { min: 11, max: 17 } }, significance: '近2-3周血糖控制' }
            }
        },
        LIPID: {
            name: '血脂', nameEn: 'Lipid Panel', nameLatin: 'Examen Lipidorum',
            specimen: '血清', container: '黄头管(空腹)', volume: '3mL', turnaround: '60分钟', price: '50',
            items: {
                TC: { name: '总胆固醇', nameEn: 'Total Cholesterol', unit: 'mmol/L', ref: { optimal: { max: 5.18 }, borderline: { min: 5.18, max: 6.21 }, high: { min: 6.21 } }, significance: '心血管风险' },
                TG: { name: '甘油三酯', nameEn: 'Triglycerides', unit: 'mmol/L', ref: { normal: { max: 1.7 }, borderline: { min: 1.7, max: 2.3 }, high: { min: 2.3 } }, significance: '心血管风险/胰腺炎' },
                LDL_C: { name: '低密度脂蛋白', nameEn: 'LDL-C', unit: 'mmol/L', ref: { optimal: { max: 2.6 }, near_optimal: { min: 2.6, max: 3.3 }, borderline: { min: 3.3, max: 4.1 }, high: { min: 4.1 } }, significance: '动脉粥样硬化主因' },
                HDL_C: { name: '高密度脂蛋白', nameEn: 'HDL-C', unit: 'mmol/L', ref: { male: { min: 1.16, max: 1.42 }, female: { min: 1.29, max: 1.55 } }, significance: '抗动脉粥样硬化' }
            }
        },
        TUMOR: {
            name: '肿瘤标志物', nameEn: 'Tumor Markers', nameLatin: 'Indicatorii Tumorii',
            specimen: '血清', container: '黄头管', volume: '4mL', turnaround: '次日出结果', price: '250',
            items: {
                AFP: { name: '甲胎蛋白', nameEn: 'AFP', unit: 'ng/mL', ref: { general: { min: 0, max: 25 } }, significance: '肝癌/生殖细胞肿瘤' },
                CEA: { name: '癌胚抗原', nameEn: 'CEA', unit: 'ng/mL', ref: { general: { min: 0, max: 5 } }, significance: '消化道肿瘤/肺癌' },
                CA199: { name: 'CA19-9', nameEn: 'CA19-9', unit: 'U/mL', ref: { general: { min: 0, max: 37 } }, significance: '胰腺癌/胆管癌' },
                CA125: { name: 'CA125', nameEn: 'CA125', unit: 'U/mL', ref: { general: { min: 0, max: 35 } }, significance: '卵巢癌/子宫内膜癌' },
                CA153: { name: 'CA15-3', nameEn: 'CA15-3', unit: 'U/mL', ref: { general: { min: 0, max: 25 } }, significance: '乳腺癌' },
                PSA: { name: '前列腺特异抗原', nameEn: 'PSA', unit: 'ng/mL', ref: { general: { min: 0, max: 4.0 } }, significance: '前列腺癌' },
                CYFRA: { name: '细胞角蛋白19片段', nameEn: 'CYFRA21-1', unit: 'ng/mL', ref: { general: { min: 0, max: 3.3 } }, significance: '非小细胞肺癌' },
                NSE: { name: '神经元特异性烯醇化酶', nameEn: 'NSE', unit: 'ng/mL', ref: { general: { min: 0, max: 16.3 } }, significance: '小细胞肺癌/神经内分泌肿瘤' }
            }
        },
        THYROID: {
            name: '甲状腺功能', nameEn: 'Thyroid Function', nameLatin: 'Functiones Thyroideae',
            specimen: '血清', container: '黄头管', volume: '3mL', turnaround: '60分钟', price: '120',
            items: {
                TSH: { name: '促甲状腺激素', nameEn: 'TSH', unit: 'mIU/L', ref: { general: { min: 0.27, max: 4.2 } }, significance: '甲状腺功能筛查' },
                FT3: { name: '游离三碘甲腺原氨酸', nameEn: 'Free T3', unit: 'pmol/L', ref: { general: { min: 3.1, max: 6.8 } }, significance: '甲状腺功能' },
                FT4: { name: '游离甲状腺素', nameEn: 'Free T4', unit: 'pmol/L', ref: { general: { min: 12, max: 22 } }, significance: '甲状腺功能' },
                TGAB: { name: '甲状腺球蛋白抗体', nameEn: 'Anti-Tg', unit: 'IU/mL', ref: { general: { min: 0, max: 115 } }, significance: '自身免疫性甲状腺炎' },
                TPOAB: { name: '甲状腺过氧化物酶抗体', nameEn: 'Anti-TPO', unit: 'IU/mL', ref: { general: { min: 0, max: 34 } }, significance: '自身免疫性甲状腺炎' }
            }
        }
    }
};

if (typeof window !== 'undefined') {
    window.LabTestsDatabase = LabTestsDatabase;
}
