const passport = require('passport')
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((User, done) => { // req.login() 호출시 일로온다.
        done(null, User.id); // 세션에 user의 id만 저장
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    })

    local();
    kakao();
}