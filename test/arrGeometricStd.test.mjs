import arrGeometricStd from '../src/arrGeometricStd.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`arrGeometricStd`, function() {

    it(`should return 6.774243857996147 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrGeometricStd(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 6.774243857996147
        assertApprox(r, rr)
    })

    it(`should return 6.774243857996147 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrGeometricStd(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = 6.774243857996147
        assertApprox(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = arrGeometricStd('')
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = arrGeometricStd([])
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = arrGeometricStd({})
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = arrGeometricStd(null)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = arrGeometricStd(undefined)
        let rr = null
        assertApprox(r, rr)
    })

})
