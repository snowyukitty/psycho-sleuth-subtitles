# Preview.2 verification coverage

[Release status and current download](README.md#release-status) · [Visual QA checklist](VISUAL_QA.md)

This page describes the **unpublished v0.2.0-preview.2 candidate**, not a new downloadable release. Its archive SHA-256 is `d8dc75c67db9322eb7ae6e0a2951c10817f3bb38c4fed4533650c0f1cece43e4`. No game assets or full scripts are distributed with these results.

## What is checked automatically

| Check | Observed result | Scope |
| --- | --- | --- |
| Unit regression suite | 61 pass normally, 61 under optimized Python, 61 with pinned embedded Python 3.14.10 | Synthetic parsing, layout, transaction and recovery cases; optimization does not silently remove verification conditions. |
| Ordered subtitle pairs | All 12 pass | Isolated supported game data; 49,661 processed records and 22 video sets per order; 157,099 voice cells and 10,858 other objects preserved. |
| Estimated layout overflow | 0 for each order | A calculation, not a rendered-screen readability guarantee. |
| Published-version upgrades | Both published 0.1 and 0.2 preview.1 archives pass | Actual CMD launchers, paths containing spaces and non-ASCII characters, backup retention and byte-exact restoration. |
| Interrupted legacy installation | All five file-write boundaries recover | A child process running published 0.1 code exits immediately after each target replacement. Candidate Restore.cmd restores exact originals and preserves backup hashes and timestamps. This is not a simulation of electrical disk failure. |
| First runtime download | Pass | No cached runtime; actual CMD launch, HTTPS download from python.org, pinned SHA-256 verification and all 12 pairs listed without launching the game. |
| Download interrupted / wrong checksum | Both safely refused | Deterministic PowerShell network-fault injection; no bad archive is promoted to the cache and the installer is not executed. |
| Retry / corrupted cache | Valid retry succeeds; corrupted cache is refused | An interrupted staging download is replaced by a verified archive. An already-corrupted cache is not silently trusted or executed. |
| Package and public export | Pass | Explicit allowlists, manifest hashes, UTF-8/privacy scans, SVG hashes, relative links, YAML and issue forms. |

## What is still pending

In-game visual qualification is **NOT RUN**. Mixed-language glyphs, actual line wrapping, dense continuation pages, choices and cutscene presentation need the [visual checklist](VISUAL_QA.md). Screenshots and promotional footage must come from a save-isolated, legitimate installation running this subtitle-only candidate. Automated tests do not establish gameplay readability, audio quality or footage permissions.

Completed legacy-install upgrades and interrupted legacy-install recovery are separate tests. The crash matrix covers published 0.1 installation followed by candidate restoration; it does not claim every possible interruption inside every prior release or every Steam update.

## Runtime recovery for testers

A failed download remains a staging `.download` file and is not executed. Retry with a working network connection. If the cached runtime itself fails its checksum, extract the tool into a **new empty tool folder** and retry; simply extracting over the old folder may retain the bad cache. Keep the game's verified backup folder intact. Do not disable checksum checks, edit pinned hashes or use an unofficial runtime to bypass a failure.

繁體中文：自動測試已涵蓋五個舊版寫檔中斷點，以及首次下載、下載失敗、雜湊錯誤與重試。但實機畫面仍未驗證，不能把這些結果當成字幕一定不裁切、字型一定正確或宣傳片已完成。
