var express = require('express');
var bodyParse = require('body-parser');
const bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('public')) // 정적 리소스를 서비스하기위한 디렉토리 설정
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/form_receiver', function(req, res) {
    var title = req.query.title;
    var description = req.query.description;

    res.send(title+','+description)
})

app.post('/form_receiver', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;

    res.send(title+','+description)
})

app.get('/form', function(req, res) {
    res.render('form');
})

app.get('/topic/:id', function(req, res) {
    var topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ];

    var output = `
        <a href="/topic/0" >JavaScript</a><br/>
        <a href="/topic/1" >Nodejs</a><br/>
        <a href="/topic/2" >Express</a><br/><br/>>

        ${topics[req.params.id]}
    `
    res.send(output)
})

app.get('/topic/:id/:mode', function(req, res) {
    res.send(req.params.id+','+req.params.mode);
})

app.get('/template', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/template2', function (req, res) {
    res.render('temp', {time: Date(), title: 'pug template page'});
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


