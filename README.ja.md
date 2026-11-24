<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=19d2e89bc0bfda8f">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=09776febd8671ccc">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=8c5ceb9432b76c47">
  <img alt="Psycho-Sleuth 二言語字幕 — Web パッチャー & Windows x64 ツール（4言語・6組・上下12通り）" src="assets/hero-light.svg?v=e92cfbcf83063b48">
</picture>

<br>

**[English](README.md)** · **日本語** · **[繁體中文](README.zh-Hant.md)** · **[简体中文](README.zh-Hans.md)**

<br>

**[🌐 公式プレイヤーポータル — 4ステップ図解・Webパッチャー・直接ダウンロード](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)**

**[オフライン ZIP 版 (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[リリースノート & SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[リリース一覧](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[シンプル版ガイド](docs/README.ja.md) · [サポート](SUPPORT.md) · [次期候補ノート](RELEASE_NOTES.md) · [更新履歴](CHANGELOG.md) · [利用条件](LICENSE)

</div>

---

Steam 版 ***Psycho-Sleuth*（病能探偵 / 異病偵探 / 异病侦探）** 向けの非公式 **Windows x64 二言語字幕ツール**です。ゲーム本体に収録済みの公式翻訳をそのまま組み合わせるため、語学学習・対訳確認・翻訳比較に安心して使えます。

- **4言語から好きな2言語を上下自由に配置：** **English**・**日本語**・**繁體中文**・**简体中文** の **6組・12通り**に対応。
- **黒い画面（CMD）ゼロのブラウザ Web パッチャー（推奨）：** Windows の **Edge** または **Chrome** で開くだけで、ライブプレビュー・フォルダー選択・適用まで完結。**実行ファイル取得も外部アップロードも 0 バイト**です。
- **繁体字・簡体字は公式の別翻訳を使用：** ゲーム内の独立した翻訳データをそのまま読み込み、機械翻訳や自動変換は行いません。
- **完全互換のワンクリック復元：** Web パッチャーとオフライン ZIP 版は同じ `.psycho-sleuth-subtitles/original` バックアップ形式を共有しており、いつでも元の Steam 純正ファイルへ戻せます。

---

## 導入方法を選ぶ

| 導入方法 | おすすめ対象 | 対応 Steam Build | 黒い画面・警告画面 |
| --- | --- | --- | --- |
| **[ブラウザ Web パッチャー](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)** *（推奨）* | ほとんどの Windows 10/11 ユーザー（Edge / Chrome） | **`26746656`** (`2026-11-20`) & **`26481838`** | **なし**（`.cmd` / `.exe` ゼロ、SmartScreen / Smart App Control 回避） |
| **[オフライン ZIP (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** | Steam 自動検出や CLI 切替を使いたい方向け | `26481838` *（Build `26746656` preview.2 ZIP は実機確認待ち）* | `.cmd` + SHA-256 検証済みの `python.org` 公式 `python.exe` を実行 |

---

## 方法 1 — イラスト図解つきブラウザ Web パッチャー（推奨・CMD不要）

> イラスト付きのわかりやすい手順は **[https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)** を **Edge** または **Chrome** で開いてご覧ください。

1. **先にゲームを終了**して、Edge / Chrome で上記ページを開きます。
2. **上段・下段の2言語を選ぶ**（上のライブプレビューですぐ確認できます）。
3. **ゲームフォルダを選んで「適用」を押す**（Steam で右クリック → 管理 → ローカルファイルを閲覧 で確認し、「ファイルの編集」を許可するだけ。元のファイルは自動で安全退避されます）。
4. **ゲームを起動**し、ゲーム内テキスト言語を **「日本語」** または **「繁體中文」** にすれば完了！

*（元に戻すとき：ゲーム終了後に同じページを開いて **元の状態に復元する** を押すか、`Restore.cmd` を使います。）*

---

## 方法 2 — オフライン ZIP かんたん導入（4ステップ）

1. **ゲームを閉じて準備：** Windows Steam 版を用意して**完全に終了**し、Steam の自動更新設定は **起動時にのみこのゲームを更新** にしておくのが安全です。
2. **ZIP を取得して展開：** [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) から **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`** を取得し、ZIP **全体**を書き込み可能なフォルダーへ展開します（`_tool` を残してください）。
   *初回のみ `python.org` から約 12 MB・SHA-256 検証済みの署名入り公式 Python 実行環境を自動取得し、PC 本体の Python 環境は変更しません。*
3. **`Install.cmd` をダブルクリックして2言語を選択：** 上段（`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文）、次に下段を選びます（例：`2 → 3` で上段が日本語・下段が繁体字中国語）。
4. **ゲーム内言語を設定：** テキスト言語を **「日本語」** または **「繁體中文」** にすると二言語字幕が表示されます。

---

## 安心して使える理由

- **Web 版は外部送信 0 バイト：** ファイルの読み取り・SHA-256 照合・合成はすべてブラウザタブ内で完結するため、ページ読み込み後にネットを切っても動作します。
- **オフライン版は中身を読めるスクリプト中心：** `_tool\` 内はメモ帳で確認できるプレーンテキストで、実行バイナリは `python.org` の公式署名済み `python.exe`（SHA-256 一致時のみ起動）だけです。
- **セーブデータも PC の Python も触らない：** Unity セーブ・PlayerPrefs・Steam クラウド・システム Python には一切触れず安全です。
- **いつでも元通り：** 変更前に `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` へオリジナルを保存します。Web 版・`Restore.cmd`・Steam の「ゲームファイルの整合性を確認」のいずれでも確実に元に戻せます。
- **SmartScreen / Smart App Control についての補足：** オフライン `.cmd` は未署名のため SmartScreen（「Windows によって PC が保護されました」→「詳細情報」→「実行」）や、Windows 11 の **Smart App Control** 環境では実行ボタンなしでブロックされることがあります。その場合はファイル不要の **[ブラウザ Web パッチャー](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)** をお使いいただくか、ZIP 展開前に「プロパティ」→「許可する（ブロック解除）」を行ってください。

---

## 日常の使い方・切り替え・復元

- **組み合わせや上下の変更：** ゲームを終了し、Web パッチャーまたは `Install.cmd` から選び直すだけで元のバックアップを自動再利用して切り替わります。
- **元のゲーム状態へ復元：** ゲーム終了後、Web 版の **元の状態に復元する** または **`Restore.cmd`**（`Install.cmd` で `R` でも可）を実行します。完了まで `.psycho-sleuth-subtitles/original` は残してください。
- **中断時の復旧：** ゲームは起動せず、Web 版または `Install.cmd` / `Restore.cmd` を再実行すれば安全に復旧できます。
- **Steam アップデート後：** **古いバックアップを新しいゲームへ上書きしないでください**。ハッシュ不一致で拒否された場合は Steam の整合性確認を行い、`.psycho-sleuth-subtitles` を退避して対応をお待ちください。
- **`0.1.0-preview.1` からの更新：** そのまま Web 版または新版 `Install.cmd` を別フォルダーから実行してください（番号 `4` は簡体字中国語になったため、復元は `R` または `Restore.cmd` を使用）。

---

## 対応ペア一覧（6組・上下12通り）

| メニュー選択 | 上段 → 下段 | CLI `--pair` 指定 |
| --- | --- | --- |
| `1 → 2` / `2 → 1` | English / 日本語 | `en-ja` / `ja-en` |
| `1 → 3` / `3 → 1` | English / 繁體中文 | `en-zh-Hant` / `zh-Hant-en` |
| `1 → 4` / `4 → 1` | English / 简体中文 | `en-zh-Hans` / `zh-Hans-en` |
| `2 → 3` / `3 → 2` | 日本語 / 繁體中文 | `ja-zh-Hant` / `zh-Hant-ja` |
| `2 → 4` / `4 → 2` | 日本語 / 简体中文 | `ja-zh-Hans` / `zh-Hans-ja` |
| `3 → 4` / `4 → 3` | 繁體中文 / 简体中文 | `zh-Hant-zh-Hans` / `zh-Hans-zh-Hant` |

---

<details>
<summary><strong>コマンドライン実行（任意）と SHA-256 確認</strong></summary>

オフライン版を展開したフォルダーで PowerShell やコマンドプロンプトから引数を指定できます：

```powershell
# 任意のダウンロード SHA-256 確認
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 対話メニュー / 引数指定（コード: en, ja, zh-Hant, zh-Hans）
.\Install.cmd
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant
.\Restore.cmd
```

旧来の指定 `zh-en`・`zh-ja` は上段が繁体字中国語として解釈され、`ja-en` はそのまま維持されます。

</details>

<details>
<summary><strong>仕組みと安全性チェック</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5f7c29179f1e34e8">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=3133d55cd17b0977">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=8333db78d688b9aa">
  <img alt="4段階の安全パッチパイプライン：Webまたはオフライン事前検証、ジャーナル付きバックアップ、台本・動画22本合成、切替と完全復元" src="assets/architecture-light.svg?v=73720fef52917fa0">
</picture>

</div>

1. **厳格な事前検証：** Windows x64 Steam 版 IL2CPP ランタイム、Unity アセット、Addressables カタログのハッシュを照合し、未対応ビルドでは変更を行わず安全に停止します。
2. **完全ローカル処理と互換バックアップ：** Web パッチャーは純 JS（UnityFS / LZMA1）でブラウザ内処理、オフライン版は固定 SHA-256 検証済み Python 3.14.10 で処理します。いずれも `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` と復旧ジャーナルを共有します。
3. **音声・制御データを完全保持：** 本編セリフ、選択肢、ローカライズ表、TextMeshPro サイズ設定、**動画字幕 22 本（`.srt`）** のみを更新し、ボイスセル（Build `26746656` では `157,263`）や非字幕オブジェクト（`10,898`）はそのまま保持します。

</details>

---

## 対象範囲とプレビュー版の制限

- **対象範囲：** シナリオ会話、分岐選択肢、**動画字幕 22 本（`.srt`）**。メニュー画面・キャラ名・手がかり UI はゲーム設定言語のままです。
- **密度の高いページ：** 原則上下 2 段表示ですが、一部密なページはクリックリズム保持のため同一行に併記します（同一文字列は 1 回のみ表示）。
- **プロローグ動画と未翻訳行：** ゲーム原版のプロローグ動画に繁体字 `.srt` が含まれないため、繁体字を含むペアではその区間のみもう片方の選択言語だけが表示されます。
- **検証状況：** Web パッチャー・Python 版ともに隔離 Build `26746656` 実データで **全 12 通りのバイト完全一致**と相互復元まで合格していますが、全章を通じた長文折り返しや英語/簡体字フォントの実機目視チェックは引き続きプレビュー段階のため、ゲーム内テキスト言語は **「日本語」または「繁體中文」** をおすすめします。

---

## リリース状況

> **ブラウザ Web パッチャー公開中（最新 Steam Build `26746656` 対応）：** 黒い画面なし・ファイル取得不要の **[ブラウザ Web パッチャー](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)** なら Build `26746656` と `26481838` の両方へ今すぐ対応できます。

- **ブラウザ Web パッチャー（公開中）：** Edge / Chrome 上で Steam Build `26746656`・`26481838` に対応（Python 出力とバイト一致検証済み）。
- **オフライン ZIP 現行公開版 (`v0.2.0-preview.1`)：** 旧 Build `26481838` 対応（Build `26746656` では未変更で安全停止）。
- **次期オフライン ZIP 候補 (`v0.2.0-preview.2`・未公開)：** Build `26746656` 対応・自動テスト完了済み、実機目視確認待ち。詳細は [TESTING.md](TESTING.md)・[VISUAL_QA.md](VISUAL_QA.md)・[RELEASE_NOTES.md](RELEASE_NOTES.md) をご覧ください。

---

## サポート・貢献・利用条件

- 困ったときや Steam 更新後は [SUPPORT.md](SUPPORT.md) または [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) へどうぞ。
- 翻訳や改善提案は [CONTRIBUTING.md](CONTRIBUTING.md)・[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)、セキュリティ連絡は [SECURITY.md](SECURITY.md)、履歴は [CHANGELOG.md](CHANGELOG.md) をご覧ください。

*検索キーワード:* *病能探偵* · *Psycho-Sleuth* · *異病偵探* · *异病侦探* · Steam 二言語字幕パッチ · 語学学習ツール · ブラウザ Web パッチャー。

同梱の [LICENSE](LICENSE) に基づき個人の導入・バックアップ用途に限り無料利用可能です（MIT 等のオープンソースではありません）。再配布は控え、このリポジトリ・[Web パッチャー](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)・[公式リリースページ](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)のリンクをご共有ください。
