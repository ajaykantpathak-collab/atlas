import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch03_p3: SimDef = {
    id: 'v3_c11_eng_s_ch03_p3',
    title: 'Mother\'s Day · Part 3/3',
    subtitle: 'Read a body-swap as enacted resolve, and an ending as negotiated truce.',
    classLevel: 11, subject: 'eng_s', topic: 'Mother\'s Day · Part 3/3',
    chapters: ['c11_eng_s_ch03'],
    nodeIds: ['c11_eng_s_cbse_03_013', 'c11_eng_s_cbse_03_014', 'c11_eng_s_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a dramatist watching a suburban mother revolt politely', intro: 'A meek mother starts smoking, insults her daughter\'s boyfriend and exposes \'Pompy-ompy Pearson\' — something has clearly swapped.', goal: 'Analyse the play\'s escalating confrontations and evaluate its comedic resolution.' },
    discovery: {
        question: 'Mrs. Pearson gets her family to play rummy and share the chores — is the mother\'s exploitation actually solved?',
        options: ['No — it\'s a comedic compromise; the family clusters round her again, the structure intact with slightly better manners', 'Yes — shared chores permanently fix the power imbalance', 'Yes — the spell changed the family for good', 'No — because the swap was never real'],
        answer: 'No — it\'s a comedic compromise; the family clusters round her again, the structure intact with slightly better manners',
        hook: 'The body-swap isn\'t magic solving a problem — it\'s the visible shape of a decision: \'this is where your foot goes down.\'',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its surface meaning to evaluate themes, character motivations, authorial techniques, and socio-cultural context, forming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Rank the three confrontations — Doris, Cyril, George — on the rising curve, and judge whether the second swap earns the ending.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you open your Class 11 English exam and see: "Write a diary entry for Mrs.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of structured answer writing for CBSE Class 11 English?', options: [
                { text: 'PEEL stands for Point (topic sentence), Evidence (textual quote or specific detail),', outcome: 'PEEL stands for Point (topic sentence), Evidence (textual quote or specific detail), Explanation.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means retelling the story in a different.', reveals: 'writing-skills-based-on-the' },
                { text: 'Writing Skills based on the chapter', outcome: 'Not quite — Students believe "Writing Skills based on the chapter" means retelling the story in a different.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine your family is deciding who cleans up after a festival dinner — the same two people always end up doing it while others relax.',
            decisions: [{ prompt: 'What is the primary social issue raised in "Mother\'s Day" that the discussion points ask students to evaluate?', options: [
                { text: 'The primary issue is the unequal distribution of domestic labor and the lack of', outcome: 'The primary issue is the unequal distribution of domestic labor and the lack of appreciation for.' },
                { text: 'the play is about fortune-telling', outcome: 'Not quite — Students believe a "discussion" means everyone politely sharing opinions without disagreement.', reveals: 'a-discussion-means-everyone-politely' },
                { text: 'discussion', outcome: 'Not quite — Students believe a "discussion" means everyone politely sharing opinions without disagreement.', reveals: 'a-discussion-means-everyone-politely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama society stages \'Mother\'s Day\' and a reviewer from the school paper writes: \'A timeless family comedy — the 1950s setting and Priestley\'s politics are irrelevant background; the play works identically in any era.\'',
            decisions: [{ prompt: 'Is the context really irrelevant?', options: [
                { text: 'No — the play is a pointed critique of 1950s suburban gender roles: Mrs Pearson\'s invisible labour (serving, ironing, never thanked) reflects the era\'s \'ideal\' housewife ideal, and Priestley\'s socialist concern for ordinary voices drives the satire. The one-act structure compresses the rebellion into one afternoon — genre, era and ideology are doing the work, not just the jokes.', outcome: 'Context here includes genre conventions and authorial stance — strip them and the play reads as quirky fantasy instead of social critique.' },
                { text: 'The reviewer is right — a good play transcends its setting; context is for historians.', outcome: 'Without 1950s gender norms the family\'s entitlement looks generic rather than systemic; the play\'s bite depends on recognising the \'ideal mother\' it\'s mocking.', reveals: 'context-is-optional' },
                { text: 'Context only means the playwright\'s birth year and the date of writing — the social conditions don\'t count.', outcome: 'Context is the living environment — wage roles, gender expectations, genre rules — that shapes every character\'s behaviour; dates alone illuminate nothing.', reveals: 'context-means-dates-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'The magic never fixed anything; it only let everyone watch what Mrs. Pearson\'s foot finally going down looks like.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, review Theme: Primary and Secondary (006, 007) and Literary Devices: Irony and.',
          misconception: 'Students often equate "critical analysis" with "finding faults." They write: "The play is unrealistic because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves examining a text beyond its surface',
                  options: ['Critical thinking in literary analysis involves examining a text beyond its surface', '"Before You Read: Context and Background" refers to the essential historical, social, and', 'Plot and narrative structure in drama refers to the organized sequence of events and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, review Theme: Primary and Secondary (006, 007) and Literary Devices: Irony and Symbolism.',
                  misconception: 'Students often equate "critical analysis" with "finding faults." They write: "The play is unrealistic because body-swaps don\'t happen".' }
          ],
            remediations: { 'students-often-equate-critical-analysis': { steps: ['Ask the student to list three things Mrs.', 'Pearson does *differently* after the swap (smokes, refuses tea, insults Charlie Spence, demands manners).', 'For each, ask: "What does this action *reveal* about the family\'s normal routine?" 3.', 'Then ask: "Why does Priestley need a magic spell to make her do these things?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "Mother\'s Day" refers to the ability.',
          hint: 'Review the PEEL method using a simple non-literary example (e.g., "School uniforms should.',
          misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in a different format (e.g., a diary.',
          parts: [
                { id: 'a', prompt: 'Explain why a character sketch of Mrs. Pearson *must* include her transformation after the personality swap, not just her initial "worried-looking" and.', answer: 'The play\'s central arc is Mrs',
                  options: ['The play\'s central arc is Mrs', 'Writing Skills based on the chapter', 'Forty-hour week for all now'],
                  hint: 'Review the PEEL method using a simple non-literary example (e.g., "School uniforms should.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in a different format (e.g., a diary entry that summarizes.' },
                { id: 'b', prompt: 'Write a 50-word diary entry for Cyril Pearson on the night of the swap, capturing his confusion and growing awareness of his mother\'s labour.', answer: '*Sample answer:* "March 15',
                  options: ['*Sample answer:* "March 15', 'Writing Skills based on the chapter', 'Forty-hour week for all now'],
                  hint: 'Review the PEEL method using a simple non-literary example (e.g., "School uniforms should.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in a different format (e.g., a diary entry that summarizes.' },
                { id: 'c', prompt: 'Analyse how the stage direction "Mrs Pearson is a pleasant but worried-looking woman in her forties.', answer: 'The physical contrast (pleasant/worried vs',
                  options: ['The physical contrast (pleasant/worried vs', 'Writing Skills based on the chapter', 'Forty-hour week for all now'],
                  hint: 'Review the PEEL method using a simple non-literary example (e.g., "School uniforms should.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in a different format (e.g., a diary entry that summarizes.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Show the student a side-by-side comparison: a plot-summary diary entry vs.', 'an analytical one (same events, different focus).', 'Have them highlight every sentence in their draft that is *not* a direct reaction/feeling/analysis — delete those.', 'Practice "Evidence Hunting": give them a question (e.g., "Show Doris\'s selfishness") and have them find *exact lines*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in a different format (e.g., a diary.',
          parts: [
                { id: 'a', prompt: 'Create an alternate ending for the play where Mrs. Fitzgerald *refuses* to swap back, forcing Mrs. Pearson (in Mrs.', answer: '*Sample:* MRS FITZGERALD (as Mrs',
                  options: ['*Sample:* MRS FITZGERALD (as Mrs', 'Writing Skills based on the chapter', 'Forty-hour week for all now'],
                  hint: 'Review the PEEL method using a simple non-literary example (e.g., "School uniforms should.',
                  misconception: 'Students believe "Writing Skills based on the chapter" means retelling the story in a different format (e.g., a diary entry that summarizes.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Show the student a side-by-side comparison: a plot-summary diary entry vs.', 'an analytical one (same events, different focus).', 'Have them highlight every sentence in their draft that is *not* a direct reaction/feeling/analysis — delete those.', 'Practice "Evidence Hunting": give them a question (e.g., "Show Doris\'s selfishness") and have them find *exact lines*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_03_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Review the "Critical Thinking: Analysis and Interpretation" node (c11_eng_s_cbse_03_013).',
          misconception: 'Students believe a "discussion" means everyone politely sharing opinions without disagreement.',
          parts: [
                { id: 'a', prompt: 'What is the primary social issue raised in "Mother\'s Day" that the discussion points ask students to evaluate?', answer: 'The primary issue is the unequal distribution of domestic labor and the lack of',
                  options: ['The primary issue is the unequal distribution of domestic labor and the lack of', 'the play is about fortune-telling', 'discussion', 'a "discussion" means everyone politely sharing opinions without disagreement'],
                  hint: 'Review the "Critical Thinking: Analysis and Interpretation" node (c11_eng_s_cbse_03_013) and.',
                  misconception: 'Students believe a "discussion" means everyone politely sharing opinions without disagreement.' },
                { id: 'b', prompt: 'During a group discussion, a peer claims: "Mrs. Fitzgerald\'s magic trick solves everything — the family changes permanently." Using the text, how would you.', answer: 'The play ends with Mrs',
                  options: ['The play ends with Mrs', 'discussion', 'a "discussion" means everyone politely sharing opinions without disagreement'],
                  hint: 'Review the "Critical Thinking: Analysis and Interpretation" node (c11_eng_s_cbse_03_013) and.',
                  misconception: 'Students believe a "discussion" means everyone politely sharing opinions without disagreement.' }
          ],
            remediations: { 'a-discussion-means-everyone-politely': { steps: ['Model a "fishbowl" discussion: 4 students debate a prompt while others observe and map the argument structure (claim →.', 'Debrief: highlight how each speaker used textual quotes (e.g., "forty-hour week for all now") to anchor opinions.', 'Practice "devil\'s advocate" drills: assign students to argue the opposite of their view for 1 minute using only text.', 'Co-create a discussion rubric with criteria: "Uses 2+ quotes," "Responds to peer by name," "Changes mind visibly."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
