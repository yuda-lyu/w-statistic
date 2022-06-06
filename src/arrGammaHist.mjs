import size from 'lodash/size'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isarr from 'wsemi/src/isarr.mjs'
import arrFilterByNum from 'wsemi/src/arrFilterByNum.mjs'
import arrGammaFit from './arrGammaFit.mjs'
import histGen from './histGen.mjs'
import jt from './jStat.mjs'


/**
 * 基於Gamma分布計算陣列數據分組直方圖、統計與趨勢線數據
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrGammaHist.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.dx=null] 輸入直方圖分組(x軸)寬度數字，預設null
 * @param {Integer} [opt.n=30] 輸入直方圖分組(x軸)數量整數，預設30
 * @param {Integer} [opt.nCurve=100] 輸入擬合用陣列數據長度整數，預設100
 * @param {Number} [opt.min=null] 輸入直方圖分組(x軸)最小值數字，若不給則使用數據最小值，預設null
 * @param {Number} [opt.max=null] 輸入直方圖分組(x軸)最大值數字，若不給則使用數據最大值，預設null
 * @returns {Number} 回傳反函數值
 * @example
 *
 * async function test() {

 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function arrGammaHist(arr, opt = {}) {

    //check arr
    if (!isarr(arr)) {
        return Promise.reject('arr is not an array')
    }
    if (size(arr) === 0) {
        return Promise.reject('arr is not an effective array')
    }

    //rs
    let rs = arrFilterByNum(arr)

    //需大於0
    rs = filter(rs, (v) => {
        return v > 0
    })

    //arrGammaFit
    let rf = await arrGammaFit(arr, opt)

    //histGen
    let r = await histGen(rs, (params) => {
        // console.log('params', params)

        //curveY
        let curveY = map(params.curveX, (x) => {
            let y = jt.gamma.pdf(x, rf.shape, rf.scale)
            return y
        })

        return curveY
    }, opt)

    //merge pdfs
    let bins = map(r.bins, (v, k) => {
        v.pdf = r.pdfs[k]
        return v
    })

    //merge curveX, curveY
    let curves = map(r.curveX, (v, k) => {
        return {
            x: v,
            pdf: r.curveY[k],
        }
    })

    //res
    let res = {
        shape: rf.shape,
        scale: rf.scale,
        arr: r.arr,
        min: r.min,
        max: r.max,
        barWidth: r.barWidth,
        ratioForCountToPdf: r.ratioForCountToPdf,
        bins,
        curves,
    }

    return res
}


export default arrGammaHist
