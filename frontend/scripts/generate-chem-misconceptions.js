// Generate MISCONCEPTIONS data for CBSE chemistry sims using Gemini
// Outputs a JSON file with misconceptions per sim

const https = require('https');
const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, 'gemini-keys-chem.env');
const envContent = fs.readFileSync(envFile, 'utf8');
const KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) KEYS.push(m[1].trim());
}

const MODEL = 'gemini-3.6-flash';
const MAX_TOKENS = 16384;

const sims = [
  { id: 'C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim', chapter: 'Organic Chemistry – Some Basic Principles and Techniques (Part 1)', topics: 'Tetravalence of Carbon, Hybridization, Structural Representations, IUPAC Nomenclature, Functional Groups, Homologous Series, Resonance Effect, Electromeric Effect, Purification techniques (sublimation, crystallization, distillation, chromatography)' },
  { id: 'C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim', chapter: 'Organic Chemistry: Some Basic Principles and Techniques – Part 2', topics: 'Detection of N/S/X/P, Lassaigne test, Quantitative analysis (C,H,N,halogens), Molecular mass, Empirical and Molecular formula, Inductive effect, Resonance, Electromeric effect, Hyperconjugation' },
  { id: 'C11_ChemistryRedoxReactionsCBSESim', chapter: 'Redox Reactions', topics: 'Oxidation states, Balancing redox equations, Electrochemical cells, Standard electrode potential, Daniell cell, Displacement reactions, Oxidizing and reducing agents' },
  { id: 'C11_ChemistrySomeBasicConceptsofChemistryCBSESim', chapter: 'Some Basic Concepts of Chemistry', topics: 'Mole concept, Molarity, Molality, Mole fraction, Stoichiometry, Limiting reagent, Empirical formula, Concentration units' },
  { id: 'C11_ChemistryThermodynamicsCBSESim', chapter: 'Thermodynamics', topics: 'First law, Enthalpy, Heat capacity, Cp/Cv, Hess law, Bond enthalpy, Entropy, Gibbs free energy, Spontaneity, Equilibrium constant' },
  { id: 'C12_ChemistryAldehydesKetonesandCarboxylicACBSESim', chapter: 'Aldehydes, Ketones and Carboxylic Acids', topics: 'Nomenclature, Carbonyl structure, Nucleophilic addition, HCN/NaHSO3 addition, Grignard, Aldol condensation, Cannizzaro reaction, Acidity of carboxylic acids, Esterification' },
  { id: 'C12_ChemistryAminesandDiazoniumSaltsCBSESim', chapter: 'Amines and Diazonium Salts', topics: 'Classification, Nomenclature, Preparation (reduction, ammonolysis, Gabriel synthesis, Hoffmann), Basicity, Carbylamine test, Diazotization, Coupling reactions, Sandmeyer/Gattermann' },
  { id: 'C12_ChemistryBiomoleculesCBSESim', chapter: 'Biomolecules', topics: 'Carbohydrates, Monosaccharides, Disaccharides, Polysaccharides, Proteins, Amino acids, Peptide bonds, Denaturation, Enzymes, Vitamins, Nucleic acids, DNA/RNA' },
  { id: 'C12_ChemistryCoordinationCompoundsCBSESim', chapter: 'Coordination Compounds', topics: 'Werner theory, Ligands, Coordination number, IUPAC nomenclature, Isomerism, Crystal field theory, CFT in octahedral/tetrahedral, Spectrochemical series, Color' },
  { id: 'C12_ChemistryElectrochemistryCBSESim', chapter: 'Electrochemistry', topics: 'Nernst equation, Electrochemical cells, Standard potential, Gibbs energy, Equilibrium constant, Conductance, Kohlrausch law, Batteries, Corrosion, Electrolysis' },
  { id: 'C12_ChemistryHaloalkanesandHaloarenesCBSESim', chapter: 'Haloalkanes and Haloarenes', topics: 'Nomenclature, SN1/SN2 mechanisms, Reactivity, Stereochemistry, Elimination reactions, Saytzeff rule, Reactions of aryl halides, Friedel-Crafts, Environmental effects' },
  { id: 'C12_ChemistrySolutionsCBSESim', chapter: 'Solutions', topics: 'Types of solutions, Solubility, Henry law, Raoult law, Ideal/non-ideal solutions, Azeotropes, Colligative properties, Relative lowering of VP, Elevation in BP, Depression in FP, Osmosis, Van\'t Hoff factor' },
];

function buildPrompt(sim) {
  return `You are an expert CBSE Chemistry teacher. Generate 5 common misconceptions that Class ${sim.id.includes('C11') ? '11' : '12'} students have about "${sim.chapter}".

Topics covered: ${sim.topics}

For EACH misconception, provide:
1. id: A unique identifier (misc_1, misc_2, etc.)
2. title: A short descriptive title (5-10 words)
3. description: What students incorrectly believe (1-2 sentences)
4. correction: The correct concept with explanation (2-3 sentences, specific and accurate)

These should be REAL misconceptions that CBSE students commonly make in board exams, not generic ones.

Output as valid JSON array:
[
  {
    "id": "misc_1",
    "title": "...",
    "description": "...",
    "correction": "..."
  },
  ...
]

Generate exactly 5 misconceptions. Output ONLY the JSON array, no other text.`;
}

function callGemini(prompt, key) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: MAX_TOKENS },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    });
    const apiPath = `/v1beta/models/${MODEL}:generateContent?key=${key}`;
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
            if (!text) { reject(new Error('No text in response')); return; }
            resolve(text);
          } catch (e) { reject(new Error(`Parse error: ${e.message}`)); }
        } else { reject(new Error(`API ${res.statusCode}: ${data.substring(0, 200)}`)); }
      });
    });
    req.on('error', (e) => reject(new Error(`Network: ${e.message}`)));
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body); req.end();
  });
}

async function main() {
  console.log(`Generating misconceptions for ${sims.length} sims using ${KEYS.length} keys\n`);

  const results = {};

  // Process all sims in parallel (4 keys, 12 sims = 3 waves)
  for (let i = 0; i < sims.length; i += KEYS.length) {
    const wave = sims.slice(i, i + KEYS.length);
    console.log(`--- Wave ${Math.floor(i/KEYS.length)+1} (${wave.length} sims) ---`);

    const promises = wave.map(async (sim, j) => {
      const key = KEYS[j % KEYS.length];
      try {
        const response = await callGemini(buildPrompt(sim), key);
        // Extract JSON from response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (!jsonMatch) { throw new Error('No JSON array in response'); }
        const misconceptions = JSON.parse(jsonMatch[0]);
        results[sim.id] = misconceptions;
        console.log(`  ${sim.id}: ${misconceptions.length} misconceptions generated`);
        return { id: sim.id, success: true, count: misconceptions.length };
      } catch (e) {
        console.error(`  ${sim.id}: FAIL - ${e.message}`);
        return { id: sim.id, success: false, error: e.message };
      }
    });

    await Promise.all(promises);
  }

  // Save results
  const outFile = path.join(__dirname, 'cbse-chem-misconceptions.json');
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`\nSaved to ${outFile}`);
  console.log(`Total sims: ${Object.keys(results).length}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
