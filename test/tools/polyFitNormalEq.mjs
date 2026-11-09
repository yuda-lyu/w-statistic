//說明: 供測試以「獨立方法」驗證多項式回歸係數: 以正規方程式(V^T V c = V^T y)搭配部分選主元之高斯消去法求解最小平方法係數,
//      不使用ml-regression-polynomial(其為LU分解), 故為不同演算法之獨立對照.
//限制: 正規方程式之條件數為Vandermonde矩陣之平方, 僅適用低次(<=3)且x量級不大之測試資料, 比對時須用較寬之相對容差(如1e-9).


/**
 * 以正規方程式求多項式最小平方法係數
 *
 * @param {Array} xs 輸入x陣列
 * @param {Array} ys 輸入y陣列
 * @param {Number} degree 輸入次數(正整數)
 * @returns {Array} 回傳係數陣列[b, m1, m2, ...], 索引k為x^k之係數
 */
function polyFitNormalEq(xs, ys, degree) {
    let m = degree + 1

    //增廣矩陣A=[V^T V | V^T y]
    let A = []
    for (let i = 0; i < m; i++) {
        let row = []
        for (let j = 0; j < m; j++) {
            let s = 0
            for (let k = 0; k < xs.length; k++) {
                s += xs[k] ** (i + j)
            }
            row.push(s)
        }
        let t = 0
        for (let k = 0; k < xs.length; k++) {
            t += ys[k] * xs[k] ** i
        }
        row.push(t)
        A.push(row)
    }

    //高斯消去(部分選主元)
    for (let c = 0; c < m; c++) {
        let p = c
        for (let r = c + 1; r < m; r++) {
            if (Math.abs(A[r][c]) > Math.abs(A[p][c])) {
                p = r
            }
        }
        let tmp = A[c]
        A[c] = A[p]
        A[p] = tmp
        for (let r = c + 1; r < m; r++) {
            let f = A[r][c] / A[c][c]
            for (let j = c; j <= m; j++) {
                A[r][j] -= f * A[c][j]
            }
        }
    }

    //回代
    let x = new Array(m).fill(0)
    for (let i = m - 1; i >= 0; i--) {
        let s = A[i][m]
        for (let j = i + 1; j < m; j++) {
            s -= A[i][j] * x[j]
        }
        x[i] = s / A[i][i]
    }

    return x
}


export default polyFitNormalEq
