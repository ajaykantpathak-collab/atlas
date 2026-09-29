import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch11_p1: SimDef = {
    id: 'v3_c11_eng_h_ch11_p1',
    title: 'Childhood (Poem) · Part 1/3',
    subtitle: 'Track a lyric that argues, not narrates — and watch its question mutate at the end.',
    classLevel: 11, subject: 'eng_h', topic: 'Childhood (Poem) · Part 1/3',
    chapters: ['c11_eng_h_ch11'],
    nodeIds: ['c11_eng_h_cbse_11_001', 'c11_eng_h_cbse_11_002', 'c11_eng_h_cbse_11_003', 'c11_eng_h_cbse_11_004', 'c11_eng_h_cbse_11_005', 'c11_eng_h_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a detective of one\'s own lost innocence', intro: 'No plot, no characters — just a man interrogating himself about the exact moment he stopped being a child.', goal: 'Read the poem as a cumulative philosophical argument and analyse the when-to-where pivot.' },
    discovery: {
        question: 'For three stanzas the speaker asks \'when did my childhood go?\' — then the question changes. To what, and why does it matter?',
        options: ['To \'where\' — childhood isn\'t a lost moment in time but a relocated place, \'hidden in an infant\'s face\'', 'To \'why\' — he finally demands the cause of growing up', 'To \'how\' — he wants the mechanism of maturity', 'It doesn\'t — the same question repeats to the end'],
        answer: 'To \'where\' — childhood isn\'t a lost moment in time but a relocated place, \'hidden in an infant\'s face\'',
        hook: 'Each stanza offers a different \'when\' — adult hypocrisy, independent thought, a mind of one\'s own — then the pivot rejects \'when\' altogether.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Childhood\' (Hornbill, ch. 11) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Line up the poem\'s three candidate answers for when childhood ends, then evaluate whether the infant\'s face resolves the quest or deepens its irony.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Childhood\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'Who is the poet of the poem \'Childhood\' prescribed in the Class 11 Hornbill textbook, and what is his nationality?', options: [
                { text: 'The poet is Markus Natten, a Norwegian poet', outcome: 'The poet is Markus Natten, a Norwegian poet. A wrong answer (e.g., naming an Indian poet like.' },
                { text: 'the day I stopped believing in Santa Claus', outcome: 'Not quite — Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped.', reveals: 'students-consistently-believe-the-poem' },
                { text: 'an Indian poet like Tagore or assuming the poet is anonymous', outcome: 'Not quite — Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped.', reveals: 'students-consistently-believe-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Trace \'Childhood\' from opening to close: how it starts, how events/images build, where it lands — the sequence carries the meaning.',
            decisions: [{ prompt: 'What is the refrain in the poem "Childhood" and in which stanzas does it appear?', options: [
                { text: 'The refrain is "When did my childhood go?" and it appears in the first three stanzas', outcome: 'The refrain is "When did my childhood go?" and it appears in the first three stanzas.' },
                { text: 'it appears in all four stanzas or quoting a different line', outcome: 'Not quite — Students often treat "Childhood" as a linear story with a single plot event (e.g., "the poet lost.', reveals: 'students-often-treat-childhood-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Childhood\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the primary "setting" of the poem "Childhood," and why is it not a physical location like a school or garden?', options: [
                { text: 'The primary setting is the poet\'s internal mental landscape', outcome: 'The primary setting is the poet\'s internal mental landscape — his consciousness reflecting on the.' },
                { text: 'the setting is the poet\'s school', outcome: 'Not quite — Students consistently treat "setting" in poetry as *only* physical time/place (e.g., "the poem.', reveals: 'students-consistently-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Childhood\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist in the poem "Childhood" and what narrative perspective is used?', options: [
                { text: 'The protagonist is the poetic speaker (the poet Markus Natten reflecting on his own', outcome: 'The protagonist is the poetic speaker (the poet Markus Natten reflecting on his own life), and the.' },
                { text: 'third person', outcome: 'Not quite — Students treat the protagonist as a fictional character with a biography rather than a speaking.', reveals: 'students-treat-the-protagonist-as' },
                { text: 'protagonist', outcome: 'Not quite — Students treat the protagonist as a fictional character with a biography rather than a speaking.', reveals: 'students-treat-the-protagonist-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'Childhood\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'Who are the supporting characters in the poem "Childhood"? List them and quote the exact lines where they appear.', options: [
                { text: 'The supporting characters are the "adults" (stanza 2: "They talked of love and preached', outcome: 'The supporting characters are the "adults" (stanza 2: "They talked of love and preached of love.' },
                { text: 'Hell and Heaven', outcome: 'Not quite — Students often believe supporting characters in poetry must be named, speaking individuals like.', reveals: 'supporting-characters-in-poetry-must' },
                { text: 'the mind', outcome: 'Not quite — Students often believe supporting characters in poetry must be named, speaking individuals like.', reveals: 'supporting-characters-in-poetry-must' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Childhood\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the primary theme of the poem "Childhood" by Markus Natten, stated in a single thematic sentence?', options: [
                { text: '**Correct Answer:** The primary theme is the loss of childhood innocence triggered by the', outcome: '**Correct Answer:** The primary theme is the loss of childhood innocence triggered by the.' },
                { text: 'growing up', outcome: 'Not quite — **Misconception:** "The theme of \'Childhood\' is *hypocrisy of adults* because Stanza 1 spends 4.', reveals: 'misconception-the-theme-of-childhood' },
                { text: 'nostalgia for the past', outcome: 'Not quite — **Misconception:** "The theme of \'Childhood\' is *hypocrisy of adults* because Stanza 1 spends 4.', reveals: 'misconception-the-theme-of-childhood' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For open-mic night a student adapts the poem \'Childhood\' into a skit: actors play young Markus, his parents, a teacher — dramatising \'the day he stopped believing in heaven\'. The mentor asks: \'Where in the poem is this scene actually narrated?\'',
            decisions: [{ prompt: 'Why does the skit\'s premise misread the poem?', options: [
                { text: '\'Childhood\' is a philosophical lyric, not a narrative: it argues that childhood ends not on a date or event but when the mind gains independent, critical thought — seeing through adults\' hypocrisy, questioning where heaven is, thinking thoughts that are one\'s own. There are no characters, setting or plot to dramatise; the \'when\' is a cognitive threshold.', outcome: 'Reading a lyric argument as a memory-story manufactures scenes the poem deliberately refuses — its refrain is a question about ideas, not an anecdote.' },
                { text: 'The skit works — every poem is a story, so picking one memory as the \'moment\' is fine.', outcome: 'That treats the poem as autobiography; the poem\'s point is that no single event ends childhood — three different \'whens\' are proposed and the answer is a state of mind.', reveals: 'lyric-is-narrative' },
                { text: 'Childhood ends at puberty — the poem is about biological growth, so stage it as a birthday scene.', outcome: 'The poem explicitly locates the end in intellectual awakening — independent perception and thought — not in any birthday or bodily milestone.', reveals: 'childhood-ends-at-puberty' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Childhood doesn\'t die — it emigrates. The speaker can see it in an infant\'s face but never move back in.',
            decisions: [{ prompt: 'What comes next? Childhood (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Childhood (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_001', difficulty: 'standard',
          question: '\'Childhood\' (Hornbill, ch. 11) — the context and background to this text: who.',
          hint: 'Review \'Poem: Theme of Imagination and Childhood in Paper Boats\' (c7_engl_ch03_012) and.',
          misconception: 'Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped believing in Santa.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of the poem \'Childhood\' prescribed in the Class 11 Hornbill textbook, and what is his nationality?', answer: 'The poet is Markus Natten, a Norwegian poet',
                  options: ['The poet is Markus Natten, a Norwegian poet', 'the day I stopped believing in Santa Claus', 'an Indian poet like Tagore or assuming the poet is anonymous', 'the poem describes a *specific memory* (e'],
                  hint: 'Review \'Poem: Theme of Imagination and Childhood in Paper Boats\' (c7_engl_ch03_012) and \'Poetry.',
                  misconception: 'Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped believing in Santa Claus") because they.' },
                { id: 'b', prompt: 'In your own words, explain the difference between \'innocence\' as understood in the context of this poem and \'ignorance\'.', answer: 'Innocence implies a lack of guile or corruption, a natural state of trust',
                  options: ['Innocence implies a lack of guile or corruption, a natural state of trust', 'the day I stopped believing in Santa Claus', 'the poem describes a *specific memory* (e'],
                  hint: 'Review \'Poem: Theme of Imagination and Childhood in Paper Boats\' (c7_engl_ch03_012) and \'Poetry.',
                  misconception: 'Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped believing in Santa Claus") because they.' },
                { id: 'c', prompt: 'Analyse the following two statements and decide which better reflects the poem\'s philosophical stance on *when* childhood ends.', answer: 'Statement B reflects the poem\'s stance',
                  options: ['Statement B reflects the poem\'s stance', 'the day I stopped believing in Santa Claus', 'the poem describes a *specific memory* (e'],
                  hint: 'Review \'Poem: Theme of Imagination and Childhood in Paper Boats\' (c7_engl_ch03_012) and \'Poetry.',
                  misconception: 'Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped believing in Santa Claus") because they.' }
          ],
            remediations: { 'students-consistently-believe-the-poem': { steps: ['Ask the student to re-read the poem *only* for questions asked (stanzas 1-3) and the final answer (stanza 4).', 'Have them convert each stanza into a declarative sentence: "The poet asks if childhood ended when X happened." 3.', 'Explicitly contrast with a narrative poem they know (e.g., \'The Cherry Tree\' from Class 8) using a Venn diagram.', 'Assign a 50-word write-up: "Why this poem has no \'characters\' or \'setting\' in the traditional sense."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped believing in Santa.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The poem \'Childhood\' is pessimistic because it only focuses on what is lost, not what is gained in adulthood." Defend or refute.', answer: 'Refute',
                  options: ['Refute', 'the day I stopped believing in Santa Claus', 'the poem describes a *specific memory* (e'],
                  hint: 'Review \'Poem: Theme of Imagination and Childhood in Paper Boats\' (c7_engl_ch03_012) and \'Poetry.',
                  misconception: 'Students consistently believe the poem describes a *specific memory* (e.g., "the day I stopped believing in Santa Claus") because they.' }
          ],
            remediations: { 'students-consistently-believe-the-poem': { steps: ['Ask the student to re-read the poem *only* for questions asked (stanzas 1-3) and the final answer (stanza 4).', 'Have them convert each stanza into a declarative sentence: "The poet asks if childhood ended when X happened." 3.', 'Explicitly contrast with a narrative poem they know (e.g., \'The Cherry Tree\' from Class 8) using a Venn diagram.', 'Assign a 50-word write-up: "Why this poem has no \'characters\' or \'setting\' in the traditional sense."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Childhood\' — what happens, in what order, and why.',
          hint: 'Review the definition and function of a refrain in narrative poetry (Class 6.',
          misconception: 'Students often treat "Childhood" as a linear story with a single plot event (e.g., "the poet lost his childhood when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'Childhood\'',
                  options: ['The plot/narrative arc of \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The setting of \'Childhood\'', 'Character analysis in \'Childhood\''],
                  hint: 'Review the definition and function of a refrain in narrative poetry (Class 6, c6_english_u1_006).',
                  misconception: 'Students often treat "Childhood" as a linear story with a single plot event (e.g., "the poet lost his childhood when he saw adults lying").' }
          ],
            remediations: { 'students-often-treat-childhood-as': { steps: ['If a student gives a single-event answer, guide them: (1) Reread each stanza aloud and underline the proposed answer.', '(2) Write the three answers side by side: "Adults\' hypocrisy," "Own thoughts," "Unique perception." (3) Ask: "Are these.', 'If not, what does the progression show?" (4) Then read stanza 4 and ask: "Does the question change?', 'What does that tell you about the poem\'s structure?" This step-by-step comparison forces attention to structural nuance.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_003', difficulty: 'standard',
          question: 'The setting of \'Childhood\' — the place, time and atmosphere the text creates.',
          hint: 'If stuck, return to c7_engl_ch03_014 (Paper Boats setting analysis) and re-do the.',
          misconception: 'Students consistently treat "setting" in poetry as *only* physical time/place (e.g., "the poem is set in the poet\'s.',
          parts: [
                { id: 'a', prompt: 'What is the primary "setting" of the poem "Childhood," and why is it not a physical location like a school or garden?', answer: 'The primary setting is the poet\'s internal mental landscape',
                  options: ['The primary setting is the poet\'s internal mental landscape', 'the setting is the poet\'s school'],
                  hint: 'If stuck, return to c7_engl_ch03_014 (Paper Boats setting analysis) and re-do the "Setting vs.',
                  misconception: 'Students consistently treat "setting" in poetry as *only* physical time/place (e.g., "the poem is set in the poet\'s childhood home").' }
          ],
            remediations: { 'students-consistently-treat-setting-in': { steps: ['Ask the student to close their eyes and recall the exact moment they realized Santa Claus / fairies / a parental.', 'Have them describe *where* that realization happened — they will say "in my head" or "in the car" — then guide them.', 'Re-read Stanza 3 together: "Where did my childhood go?', '/ It went to some forgotten place / hidden in an infant\'s face." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_004', difficulty: 'standard',
          question: 'Character analysis in \'Childhood\' — the central figure(s), their traits, and.',
          hint: 'Review the difference between narrator and author using the PEEL method: Point (speaker ≠.',
          misconception: 'Students treat the protagonist as a fictional character with a biography rather than a speaking consciousness exploring.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what the protagonist means when he asks: "Was it the day I ceased to be eleven?"', answer: 'The line marks a symbolic threshold',
                  options: ['The line marks a symbolic threshold', 'eleven', 'The protagonist was eleven when he stopped believing in Hell and Heaven'],
                  hint: 'Review the difference between narrator and author using the PEEL method: Point (speaker ≠ poet).',
                  misconception: 'Students treat the protagonist as a fictional character with a biography rather than a speaking consciousness exploring a universal.' }
          ],
            remediations: { 'students-treat-the-protagonist-as': { steps: ['Ask the student to read the poem aloud three times, circling every "I" and "my" — count them (there are 7).', 'Have them replace each "I" with "the speaker" and notice how the poem becomes about a mind at work, not a person with.', 'Give them two columns: "Things the speaker *remembers*" vs "Things the speaker *realizes now*" — fill both from the.', 'Ask: "If this were a diary entry written today, what would the date be?" The answer: *today* — the poem happens in the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_005', difficulty: 'standard',
          question: 'Supporting characters in \'Childhood\' — the secondary figures who move the story.',
          hint: 'Review the STEAL method applied to the protagonist in c11_eng_h_cbse_11_004 and the Valli.',
          misconception: 'Students often believe supporting characters in poetry must be named, speaking individuals like in a story.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting characters in \'Childhood\'',
                  options: ['Supporting characters in \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The plot/narrative arc of \'Childhood\'', 'The setting of \'Childhood\''],
                  hint: 'Review the STEAL method applied to the protagonist in c11_eng_h_cbse_11_004 and the Valli analysis.',
                  misconception: 'Students often believe supporting characters in poetry must be named, speaking individuals like in a story.' }
          ],
            remediations: { 'supporting-characters-in-poetry-must': { steps: ['If a student cannot identify the supporting characters, first ask them to list every noun in the poem that refers to.', 'Then, for each, ask: "Does this entity act, speak, or get described with human traits?" Guide them to see that "adults".', 'Next, have them write one sentence for each: "The adults show me..." and "The infant shows me..." This scaffolds the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of \'Childhood\' — the central idea the whole text returns to.',
          hint: 'If stuck, review **c11_eng_h_cbse_11_002 (Plot and Narrative Structure)** and create.',
          misconception: '**Misconception:** "The theme of \'Childhood\' is *hypocrisy of adults* because Stanza 1 spends 4 lines describing how.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of \'Childhood\'',
                  options: ['The primary theme of \'Childhood\'', '\'Childhood\' (Hornbill, ch', 'The plot/narrative arc of \'Childhood\'', 'The setting of \'Childhood\''],
                  hint: 'If stuck, review **c11_eng_h_cbse_11_002 (Plot and Narrative Structure)** and create a 4-row table.',
                  misconception: '**Misconception:** "The theme of \'Childhood\' is *hypocrisy of adults* because Stanza 1 spends 4 lines describing how adults \'preached.' }
          ],
            remediations: { 'misconception-the-theme-of-childhood': { steps: ['**Targeted Remediation (3 Steps):** 1.', '**Colour-Code the Stanzas:** Give the student 4 highlighters.', 'Assign: **Yellow** = External World (Stanza 1: adults, Stanza 2: geography), **Blue** = Internal Mind (Stanza 3: "my.', 'Have them highlight key phrases.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
