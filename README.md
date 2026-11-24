<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=19d2e89bc0bfda8f">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=09776febd8671ccc">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=8c5ceb9432b76c47">
  <img alt="Psycho-Sleuth Dual Subtitles — Browser Web Patcher & Windows x64 tool for 4 languages, 6 pairs, and 12 display orders" src="assets/hero-light.svg?v=e92cfbcf83063b48">
</picture>

<br>

**English** · **[日本語](README.ja.md)** · **[繁體中文](README.zh-Hant.md)** · **[简体中文](README.zh-Hans.md)**

<br>

**[🎨 Open Illustrated 4-Step Guide & Web Patcher (Zero CMD · Build 26746656 & 26481838)](https://snowyukitty.github.io/psycho-sleuth-subtitles/)**

**[Download Offline ZIP (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[Release Notes & SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[All Releases](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[Compact Quick Guide](docs/README.en.md) · [Support](SUPPORT.md) · [Next Candidate Notes](RELEASE_NOTES.md) · [Changelog](CHANGELOG.md) · [Terms](LICENSE)

</div>

---

An unofficial **Windows x64** dual-subtitle tool for Steam's ***Psycho-Sleuth* (*病能探偵* / *異病偵探* / *异病侦探*)** that pairs built-in official translations already inside your game — ideal for bilingual play, Japanese language learning, and translation comparison.

- **Pick any 2 of 4 languages in either order:** **English**, **日本語**, **繁體中文**, and **简体中文** (**6 pairs, 12 top/bottom arrangements**).
- **Zero-CMD Browser Web Patcher (Recommended):** Patch directly inside **Microsoft Edge** or **Google Chrome** with interactive live subtitle preview, zero downloaded executables, zero terminal windows, and **0 bytes uploaded**.
- **Separate official Chinese tracks:** Traditional and Simplified Chinese read their own built-in script columns — never machine-translated or auto-converted.
- **100% interoperable, one-click reversible:** Both the Browser Web Patcher and the offline ZIP tool share the exact same `.psycho-sleuth-subtitles/original` backup format for byte-exact rollback anytime.

> **Reading in another language?** 日本語の方は **[日本語版 README](README.ja.md)**、繁體中文玩家請看 **[繁體中文版 README](README.zh-Hant.md)**、简体中文玩家请看 **[简体中文版 README](README.zh-Hans.md)**。

---

## Choose Your Installation Method

| Method | Best For | Steam Builds Supported | Security Prompts / Terminal |
| --- | --- | --- | --- |
| **[Browser Web Patcher](https://snowyukitty.github.io/psycho-sleuth-subtitles/)** *(Recommended)* | Most Windows 10/11 players (Edge / Chrome) | **`26746656`** (`2026-11-20`) & **`26481838`** | **None** (zero `.cmd`, zero `.exe`, zero SmartScreen / Smart App Control prompts) |
| **[Offline ZIP (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** | Steam library auto-detection & CLI switches | `26481838` *(Build `26746656` preview.2 ZIP pending QA)* | Runs `.cmd` + SHA-256-verified official `python.exe` from `python.org` |

---

## Option 1 — Illustrated 4-Step Web Patcher (Recommended, Zero CMD)

> Want picture instructions? Open **[https://snowyukitty.github.io/psycho-sleuth-subtitles/](https://snowyukitty.github.io/psycho-sleuth-subtitles/)** in **Microsoft Edge** or **Google Chrome** — everything runs locally in 4 steps:

1. **Close *Psycho-Sleuth*** completely, and keep the Web Patcher open in Edge or Chrome.
2. **Pick your 2 languages** (Top line + Bottom clue-blue line, previewed live on screen).
3. **Pick your game folder & click Apply** (find it in Steam → Right-click game → *Manage* → *Browse local files*; allow *"Edit files"* when prompted — clean originals are auto-backed up first).
4. **Launch the game** and set in-game text language to **Traditional Chinese (`繁體中文`)** or **Japanese (`日本語`)**!

*(Need vanilla back? Close the game, revisit the page, pick the folder again, and click **Restore Original Game** — or use `Restore.cmd`.)*

---

## Option 2 — Offline ZIP Quick Start (4 Steps)

1. **Prepare a clean Steam copy & close the game:** Make sure *Psycho-Sleuth* is installed on Windows via Steam, **close the game completely**, and set Steam Updates to **Only update this game when I launch it** while patching.
2. **Download and extract the ZIP:** Download **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`** from [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) and extract the **entire ZIP** into a writable folder (keep `_tool` next to `Install.cmd` and `Restore.cmd`).
   *No manual Python install needed — on first run, it automatically downloads a SHA-256-verified ~12 MB official signed embeddable Python runtime from `python.org` without touching your system Python.*
3. **Double-click `Install.cmd` and pick your two languages:** Choose the **top** language (`1` EN · `2` 日本語 · `3` 繁體 · `4` 简体), then the **bottom** language (for example, `2` then `3` for Japanese over Traditional Chinese).
4. **Launch and set the in-game text language:** Set in-game text language to **Traditional Chinese (`繁體中文`)** or **Japanese (`日本語`)** — both display your chosen dual subtitles automatically.

---

## Why You Can Trust This

- **0 bytes uploaded in Browser mode:** Opening the Web Patcher processes local files purely inside browser memory — you can even disconnect from Wi-Fi after loading the page and it still completes patching and verification.
- **Plain, inspectable scripts in Offline ZIP mode:** Everything inside `_tool\` is readable source text you can inspect in Notepad before running; the only executable launched is the SHA-256-verified official signed `python.exe` from `python.org`.
- **Zero risk to saves or your system Python:** Never touches Unity saves, PlayerPrefs, Steam Cloud, or your system Python installation.
- **Always reversible:** Saves byte-exact backups in `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` before modifying game files. Restore with one click in the Web Patcher, double-click **`Restore.cmd`**, or use Steam's **Verify integrity of game files**.
- **Windows SmartScreen / Smart App Control note:** Because offline `.cmd` scripts are unsigned, Windows Defender SmartScreen may show *"Windows protected your PC"* (**More info → Run anyway**), while Windows 11 PCs with **Smart App Control** enforced can block internet-downloaded scripts without an override button. Use the **[Browser Web Patcher](https://snowyukitty.github.io/psycho-sleuth-subtitles/)** above (zero downloaded scripts) or right-click the downloaded ZIP → **Properties → Unblock** before extracting.

---

## Everyday Tips

- **Switch pairs or flip top/bottom anytime:** Close the game and re-apply in either the Web Patcher or `Install.cmd` — verified originals in `.psycho-sleuth-subtitles/original` are reused automatically.
- **Restore the untouched original game:** Close the game and click **Restore Original Files** in the Web Patcher or double-click **`Restore.cmd`** (or press `R` on the first screen of `Install.cmd`). Keep `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` intact until restoration completes.
- **Interrupted mid-install?** Do not launch the game. Simply re-open the Web Patcher or re-run `Install.cmd` / `Restore.cmd` to recover cleanly.
- **After a Steam game update:** Never copy old backups over updated files. If hashes mismatch, run Steam's **Verify integrity of game files**, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and wait for a compatible update.
- **Upgrading from `0.1.0-preview.1`:** Extract the new ZIP into a separate folder and run its `Install.cmd` directly (or switch to the Web Patcher) while keeping `.psycho-sleuth-subtitles` in the game folder. *(Note: option `4` now selects Simplified Chinese; use `R` or `Restore.cmd` to restore.)*

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

---

<details>
<summary><strong>Optional Command-Line Usage & SHA-256 Check (Offline ZIP)</strong></summary>

Inside the extracted offline ZIP folder, pass arguments directly to `Install.cmd` or `Restore.cmd` in PowerShell or Command Prompt:

```powershell
# Optional download checksum verification
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# Interactive menu or non-interactive examples (en, ja, zh-Hant, zh-Hans)
.\Install.cmd
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
<summary><strong>How It Works & Safety Verification</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5f7c29179f1e34e8">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=3133d55cd17b0977">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=8333db78d688b9aa">
  <img alt="Four-stage patch pipeline: Preflight and SHA-256 verification, journaled backup, local script and 22-cutscene merge, and reversible switch or exact restore" src="assets/architecture-light.svg?v=73720fef52917fa0">
</picture>

</div>

1. **Strict preflight (`supported-build.json` / Web builds profile):** Validates the Windows x64 Steam IL2CPP runtime, Unity data containers, and Addressables catalogs against pinned hashes before modifying anything, refusing unknown builds or third-party mods.
2. **Zero-upload runtime & journaled backup:** Runs locally either inside Edge/Chrome (File System Access API + pure-JS UnityFS/LZMA1) or via the pinned official Python 3.14.10 embeddable runtime (~12 MB) from `python.org`. Clean originals stay in `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` with `transaction.json` recovery journals and dual receipts (`installed.json` / `installed.json.bak`).
3. **Preserves voice, choices & timing:** Patches story dialogue, branching choices, localized text tables, TextMeshPro sizing/catalog hashes, and **22 video `.srt` subtitle tracks** while leaving voice cells (`157,263` on Build `26746656`) and non-subtitle objects (`10,898`) intact.

</details>

---

## Scope & Preview Notes

- **Covered text:** Story dialogue, branching choices, and **22 cutscene `.srt` subtitle sets**. Menus, character names, and clue UI remain in the game's selected UI language.
- **Dense dialogue boxes:** Most lines stack vertically (top above bottom). A small number of tight dialogue boxes use inline pairing in the same order to preserve original click timing; identical strings appear once.
- **Prologue & missing lines:** The original game lacks a Traditional Chinese prologue video `.srt`, so pairs containing `繁體中文` show only the other selected language there (`简体中文` if paired with it). Dialogue rows missing either selected translation remain in the game's current text language, and differing cutscene timestamps can briefly show one language alone.
- **Preview verification honesty:** Both the Browser Web Patcher and offline Python engine pass all **12 display orders** byte-for-byte on isolated Build `26746656` assets (plus bidirectional `Install`/`Restore` interoperability). Full in-game visual QA (long wrapped lines, choices, English/Simplified Chinese UI fonts, and cutscenes) remains pending — please use **Traditional Chinese or Japanese** as your in-game text setting for now.

---

## Release status

> **Live Web Patcher & Steam Build `26746656` (`2026-11-20`) Support:** Use the **[Browser Web Patcher](https://snowyukitty.github.io/psycho-sleuth-subtitles/)** today for zero-CMD patching on both Steam **Build `26746656`** and **Build `26481838`**.

- **Web Patcher (live now):** Supports Steam Builds `26746656` and `26481838` locally in Edge/Chrome with byte-exact parity against Python outputs.
- **Downloadable Offline ZIP (`v0.2.0-preview.1`):** Supports Steam Build `26481838` (safely refuses Build `26746656` without modifying files).
- **Offline ZIP Candidate (`v0.2.0-preview.2`, not yet published):** Updated for Steam **Build `26746656`**, automated 12-order/3-runtime/CMD checks complete; in-game visual QA still pending. See [verification coverage](TESTING.md), [visual checklist](VISUAL_QA.md), and [candidate notes](RELEASE_NOTES.md).

---

## Support, Contributing & Terms

- Questions or Steam update? Check [SUPPORT.md](SUPPORT.md) or open an issue on [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues).
- Want to help with docs, localization, or layout feedback? Read [CONTRIBUTING.md](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md).
- Security disclosures: [SECURITY.md](SECURITY.md) · Full changelog: [CHANGELOG.md](CHANGELOG.md).

*Search keywords / 対応タイトル:* *Psycho-Sleuth*, *病能探偵*, *異病偵探*, *异病侦探*, dual subtitles, bilingual visual novel patch, Japanese learning tool, Steam Web Patcher.

Free use under [LICENSE](LICENSE); other rights are reserved (not open source / MIT). Please share links to this repository, the [Web Patcher](https://snowyukitty.github.io/psycho-sleuth-subtitles/), or official [Releases](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) rather than re-uploading archives. Unofficial fan project requiring a legitimately installed Steam copy of *Psycho-Sleuth*. Official embeddable Python retains its own license.
