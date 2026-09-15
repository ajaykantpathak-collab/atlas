import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch01_p2: SimDef = {
    id: 'v3_c12_chem_ch01_p2',
    title: 'Solutions · Part 2/2',
    subtitle: 'Mercury in your tooth, oxygen in your blood — one law runs both',
    classLevel: 12, subject: 'chemistry', topic: 'Solutions · Part 2/2',
    chapters: ['c12_chem_ch01'],
    nodeIds: ['c12_chem_cbse_01_007', 'c12_chem_cbse_01_008', 'c12_chem_cbse_01_009', 'c12_chem_cbse_01_010', 'c12_chem_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Formulation chemist', intro: 'Air, soda, steel, amalgam — your world is built of solutions. This chapter gives you the rules that govern all of them.', goal: 'Classify binary solutions and apply the laws that govern their behaviour — Raoult\'s, Henry\'s and the colligative properties.' },
    discovery: {
        question: 'A dentist packs a filling with mercury-silver amalgam. Mercury is a liquid — so is the filling a liquid solution?',
        options: ['No — silver is the solvent and it\'s solid, so the amalgam is a solid solution: liquid dissolved in solid', 'Yes — the liquid component always decides the state', 'It\'s not a solution at all, just a metal mix', 'It\'s a gas-in-liquid solution trapped in a tooth'],
        answer: 'No — silver is the solvent and it\'s solid, so the amalgam is a solid solution: liquid dissolved in solid',
        hook: 'Students label solutions by the solute\'s state. The rule is the opposite: whichever component is in excess — the solvent — sets the phase. That\'s why oxygen-in-water is a liquid solution and brass is a solid one.',
    },
    teaching: [
        { title: 'Colligative Properties: Relative Lowering of Vapour Pressure', text: 'Relative lowering of vapour pressure (RLVP) is the ratio of the decrease in vapour pressure of a solvent upon addition of a non‑volatile solute to the vapour pressure of the pure solvent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_01_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Classify the nine families of solutions hiding in your kitchen and clinic, then push deeper — from Raoult\'s law and Henry\'s law to why salt melts ice and why your blood cells shrink in concentrated brine.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_01_008', title: 'Colligative Properties: Elevation of Boiling Point',
          scaffold: { problem: 'A pressure cooker reduces cooking time by raising the boiling point of water.',
            steps: [
            { text: 'Identify the solute (NaCl) and solvent (water). Note NaCl is a strong electrolyte → dissociates into Na⁺ and Cl⁻ →.' },
            { text: 'Calculate moles of NaCl = mass / molar mass = 58.5 g / 58.5 g mol⁻¹ = 1.00 mol.' },
            { text: 'Calculate molality of NaCl = moles / kg solvent = 1.00 mol / 1.00 kg = 1.00 mol kg⁻¹.' },
            { text: 'Effective molality (particle concentration) = i × m = 2 × 1.00 = 2.00 mol kg⁻¹.' },
            { text: 'Apply ΔTb = i × Kb × m = 2 × 0.52 K kg mol⁻¹ × 1.00 mol kg⁻¹ = 1.04 K.' },
            { text: 'New boiling point = 373.15 K + 1.04 K = 374.19 K (or 101.04°C).', faded: true, blankAnswer: 'ΔTb = 1.04 K; Boiling point = 374.19 K (101.04°C)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_01_009', title: 'Colligative Properties: Depression of Freezing Point',
          scaffold: { problem: 'In a cold storage facility in Himachal Pradesh, 500 g of ethylene glycol (C₂H₆O₂, molar mass 62 g mol⁻¹) is added to 4 kg of water in.',
            steps: [
            { text: 'Calculate moles of ethylene glycol = mass / molar mass = 500 g / 62 g mol⁻¹ = 8.0645 mol.' },
            { text: 'Convert mass of water to kg = 4 kg.' },
            { text: 'Calculate molality = moles solute / kg solvent = 8.0645 mol / 4 kg = 2.016 mol kg⁻¹.' },
            { text: 'Calculate ΔTf = Kf × m = 1.86 K kg mol⁻¹ × 2.016 mol kg⁻¹ = 3.75 K.' },
            { text: 'Freezing point of solution = 0°C - 3.75°C = -3.75°C (or 273.15 K - 3.75 K = 269.40 K).', faded: true, blankAnswer: 'Freezing point = -3.75°C (269.40 K)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_01_010', title: 'Colligative Properties: Osmotic Pressure',
          scaffold: { problem: 'A patient needs intravenous (IV) fluid that is isotonic with blood (osmotic pressure ≈ 7.65 bar at 310 K).',
            steps: [
            { text: 'Identify target osmotic pressure Π = 7.65 bar, T = 310 K, V = 0.500 L. For glucose (non-electrolyte), i = 1.' },
            { text: 'Use Π = iCRT → C = Π/(iRT). Calculate required molarity for each solute.' },
            { text: 'For glucose: C_glu = 7.65 / (1 × 0.083 × 310) = 7.65 / 25.73 = 0.297 M.' },
            { text: 'For NaCl: C_NaCl = 7.65 / (1.9 × 0.083 × 310) = 7.65 / 48.89 = 0.156 M.' },
            { text: 'Convert molarity to mass: w = C × V × M.' },
            { text: 'Glucose mass = 0.297 mol L⁻¹ × 0.500 L × 180 g mol⁻¹ = 26.7 g.' },
            { text: 'NaCl mass = 0.156 mol L⁻¹ × 0.500 L × 58.5 g mol⁻¹ = 4.56 g.' },
            { text: 'Compare: Glucose provides calories (energy) but no electrolytes.', faded: true, blankAnswer: 'Glucose: 26.7 g in 500 mL (5.34% w/v). NaCl: 4.56 g in 500.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_01_011', title: 'Van\'t Hoff Factor: Abnormal Molar Mass',
          scaffold: { problem: 'In a cold region of North India, 5.85 g of NaCl is spread on 1 kg of water on a road to prevent icing.',
            steps: [
            { text: 'Calculate moles of NaCl = mass / molar mass = 5.85 g / 58.5 g mol⁻¹ = 0.1 mol.' },
            { text: 'Calculate molality = moles solute / kg solvent = 0.1 mol / 1 kg = 0.1 mol kg⁻¹.' },
            { text: 'For complete dissociation NaCl → Na⁺ + Cl⁻, ν = 2, so theoretical i = 2.' },
            { text: 'Experimental ΔTf = 0 - (-0.33) = 0.33 K. Experimental i = ΔTf(obs) / (Kf·m) = 0.33 / (1.86 × 0.1) = 0.33 / 0.186.' },
            { text: 'For NaCl, i = 1 + α (since ν=2). So α = i - 1 = 1.774 - 1 = 0.774 = 77.4%.', faded: true, blankAnswer: 'Predicted freezing point (complete dissociation).' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling samples for the chemistry practical file, a student tags a cold-drink bottle \'gaseous solution\' — her reasoning: the dissolved CO₂ is a gas, so the solution must be a gas too.',
            decisions: [{ prompt: 'Is the label right?', options: [
                { text: 'No — the solvent, not the solute, sets the phase: water is the major component and is liquid, so this is a liquid solution of gas in liquid.', outcome: 'Same rule explains why mercury-in-silver amalgam is a solid solution despite mercury being liquid — the component in excess fixes the state.' },
                { text: 'Yes — the solute\'s physical state decides the solution\'s class, and CO₂ is a gas.', outcome: 'That rule would also make brass a liquid and air unclassifiable; the solvent\'s state is what defines the solution\'s.', reveals: 'solute-state-decides' },
                { text: 'Yes — and by the same logic brass is a liquid solution since copper and zinc can be melted.', outcome: 'Classification uses states at the given temperature, not melting points; brass at room temperature is a solid solution.', reveals: 'melting-point-decides-phase' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_01_011', title: 'You made it',
          caseStudy: { intro: 'You can now decode every mixture around you and predict how a dissolved particle bends vapour pressure, boiling point and osmosis. Solutions is the numerical backbone of physical chemistry — and the board knows it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_01_007', difficulty: 'standard',
          question: 'Relative lowering of vapour pressure (RLVP) is the ratio of the decrease.',
          hint: 'If stuck, review mole fraction calculations (c12_chem_cbse_01_003) and the derivation.',
          misconception: 'Students often confuse the formula for relative lowering of vapour pressure with Raoult’s law for the solvent.',
          parts: [
                { id: 'a', prompt: 'Two solutions are prepared: Solution A has 10 g of urea (M = 60 g mol⁻¹) in 100 g water; Solution B has 10 g of glucose (M = 180 g mol⁻¹) in 100 g water.', answer: 'Solution A (urea) shows greater RLVP',
                  options: ['Solution A (urea) shows greater RLVP', 'glucose lowers more'],
                  hint: 'If stuck, review mole fraction calculations (c12_chem_cbse_01_003) and the derivation of Raoult’s.',
                  misconception: 'Students often confuse the formula for relative lowering of vapour pressure with Raoult’s law for the solvent.' }
          ],
            remediations: { 'students-often-confuse-the-formula': { steps: ['Re‑read the derivation of RLVP from Raoult’s law in the textbook (Section 1.6.1).', 'Practice writing the steps: p₁ = x₁p°₁ → p°₁ – p₁ = p°₁(1 – x₁) → (p°₁ – p₁)/p°₁ = x₂.', 'Solve three numerical problems using the exact formula (not the approximation) and then the approximation, comparing.', 'Revisit mole fraction calculations (node c12_chem_cbse_01_003) if converting mass to moles is shaky.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_01_008', difficulty: 'standard',
          question: 'Elevation of boiling point is a colligative property where the boiling point.',
          hint: 'If stuck, revisit c12_chem_cbse_01_004 for molality calculations and c12_chem_cbse_01_007.',
          misconception: 'Students often use molarity (mol/L of solution) instead of molality (mol/kg of solvent) in ΔTb = Kb·m because they.',
          parts: [
                { id: 'a', prompt: 'Why does a solution of 1 mol glucose in 1 kg water boil at a higher temperature than pure water, even though glucose does not evaporate?', answer: 'Glucose lowers the vapour pressure of water at all temperatures (Raoult\'s law)',
                  options: ['Glucose lowers the vapour pressure of water at all temperatures (Raoult\'s law)', 'glucose increases intermolecular forces', 'glucose reacts with water'],
                  hint: 'If stuck, revisit c12_chem_cbse_01_004 for molality calculations and c12_chem_cbse_01_007 for the.',
                  misconception: 'Students often use molarity (mol/L of solution) instead of molality (mol/kg of solvent) in ΔTb = Kb·m because they confuse the two.' }
          ],
            remediations: { 'students-often-use-molarity-mol': { steps: ['If a student uses molarity instead of molality: (1) Revisit c12_chem_cbse_01_004 (Molality and Normality) — re-derive.', '(2) Do a side-by-side comparison: take 1 M glucose solution at 25°C, calculate its molality using density, then.', '(3) Re-attempt Diagnostic Question 3 using both molarity and molality; compute the % error.', '(4) If the error persists, practice 5 numericals where only molality works (solvent mass given, not solution volume).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_01_009', difficulty: 'standard',
          question: 'Depression of freezing point is a colligative property where the freezing point.',
          hint: 'If stuck on molality calculation, review c12_chem_cbse_01_004.',
          misconception: 'Students often use molarity (mol L⁻¹) instead of molality (mol kg⁻¹) in ΔTf = Kf·m because they confuse the two.',
          parts: [
                { id: 'a', prompt: 'Why does the freezing point of a solvent decrease when a non-volatile solute is added? Explain using vapour pressure curves.', answer: 'At the freezing point, solid and liquid solvent have equal vapour pressure',
                  options: ['At the freezing point, solid and liquid solvent have equal vapour pressure', 'solute particles block solidification'],
                  hint: 'If stuck on molality calculation, review c12_chem_cbse_01_004.',
                  misconception: 'Students often use molarity (mol L⁻¹) instead of molality (mol kg⁻¹) in ΔTf = Kf·m because they confuse the two concentration terms.' }
          ],
            remediations: { 'students-often-use-molarity-mol': { steps: ['If a student uses molarity instead of molality, have them revisit node c12_chem_cbse_01_004 (Molality and Normality).', 'Perform a quick activity: weigh 100 g water, add 5 g NaCl, measure volume of solution — show that volume ≠ 100 mL,.', 'Then re-derive ΔTf formula emphasizing mass of solvent in kg.', 'For the 1000-factor error, practice unit analysis: Kf (K kg mol⁻¹) × w₂ (g) / (ΔTf (K) × w₁ (g)) → units g mol⁻¹ only.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_01_010', difficulty: 'standard',
          question: 'Osmotic pressure (Π) is the minimum excess pressure that must be applied to.',
          hint: 'If stuck on derivation: Revisit c11_chem_cbse_05_006 (Ideal Gas Equation) and visualise.',
          misconception: 'Students confuse the formula Π = CRT with Π = (n₂/V)RT and use molality (m) instead of molarity (C).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Osmotic pressure (Π) is the minimum excess pressure that must be applied to a solution to',
                  options: ['Osmotic pressure (Π) is the minimum excess pressure that must be applied to a solution to', 'A solution is a homogeneous mixture of two or more chemically non-reacting substances', 'Solubility is the maximum amount of solute (in grams or moles) that can dissolve in a', 'Concentration of a solution quantitatively expresses the amount of solute present in a'],
                  hint: 'If stuck on derivation: Revisit c11_chem_cbse_05_006 (Ideal Gas Equation) and visualise solute.',
                  misconception: 'Students confuse the formula Π = CRT with Π = (n₂/V)RT and use molality (m) instead of molarity (C).' }
          ],
            remediations: { 'students-confuse-the-formula-crt': { steps: ['If a student uses molality in Π = mRT: (1) Revisit c12_chem_cbse_01_007 (Relative Lowering of Vapour Pressure) and.', '(2) Re-derive Π from ideal gas law: ΠV = n₂RT → Π = (n₂/V)RT = CRT.', 'Emphasise: V is solution volume, not solvent mass.', '(3) Practice conversion: Given 0.1 m glucose (density 1.02 g mL⁻¹), find C.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse the formula Π = CRT with Π = (n₂/V)RT and use molality (m) instead of molarity (C).',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Reverse osmosis can purify sea water because applying pressure greater than osmotic pressure forces pure water through the membrane.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'exactly equal'],
                  hint: 'If stuck on derivation: Revisit c11_chem_cbse_05_006 (Ideal Gas Equation) and visualise solute.',
                  misconception: 'Students confuse the formula Π = CRT with Π = (n₂/V)RT and use molality (m) instead of molarity (C).' }
          ],
            remediations: { 'students-confuse-the-formula-crt': { steps: ['If a student uses molality in Π = mRT: (1) Revisit c12_chem_cbse_01_007 (Relative Lowering of Vapour Pressure) and.', '(2) Re-derive Π from ideal gas law: ΠV = n₂RT → Π = (n₂/V)RT = CRT.', 'Emphasise: V is solution volume, not solvent mass.', '(3) Practice conversion: Given 0.1 m glucose (density 1.02 g mL⁻¹), find C.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_01_011', difficulty: 'standard',
          question: 'The Van\'t Hoff factor (i) is a dimensionless quantity that accounts for the.',
          hint: 'If stuck, review the molality calculation (c11_chem_cbse_01_014) and the freezing point.',
          misconception: 'Students often write the Van\'t Hoff factor for a dissociating electrolyte as i = 1 + α (where α is degree.',
          parts: [
                { id: 'a', prompt: 'What is the Van\'t Hoff factor (i) for a solution of glucose (C₆H₁₂O₆) in water? Explain why it has this value.', answer: 'The Van\'t Hoff factor i = 1 for glucose in water',
                  options: ['The Van\'t Hoff factor i = 1 for glucose in water', 'all solutes dissociate, confusing glucose with ionic compounds like NaCl'],
                  hint: 'If stuck, review the molality calculation (c11_chem_cbse_01_014) and the freezing point depression.',
                  misconception: 'Students often write the Van\'t Hoff factor for a dissociating electrolyte as i = 1 + α (where α is degree of dissociation) without.' }
          ],
            remediations: { 'students-often-write-the-van': { steps: ['If a student struggles with the Van\'t Hoff factor: 1.', 'Revisit node c12_chem_cbse_01_009 (Depression of Freezing Point) and re-derive ΔTf = Kf·m from the concept of particle.', 'Practice the "particle counting" method: write the dissociation/association equation, draw a table of initial moles.', 'Solve 3 problems: one with NaCl (i≈2), one with CaCl₂ (i≈3), one with benzoic acid dimerization (i≈0.5).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
