const LabTestsDatabase = {
    categories: {
        hematology: {
            name: '血液与体液检验',
            nameEn: 'Hematology and Body Fluid Tests',
            nameLatin: 'Examinationes Haematologiae et Liquidorum Corporis',
            icon: '🩸',
            items: [
                {
                    id: 'CBC',
                    code: 'LAB001',
                    name: '血常规',
                    nameEn: 'Complete Blood Count',
                    nameLatin: 'Numerus Sanguinis Completus',
                    nameAbbr: 'CBC',
                    namePinyin: 'xue changgui',
                    specimen: '全血',
                    specimenEn: 'Whole Blood',
                    specimenLatin: 'Sanguis Totus',
                    container: '紫头管(EDTA)',
                    containerEn: 'Purple Top Tube (EDTA)',
                    volume: '2mL',
                    turnaround: '30分钟',
                    turnaroundEn: '30 minutes',
                    price: '25',
                    unit: '',
                    referenceRange: '',
                    referenceRanges: {
                        male: {},
                        female: {},
                        child: {},
                        general: {}
                    },
                    items: [
                        {
                            id: 'WBC',
                            name: '白细胞计数',
                            nameEn: 'White Blood Cell Count',
                            nameLatin: 'Numerus Leucocytorum',
                            namePinyin: 'baixibao jishu',
                            unit: '×10⁹/L',
                            referenceRanges: {
                                male: { min: 3.5, max: 9.5 },
                                female: { min: 3.5, max: 9.5 },
                                child: { min: 5.0, max: 12.0 },
                                general: { min: 3.5, max: 9.5 }
                            },
                            clinicalSignificance: '升高提示感染、白血病等；降低提示骨髓抑制、免疫缺陷等',
                            clinicalSignificanceEn: 'Elevated suggests infection, leukemia; Decreased suggests bone marrow suppression, immunodeficiency',
                            clinicalSignificanceLatin: 'Elevatio indicat infectionem, leucaemiam; Decrepitatio indicat suppressionem medullae, immunodeficientiam'
                        },
                        {
                            id: 'RBC',
                            name: '红细胞计数',
                            nameEn: 'Red Blood Cell Count',
                            nameLatin: 'Numerus Erythrocytorum',
                            namePinyin: 'hongxibao jishu',
                            unit: '×10¹²/L',
                            referenceRanges: {
                                male: { min: 4.3, max: 5.8 },
                                female: { min: 3.8, max: 5.1 },
                                child: { min: 4.0, max: 5.5 },
                                general: { min: 4.0, max: 5.5 }
                            },
                            clinicalSignificance: '升高提示红细胞增多症；降低提示贫血',
                            clinicalSignificanceEn: 'Elevated suggests polycythemia; Decreased suggests anemia',
                            clinicalSignificanceLatin: 'Elevatio indicat polycythaemiam; Decrepitatio indicat anaemiam'
                        },
                        {
                            id: 'HGB',
                            name: '血红蛋白',
                            nameEn: 'Hemoglobin',
                            nameLatin: 'Hemoglobinum',
                            namePinyin: 'xuehongdanbai',
                            unit: 'g/L',
                            referenceRanges: {
                                male: { min: 130, max: 175 },
                                female: { min: 115, max: 150 },
                                child: { min: 110, max: 160 },
                                general: { min: 120, max: 160 }
                            },
                            clinicalSignificance: '判断贫血类型和程度的重要指标',
                            clinicalSignificanceEn: 'Important indicator for judging anemia type and degree',
                            clinicalSignificanceLatin: 'Indicator magni momenti ad iudicandam anaemiam et gradum'
                        },
                        {
                            id: 'HCT',
                            name: '红细胞压积',
                            nameEn: 'Hematocrit',
                            nameLatin: 'Critinum Erythrocytorum',
                            namePinyin: 'hongxibao yaji',
                            unit: '%',
                            referenceRanges: {
                                male: { min: 40, max: 50 },
                                female: { min: 35, max: 45 },
                                child: { min: 35, max: 49 },
                                general: { min: 36, max: 48 }
                            },
                            clinicalSignificance: '评估血液浓缩或稀释程度',
                            clinicalSignificanceEn: 'Evaluate blood concentration or dilution',
                            clinicalSignificanceLatin: 'Aestimare concentrationem vel dilutionem sanguinis'
                        },
                        {
                            id: 'MCV',
                            name: '平均红细胞体积',
                            nameEn: 'Mean Corpuscular Volume',
                            nameLatin: 'Volumen Medium Corpusculorum Erythrocytorum',
                            namePinyin: 'pingjun hongxibao tiji',
                            unit: 'fL',
                            referenceRanges: {
                                general: { min: 80, max: 100 }
                            },
                            clinicalSignificance: '用于贫血分类：大细胞性、正细胞性、小细胞性',
                            clinicalSignificanceEn: 'Used for anemia classification: macrocytic, normocytic, microcytic',
                            clinicalSignificanceLatin: 'Ad classificationem anaemiae adhibetur: macrocytaria, normocytaria, microcytaria'
                        },
                        {
                            id: 'MCH',
                            name: '平均红细胞血红蛋白量',
                            nameEn: 'Mean Corpuscular Hemoglobin',
                            nameLatin: 'Hemoglobinum Medium Corpusculorum',
                            namePinyin: 'pingjun hongxibao xuehongdanbai liang',
                            unit: 'pg',
                            referenceRanges: {
                                general: { min: 27, max: 34 }
                            },
                            clinicalSignificance: '评估单个红细胞的血红蛋白含量',
                            clinicalSignificanceEn: 'Evaluate hemoglobin content of single RBC',
                            clinicalSignificanceLatin: 'Aestimare contentum hemoglobini singularum erythrocytorum'
                        },
                        {
                            id: 'MCHC',
                            name: '平均红细胞血红蛋白浓度',
                            nameEn: 'Mean Corpuscular Hemoglobin Concentration',
                            nameLatin: 'Concentratio Hemoglobini Medium Corpusculorum',
                            namePinyin: 'pingjun hongxibao xuehongdanbai nongdu',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 316, max: 354 }
                            },
                            clinicalSignificance: '鉴别贫血类型，辅助诊断溶血性贫血',
                            clinicalSignificanceEn: 'Differentiate anemia types, assist in diagnosing hemolytic anemia',
                            clinicalSignificanceLatin: 'Differentiate genera anaemiae, ad diagnosein anaemiae haemolyticae adiuvandam'
                        },
                        {
                            id: 'PLT',
                            name: '血小板计数',
                            nameEn: 'Platelet Count',
                            nameLatin: 'Numerus Thrombocytorum',
                            namePinyin: 'xiaoxueban jishu',
                            unit: '×10⁹/L',
                            referenceRanges: {
                                general: { min: 125, max: 350 }
                            },
                            clinicalSignificance: '升高提示血小板增多症；降低提示血小板减少症',
                            clinicalSignificanceEn: 'Elevated suggests thrombocytosis; Decreased suggests thrombocytopenia',
                            clinicalSignificanceLatin: 'Elevatio indicat thrombocytosis; Decrepitatio indicat thrombocytopeniam'
                        },
                        {
                            id: 'MPV',
                            name: '平均血小板体积',
                            nameEn: 'Mean Platelet Volume',
                            nameLatin: 'Volumen Medium Thrombocytorum',
                            namePinyin: 'pingjun xiaoxueban tiji',
                            unit: 'fL',
                            referenceRanges: {
                                general: { min: 6.5, max: 13.0 }
                            },
                            clinicalSignificance: '评估血小板生成和破坏情况',
                            clinicalSignificanceEn: 'Evaluate platelet production and destruction',
                            clinicalSignificanceLatin: 'Aestimare productionem et destructionem thrombocytorum'
                        },
                        {
                            id: 'WBC_DIFF',
                            name: '白细胞分类计数',
                            nameEn: 'White Blood Cell Differential Count',
                            nameLatin: 'Classificatio Differentialis Leucocytorum',
                            namePinyin: 'baixibao fenlei jishu',
                            unit: '%',
                            items: [
                                {
                                    id: 'NEUT',
                                    name: '中性粒细胞',
                                    nameEn: 'Neutrophils',
                                    nameLatin: 'Neutrophila',
                                    namePinyin: 'zhongxinglishinibao',
                                    unit: '%',
                                    referenceRanges: {
                                        general: { min: 40, max: 75 }
                                    }
                                },
                                {
                                    id: 'LYMPH',
                                    name: '淋巴细胞',
                                    nameEn: 'Lymphocytes',
                                    nameLatin: 'Lymphocyta',
                                    namePinyin: 'linbashibao',
                                    unit: '%',
                                    referenceRanges: {
                                        general: { min: 20, max: 50 }
                                    }
                                },
                                {
                                    id: 'MONO',
                                    name: '单核细胞',
                                    nameEn: 'Monocytes',
                                    nameLatin: 'Monocyta',
                                    namePinyin: 'danheshibao',
                                    unit: '%',
                                    referenceRanges: {
                                        general: { min: 3, max: 10 }
                                    }
                                },
                                {
                                    id: 'EO',
                                    name: '嗜酸性粒细胞',
                                    nameEn: 'Eosinophils',
                                    nameLatin: 'Eosinophila',
                                    namePinyin: 'suisuanxing lixibao',
                                    unit: '%',
                                    referenceRanges: {
                                        general: { min: 0.5, max: 5 }
                                    }
                                },
                                {
                                    id: 'BASO',
                                    name: '嗜碱性粒细胞',
                                    nameEn: 'Basophils',
                                    nameLatin: 'Basophila',
                                    namePinyin: 'sijianxing lixibao',
                                    unit: '%',
                                    referenceRanges: {
                                        general: { min: 0, max: 1 }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'URINE_RT',
                    code: 'LAB002',
                    name: '尿常规',
                    nameEn: 'Urine Routine Examination',
                    nameLatin: 'Examen Routinum Urinae',
                    nameAbbr: 'URINE',
                    namePinyin: 'niao changgui',
                    specimen: '晨尿/随机尿',
                    specimenEn: 'Morning/Random Urine',
                    specimenLatin: 'Urina Matutina/Alea',
                    container: '干净容器',
                    containerEn: 'Clean Container',
                    volume: '10mL',
                    turnaround: '30分钟',
                    turnaroundEn: '30 minutes',
                    price: '20',
                    items: [
                        {
                            id: 'URINE_COLOR',
                            name: '尿液颜色',
                            nameEn: 'Urine Color',
                            nameLatin: 'Color Urinae',
                            namePinyin: 'niaoye yanse',
                            unit: '',
                            referenceRanges: {
                                general: { normal: '淡黄色' }
                            },
                            clinicalSignificance: '异常颜色提示疾病：红色提示血尿、深黄色提示浓缩尿、白色提示脓尿',
                            clinicalSignificanceEn: 'Abnormal color suggests disease: Red indicates hematuria, dark yellow indicates concentrated urine, white indicates pyuria',
                            clinicalSignificanceLatin: 'Color abnormus morbum indicat: Ruber haematuriam, flavus obscurus urinae concentrationem, albus pyuriam'
                        },
                        {
                            id: 'URINE_CLARITY',
                            name: '尿液透明度',
                            nameEn: 'Urine Clarity',
                            nameLatin: 'Perspicuitas Urinae',
                            namePinyin: 'niaoye touchemingdu',
                            unit: '',
                            referenceRanges: {
                                general: { normal: '清晰' }
                            },
                            clinicalSignificance: '浑浊提示感染、结晶、脓细胞等',
                            clinicalSignificanceEn: 'Cloudy suggests infection, crystals, pus cells',
                            clinicalSignificanceLatin: 'Turbidus infectionem, crystallos, cellulas puris indicat'
                        },
                        {
                            id: 'URINE_PH',
                            name: '尿液pH值',
                            nameEn: 'Urine pH',
                            nameLatin: 'pH Urinae',
                            namePinyin: 'niaoye pH zhi',
                            unit: '',
                            referenceRanges: {
                                general: { min: 4.5, max: 8.0 }
                            },
                            clinicalSignificance: '酸性尿见于酸中毒、代谢性疾病；碱性尿见于碱中毒、泌尿系感染',
                            clinicalSignificanceEn: 'Acidic urine seen in acidosis, metabolic disease; Alkaline urine seen in alkalosis, UTI',
                            clinicalSignificanceLatin: 'Urina acidica in acidosi, morbis metabolicis; Urina alkalinica in alkalosi, infectione tractus urogenitalis'
                        },
                        {
                            id: 'URINE_SG',
                            name: '尿比重',
                            nameEn: 'Specific Gravity',
                            nameLatin: 'Gravitas Specifica',
                            namePinyin: 'niao bizhong',
                            unit: '',
                            referenceRanges: {
                                general: { min: 1.005, max: 1.030 }
                            },
                            clinicalSignificance: '评估肾脏浓缩稀释功能',
                            clinicalSignificanceEn: 'Evaluate renal concentration and dilution function',
                            clinicalSignificanceLatin: 'Aestimare functionem concentrationis et dilutionis renis'
                        },
                        {
                            id: 'PROTEIN',
                            name: '尿蛋白',
                            nameEn: 'Urine Protein',
                            nameLatin: 'Proteina Urinae',
                            namePinyin: 'niao danbai',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示肾小球或肾小管疾病、妊娠高血压综合征等',
                            clinicalSignificanceEn: 'Positive suggests glomerular or tubular disease, gestational hypertension syndrome',
                            clinicalSignificanceLatin: 'Positivum morbos glomerulares vel tubulares, syndroma hypertensions gestionalis indicat'
                        },
                        {
                            id: 'GLU',
                            name: '尿糖',
                            nameEn: 'Urine Glucose',
                            nameLatin: 'Glucosa Urinae',
                            namePinyin: 'niaotang',
                            unit: 'mmol/L',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示糖尿病、肾性糖尿、应激性糖尿',
                            clinicalSignificanceEn: 'Positive suggests diabetes mellitus, renal glycosuria, stress glycosuria',
                            clinicalSignificanceLatin: 'Positivum diabetem mellitum, glycosuriam renalem, glycosuriam stressalem indicat'
                        },
                        {
                            id: 'KETONE',
                            name: '尿酮体',
                            nameEn: 'Urine Ketone Bodies',
                            nameLatin: 'Corpora Cetonica Urinae',
                            namePinyin: 'niao titi',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示糖尿病酮症酸中毒、饥饿、剧烈运动',
                            clinicalSignificanceEn: 'Positive suggests diabetic ketoacidosis, starvation, intense exercise',
                            clinicalSignificanceLatin: 'Positivum diabetis ketoacidosim, inediam, exercitationem intensam indicat'
                        },
                        {
                            id: 'BILIRUBIN',
                            name: '尿胆红素',
                            nameEn: 'Urine Bilirubin',
                            nameLatin: 'Bilirubinum Urinae',
                            namePinyin: 'niao danhongsu',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示肝胆疾病、溶血性疾病',
                            clinicalSignificanceEn: 'Positive suggests hepatobiliary disease, hemolytic disease',
                            clinicalSignificanceLatin: 'Positivum morbos hepatobiiares, haemolyticos indicat'
                        },
                        {
                            id: 'UROBILINOGEN',
                            name: '尿胆原',
                            nameEn: 'Urobilinogen',
                            nameLatin: 'Urobilinogenum',
                            namePinyin: 'niao danyuan',
                            unit: 'μmol/L',
                            referenceRanges: {
                                general: { min: 0, max: 10 }
                            },
                            clinicalSignificance: '升高见于肝细胞性黄疸、溶血性黄疸；降低见于梗阻性黄疸',
                            clinicalSignificanceEn: 'Elevated in hepatocellular jaundice, hemolytic jaundice; Decreased in obstructive jaundice',
                            clinicalSignificanceLatin: 'Elevatum in ictero hepatocellulari, haemolytico; Decrepitum in ictero obstructivo'
                        },
                        {
                            id: 'BLD',
                            name: '尿潜血',
                            nameEn: 'Urine Occult Blood',
                            nameLatin: 'Sanguis Occultus Urinae',
                            namePinyin: 'niao qianxue',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示泌尿系统疾病、肾炎、结石、肿瘤等',
                            clinicalSignificanceEn: 'Positive suggests urinary system disease, nephritis, stones, tumor',
                            clinicalSignificanceLatin: 'Positivum morbum systematis uropoietici, nephritidem, calculos, tumorem indicat'
                        },
                        {
                            id: 'LEU',
                            name: '尿白细胞',
                            nameEn: 'Urine Leukocytes',
                            nameLatin: 'Leucocyta Urinae',
                            namePinyin: 'niao baixibao',
                            unit: '/μL',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示泌尿系统感染',
                            clinicalSignificanceEn: 'Positive suggests urinary tract infection',
                            clinicalSignificanceLatin: 'Positivum infectionem tractus urogenitalis indicat'
                        },
                        {
                            id: 'SEDENT_MICRO',
                            name: '尿沉渣镜检',
                            nameEn: 'Urinary Sediment Microscopy',
                            nameLatin: 'Microscopia Sedimenti Urinae',
                            namePinyin: 'niao chenzha jingjian',
                            unit: '',
                            referenceRanges: {
                                general: {}
                            },
                            items: [
                                {
                                    id: 'RBC_MICRO',
                                    name: '红细胞',
                                    nameEn: 'Red Blood Cells',
                                    nameLatin: 'Erythrocyta',
                                    namePinyin: 'hongxibao',
                                    unit: '/HPF',
                                    referenceRanges: {
                                        general: { min: 0, max: 3 }
                                    }
                                },
                                {
                                    id: 'WBC_MICRO',
                                    name: '白细胞',
                                    nameEn: 'White Blood Cells',
                                    nameLatin: 'Leucocyta',
                                    namePinyin: 'baixibao',
                                    unit: '/HPF',
                                    referenceRanges: {
                                        general: { min: 0, max: 5 }
                                    }
                                },
                                {
                                    id: 'EPITHELIAL',
                                    name: '上皮细胞',
                                    nameEn: 'Epithelial Cells',
                                    nameLatin: 'Cellulae Epitheliales',
                                    namePinyin: 'shangpixibao',
                                    unit: '/LPF',
                                    referenceRanges: {
                                        general: { min: 0, max: 5 }
                                    }
                                },
                                {
                                    id: 'CAST',
                                    name: '管型',
                                    nameEn: 'Casts',
                                    nameLatin: 'Cylindri',
                                    namePinyin: 'guanxing',
                                    unit: '/LPF',
                                    referenceRanges: {
                                        general: { min: 0, max: 0 }
                                    }
                                },
                                {
                                    id: 'CRYSTAL',
                                    name: '结晶',
                                    nameEn: 'Crystals',
                                    nameLatin: 'Crystalla',
                                    namePinyin: 'jiejing',
                                    unit: '',
                                    referenceRanges: {
                                        general: { normal: '少量' }
                                    }
                                },
                                {
                                    id: 'BACTERIA',
                                    name: '细菌',
                                    nameEn: 'Bacteria',
                                    nameLatin: 'Bacteria',
                                    namePinyin: 'xijun',
                                    unit: '',
                                    referenceRanges: {
                                        general: { negative: true }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'STOOL_RT_OB',
                    code: 'LAB003',
                    name: '粪便常规+潜血',
                    nameEn: 'Stool Routine + Occult Blood',
                    nameLatin: 'Examen Routinum Fecis + Sanguis Occultus',
                    nameAbbr: 'STOOL OB',
                    namePinyin: 'fanchang changgui qianxue',
                    specimen: '新鲜粪便',
                    specimenEn: 'Fresh Stool',
                    specimenLatin: 'Fex Recens',
                    container: '专用便盒',
                    containerEn: 'Special Stool Container',
                    volume: '5g',
                    turnaround: '30分钟',
                    turnaroundEn: '30 minutes',
                    price: '15',
                    items: [
                        {
                            id: 'STOOL_COLOR',
                            name: '粪便颜色',
                            nameEn: 'Stool Color',
                            nameLatin: 'Color Fecis',
                            namePinyin: 'fanchang yanse',
                            unit: '',
                            referenceRanges: {
                                general: { normal: '黄色/棕黄色' }
                            }
                        },
                        {
                            id: 'STOOL_CHARACTER',
                            name: '粪便性状',
                            nameEn: 'Stool Character',
                            nameLatin: 'Character Fecis',
                            namePinyin: 'fanchang xingzhuang',
                            unit: '',
                            referenceRanges: {
                                general: { normal: '软便/成形' }
                            }
                        },
                        {
                            id: 'STOOL_MUCUS',
                            name: '黏液',
                            nameEn: 'Mucus',
                            nameLatin: 'Mucus',
                            namePinyin: 'nianye',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            }
                        },
                        {
                            id: 'STOOL_BLOOD',
                            name: '血液',
                            nameEn: 'Blood',
                            nameLatin: 'Sanguis',
                            namePinyin: 'xueye',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            }
                        },
                        {
                            id: 'STOOL_WORM',
                            name: '虫卵',
                            nameEn: 'Parasitic Eggs',
                            nameLatin: 'Ova Parasitorum',
                            namePinyin: 'chongluan',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            }
                        },
                        {
                            id: 'OB',
                            name: '粪便潜血试验',
                            nameEn: 'Fecal Occult Blood Test (FOBT)',
                            nameLatin: 'Probatio Sanguinis Occulti Fecis',
                            namePinyin: 'fanchang qianxue shiyan',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            methods: ['免疫法', '化学法'],
                            methodsEn: ['Immunological Method', 'Chemical Method'],
                            clinicalSignificance: '阳性提示消化道出血，需排除痔疮、息肉、肿瘤等',
                            clinicalSignificanceEn: 'Positive suggests GI bleeding, need to exclude hemorrhoids, polyps, tumor',
                            clinicalSignificanceLatin: 'Positivum haemorrhagiam gastrointestinalem indicat, oportet exclude hemorrhoids, polypum, tumorem'
                        }
                    ]
                },
                {
                    id: 'CSF_RT',
                    code: 'LAB004',
                    name: '脑脊液常规及生化',
                    nameEn: 'CSF Routine and Biochemistry',
                    nameLatin: 'Examen Routinum et Biochemicum Liquoris Cerebrospinalis',
                    nameAbbr: 'CSF',
                    namePinyin: 'naojiye changgui ji shenghua',
                    specimen: '脑脊液',
                    specimenEn: 'Cerebrospinal Fluid',
                    specimenLatin: 'Liquor Cerebrospinalis',
                    container: '无菌管',
                    containerEn: 'Sterile Tube',
                    volume: '2mL×3管',
                    turnaround: '60分钟',
                    turnaroundEn: '60 minutes',
                    price: '80',
                    items: [
                        {
                            id: 'CSF_COLOR',
                            name: '颜色',
                            nameEn: 'Color',
                            nameLatin: 'Color',
                            namePinyin: 'yanse',
                            unit: '',
                            referenceRanges: {
                                general: { normal: '无色透明' }
                            }
                        },
                        {
                            id: 'CSF_CLARITY',
                            name: '透明度',
                            nameEn: 'Clarity',
                            nameLatin: 'Perspicuitas',
                            namePinyin: 'touchemingdu',
                            unit: '',
                            referenceRanges: {
                                general: { normal: '清晰透明' }
                            }
                        },
                        {
                            id: 'CSF_PROTEIN',
                            name: '蛋白质',
                            nameEn: 'Protein',
                            nameLatin: 'Proteina',
                            namePinyin: 'danbaizhi',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 0.15, max: 0.45 }
                            }
                        },
                        {
                            id: 'CSF_GLU',
                            name: '葡萄糖',
                            nameEn: 'Glucose',
                            nameLatin: 'Glucosa',
                            namePinyin: 'putaotang',
                            unit: 'mmol/L',
                            referenceRanges: {
                                general: { min: 2.5, max: 4.5 }
                            },
                            relatedTest: '血糖同步检测'
                        },
                        {
                            id: 'CSF_CLL',
                            name: '氯化物',
                            nameEn: 'Chloride',
                            nameLatin: 'Chloridum',
                            namePinyin: 'lühuaWu',
                            unit: 'mmol/L',
                            referenceRanges: {
                                general: { min: 120, max: 130 }
                            }
                        },
                        {
                            id: 'CSF_CELL_COUNT',
                            name: '细胞计数',
                            nameEn: 'Cell Count',
                            nameLatin: 'Numerus Cellularum',
                            namePinyin: 'xibao jishu',
                            unit: '×10⁶/L',
                            referenceRanges: {
                                general: { min: 0, max: 8 }
                            }
                        }
                    ]
                },
                {
                    id: 'COAG',
                    code: 'LAB005',
                    name: '出凝血功能',
                    nameEn: 'Coagulation Function Tests',
                    nameLatin: 'Functiones Coagulationis et Haemostaseos',
                    nameAbbr: 'COAG',
                    namePinyin: 'chuningxue gongneng',
                    specimen: '全血(蓝头管)',
                    specimenEn: 'Whole Blood (Blue Top)',
                    specimenLatin: 'Sanguis Totus (Tubus Caeruleus)',
                    container: '蓝头管(枸橼酸钠)',
                    containerEn: 'Blue Top Tube (Sodium Citrate)',
                    volume: '2.7mL',
                    turnaround: '60分钟',
                    turnaroundEn: '60 minutes',
                    price: '120',
                    items: [
                        {
                            id: 'PT',
                            name: '凝血酶原时间',
                            nameEn: 'Prothrombin Time',
                            nameLatin: 'Tempus Prothrombinum',
                            namePinyin: 'ningxue meiyuan shijian',
                            unit: '秒',
                            unitEn: 'seconds',
                            unitLatin: 'secunda',
                            referenceRanges: {
                                general: { min: 11.0, max: 14.0 }
                            },
                            clinicalSignificance: '延长见于凝血因子缺乏、肝病、维生素K缺乏、口服抗凝药',
                            clinicalSignificanceEn: 'Prolonged indicates coagulation factor deficiency, liver disease, vitamin K deficiency, oral anticoagulants',
                            clinicalSignificanceLatin: 'Prolongatum deficientiam factorum coagulationis, morbum hepatis, deficientiam vitaminae K, anticoagulantia oralia indicat'
                        },
                        {
                            id: 'APTT',
                            name: '活化部分凝血活酶时间',
                            nameEn: 'Activated Partial Thromboplastin Time',
                            nameLatin: 'Tempus Thromboplastini Partialis Activatum',
                            namePinyin: 'huohua bufen ningxue huomei shijian',
                            unit: '秒',
                            unitEn: 'seconds',
                            unitLatin: 'secunda',
                            referenceRanges: {
                                general: { min: 28.0, max: 40.0 }
                            },
                            clinicalSignificance: '延长见于内源性凝血途径因子缺乏、肝素治疗、狼疮抗凝物',
                            clinicalSignificanceEn: 'Prolonged indicates intrinsic pathway factor deficiency, heparin therapy, lupus anticoagulant',
                            clinicalSignificanceLatin: 'Prolongatum deficientiam factori viae intrinsecae, therapiam heparini, anticoagulantium lupi indicat'
                        },
                        {
                            id: 'TT',
                            name: '凝血酶时间',
                            nameEn: 'Thrombin Time',
                            nameLatin: 'Tempus Thrombinum',
                            namePinyin: 'ningxue mei shijian',
                            unit: '秒',
                            unitEn: 'seconds',
                            unitLatin: 'secunda',
                            referenceRanges: {
                                general: { min: 14.0, max: 21.0 }
                            },
                            clinicalSignificance: '延长见于纤维蛋白原缺乏或异常、DIC、肝素治疗',
                            clinicalSignificanceEn: 'Prolonged indicates fibrinogen deficiency or abnormality, DIC, heparin therapy',
                            clinicalSignificanceLatin: 'Prolongatum deficientiam vel abnorimtatem fibrinogeni, DIC, therapiam heparini indicat'
                        },
                        {
                            id: 'FIB',
                            name: '纤维蛋白原',
                            nameEn: 'Fibrinogen',
                            nameLatin: 'Fibrinogenum',
                            namePinyin: 'xianweidanbaiyuan',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 2.0, max: 4.0 }
                            },
                            clinicalSignificance: '升高见于急性炎症、急性心肌梗死；降低见于DIC、重症肝病',
                            clinicalSignificanceEn: 'Elevated in acute inflammation, acute MI; Decreased in DIC, severe liver disease',
                            clinicalSignificanceLatin: 'Elevatum in inflammatione acuta, IM acuta; Decrepitum in DIC, morbo hepatis gravi'
                        },
                        {
                            id: 'INR',
                            name: '国际标准化比值',
                            nameEn: 'International Normalized Ratio',
                            nameLatin: 'Ratio Normalizata Internationalis',
                            namePinyin: 'guoji biaozhunhua bizhi',
                            unit: '',
                            referenceRanges: {
                                general: { min: 0.8, max: 1.2 }
                            },
                            clinicalSignificance: '用于口服抗凝药(如华法林)治疗监测，目标范围2.0-3.0',
                            clinicalSignificanceEn: 'Used for monitoring oral anticoagulant (e.g., warfarin) therapy, target range 2.0-3.0',
                            clinicalSignificanceLatin: 'Ad monitorem therapiae anticoagulantium oralium (e.g., warfarini) adhibetur, finis 2.0-3.0'
                        },
                        {
                            id: 'D_DIMER',
                            name: 'D-二聚体',
                            nameEn: 'D-Dimer',
                            nameLatin: 'D-Dimerum',
                            namePinyin: 'D-erjuti',
                            unit: 'mg/L',
                            referenceRanges: {
                                general: { min: 0, max: 0.55 }
                            },
                            clinicalSignificance: '阴性基本排除静脉血栓栓塞症；阳性见于DIC、急性心肌梗死、恶性肿瘤等',
                            clinicalSignificanceEn: 'Negative essentially excludes VTE; Positive seen in DIC, acute MI, malignancy',
                            clinicalSignificanceLatin: 'Negativum essentialiter excludit VTE; Positivum in DIC, IM acuta, malignitate videtur'
                        },
                        {
                            id: 'FDP',
                            name: '纤维蛋白降解产物',
                            nameEn: 'Fibrin Degradation Products',
                            nameLatin: 'Producta Degradationis Fibrini',
                            namePinyin: 'xianweidanbai jiangjie chanwu',
                            unit: 'mg/L',
                            referenceRanges: {
                                general: { min: 0, max: 5.0 }
                            },
                            clinicalSignificance: '升高见于DIC、恶性肿瘤、急性心肌梗死、深静脉血栓',
                            clinicalSignificanceEn: 'Elevated in DIC, malignancy, acute MI, DVT',
                            clinicalSignificanceLatin: 'Elevatum in DIC, malignitate, IM acuta, TVP'
                        }
                    ]
                },
                {
                    id: 'BLOOD_TYPE',
                    code: 'LAB006',
                    name: '血型鉴定及配血',
                    nameEn: 'Blood Group Typing and Cross-matching',
                    nameLatin: 'Classificatio Grypi Sanguinis et Compatibilitas',
                    nameAbbr: 'BLOOD TYPE',
                    namePinyin: 'xuexing jianding ji peixue',
                    specimen: '全血',
                    specimenEn: 'Whole Blood',
                    specimenLatin: 'Sanguis Totus',
                    container: '紫头管(EDTA)',
                    containerEn: 'Purple Top Tube (EDTA)',
                    volume: '3mL',
                    turnaround: '30分钟(急诊)',
                    turnaroundEn: '30 minutes (Emergency)',
                    price: '50',
                    items: [
                        {
                            id: 'ABO',
                            name: 'ABO血型',
                            nameEn: 'ABO Blood Group',
                            nameLatin: 'Grypus Sanguinis ABO',
                            namePinyin: 'ABO xuexing',
                            unit: '',
                            referenceRanges: {
                                general: {}
                            },
                            values: ['A型', 'B型', 'O型', 'AB型'],
                            valuesEn: ['Type A', 'Type B', 'Type O', 'Type AB']
                        },
                        {
                            id: 'RH',
                            name: 'Rh血型',
                            nameEn: 'Rh Blood Group',
                            nameLatin: 'Grypus Sanguinis Rh',
                            namePinyin: 'Rh xuexing',
                            unit: '',
                            referenceRanges: {
                                general: {}
                            },
                            values: ['Rh阳性(D+)', 'Rh阴性(D-)'],
                            valuesEn: ['Rh Positive (D+)', 'Rh Negative (D-)']
                        },
                        {
                            id: 'CROSS_MATCH',
                            name: '交叉配血',
                            nameEn: 'Cross-matching',
                            nameLatin: 'Compatibilitas Cruciata',
                            namePinyin: 'jiaocha peixue',
                            unit: '',
                            referenceRanges: {
                                general: { compatible: '相合' }
                            },
                            clinicalSignificance: '输血前必须进行的相容性检测',
                            clinicalSignificanceEn: 'Must be performed before blood transfusion',
                            clinicalSignificanceLatin: 'Ante transfusionem sanguinis fieri debet'
                        }
                    ]
                },
                {
                    id: 'HEMOLYSIS_TESTS',
                    code: 'LAB007',
                    name: '溶血相关检测',
                    nameEn: 'Hemolysis-related Tests',
                    nameLatin: 'Probationes ad Haemolysim',
                    nameAbbr: 'HEMOLYSIS',
                    namePinyin: 'rongxue xiangguan jiance',
                    specimen: '全血/血清',
                    specimenEn: 'Whole Blood/Serum',
                    specimenLatin: 'Sanguis Totus/Serum',
                    container: '紫头管/黄头管',
                    containerEn: 'Purple/Yellow Top Tube',
                    volume: '3mL',
                    turnaround: '次日出结果',
                    turnaroundEn: 'Next Day',
                    price: '150',
                    items: [
                        {
                            id: 'COOMBS_DIRECT',
                            name: '直接Coombs试验',
                            nameEn: 'Direct Coombs Test',
                            nameLatin: 'Probatio Coombs Directa',
                            namePinyin: 'zhijie Coombs shiyan',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '阳性提示自身免疫性溶血性贫血、新生儿溶血病、药物性溶血',
                            clinicalSignificanceEn: 'Positive indicates autoimmune hemolytic anemia, hemolytic disease of newborn, drug-induced hemolysis',
                            clinicalSignificanceLatin: 'Positivum anaemiam haemolyticam autoimmuneam, morbum haemolyticum neonatorum, haemolysim medicamentosam indicat'
                        },
                        {
                            id: 'COOMBS_INDIRECT',
                            name: '间接Coombs试验',
                            nameEn: 'Indirect Coombs Test',
                            nameLatin: 'Probatio Coombs Indirecta',
                            namePinyin: 'jianjie Coombs shiyan',
                            unit: '',
                            referenceRanges: {
                                general: { negative: true }
                            },
                            clinicalSignificance: '用于配血、不规则抗体筛查、输血前检测',
                            clinicalSignificanceEn: 'Used for blood matching, irregular antibody screening, pre-transfusion testing',
                            clinicalSignificanceLatin: 'Ad comparationem sanguinis, certificationem anticorporum irregularium, probationem ante transfusionem adhibetur'
                        },
                        {
                            id: 'FREE_HB',
                            name: '血清游离血红蛋白',
                            nameEn: 'Serum Free Hemoglobin',
                            nameLatin: 'Hemoglobinum Liberum Seri',
                            namePinyin: 'xueqing youli xuehongdanbai',
                            unit: 'mg/L',
                            referenceRanges: {
                                general: { min: 0, max: 40 }
                            },
                            clinicalSignificance: '升高提示血管内溶血',
                            clinicalSignificanceEn: 'Elevated indicates intravascular hemolysis',
                            clinicalSignificanceLatin: 'Elevatum haemolysim intravascularum indicat'
                        },
                        {
                            id: 'HAPTOGLOBIN',
                            name: '触珠蛋白',
                            nameEn: 'Haptoglobin',
                            nameLatin: 'Haptoglobinum',
                            namePinyin: 'chuzhu danbai',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 0.3, max: 2.0 }
                            },
                            clinicalSignificance: '降低提示溶血性贫血；升高见于炎症、阻塞性黄疸',
                            clinicalSignificanceEn: 'Decreased indicates hemolytic anemia; Increased in inflammation, obstructive jaundice',
                            clinicalSignificanceLatin: 'Decrepitum anaemiam haemolyticam indicat; Elevatum in inflammatione, ictero obstructivo'
                        },
                        {
                            id: 'BILIRUBIN_IND',
                            name: '间接胆红素',
                            nameEn: 'Indirect Bilirubin',
                            nameLatin: 'Bilirubinum Indirectum',
                            namePinyin: 'jianjie danhongsu',
                            unit: 'μmol/L',
                            referenceRanges: {
                                general: { min: 0, max: 10 }
                            },
                            relatedTest: '总胆红素、直接胆红素'
                        }
                    ]
                }
            ]
        },
        biochemistry: {
            name: '生化与代谢检验',
            nameEn: 'Biochemistry and Metabolic Tests',
            nameLatin: 'Examinationes Biochimicae et Metabolicae',
            icon: '🧪',
            items: [
                {
                    id: 'LFT',
                    code: 'BIO001',
                    name: '肝功能',
                    nameEn: 'Liver Function Tests',
                    nameLatin: 'Probationes Functionis Hepatis',
                    nameAbbr: 'LFT',
                    namePinyin: 'gongneng',
                    specimen: '血清',
                    specimenEn: 'Serum',
                    specimenLatin: 'Serum',
                    container: '黄头管',
                    containerEn: 'Yellow Top Tube',
                    volume: '4mL',
                    turnaround: '60分钟',
                    turnaroundEn: '60 minutes',
                    price: '80',
                    items: [
                        {
                            id: 'ALT',
                            name: '丙氨酸氨基转移酶',
                            nameEn: 'Alanine Aminotransferase',
                            nameLatin: 'Alanini Aminotransferasis',
                            namePinyin: 'bingsuan anji zhuanyizhi mei',
                            unit: 'U/L',
                            referenceRanges: {
                                male: { min: 9, max: 50 },
                                female: { min: 7, max: 40 },
                                general: { min: 9, max: 50 }
                            },
                            clinicalSignificance: '肝细胞损伤最敏感的指标，升高见于肝炎、肝硬化、肝癌、药物性肝损',
                            clinicalSignificanceEn: 'Most sensitive indicator of hepatocyte injury, elevated in hepatitis, cirrhosis, liver cancer, drug-induced liver injury',
                            clinicalSignificanceLatin: 'Indicator maxime sensitivus laesionis hepatocytorum, elevatum in hepatitide, cirrhosi, cancro hepatis, laesione hepatis medicamentosa'
                        },
                        {
                            id: 'AST',
                            name: '天门冬氨酸氨基转移酶',
                            nameEn: 'Aspartate Aminotransferase',
                            nameLatin: 'Aspartatis Aminotransferasis',
                            namePinyin: 'tianmendongtengsu anji zhuanyizhi mei',
                            unit: 'U/L',
                            referenceRanges: {
                                male: { min: 15, max: 40 },
                                female: { min: 13, max: 35 },
                                general: { min: 15, max: 40 }
                            },
                            clinicalSignificance: '升高见于肝炎、心肌梗死、骨骼肌损伤。AST/ALT>1提示肝硬化',
                            clinicalSignificanceEn: 'Elevated in hepatitis, MI, skeletal muscle injury. AST/ALT>1 suggests cirrhosis',
                            clinicalSignificanceLatin: 'Elevatum in hepatitide, IM, laesione musclorum skeletalium. AST/ALT>1 cirrhosim indicat'
                        },
                        {
                            id: 'AST_ALT_RATIO',
                            name: 'De Ritis比值',
                            nameEn: 'De Ritis Ratio (AST/ALT)',
                            nameLatin: 'Rationes De Ritis',
                            namePinyin: 'De Ritis bizhi',
                            unit: '',
                            referenceRanges: {
                                general: { min: 0.8, max: 1.5 }
                            },
                            clinicalSignificance: '比值>1见于酒精性肝病、肝硬化；比值<1见于急性肝炎',
                            clinicalSignificanceEn: 'Ratio>1 in alcoholic liver disease, cirrhosis; Ratio<1 in acute hepatitis',
                            clinicalSignificanceLatin: 'Ratio>1 in morbo hepatis alcoholico, cirrhosi; Ratio<1 in hepatitide acuta'
                        },
                        {
                            id: 'ALP',
                            name: '碱性磷酸酶',
                            nameEn: 'Alkaline Phosphatase',
                            nameLatin: 'Phosphatasis Alkalina',
                            namePinyin: 'jianxing linsuanmei',
                            unit: 'U/L',
                            referenceRanges: {
                                male: { min: 45, max: 125 },
                                female: { min: 35, max: 100 },
                                general: { min: 40, max: 120 }
                            },
                            clinicalSignificance: '升高见于胆道梗阻、骨病、妊娠。儿童生理性升高',
                            clinicalSignificanceEn: 'Elevated in biliary obstruction, bone disease, pregnancy. Physiologically elevated in children',
                            clinicalSignificanceLatin: 'Elevatum in obstructu bilioso, morbo osseo, graviditate. Physiologice elevatum in pueris'
                        },
                        {
                            id: 'GGT',
                            name: 'γ-谷氨酰转移酶',
                            nameEn: 'Gamma-Glutamyl Transferase',
                            nameLatin: 'Gamma-Glutamyl Transferasis',
                            namePinyin: 'G-ganxianxiao zhuanyizhi mei',
                            unit: 'U/L',
                            referenceRanges: {
                                male: { min: 10, max: 60 },
                                female: { min: 7, max: 45 },
                                general: { min: 10, max: 60 }
                            },
                            clinicalSignificance: '升高见于酒精性肝病、胆道疾病、药物性肝损。诊断酒精肝敏感',
                            clinicalSignificanceEn: 'Elevated in alcoholic liver disease, biliary disease, drug-induced liver injury. Sensitive for alcoholic liver',
                            clinicalSignificanceLatin: 'Elevatum in morbo hepatis alcoholico, morbis biliariis, laesione hepatis medicamentosa. Sensitivum ad hepar alcoholicum'
                        },
                        {
                            id: 'TBIL',
                            name: '总胆红素',
                            nameEn: 'Total Bilirubin',
                            nameLatin: 'Bilirubinum Totale',
                            namePinyin: 'zong danhongsu',
                            unit: 'μmol/L',
                            referenceRanges: {
                                general: { min: 3.4, max: 20.5 }
                            },
                            clinicalSignificance: '判断黄疸类型和程度的重要指标',
                            clinicalSignificanceEn: 'Important indicator for judging jaundice type and degree',
                            clinicalSignificanceLatin: 'Indicator magni momenti ad iudicandam icteri genus et gradum'
                        },
                        {
                            id: 'DBIL',
                            name: '直接胆红素',
                            nameEn: 'Direct Bilirubin',
                            nameLatin: 'Bilirubinum Directum',
                            namePinyin: 'zhijie danhongsu',
                            unit: 'μmol/L',
                            referenceRanges: {
                                general: { min: 0, max: 6.8 }
                            },
                            clinicalSignificance: '升高见于梗阻性黄疸、肝细胞性黄疸',
                            clinicalSignificanceEn: 'Elevated in obstructive jaundice, hepatocellular jaundice',
                            clinicalSignificanceLatin: 'Elevatum in ictero obstructivo, ictero hepatocellulari'
                        },
                        {
                            id: 'IBIL',
                            name: '间接胆红素',
                            nameEn: 'Indirect Bilirubin',
                            nameLatin: 'Bilirubinum Indirectum',
                            namePinyin: 'jianjie danhongsu',
                            unit: 'μmol/L',
                            referenceRanges: {
                                general: { min: 1.7, max: 13.7 }
                            },
                            clinicalSignificance: '升高见于溶血性黄疸、Gilbert综合征',
                            clinicalSignificanceEn: 'Elevated in hemolytic jaundice, Gilbert syndrome',
                            clinicalSignificanceLatin: 'Elevatum in ictero haemolytico, syndromate Gilbert'
                        },
                        {
                            id: 'ALB',
                            name: '白蛋白',
                            nameEn: 'Albumin',
                            nameLatin: 'Albuminum',
                            namePinyin: 'baidanbai',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 35, max: 50 }
                            },
                            clinicalSignificance: '降低见于营养不良、肝病、肾病综合征、恶性肿瘤',
                            clinicalSignificanceEn: 'Decreased in malnutrition, liver disease, nephrotic syndrome, malignancy',
                            clinicalSignificanceLatin: 'Decrepitum in malnutritione, morbo hepatis, syndromate nefrotico, malignitate'
                        },
                        {
                            id: 'TP',
                            name: '总蛋白',
                            nameEn: 'Total Protein',
                            nameLatin: 'Proteina Totale',
                            namePinyin: 'zong danbai',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 60, max: 80 }
                            },
                            clinicalSignificance: '与白蛋白、球蛋白共同评估营养状态和肝功能',
                            clinicalSignificanceEn: 'Evaluate nutritional status and liver function with albumin and globulin',
                            clinicalSignificanceLatin: 'Aestimare nutritionem et functionem hepatis cum albumino et globulino'
                        },
                        {
                            id: 'GLO',
                            name: '球蛋白',
                            nameEn: 'Globulin',
                            nameLatin: 'Globulinum',
                            namePinyin: 'qiudanbai',
                            unit: 'g/L',
                            referenceRanges: {
                                general: { min: 20, max: 40 }
                            },
                            clinicalSignificance: '升高见于自身免疫性疾病、慢性炎症、肝硬化；降低见于免疫缺陷',
                            clinicalSignificanceEn: 'Elevated in autoimmune disease, chronic inflammation, cirrhosis; Decreased in immunodeficiency',
                            clinicalSignificanceLatin: 'Elevatum in morbis autoimmuneis, inflammatione chronica, cirrhosi; Decrepitum in immunodeficientia'
                        },
                        {
                            id: 'A_G_RATIO',
                            name: '白蛋白/球蛋白比值',
                            nameEn: 'A/G Ratio',
                            nameLatin: 'Rationes Albumini/Globulini',
                            namePinyin: 'baidanbai/qiudanbai bizhi',
                            unit: '',
                            referenceRanges: {
                                general: { min: 1.2, max: 2.5 }
                            },
                            clinicalSignificance: '比值<1见于慢性肝病、肾病综合征、肝硬化',
                            clinicalSignificanceEn: 'Ratio<1 in chronic liver disease, nephrotic syndrome, cirrhosis',
                            clinicalSignificanceLatin: 'Ratio<1 in morbo hepatis chronico, syndromate nefrotico, cirrhosi'
                        },
                        {
                            id: 'TBA',
                            name: '总胆汁酸',
                            nameEn: 'Total Bile Acid',
                            nameLatin: 'Acidum Cholanthum Totale',
                            namePinyin: 'zong danzhisuan',
                            unit: 'μmol/L',
                            referenceRanges: {
                                general: { min: 0, max: 10 }
                            },
                            clinicalSignificance: '肝功能敏感指标，早期肝损伤即升高',
                            clinicalSignificanceEn: 'Sensitive indicator of liver function, elevated in early liver injury',
                            clinicalSignificanceLatin: 'Indicator sensitivus functionis hepatis, elevatum in laesione hepatis primo'
                        },
                        {
                            id: 'CHE',
                            name: '胆碱酯酶',
                            nameEn: 'Cholinesterase',
                            nameLatin: 'Cholinesterasis',
                            namePinyin: 'danjian zhimei',
                            unit: 'U/L',
                            referenceRanges: {
                                male: { min: 5000, max: 12000 },
                                female: { min: 5000, max: 11500 },
                                general: { min: 5000, max: 12000 }
                            },
                            clinicalSignificance: '降低见于有机磷中毒、肝实质损害、营养不良',
                            clinicalSignificanceEn: 'Decreased in organophosphate poisoning, liver parenchymal damage, malnutrition',
                            clinicalSignificanceLatin: 'Decrepitum in venenis phosphaticis organicis, damage parenchymatis hepatis, malnutritione'
                        },
                        {
                            id: 'AFU',
                            name: 'α-L-岩藻糖苷酶',
                            nameEn: 'Alpha-L-Fucosidase',
                            nameLatin: 'Alpha-L-Fucosidasis',
                            namePinyin: 'α-L-yanzaotangganmei',
                            unit: 'U/L',
                            referenceRanges: {
                                general: { min: 3, max: 12 }
                            },
                            clinicalSignificance: '与AFP联合提高肝癌诊断敏感性',
                            clinicalSignificanceEn: 'Combined with AFP improves sensitivity of liver cancer diagnosis',
                            clinicalSignificanceLatin: 'Cum AFP coniunctum sensivitatem diagnoseos cancri hepatis meliorat'
                        }
                    ]
                },
                {
                    id: 'RFT',
                    code: 'BIO002',
                    name: '肾功能',
                    nameEn: 'Renal Function Tests',
                    nameLatin: 'Probationes Functionis Renis',
                    nameAbbr: 'RFT',
                    namePinyin: 'shengongneng',
                    specimen: '血清',
                    specimenEn: 'Serum',
                    specimenLatin: 'Serum',
                    container: '黄头管',
                    containerEn: 'Yellow Top Tube',
                    volume: '3mL',
                    turnaround: '60分钟',
                    turnaroundEn: '60 minutes',
                    price: '60',
                    items: [
                        {
                            id: 'CREA',
                            name: '肌酐',
                            nameEn: 'Creatinine',
                            nameLatin: 'Creatininum',
                            namePinyin: 'jigansu',
                            unit: 'μmol/L',
                            referenceRanges: {
                                male: { min: 62, max: 115 },
                                female: { min: 53, max: 97 },
                                general: { min: 44, max: 133 }
                            },
                            clinicalSignificance: '评估肾小球滤过功能，升高见于肾功能不全、尿毒症',
                            clinicalSignificanceEn: 'Evaluate glomerular filtration function, elevated in renal insufficiency, uremia',
                            clinicalSignificanceLatin: 'Aestimare functionem filtrationis glomerularis, elevatum in insufficientia renali, uraemia'
                        },
                        {
                            id: 'UREA',
                            name: '尿素氮',
                            nameEn: 'Blood Urea Nitrogen',
                            nameLatin: 'Nitrogenium Ueae Sanguinis',
                            namePinyin: 'niaosu dan',
                            unit: 'mmol/L',
                            referenceRanges: {
                                general: { min: 2.6, max: 7.5 }
                            },
                            clinicalSignificance: '评估肾功能，受饮食、脱水、消化道出血影响',
                            clinicalSignificanceEn: 'Evaluate renal function, affected by diet, dehydration, GI bleeding',
                            clinicalSignificanceLatin: 'Aestimare functionem renis, affectum a dieta, dehydratione, haemorrhagia gastrointestinali'
                        },
                        {
                            id: 'UA',
                            name: '尿酸',
                            nameEn: 'Uric Acid',
                            nameLatin: 'Acidum Uricum',
                            namePinyin: 'niaosuan',
                            unit: 'μmol/L',
                            referenceRanges: {
                                male: { min: 208, max: 428 },
                                female: { min: 155, max: 357 },
                                general: { min: 150, max: 420 }
                            },
                            clinicalSignificance: '升高见于痛风、肾功能减退；降低见于Fanconi综合征、肝病',
                            clinicalSignificanceEn: 'Elevated in gout, renal insufficiency; Decreased in Fanconi syndrome, liver disease',
                            clinicalSignificanceLatin: 'Elevatum in podagra, insufficientia renali; Decrepitum in syndromate Fanconi, morbo hepatis'
                        },
                        {
                            id: 'CYSC',
                            name: '胱抑素C',
                            nameEn: 'Cystatin C',
                            nameLatin: 'Cystatinum C',
                            namePinyin: 'guangyisu C',
                            unit: 'mg/L',
                            referenceRanges: {
                                general: { min: 0.50, max: 1.25 }
                            },
                            clinicalSignificance: '比肌酐更敏感反映肾小球滤过功能，是早期肾功能损害的敏感指标',
                            clinicalSignificanceEn: 'More sensitive than creatinine for GFR, sensitive indicator of early renal function damage',
                            clinicalSignificanceLatin: 'Sensitivior creatinino ad GFR, indicator sensitivus laesionis functionis renis primae'
                        },
                        {
                            id: 'BUN_CREA_RATIO',
                            name: '尿素氮/肌酐比值',
                            nameEn: 'BUN/Creatinine Ratio',
                            nameLatin: 'Rationes Ureae Nitrogenii/Creatinini',
                            namePinyin: 'niaosu dan/jigansu bizhi',
                            unit: '',
                            referenceRanges: {
                                general: { min: 10, max: 20 }
                            },
                            clinicalSignificance: '比值>20见于肾前性氮质血症、脱水；比值<10见于肾性或肾后性',
                            clinicalSignificanceEn: 'Ratio>20 in prerenal azotemia, dehydration; Ratio<10 in renal or postrenal',
                            clinicalSignificanceLatin: 'Ratio>20 in azotaemia prerenali, dehydratione; Ratio<10 in renali vel postrenali'
                        },
                        {
                            id: 'EGFR',
                            name: '估算肾小球滤过率',
                            nameEn: 'Estimated GFR',
                            nameLatin: 'GFR Estimatum',
                            namePinyin: 'gusuan shenxiaoqiu lüguo lu',
                            unit: 'mL/min/1.73m²',
                            referenceRanges: {
                                general: { min: 90, max: 120 }
                            },
                            formula: 'CKD-EPI公式',
                            formulaEn: 'CKD-EPI equation',
                            clinicalSignificance: '评估肾功能分期(1-5期)，慢性肾病诊断标准',
                            clinicalSignificanceEn: 'Evaluate renal function staging (1-5), diagnostic criteria for CKD',
                            clinicalSignificanceLatin: 'Aestimare stadiationem functionis renis (1-5), criteria diagnoseos CKD'
                        },
                        {
                            id: 'B2MG',
                            name: 'β2-微球蛋白',
                            nameEn: 'Beta-2 Microglobulin',
                            nameLatin: 'Beta-2 Microglobulinum',
                            namePinyin: 'β2-weiqiudanbai',
                            unit: 'mg/L',
                            referenceRanges: {
                                serum: { min: 0.8, max: 2.4 },
                                urine: { min: 0, max: 0.3 }
                            },
                            clinicalSignificance: '升高见于肾小管损伤、恶性肿瘤、免疫性疾病',
                            clinicalSignificanceEn: 'Elevated in renal tubular injury, malignancy, autoimmune disease',
                            clinicalSignificanceLatin: 'Elevatum in laesione tubularium renis, malignitate, morbis autoimmuneis'
                        }
                    ]
                },
                {
                    id: 'GLUCOSE_HBA1C',
                    code: 'BIO003',
                    name: '血糖及糖化血红蛋白',
                    nameEn: 'Blood Glucose and HbA1c',
                    nameLatin: 'Glucosa Sanguinis et Hemoglobinum Glucosylatum',
                    nameAbbr: 'GLU',
                    namePinyin: 'xuetang ji tanghua xuehongdanbai',
                    specimen: '全血/血清',
                    specimenEn: 'Whole Blood/Serum',
                    specimenLatin: 'Sanguis Totus/Serum',
                    container: '灰头管/黄头管',
                    containerEn: 'Gray/Yellow Top Tube',
                    volume: '2mL',
                    turnaround: '30分钟',
                    turnaroundEn: '30 minutes',
                    price: '40',
                    items: [
                        {
                            id: 'GLU_FASTING',
                            name: '空腹血糖',
                            nameEn: 'Fasting Blood Glucose',
                            nameLatin: 'Glucosa Sanguinis Ieiuna',
                            namePinyin: 'kongfu xuetang',
                            unit: 'mmol/L',
                            siUnit: 'mmol/L',
                            usUnit: 'mg/dL',
                            siToUsFactor: 18,
                            referenceRanges: {
                                normal: { min: 3.9, max: 6.1 },
                                prediabetes: { min: 6.1, max: 7.0 },
                                diabetes: { min: 7.0, max: 999 }
                            },
                            clinicalSignificance: '诊断糖尿病和糖耐量异常的重要指标',
                            clinicalSignificanceEn: 'Important indicator for diagnosing diabetes and glucose intolerance',
                            clinicalSignificanceLatin: 'Indicator magni momenti ad diagnosein diabetis et intolerantiae glucosi'
                        },
                        {
                            id: 'GLU_RANDOM',
                            name: '随机血糖',
                            nameEn: 'Random Blood Glucose',
                            nameLatin: 'Glucosa Sanguinis Alea',
                            namePinyin: 'suiji xuetang',
                            unit: 'mmol/L',
                            referenceRanges: {
                                normal: { max: 7.8 },
                                diabetes: { min: 11.1, max: 999 }
                            },
                            clinicalSignificance: '≥11.1mmol/L伴多饮多尿症状可诊断糖尿病',
                            clinicalSignificanceEn: '≥11.1mmol/L with polyuria, polydipsia symptoms can diagnose diabetes',
                            clinicalSignificanceLatin: '≥11.1mmol/L cum symptomatibus polyuriae, polydipsiae diabetem potest diagnose'
                        },
                        {
                            id: 'GLU_2HPP',
                            name: '餐后2小时血糖',
                            nameEn: '2-Hour Postprandial Glucose',
                            nameLatin: 'Glucosa 2 Horae Post Prandium',
                            namePinyin: 'canhou 2 xiaoshi xuetang',
                            unit: 'mmol/L',
                            referenceRanges: {
                                normal: { max: 7.8 },
                                prediabetes: { min: 7.8, max: 11.1 },
                                diabetes: { min: 11.1, max: 999 }
                            },
                            clinicalSignificance: '早期糖尿病筛查，糖耐量减低的诊断',
                            clinicalSignificanceEn: 'Early diabetes screening, diagnosis of impaired glucose tolerance',
                            clinicalSignificanceLatin: 'Certamen diabetis primum, diagnoseos intolerantiae glucosi impaired'
                        },
                        {
                            id: 'OGTT',
                            name: '口服葡萄糖耐量试验',
                            nameEn: 'Oral Glucose Tolerance Test',
                            nameLatin: 'Probatio Toleratiae Glucosae Oris',
                            namePinyin: 'koufus putaotang nailiang shiyan',
                            unit: 'mmol/L',
                            referenceRanges: {
                                fasting: { min: 3.9, max: 6.1 },
                                '2h': { min: 0, max: 7.8 }
                            },
                            clinicalSignificance: '诊断糖尿病和糖耐量减低的金标准',
                            clinicalSignificanceEn: 'Gold standard for diagnosing diabetes and impaired glucose tolerance',
                            clinicalSignificanceLatin: 'Aurum stantarad ad diagnosein diabetis et intolerantiae glucosi'
                        },
                        {
                            id: 'HBA1C',
                            name: '糖化血红蛋白',
                            nameEn: 'Glycated Hemoglobin (HbA1c)',
                            nameLatin: 'Hemoglobinum Glucosylatum',
                            namePinyin: 'tanghua xuehongdanbai',
                            unit: '%',
                            referenceRanges: {
                                normal: { max: 6.0 },
                                prediabetes: { min: 6.0, max: 6.5 },
                                diabetes: { min: 6.5, max: 999 }
                            },
                            clinicalSignificance: '反映近2-3月平均血糖水平，糖尿病诊断和血糖控制指标',
                            clinicalSignificanceEn: 'Reflects average blood glucose over past 2-3 months, diabetes diagnosis and control indicator',
                            clinicalSignificanceLatin: 'Reflectit medium glucosum sanguinis per 2-3 menses, indicator diagnoseos et moderaminis diabetis'
                        },
                        {
                            id: 'GA',
                            name: '糖化白蛋白',
                            nameEn: 'Glycated Albumin',
                            nameLatin: 'Albuminum Glucosylatum',
                            namePinyin: 'tanghua baidanbai',
                            unit: '%',
                            referenceRanges: {
                                general: { min: 11, max: 17 }
                            },
                            clinicalSignificance: '反映近2-3周血糖控制，比HbA1c更灵敏',
                            clinicalSignificanceEn: 'Reflects blood glucose control over past 2-3 weeks, more sensitive than HbA1c',
                            clinicalSignificanceLatin: 'Reflectit moderamen glucosi sanguinis per 2-3 hebdomadas, sensitivior HbA1c'
                        },
                        {
                            id: 'INSULIN',
                            name: '胰岛素',
                            nameEn: 'Insulin',
                            nameLatin: 'Insulinum',
                            namePinyin: 'yidaosu',
                            unit: 'mIU/L',
                            referenceRanges: {
                                fasting: { min: 2.6, max: 24.9 }
                            },
                            clinicalSignificance: '评估胰岛β细胞功能和胰岛素抵抗',
                            clinicalSignificanceEn: 'Evaluate pancreatic beta cell function and insulin resistance',
                            clinicalSignificanceLatin: 'Aestimare functionem cellulae beta pancreatis et resistentiam insulini'
                        },
                        {
                            id: 'CPEP',
                            name: 'C肽',
                            nameEn: 'C-peptide',
                            nameLatin: 'C-peptidum',
                            namePinyin: 'C-tai',
                            unit: 'ng/mL',
                            referenceRanges: {
                                fasting: { min: 0.8, max: 3.1 }
                            },
                            clinicalSignificance: '反映内源性胰岛素分泌，鉴别1型/2型糖尿病',
                            clinicalSignificanceEn: 'Reflects endogenous insulin secretion, differentiate type 1/2 diabetes',
                            clinicalSignificanceLatin: 'Reflectit secretionem insulini endogeni, differetiantiam diabetis typi 1/2'
                        }
                    ]
                },
                {
                    id: 'LIPID',
                    code: 'BIO004',
                    name: '血脂四项',
                    nameEn: 'Lipid Panel',
                    nameLatin: 'Examen Lipidorum',
                    nameAbbr: 'LIPID',
                    namePinyin: 'xuezhi sixiang',
                    specimen: '血清',
                    specimenEn: 'Serum',
                    specimenLatin: 'Serum',
                    container: '黄头管(空腹采血)',
                    containerEn: 'Yellow Top Tube (Fasting)',
                    volume: '3mL',
                    turnaround: '60分钟',
                    turnaroundEn: '60 minutes',
                    price: '50',
                    items: [
                        {
                            id: 'TC',
                            name: '总胆固醇',
                            nameEn: 'Total Cholesterol',
                            nameLatin: 'Cholesterolum Totale',
                            namePinyin: 'zong danhuangchun',
                            unit: 'mmol/L',
                            siUnit: 'mmol/L',
                            usUnit: 'mg/dL',
                            siToUsFactor: 38.67,
                            referenceRanges: {
                                optimal: { max: 5.18 },
                                borderline: { min: 5.18, max: 6.21 },
                                high: { min: 6.21, max: 999 }
                            },
                            clinicalSignificance: '动脉粥样硬化危险因素，需结合LDL-C、HDL-C综合评估',
                            clinicalSignificanceEn: 'Risk factor for atherosclerosis, need comprehensive evaluation with LDL-C, HDL-C',
                            clinicalSignificanceLatin: 'Factor risici aterosclerosis, opus aestimatione integrata cum LDL-C, HDL-C'
                        },
                        {
                            id: 'TG',
                            name: '甘油三酯',
                            nameEn: 'Triglycerides',
                            nameLatin: 'Triglycerida',
                            namePinyin: 'ganyousanzhi',
                            unit: 'mmol/L',
                            siUnit: 'mmol/L',
                            usUnit: 'mg/dL',
                            siToUsFactor: 88.57,
                            referenceRanges: {
                                normal: { max: 1.7 },
                                borderline: { min: 1.7, max: 2.3 },
                                high: { min: 2.3, max: 5.6 },
                                very_high: { min: 5.6, max: 999 }
                            },
                            clinicalSignificance: '升高增加心血管疾病风险，急性胰腺炎常见原因',
                            clinicalSignificanceEn: 'Elevated increases cardiovascular disease risk, common cause of acute pancreatitis',
                            clinicalSignificanceLatin: 'Elevatum auget risicum morborum cardiovascularum, causa communis pancreatitisis acutae'
                        },
                        {
                            id: 'LDL_C',
                            name: '低密度脂蛋白胆固醇',
                            nameEn: 'LDL Cholesterol',
                            nameLatin: 'Cholesterolum Lipoproteini Densi Bassi',
                            namePinyin: 'dimiduji zhidanbai danhuangchun',
                            unit: 'mmol/L',
                            siUnit: 'mmol/L',
                            usUnit: 'mg/dL',
                            siToUsFactor: 38.67,
                            referenceRanges: {
                                optimal: { max: 2.6 },
                                near_optimal: { min: 2.6, max: 3.3 },
                                borderline: { min: 3.3, max: 4.1 },
                                high: { min: 4.1, max: 4.9 },
                                very_high: { min: 4.9, max: 999 }
                            },
                            clinicalSignificance: '最重要的致动脉粥样硬化脂蛋白，是降脂治疗首要目标',
                            clinicalSignificanceEn: 'Most important atherogenic lipoprotein, primary target for lipid-lowering therapy',
                            clinicalSignificanceLatin: 'Lipoprotein aterogenes maxime importans, finis primus therapiae lipidorum deponentium'
                        },
                        {
                            id: 'HDL_C',
                            name: '高密度脂蛋白胆固醇',
                            nameEn: 'HDL Cholesterol',
                            nameLatin: 'Cholesterolum Lipoproteini Densi Alti',
                            namePinyin: 'gaomidu zhidanbai danhuangchun',
                            unit: 'mmol/L',
                            siUnit: 'mmol/L',
                            usUnit: 'mg/dL',
                            siToUsFactor: 38.67,
                            referenceRanges: {
                                male: { min: 1.16, max: 1.42 },
                                female: { min: 1.29, max: 1.55 },
                                general: { min: 1.04, max: 1.55 }
                            },
                            clinicalSignificance: '抗动脉粥样硬化，升高降低心血管风险；降低增加风险',
                            clinicalSignificanceEn: 'Anti-atherosclerotic, elevated reduces CV risk; Decreased increases risk',
                            clinicalSignificanceLatin: 'Anti-atheroscleroticum, elevatum minuit risicum cardiovasculare; Decrepitum auget risicum'
                        },
                        {
                            id: 'VLDL',
                            name: '极低密度脂蛋白',
                            nameEn: 'VLDL Cholesterol',
                            nameLatin: 'Cholesterolum VLDL',
                            namePinyin: 'jiedi zhidanbai',
                            unit: 'mmol/L',
                            referenceRanges: {
                                general: { min: 0.21, max: 0.78 }
                            }
                        },
                        {
                            id: 'LP_A',
                            name: '脂蛋白(a)',
                            nameEn: 'Lipoprotein(a)',
                            nameLatin: 'Lipoproteinum (a)',
                            namePinyin: 'zhidanbai(a)',
                            unit: 'mg/L',
                            referenceRanges: {
                                general: { min: 0, max: 300 }
                            },
                            clinicalSignificance: '独立的心血管危险因素，与LDL-C协同增加风险',
                            clinicalSignificanceEn: 'Independent cardiovascular risk factor, synergistic risk with LDL-C',
                            clinicalSignificanceLatin: 'Factor risici cardiovasculare independens, synergeticum risicum cum LDL-C'
                        },
                        {
                            id: 'APO_A',
                            name: '载脂蛋白A',
                            nameEn: 'Apolipoprotein A',
                            nameLatin: 'Apolipoproteinum A',
                            namePinyin: 'zaizhixingdanbai A',
                            unit: 'g/L',
                            referenceRanges: {
                                male: { min: 1.05, max: 1.75 },
                                female: { min: 1.17, max: 1.74 },
                                general: { min: 1.0, max: 1.6 }
                            }
                        },
                        {
                            id: 'APO_B',
                            name: '载脂蛋白B',
                            nameEn: 'Apolipoprotein B',
                            nameLatin: 'Apolipoproteinum B',
                            namePinyin: 'zaizhixingdanbai B',
                            unit: 'g/L',
                            referenceRanges: {
