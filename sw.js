// GTs (Go to Study) Service Worker
const CACHE_NAME = 'gts-cache-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/index.css?v=3',
  './css/search.css?v=3',
  './css/writing.css?v=3',
  './css/quiz.css?v=3',
  './css/mobile.css?v=3',
  './js/curriculumData.js?v=5',
  './js/materialsData.js?v=5',
  './js/writingData.js?v=5',
  './js/examData.js?v=5',
  './js/soundEffects.js?v=5',
  './js/qbiCompanion.js?v=5',
  './js/searchEngine.js?v=5',
  './js/writingCoach.js?v=5',
  './js/examEngine.js?v=5',
  './js/aiTutor.js?v=5',
  './js/pwaManager.js?v=5',
  './js/app.js?v=5',
  './assets/logo.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/hero.jpg',
  './assets/qbi/qbi_avatar.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use catch for individual assets so single missing file doesn't fail install
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[ServiceWorker] Failed to precache ${url}:`, err.message);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') {
    return;
  }

  // Handle API search / proxy requests with network-first and offline fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(req).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            results: [],
            message: '目前處於本機離線模式。您仍可自由複習內建國中各版本課綱教材與完整題庫！'
          }),
          {
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          }
        );
      })
    );
    return;
  }

  // During local development or when host is localhost, use network-first so updates are instant
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '0.0.0.0') {
    event.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // Navigation requests (HTML pages)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match('./index.html') || caches.match('/index.html');
      })
    );
    return;
  }

  // Static assets (Cache-first with network fallback & background cache update)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache for next time
        fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, resClone);
            });
          }
        }).catch(() => {/* ignore background update errors */});
        return cachedResponse;
      }

      // Not in cache, fetch from network and store in cache
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const resClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, resClone);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for images or other assets
        if (req.destination === 'image') {
          return caches.match('./assets/logo.png');
        }
      });
    })
  );
});
