const express = require('express');
const path = require('path')

const app = express();

app.set('port', process.env.PORT || 3000); // 서버에 속성를 심는다. (port속성에 3000부여)

app.use((req, res, next) => { // 미들웨어 설정
    console.log('모든 요청에 실행하고 싶어요');
    next();
})

app.get('/', (req, res) => { // 이런 요청 하나하나를 라우터라고 함
    res.sendFile(path.join(__dirname, 'index.html')) // __dirname 현재 파일의 절대 경로
})

app.post('/', (req, res) => {
    res.send('hello express')
})

app.get('/about', (req, res) => {
    res.send('hello express')
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
})


// app.listen(3000, () => {
//     console.log('익스프레스 서버 실행');
// })

app.get('/category/javascript', (req, res) => {
    res.send('hello javascript')
})

app.get('/category/:hello', (req, res) => { // 와일드카드
    res.send(`hello ${req.params.name} wildcard`)
})

app.get('*', (req, res) => { // 모든 요청 처리
    res.send(`hello everybody`)
})
