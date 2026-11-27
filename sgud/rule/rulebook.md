# 規則帳本

本檔為套件設計與開發階段之規則帳本(藍圖),為要求程式碼須長成什麼樣,或由規格產出之測試(項目/說明/流程)有哪些,包含軸、單一擁有者、已知限制、破壞性變更紀錄,以及對應是哪些測試檔案或指令等,由agent自行編列、擴充與維護.當前已做到哪些記於`sgud/state/state.md`.過長時依類型拆為`rulebook_<類型>.md`,本檔只留索引.

## R1 第三方統計依賴之呼叫與空輸入語意

**規則**:本套件對外函式之結果與空輸入語意,不得隨第三方依賴之升版而改變;依賴之行為變更須在本套件內吸收(自行判空、自行實作原演算法),或明確列為破壞性變更經裁示後才改.

**站點全集**(盤點指令: Grep 工具搜 `ss\.|from 'simple-statistics'|from 'ml-regression` 於 `src/`):

| 站點 | 依賴函式 | 判定 | 說明 |
|---|---|---|---|
| `src/arrQuartile.mjs` | (原 `ss.quantile`) | 已套:自行實作 | simple-statistics 8.0.0 之 `quantile` 由「母體分位數(位置 n*p 非整數取 `x[ceil(n*p)-1]`)」改為線性內插(R type=7),同輸入結果不同;本函式 JSDoc 範例與既有測試皆為母體分位數,故於 `quantileSorted`(檔內區域函式)維持原演算法,不再委由依賴 |
| `src/regLine.mjs` | `linearRegression`, `linearRegressionLine`, `rSquared` | 已套:沿用依賴 | 8.0.0 之 `linearRegression` 改以平均值置中累加(數值更穩定,末位差異約 1e-14;x 偏移 1e9 時 7.8.8 得 NaN、8.0.0 正確) |
| `src/regPower.mjs` | `rSquared`(內部呼叫 `regLine`) | 已套:沿用依賴 | 同上 |
| `src/regPoly.mjs` | `rSquared`, `PolynomialRegression`(ml-regression-polynomial) | 已套:沿用依賴 | ml-regression-polynomial 4.0.0 為 ESM-only,本檔早已 `import`;3.0.2 與 4.0.0 於 6000 組隨機輸入下係數與 predict 逐位相同 |
| `src/WStatistic.mjs:25` | 整個 simple-statistics 模組(透傳為 `simpleStatistics`) | 刻意不套:不包裝 | 本套件未對透傳面之函式另做承諾;`quantileRank`/`quantileRankSorted`/`minSorted`/`maxSorted`/`extentSorted` 空輸入於 8.0.0 改丟錯(原回 NaN/undefined)、`inverseErrorFunction`/`probit` 精度提高,皆隨上游 |

**空輸入語意**(本套件對外承諾,測試須涵蓋):

- `arrQuartile`:`arr` 非陣列、空陣列、陣列內無有效數字、`ratio` 缺漏或非數字 → 回傳 `null`,不丟錯.
- `regLine`/`regPoly`/`regPower`:`arr` 非有效陣列 → reject(同步版丟錯)`arr is not an effective array`;陣列內無有效數據點 → `no effective data`;`regPoly` 之 `degree` 非正整數 → `degree[<值>] is not an integer`.

**測試**(指令:`npx mocha --no-parallel test/<檔>.test.mjs --timeout 180000`,全套 `npm test`):

| 規則內容 | 測試檔 |
|---|---|
| arrQuartile 母體分位數(JSDoc 範例與定義推導值)、空輸入皆回 null | `test/arrQuartile.test.mjs` |
| regLine 完全直線、x 偏移 1e9、單點、無有效數據 | `test/regLine.test.mjs` |
| regPoly 完全多項式還原、與獨立解法(正規方程式,`test/tools/polyFitNormalEq.mjs`)一致、無有效數據、點數不足、degree 非法 | `test/regPoly.test.mjs` |
| regPower 完全冪函數、無有效數據 | `test/regPower.test.mjs` |
| 透傳面 `simpleStatistics`:函式存在、8.0.0 空輸入丟錯、`probit`/`inverseErrorFunction` 對獨立參考值 | `test/simpleStatistics.test.mjs` |

**升版審查規則**(第三方依賴跨主版號升版時):不可只依上游 changelog 條列;須以舊版隔離副本(`npm pack <套件>@<舊版> --pack-destination ./tmp/...` 解壓)對本套件實際呼叫之函式做差異比對,見經驗檔.

**R2 ESM-only 依賴**:`ml-regression-polynomial` 4.x 為 ESM-only,一律以 `import` 引入,不得 `require`.盤點:Grep `require\(.ml-regression` 於 `src/`、`toolg/` 須為 0 筆(現況 0 筆).

## R3 統計量只取有限數值(`±Infinity` 不計入)

