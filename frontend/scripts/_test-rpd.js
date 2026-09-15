// Check rate limits for working models by hitting them rapidly
const https = require('https');
const key = 'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg';

const models = [
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
];

function testModel(model) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: 'Say OK' }] }],
      generationConfig: { maxOutputTokens: 10 },
    });
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.error) {
            const msg = j.error.message || '';
            const quotaMatch = msg.match(/limit: (\d+)/);
            resolve({ model, status: res.statusCode, rateLimited: true,
              rpd: quotaMatch ? parseInt(quotaMatch[1]) : null,
              error: msg.substring(0, 200) });
          } else {
            resolve({ model, status: res.statusCode, rateLimited: false, works: true });
          }
        } catch (e) { resolve({ model, error: e.message }); }
      });
    });
    req.on('error', e => resolve({ model, error: e.message }));
    req.setTimeout(30000, () => { req.destroy(); resolve({ model, error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

async function main() {
  for (const model of models) {
    console.log(`\nTesting ${model} — sending 30 rapid requests...`);
    let success = 0, rateLimited = 0, rpd = null;
    const promises = [];
    for (let i = 0; i < 30; i++) {
      promises.push(testModel(model));
    }
    const results = await Promise.all(promises);
    for (const r of results) {
      if (r.works) success++;
      else if (r.rateLimited) { rateLimited++; if (r.rpd) rpd = r.rpd; }
    }
    console.log(`  Success: ${success}/30 | Rate limited: ${rateLimited}/30${rpd ? ' | RPD limit: ' + rpd : ''}`);
    if (rateLimited > 0 && !rpd) {
      // Get full error from one request
      const r = await testModel(model);
      if (r.error) console.log(`  Error: ${r.error.substring(0, 200)}`);
    }
  }
}
main();
