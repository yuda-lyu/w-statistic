import assert from 'assert'
import ltdtCount from '../src/ltdtCount.mjs'


describe(`ltdtCount`, function() {

    let ltdt1 = [
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
    ]
    let rr1 = [
        { 'key': '2.5', 'count': 2 },
        { 'key': '0.1', 'count': 2 },
        { 'key': '-0.1', 'count': 2 },
        { 'key': '-1', 'count': 2 },
        { 'key': '-2.5', 'count': 2 },
        { 'key': '1', 'count': 2 },
        { 'key': '0', 'count': 2 },
        { 'key': '22.5', 'count': 1 }
    ]
    it(`should return ${JSON.stringify(rr1)} when input ${JSON.stringify(ltdt1)}, 'v'`, function() {
        let r = ltdtCount(ltdt1, 'v')
        let rr = rr1
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt2 = [
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
    ]
    let rr2 = [
        { 'key': '2.5', 'count': 2 },
        { 'key': '0.1', 'count': 2 },
        { 'key': '1', 'count': 2 },
        { 'key': '0', 'count': 2 },
        { 'key': '22.5', 'count': 1 }
    ]
    it(`should return ${JSON.stringify(rr2)} when input ${JSON.stringify(ltdt2)}, 'v'`, function() {
        let r = ltdtCount(ltdt2, 'v')
        let rr = rr2
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input ''`, function() {
        let r = ltdtCount('')
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input []`, function() {
        let r = ltdtCount([])
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input {}`, function() {
        let r = ltdtCount({})
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input null`, function() {
        let r = ltdtCount(null)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input undefined`, function() {
        let r = ltdtCount(undefined)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

})
