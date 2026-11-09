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
| `regLine`/`regPower`/`regPoly`(迴歸) | 已做:沿用依賴;完全擬合資料可還原真值,`regPoly` 與獨立解法一致;空輸入 reject/丟錯 | R1 | `test/regLine.test.mjs`、`test/regPower.test.mjs`、`test/regPoly.test.mjs` |
| `simpleStatistics`(透傳) | 已做:原樣透傳 simple-statistics 8.0.0,不包裝 | R1 | `test/simpleStatistics.test.mjs` |
| 其餘函式(`arrAverage`、`arrStd`、`histGen` 等) | 本輪未動,見各 `test/<函式>.test.mjs` | — | — |

## 最近一次驗證

- 2026-11-09:`npm test` 258 案全綠(升版前 200 案).`dist/` 未重建(發布流程自動產製);以相同選項試建置至 `./tmp` 成功,UMD 冒煙通過.

## 已知缺口與待辦

- `arrQuartile(arr, 0)` 回 `null`:`ispnum(0)` 為 false 而被擋,與 JSDoc「ratio 介於 0 至 1」不符;修改前即如此,尚未處置(需決定 `ratio=0` 應回最小值或維持 `null`).
- `regLine` 全同 x(垂直線)之退化輸入無對外承諾:`x` 皆為 1 時新舊版皆回 `NaN`;`x` 皆為 0.1(平均值有捨入誤差)時 7.8.8 回 `NaN`、8.0.0 回 `{ m: 0, b: 平均y }`;未納入測試.
- 若要改採 simple-statistics 8.0.0 之線性內插(R type=7,numpy 預設)作為 `arrQuartile` 之語意,屬對外行為變更(JSDoc 範例 7 → 7.25、15 → 14.5 等),須裁示並同步改 JSDoc 與測試.
