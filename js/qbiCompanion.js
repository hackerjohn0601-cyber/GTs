// Q比 (Q-Bi) Duolingo-style Mascot Companion & Interactive Guide Controller
class QbiCompanion {
  constructor() {
    this.currentPose = 'jump';
    this.poseKeys = ['jump', 'walk', 'sit', 'think', 'sleep'];
    this.quoteIndices = { jump: 0, walk: 0, sit: 0, run: 0, think: 0, sleep: 0 };

    this.poses = {
      jump: {
        src: 'assets/qbi/qbi_jump_anim.webp',
        title: '跳躍慶祝',
        stateClass: 'jumping',
        fx: '<span class=\"fx-item f1\">🎉</span><span class=\"fx-item f2\">🌟</span><span class=\"fx-item f3\">✨</span>',
        quotes: [
          '嗨！我是 Q比！今天想挑戰什麼科目呢？點擊我可以換心情喔！',
          '🎉 耶！今天也要元氣滿滿地搞懂所有考點！你準備好拿滿分了嗎？',
          '🌟 太棒了！只要每天進步一點點，大考絕對榜上有名！',
          '🐾 隨時保持熱情，知識就會像泉水一樣湧出來！'
        ]
      },
      walk: {
        src: 'assets/qbi/qbi_walk.webp',
        title: '歡樂走路動畫',
        stateClass: 'walking',
        fx: '<span class=\"dust-puff p1\">💨</span><span class=\"dust-puff p2\">✨</span><span class=\"dust-puff p3\">🐾</span>',
        quotes: [
          '🚶 噠噠噠～Q比 邁開步伐巡視伴學！腳步動起來，知識裝進來！',
          '🐾 一步一腳印，課綱重點不怕難！跟著 Q比 的節奏大步前進！',
          '🎵 散步有助於大腦放鬆與靈感湧現～思考卡關時走一走最管用！',
          '✨ 走起！每天堅持動一動，今天也是向著滿分大步邁進的一天！'
        ]
      },
      sit: {
        src: 'assets/qbi/qbi_sit_anim.webp',
        title: '專注伴讀',
        stateClass: 'sitting',
        fx: '<span class=\"fx-item f1\">📘</span><span class=\"fx-item f2\">✨</span><span class=\"fx-item f3\">📱</span>',
        quotes: [
          '📖 坐下來深呼吸～我們一起精讀課本，把每個概念吃透透！',
          '🔍 靜下心來！看看康軒、翰林、南一課綱，細節往往藏在觀念裡！',
          '☕ 伴讀模式開啟！無論是修辭還是理化公式，Q比 都在你身邊！',
          '📗 不積跬步，無以至千里；一頁一頁讀，知識最紮實！'
        ]
      },
      run: {
        src: 'assets/qbi/qbi_walk.webp',
        title: '全力衝刺',
        stateClass: 'walking',
        fx: '<span class=\"dust-puff p1\">💨</span><span class=\"dust-puff p2\">⚡</span><span class=\"dust-puff p3\">🐾</span>',
        quotes: [
          '🏃 倒數計時！全力衝刺模考，手速與腦速全開！',
          '⚡ 節奏加快！每完成一題，我們就離夢想目標更近一步！',
          '🔥 衝啊！衝刺複習時別忘了細心審題，搶下關鍵分數！',
          '💨 像風一樣前進！大考倒數，保持這股衝勁！'
        ]
      },
      think: {
        src: 'assets/qbi/qbi_think_anim.webp',
        title: '深度思考',
        stateClass: 'thinking',
        fx: '<span class=\"fx-item f1\">💡</span><span class=\"fx-item f2\">❓</span><span class=\"fx-item f3\">🧠</span>',
        quotes: [
          '💡 嗯～這道題目有點玄機？別急，讓 Q比 跟你一起拆解線索！',
          '🧠 換個角度想：出題老師想考的是不是因果關係？',
          '✨ 審題破題就像下棋，深思熟慮才能立於不敗之地！',
          '🤔 遇到難題先別猜，回想教科書上的核心定義！'
        ]
      },
      sleep: {
        src: 'assets/qbi/qbi_sleep_anim.webp',
        title: '小憩充電',
        stateClass: 'sleeping',
        fx: '<span class=\"fx-item f1\">💤</span><span class=\"fx-item f2\">🌙</span><span class=\"fx-item f3\">⭐</span>',
        quotes: [
          '💤 呼～學習辛苦啦！休息是為了走更長遠的路，眼睛休息一下吧！',
          '🌙 睡個香甜的好覺，大腦會在夢中把今天學到的知識存檔喔！',
          '💤 充電中... (Zzz) 記得喝口水、伸伸懶腰喔！',
          '🍵 累了就放空五分鐘，回來後大腦思路會更清晰！'
        ]
      }
    };
  }

  init() {
    this.bindHeroStage();
    this.bindGamifyPills();
    this.bindMusicEnvBar();
  }

