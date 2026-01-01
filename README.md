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
- Persona customization (native language, professional background)
- Default hotkey: `Cmd + Y`

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

### 4. Configure Persona (Optional)

For more personalized rewrites, you can configure:

- **Native Language**: Your native language (e.g., Dutch, German, Spanish). This helps the AI adapt vocabulary complexity based on whether the text is in your native language or not.
- **Professional Background**: Your profession or role (e.g., Senior Software Engineer, Marketing Manager). This helps the AI use appropriate terminology and tone for business styles.

1. Open Raycast Preferences
2. Navigate to Extensions > Rewrite Anywhere
3. Fill in **Native Language** and/or **Professional Background** fields

## Usage

1. Select text in any application (or copy text to clipboard)
2. Press `Cmd + Y` (default hotkey) or search for "Rewrite Text" in Raycast
3. Choose your preferred writing style
4. Press Enter to rewrite
5. Paste (`Cmd + V`) to replace the original text

### Tips

- The last-used style appears at the top of the list for quick access
- If you don't have Accessibility permission enabled, the extension will use clipboard content instead

## Assign a Custom Hotkey

The extension comes with a default hotkey (`Cmd + Y`). To change it:

1. Open Raycast Preferences
2. Navigate to Extensions > Rewrite Anywhere > Rewrite Text
3. Click on "Record Hotkey" and set your preferred shortcut

## Accessibility Permission

To read selected text directly (instead of only using clipboard):

1. Go to System Settings → Privacy & Security → Accessibility
2. Enable Raycast
3. The extension will automatically detect and use selected text when available

## License

MIT
