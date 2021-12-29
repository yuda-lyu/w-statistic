import size from 'lodash/size'
import isNumber from 'lodash/isNumber'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrFilterByPnumAndToLog from 'wsemi/src/arrFilterByPnumAndToLog.mjs'
import arrNormInv from './arrNormInv.mjs'


/**
 * 計算陣列內有效數字取對數(log)後之平均值和標準差，並基於常態累加分布之反函數取指數(exp)值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrLogNormInv.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Number} ratio 輸入指定位置浮點數，需介於0至1之間
 * @returns {Number} 回傳反函數值
 * @example
 *
 * async function test() {
 *
 *     let arr
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrLogNormInv(arr, 0.25))
 *     // => 16.096845206281877
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrLogNormInv(arr, 0.5))
 *     // => 27.201738017491444
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrLogNormInv(arr, 0.75))
 *     // => 45.96767513695641
 *
 *     arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrLogNormInv(arr, 0.5))
 *     // => 1.0499093195835956
 *
 *     arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrLogNormInv(arr, 0.5))
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

    //check
    if (!isNumber(r)) {
        return Promise.reject(`invalid value from arrNormInv`)
    }

    //exp
    r = Math.exp(r)

    return r
}


export default arrLogNormInv
