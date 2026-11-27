import assert from 'assert'
import * as ss from 'simple-statistics'
import * as ws from '../src/WStatistic.mjs'
import arrQuantile7 from '../src/arrQuantile7.mjs'
import assertApprox from './tools/assertApprox.mjs'


//arrQuantile7: 第7型分位數(R type=7, numpy linear): 排序後取位置h=(n-1)*p, 於相鄰兩點間線性內插, h為整數時即x[h]; 只取有限數值(同規則帳本R3).
//spec句: ①第7型定義(手算例); ②只取有限數值, ±Infinity與非數值同樣不計入; ③arr非陣列、空陣列、無有效數字、ratio無效或超出0~1回傳null; ④不改動輸入陣列; ⑤有限數值之結果恆為有限;
//        ⑥ratio為0回傳最小值、為1回傳最大值; ⑦h為整數(含浮點乘積誤差)時恰為x[h].


//rat, 以BigInt精確計算第7型分位數之獨立期望值(整數資料, p=k/D): 結果 = (x[i]*D + rem*(x[i+1]-x[i])) / D, i=floor((n-1)*k/D), rem=(n-1)*k-i*D
let ratQuantile7 = (xsSorted, k, D) => {
    let n = BigInt(xsSorted.length)
    let K = BigInt(k)
    let DD = BigInt(D)
    let num = (n - 1n) * K
    let i = num / DD
    let rem = num - i * DD
    let xi = BigInt(xsSorted[Number(i)])
    if (rem === 0n) {
        return { value: Number(xi), exact: true }
    }
    let xj = BigInt(xsSorted[Number(i) + 1])
    let top = xi * DD + rem * (xj - xi)
    return { value: Number(top) / D, exact: false }
}

//lab, 無效值之標籤(供訊息; 不對Symbol、BigInt、函數、物件做會拋錯之轉換)
let lab = (x) => {
    if (typeof x === 'symbol') {
        return 'Symbol'
    }
    if (typeof x === 'bigint') {
        return `${x}n`
    }
    if (typeof x === 'function') {
        return 'fn'
    }
    if (x !== null && typeof x === 'object') {
        return Object.prototype.toString.call(x)
    }
    return String(x)
}

