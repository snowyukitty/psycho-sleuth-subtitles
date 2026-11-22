# 異病偵探 Psycho-Sleuth 四語雙字幕 — 使用說明

[English](README.en.md) · [日本語](README.ja.md) · **繁體中文** · [简体中文](README.zh-Hans.md) · [GitHub 完整主頁](../README.zh-Hant.md)

這是非官方的 **Windows x64 預覽版**工具，使用遊戲本機既有的官方翻譯組合雙語字幕。不用加配音、不需要 API key、不用 Mod Loader，也不會上傳遊戲文字。

> **最推薦（免開黑窗 CMD）：** 直接用 Microsoft Edge / Chrome 開啟 **[網頁一鍵安裝器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)**，即可於本機同時支援 Steam **Build `26746656`**（`2026-11-20` 更新）與 **Build `26481838`**（免下載、0 上傳）。目前發佈的離線 ZIP `v0.2.0-preview.1` 僅對應 Build `26481838`，Build `26746656` 離線包將於 `v0.2.0-preview.2` 推出。

## 最簡安裝步驟（4 步搞定）

1. **關閉遊戲：** 確認已在 Windows 的 Steam 裝好 *Psycho-Sleuth*，**完全關閉遊戲**並建議設為「僅在啟動遊戲時更新」。
2. **下載並解壓縮：** 從 [`v0.2.0-preview.1` Release](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) 下載 **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip**，將整個 ZIP 解壓到可寫入的資料夾（務必保留 `_tool` 與 `Install.cmd`、`Restore.cmd` 在一起）。
   *不需要自己裝 Python — 首次執行會自動從 `python.org` 下載約 12 MB、經 SHA-256 驗證的官方簽章 Python 3.14.10 嵌入版快取於 `_tool\python-runtime.zip`，於獨立 `%TEMP%` 目錄執行後清除，不改動系統原本的 Python。*
3. **雙擊 `Install.cmd` 選兩種語言：** 通常會自動找到 Steam 遊戲資料夾（找不到時貼上遊戲資料夾路徑即可）。先選**上方字幕**、再選**下方字幕**（`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文；例如 `2 → 3` 為日文在上、繁中在下）。選完下方語言立即開始安裝；第一畫面按 **R** 還原、**0** 離開，第二畫面按 **0** 返回。
4. **開遊戲設定文字語言：** 啟動遊戲後，將遊戲內文字語言設為 **「繁體中文」** 或 **「日文」**，對話就會顯示你選好的雙語字幕。

## 為什麼可以放心使用

- **純明文腳本與官方驗證運行檔：** `_tool\` 裡全部都是可用記事本檢視的原始腳本，唯一執行的程式是從 `python.org` 取得並通過 SHA-256 檢查的官方簽章 `python.exe`。
- **不碰存檔與系統環境：** 不會讀取或改動 Unity 存檔、Steam 雲端存檔，也不影響系統 Python。
- **隨時一鍵還原：** 修改前會在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` 保存位元組原版備份（與網頁安裝器完全互通），`Restore.cmd` 可 100% 還原，Steam「驗證遊戲檔案的完整性」也能隨時兜底。
- **SmartScreen / Smart App Control 提醒：** 下載的 `.cmd` 若跳出 SmartScreen 藍框請點 **「其他資訊」→「仍要執行」**。若電腦已開啟 **Smart App Control** 而直接禁止執行下載腳本，請改用免下載的 **[網頁一鍵安裝器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hant)**，或在解壓前對 ZIP 右鍵 → **內容 → 解除封鎖**。

## 日常切換與還原

- **想換配對或上下對調：** 關閉遊戲，隨時再執行 **`Install.cmd`** 重選就好（會自動沿用已驗證的原版備份）。
- **想變回原版：** 關閉遊戲，雙擊 **`Restore.cmd`** 一鍵還原（或在 `Install.cmd` 第一畫面按 `R`）。還原完成前請保留 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`。
- **安裝中斷時：** 不要啟動遊戲，重新執行 `Install.cmd` 或 `Restore.cmd` 就會自動恢復。
- **從 `0.1.0-preview.1` 升級：** 將新版解壓到另一個資料夾直接執行新版 `Install.cmd`，保留遊戲內的 `.psycho-sleuth-subtitles` 即可（不必先手動還原）。*（注意：0.2.0 起編號 4 代表簡體中文，還原請按 `R` 或執行 `Restore.cmd`。）*
- **Steam 更新遊戲後：** **請勿將舊備份蓋回新版遊戲**。請先執行 Steam **「驗證遊戲檔案的完整性」**，把 `.psycho-sleuth-subtitles` 移出遊戲資料夾妥善保存，再等相容版本更新。

## 常見問題排解

- **提示遊戲仍在執行中：** 請從 Steam 或工作管理員確認遊戲已完全關閉後重試。
- **首次啟動無法下載 Python：** 請確認防火牆或防毒未阻擋 `python.org`（約 12 MB）後重試 `Install.cmd`；僅在 SHA-256 完全吻合時執行。
- **序章動畫或少數句子只出現一種語言：** 屬遊戲原版資料缺少該語言譯文所致（例如原版序章缺繁中 `.srt`，見下方說明）。
- **需要更多協助：** 請參考 [疑難排解](../SUPPORT.md) 或到 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) 回報。

---

<details>
<summary><strong>支援配對與進階命令列參數（選用）</strong></summary>

四語代碼為 `en`（English）、`ja`（日本語）、`zh-Hant`（繁體中文）、`zh-Hans`（简体中文），任選兩者共 **6 種配對、12 種上下排列**。繁體與簡體分別讀取遊戲原有的獨立官方譯文，不經自動轉換。

```powershell
# 選用：核對下載壓縮檔 SHA-256
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 在解壓資料夾內執行的命令列範例
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant
.\Restore.cmd
```

舊版代號 `zh-en`、`zh-ja` 仍可使用並對應「繁體中文在上」；`ja-en` 維持不變。

</details>

<details>
<summary><strong>適用範圍、預覽限制與使用條款</strong></summary>

- **涵蓋範圍：** 劇情對白、劇情選項與 22 組過場動畫 `.srt` 字幕；選單、角色名稱與線索介面維持遊戲選定語言。
- **排版與缺譯處理：** 多數採上下兩行對照；極少數高密度頁面依選定順序改為同行對照，保留點擊節奏（原文相同時只顯示一次）。原版序章動畫缺繁中 `.srt`，故含繁中的配對該處只顯示另一種選定語言。缺單邊譯文的對白或過場時間差，會維持遊戲目前語言或短暫單語顯示。
- **驗證範圍：** 僅接受相容的原版 Steam 檔案或可辨識的本工具狀態。12 種排列均已通過隔離資料自動化驗證（完整保留語音與非字幕物件），惟長句、選項、英文／簡中遊戲字型與過場畫面仍待完整實機目視驗收。
- **使用條款：** 依 [LICENSE](../LICENSE) 免費下載並供個人安裝與備份使用，其餘權利保留（非 MIT 等開源授權）。分享請貼[官方 Release 頁面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)連結，勿自行重新打包散佈。本工具與遊戲製作者無官方關聯，需搭配合法購買安裝的 Steam 版《異病偵探 Psycho-Sleuth》使用；官方嵌入版 Python 保留其自身授權（[Python 3.14.10 版本資訊與校驗值](https://www.python.org/downloads/release/python-31410/)）。

</details>
