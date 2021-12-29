import arrGeometricStd from './src/arrGeometricStd.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrGeometricStd(arr))
// => 6.774243857996147

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrGeometricStd(arr))
// => 6.774243857996147

//node --experimental-modules --es-module-specifier-resolution=node g.arrGeometricStd.mjs
