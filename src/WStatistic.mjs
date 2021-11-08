// import * as _mathjs from 'mathjs'
// import d3 from 'd3'
// import * as _d3random from 'd3-random'
import wd from 'w-distributions'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import mean from 'lodash/mean'
import each from 'lodash/each'
import map from 'lodash/map'
import min from 'lodash/min'
import max from 'lodash/max'
import sum from 'lodash/sum'
import size from 'lodash/size'
import filter from 'lodash/filter'
import times from 'lodash/times'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import cloneDeep from 'lodash/cloneDeep'
// import arrAt from 'wsemi/src/arrAt.mjs'
import sep from 'wsemi/src/sep.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import cstr from 'wsemi/src/cstr.mjs'
import cint from 'wsemi/src/cint.mjs'
import isnum from 'wsemi/src/isnum.mjs'
// import isfun from 'wsemi/src/isfun.mjs'
import isestr from 'wsemi/src/isestr.mjs'
// import ispint from 'wsemi/src/ispint.mjs'
import isp0int from 'wsemi/src/isp0int.mjs'
import isbol from 'wsemi/src/isbol.mjs'
import isearr from 'wsemi/src/isearr.mjs'
// import dig from 'wsemi/src/dig.mjs'
import { arrFilterByPnum, arrFilterByPnumAndToLog } from './mShare.mjs'
import ss from './simpleStatistics.mjs'


function arrMovingAverage(arr, opt = {}) {

    //iCountHalf, 上下取點數, 總取點數為2*iCountHalf+1, +1為自己
    let iCountHalf = get(opt, 'iCountHalf')
    if (!isp0int(iCountHalf)) {
        iCountHalf = 2
    }
    iCountHalf = cint(iCountHalf)

    //n
    let n = size(arr)

    //check
    if (n === 0) {
        return []
    }

    //rs
    let rs = cloneDeep(arr)

    //average
    each(arr, (v, k) => {

        //kStart, kEnd
        let kStart = k - iCountHalf
        kStart = Math.max(kStart, 0)
        kStart = Math.min(kStart, n - 1)
        let kEnd = Math.max(k + iCountHalf, 0)
        kEnd = Math.max(kEnd, 0)
        kEnd = Math.min(kEnd, n - 1)

        //arrt
        let arrt = []
        for (let i = kStart; i <= kEnd; i++) {
            arrt.push(v)
        }

        //average
        let avg = average(arrt)

        //save
        rs[k] = avg

    })

    return rs
}


function ltdtMovingAverage(ltdt, key, opt = {}) {

    //iCountHalf, 上下取點數, 總取點數為2*iCountHalf+1, +1為自己
    let iCountHalf = get(opt, 'iCountHalf')
    if (!isp0int(iCountHalf)) {
        iCountHalf = 2
    }
    iCountHalf = cint(iCountHalf)

    //check
    if (size(ltdt) === 0) {
        return []
    }
    if (!isestr(key)) {
        return []
    }

    //arr
    let arr = map(ltdt, key)

    //arrMovingAverage
    arr = arrMovingAverage(arr, { iCountHalf })

    //rs
    let rs = cloneDeep(ltdt)

    //save
    rs = map(rs, (v, k) => {
        v[key] = arr[k]
        return v
    })

    return rs
}


function geometricStd(arr) {

    //取大於0且轉log數值
    let rs = arrFilterByPnumAndToLog(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        // throw new Error('無有效數據')
        return null
    }

    //check
    if (n <= 1) {
        // throw new Error('至少要2點才能計算')
        return null
    }

    //r
    // let r = 0
    // each(rs, (v) => {
    //     r += (Math.log(v / geoAvg)) ** 2
    // })
    // r /= (n - 1)
    // r = Math.sqrt(r)
    // r = Math.exp(r)
    let sigma = std(rs) //sigma為樣本標準差(用n-1)
    let r = Math.exp(sigma)

    return r
}


function quartileLow(arr) {

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check
    if (size(arr) === 0) {
        return null
    }

    return ss.quantile(arr, 0.25)
}


function quartileHigh(arr) {

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check
    if (size(arr) === 0) {
        return null
    }

    return ss.quantile(arr, 0.75)
}


function quartile(arr, ratio) {

    //check
    if (!isNumber(ratio)) {
        throw new Error('ratio is not a number')
    }

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check
    if (size(arr) === 0) {
        return null
    }

    return ss.quantile(arr, ratio)
}


