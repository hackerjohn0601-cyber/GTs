// Curriculum Editions & Grade Units Database for Taiwan Curriculum (翰林、康軒、南一 三大版本獨立真實課綱與對照系統)
window.CURRICULUM_DATA = {
  editions: [
    { id: 'kangxuan', name: '康軒版 (Kangxuan)', icon: '🟢', color: '#10b981', desc: '章節編排循序漸進，著重基礎觀念引導與生活化情境結合' },
    { id: 'hanlin', name: '翰林版 (Hanlin)', icon: '🔵', color: '#3b82f6', desc: '版面圖解精美，獨立生物圈與吃冰滋味等特色篇目，思維題型豐富' },
    { id: 'nani', name: '南一版 (Nani)', icon: '🟠', color: '#f97316', desc: '重視素養探究與實作，獨創第一課螢火蟲與兒時記趣前置編排' }
  ],
  grades: [
    { id: 'g7', name: '國一 (七年級)', level: '國中', icon: '🌱', badge: '七上・七下', desc: '基礎扎根・國中起點' },
    { id: 'g8', name: '國二 (八年級)', level: '國中', icon: '🌿', badge: '八上・八下', desc: '幾何理化・關鍵深化' },
    { id: 'g9', name: '國三 (九年級會考)', level: '國中', icon: '🎯', badge: '會考全冊總複習', desc: '教育會考・大考衝刺' },
    { id: 'g10', name: '高一 (十年級)', level: '高中', icon: '📘', badge: '必修核心基礎', desc: '核心素養・高中起手式' },
    { id: 'g11', name: '高二 (十一年級)', level: '高中', icon: '🔬', badge: '文理分流深化', desc: '分流探索・學門進階' },
    { id: 'g12', name: '高三 (學測/分科)', level: '高中', icon: '🎓', badge: '大學大考特訓', desc: '學測/分科・最終衝刺' },
    { id: 'senior', name: '高中 (全學程總覽)', level: '高中', icon: '🏛️', badge: '學測跨章全科', desc: '高中學測精選' }
  ],
  subjects: [
    { id: 'bio_science', name: '自然與生物/理化', icon: '🔬' },
    { id: 'chinese', name: '國語文', icon: '✍️' },
    { id: 'english', name: '英語文', icon: '🌍' },
    { id: 'math', name: '數學', icon: '🔢' }
  ],

  // =========================================================================
  // 🔄 康軒 ✕ 翰林 ✕ 南一 跨版本深度對照矩陣 (Comparison Matrix)
  // =========================================================================
  comparisonMatrix: {
    'g7-bio': {
      title: '國一生物（七上自然）三大版本章節全面對照',
      gradeLabel: '國一 (七年級)',
      subjectLabel: '自然與生物 🔬',
      summaryNote: '⚠️ <strong>版本最大差異</strong>：翰林版獨創將「1-2 生物圈的範圍」獨立成節；光合作用在康軒與南一為 3-2，在翰林版則為 3-3（3-2 為人體養分與能量）！',
      items: [
        {
          topic: '生命的起源與生命現象',
          kx: { code: '1-1', name: '生命的起源與生命現象', unitId: 'unit-kx-g7-bio-1-1' },
          hl: { code: '1-1', name: '生命的起源', unitId: 'unit-hl-g7-bio-1-1' },
          ni: { code: '1-1', name: '探索生命（生命現象與起源）', unitId: 'unit-ni-g7-bio-1-1' },
          tip: '康軒將起源與四大現象合併；翰林獨立起源；南一統稱為探索生命。'
        },
        {
          topic: '生物圈範圍與極端環境生物',
          kx: { code: '補充/1-1', name: '融入生命起源小節中探討', unitId: 'unit-kx-g7-bio-1-1' },
          hl: { code: '1-2 ⭐', name: '生物圈的範圍（翰林獨立章節）', unitId: 'unit-hl-g7-bio-1-2' },
          ni: { code: '1-1結尾', name: '融入探索生命末段', unitId: 'unit-ni-g7-bio-1-1' },
          tip: '⭐ 翰林版獨家特色：生物圈海平面上下各 10,000 公尺（約 20 公里），段考必考深海熱泉管蟲！'
        },
        {
          topic: '細胞的構造與動植物細胞比較',
          kx: { code: '1-2', name: '細胞的構造與功能', unitId: 'unit-kx-g7-bio-1-2' },
          hl: { code: '1-3', name: '活生生的細胞（細胞構造與功能）', unitId: 'unit-hl-g7-bio-1-3' },
          ni: { code: '1-2', name: '細胞的構造與觀察', unitId: 'unit-ni-g7-bio-1-2' },
          tip: '因翰林多了 1-2 生物圈，故細胞構造在翰林為 1-3，康軒與南一為 1-2。'
        },
        {
          topic: '物質通過細胞膜之機制',
          kx: { code: '1-3', name: '物質進出細胞的方式', unitId: 'unit-kx-g7-bio-1-3' },
          hl: { code: '1-4', name: '物質通過細胞膜的方法', unitId: 'unit-hl-g7-bio-1-4' },
          ni: { code: '1-3', name: '物質進出細胞', unitId: 'unit-ni-g7-bio-1-3' },
          tip: '擴散作用與滲透作用、紅血球與植物細胞在純水/濃鹽水中的形變比較。'
        },
        {
          topic: '酵素作用與受質專一性',
          kx: { code: '3-1', name: '食物中的養分與酵素作用', unitId: 'unit-kx-g7-bio-3-1' },
          hl: { code: '3-1', name: '酵素的作用（3-2 養分與能量）', unitId: 'unit-hl-g7-bio-3-1' },
          ni: { code: '3-1', name: '養分與酵素的催化作用', unitId: 'unit-ni-g7-bio-3-1' },
          tip: '三大產能養分熱量計算、碘液（澱粉）與本氏液（葡萄糖隔水加熱）檢驗。'
        },
        {
          topic: '植物養分製造：光合作用全解',
          kx: { code: '3-2', name: '植物如何製造養分（光合作用）', unitId: 'unit-kx-g7-bio-3-2' },
          hl: { code: '3-3 ⭐', name: '植物的光合作用與能量轉換', unitId: 'unit-hl-g7-bio-3-3' },
          ni: { code: '3-2', name: '植物的光合作用（製造養分）', unitId: 'unit-ni-g7-bio-3-2' },
          tip: '⭐ 段考必考：光反應水解釋放氧氣，碳反應消耗能量固定 CO2 合成葡萄糖。翰林編號為 3-3！'
        }
      ]
    },

    'g7-chinese': {
      title: '國一國文（七上國語文）三大版本課次全面對照',
      gradeLabel: '國一 (七年級)',
      subjectLabel: '國語文 ✍️',
      summaryNote: '⚠️ <strong>版本最大差異</strong>：國文選文課次完全不同！康軒第 1 課為《雅量》、翰林第 1 課為《夏夜》、南一第 1 課為《做一隻光彩的螢火蟲》；朱自清《背影》康軒為第 6 課，翰林與南一為第 5 課！',
      items: [
        {
          topic: '第一課選文（各版本大分流）',
          kx: { code: '第1課', name: '宋天儀《雅量》', unitId: 'unit-kx-g7-chi-1-1' },
          hl: { code: '第1課', name: '楊喚《夏夜》', unitId: 'unit-hl-g7-chi-1-1' },
          ni: { code: '第1課', name: '嚴長壽《做一隻光彩的螢火蟲》', unitId: 'unit-ni-g7-chi-1-1' },
          tip: '康軒以人際包容開場；翰林以童詩啟發情思；南一以自我肯定勵志散文破題。'
        },
        {
          topic: '童詩文學選讀（楊喚《夏夜》）',
          kx: { code: '第2課', name: '楊喚《夏夜》', unitId: 'unit-kx-g7-chi-1-2' },
          hl: { code: '第1課', name: '楊喚《夏夜》', unitId: 'unit-hl-g7-chi-1-1' },
          ni: { code: '第2課', name: '楊喚《夏夜》', unitId: 'unit-ni-g7-chi-1-2' },
          tip: '現代詩經典：珍珠與銀幣意象、擬人化自然生態、溫柔催眠氛圍。'
        },
        {
          topic: '語文常識一（標點符號規範）',
          kx: { code: '常識一', name: '標點符號使用法', unitId: 'unit-kx-g7-chi-1-3' },
          hl: { code: '常識一', name: '標點符號與行款規範', unitId: 'unit-hl-g7-chi-1-4' },
          ni: { code: '常識一', name: '標點符號與工具書查閱', unitId: 'unit-ni-g7-chi-1-5' },
          tip: '破折號佔二格表示轉折或延音；夾注號補充說明；翰林側重直橫行款，南一加強辭典檢字。'
        },
        {
          topic: '經典抒情文：朱自清《背影》',
          kx: { code: '第6課', name: '朱自清《背影》', unitId: 'unit-kx-g7-chi-1-6' },
          hl: { code: '第5課', name: '朱自清《背影》', unitId: 'unit-hl-g7-chi-1-5' },
          ni: { code: '第5課', name: '朱自清《背影》', unitId: 'unit-ni-g7-chi-1-6' },
          tip: '段考大魔王：以小見大抒情筆法、四次背影描摹、橘子朱紅對比青黑馬褂。'
        },
        {
          topic: '語文常識二（文字演進與六書）',
          kx: { code: '常識二', name: '漢字形體演變與六書', unitId: 'unit-kx-g7-chi-1-7' },
          hl: { code: '常識二', name: '漢字結構與六書演進', unitId: 'unit-hl-g7-chi-1-6' },
          ni: { code: '常識二', name: '漢字造字原則與字體演進', unitId: 'unit-ni-g7-chi-1-7' },
          tip: '甲骨文→金文→小篆→隸書（古今分水嶺）→楷書；象形指事為獨體文，會意形聲為合體字。'
        }
      ]
    },

    'g7-math': {
      title: '國一數學（七上數學）三大版本單元全面對照',
      gradeLabel: '國一 (七年級)',
      subjectLabel: '數學 🔢',
      summaryNote: '⚠️ <strong>版本差異重點</strong>：翰林版將指數律與科學記號拆為兩獨立小節（1-3 與 1-4）；南一版將正負數與數線拆為 1-1 與 1-2；康軒版四則運算劃分加減與乘除！',
      items: [
        {
          topic: '負數觀念、數線與絕對值',
          kx: { code: '1-1', name: '負數與數線', unitId: 'unit-kx-g7-math-1-1' },
          hl: { code: '1-1', name: '負數與數線', unitId: 'unit-hl-g7-math-1-1' },
          ni: { code: '1-1 ~ 1-2', name: '正數與負數 / 數線與絕對值', unitId: 'unit-ni-g7-math-1-1' },
          tip: '數線三要素：原點、正向、單位長；絕對值 |a| 代表點與原點之幾何距離。'
        },
        {
          topic: '整數四則運算規則',
          kx: { code: '1-2', name: '整數的四則運算與指數律', unitId: 'unit-kx-g7-math-1-2' },
          hl: { code: '1-2', name: '整數的四則運算', unitId: 'unit-hl-g7-math-1-2' },
          ni: { code: '1-3', name: '整數的四則運算', unitId: 'unit-ni-g7-math-1-3' },
          tip: '負負得正；同號數相加符號不變，異號數相減取絕對值大者之正負號。'
        },
        {
          topic: '指數律公式與科學記號',
          kx: { code: '1-2 (附)', name: '整數指數律與科學記號運算', unitId: 'unit-kx-g7-math-1-2' },
          hl: { code: '1-3 ~ 1-4', name: '指數律 / 科學記號（獨立雙小節）', unitId: 'unit-hl-g7-math-1-3' },
          ni: { code: '1-4', name: '指數律與科學記號', unitId: 'unit-ni-g7-math-1-4' },
          tip: '陷阱：(-2)^4 = +16 但 -2^4 = -16；同底相乘指數相加。'
        }
      ]
    },

    'g8-phy': {
      title: '國二理化（八上自然）三大版本章節全面對照',
      gradeLabel: '國二 (八年級)',
      subjectLabel: '自然與理化 🔬',
      summaryNote: '⚠️ <strong>版本差異重點</strong>：波動與聲音、光學折射成像、溫度與熱量在八上段考比重最高；各家版本在實驗器材與小節劃分略有不同！',
      items: [
        {
          topic: '波的傳播、波速與回聲聲音',
          kx: { code: '3-1', name: '波動與聲音的傳播', unitId: 'unit-kx-g8-phy-3-1' },
          hl: { code: '3-1', name: '波的傳播與頻率', unitId: 'unit-hl-g8-phy-3-1' },
          ni: { code: '3-1', name: '波動現象與波速公式', unitId: 'unit-ni-g8-phy-3-1' },
          tip: '波只傳遞能量不傳遞介質；波速公式 v = f·λ；回聲反射定律與超聲波應用。'
        },
        {
          topic: '光的折射、透鏡成像規律與眼鏡矯正',
          kx: { code: '4-2', name: '光的折射與透鏡成像規律', unitId: 'unit-kx-g8-phy-4-2' },
          hl: { code: '4-2', name: '光的折射與透鏡成像規律', unitId: 'unit-hl-g8-phy-4-2' },
          ni: { code: '4-2', name: '光的折射與凸透鏡成像', unitId: 'unit-ni-g8-phy-4-2' },
          tip: '進入慢介質偏向法線；凸透鏡四大成像實像虛像；近視戴凹透鏡發散，遠視戴凸透鏡會聚。'
        },
        {
          topic: '溫度、熱量計算公式與熱傳播',
          kx: { code: '5-1', name: '溫度與熱量計算', unitId: 'unit-kx-g8-phy-5-1' },
          hl: { code: '5-1', name: '溫度與熱量計算', unitId: 'unit-hl-g8-phy-5-1' },
          ni: { code: '5-1', name: '熱量與比熱', unitId: 'unit-ni-g8-phy-5-1' },
          tip: 'H = m·s·ΔT；比熱大難冷難熱；熱平衡狀態高溫放熱等於低溫吸熱。'
        }
      ]
    },

    'g8-math': {
      title: '國二數學（八上數學）三大版本單元全面對照',
      gradeLabel: '國二 (八年級)',
      subjectLabel: '數學 🔢',
      summaryNote: '⚠️ <strong>版本差異重點</strong>：乘法公式與多項式四則、平方根與畢氏定理（勾股定理）為八年級基石，各版本章節順序一致但練習例題梯度有所差異！',
      items: [
        {
          topic: '乘法公式與多項式四則運算',
          kx: { code: '1-1', name: '乘法公式與多項式四則運算', unitId: 'unit-kx-g8-math-1-1' },
          hl: { code: '1-1', name: '乘法公式與多項式', unitId: 'unit-hl-g8-math-1-1' },
          ni: { code: '1-1', name: '乘法公式與多項式運算', unitId: 'unit-ni-g8-math-1-1' },
          tip: '平方差公式 (a+b)(a-b) = a²-b²；和的平方公式；除法關係式被除式 = 除式×商式 + 餘式。'
        },
        {
          topic: '平方根運算與畢氏定理',
          kx: { code: '2-2', name: '平方根與畢氏定理', unitId: 'unit-kx-g8-math-2-2' },
          hl: { code: '2-2', name: '畢氏定理（勾股定理與應用）', unitId: 'unit-hl-g8-math-2-2' },
          ni: { code: '2-2', name: '根式運算與畢氏定理', unitId: 'unit-ni-g8-math-2-2' },
          tip: '直角三角形 a² + b² = c²；常見勾股數組 (3,4,5), (5,12,13), (7,24,25)。'
        }
      ]
    },

    'g9-cap': {
      title: '國三九年級（國中教育會考總複習）三大版本對照',
      gradeLabel: '國三 (九年級會考)',
      subjectLabel: '會考全科 🎯',
      summaryNote: '⚠️ <strong>版本總複習方針</strong>：九年級進入會考總複習階段，三大版本全面對齊教育部會考評量綱要（CAP），章節重點統一聚焦於跨單元素養題型！',
      items: [
        {
          topic: '直線運動：速度與 v-t 圖判讀',
          kx: { code: '1-2', name: '直線運動：速度、加速度與 v-t 圖判讀', unitId: 'unit-kx-g9-phy-1-2' },
          hl: { code: '1-2', name: '速度與加速度（v-t 圖斜率面積）', unitId: 'unit-hl-g9-phy-1-2' },
          ni: { code: '1-2', name: '直線運動與加速度', unitId: 'unit-ni-g9-phy-1-2' },
          tip: 'v-t 圖斜率為加速度，圖形面積為位移量。會考理化年年必出！'
        },
        {
          topic: '牛頓三大運動定律與受力圖分析',
          kx: { code: '2-1', name: '牛頓三大運動定律實戰全真解法', unitId: 'unit-kx-g9-phy-2-1' },
          hl: { code: '2-1', name: '牛頓三大運動定律精講', unitId: 'unit-hl-g9-phy-2-1' },
          ni: { code: '2-1', name: '牛頓三大運動定律', unitId: 'unit-ni-g9-phy-2-1' },
          tip: '第一慣性定律、第二 F=ma、第三作用力與反作用力（受力物體不同不可互相抵消）。'
        },
        {
          topic: '電路學：歐姆定律與電功率',
          kx: { code: '4-1', name: '電路學：歐姆定律、電阻與電功率', unitId: 'unit-kx-g9-phy-4-1' },
          hl: { code: '4-1', name: '電路學與歐姆定律', unitId: 'unit-hl-g9-phy-4-1' },
          ni: { code: '4-1', name: '歐姆定律與電功率', unitId: 'unit-ni-g9-phy-4-1' },
          tip: '串聯電流處處相等，並聯各支路電壓相等；P = I·V = I²·R = V² / R。'
        },
        {
          topic: '地球科學：板塊構造學說與地震',
          kx: { code: '5-1', name: '板塊構造學說與地震台灣地質', unitId: 'unit-kx-g9-earth-5-1' },
          hl: { code: '5-1', name: '板塊運動與台灣地質', unitId: 'unit-hl-g9-earth-5-1' },
          ni: { code: '5-1', name: '板塊構造與地震災害', unitId: 'unit-ni-g9-earth-5-1' },
          tip: '聚合型、張裂型、錯動型板塊邊界特徵；地震規模無單位 vs 各地震度分級。'
        },
        {
          topic: '相似三角形與比例線段',
          kx: { code: '1-2', name: '相似三角形與比例線段', unitId: 'unit-kx-g9-math-1-2' },
          hl: { code: '1-2', name: '相似形與比例線段', unitId: 'unit-hl-g9-math-1-2' },
          ni: { code: '1-2', name: '相似三角形', unitId: 'unit-ni-g9-math-1-2' },
          tip: '平行線截等比例線段；相似形面積比等於對應邊長平方比。'
        },
        {
          topic: '圓的幾何性質：圓心角與圓周角',
          kx: { code: '2-1', name: '圓心角、圓周角與切線定理', unitId: 'unit-kx-g9-math-2-1' },
          hl: { code: '2-1', name: '圓的幾何性質與切線', unitId: 'unit-hl-g9-math-2-1' },
          ni: { code: '2-1', name: '圓與直線的關係', unitId: 'unit-ni-g9-math-2-1' },
          tip: '圓周角度數為所對弧度數之一半；直徑所對圓周角為 90 度；圓心切點半徑垂直於切線。'
        }
      ]
    }
  },

  // =========================================================================
  // 📚 各版本真實獨立單元列表 (Units Aligned to Specific Editions)
  // =========================================================================
  units: [
    // -----------------------------------------------------------------------
    // 🟢 康軒版 (Kangxuan)
    // -----------------------------------------------------------------------
    {
      id: 'unit-kx-g7-bio-1-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan'],
      unitCode: '1-1',
      unitName: '生命的起源與生命現象',
      term: '上學期',
      editionNotes: '💡 康軒版特色：將生命起源與四大現象（生長、生殖、感應、代謝）融合成完整一節，重視原始大氣組成與生命定義之論證。',
      description: '原始大氣組成（水氣、氨、甲烷）、有機物形成與原始海洋、生命四大特徵（生長、生殖、感應、代謝）。',
      keyPoints: [
        '原始大氣主要由水氣、氨、甲烷、氫氣組成，無游離氧氣（O2）。',
        '生命現象包含：代謝（呼吸、消化）、生長（細胞分裂與長大）、感應（向光性、膝反射）、生殖（繁衍後代）。',
        '會考常考陷阱：鐘乳石滴水長大「不屬於」生命現象，因為它沒有細胞構造與代謝過程。'
      ],
      searchKeywords: ['生命的起源', '生命現象', '國一生物 1-1', '康軒 1-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-kx-g7-bio-1-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan'],
      unitCode: '1-2',
      unitName: '細胞的構造與功能',
      term: '上學期',
      editionNotes: '💡 康軒版特色：緊接著生命現象進入細胞學說與動植物構造，實驗強調洋蔥表皮細胞與水蘊草觀察比較。',
      description: '顯微鏡使用操作口訣、動植物細胞壁/膜/核/粒線體/葉綠體/液胞之構造異同。',
      keyPoints: [
        '虎克（Hooke）首先以顯微鏡觀察軟木薄片發現死細胞壁；許旺與許萊登提出「細胞學說」。',
        '細胞核：生命中樞，內含遺傳物質 DNA；細胞膜：控制物質進出的門戶（脂雙層）。',
        '粒線體：細胞的「能量發電廠」，負責呼吸作用產生 ATP。',
        '動植物細胞差異：植物細胞特有「細胞壁（維持形狀）」與「葉綠體（綠色組織光合作用）」；洋蔥表皮細胞無葉綠體。'
      ],
      searchKeywords: ['細胞構造', '動植物細胞比較', '粒線體', '國一生物 1-2', '康軒 1-2'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-kx-g7-bio-1-3',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan'],
      unitCode: '1-3',
      unitName: '物質進出細胞的方式',
      term: '上學期',
      editionNotes: '💡 康軒版特色：本節著重紅血球與植物細胞在不同滲透壓溶液（純水 vs 濃鹽水）中的形態變化圖解。',
      description: '擴散作用、滲透作用、氣體與水分子及葡萄糖通過細胞膜的機制、高張液與低張液對紅血球與植物細胞的影響。',
      keyPoints: [
        '簡易擴散：氣體（O2, CO2）直接穿透磷脂質雙層（高濃度往低濃度，不耗能）。',
        '促進性擴散：葡萄糖、胺基酸需藉由「膜蛋白通道」協助。',
        '滲透作用：水分子專屬擴散。紅血球置於純水（低張液）會「吸水膨脹破裂」；植物細胞置於純水只會「膨脹挺直而不破」。'
      ],
      searchKeywords: ['物質進出細胞', '擴散作用', '滲透作用', '國一生物 1-3', '康軒 1-3'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-kx-g7-bio-3-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan'],
      unitCode: '3-1',
      unitName: '食物中的養分與酵素作用',
      term: '上學期',
      editionNotes: '💡 康軒版特色：養分與酵素整合於同一小節，清楚比較碘液檢驗澱粉與本氏液隔水加熱變色。',
      description: '三大產能養分（醣類4、蛋白質4、脂質9 kcal/g）；碘液/本氏液檢驗；酵素專一性與溫度/酸鹼度活性曲線。',
      keyPoints: [
        '醣類檢驗：澱粉加黃褐色「碘液」變「藍黑色」；葡萄糖加藍色「本氏液」隔水加熱依濃度變「綠→黃→橙→紅」。',
        '酵素（酶）成分為蛋白質，具有「專一性（一把鑰匙開一把鎖）」與「重複使用性」。'
      ],
      searchKeywords: ['酵素', '酵素活性', '本氏液', '碘液', '國一生物 3-1', '康軒 3-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-kx-g7-bio-3-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['kangxuan'],
      unitCode: '3-2',
      unitName: '植物如何製造養分（光合作用）',
      term: '上學期',
      editionNotes: '💡 康軒版經典考點：光合作用位於 3-2 小節，考題高度集中於光反應水解水釋出氧氣、碳反應合成葡萄糖，以及照光實驗四大步驟！',
      description: '葉綠體構造、光反應（水解水釋放O2、產生ATP/NADPH）與暗反應/碳反應（酵素催化利用CO2製造葡萄糖）、照光遮光實驗四大步驟。',
      keyPoints: [
        '光反應發生於類囊體（需光）：吸收光能將「水（H2O）」分解釋放出「氧氣（O2）」，產生 ATP。',
        '暗反應/碳反應發生於基質（不需光但需酵素與能量）：利用光反應能量將「二氧化碳（CO2）」固定合成葡萄糖與水。',
        '實驗四大步驟：沸水煮沸破壞細胞 → 隔水加熱酒精脫色 → 溫水漂洗軟化 → 滴加碘液檢驗澱粉。',
        '會考秒殺原則：光合作用釋放的氧氣來自「水」，絕對不是二氧化碳！'
      ],
      searchKeywords: ['光合作用', '光反應', '暗反應', '碳反應', '國一生物 3-2', '康軒 3-2'],
      quizPaperId: 'paper-bio-photosynthesis'
    },
    {
      id: 'unit-kx-g7-chi-1-1',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan'],
      unitCode: '第1課',
      unitName: '宋天儀《雅量》',
      term: '上學期',
      editionNotes: '💡 康軒版獨家編排：以宋天儀《雅量》作為國中第一課，引導國一新鮮人體會人際尊重與多元審美，生活化比喻深受喜愛。',
      description: '記敘兼議論散文，以買衣料像棋盤、像綠豆糕生活瑣事為喻，闡述「尊重他人不同觀點」的雅量胸襟。',
      keyPoints: [
        '主旨：每個人欣賞角度不同，應培養包容他人差異的「雅量」，避免人云亦云。',
        '經典金句：「如果他能從這當中體會出防禦的道理，並兼收並蓄，那麼他就比別人多了一分雅量。」'
      ],
      searchKeywords: ['雅量', '宋天儀', '國一國文第1課', '康軒第1課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-kx-g7-chi-1-2',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan'],
      unitCode: '第2課',
      unitName: '楊喚《夏夜》',
      term: '上學期',
      editionNotes: '💡 康軒版課次：楊喚《夏夜》編排在第 2 課，以富麗珍珠與銀幣喻夏夜星空月色，開啟現代童詩欣賞。',
      description: '現代詩經典名作，細膩摹寫鄉村夏夜由喧鬧歸於寧靜的祥和生機，擬人手法生動。',
      keyPoints: [
        '擬人化手法：「火紅的太陽也滾下山頭了」、「羊隊和牛群告別了田野回家了」。',
        '視覺意象：「撒了滿天的珍珠和一枚又大又亮的銀幣」，以珍珠喻群星，以銀幣喻明月。'
      ],
      searchKeywords: ['夏夜', '楊喚', '國一國文第2課', '康軒第2課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-kx-g7-chi-1-3',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan'],
      unitCode: '語文常識一',
      unitName: '標點符號使用法',
      term: '上學期',
      editionNotes: '💡 康軒版特色：標點符號列為語文常識一，強調破折號與夾注號的規範用法。',
      description: '教育部十四種常用標點符號用法規範、直式橫式書寫差異。',
      keyPoints: [
        '破折號（——）：佔兩格，表示語氣轉折、聲音延長或話題突然中斷。',
        '夾注號（（ ）或 ── ──）：補充說明文中個別名詞或特定背景。'
      ],
      searchKeywords: ['標點符號', '語文常識一', '康軒國文'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-kx-g7-chi-1-6',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan'],
      unitCode: '第6課',
      unitName: '朱自清《背影》',
      term: '上學期',
      editionNotes: '💡 康軒版課次注意：朱自清《背影》在康軒版為第 6 課（通常為第二次段考範圍），著重父親翻越鐵道買橘子之動作摹寫！',
      description: '記敘抒情文「以小見大」經典示範，四次背影描摹與父子情感隔閡的化解。',
      keyPoints: [
        '主旨：描寫父親浦口送別時穿過鐵道買橘子的蹣跚背影，體現深沉含蓄的父愛。',
        '寫作特點：以橘子的「朱紅」與父親衣服的「黑、深青」色彩對照，視覺對比鮮明。'
      ],
      searchKeywords: ['背影', '朱自清', '國一國文第6課', '康軒背影'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-kx-g7-chi-1-7',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['kangxuan'],
      unitCode: '語文常識二',
      unitName: '漢字形體演變與六書',
      term: '上學期',
      editionNotes: '💡 康軒版特色：六書與古今字體演進（甲骨文→楷書）為段考與會考必考大重點。',
      description: '甲骨文、金文、小篆、隸書、楷書演變歷程，象形、指事、會意、形聲、轉注、假借之辨析。',
      keyPoints: [
        '漢字演進：甲骨文（商卜辭）→ 金文（周鐘鼎）→ 小篆（秦李斯統一天下）→ 隸書（漢代，古今文字分水嶺）→ 楷書（三國魏鍾繇，現代標準字體）。',
        '六書本質：象形、指事為「獨體文」；會意、形聲為「合體字」；轉注、假借為「用字之法」。'
      ],
      searchKeywords: ['六書', '字體演變', '語文常識二', '康軒國文'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-kx-g7-math-1-1',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['kangxuan'],
      unitCode: '1-1',
      unitName: '負數與數線',
      term: '上學期',
      editionNotes: '💡 康軒版特色：由生活實例（盈虧、溫度、海平面）導入負數概念，強調數線三要素與絕對值幾何意義。',
      description: '正負數的相反意義、數線三要素（原點、正向、單位長）、相反數與絕對值幾何意義。',
      keyPoints: [
        '數線三要素：原點（0）、方向（通常向右為正）、單位長（刻度間距）。',
        '絕對值 |a| 的幾何意義：數線上代表點 a 與原點 0 的「距離」，恆大於等於 0。'
      ],
      searchKeywords: ['負數與數線', '絕對值', '國一數學 1-1', '康軒 1-1'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-kx-g7-math-1-2',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['kangxuan'],
      unitCode: '1-2',
      unitName: '整數的四則運算與指數律',
      term: '上學期',
      editionNotes: '💡 康軒版特色：將四則運算、去括號法則與指數律融會貫通，著重乘方正負符號易錯陷阱。',
      description: '同號數與異號數加減法規則、負負得正法則、指數律公式與科學記號表達式。',
      keyPoints: [
        '乘方陷阱：(-2)^4 = +16（負號在括號內，偶次方為正）；但 -2^4 = -16（先算 2^4 再加負號）。',
        '指數律：a^m · a^n = a^(m+n)；(a^m)^n = a^(m·n)；a^0 = 1 (a≠0)。'
      ],
      searchKeywords: ['整數四則運算', '指數律', '科學記號', '國一數學 1-2', '康軒 1-2'],
      quizPaperId: 'paper-g7-math-ch1'
    },

    // -----------------------------------------------------------------------
    // 🔵 翰林版 (Hanlin)
    // -----------------------------------------------------------------------
    {
      id: 'unit-hl-g7-bio-1-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '1-1',
      unitName: '生命的起源',
      term: '上學期',
      editionNotes: '💡 翰林版編排：將生命的起源獨立為 1-1，專注於原始大氣、米勒實驗有機物合成假說與原始海洋。',
      description: '原始地球大氣（水氣、氨、甲烷、無游離氧氣）、原始海洋中大分子有機物誕生推論。',
      keyPoints: [
        '原始大氣主要由水氣、甲烷、氨氣組成，絕無游離氧氣（O2）。',
        '早期有機物由無機物藉雷電、紫外線催化產生，在原始海洋中逐漸聚合演化出原始生命。'
      ],
      searchKeywords: ['生命的起源', '翰林生物 1-1', '原始大氣'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-hl-g7-bio-1-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '1-2',
      unitName: '生物圈的範圍與極端生物（翰林獨創單元）',
      term: '上學期',
      editionNotes: '⭐ 翰林版獨創單元：翰林版唯一將「生物圈的範圍」獨立立節，詳細探討海平面上下各 10,000 公尺（厚度約 20 公里），以及深海熱泉管蟲、嗜極生物等段考高頻題！',
      description: '生物圈範圍（海平面垂直上下各 10 公里）、極端環境生物適應機制、保護生物圈的永續觀念。',
      keyPoints: [
        '生物圈範圍：以海平面為準，向上約 10,000 公尺，向下約 10,000 公尺，總厚度約 20 公里（若將地球比喻為蘋果，生物圈薄如蘋果皮）。',
        '極端環境適應：深海熱泉的管蟲利用硫化細菌獲取養分、仙人掌針狀葉減少水分蒸散、北極熊厚脂肪禦寒。'
      ],
      searchKeywords: ['生物圈的範圍', '極端生物', '翰林生物 1-2', '翰林獨創'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-hl-g7-bio-1-3',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '1-3',
      unitName: '活生生的細胞（細胞構造與功能）',
      term: '上學期',
      editionNotes: '💡 翰林版編號注意：因翰林多出 1-2 生物圈，故細胞構造在此版本為 1-3 小節！',
      description: '顯微鏡觀察、細胞學說、細胞核/膜/質/粒線體/葉綠體/細胞壁/液胞之構造與功能比較。',
      keyPoints: [
        '虎克觀察軟木塞薄片發現死細胞壁；許旺與許萊登創立細胞學說。',
        '動植物細胞差異：植物細胞特有細胞壁與葉綠體，但洋蔥表皮細胞無葉綠體！'
      ],
      searchKeywords: ['細胞構造', '翰林生物 1-3', '粒線體'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-hl-g7-bio-1-4',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '1-4',
      unitName: '物質通過細胞膜的方法',
      term: '上學期',
      editionNotes: '💡 翰林版編號注意：物質進出細胞在翰林版為 1-4 小節，圖解微觀膜蛋白通道運輸深入清晰。',
      description: '簡易擴散、促進性擴散、滲透作用、細胞於低張/等張/高張溶液中的生理反應。',
      keyPoints: [
        '簡易擴散（氣體 O2, CO2）不耗能直接通過磷脂雙層。',
        '滲透作用：水分子擴散。紅血球置入純水破裂，植物細胞因有細胞壁支持膨脹挺立不破。'
      ],
      searchKeywords: ['物質通過細胞膜', '翰林生物 1-4', '滲透作用'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-hl-g7-bio-3-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '3-1',
      unitName: '酵素的作用',
      term: '上學期',
      editionNotes: '💡 翰林版編排：將酵素獨立為 3-1，後續 3-2 講人體養分與能量。',
      description: '酵素特性、催化機制、專一性受質結合、溫度與 pH 活性影響。',
      keyPoints: [
        '酵素為蛋白質催化劑，具專一性與重複使用性。',
        '人體大部分酵素在 37°C 活性最高，高溫（>60°C）會使蛋白質變性永久失去活性。'
      ],
      searchKeywords: ['酵素', '翰林生物 3-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-hl-g7-bio-3-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '3-2',
      unitName: '養分與能量換算',
      term: '上學期',
      editionNotes: '💡 翰林版編排：3-2 專門聚焦產能營養素卡路里計算與試劑檢驗。',
      description: '醣類、蛋白質、脂質卡路里熱量換算，碘液與本氏液檢驗。',
      keyPoints: [
        '醣類 4 kcal/g、蛋白質 4 kcal/g、脂質 9 kcal/g。水、維生素、礦物質不產能。',
        '本氏液隔水加熱檢驗葡萄糖，依濃度呈綠、黃、橙、紅。'
      ],
      searchKeywords: ['養分與能量', '翰林生物 3-2'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-hl-g7-bio-3-3',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['hanlin'],
      unitCode: '3-3',
      unitName: '植物的光合作用與能量轉換（注意：翰林為3-3！）',
      term: '上學期',
      editionNotes: '⭐ 翰林版小節編號核心注意：光合作用在翰林版為「3-3 小節」！光反應與暗反應能量流動圖解極具特色，段考務必注意章節編號與試卷對應！',
      description: '葉綠體、光反應裂解水分子釋出氧氣、暗反應/碳反應固定 CO2 合成葡萄糖、照光遮光實驗四步驟。',
      keyPoints: [
        '光反應發生於類囊體：需光，水分子分解產生 O2 與 ATP。',
        '碳反應發生於基質：不需光，酵素催化利用 CO2 與光反應能量合成葡萄糖與水。',
        '光合作用釋放的氧氣來自「水（H2O）」！',
        '實驗：隔水加熱酒精以去除葉綠素，避免葉片綠色干擾碘液藍黑色顯色。'
      ],
      searchKeywords: ['光合作用', '翰林生物 3-3', '翰林光合作用'],
      quizPaperId: 'paper-bio-photosynthesis'
    },
    {
      id: 'unit-hl-g7-chi-1-1',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['hanlin'],
      unitCode: '第1課',
      unitName: '楊喚《夏夜》（翰林第1課）',
      term: '上學期',
      editionNotes: '⭐ 翰林版獨家特色：翰林版以楊喚現代詩名作《夏夜》為全書第 1 課，透過童詩富麗的想像開啟國中語文學習！',
      description: '現代童詩經典，楊喚以豐富色彩與動靜態描寫，描繪鄉村夏夜溫柔祥和氛圍。',
      keyPoints: [
        '楊喚為台灣兒童詩先驅，《夏夜》藉由擬人手法將自然萬物活靈活現地呈現。',
        '「珍珠和銀幣」的視覺對比：滿天繁星如珍珠，一輪皎月似銀幣。'
      ],
      searchKeywords: ['夏夜', '楊喚', '翰林國文第1課', '翰林第1課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-hl-g7-chi-1-2',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['hanlin'],
      unitCode: '第2課',
      unitName: '宋天儀《雅量》',
      term: '上學期',
      editionNotes: '💡 翰林版課次：宋天儀《雅量》編排於第 2 課，接續夏夜進行人際修養與處世哲理探討。',
      description: '生活化議論小品，以綠豆糕與棋盤為喻，倡導包容不同立場的雅量。',
      keyPoints: [
        '論點明確：每個人成長環境不同，審美自異，必須多一分雅量包容多元。'
      ],
      searchKeywords: ['雅量', '翰林國文第2課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-hl-g7-chi-1-3',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['hanlin'],
      unitCode: '第3課',
      unitName: '古蒙仁《吃冰的滋味》（翰林獨創選文）',
      term: '上學期',
      editionNotes: '⭐ 翰林版獨創經典篇目：古蒙仁《吃冰的滋味》為翰林版獨具特色之抒情佳作，描寫古早味挫冰與童年懷舊情感，段考重點探討感官摹寫！',
      description: '台灣飲食文學名篇，從早期鄉村冰棒、四果冰寫到現代冰品，抒發濃厚懷舊鄉土情懷。',
      keyPoints: [
        '感官摹寫之示範：觸覺冰涼、味覺甘甜、視覺繽紛交織。',
        '主旨：不僅描摹吃冰之樂，更寄寓對單純質樸童年歲月的無限追憶。'
      ],
      searchKeywords: ['吃冰的滋味', '古蒙仁', '翰林獨創選文', '翰林第3課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-hl-g7-chi-1-4',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['hanlin'],
      unitCode: '語文常識一',
      unitName: '標點符號與行款規範',
      term: '上學期',
      editionNotes: '💡 翰林版特色：除了 14 種標點符號，特別補充作文行款格式（不可於行首之符號規範）。',
      description: '標點符號用法與直式橫式書寫行款規範。',
      keyPoints: [
        '行款禁忌：句號、逗號、頓號、分號、冒號、問號、驚嘆號等不可寫於一行之首！'
      ],
      searchKeywords: ['標點符號', '行款規範', '翰林語文常識'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-hl-g7-chi-1-5',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['hanlin'],
      unitCode: '第5課',
      unitName: '朱自清《背影》（翰林第5課）',
      term: '上學期',
      editionNotes: '⭐ 翰林版課次注意：朱自清《背影》在翰林版為「第 5 課」（康軒版為第 6 課），段考進度安排務必查對！',
      description: '朱自清經典散文，父親翻越鐵道買橘子的背影刻劃含蓄深沈父愛。',
      keyPoints: [
        '以小見大：藉由「買橘子」一樁小事與背影特寫，表達最深沉的父子情感。',
        '色彩對照：朱紅橘子、深青布棉袍、黑布馬褂。'
      ],
      searchKeywords: ['背影', '朱自清', '翰林背影', '翰林第5課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-hl-g7-chi-1-6',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['hanlin'],
      unitCode: '語文常識二',
      unitName: '漢字結構與六書演進',
      term: '上學期',
      editionNotes: '💡 翰林版特色：甲骨文金文小篆隸書楷書圖表生動，六書合體與獨體解析透徹。',
      description: '漢字構造原理（象形、指事、會意、形聲、轉注、假借）與字體演進。',
      keyPoints: [
        '隸書為古今文字分水嶺；形聲字佔現代漢字 80% 以上。'
      ],
      searchKeywords: ['漢字結構', '六書', '翰林國文'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-hl-g7-math-1-1',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['hanlin'],
      unitCode: '1-1',
      unitName: '負數與數線',
      term: '上學期',
      editionNotes: '💡 翰林版特色：概念鋪陳嚴密，原點正向單位長三要素與數線點距離計算深入。',
      description: '正負數意義、數線模型與絕對值定義。',
      keyPoints: [
        '數線幾何距離公式：兩點 A(a) 與 B(b) 之距離為 |a - b|。'
      ],
      searchKeywords: ['負數與數線', '翰林數學 1-1'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-hl-g7-math-1-2',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['hanlin'],
      unitCode: '1-2',
      unitName: '整數的四則運算',
      term: '上學期',
      editionNotes: '💡 翰林版特色：合併加減乘除四則運算規則，強化乘除優先與分配律結合律。',
      description: '整數加減乘除混合運算、運算規律與去括號法則。',
      keyPoints: [
        '加法反元素與負負得正；先算中括號內，先乘除後加減。'
      ],
      searchKeywords: ['整數四則運算', '翰林數學 1-2'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-hl-g7-math-1-3',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['hanlin'],
      unitCode: '1-3',
      unitName: '指數律與運算（翰林獨立小節）',
      term: '上學期',
      editionNotes: '💡 翰林版編排：將「指數律」獨立為 1-3 小節，建立完整的次方底數運算架構。',
      description: '正整數指數律、乘方正負符號辨析、指數法則。',
      keyPoints: [
        '同底相乘指數相加：a^m · a^n = a^(m+n)。注意 (-3)^2 = 9 但 -3^2 = -9。'
      ],
      searchKeywords: ['指數律', '翰林數學 1-3'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-hl-g7-math-1-4',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['hanlin'],
      unitCode: '1-4',
      unitName: '科學記號表達式（翰林獨立小節）',
      term: '上學期',
      editionNotes: '💡 翰林版編排：將「科學記號」獨立為 1-4 小節，探討極大（天文距離）與極小（細胞病毒直徑）之數值記法。',
      description: '科學記號形式 a × 10^n（1 ≤ a < 10）、科學記號四則運算。',
      keyPoints: [
        '科學記號規範：a 必在 1 到 10 之間（包含 1 但不包含 10），n 為整數。'
      ],
      searchKeywords: ['科學記號', '翰林數學 1-4'],
      quizPaperId: 'paper-g7-math-ch1'
    },

    // -----------------------------------------------------------------------
    // 🟠 南一版 (Nani)
    // -----------------------------------------------------------------------
    {
      id: 'unit-ni-g7-bio-1-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['nani'],
      unitCode: '1-1',
      unitName: '探索生命（生命的起源與生命現象）',
      term: '上學期',
      editionNotes: '💡 南一版特色：章名定為「探索生命」，強調探究實作精神，由原始地球環境帶出生命現象四大特徵。',
      description: '原始大氣成份、無氧原始環境、生命四大現象（代謝、生長、感應、生殖）。',
      keyPoints: [
        '原始大氣主要為水氣、甲烷、氨氣、氫氣，無氧氣。',
        '鐘乳石滴水長大非生命現象；生命體必由細胞構成。'
      ],
      searchKeywords: ['探索生命', '南一生物 1-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-ni-g7-bio-1-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['nani'],
      unitCode: '1-2',
      unitName: '細胞的構造與觀察',
      term: '上學期',
      editionNotes: '💡 南一版特色：著重顯微鏡實作步驟與口腔皮膜細胞、水蘊草葉片觀察比較。',
      description: '複式顯微鏡與解剖顯微鏡操作、動植物細胞壁/膜/核/粒線體/葉綠體/液胞之構造異同。',
      keyPoints: [
        '顯微鏡操作：低倍鏡找目標（視野亮、範圍大），再換高倍鏡（視野暗、範圍小）。',
        '動植物細胞比較：植物細胞特有細胞壁與葉綠體，粒線體則動植物皆具備。'
      ],
      searchKeywords: ['細胞構造與觀察', '南一生物 1-2'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-ni-g7-bio-1-3',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['nani'],
      unitCode: '1-3',
      unitName: '物質進出細胞的方法',
      term: '上學期',
      editionNotes: '💡 南一版特色：強調質壁分離與膨脹之實驗驗證，圖解滲透平衡。',
      description: '擴散作用、滲透作用、氣體與小分子穿透機制、植物細胞質壁分離現象。',
      keyPoints: [
        '擴散作用：高濃度往低濃度自然擴散，不消耗能量。',
        '滲透作用：水分子擴散。濃鹽水中植物細胞會發生細胞膜與細胞壁分離（質壁分離）。'
      ],
      searchKeywords: ['物質進出細胞', '南一生物 1-3'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-ni-g7-bio-3-1',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['nani'],
      unitCode: '3-1',
      unitName: '養分與酵素的催化作用',
      term: '上學期',
      editionNotes: '💡 南一版特色：以唾液澱粉酶實驗為主軸，深入分析酵素在不同溫度與酸鹼度下的活性曲線。',
      description: '產能養分熱量計算、試劑檢驗、酵素專一性與活性條件實驗。',
      keyPoints: [
        '澱粉遇碘液呈藍黑色；葡萄糖遇本氏液隔水加熱變色。',
        '酵素由蛋白質組成，具專一性，可重複催化化學反應。'
      ],
      searchKeywords: ['養分與酵素', '南一生物 3-1'],
      quizPaperId: 'paper-g7-bio-ch1'
    },
    {
      id: 'unit-ni-g7-bio-3-2',
      gradeId: 'g7',
      subjectId: 'bio_science',
      editions: ['nani'],
      unitCode: '3-2',
      unitName: '植物的光合作用（製造養分）',
      term: '上學期',
      editionNotes: '💡 南一版課次：光合作用編排於 3-2 小節，強調能量從太陽光轉換為化學能的完整鏈條。',
      description: '光反應分解水釋出氧氣、碳反應固定二氧化碳合成葡萄糖、遮光照光對照組實驗。',
      keyPoints: [
        '光反應於類囊體釋放 O2；暗反應（碳反應）於基質消耗能量製造葡萄糖。',
        '酒精隔水加熱脫去葉綠素，避免影響後續碘液藍黑色的呈色判讀。'
      ],
      searchKeywords: ['光合作用', '南一生物 3-2'],
      quizPaperId: 'paper-bio-photosynthesis'
    },
    {
      id: 'unit-ni-g7-chi-1-1',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['nani'],
      unitCode: '第1課',
      unitName: '嚴長壽《做一隻光彩的螢火蟲》（南一獨創第1課）',
      term: '上學期',
      editionNotes: '⭐ 南一版獨創第1課：南一版獨家以嚴長壽勵志名作《做一隻光彩的螢火蟲》開篇，鼓勵青少年即使力量微小也能發光照亮周遭！',
      description: '當代勵志散文，以微小但燦爛的螢火蟲為喻，勉勵學生肯定自我定位、回饋社會。',
      keyPoints: [
        '主旨：每個人皆有獨特的天賦與光芒，只要肯努力奉獻，就能在黑暗中成為指引他人的螢火蟲。',
        '寫作特點：層層遞進、說理懇切、例證豐富。'
      ],
      searchKeywords: ['做一隻光彩的螢火蟲', '嚴長壽', '南一國文第1課', '南一第1課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-ni-g7-chi-1-2',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['nani'],
      unitCode: '第2課',
      unitName: '楊喚《夏夜》',
      term: '上學期',
      editionNotes: '💡 南一版課次：接續第 1 課進入楊喚童詩名作《夏夜》，感受大自然靜謐之美。',
      description: '童話風格現代詩名篇，富麗的珍珠與銀幣描摹夏夜天空。',
      keyPoints: [
        '擬人手法描寫自然生態；富麗珍珠比擬繁星，皎潔銀幣比擬明月。'
      ],
      searchKeywords: ['夏夜', '楊喚', '南一國文第2課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-ni-g7-chi-1-4',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['nani'],
      unitCode: '第4課',
      unitName: '沈復《兒時記趣》（南一版經典文言選文）',
      term: '上學期',
      editionNotes: '⭐ 南一版特色編排：南一版於七上第 4 課即安排清代沈復《浮生六記·兒時記趣》，早於其他版本啟蒙學生「物外之趣」文言閱讀！',
      description: '文言記敘散文名作，作者回憶幼時敏銳觀察力與豐富想像力所獲之「物外之趣」。',
      keyPoints: [
        '名句精讀：「余憶童稚時，能張目對日，明察秋毫，見藐小之物，必細察其紋理，故時有物外之趣。」',
        '想像比喻：以夏蚊成雷比作群鶴舞空；以草叢花台為叢林，蟲蟻為獸，土礫為丘。'
      ],
      searchKeywords: ['兒時記趣', '沈復', '南一國文第4課', '物外之趣'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-ni-g7-chi-1-5',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['nani'],
      unitCode: '語文常識一',
      unitName: '標點符號與工具書查閱',
      term: '上學期',
      editionNotes: '💡 南一版特色：結合常用標點符號與字典部首、注音檢字法之工具書查閱技能。',
      description: '標點符號用法與字典部首、筆畫、難字檢字法。',
      keyPoints: [
        '破折號佔二格表示轉折；夾注號補充說明；字典查閱部首檢字法先數部首以外筆畫。'
      ],
      searchKeywords: ['標點符號', '工具書查閱', '南一語文常識'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-ni-g7-chi-1-6',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['nani'],
      unitCode: '第5課',
      unitName: '朱自清《背影》（南一第5課）',
      term: '上學期',
      editionNotes: '⭐ 南一版課次注意：朱自清《背影》在南一版為「第 5 課」，以浦口送別與買橘子特寫深刻刻畫父愛。',
      description: '經典抒情散文，以小見大刻劃父親蹣跚背影，父子深情流露。',
      keyPoints: [
        '四次寫背影、三次流淚；朱紅橘子與深青棉袍強烈對比。'
      ],
      searchKeywords: ['背影', '朱自清', '南一背影', '南一第5課'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-ni-g7-chi-1-7',
      gradeId: 'g7',
      subjectId: 'chinese',
      editions: ['nani'],
      unitCode: '語文常識二',
      unitName: '漢字造字原則與字體演進',
      term: '上學期',
      editionNotes: '💡 南一版特色：以生活範例詳解六書（象形、指事、會意、形聲），圖解古今字體演進。',
      description: '漢字構造法（象形指事為獨體文，會意形聲為合體字）與漢字形體演化。',
      keyPoints: [
        '象形畫成其物；指事加符號表抽象觀念；會意比類合誼；形聲半形半聲。'
      ],
      searchKeywords: ['六書', '字體演進', '南一國文'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-ni-g7-math-1-1',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['nani'],
      unitCode: '1-1',
      unitName: '正數與負數（南一獨立單元）',
      term: '上學期',
      editionNotes: '💡 南一版編排：將正數與負數獨立成 1-1，專注建立正負號的相對生活意涵。',
      description: '生活中的正負量（溫度、高度、盈虧）與性質符號辨析。',
      keyPoints: [
        '性質符號（正負）與運算符號（加減）之區別；0 既非正數亦非負數。'
      ],
      searchKeywords: ['正數與負數', '南一數學 1-1'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-ni-g7-math-1-2',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['nani'],
      unitCode: '1-2',
      unitName: '數線與絕對值幾何意義',
      term: '上學期',
      editionNotes: '💡 南一版編排：數線與絕對值獨立成 1-2，重視數線距離與絕對值不等式基礎。',
      description: '數線三要素、點的坐標表示法、絕對值的幾何意義與距離計算。',
      keyPoints: [
        '數線三要素：原點、正向、單位長；|x| 代表點 x 到原點的距離。'
      ],
      searchKeywords: ['數線與絕對值', '南一數學 1-2'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-ni-g7-math-1-3',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['nani'],
      unitCode: '1-3',
      unitName: '整數的四則運算',
      term: '上學期',
      editionNotes: '💡 南一版特色：精選四則混合算式運算優先權，強化負負得正與去括號。',
      description: '整數加減乘除混合運算、分配律與先乘除後加減。',
      keyPoints: [
        '同號相加符號不變，異號相減取絕對值較大者的正負號。'
      ],
      searchKeywords: ['整數四則運算', '南一數學 1-3'],
      quizPaperId: 'paper-g7-math-ch1'
    },
    {
      id: 'unit-ni-g7-math-1-4',
      gradeId: 'g7',
      subjectId: 'math',
      editions: ['nani'],
      unitCode: '1-4',
      unitName: '指數律與科學記號',
      term: '上學期',
      editionNotes: '💡 南一版特色：指數律與科學記號合併於 1-4，建立極大與極小數值的快速指數運算。',
      description: '乘方運算、指數律公式、科學記號規範與生活應用。',
      keyPoints: [
        'a^m · a^n = a^(m+n)；科學記號 a × 10^n (1 ≤ a < 10)。'
      ],
      searchKeywords: ['指數律與科學記號', '南一數學 1-4'],
      quizPaperId: 'paper-g7-math-ch1'
    },

    // -----------------------------------------------------------------------
    // 國二 (八年級) - 跨版本對齊核心單元
    // -----------------------------------------------------------------------
    {
      id: 'unit-kx-g8-phy-3-1',
      gradeId: 'g8',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-1',
      unitName: '波動與聲音的傳播',
      term: '上學期',
      editionNotes: '💡 各版本八上理化重點：橫波縱波傳播特性、波速公式（v = f·λ）與回聲反射定律。',
      description: '橫波與縱波、波速公式（v = f × λ）、回聲反射定律與超聲波之生活應用。',
      keyPoints: [
        '波只傳遞「能量」與「波形」，介質只在原處來回振動，不隨波前進。',
        '波速公式：v = f × λ = λ / T。同一種介質在同一狀態下，波速固定！',
        '聲速：在 15°C 空氣中聲速約 340 m/s，溫度每升高 1°C 聲速增加 0.6 m/s（v = 331 + 0.6T）。',
        '回聲反射：原聲與回聲時間差需大於 0.1 秒，人耳方能分辨；聲納利用超聲波（頻率 > 20000 Hz）。'
      ],
      searchKeywords: ['波動', '波速公式', '回聲', '超聲波', '國二理化 3-1'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-kx-g8-phy-4-2',
      gradeId: 'g8',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '4-2',
      unitName: '光的折射與透鏡成像規律',
      term: '上學期',
      editionNotes: '💡 八上理化大考大魔王：凸透鏡成像規律（物距焦點對照）與近視、遠視眼鏡矯正原理。',
      description: '司乃耳折射定律定性分析、凸透鏡六種成像位置（物在兩倍焦距外/焦點上/焦點內）、眼鏡矯正原理。',
      keyPoints: [
        '光的折射：光從快介質（如空氣）斜射入慢介質（如水或玻璃）時，折射光線「偏向法線」（折射角 < 入射角）。',
        '凸透鏡成像心法：物在兩倍焦距外 (p > 2f) 倒立縮小實像（照相機）；物在一到兩倍焦距間倒立放大實像（投影機）；物在焦點內成正立放大虛像（放大鏡）。',
        '近視眼：影像成像於視網膜前，配戴「凹透鏡（發散光線）」矯正；遠視眼配戴「凸透鏡（會聚光線）」矯正。'
      ],
      searchKeywords: ['凸透鏡成像', '光折射', '近視矯正', '凹透鏡', '國二理化 4-2'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-kx-g8-phy-5-1',
      gradeId: 'g8',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '5-1',
      unitName: '溫度與熱量計算',
      term: '上學期',
      editionNotes: '💡 八上理化壓軸考點：H = m·s·ΔT 計算、熱平衡狀態吸熱放熱計算與熱傳播三途徑。',
      description: '溫標換算（攝氏、華氏）、熱量計算公式（H = m × s × ΔT）、熱平衡與熱傳播途徑。',
      keyPoints: [
        '熱量公式：H = m · s · ΔT（熱量 = 質量 × 比熱 × 溫度變化量）。',
        '比熱大者：難熱難冷（如水 s = 1 cal/g·°C）；比熱小者：易熱易冷（如金屬）。',
        '熱平衡：不考慮熱散失時，高溫物體放出的熱量 = 低溫物體吸收的熱量。',
        '熱傳播三途徑：傳導（固體為主）、對流（液體與氣體為主）、輻射（不需要介質，如太陽輻射）。'
      ],
      searchKeywords: ['熱量計算', '比熱公式', '熱平衡', '熱傳播', '國二理化 5-1'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-kx-g8-chi-1-1',
      gradeId: 'g8',
      subjectId: 'chinese',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '第1/2課',
      unitName: '劉禹錫《陋室銘》與銘文託物言志',
      term: '上學期',
      editionNotes: '💡 三大版本八上共同文言經典：劉禹錫名篇《陋室銘》，以景托情、借陋室抒發傲岸高潔志節。',
      description: '銘文體裁特色（押韻有戒勉意旨）、以景托情、反客為主的寫作層次與「斯是陋室，惟吾德馨」核心主旨。',
      keyPoints: [
        '體裁：銘文（古代刻於器物上用以自警或頌功德之押韻文體，本篇押灰韻：名、靈、馨、青、丁、經、亭）。',
        '主旨：借陋室以抒發作者安貧樂道、高潔傲岸之情懷。「談笑有鴻儒，往來無白丁」寫交往高雅。'
      ],
      searchKeywords: ['陋室銘', '劉禹錫', '銘文', '國二國文 1-1'],
      quizPaperId: 'paper-g7-chinese-ch1'
    },
    {
      id: 'unit-kx-g8-math-1-1',
      gradeId: 'g8',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '乘法公式與多項式四則運算',
      term: '上學期',
      editionNotes: '💡 國二數學關鍵奠基：平方差與和平方公式、多項式分離係數法乘除運算。',
      description: '和的平方、差的平方、平方差公式及多項式分離係數法乘除運算。',
      keyPoints: [
        '三大經典乘法公式：(a + b)² = a² + 2ab + b²；(a - b)² = a² - 2ab + b²；(a + b)(a - b) = a² - b²。',
        '除法算式關係：被除式 = 除式 × 商式 + 餘式。餘式的次數必小於除式的次數。'
      ],
      searchKeywords: ['乘法公式', '多項式除法', '平方差', '國二數學 1-1'],
      quizPaperId: 'paper-g8-math-pythagoras'
    },
    {
      id: 'unit-kx-g8-math-2-2',
      gradeId: 'g8',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-2',
      unitName: '平方根與畢氏定理（勾股定理）',
      term: '上學期',
      editionNotes: '💡 國二幾何幾大核心：直角三角形兩股平方和等於斜邊平方、坐標平面兩點距離公式。',
      description: '直角三角形兩股平方和等於斜邊平方（a² + b² = c²）、常見整數組與直角坐標系距離公式。',
      keyPoints: [
        '畢氏定理：若直角三角形兩股長為 a、b，斜邊為 c，則 a² + b² = c²。',
        '常見勾股整數比：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)、(8, 15, 17)、(1, 1, √2)、(1, √3, 2)。',
        '坐標平面兩點距離公式：P(x1, y1) 與 Q(x2, y2) 之距離 d = √[(x2 - x1)² + (y2 - y1)²]。'
      ],
      searchKeywords: ['畢氏定理', '勾股定理', '平方根', '國二數學 2-2'],
      quizPaperId: 'paper-g8-math-pythagoras'
    },

    // -----------------------------------------------------------------------
    // 國三 (九年級) - 會考總複習對齊
    // -----------------------------------------------------------------------
    {
      id: 'unit-kx-g9-phy-1-2',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '直線運動：速度、加速度與 v-t 圖判讀',
      term: '上學期',
      editionNotes: '🎯 國中教育會考每年必出：v-t 圖斜率為加速度、面積為位移，等加速度運動三大公式。',
      description: '位移 vs 路徑長、平均速度 vs 瞬時速度、加速度定義 a = (v - v0) / t、v-t 圖斜率與面積之幾何物理意涵。',
      keyPoints: [
        'v-t 圖核心判定二大心法：切線斜率代表「加速度 a」，圖形與時間軸圍成的面積代表「位移」。',
        '等加速度運動三大公式：v = v0 + at；s = v0*t + 1/2 at²；v² = v0² + 2as。',
        '自由落體：初速 v0 = 0，加速度 a = g = 9.8 m/s²，下落距離與時間平方成正比。'
      ],
      searchKeywords: ['直線運動', '加速度', 'vt圖', '等加速度公式', '國三理化 1-2', '會考自然 1-2'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-kx-g9-phy-2-1',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-1',
      unitName: '牛頓三大運動定律實戰全真解法',
      term: '上學期',
      editionNotes: '🎯 會考物理核心考點：第一慣性定律、第二 F=ma、第三作用與反作用力（受力物不同不可抵消）。',
      description: '第一定律（慣性定律）、第二定律（F_net = m × a）、第三定律（作用力與反作用力非抵消性）與斜面受力圖分析。',
      keyPoints: [
        '第一定律（慣性）：合力為零時，靜者恆靜，動者恆作等速度直線運動。安全帶、抖落傘上雨滴皆為慣性應用。',
        '第二定律（加速度）：F = m · a。合力方向恆與加速度方向相同，合外力加倍則加速度加倍。',
        '第三定律（作用與反作用）：大小相等、方向相反、在同一直線上，但「作用於不同物體」，故絕對不可抵消！'
      ],
      searchKeywords: ['牛頓運動定律', '慣性定律', 'F=ma', '作用力反作用力', '國三理化 2-1', '會考必考力學'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-kx-g9-phy-4-1',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '4-1',
      unitName: '電路學：歐姆定律、電阻與電功率',
      term: '上學期',
      editionNotes: '🎯 會考電學核心考點：串聯電流相等、並聯電壓相等，電功率 P = IV = I²R = V²/R。',
      description: '串聯與並聯電路電流電壓分配、歐姆定律（V = I × R）、電功率計算公式。',
      keyPoints: [
        '串聯電路：電流處處相等（I_tot = I1 = I2），總電壓為各電阻分壓和。',
        '並聯電路：各支路電壓相等（V_tot = V1 = V2），總電流為各支路電流和。',
        '電功率公式：P = I · V = I² · R = V² / R（單位為瓦特 W）。燈泡亮度取決於「實際消耗的電功率 P」！'
      ],
      searchKeywords: ['歐姆定律', '電功率', '串聯並聯', '國三理化 4-1', '會考電學'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-kx-g9-earth-5-1',
      gradeId: 'g9',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '5-1',
      unitName: '地球科學：板塊構造學說與地震台灣地質',
      term: '下學期',
      editionNotes: '🎯 會考地科必考：聚合型/張裂型/錯動型板塊邊界、地震規模（釋放能量無單位）vs 震度（各地晃動程度）。',
      description: '大陸漂移說到板塊構造、張裂型/聚合型/錯動型板塊邊界、震度（0~7級）vs 規模（芮氏無單位）、台灣位於歐亞與菲律賓海板塊交界。',
      keyPoints: [
        '板塊邊界類型：聚合型（喜馬拉雅山、中央山脈、海溝）；張裂型（中洋脊、東非大裂谷）；錯動型（轉形斷層）。',
        '地震名詞秒辨：地震「規模」代表釋放能量總量，一次地震只有一個數值且無單位；地震「震度」代表各地地面搖晃破壞程度。'
      ],
      searchKeywords: ['板塊構造', '地球科學', '地震震度規模', '國三地科 5-1', '會考地科'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-kx-g9-math-1-2',
      gradeId: 'g9',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '相似三角形與比例線段',
      term: '上學期',
      editionNotes: '🎯 會考數學幾何焦點：平行線截比例線段、相似三角形判定（AA, SAS, SSS）、面積比等於邊長平方比。',
      description: '平行線截比例線段性質、相似三角形判定定理（AA, SAS, SSS）、母子相似定理與面積比等於對應邊平方比。',
      keyPoints: [
        '平行線截線定理：直線平行於三角形一邊，必截另兩邊成比例線段。',
        '相似形核心性質：對應角相等，對應邊成比例。若兩相似圖形之對應邊長比為 a : b，則其「面積比為 a² : b²」。'
      ],
      searchKeywords: ['相似三角形', '比例線段', '母子相似', '國三數學 1-2', '會考數學幾何'],
      quizPaperId: 'paper-g9-cap-math'
    },
    {
      id: 'unit-kx-g9-math-2-1',
      gradeId: 'g9',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-1',
      unitName: '圓的幾何性質：圓心角、圓周角與切線定理',
      term: '上學期',
      editionNotes: '🎯 會考圓幾何大題必考：圓周角等於圓心角之一半、直徑所對圓周角為 90°、圓心切點連線垂直切線。',
      description: '圓心角等於所對弧度數、圓周角等於所對弧度數之一半、直徑所對圓周角為 90 度、圓外一點到圓之兩切線段等長。',
      keyPoints: [
        '圓心角與圓周角關係：同弧所對的圓周角度數 = 圓心角度數之一半 = 所對弧度數之一半。',
        '直徑定理：若線段 AB 為圓 O 之直徑，則半圓上任意圓周角 ∠APB 必等於 90°。',
        '切線性質：圓心到切點的半徑必垂直於切線（OP ⊥ L）。'
      ],
      searchKeywords: ['圓周角', '圓心角', '切線定理', '國三數學 2-1', '會考圓形幾何'],
      quizPaperId: 'paper-g9-cap-math'
    },

    // -----------------------------------------------------------------------
    // 高中 (學測 / 分科測驗)
    // -----------------------------------------------------------------------
    {
      id: 'unit-sr-bio-genetics',
      gradeId: 'senior',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '高一/高二',
      unitName: '分子生物學中心法則：DNA複製、轉錄與轉譯',
      term: '學測必考',
      editionNotes: '🎓 高中學測自然科必考壓軸：DNA 半保留複製、RNA 轉錄、密碼子轉譯合成蛋白質。',
      description: 'DNA 雙螺旋半保留複製、RNA 聚合酶轉錄 mRNA、核糖體轉譯三聯體密碼子合成多肽鏈。',
      keyPoints: [
        '中心法則（Central Dogma）：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質（Polypeptide）。',
        '鹼基互補配對原則：DNA 雙股中 A 與 T（雙氫鍵）、C 與 G（三氫鍵）；轉錄至 mRNA 時 A 配對為 U（尿嘧啶）。',
        '密碼子（Codon）：mRNA 上每三個相鄰核苷酸決定一個胺基酸；起始密碼子為 AUG，終止密碼子為 UAA、UAG、UGA。'
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
      editionNotes: '🎓 高中學測物理天體力學：克卜勒軌道定律、等面積定律（近日點最快）與週期定律（T²/R³=定值）。',
      description: '牛頓萬有引力定律（F = G·M·m/r²）、克卜勒第一（軌道）、第二（等面積）、第三（週期）定律。',
      keyPoints: [
        '克卜勒第一定律：所有行星繞太陽運行的軌道皆為橢圓，太陽位於橢圓兩焦點之一。',
        '克卜勒第二定律：太陽與行星的連線在相同時間內掃過相同的面積。因此「近日點速率最快，遠日點速率最慢」。',
        '克卜勒第三定律：繞同一中心天體運行的行星，其軌道半長軸立方與公轉週期平方之比值為常數：T² / R³ = 常數。'
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
      editionNotes: '🎓 高中學測數學關鍵考點：餘式定理、因式定理、對數律換底公式與向量內積幾何意涵。',
      description: '餘式定理、因式定理、對數律運算（log a + log b = log ab）、平面向量內積與夾角幾何意義。',
      keyPoints: [
        '餘式定理：多項式 f(x) 除以 (x - c) 的餘式等於 f(c)。',
        '因式定理：若 f(c) = 0，則 (x - c) 為 f(x) 的因式。',
        '對數律心法：log_a (x·y) = log_a x + log_a y；log_a (x^k) = k · log_a x；換底公式 log_a b = (log_c b) / (log_c a)。',
        '向量內積：a · b = |a||b|cosθ = x1x2 + y1y2。若兩非零向量垂直，則其內積恆為 0。'
      ],
      searchKeywords: ['餘式定理', '對數律', '向量內積', '高中數學學測'],
      quizPaperId: 'paper-senior-math-poly'
    },
    {
      id: 'unit-all-eng-gept',
      gradeId: 'g7',
      subjectId: 'english',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '全冊核心',
      unitName: '國中會考與全民英檢核心閱讀文法精選',
      term: '全年級通用',
      editionNotes: '🌍 跨版本英語文核心：時態辨析、關係代名詞、閱讀素養提煉。',
      description: '現在完成式、被動語態、關係代名詞（who/which/that）與大考素養長篇閱讀策略。',
      keyPoints: [
        '時態判定：現在完成式 have/has + p.p. 表示從過去持續至今之動作或經驗。',
        '被動語態：S + be動詞 + p.p. (+ by O)。'
      ],
      searchKeywords: ['英檢', '國中英文', '會考英文'],
      quizPaperId: 'paper-english-gept'
    },

    // -----------------------------------------------------------------------
    // 📘 高一 (十年級核心必修)
    // -----------------------------------------------------------------------
    {
      id: 'unit-g10-bio-central-dogma',
      gradeId: 'g10',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '分子生物學中心法則：DNA複製、轉錄與轉譯',
      term: '高一上學期',
      editionNotes: '🎓 高中必修生物核心：DNA半保留複製、RNA轉錄、三聯體密碼子轉譯合成多肽鏈。',
      description: 'DNA 雙螺旋結構、半保留複製機制、轉錄生成 mRNA、核糖體轉譯多肽鏈過程。',
      keyPoints: [
        '中心法則：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質。',
        '鹼基互補配對原則：DNA 雙股 A-T、C-G；轉錄時 A 配對為 RNA 之 U（尿嘧啶）。',
        '起始密碼子為 AUG（甲硫胺酸），終止密碼子為 UAA、UAG、UGA。'
      ],
      searchKeywords: ['高一生物 1-1', '中心法則', 'DNA複製', '轉錄轉譯'],
      quizPaperId: 'paper-senior-physics-bio'
    },
    {
      id: 'unit-g10-phy-kinematics',
      gradeId: 'g10',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-2',
      unitName: '直線運動學與牛頓運動力學基礎',
      term: '高一上學期',
      editionNotes: '🎓 高中必修物理關鍵：等加速度運動三大公式、v-t 圖斜率與面積物理意義。',
      description: '位移、速度、加速度、v-t 圖判讀、等加速度運動三大公式與自由落體。',
      keyPoints: [
        'v-t 圖斜率代表加速度 a，線下面積代表位移 s。',
        '等加速度三大公式：v = v0 + at；s = v0·t + (1/2)at²；v² = v0² + 2as。',
        '自由落體僅受重力作用，加速度為 g（約 9.8 m/s²），質量不同物體同時落地。'
      ],
      searchKeywords: ['高一物理 1-2', '直線運動', '等加速度', '牛頓運動'],
      quizPaperId: 'paper-g9-cap-science'
    },
    {
      id: 'unit-g10-math-poly',
      gradeId: 'g10',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '1-1',
      unitName: '多項式定理、餘式因式定理與二次函數極值',
      term: '高一上學期',
      editionNotes: '🎓 高中必修數學基石：多項式除法原理、餘式定理 f(c) 與配方法求二次函數極值。',
      description: '多項式四則運算、除法關係式被除式 = 除式×商式 + 餘式、餘式定理、因式定理與配方法。',
      keyPoints: [
        '除法原理：f(x) = g(x)·q(x) + r(x)，其中 deg(r) < deg(g) 或 r(x) = 0。',
        '餘式定理：多項式 f(x) 除以 (x - c) 的餘式恆等於 f(c)。',
        '因式定理：若 f(c) = 0，則 (x - c) 為 f(x) 的因式。'
      ],
      searchKeywords: ['高一數學 1-1', '多項式', '餘式定理', '因式定理'],
      quizPaperId: 'paper-senior-math-poly'
    },

    // -----------------------------------------------------------------------
    // 🔬 高二 (十一年級文理分流)
    // -----------------------------------------------------------------------
    {
      id: 'unit-g11-phy-gravity',
      gradeId: 'g11',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-1',
      unitName: '重力、天體力學與克卜勒行星運動三大定律',
      term: '高二上學期',
      editionNotes: '🎓 選修物理天體力學：克卜勒軌道定律、等面積速率與週期定律（T²/R³=定值）。',
      description: '萬有引力定律、克卜勒第一（橢圓軌道）、第二（等面積速率）、第三（週期）定律。',
      keyPoints: [
        '克卜勒第一定律：行星繞日軌道為橢圓，太陽位於其中一個焦點。',
        '克卜勒第二定律：近日點速率最快，遠日點速率最慢，相同時間掃過相同面積。',
        '克卜勒第三定律：同一中心天體之軌道長軸半徑立方與公轉週期平方比值為定值。'
      ],
      searchKeywords: ['高二物理 2-1', '克卜勒定律', '萬有引力', '天體力學'],
      quizPaperId: 'paper-senior-physics-bio'
    },
    {
      id: 'unit-g11-phy-optics',
      gradeId: 'g11',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-2',
      unitName: '幾何光學折射成像與波動干涉繞射現象',
      term: '高二上學期',
      editionNotes: '🎓 選修物理光學：斯乃爾折射定律、凸透鏡成像規律與雙狹縫干涉。',
      description: '光的折射率、全反射臨界角、透鏡成像公式 1/p + 1/q = 1/f 與波動光學基礎。',
      keyPoints: [
        '斯乃爾定律：n1·sinθ1 = n2·sinθ2；光由密介質進入疏介質可能產生全反射。',
        '凸透鏡成像：物在 2f 外成倒立縮小實像；物在 2f 成倒立等大實像；物在 f 內成正立放大虛像。',
        '楊氏雙狹縫干涉證明光具有波動性，條紋間距 Δy = λL / d。'
      ],
      searchKeywords: ['高二物理 2-2', '光學折射', '透鏡成像', '雙狹縫干涉'],
      quizPaperId: 'paper-g8-phy-optics'
    },
    {
      id: 'unit-g11-math-vector',
      gradeId: 'g11',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '2-1',
      unitName: '平面向量內積幾何、空間坐標與三角比進階',
      term: '高二上學期',
      editionNotes: '🎓 數學 A/B 核心：向量加減法、內積公式、正射影與柯西不等式。',
      description: '平面向量線性組合、內積 a·b = |a||b|cosθ、垂直條件 a·b = 0、正射影長度與空間坐標系。',
      keyPoints: [
        '向量內積：a·b = x1x2 + y1y2 = |a||b|cosθ；兩垂直向量內積等於 0。',
        '柯西不等式：(a1² + a2²)(b1² + b2²) ≥ (a1b1 + a2b2)²，等號成立時成比例。',
        '正射影公式：a 在 b 上的正射影為 ((a·b) / |b|²) · b。'
      ],
      searchKeywords: ['高二數學 2-1', '平面向量', '向量內積', '柯西不等式'],
      quizPaperId: 'paper-senior-math-poly'
    },

    // -----------------------------------------------------------------------
    // 🎓 高三 (十二年級學測/分科大考)
    // -----------------------------------------------------------------------
    {
      id: 'unit-g12-math-calculus',
      gradeId: 'g12',
      subjectId: 'math',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-1',
      unitName: '微積分極限、導數導函數與切線斜率應用',
      term: '高三上學期',
      editionNotes: '🎓 高三數學壓軸：數列與函數極限、微分公式、切線方程式與極值判別。',
      description: '極限定義、導數幾何意義（切線斜率）、多項式函數微分法、一階導數判別單調性與極值。',
      keyPoints: [
        '導數定義：f\'(x) = lim_{h->0} [f(x+h) - f(x)] / h，代表切線斜率與瞬間變化率。',
        '冪次微分法則：(x^n)\' = n·x^(n-1)；常數微分等於 0。',
        '極值判別法：若 f\'(c) = 0 且兩側由正變負，則 f(c) 為局部極大值。'
      ],
      searchKeywords: ['高三數學 3-1', '微積分', '導函數', '切線斜率'],
      quizPaperId: 'paper-senior-math-poly'
    },
    {
      id: 'unit-g12-phy-electromagnetism',
      gradeId: 'g12',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-1',
      unitName: '電磁感應、法拉第定律與電磁波譜大考總複習',
      term: '學測/分科衝刺',
      editionNotes: '🎓 分科測驗自然物理：磁通量變化產生感應電動勢、冷次定律抗拒變化。',
      description: '磁通量 Φ = B·A、法拉第電磁感應定律 ε = -ΔΦ/Δt、冷次定律方向判斷與交流發電機原理。',
      keyPoints: [
        '法拉第定律：感應電動勢大小正比於磁通量之時變率 ε = -N(dΦ/dt)。',
        '冷次定律：感應電流所產生的磁場，恆反抗原磁通量的變化（抗拒改變）。',
        '電磁波為橫波，電場 E 與磁場 B 互相垂直且皆垂直於行進方向，真空光速 c = 3×10^8 m/s。'
      ],
      searchKeywords: ['高三物理 3-1', '電磁感應', '法拉第定律', '冷次定律'],
      quizPaperId: 'paper-senior-physics-bio'
    },
    {
      id: 'unit-g12-bio-genetics-cap',
      gradeId: 'g12',
      subjectId: 'bio_science',
      editions: ['kangxuan', 'hanlin', 'nani'],
      unitCode: '3-2',
      unitName: '現代遺傳工程、生物多樣性與生態保育學測衝刺',
      term: '學測/分科衝刺',
      editionNotes: '🎓 學測生物全冊複習：基因重組技術、質體載體、PCR 核酸複製與生態系碳氮循環。',
      description: '限制酶與 DNA 連接酶、質體重組、PCR 反應三步驟（變性、黏合、延伸）與生物多樣性層次。',
      keyPoints: [
        '基因重組三工具：限制酶（分子剪刀）、DNA 連接酶（分子膠水）、質體（運載工具）。',
        'PCR 聚合酶連鎖反應三步驟：95°C 變性雙股分開 → 55°C 引子黏合 → 72°C Taq 聚合酶延伸。',
        '生物多樣性三大層次：遺傳多樣性、物種多樣性、生態系多樣性。'
      ],
      searchKeywords: ['高三生物 3-2', '遺傳工程', 'PCR', '生物多樣性'],
      quizPaperId: 'paper-senior-physics-bio'
    }
  ]
};
