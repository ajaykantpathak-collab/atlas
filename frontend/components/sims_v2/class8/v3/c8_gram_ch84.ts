import type { SimDef } from '../../engine/types';

/** v3 generated — c8_gram_ch84 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_gram_ch84: SimDef = {
    id: 'v3_c8_gram_ch84',
    title: 'Non-finite verbs don\'t carry tense or agree.',
    subtitle: 'Covers identification and function of the three non-finites. Does NOT cover the.',
    classLevel: 8, subject: 'gram', topic: 'Non-finite verbs don\'t carry tense or agree.',
    chapters: ['c8_gram_ch84'],
    nodeIds: ['c8_gram_cbse_84_001', 'c8_gram_cbse_84_002', 'c8_gram_ch84_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'Same word, different job: \'Swimming is fun\' — \'swimming\' is the subject, a thing = gerund.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'Non-finite verbs don\'t carry tense or.', text: 'Non-finite verbs don\'t carry tense or agree with subjects — they are verb-forms doing other jobs: infinitives (to go) act as nouns, gerunds (going) act as nouns, participles (going/gone) act.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c8_gram_ch84_003', title: 'Verb complementation is lexically.',
          caseStudy: { intro: '1. Learn the gerund-only list: enjoy, avoid, finish, mind, suggest, keep, practise, admit. 2.',
            decisions: [{ prompt: '\'I enjoy ___ (to read/reading) novels.\'', options: [
                { text: '\'reading\' — \'enjoy\' takes the gerund', outcome: '\'reading\' — \'enjoy\' takes the gerund.' },
                { text: 'gerund/infinitive is a free choice or a tense choice', outcome: 'Not quite — Students think gerund/infinitive is a free choice or a tense choice.', reveals: 'gerund-infinitive-is-a-free' }
            ] }] } },
        { type: 'case', nodeId: 'c8_gram_ch84_003', title: 'Verb complementation is lexically.',
          caseStudy: { intro: '1. Learn the gerund-only list: enjoy, avoid, finish, mind, suggest, keep, practise, admit. 2.',
            decisions: [{ prompt: '\'I enjoy ___ (to read/reading) novels.\'', options: [
                { text: '\'reading\' — \'enjoy\' takes the gerund', outcome: '\'reading\' — \'enjoy\' takes the gerund.' },
                { text: 'gerund/infinitive is a free choice or a tense choice', outcome: 'Not quite — Students think gerund/infinitive is a free choice or a tense choice.', reveals: 'gerund-infinitive-is-a-free' }
            ] }] } },
        { type: 'dissect', nodeId: 'c8_gram_cbse_84_002', title: 'Identify each idea',
          dissect: { specimen: 'Non-finite verbs don\'t carry tense or agree.', spots: [
            { id: 's1', label: 'Non-finite verbs dont carry tense', prompt: 'Which idea is this? — Non-finite verbs don\'t carry tense or agree with subjects — they are verb-forms doing.', answer: 'Non-finite verbs dont carry tense', options: ['Non-finite verbs dont carry tense', 'Some verbs insist on gerunds', 'Verb complementation is lexically fixed'] },
            { id: 's2', label: 'Some verbs insist on gerunds', prompt: 'Which idea is this? — Some verbs insist on gerunds (enjoy, avoid, finish, mind, suggest), some insist.', answer: 'Some verbs insist on gerunds', options: ['Some verbs insist on gerunds', 'Non-finite verbs dont carry tense', 'Verb complementation is lexically fixed'] },
            { id: 's3', label: 'Verb complementation is lexically fixed', prompt: 'Which idea is this? — Verb complementation is lexically fixed: certain verbs take only gerunds (enjoy, avoid.', answer: 'Verb complementation is lexically fixed', options: ['Verb complementation is lexically fixed', 'Non-finite verbs dont carry tense', 'Some verbs insist on gerunds'] }
          ] } },
        { type: 'case', nodeId: 'c8_gram_ch84_003', title: 'You made it',
          caseStudy: { intro: 'You finished Non-finite verbs don\'t carry tense or agree. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c8_gram_cbse_84_001', difficulty: 'standard',
          question: 'Non-finite verbs don\'t carry tense or agree with subjects — they are verb-forms.',
          hint: 'Work step by step.',
          misconception: 'Students classify by word-shape — every -ing becomes \'present participle\' to them — missing that gerund vs participle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Non-finite verbs don\'t carry tense or agree with subjects',
                  options: ['Non-finite verbs don\'t carry tense or agree with subjects', 'Some verbs insist on gerunds (enjoy, avoid, finish, mind, suggest), some insist on', 'Verb complementation is lexically fixed: certain verbs take only gerunds (enjoy, avoid,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students classify by word-shape — every -ing becomes \'present participle\' to them — missing that gerund vs participle is decided.' }
          ],
            remediations: { 'students-classify-by-word-shape': { steps: ['Spot the verb-form (to+V, V-ing, V3/en).', 'Ask its job — naming a thing/idea → gerund or infinitive; describing a noun → participle.', '\'to\' + base = infinitive; V-ing as noun = gerund.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_cbse_84_002', difficulty: 'standard',
          question: 'Some verbs insist on gerunds (enjoy, avoid, finish, mind, suggest), some insist.',
          hint: 'Work step by step.',
          misconception: 'Students use infinitives everywhere (\'enjoy to swim\'), never learn the preference lists, and miss the time-direction.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Some verbs insist on gerunds (enjoy, avoid, finish, mind, suggest), some insist on',
                  options: ['Some verbs insist on gerunds (enjoy, avoid, finish, mind, suggest), some insist on', 'Non-finite verbs don\'t carry tense or agree with subjects', 'Verb complementation is lexically fixed: certain verbs take only gerunds (enjoy, avoid,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use infinitives everywhere (\'enjoy to swim\'), never learn the preference lists, and miss the time-direction logic in flip-verbs.' }
          ],
            remediations: { 'students-use-infinitives-everywhere-enjoy': { steps: ['Learn the two lists — enjoy/avoid/finish/mind/suggest + gerund; want/decide/promise/learn/agree + infinitive.', 'For stop/remember/try, ask time-direction — gerund looks back/at the act, infinitive looks forward to purpose.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch84_003', difficulty: 'standard',
          question: 'Verb complementation is lexically fixed: certain verbs take only gerunds.',
          hint: 'Work step by step.',
          misconception: 'Students think gerund/infinitive is a free choice or a tense choice.',
          parts: [
                { id: 'a', prompt: '\'I enjoy ___ (to read/reading) novels.\'', answer: '\'reading\' — \'enjoy\' takes the gerund',
                  options: ['\'reading\' — \'enjoy\' takes the gerund', 'gerund/infinitive is a free choice or a tense choice'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think gerund/infinitive is a free choice or a tense choice.' },
                { id: 'b', prompt: '\'She promised ___ (to help/helping) me.\'', answer: '\'to help\' — \'promise\' takes the infinitive',
                  options: ['\'to help\' — \'promise\' takes the infinitive', 'gerund/infinitive is a free choice or a tense choice'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think gerund/infinitive is a free choice or a tense choice.' },
                { id: 'c', prompt: 'What is the difference: \'He stopped smoking\' vs \'He stopped to smoke\'?', answer: '\'stopped smoking\' = quit the habit',
                  options: ['\'stopped smoking\' = quit the habit', 'gerund/infinitive is a free choice or a tense choice'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think gerund/infinitive is a free choice or a tense choice.' },
                { id: 'd', prompt: 'Which verbs take gerunds only — name three.', answer: 'enjoy, avoid, finish, mind, suggest, keep, practise (any three)',
                  options: ['enjoy, avoid, finish, mind, suggest, keep, practise (any three)', 'gerund/infinitive is a free choice or a tense choice'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think gerund/infinitive is a free choice or a tense choice.' }
          ],
            remediations: { 'gerund-infinitive-is-a-free': { steps: ['Identify the governing verb first, then check which list it lives on: gerund-only (enjoy, avoid, finish, mind.'] } } },
        { type: 'subpart', nodeId: 'c8_gram_ch84_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think gerund/infinitive is a free choice or a tense choice.',
          parts: [
                { id: 'a', prompt: '\'I remembered to lock the door\' vs \'I remember locking the door\' — which recalls a memory?', answer: '\'I remember locking the door\'',
                  options: ['\'I remember locking the door\'', 'gerund/infinitive is a free choice or a tense choice'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think gerund/infinitive is a free choice or a tense choice.' }
          ],
            remediations: { 'gerund-infinitive-is-a-free': { steps: ['Identify the governing verb first, then check which list it lives on: gerund-only (enjoy, avoid, finish, mind.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
