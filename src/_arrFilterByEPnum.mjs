import filter from 'lodash-es/filter.js'
import arrFilterByENum from 'wsemi/src/arrFilterByENum.mjs'


//arrFilterByEPnum, 過濾陣列內元素僅保留大於0之有效數字(有限數)並轉數值, 供幾何平均等取log之函數使用(內部用, 不對外匯出)
//緣由: wsemi之Pnum系過濾函數(取大於0者)基於isnum/cdbl, 會把+Infinity夾為Number.MAX_VALUE而被計入; 本套件之統計量只取有限數值(規則帳本R3),
//      故有限數之判定交給wsemi之arrFilterByENum(基於isenum), 此處只再保留大於0者
function arrFilterByEPnum(arr) {

    //有效數字(有限數), 已轉數值
    let rs = arrFilterByENum(arr)

    //大於0
    rs = filter(rs, (v) => {
        return v > 0
    })

    return rs
}


export default arrFilterByEPnum
