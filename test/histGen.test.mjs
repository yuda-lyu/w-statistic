import assert from 'assert'
import arrAverage from '../src/arrAverage.mjs'
import arrStd from '../src/arrStd.mjs'
import histGen from '../src/histGen.mjs'


describe(`histGen`, function() {

    let k
    let kpArr = {}
    let kpOpt = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    kpOpt[k] = {
        n: 10,
        min: 12,
        max: 23,
    }
    kpOut[k] = {
        counts: [
            5, 7, 11, 15, 19,
            12, 7, 6, 7, 3
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, fun, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 0
        let r = await histGen(kpArr[k], (params) => {
            // console.log('params', params)
            let avg = arrAverage(params.arr)
            let std = arrStd(params.arr)
            let ry = (std * Math.sqrt(2 * Math.PI))
            let curveY = params.curveX.map((x) => {
                let y = 0
                if (ry !== 0) {
                    y = 1 / ry * Math.exp(-((x - avg) ** 2) / (2 * std ** 2))
                }
                return y
            })
            return curveY
        }, kpOpt[k])
        r = r.counts
        let rr = kpOut[k]
        rr = rr.counts
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    kpArr[k] = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    kpOpt[k] = {
        dx: 1,
    }
    kpOut[k] = {
        counts: [
            1, 2, 0, 2, 5, 6, 11,
            7, 17, 12, 13, 5, 8, 6,
            2, 0, 3
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, fun, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 1
        let r = await histGen(kpArr[k], (params) => {
            // console.log('params', params)
            let avg = arrAverage(params.arr)
            let std = arrStd(params.arr)
            let ry = (std * Math.sqrt(2 * Math.PI))
            let curveY = params.curveX.map((x) => {
                let y = 0
                if (ry !== 0) {
                    y = 1 / ry * Math.exp(-((x - avg) ** 2) / (2 * std ** 2))
                }
                return y
            })
            return curveY
        }, kpOpt[k])
        r = r.counts
        let rr = kpOut[k]
        rr = rr.counts
        assert.strict.deepStrictEqual(r, rr)
    })

})
