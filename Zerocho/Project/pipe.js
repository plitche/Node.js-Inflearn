const fs = require('fs')
const zlib = require('zlib')

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
const writeSteam = fs.createWriteStream('./writeme3.txt')
readStream.pipe(writeSteam)

readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
writeSteam = fs.createWriteStream('./writeme4.txt.gz')
const zlibStream = zlib.createGzip();
readStream.pipe(zlibStream).pipe(writeSteam)