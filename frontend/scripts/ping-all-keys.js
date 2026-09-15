// Quick ping test — verify all 39 keys work with both models
const fs = require('fs');
const https = require('https');
const path = require('path');

const envFile = path.join(__dirname, 'gemini-keys-39.env');
const envContent = fs.readFileSync(envFile, 'utf8');
const KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) KEYS.push(m[1].trim());
}

console.log(`Testing ${KEYS.length} keys...\n`);

const MODELS = ['gemini-3.5-flash', 'gemini-3.6-flash'];

function pingKey(key, model) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: 'Reply with just: OK' }] }],
      generationConfig: { maxOutputTokens: 10, temperature: 0 },
    });
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
            resolve({ status: 'OK', code: 200, text: text.substring(0, 20) });
          } catch (e) {
            resolve({ status: 'PARSE_ERR', code: 200, text: e.message });
          }
        } else if (res.statusCode === 429) {
          resolve({ status: 'RATE_LIMITED', code: 429, text: data.substring(0, 100) });
        } else if (res.statusCode === 503) {
          resolve({ status: 'OVERLOADED', code: 503, text: '' });
        } else {
          resolve({ status: 'ERROR', code: res.statusCode, text: data.substring(0, 100) });
        }
      });
    });
    req.on('error', (e) => resolve({ status: 'NET_ERR', code: 0, text: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ status: 'TIMEOUT', code: 0, text: '' }); });
    req.write(body);
    req.end();
  });
}

async function main() {
  const results = [];
  
  // Test all keys with 3.6-flash (primary model)
  console.log('=== Testing gemini-3.6-flash ===');
  for (let i = 0; i < KEYS.length; i++) {
    const r = await pingKey(KEYS[i], 'gemini-3.6-flash');
    const mark = r.status === 'OK' ? '✅' : '❌';
    console.log(`  Key ${i+1}: ${mark} ${r.status} ${r.text ? '(' + r.text + ')' : ''}`);
    results.push({ keyIdx: i+1, model: '3.6-flash', ...r });
  }
  
  const ok36 = results.filter(r => r.status === 'OK').length;
  console.log(`\n  3.6-flash: ${ok36}/${KEYS.length} keys working\n`);
  
  // Test all keys with 3.5-flash
  console.log('=== Testing gemini-3.5-flash ===');
  for (let i = 0; i < KEYS.length; i++) {
    const r = await pingKey(KEYS[i], 'gemini-3.5-flash');
    const mark = r.status === 'OK' ? '✅' : '❌';
    console.log(`  Key ${i+1}: ${mark} ${r.status} ${r.text ? '(' + r.text + ')' : ''}`);
    results.push({ keyIdx: i+1, model: '3.5-flash', ...r });
  }
  
  const ok35 = results.filter(r => r.model === '3.5-flash' && r.status === 'OK').length;
  console.log(`\n  3.5-flash: ${ok35}/${KEYS.length} keys working\n`);
  
  // Summary
  console.log('=== SUMMARY ===');
  console.log(`  3.6-flash: ${ok36}/${KEYS.length} keys working`);
  console.log(`  3.5-flash: ${ok35}/${KEYS.length} keys working`);
  console.log(`  Total working keys: ${ok36 + ok35}/${KEYS.length * 2}`);
  console.log(`  Budget: ${ok36 * 20} + ${ok35 * 20} = ${(ok36 + ok35) * 20} calls`);
}

main();