//mulberry32, 固定種子使結果可重現
let makeRnd = (seed) => {
    return () => {
        seed |= 0
        seed = (seed + 0x6D2B79F5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}


describe(`arrQuantile7 第7型分位數`, function() {

    describe(`手算例(定義: h=(n-1)p, x[⌊h⌋]+(h-⌊h⌋)(x[⌊h⌋+1]-x[⌊h⌋]))`, function() {

        it(`[1,2,3,4]: p=0.5 => h=1.5 => 2.5; p=0.25 => h=0.75 => 1.75; p=0.75 => h=2.25 => 3.25`, function() {
            assert.strictEqual(arrQuantile7([1, 2, 3, 4], 0.5), 2.5)
            assert.strictEqual(arrQuantile7([1, 2, 3, 4], 0.25), 1.75)
            assert.strictEqual(arrQuantile7([1, 2, 3, 4], 0.75), 3.25)
        })

        it(`[3,6,7,8,8,10,13,15,16,20](n=10): p=0.25 => h=2.25 => 7+0.25*(8-7)=7.25; p=0.5 => h=4.5 => 8+0.5*(10-8)=9; p=0.75 => h=6.75 => 13+0.75*(15-13)=14.5`, function() {
            let arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
            assert.strictEqual(arrQuantile7(arr, 0.25), 7.25)
            assert.strictEqual(arrQuantile7(arr, 0.5), 9)
            assert.strictEqual(arrQuantile7(arr, 0.75), 14.5)
        })

        it(`[6,47,49,15,42,41,7,39,43,40,36](n=11, 未排序): 排序為6,7,15,36,39,40,41,42,43,47,49; p=0.25 => h=2.5 => 15+0.5*(36-15)=25.5; p=0.5 => h=5 => 40; p=0.75 => h=7.5 => 42+0.5*(43-42)=42.5`, function() {
            let arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
            assert.strictEqual(arrQuantile7(arr, 0.25), 25.5)
            assert.strictEqual(arrQuantile7(arr, 0.5), 40)
            assert.strictEqual(arrQuantile7(arr, 0.75), 42.5)
        })

        it(`與arrQuartile(母體分位數)不同之處: 同一輸入, arrQuartile取最靠近之原始數據值(15), arrQuantile7內插(25.5)`, function() {
            let arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
            assert.strictEqual(ws.arrQuartile(arr, 0.25), 15)
            assert.strictEqual(arrQuantile7(arr, 0.25), 25.5)
        })

        it(`ratio=0 回傳最小值, ratio=1 回傳最大值(含負數、未排序、重複值)`, function() {
            let arr = [5, -3.5, 12, -3.5, 0, 7]
            assert.strictEqual(arrQuantile7(arr, 0), -3.5)
            assert.strictEqual(arrQuantile7(arr, 1), 12)
        })

        it(`單一有效數字: 任何ratio皆回傳該值; 兩個有效數字: ratio=0.5回傳平均值`, function() {
            for (let p of [0, 0.1, 0.5, 0.9, 1]) {
                assert.strictEqual(arrQuantile7([42], p), 42)
            }
            assert.strictEqual(arrQuantile7([1, 3], 0.5), 2)
            assert.strictEqual(arrQuantile7([3, 1], 0.5), 2)
            assertApprox(arrQuantile7([1, 3], 0.1), 1.2) //h=0.1, 1+0.1*(3-1)
        })

        it(`重複值: [2,2,2,8] p=0.5 => h=1.5 => 2+0.5*(2-2)=2; p=0.9 => h=2.7 => 2+0.7*(8-2)`, function() {
            assert.strictEqual(arrQuantile7([2, 2, 2, 8], 0.5), 2)
            assertApprox(arrQuantile7([2, 2, 2, 8], 0.9), 2 + 0.7 * 6)
        })

        it(`多位數與負數之排序須為數值序而非字典序: [9, 10, 100, -2, 1000] 排序為-2,9,10,100,1000, 中位數(h=2)為10`, function() {
            assert.strictEqual(arrQuantile7([9, 10, 100, -2, 1000], 0.5), 10)
            assert.strictEqual(arrQuantile7([9, 10, 100, -2, 1000], 0), -2)
            assert.strictEqual(arrQuantile7([9, 10, 100, -2, 1000], 1), 1000)
            assert.strictEqual(arrQuantile7([9, 10, 100, -2, 1000], 0.25), 9)
            assert.strictEqual(arrQuantile7([9, 10, 100, -2, 1000], 0.75), 100)
        })

    })

    describe(`只取有限數值(±Infinity與非數值同樣不計入)`, function() {

        let FIN = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
        let BAD = [null, undefined, true, false, 'abc', '-', 'NP', '', ' ', NaN, Infinity, -Infinity, 'Infinity', '-Infinity', '+Infinity', '1e400', '-1e400', '1e-400', '0x10', '0b11', {}, [], [3], Object(3), 10n, Symbol('x'), () => 1, new Date(5)]

        it(`於開頭、中間、結尾放入各種無效元素, 各ratio之結果須與只含有限值者逐位相同`, function() {
            for (let p of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
                let base = arrQuantile7(FIN, p)
                assert.ok(Number.isFinite(base), `測試前提: 只含有限值者須為有限數(p=${p})`)
                for (let bad of BAD) {
                    let k = Math.floor(FIN.length / 2)
                    for (let a of [[bad, ...FIN], [...FIN.slice(0, k), bad, ...FIN.slice(k)], [...FIN, bad]]) {
                        let r = arrQuantile7(a, p)
                        assert.ok(Object.is(r, base), `p=${p} 無效元素[${lab(bad)}] 結果[${r}]須同只含有限值者[${base}]`)
                    }
                }
            }
        })

        it(`數字字串(含頭尾空白、正負號、科學記號)為有效數字, 與數值輸入之結果逐位相同`, function() {
            let a = [' 6 ', '+47', '49', 15, '4.2e1', '41', '7.', '.39e2', 43, '40', '36']
            for (let p of [0, 0.25, 0.5, 0.75, 1]) {
                assert.ok(Object.is(arrQuantile7(a, p), arrQuantile7(FIN, p)), `p=${p}`)
            }
        })

        it(`全為無效元素回傳null`, function() {
            assert.strictEqual(arrQuantile7(BAD, 0.5), null)
            assert.strictEqual(arrQuantile7(['abc', 'xyz', '', '-', 'NP', NaN, Infinity], 0.5), null)
        })

    })

    describe(`邊界與無效輸入(回傳null, 不丟錯)`, function() {

        it(`arr非陣列(含未給、null、字串、數字、物件、類陣列物件、Set)回傳null`, function() {
            for (let a of [undefined, null, 'abc', '123', 123, true, {}, { length: 3, 0: 1, 1: 2, 2: 3 }, new Set([1, 2, 3])]) {
                assert.strictEqual(arrQuantile7(a, 0.5), null)
            }
            assert.strictEqual(arrQuantile7(), null)
        })

        it(`空陣列回傳null`, function() {
            assert.strictEqual(arrQuantile7([], 0.5), null)
            assert.strictEqual(arrQuantile7([], 0), null)
        })

        it(`ratio缺漏、非有效數字、超出0~1回傳null`, function() {
            let arr = [1, 2, 3, 4, 5]
            let bads = [undefined, null, true, false, 'abc', '', ' ', '-', NaN, Infinity, -Infinity, 'Infinity', '1e400', -0.0001, 1.0001, 2, -1, 100, '1.5', '-0.1', {}, [], [0.5], Object(0.5), 1n, Symbol('r'), () => 0.5]
            for (let p of bads) {
                assert.strictEqual(arrQuantile7(arr, p), null, `ratio[${lab(p)}]須回傳null`)
            }
        })

        it(`ratio為0、1、-0與其數字字串(含頭尾空白、科學記號)為有效, 與數值之結果相同`, function() {
            let arr = [10, 20, 30, 40, 50]
            assert.strictEqual(arrQuantile7(arr, 0), 10)
            assert.strictEqual(arrQuantile7(arr, -0), 10)
            assert.strictEqual(arrQuantile7(arr, 1), 50)
            assert.strictEqual(arrQuantile7(arr, '0'), 10)
            assert.strictEqual(arrQuantile7(arr, '1'), 50)
            assert.strictEqual(arrQuantile7(arr, ' 0.5 '), 30)
            assert.strictEqual(arrQuantile7(arr, '5e-1'), 30)
            assert.strictEqual(arrQuantile7(arr, '0.25'), arrQuantile7(arr, 0.25))
        })

        it(`不改動輸入陣列(含順序與無效元素)`, function() {
            let a = [5, 'x', 3, null, 9, ' 1 ', Infinity, 2]
            let a0 = a.slice()
            arrQuantile7(a, 0.5)
            assert.strictEqual(a.length, a0.length)
            for (let k = 0; k < a.length; k++) {
                assert.ok(Object.is(a[k], a0[k]), `第${k}項被改動`)
            }
        })

        it(`極大有限值: 相鄰兩點之差溢位時結果仍為有限(加權平均), [-1.7e308, 1.7e308] 中位數為0、p=0.25為-8.5e307`, function() {
            let arr = [1.7e308, -1.7e308]
            assert.strictEqual(arrQuantile7(arr, 0.5), 0)
            assertApprox(arrQuantile7(arr, 0.25), -8.5e307)
            assertApprox(arrQuantile7(arr, 0.75), 8.5e307)
            assert.strictEqual(arrQuantile7(arr, 0), -1.7e308)
            assert.strictEqual(arrQuantile7(arr, 1), 1.7e308)
            assert.strictEqual(arrQuantile7([Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE], 0.3), Number.MAX_VALUE)
        })

        it(`極小有限值(次正規數)不被視為無效: [5e-324, 1e-323] 中位數為7.5e-324捨入後之值(0.5*5e-324內插)`, function() {
            let r = arrQuantile7([1e-323, 5e-324], 0.5)
            assert.ok(Number.isFinite(r) && r >= 5e-324 && r <= 1e-323, `結果[${r}]`)
        })

    })

    describe(`h為整數(含浮點乘積誤差)時恰為x[h]`, function() {

        it(`n=101, ratio=k/100(k=0..100): h=k為整數, 結果須恰為x[k]; 前提: 其中確有浮點乘積(100*(k/100))不等於k者`, function() {
            let xs = []
            for (let i = 0; i < 101; i++) {
                xs.push(i * i * 0.37 + 1.9) //逐項互異、嚴格遞增, 相鄰差不為0
            }
            let nFp = 0
            for (let k = 0; k <= 100; k++) {
                if (100 * (k / 100) !== k) {
                    nFp++
                }
                assert.strictEqual(arrQuantile7(xs, k / 100), xs[k], `k=${k}`)
            }
            assert.ok(nFp >= 5, `測試前提: n=101時應有多個k使浮點乘積不等於整數(實際${nFp}個), 否則本測試無鑑別力`)
        })

        it(`不得把真實之小數位置吸附為整數: h與整數僅差1e-9~1e-12(遠大於浮點乘積誤差)者仍須內插`, function() {
            //n=2, x=[0, 1e9], p=1e-9 => h=1e-9, 1e9*1e-9=1
            assertApprox(arrQuantile7([0, 1e9], 1e-9), 1)
            //n=2, p=1-1e-9 => h=1-1e-9, 1e9*(1-1e-9)=999999999
            assertApprox(arrQuantile7([0, 1e9], 1 - 1e-9), 999999999)
            //n=3, x=[0,10,20], p=0.5+1e-12 => h=1+2e-12 => 10+2e-12*10
            assertApprox(arrQuantile7([0, 10, 20], 0.5 + 1e-12), 10 + 2e-11)
            assert.notStrictEqual(arrQuantile7([0, 10, 20], 0.5 + 1e-12), 10)
            assert.notStrictEqual(arrQuantile7([0, 10, 20], 0.5 - 1e-12), 10)
        })

        it(`n=201, ratio=k/200 與 n=51, ratio=k/50 之同類案`, function() {
            for (let [n, D] of [[201, 200], [51, 50], [301, 100], [1001, 100]]) {
                let xs = []
                for (let i = 0; i < n; i++) {
                    xs.push(i * 1.5 - 7.25)
                }
                for (let k = 0; k <= D; k++) {
                    let num = (n - 1) * k
                    if (num % D !== 0) {
                        continue
                    }
                    assert.strictEqual(arrQuantile7(xs, k / D), xs[num / D], `n=${n} k=${k}/${D}`)
                }
            }
        })

    })

    describe(`對拍(獨立期望值)`, function() {

        it(`以BigInt精確計算之獨立期望值對拍: 整數資料(逐筆互異)、n與D之多種組合, 全部ratio=k/D, 相對誤差1e-14內; h為整數者須恰等`, function() {
            let rnd = makeRnd(20261128)
            let nExact = 0
            let nCase = 0
            for (let n of [1, 2, 3, 4, 5, 7, 10, 11, 20, 33, 101]) {
                for (let D of [4, 10, 20, 100]) {
                    //n個互異整數(取不等差), 隨機排列
                    let xsSorted = []
                    let v = Math.floor(rnd() * 50) - 25
                    for (let i = 0; i < n; i++) {
                        v += 1 + Math.floor(rnd() * 40)
                        xsSorted.push(v)
                    }
                    let shuffled = xsSorted.slice()
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        let j = Math.floor(rnd() * (i + 1))
                        let t = shuffled[i]
                        shuffled[i] = shuffled[j]
                        shuffled[j] = t
                    }
                    for (let k = 0; k <= D; k++) {
                        let ref = ratQuantile7(xsSorted, k, D)
                        let r = arrQuantile7(shuffled, k / D)
                        if (ref.exact) {
                            assert.strictEqual(r, ref.value, `n=${n} k=${k}/${D}`)
                            nExact++
                        }
                        else {
                            assertApprox(r, ref.value, { relTol: 1e-14 })
                        }
                        nCase++
                    }
                }
            }
            assert.ok(nExact > 50 && nCase - nExact > 200, `測試前提: 須同時含h為整數與非整數之案(整數${nExact}, 非整數${nCase - nExact})`)
        })

        it(`與依賴simple-statistics 8.0.0之quantile(R type=7, numpy預設)對拍: 隨機小數資料、隨機ratio, 相對誤差1e-12內`, function() {
            let rnd = makeRnd(77)
            for (let i = 0; i < 400; i++) {
                let n = 1 + Math.floor(rnd() * 60)
                let xs = []
                for (let k = 0; k < n; k++) {
                    xs.push(Math.round((rnd() * 2000 - 1000) * 1000) / 1000)
                }
                let p = rnd()
                if (i % 10 === 0) {
                    p = 0
                }
                if (i % 10 === 1) {
                    p = 1
                }
                assertApprox(arrQuantile7(xs, p), ss.quantile(xs, p), { relTol: 1e-12, absTol: 1e-9 })
            }
        })

        it(`性質: 隨ratio不遞減、介於最小與最大值之間、與輸入順序無關、平移與縮放等變(固定種子)`, function() {
            let rnd = makeRnd(5)
            for (let i = 0; i < 100; i++) {
                let n = 1 + Math.floor(rnd() * 40)
                let xs = []
                for (let k = 0; k < n; k++) {
                    xs.push(Math.round((rnd() * 200 - 100) * 100) / 100)
                }
                let mn = Math.min(...xs)
                let mx = Math.max(...xs)
                let prev = -Infinity
                for (let k = 0; k <= 50; k++) {
                    let p = k / 50
                    let r = arrQuantile7(xs, p)
                    assert.ok(r >= prev, `ratio=${p}不得小於前一ratio之結果`)
                    assert.ok(r >= mn && r <= mx, `ratio=${p}須介於最小與最大值`)
                    prev = r
                }
                let rev = xs.slice().reverse()
                let c = 1000.5
                let sc = 2.5
                let p = rnd()
                assert.ok(Object.is(arrQuantile7(rev, p), arrQuantile7(xs, p)), '與輸入順序無關')
                assertApprox(arrQuantile7(xs.map((x) => x + c), p), arrQuantile7(xs, p) + c, { relTol: 1e-12 })
                assertApprox(arrQuantile7(xs.map((x) => x * sc), p), arrQuantile7(xs, p) * sc, { relTol: 1e-12, absTol: 1e-9 })
            }
        })

    })

    describe(`匯出`, function() {

        it(`WStatistic具名匯出arrQuantile7, 且與直接匯入者為同一函數`, function() {
            assert.strictEqual(typeof ws.arrQuantile7, 'function')
            assert.strictEqual(ws.arrQuantile7, arrQuantile7)
        })

    })

})
