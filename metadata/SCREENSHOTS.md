# Screenshots for Raycast Store

Screenshots are **required** for publishing to the Raycast Store.

## Requirements

- **Format**: PNG
- **Size**: 2560 × 1600 pixels (recommended) or similar 16:10 ratio
- **Naming**: `{command-name}-{number}.png` (e.g., `rewrite-1.png`, `rewrite-2.png`)
- **Location**: Place in this `metadata/` folder

## Recommended Screenshots

1. **rewrite-1.png** — Style selection list showing all 8 styles
2. **rewrite-2.png** — Before/after example showing text transformation
3. **rewrite-3.png** — Preferences panel with API key and persona settings

## How to Capture

1. Run the extension: `npm run dev`
2. Open the command in Raycast
3. Use macOS Screenshot (`Cmd + Shift + 5`) or Raycast's screenshot command
4. Crop to recommended size

## Tips

- Use light mode for better visibility
- Show meaningful example text (not lorem ipsum)
- Keep it clean and professional

---

Once you have screenshots, delete this file and run:

```bash
npm run publish
```
