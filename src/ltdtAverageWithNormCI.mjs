import get from 'lodash/get'
import each from 'lodash/each'
import size from 'lodash/size'
import isarr from 'wsemi/src/isarr.mjs'
import isnum from 'wsemi/src/isnum.mjs'
import isestr from 'wsemi/src/isestr.mjs'
import cdbl from 'wsemi/src/cdbl.mjs'
import arrAverageWithNormCI from './arrAverageWithNormCI.mjs'


/**
 * 計算物件陣列內指定鍵值時有效數字之平均值和標準差，並基於司徒頓t累加分布之信賴水準(p)以及指定左右單尾條件下，計算樣本平均值。此時左尾代表樣本平均值可小於等於母數平均值，而右尾代表樣本平均值可大於等於母數平均值
 *
 * Unit Test: {@link https://github.com/yuda-lyu/w-statistic/blob/master/test/ltdtAverageWithNormCI.test.js Github}
 * @memberOf w-statistic
 * @param {Array} ltdt 輸入物件陣列，只提取指定鍵值時有效數字(或為字串的數字)進行計算
 * @param {String} key 輸入指定鍵字串
 * @param {Number} p 輸入信賴水準浮點數，需介於0至1之間
 * @param {String} mode 輸入檢定模式字串，可選'two-tailed'、'upper-tail'、'lower-tail'，預設'two-tailed'
 * @returns {Number} 回傳樣本平均值
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.95))
 *     // => [ 33.48954903620696, 32.8740873274294 ]
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.95, 'upper-tail'))
 *     // => 41.85625505621444
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.95, 'lower-tail'))
 *     // => 24.507381307421923
 *
 *     ltdt = [
 *         {
 *             'k': 0,
 *             'v': 18.7261764705882,
 *         },
 *         {
 *             'k': 1,
 *             'v': 18.6629411764705,
 *         },
 *         {
 *             'k': 2,
 *             'v': 19.3983050847457,
 *         },
 *         {
 *             'k': 3,
 *             'v': 18.5099999999999,
 *         },
 *         {
 *             'k': 4,
 *             'v': 18.9986446886446,
 *         },
 *         {
 *             'k': 5,
 *             'v': 18.9083937823834,
 *         },
 *         {
 *             'k': 6,
 *             'v': 19.1957837837837,
 *         },
 *         {
 *             'k': 7,
 *             'v': 19.0423529411764,
 *         },
 *         {
 *             'k': 8,
 *             'v': 19.2320588235294,
 *         },
 *         {
 *             'k': 9,
 *             'v': 18.8526470588235,
 *         },
 *         {
 *             'k': 10,
 *             'v': 18.7982198952879,
 *         },
 *         {
 *             'k': 11,
 *             'v': 19.0423529411764,
 *         },
 *         {
 *             'k': 12,
 *             'v': 19.075,
 *         },
 *         {
 *             'k': 13,
 *             'v': 18.945238095238,
 *         },
 *         {
 *             'k': 14,
 *             'v': 20.6691240875912,
 *         },
 *     ]
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.95, 'upper-tail'))
 *     // => 19.297020893539198
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.25))
 *     // => [ 39.026745114674725, 27.33689124896163 ]
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.5))
 *     // => [ 36.53111791210903, 29.832518451527324 ]
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.75))
 *     // => [ 34.74951166569836, 31.614124697938003 ]
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.5))
 *     // => [ 2.5700668400779687, 0.42993315992203107 ]
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
 *     console.log(await ltdtAverageWithNormCI(ltdt, 'v', 0.5))
 *     // => [ 5.011682286477021, 1.5883177135229787 ]
 *
 * }
 * test()
 *     .catch((err) => {
 *         console.log(err)
 *     })
 *
 */
async function ltdtAverageWithNormCI(ltdt, key, p, mode = 'two-tailed') {

    //check ltdt
    if (!isarr(ltdt)) {
        return Promise.reject('ltdt is not an array')
    }

    //check key
    if (!isestr(key)) {
        return Promise.reject(`key[${key}] is not a string`)
    }

    //check p
    if (!isnum(p)) {
        return Promise.reject(`p[${p}] is not a number`)
    }
    p = cdbl(p)
    if (p < 0) {
        return Promise.reject(`p[${p}] < 0`)
    }
    if (p > 1) {
        return Promise.reject(`p[${p}] > 1`)
    }

    //check mode
    if (mode !== 'two-tailed' && mode !== 'upper-tail' && mode !== 'lower-tail') {
        return Promise.reject(`mode[${mode}] is not 'two-tailed', 'upper-tail' or 'lower-tail'`)
    }

    //rs
    let rs = []
    each(ltdt, (v) => {
        let r = get(v, key)
        if (isnum(r)) {
            r = cdbl(r)
            rs.push(r) //一定要為數字才儲存
        }
    })

    //check
    if (size(rs) === 0) {
        return Promise.reject(`no effective data`)
    }

    //arrAverageWithNormCI
    let r = await arrAverageWithNormCI(rs, p, mode)

    return r
}


export default ltdtAverageWithNormCI
