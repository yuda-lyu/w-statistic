import map from 'lodash/map'
import isarr from 'wsemi/src/isarr.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import arrMovingAverage from './arrMovingAverage.mjs'


/**
 * 計算物件陣列內指定鍵值時有效數字之移動平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/ltdtMovingAverage.test.js Github}
 * @memberOf w-statistic
 * @param {Array} ltdt 輸入物件陣列，只提取指定鍵值時有效數字(或為字串的數字)進行計算
 * @param {String} key 輸入指定鍵字串
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Integer} [opt.selectCountHalf=2] 輸入上下取點數整數，總取點數為2*selectCountHalf+1，預設2(取5點)
 * @returns {Array} 回傳物件陣列，各物件之指定鍵值已更新為移動平均值
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
 * console.log(ltdtMovingAverage(ltdt, 'v'))
 * // => [
 * //   { k: 0, v: -2.5 },
 * //   { k: 1, v: -2 },
 * //   { k: 2, v: -1.75 },
 * //   { k: 3, v: -1.42 },
 * //   { k: 4, v: -0.9399999999999998 },
 * //   { k: 5, v: -0.44000000000000006 },
 * //   { k: 6, v: -0.24000000000000005 },
 * //   { k: 7, v: -0.02 },
 * //   { k: 8, v: 0.02 },
 * //   { k: 9, v: 0.24 },
 * //   { k: 10, v: 0.44000000000000006 },
 * //   { k: 11, v: 0.9400000000000001 },
 * //   { k: 12, v: 1.42 },
 * //   { k: 13, v: 5.9 },
 * //   { k: 14, v: 7.125 },
 * //   { k: 15, v: 9.166666666666666 },
 * //   { k: 16, v: 12.5 }
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
 * console.log(ltdtMovingAverage(ltdt, 'v', { selectCountHalf: 1 }))
 * // => [
 * //   { k: 0, v: 0 },
 * //   { k: 1, v: 0 },
 * //   { k: 2, v: 0.03333333333333333 },
 * //   { k: 3, v: 0.06666666666666667 },
 * //   { k: 4, v: 0.39999999999999997 },
 * //   { k: 5, v: 0.7000000000000001 },
 * //   { k: 6, v: 1.5 },
 * //   { k: 7, v: 2 },
 * //   { k: 8, v: 9.166666666666666 },
 * //   { k: 9, v: 12.5 },
 * //   { k: 10, v: 22.5 }
 * // ]
 *
 */
function ltdtMovingAverage(ltdt, key, opt) {

    //check
    if (!isarr(ltdt)) {
        return []
    }
    if (!isestr(key)) {
        return []
    }

    //rs
    let rs = map(ltdt, key)

    //arrMovingAverage
    let r = arrMovingAverage(rs, opt)

    //update
    ltdt = map(ltdt, (v, k) => {
        v[key] = r[k]
        return v
    })

    return ltdt
}


export default ltdtMovingAverage
