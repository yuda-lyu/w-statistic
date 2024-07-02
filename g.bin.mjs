import bin from './src/bin.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(bin(arr, 4))
// => [
//   {
//     min: -2.5,
//     max: 3.75,
//     avg: 0.625,
//     arr: [
//       -2.5, -2.5, -1, -1,
//       -0.1, -0.1,  0,  0,
//        0.1,  0.1,  1,  1,
//        2.5,  2.5
//     ]
//   },
//   { min: 3.75, max: 10, avg: 6.875, arr: [] },
//   { min: 10, max: 16.25, avg: 13.125, arr: [] },
//   { min: 16.25, max: 22.5, avg: 19.375, arr: [ 22.5 ] }
// ]

arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
console.log(bin(arr, 3))
// => [
//   {
//     min: 1.1,
//     max: 2.9333333333333336,
//     avg: 2.0166666666666666,
//     arr: [ 1.1, 2.2 ]
//   },
//   {
//     min: 2.9333333333333336,
//     max: 4.766666666666667,
//     avg: 3.85,
//     arr: [ 3.3, 4.4 ]
//   },
//   {
//     min: 4.766666666666667,
//     max: 6.6,
//     avg: 5.683333333333334,
//     arr: [ 5.5, 6.6 ]
//   }
// ]

arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
console.log(bin(arr, 5))
// => [
//   { min: 1.1, max: 2.2, avg: 1.6500000000000001, arr: [ 1.1, 2.2 ] },
//   { min: 2.2, max: 3.3000000000000003, avg: 2.75, arr: [ 3.3 ] },
//   {
//     min: 3.3000000000000003,
//     max: 4.4,
//     avg: 3.8500000000000005,
//     arr: [ 4.4 ]
//   },
//   { min: 4.4, max: 5.5, avg: 4.95, arr: [ 5.5 ] },
//   { min: 5.5, max: 6.6, avg: 6.05, arr: [ 6.6 ] }
// ]

arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
console.log(bin(arr, 5, { min: 0, max: 10 }))
// => [
//   { min: 0, max: 2, avg: 1, arr: [ 1.1 ] },
//   { min: 2, max: 4, avg: 3, arr: [ 2.2, 3.3 ] },
//   { min: 4, max: 6, avg: 5, arr: [ 4.4, 5.5 ] },
//   { min: 6, max: 8, avg: 7, arr: [ 6.6 ] },
//   { min: 8, max: 10, avg: 9, arr: [] }
// ]

//node --experimental-modules g.bin.mjs