function median(arr) {

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check
    if (size(arr) === 0) {
        return null
    }

    return ss.quantile(arr, 0.5)
}


async function normalQuartile(arr, ratio) {

    //check
    if (!isNumber(ratio)) {
        return Promise.reject('ratio is not a number')
    }

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //n
    let n = size(arr)

    //check
    if (n === 0) {
        return null
    }

    //check, 若只有1組數據則使用quartile, 否則會無標準差可計算
    if (n === 1) {
        // console.log('arr', arr, 'ratio', ratio)
        return quartile(arr, ratio)
    }

    //check, 若有2組數據但實際上是相同值, 代表可能是外部重複數據避免無法計算, 但標準差還是會為0無法通過wd.Normal計算, 故得還原成使用quartile
    if (n === 2 && arr[0] === arr[1]) {
        // console.log('arr', arr, 'ratio', ratio)
        return quartile(arr, ratio)
    }

    //avg, sigma
    let avg = average(arr)
    let sigma = std(arr) //sigma為樣本標準差(用n-1)
    // console.log('avg', avg, 'sigma', sigma)

    //check
    if (avg === null || sigma === null) {
        return null
    }

    //check, 計算wd.Normal時標準差不能小於等於0
    if (sigma <= 0) {
        return null
    }

    // //Normal
    // let normal3_0025 = await wd.Normal(2.947834716, 0.025418535) //mean=2.947834716,std deviation=0.025418535
    // let r = normal3_0025.inv(0.25)
    // console.log(`normal3_0025.inv(0.25)`, r)
    // // => 2.9306901746775

    //r, 等同於Excel的r=NORM.INV(p,mean,std)
    let nm = await wd.Normal(avg, sigma)
    let r = nm.inv(ratio)

    return r
}


async function logNormalQuartile(arr, ratio) {

    //check
    if (!isNumber(ratio)) {
        return Promise.reject('ratio is not a number')
    }

    //取大於0數值
    let rs = arrFilterByPnum(arr)
    // console.log('arrFilterByPnum', rs)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        // throw new Error('無有效數據')
        return null
    }

    //log
    rs = map(rs, Math.log)
    // console.log('map log', rs)

    //normalQuartile
    let r = await normalQuartile(rs, ratio)

    //check
    if (r === null) {
        return null
    }

    //exp
    r = Math.exp(r)

    return r
}


async function ciAverage(arr, opt = {}) {

    //p, 信賴水準(%)
    let p = get(opt, 'p')
    if (!isNumber(p)) {
        p = 95
    }
    p /= 100 //轉成比率(0至1之間)

    //mode
    let mode = get(opt, 'mode')
    if (!isestr(mode)) {
        mode = '右單尾'
    }

    //useGeometric
    let useGeometric = get(opt, 'useGeometric')
    if (!isbol(useGeometric)) {
        useGeometric = false
    }

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //n
    let n = size(arr)

    //check
    if (n === 0) {
        return null
    }

    async function core(n, p) {
        // let studentt = await wd.Studentt(34) //degrees of freedom=34
        // r = studentt.inv(0.95) //one or two sided test p-values=0.95
        // console.log(r)
        // // => 1.6909242551868549

        let df = n - 1 //degrees of freedom為自由度, 為樣本數n-1
        let studentt = await wd.Studentt(df)
        let r = studentt.inv(p) //one or two sided test p-values

        return r
    }

    //avg, sigma
    let avg = null
    let sigma = null
    if (!useGeometric) {
        avg = average(arr)
        sigma = std(arr) //sigma為樣本標準差(用n-1)
    }
    else {
        console.log('此模式計算不合理，建議不要使用')
        avg = geometricAverage(arr)
        // sigma = geometricStd(arr) //sigma為樣本標準差(用n-1)
        sigma = std(arr) //sigma為樣本標準差(用n-1) //GIR一期標準差不是用幾何標準差
    }

    //check
    if (avg === null || sigma === null) {
        return null
    }

    //r
    let r = null
    if (mode === '右單尾' || mode === '左單尾') {

        //tav
        let tav = await core(n, p) //單尾

        //r
        if (mode === '右單尾') {
            r = avg + tav * sigma / Math.sqrt(n)
        }
        else { //左單尾
            r = avg - tav * sigma / Math.sqrt(n)
        }

    }

    else { //雙尾

        //tav
        let tav = await core(n, p / 2) //雙尾

        //r
        let r1 = avg - tav * sigma / Math.sqrt(n)
        let r2 = avg + tav * sigma / Math.sqrt(n)
        r = [r1, r2]

    }

    return r
}


