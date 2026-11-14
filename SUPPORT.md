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
| First launch stalls before menu | Antivirus or firewall blocked downloading the `~12 MB` official Python runtime from `python.org`. | Allow PowerShell to download `python-3.14.10-embed-amd64.zip`, or re-extract and retry. SHA-256 is verified automatically. |
| Previous install was interrupted mid-write | Power loss, process kill, or antivirus lock interrupted patching. | Close the game and rerun `Install.cmd` or `Restore.cmd`—the saved recovery journal restores or completes cleanly. |
| Tool refuses files after a Steam update | Steam updated `Psycho Sleuth_Data` and hashes no longer match `supported-build.json`. | Run **Verify integrity of game files** in Steam, move `.psycho-sleuth-subtitles` outside the game folder for safekeeping, and open a **Game Update Report** issue. |
| Only one subtitle line or blank text appears | Row lacks one translation in the game's built-in tables (e.g., prologue cutscene lacks `zh-Hant`). | Expected for untranslated rows/cutscenes. Set in-game text language to **Traditional Chinese** or **Japanese**. |
| Unsure how to uninstall completely | Want to return to untouched vanilla Steam files. | Close the game and double-click `Restore.cmd` (or press `R` inside `Install.cmd`). Keep `.psycho-sleuth-subtitles` until restoration finishes. |

## Opening an Issue

When opening a [Bug Report](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=bug_report.yml) or [Game Update Report](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=game_update.yml):

- Include the **release version** (for example `v0.2.0-preview.1`), your **selected pair and order** (`top → bottom`), your **in-game text language setting**, and the exact error line shown by `Install.cmd`.
- **Never attach game binaries, asset bundles, full scripts, Steam account IDs, or personal folder paths.**
