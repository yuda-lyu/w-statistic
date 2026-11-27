import assert from 'assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import arrAverage from '../src/arrAverage.mjs'
import arrAverageWithLogNormCI from '../src/arrAverageWithLogNormCI.mjs'
import arrAverageWithNormCI from '../src/arrAverageWithNormCI.mjs'
import arrCount from '../src/arrCount.mjs'
import arrGammaFit from '../src/arrGammaFit.mjs'
import arrGammaHist from '../src/arrGammaHist.mjs'
import arrGammaInv from '../src/arrGammaInv.mjs'
import arrGeometricAverage from '../src/arrGeometricAverage.mjs'
import arrGeometricStd from '../src/arrGeometricStd.mjs'
import arrLogNormHist from '../src/arrLogNormHist.mjs'
import arrLogNormInv from '../src/arrLogNormInv.mjs'
import arrMovingAverage from '../src/arrMovingAverage.mjs'
import arrNormHist from '../src/arrNormHist.mjs'
import arrNormInv from '../src/arrNormInv.mjs'
import arrQuartile from '../src/arrQuartile.mjs'
import arrStd from '../src/arrStd.mjs'
import bin from '../src/bin.mjs'
import histGen from '../src/histGen.mjs'
import regLine from '../src/regLine.mjs'
import regPoly from '../src/regPoly.mjs'
import regPower from '../src/regPower.mjs'
import sampleRandom from '../src/sampleRandom.mjs'
import studentTInv from '../src/studentTInv.mjs'
import assertApprox from './tools/assertApprox.mjs'


//規則帳本R3: 本套件之統計量只取有限數值, ±Infinity(含'Infinity'、'1e400'等字串寫法)與非數值同樣排除(不入個數、不入計算).
//wsemi之isnum/cdbl依數學定義收Infinity並夾為±Number.MAX_VALUE, 故改以isenum/arrFilterByENum取數.
//本檔每個述語之寫法: 「含非有限值之輸入, 其結果須與只含有限值者逐位相同」, 「全為非有限值者, 其處置須與全為非數值者相同(各函數現行之無可用數值處置)」.


//+Infinity與-Infinity之各種寫法, 皆為isnum為true而cdbl夾為±Number.MAX_VALUE者
let POS = [Infinity, 'Infinity', '+Infinity', '1e400']
let NEG = [-Infinity, '-Infinity', '-1e400']

//有限值樣本(11筆互異之正數, 正數使取log與Gamma之函數可同用)
let FIN = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]

//Gamma分布用之右偏樣本(18筆互異之正數)
let FING = [5.5, 7.2, 8.1, 9.9, 11.3, 12.8, 14.1, 15.6, 17.4, 19.9, 22.3, 25.1, 28.7, 33.2, 38.9, 45.6, 52.4, 61.8]

//全為非數值之樣本(長度須與非有限值樣本相同, 使依長度而異之處置不致混淆)
let NONNUM = ['abc', 'xyz', '', '-', 'NP', 'N/A', NaN]


//於開頭, 中間, 結尾各插入一個x
let insertAt = (fin, x) => {
    let k = Math.floor(fin.length / 2)
    return [
        [x, ...fin],
        [...fin.slice(0, k), x, ...fin.slice(k)],
        [...fin, x],
    ]
}


//outcome, 取同步或非同步函數之結果或錯誤訊息, 使「結果」與「拒收」皆可比對
async function outcome(fn) {
    try {
        let v = await fn()
        return { ok: v }
    }
    catch (err) {
        return { err: (err instanceof Error) ? err.message : String(err) }
    }
}


//refStd, 依定義計算樣本標準差(n-1), 作為獨立期望值
let refStd = (arr) => {
    let n = arr.length
    let m = arr.reduce((a, b) => a + b, 0) / n
    let s = arr.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1)
    return Math.sqrt(s)
}


