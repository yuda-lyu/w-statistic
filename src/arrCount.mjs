import each from 'lodash-es/each.js'
import map from 'lodash-es/map.js'
import size from 'lodash-es/size.js'
import groupBy from 'lodash-es/groupBy.js'
import sortBy from 'lodash-es/sortBy.js'
import reverse from 'lodash-es/reverse.js'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cstr from 'wsemi/src/cstr.mjs'


/**
 * 計算陣列內有效字串依照不重複值進行群組化後，回傳各值之出現次數值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrCount.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效字串(或為字串的數字)進行計算
 * @returns {Array} 回傳各值出現次數值陣列
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, 'abc', '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrCount(arr))
 * // => [
 * //   { key: '2.5', count: 2 },
 * //   { key: '0.1', count: 2 },
 * //   { key: '-0.1', count: 2 },
 * //   { key: '-1', count: 2 },
 * //   { key: '-2.5', count: 2 },
 * //   { key: 'abc', count: 2 },
 * //   { key: '1', count: 2 },
 * //   { key: '0', count: 2 },
 * //   { key: 'xyz', count: 1 },
 * //   { key: '22.5', count: 1 }
 * // ]
 *
 * arr = ['abc', '0', 0, 'abc', '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrCount(arr))
 * // => [
 * //  { key: '2.5', count: 2 },
 * //  { key: '0.1', count: 2 },
 * //  { key: 'abc', count: 2 },
 * //  { key: '1', count: 2 },
 * //  { key: '0', count: 2 },
 * //  { key: 'xyz', count: 1 },
 * //  { key: '22.5', count: 1 }
 * //]
 *
 */
function arrCount(arr) {

    //check
    if (!isarr(arr)) {
        return []
    }
    if (size(arr) === 0) {
        return []
    }

    //rs
    let rs = []
    each(arr, (v) => {
        if (isnum(v) || isestr(v)) {
            rs.push(cstr(v)) //都轉字串
        }
    })

    //check
    if (size(rs) === 0) {
        return []
    }

    //轉物件
    rs = map(rs, (v) => {
        return { v }
    })

    //groupBy
    let gs = groupBy(rs, 'v')
    // console.log('groupBy gs', gs)

    //to array
    gs = map(gs, (v, k) => {
        let count = size(v)
        return {
            key: k,
            count,
        }
    })
    // console.log('toArray gs', gs)

    //sortBy
    gs = sortBy(gs, 'count')
    // console.log('sortBy gs', gs)

    //reverse
    gs = reverse(gs)
    // console.log('reverse gs', gs)

    return gs
}


export default arrCount
