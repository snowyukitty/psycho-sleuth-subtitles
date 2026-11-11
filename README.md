# Psycho-Sleuth Dual Subtitles

**[Download the minimal preview ZIP](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · [Release notes and checksum](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)

## User guides / 使用説明 / 使用說明 / 使用说明

**[English](docs/README.en.md) · [日本語](docs/README.ja.md) · [繁體中文](docs/README.zh-Hant.md) · [简体中文](docs/README.zh-Hans.md)**

All four guides are also included in the ZIP.

A small, unofficial Windows x64 tool that combines translations already present in your installed copy of Psycho-Sleuth. No added voices, API keys or game-text upload. No game assets or full dialogue script are distributed.

**Four languages. Any two. Either order.**

English · 日本語 · 繁體中文 · 简体中文 — **6 pairs, 12 display orders**.

| Pair | Display order |
| --- | --- |
| English / 日本語 | Either language on top |
| English / 繁體中文 | Either language on top |
| English / 简体中文 | Either language on top |
| 日本語 / 繁體中文 | Either language on top |
| 日本語 / 简体中文 | Either language on top |
| 繁體中文 / 简体中文 | Either language on top |

Extract the whole ZIP, close the game and pause Steam updates, then double-click **Install.cmd**. **Choose the top language, then the bottom language.** Keep the `_tool` folder alongside it. Run Install.cmd again to switch languages or reverse their order; **Restore.cmd** restores the original files. In the game, select Traditional Chinese or Japanese as the text language; either setting displays the selected pair.

四語任選兩種，上下順序自由選。四语言任选两种，上下顺序自由选择。4言語から2言語を選び、上下の順序も自由に指定できます。

Upgrading from 0.1.0-preview.1? Extract this ZIP separately and run the new installer. Recognized installations reuse verified original backups. Keep the game's `.psycho-sleuth-subtitles` folder. See your language guide for recovery after a Steam update.

The first launch downloads about **12 MB** of official Python runtime and verifies its pinned SHA-256. No Python installation is required. The package contains readable runtime scripts, the supported-file profile, instructions and terms. This repository hosts the player documentation and releases.

## Preview status

Supported Windows Steam files and recognized installations of this tool are accepted. Unknown updates and other mods are refused. Story dialogue, scenario choices and cutscene subtitles are covered; menus, names and clue UI retain the game's selected language. A few dense pages use inline pairs in the selected order; identical source strings appear once. Traditional and Simplified Chinese use separate original translations. The original Traditional Chinese prologue subtitles are missing, so pairs containing it show only the other selected language in that section.

The installer has passed tests on isolated game-data copies for all 12 orders, switching, voice/control preservation and exact restoration. Packaged CMD tests also cover upgrading from the published 0.1 version, reversing the order and restoring. Interrupted-installation recovery is covered separately by synthetic unit tests. Actual in-game visual qualification remains pending, including English and Simplified Chinese game-UI font settings. Follow the recommended game text settings above. Dialogue rows lacking both chosen translations remain in the game's current language and can be blank; see the guide for details.

## Use terms

Free download and use under [LICENSE](LICENSE); other rights are reserved. Share the official download link. This tool is unofficial, unaffiliated with the game's creators, and grants no rights to game content. Python retains its own license. A legitimately installed game is required.
