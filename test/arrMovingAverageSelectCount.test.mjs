import assert from 'assert'
import arrMovingAverage from '../src/arrMovingAverage.mjs'
import assertApprox from './tools/assertApprox.mjs'


//以定義計算: 每點取[k-nBefore, k+nAfter]並於邊界截斷後平均(偶數N前取N/2點、後取N/2-1點)
let ref = (arr, N) => {
    let nBefore = Math.floor(N / 2)
    let nAfter = N - 1 - nBefore
    return arr.map((v, k) => {
        let s = Math.max(k - nBefore, 0)
        let e = Math.min(k + nAfter, arr.length - 1)
        let t = 0
        for (let i = s; i <= e; i++) {
            t += arr[i]
        }
        return t / (e - s + 1)
    })
}


describe(`arrMovingAverage selectCount`, function() {

    it(`selectCount 4 (偶數) 恰取 4 點, 前 2 後 1, 邊界截斷`, function() {
        let r = arrMovingAverage([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { selectCount: 4 })
        assertApprox(r, [1.5, 2, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9])
    })

    it(`selectCount 5 (奇數) 與 selectCountHalf 2 逐值相同`, function() {
        let a = ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz']
        assert.deepStrictEqual(arrMovingAverage(a, { selectCount: 5 }), arrMovingAverage(a, { selectCountHalf: 2 }))
    })

    it(`selectCount 1 回傳原值`, function() {
        let r = arrMovingAverage([3, 1, 4, 1, 5], { selectCount: 1 })
        assertApprox(r, [3, 1, 4, 1, 5])
    })

    it(`selectCount 優先於 selectCountHalf`, function() {
        let r = arrMovingAverage([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { selectCount: 4, selectCountHalf: 3 })
        assertApprox(r, [1.5, 2, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9])
    })

    it(`selectCount 非正整數(0、-1、2.5、'abc')時沿用 selectCountHalf`, function() {
        let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let rr = arrMovingAverage(a, { selectCountHalf: 1 })
        for (let v of [0, -1, 2.5, 'abc']) {
            assert.deepStrictEqual(arrMovingAverage(a, { selectCount: v, selectCountHalf: 1 }), rr)
        }
    })

    it(`常用點數(5、10、20、50、100、250、500、750、1000)於 3000 點序列皆與定義相同`, function() {
        let a = []
        let s = 7
        for (let i = 0; i < 3000; i++) {
            s = (s * 16807) % 2147483647
            a.push((s % 10000) / 1000 - 5)
        }
        for (let N of [5, 10, 20, 50, 100, 250, 500, 750, 1000]) {
            let r = arrMovingAverage(a, { selectCount: N })
            let rr = ref(a, N)
            let err = Math.max(...r.map((v, k) => Math.abs(v - rr[k])))
            assert.ok(err < 1e-9, `N=${N} 最大誤差 ${err}`)
        }
    })

    it(`mode SMA、EMA 不受 selectCount 影響`, function() {
        let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        for (let mode of ['SMA', 'EMA']) {
            assert.deepStrictEqual(arrMovingAverage(a, { mode, selectCountHalf: 3, selectCount: 4 }), arrMovingAverage(a, { mode, selectCountHalf: 3 }))
        }
    })

})
