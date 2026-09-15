import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch05_p3: SimDef = {
    id: 'v3_c11_eng_s_ch05_p3',
    title: 'The Tale of Melon City · Part 3/3',
    subtitle: 'Follow a law so rigid it executes its own king — and a people who accept a melon.',
    classLevel: 11, subject: 'eng_s', topic: 'The Tale of Melon City · Part 3/3',
    chapters: ['c11_eng_s_ch05'],
    nodeIds: ['c11_eng_s_cbse_05_013', 'c11_eng_s_cbse_05_014', 'c11_eng_s_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a satirist auditing a kingdom run by procedure', intro: 'An arch too low, a decree too absolute, a noose measured to fit — watch justice turn in a perfect circle.', goal: 'Analyse the poem\'s circular causal structure and the satirical work of its verse form.' },
    discovery: {
        question: 'A \'just and placid\' king orders an arch, blames everyone for its failure, and ends up hanged by his own decree. What mechanism delivers this absurdity?',
        options: ['Procedure obeyed to the letter — \'someone must be hanged\' and only his neck fits the arch\'s measure', 'A palace coup disguised as justice', 'The crowd\'s random fury', 'A prophecy that demanded a royal death'],
        answer: 'Procedure obeyed to the letter — \'someone must be hanged\' and only his neck fits the arch\'s measure',
        hook: 'The blame chain isn\'t random — each defence narrows the target until the king\'s own rule turns the noose on him.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s explicit and implicit meanings, evaluating the author\'s choices (structure, language, devices), and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace the blame chain from builders to king, check whether the poem opens in medias res, and weigh whether the melon on the throne is earned or arbitrary.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a judge reviewing a bizarre court case where a King orders an arch hanged, then gets hanged himself because he fits the noose, and the kingdom.',
            decisions: [{ prompt: 'Define "dramatic irony" and identify the *first* instance in the poem where the reader knows more about the consequences of the King\'s.', options: [
                { text: 'Dramatic irony occurs when the audience/reader possesses knowledge that a character', outcome: 'Dramatic irony occurs when the audience/reader possesses knowledge that a character lacks, creating.' },
                { text: 'justice', outcome: 'Not quite — Students often treat "The Tale of Melon City" as a simple "funny story with a silly ending,".', reveals: 'students-often-treat-the-tale' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and see the question: "Narrate \'The Tale of Melon City\' in your own words." Where do you begin?',
            decisions: [{ prompt: 'What does PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing in your own words" means avoiding all textual references.', reveals: 'writing-in-your-own-words' },
                { text: 'writing in your own words', outcome: 'Not quite — Students believe "writing in your own words" means avoiding all textual references.', reveals: 'writing-in-your-own-words' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a book club where everyone has read a satirical poem about a king who gets hanged by his own decree and is replaced by a melon.',
            decisions: [{ prompt: 'What is the central irony in the poem\'s resolution where a melon becomes king?', options: [
                { text: 'The central irony is that the king\'s obsession with "justice" leads to his own execution,', outcome: 'The central irony is that the king\'s obsession with "justice" leads to his own execution, and the.' },
                { text: 'The melon is funny', outcome: 'Not quite — Students treat discussion as a series of disconnected opinions ("I think it\'s funny") rather than.', reveals: 'students-treat-discussion-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire workshop you must explain why \'The Tale of Melon City\' feels familiar to anyone who\'s watched a bureaucratic comedy. A teammate says: \'It\'s just a silly fairy tale — a melon on a throne. Don\'t overthink the joke.\'',
            decisions: [{ prompt: 'What\'s the poem actually doing?', options: [
                { text: 'It\'s deliberate satire in the Sufi \'wise fool\' tradition (the \'After Idries Shah\' tag is the clue): a \'just and placid\' king follows procedure so faithfully that blame escalates absurdly until a melon is crowned — exposing systems where rules, pass-the-parcel accountability and appearances matter more than sense or justice.', outcome: 'Context is a prediction tool: knowing the Sufi-tale lineage and Seth\'s deceptively neat couplets tells you the silliness is aimed at real bureaucratic absurdity.' },
                { text: 'The teammate is right — it\'s nonsense verse for children; satire would need sharper targets.', outcome: 'The targets are precise: ministers who shift blame, procedure worship, and citizens who prefer spectacle — the melon is the punchline of a real critique, not whimsy.', reveals: 'melon-city-is-nonsense' },
                { text: 'It\'s pro-order propaganda — the melon king shows that ANY sovereign keeps the peace, which is the point.', outcome: 'That reads the satire as endorsement; the crowd accepting a crowned melon \'as long as they are left in peace\' mocks apathy, not order\'s virtues.', reveals: 'satire-read-as-endorsement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'Sing-song couplets carry a hanging and a crowned melon — the nursery-rhyme form is the joke that makes the satire bite.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If stuck, review **c11_eng_s_cbse_05_009 (Literary Devices: Irony and Symbolism)**.',
          misconception: 'Students often treat "The Tale of Melon City" as a simple "funny story with a silly ending," focusing *only* on the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of actively examining a',
                  options: ['Critical thinking in literary analysis is the disciplined process of actively examining a', '"Before You Read: Context and Background" refers to the preliminary study of a text\'s', 'Plot and narrative structure refer to the organized sequence of events in a story and the', 'Setting in a narrative poem refers to the time, place, and social environment where the'],
                  hint: 'If stuck, review **c11_eng_s_cbse_05_009 (Literary Devices: Irony and Symbolism)** specifically the.',
                  misconception: 'Students often treat "The Tale of Melon City" as a simple "funny story with a silly ending," focusing *only* on the melon\'s absurdity.' }
          ],
            remediations: { 'students-often-treat-the-tale': { steps: ['**Re-read with a "Logic Tracker":** Give the student a 3-column table: *Event* | *Stated Reason/Procedure* | *Actual.', 'Have them fill it for 5 key turning points (Arch built low → King blames builders; Workmen blame bricks → King summons.', '**Contrast "Placid" vs "Just":** Ask: "If the King was truly *just*, what would he have done at step 1?', '(Investigated *why* arch was low).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "The Tale of Melon City" as a simple "funny story with a silly ending," focusing *only* on the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the poem\'s final stanza: "The principles of laissez faire / Seem to be well-established there." Is this a genuine endorsement of laissez-faire,.', answer: 'It is a **complex condemnation masked as neutral observation**',
                  options: ['It is a **complex condemnation masked as neutral observation**', 'endorsement', 'simple condemnation', 'justice'],
                  hint: 'If stuck, review **c11_eng_s_cbse_05_009 (Literary Devices: Irony and Symbolism)** specifically the.',
                  misconception: 'Students often treat "The Tale of Melon City" as a simple "funny story with a silly ending," focusing *only* on the melon\'s absurdity.' }
          ],
            remediations: { 'students-often-treat-the-tale': { steps: ['**Re-read with a "Logic Tracker":** Give the student a 3-column table: *Event* | *Stated Reason/Procedure* | *Actual.', 'Have them fill it for 5 key turning points (Arch built low → King blames builders; Workmen blame bricks → King summons.', '**Contrast "Placid" vs "Just":** Ask: "If the King was truly *just*, what would he have done at step 1?', '(Investigated *why* arch was low).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'Review the PEEL structure using a simple, familiar poem (e.g., "The Road Not Taken") and.',
          misconception: 'Students believe "writing in your own words" means avoiding all textual references.',
          parts: [
                { id: 'a', prompt: 'What does PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing in your own words', '"writing in your own words" means avoiding all textual references'],
                  hint: 'Review the PEEL structure using a simple, familiar poem (e.g., "The Road Not Taken") and practice.',
                  misconception: 'Students believe "writing in your own words" means avoiding all textual references.' },
                { id: 'b', prompt: 'Given this weak answer to "How is humour created in the poem?": "The poem is funny because the king hangs himself and then a melon becomes king." Rewrite it.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'writing in your own words', '"writing in your own words" means avoiding all textual references'],
                  hint: 'Review the PEEL structure using a simple, familiar poem (e.g., "The Road Not Taken") and practice.',
                  misconception: 'Students believe "writing in your own words" means avoiding all textual references.' }
          ],
            remediations: { 'writing-in-your-own-words': { steps: ['Show the student a model PEEL paragraph for a simple question (e.g., "How is the king described?").', 'Color-code the four components.', 'Have them write one PEEL paragraph on a different aspect (e.g., the architect\'s defence) using the same color-coding.', 'Provide immediate feedback: "Your Evidence is a quote, but your Explanation only repeats it — tell me *how* the words.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Review the irony analysis in c11_eng_s_cbse_05_009 and the critical thinking framework.',
          misconception: 'Students treat discussion as a series of disconnected opinions ("I think it\'s funny") rather than a collaborative.',
          parts: [
                { id: 'a', prompt: 'Explain why the king is described as \'just and placid\' despite ordering multiple executions.', answer: 'The description is satirical: the king follows procedural fairness (hearing each',
                  options: ['The description is satirical: the king follows procedural fairness (hearing each', 'He is fair because he listens'],
                  hint: 'Review the irony analysis in c11_eng_s_cbse_05_009 and the critical thinking framework.',
                  misconception: 'Students treat discussion as a series of disconnected opinions ("I think it\'s funny") rather than a collaborative analysis where each.' }
          ],
            remediations: { 'students-treat-discussion-as-a': { steps: ['Ask the student to re-read stanza 7 aloud and identify the exact words that show the king\'s "justice" is performative.', 'Have them list three cause-effect chains in the poem (e.g., low arch → king loses crown → builder blamed).', 'Practice a "Yes, and..." exercise: Student A makes a claim with a quote; Student B adds "Yes, and this also shows...".', 'Assign a 2-minute speaking turn where they must use at least two textual references.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
