import arrMovingAverage from './src/arrMovingAverage.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrMovingAverage(arr))
// => [
//                   -2.5,                   -2,
//                  -1.75,                -1.42,
//    -0.9399999999999998, -0.44000000000000006,
//   -0.24000000000000005,                -0.02,
//                   0.02,                 0.24,
//    0.44000000000000006,   0.9400000000000001,
//                   1.42,                  5.9,
//                  7.125,    9.166666666666666,
//                   12.5
// ]

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrMovingAverage(arr, { selectCountHalf: 1 }))
// => [
//   0,
//   0,
//   0.03333333333333333,
//   0.06666666666666667,
//   0.39999999999999997,
//   0.7000000000000001,
//   1.5,
//   2,
//   9.166666666666666,
//   12.5,
//   22.5
// ]

//node --experimental-modules --es-module-specifier-resolution=node g.arrMovingAverage.mjs
