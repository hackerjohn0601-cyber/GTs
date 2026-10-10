// Search Engine for Curated Textbooks, Curriculum Units & Live Web Resources
class SearchEngine {
  constructor() {
    this.currentQuery = '';
    this.currentCategory = 'all';
    this.selectedEdition = 'kangxuan'; // default 康軒版
    this.selectedGrade = 'g7'; // default 國一
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

    this.renderUnitsButtons();
  }

  renderUnitsButtons() {
    const container = document.getElementById('curr-units-buttons-container');
    if (!container || !window.CURRICULUM_DATA) return;

    // Filter units by selected grade & edition
    const units = window.CURRICULUM_DATA.units.filter(u => {
      const matchGrade = u.gradeId === this.selectedGrade;
      const matchEdition = u.editions.includes(this.selectedEdition);
      return matchGrade && matchEdition;
    });

    if (units.length === 0) {
      container.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">本年級更多版本章節持續擴充建置中，您可透過上方搜尋框直接輸入單元關鍵字！</span>`;
      return;
    }

    const comboConfigs = {
      'g7': { label: '⚡ 國一 1-1 到 1-2 整合衝刺包', tag: 'g7' },
      'g8': { label: '⚡ 國二理化光學與熱學衝刺包', tag: 'g8' },
      'g9': { label: '⚡ 國三會考力學與電學總複習包', tag: 'g9' },
      'senior': { label: '⚡ 高中學測跨科素養衝刺包', tag: 'senior' }
    };
    const currentCombo = comboConfigs[this.selectedGrade] || comboConfigs['g7'];

    container.innerHTML = units.map(u => `
      <button class="unit-chip-btn" data-unit-id="${u.id}" data-quiz-id="${u.quizPaperId || ''}">
        <span class="unit-code-badge">${u.unitCode}</span>
        <span class="unit-name-text">${u.unitName}</span>
      </button>
    `).join('') + `
      <button class="unit-chip-btn special-combo" data-unit-combo="${currentCombo.tag}">
        ${currentCombo.label}
      </button>
    `;

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

  // Activate combo review by Grade
  activateUnitComboReview(gradeKey) {
    const modal = document.getElementById('material-reader-modal');
    const contentBox = document.getElementById('reader-modal-body');
    if (!modal || !contentBox) return;

    const editionName = this.selectedEdition === 'hanlin' ? '翰林版' : (this.selectedEdition === 'nani' ? '南一版' : '康軒版');

    if (gradeKey === 'g8') {
      contentBox.innerHTML = `
        <div class="reader-header">
          <div class="reader-meta-pills">
            <span class="subject-badge">🎯 ${editionName} 國二理化段考特訓</span>
            <span class="grade-badge">國二八年級（波動聲音、透鏡成像、熱量）</span>
          </div>
          <h2 class="reader-title">${editionName} 國二理化核心考點大衝刺</h2>
          <div class="reader-action-toolbar">
            <button id="combo-quiz-btn" class="toolbar-btn primary">
              📝 立即進行國二理化專屬測驗 ➔
            </button>
            <button id="combo-tts-btn" class="toolbar-btn accent">
              🔊 導師重點語音速記
            </button>
          </div>
        </div>
        <div class="reader-key-takeaways">
          <div class="takeaways-header">💡 4-2 光的折射與透鏡成像 核心速記</div>
          <ul class="takeaways-list">
            <li><span class="bullet">✔</span> 凸透鏡：物在兩倍焦距外 (p > 2f) 成倒立縮小實像（相機）；物在一到兩倍焦距間成倒立放大實像（投影機）；物在焦點內成正立放大虛像（放大鏡）。</li>
            <li><span class="bullet">✔</span> 近視眼：成像於視網膜前，配戴「凹透鏡（發散光線）」矯正；遠視配戴凸透鏡。</li>
          </ul>
        </div>
        <div class="reader-key-takeaways" style="margin-top: 1rem; border-color: rgba(6, 182, 212, 0.4);">
          <div class="takeaways-header" style="color: var(--accent-cyan);">💡 5-1 溫度與熱量計算 核心速記</div>
          <ul class="takeaways-list">
            <li><span class="bullet">✔</span> 熱量公式：H = m · s · ΔT（質量 × 比熱 × 溫度變化量）。</li>
            <li><span class="bullet">✔</span> 熱平衡：高溫物體放熱 = 低溫物體吸熱。水的比熱大（s=1），常作為冷卻劑。</li>
          </ul>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const quizBtn = document.getElementById('combo-quiz-btn');
      if (quizBtn) {
        quizBtn.onclick = () => {
          this.closeReader();
          if (window.appRouter && window.examEngine) {
            window.examEngine.loadPaperById('paper-g8-phy-optics', 'practice');
            window.appRouter.navigateTo('quiz');
          }
        };
      }
      const ttsBtn = document.getElementById('combo-tts-btn');
      if (ttsBtn) {
        ttsBtn.onclick = () => {
          window.soundEngine.speakText('國二理化考點：凸透鏡物在兩倍焦距外成倒立縮小實像。近視眼成像在視網膜前，配戴凹透鏡發散矯正。熱量公式為質量乘比熱乘溫度變化。');
        };
      }
      return;
    }

    if (gradeKey === 'g9') {
      contentBox.innerHTML = `
        <div class="reader-header">
          <div class="reader-meta-pills">
            <span class="subject-badge">🎯 ${editionName} 國三會考自然 A++ 衝刺</span>
            <span class="grade-badge">九年級會考（牛頓運動定律、電路電功率、板塊地科）</span>
          </div>
          <h2 class="reader-title">${editionName} 國三教育會考自然全科衝刺大模組</h2>
          <div class="reader-action-toolbar">
            <button id="combo-quiz-btn" class="toolbar-btn primary">
              📝 立即進行國三會考自然全真測驗 ➔
            </button>
            <button id="combo-tts-btn" class="toolbar-btn accent">
              🔊 導師重點語音速記
            </button>
          </div>
        </div>
        <div class="reader-key-takeaways">
          <div class="takeaways-header">💡 力與運動（牛頓定律與 v-t 圖）會考必殺</div>
          <ul class="takeaways-list">
            <li><span class="bullet">✔</span> v-t 圖斜率等於加速度 a；線下與時間軸圍成的面積等於位移 s！</li>
            <li><span class="bullet">✔</span> 牛頓第二定律：F_net = m · a；第三定律：作用力與反作用力作用在不同物體上，絕不可抵消！</li>
          </ul>
        </div>
        <div class="reader-key-takeaways" style="margin-top: 1rem; border-color: rgba(6, 182, 212, 0.4);">
          <div class="takeaways-header" style="color: var(--accent-cyan);">💡 電學與地科 會考關鍵考點</div>
          <ul class="takeaways-list">
            <li><span class="bullet">✔</span> 歐姆定律 V = I · R；電功率 P = I · V = I^2 · R；1 度電 = 1000 瓦 × 1 小時。</li>
            <li><span class="bullet">✔</span> 台灣位於菲律賓海板塊與歐亞板塊的「聚合型板塊交界」，持續擠壓碰撞造成造山運動與地震。</li>
          </ul>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const quizBtn = document.getElementById('combo-quiz-btn');
      if (quizBtn) {
        quizBtn.onclick = () => {
          this.closeReader();
          if (window.appRouter && window.examEngine) {
            window.examEngine.loadPaperById('paper-g9-cap-science', 'practice');
            window.appRouter.navigateTo('quiz');
          }
        };
      }
      const ttsBtn = document.getElementById('combo-tts-btn');
      if (ttsBtn) {
        ttsBtn.onclick = () => {
          window.soundEngine.speakText('國三會考核心重點：v-t 圖斜率為加速度，面積為位移。牛頓第二定律合力等於質量乘加速度。台灣位於歐亞與菲律賓海板塊聚合型交界。');
        };
      }
      return;
    }

    if (gradeKey === 'senior') {
      contentBox.innerHTML = `
        <div class="reader-header">
          <div class="reader-meta-pills">
            <span class="subject-badge">🎯 高中學測跨領域素養特訓</span>
            <span class="grade-badge">高一至高三（分子生物學、克卜勒天體力學、多項式）</span>
          </div>
          <h2 class="reader-title">大學學測自然與數學核心考點全精華</h2>
          <div class="reader-action-toolbar">
            <button id="combo-quiz-btn" class="toolbar-btn primary">
              📝 立即進行高中學測自然素養卷 ➔
            </button>
            <button id="combo-tts-btn" class="toolbar-btn accent">
              🔊 導師重點語音速記
            </button>
          </div>
        </div>
        <div class="reader-key-takeaways">
          <div class="takeaways-header">💡 分子生物學中心法則與克卜勒定律</div>
          <ul class="takeaways-list">
            <li><span class="bullet">✔</span> 中心法則：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質。三聯體密碼子決定胺基酸。</li>
            <li><span class="bullet">✔</span> 克卜勒第二定律：近日點距離小速率最大、遠日點距離大速率最小。第三定律：T^2 / R^3 = 常數。</li>
          </ul>
        </div>
        <div class="reader-key-takeaways" style="margin-top: 1rem; border-color: rgba(6, 182, 212, 0.4);">
          <div class="takeaways-header" style="color: var(--accent-cyan);">💡 高中數學學測核心工具</div>
          <ul class="takeaways-list">
            <li><span class="bullet">✔</span> 餘式定理：多項式 f(x) 除以 (x - c) 的餘式為 f(c)。</li>
            <li><span class="bullet">✔</span> 對數律：log(ab) = log a + log b；換底公式 log_a b = (log_c b) / (log_c a)。</li>
          </ul>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const quizBtn = document.getElementById('combo-quiz-btn');
      if (quizBtn) {
        quizBtn.onclick = () => {
          this.closeReader();
          if (window.appRouter && window.examEngine) {
            window.examEngine.loadPaperById('paper-senior-physics-bio', 'practice');
            window.appRouter.navigateTo('quiz');
          }
        };
      }
      const ttsBtn = document.getElementById('combo-tts-btn');
      if (ttsBtn) {
        ttsBtn.onclick = () => {
          window.soundEngine.speakText('高中學測考點：中心法則為 DNA 轉錄為信使 RNA，再轉譯為蛋白質。克卜勒第二定律近日點速率最快。餘式定理除以 x 減 c 餘式等於 f of c。');
        };
      }
      return;
    }

    // Default Grade 7 (國一)
    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-meta-pills">
          <span class="subject-badge">🎯 ${editionName} 國一第一次段考特訓</span>
          <span class="grade-badge">國一上學期 1-1 到 1-2 單元</span>
        </div>
        <h2 class="reader-title">${editionName} 國一 1-1 到 1-2 段考高頻考點大彙整</h2>
        <div class="reader-action-toolbar">
          <button id="combo-quiz-btn" class="toolbar-btn primary">
            📝 立即進行 1-1 到 1-2 專屬測驗 (絕無跨科干擾題)
          </button>
          <button id="combo-tts-btn" class="toolbar-btn accent">
            🔊 導師重點語音速記
          </button>
        </div>
      </div>

      <div class="reader-key-takeaways">
        <div class="takeaways-header">💡 1-1 生命的起源與特性 核心速記</div>
        <ul class="takeaways-list">
          <li><span class="bullet">✔</span> 原始大氣：水氣、氨、甲烷、氫氣，<strong>無氧氣（O2）</strong>。</li>
          <li><span class="bullet">✔</span> 生命四大特徵：生長、生殖、感應、代謝。鐘乳石長大不是生命現象。</li>
        </ul>
      </div>

      <div class="reader-key-takeaways" style="margin-top: 1rem; border-color: rgba(6, 182, 212, 0.4);">
        <div class="takeaways-header" style="color: var(--accent-cyan);">💡 1-2 細胞構造與功能 核心速記</div>
        <ul class="takeaways-list">
          <li><span class="bullet">✔</span> 粒線體：動植物皆有，呼吸作用能量發電廠（ATP）。</li>
          <li><span class="bullet">✔</span> 植物細胞特有：細胞壁（纖維素保護）、葉綠體（綠色組織光合作用）。</li>
          <li><span class="bullet">✔</span> 洋蔥表皮細胞無葉綠體，但有細胞壁與細胞核！</li>
        </ul>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const quizBtn = document.getElementById('combo-quiz-btn');
    if (quizBtn) {
      quizBtn.onclick = () => {
        this.closeReader();
        if (window.appRouter && window.examEngine) {
          window.examEngine.loadPaperById('paper-g7-bio-ch1', 'practice');
          window.appRouter.navigateTo('quiz');
        }
      };
    }

    const ttsBtn = document.getElementById('combo-tts-btn');
    if (ttsBtn) {
      ttsBtn.onclick = () => {
        const text = `國一 1-1 到 1-2 核心重點：第一，原始大氣沒有氧氣。第二，生命特徵包含生長、生殖、感應、代謝。第三，植物細胞特有細胞壁與葉綠體，但洋蔥表皮細胞沒有葉綠體！`;
        window.soundEngine.speakText(text);
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

    contentBox.innerHTML = `
      <div class="reader-header">
        <div class="reader-meta-pills">
          <span class="subject-badge">📚 ${editionName} ${unit.unitCode}</span>
          <span class="grade-badge">${gradeLabel} · ${unit.term || '精選單元'}</span>
        </div>
        <h2 class="reader-title">${editionName}：${unit.unitName}</h2>
        <div class="reader-action-toolbar">
          ${unit.quizPaperId ? `
            <button id="curr-unit-quiz-btn" class="toolbar-btn primary">
              📝 立即測驗此單元 (${unit.unitCode} 專項)
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
        const text = `${unit.unitName}。核心考點：${unit.keyPoints.join('。')}`;
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
