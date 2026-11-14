# Changelog

All notable changes to **Psycho-Sleuth Dual Subtitles** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Public preview builds use pre-release version tags (`vX.Y.Z-preview.N`).

## [Unreleased]

### Improved

- **Subtitle layout optimizer:** Candidate search across stacked, compact, and merged modes now prefers readable inline/compact layouts (at `>= 18px` effective size on cutscene dialogue boxes) over crushing multi-line boxes down to `16px`, accounts for blank `InputBr` continuation height when flushing pages, and picks the least-overflowing candidate if every option exceeds height bounds.
- **Rich-text tag balancing:** Unified tag balancing across `<align>`, `<speed>`, `<color>`, and `<size>` on every non-empty dialogue composition (including equal-string early returns and missing secondary rows) without synthesizing closing tags for self-contained TMP sprite tags (`<style=UI/...>`).
- **Cutscene `.srt` & CRLF resilience:** Normalized UTF-8 BOM (`\ufeff`) and lone `\r` line endings when parsing cutscene subtitle tracks.
- **Process lock, archive bounds & recovery hardening:** Added PowerShell `Get-Process` fallback using resolved `%SystemRoot%\System32` paths with fail-closed behavior if game-process probes are inconclusive; enforced pinned directory/stage/manifest identity checks, quarantine-based atomic unlink/rollback, strict LZMA/LZ4 block bounds without false-rejecting full-size blocks, redundant `installed.json.bak` identity verification, and strict target validation before corrupt/legacy journal recovery.
- **Steam manifest & installer i18n:** Strict `installdir` traversal checks, `StateFlags != 4` update warnings, 4-language localized installer output (`--lang` / Windows UI locale & normalized `locale.getlocale()` fallback), explicit `sys.path` bootstrapping under embedded Python 3.14, `-O` assertion guard in local verification, and expanded regression tests.
- **Documentation, visuals & community health:** Added light/dark responsive SVG hero and pipeline cards, `SUPPORT.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, GitHub issue/PR forms (including structured private security/CoC contact request routing), and automated docs/SVG/SHA/privacy CI verification.

## [0.2.0-preview.1] — 2026-11-11

### Added

- **Four languages, 6 pairs, 12 display orders:** Full selectable top/bottom pairing across English (`1`), Japanese (`2`), Traditional Chinese (`3`), and Simplified Chinese (`4`).
- **Separate official Chinese tracks:** Traditional and Simplified Chinese read their respective native script columns without automatic conversion.
- **Non-interactive CLI flags & Steam library detection:** Added `--pair`, `--top`, `--bottom`, `--list-pairs`, `--status`, `--detect`, and `--game-dir`, alongside `libraryfolders.vdf` / `appmanifest` discovery.
- **Direct upgrade path:** Smooth upgrade from `0.1.0-preview.1` reusing verified originals inside `.psycho-sleuth-subtitles/original`.
- **Four-language documentation:** Player guides in English, 日本語, 繁體中文, and 简体中文 (`docs/README.*.md`).
- **Verified minimal package:** `Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip` (`30,789` bytes, SHA-256 `69a3ec39fcaebb9e8f13cadcde73bb477e49feac408ba30c2bc5af7e5f3b3722`).

## [0.1.0-preview.1] — 2026-11-10

### Added

- Initial Windows x64 preview supporting three subtitle pairs, transactional backups, exact restoration via `Restore.cmd`, and SHA-256 verified embedded Python 3.14.10 runtime bootstrap (`Psycho-Sleuth-Subtitles-0.1.0-preview.1-Minimal.zip`, SHA-256 `9aa59c86572252001900c641d77818c35a8a8efed27268c1347bd743aaf78a11`).

[Unreleased]: https://github.com/snowyukitty/psycho-sleuth-subtitles/compare/v0.2.0-preview.1...main
[0.2.0-preview.1]: https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1
[0.1.0-preview.1]: https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.1.0-preview.1
