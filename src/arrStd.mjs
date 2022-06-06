import size from 'lodash/size'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import jt from './jStat.mjs'


/**
 * 計算陣列內有效數字之標準差
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrStd.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @returns {Number} 回傳標準差
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrStd(arr))
 * // => 5.985339231345682
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrStd(arr))
 * // => 7.269456650947167
 *
 * arr = [55, 68, 45, 78, 150, 241, 162, 156, 182, 125, 75, 89, 91, 95, 92, 65, 75, 85, 95, 105, 132, 120, 142, 110, 111, 130, 128, 130, 108, 109]
 * console.log(arrStd(arr))
 * // =>  40.847473507599254, 為除以29(n-1)的std
 *
 */
function arrStd(arr) {

    //check
    if (!isarr(arr)) {
        return null
    }
    if (size(arr) === 0) {
        return null
    }

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check
    if (size(arr) <= 1) { //標準差至少要2點才能計算
        return null
    }

    // let r = ss.sampleStandardDeviation(arr)
    let r = jt.sampleStd(arr)

    return r
}


export default arrStd
