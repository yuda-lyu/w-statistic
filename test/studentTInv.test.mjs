import studentTInv from '../src/studentTInv.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`studentTInv`, function() {

    it(`should return 1.6909241978049958 when input 35, 0.95`, async () => {
        let r = await studentTInv(35, 0.95)
        let rr = 1.6909241978049958
        assertApprox(r, rr)
    })

    it(`should return -0 when input 35, 0.5`, async () => {
        let r = await studentTInv(35, 0.5)
        let rr = -0
        assertApprox(r, rr)
    })

    it(`should return -1.6909241978049974 when input 35, 0.05`, async () => {
        let r = await studentTInv(35, 0.05)
        let rr = -1.6909241978049974
        assertApprox(r, rr)
    })

    it(`should return 1.7613101151015698 when input 15, 0.95`, async () => {
        let r = await studentTInv(15, 0.95)
        let rr = 1.7613101151015698
        assertApprox(r, rr)
    })

    it(`should return 'n[1] <= 1' when input 1, 0.95`, async () => {
        let r
        await studentTInv(1, 0.95)
            .catch((err) => {
                r = err
            })
        let rr = 'n[1] <= 1'
        assertApprox(r, rr)
    })

    it(`should return 'n[0] is not positive integer' when input 0, 0.95`, async () => {
        let r
        await studentTInv(0, 0.95)
            .catch((err) => {
                r = err
            })
        let rr = 'n[0] is not positive integer'
        assertApprox(r, rr)
    })

    it(`should return 'n[] is not positive integer' when input ''`, async () => {
        let r
        await studentTInv('')
            .catch((err) => {
                r = err
            })
        let rr = 'n[] is not positive integer'
        assertApprox(r, rr)
    })

    it(`should return 'n[] is not positive integer' when input []`, async () => {
        let r
        await studentTInv([])
            .catch((err) => {
                r = err
            })
        let rr = 'n[] is not positive integer'
        assertApprox(r, rr)
    })

    it(`should return 'n[[object Object]] is not positive integer' when input {}`, async () => {
        let r
        await studentTInv({})
            .catch((err) => {
                r = err
            })
        let rr = 'n[[object Object]] is not positive integer'
        assertApprox(r, rr)
    })

    it(`should return 'n[null] is not positive integer' when input null`, async () => {
        let r
        await studentTInv(null)
            .catch((err) => {
                r = err
            })
        let rr = 'n[null] is not positive integer'
        assertApprox(r, rr)
    })

    it(`should return 'n[undefined] is not positive integer' when input undefined`, async () => {
        let r
        await studentTInv(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'n[undefined] is not positive integer'
        assertApprox(r, rr)
    })

})