//各以陣列為首參數之函數, call接收陣列, 可為同步或非同步
let specs = [
    { name: 'arrAverage', fin: FIN, call: (a) => arrAverage(a) },
    { name: 'arrStd', fin: FIN, call: (a) => arrStd(a) },
    { name: 'arrQuartile', fin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], call: (a) => [0.1, 0.5, 1].map((r) => arrQuartile(a, r)) },
    { name: 'arrAverageWithNormCI', fin: FIN, call: async (a) => [await arrAverageWithNormCI(a, 0.95), await arrAverageWithNormCI(a, 0.9, 'upper-tail')] },
    { name: 'arrAverageWithLogNormCI', fin: FIN, call: async (a) => [await arrAverageWithLogNormCI(a, 0.95), await arrAverageWithLogNormCI(a, 0.9, 'upper-tail')] },
    { name: 'arrNormInv', fin: FIN, call: (a) => arrNormInv(a, 0.5) },
    { name: 'arrLogNormInv', fin: FIN, call: (a) => arrLogNormInv(a, 0.5) },
    { name: 'arrGammaFit', fin: FING, call: (a) => arrGammaFit(a, { n: 8 }) },
    { name: 'arrGammaHist', fin: FING, call: (a) => arrGammaHist(a, { n: 8 }) },
    { name: 'arrGammaInv', fin: FING, call: (a) => arrGammaInv(a, 0.5, { n: 8 }) },
    { name: 'arrGeometricAverage', fin: FIN, call: (a) => arrGeometricAverage(a) },
    { name: 'arrGeometricStd', fin: FIN, call: (a) => arrGeometricStd(a) },
    { name: 'arrNormHist', fin: FIN, call: (a) => arrNormHist(a, { n: 5 }) },
    { name: 'arrLogNormHist', fin: FIN, call: (a) => arrLogNormHist(a, { n: 5 }) },
    { name: 'bin', fin: FIN, call: (a) => bin(a, 4) },
    { name: 'histGen', fin: FIN, call: (a) => histGen(a, (p) => p.curveX.map(() => 0), { n: 5 }) },
]


