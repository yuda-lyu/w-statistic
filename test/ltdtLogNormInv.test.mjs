import assert from 'assert'
import ltdtLogNormInv from '../src/ltdtLogNormInv.mjs'


describe(`ltdtLogNormInv`, function() {

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
    it(`should return 16.096845206281877 when input ${JSON.stringify(ltdt1)}, 'v', 0.25`, async () => {
        let r = await ltdtLogNormInv(ltdt1, 'v', 0.25)
        let rr = 16.096845206281877
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
    it(`should return 27.201738017491444 when input ${JSON.stringify(ltdt2)}, 'v', 0.5`, async () => {
        let r = await ltdtLogNormInv(ltdt2, 'v', 0.5)
        let rr = 27.201738017491444
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
    it(`should return 45.96767513695641 when input ${JSON.stringify(ltdt3)}, 'v', 0.75`, async () => {
        let r = await ltdtLogNormInv(ltdt3, 'v', 0.75)
        let rr = 45.96767513695641
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
    it(`should return 1.0499093195835956 when input ${JSON.stringify(ltdt4)}, 'v', 0.5`, async () => {
        let r = await ltdtLogNormInv(ltdt4, 'v', 0.5)
        let rr = 1.0499093195835956
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
    it(`should return 1.0499093195835956 when input ${JSON.stringify(ltdt5)}, 'v', 0.5`, async () => {
        let r = await ltdtLogNormInv(ltdt5, 'v', 0.5)
        let rr = 1.0499093195835956
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ratio[] is not a number' when input ${JSON.stringify(ltdt1)}, 'v', ''`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, 'v', '')
            .catch((err) => {
                r = err
            })
        let rr = 'ratio[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ratio[] is not a number' when input ${JSON.stringify(ltdt1)}, 'v', []`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, 'v', [])
            .catch((err) => {
                r = err
            })
        let rr = 'ratio[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ratio[[object Object]] is not a number' when input ${JSON.stringify(ltdt1)}, 'v', {}`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, 'v', {})
            .catch((err) => {
                r = err
            })
        let rr = 'ratio[[object Object]] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ratio[null] is not a number' when input ${JSON.stringify(ltdt1)}, 'v', null`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, 'v', null)
            .catch((err) => {
                r = err
            })
        let rr = 'ratio[null] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ratio[undefined] is not a number' when input ${JSON.stringify(ltdt1)}, 'v', undefined`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, 'v', undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'ratio[undefined] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[] is not a string' when input ${JSON.stringify(ltdt1)}, ''`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, '')
            .catch((err) => {
                r = err
            })
        let rr = 'key[] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[] is not a string' when input ${JSON.stringify(ltdt1)}, []`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, [])
            .catch((err) => {
                r = err
            })
        let rr = 'key[] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[[object Object]] is not a string' when input ${JSON.stringify(ltdt1)}, {}`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, {})
            .catch((err) => {
                r = err
            })
        let rr = 'key[[object Object]] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[null] is not a string' when input ${JSON.stringify(ltdt1)}, null`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, null)
            .catch((err) => {
                r = err
            })
        let rr = 'key[null] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[undefined] is not a string' when input ${JSON.stringify(ltdt1)}, undefined`, async () => {
        let r
        await ltdtLogNormInv(ltdt1, undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'key[undefined] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input ''`, async () => {
        let r
        await ltdtLogNormInv('')
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'key[undefined] is not a string' when input []`, async () => {
        let r
        await ltdtLogNormInv([])
            .catch((err) => {
                r = err
            })
        let rr = 'key[undefined] is not a string'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input {}`, async () => {
        let r
        await ltdtLogNormInv({})
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input null`, async () => {
        let r
        await ltdtLogNormInv(null)
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'ltdt is not an array' when input undefined`, async () => {
        let r
        await ltdtLogNormInv(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'ltdt is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
