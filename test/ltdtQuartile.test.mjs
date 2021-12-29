import assert from 'assert'
import ltdtQuartile from '../src/ltdtQuartile.mjs'


describe(`ltdtQuartile`, function() {

    let ltdt1 = [
        {
            'k': 0,
            'v': 6,
        },
        {
            'k': 1,
            'v': 47,
        },
        {
            'k': 2,
            'v': 49,
        },
        {
            'k': 3,
            'v': 15,
        },
        {
            'k': 4,
            'v': 42,
        },
        {
            'k': 5,
            'v': 41,
        },
        {
            'k': 6,
            'v': 7,
        },
        {
            'k': 7,
            'v': 39,
        },
        {
            'k': 8,
            'v': 43,
        },
        {
            'k': 9,
            'v': 40,
        },
        {
            'k': 10,
            'v': 36,
        },
    ]
    it(`should return 15 when input ${JSON.stringify(ltdt1)}, 'v', 0.25`, function() {
        let r = ltdtQuartile(ltdt1, 'v', 0.25)
        let rr = 15
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt2 = [
        {
            'k': 0,
            'v': 6,
        },
        {
            'k': 1,
            'v': 47,
        },
        {
            'k': 2,
            'v': 49,
        },
        {
            'k': 3,
            'v': 15,
        },
        {
            'k': 4,
            'v': 42,
        },
        {
            'k': 5,
            'v': 41,
        },
        {
            'k': 6,
            'v': 7,
        },
        {
            'k': 7,
            'v': 39,
        },
        {
            'k': 8,
            'v': 43,
        },
        {
            'k': 9,
            'v': 40,
        },
        {
            'k': 10,
            'v': 36,
        },
    ]
    it(`should return 40 when input ${JSON.stringify(ltdt2)}, 'v', 0.5`, function() {
        let r = ltdtQuartile(ltdt2, 'v', 0.5)
        let rr = 40
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt3 = [
        {
            'k': 0,
            'v': 6,
        },
        {
            'k': 1,
            'v': 47,
        },
        {
            'k': 2,
            'v': 49,
        },
        {
            'k': 3,
            'v': 15,
        },
        {
            'k': 4,
            'v': 42,
        },
        {
            'k': 5,
            'v': 41,
        },
        {
            'k': 6,
            'v': 7,
        },
        {
            'k': 7,
            'v': 39,
        },
        {
            'k': 8,
            'v': 43,
        },
        {
            'k': 9,
            'v': 40,
        },
        {
            'k': 10,
            'v': 36,
        },
    ]
    it(`should return 43 when input ${JSON.stringify(ltdt3)}, 'v', 0.75`, function() {
        let r = ltdtQuartile(ltdt3, 'v', 0.75)
        let rr = 43
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt4 = [
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
    it(`should return 0 when input ${JSON.stringify(ltdt4)}, 'v', 0.5`, function() {
        let r = ltdtQuartile(ltdt4, 'v', 0.5)
        let rr = 0
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt5 = [
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
    it(`should return 1 when input ${JSON.stringify(ltdt5)}, 'v', 0.5`, function() {
        let r = ltdtQuartile(ltdt5, 'v', 0.5)
        let rr = 1
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, 'v', ''`, function() {
        let r = ltdtQuartile(ltdt1, 'v', '')
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, 'v', []`, function() {
        let r = ltdtQuartile(ltdt1, 'v', [])
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, 'v', {}`, function() {
        let r = ltdtQuartile(ltdt1, 'v', {})
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, 'v', null`, function() {
        let r = ltdtQuartile(ltdt1, 'v', null)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, 'v', undefined`, function() {
        let r = ltdtQuartile(ltdt1, 'v', undefined)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, ''`, function() {
        let r = ltdtQuartile(ltdt1, '')
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, []`, function() {
        let r = ltdtQuartile(ltdt1, [])
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, {}`, function() {
        let r = ltdtQuartile(ltdt1, {})
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, null`, function() {
        let r = ltdtQuartile(ltdt1, null)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ${JSON.stringify(ltdt1)}, undefined`, function() {
        let r = ltdtQuartile(ltdt1, undefined)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = ltdtQuartile('')
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = ltdtQuartile([])
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = ltdtQuartile({})
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = ltdtQuartile(null)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = ltdtQuartile(undefined)
        let rr = null
        assert.strict.deepStrictEqual(r, rr)
    })

})
