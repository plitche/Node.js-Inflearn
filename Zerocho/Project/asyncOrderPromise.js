const fs = require('fs').promises;

fs.readFile('./writeme.txt')
    .then((data) => {
        console.log('1번', data.toString())
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('2번', data.toString())
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('3번', data.toString())
        return fs.readFile('./readme.txt');
    })
    .then((data) => {
        console.log('4번', data.toString())
        return fs.readFile('./readme.txt');
    })

async function main() {
    const data = await fs.readFile('./readme.txt');
    console.log('1번', data.toString())
    data = await fs.readFile('./readme.txt');
    console.log('2번', data.toString())
    data = await fs.readFile('./readme.txt');
    console.log('3번', data.toString())
    data = await fs.readFile('./readme.txt');
    console.log('4번', data.toString())
}

main();