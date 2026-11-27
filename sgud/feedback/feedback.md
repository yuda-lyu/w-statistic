# 回饋

本檔記載任務中發現之自有套件、全域技能、全域設定之調整與抽提提案,只增不改,處置結果另記一列.

| 日期 | 類別 | 對象 | 內容 | 依據 |
|---|---|---|---|---|
| 2026-11-28 | 自有套件 | wsemi `arrFilterByPnum`、`arrFilterByPnumAndToLog`(及 `ispnum`) | 這兩個函式基於 `ispnum`/`cdbl`,`+Infinity` 被夾為 `Number.MAX_VALUE` 後計入(取 log 得 709.78);wsemi 已有 `arrFilterByENum`(基於 `isenum`)但無「有限且大於 0」之對應.建議新增 `arrFilterByEPnum`、`arrFilterByEPnumAndToLog`,並於 `arrFilterByNum`、`arrFilterByPnum`、`arrFilterByPnumAndToLog` 之 JSDoc 註明「`±Infinity` 會被夾為 `±Number.MAX_VALUE`,計算類請改用 ENum 系」.本套件暫以內部 `src/_arrFilterByEPnum.mjs`、`src/_arrFilterByEPnumAndToLog.mjs`(組合 `arrFilterByENum` 與 `v > 0`)替代,wsemi 新增後改用之 | `node_modules/wsemi/src/arrFilterByPnum.mjs`(ispnum+cdbl)、`src/_arrFilterByEPnum.mjs`;修前 `arrGeometricAverage([1, Infinity])` 得 1.34e154(應為 1) |
| 2026-11-28 | 全域技能 | role-researcher-for-calculation Step 3(數值穩健性盤點) | 盤點表之「NaN 與無限大」列只講 `x \|\| 0` 吞 NaN 與比較式放行 NaN,未列「轉型/夾取函式把 `±Infinity` 轉為有限值」一類(`cdbl`、lodash `toFinite` 把 `±Infinity` 夾為 `±Number.MAX_VALUE`,結果有限而錯,`Number.isFinite` 檢查攔不到).建議增列此項,並提示盤點「±Infinity 如何進入計算」須含運算產生者(`Math.log(0)`、除以 0),不只輸入端 | 本輪 `regPower` 取 log 陣列取自未過濾之原陣列,`0`、`''`、`null`、`false` 取 log 為 `-Infinity` 再被 `regLine` 夾為 `-Number.MAX_VALUE`(`sgud/rule/rulebook.md` R3 之 S14) |
| 2026-11-09 | 全域設定 | 第三方依賴跨主版號升版之調研與派工流程 | 升版調研之「破壞性變更」欄僅依上游 changelog 條列,simple-statistics 7.8.8→8.0.0 之條列未含 `quantile` 改為線性內插、`linearRegression` 改以平均值置中,實際升版後 `arrQuartile` 結果改變才被全套測試發現.建議升版派工須求:對各套件實際呼叫之依賴函式,以舊版隔離副本(`npm pack` 解壓至 `./tmp`)做舊新差異比對,而非只依 changelog | 升版後全套 2 案紅(`test/arrQuartile.test.mjs` 之 0.25、0.75 分位數 15→25.5、43→42.5);差異比對 72 萬筆中 8.0.0 之 `quantile` 有 40 萬筆與 7.8.8 不同;見 `sgud/exp/experience.md` |
