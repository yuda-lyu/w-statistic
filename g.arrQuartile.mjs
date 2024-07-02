import arrQuartile from './src/arrQuartile.mjs'

let arr

arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
console.log(arrQuartile(arr, 0.25))
// => 7

arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
console.log(arrQuartile(arr, 0.5))
// => 9

arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
console.log(arrQuartile(arr, 0.75))
// => 15

arr = [1, 2, 3, 4, 5, 6]
console.log(arrQuartile(arr, 0.25))
// => 2

arr = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]
console.log(arrQuartile(arr, 0.5))
// => 9

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

//node --experimental-modules g.arrQuartile.mjs

