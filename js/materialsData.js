// Curated High-Quality Educational Materials Database aligned with Taiwan Curriculum (翰林、康軒、南一)
window.MATERIALS_DATA = [
  // 1. 光合作用 (國一生物 康軒 3-2 / 翰林 3-3 / 南一 3-2 核心)
  {
    id: 'mat-photosynthesis-cellular',
    title: '國一生物：植物光合作用與能量轉換全景圖解 (康軒 3-2 / 翰林 3-3 / 南一 3-2)',
    category: 'science',
    subject: '自然生物',
    subjectIcon: '🌿',
    grade: '國一生物 (康軒 3-2 / 翰林 3-3 / 南一 3-2) ｜ 會考大考必讀',
    difficulty: '段考核心',
    readTime: '7 分鐘',
    views: 18400,
    rating: 5.0,
    editionTag: '康軒版 3-2 ｜ 翰林版 3-3 ｜ 南一版 3-2',
    tags: ['光合作用', '光反應', '暗反應', '碳反應', '葉綠素脫色', '國一生物', '康軒版', '翰林版', '南一版'],
    summary: '從葉綠體類囊體的光反應水解產氧，到基質中碳反應合成葡萄糖。完整剖析會考大考必考的「隔水加熱葉綠素脫色」與「碘液澱粉檢驗」實驗步驟。',
    keyTakeaways: [
      '光反應（類囊體，需光）：葉綠素吸收光能分解「水（H2O）」釋放「氧氣（O2）」，產生 ATP 能量貨幣。',
      '暗反應/碳反應（基質，需酵素）：利用光反應產物將「二氧化碳（CO2）」合成葡萄糖與水。',
      '大考必背：光反應產生的氧氣完全來自於「水（H2O）」，絕非來自「二氧化碳（CO2）」。',
      '葉片檢驗澱粉四步法：1. 沸水煮沸破壞細胞 → 2. 隔水加熱酒精水浴脫色 → 3. 漂洗軟化 → 4. 滴碘液（照光部藍黑，遮光部黃褐）。'
    ],
    sections: [
      {
        heading: '一、 光合作用總反應方程式與場所剖析',
        content: `
<div class="formula-banner">
  <code>6 CO₂ + 12 H₂O + 光能 ──(葉綠素/酵素)──> C₆H₁₂O₆ + 6 O₂ + 6 H₂O</code>
</div>
<p>植物的光合作用可分為兩大緊密銜接的階段：</p>
<ul>
  <li><strong>光反應（Light Reaction）：</strong>發生在葉綠體的<strong>類囊體薄膜</strong>。葉綠素吸收太陽光能，將水分子分解，產生<strong>氧氣（釋放到空氣中）</strong>、NADPH 與 ATP。</li>
  <li><strong>暗反應 / 碳反應（Calvin Cycle）：</strong>發生在葉綠體的<strong>基質</strong>。不需要光照直接照射，由多種酵素催化，利用光反應提供的 ATP 將<strong>二氧化碳（CO₂）</strong>轉化固定為<strong>葡萄糖</strong>與水。</li>
</ul>`
      },
      {
        heading: '二、 段考必考：探究葉片製造澱粉的四大實驗步驟',
        content: `
<div class="method-card">
  <div class="method-step"><span class="step-num">01</span><strong>沸水加熱：</strong>將綠葉放入熱水中煮 2~3 分鐘，目的在於破壞細胞角質層與細胞膜，使細胞死亡，便於試劑進出。</div>
  <div class="method-step"><span class="step-num">02</span><strong>隔水加熱酒精水浴：</strong>將葉片放入盛有酒精的小燒杯，再置於大燒杯的沸水中「隔水加熱」。酒精能溶解葉綠素使葉片脫色變白。<strong>【安全重點】：酒精易燃，絕對不可直接用火加熱！</strong></div>
  <div class="method-step"><span class="step-num">03</span><strong>溫水漂洗：</strong>將脫色後的葉片放入溫水中漂洗，洗去殘留酒精並使硬化脆折的葉片軟化。</div>
  <div class="method-step"><span class="step-num">04</span><strong>滴加碘液檢驗：</strong>平鋪葉片於培養皿，滴加黃褐色的碘液。照光部位產生澱粉呈<strong>「藍黑色」</strong>；遮光部位無澱粉呈<strong>「黃褐色（碘液原本顏色）」</strong>。</div>
</div>`
      }
    ],
    relatedQuizId: 'paper-bio-photosynthesis',
    writingPromptId: null
  },

  // 2. 國一生物 1-1 ~ 1-2 生命與細胞
  {
    id: 'mat-g7-bio-cells',
    title: '國一生物 1-1 ~ 1-2：生命的起源、特性與細胞構造比較 (康軒/翰林版)',
    category: 'science',
    subject: '自然生物',
    subjectIcon: '🔬',
    grade: '國一生物 (康軒/翰林 1-1 到 1-2)',
    difficulty: '第一次段考重點',
    readTime: '8 分鐘',
    views: 16200,
    rating: 4.95,
    editionTag: '康軒版 1-1~1-2 ｜ 翰林版 1-1~1-2',
    tags: ['國一生物', '細胞構造', '動植物細胞', '生命現象', '康軒版', '翰林版'],
    summary: '一次掌握國一生物第一次段考精華：生命的四項特徵（生長生殖感應代謝）、顯微鏡操作注意事項、動植物細胞（細胞壁、葉綠體、液胞、粒線體）異同。',
    keyTakeaways: [
      '生命現象：生長、生殖、感應、代謝。鐘乳石長大、晶體結晶不具細胞結構，非生命現象。',
      '細胞核：生命中樞，內含染色質與 DNA；細胞膜：磷脂質與蛋白質組成，控制物質進出。',
      '植物細胞特有：細胞壁（纖維素，維持形態保護細胞）、葉綠體（行光合作用，非所有植物細胞皆有，根與洋蔥表皮無）。',
      '粒線體：動植物細胞皆有，有氧呼吸產生 ATP 之場所。'
    ],
    sections: [
      {
        heading: '一、 動植物細胞構造深度比較表',
        content: `
<div class="vocab-table-wrapper">
  <table class="vocab-table">
    <thead><tr><th>構造名稱</th><th>植物細胞</th><th>動物細胞</th><th>主要生理功能</th></tr></thead>
    <tbody>
      <tr><td>細胞壁</td><td>有（纖維素）</td><td>無</td><td>保護、支持細胞，維持特定外形</td></tr>
      <tr><td>細胞核</td><td>有</td><td>有</td><td>生命中樞，儲存遺傳物質 DNA</td></tr>
      <tr><td>細胞膜</td><td>有</td><td>有</td><td>控制物質進出細胞（脂雙層）</td></tr>
      <tr><td>粒線體</td><td>有</td><td>有</td><td>呼吸作用能量工廠（產生 ATP）</td></tr>
      <tr><td>葉綠體</td><td>綠色組織才有</td><td>無</td><td>光合作用製造葡萄糖</td></tr>
      <tr><td>液胞</td><td>通常 1 個且巨大</td><td>多個且細小</td><td>儲存水、糖分、廢物，維持膨壓</td></tr>
    </tbody>
  </table>
</div>`
      }
    ],
    relatedQuizId: 'paper-g7-bio-ch1',
    writingPromptId: null
  },

  // 3. 國一國文 1-1 ~ 1-2 朱自清《背影》與標點符號
  {
    id: 'mat-g7-chinese-text',
    title: '國一國文 1-1 ~ 1-2：朱自清《背影》精讀與語文常識字體演變 (康軒/翰林版)',
    category: 'writing',
    subject: '國文寫作',
    subjectIcon: '✍️',
    grade: '國一國文 (康軒/翰林 1-1 到 1-2)',
    difficulty: '國一段考必考',
    readTime: '9 分鐘',
    views: 14500,
    rating: 4.96,
    editionTag: '康軒版 1-1~1-2 ｜ 翰林版 1-1~1-2',
    tags: ['背影', '朱自清', '以小見大', '標點符號', '字體演變', '國一國文', '康軒版', '翰林版'],
    summary: '深度解析課文《背影》四次背影描寫的層次遞進、物象寄情手法，以及語文常識（甲骨文、金文、小篆、隸書、楷書）與十四種標點符號規範。',
    keyTakeaways: [
      '《背影》篇中四次「背影」：點題背影、買橘子背影（主體核心）、離別背影、思念背影。',
      '語文常識漢字演進：甲骨文（商卜辭）→ 金文（周鐘鼎）→ 小篆（秦李斯統一天下文字）→ 隸書（漢代，破圓為方化繁為簡）→ 楷書（三國魏鍾繇，規範標準字）。',
      '標點符號：破折號（——佔兩格）表示聲音拉長或語氣轉折；夾注號（（ ）或 ── ──）用於補充說明。'
    ],
    sections: [
      {
        heading: '一、 課文四次「背影」脈絡與寫作技巧',
        content: `
<div class="structure-diagram">
  <div class="struct-block"><div class="st-title">第一次（開篇點題）</div><div class="st-desc">「我與父親不相見已有二年餘了，我最不能忘記的是他的背影。」難忘背影，提契全篇。</div></div>
  <div class="struct-block"><div class="st-title">第二次（望父買橘）</div><div class="st-desc">特寫父親微胖蹣跚穿過鐵道買橘子的艱辛背影，以小見大，全篇情感高潮。</div></div>
  <div class="struct-block"><div class="st-title">第三次（父子惜別）</div><div class="st-desc">父親離去混入來往人潮，作者在淚光中目送背影，充滿依戀與歉疚。</div></div>
  <div class="struct-block"><div class="st-title">第四次（別後思念）</div><div class="st-desc">讀父親家信「大去之期不遠」，在晶瑩淚光中重現背影，首尾呼應，餘音裊裊。</div></div>
</div>`
      }
    ],
    relatedQuizId: 'paper-g7-chinese-ch1',
    writingPromptId: 'prompt-cherished-object'
  },

  // 4. 國一數學 1-1 ~ 1-2 負數數線與指數律
  {
    id: 'mat-g7-math-ch1',
    title: '國一數學 1-1 ~ 1-2：負數與數線、四則運算與指數律 (康軒/翰林版)',
    category: 'math',
    subject: '數學邏輯',
    subjectIcon: '🔢',
    grade: '國一數學 (康軒/翰林 1-1 到 1-2)',
    difficulty: '第一次段考核心',
    readTime: '8 分鐘',
    views: 13900,
    rating: 4.92,
    editionTag: '康軒版 1-1~1-2 ｜ 翰林版 1-1~1-2',
    tags: ['國一數學', '負數與數線', '絕對值', '指數律', '科學記號', '康軒版', '翰林版'],
    summary: '國中數學起跑第一章：數線三要素、相反數與絕對值距離幾何意義、正負數去括號規則、負數乘方陷阱與指數律公式全歸納。',
    keyTakeaways: [
      '數線三要素：原點、正向（通常向右）、單位長。',
      '數線上兩點距離：線段 AB = |a - b| = 大數 - 小數，距離恆為正數。',
      '指數乘方大考陷阱：(-2)^4 = +16（負號在括號內，偶次方為正）；但 -2^4 = -16（先算 2^4 再加負號）。',
      '科學記號標準式：a × 10^n，其中 1 ≤ |a| < 10，n 為整數。'
    ],
    sections: [
      {
        heading: '一、 核心公式與解題思維',
        content: `
<div class="formula-banner">
  <code>數線距離：AB = |A - B| | 指數律：a^m · a^n = a^(m+n), (a^m)^n = a^(m·n)</code>
</div>`
      }
    ],
    relatedQuizId: 'paper-g7-math-ch1',
    writingPromptId: null
  },

  // 5. 記敘抒情文寫作手法 (通識高分)
  {
    id: 'mat-narrative-writing',
    title: '記敘抒情文的靈魂六要素與「以小見大」寫作法',
    category: 'writing',
    subject: '國文寫作',
    subjectIcon: '✍️',
    grade: '國高中 / 學測會考必備',
    difficulty: '進階核心',
    readTime: '8 分鐘',
    views: 19480,
    rating: 4.9,
    editionTag: '全國通用 ｜ 會考作文六級分必讀',
    tags: ['記敘文', '抒情描寫', '以小見大', '審題技巧', '會考學測'],
    summary: '掌握記敘文的人事時地物與情感昇華，學習如何透過一個微小的物件、一句平凡的對話，映射出深邃的人生感悟與情感共鳴。',
    keyTakeaways: [
      '記敘文切忌流水帳，必須有「核心衝突」與「心境轉折（情感弧線）」。',
      '「以小見大」：藉由微小細節（如一枚舊鑰匙、一碗冷掉的湯、母親粗糙的手指）寄託重大情感。',
      '感官描寫五感法：視覺、聽覺、嗅覺、味覺、觸覺疊加，讓文字呈現 4K 畫面感。',
      '結尾昇華不可喊口號，必須由前面的敘事自然水到渠成，點出哲理性啟發。'
    ],
    sections: [
      {
        heading: '一、 什麼是真正動人的記敘抒情？',
        content: `記敘文的六大要素包含：時間、地點、人物、起因、經過、結果。然而，決定一篇作文是否卓越的，是第六要素之後的**「反思與昇華」**。`
      }
    ],
    relatedQuizId: 'paper-g7-chinese-ch1',
    writingPromptId: 'prompt-cherished-object'
  },

  // 6. 議論文三要素
  {
    id: 'mat-argumentative-writing',
    title: '議論文核心三要素與邏輯駁論架構全指南',
    category: 'writing',
    subject: '國文/英文寫作',
    subjectIcon: '⚖️',
    grade: '高中 / 大學學術寫作',
    difficulty: '高分必讀',
    readTime: '10 分鐘',
    views: 15900,
    rating: 5.0,
    editionTag: '全國通用 ｜ 學測國寫思辨',
    tags: ['議論文', '論點論據', '批判性思維', '駁論法', '學測國寫'],
    summary: '深度剖析論點（Claim）、論據（Evidence）、論證（Warrant）的嚴謹三角結構，掌握「立論、例證、駁論、重申」的四步破題必殺技。',
    keyTakeaways: [
      '論點（Claim）：明確清晰、具備爭議性與可辯性，不可是毫無爭議的客觀陳述。',
      '論據（Evidence）：兼顧事實論據（數據、歷史、實驗）與理論論據（名言、哲理、法理）。',
      '駁論（Counter-argument）：先呈現對立立場的最強理據，再指出其適用邊界或邏輯盲點，展現思維寬度。'
    ],
    sections: [
      {
        heading: '一、 圖爾敏（Toulmin）論證模型簡析',
        content: `嚴謹的說理絕非自說自話。一個強大的論證由六個核心支柱構成：主張、資料、論證依據、支持背書與反駁預判。`
      }
    ],
    relatedQuizId: 'paper-g7-chinese-ch1',
    writingPromptId: 'prompt-discipline-freedom'
  },

  // 7. 英文五段論
  {
    id: 'mat-english-essay-mastery',
    title: 'English 5-Paragraph Essay: Structure & Advanced Transitions',
    category: 'english',
    subject: '英文寫作',
    subjectIcon: '🌍',
    grade: 'High School / TOEFL / IELTS / GEPT',
    difficulty: '進階突破',
    readTime: '9 分鐘',
    views: 18230,
    rating: 4.95,
    editionTag: '國高中進階 ｜ 英檢與會考必讀',
    tags: ['English Essay', 'Thesis Statement', 'Transitions', 'IELTS Writing', 'Academic Writing'],
    summary: 'Master the standard academic essay: crafting an airtight thesis statement, cohesive topic sentences, and sophisticated transition phrases for maximum band scores.',
    keyTakeaways: [
      'The Thesis Statement must be the final sentence of your introduction, containing a clear stance and 2-3 roadmaps.',
      'Every body paragraph must begin with a unified Topic Sentence directly tied to your thesis.',
      'Use the PEEL structure: Point, Evidence, Explanation, Link back to topic.'
    ],
    sections: [
      {
        heading: '1. The Anatomy of an Academic Introduction',
        content: `A captivating introduction follows an inverted pyramid (Broad to Specific): Hook, Bridge, and Thesis Statement.`
      }
    ],
    relatedQuizId: 'paper-english-gept',
    writingPromptId: 'prompt-english-ai'
  },

  // 8. 國二理化 4-2 光的折射與透鏡成像
  {
    id: 'mat-g8-optics-lens',
    title: '國二理化 4-2：光的折射規律與凸透鏡成像心法 (康軒/翰林版)',
    category: 'science',
    subject: '自然理化',
    subjectIcon: '🔦',
    grade: '國二理化 (八年級 4-2 單元)',
    difficulty: '段考高頻難點',
    readTime: '8 分鐘',
    views: 17200,
    rating: 4.96,
    editionTag: '康軒版 4-2 ｜ 翰林版 4-2 ｜ 南一版 4-2',
    tags: ['透鏡成像', '光的折射', '凸透鏡', '凹透鏡', '近視眼鏡', '國二理化', '八年級'],
    summary: '一次打通國二理化最常失分的光學大魔王：光從快介質入慢介質偏向法線、凸透鏡六種成像位置記憶口訣、近視（配戴凹透鏡發散）與遠視矯正原理。',
    keyTakeaways: [
      '折射方向：光從空氣（快）進入水或玻璃（慢）時，偏向法線（折射角 < 入射角）。',
      '凸透鏡成像口訣：物在兩倍焦距外成「倒立縮小實像（相機）」；物在一到兩倍焦距間成「倒立放大實像（投影機）」；物在焦點內成「正立放大虛像（放大鏡）」。',
      '實像必定「倒立」，可用紙屏承接；虛像必定「正立」，不可用紙屏承接。',
      '近視眼：影像落在視網膜「前」，需配戴具有發散光線功能的「凹透鏡」矯正。'
    ],
    sections: [
      {
        heading: '一、 凸透鏡六大成像狀態速記表',
        content: `
<div class="vocab-table-wrapper">
  <table class="vocab-table">
    <thead><tr><th>物距 (p)</th><th>像距 (q)</th><th>成像性質</th><th>日常生活應用</th></tr></thead>
    <tbody>
      <tr><td>p > 2f (兩倍焦距外)</td><td>f < q < 2f</td><td>倒立、縮小、實像</td><td>照相機、智慧型手機鏡頭、人眼水晶體</td></tr>
      <tr><td>p = 2f (兩倍焦距上)</td><td>q = 2f</td><td>倒立、等大、實像</td><td>等大複印機</td></tr>
      <tr><td>f < p < 2f (焦點到2f間)</td><td>q > 2f</td><td>倒立、放大、實像</td><td>電影放映機、教室單槍投影機</td></tr>
      <tr><td>p = f (焦點上)</td><td>無窮遠</td><td>不成像（平行光射出）</td><td>探照燈、汽車車頭燈</td></tr>
      <tr><td>p < f (焦點內)</td><td>物體同側</td><td>正立、放大、虛像</td><td>放大鏡、老花眼鏡閱讀輔助</td></tr>
    </tbody>
  </table>
</div>`
      }
    ],
    relatedQuizId: 'paper-g8-phy-optics',
    writingPromptId: null
  },

  // 9. 國二數學 2-2 畢氏定理（勾股定理）
  {
    id: 'mat-g8-math-pythagoras',
    title: '國二數學 2-2：畢氏定理的幾何本質與三種證明 (康軒/翰林版)',
    category: 'math',
    subject: '數學邏輯',
    subjectIcon: '📐',
    grade: '國二數學 (八年級 2-2 單元)',
    difficulty: '段考必考核心',
    readTime: '7 分鐘',
    views: 15300,
    rating: 4.93,
    editionTag: '康軒版 2-2 ｜ 翰林版 2-2 ｜ 南一版 2-2',
    tags: ['畢氏定理', '勾股定理', '直角三角形', '坐標距離', '國二數學', '八年級'],
    summary: '從幾何拼圖證明直角三角形 a^2 + b^2 = c^2，掌握常見整數比例組（3-4-5、5-12-13、7-24-25）與直角坐標系兩點距離公式。',
    keyTakeaways: [
      '畢氏定理（Pythagorean theorem）：直角三角形兩股之平方和等於斜邊之平方。',
      '常見整數組：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)、(8, 15, 17)、(9, 40, 41)。',
      '特殊角直角三角形邊長比：30°-60°-90° 邊長比為 1 : √3 : 2；45°-45°-90° 邊長比為 1 : 1 : √2。',
      '坐標平面兩點距離公式：d = √[(x2 - x1)^2 + (y2 - y1)^2]。'
    ],
    sections: [
      {
        heading: '一、 公式與核心解題思維',
        content: `
<div class="formula-banner">
  <code>直角三角形斜邊公式：c = √(a² + b²) | 兩點距離：d = √[(Δx)² + (Δy)²]</code>
</div>`
      }
    ],
    relatedQuizId: 'paper-g8-math-pythagoras',
    writingPromptId: null
  },

  // 10. 國三會考自然力學與直線運動
  {
    id: 'mat-g9-cap-mechanics',
    title: '國三會考理化：直線運動 v-t 圖與牛頓運動定律解題全模組',
    category: 'science',
    subject: '自然理化',
    subjectIcon: '🚀',
    grade: '國三九年級 ｜ 國中教育會考 A++ 衝刺',
    difficulty: '會考必殺技',
    readTime: '9 分鐘',
    views: 21800,
    rating: 4.98,
    editionTag: '國三會考總複習 ｜ 康軒/翰林/南一全通用',
    tags: ['牛頓定律', 'vt圖', '等加速度', '合外力', '會考自然', '國三理化', '九年級'],
    summary: '國中教育會考自然科每年必出 3~5 題的力學經典考點：v-t 圖斜率與面積判讀、牛頓三大定律、等加速度三大公式與滑車實驗。',
    keyTakeaways: [
      'v-t 圖判讀雙絕招：斜率 = 加速度 a；線下圍成代數面積 = 位移 s。',
      '牛頓第一定律：F_net = 0 時，靜者恆靜，動者恆作等速度運動（慣性）。',
      '牛頓第二定律：F_net = m · a。合力方向恆與加速度同向。',
      '牛頓第三定律：作用力與反作用力「大小相等、方向相反、在同一直線、分別作用在不同物體」，絕不可相互抵消！'
    ],
    sections: [
      {
        heading: '一、 v-t 圖與三大等加速度公式對照',
        content: `
<div class="formula-banner">
  <code>① v = v₀ + at | ② s = v₀t + ½at² | ③ v² = v₀² + 2as</code>
</div>`
      }
    ],
    relatedQuizId: 'paper-g9-cap-science',
    writingPromptId: null
  },

  // 11. 高中學測自然 分子生物與克卜勒定律
  {
    id: 'mat-senior-natural-science',
    title: '高中學測自然：分子生物學中心法則與克卜勒行星定律跨科特訓',
    category: 'science',
    subject: '自然科學',
    subjectIcon: '🧬',
    grade: '高中 (高一~高三) ｜ 大學學測必讀',
    difficulty: '學測頂標',
    readTime: '10 分鐘',
    views: 19600,
    rating: 4.97,
    editionTag: '高中學測專用 ｜ 108課綱跨領域素養',
    tags: ['分子生物學', '中心法則', '克卜勒定律', '高中學測', '萬有引力'],
    summary: '涵蓋高一高二必修生物核心（DNA 轉錄至 mRNA 與密碼子轉譯蛋白質），以及高中物理重力場與克卜勒行星三大定律計算。',
    keyTakeaways: [
      '中心法則：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質。',
      '克卜勒第二定律：等面積速率定律，近日點距離近則速率最快，遠日點距離遠則速率最慢。',
      '克卜勒第三定律：週期平方與半長軸立方之比為常數（T^2 / R^3 = k）。'
    ],
    sections: [
      {
        heading: '一、 分子生物學遺傳訊息傳遞與克卜勒三大定律',
        content: `
<p>高中自然科著重跨領域概念整合。生命科學中以 DNA 鹼基對（A-T, C-G）為藍圖，透過三聯體密碼子合成酵素；而天體力學中由牛頓萬有引力導出克卜勒三大定律，支撐現代航太與人造衛星軌道設計。</p>`
      }
    ],
    relatedQuizId: 'paper-senior-physics-bio',
    writingPromptId: null
  }
];

