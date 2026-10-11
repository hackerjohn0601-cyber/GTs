const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

// Fallback search proxy using Wikipedia REST API for real web learning materials
async function searchWebMaterials(query) {
  try {
    const encoded = encodeURIComponent(query.trim());
    // Search Wikipedia API (supports Traditional/Simplified Chinese and English)
    const searchUrl = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&format=json&origin=*&srlimit=8`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'GTs-GoToStudy/1.0' } });
    if (!res.ok) throw new Error('Web search failed');
    const data = await res.json();
    
    const results = [];
    if (data.query && data.query.search) {
      for (const item of data.query.search) {
        // Fetch brief extract for each article
        const pageId = item.pageid;
        let extract = item.snippet.replace(/<\/?[^>]+(>|$)/g, ""); // clean html tags
        results.push({
          id: 'web-' + pageId,
          title: item.title,
          snippet: extract,
          wordCount: item.wordcount,
          source: '網路開源教材庫 (Wikipedia & Open Educational Resources)',
          timestamp: item.timestamp,
          url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
        });
      }
    }
    return results;
  } catch (err) {
    console.error('Error fetching web materials:', err.message);
    return [];
  }
}

// Fetch full article content for study
async function fetchFullArticle(title) {
  try {
    const encoded = encodeURIComponent(title.trim());
    const apiUrl = `https://zh.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
    const res = await fetch(apiUrl, { headers: { 'User-Agent': 'OmniLearnStudyBot/1.0' } });
    if (!res.ok) throw new Error('Failed to fetch article summary');
    const data = await res.json();
    return {
      title: data.title,
      description: data.description || '教材知識點核心解析',
      extract: data.extract,
      thumbnail: data.thumbnail ? data.thumbnail.source : null,
      pageUrl: data.content_urls ? data.content_urls.desktop.page : `https://zh.wikipedia.org/wiki/${encoded}`
    };
  } catch (err) {
    console.error('Article fetch error:', err.message);
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Search live web educational materials
  if (pathname === '/api/search' && req.method === 'GET') {
    const query = parsedUrl.query.q || '';
    if (!query) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Search query is required' }));
      return;
    }
    const webResults = await searchWebMaterials(query);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ query, count: webResults.length, results: webResults }));
    return;
  }

  // API: Fetch single article detail
  if (pathname === '/api/article' && req.method === 'GET') {
    const title = parsedUrl.query.title || '';
    if (!title) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Title is required' }));
      return;
    }
    const article = await fetchFullArticle(title);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: !!article, article }));
    return;
  }

  // Serve static files
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 fallback to index.html if not an api call
      if (!pathname.startsWith('/api/')) {
        const indexPath = path.join(__dirname, 'index.html');
        fs.readFile(indexPath, (readErr, content) => {
          if (readErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Server error');
        return;
      }
      const headers = {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      if (safePath === '/sw.js') {
        headers['Service-Worker-Allowed'] = '/';
      }
      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`GTs (Go to Study) Server running at http://0.0.0.0:${PORT}`);
});
