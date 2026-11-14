# Psycho-Sleuth Dual Subtitles — User Guide

[English](README.en.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

An unofficial **Windows x64 preview** that combines translations already installed with your copy of *Psycho-Sleuth*. No added voices, API keys, or game-text uploads. This package contains no copyrighted game assets or full dialogue scripts.

## Install

1. Download **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip** from the [`v0.2.0-preview.1` release](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1).
   *(Optional checksum check in PowerShell: `Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip` and compare against `SHA256SUMS.txt`.)*
2. Extract the entire ZIP into a writable folder. Keep the `_tool` folder and its contents together with `Install.cmd` and `Restore.cmd`.
3. Close *Psycho-Sleuth* completely and pause Steam auto-updates. Double-click **Install.cmd**.
4. The installer detects Steam libraries automatically. If prompted, paste the writable game folder path.
5. Choose the **top** language, then the **bottom** language. Numbers stay the same on both screens; the second screen excludes your first choice.

| Number | Language |
| --- | --- |
| 1 | English |
| 2 | 日本語 — Japanese |
| 3 | 繁體中文 — Traditional Chinese |
| 4 | 简体中文 — Simplified Chinese |

Any two different languages work: **6 pairs, 12 display orders**, including Traditional/Simplified Chinese. For example, **1 → 4** displays English above Simplified Chinese; **4 → 1** reverses them. Choosing the bottom language starts installation. On the first screen, **R** restores originals and **0** exits; on the second screen, **0** goes back. *(In 0.2.0-preview.1, number 4 is Simplified Chinese, not restore.)*

6. In the game, select **Traditional Chinese** or **Japanese** as the text language. Either setting displays the pair chosen in this tool for dialogue with both translations; see Scope below for exceptions.

The first launch needs internet access to download about **12 MB** of the official Python 3.14.10 embeddable runtime from `python.org`. Its SHA-256 checksum is verified before saving `_tool\python-runtime.zip` locally for reuse, and each launch verifies that cache again before unpacking into a clean temporary runtime folder under `%TEMP%` (removed automatically on exit). You do not need to install Python, and any existing system Python stays untouched.

### Optional Command-Line Flags

You can also open PowerShell or Command Prompt **inside the extracted folder** and pass arguments directly to `Install.cmd` or `Restore.cmd`:

- `.\Install.cmd --pair en-ja` — install without prompts using a named pair (`top-bottom`)
- `.\Install.cmd --top ja --bottom zh-Hant` — choose top and bottom explicitly (`en`, `ja`, `zh-Hant`, `zh-Hans`)
- `.\Install.cmd --list-pairs` — print all 12 supported orders
- `.\Restore.cmd` — immediately restore exact original files

## Switch, Upgrade, or Restore

Close the game, then re-run **Install.cmd** anytime to switch languages or reverse top/bottom order. Double-click **Restore.cmd** to restore the exact original files byte-for-byte. Verified backups are kept in `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`; retain `.psycho-sleuth-subtitles` until restoration is complete. If an installation is interrupted, re-run Install or Restore to finish recovery before launching the game.

**Upgrading from 0.1.0-preview.1:** extract the new ZIP into a separate folder and run its `Install.cmd`. A recognized installation reuses the verified original backups automatically—no manual restoration needed. Keep `.psycho-sleuth-subtitles` intact inside the game folder. Compatibility checks still verify files if Steam or another tool modified them.

**After a Steam update:** **never copy old backups over new game files**. Unknown builds and third-party mods are refused safely. If recovery is refused after a Steam patch, run Steam's **Verify integrity of game files** first, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and wait for a compatible tool release.

## Troubleshooting

- **Installer says the game is still running:** Close *Psycho-Sleuth* from Steam or Task Manager and try again.
- **First launch fails downloading Python runtime:** Check firewall/antivirus access to `python.org` (`~12 MB`) and re-run `Install.cmd`. The downloader validates the exact pinned SHA-256 before running anything.
- **Only one language appears on a line or prologue scene:** The built-in game files miss Traditional Chinese in the prologue cutscene and a few untranslated dialogue rows (see Scope below).
- **Need more help?** See [SUPPORT.md](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/SUPPORT.md) or open an issue on [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues).

## Scope and Preview Limitations

- Includes story dialogue, scenario choices, and 22 cutscene `.srt` subtitle sets. Menus, character names, and clue UI retain the game's selected text language.
- Most dialogue boxes stack lines vertically (top above bottom); a small set of dense pages use inline pairing in the same order to preserve original click timing. Identical source strings appear once.
- The original Traditional Chinese prologue subtitle is missing, so pairs containing it display only the other chosen language there (`简体中文` if paired with it). Different cutscene timing can briefly show one language alone. Dialogue rows missing either selected translation remain unchanged in the game's current text language (which can be blank).
- Traditional and Simplified Chinese use the game's **separate built-in translations**; no automatic character conversion is performed.
- Only supported clean Steam files or recognized tool installations are accepted. All 12 orders pass automated isolated-data checks (including voice and non-subtitle object preservation), while full in-game visual qualification of long lines, choices, English/Simplified Chinese UI fonts, and cutscenes remains pending.

## Terms

Free download and personal installation/backup use under the included **LICENSE.txt**; other rights are reserved. Share links to the [official release page](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) rather than re-uploading archives. Readable scripts only—not an encrypted executable. Unaffiliated with the game's creators; grants no rights to game assets or scripts. A legitimately installed copy of *Psycho-Sleuth* is required.

Official Python retains its own license included in the downloaded runtime archive. [Python 3.14.10 release and checksum](https://www.python.org/downloads/release/python-31410/).
