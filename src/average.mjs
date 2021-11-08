import each from 'lodash/each'
import size from 'lodash/size'
import mean from 'lodash/mean'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'


/**
 * 計算陣列內有效數字之平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/average.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @returns {Number} 回傳平均值
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(average(arr))
 * // => 1.5
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(average(arr))
 * // => 3.3
 *
 */
function average(arr) {

    //check
    if (!isarr(arr)) {
        return null
    }

    //rs, 取數字數據
    let rs = []
    each(arr, (v) => {
        if (isnum(v)) {
            rs.push(cdbl(v))
        }
    })

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        // throw new Error('無有效數據')
        return null
    }

    return mean(rs)
}


export default average
