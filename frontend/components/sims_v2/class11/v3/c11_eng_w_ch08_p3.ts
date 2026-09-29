import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch08_p3: SimDef = {
    id: 'v3_c11_eng_w_ch08_p3',
    title: 'The Luncheon (Short Story) · Part 3/3',
    subtitle: 'Watch a month\'s budget get eaten course by course — and revenge arrive twenty years late.',
    classLevel: 11, subject: 'eng_w', topic: 'The Luncheon (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch08'],
    nodeIds: ['c11_eng_w_cbse_08_013', 'c11_eng_w_cbse_08_014', 'c11_eng_w_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a diarist dissecting a ruinous lunch in 1920s Paris', intro: 'Eighty francs was survival money for a month — and the lady \'never minds\' caviare.', goal: 'Analyse the retrospective frame and the escalating structure of Maugham\'s anecdote.' },
    discovery: {
        question: 'Ruined by a luncheon he couldn\'t refuse, the narrator ends with a joke: \'I\'ll eat nothing for dinner tonight.\' Is that growth?',
        options: ['No — it\'s performative deflection; twenty years later the telling itself is his cold revenge', 'Yes — humour shows he finally matured past the humiliation', 'Yes — he learned to say no to women', 'No — because he never paid the bill'],
        answer: 'No — it\'s performative deflection; twenty years later the telling itself is his cold revenge',
        hook: 'He still couldn\'t say no in the restaurant — the only \'revenge\' available was narrating her into twenty-one stone, two decades on.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The Luncheon\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_08_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the twenty-years-later frame from the flashback, rank the escalating orders from salmon to peaches, and place the true climax at the bill.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The Luncheon\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define "situational irony" and give one specific example from "The Luncheon" where the outcome contradicts the narrator\'s expectations.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to', outcome: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to what was.' },
                { text: 'the lady was fat at the end', outcome: 'Not quite — Students often confuse *verbal irony* (saying one thing, meaning another) with *situational irony*.', reveals: 'students-often-confuse-verbal-irony' },
                { text: 'the story is ironic', outcome: 'Not quite — Students often confuse *verbal irony* (saying one thing, meaning another) with *situational irony*.', reveals: 'students-often-confuse-verbal-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The Luncheon\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What are the four components of the PEEL paragraph structure used for writing literature answers in Class 11?', options: [
                { text: 'The four components are: **P**oint (topic sentence stating the argument), **E**vidence', outcome: 'The four components are: **P**oint (topic sentence stating the argument), **E**vidence (textual.' },
                { text: 'Plot, Event, Effect, Lesson', outcome: 'Not quite — Students believe "using quotes" means inserting long passages from the story.', reveals: 'using-quotes-means-inserting-long' },
                { text: 'using quotes', outcome: 'Not quite — Students believe "using quotes" means inserting long passages from the story.', reveals: 'using-quotes-means-inserting-long' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'The Luncheon\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'Recall the two discussion prompts given in the NCERT textbook under "Talking About the Text" for "The Luncheon."', options: [
                { text: 'The two prompts are: (1) "People with foibles are often not conscious of them" and (2)', outcome: 'The two prompts are: (1) "People with foibles are often not conscious of them" and (2) "The.' },
                { text: 'People with foibles are often not conscious of them', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat — sharing personal opinions ("I think the.', reveals: 'students-treat-speaking-and-listening' },
                { text: 'A wrong answer (e.g., listing comprehension questions from', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat — sharing personal opinions ("I think the.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your finance-and-fiction workshop reads Maugham\'s \'The Luncheon\' — a poor young writer takes a flattering lady admirer to Foyot\'s in Paris, and she orders caviare, salmon and champagne \'just a little something\'. A member misses the stakes: \'It\'s a nice lunch; why does the narrator panic over a restaurant bill?\'',
            decisions: [{ prompt: 'What makes the meal an ordeal?', options: [
                { text: 'Purchasing power plus performance: 1920s Paris, eighty-odd francs is the narrator\'s entire month\'s survival budget, and Foyot\'s is a senators\' restaurant — every \'little thing\' she orders is a week\'s rent to him. His politeness trap — too proud to confess poverty — and her hypocrisy (\'I never eat more than one thing\') are the comedy; the economics make it an ordeal.', outcome: 'Context — the franc\'s real value and the social rule that a gentleman can\'t say \'I can\'t afford this\' — converts lunch into slow-motion financial ruin.' },
                { text: 'He\'s just stingy — the panic is a character flaw, not economics.', outcome: 'The numbers are explicit: the meal costs roughly his monthly means; it\'s arithmetic dread under a code of manners, not miserliness.', reveals: 'narrator-is-just-stingy' },
                { text: 'She\'s unaware — the lady doesn\'t know restaurants cost money, so it\'s accidental.', outcome: 'She knows exactly what she\'s doing: \'I never eat anything for luncheon\' while ordering the costliest items is performed innocence — the hypocrisy is the joke\'s point.', reveals: 'lady-is-innocent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'Each dish she \'never minds\' is a step deeper into his panic — the menu is the rising action.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_013', difficulty: 'standard',
          question: 'Critical thinking on \'The Luncheon\' — analysing the text to reach.',
          hint: 'If stuck, review the irony classification table in node c11_eng_w_cbse_08_009 and re-read.',
          misconception: 'Students often confuse *verbal irony* (saying one thing, meaning another) with *situational irony* (outcome contradicts.',
          parts: [
                { id: 'a', prompt: 'Analyze how Maugham structures the story\'s timeline (the luncheon 20 years ago vs.', answer: 'The frame opens and closes in the present ("I caught sight of her at the play',
                  options: ['The frame opens and closes in the present ("I caught sight of her at the play', 'the story is ironic'],
                  hint: 'If stuck, review the irony classification table in node c11_eng_w_cbse_08_009 and re-read the story.',
                  misconception: 'Students often confuse *verbal irony* (saying one thing, meaning another) with *situational irony* (outcome contradicts expectation) and.' }
          ],
            remediations: { 'students-often-confuse-verbal-irony': { steps: ['If a student conflates irony types: (1) Have them create a three-column table: Verbal / Situational / Dramatic.', '(2) Give them 5 quotes/events from the story (e.g., "I never eat anything for luncheon," the narrator\'s "Water" reply.', '(3) Ask them to place each in the correct column and justify.', '(4) Then have them write one analytical paragraph using all three terms correctly to explain how Maugham layers irony.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse *verbal irony* (saying one thing, meaning another) with *situational irony* (outcome contradicts.',
          parts: [
                { id: 'a', prompt: 'Create a 4-line diary entry from the lady\'s perspective on the evening of the luncheon, revealing her internal calculation without breaking her performed.', answer: 'Sample: "Thursday at Foyot\'s',
                  options: ['Sample: "Thursday at Foyot\'s', 'the story is ironic'],
                  hint: 'If stuck, review the irony classification table in node c11_eng_w_cbse_08_009 and re-read the story.',
                  misconception: 'Students often confuse *verbal irony* (saying one thing, meaning another) with *situational irony* (outcome contradicts expectation) and.' }
          ],
            remediations: { 'students-often-confuse-verbal-irony': { steps: ['If a student conflates irony types: (1) Have them create a three-column table: Verbal / Situational / Dramatic.', '(2) Give them 5 quotes/events from the story (e.g., "I never eat anything for luncheon," the narrator\'s "Water" reply.', '(3) Ask them to place each in the correct column and justify.', '(4) Then have them write one analytical paragraph using all three terms correctly to explain how Maugham layers irony.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_014', difficulty: 'standard',
          question: 'Writing skills from \'The Luncheon\' — using the text as a model or springboard.',
          hint: 'If stuck, revisit c11_eng_w_cbse_08_009 (Irony and Symbolism) and c11_eng_w_cbse_08_013.',
          misconception: 'Students believe "using quotes" means inserting long passages from the story.',
          parts: [
                { id: 'a', prompt: 'Given the prompt "The author\'s first-person narrative heightens the humour in \'The Luncheon\'.", select the **most effective** piece of textual evidence from.', answer: '**Correct choice: C**',
                  options: ['**Correct choice: C**', 'using quotes', '"using quotes" means inserting long passages from the story'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_08_009 (Irony and Symbolism) and c11_eng_w_cbse_08_013 (Critical.',
                  misconception: 'Students believe "using quotes" means inserting long passages from the story.' },
                { id: 'b', prompt: 'Compare the following two draft openings for the question "Discuss the theme of appearance vs.', answer: '**Draft 2 is stronger**',
                  options: ['**Draft 2 is stronger**', 'using quotes', '"using quotes" means inserting long passages from the story'],
                  hint: 'If stuck, revisit c11_eng_w_cbse_08_009 (Irony and Symbolism) and c11_eng_w_cbse_08_013 (Critical.',
                  misconception: 'Students believe "using quotes" means inserting long passages from the story.' }
          ],
            remediations: { 'using-quotes-means-inserting-long': { steps: ['If a student submits a plot-summary answer: (1) **Highlight every narrative verb** (went, ordered, ate, said) in yellow.', '(3) **Replace each with an analytical verb** (reveals, exposes, underscores, contrasts, satirises).', '(4) **Insert one piece of micro-evidence** per analytical verb.', '(5) **Add a "so what?" sentence** linking to theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_08_015', difficulty: 'standard',
          question: 'Discussion points on \'The Luncheon\' — speaking and listening around the text.',
          hint: 'If stuck, review c11_eng_w_cbse_08_013 worked examples on writing analytical paragraphs.',
          misconception: 'Students treat "Speaking and Listening" as informal chat — sharing personal opinions ("I think the lady was rude").',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what "foible" means in the context of the first discussion prompt, and identify which character in "The Luncheon" it applies to.', answer: 'A foible is a minor weakness or eccentricity in character',
                  options: ['A foible is a minor weakness or eccentricity in character', 'a major flaw', 'her own performance'],
                  hint: 'If stuck, review c11_eng_w_cbse_08_013 worked examples on writing analytical paragraphs — convert.',
                  misconception: 'Students treat "Speaking and Listening" as informal chat — sharing personal opinions ("I think the lady was rude") instead of textual.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['If a student defaults to opinion-sharing: (1) Pause and model the "Evidence → Claim → Question" stem: "On page 101, the.', '(3) Give a "textual anchor" checklist: every claim needs a page/line reference.', 'Practice with low-stakes 2-minute micro-discussions on single prompts before full sessions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
