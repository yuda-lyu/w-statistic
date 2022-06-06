import assert from 'assert'
import arrAverageWithNormCI from '../src/arrAverageWithNormCI.mjs'


describe(`arrAverageWithNormCI`, function() {

    it(`should return [ 33.48954903620701, 32.87408732742935 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95`, async () => {
        let r = await arrAverageWithNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95)
        let rr = [33.48954903620701, 32.87408732742935]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 41.85625495776645 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'upper-tail'`, async () => {
        let r = await arrAverageWithNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'upper-tail')
        let rr = 41.85625495776645
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 24.507381405869904 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'lower-tail'`, async () => {
        let r = await arrAverageWithNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.95, 'lower-tail')
        let rr = 24.507381405869904
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 19.297020890880212 when input [18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912], 0.95, 'upper-tail'`, async () => {
        let r = await arrAverageWithNormCI([18.7261764705882, 18.6629411764705, 19.3983050847457, 18.5099999999999, 18.9986446886446, 18.9083937823834, 19.1957837837837, 19.0423529411764, 19.2320588235294, 18.8526470588235, 18.7982198952879, 19.0423529411764, 19.075, 18.945238095238, 20.6691240875912], 0.95, 'upper-tail')
        let rr = 19.297020890880212
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 39.026745129035845, 27.336891234600518 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, async () => {
        let r = await arrAverageWithNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = [39.026745129035845, 27.336891234600518]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 36.53111791211017, 29.832518451526187 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, async () => {
        let r = await arrAverageWithNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = [36.53111791211017, 29.832518451526187]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 34.74951166569791, 31.614124697938454 ] when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, async () => {
        let r = await arrAverageWithNormCI([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = [34.74951166569791, 31.614124697938454]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 2.5700668400787645, 0.4299331599212357 ] when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrAverageWithNormCI(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = [2.5700668400787645, 0.4299331599212357]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [ 5.011682286477105, 1.5883177135228952 ] when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, async () => {
        let r = await arrAverageWithNormCI(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = [5.011682286477105, 1.5883177135228952]
        assert.strict.deepStrictEqual(r, rr)
    })

    let arrTest = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]

    it(`should return 'p[] is not a number' when input ${JSON.stringify(arrTest)}, ''`, async () => {
        let r
        await arrAverageWithNormCI(arrTest, '')
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[] is not a number' when input ${JSON.stringify(arrTest)}, []`, async () => {
        let r
        await arrAverageWithNormCI(arrTest, [])
            .catch((err) => {
                r = err
            })
        let rr = 'p[] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[[object Object]] is not a number' when input ${JSON.stringify(arrTest)}, {}`, async () => {
        let r
        await arrAverageWithNormCI(arrTest, {})
            .catch((err) => {
                r = err
            })
        let rr = 'p[[object Object]] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[null] is not a number' when input ${JSON.stringify(arrTest)}, null`, async () => {
        let r
        await arrAverageWithNormCI(arrTest, null)
            .catch((err) => {
                r = err
            })
        let rr = 'p[null] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'p[undefined] is not a number' when input ${JSON.stringify(arrTest)}, undefined`, async () => {
        let r
        await arrAverageWithNormCI(arrTest, undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'p[undefined] is not a number'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input ''`, async () => {
        let r
        await arrAverageWithNormCI('')
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an effective array' when input []`, async () => {
        let r
        await arrAverageWithNormCI([])
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input {}`, async () => {
        let r
        await arrAverageWithNormCI({})
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input null`, async () => {
        let r
        await arrAverageWithNormCI(null)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return 'arr is not an array' when input undefined`, async () => {
        let r
        await arrAverageWithNormCI(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'arr is not an array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
