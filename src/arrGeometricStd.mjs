import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import arrFilterByPnumAndToLog from 'wsemi/src/arrFilterByPnumAndToLog.mjs'
import arrStd from './arrStd.mjs'


/**
 * 計算陣列內有效數字之幾何標準差
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrGeometricStd.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @returns {Number} 回傳幾何標準差
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrGeometricStd(arr))
 * // => 6.774243857996147
 *
 * arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(arrGeometricStd(arr))
 * // => 6.774243857996147
 *
 */
function arrGeometricStd(arr) {

    //check
    if (!isarr(arr)) {
        return null
    }
    if (size(arr) === 0) {
        return null
    }

    //取大於0且轉log數值
    let rs = arrFilterByPnumAndToLog(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return null
    }

    //check
    if (n <= 1) {
        // throw new Error('至少要2點才能計算')
        return null
    }

    //r
    // let r = 0
    // each(rs, (v) => {
    //     r += (Math.log(v / geoAvg)) ** 2
    // })
    // r /= (n - 1)
    // r = Math.sqrt(r)
    // r = Math.exp(r)
    let sigma = arrStd(rs) //sigma為樣本標準差(用n-1)
    let r = Math.exp(sigma)

    return r
}


export default arrGeometricStd
