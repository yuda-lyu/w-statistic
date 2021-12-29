import arrGeometricAverage from './src/arrGeometricAverage.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrGeometricAverage(arr))
// => 1.0499093195835956

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrGeometricAverage(arr))
// => 1.0499093195835956

//node --experimental-modules --es-module-specifier-resolution=node g.mjs
