import type { SimDef } from '../../engine/types';
import C6_HistoryCivicsScientificProgressGuptaSim from '../../../simulations/c6_12/C6_HistoryCivicsScientificProgressGuptaSim';

/** v3 wrapped master — C6_HistoryCivicsScientificProgressGuptaSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_historycivicsscientificprogressguptasim: SimDef = {
    id: 'v3w_c6_historycivicsscientificprogressguptasim',
    title: 'Scientific Progress Gupta',
    subtitle: 'Covers India\'s progress in space and technology and its identity as a democracy.',
    classLevel: 6, subject: 'history', topic: 'India Today: Achievements and Challenges',
    chapters: [],
    nodeIds: ['c6_history_ch12_056'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered how a country that was known as \'Jambudvīpa\' or \'Bhāratavarṣha\' thousands of years ago.', goal: 'Master Scientific Progress Gupta.' },
    discovery: {
        question: 'Why do we call India a "democracy" today?',
        options: ['We call it a democracy', 'democracy', 'monarchy'],
        answer: 'We call it a democracy',
        hook: 'Students often think that the name \'India\' was the original name of the land, whereas it is actually a name derived.',
    },
    teaching: [
        { title: 'India today is a democratic nation that has.', text: 'India today is a democratic nation that has evolved from its ancient roots into a modern, technologically advancing society known for significant scientific milestones.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [

    ],
    explore: { component: C6_HistoryCivicsScientificProgressGuptaSim, prompt: 'Explore the interactive — Scientific Progress Gupta' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch12_056', difficulty: 'standard',
          question: 'India today is a democratic nation that has evolved from its ancient roots into.',
          hint: 'Review the definitions of the Indian Subcontinent provided in the first half of the.',
          misconception: 'Students often think that the name \'India\' was the original name of the land, whereas it is actually a name derived.',
          parts: [
                { id: 'a', prompt: 'Why do we call India a "democracy" today?', answer: 'We call it a democracy',
                  options: ['We call it a democracy', 'democracy', 'monarchy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the name \'India\' was the original name of the land, whereas it is actually a name derived from the river \'Sindhu\'.' }
          ],
            remediations: { 'the-name-india-was-the': { steps: ['Review the chapter section on how foreign travelers named the land based on the Sindhu river.', 'Point out the difference between \'Bhārata\' (inward name) and \'India\' (outward name).', 'Ask them to map the evolution: Sindhu -> Hindu -> Indoi -> India.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
