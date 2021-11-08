import map from 'lodash/map'
import size from 'lodash/size'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import cstr from 'wsemi/src/cstr.mjs'


/**
 * 計算陣列內有效數字依照不重複值進行群組化後，回傳各值之出現次數值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrCount.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @returns {Array} 回傳各值出現次數值陣列
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrCount(arr))
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
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrCount(arr))
 * // => [
 * //   { '2.5': 2, key: '2.5', count: 2 },
 * //   { '0.1': 2, key: '0.1', count: 2 },
 * //   { '1': 2, key: '1', count: 2 },
 * //   { '0': 2, key: '0', count: 2 },
 * //   { '22.5': 1, key: '22.5', count: 1 }
 * // ]
 *
 */
function arrCount(arr) {

    //check
    if (!isarr(arr)) {
        return []
    }

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //都轉字串
    arr = map(arr, cstr)

    //剔除無有效字串項目
    arr = filter(arr, (v) => {
        return isestr(v)
    })

    //check
    if (size(arr) === 0) {
        return []
    }

    //轉物件
    arr = map(arr, (v) => {
        return { v }
    })

    //groupBy
    let gs = groupBy(arr, 'v')
    // console.log('groupBy gs', gs)

    //to array
    gs = map(gs, (v, k) => {
        let count = size(v)
        return {
            [k]: count,
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
