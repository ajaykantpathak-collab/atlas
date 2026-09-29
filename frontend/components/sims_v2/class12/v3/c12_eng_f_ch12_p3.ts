import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch12_p3: SimDef = {
    id: 'v3_c12_eng_f_ch12_p3',
    title: 'A Thing of Beauty (Poem) · Part 3/3',
    subtitle: 'Written by a dying man — beauty as a lifeline, not a luxury',
    classLevel: 12, subject: 'eng_f', topic: 'A Thing of Beauty (Poem) · Part 3/3',
    chapters: ['c12_eng_f_ch12'],
    nodeIds: ['c12_eng_f_cbse_12_013', 'c12_eng_f_cbse_12_014', 'c12_eng_f_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic poetry scholar', intro: 'A shepherd dreams of the moon and wanders the earth for her. Keats turned that myth into a survival manual.', goal: 'Read A Thing of Beauty through its Romantic frame: the Endymion myth, nature as healing force, and beauty as answer to suffering.' },
    discovery: {
        question: 'A student reads Keats and shrugs: \'beauty makes us happy — it\'s a poem about pretty things.\' Written by a dying 25-year-old, what did they skip?',
        options: ['The suffering the beauty is fighting — despondence, gloomy days, dearth of noble natures; beauty doesn\'t erase the pall, it lifts it so we endure', 'Nothing — pretty things, happy poem', 'Keats hated nature', 'It\'s a love poem to a real woman'],
        answer: 'The suffering the beauty is fighting — despondence, gloomy days, dearth of noble natures; beauty doesn\'t erase the pall, it lifts it so we endure',
        hook: 'For the Romantics beauty isn\'t decoration — it\'s survival equipment. Keats, a surgeon who abandoned medicine and was dying of TB, builds his case on Endymion\'s endless quest: a thing of beauty is \'an endless fountain of immortal drink\' precisely because life is short and dark.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'A Roadside Stand\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_12_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Argue beauty\'s case like a Romantic: decode the Endymion myth as the engine, weigh the \'flowery band\' that binds us to earth despite everything, and test whether a gulmohar at noon can do what Keats claims.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'A Roadside Stand\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "the flower of cities from sinking and withering faint" in the first stanza, and which economic.', options: [
                { text: 'The phrase means that the money earned from rural produce (via the roadside stand)', outcome: 'The phrase means that the money earned from rural produce (via the roadside stand) sustains the.' },
                { text: 'cities give money to villages', outcome: 'Not quite — Students often treat the poem as a simple "rich vs. poor" morality tale and conclude the speaker.', reveals: 'students-often-treat-the-poem' },
                { text: 'cash flow', outcome: 'Not quite — Students often treat the poem as a simple "rich vs. poor" morality tale and conclude the speaker.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'A Roadside Stand\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12?', options: [
                { text: 'PEEL stands for **Point, Evidence, Explanation, Link**', outcome: 'PEEL stands for **Point, Evidence, Explanation, Link**. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means **summarizing the poem**.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means **summarizing the poem**.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'A Roadside Stand\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What is the primary purpose of assigning roles (Facilitator, Evidence Keeper, Connector, Summariser) in a structured literary discussion?', options: [
                { text: 'The roles ensure equitable participation, keep the discussion grounded in textual', outcome: 'The roles ensure equitable participation, keep the discussion grounded in textual evidence, connect.' },
                { text: 'to make it fun', outcome: 'Not quite — Students believe a "good discussion" means everyone agrees politely and shares feelings.', reveals: 'a-good-discussion-means-everyone' },
                { text: 'to finish quickly', outcome: 'Not quite — Students believe a "good discussion" means everyone agrees politely and shares feelings.', reveals: 'a-good-discussion-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend, worn down by exams and bad news, dismisses your suggestion to sit in the park or watch the sunset: \'pretty things don\'t fix real problems\'.',
            decisions: [{ prompt: 'What would Keats answer?', options: [
                { text: 'Beauty is a resource, not a remedy — \'a joy forever\' doesn\'t solve the problem but it loosens despair\'s \'pall\' and keeps the spirit capable of facing it.', outcome: 'Keats, writing through grief, argued beauty is how humans endure suffering — survival equipment, not decoration.' },
                { text: 'He\'s right — sunsets are escapism, and only solutions matter.', outcome: 'The poem\'s claim is precisely that despair itself is the deeper problem; beauty restores the will that solving requires.', reveals: 'beauty-is-escapism' },
                { text: 'Sort of — but only if the sunset actually removes the problem.', outcome: 'That demands of beauty a job it never claimed; its power is renewing the sufferer, not deleting the suffering.', reveals: 'beauty-must-solve' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You can now defend beauty as necessity, not luxury — and read the mythology as argument, not ornament. This poem is where imagery becomes philosophy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_013', difficulty: 'standard',
          question: 'Critical thinking on \'A Roadside Stand\' — analysing the text to reach.',
          hint: 'If the speaker/poet distinction blurs, re-read the last two stanzas and ask: "Would Frost.',
          misconception: 'Students often treat the poem as a simple "rich vs. poor" morality tale and conclude the speaker is a pure sympathizer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'A Roadside Stand\'',
                  options: ['Critical thinking on \'A Roadside Stand\'', '\'A Roadside Stand\' (Flamingo, ch', 'The plot/narrative arc of \'A Roadside Stand\'', 'The setting of \'A Roadside Stand\''],
                  hint: 'If the speaker/poet distinction blurs, re-read the last two stanzas and ask: "Would Frost *himself*.',
                  misconception: 'Students often treat the poem as a simple "rich vs. poor" morality tale and conclude the speaker is a pure sympathizer.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the last two stanzas aloud, circling every first-person pronoun ("I," "myself," "me").', 'A city-dweller like me?" 3.', 'Write a 50-word paragraph: "The speaker\'s guilt is not innocent because..." using the phrase "complicit silence." 4.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_014', difficulty: 'standard',
          question: 'Writing skills from \'A Roadside Stand\' — using the text as a model.',
          hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) to recall analytical points.',
          misconception: 'Students believe "writing skills based on the chapter" means **summarizing the poem**.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers for CBSE Class 12?', answer: 'PEEL stands for **Point, Evidence, Explanation, Link**',
                  options: ['PEEL stands for **Point, Evidence, Explanation, Link**', 'Paragraph, Example, Explanation, Line', 'writing skills based on the chapter', '"writing skills based on the chapter" means **summarizing the poem**'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) to recall analytical points, and.',
                  misconception: 'Students believe "writing skills based on the chapter" means **summarizing the poem**.' },
                { id: 'b', prompt: 'In "A Roadside Stand," the phrase "polished traffic passed with a mind ahead" is used as evidence.', answer: 'The phrase suggests city dwellers are superficially refined ("polished"',
                  options: ['The phrase suggests city dwellers are superficially refined ("polished"', 'cars drove fast', 'polished', 'mind ahead'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) to recall analytical points, and.',
                  misconception: 'Students believe "writing skills based on the chapter" means **summarizing the poem**.' },
                { id: 'c', prompt: 'Compare two student answers to "How does Frost use irony in the poem?" **Answer A:** "The irony is that the city people complain about the signs ruining the.', answer: '**Answer B** demonstrates higher-order analysis',
                  options: ['**Answer B** demonstrates higher-order analysis', 'writing skills based on the chapter', '"writing skills based on the chapter" means **summarizing the poem**'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) to recall analytical points, and.',
                  misconception: 'Students believe "writing skills based on the chapter" means **summarizing the poem**.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['** Give a 5-mark question. Ask them to **highlight every sentence that contains a direct quote or specific phrase.', '** Provide a model PEEL answer for the same question. Have them **color-code** Point (blue), Evidence (green).', '** Assign a new question. Require a **PEEL outline in bullets** before full sentences: - Point: - Evidence 1 (quote.', '** Re-diagnose after 48 hours with a similar question. If they still summarize, revisit **c12_eng_f_cbse_12_013.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means **summarizing the poem**.',
          parts: [
                { id: 'a', prompt: 'A board exam answer states: "The poem is about a roadside stand where poor people sell things. The rich people don\'t care. The government cheats them.', answer: 'Three deficiencies: 1',
                  options: ['Three deficiencies: 1', 'writing skills based on the chapter', '"writing skills based on the chapter" means **summarizing the poem**'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) to recall analytical points, and.',
                  misconception: 'Students believe "writing skills based on the chapter" means **summarizing the poem**.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['** Give a 5-mark question. Ask them to **highlight every sentence that contains a direct quote or specific phrase.', '** Provide a model PEEL answer for the same question. Have them **color-code** Point (blue), Evidence (green).', '** Assign a new question. Require a **PEEL outline in bullets** before full sentences: - Point: - Evidence 1 (quote.', '** Re-diagnose after 48 hours with a similar question. If they still summarize, revisit **c12_eng_f_cbse_12_013.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_12_015', difficulty: 'standard',
          question: 'Discussion points on \'A Roadside Stand\' — speaking and listening around the.',
          hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) and practice writing three.',
          misconception: 'Students believe a "good discussion" means everyone agrees politely and shares feelings.',
          parts: [
                { id: 'a', prompt: 'During discussion, a peer claims: "The poet wants us to pity the rural poor." Using the PEEL structure, formulate a spoken response that either supports.', answer: 'Point: The poet goes beyond pity to implicate the reader',
                  options: ['Point: The poet goes beyond pity to implicate the reader', 'good discussion', 'a "good discussion" means everyone agrees politely and shares feelings'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) and practice writing three PEEL.',
                  misconception: 'Students believe a "good discussion" means everyone agrees politely and shares feelings.' },
                { id: 'b', prompt: 'Compare two possible discussion openings: (A) "What did you feel reading the poem?" (B) "How does the rhyme scheme\'s inconsistency reflect the instability.', answer: 'Opening B is superior',
                  options: ['Opening B is superior', 'good discussion', 'a "good discussion" means everyone agrees politely and shares feelings'],
                  hint: 'If stuck, revisit c12_eng_f_cbse_12_013 (Critical Thinking) and practice writing three PEEL.',
                  misconception: 'Students believe a "good discussion" means everyone agrees politely and shares feelings.' }
          ],
            remediations: { 'a-good-discussion-means-everyone': { steps: ['If a student falls into the "polite sharing" trap: (1) Pause the discussion and model a PEEL response to the last.', '(2) Assign the "Devil\'s Advocate" role to one student per group for the next round — their job is to challenge every.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
