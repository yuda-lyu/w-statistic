import map from 'lodash-es/map.js'
import arrFilterByEPnum from './_arrFilterByEPnum.mjs'


//arrFilterByEPnumAndToLog, 過濾陣列內元素僅保留大於0之有效數字(有限數)並取自然對數(內部用, 不對外匯出)
//緣由: wsemi之Pnum系過濾函數(取大於0者)基於isnum/cdbl, 會把+Infinity夾為Number.MAX_VALUE而被計入(取log得709.78); 見_arrFilterByEPnum.mjs
function arrFilterByEPnumAndToLog(arr) {

    //大於0之有效數字
    let rs = arrFilterByEPnum(arr)

    //自然對數, js的Math.log為ln, 以自然指數e為基底
    rs = map(rs, (v) => {
        return Math.log(v)
    })

    return rs
}


export default arrFilterByEPnumAndToLog
