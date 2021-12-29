import assert from 'assert'
import arrAverageWithLogNormCI from '../src/arrAverageWithLogNormCI.mjs'


describe(`arrAverageWithLogNormCI`, function() {

    it(`should return [ 27.61505005489075, 26.794611985184275 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95)
        let rr = [27.61505005489075, 26.794611985184275]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 41.61093910287295 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'upper-tail'`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'upper-tail')
        let rr = 41.61093910287295
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 17.782212252959027 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'lower-tail'`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'lower-tail')
        let rr = 17.782212252959027
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 19.286285749919724 when input [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912], 0.95, 'upper-tail'`, async () => {
        let r = await arrAverageWithLogNormCI([18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912], 0.95, 'upper-tail')
        let rr = 19.286285749919724
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 36.223415550160794, 20.426968024249575 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = [36.223415550160794, 20.426968024249575]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 32.05361593350727, 23.084277065875376 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = [32.05361593350727, 23.084277065875376]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 29.373829998565377, 25.19026464061302 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, async () => {
        let r = await arrAverageWithLogNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = [29.373829998565377, 25.19026464061302]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 1.7639684225556358, 0.624903238206194 ] when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrAverageWithLogNormCI(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = [1.7639684225556358, 0.624903238206194]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 1.7639684225556358, 0.624903238206194 ] when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrAverageWithLogNormCI(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = [1.7639684225556358, 0.624903238206194]
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
