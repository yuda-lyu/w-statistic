import get from 'lodash-es/get'
import map from 'lodash-es/map'
import times from 'lodash-es/times'
import isNumber from 'lodash-es/isNumber'
import isnum from 'wsemi/src/isnum.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import cint from 'wsemi/src/cint.mjs'
import jt from './jStat.mjs'


/**
 * 依照指定統計分布隨機產生值或陣列
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/sampleRandom.test.js Github}
 * @memberOf w-statistic
 * @param {String} name 輸入統計分布名稱
 * @param {Object} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.num=1] 輸入產生亂數數量整數，若有給予需大於等於1，預設1
 * @param {Number} [opt.low=null] 輸入亂數之最小限制值數字，預設null
 * @param {Number} [opt.up=null] 輸入亂數之最大限制值數字，預設null
 * @returns {Number|Array} 回傳亂數值或亂數值陣列
 * @example
 *
 * async function test() {
 *
 *     let r
 *
 *     r = await sampleRandom('normal', { mu: 100, sigma: 50 })
 *     console.log(r)
 *     // => maybe: 94.99873795683716 136.81783120735003 49.94186751166804,...
 *
 *     r = await sampleRandom('normal', { mu: 100, sigma: 50, low: 90 })
 *     console.log(r)
 *     // => maybe: 143.11557161592685 95.05143199643211 103.90352980637562,...
 *
 *     r = await sampleRandom('normal', { mu: 100, sigma: 50, low: 90, up: 110 })
 *     console.log(r)
 *     // => maybe: 99.45744560964987 95.98664948248341 95.69403830457458,...
 *
 *     r = await sampleRandom('normal', { mu: 0, sigma: 1, num: 5 })
 *     console.log(r)
 *     // => maybe: [
 *     //   0.28480054449658343,
 *     //   -1.6656082612520913,
 *     //   -1.4973558587107332,
 *     //   0.9279728382322514,
 *     //   0.4704840133724234
 *     // ]
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function sampleRandom(name, opt = {}) {

    //fun, sample
    let fun = null
    if (name === 'beta') {
        let alpha = get(opt, 'alpha')
        if (!isNumber(alpha)) {
            return Promise.reject(`opt.alpha is not a number`)
        }
        let beta = get(opt, 'beta')
        if (!isNumber(beta)) {
            return Promise.reject(`opt.beta is not a number`)
        }
        fun = () => {
            return jt[name].sample(alpha, beta)
        }
    }
    else if (name === 'centralF') {
        let df1 = get(opt, 'df1')
        if (!isNumber(df1)) {
            return Promise.reject(`opt.df1 is not a number`)
        }
        let df2 = get(opt, 'df2')
        if (!isNumber(df2)) {
            return Promise.reject(`opt.df2 is not a number`)
        }
        fun = () => {
            return jt[name].sample(df1, df2)
        }
    }
    else if (name === 'cauchy') {
        let local = get(opt, 'local')
        if (!isNumber(local)) {
            return Promise.reject(`opt.local is not a number`)
        }
        let scale = get(opt, 'scale')
        if (!isNumber(scale)) {
            return Promise.reject(`opt.scale is not a number`)
        }
        fun = () => {
            return jt[name].sample(local, scale)
        }
    }
    else if (name === 'chisquare') {
        let dof = get(opt, 'dof')
        if (!isNumber(dof)) {
            return Promise.reject(`opt.dof is not a number`)
        }
        fun = () => {
            return jt[name].sample(dof)
        }
    }
    else if (name === 'exponential') {
        let rate = get(opt, 'rate')
        if (!isNumber(rate)) {
            return Promise.reject(`opt.rate is not a number`)
        }
        fun = () => {
            return jt[name].sample(rate)
        }
    }
    else if (name === 'gamma') {
        let shape = get(opt, 'shape')
        if (!isNumber(shape)) {
            return Promise.reject(`opt.shape is not a number`)
        }
        let scale = get(opt, 'scale')
        if (!isNumber(scale)) {
            return Promise.reject(`opt.scale is not a number`)
        }
        fun = () => {
            return jt[name].sample(shape, scale)
        }
    }
    else if (name === 'invgamma') {
        let shape = get(opt, 'shape')
        if (!isNumber(shape)) {
            return Promise.reject(`opt.shape is not a number`)
        }
        let scale = get(opt, 'scale')
        if (!isNumber(scale)) {
            return Promise.reject(`opt.scale is not a number`)
        }
        fun = () => {
            return jt[name].sample(shape, scale)
        }
    }
    else if (name === 'kumaraswamy') {
        let alpha = get(opt, 'alpha')
        if (!isNumber(alpha)) {
            return Promise.reject(`opt.alpha is not a number`)
        }
        let beta = get(opt, 'beta')
        if (!isNumber(beta)) {
            return Promise.reject(`opt.beta is not a number`)
        }
        fun = () => {
            return jt[name].sample(alpha, beta)
        }
    }
    else if (name === 'lognormal') {
        let mu = get(opt, 'mu')
        if (!isNumber(mu)) {
            return Promise.reject(`opt.mu is not a number`)
        }
        let sigma = get(opt, 'sigma')
        if (!isNumber(sigma)) {
            return Promise.reject(`opt.sigma is not a number`)
        }
        fun = () => {
            return jt[name].sample(mu, sigma)
        }
    }
    else if (name === 'normal') {
        let mu = get(opt, 'mu')
        if (!isNumber(mu)) {
            return Promise.reject(`opt.mu is not a number`)
        }
        let sigma = get(opt, 'sigma')
        if (!isNumber(sigma)) {
            return Promise.reject(`opt.sigma is not a number`)
        }
        fun = () => {
            return jt[name].sample(mu, sigma)
        }
    }
    else if (name === 'pareto') {
        return Promise.reject(`invalid pareto.sample`)
    }
    else if (name === 'studentt') {
        let dof = get(opt, 'dof')
        if (!isNumber(dof)) {
            return Promise.reject(`opt.dof is not a number`)
        }
        fun = () => {
            return jt[name].sample(dof)
        }
    }
    else if (name === 'tukey') {
        return Promise.reject(`invalid tukey.sample`)
    }
    else if (name === 'weibull') {
        let scale = get(opt, 'scale')
        if (!isNumber(scale)) {
            return Promise.reject(`opt.scale is not a number`)
        }
        let shape = get(opt, 'shape')
        if (!isNumber(shape)) {
            return Promise.reject(`opt.shape is not a number`)
        }
        fun = () => {
            return jt[name].sample(scale, shape)
        }
    }
    else if (name === 'uniform') {
        let a = get(opt, 'a')
        if (!isNumber(a)) {
            return Promise.reject(`opt.a is not a number`)
        }
        let b = get(opt, 'b')
        if (!isNumber(b)) {
            return Promise.reject(`opt.b is not a number`)
        }
        fun = () => {
            return jt[name].sample(a, b)
        }
    }
    else if (name === 'binomial') {
        return Promise.reject(`invalid binomial.sample`)
    }
    else if (name === 'negbin') {
        return Promise.reject(`invalid negbin.sample`)
    }
    else if (name === 'hypgeom') {
        return Promise.reject(`invalid hypgeom.sample`)
    }
    else if (name === 'poisson') {
        let l = get(opt, 'l')
        if (!isNumber(l)) {
            return Promise.reject(`opt.l is not a number`)
        }
        fun = () => {
            return jt[name].sample(l)
        }
    }
    else if (name === 'triangular') {
        let a = get(opt, 'a')
        if (!isNumber(a)) {
            return Promise.reject(`opt.a is not a number`)
        }
        let b = get(opt, 'b')
        if (!isNumber(b)) {
            return Promise.reject(`opt.b is not a number`)
        }
        let c = get(opt, 'c')
        if (!isNumber(c)) {
            return Promise.reject(`opt.c is not a number`)
        }
        fun = () => {
            return jt[name].sample(a, b, c)
        }
    }
    else if (name === 'arcsine') {
        let a = get(opt, 'a')
        if (!isNumber(a)) {
            return Promise.reject(`opt.a is not a number`)
        }
        let b = get(opt, 'b')
        if (!isNumber(b)) {
            return Promise.reject(`opt.b is not a number`)
        }
        fun = () => {
            return jt[name].sample(a, b)
        }
    }
    else {
        return Promise.reject(`invalid name[${name}]`)
    }

    //num
    let num = get(opt, 'num')
    num = cint(num)
    if (num <= 0) {
        num = 1
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

    //getNum
    let getNum = () => {
        let r = fun()
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


export default sampleRandom
