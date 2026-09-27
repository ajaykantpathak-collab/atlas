import type { SimDef } from '../../engine/types';
import C9_ChemistrySoftwaterandhardwaterSim from '../../../simulations/c6_12/C9_ChemistrySoftwaterandhardwaterSim';

/** v3 wrapped master — C9_ChemistrySoftwaterandhardwaterSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_chemistrysoftwaterandhardwatersim: SimDef = {
    id: 'v3w_c9_chemistrysoftwaterandhardwatersim',
    title: 'Softwaterandhardwater',
    subtitle: 'Covers comparison of physical properties (state, melting/boiling point, solubility,.',
    classLevel: 9, subject: 'chemistry', topic: 'Properties of Ionic Compounds vs Covalent Compounds',
    chapters: [],
    nodeIds: ['c9_chem_ch3_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Begin with a real-world observation: ask students why common salt (NaCl) dissolves in water and conducts.', goal: 'Master Softwaterandhardwater.' },
    discovery: {
        question: 'Compare the solubility of NaCl (ionic) and CCl₄ (covalent) in water and in benzene (organic solvent).',
        options: ['Correct answer: NaCl dissolves in water (polar)', 'both dissolve in water', 'all compounds dissolve in water and does not link polarity to solubility'],
        answer: 'NaCl dissolves in water (polar)',
        hook: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.',
    },
    teaching: [
        { title: 'Ionic compounds are crystalline solids.', text: 'Ionic compounds are crystalline solids formed by electrostatic attraction between cations and anions, exhibiting high melting points, solubility in polar solvents, and electrical conductivity in.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_chem_ch3_8', title: 'Ionic compounds are crystalline solids.',
          scaffold: { problem: 'A student has two white crystalline solids, A and B. Solid A melts at 801°C, conducts electricity when dissolved in water but not in solid.',
            steps: [
            { text: 'Analyze melting points – A has very high MP (801°C) indicating strong forces throughout a giant structure; B has.' },
            { text: 'Analyze conductivity – A conducts only in solution, meaning charged particles are mobile only when the rigid structure.' },
            { text: 'Link to bonding – A is ionic (giant lattice of ions); B is covalent (discrete molecules).' },
            { text: 'Predict formulas – A likely formed from metal + non-metal (e.g., NaCl); B likely formed from non-metal + non-metal.' },
            { text: 'Verify with solubility – A should dissolve in water (polar) but not in organic solvents; B may dissolve in organic.', faded: true, blankAnswer: 'A is ionic (e.g., NaCl); B is covalent molecular (e.g.,.' }
            ] } }
    ],
    explore: { component: C9_ChemistrySoftwaterandhardwaterSim, prompt: 'Explore the interactive — Softwaterandhardwater' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch3_8', difficulty: 'standard',
          question: 'Ionic compounds are crystalline solids formed by electrostatic attraction.',
          hint: 'If stuck, revisit c9_chem_ch3_4 (covalent bonding) and c9_chem_ch3_5 (ionic bonding) to.',
          misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.',
          parts: [
                { id: 'a', prompt: 'A white crystalline solid X has a high melting point (801°C), dissolves in water to give a conducting solution, but does not conduct in solid state.', answer: 'Ionic',
                  options: ['Correct answer: Ionic', 'covalent because it dissolves'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' },
                { id: 'b', prompt: 'Compare the solubility of NaCl (ionic) and CCl₄ (covalent) in water and in benzene (organic solvent).', answer: 'NaCl dissolves in water (polar)',
                  options: ['Correct answer: NaCl dissolves in water (polar)', 'both dissolve in water', 'all compounds dissolve in water and does not link polarity to solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' }
          ],
            remediations: { 'because-hcl-is-a-gas': { steps: ['Show the student pure HCl gas (or video) – no conductivity, low boiling point (-85°C).', 'Demonstrate that dry HCl does not conduct, but aqueous HCl does.', 'Contrast with NaCl: solid NaCl is already ionic, melts at 801°C, conducts when molten without water.', 'Have the student write the distinction: "Ionic compounds exist as ions in pure state; covalent compounds like HCl form.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch3_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.',
          parts: [
                { id: 'a', prompt: 'Compare the solubility of NaCl (ionic) and CCl₄ (covalent) in water and in benzene (organic solvent).', answer: 'NaCl dissolves in water (polar)',
                  options: ['Correct answer: NaCl dissolves in water (polar)', 'both dissolve in water', 'all compounds dissolve in water and does not link polarity to solubility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because HCl is a gas and dissolves in water to conduct electricity, it is an ionic compound.' }
          ],
            remediations: { 'because-hcl-is-a-gas': { steps: ['Show the student pure HCl gas (or video) – no conductivity, low boiling point (-85°C).', 'Demonstrate that dry HCl does not conduct, but aqueous HCl does.', 'Contrast with NaCl: solid NaCl is already ionic, melts at 801°C, conducts when molten without water.', 'Have the student write the distinction: "Ionic compounds exist as ions in pure state; covalent compounds like HCl form.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
