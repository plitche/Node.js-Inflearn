const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // 요청과 응답을 기록하는 라우터 'dev', 'combiend'
app.use(express.json()); // bodyParser 대체, client가 json데이터를 보냈을때 parsing 해서 body에 넣어준다.
app.use(express.urlencoded({ extended: true })); // form submit 데이터를 parsing 해준다.
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
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