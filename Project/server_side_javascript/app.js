var express = require('express');
var app = express();
app.use(express.static('public')) // 정적 리소스를 서비스하기위한 디렉토리 설정

app.get('/', function(req, res) {
    res.send('Hello home page');
});

app.get('/staticTest', function(req, res) {
    res.send('Hello Router, <div></div>')
})

app.get('/login', function(req, res) {
    res.send('Login please');
})

app.listen(3000, function() {
    console.log('Connted 3000 port!');
})

