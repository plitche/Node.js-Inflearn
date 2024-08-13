console.log('require가 가장 위에 오지 않아도 됩니다.');
module.exports = '저를 찾아보세요.';

require('./var'); // var.js가 실행은 되는데 변수에 담지 않아서 쓰지는 않는다.
console.log(require);

console.log('require.cache입니다.');
console.log(require.cache);
console.log('require.main입니다.');
console.log(require.main === module);
console.log(require.main.filename);

