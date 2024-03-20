import get from 'lodash-es/get'
import * as ss from 'simple-statistics'


function getDefault(m) {
    if (get(m, 'default.default')) {
        return m.default.default
    }
    else if (get(m, 'default')) {
        return m.default
    }
    return m
}

let simpleStatistics = getDefault(ss)


export default simpleStatistics
