// Generate MISCONCEPTIONS for all 44 earlier chemistry sims using Gemini
const https = require('https');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, 'gemini-keys-chem.env'), 'utf8');
const KEYS = [];
for (const line of envContent.split('\n')) {
  const m = line.match(/^GEMINI_KEY_\d+=(.+)$/);
  if (m) KEYS.push(m[1].trim());
}

const sims = [
  { id: 'C6_ChemistryAtomicstructuresubatomicparticlesSim', cls: 6, chapter: 'Atomic Structure and Subatomic Particles', topics: 'Atoms, protons, neutrons, electrons, atomic models, Dalton theory' },
  { id: 'C6_ChemistryCarbondioxideandnitrogeninairSim', cls: 6, chapter: 'Carbon Dioxide and Nitrogen in Air', topics: 'Composition of air, CO2 cycle, nitrogen fixation, greenhouse effect' },
  { id: 'C6_ChemistryMatteranditscompositionSim', cls: 6, chapter: 'Matter and Its Composition', topics: 'States of matter, elements, compounds, mixtures, physical changes' },
  { id: 'C7_ChemistryAtomicstructureelectronsprotonsneutronsSim', cls: 7, chapter: 'Atomic Structure: Electrons, Protons, Neutrons', topics: 'Subatomic particles, atomic number, mass number, isotopes, electronic configuration' },
  { id: 'C7_ChemistryMatterclassificationrevisitedSim', cls: 7, chapter: 'Matter Classification Revisited', topics: 'Elements, compounds, mixtures, solutions, suspensions, colloids' },
  { id: 'C7_ChemistryWaterauniversalsolventSim', cls: 7, chapter: 'Water: A Universal Solvent', topics: 'Properties of water, solubility, hard/soft water, water pollution' },
  { id: 'C8_ChemistryChemicalequationsbalancingSim', cls: 8, chapter: 'Chemical Equations and Balancing', topics: 'Writing equations, law of conservation of mass, balancing methods' },
  { id: 'C8_ChemistryMatterstatesandinterconversionrevisitedSim', cls: 8, chapter: 'Matter States and Interconversion Revisited', topics: 'Solid, liquid, gas, melting, freezing, evaporation, condensation, sublimation' },
  { id: 'C8_ChemistryWaterpropertiesandcompositionSim', cls: 8, chapter: 'Water Properties and Composition', topics: 'Density, boiling point, freezing point, electrolysis of water, hydrogen and oxygen' },
  { id: 'C9_ChemistryAcidraincompositionandcausesSim', cls: 9, chapter: 'Acid Rain: Composition and Causes', topics: 'SO2, NOx, pH, environmental effects, fossil fuels, industrial emissions' },
  { id: 'C9_ChemistryCovalentbondingSim', cls: 9, chapter: 'Covalent Bonding', topics: 'Electron sharing, single/double/triple bonds, Lewis structures, polarity' },
  { id: 'C9_ChemistryEnergychangesinchemicalreactionsSim', cls: 9, chapter: 'Energy Changes in Chemical Reactions', topics: 'Exothermic, endothermic, activation energy, bond energy, enthalpy' },
  { id: 'C9_ChemistryLaboratorypreparationofhydrogenSim', cls: 9, chapter: 'Laboratory Preparation of Hydrogen', topics: 'Zn + HCl, collection methods, properties of hydrogen, safety' },
  { id: 'C9_ChemistrySoftwaterandhardwaterSim', cls: 9, chapter: 'Soft Water and Hard Water', topics: 'Temporary vs permanent hardness, ion exchange, soap, scum, scale' },
  { id: 'C9_ChemistrySymbolsofelementsSim', cls: 9, chapter: 'Symbols of Elements', topics: 'IUPAC symbols, derivation, periodic table, valency' },
  { id: 'C10_ChemistryAlkanesgeneralformulaandpreparationSim', cls: 10, chapter: 'Alkanes: General Formula and Preparation', topics: 'CnH2n+2, Wurtz reaction, decarboxylation, hydrogenation, combustion' },
  { id: 'C10_ChemistryAlloysandamalgamsSim', cls: 10, chapter: 'Alloys and Amalgams', topics: 'Brass, bronze, solder, amalgams, properties, uses, interstitial vs substitutional' },
  { id: 'C10_ChemistryClassificationofbasesSim', cls: 10, chapter: 'Classification of Bases', topics: 'Strong/weak bases, Arrhenius, Bronsted-Lowry, Lewis bases, pH' },
  { id: 'C10_ChemistryElectrolysisofspecificcompoundsSim', cls: 10, chapter: 'Electrolysis of Specific Compounds', topics: 'Electrolysis of water, NaCl, CuSO4, Faraday laws, electrodes' },
  { id: 'C10_ChemistryPeriodicpropertiesatomicsizeSim', cls: 10, chapter: 'Periodic Properties: Atomic Size', topics: 'Atomic radius, ionic radius, trends in periods and groups, effective nuclear charge' },
  { id: 'C10_ChemistryPolarandnonpolarcovalentcompoundsSim', cls: 10, chapter: 'Polar and Non-Polar Covalent Compounds', topics: 'Electronegativity, dipole moment, polar bonds, properties, solubility' },
  { id: 'C10_ChemistrySulphuricacidContactprocessSim', cls: 10, chapter: 'Sulphuric Acid: Contact Process', topics: 'SO2 to SO3, V2O5 catalyst, absorption, properties of H2SO4' },
  { id: 'C10_ChemistryVapourdensityandmolecularmassSim', cls: 10, chapter: 'Vapour Density and Molecular Mass', topics: 'Vapour density = molecular mass/2, Victor Meyer method, ideal gas law' },
  { id: 'C11_ChemistryAlkenespreparationandstructureSim', cls: 11, chapter: 'Alkenes: Preparation and Structure', topics: 'Dehydration of alcohols, dehydrohalogenation, sigma/pi bonds, sp2 hybridization' },
  { id: 'C11_ChemistryAufbauPauliandHundsrulesSim', cls: 11, chapter: 'Aufbau, Pauli and Hund Rules', topics: 'Electron filling order, Pauli exclusion, Hund rule, orbital diagrams' },
  { id: 'C11_ChemistryChemicalequilibriumdynamicnatureSim', cls: 11, chapter: 'Chemical Equilibrium: Dynamic Nature', topics: 'Le Chatelier principle, Kc, Kp, factors affecting equilibrium, reversible reactions' },
  { id: 'C11_ChemistryDiscoveryofsubatomicparticlesSim', cls: 11, chapter: 'Discovery of Subatomic Particles', topics: 'Cathode rays, canal rays, Thomson, Rutherford gold foil, Millikan oil drop' },
  { id: 'C11_ChemistryFriedelCraftsalkylationandacylationSim', cls: 11, chapter: 'Friedel-Crafts Alkylation and Acylation', topics: 'AlCl3 catalyst, electrophilic aromatic substitution, limitations, rearrangements' },
  { id: 'C11_ChemistryHydrogenbondingSim', cls: 11, chapter: 'Hydrogen Bonding', topics: 'Intermolecular H-bonds, intramolecular, effect on boiling point, ice structure, DNA' },
  { id: 'C11_ChemistryImportanceandscopeofchemistrySim', cls: 11, chapter: 'Importance and Scope of Chemistry', topics: 'Pharmaceuticals, materials, agriculture, environmental, nanotechnology' },
  { id: 'C11_ChemistryKosselLewisapproachtobondingSim', cls: 11, chapter: 'Kossel-Lewis Approach to Bonding', topics: 'Octet rule, Lewis dot structures, ionic vs covalent, formal charge' },
  { id: 'C11_ChemistryQuantitativeanalysisSim', cls: 11, chapter: 'Quantitative Analysis', topics: 'Gravimetric analysis, titration, percentage composition, stoichiometry' },
  { id: 'C11_ChemistrySolubilityproductSim', cls: 11, chapter: 'Solubility Product', topics: 'Ksp, common ion effect, selective precipitation, saturated solutions' },
  { id: 'C12_ChemistryAdsorptionisothermsSim', cls: 12, chapter: 'Adsorption Isotherms', topics: 'Freundlich, Langmuir, physisorption, chemisorption, applications' },
  { id: 'C12_ChemistryBatteriesandfuelcellsSim', cls: 12, chapter: 'Batteries and Fuel Cells', topics: 'Primary/secondary cells, lead-acid, Ni-Cd, H2-O2 fuel cell, efficiency' },
  { id: 'C12_ChemistryColourandmagneticpropertiesofcomplexesSim', cls: 12, chapter: 'Colour and Magnetic Properties of Complexes', topics: 'd-d transitions, crystal field splitting, paramagnetic, diamagnetic, CFSE' },
  { id: 'C12_ChemistryDiazoniumsaltsSim', cls: 12, chapter: 'Diazonium Salts', topics: 'Diazotization, Sandmeyer, Gattermann, coupling reactions, azo dyes' },
  { id: 'C12_ChemistryDrugtargetinteractionSim', cls: 12, chapter: 'Drug-Target Interaction', topics: 'Enzyme inhibition, receptor binding, antagonists, agonists, drug design' },
  { id: 'C12_ChemistryIdealandnonidealsolutionsSim', cls: 12, chapter: 'Ideal and Non-Ideal Solutions', topics: 'Raoult law, positive/negative deviations, azeotropes, partial miscibility' },
  { id: 'C12_ChemistryPhenolsSim', cls: 12, chapter: 'Phenols', topics: 'Acidity, Kolbe reaction, Reimer-Tiemann, electrophilic substitution, resonance' },
  { id: 'C12_ChemistrySolidstatecharacteristicsSim', cls: 12, chapter: 'Solid State Characteristics', topics: 'Crystal lattice, unit cell, FCC, BCC, HCP, defects, amorphous vs crystalline' },
  { id: 'C12_ChemistryTransitionmetalstrendsSim', cls: 12, chapter: 'Transition Metals Trends', topics: 'Variable oxidation states, ionization energy, atomic radii, catalytic properties' },
  { id: 'C12_ChemistryUsesofmetalsandalloysSim', cls: 12, chapter: 'Uses of Metals and Alloys', topics: 'Steel, brass, bronze, duralumin, solder, properties and applications' },
  { id: 'C12_ChemistryWilliamsonethersynthesisSim', cls: 12, chapter: 'Williamson Ether Synthesis', topics: 'SN2 mechanism, alkoxide + halide, stereochemistry, limitations' },
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
        } else { reject(new Error('API ' + res.statusCode + ': ' + data.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.setTimeout(90000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body); req.end();
  });
}

