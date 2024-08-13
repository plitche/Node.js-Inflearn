const value = require('./var')
const odd = value.odd
const even = value.even
// const { odd, even } = require('./var')

console.log(value)
console.log(odd)
console.log(even)

function checkOddOrEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = {
    checkOddOrEven,
    odd,
    even,
}