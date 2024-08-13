const fs = require('fs')
const fs2 = require('fs').promises;

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }

    console.log(data)
    console.log(data.toString());
})

fs2.readFile('./readme.txt')
    .then((data) => {
        console.log(data)
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    })