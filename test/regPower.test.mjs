import regPower from '../src/regPower.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`regPower`, function() {

    let k
    let kpArr = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { a: 2.6361956497645123, b: -1.1246302189091415 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 0
        let r = await regPower(kpArr[k])
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 1
    kpArr[k] = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    kpOut[k] = { a: 0.47081085944621165, b: 1.1197632837626978 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 1
        let r = await regPower(kpArr[k])
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 2
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = {
        a: 2.6361956497645123,
        b: -1.1246302189091415,
        interpY: 1.2090108799137964
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { interpX: 2 }`, async function() {
        let k = 2
        let r = await regPower(kpArr[k], { interpX: 2 })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 3
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { a: 2.6361956497645123, b: -1.1246302189091415, r2: 0.977737578800406 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { calcR2: true }`, async function() {
        let k = 3
        let r = await regPower(kpArr[k], { calcR2: true })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 4
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { a: 2.6361956497645123, b: -1.1246302189091415 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { useSync: true }`, async function() {
        let k = 4
        let r = regPower(kpArr[k], { useSync: true }) //不使用await
        let rr = kpOut[k]
        assertApprox(r, rr)
    })


    it(`should catch when input ''`, async function() {
        let r
        await regPower('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input []`, async function() {
        let r
        await regPower([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input {}`, async function() {
        let r
        await regPower({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input null`, async function() {
        let r
        await regPower(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input undefined`, async function() {
        let r
        await regPower(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    //以下為升版simple-statistics 8.0.0後補之代表性迴歸結果(期望值由構造之真值給定, 非現況輸出)與空輸入

    it(`should return { a: 3, b: 2, interpY: 300, r2: 1 } when input exact power y=3x^2, { interpX: 10, calcR2: true }`, async function() {
        //完全落在y=3x^2上之資料, a=3, b=2, x=10時y=300, 決定係數r2=1
        let arr = [1, 2, 3, 4, 5].map((x) => [x, 3 * x ** 2])
        let r = await regPower(arr, { interpX: 10, calcR2: true })
        let rr = { a: 3, b: 2, interpY: 300, r2: 1 }
        assertApprox(r, rr, { relTol: 1e-9 }) //內含Math.log與Math.exp, 容差放寬至1e-9(仍遠小於任何計算變更之量級)
    })

    it(`should catch when input [['a', 'b'], [null, 1], [undefined, undefined]]`, async function() {
        //陣列內無任何有效數據點, 非同步版須reject
        let r
        await regPower([['a', 'b'], [null, 1], [undefined, undefined]])
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assertApprox(r, rr)
    })

    it(`should throw when input [['a', 'b'], [null, 1]] and useSync`, function() {
        //陣列內無任何有效數據點, 同步版須丟錯
        let r
        try {
            regPower([['a', 'b'], [null, 1]], { useSync: true })
        }
        catch (err) {
            r = err.message
        }
        let rr = 'no effective data'
        assertApprox(r, rr)
    })

})
