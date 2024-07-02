import assert from 'assert'
import regPoly from '../src/regPoly.mjs'


describe(`regPoly`, function() {

    let k
    let kpArr = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2`, async function() {
        let k = 0
        let r = await regPoly(kpArr[k], 2)
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 21.051572327842386,
        m1: -0.7142872117740979,
        m2: 0.0087657232709057,
        m3: -0.000034014675054462467
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 3`, async function() {
        let k = 1
        let r = await regPoly(kpArr[k], 3)
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653,
        interpX: 80,
        interpY: 2.5474226804124473
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2, { interpX: 80 }`, async function() {
        let k = 2
        let r = await regPoly(kpArr[k], 2, { interpX: 80 })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 3
    kpArr[k] = [
        [50, 3.3], [50, 2.8],
        [50, 2.9], [70, 2.3],
        [70, 2.6], [70, 2.1],
        [80, 2.5], [80, 2.9],
        [80, 2.4], [90, 3],
        [90, 3.1], [90, 2.8],
        [100, 3.3], [100, 3.5],
        [100, 3]
    ]
    kpOut[k] = {
        b: 7.960481099654818,
        m1: -0.15371134020614285,
        m2: 0.0010756013745701653
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, 2, { useSync: true }`, async function() {
        let k = 3
        let r = await regPoly(kpArr[k], 2, { useSync: true })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input ''`, async function() {
        let r
        await regPoly('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input []`, async function() {
        let r
        await regPoly([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input {}`, async function() {
        let r
        await regPoly({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input null`, async function() {
        let r
        await regPoly(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input undefined`, async function() {
        let r
        await regPoly(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
