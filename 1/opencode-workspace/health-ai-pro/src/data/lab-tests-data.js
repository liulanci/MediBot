/**
 * 检验项目数据库
 * 包含所有可检验的项目及其参考值、计量单位
 */

const LabTestsDatabase = {
    // 血液学检验
    hematology: {
        name: '血液学检验',
        nameEn: 'Hematology Tests',
        items: [
            {
                code: 'HGB',
                name: '血红蛋白',
                nameEn: 'Hemoglobin',
                nameLatin: 'Hemoglobinum',
                units: [
                    { value: 'g/L', name: 'g/L (国际单位)', si: true },
                    { value: 'g/dL', name: 'g/dL (传统单位)', si: false, convert: 10 }
                ],
                reference: {
                    male: { low: 130, high: 175 },
                    female: { low: 115, high: 150 },
                    child: { low: 110, high: 160 }
                }
            },
            {
                code: 'WBC',
                name: '白细胞计数',
                nameEn: 'White Blood Cell Count',
                nameLatin: 'Numerus Leucocytorum',
                units: [
                    { value: '×10⁹/L', name: '×10⁹/L (国际单位)', si: true },
                    { value: '/μL', name: '/μL (传统单位)', si: false, convert: 1000 }
                ],
                reference: { general: { low: 4.0, high: 10.0 } }
            },
            {
                code: 'RBC',
                name: '红细胞计数',
                nameEn: 'Red Blood Cell Count',
                nameLatin: 'Numerus Erythrocytorum',
                units: [
                    { value: '×10¹²/L', name: '×10¹²/L (国际单位)', si: true },
                    { value: '×10⁶/μL', name: '×10⁶/μL (传统单位)', si: false, convert: 1000 }
                ],
                reference: {
                    male: { low: 4.3, high: 5.8 },
                    female: { low: 3.8, high: 5.1 }
                }
            },
            {
                code: 'PLT',
                name: '血小板计数',
                nameEn: 'Platelet Count',
                nameLatin: 'Numerus Thrombocytorum',
                units: [
                    { value: '×10⁹/L', name: '×10⁹/L (国际单位)', si: true },
                    { value: '/μL', name: '/μL (传统单位)', si: false, convert: 1000 }
                ],
                reference: { general: { low: 100, high: 300 } }
            },
            {
                code: 'HCT',
                name: '红细胞压积',
                nameEn: 'Hematocrit',
                nameLatin: 'Haematocritus',
                units: [
                    { value: '%', name: '%', si: true },
                    { value: 'L/L', name: 'L/L', si: true }
                ],
                reference: {
                    male: { low: 0.40, high: 0.50 },
                    female: { low: 0.37, high: 0.48 }
                }
            },
            {
                code: 'MCV',
                name: '平均红细胞体积',
                nameEn: 'Mean Corpuscular Volume',
                nameLatin: 'Volumen Medium Erythrocyti',
                units: [
                    { value: 'fL', name: 'fL', si: true }
                ],
                reference: { general: { low: 80, high: 100 } }
            },
            {
                code: 'MCH',
                name: '平均红细胞血红蛋白量',
                nameEn: 'Mean Corpuscular Hemoglobin',
                nameLatin: 'Hemoglobinum Medium Erythrocyti',
                units: [
                    { value: 'pg', name: 'pg', si: true }
                ],
                reference: { general: { low: 27, high: 34 } }
            },
            {
                code: 'MCHC',
                name: '平均红细胞血红蛋白浓度',
                nameEn: 'MCHC',
                nameLatin: 'Concentratio Hemoglobini Media',
                units: [
                    { value: 'g/L', name: 'g/L', si: true }
                ],
                reference: { general: { low: 320, high: 360 } }
            },
            {
                code: 'RDW',
                name: '红细胞分布宽度',
                nameEn: 'Red Cell Distribution Width',
                nameLatin: 'Latitudo Distributionis Erythrocytorum',
                units: [
                    { value: '%', name: '%', si: true }
                ],
                reference: { general: { low: 11.5, high: 14.5 } }
            },
            {
                code: 'MPV',
                name: '平均血小板体积',
                nameEn: 'Mean Platelet Volume',
                nameLatin: 'Volumen Medium Thrombocyti',
                units: [
                    { value: 'fL', name: 'fL', si: true }
                ],
                reference: { general: { low: 6.5, high: 13.0 } }
            }
        ]
    },
    
    // 血糖与代谢
    glucose: {
        name: '血糖与代谢',
        nameEn: 'Glucose & Metabolism',
        items: [
            {
                code: 'GLU',
                name: '空腹血糖',
                nameEn: 'Fasting Glucose',
                nameLatin: 'Glucosa Ieiuna',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0555 }
                ],
                reference: { general: { low: 3.9, high: 6.1 } }
            },
            {
                code: 'GLU_R',
                name: '随机血糖',
                nameEn: 'Random Glucose',
                nameLatin: 'Glucosa Casu Radomica',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0555 }
                ],
                reference: { general: { low: 0, high: 7.8 } }
            },
            {
                code: 'GLU_2H',
                name: '餐后2小时血糖',
                nameEn: '2-Hour Postprandial Glucose',
                nameLatin: 'Glucosa Postprandialis 2 Horarum',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0555 }
                ],
                reference: { general: { low: 0, high: 7.8 }, diabetic: { low: 0, high: 11.1 } }
            },
            {
                code: 'HbA1c',
                name: '糖化血红蛋白',
                nameEn: 'Hemoglobin A1c',
                nameLatin: 'Haemoglobinum A1c',
                units: [
                    { value: '%', name: '% (DCCT)', si: true },
                    { value: 'mmol/mol', name: 'mmol/mol (IFCC)', si: true }
                ],
                reference: { 
                    normal: { low: 4.0, high: 5.6 }, 
                    prediabetes: { low: 5.7, high: 6.4 },
                    diabetes: { low: 6.5, high: 99 }
                }
            },
            {
                code: 'GA',
                name: '糖化白蛋白',
                nameEn: 'Glycated Albumin',
                nameLatin: 'Albuminum Glycosylatum',
                units: [
                    { value: '%', name: '%', si: true }
                ],
                reference: { general: { low: 11, high: 16 } }
            }
        ]
    },
    
    // 肝功能
    liver: {
        name: '肝功能',
        nameEn: 'Liver Function',
        items: [
            {
                code: 'ALT',
                name: '谷丙转氨酶',
                nameEn: 'Alanine Aminotransferase',
                nameLatin: 'Alanini Aminotransferasis',
                units: [
                    { value: 'U/L', name: 'U/L', si: true },
                    { value: 'μkat/L', name: 'μkat/L', si: true, convert: 0.0167 }
                ],
                reference: {
                    male: { low: 9, high: 50 },
                    female: { low: 7, high: 40 }
                }
            },
            {
                code: 'AST',
                name: '谷草转氨酶',
                nameEn: 'Aspartate Aminotransferase',
                nameLatin: 'Aspartati Aminotransferasis',
                units: [
                    { value: 'U/L', name: 'U/L', si: true },
                    { value: 'μkat/L', name: 'μkat/L', si: true, convert: 0.0167 }
                ],
                reference: {
                    male: { low: 15, high: 40 },
                    female: { low: 13, high: 35 }
                }
            },
            {
                code: 'ALP',
                name: '碱性磷酸酶',
                nameEn: 'Alkaline Phosphatase',
                nameLatin: 'Phosphatasis Alkalina',
                units: [
                    { value: 'U/L', name: 'U/L', si: true }
                ],
                reference: { adult: { low: 45, high: 125 } }
            },
            {
                code: 'GGT',
                name: '谷氨酰转肽酶',
                nameEn: 'Gamma-Glutamyl Transferase',
                nameLatin: 'Gamma-Glutamyl Transferasis',
                units: [
                    { value: 'U/L', name: 'U/L', si: true }
                ],
                reference: {
                    male: { low: 10, high: 60 },
                    female: { low: 7, high: 45 }
                }
            },
            {
                code: 'TBIL',
                name: '总胆红素',
                nameEn: 'Total Bilirubin',
                nameLatin: 'Bilirubinum Totale',
                units: [
                    { value: 'μmol/L', name: 'μmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 17.1 }
                ],
                reference: { general: { low: 5.1, high: 22.2 } }
            },
            {
                code: 'DBIL',
                name: '直接胆红素',
                nameEn: 'Direct Bilirubin',
                nameLatin: 'Bilirubinum Directum',
                units: [
                    { value: 'μmol/L', name: 'μmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 17.1 }
                ],
                reference: { general: { low: 0, high: 6.8 } }
            },
            {
                code: 'ALB',
                name: '白蛋白',
                nameEn: 'Albumin',
                nameLatin: 'Albuminum',
                units: [
                    { value: 'g/L', name: 'g/L (国际单位)', si: true },
                    { value: 'g/dL', name: 'g/dL (传统单位)', si: false, convert: 10 }
                ],
                reference: { general: { low: 40, high: 55 } }
            },
            {
                code: 'TP',
                name: '总蛋白',
                nameEn: 'Total Protein',
                nameLatin: 'Proteinum Totale',
                units: [
                    { value: 'g/L', name: 'g/L (国际单位)', si: true },
                    { value: 'g/dL', name: 'g/dL (传统单位)', si: false, convert: 10 }
                ],
                reference: { general: { low: 65, high: 85 } }
            }
        ]
    },
    
    // 肾功能
    kidney: {
        name: '肾功能',
        nameEn: 'Kidney Function',
        items: [
            {
                code: 'CREA',
                name: '肌酐',
                nameEn: 'Creatinine',
                nameLatin: 'Creatininum',
                units: [
                    { value: 'μmol/L', name: 'μmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 88.4 },
                    { value: 'mg/L', name: 'mg/L', si: false, convert: 1000 }
                ],
                reference: {
                    male: { low: 62, high: 115 },
                    female: { low: 53, high: 97 }
                }
            },
            {
                code: 'BUN',
                name: '尿素氮',
                nameEn: 'Blood Urea Nitrogen',
                nameLatin: 'Urea Nitrogenium',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.357 }
                ],
                reference: { general: { low: 2.6, high: 7.5 } }
            },
            {
                code: 'UA',
                name: '尿酸',
                nameEn: 'Uric Acid',
                nameLatin: 'Acidum Uricum',
                units: [
                    { value: 'μmol/L', name: 'μmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 59.5 }
                ],
                reference: {
                    male: { low: 208, high: 428 },
                    female: { low: 155, high: 357 }
                }
            },
            {
                code: 'eGFR',
                name: '估算肾小球滤过率',
                nameEn: 'eGFR',
                nameLatin: 'Rationis Filtri Glomerularis Estimata',
                units: [
                    { value: 'mL/min/1.73m²', name: 'mL/min/1.73m²', si: true }
                ],
                reference: {
                    normal: { low: 90, high: 999 },
                    mild: { low: 60, high: 89 },
                    moderate: { low: 30, high: 59 },
                    severe: { low: 15, high: 29 },
                    kidney_failure: { low: 0, high: 14 }
                }
            }
        ]
    },
    
    // 血脂
    lipid: {
        name: '血脂',
        nameEn: 'Lipid Profile',
        items: [
            {
                code: 'TC',
                name: '总胆固醇',
                nameEn: 'Total Cholesterol',
                nameLatin: 'Cholesterolum Totale',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0259 }
                ],
                reference: {
                    optimal: { low: 0, high: 5.18 },
                    borderline: { low: 5.18, high: 6.21 },
                    high: { low: 6.21, high: 999 }
                }
            },
            {
                code: 'TG',
                name: '甘油三酯',
                nameEn: 'Triglyceride',
                nameLatin: 'Triglyceridum',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0113 }
                ],
                reference: {
                    normal: { low: 0, high: 1.7 },
                    borderline: { low: 1.7, high: 2.3 },
                    high: { low: 2.3, high: 5.6 },
                    very_high: { low: 5.6, high: 999 }
                }
            },
            {
                code: 'HDL',
                name: '高密度脂蛋白',
                nameEn: 'HDL Cholesterol',
                nameLatin: 'Cholesterolum Lipoproteini Densi',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0259 }
                ],
                reference: {
                    male: { low: 1.04, high: 999 },
                    female: { low: 1.30, high: 999 }
                }
            },
            {
                code: 'LDL',
                name: '低密度脂蛋白',
                nameEn: 'LDL Cholesterol',
                nameLatin: 'Cholesterolum Lipoproteini Densi Minoris',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0259 }
                ],
                reference: {
                    optimal: { low: 0, high: 2.59 },
                    near_optimal: { low: 2.59, high: 3.34 },
                    borderline: { low: 3.34, high: 4.13 },
                    high: { low: 4.13, high: 4.89 },
                    very_high: { low: 4.89, high: 999 }
                }
            },
            {
                code: 'VLDL',
                name: '极低密度脂蛋白',
                nameEn: 'VLDL Cholesterol',
                nameLatin: 'Cholesterolum VLDL',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.0259 }
                ],
                reference: { general: { low: 0.1, high: 0.9 } }
            }
        ]
    },
    
    // 电解质
    electrolyte: {
        name: '电解质',
        nameEn: 'Electrolytes',
        items: [
            {
                code: 'K',
                name: '钾',
                nameEn: 'Potassium',
                nameLatin: 'Kalium',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mEq/L', name: 'mEq/L', si: true, convert: 1 }
                ],
                reference: { general: { low: 3.5, high: 5.5 } }
            },
            {
                code: 'NA',
                name: '钠',
                nameEn: 'Sodium',
                nameLatin: 'Natrium',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mEq/L', name: 'mEq/L', si: true, convert: 1 }
                ],
                reference: { general: { low: 135, high: 145 } }
            },
            {
                code: 'CL',
                name: '氯',
                nameEn: 'Chloride',
                nameLatin: 'Chloridum',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mEq/L', name: 'mEq/L', si: true, convert: 1 }
                ],
                reference: { general: { low: 96, high: 106 } }
            },
            {
                code: 'CA',
                name: '钙',
                nameEn: 'Calcium',
                nameLatin: 'Calcium',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.25 }
                ],
                reference: { general: { low: 2.1, high: 2.6 } }
            },
            {
                code: 'MG',
                name: '镁',
                nameEn: 'Magnesium',
                nameLatin: 'Magnesium',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.411 }
                ],
                reference: { general: { low: 0.7, high: 1.1 } }
            },
            {
                code: 'P',
                name: '磷',
                nameEn: 'Phosphorus',
                nameLatin: 'Phosphorus',
                units: [
                    { value: 'mmol/L', name: 'mmol/L (国际单位)', si: true },
                    { value: 'mg/dL', name: 'mg/dL (传统单位)', si: false, convert: 0.323 }
                ],
                reference: { adult: { low: 0.8, high: 1.5 } }
            }
        ]
    },
    
    // 甲状腺功能
    thyroid: {
        name: '甲状腺功能',
        nameEn: 'Thyroid Function',
        items: [
            {
                code: 'TSH',
                name: '促甲状腺激素',
                nameEn: 'Thyroid Stimulating Hormone',
                nameLatin: 'Thyrotropinum',
                units: [
                    { value: 'mIU/L', name: 'mIU/L (国际单位)', si: true },
                    { value: 'μIU/mL', name: 'μIU/mL', si: false, convert: 1 }
                ],
                reference: { general: { low: 0.3, high: 4.5 } }
            },
            {
                code: 'FT3',
                name: '游离三碘甲状腺原氨酸',
                nameEn: 'Free T3',
                nameLatin: 'Thyroxinum Liberum T3',
                units: [
                    { value: 'pmol/L', name: 'pmol/L (国际单位)', si: true },
                    { value: 'pg/mL', name: 'pg/mL', si: false, convert: 1.536 }
                ],
                reference: { general: { low: 3.5, high: 6.5 } }
            },
            {
                code: 'FT4',
                name: '游离甲状腺素',
                nameEn: 'Free T4',
                nameLatin: 'Thyroxinum Liberum T4',
                units: [
                    { value: 'pmol/L', name: 'pmol/L (国际单位)', si: true },
                    { value: 'ng/dL', name: 'ng/dL', si: false, convert: 12.87 }
                ],
                reference: { general: { low: 11.5, high: 23.5 } }
            },
            {
                code: 'T3',
                name: '三碘甲状腺原氨酸',
                nameEn: 'T3',
                nameLatin: 'Triiodothyroninum',
                units: [
                    { value: 'nmol/L', name: 'nmol/L (国际单位)', si: true },
                    { value: 'ng/dL', name: 'ng/dL', si: false, convert: 65.1 }
                ],
                reference: { general: { low: 1.3, high: 3.1 } }
            },
            {
                code: 'T4',
                name: '甲状腺素',
                nameEn: 'T4',
                nameLatin: 'Thyroxinum',
                units: [
                    { value: 'nmol/L', name: 'nmol/L (国际单位)', si: true },
                    { value: 'μg/dL', name: 'μg/dL', si: false, convert: 12.87 }
                ],
                reference: { general: { low: 66, high: 181 } }
            }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LabTestsDatabase;
}
