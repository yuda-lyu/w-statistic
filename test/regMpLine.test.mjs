import assert from 'assert'
import regMpLine from '../src/regMpLine.mjs'


describe(`regMpLine`, function() {

    let k
    let kpArrX = {}
    let kpArrY = {}
    let kpOut = {}

    k = 0
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0],
        [2],
        [4],
        [6],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515],
            [-1.4210854715202004e-14],
            [3.552713678800501e-15]
        ],
        m1: 2.0000000000000515,
        m2: -1.4210854715202004e-14,
        b: 3.552713678800501e-15
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}`, async function() {
        let k = 0
        let r = await regMpLine(kpArrX[k], kpArrY[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 1
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0, 0],
        [2, 4],
        [4, 6],
        [6, 8],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515, 3.552713678800501e-14],
            [-1.4210854715202004e-14, 1.9999999999999716],
            [3.552713678800501e-15, 0]
        ],
        m11: 2.0000000000000515,
        m21: 3.552713678800501e-14,
        m12: -1.4210854715202004e-14,
        m22: 1.9999999999999716,
        b1: 3.552713678800501e-15,
        b2: 0
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}`, async function() {
        let k = 1
        let r = await regMpLine(kpArrX[k], kpArrY[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 2
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0, 0, 0],
        [2, 4, 3],
        [4, 6, 5],
        [6, 8, 7],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515, 3.552713678800501e-14, 1.0000000000000426],
            [-1.4210854715202004e-14, 1.9999999999999716, 0.9999999999999591],
            [3.552713678800501e-15, 0, 7.105427357601002e-15]
        ],
        m11: 2.0000000000000515,
        m21: 3.552713678800501e-14,
        m31: 1.0000000000000426,
        m12: -1.4210854715202004e-14,
        m22: 1.9999999999999716,
        m32: 0.9999999999999591,
        b1: 3.552713678800501e-15,
        b2: 0,
        b3: 7.105427357601002e-15
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}`, async function() {
        let k = 2
        let r = await regMpLine(kpArrX[k], kpArrY[k])
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 3
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0],
        [2],
        [4],
        [6],
    ]
    kpOut[k] = {
        coes: [[1.9999999999999716], [1.4210854715202004e-14]],
        m1: 1.9999999999999716,
        m2: 1.4210854715202004e-14,
        b: 0
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}, { useRegIntercept: false }`, async function() {
        let k = 3
        let r = await regMpLine(kpArrX[k], kpArrY[k], { useRegIntercept: false })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 4
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0],
        [2],
        [4],
        [6],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515],
            [-1.4210854715202004e-14],
            [3.552713678800501e-15]
        ],
        m1: 2.0000000000000515,
        m2: -1.4210854715202004e-14,
        b: 3.552713678800501e-15,
        interpX: [0, 0],
        interpY: [3.552713678800501e-15]
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}, { interpX: [0, 0] }`, async function() {
        let k = 4
        let r = await regMpLine(kpArrX[k], kpArrY[k], { interpX: [0, 0] })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 5
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0],
        [2],
        [4],
        [6],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515],
            [-1.4210854715202004e-14],
            [3.552713678800501e-15]
        ],
        m1: 2.0000000000000515,
        m2: -1.4210854715202004e-14,
        b: 3.552713678800501e-15,
        interpX: [100, 0],
        interpY: [200.00000000000514]
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}, { interpX: [100, 0] }`, async function() {
        let k = 5
        let r = await regMpLine(kpArrX[k], kpArrY[k], { interpX: [100, 0] })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 6
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0],
        [2],
        [4],
        [6],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515],
            [-1.4210854715202004e-14],
            [3.552713678800501e-15]
        ],
        m1: 2.0000000000000515,
        m2: -1.4210854715202004e-14,
        b: 3.552713678800501e-15,
        interpX: [0, 100],
        interpY: [-1.4175327578413999e-12]
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}, { interpX: [0, 100] }`, async function() {
        let k = 6
        let r = await regMpLine(kpArrX[k], kpArrY[k], { interpX: [0, 100] })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    k = 7
    kpArrX[k] = [
        [0, 0],
        [1, 2],
        [2, 3],
        [3, 4],
    ]
    kpArrY[k] = [
        [0],
        [2],
        [4],
        [6],
    ]
    kpOut[k] = {
        coes: [
            [2.0000000000000515],
            [-1.4210854715202004e-14],
            [3.552713678800501e-15]
        ],
        m1: 2.0000000000000515,
        m2: -1.4210854715202004e-14,
        b: 3.552713678800501e-15
    }
    it(`should return ${JSON.stringify(kpOut[k])} when input ${JSON.stringify(kpArrX[k])}, ${JSON.stringify(kpArrY[k])}, { useSync: true }`, async function() {
        let k = 7
        let r = await regMpLine(kpArrX[k], kpArrY[k], { useSync: true })
        let rr = kpOut[k]
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input ''`, async function() {
        let r
        await regMpLine('')
            .catch((err) => {
                r = err
            })
        let rr = 'matX is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input []`, async function() {
        let r
        await regMpLine([])
            .catch((err) => {
                r = err
            })
        let rr = 'matX is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input {}`, async function() {
        let r
        await regMpLine({})
            .catch((err) => {
                r = err
            })
        let rr = 'matX is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input null`, async function() {
        let r
        await regMpLine(null)
            .catch((err) => {
                r = err
            })
        let rr = 'matX is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should catch when input undefined`, async function() {
        let r
        await regMpLine(undefined)
            .catch((err) => {
                r = err
            })
        let rr = 'matX is not an effective array'
        assert.strict.deepStrictEqual(r, rr)
    })

})
