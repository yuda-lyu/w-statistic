import studentTInv from './src/studentTInv.mjs'

async function test() {

    console.log(await studentTInv(35, 0.95))
    // => 1.6909242551868549

    console.log(await studentTInv(35, 0.5))
    // => 0

    console.log(await studentTInv(35, 0.05))
    // => -1.6909242551868526

    console.log(await studentTInv(15, 0.95))
    // => 1.7613101357748913

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules --es-module-specifier-resolution=node g.studentTInv.mjs
