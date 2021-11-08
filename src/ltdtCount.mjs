import get from 'lodash/get'
import each from 'lodash/each'
import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import arrCount from './arrCount.mjs'


/**
 * 計算物件陣列內指定鍵值時有效數字，依照不重複值進行群組化後，回傳各值之出現次數值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/ltdtCount.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入物件陣列，只提取指定鍵值時有效數字(或為字串的數字)進行計算
 * @param {String} key 輸入指定鍵字串
 * @returns {Array} 回傳各值出現次數值陣列
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
 * console.log(ltdtCount(ltdt, 'v'))
 * // => [
 * //   { '2.5': 2, key: '2.5', count: 2 },
 * //   { '0.1': 2, key: '0.1', count: 2 },
 * //   { '-0.1': 2, key: '-0.1', count: 2 },
 * //   { '-1': 2, key: '-1', count: 2 },
 * //   { '-2.5': 2, key: '-2.5', count: 2 },
 * //   { '1': 2, key: '1', count: 2 },
 * //   { '0': 2, key: '0', count: 2 },
 * //   { '22.5': 1, key: '22.5', count: 1 }
 * // ]
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
 * console.log(ltdtCount(ltdt, 'v'))
 * // => [
 * //   { '2.5': 2, key: '2.5', count: 2 },
 * //   { '0.1': 2, key: '0.1', count: 2 },
 * //   { '1': 2, key: '1', count: 2 },
 * //   { '0': 2, key: '0', count: 2 },
 * //   { '22.5': 1, key: '22.5', count: 1 }
 * // ]
 *
 */
function ltdtCount(ltdt, key) {

    //check
    if (!isarr(ltdt)) {
        return []
    }
    if (!isestr(key)) {
        return []
    }

    //rs
    let rs = []
    each(ltdt, (v) => {
        let r = get(v, key)
        if (isnum(r) || isestr(r)) {
            rs.push(r) //一定要為數字或有效字串才儲存
        }
    })

    //check
    if (size(rs) === 0) {
        return []
    }

    //std
    let r = arrCount(rs)

    return r
}


export default ltdtCount
