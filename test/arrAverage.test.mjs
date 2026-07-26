import arrAverage from '../src/arrAverage.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`arrAverage`, function() {

    it(`should return 1.5 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrAverage(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 1.5
        assertApprox(r, rr)
    })

    it(`should return 3.3 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrAverage(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 3.3
        assertApprox(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = arrAverage('')
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = arrAverage([])
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = arrAverage({})
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = arrAverage(null)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = arrAverage(undefined)
        let rr = null
        assertApprox(r, rr)
    })

})
