# Five-minute visual check

[Back to download and release status](README.md#release-status)

Automated checks verify data preservation and estimated text fitting. This checklist verifies what a player actually sees. **The preview.2 candidate has not completed this check.** It is not yet downloadable. Do not report a visual pass based on the automated results.

## Prepare a safe test environment

Use a legally owned, supported Steam build and a separate test environment. Copying the game folder alone does **not** isolate Unity saves, PlayerPrefs or Steam Cloud. Use a separate Windows test account and verify that its save/settings locations and cloud behavior cannot overwrite your personal state. If isolation is uncertain, stop before launching.

Keep a clean original-file baseline. Close the game before installing, switching or restoring, and explicitly choose the test folder with `--game-dir "<test-game-folder>"`. Do not use automatic discovery for this test. Prepare first-chapter, non-spoiler checkpoints in the test account for ordinary dialogue, a dense continuation page, a choice and a cutscene. Preparation, loading, runtime downloads and Steam verification are outside the five-minute observation budget.

## Observe and record

| Time | Check | Pass condition |
| --- | --- | --- |
| 0:00–0:45 | Ordinary Japanese/Traditional Chinese dialogue | Correct top/bottom order; long lines wrap; final line and name remain visible; click pacing is intact. |
| 0:45–1:30 | Dense page with InputBr continuation | Blank continuation height is sensible; no overlap or clipping; small/inline text remains readable; no literal markup. |
| 1:30–2:00 | Branching choices | Every label fits, language order is clear, buttons remain selectable. |
| 2:00–3:00 | Cutscene and prologue | Cues enter/leave with the original timeline. A pair containing zh-Hant shows only its other language in the prologue because the original zh-Hant track is absent. |
| 3:00–4:15 | Game UI language comparison | Compare Traditional Chinese/Japanese with English/Simplified Chinese on the same scene: no missing glyphs, misplaced punctuation or clipped lines. Extra restart time is outside this budget. |
| 4:15–5:00 | Restore | Close the game; run Restore.cmd against the explicit test folder; compare patched-file hashes with the clean baseline and check that no recovery journal remains pending. |

Steam integrity verification is an additional check on an isolated, Steam-managed test installation. Do not verify a personal installation containing other mods: Steam can overwrite them. An unmanaged copy can be compared byte-for-byte with its clean baseline, but that is not a Steam verification result.

## Compact result template

Keep screenshots local unless they are necessary, non-spoiler and stripped of personal information. Never upload game archives, full scripts, saves, account identifiers or local paths.

```text
Tool version / ZIP SHA-256:
Supported game build:
Resolution / display scale:
Subtitle top / bottom:
UI languages checked:
Ordinary dialogue: PASS / FAIL / NOT RUN
Dense InputBr page: PASS / FAIL / NOT RUN
Choices: PASS / FAIL / NOT RUN
Cutscene / prologue: PASS / FAIL / NOT RUN
Four UI font settings: PASS / FAIL / NOT RUN
Restore + original hashes: PASS / FAIL / NOT RUN
Isolated Steam integrity check: PASS / FAIL / NOT RUN
Issue description (no dialogue transcription or personal data):
```

Any clipping, missing glyphs, timing regression or restoration mismatch blocks visual qualification. Record incomplete checks as NOT RUN. Use [Support](SUPPORT.md) for reporting problems.

## 繁體中文速讀

先確認測試帳戶、存檔與 Steam Cloud 隔離，再開始五分鐘觀察；單純複製遊戲目錄不夠。依序檢查一般對白、高密度換行、選項、過場及四種 UI 字型，最後關閉遊戲並還原、核對原檔雜湊。繁中序章缺少原字幕軌，配對只顯示另一語屬預期行為。載入、首次下載與 Steam 驗證不計入五分鐘；沒測到的項目請填 NOT RUN。
