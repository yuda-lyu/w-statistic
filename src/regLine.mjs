import get from 'lodash/get'
import each from 'lodash/each'
import size from 'lodash/size'
import isnum from 'wsemi/src/isnum.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import ss from './simpleStatistics.mjs'


/**
 * 針對數據進行線性回歸(y=mx+b)
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/regLine.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.interpX=null] 輸入經由回歸結果內插指定x值，預設null
 * @param {Boolean} [opt.useRegIntercept=true] 輸入是否回歸使用截距布林值，預設true
 * @param {Boolean} [opt.useSync=false] 輸入是否使用同步函數布林值，預設false
 * @returns {Object|Promise} 若useSync=true回傳回歸結果物件，若useSync=false則回傳Promise，此時若成功則resolve回歸結果物件，若失敗則reject錯誤訊息
 * @example
 *
 * async function test() {
 *
 *     let arr
 *     let r
 *
 *     arr = [
 *         [1, 2.5],
 *         [2.5, 1.1],
 *         [4, 0.5],
 *     ]
 *     r = await regLine(arr)
 *     console.log(r)
 *     // => { m: -0.6666666666666664, b: 3.0333333333333323 }
 *
 *     arr = [
 *         [1, 0.5],
 *         [2.5, 1.1],
 *         [4, 2.5],
 *     ]
 *     r = await regLine(arr)
 *     console.log(r)
 *     // => { m: 0.666666666666667, b: -0.3000000000000007 }
 *
 *     arr = [
 *         [1, 0.5],
 *         [2.5, 1.1],
 *         [4, 2.5],
 *     ]
 *     r = await regLine(arr, { useRegIntercept: false }) //不使用截距, 也就是截距=0
 *     console.log(r)
 *     // => { m: 0.5698924731182796, b: 0 }
 *
 *     arr = [
 *         [1, 2.5],
 *         [2.5, 1.1],
 *         [4, 0.5],
 *     ]
 *     r = await regLine(arr, { interpX: 2 })
 *     console.log(r)
 *     // => {
 *     //   m: -0.6666666666666664,
 *     //   b: 3.0333333333333323,
 *     //   interpY: 1.6999999999999995
 *     // }
 *
 *     arr = [
 *         [1, 2.5],
 *         [2.5, 1.1],
 *         [4, 0.5],
 *     ]
 *     r = regLine(arr, { useSync: true }) //使用同步函數(sync)
 *     console.log(r)
 *     // => { m: -0.6666666666666664, b: 3.0333333333333323 }
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
function regLine(arr, opt = {}) {

    //interpX
    let interpX = get(opt, 'interpX')
    if (!isnum(interpX)) {
        interpX = null
    }

    //useRegIntercept, 是否回歸使用截距
    let useRegIntercept = get(opt, 'useRegIntercept')
    if (!isbol(useRegIntercept)) {
        useRegIntercept = true
    }

    //useSync
    let useSync = get(opt, 'useSync')
    if (!isbol(useSync)) {
        useSync = false
    }

    //_sync
    let _sync = () => {

        //rs
        let rs = []
        each(arr, (v) => {
            let x = get(v, 0)
            let y = get(v, 1)
            if (isnum(x) && isnum(y)) {
                rs.push([cdbl(x), cdbl(y)])
            }
        })
        // console.log('rs', rs)

        //check
        if (size(rs) === 0) {
            return null
        }

        //r
        let r = null

        //useRegIntercept
        if (!useRegIntercept) {

            //無截距算斜率m
            let sumx2 = 0
            let sumxy = 0
            each(rs, (v) => {
                sumx2 += v[0] ** 2
                sumxy += v[0] * v[1]
            })
            let m = null
            if (sumx2 !== 0) {
                m = sumxy / sumx2
            }
            r = {
                m,
                b: 0,
            }
            // console.log('r(no b)', r)

        }
        else {

            //linearRegression
            r = ss.linearRegression(rs)
            // console.log('r', r)

        }

        //interpX
        if (isnum(interpX)) {
            interpX = cdbl(interpX)
            let interpY = ss.linearRegressionLine(r)(interpX)
            r.interpY = interpY
        }

        return r
    }

    //_async
    let _async = async () => {
        let r = null
        try {
            r = _sync()
            if (iseobj(r)) {
                return r
            }
            else {
                return Promise.reject(`no effective data`)
            }
        }
        catch (err) {
            console.log(err)
            return Promise.reject(err.toString())
        }
    }

    if (useSync) {
        return _sync()
    }
    else {
        return _async()
    }
}


export default regLine
