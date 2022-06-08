import assert from 'assert'
import sampleRandom from '../src/sampleRandom.mjs'


describe(`sampleRandom`, function() {

    it(`should return number when input 'normal', { mu: 100, sigma: 50 }`, async () => {
        let r = await sampleRandom('normal', { mu: 100, sigma: 50 })
        let rr = r > -Infinity && r < Infinity
        assert.strict.deepStrictEqual(rr, true)
    })

    it(`should return number when input 'normal', { mu: 100, sigma: 50, low: 90 }`, async () => {
        let r = await sampleRandom('normal', { mu: 100, sigma: 50, low: 90 })
        let rr = r >= 90 && r < Infinity
        assert.strict.deepStrictEqual(rr, true)
    })

    it(`should return number when input 'normal', { mu: 100, sigma: 50, low: 90, up: 110 }`, async () => {
        let r = await sampleRandom('normal', { mu: 100, sigma: 50, low: 90, up: 110 })
        let rr = r >= 90 && r <= 110
        assert.strict.deepStrictEqual(rr, true)
    })


    it(`should return number when input 'normal', { mu: 0, sigma: 1, num: 5 }`, async () => {
        let r = await sampleRandom('normal', { mu: 0, sigma: 1, num: 5 })
        let rr = r.length === 5
        assert.strict.deepStrictEqual(rr, true)
    })

})
