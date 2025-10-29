# Tokens Package

This package contains design tokens exported from Figma Tokens Studio and automatically converts them to Tailwind v4 format.

## How it works

1. **Source**: Tokens are defined in `src/tokens.json` (exported from Figma Tokens Studio)
2. **Conversion**: The `convert-tokens.js` script reads the tokens and converts them to Tailwind v4's `@theme` CSS format
3. **Output**: Generated CSS is written to `../tailwind/index.css`

## Commands

- `yarn build` - Convert tokens to Tailwind format (runs automatically on build)
- `yarn watch` - Watch for changes to `tokens.json` and regenerate CSS

## Keeping tokens in sync

When you update tokens in Figma Tokens Studio:
1. Export the updated `tokens.json` from Figma
2. Replace `src/tokens.json` with the new file
3. The conversion script automatically regenerates the Tailwind theme on build

Or use `yarn watch` during development to auto-regenerate whenever you update the tokens file.

