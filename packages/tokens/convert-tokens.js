const fs = require('fs');
const path = require('path');

// Read the tokens.json file
const tokensPath = path.join(__dirname, 'src/tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Extract tokens by type from the global theme
function extractTokens(obj, prefix = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value.$type && value.$value) {
      const varName = prefix ? `${prefix}-${key}` : key;
      result[varName] = value.$value;
    } else if (typeof value === 'object' && value !== null && !value.$value) {
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      Object.assign(result, extractTokens(value, newPrefix));
    }
  }
  
  return result;
}

// Get tokens from the global theme
const globalTheme = tokens['core/colors']?.global;
if (!globalTheme) {
  console.error('No global theme found in tokens.json');
  process.exit(1);
}

// Extract from each top-level category  
const allTokens = {
  colors: extractTokens(globalTheme.color || {}, ''),
  typography: extractTokens(globalTheme.typography || {}, ''),
  spacing: extractTokens(globalTheme.spacing || {}, ''),
  sizes: {}
};

// Generate Tailwind v4 @theme CSS
function generateThemeCSS(tokens) {
  const parts = [];
  
  // Generate color variables
  if (Object.keys(tokens.colors).length > 0) {
    const colorEntries = Object.entries(tokens.colors).map(([key, value]) => {
      const varName = `--color-${key.replace(/\//g, '-')}`;
      return `  ${varName}: ${value};`;
    }).join('\n');
    parts.push(`/* Color tokens */\n${colorEntries}`);
  }
  
  // Generate spacing variables
  if (Object.keys(tokens.spacing).length > 0) {
    const spacingEntries = Object.entries(tokens.spacing).map(([key, value]) => {
      const varName = `--spacing-${key.replace(/\//g, '-')}`;
      const unit = value.toString().match(/\d+/g) ? `${value}px` : value;
      return `  ${varName}: ${unit};`;
    }).join('\n');
    parts.push(`/* Spacing tokens */\n${spacingEntries}`);
  }
  
  // Generate typography variables
  if (Object.keys(tokens.typography).length > 0) {
    const typoEntries = Object.entries(tokens.typography).map(([key, value]) => {
      const varName = key.replace(/\//g, '-');
      const family = value.fontFamily || 'inherit';
      const size = value.fontSize || 'inherit';
      const weight = value.fontWeight || 'inherit';
      const lineHeight = value.lineHeight || 'inherit';
      const letterSpacing = value.letterSpacing || '0';
      
      return [
        `  --${varName}-font-family: ${family};`,
        `  --${varName}-font-size: ${size};`,
        `  --${varName}-font-weight: ${weight};`,
        `  --${varName}-line-height: ${lineHeight};`,
        `  --${varName}-letter-spacing: ${letterSpacing};`
      ].join('\n');
    }).join('\n');
    parts.push(`/* Typography tokens */\n${typoEntries}`);
  }
  
  const themeContent = parts.join('\n');
  
  return `@import "tailwindcss";

/* Custom tokens for Tailwind v4 - Auto-generated from Figma Tokens Studio */
@theme {
${themeContent}
}

/* (Optional) shared utilities */
@layer utilities {
  .rounded-button { border-radius: var(--radius-button, 0.375rem); }
  .rounded-card   { border-radius: var(--radius-card, 0.5rem); }
}
`;
}

// Generate the CSS
const css = generateThemeCSS(allTokens);

// Write to tailwind package
const outputPath = path.join(__dirname, '../tailwind/index.css');
fs.writeFileSync(outputPath, css);

const total = Object.keys(allTokens.colors).length + 
               Object.keys(allTokens.spacing).length + 
               Object.keys(allTokens.typography).length;

console.log('✅ Converted tokens.json to Tailwind v4 format');
console.log(`📝 Generated ${total} tokens (${Object.keys(allTokens.colors).length} colors, ${Object.keys(allTokens.spacing).length} spacing, ${Object.keys(allTokens.typography).length} typography)`);