describe(`nonFinite 陣列內之±Infinity不計入`, function() {

    for (let sp of specs) {

        describe(sp.name, function() {

            it(`含+Infinity(${POS.map(String).join('、')}; 開頭/中間/結尾)之結果須與只含有限值者逐位相同`, async function() {
                let base = await outcome(() => sp.call(sp.fin))
                assert.ok(base.err === undefined, `${sp.name}以只含有限值之陣列呼叫不應失敗: ${base.err}`)
                for (let x of POS) {
                    for (let a of insertAt(sp.fin, x)) {
                        let r = await outcome(() => sp.call(a))
                        assert.deepStrictEqual(r, base, `${sp.name}含${String(x)}之陣列[${a.map(String).join(',')}]之結果應與只含有限值者相同`)
                    }
                }
            })

            it(`含-Infinity(${NEG.map(String).join('、')}; 開頭/中間/結尾)之結果須與只含有限值者逐位相同`, async function() {
                let base = await outcome(() => sp.call(sp.fin))
                assert.ok(base.err === undefined, `${sp.name}以只含有限值之陣列呼叫不應失敗: ${base.err}`)
                for (let x of NEG) {
                    for (let a of insertAt(sp.fin, x)) {
                        let r = await outcome(() => sp.call(a))
                        assert.deepStrictEqual(r, base, `${sp.name}含${String(x)}之陣列[${a.map(String).join(',')}]之結果應與只含有限值者相同`)
                    }
                }
            })

            it(`同時含+Infinity與-Infinity之各種寫法, 結果須與只含有限值者逐位相同`, async function() {
                let base = await outcome(() => sp.call(sp.fin))
                let a = [...POS, ...sp.fin.slice(0, 4), ...NEG, ...sp.fin.slice(4)]
                let r = await outcome(() => sp.call(a))
                assert.deepStrictEqual(r, base, `${sp.name}混含正負Infinity之結果應與只含有限值者相同`)
            })

            it(`全為非有限值時, 處置須與全為非數值者相同(無可用數值)`, async function() {
                let allNon = [...POS, ...NEG]
                assert.strictEqual(allNon.length, NONNUM.length, '測試前提: 非有限樣本與非數值樣本等長')
                let ref = await outcome(() => sp.call(NONNUM))
                let r = await outcome(() => sp.call(allNon))
                assert.deepStrictEqual(r, ref, `${sp.name}全為非有限值之處置應與全為非數值者相同`)
                //全為非數值者本身須為「無可用數值」處置(回傳null/空/拒收), 不得算出數值
                if (r.ok !== undefined && r.ok !== null) {
                    let t = JSON.stringify(r.ok)
                    assert.ok(t === '[]' || t === '[null,null,null]' || t === '[null,null]', `${sp.name}全為非有限值不應算出數值: ${t}`)
                }
            })

        })

    }

    //獨立期望值(不依賴被測函數之另一次呼叫), 防止「有限值之基準本身即錯」
    describe(`獨立期望值`, function() {

        it(`arrAverage: [${FIN}]加入非有限值, 平均為365/11`, function() {
            for (let x of [...POS, ...NEG]) {
                assertApprox(arrAverage([...FIN, x]), 365 / 11)
            }
        })

        it(`arrAverage: 全為非有限值回傳null; 單一有限值加非有限值回傳該值`, function() {
            assert.strictEqual(arrAverage([Infinity, -Infinity]), null)
            assert.strictEqual(arrAverage([Infinity]), null)
            assert.strictEqual(arrAverage([1, Infinity]), 1)
            assert.strictEqual(arrAverage([1, -Infinity, 3]), 2)
        })

        it(`arrStd: 依定義計算樣本標準差; 全為非有限值或僅1個有限值回傳null`, function() {
            for (let x of [...POS, ...NEG]) {
                assertApprox(arrStd([...FIN, x]), refStd(FIN))
            }
            assert.strictEqual(arrStd([Infinity, -Infinity, 'Infinity']), null)
            assert.strictEqual(arrStd([5, Infinity]), null)
        })

        it(`arrQuartile: [1..5]加入非有限值, 0.1/0.5/1分位為1/3/5`, function() {
            for (let x of [...POS, ...NEG]) {
                let a = [1, 2, 3, 4, 5, x]
                assert.deepStrictEqual([0.1, 0.5, 1].map((r) => arrQuartile(a, r)), [1, 3, 5])
            }
            assert.strictEqual(arrQuartile([Infinity, -Infinity], 0.5), null)
        })

        it(`arrGeometricAverage: [1,10,100]加入非有限值, 幾何平均為10; 全為非有限值回傳null`, function() {
            for (let x of [...POS, ...NEG]) {
                assertApprox(arrGeometricAverage([1, 10, 100, x]), 10)
            }
            assert.strictEqual(arrGeometricAverage([Infinity]), null)
        })

        it(`arrGeometricStd: 加入+Infinity之結果有限(不得因夾為Number.MAX_VALUE而爆值)`, function() {
            let r0 = arrGeometricStd([1, 10, 100])
            assertApprox(arrGeometricStd([1, 10, 100, Infinity]), r0)
            assert.strictEqual(arrGeometricStd([Infinity]), null)
            assert.strictEqual(arrGeometricStd([7, Infinity]), null)
        })

        it(`arrNormInv: 回傳之arr不含Number.MAX_VALUE, n不含非有限值`, async function() {
            let r = await arrNormInv([...FIN, Infinity, -Infinity], 0.5)
            assert.deepStrictEqual(r.arr, FIN)
            assertApprox(r.avg, 365 / 11)
            assertApprox(r.std, refStd(FIN))
        })

        it(`arrAverageWithNormCI: 全為非有限值拒收no effective data(與全為非數值同)`, async function() {
            await assert.rejects(() => arrAverageWithNormCI([Infinity, -Infinity], 0.95), /no effective data/)
            await assert.rejects(() => arrAverageWithNormCI(['abc'], 0.95), /no effective data/)
        })

        it(`isenum之有效數字規則: 十六進位字串不計入(舊isnum收之而得16)`, function() {
            assert.strictEqual(arrAverage(['0x10', 2, 4]), 3)
        })

    })

})


