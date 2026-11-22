# Preview.2 verification coverage

[Release status and current download](README.md#release-status) · [Visual QA checklist](VISUAL_QA.md)

This page describes the **unpublished v0.2.0-preview.2 candidate**, not a new downloadable release. Its current Steam **Build `26746656`** archive (`63,817` bytes, SHA-256 `c2f5299b23545dafb7e6f127d155a03acfb0246ec1a1b1f0366059de0f3fc49c`) replaces the earlier Build `26481838` candidate (`d8dc75c67db9322eb7ae6e0a2951c10817f3bb38c4fed4533650c0f1cece43e4`). No game assets or full scripts are distributed with these results.

## What is checked automatically

| Check | Observed result | Scope |
| --- | --- | --- |
| Unit regression suite (current candidate) | 61 pass normally (14.940s), 61 under optimized Python (14.710s), 61 with pinned embedded Python 3.14.10 (14.313s) | Synthetic parsing, layout, transaction and recovery cases; optimization does not silently remove verification conditions. |
| Ordered subtitle pairs (Build `26746656`) | All 12 pass | Isolated Build `26746656` game data (`2026-11-20` Steam update); 49,702 processed dialogue records and 22 video sets per order; 157,263 voice cells and 10,898 other objects preserved. |
| Estimated layout overflow (Build `26746656`) | 0 for each order | A calculation, not a rendered-screen readability guarantee. |
| Packaged CMD end-to-end check (Build `26746656`) | Pass | Real `Install.cmd` (`--lang zh-Hant` interactive `ja-zh-Hant`), CLI switch to `en-zh-Hans`, identical-pair rejection, and byte-exact `Restore.cmd` on paths with spaces and CJK characters, reusing pinned official Python 3.14.10. |
| Published-version upgrades (prior `d8dc75...` candidate) | Both published 0.1 and 0.2 preview.1 archives pass | Actual CMD launchers on Build `26481838`, paths containing spaces and non-ASCII characters, backup retention and byte-exact restoration. |
| Interrupted legacy installation (prior `d8dc75...` candidate) | All five file-write boundaries recover | A child process running published 0.1 code exits immediately after each target replacement. Candidate Restore.cmd restores exact originals and preserves backup hashes and timestamps. This is not a simulation of electrical disk failure. |
| First runtime download (prior `d8dc75...` candidate) | Pass | No cached runtime; actual CMD launch, HTTPS download from python.org, pinned SHA-256 verification and all 12 pairs listed without launching the game. |
| Download interrupted / wrong checksum (prior `d8dc75...` candidate) | Both safely refused | Deterministic PowerShell network-fault injection; no bad archive is promoted to the cache and the installer is not executed. |
| Retry / corrupted cache (prior `d8dc75...` candidate) | Valid retry succeeds; corrupted cache is refused | An interrupted staging download is replaced by a verified archive. An already-corrupted cache is not silently trusted or executed. |
| Package and public export | Pass | Explicit allowlists, manifest hashes, UTF-8/privacy scans, SVG hashes, relative links, YAML, issue forms, HTML/JS CDN-free scan, and Web Patcher `selftest.mjs`. |
| Browser Web Patcher vs Build `26746656` parity & Python interop (`docs/patcher/`) | Pass | Pure-JS LZMA1 unpack of `ddetective.scenarios.asset` matches Python bit-for-bit; all 12 ordered pairs match Python output SHA-256 hashes for `sharedassets0.assets`, `VIDEOS` bundle, `catalog.bin`, `level0`, and unpacked `SCENARIOS` CAB; Web-installed `ja-zh-Hant` passes Python `verify_local.verify()` and bidirectional `Restore` roundtrips cleanly. |
| Browser Web Patcher responsive & SEO inspection | Pass | Verified headless Chromium rendering across `1440x1100` (dark/light EN/ja/zh-Hant), `390x900` mobile (0 horizontal overflow, zero console errors, interactive switch/swap/preview checks), and rendered `1200x630` `og-card.png` & SVGs. |
| Separate Windows machine: install and restore (prior `d8dc75...` candidate) | Pass | Real Install.cmd on Build `26481838` with a fresh pinned runtime download, Japanese over Traditional Chinese, then Restore.cmd exit 0. All 8,285 files in the isolated runtime copy matched its baseline SHA-256 values after restoration. |

The isolated runtime baseline was also compared with a locally cached Steam depot manifest: all 8,285 included files matched size and SHA-1. This is an offline comparison, **not** a fresh Steam client integrity check or manifest-signature verification. Game assets and raw manifests remain private.

## What is still pending

In-game visual qualification is **NOT RUN**. Mixed-language glyphs, actual line wrapping, dense continuation pages, choices and cutscene presentation need the [visual checklist](VISUAL_QA.md). Screenshots and promotional footage must come from a save-isolated, legitimate installation running this subtitle-only candidate. Automated tests do not establish gameplay readability, audio quality or footage permissions.

On November 15, 2026, an isolated launch stopped before the main menu: Windows Smart App Control blocked the original game DLL (Code Integrity event 3077). Security settings were left unchanged and the test copy was restored. See [launch troubleshooting](SUPPORT.md#game-launch-blocked-by-windows). No genuine gameplay footage was recorded in this attempt.

Completed legacy-install upgrades and interrupted legacy-install recovery are separate tests. The crash matrix covers published 0.1 installation followed by candidate restoration; it does not claim every possible interruption inside every prior release or every Steam update.

## Runtime recovery for testers

A failed download remains a staging `.download` file and is not executed. Retry with a working network connection. If the cached runtime itself fails its checksum, extract the tool into a **new empty tool folder** and retry; simply extracting over the old folder may retain the bad cache. Keep the game's verified backup folder intact. Do not disable checksum checks, edit pinned hashes or use an unofficial runtime to bypass a failure.

繁體中文：自動測試已涵蓋五個舊版寫檔中斷點，以及首次下載、下載失敗、雜湊錯誤與重試。但實機畫面仍未驗證，不能把這些結果當成字幕一定不裁切、字型一定正確或宣傳片已完成。
