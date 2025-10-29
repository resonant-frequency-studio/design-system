const { watch } = require('fs');
const { exec } = require('child_process');

const tokensPath = require('path').join(__dirname, 'src/tokens.json');

console.log('👀 Watching for changes to tokens.json...');

watch(tokensPath, (eventType) => {
  if (eventType === 'change') {
    console.log('🔄 tokens.json changed, regenerating...');
    exec('node convert-tokens.js', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error:', error);
        return;
      }
      console.log(stdout);
    });
  }
});

