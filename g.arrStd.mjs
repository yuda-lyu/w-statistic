import arrStd from './src/arrStd.mjs'

let arr

arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrStd(arr))
// => 5.985339231345682

arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
console.log(arrStd(arr))
// => 7.269456650947167

arr = [55, 68, 45, 78, 150, 241, 162, 156, 182, 125, 75, 89, 91, 95, 92, 65, 75, 85, 95, 105, 132, 120, 142, 110, 111, 130, 128, 130, 108, 109]
console.log(arrStd(arr))
// =>  40.84747350759926, 為除以29(n-1)的std

//node --experimental-modules --es-module-specifier-resolution=node g.arrStd.mjs
