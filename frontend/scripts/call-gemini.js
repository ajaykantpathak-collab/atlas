// Gemini API caller with built-in keys — reads a prompt file, calls Gemini, saves response.
// Usage: node call-gemini.js <promptFile> <outputFile> [keyIndex]
//   keyIndex: 1 or 2 (default: 1). Uses built-in API keys.
const fs = require('fs');
const https = require('https');

const promptFile = process.argv[2];
const outputFile = process.argv[3];
const keyIndex = process.argv[4] || '1';

// Built-in API keys
const KEYS = {
  '1': 'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg',
  '2': 'AQ.Ab8RN6KNABGpFE0AN7Mgsu0wWlMTd94M-ZfNncE0W7Iz41TKdA',
};

const apiKey = KEYS[keyIndex] || KEYS['1'];

if (!promptFile || !outputFile) {
  console.error('Usage: node call-gemini.js <promptFile> <outputFile> [keyIndex: 1|2]');
  process.exit(1);
}

const prompt = fs.readFileSync(promptFile, 'utf8');
const model = 'gemini-flash-lite-latest';
const body = JSON.stringify({
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { maxOutputTokens: 65536, temperature: 0.7 },
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`API error ${res.statusCode}: ${data.substring(0, 500)}`);
      process.exit(1);
    }
    try {
      const json = JSON.parse(data);
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
      // Strip markdown code fences if present
      const cleaned = text.replace(/^```tsx?\n/, '').replace(/\n```$/, '');
      fs.writeFileSync(outputFile, cleaned);
      const lines = cleaned.split('\n').length;
      console.log(`OK: ${outputFile} (${lines} lines, ${cleaned.length} chars)`);
    } catch (e) {
      console.error('Parse error:', e.message);
      process.exit(1);
    }
  });
});

req.on('error', (e) => { console.error('Request error:', e.message); process.exit(1); });
req.write(body);
req.end();
