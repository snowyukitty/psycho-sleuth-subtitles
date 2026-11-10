# Psycho-Sleuth Dual Subtitles — User Guide

[English](README.en.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

An unofficial **Windows x64 preview** that combines translations already installed with the game. No added voices, API key or game-text upload. The package contains no game assets or full dialogue script.

## Install

1. Download **Psycho-Sleuth-Subtitles-0.1.0-preview.1-Minimal.zip** from the [Release page](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.1.0-preview.1).
2. Extract the whole ZIP into a writable folder. Keep the `_tool` folder and its contents together with the launchers.
3. Close the game and pause Steam updates. Double-click **Install.cmd**.
4. The tool normally finds your Steam game automatically. If prompted, paste the game folder path. The game folder must be writable.
5. Enter a number:

| Number | Top | Bottom |
| --- | --- | --- |
| 1 | Traditional Chinese | English |
| 2 | Traditional Chinese | Japanese |
| 3 | Japanese | English |
| 4 | Restore original files | |
| 0 | Exit | |

6. In the game, select **Traditional Chinese or Japanese** as the text language. Either setting displays the pair chosen in this tool.

The first launch needs internet access to download about **12 MB** of official Python runtime. Its SHA-256 is checked before execution. You do not need to install Python, and your system Python is unchanged. The downloaded runtime is cached under `_tool` for later launches.

## Switch or restore

Close the game, then run Install.cmd again to switch pairs. Double-click **Restore.cmd** to restore the exact original files. Backups are kept in `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`; retain them until restoration is complete. If installation is interrupted, rerun Install or Restore and finish recovery before launching the game.

After a Steam update, **do not copy old backups over new game files**. Unknown versions and other mods are refused. If recovery is refused, complete Steam's **Verify integrity of game files** first. Then move `.psycho-sleuth-subtitles` outside the game folder for safekeeping and wait for a compatible tool release.

## Scope and preview limitations

- Includes story dialogue, scenario choices and cutscene subtitles. Menus, names and clue UI retain the game's selected language.
- Most subtitles use two lines; a few dense pages use inline pairs to preserve the original click timing.
- The original Traditional Chinese prologue subtitle is missing. Chinese pairs show only the available English or Japanese there. Different source timing can also briefly display one language alone.
- Chinese subtitle pairs use **Traditional Chinese**. The Simplified Chinese guide does not add Simplified Chinese subtitle pairs.
- Supported clean game files only. This preview has not completed in-game visual qualification of long lines, choices, fonts or cutscenes.

## Terms

Free download and use under the included **LICENSE.txt**; other rights are reserved. Share the official download link. The required runtime scripts are readable; this is not an encrypted executable. The tool is unaffiliated with the game's creators, and its terms grant no rights to game content. A legitimately installed game is required.

Python retains its own license, included in the downloaded official ZIP. [Runtime release and checksum](https://www.python.org/downloads/release/python-31410/).
