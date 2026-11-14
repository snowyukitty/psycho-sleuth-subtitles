# Contributing

Thank you for helping improve **Psycho-Sleuth Dual Subtitles**!

## Repository Boundary

This public repository (`snowyukitty/psycho-sleuth-subtitles`) hosts:

- Documentation in English, Japanese, Traditional Chinese, and Simplified Chinese (`README.md`, `docs/README.*.md`, `SUPPORT.md`, `CHANGELOG.md`)
- Accessible visual diagrams under `assets/`
- Community health files, issue templates, and automated documentation/asset verification workflows (`.github/`)
- Release archives (`Minimal.zip` + `SHA256SUMS.txt`) distributed under [Releases](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)

### What Not to Upload

Never include or attach any of the following in issues, pull requests, screenshots, or discussions:

- Proprietary *Psycho-Sleuth* game files (`.assets`, `.bundle`, `.resS`, game DLLs, metadata files, full `.srt` or dialogue dumps)
- Full extracted script tables or copyrighted artwork/audio
- Personal Windows usernames, Steam IDs, API tokens, or local machine paths

## Ways to Help

1. **Report a bug or layout issue** via [Bug Report](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=bug_report.yml) (include pair, order, in-game language setting, and approximate scene name without pasting full dialogue blocks).
2. **Flag a Steam game update** via [Game Update Report](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=game_update.yml) when `supported-build.json` rejects a newer official Steam build.
3. **Improve documentation or translations** by editing `README.md` or keeping all four guides (`docs/README.en.md`, `docs/README.ja.md`, `docs/README.zh-Hant.md`, `docs/README.zh-Hans.md`) aligned in meaning and links.

## Pull Request Checklist

- All modified `.svg` assets parse cleanly as XML with explicit `viewBox`, high contrast, and zero external `<image>` or `<script>` tags.
- All relative links resolve cleanly and release links target explicit tags or `/releases` (no floating "latest release" redirect URL, because pre-releases are excluded from latest-release resolution).
- Zero local filesystem paths, Steam IDs, or copyrighted game dumps appear anywhere in the diff.
- Any canonical documentation change is reflected across the four player guides or clearly noted for translation sync.
