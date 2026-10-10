// Curriculum Editions & Grade Units Database for Taiwan Curriculum (翰林、康軒、南一 全年級完整收錄)
window.CURRICULUM_DATA = {
  editions: [
    { id: 'kangxuan', name: '康軒版 (Kangxuan)', icon: '🟢', color: '#10b981' },
    { id: 'hanlin', name: '翰林版 (Hanlin)', icon: '🔵', color: '#3b82f6' },
    { id: 'nani', name: '南一版 (Nani)', icon: '🟠', color: '#f97316' }
  ],
  grades: [
    { id: 'g7', name: '國一 (七年級)', level: '國中' },
    { id: 'g8', name: '國二 (八年級)', level: '國中' },
    { id: 'g9', name: '國三 (九年級會考)', level: '國中' },
    { id: 'senior', name: '高中 (學測/分科)', level: '高中' }
  ],
  subjects: [
    { id: 'bio_science', name: '自然與生物/理化', icon: '🔬' },
    { id: 'chinese', name: '國語文', icon: '✍️' },
    { id: 'english', name: '英語文', icon: '🌍' },
    { id: 'math', name: '數學', icon: '🔢' }
  ],
  units: [
    // ==========================================
    // 國一 (七年級)
    // ==========================================
    {
      id: 'unit-g7-bio-1-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '生命的起源與生命現象',
      term: '上學期',
      description: '原始大氣組成（水氣、氨、甲烷）、有機物形成與原始海洋、生命四大特徵（生長、生殖、感應、代謝）。',
      keyPoints: [
        '原始大氣主要由水氣、氨、甲烷、氫氣組成，無游離氧氣（O2）。',
        '生命現象包含：代謝（呼吸、消化）、生長（細胞分裂與長大）、感應（向光性、膝反射）、生殖（繁衍後代）。',
        '會考常考陷阱：鐘乳石滴水長大「不屬於」生命現象，因為它沒有細胞構造與代謝過程。'
      ],
      searchKeywords: ['生命的起源', '生命現象', '國一生物 1-1', '康軒 1-1', '翰林 1-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-g7-bio-1-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '細胞的構造與功能',
      term: '上學期',
      description: '顯微鏡使用操作口訣、動植物細胞壁/膜/核/粒線體/葉綠體/液胞之構造異同。',
      keyPoints: [
        '虎克（Hooke）首先以顯微鏡觀察軟木薄片發現死細胞壁；許旺與許萊登提出「細胞學說」。',
        '細胞核：生命中樞，內含遺傳物質 DNA；細胞膜：控制物質進出的門戶（脂雙層）。',
        '粒線體：細胞的「能量發電廠」，負責呼吸作用產生 ATP。',
        '動植物細胞差異：植物細胞特有「細胞壁（維持形狀）」與「葉綠體（綠色組織光合作用）」；洋蔥表皮細胞無葉綠體。'
      ],
      searchKeywords: ['細胞構造', '動植物細胞比較', '粒線體', '國一生物 1-2', '康軒 1-2', '翰林 1-2'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-g7-bio-1-3',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-3',
      unitName: '物質進出細胞的方式',
      term: '上學期',
      description: '擴散作用、滲透作用、氣體與水分子及葡萄糖通過細胞膜的機制、高張液與低張液對紅血球與植物細胞的影響。',
      keyPoints: [
        '簡易擴散：氣體（O2, CO2）直接穿透磷脂質雙層（高濃度往低濃度，不耗能）。',
        '促進性擴散：葡萄糖、胺基酸需藉由「膜蛋白通道」協助。',
        '滲透作用：水分子專屬擴散。紅血球置於純水（低張液）會「吸水膨脹破裂」；植物細胞置於純水只會「膨脹挺直而不破」。'
      ],
      searchKeywords: ['物質進出細胞', '擴散作用', '滲透作用', '國一生物 1-3'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-g7-bio-3-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-1',
      unitName: '食物中的養分與酵素作用',
      term: '上學期',
      description: '三大產能養分（醣類4、蛋白質4、脂質9 kcal/g）；碘液/本氏液檢驗；酵素專一性與溫度/酸鹼度活性曲線。',
      keyPoints: [
        '醣類檢驗：澱粉加黃褐色「碘液」變「藍黑色」；葡萄糖加藍色「本氏液」隔水加熱依濃度變「綠→黃→橙→紅」。',
        '酵素（酶）成分為蛋白質，具有「專一性（一把鑰匙開一把鎖）」與「重複使用性」。'
      ],
      searchKeywords: ['酵素', '酵素活性', '本氏液', '碘液', '國一生物 3-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-g7-bio-3-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-2',
      unitName: '植物的養分製造：光合作用全解',
      term: '上學期',
      description: '葉綠體構造、光反應（水解水釋放O2、產生ATP/NADPH）與暗反應/碳反應（酵素催化利用CO2製造葡萄糖）、照光遮光實驗四大步驟。',
      keyPoints: [
        '光反應發生於類囊體（需光）：吸收光能將「水（H2O）」分解釋放出「氧氣（O2）」，產生 ATP。',
        '暗反應/碳反應發生於基質（不需光但需酵素與能量）：利用光反應能量將「二氧化碳（CO2）」固定合成葡萄糖與水。',
        '實驗四大步驟：沸水煮沸破壞細胞 → 隔水加熱酒精脫色 → 溫水漂洗軟化 → 滴加碘液檢驗澱粉。',
        '會考秒殺原則：光合作用釋放的氧氣來自「水」，絕對不是二氧化碳！'
      ],
      searchKeywords: ['光合作用', '光反應', '暗反應', '碳反應', '國一生物 3-2', '康軒 3-2', '翰林 3-2'],
      quizPaperId: 'paper-bio-photosynthesis'
    },
    {
      id: 'unit-g7-chi-1-1',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '經典抒情散文：朱自清《背影》與物象寄情',
      term: '上學期',
      description: '記敘抒情文「以小見大」經典示範，四次背影描摹與父子情感隔閡的化解。',
      keyPoints: [
        '主旨：描寫父親浦口送別時穿過鐵道買橘子的蹣跚背影，體現深沉含蓄的父愛。',
        '寫作特點：以橘子的「朱紅」與父親衣服的「黑、深青」色彩對照，視覺對比鮮明。'
      ],
      searchKeywords: ['背影', '朱自清', '國一國文 1-1'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-g7-chi-1-2',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '語文常識一：標點符號與字體演變',
      term: '上學期',
      description: '十四種標點符號規範用法、甲骨文→金文→小篆→隸書→楷書演進特徵與名碑。',
      keyPoints: [
        '標點符號：破折號（——佔兩格，表示語氣轉折或聲音延長）；夾注號（（ ）或 ── ── 補充說明）。',
        '漢字演進順序：甲骨文（商卜辭）→ 金文（周鐘鼎）→ 小篆（秦李斯統一天下文字）→ 隸書（漢代，古今文字分水嶺）→ 楷書（三國魏鍾繇，方正端莊標準字體）。'
      ],
      searchKeywords: ['標點符號', '字體演變', '六書', '國一國文 1-2'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-g7-math-1-1',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '負數與數線',
      term: '上學期',
      description: '正負數的相反意義、數線三要素（原點、正向、單位長）、相反數與絕對值幾何意義。',
      keyPoints: [
        '數線三要素：原點（0）、方向（通常向右為正）、單位長（刻度間距）。',
        '絕對值 |a| 的幾何意義：數線上代表點 a 與原點 0 的「距離」，恆大於等於 0。'
      ],
      searchKeywords: ['負數與數線', '絕對值', '國一數學 1-1'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-g7-math-1-2',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '整數的四則運算與指數律',
      term: '上學期',
      description: '同號數與異號數加減法規則、負負得正法則、指數律公式與科學記號表達式。',
      keyPoints: [
        '乘方陷阱：(-2)^4 = +16（負號在括號內，偶次方為正）；但 -2^4 = -16（先算 2^4 再加負號）。',
        '指數律：a^m · a^n = a^(m+n)；(a^m)^n = a^(m·n)；a^0 = 1 (a≠0)。'
      ],
      searchKeywords: ['整數四則運算', '指數律', '科學記號', '國一數學 1-2'],
      quizPaperId: 'paper-g7-math-ch1'
    },

    // ==========================================
    // 國二 (八年級)
    // ==========================================
    {
      id: 'unit-g8-phy-3-1',
      gradeId: 'g8',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-1',
      unitName: '波動與聲音的傳播',
      term: '上學期',
      description: '橫波與縱波、波速公式（v = f × λ）、回聲反射定律與超聲波之生活應用。',
      keyPoints: [
        '波只傳遞「能量」與「波形」，介質只在原處來回振動，不隨波前進。',
        '波速公式：v = f × λ = λ / T（波速 = 頻率 × 波長）。同一種介質在同一狀態下，波速固定！',
        '聲速：在 15°C 空氣中聲速約 340 m/s，溫度每升高 1°C 聲速增加 0.6 m/s（v = 331 + 0.6T）。',
        '回聲反射：原聲與回聲時間差需大於 0.1 秒，人耳方能分辨；聲納利用超聲波（頻率 > 20000 Hz）。'
      ],
      searchKeywords: ['波動', '波速公式', '回聲', '超聲波', '國二理化 3-1', '康軒理化 3-1', '翰林理化 3-1'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-g8-phy-4-2',
      gradeId: 'g8',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '4-2',
      unitName: '光的折射與透鏡成像規律',
      term: '上學期',
      description: '司乃耳折射定律定性分析、凸透鏡六種成像位置（物在兩倍焦距外/焦點上/焦點內）、眼鏡矯正原理。',
      keyPoints: [
        '光的折射：光從快介質（如空氣）斜射入慢介質（如水或玻璃）時，折射光線「偏向法線」（折射角 < 入射角）。',
        '凸透鏡成像心法：\n 1. 物在兩倍焦距外 (p > 2f)：倒立縮小實像（照相機原理）。\n 2. 物在兩倍焦距上 (p = 2f)：倒立等大實像。\n 3. 物在一到兩倍焦距間 (f < p < 2f)：倒立放大實像（投影機原理）。\n 4. 物在焦點內 (p < f)：正立放大虛像（放大鏡原理）。',
        '近視眼：眼球過長或水晶體折光力過強，影像成像於視網膜前，配戴「凹透鏡（發散光線）」矯正。',
        '遠視眼與老花眼：影像成像於視網膜後，配戴「凸透鏡（會聚光線）」矯正。'
      ],
      searchKeywords: ['凸透鏡成像', '光折射', '近視矯正', '凹透鏡', '國二理化 4-2', '康軒理化 4-2', '翰林理化 4-2'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-g8-phy-5-1',
      gradeId: 'g8',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '5-1',
      unitName: '溫度與熱量計算',
      term: '上學期',
      description: '溫標換算（攝氏、華氏、絕對溫標）、熱量計算公式（H = m × s × ΔT）、熱平衡與熱傳播途徑。',
      keyPoints: [
        '熱量公式：H = m · s · ΔT（熱量 = 質量 × 比熱 × 溫度變化量）。',
        '比熱大者：難熱難冷（如水 s = 1 cal/g·°C）；比熱小者：易熱易冷（如金屬）。',
        '熱平衡：不考慮熱散失時，高溫物體放出的熱量 = 低溫物體吸收的熱量。',
        '熱傳播三途徑：傳導（固體為主）、對流（液體與氣體為主）、輻射（不需要介質，如太陽輻射）。'
      ],
      searchKeywords: ['熱量計算', '比熱公式', '熱平衡', '熱傳播', '國二理化 5-1', '康軒理化 5-1'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-g8-math-1-1',
      gradeId: 'g8',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '乘法公式與多項式四則運算',
      term: '上學期',
      description: '和的平方、差的平方、平方差公式及多項式分離係數法乘除運算。',
      keyPoints: [
        '三大經典乘法公式：\n 1. 和的平方：(a + b)^2 = a^2 + 2ab + b^2\n 2. 差的平方：(a - b)^2 = a^2 - 2ab + b^2\n 3. 平方差公式：(a + b)(a - b) = a^2 - b^2。',
        '除法算式關係：被除式 = 除式 × 商式 + 餘式。餘式的次數必小於除式的次數。'
      ],
      searchKeywords: ['乘法公式', '多項式除法', '平方差', '國二數學 1-1', '康軒數學 1-1'],
      quizPaperId: 'paper-g8-math-pythagoras'
    },
    {
      id: 'unit-g8-math-2-2',
      gradeId: 'g8',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-2',
      unitName: '平方根與畢氏定理（勾股定理）',
      term: '上學期',
      description: '直角三角形兩股平方和等於斜邊平方（a^2 + b^2 = c^2）、常見整數組與直角坐標系距離公式。',
      keyPoints: [
        '畢氏定理：若直角三角形兩股長為 a、b，斜邊為 c，則 a^2 + b^2 = c^2。',
        '常見勾股整數比：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)、(8, 15, 17)、(1, 1, √2)、(1, √3, 2)。',
        '坐標平面兩點距離公式：P(x1, y1) 與 Q(x2, y2) 之距離 d = √[(x2 - x1)^2 + (y2 - y1)^2]。'
      ],
      searchKeywords: ['畢氏定理', '勾股定理', '平方根', '國二數學 2-2', '康軒數學 2-2'],
      quizPaperId: 'paper-g8-math-pythagoras'
    },
    {
      id: 'unit-g8-chi-1-1',
      gradeId: 'g8',
      subjectId: 'chinese',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '劉禹錫《陋室銘》與銘文託物言志',
      term: '上學期',
      description: '銘文體裁特色（押韻有戒勉意旨）、以景托情、反客為主的寫作層次與「斯是陋室，惟吾德馨」核心主旨。',
      keyPoints: [
        '體裁：銘文（古代刻於器物上用以自警或頌功德之押韻文體，本篇押灰韻：名、靈、馨、青、丁、經、亭）。',
        '主旨：借陋室以抒發作者安貧樂道、高潔傲岸之情懷。以「苔痕上階綠，草色入簾青」寫環境雅致；「談笑有鴻儒，往來無白丁」寫交往高雅。'
      ],
      searchKeywords: ['陋室銘', '劉禹錫', '銘文', '國二國文 1-1', '康軒國文 1-1'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },

    // ==========================================
    // 國三 (九年級 / 國中會考總複習)
    // ==========================================
    {
      id: 'unit-g9-phy-1-2',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '直線運動：速度、加速度與 v-t 圖判讀',
      term: '上學期',
      description: '位移 vs 路徑長、平均速度 vs 瞬時速度、加速度定義 a = (v - v0) / t、v-t 圖斜率與面積之幾何物理意涵。',
      keyPoints: [
        'v-t 圖核心判定二大心法：\n 1. 切線斜率代表「加速度 a」（斜向右上為正，斜向右下為負，水平線為等速度 a=0）。\n 2. 線下與時間軸圍成的面積代表「位移」（時間軸上方為正位移，下方為負位移）。',
        '等加速度運動三大公式：v = v0 + at；s = v0*t + 1/2 at^2；v^2 = v0^2 + 2as。',
        '自由落體：初速 v0 = 0，加速度 a = g = 9.8 m/s^2，下落距離與時間平方成正比。'
      ],
      searchKeywords: ['直線運動', '加速度', 'vt圖', '等加速度公式', '國三理化 1-2', '會考自然 1-2'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-g9-phy-2-1',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-1',
      unitName: '牛頓三大運動定律實戰全真解法',
      term: '上學期',
      description: '第一定律（慣性定律）、第二定律（F_net = m × a）、第三定律（作用力與反作用力非抵消性）與斜面受力圖分析。',
      keyPoints: [
        '第一定律（慣性）：合力為零時，靜者恆靜，動者恆作等速度直線運動。安全帶、抖落傘上雨滴皆為慣性應用。',
        '第二定律（加速度）：F = m · a。合力方向恆與加速度方向相同，合外力加倍則加速度加倍。',
        '第三定律（作用與反作用）：大小相等、方向相反、在同一直線上，但「作用於不同物體」，故絕對不可抵消！馬拉車前進因地面摩擦力推動馬。'
      ],
      searchKeywords: ['牛頓運動定律', '慣性定律', 'F=ma', '作用力反作用力', '國三理化 2-1', '會考必考力學'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-g9-phy-4-1',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '4-1',
      unitName: '電路學：歐姆定律、電阻與電功率',
      term: '上學期',
      description: '串聯與並聯電路電流電壓分配、歐姆定律（V = I × R）、電功率計算公式（P = I × V = I^2 × R = V^2 / R）。',
      keyPoints: [
        '串聯電路：電流處處相等（I_tot = I1 = I2），總電壓為各電阻分壓和（V_tot = V1 + V2），總電阻 R_tot = R1 + R2。',
        '並聯電路：各支路電壓相等（V_tot = V1 = V2），總電流為各支路電流和（I_tot = I1 + I2），家用電器皆採並聯以確保各元件獨立運作。',
        '電功率公式：P = I · V = I^2 · R = V^2 / R（單位為瓦特 W）。燈泡亮度取決於「實際消耗的電功率 P」，而非單純看電阻！'
      ],
      searchKeywords: ['歐姆定律', '電功率', '串聯並聯', '國三理化 4-1', '會考電學'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-g9-earth-5-1',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '5-1',
      unitName: '地球科學：板塊構造學說與地震台灣地質',
      term: '下學期',
      description: '大陸漂移說到板塊構造、張裂型/聚合型/錯動型板塊邊界、震度（0~7級）vs 規模（芮氏無單位）、台灣位於歐亞與菲律賓海板塊交界。',
      keyPoints: [
        '板塊邊界類型：\n 1. 聚合型：板塊擠壓碰撞，形成褶皺山脈（如喜馬拉雅山、中央山脈）、海溝與逆斷層。\n 2. 張裂型：地函熱對流上升，形成中洋脊與裂谷（如冰島、東非大裂谷）、正斷層。\n 3. 錯動型：水平摩擦滑動（如聖安德烈斯斷層）、轉形斷層。',
        '地震名詞秒辨：地震「規模（Magnitude）」代表釋放能量總量，一次地震只有一個數值且無單位；地震「震度（Intensity）」代表各地地面搖晃破壞程度，離震央愈近通常愈大。'
      ],
      searchKeywords: ['板塊構造', '地球科學', '地震震度規模', '國三地科 5-1', '會考地科'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-g9-math-1-2',
      gradeId: 'g9',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '相似三角形與比例線段',
      term: '上學期',
      description: '平行線截比例線段性質、相似三角形判定定理（AA, SAS, SSS）、母子相似定理與面積比等於對應邊平方比。',
      keyPoints: [
        '平行線截線定理：直線平行於三角形一邊，必截另兩邊成比例線段。',
        '相似形核心性質：對應角相等，對應邊成比例。若兩相似圖形之對應邊長比為 a : b，則其「周長比為 a : b」，而「面積比為 a^2 : b^2」。'
      ],
      searchKeywords: ['相似三角形', '比例線段', '母子相似', '國三數學 1-2', '會考數學幾何'],
      quizPaperId: 'paper-g9-cap-math'
    },
    {
      id: 'unit-g9-math-2-1',
      gradeId: 'g9',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-1',
      unitName: '圓的幾何性質：圓心角、圓周角與切線定理',
      term: '上學期',
      description: '圓心角等於所對弧度數、圓周角等於所對弧度數之一半、直徑所對圓周角為 90 度、圓外一點到圓之兩切線段等長。',
      keyPoints: [
        '圓心角與圓周角關係：同弧所對的圓周角度數 = 圓心角度數之一半 = 所對弧度數之一半。',
        '直徑定理：若線段 AB 為圓 O 之直徑，則半圓上任意圓周角 ∠APB 必等於 90°。',
        '切線性質：圓心到切點的半徑必垂直於切線（OP ⊥ L）。'
      ],
      searchKeywords: ['圓周角', '圓心角', '切線定理', '國三數學 2-1', '會考圓形幾何'],
      quizPaperId: 'paper-g9-cap-math'
    },

    // ==========================================
    // 高中 (學測 / 分科測驗)
    // ==========================================
    {
      id: 'unit-sr-bio-genetics',
      gradeId: 'senior',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '高一/高二',
      unitName: '分子生物學中心法則：DNA複製、轉錄與轉譯',
      term: '學測必考',
      description: 'DNA 雙螺旋半保留複製、RNA 聚合酶轉錄 mRNA、核糖體轉譯三聯體密碼子合成多肽鏈。',
      keyPoints: [
        '中心法則（Central Dogma）：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質（Polypeptide）。',
        '鹼基互補配對原則：DNA 雙股中 A 與 T（雙氫鍵）、C 與 G（三氫鍵）；轉錄至 mRNA 時 A 配對為 U（尿嘧啶）。',
        '密碼子（Codon）：mRNA 上每三個相鄰核苷酸決定一個胺基酸；起始密碼子為 AUG（對應甲硫胺酸），終止密碼子為 UAA、UAG、UGA。'
      ],
      searchKeywords: ['分子生物學', '中心法則', '轉錄轉譯', 'DNA複製', '高中生物學測'],
      quizPaperId: 'paper-senior-physics-bio'
    },
    {
      id: 'unit-sr-phy-gravity',
      gradeId: 'senior',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '高一/高二',
      unitName: '重力與克卜勒行星運動三大定律',
      term: '學測必考',
      description: '牛頓萬有引力定律（F = G·M·m/r^2）、克卜勒第一（軌道）、第二（等面積）、第三（週期）定律。',
      keyPoints: [
        '克卜勒第一定律（軌道定律）：所有行星繞太陽運行的軌道皆為橢圓，太陽位於橢圓兩焦點之一。',
        '克卜勒第二定律（等面積速率定律）：太陽與行星的連線在相同時間內掃過相同的面積。因此「近日點速率最快，遠日點速率最慢」。',
        '克卜勒第三定律（週期定律）：繞同一中心天體運行的行星，其軌道半長軸立方與公轉週期平方之比值為常數：T^2 / R^3 = 常數。'
      ],
      searchKeywords: ['克卜勒定律', '萬有引力', '高中物理學測', '向心力'],
      quizPaperId: 'paper-senior-physics-bio'
    },
    {
      id: 'unit-sr-math-poly',
      gradeId: 'senior',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '高一/高二',
      unitName: '多項式定理、指對數函數運算與向量素養',
      term: '學測必考',
      description: '餘式定理、因式定理、對數律運算（log a + log b = log ab）、平面向量內積與夾角幾何意義。',
      keyPoints: [
        '餘式定理：多項式 f(x) 除以 (x - c) 的餘式等於 f(c)。',
        '因式定理：若 f(c) = 0，則 (x - c) 為 f(x) 的因式。',
        '對數律心法：log_a (x·y) = log_a x + log_a y；log_a (x^k) = k · log_a x；換底公式 log_a b = (log_c b) / (log_c a)。',
        '向量內積：a · b = |a||b|cosθ = x1x2 + y1y2。若兩非零向量垂直，則其內積恆為 0。'
      ],
      searchKeywords: ['餘式定理', '對數律', '向量內積', '高中數學學測'],
      quizPaperId: 'paper-senior-math-poly'
    }
  ]
};
