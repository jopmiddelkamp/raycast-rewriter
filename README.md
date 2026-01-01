# Rewrite Anywhere — AI Text Rewriter & Translator for Raycast

**Quick AI text rewriting and translation tool** — Transform any selected text instantly using OpenAI GPT. Perfect for business emails, casual messages, and professional communication.

🌐 **Multilingual README:** [Español](README.es.md) | [हिन्दी](README.hi.md) | [中文](README.zh.md)

[![Raycast Extension](https://img.shields.io/badge/Raycast-Extension-FF6363?logo=raycast)](https://raycast.com)
[![OpenAI Powered](https://img.shields.io/badge/Powered%20by-OpenAI-412991?logo=openai)](https://openai.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ What is Rewrite Anywhere?

**Rewrite Anywhere** is an AI-powered text transformation tool for [Raycast](https://raycast.com). It helps you:

- 📝 **Rewrite text** in different tones and styles
- 🌍 **Translate text** to match native-speaker patterns
- ✅ **Fix grammar and spelling** automatically
- 💼 **Transform casual text to business professional** and vice versa
- ⚡ **Work in any app** — select text, press hotkey, done!

### Who is this for?

- **Non-native English speakers** who want to sound more natural
- **Business professionals** who need polished communication
- **Writers and content creators** who want style variations
- **Anyone** who wants quick AI-assisted text improvement

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **8 Writing Styles** | Business Formal/Informal, Friends Formal/Informal/Funny, General Formal/Informal/Funny |
| **Smart Language Detection** | Adapts vocabulary based on your native language |
| **Professional Persona** | Adjusts terminology based on your profession |
| **One-Key Operation** | Default hotkey: `Cmd + Y` |
| **Works Everywhere** | Any app that supports text selection |
| **Auto-Paste** | Automatically replaces selected text |
| **Remembers Preferences** | Last-used style appears first |

---

## 📥 Installation

### Prerequisites

- [Raycast](https://raycast.com) installed on macOS
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Quick Install

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/raycast-rewriter.git
cd raycast-rewriter

# Install dependencies
npm install

# Start development mode
npm run dev
```

---

## ⚙️ Setup

### 1. Configure OpenAI API Key

1. Open Raycast Preferences (`Cmd + ,`)
2. Navigate to **Extensions > Rewrite Anywhere**
3. Enter your OpenAI API Key

### 2. Configure AI Model (Optional)

Default model: `gpt-4o-mini`

For different models (e.g., `gpt-4o`, `gpt-4-turbo`):
1. Open Raycast Preferences
2. Navigate to **Extensions > Rewrite Anywhere**
3. Enter the model name in the **OpenAI Model** field

### 3. Personalize Your AI (Optional)

For more natural, personalized rewrites:

- **Native Language**: Your native language (e.g., Dutch, Spanish, Hindi, Chinese). Helps the AI adapt vocabulary complexity.
- **Professional Background**: Your profession (e.g., Software Engineer, Marketing Manager). Helps with appropriate terminology.

---

## 📖 How to Use

1. **Select text** in any application (or copy to clipboard)
2. **Press `Cmd + Y`** (or search "Rewrite Text" in Raycast)
3. **Choose your writing style**
4. **Press Enter** — text is rewritten and auto-pasted!

### Pro Tips

- 💡 Last-used style appears at the top for quick access
- 💡 Enable Accessibility permission for direct text selection
- 💡 Works with clipboard if text selection isn't available

---

## 🔐 Accessibility Permission

For the best experience (reading selected text directly):

1. Go to **System Settings → Privacy & Security → Accessibility**
2. Enable **Raycast**
3. The extension will automatically use selected text

Without this permission, the extension uses clipboard content.

---

## ⌨️ Custom Hotkey

To change the default `Cmd + Y` hotkey:

1. Open Raycast Preferences
2. Navigate to **Extensions > Rewrite Anywhere > Rewrite Text**
3. Click "Record Hotkey" and set your preference

---

## 🛠️ Tech Stack

- **Raycast API** — Native macOS launcher integration
- **OpenAI GPT** — State-of-the-art language model
- **TypeScript** — Type-safe development
- **React** — Component-based UI

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.

---

## 🔗 Related Keywords

*AI text rewriter, AI translator, quick text translation, OpenAI text tool, GPT writing assistant, grammar checker, text transformer, business email writer, professional communication tool, Raycast productivity extension, macOS text tool, AI writing helper, instant text translation, smart text editor*

---

**Made with ❤️ for the Raycast community**
