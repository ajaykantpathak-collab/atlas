import type { SimDef } from '../../engine/types';

/** v3 generated — c6_gram_ch80 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_gram_ch80: SimDef = {
    id: 'v3_c6_gram_ch80',
    title: 'Every English sentence needs two parts that.',
    subtitle: 'Covers simple sentences with one subject and one verb. Does NOT cover compound/complex.',
    classLevel: 6, subject: 'gram', topic: 'Every English sentence needs two parts that.',
    chapters: ['c6_gram_ch80'],
    nodeIds: ['c6_gram_cbse_80_001', 'c6_gram_cbse_80_002', 'c6_gram_cbse_80_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Cover the verb: \'The little boy ran home\' — cover \'ran home\'. What is left is the subject.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Every English sentence needs two parts.', text: 'Every English sentence needs two parts that answer two questions: the subject (WHO or WHAT the sentence is about) and the predicate (what the subject DOES or IS).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c6_gram_cbse_80_002', title: 'Identify each idea',
          dissect: { specimen: 'Every English sentence needs two parts that.', spots: [
            { id: 's1', label: 'Every English sentence needs two', prompt: 'Which idea is this? — Every English sentence needs two parts that answer two questions: the subject (WHO.', answer: 'Every English sentence needs two', options: ['Every English sentence needs two', 'Sentences do four jobs and', 'Word order is not decoration'] },
            { id: 's2', label: 'Sentences do four jobs and', prompt: 'Which idea is this? — Sentences do four jobs and each job has a name: declarative (states), interrogative.', answer: 'Sentences do four jobs and', options: ['Sentences do four jobs and', 'Every English sentence needs two', 'Word order is not decoration'] },
            { id: 's3', label: 'Word order is not decoration', prompt: 'Which idea is this? — Word order is not decoration — English meaning rides on position.', answer: 'Word order is not decoration', options: ['Word order is not decoration', 'Every English sentence needs two', 'Sentences do four jobs and'] }
          ] } },
        { type: 'build', nodeId: 'c6_gram_cbse_80_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Ask \'who or what + verb?\' — that phrase is the subject.', 'Check both parts exist before calling it a sentence.', 'Find the verb — the action or being word.'], answer: 'Find the verb — the action or being word. Ask \'who or what + verb?\' — that phrase is the subject. Check both parts exist before calling it a sentence.' } },
        { type: 'case', nodeId: 'c6_gram_cbse_80_003', title: 'You made it',
          caseStudy: { intro: 'You finished Every English sentence needs two parts that. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c6_gram_cbse_80_001', difficulty: 'standard',
          question: 'Every English sentence needs two parts that answer two questions: the subject.',
          hint: 'Work step by step.',
          misconception: 'Students think the subject is always the first word and the longest noun — so in \'Playing in the rain is fun\' they hunt.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Every English sentence needs two parts that answer two questions: the subject (WHO or',
                  options: ['Every English sentence needs two parts that answer two questions: the subject (WHO or', 'Sentences do four jobs and each job has a name: declarative (states), interrogative', 'Word order is not decoration'],
                  hint: 'Recall the definition.',
                  misconception: 'Students think the subject is always the first word and the longest noun — so in \'Playing in the rain is fun\' they hunt for a person.' }
          ],
            remediations: { 'the-subject-is-always-the': { steps: ['Find the verb — the action or being word.', 'Ask \'who or what + verb?\' — that phrase is the subject.', 'Check both parts exist before calling it a sentence.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_80_002', difficulty: 'standard',
          question: 'Sentences do four jobs and each job has a name: declarative (states).',
          hint: 'Work step by step.',
          misconception: 'Students classify by punctuation alone and miss that \'Please sit down\' is imperative even when it is politely phrased.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sentences do four jobs and each job has a name: declarative (states), interrogative',
                  options: ['Sentences do four jobs and each job has a name: declarative (states), interrogative', 'Every English sentence needs two parts that answer two questions: the subject (WHO or', 'Word order is not decoration'],
                  hint: 'Recall the definition.',
                  misconception: 'Students classify by punctuation alone and miss that \'Please sit down\' is imperative even when it is politely phrased — and they call every.' }
          ],
            remediations: { 'students-classify-by-punctuation-alone': { steps: ['Ask what the sentence DOES — tell, ask, order, exclaim.', 'Match the job to the type name.', 'Punctuate to match — \'what/how\' + no question intended = exclamation mark.'] } } },
        { type: 'subpart', nodeId: 'c6_gram_cbse_80_003', difficulty: 'standard',
          question: 'Word order is not decoration — English meaning rides on position.',
          hint: 'Work step by step.',
          misconception: 'Students accept any order that \'sounds okay\' from spoken English — especially putting time phrases anywhere — and don\'t.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word order is not decoration',
                  options: ['Word order is not decoration', 'Every English sentence needs two parts that answer two questions: the subject (WHO or', 'Sentences do four jobs and each job has a name: declarative (states), interrogative'],
                  hint: 'Recall the definition.',
                  misconception: 'Students accept any order that \'sounds okay\' from spoken English — especially putting time phrases anywhere — and don\'t notice when actor.' }
          ],
            remediations: { 'students-accept-any-order-that': { steps: ['Find the verb.', 'Ask who does it — that is the subject, put it first.', 'What receives it — the object.', 'Attach time/place phrases at the end (or front with a comma).'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
