# Security Policy

## Scope & Architecture

`psycho-sleuth-subtitles` is a local-only Windows x64 documentation and installer project:

- **Pinned runtime download & caching:** On first launch, if no cached runtime exists yet, `Launch.ps1` downloads `python-3.14.10-embed-amd64.zip` over HTTPS from `python.org`, verifies its hardcoded SHA-256 (`90905e64a840557d8c1bc4f5b74db3d7ee85e3ffb217611cac1c7813acea4159`), and caches the verified archive locally under `_tool\python-runtime.zip` for future runs. On every launch, it re-verifies that archive hash and unpacks into a fresh private directory under Windows `%TEMP%`, which is deleted on exit.
- **Readable source scripts:** Packaged `.cmd`, `.ps1`, and `.py` scripts are plain text and inspectable before execution.
- **No telemetry or external uploads:** Game files stay local and are never transmitted over the network.
- **Pre-patch verification & fail-closed design:** Unrecognized Steam builds, third-party modifications, running game processes, corrupt backups, or mismatched runtime checks refuse modification before writing.

## Supported Versions

| Version | Security & Compatibility Support |
| --- | --- |
| `v0.2.0-preview.2` | Prepared locally; pending visual QA and publication |
| `v0.2.0-preview.1` | Current published preview; upgrade to preview.2 after publication |
| `v0.1.0-preview.1` | Superseded (upgrade to the published `v0.2.0-preview.1`, or preview.2 after publication; verified backups are reused automatically) |

## Reporting a Vulnerability

If you discover a security issue in the installer, runtime verification, launcher scripts, or release packaging:

1. **Do not post exploit details, sensitive local paths, tokens, or proprietary game files publicly.**
2. Submit confidential details directly to the maintainer via **[GitHub Private Vulnerability Reporting](https://github.com/snowyukitty/psycho-sleuth-subtitles/security/advisories/new)** (enabled under this repository's **Security** tab).
3. If you cannot use Security Advisories, open a **public, zero-detail contact request** via [Security or CoC Contact Request](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues/new?template=security_contact.yml) naming only the affected component at a high level (that issue is public, so include zero sensitive details) to arrange an alternative private channel first.
