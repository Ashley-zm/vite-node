const http = require('http')
var URL = require('url');

// 创建本地服务器来从其接收数据
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({
    data: URL.parse(req.url, true).query,
    url: req.url + '/当前访问地址',
  }))
}).listen(8081)