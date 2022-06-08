import assert from 'assert'
import regLine from '../src/regLine.mjs'


describe(`regLine`, function() {

    let k
    let kpArr = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { m: -0.6666666666666664, b: 3.0333333333333323 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 0
        let r = await regLine(kpArr[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    kpArr[k] = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    kpOut[k] = { m: 0.666666666666667, b: -0.3000000000000007 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 1
        let r = await regLine(kpArr[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    kpArr[k] = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    kpOut[k] = { m: 0.5698924731182796, b: 0 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { useRegIntercept: false }`, async function() {
        let k = 2
        let r = await regLine(kpArr[k], { useRegIntercept: false })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 3
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = {
        m: -0.6666666666666664,
        b: 3.0333333333333323,
        interpY: 1.6999999999999995
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { interpX: 2 }`, async function() {
        let k = 3
        let r = await regLine(kpArr[k], { interpX: 2 })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 4
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { m: -0.6666666666666664, b: 3.0333333333333323 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { useSync: true }`, async function() {
        let k = 4
        let r = regLine(kpArr[k], { useSync: true }) //不使用await
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })


    it(`should return null when input ''`, async function() {
        let r
        await regLine('')
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input []`, async function() {
        let r
        await regLine([])
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input {}`, async function() {
        let r
        await regLine({})
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input null`, async function() {
        let r
        await regLine(null)
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input undefined`, async function() {
        let r
        await regLine(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

})
