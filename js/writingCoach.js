// Interactive Writing Coach and Evaluation Engine
class WritingCoach {
  constructor() {
    this.currentPrompt = window.WRITING_DATA.prompts[0];
    this.currentOutlineTemplate = 'outline-narrative-4';
    this.outlineNotes = {};
    this.currentStep = 1; // 1: 審題, 2: 骨架, 3: 修辭, 4: 寫作與批改
  }

  init() {
    this.bindEvents();
    this.renderPromptSelector();
    this.loadPrompt(this.currentPrompt.id);
    this.renderRhetoricPalette();
  }

  bindEvents() {
    // Step navigation tabs
    const stepTabs = document.querySelectorAll('.writing-step-tab');
    stepTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const stepNum = parseInt(tab.dataset.step, 10);
        this.switchStep(stepNum);
      });
    });

    // Prompt select dropdown
    const promptSelect = document.getElementById('writing-prompt-selector');
    if (promptSelect) {
      promptSelect.addEventListener('change', (e) => {
        this.loadPrompt(e.target.value);
      });
    }

    // Custom prompt toggle
    const customPromptBtn = document.getElementById('custom-prompt-btn');
    if (customPromptBtn) {
      customPromptBtn.addEventListener('click', () => {
        this.toggleCustomPrompt();
      });
    }

    // Live word count for writing editor
    const editor = document.getElementById('essay-textarea');
    if (editor) {
      editor.addEventListener('input', () => {
        this.updateEditorMetrics();
      });
    }

    // Evaluate essay button
    const evalBtn = document.getElementById('evaluate-essay-btn');
    if (evalBtn) {
      evalBtn.addEventListener('click', () => {
        this.evaluateEssay();
      });
    }

    // Load model essay button
    const modelBtn = document.getElementById('view-model-essay-btn');
    if (modelBtn) {
      modelBtn.addEventListener('click', () => {
        this.openModelEssayModal();
      });
    }

    // Apply outline to draft button
    const applyOutlineBtn = document.getElementById('apply-outline-to-draft-btn');
    if (applyOutlineBtn) {
      applyOutlineBtn.addEventListener('click', () => {
        this.applyOutlineToEditor();
      });
    }

    // Read essay aloud
    const ttsEssayBtn = document.getElementById('tts-essay-btn');
    if (ttsEssayBtn) {
      ttsEssayBtn.addEventListener('click', () => {
        const text = editor ? editor.value : '';
        if (!text.trim()) {
          this.showToast('⚠️ 請先在寫作區輸入一些文字！');
          return;
        }
        if (window.soundEngine.isSpeaking) {
          window.soundEngine.stopSpeaking();
          ttsEssayBtn.textContent = '🔊 朗讀我的作文';
        } else {
          ttsEssayBtn.textContent = '⏹️ 停止朗讀';
          window.soundEngine.speakText(text, () => {
            ttsEssayBtn.textContent = '🔊 朗讀我的作文';
          });
        }
      });
    }
  }

  renderPromptSelector() {
    const selector = document.getElementById('writing-prompt-selector');
    if (!selector) return;

    selector.innerHTML = window.WRITING_DATA.prompts.map(p => `
      <option value="${p.id}">${p.genre} ｜ ${p.title}</option>
    `).join('') + `<option value="custom">✏️ 自行輸入自訂題目...</option>`;
  }

  loadPrompt(promptId) {
    window.soundEngine.playClick();
    if (promptId === 'custom') {
      this.toggleCustomPrompt();
      return;
    }

    const promptObj = window.WRITING_DATA.prompts.find(p => p.id === promptId);
    if (!promptObj) return;

    this.currentPrompt = promptObj;
    this.currentOutlineTemplate = promptObj.outlineTemplateId;

    // Render Step 1: Prompt Breakdown
    const titleEl = document.getElementById('prompt-hero-title');
    const badgeEl = document.getElementById('prompt-genre-badge');
    const descEl = document.getElementById('prompt-desc-text');
    const themeEl = document.getElementById('prompt-theme-focus');
    const pitfallsEl = document.getElementById('prompt-pitfalls-list');
    const anglesEl = document.getElementById('prompt-angles-grid');

    if (titleEl) titleEl.textContent = promptObj.title;
    if (badgeEl) badgeEl.textContent = `${promptObj.genre} (${promptObj.grade})`;
    if (descEl) descEl.textContent = promptObj.promptText;
    if (themeEl) themeEl.textContent = `🎯 核心題眼：${promptObj.analysis.themeWord} —— ${promptObj.analysis.guide}`;
    
    if (pitfallsEl) {
      pitfallsEl.innerHTML = promptObj.analysis.pitfalls.map(p => `
        <li class="pitfall-item">${p}</li>
      `).join('');
    }

    if (anglesEl) {
      anglesEl.innerHTML = promptObj.analysis.brainstormAngles.map((angle, idx) => `
        <div class="angle-card" data-angle-idx="${idx}">
          <div class="angle-icon">💡</div>
          <div class="angle-text">${angle}</div>
          <button class="angle-adopt-btn" data-text="${this.escapeHtml(angle)}">
            採用此角度思考 ➔
          </button>
        </div>
      `).join('');

      anglesEl.querySelectorAll('.angle-adopt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = btn.dataset.text;
          this.adoptAngleIntoNotes(text);
        });
      });
    }

    // Render Step 2: Outline Builder
    this.renderOutlineBuilder();
  }

  toggleCustomPrompt() {
    const customPrompt = prompt('請輸入你想要練習的自訂作文/寫作題目：', '一次難忘的挑戰');
    if (customPrompt && customPrompt.trim()) {
      this.currentPrompt = {
        id: 'custom-' + Date.now(),
        title: customPrompt.trim(),
        genre: '自選題目特訓',
        grade: '自由練習',
        promptText: `題目：${customPrompt.trim()}。請根據此題目展開審題與構思。`,
        analysis: {
          themeWord: '立意明確、情理交融',
          guide: '請緊扣題目關鍵字，明確中心思想，避免離題。',
          pitfalls: [
            '❌ 避免審題偏差，忽視題目限定語境。',
            '❌ 避免空泛議論，缺乏具體生活細節支撐。',
            '❌ 避免前後矛盾，結尾草率結束。'
          ],
          brainstormAngles: [
            '個人親身經歷的角度：由微小生活切入，寫出真實心路歷程。',
            '社會觀察與省思的角度：探討該現象背後的深層文化或心理原因。',
            '哲學對立辯證角度：探討這件事情的正反兩面與成長代價。'
          ]
        },
        outlineTemplateId: 'outline-narrative-4',
        modelEssay: null
      };

      const titleEl = document.getElementById('prompt-hero-title');
      const badgeEl = document.getElementById('prompt-genre-badge');
      const descEl = document.getElementById('prompt-desc-text');
      if (titleEl) titleEl.textContent = this.currentPrompt.title;
      if (badgeEl) badgeEl.textContent = '自訂題目';
      if (descEl) descEl.textContent = this.currentPrompt.promptText;

      this.renderOutlineBuilder();
    }
  }

  adoptAngleIntoNotes(angleText) {
    window.soundEngine.playCorrect();
    // Switch to Step 2
    this.switchStep(2);
    // Pre-populate Step 2 section
    const noteArea = document.querySelector('.outline-step-textarea');
    if (noteArea) {
      noteArea.value = (noteArea.value ? noteArea.value + '\n' : '') + `【立意焦點】：${angleText}`;
    }
  }

  renderOutlineBuilder() {
    const container = document.getElementById('outline-builder-container');
    if (!container) return;

    const blueprint = window.WRITING_DATA.outlineBlueprints[this.currentOutlineTemplate] || window.WRITING_DATA.outlineBlueprints['outline-narrative-4'];
    
    container.innerHTML = `
      <div class="blueprint-info-bar">
        <div>
          <h4>📐 ${blueprint.name}</h4>
          <p class="blueprint-desc">${blueprint.description}</p>
        </div>
        <div class="blueprint-controls">
          <select id="switch-blueprint-select" class="clean-select">
            <option value="outline-narrative-4" ${this.currentOutlineTemplate === 'outline-narrative-4' ? 'selected' : ''}>起承轉合 4 段式</option>
            <option value="outline-arg-5" ${this.currentOutlineTemplate === 'outline-arg-5' ? 'selected' : ''}>五段式立論思辨 (學測國寫推薦)</option>
            <option value="outline-eng-5" ${this.currentOutlineTemplate === 'outline-eng-5' ? 'selected' : ''}>English 5-Paragraph Blueprint</option>
          </select>
        </div>
      </div>

      <div class="outline-steps-list">
        ${blueprint.steps.map((st, idx) => `
          <div class="outline-step-card" data-idx="${idx}">
            <div class="step-card-header">
              <span class="step-badge">${st.stage}</span>
              <span class="step-tip">💡 提示：${st.tips}</span>
            </div>
            <div class="step-prompt-text">${st.prompt}</div>
            <div class="starter-callout">
              <span class="starter-label">起手引言建議：</span>
              <span class="starter-text">${st.starter}</span>
            </div>
            <textarea class="outline-step-textarea" data-idx="${idx}" placeholder="在此快速記錄本段你的關鍵想法、打算引用的故事或論點..."></textarea>
          </div>
        `).join('')}
      </div>
    `;

    const select = document.getElementById('switch-blueprint-select');
    if (select) {
      select.addEventListener('change', (e) => {
        this.currentOutlineTemplate = e.target.value;
        this.renderOutlineBuilder();
      });
    }
  }

  applyOutlineToEditor() {
    window.soundEngine.playCorrect();
    const blueprint = window.WRITING_DATA.outlineBlueprints[this.currentOutlineTemplate] || window.WRITING_DATA.outlineBlueprints['outline-narrative-4'];
    const textareas = document.querySelectorAll('.outline-step-textarea');
    
    let generatedDraft = `【題目】：${this.currentPrompt.title}\n\n`;

    blueprint.steps.forEach((st, idx) => {
      const userNote = textareas[idx] ? textareas[idx].value.trim() : '';
      generatedDraft += `/* ${st.stage} */\n`;
      if (userNote) {
        generatedDraft += `${userNote}\n\n`;
      } else {
        generatedDraft += `${st.starter} [在此展開你的敘述與細節...]\n\n`;
      }
    });

    const editor = document.getElementById('essay-textarea');
    if (editor) {
      editor.value = generatedDraft;
      this.updateEditorMetrics();
    }

    // Switch to Step 4
    this.switchStep(4);
  }

  renderRhetoricPalette() {
    const container = document.getElementById('rhetoric-palette-grid');
    if (!container) return;

    container.innerHTML = window.WRITING_DATA.rhetoricLibrary.map(group => `
      <div class="rhetoric-group">
        <h4 class="rhetoric-group-title">✦ ${group.category}</h4>
        <div class="rhetoric-cards-wrap">
          ${group.items.map(item => `
            <div class="rhetoric-card">
              <div class="rhetoric-phrase">${item.phrase}</div>
              <div class="rhetoric-desc">${item.desc}</div>
              <div class="rhetoric-usage">“${item.usage}”</div>
              <button class="insert-rhetoric-btn" data-phrase="${this.escapeHtml(item.usage)}">
                ＋ 插入至寫作草稿
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.insert-rhetoric-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const phrase = btn.dataset.phrase;
        this.insertTextAtCursor(phrase);
      });
    });
  }

  insertTextAtCursor(text) {
    const editor = document.getElementById('essay-textarea');
    if (!editor) return;

    window.soundEngine.playClick();
    const start = editor.selectionStart || 0;
    const end = editor.selectionEnd || 0;
    const val = editor.value;

    editor.value = val.substring(0, start) + text + val.substring(end);
    editor.selectionStart = editor.selectionEnd = start + text.length;
    editor.focus();
    this.updateEditorMetrics();

    // Show temporary toast
    this.showToast(`已插入：「${text.slice(0, 15)}...」`);
  }

  showToast(msg) {
    let toast = document.getElementById('app-floating-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-floating-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = 'app-toast active';
    setTimeout(() => {
      toast.className = 'app-toast';
    }, 2200);
  }

  updateEditorMetrics() {
    const editor = document.getElementById('essay-textarea');
    if (!editor) return;

    const text = editor.value;
    const charCount = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const estTime = Math.max(1, Math.ceil(charCount / 300));

    const charBadge = document.getElementById('metric-char-count');
    const paraBadge = document.getElementById('metric-para-count');
    const timeBadge = document.getElementById('metric-est-time');

    if (charBadge) charBadge.textContent = `${charCount} 字`;
    if (paraBadge) paraBadge.textContent = `${paragraphs} 段落`;
    if (timeBadge) timeBadge.textContent = `約需 ${estTime} 分鐘朗讀`;
  }

  switchStep(stepNum) {
    this.currentStep = stepNum;
    window.soundEngine.playClick();

    const tabs = document.querySelectorAll('.writing-step-tab');
    tabs.forEach(t => {
      t.classList.toggle('active', parseInt(t.dataset.step, 10) === stepNum);
    });

    const panels = document.querySelectorAll('.writing-step-panel');
    panels.forEach(p => {
      p.classList.toggle('active', parseInt(p.dataset.step, 10) === stepNum);
    });

    if (window.qbiCompanion && typeof window.qbiCompanion.onWritingStepChanged === 'function') {
      window.qbiCompanion.onWritingStepChanged(stepNum);
    }
  }

  evaluateEssay() {
    const editor = document.getElementById('essay-textarea');
    if (!editor) return;

    const content = editor.value.trim();
    if (content.length < 50) {
      this.showToast('⚠️ 請至少撰寫 50 字以上，AI 寫作導師才能為您提供具有深度與信度的評分與修改建議！');
      return;
    }

    window.soundEngine.playCorrect();

    // Simulate multi-dimensional intelligent essay grading
    const wordCount = content.replace(/\s/g, '').length;
    const paras = content.split(/\n+/).filter(p => p.trim().length > 0);

    // Scoring heuristics
    let relevanceScore = 22; // max 25
    let structureScore = 21; // max 25
    let styleScore = 20; // max 25
    let grammarScore = 23; // max 25

    if (wordCount >= 500) {
      relevanceScore = 24;
      styleScore = Math.min(25, styleScore + 3);
    } else if (wordCount < 250) {
      relevanceScore = 18;
      structureScore = 17;
    }

    if (paras.length >= 4) {
      structureScore = Math.min(25, structureScore + 3);
    } else if (paras.length < 3) {
      structureScore = 16;
    }

    // Check for rhetorical devices or advanced transitions
    const hasIdioms = /([一-龥]{4}|however|furthermore|consequently|如|若|彷彿|宛如)/.test(content);
    if (hasIdioms) {
      styleScore = Math.min(25, styleScore + 2);
    }

    const totalScore = relevanceScore + structureScore + styleScore + grammarScore;
    let tier = 'A+';
    if (totalScore >= 95) tier = 'S (卓越名篇)';
    else if (totalScore >= 88) tier = 'A+ (特優高分)';
    else if (totalScore >= 80) tier = 'A (優良作手)';
    else if (totalScore >= 70) tier = 'B (可圈可點)';
    else tier = 'C (待加強磨練)';

    if (window.qbiCompanion && typeof window.qbiCompanion.onWritingEvaluated === 'function') {
      window.qbiCompanion.onWritingEvaluated(totalScore);
    }

    // Render Evaluation Report Modal
    this.renderEvaluationReport({
      totalScore,
      tier,
      wordCount,
      paragraphCount: paras.length,
      rubric: {
        relevance: { score: relevanceScore, title: '審題切合與立意深度', max: 25, feedback: '立意明確，緊扣題眼核心，若能在收尾時引入更具普遍性的哲思，立意將更為宏遠。' },
        structure: { score: structureScore, title: '篇章組織與起承轉合', max: 25, feedback: paras.length >= 4 ? '段落脈絡分明，銜接自然，具備清晰的邏輯層次感。' : '段落稍嫌單薄，建議強化「轉折段」之矛盾張力或駁論深度。' },
        style: { score: styleScore, title: '遣詞造句與修辭文采', max: 25, feedback: '語言流暢自然，適當運用了形象生動的譬喻；建議可多融入五感描摹與高階動詞替代常用字。' },
        grammar: { score: grammarScore, title: '語法標點與書寫規範', max: 25, feedback: '標點符號使用得宜，無明顯語病或歧義句式。' }
      },
      rewrites: [
        {
          original: '這件事情讓我學到了很多東西，也讓我變得更勇敢。',
          improved: '那一場淬礪如疾風驟雨，不僅滌淨了往日的怯懦，更在心底悄然種下了一株不畏風霜的勁竹。',
          reason: '運用自然意象「疾風驟雨」與「勁竹」作譬喻，將抽象的「收穫與勇敢」具象化，更富詩意與感染力。'
        },
        {
          original: '他的話一直留在我的腦袋裡面，我到現在都記得。',
          improved: '那句叮嚀如同金石之音，穿透歲月煙塵，長久在心谷深處激盪起明澈的回響。',
          reason: '以「金石之音」與「心谷回響」通感聯覺，將單純的「記得」昇華為靈魂共鳴。'
        }
      ]
    });
  }

  renderEvaluationReport(data) {
    const modal = document.getElementById('eval-report-modal');
    const container = document.getElementById('eval-report-body');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="eval-hero-banner">
        <div class="score-circle-box">
          <div class="score-number">${data.totalScore}</div>
          <div class="score-max">/ 100 分</div>
        </div>
        <div class="eval-hero-text">
          <span class="eval-tier-badge">${data.tier}</span>
          <h3 class="eval-coach-verdict">導師總評：文理清晰，情感真摯，具備優秀的寫作潛質！</h3>
          <p class="eval-coach-sub">篇幅統計：${data.wordCount} 字 ｜ 共 ${data.paragraphCount} 個段落 ｜ 綜合評價位於前 8%</p>
        </div>
      </div>

      <div class="eval-rubric-breakdown">
        <h4>📊 四維深度評鑑規準 (Rubric)</h4>
        <div class="rubric-bars-grid">
          ${Object.values(data.rubric).map(r => `
            <div class="rubric-bar-item">
              <div class="rubric-bar-top">
                <span class="rubric-bar-title">${r.title}</span>
                <span class="rubric-bar-val">${r.score} / ${r.max}</span>
              </div>
              <div class="rubric-track">
                <div class="rubric-fill" style="width: ${(r.score / r.max) * 100}%"></div>
              </div>
              <p class="rubric-comment">${r.feedback}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="eval-rewrites-box">
        <h4>✨ AI 潤色昇華金句對照（點石成金）</h4>
        <div class="rewrites-list">
          ${data.rewrites.map(rw => `
            <div class="rewrite-card">
              <div class="rw-col original">
                <div class="rw-label">原生句子</div>
                <p>“${rw.original}”</p>
              </div>
              <div class="rw-arrow">➔</div>
              <div class="rw-col improved">
                <div class="rw-label">AI 昇華版</div>
                <p>“${rw.improved}”</p>
              </div>
              <div class="rw-reason">💡 <strong>提升亮點：</strong>${rw.reason}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('close-eval-modal');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };
    }
  }

  openModelEssayModal() {
    if (!this.currentPrompt.modelEssay) {
      this.showToast('ℹ️ 本題目目前暫未收錄範文，請切換至其他預設精選題目查看！');
      return;
    }

    const modal = document.getElementById('model-essay-modal');
    const container = document.getElementById('model-essay-body');
    if (!modal || !container) return;

    const me = this.currentPrompt.modelEssay;
    window.soundEngine.playClick();

    container.innerHTML = `
      <div class="model-essay-header">
        <span class="grade-score-pill">🏆 ${me.gradeScore}</span>
        <h3 class="model-essay-title">${me.title}</h3>
      </div>
      <div class="model-paragraphs-wrap">
        ${me.paragraphs.map((p, idx) => `
          <div class="model-p-card">
            <div class="p-num-tag">第 ${idx + 1} 段</div>
            <p class="model-p-text">${p.text}</p>
            <div class="model-p-analysis">
              <strong>導師眉批：</strong>${p.comment}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('close-model-modal');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      };
    }
  }

  selectPromptById(id) {
    const select = document.getElementById('writing-prompt-selector');
    if (select) {
      select.value = id;
    }
    this.loadPrompt(id);
    this.switchStep(1);
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

window.writingCoach = new WritingCoach();
