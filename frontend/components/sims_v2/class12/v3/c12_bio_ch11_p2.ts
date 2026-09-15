import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch11_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch11_p2: SimDef = {
    id: 'v3_c12_bio_ch11_p2',
    title: 'Biotechnology: Principles and Processes · Part 2/2',
    subtitle: 'Bacteria invented the scissors; we borrowed them to rewrite genomes.',
    classLevel: 12, subject: 'biology', topic: 'Biotechnology: Principles and Processes · Part 2/2',
    chapters: ['c12_bio_ch11'],
    nodeIds: ['c12_bio_cbse_11_007', 'c12_bio_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Genetic engineer\'s apprentice', intro: 'From curd to CRISPR-era insulin — biotechnology is one principle: use living systems to make useful things.', goal: 'Define biotechnology\'s core principles and explain restriction enzyme action on palindromic sites.' },
    discovery: {
        question: 'You need to cut one specific gene out of a long DNA strand — like one word from a sentence with no spaces. What makes a cut at exactly the right spot?',
        options: ['Restriction enzymes — bacterial \'scissors\' that recognise specific palindromic sequences and cut there', 'DNA ligase — it cuts first, then pastes the gene into the vector', 'RNA polymerase — it transcribes the gene free of the surrounding DNA', 'Heat — boiling DNA breaks it precisely at gene boundaries'],
        answer: 'Restriction enzymes — bacterial \'scissors\' that recognise specific palindromic sequences and cut there',
        hook: 'Genetic engineering was impossible until biology lent us its own tools — bacteria evolved these enzymes to shred viral DNA, and we borrowed them as precision instruments.',
    },
    teaching: [
        { title: 'Bioreactors: Large-Scale Production', text: 'A bioreactor is a large, sterile vessel designed to provide a controlled environment (temperature, pH, dissolved oxygen, nutrient supply, agitation) for the large-scale cultivation of recombinant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_11_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Walk the journey from bread yeast to insulin-producing bacteria: define biotechnology\'s two core principles, then wield restriction enzymes to cut DNA at palindromic sites for engineering.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_007', title: 'Bioreactors: Large-Scale Production',
          caseStudy: { intro: 'Imagine you visit a pharmaceutical plant where human insulin is produced in 10,000‑liter stainless‑steel tanks.',
            decisions: [{ prompt: 'Name the four essential process parameters that are continuously monitored and controlled in a standard stirred‑tank bioreactor for.', options: [
                { text: 'The four essential parameters are temperature, pH, dissolved oxygen (DO), and foam level', outcome: 'The four essential parameters are temperature, pH, dissolved oxygen (DO), and foam level.' },
                { text: 'nutrient concentration', outcome: 'Not quite — Students often think that scaling up a bioreactor is simply a matter of multiplying all dimensions.', reveals: 'scaling-up-a-bioreactor-is' },
                { text: 'cell density', outcome: 'Not quite — Students often think that scaling up a bioreactor is simply a matter of multiplying all dimensions.', reveals: 'scaling-up-a-bioreactor-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_11_008', title: 'Downstream Processing: Purification',
          scaffold: { problem: 'A recombinant protein purification table shows: Crude lysate — 50,000 mL, 200 mg/mL total protein, 5,000 U/mL activity.',
            steps: [
            { text: 'Calculate total activity and total protein for each stage: Crude = 50,000 mL × 5,000 U/mL = 2.5×10⁸ U; protein = 50,000.' },
            { text: 'Calculate specific activity (U/mg) each stage: Crude = 2.5×10⁸ / 1×10⁷ = 25 U/mg.' },
            { text: 'Calculate stepwise yield % = (activity_after / activity_before) × 100: Precipitation = (2.0×10⁷ / 2.5×10⁸) × 100 = 80%.' },
            { text: 'Calculate stepwise purification fold = SA_after / SA_before: Precipitation = 80/25 = 3.2×. IEX = 1,750/80 = 21.9×.' },
            { text: 'Overall yield = 80% × 87.5% × 34.3% = 24.0%. Overall purification = 3.2 × 21.9 × 3.4 = 239×.', faded: true, blankAnswer: 'Stage | Volume (mL) | Total Protein (mg) | Total Activity.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology: Principles and Processes · Part 2/2', spots: [
            { id: 's1', label: 'Bioreactors Large-Scale Production', prompt: 'Which idea is this? — A bioreactor is a large, sterile vessel designed to provide a controlled environment.', answer: 'Bioreactors Large-Scale Production', options: ['Bioreactors Large-Scale Production', 'Downstream Processing Purification'] },
            { id: 's2', label: 'Downstream Processing Purification', prompt: 'Which idea is this? — Downstream processing is the sequence of unit operations used to isolate, purify, and.', answer: 'Downstream Processing Purification', options: ['Downstream Processing Purification', 'Bioreactors Large-Scale Production'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup\'s engineered bacteria produce human enzyme beautifully in shake flasks, but in the 10,000-litre fermenter the yield collapses — oxygen starves the dense culture and product clumps into inclusion bodies. A young scientist proposes \'the gene is faulty, let\'s re-clone it\'.',
            decisions: [{ prompt: 'What\'s the right diagnosis?', options: [
                { text: 'It\'s a bioprocess problem, not a genetic one — scale-up needs optimised oxygen transfer, feed rate, pH and shear; a perfect strain still fails in a poorly run fermenter.', outcome: 'Biotechnology rests on two equal pillars: genetic engineering builds the strain, bioprocess engineering makes it produce at scale — re-cloning solves nothing here.' },
                { text: 'Re-clone it — biotechnology is genetic engineering, so any product failure must trace back to the gene construct.', outcome: 'The strain already proved it makes the enzyme in flasks; the breakdown is in fermentation parameters — treating bioprocess as a black box is the mistake.', reveals: 'biotech-is-gene-editing-only' },
                { text: 'Just run the same flask recipe in the big tank — scale doesn\'t change biology.', outcome: 'At high cell density, oxygen transfer, heat removal and mixing all change; a shaken flask recipe doesn\'t transfer directly to a stirred tank.', reveals: 'flask-equals-fermenter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_11_008', title: 'You made it',
          caseStudy: { intro: 'You now hold the molecular scissors that built the biotech industry. Genetic engineering principles and restriction enzymes are core board content — and the actual toolkit of every lab career.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_007', difficulty: 'standard',
          question: 'A bioreactor is a large, sterile vessel designed to provide a controlled.',
          hint: 'If stuck, review c11_biotech_cbse_12_011 (Cell Culture Techniques) for aseptic handling.',
          misconception: 'Students often think that scaling up a bioreactor is simply a matter of multiplying all dimensions by the same factor.',
          parts: [
                { id: 'a', prompt: 'Compare the suitability of a stirred‑tank bioreactor versus an air‑lift bioreactor for (a) shear‑sensitive mammalian cell culture and (b) high‑density *E.', answer: 'shear‑sensitive mammalian cell culture and (',
                  options: ['shear‑sensitive mammalian cell culture and (', 'stirred‑tank for mammalian cells'],
                  hint: 'If stuck, review c11_biotech_cbse_12_011 (Cell Culture Techniques) for aseptic handling and media.',
                  misconception: 'Students often think that scaling up a bioreactor is simply a matter of multiplying all dimensions by the same factor (geometric.' }
          ],
            remediations: { 'scaling-up-a-bioreactor-is': { steps: ['Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) to review the basic needs of cultured cells (nutrients, O₂.', 'Re‑study c12_bio_cbse_11_005 (Competent Host: Transformation) to recall aseptic technique and why sterility.', 'Practice a scaling calculation: given a 10 L vessel with kLa = 200 h⁻¹ at 500 rpm, estimate kLa at 10,000 L if tip.', 'Re‑attempt Diagnostic Question 3 after step 3.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_008', difficulty: 'standard',
          question: 'Downstream processing is the sequence of unit operations used to isolate.',
          hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
          misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column.',
          parts: [
                { id: 'a', prompt: 'List the five major stages of downstream processing in the correct sequential order for an intracellular recombinant protein, and name one representative.', answer: 'Correct sequence: (1) Solid–liquid separation',
                  options: ['Correct sequence: (1) Solid–liquid separation', 'purification = chromatography'],
                  hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' },
                { id: 'b', prompt: 'You are purifying an intracellular, heat-stable enzyme (60 kDa, pI 8.5) from *Bacillus subtilis* fermentation broth (10^10 cells/mL, 50 g/L wet cell weight).', answer: 'Step 1: Disc-stack centrifugation (10,000–15,000 × g)',
                  options: ['Step 1: Disc-stack centrifugation (10,000–15,000 × g)', 'purification = chromatography'],
                  hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' },
                { id: 'c', prompt: 'Compare the separation mechanisms and predict the elution order for a mixture containing: Protein A (45 kDa, pI 9.0), Protein B (45 kDa, pI 5.0), Protein.', answer: '(i) Cation-exchange pH 7.0: Protein A (pI 9.0 → net +) binds',
                  options: ['(i) Cation-exchange pH 7.0: Protein A (pI 9.0 → net +) binds', 'SEC separates by molecular weight', 'purification = chromatography'],
                  hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' }
          ],
            remediations: { 'purification-chromatography-and-treat-downstream': { steps: ['If the student cannot sequence steps or justify technique choice: 1.', 'Revisit c12_bio_cbse_11_007 (bioreactor output) — list every component in 1 L of harvest broth with approximate.', 'For each component, write one physical property (size, charge, solubility, affinity, density) that DIFFERS from the.', 'Match each property difference to a separation technique from c11_biotech_cbse_12_002 (centrifugation) and.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_11_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column.',
          parts: [
                { id: 'a', prompt: 'A process development scientist proposes using immobilised metal affinity chromatography (IMAC) as the VERY FIRST chromatography step after cell lysis for.', answer: 'The strategy is high-risk',
                  options: ['The strategy is high-risk', 'IMAC is specific so it\'s fine', 'purification = chromatography'],
                  hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' },
                { id: 'b', prompt: 'Design a cost-reduced downstream process for an extracellular, thermostable α-amylase (55 kDa, pI 4.8) from *Bacillus licheniformis* produced at 20 g/L in a 50.', answer: 'Process: (1) Microfiltration (0.2 µm)',
                  options: ['Process: (1) Microfiltration (0.2 µm)', 'purification = chromatography'],
                  hint: 'If stuck on charge calculation: revisit c11_biotech_cbse_03_003 (protein structure) for.',
                  misconception: 'Students believe "purification = chromatography" and treat downstream processing as a single chromatography column step.' }
          ],
            remediations: { 'purification-chromatography-and-treat-downstream': { steps: ['If the student cannot sequence steps or justify technique choice: 1.', 'Revisit c12_bio_cbse_11_007 (bioreactor output) — list every component in 1 L of harvest broth with approximate.', 'For each component, write one physical property (size, charge, solubility, affinity, density) that DIFFERS from the.', 'Match each property difference to a separation technique from c11_biotech_cbse_12_002 (centrifugation) and.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
