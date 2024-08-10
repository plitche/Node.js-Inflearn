const fs = require('fs').promises

setInterval(() => {
    fs.unlink('./abcdefg.js') // promise에 catch를 붙이지 않아도 서비스가 멈추지는 않는다. 하지만 붙이는걸 권장
}, 1000)