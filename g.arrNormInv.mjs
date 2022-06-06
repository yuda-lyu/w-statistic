import arrNormInv from './src/arrNormInv.mjs'

async function test() {

    let arr
    let r

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    r = await arrNormInv(arr, 0.25)
    console.log(r.inv)
    // => 22.47539788913989

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    r = await arrNormInv(arr, 0.5)
    console.log(r.inv)
    // => 33.18181818181818

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    r = await arrNormInv(arr, 0.75)
    console.log(r.inv)
    // => 43.88823847449647

    arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    r = await arrNormInv(arr, 0.5)
    console.log(r.inv)
    // => 1.4999999999999996

    arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    r = await arrNormInv(arr, 0.5)
    console.log(r.inv)
    // => 3.2999999999999994

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.arrNormInv.mjs
