import type { SimDef } from '../../engine/types';

/** v3 generated — c10_gram_ch95 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_gram_ch95: SimDef = {
    id: 'v3_c10_gram_ch95',
    title: 'Passive voice moves the object to subject.',
    subtitle: 'Covers standard transitives across all tenses + when passive is preferred.',
    classLevel: 10, subject: 'gram', topic: 'Passive voice moves the object to subject.',
    chapters: ['c10_gram_ch95'],
    nodeIds: ['c10_gram_cbse_95_001', 'c10_gram_cbse_95_002', 'c10_gram_cbse_95_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Show the surgery on one sentence: \'The cat chased the mouse.\' Object \'the mouse\' walks to the front; \'chased\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Passive voice moves the object to.', text: 'Passive voice moves the object to subject position and demotes or deletes the doer: object→subject, verb→be+V3, subject→(by + agent, often dropped).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c10_gram_cbse_95_002', title: 'Identify each idea',
          dissect: { specimen: 'Passive voice moves the object to subject.', spots: [
            { id: 's1', label: 'Passive voice moves the object', prompt: 'Which idea is this? — Passive voice moves the object to subject position and demotes or deletes the doer.', answer: 'Passive voice moves the object', options: ['Passive voice moves the object', 'The three degrees must preserve', 'Sentence structure is about clause'] },
            { id: 's2', label: 'The three degrees must preserve', prompt: 'Which idea is this? — The three degrees must preserve exact meaning through fixed frames: positive \'as…as\'.', answer: 'The three degrees must preserve', options: ['The three degrees must preserve', 'Passive voice moves the object', 'Sentence structure is about clause'] },
            { id: 's3', label: 'Sentence structure is about clause', prompt: 'Which idea is this? — Sentence structure is about clause count and dependence: simple = one finite verb.', answer: 'Sentence structure is about clause', options: ['Sentence structure is about clause', 'Passive voice moves the object', 'The three degrees must preserve'] }
          ] } },
        { type: 'build', nodeId: 'c10_gram_cbse_95_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Sanity check — is the receiver the real story?', 'Old subject → \'by + agent\' or delete it.', 'Verb → be + V3, with \'be\' matching the ORIGINAL tense and.', 'Find the object — that\'s your new subject.'], answer: 'Find the object — that\'s your new subject. Verb → be + V3, with \'be\' matching the ORIGINAL tense and. Old subject → \'by + agent\' or delete it. Sanity check — is the receiver the real story?' } },
        { type: 'case', nodeId: 'c10_gram_cbse_95_003', title: 'You made it',
          caseStudy: { intro: 'You finished Passive voice moves the object to subject. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c10_gram_cbse_95_001', difficulty: 'standard',
          question: 'Passive voice moves the object to subject position and demotes or deletes the.',
          hint: 'Work step by step.',
          misconception: 'Students change the verb to V3 but forget the be-auxiliary (\'The mouse chased\'), keep the wrong tense in \'be\' (\'was.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Passive voice moves the object to subject position and demotes or deletes the doer:',
                  options: ['Passive voice moves the object to subject position and demotes or deletes the doer:', 'The three degrees must preserve exact meaning through fixed frames: positive \'as…as\',', 'Sentence structure is about clause count and dependence: simple = one finite verb,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students change the verb to V3 but forget the be-auxiliary (\'The mouse chased\'), keep the wrong tense in \'be\' (\'was chase\' / \'is chased\'.' }
          ],
            remediations: { 'students-change-the-verb-to': { steps: ['Find the object — that\'s your new subject.', 'Verb → be + V3, with \'be\' matching the ORIGINAL tense and the NEW subject\'s number.', 'Old subject → \'by + agent\' or delete it.', 'Sanity check — is the receiver the real story? If the doer matters, stay active.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_95_002', difficulty: 'standard',
          question: 'The three degrees must preserve exact meaning through fixed frames: positive.',
          hint: 'Work step by step.',
          misconception: 'Students drop \'other\' — \'Asha is taller than any girl\' logically includes Asha herself, an impossibility — and mix.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The three degrees must preserve exact meaning through fixed frames: positive \'as…as\',',
                  options: ['The three degrees must preserve exact meaning through fixed frames: positive \'as…as\',', 'Passive voice moves the object to subject position and demotes or deletes the doer:', 'Sentence structure is about clause count and dependence: simple = one finite verb,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students drop \'other\' — \'Asha is taller than any girl\' logically includes Asha herself, an impossibility — and mix frames (\'more taller\'.' }
          ],
            remediations: { 'students-drop-other-asha-is': { steps: ['Identify which degree the source uses.', 'Pick the target frame template.', 'Insert the set-control word (other/else/no other/very few) so the compared entity lands on the correct side of the.', 'Never double-mark — one \'more/-er\' OR one \'most/-est\', not both.'] } } },
        { type: 'subpart', nodeId: 'c10_gram_cbse_95_003', difficulty: 'standard',
          question: 'Sentence structure is about clause count and dependence: simple = one finite.',
          hint: 'Work step by step.',
          misconception: 'Students call any long sentence \'complex\', miss that \'and/but\' between two full clauses is compound not complex, and.',
          parts: [
                { id: 'a', prompt: 'Is this legal? \'She loves maths, she practises daily.\'', answer: 'No — comma splice',
                  options: ['No — comma splice', 'a comma has conjunctive power'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students call any long sentence \'complex\', miss that \'and/but\' between two full clauses is compound not complex, and write comma splices.' }
          ],
            remediations: { 'students-call-any-long-sentence': { steps: ['Count finite verbs.', 'If two+, check the joiner — coordinator = compound, subordinator = complex, none = comma splice.', 'To transform, repackage the subordinate idea as a phrase (simple), an equal clause (compound), or.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
