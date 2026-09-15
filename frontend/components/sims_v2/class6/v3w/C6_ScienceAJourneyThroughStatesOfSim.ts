import type { SimDef } from '../../engine/types';
import C6_ScienceAJourneyThroughStatesOfSim from '../../../simulations/c6_12/C6_ScienceAJourneyThroughStatesOfSim';

/** v3 wrapped master — C6_ScienceAJourneyThroughStatesOfSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_scienceajourneythroughstatesofsim: SimDef = {
    id: 'v3w_c6_scienceajourneythroughstatesofsim',
    title: 'AJourney Through States Of',
    subtitle: 'This node covers the definition of science and the basic scientific method (observation,.',
    classLevel: 6, subject: 'science', topic: 'What is Science and Why It Matters',
    chapters: [],
    nodeIds: ['c6_physics_ch01_001', 'c6_physics_ch07_023'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine your favorite flashlight suddenly stops working; what is the first thing you do?', goal: 'Master AJourney Through States Of.' },
    discovery: {
        question: 'What is the primary source of energy that drives the entire water cycle?',
        options: ['The Sun', 'disappears', 'holding'],
        answer: 'The Sun',
        hook: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state.',
    },
    teaching: [
        { title: 'Science is a systematic method of exploring.', text: 'Science is a systematic method of exploring the natural world by making observations, asking questions about how things work, and testing those questions to find evidence-based answers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_physics_ch07_023', title: 'The water cycle is the continuous.',
          scaffold: { problem: 'A farmer in a village has a small pond. On a hot summer day (40°C), he notices the water level dropping.',
            steps: [
            { text: 'Identify the source of energy (Sun\'s radiation).' },
            { text: 'Identify the process (evaporation caused by heat gain).' },
            { text: 'Explain the movement (water turns to vapour).' },
            { text: 'Explain the rise (convection carries the warm vapour upwards).', faded: true, blankAnswer: 'The water is evaporating due to solar radiation and rising.' }
            ] } },
        { type: 'dissect', nodeId: 'c6_physics_ch07_023', title: 'Identify each idea',
          dissect: { specimen: 'AJourney Through States Of', spots: [
            { id: 's1', label: 'Science is a systematic method', prompt: 'Which idea is this? — Science is a systematic method of exploring the natural world by making observations,.', answer: 'Science is a systematic method', options: ['Science is a systematic method', 'The water cycle is the'] },
            { id: 's2', label: 'The water cycle is the', prompt: 'Which idea is this? — The water cycle is the continuous movement of water on Earth through the atmosphere,.', answer: 'The water cycle is the', options: ['The water cycle is the', 'Science is a systematic method'] }
          ] } }
    ],
    explore: { component: C6_ScienceAJourneyThroughStatesOfSim, prompt: 'Explore the interactive — AJourney Through States Of' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch07_023', difficulty: 'standard',
          question: 'The water cycle is the continuous movement of water on Earth through the.',
          hint: 'Review the definitions of radiation and convection from Chapter 7.',
          misconception: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state.',
          parts: [
                { id: 'a', prompt: 'What is the primary source of energy that drives the entire water cycle?', answer: 'The Sun',
                  options: ['The Sun', 'disappears', 'holding'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state into an invisible.' },
                { id: 'b', prompt: 'If you place a bowl of water in the shade versus in direct sunlight, which will evaporate faster? Why?', answer: 'The bowl in direct sunlight will evaporate faster',
                  options: ['The bowl in direct sunlight will evaporate faster', 'disappears', 'holding'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that water "disappears" or vanishes into thin air during evaporation, rather than changing state into an invisible.' }
          ],
            remediations: { 'water-disappears-or-vanishes-into': { steps: ['Ask the student to place a lid on a pot of boiling water and observe the droplets on the underside.', 'Explain that the steam is the water vapour, and when it hits the cooler lid, it turns back into liquid water, proving.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
