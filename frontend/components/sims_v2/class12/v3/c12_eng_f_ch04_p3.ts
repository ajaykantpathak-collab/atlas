import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch04_p3: SimDef = {
    id: 'v3_c12_eng_f_ch04_p3',
    title: 'The Rattrap · Part 3/3',
    subtitle: 'A wire rattrap, a stolen thirty kronor, and a philosophy tested',
    classLevel: 12, subject: 'eng_f', topic: 'The Rattrap · Part 3/3',
    chapters: ['c12_eng_f_ch04'],
    nodeIds: ['c12_eng_f_cbse_04_013', 'c12_eng_f_cbse_04_014', 'c12_eng_f_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary critic', intro: 'A vagabond believes the whole world is a trap baited with cheese. One Christmas, someone refuses to snap it shut.', goal: 'Read The Rattrap as moral allegory — genre, symbol and the redemption arc — rather than literal realism.' },
    discovery: {
        question: '\'Once upon a time there was a man who went around selling small rattraps of wire.\' What does that fairy-tale opening secretly license the story to do?',
        options: ['Become allegory — the peddler turns Everyman, the rattrap a universal symbol, and coincidences become structure rather than flaws', 'Nothing — openings don\'t matter', 'Promise a true crime account', 'Signal a children\'s story with no depth'],
        answer: 'Become allegory — the peddler turns Everyman, the rattrap a universal symbol, and coincidences become structure rather than flaws',
        hook: 'Read this as realism and the plot looks contrived — a stranger mistaken for an old comrade, a crofter who shows his money. Read it as fable and everything locks in: a Nobel laureate\'s belief that love awakens human goodness, bait and trap as the human condition.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the ability to move beyond literal comprehension of a text to examine underlying assumptions, evaluate authorial choices, synthesize multiple textual.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the trap: follow the peddler from his cynical philosophy — the world as a rattrap baited with comforts — through the forest \'prison\' to the Christmas-Eve kindness that springs him free.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re a detective who has already gathered all the clues (plot, characters, setting) — now you must solve the case: *why did Selma Lagerlöf write this.',
            decisions: [{ prompt: 'Define "situational irony" and give one example from "The Rattrap" where the outcome contradicts the character\'s expectations.', options: [
                { text: 'Situational irony occurs when actions have an effect opposite to what was intended', outcome: 'Situational irony occurs when actions have an effect opposite to what was intended.' },
                { text: 'the peddler is ironic', outcome: 'Not quite — Students treat the rattrap metaphor as a static symbol ("it means the world is dangerous") rather.', reveals: 'students-treat-the-rattrap-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you have 3 minutes to answer a 6-mark question in your board exam: "How does the metaphor of the rattrap highlight the human predicament?" Most.',
            decisions: [{ prompt: 'What does PEEL stand for in the context of writing literature answers for CBSE Class 12?', options: [
                { text: 'PEEL stands for Point (topic sentence directly answering the question), Evidence (textual', outcome: 'PEEL stands for Point (topic sentence directly answering the question), Evidence (textual quote.' },
                { text: 'Paragraph, Example, Explain, Link', outcome: 'Not quite — Students believe writing a detailed plot summary with many quotes guarantees full marks.', reveals: 'writing-a-detailed-plot-summary' },
                { text: 'writing a detailed plot summary with many quotes guarantees full marks', outcome: 'Not quite — Students believe writing a detailed plot summary with many quotes guarantees full marks.', reveals: 'writing-a-detailed-plot-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a board exam viva or CUET interview where the examiner asks: "Discuss how a single act of kindness can transform a person — use \'The.',
            decisions: [{ prompt: 'List the four group discussion topics given in the NCERT "Talking about the text" section for "The Rattrap".', options: [
                { text: 'The four topics are: (1) Why was Edla happy to see the gift left by the peddler?', outcome: 'The four topics are: (1) Why was Edla happy to see the gift left by the peddler?' },
                { text: 'How does the peddler interpret kindness?', outcome: 'Not quite — Students believe "Speaking and Listening" means taking turns reading aloud prepared answers from.', reveals: 'speaking-and-listening-means-taking' },
                { text: 'Understanding the text', outcome: 'Not quite — Students believe "Speaking and Listening" means taking turns reading aloud prepared answers from.', reveals: 'speaking-and-listening-means-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A dhaba owner catches a hungry runaway boy pocketing bread. The staff want him handed to the police; the owner remembers how \'The Rattrap\' turns.',
            decisions: [{ prompt: 'What does the story suggest she do?', options: [
                { text: 'Meet him with dignity — food, shelter and honest trust first; Lagerlöf\'s point is that goodness awakened by kindness rehabilitates where punishment hardens.', outcome: 'The peddler became an honest man because Edla treated him like a captain, not a thief — trust is the lever that changes people.' },
                { text: 'Call the police at once — a thief is a thief, whatever his story.', outcome: 'That treats circumstance as character; the story shows the \'rattrap\' of poverty made the man, and kindness unmade it.', reveals: 'circumstance-equals-character' },
                { text: 'Slip him some money and send him on his way — problem solved without drama.', outcome: 'Cash without dignity leaves the trap shut; what changed the peddler was being trusted, not being tipped.', reveals: 'help-without-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now switch reading modes — realist to allegorist — and watch the same story become a different machine. That flexibility is what top literature marks are made of.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the ability to move beyond.',
          hint: 'If stuck, re-read the "Understanding the text" questions on NCERT pp.',
          misconception: 'Students treat the rattrap metaphor as a static symbol ("it means the world is dangerous") rather than a dynamic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the ability to move beyond literal',
                  options: ['Critical Thinking: Analysis and Interpretation is the ability to move beyond literal', '"Before You Read: Context and Background" is a preparatory literary skill that equips', 'Plot and narrative structure refers to the organized sequence of events in a story', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, re-read the "Understanding the text" questions on NCERT pp.',
                  misconception: 'Students treat the rattrap metaphor as a static symbol ("it means the world is dangerous") rather than a dynamic narrative engine that.' }
          ],
            remediations: { 'students-treat-the-rattrap-metaphor': { steps: ['Have the student create a 3-column timeline: Column A = "Metaphor Appearance" (quote + page), Column B = "Context" (who.', 'Use the crofter-manor parallel (Diagnostic Q4) as a scaffold: ask "What does each host *want* from the guest?', 'What does each *give*?" 3.', 'Re-read the forest scene aloud, pausing at "Now his own turn had come" — ask: "What \'bait\' did he touch?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck on evidence selection, review the theme node (c12_eng_f_cbse_04_006) for.',
          misconception: 'Students believe writing a detailed plot summary with many quotes guarantees full marks.',
          parts: [
                { id: 'a', prompt: 'Compare these two answers to "How is the crofter\'s loneliness portrayed?" and identify which earns higher marks: Answer A: "The crofter is lonely because.', answer: 'Answer B earns higher marks',
                  options: ['Answer B earns higher marks', 'knowing the story', 'analysing the text', 'writing a detailed plot summary with many quotes guarantees full marks'],
                  hint: 'If stuck on evidence selection, review the theme node (c12_eng_f_cbse_04_006) for thematic anchors.',
                  misconception: 'Students believe writing a detailed plot summary with many quotes guarantees full marks.' }
          ],
            remediations: { 'writing-a-detailed-plot-summary': { steps: ['If a student submits a summary-heavy answer: 1.', 'Highlight every sentence in their answer: yellow for narration (what happens), green for analysis (what it means).', 'If yellow > green, have them delete all yellow sentences and rewrite only green ones using the "So what?" prompt: "The.', '→ This reveals his loneliness makes him crave connection, blinding him to danger." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe writing a detailed plot summary with many quotes guarantees full marks.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The ironmaster is kind because he invites the peddler home. But later he gets angry when he realizes the mistake.', answer: 'The answer is incomplete (would score 2/6)',
                  options: ['The answer is incomplete (would score 2/6)', 'mistake', 'writing a detailed plot summary with many quotes guarantees full marks'],
                  hint: 'If stuck on evidence selection, review the theme node (c12_eng_f_cbse_04_006) for thematic anchors.',
                  misconception: 'Students believe writing a detailed plot summary with many quotes guarantees full marks.' }
          ],
            remediations: { 'writing-a-detailed-plot-summary': { steps: ['If a student submits a summary-heavy answer: 1.', 'Highlight every sentence in their answer: yellow for narration (what happens), green for analysis (what it means).', 'If yellow > green, have them delete all yellow sentences and rewrite only green ones using the "So what?" prompt: "The.', '→ This reveals his loneliness makes him crave connection, blinding him to danger." 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Revisit c12_eng_f_cbse_04_013 (Critical Thinking) for theme/character analysis and.',
          misconception: 'Students believe "Speaking and Listening" means taking turns reading aloud prepared answers from the comprehension.',
          parts: [
                { id: 'a', prompt: 'List the four group discussion topics given in the NCERT "Talking about the text" section for "The Rattrap".', answer: 'The four topics are: (1) Why was Edla happy to see the gift left by the peddler?',
                  options: ['The four topics are: (1) Why was Edla happy to see the gift left by the peddler?', 'How does the peddler interpret kindness?', 'Understanding the text', 'Talking about the text'],
                  hint: 'Revisit c12_eng_f_cbse_04_013 (Critical Thinking) for theme/character analysis and.',
                  misconception: 'Students believe "Speaking and Listening" means taking turns reading aloud prepared answers from the comprehension exercises.' },
                { id: 'b', prompt: 'You are the \'evidence-provider\' in a group discussing "Have you known an episode where kindness changed someone\'s view?" A peer shares a personal anecdote.', answer: '"That mirrors the peddler exactly',
                  options: ['"That mirrors the peddler exactly', 'Speaking and Listening'],
                  hint: 'Revisit c12_eng_f_cbse_04_013 (Critical Thinking) for theme/character analysis and.',
                  misconception: 'Students believe "Speaking and Listening" means taking turns reading aloud prepared answers from the comprehension exercises.' }
          ],
            remediations: { 'speaking-and-listening-means-taking': { steps: ['If a student recites memorized answers: (1) Stop them gently: "That\'s a good written answer.', 'Respond to what Rahul just said about the crofter\'s loneliness." (2) Model a 30-second impromptu response using the.', '(4) Debrief: list observed moves on board.', '(5) Re-attempt the same discussion topic with new groups, requiring each student to use at least two interaction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
