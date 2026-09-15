const https = require('https');
const keys = [
  'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe',
  'sk-ant-opm-71R9wtEucISZPpEWPa9bYvANSWu3NjX-',
];

function testKey(keyIdx) {
  return new Promise((resolve) => {
    const key = keys[keyIdx];
    const body = JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 100,
      thinking: { type: 'enabled', budget_tokens: 500 },
      messages: [{ role: 'user', content: 'Reply with exactly: QUOTA_OK' }],
    });
    const start = Date.now();
    const req = https.request({
      hostname: 'api.opusmax.pro',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const elapsed = Math.round((Date.now() - start) / 1000);
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const textBlock = json.content?.find(b => b.type === 'text');
            const text = textBlock?.text || '';
            if (text.includes('Usage limit reached') || text.includes('quota')) {
              resolve({ keyIdx, status: 'QUOTA_EXHAUSTED', elapsed });
            } else {
              resolve({ keyIdx, status: 'OK', text: text.substring(0, 50), elapsed });
            }
          } catch (e) {
            resolve({ keyIdx, status: 'PARSE_ERROR', error: e.message, raw: data.substring(0, 200), elapsed });
          }
        } else if (res.statusCode === 429) {
          resolve({ keyIdx, status: 'RATE_LIMITED', elapsed, raw: data.substring(0, 200) });
        } else if (res.statusCode === 529) {
          resolve({ keyIdx, status: 'OVERLOADED', elapsed });
        } else {
          resolve({ keyIdx, status: 'ERROR_' + res.statusCode, elapsed, raw: data.substring(0, 300) });
        }
      });
    });
    req.on('error', (e) => resolve({ keyIdx, status: 'NETWORK_ERROR', error: e.message, elapsed: 0 }));
    req.setTimeout(60000, () => { req.destroy(); resolve({ keyIdx, status: 'TIMEOUT', elapsed: 60 }); });
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('Testing Opus API quota...\n');
  const results = await Promise.all([testKey(0), testKey(1)]);
  results.forEach(r => {
    console.log(`Key ${r.keyIdx + 1}: ${r.status} (${r.elapsed}s)`);
    if (r.text) console.log(`  Response: "${r.text}"`);
    if (r.raw) console.log(`  Raw: ${r.raw}`);
  });
  const anyOk = results.some(r => r.status === 'OK');
  console.log('\n=== ' + (anyOk ? 'QUOTA RESET — Opus can run!' : 'QUOTA NOT RESET') + ' ===');
})();
