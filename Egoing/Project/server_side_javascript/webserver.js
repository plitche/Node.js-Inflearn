const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => { // 서버를 만든다.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => { // 만든 서버를 listen 시킨다.
  console.log(`Server running at http://${hostname}:${port}/`);
});