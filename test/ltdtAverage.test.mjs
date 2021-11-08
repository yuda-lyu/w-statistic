import assert from 'assert'
import ltdtAverage from '../src/ltdtAverage.mjs'


describe(`ltdtAverage`, function() {

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
    it(`should return 1.5 when input ${JSON.stringify(ltdt1)}, 'v'`, function() {
        let r = ltdtAverage(ltdt1, 'v')
        let rr = 1.5
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
    it(`should return 3.3 when input ${JSON.stringify(ltdt2)}, 'v'`, function() {
        let r = ltdtAverage(ltdt2, 'v')
        let rr = 3.3
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input ''`, function() {
        let r = ltdtAverage('')
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input []`, function() {
        let r = ltdtAverage([])
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input {}`, function() {
        let r = ltdtAverage({})
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input null`, function() {
        let r = ltdtAverage(null)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input undefined`, function() {
        let r = ltdtAverage(undefined)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

})
