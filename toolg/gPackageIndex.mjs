import fs from 'fs'
import _ from 'lodash-es'
import getFiles from 'w-package-tools/src/getFiles.mjs'


let fd = './src/'
let fnIndex = 'WStatistic.mjs'


function main() {
    //由src內取得指定函數檔案, 再自動產生WGeo.mjs, 供rollup編譯之用

    //getFiles
    let ltfs = getFiles(fd)

    //pull
    _.pull(ltfs, '_class.mjs', 'WStatistic.mjs')

    //get names
    let ns = _.map(ltfs, function(v) {
        return v.replace('.mjs', '')
    })

    //scs
    let scs = []
    _.each(ns, function(name) {
        //let sc = `export ${name} from './${name}.mjs'` //stage1語法, 需要安裝@babel/plugin-proposal-export-default-from
        let sc = `export { default as ${name} } from './${name}.mjs'`
        scs.push(sc)
    })

    //merge content
    let c = _.join(scs, '\r\n')

    //write
    //console.log(c)
    fs.writeFileSync(fd + fnIndex, c, 'utf8')

}
main()
