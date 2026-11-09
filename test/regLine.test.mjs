import regLine from '../src/regLine.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`regLine`, function() {

    let k
    let kpArr = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { m: -0.6666666666666664, b: 3.0333333333333323 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 0
        let r = await regLine(kpArr[k])
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 1
    kpArr[k] = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    kpOut[k] = { m: 0.666666666666667, b: -0.3000000000000007 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 1
        let r = await regLine(kpArr[k])
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 2
    kpArr[k] = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    kpOut[k] = { m: 0.5698924731182796, b: 0 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { useRegIntercept: false }`, async function() {
        let k = 2
        let r = await regLine(kpArr[k], { useRegIntercept: false })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 3
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = {
        m: -0.6666666666666664,
        b: 3.0333333333333323,
        interpY: 1.6999999999999995
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { interpX: 2 }`, async function() {
        let k = 3
        let r = await regLine(kpArr[k], { interpX: 2 })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 4
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { m: -0.6666666666666664, b: 3.0333333333333323, r2: 0.949367088607595 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { calcR2: true }`, async function() {
        let k = 4
        let r = await regLine(kpArr[k], { calcR2: true })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 5
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { m: -0.6666666666666664, b: 3.0333333333333323 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { useSync: true }`, async function() {
        let k = 5
        let r = regLine(kpArr[k], { useSync: true }) //不使用await
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    it(`should catch when input ''`, async function() {
        let r
        await regLine('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input []`, async function() {
        let r
        await regLine([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input {}`, async function() {
        let r
        await regLine({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input null`, async function() {
        let r
        await regLine(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input undefined`, async function() {
        let r
        await regLine(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    //以下為升版simple-statistics 8.0.0後補之代表性迴歸結果(期望值由構造之真值給定, 非現況輸出)與空輸入

    it(`should return { m: 2, b: 1, interpY: 21, r2: 1 } when input exact line y=2x+1, { interpX: 10, calcR2: true }`, async function() {
        //完全落在直線y=2x+1上之資料, 斜率m=2, 截距b=1, x=10時y=21, 決定係數r2=1
        let arr = [0, 1, 2, 3, 4, 5, 6].map((x) => [x, 2 * x + 1])
        let r = await regLine(arr, { interpX: 10, calcR2: true })
        let rr = { m: 2, b: 1, interpY: 21, r2: 1 }
        assertApprox(r, rr)
    })

    it(`should return { m: 0.5, b: 0.25 } when input exact line y=0.5x+0.25 with x offset 1e9`, async function() {
        //x皆大(1e9+i)時, y=0.5x+0.25之真值為m=0.5, b=0.25(係數皆可精確表示);
        //simple-statistics 7.8.8不以平均值置中, x^2之量級超出雙精度有效位數而得NaN, 8.0.0已改善
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => [1e9 + i, 0.5 * (1e9 + i) + 0.25])
        let r = await regLine(arr)
        let rr = { m: 0.5, b: 0.25 }
        assertApprox(r, rr)
    })

    it(`should return { m: 0, b: 2 } when input single point [[1, 2]]`, async function() {
        //僅1筆資料, 以通過該點之水平線回應
        let r = await regLine([[1, 2]])
        let rr = { m: 0, b: 2 }
        assertApprox(r, rr)
    })

    it(`should return { m: 0, b: 2 } when input single point and useSync`, function() {
        let r = regLine([[1, 2]], { useSync: true })
        let rr = { m: 0, b: 2 }
        assertApprox(r, rr)
    })

    it(`should catch when input [['a', 'b'], [null, 1], [undefined, undefined]]`, async function() {
        //陣列內無任何有效數據點, 非同步版須reject
        let r
        await regLine([['a', 'b'], [null, 1], [undefined, undefined]])
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
            regLine([['a', 'b'], [null, 1]], { useSync: true })
        }
        catch (err) {
            r = err.message
        }
        let rr = 'no effective data'
        assertApprox(r, rr)
    })

})
