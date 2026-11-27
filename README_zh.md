<div align="center">

<img src="app-icon.png" width="120" alt="AnyTerm Logo"/>

# AnyTerm

**轻量级 SSH 客户端与终端，支持 macOS、Windows 和 Linux —— 一个原生桌面应用管理所有 SSH 连接。**

**隐私优先。您的数据，您的密钥。开源开放。**

[![Release](https://img.shields.io/github/v/release/geek-fun/AnyTerm?color=orange&label=release&logo=github)](https://github.com/geek-fun/AnyTerm/releases)
[![Downloads](https://img.shields.io/github/downloads/geek-fun/AnyTerm/total?color=orange&logo=docusign)](https://github.com/geek-fun/AnyTerm/releases)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg&logo=apache)](LICENSE)
[![Stars](https://img.shields.io/github/stars/geek-fun/AnyTerm&logo=github)](https://github.com/geek-fun/AnyTerm/stargazers)
[![CI](https://github.com/geek-fun/AnyTerm/actions/workflows/node.yml/badge.svg)](https://github.com/geek-fun/AnyTerm/actions/workflows/node.yml)

<p>
  <img src="https://img.shields.io/badge/macOS-000000?logo=apple&logoColor=white"/>
  <img src="https://img.shields.io/badge/Windows-0078D6&logo=windows&logoColor=white"/>
  <img src="https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tauri-FFC131&logo=tauri&logoColor=black"/>
  <img src="https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white"/>
</p>

[下载](https://github.com/geek-fun/AnyTerm/releases) · [官网](https://www.geekfun.club) · [Issues](https://github.com/geek-fun/AnyTerm/issues)

[English](README.md) · 简体中文

</div>

---

AnyTerm 把所有 SSH 连接集中在一处，终端一键直达。主机和凭据只需保存一次，之后随时在标签页中打开，不必反复输入主机、用户名和密码。它基于 Tauri 和 Rust 构建，而非 Electron，是一个不捆绑 Chromium 的小巧原生应用。

## 安装

<a href="https://github.com/geek-fun/AnyTerm/releases">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/下载-macOS_|_Windows_|_Linux-orange?logo=download&logoColor=white">
    <img src="https://img.shields.io/badge/下载-macOS_|_Windows_|_Linux-orange?logo=download&logoColor=white" alt="下载">
  </picture>
</a>
&nbsp;
<a href="https://github.com/geek-fun/AnyTerm/releases">
  <img src="https://img.shields.io/badge/Releases-GitHub-lightgrey&logo=github" alt="Releases">
</a>
&nbsp;
<a href="https://www.geekfun.club">
  <img src="https://img.shields.io/badge/官网-geekfun.club-blue&logo=google-chrome&logoColor=white" alt="官网">
</a>

从最新的 Release 中下载对应平台的安装包：macOS 为 `.dmg`，Windows 为 `.exe` 或 `.msi`，Linux 为 `.AppImage` 或 `.deb`。

## 核心功能

### 连接管理

- **连接管理** —— 保存主机及其名称、端口和凭据，随时编辑或删除
- **列表直连** —— 选择一个已保存的连接，即可在终端标签页中打开
- **多标签页** —— 最多同时打开 10 个标签页，无需离开应用即可切换

### 终端

- **xterm.js 终端** —— 输入命令，AnyTerm 通过 SSH 在远程主机上执行，并在标签页中打印输出

### 凭据

- **命名凭据** —— 将 SSH 密钥对或用户名/密码保存为命名的 Secret
- **一处修改** —— 打开 Secret 即可更新；连接只引用 Secret，而不复制其内容

### 主题与语言

- **主题** —— 浅色、深色或跟随操作系统
- **语言** —— English 与简体中文，也可跟随系统语言

### 轻量与原生

基于 Rust + Tauri 构建 —— 没有 Electron，也不捆绑 Chromium。AnyTerm 使用系统 WebView，以小巧的原生安装包覆盖 macOS、Windows 和 Linux。

### 跨平台

- **macOS** —— `.dmg` 安装包
- **Windows** —— `.exe` 与 `.msi` 安装包
- **Linux** —— `.AppImage` 与 `.deb` 安装包

### 隐私与安全

- **无遥测** —— AnyTerm 不会向外部上报任何数据
- **本地存储** —— 连接与凭据只保存在您的设备上
- **直连** —— AnyTerm 只连接您配置的 SSH 主机

凭据在磁盘上的存储方式请参阅下方的常见问题。

## 开发

AnyTerm 基于 [Tauri v2](https://v2.tauri.org/)（Rust）、Vue 3 + TypeScript、[Naive UI](https://www.naiveui.com/)、[xterm.js](https://xtermjs.org/) 和 Pinia 构建。

### 环境要求

- Node.js >= 20.19
- NPM >= 10
- Rust 工具链（用于 Tauri）

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev librsvg2-dev patchelf
```

**macOS:**

```bash
xcode-select --install
```

**Windows：** 安装 [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

### 快速开始

```bash
git clone https://github.com/geek-fun/AnyTerm.git
cd AnyTerm
npm install
npm run tauri dev
```

### 构建

```bash
npm run tauri build   # 构建当前平台的安装包
```

### 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm run build` | 构建生产环境前端 |
| `npm run lint:check` | 运行 ESLint |
| `npm run lint:fix` | 自动修复 lint 问题 |
| `npm test` | 运行前端测试 |
| `npm run tauri dev` | 启动 Tauri 开发环境 |
| `npm run tauri build` | 构建 Tauri 应用 |

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [Tauri v2](https://v2.tauri.org/)（Rust） |
| 前端 | [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| UI | [Naive UI](https://www.naiveui.com/) |
| 终端 | [xterm.js](https://xtermjs.org/) |
| 状态管理 | [Pinia](https://pinia.vuejs.org/) |
| 国际化 | [vue-i18n](https://vue-i18n.intlify.dev/) |

## 常见问题

<details>
<summary><strong>AnyTerm 是免费的吗？</strong></summary>

是的。AnyTerm 基于 Apache 2.0 许可证，免费且开源。
</details>

<details>
<summary><strong>AnyTerm 会上报数据吗？</strong></summary>

不会。AnyTerm 不收集任何遥测数据，也不检查更新。它只连接您配置的 SSH 主机，连接与凭据始终保存在您的设备上。
</details>

<details>
<summary><strong>凭据是如何存储的？</strong></summary>

连接与 Secret 保存在应用数据目录下的本地存储文件中。它们不会离开您的设备，但目前尚未静态加密，请依靠操作系统账户和磁盘加密加以保护。
</details>

<details>
<summary><strong>AnyTerm 支持 SSH 密钥认证吗？</strong></summary>

暂不支持。您可以将 SSH 密钥对保存为 Secret，但连接目前仍使用用户名和密码登录。
</details>

<details>
<summary><strong>终端是完整的交互式 Shell 吗？</strong></summary>

还不是。您输入的每一行命令都会通过 SSH 在最近打开的连接上执行，并在标签页中打印输出。暂不支持交互式、全屏程序。
</details>

<details>
<summary><strong>如何报告 Bug 或提出功能建议？</strong></summary>

请在 <a href="https://github.com/geek-fun/AnyTerm/issues">GitHub Issues</a> 中提交 Issue。
</details>

## 社区

<p align="center">
  <img src="docs/images/wechat_official.png" width="300" alt="微信公众号">
</p>

<p align="center">
  <a href="https://x.com/geekfun_club"><img src="https://img.shields.io/badge/X-Follow-000000?logo=x&logoColor=white" alt="X / Twitter" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.youtube.com/@geekfun-club"><img src="https://img.shields.io/badge/YouTube-Subscribe-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/geek-fun"><img src="https://img.shields.io/badge/GitHub-Follow-181717?logo=github&logoColor=white" alt="GitHub" /></a>
</p>

## 赞助

<p align="center">
  <img src="docs/images/wechat_ponsor.jpg" width="140" alt="微信赞赏码">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/sponsors/geek-fun"><img src="https://img.shields.io/badge/GitHub_Sponsors-%E2%9D%A4_Support-EA4AAA?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" /></a>
</p>

## 参与贡献

欢迎提交 Issue 和 PR。Fork 本仓库并创建分支（如 `feat/your-branch` 或 `fix/your-branch`），在发起 Pull Request 之前请确保 `npm run lint:check` 和 `npm test` 均已通过。

## 许可证

[Apache 2.0](LICENSE) © GEEKFUN
