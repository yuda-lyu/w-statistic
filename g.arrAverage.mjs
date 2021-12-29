import arrAverage from './src/arrAverage.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrAverage(arr))
// => 1.5

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrAverage(arr))
// => 3.3

//node --experimental-modules --es-module-specifier-resolution=node g.mjs
