import size from 'lodash/size'
import isNumber from 'lodash/isNumber'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrFilterByNum from 'wsemi/src/arrFilterByNum.mjs'
import arrAverage from './arrAverage.mjs'
import arrStd from './arrStd.mjs'
import jt from './jStat.mjs'


/**
 * 基於常態累加分布計算指定位置之反函數值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrNormInv.test.js Github}
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
 *     console.log(await arrNormInv(arr, 0.25))
 *     // => 22.47539788913989
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrNormInv(arr, 0.5))
 *     // => 33.18181818181818
 *
 *     arr = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
 *     console.log(await arrNormInv(arr, 0.75))
 *     // => 43.88823847449647
 *
 *     arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrNormInv(arr, 0.5))
 *     // => 1.4999999999999996
 *
 *     arr = ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 *     console.log(await arrNormInv(arr, 0.5))
 *     // => 3.2999999999999994
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function arrNormInv(arr, ratio) {

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

    //rs
    let rs = arrFilterByNum(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        return Promise.reject(`no effective data`)
    }

    //avg, sigma
    let avg = arrAverage(rs)
    let sigma = arrStd(rs) //sigma為樣本標準差(用n-1)
    // console.log('avg', avg, 'sigma', sigma)

    //check avg
    if (!isNumber(avg)) {
        return Promise.reject(`avg[${avg}] is not a number`)
    }

    //check sigma
    if (!isNumber(sigma)) {
        return Promise.reject(`sigma[${sigma}] is not a number`)
    }

    //check sigma, 計算wd.Normal時標準差不能小於等於0
    if (sigma <= 0) {
        return Promise.reject(`sigma[${sigma}] <= 0`)
    }

    // //Normal
    // let normal3_0025 = await wd.Normal(2.947834716, 0.025418535) //mean=2.947834716,arrStd deviation=0.025418535
    // let r = normal3_0025.inv(0.25)
    // console.log(`normal3_0025.inv(0.25)`, r)
    // // => 2.9306901746775

    //r, 等同於Excel的r=NORM.INV(p,mean,arrStd)
    // let nm = await wd.Normal(avg, sigma)
    // let r = nm.inv(ratio)
    let r = jt.normal.inv(ratio, avg, sigma)

    return r
}


export default arrNormInv
