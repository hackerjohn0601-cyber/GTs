// Writing Coach Data: Prompts, Structures, Rhetoric, and Exemplars
window.WRITING_DATA = {
  // Built-in Exam & Creative Prompts
  prompts: [
    {
      id: 'prompt-cherished-object',
      title: '那一件承載歲月的物件',
      genre: '記敘抒情文',
      genreKey: 'narrative',
      grade: '國中 / 高中 / 學測會考',
      promptText: '生活中有許多看似平凡的舊物——一把磨損的鑰匙、一件褪色的毛衣、一張泛黃的合照，或是祖輩留下的老懷錶。請以「那一件承載歲月的物件」為題，寫一篇記敘抒情文。',
      analysis: {
        themeWord: '物象寄情（以小見大）',
        guide: '避免通篇單純描述物品外觀，應將重點放在「這個物件背後的故事、它所見證的關係，以及它帶給你的心靈轉折與成長」。',
        pitfalls: [
          '❌ 避免寫成產品說明書（花過多篇幅測量長度重量，而無情感投入）。',
          '❌ 避免情感空洞懸浮（「我很愛它」講十次不如描寫一次指尖觸碰時的微顫）。',
          '❌ 避免結局無昇華（只停留在懷念，沒有提煉出對時間或生命的領悟）。'
        ],
        brainstormAngles: [
          '角度一【代際親情】：阿嬤手工縫製的舊百納被，針腳間沉澱的溫柔與守護。',
          '角度二【青春奮鬥】：一雙磨破鞋底的跑鞋，記錄挫折與不服輸的汗水印記。',
          '角度三【時光流變】：一台不再發聲的舊收音機，見證老街與純真童年的消逝。'
        ]
      },
      outlineTemplateId: 'outline-narrative-4',
      modelEssay: {
        title: '範文觀摩：那一把褪色的黃銅鑰匙',
        gradeScore: '98 分 (特優滿分等級)',
        paragraphs: [
          {
            text: '抽屜的最底層，靜臥著一把齒槽已被歲月磨得圓鈍的黃銅鑰匙。它沒有現代電子鎖的清脆蜂鳴，也沒有銀飾的耀眼光澤，唯有一層因無數次摩挲而泛著暗啞的溫潤。每當指尖觸碰到它冰涼的金屬骨架，那段在雨巷盡頭等待放晴的童年時光，便如潮水般無聲湧至。',
            comment: '【起筆引人入勝】：以微距鏡頭般的特寫切入物件質感，用「暗啞溫潤」定下沉靜深情的基調，迅速營造回憶氛圍。'
          },
          {
            text: '小時候，父母常年奔波在外，這把掛在胸前紅繩上的鑰匙，成了我最早學會的獨立標誌。清脆的鎖舌彈開聲，曾是我每天放學後最孤寂也是最踏實的慰藉。屋內是清冷安靜的空氣，但鑰匙貼在胸膛的微熱，卻如同一道無聲的承諾——只要轉動它，就有一方屬於我的避風港。',
            comment: '【承接情感縱深】：由物及人，將冰冷鑰匙轉化為「獨立」與「歸屬」的心靈圖騰，刻畫細膩的情感衝突。'
          },
          {
            text: '直到高中那年深冬深夜，我在自修室苦讀至末班車停駛，慌亂摸索口袋，竟驚覺鑰匙遺失了。站在反鎖的家門前，寒風穿透單薄校服，無助感排山倒海。正當我準備蹲在門廊熬過長夜時，門軸「吱呀」一聲輕響開了。客廳那盞昏黃的小夜燈下，母親披著厚毯坐在沙發上，眼眶泛紅：「聽見腳步聲，我就知道你回來了。」那一刻我才明白，鎖住家的從來不是黃銅彈簧，而是那顆始終為你徹夜留燈的心。',
            comment: '【轉折掀起高潮】：透過「鑰匙遺失」的情節轉折，將具象的「金屬鑰匙」升格為抽象的「母親的守候」，情感張力達到頂峰。'
          },
          {
            text: '如今老宅已改換密碼鎖，但我依然把這枚舊鑰匙妥帖收藏。它不再能打開具體的某一扇木門，卻永遠鎖住了歲月中最純粹的溫存。當未來風雨交加、身心俱疲之際，只要想起它，我便知道，在這遼闊世界上，總有一處燈火，為我毫無保留地敞開。',
            comment: '【收束哲理昇華】：虛實相生，收尾自然拔高至生命維度，含蓄幽遠，餘音裊裊。'
          }
        ]
      }
    },
    {
      id: 'prompt-discipline-freedom',
      title: '論自律與自由的辯證',
      genre: '議論文 / 論說文',
      genreKey: 'argumentative',
      grade: '高中 / 大學學測國寫 / 社會思辨',
      promptText: '有人認為「隨心所欲、不受束縛」才是真正的自由；也有人主張「唯有嚴格的自律，才能獲得最高境界的自由」。請以「論自律與自由」為題，提出你的核心主張，並佐以論據進行嚴謹論述。',
      analysis: {
        themeWord: '思辨與駁論（二元關係解構）',
        guide: '避免流於簡單說教。必須精確界定何為「消極自由（免於受限）」與「積極自由（自主掌控能力）」，指出放縱往往是戴著自由面具的枷鎖。',
        pitfalls: [
          '❌ 避免單向狂讚自律而無視人性（不要寫成冷酷的苦行僧式口號）。',
          '❌ 避免概念偷換（把自由等同於懶惰或為所欲為）。',
          '❌ 避免缺乏實例支撐（務必引入體育、藝術、科技或哲學經典案例）。'
        ],
        brainstormAngles: [
          '角度一【藝術與技藝】：鋼琴大師在黑白琴鍵上的自由揮灑，根植於十數萬小時枯燥音階的指尖自律。',
          '角度二【多巴胺與慾望反思】：沉迷演算法短影音看似自由選擇，實則淪為注意力資本主義的提線木偶。',
          '角度三【康德哲學視角】：自律即自律（Autonomy），由理性主宰慾望，方成就作為人的最高尊嚴。'
        ]
      },
      outlineTemplateId: 'outline-arg-5',
      modelEssay: {
        title: '範文觀摩：破繭於自律之繭，翱翔於自由之天',
        gradeScore: '99 分 (思辨殿堂級)',
        paragraphs: [
          {
            text: '當代社會常將「自由」描繪成一種擺脫一切約束的真空狀態——睡到自然醒、拋開既定日程、任隨慾望流淌。然而，這種被消費主義美化的「放任之樂」，往往在短暫狂歡後帶來更巨大的空虛與被動。正如哲學家康德所言，任由慾望支配並非自由，而是動物性的奴役。真正的自由，從來不是為所欲為的肆意，而是由深度自律鑄就的主控權。',
            comment: '【破題立論】：以犀利筆鋒批判當下大眾對自由的淺薄誤解，引康德名言定調中心論點，層次分明。'
          },
          {
            text: '首先，自律是通往任何卓越境界的唯一天梯。世人驚嘆於體操選手在平衡木上的輕盈翻騰、爵士樂手在即興合奏時的靈動神采，往往只見其「自由」，卻未見其「自律」。若是沒有無數個清晨對肌肉記憶的苛刻雕琢、對樂理節奏的枯燥打磨，所謂的「自由發揮」只會淪為荒腔走板的混亂。自律如同風箏之線，看似牽絆，實則給予了搏擊長空的平衡力量。',
            comment: '【分論點一（技藝維度）】：採用生動譬喻（風箏之線），闡明自律是自由揮灑的底層基石。'
          },
          {
            text: '或許有人會質疑：條條框框的紀律，難道不會扼殺生命的野性與詩意？誠然，機械僵化的教條確實令人窒息。但我們所倡導的自律，並非外界強加的枷鎖，而是「由內而發的自省與專注」。當演算法以毫秒為單位餵養廉價多巴胺時，能拒絕誘惑、關閉螢幕、翻開經典的人，才是精神世界真正的主人。反之，那些自詡「不想被拘束」的人，往往在不知不覺中成為慾望的囚徒。',
            comment: '【反詰駁論（思維躍遷）】：主動提出對立質疑，界定「他律」與「自律」之別，以演算法時代為鏡，批判深刻。'
          },
          {
            text: '行筆至此，自律與自由的辯證已然明晰：自律是渡船，自由是彼岸；自律是深埋地底的根系，自由是枝頭傲然綻放的花朵。唯有在自我約束中修剪雜枝，靈魂方能朝向天際無拘延展。願我們皆能在喧囂世間守住內在秩序，以自律為翼，飛越慾望迷霧，抵達無可撼動的真正自由。',
            comment: '【總結昇華】：多組排比譬喻並舉，氣勢磅礴，文采斐然，給出引領性的精神指南。'
          }
        ]
      }
    },
    {
      id: 'prompt-english-ai',
      title: 'AI in Education: Partner or Peril?',
      genre: 'English Essay (Opinion)',
      genreKey: 'english',
      grade: 'TOEFL / IELTS Band 8+ / Senior High',
      promptText: 'With the exponential rise of generative AI in classrooms, educators and students are divided. In your opinion, will artificial intelligence fundamentally elevate human learning, or will it erode critical thinking? Write a coherent 5-paragraph argumentative essay.',
      analysis: {
        themeWord: 'Technological Synergy & Pedagogy',
        guide: 'Acknowledge the valid risks of over-reliance and academic dishonesty, then pivot to how AI transforms passive memorization into high-level inquiry.',
        pitfalls: [
          '❌ Do not write a purely narrative story about using ChatGPT.',
          '❌ Avoid sweeping absolute claims ("AI will definitely destroy all teachers").',
          '❌ Keep paragraph topic sentences strictly focused on one central argument.'
        ],
        brainstormAngles: [
          'Angle 1 [Personalized Tutoring]: 24/7 adaptive scaffolding tailored to individual cognitive paces.',
          'Angle 2 [Cognitive Offloading Risk]: The hazard of muscle atrophy in brainstorming if students prompt mindlessly.',
          'Angle 3 [Synthesis & Conclusion]: Human critical discernment becomes the ultimate currency; AI as an intellectual sparring partner.'
        ]
      },
      outlineTemplateId: 'outline-eng-5',
      modelEssay: {
        title: 'Exemplar: Forging the Symbiotic Classroom',
        gradeScore: 'Band 8.5 / 99%',
        paragraphs: [
          {
            text: 'The advent of generative artificial intelligence has undeniably disrupted the traditional educational paradigm. While detractors caution against cognitive complacency and academic misconduct, it is my firm conviction that AI, when leveraged with intentional pedagogy, serves as an unprecedented catalyst for democratizing knowledge and fostering higher-order inquiry.',
            comment: '【Flawless Thesis Hook】: Introduces controversy, states unequivocal stance, and previews core dimensions.'
          },
          {
            text: 'Foremost among its benefits is the radical personalization of the learning curve. In a standard classroom of thirty students, a lone educator can seldom accommodate divergent cognitive paces. AI-driven systems bridge this discrepancy by dynamically generating tailored analogies, scaffolding complex mathematical proofs, and providing tireless real-time feedback. Consequently, education shifts from a rigid assembly line into an adaptive intellectual ecosystem.',
            comment: '【Body 1 - Personalization】: Employs sophisticated lexicon ("divergent cognitive paces", "adaptive intellectual ecosystem") with tight logical progression.'
          },
          {
            text: 'Admittedly, legitimate anxieties persist regarding cognitive atrophy. If students delegate thesis formation and original synthesis to automated prompts, their capacity for rigorous critical discernment will inevitably wither. However, this predicament should not prompt outright prohibition; rather, it demands an overhaul of pedagogical metrics. Assessment must pivot from regurgitating static facts to evaluating the nuance of prompt engineering and ethical dialectic.',
            comment: '【Body 2 - Concession & Refutation】: Acknowledges counterarguments squarely before dismantling them with proactive curriculum remedies.'
          },
          {
            text: 'In summation, artificial intelligence is neither an existential menace nor a miraculous substitute for genuine curiosity; it is a mirror reflecting and magnifying our intellectual ambition. By embracing AI as a rigorous sparring partner rather than an effortless crutch, humanity can cultivate a generation of learners who transcend rote memorization to achieve profound conceptual mastery.',
            comment: '【Conclusion - Synthesis】: Delivers a balanced, inspirational closing cadence that elevates the discourse beyond binary dogma.'
          }
        ]
      }
    }
  ],

  // Structural Outline Blueprints
  outlineBlueprints: {
    'outline-narrative-4': {
      name: '起承轉合經典記敘架構 (4段式)',
      description: '最經典且百搭的抒情散文與記敘文模型，層層遞進，情感澎湃。',
      steps: [
        {
          stage: '起 (開端定調)',
          prompt: '特寫聚焦於物象、場景或一句難忘的話。建立氛圍，埋下懸念。',
          starter: '在……的角落，那件……靜靜佇立，勾起我深藏心底的記憶。',
          tips: '運用色彩、聲響或氣味等感官細節，瞬間抓住讀者眼球。'
        },
        {
          stage: '承 (情節鋪陳)',
          prompt: '交代事件起因與人際互動，展現當初的期待、迷惘或日常溫馨。',
          starter: '猶記得那年……，日子總是……，而他/她總是默默地……',
          tips: '刻畫人物細微的動作與眼神，切忌只用大詞概括。'
        },
        {
          stage: '轉 (矛盾激化與頓悟)',
          prompt: '突發事件、情感衝突或意外遺失，引發強烈的心靈震撼與反省。',
          starter: '然而，命運總在不經意處轉折。直到那一天……我看見了……',
          tips: '放慢敘事節奏，將心跳、呼吸、眼淚等生理反應與心理掙扎結合。'
        },
        {
          stage: '合 (收束昇華)',
          prompt: '回首往事，由物及理，昇華出對生命、親情或成長的深刻體會。',
          starter: '如今……物換星移，但我知道，有些東西早已刻進骨血……',
          tips: '首尾呼應，但不可只是機械重複開頭，必須有心靈認知的跳躍。'
        }
      ]
    },
    'outline-arg-5': {
      name: '五段式立論思辨架構 (起-正-反-合-昇華)',
      description: '學測國寫、指考與學術申論最拿高分的嚴謹邏輯體系。',
      steps: [
        {
          stage: '一、 破題立論 (引論)',
          prompt: '引述現象或名言，界定關鍵概念，亮出鮮明無疑的中心論點。',
          starter: '近年來，關於……的爭論甚囂塵上。依我之見，……才是真正的關鍵。',
          tips: '中心論點務必一句話能說清，不可模稜兩可。'
        },
        {
          stage: '二、 正向深論 (分論點一)',
          prompt: '從個人素養/微觀機制出發，佐以具體事例，證明論點之必然。',
          starter: '首先，從個人發展維度審視，……是不可或缺的基石。正如……',
          tips: '舉例要精準，敘述控制在三分之一，三分之二用於因果邏輯分析。'
        },
        {
          stage: '三、 拓展維度 (分論點二)',
          prompt: '推進至社會、歷史或文化宏觀層面，展現思想厚度。',
          starter: '更深一層而言，放眼人類文明的演進史，……更是推動進步的動力。',
          tips: '層次遞進，不可與第二段平級重複。'
        },
        {
          stage: '四、 辯證駁論 (破除偏頗)',
          prompt: '直面反對意見，分析其合理性與局限，反客為主，強化己方主張。',
          starter: '固然，持反對立場者常指陳……；然而這種觀點忽視了……',
          tips: '展現客觀包容的胸襟，不搞惡意歪曲（避免稻草人謬誤）。'
        },
        {
          stage: '五、 結語與行動倡議',
          prompt: '統整全篇，昇華至時代價值與具體行動指南。',
          starter: '綜上所述，……並非不可逾越的鴻溝。唯有……我們方能……',
          tips: '用富有韻律感與哲理性的警句作結，餘音繞樑。'
        }
      ]
    },
    'outline-eng-5': {
      name: 'English 5-Paragraph Essay Blueprint',
      description: 'The global standard for TOEFL, IELTS, SAT, and College Composition.',
      steps: [
        {
          stage: 'Paragraph 1: Introduction & Thesis',
          prompt: 'Hook reader, outline context, state clear thesis with roadmap.',
          starter: 'In an era dominated by..., the question of... has sparked fierce debate. I contend that...',
          tips: 'The thesis statement must be the undisputed anchor of your entire paper.'
        },
        {
          stage: 'Paragraph 2: First Supporting Argument',
          prompt: 'Topic sentence + Specific concrete evidence + Analysis + Link back.',
          starter: 'Primary among the justifications is that... Consider, for example,...',
          tips: 'Follow PEEL: Point, Evidence, Explanation, Link.'
        },
        {
          stage: 'Paragraph 3: Second Supporting Argument',
          prompt: 'Introduce a complementary, higher-level secondary justification.',
          starter: 'Beyond individual implications, this phenomenon concurrently fosters...',
          tips: 'Use smooth transitions (Furthermore, In tandem with this).'
        },
        {
          stage: 'Paragraph 4: Counterargument & Rebuttal',
          prompt: 'Acknowledge an opposing viewpoint and systematically refute it.',
          starter: 'Admittedly, skeptics often point to... Nonetheless, this critique overlooks...',
          tips: 'Show intellectual maturity by tackling the strongest counterpoint.'
        },
        {
          stage: 'Paragraph 5: Synthesis & Broad Implication',
          prompt: 'Restate thesis in novel words and leave a memorable thought.',
          starter: 'To recapitulate, while challenges remain, the broader imperative is clear...',
          tips: 'Never introduce entirely new arguments in the final paragraph.'
        }
      ]
    }
  },

  // Golden Sentence & Rhetoric Palette for Instant Inspiration
  rhetoricLibrary: [
    {
      category: '成語與雅詞',
      items: [
        { phrase: '浮光掠影', desc: '比喻觀察不細緻或印象不深刻', usage: '切忌如浮光掠影般草草走過生命' },
        { phrase: '跬步千里', desc: '比喻積少成多，終能成就大事', usage: '深邃的造詣無一不是在跬步千里中鑄成' },
        { phrase: '披沙揀金', desc: '比喻從大量事物中選取精華', usage: '在資訊洪流中披沙揀金，方得智慧真容' },
        { phrase: '溫潤如玉', desc: '形容品格謙遜包容、有光彩而不刺眼', usage: '歲月淬鍊出的氣質，溫潤如玉而內蘊鋒芒' },
        { phrase: '孤峰獨秀', desc: '形容獨樹一幟、卓絕不凡', usage: '不隨波逐流，在思想的曠野裡孤峰獨秀' },
        { phrase: '弦歌不輟', desc: '形容學業或文風連續不斷', usage: '縱處逆境，心中的求知之火依然弦歌不輟' }
      ]
    },
    {
      category: '哲理名言點綴',
      items: [
        { phrase: '康德：自律使我們免於淪為慾望的奴隸。', desc: '論自律、自由與道德自主性的最佳立論武器', usage: '正如康德所省思，真正的自由是理性的勝利。' },
        { phrase: '尼采：凡不能毀滅我的，必使我更強大。', desc: '論挫折、成長與意志磨練的金句', usage: '那些深夜裡無聲的苦痛，終將化作破繭的羽翼。' },
        { phrase: '羅曼·羅蘭：世界上只有一種真正的英雄主義，就是認清生活的真相後依然熱愛它。', desc: '論面對現實、堅韌人生的深層抒情', usage: '在破碎中重拾熱愛，方顯靈魂的高貴。' },
        { phrase: '王爾德：我們都在陰溝裡，但仍有人仰望星空。', desc: '論理想、希望與精神追求的經典對比', usage: '哪怕身陷繁瑣，亦不可忘卻仰望浩瀚星河。' }
      ]
    },
    {
      category: '高分感官意象',
      items: [
        { phrase: '暮色如溶金般浸染長街', desc: '視覺色彩昇華，營造柔美黃昏氛圍', usage: '暮色如溶金般浸染長街，將歸人的影子拉得悠長。' },
        { phrase: '空氣中浮動著草木初醒的青澀芬芳', desc: '嗅覺與意境結合，象徵希望與初春', usage: '推開晨窗，空氣中浮動著草木初醒的青澀芬芳。' },
        { phrase: '時鐘的滴答聲在寂靜中被放大成命運的鼓點', desc: '聽覺通感，展現考前或重大抉擇前的緊迫心境', usage: '夜深人靜，時鐘的滴答聲在寂靜中被放大成命運的鼓點。' },
        { phrase: '雨絲如微涼的琴弦，在瓦楞上奏起舊日迴響', desc: '觸覺與聽覺交融，適合懷舊憶往文章', usage: '雨絲如微涼的琴弦，在瓦楞上奏起舊日迴響。' }
      ]
    },
    {
      category: 'English Transitions & Lexicon',
      items: [
        { phrase: 'Inextricably linked with', desc: '緊密相連、密不可分', usage: 'Human well-being is inextricably linked with environmental stewardship.' },
        { phrase: 'Serve as a formidable catalyst for', desc: '成為……的強大催化劑', usage: 'Technological innovations serve as a formidable catalyst for economic revitalisation.' },
        { phrase: 'Transcend the realm of mere conjecture', desc: '超越單純猜想的範疇，已成事實', usage: 'The benefits of disciplined practice transcend the realm of mere conjecture.' },
        { phrase: 'Strike a delicate balance between', desc: '在……兩者間取得精妙平衡', usage: 'Policy makers must strike a delicate balance between rapid innovation and ethical guardrails.' }
      ]
    }
  ]
};
