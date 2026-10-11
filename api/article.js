// Vercel Serverless Function: /api/article
// Fetch full article summary for study

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const title = req.query.title || '';
  if (!title || typeof title !== 'string' || !title.trim()) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  try {
    const encoded = encodeURIComponent(title.trim());
    const apiUrl = `https://zh.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
    const response = await fetch(apiUrl, { headers: { 'User-Agent': 'GTs-GoToStudy/1.0' } });
    if (!response.ok) throw new Error('Failed to fetch article summary');
    const data = await response.json();

    res.status(200).json({
      success: true,
      article: {
        title: data.title,
        description: data.description || '教材知識點核心解析',
        extract: data.extract,
        thumbnail: data.thumbnail ? data.thumbnail.source : null,
        pageUrl: data.content_urls ? data.content_urls.desktop.page : `https://zh.wikipedia.org/wiki/${encoded}`
      }
    });
  } catch (err) {
    console.error('API article error:', err.message);
    res.status(200).json({ success: false, article: null });
  }
};
