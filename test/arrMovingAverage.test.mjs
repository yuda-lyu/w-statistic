import assert from 'assert'
import arrMovingAverage from '../src/arrMovingAverage.mjs'


describe(`arrMovingAverage`, function() {
    let k
    let o = {}

    k = 1
    o[k] = {
        in: ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'],
        out: [
            -2.5, -2,
            -1.75, -1.42,
            -0.9399999999999998, -0.44000000000000006,
            -0.24000000000000005, -0.02,
            0.02, 0.24,
            0.44000000000000006, 0.9400000000000001,
            1.42, 5.9,
            7.125, 9.166666666666666,
            12.5
        ]
    }
    it(`should return ${JSON.stringify(o[k].out)} when input ${JSON.stringify(o[k].in)}`, function() {
        let k = 1
        let r = arrMovingAverage(o[k].in)
        let rr = o[k].out
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    o[k] = {
        in: ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'],
        out: [
            0,
            0,
            0.03333333333333333,
            0.06666666666666667,
            0.39999999999999997,
            0.7000000000000001,
            1.5,
            2,
            9.166666666666666,
            12.5,
            22.5
        ]
    }
    it(`should return ${JSON.stringify(o[k].out)} when input ${JSON.stringify(o[k].in)}, { selectCountHalf: 1 }`, function() {
        let k = 2
        let r = arrMovingAverage(o[k].in, { selectCountHalf: 1 })
        let rr = o[k].out
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 3
    o[k] = {
        in: ['-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5],
        out: [
            -2.5, -2.5,
            -2, -1.5,
            -0.7000000000000001, -0.4000000000000001,
            -0.06666666666666667, -0.03333333333333333,
            0.03333333333333333, 0.06666666666666667,
            0.39999999999999997, 0.7000000000000001,
            1.5, 2,
            9.166666666666666
        ]
    }
    it(`should return ${JSON.stringify(o[k].out)} when input ${JSON.stringify(o[k].in)}, { mode: 'SMA', selectCountHalf: 3 }`, function() {
        let k = 3
        let r = arrMovingAverage(o[k].in, { mode: 'SMA', selectCountHalf: 3 })
        let rr = o[k].out
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 4
    o[k] = {
        in: ['-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5],
        out: [
            -2.5,
            -2.5,
            -1.75,
            -1.375,
            -0.7375,
            -0.41875,
            -0.209375,
            -0.1046875,
            -0.0023437499999999986,
            0.048828125,
            0.5244140625,
            0.76220703125,
            1.631103515625,
            2.0655517578125,
            12.28277587890625
        ]
    }
    it(`should return ${JSON.stringify(o[k].out)} when input ${JSON.stringify(o[k].in)}, { mode: 'EMA', selectCountHalf: 3  }`, function() {
        let k = 4
        let r = arrMovingAverage(o[k].in, { mode: 'EMA', selectCountHalf: 3 })
        let rr = o[k].out
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input ''`, function() {
        let r = arrMovingAverage('')
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input []`, function() {
        let r = arrMovingAverage([])
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input {}`, function() {
        let r = arrMovingAverage({})
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input null`, function() {
        let r = arrMovingAverage(null)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input undefined`, function() {
        let r = arrMovingAverage(undefined)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

})
