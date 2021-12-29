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

    //check num===2
    if(num===2){
return [rStart,rEnd]
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
        avg = arrAverage(arr)
        sigma = arrStd(arr) //sigma為樣本標準差(用n-1)
    }
    else {
        avg = arrGeometricAverage(arr)
        // sigma = geometricStd(arr) //sigma為樣本標準差(用n-1)
        sigma = arrStd(arr) //sigma為樣本標準差(用n-1) //GIR一期標準差不是用幾何標準差
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
    else if (method === 'arrAverage') {
        return arrAverage(ps)
    }
    else if (method === 'arrGeometricAverage') {
        return arrGeometricAverage(ps)
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
