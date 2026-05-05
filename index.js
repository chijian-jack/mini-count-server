const express = require('express');
const { Redis } = require('@upstash/redis');
const app = express();

// 连接 Upstash Redis，直接用你现有的环境变量
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// 允许小程序跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 访问计数接口
app.get('/', async (req, res) => {
  try {
    const count = await redis.incr('visit_count');
    res.json({ count });
  } catch (err) {
    console.error('Redis 错误:', err);
    res.status(500).json({ error: '计数服务异常', count: 0 });
  }
});

// Vercel 必须导出 app
module.exports = app;
