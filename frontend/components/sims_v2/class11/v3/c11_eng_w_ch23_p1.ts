import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch23_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch23_p1: SimDef = {
    id: 'v3_c11_eng_w_ch23_p1',
    title: 'What is a Good Book? (Essay) · Part 1/3',
    subtitle: 'Assemble the criteria for a good book the way a reader actually does.',
    classLevel: 11, subject: 'eng_w', topic: 'What is a Good Book? (Essay) · Part 1/3',
    chapters: ['c11_eng_w_ch23'],
    nodeIds: ['c11_eng_w_cbse_23_001', 'c11_eng_w_cbse_23_002', 'c11_eng_w_cbse_23_003', 'c11_eng_w_cbse_23_004', 'c11_eng_w_cbse_23_005', 'c11_eng_w_cbse_23_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a lifelong reader auditing what lasted', intro: 'Which books from your childhood still hold up? The essay builds its answer from exactly that experiment.', goal: 'Analyse the essay\'s inductive structure and its circular, library-framed resolution.' },
    discovery: {
        question: 'Which test best certifies a \'good book\' — critical acclaim, or something a childhood favourite can prove decades later?',
        options: ['Whether it survives re-reading as an adult — endurance across the reader\'s own time is the essay\'s criterion', 'Sales figures — the market recognises quality', 'Difficulty — a good book must resist easy reading', 'Newness — only contemporary work matters'],
        answer: 'Whether it survives re-reading as an adult — endurance across the reader\'s own time is the essay\'s criterion',
        hook: 'Bond builds his criteria inductively out of a childhood of reading — the essay argues the way a library grows: one loved book at a time.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'Essays and Non-fiction\' (Woven Words, ch. 23) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_23_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how the essay departs from chronology to group books by theme, and judge the ending\'s return to the grandfather\'s library.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'Essays and Non-fiction\', then the period, then the literary context — background turns a text from a puzzle into a story you can read.',
            decisions: [{ prompt: 'What is the primary purpose of the "Before You Read" stage when approaching a senior secondary essay like "What is a Good Book?"?', options: [
                { text: 'The primary purpose is to activate prior knowledge, build a mental framework for the', outcome: 'The primary purpose is to activate prior knowledge, build a mental framework for the essay\'s.' },
                { text: 'to summarize the essay', outcome: 'Not quite — Students treat "Before You Read" as a passive reading of the textbook\'s introductory blurb.', reveals: 'students-treat-before-you-read' },
                { text: 'to memorize difficult words', outcome: 'Not quite — Students treat "Before You Read" as a passive reading of the textbook\'s introductory blurb.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'Essays and Non-fiction\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the explicit occasion and audience for Chandrasekhar’s “Patterns of Creativity” as stated in the text?', options: [
                { text: 'The essay is an excerpt from The Nora and Edward Byerson Lecture titled ‘Shakespeare,', outcome: 'The essay is an excerpt from The Nora and Edward Byerson Lecture titled ‘Shakespeare, Newton and.' },
                { text: 'a classroom lecture', outcome: 'Not quite — Students often treat “setting” in an essay as merely the *physical venue* (e.g., “a university.', reveals: 'students-often-treat-setting-in' },
                { text: 'a scientific conference', outcome: 'Not quite — Students often treat “setting” in an essay as merely the *physical venue* (e.g., “a university.', reveals: 'students-often-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'Essays and Non-fiction\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'What is the protagonist in a non-fiction essay like "Patterns of Creativity"?', options: [
                { text: 'The protagonist is the author\'s constructed persona', outcome: 'The protagonist is the author\'s constructed persona — the intellectual voice that guides the.' },
                { text: 'the main character like Shelley', outcome: 'Not quite — Students often confuse the *author* (the historical person S. Chandrasekhar) with the *protagonist*.', reveals: 'students-often-confuse-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'Essays and Non-fiction\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the central question Chandrasekhar poses in the opening paragraph of "Patterns of Creativity"?', options: [
                { text: 'The central question is: "why is there a difference in the patterns of creativity among', outcome: 'The central question is: "why is there a difference in the patterns of creativity among the.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often believe the "primary theme" of this essay is simply "science vs.', reveals: 'the-primary-theme-of-this' },
                { text: 'may bear on the answer', outcome: 'Not quite — Students often believe the "primary theme" of this essay is simply "science vs.', reveals: 'the-primary-theme-of-this' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The library committee asks your class to draft criteria for \'what makes a book worth keeping.\' You suggest the essay \'What is a Good Book?\' but a teammate dismisses it: \'It\'s just someone\'s childhood reading memories — there\'s no argument, no structure, nothing to extract criteria from.\'',
            decisions: [{ prompt: 'How do you show the essay\'s argumentative structure?', options: [
                { text: 'Trace the essay\'s real architecture: it poses a question and answers it inductively — personal reading memories aren\'t decoration but anchors, recurring touchstones from which general criteria accumulate. The childhood anecdotes function as evidence, and the movement from specific books to universal standards is the \'plot of ideas\' guiding the reader to a conclusion.', outcome: 'The teammate learns to read non-fiction structure: an essay\'s plot is its logical progression, and the memories are load-bearing evidence, not nostalgia.' },
                { text: 'Concede and drop the essay — pick a checklist article instead, since this one has no criteria.', outcome: 'The criteria are there; they\'re built inductively from experience rather than listed — a stronger, more durable kind of argument for \'worth keeping\'.', reveals: 'reflective-essay-has-no-argument' },
                { text: 'Force it into a story shape — call the childhood memory the \'exposition\' and the last library image the \'resolution\' to prove it has structure.', outcome: 'Freytag\'s pyramid is the wrong tool: the essay\'s architecture is an inductive accumulation of criteria anchored by personal touchstones, not a fictional arc.', reveals: 'forcing-fiction-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_23_006', title: 'The bigger picture',
          caseStudy: { intro: 'The essay closes the circle where it began — in a library — and hands the question to the reader\'s own shelves.',
            decisions: [{ prompt: 'What comes next? What is a Good Book? (Essay) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — What is a Good Book? (Essay) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_001', difficulty: 'standard',
          question: '\'Essays and Non-fiction\' (Woven Words, ch. 23) — the context and background.',
          hint: 'Review "Nelson Mandela: Long Walk to Freedom" (Class 10) — analyze how the textbook\'s.',
          misconception: 'Students treat "Before You Read" as a passive reading of the textbook\'s introductory blurb, memorizing the author\'s.',
          parts: [
                { id: 'a', prompt: 'Explain how knowing the author\'s identity and intellectual background (e.g., a scientist-philosopher vs.', answer: 'An author\'s background determines their criteria for judgment: a scientist might',
                  options: ['An author\'s background determines their criteria for judgment: a scientist might', 'it doesn\'t matter, the text speaks for itself', 'intentional fallacy'],
                  hint: 'Review "Nelson Mandela: Long Walk to Freedom" (Class 10) — analyze how the textbook\'s "Before You.',
                  misconception: 'Students treat "Before You Read" as a passive reading of the textbook\'s introductory blurb, memorizing the author\'s birth/death dates and.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['If a student produces only biographical facts, intervene with: "Good, you know *who* wrote it.', 'Now: what *arguments* was this author known for?', 'What *disagreements* did they have with contemporaries?', 'Find one quote from another work by this author that uses the word \'culture\' or \'science\' — how does it preview this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'Essays and Non-fiction\' — what happens, in what.',
          hint: 'If stuck, review "First-Person Narrative Perspective" (c9_engl_ch1_7) and "Narrative.',
          misconception: 'Students often treat "plot" and "narrative structure" as interchangeable terms and search for a fictional-style plot.',
          parts: [
                { id: 'a', prompt: 'The essay opens with Bond\'s childhood memory of reading "The Coral Island." Explain how this anecdote functions structurally in the essay—does it act as.', answer: 'It functions as a structural pillar (and a hook)',
                  options: ['It functions as a structural pillar (and a hook)', 'misses its recurring role'],
                  hint: 'If stuck, review "First-Person Narrative Perspective" (c9_engl_ch1_7) and "Narrative Technique.',
                  misconception: 'Students often treat "plot" and "narrative structure" as interchangeable terms and search for a fictional-style plot (exposition, rising.' }
          ],
            remediations: { 'students-often-treat-plot-and': { steps: ['Give the student a printed copy of the essay with paragraph numbers.', 'Ask them to write a one-sentence "function label" for each paragraph (e.g., "Paragraph 3: introduces first criterion.', 'Have them group paragraphs that share a function.', 'Guide them to see the pattern: anecdote → criterion → anecdote → criterion → synthesis → circular return.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_003', difficulty: 'standard',
          question: 'The setting of \'Essays and Non-fiction\' — the place, time and atmosphere the.',
          hint: 'If stuck, review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation in the.',
          misconception: 'Students often treat “setting” in an essay as merely the *physical venue* (e.g., “a university hall”) and “atmosphere”.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The setting of \'Essays and Non-fiction\'',
                  options: ['The setting of \'Essays and Non-fiction\'', '\'Essays and Non-fiction\' (Woven Words, ch', 'The plot/narrative arc of \'Essays and Non-fiction\'', 'Character analysis in \'Essays and Non-fiction\''],
                  hint: 'If stuck, review c7_engl_ch04_005 (Atmosphere: Heat, Silence and Anticipation in the Jungle).',
                  misconception: 'Students often treat “setting” in an essay as merely the *physical venue* (e.g., “a university hall”) and “atmosphere” as *mood words*.' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Return to the “About the Author” note and the lecture title: have the student rewrite them as a one-sentence.', 'Give the student three short excerpts (Wordsworth quote, Darwin confession, Shelley’s “unacknowledged legislators”) and.', 'Have them complete a two-column table: Column A = “What is being discussed?” (setting), Column B = “How does the author.', 'Finally, ask them to explain *why* Chandrasekhar moves from Wordsworth to Shelley to Darwin to Faraday — the answer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_004', difficulty: 'standard',
          question: 'Character analysis in \'Essays and Non-fiction\' — the central figure(s), their.',
          hint: 'Review the distinction between author and narrator using Anne Frank\'s diary.',
          misconception: 'Students often confuse the *author* (the historical person S. Chandrasekhar) with the *protagonist* (the crafted.',
          parts: [
                { id: 'a', prompt: 'What is the protagonist in a non-fiction essay like "Patterns of Creativity"?', answer: 'The protagonist is the author\'s constructed persona',
                  options: ['The protagonist is the author\'s constructed persona', 'the main character like Shelley'],
                  hint: 'Review the distinction between author and narrator using Anne Frank\'s diary (c10_engl_cbse_04_009).',
                  misconception: 'Students often confuse the *author* (the historical person S. Chandrasekhar) with the *protagonist* (the crafted narrator of this essay).' },
                { id: 'b', prompt: 'Explain how Chandrasekhar\'s opening phrase "I shall not attempt to answer this question directly; but I shall make an assortment of remarks which may bear.', answer: 'The phrase establishes a protagonist who is intellectually honest, modest, and',
                  options: ['The phrase establishes a protagonist who is intellectually honest, modest, and', 'it shows he doesn\'t know the answer'],
                  hint: 'Review the distinction between author and narrator using Anne Frank\'s diary (c10_engl_cbse_04_009).',
                  misconception: 'Students often confuse the *author* (the historical person S. Chandrasekhar) with the *protagonist* (the crafted narrator of this essay).' },
                { id: 'c', prompt: 'Analyze how Chandrasekhar\'s inclusion of Darwin\'s confession about losing taste for poetry and Faraday\'s exchange with Gladstone serves the protagonist\'s.', answer: 'Darwin illustrates the *cost* of scientific specialization',
                  options: ['Darwin illustrates the *cost* of scientific specialization', 'examples of scientists'],
                  hint: 'Review the distinction between author and narrator using Anne Frank\'s diary (c10_engl_cbse_04_009).',
                  misconception: 'Students often confuse the *author* (the historical person S. Chandrasekhar) with the *protagonist* (the crafted narrator of this essay).' }
          ],
            remediations: { 'students-often-confuse-the-author': { steps: ['Have the student highlight every first-person pronoun and verb ("I shall," "It seems to me," "let me read") in the.', 'For each, ask: "What does this choice reveal about the narrator\'s attitude toward the reader and the material?" 3.', 'Have them write a one-paragraph profile using *only* those highlighted moments.', 'Compare with a biography of Chandrasekhar to see what the essay includes and excludes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_005', difficulty: 'standard',
          question: 'Supporting characters in \'Essays and Non-fiction\' — the secondary figures who.',
          hint: 'If stuck, review "rhetorical function" using the Postmaster analysis.',
          misconception: 'Students often treat the referenced figures as "examples" to be memorized for content recall (e.g., "Wordsworth hated.',
          parts: [
                { id: 'a', prompt: 'Compare the roles of Darwin and Faraday in the essay. How does the author use their contrasting experiences to deepen his argument about creativity?', answer: 'Darwin represents the *cost* of exclusive scientific specialization',
                  options: ['Darwin represents the *cost* of exclusive scientific specialization', 'poetical faculty'],
                  hint: 'If stuck, review "rhetorical function" using the Postmaster analysis (c10_engl_cbse_01_008): ask.',
                  misconception: 'Students often treat the referenced figures as "examples" to be memorized for content recall (e.g., "Wordsworth hated science").' }
          ],
            remediations: { 'students-often-treat-the-referenced': { steps: ['Give the student a two-column table: Column A = Figure, Column B = Function in Argument (e.g., "Wordsworth →.', 'Ask them to fill Column B for five figures using only the essay\'s transition words ("Thus," "Or consider this," "Lest.', 'Have them rewrite one paragraph of the essay replacing a figure with a modern equivalent, forcing them to articulate.', 'Finally, ask: "If you removed Darwin, what step in the argument would collapse?" This shifts focus from content.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the referenced figures as "examples" to be memorized for content recall (e.g., "Wordsworth hated.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of using Peter Medawar\'s counter-quote ("when literature arrives, it expels science") immediately after Lowes Dickinson\'s claim.', answer: 'It strengthens the essay\'s intellectual honesty by refusing to take sides',
                  options: ['It strengthens the essay\'s intellectual honesty by refusing to take sides', 'confusing', 'biased', 'assortment of remarks'],
                  hint: 'If stuck, review "rhetorical function" using the Postmaster analysis (c10_engl_cbse_01_008): ask.',
                  misconception: 'Students often treat the referenced figures as "examples" to be memorized for content recall (e.g., "Wordsworth hated science").' }
          ],
            remediations: { 'students-often-treat-the-referenced': { steps: ['Give the student a two-column table: Column A = Figure, Column B = Function in Argument (e.g., "Wordsworth →.', 'Ask them to fill Column B for five figures using only the essay\'s transition words ("Thus," "Or consider this," "Lest.', 'Have them rewrite one paragraph of the essay replacing a figure with a modern equivalent, forcing them to articulate.', 'Finally, ask: "If you removed Darwin, what step in the argument would collapse?" This shifts focus from content.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_23_006', difficulty: 'standard',
          question: 'The primary theme of \'Essays and Non-fiction\' — the central idea the whole text.',
          hint: 'If stuck, review the "structure of a discursive essay" concept from Class 10 (e.g.',
          misconception: 'Students often believe the "primary theme" of this essay is simply "science vs.',
          parts: [
                { id: 'a', prompt: 'Apply Chandrasekhar\'s distinction between "patterns of creativity" to explain why Darwin lost his taste for poetry and music while Faraday\'s scientific work.', answer: 'Darwin\'s mind became "a kind of machine for grinding general laws out of large',
                  options: ['Darwin\'s mind became "a kind of machine for grinding general laws out of large', 'more scientific', 'less scientific', 'primary theme'],
                  hint: 'If stuck, review the "structure of a discursive essay" concept from Class 10 (e.g., Mandela\'s "Long.',
                  misconception: 'Students often believe the "primary theme" of this essay is simply "science vs.' },
                { id: 'b', prompt: 'Analyze how Chandrasekhar uses the juxtaposition of Darwin\'s confession and Faraday\'s response to Gladstone ("you will soon be able to tax it") to advance his.', answer: 'Darwin illustrates the *cost* of a purely analytical creativity',
                  options: ['Darwin illustrates the *cost* of a purely analytical creativity', 'primary theme', 'the "primary theme" of this essay is simply "science vs'],
                  hint: 'If stuck, review the "structure of a discursive essay" concept from Class 10 (e.g., Mandela\'s "Long.',
                  misconception: 'Students often believe the "primary theme" of this essay is simply "science vs.' }
          ],
            remediations: { 'the-primary-theme-of-this': { steps: ['Have the student re-read only the first and last paragraphs of the essay side-by-side.', 'Ask: "What question does he ask in para 1? What question does he ask in the final paragraph?" (Answer: para 1.', 'Guide them to see the arc: from *describing* a perceived difference to *diagnosing* a missing synthesis.', 'Assign a 3-sentence summary: "Chandrasekhar shows that the apparent conflict between poetry and science stems from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
