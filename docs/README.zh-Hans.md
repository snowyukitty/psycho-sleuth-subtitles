# 异病侦探 Psycho-Sleuth 双字幕 — 使用说明

[English](README.en.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

这是非官方的 **Windows x64 预览版**工具，使用游戏本机已有的官方翻译组合双语字幕。不新增配音，不需要 API key，不上传游戏文本，也不包含游戏素材或完整剧本。

## 安装

1. 从 [`v0.2.0-preview.1` Release 页面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases/tag/v0.2.0-preview.1)下载 **Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip**。
   *（可选校验：可在 PowerShell 中运行 `Get-FileHash .\Psycho-Sleuth-Subtitles-0.2.0-preview.1-Minimal.zip`，核对是否与 `SHA256SUMS.txt` 一致。）*
2. 将整个 ZIP 解压到可写入的文件夹。保留 `_tool` 文件夹，与 `Install.cmd`、`Restore.cmd` 放在一起。
3. 完全关闭 *Psycho-Sleuth* 并暂停 Steam 自动更新，双击 **Install.cmd**。
4. 工具通常会自动找到 Steam 游戏文件夹；如果要求输入路径，粘贴可写入的游戏文件夹路径即可。
5. 先选**上方字幕**，再选**下方字幕**。两个画面的编号相同；下方菜单会自动排除已选语言。

| 编号 | 语言 |
| --- | --- |
| 1 | English — 英文 |
| 2 | 日本語 — 日文 |
| 3 | 繁體中文 — 繁体中文 |
| 4 | 简体中文 |

任选两种不同语言，共 **6 种配对、12 种上下排列**（含繁体中文／简体中文）。例如 **1 → 4** 是英文在上、简中在下；**4 → 1** 则相反。选好下方语言后立即开始安装。第一个画面可按 **R** 还原、**0** 退出；第二个画面按 **0** 返回。*（注意：0.2.0-preview.1 中编号 4 表示简体中文，还原请按 R 或运行 Restore.cmd。）*

6. 游戏内的文本语言请选择 **繁体中文** 或 **日文**。对译齐全的对话在两种设置下都会显示本工具选定的双字幕组合；例外请见下方“范围与预览限制”。

首次运行需要联网，会从 `python.org` 下载约 **12 MB** 的官方 Python 3.14.10 嵌入版运行环境，校验固定 SHA-256 后缓存在 `_tool\python-runtime.zip`；每次启动都会重新校验该压缩包并解压到 `%TEMP%` 下的独立临时目录运行（退出后清理）。不需要自行安装 Python，也不会改动系统原有的 Python。

### 命令行参数（可选）

也可以**在解压后的文件夹内**打开 PowerShell 或命令提示符，直接传参运行 `Install.cmd` 或 `Restore.cmd`：

- `.\Install.cmd --pair en-ja` — 免交互直接安装指定配对（`上-下`）
- `.\Install.cmd --top ja --bottom zh-Hant` — 分别指定上下语言（`en`, `ja`, `zh-Hant`, `zh-Hans`）
- `.\Install.cmd --list-pairs` — 列出支持的 12 种排列
- `.\Restore.cmd` — 立即精确还原原版文件

## 切换、升级与还原

关闭游戏后，随时再次运行 **Install.cmd** 即可更换配对或上下对调。双击 **Restore.cmd** 可以字节级精确还原原版文件。已验证的原版备份保存在 `Psycho Sleuth_Data/.psycho-sleuth-subtitles/original`，还原完成前请勿删除 `.psycho-sleuth-subtitles`。如果安装过程被中断，请重新运行 Install 或 Restore 完成恢复，再启动游戏。

**从 0.1.0-preview.1 升级：** 将新版 ZIP 解压到另一个文件夹，直接运行新版 `Install.cmd`。工具识别旧版安装后会自动沿用已校验的原版备份，不需要先手动还原。请保留游戏内的 `.psycho-sleuth-subtitles` 文件夹；若 Steam 或其他工具修改过文件，仍会执行兼容性检查。

**Steam 更新游戏后：** **请勿用旧备份覆盖新版本文件**。工具会主动拒绝未知版本与其他模组。如果更新后恢复被拒绝，请先在 Steam 完成 **“验证游戏文件的完整性”**，再将 `.psycho-sleuth-subtitles` 移出游戏文件夹妥善保存，等待适配新版游戏的工具发布。

## 常见问题排查

- **提示游戏仍在运行：** 请在 Steam 或任务管理器中确认游戏完全关闭后再试。
- **首次启动无法下载 Python 运行环境：** 请检查防火墙或杀毒软件是否拦截了对 `python.org`（约 12 MB）的访问后重试 `Install.cmd`。仅当 SHA-256 完全匹配时才会执行下载内容。
- **部分台词或序章动画只显示一种语言：** 属于游戏原版文件缺少对应语言译文所致（例如原版序章动画缺少繁中 `.srt`；详见下方“范围”）。
- **需要进一步帮助：** 请查看 [SUPPORT.md](https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/SUPPORT.md) 或前往 [GitHub Issues](https://github.com/snowyukitty/psycho-sleuth-subtitles/issues) 反馈。

## 范围与预览限制

- 支持剧情对话、剧情选项与 22 组过场动画 `.srt` 字幕；菜单、角色名与线索界面保持游戏选定语言。
- 多数对话采用上下两行显示；少数行数较多的紧凑页面会按选定顺序采用同行对照，以保留原有点击节奏。两语言原文完全相同时只显示一次。
- 原版序章动画缺少繁体中文字幕；含繁中的配对在该段只显示另一种选定语言（若搭配简中则显示简中）。过场字幕时间轴存在差异时，也可能短暂只显示其中一种语言。缺少任一选定译文的对话行将保持原样，按游戏当前语言显示（也可能为空白）。
- 繁体与简体中文分别读取游戏内置的**独立官方译文**，不使用自动繁简转换。
- 仅接受受支持的原版 Steam 文件或可识别的本工具安装状态。12 种排列已通过隔离数据验证（包含完整保留语音与非字幕对象），但长句换行、选项框、英文／简中游戏界面字体及过场字幕的实际游戏画面验收尚未全部完成，请优先使用上方推荐的“繁体中文或日文”游戏界面语言设置。

## 使用条款

按照随附的 **LICENSE.txt** 免费下载并供个人安装与备份使用，其他权利保留。分享时请附上[官方 Release 页面](https://github.com/snowyukitty/psycho-sleuth-subtitles/releases)链接，请勿自行重新打包分发。所有脚本均可阅读源码，并非加密可执行文件。本工具与游戏制作者无官方关联，条款不授予游戏素材或剧本权利；需搭配合法安装的 Steam 游戏使用。

Python 保留自身许可，随下载的官方 ZIP 一并提供。[Python 3.14.10 版本信息与校验值](https://www.python.org/downloads/release/python-31410/)。
