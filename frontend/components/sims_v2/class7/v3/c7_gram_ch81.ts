import type { SimDef } from '../../engine/types';

/** v3 generated — c7_gram_ch81 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_gram_ch81: SimDef = {
    id: 'v3_c7_gram_ch81',
    title: 'Continuous tenses add \'be + V-ing\' to show.',
    subtitle: 'Covers the three continuous forms. Does NOT cover stative restrictions.',
    classLevel: 7, subject: 'gram', topic: 'Continuous tenses add \'be + V-ing\' to show.',
    chapters: ['c7_gram_ch81'],
    nodeIds: ['c7_gram_cbse_81_001', 'c7_gram_cbse_81_002', 'c7_gram_cbse_81_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'The film test: continuous = a movie playing, simple = a photograph.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Continuous tenses add \'be + V-ing\' to.', text: 'Continuous tenses add \'be + V-ing\' to show action in progress: present continuous (is reading), past continuous (was reading), future continuous (will be reading).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c7_gram_cbse_81_002', title: 'Identify each idea',
          dissect: { specimen: 'Continuous tenses add \'be + V-ing\' to show.', spots: [
            { id: 's1', label: 'Continuous tenses add be', prompt: 'Which idea is this? — Continuous tenses add \'be + V-ing\' to show action in progress: present continuous (is.', answer: 'Continuous tenses add be', options: ['Continuous tenses add be', 'Present perfect connects a past', 'Past perfect is the earlier-past'] },
            { id: 's2', label: 'Present perfect connects a past', prompt: 'Which idea is this? — Present perfect connects a past action to NOW: \'I have finished\' — the work is done AND.', answer: 'Present perfect connects a past', options: ['Present perfect connects a past', 'Continuous tenses add be', 'Past perfect is the earlier-past'] },
            { id: 's3', label: 'Past perfect is the earlier-past', prompt: 'Which idea is this? — Past perfect is the earlier-past: \'When I reached the station, the train HAD LEFT\' — two.', answer: 'Past perfect is the earlier-past', options: ['Past perfect is the earlier-past', 'Continuous tenses add be', 'Present perfect connects a past'] }
          ] } },
        { type: 'build', nodeId: 'c7_gram_cbse_81_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Is the action a film (in progress) or a snapshot.', 'Film → be (right time) + V-ing.', 'Never -ing alone — \'she reading\' is broken English.'], answer: 'Is the action a film (in progress) or a snapshot. Film → be (right time) + V-ing. Never -ing alone — \'she reading\' is broken English.' } },
        { type: 'case', nodeId: 'c7_gram_cbse_81_003', title: 'You made it',
          caseStudy: { intro: 'You finished Continuous tenses add \'be + V-ing\' to show. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_gram_cbse_81_001', difficulty: 'standard',
          question: 'Continuous tenses add \'be + V-ing\' to show action in progress: present.',
          hint: 'Work step by step.',
          misconception: 'Students drop the be (\'she reading\'), use continuous for completed facts (\'I was going to school yesterday\' when the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Continuous tenses add \'be + V-ing\' to show action in progress: present continuous (is',
                  options: ['Continuous tenses add \'be + V-ing\' to show action in progress: present continuous (is', 'Present perfect connects a past action to NOW: \'I have finished\'', 'Past perfect is the earlier-past: \'When I reached the station, the train HAD LEFT\''],
                  hint: 'Recall the definition.',
                  misconception: 'Students drop the be (\'she reading\'), use continuous for completed facts (\'I was going to school yesterday\' when the whole trip is over).' }
          ],
            remediations: { 'students-drop-the-be-she': { steps: ['Is the action a film (in progress) or a snapshot (done/habit)?', 'Film → be (right time) + V-ing.', 'Never -ing alone — \'she reading\' is broken English.'] } } },
        { type: 'subpart', nodeId: 'c7_gram_cbse_81_002', difficulty: 'standard',
          question: 'Present perfect connects a past action to NOW: \'I have finished\' — the work.',
          hint: 'Work step by step.',
          misconception: 'Students use present perfect with finished time (\'I have gone yesterday\'), and Hindi\'s single past makes both forms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Present perfect connects a past action to NOW: \'I have finished\'',
                  options: ['Present perfect connects a past action to NOW: \'I have finished\'', 'Continuous tenses add \'be + V-ing\' to show action in progress: present continuous (is', 'Past perfect is the earlier-past: \'When I reached the station, the train HAD LEFT\''],
                  hint: 'Recall the definition.',
                  misconception: 'Students use present perfect with finished time (\'I have gone yesterday\'), and Hindi\'s single past makes both forms feel identical — the.' }
          ],
            remediations: { 'students-use-present-perfect-with': { steps: ['Is there a finished time-word (yesterday/ago/last)? → simple past, forced.', 'Does the result still matter now? → present perfect.', 'Form: have/has + V3 (eaten, gone, done).'] } } },
        { type: 'subpart', nodeId: 'c7_gram_cbse_81_003', difficulty: 'standard',
          question: 'Past perfect is the earlier-past: \'When I reached the station, the train HAD.',
          hint: 'Work step by step.',
          misconception: 'Students put \'had\' on the wrong event (the later one) or use it for single past actions where no ordering exists (\'I.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Past perfect is the earlier-past: \'When I reached the station, the train HAD LEFT\'',
                  options: ['Past perfect is the earlier-past: \'When I reached the station, the train HAD LEFT\'', 'Continuous tenses add \'be + V-ing\' to show action in progress: present continuous (is', 'Present perfect connects a past action to NOW: \'I have finished\''],
                  hint: 'Recall the definition.',
                  misconception: 'Students put \'had\' on the wrong event (the later one) or use it for single past actions where no ordering exists (\'I had gone to school\'.' }
          ],
            remediations: { 'students-put-had-on-the': { steps: ['Find the two past events.', 'Which is earlier? → had + V3.', 'Later event stays simple past.', 'One event alone never takes \'had\'.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
