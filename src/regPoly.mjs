import get from 'lodash-es/get.js'
import each from 'lodash-es/each.js'
import map from 'lodash-es/map.js'
import size from 'lodash-es/size.js'
import isnum from 'wsemi/src/isnum.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import isearr from 'wsemi/src/isearr.mjs'
import ispint from 'wsemi/src/ispint.mjs'
import cint from 'wsemi/src/cint.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import { PolynomialRegression } from 'ml-regression-polynomial'


/**
 * 針對數據進行多項式回歸(y=b+m1*x+m2*x^2+...)
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/regPoly.test.js Github}
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
 *         [50, 3.3], [50, 2.8],
 *         [50, 2.9], [70, 2.3],
 *         [70, 2.6], [70, 2.1],
 *         [80, 2.5], [80, 2.9],
 *         [80, 2.4], [90, 3],
 *         [90, 3.1], [90, 2.8],
 *         [100, 3.3], [100, 3.5],
 *         [100, 3]
 *     ]
 *     r = await regPoly(arr, 2)
 *     console.log(r)
 *     // => {
 *     //   b: 7.960481099654818,
 *     //   m1: -0.15371134020614285,
 *     //   m2: 0.0010756013745701653
 *     // }
 *
 *     arr = [
 *         [50, 3.3], [50, 2.8],
 *         [50, 2.9], [70, 2.3],
 *         [70, 2.6], [70, 2.1],
 *         [80, 2.5], [80, 2.9],
 *         [80, 2.4], [90, 3],
 *         [90, 3.1], [90, 2.8],
 *         [100, 3.3], [100, 3.5],
 *         [100, 3]
 *     ]
 *     r = await regPoly(arr, 3)
 *     console.log(r)
 *     // => {
 *     //   b: 21.051572327842386,
 *     //   m1: -0.7142872117740979,
 *     //   m2: 0.0087657232709057,
 *     //   m3: -0.000034014675054462467
 *     // }
 *
 *     arr = [
 *         [50, 3.3], [50, 2.8],
 *         [50, 2.9], [70, 2.3],
 *         [70, 2.6], [70, 2.1],
 *         [80, 2.5], [80, 2.9],
 *         [80, 2.4], [90, 3],
 *         [90, 3.1], [90, 2.8],
 *         [100, 3.3], [100, 3.5],
 *         [100, 3]
 *     ]
 *     r = await regPoly(arr, 2, { interpX: 80 })
 *     console.log(r)
 *     // => {
 *     //   b: 7.960481099654818,
 *     //   m1: -0.15371134020614285,
 *     //   m2: 0.0010756013745701653,
 *     //   interpX: 80,
 *     //   interpY: 2.5474226804124473
 *     // }
 *
 *     arr = [
 *         [50, 3.3], [50, 2.8],
 *         [50, 2.9], [70, 2.3],
 *         [70, 2.6], [70, 2.1],
 *         [80, 2.5], [80, 2.9],
 *         [80, 2.4], [90, 3],
 *         [90, 3.1], [90, 2.8],
 *         [100, 3.3], [100, 3.5],
 *         [100, 3]
 *     ]
 *     r = regPoly(arr, 2, { useSync: true }) //使用同步函數(sync)
 *     console.log(r)
 *     // => {
 *     //   b: 7.960481099654818,
 *     //   m1: -0.15371134020614285,
 *     //   m2: 0.0010756013745701653
 *     // }
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
function regPoly(arr, degree, opt = {}) {

    //interpX
    let interpX = get(opt, 'interpX')
    if (!isnum(interpX)) {
        interpX = null
    }

    //useSync
    let useSync = get(opt, 'useSync')
    if (!isbol(useSync)) {
        useSync = false
    }

    //_sync
    let _sync = () => {

        //check arr
        if (!isearr(arr)) {
            throw new Error(`arr is not an effective array`)
        }

        //check degree
        if (!ispint(degree)) {
            throw new Error(`degree[${degree}] is not an integer`)
        }
        degree = cint(degree)
        if (degree < 2) {
            throw new Error(`degree[${degree}] < 2`)
        }

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
            throw new Error(`no effective data`)
        }

        //r
        let r = {}

        //PolynomialRegression
        let x = map(rs, 0)
        let y = map(rs, 1)
        let regression = new PolynomialRegression(x, y, degree)
        // console.log('regression', regression)
        //regression.coefficients[0] -> b, regression.coefficients[1] -> m1, ...
        // console.log(regression.predict(80)) // Apply the model to some x value. Prints 2.6.
        // console.log(regression.coefficients) // Prints the coefficients in increasing order of power (from 0 to degree).
        // console.log(regression.toString(10)) // Prints a human-readable version of the function.
        // console.log(regression.toLaTeX())
        // console.log(regression.score(x, y))

        each(regression.coefficients, (v, k) => {
            if (k === 0) {
                r['b'] = v
            }
            else {
                r[`m${k}`] = v
            }
        })
        // console.log('r', r)

        //interpX
        if (isnum(interpX)) {
            interpX = cdbl(interpX)
            let interpY = regression.predict(interpX)
            r.interpX = interpX
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
            return Promise.reject(err.message)
        }
    }

    if (useSync) {
        return _sync()
    }
    else {
        return _async()
    }
}


export default regPoly
