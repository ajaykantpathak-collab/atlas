import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch11_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch11_p2: SimDef = {
    id: 'v3_c11_bio_ch11_p2',
    title: 'Photosynthesis in Higher Plants · Part 2/2',
    subtitle: 'Unpack the pigment team inside a chloroplast — and why green light isn\'t as wasted as it looks.',
    classLevel: 11, subject: 'biology', topic: 'Photosynthesis in Higher Plants · Part 2/2',
    chapters: ['c11_bio_ch11'],
    nodeIds: ['c11_bio_cbse_11_007', 'c11_bio_cbse_11_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a plant physiologist optimising LED grow-lights for a greenhouse', intro: 'A supplier swears pure red-blue LEDs are all a plant needs. Before you sign the order, check what the spectrum data actually say.', goal: 'Identify photosynthetic pigments and their spectra, distinguish absorption from action spectra, and explain photosystem organisation.' },
    discovery: {
        question: 'In 1883 Engelmann laid a Spirogyra filament under a spectrum and released aerobic bacteria nearby. The bacteria crowded densely over the blue and red bands and ignored the green. What had they just mapped without any instruments?',
        options: ['The action spectrum of photosynthesis — bacteria cluster where oxygen evolution, and therefore photosynthesis, is highest', 'The temperature gradient of the spectrum — bacteria like warm colours', 'The bacteria were attracted to the colours themselves', 'The chloroplast\'s position inside the filament'],
        answer: 'The action spectrum of photosynthesis — bacteria cluster where oxygen evolution, and therefore photosynthesis, is highest',
        hook: 'Leaves aren\'t running on one green pigment — a whole antenna team harvests blue and red, and \'green is useless\' survives only as a half-truth.',
    },
    teaching: [
        { title: 'Factors Affecting Photosynthesis: Law of Limiting Factors', text: 'Blackman\'s Law of Limiting Factors states that when a biological process like photosynthesis is influenced by multiple factors simultaneously, the rate of the process is determined by the factor.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_11_007', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Separate a leaf\'s pigments by chromatography, read the absorption versus action spectrum mismatch, and explain what P680 and P700 do that the hundreds of antenna molecules around them cannot.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_007', title: 'Factors Affecting Photosynthesis: Law of Limiting Factors',
          caseStudy: { intro: 'Imagine a farmer in Punjab growing wheat in November versus May – the same variety, same soil, but vastly different yields.',
            decisions: [{ prompt: 'State Blackman\'s Law of Limiting Factors and identify which factor would limit photosynthesis in a well-watered C3 plant at 10% full.', options: [
                { text: 'Blackman\'s Law: When multiple factors affect a process, the rate is determined by the', outcome: 'Blackman\'s Law: When multiple factors affect a process, the rate is determined by the factor.' },
                { text: 'optimal', outcome: 'Not quite — Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that.', reveals: 'if-a-factor-is-optimal' },
                { text: 'CO₂ or temperature', outcome: 'Not quite — Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that.', reveals: 'if-a-factor-is-optimal' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_11_008', title: 'Photosynthesis as a Means of Energy Conversion',
          scaffold: { problem: 'A wheat field (C₃) receives 20 mol photons m⁻² day⁻¹ of PAR (400-700 nm).',
            steps: [
            { text: 'Calculate absorbed photons = 20 mol × 0.30 = 6 mol photons m⁻² day⁻¹.' },
            { text: 'Calculate photons driving PSII = 6 mol × 0.85 = 5.1 mol photons m⁻² day⁻¹.' },
            { text: 'Calculate CO₂ fixed = 5.1 mol photons × 0.05 mol CO₂/mol photons = 0.255 mol CO₂ m⁻² day⁻¹.' },
            { text: 'Calculate glucose produced = 0.255 mol CO₂ / 6 = 0.0425 mol glucose m⁻² day⁻¹.' },
            { text: 'Convert to mass = 0.0425 mol × 180 g/mol = 7.65 g glucose m⁻² day⁻¹.', faded: true, blankAnswer: '7.65 g glucose m⁻² day⁻¹ (equivalent to ~17 g dry biomass.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Photosynthesis in Higher Plants · Part 2/2', spots: [
            { id: 's1', label: 'Factors Affecting Photosynthesis Law of Limiting Factors', prompt: 'Which idea is this? — Blackman\'s Law of Limiting Factors states that when a biological process like.', answer: 'Factors Affecting Photosynthesis Law of Limiting Factors', options: ['Factors Affecting Photosynthesis Law of Limiting Factors', 'Photosynthesis as a Means of Energy Conversion'] },
            { id: 's2', label: 'Photosynthesis as a Means of Energy Conversion', prompt: 'Which idea is this? — Photosynthesis is a physico-chemical process in which green plants convert light energy.', answer: 'Photosynthesis as a Means of Energy Conversion', options: ['Photosynthesis as a Means of Energy Conversion', 'Factors Affecting Photosynthesis Law of Limiting Factors'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school gardening club can afford one LED grow-light for the indoor spinach beds. The shop offers a cheap \'pure green\' light (\'leaves are green, so green is their colour\') and a pricier blue+red dual-band light. A member says accessory pigments are just backup for damaged chlorophyll a, so a single peak is all that matters.',
            decisions: [{ prompt: 'Which light actually powers growth, and why?', options: [
                { text: 'The blue+red light — chlorophyll a absorbs maximally at ~430 nm (blue) and ~662 nm (red), and accessory pigments (chlorophyll b, carotenoids) continuously harvest ~30% of incoming light at blue-green wavelengths and pass it to chlorophyll a by resonance transfer while quenching photo-oxidative damage. Green light is mostly reflected — that\'s why leaves look green.', outcome: 'Accessory pigments are always-on harvesters and protectors, not spares; feeding a plant the colour it reflects starves it.' },
                { text: 'The green light — leaves are green because they use green light most efficiently.', outcome: 'Green is reflected, not absorbed; absorption and action spectra both dip in the green band, so a green lamp photosynthesises poorly.', reveals: 'green-light-best-for-plants' },
                { text: 'Either works — accessory pigments sit idle until chlorophyll a is damaged, so pigment variety doesn\'t change daily yield.', outcome: 'Accessory pigments transfer energy to the reaction centre every second the leaf is lit; removing their wavelengths cuts usable spectrum and removes protection from singlet oxygen.', reveals: 'accessory-pigments-are-backup' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_11_008', title: 'You made it',
          caseStudy: { intro: 'You saw past \'chlorophyll is green\' to the real architecture: accessory pigments catch, chlorophyll a in the reaction centre converts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_007', difficulty: 'standard',
          question: 'Blackman\'s Law of Limiting Factors states that when a biological process like.',
          hint: 'If stuck, review RuBisCO kinetics in c11_bio_cbse_11_004 (carboxylation vs oxygenation).',
          misconception: 'Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that increasing any.',
          parts: [
                { id: 'a', prompt: 'Explain why increasing CO₂ concentration from 0.04% to 0.05% boosts photosynthesis in C3 plants but has little effect on C4 plants at high light intensity.', answer: 'C3 plants have a higher CO₂ compensation point (30-70 µL L⁻¹)',
                  options: ['C3 plants have a higher CO₂ compensation point (30-70 µL L⁻¹)', 'optimal'],
                  hint: 'If stuck, review RuBisCO kinetics in c11_bio_cbse_11_004 (carboxylation vs oxygenation) and the C4.',
                  misconception: 'Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that increasing any factor always increases.' },
                { id: 'b', prompt: 'A greenhouse tomato grower maintains 0.05% CO₂, 25°C, and optimal watering. At noon, light intensity is 1200 µmol m⁻² s⁻¹ (full sun).', answer: 'No increase in photosynthesis rate',
                  options: ['No increase in photosynthesis rate', 'optimal'],
                  hint: 'If stuck, review RuBisCO kinetics in c11_bio_cbse_11_004 (carboxylation vs oxygenation) and the C4.',
                  misconception: 'Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that increasing any factor always increases.' },
                { id: 'c', prompt: 'Compare the temperature response curves of photosynthesis for a C3 plant (wheat) and a C4 plant (maize) from 10°C to 45°C.', answer: 'C3 optimum: 20-25°C',
                  options: ['C3 optimum: 20-25°C', 'optimal'],
                  hint: 'If stuck, review RuBisCO kinetics in c11_bio_cbse_11_004 (carboxylation vs oxygenation) and the C4.',
                  misconception: 'Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that increasing any factor always increases.' }
          ],
            remediations: { 'if-a-factor-is-optimal': { steps: ['Revisit the light response curve (Figure 11.10 in NCERT) – identify points A, B, C, D, E and label which factor limits.', 'Draw a 2×2 table: rows = C3 vs C4, columns = limiting factor (CO₂, temperature); fill in why each responds differently.', 'Do the leaf disc experiment (Diagnostic Q6) virtually or physically – plot float time vs light intensity at two CO₂.', 'Explain aloud to a peer: "At point X on the graph, why doesn\'t increasing factor Y help?" until the bottleneck logic.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that increasing any.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Water is rarely a direct limiting factor for photosynthesis because it is a reactant in the light reaction; its main effect.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'optimal'],
                  hint: 'If stuck, review RuBisCO kinetics in c11_bio_cbse_11_004 (carboxylation vs oxygenation) and the C4.',
                  misconception: 'Students believe that if a factor is "optimal" for one plant, it\'s optimal for all plants, and that increasing any factor always increases.' }
          ],
            remediations: { 'if-a-factor-is-optimal': { steps: ['Revisit the light response curve (Figure 11.10 in NCERT) – identify points A, B, C, D, E and label which factor limits.', 'Draw a 2×2 table: rows = C3 vs C4, columns = limiting factor (CO₂, temperature); fill in why each responds differently.', 'Do the leaf disc experiment (Diagnostic Q6) virtually or physically – plot float time vs light intensity at two CO₂.', 'Explain aloud to a peer: "At point X on the graph, why doesn\'t increasing factor Y help?" until the bottleneck logic.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_11_008', difficulty: 'standard',
          question: 'Photosynthesis is a physico-chemical process in which green plants convert.',
          hint: 'If stuck on energy accounting, revisit c11_bio_cbse_11_002 (photophosphorylation.',
          misconception: 'Students believe "photosynthesis stores light energy directly in glucose bonds" – a single-step conversion.',
          parts: [
                { id: 'a', prompt: 'State the overall balanced chemical equation for oxygenic photosynthesis, indicating the physical state of each substance and the energy source.', answer: '6CO₂(g) + 12H₂O(l) → C₆H₁₂O₆(aq) + 6H₂O(l) + 6O₂(g) (light energy required)',
                  options: ['6CO₂(g) + 12H₂O(l) → C₆H₁₂O₆(aq) + 6H₂O(l) + 6O₂(g) (light energy required)', 'photosynthesis stores light energy directly in glucose bonds'],
                  hint: 'If stuck on energy accounting, revisit c11_bio_cbse_11_002 (photophosphorylation stoichiometry) and.',
                  misconception: 'Students believe "photosynthesis stores light energy directly in glucose bonds" – a single-step conversion.' },
                { id: 'b', prompt: 'A C₃ plant and a C₄ plant are both exposed to 40°C, high light, and current atmospheric CO₂ (420 ppm).', answer: 'C₄ plant will be more efficient',
                  options: ['C₄ plant will be more efficient', 'C₃ is more efficient', 'photosynthesis stores light energy directly in glucose bonds'],
                  hint: 'If stuck on energy accounting, revisit c11_bio_cbse_11_002 (photophosphorylation stoichiometry) and.',
                  misconception: 'Students believe "photosynthesis stores light energy directly in glucose bonds" – a single-step conversion.' },
                { id: 'c', prompt: 'Analyze the energy conversion efficiency of photosynthesis: If 8 photons (4 per photosystem) are required per O₂ evolved, and each 680 nm photon carries 176.', answer: '8 photons × 176 kJ/mol = 1408 kJ/mol per O₂',
                  options: ['8 photons × 176 kJ/mol = 1408 kJ/mol per O₂', 'the efficiency', 'photosynthesis stores light energy directly in glucose bonds'],
                  hint: 'If stuck on energy accounting, revisit c11_bio_cbse_11_002 (photophosphorylation stoichiometry) and.',
                  misconception: 'Students believe "photosynthesis stores light energy directly in glucose bonds" – a single-step conversion.' }
          ],
            remediations: { 'photosynthesis-stores-light-energy-directly': { steps: ['Draw the Z-scheme on paper labeling each energy form: photon → exciton → redox potential (V) → ΔpH/ΔΨ → ATP/NADPH → C-C.', 'For each arrow, name the molecular machine (LHC, RC, Cyt b₆f, ATP synthase, RuBisCO).', 'Calculate the energy drop at each step (e.g., 680 nm photon = 1.82 eV; P680* to pheophytin = 1.1 V drop).', 'Verify that the sum of energy drops equals the glucose bond energy minus losses.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
