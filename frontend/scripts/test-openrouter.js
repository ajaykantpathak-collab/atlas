// Test OpenRouter API key with Ox Alpha
const https = require('https');

const API_KEY = process.env.OPENROUTER_API_KEY;
const body = JSON.stringify({
  model: 'stealth/ox-alpha',
  messages: [
    { role: 'user', content: 'Say "OpenRouter Ox Alpha test successful" and nothing else.' }
  ],
  max_tokens: 50,
  stream: false
});

const options = {
  hostname: 'openrouter.ai',
  path: '/api/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log('Testing OpenRouter with Ox Alpha...\n');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Rate limit headers:');
    console.log('  X-RateLimit-Limit:', res.headers['x-ratelimit-limit']);
    console.log('  X-RateLimit-Remaining:', res.headers['x-ratelimit-remaining']);
    console.log('  X-RateLimit-Reset:', res.headers['x-ratelimit-reset']);
    try {
      const parsed = JSON.parse(data);
      if (parsed.choices && parsed.choices[0]) {
        console.log('\nResponse:', parsed.choices[0].message.content);
        console.log('Model:', parsed.model);
        console.log('Usage:', JSON.stringify(parsed.usage));
      } else if (parsed.error) {
        console.log('\nError:', JSON.stringify(parsed.error));
      } else {
        console.log('\nRaw:', data.substring(0, 500));
      }
    } catch (e) {
      console.log('\nRaw:', data.substring(0, 500));
    }
  });
});

req.on('error', (e) => console.error('Request error:', e.message));
req.setTimeout(60000);
req.write(body);
req.end();
