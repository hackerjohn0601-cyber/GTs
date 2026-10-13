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

    // Close curriculum comparison matrix modal
    const closeMatrixBtn = document.getElementById('close-matrix-modal');
    if (closeMatrixBtn) {
      closeMatrixBtn.addEventListener('click', () => {
        this.closeCurriculumMatrixModal();
      });
    }

    const matrixModal = document.getElementById('curriculum-matrix-modal');
    if (matrixModal) {
      matrixModal.addEventListener('click', (e) => {
        if (e.target === matrixModal) {
          this.closeCurriculumMatrixModal();
        }
      });
    }
  }

  // Render Taiwan Curriculum Editions & Grade Units Bar (Two-Column Master-Detail Layout)
  renderCurriculumBar() {
    const container = document.getElementById('curriculum-quick-navigator');
    if (!container || !window.CURRICULUM_DATA) return;

    const data = window.CURRICULUM_DATA;

    // Helper to get grade metadata
    const getGradeMeta = (gId) => {
      const g = data.grades.find(x => x.id === gId);
      return g || { name: gId, icon: '📚', badge: '' };
    };

    container.innerHTML = `
      <div class="curriculum-workspace-layout">
        <!-- LEFT SIDEBAR: Grade & Subject Hierarchy Navigation -->
        <aside class="curr-sidebar" id="curr-sidebar">
          <div class="curr-sidebar-header">
            <span class="curr-sidebar-icon">🎓</span>
            <div>
              <h4 class="curr-sidebar-title">年級與科目導覽</h4>
              <p class="curr-sidebar-sub">左側選年級 ➔ 點入選科目 ➔ 選擇單元</p>
            </div>
          </div>

          <!-- JUNIOR HIGH (國中階段: 國一 ~ 國三) -->
          <div class="curr-grade-group">
            <div class="curr-group-label">
              <span>🏫 國中階段 (7 ~ 9 年級)</span>
            </div>
            <div class="curr-grade-items">
              <!-- 國一 -->
              <div class="curr-grade-card ${this.selectedGrade === 'g7' ? 'active' : ''}" data-grade="g7">
                <div class="curr-grade-header">
                  <span class="curr-grade-icon">🌱</span>
                  <div class="curr-grade-info">
                    <span class="curr-grade-name">國一 (七年級)</span>
                    <span class="curr-grade-tag">45 個精選單元 · 七上/七下</span>
                  </div>
                  <span class="curr-chevron">▶</span>
                </div>
                <div class="curr-subject-submenu">
                  <button class="curr-sub-item ${this.selectedSubject === 'all' && this.selectedGrade === 'g7' ? 'active' : ''}" data-subject="all">
                    <span>✨ 全部科目</span>
                    <span class="sub-count">45</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'bio_science' && this.selectedGrade === 'g7' ? 'active' : ''}" data-subject="bio_science">
                    <span>🔬 自然與生物</span>
                    <span class="sub-count">24</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'chinese' && this.selectedGrade === 'g7' ? 'active' : ''}" data-subject="chinese">
                    <span>✍️ 國語文</span>
                    <span class="sub-count">12</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'math' && this.selectedGrade === 'g7' ? 'active' : ''}" data-subject="math">
                    <span>🔢 數學邏輯</span>
                    <span class="sub-count">8</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'english' && this.selectedGrade === 'g7' ? 'active' : ''}" data-subject="english">
                    <span>🌍 英語文</span>
                    <span class="sub-count">1</span>
                  </button>
                </div>
              </div>

              <!-- 國二 -->
              <div class="curr-grade-card ${this.selectedGrade === 'g8' ? 'active' : ''}" data-grade="g8">
                <div class="curr-grade-header">
                  <span class="curr-grade-icon">🌿</span>
                  <div class="curr-grade-info">
                    <span class="curr-grade-name">國二 (八年級)</span>
                    <span class="curr-grade-tag">理化光學 · 畢氏定理</span>
                  </div>
                  <span class="curr-chevron">▶</span>
                </div>
                <div class="curr-subject-submenu">
                  <button class="curr-sub-item ${this.selectedSubject === 'all' && this.selectedGrade === 'g8' ? 'active' : ''}" data-subject="all">
                    <span>✨ 全部科目</span>
                    <span class="sub-count">6</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'bio_science' && this.selectedGrade === 'g8' ? 'active' : ''}" data-subject="bio_science">
                    <span>🔬 自然與理化</span>
                    <span class="sub-count">3</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'math' && this.selectedGrade === 'g8' ? 'active' : ''}" data-subject="math">
                    <span>🔢 數學幾何</span>
                    <span class="sub-count">3</span>
                  </button>
                </div>
              </div>

              <!-- 國三 -->
              <div class="curr-grade-card ${this.selectedGrade === 'g9' ? 'active' : ''}" data-grade="g9">
                <div class="curr-grade-header">
                  <span class="curr-grade-icon">🎯</span>
                  <div class="curr-grade-info">
                    <span class="curr-grade-name">國三 (九年級會考)</span>
                    <span class="curr-grade-tag">會考 A++ 整合衝刺</span>
                  </div>
                  <span class="curr-chevron">▶</span>
                </div>
                <div class="curr-subject-submenu">
                  <button class="curr-sub-item ${this.selectedSubject === 'all' && this.selectedGrade === 'g9' ? 'active' : ''}" data-subject="all">
                    <span>✨ 全部會考科目</span>
                    <span class="sub-count">6</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'bio_science' && this.selectedGrade === 'g9' ? 'active' : ''}" data-subject="bio_science">
                    <span>🔬 會考自然 (力學/電學/地科)</span>
                    <span class="sub-count">4</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'math' && this.selectedGrade === 'g9' ? 'active' : ''}" data-subject="math">
                    <span>🔢 會考數學 (幾何/圓周角)</span>
                    <span class="sub-count">2</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- SENIOR HIGH (高中階段: 高一 ~ 高三) -->
          <div class="curr-grade-group">
            <div class="curr-group-label">
              <span>🎓 高中階段 (10 ~ 12 年級)</span>
            </div>
            <div class="curr-grade-items">
              <!-- 高一 -->
              <div class="curr-grade-card ${this.selectedGrade === 'g10' ? 'active' : ''}" data-grade="g10">
                <div class="curr-grade-header">
                  <span class="curr-grade-icon">📘</span>
                  <div class="curr-grade-info">
                    <span class="curr-grade-name">高一 (十年級)</span>
                    <span class="curr-grade-tag">必修中心法則 · 餘式定理</span>
                  </div>
                  <span class="curr-chevron">▶</span>
                </div>
                <div class="curr-subject-submenu">
                  <button class="curr-sub-item ${this.selectedSubject === 'all' && this.selectedGrade === 'g10' ? 'active' : ''}" data-subject="all">
                    <span>✨ 全部科目</span>
                    <span class="sub-count">3</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'bio_science' && this.selectedGrade === 'g10' ? 'active' : ''}" data-subject="bio_science">
                    <span>🔬 必修自然 (生物/物理)</span>
                    <span class="sub-count">2</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'math' && this.selectedGrade === 'g10' ? 'active' : ''}" data-subject="math">
                    <span>🔢 必修數學 (多項式)</span>
                    <span class="sub-count">1</span>
                  </button>
                </div>
              </div>

              <!-- 高二 -->
              <div class="curr-grade-card ${this.selectedGrade === 'g11' ? 'active' : ''}" data-grade="g11">
                <div class="curr-grade-header">
                  <span class="curr-grade-icon">🔬</span>
                  <div class="curr-grade-info">
                    <span class="curr-grade-name">高二 (十一年級)</span>
                    <span class="curr-grade-tag">克卜勒定律 · 向量內積</span>
                  </div>
                  <span class="curr-chevron">▶</span>
                </div>
                <div class="curr-subject-submenu">
                  <button class="curr-sub-item ${this.selectedSubject === 'all' && this.selectedGrade === 'g11' ? 'active' : ''}" data-subject="all">
                    <span>✨ 全部科目</span>
                    <span class="sub-count">3</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'bio_science' && this.selectedGrade === 'g11' ? 'active' : ''}" data-subject="bio_science">
                    <span>🔬 選修物理 (天體力學/光學)</span>
                    <span class="sub-count">2</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'math' && this.selectedGrade === 'g11' ? 'active' : ''}" data-subject="math">
                    <span>🔢 數學 A/B (平面向量)</span>
                    <span class="sub-count">1</span>
                  </button>
                </div>
              </div>

              <!-- 高三 -->
              <div class="curr-grade-card ${this.selectedGrade === 'g12' ? 'active' : ''}" data-grade="g12">
                <div class="curr-grade-header">
                  <span class="curr-grade-icon">🎓</span>
                  <div class="curr-grade-info">
                    <span class="curr-grade-name">高三 (學測/分科)</span>
                    <span class="curr-grade-tag">微積分 · 電磁感應大考衝刺</span>
                  </div>
                  <span class="curr-chevron">▶</span>
                </div>
                <div class="curr-subject-submenu">
                  <button class="curr-sub-item ${this.selectedSubject === 'all' && this.selectedGrade === 'g12' ? 'active' : ''}" data-subject="all">
                    <span>✨ 全部科目</span>
                    <span class="sub-count">3</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'bio_science' && this.selectedGrade === 'g12' ? 'active' : ''}" data-subject="bio_science">
                    <span>🔬 自然科 (電磁學/遺傳工程)</span>
                    <span class="sub-count">2</span>
                  </button>
                  <button class="curr-sub-item ${this.selectedSubject === 'math' && this.selectedGrade === 'g12' ? 'active' : ''}" data-subject="math">
                    <span>🔢 數學甲/乙 (微積分導數)</span>
                    <span class="sub-count">1</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- SIDEBAR FOOTER: Matrix Modal Trigger -->
          <div class="curr-sidebar-footer">
            <button class="sidebar-matrix-btn" id="open-sidebar-matrix-btn">
              <span>🔄 跨版本章節對照速查</span>
              <span class="matrix-pill-tag">康軒 ✕ 翰林 ✕ 南一 橫向對齊</span>
            </button>
          </div>
        </aside>

        <!-- RIGHT MAIN EXPLORER: Units, Combos & Edition Spotlight -->
        <main class="curr-main-explorer" id="curr-main-explorer">
          <!-- Top Breadcrumb & Edition Switcher -->
          <div class="curr-explorer-topbar">
            <div class="curr-breadcrumb-box">
              <span class="curr-crumb-stage" id="crumb-grade-label">國一 (七年級)</span>
              <span class="curr-crumb-divider">/</span>
              <span class="curr-crumb-sub" id="crumb-subject-label">✨ 全部科目</span>
              <span class="curr-crumb-divider">/</span>
              <span class="curr-crumb-edition" id="crumb-edition-label">🟢 康軒版 (Kangxuan)</span>
            </div>

            <!-- Edition Tabs -->
            <div class="curr-edition-tabs">
              <button class="edition-tab-btn ${this.selectedEdition === 'kangxuan' ? 'active' : ''}" data-edition="kangxuan">
                <span>🟢</span> 康軒版
              </button>
              <button class="edition-tab-btn ${this.selectedEdition === 'hanlin' ? 'active' : ''}" data-edition="hanlin">
                <span>🔵</span> 翰林版
              </button>
              <button class="edition-tab-btn ${this.selectedEdition === 'nani' ? 'active' : ''}" data-edition="nani">
                <span>🟠</span> 南一版
              </button>
            </div>
          </div>

          <!-- Subject Quick Tabs for Right Explorer -->
          <div class="curr-top-subjects-row" id="curr-top-subjects-row">
            <button class="curr-subject-tab-btn ${this.selectedSubject === 'all' ? 'active' : ''}" data-subject="all">
              ✨ 全部學科
            </button>
            <button class="curr-subject-tab-btn ${this.selectedSubject === 'bio_science' ? 'active' : ''}" data-subject="bio_science">
              🔬 自然與生物/理化
            </button>
            <button class="curr-subject-tab-btn ${this.selectedSubject === 'chinese' ? 'active' : ''}" data-subject="chinese">
              ✍️ 國語文
            </button>
            <button class="curr-subject-tab-btn ${this.selectedSubject === 'math' ? 'active' : ''}" data-subject="math">
              🔢 數學邏輯
            </button>
            <button class="curr-subject-tab-btn ${this.selectedSubject === 'english' ? 'active' : ''}" data-subject="english">
              🌍 英語文
            </button>
          </div>

          <!-- Edition Spotlight Banner -->
          <div class="curr-edition-banner" id="curr-edition-banner">
            <!-- Dynamic edition highlight banner -->
          </div>

          <!-- Section Header & Filter Search Input -->
          <div class="curr-units-header-row">
            <div class="units-header-left">
              <h3 class="units-section-title">📖 選擇單元章節（第幾單元）</h3>
              <span class="units-count-badge" id="units-count-badge">載入中...</span>
            </div>

            <div class="units-filter-input-wrap">
              <span class="filter-icon">🔍</span>
              <input type="text" id="unit-keyword-filter" class="unit-filter-input" placeholder="在當前單元中篩選（例如：1-1、光合作用、細胞...）">
            </div>
          </div>

          <!-- Combo Review Packages Section -->
          <div class="curr-combos-section" id="curr-combos-container"></div>

          <!-- Units Cards Grid Container -->
          <div class="curr-units-grid" id="curr-units-grid-container"></div>
        </main>
      </div>
    `;

    // Bind Matrix Button
    const matrixBtn = container.querySelector('#open-sidebar-matrix-btn');
    if (matrixBtn) {
      matrixBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.openCurriculumMatrixModal();
      });
    }

    // Bind Grade Cards (Left Sidebar)
    container.querySelectorAll('.curr-grade-card').forEach(card => {
      const header = card.querySelector('.curr-grade-header');
      if (header) {
        header.addEventListener('click', () => {
          const gradeId = card.dataset.grade;
          this.selectedGrade = gradeId;
          window.soundEngine.playClick();

          // Update active grade styling in sidebar
          container.querySelectorAll('.curr-grade-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');

          this.updateCurriculumView();
        });
      }
    });

    // Bind Sidebar Subject Submenu Items
    container.querySelectorAll('.curr-sub-item').forEach(subBtn => {
      subBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentCard = subBtn.closest('.curr-grade-card');
        if (parentCard) {
          const gradeId = parentCard.dataset.grade;
          this.selectedGrade = gradeId;
          container.querySelectorAll('.curr-grade-card').forEach(c => c.classList.remove('active'));
          parentCard.classList.add('active');
        }

        this.selectedSubject = subBtn.dataset.subject;
        window.soundEngine.playClick();
        this.updateCurriculumView();
      });
    });

    // Bind Topbar Subject Tab Buttons
    container.querySelectorAll('.curr-subject-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        this.selectedSubject = tabBtn.dataset.subject;
        window.soundEngine.playClick();
        this.updateCurriculumView();
      });
    });

    // Bind Edition Tab Buttons
    container.querySelectorAll('.edition-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedEdition = btn.dataset.edition;
        window.soundEngine.playClick();
        this.updateCurriculumView();
      });
    });

    // Bind Unit Keyword Filter Input
    const filterInput = container.querySelector('#unit-keyword-filter');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        this.unitSearchFilter = e.target.value.trim().toLowerCase();
        this.renderUnitsCards();
      });
    }

    // Initial render of view
    this.updateCurriculumView();
  }

  // Update Breadcrumbs, Edition Highlights, Active Badges and Unit Cards
  updateCurriculumView() {
    const container = document.getElementById('curriculum-quick-navigator');
    if (!container || !window.CURRICULUM_DATA) return;

    const data = window.CURRICULUM_DATA;

    // 1. Grade Label
    const gradeObj = data.grades.find(g => g.id === this.selectedGrade) || { name: '國一 (七年級)' };
    const gradeLabelEl = document.getElementById('crumb-grade-label');
    if (gradeLabelEl) gradeLabelEl.textContent = gradeObj.name;

    // 2. Subject Label
    const subjectNames = {
      'all': '✨ 全部學科',
      'bio_science': '🔬 自然與生物/理化',
      'chinese': '✍️ 國語文',
      'math': '🔢 數學邏輯',
      'english': '🌍 英語文'
    };
    const subjectLabelEl = document.getElementById('crumb-subject-label');
    if (subjectLabelEl) subjectLabelEl.textContent = subjectNames[this.selectedSubject] || '✨ 全部學科';

    // 3. Edition Label & Active Tab
    const editionObj = data.editions.find(e => e.id === this.selectedEdition) || data.editions[0];
    const editionLabelEl = document.getElementById('crumb-edition-label');
    if (editionLabelEl) editionLabelEl.textContent = `${editionObj.icon} ${editionObj.name}`;

    container.querySelectorAll('.edition-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.edition === this.selectedEdition);
    });

    // 4. Update Sidebar & Topbar Active States
    container.querySelectorAll('.curr-grade-card').forEach(card => {
      card.classList.toggle('active', card.dataset.grade === this.selectedGrade);
    });

    container.querySelectorAll('.curr-sub-item').forEach(btn => {
      const card = btn.closest('.curr-grade-card');
      const isParentGrade = card && card.dataset.grade === this.selectedGrade;
      btn.classList.toggle('active', isParentGrade && btn.dataset.subject === this.selectedSubject);
    });

    container.querySelectorAll('.curr-subject-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.subject === this.selectedSubject);
    });

    // 5. Update Edition Spotlight Banner
    const bannerEl = document.getElementById('curr-edition-banner');
    if (bannerEl) {
      if (this.selectedEdition === 'hanlin') {
        bannerEl.innerHTML = `
          <div>
            <strong>🔵 翰林版課綱核心亮點：</strong>
            國一生物獨創「1-2 生物圈的範圍」獨立成節；光合作用為 <strong>3-3</strong>（3-2 為人體養分）；國文選文收錄楊喚《夏夜》與陳列《吃冰的滋味》！
          </div>
        `;
      } else if (this.selectedEdition === 'nani') {
        bannerEl.innerHTML = `
          <div>
            <strong>🟠 南一版課綱核心亮點：</strong>
            國一生物 1-1 統稱為「探索生命」；光合作用為 <strong>3-2</strong>；國文第一課為林良《做一隻光彩的螢火蟲》、沈復《兒時記趣》為第二課！
          </div>
        `;
      } else {
        bannerEl.innerHTML = `
          <div>
            <strong>🟢 康軒版課綱核心亮點：</strong>
            章節循序漸進，國一生物 1-1 起源與生命四大現象整合，光合作用為 <strong>3-2</strong>（植物如何製造養分）；國文第一課為宋晶宜《雅量》！
          </div>
        `;
      }
    }

    // 6. Render Combos & Unit Cards
    this.renderComboCards();
    this.renderUnitsCards();
  }

  // Master Combo Configurations with Explicit Subjects
  getAllComboConfigs() {
    const isHanlin = this.selectedEdition === 'hanlin';
    const isNani = this.selectedEdition === 'nani';

    return [
      // Grade 7 (國一)
      {
        id: 'g7-bio',
        gradeId: 'g7',
        subjectId: 'bio_science',
        subjectName: '國中生物',
        subjectIcon: '🔬',
        label: isHanlin ? '⚡ 翰林【生物】1-1 到 1-4 生物圈與細胞構造衝刺包' : (isNani ? '⚡ 南一【生物】1-1 到 1-3 探索生命與細胞構造衝刺包' : '⚡ 康軒【生物】1-1 到 1-3 生命起源與細胞構造衝刺包'),
        gradeLabel: '國一 (七年級)',
        termLabel: isHanlin ? '上學期 1-1 到 1-4 單元 (含生物圈)' : '上學期 1-1 到 1-3 單元',
        paperId: 'paper-g7-bio-ch1',
        title: isHanlin ? '翰林版 1-1 到 1-4 生命起源、生物圈範圍與細胞特訓' : (isNani ? '南一版 1-1 到 1-3 探索生命與細胞構造特訓' : '康軒版 1-1 到 1-3 生命起源與細胞構造特訓'),
        keyTakeaways: isHanlin ? [
          {
            header: '💡 1-1 ~ 1-2 生命起源與生物圈範圍（翰林特色）',
            bullets: [
              '原始大氣：水氣、氨、甲烷、氫氣，<strong>無游離氧氣（O2）</strong>。',
              '生物圈範圍：以海平面為準，向上 10,000 公尺、向下 10,000 公尺，約 20 公里厚度。深海熱泉管蟲靠硫化菌獲能。'
            ]
          },
          {
            header: '💡 1-3 ~ 1-4 細胞構造與物質通過細胞膜',
            bullets: [
              '粒線體：細胞能量發電廠產生 ATP；植物特有細胞壁與葉綠體（洋蔥表皮細胞無葉綠體）。',
              '滲透作用：水分子擴散。紅血球置入純水吸水破裂，植物細胞膨脹挺直而不破。'
            ]
          }
        ] : [
          {
            header: '💡 1-1 生命的起源與特性 核心速記',
            bullets: [
              '原始大氣：水氣、氨、甲烷、氫氣，<strong>無游離氧氣（O2）</strong>。',
              '生命四大特徵：生長、生殖、感應、代謝。鐘乳石滴水長大不是生命現象（無細胞構造與代謝）。'
            ]
          },
          {
            header: '💡 1-2 ~ 1-3 細胞構造與物質進出細胞',
            bullets: [
              '粒線體：動植物皆有，細胞的「能量發電廠」，進行呼吸作用產生 ATP。',
              '植物細胞特有：細胞壁（纖維素維持形狀）、葉綠體（綠色組織行光合作用）。',
              '洋蔥表皮細胞無葉綠體，但有細胞壁與細胞核！'
            ]
          }
        ],
        ttsText: isHanlin ? '翰林版國一生物重點：生物圈範圍約二十公里。原始大氣沒有氧氣。植物細胞有細胞壁與葉綠體，洋蔥表皮細胞無葉綠體。' : '國一生物重點：原始大氣沒有氧氣。生命特徵包含代謝、生長、感應與生殖。植物細胞特有細胞壁與葉綠體！'
      },
      {
        id: 'g7-photosynthesis',
        gradeId: 'g7',
        subjectId: 'bio_science',
        subjectName: '國中生物',
        subjectIcon: '🌿',
        label: isHanlin ? '🌿 翰林【生物】3-3 植物的光合作用與能量轉換（注意翰林為 3-3！）' : (isNani ? '🌿 南一【生物】3-2 植物的光合作用與養分製造' : '🌿 康軒【生物】3-2 植物如何製造養分（光合作用）'),
        gradeLabel: '國一 (七年級)',
        termLabel: isHanlin ? '上學期 3-3 單元' : '上學期 3-2 單元',
        paperId: 'paper-bio-photosynthesis',
        title: isHanlin ? '翰林版 3-3：植物的光合作用與能量轉換全景特訓' : (isNani ? '南一版 3-2：植物的光合作用專項特訓' : '康軒版 3-2：植物如何製造養分（光合作用）特訓'),
        keyTakeaways: [
          {
            header: '💡 光反應與碳反應秒殺心法',
            bullets: [
              '光反應（類囊體）：葉綠素吸光裂解「水（H2O）」釋放「氧氣（O2）」，產生能量 ATP。',
              '碳反應（基質）：酵素催化利用 CO2 與光反應能量合成葡萄糖。',
              '會考秒殺原則：光合作用釋放的氧氣來自「水」，絕對不是二氧化碳！'
            ]
          },
          {
            header: '💡 葉片製造澱粉探究實驗四步法',
            bullets: [
              '1. 沸水煮沸破壞細胞 → 2. 隔水加熱酒精水浴脫色 → 3. 溫水漂洗軟化 → 4. 滴加碘液檢驗。',
              '照光部分呈藍黑色（有澱粉），遮光部分呈黃褐色（無澱粉）。'
            ]
          }
        ],
        ttsText: '光合作用重點：光反應分解水釋放氧氣，碳反應利用二氧化碳製造葡萄糖。酒精必須隔水加熱脫色！'
      },
      {
        id: 'g7-chinese',
        gradeId: 'g7',
        subjectId: 'chinese',
        subjectName: '國中國文',
        subjectIcon: '✍️',
        label: isHanlin ? '⚡ 翰林【國文】第1~5課《夏夜》《雅量》《吃冰》《背影》衝刺包' : (isNani ? '⚡ 南一【國文】第1~5課《做一隻光彩的螢火蟲》《夏夜》《背影》衝刺包' : '⚡ 康軒【國文】第1~6課《雅量》《夏夜》《背影》精讀衝刺包'),
        gradeLabel: '國一 (七年級)',
        termLabel: '上學期 經典選文與語文常識',
        paperId: 'paper-g7-chinese-ch1',
        title: isHanlin ? '翰林版 國一國文經典抒情與語文常識特訓' : (isNani ? '南一版 國一國文經典選文與語文常識特訓' : '康軒版 國一國文 經典抒情文與語文常識特訓'),
        keyTakeaways: [
          {
            header: isHanlin ? '💡 翰林第 1 課《夏夜》與第 5 課《背影》' : (isNani ? '💡 南一第 1 課《做一隻光彩的螢火蟲》與第 5 課《背影》' : '💡 康軒第 1 課《雅量》與第 6 課《背影》'),
            bullets: [
              '朱自清《背影》以買橘子的蹣跚身影象徵含蓄深沉的父愛，朱紅與深青色彩強烈對比。',
              '各版本第一課分流：康軒《雅量》以人際包容開篇、翰林《夏夜》以童詩啟發情思、南一《螢火蟲》以勵志奮發破題。'
            ]
          },
          {
            header: '💡 語文常識：標點符號與六書漢字演進',
            bullets: [
              '破折號（——佔兩格，表示語氣轉折或延音）；夾注號補充說明。',
              '漢字演進：甲骨文 → 金文 → 小篆 → 隸書（古今分水嶺）→ 楷書。'
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

  renderComboCards() {
    const container = document.getElementById('curr-combos-container');
    if (!container) return;

    const allCombos = this.getAllComboConfigs();
    const activeCombos = allCombos.filter(c => {
      const matchGrade = (c.gradeId === this.selectedGrade) ||
        (this.selectedGrade === 'senior' && c.gradeId === 'senior') ||
        (['g10', 'g11', 'g12'].includes(this.selectedGrade) && c.gradeId === 'senior');
      const matchSubject = this.selectedSubject === 'all' || c.subjectId === this.selectedSubject;
      return matchGrade && matchSubject;
    });

    if (activeCombos.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    container.style.display = 'flex';
    container.innerHTML = activeCombos.map(c => `
      <button class="special-combo-card" data-unit-combo="${c.id}">
        <span class="combo-icon">${c.subjectIcon || '⚡'}</span>
        <span class="combo-label">${c.label}</span>
      </button>
    `).join('');

    container.querySelectorAll('.special-combo-card').forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        const combo = btn.dataset.unitCombo;
        if (combo) {
          this.activateUnitComboReview(combo);
        }
      });
    });
  }

  renderUnitsCards() {
    const grid = document.getElementById('curr-units-grid-container');
    const countBadge = document.getElementById('units-count-badge');
    if (!grid || !window.CURRICULUM_DATA) return;

    // Filter units by grade, edition, subject, and search filter
    const units = window.CURRICULUM_DATA.units.filter(u => {
      // 1. Grade match
      let matchGrade = false;
      if (this.selectedGrade === 'senior') {
        matchGrade = ['senior', 'g10', 'g11', 'g12'].includes(u.gradeId);
      } else if (['g10', 'g11', 'g12'].includes(this.selectedGrade)) {
        matchGrade = (u.gradeId === this.selectedGrade) || (u.gradeId === 'senior');
      } else {
        matchGrade = u.gradeId === this.selectedGrade;
      }

      // 2. Edition match
      const matchEdition = Array.isArray(u.editions) ? u.editions.includes(this.selectedEdition) : true;

      // 3. Subject match
      const matchSubject = this.selectedSubject === 'all' || u.subjectId === this.selectedSubject;

      // 4. Keyword search filter
      let matchSearch = true;
      if (this.unitSearchFilter) {
        const q = this.unitSearchFilter.toLowerCase();
        const title = (u.unitName || '').toLowerCase();
        const code = (u.unitCode || '').toLowerCase();
        const desc = (u.description || '').toLowerCase();
        const notes = (u.editionNotes || '').toLowerCase();
        const term = (u.term || '').toLowerCase();
        const kws = Array.isArray(u.searchKeywords) ? u.searchKeywords.join(' ').toLowerCase() : '';
        const pts = Array.isArray(u.keyPoints) ? u.keyPoints.join(' ').toLowerCase() : '';
        matchSearch = title.includes(q) || code.includes(q) || desc.includes(q) || notes.includes(q) || term.includes(q) || kws.includes(q) || pts.includes(q);
      }

      return matchGrade && matchEdition && matchSubject && matchSearch;
    });

    if (countBadge) {
      countBadge.textContent = `共 ${units.length} 個單元`;
    }

    if (units.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface-elevated); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg); color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🔍</div>
          <h4 style="color: var(--text-main); margin-bottom: 0.5rem; font-size: 1.05rem;">未找到符合條件的單元章節</h4>
          <p style="font-size: 0.85rem; max-width: 480px; margin: 0 auto;">請嘗試更換學科分類、版本（康軒/翰林/南一），或清除篩選關鍵字。</p>
        </div>
      `;
      return;
    }

    const subjectMetaMap = {
      'bio_science': { label: '自然/理化', icon: '🔬', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
      'chinese': { label: '國文', icon: '✍️', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
      'math': { label: '數學', icon: '🔢', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
      'english': { label: '英文', icon: '🌍', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' }
    };

    grid.innerHTML = units.map(u => {
      const sm = subjectMetaMap[u.subjectId] || { label: '學科', icon: '📚', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' };
      const bulletItems = (u.keyPoints || []).slice(0, 3).map(pt => `
        <li class="unit-bullet-item">
          <span class="unit-bullet-dot">▸</span>
          <span>${pt}</span>
        </li>
      `).join('');

      return `
        <div class="unit-card-item" data-unit-id="${u.id}">
          <div class="unit-card-top">
            <span class="unit-code-pill">${u.unitCode || '單元'}</span>
            <div class="unit-meta-badges">
              <span class="unit-subject-badge" style="color: ${sm.color}; background: ${sm.bg}; border: 1px solid ${sm.color}40;">
                ${sm.icon} ${sm.label}
              </span>
              <span class="unit-term-badge">${u.term || ''}</span>
            </div>
          </div>

          <h4 class="unit-card-title">${u.unitName}</h4>

          ${u.editionNotes ? `
            <div class="unit-edition-spotlight">
              ${u.editionNotes}
            </div>
          ` : ''}

          <ul class="unit-bullets-list">
            ${bulletItems}
          </ul>

          <div class="unit-card-actions">
            <button class="unit-action-btn read-btn" data-action="read" data-unit-id="${u.id}">
              📖 進入單元精讀
            </button>
            <button class="unit-action-btn quiz-btn" data-action="quiz" data-unit-id="${u.id}" data-quiz-id="${u.quizPaperId || ''}">
              📝 隨堂專項測驗
            </button>
            <button class="unit-action-btn qbi-btn" data-action="qbi" data-unit-id="${u.id}">
              🐾 呼叫 Q比 考點直出
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind Action Buttons
    grid.querySelectorAll('.unit-card-item').forEach(card => {
      const unitId = card.dataset.unitId;
      const unit = window.CURRICULUM_DATA.units.find(u => u.id === unitId);
      if (!unit) return;

      // 1. Read Button
      const readBtn = card.querySelector('[data-action="read"]');
      if (readBtn) {
        readBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.soundEngine.playClick();
          this.openCurriculumUnitModal(unit);
        });
      }

      // 2. Quiz Button
      const quizBtn = card.querySelector('[data-action="quiz"]');
      if (quizBtn) {
        quizBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.soundEngine.playClick();
          if (unit.quizPaperId && window.examEngine) {
            window.examEngine.loadPaperById(unit.quizPaperId, 'practice');
            if (window.appRouter) window.appRouter.navigateTo('quiz');
          } else {
            this.openCurriculumUnitModal(unit);
          }
        });
      }

      // 3. Qbi AI Tutor Button
      const qbiBtn = card.querySelector('[data-action="qbi"]');
      if (qbiBtn) {
        qbiBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.soundEngine.playClick();
          if (window.aiTutor) {
            const prompt = `請以生動且條理分明的方式為我解說【${unit.unitCode} ${unit.unitName}】的核心考點與易錯陷阱！`;
            window.aiTutor.askInstantQuestion(prompt);
          }
        });
      }

      // 4. Click Card Background
      card.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.openCurriculumUnitModal(unit);
      });
    });
  }

  renderUnitsButtons() {
    this.renderUnitsCards();
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

    const editionId = (unit.editions && unit.editions.length === 1) ? unit.editions[0] : this.selectedEdition;
    const editionName = editionId === 'hanlin' ? '翰林版' : (editionId === 'nani' ? '南一版' : '康軒版');
    const gradeBadgeMap = {
      'g7': '國一 (七年級)',
      'g8': '國二 (八年級)',
      'g9': '國三 (九年級會考)',
      'g10': '高一 (十年級核心)',
      'g11': '高二 (十一年級選修)',
      'g12': '高三 (十二年級衝刺)',
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

      ${unit.editionNotes ? `
        <div class="reader-edition-spotlight">
          <div class="spotlight-title">🔍 ${editionName} 專屬課綱亮點與段考特色</div>
          <div class="spotlight-desc">${unit.editionNotes}</div>
        </div>
      ` : ''}

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
        const text = `【${editionName} ${sMeta.label}】${unit.unitName}。核心考點：${unit.keyPoints.join('。')}`;
        window.soundEngine.speakText(text);
      });
    }
  }

  // Open Curriculum Cross-Edition Comparison Matrix Modal
  openCurriculumMatrixModal(activeCategory = 'g7-bio') {
    const modal = document.getElementById('curriculum-matrix-modal');
    const contentBox = document.getElementById('matrix-modal-body');
    if (!modal || !contentBox || !window.CURRICULUM_DATA || !window.CURRICULUM_DATA.comparisonMatrix) return;

    this.currentMatrixCategory = activeCategory;
    this.renderMatrixContent(activeCategory);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeCurriculumMatrixModal() {
    const modal = document.getElementById('curriculum-matrix-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // Render Interactive Comparison Matrix Content
  renderMatrixContent(categoryKey) {
    const contentBox = document.getElementById('matrix-modal-body');
    if (!contentBox || !window.CURRICULUM_DATA) return;

    const matrixData = window.CURRICULUM_DATA.comparisonMatrix;
    const catKeys = [
      { id: 'g7-bio', label: '🔬 國一生物（七上自然）' },
      { id: 'g7-chinese', label: '✍️ 國一國文（七上選文）' },
      { id: 'g7-math', label: '🔢 國一數學（七上單元）' },
      { id: 'g8-phy', label: '🔬 國二理化（八上自然）' },
      { id: 'g8-math', label: '🔢 國二數學（八上單元）' },
      { id: 'g9-cap', label: '🎯 國三九年級（會考全科對照）' }
    ];

    const currentCat = matrixData[categoryKey] || matrixData['g7-bio'];

    contentBox.innerHTML = `
      <div class="matrix-container">
        <!-- Tabs -->
        <div class="matrix-tabs-row">
          ${catKeys.map(k => `
            <button class="matrix-tab-btn ${k.id === categoryKey ? 'active' : ''}" data-cat="${k.id}">
              ${k.label}
            </button>
          `).join('')}
        </div>

        <!-- Summary Note Banner -->
        <div class="matrix-summary-box">
          ${currentCat.summaryNote}
        </div>

        <!-- Comparative Table -->
        <div class="matrix-table-wrap">
          <table class="matrix-table">
            <thead>
              <tr>
                <th style="width: 17%;">🎯 核心學習概念 / 考點</th>
                <th class="col-kx" style="width: 23%;">🟢 康軒版 (Kangxuan)</th>
                <th class="col-hl" style="width: 23%;">🔵 翰林版 (Hanlin)</th>
                <th class="col-ni" style="width: 23%;">🟠 南一版 (Nani)</th>
                <th style="width: 14%;">💡 版本特色叮嚀</th>
              </tr>
            </thead>
            <tbody>
              ${currentCat.items.map(item => `
                <tr>
                  <td class="matrix-topic-cell">${item.topic}</td>
                  <td>
                    <button class="matrix-unit-chip kx" data-edition="kangxuan" data-unit-id="${item.kx.unitId}">
                      <span class="chip-code">${item.kx.code}</span>
                      <span class="chip-name">${item.kx.name}</span>
                      <span class="chip-action-hint">👆 點擊直達研讀/測驗</span>
                    </button>
                  </td>
                  <td>
                    <button class="matrix-unit-chip hl" data-edition="hanlin" data-unit-id="${item.hl.unitId}">
                      <span class="chip-code">${item.hl.code}</span>
                      <span class="chip-name">${item.hl.name}</span>
                      <span class="chip-action-hint">👆 點擊直達研讀/測驗</span>
                    </button>
                  </td>
                  <td>
                    <button class="matrix-unit-chip ni" data-edition="nani" data-unit-id="${item.ni.unitId}">
                      <span class="chip-code">${item.ni.code}</span>
                      <span class="chip-name">${item.ni.name}</span>
                      <span class="chip-action-hint">👆 點擊直達研讀/測驗</span>
                    </button>
                  </td>
                  <td class="matrix-tip-cell">${item.tip}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind tab clicks
    contentBox.querySelectorAll('.matrix-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.renderMatrixContent(btn.dataset.cat);
      });
    });

    // Bind unit chip clicks inside table
    contentBox.querySelectorAll('.matrix-unit-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        const edition = btn.dataset.edition;
        const unitId = btn.dataset.unitId;

        // Close matrix modal
        this.closeCurriculumMatrixModal();

        // Switch active edition in UI
        if (edition) {
          this.selectedEdition = edition;
          const editionBtns = document.querySelectorAll('.edition-toggle-btn');
          editionBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.edition === edition);
          });
          this.renderUnitsButtons();
        }

        // Open target unit modal
        const unit = window.CURRICULUM_DATA.units.find(u => u.id === unitId);
        if (unit) {
          this.openCurriculumUnitModal(unit);
        }
      });
    });
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
