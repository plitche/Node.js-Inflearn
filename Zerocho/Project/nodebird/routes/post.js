const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { constants } = require('buffer');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file) 
    res.json({ url: `/img/${req.file.filename }` }); // url을 front로 넘겨줘서 게시글과 같이 저장할 수 있도록
});

router.post('/', isLoggedIn, upload.none, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        })
        const hashtags = req.body.content.match(/#[^\s#]*/g); // #으로 시작해서 띄워쓰기나 #이 아닌
        // [#노드, #익스프레스]
        // [노드, 익스프레스]
        // [findOrCreate(노드), findOrCreate(익스프레스)]
        // [[해시태그, false], [해시태그, true]]
        if (hashtags) {
          const result = await Promise.all(
            hashtags.map(tag => {
              return Hashtag.findOrCreate({
                where: { title: tag.slice(1).toLowerCase() },
              })
            }),
          )
          await post.addHashtags(result.map(r => r[0]));
          // addHashtags([해시태그], [해시태그])
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;