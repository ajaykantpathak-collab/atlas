const https = require('https');
const key = 'AQ.Ab8RN6KjMrfIWX6mc2ErL3WyiSQo3tNLwavK08-QpWqdAjOBXQ';

// Test 1: Check if key works at all
function testBasic() {
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
            r({ status: res.statusCode, works: false, error: msg.substring(0, 300), rpd: m1 ? m1[1] : null });
          } else {
            const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
            r({ status: res.statusCode, works: true, response: text });
          }
        } catch (e) { r({ status: res.statusCode, error: e.message, raw: d.substring(0, 300) }); }
      });
    });
    req.on('error', e => r({ error: e.message }));
    req.setTimeout(15000, () => { req.destroy(); r({ error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

// Test 2: Send 25 rapid requests to see if RPD is higher than 20
function testRateLimit() {
  const promises = [];
  for (let i = 0; i < 25; i++) {
    promises.push(new Promise(r => {
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
              r({ works: false, rpd: m1 ? m1[1] : null, error: msg.substring(0, 100) });
            } else {
              r({ works: true });
            }
          } catch (e) { r({ works: false, error: e.message }); }
        });
      });
      req.on('error', e => r({ works: false, error: e.message }));
      req.setTimeout(30000, () => { req.destroy(); r({ works: false, error: 'timeout' }); });
      req.write(body);
      req.end();
    }));
  }
  return Promise.all(promises);
}

async function main() {
  console.log('=== Test 1: Basic connectivity ===');
  const basic = await testBasic();
  if (basic.works) {
    console.log('Key WORKS! Response:', basic.response);
  } else {
    console.log('Status:', basic.status);
    console.log('Error:', basic.error);
    if (basic.rpd) console.log('RPD limit mentioned:', basic.rpd);
  }

  console.log('\n=== Test 2: Rate limit test (25 rapid requests) ===');
  const results = await testRateLimit();
  const success = results.filter(r => r.works).length;
  const failed = results.filter(r => !r.works).length;
  const rpdValues = results.filter(r => r.rpd).map(r => r.rpd);
  const uniqueRpd = [...new Set(rpdValues)];
  console.log(`Success: ${success}/25 | Failed: ${failed}/25`);
  if (uniqueRpd.length > 0) console.log('RPD limit detected:', uniqueRpd.join(', '));
  
  if (success > 20) {
    console.log('\n>>> PAID TIER DETECTED — more than 20 requests succeeded!');
    console.log('>>> This key has billing enabled. We can use it for unlimited generation.');
  } else if (success <= 20 && success > 0) {
    console.log('\n>>> FREE TIER — limited to 20 RPD');
  } else {
    console.log('\n>>> Key exhausted or invalid');
    // Show one full error
    const fullError = results.find(r => !r.works && r.error);
    if (fullError) console.log('Full error:', fullError.error);
  }
}
main();