describe(`nonFinite 迴歸(regLine/regPoly/regPower)之點與interpX`, function() {

    let ptsLine = [[0, 1], [1, 3], [2, 5], [3, 7]] //y=2x+1
    let ptsPoly = [[0, 1], [1, 2], [2, 5], [3, 10], [4, 17]] //y=x^2+1
    let ptsPower = [[1, 3], [2, 12], [3, 27], [4, 48]] //y=3x^2

    //含非有限值之點(x非有限、y非有限、兩者皆非有限)
    let badPts = (x) => [[x, 2], [2, x], [x, x]]

    let cases = [
        { name: 'regLine', pts: ptsLine, call: (pts, opt) => regLine(pts, { useSync: true, ...opt }) },
        { name: 'regPoly', pts: ptsPoly, call: (pts, opt) => regPoly(pts, 2, { useSync: true, ...opt }) },
        { name: 'regPower', pts: ptsPower, call: (pts, opt) => regPower(pts, { useSync: true, ...opt }) },
    ]

    for (let cs of cases) {

        describe(cs.name, function() {

            it(`含非有限值之點(各寫法、x或y或兩者、開頭/中間/結尾)之結果須與不含該點者逐位相同(含calcR2)`, function() {
                //calcR2使用前處理後之點(rs)計算, 須分別驗證(擬合與r2各用不同路徑取點)
                for (let opt of [{}, { calcR2: true }]) {
                    let base = cs.call(cs.pts, opt)
                    if (opt.calcR2) {
                        assert.ok(Number.isFinite(base.r2), '測試前提: 有限值之r2為有限數')
                    }
                    for (let x of [...POS, ...NEG]) {
                        for (let bp of badPts(x)) {
                            for (let a of insertAt(cs.pts, bp)) {
                                let r = cs.call(a, opt)
                                assert.deepStrictEqual(r, base, `${cs.name}含點[${String(bp)}] opt[${JSON.stringify(opt)}]之結果應與不含者相同`)
                            }
                        }
                    }
                }
            })

            it(`interpX為非有限值時視為未給(不產出interpY), 與interpX非數值同`, function() {
                let base = cs.call(cs.pts, {})
                assert.ok(!('interpY' in base), '測試前提: 未給interpX不產出interpY')
                for (let x of [...POS, ...NEG]) {
                    let r = cs.call(cs.pts, { interpX: x })
                    assert.deepStrictEqual(r, base, `${cs.name} interpX=${String(x)}應視為未給`)
                }
                //對照: 有限interpX確實產出interpY
                let r = cs.call(cs.pts, { interpX: 2 })
                assert.ok('interpY' in r, '測試前提: 有限interpX產出interpY')
            })

            it(`全為非有限值之點拋no effective data(與全為非數值同)`, function() {
                let allNon = [[Infinity, 1], [1, -Infinity], ['Infinity', '-Infinity'], ['1e400', 2]]
                let nonNum = [['abc', 1], [1, 'xyz'], ['', '-'], ['NP', 2]]
                assert.throws(() => cs.call(nonNum, {}), /no effective data/)
                assert.throws(() => cs.call(allNon, {}), /no effective data/)
                //每點只有一個座標為非有限值(另一座標為有限正值), 任一座標非有限即不計入
                let onlyOne = [[Infinity, 1], [2, Infinity], [-Infinity, 3], [4, '-1e400'], ['Infinity', 5], [6, '1e400']]
                assert.throws(() => cs.call(onlyOne, {}), /no effective data/)
            })

        })

    }

    describe(`獨立期望值`, function() {

        it(`regLine: y=2x+1加入非有限點, m=2,b=1`, function() {
            let r = regLine([...ptsLine, [Infinity, 5], [4, -Infinity]], { useSync: true })
            assertApprox(r, { m: 2, b: 1 }, { relTol: 1e-9, absTol: 1e-9 })
        })

        it(`regPoly: y=x^2+1加入非有限點, b=1,m1=0,m2=1`, function() {
            let r = regPoly([...ptsPoly, [Infinity, 5], [4, -Infinity]], 2, { useSync: true })
            assertApprox(r, { b: 1, m1: 0, m2: 1 }, { relTol: 1e-9, absTol: 1e-9 })
        })

        it(`regPower: y=3x^2加入非有限點(含x=0,其log為-Infinity), a=3,b=2`, function() {
            let r = regPower([...ptsPower, [Infinity, 5], [4, Infinity], [0, 5], [5, 0]], { useSync: true })
            assertApprox(r, { a: 3, b: 2 }, { relTol: 1e-9, absTol: 1e-9 })
        })

        it(`regPower: 座標為''、null、false(取log皆為-Infinity)之點視同無效, 與不含者逐位相同(修前被夾為-Number.MAX_VALUE而算出錯值)`, function() {
            let base = regPower(ptsPower, { useSync: true, calcR2: true })
            let r = regPower([...ptsPower, ['', 5], [5, null], [false, 2], [7, '']], { useSync: true, calcR2: true })
            assert.deepStrictEqual(r, base)
        })

    })

})


