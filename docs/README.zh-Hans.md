# 异病侦探 Psycho-Sleuth 四语双字幕 — 使用说明

[English](README.en.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · **简体中文** · [GitHub 完整主页](../README.zh-Hans.md)

这是非官方的 **Windows x64 预览版**工具，使用游戏本地已有的官方翻译组合双语字幕。不新增配音、不需要 API key、不需要 Mod 加载器，也不会上传任何游戏文本。

> **最推荐（免开黑窗 CMD）：** 直接用 Microsoft Edge / Chrome 打开 **[网页一键安装器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)**，即可在本地同时支持 Steam **Build `26746656`**（`2026-11-20` 更新）与 **Build `26481838`**（免下载、0 上传）。当前发布的离线 ZIP `v0.2.0-preview.1` 仅对应 Build `26481838`，Build `26746656` 离线包将在 `v0.2.0-preview.2` 中发布。

## 最简安装步骤（4 步搞定）

1. **关闭游戏：** 确认已在 Windows 的 Steam 安装好 *Psycho-Sleuth*，**完全关闭游戏**并建议设为“仅在启动时更新此游戏”。
2. **下载并解压：** 从 [`v0.2.0-preview.1` Release](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1) 下载 **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip**，将整个 ZIP 解压到可写入的文件夹（请保留 `_tool` 与 `Install.cmd`、`Restore.cmd` 在一起）。
   *不需要自己装 Python — 首次运行会自动从 `python.org` 下载约 12 MB、经过 SHA-256 校验的官方数字签名 Python 3.14.10 嵌入版缓存在 `_tool\python-runtime.zip`，在独立 `%TEMP%` 目录运行并在退出后清理，不改动系统原有 Python。*
3. **双击 `Install.cmd` 选择两种语言：** 工具通常会自动定位 Steam 游戏目录（如提示输入，粘贴游戏文件夹路径即可）。先选**上方字幕**、再选**下方字幕**（`1` English · `2` 日本語 · `3` 繁體中文 · `4` 简体中文；例如 `2 → 4` 表示日文在上、简中在下）。选完下方语言后立即开始安装；第一界面按 **R** 还原、**0** 退出，第二界面按 **0** 返回。
4. **打开游戏设置文字语言：** 启动游戏后，将游戏内文字语言设为 **“繁体中文”** 或 **“日文”**，对话画面就会显示你选好的双语字幕。

## 为什么可以放心使用

- **纯明文脚本与官方签名运行环境：** `_tool\` 中全部是可用记事本打开检查的源码脚本，唯一启动的执行程序是从 `python.org` 获取并严格校验 SHA-256 的官方签名 `python.exe`。
- **不碰存档与系统环境：** 不会读取或修改 Unity 存档、Steam 云存档，也不影响系统 Python。
- **随时一键还原：** 修改前会在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original` 保存字节级原版备份（与网页安装器完全互通），`Restore.cmd` 可 100% 恢复，Steam“验证游戏文件的完整性”也随时可兜底。
- **SmartScreen / Smart App Control 提示：** 下载的 `.cmd` 若弹出 SmartScreen 蓝屏提示，请点击 **“更多信息”→“仍要运行”**。若系统开启了 **Smart App Control** 直接阻拦下载脚本，请改用免下载的 **[网页一键安装器](https://snowyukitty.github.io/psycho-sleuth-subtitles/?lang=zh-Hans)**，或在解压前右键 ZIP → **属性 → 解除锁定**。

## 日常切换与还原

- **想换配对或上下对调：** 关闭游戏，随时再双击 **`Install.cmd`** 重选即可（会自动复用已校验的原版备份）。
- **想恢复原版：** 关闭游戏，双击 **`Restore.cmd`** 一键还原（或在 `Install.cmd` 第一界面按 `R`）。还原完成前请保留 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`。
- **安装过程被中断：** 不要启动游戏，重新运行 `Install.cmd` 或 `Restore.cmd` 即可自动恢复。
- **从 `0.1.0-preview.1` 升级：** 将新版解压到新文件夹后直接运行新版 `Install.cmd`，保留游戏内的 `.psycho-sleuth-subtitles` 即可（无需先手动还原）。*（提示：0.2.0 起数字 `4` 改为简体中文，还原请按 `R` 或执行 `Restore.cmd`。）*
- **Steam 更新游戏后：** **切勿用旧备份覆盖新版游戏**。请先在 Steam 执行 **“验证游戏文件的完整性”**，把 `.psycho-sleuth-subtitles` 移出游戏目录妥善保存，再等待适配新版发布。

## 常见问题排查

- **提示游戏仍在运行：** 请从 Steam 或任务管理器确认游戏彻底关闭后再试。
- **首次启动无法下载 Python：** 请检查防火墙或杀毒软件是否拦截 `python.org`（约 12 MB）后重试 `Install.cmd`；仅在 SHA-256 完全一致时才会执行。
- **序章动画或少数台词只显示一种语言：** 属于游戏原版文件缺少该语言译文所致（例如原版序章缺繁中 `.srt`，见下方说明）。
- **需要进一步帮助：** 请查阅 [问题排查](../SUPPORT.md) 或前往 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) 反馈。

---

<details>
<summary><strong>支持配对与进阶命令行参数（可选）</strong></summary>

四语代码为 `en`（English）、`ja`（日本語）、`zh-Hant`（繁體中文）、`zh-Hans`（简体中文），任选两种共 **6 种配对、12 种上下排列**。繁体和简体分别读取游戏内置的独立官方译文，不经自动转换。

```powershell
# 可选：核对下载压缩包 SHA-256
Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip

# 在解压文件夹内执行的命令行示例
.\Install.cmd --pair en-ja
.\Install.cmd --top ja --bottom zh-Hans
.\Install.cmd --list-pairs
.\Install.cmd --detect
.\Install.cmd --status
.\Install.cmd --game-dir "<game-folder>" --pair en-zh-Hans
.\Restore.cmd
```

旧版代号 `zh-en`、`zh-ja` 仍可使用并按“繁体中文在上”解析；`ja-en` 保持不变。

</details>

<details>
<summary><strong>适用范围、预览限制与使用条款</strong></summary>

- **涵盖范围：** 剧情对话、剧情选项与 22 组过场动画 `.srt` 字幕；菜单、角色名称与线索界面保持游戏选定语言。
- **排版与缺译处理：** 多数采用上下两行对照；少数高密度页面按选定顺序改为同行对照，以保留原有点击节奏（原文相同时只显示一次）。原版序章动画缺繁中 `.srt`，因此含繁中的配对在该段只显示另一种选定语言。缺单边译文的对话或过场时间轴差异，会保留游戏当前语言或短暂显示单语。
- **验证状态：** 仅接受兼容的原版 Steam 文件或可识别的本工具状态。12 种排列已通过隔离数据自动化验证（完整保留语音与非字幕对象），但长句、选项、英文／简中游戏字体与过场画面的实机目视验收仍待完成。
- **使用条款：** 依 [LICENSE](../LICENSE) 免费下载并供个人安装与备份使用，其他权利保留（非 MIT 等开源协议）。分享请附 [官方 Release 页面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases) 链接，请勿自行重新打包分发。本工具与游戏制作者无关联，需搭配合法购买并安装的 Steam 版《异病侦探 Psycho-Sleuth》使用；官方嵌入版 Python 保留各自许可（[Python 3.14.10 版本信息与校验值](https://www.python.org/downloads/release/python-31410/)）。

</details>
