import randNorm from './src/randNorm.mjs'

console.log(randNorm())
// => maybe: 0.17741167566201646, 0.24492265983649456, -0.24293127530491618,...

console.log(randNorm(100))
// => maybe: 102.2788339269329 98.85403221640757 99.09814133809516,...

console.log(randNorm(100, 50))
// => maybe: 94.99873795683716 136.81783120735003 49.94186751166804,...

console.log(randNorm(100, 50, { low: 90 }))
// => maybe: 143.11557161592685 95.05143199643211 103.90352980637562,...

console.log(randNorm(100, 50, { low: 90, up: 110 }))
// => maybe: 99.45744560964987 95.98664948248341 95.69403830457458,...

console.log(randNorm(0, 1, { num: 5 }))
// => maybe: [
//   0.28480054449658343,
//   -1.6656082612520913,
//   -1.4973558587107332,
//   0.9279728382322514,
//   0.4704840133724234
// ]

//node --experimental-modules --es-module-specifier-resolution=node g.mjs
