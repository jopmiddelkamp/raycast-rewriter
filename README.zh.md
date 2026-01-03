# Rewrite Anywhere — Raycast AI 文本重写与翻译工具

**快速 AI 文本重写和翻译工具** — 使用 OpenAI GPT 即时转换任何选中的文本。完美适用于商务邮件、日常消息和专业沟通。

🌐 **其他语言 README:** [English](README.md) | [Español](README.es.md) | [हिन्दी](README.hi.md)

[![Raycast Extension](https://img.shields.io/badge/Raycast-Extension-FF6363?logo=raycast)](https://raycast.com)
[![OpenAI Powered](https://img.shields.io/badge/Powered%20by-OpenAI-412991?logo=openai)](https://openai.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ 什么是 Rewrite Anywhere？

**Rewrite Anywhere** 是一款为 [Raycast](https://raycast.com) 打造的 AI 驱动文本转换工具。它帮助您：

- 📝 **重写文本** 以不同的语气和风格
- 🌍 **翻译文本** 以匹配母语者的表达方式
- ✅ **自动修复语法和拼写**错误
- 💼 **将日常文本转换为商务专业风格**，反之亦然
- ⚡ **在任何应用中工作** — 选择文本，按快捷键，完成！

### 适用人群

- **非英语母语者**，希望表达更加自然
- **商务人士**，需要精炼的沟通
- **作家和内容创作者**，需要风格变化
- **任何人**，想要快速的 AI 辅助文本改进

---

## 🚀 功能特点

| 功能 | 描述 |
|------|------|
| **8 种写作风格** | 商务正式/非正式、朋友正式/非正式/幽默、通用正式/非正式/幽默 |
| **智能语言检测** | 根据您的母语调整词汇复杂度 |
| **专业人设** | 根据您的职业调整术语 |
| **一键操作** | 默认快捷键：`Opt + Y` |
| **随处工作** | 任何支持文本选择的应用 |
| **自动粘贴** | 自动替换选中的文本 |
| **记住偏好** | 最后使用的风格显示在最前面 |

---

## 📥 安装

### 前置要求

- 在 macOS 上安装 [Raycast](https://raycast.com)
- OpenAI API 密钥（[在此获取](https://platform.openai.com/api-keys)）

### 快速安装

```bash
# 克隆仓库
git clone https://github.com/jopmiddelkamp/raycast-rewriter.git
cd raycast-rewriter

# 安装依赖
npm install

# 启动开发模式
npm run dev
```

---

## ⚙️ 设置

### 1. 配置 OpenAI API 密钥

1. 打开 Raycast 偏好设置（`Cmd + ,`）
2. 导航至 **Extensions > Rewrite Anywhere**
3. 输入您的 OpenAI API 密钥

### 2. 配置 AI 模型（可选）

默认模型：`gpt-4o-mini`

使用其他模型（例如 `gpt-4o`、`gpt-4-turbo`）：
1. 打开 Raycast 偏好设置
2. 导航至 **Extensions > Rewrite Anywhere**
3. 在 **OpenAI Model** 字段中输入模型名称

### 3. 个性化您的 AI（可选）

获得更自然、个性化的重写效果：

- **母语**：您的母语（例如中文、西班牙语、印地语）。帮助 AI 调整词汇复杂度。
- **职业背景**：您的职业（例如软件工程师、市场经理）。帮助使用恰当的术语。

---

## 📖 如何使用

1. 在任何应用程序中**选择文本**（或复制到剪贴板）
2. **按 `Opt + Y`**（或在 Raycast 中搜索"Rewrite Text"）
3. **选择您的写作风格**
4. **按 Enter** — 文本被重写并自动粘贴！

### 专业技巧

- 💡 最后使用的风格显示在顶部，便于快速访问
- 💡 启用辅助功能权限以直接选择文本
- 💡 如果文本选择不可用，可使用剪贴板内容

---

## 🔐 辅助功能权限

获得最佳体验（直接读取选中的文本）：

1. 前往 **系统设置 → 隐私与安全 → 辅助功能**
2. 启用 **Raycast**
3. 扩展将自动使用选中的文本

没有此权限，扩展将使用剪贴板内容。

---

## ⌨️ 自定义快捷键

更改默认的 `Opt + Y` 快捷键：

1. 打开 Raycast 偏好设置
2. 导航至 **Extensions > Rewrite Anywhere > Rewrite Text**
3. 点击"Record Hotkey"并设置您的偏好

---

## 🛠️ 技术栈

- **Raycast API** — 原生 macOS 启动器集成
- **OpenAI GPT** — 最先进的语言模型
- **TypeScript** — 类型安全的开发
- **React** — 基于组件的 UI

---

## 📄 许可证

MIT License — 详情请参阅 [LICENSE](LICENSE)。

---

## 🔗 相关关键词

*AI 文本重写器、AI 翻译器、快速文本翻译、OpenAI 文本工具、GPT 写作助手、语法检查器、文本转换器、商务邮件写作、专业沟通工具、Raycast 生产力扩展、macOS 文本工具、AI 写作助手、即时文本翻译、智能文本编辑器*

---

**为 Raycast 社区用 ❤️ 打造**
