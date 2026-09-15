// Test concurrent limit — fire 3 lightweight calls simultaneously
const https = require('https');

const API_KEY = 'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe';
const MODEL = 'claude-opus-5';

function callApi(id) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const body = JSON.stringify({
      model: MODEL,
      max_tokens: 100,
      messages: [{ role: 'user', content: `Reply with exactly: WORKER_${id}_OK` }]
    });
    const req = https.request({
      hostname: 'api.opusmax.pro',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'anthropic-version': '2023-06-01'
      }
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        const elapsed = Date.now() - start;
        try {
          const p = JSON.parse(data);
          const text = p.content ? p.content[0].text : 'NO_CONTENT';
          resolve({ id, status: res.statusCode, elapsed, text, error: p.error });
        } catch (e) {
          resolve({ id, status: res.statusCode, elapsed, error: e.message, raw: data.substring(0, 200) });
        }
      });
    });
    req.on('error', (e) => resolve({ id, error: e.message }));
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('=== CONCURRENT LIMIT TEST ===');
  console.log('Firing 3 calls simultaneously...\n');

  const results = await Promise.all([
    callApi(1),
    callApi(2),
    callApi(3)
  ]);

  results.forEach(r => {
    if (r.error) {
      console.log(`Worker ${r.id}: FAILED - ${JSON.stringify(r.error)} (${r.elapsed}ms)`);
    } else {
      console.log(`Worker ${r.id}: HTTP ${r.status} - "${r.text}" (${r.elapsed}ms)`);
    }
  });

  const successCount = results.filter(r => !r.error && r.status === 200).length;
  console.log(`\nResult: ${successCount}/3 succeeded concurrently`);

  if (successCount === 3) {
    console.log('=> 3 concurrent works. Testing 5 next...');
    const results5 = await Promise.all([1,2,3,4,5].map(i => callApi(i)));
    const success5 = results5.filter(r => !r.error && r.status === 200).length;
    results5.forEach(r => {
      if (r.error) console.log(`Worker ${r.id}: FAILED - ${JSON.stringify(r.error)} (${r.elapsed}ms)`);
      else console.log(`Worker ${r.id}: HTTP ${r.status} - "${r.text}" (${r.elapsed}ms)`);
    });
    console.log(`\nResult: ${success5}/5 succeeded concurrently`);

    if (success5 === 5) {
      console.log('=> 5 concurrent works. Testing 10 next...');
      const results10 = await Promise.all([1,2,3,4,5,6,7,8,9,10].map(i => callApi(i)));
      const success10 = results10.filter(r => !r.error && r.status === 200).length;
      results10.forEach(r => {
        if (r.error) console.log(`Worker ${r.id}: FAILED - ${JSON.stringify(r.error)} (${r.elapsed}ms)`);
        else console.log(`Worker ${r.id}: HTTP ${r.status} - "${r.text}" (${r.elapsed}ms)`);
      });
      console.log(`\nResult: ${success10}/10 succeeded concurrently`);
      console.log(`\n=== RECOMMENDATION ===`);
      if (success10 === 10) console.log('Fire 10 workers — 1 template each');
      else if (success10 >= 7) console.log(`Fire ${success10} workers — 1 template each`);
      else console.log('Stick with 5 workers');
    }
  }
}

main().catch(console.error);
