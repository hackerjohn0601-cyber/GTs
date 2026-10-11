// Interactive AI Floating Companion & Study Assistant (Q-Bi / Q比 in GTs)
class AiTutor {
  constructor() {
    this.isOpen = false;
    this.lastExamBriefingKey = null;
    this.messages = [
      {
        role: 'assistant',
        text: '👋 你好！我是 **GTs (Go to Study)** 的伴學吉祥物兼 AI 導師 **Q比 (Q-Bi)** 🐾！<br>我精通**康軒版、翰林版、南一版**各年級教科書與會考考點！<br>你可以直接問我：<em>「幫我複習國一 1-1 到 1-2」</em>、<em>「考我光合作用」</em>或<em>「寫作開頭怎麼寫」</em>，Q比 隨時陪你搞懂所有難題！'
      }
    ];
  }

  init() {
    this.bindEvents();
    this.renderChatMessages();
    this.renderPresetPills();
  }

  bindEvents() {
    const triggerBtn = document.getElementById('ai-tutor-trigger-btn');
    const peekBubble = document.getElementById('ai-widget-peek-bubble');
    const closeBtn = document.getElementById('close-ai-tutor-btn');
    const sendBtn = document.getElementById('ai-send-msg-btn');
    const inputEl = document.getElementById('ai-chat-input');

    if (triggerBtn) {
      triggerBtn.onclick = (e) => {
        e.stopPropagation();
        this.handleWidgetClick();
      };
    }

    if (peekBubble) {
      peekBubble.onclick = (e) => {
        e.stopPropagation();
        this.handleWidgetClick();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        this.toggleChat(false);
      };
    }

    if (sendBtn) {
      sendBtn.onclick = () => {
        this.handleUserSend();
      };
    }

    if (inputEl) {
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleUserSend();
        }
      });
    }
  }

  handleWidgetClick() {
    if (window.examEngine && window.examEngine.isExamActive) {
      if (!this.isOpen) {
        this.openForCurrentExamQuestion();
      } else {
        this.toggleChat(false);
      }
    } else {
      this.toggleChat();
    }
  }

  toggleChat(forceState) {
    try {
      if (window.soundEngine && typeof window.soundEngine.playClick === 'function') {
        window.soundEngine.playClick();
      }
    } catch (e) {}

    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    const drawer = document.getElementById('ai-tutor-drawer');
    if (drawer) {
      drawer.classList.toggle('active', this.isOpen);
      if (this.isOpen) {
        // If an exam is currently active, immediately provide proactive question assistance!
        if (window.examEngine && window.examEngine.isExamActive) {
          this.provideExamQuestionAssistance(false);
        } else {
          this.renderPresetPills();
        }
        const msgContainer = document.getElementById('ai-chat-messages-container');
        if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
        const input = document.getElementById('ai-chat-input');
        if (input) setTimeout(() => input.focus(), 150);
      } else {
        this.lastExamBriefingKey = null;
      }
    }
    const badge = document.getElementById('tutor-badge-pulse');
    if (badge) {
      badge.style.display = this.isOpen ? 'none' : 'block';
    }
  }

  openForCurrentExamQuestion() {
    this.toggleChat(true);
    this.provideExamQuestionAssistance(true);
  }

  provideExamQuestionAssistance(forceRefresh = false) {
    if (!window.examEngine || typeof window.examEngine.getCurrentQuestionContext !== 'function') return;
    const ctx = window.examEngine.getCurrentQuestionContext();
    if (!ctx || !ctx.question) return;

    const q = ctx.question;
    const ansKey = ctx.userAnswer !== undefined ? `ans_${ctx.userAnswer}` : 'unanswered';
    const cacheKey = `${q.id}_${ansKey}`;

    if (!forceRefresh && this.lastExamBriefingKey === cacheKey) {
      this.renderExamSpecificPresets(ctx);
      const msgContainer = document.getElementById('ai-chat-messages-container');
      if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
      return;
    }
    this.lastExamBriefingKey = cacheKey;

    const optLetters = ['A', 'B', 'C', 'D'];
    const correctLetter = optLetters[q.answer] || 'A';
    const correctOptText = q.options[q.answer] || '';

    // Formulate clue and hint from question stem
    let thinkingHint = '';
    const stem = q.question;
    if (stem.includes('主要目的') || stem.includes('主要原因')) {
      thinkingHint = '留意題幹中的「主要目的/原因」，必須精準區分「本步驟核心目標」與「後續延伸效應」，避免步驟時序混淆！';
    } else if (stem.includes('完全來自於') || stem.includes('原料') || stem.includes('產物')) {
      thinkingHint = '追蹤反應物各元素原子守恆走向，回想同位素追蹤實驗（¹⁸O）證明的關鍵結論！';
    } else if (stem.includes('何者正確') || stem.includes('何者推論')) {
      thinkingHint = '抓出各選項中的絕對化詞彙（如「完全不受」、「直接昇華」），科學嚴謹題型中極端表述通常為干擾陷阱！';
    } else {
      thinkingHint = '鎖定題幹核心動詞與限制條件，回想課本定義與因果關係，先排除明顯不合理的干擾項！';
    }

    // Formulate User Answer Diagnostic Status
    let answerStatusHtml = '';
    if (ctx.userAnswer === undefined) {
      answerStatusHtml = `
        <div class="ai-exam-highlight-box warning">
          👉 <strong>目前作答進度</strong>：你尚未作答本題。<br>
          ⚡ <strong>排雷提醒</strong>：先用刪去法淘汰 2 個明顯與題意相悖的干擾選項，再對照正解因果推理！
        </div>
      `;
    } else if (ctx.userAnswer === q.answer) {
      answerStatusHtml = `
        <div class="ai-exam-highlight-box correct">
          🎉 <strong>作答診斷：完全答對！</strong><br>
          你選擇了 <strong>(${optLetters[ctx.userAnswer]})</strong>，推理思維完全正確！已透徹理解此考點核心邏輯！
        </div>
      `;
    } else {
      const userLetter = optLetters[ctx.userAnswer];
      const userOptText = q.options[ctx.userAnswer] || '';
      answerStatusHtml = `
        <div class="ai-exam-highlight-box wrong">
          ❌ <strong>作答診斷：落入常見命題陷阱！</strong><br>
          你剛才選擇了 <strong>(${userLetter})</strong>：<em>${this.escapeHtml(userOptText)}</em><br>
          🎯 <strong>本題正解為 (${correctLetter})</strong>！請對照下方解析理解兩者差異，會考千萬別再踩坑！
        </div>
      `;
    }

    // Material Link Button
    let materialBtnHtml = '';
    if (q.relatedMaterialId) {
      materialBtnHtml = `
        <div style="margin-top: 0.6rem;">
          <button class="ai-msg-action-btn" onclick="if(window.materialsEngine) window.materialsEngine.openMaterialModal('${q.relatedMaterialId}');">
            📖 查閱本題課綱對應教材圖解 ➔
          </button>
        </div>
      `;
    }

    const messageHtml = `
      <div class="ai-exam-brief-card">
        <div class="ai-exam-tag">🐾 Q比 考場即時解惑・第 ${ctx.qIndex + 1} / ${ctx.totalCount} 題</div>
        
        <div class="ai-exam-section-title">🎯 核心考點</div>
        <div style="font-size:0.83rem; color:#94a3b8; margin-bottom:0.4rem;">
          ${q.knowledgePoint || '核心觀念深度掌握'}
        </div>

        <div class="ai-exam-section-title">💡 題幹破題思路</div>
        <div class="ai-exam-highlight-box">
          ${thinkingHint}
        </div>

        <div class="ai-exam-section-title">🔍 為什麼是這個答案？深度詳解</div>
        <div class="ai-exam-highlight-box correct">
          <strong>【正確選項 (${correctLetter})】</strong>：${this.escapeHtml(correctOptText)}<br><br>
          ${this.formatMarkdown(q.explanation)}
        </div>

        <div class="ai-exam-section-title">📊 即時診斷與防坑指南</div>
        ${answerStatusHtml}

        ${materialBtnHtml}
      </div>
    `;

    this.messages.push({
      role: 'assistant',
      text: messageHtml
    });

    this.renderChatMessages();
    this.renderExamSpecificPresets(ctx);
  }

  provideExamOptionFeedback(optIdx) {
    if (!window.examEngine || typeof window.examEngine.getCurrentQuestionContext !== 'function') return;
    const ctx = window.examEngine.getCurrentQuestionContext();
    if (!ctx || !ctx.question) return;

    const q = ctx.question;
    const optLetters = ['A', 'B', 'C', 'D'];
    const chosenLetter = optLetters[optIdx];
    const isRight = optIdx === q.answer;

    if (isRight) {
      this.messages.push({
        role: 'assistant',
        text: `🎉 **Q比 喝采**：你選擇了 **(${chosenLetter})**，答對了！推理非常精準！點擊下方「⏩ 換下一題繼續問 Q比」繼續挑戰下一題！`
      });
    } else {
      const correctLetter = optLetters[q.answer];
      this.messages.push({
        role: 'assistant',
        text: `⚠️ **Q比 提醒**：你選擇了 **(${chosenLetter})**，但本題正確答案是 **(${correctLetter})** 喔！<br><em>${this.escapeHtml(q.options[optIdx])}</em> 是命題老師最常設置的陷阱干擾項。點擊下方「🔍 逐一剖析 4 個選項陷阱」來看看它是如何迷惑你的！`
      });
    }

    this.renderChatMessages();
    this.renderExamSpecificPresets(ctx);
  }

  renderExamSpecificPresets(ctx) {
    const container = document.getElementById('ai-chat-presets');
    if (!container) return;

    container.innerHTML = `
      <button class="chat-preset-btn" id="preset-breakdown-options">🔍 逐一剖析 4 個選項陷阱</button>
      <button class="chat-preset-btn" id="preset-mnemonic">💡 本題秒記口訣</button>
      <button class="chat-preset-btn" id="preset-next-question">⏩ 換下一題繼續問 Q比</button>
      <button class="chat-preset-btn" id="preset-refresh-briefing">🔄 重新整理本題解析</button>
    `;

    const optBtn = document.getElementById('preset-breakdown-options');
    if (optBtn) {
      optBtn.onclick = () => this.handleOptionBreakdownRequest();
    }

    const mnemBtn = document.getElementById('preset-mnemonic');
    if (mnemBtn) {
      mnemBtn.onclick = () => this.handleMnemonicRequest();
    }

    const nextBtn = document.getElementById('preset-next-question');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (window.examEngine) {
          if (window.examEngine.currentIndex < window.examEngine.currentPaper.questions.length - 1) {
            window.examEngine.goToQuestion(window.examEngine.currentIndex + 1);
            this.provideExamQuestionAssistance(true);
          } else {
            this.messages.push({
              role: 'assistant',
              text: '🏁 **這已經是本卷最後一題囉！**<br>若已檢查完畢，可以直接點擊考場右下角「🏁 答完交卷」查看完整診斷報告與錯題分析！'
            });
            this.renderChatMessages();
          }
        }
      };
    }

    const refreshBtn = document.getElementById('preset-refresh-briefing');
    if (refreshBtn) {
      refreshBtn.onclick = () => this.provideExamQuestionAssistance(true);
    }
  }

  handleOptionBreakdownRequest() {
    if (!window.examEngine || typeof window.examEngine.getCurrentQuestionContext !== 'function') return;
    const ctx = window.examEngine.getCurrentQuestionContext();
    if (!ctx || !ctx.question) return;

    const q = ctx.question;
    const optLetters = ['A', 'B', 'C', 'D'];

    window.soundEngine.playClick();
    this.messages.push({
      role: 'user',
      text: '請 Q比 幫我逐一剖析 4 個選項的陷阱！'
    });
    this.renderChatMessages();

    const typingIndicator = document.getElementById('ai-typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';

      let analysisHtml = `📋 **第 ${ctx.qIndex + 1} 題 4 個選項陷阱全拆解**：<br><br>`;

      q.options.forEach((optText, idx) => {
        const isCorrect = idx === q.answer;
        const letter = optLetters[idx];
        if (isCorrect) {
          analysisHtml += `
            <div class="ai-exam-highlight-box correct" style="margin-bottom:0.5rem;">
              ✅ <strong>選項 (${letter})【正確正解】</strong>：${this.escapeHtml(optText)}<br>
              💡 <em>正解因果</em>：符合課綱原理，因果推導嚴謹，完全對應題幹條件。
            </div>
          `;
        } else {
          let trapExplanation = '此選項偷換了因果概念或將後續實驗步驟提前，為常見的命題干擾項。';
          if (optText.includes('溶解') || optText.includes('脫色')) {
            trapExplanation = '注意！這是下一個「隔水加熱酒精水浴」的步驟，而非本步驟的功用，時序混淆陷阱！';
          } else if (optText.includes('藍黑') || optText.includes('顯色') || optText.includes('碘液')) {
            trapExplanation = '注意！這是最後一步「滴加碘液檢驗澱粉」的反應，不能與前期處理混為一談！';
          } else if (optText.includes('殺死') && optText.includes('細菌')) {
            trapExplanation = '植物實驗重點在於葉肉細胞與角質層軟化，殺死表面細菌並非實驗的探究核心目的。';
          } else if (optText.includes('完全') || optText.includes('不受') || optText.includes('死記')) {
            trapExplanation = '表述過於絕對或背離學科科學探究原則，大考中此類選項多為干擾誘答。';
          }

          analysisHtml += `
            <div class="ai-exam-highlight-box wrong" style="margin-bottom:0.5rem;">
              ❌ <strong>選項 (${letter})【干擾陷阱】</strong>：${this.escapeHtml(optText)}<br>
              ⚠️ <em>陷阱揭秘</em>：${trapExplanation}
            </div>
          `;
        }
      });

      this.messages.push({
        role: 'assistant',
        text: analysisHtml
      });
      this.renderChatMessages();
      window.soundEngine.playCorrect();
    }, 400);
  }

  handleMnemonicRequest() {
    if (!window.examEngine || typeof window.examEngine.getCurrentQuestionContext !== 'function') return;
    const ctx = window.examEngine.getCurrentQuestionContext();
    if (!ctx || !ctx.question) return;

    const q = ctx.question;
    const kp = q.knowledgePoint || '';
    const stem = q.question;

    window.soundEngine.playClick();
    this.messages.push({
      role: 'user',
      text: '請問這題有秒記口訣嗎？'
    });
    this.renderChatMessages();

    const typingIndicator = document.getElementById('ai-typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';

      let mnemonic = '';
      if (kp.includes('光合') || stem.includes('光合') || stem.includes('葉片') || stem.includes('酒精')) {
        mnemonic = `🌿 **光合作用實驗四步秒記口訣**：
<br><br>
🎵 <em>「一沸水破膜軟化，二隔水酒精脫色；<br>
三清水漂洗軟化，四滴碘藍黑顯澱！」</em>
<br><br>
✨ **考點口訣補充**：
- 氧氣（O₂）完全來自「水」，絕非二氧化碳！
- 光反應產 ATP，暗反應（碳反應）基質合葡萄糖！`;
      } else if (kp.includes('透鏡') || stem.includes('透鏡') || stem.includes('焦距')) {
        mnemonic = `🔬 **透鏡成像規律口訣**：
<br><br>
🎵 <em>「一倍焦距分虛實，兩倍焦距分大小；<br>
二倍外倒縮（照相機），一二間倒大（投影機）；<br>
焦點內正立虛像（放大鏡），近視凹透發散保眼明！」</em>`;
      } else if (kp.includes('畢氏') || kp.includes('乘法') || stem.includes('畢氏')) {
        mnemonic = `📐 **幾何與代數秒殺口訣**：
<br><br>
🎵 <em>「兩直角邊方相加，恆等斜邊平方跨；<br>
三四五、五十二十三、七二十四二十五，速算不用抓破頭！」</em>`;
      } else if (kp.includes('牛頓') || kp.includes('力學') || stem.includes('速度') || stem.includes('加速度')) {
        mnemonic = `🚀 **牛頓定律與運動學口訣**：
<br><br>
🎵 <em>「v-t 圖上求位移，面積一算就清晰；<br>
斜率代表加速度，F 等於 ma 真理固；<br>
作用反作用作用不同體，相互抵消大錯特錯記心底！」</em>`;
      } else {
        mnemonic = `💡 **${kp || '核心考點'} 必殺記憶口訣**：
<br><br>
🎵 <em>「抓題幹關鍵詞，因果邏輯看分明；<br>
先排極端干擾項，課本定義牢牢釘！」</em>`;
      }

      this.messages.push({
        role: 'assistant',
        text: mnemonic
      });
      this.renderChatMessages();
      window.soundEngine.playCorrect();
    }, 400);
  }

  renderPresetPills() {
    const container = document.getElementById('ai-chat-presets');
    if (!container) return;

    const presets = [
      '⚡ 國一 1-1 到 1-2 重點複習',
      '🔬 國二理化透鏡與熱學',
      '🚀 國三會考力學與電學',
      '🧬 高中學測跨科素養',
      '🌿 考我「光合作用」專屬試卷'
    ];

    container.innerHTML = presets.map(p => `
      <button class="chat-preset-btn" data-text="${p.replace(/^[^\s]+\s/, '')}">${p}</button>
    `).join('');

    container.querySelectorAll('.chat-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        this.processQuery(text);
      });
    });
  }

  handleUserSend() {
    const input = document.getElementById('ai-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.processQuery(text);
  }

  processQuery(userText) {
    window.soundEngine.playClick();
    this.messages.push({ role: 'user', text: userText });
    this.renderChatMessages();

    const typingIndicator = document.getElementById('ai-typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';
      const aiReply = this.generateResponse(userText);
      if (aiReply) {
        this.messages.push({ role: 'assistant', text: aiReply });
        this.renderChatMessages();
        window.soundEngine.playCorrect();
      }
    }, 400);
  }

  generateResponse(query) {
    const q = query.toLowerCase();

    // Check active exam context shortcuts
    if (window.examEngine && window.examEngine.isExamActive) {
      if (q.includes('陷阱') || q.includes('選項') || q.includes('干擾')) {
        this.handleOptionBreakdownRequest();
        return null;
      }
      if (q.includes('口訣') || q.includes('背') || q.includes('記法')) {
        this.handleMnemonicRequest();
        return null;
      }
      if (q.includes('下一題') || q.includes('換題')) {
        if (window.examEngine.currentIndex < window.examEngine.currentPaper.questions.length - 1) {
          window.examEngine.goToQuestion(window.examEngine.currentIndex + 1);
          this.provideExamQuestionAssistance(true);
          return null;
        }
      }
    }

    // 0. 版本差異與跨版本對照速查
    if ((q.includes('差別') || q.includes('不同') || q.includes('對照') || (q.includes('版本') && !q.includes('國一'))) && (q.includes('康軒') || q.includes('翰林') || q.includes('南一') || q.includes('課綱'))) {
      return `🔄 **康軒 ✕ 翰林 ✕ 南一：108 課綱三大版本差異深度解析**
<br><br>
💡 **各版本主要編排差異亮點**：
1. **國一生物（自然）**：
   - **翰林版**：唯一獨創將「1-2 生物圈的範圍」獨立立節（探討深海熱泉管蟲等）；且**光合作用在翰林版為 3-3**（3-2 為人體養分與能量）。
   - **康軒版**：光合作用編排於 **3-2 植物如何製造養分**；1-1 合併生命起源與生命四大現象。
   - **南一版**：章名定為「探索生命」，光合作用位於 **3-2**。
2. **國一國文（選文課次完全不同）**：
   - **康軒版**：第 1 課為宋天儀《雅量》、第 2 課《夏夜》、第 6 課為朱自清《背影》。
   - **翰林版**：第 1 課為楊喚《夏夜》、第 2 課《雅量》、第 3 課古蒙仁《吃冰的滋味》、第 5 課為《背影》。
   - **南一版**：第 1 課為嚴長壽《做一隻光彩的螢火蟲》、第 4 課沈復《兒時記趣》、第 5 課為《背影》。
<br><br>
<button class="ai-msg-action-btn" onclick="window.appRouter.navigateTo('materials'); if (window.searchEngine) window.searchEngine.openCurriculumMatrixModal();">
  📊 一鍵開啟「三大版本章節全面對照速查表」➔
</button>`;
    }

    // 1. 國一 1-1 到 1-2 / 康軒 / 翰林
    if ((q.includes('1-1') && q.includes('1-2')) || (q.includes('國一') && (q.includes('康軒') || q.includes('翰林') || q.includes('生物')))) {
      return `🎯 **已為您鎖定：國一 1-1 到 1-2 單元精準複習（康軒/翰林/南一版）**
<br><br>
📚 **核心高頻考點提煉**：
1. **1-1 生命的起源**：原始大氣無氧氣（O2）；生命四大現象（生長、生殖、感應、代謝），鐘乳石長大「不是」生命現象！
2. **1-2 細胞構造**：動植物細胞都有粒線體（能量工廠）；植物特有細胞壁與葉綠體（洋蔥表皮細胞無葉綠體）。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g7-bio-ch1','practice'); window.appRouter.navigateTo('quiz');">
  📝 立即進入「國一 1-1 到 1-2 專屬測驗卷」➔
</button>`;
    }

    // 2. 國二理化與數學 (透鏡、聲音、熱量、乘法公式、畢氏定理)
    if (q.includes('國二') || q.includes('八年級') || q.includes('透鏡') || q.includes('凸透鏡') || q.includes('凹透鏡') || q.includes('比熱') || q.includes('畢氏定理') || q.includes('乘法公式')) {
      if (q.includes('數') || q.includes('畢氏') || q.includes('乘法')) {
        return `📐 **國二數學核心考點（乘法公式與畢氏定理）**：
<br><br>
💡 **考點梳理**：
- **乘法公式**：(a + b)² = a² + 2ab + b²；(a + b)(a - b) = a² - b²。
- **畢氏定理**：直角三角形 a² + b² = c²。常用勾股整數比：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)。
- **兩點距離**：d = √[(x₂ - x₁)² + (y₂ - y₁)²]。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g8-math-pythagoras','practice'); window.appRouter.navigateTo('quiz');">
  📐 進入「國二數學乘法公式與畢氏定理專項卷」➔
</button>`;
      }
      return `🔬 **國二理化核心考點（透鏡成像、波動聲音、熱量比熱）**：
<br><br>
💡 **秒記口訣**：
- **凸透鏡成像**：物在兩倍焦距外 (p > 2f) 倒立縮小實像（照相機）；物在一到兩倍焦距間倒立放大實像（投影機）；物在焦點內成正立放大虛像（放大鏡）。
- **視力矯正**：近視眼影像在視網膜前，配戴「凹透鏡」發散光線矯正。
- **熱量公式**：H = m · s · ΔT。水的比熱最大（s=1），吸熱慢散熱慢。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g8-phy-optics','practice'); window.appRouter.navigateTo('quiz');">
  🔬 進入「國二理化透鏡與熱學專項卷」➔
</button>`;
    }

    // 3. 國三九年級教育會考 (牛頓定律、v-t 圖、電學、板塊、相似形)
    if (q.includes('國三') || q.includes('九年級') || q.includes('會考') || q.includes('牛頓') || q.includes('vt') || q.includes('歐姆') || q.includes('板塊') || q.includes('相似')) {
      if (q.includes('數') || q.includes('相似') || q.includes('圓周')) {
        return `📐 **國三會考數學幾何（相似形與圓周角）**：
<br><br>
💡 **會考高頻解題思維**：
- **相似形性質**：對應邊長比 = 對應高比 = 周長比；而「面積比等於邊長平方比（a² : b²）」。
- **圓形幾何**：圓周角等於所對弧度數的一半；「直徑所對的圓周角必為 90 度（直角）」。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g9-cap-math','practice'); window.appRouter.navigateTo('quiz');">
  📐 進入「國三會考數學幾何專項全真卷」➔
</button>`;
      }
      return `🚀 **國三會考自然 A++ 衝刺重點（力學、電學、地科）**：
<br><br>
💡 **會考必殺秘訣**：
- **v-t 圖判讀**：斜率等於加速度 a；圖形與時間軸圍成的面積等於位移 s！
- **牛頓第二定律**：F_net = m · a。第三定律作用力與反作用力作用在不同物體，絕不互相抵消。
- **歐姆定律與電功率**：V = I · R；P = I · V = I² · R。
- **台灣地質**：位於歐亞板塊與菲律賓海板塊之「聚合型邊界」，地震造山運動活躍。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g9-cap-science','practice'); window.appRouter.navigateTo('quiz');">
  🚀 進入「國三會考自然全真衝刺卷」➔
</button>`;
    }

    // 4. 高中學測與分科測驗 (中心法則、克卜勒、多項式)
    if (q.includes('高中') || q.includes('學測') || q.includes('分科') || q.includes('中心法則') || q.includes('克卜勒') || q.includes('多項式') || q.includes('餘式') || q.includes('對數')) {
      if (q.includes('數') || q.includes('多項式') || q.includes('對數') || q.includes('餘式')) {
        return `📈 **高中學測數學焦點（多項式餘式定理與對數運算）**：
<br><br>
💡 **學測必備公式**：
- **餘式定理**：多項式 f(x) 除以 (x - c) 的餘式恆等於 f(c)。
- **對數律**：log(a·b) = log a + log b；換底公式 log_a b = (log_c b) / (log_c a)。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-senior-math-poly','practice'); window.appRouter.navigateTo('quiz');">
  📈 進入「高中學測數學多項式與指對數專項卷」➔
</button>`;
      }
      return `🧬 **高中學測自然跨科素養（分子生物學與天體力學）**：
<br><br>
💡 **學測頂標核心**：
- **分子生物學中心法則**：DNA ──(轉錄)──> mRNA ──(轉譯)──> 蛋白質多肽鏈。
- **克卜勒三大定律**：軌道定律（橢圓軌道，太陽在一焦點）；等面積定律（近日點速率最快）；週期定律（T² / R³ = 常數）。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-senior-physics-bio','practice'); window.appRouter.navigateTo('quiz');">
  🧬 進入「高中學測自然跨科素養卷」➔
</button>`;
    }

    // 5. 光合作用專項 (100% 準確自然題目，絕無國英干擾)
    if (q.includes('光合') || q.includes('光反應') || q.includes('暗反應') || q.includes('葉綠')) {
      return `🌿 **植物光合作用（國一生物 3-2 康軒/翰林核心）**：
<br><br>
💡 **秒記口訣與必考重點**：
- **光反應（類囊體）**：吸收光能將「水」分解，釋放氧氣（O2），產生能量貨幣 ATP！
  <em>※ 大考絕對常考：氧氣完全來自於「水（H2O）」，絕非二氧化碳！</em>
- **暗反應/碳反應（基質）**：利用 ATP 將二氧化碳合成葡萄糖。
- **實驗步驟**：沸水殺細胞 → 隔水加熱酒精脫色 → 漂洗軟化 → 滴碘液（照光部藍黑、遮光部黃褐）。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-bio-photosynthesis','practice'); window.appRouter.navigateTo('quiz');">
  🌿 立即進行「光合作用專屬測驗卷（純自然考題）」➔
</button>`;
    }

    // 6. 國一數學 1-1 ~ 1-2 (負數數線與指數律)
    if (q.includes('數線') || q.includes('負數') || q.includes('指數律') || (q.includes('國一') && q.includes('數學'))) {
      return `🔢 **國一數學第 1 章：負數數線與指數律（康軒/翰林）**：
- 數線距離：AB = |a - b|，恆為正數。
- 指數陷阱：(-2)^4 = +16，但 -2^4 = -16！
- 指數律：a^m · a^n = a^(m+n)。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g7-math-ch1','practice'); window.appRouter.navigateTo('quiz');">
  🔢 進入「國一數學第 1 章專項卷」➔
</button>`;
    }

    // 7. 國一國文 1-1 ~ 1-2 (背影與字體演變)
    if (q.includes('背影') || q.includes('朱自清') || q.includes('標點') || q.includes('字體') || (q.includes('國一') && q.includes('國文'))) {
      return `✍️ **國一國文第 1 單元：朱自清《背影》與字體演變（康軒/翰林）**：
- 《背影》文意：以小見大，買橘子的蹣跚背影體現深沉父愛。
- 漢字演進：甲骨文 → 金文 → 小篆 → 隸書（破圓為方分水嶺）→ 楷書。
<br><br>
<button class="ai-msg-action-btn" onclick="window.examEngine.loadPaperById('paper-g7-chinese-ch1','practice'); window.appRouter.navigateTo('quiz');">
  ✍️ 進入「國一國文第 1 單元特訓卷」➔
</button>`;
    }

    // 8. 寫作指導
    if (q.includes('開頭') || q.includes('寫作') || q.includes('記敘文')) {
      return `✍️ **高分開篇三大手法**：
1. **鏡頭特寫法**：聚焦於物件或具體動態（如：抽屜底層泛黃的舊鑰匙）。
2. **懸念引言法**：開門見山拋出矛盾或不可思議的情境。
3. **通感入題法**：視覺、聽覺與嗅覺疊加，畫面感立現。
<br><br>
<button class="ai-msg-action-btn" onclick="window.appRouter.navigateTo('writing');">
  ✍️ 前往「GTs 寫作導師」工作台 ➔
</button>`;
    }

    // Default intelligent companion reply
    return `💡 **伴學導師 Q比 (Q-Bi) 為你解答**：
關於「${query}」，我已在教科書庫與會考題庫中建立對應考點！
你可以：
- 點擊「📚 探索教材」頂部【課綱版本專區】選擇康軒、翰林或南一各單元精準複習。
- 或點擊「📝 考場測驗」進入專項考卷，Q比 正在考場為你計時伴考喔！`;
  }

  renderChatMessages() {
    const container = document.getElementById('ai-chat-messages-container');
    if (!container) return;

    container.innerHTML = this.messages.map(m => `
      <div class="chat-msg-row ${m.role}">
        <div class="msg-avatar">
          ${m.role === 'assistant' ? '<img src="assets/qbi/qbi_avatar.png" alt="Q-Bi" style="width:100%; height:100%; border-radius:50%; object-fit:contain;">' : '👤'}
        </div>
        <div class="msg-bubble">
          <div class="msg-text">${this.formatMarkdown(m.text)}</div>
          ${m.role === 'assistant' ? `
            <button class="msg-tts-btn" data-text="${this.escapeHtml(m.text.replace(/<[^>]*>/g, ''))}" title="語音朗讀此條回覆">
              🔊
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.msg-tts-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        window.soundEngine.speakText(text);
      });
    });

    container.scrollTop = container.scrollHeight;
  }

  formatMarkdown(str) {
    if (!str) return '';
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
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

window.aiTutor = new AiTutor();
