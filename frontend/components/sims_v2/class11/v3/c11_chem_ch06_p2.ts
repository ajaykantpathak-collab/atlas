import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch06_p2: SimDef = {
    id: 'v3_c11_chem_ch06_p2',
    title: 'Thermodynamics · Part 2/2',
    subtitle: 'Draw the system boundary correctly and track energy as heat and work.',
    classLevel: 11, subject: 'chemistry', topic: 'Thermodynamics · Part 2/2',
    chapters: ['c11_chem_ch06'],
    nodeIds: ['c11_chem_cbse_06_007', 'c11_chem_cbse_06_008', 'c11_chem_cbse_06_009', 'c11_chem_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a thermodynamic accountant auditing a steam system', intro: 'Same cooker, three seal states — each changes what energy is allowed to cross your ledger.', goal: 'Classify open, closed and isolated systems and apply the first law with correct sign conventions.' },
    discovery: {
        question: 'A sealed pressure cooker sits on a flame — no steam escapes, but heat pours in. A student calls it an isolated system and sets q = 0. What is it really?',
        options: ['A closed system — matter is fixed but heat still crosses the boundary', 'An isolated system — nothing material leaves, so nothing counts as exchanged', 'An open system — the steam inside is still moving', 'Closed and isolated mean the same thing here'],
        answer: 'A closed system — matter is fixed but heat still crosses the boundary',
        hook: '\'Closed\' seals matter, not energy — confusing the two silently wrecks every first-law sign that follows.',
    },
    teaching: [
        { title: 'Spontaneity: Gibbs Energy Change', text: 'Gibbs energy change (ΔG) is the thermodynamic potential that determines the spontaneity of a process at constant temperature and pressure, defined as ΔG = ΔH - TΔS where ΔH is enthalpy change, T.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_06_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Classify a pressure cooker, a thermos flask and an open beaker, then run a P-V cycle to show work is path-dependent while internal energy returns to zero.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_007', title: 'Spontaneity: Gibbs Energy Change',
          scaffold: { problem: 'The Haber process for ammonia synthesis N₂(g) + 3H₂(g) ⇌ 2NH₃(g) has ΔH° = -92.4 kJ mol⁻¹ and ΔS° = -198.3 J K⁻¹ mol⁻¹.',
            steps: [
            { text: 'Identify the crossover temperature where ΔG° = 0. Use T_crossover = ΔH°/ΔS° with consistent units.' },
            { text: 'Calculate T_crossover = (-92.4 kJ mol⁻¹) / (-0.1983 kJ K⁻¹ mol⁻¹) = 466 K.' },
            { text: 'Calculate ΔG° at 700 K: ΔG° = ΔH° - TΔS° = -92.4 - (700)(-0.1983) = -92.4 + 138.8 = +46.4 kJ mol⁻¹.' },
            { text: 'Since ΔG° > 0 at 700 K, the reaction is non-spontaneous under standard conditions (1 bar each gas).' },
            { text: 'Interpret: K << 1 means equilibrium favors reactants heavily at 700 K.', faded: true, blankAnswer: 'Crossover temperature = 466 K. At 700 K: ΔG° = +46.4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_008', title: 'Entropy: Definition and Second Law',
          scaffold: { problem: '1 mole of an ideal gas expands isothermally and reversibly from 10 L to 100 L at 300 K.',
            steps: [
            { text: 'Identify process — isothermal reversible expansion of ideal gas. ΔU = 0, so q_rev = -w = nRT ln(V₂/V₁).' },
            { text: 'Calculate q_rev = (1 mol) × (8.314 J mol⁻¹ K⁻¹) × (300 K) × ln(100/10) = 2494.2 × ln(10) = 2494.2 × 2.3026 = 5743 J.' },
            { text: 'ΔS_sys = q_rev/T = 5743 J / 300 K = 19.14 J K⁻¹.' },
            { text: 'For surroundings, heat released = -q_rev = -5743 J at same T, so ΔS_surr = -5743/300 = -19.14 J K⁻¹.' },
            { text: 'ΔS_univ = ΔS_sys + ΔS_surr = 0. This confirms reversible process has ΔS_univ = 0.', faded: true, blankAnswer: 'ΔS_sys = +19.14 J K⁻¹, ΔS_surr = -19.14 J K⁻¹, ΔS_univ = 0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_009', title: 'Third Law of Thermodynamics',
          scaffold: { problem: 'The molar heat capacity of a perfect crystalline solid at low temperatures follows C_p = 0.002 T³ J K⁻¹ mol⁻¹ (with T in K).',
            steps: [
            { text: 'Identify that the Third Law sets S(0 K) = 0 for a perfect crystal.' },
            { text: 'Write the entropy change formula: ΔS = ∫(C_p/T)dT from 0 to T.' },
            { text: 'Substitute C_p = 0.002 T³. The integrand becomes (0.002 T³)/T = 0.002 T².' },
            { text: 'Integrate: ∫₀¹⁰ 0.002 T² dT = 0.002 [T³/3]₀¹⁰ = 0.002 × (1000/3) = 0.6667 J K⁻¹ mol⁻¹.' },
            { text: 'Since S(0)=0, S(10 K) = 0.667 J K⁻¹ mol⁻¹. Verify units: C_p/T has units J K⁻¹ mol⁻¹ / K = J K⁻² mol⁻¹, multiplied.', faded: true, blankAnswer: '0.667 J K⁻¹ mol⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_010', title: 'Relationship Between Gibbs Energy and Equilibrium Constant',
          scaffold: { problem: 'The standard Gibbs energy change for the phosphorylation of glucose in glycolysis is ΔG° = +13.8 kJ mol⁻¹ at 298 K.',
            steps: [
            { text: 'Convert ΔG° to J mol⁻¹: +13.8 kJ mol⁻¹ = +13,800 J mol⁻¹.' },
            { text: 'Use ΔG° = –RT ln K ⇒ ln K = –ΔG°/RT = –13,800 / (8.314 × 298) = –13,800 / 2477.6 = –5.57.' },
            { text: 'K = e^(–5.57) = 3.81 × 10⁻³. Since K < 1, reactants predominate at equilibrium; forward reaction is non-spontaneous.' },
            { text: 'Calculate Q from given concentrations (standard state 1 M = 1000 mM): Q = (0.1 × 10⁻³) / (5 × 10⁻³ × 2 × 10⁻³) = 0.0001.' },
            { text: 'ΔG = ΔG° + RT ln Q = 13,800 + (8.314 × 298 × ln 10) = 13,800 + (2477.6 × 2.303) = 13,800 + 5705 = +19,505 J mol⁻¹ ≈.' },
            { text: 'ΔG > 0, so reaction proceeds in REVERSE direction (G6P hydrolysis) under these cellular conditions.', faded: true, blankAnswer: 'K = 3.81 × 10⁻³; ΔG = +19.5 kJ mol⁻¹; reaction proceeds.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a thermodynamics worksheet your class labels three kitchen systems: a pressure cooker whistling steam, the same cooker sealed with the weight on over a flame, and hot tea in a perfect thermos. A friend marks the sealed cooker \'isolated — nothing can get out, it\'s closed\'.',
            decisions: [{ prompt: 'Which labels are right?', options: [
                { text: 'Whistling cooker = open (steam matter AND heat escape); sealed cooker = closed (matter fixed, but heat still crosses from the flame — the water inside keeps heating, proving energy exchange); thermos ≈ isolated (neither matter nor appreciable heat crosses). \'Closed\' describes matter, not heat.', outcome: 'Closed ≠ insulated: a closed system keeps its matter but freely exchanges energy — mixing them up makes you set q = 0 wrongly in first-law problems.' },
                { text: 'The friend is right — sealed means isolated; if no matter leaves, nothing at all is exchanged.', outcome: 'The sealed cooker\'s contents keep heating on the flame — energy is pouring across the boundary even though matter can\'t leave; that\'s textbook \'closed\'.', reveals: 'closed-means-isolated' },
                { text: 'All three are open because heat always escapes eventually.', outcome: 'Eventual leakage doesn\'t change the categories: open/closed/isolated classify what the boundary permits — matter+energy, energy only, or neither.', reveals: 'everything-is-open' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'Pick the boundary honestly and the first law is clean bookkeeping; pick it wrong and every sign flips.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_007', difficulty: 'standard',
          question: 'Gibbs energy change (ΔG) is the thermodynamic potential that determines the.',
          hint: 'If stuck, revisit c11_chem_cbse_06_004 (enthalpy of formation) and c11_chem_cbse_06_008.',
          misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes.',
          parts: [
                { id: 'a', prompt: 'Explain why the melting of ice (H₂O(s) → H₂O(l)) is spontaneous at 27°C but non-spontaneous at -10°C, even though ΔH and ΔS are both positive for this.', answer: 'For melting, ΔH > 0 (endothermic) and ΔS > 0 (increase in disorder)',
                  options: ['For melting, ΔH > 0 (endothermic) and ΔS > 0 (increase in disorder)', 'ΔH changes with temperature', 'entropy decreases on melting', 'all reactants convert to products'],
                  hint: 'If stuck, revisit c11_chem_cbse_06_004 (enthalpy of formation) and c11_chem_cbse_06_008 (entropy.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' },
                { id: 'b', prompt: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH° = -92.4 kJ mol⁻¹ and ΔS° = -198.3 J K⁻¹ mol⁻¹. Calculate ΔG° at 298 K and 500 K.', answer: 'Step 1: Convert units: ΔS° = -0.1983 kJ K⁻¹ mol⁻¹',
                  options: ['Step 1: Convert units: ΔS° = -0.1983 kJ K⁻¹ mol⁻¹', 'all reactants convert to products'],
                  hint: 'If stuck, revisit c11_chem_cbse_06_004 (enthalpy of formation) and c11_chem_cbse_06_008 (entropy.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' },
                { id: 'c', prompt: 'Compare two reactions: Reaction A has ΔH° = -50 kJ mol⁻¹, ΔS° = +100 J K⁻¹ mol⁻¹. Reaction B has ΔH° = +50 kJ mol⁻¹, ΔS° = -100 J K⁻¹ mol⁻¹.', answer: 'Reaction A: ΔG = -50 - T(+0.1) = -50 - 0.1T',
                  options: ['Reaction A: ΔG = -50 - T(+0.1) = -50 - 0.1T', 'Reaction A becomes non-spontaneous at high T', 'Reaction B becomes spontaneous at low T', 'all reactants convert to products'],
                  hint: 'If stuck, revisit c11_chem_cbse_06_004 (enthalpy of formation) and c11_chem_cbse_06_008 (entropy.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' }
          ],
            remediations: { 'students-consistently-write-g-h': { steps: ['Re-derive ΔG = ΔH - TΔS from the second law: ΔS_universe = ΔS_system + ΔS_surroundings > 0.', 'Use the "ice melting" analogy: at 0°C, ice and water coexist (ΔG = 0). Below 0°C, ice is stable (ΔG > 0 for melting).', 'Practice calculating K from ΔG° using K = e^(-ΔG°/RT) for ΔG° = -5, -10, -20 kJ mol⁻¹ to see K is finite (150, 2×10⁴.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For the reaction 2NO₂(g) ⇌ N₂O₄(g), ΔG° = -4.7 kJ mol⁻¹ at 298 K.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'all reactants convert to products'],
                  hint: 'If stuck, revisit c11_chem_cbse_06_004 (enthalpy of formation) and c11_chem_cbse_06_008 (entropy.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' }
          ],
            remediations: { 'students-consistently-write-g-h': { steps: ['Re-derive ΔG = ΔH - TΔS from the second law: ΔS_universe = ΔS_system + ΔS_surroundings > 0.', 'Use the "ice melting" analogy: at 0°C, ice and water coexist (ΔG = 0). Below 0°C, ice is stable (ΔG > 0 for melting).', 'Practice calculating K from ΔG° using K = e^(-ΔG°/RT) for ΔG° = -5, -10, -20 kJ mol⁻¹ to see K is finite (150, 2×10⁴.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_008', difficulty: 'standard',
          question: 'Entropy (S) is a thermodynamic state function that quantifies the degree.',
          hint: 'If stuck, revisit "Thermodynamic Terms" (node 001) for reversible/irreversible.',
          misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.',
          parts: [
                { id: 'a', prompt: 'Define entropy and state its SI unit. Is entropy a state function or a path function? Justify your answer in one sentence.', answer: 'Entropy (S) is a measure of disorder or randomness in a system',
                  options: ['Entropy (S) is a measure of disorder or randomness in a system', 'entropy is heat', 'unit is J/mol'],
                  hint: 'If stuck, revisit "Thermodynamic Terms" (node 001) for reversible/irreversible definitions, and.',
                  misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.' },
                { id: 'b', prompt: 'A system undergoes an irreversible adiabatic expansion into vacuum (free expansion).', answer: 'Free expansion: q = 0, so ΔS_surr = 0',
                  options: ['Free expansion: q = 0, so ΔS_surr = 0', 'ΔS_sys = 0 for free expansion'],
                  hint: 'If stuck, revisit "Thermodynamic Terms" (node 001) for reversible/irreversible definitions, and.',
                  misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.' }
          ],
            remediations: { 'students-often-write-s-q': { steps: ['If a student uses ΔS = q_irrev/T, guide them through: (1) Identify initial and final states.', '(2) Construct a reversible path (e.g., isothermal expansion for free expansion).', '(3) Calculate q_rev for that path.', 'Practice with: "Calculate ΔS for free expansion of 1 mol ideal gas from 10 L to 100 L at 300 K." (Answer: ΔS =.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_009', difficulty: 'standard',
          question: 'The Third Law of Thermodynamics states that the entropy of a perfect.',
          hint: 'If stuck, revisit node c11_chem_cbse_06_008 (Entropy: Definition and Second Law) and the.',
          misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K.',
          parts: [
                { id: 'a', prompt: 'Why does a perfect crystal at 0 K have zero entropy, while a glassy solid or a solid solution of CO does not? Explain using the concept of microstates.', answer: 'A perfect crystal at 0 K has only one microstate (W = 1)',
                  options: ['A perfect crystal at 0 K has only one microstate (W = 1)', 'entropy of the universe tends to zero', 'entropy of a perfect crystal at 0 K is zero', 'the Third Law implies *all* substances have zero entropy at 0 K'],
                  hint: 'If stuck, revisit node c11_chem_cbse_06_008 (Entropy: Definition and Second Law) and the Boltzmann.',
                  misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K. They forget the "perfect crystal" condition.' },
                { id: 'b', prompt: 'The molar heat capacity of a perfect crystalline solid at low temperatures is given by C_p = aT³ (Debye T³ law).', answer: 'Using the Third Law, S(0) = 0',
                  options: ['Using the Third Law, S(0) = 0', 'entropy of the universe tends to zero', 'entropy of a perfect crystal at 0 K is zero', 'the Third Law implies *all* substances have zero entropy at 0 K'],
                  hint: 'If stuck, revisit node c11_chem_cbse_06_008 (Entropy: Definition and Second Law) and the Boltzmann.',
                  misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K. They forget the "perfect crystal" condition.' },
                { id: 'c', prompt: 'Compare the absolute entropy at 298 K of two isomeric solids: one a perfect crystal, the other a solid solution with random mixing.', answer: 'The solid solution has higher absolute entropy at 298 K',
                  options: ['The solid solution has higher absolute entropy at 298 K', 'entropy of the universe tends to zero', 'entropy of a perfect crystal at 0 K is zero', 'the Third Law implies *all* substances have zero entropy at 0 K'],
                  hint: 'If stuck, revisit node c11_chem_cbse_06_008 (Entropy: Definition and Second Law) and the Boltzmann.',
                  misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K. They forget the "perfect crystal" condition.' }
          ],
            remediations: { 'the-third-law-implies-all': { steps: ['If a student makes this error, guide them through these steps: 1) Draw a perfect crystal lattice (e.g., NaCl) and.', '2) Count microstates: NaCl has 1; CO has 2^N.', '4) Show that only the perfect crystal gives S=0.', '5) Re-read the NCERT statement of the Third Law, highlighting "perfect crystalline substance." 6) Practice identifying.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_010', difficulty: 'standard',
          question: 'The standard Gibbs energy change (ΔG°) of a reaction is quantitatively related.',
          hint: 'Revisit node c11_chem_cbse_06_007 (Spontaneity: Gibbs Energy Change) and practice.',
          misconception: 'Students treat ΔG° and ΔG as interchangeable, writing "ΔG = –RT ln K" instead of "ΔG° = –RT ln K".',
          parts: [
                { id: 'a', prompt: 'Explain why ΔG° = –RT ln K implies that a negative ΔG° corresponds to K > 1, while a positive ΔG° corresponds to K < 1.', answer: 'Since R > 0 and T > 0, the sign of –RT ln K is opposite to the sign of ln K',
                  options: ['Since R > 0 and T > 0, the sign of –RT ln K is opposite to the sign of ln K', 'negative ΔG° means spontaneous so K is large'],
                  hint: 'Revisit node c11_chem_cbse_06_007 (Spontaneity: Gibbs Energy Change) and practice calculating ΔG.',
                  misconception: 'Students treat ΔG° and ΔG as interchangeable, writing "ΔG = –RT ln K" instead of "ΔG° = –RT ln K".' }
          ],
            remediations: { 'students-treat-g-and-g': { steps: ['Write ΔG = ΔG° + RT ln Q on a card.', 'Circle ΔG° and label "CONSTANT for a given T, uses standard states".', 'Circle ΔG and label "VARIES with composition, zero at equilibrium".', 'Circle Q and label "INSTANTANEOUS ratio, equals K only at equilibrium".'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
