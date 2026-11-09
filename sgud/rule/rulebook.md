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
