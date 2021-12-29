import get from 'lodash/get'
import map from 'lodash/map'
import times from 'lodash/times'
import cint from 'wsemi/src/cint.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import isnum from 'wsemi/src/isnum.mjs'


function randNormCore(mu = 0, sigma = 1) {
    function core(mu, sigma) {
        let x
        let r
        return function() {
            let y
            if (x != null) { // If available, use the second previously-generated uniform random.
                y = x
                x = null
            }
            else { // Otherwise, generate a new x and y.
                do {
                    x = Math.random() * 2 - 1
                    y = Math.random() * 2 - 1
                    r = x * x + y * y
                } while (!r || r > 1)
            }
            return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r)
        }
    }
    return core(mu, sigma)
}


/**
 * 依照常態分布隨機產生值或陣列
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/randNorm.test.js Github}
 * @memberOf w-statistic
 * @param {Number} mu 輸入平均值數字
 * @param {Number} sigma 輸入標準差數字
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.low=null] 輸入亂數之最小限制值數字，預設null
 * @param {Number} [opt.up=null] 輸入亂數之最大限制值數字，預設null
 * @param {Number} [opt.num=null] 輸入產生亂數數量整數，若有給予需大於等於1，預設null
 * @returns {Number|Array} 回傳亂數值或亂數值陣列
 * @example
 *
 * console.log(randNorm())
 * // => maybe: 0.17741167566201646, 0.24492265983649456, -0.24293127530491618,...
 *
 * console.log(randNorm(100))
 * // => maybe: 102.2788339269329 98.85403221640757 99.09814133809516,...
 *
 * console.log(randNorm(100, 50))
 * // => maybe: 94.99873795683716 136.81783120735003 49.94186751166804,...
 *
 * console.log(randNorm(100, 50, { low: 90 }))
 * // => maybe: 143.11557161592685 95.05143199643211 103.90352980637562,...
 *
 * console.log(randNorm(100, 50, { low: 90, up: 110 }))
 * // => maybe: 99.45744560964987 95.98664948248341 95.69403830457458,...
 *
 * console.log(randNorm(0, 1, { num: 5 }))
 * // => maybe: [
 * //   0.28480054449658343,
 * //   -1.6656082612520913,
 * //   -1.4973558587107332,
 * //   0.9279728382322514,
 * //   0.4704840133724234
 * // ]
 *
 */
function randNorm(mu = 0, sigma = 1, opt = {}) {

    //check mu
    if (!isnum(mu)) {
        mu = 0
    }
    mu = cdbl(mu)

    //check sigma
    if (!isnum(sigma)) {
        sigma = 1
    }
    sigma = cdbl(sigma)
    if (sigma < 0) {
        sigma = 0
    }

    //low
    let low = get(opt, 'low')
    if (!isnum(low)) {
        low = null
    }
    else {
        low = cdbl(low)
    }

    //up
    let up = get(opt, 'up')
    if (!isnum(up)) {
        up = null
    }
    else {
        up = cdbl(up)
    }

    //check low>=up
    if (low !== null && up !== null) {
        if (low >= up) {
            throw new Error(`low[${low}] >= up[${up}]`)
        }
    }

    //num
    let num = get(opt, 'num')
    num = cint(num)
    if (num <= 0) {
        num = 1
    }

    //rm
    let rm = randNormCore(mu, sigma)

    //getNum
    let getNum = () => {
        let r = rm()
        if (low !== null) {
            if (r < low) {
                r = getNum()
            }
        }
        if (up !== null) {
            if (r > up) {
                r = getNum()
            }
        }
        return r
    }

    //rs
    let rs = map(times(num), () => {
        return getNum()
    })
    if (num === 1) {
        rs = rs[0]
    }

    return rs
}


export default randNorm
