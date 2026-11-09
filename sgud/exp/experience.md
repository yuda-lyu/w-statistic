# 累積經驗

本檔為執行工作時特有之累積經驗,留給後續之嘗試、執行與判斷,由agent自行編列、擴充與維護.過長時抽出舊者為`experience_<年月日>.md`,並於本檔註明何時抽出.

- **第三方依賴跨主版號升版,上游 changelog 條列不完整,須以舊版隔離副本做差異比對**:simple-statistics 7.8.8→8.0.0 之條列未含 `quantile` 改為線性內插與 `linearRegression` 改以平均值置中,跑全套才見 `arrQuartile` 兩案變動.作法:`npm pack <套件>@<舊版> --pack-destination ./tmp/x` 並以 `tar -C` 解壓,以固定種子之隨機輸入對本套件實際呼叫之函式逐筆 `Object.is` 比對舊新(舊版 `src/` 無 `"type":"module"` 會被當 CJS,改 import 其 `dist/*.mjs`).
