const express = require('express');
const { createClient } = require('@vercel/kv');
const app = express();

// 连接免费云存储（替代 count.json）
const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// 允许小程序跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// 访问计数接口
app.get('/', async (req, res) => {
  try {
    // 访问一次 +1，永久保存，不会清零
    const count = await kv.incr('visit_count');
    res.json({ count: count });
  } catch (err) {
    res.json({ count: 0 });
  }
});

// Vercel 必须导出 app，不能 listen
module.exports = app;
