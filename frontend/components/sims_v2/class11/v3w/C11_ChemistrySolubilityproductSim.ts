import type { SimDef } from '../../engine/types';
import C11_ChemistrySolubilityproductSim from '../../../simulations/c6_12/C11_ChemistrySolubilityproductSim';

/** v3 wrapped master — C11_ChemistrySolubilityproductSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistrysolubilityproductsim: SimDef = {
    id: 'v3w_c11_chemistrysolubilityproductsim',
    title: 'Solubility Product: Ksp and Common Ion Effect',
    subtitle: 'Covers Ksp expressions and calculations for sparingly soluble salts (e.g., AgCl, BaSO4,.',
    classLevel: 11, subject: 'chemistry', topic: 'Solubility Product: Ksp and Common Ion Effect',
    chapters: [],
    nodeIds: ['c11_chem_cbse_07_014', 'c11_chem_cbse_09_004', 'c11_chem_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe what happens when you add a few drops of concentrated hydrochloric acid to a saturated solution of.', goal: 'Master Solubility Product: Ksp and Common Ion Effect.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The solubility product (Ksp) is the.', text: 'The solubility product (Ksp) is the equilibrium constant for the dissolution of a sparingly soluble ionic salt in water, expressed as the product of the molar concentrations of its constituent ions,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_07_014', title: 'The solubility product (Ksp) is the.',
          scaffold: { problem: 'The molar solubility of lead(II) iodide (PbI₂) in pure water at 298 K is 1.3 × 10⁻³ mol L⁻¹. Calculate its Ksp.',
            steps: [
            { text: 'Write the balanced dissolution equation for PbI₂: PbI₂(s) ⇌ Pb²⁺(aq) + 2I⁻(aq).' },
            { text: 'Write the Ksp expression: Ksp = [Pb²⁺][I⁻]².' },
            { text: 'In pure water, let molar solubility = s. Then [Pb²⁺] = s, [I⁻] = 2s. Substitute into Ksp: Ksp = s(2s)² = 4s³.' },
            { text: 'In 0.10 M KI, common ion I⁻ is present. Initial [I⁻] = 0.10 M. Let new solubility = s\'.' },
            { text: 'Verify approximation: 2s\' = 1.76×10⁻⁶ << 0.10, valid. Interpret: Solubility decreases from 1.3×10⁻³ M to 8.8×10⁻⁷ M, a.', faded: true, blankAnswer: 'Ksp = 8.8 × 10⁻⁹ (dimensionless, but effectively M³). Molar.' }
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
        { type: 'dissect', nodeId: 'c11_chem_cbse_09_004', title: 'Identify each idea',
          dissect: { specimen: 'Solubility Product: Ksp and Common Ion Effect', spots: [
            { id: 's1', label: 'The solubility product Ksp is', prompt: 'Which idea is this? — The solubility product (Ksp) is the equilibrium constant for the dissolution of a.', answer: 'The solubility product Ksp is', options: ['The solubility product Ksp is', 'Dihydrogen H is the molecular', 'Hydrogen bonding is a special'] },
            { id: 's2', label: 'Dihydrogen H is the molecular', prompt: 'Which idea is this? — Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,.', answer: 'Dihydrogen H is the molecular', options: ['Dihydrogen H is the molecular', 'The solubility product Ksp is', 'Hydrogen bonding is a special'] },
            { id: 's3', label: 'Hydrogen bonding is a special', prompt: 'Which idea is this? — Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a.', answer: 'Hydrogen bonding is a special', options: ['Hydrogen bonding is a special', 'The solubility product Ksp is', 'Dihydrogen H is the molecular'] }
          ] } }
    ],
    explore: { component: C11_ChemistrySolubilityproductSim, prompt: 'Explore the interactive — Solubility Product: Ksp and Common Ion Effect' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_07_014', difficulty: 'standard',
          question: 'The solubility product (Ksp) is the equilibrium constant for the dissolution of.',
          hint: 'Review c11_chem_cbse_07_003 (Law of Chemical Equilibrium) for writing Kc expressions, and.',
          misconception: 'Students often write Ksp = [Ag⁺][Cl⁻] for Ag₂CrO₄, ignoring the stoichiometric coefficient 2 for Ag⁺.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The solubility product (Ksp) is the equilibrium constant for the dissolution of a',
                  options: ['The solubility product (Ksp) is the equilibrium constant for the dissolution of a', 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Ksp = [Ag⁺][Cl⁻] for Ag₂CrO₄, ignoring the stoichiometric coefficient 2 for Ag⁺.' }
          ],
            remediations: { 'students-often-write-ksp-ag': { steps: ['If a student makes the stoichiometry error, have them write the balanced dissolution equation for three salts: AgCl,.', 'Then ask: "How many Ag⁺ ions does one formula unit of Ag₂CrO₄ produce?" (Answer: 2).', 'Then derive Ksp from the equation step by step: Ksp = [Ag⁺]²[CrO₄²⁻].', 'For the common ion error, give a numerical problem: "Calculate solubility of BaSO₄ in 0.01 M Na₂SO₄." Make them write.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_004', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a.',
          hint: 'Review c10_chem_cbse_01_007 (Oxidation and Reduction Reactions) and practice oxidation.',
          misconception: 'Students write the reaction of dihydrogen with nitrogen as N₂ + H₂ → NH₃ (unbalanced) and assume it goes to completion.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,',
                  options: ['Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,', 'The solubility product (Ksp) is the equilibrium constant for the dissolution of a', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the reaction of dihydrogen with nitrogen as N₂ + H₂ → NH₃ (unbalanced) and assume it goes to completion at room temperature.' }
          ],
            remediations: { 'students-write-the-reaction-of': { steps: ['Revisit the concept of equilibrium constants and Le Chatelier\'s principle from Class 11 Equilibrium chapter.', 'Plot ΔG° vs T for N₂ + 3H₂ ⇌ 2NH₃ using ΔH° = –92.2 kJ mol⁻¹ and ΔS° = –198 J K⁻¹ mol⁻¹ to see why low T favors yield.', 'Practice writing the balanced equation with state symbols and reversible arrow until automatic.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_010', difficulty: 'standard',
          question: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs.',
          hint: 'If stuck, revisit c11_chem_cbse_04_012 (Polarity of Bonds: Dipole Moment) to review.',
          misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**:.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a',
                  options: ['Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a', 'The solubility product (Ksp) is the equilibrium constant for the dissolution of a', 'Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,'],
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
            remediations: { 'misconception-1-any-polar-bond': { steps: ['If the student cannot distinguish intra- vs intermolecular H-bonding or misidentifies H-bond donors/acceptors: **Step.', '**Step 2**: Draw Lewis structures of H₂O, HF, NH₃, CH₃OH, CH₃F, CH₃SH, o-nitrophenol.', 'Circle every H atom attached to N, O, F — these are donors.', 'Circle every lone pair on N, O, F — these are acceptors.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
