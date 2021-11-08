import assert from 'assert'
import arrCount from '../src/arrCount.mjs'


describe(`arrCount`, function() {

    let rr1 = [
        { '2.5': 2, 'key': '2.5', 'count': 2 },
        { '0.1': 2, 'key': '0.1', 'count': 2 },
        { '-0.1': 2, 'key': '-0.1', 'count': 2 },
        { '-1': 2, 'key': '-1', 'count': 2 },
        { '-2.5': 2, 'key': '-2.5', 'count': 2 },
        { '1': 2, 'key': '1', 'count': 2 },
        { '0': 2, 'key': '0', 'count': 2 },
        { '22.5': 1, 'key': '22.5', 'count': 1 }
    ]
    it(`should return ${JSON.stringify(rr1)} when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrCount(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = rr1
        assert.strict.deepStrictEqual(r, rr)
    })

    let rr2 = [
        { '2.5': 2, 'key': '2.5', 'count': 2 },
        { '0.1': 2, 'key': '0.1', 'count': 2 },
        { '1': 2, 'key': '1', 'count': 2 },
        { '0': 2, 'key': '0', 'count': 2 },
        { '22.5': 1, 'key': '22.5', 'count': 1 }
    ]
    it(`should return ${JSON.stringify(rr2)} when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']`, function() {
        let r = arrCount(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'])
        let rr = rr2
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input ''`, function() {
        let r = arrCount('')
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input []`, function() {
        let r = arrCount([])
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input {}`, function() {
        let r = arrCount({})
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input null`, function() {
        let r = arrCount(null)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

    it(`should return [] when input undefined`, function() {
        let r = arrCount(undefined)
        let rr = []
        assert.strict.deepStrictEqual(r, rr)
    })

})
