// Main Application Controller and Router
class AppRouter {
  constructor() {
    this.currentRoute = 'materials';
  }

  init() {
    this.bindNavigation();
    this.bindThemeToggle();
    this.bindSoundToggle();
    this.bindHashListener();
    this.updateStatsView();

    // Initialize Submodules
    if (window.qbiCompanion) window.qbiCompanion.init();
    if (window.searchEngine) window.searchEngine.init();
    if (window.writingCoach) window.writingCoach.init();
    if (window.examEngine) window.examEngine.init();
    if (window.aiTutor) window.aiTutor.init();

    // Check initial route from hash if any
    const hash = window.location.hash.replace('#', '');
    if (['materials', 'writing', 'quiz', 'stats'].includes(hash)) {
      this.navigateTo(hash);
    } else {
      this.navigateTo('materials');
    }
  }

  bindNavigation() {
    const navItems = document.querySelectorAll('.main-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const route = item.dataset.route;
        window.soundEngine.playClick();
        this.navigateTo(route);
      });
    });

    // Hero quick actions
    const quickSearchBtn = document.getElementById('hero-quick-search-btn');
    const quickWriteBtn = document.getElementById('hero-quick-write-btn');
    const quickQuizBtn = document.getElementById('hero-quick-quiz-btn');

    if (quickSearchBtn) {
      quickSearchBtn.addEventListener('click', () => {
        this.navigateTo('materials');
        const input = document.getElementById('search-materials-input');
        if (input) input.focus();
      });
    }

    if (quickWriteBtn) {
      quickWriteBtn.addEventListener('click', () => {
        this.navigateTo('writing');
      });
    }

    if (quickQuizBtn) {
      quickQuizBtn.addEventListener('click', () => {
        this.navigateTo('quiz');
      });
    }
  }

  navigateTo(route) {
    this.currentRoute = route;
    window.location.hash = route;

    // Update active nav link
    const navItems = document.querySelectorAll('.main-nav-item');
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });

    // Update view sections
    const sections = document.querySelectorAll('.app-main-section');
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === `section-${route}`);
    });

    if (route === 'stats') {
      this.updateStatsView();
    }

    if (route === 'quiz') {
      if (window.examEngine && !window.examEngine.isExamActive) {
        window.examEngine.switchExamView('catalog');
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindHashListener() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['materials', 'writing', 'quiz', 'stats'].includes(hash) && hash !== this.currentRoute) {
        this.navigateTo(hash);
      }
    });
  }

  bindThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const isLight = localStorage.getItem('omnilearn_light_theme') === 'true';

    if (isLight) {
      document.body.classList.add('light-theme');
      if (themeBtn) themeBtn.textContent = '🌙';
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        window.soundEngine.playClick();
        document.body.classList.toggle('light-theme');
        const currentLight = document.body.classList.contains('light-theme');
        localStorage.setItem('omnilearn_light_theme', currentLight);
        themeBtn.textContent = currentLight ? '🌙' : '☀️';
      });
    }
  }

  bindSoundToggle() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (!soundBtn) return;

    const isMuted = window.soundEngine.isMuted;
    soundBtn.textContent = isMuted ? '🔇' : '🔊';

    soundBtn.addEventListener('click', () => {
      const muted = window.soundEngine.toggleMute();
      soundBtn.textContent = muted ? '🔇' : '🔊';
    });
  }

  updateStatsView() {
    // Collect learning metrics
    const savedMaterials = JSON.parse(localStorage.getItem('omnilearn_saved_materials') || '[]');
    const mistakes = JSON.parse(localStorage.getItem('omnilearn_mistakes') || '[]');

    const savedCountEl = document.getElementById('stat-saved-count');
    const mistakesCountEl = document.getElementById('stat-mistakes-count');
    const totalExamsEl = document.getElementById('stat-total-exams');

    if (savedCountEl) savedCountEl.textContent = savedMaterials.length;
    if (mistakesCountEl) mistakesCountEl.textContent = mistakes.length;
    if (totalExamsEl) totalExamsEl.textContent = '4 套';

    // Render bookmarks list
    const bookmarksContainer = document.getElementById('stats-bookmarks-list');
    if (bookmarksContainer) {
      if (savedMaterials.length === 0) {
        bookmarksContainer.innerHTML = '<p class="empty-hint" style="color:var(--text-secondary); padding: 1.5rem; text-align:center;">尚未收藏任何教材，可在閱讀教材時點擊星號收藏！</p>';
      } else {
        bookmarksContainer.innerHTML = savedMaterials.map(m => `
          <div class="stat-saved-card" style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.15rem; display:flex; align-items:center; justify-content:space-between; gap:1rem;">
            <span class="stat-mat-icon" style="font-size:1.75rem;">${m.subjectIcon || '📖'}</span>
            <div class="stat-mat-info" style="flex:1;">
              <h5 style="font-size:1.05rem; font-weight:700;">${m.title}</h5>
              <p style="font-size:0.85rem; color:var(--text-secondary);">${m.summary ? m.summary.slice(0, 60) + '...' : ''}</p>
            </div>
            <button class="stat-read-again-btn hero-cta-btn secondary" data-id="${m.id}" style="padding:0.45rem 0.95rem; font-size:0.85rem;">研讀</button>
          </div>
        `).join('');

        bookmarksContainer.querySelectorAll('.stat-read-again-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            this.navigateTo('materials');
            if (window.searchEngine) {
              window.searchEngine.openReader(id);
            }
          });
        });
      }
    }
  }
}

// Global Toast Notification Helper
window.showAppToast = function(msg, duration = 2400) {
  let toast = document.getElementById('app-floating-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-floating-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.className = 'app-toast active';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.className = 'app-toast';
  }, duration);
};

// Global In-App Confirm Dialog Helper
window.showAppConfirm = function({ title, message, confirmText = '確定', cancelText = '取消', onConfirm }) {
  let modal = document.getElementById('app-custom-confirm-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'app-custom-confirm-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-window" style="max-width: 480px;">
        <div class="modal-header">
          <h3 id="app-confirm-title" style="font-size: 1.15rem;">確認操作</h3>
          <button class="modal-close-btn" id="app-confirm-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p id="app-confirm-message" style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.5rem;"></p>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button id="app-confirm-cancel-btn" class="hero-cta-btn secondary" style="padding: 0.55rem 1.15rem; font-size: 0.9rem;">取消</button>
            <button id="app-confirm-ok-btn" class="hero-cta-btn primary" style="padding: 0.55rem 1.25rem; font-size: 0.9rem;">確定</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById('app-confirm-title').textContent = title || '請確認';
  document.getElementById('app-confirm-message').textContent = message || '確定要執行此操作嗎？';
  const okBtn = document.getElementById('app-confirm-ok-btn');
  const cancelBtn = document.getElementById('app-confirm-cancel-btn');
  const closeBtn = document.getElementById('app-confirm-close-btn');

  okBtn.textContent = confirmText;
  cancelBtn.textContent = cancelText;

  const hide = () => {
    modal.classList.remove('active');
  };

  okBtn.onclick = () => {
    hide();
    if (onConfirm) onConfirm();
  };
  cancelBtn.onclick = hide;
  closeBtn.onclick = hide;

  modal.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
  window.appRouter.init();
});
