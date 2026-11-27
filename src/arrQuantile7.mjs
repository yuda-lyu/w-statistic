import isarr from 'wsemi/src/isarr.mjs'
import isenum from 'wsemi/src/isenum.mjs'
import arrFilterByENum from 'wsemi/src/arrFilterByENum.mjs'


/**
 * 計算陣列內有效數字之第7型分位數值(Quantile type 7)
 *
 * 第7型為R語言quantile(type=7，預設)與numpy.quantile(method='linear'，預設)所用者：
 * 將n個有效數字由小至大排序為x[0]至x[n-1]，取位置h=(n-1)*ratio，於相鄰兩點間線性內插，即x[⌊h⌋]+(h-⌊h⌋)*(x[⌊h⌋+1]-x[⌊h⌋])，h為整數時即x[h]。
 * 與arrQuartile(母體分位數，非整數位置時取最靠近之原始數據值)不同，本函數之結果可介於兩個原始數據之間，ratio為0時回傳最小值、為1時回傳最大值。
 * 只取有限數值：±Infinity(含'Infinity'、'1e400'等字串)與非數值同樣不計入個數與計算，數字字串轉數值後使用。
 * 位置h因浮點誤差而與整數相差在數個ULP內者視為整數(如ratio為0.07且n為101時h應為7，浮點乘積為7.000000000000001)，使結果恰為x[7]，不帶內插誤差。
 * 不改動輸入陣列。
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrQuantile7.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算，±Infinity(含'Infinity'、'1e400'等字串)與非數值同樣不計入
 * @param {Number|String} ratio 輸入指定位置有效數字，須介於0至1之間(含端點，可為數字字串)
 * @returns {Number} 回傳分位數值，arr非陣列、空陣列、陣列內無有效數字，或ratio缺漏、非有效數字、超出0至1範圍時回傳null，不丟錯(同arrQuartile)
 * @example
 *
 * let arr
 *
 * arr = [1, 2, 3, 4]
 * console.log(arrQuantile7(arr, 0.5))
 * // => 2.5
 *
 * arr = [1, 2, 3, 4]
 * console.log(arrQuantile7(arr, 0.25))
 * // => 1.75
 *
 * arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
 * console.log(arrQuantile7(arr, 0.25))
 * // => 7.25
 *
 * arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
 * console.log(arrQuantile7(arr, 0.75))
 * // => 14.5
 *
 * arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 * console.log(arrQuantile7(arr, 0.25))
 * // => 25.5
 *
 * arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 * console.log(arrQuantile7(arr, 0.5))
 * // => 40
 *
 * arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 * console.log(arrQuantile7(arr, 1))
 * // => 49
 *
 * arr = ['abc', '3', ' 1 ', 2, null, Infinity, '0x10', true, 'xyz']
 * console.log(arrQuantile7(arr, '0.5'))
 * // => 2 (只取有限數值1、2、3，ratio可為數字字串)
 *
 * arr = [1, 2, 3, Infinity, -Infinity, '1e400', 'xyz']
 * console.log(arrQuantile7(arr, 1))
 * // => 3 (±Infinity不計入個數與計算)
 *
 * console.log(arrQuantile7([], 0.5))
 * // => null
 *
 * console.log(arrQuantile7([1, 2, 3], 1.5))
 * // => null
 *
 */
function arrQuantile7(arr, ratio) {

    //check arr
    if (!isarr(arr)) {
        return null
    }
    if (arr.length === 0) {
        return null
    }

    //check ratio, 須為0至1之有效數字(含端點), 數字字串轉數值後使用
    if (!isenum(ratio, { use: 'ratio' })) {
        return null
    }
    let p = Number(ratio)

    //rs, 只取有限數值, ±Infinity與非數值同樣排除
    let rs = arrFilterByENum(arr)

    //n
    let n = rs.length

    //check
    if (n === 0) {
        return null
    }

    //xs, 以Float64Array原生數值排序(不改動輸入陣列, 不使用字典序)
    let xs = Float64Array.from(rs).sort()

    //h, 位置(n-1)*p, 與整數相差在數個ULP內者視為整數(浮點乘積誤差)
    let h = (n - 1) * p
    let hr = Math.round(h)
    if (Math.abs(h - hr) <= 4 * Number.EPSILON * Math.max(1, h)) {
        h = hr
    }

    //i, f
    let i = Math.floor(h)
    let f = h - i

    //h為整數時即x[h]
    if (f === 0) {
        return xs[i]
    }

    //線性內插, 相鄰兩點之差溢位時(如-1.7e308與1.7e308)改以加權平均計算, 使有限數值之結果恆為有限
    let a = xs[i]
    let b = xs[i + 1]
    let d = b - a
    if (Number.isFinite(d)) {
        return a + f * d
    }
    return a * (1 - f) + b * f
}


export default arrQuantile7
