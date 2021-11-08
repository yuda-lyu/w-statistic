import _ from 'lodash'
import ltdtCount from './src/ltdtCount.mjs'

let ltdt

ltdt = [
    {
        'k': 0,
        'v': 'abc'
    },
    {
        'k': 1,
        'v': '-2.5'
    },
    {
        'k': 2,
        'v': -2.5
    },
    {
        'k': 3,
        'v': '-1'
    },
    {
        'k': 4,
        'v': -1
    },
    {
        'k': 5,
        'v': '-0.1'
    },
    {
        'k': 6,
        'v': -0.1
    },
    {
        'k': 7,
        'v': '0'
    },
    {
        'k': 8,
        'v': 0
    },
    {
        'k': 9,
        'v': '0.1'
    },
    {
        'k': 10,
        'v': 0.1
    },
    {
        'k': 11,
        'v': '1'
    },
    {
        'k': 12,
        'v': 1
    },
    {
        'k': 13,
        'v': '2.5'
    },
    {
        'k': 14,
        'v': 2.5
    },
    {
        'k': 15,
        'v': 22.5
    },
    {
        'k': 16,
        'v': 'xyz'
    }
]
console.log(ltdtCount(ltdt, 'v'))
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

ltdt = [
    {
        'k': 0,
        'v': 'abc'
    },
    {
        'k': 1,
        'v': '0'
    },
    {
        'k': 2,
        'v': 0
    },
    {
        'k': 3,
        'v': '0.1'
    },
    {
        'k': 4,
        'v': 0.1
    },
    {
        'k': 5,
        'v': '1'
    },
    {
        'k': 6,
        'v': 1
    },
    {
        'k': 7,
        'v': '2.5'
    },
    {
        'k': 8,
        'v': 2.5
    },
    {
        'k': 9,
        'v': 22.5
    },
    {
        'k': 10,
        'v': 'xyz'
    }
]
console.log(ltdtCount(ltdt, 'v'))
// => [
//   { key: '2.5', count: 2 },
//   { key: '0.1', count: 2 },
//   { key: '1', count: 2 },
//   { key: '0', count: 2 },
//   { key: '22.5', count: 1 }
// ]

//node --experimental-modules --es-module-specifier-resolution=node g.mjs