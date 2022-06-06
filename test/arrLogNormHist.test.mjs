import assert from 'assert'
import arrLogNormHist from '../src/arrLogNormHist.mjs'


describe(`arrLogNormHist`, function() {

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
            { x: 8.9, pdf: 0.0003700715564882641 },
            { x: 8.990947415368343, pdf: 0.0004371517692405818 },
            { x: 9.082824205159403, pdf: 0.0005149975464899293 },
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 0
        let r = await arrLogNormHist(kpArr[k], kpOpt[k])
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
            { x: 8.9, pdf: 0.00037451241516612313 },
            { x: 8.990947415368343, pdf: 0.0004423975904714686 },
            { x: 9.082824205159403, pdf: 0.0005211775170478083 },
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 1
        let r = await arrLogNormHist(kpArr[k], kpOpt[k])
        r = [r.curves[0], r.curves[1], r.curves[2]]
        let rr = kpOut[k]
        rr = rr.curves3
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    kpArr[k] = [12, 36, 9, 13, 6, 17, 7, 12, 31, 57, 44, 32, 16, 11, 10, 38, 31, 28, 26, 7, 16, 16, 16, 13, 7, 8, 12, 17, 11, 20, 7, 6, 14, 7, 37, 11, 7, 8, 8, 32, 29, 52, 20, 6, 11, 12, 33, 48, 10, 27, 11, 24, 17, 11, 23, 20, 13, 16, 16, 17, 13, 15, 13, 26, 11, 13, 29, 18, 18, 13, 11, 12, 9, 17, 19, 14, 19, 9, 37, 32, 14, 20, 13, 22, 12, 14, 33, 15, 20, 37, 24, 19, 15, 15, 5, 11, 13, 60, 39, 17, 6, 18, 40, 21, 18, 17, 12, 12, 10, 39, 27, 10, 8, 44, 36, 18, 11, 8, 13, 9, 25, 11, 10, 55, 54, 13, 8, 19, 38, 9, 17, 14, 9, 12, 54, 22, 11, 19, 50, 18, 12, 40, 52, 12, 15, 7, 12, 15, 18, 19, 11, 43, 23, 14, 25, 32, 23, 15, 12, 20, 14, 10, 12, 24, 50, 40, 16, 14, 9, 27, 9, 11, 17, 19, 12, 17, 14, 5, 24, 22, 60, 20, 9, 11, 11, 6, 7, 8, 31, 10, 12, 9, 11, 26, 14, 7, 14, 57, 19, 9, 10, 9, 19, 19, 15, 21, 48, 23, 26, 14, 46, 51, 10, 10, 9, 7, 19, 46, 27, 18, 12, 10, 36, 15, 5, 11, 13, 21, 15, 15, 16, 29, 44, 42, 7, 14, 9, 6, 22, 24, 18, 39, 7, 50, 33, 11, 20, 17, 18, 48, 8, 21, 20, 12, 41, 11, 18, 11, 58, 18, 21, 23, 12, 67, 35]
    kpOpt[k] = {
        n: 69,
        min: 1,
        max: 70,
    }
    kpOut[k] = {
        curves3: [
            { x: 5, pdf: 0.006970263647771901 },
            { x: 5.1314612337167205, pdf: 0.007627449421952031 },
            { x: 5.266378878627506, pdf: 0.008330340805749705 },
        ],
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, ${JSON.stringify(kpOpt[k])}`, async function() {
        let k = 2
        let r = await arrLogNormHist(kpArr[k], kpOpt[k])
        r = [r.curves[0], r.curves[1], r.curves[2]]
        let rr = kpOut[k]
        rr = rr.curves3
        assert.strict.deepStrictEqual(r, rr)
    })

})
