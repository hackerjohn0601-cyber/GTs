// GTs Progressive Web App (PWA) & Local Desktop Installation Controller
class PwaManager {
  constructor() {
    this.deferredPrompt = null;
    this.isStandalone = false;
    this.isInstallable = false;
  }

  init() {
    this.checkStandaloneMode();
    this.registerServiceWorker();
    this.bindInstallEvents();
    this.bindUiTriggers();
    this.updateInstallUi();
  }

  checkStandaloneMode() {
    this.isStandalone = (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
    );
    if (this.isStandalone) {
      document.body.classList.add('pwa-standalone-mode');
    }
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered successfully, scope:', registration.scope);
            
            // Check for updates
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    if (window.showAppToast) {
                      window.showAppToast('🔄 GTs 已下載最新教材與題庫更新，下次啟動將自動生效！', 3500);
                    }
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  bindInstallEvents() {
    // Chrome beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent automatic mini-infobar on mobile Chrome
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable = true;
      console.log('[PWA] Chrome beforeinstallprompt captured, ready for 1-click install.');
      this.updateInstallUi();
    });

    // When the app is successfully installed to desktop/device
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.isInstallable = false;
      this.isStandalone = true;
      console.log('[PWA] GTs successfully installed to local machine!');
      if (window.showAppToast) {
        window.showAppToast('🎉 GTs 已成功下載並安裝至您的本機！您可從電腦應用程式/桌面隨時按圖示啟動！', 4500);
      }
      this.updateInstallUi();
      this.closeInstallModal();
    });
  }

  bindUiTriggers() {
    // Header install button
    const headerInstallBtn = document.getElementById('install-app-btn');
    if (headerInstallBtn) {
      headerInstallBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.handleInstallClick();
      });
    }

    // Hero install button
    const heroInstallBtn = document.getElementById('hero-install-app-btn');
    if (heroInstallBtn) {
      heroInstallBtn.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.handleInstallClick();
      });
    }

    // Modal close button
    const modalCloseBtn = document.getElementById('pwa-modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        this.closeInstallModal();
      });
    }

    // Modal primary action button
    const modalActionBtn = document.getElementById('pwa-modal-action-btn');
    if (modalActionBtn) {
      modalActionBtn.addEventListener('click', () => {
        if (this.deferredPrompt) {
          this.triggerNativeInstall();
        } else {
          const guide = document.querySelector('.pwa-guide-section');
          if (guide) {
            guide.scrollIntoView({ behavior: 'smooth', block: 'center' });
            guide.style.outline = '2px solid var(--accent-cyan)';
            setTimeout(() => { guide.style.outline = 'none'; }, 1800);
          }
        }
      });
    }

    // Modal download shortcut button
    const modalShortcutBtn = document.getElementById('pwa-modal-shortcut-btn');
    if (modalShortcutBtn) {
      modalShortcutBtn.addEventListener('click', () => {
        this.downloadDesktopShortcut();
      });
    }

    // Close on overlay backdrop click
    const modalOverlay = document.getElementById('pwa-install-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          this.closeInstallModal();
        }
      });
    }
  }

  async handleInstallClick() {
    if (this.deferredPrompt) {
      // 1-Click native Chrome prompt
      await this.triggerNativeInstall();
    } else {
      // Show full guide and shortcut options
      this.openInstallModal();
    }
  }

  async triggerNativeInstall() {
    if (!this.deferredPrompt) {
      this.openInstallModal();
      return;
    }

    const promptEvent = this.deferredPrompt;
    promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    console.log('[PWA] User install choice outcome:', choiceResult.outcome);

    if (choiceResult.outcome === 'accepted') {
      if (window.showAppToast) {
        window.showAppToast('🚀 正在將 GTs 安裝至您的本機電腦...', 2500);
      }
      this.deferredPrompt = null;
      this.closeInstallModal();
    } else {
      if (window.showAppToast) {
        window.showAppToast('您已取消安裝。隨時點擊「下載 App」皆可再次安裝！', 3000);
      }
    }
  }

  updateInstallUi() {
    const headerBtn = document.getElementById('install-app-btn');
    const heroBtn = document.getElementById('hero-install-app-btn');
    const modalActionBtn = document.getElementById('pwa-modal-action-btn');
    const modalStatusBadge = document.getElementById('pwa-modal-status-badge');

    if (this.isStandalone) {
      if (headerBtn) {
        headerBtn.innerHTML = '<span class="install-icon">✓</span><span class="install-text">已安裝 (本機 App)</span>';
        headerBtn.classList.add('is-installed');
        headerBtn.title = 'GTs 目前已在獨立本機 App 視窗模式中運行';
      }
      if (heroBtn) {
        heroBtn.innerHTML = '<span>✓ 已安裝本機 App (可離線使用)</span>';
      }
      if (modalStatusBadge) {
        modalStatusBadge.textContent = '● 目前已安裝於本機獨立運行中';
        modalStatusBadge.className = 'pwa-badge success';
      }
      if (modalActionBtn) {
        modalActionBtn.textContent = '✓ 已完成安裝・可由電腦桌面/應用程式啟動';
        modalActionBtn.disabled = true;
      }
      return;
    }

    if (this.deferredPrompt) {
      if (headerBtn) {
        headerBtn.innerHTML = '<span class="install-icon">📥</span><span class="install-text">下載 App 到電腦</span>';
        headerBtn.classList.add('ready-to-install');
      }
      if (heroBtn) {
        heroBtn.innerHTML = '<span>📥 一鍵下載安裝 GTs 到電腦</span>';
      }
      if (modalStatusBadge) {
        modalStatusBadge.textContent = '● Chrome 已就緒：支援一鍵安裝到本機';
        modalStatusBadge.className = 'pwa-badge ready';
      }
      if (modalActionBtn) {
        modalActionBtn.textContent = '🚀 立即從 Chrome 安裝到本機 (一鍵下載)';
        modalActionBtn.disabled = false;
      }
    } else {
      if (headerBtn) {
        headerBtn.innerHTML = '<span class="install-icon">📥</span><span class="install-text">下載 App</span>';
      }
      if (heroBtn) {
        heroBtn.innerHTML = '<span>📥 下載 App 到本機</span>';
      }
      if (modalStatusBadge) {
        modalStatusBadge.textContent = '● 支援 Chrome 網址列與選單安裝至本機';
        modalStatusBadge.className = 'pwa-badge info';
      }
      if (modalActionBtn) {
        modalActionBtn.textContent = '💡 查看 Chrome 網址列安裝教學';
        modalActionBtn.disabled = false;
      }
    }
  }

  openInstallModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (!modal) return;
    this.updateInstallUi();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeInstallModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  downloadDesktopShortcut() {
    try {
      const currentUrl = window.location.href.split('#')[0];
      const shortcutContent = `[InternetShortcut]\nURL=${currentUrl}\nIconIndex=0\nHotKey=0\n[{000214A0-0000-0000-C000-000000000046}]\nProp3=19,11\n`;
      const blob = new Blob([shortcutContent], { type: 'application/x-mswinurl;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'GTs-智慧伴學系統.url';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      if (window.showAppToast) {
        window.showAppToast('✅ 已下載桌面啟動捷徑「GTs-智慧伴學系統.url」！直接拖曳至電腦桌面即可雙擊啟動！', 4000);
      }
    } catch (e) {
      console.error('Failed to generate desktop shortcut:', e);
      if (window.showAppToast) {
        window.showAppToast('請使用 Chrome 網址列右側的「安裝」圖示直接安裝！', 3000);
      }
    }
  }
}

// Global PWA Manager Instance
window.pwaManager = new PwaManager();
document.addEventListener('DOMContentLoaded', () => {
  window.pwaManager.init();
});
