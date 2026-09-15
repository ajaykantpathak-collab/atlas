import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch11_p1: SimDef = {
    id: 'v3_c11_bio_ch11_p1',
    title: 'Photosynthesis in Higher Plants · Part 1/2',
    subtitle: 'Unpack the pigment team inside a chloroplast — and why green light isn\'t as wasted as it looks.',
    classLevel: 11, subject: 'biology', topic: 'Photosynthesis in Higher Plants · Part 1/2',
    chapters: ['c11_bio_ch11'],
    nodeIds: ['c11_bio_cbse_11_001', 'c11_bio_cbse_11_002', 'c11_bio_cbse_11_003', 'c11_bio_cbse_11_004', 'c11_bio_cbse_11_005', 'c11_bio_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant physiologist optimising LED grow-lights for a greenhouse', intro: 'A supplier swears pure red-blue LEDs are all a plant needs. Before you sign the order, check what the spectrum data actually say.', goal: 'Identify photosynthetic pigments and their spectra, distinguish absorption from action spectra, and explain photosystem organisation.' },
    discovery: {
        question: 'In 1883 Engelmann laid a Spirogyra filament under a spectrum and released aerobic bacteria nearby. The bacteria crowded densely over the blue and red bands and ignored the green. What had they just mapped without any instruments?',
        options: ['The action spectrum of photosynthesis — bacteria cluster where oxygen evolution, and therefore photosynthesis, is highest', 'The temperature gradient of the spectrum — bacteria like warm colours', 'The bacteria were attracted to the colours themselves', 'The chloroplast\'s position inside the filament'],
        answer: 'The action spectrum of photosynthesis — bacteria cluster where oxygen evolution, and therefore photosynthesis, is highest',
        hook: 'Leaves aren\'t running on one green pigment — a whole antenna team harvests blue and red, and \'green is useless\' survives only as a half-truth.',
    },
    teaching: [
        { title: 'Photosynthesis: Site and Pigments', text: 'Photosynthesis in higher plants is a physico-chemical process occurring in chloroplasts where green plants convert light energy into chemical energy by using carbon dioxide and water to synthesise.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_11_001', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Separate a leaf\'s pigments by chromatography, read the absorption versus action spectrum mismatch, and explain what P680 and P700 do that the hundreds of antenna molecules around them cannot.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_001', title: 'Photosynthesis: Site and Pigments',
          caseStudy: { intro: 'Observe a spinach leaf (palak) held against sunlight – you see deep green, but notice the younger leaves are lighter green while older ones may yellow.',
            decisions: [{ prompt: 'Name the four pigments separated by paper chromatography of a green leaf extract, and state the colour each appears on the chromatogram.', options: [
                { text: 'The four pigments are: chlorophyll a (bright or blue-green), chlorophyll b', outcome: 'The four pigments are: chlorophyll a (bright or blue-green), chlorophyll b (yellow-green).' },
                { text: 'chlorophyll is green', outcome: 'Not quite — Students believe "chlorophyll b and carotenoids are just backup pigments that work only when.', reveals: 'chlorophyll-b-and-carotenoids-are' },
                { text: 'only chlorophyll, or confusing carotene with xanthophyll colours', outcome: 'Not quite — Students believe "chlorophyll b and carotenoids are just backup pigments that work only when.', reveals: 'chlorophyll-b-and-carotenoids-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_002', title: 'Light Reactions: Photophosphorylation',
          caseStudy: { intro: 'Imagine placing a healthy spinach leaf in sunlight and another identical leaf in complete darkness.',
            decisions: [{ prompt: 'Name the two photosystems involved in the light reactions of photosynthesis and state the wavelength of maximum absorption for the reaction.', options: [
                { text: 'Photosystem II (PS II) has a reaction centre chlorophyll a (P680) with absorption maximum', outcome: 'Photosystem II (PS II) has a reaction centre chlorophyll a (P680) with absorption maximum at 680.' },
                { text: 'outside', outcome: 'Not quite — Students often think that the proton gradient in chloroplasts is created solely by the electron.', reveals: 'the-proton-gradient-in-chloroplasts' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_11_004', title: 'Calvin Cycle: CO2 Fixation and Reduction',
          scaffold: { problem: 'A wheat leaf (C3 plant) photosynthesises at 25 μmol CO₂ m⁻² s⁻¹ under saturating light.',
            steps: [
            { text: 'Identify stoichiometry — 3 ATP + 2 NADPH per CO₂ fixed (Calvin cycle requirement).' },
            { text: 'Multiply CO₂ fixation rate by stoichiometric coefficients: ATP = 25 × 3 = 75 μmol m⁻² s⁻¹; NADPH = 25 × 2 = 50 μmol m⁻².' },
            { text: 'Partition ATP sources — cyclic provides 30% of 75 = 22.5 μmol m⁻² s⁻¹; non-cyclic provides 70% = 52.5 μmol m⁻² s⁻¹.' },
            { text: 'Relate non-cyclic ATP to electron flow — non-cyclic photophosphorylation yields ~1.28 ATP per 2 e⁻ (or 0.64 ATP per.' },
            { text: 'Verify NADPH balance — non-cyclic flow produces 1 NADPH per 2 e⁻ → 82/2 = 41 NADPH, but Calvin cycle needs 50.', faded: true, blankAnswer: 'ATP consumption = 75 μmol m⁻² s⁻¹; NADPH consumption = 50.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_11_005', title: 'C4 Pathway: Hatch-Slack Cycle',
          scaffold: { problem: 'A farmer in Haryana grows both wheat (C3) and pearl millet (C4).',
            steps: [
            { text: 'Identify the stress conditions — high temperature (40°C) and low internal CO₂ due to stomatal closure.' },
            { text: 'Recall RuBisCO kinetics — at high temperature, RuBisCO\'s specificity factor (CO₂/O₂) decreases; low internal CO₂.' },
            { text: 'Analyze C3 wheat — stomatal closure reduces Ci; RuBisCO oxygenase activity increases → photorespiration consumes.' },
            { text: 'Analyze C4 pearl millet — Kranz anatomy concentrates CO₂ in bundle sheath (10-20x atmospheric); PEP carboxylase has.' },
            { text: 'Conclude — pearl millet maintains high photosynthesis; wheat suffers severe photorespiratory loss.', faded: true, blankAnswer: 'Pearl millet (C4) maintains higher photosynthetic rate.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_11_006', title: 'Photorespiration and Its Significance',
          scaffold: { problem: 'In a wheat (C3) crop field at 35°C, atmospheric CO2 is 420 ppm and O2 is 21%. Stomatal conductance decreases by 40% due to water stress.',
            steps: [
            { text: 'Calculate Sc/o at 35°C: Sc/o = 80 × (1 - 0.007)^10 = 80 × 0.933 = 74.6' },
            { text: 'Determine intercellular CO2 concentration: Ci = 420 ppm × (1 - 0.40) = 252 ppm (assuming proportional drop)' },
            { text: 'Convert gas concentrations to aqueous phase at 35°C using Henry\'s law constants (CO2 solubility = 0.033 M/atm, O2.' },
            { text: 'Apply RuBisCO kinetic equation: Vo/Vc = (O2/CO2) × (1/Sc/o) = (273/8.3) × (1/74.6) = 32.9 × 0.0134 = 0.44' },
            { text: 'Compare to unstressed condition (Ci = 420 ppm, 25°C): Vo/Vc = (273/13.9) × (1/80) = 19.6 × 0.0125 = 0.245' },
            { text: 'Conclusion: Oxygenation:carboxylation ratio increases from 0.245 to 0.44 (79% increase), meaning photorespiration.', faded: true, blankAnswer: 'Oxygenation:carboxylation ratio increases from 0.245.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'Photosynthesis in Higher Plants · Part 1/2', spots: [
            { id: 's1', label: 'Photosynthesis Site and Pigments', prompt: 'Which idea is this? — Photosynthesis in higher plants is a physico-chemical process occurring in chloroplasts.', answer: 'Photosynthesis Site and Pigments', options: ['Photosynthesis Site and Pigments', 'Light Reactions Photophosphorylation', 'Electron Transport Chain in Photosynthesis', 'Calvin Cycle CO2 Fixation and Reduction'] },
            { id: 's2', label: 'Light Reactions Photophosphorylation', prompt: 'Which idea is this? — Photophosphorylation is the light-driven synthesis of ATP from ADP and inorganic.', answer: 'Light Reactions Photophosphorylation', options: ['Light Reactions Photophosphorylation', 'Photosynthesis Site and Pigments', 'Electron Transport Chain in Photosynthesis', 'Calvin Cycle CO2 Fixation and Reduction'] },
            { id: 's3', label: 'Electron Transport Chain in Photosynthesis', prompt: 'Which idea is this? — The electron transport chain in photosynthesis is a series of protein complexes and.', answer: 'Electron Transport Chain in Photosynthesis', options: ['Electron Transport Chain in Photosynthesis', 'Photosynthesis Site and Pigments', 'Light Reactions Photophosphorylation', 'Calvin Cycle CO2 Fixation and Reduction'] },
            { id: 's4', label: 'Calvin Cycle CO2 Fixation and Reduction', prompt: 'Which idea is this? — The Calvin Cycle is a cyclic series of enzyme-catalysed reactions occurring in the stroma.', answer: 'Calvin Cycle CO2 Fixation and Reduction', options: ['Calvin Cycle CO2 Fixation and Reduction', 'Photosynthesis Site and Pigments', 'Light Reactions Photophosphorylation', 'Electron Transport Chain in Photosynthesis'] },
            { id: 's5', label: 'C4 Pathway Hatch-Slack Cycle', prompt: 'Which idea is this? — The C4 pathway (Hatch-Slack cycle) is a carbon fixation adaptation in certain tropical.', answer: 'C4 Pathway Hatch-Slack Cycle', options: ['C4 Pathway Hatch-Slack Cycle', 'Photosynthesis Site and Pigments', 'Light Reactions Photophosphorylation', 'Electron Transport Chain in Photosynthesis'] },
            { id: 's6', label: 'Photorespiration and Its Significance', prompt: 'Which idea is this? — Photorespiration is a light-dependent, oxygen-consuming process in C3 plants where.', answer: 'Photorespiration and Its Significance', options: ['Photorespiration and Its Significance', 'Photosynthesis Site and Pigments', 'Light Reactions Photophosphorylation', 'Electron Transport Chain in Photosynthesis'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school gardening club can afford one LED grow-light for the indoor spinach beds. The shop offers a cheap \'pure green\' light (\'leaves are green, so green is their colour\') and a pricier blue+red dual-band light. A member says accessory pigments are just backup for damaged chlorophyll a, so a single peak is all that matters.',
            decisions: [{ prompt: 'Which light actually powers growth, and why?', options: [
                { text: 'The blue+red light — chlorophyll a absorbs maximally at ~430 nm (blue) and ~662 nm (red), and accessory pigments (chlorophyll b, carotenoids) continuously harvest ~30% of incoming light at blue-green wavelengths and pass it to chlorophyll a by resonance transfer while quenching photo-oxidative damage. Green light is mostly reflected — that\'s why leaves look green.', outcome: 'Accessory pigments are always-on harvesters and protectors, not spares; feeding a plant the colour it reflects starves it.' },
                { text: 'The green light — leaves are green because they use green light most efficiently.', outcome: 'Green is reflected, not absorbed; absorption and action spectra both dip in the green band, so a green lamp photosynthesises poorly.', reveals: 'green-light-best-for-plants' },
                { text: 'Either works — accessory pigments sit idle until chlorophyll a is damaged, so pigment variety doesn\'t change daily yield.', outcome: 'Accessory pigments transfer energy to the reaction centre every second the leaf is lit; removing their wavelengths cuts usable spectrum and removes protection from singlet oxygen.', reveals: 'accessory-pigments-are-backup' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You saw past \'chlorophyll is green\' to the real architecture: accessory pigments catch, chlorophyll a in the reaction centre converts.',
            decisions: [{ prompt: 'What comes next? Photosynthesis in Higher Plants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Photosynthesis in Higher Plants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_001', difficulty: 'standard',
          question: 'Photosynthesis in higher plants is a physico-chemical process occurring.',
          hint: 'Review c9_bio_ch1_10 (Plastids: Chloroplasts, Chromoplasts and Leucoplasts) – focus.',
          misconception: 'Students believe "chlorophyll b and carotenoids are just backup pigments that work only when chlorophyll a is damaged.".',
          parts: [
                { id: 'a', prompt: 'Name the four pigments separated by paper chromatography of a green leaf extract, and state the colour each appears on the chromatogram.', answer: 'The four pigments are: chlorophyll a (bright or blue-green), chlorophyll b',
                  options: ['The four pigments are: chlorophyll a (bright or blue-green), chlorophyll b', 'chlorophyll is green', 'only chlorophyll, or confusing carotene with xanthophyll colours'],
                  hint: 'Review c9_bio_ch1_10 (Plastids: Chloroplasts, Chromoplasts and Leucoplasts) – focus on the electron.',
                  misconception: 'Students believe "chlorophyll b and carotenoids are just backup pigments that work only when chlorophyll a is damaged." The exact wrong.' }
          ],
            remediations: { 'chlorophyll-b-and-carotenoids-are': { steps: ['Revisit paper chromatography (Class 11 practical) – physically separate pigments and observe four bands; measure.', 'Plot absorption spectra of each isolated pigment (use spectrophotometer or virtual lab) – see chlorophyll b peaks.', 'Overlay on action spectrum – note photosynthesis occurs at 450–500 nm where only accessory pigments absorb.', 'Read NCERT Figure 11.3c caption: "accessory pigments enable wider wavelength utilisation AND protect chlorophyll a from.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_002', difficulty: 'standard',
          question: 'Photophosphorylation is the light-driven synthesis of ATP from ADP and.',
          hint: 'If stuck, revisit c11_bio_cbse_11_001 (chloroplast structure and photosystem.',
          misconception: 'Students often think that the proton gradient in chloroplasts is created solely by the electron transport chain pumping.',
          parts: [
                { id: 'a', prompt: 'A chloroplast suspension is illuminated with light of wavelength 700 nm only.', answer: 'Only cyclic photophosphorylation will occur',
                  options: ['Only cyclic photophosphorylation will occur', 'both occur', 'neither occurs', 'outside'],
                  hint: 'If stuck, revisit c11_bio_cbse_11_001 (chloroplast structure and photosystem organisation) and.',
                  misconception: 'Students often think that the proton gradient in chloroplasts is created solely by the electron transport chain pumping protons from stroma.' }
          ],
            remediations: { 'the-proton-gradient-in-chloroplasts': { steps: ['Draw the thylakoid membrane as a closed vesicle with stroma outside and lumen inside.', 'Mark PS II on the lumen side – write the water-splitting equation (2H2O → 4H+ + 4e- + O2) and note the 4H+ are released.', 'Mark plastoquinone (PQ) shuttling – it picks up 2H+ from stroma and releases them into lumen.', 'Mark PS I and NADP+ reductase on the stroma side – note NADP+ + H+ + 2e- → NADPH removes H+ FROM stroma.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the proton gradient in chloroplasts is created solely by the electron transport chain pumping.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Cyclic photophosphorylation is a wasteful process because it produces ATP but no NADPH or O2, so plants should always use non-cyclic.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'outside'],
                  hint: 'If stuck, revisit c11_bio_cbse_11_001 (chloroplast structure and photosystem organisation) and.',
                  misconception: 'Students often think that the proton gradient in chloroplasts is created solely by the electron transport chain pumping protons from stroma.' }
          ],
            remediations: { 'the-proton-gradient-in-chloroplasts': { steps: ['Draw the thylakoid membrane as a closed vesicle with stroma outside and lumen inside.', 'Mark PS II on the lumen side – write the water-splitting equation (2H2O → 4H+ + 4e- + O2) and note the 4H+ are released.', 'Mark plastoquinone (PQ) shuttling – it picks up 2H+ from stroma and releases them into lumen.', 'Mark PS I and NADP+ reductase on the stroma side – note NADP+ + H+ + 2e- → NADPH removes H+ FROM stroma.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_003', difficulty: 'standard',
          question: 'The electron transport chain in photosynthesis is a series of protein complexes.',
          hint: 'Review Class 9 "Mitochondria: Powerhouse of the Cell" (c9_bio_ch1_9) for chemiosmosis.',
          misconception: 'Students often believe that the proton gradient in chloroplasts is generated solely by the cytochrome b₆f complex.',
          parts: [
                { id: 'a', prompt: 'A researcher treats isolated chloroplasts with DCMU (a herbicide that blocks electron flow from QA to QB in PSII).', answer: 'O₂ evolution, (',
                  options: ['O₂ evolution, (', 'ATP continues via cyclic flow'],
                  hint: 'Review Class 9 "Mitochondria: Powerhouse of the Cell" (c9_bio_ch1_9) for chemiosmosis basics and.',
                  misconception: 'Students often believe that the proton gradient in chloroplasts is generated solely by the cytochrome b₆f complex pumping protons from.' }
          ],
            remediations: { 'the-proton-gradient-in-chloroplasts': { steps: ['Revisit the water-splitting reaction (2H₂O → 4H⁺ + 4e⁻ + O₂) and explicitly note the location: the oxygen-evolving.', 'Trace the path of plastoquinone (PQ): it picks up 2H⁺ from the stroma when reduced to PQH₂, and releases them into the.', 'Note that NADP⁺ reductase is on the stromal side and consumes H⁺ from the stroma to make NADPH.', 'Draw a labelled diagram of the thylakoid membrane showing all three proton sources/sinks and the resulting.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_004', difficulty: 'standard',
          question: 'The Calvin Cycle is a cyclic series of enzyme-catalysed reactions occurring.',
          hint: 'Revisit c11_bio_cbse_11_002 (Light Reactions) and c11_bio_cbse_11_003 (Electron.',
          misconception: 'Students believe the Calvin cycle produces glucose directly in each turn.',
          parts: [
                { id: 'a', prompt: 'Why is the term "dark reaction" a misnomer for the Calvin cycle, and what experimental evidence supports this?', answer: 'The Calvin cycle is not light-independent',
                  options: ['The Calvin cycle is not light-independent', 'the Calvin cycle produces glucose directly in each turn'],
                  hint: 'Revisit c11_bio_cbse_11_002 (Light Reactions) and c11_bio_cbse_11_003 (Electron Transport) — focus.',
                  misconception: 'Students believe the Calvin cycle produces glucose directly in each turn.' },
                { id: 'b', prompt: 'A C3 plant fixes 6 molecules of CO₂. Calculate the total ATP and NADPH consumed, and explain why the ATP:NADPH ratio (1.5:1) exceeds the 1.28:1 ratio produced.', answer: 'For 6 CO₂: 18 ATP and 12 NADPH consumed (3 ATP + 2 NADPH per CO₂)',
                  options: ['For 6 CO₂: 18 ATP and 12 NADPH consumed (3 ATP + 2 NADPH per CO₂)', 'the Calvin cycle produces glucose directly in each turn'],
                  hint: 'Revisit c11_bio_cbse_11_002 (Light Reactions) and c11_bio_cbse_11_003 (Electron Transport) — focus.',
                  misconception: 'Students believe the Calvin cycle produces glucose directly in each turn.' }
          ],
            remediations: { 'the-calvin-cycle-produces-glucose': { steps: ['Draw the cycle as a circle with 3 RuBP (5C each = 15C) at top.', 'Add 3 CO₂ → 6 PGA (3C each = 18C).', 'Show 6 PGA → 6 G3P (3C each = 18C) using 6 ATP + 6 NADPH.', 'Remove 1 G3P (3C) as "net product".'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_005', difficulty: 'standard',
          question: 'The C4 pathway (Hatch-Slack cycle) is a carbon fixation adaptation in certain.',
          hint: 'Revisit c11_bio_cbse_11_004 (Calvin Cycle) and c11_bio_cbse_11_006 (Photorespiration).',
          misconception: 'Students think "C4 plants do not perform the Calvin cycle" because they hear "C4 pathway replaces C3 pathway." They.',
          parts: [
                { id: 'a', prompt: 'Explain why PEP carboxylase does not catalyze photorespiration even though O₂ is present in mesophyll cells.', answer: 'PEP carboxylase has no oxygenase activity',
                  options: ['PEP carboxylase has no oxygenase activity', 'low O₂ in mesophyll', 'C4 plants do not perform the Calvin cycle', 'C4 pathway replaces C3 pathway'],
                  hint: 'Revisit c11_bio_cbse_11_004 (Calvin Cycle) and c11_bio_cbse_11_006 (Photorespiration) to re-learn.',
                  misconception: 'Students think "C4 plants do not perform the Calvin cycle" because they hear "C4 pathway replaces C3 pathway." They also believe "bundle.' },
                { id: 'b', prompt: 'A C4 plant fixes 6 CO₂ molecules. Calculate the total ATP and NADPH consumed in the mesophyll and bundle sheath cells combined, showing the allocation between.', answer: 'Calvin cycle: 6 CO₂ × (3 ATP + 2 NADPH) = 18 ATP + 12 NADPH',
                  options: ['Calvin cycle: 6 CO₂ × (3 ATP + 2 NADPH) = 18 ATP + 12 NADPH', 'Calvin cycle in a different cell', 'C4 plants do not perform the Calvin cycle', 'C4 pathway replaces C3 pathway'],
                  hint: 'Revisit c11_bio_cbse_11_004 (Calvin Cycle) and c11_bio_cbse_11_006 (Photorespiration) to re-learn.',
                  misconception: 'Students think "C4 plants do not perform the Calvin cycle" because they hear "C4 pathway replaces C3 pathway." They also believe "bundle.' }
          ],
            remediations: { 'c4-plants-do-not-perform': { steps: ['Draw a single mesophyll cell and a single bundle sheath cell side-by-side. Label chloroplasts in both.', 'Trace one CO₂ molecule: mesophyll cytosol (PEP + CO₂ → OAA) → mesophyll chloroplast (OAA → malate) → plasmodesmata →.', 'Count ATP used in mesophyll (2 per CO₂) and bundle sheath (3 per CO₂).', 'Verify that RuBisCO operates *only* in bundle sheath chloroplasts. Repeat until the spatial separation is automatic.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_006', difficulty: 'standard',
          question: 'Photorespiration is a light-dependent, oxygen-consuming process in C3 plants.',
          hint: 'Review Calvin cycle carboxylation step (c11_bio_cbse_11_004) and RuBisCO kinetic.',
          misconception: 'Students believe photorespiration is simply "reverse photosynthesis" or "respiration in light" because it consumes O2.',
          parts: [
                { id: 'a', prompt: 'State the exact substrates and products of the RuBisCO oxygenase reaction, including the carbon number of each product molecule.', answer: 'RuBP (5C) + O2 → 3-PGA (3C) + 2-phosphoglycolate (2C)',
                  options: ['RuBP (5C) + O2 → 3-PGA (3C) + 2-phosphoglycolate (2C)', 'reverse photosynthesis', 'respiration in light', 'RuBP + CO2 as substrates, or producing two 3-PGA molecules'],
                  hint: 'Review Calvin cycle carboxylation step (c11_bio_cbse_11_004) and RuBisCO kinetic properties (Km for.',
                  misconception: 'Students believe photorespiration is simply "reverse photosynthesis" or "respiration in light" because it consumes O2 and releases CO2.' },
                { id: 'b', prompt: 'A C3 plant and a C4 plant are exposed to 42°C, high light, and ambient CO2 (400 ppm).', answer: 'C4 plant will have higher net photosynthesis',
                  options: ['C4 plant will have higher net photosynthesis', 'reverse photosynthesis', 'respiration in light'],
                  hint: 'Review Calvin cycle carboxylation step (c11_bio_cbse_11_004) and RuBisCO kinetic properties (Km for.',
                  misconception: 'Students believe photorespiration is simply "reverse photosynthesis" or "respiration in light" because it consumes O2 and releases CO2.' },
                { id: 'c', prompt: 'Compare the ATP and NADPH cost per net CO2 fixed in C3 vs C4 plants when photorespiration is active (assume 25% oxygenation:carboxylation ratio in C3).', answer: 'C3: For 4 carboxylations (4 CO2 fixed) + 1 oxygenation → 5 RuBP consumed',
                  options: ['C3: For 4 carboxylations (4 CO2 fixed) + 1 oxygenation → 5 RuBP consumed', 'reverse photosynthesis', 'respiration in light'],
                  hint: 'Review Calvin cycle carboxylation step (c11_bio_cbse_11_004) and RuBisCO kinetic properties (Km for.',
                  misconception: 'Students believe photorespiration is simply "reverse photosynthesis" or "respiration in light" because it consumes O2 and releases CO2.' }
          ],
            remediations: { 'photorespiration-is-simply-reverse-photosynthesi': { steps: ['Draw side-by-side comparison table — mitochondrial respiration (substrates, organelles, ATP yield, purpose).', 'Use 14C-glycine feeding experiment animation to show CO2 release from glycine decarboxylase in mitochondria, not from.', 'Calculate ATP balance: respiration yields ~30 ATP/glucose; photorespiration consumes 3.5 ATP per 2-PG salvaged.', 'Emphasise that photorespiration starts with RuBP (5C), not glucose (6C), and produces no usable energy.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
