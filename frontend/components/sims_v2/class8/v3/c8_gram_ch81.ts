import type { SimDef } from '../../engine/types';

/** v3 generated — c8_gram_ch81 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_gram_ch81: SimDef = {
    id: 'v3_c8_gram_ch81',
    title: 'Passive voice flips the spotlight: the object.',
    subtitle: 'Covers standard transitive conversion in simple, continuous, perfect tenses.',
    classLevel: 8, subject: 'gram', topic: 'Passive voice flips the spotlight: the object.',
    chapters: ['c8_gram_ch81'],
    nodeIds: ['c8_gram_cbse_81_001', 'c8_gram_cbse_81_002', 'c8_gram_ch81_003', 'c8_gram_ch81_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'The surgery in three cuts: (1) object walks to subject position; (2) verb → be + V3 where \'be\' carries BOTH.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Passive voice flips the spotlight: the.', text: 'Passive voice flips the spotlight: the object becomes the subject, the verb becomes be + V3, and the doer moves to \'by…\' or disappears.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c8_gram_ch81_004', title: 'Choosing between active and passive is.',
          caseStudy: { intro: '1. Every passive must have an object to front — \'The baby slept\' has none, so no passive exists. 2. Ask what the sentence spotlights: the result or the doer.',
            decisions: [{ prompt: 'Why does \'My wallet was stolen\' prefer passive?', options: [
                { text: 'The doer is unknown', outcome: 'The doer is unknown — passive drops the agent gracefully instead of inventing \'Someone…\'.' },
                { text: 'passive is \'fancy\' and convert everything, or think active is \'wrong\'', outcome: 'Not quite — Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.', reveals: 'passive-is-fancy-and-convert' }
            ] }] } },
        { type: 'case', nodeId: 'c8_gram_ch81_004', title: 'Choosing between active and passive is.',
          caseStudy: { intro: '1. Every passive must have an object to front — \'The baby slept\' has none, so no passive exists. 2. Ask what the sentence spotlights: the result or the doer.',
            decisions: [{ prompt: 'Why does \'My wallet was stolen\' prefer passive?', options: [
                { text: 'The doer is unknown', outcome: 'The doer is unknown — passive drops the agent gracefully instead of inventing \'Someone…\'.' },
                { text: 'passive is \'fancy\' and convert everything, or think active is \'wrong\'', outcome: 'Not quite — Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.', reveals: 'passive-is-fancy-and-convert' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_81_002', title: 'Identify each idea',
          dissect: { specimen: 'Passive voice flips the spotlight: the object.', spots: [
            { id: 's1', label: 'Passive voice flips the spotlight', prompt: 'Which idea is this? — Passive voice flips the spotlight: the object becomes the subject, the verb becomes.', answer: 'Passive voice flips the spotlight', options: ['Passive voice flips the spotlight', 'Some verbs cannot go passive', 'The active-to-passive transformation follows fixed', 'Choosing between active and passive'] },
            { id: 's2', label: 'Some verbs cannot go passive', prompt: 'Which idea is this? — Some verbs cannot go passive and some sentences should not: intransitive verbs (sleep.', answer: 'Some verbs cannot go passive', options: ['Some verbs cannot go passive', 'Passive voice flips the spotlight', 'The active-to-passive transformation follows fixed', 'Choosing between active and passive'] },
            { id: 's3', label: 'The active-to-passive transformation follows fixed', prompt: 'Which idea is this? — The active-to-passive transformation follows fixed mechanics: (1) the active object.', answer: 'The active-to-passive transformation follows fixed', options: ['The active-to-passive transformation follows fixed', 'Passive voice flips the spotlight', 'Some verbs cannot go passive', 'Choosing between active and passive'] },
            { id: 's4', label: 'Choosing between active and passive', prompt: 'Which idea is this? — Choosing between active and passive is a meaning decision, not a style one: the passive.', answer: 'Choosing between active and passive', options: ['Choosing between active and passive', 'Passive voice flips the spotlight', 'Some verbs cannot go passive', 'The active-to-passive transformation follows fixed'] }
          ] } },
        { type: 'case', nodeId: 'c8_gram_ch81_004', title: 'You made it',
          caseStudy: { intro: 'You finished Passive voice flips the spotlight: the object. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_gram_cbse_81_001', difficulty: 'standard',
          question: 'Passive voice flips the spotlight: the object becomes the subject, the verb.',
          hint: 'Work step by step.',
          misconception: 'Students convert the participle but forget \'be\' (\'the letter written\'), let the tense drift (\'was stolen\' becomes \'is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Passive voice flips the spotlight: the object becomes the subject, the verb becomes be +',
                  options: ['Passive voice flips the spotlight: the object becomes the subject, the verb becomes be +', 'Some verbs cannot go passive and some sentences should not: intransitive verbs (sleep,', 'The active-to-passive transformation follows fixed mechanics: (1) the active object', 'Choosing between active and passive is a meaning decision, not a style one: the passive'],
                  hint: 'Recall the definition.',
                  misconception: 'Students convert the participle but forget \'be\' (\'the letter written\'), let the tense drift (\'was stolen\' becomes \'is stolen\'), or keep.' }
          ],
            remediations: { 'students-convert-the-participle-but': { steps: ['Object → subject.', 'Verb → be(tense, matching new subject) + V3.', 'Doer → \'by + agent\' only if it adds information — vague agents delete.', 'Sanity check — is the receiver the point?'] } } },
        { type: 'subpart', nodeId: 'c8_gram_cbse_81_002', difficulty: 'standard',
          question: 'Some verbs cannot go passive and some sentences should not: intransitive verbs.',
          hint: 'Work step by step.',
          misconception: 'Students passivize mechanically — including intransitives (\'was happened\', \'was slept\') — and flip sentences where the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Some verbs cannot go passive and some sentences should not: intransitive verbs (sleep,',
                  options: ['Some verbs cannot go passive and some sentences should not: intransitive verbs (sleep,', 'Passive voice flips the spotlight: the object becomes the subject, the verb becomes be +', 'The active-to-passive transformation follows fixed mechanics: (1) the active object', 'Choosing between active and passive is a meaning decision, not a style one: the passive'],
                  hint: 'Recall the definition.',
                  misconception: 'Students passivize mechanically — including intransitives (\'was happened\', \'was slept\') — and flip sentences where the doer carries the.' }
          ],
            remediations: { 'students-passivize-mechanically-including-intran': { steps: ['Find the object. No object → passive is illegal.', 'Ask what the sentence is ABOUT — if the doer is the point, stay active.', 'Formal/scientific contexts prefer passive (\'The experiment was conducted\').'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch81_003', difficulty: 'standard',
          question: 'The active-to-passive transformation follows fixed mechanics: (1) the active.',
          hint: 'Work step by step.',
          misconception: 'Students move the object to the front but keep the verb unchanged — \'The rat chased by the cat\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The active-to-passive transformation follows fixed mechanics: (1) the active object',
                  options: ['The active-to-passive transformation follows fixed mechanics: (1) the active object', 'Passive voice flips the spotlight: the object becomes the subject, the verb becomes be +', 'Some verbs cannot go passive and some sentences should not: intransitive verbs (sleep,', 'Choosing between active and passive is a meaning decision, not a style one: the passive'],
                  hint: 'Recall the definition.',
                  misconception: 'Students move the object to the front but keep the verb unchanged — \'The rat chased by the cat\'.' }
          ],
            remediations: { 'students-move-the-object-to': { steps: ['Run the three steps mechanically: front the object → rebuild the verb as tense-correct \'be + V3\' → attach or drop \'by\'.', 'Check the V3 form against your irregular-verb list.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch81_004', difficulty: 'standard',
          question: 'Choosing between active and passive is a meaning decision, not a style one: the.',
          hint: 'Work step by step.',
          misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.',
          parts: [
                { id: 'a', prompt: 'Why does \'My wallet was stolen\' prefer passive?', answer: 'The doer is unknown',
                  options: ['The doer is unknown', 'passive is \'fancy\' and convert everything, or think active is \'wrong\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.' },
                { id: 'b', prompt: 'Can \'The children slept soundly\' go passive? Why?', answer: 'No — \'slept\' is intransitive (no object), and passive needs an object to front',
                  options: ['No — \'slept\' is intransitive (no object), and passive needs an object to front', 'passive is \'fancy\' and convert everything, or think active is \'wrong\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.' },
                { id: 'c', prompt: 'Which sounds better and why: \'The results were announced yesterday\' or \'They announced the results yesterday\'?', answer: 'The passive — \'they\' is vague and unimportant',
                  options: ['The passive — \'they\' is vague and unimportant', 'passive is \'fancy\' and convert everything, or think active is \'wrong\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.' },
                { id: 'd', prompt: 'What does \'Mistakes were made\' hide that \'We made mistakes\' does not?', answer: 'Who made them — passive can deliberately background the responsible agent',
                  options: ['Who made them — passive can deliberately background the responsible agent', 'passive is \'fancy\' and convert everything, or think active is \'wrong\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.' }
          ],
            remediations: { 'passive-is-fancy-and-convert': { steps: ['Check two things: does the sentence even have an object (else no passive exists), and does the doer matter (else.', 'Only convert when the result outranks the agent.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch81_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.',
          parts: [
                { id: 'a', prompt: 'Name the three conditions where passive serves.', answer: 'Unknown doer, unimportant/obvious doer, or deliberate backgrounding of the agent',
                  options: ['Unknown doer, unimportant/obvious doer, or deliberate backgrounding of the agent', 'passive is \'fancy\' and convert everything, or think active is \'wrong\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think passive is \'fancy\' and convert everything, or think active is \'wrong\'.' }
          ],
            remediations: { 'passive-is-fancy-and-convert': { steps: ['Check two things: does the sentence even have an object (else no passive exists), and does the doer matter (else.', 'Only convert when the result outranks the agent.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
