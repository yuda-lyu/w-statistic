import assert from 'assert'
import arrAverageWithLogNormCI from '../src/arrAverageWithLogNormCI.mjs'


describe(`arrAverageWithLogNormCI`, function() {

    it(`should return [ 27.615050054890812, 26.794611985184215 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95)
        let rr = [27.615050054890812, 26.794611985184215]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 41.610938902127394 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'upper-tail'`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'upper-tail')
        let rr = 41.610938902127394
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 17.782212338746568 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'lower-tail'`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'lower-tail')
        let rr = 17.782212338746568
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 19.28628574730297 when input [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912], 0.95, 'upper-tail'`, async () => {
        let r = await arrAverageWithLogNormCI([18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912], 0.95, 'upper-tail')
        let rr = 19.28628574730297
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 36.223415575653085, 20.42696800987406 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = [36.223415575653085, 20.42696800987406]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 32.05361593350904, 23.084277065874097 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = [32.05361593350904, 23.084277065874097]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 29.373829998564737, 25.190264640613567 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = [29.373829998564737, 25.190264640613567]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 1.7639684225556826, 0.6249032382061773 ] when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrAverageWithLogNormCI(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = [1.7639684225556826, 0.6249032382061773]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 1.7639684225556826, 0.6249032382061773 ] when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrAverageWithLogNormCI(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = [1.7639684225556826, 0.6249032382061773]
        assert.strict.deepStrictEqual(r, rr)
    })

    let arrTest = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]

    it(`should return 'p[] is not a number' when input ${JSON.stringify(arrTest)}, ''`, async () => {
        let r
        await arrAverageWithLogNormCI(arrTest, '')
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[] is not a number' when input ${JSON.stringify(arrTest)}, []`, async () => {
        let r
        await arrAverageWithLogNormCI(arrTest, [])
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[[object Object]] is not a number' when input ${JSON.stringify(arrTest)}, {}`, async () => {
        let r
        await arrAverageWithLogNormCI(arrTest, {})
            .catch((err) => {
                r = err
            })
        let rr = 'p[[object Object]] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[null] is not a number' when input ${JSON.stringify(arrTest)}, null`, async () => {
        let r
        await arrAverageWithLogNormCI(arrTest, null)
            .catch((err) => {
                r = err
            })
        let rr = 'p[null] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[undefined] is not a number' when input ${JSON.stringify(arrTest)}, undefined`, async () => {
        let r
        await arrAverageWithLogNormCI(arrTest, undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'p[undefined] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input ''`, async () => {
        let r
        await arrAverageWithLogNormCI('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an effective array' when input []`, async () => {
        let r
        await arrAverageWithLogNormCI([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input {}`, async () => {
        let r
        await arrAverageWithLogNormCI({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input null`, async () => {
        let r
        await arrAverageWithLogNormCI(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input undefined`, async () => {
        let r
        await arrAverageWithLogNormCI(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
