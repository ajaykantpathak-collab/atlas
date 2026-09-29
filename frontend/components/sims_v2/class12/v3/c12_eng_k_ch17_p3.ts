import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch17_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch17_p3: SimDef = {
    id: 'v3_c12_eng_k_ch17_p3',
    title: 'Why the Novel Matters (Non-fiction) · Part 3/3',
    subtitle: 'The saint gets the soul, the scientist the body — the novelist gets the whole hog',
    classLevel: 12, subject: 'eng_k', topic: 'Why the Novel Matters (Non-fiction) · Part 3/3',
    chapters: ['c12_eng_k_ch17'],
    nodeIds: ['c12_eng_k_cbse_17_013', 'c12_eng_k_cbse_17_014', 'c12_eng_k_cbse_17_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary manifesto reader', intro: 'A miner\'s son with a teacher\'s ambition inside him declares war on everything that chops a human into parts.', goal: 'Grasp Lawrence\'s claim that the novel alone serves the \'whole man alive\' and why aliveness outranks abstraction.' },
    discovery: {
        question: 'Saints feed the soul, scientists probe the body, philosophers sharpen the mind — yet Lawrence crowns the novelist above all of them. On what grounds?',
        options: ['Whole beats part — each specialist masters one fragment of a person; only the novel engages the \'whole man alive,\' body, senses and contradictions together', 'Novels are more popular', 'Novelists are better writers', 'Saints are useless'],
        answer: 'Whole beats part — each specialist masters one fragment of a person; only the novel engages the \'whole man alive,\' body, senses and contradictions together',
        hook: '\'Man alive\' isn\'t a casual phrase — it\'s Lawrence\'s term for the integrated, sensing, contradictory organism, opposed to the \'dead man in life\' who runs on fixed ideas. And books themselves are \'tremulations on the ether\': dead vibrations until a living reader quivers into response.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Why the Novel Matters\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_17_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Fight the fragmenters: pit the novel against soul, mind and mechanism, decode what \'tremulations on the ether\' means for every book you\'ll ever read, and test Lawrence\'s war on absolutes.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Why the Novel Matters\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is Lawrence\'s central objection to the traditional view of humans as "a body with a spirit/soul/mind in it"?', options: [
                { text: 'Lawrence objects to the dualistic separation of body and spirit/soul/mind, arguing it', outcome: 'Lawrence objects to the dualistic separation of body and spirit/soul/mind, arguing it reduces the.' },
                { text: 'Lawrence hates religion', outcome: 'Not quite — Students routinely treat Lawrence\'s essay as a *defense of the novel as a genre* (like a book.', reveals: 'students-routinely-treat-lawrence-s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Why the Novel Matters\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the central metaphor Lawrence uses to describe books, and what does it imply about the relationship between text and reader?', options: [
                { text: 'The central metaphor is "tremulations on the ether"', outcome: 'The central metaphor is "tremulations on the ether" — books are vibrations transmitted through.' },
                { text: 'books are mirrors of life', outcome: 'Not quite — Students treat Lawrence\'s essay as a set of quotable opinions ("novels are better than philosophy").', reveals: 'students-treat-lawrence-s-essay' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Why the Novel Matters\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the two specific discussion prompts given in the NCERT "Talking about the Text" section for this essay?', options: [
                { text: 'The two prompts are: (1) Characters should be true to themselves (integrity) rather than', outcome: 'The two prompts are: (1) Characters should be true to themselves (integrity) rather than.' },
                { text: 'discussion', outcome: 'Not quite — Students think "discussion" means sharing opinions about whether they *liked* the essay.', reveals: 'discussion-means-sharing-opinions-about' },
                { text: 'personal response', outcome: 'Not quite — Students think "discussion" means sharing opinions about whether they *liked* the essay.', reveals: 'discussion-means-sharing-opinions-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A health app tells a student \'we know you better than you know yourself — your sleep score, glucose and screen time say who you are.\'',
            decisions: [{ prompt: 'What would Lawrence\'s \'man alive\' answer?', options: [
                { text: 'The metrics are parts — useful shadows of him, but the whole living, contradictory, changing person is greater than any dashboard; use the data without being reduced to it.', outcome: 'Lawrence\'s \'I am greater than my soul\' logic applies: the finger, the gland, the score are fragments of \'man alive\', never the sum.' },
                { text: 'True — the numbers are the person, finally measured.', outcome: 'That\'s exactly the reductionism Lawrence attacks: a part claiming to be the whole produces a \'man dead in life\'.', reveals: 'parts-equal-whole' },
                { text: 'Delete it — since no data can capture him, all metrics are worthless.', outcome: 'Anti-reductionism isn\'t anti-data; parts are still informative about the parts.', reveals: 'anti-reduction-is-anti-data' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_17_015', title: 'You made it',
          caseStudy: { intro: 'You can now defend the novel as a philosophy of aliveness — not entertainment. Lawrence turns literary preference into an argument about what a human being is.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_013', difficulty: 'standard',
          question: 'Critical thinking on \'Why the Novel Matters\' — analysing the text to reach.',
          hint: 'If stuck, return to c12_eng_k_cbse_17_006 (Theme: Primary Theme) and re-identify the.',
          misconception: 'Students routinely treat Lawrence\'s essay as a *defense of the novel as a genre* (like a book review) rather than.',
          parts: [
                { id: 'a', prompt: 'Explain the metaphor of "tremulations on the ether." How does Lawrence distinguish between books in general and the novel specifically using this metaphor?', answer: '"Tremulations on the ether" refers to vibrations/waves (like radio signals)',
                  options: ['"Tremulations on the ether" refers to vibrations/waves (like radio signals)', 'tremulation', 'writing style'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_006 (Theme: Primary Theme) and re-identify the thesis as.',
                  misconception: 'Students routinely treat Lawrence\'s essay as a *defense of the novel as a genre* (like a book review) rather than a *philosophical.' }
          ],
            remediations: { 'students-routinely-treat-lawrence-s': { steps: ['If a student cannot distinguish Lawrence\'s philosophical thesis from a literary opinion: (1) Have them reread.', 'If you\'re a philosopher...', 'If you\'re a scientist") and list the *epistemological claim* each figure makes (parson: soul knows; philosopher: pure.', '(2) Ask: "What does Lawrence say *knows*?" Answer: "My body, me alive, knows." (3) Have them rewrite the thesis in this.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_014', difficulty: 'standard',
          question: 'Writing skills from \'Why the Novel Matters\' — using the text as a model.',
          hint: 'If stuck, return to c12_eng_k_cbse_17_006 (primary theme) and c12_eng_k_cbse_17_013.',
          misconception: 'Students treat Lawrence\'s essay as a set of quotable opinions ("novels are better than philosophy") rather than.',
          parts: [
                { id: 'a', prompt: 'What is the central metaphor Lawrence uses to describe books, and what does it imply about the relationship between text and reader?', answer: 'The central metaphor is "tremulations on the ether"',
                  options: ['The central metaphor is "tremulations on the ether"', 'books are mirrors of life'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_006 (primary theme) and c12_eng_k_cbse_17_013 (critical.',
                  misconception: 'Students treat Lawrence\'s essay as a set of quotable opinions ("novels are better than philosophy") rather than a structured philosophical.' }
          ],
            remediations: { 'students-treat-lawrence-s-essay': { steps: ['If a student\'s practice answer is a quote collage: (1) Have them highlight every sentence that is *their own analysis*.', '*textual evidence* — aim for 60% analysis.', '(2) Make them rewrite the answer using only *one* quote, forcing explanation of its significance.', '(3) Give them the "Lawrence\'s Argument Map" template: Claim → Evidence 1 + Explanation → Evidence 2 + Explanation →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_015', difficulty: 'standard',
          question: 'Discussion points on \'Why the Novel Matters\' — speaking and listening around.',
          hint: 'If stuck, return to c12_eng_k_cbse_17_013 (Critical Thinking) and re-do the "integrity.',
          misconception: 'Students think "discussion" means sharing opinions about whether they *liked* the essay.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words what Lawrence means by "integrity" versus "consistency" in a novel\'s characters, using the lover/pepper-pot analogy.', answer: 'Integrity means a character remains whole and responsive to change',
                  options: ['Integrity means a character remains whole and responsive to change', 'discussion', 'personal response', 'text-based literary discussion'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_013 (Critical Thinking) and re-do the "integrity.',
                  misconception: 'Students think "discussion" means sharing opinions about whether they *liked* the essay.' }
          ],
            remediations: { 'discussion-means-sharing-opinions-about': { steps: ['If a student cannot move beyond opinion: (1) Have them re-read the two prompts and underline every textual reference.', '(2) Assign a 5-minute writing: "What specific passage proves Lawrence values integrity over consistency?" (3) Pair them.', '(4) Re-diagnose using Diagnostic Question 3 — require a textual quote and Lawrence\'s definition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_17_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "discussion" means sharing opinions about whether they *liked* the essay.',
          parts: [
                { id: 'a', prompt: 'Create a 2-minute opening statement for a discussion on Prompt 2 that: (a) states the distinction, (b) quotes one phrase from Lawrence and one from Ruskin, (c).', answer: 'Strong answer: "Lawrence says \'Books are not life',
                  options: ['Strong answer: "Lawrence says \'Books are not life', 'discussion', 'personal response', 'text-based literary discussion'],
                  hint: 'If stuck, return to c12_eng_k_cbse_17_013 (Critical Thinking) and re-do the "integrity.',
                  misconception: 'Students think "discussion" means sharing opinions about whether they *liked* the essay.' }
          ],
            remediations: { 'discussion-means-sharing-opinions-about': { steps: ['If a student cannot move beyond opinion: (1) Have them re-read the two prompts and underline every textual reference.', '(2) Assign a 5-minute writing: "What specific passage proves Lawrence values integrity over consistency?" (3) Pair them.', '(4) Re-diagnose using Diagnostic Question 3 — require a textual quote and Lawrence\'s definition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
