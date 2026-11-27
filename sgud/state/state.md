# 狀態

本檔記載當前已開發功能之最新狀態(各功能做到哪裡、對應之規則帳本條目與測試檔、已知缺口與待辦、最近一次驗證或發布之版本),只記現況、不寫過程(過程寫入經驗`sgud/exp/experience.md`).規則帳本(藍圖)見`sgud/rule/rulebook.md`.過長時依功能類型拆為`state_<類型>.md`,本檔只留索引.

## 依賴現況(2026-11-09 驗證)

| 依賴 | 版本(package.json 宣告) | 安裝版 | 備註 |
|---|---|---|---|
| simple-statistics | `^8.0.0` | 8.0.0 | 不再向下編譯為 ES5;見規則帳本 R1 |
| ml-regression-polynomial | `^4.0.0` | 4.0.0 | ESM-only,`src/regPoly.mjs:13` 為 `import`,無 `require`(規則帳本 R2) |

## 功能狀態

| 功能 | 狀態 | 規則帳本 | 測試檔 |
|---|---|---|---|
| `arrQuartile`(分位數) | 已做:自行實作母體分位數(`src/arrQuartile.mjs` 之 `quantileSorted`),結果與 simple-statistics 7.8.8 逐位一致,不隨 8.0.0 之線性內插而變;空輸入回 `null` | R1 | `test/arrQuartile.test.mjs` |
| `arrQuantile7`(第 7 型分位數,R type=7/numpy linear) | 已做(2026-11-28,使用端自寫 `quantile7` 之共用化;使用端改用另案):只取有限數值,`arr` 非陣列/空陣列/無有效數字/`ratio` 無效或超出 0~1 回 `null`;`h` 與整數差數個 ULP 視為整數;相鄰差溢位改加權平均;`src/WStatistic.mjs` 具名匯出;範例 `g.arrQuantile7.mjs` | R5 | `test/arrQuantile7.test.mjs` |
| `regLine`/`regPower`/`regPoly`(迴歸) | 已做:沿用依賴;完全擬合資料可還原真值,`regPoly` 與獨立解法一致;空輸入 reject/丟錯;點對任一座標非有效則整點不計入(統計類例外),`regPower` 之擬合改取已過濾之點(修前取原陣列,使 `true`、`'0x10'`、`[7]`、包裝物件之座標被計入、整列 `null` 拋 `TypeError`,2026-11-28 第二輪) | R1、R3 S29、R4 | `test/regLine.test.mjs`、`test/regPower.test.mjs`、`test/regPoly.test.mjs`、`test/regPowerInvalidPoint.test.mjs` |
| `arrNormHist`/`arrLogNormHist`(直方圖與常態、對數常態曲線) | 已做:無有效數字時 reject 固定字串 `no effective data`(修前外洩內部 `TypeError` 訊息;`arrLogNormHist` 有有效數字但皆不大於 0 時亦同,修前為 `arr is not an effective array`,2026-11-28 第二輪) | R4 | `test/arrNormHist.test.mjs`、`test/arrLogNormHist.test.mjs`、`test/arrNormHistNoData.test.mjs` |
| `simpleStatistics`(透傳) | 已做:原樣透傳 simple-statistics 8.0.0,不包裝 | R1 | `test/simpleStatistics.test.mjs` |
| `arrMovingAverage`(移動平均) | 已做:PMA 新增 `opt.selectCount`(總取點數,含偶數;有給時優先於 `selectCountHalf`;偶數 N 前取 N/2、後取 N/2−1,同 MATLAB movmean 偶數窗;非正整數視為未給;SMA／EMA 不受影響)(2026-11-10,Gitea #124);EMA 第 2 點起遇非有效數字(含 `NaN`、`±Infinity`、非數值字串、`null`、布林、物件等)不入計算、該點沿用前一點之 EMA(長度不變、皆有限;修前其後全為 `NaN`/`±Infinity` 或被當 0 等而算錯,2026-11-28);首點與首個有效點之前:改以第一個有效點為種子、其前各點輸出 `null`(全部無效則全為 `null`;修前以 0 為種子使其後偏低,2026-11-28 第二輪);`opt.mode` 補入 JSDoc | R3 S27、S28 | `test/arrMovingAverage.test.mjs`、`test/arrMovingAverageSelectCount.test.mjs`、`test/arrMovingAverageEma.test.mjs` |
| 含 `±Infinity` 之陣列與選項(`arrAverage`、`arrStd`、`arrQuartile`、`arrAverageWith(Log)NormCI`、`arr(Log)NormInv`、`arrGammaFit`/`Hist`/`Inv`、`arrGeometricAverage`/`Std`、`arrNormHist`、`arrLogNormHist`、`bin`、`histGen`、`regLine`/`regPoly`/`regPower`、`arrMovingAverage`) | 已做:統計量只取有限數值,`±Infinity`(含 `'Infinity'`、`'1e400'` 等字串)與非數值同樣不計入;`opt.min`/`max`/`dx`/`interpX` 為 `±Infinity` 視為未給;取值改用 wsemi `arrFilterByENum`/`isenum`(2026-11-28,使用端回報 `arrAverage([1, Infinity])` 得 8.99e307).刻意不改與範圍外之站點見規則帳本 R3 | R3 | `test/nonFinite.test.mjs` |
| 其餘函式(`arrCount`、`sampleRandom`、`studentTInv`、`regMpLine` 等) | 本輪未動(`±Infinity` 判定見 R3 之站點表),見各 `test/<函式>.test.mjs` | R3 | — |

## 最近一次驗證

- 2026-11-28(第三輪:統計類例外之三項修正——`regPower` 擬合取已過濾點、`arrNormHist`/`arrLogNormHist` 無有效數字之固定訊息、EMA 以第一個有效點為種子;全函式 JSDoc 補無可用數值通道):`npm test` 474 案全綠(第二輪 427 案中,因本修正預期改變者僅 `test/nonFinite.test.mjs` 之 EMA 首點案〔首點無效由取 0 改為輸出 `null`〕與第二輪自寫之 `arrMovingAverageEma.test.mjs` 首點案;其餘原樣通過;新增 `regPowerInvalidPoint` 31 案、`arrNormHistNoData` 12 案,`arrMovingAverageEma` 由 34 增為 38 案).修前紅:新測試對未改之 `src` 實跑 25 紅 159 綠(綠者為修前已正確之案);變異 22 項(`regPower` 6、直方圖 7、EMA 9)21 殺、1 等價(`Number(v)` 改 `v`,166667 個字串逐位相同);修前修後對拍:`regPower` 不含隱式轉型種類之輸入 3000 組 0 差異、含者 2761 組有差異,EMA 首點有效 3000 組 0 差異、首點無效 3000 組皆有差異,直方圖有有效數字 600 組 0 差異.eslint 0 新增(`src/WStatistic.mjs` 之 `eol-last` 為既有)、jsdoc(輸出至暫存夾)0 ERROR.`dist/`、`docs/` 未重建.
- 2026-11-28(第二輪:EMA 中段無效元素、`arrQuantile7`):`npm test` 427 案全綠(原 368 案原樣通過,僅 `test/nonFinite.test.mjs` 之「以各檔釘住」表新增 `arrQuantile7.mjs` 兩處;新增 `arrMovingAverageEma.test.mjs` 34 案、`arrQuantile7.test.mjs` 25 案).EMA 測試對修前原版實跑 3 綠 31 紅(3 綠為修前已正確之案:數字字串為有效、首點行為、不改輸入);變異驗證 EMA 11 項(10 殺、1 等價)、`arrQuantile7` 21 項(19 殺、2 等價:`Number(ratio)` 改不轉型、移除空陣列檢查),見經驗檔.eslint 0 新增(`src/WStatistic.mjs` 之 `eol-last` 為既有,該檔由 `toolg/gPackageIndex.mjs` 產生)、jsdoc(輸出至暫存夾)0 ERROR.`dist/`、`docs/` 未重建.
- 2026-11-28:`npm test` 368 案全綠(原 265 案原樣通過,新增 `nonFinite.test.mjs` 103 案;對修前原版實跑 88 紅 14 綠〔14 綠為修前已正確之案:`-Infinity` 於 Gamma/幾何系已被 `>0` 過濾、刻意不改站點之現況釘住、掃描器自測〕;變異驗證見經驗檔).eslint、jsdoc(輸出至暫存夾)皆 0 新增.`dist/`、`docs/` 未重建(發布流程自動產製).
- 2026-11-10:`npm test` 265 案全綠(新增 `arrMovingAverageSelectCount` 7 案;對原版實跑 3 綠 4 紅,改後 7 綠).
- 2026-11-09:`npm test` 258 案全綠(升版前 200 案).`dist/` 未重建(發布流程自動產製);以相同選項試建置至 `./tmp` 成功,UMD 冒煙通過.

## 已知缺口與待辦

- **資料陣列無效元素之處置**:已依跨套件規格〈統計類例外〉辦理並載於規則帳本 R4(彙總排除、迴歸整點略過、EMA 不入遞推);全部無效/空陣列維持各函數現行通道(`null`/`[]`/reject).尚未有逐種類(`null`、布林、物件等)之專屬測試的彙總類函數(`arrAverage`、`arrStd`、`arrQuartile`、`arrGeometricAverage`/`Std`、`arrAverageWith(Log)NormCI`、`arr(Log)NormInv`、`arrGamma*`、`bin`、`histGen`)以現況表探測為證,可擇期補 `test/` 之逐種類案.
- `regMpLine` 不過濾元素(透傳第三方,R3 S26):含非數值元素拋第三方錯誤,含 `NaN`/`±Infinity` 靜默得 `NaN` 係數;JSDoc 已載明,不在統計類例外之略過範圍,是否於入口依 `isenum` 檢查待另案.
- EMA 之有限極大值(接近 `Number.MAX_VALUE`)遞推溢位為 `Infinity` 後會傳播至其後,屬有效輸入之溢位,未處理.
- `arrQuartile(arr, 0)` 回 `null`:`ispnum(0)` 為 false 而被擋,與 JSDoc「ratio 介於 0 至 1」不符;修改前即如此,尚未處置(需決定 `ratio=0` 應回最小值或維持 `null`).`arrQuantile7` 之 `ratio=0` 回最小值.
- `regLine` 全同 x(垂直線)之退化輸入無對外承諾:`x` 皆為 1 時新舊版皆回 `NaN`;`x` 皆為 0.1(平均值有捨入誤差)時 7.8.8 回 `NaN`、8.0.0 回 `{ m: 0, b: 平均y }`;未納入測試.
- 若要改採 simple-statistics 8.0.0 之線性內插(R type=7,numpy 預設)作為 `arrQuartile` 之語意,屬對外行為變更(JSDoc 範例 7 → 7.25、15 → 14.5 等),須裁示並同步改 JSDoc 與測試;現已另立 `arrQuantile7`(R5)提供第 7 型,`arrQuartile` 維持母體分位數.
