import regLine from './src/regLine.mjs'

async function test() {

    let arr
    let r

    arr = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    r = await regLine(arr)
    console.log(r)
    // => { m: -0.6666666666666664, b: 3.0333333333333323 }

    arr = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    r = await regLine(arr)
    console.log(r)
    // => { m: 0.666666666666667, b: -0.3000000000000007 }

    arr = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    r = await regLine(arr, { useRegIntercept: false }) //不使用截距, 也就是截距=0
    console.log(r)
    // => { m: 0.5698924731182796, b: 0 }

    arr = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    r = await regLine(arr, { interpX: 2 })
    console.log(r)
    // => {
    //   m: -0.6666666666666664,
    //   b: 3.0333333333333323,
    //   interpY: 1.6999999999999995
    // }

    arr = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    r = regLine(arr, { useSync: true }) //使用同步函數(sync)
    console.log(r)
    // => { m: -0.6666666666666664, b: 3.0333333333333323 }

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.regLine.mjs
