import arrQuartile from '../src/arrQuartile.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`arrQuartile`, function() {

    it(`should return 15 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, function() {
        let r = arrQuartile([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = 15
        assertApprox(r, rr)
    })

    it(`should return 40 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, function() {
        let r = arrQuartile([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = 40
        assertApprox(r, rr)
    })

    it(`should return 43 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, function() {
        let r = arrQuartile([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = 43
        assertApprox(r, rr)
    })

    it(`should return 0 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, function() {
        let r = arrQuartile(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 0
        assertApprox(r, rr)
    })

    it(`should return 1 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, function() {
        let r = arrQuartile(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 1
        assertApprox(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = arrQuartile('')
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = arrQuartile([])
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = arrQuartile({})
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = arrQuartile(null)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = arrQuartile(undefined)
        let rr = null
        assertApprox(r, rr)
    })

})
