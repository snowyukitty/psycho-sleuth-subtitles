<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=0b635f04549a467c">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=2ed088de2dd8572b">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=0bc36a0d637e41c9">
  <img alt="Psycho-Sleuth 二言語字幕 — Windows x64 向け 4言語・6組・上下12通りの字幕パッチ" src="assets/hero-light.svg?v=2cde4044899b0f63">
</picture>

<br>

**[English](README.md)** · **日本語** · **[繁體中文](README.zh-Hant.md)** · **[简体中文](README.zh-Hans.md)**

<br>

**[ダウンロード (`v0.2.0-preview.1` ZIP)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[リリースノート & SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[リリース一覧](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[シンプル版ガイド](docs/README.ja.md) · [サポート](SUPPORT.md) · [次期候補ノート](RELEASE_NOTES.md) · [更新履歴](CHANGELOG.md) · [利用条件](LICENSE)

</div>

---

Steam 版 ***Psycho-Sleuth*（病能探偵 / 異病偵探 / 异病侦探）** 向けの非公式 **Windows x64 二言語字幕ツール**です。ゲーム本体に収録済みの公式翻訳をそのまま組み合わせるため、語学学習・対訳確認・翻訳比較にそのまま使えます。

- **4言語から好きな2言語を上下自由に配置：** **English**・**日本語**・**繁體中文**・**简体中文** の **6組・12通り**に対応。
- **繁体字・簡体字は公式の別翻訳を使用：** ゲーム内の独立した翻訳データをそのまま読み込み、機械翻訳や自動変換は行いません。
- **面倒な事前準備なし：** Python の導入・MOD ローダー・API キー・音声追加・テキスト送信は一切不要です。
- **いつでも元通り：** 検証済みバックアップをゲーム内に保存するため、別の組み合わせへの変更や `Restore.cmd` での完全復元がワンクリックで行えます。

---

## かんたん導入ガイド（4ステップ）

### 1. Steam 版ゲームを用意して終了する
- Windows Steam 版の *Psycho-Sleuth* を用意し、**ゲームを完全に終了**して Steam の自動更新を一時停止します。

### 2. ZIP をダウンロードして展開する
- [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) から **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`** をダウンロードします。
- ZIP の**中身全体**を書き込み可能なフォルダーへ展開してください（`_tool` フォルダーは `Install.cmd`・`Restore.cmd` と同じ場所に残します）。
- *Python の事前インストールは不要です。初回起動時のみ `python.org` から約 12 MB の公式 Python 実行環境を SHA-256 検証付きで自動取得し、PC の Python 環境は変更しません。*

### 3. `Install.cmd` をダブルクリックして2言語を選ぶ
- 通常は Steam のゲームフォルダーを自動検出します（入力を求められた場合は書き込み可能なゲームフォルダーのパスを貼り付けてください）。
- **上段**の言語、次に**下段**の言語を番号で選びます：
  - `1` = English（英語）
  - `2` = 日本語
  - `3` = 繁體中文（繁体字中国語）
  - `4` = 简体中文（簡体字中国語）
  - *例：「上段が日本語・下段が繁体字中国語」にしたい場合は `2` → `3` を選択します。*
- 下段を選ぶとそのままインストールが始まります。

### 4. ゲームを起動してテキスト言語を設定する
- *Psycho-Sleuth* を起動し、ゲーム内のテキスト言語を **「日本語」** または **「繁體中文」** に設定してください。
- どちらを選んでも、本ツールで指定した二言語字幕が表示されます。

---

## 日常の使い方・切り替え・復元

- **言語の組み合わせや上下を変えたいとき：** ゲームを終了し、もう一度 **`Install.cmd`** をダブルクリックして選び直すだけです（元バックアップを自動再利用します）。
- **元のゲーム状態に戻したいとき：** ゲームを終了し、**`Restore.cmd`** をダブルクリックします（`Install.cmd` 最初の画面で `R` を押しても復元できます）。復元が終わるまで `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` は削除しないでください。
- **途中で中断してしまったとき：** ゲームは起動せず、再度 `Install.cmd` または `Restore.cmd` を実行すると安全に復旧します。
- **Steam でゲームが更新されたとき：** **古いバックアップを新しいゲームファイルへ上書きコピーしないでください**。ハッシュ不一致で拒否された場合は Steam の**「ゲームファイルの整合性を確認」**を実行し、`.psycho-sleuth-subtitles` をゲームフォルダー外へ退避して対応版の公開をお待ちください。
- **`0.1.0-preview.1` からのアップデート：** 新版 ZIP を別のフォルダーに展開し、そのまま新版 `Install.cmd` を実行してください（`.psycho-sleuth-subtitles` は残したままで大丈夫です）。*※ 0.2.0 では番号 `4` が簡体字中国語になりました。復元は `R` または `Restore.cmd` を使用してください。*

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

ダウンロードした ZIP 内の `docs/` フォルダーにも 4 言語のガイドが同梱されています。

---

<details>
<summary><strong>コマンドライン実行（任意）と SHA-256 確認</strong></summary>

展開先のフォルダーで PowerShell またはコマンドプロンプトを開き、`Install.cmd` / `Restore.cmd` に直接引数を渡せます：

```powershell
# 任意のダウンロード SHA-256 確認
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 対話メニュー
.\Install.cmd

# 引数指定での実行（言語コード: en, ja, zh-Hant, zh-Hans）
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant

# 元の状態へバイト単位で復元
.\Restore.cmd
```

旧来の指定 `zh-en`・`zh-ja` は上段が繁体字中国語として解釈され、`ja-en` はそのまま維持されます。

</details>

<details>
<summary><strong>仕組みと安全性チェック</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5db98538903c646b">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=33e6f6571cfb70de">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=3baf536cab5b7ce6">
  <img alt="4段階の安全パッチパイプライン：事前検証とSHA-256ランタイム、ジャーナル付きバックアップ、台本・動画22本のローカル合成、切替と完全復元" src="assets/architecture-light.svg?v=cb158551b91975e5">
</picture>

</div>

1. **厳格な事前検証（`supported-build.json`）：** 変更前に Windows x64 Steam 版 IL2CPP ランタイム、Unity アセット、Addressables カタログのハッシュを確認し、未対応ビルドや他 MOD 導入環境では安全に停止します。
2. **検証済みランタイムと復旧ジャーナル：** 初回のみ `python.org` から固定 SHA-256 の公式 Python 3.14.10 埋め込み版（約 12 MB）を取得して `_tool\python-runtime.zip` に保存し、起動ごとに検証して一時的な `%TEMP%` 環境で実行します（終了時に自動削除）。元ファイルは `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` に記録・保管されます。
3. **音声・制御データを完全保持：** 本編セリフ、分岐選択肢、ローカライズ表、TextMeshPro サイズ設定、**動画字幕 22 本（`.srt`）** のみを更新し、ボイスセル（`157,099`）や字幕以外のオブジェクト（`10,858`）は一切変更しません。

</details>

---

## 対象範囲とプレビュー版の制限

- **対象範囲：** シナリオ会話、分岐選択肢、**動画字幕 22 本（`.srt`）**。メニュー画面・キャラクター名・手がかり UI などはゲーム側で選んだ言語のまま表示されます。
- **密度の高いページ：** 基本的には上下 2 段表示ですが、行数が多く枠に収まりにくい一部ページでは元のクリック感を保つため同一行に並記します（両言語が完全に同じ文字列の場合は 1 回のみ表示）。
- **プロローグ動画と未翻訳行：** ゲーム原版のプロローグ動画に繁体字中国語 `.srt` が存在しないため、繁体字を含むペアではその区間のみもう片方の選択言語だけが表示されます（簡体字とのペアなら簡体字のみ表示）。片方の翻訳が欠けている会話行や、動画字幕の時間差がある区間でも一時的に片側表示や現在設定言語での表示になります。
- **検証状況：** 隔離された実データを用いた自動テストでは **全 12 通りの表示順**、ペア切替、`0.1.0 -> 0.2.0` 更新、日本語／スペースを含むパス、音声・制御データ保持、完全復元まで合格しています。一方で長文折り返し・選択肢・英語/簡体字 UI フォント・実機動画の目視チェックは未完了のため、ゲーム内のテキスト言語設定は **「日本語」または「繁體中文」** をおすすめします。

---

## リリース状況

- **現在公開中のダウンロード：`v0.2.0-preview.1`** — 上記の手順と 4 言語ガイドはこの公開版に対応しています。
- **次期候補：`v0.2.0-preview.2`（未公開）** — 自動検証・インストーラー多言語対応・異常終了リカバリテストは完了しており、現在は実機での目視確認待ちです。詳細は [自動検証レポート](TESTING.md)・[5分間ビジュアル確認チェックリスト](VISUAL_QA.md)・[次期候補リリースノート](RELEASE_NOTES.md) をご覧ください。

---

## サポート・貢献・利用条件

- 困ったときや Steam 更新で動かなくなったときは [SUPPORT.md](SUPPORT.md) を確認するか、[GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) からご報告ください。
- 翻訳やドキュメント改善への協力は [CONTRIBUTING.md](CONTRIBUTING.md) と [行動規範 (CODE_OF_CONDUCT.md)](CODE_OF_CONDUCT.md) をご確認ください。
- セキュリティに関するご連絡は [SECURITY.md](SECURITY.md)、変更履歴は [CHANGELOG.md](CHANGELOG.md) をご覧ください。

同梱の [LICENSE](LICENSE) に基づき無料でダウンロードし、個人の導入・バックアップ用途にご利用いただけます（その他の権利は留保されており、MIT 等のオープンソースライセンスではありません）。再配布は控え、このリポジトリまたは [公式リリースページ](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) のリンクをご共有ください。本ツールは非公式でありゲーム制作者とは無関係です。正規に購入・インストールされた Steam 版 *Psycho-Sleuth* が必要です。同梱・取得される公式埋め込み版 Python には Python 自体のライセンスが適用されます。
