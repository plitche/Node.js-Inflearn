const fs = require('fs')

const writeSteam = fs.createWriteStream('./writeme2.txt')
writeSteam.on('finish', () => {
    console.log('파일 쓰기 완료');
})

writeSteam.write('이 글을 씁니다.\n');
writeSteam.write('한 번 더 씁니다.');
writeSteam.end();