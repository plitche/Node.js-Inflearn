const fs = require('fs')

console.log('before:', process.memoryUsage().rss)

const readSteam = fs.createReadStream('./big.txt')
const writeSteam = fs.createWriteStream('./big3.txt')
readSteam.pipe(writeSteam);
readSteam.on('end', () => {
    console.log('stream: ', process.memoryUsage(),rss)
})
