import regPoly from '../src/regPoly.mjs'
import assertApprox from './tools/assertApprox.mjs'
import polyFitNormalEq from './tools/polyFitNormalEq.mjs'


describe(`regPoly`, function() {

    let k
    let kpArr = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2`, async function() {
        let k = 0
        let r = await regPoly(kpArr[k], 2)
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 1
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 21.051572327842386,
        m1: -0.7142872117740979,
        m2: 0.0087657232709057,
        m3: -0.000034014675054462467
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 3`, async function() {
        let k = 1
        let r = await regPoly(kpArr[k], 3)
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 2
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = { b: 0, m1: 0.06524644304242452, m2: -0.00035672260356343373 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2, { useRegIntercept: false }`, async function() {
        let k = 2
        let r = await regPoly(kpArr[k], 2, { useRegIntercept: false })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 3
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653,
        interpX: 80,
        interpY: 2.5474226804124473
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2, { interpX: 80 }`, async function() {
        let k = 3
        let r = await regPoly(kpArr[k], 2, { interpX: 80 })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 4
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653,
        r2: 0.6732052768464256
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2, { calcR2: true }`, async function() {
        let k = 4
        let r = await regPoly(kpArr[k], 2, { calcR2: true })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 5
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2, { useSync: true }`, async function() {
        let k = 5
        let r = await regPoly(kpArr[k], 2, { useSync: true })
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    k = 6
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { b: 3.0333333333333314, m1: -0.666666666666666 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 1`, async function() {
        let k = 6
        let r = await regPoly(kpArr[k], 1)
        let rr = kpOut[k]
        assertApprox(r, rr)
    })

    it(`should catch when input ''`, async function() {
        let r
        await regPoly('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input []`, async function() {
        let r
        await regPoly([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input {}`, async function() {
        let r
        await regPoly({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input null`, async function() {
        let r
        await regPoly(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    it(`should catch when input undefined`, async function() {
        let r
        await regPoly(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assertApprox(r, rr)
    })

    //以下為升版ml-regression-polynomial 4.0.0(ESM-only)後補之代表性迴歸結果(期望值由構造之真值或獨立演算法給定, 非現況輸出)與空輸入

    //容差說明: 係數由LU分解求得, 完全擬合之資料其係數與真值之相對誤差約1e-13, 故以relTol=1e-9比對(仍遠小於任何計算變更之量級)

    it(`should return { b: 2, m1: -3, m2: 0.5, r2: 1 } when input exact quadratic y=2-3x+0.5x^2, 2, { calcR2: true }`, async function() {
        let arr = [0, 1, 2, 3, 4, 5, 6].map((x) => [x, 2 - 3 * x + 0.5 * x ** 2])
        let r = await regPoly(arr, 2, { calcR2: true })
        let rr = { b: 2, m1: -3, m2: 0.5, r2: 1 }
        assertApprox(r, rr, { relTol: 1e-9 })
    })

    it(`should return { b: 1, m1: 2, m2: -1, m3: 0.25, r2: 1 } when input exact cubic y=1+2x-x^2+0.25x^3, 3, { calcR2: true }`, async function() {
        let arr = [0, 1, 2, 3, 4, 5, 6].map((x) => [x, 1 + 2 * x - x ** 2 + 0.25 * x ** 3])
        let r = await regPoly(arr, 3, { calcR2: true })
        let rr = { b: 1, m1: 2, m2: -1, m3: 0.25, r2: 1 }
        assertApprox(r, rr, { relTol: 1e-9 })
    })

    it(`should return { b: 0, m1: 2, m2: 0.5 } when input exact y=2x+0.5x^2, 2, { useRegIntercept: false }`, async function() {
        //不使用截距, 截距b固定為0
        let arr = [0, 1, 2, 3, 4, 5, 6].map((x) => [x, 2 * x + 0.5 * x ** 2])
        let r = await regPoly(arr, 2, { useRegIntercept: false })
        let rr = { b: 0, m1: 2, m2: 0.5 }
        assertApprox(r, rr, { relTol: 1e-9 })
    })

    it(`should return interpY=-2 when input exact quadratic y=2-3x+0.5x^2, 2, { interpX: 2 }`, async function() {
        //x=2時y=2-6+2=-2
        let arr = [0, 1, 2, 3, 4, 5, 6].map((x) => [x, 2 - 3 * x + 0.5 * x ** 2])
        let r = await regPoly(arr, 2, { interpX: 2 })
        let rr = { b: 2, m1: -3, m2: 0.5, interpX: 2, interpY: -2 }
        assertApprox(r, rr, { relTol: 1e-9, absTol: 1e-9 })
    })

    for (let degree of [1, 2, 3]) {
        it(`should equal independent normal-equation solution when input 15 points, ${degree}`, async function() {
            //以正規方程式(高斯消去)為獨立對照, 兩種演算法之係數相對誤差須小於1e-9
            let arr = [
                [50, 3.3], [50, 2.8],
                [50, 2.9], [70, 2.3],
                [70, 2.6], [70, 2.1],
                [80, 2.5], [80, 2.9],
                [80, 2.4], [90, 3],
                [90, 3.1], [90, 2.8],
                [100, 3.3], [100, 3.5],
                [100, 3]
            ]
            let c = polyFitNormalEq(arr.map((v) => v[0]), arr.map((v) => v[1]), degree)
            let rr = {}
            c.forEach((v, k) => {
                rr[k === 0 ? 'b' : `m${k}`] = v
            })
            let r = await regPoly(arr, degree)
            assertApprox(r, rr, { relTol: 1e-9 })
        })
    }

    it(`should catch when input [['a', 'b'], [null, 1], [undefined, undefined]], 2`, async function() {
        //陣列內無任何有效數據點, 非同步版須reject
        let r
        await regPoly([['a', 'b'], [null, 1], [undefined, undefined]], 2)
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assertApprox(r, rr)
    })

    it(`should throw when input [['a', 'b'], [null, 1]], 2 and useSync`, function() {
        //陣列內無任何有效數據點, 同步版須丟錯
        let r
        try {
            regPoly([['a', 'b'], [null, 1]], 2, { useSync: true })
        }
        catch (err) {
            r = err.message
        }
        let rr = 'no effective data'
        assertApprox(r, rr)
    })

    it(`should catch when input 2 points, 2`, async function() {
        //2個點無法決定2次多項式(3個係數), 須reject而非回傳不定之係數
        let r
        await regPoly([[1, 2], [2, 3]], 2)
            .catch((err) => {
                r = err
            })
        assertApprox(typeof r, 'string')
    })

    for (let degree of [1.5, 'abc', undefined, null]) {
        it(`should catch when input degree ${degree}`, async function() {
            //degree須為正整數
            let r
            await regPoly([[1, 2], [2, 3], [3, 5]], degree)
                .catch((err) => {
                    r = err
                })
            let rr = `degree[${degree}] is not an integer`
            assertApprox(r, rr)
        })
    }

})
