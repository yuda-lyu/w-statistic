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
| S27 | `arrMovingAverage`:199-214(EMA 第 2 點起) | 直接以原值 `v * 2` 遞推(JS 隱式轉型) | 已套(2026-11-28) | 修前中段 `'abc'`、`'-'`、`undefined`、`NaN`、`{}`、`BigInt`(拋 `TypeError`)使其後全為 `NaN`,`±Infinity` 使其後全為 `±Infinity`,`null`、`false`、`''`、`[]`、`'1e-400'` 被當 0,`true` 當 1,`'0x10'` 當 16,`[3]`、數值包裝物件、`Date` 當其數值,皆靜默算錯;現改 `isenum(v)` 判定,無效點不入計算、輸出沿用前一點之 EMA(長度不變、皆為有限數,有效點之 EMA 等於「只取有效點之序列」之遞推) |
| S28 | `arrMovingAverage`:199-214(EMA 首點與首個有效點之前) | 首點無效取 0 為種子(`isenum(v) ? Number(v) : 0`) | 已套(2026-11-28,第二輪) | 修前首點無效時以 0 為種子,連續首段無效時其後有效點自 0 遞推而偏低(`[bad, 100, 100, 100, 100]` 得 `[0, 66.7, 88.9, 96.3, 98.8]`);現以**第一個有效點為種子**,其前各點尚無有效觀測、EMA 無定義而輸出 `null`(全部無效則全為 `null`,同 PMA/SMA 視窗內無有效值之 `null`),自第一個有效點起皆為有限數 |
| S29 | `regPower`:140-142(擬合用之 log 座標) | 取未過濾之原陣列 `map(arr, …Math.log(v[0])…)` | 已套(2026-11-28,第二輪) | 修前點之篩選 `rs`(`:121-131`,`isenum` 且 `>0`)只用於「無有效資料」判定與 `calcR2`,擬合另取原陣列,使 `true`、`'0x10'`、`[7]`、數值包裝物件、`Date` 之座標經隱式轉型計入擬合,整列為 `null`/`undefined` 拋 `TypeError`;現改取 `rs`,與 `regLine`、`regPoly` 一致整點不計入(此即 S14 所述「擬合另取原陣列」之根因) |

**S27 之決定**(沿用前值,不輸出 `null`):EMA 為遞推之水準估計,無新觀測時估計不變;輸出 `null` 會使序列出現非數值而下游(繪圖、再計算)須另行處理,且與 PMA/SMA 於無效點仍輸出視窗平均之語意不一致;沿用前值使有效點之結果與「先剔除無效點」之序列逐位相同(可驗證之不變式).

**S28 之決定**(首個有效點之前輸出 `null`,不輸出 0、不回填):依跨套件規格〈統計類例外〉「遞推型(EMA)該點不入遞推、輸出沿用前值,首個有效點為種子」,首個有效點之前無「前值」可沿用;輸出 0 會偽造一個不存在之估計(舊行為即因此使其後偏低),以首個有效點回填則以未來資料估計過去(非因果);輸出 `null` 同「有效元素不足依無可用數值通道失敗(回 `null`)」與 PMA/SMA 之處置,下游以 `null` 判斷尚無估計.輸出長度仍恆等於輸入長度.

**破壞性變更**(2026-11-28,允許:先前結果為錯值,無使用端可依賴):
1. 含 `±Infinity` 之輸入:S1-S20 之結果由錯值(`Number.MAX_VALUE` 量級或 `null`/`NaN`)改為只依有限值計算之結果.
2. 取值規則改依 wsemi `isenum`(十進位寫法):`'0x10'`、`'0b11'`(修前依 `isnum` 計為 16、3)與 `'1e-400'`(修前計為 0)不再計入;包裝物件(`new Number(1)`)不再計入(修前 `cdbl` 拆包後計入);EMA 首點為包裝物件時亦同.
3. `regPower` 含 `0`、`''`、`null`、`false` 座標之點:修前因取 log 為 `-Infinity` 被夾為 `-Number.MAX_VALUE` 而得錯誤擬合,現與只含正值之點者相同.
4. `arrMovingAverage` EMA 第 2 點起遇非有效數字(S27,2026-11-28):由「其後輸出全為 `NaN`/`±Infinity`」或「被當 0、1、他值而靜默算錯」改為沿用前一點之 EMA(先前結果為錯值,無使用端可依賴);`mode` 為 `'PMA'`、`'SMA'` 及全部為有效數字之 EMA 結果不變.
5. `arrMovingAverage` EMA 首點無效(S28,2026-11-28,第二輪):首點與首段無效點之輸出由 `0` 改為 `null`,其後各點由「自 0 遞推」改為「自第一個有效點遞推」(結果改變,輸出含 `null`;先前以 0 為種子之結果為偏低之錯值).輸入首點為有效數字者不變.
6. `regPower` 含無效座標之點(R4,2026-11-28,第二輪):`true`、`'0x10'`、`[7]`、數值包裝物件、`Date` 之座標修前被隱式轉型後計入擬合(結果錯),整列為 `null`/`undefined` 修前拋 `TypeError`;現與其他迴歸一致整點不計入.只含有效點者不變(逐位相同).
7. `arrNormHist`、`arrLogNormHist` 無有效數字時(R4,2026-11-28,第二輪):reject 之值由內部 `TypeError` 訊息(`Cannot read properties of null (reading 'bins')`)改為固定字串 `'no effective data'`;`arrLogNormHist` 有有效數字但皆不大於 0 時由 `'arr is not an effective array'` 改為 `'no effective data'`.

