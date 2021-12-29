import assert from 'assert'
import randNorm from '../src/randNorm.mjs'


describe(`randNorm`, function() {

    it(`should return number when input undefined`, async () => {
        let r = await randNorm(undefined)
        let rr = r > -Infinity && r < Infinity
        assert.strict.deepStrictEqual(rr, true)
    })

    it(`should return number when input 100`, async () => {
        let r = await randNorm(100)
        let rr = r > -Infinity && r < Infinity
        assert.strict.deepStrictEqual(rr, true)
    })

    it(`should return number when input 100, 50`, async () => {
        let r = await randNorm(100, 50)
        let rr = r > -Infinity && r < Infinity
        assert.strict.deepStrictEqual(rr, true)
    })

    it(`should return number when input 100, 50, { low: 90 })`, async () => {
        let r = await randNorm(100, 50, { low: 90 })
        let rr = r >= 90 && r < Infinity
        assert.strict.deepStrictEqual(rr, true)
    })

    it(`should return number when input 100, 50, { low: 90, up: 110 })`, async () => {
        let r = await randNorm(100, 50, { low: 90, up: 110 })
        let rr = r >= 90 && r <= 110
        assert.strict.deepStrictEqual(rr, true)
    })


    it(`should return number when input 0, 1, { num: 5 }`, async () => {
        let r = await randNorm(0, 1, { num: 5 })
        let rr = r.length === 5
        assert.strict.deepStrictEqual(rr, true)
    })

})
