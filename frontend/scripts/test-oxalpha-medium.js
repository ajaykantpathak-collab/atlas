// Test Ox Alpha with a medium-sized prompt (not tiny, not huge)
const https = require('https');

const API_KEY = process.env.OPENROUTER_API_KEY;

// Build a ~2000 token prompt to test
const prompt = `You are a React/TypeScript expert. Write a simple React component called TestComponent that:
1. Has a button that increments a counter
2. Shows the count
3. Uses framer-motion for animation
4. Is a 'use client' component

Output ONLY the code, no explanations.

Here is some reference context to include in your context window:
${'Lorem ipsum dolor sit amet. '.repeat(200)}

Now write the component:`;

const body = JSON.stringify({
  model: 'stealth/ox-alpha',
  models: ['stealth/ox-alpha', 'deepseek/deepseek-v4-flash'],
  provider: { sort: 'throughput', allow_fallbacks: true },
  messages: [{ role: 'user', content: prompt }],
  max_tokens: 2000,
  stream: false,
});

const options = {
  hostname: 'openrouter.ai',
  path: '/api/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log(`Prompt size: ${prompt.length} chars`);
console.log('Sending request...');
const startTime = Date.now();

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\nStatus: ${res.statusCode} (${elapsed}s)`);
    try {
      const parsed = JSON.parse(data);
      if (parsed.choices && parsed.choices[0]) {
        console.log('Model used:', parsed.model);
        console.log('Usage:', JSON.stringify(parsed.usage));
        console.log('\nResponse (first 500 chars):');
        console.log(parsed.choices[0].message.content.substring(0, 500));
      } else if (parsed.error) {
        console.log('Error:', JSON.stringify(parsed.error));
      }
    } catch (e) {
      console.log('Raw:', data.substring(0, 500));
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.setTimeout(120000);
req.write(body);
req.end();
