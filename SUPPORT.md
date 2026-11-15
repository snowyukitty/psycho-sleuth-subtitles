# Support

Need help installing, switching subtitle pairs, or recovering ***Psycho-Sleuth* (*病能探偵* / *異病偵探* / *异病侦探*)** after a Steam update? Check the guides and common fixes below before opening an issue.

## Documentation by Language

- [English User Guide](docs/README.en.md)
- [日本語ガイド](docs/README.ja.md)
- [繁體中文使用說明](docs/README.zh-Hant.md)
- [简体中文使用说明](docs/README.zh-Hans.md)

## Quick Troubleshooting

| Symptom | Likely Cause | Recommended Fix |
| --- | --- | --- |
| *"Game appears to be running"* | *Psycho-Sleuth* is still open (or closing in background). | Close the game completely in Steam / Task Manager and rerun `Install.cmd`. |
| Auto-detection misses custom library or need state check | Game is installed in a non-standard folder or you want to verify installed backups. | Run `.\Install.cmd --detect` to inspect Steam detection, `.\Install.cmd --status` to check receipt status, or pass `--game-dir "<game-folder>"`. |
| Installer stalls before its menu | Network or security software prevents downloading the `~12 MB` official Python runtime from `python.org`. | Check the download error and network access to `python.org`, then retry. SHA-256 is verified automatically; do not bypass it. |
| Game reports *"Failed to load il2cpp"* | Windows application control can block an original game DLL before the game starts. | See [Game launch blocked by Windows](#game-launch-blocked-by-windows). This error alone does not identify a subtitle patch failure. |
| Previous install was interrupted mid-write | Power loss, process kill, or antivirus lock interrupted patching. | Close the game and rerun `Install.cmd` or `Restore.cmd`—the saved recovery journal restores or completes cleanly. |
| Tool refuses files after a Steam update | Steam updated `Psycho Sleuth_Data` and hashes no longer match `supported-build.json`. | Run **Verify integrity of game files** in Steam, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and open a **Game Update Report** issue. |
| Only one subtitle line or blank text appears | Row lacks one translation in the game's built-in tables (e.g., prologue cutscene lacks `zh-Hant`). | Expected for untranslated rows/cutscenes. Set in-game text language to **Traditional Chinese** or **Japanese**. |
| Unsure how to uninstall completely | Want to return to untouched vanilla Steam files. | Close the game and double-click `Restore.cmd` (or press `R` inside `Install.cmd`). Keep `.psycho-sleuth-subtitles` until restoration finishes. |

## Game launch blocked by Windows

In one isolated Windows test, Code Integrity event **3077** identified the original `GameAssembly.dll` as blocked by the enforced **VerifiedAndReputableDesktop** policy (Smart App Control). The DLL matched the locally cached Steam depot manifest; the game stopped before its main menu. The candidate's actual CMD installation and subsequent byte-exact restoration passed, but this launch attempt provided **no in-game visual qualification**.

Close the game and restore the patch before comparing with the unmodified game. Use Steam's **Verify integrity of game files** for a Steam-managed installation. If the error persists, inspect Windows application-control events or ask your administrator; do not replace DLLs with unofficial downloads. Microsoft documents [Smart App Control behavior and its lack of per-app exceptions](https://support.microsoft.com/en-us/windows/security/threat-malware-protection/smart-app-control-frequently-asked-questions) and the [built-in application-control policies](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/windows-defender-application-control/operations/inbox-wdac-policies). This tool does not change Windows security settings.

繁體中文：若遊戲顯示「Failed to load il2cpp」，請先還原補丁並檢查原版能否啟動。Windows 也可能阻擋原版 DLL；不能只憑此訊息判定是字幕問題。回報時請去除事件中的個人路徑，不要上傳遊戲 DLL。

## Opening an Issue

When opening a [Bug Report](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=bug_report.yml) or [Game Update Report](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=game_update.yml):

- Include the **release version** (for example `v0.2.0-preview.1`), your **selected pair and order** (`top → bottom`), your **in-game text language setting**, and the exact error line shown by `Install.cmd`.
- **Never attach game binaries, asset bundles, full scripts, Steam account IDs, or personal folder paths.**

## Preview.2 installer language

Available in the upcoming preview.2 candidate only (not the published preview.1): use `Install.cmd --lang en`, `ja`, `zh-Hant`, or `zh-Hans` to choose the wizard language independently of your subtitle pair. If process detection is inconclusive, installation stops safely: close the game and retry; do not bypass the check.

For preview.2 crash recovery and runtime download/retry coverage, see [Verification coverage](TESTING.md#runtime-recovery-for-testers). A corrupted runtime cache requires a fresh empty tool folder; keep the game backup folder intact.
