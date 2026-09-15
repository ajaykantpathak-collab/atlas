import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch08_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch08_p2: SimDef = {
    id: 'v3_c10_engl_ch08_p2',
    title: 'The Sermon at Benares · Part 2/2',
    subtitle: 'Walk from a prince\'s palace to a mother\'s unbearable lesson',
    classLevel: 10, subject: 'engl', topic: 'The Sermon at Benares · Part 2/2',
    chapters: ['c10_engl_ch08'],
    nodeIds: ['c10_engl_cbse_08_007', 'c10_engl_cbse_08_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a student of Buddha decoding a 2,500-year-old teaching', intro: 'A sheltered prince sees an old man, a sick man, a corpse and a monk — and abandons a kingdom. Years later, a grieving mother brings him her impossible request.', goal: 'Sequence the Buddha\'s transformation and interpret the mustard-seed parable as a lesson in universal mortality.' },
    discovery: {
        question: 'Kisa Gotami carries her dead son door to door begging for medicine. The neighbours say she\'s lost her senses. Are they being cruel — or seeing something she can\'t?',
        options: ['They\'re seeing grief\'s blindness — her love is so total it overrides the plain fact that he\'s gone', 'They\'re cruel — a good neighbour would search for the medicine with her', 'Neither — they simply didn\'t have any medicine to give', 'They\'re afraid — her grief might be contagious'],
        answer: 'They\'re seeing grief\'s blindness — her love is so total it overrides the plain fact that he\'s gone',
        hook: 'The parable doesn\'t mock her — it honours her. Buddha\'s cure isn\'t medicine for the boy; it\'s a lesson that lets a shattered mother finally set him down.',
    },
    teaching: [
        { title: 'Buddhist Philosophy: The Four Sights and the Quest for Enlightenment', text: 'The Four Sights (Chaturvidha Darshana) are the four encounters — an old man, a sick man, a corpse, and a wandering ascetic — that Prince Siddhartha witnessed outside his palace, which shattered his.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Siddhartha\'s road from palace to the Bodhi tree — and don\'t mix up the Four Sights with the Four Noble Truths — then follow Kisa Gotami\'s mustard-seed journey.',
        labels: ['Buddhist Philosophy: The Four', 'Narrative Structure: Parable as'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_007', title: 'Buddhist Philosophy: The Four Sights and the Quest for Enlightenment',
          caseStudy: { intro: 'Imagine you are a Class 10 student who has never experienced serious loss — then one day you see your grandparent struggle to walk, a neighbour bedridden with.',
            decisions: [{ prompt: 'What are the Four Sights that Prince Siddhartha encountered, in the correct order?', options: [
                { text: 'The Four Sights in order are: 1) an old man, 2) a sick man, 3) a corpse (dead body), 4) a', outcome: 'The Four Sights in order are: 1) an old man, 2) a sick man, 3) a corpse (dead body), 4) a wandering.' },
                { text: 'This error arises', outcome: 'Not quite — Students often confuse the Four Sights with the Four Noble Truths, writing "The Four Sights are.', reveals: 'students-often-confuse-the-four' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_008', title: 'Narrative Structure: Parable as a Teaching Tool',
          caseStudy: { intro: 'Imagine you are trying to convince a younger sibling that "sharing is caring" — you wouldn\'t just say the words; you\'d tell a quick story about two kids and.',
            decisions: [{ prompt: 'What is the defining structural difference between a parable and a fable?', options: [
                { text: 'A parable uses human characters in realistic situations to convey a moral/spiritual', outcome: 'A parable uses human characters in realistic situations to convey a moral/spiritual truth, while.' },
                { text: 'both use animals', outcome: 'Not quite — Students treat the mustard-seed episode as a mere "test of faith" or "miracle story" and write.', reveals: 'students-treat-the-mustard-seed' },
                { text: 'fables are longer', outcome: 'Not quite — Students treat the mustard-seed episode as a mere "test of faith" or "miracle story" and write.', reveals: 'students-treat-the-mustard-seed' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s grandfather dies, and weeks later she is still inconsolable, saying, \'Why did this happen to my family? It\'s not fair.\' Friends have run out of comforting words.',
            decisions: [{ prompt: 'What does the Buddha\'s teaching in \'The Sermon at Benares\' offer her?', options: [
                { text: 'The lesson Kisa Gotami learned when told to fetch mustard seed from a house untouched by death: grief feels uniquely unjust until you discover that every household has buried someone. Mortality is the one certainty all living beings share — accepting that does not erase love, but it loosens the feeling of being singled out, which is what keeps grief stuck.', outcome: 'The sermon does not say \'do not grieve\' — it says sorrow only multiplies when we fight the fact of death itself; peace begins with accepting what cannot be changed.' },
                { text: 'That she should hide her grief completely, because mourning openly is a weakness the Buddha condemned.', outcome: 'The sermon never calls grief weakness — Kisa Gotami\'s grief was honoured; what the Buddha addressed was the refusal to accept death\'s universality.', reveals: 'grief-is-weakness' },
                { text: 'That death only feels unfair because her family was unlucky — most families never actually face it.', outcome: 'The sermon\'s whole point is the opposite: there is no house where death has not entered; believing one\'s own loss is unique is precisely the illusion the teaching removes.', reveals: 'death-is-rare-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_008', title: 'You made it',
          caseStudy: { intro: 'Every door she knocked had buried someone. That\'s the sermon without words: grief is universal, and accepting impermanence is the only medicine that exists.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_007', difficulty: 'standard',
          question: 'The Four Sights (Chaturvidha Darshana) are the four encounters — an old man,.',
          hint: 'If stuck, review the distinction between "biographical events" (Four Sights) and.',
          misconception: 'Students often confuse the Four Sights with the Four Noble Truths, writing "The Four Sights are: suffering, cause.',
          parts: [
                { id: 'a', prompt: 'A Class 10 student writes: "The Four Sights are just four sad things Buddha saw.', answer: 'The Four Sights are the *origin* of Buddha’s quest',
                  options: ['The Four Sights are the *origin* of Buddha’s quest', 'This error arises'],
                  hint: 'If stuck, review the distinction between "biographical events" (Four Sights) and "doctrinal.',
                  misconception: 'Students often confuse the Four Sights with the Four Noble Truths, writing "The Four Sights are: suffering, cause of suffering, end.' }
          ],
            remediations: { 'students-often-confuse-the-four': { steps: ['Have the student draw a two-column table: left column "Four Sights (Events in Siddhartha’s life)", right column "Four.', 'Fill left column with the four encounters (old man, sick man, corpse, ascetic) and right column with the four truths.', 'Ask: "Which column comes first in time? Which column is the *result* of the other?"', 'Practice writing one sentence that links them: "The Four Sights confronted Siddhartha with dukkha; his enlightenment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the Four Sights with the Four Noble Truths, writing "The Four Sights are: suffering, cause.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Four Sights are a literary device invented by later Buddhist writers; they have no historical basis and therefore no relevance to the.', answer: 'Refute',
                  options: ['Refute', 'This error arises'],
                  hint: 'If stuck, review the distinction between "biographical events" (Four Sights) and "doctrinal.',
                  misconception: 'Students often confuse the Four Sights with the Four Noble Truths, writing "The Four Sights are: suffering, cause of suffering, end.' }
          ],
            remediations: { 'students-often-confuse-the-four': { steps: ['Have the student draw a two-column table: left column "Four Sights (Events in Siddhartha’s life)", right column "Four.', 'Fill left column with the four encounters (old man, sick man, corpse, ascetic) and right column with the four truths.', 'Ask: "Which column comes first in time? Which column is the *result* of the other?"', 'Practice writing one sentence that links them: "The Four Sights confronted Siddhartha with dukkha; his enlightenment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_008', difficulty: 'standard',
          question: 'A parable is a brief, didactic narrative that uses a simple, relatable story.',
          hint: 'Review "Plot and Setting" (c6_english_u1_001) and "Narrative Poetry and Its Features".',
          misconception: 'Students treat the mustard-seed episode as a mere "test of faith" or "miracle story" and write answers like "Buddha.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A parable is a brief, didactic narrative that uses a simple, relatable story with human',
                  options: ['A parable is a brief, didactic narrative that uses a simple, relatable story with human', 'The life journey of Prince Siddhartha Gautama', 'Kisa Gotami\'s grief refers to the intense, all-consuming sorrow of a young mother who', 'Buddha\'s test is a pedagogical device in'],
                  hint: 'Review "Plot and Setting" (c6_english_u1_001) and "Narrative Poetry and Its Features".',
                  misconception: 'Students treat the mustard-seed episode as a mere "test of faith" or "miracle story" and write answers like "Buddha tested Kisa Gotami\'s.' }
          ],
            remediations: { 'students-treat-the-mustard-seed': { steps: ['Ask the student to retell the story in three sentences: beginning, middle, end.', 'Label each sentence: Situation, Crisis, Resolution.', 'For each stage, ask: "What does the *reader* learn here that Kisa Gotami learns?" 4.', 'Show a fable (e.g., "The Tortoise and the Hare") and a parable side-by-side; have the student list differences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
