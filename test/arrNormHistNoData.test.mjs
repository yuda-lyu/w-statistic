import assert from 'assert'
import arrNormHist from '../src/arrNormHist.mjs'
import arrLogNormHist from '../src/arrLogNormHist.mjs'
import arrGammaHist from '../src/arrGammaHist.mjs'
import arrNormInv from '../src/arrNormInv.mjs'


//規則帳本R4(統計類例外): 有效元素不足(0個)時依各函數之無可用數值通道失敗; 本庫以Promise reject固定訊息'no effective data'為通道(arrGammaHist、arrNormInv等同).
//arrNormHist、arrLogNormHist修前: 全部元素皆無效時histGen回null, 其後讀null.bins而reject內部TypeError訊息('Cannot read properties of null (reading 'bins')');
//arrLogNormHist另: 有有效數字但皆非正(無法取log)時reject其內部之'arr is not an effective array'(誤導, 且與arrAverageWithLogNormCI之'no effective data'不一致).


let NO = 'no effective data'

//rejectValue, 取reject之值(非同步拋錯亦收), 未reject則回特殊標記物件
async function rejectValue(fn) {
    try {
        let v = await fn()
        return { resolved: v }
    }
    catch (err) {
        return { rejected: err }
    }
}

//全部無效元素之各種組合(皆非有效數字)
let ALLBAD = [
    ['abc', 'xyz', '', '-', 'NP', 'N/A'],
    [NaN, Infinity, -Infinity, '1e400', '-1e400', 'Infinity'],
    [null, undefined, true, false, {}, [], [3], Object(3), '0x10', '1e-400'],
    ['abc'],
    [null],
    [Infinity],
    [NaN, 'abc', null, Infinity, '-', true],
]


describe(`arrNormHist、arrLogNormHist 無有效元素(規則帳本R4)`, function() {

    let fns = [
        { name: 'arrNormHist', call: (a, opt) => arrNormHist(a, opt) },
        { name: 'arrLogNormHist', call: (a, opt) => arrLogNormHist(a, opt) },
    ]

    for (let fn of fns) {

        describe(fn.name, function() {

            it(`全部元素皆無效(${ALLBAD.length}組)時reject固定訊息'${NO}', 不外洩內部TypeError訊息`, async function() {
                for (let a of ALLBAD) {
                    let r = await rejectValue(() => fn.call(a, { n: 5 }))
                    assert.ok('rejected' in r, `全無效之輸入不得resolve`)
                    assert.strictEqual(r.rejected, NO, `reject值須為固定訊息(實際型別${typeof r.rejected})`)
                }
            })

            it(`有給opt(n、dx、min、max)時全部無效之處置相同`, async function() {
                for (let opt of [{}, { n: 8 }, { dx: 2 }, { min: 0, max: 10 }, { n: 4, min: 1, max: 5, nCurve: 20 }]) {
                    let r = await rejectValue(() => fn.call(['abc', null, NaN], opt))
                    assert.strictEqual(r.rejected, NO)
                }
            })

            it(`與同庫其他無可用數值之函數(arrGammaHist、arrNormInv)之通道一致: 皆reject同一固定訊息`, async function() {
                let a = ['abc', null, NaN, Infinity]
                let r1 = await rejectValue(() => arrGammaHist(a, { n: 5 }))
                let r2 = await rejectValue(() => arrNormInv(a, 0.5))
                let r = await rejectValue(() => fn.call(a, { n: 5 }))
                assert.strictEqual(r1.rejected, NO, '測試前提: arrGammaHist之通道')
                assert.strictEqual(r2.rejected, NO, '測試前提: arrNormInv之通道')
                assert.strictEqual(r.rejected, r1.rejected)
            })

            it(`非陣列與空陣列之處置不變(非陣列: 'arr is not an array', 空陣列: 'arr is not an effective array')`, async function() {
                for (let a of [undefined, null, 'abc', 123, {}]) {
                    let r = await rejectValue(() => fn.call(a, {}))
                    assert.strictEqual(r.rejected, 'arr is not an array')
                }
                let r = await rejectValue(() => fn.call([], {}))
                assert.strictEqual(r.rejected, 'arr is not an effective array')
            })

            it(`有效元素充足時不受影響(含混入無效元素): resolve且bins、avg、std皆為有限, 與只含有效值者逐位相同`, async function() {
                let fin = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
                let base = await fn.call(fin, { n: 5 })
                assert.ok(Number.isFinite(base.avg) && Number.isFinite(base.std) && base.bins.length === 5, '測試前提')
                let r = await fn.call([null, ...fin.slice(0, 5), 'abc', NaN, ...fin.slice(5), Infinity, '-'], { n: 5 })
                assert.deepStrictEqual(r, base)
            })

        })

    }

    describe(`arrLogNormHist 有有效數字但皆非正(無法取log)`, function() {

        it(`reject固定訊息'${NO}'(與arrAverageWithLogNormCI之通道一致), 不為'arr is not an effective array'`, async function() {
            for (let a of [[-3, -1, 0], [0], [-5], ['0', '-2', null], [0, 0, 0]]) {
                let r = await rejectValue(() => arrLogNormHist(a, { n: 5 }))
                assert.strictEqual(r.rejected, NO)
            }
        })

        it(`混有正數時不被當成無有效數字: 只有1個正數時不得reject '${NO}'(該檢查只對無正數者)`, async function() {
            //只有1個正數: 後續對單一值之處置(結果或其他訊息)不屬本修正, 此處只驗證不被'無有效數字'檢查誤擋
            let a = [-3, 0, 5, 'x']
            let r = await rejectValue(() => arrLogNormHist(a, { n: 3 }))
            assert.notStrictEqual(r.rejected, NO, '只有1個正數時不應被當成無有效數字(該檢查只對無正數者)')
        })

    })

})
