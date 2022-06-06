import assert from 'assert'
import arrNormInv from '../src/arrNormInv.mjs'


describe(`arrNormInv`, function() {

    it(`should return 22.47539788913989 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, async () => {
        let r = await arrNormInv([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = 22.47539788913989
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 33.18181818181818 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, async () => {
        let r = await arrNormInv([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = 33.18181818181818
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 43.88823847449647 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, async () => {
        let r = await arrNormInv([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = 43.88823847449647
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 1.4999999999999996 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrNormInv(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 1.4999999999999996
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 3.2999999999999994 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrNormInv(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 3.2999999999999994
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input ''`, async () => {
        let r
        await arrNormInv('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an effective array' when input []`, async () => {
        let r
        await arrNormInv([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input {}`, async () => {
        let r
        await arrNormInv({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input null`, async () => {
        let r
        await arrNormInv(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input undefined`, async () => {
        let r
        await arrNormInv(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
