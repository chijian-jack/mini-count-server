const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// 统计文件路径
const countFile = path.join(__dirname, 'count.json');

// 允许小程序跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// 读取并自增访问数
app.get('/', (req, res) => {
  try {
    // 读取
    let data = JSON.parse(fs.readFileSync(countFile, 'utf8'));
    data.count += 1;
    
    // 写入
    fs.writeFileSync(countFile, JSON.stringify(data, null, 2));
    
    // 返回
    res.json({ count: data.count });
  } catch (err) {
    res.json({ count: 0 });
  }
});

app.listen(PORT, () => {
  console.log('服务启动');
});