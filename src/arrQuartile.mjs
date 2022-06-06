import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import ispnum from 'wsemi/src/ispnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrFilterByNum from 'wsemi/src/arrFilterByNum.mjs'
import ss from './simpleStatistics.mjs'
// import jt from './jStat.mjs'


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

    //quantile
    let r = ss.quantile(rs, ratio) //simple-statistics會取最靠近的陣列內原始數據值
    // let r = jt.quantile(rs, ratio) //jStat會取該分位數

    return r
}


export default arrQuartile
