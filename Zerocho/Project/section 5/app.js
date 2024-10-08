const express = require('express');
const path = require('path')

const app = express();

app.set('port', process.env.PORT || 3000); // 서버에 속성를 심는다. (port속성에 3000부여)

app.use('/about', (req, res, next) => { // 미들웨어 설정
    console.log('1 모든 요청에 실행하고 싶어요');
    next();
}, (req, res, next) => { // 미들웨어 설정
    console.log('2 모든 요청에 실행하고 싶어요');
    next();
}, (req, res, next) => { // 미들웨어 설정
    console.log('3 모든 요청에 실행하고 싶어요');
    next();
}, (req, res, next) => { // 미들웨어 설정
    // throw new Error('에러가 났어요')

    try { 
        console.log(asdfeqf)
    } catch (error) {
       next(error) // next에 인수가 들어있으면 바로 erorr처리 미들웨어로 넘어간다.
    }
    next();
})

app.get('/', (req, res, next) => { // 이런 요청 하나하나를 라우터라고 함
    res.sendFile(path.join(__dirname, 'index.html')) // __dirname 현재 파일의 절대 경로
    // res.send('안녕하세요') // sendFile, send 두번이상 나오면 오류가 발생한다. 미들웨어에서 send를 하고 router로 넘어와서 send를 해도 오류 발생

    // res.writeHead(200, { 'Content-Type': 'application/json '})
    // res.end(JSON.stringify( {hello : 'zerocho'} )) // 이 코드를 express에서 아래처럼 줄여서 쓸 수 있다.

    // res.json({hello: 'zerocho'}) // res.json은 return이 아니다. 응답을 보낼 뿐이지 함수 자체를 종료하는 것이 아니다.
    // console.log('hello zerocho')

    if (true) {
        next('route')
    } else {
        next()
    }
}, (req, res) => {
    console.log('실행되나요?')
})

app.get('/', (req, res) => { // 이런 요청 하나하나를 라우터라고 함
    console.log('실행되지롱')
})

app.post('/', (req, res) => {
    res.send('hello express')
})

app.get('/about', (req, res) => {
    res.send('hello express')
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

app.use((req, res, next) => { // 404 처리 미들웨어 (위에 다 검색해봤더니 라우터에 없다)
    res.status(404).send('404지롱')
})

app.use((err, req, res, next) => { // error 미들웨어는 반드시 4개 매개변수를 다 써야 한다.
    console.error(err);
    res.send('에러가 발생했습니다.')
})


app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
})