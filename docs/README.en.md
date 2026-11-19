# Psycho-Sleuth Dual Subtitles — User Guide

**English** · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md) · [Full GitHub Page](../README.md)

An unofficial **Windows x64 preview** that pairs built-in official translations already inside your copy of *Psycho-Sleuth*. No added voices, API keys, mod loaders, or game-text uploads.

## Quick Start (4 Simple Steps)

1. **Close the game:** Make sure your Steam copy of *Psycho-Sleuth* is completely closed and pause Steam auto-updates.
2. **Download & extract:** Download **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip** from the [`v0.2.0-preview.1` release](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) and extract the entire ZIP into a writable folder (keep `_tool` alongside `Install.cmd` and `Restore.cmd`).
   *No manual Python install needed — first launch downloads a SHA-256-verified ~12 MB official Python 3.14.10 embeddable runtime from `python.org` into `_tool\python-runtime.zip`, runs in an isolated `%TEMP%` folder cleaned on exit, and leaves system Python untouched.*
3. **Double-click `Install.cmd` and pick 2 languages:** Auto-detection locates Steam libraries (or paste your writable game folder path if prompted). Choose the **top** language, then a different **bottom** language (`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文; e.g., `2 → 3` for Japanese above Traditional Chinese). Installation starts immediately; on the first screen, **R** restores and **0** exits; on the second screen, **0** goes back.
4. **Launch & set in-game text language:** Open *Psycho-Sleuth* and choose **Traditional Chinese (`繁體中文`)** or **Japanese (`日本語`)** as the game text language. Either setting displays your chosen dual-subtitle pair.

## Everyday Tips

- **Switch pairs or flip order:** Close the game and re-run **`Install.cmd`** anytime — verified originals are reused automatically.
- **Restore original files:** Close the game and double-click **`Restore.cmd`** (or press `R` in `Install.cmd`). Keep `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` until restoration finishes.
- **Interrupted mid-install?** Do not launch the game; re-run `Install.cmd` or `Restore.cmd` to recover cleanly.
- **Upgrading from `0.1.0-preview.1`:** Extract the new ZIP into a separate folder and run its `Install.cmd` directly while keeping `.psycho-sleuth-subtitles` inside the game folder. *(Note: `4` now selects Simplified Chinese; use `R` or `Restore.cmd` to restore.)*
- **After a Steam update:** Never copy old backups over new game files. Run Steam's **Verify integrity of game files**, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and wait for a compatible release.

## Quick Troubleshooting

- **Installer says the game is running:** Close *Psycho-Sleuth* completely via Steam or Task Manager and try again.
- **First launch stalls downloading Python:** Check firewall/antivirus access to `python.org` (~12 MB) and retry `Install.cmd`. Only an exact pinned SHA-256 archive runs.
- **Only one language shows in the prologue or a line:** Built-in game files miss Traditional Chinese in the prologue `.srt` and some untranslated dialogue rows (see Scope below).
- **Need more help?** Read [Support](../SUPPORT.md) or report an issue on [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues).

---

<details>
<summary><strong>Supported Pairs & Optional Command-Line Usage</strong></summary>

Any two different languages work across **6 pairs and 12 orders**: `en` (English), `ja` (日本語), `zh-Hant` (繁體中文), `zh-Hans` (简体中文). Traditional and Simplified Chinese use the game's separate built-in translations (never auto-converted).

```powershell
# Optional SHA-256 verification
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# Command-line examples inside the extracted folder
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant
.\Restore.cmd
```

Legacy aliases `zh-en` and `zh-ja` resolve to Traditional Chinese on top; `ja-en` is unchanged.

</details>

<details>
<summary><strong>Scope, Preview Limitations & Terms</strong></summary>

- **Covered text:** Story dialogue, scenario choices, and 22 cutscene `.srt` subtitle sets. Menus, character names, and clue UI keep the game's selected language.
- **Formatting & missing lines:** Most lines stack vertically; a small number of dense pages use inline pairing in the same order to preserve click pacing (identical strings appear once). Because the official Traditional Chinese prologue `.srt` is missing, pairs with `zh-Hant` show only the other chosen language there. Rows missing either selected translation stay in the game's current text language (which can be blank), and differing cutscene timing can briefly show one language alone.
- **Verification status:** Only supported clean Steam files or recognized tool installations are accepted. All 12 orders pass isolated-data checks (with voice and non-subtitle objects preserved), while full in-game visual QA of long lines, choices, English/Simplified Chinese UI fonts, and cutscenes remains pending.
- **Terms:** Free download and personal installation/backup use under [LICENSE](../LICENSE); other rights are reserved (not MIT / open source). Share links to the [official Releases page](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) rather than re-uploading. Unofficial, unaffiliated with the game's creators, and requires a legitimately installed Steam copy of *Psycho-Sleuth*. Official embeddable Python retains its own license ([Python 3.14.10 release and checksum](https://www.python.org/downloads/release/python-31410/)).

</details>
