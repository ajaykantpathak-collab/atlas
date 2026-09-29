import type { SimDef } from '../../engine/types';
import C9_ChemistryLaboratorypreparationofhydrogenSim from '../../../simulations/c6_12/C9_ChemistryLaboratorypreparationofhydrogenSim';

/** v3 wrapped master — C9_ChemistryLaboratorypreparationofhydrogenSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_chemistrylaboratorypreparationofhydrogensim: SimDef = {
    id: 'v3w_c9_chemistrylaboratorypreparationofhydrogensim',
    title: 'Separation of Immiscible Liquids: Separating Funnel',
    subtitle: 'Covers separation of two immiscible liquids (e.g., water and oil, water and chloroform).',
    classLevel: 9, subject: 'chemistry', topic: 'Separation of Immiscible Liquids: Separating Funnel',
    chapters: [],
    nodeIds: ['c9_chem_ch1_7', 'c9_chem_ch1_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe how oil floats on water when you wash an oily utensil — the two liquids form clear layers instead of.', goal: 'Master Separation of Immiscible Liquids: Separating Funnel.' },
    discovery: {
        question: 'A student pours a mixture of water (density 1.0 g/cm³) and carbon tetrachloride (density 1.6 g/cm³) into a separating funnel.',
        options: ['Carbon tetrachloride will form the lower layer', 'water will be lower', 'water is always the reference without checking numbers'],
        answer: 'Carbon tetrachloride will form the lower layer',
        hook: 'Students believe that the aqueous layer (water-based) always forms the lower layer in a separating funnel.',
    },
    teaching: [
        { title: 'A separating funnel is a laboratory.', text: 'A separating funnel is a laboratory apparatus used to separate two immiscible liquids of different densities by allowing them to form distinct layers and draining the lower layer through a stopcock,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_chem_ch1_7', title: 'A separating funnel is a laboratory.',
          scaffold: { problem: 'In a school laboratory, a student accidentally mixes 50 mL of chloroform (density 1.48 g/cm³) with 50 mL of water (density 1.00 g/cm³).',
            steps: [
            { text: 'Identify the liquids and their densities — chloroform (1.48 g/cm³) is denser than water (1.00 g/cm³), so chloroform.' },
            { text: 'Set up the separating funnel on a stand, ensure the stopcock is closed, and place a beaker underneath.' },
            { text: 'Pour the mixture into the funnel through the top, replace the stopper, and invert gently 3-4 times with the stopcock.' },
            { text: 'Vent the funnel by opening the stopcock briefly while inverted to release any pressure from volatile vapours, then.' },
            { text: 'Allow the funnel to stand undisturbed for 2-3 minutes until two clear layers form with a sharp interface.' },
            { text: 'Open the stopcock slowly and drain the lower chloroform layer into a clean beaker labelled "chloroform", closing the.' },
            { text: 'Pour the upper water layer out from the top of the funnel into another beaker labelled "water".' },
            { text: 'Verify separation by checking densities — e.g., a drop of water added to the chloroform beaker should sink, confirming.', faded: true, blankAnswer: 'Chloroform collected first from stopcock (lower layer),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_chem_ch1_8', title: 'Sublimation is a physical change of.',
          scaffold: { problem: 'A student has a mixture of iodine crystals (I₂) and sand (SiO₂). She wants to obtain pure iodine crystals using sublimation.',
            steps: [
            { text: 'Identify the components: Iodine (sublimable, molecular solid with weak van der Waals forces) and Sand (non-sublimable,.' },
            { text: 'Set up apparatus: Place mixture in a china dish, cover with an inverted glass funnel, plug funnel stem with cotton.' },
            { text: 'Observe: Purple iodine vapour rises (sublimation), deposits as shiny grey-black crystals on the cool inner walls of the.' },
            { text: 'Collect: After cooling, carefully scrape the pure iodine crystals from the funnel. The sand residue stays in the dish.' },
            { text: 'Verify: Test a crystal with starch solution — blue-black colour confirms iodine. Sand shows no colour change.', faded: true, blankAnswer: 'Pure iodine crystals collected on funnel walls; sand.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_chem_ch1_8', title: 'Identify each idea',
          dissect: { specimen: 'Separation of Immiscible Liquids: Separating Funnel', spots: [
            { id: 's1', label: 'A separating funnel is a', prompt: 'Which idea is this? — A separating funnel is a laboratory apparatus used to separate two immiscible liquids of.', answer: 'A separating funnel is a', options: ['A separating funnel is a', 'Sublimation is a physical change'] },
            { id: 's2', label: 'Sublimation is a physical change', prompt: 'Which idea is this? — Sublimation is a physical change of state in which a solid transforms directly into a gas.', answer: 'Sublimation is a physical change', options: ['Sublimation is a physical change', 'A separating funnel is a'] }
          ] } }
    ],
    explore: { component: C9_ChemistryLaboratorypreparationofhydrogenSim, prompt: 'Explore the interactive — Separation of Immiscible Liquids: Separating Funnel' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_chem_ch1_7', difficulty: 'standard',
          question: 'A separating funnel is a laboratory apparatus used to separate two immiscible.',
          hint: 'If stuck, revisit c8_chem_ch3_2 (homogeneous vs heterogeneous mixtures) and c8_chem_ch2_9.',
          misconception: 'Students believe that the aqueous layer (water-based) always forms the lower layer in a separating funnel.',
          parts: [
                { id: 'a', prompt: 'A student pours a mixture of water (density 1.0 g/cm³) and carbon tetrachloride (density 1.6 g/cm³) into a separating funnel.', answer: 'Carbon tetrachloride will form the lower layer',
                  options: ['Carbon tetrachloride will form the lower layer', 'water will be lower', 'water is always the reference without checking numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the aqueous layer (water-based) always forms the lower layer in a separating funnel.' }
          ],
            remediations: { 'the-aqueous-layer-water-based': { steps: ['Give the student a density table of common organic liquids (hexane 0.66, ether 0.71, chloroform 1.48, carbon.', 'Ask them to predict layer order for 5 pairs (e.g., ether-water, chloroform-water, hexane-water, carbon.', 'For each wrong prediction, have them do a "drop test": add a drop of coloured water to a test tube with the two liquids.', 'Repeat until they consistently predict layer order from density values alone.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_8', difficulty: 'standard',
          question: 'Sublimation is a physical change of state in which a solid transforms directly.',
          hint: 'If stuck, revisit c8_chem_ch2_6 (solid particles), c8_chem_ch2_8 (gas particles), and.',
          misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar.',
          parts: [
                { id: 'a', prompt: 'Define sublimation and name two substances that sublime at room temperature. Write their chemical formulas.', answer: 'Sublimation is the direct transition of a solid to gas without becoming liquid',
                  options: ['Sublimation is the direct transition of a solid to gas without becoming liquid', 'ice sublimes', 'sublimation is solid to liquid'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' },
                { id: 'b', prompt: 'Explain why solid carbon dioxide (dry ice) sublimes at -78°C under 1 atm pressure, but water ice melts at 0°C under the same pressure.', answer: 'Dry ice (CO₂) has weak van der Waals forces between molecules',
                  options: ['Dry ice (CO₂) has weak van der Waals forces between molecules', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' },
                { id: 'c', prompt: 'A mixture contains 5 g of ammonium chloride (NH₄Cl) and 5 g of sodium chloride (NaCl).', answer: 'Procedure: (1) Place mixture in a china dish',
                  options: ['Procedure: (1) Place mixture in a china dish', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' }
          ],
            remediations: { 'any-solid-heated-strongly-will': { steps: ['Show a video of sugar heating: it melts, turns brown, chars, and releases fumes — point out the colour change and.', 'Heat NH₄Cl in a test tube with a cold finger: white crystals deposit *only* on the cooler upper part, proving.', 'Have students test 4 solids (NaCl, NH₄Cl, iodine, sugar) in a "sublimation test" table: record if they melt, char, or.', 'Emphasize: sublimation = reversible, no colour change, same chemical formula.'] } } },
        { type: 'subpart', nodeId: 'c9_chem_ch1_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Iodine crystals sublime on heating, so the purple vapour produced is a new chemical substance." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', '**any solid heated strongly will sublime** (e', 'sodium chloride or sugar sublimes if heated enough)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **any solid heated strongly will sublime** (e.g., they think sodium chloride or sugar sublimes if heated.' }
          ],
            remediations: { 'any-solid-heated-strongly-will': { steps: ['Show a video of sugar heating: it melts, turns brown, chars, and releases fumes — point out the colour change and.', 'Heat NH₄Cl in a test tube with a cold finger: white crystals deposit *only* on the cooler upper part, proving.', 'Have students test 4 solids (NaCl, NH₄Cl, iodine, sugar) in a "sublimation test" table: record if they melt, char, or.', 'Emphasize: sublimation = reversible, no colour change, same chemical formula.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
