/**
 * 健康评估量表题目库
 * 包含所有量表的完整题目（中英文双语版本）
 * 版本：1.0
 * 更新：2024年
 */

const AssessmentQuestions = {
    // ========== MBTI 人格测试 ==========
    'MBTI': {
        name: 'MBTI 人格测试',
        nameEn: 'Myers-Briggs Type Indicator',
        questions: [
            { id: 1, q: '当你参加社交活动时，你通常会：', qEn: 'When you attend social events, you usually:', options: [
                { text: '主动和陌生人交流', textEn: 'Initiate conversations with strangers', type: 'E' },
                { text: '等待别人来和你交流', textEn: 'Wait for others to approach you', type: 'I' }
            ]},
            { id: 2, q: '你更喜欢哪种学习方式？', qEn: 'Which learning style do you prefer?', options: [
                { text: '通过听讲座和讨论学习', textEn: 'Learn through lectures and discussions', type: 'S' },
                { text: '通过阅读和独自思考学习', textEn: 'Learn through reading and independent thinking', type: 'N' }
            ]},
            { id: 3, q: '在做决定时，你更看重：', qEn: 'When making decisions, you value more:', options: [
                { text: '事实和逻辑', textEn: 'Facts and logic', type: 'T' },
                { text: '对他人的影响', textEn: 'Impact on others', type: 'F' }
            ]},
            { id: 4, q: '你更喜欢哪种生活方式？', qEn: 'Which lifestyle do you prefer?', options: [
                { text: '有计划、有安排', textEn: 'Planned and organized', type: 'J' },
                { text: '灵活、随机应变', textEn: 'Flexible and spontaneous', type: 'P' }
            ]},
            { id: 5, q: '你通常从哪里获得能量？', qEn: 'Where do you usually get your energy from?', options: [
                { text: '与他人相处', textEn: 'Being with others', type: 'E' },
                { text: '独处时间', textEn: 'Time alone', type: 'I' }
            ]},
            { id: 6, q: '你更关注：', qEn: 'You focus more on:', options: [
                { text: '眼前的具体事物', textEn: 'Current concrete realities', type: 'S' },
                { text: '未来的可能性', textEn: 'Future possibilities', type: 'N' }
            ]},
            { id: 7, q: '你被认为是：', qEn: 'You are considered to be:', options: [
                { text: '公正客观的', textEn: 'Fair and objective', type: 'T' },
                { text: '富有同理心的', textEn: 'Compassionate', type: 'F' }
            ]},
            { id: 8, q: '你更喜欢：', qEn: 'You prefer:', options: [
                { text: '按计划行事', textEn: 'Following a plan', type: 'J' },
                { text: '保持开放选项', textEn: 'Keeping options open', type: 'P' }
            ]},
            { id: 9, q: '在工作中，你更喜欢：', qEn: 'In work, you prefer:', options: [
                { text: '团队协作', textEn: 'Teamwork', type: 'E' },
                { text: '独立工作', textEn: 'Working independently', type: 'I' }
            ]},
            { id: 10, q: '你更容易记住：', qEn: 'You more easily remember:', options: [
                { text: '实际的细节', textEn: 'Practical details', type: 'S' },
                { text: '整体的概念', textEn: 'Overall concepts', type: 'N' }
            ]},
            { id: 11, q: '当你不同意某人时，你会：', qEn: 'When you disagree with someone, you:', options: [
                { text: '基于事实提出反对', textEn: 'Raise objections based on facts', type: 'T' },
                { text: '考虑对方的感受', textEn: 'Consider their feelings', type: 'F' }
            ]},
            { id: 12, q: '你更喜欢什么样的约定：', qEn: 'What kind of appointments do you prefer:', options: [
                { text: '确定的时间和地点', textEn: 'Definite time and place', type: 'J' },
                { text: '灵活的时间和地点', textEn: 'Flexible time and place', type: 'P' }
            ]},
            { id: 13, q: '在空闲时间，你更愿意：', qEn: 'In your free time, you prefer to:', options: [
                { text: '参加社交活动', textEn: 'Attend social activities', type: 'E' },
                { text: '独自阅读或思考', textEn: 'Read or think alone', type: 'I' }
            ]},
            { id: 14, q: '你更相信：', qEn: 'You trust more in:', options: [
                { text: '经验和方法', textEn: 'Experience and methods', type: 'S' },
                { text: '直觉和灵感', textEn: 'Intuition and inspiration', type: 'N' }
            ]},
            { id: 15, q: '你更容易被：', qEn: 'You are more easily affected by:', options: [
                { text: '逻辑论证说服', textEn: 'Logical arguments', type: 'T' },
                { text: '情感诉求打动', textEn: 'Emotional appeals', type: 'F' }
            ]},
            { id: 16, q: '你更喜欢：', qEn: 'You prefer:', options: [
                { text: '完成后再休息', textEn: 'Finishing before resting', type: 'J' },
                { text: '随时休息随时工作', textEn: 'Resting and working as you go', type: 'P' }
            ]},
            { id: 17, q: '你通常：', qEn: 'You usually:', options: [
                { text: '先说后想', textEn: 'Speak then think', type: 'E' },
                { text: '先想后说', textEn: 'Think then speak', type: 'I' }
            ]},
            { id: 18, q: '你更感兴趣的是：', qEn: 'You are more interested in:', options: [
                { text: '已知的事实', textEn: 'Known facts', type: 'S' },
                { text: '新的想法', textEn: 'New ideas', type: 'N' }
            ]},
            { id: 19, q: '当解决问题时，你更依赖：', qEn: 'When solving problems, you rely more on:', options: [
                { text: '客观分析', textEn: 'Objective analysis', type: 'T' },
                { text: '主观价值', textEn: 'Subjective values', type: 'F' }
            ]},
            { id: 20, q: '你更喜欢：', qEn: 'You prefer:', options: [
                { text: '明确的目标', textEn: 'Clear goals', type: 'J' },
                { text: '开放的过程', textEn: 'Open-ended process', type: 'P' }
            ]},
            { id: 21, q: '你通常：', qEn: 'You usually:', options: [
                { text: '容易记住日期', textEn: 'Easily remember dates', type: 'S' },
                { text: '容易记住人的名字', textEn: 'Easily remember names', type: 'N' }
            ]},
            { id: 22, q: '你更愿意：', qEn: 'You would rather:', options: [
                { text: '和谐相处', textEn: 'Get along harmoniously', type: 'F' },
                { text: '坦诚直言', textEn: 'Speak honestly', type: 'T' }
            ]},
            { id: 23, q: '你更喜欢的生活方式：', qEn: 'Your preferred lifestyle:', options: [
                { text: '井井有条', textEn: 'Well-organized', type: 'J' },
                { text: '随性自在', textEn: 'Casual and free', type: 'P' }
            ]},
            { id: 24, q: '当学习新事物时，你：', qEn: 'When learning something new, you:', options: [
                { text: '喜欢动手实践', textEn: 'Like hands-on practice', type: 'S' },
                { text: '喜欢理论探讨', textEn: 'Like theoretical discussion', type: 'N' }
            ]},
            { id: 25, q: '你更容易感到：', qEn: 'You more easily feel:', options: [
                { text: '充满活力', textEn: 'Energetic', type: 'E' },
                { text: '需要独处恢复', textEn: 'Need solitude to recharge', type: 'I' }
            ]},
            { id: 26, q: '你做决定时：', qEn: 'When you make decisions:', options: [
                { text: '迅速果断', textEn: 'Quickly and decisively', type: 'J' },
                { text: '深思熟虑', textEn: 'After careful consideration', type: 'P' }
            ]}
        ]
    },

    // ========== HAMD 汉密尔顿抑郁量表 ==========
    'HAMD': {
        name: 'HAMD 汉密尔顿抑郁量表',
        nameEn: 'Hamilton Depression Rating Scale',
        questions: [
            { id: 1, q: '1. 抑郁情绪（你对悲伤、沮丧或绝望的感受）', qEn: '1. Depressed Mood (Feelings of sadness, hopelessness, helplessness)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 只在问及时才诉述', textEn: '1. Only when asked', score: 1 },
                { text: '2. 在言语中自发地表达', textEn: '2. Spontaneously expressed in speech', score: 2 },
                { text: '3. 不用言语也能从表情、姿势、声音或欲哭中流露', textEn: '3. Can be seen from expression, posture, voice or tears', score: 3 },
                { text: '4. 患者的自发言语和非语言表达几乎完全表现为抑郁', textEn: '4. Almost entirely expressed as depression', score: 4 }
            ]},
            { id: 2, q: '2. 有罪感（你对自己犯错的感受）', qEn: '2. Guilt (Feelings about your mistakes)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 责备自己，感到自己已连累他人', textEn: '1. Self-blame, feel you have let others down', score: 1 },
                { text: '2. 认为自己犯了罪，或反复思考以往的过失和错误', textEn: '2. Believe you have sinned, or repeatedly think about past faults', score: 2 },
                { text: '3. 认为目前的疾病是自己所受惩罚，或有罪恶妄想', textEn: '3. Believe current illness is your punishment, or have guilt delusions', score: 3 },
                { text: '4. 罪恶妄想伴有指责或恐怖性自罚', textEn: '4. Guilt delusions with self-blame or punishment', score: 4 }
            ]},
            { id: 3, q: '3. 自杀（你对生活的态度）', qEn: '3. Suicide (Your attitude towards life)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 觉得活着没有意义', textEn: '1. Feel life has no meaning', score: 1 },
                { text: '2. 希望自己已经死去，或常想到与死有关的事', textEn: '2. Wish you were dead, or often think about death', score: 2 },
                { text: '3. 消极观念或自杀态度', textEn: '3. Negative thoughts or suicidal attitude', score: 3 },
                { text: '4. 严重自杀行为', textEn: '4. Serious suicide attempt', score: 4 }
            ]},
            { id: 4, q: '4. 入睡困难（你入睡的困难程度）', qEn: '4. Insomnia - Initial (Difficulty falling asleep)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 主诉有时有入睡困难', textEn: '1. Sometimes have difficulty falling asleep', score: 1 },
                { text: '2. 主诉每晚均有入睡困难', textEn: '2. Every night have difficulty falling asleep', score: 2 }
            ]},
            { id: 5, q: '5. 睡眠不深（你的睡眠质量）', qEn: '5. Insomnia - Middle (Quality of sleep)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 睡眠浅，多噩梦', textEn: '1. Light sleep with many nightmares', score: 1 },
                { text: '2. 半夜（晚12点以前）曾醒来（不包括上厕所）', textEn: '2. Woke up before midnight (excluding bathroom trips)', score: 2 }
            ]},
            { id: 6, q: '6. 早醒（你早晨醒来的情况）', qEn: '6. Insomnia - Late (Morning awakening)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 有早醒，但能重新入睡', textEn: '1. Wake up early but can fall back asleep', score: 1 },
                { text: '2. 早醒后无法重新入睡', textEn: '2. Wake up early and cannot fall back asleep', score: 2 }
            ]},
            { id: 7, q: '7. 工作和兴趣（你对活动和工作的兴趣）', qEn: '7. Work and Interests (Your interest in activities and work)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 问及时才诉述', textEn: '1. Only mention when asked', score: 1 },
                { text: '2. 自发地直接或间接表达对活动、工作或学习失去兴趣', textEn: '2. Spontaneously express loss of interest in activities', score: 2 },
                { text: '3. 活动时间减少或成效不佳', textEn: '3. Reduced activity or poor performance', score: 3 },
                { text: '4. 因目前的疾病而停止工作，或病者从不主动从事任何活动', textEn: '4. Stopped working due to illness, or never initiates activities', score: 4 }
            ]},
            { id: 8, q: '8. 阻滞（你的思维和说话速度）', qEn: '8. Retardation (Your thinking and speech speed)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 精神检查中发现轻度阻滞', textEn: '1. Mild retardation found in examination', score: 1 },
                { text: '2. 精神检查中发现明显阻滞', textEn: '2. Obvious retardation found in examination', score: 2 },
                { text: '3. 精神检查进行困难', textEn: '3. Difficult to conduct examination', score: 3 },
                { text: '4. 完全不能回答问题（木僵）', textEn: '4. Cannot answer questions at all (stupor)', score: 4 }
            ]},
            { id: 9, q: '9. 激越（你的精神状态）', qEn: '9. Agitation (Your mental state)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 检查时有些心神不定', textEn: '1. Some restlessness during examination', score: 1 },
                { text: '2. 明显心神不定或小动作多', textEn: '2. Obvious restlessness or many small movements', score: 2 },
                { text: '3. 不能静坐，检查中曾起立', textEn: '3. Cannot sit still, stood up during examination', score: 3 },
                { text: '4. 搓手、咬手指、扯头发、咬嘴唇', textEn: '4. Rubbing hands, biting fingers, pulling hair, biting lips', score: 4 }
            ]},
            { id: 10, q: '10. 精神性焦虑（你的焦虑感受）', qEn: '10. Psychic Anxiety (Your anxiety)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 问及时才诉述', textEn: '1. Only mention when asked', score: 1 },
                { text: '2. 自发地表达', textEn: '2. Spontaneously expressed', score: 2 },
                { text: '3. 表情和言谈流露明显忧虑', textEn: '3. Obvious worry in expression and speech', score: 3 },
                { text: '4. 明显惊恐', textEn: '4. Obviously terrified', score: 4 }
            ]},
            { id: 11, q: '11. 躯体性焦虑（你的身体焦虑症状）', qEn: '11. Somatic Anxiety (Physical anxiety symptoms)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度（肯定的上述症状至少4项）', textEn: '2. Moderate (at least 4 of the above symptoms)', score: 2 },
                { text: '3. 重度（上述症状严重影响生活）', textEn: '3. Severe (symptoms seriously affect life)', score: 3 }
            ]},
            { id: 12, q: '12. 胃肠道症状', qEn: '12. Gastrointestinal Symptoms', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 食欲减退，但不需他人鼓励便不要求进食', textEn: '1. Reduced appetite, no need for encouragement to eat', score: 1 },
                { text: '2. 进食需他人催促，或不经过打乱进食时间便不请求进食', textEn: '2. Needs encouragement to eat, or only eats at irregular times', score: 2 }
            ]},
            { id: 13, q: '13. 全身症状（你的整体身体状态）', qEn: '13. General Somatic Symptoms', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 四肢、背部或颈部沉重感、头痛、肌肉疼痛、全身乏力', textEn: '1. Heaviness in limbs, back or neck, headache, muscle pain, fatigue', score: 1 },
                { text: '2. 症状明显', textEn: '2. Symptoms obvious', score: 2 }
            ]},
            { id: 14, q: '14. 性症状（如性欲减退）', qEn: '14. Genital Symptoms (e.g., reduced libido)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 重度', textEn: '2. Severe', score: 2 }
            ]},
            { id: 15, q: '15. 疑病（你对身体健康的想法）', qEn: '15. Hypochondriasis (Your thoughts about physical health)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 对身体过分关注', textEn: '1. Excessive concern about body', score: 1 },
                { text: '2. 反复思考健康问题', textEn: '2. Repeatedly thinking about health problems', score: 2 },
                { text: '3. 有疑病妄想', textEn: '3. Has hypochondriacal delusions', score: 3 },
                { text: '4. 伴有幻觉的疑病妄想', textEn: '4. Hypochondriacal delusions with hallucinations', score: 4 }
            ]},
            { id: 16, q: '16. 体重减轻（根据体重记录或病人估计）', qEn: '16. Weight Loss (Based on weight records or patient estimate)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 也许有或无肯定问其体重时诉体重减轻', textEn: '1. May have or no definite weight loss when asked', score: 1 },
                { text: '2. 诉体重已减轻（病人诉述）', textEn: '2. Patient reports weight loss', score: 2 }
            ]},
            { id: 17, q: '17. 自知力（你对自己状态的认识）', qEn: '17. Insight (Your awareness of your condition)', options: [
                { text: '0. 知道自己有病，但归于食谱、环境、病毒感染或其他原因', textEn: '0. Know you are ill, but attribute to diet, environment, etc.', score: 0 },
                { text: '1. 否认有病', textEn: '1. Deny being ill', score: 1 }
            ]}
        ]
    },

    // ========== HAMA 汉密尔顿焦虑量表 ==========
    'HAMA': {
        name: 'HAMA 汉密尔顿焦虑量表',
        nameEn: 'Hamilton Anxiety Rating Scale',
        questions: [
            { id: 1, q: '1. 焦虑心境（担心、担忧、害怕）', qEn: '1. Anxious Mood (Worry, anxiety, fear)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 担心、担忧', textEn: '1. Worry', score: 1 },
                { text: '2. 态度不自然', textEn: '2. Unnatural attitude', score: 2 },
                { text: '3. 有担心的表情', textEn: '3. Worried expression', score: 3 },
                { text: '4. 明显惊恐', textEn: '4. Obviously terrified', score: 4 }
            ]},
            { id: 2, q: '2. 紧张（紧张感、易疲劳、恐惧）', qEn: '2. Tension (Tension, fatigue, fear)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻微紧张', textEn: '1. Slightly tense', score: 1 },
                { text: '2. 紧张感明显', textEn: '2. Obvious tension', score: 2 },
                { text: '3. 表现紧张', textEn: '3. Showing tension', score: 3 },
                { text: '4. 明显惊恐状态', textEn: '4. Obviously panicked', score: 4 }
            ]},
            { id: 3, q: '3. 害怕（怕黑、怕陌生人、怕动物等）', qEn: '3. Fears (Darkness, strangers, animals, etc.)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 4, q: '4. 失眠（入睡困难、睡眠不深、多梦）', qEn: '4. Insomnia (Difficulty falling asleep, light sleep, many dreams)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 5, q: '5. 认知功能（注意力不集中、记忆力差）', qEn: '5. Cognitive (Poor concentration, poor memory)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 6, q: '6. 抑郁心境（兴趣丧失、失望、情绪低落）', qEn: '6. Depressed Mood (Loss of interest, disappointment, low mood)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 7, q: '7. 肌肉系统症状（肌肉酸痛、抽搐、磨牙等）', qEn: '7. Muscular (Muscle soreness, twitches, teeth grinding, etc.)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 8, q: '8. 感觉系统症状（耳鸣、视物模糊、感觉迟钝）', qEn: '8. Sensory (Tinnitus, blurred vision, numbness)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 9, q: '9. 心血管系统症状（心悸、心动过速、胸闷等）', qEn: '9. Cardiovascular (Palpitations, tachycardia, chest tightness)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 10, q: '10. 呼吸系统症状（胸闷、呼吸困难、叹气）', qEn: '10. Respiratory (Chest tightness, difficulty breathing, sighing)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 11, q: '11. 胃肠道症状（吞咽困难、恶心、腹胀）', qEn: '11. Gastrointestinal (Difficulty swallowing, nausea, bloating)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 12, q: '12. 生殖泌尿系统症状（尿频、尿急、性功能障碍）', qEn: '12. Genitourinary (Frequent urination, urgency, sexual dysfunction)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 13, q: '13. 植物神经症状（口干、脸红、手抖、出汗）', qEn: '13. Autonomic (Dry mouth, blushing, trembling hands, sweating)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]},
            { id: 14, q: '14. 会谈时表现（紧张、面部表情、声音等）', qEn: '14. Behavior at Interview (Tension, facial expression, voice, etc.)', options: [
                { text: '0. 无症状', textEn: '0. None', score: 0 },
                { text: '1. 轻度', textEn: '1. Mild', score: 1 },
                { text: '2. 中度', textEn: '2. Moderate', score: 2 },
                { text: '3. 较重', textEn: '3. Quite serious', score: 3 },
                { text: '4. 重度', textEn: '4. Severe', score: 4 }
            ]}
        ]
    },

    // ========== SDS 抑郁自评量表 ==========
    'SDS': {
        name: 'SDS 抑郁自评量表',
        nameEn: 'Self-Rating Depression Scale',
        questions: [
            { id: 1, q: '1. 我感到情绪低落、沮丧和忧郁', qEn: '1. I feel down-hearted, blue, and sad', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 2, q: '2. 我感到早晨心情最好', qEn: '2. I feel best in the morning', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 3, q: '3. 我容易哭泣或想哭', qEn: '3. I have crying spells or feel like crying', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 4, q: '4. 我晚上睡眠不好', qEn: '4. I have trouble sleeping at night', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 5, q: '5. 我吃饭像平时一样多', qEn: '5. I eat as much as I always do', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 6, q: '6. 我的性功能和平时一样好', qEn: '6. My sex life is as good as it always is', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 7, q: '7. 我感到体重在下降', qEn: '7. I notice I am losing weight', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 8, q: '8. 我有便秘的烦恼', qEn: '8. I am troubled by constipation', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 9, q: '9. 我的心跳比平时快', qEn: '9. My heart beats faster than usual', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 10, q: '10. 我无缘无故感到疲劳', qEn: '10. I get tired for no reason', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 11, q: '11. 我的头脑像以前一样清晰', qEn: '11. My mind is as clear as it always has been', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 12, q: '12. 我做事像平时一样不感到困难', qEn: '12. I find it as easy to do things as I always have', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 13, q: '13. 我坐卧不安，难以保持平静', qEn: '13. I am restless and can\'t keep still', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 14, q: '14. 我对未来感到有希望', qEn: '14. I feel hopeful about the future', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 15, q: '15. 我比平时更容易激怒', qEn: '15. I am more irritable than usual', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 16, q: '16. 我容易做出决定', qEn: '16. I find it easy to make decisions', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 17, q: '17. 我觉得自己是没有价值的或不够好的人', qEn: '17. I feel that I am a useful and needed person', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 18, q: '18. 我的生活很充实', qEn: '18. My life is pretty full', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 19, q: '19. 我觉得我死了别人会过得更好', qEn: '19. I think that if I died people would be better off', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 20, q: '20. 我仍旧像以前一样对自己感兴趣', qEn: '20. I still enjoy the things I used to enjoy', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]}
        ]
    },

    // ========== SAS 焦虑自评量表 ==========
    'SAS': {
        name: 'SAS 焦虑自评量表',
        nameEn: 'Self-Rating Anxiety Scale',
        questions: [
            { id: 1, q: '1. 我感到比平时更紧张和焦虑', qEn: '1. I feel more nervous and anxious than usual', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 2, q: '2. 我无缘无故地感到害怕', qEn: '2. I feel frightened for no reason at all', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 3, q: '3. 我容易心烦意乱或坐立不安', qEn: '3. I get upset easily or feel disturbed', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 4, q: '4. 我觉得自己可能要晕倒', qEn: '4. I feel I might pass out', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 5, q: '5. 我感到呼吸困难（无体力活动时）', qEn: '5. I feel breathing difficulty (without physical activity)', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 6, q: '6. 我经常手发抖', qEn: '6. I often have trembling hands', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 7, q: '7. 我因为头痛、头颈痛和背痛而烦恼', qEn: '7. I am troubled by headaches, neck and back pain', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 8, q: '8. 我感觉容易衰弱和疲乏', qEn: '8. I feel weak and get tired easily', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 9, q: '9. 我感到心平气和、容易安静坐着', qEn: '9. I feel calm and can sit still easily', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 10, q: '10. 我感到心跳得很快', qEn: '10. I feel my heart beating fast', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 11, q: '11. 我因为一阵阵头晕而烦恼', qEn: '11. I am troubled by dizziness', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 12, q: '12. 我有晕倒发作或觉得要晕倒', qEn: '12. I have fainting spells or feel faint', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 13, q: '13. 我吸气呼气都感到很容易', qEn: '13. I can breathe in and out easily', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 14, q: '14. 我的手脚麻木和刺痛', qEn: '14. I have numbness and tingling in my hands and feet', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 15, q: '15. 我因为胃痛和消化不良而烦恼', qEn: '15. I am troubled by stomach pain and indigestion', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 16, q: '16. 我常常要小便', qEn: '16. I have to urinate often', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 17, q: '17. 我的手脚常常是干燥温暖的', qEn: '17. My hands and feet are usually dry and warm', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 18, q: '18. 我脸红发热', qEn: '18. I blush and feel hot', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]},
            { id: 19, q: '19. 我容易入睡并且睡得很好', qEn: '19. I fall asleep easily and sleep well', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 4 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 3 },
                { text: '3. 经常', textEn: '3. Often', score: 2 },
                { text: '4. 持续', textEn: '4. All the time', score: 1 }
            ]},
            { id: 20, q: '20. 我做噩梦', qEn: '20. I have nightmares', options: [
                { text: '1. 从无或极少', textEn: '1. Never or rarely', score: 1 },
                { text: '2. 有时', textEn: '2. Sometimes', score: 2 },
                { text: '3. 经常', textEn: '3. Often', score: 3 },
                { text: '4. 持续', textEn: '4. All the time', score: 4 }
            ]}
        ]
    },

    // ========== MMSE 简易精神状态检查 ==========
    'MMSE': {
        name: 'MMSE 简易精神状态检查',
        nameEn: 'Mini-Mental State Examination',
        questions: [
            { id: 1, q: '1. 今年是哪一年？', qEn: '1. What year is this?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 2, q: '2. 现在是什么季节？', qEn: '2. What season is it now?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 3, q: '3. 今天是多少号？', qEn: '3. What is the date today?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 4, q: '4. 现在是星期几？', qEn: '4. What day of the week is it?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 5, q: '5. 我们现在在哪个城市？', qEn: '5. What city are we in?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 6, q: '6. 我们现在在哪个区/县？', qEn: '6. What district/county are we in?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 7, q: '7. 我们现在在哪栋楼/医院？', qEn: '7. What building/hospital are we in?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 8, q: '8. 现在是第几层楼？', qEn: '8. What floor are we on?', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 9, q: '9. 我说三样东西的名称，请重复（立即回忆）：\n• 树木\n• 钟表\n• 汽车', qEn: '9. I will name three objects. Please repeat them immediately:\n• Tree\n• Clock\n• Car', options: [
                { text: '0. 0项正确', textEn: '0. 0 correct', score: 0 },
                { text: '1. 1项正确', textEn: '1. 1 correct', score: 1 },
                { text: '2. 2项正确', textEn: '2. 2 correct', score: 2 },
                { text: '3. 3项正确', textEn: '3. 3 correct', score: 3 }
            ]},
            { id: 10, q: '10. 100减去7是多少？（连续5次）\n93 - 86 - 79 - 72 - 65', qEn: '10. Subtract 7 from 100 (five times):\n93 - 86 - 79 - 72 - 65', options: [
                { text: '0. 完全错误', textEn: '0. Completely wrong', score: 0 },
                { text: '1. 1个正确', textEn: '1. 1 correct', score: 1 },
                { text: '2. 2个正确', textEn: '2. 2 correct', score: 2 },
                { text: '3. 3个正确', textEn: '3. 3 correct', score: 3 },
                { text: '4. 4个正确', textEn: '4. 4 correct', score: 4 },
                { text: '5. 5个正确', textEn: '5. 5 correct', score: 5 }
            ]},
            { id: 11, q: '11. 请说出刚才让你记住的三样东西（延迟回忆）：', qEn: '11. Please recall the three items I mentioned earlier:', options: [
                { text: '0. 0项', textEn: '0. 0 items', score: 0 },
                { text: '1. 1项', textEn: '1. 1 item', score: 1 },
                { text: '2. 2项', textEn: '2. 2 items', score: 2 },
                { text: '3. 3项', textEn: '3. 3 items', score: 3 }
            ]},
            { id: 12, q: '12. 说出这是什么？（命名）\n• 手表', qEn: '12. What is this? (Naming)\n• Watch', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 13, q: '13. 说出这是什么？（命名）\n• 铅笔', qEn: '13. What is this? (Naming)\n• Pencil', options: [
                { text: '0. 错误', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 14, q: '14. 请复述"四十四只石狮子"', qEn: '14. Please repeat: "No ifs, ands, or buts"', options: [
                { text: '0. 不正确', textEn: '0. Incorrect', score: 0 },
                { text: '1. 正确', textEn: '1. Correct', score: 1 }
            ]},
            { id: 15, q: '15. 请按我说的做（执行命令）：\n• 用右手拿纸\n• 对折\n• 放在腿上', qEn: '15. Please follow my instructions:\n• Take the paper with your right hand\n• Fold it in half\n• Put it on your lap', options: [
                { text: '0. 完全错误', textEn: '0. Completely wrong', score: 0 },
                { text: '1. 完成1步', textEn: '1. Complete 1 step', score: 1 },
                { text: '2. 完成2步', textEn: '2. Complete 2 steps', score: 2 },
                { text: '3. 完全正确', textEn: '3. Completely correct', score: 3 }
            ]},
            { id: 16, q: '16. 请阅读并执行："闭上您的眼睛"（阅读理解）', qEn: '16. Please read and follow: "Close your eyes" (Reading comprehension)', options: [
                { text: '0. 无反应', textEn: '0. No response', score: 0 },
                { text: '1. 正确执行', textEn: '1. Correctly execute', score: 1 }
            ]},
            { id: 17, q: '17. 请写一个完整的句子（要有主语和谓语）', qEn: '17. Please write a complete sentence (must have subject and predicate)', options: [
                { text: '0. 未写', textEn: '0. Not written', score: 0 },
                { text: '1. 写了', textEn: '1. Written', score: 1 }
            ]},
            { id: 18, q: '18. 请照下图画出来（临摹）：两个交叉的五边形', qEn: '18. Please copy the diagram below: Two intersecting pentagons', options: [
                { text: '0. 完全错误', textEn: '0. Completely wrong', score: 0 },
                { text: '1. 完成但有错误', textEn: '1. Completed but with errors', score: 1 },
                { text: '2. 完全正确', textEn: '2. Completely correct', score: 2 }
            ]}
        ]
    },

    // ========== ADL 日常生活活动能力 ==========
    'ADL': {
        name: 'ADL 日常生活活动能力',
        nameEn: 'Activities of Daily Living (Barthel Index)',
        questions: [
            { id: 1, q: '1. 进食（使用餐具的能力）', qEn: '1. Eating (Ability to use utensils)', options: [
                { text: '0. 需极大帮助，完全依赖', textEn: '0. Needs total help, completely dependent', score: 0 },
                { text: '5. 需部分帮助', textEn: '5. Needs partial help', score: 5 },
                { text: '10. 自理，可以使用餐具', textEn: '10. Independent, can use utensils', score: 10 }
            ]},
            { id: 2, q: '2. 洗澡（进入浴室、清洁身体）', qEn: '2. Bathing (Entering bathroom, cleaning body)', options: [
                { text: '0. 依赖', textEn: '0. Dependent', score: 0 },
                { text: '5. 自理，不需要帮助', textEn: '5. Independent, no help needed', score: 5 }
            ]},
            { id: 3, q: '3. 修饰（洗脸、刷牙、梳头等）', qEn: '3. Grooming (Washing face, brushing teeth, combing hair)', options: [
                { text: '0. 需帮助', textEn: '0. Needs help', score: 0 },
                { text: '5. 自理，可以独立完成', textEn: '5. Independent, can complete independently', score: 5 }
            ]},
            { id: 4, q: '4. 穿衣（穿脱衣服、系扣子拉拉链）', q