import get from 'lodash-es/get.js'
import map from 'lodash-es/map.js'
import min from 'lodash-es/min.js'
import max from 'lodash-es/max.js'
import size from 'lodash-es/size.js'
import cint from 'wsemi/src/cint.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import ispint from 'wsemi/src/ispint.mjs'
import arrFilterByNum from 'wsemi/src/arrFilterByNum.mjs'
import arrGroupByMaxmin from 'wsemi/src/arrGroupByMaxmin.mjs'
import rang from 'wsemi/src/rang.mjs'
import isnum from 'wsemi/src/isnum.mjs'


/**
 * 針對陣列數據分組
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrGammaInv.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Integer} [n=30] 輸入分組數量整數，預設30
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.min=null] 輸入分組最小值數字，預設null
 * @param {Number} [opt.max=null] 輸入分組最大值數字，預設null
 * @returns {Object} 回傳數據分組資訊物件
 * @example
 *
 * let arr
 *
 * arr = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
 * console.log(bin(arr, 4))
 * // => [
 * //   {
 * //     min: -2.5,
 * //     max: 3.75,
 * //     avg: 0.625,
 * //     arr: [
 * //       -2.5, -2.5, -1, -1,
 * //       -0.1, -0.1,  0,  0,
 * //        0.1,  0.1,  1,  1,
 * //        2.5,  2.5
 * //     ]
 * //   },
 * //   { min: 3.75, max: 10, avg: 6.875, arr: [] },
 * //   { min: 10, max: 16.25, avg: 13.125, arr: [] },
 * //   { min: 16.25, max: 22.5, avg: 19.375, arr: [ 22.5 ] }
 * // ]
 *
 * arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
 * console.log(bin(arr, 3))
 * // => [
 * //   {
 * //     min: 1.1,
 * //     max: 2.9333333333333336,
 * //     avg: 2.0166666666666666,
 * //     arr: [ 1.1, 2.2 ]
 * //   },
 * //   {
 * //     min: 2.9333333333333336,
 * //     max: 4.766666666666667,
 * //     avg: 3.85,
 * //     arr: [ 3.3, 4.4 ]
 * //   },
 * //   {
 * //     min: 4.766666666666667,
 * //     max: 6.6,
 * //     avg: 5.683333333333334,
 * //     arr: [ 5.5, 6.6 ]
 * //   }
 * // ]
 *
 * arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
 * console.log(bin(arr, 5))
 * // => [
 * //   { min: 1.1, max: 2.2, avg: 1.6500000000000001, arr: [ 1.1, 2.2 ] },
 * //   { min: 2.2, max: 3.3000000000000003, avg: 2.75, arr: [ 3.3 ] },
 * //   {
 * //     min: 3.3000000000000003,
 * //     max: 4.4,
 * //     avg: 3.8500000000000005,
 * //     arr: [ 4.4 ]
 * //   },
 * //   { min: 4.4, max: 5.5, avg: 4.95, arr: [ 5.5 ] },
 * //   { min: 5.5, max: 6.6, avg: 6.05, arr: [ 6.6 ] }
 * // ]
 *
 * arr = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
 * console.log(bin(arr, 5, { min: 0, max: 10 }))
 * // => [
 * //   { min: 0, max: 2, avg: 1, arr: [ 1.1 ] },
 * //   { min: 2, max: 4, avg: 3, arr: [ 2.2, 3.3 ] },
 * //   { min: 4, max: 6, avg: 5, arr: [ 4.4, 5.5 ] },
 * //   { min: 6, max: 8, avg: 7, arr: [ 6.6 ] },
 * //   { min: 8, max: 10, avg: 9, arr: [] }
 * // ]
 *
 */
function bin(arr, n = 30, opt = {}) {

    //check n
    if (!ispint(n)) {
        n = 30
    }
    n = cint(n)
    // console.log('n', n)

    //arrFilterByNum
    let rs = arrFilterByNum(arr)

    //check rs
    if (size(rs) === 0) {
        return []
    }

    //rmin
    let rmin = get(opt, 'min', null)
    if (!isnum(rmin)) {
        rmin = min(rs)
    }
    rmin = cdbl(rmin)
    // console.log('rmin', rmin)

    //rmax
    let rmax = get(opt, 'max', null)
    if (!isnum(rmax)) {
        rmax = max(rs)
    }
    rmax = cdbl(rmax)
    // console.log('rmax', rmax)

    //rang
    let ts = rang(rmin, rmax, n)
    // console.log('ts', ts)

    //mm
    let mm = []
    for (let i = 0; i < size(ts) - 1; i++) {
        let minType = i === 0 ? '>=' : '>'
        let maxType = '<='
        let m = {
            min: ts[i],
            max: ts[i + 1],
            avg: (ts[i] + ts[i + 1]) / 2,
            minType,
            maxType,
        }
        mm.push(m)
    }
    // console.log('mm', mm)

    //arrGroupByMaxmin
    let gs = arrGroupByMaxmin(rs, mm)
    // console.log('gs', gs)

    //bs
    let bs = map(gs, (v) => {
        return {
            min: v.min,
            max: v.max,
            avg: v.avg,
            arr: get(v, 'items', []),
        }
    })

    return bs
}


export default bin
