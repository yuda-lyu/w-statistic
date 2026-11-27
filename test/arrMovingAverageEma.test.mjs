import assert from 'assert'
import arrMovingAverage from '../src/arrMovingAverage.mjs'
import assertApprox from './tools/assertApprox.mjs'


//規則帳本R3 S27、S28與R4(統計類例外之遞推型): EMA(mode='EMA')之元素逐一依isenum判定,
//  ①第一個有效點為種子(輸出其值); ②其後之無效點(含NaN、±Infinity、非數值字串、null、undefined、布林、物件等)不入遞推, 輸出沿用前一點之EMA;
//  ③第一個有效點之前之各點, 因尚無有效觀測、EMA無定義, 輸出null(同PMA/SMA於視窗內無有效值時之null; 全部皆無效則全為null);
//  ④輸出長度恆等於輸入長度, 第一個有效點起皆為有限數; 其後有效點之EMA等於「只取有效點之序列」之遞推.
//修前(S27)中段之'abc'、'-'、undefined、NaN、{}使其後全部為NaN, Infinity使其後全部為±Infinity, null、false、''、[]、'1e-400'被當0、true當1、'0x10'當16、[3]與Number包裝物件當3, 皆靜默算錯.
//修前(S28)首點無效時以0為種子, 使其後有效點自0遞推而偏低.


//isValidRef, 獨立於wsemi之有效數字判定(dspec輸入參數之檢測機制§7.1):
//  有限之原始number; 或原始字串, 去頭尾空白後須為十進位寫法, 轉換後為有限數且未下溢
let reDec = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/
let isValidRef = (v) => {
    if (typeof v === 'number') {
        return Number.isFinite(v)
    }
    if (typeof v === 'string') {
        let s = v.trim()
        if (!reDec.test(s)) {
            return false
        }
        let n = Number(s)
        if (!Number.isFinite(n)) {
            return false
        }
        if (n === 0 && /[1-9]/.test(s.replace(/[eE].*$/, ''))) { //尾數含非0而轉換後為0即下溢
            return false
        }
        return true
    }
    return false
}


//refEma, 獨立期望值: 先取出「有效點序列」再以alpha=2/(N+1)遞推, 與被測函數之就地遞推((ema*(N-1)+2v)/(N+1))結構不同
//  第一個有效點為種子; 無效點不入序列, 其輸出為「截至該點之序列」之EMA; 序列尚空(第一個有效點之前)則為null
let refEma = (arr, N) => {
    let alpha = 2 / (N + 1)
    let ema = []
    let out = []
    for (let k = 0; k < arr.length; k++) {
        let v = arr[k]
        if (isValidRef(v)) {
            let x = Number(v)
            if (ema.length === 0) {
                ema.push(x)
            }
            else {
                ema.push(alpha * x + (1 - alpha) * ema[ema.length - 1])
            }
        }
        out.push(ema.length === 0 ? null : ema[ema.length - 1])
    }
    return out
}


//BAD, 無效元素樣本(皆非有效數字); 標籤供訊息
let BAD = [
    ['null', null],
    ['undefined', undefined],
    ['true', true],
    ['false', false],
    ['abc', 'abc'],
    ['-', '-'],
    ['NP', 'NP'],
    ['空字串', ''],
    ['純空白', ' '],
    ['NaN', NaN],
    ['Infinity', Infinity],
    ['-Infinity', -Infinity],
    ['Infinity字串', 'Infinity'],
    ['-Infinity字串', '-Infinity'],
    ['1e400字串', '1e400'],
    ['1e-400字串(下溢)', '1e-400'],
    ['0x10字串', '0x10'],
    ['物件', {}],
    ['空陣列', []],
    ['單元素陣列[3]', [3]],
    ['包裝物件Object(3)', Object(3)], //Number包裝物件(typeof為object)
    ['BigInt', 10n],
    ['Symbol', Symbol('x')],
    ['函數', () => 1],
    ['Date', new Date(5)],
]

//BASE, 有效值樣本(各筆互異, 使位置錯置會被看出)
let BASE = [10, 12, 11, 13, 12, 14]

let NS = [1, 2, 3, 5]


//put, 於各位置放入無效元素
let put = (base, ks, bad) => {
    let a = base.slice()
    for (let k of ks) {
        a[k] = bad
    }
    return a
}