async function ciGeometricAverage(arr, opt = {}) {

    //取大於0且轉log數值
    let rs = arrFilterByPnumAndToLog(arr)

    //n
    let n = size(rs)

    //check
    if (n === 0) {
        // throw new Error('無有效數據')
        return null
    }

    //check
    if (n <= 1) {
        // throw new Error('至少要2點才能計算')
        return null
    }

    //ciAverage
    let r = await ciAverage(rs, opt)

    if (r === null) {
        return r
    }
    else if (isNumber(r)) {
        return Math.exp(r)
    }
    else if (isearr(r) && size(r) === 2) {
        return [Math.exp(r[0]), Math.exp(r[1])]
    }
    else {
        console.log('ciAverage r', r)
        return Promise.reject('ciAverage計算結果非預期')
    }
}


function randomNormalCore(mu = 0, sigma = 1) {
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


function randomNormal(mu = 0, sigma = 1, opt = {}) {

    //low
    let low = get(opt, 'low')
    if (!isNumber(low)) {
        low = null
    }

    //up
    let up = get(opt, 'up')
    if (!isNumber(up)) {
        up = null
    }

    //num
    let num = get(opt, 'num')
    num = cint(num)
    if (num <= 0) {
        num = 1
    }

    //rm
    let rm = randomNormalCore(mu, sigma)

    function getNum() {
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


function rang(rStart, rEnd, num = 2) {

    //check rStart
    if (!isnum(rStart)) {
        throw new Error('rStart is not a number')
    }
    rStart = cdbl(rStart)

    //check rEnd
    if (!isnum(rEnd)) {
        throw new Error('rEnd is not a number')
    }
    rEnd = cdbl(rEnd)

    //check num
    if (!isnum(num)) {
        num = 2
    }
    num = cint(num)
    if (num < 2) {
        //throw new Error('num need to >= 2')
        num = 2
    }

    //dx
    let dx = (rEnd - rStart) / (num - 1)

    let r = rStart
    let rs = []
    rs.push(rStart)
    for (let i = 1; i <= num; i++) {
        r += dx
        rs.push(r)
    }

    return rs
}


function bin(arr, dx = 1) {

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check arr
    if (size(arr) === 0) {
        return []
    }

    //check dx
    if (!isnum(dx)) {
        dx = 1
    }
    dx = cdbl(dx)
    if (dx <= 0) {
        throw new Error('dx <= 0')
    }

    //rini
    let rmin = min(arr)
    let rmax = max(arr)
    let rminabs = Math.abs(rmin)
    let q = Math.floor(rminabs / dx)
    let rini = null
    if (rmin < 0) {
        rini = -(q + 1) * dx
    }
    else {
        rini = q * dx
    }
    rini -= dx / 2

    //rs,re
    let rs = rini
    let re = rini + dx
    // console.log('rs', rs, 're', re)

    //ranges
    let ranges = []
    // let i = 0
    while (true) {
        // i++
        // if (i > 20) { //原本20太少
        //     break
        // }
        ranges.push({
            rs,
            re,
        })
        rs += dx
        re += dx
        if (rs > rmax) {
            break
        }
    }

    //bs
    let bs = []
    let eff = false
    each(ranges, (range, krange) => {

        //arrt
        let arrt = []
        each(arr, (v) => {
            let bs = v >= range.rs
            let be = v < range.re
            if (krange === size(ranges) - 1) {
                be = v <= range.re
            }
            if (bs && be) {
                arrt.push(v)
            }
        })

        //eff
        if (eff === false && size(arrt) > 0) {
            eff = true
        }

        //push
        if (eff) {
            bs.push({
                arr: arrt,
                x0: range.rs,
                x1: range.re,
            })
        }

    })

    return bs
}


function hist(arr, opt) {

    //useGeometric
    let useGeometric = get(opt, 'useGeometric')
    if (!isbol(useGeometric)) {
        useGeometric = false
    }

    //arr
    arr = filter(arr, (v) => {
        return isnum(v)
    })
    arr = map(arr, cdbl)

    //check
    if (size(arr) <= 1) {
        console.log(arr)
        throw new Error('length of arr <= 1')
    }

    //rmin, rmax
    let rmin = min(arr)
    let rmax = max(arr)
    // console.log('rmax', rmax, 'rmin', rmin)

    //dx
    let dx = get(opt, 'dx', null)
    if (!isnum(dx)) {
        //dx = Math.floor((rmax - rmin) / 30) //預設切30個
        dx = (rmax - rmin) / 30 //預設切30個
        dx = dx.toExponential(1)
        let s = sep(dx, 'e')
        let v = cdbl(get(s, 0))
        let i = cdbl(get(s, 1))
        dx = v * 10 ** i
    }
    dx = cdbl(dx)
    // console.log('dx', dx)

    //bs
    let bs = bin(arr, dx)

    //barMin, barMax
    let barMin = get(bs, `0.x0`, null)
    let barMax = get(bs, `${size(bs) - 1}.x1`, null)

    //chech
    if (barMin === null) {
        console.log(bs, barMin)
        throw new Error('barMin is null')
    }
    if (barMax === null) {
        console.log(bs, barMax)
        throw new Error('barMax is null')
    }

    //bins
    let bins = map(bs, (v) => {
        return (v.x0 + v.x1) / 2
    })

    //counts
    let counts = map(bs, (v) => {
        return size(v.arr)
    })

    //r
    let r = sum(counts) * dx //dx大於0, 一定為有效陣列, r必定>0

    //pdfs
    let pdfs = map(counts, (v) => {
        return v / r //r必定>0不用檢核
    })

    //avg, sigma
    let avg = null
    let sigma = null
    if (!useGeometric) {
        avg = average(arr)
        sigma = std(arr) //sigma為樣本標準差(用n-1)
    }
    else {
        avg = geometricAverage(arr)
        // sigma = geometricStd(arr) //sigma為樣本標準差(用n-1)
        sigma = std(arr) //sigma為樣本標準差(用n-1) //GIR一期標準差不是用幾何標準差
    }

    //check
    if (avg === null || sigma === null) {
        return null
    }

    //curveX, curveY
    let curveX = rang(barMin, barMax, 100)
    let ry = (sigma * Math.sqrt(2 * Math.PI))
    let curveY = map(curveX, (x) => {
        let y = 0
        if (ry !== 0) {
            y = 1 / ry * Math.exp(-((x - avg) ** 2) / (2 * sigma ** 2))
        }
        return y
    })
    // console.log('arr', arr)
    // console.log('avg', avg)
    // console.log('sigma', sigma)
    // console.log('counts', counts)
    // console.log('curveX', curveX)
    // console.log('curveY', curveY)

    return {
        // arr,
        // avg,
        // sigma,
        barMin,
        barMax,
        barWidth: dx,
        bins,
        counts,
        pdfs,
        curveX,
        curveY,
        ratioForCountToPdf: 1 / r,
    }
}


async function estimate(ps, method) {

    //ps
    ps = filter(ps, (v) => {
        return isnum(v)
    })
    ps = map(ps, cdbl)

    //check
    if (size(ps) === 0) {
        return null
    }

    //method
    if (method === 'quartileLow') {
        return quartileLow(ps)
    }
    else if (method === 'quartileHigh') {
        return quartileHigh(ps)
    }
    else if (method.indexOf('quartile') >= 0) {
        let r = method.replace('quartile', '')
        if (isnum(r)) {
            r = cdbl(r)
            r /= 100 //由百分比轉為比率
        }
        return quartile(ps, r)
    }
    else if (method.indexOf('normalQuartile') >= 0) {
        let r = method.replace('normalQuartile', '')
        if (isnum(r)) {
            r = cdbl(r)
            r /= 100 //由百分比轉為比率
        }
        return await normalQuartile(ps, r)
    }
    else if (method.indexOf('logNormalQuartile') >= 0) {
        let r = method.replace('logNormalQuartile', '')
        if (isnum(r)) {
            r = cdbl(r)
            r /= 100 //由百分比轉為比率
        }
        return await logNormalQuartile(ps, r)
    }
    else if (method === 'average') {
        return average(ps)
    }
    else if (method === 'geometricAverage') {
        return geometricAverage(ps)
    }
    else if (method === 'median') {
        return median(ps)
    }
    else if (method === 'ciAverageR') {
        return await ciAverage(ps, { mode: '右單尾' })
    }
    else if (method === 'ciAverageL') {
        return await ciAverage(ps, { mode: '左單尾' })
    }
    else if (method === 'ciGeometricAverageR') {
        // return await ciAverage(ps, { mode: '右單尾', useGeometric: true })
        // let r1 = await ciAverage(ps, { mode: '右單尾', useGeometric: true })
        // let r2 = await ciGeometricAverage(ps, { mode: '右單尾' })
        // console.log('ciGeometricAverageR', r1, r2)
        // return r1
        return await ciGeometricAverage(ps, { mode: '右單尾' })
    }
    else if (method === 'ciGeometricAverageL') {
        // return await ciAverage(ps, { mode: '左單尾', useGeometric: true })
        return await ciGeometricAverage(ps, { mode: '左單尾' })
    }
    else {
        // throw new Error('invalid method')
        return Promise.reject('invalid method')
    }

}


function regLine(ps, opt = {}) {
    //y=mx+b

    //interpX
    let interpX = get(opt, 'interpX')
    if (!isNumber(interpX)) {
        interpX = null
    }

    //useRegIntercept, 是否回歸使用截距
    let useRegIntercept = get(opt, 'useRegIntercept')
    if (!isbol(useRegIntercept)) {
        useRegIntercept = true
    }

    //psNew
    let psNew = []
    each(ps, (v) => {
        let x = get(v, 0)
        let y = get(v, 1)
        if (isnum(x) && isnum(y)) {
            psNew.push([cdbl(x), cdbl(y)])
        }
    })
    // console.log('psNew', psNew)

    //check
    if (size(ps) === 0) {
        return null
    }

    //feq
    let feq = null

    //useRegIntercept
    if (!useRegIntercept) {

        //無截距算斜率m
        let sumx2 = 0
        let sumxy = 0
        each(ps, (v) => {
            sumx2 += v[0] ** 2
            sumxy += v[0] * v[1]
        })
        let m = null
        if (sumx2 !== 0) {
            m = sumxy / sumx2
        }
        feq = {
            m,
            b: 0,
        }
        // console.log('feq(no b)', feq)

    }
    else {

        //linearRegression
        feq = ss.linearRegression(ps)
        // console.log('feq', feq)

    }

    //interpX
    if (isNumber(interpX)) {
        let interpY = ss.linearRegressionLine(feq)(interpX)
        feq.interpY = interpY
    }

    return feq
}


function regPowerLine(ps, opt = {}) {
    //y=ax^b

    //interpX
    let interpX = get(opt, 'interpX')
    if (!isNumber(interpX)) {
        interpX = null
    }

    //psNew
    let psNew = []
    each(ps, (v) => {
        let x = get(v, 0)
        let y = get(v, 1)
        if (isnum(x) && isnum(y)) {
            x = cdbl(x)
            y = cdbl(y)
            if (x > 0 && y > 0) {
                psNew.push([x, y]) //會使用log(x)與log(y)故需大於0
            }
        }
    })
    // console.log('psNew', psNew)

    //check
    if (size(ps) === 0) {
        return null
    }

    //logPs
    let logPs = map(ps, (v) => {
        return [Math.log(v[0]), Math.log(v[1])]
    })

    //regLine
    let rgl = regLine(logPs, { useRegIntercept: true }) //要使用截距

    //feq
    let feq = {
        a: Math.exp(rgl.b),
        b: rgl.m,
    }

    //interpX
    if (isNumber(interpX)) {
        let interpY = feq.a * (interpX ** feq.b)
        feq.interpY = interpY
    }

    return feq
}


export {

    arrFilterByPnum,
    arrFilterByPnumAndToLog,

    average,
    ltdtAverage,
    geometricAverage,
    ltdtCount,

    arrMovingAverage,
    ltdtMovingAverage,

    std,
    geometricStd,
    quartileLow,
    quartileHigh,
    median,
    normalQuartile,
    logNormalQuartile,

    ciAverage,
    ciGeometricAverage,

    randomNormal,
    rang,
    bin,
    hist,

    estimate,

    regLine,
    regPowerLine

}
