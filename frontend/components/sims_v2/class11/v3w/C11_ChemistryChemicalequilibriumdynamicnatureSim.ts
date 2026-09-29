import type { SimDef } from '../../engine/types';
import C11_ChemistryChemicalequilibriumdynamicnatureSim from '../../../simulations/c6_12/C11_ChemistryChemicalequilibriumdynamicnatureSim';

/** v3 wrapped master — C11_ChemistryChemicalequilibriumdynamicnatureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistrychemicalequilibriumdynamicnaturesim: SimDef = {
    id: 'v3w_c11_chemistrychemicalequilibriumdynamicnaturesim',
    title: 'Equilibrium in Chemical Processes: Dynamic Equilibrium',
    subtitle: 'Covers: reversible reactions, dynamic nature, macroscopic constancy vs microscopic.',
    classLevel: 11, subject: 'chemistry', topic: 'Equilibrium in Chemical Processes: Dynamic Equilibrium',
    chapters: [],
    nodeIds: ['c11_chem_cbse_07_002', 'c11_chem_cbse_07_001', 'c11_chem_cbse_05_012', 'c11_chem_cbse_07_003', 'c11_chem_cbse_07_004', 'c11_chem_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a saturated sugar solution in a glass with undissolved crystals at the bottom — the amount of.', goal: 'Master Equilibrium in Chemical Processes: Dynamic Equilibrium.' },
    discovery: {
        question: 'In the reversible reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at equilibrium in a closed container, which statement is correct? (a) The forward reaction has stopped.',
        options: ['Correct: (c) The rate of formation of NH₃ equals the rate of its decomposition', 'equilibrium', 'equilibrium means 50% reactants, 50% products'],
        answer: 'Correct: (c) The rate of formation of NH₃ equals the rate of its decomposition',
        hook: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal.',
    },
    teaching: [
        { title: 'Dynamic equilibrium in a chemical process is.', text: 'Dynamic equilibrium in a chemical process is a state in a reversible reaction where the rate of the forward reaction equals the rate of the reverse reaction, resulting in no net change in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_002', title: 'Dynamic equilibrium in a chemical.',
          scaffold: { problem: 'In a 2.0 L vessel, 0.80 mol N₂ and 1.20 mol H₂ are allowed to react: N₂(g) + 3H₂(g) ⇌ 2NH₃(g). At equilibrium, 0.40 mol NH₃ is found.',
            steps: [
            { text: 'Convert initial moles to concentrations: [N₂]₀ = 0.80/2.0 = 0.40 M, [H₂]₀ = 1.20/2.0 = 0.60 M, [NH₃]₀ = 0 M.' },
            { text: 'Set up ICE table. Change: NH₃ increases by 0.40/2.0 = 0.20 M. From stoichiometry, N₂ decreases by 0.10 M (1:2 ratio),.' },
            { text: 'Equilibrium concentrations: [N₂] = 0.40 - 0.10 = 0.30 M, [H₂] = 0.60 - 0.30 = 0.30 M, [NH₃] = 0.20 M.' },
            { text: 'Verify forward direction: NH₃ formed from zero, so net reaction proceeded forward.' },
            { text: 'Confirm dynamic equilibrium: all concentrations constant > 0, both forward and reverse reactions occurring at equal.', faded: true, blankAnswer: '[N₂] = 0.30 M, [H₂] = 0.30 M, [NH₃] = 0.20 M; equilibrium.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_001', title: 'Equilibrium in physical processes is a.',
          scaffold: { problem: 'A sealed 2.0 L flask contains liquid water and water vapour at equilibrium at 30°C. The vapour pressure of water at 30°C is 4.24 kPa.',
            steps: [
            { text: 'Identify the equilibrium: H₂O(l) ⇌ H₂O(g) at 30°C in a closed system.' },
            { text: 'Use ideal gas law to find moles of vapour in 2.0 L: n = PV/RT = (4240 Pa × 0.002 m³) / (8.314 × 303) = 0.00336 mol.' },
            { text: 'Calculate mass: m = n × M = 0.00336 mol × 18.0 g/mol = 0.0605 g.' },
            { text: 'When volume doubles to 4.0 L at same T, vapour pressure initially drops, so evaporation rate > condensation rate until.' },
            { text: 'New moles at equilibrium: n\' = P(2V)/RT = 2 × 0.00336 = 0.00672 mol. New mass = 0.00672 × 18.0 = 0.121 g.', faded: true, blankAnswer: 'Initial vapour mass = 0.0605 g; After volume doubling:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_012', title: 'Vapour pressure is the pressure exerted.',
          scaffold: { problem: 'At 298 K, the vapour pressures of four liquids are: water = 3.17 kPa, ethanol = 7.88 kPa, acetone = 30.3 kPa, diethyl ether = 58.9 kPa.',
            steps: [
            { text: 'Recall that vapour pressure is inversely related to intermolecular force strength at constant temperature.' },
            { text: 'Rank the given vapour pressures from lowest to highest: water (3.17 kPa) < ethanol (7.88 kPa) < acetone (30.3 kPa) <.' },
            { text: 'Therefore, intermolecular force strength increases in the reverse order: diethyl ether < acetone < ethanol < water.' },
            { text: 'Identify dominant forces: diethyl ether - dipole-dipole + London (no H-bonding donor); acetone - dipole-dipole + London.' },
            { text: 'Verify consistency: Water\'s 3D H-bond network is strongest, giving lowest vapour pressure.', faded: true, blankAnswer: 'Order of increasing intermolecular force strength: diethyl.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_003', title: 'The Law of Chemical Equilibrium states.',
          scaffold: { problem: 'In the contact process for sulfuric acid production, the key equilibrium is 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).',
            steps: [
            { text: 'Convert moles to molar concentrations: [SO₂] = 0.40/2.0 = 0.20 M, [O₂] = 0.20/2.0 = 0.10 M, [SO₃] = 0.60/2.0 = 0.30 M' },
            { text: 'Write Kc expression from balanced equation: Kc = [SO₃]² / ([SO₂]²[O₂]) - all species gaseous, all included' },
            { text: 'Substitute equilibrium concentrations: Kc = (0.30)² / ((0.20)² × 0.10) = 0.09 / (0.04 × 0.10) = 0.09 / 0.004 = 22.5' },
            { text: 'Determine units: Δn = 2 - (2+1) = -1, so units = M⁻¹ = L mol⁻¹. Kc = 22.5 L mol⁻¹' },
            { text: 'Address volume change: Kc depends ONLY on temperature. At constant 700 K, Kc remains 22.5 L mol⁻¹ regardless of.' },
            { text: 'Verify by calculating new concentrations at 1.0 L: [SO₂] = 0.40 M, [O₂] = 0.20 M, [SO₃] = 0.60 M.', faded: true, blankAnswer: 'Kc = 22.5 L mol⁻¹ (or M⁻¹) at 700 K. After compression to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_004', title: 'The relationship between Kp.',
          scaffold: { problem: 'For the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), Kc = 2.5 × 10¹⁰ M⁻¹ at 500 K. Calculate Kp. (Use R = 0.0831 L·bar·K⁻¹·mol⁻¹)',
            steps: [
            { text: 'Write the balanced equation and identify gaseous species: all are gases.' },
            { text: 'Calculate Δn_g = (coefficient of SO₃) – (coefficient of SO₂ + coefficient of O₂) = 2 – (2 + 1) = –1.' },
            { text: 'Write the Kp–Kc relationship: Kp = Kc (RT)^(Δn_g).' },
            { text: 'Substitute values: Kp = (2.5 × 10¹⁰) × (0.0831 × 500)^(–1) = (2.5 × 10¹⁰) / (41.55) ≈ 6.02 × 10⁸ bar⁻¹.' },
            { text: 'Check units: Kc has M⁻¹ = (mol/L)⁻¹ = L/mol; (RT) has units L·bar/mol; (RT)^(–1) has mol/(L·bar).', faded: true, blankAnswer: 'Kp ≈ 6.02 × 10⁸ bar⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_008', title: 'A catalyst is a substance that.',
          scaffold: { problem: 'For the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) at 700 K, Kp = 1.2 × 10² atm⁻¹.',
            steps: [
            { text: 'Write the balanced equation and ICE table in terms of moles. Let x = moles of O₂ reacted.' },
            { text: 'Equilibrium moles: n(SO₂) = 2.0 - 2x, n(O₂) = 1.0 - x, n(SO₃) = 2x. Total moles = 3.0 - x.' },
            { text: 'Express partial pressures: P_i = (n_i / n_total) × P_total. But P_total is not given; use Kp expression in terms of.' },
            { text: 'Since volume and temperature are constant, P_total = n_total RT/V.' },
            { text: 'Calculate numerical value: RT/V = (0.0821×700)/10 = 5.747 atm/mol.' },
            { text: 'The same calculation applies without catalyst because Kp, T, V, initial moles are identical.', faded: true, blankAnswer: 'Equilibrium partial pressure of SO₃ = 10.9 atm in both.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_07_001', title: 'Identify each idea',
          dissect: { specimen: 'Equilibrium in Chemical Processes: Dynamic Equilibrium', spots: [
            { id: 's1', label: 'Dynamic equilibrium in a chemical', prompt: 'Which idea is this? — Dynamic equilibrium in a chemical process is a state in a reversible reaction where the.', answer: 'Dynamic equilibrium in a chemical', options: ['Dynamic equilibrium in a chemical', 'Equilibrium in physical processes is', 'Vapour pressure is the pressure', 'The Law of Chemical Equilibrium'] },
            { id: 's2', label: 'Equilibrium in physical processes is', prompt: 'Which idea is this? — Equilibrium in physical processes is a dynamic state in a closed system where opposing.', answer: 'Equilibrium in physical processes is', options: ['Equilibrium in physical processes is', 'Dynamic equilibrium in a chemical', 'Vapour pressure is the pressure', 'The Law of Chemical Equilibrium'] },
            { id: 's3', label: 'Vapour pressure is the pressure', prompt: 'Which idea is this? — Vapour pressure is the pressure exerted by the vapours of a liquid when they are in.', answer: 'Vapour pressure is the pressure', options: ['Vapour pressure is the pressure', 'Dynamic equilibrium in a chemical', 'Equilibrium in physical processes is', 'The Law of Chemical Equilibrium'] },
            { id: 's4', label: 'The Law of Chemical Equilibrium', prompt: 'Which idea is this? — The Law of Chemical Equilibrium states that for a reversible reaction at constant.', answer: 'The Law of Chemical Equilibrium', options: ['The Law of Chemical Equilibrium', 'Dynamic equilibrium in a chemical', 'Equilibrium in physical processes is', 'Vapour pressure is the pressure'] },
            { id: 's5', label: 'The relationship between Kp equilibrium', prompt: 'Which idea is this? — The relationship between Kp (equilibrium constant in terms of partial pressures) and Kc.', answer: 'The relationship between Kp equilibrium', options: ['The relationship between Kp equilibrium', 'Dynamic equilibrium in a chemical', 'Equilibrium in physical processes is', 'Vapour pressure is the pressure'] },
            { id: 's6', label: 'A catalyst is a substance', prompt: 'Which idea is this? — A catalyst is a substance that increases the rate of both the forward and reverse.', answer: 'A catalyst is a substance', options: ['A catalyst is a substance', 'Dynamic equilibrium in a chemical', 'Equilibrium in physical processes is', 'Vapour pressure is the pressure'] }
          ] } }
    ],
    explore: { component: C11_ChemistryChemicalequilibriumdynamicnatureSim, prompt: 'Explore the interactive — Equilibrium in Chemical Processes: Dynamic Equilibrium' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_002', difficulty: 'standard',
          question: 'Dynamic equilibrium in a chemical process is a state in a reversible reaction.',
          hint: 'Review Class 10 balancing of chemical equations (c10_chem_cbse_01_002) and the reversible.',
          misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal.',
          parts: [
                { id: 'a', prompt: 'In the reversible reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at equilibrium in a closed container, which statement is correct? (a) The forward reaction has stopped.', answer: 'Correct: (c) The rate of formation of NH₃ equals the rate of its decomposition',
                  options: ['Correct: (c) The rate of formation of NH₃ equals the rate of its decomposition', 'equilibrium', 'equilibrium means 50% reactants, 50% products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g) +.' },
                { id: 'b', prompt: 'A student writes: "At equilibrium, the reaction N₂O₄(g) ⇌ 2NO₂(g) has no net change because all N₂O₄ molecules have converted to NO₂." Explain why this is.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'equilibrium', 'reaction goes to completion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g) +.' },
                { id: 'c', prompt: 'For the equilibrium H₂(g) + I₂(g) ⇌ 2HI(g), initially 1.0 mol H₂ and 1.0 mol I₂ are placed in a 10 L vessel. At equilibrium, 0.6 mol of HI is found.', answer: 'Initial: [H₂] = 0.1 M, [I₂] = 0.1 M, [HI] = 0 M',
                  options: ['Initial: [H₂] = 0.1 M, [I₂] = 0.1 M, [HI] = 0 M', 'equilibrium means 50% reactants, 50% products', 'equal rates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g) +.' }
          ],
            remediations: { 'equilibrium-means-50-reactants': { steps: ['Draw a concentration vs time graph for A ⇌ B starting with pure A — show curves approaching different plateau levels.', 'Emphasize "rate = k[A]" vs "rate = k\'[B]" — at equilibrium k[A] = k\'[B], so [B]/[A] = k/k\' = Kc, not 1.', 'Use the "dance floor" analogy: 10 couples dancing (forward) and 10 couples leaving (reverse) — total on floor constant,.', 'Practice with ICE tables where equilibrium concentrations are clearly unequal.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I add more H₂ to the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g), the system will immediately form more NH₃ and the equilibrium constant Kc will.', answer: 'The claim is partially correct in outcome but wrong in reasoning',
                  options: ['The claim is partially correct in outcome but wrong in reasoning', 'position of equilibrium', 'equilibrium constant', 'equilibrium means 50% reactants, 50% products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "equilibrium means 50% reactants, 50% products" because they equate "equal rates" with "equal concentrations." In N₂(g) +.' }
          ],
            remediations: { 'equilibrium-means-50-reactants': { steps: ['Draw a concentration vs time graph for A ⇌ B starting with pure A — show curves approaching different plateau levels.', 'Emphasize "rate = k[A]" vs "rate = k\'[B]" — at equilibrium k[A] = k\'[B], so [B]/[A] = k/k\' = Kc, not 1.', 'Use the "dance floor" analogy: 10 couples dancing (forward) and 10 couples leaving (reverse) — total on floor constant,.', 'Practice with ICE tables where equilibrium concentrations are clearly unequal.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_001', difficulty: 'standard',
          question: 'Equilibrium in physical processes is a dynamic state in a closed system where.',
          hint: 'If stuck, revisit Class 8 "Particle Arrangement and Movement in Liquids/Gases".',
          misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no.',
          parts: [
                { id: 'a', prompt: 'A student places 50 g of ice and 50 g of water in a perfectly insulated, sealed container at 0°C and 1 atm.', answer: 'The masses of ice and water will remain 50 g each',
                  options: ['The masses of ice and water will remain 50 g each', 'all ice melts', 'all water freezes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no molecules cross the.' }
          ],
            remediations: { 'at-physical-equilibrium': { steps: ['**Visual demonstration:** Show a sealed syringe with water at room temperature — pull plunger to create vacuum, watch.', 'Ask: "Did evaporation stop when colour/volume stabilized?" 2.', '**Molecular animation:** Use PhET "States of Matter" simulation — show molecules leaving and entering liquid surface at.', 'Count leaving vs entering per 10 seconds.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no.',
          parts: [
                { id: 'a', prompt: 'A student claims: "At liquid-vapour equilibrium, the rate of evaporation equals the rate of condensation, so the vapour pressure becomes zero because no net.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'net rate = 0', 'individual rates = 0', 'evaporation stops'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no molecules cross the.' },
                { id: 'b', prompt: 'Design a simple experiment using household items (pressure cooker, water, thermometer, stopwatch) to demonstrate that the boiling point of water increases with.', answer: '**Procedure:** (1) Heat 200 mL water in an open pan',
                  options: ['**Procedure:** (1) Heat 200 mL water in an open pan', 'evaporation stops', 'no molecules cross the interface', 'rate of evaporation = rate of condensation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that at physical equilibrium, **all molecular motion stops** — they write "evaporation stops" or "no molecules cross the.' }
          ],
            remediations: { 'at-physical-equilibrium': { steps: ['**Visual demonstration:** Show a sealed syringe with water at room temperature — pull plunger to create vacuum, watch.', 'Ask: "Did evaporation stop when colour/volume stabilized?" 2.', '**Molecular animation:** Use PhET "States of Matter" simulation — show molecules leaving and entering liquid surface at.', 'Count leaving vs entering per 10 seconds.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_012', difficulty: 'standard',
          question: 'Vapour pressure is the pressure exerted by the vapours of a liquid when they.',
          hint: 'If stuck, review c11_chem_cbse_05_001 (van der Waals forces) and c11_chem_cbse_05_003.',
          misconception: 'Students believe vapour pressure depends on the amount of liquid or the volume of the container above the liquid.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vapour pressure is the pressure exerted by the vapours of a liquid when they are in',
                  options: ['Vapour pressure is the pressure exerted by the vapours of a liquid when they are in', 'Dynamic equilibrium in a chemical process is a state in a reversible reaction where the', 'Equilibrium in physical processes is a dynamic state in a closed system where opposing', 'The Law of Chemical Equilibrium states that for a reversible reaction at constant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe vapour pressure depends on the amount of liquid or the volume of the container above the liquid.' }
          ],
            remediations: { 'vapour-pressure-depends-on-the': { steps: ['Revisit the syringe experiment (Diagnostic Q6) mentally. Visualize the liquid-vapour interface.', 'Draw a molecular diagram: liquid molecules at bottom, vapour molecules in headspace.', 'Apply Le Chatelier\'s principle: increasing volume decreases vapour concentration momentarily, so evaporation rate >.', 'Practice numerical: "Vapour pressure of water at 300 K is 3.5 kPa.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe vapour pressure depends on the amount of liquid or the volume of the container above the liquid.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "At the normal boiling point of a liquid, its vapour pressure equals 1 bar." Is this correct according to current IUPAC standard state.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'yes, 1 bar = 1 atm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe vapour pressure depends on the amount of liquid or the volume of the container above the liquid.' }
          ],
            remediations: { 'vapour-pressure-depends-on-the': { steps: ['Revisit the syringe experiment (Diagnostic Q6) mentally. Visualize the liquid-vapour interface.', 'Draw a molecular diagram: liquid molecules at bottom, vapour molecules in headspace.', 'Apply Le Chatelier\'s principle: increasing volume decreases vapour concentration momentarily, so evaporation rate >.', 'Practice numerical: "Vapour pressure of water at 300 K is 3.5 kPa.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_003', difficulty: 'standard',
          question: 'The Law of Chemical Equilibrium states that for a reversible reaction at.',
          hint: 'If stuck on Kc expressions, revisit c11_chem_cbse_07_002 (dynamic equilibrium) and.',
          misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc =.',
          parts: [
                { id: 'a', prompt: 'Write the Kc expression for the equilibrium: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g). State the units of Kc for this reaction.', answer: 'Kc = [SO₃]² / ([SO₂]²[O₂])',
                  options: ['Kc = [SO₃]² / ([SO₂]²[O₂])', 'no units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc = [CaO][CO₂]/[CaCO₃]).' },
                { id: 'b', prompt: 'Compare the Kc expressions for these two equilibria at the same temperature: (1) 2NO₂(g) ⇌ N₂O₄(g) (2) NO₂(g) ⇌ ½N₂O₄(g) If Kc₁ = 4.0 M⁻¹ for reaction (1),.', answer: 'Kc₁ = [N₂O₄]/[NO₂]² = 4.0 M⁻¹',
                  options: ['Kc₁ = [N₂O₄]/[NO₂]² = 4.0 M⁻¹', 'no units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc = [CaO][CO₂]/[CaCO₃]).' }
          ],
            remediations: { 'students-write-kc-expressions-including': { steps: ['Identify phases of all species - circle (s), (l), (g), (aq).', 'Cross out all pure solids and pure liquids from the Kc expression.', 'Write Kc with only (g) and (aq) species.', 'Calculate Δn = Σn_gas(products) - Σn_gas(reactants).', 'Units = M^Δn. If Δn = 0, Kc is dimensionless. Practice with 5 heterogeneous equilibria: NH₄Cl(s) ⇌ NH₃(g) + HCl(g),.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc =.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For the heterogeneous equilibrium CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kc = [CaO][CO₂]/[CaCO₃].', answer: 'The student is wrong',
                  options: ['The student is wrong', 'solids have concentration 1', 'no units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc = [CaO][CO₂]/[CaCO₃]).' },
                { id: 'b', prompt: 'Compare the Kc expressions for these two equilibria at the same temperature: (1) 2NO₂(g) ⇌ N₂O₄(g) (2) NO₂(g) ⇌ ½N₂O₄(g) If Kc₁ = 4.0 M⁻¹ for reaction (1),.', answer: 'Kc₁ = [N₂O₄]/[NO₂]² = 4.0 M⁻¹',
                  options: ['Kc₁ = [N₂O₄]/[NO₂]² = 4.0 M⁻¹', 'no units'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Kc expressions including pure solids/liquids (e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), they write Kc = [CaO][CO₂]/[CaCO₃]).' }
          ],
            remediations: { 'students-write-kc-expressions-including': { steps: ['Identify phases of all species - circle (s), (l), (g), (aq).', 'Cross out all pure solids and pure liquids from the Kc expression.', 'Write Kc with only (g) and (aq) species.', 'Calculate Δn = Σn_gas(products) - Σn_gas(reactants).', 'Units = M^Δn. If Δn = 0, Kc is dimensionless. Practice with 5 heterogeneous equilibria: NH₄Cl(s) ⇌ NH₃(g) + HCl(g),.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_004', difficulty: 'standard',
          question: 'The relationship between Kp (equilibrium constant in terms of partial.',
          hint: 'If stuck, review node c11_chem_cbse_07_003 for Kc expressions and Class 11 Physics.',
          misconception: 'Students often calculate Δn_g as (total product coefficients) – (total reactant coefficients) including solids,.',
          parts: [
                { id: 'a', prompt: 'Compare the effect of increasing total pressure on the equilibrium position for the two reactions in Question 2, using the Kp–Kc relationship to justify your.', answer: 'For H₂+I₂⇌2HI (Δn_g=0), Kp=Kc and is pressure‑independent',
                  options: ['For H₂+I₂⇌2HI (Δn_g=0), Kp=Kc and is pressure‑independent', 'Kp changes with pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often calculate Δn_g as (total product coefficients) – (total reactant coefficients) including solids, liquids, and aqueous.' }
          ],
            remediations: { 'students-often-calculate-n-g': { steps: ['Re‑read the definition of equilibrium constant: only gaseous and aqueous species appear in Kp/Kc; pure solids/liquids.', 'Practice identifying gaseous species in five different equilibria and computing Δn_g each time.', 'Memorise the two common R values: 0.0831 L·bar·K⁻¹·mol⁻¹ and 0.0821 L·atm·K⁻¹·mol⁻¹, and always match the pressure unit.', 'Solve three numerical problems where Δn_g is positive, negative, and zero, checking that Kp = Kc when Δn_g = 0.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often calculate Δn_g as (total product coefficients) – (total reactant coefficients) including solids,.',
          parts: [
                { id: 'a', prompt: 'Compare the effect of increasing total pressure on the equilibrium position for the two reactions in Question 2, using the Kp–Kc relationship to justify your.', answer: 'For H₂+I₂⇌2HI (Δn_g=0), Kp=Kc and is pressure‑independent',
                  options: ['For H₂+I₂⇌2HI (Δn_g=0), Kp=Kc and is pressure‑independent', 'Kp changes with pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often calculate Δn_g as (total product coefficients) – (total reactant coefficients) including solids, liquids, and aqueous.' }
          ],
            remediations: { 'students-often-calculate-n-g': { steps: ['Re‑read the definition of equilibrium constant: only gaseous and aqueous species appear in Kp/Kc; pure solids/liquids.', 'Practice identifying gaseous species in five different equilibria and computing Δn_g each time.', 'Memorise the two common R values: 0.0831 L·bar·K⁻¹·mol⁻¹ and 0.0821 L·atm·K⁻¹·mol⁻¹, and always match the pressure unit.', 'Solve three numerical problems where Δn_g is positive, negative, and zero, checking that Kp = Kc when Δn_g = 0.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_008', difficulty: 'standard',
          question: 'A catalyst is a substance that increases the rate of both the forward and.',
          hint: 'Review the derivation of Kc = kf/kr from the equality of rates at equilibrium (node.',
          misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at.',
          parts: [
                { id: 'a', prompt: 'State the effect of adding a catalyst on (i) the equilibrium constant Kc, (ii) the equilibrium concentrations of reactants and products, and (iii) the time.', answer: '(i) Kc remains unchanged',
                  options: ['(i) Kc remains unchanged', 'Kc increases', 'equilibrium shifts to products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' },
                { id: 'b', prompt: 'In the Contact process for H₂SO₄ production, V₂O₅ catalyses 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).', answer: 'The amount of SO₃ remains unchanged',
                  options: ['The amount of SO₃ remains unchanged', 'SO₃ decreases because forward reaction slows more', 'speeds up the reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' },
                { id: 'c', prompt: 'For the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g) ΔH = -92 kJ/mol, an iron catalyst is added at 700 K and 200 atm.', answer: 'The mole fraction of NH₃ remains 0.15',
                  options: ['The mole fraction of NH₃ remains 0.15', 'speeds up the reaction', 'a catalyst changes the equilibrium yield, confusing kinetics with thermodynamics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' }
          ],
            remediations: { 'because-a-catalyst-speeds-up': { steps: ['If a student holds this misconception, guide them through this stepwise remediation: (1) Write the rate laws:.', '(3) Explain that a catalyst increases both kf and kr by the same factor (since it provides a common lower-energy.', '(4) Therefore Kc = (kf × factor)/(kr × factor) = kf/kr remains constant.', '(5) Use the energy profile diagram: show that the catalyst lowers the peak for both forward and reverse reactions by.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In the Haber process, using a more active catalyst (e.g., ruthenium instead of iron) allows us to get a higher yield of ammonia at the same.', answer: 'The claim is false',
                  options: ['The claim is false', 'speeds up the reaction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because a catalyst "speeds up the reaction," it must increase the yield of products at equilibrium, treating.' }
          ],
            remediations: { 'because-a-catalyst-speeds-up': { steps: ['If a student holds this misconception, guide them through this stepwise remediation: (1) Write the rate laws:.', '(3) Explain that a catalyst increases both kf and kr by the same factor (since it provides a common lower-energy.', '(4) Therefore Kc = (kf × factor)/(kr × factor) = kf/kr remains constant.', '(5) Use the energy profile diagram: show that the catalyst lowers the peak for both forward and reverse reactions by.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