describe(`arrMovingAverage EMA 無效元素(規則帳本R3 S27、S28與R4)`, function() {

    it(`手算例: [10, 12, 'abc', 13, 12], selectCountHalf=2(alpha=2/3), 'abc'不入計算, 該點沿用前一點 => [10, 34/3, 34/3, 112/9, 328/27]`, function() {
        //有效點序列10,12,13,12: e0=10; e1=(12*2+10)/3=34/3; 'abc'沿用34/3; e3=(13*2+34/3)/3=112/9; e4=(12*2+112/9)/3=328/27
        let r = arrMovingAverage([10, 12, 'abc', 13, 12], { mode: 'EMA', selectCountHalf: 2 })
        assertApprox(r, [10, 34 / 3, 34 / 3, 112 / 9, 328 / 27])
    })

    it(`手算例: 連續無效與尾端無效皆沿用前一點, [10, 12, 'x', null, Infinity, 13, '-'] => 第2~4點與末點同為34/3與112/9`, function() {
        let r = arrMovingAverage([10, 12, 'x', null, Infinity, 13, '-'], { mode: 'EMA', selectCountHalf: 2 })
        assertApprox(r, [10, 34 / 3, 34 / 3, 34 / 3, 34 / 3, 112 / 9, 112 / 9])
    })

    it(`首點之後全為無效時, 輸出皆為首點值`, function() {
        let r = arrMovingAverage([7, 'a', null, NaN, Infinity], { mode: 'EMA', selectCountHalf: 2 })
        assert.deepStrictEqual(r, [7, 7, 7, 7, 7])
    })

    for (let [lab, bad] of BAD) {

        it(`無效元素[${lab}]置於第2點(首點後)、中間、末點、連續兩點, 結果須與獨立期望值相同, 長度不變, 皆為有限數`, function() {
            for (let N of NS) {
                for (let ks of [[1], [2], [3], [5], [2, 3], [1, 2, 3, 4, 5]]) {
                    let a = put(BASE, ks, bad)
                    let r = arrMovingAverage(a, { mode: 'EMA', selectCountHalf: N })
                    let msg = `N=${N} 位置[${ks.join(',')}]`
                    assert.strictEqual(r.length, a.length, `${msg} 輸出長度須等於輸入長度`)
                    assert.ok(r.every((x) => typeof x === 'number' && Number.isFinite(x)), `${msg} 輸出須皆為有限數`)
                    assertApprox(r, refEma(a, N))
                }
            }
        })

    }

    it(`其後有效點之EMA等於「只取有效點之序列」之EMA(無效點不入計算之直接表述)`, function() {
        //有效點序列[10, 12, 13, 14], 無效點穿插其間
        let valid = arrMovingAverage([10, 12, 13, 14], { mode: 'EMA', selectCountHalf: 3 })
        for (let [lab, bad] of BAD) {
            let r = arrMovingAverage([10, bad, 12, bad, bad, 13, 14, bad], { mode: 'EMA', selectCountHalf: 3 })
            assertApprox([r[0], r[2], r[5], r[6]], valid)
            assertApprox([r[1], r[3], r[4], r[7]], [valid[0], valid[1], valid[1], valid[3]])
            assert.ok(r.every((x) => Number.isFinite(x)), `無效元素[${lab}]`)
        }
    })

    it(`數字字串(含頭尾空白、科學記號、正負號)為有效數字, 轉數值入計算, 與數值輸入之結果逐位相同`, function() {
        let a = [10, ' 12 ', '1e1', '+11', '-.5', '5.', 14]
        let b = [10, 12, 10, 11, -0.5, 5, 14]
        for (let N of NS) {
            let r = arrMovingAverage(a, { mode: 'EMA', selectCountHalf: N })
            let rr = arrMovingAverage(b, { mode: 'EMA', selectCountHalf: N })
            assert.deepStrictEqual(r, rr, `N=${N}`)
            assert.ok(r.every((x) => typeof x === 'number'), `N=${N} 輸出須為數值(不得為字串)`)
        }
    })

    it(`首點無效: 第一個有效點為種子(不再以0為種子), 首點輸出null => [null, 12, 34/3, 112/9]`, function() {
        //N=2: 首點無效 => null; 第2點12為第一個有效點, 為種子 => 12; e2=(12*1+11*2)/3=34/3; e3=(34/3*1+13*2)/3=112/9
        for (let [lab, bad] of BAD) {
            let r = arrMovingAverage([bad, 12, 11, 13], { mode: 'EMA', selectCountHalf: 2 })
            assert.ok(r[0] === null, `首點[${lab}]無有效觀測, 輸出須為null`)
            assertApprox(r, [null, 12, 34 / 3, 112 / 9])
        }
    })

    it(`首點有效取其值為種子(含數字字串), 與首點之前無無效點者之遞推相同`, function() {
        let r2 = arrMovingAverage([5, 12, 11, 13], { mode: 'EMA', selectCountHalf: 2 })
        assert.strictEqual(r2[0], 5)
        assertApprox(r2, [5, (5 + 24) / 3, ((5 + 24) / 3 + 22) / 3, (((5 + 24) / 3 + 22) / 3 + 26) / 3])
        let r3 = arrMovingAverage([' 5 ', 12, 11, 13], { mode: 'EMA', selectCountHalf: 2 })
        assert.deepStrictEqual(r3, r2)
    })

    it(`首段連續無效: 第一個有效點之前皆為null, 該點為種子, 其後依遞推 => ['x','y',12,'z',11] 為 [null, null, 12, 12, 34/3]`, function() {
        //N=2: 'x'、'y'尚無有效觀測 => null; 12為種子; 'z'沿用12; 11: (12*1+11*2)/3=34/3
        let r = arrMovingAverage(['x', 'y', 12, 'z', 11], { mode: 'EMA', selectCountHalf: 2 })
        assertApprox(r, [null, null, 12, 12, 34 / 3])
    })

    it(`全部無效: 輸出皆為null且長度不變(同PMA、SMA於全無效之null)`, function() {
        let a = BAD.map((b) => b[1])
        for (let N of NS) {
            let r = arrMovingAverage(a, { mode: 'EMA', selectCountHalf: N })
            assert.strictEqual(r.length, a.length)
            assert.ok(r.every((x) => x === null), `N=${N} 全無效之輸出須皆為null`)
        }
        assert.deepStrictEqual(arrMovingAverage(['abc', null, NaN], { mode: 'EMA' }), [null, null, null])
        //同PMA、SMA之全無效處置
        assert.deepStrictEqual(arrMovingAverage(['abc', null, NaN], { mode: 'PMA' }), [null, null, null])
        assert.deepStrictEqual(arrMovingAverage(['abc', null, NaN], { mode: 'SMA' }), [null, null, null])
    })

    it(`第一個有效點起之輸出皆為有限數, 之前皆為null(無有效觀測)`, function() {
        for (let [lab, bad] of BAD) {
            let a = [bad, bad, 7, bad, 9, 4]
            let r = arrMovingAverage(a, { mode: 'EMA', selectCountHalf: 3 })
            assert.deepStrictEqual(r.slice(0, 2), [null, null], `[${lab}]`)
            assert.ok(r.slice(2).every((x) => Number.isFinite(x)), `[${lab}]`)
            assert.strictEqual(r[2], 7, `[${lab}]種子`)
        }
    })

    it(`首點無效不再使其後有效點偏低: [bad, 100, 100, 100, 100] 之輸出自第2點起恆為100(修前以0為種子, 為 [0, 66.7, 88.9, ...] )`, function() {
        for (let b of BAD) {
            let r = arrMovingAverage([b[1], 100, 100, 100, 100], { mode: 'EMA', selectCountHalf: 2 })
            assertApprox(r.slice(1), [100, 100, 100, 100])
        }
    })

    it(`不改動輸入陣列(含其中之無效元素)`, function() {
        let a = [10, null, 'abc', 13, NaN, { x: 1 }, 12]
        let a0 = a.slice()
        arrMovingAverage(a, { mode: 'EMA', selectCountHalf: 2 })
        assert.strictEqual(a.length, a0.length)
        for (let k = 0; k < a.length; k++) {
            assert.ok(Object.is(a[k], a0[k]), `第${k}點被改動`)
        }
    })

    it(`隨機對拍(固定種子): 長度3~12、各位置約35%為無效元素之序列, 與獨立期望值相同`, function() {
        //mulberry32, 固定種子使結果可重現
        let seed = 20261128
        let rnd = () => {
            seed |= 0
            seed = (seed + 0x6D2B79F5) | 0
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296
        }
        let nBadUsed = new Set()
        let nCase = 0
        for (let i = 0; i < 600; i++) {
            let len = 3 + Math.floor(rnd() * 10)
            let N = NS[Math.floor(rnd() * NS.length)]
            let a = []
            for (let k = 0; k < len; k++) {
                if (rnd() < 0.35) {
                    let j = Math.floor(rnd() * BAD.length)
                    nBadUsed.add(j)
                    a.push(BAD[j][1])
                }
                else {
                    let x = Math.round((rnd() * 200 - 100) * 100) / 100
                    a.push(rnd() < 0.2 ? String(x) : x) //部分以數字字串給
                }
            }
            let r = arrMovingAverage(a, { mode: 'EMA', selectCountHalf: N })
            assert.strictEqual(r.length, a.length)
            assertApprox(r, refEma(a, N))
            nCase++
        }
        //前提: 樣本確實涵蓋全部種類之無效元素
        assert.strictEqual(nBadUsed.size, BAD.length, `隨機樣本未涵蓋全部無效元素種類(${nBadUsed.size}/${BAD.length}), 請換種子`)
        assert.strictEqual(nCase, 600)
    })

})
