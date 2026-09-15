import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch07_p1: SimDef = {
    id: 'v3_c11_chem_ch07_p1',
    title: 'Equilibrium · Part 1/3',
    subtitle: 'See why equilibrium means equal rates — and why Kc ignores concentration shoves.',
    classLevel: 11, subject: 'chemistry', topic: 'Equilibrium · Part 1/3',
    chapters: ['c11_chem_ch07'],
    nodeIds: ['c11_chem_cbse_07_001', 'c11_chem_cbse_07_002', 'c11_chem_cbse_07_003', 'c11_chem_cbse_07_004', 'c11_chem_cbse_07_005', 'c11_chem_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reaction engineer steering a reversible process', intro: 'The reaction looks finished; the molecules disagree. Prove the traffic still runs both ways.', goal: 'Describe dynamic equilibrium and distinguish the equilibrium position from the equilibrium constant.' },
    discovery: {
        question: 'A sealed bottle of soda never \'finishes\' reacting — the reaction just seems to stop. What is really happening?',
        options: ['Forward and reverse reactions run at equal rates', 'All reactants are used up', 'The catalyst deactivates', 'Temperature drops to zero reaction'],
        answer: 'Forward and reverse reactions run at equal rates',
        hook: 'Equilibrium is not stillness — it is two rivers flowing in opposite directions at exactly the same speed.',
    },
    teaching: [
        { title: 'Equilibrium in Physical Processes', text: 'Equilibrium in physical processes is a dynamic state in a closed system where opposing physical changes (such as melting/freezing, evaporation/condensation, or sublimation/deposition) occur at equal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_07_001', title: 'Your mission',
          mission: { widget: 'titrate', validate: 'titrate:drops=50',
            instruction: 'On the lab: add titrant slowly — find the endpoint where the colour flips.',
        context: 'Add more reactant — which way does the balance shift?',
            observePrompt: 'What did the titrate interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_001', title: 'Equilibrium in Physical Processes',
          scaffold: { problem: 'A sealed 2.0 L flask contains liquid water and water vapour at equilibrium at 30°C. The vapour pressure of water at 30°C is 4.24 kPa.',
            steps: [
            { text: 'Identify the equilibrium: H₂O(l) ⇌ H₂O(g) at 30°C in a closed system.' },
            { text: 'Use ideal gas law to find moles of vapour in 2.0 L: n = PV/RT = (4240 Pa × 0.002 m³) / (8.314 × 303) = 0.00336 mol.' },
            { text: 'Calculate mass: m = n × M = 0.00336 mol × 18.0 g/mol = 0.0605 g.' },
            { text: 'When volume doubles to 4.0 L at same T, vapour pressure initially drops, so evaporation rate > condensation rate until.' },
            { text: 'New moles at equilibrium: n\' = P(2V)/RT = 2 × 0.00336 = 0.00672 mol. New mass = 0.00672 × 18.0 = 0.121 g.', faded: true, blankAnswer: 'Initial vapour mass = 0.0605 g; After volume doubling.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_002', title: 'Equilibrium in Chemical Processes: Dynamic Equilibrium',
          scaffold: { problem: 'In a 2.0 L vessel, 0.80 mol N₂ and 1.20 mol H₂ are allowed to react: N₂(g) + 3H₂(g) ⇌ 2NH₃(g). At equilibrium, 0.40 mol NH₃ is found.',
            steps: [
            { text: 'Convert initial moles to concentrations: [N₂]₀ = 0.80/2.0 = 0.40 M, [H₂]₀ = 1.20/2.0 = 0.60 M, [NH₃]₀ = 0 M.' },
            { text: 'Set up ICE table. Change: NH₃ increases by 0.40/2.0 = 0.20 M. From stoichiometry, N₂ decreases by 0.10 M (1:2 ratio).' },
            { text: 'Equilibrium concentrations: [N₂] = 0.40 - 0.10 = 0.30 M, [H₂] = 0.60 - 0.30 = 0.30 M, [NH₃] = 0.20 M.' },
            { text: 'Verify forward direction: NH₃ formed from zero, so net reaction proceeded forward.' },
            { text: 'Confirm dynamic equilibrium: all concentrations constant > 0, both forward and reverse reactions occurring at equal.', faded: true, blankAnswer: '[N₂] = 0.30 M, [H₂] = 0.30 M, [NH₃] = 0.20 M; equilibrium.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_003', title: 'Law of Chemical Equilibrium: Equilibrium Constant Kc',
          scaffold: { problem: 'In the contact process for sulfuric acid production, the key equilibrium is 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).',
            steps: [
            { text: 'Convert moles to molar concentrations: [SO₂] = 0.40/2.0 = 0.20 M, [O₂] = 0.20/2.0 = 0.10 M, [SO₃] = 0.60/2.0 = 0.30 M' },
            { text: 'Write Kc expression from balanced equation: Kc = [SO₃]² / ([SO₂]²[O₂]) - all species gaseous, all included' },
            { text: 'Substitute equilibrium concentrations: Kc = (0.30)² / ((0.20)² × 0.10) = 0.09 / (0.04 × 0.10) = 0.09 / 0.004 = 22.5' },
            { text: 'Determine units: Δn = 2 - (2+1) = -1, so units = M⁻¹ = L mol⁻¹. Kc = 22.5 L mol⁻¹' },
            { text: 'Address volume change: Kc depends ONLY on temperature. At constant 700 K, Kc remains 22.5 L mol⁻¹ regardless.' },
            { text: 'Verify by calculating new concentrations at 1.0 L: [SO₂] = 0.40 M, [O₂] = 0.20 M, [SO₃] = 0.60 M.', faded: true, blankAnswer: 'Kc = 22.5 L mol⁻¹ (or M⁻¹) at 700 K. After compression.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_004', title: 'Relationship Between Kp and Kc',
          scaffold: { problem: 'For the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), Kc = 2.5 × 10¹⁰ M⁻¹ at 500 K. Calculate Kp. (Use R = 0.0831 L·bar·K⁻¹·mol⁻¹)',
            steps: [
            { text: 'Write the balanced equation and identify gaseous species: all are gases.' },
            { text: 'Calculate Δn_g = (coefficient of SO₃) – (coefficient of SO₂ + coefficient of O₂) = 2 – (2 + 1) = –1.' },
            { text: 'Write the Kp–Kc relationship: Kp = Kc (RT)^(Δn_g).' },
            { text: 'Substitute values: Kp = (2.5 × 10¹⁰) × (0.0831 × 500)^(–1) = (2.5 × 10¹⁰) / (41.55) ≈ 6.02 × 10⁸ bar⁻¹.' },
            { text: 'Check units: Kc has M⁻¹ = (mol/L)⁻¹ = L/mol; (RT) has units L·bar/mol; (RT)^(–1) has mol/(L·bar).', faded: true, blankAnswer: 'Kp ≈ 6.02 × 10⁸ bar⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_005', title: 'Reaction Quotient Q: Predicting Direction',
          scaffold: { problem: 'For the reaction 2NO(g) + O₂(g) ⇌ 2NO₂(g), Kc = 1.2 × 10³ at 500 K.',
            steps: [
            { text: 'Write the balanced equation and identify stoichiometric coefficients: 2 for NO, 1 for O₂, 2 for NO₂.' },
            { text: 'Write the Qc expression using coefficients as exponents: Qc = [NO₂]² / ([NO]²[O₂]).' },
            { text: 'Substitute the given instantaneous concentrations: Qc = (0.5)² / ((0.02)² × 0.01) = 0.25 / (0.0004 × 0.01) = 0.25.' },
            { text: 'Compare Qc with Kc: Qc = 62,500, Kc = 1,200. Since Qc > Kc, the reaction will proceed in the reverse direction (toward.' },
            { text: 'Verify: Qc > Kc means product concentration is too high relative to reactants; reverse reaction consumes NO₂ and.', faded: true, blankAnswer: 'Qc = 6.25 × 10⁴; reaction proceeds in reverse direction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_006', title: 'Le Chatelier\'s Principle: Effect of Concentration',
          scaffold: { problem: 'In the Contact process for sulfuric acid production, the key equilibrium is 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) with Kc = 280 at 700 K.',
            steps: [
            { text: 'Calculate initial equilibrium concentrations: [SO₂] = 2.0/10 = 0.20 M, [O₂] = 1.0/10 = 0.10 M, [SO₃] = 4.0/10 = 0.40 M.' },
            { text: 'Write balanced equation: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), Kc = 280 at 700 K. Volume = 10 L constant.' },
            { text: 'Initial equilibrium (before injection): Let moles be n_SO₂ = 1.0, n_O₂ = 0.5, n_SO₃ = 5.29 (chosen so Kc=280).' },
            { text: 'After injecting 2.0 mol SO₂: new n_SO₂ = 4.0 mol → [SO₂] = 0.40 M (instant).' },
            { text: 'Calculate Qc = (1.058)²/((0.40)² × 0.10) = 1.12/(0.16 × 0.10) = 1.12/0.016 = 70.' },
            { text: 'ICE table (concentrations): Initial: 0.40, 0.10, 1.058; Change: -2x, -x, +2x; Equilibrium: 0.40-2x, 0.10-x, 1.058+2x.' },
            { text: 'Solve: Since Kc is large, x is significant. Try x=0.05: num=(1.158)²=1.34, den=(0.30)²×0.05=0.0045, ratio=298 ≈ 280.' },
            { text: 'Verify: Original SO₃ = 10.58 mol, new = 11.56 mol → increase of 0.98 mol.', faded: true, blankAnswer: 'New equilibrium moles: SO₂ ≈ 3.02 mol, O₂ ≈ 0.51 mol, SO₃ ≈.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a science-club demo you show a sealed bottle of fizzy drink: no bubbles rise, the liquid looks still. A first-year says: \'At equilibrium the CO2 has stopped escaping — the reaction is finished, nothing is moving any more.\'',
            decisions: [{ prompt: 'What is actually happening inside the sealed bottle?', options: [
                { text: 'A dynamic equilibrium: CO2 molecules are dissolving into the liquid and escaping into the headspace at equal rates — that\'s why pressure stays constant yet the process never stops. The stillness is macroscopic; molecular traffic across the interface continues nonstop. Open the cap and the balance breaks — hence the sudden fizz.', outcome: 'Equilibrium means equal opposing rates, not zero activity; constant vapour pressure is the signature of continuous molecular exchange.' },
                { text: 'The first-year is right — equilibrium means all molecular motion across the surface has ceased.', outcome: 'That confuses \'no net change\' with \'no process\'; at equilibrium evaporation and condensation (or dissolving and escaping) both run at equal nonzero rates.', reveals: 'equilibrium-means-static' },
                { text: 'The gas is \'trapped\' permanently — it will never come out even when opened.', outcome: 'Equilibrium holds only while the bottle stays closed at constant temperature; opening it removes the opposing condensation side and CO2 rushes out.', reveals: 'sealed-equilibrium-is-permanent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Kc, Kp, Le Chatelier — you now predict which way a reaction runs before it even starts.',
            decisions: [{ prompt: 'What comes next? Equilibrium · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Equilibrium · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'titrate', prompt: 'Explore the titrate interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'titrate', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_001', difficulty: 'standard',
          question: 'Equilibrium in physical processes is a dynamic state in a closed system where.',
          hint: 'If stuck, revisit Class 8 "Particle Arrangement and Movement in Liquids/Gases".',
          misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no.',
          parts: [
                { id: 'a', prompt: 'A student places 50 g of ice and 50 g of water in a perfectly insulated, sealed container at 0°C and 1 atm.', answer: 'The masses of ice and water will remain 50 g each',
                  options: ['The masses of ice and water will remain 50 g each', 'all ice melts', 'all water freezes', 'reaction stops'],
                  hint: 'If stuck, revisit Class 8 "Particle Arrangement and Movement in Liquids/Gases" (c8_chem_ch2_7.',
                  misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no molecules cross the.' }
          ],
            remediations: { 'at-physical-equilibrium': { steps: ['**Visual demonstration:** Show a sealed syringe with water at room temperature — pull plunger to create vacuum, watch.', 'Ask: "Did evaporation stop when colour/volume stabilized?" 2.', '**Molecular animation:** Use PhET "States of Matter" simulation — show molecules leaving and entering liquid surface.', 'Count leaving vs entering per 10 seconds.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no.',
          parts: [
                { id: 'a', prompt: 'A student claims: "At liquid-vapour equilibrium, the rate of evaporation equals the rate of condensation, so the vapour pressure becomes zero because no net.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'net rate = 0', 'individual rates = 0', 'evaporation stops'],
                  hint: 'If stuck, revisit Class 8 "Particle Arrangement and Movement in Liquids/Gases" (c8_chem_ch2_7.',
                  misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no molecules cross the.' },
                { id: 'b', prompt: 'Design a simple experiment using household items (pressure cooker, water, thermometer, stopwatch) to demonstrate that the boiling point of water increases with.', answer: '**Procedure:** (1) Heat 200 mL water in an open pan',
                  options: ['**Procedure:** (1) Heat 200 mL water in an open pan', 'evaporation stops', 'no molecules cross the interface', 'rate of evaporation = rate of condensation'],
                  hint: 'If stuck, revisit Class 8 "Particle Arrangement and Movement in Liquids/Gases" (c8_chem_ch2_7.',
                  misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no molecules cross the.' }
          ],
            remediations: { 'at-physical-equilibrium': { steps: ['**Visual demonstration:** Show a sealed syringe with water at room temperature — pull plunger to create vacuum, watch.', 'Ask: "Did evaporation stop when colour/volume stabilized?" 2.', '**Molecular animation:** Use PhET "States of Matter" simulation — show molecules leaving and entering liquid surface.', 'Count leaving vs entering per 10 seconds.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_002', difficulty: 'standard',
          question: 'Dynamic equilibrium in a chemical process is a state in a reversible reaction.',
          hint: 'Review Class 10 balancing of chemical equations (c10_chem_cbse_01_002) and the reversible.',
          misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal.',
          parts: [
                { id: 'a', prompt: 'In the reversible reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at equilibrium in a closed container, which statement is correct? (a) The forward reaction has stopped.', answer: 'Correct: (c) The rate of formation of NH₃ equals the rate of its decomposition',
                  options: ['Correct: (c) The rate of formation of NH₃ equals the rate of its decomposition', 'equilibrium', 'equilibrium means 50% reactants, 50% products', 'equal rates'],
                  hint: 'Review Class 10 balancing of chemical equations (c10_chem_cbse_01_002) and the reversible arrow.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g).' },
                { id: 'b', prompt: 'A student writes: "At equilibrium, the reaction N₂O₄(g) ⇌ 2NO₂(g) has no net change because all N₂O₄ molecules have converted to NO₂." Explain why this.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'equilibrium', 'reaction goes to completion', 'equilibrium means 50% reactants, 50% products'],
                  hint: 'Review Class 10 balancing of chemical equations (c10_chem_cbse_01_002) and the reversible arrow.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g).' },
                { id: 'c', prompt: 'For the equilibrium H₂(g) + I₂(g) ⇌ 2HI(g), initially 1.0 mol H₂ and 1.0 mol I₂ are placed in a 10 L vessel. At equilibrium, 0.6 mol of HI is found.', answer: 'Initial: [H₂] = 0.1 M, [I₂] = 0.1 M, [HI] = 0 M',
                  options: ['Initial: [H₂] = 0.1 M, [I₂] = 0.1 M, [HI] = 0 M', 'equilibrium means 50% reactants, 50% products', 'equal rates', 'equal concentrations'],
                  hint: 'Review Class 10 balancing of chemical equations (c10_chem_cbse_01_002) and the reversible arrow.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g).' },
                { id: 'd', prompt: 'Compare the equilibrium in a saturated NaCl solution (solid NaCl ⇌ Na⁺(aq) + Cl⁻(aq)) with the gas-phase equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).', answer: 'Similarities: (1) Both are dynamic',
                  options: ['Similarities: (1) Both are dynamic', 'equilibrium means 50% reactants, 50% products', 'equal rates', 'equal concentrations'],
                  hint: 'Review Class 10 balancing of chemical equations (c10_chem_cbse_01_002) and the reversible arrow.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g).' }
          ],
            remediations: { 'equilibrium-means-50-reactants': { steps: ['Draw a concentration vs time graph for A ⇌ B starting with pure A — show curves approaching different plateau levels.', 'Emphasize "rate = k[A]" vs "rate = k\'[B]" — at equilibrium k[A] = k\'[B], so [B]/[A] = k/k\' = Kc, not 1.', 'Use the "dance floor" analogy: 10 couples dancing (forward) and 10 couples leaving (reverse) — total on floor constant.', 'Practice with ICE tables where equilibrium concentrations are clearly unequal.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_003', difficulty: 'standard',
          question: 'The Law of Chemical Equilibrium states that for a reversible reaction.',
          hint: 'If stuck on Kc expressions, revisit c11_chem_cbse_07_002 (dynamic equilibrium) and.',
          misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write.',
          parts: [
                { id: 'a', prompt: 'Write the Kc expression for the equilibrium: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g). State the units of Kc for this reaction.', answer: 'Kc = [SO₃]² / ([SO₂]²[O₂])',
                  options: ['Kc = [SO₃]² / ([SO₂]²[O₂])', 'no units'],
                  hint: 'If stuck on Kc expressions, revisit c11_chem_cbse_07_002 (dynamic equilibrium) and.',
                  misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc = [CaO][CO₂]/[CaCO₃]).' },
                { id: 'b', prompt: 'Compare the Kc expressions for these two equilibria at the same temperature: (1) 2NO₂(g) ⇌ N₂O₄(g) (2) NO₂(g) ⇌ ½N₂O₄(g) If Kc₁ = 4.0 M⁻¹ for reaction (1).', answer: 'Kc₁ = [N₂O₄]/[NO₂]² = 4.0 M⁻¹',
                  options: ['Kc₁ = [N₂O₄]/[NO₂]² = 4.0 M⁻¹', 'no units'],
                  hint: 'If stuck on Kc expressions, revisit c11_chem_cbse_07_002 (dynamic equilibrium) and.',
                  misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc = [CaO][CO₂]/[CaCO₃]).' }
          ],
            remediations: { 'students-write-kc-expressions-including': { steps: ['Identify phases of all species - circle (s), (l), (g), (aq).', 'Cross out all pure solids and pure liquids from the Kc expression.', 'Write Kc with only (g) and (aq) species.', 'Calculate Δn = Σn_gas(products) - Σn_gas(reactants).'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_004', difficulty: 'standard',
          question: 'The relationship between Kp (equilibrium constant in terms of partial.',
          hint: 'If stuck, review node c11_chem_cbse_07_003 for Kc expressions and Class 11 Physics.',
          misconception: 'Students often calculate Δn_g as (total product coefficients) – (total reactant coefficients) including solids.',
          parts: [
                { id: 'a', prompt: 'Compare the effect of increasing total pressure on the equilibrium position for the two reactions in Question 2, using the Kp–Kc relationship to justify your.', answer: 'For H₂+I₂⇌2HI (Δn_g=0), Kp=Kc and is pressure‑independent',
                  options: ['For H₂+I₂⇌2HI (Δn_g=0), Kp=Kc and is pressure‑independent', 'Kp changes with pressure'],
                  hint: 'If stuck, review node c11_chem_cbse_07_003 for Kc expressions and Class 11 Physics chapter.',
                  misconception: 'Students often calculate Δn_g as (total product coefficients) – (total reactant coefficients) including solids, liquids, and aqueous.' }
          ],
            remediations: { 'students-often-calculate-n-g': { steps: ['Re‑read the definition of equilibrium constant: only gaseous and aqueous species appear in Kp/Kc; pure solids/liquids.', 'Practice identifying gaseous species in five different equilibria and computing Δn_g each time.', 'Memorise the two common R values: 0.0831 L·bar·K⁻¹·mol⁻¹ and 0.0821 L·atm·K⁻¹·mol⁻¹, and always match the pressure unit.', 'Solve three numerical problems where Δn_g is positive, negative, and zero, checking that Kp = Kc when Δn_g = 0.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_005', difficulty: 'standard',
          question: 'The reaction quotient (Q) is the ratio of the product of molar concentrations.',
          hint: 'If stuck, revisit c11_chem_cbse_07_003 (Equilibrium Constant) and practice writing Kc/Kp.',
          misconception: 'Students often write Q = [products]/[reactants] without raising concentrations to stoichiometric powers, e.g., for N₂.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The reaction quotient (Q) is the ratio of the product of molar concentrations (or partial',
                  options: ['The reaction quotient (Q) is the ratio of the product of molar concentrations (or partial', 'Equilibrium in physical processes is a dynamic state in a closed system where opposing', 'Dynamic equilibrium in a chemical process is a state in a reversible reaction where the', 'The Law of Chemical Equilibrium states that for a reversible reaction at constant'],
                  hint: 'If stuck, revisit c11_chem_cbse_07_003 (Equilibrium Constant) and practice writing Kc/Kp.',
                  misconception: 'Students often write Q = [products]/[reactants] without raising concentrations to stoichiometric powers, e.g., for N₂ + 3H₂ ⇌ 2NH₃ they.' }
          ],
            remediations: { 'students-often-write-q-products': { steps: ['Have the student write the balanced equation and circle each coefficient.', 'Write the Q expression template: Q = (products)^coefficients / (reactants)^coefficients.', 'Practice with 3 reactions of increasing complexity: (a) H₂ + I₂ ⇌ 2HI, (b) 2NO₂ ⇌ N₂O₄, (c) N₂ + 3H₂ ⇌ 2NH₃.', 'For each, plug in numbers and calculate.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_006', difficulty: 'standard',
          question: 'Le Chatelier\'s Principle states that when a system at equilibrium is subjected.',
          hint: 'If stuck, revisit node c11_chem_cbse_07_005 (Reaction Quotient Q) and practice.',
          misconception: 'Students believe that when a reactant is added, the equilibrium shifts forward and the concentration of that reactant.',
          parts: [
                { id: 'a', prompt: 'Consider two equilibria at the same temperature: (1) A(g) + B(g) ⇌ C(g) with Kc = 10, and (2) 2A(g) + 2B(g) ⇌ 2C(g) with Kc\' = 100.', answer: 'System (1): Initial equilibrium: [A]=0.5, [B]=0.5, [C]=0.5',
                  options: ['System (1): Initial equilibrium: [A]=0.5, [B]=0.5, [C]=0.5', 'shifts are equal'],
                  hint: 'If stuck, revisit node c11_chem_cbse_07_005 (Reaction Quotient Q) and practice calculating Qc vs.',
                  misconception: 'Students believe that when a reactant is added, the equilibrium shifts forward and the concentration of that reactant returns to its.' }
          ],
            remediations: { 'when-a-reactant-is-added': { steps: ['To fix this: (1) Take a simple equilibrium A ⇌ B with Kc = 2.', 'Start with [A]=1, [B]=2 at equilibrium.', '(2) Add 1 M of A → instant [A]=2, [B]=2, Q=1 < 2.', '(3) Let x react: new eq [A]=2-x, [B]=2+x.'], labTask: { instruction: 'On the interactive: add titrant slowly — find the endpoint where the colour flips — then check.', widget: 'titrate', validate: 'titrate:drops=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
