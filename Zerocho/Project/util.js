const util = require('util')
const crpyto = require('crypto')

const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y)
}, 'dontUseMe 함수는 deprecated 되었으니 더이상 사용하지 마세요!');
dontUseMe(1, 2)

const randomBytesPromise = util.promisify(crpyto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'))
    })
    .catch((error) => {
        console.error(error)
    })