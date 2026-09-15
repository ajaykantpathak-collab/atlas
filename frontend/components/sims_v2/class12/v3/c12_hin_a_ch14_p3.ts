import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p3: SimDef = {
    id: 'v3_c12_hin_a_ch14_p3',
    title: 'vlxj otkgr · Part 3/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'vlxj otkgr · Part 3/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_013', 'c12_hin_a_cbse_14_014', 'c12_hin_a_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of actively examining a text\'s explicit and implicit meanings, evaluating the author\'s craft choices (structure, language.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you get a board question: "How does the story \'igpku\' expose the psychology of power?',
            decisions: [{ prompt: 'Define the PEEL structure for literature answers and state what each letter stands for.', options: [
                { text: 'PEEL stands for: **P**oint (topic sentence stating your argument), **E**vidence (specific', outcome: 'PEEL stands for: **P**oint (topic sentence stating your argument), **E**vidence (specific textual.' },
                { text: 'PEEL means Point, Example, Explain, Link', outcome: 'Not quite — **Misconception:** "Writing a good answer means memorizing 3-4 \'important points\' per story and.', reveals: 'misconception-writing-a-good-answer' },
                { text: 'Example', outcome: 'Not quite — **Misconception:** "Writing a good answer means memorizing 3-4 \'important points\' per story and.', reveals: 'misconception-writing-a-good-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college interview where the panel asks: "This story about a king making people cover their ears — what does it say about power today?" You.',
            decisions: [{ prompt: 'What is the primary purpose of the "Speaking and Listening: Discussion Points" section in the CBSE Class 12 Hindi Antra curriculum?', options: [
                { text: 'The primary purpose is to assess students\' ability to orally articulate literary', outcome: 'The primary purpose is to assess students\' ability to orally articulate literary analysis, actively.' },
                { text: 'to test memory of plot points', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions about the story\'s moral.', reveals: 'discussion-means-taking-turns-stating' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions about the story\'s moral.', reveals: 'discussion-means-taking-turns-stating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of actively.',
          hint: 'If unable to generate a claim, use the "Three-Question Heuristic" on any passage: (1).',
          misconception: 'Students equate "critical thinking" with "finding hidden symbols" and produce over-readings (e.g., "The head in \'ksj.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis is the disciplined process of actively examining a',
                  options: ['Critical thinking in literary analysis is the disciplined process of actively examining a', 'This node provides the essential biographical, historical, and literary context for the', 'Plot and Narrative Structure refers to the deliberate arrangement of events in a story', 'Setting and atmosphere refer to the time, place, physical environment, and emotional mood'],
                  hint: 'If unable to generate a claim, use the "Three-Question Heuristic" on any passage: (1) What.',
                  misconception: 'Students equate "critical thinking" with "finding hidden symbols" and produce over-readings (e.g., "The head in \'ksj represents the Indian.' }
          ],
            remediations: { 'students-equate-critical-thinking-with': { steps: ['Return to c12_hin_a_cbse_14_012 (Comprehension) and re-read the four stories with a *single* analytical lens: "Where.', 'For each crack, write: "Text says X, but implies Y because Z." 3.', 'Re-attempt Diagnostic Question 4 using this template.', 'If still stuck, review Class 11 node c11_hin_ar_cbse_14_013 for the "Text-Implication-Warrant" framework.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to compose.',
          hint: 'If stuck on evidence-finding: Revisit c12_hin_a_cbse_14_012 (Comprehension) and practice.',
          misconception: '**Misconception:** "Writing a good answer means memorizing 3-4 \'important points\' per story and reproducing them.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing Skills based on the chapter refers to the ability to compose structured,',
                  options: ['Writing Skills based on the chapter refers to the ability to compose structured,', 'This node provides the essential biographical, historical, and literary context for the', 'Plot and Narrative Structure refers to the deliberate arrangement of events in a story', 'Setting and atmosphere refer to the time, place, physical environment, and emotional mood'],
                  hint: 'If stuck on evidence-finding: Revisit c12_hin_a_cbse_14_012 (Comprehension) and practice "Quote.',
                  misconception: '**Misconception:** "Writing a good answer means memorizing 3-4 \'important points\' per story and reproducing them." **Why it\'s wrong:** CBSE.' }
          ],
            remediations: { 'misconception-writing-a-good-answer': { steps: ['**Diagnose:** Give the student a past board question (e.g., 2023: "How does irony function in \'igpku\'?").', 'Ask them to write a PEEL paragraph in 10 minutes.', '**Identify gap:** If they write plot summary → drill **Point-writing**: Convert 5 theme statements into argumentative.', 'If they lack evidence → drill **Quote-mining**: Give 3 questions; they must find 2 exact lines per question in 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, revisit c12_hin_a_cbse_14_013 Step 3: "Convert your written claim into.',
          misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of the "Speaking and Listening: Discussion Points" section in the CBSE Class 12 Hindi Antra curriculum?', answer: 'The primary purpose is to assess students\' ability to orally articulate literary',
                  options: ['The primary purpose is to assess students\' ability to orally articulate literary', 'to test memory of plot points', 'discussion', '"discussion" means taking turns stating opinions about the story\'s moral'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_14_013 Step 3: "Convert your written claim into a one-sentence.',
                  misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.' },
                { id: 'b', prompt: 'During a discussion on \'pkj gkFk\', a peer argues: "The shepherd was foolish to ask experts how many legs a sheep has." Using the "Claim-Evidence-Question".', answer: 'Response: "I agree the shepherd\'s literal question seems absurd (Claim)',
                  options: ['Response: "I agree the shepherd\'s literal question seems absurd (Claim)', 'discussion', '"discussion" means taking turns stating opinions about the story\'s moral'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_14_013 Step 3: "Convert your written claim into a one-sentence.',
                  misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.' },
                { id: 'c', prompt: 'Compare how \'ksj\' and \'lk>k\' use animal protagonists to critique human systems.', answer: 'Similarity: Both use repetitive questioning cycles (donkey asked by',
                  options: ['Similarity: Both use repetitive questioning cycles (donkey asked by', 'discussion', '"discussion" means taking turns stating opinions about the story\'s moral'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_14_013 Step 3: "Convert your written claim into a one-sentence.',
                  misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.' }
          ],
            remediations: { 'discussion-means-taking-turns-stating': { steps: ['If a student defaults to opinion-sharing: (1) Pause the discussion and model the "Claim-Evidence-Question" move using.', 'Evidence: \'ngkM+dj [kM+k gks x;k\' appears only when questioned.', 'Question: What does this timing suggest?").', '(2) Assign the student the "Evidence Tracker" role for the next round — they must silently note one textual reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.',
          parts: [
                { id: 'a', prompt: 'Evaluate this discussion contribution: "In \'igpku\', the king is just like Hitler.', answer: 'Weak',
                  options: ['Weak', 'discussion', '"discussion" means taking turns stating opinions about the story\'s moral'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_14_013 Step 3: "Convert your written claim into a one-sentence.',
                  misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.' },
                { id: 'b', prompt: 'Create an original discussion prompt for \'pkj gkFk\' that requires participants to connect the story\'s bureaucratic satire to a contemporary Indian governance.', answer: 'Prompt: "The shepherd\'s sheep already had four legs',
                  options: ['Prompt: "The shepherd\'s sheep already had four legs', 'discussion', '"discussion" means taking turns stating opinions about the story\'s moral'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_14_013 Step 3: "Convert your written claim into a one-sentence.',
                  misconception: 'Students believe "discussion" means taking turns stating opinions about the story\'s moral.' }
          ],
            remediations: { 'discussion-means-taking-turns-stating': { steps: ['If a student defaults to opinion-sharing: (1) Pause the discussion and model the "Claim-Evidence-Question" move using.', 'Evidence: \'ngkM+dj [kM+k gks x;k\' appears only when questioned.', 'Question: What does this timing suggest?").', '(2) Assign the student the "Evidence Tracker" role for the next round — they must silently note one textual reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
