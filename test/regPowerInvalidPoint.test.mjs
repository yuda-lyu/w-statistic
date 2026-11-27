import assert from 'assert'
import regPower from '../src/regPower.mjs'
import assertApprox from './tools/assertApprox.mjs'


//規則帳本R4(統計類例外): 迴歸之點對任一座標非有效數字(isenum為false)則整點不計入, 不使入口失敗.
//regPower修前: 點之篩選(rs)正確, 但擬合之log陣列取自未過濾之原陣列, 使true、'0x10'、[7]、數值包裝物件、Date之座標被當1、16、7、5計入擬合,
//整列為null/undefined則拋TypeError(Cannot read properties of null).
//本檔每個述語之寫法: 「含無效點之結果須與只含有效點者逐位相同」.


//fitPower, 獨立期望值: 於log空間以最小平方法(正規方程式之離差形式)擬合 y = a * x^b, 不呼叫regPower與regLine
let fitPower = (pts) => {
    let n = pts.length
    let lx = pts.map((p) => Math.log(p[0]))
    let ly = pts.map((p) => Math.log(p[1]))
    let mx = lx.reduce((s, v) => s + v, 0) / n
    let my = ly.reduce((s, v) => s + v, 0) / n
    let sxx = 0
    let sxy = 0
    for (let i = 0; i < n; i++) {
        sxx += (lx[i] - mx) ** 2
        sxy += (lx[i] - mx) * (ly[i] - my)
    }
    let b = sxy / sxx
    let a = Math.exp(my - b * mx)
    return { a, b }
}

//BASE, 逐項互異之有效點(約y=2x^1.5, 含雜訊, 使擬合非退化)
let BASE = [[1, 2.1], [2, 5.4], [3, 9.8], [4, 15.3], [5, 21.7], [6, 29.9], [7, 38.0]]

//BAD, 無效座標樣本(皆非有效數字)
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
    ['1e400字串', '1e400'],
    ['1e-400字串(下溢)', '1e-400'],
    ['0x10字串', '0x10'],
    ['物件', {}],
    ['空陣列', []],
    ['單元素陣列[7]', [7]],
    ['包裝物件Object(7)', Object(7)], //Number包裝物件(typeof為object)
    ['BigInt', 10n],
    ['Symbol', Symbol('x')],
    ['函數', () => 1],
    ['Date', new Date(5)],
]

//coerced, 該值被JS隱式轉為有限正數者(修前會被Math.log轉成有限數而計入擬合), 其餘為NaN
let coerced = (v) => {
    try {
        let x = Number(v)
        return (Number.isFinite(x) && x > 0) ? x : NaN
    }
    catch (err) {
        return NaN
    }
}

let sync = (arr, opt = {}) => regPower(arr, { useSync: true, ...opt })

//BASE之結果(不含任何無效點)
let baseR = sync(BASE)
let baseR2 = sync(BASE, { calcR2: true, interpX: 2.5 })


describe(`regPower 無效點(規則帳本R4)`, function() {

    it(`前提: 獨立期望值與regPower於只含有效點時一致(相對誤差1e-9內), 確認期望值可信`, function() {
        assertApprox(baseR, fitPower(BASE), { relTol: 1e-9 })
    })

    it(`前提: 若無效座標被隱式轉型後計入擬合, 結果會與只含有效點者明顯不同(b差大於0.01), 否則本檔無鑑別力`, function() {
        let nIncl = 0
        for (let [lab, bad] of BAD) {
            let c = coerced(bad)
            if (!Number.isFinite(c)) {
                continue
            }
            nIncl++
            for (let pt of [[c, 1000], [5, c * 1000]]) {
                let rIncl = fitPower([...BASE, pt])
                assert.ok(Math.abs(rIncl.b - baseR.b) > 0.01, `無效座標[${lab}]被計入時b之差須大於0.01(實際${Math.abs(rIncl.b - baseR.b)}), 請調整額外點`)
            }
        }
        assert.ok(nIncl >= 5, `會被隱式轉為有限正數之無效座標種類須至少5種(實際${nIncl})`)
    })

    for (let [lab, bad] of BAD) {

        it(`座標[${lab}]置於額外點之x、y或整列, 結果須與只含有效點者逐位相同(含calcR2、interpX), 同步與非同步皆然, 不拋TypeError`, async function() {
            let extras = [
                [bad, 1000], //x無效
                [5, bad], //y無效
                bad, //整列無效
                [bad, bad], //兩座標皆無效
                [bad], //缺y
            ]
            for (let ex of extras) {
                for (let pos of [0, 3, BASE.length]) {
                    let arr = [...BASE.slice(0, pos), ex, ...BASE.slice(pos)]
                    let r = sync(arr)
                    assert.deepStrictEqual(r, baseR, `額外點位置${pos}`)
                    let r2 = sync(arr, { calcR2: true, interpX: 2.5 })
                    assert.deepStrictEqual(r2, baseR2, `額外點位置${pos}之calcR2與interpX`)
                    let ra = await regPower(arr)
                    assert.deepStrictEqual(ra, baseR, `額外點位置${pos}之非同步版`)
                }
            }
        })

    }

    it(`有效但不為正之座標(0、負數)與無效點同樣不計入(取log無定義), 與只含有效正點者逐位相同`, function() {
        let arr = [...BASE, [0, 5], [5, 0], [-1, 5], [5, -2], [-3, -4]]
        assert.deepStrictEqual(sync(arr), baseR)
        //calcR2之殘差點集亦取已過濾之rs, 不得含y不大於0之點(其log為-Infinity, 擬合時被排除但r2若含之則改變)
        assert.deepStrictEqual(sync(arr, { calcR2: true, interpX: 2.5 }), baseR2)
    })

    it(`數字字串座標(含頭尾空白、科學記號、正負號)為有效, 與數值輸入之結果逐位相同`, function() {
        let arr = [['1', 2.1], [' 2 ', '5.4'], [3, '9.8e0'], ['+4', 15.3], ['5.', ' 21.7 '], ['6e0', 29.9], [7, '38']]
        assert.deepStrictEqual(sync(arr), baseR)
    })

    it(`全為無效點: 同步拋no effective data, 非同步reject no effective data(通道不變)`, async function() {
        let allBad = BAD.map(([lab, bad]) => [bad, bad]).concat(BAD.map(([lab, bad]) => bad))
        assert.throws(() => sync(allBad), /no effective data/)
        await assert.rejects(() => regPower(allBad), /no effective data/)
    })

    it(`整列為null/undefined不得拋TypeError(修前拋Cannot read properties of null)`, function() {
        let msg = ''
        try {
            sync([...BASE, null, undefined])
        }
        catch (err) {
            msg = String(err.message)
        }
        assert.strictEqual(msg, '', `不應拋錯, 實際訊息長度${msg.length}`)
    })

    it(`僅一個有效點(其餘無效)時之處置與只含該點者相同`, function() {
        let one = [[2, 3]]
        let ref = (() => {
            try {
                return { ok: sync(one) }
            }
            catch (err) {
                return { err: err.message }
            }
        })()
        let withBad = (() => {
            try {
                return { ok: sync([[2, 3], null, [true, 5], ['0x10', 7], [[7], 9]]) }
            }
            catch (err) {
                return { err: err.message }
            }
        })()
        assert.deepStrictEqual(withBad, ref)
    })

})
