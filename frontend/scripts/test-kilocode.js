// Quick test: does KiloCode gateway work with Nemotron 3 Ultra free (keyless)?
const https = require('https');

const body = JSON.stringify({
  model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
  messages: [
    { role: 'user', content: 'Say "KiloCode Nemotron test successful" and nothing else.' }
  ],
  max_tokens: 50,
  stream: false
});

const options = {
  hostname: 'api.kilo.ai',
  path: '/api/gateway/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log('Testing KiloCode gateway (keyless) with Nemotron 3 Ultra free...\n');

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', JSON.stringify(res.headers).substring(0, 300));
    try {
      const parsed = JSON.parse(data);
      if (parsed.choices && parsed.choices[0]) {
        console.log('Response:', parsed.choices[0].message.content);
        console.log('Model:', parsed.model || 'unknown');
        console.log('Usage:', JSON.stringify(parsed.usage || {}));
      } else if (parsed.error) {
        console.log('Error:', JSON.stringify(parsed.error));
      } else {
        console.log('Parsed (no choices):', JSON.stringify(parsed).substring(0, 500));
      }
    } catch (e) {
      console.log('Raw response (first 800 chars):', data.substring(0, 800));
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(body);
req.end();
