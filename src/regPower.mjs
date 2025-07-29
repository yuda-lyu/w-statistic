import get from 'lodash-es/get.js'
import each from 'lodash-es/each.js'
import map from 'lodash-es/map.js'
import size from 'lodash-es/size.js'
import isnum from 'wsemi/src/isnum.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import isearr from 'wsemi/src/isearr.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import ss from './simpleStatistics.mjs'
import regLine from './regLine.mjs'


/**
 * 針對x,y數據進行乘冪(Power)回歸(y=ax^b)
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/regPower.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.interpX=null] 輸入經由回歸結果內插指定x值數字，預設null
 * @param {Boolean} [opt.calcR2=false] 輸入是否計算r2值布林值，預設false
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
 *     r = await regPower(arr)
 *     console.log(r)
 *     // => { a: 2.6361956497645123, b: -1.1246302189091415 }
 *
 *     arr = [
 *         [1, 0.5],
 *         [2.5, 1.1],
 *         [4, 2.5],
 *     ]
 *     r = await regPower(arr)
 *     console.log(r)
 *     // => { a: 0.47081085944621165, b: 1.1197632837626978 }
 *
 *     arr = [
 *         [1, 2.5],
 *         [2.5, 1.1],
 *         [4, 0.5],
 *     ]
 *     r = await regPower(arr, { interpX: 2 })
 *     console.log(r)
 *     // => {
 *     //   a: 2.6361956497645123,
 *     //   b: -1.1246302189091415,
 *     //   interpY: 1.2090108799137966
 *     // }
 *
 *     arr = [
 *         [1, 2.5],
 *         [2.5, 1.1],
 *         [4, 0.5],
 *     ]
 *     r = await regPower(arr, { calcR2: true })
 *     console.log(r)
 *     // => {
 *     //   a: 2.6361956497645123,
 *     //   b: -1.1246302189091415,
 *     //   r2: 0.977737578800406
 *     // }
 *
 *     arr = [
 *         [1, 2.5],
 *         [2.5, 1.1],
 *         [4, 0.5],
 *     ]
 *     r = regPower(arr, { useSync: true }) //使用同步函數(sync)
 *     console.log(r)
 *     // => { a: 2.6361956497645123, b: -1.1246302189091415 }
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
function regPower(arr, opt = {}) {

    //interpX
    let interpX = get(opt, 'interpX')
    if (!isnum(interpX)) {
        interpX = null
    }

    //calcR2
    let calcR2 = get(opt, 'calcR2')
    if (!isbol(calcR2)) {
        calcR2 = false
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

        //rs
        let rs = []
        each(arr, (v) => {
            let x = get(v, 0)
            let y = get(v, 1)
            if (isnum(x) && isnum(y)) {
                x = cdbl(x)
                y = cdbl(y)
                if (x > 0 && y > 0) {
                    rs.push([x, y]) //會使用log(x)與log(y)故需大於0
                }
            }
        })
        // console.log('rs', rs)

        //check
        if (size(rs) === 0) {
            throw new Error(`no effective data`)
        }

        //rsLog
        let rsLog = map(arr, (v) => {
            return [Math.log(v[0]), Math.log(v[1])]
        })

        //regLine
        let rl = regLine(rsLog, { useRegIntercept: true, useSync: true }) //要使用截距, 先簡化使用sync

        //check
        if (!iseobj(rl)) {
            return null
        }

        //r
        let r = {
            a: Math.exp(rl.b),
            b: rl.m,
        }

        //interpX
        if (isnum(interpX)) {
            interpX = cdbl(interpX)
            let interpY = r.a * (interpX ** r.b)
            r.interpY = interpY
        }

        //calcR2
        if (calcR2) {
            // let ys = []
            // let yps = []
            // each(rs, ([x, y]) => {
            //     let yp = r.a * (x ** r.b)
            //     ys.push(y)
            //     yps.push(yp)
            // })
            // let r2 = ss.rSquared(ys, yps)
            let r2 = ss.rSquared(rs, (x) => r.a * (x ** r.b))
            r.r2 = r2
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


export default regPower
