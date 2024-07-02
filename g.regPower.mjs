import regPower from './src/regPower.mjs'

async function test() {

    let arr
    let r

    arr = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    r = await regPower(arr)
    console.log(r)
    // => { a: 2.6361956497645123, b: -1.1246302189091415 }

    arr = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    r = await regPower(arr)
    console.log(r)
    // => { a: 0.47081085944621165, b: 1.1197632837626978 }

    arr = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    r = await regPower(arr, { interpX: 2 })
    console.log(r)
    // => {
    //   a: 2.6361956497645123,
    //   b: -1.1246302189091415,
    //   interpY: 1.2090108799137966
    // }

    arr = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    r = regPower(arr, { useSync: true }) //使用同步函數(sync)
    console.log(r)
    // => { a: 2.6361956497645123, b: -1.1246302189091415 }

}
test()
    .catch((err) => {
        console.log(err)
    })

//node --experimental-modules g.regPower.mjs
