import assert from 'assert'
import regPower from '../src/regPower.mjs'


describe(`regPower`, function() {

    let k
    let kpArr = {}
    let kpOut = {}

    k = 0
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { a: 2.6361956497645123, b: -1.1246302189091415 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 0
        let r = await regPower(kpArr[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    kpArr[k] = [
        [1, 0.5],
        [2.5, 1.1],
        [4, 2.5],
    ]
    kpOut[k] = { a: 0.47081085944621165, b: 1.1197632837626978 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}`, async function() {
        let k = 1
        let r = await regPower(kpArr[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = {
        a: 2.6361956497645123,
        b: -1.1246302189091415,
        interpY: 1.2090108799137966
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { interpX: 2 }`, async function() {
        let k = 2
        let r = await regPower(kpArr[k], { interpX: 2 })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 3
    kpArr[k] = [
        [1, 2.5],
        [2.5, 1.1],
        [4, 0.5],
    ]
    kpOut[k] = { a: 2.6361956497645123, b: -1.1246302189091415 }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArr[k])}, { useSync: true }`, async function() {
        let k = 3
        let r = regPower(kpArr[k], { useSync: true }) //不使用await
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })


    it(`should return null when input ''`, async function() {
        let r
        await regPower('')
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input []`, async function() {
        let r
        await regPower([])
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input {}`, async function() {
        let r
        await regPower({})
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input null`, async function() {
        let r
        await regPower(null)
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input undefined`, async function() {
        let r
        await regPower(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'no effective data'
        assert.strict.deepStrictEqual(r, rr)
    })

})
