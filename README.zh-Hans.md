<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/hero-compact-dark.svg?v=19d2e89bc0bfda8f">
  <source media="(max-width: 500px)" srcset="assets/hero-compact-light.svg?v=09776febd8671ccc">
  <source media="(prefers-color-scheme: dark)" srcset="assets/hero-dark.svg?v=8c5ceb9432b76c47">
  <img alt="异病侦探 Psycho-Sleuth 四语双字幕 — 浏览器网页一键安装与 Windows x64 离线版（4语言、6组、12种排列）" src="assets/hero-light.svg?v=e92cfbcf83063b48">
</picture>

<br>

**[English](README.md)** · **[日本語](README.ja.md)** · **[繁體中文](README.zh-Hant.md)** · **简体中文**

<br>

**[🚀 打开网页一键安装器（免开黑窗 CMD · 支持最新 Build 26746656）](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)**

**[下载离线 ZIP 版 (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/download/v0.2.0-preview.1/Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip)** · **[发布说明与 SHA-256](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** · **[全部版本](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)**

[精简随附指南](docs/README.zh-Hans.md) · [问题排查](SUPPORT.md) · [下一版预告](RELEASE_NOTES.md) · [更新日志](CHANGELOG.md) · [使用条款](LICENSE)

</div>

---

这是 Steam 版 **《异病侦探 Psycho-Sleuth》（病能探偵 / 異病偵探）** 的非官方 **Windows x64 双字幕工具**，直接组合游戏本地内置的官方翻译，适合双语游玩、学习日语／英语或对照不同译文。

- **四语任选两种、上下自由排：** 支持 **English**、**日本語**、**繁體中文**、**简体中文**，共 **6 种配对、12 种上下顺序**。
- **免下载、免开黑窗的网页版安装器（最推荐）：** 直接用 Windows 的 **Edge** 或 **Chrome** 打开网页，实时预览双语效果后选择游戏文件夹即可应用，**不碰 CMD、无未知弹窗警告、0 字节上传**。
- **繁简分别读取原版译文：** 繁体中文与简体中文各自使用游戏内置的独立官方译文，不经机翻或自动繁简转换。
- **完全互通、一键还原：** 网页版与离线 ZIP 版共享相同的 `.psycho-sleuth-subtitles/original` 原版备份结构，随时切换语言组合或字节级还原原版。

---

## 选择适合你的安装方式

| 安装方式 | 适用场景 | 支持的 Steam 版本 | 终端黑窗 / 安全拦截 |
| --- | --- | --- | --- |
| **[网页版一键安装器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)** *(最推荐)* | 绝大多数 Windows 10/11 玩家（Edge / Chrome） | **`26746656`** (`2026-11-20` 更新版) 与 **`26481838`** | **零警告**（免 `.cmd`、免 `.exe`、避开 SmartScreen / Smart App Control） |
| **[离线 ZIP 版 (`v0.2.0-preview.1`)](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)** | 习惯离线存包或使用命令行参数玩家 | `26481838` *（Build `26746656` preview.2 ZIP 待实机目视验收）* | 运行 `.cmd` 与经 SHA-256 校验的 `python.org` 官方 `python.exe` |

---

## 方式 1 — 网页版一键安装（最推荐，免黑窗）

1. 在 Steam 中**彻底关闭**《异病侦探 Psycho-Sleuth》。
2. 用 Windows 自带的 **Microsoft Edge** 或 **Google Chrome** 打开：**[https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)**。
3. 选择**上方字幕**与**下方字幕**（可在右侧即时预览对话框与过场效果）。
4. 点击 **选择 Psycho-Sleuth 游戏文件夹**（可在 Steam 右键游戏 → 管理 → 浏览本地文件查看路径），在浏览器询问权限时点“允许编辑文件”，再点击 **应用双语字幕**。
5. 回到 Steam 启动游戏，将游戏内文字语言设为 **“繁体中文”** 或 **“日文”**，对话画面就会自动显示你配好的双语字幕。

*（恢复原版：关闭游戏后重新打开该网页选择同一文件夹，点击 **还原干净原版** 即可，也可用离线包的 `Restore.cmd` 还原。）*

---

## 方式 2 — 离线 ZIP 最简安装（4 步搞定）

1. **准备好 Steam 版并彻底关闭：** 确认已在 Windows 的 Steam 安装好游戏，**完全关闭游戏**，并建议在 Steam 属性中设为 **仅在启动时更新此游戏**。
2. **下载并解压 ZIP：** 从 [`v0.2.0-preview.1`](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) 下载 **`Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`**，将**整个压缩包**解压到可写入文件夹（保留 `_tool` 与 `Install.cmd`、`Restore.cmd` 在同级目录）。
   *首次运行会自动从 `python.org` 下载约 12 MB、经 SHA-256 校验的官方签名嵌入版 Python，不会改动系统原有 Python。*
3. **双击 `Install.cmd` 选择语言：** 依次选择**上方字幕**与**下方字幕**（`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文；例如 `2` 再 `4` 为日文在上、简中在下）。
4. **启动游戏设置文字语言：** 设为 **“繁体中文”** 或 **“日文”** 即可看到双语字幕。

---

## 为什么可以放心使用

- **网页版 0 字节上传：** 读取、SHA-256 校验与写入全部在浏览器标签页本地内存中完成，网页加载完即使断网也可正常运行。
- **离线版纯明文脚本：** `_tool\` 中全部是可用记事本打开查看的源码脚本，唯一运行的可执行程序是从 `python.org` 获取并严格校验 SHA-256 的官方数字签名 `python.exe`。
- **不碰存档，也不改系统环境：** 不读写 Unity 存档、PlayerPrefs、Steam 云存档，也不安装系统全局包。
- **随时一键还原：** 修改前都会把原版保存在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`。可用网页版一键还原、双击 **`Restore.cmd`** 或使用 Steam“验证游戏文件完整性”兜底。
- **关于 SmartScreen 与 Smart App Control 提示：** 离线 `.cmd` 无数字签名，Windows SmartScreen 可能会弹出蓝屏提醒（点击“更多信息”→“仍要运行”）；在启用 **Smart App Control** 的新 Windows 11 系统上，带网页下载标记的脚本可能被直接禁止运行。此时请直接使用上方的 **[网页版一键安装器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)**（免下载脚本、零拦截），或在解压前右键 ZIP → **属性 → 解除锁定**。

---

## 日常切换与还原

- **想换语言或上下对调：** 关闭游戏，在网页版重选应用或再运行一次 `Install.cmd` 即可（自动复用已校验的原版备份）。
- **想恢复干净原版：** 关闭游戏，点击网页版的 **还原干净原版** 或双击 `Restore.cmd`（也可在 `Install.cmd` 第一屏按 `R`）。还原结束前请保留 `.psycho-sleuth-subtitles/original`。
- **安装中途意外中断：** 不要启动游戏，在网页版或 `Install.cmd` / `Restore.cmd` 重试即可安全恢复。
- **Steam 游戏更新后：** **切勿拿旧备份直接覆盖新版文件**。若提示哈希不匹配并拒绝写入，请先在 Steam 验证完整性，移出 `.psycho-sleuth-subtitles` 备份目录保存，再等待适配更新。
- **从 `0.1.0-preview.1` 升级：** 保留 `.psycho-sleuth-subtitles` 目录，直接使用新版网页版或新目录的 `Install.cmd` 即可。*（注意：0.2.0 起数字 `4` 改为选择简体中文，还原请按 `R` 或用 `Restore.cmd`。）*

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

---

<details>
<summary><strong>进阶：离线版命令行参数与 SHA-256 校验（可选）</strong></summary>

可在解压文件夹中打开 PowerShell 或命令提示符直接传参运行：

```powershell
# 可选：核对下载 ZIP 的 SHA-256
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 交互菜单或无交互参数（语言代码：en, ja, zh-Hant, zh-Hans）
.\Install.cmd
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hans
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hans
.\Restore.cmd
```

旧版参数 `zh-en` 和 `zh-ja` 按“繁体中文在上”解析；`ja-en` 保持不变。

</details>

<details>
<summary><strong>工作原理与安全校验</strong></summary>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 500px)" srcset="assets/architecture-compact-dark.svg?v=5f7c29179f1e34e8">
  <source media="(max-width: 500px)" srcset="assets/architecture-compact-light.svg?v=3133d55cd17b0977">
  <source media="(prefers-color-scheme: dark)" srcset="assets/architecture-dark.svg?v=8333db78d688b9aa">
  <img alt="四阶段安全修补流程：网页或离线预检、日志备份、本地剧本与 22 段过场合成、随时切换与字节级精确还原" src="assets/architecture-light.svg?v=73720fef52917fa0">
</picture>

</div>

1. **严格预检：** 修改前校验 Windows x64 Steam IL2CPP 运行库、Unity 数据文件与 Addressables 目录哈希，遇未知版本安全拒绝写入。
2. **本地双轨运行与互通备份：** 网页版在 Edge/Chrome 中使用纯 JS 解包 UnityFS/LZMA1，离线版使用经 SHA-256 校验的官方 Python 3.14.10，二者共用 `.psycho-sleuth-subtitles/original`、`transaction.json` 与双份安装记录。
3. **完整保留语音与节奏：** 仅更新剧情对话、选项、本地化表、TextMeshPro 字号与 **22 部过场 `.srt` 字幕**，原版语音字段（Build `26746656` 为 `157,263`）与非字幕对象（`10,898`）原封不动。

</details>

---

## 适用范围与预览版说明

- **支持范围：** 主线与探索对话、分支选项、**22 部过场动画 `.srt` 字幕**。菜单、角色名与线索界面保留游戏所选语言。
- **高密度对话页：** 多数对话采用上下两行；极少数页面按选定顺序改为同行对照以维持点击节奏（相同字符串仅显示一次）。
- **序章动画与缺失译文：** 原版序章动画缺少繁体中文 `.srt`，包含 `繁體中文` 的组合在该段会只显示另一所选语言。
- **当前验证状态：** 网页版与离线版均已在隔离 Build `26746656` 上通过 **全部 12 种排列的字节完全一致性验证**与双向互通还原；实机长句排版与英文／简中游戏字体仍待完整目视检查，目前请优先将游戏内语言设为 **“繁体中文”或“日文”**。

---

## 版本状态

> **网页版现已率先支持最新 Steam Build `26746656` (`2026-11-20`)：** 不想运行黑窗脚本或受限于 Windows Smart App Control 的玩家，可立即使用 **[网页版一键安装器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)**。

- **网页版安装器（已上线）：** 支持 Build `26746656` 与 `26481838`，浏览器本地处理，输出与 Python 版完全一致。
- **当前可下载离线 ZIP：`v0.2.0-preview.1`** — 仅支持旧版 Build `26481838`（在新版游戏上会安全拒绝写入）。
- **下一版离线 ZIP 候选：`v0.2.0-preview.2`（尚未发布）** — 已完成 Build `26746656` 适配与自动化检查，目前等待实机画面目视验收。详情请见 [TESTING.md](TESTING.md)、[VISUAL_QA.md](VISUAL_QA.md) 与 [RELEASE_NOTES.md](RELEASE_NOTES.md)。

---

## 帮助、参与贡献与使用条款

- 遇到问题或游戏更新？请查阅 [SUPPORT.md](SUPPORT.md) 或前往 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues)。
- 欢迎通过 [CONTRIBUTING.md](CONTRIBUTING.md) 与 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 参与贡献；安全问题见 [SECURITY.md](SECURITY.md)，变更日志见 [CHANGELOG.md](CHANGELOG.md)。

*搜索关键词：* *异病侦探 Psycho-Sleuth* · *病能探偵* · *異病偵探* · Steam 双语字幕工具 · 日语学习双字幕 · 网页一键安装器（免 CMD）。

按 [LICENSE](LICENSE) 免费用于个人安装与备份（非 MIT 等开源协议）。分享请贴本仓库、[网页安装器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans) 或 [官方 Releases 页面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)，勿自行重新打包分发。
