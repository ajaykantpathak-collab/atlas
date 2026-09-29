import type { SimDef } from '../../engine/types';

/** v3 generated — c6_gram_ch82 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_gram_ch82: SimDef = {
    id: 'v3_c6_gram_ch82',
    title: 'A verb is the engine word — it names an action.',
    subtitle: 'Covers verb identification and the three simple tenses. Does NOT cover continuous/perfect.',
    classLevel: 6, subject: 'gram', topic: 'A verb is the engine word — it names an action.',
    chapters: ['c6_gram_ch82'],
    nodeIds: ['c6_gram_cbse_82_001', 'c6_gram_cbse_82_002', 'c6_gram_cbse_82_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Find the engine: \'The bird flew over the tall tree slowly.\' Which word can you act out? \'flew\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A verb is the engine word — it names an.', text: 'A verb is the engine word — it names an action (run, eat, think) or a state (is, seem, have).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c6_gram_cbse_82_002', title: 'Identify each idea',
          dissect: { specimen: 'A verb is the engine word — it names an action.', spots: [
            { id: 's1', label: 'A verb is the engine', prompt: 'Which idea is this? — A verb is the engine word — it names an action (run, eat, think) or a state (is, seem.', answer: 'A verb is the engine', options: ['A verb is the engine', 'Present tense has two gears', 'Past and future have matching'] },
            { id: 's2', label: 'Present tense has two gears', prompt: 'Which idea is this? — Present tense has two gears students must separate: simple present for habits and facts.', answer: 'Present tense has two gears', options: ['Present tense has two gears', 'A verb is the engine', 'Past and future have matching'] },
            { id: 's3', label: 'Past and future have matching', prompt: 'Which idea is this? — Past and future have matching pairs: simple past for finished actions (\'She danced.', answer: 'Past and future have matching', options: ['Past and future have matching', 'A verb is the engine', 'Present tense has two gears'] }
          ] } },
        { type: 'build', nodeId: 'c6_gram_cbse_82_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Match the gear: -ed/past form = past, will+base = future.', 'Check for helpers (is/was/will/has) — they ride with the.', 'Ask which word carries the action or the being.'], answer: 'Ask which word carries the action or the being. Check for helpers (is/was/will/has) — they ride with the. Match the gear: -ed/past form = past, will+base = future.' } },
        { type: 'case', nodeId: 'c6_gram_cbse_82_003', title: 'You made it',
          caseStudy: { intro: 'You finished A verb is the engine word — it names an action. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_gram_cbse_82_001', difficulty: 'standard',
          question: 'A verb is the engine word — it names an action (run, eat, think) or a state.',
          hint: 'Work step by step.',
          misconception: 'Students pick the action-WORD wrong — in \'Running is fun\' they miss that \'is\' is the verb and \'running\' acts as a noun.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A verb is the engine word',
                  options: ['A verb is the engine word', 'Present tense has two gears students must separate: simple present for habits and facts', 'Past and future have matching pairs: simple past for finished actions (\'She danced'],
                  hint: 'Recall the definition.',
                  misconception: 'Students pick the action-WORD wrong — in \'Running is fun\' they miss that \'is\' is the verb and \'running\' acts as a noun here.' }
          ],
            remediations: { 'students-pick-the-action-word': { steps: ['Ask which word carries the action or the being.', 'Check for helpers (is/was/will/has) — they ride with the main verb.', 'Match the gear: -ed/past form = past, will+base = future, plain = present.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_82_002', difficulty: 'standard',
          question: 'Present tense has two gears students must separate: simple present for habits.',
          hint: 'Work step by step.',
          misconception: 'Students use continuous for everything now-adjacent (\'I am going to school daily\') and forget the helpers — writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Present tense has two gears students must separate: simple present for habits and facts',
                  options: ['Present tense has two gears students must separate: simple present for habits and facts', 'A verb is the engine word', 'Past and future have matching pairs: simple past for finished actions (\'She danced'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use continuous for everything now-adjacent (\'I am going to school daily\') and forget the helpers — writing \'She reading\' with.' }
          ],
            remediations: { 'students-use-continuous-for-everything': { steps: ['Ask habit-or-now.', 'Habit/fact → simple (add -s for he/she/it).', 'Now → is/am/are + V-ing, never -ing alone.', 'Spell the -ing: double final consonant after short vowel, drop silent e.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_82_003', difficulty: 'standard',
          question: 'Past and future have matching pairs: simple past for finished actions (\'She.',
          hint: 'Work step by step.',
          misconception: 'Students learn irregular pasts as lists without patterns, write \'didn\'t went\' (double past — after \'did\' the verb.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Past and future have matching pairs: simple past for finished actions (\'She danced',
                  options: ['Past and future have matching pairs: simple past for finished actions (\'She danced', 'A verb is the engine word', 'Present tense has two gears students must separate: simple present for habits and facts'],
                  hint: 'Recall the definition.',
                  misconception: 'Students learn irregular pasts as lists without patterns, write \'didn\'t went\' (double past — after \'did\' the verb returns to base form).' }
          ],
            remediations: { 'students-learn-irregular-pasts-as': { steps: ['For interrupted past — background gets was/were+V-ing, the interrupter gets simple past.', 'After \'did/didn\'t\', verb returns to base — never \'did went\'.', 'Future — decided already? going to. Deciding now/predicting? will.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
