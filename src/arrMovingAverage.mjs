import get from 'lodash-es/get.js'
import each from 'lodash-es/each.js'
import size from 'lodash-es/size.js'
import cloneDeep from 'lodash-es/cloneDeep.js'
import isarr from 'wsemi/src/isarr.mjs'
import isp0int from 'wsemi/src/isp0int.mjs'
import cint from 'wsemi/src/cint.mjs'
import arrAverage from './arrAverage.mjs'


/**
 * 計算陣列內有效數字之移動平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrMovingAverage.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Integer} [opt.selectCountHalf=2] 輸入上下取點數整數，總取點數為2*selectCountHalf+1，預設2(取5點)
 * @returns {Array} 回傳移動平均值陣列
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrMovingAverage(arr))
 * // => [
 * //                   -2.5,                   -2,
 * //                  -1.75,                -1.42,
 * //    -0.9399999999999998, -0.44000000000000006,
 * //   -0.24000000000000005,                -0.02,
 * //                   0.02,                 0.24,
 * //    0.44000000000000006,   0.9400000000000001,
 * //                   1.42,                  5.9,
 * //                  7.125,    9.166666666666666,
 * //                   12.5
 * // ]
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrMovingAverage(arr, { selectCountHalf: 1 }))
 * // => [
 * //   0,
 * //   0,
 * //   0.03333333333333333,
 * //   0.06666666666666667,
 * //   0.39999999999999997,
 * //   0.7000000000000001,
 * //   1.5,
 * //   2,
 * //   9.166666666666666,
 * //   12.5,
 * //   22.5
 * // ]
 *
 */
function arrMovingAverage(arr, opt = {}) {

    //check
    if (!isarr(arr)) {
        return []
    }
    if (size(arr) === 0) {
        return []
    }

    //selectCountHalf
    let selectCountHalf = get(opt, 'selectCountHalf')
    if (!isp0int(selectCountHalf)) {
        selectCountHalf = 2
    }
    selectCountHalf = cint(selectCountHalf)

    //n
    let n = size(arr)

    //check
    if (n === 0) {
        return []
    }

    //rs
    let rs = cloneDeep(arr)

    //arrAverage
    each(arr, (v, k) => {

        //kStart, kEnd
        let kStart = k - selectCountHalf
        kStart = Math.max(kStart, 0)
        kStart = Math.min(kStart, n - 1)
        let kEnd = Math.max(k + selectCountHalf, 0)
        kEnd = Math.max(kEnd, 0)
        kEnd = Math.min(kEnd, n - 1)

        //arrt
        let arrt = []
        for (let i = kStart; i <= kEnd; i++) {
            arrt.push(arr[i])
        }

        //arrAverage
        let avg = arrAverage(arrt)
        // console.log(k, kStart, kEnd, 'arrt', arrt, 'avg', avg)

        //save
        rs[k] = avg

    })

    return rs
}


export default arrMovingAverage
