<div align="center">

<img src="app-icon.png" width="120" alt="AnyTerm Logo"/>

# AnyTerm

**Lightweight SSH client & terminal for macOS, Windows and Linux — one native desktop app for your SSH connections.**

**Privacy-first. Your data, your keys. Open source.**

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

[Download](https://github.com/geek-fun/AnyTerm/releases) · [Website](https://www.geekfun.club) · [Issues](https://github.com/geek-fun/AnyTerm/issues)

English · [简体中文](README_zh.md)

</div>

---

AnyTerm keeps your SSH connections in one place and puts a terminal one click away. Save a host once, together with its credentials, and open it in a tab whenever you need it — no more retyping hosts, users and passwords. Built with Tauri and Rust rather than Electron, it ships as a small native app with no bundled Chromium.

## Installation

<a href="https://github.com/geek-fun/AnyTerm/releases">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Download-macOS_|_Windows_|_Linux-orange?logo=download&logoColor=white">
    <img src="https://img.shields.io/badge/Download-macOS_|_Windows_|_Linux-orange?logo=download&logoColor=white" alt="Download">
  </picture>
</a>
&nbsp;
<a href="https://github.com/geek-fun/AnyTerm/releases">
  <img src="https://img.shields.io/badge/Releases-GitHub-lightgrey&logo=github" alt="Releases">
</a>
&nbsp;
<a href="https://www.geekfun.club">
  <img src="https://img.shields.io/badge/Website-geekfun.club-blue&logo=google-chrome&logoColor=white" alt="Website">
</a>

Grab the installer for your platform from the latest release: a `.dmg` on macOS, an `.exe` or `.msi` on Windows, and an `.AppImage` or `.deb` on Linux.

## Key Features

### Connections

- **Connection manager** — save each host with a name, port and credential, then edit or remove it at any time
- **Connect from the list** — pick a saved connection and it opens in a terminal tab
- **Tabs** — keep up to 10 tabs open and switch between them without leaving the app

### Terminal

- **xterm.js terminal** — type a command and AnyTerm runs it on the remote host over SSH, printing the output in the tab

### Secrets

- **Named credentials** — keep SSH key pairs or username & password pairs as named secrets
- **Edit in one place** — open a secret to update it; connections reference the secret rather than copying it

### Themes & Languages

- **Themes** — light, dark, or follow the operating system
- **Languages** — English and 简体中文, or follow your system language

### Lightweight & Native

Built with Rust + Tauri — no Electron, no bundled Chromium. AnyTerm uses the system webview and ships as a small native package across macOS, Windows, and Linux.

### Cross-Platform

- **macOS** — `.dmg` installer
- **Windows** — `.exe` and `.msi` installers
- **Linux** — `.AppImage` and `.deb` packages

### Privacy & Security

- **No telemetry** — AnyTerm does not phone home
- **Local storage** — connections and credentials stay on your machine
- **Direct connections** — AnyTerm connects only to the SSH hosts you configure

See the FAQ for how credentials are stored on disk.

## Development

AnyTerm is built with [Tauri v2](https://v2.tauri.org/) (Rust), Vue 3 + TypeScript, [Naive UI](https://www.naiveui.com/), [xterm.js](https://xtermjs.org/) and Pinia.

### Prerequisites

- Node.js >= 20.19
- NPM >= 10
- Rust toolchain (for Tauri)

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev librsvg2-dev patchelf
```

**macOS:**

```bash
xcode-select --install
```

**Windows:** Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

### Setup

```bash
git clone https://github.com/geek-fun/AnyTerm.git
cd AnyTerm
npm install
npm run tauri dev
```

### Build

```bash
npm run tauri build   # current platform
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build frontend for production |
| `npm run lint:check` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm test` | Run frontend tests |
| `npm run tauri dev` | Start Tauri development |
| `npm run tauri build` | Build Tauri application |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Tauri v2](https://v2.tauri.org/) (Rust) |
| Frontend | [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| UI | [Naive UI](https://www.naiveui.com/) |
| Terminal | [xterm.js](https://xtermjs.org/) |
| State | [Pinia](https://pinia.vuejs.org/) |
| i18n | [vue-i18n](https://vue-i18n.intlify.dev/) |

## FAQ

<details>
<summary><strong>Is AnyTerm free?</strong></summary>

Yes. AnyTerm is free and open source under the Apache 2.0 license.
</details>

<details>
<summary><strong>Does AnyTerm phone home?</strong></summary>

No. AnyTerm collects no telemetry and makes no update checks. It connects only to the SSH hosts you configure, and your connections and credentials stay on your machine.
</details>

<details>
<summary><strong>How are credentials stored?</strong></summary>

Connections and secrets are saved in local store files inside the app's data directory. They never leave your machine, but they are not encrypted at rest yet, so rely on your OS user account and disk encryption to protect them.
</details>

<details>
<summary><strong>Does AnyTerm support SSH key authentication?</strong></summary>

Not yet. You can save an SSH key pair as a secret, but connections currently sign in with a username and password.
</details>

<details>
<summary><strong>Is the terminal a full interactive shell?</strong></summary>

Not yet. Each line you enter is run over SSH on your most recently opened connection and its output is printed in the tab. Interactive, full-screen programs are not supported.
</details>

<details>
<summary><strong>How do I report a bug or request a feature?</strong></summary>

Open an issue on <a href="https://github.com/geek-fun/AnyTerm/issues">GitHub Issues</a>.
</details>

## Community

<p align="center">
  <img src="docs/images/wechat_official.png" width="300" alt="WeChat Official Account">
</p>

<p align="center">
  <a href="https://x.com/geekfun_club"><img src="https://img.shields.io/badge/X-Follow-000000?logo=x&logoColor=white" alt="X / Twitter" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.youtube.com/@geekfun-club"><img src="https://img.shields.io/badge/YouTube-Subscribe-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/geek-fun"><img src="https://img.shields.io/badge/GitHub-Follow-181717?logo=github&logoColor=white" alt="GitHub" /></a>
</p>

## Sponsor

<p align="center">
  <img src="docs/images/wechat_ponsor.jpg" width="140" alt="WeChat Sponsor QR">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/sponsors/geek-fun"><img src="https://img.shields.io/badge/GitHub_Sponsors-%E2%9D%A4_Support-EA4AAA?logo=githubsponsors&logoColor=white" alt="GitHub Sponsors" /></a>
</p>

## Contributing

Issues and PRs welcome. Fork the repository, create a branch such as `feat/your-branch` or `fix/your-branch`, and make sure `npm run lint:check` and `npm test` pass before opening a pull request.

## License

[Apache 2.0](LICENSE) © GEEKFUN
