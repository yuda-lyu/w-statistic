import assert from 'assert'
import ltdtAverageWithNormCI from '../src/ltdtAverageWithNormCI.mjs'


describe(`ltdtAverageWithNormCI`, function() {

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
    it(`should return [ 33.48954903620696, 32.8740873274294 ] when input ${JSON.stringify(ltdt1)}, 'v', 0.95`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt1, 'v', 0.95)
        let rr = [33.48954903620696, 32.8740873274294]
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
    it(`should return 41.85625505621444 when input ${JSON.stringify(ltdt2)}, 'v', 0.95, 'upper-tail'`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt2, 'v', 0.95, 'upper-tail')
        let rr = 41.85625505621444
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
    it(`should return 24.507381307421923 when input ${JSON.stringify(ltdt3)}, 'v', 0.95, 'lower-tail'`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt3, 'v', 0.95, 'lower-tail')
        let rr = 24.507381307421923
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
    it(`should return 19.297020893539198 when input ${JSON.stringify(ltdt4)}, 'v', 0.95, 'upper-tail'`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt4, 'v', 0.95, 'upper-tail')
        let rr = 19.297020893539198
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
    it(`should return [ 39.026745114674725, 27.33689124896163 ] when input ${JSON.stringify(ltdt5)}, 'v', 0.25`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt5, 'v', 0.25)
        let rr = [39.026745114674725, 27.33689124896163]
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
    it(`should return [ 36.53111791210903, 29.832518451527324 ] when input ${JSON.stringify(ltdt6)}, 'v', 0.5`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt6, 'v', 0.5)
        let rr = [36.53111791210903, 29.832518451527324]
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
    it(`should return [ 34.74951166569836, 31.614124697938003 ] when input ${JSON.stringify(ltdt7)}, 'v', 0.75`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt7, 'v', 0.75)
        let rr = [34.74951166569836, 31.614124697938003]
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
    it(`should return [ 2.5700668400779687, 0.42993315992203107 ] when input ${JSON.stringify(ltdt8)}, 'v', 0.5`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt8, 'v', 0.5)
        let rr = [2.5700668400779687, 0.42993315992203107]
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
    it(`should return [ 5.011682286477021, 1.5883177135229787 ] when input ${JSON.stringify(ltdt9)}, 'v', 0.5`, async () => {
        let r = await ltdtAverageWithNormCI(ltdt9, 'v', 0.5)
        let rr = [5.011682286477021, 1.5883177135229787]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', ''`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, 'v', '')
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', []`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, 'v', [])
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[[object Object]] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', {}`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, 'v', {})
            .catch((err) => {
                r = err
            })
        let rr = 'p[[object Object]] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[null] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', null`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, 'v', null)
            .catch((err) => {
                r = err
            })
        let rr = 'p[null] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[undefined] is not a number' when input ${JSON.stringify(ltdt5)}, 'v', undefined`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, 'v', undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'p[undefined] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[] is not a string' when input ${JSON.stringify(ltdt5)}, ''`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, '')
            .catch((err) => {
                r = err
            })
        let rr = 'key[] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[] is not a string' when input ${JSON.stringify(ltdt5)}, []`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, [])
            .catch((err) => {
                r = err
            })
        let rr = 'key[] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[[object Object]] is not a string' when input ${JSON.stringify(ltdt5)}, {}`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, {})
            .catch((err) => {
                r = err
            })
        let rr = 'key[[object Object]] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[null] is not a string' when input ${JSON.stringify(ltdt5)}, null`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, null)
            .catch((err) => {
                r = err
            })
        let rr = 'key[null] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[undefined] is not a string' when input ${JSON.stringify(ltdt5)}, undefined`, async () => {
        let r
        await ltdtAverageWithNormCI(ltdt5, undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'key[undefined] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input ''`, async () => {
        let r
        await ltdtAverageWithNormCI('')
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[undefined] is not a string' when input []`, async () => {
        let r
        await ltdtAverageWithNormCI([])
            .catch((err) => {
                r = err
            })
        let rr = 'key[undefined] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input {}`, async () => {
        let r
        await ltdtAverageWithNormCI({})
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input null`, async () => {
        let r
        await ltdtAverageWithNormCI(null)
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input undefined`, async () => {
        let r
        await ltdtAverageWithNormCI(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
