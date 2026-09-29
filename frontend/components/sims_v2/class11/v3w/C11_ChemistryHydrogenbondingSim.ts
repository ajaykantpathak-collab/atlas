import type { SimDef } from '../../engine/types';
import C11_ChemistryHydrogenbondingSim from '../../../simulations/c6_12/C11_ChemistryHydrogenbondingSim';

/** v3 wrapped master — C11_ChemistryHydrogenbondingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryhydrogenbondingsim: SimDef = {
    id: 'v3w_c11_chemistryhydrogenbondingsim',
    title: 'Hydrogen Bonding: Intermolecular and Intramolecular',
    subtitle: 'This node covers: the electronic origin of hydrogen bonding (charge separation in polar.',
    classLevel: 11, subject: 'chemistry', topic: 'Hydrogen Bonding: Intermolecular and Intramolecular',
    chapters: [],
    nodeIds: ['c11_chem_cbse_04_010', 'c11_chem_cbse_09_001', 'c11_chem_cbse_09_002', 'c11_chem_cbse_09_004', 'c11_chem_cbse_09_005', 'c11_chem_cbse_09_006', 'c11_chem_cbse_09_007', 'c11_chem_cbse_08_002', 'c11_chem_cbse_05_001', 'c11_chem_cbse_05_002', 'c11_chem_cbse_05_003', 'c11_chem_cbse_05_013', 'c11_chem_cbse_02_009', 'c11_chem_cbse_04_001', 'c11_chem_cbse_04_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe that water boils at 100 °C while hydrogen sulfide (H₂S, molar mass 34 g mol⁻¹, similar to water\'s 18.', goal: 'Master Hydrogen Bonding: Intermolecular and Intramolecular.' },
    discovery: {
        question: 'Write the electronic configuration of hydrogen and state the two ions it can form by losing or gaining one electron.',
        options: ['Electronic configuration: 1s¹', 'hydrogen is a metal', 'hydrogen is a non-metal'],
        answer: 'Electronic configuration: 1s¹',
        hook: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at.',
    },
    teaching: [
        { title: 'Hydrogen bonding is a special type of.', text: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a hydrogen atom covalently bonded to a highly electronegative atom (nitrogen, oxygen, or fluorine) experiences an.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_010', title: 'Hydrogen bonding is a special type of.',
          scaffold: { problem: 'A student measures the boiling points of four compounds: ethanol (C₂H₅OH, 78 °C), dimethyl ether (CH₃OCH₃, –24 °C), propane (C₃H₈, –42 °C),.',
            steps: [
            { text: 'Identify the molecular formula and molar mass of each compound.' },
            { text: 'Draw Lewis structures and identify H-bond donor sites (H attached to N, O, F) and acceptor sites (lone pairs on N, O,.' },
            { text: 'Classify intermolecular forces for each. Ethanol: strong intermolecular H-bonding (donor + acceptor) + London forces.' },
            { text: 'Rank expected boiling point order based on force strength. H-bonding > dipole-dipole > London forces.' },
            { text: 'Compare with experimental data. Ethanol 78 °C (H-bonding network).' },
            { text: 'Conclude that the presence of an H-bond donor (O–H) is the decisive factor; mere presence of O or F as acceptor is.', faded: true, blankAnswer: 'Ethanol\'s high boiling point (78 °C) is due to extensive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_001', title: 'Hydrogen (H, Z=1) is the only element.',
          scaffold: { problem: 'A student claims "Hydrogen is an alkali metal because it has 1 valence electron and forms +1 oxidation state." Using quantitative periodic.',
            steps: [
            { text: 'Identify the claim to test - "hydrogen is an alkali metal" based on valence electron count and +1 oxidation state.' },
            { text: 'Select quantitative criteria for metallic character - low ionization enthalpy (easy electron loss), low electron gain.' },
            { text: 'Compare ionization enthalpies - H (1312 kJ/mol) is 2.5× Li (520) and 2.6× Na (496), meaning H holds its electron much.' },
            { text: 'Compare electron gain enthalpies - H (-73 kJ/mol) is similar to Li (-60) and Na (-53), but all are small; this doesn\'t.' },
            { text: 'Compare reduction potentials - H⁺/H₂ (0.00 V) is far less negative than Li⁺/Li (-3.04 V) and Na⁺/Na (-2.71 V), meaning.' },
            { text: 'Synthesize - Hydrogen matches alkali metals only in valence electron count (+1 oxidation state) but differs.', faded: true, blankAnswer: 'Hydrogen is NOT an alkali metal. It shares only the ns¹.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_002', title: 'Isotopes of hydrogen are atoms with the.',
          scaffold: { problem: 'A sample of hydrogen gas collected from a laboratory reaction contains 99.98% protium (¹H, mass = 1.0078 u) and 0.02% deuterium (²H, mass =.',
            steps: [
            { text: 'Identify the isotopes and their fractional abundances: protium fraction = 99.98/100 = 0.9998; deuterium fraction =.' },
            { text: 'Write the weighted average formula: M_avg = (f₁ × m₁) + (f₂ × m₂)' },
            { text: 'Substitute values: M_avg = (0.9998 × 1.0078) + (0.0002 × 2.0141)' },
            { text: 'Calculate each term: 0.9998 × 1.0078 = 1.0076; 0.0002 × 2.0141 = 0.0004028' },
            { text: 'Sum and round to 4 decimal places: M_avg = 1.0076 + 0.0004 = 1.0080 g/mol', faded: true, blankAnswer: '1.0080 g/mol' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_004', title: 'Dihydrogen (H₂) is the molecular form.',
          scaffold: { problem: 'A fuel cell uses dihydrogen and oxygen to generate electricity.',
            steps: [
            { text: 'Write balanced equation: 2H₂(g) + O₂(g) → 2H₂O(l). Identify molar ratio H₂:O₂ = 2:1.' },
            { text: 'Calculate moles of H₂ = mass / molar mass = 4.00 g / 2.016 g mol⁻¹ = 1.984 mol.' },
            { text: 'Moles of O₂ required = 1.984 mol H₂ × (1 mol O₂ / 2 mol H₂) = 0.992 mol. At STP (0°C, 1 atm), 1 mol = 22.4 L.' },
            { text: 'Maximum electrical work = –ΔG° × moles of H₂O formed. Moles H₂O = moles H₂ = 1.984 mol.' },
            { text: 'Actual energy at 80% efficiency = 0.80 × 470.4 kJ = 376.3 kJ. Convert to kWh: 376.3 kJ / 3600 = 0.1045 kWh.', faded: true, blankAnswer: '(a) 22.2 L O₂ at STP; (b) 376 kJ or 0.105 kWh electrical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_005', title: 'Dihydrogen (H₂) is the molecular form.',
          scaffold: { problem: 'An industrial plant produces 1.70 × 10³ kg of ammonia per day via the Haber process operating at 15% yield per pass.',
            steps: [
            { text: 'Calculate theoretical moles of NH₃ at 100% yield: actual mass = 1.70×10⁶ g; theoretical mass = 1.70×10⁶ / 0.15 =.' },
            { text: 'Use stoichiometry N₂ + 3H₂ → 2NH₃: moles H₂ required = (3/2) × moles NH₃ = 1.5 × 6.667×10⁵ = 1.00×10⁶ mol H₂' },
            { text: 'Convert to mass: mass H₂ = 1.00×10⁶ mol × 2 g mol⁻¹ = 2.00×10⁶ g = 2000 kg' },
            { text: 'Verify with N₂ requirement: moles N₂ = (1/2) × 6.667×10⁵ = 3.33×10⁵ mol; mass N₂ = 3.33×10⁵ × 28 = 9.33×10⁶ g = 9330.' },
            { text: 'Interpret: 2000 kg H₂/day feed needed; in practice recycle reduces fresh feed to ~300 kg/day', faded: true, blankAnswer: '2000 kg H₂ per day' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_006', title: 'Hydrides are binary compounds of.',
          scaffold: { problem: '2.5 g of an unknown alkaline earth metal hydride MH₂ reacts completely with water to produce 1.12 L of H₂ gas at STP.',
            steps: [
            { text: 'Calculate moles of H₂ gas produced at STP: 1.12 L / 22.4 L/mol = 0.05 mol H₂' },
            { text: 'From hydrolysis stoichiometry MH₂ + 2H₂O → M(OH)₂ + 2H₂, 1 mol MH₂ produces 2 mol H₂.' },
            { text: 'Calculate molar mass of MH₂: mass / moles = 2.5 g / 0.025 mol = 100 g/mol' },
            { text: 'Molar mass of M = 100 - 2(1) = 98 g/mol. From periodic table, alkaline earth metal with atomic mass ~98 is Strontium.' },
            { text: 'Balanced equation: SrH₂ + 2H₂O → Sr(OH)₂ + 2H₂↑. Verify: Sr(OH)₂ is strong base → basic solution.', faded: true, blankAnswer: 'Metal is Strontium (Sr), assuming experimental mass was.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_09_001', title: 'Identify each idea',
          dissect: { specimen: 'Hydrogen Bonding: Intermolecular and Intramolecular', spots: [
            { id: 's1', label: 'Hydrogen bonding is a special', prompt: 'Which idea is this? — Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a.', answer: 'Hydrogen bonding is a special', options: ['Hydrogen bonding is a special', 'Hydrogen H Z1 is the', 'Isotopes of hydrogen are atoms', 'Dihydrogen H is the molecular'] },
            { id: 's2', label: 'Hydrogen H Z1 is the', prompt: 'Which idea is this? — Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits.', answer: 'Hydrogen H Z1 is the', options: ['Hydrogen H Z1 is the', 'Hydrogen bonding is a special', 'Isotopes of hydrogen are atoms', 'Dihydrogen H is the molecular'] },
            { id: 's3', label: 'Isotopes of hydrogen are atoms', prompt: 'Which idea is this? — Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but different mass.', answer: 'Isotopes of hydrogen are atoms', options: ['Isotopes of hydrogen are atoms', 'Hydrogen bonding is a special', 'Hydrogen H Z1 is the', 'Dihydrogen H is the molecular'] },
            { id: 's4', label: 'Dihydrogen H is the molecular', prompt: 'Which idea is this? — Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,.', answer: 'Dihydrogen H is the molecular', options: ['Dihydrogen H is the molecular', 'Hydrogen bonding is a special', 'Hydrogen H Z1 is the', 'Isotopes of hydrogen are atoms'] },
            { id: 's5', label: 'Hydrides are binary compounds of', prompt: 'Which idea is this? — Hydrides are binary compounds of hydrogen with other elements (except noble gases),.', answer: 'Hydrides are binary compounds of', options: ['Hydrides are binary compounds of', 'Hydrogen bonding is a special', 'Hydrogen H Z1 is the', 'Isotopes of hydrogen are atoms'] }
          ] } }
    ],
    explore: { component: C11_ChemistryHydrogenbondingSim, prompt: 'Explore the interactive — Hydrogen Bonding: Intermolecular and Intramolecular' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_010', difficulty: 'standard',
          question: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs.',
          hint: 'If stuck, revisit c11_chem_cbse_04_012 (Polarity of Bonds: Dipole Moment) to review.',
          misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**:.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a',
                  options: ['Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a', 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits', 'Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but different mass', 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**: Only H bonded to N, O,.' }
          ],
            remediations: { 'misconception-1-any-polar-bond': { steps: ['If the student cannot distinguish intra- vs intermolecular H-bonding or misidentifies H-bond donors/acceptors: **Step.', '**Step 2**: Draw Lewis structures of H₂O, HF, NH₃, CH₃OH, CH₃F, CH₃SH, o-nitrophenol.', 'Circle every H atom attached to N, O, F — these are donors.', 'Circle every lone pair on N, O, F — these are acceptors.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**:.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Intramolecular hydrogen bonding increases the boiling point of a compound because it adds extra attractive forces within the molecule.".', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'more H-bonds = higher boiling point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**: Only H bonded to N, O,.' }
          ],
            remediations: { 'misconception-1-any-polar-bond': { steps: ['If the student cannot distinguish intra- vs intermolecular H-bonding or misidentifies H-bond donors/acceptors: **Step.', '**Step 2**: Draw Lewis structures of H₂O, HF, NH₃, CH₃OH, CH₃F, CH₃SH, o-nitrophenol.', 'Circle every H atom attached to N, O, F — these are donors.', 'Circle every lone pair on N, O, F — these are acceptors.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_001', difficulty: 'standard',
          question: 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells" (2n² rule) and Class 10.',
          misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at.',
          parts: [
                { id: 'a', prompt: 'Write the electronic configuration of hydrogen and state the two ions it can form by losing or gaining one electron.', answer: 'Electronic configuration: 1s¹',
                  options: ['Electronic configuration: 1s¹', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'b', prompt: 'Compare the following pairs and identify which property shows hydrogen behaving like an alkali metal and which shows halogen-like behavior: (a) Reaction with.', answer: 'Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl',
                  options: ['Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' }
          ],
            remediations: { 'hydrogen-is-a-metal-because': { steps: ['Have them calculate charge density (ionic charge/ionic radius) for H⁺ (radius ~0 pm, theoretical) vs Li⁺ (76 pm) and.', 'Show that H⁺ charge density is effectively infinite, so it *must* associate with electron donors (H₂O, NH₃).', 'Compare gas-phase ionization enthalpies: H (1312) vs Li (520) kJ/mol - ask "Which atom holds its electron more tightly?"', 'Conclude that periodic position is based on *gas-phase atomic properties*, not aqueous solution behavior.', 'Practice writing the three similarities/differences table with quantitative data (IE, EG, bond energy) for both groups.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Hydrogen should be placed in Group 1 because it forms H⁺ ions in acids like HCl, H₂SO₄, just as Na forms Na⁺ in NaCl." Evaluate this.', answer: 'The statement is chemically incomplete',
                  options: ['The statement is chemically incomplete', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'b', prompt: 'Design a thought experiment: If you could measure the "metallic character index" M = (Ionization Enthalpy)⁻¹ × (Electron Gain Enthalpy) for H, Li, Na, F, Cl,.', answer: 'Calculate M = (1/IE) × |EG| (using absolute EG for index)',
                  options: ['Calculate M = (1/IE) × |EG| (using absolute EG for index)', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' },
                { id: 'c', prompt: 'Compare the following pairs and identify which property shows hydrogen behaving like an alkali metal and which shows halogen-like behavior: (a) Reaction with.', answer: 'Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl',
                  options: ['Reaction with Na: 2Na + H₂ → 2NaH vs 2Na + Cl₂ → 2NaCl', 'hydrogen is a metal', 'hydrogen is a non-metal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hydrogen is a metal because it forms H⁺ ions" or "hydrogen is a non-metal because it\'s a gas at room temperature.".' }
          ],
            remediations: { 'hydrogen-is-a-metal-because': { steps: ['Have them calculate charge density (ionic charge/ionic radius) for H⁺ (radius ~0 pm, theoretical) vs Li⁺ (76 pm) and.', 'Show that H⁺ charge density is effectively infinite, so it *must* associate with electron donors (H₂O, NH₃).', 'Compare gas-phase ionization enthalpies: H (1312) vs Li (520) kJ/mol - ask "Which atom holds its electron more tightly?"', 'Conclude that periodic position is based on *gas-phase atomic properties*, not aqueous solution behavior.', 'Practice writing the three similarities/differences table with quantitative data (IE, EG, bond energy) for both groups.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_002', difficulty: 'standard',
          question: 'Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but.',
          hint: 'If stuck on nuclear notation, review c9_chem_ch2_5; if stuck on weighted average, review.',
          misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number.',
          parts: [
                { id: 'a', prompt: 'Write the complete nuclear symbol (with atomic number and mass number) for each hydrogen isotope and state the number of protons, neutrons, and electrons in a.', answer: 'Protium: ¹₁H (1p, 0n, 1e⁻)',
                  options: ['Protium: ¹₁H (1p, 0n, 1e⁻)', 'it has 2 protons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number (superscript) with atomic.' },
                { id: 'b', prompt: 'The bond dissociation energy of H–H is 436 kJ/mol, while D–D is 439 kJ/mol.', answer: 'Deuterium forms a stronger bond (higher BDE)',
                  options: ['Deuterium forms a stronger bond (higher BDE)', 'D–D is weaker because deuterium is heavier', 'it has 2 protons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number (superscript) with atomic.' }
          ],
            remediations: { 'students-write-the-nuclear-symbol': { steps: ['Revisit c9_chem_ch2_5 (Atomic Number and Mass Number) — draw 3 nuclei side by side, label p⁺ and n⁰, count each.', 'Use a periodic table to confirm hydrogen\'s atomic number is always 1.', 'Practice writing ¹₁H, ²₁H, ³₁H until the notation is automatic.', 'For compound confusion, write H₂O and D₂O structural formulas — show identical connectivity, only mass labels differ.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number.',
          parts: [
                { id: 'a', prompt: 'Design a simple laboratory method to separate a small sample of heavy water (D₂O) from ordinary water using only physical properties, and explain why it works.', answer: 'Fractional distillation: D₂O boils at 374.4 K vs H₂O at 373 K at 1 atm',
                  options: ['Fractional distillation: D₂O boils at 374.4 K vs H₂O at 373 K at 1 atm', 'it has 2 protons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number (superscript) with atomic.' },
                { id: 'b', prompt: 'The bond dissociation energy of H–H is 436 kJ/mol, while D–D is 439 kJ/mol.', answer: 'Deuterium forms a stronger bond (higher BDE)',
                  options: ['Deuterium forms a stronger bond (higher BDE)', 'D–D is weaker because deuterium is heavier', 'it has 2 protons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the nuclear symbol for deuterium as ²₁H but then say "it has 2 protons" — confusing mass number (superscript) with atomic.' }
          ],
            remediations: { 'students-write-the-nuclear-symbol': { steps: ['Revisit c9_chem_ch2_5 (Atomic Number and Mass Number) — draw 3 nuclei side by side, label p⁺ and n⁰, count each.', 'Use a periodic table to confirm hydrogen\'s atomic number is always 1.', 'Practice writing ¹₁H, ²₁H, ³₁H until the notation is automatic.', 'For compound confusion, write H₂O and D₂O structural formulas — show identical connectivity, only mass labels differ.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_004', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a.',
          hint: 'Review c10_chem_cbse_01_007 (Oxidation and Reduction Reactions) and practice oxidation.',
          misconception: 'Students write the reaction of dihydrogen with nitrogen as N₂ + H₂ → NH₃ (unbalanced) and assume it goes to completion.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,',
                  options: ['Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a', 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits', 'Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but different mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the reaction of dihydrogen with nitrogen as N₂ + H₂ → NH₃ (unbalanced) and assume it goes to completion at room temperature.' }
          ],
            remediations: { 'students-write-the-reaction-of': { steps: ['Revisit the concept of equilibrium constants and Le Chatelier\'s principle from Class 11 Equilibrium chapter.', 'Plot ΔG° vs T for N₂ + 3H₂ ⇌ 2NH₃ using ΔH° = –92.2 kJ mol⁻¹ and ΔS° = –198 J K⁻¹ mol⁻¹ to see why low T favors yield.', 'Practice writing the balanced equation with state symbols and reversible arrow until automatic.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_005', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a.',
          hint: 'Review Class 10 redox balancing (c10_chem_cbse_01_008) and Class 11 equilibrium (not in.',
          misconception: 'Students write the hydrogenation of vegetable oil as "C₅₇H₁₀₄O₆ + H₂ → C₅₇H₁₁₀O₆" (adding 6 H atoms) but fail to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing',
                  options: ['Dihydrogen (H₂) is the molecular form of hydrogen gas used industrially as a reducing', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a', 'Hydrogen (H, Z=1) is the only element with electronic configuration 1s¹ that exhibits', 'Isotopes of hydrogen are atoms with the same atomic number (Z = 1) but different mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the hydrogenation of vegetable oil as "C₅₇H₁₀₄O₆ + H₂ → C₅₇H₁₁₀O₆" (adding 6 H atoms) but fail to recognize that the.' }
          ],
            remediations: { 'students-write-the-hydrogenation-of': { steps: ['Draw the structure of a typical triglyceride with three oleic acid chains (one C=C each).', 'Count C=C bonds = 3 per molecule.', 'Write addition of H₂ across each C=C: –CH=CH– + H₂ → –CH₂–CH₂–.', 'Balance: 1 mol triglyceride + 3 mol H₂ → fully saturated triglyceride.', 'Practice with simpler alkene: CH₃CH=CHCH₃ + H₂ → CH₃CH₂CH₂CH₃ (1:1 ratio), then scale to three double bonds.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'standard',
          question: 'Hydrides are binary compounds of hydrogen with other elements (except noble.',
          hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'What is the oxidation state of hydrogen in sodium hydride (NaH) and why does it differ from hydrogen\'s oxidation state in methane (CH₄)?', answer: 'In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)',
                  options: ['In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Explain why beryllium hydride (BeH₂) is covalent while magnesium hydride (MgH₂) is ionic, even though both are Group 2 elements.', answer: 'BeH₂ is covalent',
                  options: ['BeH₂ is covalent', 'both are ionic because Group 2', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'c', prompt: 'Write balanced chemical equations for the reaction of (a) CaH₂ with water, (b) B₂H₆ with water, and (c) TiH₂ with water.', answer: 'CaH₂ with water, (',
                  options: ['CaH₂ with water, (', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'A student claims: "All metallic hydrides are non-stoichiometric because hydrogen atoms randomly occupy interstitial sites in the metal lattice, so the.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Design a simple laboratory experiment to distinguish between an unknown ionic hydride (e.g., NaH) and an unknown covalent hydride (e.g., SiH₄) using only.', answer: 'Add small amounts of each solid/liquid hydride to separate test tubes with water',
                  options: ['Add small amounts of each solid/liquid hydride to separate test tubes with water', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