  bindHeroStage() {
    // 1. Pose buttons
    const poseBtns = document.querySelectorAll('.duo-pose-btn');
    poseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pose = btn.dataset.pose;
        this.setPose(pose);
      });
    });

    // 2. Click Mascot directly -> cycle mood & pop bounce
    const mascotWrap = document.getElementById('duo-mascot-wrap');
    if (mascotWrap) {
      mascotWrap.addEventListener('click', () => {
        const nextIdx = (this.poseKeys.indexOf(this.currentPose) + 1) % this.poseKeys.length;
        const nextPose = this.poseKeys[nextIdx];
        this.setPose(nextPose);
      });
    }

    // 3. Click Speech bubble directly -> cycle speech
    const speechBubble = document.getElementById('duo-speech-bubble');
    if (speechBubble) {
      speechBubble.addEventListener('click', () => {
        this.sayNextQuote();
      });
    }
  }

  bindMusicEnvBar() {
    const toggleBtn = document.getElementById('duo-env-music-toggle');
    const volSlider = document.getElementById('duo-env-volume-slider');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!window.soundEngine) return;
        const isPlaying = window.soundEngine.toggleAmbient(this.currentPose);
        this.updateMusicEnvUI(isPlaying);
      });
    }

    if (volSlider && window.soundEngine) {
      volSlider.value = window.soundEngine.ambientVolume;
      volSlider.addEventListener('input', (e) => {
        window.soundEngine.setAmbientVolume(e.target.value);
      });
    }

    this.updateMusicEnvPill(this.currentPose);
  }

  updateMusicEnvPill(poseName) {
    if (!window.soundEngine || typeof window.soundEngine.getPoseAmbientInfo !== 'function') return;
    const info = window.soundEngine.getPoseAmbientInfo(poseName);
    const moodPill = document.getElementById('duo-env-mood-pill');
    if (moodPill && info) {
      moodPill.textContent = info.name;
      moodPill.title = info.desc;
    }
  }

  updateMusicEnvUI(isPlaying) {
    const toggleBtn = document.getElementById('duo-env-music-toggle');
    const toggleIcon = document.getElementById('env-toggle-icon');
    const toggleText = document.getElementById('env-toggle-text');
    const envBar = document.getElementById('duo-music-env-bar');

    if (toggleBtn) {
      toggleBtn.classList.toggle('active', isPlaying);
    }
    if (toggleIcon) {
      toggleIcon.textContent = isPlaying ? '⏸' : '▶';
    }
    if (toggleText) {
      toggleText.textContent = isPlaying ? '暫停氛圍' : '播放氛圍音樂';
    }
    if (envBar) {
      envBar.classList.toggle('playing', isPlaying);
    }
  }

  setPose(poseName) {
    if (!this.poses[poseName]) return;
    this.currentPose = poseName;

    // 1. Play unique signature musical cue for each character style
    if (window.soundEngine && typeof window.soundEngine.playPoseCue === 'function') {
      window.soundEngine.playPoseCue(poseName);
    } else if (window.soundEngine && typeof window.soundEngine.playClick === 'function') {
      window.soundEngine.playClick();
    }

    // 2. If ambient music is actively playing, smoothly transition to new character's ambient soundscape
    if (window.soundEngine && window.soundEngine.isAmbientPlaying && typeof window.soundEngine.switchAmbient === 'function') {
      window.soundEngine.switchAmbient(poseName);
    }

    // 3. Update ambient music mood indicator
    this.updateMusicEnvPill(poseName);

    // Update active button
    const poseBtns = document.querySelectorAll('.duo-pose-btn');
    poseBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.pose === poseName);
    });

    // Update image
    const mascotImg = document.getElementById('duo-mascot-img');
    if (mascotImg) {
      mascotImg.src = this.poses[poseName].src;
      // Trigger pop animation
      mascotImg.style.animation = 'none';
      void mascotImg.offsetWidth; // reflow
      mascotImg.style.animation = 'duoBounce 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    // Toggle active state classes and dynamic mood fx
    const mascotWrap = document.getElementById('duo-mascot-wrap');
    const poseData = this.poses[poseName];
    if (mascotWrap && poseData) {
      mascotWrap.classList.remove('walking', 'jumping', 'sitting', 'thinking', 'sleeping');
      if (poseData.stateClass) {
        mascotWrap.classList.add(poseData.stateClass);
      }
      const fxTrack = document.getElementById('duo-mascot-fx');
      if (fxTrack && poseData.fx) {
        fxTrack.innerHTML = poseData.fx;
      }
    }

    // Update quote
    this.sayNextQuote(poseName);
  }

  sayNextQuote(poseName = this.currentPose) {
    const speechText = document.getElementById('duo-speech-text');
    if (!speechText) return;

    const poseData = this.poses[poseName];
    const quotes = poseData.quotes;
    const currentIdx = this.quoteIndices[poseName];
    speechText.textContent = quotes[currentIdx];

    // Cycle index for next time
    this.quoteIndices[poseName] = (currentIdx + 1) % quotes.length;

    // Pop speech bubble slightly
    const bubble = document.getElementById('duo-speech-bubble');
    if (bubble) {
      bubble.style.transform = 'scale(1.02)';
      setTimeout(() => {
        bubble.style.transform = '';
      }, 180);
    }
  }

  bindGamifyPills() {
    const streakPill = document.querySelector('.duo-pill.streak');
    const energyPill = document.querySelector('.duo-pill.energy');
    const gemPill = document.querySelector('.duo-pill.gem');

    if (streakPill) {
      streakPill.style.cursor = 'pointer';
      streakPill.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playCorrect();
        if (window.showAppToast) {
          window.showAppToast('🔥 <strong>連勝紀錄 3 天！</strong> 堅持是學霸的秘密，明天繼續保持！');
        }
      });
    }

    if (energyPill) {
      energyPill.style.cursor = 'pointer';
      energyPill.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playCorrect();
        if (window.showAppToast) {
          window.showAppToast('⚡ <strong>伴學能量 100%！</strong> Q比 活力充沛，隨時為你解答教科書盲點！');
        }
      });
    }

    if (gemPill) {
      gemPill.style.cursor = 'pointer';
      gemPill.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playCorrect();
        if (window.showAppToast) {
          window.showAppToast('💎 <strong>知識結晶 120 顆！</strong> 每完成一套測驗或掌握考點即可累積寶石！');
        }
      });
    }
  }

  // Writing Coach Step Synchronization
  onWritingStepChanged(stepNum) {
    const imgEl = document.getElementById('qbi-coach-img');
    const textEl = document.getElementById('qbi-coach-text');
    if (!imgEl || !textEl) return;

    switch (stepNum) {
      case 1:
        imgEl.src = 'assets/qbi/qbi_think_anim.webp';
        textEl.textContent = '好文章是有靈魂的！跟著 Q比 先仔細「審題與立意」，辨別體裁核心，避開常見離題扣分地雷！';
        break;
      case 2:
        imgEl.src = 'assets/qbi/qbi_sit_anim.webp';
        textEl.textContent = '穩固的骨架是好文章的支柱！跟著 Q比 坐下來一步步搭建「起承轉合」大綱，各段主旨一目了然！';
        break;
      case 3:
        imgEl.src = 'assets/qbi/qbi_jump_anim.webp';
        textEl.textContent = '讓文章活起來的秘密武器！挑選精準的成語名句與對比修辭，一鍵注入草稿給閱卷老師驚艷！';
        break;
      case 4:
        imgEl.src = 'assets/qbi/qbi_walk.webp';
        textEl.textContent = '文思泉湧，全力衝刺！完成後點擊「AI 智能評分批改」，Q比 會為你從四大維度給出最權威的診斷！';
        break;
    }
  }

  // Writing Coach Evaluation Sync
  onWritingEvaluated(totalScore) {
    const imgEl = document.getElementById('qbi-coach-img');
    const textEl = document.getElementById('qbi-coach-text');
    if (!imgEl || !textEl) return;

    if (totalScore >= 85) {
      imgEl.src = 'assets/qbi/qbi_jump_anim.webp';
      textEl.textContent = `🎉 恭喜拿下 ${totalScore} 分（大考 6 級分水準）！文意通達、用詞考究，Q比 為你喝采！`;
    } else if (totalScore >= 70) {
      imgEl.src = 'assets/qbi/qbi_sit_anim.webp';
      textEl.textContent = `👏 獲得 ${totalScore} 分（穩定 4~5 級分）！結構與立意良好，微調遣詞造句能更上層樓！`;
    } else {
      imgEl.src = 'assets/qbi/qbi_think_anim.webp';
      textEl.textContent = `💡 目前為 ${totalScore} 分！建議參考下方的導師診斷與佳句修訂，再潤飾一次草稿喔！`;
    }
  }

  // Exam Score Report Synchronization
  onExamCompleted(report) {
    const reportImg = document.getElementById('report-qbi-img');
    const verdictBubble = document.getElementById('report-qbi-verdict-bubble');
    if (!reportImg || !verdictBubble) return;

    if (report.score >= 80) {
      reportImg.src = 'assets/qbi/qbi_jump_anim.webp';
      verdictBubble.innerHTML = `🎉 <strong>太棒了！</strong> 考出了 <strong>${report.score} 分</strong> 的優異成績！概念清晰、解題迅速，Q比 為你慶祝！`;
    } else if (report.score >= 60) {
      reportImg.src = 'assets/qbi/qbi_sit_anim.webp';
      verdictBubble.innerHTML = `📖 <strong>穩紮穩打！</strong> 拿下 <strong>${report.score} 分</strong> 順利及格！跟著 Q比 坐下來研讀錯題解析，下次必拿高分！`;
    } else {
      reportImg.src = 'assets/qbi/qbi_think_anim.webp';
      verdictBubble.innerHTML = `💡 <strong>繼續加油！</strong> 本次測驗 <strong>${report.score} 分</strong>。別灰心，Q比 陪你一起深度剖析盲點，錯題本反覆精熟！`;
    }
  }
}

window.qbiCompanion = new QbiCompanion();
