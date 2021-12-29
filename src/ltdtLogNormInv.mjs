import get from 'lodash/get'
import each from 'lodash/each'
import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import ispnum from 'wsemi/src/ispnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrLogNormInv from './arrLogNormInv.mjs'


/**
 * 計算物件陣列內指定鍵值時有效數字取對數(log)後之平均值和標準差，並基於常態累加分布計算指定位置之反函數取指數(exp)值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/ltdtLogNormInv.test.js Github}
 * @memberOf w-statistic
 * @param {Array} ltdt 輸入物件陣列，只提取指定鍵值時有效數字(或為字串的數字)進行計算
 * @param {String} key 輸入指定鍵字串
 * @param {Number} ratio 輸入指定位置浮點數，需介於0至1之間
 * @returns {Number} 回傳反函數取指數(exp)值
 * @example
 *
 * async function test() {
 *
 *     let ltdt
 *
 *     ltdt = [
 *         {
 *             'k': 0,
 *             'v': 6,
 *         },
 *         {
 *             'k': 1,
 *             'v': 47,
 *         },
 *         {
 *             'k': 2,
 *             'v': 49,
 *         },
 *         {
 *             'k': 3,
 *             'v': 15,
 *         },
 *         {
 *             'k': 4,
 *             'v': 42,
 *         },
 *         {
 *             'k': 5,
 *             'v': 41,
 *         },
 *         {
 *             'k': 6,
 *             'v': 7,
 *         },
 *         {
 *             'k': 7,
 *             'v': 39,
 *         },
 *         {
 *             'k': 8,
 *             'v': 43,
 *         },
 *         {
 *             'k': 9,
 *             'v': 40,
 *         },
 *         {
 *             'k': 10,
 *             'v': 36,
 *         },
 *     ]
 *     console.log(await ltdtLogNormInv(ltdt, 'v', 0.25))
 *     // => 16.096845206281877
 *
 *     ltdt = [
 *         {
 *             'k': 0,
 *             'v': 6,
 *         },
 *         {
 *             'k': 1,
 *             'v': 47,
 *         },
 *         {
 *             'k': 2,
 *             'v': 49,
 *         },
 *         {
 *             'k': 3,
 *             'v': 15,
 *         },
 *         {
 *             'k': 4,
 *             'v': 42,
 *         },
 *         {
 *             'k': 5,
 *             'v': 41,
 *         },
 *         {
 *             'k': 6,
 *             'v': 7,
 *         },
 *         {
 *             'k': 7,
 *             'v': 39,
 *         },
 *         {
 *             'k': 8,
 *             'v': 43,
 *         },
 *         {
 *             'k': 9,
 *             'v': 40,
 *         },
 *         {
 *             'k': 10,
 *             'v': 36,
 *         },
 *     ]
 *     console.log(await ltdtLogNormInv(ltdt, 'v', 0.5))
 *     // => 27.201738017491444
 *
 *     ltdt = [
 *         {
 *             'k': 0,
 *             'v': 6,
 *         },
 *         {
 *             'k': 1,
 *             'v': 47,
 *         },
 *         {
 *             'k': 2,
 *             'v': 49,
 *         },
 *         {
 *             'k': 3,
 *             'v': 15,
 *         },
 *         {
 *             'k': 4,
 *             'v': 42,
 *         },
 *         {
 *             'k': 5,
 *             'v': 41,
 *         },
 *         {
 *             'k': 6,
 *             'v': 7,
 *         },
 *         {
 *             'k': 7,
 *             'v': 39,
 *         },
 *         {
 *             'k': 8,
 *             'v': 43,
 *         },
 *         {
 *             'k': 9,
 *             'v': 40,
 *         },
 *         {
 *             'k': 10,
 *             'v': 36,
 *         },
 *     ]
 *     console.log(await ltdtLogNormInv(ltdt, 'v', 0.75))
 *     // => 45.96767513695641
 *
 *     ltdt = [
 *         {
 *             'k': 0,
 *             'v': 'abc'
 *         },
 *         {
 *             'k': 1,
 *             'v': '-2.5'
 *         },
 *         {
 *             'k': 2,
 *             'v': -2.5
 *         },
 *         {
 *             'k': 3,
 *             'v': '-1'
 *         },
 *         {
 *             'k': 4,
 *             'v': -1
 *         },
 *         {
 *             'k': 5,
 *             'v': '-0.1'
 *         },
 *         {
 *             'k': 6,
 *             'v': -0.1
 *         },
 *         {
 *             'k': 7,
 *             'v': '0'
 *         },
 *         {
 *             'k': 8,
 *             'v': 0
 *         },
 *         {
 *             'k': 9,
 *             'v': '0.1'
 *         },
 *         {
 *             'k': 10,
 *             'v': 0.1
 *         },
 *         {
 *             'k': 11,
 *             'v': '1'
 *         },
 *         {
 *             'k': 12,
 *             'v': 1
 *         },
 *         {
 *             'k': 13,
 *             'v': '2.5'
 *         },
 *         {
 *             'k': 14,
 *             'v': 2.5
 *         },
 *         {
 *             'k': 15,
 *             'v': 22.5
 *         },
 *         {
 *             'k': 16,
 *             'v': 'xyz'
 *         }
 *     ]
 *     console.log(await ltdtLogNormInv(ltdt, 'v', 0.5))
 *     // => 1.0499093195835956
 *
 *     ltdt = [
 *         {
 *             'k': 0,
 *             'v': 'abc'
 *         },
 *         {
 *             'k': 1,
 *             'v': '0'
 *         },
 *         {
 *             'k': 2,
 *             'v': 0
 *         },
 *         {
 *             'k': 3,
 *             'v': '0.1'
 *         },
 *         {
 *             'k': 4,
 *             'v': 0.1
 *         },
 *         {
 *             'k': 5,
 *             'v': '1'
 *         },
 *         {
 *             'k': 6,
 *             'v': 1
 *         },
 *         {
 *             'k': 7,
 *             'v': '2.5'
 *         },
 *         {
 *             'k': 8,
 *             'v': 2.5
 *         },
 *         {
 *             'k': 9,
 *             'v': 22.5
 *         },
 *         {
 *             'k': 10,
 *             'v': 'xyz'
 *         }
 *     ]
 *     console.log(await ltdtLogNormInv(ltdt, 'v', 0.5))
 *     // => 1.0499093195835956
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function ltdtLogNormInv(ltdt, key, ratio) {

    //check ltdt
    if (!isarr(ltdt)) {
        return Promise.reject('ltdt is not an array')
    }

    //check key
    if (!isestr(key)) {
        return Promise.reject(`key[${key}] is not a string`)
    }

    //check ratio
    if (!isnum(ratio)) {
        return Promise.reject(`ratio[${ratio}] is not a number`)
    }
    ratio = cdbl(ratio)
    if (ratio < 0) {
        return Promise.reject(`ratio[${ratio}] < 0`)
    }
    if (ratio > 1) {
        return Promise.reject(`ratio[${ratio}] > 1`)
    }

    //rs
    let rs = []
    each(ltdt, (v) => {
        let r = get(v, key)
        if (ispnum(r)) {
            r = cdbl(r)
            rs.push(r) //一定要為大於0數字才儲存
        }
    })

    //check
    if (size(rs) === 0) {
        return null
    }

    //arrLogNormInv
    let r = arrLogNormInv(rs, ratio)

    return r
}


export default ltdtLogNormInv
