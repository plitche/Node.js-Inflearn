const dotenv = require('dotenv')
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const multer = require('multer')
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();


app.set('port', process.env.PORT || 3000);

// 미들 웨어들 간에 순서도 중요하다.
app.use(morgan('dev')); // 요청과 응답을 기록하는 라우터 'dev', 'combiend'
// 정적파일 읽을 때(요청경로, express.static(실제 경로))
// localhost:3000/zerocho.html -> learn-express/public/zerocho.html
app.use('/', (req, res, next) => {
    if (req.session.id) {
        express.static(path.join(__dirname, 'public'))(req, res, next)
    } else {
        next()
    }
})
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,  // 요청이 왔을 때 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
    saveUninitialized: false,   // 세션에 저장할 내역이 없더라도 세션을 저장할지
    secret: 'process.env.COOKIE_SECRET',
    cookie: {
        httpOnly: true,
    },
    // name: 'connect.sid', default

}))
app.use(express.json()); // bodyParser 대체, client가 json데이터를 보냈을때 parsing 해서 body에 넣어준다.
app.use(express.urlencoded({ extended: true })); // form submit 데이터를 parsing 해준다.
// app.use(multer().array())

// let hello = "계좌 비번" : 이렇게 전역변수나 set 하면 안됀다. 공유됨
// app.set('계좌 비번', '123')
app.use((req, res, next) => {
    req.session.data = 'zerocho비번' // 영구적(요청마다 남아있음)
    req.data = 'zerocho비번' // 일시적(일회성, 해당 요청에만)
})

app.get('/', (req, res, next) => {
    req.session.data // zerocho비번
    req.data // zerocho비번
    console.log('GET / 요청에서만 실행됩니다.');
    // 이것 자체가 사용자의 고유 session이다.
    // req.session.id = 'hello';
    // req.session.destory() : 세션 모두 제거

    req.cookies // { mycookie: 'test' }
    req.signedCookies;
    // 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
    res.clearCookie('name', encodeURIComponent(name), {
        httpOnly: true,
        path: '/',
    })
    
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

try {
    fs.readdirSync('uploads')
} catch (error) {
    console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('uploads')
}
const upload = multer({
    storage: multer.diskStorage({ // upload한 파일을 어디에 저장할지 선택
        destination(req, file, done) {
            done(null, 'uploads/')
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname)
            done(null, path.basename(file.originalname, ext) + Date.now() + ext)
        },
    }),
    limits: {fileSize : 5 * 1024 * 1024}
})
app.get('/upload', (req, res) => {
    res.sendfile(path.join(__dirname, 'multipart.html'))
})
app.post('/upload', upload.single('image'), (req, res) => { // 1개의 파일만 upload 할 때
    console.log(req.file);
    res.send('ok');
});
app.post('/upload2', upload.array('image'), (req, res) => { // 1개의 파일만 upload 할 때
    console.log(req.files);
    res.send('ok');
});
