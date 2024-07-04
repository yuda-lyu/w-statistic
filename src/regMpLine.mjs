import get from 'lodash-es/get.js'
import each from 'lodash-es/each.js'
import flatten from 'lodash-es/flatten.js'
import range from 'lodash-es/range.js'
import isbol from 'wsemi/src/isbol.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import isearr from 'wsemi/src/isearr.mjs'
import MLR from 'ml-regression-multivariate-linear'


/**
 * 針對矩陣X與矩陣Y數據進行多變數線性回歸，單1種y時(y=b+m1*x1+m2*x2+...)，多種y時[ (y1=b1+m11*x1+m12*x2+...), (y2=b2+m21*x1+m22*x2+...),... ]
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/regMpLine.test.js Github}
 * @memberOf w-statistic
 * @param {Array} matX 輸入X二維陣列，為[ [x11,x12,x13,...], [x21,x22,x23,...],... ]
 * @param {Array} matY 輸入Y二維陣列，為[ [y11,y12,...], [y21,y22,...],... ]
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Array} [opt.interpX=null] 輸入經由回歸結果內插指定x陣列，為[x1,x2,x3,...]，預設null
 * @param {Boolean} [opt.useRegIntercept=true] 輸入是否回歸使用截距布林值，預設true
 * @param {Boolean} [opt.useSync=false] 輸入是否使用同步函數布林值，預設false
 * @returns {Object|Promise} 若useSync=true回傳回歸結果物件，若useSync=false則回傳Promise，此時若成功則resolve回歸結果物件，若失敗則reject錯誤訊息
 * @example
 *
 * async function test() {
 *
 *     let arrX
 *     let arrY
 *     let r
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0],
 *         [2],
 *         [4],
 *         [6],
 *     ]
 *     r = await regMpLine(arrX, arrY)
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515 ],
 *     //     [ -1.4210854715202004e-14 ],
 *     //     [ 3.552713678800501e-15 ]
 *     //   ],
 *     //   m1: 2.0000000000000515,
 *     //   m2: -1.4210854715202004e-14,
 *     //   b: 3.552713678800501e-15
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0, 0],
 *         [2, 4],
 *         [4, 6],
 *         [6, 8],
 *     ]
 *     r = await regMpLine(arrX, arrY)
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515, 3.552713678800501e-14 ],
 *     //     [ -1.4210854715202004e-14, 1.9999999999999716 ],
 *     //     [ 3.552713678800501e-15, 0 ]
 *     //   ],
 *     //   m11: 2.0000000000000515,
 *     //   m21: 3.552713678800501e-14,
 *     //   m12: -1.4210854715202004e-14,
 *     //   m22: 1.9999999999999716,
 *     //   b1: 3.552713678800501e-15,
 *     //   b2: 0
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0, 0, 0],
 *         [2, 4, 3],
 *         [4, 6, 5],
 *         [6, 8, 7],
 *     ]
 *     r = await regMpLine(arrX, arrY)
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515, 3.552713678800501e-14, 1.0000000000000426 ],
 *     //     [ -1.4210854715202004e-14, 1.9999999999999716, 0.9999999999999591 ],
 *     //     [ 3.552713678800501e-15, 0, 7.105427357601002e-15 ]
 *     //   ],
 *     //   m11: 2.0000000000000515,
 *     //   m21: 3.552713678800501e-14,
 *     //   m31: 1.0000000000000426,
 *     //   m12: -1.4210854715202004e-14,
 *     //   m22: 1.9999999999999716,
 *     //   m32: 0.9999999999999591,
 *     //   b1: 3.552713678800501e-15,
 *     //   b2: 0,
 *     //   b3: 7.105427357601002e-15
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0],
 *         [2],
 *         [4],
 *         [6],
 *     ]
 *     r = await regMpLine(arrX, arrY, { useRegIntercept: false }) //不使用截距, 也就是截距b=0
 *     console.log(r)
 *     // => {
 *     //   coes: [ [ 1.9999999999999716 ], [ 1.4210854715202004e-14 ] ],
 *     //   m1: 1.9999999999999716,
 *     //   m2: 1.4210854715202004e-14,
 *     //   b: 0
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0],
 *         [2],
 *         [4],
 *         [6],
 *     ]
 *     r = await regMpLine(arrX, arrY, { interpX: [0, 0] })
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515 ],
 *     //     [ -1.4210854715202004e-14 ],
 *     //     [ 3.552713678800501e-15 ]
 *     //   ],
 *     //   m1: 2.0000000000000515,
 *     //   m2: -1.4210854715202004e-14,
 *     //   b: 3.552713678800501e-15,
 *     //   interpX: [ 0, 0 ],
 *     //   interpY: [ 3.552713678800501e-15 ]
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0],
 *         [2],
 *         [4],
 *         [6],
 *     ]
 *     r = await regMpLine(arrX, arrY, { interpX: [100, 0] })
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515 ],
 *     //     [ -1.4210854715202004e-14 ],
 *     //     [ 3.552713678800501e-15 ]
 *     //   ],
 *     //   m1: 2.0000000000000515,
 *     //   m2: -1.4210854715202004e-14,
 *     //   b: 3.552713678800501e-15,
 *     //   interpX: [ 100, 0 ],
 *     //   interpY: [ 200.00000000000514 ]
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0],
 *         [2],
 *         [4],
 *         [6],
 *     ]
 *     r = await regMpLine(arrX, arrY, { interpX: [0, 100] })
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515 ],
 *     //     [ -1.4210854715202004e-14 ],
 *     //     [ 3.552713678800501e-15 ]
 *     //   ],
 *     //   m1: 2.0000000000000515,
 *     //   m2: -1.4210854715202004e-14,
 *     //   b: 3.552713678800501e-15,
 *     //   interpX: [ 0, 100 ],
 *     //   interpY: [ -1.4175327578413999e-12 ]
 *     // }
 *
 *     arrX = [
 *         [0, 0],
 *         [1, 2],
 *         [2, 3],
 *         [3, 4],
 *     ]
 *     arrY = [
 *         [0],
 *         [2],
 *         [4],
 *         [6],
 *     ]
 *     r = regMpLine(arrX, arrY, { useSync: true }) //使用同步函數(sync)
 *     console.log(r)
 *     // => {
 *     //   coes: [
 *     //     [ 2.0000000000000515 ],
 *     //     [ -1.4210854715202004e-14 ],
 *     //     [ 3.552713678800501e-15 ]
 *     //   ],
 *     //   m1: 2.0000000000000515,
 *     //   m2: -1.4210854715202004e-14,
 *     //   b: 3.552713678800501e-15
 *     // }
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
function regMpLine(matX, matY, opt = {}) {

    //interpX
    let interpX = get(opt, 'interpX')
    if (!isearr(interpX)) {
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

        //check matX
        if (!isearr(matX)) {
            throw new Error(`matX is not an effective array`)
        }
        let matX0 = get(matX, 0, [])
        if (!isearr(matX0)) {
            throw new Error(`matX[0] is not an effective array`)
        }

        //check matY
        if (!isearr(matY)) {
            throw new Error(`matY is not an effective array`)
        }
        let matY0 = get(matY, 0, [])
        if (!isearr(matY0)) {
            throw new Error(`matY[0] is not an effective array`)
        }

        //MLR
        let optMlr = {
            intercept: useRegIntercept,
        }
        let regression = new MLR(matX, matY, optMlr)
        // console.log('regression', regression)
        // console.log(regression.predict(X)) // Apply the model to X
        // weights: [
        //   [ 0.4367273586800948 ],
        //   [ 1.4356527329046394 ],
        //   [ -0.10327272210504645 ]
        // ],

        //r
        let r = {
            coes: regression.weights,
        }
        if (useRegIntercept) {
            if (regression.outputs === 1) {
                let vs = flatten(regression.weights)
                each(vs, (v, ir) => {
                    if (ir === regression.inputs) {
                        r['b'] = v
                    }
                    else {
                        r[`m${ir + 1}`] = v
                    }
                })
            }
            else {
                each(range(regression.inputs + 1), (ir) => {
                    each(range(regression.outputs), (ic) => {
                        let v = regression.weights[ir][ic]
                        if (ir === regression.inputs) {
                            r[`b${ic + 1}`] = v
                        }
                        else {
                            r[`m${ic + 1}${ir + 1}`] = v
                        }
                    })
                })
            }
        }
        else {
            if (regression.outputs === 1) {
                let vs = flatten(regression.weights)
                each(vs, (v, ir) => {
                    r[`m${ir + 1}`] = v
                })
                r['b'] = 0
            }
            else {
                each(range(regression.inputs + 1), (ir) => {
                    each(range(regression.outputs), (ic) => {
                        let v = regression.weights[ir][ic]
                        r[`m${ic + 1}${ir + 1}`] = v
                        if (ir === regression.inputs) {
                            r[`b${ic + 1}`] = 0
                        }
                    })
                })
            }
        }
        // console.log('r', r)

        //interpX
        if (isearr(interpX)) {
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


export default regMpLine
