import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch07_p2: SimDef = {
    id: 'v3_c11_chem_ch07_p2',
    title: 'Equilibrium · Part 2/3',
    subtitle: 'See why equilibrium means equal rates — and why Kc ignores concentration shoves.',
    classLevel: 11, subject: 'chemistry', topic: 'Equilibrium · Part 2/3',
    chapters: ['c11_chem_ch07'],
    nodeIds: ['c11_chem_cbse_07_007', 'c11_chem_cbse_07_008', 'c11_chem_cbse_07_009', 'c11_chem_cbse_07_010', 'c11_chem_cbse_07_011', 'c11_chem_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reaction engineer steering a reversible process', intro: 'The reaction looks finished; the molecules disagree. Prove the traffic still runs both ways.', goal: 'Describe dynamic equilibrium and distinguish the equilibrium position from the equilibrium constant.' },
    discovery: {
        question: 'A sealed bottle of soda never \'finishes\' reacting — the reaction just seems to stop. What is really happening?',
        options: ['Forward and reverse reactions run at equal rates', 'All reactants are used up', 'The catalyst deactivates', 'Temperature drops to zero reaction'],
        answer: 'Forward and reverse reactions run at equal rates',
        hook: 'Equilibrium is not stillness — it is two rivers flowing in opposite directions at exactly the same speed.',
    },
    teaching: [
        { title: 'Le Chatelier\'s Principle: Effect of Temperature and Pressure', text: 'Le Chatelier\'s Principle states that when a system at equilibrium is subjected to a change in temperature, pressure, or concentration, the system shifts its equilibrium position to counteract the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_07_007', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Add more reactant — which way does the balance shift?',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_007', title: 'Le Chatelier\'s Principle: Effect of Temperature and Pressure',
          scaffold: { problem: 'In the Haber process, N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH° = -92.2 kJ/mol. At 400°C (673 K), Kp = 1.64 × 10⁻⁴ atm⁻².',
            steps: [
            { text: 'Define basis - 1 mol N₂ + 3 mol H₂ = 4 mol total initial. Let ξ = extent of reaction (mol N₂ reacted).' },
            { text: 'Express partial pressures: P_i = y_i P_total = (n_i/n_total) × 200 atm.' },
            { text: 'Write Kp expression: Kp = (P_NH₃)² / (P_N₂)(P_H₂)³ = 1.64×10⁻⁴.' },
            { text: 'Simplify and solve numerically: 1.64×10⁻⁴ = (160000/4.32×10¹⁰) × [ξ²(4-2ξ)²/(1-ξ)⁴] = 3.70×10⁻⁶ × [ξ²(4-2ξ)²/(1-ξ)⁴].' },
            { text: 'Van\'t Hoff for Kp at 773 K: ln(K₂/K₁) = -ΔH°/R (1/T₂ - 1/T₁) = 92200/8.314 × (1/773 - 1/673) = 11090 × (-0.000192).' },
            { text: 'Industrial reasoning: At 500°C, equilibrium yield drops to ~10% but reaction RATE is much higher.', faded: true, blankAnswer: 'At 400°C, 200 atm: NH₃ mole fraction = 0.222 (22.2%).' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_008', title: 'Le Chatelier\'s Principle: Effect of Catalyst',
          caseStudy: { intro: 'Observe a Haber process industrial reactor in a fertilizer plant: iron catalyst speeds up ammonia synthesis from N₂ and H₂.',
            decisions: [{ prompt: 'State the effect of adding a catalyst on (i) the equilibrium constant Kc, (ii) the equilibrium concentrations of reactants and products.', options: [
                { text: '(i) Kc remains unchanged', outcome: '(i) Kc remains unchanged because a catalyst lowers the activation energy of both forward and.' },
                { text: 'Kc increases', outcome: 'Not quite — Students often believe that because a catalyst "speeds up the reaction," it must increase the yield.', reveals: 'because-a-catalyst-speeds-up' },
                { text: 'equilibrium shifts to products', outcome: 'Not quite — Students often believe that because a catalyst "speeds up the reaction," it must increase the yield.', reveals: 'because-a-catalyst-speeds-up' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_009', title: 'Ionic Equilibrium: Acids and Bases (Arrhenius, Bronsted-Lowry)',
          caseStudy: { intro: 'Think of the tart taste of lemon juice (citric acid) or the slippery feel of soap solution (basic).',
            decisions: [{ prompt: 'State the Arrhenius definition of an acid and a base. Give one example of each that fits this definition.', options: [
                { text: 'Arrhenius acid: substance that dissociates in water to give H⁺ ions (e.g., HCl)', outcome: 'Arrhenius acid: substance that dissociates in water to give H⁺ ions (e.g., HCl).' },
                { text: 'gains H', outcome: 'Not quite — Students often think that a Bronsted-Lowry base must contain an OH group or be negatively charged.', reveals: 'a-bronsted-lowry-base-must' },
                { text: 'any base must contain OH⁻, missing the limitation of the Arrhenius theory', outcome: 'Not quite — Students often think that a Bronsted-Lowry base must contain an OH group or be negatively charged.', reveals: 'a-bronsted-lowry-base-must' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_010', title: 'Lewis Acid-Base Theory',
          caseStudy: { intro: 'Observe how anhydrous AlCl₃ fumes in moist air — it aggressively accepts electron pairs from water molecules, forming [Al(H₂O)₆]³⁺.',
            decisions: [{ prompt: 'Define a Lewis acid and a Lewis base. Give one example of each that is NOT a Bronsted acid or base.', options: [
                { text: 'A Lewis acid is an electron-pair acceptor (e.g., BF₃', outcome: 'A Lewis acid is an electron-pair acceptor (e.g., BF₃, which has an incomplete octet on boron).' },
                { text: 'Lewis acid donates H⁺', outcome: 'Not quite — Students think "Lewis acid = electron-deficient molecule with incomplete octet ONLY" and miss that.', reveals: 'lewis-acid-electron-deficient-molecule' },
                { text: 'Lewis acid = electron-deficient molecule with incomplete octet ONLY', outcome: 'Not quite — Students think "Lewis acid = electron-deficient molecule with incomplete octet ONLY" and miss that.', reveals: 'lewis-acid-electron-deficient-molecule' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_011', title: 'Ionisation of Acids and Bases: Ka and Kb',
          scaffold: { problem: 'The pH of a 0.02 M solution of a weak monoprotic acid HX is 2.85 at 298 K.',
            steps: [
            { text: 'Identify given data: C = 0.02 M, pH = 2.85, T = 298 K. Find [H⁺], α, Ka, pKa.' },
            { text: 'Calculate [H⁺] from pH: [H⁺] = 10⁻ᵖᴴ = 10⁻²·⁸⁵ = 1.41 × 10⁻³ M (using antilog: 10⁻²·⁸⁵ = 10⁻³ × 10⁰·¹⁵ = 1.41 × 10⁻³).' },
            { text: 'Calculate degree of ionisation α = [H⁺]/C = (1.41 × 10⁻³)/0.02 = 0.0705 = 7.05%.' },
            { text: 'Use exact Ka expression: Ka = [H⁺][X⁻]/[HX] = [H⁺]²/(C - [H⁺]) because [H⁺] = [X⁻] and [HX]eq = C - [H⁺].' },
            { text: 'Calculate pKa = -log Ka = -log(1.07 × 10⁻⁴) = 4 - log 1.07 = 4 - 0.029 = 3.97.' },
            { text: 'Verify consistency: Using Ka = 1.07×10⁻⁴, C = 0.02, solve quadratic Cα² + Kaα - Ka = 0 → α = 0.0705. Matches Step 3.', faded: true, blankAnswer: '(i) [H⁺] = 1.41 × 10⁻³ M, (ii) α = 0.0705 (7.05%), (iii).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_012', title: 'pH Scale: Calculation',
          scaffold: { problem: 'Calculate the pH of a solution prepared by dissolving 0.40 g of NaOH in water and making the volume up to 250 mL at 298 K.',
            steps: [
            { text: 'Calculate moles of NaOH = mass / molar mass = 0.40 g / 40 g mol⁻¹ = 0.010 mol.' },
            { text: 'Calculate molar concentration [NaOH] = moles / volume in L = 0.010 mol / 0.250 L = 0.040 M.' },
            { text: 'NaOH is a strong base, dissociates completely: [OH⁻] = [NaOH] = 0.040 M = 4.0 × 10⁻² M.' },
            { text: 'Calculate pOH = -log₁₀[OH⁻] = -log₁₀(4.0 × 10⁻²) = -[log₁₀4.0 + log₁₀10⁻²] = -[0.602 - 2] = 1.398 ≈ 1.40.' },
            { text: 'Use pH + pOH = 14.00 → pH = 14.00 - 1.40 = 12.60.', faded: true, blankAnswer: 'pH = 12.60' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a science-club demo you show a sealed bottle of fizzy drink: no bubbles rise, the liquid looks still. A first-year says: \'At equilibrium the CO2 has stopped escaping — the reaction is finished, nothing is moving any more.\'',
            decisions: [{ prompt: 'What is actually happening inside the sealed bottle?', options: [
                { text: 'A dynamic equilibrium: CO2 molecules are dissolving into the liquid and escaping into the headspace at equal rates — that\'s why pressure stays constant yet the process never stops. The stillness is macroscopic; molecular traffic across the interface continues nonstop. Open the cap and the balance breaks — hence the sudden fizz.', outcome: 'Equilibrium means equal opposing rates, not zero activity; constant vapour pressure is the signature of continuous molecular exchange.' },
                { text: 'The first-year is right — equilibrium means all molecular motion across the surface has ceased.', outcome: 'That confuses \'no net change\' with \'no process\'; at equilibrium evaporation and condensation (or dissolving and escaping) both run at equal nonzero rates.', reveals: 'equilibrium-means-static' },
                { text: 'The gas is \'trapped\' permanently — it will never come out even when opened.', outcome: 'Equilibrium holds only while the bottle stays closed at constant temperature; opening it removes the opposing condensation side and CO2 rushes out.', reveals: 'sealed-equilibrium-is-permanent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'Kc, Kp, Le Chatelier — you now predict which way a reaction runs before it even starts.',
            decisions: [{ prompt: 'What comes next? Equilibrium · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Equilibrium · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_007', difficulty: 'standard',
          question: 'Le Chatelier\'s Principle states that when a system at equilibrium is subjected.',
          hint: 'Revisit node c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for Kp definition and.',
          misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.',
          parts: [
                { id: 'a', prompt: 'For the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92 kJ/mol.', answer: 'Kp decreases and NH₃ yield decreases',
                  options: ['Kp decreases and NH₃ yield decreases', 'increasing pressure ALWAYS increases the equilibrium constant Kp'],
                  hint: 'Revisit node c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for Kp definition and.',
                  misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.' },
                { id: 'b', prompt: 'Consider the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = -197 kJ/mol. The system is at equilibrium in a 10 L vessel at 500 K.', answer: 'Halving volume doubles all partial pressures initially',
                  options: ['Halving volume doubles all partial pressures initially', 'increasing pressure ALWAYS increases the equilibrium constant Kp'],
                  hint: 'Revisit node c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for Kp definition and.',
                  misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.' },
                { id: 'c', prompt: 'For the equilibrium PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), ΔH = +87.9 kJ/mol. At 500 K, Kp = 1.8 atm. Initially 1 mole PCl₅ is placed in a 2 L vessel at 500 K.', answer: 'Step 1: Initial P_PCl₅ = nRT/V = (1 × 0.0821 × 500)/2 = 20.525 atm',
                  options: ['Step 1: Initial P_PCl₅ = nRT/V = (1 × 0.0821 × 500)/2 = 20.525 atm', 'increasing pressure ALWAYS increases the equilibrium constant Kp'],
                  hint: 'Revisit node c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for Kp definition and.',
                  misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.' },
                { id: 'd', prompt: 'Compare the effect of adding argon gas at (a) constant volume and (b) constant pressure to the equilibrium 2NO₂(g) ⇌ N₂O₄(g), ΔH = -57.2 kJ/mol.', answer: 'constant volume and (',
                  options: ['constant volume and (', 'increasing pressure ALWAYS increases the equilibrium constant Kp'],
                  hint: 'Revisit node c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for Kp definition and.',
                  misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.' }
          ],
            remediations: { 'increasing-pressure-always-increases-the': { steps: ['Have student write Kp expression for N₂ + 3H₂ ⇌ 2NH₃.', 'Ask: "If total pressure doubles at constant T, what happens to each partial pressure initially?" (All double).', 'Calculate Qp with doubled pressures: Qp = (2P_NH₃)²/[(2P_N₂)(2P_H₂)³] = 4/16 Kp = Kp/4.', 'Since Qp < Kp, reaction shifts right.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.',
          parts: [
                { id: 'a', prompt: 'Design an experiment to demonstrate Le Chatelier\'s principle for temperature effect using the equilibrium [Co(H₂O)₆]²⁺(aq) + 4Cl⁻(aq) ⇌ [CoCl₄]²⁻(aq).', answer: 'Prepare 0.1 M CoCl₂ in water (pink)',
                  options: ['Prepare 0.1 M CoCl₂ in water (pink)', 'increasing pressure ALWAYS increases the equilibrium constant Kp'],
                  hint: 'Revisit node c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for Kp definition and.',
                  misconception: 'Students believe that increasing pressure ALWAYS increases the equilibrium constant Kp.' }
          ],
            remediations: { 'increasing-pressure-always-increases-the': { steps: ['Have student write Kp expression for N₂ + 3H₂ ⇌ 2NH₃.', 'Ask: "If total pressure doubles at constant T, what happens to each partial pressure initially?" (All double).', 'Calculate Qp with doubled pressures: Qp = (2P_NH₃)²/[(2P_N₂)(2P_H₂)³] = 4/16 Kp = Kp/4.', 'Since Qp < Kp, reaction shifts right.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_008', difficulty: 'standard',
          question: 'A catalyst is a substance that increases the rate of both the forward and.',
          hint: 'Review the derivation of Kc = kf/kr from the equality of rates at equilibrium (node.',
          misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products.',
          parts: [
                { id: 'a', prompt: 'State the effect of adding a catalyst on (i) the equilibrium constant Kc, (ii) the equilibrium concentrations of reactants and products, and (iii) the time.', answer: '(i) Kc remains unchanged',
                  options: ['(i) Kc remains unchanged', 'Kc increases', 'equilibrium shifts to products', 'speeds up the reaction'],
                  hint: 'Review the derivation of Kc = kf/kr from the equality of rates at equilibrium (node.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' },
                { id: 'b', prompt: 'In the Contact process for H₂SO₄ production, V₂O₅ catalyses 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).', answer: 'The amount of SO₃ remains unchanged',
                  options: ['The amount of SO₃ remains unchanged', 'SO₃ decreases because forward reaction slows more', 'speeds up the reaction'],
                  hint: 'Review the derivation of Kc = kf/kr from the equality of rates at equilibrium (node.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' },
                { id: 'c', prompt: 'For the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g) ΔH = -92 kJ/mol, an iron catalyst is added at 700 K and 200 atm.', answer: 'The mole fraction of NH₃ remains 0.15',
                  options: ['The mole fraction of NH₃ remains 0.15', 'speeds up the reaction', 'a catalyst changes the equilibrium yield, confusing kinetics with thermodynamics'],
                  hint: 'Review the derivation of Kc = kf/kr from the equality of rates at equilibrium (node.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' },
                { id: 'd', prompt: 'Compare the effect of a catalyst and an increase in temperature on the equilibrium 2NO₂(g) ⇌ N₂O₄(g) (exothermic). Both increase the rate of reaction.', answer: 'A catalyst increases both forward and reverse rates equally, leaving Kc and the',
                  options: ['A catalyst increases both forward and reverse rates equally, leaving Kc and the', 'both shift equilibrium', 'both change Kc', 'speeds up the reaction'],
                  hint: 'Review the derivation of Kc = kf/kr from the equality of rates at equilibrium (node.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' }
          ],
            remediations: { 'because-a-catalyst-speeds-up': { steps: ['If a student holds this misconception, guide them through this stepwise remediation: (1) Write the rate laws.', '(3) Explain that a catalyst increases both kf and kr by the same factor (since it provides a common lower-energy.', '(4) Therefore Kc = (kf × factor)/(kr × factor) = kf/kr remains constant.', '(5) Use the energy profile diagram: show that the catalyst lowers the peak for both forward and reverse reactions.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_009', difficulty: 'standard',
          question: 'According to the Arrhenius theory, an acid is a substance that dissociates.',
          hint: 'Review Class 10 neutralisation reactions (c10_chem_cbse_02_006) and the concept that.',
          misconception: 'Students often think that a Bronsted-Lowry base must contain an OH group or be negatively charged.',
          parts: [
                { id: 'a', prompt: 'State the Arrhenius definition of an acid and a base. Give one example of each that fits this definition.', answer: 'Arrhenius acid: substance that dissociates in water to give H⁺ ions (e.g., HCl)',
                  options: ['Arrhenius acid: substance that dissociates in water to give H⁺ ions (e.g., HCl)', 'gains H', 'any base must contain OH⁻, missing the limitation of the Arrhenius theory', 'a Bronsted-Lowry base must contain an OH group or be negatively charged'],
                  hint: 'Review Class 10 neutralisation reactions (c10_chem_cbse_02_006) and the concept that acids produce.',
                  misconception: 'Students often think that a Bronsted-Lowry base must contain an OH group or be negatively charged.' },
                { id: 'b', prompt: 'In the reaction NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq), identify the Bronsted-Lowry acid, base, conjugate acid, and conjugate base.', answer: 'Bronsted-Lowry acid: H₂O (donates H⁺)',
                  options: ['Bronsted-Lowry acid: H₂O (donates H⁺)', 'looks acidic', 'gains H', 'a Bronsted-Lowry base must contain an OH group or be negatively charged'],
                  hint: 'Review Class 10 neutralisation reactions (c10_chem_cbse_02_006) and the concept that acids produce.',
                  misconception: 'Students often think that a Bronsted-Lowry base must contain an OH group or be negatively charged.' },
                { id: 'c', prompt: 'Write the conjugate acid for each of the following bases: (a) H₂O, (b) CO₃²⁻, (c) HPO₄²⁻.', answer: 'H₂O, (',
                  options: ['H₂O, (', 'remove H⁺', 'add H⁺ to the base', 'gains H'],
                  hint: 'Review Class 10 neutralisation reactions (c10_chem_cbse_02_006) and the concept that acids produce.',
                  misconception: 'Students often think that a Bronsted-Lowry base must contain an OH group or be negatively charged.' }
          ],
            remediations: { 'a-bronsted-lowry-base-must': { steps: ['Write the half-reactions showing proton transfer explicitly: Acid → H⁺ + Conjugate Base; Base + H⁺ → Conjugate Acid.', 'Use a coloured arrow to track the proton (H⁺) from donor to acceptor.', 'Practice with species that are not typical: HCO₃⁻ acting as acid (→ CO₃²⁻ + H⁺) and as base (→ H₂CO₃).', 'Verify each conjugate pair differs by exactly one H⁺.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_010', difficulty: 'standard',
          question: 'Lewis acid-base theory defines acids as electron-pair acceptors and bases.',
          hint: 'Review coordinate bond formation in c9_chem_ch3_4 and Bronsted-Lowry theory.',
          misconception: 'Students think "Lewis acid = electron-deficient molecule with incomplete octet ONLY" and miss that cations (Fe³⁺.',
          parts: [
                { id: 'a', prompt: 'Define a Lewis acid and a Lewis base. Give one example of each that is NOT a Bronsted acid or base.', answer: 'A Lewis acid is an electron-pair acceptor (e.g., BF₃',
                  options: ['A Lewis acid is an electron-pair acceptor (e.g., BF₃', 'Lewis acid donates H⁺', 'Lewis acid = electron-deficient molecule with incomplete octet ONLY'],
                  hint: 'Review coordinate bond formation in c9_chem_ch3_4 and Bronsted-Lowry theory in c11_chem_cbse_07_009.',
                  misconception: 'Students think "Lewis acid = electron-deficient molecule with incomplete octet ONLY" and miss that cations (Fe³⁺, Cu²⁺), molecules with.' },
                { id: 'b', prompt: 'Compare the reaction of BF₃ with NH₃ and the reaction of H⁺ with NH₃. In what way are they similar and different according to Lewis theory?', answer: 'Both involve NH₃ donating its lone pair',
                  options: ['Both involve NH₃ donating its lone pair', 'only H⁺ is an acid', 'Lewis acid = electron-deficient molecule with incomplete octet ONLY'],
                  hint: 'Review coordinate bond formation in c9_chem_ch3_4 and Bronsted-Lowry theory in c11_chem_cbse_07_009.',
                  misconception: 'Students think "Lewis acid = electron-deficient molecule with incomplete octet ONLY" and miss that cations (Fe³⁺, Cu²⁺), molecules with.' }
          ],
            remediations: { 'lewis-acid-electron-deficient-molecule': { steps: ['Revisit c9_chem_ch3_4 (Covalent Bonding) to recall coordinate bond concept — draw arrow from donor to acceptor.', 'List species with vacant orbitals: BF₃ (sp², empty p), AlCl₃ (sp², empty p), Fe³⁺ (empty d), H⁺ (no electrons), CO₂.', 'List species with lone pairs: NH₃, H₂O, OH⁻, F⁻, Cl⁻, CO.', 'Practice 5 reactions matching acid to base, drawing adducts with coordinate bond arrows.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_011', difficulty: 'standard',
          question: 'The ionisation constant of a weak acid (Ka) is the equilibrium constant for its.',
          hint: 'Review c11_chem_cbse_07_003 (Law of Chemical Equilibrium) — specifically the rule for.',
          misconception: 'Students write the base ionisation equilibrium as B + H₂O ⇌ BH⁺ + OH⁻ but then write Kb = [BH⁺][OH⁻]/([B][H₂O]).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The ionisation constant of a weak acid (Ka) is the equilibrium constant for its partial',
                  options: ['The ionisation constant of a weak acid (Ka) is the equilibrium constant for its partial', 'Equilibrium in physical processes is a dynamic state in a closed system where opposing', 'Dynamic equilibrium in a chemical process is a state in a reversible reaction where the', 'The Law of Chemical Equilibrium states that for a reversible reaction at constant'],
                  hint: 'Review c11_chem_cbse_07_003 (Law of Chemical Equilibrium) — specifically the rule for writing.',
                  misconception: 'Students write the base ionisation equilibrium as B + H₂O ⇌ BH⁺ + OH⁻ but then write Kb = [BH⁺][OH⁻]/([B][H₂O]), including water.' }
          ],
            remediations: { 'students-write-the-base-ionisation': { steps: ['Revisit the definition of equilibrium constant Kc from c11_chem_cbse_07_003 — emphasise that pure liquids (solvents).', 'Write the ionisation of NH₃ two ways: (a) NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ and (b) NH₃ ⇌ NH₄⁺ + OH⁻ (with water implied).', 'Do a numerical comparison: calculate Kb for 0.1 M NH₃ (pH=11.1) both ways — with and without [H₂O] — to see the 55.5.', 'Memorise the rule: "In aqueous acid/base ionisation, water is the solvent — never appears in Ka/Kb expression."'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_012', difficulty: 'standard',
          question: 'The pH scale is a logarithmic measure of hydrogen ion concentration in aqueous.',
          hint: 'Revisit c11_chem_cbse_07_011 for Ka/Kb concepts and ICE table method; review Class 10.',
          misconception: 'Students apply pH = -log[H⁺] mechanically to very dilute strong acids (e.g., 10⁻⁸ M HCl → pH 8) ignoring water.',
          parts: [
                { id: 'a', prompt: 'A student measures the pH of 0.01 M HCl and 0.01 M CH₃COOH (Ka = 1.8 × 10⁻⁵) at 298 K.', answer: '0.01 M HCl has lower pH (pH = 2.00) than 0.01 M CH₃COOH (pH ≈ 3.37)',
                  options: ['0.01 M HCl has lower pH (pH = 2.00) than 0.01 M CH₃COOH (pH ≈ 3.37)', 'same pH because same concentration'],
                  hint: 'Revisit c11_chem_cbse_07_011 for Ka/Kb concepts and ICE table method; review Class 10 logarithms.',
                  misconception: 'Students apply pH = -log[H⁺] mechanically to very dilute strong acids (e.g., 10⁻⁸ M HCl → pH 8) ignoring water autoionization.' },
                { id: 'b', prompt: 'For a 0.10 M NH₃ solution (Kb = 1.8 × 10⁻⁵), a student writes the equilibrium as NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ and sets up: Kb = x²/(0.10 - x).', answer: 'Yes, the approximation is valid',
                  options: ['Yes, the approximation is valid', 'not valid, must use quadratic'],
                  hint: 'Revisit c11_chem_cbse_07_011 for Ka/Kb concepts and ICE table method; review Class 10 logarithms.',
                  misconception: 'Students apply pH = -log[H⁺] mechanically to very dilute strong acids (e.g., 10⁻⁸ M HCl → pH 8) ignoring water autoionization.' }
          ],
            remediations: { 'students-apply-ph-log-h': { steps: ['If a student gives pH > 7 for dilute strong acid: have them calculate [H⁺] from water alone (10⁻⁷ M) and compare.', 'Ask: "Can adding acid make a solution basic?" For 5% rule errors: give a weak acid where approximation fails (e.g.', 'For buffer dilution errors: make them calculate moles of each component, then divide by total volume.', 'For salt hydrolysis: create a flowchart: "Identify cation/anion → check if conjugate of weak acid/base → write.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
