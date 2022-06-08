import sampleRandom from './src/sampleRandom.mjs'

async function test() {

    let r

    r = await sampleRandom('normal', { mu: 100, sigma: 50 })
    console.log(r)
    // => maybe: 94.99873795683716 136.81783120735003 49.94186751166804,...

    r = await sampleRandom('normal', { mu: 100, sigma: 50, low: 90 })
    console.log(r)
    // => maybe: 143.11557161592685 95.05143199643211 103.90352980637562,...

    r = await sampleRandom('normal', { mu: 100, sigma: 50, low: 90, up: 110 })
    console.log(r)
    // => maybe: 99.45744560964987 95.98664948248341 95.69403830457458,...

    r = await sampleRandom('normal', { mu: 0, sigma: 1, num: 5 })
    console.log(r)
    // => maybe: [
    //   0.28480054449658343,
    //   -1.6656082612520913,
    //   -1.4973558587107332,
    //   0.9279728382322514,
    //   0.4704840133724234
    // ]

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.sampleRandom.mjs
