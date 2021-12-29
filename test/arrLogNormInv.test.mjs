import assert from 'assert'
import arrLogNormInv from '../src/arrLogNormInv.mjs'


describe(`arrLogNormInv`, function() {

    it(`should return 16.096845206281877 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, async () => {
        let r = await arrLogNormInv([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = 16.096845206281877
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 27.201738017491444 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, async () => {
        let r = await arrLogNormInv([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = 27.201738017491444
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 45.96767513695641 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, async () => {
        let r = await arrLogNormInv([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = 45.96767513695641
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 1.0499093195835956 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrLogNormInv(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 1.0499093195835956
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 1.0499093195835956 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrLogNormInv(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 1.0499093195835956
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input ''`, async () => {
        let r
        await arrLogNormInv('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an effective array' when input []`, async () => {
        let r
        await arrLogNormInv([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input {}`, async () => {
        let r
        await arrLogNormInv({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input null`, async () => {
        let r
        await arrLogNormInv(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input undefined`, async () => {
        let r
        await arrLogNormInv(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
