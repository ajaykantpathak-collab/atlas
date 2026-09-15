import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch08_p1: SimDef = {
    id: 'v3_c10_engl_ch08_p1',
    title: 'The Sermon at Benares · Part 1/2',
    subtitle: 'Walk from a prince\'s palace to a mother\'s unbearable lesson',
    classLevel: 10, subject: 'engl', topic: 'The Sermon at Benares · Part 1/2',
    chapters: ['c10_engl_ch08'],
    nodeIds: ['c10_engl_cbse_08_001', 'c10_engl_cbse_08_002', 'c10_engl_cbse_08_003', 'c10_engl_cbse_08_004', 'c10_engl_cbse_08_005', 'c10_engl_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a student of Buddha decoding a 2,500-year-old teaching', intro: 'A sheltered prince sees an old man, a sick man, a corpse and a monk — and abandons a kingdom. Years later, a grieving mother brings him her impossible request.', goal: 'Sequence the Buddha\'s transformation and interpret the mustard-seed parable as a lesson in universal mortality.' },
    discovery: {
        question: 'Kisa Gotami carries her dead son door to door begging for medicine. The neighbours say she\'s lost her senses. Are they being cruel — or seeing something she can\'t?',
        options: ['They\'re seeing grief\'s blindness — her love is so total it overrides the plain fact that he\'s gone', 'They\'re cruel — a good neighbour would search for the medicine with her', 'Neither — they simply didn\'t have any medicine to give', 'They\'re afraid — her grief might be contagious'],
        answer: 'They\'re seeing grief\'s blindness — her love is so total it overrides the plain fact that he\'s gone',
        hook: 'The parable doesn\'t mock her — it honours her. Buddha\'s cure isn\'t medicine for the boy; it\'s a lesson that lets a shattered mother finally set him down.',
    },
    teaching: [
        { title: 'Gautama Buddha: From Prince Siddhartha to the Enlightened One', text: 'The life journey of Prince Siddhartha Gautama — from his sheltered royal upbringing, through the Four Sights (old age, sickness, death, and an ascetic), his renunciation of palace life, years.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Siddhartha\'s road from palace to the Bodhi tree — and don\'t mix up the Four Sights with the Four Noble Truths — then follow Kisa Gotami\'s mustard-seed journey.',
        labels: ['Gautama Buddha: From Prince', 'Kisa Gotami\'s Grief', 'Buddha\'s Test: Finding Mustard', 'Kisa Gotami\'s Realisation: Death', 'The Sermon: The Nature', 'Theme: Impermanence of Life'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_001', title: 'Gautama Buddha: From Prince Siddhartha to the Enlightened One',
          caseStudy: { intro: 'Imagine you see an elderly person struggling to cross a busy Delhi street, then a child coughing violently in a hospital queue, then a funeral procession.',
            decisions: [{ prompt: 'Name the Four Sights that Prince Siddhartha encountered during his chariot rides outside Kapilavastu, and state the specific realization.', options: [
                { text: 'The Four Sights are: (1) an old man', outcome: 'The Four Sights are: (1) an old man — realization that youth and beauty are impermanent; (2).' },
                { text: 'poverty', outcome: 'Not quite — Students often conflate the "Four Sights" (old age, sickness, death, ascetic) with the "Four Noble.', reveals: 'students-often-conflate-the-four' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_002', title: 'Kisa Gotami\'s Grief: The Death of Her Only Son',
          caseStudy: { intro: 'Imagine you lose your phone with all your photos, contacts, and memories — you\'d frantically search every room, retrace every step, maybe even ask strangers.',
            decisions: [{ prompt: 'What specific action does Kisa Gotami take immediately after her son dies that shows she is in denial of his death?', options: [
                { text: 'She carries her dead son\'s body from house to house asking for medicine to cure him', outcome: 'She carries her dead son\'s body from house to house asking for medicine to cure him.' },
                { text: 'foolish', outcome: 'Not quite — Students think Kisa Gotami is "foolish" or "superstitious" for seeking medicine for a dead child.', reveals: 'kisa-gotami-is-foolish-or' },
                { text: 'superstitious', outcome: 'Not quite — Students think Kisa Gotami is "foolish" or "superstitious" for seeking medicine for a dead child.', reveals: 'kisa-gotami-is-foolish-or' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_003', title: 'Buddha\'s Test: Finding Mustard Seeds from a House Where No One Has Died',
          caseStudy: { intro: 'Imagine you lose something precious and someone tells you "everyone loses things" — it feels hollow.',
            decisions: [{ prompt: 'What exact condition does Buddha place on the mustard seeds Kisa Gotami must fetch?', options: [
                { text: 'The seeds must come from a house where no one has ever died', outcome: 'The seeds must come from a house where no one has ever died. A wrong answer (e.g., "any mustard.' },
                { text: 'any mustard seeds', outcome: 'Not quite — Students often think Buddha\'s test is a magical ritual where the mustard seeds themselves have.', reveals: 'buddha-s-test-is-a' },
                { text: 'seeds from a holy house', outcome: 'Not quite — Students often think Buddha\'s test is a magical ritual where the mustard seeds themselves have.', reveals: 'buddha-s-test-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_004', title: 'Kisa Gotami\'s Realisation: Death is Universal and Inevitable',
          caseStudy: { intro: 'Imagine you have lost someone dear and you believe your pain is unique — that the universe has singled you out.',
            decisions: [{ prompt: 'What specific task does the Buddha give Kisa Gotami, and what is the condition attached to it?', options: [
                { text: 'The Buddha asks Kisa Gotami to bring a handful of mustard seeds from a house where no one', outcome: 'The Buddha asks Kisa Gotami to bring a handful of mustard seeds from a house where no one has ever.' },
                { text: 'he asks her to meditate', outcome: 'Not quite — Students believe Kisa Gotami\'s realisation is *sudden* — a lightning-bolt moment at the last house.', reveals: 'kisa-gotami-s-realisation-is' },
                { text: 'he gives her a sermon', outcome: 'Not quite — Students believe Kisa Gotami\'s realisation is *sudden* — a lightning-bolt moment at the last house.', reveals: 'kisa-gotami-s-realisation-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_005', title: 'The Sermon: The Nature of Mortality and the Futility of Grief',
          caseStudy: { intro: 'Imagine you have just lost a beloved grandparent and a well-meaning relative says, "Don\'t cry, everyone dies." It feels dismissive.',
            decisions: [{ prompt: 'What is the core message Buddha conveys in his sermon at Benares about death and grief?', options: [
                { text: 'The core message is that death is universal and inevitable for every living being, and', outcome: 'The core message is that death is universal and inevitable for every living being, and that grief.' },
                { text: 'Buddha says we should not feel sad', outcome: 'Not quite — Students often believe Buddha\'s sermon teaches that *feeling* grief is wrong or that one should.', reveals: 'buddha-s-sermon-teaches-that' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate\'s grandfather dies, and weeks later she is still inconsolable, saying, \'Why did this happen to my family? It\'s not fair.\' Friends have run out of comforting words.',
            decisions: [{ prompt: 'What does the Buddha\'s teaching in \'The Sermon at Benares\' offer her?', options: [
                { text: 'The lesson Kisa Gotami learned when told to fetch mustard seed from a house untouched by death: grief feels uniquely unjust until you discover that every household has buried someone. Mortality is the one certainty all living beings share — accepting that does not erase love, but it loosens the feeling of being singled out, which is what keeps grief stuck.', outcome: 'The sermon does not say \'do not grieve\' — it says sorrow only multiplies when we fight the fact of death itself; peace begins with accepting what cannot be changed.' },
                { text: 'That she should hide her grief completely, because mourning openly is a weakness the Buddha condemned.', outcome: 'The sermon never calls grief weakness — Kisa Gotami\'s grief was honoured; what the Buddha addressed was the refusal to accept death\'s universality.', reveals: 'grief-is-weakness' },
                { text: 'That death only feels unfair because her family was unlucky — most families never actually face it.', outcome: 'The sermon\'s whole point is the opposite: there is no house where death has not entered; believing one\'s own loss is unique is precisely the illusion the teaching removes.', reveals: 'death-is-rare-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every door she knocked had buried someone. That\'s the sermon without words: grief is universal, and accepting impermanence is the only medicine that exists.',
            decisions: [{ prompt: 'What comes next? The Sermon at Benares · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Sermon at Benares · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_001', difficulty: 'standard',
          question: 'The life journey of Prince Siddhartha Gautama — from his sheltered royal.',
          hint: 'Review Class 9 "How I Taught My Grandmother to Read" (c9_engl_ch1_2, c9_engl_ch1_4).',
          misconception: 'Students often conflate the "Four Sights" (old age, sickness, death, ascetic) with the "Four Noble Truths" (suffering.',
          parts: [
                { id: 'a', prompt: 'Name the Four Sights that Prince Siddhartha encountered during his chariot rides outside Kapilavastu, and state the specific realization each sight triggered.', answer: 'The Four Sights are: (1) an old man',
                  options: ['The Four Sights are: (1) an old man', 'poverty'],
                  hint: 'Review Class 9 "How I Taught My Grandmother to Read" (c9_engl_ch1_2, c9_engl_ch1_4) — identify the.',
                  misconception: 'Students often conflate the "Four Sights" (old age, sickness, death, ascetic) with the "Four Noble Truths" (suffering, origin, cessation.' }
          ],
            remediations: { 'students-often-conflate-the-four': { steps: ['Make a two-column flashcard: LEFT column "Four Sights (Events Witnessed)" — right column "Four Noble Truths (Doctrines.', 'Verbally rehearse: "Sights are what he SAW with eyes; Truths are what he UNDERSTOOD with wisdom."', 'Practice a 30-second oral explanation to a peer: "The Sights are the diagnosis; the Truths are the prescription."', 'Attempt a past board question: "What were the Four Sights? How did they change Siddhartha?" — self-check against the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate the "Four Sights" (old age, sickness, death, ascetic) with the "Four Noble Truths" (suffering.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Buddha\'s enlightenment was a purely personal mystical experience with no relevance to the suffering of ordinary people like Kisa.', answer: 'The statement is false',
                  options: ['The statement is false', 'history'],
                  hint: 'Review Class 9 "How I Taught My Grandmother to Read" (c9_engl_ch1_2, c9_engl_ch1_4) — identify the.',
                  misconception: 'Students often conflate the "Four Sights" (old age, sickness, death, ascetic) with the "Four Noble Truths" (suffering, origin, cessation.' }
          ],
            remediations: { 'students-often-conflate-the-four': { steps: ['Make a two-column flashcard: LEFT column "Four Sights (Events Witnessed)" — right column "Four Noble Truths (Doctrines.', 'Verbally rehearse: "Sights are what he SAW with eyes; Truths are what he UNDERSTOOD with wisdom."', 'Practice a 30-second oral explanation to a peer: "The Sights are the diagnosis; the Truths are the prescription."', 'Attempt a past board question: "What were the Four Sights? How did they change Siddhartha?" — self-check against the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_002', difficulty: 'standard',
          question: 'Kisa Gotami\'s grief refers to the intense, all-consuming sorrow of a young.',
          hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) — it teaches tracking character.',
          misconception: 'Students think Kisa Gotami is "foolish" or "superstitious" for seeking medicine for a dead child — they miss that her.',
          parts: [
                { id: 'a', prompt: 'Why do the villagers say "She has lost her senses" instead of offering sympathy or medicine? What does this reaction reveal about their understanding of death?', answer: 'The villagers recognize the finality of death',
                  options: ['The villagers recognize the finality of death', 'foolish', 'superstitious'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) — it teaches tracking character through.',
                  misconception: 'Students think Kisa Gotami is "foolish" or "superstitious" for seeking medicine for a dead child — they miss that her action stems from.' },
                { id: 'b', prompt: 'Apply the concept of "textual evidence" — find ONE phrase from the story that shows Kisa Gotami\'s love for her son BEFORE his death, and explain how that love.', answer: '"Her only son" (or "only child")',
                  options: ['"Her only son" (or "only child")', 'foolish', 'superstitious'],
                  hint: 'Review "Character Analysis: Suraj" (c6_english_u4_032) — it teaches tracking character through.',
                  misconception: 'Students think Kisa Gotami is "foolish" or "superstitious" for seeking medicine for a dead child — they miss that her action stems from.' }
          ],
            remediations: { 'kisa-gotami-is-foolish-or': { steps: ['Ask the student: "If your younger sibling died, would you accept it instantly?" 2.', 'Read the specific lines where she carries the body — have them underline verbs (carried, went, asked).', 'Contrast with villagers\' dialogue — role-play both perspectives.', 'Write one paragraph: "Her love made her blind to death, not her ignorance." This reframes the action as human, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_003', difficulty: 'standard',
          question: 'Buddha\'s test is a pedagogical device in which the Buddha instructs the.',
          hint: 'Review c10_engl_cbse_08_002 — specifically the description of Kisa Gotami carrying the.',
          misconception: 'Students often think Buddha\'s test is a magical ritual where the mustard seeds themselves have healing power, or that.',
          parts: [
                { id: 'a', prompt: 'What exact condition does Buddha place on the mustard seeds Kisa Gotami must fetch?', answer: 'The seeds must come from a house where no one has ever died',
                  options: ['The seeds must come from a house where no one has ever died', 'any mustard seeds', 'seeds from a holy house'],
                  hint: 'Review c10_engl_cbse_08_002 — specifically the description of Kisa Gotami carrying the dead child.',
                  misconception: 'Students often think Buddha\'s test is a magical ritual where the mustard seeds themselves have healing power, or that Buddha is testing.' },
                { id: 'b', prompt: 'Why does Buddha choose mustard seeds specifically, rather than gold, rice, or a rare herb?', answer: 'Mustard seeds are tiny, ubiquitous, and found in every Indian kitchen',
                  options: ['Mustard seeds are tiny, ubiquitous, and found in every Indian kitchen', 'mustard seeds are sacred'],
                  hint: 'Review c10_engl_cbse_08_002 — specifically the description of Kisa Gotami carrying the dead child.',
                  misconception: 'Students often think Buddha\'s test is a magical ritual where the mustard seeds themselves have healing power, or that Buddha is testing.' }
          ],
            remediations: { 'buddha-s-test-is-a': { steps: ['Reread the passage where Buddha speaks: note he says "Go and bring me mustard seeds..." not "Find a deathless house." 2.', 'List every house Kisa visits and what each reports — see the pattern emerge.', 'Ask: "If the seeds had magic, why would the house condition matter?" 4.', 'Write one sentence distinguishing "test of character" from "experiment in perception."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_004', difficulty: 'standard',
          question: 'Kisa Gotami\'s realisation is the pivotal moment in the parable where, after.',
          hint: 'If stuck, review c10_engl_cbse_08_003 (the test design) and c9_engl_ch4_5 (aging.',
          misconception: 'Students believe Kisa Gotami\'s realisation is *sudden* — a lightning-bolt moment at the last house.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Buddha chooses a *task* rather than a *lecture* to teach Kisa Gotami about death.', answer: 'The Buddha uses a task',
                  options: ['The Buddha uses a task', 'Buddha was kind', 'lectures don\'t work', '— the realisation builds with each'],
                  hint: 'If stuck, review c10_engl_cbse_08_003 (the test design) and c9_engl_ch4_5 (aging as universal.',
                  misconception: 'Students believe Kisa Gotami\'s realisation is *sudden* — a lightning-bolt moment at the last house.' },
                { id: 'b', prompt: 'In the text, the narrator repeats the phrase "there was no house" multiple times.', answer: '**Point:** The repetition of "there was no house" creates a cumulative rhythm of',
                  options: ['**Point:** The repetition of "there was no house" creates a cumulative rhythm of', '— the realisation builds with each', 'Students write', 'Kisa Gotami\'s realisation is *sudden*'],
                  hint: 'If stuck, review c10_engl_cbse_08_003 (the test design) and c9_engl_ch4_5 (aging as universal.',
                  misconception: 'Students believe Kisa Gotami\'s realisation is *sudden* — a lightning-bolt moment at the last house.' }
          ],
            remediations: { 'kisa-gotami-s-realisation-is': { steps: ['Have the student re-read the search paragraph and highlight every instance of "house" and "no."', 'Ask them to count the highlighted words — they will see 6+ occurrences.', 'Have them write a timeline: House 1 → thought; House 3 → thought; House 6 → thought.', 'Guide them to articulate the *progression*: hope → doubt → pattern recognition → acceptance.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_005', difficulty: 'standard',
          question: 'The Sermon at Benares is Buddha\'s teaching to Kisa Gotami that death.',
          hint: 'Review the mustard seed test and Kisa Gotami\'s realisation (node 08_004).',
          misconception: 'Students often believe Buddha\'s sermon teaches that *feeling* grief is wrong or that one should become emotionless.',
          parts: [
                { id: 'a', prompt: 'A Class 10 student writes in an exam: "Buddha tells Kisa Gotami that grief is wrong because it makes us weak." Using the sermon, correct this statement in two.', answer: 'Buddha does not call grief morally wrong; he calls it futile',
                  options: ['Buddha does not call grief morally wrong; he calls it futile', 'do not grieve'],
                  hint: 'Review the mustard seed test and Kisa Gotami\'s realisation (node 08_004).',
                  misconception: 'Students often believe Buddha\'s sermon teaches that *feeling* grief is wrong or that one should become emotionless.' },
                { id: 'b', prompt: 'Compare Buddha\'s approach to grief in the sermon with the grandmother\'s attitude toward literacy in "How I Taught My Grandmother to Read" (Class 9).', answer: 'Buddha treats grief as an intellectual error',
                  options: ['Buddha treats grief as an intellectual error', 'both show determination'],
                  hint: 'Review the mustard seed test and Kisa Gotami\'s realisation (node 08_004).',
                  misconception: 'Students often believe Buddha\'s sermon teaches that *feeling* grief is wrong or that one should become emotionless.' }
          ],
            remediations: { 'buddha-s-sermon-teaches-that': { steps: ['Re-read the sermon highlighting every verb Buddha uses for grief (weep, grieve, lament, sorrow) — notice they are.', 'Draw a two-column table: "Pain of Loss" (physical sensation, tears) vs.', '"Lamentation" (thoughts like \'why me\', \'if only\').', 'Ask the student: "Which column does Buddha say we can control?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_08_006', difficulty: 'standard',
          question: 'The theme of impermanence (anicca) in "The Sermon at Benares" is the universal.',
          hint: 'If stuck, re-do the PEEL paragraph exercise from Class 9 (node c9_engl_ch1_4).',
          misconception: 'Students often write: "The theme is that death is inevitable, so we should not be sad." This reduces the sermon to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theme of impermanence (anicca) in "The Sermon at Benares" is the universal truth that',
                  options: ['The theme of impermanence (anicca) in "The Sermon at Benares" is the universal truth that', 'The life journey of Prince Siddhartha Gautama', 'Kisa Gotami\'s grief refers to the intense, all-consuming sorrow of a young mother who', 'Buddha\'s test is a pedagogical device in'],
                  hint: 'If stuck, re-do the PEEL paragraph exercise from Class 9 (node c9_engl_ch1_4) on "Literacy.',
                  misconception: 'Students often write: "The theme is that death is inevitable, so we should not be sad." This reduces the sermon to a platitude.' }
          ],
            remediations: { 'students-often-write-the-theme': { steps: ['**Re-read node c10_engl_cbse_08_005** focusing only on Buddha\'s exact words: underline every verb that indicates.', '**Create a two-column table**: Column A = "What Kisa Gotami *does* (actions)"; Column B = "What Kisa Gotami.', '**Write one PEEL paragraph** using only the verbs from Column B as your Point.', 'This forces the student to see peace as an *achieved insight*, not a passive resignation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
