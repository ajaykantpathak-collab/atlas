import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch07_p3: SimDef = {
    id: 'v3_c11_eng_w_ch07_p3',
    title: 'Glory at Twilight (Short Story) · Part 3/3',
    subtitle: 'Watch a fallen banker\'s borrowed glory spend itself to the last rupee.',
    classLevel: 11, subject: 'eng_w', topic: 'Glory at Twilight (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch07'],
    nodeIds: ['c11_eng_w_cbse_07_013', 'c11_eng_w_cbse_07_014', 'c11_eng_w_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a reputation burn like a twilight sky', intro: 'A narrow-gauge train making unauthorised stops, a collapsed bank, and a village still expecting benediction in cash.', goal: 'Distinguish frame from flashback and locate the narrative climax of a non-linear story.' },
    discovery: {
        question: 'Satyajit\'s bank has already collapsed when the story opens on a slow train — so where can the climax possibly be?',
        options: ['At the wedding — when he signs away his house and pond for a stranger\'s dowry, the last of the glory spent', 'In the bank collapse itself, told in flashback', 'On the train, when he asks \'What now?\'', 'At the fig tree, where he finally rests'],
        answer: 'At the wedding — when he signs away his house and pond for a stranger\'s dowry, the last of the glory spent',
        hook: 'Chronological climax and narrative climax are different events — the story peaks where the pretending becomes impossible to afford.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Glory at Twilight\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_07_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the train frame from the flashbacks, order the narrative versus chronological events, and place the deed-signing as the true climax.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Glory at Twilight\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "Glory at Twilight" and how does it shape the reader\'s understanding of Satyajit\'s.', options: [
                { text: 'The story uses third-person limited perspective focused on Satyajit\'s consciousness,', outcome: 'The story uses third-person limited perspective focused on Satyajit\'s consciousness, allowing.' },
                { text: 'first-person', outcome: 'Not quite — Students often confuse *analysis* with *summary* — they retell what happens (Satyajit goes.', reveals: 'students-often-confuse-analysis-with' },
                { text: 'omniscient', outcome: 'Not quite — Students often confuse *analysis* with *summary* — they retell what happens (Satyajit goes.', reveals: 'students-often-confuse-analysis-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Glory at Twilight\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the full form of PEEL in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that "Writing Skills" for literature means writing a *summary* of the story with.', reveals: 'writing-skills-for-literature-means' },
                { text: 'Writing Skills', outcome: 'Not quite — Students believe that "Writing Skills" for literature means writing a *summary* of the story with.', reveals: 'writing-skills-for-literature-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Glory at Twilight\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'Recall the four discussion prompts from the NCERT "Talking About the Text" section for "Glory at Twilight" and state them verbatim.', options: [
                { text: 'The four prompts are: (1) "It is difficult to adjust to a fall from glory." (2) "\'Failure', outcome: 'The four prompts are: (1) "It is difficult to adjust to a fall from glory." (2) "\'Failure had.' },
                { text: 'It is difficult to adjust to a fall from glory', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat: they share personal opinions ("I feel bad.', reveals: 'students-treat-speaking-and-listening' },
                { text: '\'Failure had a tempo faster than success.\'', outcome: 'Not quite — Students treat "Speaking and Listening" as informal chat: they share personal opinions ("I feel bad.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a post-colonial fiction unit your group reads Bhabani Bhattacharya\'s \'Glory at Twilight\'. A member pitches it as \'a nostalgic story about a man remembering his glorious student days — basically a feel-good memory piece about an old Bengali village\'.',
            decisions: [{ prompt: 'What context makes the story bite rather than glow?', options: [
                { text: 'Post-independence rural Bengal\'s collapse: indigenous banking has crumbled, dowry burdens crush families, and the protagonist\'s remembered \'glory\' is set against present decline — the twilight is a civilisational dusk, not a warm sunset. The nostalgia is measuring what\'s been lost, not celebrating what was.', outcome: 'Context supplies the irony: memory\'s brightness is the yardstick for present decay — read it as feel-good and the critique evaporates.' },
                { text: 'The pitch is right — memory pieces are about warmth; social conditions are backdrop.', outcome: 'The story\'s engine is contrast: old prestige versus new precarity; without the collapse of rural economy and dowry pressure, \'glory\' has nothing to fade against.', reveals: 'memory-piece-is-feel-good' },
                { text: 'It\'s a village-idyll essay — rural Bengal as timeless, untouched paradise.', outcome: 'Bhattacharya writes the opposite: the village is being unmade by post-independence economic change; \'timeless idyll\' is the fantasy the story punctures.', reveals: 'village-as-idyll' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'The village worships a success that was born from a forger\'s crime and dies at a dowry table — the flashbacks make both ironies visible at once.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_013', difficulty: 'standard',
          question: 'Critical thinking on \'Glory at Twilight\' — analysing the text to reach.',
          hint: 'If stuck, review c11_eng_w_cbse_07_009 (Irony and Symbolism) and c11_eng_w_cbse_07_012.',
          misconception: 'Students often confuse *analysis* with *summary* — they retell what happens (Satyajit goes to village, is honored.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'Glory at Twilight\'',
                  options: ['Critical thinking on \'Glory at Twilight\'', '\'Glory at Twilight\' (Woven Words, ch', 'The plot/narrative arc of \'Glory at Twilight\'', 'The setting of \'Glory at Twilight\''],
                  hint: 'If stuck, review c11_eng_w_cbse_07_009 (Irony and Symbolism) and c11_eng_w_cbse_07_012.',
                  misconception: 'Students often confuse *analysis* with *summary* — they retell what happens (Satyajit goes to village, is honored, gives money) instead.' }
          ],
            remediations: { 'students-often-confuse-analysis-with': { steps: ['If a student produces summary instead of analysis: 1) Ask them to highlight every sentence in their answer that.', '2) If fewer than three, have them reread the "Appreciation" questions in the textbook — each requires analysis.', '3) Model one analytical paragraph using the PEEL structure: Point (Satyajit\'s impostor syndrome), Evidence (quote about.', '4) Assign a micro-task: analyze the single phrase "lingering twilight splendour of departed glory" in three sentences.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_014', difficulty: 'standard',
          question: 'Writing skills from \'Glory at Twilight\' — using the text as a model.',
          hint: 'If stuck, review **c11_eng_w_cbse_07_013 (Critical Thinking)** for the analytical.',
          misconception: 'Students believe that "Writing Skills" for literature means writing a *summary* of the story with sophisticated.',
          parts: [
                { id: 'a', prompt: 'What is the full form of PEEL in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'Writing Skills', 'lack a clear argumentative through-line'],
                  hint: 'If stuck, review **c11_eng_w_cbse_07_013 (Critical Thinking)** for the analytical frameworks.',
                  misconception: 'Students believe that "Writing Skills" for literature means writing a *summary* of the story with sophisticated vocabulary.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['**Identify the verb:** Circle the command word in the question (Analyze, Comment, Discuss, Compare).', 'If it is not "Describe" or "Summarize," a plot summary will score zero.', '**Draft the Point first:** Write *one* sentence answering the specific verb (e.g., "Bhattacharya uses the theft episode.', '**Attach Evidence:** Find the *exact* sentence/clause in the text that proves your Point (e.g., "He deserved what.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "Writing Skills" for literature means writing a *summary* of the story with sophisticated.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: *"Uncle Srinath is the villain of the story because he exploits Satyajit."* Defend or refute using textual evidence.', answer: 'Refute',
                  options: ['Refute', 'Writing Skills'],
                  hint: 'If stuck, review **c11_eng_w_cbse_07_013 (Critical Thinking)** for the analytical frameworks.',
                  misconception: 'Students believe that "Writing Skills" for literature means writing a *summary* of the story with sophisticated vocabulary.' }
          ],
            remediations: { 'writing-skills-for-literature-means': { steps: ['**Identify the verb:** Circle the command word in the question (Analyze, Comment, Discuss, Compare).', 'If it is not "Describe" or "Summarize," a plot summary will score zero.', '**Draft the Point first:** Write *one* sentence answering the specific verb (e.g., "Bhattacharya uses the theft episode.', '**Attach Evidence:** Find the *exact* sentence/clause in the text that proves your Point (e.g., "He deserved what.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_07_015', difficulty: 'standard',
          question: 'Discussion points on \'Glory at Twilight\' — speaking and listening around the.',
          hint: 'If stuck, review the "Critical Thinking: Analysis and Interpretation" node.',
          misconception: 'Students treat "Speaking and Listening" as informal chat: they share personal opinions ("I feel bad for Satyajit").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Glory at Twilight\'',
                  options: ['Discussion points on \'Glory at Twilight\'', '\'Glory at Twilight\' (Woven Words, ch', 'The plot/narrative arc of \'Glory at Twilight\'', 'The setting of \'Glory at Twilight\''],
                  hint: 'If stuck, review the "Critical Thinking: Analysis and Interpretation" node (c11_eng_w_cbse_07_013).',
                  misconception: 'Students treat "Speaking and Listening" as informal chat: they share personal opinions ("I feel bad for Satyajit") without textual.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['Have the student re-read the four NCERT discussion prompts and underline key terms (e.g., "adjust," "tempo,".', 'For each prompt, ask them to find ONE sentence from the story that directly relates — write it on a sticky note.', 'Practice the "Evidence-Claim-Warrant" oral frame: "The text says [quote]... This shows [claim]... Because [reasoning]."', 'Run a 3-minute timed practice where they must use the frame twice before adding a new idea.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
