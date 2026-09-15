import type { SimDef } from '../../engine/types';
import C11_ChemistryHydrocarbonsSim from '../../../simulations/c6_12/C11_ChemistryHydrocarbonsSim';

/** v3 wrapped master — C11_ChemistryHydrocarbonsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryhydrocarbonssim: SimDef = {
    id: 'v3w_c11_chemistryhydrocarbonssim',
    title: 'Hydrocarbons',
    subtitle: 'Covers laboratory preparation using Zn/HCl, Zn/NaOH, Fe/steam, and industrial preparation.',
    classLevel: 11, subject: 'chemistry', topic: 'Preparation of Dihydrogen: Laboratory and Industrial',
    chapters: [],
    nodeIds: ['c11_chem_cbse_09_003', 'c11_chem_cbse_09_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a kitchen gas stove: the blue flame comes from combustion of methane, but the hydrogen in methane can.', goal: 'Master Hydrocarbons.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Dihydrogen (H₂) is prepared in the.', text: 'Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn, Fe) with dilute acids (H₂SO₄, HCl) or with aqueous alkalis (NaOH), and by the reaction of metals (Mg, Fe) with steam.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_003', title: 'Dihydrogen (H₂) is prepared in the.',
          scaffold: { problem: 'In a laboratory preparation, 6.5 g of pure zinc granules react with excess dilute HCl.',
            steps: [
            { text: 'Identify the reaction: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g). Note 1 mol Zn gives 1 mol H₂.' },
            { text: 'Calculate moles of Zn used: mass/molar mass = 6.5 g / 65 g/mol = 0.1 mol.' },
            { text: 'Use stoichiometry: moles of H₂ produced = 0.1 mol.' },
            { text: 'Convert moles to volume at STP: volume = moles × molar volume = 0.1 mol × 22.4 L/mol = 2.24 L.' },
            { text: 'Verify: The gas is collected over water? Problem says dry gas at STP, so no water vapour correction needed.', faded: true, blankAnswer: '2.24 L of dry dihydrogen gas at STP.' }
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
        { type: 'dissect', nodeId: 'c11_chem_cbse_09_004', title: 'Identify each idea',
          dissect: { specimen: 'Hydrocarbons', spots: [
            { id: 's1', label: 'Dihydrogen H is prepared in', prompt: 'Which idea is this? — Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn, Fe) with.', answer: 'Dihydrogen H is prepared in', options: ['Dihydrogen H is prepared in', 'Dihydrogen H is the molecular'] },
            { id: 's2', label: 'Dihydrogen H is the molecular', prompt: 'Which idea is this? — Dihydrogen (H₂) is the molecular form of hydrogen element, existing as a colorless,.', answer: 'Dihydrogen H is the molecular', options: ['Dihydrogen H is the molecular', 'Dihydrogen H is prepared in'] }
          ] } }
    ],
    explore: { component: C11_ChemistryHydrocarbonsSim, prompt: 'Explore the interactive — Hydrocarbons' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_003', difficulty: 'standard',
          question: 'Dihydrogen (H₂) is prepared in the laboratory by the reaction of metals (Zn,.',
          hint: 'If stuck, revisit Class 10 node c10_chem_cbse_03_007 (Reactivity Series) and.',
          misconception: 'Students often think that any metal reacts with any acid to give H₂.',
          parts: [
                { id: 'a', prompt: 'Name the gas evolved when zinc granules react with dilute sulphuric acid. Write the balanced chemical equation.', answer: 'The gas is dihydrogen (H₂)',
                  options: ['The gas is dihydrogen (H₂)', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' },
                { id: 'b', prompt: 'Balance the equation for steam reforming of methane: CH₄(g) + H₂O(g) → CO(g) + H₂(g).', answer: 'Balanced: CH₄(g) + H₂O(g) → CO(g) + 3H₂(g)',
                  options: ['Balanced: CH₄(g) + H₂O(g) → CO(g) + 3H₂(g)', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' },
                { id: 'c', prompt: 'Compare the purity of dihydrogen obtained from (a) Zn + dilute HCl and (b) electrolysis of acidified water. Which method gives higher purity and why?', answer: 'Electrolysis gives higher purity (99.9%)',
                  options: ['Electrolysis gives higher purity (99.9%)', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' }
          ],
            remediations: { 'any-metal-reacts-with-any': { steps: ['Review the reactivity series from Class 10 (c10_chem_cbse_03_007) and identify metals above hydrogen.', 'Write the half-reactions for Zn → Zn²⁺ + 2e⁻ and 2H⁺ + 2e⁻ → H₂ to see the redox requirement.', 'Practice balancing the Zn/NaOH reaction with water molecules to form the tetrahydroxozincate ion.', 'For industrial methods, create a table comparing temperature, catalyst, and purity for each method.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any metal reacts with any acid to give H₂.',
          parts: [
                { id: 'a', prompt: 'A student writes the reaction of zinc with NaOH as: Zn + 2NaOH → Na₂ZnO₂ + H₂. Identify the error and write the correct equation with state symbols.', answer: 'Error: sodium zincate is Na₂[Zn(OH)₄] (or Na₂ZnO₂·2H₂O), not Na₂ZnO₂ alone',
                  options: ['Error: sodium zincate is Na₂[Zn(OH)₄] (or Na₂ZnO₂·2H₂O), not Na₂ZnO₂ alone', 'any metal reacts with any acid to give H₂'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any metal reacts with any acid to give H₂.' }
          ],
            remediations: { 'any-metal-reacts-with-any': { steps: ['Review the reactivity series from Class 10 (c10_chem_cbse_03_007) and identify metals above hydrogen.', 'Write the half-reactions for Zn → Zn²⁺ + 2e⁻ and 2H⁺ + 2e⁻ → H₂ to see the redox requirement.', 'Practice balancing the Zn/NaOH reaction with water molecules to form the tetrahydroxozincate ion.', 'For industrial methods, create a table comparing temperature, catalyst, and purity for each method.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
