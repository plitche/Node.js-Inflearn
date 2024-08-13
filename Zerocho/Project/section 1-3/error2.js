const fs = require('fs')

setInterval(() => {
    fs.unlink('./abcdfg.js', (err) => {
        if (err) {
            console.error(err)
        }
    })

}, 1000)