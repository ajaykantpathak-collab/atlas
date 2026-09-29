import type { SimDef } from '../../engine/types';
import C6_ScienceGarbageInGarbageOutSim from '../../../simulations/c6_12/C6_ScienceGarbageInGarbageOutSim';

/** v3 wrapped master — C6_ScienceGarbageInGarbageOutSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencegarbageingarbageoutsim: SimDef = {
    id: 'v3w_c6_sciencegarbageingarbageoutsim',
    title: 'Respiration in Animals: How Breathing Works',
    subtitle: 'This node covers the mechanics of breathing (diaphragm and rib movement) and the purpose.',
    classLevel: 6, subject: 'science', topic: 'Respiration in Animals: How Breathing Works',
    chapters: [],
    nodeIds: ['c6_biology_ch09_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed how your chest moves when you take a deep breath after running?', goal: 'Master Respiration in Animals: How Breathing Works.' },
    discovery: {
        question: 'When you inhale, the diaphragm moves downward. What do you think happens to the diaphragm when you exhale?',
        options: ['It moves upward, pushing against the lungs to help squeeze the air out', 'stays the same', 'moves down again'],
        answer: 'It moves upward, pushing against the lungs to help squeeze the air out',
        hook: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.',
    },
    teaching: [
        { title: 'Breathing is the mechanical action of moving.', text: 'Breathing is the mechanical action of moving air into and out of the lungs to exchange oxygen and carbon dioxide.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_biology_ch09_004', title: 'Breathing is the mechanical action of.',
          caseStudy: { intro: 'Have you ever noticed how your chest moves when you take a deep breath after running?',
            decisions: [{ prompt: 'What is the primary function of the diaphragm during breathing?', options: [
                { text: 'The diaphragm moves downward to enlarge the chest cavity, allowing air to be drawn into', outcome: 'The diaphragm moves downward to enlarge the chest cavity, allowing air to be drawn into the lungs.' },
                { text: 'it filters the air', outcome: 'Not quite — Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up.', reveals: 'the-lungs-themselves-pull-the' },
                { text: 'the lungs themselves "pull" the air in, similar to a sponge soaking up water', outcome: 'Not quite — Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up.', reveals: 'the-lungs-themselves-pull-the' }
            ] }] } }
    ],
    explore: { component: C6_ScienceGarbageInGarbageOutSim, prompt: 'Explore the interactive — Respiration in Animals: How Breathing Works' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_biology_ch09_004', difficulty: 'standard',
          question: 'Breathing is the mechanical action of moving air into and out of the lungs to.',
          hint: 'Review the skeletal system and muscle movement in the body.',
          misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.',
          parts: [
                { id: 'a', prompt: 'When you inhale, the diaphragm moves downward. What do you think happens to the diaphragm when you exhale?', answer: 'It moves upward, pushing against the lungs to help squeeze the air out',
                  options: ['It moves upward, pushing against the lungs to help squeeze the air out', 'stays the same', 'moves down again'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' },
                { id: 'b', prompt: 'Compare the chest movement of a person who is resting versus someone who has just finished a race. Why does the difference occur?', answer: 'The chest moves faster and deeper after a race',
                  options: ['The chest moves faster and deeper after a race', 'the lungs themselves "pull" the air in, similar to a sponge soaking up water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' }
          ],
            remediations: { 'the-lungs-themselves-pull-the': { steps: ['If a student thinks the lungs pull air, ask them to hold a deflated balloon and try to make it expand without blowing.', 'Explain that the lungs are like those balloons—they need the diaphragm to "pull" on the chest cavity space to create a.', 'Use a syringe analogy: pulling the plunger (diaphragm) creates space for liquid/air to enter, just as the diaphragm.'] } } },
        { type: 'subpart', nodeId: 'c6_biology_ch09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.',
          parts: [
                { id: 'a', prompt: 'Compare the chest movement of a person who is resting versus someone who has just finished a race. Why does the difference occur?', answer: 'The chest moves faster and deeper after a race',
                  options: ['The chest moves faster and deeper after a race', 'the lungs themselves "pull" the air in, similar to a sponge soaking up water'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the lungs themselves "pull" the air in, similar to a sponge soaking up water.' }
          ],
            remediations: { 'the-lungs-themselves-pull-the': { steps: ['If a student thinks the lungs pull air, ask them to hold a deflated balloon and try to make it expand without blowing.', 'Explain that the lungs are like those balloons—they need the diaphragm to "pull" on the chest cavity space to create a.', 'Use a syringe analogy: pulling the plunger (diaphragm) creates space for liquid/air to enter, just as the diaphragm.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