**測試**(指令:`npx mocha --no-parallel test/nonFinite.test.mjs --timeout 180000`,全套 `npm test`):

| 規則內容 | 測試 |
|---|---|
| S1-S20 每個函數:含 `+Infinity`(4 種寫法 × 開頭/中間/結尾)、含 `-Infinity`(3 種寫法 × 3 位置)、正負混含、全為非有限值(與全為非數值者之處置相同)四類案,期望值為「只含有限值者之結果」 | `test/nonFinite.test.mjs` 前段之 `specs` 表 |
| 獨立期望值(不依賴被測函數另一次呼叫):`arrAverage`、`arrStd`、`arrQuartile`、`arrGeometricAverage`、`arrGeometricStd`、`arrNormInv`、迴歸擬合 | 同檔 `獨立期望值` |
| S9、S11、S12-S14、S15:`opt.min`、`opt.max`、`opt.dx`、`opt.interpX`、迴歸之點(x、y、兩者、`calcR2`)、EMA 首點 | 同檔 `迴歸` 與 `選項` 兩段 |
| S21-S24 刻意不改之站點現況 | 同檔 `刻意不改之站點` |
| 原始碼掃描(禁用識別字、`cdbl`/`isnum`/`isenum`/`arrFilterByENum` 之 import 以各檔釘住、掃描器盲點自測;新增 `src/arrQuantile7.mjs`(R5)已同步釘住表) | 同檔 `原始碼掃描` |
| S27、S28:EMA 之無效元素(25 種無效值 × 6 組位置 × 期數 N=1、2、3、5 與獨立期望值對拍;手算例;首點無效時第一個有效點為種子、之前為 `null`、全無效全為 `null`、不再自 0 遞推;數字字串為有效;不改輸入;固定種子隨機對拍 600 組) | `test/arrMovingAverageEma.test.mjs`(指令:`npx mocha --no-parallel test/arrMovingAverageEma.test.mjs --timeout 180000`) |

**待辦**:wsemi 若增 `arrFilterByEPnum`/`arrFilterByEPnumAndToLog`(取大於 0 之有限數值,可含取 log),本套件之兩個內部共用函式可改用之(見 `sgud/feedback/feedback.md`).

## R4 資料陣列內之無效元素:統計類例外(跨套件規格〈輸入參數之檢測機制〉§3.2〈統計類例外〉之引用與站點)

**依據**:跨套件規格〈輸入參數之檢測機制〉§3.2〈統計類例外〉(主控 2026-11-28 定):彙總、分布、擬合、移動平均函數,資料陣列之元素逐一依 `isenum` 判定,非有效者(含標記字串、`null`、`undefined`、布林、物件、`NaN`、`±Infinity`)**不入計算、不使入口失敗**(M3 之擴充);迴歸之點對任一座標非有效則整點不計入;遞推型(EMA)該點不入遞推、輸出沿用前值,首個有效點為種子;有效元素不足(0 個,或該擬合所需之最少點數)時依各函數之無可用數值通道失敗(回 `null`/`[]` 或 reject,依各函數之 JSDoc);須於 JSDoc 與帳本載明;`arrCount` 屬類別計次,不在此列.全部無效/空陣列之通道維持下表現況(主控 2026-11-28 裁示,不改為 throw).

**規則**:資料陣列內不屬有效數字(wsemi `isenum` 為 false:非數值、標記字串、`null`、`undefined`、布林、`NaN`、`±Infinity`、物件、陣列、包裝物件、`BigInt`、`'0x10'`、下溢字串)之元素不入計算,**不使入口失敗**:彙總與分布類不計入個數與計算;迴歸類任一座標無效(`regPower` 另須座標大於 0)則整點不計入;移動平均之 PMA/SMA 不計入視窗、EMA 不入遞推(R3 S27、S28).全部無效時依各函數之無可用數值通道(下表,已寫入各函數 JSDoc 之 `@returns`).數字字串依 `isenum` 轉數值後使用.`regMpLine` 透傳第三方、不過濾元素,不在本例外之略過範圍(JSDoc 已載明).

