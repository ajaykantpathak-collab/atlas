import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch06_p1: SimDef = {
    id: 'v3_c11_chem_ch06_p1',
    title: 'Thermodynamics · Part 1/2',
    subtitle: 'Draw the system boundary correctly and track energy as heat and work.',
    classLevel: 11, subject: 'chemistry', topic: 'Thermodynamics · Part 1/2',
    chapters: ['c11_chem_ch06'],
    nodeIds: ['c11_chem_cbse_06_001', 'c11_chem_cbse_06_002', 'c11_chem_cbse_06_003', 'c11_chem_cbse_06_004', 'c11_chem_cbse_06_005', 'c11_chem_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a thermodynamic accountant auditing a steam system', intro: 'Same cooker, three seal states — each changes what energy is allowed to cross your ledger.', goal: 'Classify open, closed and isolated systems and apply the first law with correct sign conventions.' },
    discovery: {
        question: 'A sealed pressure cooker sits on a flame — no steam escapes, but heat pours in. A student calls it an isolated system and sets q = 0. What is it really?',
        options: ['A closed system — matter is fixed but heat still crosses the boundary', 'An isolated system — nothing material leaves, so nothing counts as exchanged', 'An open system — the steam inside is still moving', 'Closed and isolated mean the same thing here'],
        answer: 'A closed system — matter is fixed but heat still crosses the boundary',
        hook: '\'Closed\' seals matter, not energy — confusing the two silently wrecks every first-law sign that follows.',
    },
    teaching: [
        { title: 'Thermodynamic Terms: System, Surroundings, State', text: 'In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants in a beaker, gas in a piston) chosen for study; the **surroundings** comprise everything else that can.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_06_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Classify a pressure cooker, a thermos flask and an open beaker, then run a P-V cycle to show work is path-dependent while internal energy returns to zero.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_chem_cbse_06_001', title: 'Thermodynamic Terms: System, Surroundings, State',
          caseStudy: { intro: 'Imagine a pressure cooker whistling on a gas stove — the steam inside is the **system**, the metal pot and kitchen air are the **surroundings**, and the rubber.',
            decisions: [{ prompt: 'Define a thermodynamic system, surroundings, and boundary. Give one example of each from a kitchen setting.', options: [
                { text: 'A thermodynamic system is the part of the universe under study (e.g., water boiling in a', outcome: 'A thermodynamic system is the part of the universe under study (e.g., water boiling in a pan).' },
                { text: 'closed', outcome: 'Not quite — Students often think a **closed system** cannot exchange **heat** — they equate "closed" with.', reveals: 'a-closed-system-cannot-exchange' },
                { text: 'thermally insulated', outcome: 'Not quite — Students often think a **closed system** cannot exchange **heat** — they equate "closed" with.', reveals: 'a-closed-system-cannot-exchange' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_002', title: 'Internal Energy and Work: First Law',
          scaffold: { problem: '0.5 mol of an ideal gas at 300 K expands reversibly and isothermally from an initial pressure of 4 atm to a final pressure of 1 atm.',
            steps: [
            { text: 'Identify process — reversible isothermal expansion of ideal gas. For ideal gas, U depends only on T.' },
            { text: 'Apply First Law: ΔU = q + w = 0 ⇒ q = -w. Heat absorbed equals work done by gas in magnitude, opposite sign.' },
            { text: 'Calculate work using reversible isothermal formula: w = -nRT ln(V₂/V₁). Need volume ratio.' },
            { text: 'Compute w = -(0.5 mol)(8.314 J·mol⁻¹·K⁻¹)(300 K) ln(4) = -1247.1 × 1.3863 = -1729 J.' },
            { text: 'q = -w = +1729 J (heat absorbed by gas). ΔU = 0 J. Verify: Energy conservation — 1729 J heat in = 1729 J work out.', faded: true, blankAnswer: '(a) w = -1729 J (work done by gas); (b) q = +1729 J (heat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_003', title: 'Enthalpy: Definition and Relationship with Internal Energy',
          scaffold: { problem: 'In a constant-pressure calorimeter at 298 K, the combustion of 1.00 g of graphite (C) to CO₂(g) releases 32.8 kJ of heat.',
            steps: [
            { text: 'Identify process conditions — constant pressure (open calorimeter), so q_p = ΔH. Heat released = –32.8 kJ per 1.00 g C.' },
            { text: 'Convert to molar basis: ΔH = (–32.8 kJ / 1.00 g) × 12.01 g mol⁻¹ = –393.9 kJ mol⁻¹.' },
            { text: 'Determine Δn_g for reaction: CO₂(g) → 1 mol gas; O₂(g) → 1 mol gas; C(s) → 0 mol gas. Δn_g = 1 – 1 = 0.' },
            { text: 'Apply ΔH = ΔU + Δn_gRT. Since Δn_g = 0, ΔH = ΔU = –393.9 kJ mol⁻¹.' },
            { text: 'Verify units and sign: exothermic, negative; magnitude matches literature ΔH°_comb(C) ≈ –393.5 kJ mol⁻¹.' },
            { text: 'Interpret: For reactions with no net gas mole change, calorimetric q_p directly gives ΔU without correction.', faded: true, blankAnswer: 'ΔH = –393.9 kJ mol⁻¹, ΔU = –393.9 kJ mol⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_004', title: 'Enthalpy of Formation, Combustion and Reaction',
          scaffold: { problem: 'Calculate the standard enthalpy change for the industrial production of nitric acid via the Ostwald process first step: 4NH₃(g) + 5O₂(g) →.',
            steps: [
            { text: 'Identify the balanced equation and confirm all species have correct states.' },
            { text: 'List ΔfH° for each species: ΔfH°(NH₃) = −46.1, ΔfH°(O₂) = 0, ΔfH°(NO) = +90.3, ΔfH°(H₂O(g)) = −241.8 kJ mol⁻¹.' },
            { text: 'Apply formula ΔrH° = ΣnΔfH°(products) − ΣmΔfH°(reactants). Products: 4×(+90.3) + 6×(−241.8) = 361.2 − 1450.8 = −1089.6.' },
            { text: 'Reactants: 4×(−46.1) + 5×(0) = −184.4 kJ.' },
            { text: 'ΔrH° = (−1089.6) − (−184.4) = −905.2 kJ for the reaction as written (4 moles NH₃).' },
            { text: 'Per mole of NH₃: −905.2 / 4 = −226.3 kJ mol⁻¹. The negative sign confirms the exothermic nature used industrially.', faded: true, blankAnswer: 'ΔrH° = −905.2 kJ (for 4 mol NH₃) or −226.3 kJ mol⁻¹ of NH₃.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_005', title: 'Hess\'s Law of Constant Heat Summation',
          scaffold: { problem: 'Calculate the standard enthalpy change for the industrial production of nitric oxide from ammonia (Ostwald process first step): 4NH₃(g).',
            steps: [
            { text: 'Identify the target reaction and confirm it is balanced: 4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g).' },
            { text: 'Write the Hess\'s Law formula: ΔH°_rxn = [4ΔH°_f(NO) + 6ΔH°_f(H₂O(g))] - [4ΔH°_f(NH₃) + 5ΔH°_f(O₂)].' },
            { text: 'Substitute the given ΔH°_f values: ΔH°_rxn = [4(+90.3) + 6(-241.8)] - [4(-46.1) + 5(0)].' },
            { text: 'Calculate products sum: 4×90.3 = 361.2; 6×(-241.8) = -1450.8; Sum = 361.2 - 1450.8 = -1089.6 kJ.' },
            { text: 'Calculate reactants sum: 4×(-46.1) = -184.4; 5×0 = 0; Sum = -184.4 kJ.' },
            { text: 'Compute ΔH°_rxn = -1089.6 - (-184.4) = -1089.6 + 184.4 = -905.2 kJ.' },
            { text: 'Interpret: The reaction is exothermic (ΔH < 0), releasing 905.2 kJ per 4 moles of NH₃ reacted.', faded: true, blankAnswer: 'ΔH°_rxn = -905.2 kJ (for the reaction as written with 4 mol.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_006', title: 'Bond Enthalpy and Calculation of Reaction Enthalpy',
          scaffold: { problem: 'In a laboratory, a student burns 0.50 g of gaseous ethene (C₂H₄) in excess oxygen.',
            steps: [
            { text: 'Calculate heat absorbed by water: q = m c ΔT = 200 g × 4.18 J g⁻¹ K⁻¹ × (42.5 – 25.0) K = 14,630 J = 14.63 kJ.' },
            { text: 'Moles of ethene burnt = 0.50 g / 28.05 g mol⁻¹ = 0.0178 mol. Experimental ΔH°_comb = –q / n = –14.63 kJ / 0.0178 mol.' },
            { text: 'Write balanced equation for gaseous combustion: C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g).' },
            { text: 'Count bonds broken: 1 C=C (614), 4 C–H (4×413 = 1652), 3 O=O (3×498 = 1494). Total = 3760 kJ mol⁻¹.' },
            { text: 'Count bonds formed: 4 C=O (4×799 = 3196), 4 O–H (4×463 = 1852). Total = 5048 kJ mol⁻¹.' },
            { text: 'Bond enthalpy estimate ΔH° = 3760 – 5048 = –1288 kJ mol⁻¹.' },
            { text: 'Compare: experimental (–822) is less exothermic than estimate (–1288).', faded: true, blankAnswer: 'Experimental ΔH°_comb = –822 kJ mol⁻¹; bond enthalpy.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a thermodynamics worksheet your class labels three kitchen systems: a pressure cooker whistling steam, the same cooker sealed with the weight on over a flame, and hot tea in a perfect thermos. A friend marks the sealed cooker \'isolated — nothing can get out, it\'s closed\'.',
            decisions: [{ prompt: 'Which labels are right?', options: [
                { text: 'Whistling cooker = open (steam matter AND heat escape); sealed cooker = closed (matter fixed, but heat still crosses from the flame — the water inside keeps heating, proving energy exchange); thermos ≈ isolated (neither matter nor appreciable heat crosses). \'Closed\' describes matter, not heat.', outcome: 'Closed ≠ insulated: a closed system keeps its matter but freely exchanges energy — mixing them up makes you set q = 0 wrongly in first-law problems.' },
                { text: 'The friend is right — sealed means isolated; if no matter leaves, nothing at all is exchanged.', outcome: 'The sealed cooker\'s contents keep heating on the flame — energy is pouring across the boundary even though matter can\'t leave; that\'s textbook \'closed\'.', reveals: 'closed-means-isolated' },
                { text: 'All three are open because heat always escapes eventually.', outcome: 'Eventual leakage doesn\'t change the categories: open/closed/isolated classify what the boundary permits — matter+energy, energy only, or neither.', reveals: 'everything-is-open' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Pick the boundary honestly and the first law is clean bookkeeping; pick it wrong and every sign flips.',
            decisions: [{ prompt: 'What comes next? Thermodynamics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Thermodynamics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_001', difficulty: 'standard',
          question: 'In thermodynamics, a **system** is the specific portion of the universe (e.g.',
          hint: 'If stuck on system classification, revisit Class 10 "Chemical Reactions".',
          misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".',
          parts: [
                { id: 'a', prompt: 'Classify each as open, closed, or isolated system: (a) a sealed soda bottle before opening, (b) an earthen pot (matka) cooling water by evaporation, (c).', answer: 'a sealed soda bottle before opening, (',
                  options: ['a sealed soda bottle before opening, (', 'sealed', 'thermally insulated', 'closed'],
                  hint: 'If stuck on system classification, revisit Class 10 "Chemical Reactions" (c10_chem_cbse_01_001) and.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' },
                { id: 'b', prompt: 'A gas in a piston-cylinder assembly expands from 2.0 L to 5.0 L against a constant external pressure of 1.0 atm. The initial temperature is 300 K.', answer: 'No, work is not a state function',
                  options: ['No, work is not a state function', 'work depends only on initial and final volume', 'closed', 'thermally insulated'],
                  hint: 'If stuck on system classification, revisit Class 10 "Chemical Reactions" (c10_chem_cbse_01_001) and.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' },
                { id: 'c', prompt: 'Two identical samples of an ideal gas at 300 K, 1 atm, 10 L are compressed to 5 L.', answer: 'Final T: Sample A stays at 300 K (isothermal)',
                  options: ['Final T: Sample A stays at 300 K (isothermal)', 'closed', 'thermally insulated'],
                  hint: 'If stuck on system classification, revisit Class 10 "Chemical Reactions" (c10_chem_cbse_01_001) and.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' }
          ],
            remediations: { 'a-closed-system-cannot-exchange': { steps: ['Do this 5-minute demo: Take two identical steel tumblers.', 'Fill both with 100 mL hot water (80°C).', 'Cover one with a tight lid (closed system).', 'Leave the other open (open system).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".',
          parts: [
                { id: 'a', prompt: 'A student writes: "The enthalpy change of a reaction is a path function because it depends on whether the reaction occurs in one step or multiple steps.".', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'closed', 'thermally insulated'],
                  hint: 'If stuck on system classification, revisit Class 10 "Chemical Reactions" (c10_chem_cbse_01_001) and.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' }
          ],
            remediations: { 'a-closed-system-cannot-exchange': { steps: ['Do this 5-minute demo: Take two identical steel tumblers.', 'Fill both with 100 mL hot water (80°C).', 'Cover one with a tight lid (closed system).', 'Leave the other open (open system).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_002', difficulty: 'standard',
          question: 'Internal energy (U) is the total energy stored within a thermodynamic system.',
          hint: 'If stuck on sign conventions: Revisit c11_chem_cbse_06_001 (Thermodynamic Terms) for.',
          misconception: 'Students write the First Law as ΔU = q - w (with w = work done BY system) and use w = +PΔV for expansion work.',
          parts: [
                { id: 'a', prompt: 'Two identical samples of an ideal gas undergo expansion from the same initial state (P₁, V₁, T) to the same final volume V₂.', answer: 'Reversible isothermal work: w_rev = -nRT ln(V₂/V₁)',
                  options: ['Reversible isothermal work: w_rev = -nRT ln(V₂/V₁)', 'reversible = slower = less work'],
                  hint: 'If stuck on sign conventions: Revisit c11_chem_cbse_06_001 (Thermodynamic Terms) for state vs path.',
                  misconception: 'Students write the First Law as ΔU = q - w (with w = work done BY system) and use w = +PΔV for expansion work.' }
          ],
            remediations: { 'students-write-the-first-law': { steps: ['Write the IUPAC First Law ΔU = q + w on a card. Memorize: "q positive = heat IN; w positive = work ON system".', 'For any process, ask: "Is energy entering or leaving the system as work?" If system expands (pushes piston out), energy.', 'Practice 5 problems: (i) Gas expands against 2 atm, ΔV = +3 L → calculate w in J.', 'Check each against the rule: expansion → w < 0; compression → w > 0; no volume change → w = 0.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_003', difficulty: 'standard',
          question: 'Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s.',
          hint: 'Revisit c11_chem_cbse_06_002: practice 3 problems calculating q, w, ΔU for isobaric gas.',
          misconception: 'Students treat ΔH = ΔU + Δn_gRT as universally valid without checking: (1) all species are ideal gases, (2) temperature.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal',
                  options: ['Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal', 'In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants', 'Internal energy (U) is the total energy stored within a thermodynamic system arising from', 'Standard enthalpy of formation (ΔfH°) is the enthalpy change when one mole of a compound'],
                  hint: 'Revisit c11_chem_cbse_06_002: practice 3 problems calculating q, w, ΔU for isobaric gas expansion.',
                  misconception: 'Students treat ΔH = ΔU + Δn_gRT as universally valid without checking: (1) all species are ideal gases, (2) temperature is constant, (3).' }
          ],
            remediations: { 'students-treat-h-u-n': { steps: ['Revisit c11_chem_cbse_06_002 (Internal Energy and Work) — confirm w = –pΔV at constant p.', 'Write H = U + pV, take differential: dH = dU + pdV + Vdp. At constant p, dp=0 → dH = dU + pdV = δq_p.', 'For gas reactions, practice Δn_g counting with 10 varied equations (include solids/liquids).', 'Drill unit conversion: R = 8.314 J = 0.008314 kJ.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_004', difficulty: 'standard',
          question: 'Standard enthalpy of formation (ΔfH°) is the enthalpy change when one mole of.',
          hint: 'Review c11_chem_cbse_06_003 for enthalpy definition and state function concept; review.',
          misconception: 'Students write formation equations with 1 mole of each element instead of 1 mole of compound (e.g., C + H₂ + O → CH₃OH.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Standard enthalpy of formation (ΔfH°) is the enthalpy change when one mole of a compound',
                  options: ['Standard enthalpy of formation (ΔfH°) is the enthalpy change when one mole of a compound', 'In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants', 'Internal energy (U) is the total energy stored within a thermodynamic system arising from', 'Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal'],
                  hint: 'Review c11_chem_cbse_06_003 for enthalpy definition and state function concept; review Class 9.',
                  misconception: 'Students write formation equations with 1 mole of each element instead of 1 mole of compound (e.g., C + H₂ + O → CH₃OH instead of C + 2H₂.' }
          ],
            remediations: { 'students-write-formation-equations-with': { steps: ['Memorise standard states: C(graphite), H₂(g), O₂(g), N₂(g), S(rhombic), P(white), halogens as X₂(g/l), metals as solid.', 'Practice writing formation equations for 10 compounds daily – always balance for 1 mole of product.', 'For combustion, always write H₂O(l) unless question specifies gaseous water.', 'Use the "formation minus reactants" formula with a table: list each species, coefficient, ΔfH°, then multiply and sum.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_005', difficulty: 'standard',
          question: 'Hess\'s Law of Constant Heat Summation states that the total enthalpy change for.',
          hint: 'If stuck, revisit c11_chem_cbse_06_003 for state function definition and.',
          misconception: 'Students frequently treat ΔH°_f values as "absolute energies" of compounds and forget that the zero reference is the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hess\'s Law of Constant Heat Summation states that the total enthalpy change for a',
                  options: ['Hess\'s Law of Constant Heat Summation states that the total enthalpy change for a', 'In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants', 'Internal energy (U) is the total energy stored within a thermodynamic system arising from', 'Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal'],
                  hint: 'If stuck, revisit c11_chem_cbse_06_003 for state function definition and c11_chem_cbse_06_004 for.',
                  misconception: 'Students frequently treat ΔH°_f values as "absolute energies" of compounds and forget that the zero reference is the element in its.' }
          ],
            remediations: { 'students-frequently-treat-h-f': { steps: ['**Revisit state function concept**: Go back to node c11_chem_cbse_06_003 (Enthalpy: Definition and Relationship with.', 'Draw a p-V diagram showing two different paths between same states with same ΔH.', '**Practice equation manipulation**: Take 3 simple thermochemical equations (e.g., H₂ + ½O₂ → H₂O, C + O₂ → CO₂,.', 'Physically cut and rearrange them to build target equations, flipping cards to reverse reactions and stacking identical.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_006', difficulty: 'standard',
          question: 'Bond enthalpy (or bond dissociation enthalpy) is the average energy required.',
          hint: 'If stuck, revisit Hess\'s law (c11_chem_cbse_06_005) and practice drawing Lewis structures.',
          misconception: 'Students often treat bond enthalpy as the exact energy for a specific bond in a specific molecule (e.g., "C–H bond.',
          parts: [
                { id: 'a', prompt: 'Compare the ΔH° calculated from bond enthalpies for N₂(g) + 3H₂(g) → 2NH₃(g) with the experimental value of –92 kJ mol⁻¹. Explain any discrepancy.', answer: 'Bond enthalpies: N≡N = 946, H–H = 436, N–H = 391 kJ mol⁻¹',
                  options: ['Bond enthalpies: N≡N = 946, H–H = 436, N–H = 391 kJ mol⁻¹', 'bond enthalpies are exact'],
                  hint: 'If stuck, revisit Hess\'s law (c11_chem_cbse_06_005) and practice drawing Lewis structures for.',
                  misconception: 'Students often treat bond enthalpy as the exact energy for a specific bond in a specific molecule (e.g., "C–H bond energy in methane is 413.' }
          ],
            remediations: { 'students-often-treat-bond-enthalpy': { steps: ['If a student makes the above errors: (1) Have them look up bond dissociation energies for C–H in CH₄, CH₃Cl, CH₂Cl₂.', '(2) Give a reaction with a liquid product (e.g., H₂ + ½O₂ → H₂O(l)) and ask them to calculate ΔH using bond enthalpies.', '(3) Guide them to realize the missing step is the phase change enthalpy.', '(4) Practice converting between phases using ΔH_vap or ΔH_cond before applying the bond enthalpy formula.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
