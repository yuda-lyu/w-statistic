import get from 'lodash/get'
import each from 'lodash/each'
import size from 'lodash/size'
import mean from 'lodash/mean'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'


/**
 * 計算物件陣列內指定鍵值時有效數字之平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/ltdtAverage.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入物件陣列，只提取指定鍵值時有效數字(或為字串的數字)進行計算
 * @param {String} key 輸入指定鍵字串
 * @returns {Number} 回傳平均值
 * @example
 *
 * let ltdt
 *
 * ltdt = [
 *     {
 *         'k': 0,
 *         'v': 'abc'
 *     },
 *     {
 *         'k': 1,
 *         'v': '-2.5'
 *     },
 *     {
 *         'k': 2,
 *         'v': -2.5
 *     },
 *     {
 *         'k': 3,
 *         'v': '-1'
 *     },
 *     {
 *         'k': 4,
 *         'v': -1
 *     },
 *     {
 *         'k': 5,
 *         'v': '-0.1'
 *     },
 *     {
 *         'k': 6,
 *         'v': -0.1
 *     },
 *     {
 *         'k': 7,
 *         'v': '0'
 *     },
 *     {
 *         'k': 8,
 *         'v': 0
 *     },
 *     {
 *         'k': 9,
 *         'v': '0.1'
 *     },
 *     {
 *         'k': 10,
 *         'v': 0.1
 *     },
 *     {
 *         'k': 11,
 *         'v': '1'
 *     },
 *     {
 *         'k': 12,
 *         'v': 1
 *     },
 *     {
 *         'k': 13,
 *         'v': '2.5'
 *     },
 *     {
 *         'k': 14,
 *         'v': 2.5
 *     },
 *     {
 *         'k': 15,
 *         'v': 22.5
 *     },
 *     {
 *         'k': 16,
 *         'v': 'xyz'
 *     }
 * ]
 * console.log(ltdtAverage(ltdt, 'v'))
 * // => 1.5
 *
 * ltdt = [
 *     {
 *         'k': 0,
 *         'v': 'abc'
 *     },
 *     {
 *         'k': 1,
 *         'v': '0'
 *     },
 *     {
 *         'k': 2,
 *         'v': 0
 *     },
 *     {
 *         'k': 3,
 *         'v': '0.1'
 *     },
 *     {
 *         'k': 4,
 *         'v': 0.1
 *     },
 *     {
 *         'k': 5,
 *         'v': '1'
 *     },
 *     {
 *         'k': 6,
 *         'v': 1
 *     },
 *     {
 *         'k': 7,
 *         'v': '2.5'
 *     },
 *     {
 *         'k': 8,
 *         'v': 2.5
 *     },
 *     {
 *         'k': 9,
 *         'v': 22.5
 *     },
 *     {
 *         'k': 10,
 *         'v': 'xyz'
 *     }
 * ]
 * console.log(ltdtAverage(ltdt, 'v'))
 * // => 3.3
 *
 */
function ltdtAverage(ltdt, key) {

    //check
    if (!isarr(ltdt)) {
        return null
    }
    if (!isestr(key)) {
        return null
    }

    //rs
    let rs = []
    each(ltdt, (v) => {
        let r = get(v, key)
        if (isnum(r)) {
            r = cdbl(r)
            rs.push(r) //一定要為數字才儲存
        }
    })

    //check
    if (size(rs) === 0) {
        return null
    }

    //mean
    let r = mean(rs) //每個值都確保為數字, 可直接用mean

    return r
}


export default ltdtAverage
