import arrCount from './src/arrCount.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrCount(arr))
// => [
//   { key: '2.5', count: 2 },
//   { key: '0.1', count: 2 },
//   { key: '-0.1', count: 2 },
//   { key: '-1', count: 2 },
//   { key: '-2.5', count: 2 },
//   { key: '1', count: 2 },
//   { key: '0', count: 2 },
//   { key: '22.5', count: 1 }
// ]

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrCount(arr))
// => [
//   { key: '2.5', count: 2 },
//   { key: '0.1', count: 2 },
//   { key: '1', count: 2 },
//   { key: '0', count: 2 },
//   { key: '22.5', count: 1 }
// ]

//node --experimental-modules --es-module-specifier-resolution=node g.mjs
