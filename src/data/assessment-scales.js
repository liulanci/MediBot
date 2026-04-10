/**
 * 健康评估量表数据库
 * 包含各种心理学、人格、健康相关的评估量表
 * 版本：2.0
 * 更新：2024年
 */

const AssessmentScales = {
    // 科室分类
    departments: {
        psychology: {
            name: '心理科',
            scales: ['MBTI', 'HAMD', 'HAMA', 'BPRS', 'EPQ', 'BRMS', 'SCL-90', 'MMPI', 'SBTI', 'ENNEAGRAM', 'BIGFIVE', 'ATTACHMENT']
        },
        fun: {
            name: '趣味测试',
            scales: ['SBTI', 'SBTI_WORK', 'SBTI_LOVE', 'SBTI_SLEEP', 'PET_TEST', 'EMOJI_STATE', 'ANIME_CHAR', 'BRAIN_OS']
        },
        orthopedics: {
            name: '骨科',
            scales: ['HYHA', 'SAQ', 'CAT', 'PVC', 'VAS', 'ODI', 'KOOS']
        },
        neurology: {
            name: '神经科',
            scales: ['GCS', 'MRS', 'MMSE', 'ADL']
        },
        obstetrics: {
            name: '妇产科',
            scales: ['EPDS', 'PFDI-20']
        },
        pediatrics: {
            name: '儿科',
            scales: ['DDST', 'RCADS']
        },
        oncology: {
            name: '肿瘤科',
            scales: ['EORTC QLQ-C30']
        }
    },

    // 量表定义
    scales: {
        // ========== 经典专业量表 ==========
        'MBTI': {
            name: 'MBTI 人格测试',
            department: 'psychology',
            description: '迈尔斯-布里格斯类型指标人格测试',
            type: 'personality',
            questions: 26,
            scoring: 'type',
            reference: {
                'INTJ': { name: '战略家', description: '富有想象力和战略性的思想家', group: '分析师' },
                'INTP': { name: '学者', description: '具有创造力的发明家，对知识有着止不住的渴望', group: '分析师' },
                'ENTJ': { name: '指挥官', description: '大胆、富有想象力且意志强大的领导者', group: '分析师' },
                'ENTP': { name: '辩论家', description: '聪明好奇的思想者，不会放弃任何智力上的挑战', group: '分析师' },
                'INFJ': { name: '提倡者', description: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者', group: '理想主义者' },
                'INFP': { name: '调停者', description: '诗意、善良的利他主义者，总是热情地为正当理由提供帮助', group: '理想主义者' },
                'ENFJ': { name: '主人公', description: '富有魅力且鼓舞人心的领导者，有使人着迷的能力', group: '理想主义者' },
                'ENFP': { name: '竞选者', description: '热情、有创造力、爱社交的自由精神', group: '理想主义者' },
                'ISTJ': { name: '物流师', description: '实际且注重事实的个人，值得信赖', group: '守护者' },
                'ISFJ': { name: '守卫者', description: '非常专注且热情的保护者', group: '守护者' },
                'ESTJ': { name: '总经理', description: '出色的管理者，没有他们，事情就不会顺利进行', group: '守护者' },
                'ESFJ': { name: '执政官', description: '极有同情心，爱社交的人们，热衷于帮助别人', group: '守护者' },
                'ISTP': { name: '鉴赏家', description: '大胆而实际的实验家，擅长使用任何形式的工具', group: '探险家' },
                'ISFP': { name: '探险家', description: '灵活且有魅力的艺术家，随时准备探索和体验新事物', group: '探险家' },
                'ESTP': { name: '企业家', description: '聪明、精力充沛且善于感知的人们，真正享受生活在边缘', group: '探险家' },
                'ESFP': { name: '表演者', description: '自发的、精力充沛的人们，生活从不感到无聊', group: '探险家' }
            }
        },

        'ENNEAGRAM': {
            name: '九型人格测试',
            department: 'psychology',
            description: '基于动机和恐惧的深度人格分析工具',
            type: 'personality',
            questions: 45,
            scoring: 'type',
            reference: {
                '1': { name: '完美主义者', description: '原则性强、追求完美、有责任感', fear: '怕自己错、怕变坏', desire: '希望自己是对的、好的' },
                '2': { name: '助人者', description: '热情慷慨、乐于助人、重视人际关系', fear: '怕没有人要', desire: '渴望被爱、受感谢' },
                '3': { name: '成就者', description: '有野心、注重形象、追求成功', fear: '怕失败', desire: '希望自己是有价值的' },
                '4': { name: '艺术型', description: '浪漫、有创意、情感深刻', fear: '怕没有身份认同', desire: '希望找到人生意义' },
                '5': { name: '探索者', description: '求知欲强、喜欢独处、理性分析', fear: '怕无用', desire: '渴望了解世界' },
                '6': { name: '忠诚型', description: '忠诚可靠、危机意识强、喜欢团队', fear: '怕不安全', desire: '渴望支持和方向' },
                '7': { name: '享乐主义者', description: '乐观开朗、爱好广泛、讨厌痛苦', fear: '怕被束缚', desire: '渴望自由和快乐' },
                '8': { name: '领导者', description: '自信直接、有控制欲、保护他人', fear: '怕失控', desire: '渴望保护自己' },
                '9': { name: '和平型', description: '温和包容、避免冲突、善于调解', fear: '怕分离、怕失去', desire: '渴望和平安宁' }
            }
        },

        'BIGFIVE': {
            name: '大五人格测试',
            department: 'psychology',
            description: '科学的人格模型，评估五个核心维度',
            type: 'personality',
            questions: 50,
            scoring: 'dimension',
            dimensions: ['开放性', '尽责性', '外向性', '宜人性', '神经质'],
            ranges: {
                '开放性': { low: '务实保守', high: '开放好奇' },
                '尽责性': { low: '灵活随性', high: '严谨有序' },
                '外向性': { low: '内向内敛', high: '外向开朗' },
                '宜人性': { low: '独立竞争', high: '合作信任' },
                '神经质': { low: '情绪稳定', high: '敏感焦虑' }
            }
        },

        'ATTACHMENT': {
            name: '依恋类型测试',
            department: 'psychology',
            description: '评估成人依恋风格与人际关系模式',
            type: 'relationship',
            questions: 36,
            scoring: 'type',
            reference: {
                'secure': { name: '安全型', description: '容易信任他人，能建立稳定亲密关系', percentage: '约56%' },
                'anxious': { name: '焦虑型', description: '渴望亲密，易担心被抛弃，情绪波动大', percentage: '约20%' },
                'avoidant': { name: '回避型', description: '重视独立，逃避亲密，情感隔离', percentage: '约25%' },
                'fearful': { name: '混乱型', description: '渴望又害怕亲密，关系模式不稳定', percentage: '约4%' }
            }
        },

        'HAMD': {
            name: '汉密尔顿抑郁量表',
            department: 'psychology',
            description: '用于评估抑郁症严重程度',
            type: 'depression',
            questions: 17,
            scoring: 'sum',
            ranges: [
                { min: 0, max: 7, level: '正常', color: 'green' },
                { min: 8, max: 13, level: '轻度抑郁', color: 'yellow' },
                { min: 14, max: 18, level: '中度抑郁', color: 'orange' },
                { min: 19, max: 22, level: '重度抑郁', color: 'red' },
                { min: 23, max: 50, level: '极重度抑郁', color: 'darkred' }
            ]
        },

        'HAMA': {
            name: '汉密尔顿焦虑量表',
            department: 'psychology',
            description: '用于评估焦虑症严重程度',
            type: 'anxiety',
            questions: 14,
            scoring: 'sum',
            ranges: [
                { min: 0, max: 6, level: '正常', color: 'green' },
                { min: 7, max: 13, level: '轻度焦虑', color: 'yellow' },
                { min: 14, max: 20, level: '中度焦虑', color: 'orange' },
                { min: 21, max: 28, level: '重度焦虑', color: 'red' },
                { min: 29, max: 56, level: '极重度焦虑', color: 'darkred' }
            ]
        },

        'SCL-90': {
            name: '症状自评量表',
            department: 'psychology',
            description: '90项症状清单，全面评估心理状态',
            type: 'comprehensive',
            questions: 90,
            factors: ['躯体化', '强迫症状', '人际关系敏感', '抑郁', '焦虑', '敌对', '恐怖', '偏执', '精神病性'],
            scoring: 'factor'
        },

        'MMPI': {
            name: '明尼苏达多相人格测验',
            department: 'psychology',
            description: '明尼苏达多相人格测验，详细人格评估',
            type: 'personality',
            questions: 566,
            scales: ['Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si'],
            scoring: 't-score',
            enhanced: true
        },

        // ========== SBTI 系列趣味测试 ==========
        'SBTI': {
            name: 'SBTI 傻大个性格测试',
            department: 'fun',
            description: 'MBTI已死，SBTI当道！一款让服务器崩溃的神奇测试',
            type: 'fun',
            questions: 31,
            scoring: 'type',
            official: true,
            creator: 'B站UP主：蛆肉儿串儿',
            warning: '注意甄别正版链接，谨防山寨版本！',
            note: '最初是为了劝朋友戒酒而设计的趣味测试，没想到意外爆火导致服务器多次崩溃',
            reference: {
                '死者': { name: '死者(DEAD)', description: '你已经看透了一切，选择了躺平' },
                '草者': { name: '草者(FUCK)', description: '万物皆可草，精神状态领先十年' },
                '僧人': { name: '僧人', description: '心如止水，与世无争，只想静静' },
                '尤物': { name: '尤物', description: '人间尤物，万众瞩目，走到哪都是焦点' },
                '摆烂': { name: '摆烂选手', description: '摆烂是我的态度，躺平是我的归宿' },
                '卷王': { name: '卷王', description: '只要卷不死，就往死里卷！' },
                '社牛': { name: '社交牛人', description: '只要我不尴尬，尴尬的就是别人' },
                '社恐': { name: '社交恐惧', description: '能不说话就不说话，能不见人就不见人' }
            }
        },

        'SBTI_WORK': {
            name: '职场SBTI',
            department: 'fun',
            description: '打工人的精神状态测试',
            type: 'fun',
            questions: 15,
            scoring: 'type',
            official: false,
            note: '基于SBTI框架的职场变体测试',
            reference: {
                '吗喽': { name: '吗喽(MALO)', description: '我就是一只吗喽，在工位上疯狂搬砖' },
                '牛马': { name: '牛马', description: '起得比鸡早，睡得比狗晚的打工魂' },
                '拿捏': { name: '拿捏者', description: '一切尽在掌握，游刃有余的职场高手' },
                '摸鱼': { name: '摸鱼大师', description: '带薪发呆专家，薅羊毛达人' },
                '卷王': { name: '卷王之王', description: '卷死同事，卷赢自己，走向人生巅峰' },
                '躺平': { name: '躺平先锋', description: '工资到手，一切随缘，绝不多干一秒' },
                '韭菜': { name: '新鲜韭菜', description: '绿油油的，等待被收割的打工人' },
                '螺丝钉': { name: '螺丝钉', description: '哪里需要哪里钉，永不生锈' }
            }
        },

        'SBTI_LOVE': {
            name: '恋爱SBTI',
            department: 'fun',
            description: '测试你的恋爱脑程度和情感模式',
            type: 'fun',
            questions: 18,
            scoring: 'type',
            official: false,
            note: '基于SBTI框架的恋爱变体测试',
            reference: {
                '多情': { name: '多情者', description: '处处留情，遍地开花，情感充沛' },
                'ATM': { name: '送钱者(ATM)', description: '为爱冲锋的勇士，钱包日渐消瘦' },
                '舔狗': { name: '舔狗', description: '卑微到尘埃里，开出花来也不回头' },
                '海王': { name: '海王', description: '池塘很大，我只想安静地游泳' },
                '寡王': { name: '寡王', description: '寡王一路硕博，建设美丽中国' },
                '恋爱脑': { name: '重度恋爱脑', description: '爱情大于天，为了他可以放弃一切' },
                '理性': { name: '理性恋爱者', description: '清醒又独立，爱情只是生活的一部分' },
                '傲娇': { name: '傲娇达人', description: '嘴上说不要，心里很想要' }
            }
        },

        'SBTI_SLEEP': {
            name: '睡眠SBTI',
            department: 'fun',
            description: '你的熬夜类型是什么？',
            type: 'fun',
            questions: 12,
            scoring: 'type',
            official: false,
            note: '基于SBTI框架的睡眠变体测试',
            reference: {
                '哲学家': { name: '凌晨3点哲学家', description: '一到半夜就开始思考人生，灵感爆棚' },
                '封印': { name: '被窝封印者', description: '被窝就是我的结界，坚决不出门' },
                '夜猫': { name: '夜猫子', description: '月亮不睡我不睡，我是秃头小宝贝' },
                '早起': { name: '早起鸟', description: '早睡早起身体好，每天活力满满' },
                '失眠': { name: '失眠患者', description: '眼睛闭着，脑子转着，数羊数到天亮' },
                '补觉': { name: '周末补觉大师', description: '工作日欠的觉，周末一次补回来' },
                '规律': { name: '作息规律者', description: '每天准时入睡，生物钟比闹钟还准' },
                '随时': { name: '随时入睡者', description: '充电五分钟，精神一整天' }
            }
        },

        // ========== 其他趣味心理测试 ==========
        'PET_TEST': {
            name: '你适合哪种宠物？',
            department: 'fun',
            description: '趣味宠物人格匹配测试',
            type: 'fun',
            questions: 8,
            scoring: 'type',
            reference: {
                'hedgehog': { name: '刺猬', description: '你是一只刺猬，只对特定的人撒娇，浑身是刺却内心柔软' },
                'cat': { name: '猫', description: '你是一只高冷的猫，想理就理，不想理就傲娇走开' },
                'dog': { name: '狗', description: '你是一只热情的狗，对主人忠心耿耿，活力满满' },
                'rabbit': { name: '兔子', description: '你是一只胆小的兔子，容易受惊，需要被保护' },
                'hamster': { name: '仓鼠', description: '你是一只可爱的仓鼠，喜欢囤东西，圆滚滚的很治愈' },
                'fish': { name: '金鱼', description: '你是一条悠闲的金鱼，记忆只有七秒，烦恼转眼就忘' },
                'turtle': { name: '乌龟', description: '你是一只淡定的乌龟，慢节奏生活，享受每一个当下' },
                'parrot': { name: '鹦鹉', description: '你是一只话痨鹦鹉，能说会道，超级会聊天' }
            }
        },

        'EMOJI_STATE': {
            name: '当代年轻人情绪状态诊断仪',
            department: 'fun',
            description: '你最近是哪种人设？',
            type: 'fun',
            questions: 10,
            scoring: 'type',
            reference: {
                '表面OK': { name: '表面OJBK内心崩塌', description: '表面：没事没事，内心：救命救命救命' },
                '假装努力': { name: '假装在努力', description: '卷又卷不动，躺又躺不平，只能假装很努力' },
                '情绪耗竭': { name: '情绪已耗竭', description: '精神状态be like：已读不回，不想说话' },
                '间歇性兴奋': { name: '间歇性踌躇满志', description: '经常在我要努力和算了之间反复横跳' },
                '人间清醒': { name: '人间清醒大师', description: '看透一切，选择摆烂，但偶尔也会卷一卷' },
                '重度社恐': { name: '能不社交就不社交', description: '手机永远静音，出门永远戴耳机' },
                '精神小伙': { name: '精神状态超前', description: '精神状态领先同龄人十年，已经疯到next level' },
                '佛系青年': { name: '佛系人生', description: '都行、可以、没关系，命里有时终须有' }
            }
        },

        'ANIME_CHAR': {
            name: '如果你是动漫角色，会是谁？',
            department: 'fun',
            description: '二次元人格投射测试',
            type: 'fun',
            questions: 15,
            scoring: 'type',
            target: '二次元爱好者',
            reference: {
                'anya': { name: '阿尼亚', description: '你是《间谍过家家》里的阿尼亚，可可爱爱，读取心声超能力' },
                'levi': { name: '利威尔', description: '你是《进击的巨人》里的利威尔，兵长身高但战力天花板' },
                'goku': { name: '悟空', description: '你是《龙珠》里的孙悟空，永远在变强，永远不服输' },
                'naruto': { name: '鸣人', description: '你是《火影忍者》里的鸣人，永不放弃的吊车尾逆袭' },
                'luffy': { name: '路飞', description: '你是《海贼王》里的路飞，要成为海贼王的男人！' },
                'saitama': { name: '琦玉', description: '你是《一拳超人》里的琦玉，秃了也变强了' },
                'senku': { name: '石神千空', description: '你是《石纪元》里的千空，科学改变世界' },
                'gojo': { name: '五条悟', description: '你是《咒术回战》里的五条悟，强大又中二的最强' }
            }
        },

        'BRAIN_OS': {
            name: '你的大脑操作系统是什么？',
            department: 'fun',
            description: '科技感人格分类测试',
            type: 'fun',
            questions: 12,
            scoring: 'type',
            reference: {
                'win10': { name: 'Windows 10', description: '稳定但老旧，bug一堆但还能用，偶尔蓝屏' },
                'win11': { name: 'Windows 11', description: '新界面但负优化，内存占用爆炸，强制更新' },
                'macos': { name: 'macOS', description: '流畅但封闭，生态闭环，优雅但贵' },
                'ios': { name: 'iOS 17', description: '流畅但封闭，封闭但流畅，就是不能侧载' },
                'android': { name: 'Android 14', description: '开放定制，但碎片化严重，各家UI不一样' },
                'linux': { name: 'Linux', description: '极客专属，高端玩家，命令行才是正义' },
                'harmony': { name: '鸿蒙OS', description: '国产之光，万物互联，遥遥领先' },
                'switch': { name: 'Nintendo Switch', description: '娱乐为主，随时随地快乐游戏' }
            }
        },

        // ========== 骨科量表 ==========
        'VAS': {
            name: '视觉模拟评分',
            department: 'orthopedics',
            description: '疼痛视觉模拟评分',
            type: 'pain',
            questions: 1,
            scoring: 'visual',
            ranges: [
                { min: 0, max: 3, level: '轻度疼痛', color: 'green' },
                { min: 4, max: 6, level: '中度疼痛', color: 'yellow' },
                { min: 7, max: 10, level: '重度疼痛', color: 'red' }
            ]
        },

        'ODI': {
            name: 'Oswestry 功能障碍指数',
            department: 'orthopedics',
            description: '腰痛功能障碍评估',
            type: 'function',
            questions: 10,
            scoring: 'percentage',
            ranges: [
                { min: 0, max: 20, level: '轻度功能障碍', color: 'green' },
                { min: 21, max: 40, level: '中度功能障碍', color: 'yellow' },
                { min: 41, max: 60, level: '重度功能障碍', color: 'orange' },
                { min: 61, max: 80, level: '严重功能障碍', color: 'red' },
                { min: 81, max: 100, level: '完全功能障碍', color: 'darkred' }
            ]
        },

        // ========== 神经科量表 ==========
        'MMSE': {
            name: '简易精神状态检查',
            department: 'neurology',
            description: '认知功能筛查评估',
            type: 'cognitive',
            questions: 11,
            scoring: 'sum',
            maxScore: 30,
            ranges: [
                { min: 27, max: 30, level: '正常', color: 'green' },
                { min: 21, max: 26, level: '轻度认知障碍', color: 'yellow' },
                { min: 10, max: 20, level: '中度认知障碍', color: 'orange' },
                { min: 0, max: 9, level: '重度认知障碍', color: 'red' }
            ]
        },

        'ADL': {
            name: '日常生活活动能力量表',
            department: 'neurology',
            description: '评估日常生活自理能力',
            type: 'function',
            questions: 10,
            scoring: 'sum',
            ranges: [
                { min: 100, max: 100, level: '完全自理', color: 'green' },
                { min: 75, max: 99, level: '轻度依赖', color: 'yellow' },
                { min: 50, max: 74, level: '中度依赖', color: 'orange' },
                { min: 25, max: 49, level: '重度依赖', color: 'red' },
                { min: 0, max: 24, level: '完全依赖', color: 'darkred' }
            ]
        },

        // ========== 妇产科量表 ==========
        'EPDS': {
            name: '爱丁堡产后抑郁量表',
            department: 'obstetrics',
            description: '产后抑郁筛查',
            type: 'depression',
            questions: 10,
            scoring: 'sum',
            ranges: [
                { min: 0, max: 8, level: '正常', color: 'green' },
                { min: 9, max: 13, level: '可能有抑郁', color: 'yellow' },
                { min: 14, max: 30, level: '很可能有抑郁，建议咨询', color: 'red' }
            ]
        },

        // ========== 儿科量表 ==========
        'RCADS': {
            name: '修订版儿童焦虑与抑郁量表',
            department: 'pediatrics',
            description: '儿童青少年情绪障碍评估',
            type: 'pediatric',
            questions: 47,
            factors: ['分离焦虑', '社交恐惧', '惊恐障碍', '广泛性焦虑', '强迫症', '抑郁'],
            scoring: 't-score'
        },

        // ========== 肿瘤科量表 ==========
        'EORTC QLQ-C30': {
            name: 'EORTC 生命质量量表',
            department: 'oncology',
            description: '癌症患者生命质量评估',
            type: 'quality',
            questions: 30,
            factors: ['功能量表', '症状量表', '总体健康状况']
        }
    },

    // 获取所有科室
    getAllDepartments() {
        return Object.keys(this.departments);
    },

    // 根据科室获取量表
    getScalesByDepartment() {
        const result = {};
        Object.entries(this.departments).forEach(([dept, data]) => {
            result[dept] = {
                name: data.name,
                scales: data.scales.map(id => this.scales[id]).filter(Boolean)
            };
        });
        return result;
    },

    // 获取单个量表
    getScale(scaleId) {
        return this.scales[scaleId];
    },

    // 获取量表分类
    getScalesByType(type) {
        return Object.entries(this.scales)
            .filter(([_, scale]) => scale.type === type)
            .map(([id, scale]) => ({ id, ...scale }));
    },

    // 搜索量表
    searchScales(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return Object.entries(this.scales)
            .filter(([id, scale]) => 
                scale.name.toLowerCase().includes(lowerKeyword) ||
                scale.description.toLowerCase().includes(lowerKeyword) ||
                id.toLowerCase().includes(lowerKeyword)
            )
            .map(([id, scale]) => ({ id, ...scale }));
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssessmentScales;
}
