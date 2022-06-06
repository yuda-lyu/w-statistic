import assert from 'assert'
import bin from '../src/bin.mjs'


describe(`bin`, function() {
    let k
    let oin = {}
    let out = {}

    k = 0
    oin[k] = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
    out[k] = [
        {
            min: -2.5,
            max: 3.75,
            avg: 0.625,
            arr: [
                -2.5, -2.5, -1, -1,
                -0.1, -0.1, 0, 0,
                0.1, 0.1, 1, 1,
                2.5, 2.5
            ]
        },
        { min: 3.75, max: 10, avg: 6.875, arr: [] },
        { min: 10, max: 16.25, avg: 13.125, arr: [] },
        { min: 16.25, max: 22.5, avg: 19.375, arr: [22.5] }
    ]
    it(`should return ${JSON.stringify(out[k])} when input ${JSON.stringify(oin[k])}, 4`, function() {
        let k = 0
        let r = bin(oin[k], 4)
        let rr = out[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    oin[k] = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
    out[k] = [
        {
            min: 1.1,
            max: 2.9333333333333336,
            avg: 2.0166666666666666,
            arr: [1.1, 2.2]
        },
        {
            min: 2.9333333333333336,
            max: 4.766666666666667,
            avg: 3.85,
            arr: [3.3, 4.4]
        },
        {
            min: 4.766666666666667,
            max: 6.6,
            avg: 5.683333333333334,
            arr: [5.5, 6.6]
        }
    ]
    it(`should return ${JSON.stringify(out[k])} when input ${JSON.stringify(oin[k])}, 3`, function() {
        let k = 1
        let r = bin(oin[k], 3)
        let rr = out[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    oin[k] = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
    out[k] = [
        { min: 1.1, max: 2.2, avg: 1.6500000000000001, arr: [1.1, 2.2] },
        { min: 2.2, max: 3.3000000000000003, avg: 2.75, arr: [3.3] },
        {
            min: 3.3000000000000003,
            max: 4.4,
            avg: 3.8500000000000005,
            arr: [4.4]
        },
        { min: 4.4, max: 5.5, avg: 4.95, arr: [5.5] },
        { min: 5.5, max: 6.6, avg: 6.05, arr: [6.6] }
    ]
    it(`should return ${JSON.stringify(out[k])} when input ${JSON.stringify(oin[k])}, 5`, function() {
        let k = 2
        let r = bin(oin[k], 5)
        let rr = out[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 3
    oin[k] = [1.1, 2.2, 3.3, 4.4, 5.5, 6.6]
    out[k] = [
        { min: 0, max: 2, avg: 1, arr: [1.1] },
        { min: 2, max: 4, avg: 3, arr: [2.2, 3.3] },
        { min: 4, max: 6, avg: 5, arr: [4.4, 5.5] },
        { min: 6, max: 8, avg: 7, arr: [6.6] },
        { min: 8, max: 10, avg: 9, arr: [] }
    ]
    it(`should return ${JSON.stringify(out[k])} when input ${JSON.stringify(oin[k])}, 5, { min: 0, max: 10 }`, function() {
        let k = 3
        let r = bin(oin[k], 5, { min: 0, max: 10 })
        let rr = out[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = bin('')
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = bin([])
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = bin({})
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = bin(null)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = bin(undefined)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

})
