import arrAverageWithLogNormCI from './src/arrAverageWithLogNormCI.mjs'

async function test() {

    let arr

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.95))
    // => [ 27.615050054890812, 26.794611985184215 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.95, 'upper-tail'))
    // => 41.610938902127394

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.95, 'lower-tail'))
    // => 17.782212338746568

    arr = [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912]
    console.log(await arrAverageWithLogNormCI(arr, 0.95, 'upper-tail'))
    // => 19.28628574730297

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.25))
    // => [ 36.223415575653085, 20.42696800987406 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.5))
    // => [ 32.05361593350904, 23.084277065874097 ]

    arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
    console.log(await arrAverageWithLogNormCI(arr, 0.75))
    // => [ 29.373829998564737, 25.190264640613567 ]

    arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    console.log(await arrAverageWithLogNormCI(arr, 0.50))
    // => [ 1.7639684225556826, 0.6249032382061773 ]

    arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    console.log(await arrAverageWithLogNormCI(arr, 0.50))
    // => [ 1.7639684225556826, 0.6249032382061773 ]

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules g.arrAverageWithLogNormCI.mjs
