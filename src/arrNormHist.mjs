import size from 'lodash/size'
import map from 'lodash/map'
import cloneDeep from 'lodash/cloneDeep'
import isarr from 'wsemi/src/isarr.mjs'
import arrAverage from './arrAverage.mjs'
import arrStd from './arrStd.mjs'
import histGen from './histGen.mjs'
// import jt from './jStat.mjs'


/**
 * 基於常態分布計算陣列數據分組直方圖、統計與趨勢線數據
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/arrNormHist.test.js Github}
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
async function arrNormHist(arr, opt = {}) {

    //check arr
    if (!isarr(arr)) {
        return Promise.reject('arr is not an array')
    }
    if (size(arr) === 0) {
        return Promise.reject('arr is not an effective array')
    }

    //histGen
    let r = await histGen(arr, (params) => {
        // console.log('params', params)

        //avg
        let avg = arrAverage(params.arr)

        //std
        let std = arrStd(params.arr)

        //ry
        let ry = (std * Math.sqrt(2 * Math.PI))

        //curveY
        let curveY = map(params.curveX, (x) => {
            let y = 0
            if (ry !== 0) {
                y = 1 / ry * Math.exp(-((x - avg) ** 2) / (2 * std ** 2))
            }
            return y
        })

        return curveY
    }, opt)

    //cloneDeep
    r = cloneDeep(r)

    //merge pdfs
    r.bins = map(r.bins, (v, k) => {
        v.pdf = r.pdfs[k]
        return v
    })

    //merge curveX, curveY
    r.curves = map(r.curveX, (v, k) => {
        return {
            x: v,
            pdf: r.curveY[k],
        }
    })

    //delete
    delete r.counts
    delete r.pdfs
    delete r.curveX
    delete r.curveY

    return r
}


export default arrNormHist
