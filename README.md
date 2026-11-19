<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=0b635f04549a467c">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=2ed088de2dd8572b">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=0bc36a0d637e41c9">
  <img alt="Psycho-Sleuth Dual Subtitles — Four languages, any two, either order (6 pairs, 12 display orders) on Windows x64" src="assets/hero-light.svg?v=2cde4044899b0f63">
</picture>

<br>

**English** · **[日本語](README.ja.md)** · **[繁體中文](README.zh-Hant.md)** · **[简体中文](README.zh-Hans.md)**

<br>

**[Download Preview ZIP (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[Release Notes & SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[All Releases](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[Compact Quick Guide](docs/README.en.md) · [Support](SUPPORT.md) · [Next Candidate Notes](RELEASE_NOTES.md) · [Changelog](CHANGELOG.md) · [Terms](LICENSE)

</div>

---

An unofficial **Windows x64** dual-subtitle tool for Steam's ***Psycho-Sleuth* (*病能探偵* / *異病偵探* / *异病侦探*)** that pairs built-in official translations already inside your game — ideal for bilingual play, Japanese study, and comparing translations.

- **Pick any 2 of 4 languages in either order:** **English**, **日本語**, **繁體中文**, and **简体中文** (**6 pairs, 12 top/bottom arrangements**).
- **Separate official Chinese scripts:** Traditional and Simplified Chinese use the game's own distinct script columns — never machine-translated or auto-converted.
- **Zero setup hassle:** No Python install required, no mod loader, no API keys, no added voices, and no game-text uploads.
- **One-click reversible:** Verified backups stay safe in your game folder so you can switch pairs anytime or roll back byte-for-byte with `Restore.cmd`.

> **Reading in another language?** 日本語の方は **[日本語版 README](README.ja.md)**、繁體中文玩家請看 **[繁體中文版 README](README.zh-Hant.md)**、简体中文玩家请看 **[简体中文版 README](README.zh-Hans.md)**。

---

## Quick Start (4 Simple Steps)

### 1. Prepare a clean Steam copy & close the game
- Make sure *Psycho-Sleuth* is installed on Windows via Steam, **close the game completely**, and pause Steam auto-updates while patching.

### 2. Download and extract the ZIP
- Download **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`** from [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1).
- Extract the **entire ZIP** into a writable folder (keep the `_tool` folder next to `Install.cmd` and `Restore.cmd`).
- *No manual Python install needed — on first run, it automatically downloads a SHA-256-verified ~12 MB official Python runtime from `python.org` without touching your system Python.*

### 3. Double-click `Install.cmd` and pick your two languages
- The installer usually detects your Steam folder automatically (if prompted, paste your writable game folder path).
- Choose the **top** language, then the **bottom** language:
  - `1` = English
  - `2` = 日本語 (Japanese)
  - `3` = 繁體中文 (Traditional Chinese)
  - `4` = 简体中文 (Simplified Chinese)
  - *For example, press `2` then `3` for Japanese on top and Traditional Chinese on the bottom.*
- Installation starts immediately once you select the bottom language.

### 4. Launch the game and set the text language
- Start *Psycho-Sleuth* and set the in-game text language to **Traditional Chinese (`繁體中文`)** or **Japanese (`日本語`)**.
- Both settings display your chosen dual-subtitle pair automatically.

---

## Everyday Tips

- **Switch pairs or flip top/bottom anytime:** Close the game and double-click **`Install.cmd`** again — verified originals are reused automatically.
- **Restore the untouched original game:** Close the game and double-click **`Restore.cmd`** (or press `R` on the first screen of `Install.cmd`). Keep `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` intact until restoration completes.
- **Interrupted mid-install?** Do not launch the game. Simply re-run `Install.cmd` or `Restore.cmd` to recover cleanly.
- **After a Steam game update:** Never copy old backups over updated files. If the tool refuses newer hashes, run Steam's **Verify integrity of game files**, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and wait for a compatible release.
- **Upgrading from `0.1.0-preview.1`:** Extract the new ZIP into a separate folder and run its `Install.cmd` directly while keeping `.psycho-sleuth-subtitles` in the game folder. *(Note: option `4` now selects Simplified Chinese; use `R` or `Restore.cmd` to restore.)*

---

## Supported Pairs (6 Pairs · 12 Display Orders)

| Menu Selection | Top Track → Bottom Track | CLI `--pair` Alias |
| --- | --- | --- |
| `1 → 2` / `2 → 1` | English / 日本語 | `en-ja` / `ja-en` |
| `1 → 3` / `3 → 1` | English / 繁體中文 | `en-zh-Hant` / `zh-Hant-en` |
| `1 → 4` / `4 → 1` | English / 简体中文 | `en-zh-Hans` / `zh-Hans-en` |
| `2 → 3` / `3 → 2` | 日本語 / 繁體中文 | `ja-zh-Hant` / `zh-Hant-ja` |
| `2 → 4` / `4 → 2` | 日本語 / 简体中文 | `ja-zh-Hans` / `zh-Hans-ja` |
| `3 → 4` / `4 → 3` | 繁體中文 / 简体中文 | `zh-Hant-zh-Hans` / `zh-Hans-zh-Hant` |

All four compact player guides are also bundled inside the download ZIP under `docs/`.

---

<details>
<summary><strong>Optional Command-Line Usage & SHA-256 Check</strong></summary>

Inside the extracted folder, you can pass arguments directly to `Install.cmd` or `Restore.cmd` in PowerShell or Command Prompt:

```powershell
# Optional download checksum verification
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# Interactive menu (lists languages and prompts top then bottom)
.\Install.cmd

# Non-interactive examples (codes: en, ja, zh-Hant, zh-Hans)
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant

# Byte-exact rollback
.\Restore.cmd
```

Legacy aliases `zh-en` and `zh-ja` resolve to Traditional Chinese on top; `ja-en` is unchanged.

</details>

<details>
<summary><strong>How It Works & Safety Verification</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5db98538903c646b">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=33e6f6571cfb70de">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=3baf536cab5b7ce6">
  <img alt="Four-stage patch pipeline: Preflight and SHA-256 runtime, journaled backup, local script and 22-cutscene merge, and reversible switch or exact restore" src="assets/architecture-light.svg?v=cb158551b91975e5">
</picture>

</div>

1. **Strict preflight (`supported-build.json`):** Validates the Windows x64 Steam IL2CPP runtime, Unity data containers, and Addressables catalogs against pinned hashes before modifying anything, refusing unknown builds or third-party mods.
2. **Verified runtime & journaled backup:** Fetches the pinned official Python 3.14.10 embeddable runtime (~12 MB) from `python.org`, caches it under `_tool\python-runtime.zip`, verifies its SHA-256 on every launch, and runs in an isolated `%TEMP%` directory cleaned on exit. Clean originals are stored under `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` with recovery journals.
3. **Preserves voice, choices & timing:** Patches story dialogue, branching choices, localized text tables, TextMeshPro sizing/catalog hashes, and **22 video `.srt` subtitle tracks** while leaving voice cells (`157,099`) and non-subtitle objects (`10,858`) intact.

</details>

---

## Scope & Preview Notes

- **Covered text:** Story dialogue, branching choices, and **22 cutscene `.srt` subtitle sets**. Menus, character names, and clue UI remain in the game's selected UI language.
- **Dense dialogue boxes:** Most lines stack vertically (top above bottom). A small number of tight dialogue boxes use inline pairing in the same order to preserve original click timing; identical strings appear once.
- **Prologue & missing lines:** The original game lacks a Traditional Chinese prologue video `.srt`, so pairs containing `繁體中文` show only the other selected language there (`简体中文` if paired with it). Dialogue rows missing either selected translation remain in the game's current text language (which can be blank), and differing cutscene timestamps can briefly show one language alone.
- **Preview verification honesty:** All **12 display orders**, pair switching, `0.1.0 -> 0.2.0` upgrades, non-ASCII paths with spaces, preserved voice/control counts, and byte-exact restoration pass automated isolated-data checks. Full in-game visual QA (long wrapped lines, choices, English/Simplified Chinese UI fonts, and cutscenes) remains pending — please use **Traditional Chinese or Japanese** as your in-game text setting for now.

---

## Release status

- **Download available now: `v0.2.0-preview.1`** — the Quick Start steps and four guides match this published release.
- **Next candidate: `v0.2.0-preview.2` (not yet published)** — automated checks, installer localization, and crash-recovery tests are complete; in-game visual QA is still pending. See [verification coverage](TESTING.md), the [five-minute visual check](VISUAL_QA.md), and [candidate notes](RELEASE_NOTES.md).

---

## Support, Contributing & Terms

- Stuck or hit a Steam update? Check [SUPPORT.md](SUPPORT.md) or open an issue on [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues).
- Want to help refine translations, docs, or layout reports? Read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).
- Security concerns? See [SECURITY.md](SECURITY.md). Full release history is in [CHANGELOG.md](CHANGELOG.md).

Free download and personal installation/backup use under [LICENSE](LICENSE); other rights are reserved (not open source / MIT). Please share links to this repository or the official [Releases page](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) rather than re-uploading archives. This tool is unofficial, unaffiliated with the game's creators, and requires a legitimately installed copy of *Psycho-Sleuth* on Steam. Official embeddable Python retains its own license.
