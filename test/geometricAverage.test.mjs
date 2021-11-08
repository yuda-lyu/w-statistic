import assert from 'assert'
import geometricAverage from '../src/geometricAverage.mjs'


describe(`geometricAverage`, function() {

    it(`should return 1.0499093195835956 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = geometricAverage(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 1.0499093195835956
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 1.0499093195835956 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = geometricAverage(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 1.0499093195835956
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input ''`, function() {
        let r = geometricAverage('')
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input []`, function() {
        let r = geometricAverage([])
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input {}`, function() {
        let r = geometricAverage({})
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input null`, function() {
        let r = geometricAverage(null)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input undefined`, function() {
        let r = geometricAverage(undefined)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

})
