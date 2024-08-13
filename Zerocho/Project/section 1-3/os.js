const os = require('os'); // os라는걸 만들지 않았음에도 node에서 제공해주어 사용 가능

console.log('운영체제 정보----------------');
console.log("os.arch():", os.arch());
console.log("os.platform():", os.platform());
console.log("os.type():", os.type());
console.log("os.uptime():", os.uptime());
console.log("os.hostname():", os.hostname());
console.log("os.release():", os.release());

console.log('경로----------------');
console.log("os.homedir():", os.homedir());
console.log("os.tmpdir():", os.tmpdir());

console.log('cpu 정보----------------');
console.log("os.cpus():", os.cpus());
console.log("os.cpus().length", os.cpus());

console.log('메모리 정보----------------');
console.log("os.freemem():", os.freemem());
console.log("os.totalmem", os.totalmem);