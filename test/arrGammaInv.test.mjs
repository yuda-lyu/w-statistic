import assert from 'assert'
import arrGammaInv from '../src/arrGammaInv.mjs'


describe(`arrGammaInv`, function() {

    let arr = [12, 36, 9, 13, 6, 17, 7, 12, 31, 57, 44, 32, 16, 11, 10, 38, 31, 28, 26, 7, 16, 16, 16, 13, 7, 8, 12, 17, 11, 20, 7, 6, 14, 7, 37, 11, 7, 8, 8, 32, 29, 52, 20, 6, 11, 12, 33, 48, 10, 27, 11, 24, 17, 11, 23, 20, 13, 16, 16, 17, 13, 15, 13, 26, 11, 13, 29, 18, 18, 13, 11, 12, 9, 17, 19, 14, 19, 9, 37, 32, 14, 20, 13, 22, 12, 14, 33, 15, 20, 37, 24, 19, 15, 15, 5, 11, 13, 60, 39, 17, 6, 18, 40, 21, 18, 17, 12, 12, 10, 39, 27, 10, 8, 44, 36, 18, 11, 8, 13, 9, 25, 11, 10, 55, 54, 13, 8, 19, 38, 9, 17, 14, 9, 12, 54, 22, 11, 19, 50, 18, 12, 40, 52, 12, 15, 7, 12, 15, 18, 19, 11, 43, 23, 14, 25, 32, 23, 15, 12, 20, 14, 10, 12, 24, 50, 40, 16, 14, 9, 27, 9, 11, 17, 19, 12, 17, 14, 5, 24, 22, 60, 20, 9, 11, 11, 6, 7, 8, 31, 10, 12, 9, 11, 26, 14, 7, 14, 57, 19, 9, 10, 9, 19, 19, 15, 21, 48, 23, 26, 14, 46, 51, 10, 10, 9, 7, 19, 46, 27, 18, 12, 10, 36, 15, 5, 11, 13, 21, 15, 15, 16, 29, 44, 42, 7, 14, 9, 6, 22, 24, 18, 39, 7, 50, 33, 11, 20, 17, 18, 48, 8, 21, 20, 12, 41, 11, 18, 11, 58, 18, 21, 23, 12, 67, 35]
    let opt = { n: 69, min: 1, max: 70 }
    it(`should return 14.297217114904852 when input ${JSON.stringify(arr)}, 0.5, ${JSON.stringify(opt)}`, async () => {
        let r = await arrGammaInv(arr, 0.5, opt)
        r = r.inv
        let rr = 14.297217114904852
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input ''`, async () => {
        let r
        await arrGammaInv('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an effective array' when input []`, async () => {
        let r
        await arrGammaInv([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input {}`, async () => {
        let r
        await arrGammaInv({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input null`, async () => {
        let r
        await arrGammaInv(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input undefined`, async () => {
        let r
        await arrGammaInv(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
