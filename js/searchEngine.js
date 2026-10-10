// Search Engine for Curated Textbooks, Curriculum Units & Live Web Resources
class SearchEngine {
  constructor() {
    this.currentQuery = '';
    this.currentCategory = 'all';
    this.selectedEdition = 'kangxuan'; // default 康軒版
    this.selectedGrade = 'g7'; // default 國一
    this.selectedSubject = 'all'; // default 全部學科
    this.searchResults = [];
    this.activeMaterial = null;
    this.savedNotes = JSON.parse(localStorage.getItem('omnilearn_saved_materials') || '[]');
  }

  init() {
    this.bindEvents();
    this.renderCurriculumBar();
    this.renderInitialMaterials();
    this.renderPopularChips();
    this.updateBookmarkCount();
  }

  bindEvents() {
    const searchInput = document.getElementById('search-materials-input');
    const searchBtn = document.getElementById('search-materials-btn');
    const categoryFilters = document.querySelectorAll('.cat-filter-btn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentQuery = e.target.value.trim();
        this.performLocalSearch();
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.performFullSearch();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.performFullSearch();
      });
    }

    categoryFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        window.soundEngine.playClick();
        this.performLocalSearch();
      });
    });

    // Close reader modal
    const closeReaderBtn = document.getElementById('close-reader-modal');
    if (closeReaderBtn) {
      closeReaderBtn.addEventListener('click', () => {
        this.closeReader();
      });
    }

    const readerModal = document.getElementById('material-reader-modal');
    if (readerModal) {
      readerModal.addEventListener('click', (e) => {
        if (e.target === readerModal) {
          this.closeReader();
        }
      });
    }
  }

  // Render Taiwan Curriculum Editions & Grade Units Bar
  renderCurriculumBar() {
    const container = document.getElementById('curriculum-quick-navigator');
    if (!container || !window.CURRICULUM_DATA) return;

    const data = window.CURRICULUM_DATA;

    container.innerHTML = `
      <div class="curriculum-panel">
        <div class="curriculum-panel-header">
          <div class="curr-title">
            <span class="curr-badge">📚 課綱版本專區</span>
            <strong>教育部審定教科書（康軒 ✕ 翰林 ✕ 南一）各單元精準複習</strong>
          </div>
          <div class="curr-edition-toggles">
            ${data.editions.map(ed => `
              <button class="edition-toggle-btn ${ed.id === this.selectedEdition ? 'active' : ''}" data-edition="${ed.id}">
                ${ed.icon} ${ed.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="curriculum-grade-row">
          <span class="curr-row-label">選擇年級：</span>
          <div class="grade-pills-wrap">
            ${data.grades.map(g => `
              <button class="grade-pill-btn ${g.id === this.selectedGrade ? 'active' : ''}" data-grade="${g.id}">
                ${g.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="curriculum-subject-row">
          <span class="curr-row-label">選擇科目：</span>
          <div class="subject-pills-wrap">
            <button class="subject-pill-btn ${this.selectedSubject === 'all' ? 'active' : ''}" data-subject="all">
              ✨ 全部學科
            </button>
            ${data.subjects.map(s => `
              <button class="subject-pill-btn ${s.id === this.selectedSubject ? 'active' : ''}" data-subject="${s.id}">
                ${s.icon} ${s.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="curriculum-units-row">
          <span class="curr-row-label">單元速查：</span>
          <div class="curr-units-wrap" id="curr-units-buttons-container"></div>
        </div>
      </div>
    `;

    // Bind edition buttons
    container.querySelectorAll('.edition-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.edition-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedEdition = btn.dataset.edition;
        window.soundEngine.playClick();
        this.renderUnitsButtons();
      });
    });

    // Bind grade buttons
    container.querySelectorAll('.grade-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.grade-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedGrade = btn.dataset.grade;
        window.soundEngine.playClick();
        this.renderUnitsButtons();
      });
    });

    // Bind subject buttons
    container.querySelectorAll('.subject-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.subject-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedSubject = btn.dataset.subject;
        window.soundEngine.playClick();
        this.renderUnitsButtons();
      });
    });

    this.renderUnitsButtons();
  }

  // Master Combo Configurations with Explicit Subjects
  getAllComboConfigs() {
    return [
      // Grade 7 (國一)
      {
        id: 'g7-bio',
        gradeId: 'g7',
        subjectId: 'bio_science',
        subjectName: '國中生物',
        subjectIcon: '🔬',
        label: '⚡ 國一【生物】1-1 到 1-2 生命起源與細胞衝刺包',
        gradeLabel: '國一 (七年級)',
        termLabel: '上學期 1-1 到 1-2 單元',
        paperId: 'paper-g7-bio-ch1',
        title: '國一生物 1-1 到 1-2 生命起源與細胞構造特訓',
        keyTakeaways: [
          {
            header: '💡 1-1 生命的起源與特性 核心速記',
            bullets: [
              '原始大氣：水氣、氨、甲烷、氫氣，<strong>無游離氧氣（O2）</strong>。',
              '生命四大特徵：生長、生殖、感應、代謝。鐘乳石滴水長大不是生命現象（無細胞構造與代謝）。'
            ]
          },
          {
            header: '💡 1-2 細胞構造與功能 核心速記',
            bullets: [
              '粒線體：動植物皆有，細胞的「能量發電廠」，進行呼吸作用產生 ATP。',
              '植物細胞特有：細胞壁（纖維素維持形狀）、葉綠體（綠色組織行光合作用）。',
              '洋蔥表皮細胞無葉綠體，但有細胞壁與細胞核！'
            ]
          }
        ],
        ttsText: '國一生物 1-1 到 1-2 重點：原始大氣沒有氧氣。生命特徵包含代謝、生長、感應與生殖。植物細胞特有細胞壁與葉綠體，但洋蔥表皮細胞沒有葉綠體！'
      },
      {
        id: 'g7-chinese',
        gradeId: 'g7',
        subjectId: 'chinese',
        subjectName: '國中國文',
        subjectIcon: '✍️',
        label: '⚡ 國一【國文】1-1 到 1-2 朱自清《背影》與字體演變衝刺包',
        gradeLabel: '國一 (七年級)',
        termLabel: '上學期 1-1 到 1-2 單元',
        paperId: 'paper-g7-chinese-ch1',
        title: '國一國文 1-1 到 1-2 經典抒情文與語文常識特訓',
        keyTakeaways: [
          {
            header: '💡 1-1 朱自清《背影》以小見大抒情精讀',
            bullets: [
              '主旨：父親穿過鐵道攀爬月台買橘子的蹣跚背影，體現含蓄深沈的父愛。',
              '色彩對照：以橘子的「朱紅」與父親衣服的「黑、深青」呈現強烈視覺焦點。'
            ]
          },
          {
            header: '💡 1-2 標點符號規範與字體演進順序',
            bullets: [
              '標點符號：破折號（——佔兩格，表示語氣轉折或聲音延長）；夾注號（（ ）補充說明）。',
              '漢字演進：甲骨文（商代卜辭）→ 金文（周代鐘鼎）→ 小篆（秦李斯統一天下文字）→ 隸書（漢代，古今文字分水嶺）→ 楷書（魏晉鍾繇，現代標準楷體）。'
            ]
          }
        ],
        ttsText: '國一國文核心重點：朱自清背影以買橘子的蹣跚背影象徵深沉父愛。漢字字體演進順序為甲骨文、金文、小篆、隸書，最後到楷書。'
      },
      {
        id: 'g7-math',
        gradeId: 'g7',
        subjectId: 'math',
        subjectName: '國中數學',
        subjectIcon: '🔢',
        label: '⚡ 國一【數學】1-1 到 1-2 負數數線與四則指數律衝刺包',
        gradeLabel: '國一 (七年級)',
        termLabel: '上學期 1-1 到 1-2 單元',
        paperId: 'paper-g7-math-ch1',
        title: '國一數學 1-1 到 1-2 負數與整數四則運算特訓',
        keyTakeaways: [
          {
            header: '💡 1-1 負數與數線三要素幾何意義',
            bullets: [
              '數線三要素：原點（0）、正向（通常向右為正）、單位長（刻度間距）。',
              '絕對值幾何意義：|a| 代表點 a 與原點 0 的「距離」，恆大於等於 0。'
            ]
          },
          {
            header: '💡 1-2 整數四則運算與指數律易錯陷阱',
            bullets: [
              '乘方陷阱：(-2)^4 = +16（負號在括號內，偶次方為正）；但 -2^4 = -16（先算 2^4 再加負號）。',
              '指數律：a^m · a^n = a^(m+n)；(a^m)^n = a^(m·n)；a^0 = 1 (a≠0)。'
            ]
          }
        ],
        ttsText: '國一數學核心重點：數線三要素為原點、正向、單位長。負負得正。括號負二的四次方是正十六，負的二的四次方是負十六。'
      },

      // Grade 8 (國二)
      {
        id: 'g8-phy',
        gradeId: 'g8',
        subjectId: 'bio_science',
        subjectName: '國二理化',
        subjectIcon: '🔬',
        label: '⚡ 國二【理化】4-2 到 5-1 透鏡成像與熱量計算衝刺包',
        gradeLabel: '國二 (八年級)',
        termLabel: '波動聲音、透鏡成像、熱量計算',
        paperId: 'paper-g8-phy-optics',
        title: '國二理化 4-2 到 5-1 光學與熱學考點大衝刺',
        keyTakeaways: [
          {
            header: '💡 4-2 光的折射與透鏡成像 核心速記',
            bullets: [
              '凸透鏡成像：物在兩倍焦距外 (p > 2f) 成倒立縮小實像（相機）；物在焦點內成正立放大虛像（放大鏡）。',
              '視力矯正：近視眼成像在視網膜前，配戴凹透鏡發散矯正；遠視眼配戴凸透鏡。'
            ]
          },
          {
            header: '💡 5-1 溫度與熱量計算 核心速記',
            bullets: [
              '熱量公式：H = m · s · ΔT（質量 × 比熱 × 溫度變化量）。',
              '熱平衡：不計熱散失時，高溫物體放熱 = 低溫物體吸熱。'
            ]
          }
        ],
        ttsText: '國二理化考點：凸透鏡物在兩倍焦距外成倒立縮小實像。近視眼成像在視網膜前配戴凹透鏡。熱量公式為質量乘比熱乘溫度變化。'
      },
      {
        id: 'g8-math',
        gradeId: 'g8',
        subjectId: 'math',
        subjectName: '國二數學',
        subjectIcon: '🔢',
        label: '⚡ 國二【數學】乘法公式與畢氏定理衝刺包',
        gradeLabel: '國二 (八年級)',
        termLabel: '乘法公式與直角三角形幾何',
        paperId: 'paper-g8-math-pythagoras',
        title: '國二數學 乘法公式與畢氏定理幾何全模組',
        keyTakeaways: [
          {
            header: '💡 乘法公式三大經典公式',
            bullets: [
              '和的平方：(a + b)^2 = a^2 + 2ab + b^2。',
              '平方差公式：(a + b)(a - b) = a^2 - b^2。'
            ]
          },
          {
            header: '💡 畢氏定理幾何本質',
            bullets: [
              '直角三角形兩股平方和等於斜邊平方：a^2 + b^2 = c^2。',
              '常用直角三邊長比例：3:4:5、5:12:13、7:24:25、1:1:√2、1:√3:2。'
            ]
          }
        ],
        ttsText: '國二數學核心重點：平方差公式 a加b 乘 a減b 等於 a平方減b平方。畢氏定理直角兩股平方和等於斜邊平方。'
      },

      // Grade 9 (國三會考)
      {
        id: 'g9-sci',
        gradeId: 'g9',
        subjectId: 'bio_science',
        subjectName: '國三會考自然',
        subjectIcon: '🔬',
        label: '⚡ 國三【會考自然】牛頓運動定律與電學總複習包',
        gradeLabel: '國三 (九年級會考)',
        termLabel: '牛頓運動定律、電路電功率、板塊地科',
        paperId: 'paper-g9-cap-science',
        title: '國三教育會考自然全科衝刺大模組',
        keyTakeaways: [
          {
            header: '💡 力與運動（牛頓定律與 v-t 圖）會考必殺',
            bullets: [
              'v-t 圖斜率等於加速度 a；線下面積等於位移 s！',
              '牛頓第二定律：F_net = m · a；第三定律作用力與反作用力作用在不同物體上，絕不抵消！'
            ]
          },
          {
            header: '💡 電學與地科 會考關鍵考點',
            bullets: [
              '歐姆定律 V = I · R；電功率 P = I · V = I^2 · R。',
              '台灣位於歐亞板塊與菲律賓海板塊的「聚合型板塊邊界」，造山運動劇烈。'
            ]
          }
        ],
        ttsText: '國三會考核心重點：v-t 圖斜率為加速度，面積為位移。合力等於質量乘加速度。台灣位於歐亞與菲律賓海板塊聚合型交界。'
      },
      {
        id: 'g9-math',
        gradeId: 'g9',
        subjectId: 'math',
        subjectName: '國三會考數學',
        subjectIcon: '🔢',
        label: '⚡ 國三【會考數學】幾何相似形與圓周角衝刺包',
        gradeLabel: '國三 (九年級會考)',
        termLabel: '幾何相似形與圓周角定理',
        paperId: 'paper-g9-cap-math',
        title: '國三會考數學 幾何相似與圓形考點衝刺',
        keyTakeaways: [
          {
            header: '💡 相似形性質與面積比',
            bullets: [
              '若兩三角形相似，對應邊長成比例，對應角相等。',
              '面積比等於對應邊長比的「平方比」！體積比等於「立方比」！'
            ]
          },
          {
            header: '💡 圓心角與圓周角關係',
            bullets: [
              '圓心角度數等於所對弧的度數。',
              '圓周角度數等於所對弧度數的「一半」（即圓心角的一半）。'
            ]
          }
        ],
        ttsText: '國三會考數學核心重點：相似形面積比等於邊長平方比。圓周角度數等於圓心角的一半。'
      },

      // Senior (高中學測)
      {
        id: 'senior-sci',
        gradeId: 'senior',
        subjectId: 'bio_science',
        subjectName: '高中學測自然',
        subjectIcon: '🔬',
        label: '⚡ 高中【學測自然】分子生物中心法則與克卜勒跨科衝刺包',
        gradeLabel: '高中 (學測/分科)',
        termLabel: '分子生物學、克卜勒天體力學跨科',
        paperId: 'paper-senior-physics-bio',
        title: '大學學測自然 跨領域素養考點大衝刺',
        keyTakeaways: [
          {
            header: '💡 分子生物學中心法則與克卜勒定律',
            bullets: [
              '中心法則：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質。三聯體密碼子決定胺基酸。',
              '克卜勒第二定律：行星連線在等時間掃過等面積，近日點速率最快、遠日點最慢。'
            ]
          }
        ],
        ttsText: '高中學測自然重點：中心法則為 DNA 轉錄為 mRNA，再轉譯為蛋白質。克卜勒定律近日點速率最快。'
      },
      {
        id: 'senior-math',
        gradeId: 'senior',
        subjectId: 'math',
        subjectName: '高中學測數學',
        subjectIcon: '🔢',
        label: '⚡ 高中【學測數學】多項式餘式定理與對數律衝刺包',
        gradeLabel: '高中 (學測/分科)',
        termLabel: '多項式餘式定理與對數函數',
        paperId: 'paper-senior-math-poly',
        title: '大學學測數學 核心多項式與函數特訓',
        keyTakeaways: [
          {
            header: '💡 高中數學學測核心工具',
            bullets: [
              '餘式定理：多項式 f(x) 除以 (x - c) 的餘式為 f(c)。',
              '對數律：log(ab) = log a + log b；換底公式 log_a b = (log_c b) / (log_c a)。'
            ]
          }
        ],
        ttsText: '高中學測數學重點：餘式定理除以 x 減 c 餘式等於 f of c。對數相乘等於對數相加。'
      }
    ];
  }

  getComboDefinition(comboKey) {
    const all = this.getAllComboConfigs();
    // Direct ID match
    let found = all.find(c => c.id === comboKey);
    if (found) return found;

    // Legacy fallback mapping
    const legacyMap = {
      'g7': 'g7-bio',
      'g8': 'g8-phy',
      'g9': 'g9-sci',
      'senior': 'senior-sci'
    };
    const mappedId = legacyMap[comboKey] || 'g7-bio';
    return all.find(c => c.id === mappedId) || all[0];
  }

  renderUnitsButtons() {
    const container = document.getElementById('curr-units-buttons-container');
    if (!container || !window.CURRICULUM_DATA) return;

    // Filter units by selected grade, edition & subject
    const units = window.CURRICULUM_DATA.units.filter(u => {
      const matchGrade = u.gradeId === this.selectedGrade;
      const matchEdition = u.editions.includes(this.selectedEdition);
      const matchSubject = this.selectedSubject === 'all' || u.subjectId === this.selectedSubject;
      return matchGrade && matchEdition && matchSubject;
    });

    // Subject metadata mapping
    const subjectMetaMap = {
      'bio_science': { label: '自然/生物', icon: '🔬', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
      'chinese': { label: '國文', icon: '✍️', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
      'math': { label: '數學', icon: '🔢', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
      'english': { label: '英文', icon: '🌍', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' }
    };

    // Filter active combos for this grade & subject
    const allCombos = this.getAllComboConfigs();
    const activeCombos = allCombos.filter(c => {
      const matchGrade = c.gradeId === this.selectedGrade;
      const matchSubject = this.selectedSubject === 'all' || c.subjectId === this.selectedSubject;
      return matchGrade && matchSubject;
    });

    if (units.length === 0 && activeCombos.length === 0) {
      container.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">此科目或單元正持續擴充建置中，您可透過上方搜尋框直接輸入教材關鍵字！</span>`;
      return;
    }

    const unitsHtml = units.map(u => {
      const sm = subjectMetaMap[u.subjectId] || { label: '學科', icon: '📚', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' };
      return `
        <button class="unit-chip-btn" data-unit-id="${u.id}" data-quiz-id="${u.quizPaperId || ''}">
          <span class="unit-subject-badge" style="color: ${sm.color}; background: ${sm.bg}; border: 1px solid ${sm.color}40;">
            ${sm.icon} ${sm.label}
          </span>
          <span class="unit-code-badge">${u.unitCode}</span>
          <span class="unit-name-text">${u.unitName}</span>
        </button>
      `;
    }).join('');

    const combosHtml = activeCombos.map(c => `
      <button class="unit-chip-btn special-combo" data-unit-combo="${c.id}">
        ${c.label}
      </button>
    `).join('');

    container.innerHTML = combosHtml + unitsHtml;

    container.querySelectorAll('.unit-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        const combo = btn.dataset.unitCombo;
        if (combo) {
          this.activateUnitComboReview(combo);
          return;
        }

        const unitId = btn.dataset.unitId;
        const unit = window.CURRICULUM_DATA.units.find(u => u.id === unitId);
        if (unit) {
          this.activateUnitReview(unit);
        }
      });
    });
  }

  // Activate combo review with explicit subject and metadata
  activateUnitComboReview(comboKey) {
    const modal = document.getElementById('material-reader-modal');
    const contentBox = document.getElementById('reader-modal-body');
    if (!modal || !contentBox) return;

    const editionName = this.selectedEdition === 'hanlin' ? '翰林版' : (this.selectedEdition === 'nani' ? '南一版' : '康軒版');
    const combo = this.getComboDefinition(comboKey);
    if (!combo) return;

    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-meta-pills">
          <span class="subject-badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981;">
            ${combo.subjectIcon} ${editionName} ${combo.subjectName} 段考特訓
          </span>
          <span class="grade-badge">${combo.gradeLabel} · ${combo.termLabel}</span>
        </div>
        <h2 class="reader-title">${editionName}：${combo.title}</h2>
        <div class="reader-action-toolbar">
          <button id="combo-quiz-btn" class="toolbar-btn primary">
            📝 立即進行 ${combo.subjectName} 專屬測驗 (絕無跨科干擾) ➔
          </button>
          <button id="combo-tts-btn" class="toolbar-btn accent">
            🔊 導師重點語音速記
          </button>
        </div>
      </div>

      ${combo.keyTakeaways.map(sec => `
        <div class="reader-key-takeaways" style="margin-top: 1rem; border-color: rgba(6, 182, 212, 0.4);">
          <div class="takeaways-header" style="color: var(--accent-cyan);">${sec.header}</div>
          <ul class="takeaways-list">
            ${sec.bullets.map(b => `<li><span class="bullet">✔</span> ${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const quizBtn = document.getElementById('combo-quiz-btn');
    if (quizBtn && combo.paperId) {
      quizBtn.onclick = () => {
        this.closeReader();
        if (window.appRouter && window.examEngine) {
          window.examEngine.loadPaperById(combo.paperId, 'practice');
          window.appRouter.navigateTo('quiz');
        }
      };
    }

    const ttsBtn = document.getElementById('combo-tts-btn');
    if (ttsBtn && combo.ttsText) {
      ttsBtn.onclick = () => {
        window.soundEngine.speakText(combo.ttsText);
      };
    }
  }

  activateUnitReview(unit) {
    this.openCurriculumUnitModal(unit);
  }

  openCurriculumUnitModal(unit) {
    const modal = document.getElementById('material-reader-modal');
    const contentBox = document.getElementById('reader-modal-body');
    if (!modal || !contentBox) return;

    const editionName = this.selectedEdition === 'hanlin' ? '翰林版' : (this.selectedEdition === 'nani' ? '南一版' : '康軒版');
    const gradeBadgeMap = {
      'g7': '國一 (七年級)',
      'g8': '國二 (八年級)',
      'g9': '國三 (九年級會考)',
      'senior': '高中 (學測/分科)'
    };
    const gradeLabel = gradeBadgeMap[unit.gradeId || this.selectedGrade] || '全年級通用';

    const subjectMetaMap = {
      'bio_science': { label: '自然/生物', icon: '🔬', color: '#10b981' },
      'chinese': { label: '國文', icon: '✍️', color: '#ec4899' },
      'math': { label: '數學', icon: '🔢', color: '#3b82f6' },
      'english': { label: '英文', icon: '🌍', color: '#8b5cf6' }
    };
    const sMeta = subjectMetaMap[unit.subjectId] || { label: '學科專項', icon: '📚', color: '#6366f1' };

    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-meta-pills">
          <span class="subject-badge" style="background: ${sMeta.color}22; border-color: ${sMeta.color}; color: ${sMeta.color};">
            ${sMeta.icon} ${sMeta.label} · ${editionName} ${unit.unitCode}
          </span>
          <span class="grade-badge">${gradeLabel} · ${unit.term || '精選單元'}</span>
        </div>
        <h2 class="reader-title">${editionName}【${sMeta.label}】：${unit.unitName}</h2>
        <div class="reader-action-toolbar">
          ${unit.quizPaperId ? `
            <button id="curr-unit-quiz-btn" class="toolbar-btn primary">
              📝 立即測驗此單元 (${sMeta.label} ${unit.unitCode} 專項)
            </button>
          ` : ''}
          <button id="curr-unit-tts-btn" class="toolbar-btn accent">
            🔊 聽導師複習重點
          </button>
        </div>
      </div>

      <div class="reader-key-takeaways">
        <div class="takeaways-header">💡 本單元核心考點與會考/大考避坑指南</div>
        <ul class="takeaways-list">
          ${unit.keyPoints.map(kp => `<li><span class="bullet">✔</span> ${kp}</li>`).join('')}
        </ul>
      </div>

      <div class="reader-section">
        <h3 class="section-h3">章節概要</h3>
        <p class="section-body">${unit.description}</p>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const quizBtn = document.getElementById('curr-unit-quiz-btn');
    if (quizBtn && unit.quizPaperId) {
      quizBtn.addEventListener('click', () => {
        this.closeReader();
        if (window.appRouter && window.examEngine) {
          window.examEngine.loadPaperById(unit.quizPaperId, 'practice');
          window.appRouter.navigateTo('quiz');
        }
      });
    }

    const ttsBtn = document.getElementById('curr-unit-tts-btn');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        const text = `【${sMeta.label}】${unit.unitName}。核心考點：${unit.keyPoints.join('。')}`;
        window.soundEngine.speakText(text);
      });
    }
  }

  renderPopularChips() {
    const container = document.getElementById('popular-search-tags');
    if (!container) return;

    const chips = [
      '光合作用', '國一 1-1 到 1-2', '國二理化透鏡', '國二畢氏定理',
      '國三會考力學', '高中分子生物', '康軒版', '翰林版', '南一版'
    ];

    container.innerHTML = chips.map(chip => `
      <button class="popular-chip-btn" data-query="${chip}">
        <span class="chip-spark">✦</span> ${chip}
      </button>
    `).join('');

    container.querySelectorAll('.popular-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        const searchInput = document.getElementById('search-materials-input');
        if (searchInput) {
          searchInput.value = query;
          this.currentQuery = query;
          this.performFullSearch();
        }
      });
    });
  }

  performLocalSearch() {
    const q = this.currentQuery.toLowerCase();
    const cat = this.currentCategory;

    let filtered = window.MATERIALS_DATA.filter(item => {
      const matchCat = (cat === 'all' || item.category === cat);
      if (!matchCat) return false;

      if (!q) return true;
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      const matchSubject = item.subject.toLowerCase().includes(q);
      const matchEdition = (item.editionTag || '').toLowerCase().includes(q);
      return matchTitle || matchSummary || matchTags || matchSubject || matchEdition;
    });

    this.renderResults(filtered, false);
  }

  async performFullSearch() {
    window.soundEngine.playClick();
    this.performLocalSearch();

    if (!this.currentQuery) return;

    // Special AI Intent Check: If query is related to 1-1, 1-2, or 光合作用
    if (this.currentQuery.includes('1-1') && this.currentQuery.includes('1-2')) {
      if (window.showAppToast) {
        window.showAppToast('🎯 已為您精準定位：國一 1-1 到 1-2 段考特訓教材！');
      }
    } else if (this.currentQuery.includes('光合作用')) {
      if (window.showAppToast) {
        window.showAppToast('🌿 已為您鎖定生物「光合作用」專屬考點與測驗！');
      }
    }

    // Trigger Live Web Search
    const liveContainer = document.getElementById('live-web-results-container');
    const liveStatus = document.getElementById('live-web-status');
    if (liveContainer && liveStatus) {
      liveContainer.style.display = 'block';
      liveStatus.innerHTML = `
        <div class="loading-pulse">
          <span class="pulse-dot"></span>
          正在全網搜尋「<strong>${this.escapeHtml(this.currentQuery)}</strong>」之開源教材與知識點庫...
        </div>
      `;
    }

    try {
      let webResults = [];
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(this.currentQuery)}`);
        if (res.ok) {
          const data = await res.json();
          webResults = data.results || [];
        }
      } catch (err) {
        const wikiUrl = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(this.currentQuery)}&format=json&origin=*&srlimit=6`;
        const wikiRes = await fetch(wikiUrl);
        const wikiData = await wikiRes.json();
        if (wikiData.query && wikiData.query.search) {
          webResults = wikiData.query.search.map(item => ({
            id: 'web-' + item.pageid,
            title: item.title,
            snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
            source: '網路開源教材庫 (Wikipedia & OER)',
            url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
          }));
        }
      }

      this.renderWebResults(webResults);
    } catch (e) {
      if (liveStatus) {
        liveStatus.innerHTML = `<span class="search-error">⚠️ 網路連線狀態限制，已為您呈現在地精選教材。</span>`;
      }
    }
  }

  renderResults(materials, isAppended) {
    const container = document.getElementById('curated-materials-grid');
    const countBadge = document.getElementById('results-count-badge');
    if (!container) return;

    if (countBadge) {
      countBadge.textContent = `精選教材 (${materials.length})`;
    }

    if (materials.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-icon">🔍</div>
          <h3>暫無符合的在地教材</h3>
          <p>您可點擊上方「課綱版本專區」選擇康軒/翰林單元，或查看下方「全網即時教材檢索」結果！</p>
        </div>
      `;
      return;
    }

    container.innerHTML = materials.map(item => {
      const isBookmarked = this.savedNotes.some(n => n.id === item.id);
      return `
        <div class="material-card" data-id="${item.id}">
          <div class="mat-card-header">
            <span class="subject-badge">${item.subjectIcon} ${item.subject}</span>
            <span class="grade-badge">${item.grade}</span>
            <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" data-id="${item.id}" title="收藏至學習筆記">
              ${isBookmarked ? '★' : '☆'}
            </button>
          </div>
          ${item.editionTag ? `<div class="edition-tag-pill">🏷️ ${item.editionTag}</div>` : ''}
          <h3 class="mat-card-title">${item.title}</h3>
          <p class="mat-card-summary">${item.summary}</p>
          
          <div class="mat-card-meta">
            <span>⏱️ 研讀 ${item.readTime}</span>
            <span>⭐ ${item.rating}</span>
            <span>👀 ${item.views.toLocaleString()}</span>
          </div>

          <div class="mat-card-tags">
            ${item.tags.map(t => `<span class="mat-tag">#${t}</span>`).join('')}
          </div>

          <div class="mat-card-footer">
            <button class="primary-read-btn" data-id="${item.id}">
              <span>開啟深度研讀</span> →
            </button>
            ${item.relatedQuizId ? `<button class="card-quiz-link-btn" data-quiz-id="${item.relatedQuizId}" title="測驗本篇知識點 (精準題目)">📝 考考我</button>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Bind Read & Bookmark buttons
    container.querySelectorAll('.primary-read-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.openReader(id);
      });
    });

    container.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        this.toggleBookmark(id, btn);
      });
    });

    container.querySelectorAll('.card-quiz-link-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const quizId = btn.dataset.quizId;
        window.soundEngine.playClick();
        if (window.appRouter && window.examEngine) {
          window.examEngine.loadPaperById(quizId, 'practice');
          window.appRouter.navigateTo('quiz');
        }
      });
    });
  }

  renderWebResults(webResults) {
    const liveContainer = document.getElementById('live-web-results-container');
    const liveStatus = document.getElementById('live-web-status');
    const webGrid = document.getElementById('live-web-grid');
    if (!liveContainer || !webGrid) return;

    if (!webResults || webResults.length === 0) {
      if (liveStatus) {
        liveStatus.innerHTML = `<span>未搜尋到相關網路開源條目，歡迎換個更具體的學科關鍵字搜尋！</span>`;
      }
      webGrid.innerHTML = '';
      return;
    }

    if (liveStatus) {
      liveStatus.innerHTML = `
        <div class="success-status-tag">
          🌐 成功自網路檢索到 <strong>${webResults.length}</strong> 筆即時教材資源
        </div>
      `;
    }

    webGrid.innerHTML = webResults.map(res => `
      <div class="web-result-card">
        <div class="web-card-top">
          <span class="web-source-badge">🌐 ${res.source}</span>
          <a href="${res.url}" target="_blank" rel="noopener" class="web-external-link" title="在瀏覽器開啟原始頁面">外部來源 ↗</a>
        </div>
        <h4 class="web-card-title">${res.title}</h4>
        <p class="web-card-snippet">${res.snippet}...</p>
        <div class="web-card-actions">
          <button class="web-study-btn" data-title="${this.escapeHtml(res.title)}" data-snippet="${this.escapeHtml(res.snippet)}" data-url="${res.url}">
            📖 導入智學機研讀
          </button>
          <button class="web-make-quiz-btn" data-title="${this.escapeHtml(res.title)}" data-snippet="${this.escapeHtml(res.snippet)}">
            ⚡ 專屬精準測驗
          </button>
        </div>
      </div>
    `).join('');

    webGrid.querySelectorAll('.web-study-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        const snippet = btn.dataset.snippet;
        const url = btn.dataset.url;
        this.openWebReader(title, snippet, url);
      });
    });

    webGrid.querySelectorAll('.web-make-quiz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.dataset.title;
        const snippet = btn.dataset.snippet;
        window.soundEngine.playCorrect();
        if (window.examEngine && window.appRouter) {
          window.examEngine.generateDynamicQuizFromTopic(title, snippet);
          window.appRouter.navigateTo('quiz');
        }
      });
    });
  }

  openReader(materialId) {
    const item = window.MATERIALS_DATA.find(m => m.id === materialId);
    if (!item) return;

    this.activeMaterial = item;
    window.soundEngine.playClick();

    const modal = document.getElementById('material-reader-modal');
    const contentBox = document.getElementById('reader-modal-body');
    if (!modal || !contentBox) return;

    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-meta-pills">
          <span class="subject-badge">${item.subjectIcon} ${item.subject}</span>
          <span class="grade-badge">${item.grade}</span>
          <span class="diff-badge">${item.difficulty}</span>
          <span class="read-time-badge">⏱️ ${item.readTime}</span>
        </div>
        <h2 class="reader-title">${item.title}</h2>
        <div class="reader-action-toolbar">
          <button id="tts-read-btn" class="toolbar-btn primary">
            <span class="tts-icon">🔊</span> <span id="tts-btn-text">AI 導師語音伴讀</span>
          </button>
          ${item.relatedQuizId ? `
            <button id="reader-quiz-btn" class="toolbar-btn accent">
              📝 立即測驗此教材 (精準題目)
            </button>
          ` : ''}
          ${item.writingPromptId ? `
            <button id="reader-write-btn" class="toolbar-btn success">
              ✍️ 前往關聯寫作特訓
            </button>
          ` : ''}
          <button id="reader-save-btn" class="toolbar-btn">
            ★ 收藏精華筆記
          </button>
        </div>
      </div>

      <div class="reader-key-takeaways">
        <div class="takeaways-header">💡 本章核心考點與思維導圖</div>
        <ul class="takeaways-list">
          ${item.keyTakeaways.map(t => `<li><span class="bullet">✔</span> ${t}</li>`).join('')}
        </ul>
      </div>

      <div class="reader-sections-container">
        ${item.sections.map(sec => `
          <div class="reader-section">
            <h3 class="section-h3">${sec.heading}</h3>
            <div class="section-body">${sec.content}</div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Bind reader events
    const ttsBtn = document.getElementById('tts-read-btn');
    const ttsText = document.getElementById('tts-btn-text');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        if (window.soundEngine.isSpeaking) {
          window.soundEngine.stopSpeaking();
          ttsText.textContent = 'AI 導師語音伴讀';
          ttsBtn.classList.remove('speaking');
        } else {
          const textToSpeak = `${item.title}。${item.summary}。核心要點：${item.keyTakeaways.join('。')}`;
          ttsText.textContent = '停止朗讀';
          ttsBtn.classList.add('speaking');
          window.soundEngine.speakText(textToSpeak, () => {
            ttsText.textContent = 'AI 導師語音伴讀';
            ttsBtn.classList.remove('speaking');
          });
        }
      });
    }

    const quizBtn = document.getElementById('reader-quiz-btn');
    if (quizBtn && item.relatedQuizId) {
      quizBtn.addEventListener('click', () => {
        this.closeReader();
        if (window.appRouter && window.examEngine) {
          window.examEngine.loadPaperById(item.relatedQuizId, 'practice');
          window.appRouter.navigateTo('quiz');
        }
      });
    }

    const writeBtn = document.getElementById('reader-write-btn');
    if (writeBtn && item.writingPromptId) {
      writeBtn.addEventListener('click', () => {
        this.closeReader();
        if (window.appRouter && window.writingCoach) {
          window.writingCoach.selectPromptById(item.writingPromptId);
          window.appRouter.navigateTo('writing');
        }
      });
    }

    const saveBtn = document.getElementById('reader-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.toggleBookmark(item.id);
        saveBtn.textContent = '✔ 已收藏至筆記';
      });
    }
  }

  openWebReader(title, snippet, url) {
    window.soundEngine.playClick();
    const modal = document.getElementById('material-reader-modal');
    const contentBox = document.getElementById('reader-modal-body');
    if (!modal || !contentBox) return;

    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-meta-pills">
          <span class="subject-badge">🌐 網路開源教材條目</span>
          <span class="grade-badge">開放式教育資源</span>
        </div>
        <h2 class="reader-title">${this.escapeHtml(title)}</h2>
        <div class="reader-action-toolbar">
          <button id="tts-web-read-btn" class="toolbar-btn primary">
            🔊 AI 導師語音朗讀
          </button>
          <button id="web-quiz-direct-btn" class="toolbar-btn accent">
            ⚡ 針對此條目一鍵組卷測驗
          </button>
          <a href="${url}" target="_blank" rel="noopener" class="toolbar-btn">
            ↗ 前往原始維基百科完整頁面
          </a>
        </div>
      </div>

      <div class="web-article-full-box">
        <div class="web-box-callout">
          <strong>💡 智學機網路教材摘要：</strong>
          <p>${this.escapeHtml(snippet)}</p>
        </div>
        <div class="web-study-guide">
          <h4>📖 導師研讀思考題：</h4>
          <ol>
            <li>請用自己的話，向沒有學過「${this.escapeHtml(title)}」的同學用兩句話解釋其核心定義。</li>
            <li>在現代社會或科學應用中，這項概念通常出現在哪種場景？</li>
          </ol>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const ttsBtn = document.getElementById('tts-web-read-btn');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        if (window.soundEngine.isSpeaking) {
          window.soundEngine.stopSpeaking();
          ttsBtn.textContent = '🔊 AI 導師語音朗讀';
        } else {
          ttsBtn.textContent = '⏹️ 停止朗讀';
          window.soundEngine.speakText(`${title}。${snippet}`, () => {
            ttsBtn.textContent = '🔊 AI 導師語音朗讀';
          });
        }
      });
    }

    const quizBtn = document.getElementById('web-quiz-direct-btn');
    if (quizBtn) {
      quizBtn.addEventListener('click', () => {
        this.closeReader();
        if (window.appRouter && window.examEngine) {
          window.examEngine.generateDynamicQuizFromTopic(title, snippet);
          window.appRouter.navigateTo('quiz');
        }
      });
    }
  }

  closeReader() {
    window.soundEngine.stopSpeaking();
    const modal = document.getElementById('material-reader-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  toggleBookmark(materialId, btnEl) {
    const index = this.savedNotes.findIndex(n => n.id === materialId);
    if (index > -1) {
      this.savedNotes.splice(index, 1);
      if (btnEl) {
        btnEl.classList.remove('active');
        btnEl.textContent = '☆';
      }
    } else {
      const item = window.MATERIALS_DATA.find(m => m.id === materialId);
      if (item) {
        this.savedNotes.push(item);
        if (btnEl) {
          btnEl.classList.add('active');
          btnEl.textContent = '★';
        }
        window.soundEngine.playCorrect();
      }
    }
    localStorage.setItem('omnilearn_saved_materials', JSON.stringify(this.savedNotes));
    this.updateBookmarkCount();
  }

  updateBookmarkCount() {
    const badge = document.getElementById('bookmarks-count-pill');
    if (badge) {
      badge.textContent = `${this.savedNotes.length} 篇筆記`;
    }
  }

  renderInitialMaterials() {
    this.renderResults(window.MATERIALS_DATA, false);
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }
}

window.searchEngine = new SearchEngine();