**現況表**(2026-11-28 實測,18 種無效元素各插入於有效陣列中段,結果與只含有效值者逐位相同者記「略過」;探測以 `isenum` 為準;第二輪修正後 `regPower`、`arrNormHist`、`arrLogNormHist`、EMA 之列已更新):

| 函數 | 無效元素 | 全部無效 | 空陣列 | 非陣列 |
|---|---|---|---|---|
| `arrAverage`、`arrStd`、`arrQuartile`、`arrGeometricAverage`、`arrGeometricStd`、`arrQuantile7` | 略過 | `null` | `null` | `null` |
| `arrAverageWithNormCI`、`arrAverageWithLogNormCI`、`arrNormInv`、`arrLogNormInv`、`arrGammaFit`、`arrGammaHist`、`arrGammaInv` | 略過 | reject `no effective data` | reject `arr is not an effective array` | reject `arr is not an array` |
| `arrNormHist`、`arrLogNormHist` | 略過 | reject `no effective data`(第二輪修正;修前外洩內部 `TypeError` 訊息 `Cannot read properties of null (reading 'bins')`;`arrLogNormHist` 另於有效數字皆不大於 0 時亦 reject `no effective data`,修前為 `arr is not an effective array`) | reject `arr is not an effective array` | reject `arr is not an array` |
| `bin` | 略過 | `[]` | `[]` | `[]` |
| `histGen` | 略過 | `null` | `null` | `null` |
| `arrCount`(類別計次,非數值計算) | 數字、數字字串與標記字串(含 `±Infinity`、`'0x10'`)各為一類別(R3 S23);`null`、`undefined`、布林、`NaN`、物件、陣列略過 | 僅含被略過者(如 `[null, true, NaN, {}]`)回 `[]`;含字串或 `±Infinity` 者為類別而非空 | `[]` | `[]` |
| `regLine`、`regPoly` | 整列為無效、任一座標無效皆略過該點 | throw/reject `no effective data` | throw/reject `arr is not an effective array` | 同左 |
| `regPower` | 略過整點(第二輪修正,R3 S29;修前擬合之 log 陣列取自未過濾之原陣列,`true`、`'0x10'`、`[7]`、包裝物件之座標被當 `1`、`16`、`7` 計入擬合,`b` 由 0.993 變 0.35~0.69,整列為 `null`/`undefined` 拋 `TypeError`) | throw/reject `no effective data` | 同 `regLine` | 同左 |
| `regMpLine` | 不過濾(透傳第三方):`null`、`'abc'`、`'-'`、布林、數字字串 `'3'` 拋 `Input data contains non-numeric values`;`NaN`、`±Infinity` 靜默得全 `NaN` 係數(R3 S26) | 第三方之錯誤訊息或 `NaN` 係數 | throw/reject `matX is not an effective array` | 同左 |
| `arrMovingAverage`(PMA、SMA) | 視窗內略過;視窗內無有效值時該點為 `null`(`arrAverage` 之結果) | 全為 `null` | `[]` | `[]` |
| `arrMovingAverage`(EMA) | 無效點不入遞推:已有種子則沿用前一點;第一個有效點為種子,其前之點(含首點無效者)為 `null`(R3 S27、S28) | 全為 `null` | `[]` | `[]` |

**與〈輸入參數之檢測機制〉之關係**:原差距三項之處置——①全部無效或空陣列之通道:維持回 `null`/`[]`/reject(不改為 Q3-a 之 throw;規格〈統計類例外〉已載「依各函數之無可用數值通道」);②迴歸類(規格 §3.7 屬 N2):以〈統計類例外〉為準,略過整點(`regPower` 已與其他迴歸一致);③失敗訊息格式(V19)與非陣列之處置:不在本例外,維持現況(`arr is not an array` 等固定字串,不回顯值).其餘登記於規格之項目:`arrQuantile7` 對無效 `ratio` 回 `null`(R5,與 `arrQuartile` 一致).

**測試**(指令:`npx mocha --no-parallel test/<檔>.test.mjs --timeout 180000`,全套 `npm test`):

