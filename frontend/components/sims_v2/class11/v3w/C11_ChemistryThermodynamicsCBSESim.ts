import type { SimDef } from '../../engine/types';
import C11_ChemistryThermodynamicsCBSESim from '../../../simulations/c6_12/C11_ChemistryThermodynamicsCBSESim';

/** v3 wrapped master — C11_ChemistryThermodynamicsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistrythermodynamicscbsesim: SimDef = {
    id: 'v3w_c11_chemistrythermodynamicscbsesim',
    title: 'Thermodynamic Terms: System, Surroundings, State',
    subtitle: 'Covers: definitions of system, surroundings, boundary; types of systems (open, closed,.',
    classLevel: 11, subject: 'chemistry', topic: 'Thermodynamic Terms: System, Surroundings, State',
    chapters: [],
    nodeIds: ['c11_chem_cbse_06_001', 'c11_chem_cbse_06_002', 'c11_chem_cbse_06_003', 'c11_chem_cbse_06_007', 'c11_chem_cbse_06_008', 'c11_chem_cbse_06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a pressure cooker whistling on a gas stove — the steam inside is the **system**, the metal pot and.', goal: 'Master Thermodynamic Terms: System, Surroundings, State.' },
    discovery: {
        question: 'Classify each as open, closed, or isolated system: (a) a sealed soda bottle before opening, (b) an earthen pot (matka) cooling water by evaporation, (c) a.',
        options: ['a sealed soda bottle before opening, (', 'sealed', 'thermally insulated'],
        answer: 'a sealed soda bottle before opening, (',
        hook: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".',
    },
    teaching: [
        { title: 'In thermodynamics, a **system** is the.', text: 'In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants in a beaker, gas in a piston) chosen for study; the **surroundings** comprise everything else that can.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_001', title: 'In thermodynamics, a **system** is the.',
          scaffold: { problem: '50.0 g of water at 25.0°C is placed in a sealed, rigid, insulated container (volume fixed, no heat exchange).',
            steps: [
            { text: 'Identify the system — the water (50.0 g) is the portion under study.' },
            { text: 'Analyze boundaries — sealed (no matter exchange), rigid (fixed volume), insulated (no heat exchange).' },
            { text: 'Recognize that stirring work (w = +2.5 kJ) crosses the boundary — energy enters as work, so the system is **not.' },
            { text: 'State variables that change: Temperature T increases (water heats up), Pressure P increases (rigid container, water.' },
            { text: 'Apply first law preview: ΔU = q + w. Here q = 0 (adiabatic), w = +2.5 kJ (work done *on* system). So ΔU = +2.5 kJ.', faded: true, blankAnswer: 'System: closed (adiabatic boundary, work interaction)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_002', title: 'Internal energy (U) is the total energy.',
          scaffold: { problem: '0.5 mol of an ideal gas at 300 K expands reversibly and isothermally from an initial pressure of 4 atm to a final pressure of 1 atm.',
            steps: [
            { text: 'Identify process — reversible isothermal expansion of ideal gas. For ideal gas, U depends only on T.' },
            { text: 'Apply First Law: ΔU = q + w = 0 ⇒ q = -w. Heat absorbed equals work done by gas in magnitude, opposite sign.' },
            { text: 'Calculate work using reversible isothermal formula: w = -nRT ln(V₂/V₁). Need volume ratio.' },
            { text: 'Compute w = -(0.5 mol)(8.314 J·mol⁻¹·K⁻¹)(300 K) ln(4) = -1247.1 × 1.3863 = -1729 J.' },
            { text: 'q = -w = +1729 J (heat absorbed by gas). ΔU = 0 J. Verify: Energy conservation — 1729 J heat in = 1729 J work out.', faded: true, blankAnswer: '(a) w = -1729 J (work done by gas); (b) q = +1729 J (heat.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_003', title: 'Enthalpy (H) is a thermodynamic state.',
          scaffold: { problem: 'In a constant-pressure calorimeter at 298 K, the combustion of 1.00 g of graphite (C) to CO₂(g) releases 32.8 kJ of heat.',
            steps: [
            { text: 'Identify process conditions — constant pressure (open calorimeter), so q_p = ΔH. Heat released = –32.8 kJ per 1.00 g C.' },
            { text: 'Convert to molar basis: ΔH = (–32.8 kJ / 1.00 g) × 12.01 g mol⁻¹ = –393.9 kJ mol⁻¹.' },
            { text: 'Determine Δn_g for reaction: CO₂(g) → 1 mol gas; O₂(g) → 1 mol gas; C(s) → 0 mol gas. Δn_g = 1 – 1 = 0.' },
            { text: 'Apply ΔH = ΔU + Δn_gRT. Since Δn_g = 0, ΔH = ΔU = –393.9 kJ mol⁻¹.' },
            { text: 'Verify units and sign: exothermic, negative; magnitude matches literature ΔH°_comb(C) ≈ –393.5 kJ mol⁻¹.' },
            { text: 'Interpret: For reactions with no net gas mole change, calorimetric q_p directly gives ΔU without correction.', faded: true, blankAnswer: 'ΔH = –393.9 kJ mol⁻¹, ΔU = –393.9 kJ mol⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_007', title: 'Gibbs energy change (ΔG) is the.',
          scaffold: { problem: 'The Haber process for ammonia synthesis N₂(g) + 3H₂(g) ⇌ 2NH₃(g) has ΔH° = -92.4 kJ mol⁻¹ and ΔS° = -198.3 J K⁻¹ mol⁻¹.',
            steps: [
            { text: 'Identify the crossover temperature where ΔG° = 0. Use T_crossover = ΔH°/ΔS° with consistent units.' },
            { text: 'Calculate T_crossover = (-92.4 kJ mol⁻¹) / (-0.1983 kJ K⁻¹ mol⁻¹) = 466 K.' },
            { text: 'Calculate ΔG° at 700 K: ΔG° = ΔH° - TΔS° = -92.4 - (700)(-0.1983) = -92.4 + 138.8 = +46.4 kJ mol⁻¹.' },
            { text: 'Since ΔG° > 0 at 700 K, the reaction is non-spontaneous under standard conditions (1 bar each gas).' },
            { text: 'Interpret: K << 1 means equilibrium favors reactants heavily at 700 K.', faded: true, blankAnswer: 'Crossover temperature = 466 K. At 700 K: ΔG° = +46.4 kJ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_008', title: 'Entropy (S) is a thermodynamic state.',
          scaffold: { problem: '1 mole of an ideal gas expands isothermally and reversibly from 10 L to 100 L at 300 K.',
            steps: [
            { text: 'Identify process — isothermal reversible expansion of ideal gas. ΔU = 0, so q_rev = -w = nRT ln(V₂/V₁).' },
            { text: 'Calculate q_rev = (1 mol) × (8.314 J mol⁻¹ K⁻¹) × (300 K) × ln(100/10) = 2494.2 × ln(10) = 2494.2 × 2.3026 = 5743 J.' },
            { text: 'ΔS_sys = q_rev/T = 5743 J / 300 K = 19.14 J K⁻¹.' },
            { text: 'For surroundings, heat released = -q_rev = -5743 J at same T, so ΔS_surr = -5743/300 = -19.14 J K⁻¹.' },
            { text: 'ΔS_univ = ΔS_sys + ΔS_surr = 0. This confirms reversible process has ΔS_univ = 0.', faded: true, blankAnswer: 'ΔS_sys = +19.14 J K⁻¹, ΔS_surr = -19.14 J K⁻¹, ΔS_univ = 0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_06_009', title: 'The Third Law of Thermodynamics states.',
          scaffold: { problem: 'The molar heat capacity of a perfect crystalline solid at low temperatures follows C_p = 0.002 T³ J K⁻¹ mol⁻¹ (with T in K).',
            steps: [
            { text: 'Identify that the Third Law sets S(0 K) = 0 for a perfect crystal.' },
            { text: 'Write the entropy change formula: ΔS = ∫(C_p/T)dT from 0 to T.' },
            { text: 'Substitute C_p = 0.002 T³. The integrand becomes (0.002 T³)/T = 0.002 T².' },
            { text: 'Integrate: ∫₀¹⁰ 0.002 T² dT = 0.002 [T³/3]₀¹⁰ = 0.002 × (1000/3) = 0.6667 J K⁻¹ mol⁻¹.' },
            { text: 'Since S(0)=0, S(10 K) = 0.667 J K⁻¹ mol⁻¹. Verify units: C_p/T has units J K⁻¹ mol⁻¹ / K = J K⁻² mol⁻¹, multiplied by.', faded: true, blankAnswer: '0.667 J K⁻¹ mol⁻¹' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Thermodynamic Terms: System, Surroundings, State', spots: [
            { id: 's1', label: 'In thermodynamics a system is', prompt: 'Which idea is this? — In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants.', answer: 'In thermodynamics a system is', options: ['In thermodynamics a system is', 'Internal energy U is the', 'Enthalpy H is a thermodynamic', 'Gibbs energy change G is'] },
            { id: 's2', label: 'Internal energy U is the', prompt: 'Which idea is this? — Internal energy (U) is the total energy stored within a thermodynamic system arising from.', answer: 'Internal energy U is the', options: ['Internal energy U is the', 'In thermodynamics a system is', 'Enthalpy H is a thermodynamic', 'Gibbs energy change G is'] },
            { id: 's3', label: 'Enthalpy H is a thermodynamic', prompt: 'Which idea is this? — Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal.', answer: 'Enthalpy H is a thermodynamic', options: ['Enthalpy H is a thermodynamic', 'In thermodynamics a system is', 'Internal energy U is the', 'Gibbs energy change G is'] },
            { id: 's4', label: 'Gibbs energy change G is', prompt: 'Which idea is this? — Gibbs energy change (ΔG) is the thermodynamic potential that determines the spontaneity.', answer: 'Gibbs energy change G is', options: ['Gibbs energy change G is', 'In thermodynamics a system is', 'Internal energy U is the', 'Enthalpy H is a thermodynamic'] },
            { id: 's5', label: 'Entropy S is a thermodynamic', prompt: 'Which idea is this? — Entropy (S) is a thermodynamic state function that quantifies the degree of disorder or.', answer: 'Entropy S is a thermodynamic', options: ['Entropy S is a thermodynamic', 'In thermodynamics a system is', 'Internal energy U is the', 'Enthalpy H is a thermodynamic'] },
            { id: 's6', label: 'The Third Law of Thermodynamics', prompt: 'Which idea is this? — The Third Law of Thermodynamics states that the entropy of a perfect crystalline.', answer: 'The Third Law of Thermodynamics', options: ['The Third Law of Thermodynamics', 'In thermodynamics a system is', 'Internal energy U is the', 'Enthalpy H is a thermodynamic'] }
          ] } }
    ],
    explore: { component: C11_ChemistryThermodynamicsCBSESim, prompt: 'Explore the interactive — Thermodynamic Terms: System, Surroundings, State' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_001', difficulty: 'standard',
          question: 'In thermodynamics, a **system** is the specific portion of the universe (e.g.,.',
          hint: 'If stuck on system classification, revisit Class 10 "Chemical Reactions".',
          misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".',
          parts: [
                { id: 'a', prompt: 'Classify each as open, closed, or isolated system: (a) a sealed soda bottle before opening, (b) an earthen pot (matka) cooling water by evaporation, (c) a.', answer: 'a sealed soda bottle before opening, (',
                  options: ['a sealed soda bottle before opening, (', 'sealed', 'thermally insulated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' },
                { id: 'b', prompt: 'A gas in a piston-cylinder assembly expands from 2.0 L to 5.0 L against a constant external pressure of 1.0 atm. The initial temperature is 300 K.', answer: 'No, work is not a state function',
                  options: ['No, work is not a state function', 'work depends only on initial and final volume', 'closed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' },
                { id: 'c', prompt: 'Two identical samples of an ideal gas at 300 K, 1 atm, 10 L are compressed to 5 L.', answer: 'Final T: Sample A stays at 300 K (isothermal)',
                  options: ['Final T: Sample A stays at 300 K (isothermal)', 'closed', 'thermally insulated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' }
          ],
            remediations: { 'a-closed-system-cannot-exchange': { steps: ['Do this 5-minute demo: Take two identical steel tumblers.', 'Fill both with 100 mL hot water (80°C).', 'Cover one with a tight lid (closed system).', 'Leave the other open (open system).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".',
          parts: [
                { id: 'a', prompt: 'A student writes: "The enthalpy change of a reaction is a path function because it depends on whether the reaction occurs in one step or multiple steps.".', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'closed', 'thermally insulated'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a **closed system** cannot exchange **heat** — they equate "closed" with "thermally insulated".' }
          ],
            remediations: { 'a-closed-system-cannot-exchange': { steps: ['Do this 5-minute demo: Take two identical steel tumblers.', 'Fill both with 100 mL hot water (80°C).', 'Cover one with a tight lid (closed system).', 'Leave the other open (open system).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_002', difficulty: 'standard',
          question: 'Internal energy (U) is the total energy stored within a thermodynamic system.',
          hint: 'If stuck on sign conventions: Revisit c11_chem_cbse_06_001 (Thermodynamic Terms) for.',
          misconception: 'Students write the First Law as ΔU = q - w (with w = work done BY system) and use w = +PΔV for expansion work.',
          parts: [
                { id: 'a', prompt: 'Two identical samples of an ideal gas undergo expansion from the same initial state (P₁, V₁, T) to the same final volume V₂.', answer: 'Reversible isothermal work: w_rev = -nRT ln(V₂/V₁)',
                  options: ['Reversible isothermal work: w_rev = -nRT ln(V₂/V₁)', 'reversible = slower = less work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the First Law as ΔU = q - w (with w = work done BY system) and use w = +PΔV for expansion work.' }
          ],
            remediations: { 'students-write-the-first-law': { steps: ['Write the IUPAC First Law ΔU = q + w on a card. Memorize: "q positive = heat IN; w positive = work ON system".', 'For any process, ask: "Is energy entering or leaving the system as work?" If system expands (pushes piston out), energy.', 'Practice 5 problems: (i) Gas expands against 2 atm, ΔV = +3 L → calculate w in J.', 'Check each against the rule: expansion → w < 0; compression → w > 0; no volume change → w = 0.', 'Derive w_rev = -nRT ln(V₂/V₁) from w = -∫P_ext dV with P_ext = P_gas = nRT/V.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_003', difficulty: 'standard',
          question: 'Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s.',
          hint: 'Revisit c11_chem_cbse_06_002: practice 3 problems calculating q, w, ΔU for isobaric gas.',
          misconception: 'Students treat ΔH = ΔU + Δn_gRT as universally valid without checking: (1) all species are ideal gases, (2) temperature.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal',
                  options: ['Enthalpy (H) is a thermodynamic state function defined as the sum of a system\'s internal', 'In thermodynamics, a **system** is the specific portion of the universe (e.g., reactants', 'Internal energy (U) is the total energy stored within a thermodynamic system arising from', 'Gibbs energy change (ΔG) is the thermodynamic potential that determines the spontaneity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat ΔH = ΔU + Δn_gRT as universally valid without checking: (1) all species are ideal gases, (2) temperature is constant, (3).' }
          ],
            remediations: { 'students-treat-h-u-n': { steps: ['Revisit c11_chem_cbse_06_002 (Internal Energy and Work) — confirm w = –pΔV at constant p.', 'Write H = U + pV, take differential: dH = dU + pdV + Vdp. At constant p, dp=0 → dH = dU + pdV = δq_p.', 'For gas reactions, practice Δn_g counting with 10 varied equations (include solids/liquids).', 'Drill unit conversion: R = 8.314 J = 0.008314 kJ.', 'Solve 5 problems where ΔU given, find ΔH and vice versa, checking |ΔH| > |ΔU| when Δn_g > 0 for endothermic.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_007', difficulty: 'standard',
          question: 'Gibbs energy change (ΔG) is the thermodynamic potential that determines the.',
          hint: 'If stuck, revisit c11_chem_cbse_06_004 (enthalpy of formation) and c11_chem_cbse_06_008.',
          misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to.',
          parts: [
                { id: 'a', prompt: 'Explain why the melting of ice (H₂O(s) → H₂O(l)) is spontaneous at 27°C but non-spontaneous at -10°C, even though ΔH and ΔS are both positive for this.', answer: 'For melting, ΔH > 0 (endothermic) and ΔS > 0 (increase in disorder)',
                  options: ['For melting, ΔH > 0 (endothermic) and ΔS > 0 (increase in disorder)', 'ΔH changes with temperature', 'entropy decreases on melting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' },
                { id: 'b', prompt: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH° = -92.4 kJ mol⁻¹ and ΔS° = -198.3 J K⁻¹ mol⁻¹. Calculate ΔG° at 298 K and 500 K.', answer: 'Step 1: Convert units: ΔS° = -0.1983 kJ K⁻¹ mol⁻¹',
                  options: ['Step 1: Convert units: ΔS° = -0.1983 kJ K⁻¹ mol⁻¹', 'all reactants convert to products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' },
                { id: 'c', prompt: 'Compare two reactions: Reaction A has ΔH° = -50 kJ mol⁻¹, ΔS° = +100 J K⁻¹ mol⁻¹. Reaction B has ΔH° = +50 kJ mol⁻¹, ΔS° = -100 J K⁻¹ mol⁻¹.', answer: 'Reaction A: ΔG = -50 - T(+0.1) = -50 - 0.1T',
                  options: ['Reaction A: ΔG = -50 - T(+0.1) = -50 - 0.1T', 'Reaction A becomes non-spontaneous at high T', 'Reaction B becomes spontaneous at low T'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' }
          ],
            remediations: { 'students-consistently-write-g-h': { steps: ['Re-derive ΔG = ΔH - TΔS from the second law: ΔS_universe = ΔS_system + ΔS_surroundings > 0.', 'Use the "ice melting" analogy: at 0°C, ice and water coexist (ΔG = 0). Below 0°C, ice is stable (ΔG > 0 for melting).', 'Practice calculating K from ΔG° using K = e^(-ΔG°/RT) for ΔG° = -5, -10, -20 kJ mol⁻¹ to see K is finite (150, 2×10⁴,.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For the reaction 2NO₂(g) ⇌ N₂O₄(g), ΔG° = -4.7 kJ mol⁻¹ at 298 K.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'all reactants convert to products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently write ΔG = ΔH + TΔS instead of ΔG = ΔH - TΔS, and they believe ΔG° < 0 means the reaction goes to 100% completion.' }
          ],
            remediations: { 'students-consistently-write-g-h': { steps: ['Re-derive ΔG = ΔH - TΔS from the second law: ΔS_universe = ΔS_system + ΔS_surroundings > 0.', 'Use the "ice melting" analogy: at 0°C, ice and water coexist (ΔG = 0). Below 0°C, ice is stable (ΔG > 0 for melting).', 'Practice calculating K from ΔG° using K = e^(-ΔG°/RT) for ΔG° = -5, -10, -20 kJ mol⁻¹ to see K is finite (150, 2×10⁴,.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_008', difficulty: 'standard',
          question: 'Entropy (S) is a thermodynamic state function that quantifies the degree of.',
          hint: 'If stuck, revisit "Thermodynamic Terms" (node 001) for reversible/irreversible.',
          misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.',
          parts: [
                { id: 'a', prompt: 'Define entropy and state its SI unit. Is entropy a state function or a path function? Justify your answer in one sentence.', answer: 'Entropy (S) is a measure of disorder or randomness in a system',
                  options: ['Entropy (S) is a measure of disorder or randomness in a system', 'entropy is heat', 'unit is J/mol'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.' },
                { id: 'b', prompt: 'A system undergoes an irreversible adiabatic expansion into vacuum (free expansion).', answer: 'Free expansion: q = 0, so ΔS_surr = 0',
                  options: ['Free expansion: q = 0, so ΔS_surr = 0', 'ΔS_sys = 0 for free expansion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.' }
          ],
            remediations: { 'students-often-write-s-q': { steps: ['If a student uses ΔS = q_irrev/T, guide them through: (1) Identify initial and final states.', '(2) Construct a reversible path (e.g., isothermal expansion for free expansion).', '(3) Calculate q_rev for that path.', 'Practice with: "Calculate ΔS for free expansion of 1 mol ideal gas from 10 L to 100 L at 300 K." (Answer: ΔS = nR.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.',
          parts: [
                { id: 'a', prompt: 'A system undergoes an irreversible adiabatic expansion into vacuum (free expansion).', answer: 'Free expansion: q = 0, so ΔS_surr = 0',
                  options: ['Free expansion: q = 0, so ΔS_surr = 0', 'ΔS_sys = 0 for free expansion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write ΔS = q/T for any process, forgetting that this formula is valid ONLY for reversible paths.' }
          ],
            remediations: { 'students-often-write-s-q': { steps: ['If a student uses ΔS = q_irrev/T, guide them through: (1) Identify initial and final states.', '(2) Construct a reversible path (e.g., isothermal expansion for free expansion).', '(3) Calculate q_rev for that path.', 'Practice with: "Calculate ΔS for free expansion of 1 mol ideal gas from 10 L to 100 L at 300 K." (Answer: ΔS = nR.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_06_009', difficulty: 'standard',
          question: 'The Third Law of Thermodynamics states that the entropy of a perfect.',
          hint: 'If stuck, revisit node c11_chem_cbse_06_008 (Entropy: Definition and Second Law) and the.',
          misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K.',
          parts: [
                { id: 'a', prompt: 'Why does a perfect crystal at 0 K have zero entropy, while a glassy solid or a solid solution of CO does not? Explain using the concept of microstates.', answer: 'A perfect crystal at 0 K has only one microstate (W = 1)',
                  options: ['A perfect crystal at 0 K has only one microstate (W = 1)', 'entropy of the universe tends to zero', 'entropy of a perfect crystal at 0 K is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K. They forget the "perfect crystal" condition.' },
                { id: 'b', prompt: 'The molar heat capacity of a perfect crystalline solid at low temperatures is given by C_p = aT³ (Debye T³ law).', answer: 'Using the Third Law, S(0) = 0',
                  options: ['Using the Third Law, S(0) = 0', 'entropy of the universe tends to zero', 'entropy of a perfect crystal at 0 K is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K. They forget the "perfect crystal" condition.' },
                { id: 'c', prompt: 'Compare the absolute entropy at 298 K of two isomeric solids: one a perfect crystal, the other a solid solution with random mixing.', answer: 'The solid solution has higher absolute entropy at 298 K',
                  options: ['The solid solution has higher absolute entropy at 298 K', 'entropy of the universe tends to zero', 'entropy of a perfect crystal at 0 K is zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Third Law implies *all* substances have zero entropy at 0 K. They forget the "perfect crystal" condition.' }
          ],
            remediations: { 'the-third-law-implies-all': { steps: ['If a student makes this error, guide them through these steps: 1) Draw a perfect crystal lattice (e.g., NaCl) and a.', '2) Count microstates: NaCl has 1; CO has 2^N.', '4) Show that only the perfect crystal gives S=0.', '5) Re-read the NCERT statement of the Third Law, highlighting "perfect crystalline substance." 6) Practice identifying.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
