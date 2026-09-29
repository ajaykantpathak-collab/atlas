import type { SimDef } from '../../engine/types';
import C8_ChemistryChemicalequationsbalancingSim from '../../../simulations/c6_12/C8_ChemistryChemicalequationsbalancingSim';

/** v3 wrapped master — C8_ChemistryChemicalequationsbalancingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_chemistrychemicalequationsbalancingsim: SimDef = {
    id: 'v3w_c8_chemistrychemicalequationsbalancingsim',
    title: 'Particle Arrangement and Movement in Gases',
    subtitle: 'Covers the arrangement, movement, inter-particle distance, and forces of attraction.',
    classLevel: 8, subject: 'chemistry', topic: 'Particle Arrangement and Movement in Gases',
    chapters: [],
    nodeIds: ['c8_chem_ch2_8', 'c8_chem_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'When you open a bottle of perfume in one corner of a living room, the pleasant fragrance quickly spreads to.', goal: 'Master Particle Arrangement and Movement in Gases.' },
    discovery: {
        question: 'Which state of matter possesses the largest inter-particle space among solids, liquids, and gases?',
        options: ['Gases possess the largest inter-particle space', 'solids', 'liquids'],
        answer: 'Gases possess the largest inter-particle space',
        hook: 'Students often believe that inter-particle space within liquids and gases is filled with air or another medium, rather.',
    },
    teaching: [
        { title: 'In gases, particles are arranged with very.', text: 'In gases, particles are arranged with very large empty spaces between them and move about randomly at high speeds in all possible directions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_chem_ch2_9', title: 'Inter-particle space refers to the.',
          scaffold: { problem: 'A chemistry student takes a 50 mL graduated cylinder, fills it exactly to the 50 mL mark with dry fine sand, and in a separate cylinder,.',
            steps: [
            { text: 'Identify the components involved—sand (a solid particulate collection) and water (a liquid).' },
            { text: 'Recognize that sand particles are irregular and leave large microscopic gaps (inter-particle spaces) between solid.' },
            { text: 'Recognize that water is composed of smaller molecules with their own inter-particle spaces.' },
            { text: 'Deduce that when water is poured onto sand, the smaller water molecules slip into and occupy the large empty.' },
            { text: 'Conclude that because water fills these preexisting gaps, the total volume does not simply add up to 100 mL, proving.', faded: true, blankAnswer: 'The total volume is less than 100 mL because water.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_chem_ch2_9', title: 'Identify each idea',
          dissect: { specimen: 'Particle Arrangement and Movement in Gases', spots: [
            { id: 's1', label: 'In gases particles are arranged', prompt: 'Which idea is this? — In gases, particles are arranged with very large empty spaces between them and move about.', answer: 'In gases particles are arranged', options: ['In gases particles are arranged', 'Inter-particle space refers to the'] },
            { id: 's2', label: 'Inter-particle space refers to the', prompt: 'Which idea is this? — Inter-particle space refers to the empty microscopic gaps that exist between the.', answer: 'Inter-particle space refers to the', options: ['Inter-particle space refers to the', 'In gases particles are arranged'] }
          ] } }
    ],
    explore: { component: C8_ChemistryChemicalequationsbalancingSim, prompt: 'Explore the interactive — Particle Arrangement and Movement in Gases' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_chem_ch2_9', difficulty: 'standard',
          question: 'Inter-particle space refers to the empty microscopic gaps that exist between.',
          hint: 'Review node c8_chem_ch2_5 to reinforce the basic model of particle arrangement in the.',
          misconception: 'Students often believe that inter-particle space within liquids and gases is filled with air or another medium, rather.',
          parts: [
                { id: 'a', prompt: 'Which state of matter possesses the largest inter-particle space among solids, liquids, and gases?', answer: 'Gases possess the largest inter-particle space',
                  options: ['Gases possess the largest inter-particle space', 'solids', 'liquids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that inter-particle space within liquids and gases is filled with air or another medium, rather than being a true.' }
          ],
            remediations: { 'inter-particle-space-within-liquids': { steps: ['To correct this, remind students that particles of matter are the fundamental building blocks, and the region between.', 'Use the analogy of stars in the night sky: stars represent particles, and the dark space between them is empty space,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
