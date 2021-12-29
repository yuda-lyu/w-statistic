import each from 'lodash/each'
import size from 'lodash/size'
import isNumber from 'lodash/isNumber'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrAverage from './arrAverage.mjs'
import arrStd from './arrStd.mjs'
import studentTInv from './studentTInv.mjs'


/**
 * 計算陣列內有效數字之平均值和標準差，並基於司徒頓t累加分布之信賴水準(p)以及指定左右單尾條件下，計算樣本平均值。此時左尾代表樣本平均值可小於等於母數平均值，而右尾代表樣本平均值可大於等於母數平均值

 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrAverageWithNormCI.test.js Github}
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
 *     console.log(await arrAverageWithNormCI(arr, 0.95))
 *     // => [ 33.48954903620696, 32.8740873274294 ]
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithNormCI(arr, 0.95, 'upper-tail'))
 *     // => 41.85625505621444
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithNormCI(arr, 0.95, 'lower-tail'))
 *     // => 24.507381307421923
 *
 *     arr = [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912]
 *     console.log(await arrAverageWithNormCI(arr, 0.95, 'upper-tail'))
 *     // => 19.297020893539198
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithNormCI(arr, 0.25))
 *     // => [ 39.026745114674725, 27.33689124896163 ]
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithNormCI(arr, 0.5))
 *     // => [ 36.53111791210903, 29.832518451527324 ]
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrAverageWithNormCI(arr, 0.75))
 *     // => [ 34.74951166569836, 31.614124697938003 ]
 *
 *     arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrAverageWithNormCI(arr, 0.50))
 *     // => [ 2.5700668400779687, 0.42993315992203107 ]
 *
 *     arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrAverageWithNormCI(arr, 0.50))
 *     // => [ 5.011682286477021, 1.5883177135229787 ]
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function arrAverageWithNormCI(arr, p, mode = 'two-tailed') {

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

    //rs
    let rs = []
    each(arr, (v) => {
        if (isnum(v)) {
            rs.push(cdbl(v))
        }
    })

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return Promise.reject(`no effective data`)
    }

    //avg, sigma
    let avg = arrAverage(arr)
    let sigma = arrStd(arr) //sigma為樣本標準差(用n-1)

    //check avg
    if (!isNumber(avg)) {
        return Promise.reject(`avg[${avg}] is not a number`)
    }

    //check sigma
    if (!isNumber(sigma)) {
        return Promise.reject(`sigma[${sigma}] is not a number`)
    }

    //r
    let r = null
    if (mode === 'upper-tail' || mode === 'lower-tail') {
        //upper-tail: 右單尾
        //lower-tail: 左單尾

        //tav
        let tav = await studentTInv(n, p) //單尾

        //r
        if (mode === 'upper-tail') {
            r = avg + tav * sigma / Math.sqrt(n)
        }
        else { //左單尾
            r = avg - tav * sigma / Math.sqrt(n)
        }

    }
    else if (mode === 'two-tailed') {
        //雙尾: two-tailed

        //tav
        let tav = await studentTInv(n, p / 2) //雙尾

        //r
        let r1 = avg - tav * sigma / Math.sqrt(n)
        let r2 = avg + tav * sigma / Math.sqrt(n)
        r = [r1, r2]

    }

    return r
}


export default arrAverageWithNormCI
