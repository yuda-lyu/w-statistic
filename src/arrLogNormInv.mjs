import get from 'lodash/get'
import size from 'lodash/size'
import map from 'lodash/map'
import isNumber from 'lodash/isNumber'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrFilterByPnumAndToLog from 'wsemi/src/arrFilterByPnumAndToLog.mjs'
import arrNormInv from './arrNormInv.mjs'


/**
 * 基於對數常態累加分布計算指定位置之反函數值，會先計算陣列內有效數字取對數(log)後之平均值和標準差，並基於其為常態累加分布，計算指定位置之反函數值後，再取指數(exp)值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrLogNormInv.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Number} ratio 輸入指定位置浮點數，需介於0至1之間
 * @returns {Number} 回傳反函數取指數(exp)值
 * @example
 *
 * async function test() {
 *
 *     let arr
 *     let r
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     r = await arrLogNormInv(arr, 0.25)
 *     console.log(r.inv)
 *     // => 16.096845206281877
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     r = await arrLogNormInv(arr, 0.5)
 *     console.log(r.inv)
 *     // => 27.201738017491444
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     r = await arrLogNormInv(arr, 0.75)
 *     console.log(r.inv)
 *     // => 45.96767513695641
 *
 *     arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     r = await arrLogNormInv(arr, 0.5)
 *     console.log(r.inv)
 *     // => 1.0499093195835956
 *
 *     arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     r = await arrLogNormInv(arr, 0.5)
 *     console.log(r.inv)
 *     // => 1.0499093195835956
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function arrLogNormInv(arr, ratio) {

    //check arr
    if (!isarr(arr)) {
        return Promise.reject('arr is not an array')
    }
    if (size(arr) === 0) {
        return Promise.reject('arr is not an effective array')
    }

    //check ratio
    if (!isnum(ratio)) {
        return Promise.reject(`ratio[${ratio}] is not a number`)
    }
    ratio = cdbl(ratio)
    if (ratio < 0) {
        return Promise.reject(`ratio[${ratio}] < 0`)
    }
    if (ratio > 1) {
        return Promise.reject(`ratio[${ratio}] > 1`)
    }

    //取大於0數值並取log
    let rs = arrFilterByPnumAndToLog(arr)
    // console.log('arrFilterByPnumAndToLog', rs)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return Promise.reject(`no effective data`)
    }

    //arrNormInv
    let r = await arrNormInv(rs, ratio)
    // inv,
    // avg,
    // std,
    // arr,

    //check
    if (!isNumber(get(r, 'inv'))) {
        return Promise.reject(`invalid value from arrNormInv`)
    }

    //exp
    r = {
        inv: Math.exp(r.inv),
        avg: Math.exp(r.avg),
        std: Math.exp(r.std),
        arr: map(r.arr, (v) => {
            return Math.exp(v)
        }),
    }

    return r
}


export default arrLogNormInv