async function main() {
  const outFile = path.join(__dirname, 'cbse-chem44-misconceptions.json');
  let results = {};
  if (fs.existsSync(outFile)) {
    results = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  }

  const remaining = sims.filter(s => !results[s.id]);
  console.log(`Total sims: ${sims.length}, already done: ${Object.keys(results).length}, remaining: ${remaining.length}`);
  console.log(`Using ${KEYS.length} keys, 4 per wave\n`);

  for (let i = 0; i < remaining.length; i += 4) {
    const wave = remaining.slice(i, i + 4);
    console.log(`--- Wave ${Math.floor(i/4)+1} (${wave.length} sims) ---`);

    const promises = wave.map(async (sim, j) => {
      const key = KEYS[j % KEYS.length];
      const prompt = `You are an expert CBSE/ICSE Chemistry teacher. Generate 5 common misconceptions that Class ${sim.cls} students have about "${sim.chapter}". Topics: ${sim.topics}. For EACH: id (misc_1..5), title (5-10 words), description (what students believe, 1-2 sentences), correction (correct concept, 2-3 sentences). Output as JSON array only.`;
      try {
        const response = await callGemini(prompt, key);
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (!jsonMatch) throw new Error('No JSON');
        const miscs = JSON.parse(jsonMatch[0]);
        results[sim.id] = miscs;
        console.log(`  ${sim.id}: ${miscs.length} misconceptions`);
      } catch (e) {
        console.error(`  ${sim.id}: FAIL - ${e.message}`);
      }
    });

    await Promise.all(promises);
    // Save after each wave
    fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
    // 10s delay between waves
    if (i + 4 < remaining.length) {
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  console.log(`\nSaved to ${outFile}`);
  console.log(`Total sims with misconceptions: ${Object.keys(results).length}`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
