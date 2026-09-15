const https = require('https');
const fs = require('fs');
const path = require('path');
const envContent = fs.readFileSync(path.join(__dirname, 'gemini-keys-chem.env'), 'utf8');
const KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) KEYS.push(m[1].trim());
}
const missing = [
  { id: 'C11_ChemistryAufbauPauliandHundsrulesSim', cls: 11, chapter: 'Aufbau, Pauli and Hund Rules', topics: 'Electron filling order, Pauli exclusion, Hund rule, orbital diagrams' },
  { id: 'C11_ChemistryHydrogenbondingSim', cls: 11, chapter: 'Hydrogen Bonding', topics: 'Intermolecular H-bonds, intramolecular, effect on boiling point, ice structure, DNA' },
];
function callGemini(prompt, key) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 16384 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    });
    const apiPath = `/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`;
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: apiPath, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) { reject(new Error('No text')); return; }
            resolve(text);
          } catch (e) { reject(e); }
        } else { reject(new Error('API ' + res.statusCode)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(90000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body); req.end();
  });
}
async function main() {
  const outFile = path.join(__dirname, 'cbse-chem44-misconceptions.json');
  let results = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  for (let i = 0; i < missing.length; i++) {
    const sim = missing[i];
    const key = KEYS[i % KEYS.length];
    const prompt = `You are an expert CBSE Chemistry teacher. Generate 5 common misconceptions that Class ${sim.cls} students have about "${sim.chapter}". Topics: ${sim.topics}. For EACH: id (misc_1..5), title (5-10 words), description (what students believe, 1-2 sentences), correction (correct concept, 2-3 sentences). Output as JSON array only. Use plain ASCII only, no unicode escapes.`;
    try {
      const response = await callGemini(prompt, key);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No JSON');
      const miscs = JSON.parse(jsonMatch[0]);
      results[sim.id] = miscs;
      console.log(`${sim.id}: ${miscs.length} misconceptions`);
    } catch (e) {
      console.error(`${sim.id}: FAIL - ${e.message}`);
    }
  }
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`Saved. Total: ${Object.keys(results).length}`);
}
main().catch(e => { console.error('FATAL:', e); process.exit(1); });
