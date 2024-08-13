const exec = require('child_process').exec;

var process = exec('dir'); // command의 dir과 같음

process.stdout.on('data', function (data) { // 'data'는 console이라고 생각하면 됨
    console.log(data.toString())
})

process.stderr.on('data', function (data) {
    console.error(data.toString())
})