import arrAverageWithLogNormCI from './src/arrAverageWithLogNormCI.mjs'

async function test() {

    let arr

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.95))
    // => [ 27.61505005489075, 26.794611985184275 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.95, 'upper-tail'))
    // => 41.61093910287295

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.95, 'lower-tail'))
    // => 17.782212252959027

    arr = [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912]
    console.log(await arrAverageWithLogNormCI(arr, 0.95, 'upper-tail'))
    // => 19.286285749919724

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.25))
    // => [ 36.223415550160794, 20.426968024249575 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.5))
    // => [ 32.05361593350727, 23.084277065875376 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.75))
    // => [ 29.373829998565377, 25.19026464061302 ]

    arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    console.log(await arrAverageWithLogNormCI(arr, 0.50))
    // => [ 1.7639684225556358, 0.624903238206194 ]

    arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    console.log(await arrAverageWithLogNormCI(arr, 0.50))
    // => [ 1.7639684225556358, 0.624903238206194 ]

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.mjs
