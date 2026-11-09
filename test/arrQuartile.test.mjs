import arrQuartile from '../src/arrQuartile.mjs'
import assertApprox from './tools/assertApprox.mjs'


describe(`arrQuartile`, function() {

    it(`should return 15 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25`, function() {
        let r = arrQuartile([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.25)
        let rr = 15
        assertApprox(r, rr)
    })

    it(`should return 40 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5`, function() {
        let r = arrQuartile([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.5)
        let rr = 40
        assertApprox(r, rr)
    })

    it(`should return 43 when input [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75`, function() {
        let r = arrQuartile([6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36], 0.75)
        let rr = 43
        assertApprox(r, rr)
    })

    it(`should return 0 when input ['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, function() {
        let r = arrQuartile(['abc', '-2.5', -2.5, '-1', -1, '-0.1', -0.1, '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 0
        assertApprox(r, rr)
    })

    it(`should return 1 when input ['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5`, function() {
        let r = arrQuartile(['abc', '0', 0, '0.1', 0.1, '1', 1, '2.5', 2.5, 22.5, 'xyz'], 0.5)
        let rr = 1
        assertApprox(r, rr)
    })

    it(`should return null when input ''`, function() {
        let r = arrQuartile('')
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input []`, function() {
        let r = arrQuartile([])
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input {}`, function() {
        let r = arrQuartile({})
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input null`, function() {
        let r = arrQuartile(null)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input undefined`, function() {
        let r = arrQuartile(undefined)
        let rr = null
        assertApprox(r, rr)
    })

    //以下為arrQuartile.mjs之JSDoc範例(母體分位數: 位置n*p非整數時取x[ceil(n*p)-1]), 與simple-statistics 8.0.0之quantile(線性內插)結果不同, 須維持既有語意

    it(`should return 7 when input [3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.25`, function() {
        //JSDoc範例1: n*p=2.5非整數, 取x[2]
        let r = arrQuartile([3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.25)
        let rr = 7
        assertApprox(r, rr)
    })

    it(`should return 9 when input [3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.5`, function() {
        //JSDoc範例2: n*p=5為整數且n為偶數, 取x[4]與x[5]之平均
        let r = arrQuartile([3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.5)
        let rr = 9
        assertApprox(r, rr)
    })

    it(`should return 15 when input [3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.75`, function() {
        //JSDoc範例3: n*p=7.5非整數, 取x[7]
        let r = arrQuartile([3, 6, 7, 8, 8, 10, 13, 15, 16, 20], 0.75)
        let rr = 15
        assertApprox(r, rr)
    })

    it(`should return 2 when input [1, 2, 3, 4, 5, 6], 0.25`, function() {
        //JSDoc範例4: n*p=1.5非整數, 取x[1]
        let r = arrQuartile([1, 2, 3, 4, 5, 6], 0.25)
        let rr = 2
        assertApprox(r, rr)
    })

    it(`should return 9 when input [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5`, function() {
        //JSDoc範例5: n*p=5.5非整數, 取x[5]
        let r = arrQuartile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5)
        let rr = 9
        assertApprox(r, rr)
    })

    it(`should return 2.5 when input [1, 2, 3, 4], 0.5`, function() {
        //定義推導: n=4,p=0.5, n*p=2為整數且n為偶數, 取x[1]與x[2]之平均=(2+3)/2
        let r = arrQuartile([1, 2, 3, 4], 0.5)
        let rr = 2.5
        assertApprox(r, rr)
    })

    it(`should return 3 when input [1, 2, 3, 4, 5], 0.4`, function() {
        //定義推導: n=5,p=0.4, n*p=2為整數且n為奇數, 取x[2]
        let r = arrQuartile([1, 2, 3, 4, 5], 0.4)
        let rr = 3
        assertApprox(r, rr)
    })

    it(`should return 4 when input [1, 2, 3, 4, 5], 0.6`, function() {
        //定義推導: n=5,p=0.6, n*p=3為整數且n為奇數, 取x[3]
        let r = arrQuartile([1, 2, 3, 4, 5], 0.6)
        let rr = 4
        assertApprox(r, rr)
    })

    it(`should return 5 when input [5, 1, 4, 2, 3], 1`, function() {
        //定義推導: p=1取最大值, 且輸入未排序
        let r = arrQuartile([5, 1, 4, 2, 3], 1)
        let rr = 5
        assertApprox(r, rr)
    })

    it(`should return 7 when input [7], 0.3`, function() {
        //定義推導: 僅1筆有效資料, 任何分位數皆為該值
        let r = arrQuartile([7], 0.3)
        let rr = 7
        assertApprox(r, rr)
    })

    it(`should return same result when input shuffled array`, function() {
        //定義推導: 結果與輸入順序無關
        let a = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
        let b = [36, 40, 43, 39, 7, 41, 42, 15, 49, 47, 6]
        assertApprox(arrQuartile(a, 0.25), arrQuartile(b, 0.25))
        assertApprox(arrQuartile(a, 0.75), arrQuartile(b, 0.75))
    })

    it(`should not mutate input array`, function() {
        //定義推導: 計算分位數不得改動呼叫端之陣列
        let a = [6, 47, 49, 15, 42, 41, 7, 39, 43, 40, 36]
        let b = [...a]
        arrQuartile(a, 0.25)
        assertApprox(a, b)
    })

    //空輸入: 本套件既有對外語意為回傳null, 不丟錯(simple-statistics 8.0.0對空輸入改丟錯, 故於本函式內先判空)

    it(`should return null when input ['abc', 'xyz'], 0.5`, function() {
        //陣列內無任何有效數字
        let r = arrQuartile(['abc', 'xyz'], 0.5)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input [null, undefined, 'a', {}, []], 0.5`, function() {
        //陣列內無任何有效數字
        let r = arrQuartile([null, undefined, 'a', {}, []], 0.5)
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input [1, 2, 3] without ratio`, function() {
        let r = arrQuartile([1, 2, 3])
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input [1, 2, 3], 'abc'`, function() {
        let r = arrQuartile([1, 2, 3], 'abc')
        let rr = null
        assertApprox(r, rr)
    })

    it(`should return null when input [], 0.5`, function() {
        //空陣列且有給ratio
        let r = arrQuartile([], 0.5)
        let rr = null
        assertApprox(r, rr)
    })

})
