import arrGeometricAverage from '../src/arrGeometricAverage.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`arrGeometricAverage`, function() {

    it(`should return 1.0499093195835956 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrGeometricAverage(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 1.0499093195835956
        assertApprox(r, rr)
    })

    it(`should return 1.0499093195835956 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrGeometricAverage(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 1.0499093195835956
        assertApprox(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = arrGeometricAverage('')
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = arrGeometricAverage([])
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = arrGeometricAverage({})
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = arrGeometricAverage(null)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = arrGeometricAverage(undefined)
        let rr = null
        assertApprox(r, rr)
    })

})
