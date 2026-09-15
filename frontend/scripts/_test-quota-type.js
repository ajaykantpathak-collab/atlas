const https = require('https');
const keys = [
  'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
  'AQ.Ab8RN6JQsjDH9MWFSdbXUsWwRHBgUyilNKzK-1a0tFAPieMYCA',
];

function test(key, idx) {
  return new Promise(r => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: 'Say OK' }] }],
      generationConfig: { maxOutputTokens: 10 },
    });
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: '/v1beta/models/gemini-3.6-flash:generateContent?key=' + key,
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
            const m1 = msg.match(/limit: (\d+)/);
            const m2 = msg.match(/retry in ([\d.]+)/);
            // Check if it's RPM (per minute) or RPD (per day)
            const isPerDay = msg.includes('PerDay') || msg.includes('per day') || msg.includes('PerProjectPerModel');
            r({ key: idx + 1, status: res.statusCode, exhausted: true, rpd: m1 ? m1[1] : null, retry: m2 ? m2[1] : null, quotaType: isPerDay ? 'RPD (per day per project)' : 'RPM (per minute)', fullError: msg.substring(0, 300) });
          } else {
            r({ key: idx + 1, status: res.statusCode, works: true });
          }
        } catch (e) { r({ key: idx + 1, error: e.message }); }
      });
    });
    req.on('error', e => r({ key: idx + 1, error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); r({ key: idx + 1, error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Testing all 3 keys against gemini-3.6-flash...\n');
  const results = await Promise.all(keys.map((k, i) => test(k, i)));
  results.forEach(r => {
    if (r.works) console.log(`Key ${r.key}: WORKS`);
    else if (r.exhausted) {
      console.log(`Key ${r.key}: EXHAUSTED`);
      console.log(`  RPD limit: ${r.rpd}`);
      console.log(`  Retry in: ${r.retry}s`);
      console.log(`  Quota type: ${r.quotaType}`);
      console.log(`  Full error: ${r.fullError}`);
    }
    else console.log(`Key ${r.key}: ERROR ${r.error}`);
  });
}
main();
