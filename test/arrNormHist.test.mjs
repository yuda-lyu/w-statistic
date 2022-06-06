import assert from 'assert'
import arrNormHist from '../src/arrNormHist.mjs'


describe(`arrNormHist`, function() {

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
        curves3: [
            { x: 12, pdf: 0.03539347632001737 },
            { x: 12.11, pdf: 0.037383482855803 },
            { x: 12.219999999999999, pdf: 0.039437822053457874 },
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 0
        let r = await arrNormHist(kpArr[k], kpOpt[k])
        r = [r.curves[0], r.curves[1], r.curves[2]]
        let rr = kpOut[k]
        rr = rr.curves3
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    kpArr[k] = [13.8, 19.5, 16.7, 14.3, 17.5, 14.5, 12.6, 15.6, 8.9, 13.3, 17.1, 15, 16.3, 18.3, 18.7, 16.7, 20.9, 12.3, 22.3, 14.6, 20.1, 16.7, 16.8, 24.2, 21.2, 20.7, 18.6, 18.3, 15.9, 17.2, 18.8, 16.3, 20.5, 14.7, 17.5, 24.1, 14.6, 21.1, 17, 19.6, 21.2, 16, 16.5, 9.3, 16.2, 14.9, 16.3, 13.9, 18.4, 19.2, 24.6, 20.2, 12.8, 12.9, 14.1, 18.5, 13.4, 17.1, 9.9, 21.9, 19.6, 18.3, 19.7, 16.6, 21.7, 11.8, 15.9, 11.4, 14.3, 17.4, 16.4, 20.7, 18.6, 22, 17.9, 16.3, 15.4, 17.2, 17.3, 18.3, 16.8, 20.9, 15, 15.1, 18.6, 17.5, 14.7, 17.4, 13.8, 18.3, 17.2, 13.4, 12.5, 22.8, 18.6, 16.3, 16.1, 15.7, 20.8, 16.4]
    kpOpt[k] = {
        dx: 1,
    }
    kpOut[k] = {
        curves3: [
            { x: 8, pdf: 0.0021354972114315455 },
            { x: 8.17, pdf: 0.0024854553367063114 },
            { x: 8.34, pdf: 0.002884449034450822 },
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 1
        let r = await arrNormHist(kpArr[k], kpOpt[k])
        r = [r.curves[0], r.curves[1], r.curves[2]]
        let rr = kpOut[k]
        rr = rr.curves3
        assert.strict.deepStrictEqual(r, rr)
    })

})
