import assert from 'assert'
import ltdtAverageWithLogNormCI from '../src/ltdtAverageWithLogNormCI.mjs'


describe(`ltdtAverageWithLogNormCI`, function() {

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
    it(`should return [ 27.61505005489075, 26.794611985184275 ] when input ${JSON.stringify(ltdt1)}, 'v', 0.95`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt1, 'v', 0.95)
        let rr = [27.61505005489075, 26.794611985184275]
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
    it(`should return 41.61093910287295 when input ${JSON.stringify(ltdt2)}, 'v', 0.95, 'upper-tail'`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt2, 'v', 0.95, 'upper-tail')
        let rr = 41.61093910287295
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
    it(`should return 17.782212252959027 when input ${JSON.stringify(ltdt3)}, 'v', 0.95, 'lower-tail'`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt3, 'v', 0.95, 'lower-tail')
        let rr = 17.782212252959027
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt4 = [
        {
            'k': 0,
            'v': 18.7261764705882,
        },
        {
            'k': 1,
            'v': 18.6629411764705,
        },
        {
            'k': 2,
            'v': 19.3983050847457,
        },
        {
            'k': 3,
            'v': 18.5099999999999,
        },
        {
            'k': 4,
            'v': 18.9986446886446,
        },
        {
            'k': 5,
            'v': 18.9083937823834,
        },
        {
            'k': 6,
            'v': 19.1957837837837,
        },
        {
            'k': 7,
            'v': 19.0423529411764,
        },
        {
            'k': 8,
            'v': 19.2320588235294,
        },
        {
            'k': 9,
            'v': 18.8526470588235,
        },
        {
            'k': 10,
            'v': 18.7982198952879,
        },
        {
            'k': 11,
            'v': 19.0423529411764,
        },
        {
            'k': 12,
            'v': 19.075,
        },
        {
            'k': 13,
            'v': 18.945238095238,
        },
        {
            'k': 14,
            'v': 20.6691240875912,
        },
    ]
    it(`should return 19.286285749919724 when input ${JSON.stringify(ltdt4)}, 'v', 0.95, 'upper-tail'`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt4, 'v', 0.95, 'upper-tail')
        let rr = 19.286285749919724
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt5 = [
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
    it(`should return [ 36.223415550160794, 20.426968024249575 ] when input ${JSON.stringify(ltdt5)}, 'v', 0.25`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt5, 'v', 0.25)
        let rr = [36.223415550160794, 20.426968024249575]
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt6 = [
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
    it(`should return [ 32.05361593350727, 23.084277065875376 ] when input ${JSON.stringify(ltdt6)}, 'v', 0.5`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt6, 'v', 0.5)
        let rr = [32.05361593350727, 23.084277065875376]
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt7 = [
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
    it(`should return [ 29.373829998565377, 25.19026464061302 ] when input ${JSON.stringify(ltdt7)}, 'v', 0.75`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt7, 'v', 0.75)
        let rr = [29.373829998565377, 25.19026464061302]
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt8 = [
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
    it(`should return [ 1.7639684225556358, 0.624903238206194 ] when input ${JSON.stringify(ltdt8)}, 'v', 0.5`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt8, 'v', 0.5)
        let rr = [1.7639684225556358, 0.624903238206194]
        assert.strict.deepStrictEqual(r, rr)
    })

    let ltdt9 = [
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
    it(`should return [ 1.7639684225556358, 0.624903238206194 ] when input ${JSON.stringify(ltdt9)}, 'v', 0.5`, async () => {
        let r = await ltdtAverageWithLogNormCI(ltdt9, 'v', 0.5)
        let rr = [1.7639684225556358, 0.624903238206194]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', ''`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, 'v', '')
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', []`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, 'v', [])
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[[object Object]] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', {}`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, 'v', {})
            .catch((err) => {
                r = err
            })
        let rr = 'p[[object Object]] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[null] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', null`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, 'v', null)
            .catch((err) => {
                r = err
            })
        let rr = 'p[null] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[undefined] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', undefined`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, 'v', undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'p[undefined] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[] is not a string' when input ${JSON.stringify(ltdt5)}, ''`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, '')
            .catch((err) => {
                r = err
            })
        let rr = 'key[] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[] is not a string' when input ${JSON.stringify(ltdt5)}, []`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, [])
            .catch((err) => {
                r = err
            })
        let rr = 'key[] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[[object Object]] is not a string' when input ${JSON.stringify(ltdt5)}, {}`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, {})
            .catch((err) => {
                r = err
            })
        let rr = 'key[[object Object]] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[null] is not a string' when input ${JSON.stringify(ltdt5)}, null`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, null)
            .catch((err) => {
                r = err
            })
        let rr = 'key[null] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[undefined] is not a string' when input ${JSON.stringify(ltdt5)}, undefined`, async () => {
        let r
        await ltdtAverageWithLogNormCI(ltdt5, undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'key[undefined] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input ''`, async () => {
        let r
        await ltdtAverageWithLogNormCI('')
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[undefined] is not a string' when input []`, async () => {
        let r
        await ltdtAverageWithLogNormCI([])
            .catch((err) => {
                r = err
            })
        let rr = 'key[undefined] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input {}`, async () => {
        let r
        await ltdtAverageWithLogNormCI({})
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input null`, async () => {
        let r
        await ltdtAverageWithLogNormCI(null)
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input undefined`, async () => {
        let r
        await ltdtAverageWithLogNormCI(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
