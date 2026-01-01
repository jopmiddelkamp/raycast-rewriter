# Rewrite Anywhere

A Raycast extension that rewrites selected text in different styles using OpenAI.

## Features

- Rewrites selected text or clipboard content
- 8 different writing styles:
  - Business Formal / Informal
  - Friends Formal / Informal / Funny
  - General Formal / Informal / Funny
- Remembers your last-used style
- Copies rewritten text to clipboard for easy pasting

## Setup

### 1. Install the Extension

```bash
npm install
npm run dev
```

### 2. Configure OpenAI API Key

1. Open Raycast Preferences (`Cmd + ,`)
2. Navigate to Extensions > Rewrite Anywhere
3. Enter your OpenAI API Key in the **OpenAI API Key** field

### 3. Configure Model (Optional)

By default, the extension uses `gpt-4.1-nano`. To use a different model:

1. Open Raycast Preferences
2. Navigate to Extensions > Rewrite Anywhere
3. Enter the model name in the **OpenAI Model** field (e.g., `gpt-4o`, `gpt-4-turbo`)

## Usage

1. Select text in any application (or copy text to clipboard)
2. Open Raycast and search for "Rewrite Text"
3. Choose your preferred writing style
4. Press Enter to rewrite
5. Paste (`Cmd + V`) to replace the original text

## Assign a Hotkey

For faster access:

1. Open Raycast Preferences
2. Navigate to Extensions > Rewrite Anywhere > Rewrite Text
3. Click on "Record Hotkey" and set your preferred shortcut

## License

MIT
