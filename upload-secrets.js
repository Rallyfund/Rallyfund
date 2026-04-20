const { execSync } = require('child_process');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const lines = envFile.split('\n');

for (const line of lines) {
  if (line.trim() && !line.startsWith('#')) {
    let [key, ...valueParts] = line.split('=');
    let value = valueParts.join('=').trim();
    if (!key) continue;
    
    // Override SITE_URL for production
    if (key === 'NEXT_PUBLIC_SITE_URL') {
      value = 'https://rallyfund.net';
    }

    console.log(`Setting secret for ${key}...`);
    try {
      execSync(`npx wrangler secret put ${key} --name rallyfund-app`, {
        input: value,
        stdio: ['pipe', 'pipe', 'pipe']
      });
      console.log(`✅ Set ${key}`);
    } catch (err) {
      console.error(`❌ Failed to set ${key}:`, err.stderr ? err.stderr.toString() : err.message);
    }
  }
}
