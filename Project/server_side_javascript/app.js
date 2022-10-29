var express = require('express');
var app = express();
app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('public')) // 정적 리소스를 서비스하기위한 디렉토리 설정

app.get('/template', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  });

app.get('/', function(req, res) {
    res.send('Hello home page');
});

app.get('/staticTest', function(req, res) {
    res.send('Hello Router, <div></div>')
})

app.get('/login', function(req, res) {
    res.send('Login please');
})

app.get('/dynamic', function(req, res) {
    var time = Date()
    var lis = '';
    for (var i=0; i<5; i++) {
        lis += '<li>coding</li>';
    }
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <ul>${lis}</ul>
            ${time}
        </head>
        <body>
            Hello, Dynamic!
        </body>
        </html>
    `)
})

app.listen(3000, function() {
    console.log('Connted 3000 port!');
})