describe(`nonFinite 選項(bin的min/max, histGen的dx, EMA首點)`, function() {

    let fun = (p) => p.curveX.map(() => 0)

    it(`bin: opt.min/opt.max為非有限值視為未給(與非數值同), 不得夾為Number.MAX_VALUE當區間端點`, function() {
        let base = bin(FIN, 4)
        assert.deepStrictEqual(bin(FIN, 4, { min: 'abc', max: 'abc' }), base, '測試前提: 非數值視為未給')
        for (let x of [...POS, ...NEG]) {
            assert.deepStrictEqual(bin(FIN, 4, { min: x }), base, `min=${String(x)}`)
            assert.deepStrictEqual(bin(FIN, 4, { max: x }), base, `max=${String(x)}`)
            assert.deepStrictEqual(bin(FIN, 4, { min: x, max: x }), base, `min=max=${String(x)}`)
        }
    })

    it(`bin: 一端為有限值而另一端為非有限值, 只採有限值那一端`, function() {
        for (let x of [...POS, ...NEG]) {
            assert.deepStrictEqual(bin(FIN, 4, { min: 0, max: x }), bin(FIN, 4, { min: 0 }), `min=0,max=${String(x)}`)
            assert.deepStrictEqual(bin(FIN, 4, { min: x, max: 100 }), bin(FIN, 4, { max: 100 }), `min=${String(x)},max=100`)
        }
    })

    it(`histGen: opt.dx為非有限值視為未給(與非數值同), 改依opt.n分組`, async function() {
        let base = await histGen(FIN, fun, { n: 5 })
        let nn = await histGen(FIN, fun, { n: 5, dx: 'abc' })
        assert.deepStrictEqual(nn, base, '測試前提: 非數值之dx視為未給')
        for (let x of [...POS, ...NEG]) {
            let r = await histGen(FIN, fun, { n: 5, dx: x })
            assert.deepStrictEqual(r, base, `dx=${String(x)}`)
        }
    })

    it(`histGen: opt.min/opt.max為非有限值視為未給`, async function() {
        let base = await histGen(FIN, fun, { n: 5 })
        for (let x of [...POS, ...NEG]) {
            let r = await histGen(FIN, fun, { n: 5, min: x, max: x })
            assert.deepStrictEqual(r, base, `min=max=${String(x)}`)
        }
    })

    it(`arrMovingAverage PMA/SMA: 非有限值與非數值同樣不計入視窗之平均`, function() {
        for (let mode of ['PMA', 'SMA']) {
            for (let x of [...POS, ...NEG]) {
                let a = [1, 2, x, 4, 5, 6, 7]
                let b = [1, 2, 'abc', 4, 5, 6, 7]
                assert.deepStrictEqual(arrMovingAverage(a, { mode, selectCountHalf: 2 }), arrMovingAverage(b, { mode, selectCountHalf: 2 }), `${mode} x=${String(x)}`)
                assert.deepStrictEqual(arrMovingAverage([x], { mode }), arrMovingAverage(['abc'], { mode }), `${mode} 單點 x=${String(x)}`)
            }
        }
    })

    it(`arrMovingAverage PMA: 含+Infinity之視窗平均須為有限值之平均(獨立期望值)`, function() {
        let r = arrMovingAverage([1, 2, 3, Infinity, 5], { mode: 'PMA', selectCountHalf: 1 })
        assertApprox(r, [1.5, 2, 2.5, 4, 5])
    })

    it(`arrMovingAverage EMA: 首點為非有限值時與首點為非數值相同(無有效觀測, 輸出null; 第一個有效點為種子), 不得為Number.MAX_VALUE`, function() {
        let ref = arrMovingAverage(['abc', 2, 3, 4], { mode: 'EMA', selectCountHalf: 2 })
        assert.strictEqual(ref[0], null, '測試前提: 非數值之首點無有效觀測, 輸出null(R3 S28; 修前取0)')
        for (let x of [...POS, ...NEG]) {
            let r = arrMovingAverage([x, 2, 3, 4], { mode: 'EMA', selectCountHalf: 2 })
            assert.deepStrictEqual(r, ref, `EMA 首點=${String(x)}`)
        }
    })

})


