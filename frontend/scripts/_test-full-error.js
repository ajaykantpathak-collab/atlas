const https = require('https');
const key = 'AQ.Ab8RN6LDccrCPDvyQ4nFydMGXEz0XYJexA1VBgyA1AKvmnUEwg';

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
    console.log('Status:', res.statusCode);
    try {
      const j = JSON.parse(d);
      console.log(JSON.stringify(j, null, 2));
    } catch (e) {
      console.log('Raw:', d);
    }
  });
});
req.on('error', e => console.log('Error:', e.message));
req.write(body);
req.end();
