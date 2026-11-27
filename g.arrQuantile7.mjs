import arrQuantile7 from './src/arrQuantile7.mjs'

let arr

arr = [1, 2, 3, 4]
console.log(arrQuantile7(arr, 0.5))
// => 2.5

arr = [1, 2, 3, 4]
console.log(arrQuantile7(arr, 0.25))
// => 1.75

arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
console.log(arrQuantile7(arr, 0.25))
// => 7.25

arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
console.log(arrQuantile7(arr, 0.75))
// => 14.5

arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
console.log(arrQuantile7(arr, 0.25))
// => 25.5

arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
console.log(arrQuantile7(arr, 0.5))
// => 40

arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
console.log(arrQuantile7(arr, 1))
// => 49

arr = ['abc', '3', ' 1 ', 2, null, Infinity, '0x10', true, 'xyz']
console.log(arrQuantile7(arr, '0.5'))
// => 2 (只取有限數值1、2、3，ratio可為數字字串)

arr = [1, 2, 3, Infinity, -Infinity, '1e400', 'xyz']
console.log(arrQuantile7(arr, 1))
// => 3 (±Infinity不計入個數與計算)

console.log(arrQuantile7([], 0.5))
// => null

console.log(arrQuantile7([1, 2, 3], 1.5))
// => null

//node g.arrQuantile7.mjs