describe(`nonFinite 刻意不改之站點(釘住現況)`, function() {

    it(`ratio/p參數為±Infinity: 夾為±Number.MAX_VALUE後被範圍檢核拒收, 不產出數值`, async function() {
        await assert.rejects(() => arrNormInv(FIN, Infinity), /ratio\[.*\] > 1/)
        await assert.rejects(() => arrNormInv(FIN, -Infinity), /ratio\[.*\] < 0/)
        await assert.rejects(() => arrLogNormInv(FIN, Infinity), /ratio\[.*\] > 1/)
        await assert.rejects(() => arrAverageWithNormCI(FIN, Infinity), /p\[.*\] > 1/)
        await assert.rejects(() => arrAverageWithLogNormCI(FIN, -Infinity), /p\[.*\] < 0/)
        await assert.rejects(() => arrGammaInv(FING, Infinity, { n: 8 }), /ratio\[.*\] > 1/)
        await assert.rejects(() => studentTInv(5, Infinity), /p\[.*\] > 1/)
        await assert.rejects(() => studentTInv(5, -Infinity), /p\[.*\] < 0/)
    })

    it(`arrQuartile的ratio: +Infinity與大於1者同夾為1(回傳最大值), -Infinity回傳null`, function() {
        assert.strictEqual(arrQuartile(FIN, Infinity), arrQuartile(FIN, 1))
        assert.strictEqual(arrQuartile(FIN, Infinity), 49)
        assert.strictEqual(arrQuartile(FIN, -Infinity), null)
    })

    it(`sampleRandom的low/up: 可行邊界(-Infinity為下界, +Infinity為上界)等同無界; 不可行邊界拒收`, async function() {
        let r = await sampleRandom('normal', { mu: 0, sigma: 1, num: 5, low: -Infinity, up: Infinity })
        assert.strictEqual(r.length, 5)
        assert.ok(r.every((v) => Number.isFinite(v)))
        await assert.rejects(() => sampleRandom('normal', { mu: 0, sigma: 1, num: 3, low: Infinity }))
        await assert.rejects(() => sampleRandom('normal', { mu: 0, sigma: 1, num: 3, up: -Infinity }))
    })

    it(`arrCount: 類別計次, Infinity與'Infinity'同為一個類別`, function() {
        let r = arrCount([Infinity, 'Infinity', 'abc'])
        assert.deepStrictEqual(r, [{ key: 'Infinity', count: 2 }, { key: 'abc', count: 1 }])
    })

})


