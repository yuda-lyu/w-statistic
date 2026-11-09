import size from 'lodash-es/size.js'
import isarr from 'wsemi/src/isarr.mjs'
import ispnum from 'wsemi/src/ispnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrFilterByNum from 'wsemi/src/arrFilterByNum.mjs'


//quantileSorted, 針對已由小至大排序之陣列計算母體分位數(Quantiles of a population), 輸入陣列至少須有1個元素
//演算法同simple-statistics 7.x之quantileSorted(arrQuartile之JSDoc範例與既有測試皆為此語意, 輸出須維持不變):
//  idx=n*p非整數時取x[ceil(idx)-1], 即取最靠近的陣列內原始數據值;
//  idx為整數時, n為偶數取x[idx-1]與x[idx]之平均, n為奇數取x[idx].
//simple-statistics 8.0.0之quantile改為線性內插(R type=7, 即numpy預設), 同樣輸入會得到不同結果, 故不再委由其計算.
function quantileSorted(x, p) {
    let n = size(x)
    let idx = n * p
    if (p === 1) {
        return x[n - 1]
    }
    else if (p === 0) {
        return x[0]
    }
    else if (idx % 1 !== 0) {
        return x[Math.ceil(idx) - 1]
    }
    else if (n % 2 === 0) {
        return (x[idx - 1] + x[idx]) / 2
    }
    return x[idx]
}


/**
 * 計算陣列內有效數字之分位數值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrQuartile.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Number} ratio 輸入指定位置浮點數，需介於0至1之間
 * @returns {Number} 回傳分位數值
 * @example
 *
 * let arr
 *
 * arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
 * console.log(arrQuartile(arr, 0.25))
 * // => 7
 *
 * arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
 * console.log(arrQuartile(arr, 0.5))
 * // => 9
 *
 * arr = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]
 * console.log(arrQuartile(arr, 0.75))
 * // => 15
 *
 * arr = [1, 2, 3, 4, 5, 6]
 * console.log(arrQuartile(arr, 0.25))
 * // => 2
 *
 * arr = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]
 * console.log(arrQuartile(arr, 0.5))
 * // => 9
 *
 * arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 * console.log(arrQuartile(arr, 0.25))
 * // => 15
 *
 * arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 * console.log(arrQuartile(arr, 0.5))
 * // => 40
 *
 * arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 * console.log(arrQuartile(arr, 0.75))
 * // => 43
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrQuartile(arr, 0.5))
 * // => 0
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrQuartile(arr, 0.5))
 * // => 1
 *
 */
function arrQuartile(arr, ratio) {

    //check arr
    if (!isarr(arr)) {
        return null
    }
    if (size(arr) === 0) {
        return null
    }

    //check ratio
    if (!ispnum(ratio)) {
        return null
    }
    ratio = cdbl(ratio)
    if (ratio < 0) {
        ratio = 0
    }
    if (ratio > 1) {
        ratio = 1
    }

    //rs
    let rs = arrFilterByNum(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return null
    }

    //quantile, 排序後取母體分位數, 非整數位置時取最靠近的陣列內原始數據值
    let rsSorted = rs.slice().sort((a, b) => a - b)
    let r = quantileSorted(rsSorted, ratio)
    // let r = jt.quantile(rs, ratio) //jStat會取該分位數

    return r
}


export default arrQuartile
