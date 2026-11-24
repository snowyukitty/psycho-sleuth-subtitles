<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=19d2e89bc0bfda8f">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=09776febd8671ccc">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=8c5ceb9432b76c47">
  <img alt="異病偵探 Psycho-Sleuth 四語雙字幕 — 瀏覽器網頁一鍵安裝與 Windows x64 離線版（4語言、6組、12種排列）" src="assets/hero-light.svg?v=e92cfbcf83063b48">
</picture>

<br>

**[English](README.md)** · **[日本語](README.ja.md)** · **繁體中文** · **[简体中文](README.zh-Hans.md)**

<br>

**[🎨 開啟 4 步插畫圖解＆網頁一鍵安裝器（免開黑窗 · 支援最新 Build 26746656）](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)**

**[下載離線 ZIP 版 (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[版本說明與 SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[所有版本](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[精簡隨附說明](docs/README.zh-Hant.md) · [疑難排解](SUPPORT.md) · [下一版預告](RELEASE_NOTES.md) · [更新紀錄](CHANGELOG.md) · [使用條款](LICENSE)

</div>

---

這是 Steam 版 **《異病偵探 Psycho-Sleuth》（病能探偵 / 异病侦探）** 的非官方 **Windows x64 雙字幕工具**，直接組合遊戲本機既有的官方翻譯，適合雙語遊玩、學日文／英文或對照各語譯文。

- **四語任選兩種、上下自由配：** 支援 **English**、**日本語**、**繁體中文**、**简体中文**，共 **6 種配對、12 種上下順序**。
- **免下載、免開黑窗的網頁版安裝器（最推薦）：** 直接用 Windows 的 **Edge** 或 **Chrome** 打開網頁，預覽字幕效果後選遊戲資料夾即可套用，**不碰 CMD、不跳未知警告、0 位元組上傳**。
- **繁簡各自使用原版譯文：** 繁體與簡體中文分別讀取遊戲原有的獨立翻譯欄位，絕不經過機翻或自動繁簡轉換。
- **完整互通、一鍵還原：** 網頁版與離線 ZIP 版共用相同的 `.psycho-sleuth-subtitles/original` 原版備份，隨時都能切換配對或精確還原原版。

---

## 選擇適合你的安裝方式

| 安裝方式 | 適用對象 | 支援 Steam 版本 | 是否開黑窗 / 安全警告 |
| --- | --- | --- | --- |
| **[網頁版一鍵安裝器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)** *(最推薦)* | 多數 Windows 10/11 玩家（Edge / Chrome） | **`26746656`** (`2026-11-20` 更新版) 與 **`26481838`** | **零警告**（免 `.cmd`、免 `.exe`、不受 SmartScreen / Smart App Control 阻擋） |
| **[離線 ZIP 版 (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** | 習慣離線保留安裝檔或命令列參數玩家 | `26481838` *（Build `26746656` preview.2 ZIP 待實機目視驗收）* | 會執行 `.cmd` 與經 SHA-256 校驗的 `python.org` 官方 `python.exe` |

---

## 方式 1 — 圖文並茂網頁版一鍵安裝（最簡單・免黑窗）

> 看圖跟著做更輕鬆！用 Windows 內建的 **Edge** 或 **Chrome** 打開：**[https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)**

1. **先把遊戲關掉**，用 Edge 或 Chrome 打開上面這個網頁。
2. **挑兩種想看的語言**（上面主字幕 + 下面輔助字幕，畫面上會直接預覽給你看）。
3. **選遊戲資料夾，按「套用」**（在 Steam 右鍵遊戲 → 管理 → 瀏覽本機檔案看位置；瀏覽器問權限時按「允許編輯檔案」，套用前會先自動幫你備份乾淨原版）。
4. **開遊戲就能玩！** 進遊戲把文字語言選成 **「繁體中文」** 或 **「日文」** 就會自動顯示雙語字幕。

*（想改回原版：關掉遊戲重開同一頁，點 **還原回乾淨原版** 或用離線 `Restore.cmd` 就恢復了。）*

---

## 方式 2 — 離線 ZIP 最簡安裝（4 步搞定）

1. **準備好 Steam 版遊戲並先關閉：** 先確認已在 Windows 的 Steam 裝好《異病偵探 Psycho-Sleuth》，**完全關閉遊戲**，並建議於 Steam 內容設為 **僅在啟動遊戲時更新**。
2. **下載並解壓縮：** 從 [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) 下載 **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`**，將**整個壓縮檔**解壓到可寫入的資料夾（保留 `_tool` 與 `Install.cmd`、`Restore.cmd` 在同資料夾）。
   *首次執行會從 `python.org` 下載約 12 MB、經 SHA-256 核對的官方簽章 Python 嵌入版，不會改動系統原本的 Python。*
3. **雙擊 `Install.cmd` 選好上下語言：** 依序選 **上方語言** → **下方語言**（`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文；例如 `2` 再 `3` 代表日文在上、繁中在下）。
4. **開遊戲設定文字語言就能玩：** 啟動遊戲後將文字語言設為 **「繁體中文」** 或 **「日文」** 即可。

---

## 為什麼可以放心使用

- **網頁版 0 位元組上傳：** 所有讀檔、雜湊校驗與寫入都在你的瀏覽器分頁本機完成；載入網頁後就算斷開 Wi-Fi 也能完成安裝。
- **離線版純明文腳本：** `_tool\` 裡全部都是可直接打開檢視的原始腳本，唯一會執行的執行檔只有向 `python.org` 下載、經 SHA-256 嚴格比對的官方數位簽章 `python.exe`。
- **不碰存檔，也不改系統環境：** 不會讀取或改動 Unity 存檔、PlayerPrefs、Steam 雲端存檔，也不會安裝任何系統全域套件。
- **隨時一鍵還原：** 修改遊戲前會先在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` 保存位元組等級的原版備份。可用網頁版一鍵還原、雙擊 **`Restore.cmd`**，或隨時使用 Steam 的「驗證遊戲檔案的完整性」兜底。
- **關於 SmartScreen 與 Smart App Control 提醒：** 下載的 `.cmd` 因無簽章，Windows SmartScreen 可能會顯示「Windows 已保護您的電腦」（點 **「其他資訊」→「仍要執行」**）。若你使用的是開啟 **Smart App Control** 的新 Windows 11 電腦，從網路下載的腳本可能會直接被拒絕而沒有仍要執行按鈕——**強烈建議改用上方「[網頁版一鍵安裝器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)」**（無下載腳本、零攔截），或在解壓縮前先對 ZIP 點右鍵 → **內容 → 解除封鎖**。

---

## 日常切換與還原

- **想換別種語言或上下對調：** 關掉遊戲，在網頁版重選套用或再雙擊一次 `Install.cmd` 重選就好（會自動沿用原版備份）。
- **想變回原本乾淨的原版：** 關掉遊戲，在網頁版點 **還原乾淨原版** 或雙擊 `Restore.cmd`（亦可在 `Install.cmd` 第一畫面按 `R`）。還原完成前，請不要刪掉 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`。
- **萬一寫入中斷：** 先別開遊戲，在網頁版選回同一資料夾點還原，或重跑 `Install.cmd` / `Restore.cmd` 即可自動恢復。
- **遇到 Steam 更新遊戲：** **千萬不要把舊備份硬蓋回新版遊戲**。若工具因版本雜湊不同而安全拒絕寫入，請先在 Steam 執行 **「驗證遊戲檔案的完整性」**，把 `.psycho-sleuth-subtitles` 移出遊戲資料夾妥善保存，再等待相容更新。
- **從 `0.1.0-preview.1` 升級：** 直接使用新版網頁版或新版 `Install.cmd`，保留遊戲內的 `.psycho-sleuth-subtitles` 即可平滑切換。*（提醒：0.2.0 起選項 `4` 為簡體中文，還原請按 `R` 或用 `Restore.cmd`。）*

---

## 支援的 6 種配對（12 種上下排列）

| 選單按法 | 上方字幕 → 下方字幕 | 命令列 `--pair` 代號 |
| --- | --- | --- |
| `1 → 2` / `2 → 1` | English / 日本語 | `en-ja` / `ja-en` |
| `1 → 3` / `3 → 1` | English / 繁體中文 | `en-zh-Hant` / `zh-Hant-en` |
| `1 → 4` / `4 → 1` | English / 简体中文 | `en-zh-Hans` / `zh-Hans-en` |
| `2 → 3` / `3 → 2` | 日本語 / 繁體中文 | `ja-zh-Hant` / `zh-Hant-ja` |
| `2 → 4` / `4 → 2` | 日本語 / 简体中文 | `ja-zh-Hans` / `zh-Hans-ja` |
| `3 → 4` / `4 → 3` | 繁體中文 / 简体中文 | `zh-Hant-zh-Hans` / `zh-Hans-zh-Hant` |

---

<details>
<summary><strong>進階：離線版命令列參數與 SHA-256 校驗（選用）</strong></summary>

可在解壓後的資料夾內開啟 PowerShell 或命令提示字元，直接帶參數執行 `Install.cmd` 或 `Restore.cmd`：

```powershell
# 選用：核對下載 ZIP 的 SHA-256
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 互動選單或免互動參數（代碼：en, ja, zh-Hant, zh-Hans）
.\Install.cmd
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant
.\Restore.cmd
```

舊版代碼 `zh-en` 與 `zh-ja` 仍可使用，對應為「繁體中文在上」；`ja-en` 維持不變。

</details>

<details>
<summary><strong>運作原理與安全檢查</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5f7c29179f1e34e8">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=3133d55cd17b0977">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=8333db78d688b9aa">
  <img alt="四階段安全修補流程：網頁或離線預檢、日誌備份、本機劇本與 22 段過場合成、自由切換與位元組精確還原" src="assets/architecture-light.svg?v=73720fef52917fa0">
</picture>

</div>

1. **嚴格預檢（雜湊釘選驗證）：** 修改前比對 Windows x64 Steam IL2CPP 執行檔、Unity 資料封包與 Addressables 目錄雜湊；遇到未支援的新版本或其他模組會安全拒絕寫入。
2. **雙軌本機執行與備份互通：** 網頁版於 Edge/Chrome 記憶體直接以純 JS 解壓 UnityFS/LZMA1；離線版以經 SHA-256 驗證的官方 Python 3.14.10 執行。兩者寫入完全相同的 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`、`transaction.json` 與雙重收據。
3. **完整保留原版語音與節奏：** 只修補劇情對白、選項、本地化文字表、TextMeshPro 字級與 **22 組過場動畫 `.srt` 字幕**，原版語音欄位（Build `26746656` 為 `157,263`）與非字幕物件（`10,898`）完全保留不動。

</details>

---

## 適用範圍與預覽版提醒

- **涵蓋文字：** 主線與探索劇情對白、分支選項、**22 部過場動畫 `.srt` 字幕**。選單、角色名稱與線索介面維持遊戲選定語言。
- **高密度對話頁：** 多數對白採上下兩行對照；極少數行數較多的頁面會依選定順序改為同行對照，保留原本點擊節奏。兩語言原文完全相同時只顯示一次。
- **序章動畫與缺漏譯文：** 原版序章動畫缺少繁體中文 `.srt`，因此含「繁體中文」的配對在該段只會顯示你選的另一種語言（搭配簡中則顯示簡中）。缺單邊譯文的對白或過場時間差，會暫時顯示單語或維持遊戲設定語言。
- **目前驗證狀態：** 網頁版與離線版均已通過 Steam **Build `26746656` 全 12 種排列位元組一致性驗證**及雙向互通還原驗證；惟全章節實機畫面的長句換行與英文／簡中字型仍待最終實機目視驗收，遊玩時請先把遊戲文字語言設為 **「繁體中文」或「日文」**。

---

## 版本狀態

> **現已推出網頁版支援最新 Steam Build `26746656` (`2026-11-20`)：** 不想下載任何工具或正受限於 Windows Smart App Control 的玩家，可立即使用 **[網頁版一鍵安裝器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)**。

- **網頁版一鍵安裝器（已上線）：** 於本機瀏覽器內支援 **Build `26746656`** 與 **Build `26481838`**，輸出與 Python 工具字節一致。
- **目前公開下載 ZIP：`v0.2.0-preview.1`** — 僅對應舊版 Build `26481838`（在 Build `26746656` 上會安全拒絕寫入）。
- **下一版離線 ZIP 候選：`v0.2.0-preview.2`（尚未公開發佈）** — 已適配 Build `26746656` 並通過自動化驗證，現正等待實機畫面目視檢查。詳見 [自動驗證範圍](TESTING.md)、[五分鐘實機目視檢查表](VISUAL_QA.md) 與 [候選版本說明](RELEASE_NOTES.md)。

---

## 協助、參與貢獻與使用條款

- 遇到狀況或遊戲更新？請先看 [SUPPORT.md](SUPPORT.md) 或到 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) 回報。
- 歡迎透過 [CONTRIBUTING.md](CONTRIBUTING.md) 與 [行為準則](CODE_OF_CONDUCT.md) 一起改善文件與排版回饋；安全問題請閱 [SECURITY.md](SECURITY.md)，完整紀錄見 [CHANGELOG.md](CHANGELOG.md)。

*關鍵字：* *異病偵探 Psycho-Sleuth* · *病能探偵* · *异病侦探* · Steam 雙語字幕 · 日文學習雙字幕 · 網頁一鍵安裝器（免 CMD）。

依 [LICENSE](LICENSE) 條款免費使用，其餘權利保留（非 MIT 等開源授權）。分享時請貼上本頁、[網頁安裝器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant) 或 [官方 Releases 頁面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) 連結，勿自行重新打包散佈。本工具為非官方作品，需搭配合法購買安裝的 Steam 版《異病偵探 Psycho-Sleuth》使用；離線版自動下載之官方嵌入版 Python 保留其自身授權。
