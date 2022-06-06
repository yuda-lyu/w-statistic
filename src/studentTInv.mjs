
import ispint from 'wsemi/src/ispint.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import cint from 'wsemi/src/cint.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import jt from './jStat.mjs'


/**
 * 基於Student-T累加分布計算指定位置之反函數值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/studentTInv.test.js Github}
 * @memberOf w-statistic
 * @param {Number} n 輸入樣本數整數，需大於0
 * @param {Number} p 輸入信賴水準浮點數，需介於0至1之間
 * @returns {Number} 回傳反函數值
 * @example
 *
 * async function test() {
 *
 *     console.log(await studentTInv(35, 0.95))
 *     // => 1.6909241978049958
 *
 *     console.log(await studentTInv(35, 0.5))
 *     // => -0
 *
 *     console.log(await studentTInv(35, 0.05))
 *     // => -1.6909241978049974
 *
 *     console.log(await studentTInv(15, 0.95))
 *     // => 1.7613101151015698
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function studentTInv(n, p) {

    //check n
    if (!ispint(n)) {
        return Promise.reject(`n[${n}] is not positive integer`)
    }
    n = cint(n)
    if (n <= 1) {
        return Promise.reject(`n[${n}] <= 1`)
    }
    // console.log('n', n)

    //check p
    if (!isnum(p)) {
        p = 0.95
    }
    p = cdbl(p)
    if (p < 0) {
        return Promise.reject(`p[${p}] < 0`)
    }
    if (p > 1) {
        return Promise.reject(`p[${p}] > 1`)
    }

    //degrees of freedom為自由度, 為樣本數n-1
    let df = n - 1

    // //r, 等同於Excel的r=T.INV(p,df)
    // let studentt = await wd.Studentt(df)
    // let r = studentt.inv(p)
    let r = jt.studentt.inv(p, df)

    return r
}


export default studentTInv
