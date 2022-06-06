import arrAverageWithNormCI from './src/arrAverageWithNormCI.mjs'

async function test() {

    let arr

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithNormCI(arr, 0.95))
    // => [ 33.48954903620701, 32.87408732742935 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithNormCI(arr, 0.95, 'upper-tail'))
    // => 41.85625495776645

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithNormCI(arr, 0.95, 'lower-tail'))
    // => 24.507381405869904

    arr = [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912]
    console.log(await arrAverageWithNormCI(arr, 0.95, 'upper-tail'))
    // => 19.297020890880212

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithNormCI(arr, 0.25))
    // => [ 39.026745129035845, 27.336891234600518 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithNormCI(arr, 0.5))
    // => [ 36.53111791211017, 29.832518451526187 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithNormCI(arr, 0.75))
    // => [ 34.74951166569791, 31.614124697938454 ]

    arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    console.log(await arrAverageWithNormCI(arr, 0.50))
    // => [ 2.5700668400787645, 0.4299331599212357 ]

    arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    console.log(await arrAverageWithNormCI(arr, 0.50))
    // => [ 5.011682286477105, 1.5883177135228952 ]

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.arrAverageWithNormCI.mjs
