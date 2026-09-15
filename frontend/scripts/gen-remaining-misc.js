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
  { id: 'C11_ChemistryThermodynamicsCBSESim', cls: 11, chapter: 'Thermodynamics', topics: 'First law, Enthalpy, Heat capacity, Cp/Cv, Hess law, Bond enthalpy, Entropy, Gibbs free energy, Spontaneity, Equilibrium constant' },
  { id: 'C12_ChemistryAldehydesKetonesandCarboxylicACBSESim', cls: 12, chapter: 'Aldehydes, Ketones and Carboxylic Acids', topics: 'Nomenclature, Carbonyl structure, Nucleophilic addition, HCN/NaHSO3 addition, Grignard, Aldol condensation, Cannizzaro reaction, Acidity of carboxylic acids, Esterification' },
  { id: 'C12_ChemistryAminesandDiazoniumSaltsCBSESim', cls: 12, chapter: 'Amines and Diazonium Salts', topics: 'Classification, Nomenclature, Preparation (reduction, ammonolysis, Gabriel synthesis, Hoffmann), Basicity, Carbylamine test, Diazotization, Coupling reactions, Sandmeyer/Gattermann' },
  { id: 'C12_ChemistryCoordinationCompoundsCBSESim', cls: 12, chapter: 'Coordination Compounds', topics: 'Werner theory, Ligands, Coordination number, IUPAC nomenclature, Isomerism, Crystal field theory, CFT in octahedral/tetrahedral, Spectrochemical series, Color' },
  { id: 'C12_ChemistryElectrochemistryCBSESim', cls: 12, chapter: 'Electrochemistry', topics: 'Nernst equation, Electrochemical cells, Standard potential, Gibbs energy, Equilibrium constant, Conductance, Kohlrausch law, Batteries, Corrosion, Electrolysis' },
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
  const existing = JSON.parse(fs.readFileSync(path.join(__dirname, 'cbse-chem-misconceptions.json'), 'utf8'));

  for (let i = 0; i < missing.length; i++) {
    const sim = missing[i];
    const key = KEYS[i % KEYS.length];
    const prompt = `You are an expert CBSE Chemistry teacher. Generate 5 common misconceptions that Class ${sim.cls} students have about "${sim.chapter}". Topics: ${sim.topics}. For EACH: id (misc_1..5), title (5-10 words), description (what students believe, 1-2 sentences), correction (correct concept, 2-3 sentences). Output as JSON array only.`;

    try {
      const response = await callGemini(prompt, key);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No JSON');
      const miscs = JSON.parse(jsonMatch[0]);
      existing[sim.id] = miscs;
      console.log(`${sim.id}: ${miscs.length} misconceptions`);
    } catch (e) {
      console.error(`${sim.id}: FAIL - ${e.message}`);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'cbse-chem-misconceptions.json'), JSON.stringify(existing, null, 2));
  console.log(`Saved. Total sims: ${Object.keys(existing).length}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
