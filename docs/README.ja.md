# Psycho-Sleuth 二言語字幕 — 使い方ガイド

[English](README.en.md) · **日本語** · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md) · [GitHub トップページ](../README.ja.md)

ゲーム本体に収録済みの公式翻訳を組み合わせて表示する、非公式の **Windows x64 向けプレビュー版**です。音声追加・API キー・MOD ローダー・テキスト送信は一切不要です。

> **おすすめ（CMD不要）：** Microsoft Edge / Chrome で使える **[ブラウザ Web パッチャー](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)** は Steam **Build `26746656`**（`2026-11-20`）と **Build `26481838`** の両方にすぐ対応できます。現在公開中のオフライン ZIP `v0.2.0-preview.1` は Build `26481838` 向けで、Build `26746656` 対応版 ZIP は `v0.2.0-preview.2` として公開予定です。

## かんたん導入（4ステップ）

1. **ゲームを閉じる：** Steam 版 *Psycho-Sleuth* を完全に終了し、更新設定は「起動時にのみこのゲームを更新」にしておきます。
2. **ダウンロードして展開する：** [`v0.2.0-preview.1` リリース](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)から **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip** を入手し、ZIP 全体を書き込み可能なフォルダーへ展開します（`_tool` は `Install.cmd`・`Restore.cmd` と同じ場所に残してください）。
   *Python の事前導入は不要です。初回のみ `python.org` から固定 SHA-256 検証済みの署名入り公式 Python 3.14.10 埋め込み版（約 12 MB）を `_tool\python-runtime.zip` に取得し、`%TEMP%` 内で実行して終了時に削除します。システム側の Python は変更しません。*
3. **`Install.cmd` をダブルクリックして2言語を選ぶ：** Steam フォルダーは自動検出されます（入力を求められた場合は書き込み可能なゲームフォルダーを貼り付けてください）。**上段** → **下段** の順に選びます（`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文。例：`2 → 3` で上段が日本語・下段が繁体字中国語）。下段を選ぶと即座にインストールが始まります。最初の画面では **R** で復元・**0** で終了、次の画面では **0** で戻ります。
4. **起動してテキスト言語を設定する：** ゲームを起動し、テキスト言語を **「日本語」** または **「繁體中文」** に設定すれば、選んだ二言語字幕が表示されます。

## 安心して使える理由

- **中身を読めるスクリプト中心：** `_tool\` 内はメモ帳で確認できるテキストソースで、起動される実行ファイルは `python.org` 公式署名済みの `python.exe`（SHA-256 一致時のみ）だけです。
- **セーブデータも PC の Python も触らない：** Unity セーブ・Steam クラウド・システム Python には手を加えません。
- **いつでも元に戻せる：** 変更前に `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` へ元ファイルを保存（Web 版と完全互換）するため `Restore.cmd` で 100% 復元でき、Steam の「ゲームファイルの整合性を確認」でも復旧できます。
- **SmartScreen / Smart App Control 補足：** 署名なし `.cmd` で確認画面が出たら **「詳細情報」→「実行」** を押してください。**Smart App Control** 有効環境では、ファイル取得不要の **[ブラウザ Web パッチャー](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=ja)** を使うか、展開前に ZIP の「プロパティ」→「許可する」にチェックを入れてください。

## 日常の使い方

- **組み合わせや上下を変更する：** ゲームを終了し、いつでも **`Install.cmd`** を再実行できます（検証済みの元バックアップを自動再利用します）。
- **元に戻す：** ゲームを終了し、**`Restore.cmd`** をダブルクリックします（`Install.cmd` 最初の画面で `R` でも可）。復元が終わるまで `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` は残してください。
- **途中で中断してしまった場合：** ゲームは起動せず、`Install.cmd` または `Restore.cmd` を再実行すれば復旧します。
- **`0.1.0-preview.1` からの更新：** 新版 ZIP を別のフォルダーに展開し、そのまま新版 `Install.cmd` を実行してください（`.psycho-sleuth-subtitles` は削除不要です）。*※ 番号 `4` は簡体字中国語になりました。復元は `R` または `Restore.cmd` を使用してください。*
- **Steam でゲームが更新された場合：** **古いバックアップを新しいゲームファイルへ上書きしないでください**。Steam の**「ゲームファイルの整合性を確認」**を行い、`.psycho-sleuth-subtitles` をゲームフォルダー外へ退避して対応版の公開をお待ちください。

## クイックトラブルシューティング

- **「ゲームが起動中です」と表示される：** Steam またはタスクマネージャーからゲームを完全に終了して再実行してください。
- **初回起動で Python の取得に失敗する：** セキュリティソフトやファイアウォールが `python.org`（約 12 MB）を止めていないか確認し、`Install.cmd` を再試行してください。SHA-256 一致時のみ実行されます。
- **プロローグ動画や一部の行だけ片方の言語になる：** ゲーム原版の仕様でプロローグ動画の繁体字 `.srt` や一部行の翻訳が欠けているためです（下記「対象範囲」参照）。
- **解決しない場合：** [サポートページ](../SUPPORT.md) または [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) をご確認ください。

---

<details>
<summary><strong>対応ペアとコマンドライン実行（任意）</strong></summary>

`en`（English）・`ja`（日本語）・`zh-Hant`（繁體中文）・`zh-Hans`（简体中文）から異なる 2 言語を選べます（**6組・上下12通り**）。繁体字と簡体字はそれぞれゲーム内の独立した公式翻訳を使用します。

```powershell
# 任意の SHA-256 確認
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 展開先フォルダーでのコマンドライン例
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hant
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hant
.\Restore.cmd
```

旧来の `zh-en`・`zh-ja` は上段が繁体字中国語になり、`ja-en` は従来通りです。

</details>

<details>
<summary><strong>対象範囲・プレビュー制限・利用条件</strong></summary>

- **対象テキスト：** シナリオ会話、選択肢、動画字幕 22 本（`.srt`）。メニュー・キャラクター名・手がかり UI はゲーム設定言語のまま残ります。
- **表示形式と欠損行：** 基本は上下 2 段ですが、一部の高密度ページではクリック感を保つため同一行に並記します（原文一致時は 1 回表示）。原版のプロローグ動画には繁体字 `.srt` がないため、繁体字を含むペアではもう片方の選択言語だけが表示されます。片方の翻訳がない行はゲーム設定言語のまま（空欄の場合あり）、動画字幕はタイミング差で一時的に片側のみ表示されることがあります。
- **検証状況：** 対応する未改変 Steam ファイルまたは本ツール適用済み状態のみ受け付けます。全 12 通りの隔離データ検証（ボイス・制御データ保持を含む）に合格していますが、長文・選択肢・英語/簡体字 UI フォント・実機動画の目視確認は未完了です。
- **利用条件：** [LICENSE](../LICENSE) に基づき無料でダウンロードおよび個人の導入・バックアップ用途に利用できます（その他権利留保・MIT 等のオープンソースではありません）。再配布ではなく [公式リリースページ](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) をご共有ください。非公式ツールでありゲーム制作者とは無関係です。正規の Steam 版 *Psycho-Sleuth* が必要です。公式埋め込み版 Python は独自のライセンスに従います（[Python 3.14.10 リリースとチェックサム](https://www.python.org/downloads/release/python-31410/)）。

</details>
