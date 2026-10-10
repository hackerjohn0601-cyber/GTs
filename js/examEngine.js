// Adaptive Exam Simulator and Quiz Engine
class ExamEngine {
  constructor() {
    this.currentPaper = null;
    this.currentIndex = 0;
    this.userAnswers = {}; // { qId: optionIndex }
    this.flaggedQuestions = new Set();
    this.isExamActive = false;
    this.isExamSubmitted = false;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.isTimerPaused = false;
    this.examMode = 'strict'; // 'strict' (交卷後看解析) or 'practice' (即時看解析)
    this.mistakeNotebook = JSON.parse(localStorage.getItem('omnilearn_mistakes') || '[]');
    this.currentCatalogFilter = 'all';
  }

  init() {
    this.bindEvents();
    this.renderPaperCatalog();
    this.renderMistakesList();
  }

  bindEvents() {
    // Mode switch: Catalog vs Active Exam vs Mistakes
    const viewTabs = document.querySelectorAll('.exam-view-tab');
    viewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        this.switchExamView(view);
      });
    });

    // Custom Quiz Generator Modal Trigger
    const customGenBtn = document.getElementById('open-custom-quiz-modal');
    if (customGenBtn) {
      customGenBtn.addEventListener('click', () => {
        this.openCustomQuizModal();
      });
    }

    // Top-left HUD "重出一份新考卷" Button
    const rerollBtn = document.getElementById('exam-reroll-btn');
    if (rerollBtn) {
      rerollBtn.addEventListener('click', () => {
        this.rerollExam();
      });
    }

    // Report Banner "重出一份新考卷" Button
    const reportRerollBtn = document.getElementById('report-reroll-btn');
    if (reportRerollBtn) {
      reportRerollBtn.addEventListener('click', () => {
        this.rerollExam();
      });
    }

    // Submit Exam Button
    const submitBtn = document.getElementById('submit-exam-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.confirmSubmitExam();
      });
    }

    // Prev / Next question navigation
    const prevBtn = document.getElementById('exam-prev-btn');
    const nextBtn = document.getElementById('exam-next-btn');
    const flagBtn = document.getElementById('exam-flag-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex <= 0) {
          if (window.showAppToast) window.showAppToast('ℹ️ 目前已經是第 1 題囉！');
          return;
        }
        this.goToQuestion(this.currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentPaper && this.currentIndex >= this.currentPaper.questions.length - 1) {
          this.confirmSubmitExam();
        } else {
          this.goToQuestion(this.currentIndex + 1);
        }
      });
    }

    if (flagBtn) {
      flagBtn.addEventListener('click', () => {
        this.toggleFlagCurrentQuestion();
      });
    }

    // Toggle Jump Sheet Drawer
    const jumpToggle = document.getElementById('toggle-jump-sheet-btn');
    if (jumpToggle) {
      jumpToggle.addEventListener('click', () => {
        const sheet = document.getElementById('exam-jump-sheet');
        if (sheet) sheet.classList.toggle('active');
      });
    }

    // Keyboard shortcuts for quick answering (A, B, C, D or 1, 2, 3, 4)
    window.addEventListener('keydown', (e) => {
      if (!this.isExamActive || this.isExamSubmitted) return;
      // Do not trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const key = e.key.toUpperCase();
      let optIdx = -1;
      if (key === 'A' || key === '1') optIdx = 0;
      else if (key === 'B' || key === '2') optIdx = 1;
      else if (key === 'C' || key === '3') optIdx = 2;
      else if (key === 'D' || key === '4') optIdx = 3;

      if (optIdx >= 0) {
        this.selectOption(optIdx);
      }
    });

    // Retake mistake questions
    const retakeMistakesBtn = document.getElementById('retake-all-mistakes-btn');
    if (retakeMistakesBtn) {
      retakeMistakesBtn.addEventListener('click', () => {
        this.startMistakesRetake();
      });
    }

    // Clear mistake notebook
    const clearMistakesBtn = document.getElementById('clear-mistakes-btn');
    if (clearMistakesBtn) {
      clearMistakesBtn.addEventListener('click', () => {
        if (window.showAppConfirm) {
          window.showAppConfirm({
            title: '🗑️ 清空錯題本確認',
            message: '確定要清空所有的錯題記錄嗎？此操作無法撤銷。',
            confirmText: '確認清空',
            cancelText: '取消',
            onConfirm: () => {
              this.mistakeNotebook = [];
              localStorage.removeItem('omnilearn_mistakes');
              this.renderMistakesList();
              if (window.showAppToast) window.showAppToast('已成功清空錯題本！');
            }
          });
        } else {
          if (confirm('確定要清空所有的錯題記錄嗎？')) {
            this.mistakeNotebook = [];
            localStorage.removeItem('omnilearn_mistakes');
            this.renderMistakesList();
          }
        }
      });
    }
  }

  renderPaperCatalog(filterGrade = 'all') {
    this.currentCatalogFilter = filterGrade;
    const filterContainer = document.getElementById('catalog-grade-filters');
    const container = document.getElementById('exam-papers-catalog-grid');
    if (!container || !window.EXAM_DATA || !window.EXAM_DATA.papers) return;

    // Render Grade Filter Tabs
    if (filterContainer) {
      const allPapers = window.EXAM_DATA.papers;
      const countMap = {
        'all': allPapers.length,
        'g7': allPapers.filter(p => p.id.includes('g7') || p.id.includes('photo')).length,
        'g8': allPapers.filter(p => p.id.includes('g8')).length,
        'g9': allPapers.filter(p => p.id.includes('g9')).length,
        'senior': allPapers.filter(p => p.id.includes('senior')).length
      };

      filterContainer.innerHTML = `
        <button class="catalog-filter-btn ${filterGrade === 'all' ? 'active' : ''}" data-filter="all">
          🌟 全部試卷 (${countMap.all})
        </button>
        <button class="catalog-filter-btn ${filterGrade === 'g7' ? 'active' : ''}" data-filter="g7">
          🟢 國一七年級 (${countMap.g7})
        </button>
        <button class="catalog-filter-btn ${filterGrade === 'g8' ? 'active' : ''}" data-filter="g8">
          🔦 國二八年級 (${countMap.g8})
        </button>
        <button class="catalog-filter-btn ${filterGrade === 'g9' ? 'active' : ''}" data-filter="g9">
          🚀 國三會考衝刺 (${countMap.g9})
        </button>
        <button class="catalog-filter-btn ${filterGrade === 'senior' ? 'active' : ''}" data-filter="senior">
          🧬 高中學測分科 (${countMap.senior})
        </button>
      `;

      filterContainer.querySelectorAll('.catalog-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const f = btn.dataset.filter;
          window.soundEngine.playClick();
          this.renderPaperCatalog(f);
        });
      });
    }

    // Filter papers
    let papers = window.EXAM_DATA.papers;
    if (filterGrade === 'g7') {
      papers = papers.filter(p => p.id.includes('g7') || p.id.includes('photo'));
    } else if (filterGrade === 'g8') {
      papers = papers.filter(p => p.id.includes('g8'));
    } else if (filterGrade === 'g9') {
      papers = papers.filter(p => p.id.includes('g9'));
    } else if (filterGrade === 'senior') {
      papers = papers.filter(p => p.id.includes('senior'));
    }

    if (papers.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
          <p style="font-size: 1.1rem;">目前此分類尚無預設試卷，可點擊上方「🎲 AI 智慧自訂組卷器」自動出題！</p>
        </div>
      `;
      return;
    }

    container.innerHTML = papers.map(p => `
      <div class="exam-paper-card" data-id="${p.id}" title="點擊卡片直接進入測驗">
        <div class="paper-top-info">
          <span class="subject-badge">${p.subjectIcon} ${p.subject}</span>
          <span class="duration-badge">⏱️ ${p.durationMinutes} 分鐘</span>
        </div>
        <h3 class="paper-card-title">${p.title}</h3>
        <p class="paper-card-desc">${p.description}</p>
        <div class="paper-meta-row">
          <span>📚 ${p.questions.length} 道精選考題</span>
          <span>🎓 ${p.grade}</span>
        </div>
        <div class="paper-actions">
          <button class="start-paper-btn primary" data-id="${p.id}" data-mode="strict">
            🚀 正式模擬考模式
          </button>
          <button class="start-paper-btn practice" data-id="${p.id}" data-mode="practice">
            💡 邊做邊看詳解模式
          </button>
        </div>
        <div style="margin-top: 0.65rem; text-align: right; font-size: 0.8rem; color: var(--accent-cyan); font-weight: 600;">
          點擊卡片直接測驗 ➔
        </div>
      </div>
    `).join('');

    // Clicking mode buttons
    container.querySelectorAll('.start-paper-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const mode = btn.dataset.mode;
        this.loadPaperById(id, mode);
      });
    });

    // Clicking entire card
    container.querySelectorAll('.exam-paper-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        this.loadPaperById(id, 'practice');
      });
    });
  }

  loadPaperById(paperId, mode = 'strict') {
    if (!window.EXAM_DATA || !window.EXAM_DATA.papers) return;
    const paper = window.EXAM_DATA.papers.find(p => p.id === paperId) || window.EXAM_DATA.papers[0];
    if (!paper) return;
    this.lastExamParams = {
      type: 'standard',
      paperId: paper.id,
      mode
    };
    this.startExamWithPaper(paper, mode);
    if (window.appRouter && window.appRouter.currentRoute !== 'quiz') {
      window.appRouter.navigateTo('quiz');
    }
  }

  startExamWithPaper(paper, mode = 'strict') {
    window.soundEngine.playCorrect();
    this.currentPaper = paper;
    this.examMode = mode;
    this.currentIndex = 0;
    this.userAnswers = {};
    this.flaggedQuestions.clear();
    this.isExamActive = true;
    this.isExamSubmitted = false;
    this.timerSeconds = (paper.durationMinutes || 15) * 60;

    // Switch view to active exam room
    this.switchExamView('session');

    // Update Paper header
    const titleEl = document.getElementById('exam-session-title');
    const modeBadge = document.getElementById('exam-session-mode-badge');
    if (titleEl) titleEl.textContent = paper.title;
    if (modeBadge) {
      modeBadge.textContent = mode === 'strict' ? '🎯 正式模考模式' : '💡 即時解題自習模式';
      modeBadge.className = `exam-mode-badge ${mode}`;
    }

    // Start countdown timer
    this.startTimer();

    // Render first question
    this.renderCurrentQuestion();
    this.renderJumpSheet();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    const timerDisplay = document.getElementById('exam-countdown-timer');

    const updateDisplay = () => {
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      const fmt = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      if (timerDisplay) {
        timerDisplay.textContent = fmt;
        if (this.timerSeconds <= 120) {
          timerDisplay.classList.add('urgent');
        } else {
          timerDisplay.classList.remove('urgent');
        }
      }
    };

    updateDisplay();

    this.timerInterval = setInterval(() => {
      if (this.isTimerPaused || !this.isExamActive || this.isExamSubmitted) return;
      this.timerSeconds--;
      updateDisplay();
      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert('⏰ 考試時間到！系統即將為您自動交卷。');
        this.submitExam();
      }
    }, 1000);
  }

  renderCurrentQuestion() {
    if (!this.currentPaper) return;
    const q = this.currentPaper.questions[this.currentIndex];
    if (!q) return;

    const total = this.currentPaper.questions.length;
    const qNumEl = document.getElementById('current-q-number');
    const qProgressEl = document.getElementById('exam-q-progress-bar');
    const qTextEl = document.getElementById('exam-question-text');
    const optionsContainer = document.getElementById('exam-options-container');
    const practiceBox = document.getElementById('practice-instant-explanation');
    const flagBtn = document.getElementById('exam-flag-btn');

    if (qNumEl) qNumEl.textContent = `第 ${this.currentIndex + 1} 題 / 共 ${total} 題`;
    if (qProgressEl) {
      const pct = ((this.currentIndex + 1) / total) * 100;
      qProgressEl.style.width = `${pct}%`;
    }

    if (qTextEl) {
      qTextEl.textContent = q.question;
    }

    const isFlagged = this.flaggedQuestions.has(q.id);
    if (flagBtn) {
      flagBtn.classList.toggle('active', isFlagged);
      flagBtn.innerHTML = isFlagged ? '★ 已標記複查' : '☆ 標記複查';
    }

    const currentAns = this.userAnswers[q.id];

    // Render options
    optionsContainer.innerHTML = q.options.map((opt, idx) => {
      const isSelected = currentAns === idx;
      let optClass = 'exam-option-card';
      if (isSelected) optClass += ' selected';

      // If practice mode and answered, show right/wrong instantly
      if (this.examMode === 'practice' && currentAns !== undefined) {
        if (idx === q.answer) optClass += ' correct';
        else if (isSelected && idx !== q.answer) optClass += ' wrong';
      }

      return `
        <div class="${optClass}" data-idx="${idx}">
          <div class="option-key-badge">${['A', 'B', 'C', 'D'][idx]}</div>
          <div class="option-text">${this.escapeHtml(opt)}</div>
          <div class="option-shortcut-hint">快捷鍵 [${idx + 1}]</div>
        </div>
      `;
    }).join('');

    optionsContainer.querySelectorAll('.exam-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        this.selectOption(idx);
      });
    });

    // Practice explanation box
    if (practiceBox) {
      if (this.examMode === 'practice' && currentAns !== undefined) {
        practiceBox.style.display = 'block';
        const isRight = currentAns === q.answer;
        practiceBox.innerHTML = `
          <div class="instant-verdict ${isRight ? 'correct' : 'wrong'}">
            ${isRight ? '🎉 恭喜回答正確！' : '❌ 很可惜答錯了，請仔細閱讀下方解析：'}
          </div>
          <p class="instant-explanation-text">${q.explanation}</p>
          <div class="instant-kp-badge">💡 考點：${q.knowledgePoint}</div>
        `;
      } else {
        practiceBox.style.display = 'none';
      }
    }

    // Update Next and Prev buttons state
    const nextBtn = document.getElementById('exam-next-btn');
    const prevBtn = document.getElementById('exam-prev-btn');

    if (nextBtn) {
      if (this.currentIndex >= total - 1) {
        nextBtn.innerHTML = '🏁 答完交卷 ➔';
        nextBtn.className = 'nav-exam-btn submit-highlight';
      } else {
        nextBtn.innerHTML = '下一題 →';
        nextBtn.className = 'nav-exam-btn';
      }
    }

    if (prevBtn) {
      prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
    }

    // Update Jump sheet indicators
    this.renderJumpSheet();

    // Update Q比 peek bubble text & HUD trigger text
    const peekText = document.getElementById('ai-widget-peek-text');
    if (peekText) {
      peekText.textContent = `🐾 第 ${this.currentIndex + 1} 題提示與解析！`;
    }
    const hudTriggerText = document.querySelector('#hud-qbi-tutor-trigger .hud-qbi-text');
    if (hudTriggerText) {
      hudTriggerText.textContent = `💡 點我問 Q比 第 ${this.currentIndex + 1} 題提示`;
    }

    // If Q比 AI Tutor drawer is currently open, dynamically sync the question briefing!
    if (window.aiTutor && window.aiTutor.isOpen && typeof window.aiTutor.provideExamQuestionAssistance === 'function') {
      window.aiTutor.provideExamQuestionAssistance(false);
    }
  }

  getCurrentQuestionContext() {
    if (!this.isExamActive || !this.currentPaper || !this.currentPaper.questions) return null;
    const q = this.currentPaper.questions[this.currentIndex];
    if (!q) return null;
    return {
      paperTitle: this.currentPaper.title,
      examMode: this.examMode,
      qIndex: this.currentIndex,
      totalCount: this.currentPaper.questions.length,
      question: q,
      userAnswer: this.userAnswers[q.id]
    };
  }

  selectOption(optIdx) {
    if (this.isExamSubmitted) return;
    const q = this.currentPaper.questions[this.currentIndex];
    if (!q) return;

    this.userAnswers[q.id] = optIdx;

    if (optIdx === q.answer) {
      window.soundEngine.playCorrect();
    } else {
      window.soundEngine.playWrong();
    }

    this.renderCurrentQuestion();

    // If Q比 AI Tutor drawer is currently open, give instant diagnostic reaction
    if (window.aiTutor && window.aiTutor.isOpen && typeof window.aiTutor.provideExamOptionFeedback === 'function') {
      window.aiTutor.provideExamOptionFeedback(optIdx);
    }
  }

  toggleFlagCurrentQuestion() {
    const q = this.currentPaper.questions[this.currentIndex];
    if (!q) return;

    if (this.flaggedQuestions.has(q.id)) {
      this.flaggedQuestions.delete(q.id);
    } else {
      this.flaggedQuestions.add(q.id);
    }
    window.soundEngine.playClick();
    this.renderCurrentQuestion();
  }

  goToQuestion(idx) {
    if (!this.currentPaper) return;
    if (idx < 0 || idx >= this.currentPaper.questions.length) return;
    this.currentIndex = idx;
    window.soundEngine.playClick();
    this.renderCurrentQuestion();
  }

  renderJumpSheet() {
    const container = document.getElementById('exam-jump-sheet-grid');
    if (!container || !this.currentPaper) return;

    container.innerHTML = this.currentPaper.questions.map((q, idx) => {
      const isAnswered = this.userAnswers[q.id] !== undefined;
      const isFlagged = this.flaggedQuestions.has(q.id);
      const isCurrent = this.currentIndex === idx;

      let cls = 'jump-dot';
      if (isCurrent) cls += ' current';
      if (isAnswered) cls += ' answered';
      if (isFlagged) cls += ' flagged';

      return `
        <button class="${cls}" data-idx="${idx}" title="跳轉到第 ${idx + 1} 題">
          ${idx + 1}
          ${isFlagged ? '<span class="flag-star">★</span>' : ''}
        </button>
      `;
    }).join('');

    container.querySelectorAll('.jump-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        this.goToQuestion(idx);
      });
    });
  }

  confirmSubmitExam() {
    if (!this.currentPaper || !this.currentPaper.questions) {
      this.switchExamView('catalog');
      return;
    }
    const total = this.currentPaper.questions.length;
    const answeredCount = Object.keys(this.userAnswers).length;
    const unAnswered = total - answeredCount;

    let msg = '確定要送出答案並交卷結算成績嗎？';
    if (unAnswered > 0) {
      msg = `您還有 ${unAnswered} 道題目尚未作答！確定要現在交卷結算成績嗎？`;
    }

    if (window.showAppConfirm) {
      window.showAppConfirm({
        title: '🏁 結束測驗交卷確認',
        message: msg,
        confirmText: '確認交卷',
        cancelText: '繼續作答',
        onConfirm: () => {
          this.submitExam();
        }
      });
    } else {
      if (confirm(msg)) {
        this.submitExam();
      }
    }
  }

  submitExam() {
    this.isExamActive = false;
    this.isExamSubmitted = true;
    clearInterval(this.timerInterval);
    window.soundEngine.playVictory();

    const peekText = document.getElementById('ai-widget-peek-text');
    if (peekText) peekText.textContent = '🐾 問問 Q比！';

    // Grade Exam
    const questions = this.currentPaper.questions;
    let correctCount = 0;
    const wrongQuestions = [];

    questions.forEach(q => {
      const userAns = this.userAnswers[q.id];
      if (userAns === q.answer) {
        correctCount++;
      } else {
        wrongQuestions.push({
          question: q,
          userAns: userAns !== undefined ? userAns : -1,
          date: new Date().toLocaleDateString('zh-TW')
        });
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);

    // Save wrong questions to mistake notebook
    wrongQuestions.forEach(wq => {
      const exists = this.mistakeNotebook.some(m => m.question.id === wq.question.id);
      if (!exists) {
        this.mistakeNotebook.unshift(wq);
      }
    });
    localStorage.setItem('omnilearn_mistakes', JSON.stringify(this.mistakeNotebook));
    this.renderMistakesList();

    // Render Score Report
    this.renderScoreReport({
      score: scorePct,
      correctCount,
      totalCount: questions.length,
      wrongCount: questions.length - correctCount,
      timeUsed: (this.currentPaper.durationMinutes * 60) - this.timerSeconds,
      wrongQuestions
    });
  }

  renderScoreReport(report) {
    this.switchExamView('report');

    const scoreNum = document.getElementById('report-score-number');
    const accuracyEl = document.getElementById('report-accuracy-rate');
    const timeUsedEl = document.getElementById('report-time-used');
    const verdictEl = document.getElementById('report-verdict-text');
    const questionsReviewContainer = document.getElementById('report-questions-review-list');

    if (scoreNum) scoreNum.textContent = report.score;
    if (accuracyEl) accuracyEl.textContent = `${report.correctCount} / ${report.totalCount} 題正解 (${report.score}%)`;
    
    const mins = Math.floor(report.timeUsed / 60);
    const secs = report.timeUsed % 60;
    if (timeUsedEl) timeUsedEl.textContent = `作答用時：${mins} 分 ${secs} 秒`;

    if (verdictEl) {
      if (report.score === 100) verdictEl.textContent = '🌟 滿分封神！所有考點均已完美掌握！';
      else if (report.score >= 80) verdictEl.textContent = '👏 成績優異！概念邏輯相當紮實，錯題已為您收入錯題本。';
      else if (report.score >= 60) verdictEl.textContent = '💪 順利及格！建議點擊下方關聯教材加強薄弱知識點。';
      else verdictEl.textContent = '📖 仍需砥礪！請研讀解析並使用錯題重測功能反覆複習。';
    }

    if (window.qbiCompanion && typeof window.qbiCompanion.onExamCompleted === 'function') {
      window.qbiCompanion.onExamCompleted(report);
    }

    if (questionsReviewContainer && this.currentPaper) {
      questionsReviewContainer.innerHTML = this.currentPaper.questions.map((q, idx) => {
        const userAns = this.userAnswers[q.id];
        const isRight = userAns === q.answer;

        return `
          <div class="review-question-card ${isRight ? 'correct' : 'wrong'}">
            <div class="review-q-header">
              <span class="review-status-badge ${isRight ? 'correct' : 'wrong'}">
                ${isRight ? '✔ 正確' : '✖ 答錯'}
              </span>
              <span class="review-q-title">第 ${idx + 1} 題：${this.escapeHtml(q.question)}</span>
            </div>

            <div class="review-options-list">
              ${q.options.map((opt, optIdx) => {
                let badge = '';
                if (optIdx === q.answer) badge = '<span class="correct-tag">正解</span>';
                if (userAns === optIdx && !isRight) badge = '<span class="wrong-tag">你的選擇</span>';
                return `<div class="review-opt ${optIdx === q.answer ? 'is-correct' : ''} ${userAns === optIdx && !isRight ? 'is-user-wrong' : ''}">
                  ${opt} ${badge}
                </div>`;
              }).join('')}
            </div>

            <div class="review-explanation-box">
              <strong>📖 深度詳解剖析：</strong>
              <p>${q.explanation}</p>
              <div class="review-meta-actions">
                <span class="kp-tag">🎯 考點：${q.knowledgePoint}</span>
                ${q.relatedMaterialId ? `
                  <button class="review-read-mat-btn" data-mat-id="${q.relatedMaterialId}">
                    📚 開啟關聯教材深入研讀 ➔
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('');

      questionsReviewContainer.querySelectorAll('.review-read-mat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const matId = btn.dataset.matId;
          if (window.appRouter && window.searchEngine) {
            window.appRouter.navigateTo('materials');
            window.searchEngine.openReader(matId);
          }
        });
      });
    }

    // Bind report action buttons
    const reportRerollBtn = document.getElementById('report-reroll-btn');
    if (reportRerollBtn) {
      reportRerollBtn.onclick = () => {
        this.rerollExam();
      };
    }

    const retryBtn = document.getElementById('report-retry-btn');
    if (retryBtn) {
      retryBtn.onclick = () => {
        if (this.currentPaper) {
          this.startExamWithPaper(this.currentPaper, this.examMode);
        } else {
          this.switchExamView('catalog');
        }
      };
    }

    const returnCatalogBtn = document.getElementById('report-return-catalog-btn');
    if (returnCatalogBtn) {
      returnCatalogBtn.onclick = () => {
        this.switchExamView('catalog');
      };
    }

    const viewMistakesBtn = document.getElementById('report-view-mistakes-btn');
    if (viewMistakesBtn) {
      viewMistakesBtn.onclick = () => {
        this.switchExamView('mistakes');
      };
    }
  }

  renderMistakesList() {
    const container = document.getElementById('mistakes-list-container');
    const countBadge = document.getElementById('mistakes-count-badge');
    if (!container) return;

    if (countBadge) {
      countBadge.textContent = `${this.mistakeNotebook.length} 道錯題`;
    }

    if (this.mistakeNotebook.length === 0) {
      container.innerHTML = `
        <div class="empty-mistakes-card">
          <div class="empty-icon">🎉</div>
          <h3>太棒了！目前沒有未攻克的錯題</h3>
          <p>在測驗中答錯的題目會自動保存在這裡，供你隨時進行專項錯題重測。</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.mistakeNotebook.map((item, idx) => `
      <div class="mistake-item-card">
        <div class="mistake-top">
          <span class="mistake-subject">${item.question.topic || item.question.knowledgePoint}</span>
          <span class="mistake-date">收錄日期：${item.date}</span>
        </div>
        <h4 class="mistake-title">Q${idx + 1}. ${this.escapeHtml(item.question.question)}</h4>
        <div class="mistake-ans-row">
          <span class="correct-text">正確答案：${item.question.options[item.question.answer]}</span>
        </div>
        <p class="mistake-expl">${item.question.explanation}</p>
        <div class="mistake-actions">
          <button class="single-retry-btn" data-idx="${idx}">⚡ 單獨重測此題</button>
          <button class="remove-mistake-btn" data-idx="${idx}">🗑️ 移除此題</button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.single-retry-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const item = this.mistakeNotebook[idx];
        if (item) {
          const singlePaper = {
            id: 'paper-single-retry-' + Date.now(),
            title: `錯題專項重測：${item.question.knowledgePoint}`,
            subject: '錯題鞏固',
            subjectIcon: '🎯',
            durationMinutes: 5,
            questions: [item.question]
          };
          this.startExamWithPaper(singlePaper, 'practice');
        }
      });
    });

    container.querySelectorAll('.remove-mistake-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        this.mistakeNotebook.splice(idx, 1);
        localStorage.setItem('omnilearn_mistakes', JSON.stringify(this.mistakeNotebook));
        this.renderMistakesList();
      });
    });
  }

  startMistakesRetake() {
    if (this.mistakeNotebook.length === 0) {
      alert('目前錯題本空空如也，沒有需要重測的題目！');
      return;
    }

    const mistakePaper = {
      id: 'paper-mistakes-retake-' + Date.now(),
      title: '🔥 錯題本全員回歸特訓試卷',
      subject: '錯題殲滅戰',
      subjectIcon: '⚔️',
      durationMinutes: Math.max(5, this.mistakeNotebook.length * 2),
      questions: this.mistakeNotebook.map(m => m.question)
    };

    this.startExamWithPaper(mistakePaper, 'strict');
  }

  generateDynamicQuizFromTopic(topicTitle, snippet) {
    const titleLower = (topicTitle + ' ' + (snippet || '')).toLowerCase();

    // 1. If Photosynthesis -> 100% exact Photosynthesis quiz
    if (titleLower.includes('光合') || titleLower.includes('photosynthesis') || titleLower.includes('葉綠') || titleLower.includes('暗反應') || titleLower.includes('卡爾文')) {
      const photoPaper = window.EXAM_DATA.papers.find(p => p.id === 'paper-bio-photosynthesis');
      if (photoPaper) {
        if (window.showAppToast) window.showAppToast('🌿 已精準鎖定：國中生物「植物光合作用」專屬測驗卷！');
        this.startExamWithPaper(photoPaper, 'practice');
        return;
      }
    }

    // 2. If Grade 7 Biology 1-1 to 1-3 -> Cells & Life phenomenon
    if (titleLower.includes('細胞') || titleLower.includes('生命') || titleLower.includes('擴散') || titleLower.includes('滲透') || (titleLower.includes('國一') && titleLower.includes('生物'))) {
      const bioCh1Paper = window.EXAM_DATA.papers.find(p => p.id === 'paper-g7-bio-ch1');
      if (bioCh1Paper) {
        if (window.showAppToast) window.showAppToast('🔬 已精準鎖定：國一生物第 1 章（生命與細胞）特訓卷！');
        this.startExamWithPaper(bioCh1Paper, 'practice');
        return;
      }
    }

    // 3. If Grade 7 Chinese 1-1 to 1-2 -> 背影與語文常識
    if (titleLower.includes('背影') || titleLower.includes('標點') || titleLower.includes('字體') || titleLower.includes('朱自清') || (titleLower.includes('國一') && titleLower.includes('國文'))) {
      const chiPaper = window.EXAM_DATA.papers.find(p => p.id === 'paper-g7-chinese-ch1');
      if (chiPaper) {
        if (window.showAppToast) window.showAppToast('✍️ 已精準鎖定：國一國文第 1 單元（背影與字體）特訓卷！');
        this.startExamWithPaper(chiPaper, 'practice');
        return;
      }
    }

    // 4. If Grade 7 Math 1-1 to 1-2 -> 負數數線與指數律
    if (titleLower.includes('數線') || titleLower.includes('負數') || titleLower.includes('指數律') || titleLower.includes('科學記號') || (titleLower.includes('國一') && titleLower.includes('數學'))) {
      const mathPaper = window.EXAM_DATA.papers.find(p => p.id === 'paper-g7-math-ch1');
      if (mathPaper) {
        if (window.showAppToast) window.showAppToast('🔢 已精準鎖定：國一數學第 1 章（負數數線與指數律）專項卷！');
        this.startExamWithPaper(mathPaper, 'practice');
        return;
      }
    }

    // 5. If English
    if (titleLower.includes('english') || titleLower.includes('grammar') || titleLower.includes('essay') || titleLower.includes('英文')) {
      const engPaper = window.EXAM_DATA.papers.find(p => p.id === 'paper-english-gept');
      if (engPaper) {
        this.startExamWithPaper(engPaper, 'practice');
        return;
      }
    }

    // Default Topic-Adaptive Paper
    const dynamicPaper = {
      id: 'paper-dyn-' + Date.now(),
      title: `⚡ AI 智慧速測：「${topicTitle}」核心觀念測驗`,
      subject: 'AI 專屬題庫',
      subjectIcon: '🎯',
      durationMinutes: 6,
      description: `針對「${topicTitle}」核心知識點生成之精準診斷試卷。`,
      questions: [
        {
          id: 'dyn-q1',
          type: 'single',
          question: `關於「${topicTitle}」的核心概念，下列何者推論最為客觀嚴謹？`,
          options: [
            `A. 它是該學科領域的核心基石，需要結合定義與實務脈絡進行系統理解。`,
            `B. 它是一種完全不受任何自然法則或邏輯條件制約的現象。`,
            `C. 它是近代才被憑空發明的虛構概念，無實際應用價值。`,
            `D. 只要死記硬背名稱，不需要理解其內在因果邏輯即可精通。`
          ],
          answer: 0,
          explanation: `【正解分析】：A 選項正確。深入掌握「${topicTitle}」必須把握其底層邏輯與適用邊界。`,
          knowledgePoint: `${topicTitle} 核心定義與思維模型`,
          relatedMaterialId: null
        }
      ]
    };

    this.startExamWithPaper(dynamicPaper, 'practice');
  }

  openCustomQuizModal() {
    const modal = document.getElementById('custom-quiz-generator-modal');
    if (!modal) return;
    modal.classList.add('active');

    const generateBtn = document.getElementById('do-generate-custom-quiz-btn');
    if (generateBtn) {
      generateBtn.onclick = () => {
        const subject = document.getElementById('custom-quiz-subject').value;
        const count = parseInt(document.getElementById('custom-quiz-count').value, 10);
        const mode = document.getElementById('custom-quiz-mode').value;
        this.generateCustomExam(subject, count, mode);
        modal.classList.remove('active');
      };
    }

    const closeBtn = document.getElementById('close-custom-quiz-modal');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
      };
    }
  }

  generateCustomExam(subject, count, mode) {
    let eligiblePapers = window.EXAM_DATA.papers;

    if (subject === 'science' || subject === 'bio_science') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-bio-photosynthesis' || p.id === 'paper-g7-bio-ch1');
    } else if (subject === 'g8_phy') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-g8-phy-optics');
    } else if (subject === 'g8_math') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-g8-math-pythagoras');
    } else if (subject === 'g9_science') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-g9-cap-science');
    } else if (subject === 'g9_math') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-g9-cap-math');
    } else if (subject === 'senior_science') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-senior-physics-bio');
    } else if (subject === 'senior_math') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-senior-math-poly');
    } else if (subject === 'writing' || subject === 'chinese') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-g7-chinese-ch1');
    } else if (subject === 'english') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-english-gept');
    } else if (subject === 'math') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-g7-math-ch1');
    } else if (subject === 'photosynthesis') {
      eligiblePapers = window.EXAM_DATA.papers.filter(p => p.id === 'paper-bio-photosynthesis');
    }

    let allQs = [];
    eligiblePapers.forEach(p => {
      if (p.questions && p.questions.length > 0) {
        allQs = allQs.concat(p.questions);
      }
    });

    if (allQs.length === 0) {
      window.EXAM_DATA.papers.forEach(p => { allQs = allQs.concat(p.questions); });
    }

    // Guarantee: if allQs is less than requested count, pool from other papers
    if (allQs.length < count) {
      const remainingNeeded = count - allQs.length;
      const otherPapers = window.EXAM_DATA.papers.filter(p => !eligiblePapers.includes(p));
      let fallbackQs = [];
      otherPapers.forEach(p => { fallbackQs = fallbackQs.concat(p.questions); });
      fallbackQs.sort(() => 0.5 - Math.random());
      allQs = allQs.concat(fallbackQs.slice(0, remainingNeeded));
    }

    // Deep clone and shuffle questions and their options thoroughly
    const processedQuestions = this.shuffleQuestionsAndOptions(allQs);

    // Pick EXACTLY the requested question count
    const picked = processedQuestions.slice(0, Math.min(count, processedQuestions.length));

    // Save configuration for re-rolling
    this.lastExamParams = {
      type: 'custom',
      subject,
      count,
      mode
    };

    const subjectLabels = {
      'all': '跨學科全能',
      'science': '國一自然生物專項',
      'photosynthesis': '生物：光合作用專項',
      'g8_phy': '國二理化 (透鏡成像與熱量)',
      'g8_math': '國二數學 (乘法公式與畢氏定理)',
      'g9_science': '國三會考自然全真衝刺',
      'g9_math': '國三會考數學幾何專項',
      'senior_science': '高中學測自然跨科素養',
      'senior_math': '高中學測數學多項式與指對數',
      'writing': '國語文與寫作修辭',
      'chinese': '國語文與課文精讀',
      'english': '英文學術與語法',
      'math': '國一數學邏輯與數線運算'
    };

    const customPaper = {
      id: 'paper-custom-' + Date.now(),
      title: `🎲 自訂組卷：${subjectLabels[subject] || subject} 模擬衝刺卷`,
      subject: '自訂考卷',
      subjectIcon: '🎯',
      durationMinutes: Math.max(8, Math.round(picked.length * 1.5)),
      description: `包含 ${picked.length} 道精選無干擾專項考點題，隨機抽取思考題。`,
      questions: picked
    };

    this.startExamWithPaper(customPaper, mode);
  }

  shuffleQuestionsAndOptions(questions) {
    if (!Array.isArray(questions) || questions.length === 0) return [];
    
    // Deep clone questions
    const cloned = questions.map(q => JSON.parse(JSON.stringify(q)));

    // Fisher-Yates shuffle for questions
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }

    // Shuffle options for each question
    cloned.forEach(q => {
      if (Array.isArray(q.options) && q.options.length > 1 && typeof q.answer === 'number') {
        const letters = ['A', 'B', 'C', 'D', 'E'];
        // Strip existing letter prefixes
        const cleanOpts = q.options.map(opt => opt.replace(/^[A-E]\.\s*/, '').trim());
        const correctText = cleanOpts[q.answer];

        // Shuffle clean options
        for (let i = cleanOpts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cleanOpts[i], cleanOpts[j]] = [cleanOpts[j], cleanOpts[i]];
        }

        // Recompute correct answer index
        const newAnsIdx = cleanOpts.indexOf(correctText);
        if (newAnsIdx >= 0) {
          q.answer = newAnsIdx;
        }

        // Reapply A., B., C., D. prefixes
        q.options = cleanOpts.map((opt, idx) => `${letters[idx] || (idx + 1)}. ${opt}`);
      }
    });

    return cloned;
  }

  rerollExam() {
    window.soundEngine.playClick();
    const answeredCount = Object.keys(this.userAnswers).length;

    const executeReroll = () => {
      if (this.lastExamParams && this.lastExamParams.type === 'custom') {
        this.generateCustomExam(
          this.lastExamParams.subject,
          this.lastExamParams.count,
          this.lastExamParams.mode
        );
      } else if (this.lastExamParams && this.lastExamParams.type === 'standard') {
        this.rerollStandardExam(this.lastExamParams.paperId, this.lastExamParams.mode);
      } else if (this.currentPaper) {
        // Re-shuffle current paper
        const shuffled = this.shuffleQuestionsAndOptions(this.currentPaper.questions);
        const newPaper = {
          ...this.currentPaper,
          id: 'paper-reroll-' + Date.now(),
          title: this.currentPaper.title.replace(/\s*\(重新組卷\)/g, '') + ' (重新組卷)',
          questions: shuffled
        };
        this.startExamWithPaper(newPaper, this.examMode);
      } else {
        this.openCustomQuizModal();
      }

      if (window.showAppToast) {
        window.showAppToast('🎲 已成功為您重出一份全新思考試卷！祝作答順利！');
      }
    };

    if (answeredCount > 0 && !this.isExamSubmitted) {
      if (window.showAppConfirm) {
        window.showAppConfirm({
          title: '🎲 重出一份新考卷確認',
          message: `您目前已作答 ${answeredCount} 題，確定要重出一份全新考卷嗎？目前的作答進度將重新開始。`,
          confirmText: '立即重出新卷',
          cancelText: '繼續作答',
          onConfirm: executeReroll
        });
      } else if (confirm('確定要放棄當前作答進度並重出一份全新考卷嗎？')) {
        executeReroll();
      }
    } else {
      executeReroll();
    }
  }

  rerollStandardExam(paperId, mode = 'strict') {
    const originalPaper = window.EXAM_DATA.papers.find(p => p.id === paperId);
    if (!originalPaper) return;

    // Pick 12 questions from original paper (each paper has 16 questions)
    const shuffled = this.shuffleQuestionsAndOptions(originalPaper.questions);
    const pickCount = Math.min(shuffled.length, 12);
    const pickedQuestions = shuffled.slice(0, pickCount);

    const newPaper = {
      ...originalPaper,
      id: 'paper-standard-reroll-' + Date.now(),
      title: originalPaper.title.replace(/\s*\(重新組卷\)/g, '') + ' (重新組卷)',
      durationMinutes: Math.max(10, Math.round(pickedQuestions.length * 1.5)),
      description: `已隨機更換題目與選項順序，包含 ${pickedQuestions.length} 道深度考點思考題。`,
      questions: pickedQuestions
    };

    this.startExamWithPaper(newPaper, mode);
  }

  switchExamView(viewName) {
    if (viewName === 'session' && (!this.currentPaper || !this.currentPaper.questions)) {
      // Auto-load default paper so session is never blank
      if (window.EXAM_DATA && window.EXAM_DATA.papers && window.EXAM_DATA.papers.length > 0) {
        this.loadPaperById(window.EXAM_DATA.papers[0].id, 'practice');
        return;
      }
    }

    const catalogView = document.getElementById('exam-catalog-view');
    const sessionView = document.getElementById('exam-session-view');
    const reportView = document.getElementById('exam-report-view');
    const mistakesView = document.getElementById('exam-mistakes-view');

    const tabs = document.querySelectorAll('.exam-view-tab');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.view === viewName));

    if (catalogView) catalogView.style.display = viewName === 'catalog' ? 'block' : 'none';
    if (sessionView) sessionView.style.display = viewName === 'session' ? 'block' : 'none';
    if (reportView) reportView.style.display = viewName === 'report' ? 'block' : 'none';
    if (mistakesView) mistakesView.style.display = viewName === 'mistakes' ? 'block' : 'none';

    if (viewName === 'catalog') {
      this.renderPaperCatalog(this.currentCatalogFilter || 'all');
    }
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

window.examEngine = new ExamEngine();