//原始碼掃描(規則帳本R3之守門): 不得再引用wsemi之arrFilterByNum/arrFilterByPnum/arrFilterByPnumAndToLog(皆基於isnum/ispnum,會把±Infinity夾為±Number.MAX_VALUE),
//且以isnum/cdbl轉型之站點以各檔釘住(新增或消失皆須同步修規則帳本)
describe(`nonFinite 原始碼掃描`, function() {

    let FORBIDDEN = ['arrFilterByNum', 'arrFilterByPnum', 'arrFilterByPnumAndToLog']

    //scanText, 回傳{ mods: 引用之wsemi/src模組名, forbidden: 出現之禁用識別字, barrel: 是否自'wsemi'整包匯入, dynamic: 是否有動態匯入或require }
    let scanText = (text) => {
        let mods = []
        let re = /['"]wsemi\/src\/(\w+)\.mjs['"]/g
        let m
        while ((m = re.exec(text)) !== null) {
            mods.push(m[1])
        }
        let forbidden = FORBIDDEN.filter((id) => new RegExp(`\\b${id}\\b`).test(text))
        let barrel = /from\s+['"]wsemi['"]/.test(text)
        let dynamic = /\bimport\s*\(|\brequire\s*\(/.test(text)
        return { mods, forbidden, barrel, dynamic }
    }

    let dirSrc = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src')
    let files = fs.readdirSync(dirSrc).filter((f) => f.endsWith('.mjs')).sort()

    it(`掃描器自測: 抓得到雙引號、多空白、整包匯入、動態匯入、註解內之禁用識別字`, function() {
        let r = scanText(`import   cdbl   from  "wsemi/src/cdbl.mjs"\n//arrFilterByNum\nlet a = await import('x')\nimport { isnum } from 'wsemi'`)
        assert.deepStrictEqual(r.mods, ['cdbl'])
        assert.deepStrictEqual(r.forbidden, ['arrFilterByNum'])
        assert.strictEqual(r.barrel, true)
        assert.strictEqual(r.dynamic, true)
        let r2 = scanText(`import arrFilterByENum from 'wsemi/src/arrFilterByENum.mjs'`)
        assert.deepStrictEqual(r2.forbidden, [], 'arrFilterByENum不得被誤判為禁用識別字')
        assert.deepStrictEqual(r2.mods, ['arrFilterByENum'])
    })

    it(`掃描範圍: src內至少有20個.mjs檔(範圍壞掉時結果不算數)`, function() {
        assert.ok(files.length >= 20, `掃描檔數[${files.length}]`)
    })

    it(`src內不得引用arrFilterByNum/arrFilterByPnum/arrFilterByPnumAndToLog, 不得整包匯入wsemi或動態匯入`, function() {
        let bad = []
        for (let f of files) {
            let r = scanText(fs.readFileSync(path.join(dirSrc, f), 'utf8'))
            if (r.forbidden.length > 0 || r.barrel || r.dynamic) {
                bad.push(`${f}: forbidden[${r.forbidden}] barrel[${r.barrel}] dynamic[${r.dynamic}]`)
            }
        }
        assert.deepStrictEqual(bad, [])
    })

    it(`以cdbl轉型之檔(僅限範圍檢核之參數: ratio、p、low、up)以各檔釘住`, function() {
        let got = files.filter((f) => scanText(fs.readFileSync(path.join(dirSrc, f), 'utf8')).mods.includes('cdbl'))
        assert.deepStrictEqual(got, [
            'arrAverageWithLogNormCI.mjs',
            'arrAverageWithNormCI.mjs',
            'arrGammaInv.mjs',
            'arrLogNormInv.mjs',
            'arrNormInv.mjs',
            'arrQuartile.mjs',
            'sampleRandom.mjs',
            'studentTInv.mjs',
        ])
    })

    it(`以isnum判定之檔以各檔釘住`, function() {
        let got = files.filter((f) => scanText(fs.readFileSync(path.join(dirSrc, f), 'utf8')).mods.includes('isnum'))
        assert.deepStrictEqual(got, [
            'arrAverageWithLogNormCI.mjs',
            'arrAverageWithNormCI.mjs',
            'arrCount.mjs',
            'arrGammaFit.mjs',
            'arrGammaInv.mjs',
            'arrLogNormInv.mjs',
            'arrNormInv.mjs',
            'sampleRandom.mjs',
            'studentTInv.mjs',
        ])
    })

    it(`取數值之檔以isenum/arrFilterByENum各檔釘住`, function() {
        let gotE = files.filter((f) => scanText(fs.readFileSync(path.join(dirSrc, f), 'utf8')).mods.includes('isenum'))
        assert.deepStrictEqual(gotE, [
            'arrMovingAverage.mjs',
            'arrQuantile7.mjs',
            'bin.mjs',
            'histGen.mjs',
            'regLine.mjs',
            'regPoly.mjs',
            'regPower.mjs',
        ])
        let gotA = files.filter((f) => scanText(fs.readFileSync(path.join(dirSrc, f), 'utf8')).mods.includes('arrFilterByENum'))
        assert.deepStrictEqual(gotA, [
            '_arrFilterByEPnum.mjs',
            'arrAverage.mjs',
            'arrAverageWithNormCI.mjs',
            'arrGammaFit.mjs',
            'arrGammaHist.mjs',
            'arrNormInv.mjs',
            'arrQuantile7.mjs',
            'arrQuartile.mjs',
            'arrStd.mjs',
            'bin.mjs',
            'histGen.mjs',
        ])
    })

})
