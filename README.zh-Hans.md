<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=0b635f04549a467c">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=2ed088de2dd8572b">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=0bc36a0d637e41c9">
  <img alt="异病侦探 Psycho-Sleuth 四语双字幕 — 适用于 Windows x64 的 6 种配对与 12 种上下排列" src="assets/hero-light.svg?v=2cde4044899b0f63">
</picture>

<br>

**[English](README.md)** · **[日本語](README.ja.md)** · **[繁體中文](README.zh-Hant.md)** · **简体中文**

<br>

**[立即下载 (`v0.2.0-preview.1` ZIP)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[发布说明与 SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[全部版本](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[精简随附指南](docs/README.zh-Hans.md) · [问题排查](SUPPORT.md) · [下一版预告](RELEASE_NOTES.md) · [更新日志](CHANGELOG.md) · [使用条款](LICENSE)

</div>

---

这是 Steam 版 **《异病侦探 Psycho-Sleuth》（病能探偵 / 異病偵探）** 的非官方 **Windows x64 双字幕工具**，直接组合游戏本地内置的官方翻译，适合双语游玩、学习日语或对照不同译文。

- **四语任选两种、上下自由排：** 支持 **English**、**日本語**、**繁體中文**、**简体中文**，共 **6 种配对、12 种上下顺序**。
- **繁简分别读取原版译文：** 繁体中文与简体中文各自使用游戏内置的独立官方译文，不经机翻或自动繁简转换。
- **无需折腾开箱即用：** 不用自己装 Python、不需要 Mod 加载器、不需要 API key、不新增配音、不上传任何游戏文本。
- **随时切换或一键还原：** 已校验的原版备份保存在游戏文件夹内，想换组合或用 `Restore.cmd` 字节级还原原版都非常方便。

---

## 最简安装教程（4 步搞定）

### 1. 准备好 Steam 版游戏并完全关闭
- 确认已在 Windows 的 Steam 安装好《异病侦探 Psycho-Sleuth》，**彻底关闭游戏**，并暂停 Steam 自动更新。

### 2. 下载并解压压缩包
- 前往 [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) 下载 **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`**。
- 将**整个 ZIP** 解压到可写入的文件夹（请保留 `_tool` 文件夹，与 `Install.cmd`、`Restore.cmd` 放在一起）。
- *不需要手动安装 Python — 首次运行时会自动从 `python.org` 下载约 12 MB、通过 SHA-256 校验的官方运行环境，不会改动系统原有的 Python。*

### 3. 双击 `Install.cmd` 选择上下语言
- 安装器通常会自动检测到 Steam 游戏目录（如果提示输入路径，粘贴你的游戏文件夹路径并回车即可）。
- 按提示先选**上方字幕**，再选**下方字幕**：
  - `1` = English（英文）
  - `2` = 日本語（日文）
  - `3` = 繁體中文（繁体中文）
  - `4` = 简体中文
  - *例如想看“日文在上、简中在下”，依次选择 `2` 和 `4` 即可。*
- 选好下方语言后就会立即开始安装。

### 4. 打开游戏设置文字语言即可游玩
- 启动游戏后，将游戏内的文本语言设为 **“繁体中文”** 或 **“日文”**。
- 在这两种界面设置下，对话都会自动显示你刚选好的双语字幕。

---

## 日常切换与还原

- **想换其他语言组合或上下对调：** 关闭游戏，再双击一次 **`Install.cmd`** 重选即可（会自动复用已校验的原版备份，不用先手动还原）。
- **想恢复为原版游戏：** 关闭游戏，双击 **`Restore.cmd`** 一键精确还原（或在 `Install.cmd` 第一个界面按 `R`）。还原完成前，请保留游戏文件夹中的 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`。
- **万一安装中途断开或意外关闭窗口：** 不要启动游戏，重新运行一次 `Install.cmd` 或 `Restore.cmd` 即可自动恢复。
- **Steam 更新游戏后：** **切勿把旧备份直接覆盖回新版游戏文件**。如果工具提示哈希不匹配并安全拒绝，请先在 Steam 运行 **“验证游戏文件的完整性”**，将 `.psycho-sleuth-subtitles` 移出游戏目录妥善保存，等待适配新版的工具发布。
- **从 `0.1.0-preview.1` 升级：** 把新版 ZIP 解压到一个新的文件夹后直接运行新版 `Install.cmd`，保留游戏内的 `.psycho-sleuth-subtitles` 即可自动升级。*（提示：0.2.0 起数字 `4` 改为选择简体中文，还原请按 `R` 或双击 `Restore.cmd`。）*

---

## 支持的 6 种配对（12 种上下排列）

| 菜单选择 | 上方字幕 → 下方字幕 | 命令行 `--pair` 代号 |
| --- | --- | --- |
| `1 → 2` / `2 → 1` | English / 日本語 | `en-ja` / `ja-en` |
| `1 → 3` / `3 → 1` | English / 繁體中文 | `en-zh-Hant` / `zh-Hant-en` |
| `1 → 4` / `4 → 1` | English / 简体中文 | `en-zh-Hans` / `zh-Hans-en` |
| `2 → 3` / `3 → 2` | 日本語 / 繁體中文 | `ja-zh-Hant` / `zh-Hant-ja` |
| `2 → 4` / `4 → 2` | 日本語 / 简体中文 | `ja-zh-Hans` / `zh-Hans-ja` |
| `3 → 4` / `4 → 3` | 繁體中文 / 简体中文 | `zh-Hant-zh-Hans` / `zh-Hans-zh-Hant` |

下载的 ZIP 压缩包内 `docs/` 目录下也已附带完整的四语说明文档。

---

<details>
<summary><strong>进阶：命令行参数与 SHA-256 校验（可选）</strong></summary>

你也可以在解压后的文件夹内打开 PowerShell 或命令提示符，直接传参运行 `Install.cmd` 或 `Restore.cmd`：

```powershell
# 可选：核对下载 ZIP 的 SHA-256
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 交互式菜单
.\Install.cmd

# 免交互直接安装（语言代码：en, ja, zh-Hant, zh-Hans）
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hans
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hans

# 一键精确还原原版
.\Restore.cmd
```

旧版参数 `zh-en` 和 `zh-ja` 仍可用，会按“繁体中文在上”解析；`ja-en` 保持不变。

</details>

<details>
<summary><strong>工作原理与安全校验</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5db98538903c646b">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=33e6f6571cfb70de">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=3baf536cab5b7ce6">
  <img alt="四阶段安全修补流程：预检与 SHA-256 校验、日志备份、本地剧本与 22 段过场合成、随时切换与字节级精确还原" src="assets/architecture-light.svg?v=cb158551b91975e5">
</picture>

</div>

1. **严格预检（`supported-build.json`）：** 修改前先校验 Windows x64 Steam IL2CPP 运行库、Unity 数据文件与 Addressables 目录哈希，遇未知版本或第三方模组会安全拒绝写入。
2. **校验运行环境与日志备份：** 首次运行从 `python.org` 下载固定 SHA-256 的官方 Python 3.14.10 嵌入版（约 12 MB）缓存至 `_tool\python-runtime.zip`，每次启动重新校验后在 `%TEMP%` 临时目录运行（退出自动清理）。原版备份与恢复日志保存在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`。
3. **完整保留原版语音与节奏：** 仅更新剧情对话、分支选项、本地化文本表、TextMeshPro 字号／目录哈希与 **22 部过场动画 `.srt` 字幕**，原版语音字段（`157,099`）与非字幕对象（`10,858`）原封不动。

</details>

---

## 适用范围与预览版说明

- **支持范围：** 主线与探索剧情对话、分支选项、**22 部过场动画 `.srt` 字幕**。菜单、角色名字与线索界面保留游戏所选 UI 语言。
- **高密度对话页：** 多数对话采用上下两行显示；少数行数紧凑的页面会按选定顺序改为同行对照，以维持原有点击节奏。两语言原文完全一致时只显示一次。
- **序章动画与缺失译文：** 原版序章动画缺少繁体中文 `.srt`，因此包含 `繁體中文` 的配对在该段只会显示所选的另一种语言（与简体中文搭配时则显示简体中文）。缺单边译文的对话或时间轴错开的过场片段，可能短暂显示单语或按游戏当前设置语言显示。
- **当前验证状态：** 全部 **12 种排列**、切换、`0.1.0 -> 0.2.0` 升级、含空格及非 ASCII 路径、语音与控制字段保留以及字节级还原均已通过隔离数据自动化验证；但实机画面中的长句换行、选项框及英文／简体中文游戏字体表现仍待完整目视检查，目前请优先将游戏内文字语言设为 **“繁体中文”或“日文”**。

---

## 版本状态

- **当前可下载版本：`v0.2.0-preview.1`** — 上述安装步骤与四语使用说明均对应此正式发布版本。
- **下一版候选：`v0.2.0-preview.2`（尚未发布）** — 自动化测试、安装器四语界面与中断恢复验证均已完成，正在等待实机画面目视验收。详情请见 [自动验证范围](TESTING.md)、[五分钟实机目视检查表](VISUAL_QA.md) 与 [候选版本说明](RELEASE_NOTES.md)。

---

## 帮助、参与贡献与使用条款

- 遇到问题或 Steam 更新导致无法使用？请先查阅 [SUPPORT.md](SUPPORT.md) 或前往 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) 反馈。
- 想协助完善多语文档、翻译或版面反馈？欢迎查看 [CONTRIBUTING.md](CONTRIBUTING.md) 与 [行为准则](CODE_OF_CONDUCT.md)。
- 安全问题请看 [SECURITY.md](SECURITY.md)；完整更新历史见 [CHANGELOG.md](CHANGELOG.md)。

按随附的 [LICENSE](LICENSE) 条款提供免费下载与个人安装／备份使用，其余权利保留（非 MIT 等开源协议）。分享时请直接分享本仓库或 [官方 Releases 页面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) 链接，请勿自行重新打包分发。本工具为非官方作品，与游戏制作方无关联，需搭配合法购买并安装的 Steam 版《异病侦探 Psycho-Sleuth》使用；自动下载的官方嵌入版 Python 保留其各自许可。
