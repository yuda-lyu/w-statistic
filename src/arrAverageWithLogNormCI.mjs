import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrFilterByPnumAndToLog from 'wsemi/src/arrFilterByPnumAndToLog.mjs'
import arrAverageWithNormCI from './arrAverageWithNormCI.mjs'


/**
 * 基於Student-T累加分布之信賴水準(p)以及指定左右單尾條件下，計算樣本平均值。Student-T需用於常態分佈樣本，故數據是取log後為常態分佈才能以此計算，而於取log後座標算出樣本平均值，會再取其指數(exp)值回傳。此時左尾代表樣本平均值可小於等於母數平均值，而右尾代表樣本平均值可大於等於母數平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrAverageWithLogNormCI.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Number} p 輸入信賴水準浮點數，需介於0至1之間
 * @param {String} mode 輸入檢定模式字串，可選'two-tailed'、'upper-tail'、'lower-tail'，預設'two-tailed'
 * @returns {Number} 回傳樣本平均值
 * @example
 *
 * async function test() {
 *
 *     let arr
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.95))
 *     // => [ 27.615050054890812, 26.794611985184215 ]
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.95, 'upper-tail'))
 *     // => 41.610938902127394
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.95, 'lower-tail'))
 *     // => 17.782212338746568
 *
 *     arr = [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.95, 'upper-tail'))
 *     // => 19.28628574730297
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.25))
 *     // => [ 36.223415575653085, 20.42696800987406 ]
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.5))
 *     // => [ 32.05361593350904, 23.084277065874097 ]
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithLogNormCI(arr, 0.75))
 *     // => [ 29.373829998564737, 25.190264640613567 ]
 *
 *     arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrAverageWithLogNormCI(arr, 0.50))
 *     // => [ 1.7639684225556826, 0.6249032382061773 ]
 *
 *     arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrAverageWithLogNormCI(arr, 0.50))
 *     // => [ 1.7639684225556826, 0.6249032382061773 ]
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function arrAverageWithLogNormCI(arr, p, mode = 'two-tailed') {

    //check arr
    if (!isarr(arr)) {
        return Promise.reject('arr is not an array')
    }
    if (size(arr) === 0) {
        return Promise.reject('arr is not an effective array')
    }

    //check p
    if (!isnum(p)) {
        return Promise.reject(`p[${p}] is not a number`)
    }
    p = cdbl(p)
    if (p < 0) {
        return Promise.reject(`p[${p}] < 0`)
    }
    if (p > 1) {
        return Promise.reject(`p[${p}] > 1`)
    }

    //check mode
    if (mode !== 'two-tailed' && mode !== 'upper-tail' && mode !== 'lower-tail') {
        return Promise.reject(`mode[${mode}] is not 'two-tailed', 'upper-tail' or 'lower-tail'`)
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

    //arrAverageWithNormCI
    let r = await arrAverageWithNormCI(rs, p, mode)
    // console.log('arrAverageWithNormCI', r)

    //exp
    if (isarr(r)) {
        r = [
            Math.exp(r[0]),
            Math.exp(r[1]),
        ]
    }
    else {
        r = Math.exp(r)
    }

    return r
}


export default arrAverageWithLogNormCI
