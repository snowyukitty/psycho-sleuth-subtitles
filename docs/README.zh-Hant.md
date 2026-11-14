# 異病偵探 Psycho-Sleuth 雙字幕 — 使用說明

[English](README.en.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

這是非官方的 **Windows x64 預覽版**工具，使用遊戲本機既有的官方翻譯組合雙語字幕。不新增配音，不需要 API key，不上傳遊戲文字，也不附帶遊戲素材或完整劇本。

## 安裝

1. 從 [`v0.2.0-preview.1` Release 頁面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)下載 **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip**。
   *（選用校驗：可在 PowerShell 執行 `Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`，核對是否與 `SHA256SUMS.txt` 一致。）*
2. 將整個 ZIP 解壓到可寫入的資料夾。保留 `_tool` 資料夾，與 `Install.cmd`、`Restore.cmd` 放在一起。
3. 完全關閉 *Psycho-Sleuth*，暫停 Steam 自動更新，雙擊 **Install.cmd**。
4. 工具通常會自動找到 Steam 遊戲資料夾；若要求輸入路徑，貼上可寫入的遊戲資料夾即可。
5. 先選**上方字幕**，再選**下方字幕**。兩個畫面的編號相同；下方選單會自動排除已選的語言。

| 編號 | 語言 |
| --- | --- |
| 1 | English — 英文 |
| 2 | 日本語 — 日文 |
| 3 | 繁體中文 |
| 4 | 简体中文 — 簡體中文 |

任選兩種不同語言，共 **6 種配對、12 種上下排列**（含繁體中文／簡體中文）。例如 **1 → 4** 是英文在上、簡中在下；**4 → 1** 則相反。選好下方語言後立即開始安裝。第一個畫面可按 **R** 還原、**0** 離開；第二個畫面按 **0** 返回。*（注意：0.2.0-preview.1 的編號 4 代表簡體中文，還原請按 R 或執行 Restore.cmd。）*

6. 遊戲內的文字語言請設為 **繁體中文** 或 **日文**。對譯齊全的對白在兩種設定下都會顯示本工具選定的雙字幕組合；例外請見下方「範圍與預覽限制」。

首次執行需要連線，會自 `python.org` 下載約 **12 MB** 的官方 Python 3.14.10 嵌入版執行環境，驗證固定 SHA-256 後快取於 `_tool\python-runtime.zip`；每次啟動都會重新核對雜湊並解壓到 `%TEMP%` 下的獨立暫存目錄執行（結束後清除）。不需要自行安裝 Python，也不會改動系統原本的 Python。

### 命令列參數（選用）

也可**在解壓後的資料夾內**開啟 PowerShell 或命令提示字元，直接帶參數執行 `Install.cmd` 或 `Restore.cmd`：

- `.\Install.cmd --pair en-ja` — 免互動直接安裝指定配對（`上-下`）
- `.\Install.cmd --top ja --bottom zh-Hant` — 分別指定上下語言（`en`, `ja`, `zh-Hant`, `zh-Hans`）
- `.\Install.cmd --list-pairs` — 列出支援的 12 種排列
- `.\Restore.cmd` — 立即精確還原原版檔案

## 切換、升級與還原

關閉遊戲後，隨時再執行 **Install.cmd** 即可更換配對或上下對調。雙擊 **Restore.cmd** 可以位元組等級精確還原原版檔案。已驗證的原版備份保存在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`，還原完成前請勿刪除 `.psycho-sleuth-subtitles`。若安裝過程意外中斷，請重新執行 Install 或 Restore 完成復原，再啟動遊戲。

**從 0.1.0-preview.1 升級：** 將新版 ZIP 解壓到另一個資料夾，直接執行新版 `Install.cmd`。工具識別舊版安裝後會自動沿用已驗證的原版備份，不需要先手動還原。請保留遊戲內的 `.psycho-sleuth-subtitles` 資料夾；若 Steam 或其他工具曾修改檔案，仍會套用相容性檢查。

**Steam 更新遊戲後：** **請勿用舊備份覆蓋新版本檔案**。工具會主動拒絕未知版本與其他模組。若更新後復原被拒絕，請先在 Steam 執行 **「驗證遊戲檔案的完整性」**，再將 `.psycho-sleuth-subtitles` 移出遊戲資料夾妥善保存，等待對應新版遊戲的工具釋出。

## 常見問題排解

- **提示遊戲仍在執行中：** 請從 Steam 或工作管理員確認遊戲已完全關閉後再試。
- **首次啟動無法下載 Python 執行環境：** 請檢查防火牆或防毒軟體是否阻擋連線至 `python.org`（約 12 MB），重試 `Install.cmd`。系統只會在 SHA-256 完全吻合時才執行下載內容。
- **部分句子或序章動畫只出現一種語言：** 屬於遊戲原版檔案缺少該語言譯文所致（例如原版序章動畫缺繁中 `.srt`；詳見下方「範圍」）。
- **需要進一步協助：** 請參閱 [SUPPORT.md](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/SUPPORT.md) 或至 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) 回報。

## 範圍與預覽限制

- 支援劇情對白、劇情選項與 22 組過場動畫 `.srt` 字幕；選單、角色名稱與線索介面保留遊戲選定的語言。
- 多數對話採上下兩行對照；少數行數過多的高密度頁面會依選定順序採同行對照，以保留原本的點擊節奏。兩語言原文完全相同時只顯示一次。
- 原版序章動畫缺乏繁體中文字幕；含繁中的配對在該段只會顯示另一種選定語言（若搭配簡中則顯示簡中）。過場字幕時間軸不同時，也可能短暫只顯示其中一種語言。缺少任一選定譯文的對白列會保持原狀，以遊戲目前的設定語言顯示（也可能為空白）。
- 繁體與簡體中文分別讀取遊戲內原有的**獨立官方譯文**，不使用自動繁簡轉換。
- 僅接受相容的原版 Steam 檔案或可辨識的本工具安裝狀態。12 種排列均已通過隔離資料驗證（包含保留全部語音與非字幕物件），但長句換行、選項框、英文／簡中遊戲介面字型與過場字幕的實際遊戲畫面驗收尚未全部完成，請優先使用上方建議的「繁體中文或日文」遊戲介面語言設定。

## 使用條款

依隨附的 **LICENSE.txt** 免費下載並供個人安裝與備份使用，其餘權利保留。分享時請貼上[官方 Release 頁面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)連結，勿自行重新打包散佈。所有腳本皆可檢視原始內容，並非加密執行檔。本工具與遊戲製作者無官方關聯，條款不授予遊戲素材或劇本之權利；需搭配合法購買安裝的遊戲使用。

Python 保留自身授權，隨下載的官方 ZIP 附帶。[Python 3.14.10 版本資訊與校驗值](https://www.python.org/downloads/release/python-31410/)。
