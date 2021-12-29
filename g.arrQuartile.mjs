import arrQuartile from './src/arrQuartile.mjs'

let arr

arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
console.log(arrQuartile(arr, 0.25))
// => 15

arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
console.log(arrQuartile(arr, 0.5))
// => 40

arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
console.log(arrQuartile(arr, 0.75))
// => 43

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrQuartile(arr, 0.5))
// => 0

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrQuartile(arr, 0.5))
// => 1

//node --experimental-modules --es-module-specifier-resolution=node g.mjs

