import assert from 'assert'


//說明: 供測試期望值比對使用之「帶偵測門檻」版deepStrictEqual
//
//緣由: 各函式回傳值為浮點運算結果, 其末位數字取決於JS引擎與平台libm(Math.exp,Math.log,`**`等)之捨入,
//      本機(Windows)與GitHub Actions(ubuntu-latest)之結果可能相差1個ULP.
//      例如regPower(arr, { interpX: 2 })之interpY, 一方得1.2090108799137964, 另一方得1.2090108799137966,
//      相對誤差約1.7e-16, 使用assert.strict.deepStrictEqual會將此類末位差異判為失敗,
//      導致CI無故紅燈(2026/07/22, 07/23各1次), 且須反覆手動改寫期望值末位才能雙邊皆過.
//
//門檻: 數值以相對誤差relTol比對, 預設relTol=1e-12. 已觀察之跨環境差異量級約1e-16, 保留約1e4倍餘裕;
//      而真實計算變更(改公式,改係數,改流程,改單位)之相對誤差量級遠大於1e-6, 仍會被完整偵測,
//      不因放寬門檻而遺漏.
//
//嚴謹度: 除數值末位外一律維持嚴格比對, 即物件鍵集合,陣列長度,型別,字串文字,null/NaN皆須完全相同,
//        僅「數值大小」與「字串內所夾帶之數值」允許落在門檻內. 另0與-0視為相同.
//
//不適用: 迭代最佳化(如arrGammaFit所用nelderMead, 其minTolerance=1e-5)若因末位差異導致收斂路徑分歧,
//        差異量級將遠大於本門檻, 屬須另行處理之問題, 不可藉放寬relTol掩蓋.


//relTolDef, 相對誤差門檻
let relTolDef = 1e-12

//absTolDef, 絕對誤差門檻, 預設0代表期望值為0時實際值亦須為0
let absTolDef = 0

//nShowDef, 錯誤訊息最多列出之差異筆數
let nShowDef = 20

//reNum, 字串內數值token
let reNum = /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g


function diffNum(a, b, relTol, absTol) {
    //回傳null代表落在門檻內

    //NaN與NaN, Infinity與Infinity須完全相同
    if (Object.is(a, b)) {
        return null
    }

    //非有限值(NaN,±Infinity)不套用門檻
    if (!isFinite(a) || !isFinite(b)) {
        return { rel: Infinity }
    }

    //absTol
    let d = Math.abs(a - b)
    if (d <= absTol) {
        return null
    }

    //relTol
    let m = Math.max(Math.abs(a), Math.abs(b))
    let rel = m === 0 ? 0 : d / m
    if (rel <= relTol) {
        return null
    }

    return { rel }
}


function diffStr(a, b, relTol, absTol) {
    //回傳null代表落在門檻內

    if (a === b) {
        return null
    }

    //比對非數值部分(骨架), 骨架相同才代表數值token數量與位置一致
    let sa = a.replace(reNum, ' ')
    let sb = b.replace(reNum, ' ')
    if (sa !== sb) {
        return { msg: '字串之非數值部分不同' }
    }

    //比對各數值token
    let na = a.match(reNum)
    let nb = b.match(reNum)
    for (let i = 0; i < na.length; i++) {
        let r = diffNum(Number(na[i]), Number(nb[i]), relTol, absTol)
        if (r !== null) {
            return { msg: `字串內第${i + 1}個數值超出門檻(rel=${r.rel.toExponential(3)})` }
        }
    }

    return null
}


function core(a, b, path, ds, opt) {

    //number
    if (typeof a === 'number' && typeof b === 'number') {
        let r = diffNum(a, b, opt.relTol, opt.absTol)
        if (r !== null) {
            ds.push(`${path}: actual[${a}] expected[${b}] rel[${r.rel.toExponential(3)}] 超出relTol[${opt.relTol}]`)
        }
        return
    }

    //string
    if (typeof a === 'string' && typeof b === 'string') {
        let r = diffStr(a, b, opt.relTol, opt.absTol)
        if (r !== null) {
            ds.push(`${path}: actual[${a}] expected[${b}] ${r.msg}`)
        }
        return
    }

    //array
    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            ds.push(`${path}: 型別不同, actual[${Array.isArray(a) ? 'array' : typeof a}] expected[${Array.isArray(b) ? 'array' : typeof b}]`)
            return
        }
        if (a.length !== b.length) {
            ds.push(`${path}: 陣列長度不同, actual[${a.length}] expected[${b.length}]`)
            return
        }
        for (let i = 0; i < a.length; i++) {
            core(a[i], b[i], `${path}[${i}]`, ds, opt)
        }
        return
    }

    //object, 須排除null
    if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
        let ka = Object.keys(a)
        let kb = Object.keys(b)
        let ks = [...new Set([...ka, ...kb])]
        for (let k of ks) {
            let ba = Object.prototype.hasOwnProperty.call(a, k)
            let bb = Object.prototype.hasOwnProperty.call(b, k)
            if (!ba || !bb) {
                ds.push(`${path}.${k}: 鍵存在性不同, actual[${ba}] expected[${bb}]`)
                continue
            }
            core(a[k], b[k], `${path}.${k}`, ds, opt)
        }
        return
    }

    //其餘(null,boolean,undefined與型別不同者)一律嚴格比對
    if (!Object.is(a, b)) {
        ds.push(`${path}: actual[${JSON.stringify(a)}] expected[${JSON.stringify(b)}] 不相同`)
    }

}


/**
 * 帶偵測門檻之深層比對, 數值以相對誤差relTol判定, 其餘一律嚴格比對
 *
 * @param {*} actual 輸入實際值
 * @param {*} expected 輸入期望值
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.relTol=1e-12] 輸入數值相對誤差門檻，預設1e-12
 * @param {Number} [opt.absTol=0] 輸入數值絕對誤差門檻，預設0
 * @param {Number} [opt.nShow=20] 輸入錯誤訊息最多列出之差異筆數，預設20
 */
function assertApprox(actual, expected, opt = {}) {

    //relTol
    let relTol = opt.relTol
    if (typeof relTol !== 'number') {
        relTol = relTolDef
    }

    //absTol
    let absTol = opt.absTol
    if (typeof absTol !== 'number') {
        absTol = absTolDef
    }

    //nShow
    let nShow = opt.nShow
    if (typeof nShow !== 'number') {
        nShow = nShowDef
    }

    //core
    let ds = []
    core(actual, expected, '', ds, { relTol, absTol })

    //check
    if (ds.length > 0) {
        let msg = `超出門檻之差異共${ds.length}筆(relTol=${relTol}, absTol=${absTol})`
        let t = ds.slice(0, nShow).join('\n')
        if (ds.length > nShow) {
            t += `\n...另有${ds.length - nShow}筆未列出`
        }
        throw new assert.AssertionError({
            message: `${msg}:\n${t}\n`,
            actual: undefined,
            expected: undefined,
            operator: 'assertApprox',
            stackStartFn: assertApprox,
        })
    }

}


export default assertApprox