**規則**:本套件之統計量(平均、標準差、分位數、直方圖、分布擬合、迴歸、移動平均等)只取有限數值.`±Infinity`(含 `'Infinity'`、`'-Infinity'`、`'+Infinity'`、`'1e400'`、`'-1e400'` 等字串寫法)與非數值同樣排除:不入個數、不入計算;以選項給予之 `±Infinity`(`opt.min`、`opt.max`、`opt.dx`、`opt.interpX`)視為未給;迴歸之點若 x 或 y 為 `±Infinity` 則整點不計入.全部被排除時依各函數現行之「無可用數值」處置(`null`、`[]`、reject、拋錯),與全為非數值者相同.

**寫法**:取有限數值一律用 wsemi 之 `isenum`(單值判定,通過後取值用 `Number(v)`)或 `arrFilterByENum`(陣列),不自寫判定;須再取大於 0 者(幾何平均、取 log)用檔內共用函式 `src/_arrFilterByEPnum.mjs`、`src/_arrFilterByEPnumAndToLog.mjs`(內部呼叫 `arrFilterByENum` 再保留 `v > 0`,不對外匯出).不得再用 `isnum`、`cdbl`、`arrFilterByNum`、`arrFilterByPnum`、`arrFilterByPnumAndToLog` 取資料值:wsemi 之 `isnum` 依數學定義收 `Infinity`,`cdbl` 依其文件把 `±Infinity` 夾為 `±Number.MAX_VALUE`,故 `[1, Infinity]` 被當成 `[1, 1.797e308]`(修前 `arrAverage([1, Infinity])` 得 `8.99e307`).

**盤點指令**(Grep 工具,於 `src/`):`arrFilterByNum|arrFilterByPnum|arrFilterByPnumAndToLog` 須為 0 筆;`cdbl|isnum` 之 import 僅限下表「刻意不改」所列之檔;`isenum|arrFilterByENum` 為取資料值之站點.以上三項由 `test/nonFinite.test.mjs` 之「原始碼掃描」自動檢查(以各檔釘住,新增或消失皆須同步本表).

**站點全集**(2026-11-28 盤點,讀碼加修前實測):

| # | 站點 | 取值方式(修前) | 判定 | 說明 |
|---|---|---|---|---|
| S1 | `arrAverage`:42 | `arrFilterByNum` | 已套 | 修前 `[1, Infinity]` 得 8.99e307 |
| S2 | `arrStd`:46 | `isnum`+`cdbl` | 已套 | 修前 `[1,2,Infinity]` 得 `NaN`(離散平方和溢位) |
| S3 | `arrAverageWithNormCI`:98 | `arrFilterByNum`(取 n) | 已套 | n 含 `Infinity`;平均與標準差經 S1、S2 |
| S4 | `arrNormInv`:82 | `arrFilterByNum` | 已套 | 回傳之 `arr` 含 `Number.MAX_VALUE` |
| S5 | `arrQuartile`:108 | `arrFilterByNum` | 已套 | 修前 `[1,2,3,Infinity]` 之最大分位得 `Number.MAX_VALUE` |
| S6 | `arrGammaFit`:644 | `arrFilterByNum`+`v>0` | 已套 | `+Infinity` 受影響;`-Infinity` 修前已被 `v>0` 排除 |
| S7 | `arrGammaHist`:46 | 同上 | 已套 | 同上;`arrGammaInv` 經 S6 |
| S8 | `bin`:107 | `arrFilterByNum` | 已套 | `histGen`、`arrNormHist`、`arrLogNormHist`、`arrGammaHist` 之分組皆經此 |
| S9 | `bin`:116-127(`opt.min`、`opt.max`) | `isnum`+`cdbl` | 已套 | `±Infinity` 修前當 `±Number.MAX_VALUE` 區間端點;現視為未給 |
| S10 | `histGen`:248 | `arrFilterByNum` | 已套 | |
| S11 | `histGen`:274、321(`opt.dx`,兩處判定) | `isnum`+`cdbl` | 已套 | `dx=Infinity` 修前得無意義分組;現視為未給 |
| S12 | `regLine`(點、`opt.interpX`) | `isnum`+`cdbl` | 已套 | |
| S13 | `regPoly`(點、`opt.interpX`) | 同上 | 已套 | |
| S14 | `regPower`(點、`opt.interpX`) | 同上 | 已套 | 另:擬合用之取 log 陣列來自未過濾之原陣列,`0`、`''`、`null`、`false` 取 log 為 `-Infinity`,修前被 `regLine` 夾為 `-Number.MAX_VALUE` 而算出錯值;`regLine` 改後此類點被排除(結果與只含正值者相同),`regPower` 該處取值未動 |
| S15 | `arrMovingAverage`:169(EMA 首點) | `cdbl` | 已套 | 非有限首點與非數值同樣取 0;PMA、SMA 經 `arrAverage`(S1)已套 |
| S16 | `arrGeometricAverage`:38 | `arrFilterByPnum` | 已套 | `+Infinity` 修前當 `Number.MAX_VALUE`;`-Infinity` 修前已被 `>0` 排除 |
| S17 | `arrGeometricStd`:38 | `arrFilterByPnumAndToLog` | 已套 | 同上 |
| S18 | `arrLogNormInv`:82 | 同上 | 已套 | |
| S19 | `arrAverageWithLogNormCI`:95 | 同上 | 已套 | |
| S20 | `arrLogNormHist`:916 | 同上 | 已套 | |
| S21 | `ratio`/`p` 參數:`arrQuartile`、`arrNormInv`、`arrLogNormInv`、`arrGammaInv`、`arrAverageWithNormCI`、`arrAverageWithLogNormCI`、`studentTInv` | `isnum`/`ispnum`+`cdbl` 後範圍檢核 | 刻意不改 | `±Infinity` 夾為 `±Number.MAX_VALUE` 後必落在 `[0,1]` 之外:除 `arrQuartile`(夾回 0 或 1,與大於 1 者同)外皆被範圍檢核拒收;改為視同非數值反而會在 `studentTInv` 退為預設 0.95 而算出值.訊息之值為夾後之值(原行為) |
| S22 | `sampleRandom`:285-299(`opt.low`、`opt.up`) | `isnum`+`cdbl` | 刻意不改 | 可行邊界(下界 `-Infinity`、上界 `+Infinity`)夾後等同無界,結果正確;不可行邊界(下界 `+Infinity`、上界 `-Infinity`)修前即因全部取樣被拒而遞迴至堆疊溢位(拒收);改為視同未給會把不可行約束靜默吞掉 |
| S23 | `arrCount`:65 | `isnum`‖`isestr` 後 `cstr` | 刻意不改 | 類別計次,不做數值計算,`Infinity` 與 `'Infinity'` 為同一類別 |
| S24 | 整數參數 `n`、`nCurve`、`selectCount`、`selectCountHalf`、`degree`、`num` | `ispint`/`isp0int`(`isint`,限安全整數)+`cint` | 刻意不改 | `Infinity` 非安全整數,於判定即被擋,不經 `cint` 夾取.`sampleRandom` 之 `num` 未經判定直接 `cint`(`Infinity` 得 `Number.MAX_VALUE`),實測回傳空陣列(lodash `times` 對大於安全整數者回 `[]`),非計算錯值,屬範圍外 |
| S25 | `arrGammaFit`:620-628(`opt.shape0`、`opt.scale0`) | `isnum`,原值用於起點 | 範圍外 | 不經 `cdbl`;`Infinity` 起點被最佳化器拒收(`invalid params[0]: must be a valid number`) |
| S26 | `regMpLine`、`simpleStatistics`、`jStat` 透傳 | 不經 `cdbl` | 範圍外 | 輸入原樣交第三方,`±Infinity` 之結果為 `NaN`/拋錯,不偽裝成有限值(見 R1) |

