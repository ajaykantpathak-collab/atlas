import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch05_p1: SimDef = {
    id: 'v3_c11_chem_ch05_p1',
    title: 'States of Matter · Part 1/3',
    subtitle: 'Separate London, dipole-dipole and hydrogen-bond contributions and predict who boils first.',
    classLevel: 11, subject: 'chemistry', topic: 'States of Matter · Part 1/3',
    chapters: ['c11_chem_ch05'],
    nodeIds: ['c11_chem_cbse_05_001', 'c11_chem_cbse_05_002', 'c11_chem_cbse_05_003', 'c11_chem_cbse_05_004', 'c11_chem_cbse_05_005', 'c11_chem_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physical chemist explaining anomalous boiling points', intro: 'A gecko walks up glass and iodine leaps straight to vapour — name the invisible grip behind both.', goal: 'Distinguish London dispersion from dipole-dipole forces and use polarizability to predict boiling trends.' },
    discovery: {
        question: 'Nonpolar iodine (I2) boils at 184°C while polar HCl boils at -85°C. If dipole-dipole forces always beat London forces, this is backwards. What actually decides it?',
        options: ['I2\'s large polarizable electron cloud gives London forces that outweigh HCl\'s dipole forces', 'HCl\'s dipole is too weak to matter at any temperature', 'Iodine secretly hydrogen-bonds like water does', 'Molar mass directly sets boiling point regardless of forces'],
        answer: 'I2\'s large polarizable electron cloud gives London forces that outweigh HCl\'s dipole forces',
        hook: 'Every molecule has London forces — a permanent dipole is a bonus on top, and a big electron cloud can outmuscle polarity.',
    },
    teaching: [
        { title: 'Intermolecular Forces: van der Waals Forces', text: 'Van der Waals forces are the collective term for weak, short-range electrostatic attractive forces between neutral atoms or molecules, arising from transient or permanent dipoles; they include London.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_05_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Rank the Group 14 hydrides by boiling point using polarizability, then explain why nonpolar I2 outboils polar HCl.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_002', title: 'London Forces and Dipole-Dipole Forces',
          caseStudy: { intro: 'Observe iodine crystals subliming in a watch glass when heated gently — purple vapours appear without melting.',
            decisions: [{ prompt: 'Define London dispersion forces and state the fundamental origin of the instantaneous dipole in a nonpolar atom or molecule.', options: [
                { text: 'London dispersion forces are weak, short-range attractive forces between nonpolar', outcome: 'London dispersion forces are weak, short-range attractive forces between nonpolar atoms/molecules.' },
                { text: 'London forces occur only in large molecules', outcome: 'Not quite — Students believe London forces exist ONLY in nonpolar molecules and dipole-dipole forces exist ONLY.', reveals: 'london-forces-exist-only-in' },
                { text: 'permanent dipoles', outcome: 'Not quite — Students believe London forces exist ONLY in nonpolar molecules and dipole-dipole forces exist ONLY.', reveals: 'london-forces-exist-only-in' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_004', title: 'Gas Laws: Boyle\'s Law',
          scaffold: { problem: 'A sealed syringe contains 30 mL of air at 1.0 atm pressure at 25°C. The plunger is pushed in slowly until the volume reads 10 mL.',
            steps: [
            { text: 'Identify knowns — \\(P_1 = 1.0\\) atm, \\(V_1 = 30\\) mL, \\(V_2 = 10\\) mL, constant T and n.' },
            { text: 'Apply Boyle\'s Law \\(P_1V_1 = P_2V_2\\) to find \\(P_2 = \\frac{P_1V_1}{V_2} = \\frac{1.0 \\times 30}{10} = 3.0\\) atm.' },
            { text: 'Convert pressure to Pa: \\(P_2 = 3.0 \\times 101325 = 303975\\) Pa.' },
            { text: 'Convert area to m²: \\(A = 2.5\\) cm² = \\(2.5 \\times 10^{-4}\\) m².' },
            { text: 'Calculate force: \\(F = P \\times A = 303975 \\times 2.5 \\times 10^{-4} = 75.99\\) N ≈ 76 N.', faded: true, blankAnswer: 'New pressure = 3.0 atm; Force required = 76 N.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_005', title: 'Gas Laws: Charles\'s Law',
          scaffold: { problem: 'A weather balloon in Mumbai contains 2.5 L of helium at 27°C and 1 atm.',
            steps: [
            { text: 'Identify given data and constant conditions. V₁ = 2.5 L, T₁ = 27°C, T₂ = -23°C, P constant, n constant.' },
            { text: 'Convert temperatures to Kelvin. T₁ = 27 + 273 = 300 K. T₂ = -23 + 273 = 250 K.' },
            { text: 'Write Charles\'s Law formula for constant P, n: V₁/T₁ = V₂/T₂.' },
            { text: 'Substitute values and solve for V₂. V₂ = V₁ × (T₂/T₁) = 2.5 L × (250 K / 300 K) = 2.5 × (5/6) = 2.0833 L.' },
            { text: 'Check reasonableness: temperature decreased, so volume should decrease. 2.08 L < 2.5 L, correct.', faded: true, blankAnswer: '2.1 L (or 2.08 L)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_006', title: 'Ideal Gas Equation: PV = nRT',
          scaffold: { problem: 'An LPG cylinder in a Delhi household contains 14.2 kg of butane (C₄H₁₀) at 27°C.',
            steps: [
            { text: 'Identify knowns and unknown. Known: mass = 14.2 kg = 14200 g, V = 25.0 L, T = 27°C = 300 K, R = 0.0821 L·atm·K⁻¹·mol⁻¹.' },
            { text: 'Calculate moles of butane. n = mass / M = 14200 g / 58 g·mol⁻¹ = 244.83 mol.' },
            { text: 'Rearrange ideal gas equation for pressure. P = nRT / V.' },
            { text: 'Substitute values with units. P = (244.83 mol × 0.0821 L·atm·K⁻¹·mol⁻¹ × 300 K) / 25.0 L.' },
            { text: 'Perform calculation. P = (244.83 × 0.0821 × 300) / 25.0 = 6025.5 / 25.0 = 241.0 atm.' },
            { text: 'Calculate gauge pressure. P_gauge = P_absolute - P_atm = 241.0 - 1.0 = 240.0 atm.' },
            { text: 'Verify units and reasonableness. Units: mol × L·atm·K⁻¹·mol⁻¹ × K / L = atm ✓.', faded: true, blankAnswer: 'Gauge pressure = 240 atm (ideal gas approximation); actual.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-fair demo on \'why some liquids evaporate faster\', you place equal drops of water, acetone and hexane on a glass plate and time them. Your partner predicts the order purely by molecular weight: \'Water is lightest, so it vanishes first; and all intermolecular attraction is just London dispersion anyway.\'',
            decisions: [{ prompt: 'What order will you actually observe, and which forces explain it?', options: [
                { text: 'Hexane evaporates first, then acetone, then water: hexane (nonpolar) has only London dispersion; acetone adds dipole-dipole attraction; water\'s hydrogen bonding is strongest. Van der Waals forces are a family — London, dipole-dipole, dipole-induced — and hydrogen bonding is a stronger, separate category requiring H bonded to N/O/F.', outcome: 'Evaporation rate reads intermolecular-force strength, not molar mass — water is light but H-bonded hard.' },
                { text: 'Water first — lowest molar mass means molecules escape easiest; all three liquids share the same London forces.', outcome: 'That ignores the force ladder: water\'s hydrogen bonds hold it back while nonpolar hexane escapes first despite being the heaviest molecule.', reveals: 'lighter-evaporates-first' },
                { text: 'The order is random — intermolecular forces are all \'van der Waals\' and too weak to matter.', outcome: 'Weak is relative: dispersion, dipole and hydrogen-bonding differences are exactly what boiling points and evaporation rates measure.', reveals: 'intermolecular-forces-negligible' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Intermolecular attraction isn\'t a loyalty test — the biggest, most distortable electron cloud usually wins.',
            decisions: [{ prompt: 'What comes next? States of Matter · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — States of Matter · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_001', difficulty: 'standard',
          question: 'Van der Waals forces are the collective term for weak, short-range.',
          hint: 'If stuck, revisit VSEPR theory (c11_chem_cbse_04_005) to determine molecular dipole.',
          misconception: 'Students often treat "van der Waals forces" as synonymous with "London dispersion forces" only, ignoring dipole-dipole.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Van der Waals forces are the collective term for weak, short-range electrostatic',
                  options: ['Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a', 'Boyle\'s Law states that for a fixed amount of gas at constant temperature, the pressure'],
                  hint: 'If stuck, revisit VSEPR theory (c11_chem_cbse_04_005) to determine molecular dipole moments, and.',
                  misconception: 'Students often treat "van der Waals forces" as synonymous with "London dispersion forces" only, ignoring dipole-dipole and dipole-induced.' }
          ],
            remediations: { 'students-often-treat-van-der': { steps: ['Revisit Class 8 particle model (c8_chem_ch2_10) — identify that "interparticle attraction" has multiple physical.', 'Use a three-column table: Force Type | Origin | Example Substances.', 'Watch a 2-min simulation of instantaneous dipole formation (e.g., PhET "Molecule Polarity").', 'Re-attempt Diagnostic Questions 2 and 5, explicitly naming the force type for each substance.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_002', difficulty: 'standard',
          question: 'London dispersion forces are temporary attractive forces arising from.',
          hint: 'If stuck, review "Molecular Polarity and Dipole Moment" from Class 11 Chemical Bonding.',
          misconception: 'Students believe London forces exist ONLY in nonpolar molecules and dipole-dipole forces exist ONLY in polar molecules.',
          parts: [
                { id: 'a', prompt: 'Given the substances: CH₄ (molar mass 16 g/mol), SiH₄ (32 g/mol), GeH₄ (77 g/mol), SnH₄ (123 g/mol) — all tetrahedral and nonpolar.', answer: 'Boiling point order: CH₄ < SiH₄ < GeH₄ < SnH₄',
                  options: ['Boiling point order: CH₄ < SiH₄ < GeH₄ < SnH₄', 'all have same boiling point'],
                  hint: 'If stuck, review "Molecular Polarity and Dipole Moment" from Class 11 Chemical Bonding chapter.',
                  misconception: 'Students believe London forces exist ONLY in nonpolar molecules and dipole-dipole forces exist ONLY in polar molecules, treating them.' }
          ],
            remediations: { 'london-forces-exist-only-in': { steps: ['Revisit Class 9 particulate nature of matter (c9_chem_ch2_5, c9_chem_ch2_6, c9_chem_ch2_7) — visualize molecules.', 'Use PhET simulation "Molecule Polarity" to toggle electric field and observe induced dipoles in nonpolar molecules.', 'Draw electron cloud snapshots for He, H₂, HCl at same instant — show fleeting asymmetry in all three.', 'Compare boiling points of isomeric pairs (n-pentane vs neopentane) to decouple molar mass from shape effect.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe London forces exist ONLY in nonpolar molecules and dipole-dipole forces exist ONLY in polar molecules.',
          parts: [
                { id: 'a', prompt: 'A student claims: "HCl has a higher boiling point than F₂ because HCl has dipole-dipole forces while F₂ only has London forces.', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'HCl has hydrogen bonding'],
                  hint: 'If stuck, review "Molecular Polarity and Dipole Moment" from Class 11 Chemical Bonding chapter.',
                  misconception: 'Students believe London forces exist ONLY in nonpolar molecules and dipole-dipole forces exist ONLY in polar molecules, treating them.' }
          ],
            remediations: { 'london-forces-exist-only-in': { steps: ['Revisit Class 9 particulate nature of matter (c9_chem_ch2_5, c9_chem_ch2_6, c9_chem_ch2_7) — visualize molecules.', 'Use PhET simulation "Molecule Polarity" to toggle electric field and observe induced dipoles in nonpolar molecules.', 'Draw electron cloud snapshots for He, H₂, HCl at same instant — show fleeting asymmetry in all three.', 'Compare boiling points of isomeric pairs (n-pentane vs neopentane) to decouple molar mass from shape effect.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_003', difficulty: 'standard',
          question: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs.',
          hint: 'Review electronegativity values (Pauling scale) and covalent radii of N, O, F, Cl,.',
          misconception: 'Students believe any molecule with H and an electronegative atom (like Cl, S) forms hydrogen bonds.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a',
                  options: ['Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a', 'Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Boyle\'s Law states that for a fixed amount of gas at constant temperature, the pressure'],
                  hint: 'Review electronegativity values (Pauling scale) and covalent radii of N, O, F, Cl, S; practice.',
                  misconception: 'Students believe any molecule with H and an electronegative atom (like Cl, S) forms hydrogen bonds. They write HCl, H₂S, CH₃Cl as H-bonded.' }
          ],
            remediations: { 'any-molecule-with-h-and': { steps: ['Have student calculate charge density (electronegativity / covalent radius) for N, O, F, Cl, S.', 'Show N (3.04/71 pm), O (3.44/66 pm), F (3.98/57 pm) have high charge density; Cl (3.16/99 pm), S (2.58/105 pm) are much.', 'Compare boiling points of NH₃ (–33°C) vs PH₃ (–88°C), H₂O (100°C) vs H₂S (–60°C), HF (19.5°C) vs HCl (–85°C).', 'Conclude: only N, O, F produce the large ΔEN AND small size needed for significant H-bonding.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_004', difficulty: 'standard',
          question: 'Boyle\'s Law states that for a fixed amount of gas at constant temperature, the.',
          hint: 'Review Class 8 "Particle Arrangement and Movement in Gases" (c8_chem_ch2_8) and Class 6.',
          misconception: 'Students often think Boyle\'s Law applies when temperature changes, or they use \\(P_1V_1 = P_2V_2\\) for a gas that.',
          parts: [
                { id: 'a', prompt: 'A student plots \\(P\\) vs \\(V\\) for a gas at constant temperature and gets a hyperbola.', answer: 'The \\(P\\) vs \\(1/V\\) plot confirms Boyle\'s Law directly',
                  options: ['The \\(P\\) vs \\(1/V\\) plot confirms Boyle\'s Law directly', 'constant temperature', 'room temperature'],
                  hint: 'Review Class 8 "Particle Arrangement and Movement in Gases" (c8_chem_ch2_8) and Class 6 "Inverse.',
                  misconception: 'Students often think Boyle\'s Law applies when temperature changes, or they use \\(P_1V_1 = P_2V_2\\) for a gas that is being heated/cooled.' }
          ],
            remediations: { 'boyle-s-law-applies-when': { steps: ['If a student applies Boyle\'s Law to a non-isothermal process: 1) Ask them to identify the three variables (P, V, T) and.', '2) Show a syringe experiment where rapid compression warms the gas — pressure rises *more* than Boyle\'s Law predicts.', '3) Have them re-read the law\'s statement and underline "constant temperature".', '4) Practice classifying problems as "Boyle only", "Charles only", or "Combined" before solving.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_005', difficulty: 'standard',
          question: 'Charles\'s Law states that for a fixed amount of an ideal gas at constant.',
          hint: 'If stuck, revise Class 8 kinetic theory (c8_chem_ch2_8) for particle motion with.',
          misconception: 'Students routinely use Celsius temperatures in V₁/T₁ = V₂/T₂ because they forget that the proportionality constant.',
          parts: [
                { id: 'a', prompt: 'State Charles\'s Law in words and write its mathematical form. What are the two conditions that must remain constant for this law to hold?', answer: 'Charles\'s Law: At constant pressure and fixed amount of gas, volume is directly',
                  options: ['Charles\'s Law: At constant pressure and fixed amount of gas, volume is directly', 'constant pressure'],
                  hint: 'If stuck, revise Class 8 kinetic theory (c8_chem_ch2_8) for particle motion with temperature, and.',
                  misconception: 'Students routinely use Celsius temperatures in V₁/T₁ = V₂/T₂ because they forget that the proportionality constant k = V/T is only valid.' }
          ],
            remediations: { 'students-routinely-use-celsius-temperatures': { steps: ['If a student uses Celsius, have them: (1) Calculate V₂ using both Celsius and Kelvin for a known case (e.g., 300 K →.', '(2) Plot V vs T(°C) and V vs T(K) on the same graph paper; the Kelvin graph passes through origin, the Celsius graph.', '(3) Ask: "At what Celsius temperature would volume become zero?" The answer -273°C forces the realisation that zero.', '(4) Re-derive V ∝ T from kinetic theory: average kinetic energy ∝ T(K), so volume ∝ T(K) to maintain constant pressure.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_006', difficulty: 'standard',
          question: 'The ideal gas equation, PV = nRT, is a fundamental equation of state that.',
          hint: 'If stuck, revisit Boyle\'s and Charles\'s law graphs (P vs 1/V and V vs T) and practice.',
          misconception: 'Students use R = 0.0821 L·atm·K⁻¹·mol⁻¹ with pressure in Pa or bar, or use R = 8.314 J·K⁻¹·mol⁻¹ with volume in L and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The ideal gas equation, PV = nRT, is a fundamental equation of state that relates the',
                  options: ['The ideal gas equation, PV = nRT, is a fundamental equation of state that relates the', 'Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a'],
                  hint: 'If stuck, revisit Boyle\'s and Charles\'s law graphs (P vs 1/V and V vs T) and practice unit.',
                  misconception: 'Students use R = 0.0821 L·atm·K⁻¹·mol⁻¹ with pressure in Pa or bar, or use R = 8.314 J·K⁻¹·mol⁻¹ with volume in L and pressure in atm.' }
          ],
            remediations: { 'students-use-r-0': { steps: ['Write down the chosen R value with its full units (e.g., R = 0.0821 L·atm·K⁻¹·mol⁻¹).', 'Convert every given quantity to match those units (P in atm, V in L, T in K).', 'Substitute into PV = nRT and check that units cancel to leave the desired unit.', 'Practice 5 problems where pressure is given in bar, Pa, and atm respectively, forcing deliberate unit conversion each.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
