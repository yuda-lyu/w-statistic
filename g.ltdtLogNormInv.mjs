import ltdtLogNormInv from './src/ltdtLogNormInv.mjs'

async function test() {

    let ltdt

    ltdt = [
        {
            'k': 0,
            'v': 6,
        },
        {
            'k': 1,
            'v': 47,
        },
        {
            'k': 2,
            'v': 49,
        },
        {
            'k': 3,
            'v': 15,
        },
        {
            'k': 4,
            'v': 42,
        },
        {
            'k': 5,
            'v': 41,
        },
        {
            'k': 6,
            'v': 7,
        },
        {
            'k': 7,
            'v': 39,
        },
        {
            'k': 8,
            'v': 43,
        },
        {
            'k': 9,
            'v': 40,
        },
        {
            'k': 10,
            'v': 36,
        },
    ]
    console.log(await ltdtLogNormInv(ltdt, 'v', 0.25))
    // => 16.096845206281877

    ltdt = [
        {
            'k': 0,
            'v': 6,
        },
        {
            'k': 1,
            'v': 47,
        },
        {
            'k': 2,
            'v': 49,
        },
        {
            'k': 3,
            'v': 15,
        },
        {
            'k': 4,
            'v': 42,
        },
        {
            'k': 5,
            'v': 41,
        },
        {
            'k': 6,
            'v': 7,
        },
        {
            'k': 7,
            'v': 39,
        },
        {
            'k': 8,
            'v': 43,
        },
        {
            'k': 9,
            'v': 40,
        },
        {
            'k': 10,
            'v': 36,
        },
    ]
    console.log(await ltdtLogNormInv(ltdt, 'v', 0.5))
    // => 27.201738017491444

    ltdt = [
        {
            'k': 0,
            'v': 6,
        },
        {
            'k': 1,
            'v': 47,
        },
        {
            'k': 2,
            'v': 49,
        },
        {
            'k': 3,
            'v': 15,
        },
        {
            'k': 4,
            'v': 42,
        },
        {
            'k': 5,
            'v': 41,
        },
        {
            'k': 6,
            'v': 7,
        },
        {
            'k': 7,
            'v': 39,
        },
        {
            'k': 8,
            'v': 43,
        },
        {
            'k': 9,
            'v': 40,
        },
        {
            'k': 10,
            'v': 36,
        },
    ]
    console.log(await ltdtLogNormInv(ltdt, 'v', 0.75))
    // => 45.96767513695641

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
    console.log(await ltdtLogNormInv(ltdt, 'v', 0.5))
    // => 1.0499093195835956

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
    console.log(await ltdtLogNormInv(ltdt, 'v', 0.5))
    // => 1.0499093195835956

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.mjs
