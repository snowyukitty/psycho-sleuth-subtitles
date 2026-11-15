<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=0b635f04549a467c">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=2ed088de2dd8572b">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=0bc36a0d637e41c9">
  <img alt="Psycho-Sleuth Dual Subtitles — Four languages, any two, either order (6 pairs, 12 display orders) on Windows x64" src="assets/hero-light.svg?v=2cde4044899b0f63">
</picture>

<br>

**[Download Preview ZIP (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[Release Notes & SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[All Releases](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

**Guides:** **[English](docs/README.en.md)** · **[日本語](docs/README.ja.md)** · **[繁體中文](docs/README.zh-Hant.md)** · **[简体中文](docs/README.zh-Hans.md)**

**Docs:** [Support](SUPPORT.md) · [Release Notes](RELEASE_NOTES.md) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Terms](LICENSE)

</div>

---

An unofficial **Windows x64** dual-subtitle patcher for Steam's ***Psycho-Sleuth* (*病能探偵* / *異病偵探* / *异病侦探*)** that combines built-in official translations already present in your local game installation—designed for bilingual playthroughs, Japanese language learning, and script comparison.

- **Four languages, any two, either order:** Mix **English**, **Japanese (`日本語`)**, **Traditional Chinese (`繁體中文`)**, and **Simplified Chinese (`简体中文`)** across **6 pairs and 12 display orders**.
- **Separate official Chinese scripts:** Traditional and Simplified Chinese use the game's own separate script columns—no machine translation or automated character conversion.
- **Local-only patching:** No added voices, API keys, telemetry, or game-text uploads. Only the first run downloads the pinned official Python 3.14.10 runtime (~12 MB) from `python.org`, verifies its SHA-256, and caches the verified archive locally under `_tool`. No copyrighted game assets or full scripts are distributed here.
- **Transactional & reversible:** Saves verified original backups into `.psycho-sleuth-subtitles/original`, switches language pairs without manual rollback, and restores byte-exact Steam originals via `Restore.cmd`.

> **Quick Language Summary:** 四語任選兩種，上下順序自由選。 / 四语言任选两种，上下顺序自由选择。 / 4言語から2言語を選び、上下の順序も自由に指定できます。

---

## Release status

**Download available: v0.2.0-preview.1.** The four guides above describe that published version. No mod loader is required; this tool adds neither furigana nor voice acting.

**Next candidate: v0.2.0-preview.2 — automated checks complete, in-game visual QA pending.** It is not available for download yet. Its installer localization and layout/recovery improvements are not features of the current download.

- 61 tests pass under normal Python, optimized Python and the pinned embedded runtime.
- All 12 display orders pass isolated-data checks; both published prior versions pass upgrade and byte-exact restoration tests.
- Five interrupted legacy-install boundaries and five runtime bootstrap cases also pass; see the [verification coverage](TESTING.md).
- Screen readability, mixed-language fonts and human listening have not been qualified. See the [five-minute visual check](VISUAL_QA.md) and [candidate notes](RELEASE_NOTES.md).

繁體中文：目前可下載 preview.1；preview.2 已完成自動驗證，仍待實機畫面確認，尚未發布。
日本語：公開中は preview.1。preview.2 は自動検証済みですが、実機画面の確認待ちで未公開です。
简体中文：目前可下载 preview.1；preview.2 已完成自动验证，仍待实机画面确认，尚未发布。

## Supported Pairs (6 Pairs · 12 Display Orders)

| Menu Selection | Top Track → Bottom Track | CLI `--pair` Alias |
| --- | --- | --- |
| `1 → 2` / `2 → 1` | English / 日本語 | `en-ja` / `ja-en` |
| `1 → 3` / `3 → 1` | English / 繁體中文 | `en-zh-Hant` / `zh-Hant-en` |
| `1 → 4` / `4 → 1` | English / 简体中文 | `en-zh-Hans` / `zh-Hans-en` |
| `2 → 3` / `3 → 2` | 日本語 / 繁體中文 | `ja-zh-Hant` / `zh-Hant-ja` |
| `2 → 4` / `4 → 2` | 日本語 / 简体中文 | `ja-zh-Hans` / `zh-Hans-ja` |
| `3 → 4` / `4 → 3` | 繁體中文 / 简体中文 | `zh-Hant-zh-Hans` / `zh-Hans-zh-Hant` |

All four detailed player guides are also bundled inside the download ZIP under `docs/`.

---

## Quick Start

1. Download **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`** from the [`v0.2.0-preview.1` release](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) (optionally verify its checksum against `SHA256SUMS.txt`).
2. **Extract the entire ZIP** into a writable folder. Keep the `_tool` folder alongside `Install.cmd` and `Restore.cmd`.
3. **Close *Psycho-Sleuth* and pause Steam auto-updates**, then double-click **`Install.cmd`**.
   - Auto-detects Steam library folders locally; if prompted, paste your writable game folder path.
   - First launch downloads about **12 MB** of the official Python 3.14.10 embeddable runtime from `python.org`, caches the verified ZIP under `_tool\python-runtime.zip`, verifies its pinned SHA-256 on every launch, and unpacks into a clean `%TEMP%` directory that is removed on exit (system Python stays untouched).
4. Pick the **top** subtitle language (`1`–`4`), then the **bottom** language:
   - `1` = English · `2` = 日本語 · `3` = 繁體中文 · `4` = 简体中文
   - First screen: `R` restores originals, `0` exits. Second screen: `0` returns. *(Upgrading from `0.1.0-preview.1`: note that option `4` now selects Simplified Chinese; use `R` or `Restore.cmd` to restore.)*
5. Launch the game and set in-game text language to **Traditional Chinese (`繁體中文`) or Japanese (`日本語`)**. Either setting displays your chosen pair on dialogue with both translations.

### Switching Pairs, Upgrading from 0.1.0, or Restoring

- **Switch pairs or reverse order:** Close the game and re-run `Install.cmd`—verified originals are reused automatically.
- **Upgrade from `0.1.0-preview.1`:** Extract the new ZIP into a separate folder and run its `Install.cmd` directly while keeping `.psycho-sleuth-subtitles` in the game directory.
- **Exact rollback:** Double-click **`Restore.cmd`** (or press `R` in `Install.cmd`) to restore every patched file byte-for-byte.
- **After a Steam update:** Never overwrite updated game files with old backups. If compatibility checks refuse recovery, run Steam's **Verify integrity of game files** first, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and wait for a compatible release.

### Command-Line Usage (Optional)

Launchers forward arguments directly to the installer (`Install.cmd` / `Restore.cmd` can also be invoked from PowerShell or Command Prompt):

```powershell
# Interactive wizard (lists languages and prompts top then bottom)
.\Install.cmd

# Non-interactive examples
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant

# Exact rollback
.\Restore.cmd
```

---

## How It Works

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5db98538903c646b">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=33e6f6571cfb70de">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=3baf536cab5b7ce6">
  <img alt="Four-stage patch pipeline: Preflight and SHA-256 runtime, journaled backup, local script and 22-cutscene merge, and reversible switch or exact restore" src="assets/architecture-light.svg?v=cb158551b91975e5">
</picture>

</div>

1. **Strict preflight (`supported-build.json`):** Validates the Windows x64 Steam IL2CPP runtime, Unity data containers, and Addressables catalogs against pinned hashes before modifying anything, refusing unknown builds or third-party mods.
2. **Staged journal & backup:** Stores clean originals under `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`, writes recovery journals and SHA-256 receipts, and recovers cleanly if an earlier installation was interrupted.
3. **Preserves voice, choices & timing:** Patches scenario dialogue, branching choices, localized text tables, TextMeshPro sizing/catalog hashes, and **22 video `.srt` subtitle tracks** while leaving voice cells (`157,099`) and non-subtitle objects (`10,858`) intact.

---

## Preview Scope & Known Limitations

- **Covered text:** Story dialogue, scenario choices, and cutscene `.srt` subtitles. Menus, speaker names, and clue UI remain in the game's selected UI language.
- **Dense pages:** Most rows render stacked (top above bottom). A small number of tight dialogue boxes use inline pairing in the same top-to-bottom order to match original click pacing; identical strings appear once.
- **Prologue & missing lines:** The official game lacks a Traditional Chinese prologue video `.srt`, so pairs containing `zh-Hant` show only the other selected language there (`zh-Hans` if selected). Dialogue rows missing either selected translation retain the game's current text language (and can be blank if absent there). Different cutscene timestamps can briefly show one track alone.
- **Testing & visual QA status:** All **12 display orders**, switching, `0.1.0 -> 0.2.0` upgrades, non-ASCII paths with spaces, preserved voice/control counts, and byte-exact restoration pass automated isolated-data verification. Full in-game visual QA (long wrapped lines, choices, English/Simplified Chinese UI font behavior, and cutscenes) remains pending—please use **Traditional Chinese or Japanese** as your in-game text language setting for now.

---

## Support, Documentation & Terms

- Need help or hit an incompatible Steam update? Read [SUPPORT.md](SUPPORT.md) or open an issue on [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues).
- For upcoming preview.2 layout, recovery, installer language (`--lang`) and process-check improvements, see [CHANGELOG.md](CHANGELOG.md).
- Reporting a potential security issue? Check [SECURITY.md](SECURITY.md).
- Want to improve docs, translations, or tooling? Read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).

Free download and personal installation/backup use under [LICENSE](LICENSE); other rights are reserved. Please share links to this repository or the official [Releases page](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) rather than re-uploading packages. This tool is unofficial, unaffiliated with the game's creators, and grants no rights to game assets or scripts. A legitimately installed copy of *Psycho-Sleuth* on Steam is required. Official embeddable Python remains under its own license.
