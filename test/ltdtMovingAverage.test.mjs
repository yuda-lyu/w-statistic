import assert from 'assert'
import ltdtMovingAverage from '../src/ltdtMovingAverage.mjs'


describe(`ltdtMovingAverage`, function() {
    let k
    let o = {}

    k = 1
    o[k] = {
        in: [
            {
                'k': 0,
                'v': 'abc'
            },
            {
                'k': 1,
                'v': '-2.5'
            },
            {
                'k': 2,
                'v': -2.5
            },
            {
                'k': 3,
                'v': '-1'
            },
            {
                'k': 4,
                'v': -1
            },
            {
                'k': 5,
                'v': '-0.1'
            },
            {
                'k': 6,
                'v': -0.1
            },
            {
                'k': 7,
                'v': '0'
            },
            {
                'k': 8,
                'v': 0
            },
            {
                'k': 9,
                'v': '0.1'
            },
            {
                'k': 10,
                'v': 0.1
            },
            {
                'k': 11,
                'v': '1'
            },
            {
                'k': 12,
                'v': 1
            },
            {
                'k': 13,
                'v': '2.5'
            },
            {
                'k': 14,
                'v': 2.5
            },
            {
                'k': 15,
                'v': 22.5
            },
            {
                'k': 16,
                'v': 'xyz'
            }
        ],
        out: [
            { k: 0, v: -2.5 },
            { k: 1, v: -2 },
            { k: 2, v: -1.75 },
            { k: 3, v: -1.42 },
            { k: 4, v: -0.9399999999999998 },
            { k: 5, v: -0.44000000000000006 },
            { k: 6, v: -0.24000000000000005 },
            { k: 7, v: -0.02 },
            { k: 8, v: 0.02 },
            { k: 9, v: 0.24 },
            { k: 10, v: 0.44000000000000006 },
            { k: 11, v: 0.9400000000000001 },
            { k: 12, v: 1.42 },
            { k: 13, v: 5.9 },
            { k: 14, v: 7.125 },
            { k: 15, v: 9.166666666666666 },
            { k: 16, v: 12.5 }
        ]
    }
    it(`should return ${JSON.stringify(o[k].out)} when input ${JSON.stringify(o[k].in)}, 'v'`, function() {
        let k = 1
        let r = ltdtMovingAverage(o[k].in, 'v')
        let rr = o[k].out
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    o[k] = {
        in: [
            {
                'k': 0,
                'v': 'abc'
            },
            {
                'k': 1,
                'v': '0'
            },
            {
                'k': 2,
                'v': 0
            },
            {
                'k': 3,
                'v': '0.1'
            },
            {
                'k': 4,
                'v': 0.1
            },
            {
                'k': 5,
                'v': '1'
            },
            {
                'k': 6,
                'v': 1
            },
            {
                'k': 7,
                'v': '2.5'
            },
            {
                'k': 8,
                'v': 2.5
            },
            {
                'k': 9,
                'v': 22.5
            },
            {
                'k': 10,
                'v': 'xyz'
            }
        ],
        out: [
            { k: 0, v: 0 },
            { k: 1, v: 0 },
            { k: 2, v: 0.03333333333333333 },
            { k: 3, v: 0.06666666666666667 },
            { k: 4, v: 0.39999999999999997 },
            { k: 5, v: 0.7000000000000001 },
            { k: 6, v: 1.5 },
            { k: 7, v: 2 },
            { k: 8, v: 9.166666666666666 },
            { k: 9, v: 12.5 },
            { k: 10, v: 22.5 }
        ]
    }
    it(`should return ${JSON.stringify(o[k].out)} when input ${JSON.stringify(o[k].in)}, 'v', { selectCountHalf: 1 }`, function() {
        let k = 2
        let r = ltdtMovingAverage(o[k].in, 'v', { selectCountHalf: 1 })
        let rr = o[k].out
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input ''`, function() {
        let r = ltdtMovingAverage('')
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input []`, function() {
        let r = ltdtMovingAverage([])
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input {}`, function() {
        let r = ltdtMovingAverage({})
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input null`, function() {
        let r = ltdtMovingAverage(null)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input undefined`, function() {
        let r = ltdtMovingAverage(undefined)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

})
