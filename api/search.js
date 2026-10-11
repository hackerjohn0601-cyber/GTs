// Vercel Serverless Function: /api/search
// Live Wikipedia and Open Educational Resources Search

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const query = req.query.q || '';
  if (!query || typeof query !== 'string' || !query.trim()) {
    res.status(400).json({ error: 'Search query is required' });
    return;
  }

  try {
    const encoded = encodeURIComponent(query.trim());
    const searchUrl = `https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&format=json&origin=*&srlimit=8`;
    const response = await fetch(searchUrl, { headers: { 'User-Agent': 'GTs-GoToStudy/1.0' } });
    if (!response.ok) throw new Error('Web search failed');
    const data = await response.json();

    const results = [];
    if (data.query && data.query.search) {
      for (const item of data.query.search) {
        const pageId = item.pageid;
        let extract = (item.snippet || '').replace(/<\/?[^>]+(>|$)/g, '');
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

    res.status(200).json({ query, count: results.length, results });
  } catch (err) {
    console.error('API search error:', err.message);
    res.status(200).json({ query, count: 0, results: [] });
  }
};