**破壞性變更**(2026-11-28,允許:先前結果為錯值,無使用端可依賴):
1. 含 `±Infinity` 之輸入:S1-S20 之結果由錯值(`Number.MAX_VALUE` 量級或 `null`/`NaN`)改為只依有限值計算之結果.
2. 取值規則改依 wsemi `isenum`(十進位寫法):`'0x10'`、`'0b11'`(修前依 `isnum` 計為 16、3)與 `'1e-400'`(修前計為 0)不再計入;包裝物件(`new Number(1)`)不再計入(修前 `cdbl` 拆包後計入);EMA 首點為包裝物件時亦同.
3. `regPower` 含 `0`、`''`、`null`、`false` 座標之點:修前因取 log 為 `-Infinity` 被夾為 `-Number.MAX_VALUE` 而得錯誤擬合,現與只含正值之點者相同.

**測試**(指令:`npx mocha --no-parallel test/nonFinite.test.mjs --timeout 180000`,全套 `npm test`):

| 規則內容 | 測試 |
|---|---|
| S1-S20 每個函數:含 `+Infinity`(4 種寫法 × 開頭/中間/結尾)、含 `-Infinity`(3 種寫法 × 3 位置)、正負混含、全為非有限值(與全為非數值者之處置相同)四類案,期望值為「只含有限值者之結果」 | `test/nonFinite.test.mjs` 前段之 `specs` 表 |
| 獨立期望值(不依賴被測函數另一次呼叫):`arrAverage`、`arrStd`、`arrQuartile`、`arrGeometricAverage`、`arrGeometricStd`、`arrNormInv`、迴歸擬合 | 同檔 `獨立期望值` |
| S9、S11、S12-S14、S15:`opt.min`、`opt.max`、`opt.dx`、`opt.interpX`、迴歸之點(x、y、兩者、`calcR2`)、EMA 首點 | 同檔 `迴歸` 與 `選項` 兩段 |
| S21-S24 刻意不改之站點現況 | 同檔 `刻意不改之站點` |
| 原始碼掃描(禁用識別字、`cdbl`/`isnum`/`isenum`/`arrFilterByENum` 之 import 以各檔釘住、掃描器盲點自測) | 同檔 `原始碼掃描` |

**待辦**:wsemi 若增 `arrFilterByEPnum`/`arrFilterByEPnumAndToLog`(取大於 0 之有限數值,可含取 log),本套件之兩個內部共用函式可改用之(見 `sgud/feedback/feedback.md`).
