// Test rate limits for all available flash models
const https = require('https');
const key = 'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg';

const models = [
  'gemini-3.6-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
  'gemini-2.5-flash-lite',
];

function testModel(model) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: 'Reply with exactly: OK' }] }],
      generationConfig: { maxOutputTokens: 10 },
    });
    const start = Date.now();
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const elapsed = Date.now() - start;
        try {
          const j = JSON.parse(d);
          if (j.error) {
            // Extract rate limit info from error
            const msg = j.error.message || '';
            const quotaMatch = msg.match(/limit: (\d+)/);
            const retryMatch = msg.match(/retry in ([\d.]+)/);
            resolve({ model, status: res.statusCode, works: false, 
              rpd: quotaMatch ? parseInt(quotaMatch[1]) : null,
              retry: retryMatch ? retryMatch[1] : null,
              error: msg.substring(0, 150) });
          } else {
            const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
            resolve({ model, status: res.statusCode, works: true, response: text.substring(0, 20), elapsed });
          }
        } catch (e) {
          resolve({ model, status: res.statusCode, works: false, error: e.message });
        }
      });
    });
    req.on('error', e => resolve({ model, works: false, error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ model, works: false, error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Testing all flash models...\n');
  for (const model of models) {
    const r = await testModel(model);
    if (r.works) {
      console.log(`✅ ${model}: WORKS (${r.response}, ${r.elapsed}ms)`);
    } else if (r.rpd) {
      console.log(`⚠️  ${model}: Rate limited (RPD=${r.rpd}, retry in ${r.retry}s)`);
    } else if (r.status === 404) {
      console.log(`❌ ${model}: Not found`);
    } else {
      console.log(`❌ ${model}: ${r.error?.substring(0, 80)}`);
    }
  }
}
main();
