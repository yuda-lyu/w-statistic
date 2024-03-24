import size from 'lodash-es/size.js'
import mean from 'lodash-es/mean.js'
import isarr from 'wsemi/src/isarr.mjs'
import arrFilterByNum from 'wsemi/src/arrFilterByNum.mjs'


/**
 * 計算陣列內有效數字之平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrAverage.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @returns {Number} 回傳平均值
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrAverage(arr))
 * // => 1.5
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrAverage(arr))
 * // => 3.3
 *
 */
function arrAverage(arr) {

    //check
    if (!isarr(arr)) {
        return null
    }
    if (size(arr) === 0) {
        return null
    }

    //rs
    let rs = arrFilterByNum(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return null
    }

    //mean
    let r = mean(rs)

    return r
}


export default arrAverage
