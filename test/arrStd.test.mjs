import assert from 'assert'
import arrStd from '../src/arrStd.mjs'


describe(`arrStd`, function() {

    it(`should return 5.985339231345682 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrStd(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 5.985339231345682
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 7.269456650947167 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrStd(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 7.269456650947167
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 40.84747350759926 when input [55, 68, 45, 78, 150, 241, 162, 156, 182, 125, 75, 89, 91, 95, 92, 65, 75, 85, 95, 105, 132, 120, 142, 110, 111, 130, 128, 130, 108, 109]`, function() {
        let r = arrStd([55, 68, 45, 78, 150, 241, 162, 156, 182, 125, 75, 89, 91, 95, 92, 65, 75, 85, 95, 105, 132, 120, 142, 110, 111, 130, 128, 130, 108, 109])
        let rr = 40.84747350759926
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = arrStd('')
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = arrStd([])
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = arrStd({})
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = arrStd(null)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = arrStd(undefined)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

})
