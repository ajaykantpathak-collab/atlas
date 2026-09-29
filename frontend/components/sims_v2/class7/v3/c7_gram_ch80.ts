import type { SimDef } from '../../engine/types';

/** v3 generated — c7_gram_ch80 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_gram_ch80: SimDef = {
    id: 'v3_c7_gram_ch80',
    title: 'A clause is a group of words with its own.',
    subtitle: 'Covers clause vs phrase vs sentence identification. Does NOT cover the three clause TYPES.',
    classLevel: 7, subject: 'gram', topic: 'A clause is a group of words with its own.',
    chapters: ['c7_gram_ch80'],
    nodeIds: ['c7_gram_cbse_80_001', 'c7_gram_cbse_80_002', 'c7_gram_cbse_80_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'The subject-verb test decides everything: \'after the match ended\' — subject \'match\', verb \'ended\' → clause.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'A clause is a group of words with its.', text: 'A clause is a group of words with its own subject and verb. An independent clause stands alone (\'She smiled\'); a dependent clause cannot (\'because she was happy\').', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'dissect', nodeId: 'c7_gram_cbse_80_002', title: 'Identify each idea',
          dissect: { specimen: 'A clause is a group of words with its own.', spots: [
            { id: 's1', label: 'A clause is a group', prompt: 'Which idea is this? — A clause is a group of words with its own subject and verb. An independent clause stands.', answer: 'A clause is a group', options: ['A clause is a group', 'Sentences multiply their verbs in', 'Inside a sentence nouns do'] },
            { id: 's2', label: 'Sentences multiply their verbs in', prompt: 'Which idea is this? — Sentences multiply their verbs in two legal ways: a compound sentence joins two.', answer: 'Sentences multiply their verbs in', options: ['Sentences multiply their verbs in', 'A clause is a group', 'Inside a sentence nouns do'] },
            { id: 's3', label: 'Inside a sentence nouns do', prompt: 'Which idea is this? — Inside a sentence, nouns do different jobs: subject (does the action), object (receives.', answer: 'Inside a sentence nouns do', options: ['Inside a sentence nouns do', 'A clause is a group', 'Sentences multiply their verbs in'] }
          ] } },
        { type: 'build', nodeId: 'c7_gram_cbse_80_001', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Stands alone? → independent.', 'Found one → does it start with a leaning word.', 'Look for a subject-verb pair.'], answer: 'Look for a subject-verb pair. Found one → does it start with a leaning word. Stands alone? → independent.' } },
        { type: 'case', nodeId: 'c7_gram_cbse_80_003', title: 'You made it',
          caseStudy: { intro: 'You finished A clause is a group of words with its own. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_gram_cbse_80_001', difficulty: 'standard',
          question: 'A clause is a group of words with its own subject and verb. An independent.',
          hint: 'Work step by step.',
          misconception: 'Students call any long word-group a clause — length is not the test, the subject-verb pair is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A clause is a group of words with its own subject and verb',
                  options: ['A clause is a group of words with its own subject and verb', 'Sentences multiply their verbs in two legal ways: a compound sentence joins two', 'Inside a sentence, nouns do different jobs: subject (does the action), object (receives'],
                  hint: 'Recall the definition.',
                  misconception: 'Students call any long word-group a clause — length is not the test, the subject-verb pair is.' }
          ],
            remediations: { 'students-call-any-long-word': { steps: ['Look for a subject-verb pair. None → phrase.', 'Found one → does it start with a leaning word (because/when/if/although/who/which)? → dependent clause.', 'Stands alone? → independent.'] } } },
        { type: 'subpart', nodeId: 'c7_gram_cbse_80_002', difficulty: 'standard',
          question: 'Sentences multiply their verbs in two legal ways: a compound sentence joins two.',
          hint: 'Work step by step.',
          misconception: 'Students classify by clause count — any two-clause sentence becomes \'complex\' to them, missing that the JOINER type.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sentences multiply their verbs in two legal ways: a compound sentence joins two',
                  options: ['Sentences multiply their verbs in two legal ways: a compound sentence joins two', 'A clause is a group of words with its own subject and verb', 'Inside a sentence, nouns do different jobs: subject (does the action), object (receives'],
                  hint: 'Recall the definition.',
                  misconception: 'Students classify by clause count — any two-clause sentence becomes \'complex\' to them, missing that the JOINER type is the actual.' }
          ],
            remediations: { 'students-classify-by-clause-count': { steps: ['Count the clauses.', 'Find the joiner.', 'Coordinator → compound; subordinator → complex.', 'If two clauses with NO joiner — that is an error (comma splice), not a type.'] } } },
        { type: 'subpart', nodeId: 'c7_gram_cbse_80_003', difficulty: 'standard',
          question: 'Inside a sentence, nouns do different jobs: subject (does the action), object.',
          hint: 'Work step by step.',
          misconception: 'Students call every word after the verb \'the object\' — including complements after is/was/seem.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Inside a sentence, nouns do different jobs: subject (does the action), object (receives',
                  options: ['Inside a sentence, nouns do different jobs: subject (does the action), object (receives', 'A clause is a group of words with its own subject and verb', 'Sentences multiply their verbs in two legal ways: a compound sentence joins two'],
                  hint: 'Recall the definition.',
                  misconception: 'Students call every word after the verb \'the object\' — including complements after is/was/seem.' }
          ],
            remediations: { 'students-call-every-word-after': { steps: ['Find the verb.', '\'Who/what + verb\' = subject.', 'Action verb → \'verb + what/whom\' = object. Being verb → what follows renames the subject = complement, not object.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
