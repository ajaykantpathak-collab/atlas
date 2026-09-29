import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch27_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch27_p3: SimDef = {
    id: 'v3_c11_eng_w_ch27_p3',
    title: 'My Watch (Essay) · Part 3/3',
    subtitle: 'Watch a perfect watch get repaired to death, one expert at a time.',
    classLevel: 11, subject: 'eng_w', topic: 'My Watch (Essay) · Part 3/3',
    chapters: ['c11_eng_w_ch27'],
    nodeIds: ['c11_eng_w_cbse_27_013', 'c11_eng_w_cbse_27_014', 'c11_eng_w_cbse_27_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader charting a comedy of accumulated incompetence', intro: 'Eighteen months of perfect timekeeping — then one regulation too many, and seven specialists standing between a man and the correct time.', goal: 'Analyse the essay\'s episodic structure and the satiric work of its open ending.' },
    discovery: {
        question: 'Seven watchmakers \'fix\' Twain\'s watch and each leaves it worse. Where does this escalating farce actually climax?',
        options: ['At the seventh — a former steamboat engineer who destroys the watch completely', 'At the first repair — the original mistake that starts it all', 'There is none — episodes merely repeat', 'At the purchase of the cheap new watch'],
        answer: 'At the seventh — a former steamboat engineer who destroys the watch completely',
        hook: 'It\'s episodic, not linear — the same disaster loops with variations, and the comedy is that expertise itself becomes the hazard.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Bridges\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_27_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Chart the repair-hope-failure episodes, place the steamboat engineer\'s finale, and defend why buying a cheap watch beats a \'fixed\' ending.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Bridges\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the central irony in Mark Twain\'s "My Watch"?', options: [
                { text: 'The central irony is that every attempt to repair the watch', outcome: 'The central irony is that every attempt to repair the watch — by supposedly skilled professionals.' },
                { text: 'the watch was broken', outcome: 'Not quite — Students often treat "My Watch" as merely a humorous anecdote about a broken watch, missing that.', reveals: 'students-often-treat-my-watch' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Bridges\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means reproducing memorized answers to the.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means reproducing memorized answers to the.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Bridges\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the four discussion prompts given in the NCERT "Talking About the Text" section for the essay "Bridges"?', options: [
                { text: 'The four prompts are: (1) "Exceptionally talented people are born so; talent cannot be', outcome: 'The four prompts are: (1) "Exceptionally talented people are born so; talent cannot be cultivated.".' },
                { text: 'Exceptionally talented people are born so', outcome: 'Not quite — Students treat "discussion" as "sharing opinions in turn" rather than "collaborative meaning-making.', reveals: 'students-treat-discussion-as-sharing' },
                { text: 'Discipline and a questioning spirit can coexist in an individual', outcome: 'Not quite — Students treat "discussion" as "sharing opinions in turn" rather than "collaborative meaning-making.', reveals: 'students-treat-discussion-as-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a memoir-writing workshop you\'re comparing two essays from your syllabus: Lakhia\'s \'Bridges\', where a Kathak dancer turns life episodes into choreography, and Twain\'s \'My Watch\', where each repair makes the watch worse. A fellow participant calls both \'just chronological life stories with a beginning, middle and end.\'',
            decisions: [{ prompt: 'What\'s a sharper description of how these essays are built?', options: [
                { text: 'Name the real structures: \'Bridges\' is reflective autobiography — episodes selected because they become choreographic material, linking guru-shishya discipline to artistic creation. \'My Watch\' is episodic and circular — a repeating loop of hope → repair → brief success → worse failure, where the pile-up of the same disaster IS the humour and the trapped frustration.', outcome: 'Chronology is the raw material, not the structure: one essay builds bridges between life and art, the other spins in a comic trap of repetition.' },
                { text: 'Agree — both run in time order, so both have a linear plot.', outcome: 'Time order isn\'t linear structure: \'My Watch\' repeats circular episodes that don\'t build to a single climax — the repetition is the design.', reveals: 'chronological-equals-linear' },
                { text: 'Focus on facts instead — Lakhia\'s birth year and awards, Twain\'s biography — since structure is too subtle to discuss.', outcome: 'Context is a lens, not data: knowing Lakhia choreographed Umrao Jaan explains the essay\'s cinematic eye; a birth year explains nothing.', reveals: 'context-is-trivia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_27_015', title: 'You made it',
          caseStudy: { intro: 'He ends not with a repaired watch but a cheap new one — the open ending seals the satire: incompetence wins, resignation is the punchline.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_013', difficulty: 'standard',
          question: 'Critical thinking on \'Bridges\' — analysing the text to reach evidence-based.',
          hint: 'If stuck, return to c11_eng_w_cbse_27_009 (Irony and Symbolism) and re-do the exercise.',
          misconception: 'Students often treat "My Watch" as merely a humorous anecdote about a broken watch, missing that Twain uses the watch.',
          parts: [
                { id: 'a', prompt: 'What is the central irony in Mark Twain\'s "My Watch"?', answer: 'The central irony is that every attempt to repair the watch',
                  options: ['The central irony is that every attempt to repair the watch', 'the watch was broken'],
                  hint: 'If stuck, return to c11_eng_w_cbse_27_009 (Irony and Symbolism) and re-do the exercise mapping each.',
                  misconception: 'Students often treat "My Watch" as merely a humorous anecdote about a broken watch, missing that Twain uses the watch as an extended.' }
          ],
            remediations: { 'students-often-treat-my-watch': { steps: ['If a student is stuck at literal comprehension: 1) Have them create a two-column chart: "What the watchmakers say/do".', '"What actually happens to the watch" — this visualizes the irony pattern.', '2) Ask them to identify three moments where the narrator *could* have walked away but didn\'t — this reveals character.', '3) Assign a micro-writing: "Rewrite the last paragraph from the watch\'s perspective" — this forces metaphorical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_014', difficulty: 'standard',
          question: 'Writing skills from \'Bridges\' — using the text as a model or springboard for.',
          hint: 'If stuck, review the "Appreciation" questions in the NCERT textbook for "Bridges" and.',
          misconception: 'Students believe "writing skills based on the chapter" means reproducing memorized answers to the NCERT exercise.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'writing skills based on the chapter', 'confusion as creative catalyst'],
                  hint: 'If stuck, review the "Appreciation" questions in the NCERT textbook for "Bridges" and practice.',
                  misconception: 'Students believe "writing skills based on the chapter" means reproducing memorized answers to the NCERT exercise questions.' },
                { id: 'b', prompt: 'Explain in your own words why simply summarizing the plot of "Bridges" would earn low marks in a Class 11 board exam question asking for "critical.', answer: 'Summarizing only retells *what* happens',
                  options: ['Summarizing only retells *what* happens', 'writing skills based on the chapter', 'confusion as creative catalyst'],
                  hint: 'If stuck, review the "Appreciation" questions in the NCERT textbook for "Bridges" and practice.',
                  misconception: 'Students believe "writing skills based on the chapter" means reproducing memorized answers to the NCERT exercise questions.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Show the student a board exam question *not* in the NCERT exercises (e.g., "Analyze how Lakhia uses hunger as.', 'Ask them to list three textual moments of hunger (literal and metaphorical).', 'Guide them to write one PEEL paragraph for each moment.', 'Have them swap paragraphs with a peer to check: Does each have a clear Point?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_27_015', difficulty: 'standard',
          question: 'Discussion points on \'Bridges\' — speaking and listening around the text.',
          hint: 'If stuck, review c11_eng_w_cbse_27_013 (Critical Thinking) for interpretive frameworks.',
          misconception: 'Students treat "discussion" as "sharing opinions in turn" rather than "collaborative meaning-making through textual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Bridges\'',
                  options: ['Discussion points on \'Bridges\'', '\'Bridges\' (Woven Words, ch', 'The plot/narrative arc of \'Bridges\'', 'The setting of \'Bridges\''],
                  hint: 'If stuck, review c11_eng_w_cbse_27_013 (Critical Thinking) for interpretive frameworks and.',
                  misconception: 'Students treat "discussion" as "sharing opinions in turn" rather than "collaborative meaning-making through textual evidence." They speak.' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['If a student defaults to opinion-sharing: (1) Pause the discussion and model the "evidence sandwich": "In paragraph.', '(3) Require each speaker to explicitly reference the previous speaker\'s point before adding their own ("Building.', '(4) Debrief: "What textual tension did we uncover that we wouldn\'t have seen alone?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
