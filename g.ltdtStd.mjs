import _ from 'lodash'
import ltdtStd from './src/ltdtStd.mjs'

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
console.log(ltdtStd(ltdt, 'v'))
// => 5.985339231345682

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
console.log(ltdtStd(ltdt, 'v'))
// => 7.269456650947167

//node --experimental-modules --es-module-specifier-resolution=node g.ltdtStd.mjs
