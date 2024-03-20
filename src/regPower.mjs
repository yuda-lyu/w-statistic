import get from 'lodash-es/get'
import each from 'lodash-es/each'
import map from 'lodash-es/map'
import isnum from 'wsemi/src/isnum.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import iseobj from 'wsemi/src/iseobj.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import regLine from './regLine.mjs'


/**
 * 針對數據進行乘冪(Power)回歸(y=ax^b)
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/regPower.test.js Github}
 * @memberOf w-statistic
 * @param {Array} arr 輸入陣列，只提取有效數字(或為字串的數字)進行計算
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.interpX=null] 輸入經由回歸結果內插指定x值，預設null
 * @param {Boolean} [opt.useSync=false] 輸入是否使用同步函數布林值，預設false
 * @returns {Object|Promise} 若useSync=true回傳回歸結果物件，若useSync=false則回傳Promise，此時若成功則resolve回歸結果物件，若失敗則reject錯誤訊息
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
function regPower(arr, opt = {}) {

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

        //rsLog
        let rsLog = map(arr, (v) => {
            return [Math.log(v[0]), Math.log(v[1])]
        })

        //regLine
        let r = regLine(rsLog, { useRegIntercept: true, useSync: true }) //要使用截距, 先簡化使用sync

        //check
        if (!iseobj(r)) {
            return null
        }

        //rp
        let rp = {
            a: Math.exp(r.b),
            b: r.m,
        }

        //interpX
        if (isnum(interpX)) {
            interpX = cdbl(interpX)
            let interpY = rp.a * (interpX ** rp.b)
            rp.interpY = interpY
        }

        return rp
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


export default regPower
