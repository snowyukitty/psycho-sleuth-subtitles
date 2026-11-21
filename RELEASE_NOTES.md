# v0.2.0-preview.2 candidate — not yet published

The current downloadable version is [v0.2.0-preview.1](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1). These notes describe the next candidate. The guides linked below describe the published version; candidate guides will ship with its ZIP.

## Four languages, six pairs, twelve orders

After publication, download **Psycho-Sleuth-Subtitles-0.2.0-preview.2-Minimal.zip**, extract it, and double-click **Install.cmd**. Choose the top language, then the bottom language. The ZIP includes four user guides and a one-click Restore.cmd. **SHA256SUMS.txt** is provided separately for download verification.

**[English](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.en.md) · [日本語](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.ja.md) · [繁體中文](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.zh-Hant.md) · [简体中文](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.zh-Hans.md)**

- **English:** Choose any two of English, Japanese, Traditional Chinese and Simplified Chinese: 6 pairs, 12 orders. Both Chinese variants use original game translations. Close the game before upgrading; extract into a new folder and run the new installer, keeping the game's existing backup folder.
- **日本語:** 英語・日本語・繁体字中国語・簡体字中国語から2言語を選択。6組、上下の順序を含めて12通りに対応しました。中国語はそれぞれゲーム内の翻訳を使用します。更新時はゲームを終了し、別フォルダーに展開した新版を実行してください。ゲーム内の既存バックアップは保管してください。
- **繁體中文:** 英文、日文、繁中、簡中任選兩種，支援6種配對、12種上下排列。繁簡各用遊戲原有譯文。升級請先關閉遊戲，將新版解壓到另一個資料夾後執行，保留遊戲內既有備份資料夾。
- **简体中文:** 英文、日文、繁中、简中任选两种，支持6种配对、12种上下排列。繁简各用游戏原有译文。升级请先关闭游戏，将新版解压到另一个文件夹后运行，保留游戏内现有备份文件夹。

Windows x64. First launch downloads about 12 MB of verified official Python runtime. No added voices, API key or game-text upload. Legacy command-line pairs remain supported. The new menu uses 1 = English, 2 = 日本語, 3 = 繁體中文, 4 = 简体中文; **R** restores originals.

**Validation:** All 12 display orders were checked against isolated game data, including dialogue order, four language slots, video timelines, preserved voice/control fields and exact restoration. The guides explain the two-step menu and upgrade path.

**Preview limitations:** Supported clean files or recognized tool installations only. In-game visual qualification is not complete. Use Traditional Chinese or Japanese as the game's text-language setting; the tool's chosen pair is independent. The original Traditional Chinese prologue subtitle is missing; pairs containing it use only the other selected language there. Some dense pages use inline pairs. Read the included guide before installation or recovery after a Steam update.

Free download and use under the included LICENSE.txt; other rights are reserved. The game, its assets and full script are not included.

## Preview.2 changes and artifact

Updated for Steam **Build `26746656`** (`2026-11-20` game update: refreshed asset hashes, Addressables subtitle bundle, and `SubtitlesUGUIVideoPlayer` `path_id`), improved dense-page layout and InputBr height, balanced rich-text tags, BOM/CR subtitle parsing, four-language installer UI (`--lang` / Windows auto-detect), player trust & SmartScreen guidance in the four bundled guides, process checks, directory locks, and interrupted-install recovery. Automated checks on Build `26746656` passed (61 unit tests across 3 Python runtimes, all 12 orders with `49,702` dialogue records / `22` video sets / `157,263` voice cells / `10,898` other objects / `0` estimated overflow, and packaged CMD interactive/CLI/restore roundtrip). See CHANGELOG.md and TESTING.md for details.

ZIP: **63,817 bytes**, 14 allowlisted members.

SHA-256: `c2f5299b23545dafb7e6f127d155a03acfb0246ec1a1b1f0366059de0f3fc49c`

In-game visual qualification: **not_run**. This release remains pending owner Visual QA and publication approval.
