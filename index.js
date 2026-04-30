const http = require('http');
const fs = require('fs');
const path = require('path');

const countPath = path.join(__dirname, 'count.txt');

// 读取次数
function getCount() {
  try {
    return parseInt(fs.readFileSync(countPath, 'utf8')) || 0;
  } catch (e) {
    return 0;
  }
}
// 保存次数
function setCount(n) {
  fs.writeFileSync(countPath, n.toString());
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // 每次打开 +1
  if (req.url === '/add') {
    let num = getCount();
    num++;
    setCount(num);
    res.end(JSON.stringify({ total: num }));
  } 
  // 只获取当前总数，不增加
  else if (req.url === '/get') {
    res.end(JSON.stringify({ total: getCount() }));
  } 
  else {
    res.end(JSON.stringify({ total: 0 }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('计数服务运行中...');
});
