import each from 'lodash/each'
import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import arrFilterByPnum from 'wsemi/src/arrFilterByPnum.mjs'


/**
 * 計算陣列內有效數字之幾何平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrGeometricAverage.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @returns {Number} 回傳幾何平均值
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrGeometricAverage(arr))
 * // => 1.0499093195835956
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrGeometricAverage(arr))
 * // => 1.0499093195835956
 *
 */
function arrGeometricAverage(arr) {

    //check
    if (!isarr(arr)) {
        return null
    }
    if (size(arr) === 0) {
        return null
    }

    //取大於0數值
    let rs = arrFilterByPnum(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return null
    }

    //r
    // let r = 1
    // each(rs, (v) => {
    //     r *= v //此算法會因為數值過大或陣列過長導致溢位
    // })
    // r = r ** (1 / n)
    let r = 0
    each(rs, (v) => {
        r += Math.log(v) //js的Math.log為ln, 以自然指數e為基底
    })
    r /= n

    //exp
    try {
        r = Math.exp(r)
    }
    catch (err) {
        console.log(err)
        return null
    }

    return r
}


export default arrGeometricAverage
