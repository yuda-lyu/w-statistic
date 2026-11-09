import assert from 'assert'
import { simpleStatistics } from '../src/WStatistic.mjs'
import assertApprox from './tools/assertApprox.mjs'


//說明: 本套件僅將simple-statistics整個模組透傳為simpleStatistics(src/WStatistic.mjs), 未對其函式另做包裝,
//      故透傳面之行為隨上游. 本檔紀錄升版至8.0.0後透傳面之下列行為, 供日後升版時比對:
//      (1) 空輸入: quantileRank, quantileRankSorted, minSorted, maxSorted, extentSorted改為丟錯(7.x分別回NaN, undefined)
//      (2) inverseErrorFunction, probit之數值精度提高(以獨立參考值驗證)
//      本套件自身之對外函式(如arrQuartile)對空輸入仍回傳null, 見各函式之測試.


describe(`simpleStatistics`, function() {

    it(`should expose functions used by w-statistic and the ones changed in 8.0.0`, function() {
        let names = [
            'quantile', 'quantileSorted', 'quantileRank', 'quantileRankSorted',
            'minSorted', 'maxSorted', 'extentSorted',
            'linearRegression', 'linearRegressionLine', 'rSquared',
            'inverseErrorFunction', 'probit',
        ]
        let r = names.map((name) => typeof simpleStatistics[name])
        let rr = names.map(() => 'function')
        assertApprox(r, rr)
    })

    //空輸入(8.0.0: 丟錯)

    let kpEmpty = {
        'quantileRank([], 1)': () => simpleStatistics.quantileRank([], 1),
        'quantileRankSorted([], 1)': () => simpleStatistics.quantileRankSorted([], 1),
        'minSorted([])': () => simpleStatistics.minSorted([]),
        'maxSorted([])': () => simpleStatistics.maxSorted([]),
        'extentSorted([])': () => simpleStatistics.extentSorted([]),
    }
    for (let [name, fn] of Object.entries(kpEmpty)) {
        it(`should throw when call ${name}`, function() {
            assert.throws(fn, Error)
        })
    }

    //非空輸入之基本結果(期望值取自上游JSDoc範例)

    it(`should return 0.75 when call quantileRank([4, 3, 1, 2], 3)`, function() {
        let r = simpleStatistics.quantileRank([4, 3, 1, 2], 3)
        let rr = 0.75
        assertApprox(r, rr)
    })

    it(`should return 0.7 when call quantileRankSorted([1, 2, 3, 3, 4], 3)`, function() {
        let r = simpleStatistics.quantileRankSorted([1, 2, 3, 3, 4], 3)
        let rr = 0.7
        assertApprox(r, rr)
    })

    it(`should return -100, 5, [-100, 5] when call minSorted, maxSorted, extentSorted([-100, -10, 1, 2, 5])`, function() {
        let a = [-100, -10, 1, 2, 5]
        let r = [simpleStatistics.minSorted(a), simpleStatistics.maxSorted(a), simpleStatistics.extentSorted(a)]
        let rr = [-100, 5, [-100, 5]]
        assertApprox(r, rr)
    })

    //inverseErrorFunction, probit: 以獨立參考值驗證
    //參考值: 標準常態分佈之分位數(如z0.975=1.959963984540054)與逆誤差函數erfinv(x),
    //        另以獨立計算(erf之Maclaurin級數搭配Newton法)於1e-15量級確認; 升版後最大相對誤差約3e-7, 故以1e-6為容差(7.8.8之最大相對誤差約3e-3, 超出此容差)

    let kpProbit = [
        [0.5, 0],
        [0.75, 0.6744897501960817],
        [0.9, 1.2815515655446004],
        [0.975, 1.959963984540054],
        [0.995, 2.5758293035489004],
    ]
    for (let [p, z] of kpProbit) {
        it(`should return ${z} when call probit(${p})`, function() {
            let r = simpleStatistics.probit(p)
            let rr = z
            assertApprox(r, rr, { relTol: 1e-6, absTol: 1e-9 })
        })
    }

    let kpErfinv = [
        [0, 0],
        [0.5, 0.4769362762044699],
        [0.9, 1.1630871536766743],
        [0.99, 1.8213863677184468],
    ]
    for (let [x, y] of kpErfinv) {
        it(`should return ${y} when call inverseErrorFunction(${x})`, function() {
            let r = simpleStatistics.inverseErrorFunction(x)
            let rr = y
            assertApprox(r, rr, { relTol: 1e-6, absTol: 1e-9 })
        })
    }

})
