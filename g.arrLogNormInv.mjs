import arrLogNormInv from './src/arrLogNormInv.mjs'

async function test() {

    let arr
    let r

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    r = await arrLogNormInv(arr, 0.25)
    console.log(r.inv)
    // => 16.096845206281877

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    r = await arrLogNormInv(arr, 0.5)
    console.log(r.inv)
    // => 27.201738017491444

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    r = await arrLogNormInv(arr, 0.75)
    console.log(r.inv)
    // => 45.96767513695641

    arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    r = await arrLogNormInv(arr, 0.5)
    console.log(r.inv)
    // => 1.0499093195835956

    arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    r = await arrLogNormInv(arr, 0.5)
    console.log(r.inv)
    // => 1.0499093195835956

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.arrLogNormInv.mjs
