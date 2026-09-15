const https = require('https');
const fs = require('fs');
const path = require('path');
const opus = require('./opus-c6-12-pipeline.js');
const { buildPrompt, PLAN } = opus;

const keys = [
  'sk-ant-opm-fHBMbyeWx8oBoWZj_iGi3zLbJ9bEVfpe',
  'sk-ant-opm-qH49u7v5dZynlQC9oCWKU495ePdy_Xfd',
];

const OUTPUT_DIR = path.join(__dirname, '..', 'components', 'simulations', 'c6_12');
const existing = new Set(fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.tsx')).map(f => f.replace(/\.tsx$/, '')));
const missing = PLAN.filter(t => !existing.has(t.id));
const template = missing[0];

console.log('Template:', template.id);
const prompt = buildPrompt(template);
console.log('Prompt size:', (prompt.length / 1024).toFixed(0), 'KB\n');

keys.forEach((key, i) => {
  const body = JSON.stringify({
    model: 'claude-opus-4-6',
    max_tokens: 32000,
    thinking: { type: 'enabled', budget_tokens: 10000 },
    messages: [{ role: 'user', content: prompt }],
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
    res.on('data', (c) => data += c);
    res.on('end', () => {
      const elapsed = Math.round((Date.now() - start) / 1000);
      console.log(`Key ${i + 1}: Status ${res.statusCode} | ${elapsed}s | ${data.length} chars`);
      console.log(`  Response: ${data.substring(0, 300)}`);
      console.log();
    });
  });
  req.on('error', (e) => console.log(`Key ${i + 1}: Error ${e.message}`));
  req.setTimeout(600000, () => { req.destroy(); console.log(`Key ${i + 1}: Timeout`); });
  req.write(body);
  req.end();
});
