import type { SimDef } from '../../engine/types';
import C12_BiologyMicrobesIndustrialProductsSim from '../../../simulations/c6_12/C12_BiologyMicrobesIndustrialProductsSim';

/** v3 wrapped master — C12_BiologyMicrobesIndustrialProductsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologymicrobesindustrialproductssim: SimDef = {
    id: 'v3w_c12_biologymicrobesindustrialproductssim',
    title: 'Microbes in Household Products: Curd, Cheese, Bread',
    subtitle: 'Covers only household-scale microbial products: curd (dahi), cheese (major varieties),.',
    classLevel: 12, subject: 'biology', topic: 'Microbes in Household Products: Curd, Cheese, Bread',
    chapters: [],
    nodeIds: ['c12_bio_cbse_10_001', 'c12_bio_cbse_10_002', 'c12_bio_cbse_10_003', 'c12_bio_cbse_10_007', 'c12_bio_cbse_10_004', 'c12_bio_cbse_10_006', 'c12_bio_cbse_10_005', 'c12_bio_cbse_10_008', 'c12_bio_cbse_11_001', 'c12_bio_cbse_11_008', 'c12_bio_cbse_09_005', 'c12_bio_cbse_09_008', 'c12_bio_cbse_12_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Think about the last time you saw your mother set curd overnight — a spoonful of yesterday\'s curd mixed into.', goal: 'Master Microbes in Household Products: Curd, Cheese, Bread.' },
    discovery: {
        question: 'A winemaker observes that fermentation stops at 12% ABV (alcohol by volume) even though residual sugar remains.',
        options: ['Ethanol denatures yeast membrane proteins and inhibits glycolytic enzymes', 'add more yeast', 'add more sugar'],
        answer: 'Ethanol denatures yeast membrane proteins and inhibits glycolytic enzymes',
        hook: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising.',
    },
    teaching: [
        { title: 'Microbes in household products refer to the.', text: 'Microbes in household products refer to the beneficial microorganisms (bacteria, fungi, yeast) intentionally used in everyday food preparation to transform raw substrates into nutritionally enhanced,.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_001', title: 'Microbes in household products refer to.',
          scaffold: { problem: 'A homemaker adds 1 tsp (5 mL) of active curd starter (containing ~10⁸ CFU/mL *Lactobacillus*) to 500 mL lukewarm milk (35°C, pH 6.6, 4.8%.',
            steps: [
            { text: 'Identify initial inoculum: 5 mL × 10⁸ CFU/mL = 5 × 10⁸ CFU total.' },
            { text: 'Calculate number of generations in 4 hours: 4 hr = 240 min; generation time = 30 min → 240/30 = 8 generations.' },
            { text: 'Apply exponential growth: N = N₀ × 2ⁿ = 5×10⁸ × 2⁸ = 5×10⁸ × 256 = 1.28 × 10¹¹ CFU total.' },
            { text: 'Convert to CFU/mL: 1.28×10¹¹ CFU / 500 mL ≈ 2.6 × 10⁸ CFU/mL.' },
            { text: 'Interpret: Typical coagulation threshold is 10⁷–10⁸ CFU/mL with pH ≤ 4.6. At 2.6×10⁸ CFU/mL, population is sufficient.', faded: true, blankAnswer: 'After 4 hours, ~2.6 × 10⁸ CFU/mL; yes, sufficient for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_002', title: 'Antibiotics are chemical substances.',
          scaffold: { problem: 'A pharmaceutical company produces penicillin G using *Penicillium chrysogenum* in a 100,000 L fed-batch fermenter.',
            steps: [
            { text: 'Check precursor (phenylacetic acid) feeding rate — penicillin G side chain derives from PAA; insufficient PAA limits.' },
            { text: 'Verify dissolved oxygen (DO) > 20% saturation — β-lactam ring formation requires molecular oxygen; low DO stalls.' },
            { text: 'Confirm phosphate limitation — high phosphate represses penicillin biosynthetic genes (carbon catabolite repression);.' },
            { text: 'Analyze morphology — filamentous fungi need dispersed mycelia (not pellets) for high oxygen transfer; adjust agitator.' },
            { text: 'Test for contamination — bacterial contamination consumes precursors and produces β-lactamase that degrades penicillin.', faded: true, blankAnswer: 'Optimize PAA feed to maintain 0.5-1 g/L residual, increase.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_003', title: 'Microbes in beverage production refers.',
          scaffold: { problem: 'A winemaker ferments 1000 L of grape must containing 220 g/L glucose.',
            steps: [
            { text: 'Calculate total glucose available = 1000 L × 220 g/L = 220,000 g glucose.' },
            { text: 'Account for 90% efficiency → glucose fermented = 0.90 × 220,000 g = 198,000 g.' },
            { text: 'Convert to moles: 198,000 g / 180 g/mol = 1100 mol glucose.' },
            { text: 'Stoichiometry: 1 mol glucose → 2 mol ethanol + 2 mol CO₂. So ethanol = 2200 mol; CO₂ = 2200 mol.' },
            { text: 'Ethanol mass = 2200 mol × 46 g/mol = 101,200 g. Volume = mass/density = 101,200 g / 0.789 g/mL = 128,264 mL = 128.3 L.' },
            { text: '% v/v ethanol = (128.3 L / 1000 L) × 100 = 12.83% ABV.' },
            { text: 'CO₂ volume at STP = 2200 mol × 22.4 L/mol = 49,280 L.', faded: true, blankAnswer: 'Expected ethanol ≈ 12.8% v/v; total CO₂ ≈ 49,300 L at STP.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_007', title: 'Biofertilizers are microorganisms.',
          scaffold: { problem: 'A farmer in Maharashtra grows soybean (legume) and wheat (cereal) in rotation.',
            steps: [
            { text: 'Identify that soybean forms symbiosis with *Rhizobium* — atmospheric N₂ fixed in nodules.' },
            { text: 'Recall typical fixation rates: soybean fixes 50–200 kg N/ha/season; assume 100 kg N/ha fixed.' },
            { text: 'Of fixed N, ~60% goes to grain (harvested), ~40% remains in roots/nodules/stubble (residue).' },
            { text: 'Residue N mineralizes after harvest: 40 kg N/ha enters soil organic pool.' },
            { text: 'Wheat gets 50 kg N/ha urea but loses 30–50% via leaching/volatilization/denitrification; net soil gain ~20–25 kg N/ha.' },
            { text: 'Compare: soybean plot gains ~40 kg N/ha from residue; wheat plot gains ~20 kg N/ha from fertilizer residue → difference.', faded: true, blankAnswer: 'Soybean fixes ~100 kg N/ha from air; 40 kg N/ha remains in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_004', title: 'Sewage treatment is the process of.',
          scaffold: { problem: 'A sewage treatment plant receives wastewater with BOD 300 mg/L. After primary treatment, BOD reduces to 200 mg/L.',
            steps: [
            { text: 'Identify initial BOD (300 mg/L), BOD after primary (200 mg/L), BOD after secondary (20 mg/L).' },
            { text: 'Calculate primary removal: (300-200)/300 × 100 = 33.3%.' },
            { text: 'Calculate secondary removal: (200-20)/200 × 100 = 90%.' },
            { text: 'Calculate overall removal: (300-20)/300 × 100 = 93.3%.' },
            { text: 'Interpret: Primary treatment removes settleable solids (33% BOD), secondary treatment removes dissolved organic matter.', faded: true, blankAnswer: 'Primary: 33.3%, Secondary: 90%, Overall: 93.3%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_10_006', title: 'Microbes as biocontrol agents are.',
          scaffold: { problem: 'A cotton farmer in Maharashtra observes bollworm (Helicoverpa armigera) infestation.',
            steps: [
            { text: 'Identify the pest — Helicoverpa armigera is a lepidopteran larva, known to be susceptible to Bt Cry1Ac toxin.' },
            { text: 'Recall Bt mode of action — Cry1Ac protoxin is activated in alkaline midgut (pH ~10) of lepidopterans, binds to specific.' },
            { text: 'Recall cypermethrin mode of action — synthetic pyrethroid, neurotoxin that keeps sodium channels open → hyperexcitation.' },
            { text: 'Compare ecological impact — Bt is host-specific (minimal non-target effects), degrades in sunlight (short persistence),.' },
            { text: 'Consider integrated pest management (IPM) — Bt fits IPM (can be rotated with other modes of action, preserves.' },
            { text: 'Conclude — For sustainable management, Bt spray is preferred if applied at correct larval stage and coverage; chemical.', faded: true, blankAnswer: 'Bt formulation is the better first choice for sustainable.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Microbes in Household Products: Curd, Cheese, Bread', spots: [
            { id: 's1', label: 'Microbes in household products refer', prompt: 'Which idea is this? — Microbes in household products refer to the beneficial microorganisms (bacteria, fungi,.', answer: 'Microbes in household products refer', options: ['Microbes in household products refer', 'Antibiotics are chemical substances produced', 'Microbes in beverage production refers', 'Biofertilizers are microorganisms bacteria cyanobacteria'] },
            { id: 's2', label: 'Antibiotics are chemical substances produced', prompt: 'Which idea is this? — Antibiotics are chemical substances produced by microorganisms (bacteria, fungi,.', answer: 'Antibiotics are chemical substances produced', options: ['Antibiotics are chemical substances produced', 'Microbes in household products refer', 'Microbes in beverage production refers', 'Biofertilizers are microorganisms bacteria cyanobacteria'] },
            { id: 's3', label: 'Microbes in beverage production refers', prompt: 'Which idea is this? — Microbes in beverage production refers to the controlled use of specific microorganisms,.', answer: 'Microbes in beverage production refers', options: ['Microbes in beverage production refers', 'Microbes in household products refer', 'Antibiotics are chemical substances produced', 'Biofertilizers are microorganisms bacteria cyanobacteria'] },
            { id: 's4', label: 'Biofertilizers are microorganisms bacteria cyanobacteria', prompt: 'Which idea is this? — Biofertilizers are microorganisms (bacteria, cyanobacteria, fungi) that enhance soil.', answer: 'Biofertilizers are microorganisms bacteria cyanobacteria', options: ['Biofertilizers are microorganisms bacteria cyanobacteria', 'Microbes in household products refer', 'Antibiotics are chemical substances produced', 'Microbes in beverage production refers'] },
            { id: 's5', label: 'Sewage treatment is the process', prompt: 'Which idea is this? — Sewage treatment is the process of removing contaminants from wastewater using physical,.', answer: 'Sewage treatment is the process', options: ['Sewage treatment is the process', 'Microbes in household products refer', 'Antibiotics are chemical substances produced', 'Microbes in beverage production refers'] },
            { id: 's6', label: 'Microbes as biocontrol agents are', prompt: 'Which idea is this? — Microbes as biocontrol agents are microorganisms (bacteria, fungi, viruses, protozoa).', answer: 'Microbes as biocontrol agents are', options: ['Microbes as biocontrol agents are', 'Microbes in household products refer', 'Antibiotics are chemical substances produced', 'Microbes in beverage production refers'] }
          ] } }
    ],
    explore: { component: C12_BiologyMicrobesIndustrialProductsSim, prompt: 'Explore the interactive — Microbes in Household Products: Curd, Cheese, Bread' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_001', difficulty: 'standard',
          question: 'Microbes in household products refer to the beneficial microorganisms.',
          hint: 'If stuck, revisit **c11_bio_cbse_12_003** (Fermentation) and **c11_bio_cbse_12_002**.',
          misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Name the genus of bacteria primarily responsible for converting milk into curd and state the key metabolic product that causes milk coagulation.', answer: '**Correct answer:** *Lactobacillus* (lactic acid bacteria)',
                  options: ['**Correct answer:** *Lactobacillus* (lactic acid bacteria)', 'alcohol'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is a.' },
                { id: 'b', prompt: 'A student sets curd at 15°C and another at 35°C using identical starter and milk.', answer: '**Correct answer:** *Lactobacillus* is mesophilic (optimum 30–40°C)',
                  options: ['**Correct answer:** *Lactobacillus* is mesophilic (optimum 30–40°C)', 'bacteria die at 15°C'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is a.' },
                { id: 'c', prompt: 'Compare the microbial basis of hole formation in Swiss cheese versus the blue veins in Roquefort cheese.', answer: '**Correct answer:** - **Swiss cheese:** *Propionibacterium freudenreichii* subsp',
                  options: ['**Correct answer:** - **Swiss cheese:** *Propionibacterium freudenreichii* subsp', 'gas from bacteria'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is a.' }
          ],
            remediations: { 'misconception-yeast-respires-aerobically-in': { steps: ['** Revisit **c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration)** — focus on the biochemical pathway: glucose →.', '** Revisit **c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking, Fermentation)** — recall the Class 8 observation.', '** Do the **lime water test** (Diagnostic Q6) physically. Seeing the milky precipitate converts abstract "CO₂" into.', '** Re-attempt Diagnostic Q3 and Q5 — they directly test the anaerobic fermentation concept.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Adding more yeast to bread dough will always make the bread rise faster and higher." Identify two biological constraints that limit this.', answer: '**Correct answer:** The claim is **false**',
                  options: ['**Correct answer:** The claim is **false**', 'yeast dies at high temperature'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Yeast respires aerobically in bread dough, using oxygen from air to produce CO₂." **Why it\'s wrong:** Bread dough is a.' }
          ],
            remediations: { 'misconception-yeast-respires-aerobically-in': { steps: ['** Revisit **c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration)** — focus on the biochemical pathway: glucose →.', '** Revisit **c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking, Fermentation)** — recall the Class 8 observation.', '** Do the **lime water test** (Diagnostic Q6) physically. Seeing the milky precipitate converts abstract "CO₂" into.', '** Re-attempt Diagnostic Q3 and Q5 — they directly test the anaerobic fermentation concept.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_002', difficulty: 'standard',
          question: 'Antibiotics are chemical substances produced by microorganisms (bacteria,.',
          hint: 'Review Class 11 node c11_bio_cbse_10_001 (Cell Cycle) for growth phases, and.',
          misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons.',
          parts: [
                { id: 'a', prompt: 'Name the fungus that produces penicillin and the bacterial genus that produces streptomycin. State one medical use for each.', answer: 'Penicillin is produced by *Penicillium notatum* (now *P',
                  options: ['Penicillin is produced by *Penicillium notatum* (now *P', 'to help humans'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons for ecological.' },
                { id: 'b', prompt: 'Why are antibiotics like penicillin called secondary metabolites, and how does this affect the timing of harvest in industrial fermentation?', answer: 'Secondary metabolites are not essential for growth',
                  options: ['Secondary metabolites are not essential for growth', 'to help humans'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons for ecological.' }
          ],
            remediations: { 'antibiotics-are-produced-by-microbes': { steps: ['Revisit Class 11 node c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) to recall enzyme classification and.', 'Watch a 5-min video of penicillin fermentation showing growth curve and idiophase.', 'Draw a timeline: lag → log → stationary → death; mark primary vs secondary metabolite production.', 'Re-attempt Diagnostic Questions 2 and 3.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Industrial enzymes like streptokinase are produced by pathogenic bacteria, so the final product is unsafe for human injection.".', answer: 'The statement is false',
                  options: ['The statement is false', 'to help humans'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons for ecological.' },
                { id: 'b', prompt: 'Design a simple lab-scale experiment to test whether a soil isolate produces an antibiotic effective against *Staphylococcus aureus*.', answer: 'Streak isolate on agar perpendicular to a lawn of *S',
                  options: ['Streak isolate on agar perpendicular to a lawn of *S', 'to help humans'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think antibiotics are produced by microbes "to help humans" — they forget antibiotics are microbial weapons for ecological.' }
          ],
            remediations: { 'antibiotics-are-produced-by-microbes': { steps: ['Revisit Class 11 node c11_bio_cbse_09_005 (Enzymes: Nature and Mechanism) to recall enzyme classification and.', 'Watch a 5-min video of penicillin fermentation showing growth curve and idiophase.', 'Draw a timeline: lag → log → stationary → death; mark primary vs secondary metabolite production.', 'Re-attempt Diagnostic Questions 2 and 3.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_003', difficulty: 'standard',
          question: 'Microbes in beverage production refers to the controlled use of specific.',
          hint: 'If unclear on NAD⁺ role, revisit c11_bio_cbse_12_003 Step 3–4: "NADH from glycolysis must.',
          misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising.',
          parts: [
                { id: 'a', prompt: 'A winemaker observes that fermentation stops at 12% ABV (alcohol by volume) even though residual sugar remains.', answer: 'Ethanol denatures yeast membrane proteins and inhibits glycolytic enzymes',
                  options: ['Ethanol denatures yeast membrane proteins and inhibits glycolytic enzymes', 'add more yeast', 'add more sugar'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising metabolism.' },
                { id: 'b', prompt: 'Compare and contrast the carbon source, primary microbe, and the necessity of distillation in the production of wine, beer, and whisky.', answer: 'Wine: grape juice (glucose/fructose), *S',
                  options: ['Wine: grape juice (glucose/fructose), *S', 'beer uses grapes', 'whisky doesn\'t need distillation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising metabolism.' }
          ],
            remediations: { 'yeast-produces-alcohol-as-a': { steps: ['Revisit c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration) — redraw the glycolysis → pyruvate → acetaldehyde →.', 'Perform the "balloon on bottle" demo (Diagnostic Q6) with two conditions: one with glucose, one with starch — observe.', 'Re-attempt Diagnostic Q2 and Q3; if still stuck, review c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking,.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the carbon source, primary microbe, and the necessity of distillation in the production of wine, beer, and whisky.', answer: 'Wine: grape juice (glucose/fructose), *S',
                  options: ['Wine: grape juice (glucose/fructose), *S', 'beer uses grapes', 'whisky doesn\'t need distillation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "yeast produces alcohol as a waste product it wants to get rid of" — anthropomorphising metabolism.' }
          ],
            remediations: { 'yeast-produces-alcohol-as-a': { steps: ['Revisit c11_bio_cbse_12_003 (Fermentation: Anaerobic Respiration) — redraw the glycolysis → pyruvate → acetaldehyde →.', 'Perform the "balloon on bottle" demo (Diagnostic Q6) with two conditions: one with glucose, one with starch — observe.', 'Re-attempt Diagnostic Q2 and Q3; if still stuck, review c8_bio_ch1_11 (Microorganisms in Food: Yeast in Baking,.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_007', difficulty: 'standard',
          question: 'Biofertilizers are microorganisms (bacteria, cyanobacteria, fungi) that enhance.',
          hint: 'Review c11_bio_cbse_05_005 (root nodule structure) and c9_bio_ch4_1 (nitrogen cycle) —.',
          misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.',
          parts: [
                { id: 'a', prompt: 'A farmer inoculates soybean seeds with *Rhizobium japonicum* but gets poor nodulation. The soil pH is 5.2 and he applied 100 kg/ha urea at sowing.', answer: '(1) Low pH (5.2) inhibits *Rhizobium* survival and nod gene expression',
                  options: ['(1) Low pH (5.2) inhibits *Rhizobium* survival and nod gene expression', 'poor quality inoculant', 'nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.' }
          ],
            remediations: { 'nitrogen-fixation-conversion-of-n': { steps: ['Revisit Class 11 nitrogen metabolism (c11_bio_cbse_13_003) — specifically the GS-GOGAT cycle and nitrogen assimilation.', 'Draw the nodule cross-section labeling infection thread, bacteroids, leghemoglobin, vascular bundle — label O₂.', 'Write the balanced equation: N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂ + 16ADP + 16Pi.', 'Re-attempt Diagnostic Q1 and Q4. If still stuck, watch the NCERT video on "Root Nodule Formation" and note the.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Blue-green algae (BGA) like *Nostoc* and *Anabaena* are ideal biofertilizers for all Indian crops because they fix nitrogen and add.', answer: 'Flaw: BGA require standing water for growth and dispersal',
                  options: ['Flaw: BGA require standing water for growth and dispersal', 'nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.' },
                { id: 'b', prompt: 'Design a simple low-cost experiment for a Class 12 student to demonstrate that *Rhizobium* inoculation increases nitrogen content in legume plants compared to.', answer: 'Grow soybean in sterilized sand culture (N-free nutrient solution) in pots: (1)',
                  options: ['Grow soybean in sterilized sand culture (N-free nutrient solution) in pots: (1)', 'nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "nitrogen fixation = conversion of N₂ to nitrate (NO₃⁻)" and write the overall reaction as N₂ → NO₃⁻.' }
          ],
            remediations: { 'nitrogen-fixation-conversion-of-n': { steps: ['Revisit Class 11 nitrogen metabolism (c11_bio_cbse_13_003) — specifically the GS-GOGAT cycle and nitrogen assimilation.', 'Draw the nodule cross-section labeling infection thread, bacteroids, leghemoglobin, vascular bundle — label O₂.', 'Write the balanced equation: N₂ + 8H⁺ + 8e⁻ + 16ATP → 2NH₃ + H₂ + 16ADP + 16Pi.', 'Re-attempt Diagnostic Q1 and Q4. If still stuck, watch the NCERT video on "Root Nodule Formation" and note the.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_004', difficulty: 'standard',
          question: 'Sewage treatment is the process of removing contaminants from wastewater using.',
          hint: 'Review Class 8 decomposition (c8_bio_ch1_10) and Class 11 bacterial metabolism.',
          misconception: 'Students often think that primary treatment involves microbes (like bacteria) breaking down waste, but it is purely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sewage treatment is the process of removing contaminants from wastewater using physical,',
                  options: ['Sewage treatment is the process of removing contaminants from wastewater using physical,', 'Microbes in household products refer to the beneficial microorganisms (bacteria, fungi,', 'Antibiotics are chemical substances produced by microorganisms (bacteria, fungi,', 'Microbes in beverage production refers to the controlled use of specific microorganisms,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that primary treatment involves microbes (like bacteria) breaking down waste, but it is purely physical.' }
          ],
            remediations: { 'primary-treatment-involves-microbes-like': { steps: ['If the student confuses primary and secondary treatment, have them revisit Class 8 node c8_bio_ch1_10 (Beneficial.', 'Then use a flowchart: draw the sewage treatment steps, label each as physical or biological, and identify where.', 'Re-diagnostic: ask them to explain what happens in the aeration tank vs.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_006', difficulty: 'standard',
          question: 'Microbes as biocontrol agents are microorganisms (bacteria, fungi, viruses,.',
          hint: 'If stuck, review c11_bio_cbse_02_002 (Monera), c11_bio_cbse_02_005 (Fungi), and.',
          misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.',
          parts: [
                { id: 'a', prompt: 'A farmer applies a Trichoderma-based biofungicide to soil infected with Rhizoctonia solani (causing root rot).', answer: '1) Trichoderma spores germinate and grow rapidly, colonizing the rhizosphere',
                  options: ['1) Trichoderma spores germinate and grow rapidly, colonizing the rhizosphere', 'competition', 'antibiotics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.' }
          ],
            remediations: { 'bacillus-thuringiensis-and-bt-cotton': { steps: ['Revisit c11_bio_cbse_02_003 (Bacteria: Structure and Reproduction) to recall bacterial spore formation and protein.', 'Re-read the NCERT box on "Bt toxin" in the Microbes in Human Welfare chapter (not the Biotechnology chapter) and make a.', 'Attempt Diagnostic Question 1 and 2 again; if still incorrect, watch a 5-min animation of Bt toxin activation in insect.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Microbial biocontrol agents are always safer and more effective than chemical pesticides, so they should completely replace them in.', answer: 'The statement is false',
                  options: ['The statement is false', 'Bacillus thuringiensis', 'Bt cotton', 'Name the microbe used as biocontrol agent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Bacillus thuringiensis" and "Bt cotton" are the same thing.' }
          ],
            remediations: { 'bacillus-thuringiensis-and-bt-cotton': { steps: ['Revisit c11_bio_cbse_02_003 (Bacteria: Structure and Reproduction) to recall bacterial spore formation and protein.', 'Re-read the NCERT box on "Bt toxin" in the Microbes in Human Welfare chapter (not the Biotechnology chapter) and make a.', 'Attempt Diagnostic Question 1 and 2 again; if still incorrect, watch a 5-min animation of Bt toxin activation in insect.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