| 規則內容 | 測試檔 |
|---|---|
| `regPower` 點對任一座標非有效(24 種無效值 × x/y/整列/雙座標/缺 y × 3 個位置,同步與非同步)則整點不計入,結果與只含有效點者逐位相同(含 `calcR2`、`interpX`);獨立期望值(log 空間最小平方,不呼叫 `regPower`/`regLine`);鑑別前提斷言(無效座標被計入時 `b` 之差大於 0.01);數字字串座標為有效;不大於 0 之座標不計入(含 `calcR2`);全無效之通道不變;整列 `null`/`undefined` 不拋 `TypeError` | `test/regPowerInvalidPoint.test.mjs` |
| `arrNormHist`、`arrLogNormHist` 全部元素無效(7 組)與有給 `opt` 時 reject 固定字串 `no effective data`、與 `arrGammaHist`/`arrNormInv` 通道一致、非陣列/空陣列處置不變、有效元素充足時不受影響;`arrLogNormHist` 有有效數字但皆不大於 0 時 reject `no effective data`,只有 1 個正數時不被誤擋 | `test/arrNormHistNoData.test.mjs` |
| EMA(R3 S27、S28) | `test/arrMovingAverageEma.test.mjs` |
| `±Infinity` 與非數值同處置(R3) | `test/nonFinite.test.mjs` |

**盤點指令**(重跑現況表):對各函數於「有效陣列中段插入單一無效元素」比對「只含有效值者之結果」,無效元素取上列 18 種(另加布林、`Date`、`Symbol`、`BigInt` 等);彙總類(`arrAverage` 等,含 `null`、布林、物件)之元素種類以 `test/nonFinite.test.mjs` 之 `NONNUM`(標記字串與 `NaN`)與現況表探測為證,尚無逐種類之專屬測試(列入 `sgud/state/state.md` 待辦).

## R5 第 7 型分位數之單一擁有者

**規則**:第 7 型分位數(R `quantile` 之 type=7、numpy `quantile` 之 linear)由 `src/arrQuantile7.mjs` 之 `arrQuantile7(arr, ratio)` 單一擁有,使用端不自寫.定義:有限數值排序後取位置 `h = (n-1) * ratio`,於 `x[⌊h⌋]` 與 `x[⌊h⌋+1]` 間線性內插,`h` 為整數時即 `x[h]`.契約:①只取有限數值(`isenum`,同 R3);②`arr` 非陣列、空陣列、無有效數字、`ratio` 非有效數字或不在 0 至 1(含端點)→ 回 `null`,不丟錯(同 `arrQuartile`);③`h` 與整數相差在 `4 * Number.EPSILON * max(1, h)` 內者視為整數(浮點乘積誤差:`n=101`、`ratio=k/100` 時有 8 個 `k` 之 `100*(k/100)` 不等於 `k`);④相鄰兩點之差溢位(如 `-1.7e308` 與 `1.7e308`)時改以加權平均,使有限輸入之結果恆為有限;⑤不改動輸入陣列.

**與既有者之界線**(不合併):`arrQuartile` 為母體分位數(位置 `n*p` 非整數取 `x[ceil(n*p)-1]`,R1 釘住);透傳之 `simpleStatistics.quantile`(8.0.0 起即 type 7)不過濾非有限值、空輸入與超出範圍丟錯、不收數字字串,不具上列契約,故另立 `arrQuantile7`.

**盤點指令**(Grep 工具):`quantile7|quantile\(` 於 `src/`,第 7 型之實作僅限 `src/arrQuantile7.mjs`(`arrQuartile.mjs` 之 `quantileSorted` 為母體分位數,`jStat.mjs` 之 `emquantile` 為另一估計法).

**測試**(指令:`npx mocha --no-parallel test/arrQuantile7.test.mjs --timeout 180000`):

| 規則內容 | 測試 |
|---|---|
| 手算例(`[1,2,3,4]`、10 筆與 11 筆樣本之 0.25、0.5、0.75,單點、兩點、重複值、字典序陷阱)與 `arrQuartile` 之差異 | `手算例` 段 |
| 無效元素 28 種 × 7 個 ratio × 開頭/中間/結尾,與只含有效值者逐位相同;數字字串;全無效回 `null` | `只取有限數值` 段 |
| 非陣列、空陣列、27 種無效 ratio 回 `null`;ratio 為 `0`、`1`、`-0`、數字字串;不改輸入;極大值溢位;次正規數 | `邊界與無效輸入` 段 |
| `n=101`、`ratio=k/100` 等 `h` 為整數時恰為 `x[h]`(含前提斷言:確有浮點乘積不等於整數者);不得把真實小數位置吸附為整數 | `h為整數` 段 |
| 獨立期望值:BigInt 精確有理數(整數資料,`ratio=k/D`)、依賴 `simple-statistics` 之 `quantile`(type 7)隨機對拍、性質(單調、界內、順序無關、平移與縮放等變) | `對拍` 段 |
| 具名匯出 | `匯出` 段 |
