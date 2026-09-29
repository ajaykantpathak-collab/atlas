import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch02_p3: SimDef = {
    id: 'v3_c11_eng_w_ch02_p3',
    title: 'A Pair of Mustachios (Short Story) · Part 3/3',
    subtitle: 'Watch facial hair become a caste certificate men will bankrupt themselves over.',
    classLevel: 11, subject: 'eng_w', topic: 'A Pair of Mustachios (Short Story) · Part 3/3',
    chapters: ['c11_eng_w_ch02'],
    nodeIds: ['c11_eng_w_cbse_02_013', 'c11_eng_w_cbse_02_014', 'c11_eng_w_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a satirist decoding a village\'s moustache politics', intro: 'A moneylender dares to curl his moustache like a tiger\'s — and an impoverished Khan calls it theft of birthright.', goal: 'Analyse the doubled confrontation structure and the story\'s ironic non-resolution.' },
    discovery: {
        question: 'Two confrontations over one moustache tip: the first costs a nose-ring, the second costs everything Khan Azam Khan owns. Which is the climax?',
        options: ['The second — Khan stakes all his worldly possessions and loses permanently; loudness isn\'t the measure', 'The first — it has the fiercer dialogue and open threats', 'Neither — the climax is the moustache hierarchy being explained', 'The second — but only because the elders witness the deed'],
        answer: 'The second — Khan stakes all his worldly possessions and loses permanently; loudness isn\'t the measure',
        hook: 'Ramanand yields in round one and loses nothing real; the climax is where the stakes become irreversible.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'A Pair of Mustachios\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_02_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map both confrontations onto the arc, then weigh the last line — \'My father was a Sultan\' — as resolution or the cycle restarting.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'A Pair of Mustachios\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Language', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the story or writing.', reveals: 'writing-skills-based-on-the' },
                { text: 'Plan, Execute, Evaluate, Learn', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the story or writing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'A Pair of Mustachios\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the three discussion questions listed under "Talking About the Text" in the NCERT textbook for "A Pair of Mustachios"?', options: [
                { text: 'The three questions are: (1) The episode has been narrated in a light vein', outcome: 'The three questions are: (1) The episode has been narrated in a light vein.' },
                { text: 'sharing opinions', outcome: 'Not quite — Students believe a literary discussion is just "sharing opinions" and therefore prepare.', reveals: 'a-literary-discussion-is-just' },
                { text: 'comprehension questions or writing topics', outcome: 'Not quite — Students believe a literary discussion is just "sharing opinions" and therefore prepare.', reveals: 'a-literary-discussion-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a street-play contest your troupe adapts Mulk Raj Anand\'s \'A Pair of Mustachios\' — a village moneylender with a \'tiger\' moustache versus a ruined landlord clinging to his \'goat\' style. A member wants to modernise it into a plain comedy about facial-hair fashion: \'Moustache shapes are just style choices, keep the jokes.\'',
            decisions: [{ prompt: 'What does the moustache actually carry in the story?', options: [
                { text: 'Rank itself — in Anand\'s colonial-India satire each moustache style is a class/caste badge; the landlord\'s refusal to lower his is clinging to vanished status while the moneylender\'s upward \'tiger\' twist is new money aping old nobility. Strip the hierarchy and the satire — laughing at social pretension — becomes mere grooming comedy.', outcome: 'The whiskers are a symbolic code for hierarchy; reading them as fashion erases the critique of class pride the story is built on.' },
                { text: 'The modernisation works — audiences today won\'t get caste references, so fashion jokes are safer.', outcome: 'Removing the code removes the story: the whole point is a status war fought through an absurd proxy — prestige marks mistaken for the prestige itself.', reveals: 'moustache-is-just-fashion' },
                { text: 'Turn it into a tragedy — the landlord loses everything, so play it straight and sad.', outcome: 'Anand\'s weapon is satire, not pathos; the comedy is precisely how the critique lands — solemnising it loses the sting.', reveals: 'satire-played-as-tragedy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'The moustache tips stay down, the heirlooms change hands, and the loser walks off inventing royal blood — the performance never ends.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_013', difficulty: 'standard',
          question: 'Critical thinking on \'A Pair of Mustachios\' — analysing the text to reach.',
          hint: 'Review c11_eng_w_cbse_02_009 (Irony and Symbolism) focusing on the difference between.',
          misconception: 'Students often treat the moustache as a simple "symbol of pride" and write essays about "Azam Khan\'s excessive pride.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'A Pair of Mustachios\'',
                  options: ['Critical thinking on \'A Pair of Mustachios\'', '\'A Pair of Mustachios\' (Woven Words, ch', 'The plot/narrative arc of \'A Pair of Mustachios\'', 'The setting of \'A Pair of Mustachios\''],
                  hint: 'Review c11_eng_w_cbse_02_009 (Irony and Symbolism) focusing on the difference between "symbol.',
                  misconception: 'Students often treat the moustache as a simple "symbol of pride" and write essays about "Azam Khan\'s excessive pride causing his downfall.".' }
          ],
            remediations: { 'students-often-treat-the-moustache': { steps: ['If a student writes a "pride goes before a fall" answer: 1) Ask them to list *every* transaction in the story.', '2) Have them re-read the opening paragraphs where the narrator explains the moustache taxonomy as a *class boundary.', '3) Ask: "If Azam Khan had no moustache, would Ramanand still have power over him?" (Yes—via debt/mortgage).', '4) Guide them to rewrite the topic sentence: "Anand uses the moustache conflict to expose how colonial-feudal status.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_014', difficulty: 'standard',
          question: 'Writing skills from \'A Pair of Mustachios\' — using the text as a model.',
          hint: 'Review the "summary vs. analysis" distinction using a two-column table: Column A = What.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Language', 'Plan, Execute, Evaluate, Learn', 'writing skills based on the chapter'],
                  hint: 'Review the "summary vs. analysis" distinction using a two-column table: Column A = What happens.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch in narrative form (e.g.' },
                { id: 'b', prompt: 'In "A Pair of Mustachios," a student writes: "Khan Azam Khan is proud of his tiger moustache because his ancestors wore it." Why is this an incomplete.', answer: 'The statement is a plot summary, not an analytical point',
                  options: ['The statement is a plot summary, not an analytical point', 'writing skills based on the chapter', 'Khan Azam Khan was a tall man who wore a tiger moustache'],
                  hint: 'Review the "summary vs. analysis" distinction using a two-column table: Column A = What happens.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch in narrative form (e.g.' },
                { id: 'c', prompt: 'Analyze how the dialogue between Ramanand and Khan Azam Khan advances the theme of "the commodification of honour." Identify two specific exchanges and explain.', answer: 'Exchange 1: Khan Azam Khan pawns his wife\'s nose-ring',
                  options: ['Exchange 1: Khan Azam Khan pawns his wife\'s nose-ring', 'writing skills based on the chapter', 'Khan Azam Khan was a tall man who wore a tiger moustache'],
                  hint: 'Review the "summary vs. analysis" distinction using a two-column table: Column A = What happens.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch in narrative form (e.g.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a narrative summary instead of an analytical response: (1) Highlight every sentence that merely.', 'Why did Anand include this?', 'What does it PROVE about class/pride/irony?" (3) Co-construct ONE analytical Point from their summary.', '(4) Have them find ONE quote to Evidence it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student thesis: "Anand\'s story is mainly about how funny Indian moustache customs are." Is this a valid interpretation for a Class 11 board.', answer: 'No, it is reductive and misses the satirical depth',
                  options: ['No, it is reductive and misses the satirical depth', 'writing skills based on the chapter', 'Khan Azam Khan was a tall man who wore a tiger moustache'],
                  hint: 'Review the "summary vs. analysis" distinction using a two-column table: Column A = What happens.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the story or writing a character sketch in narrative form (e.g.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student submits a narrative summary instead of an analytical response: (1) Highlight every sentence that merely.', 'Why did Anand include this?', 'What does it PROVE about class/pride/irony?" (3) Co-construct ONE analytical Point from their summary.', '(4) Have them find ONE quote to Evidence it.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_015', difficulty: 'standard',
          question: 'Discussion points on \'A Pair of Mustachios\' — speaking and listening around the.',
          hint: 'Review c11_eng_w_cbse_02_013 (Critical Thinking) worked examples on constructing PEEL.',
          misconception: 'Students believe a literary discussion is just "sharing opinions" and therefore prepare by memorizing plot points.',
          parts: [
                { id: 'a', prompt: 'What are the three discussion questions listed under "Talking About the Text" in the NCERT textbook for "A Pair of Mustachios"?', answer: 'The three questions are: (1) The episode has been narrated in a light vein',
                  options: ['The three questions are: (1) The episode has been narrated in a light vein', 'sharing opinions', 'comprehension questions or writing topics'],
                  hint: 'Review c11_eng_w_cbse_02_013 (Critical Thinking) worked examples on constructing PEEL paragraphs.',
                  misconception: 'Students believe a literary discussion is just "sharing opinions" and therefore prepare by memorizing plot points.' },
                { id: 'b', prompt: 'During a discussion, a peer claims: "The story is only about Khan Azam Khan\'s foolish pride." Using two specific textual evidences, formulate a spoken response.', answer: 'A strong response: "I agree Khan\'s pride drives the conflict',
                  options: ['A strong response: "I agree Khan\'s pride drives the conflict', 'sharing opinions'],
                  hint: 'Review c11_eng_w_cbse_02_013 (Critical Thinking) worked examples on constructing PEEL paragraphs.',
                  misconception: 'Students believe a literary discussion is just "sharing opinions" and therefore prepare by memorizing plot points.' }
          ],
            remediations: { 'a-literary-discussion-is-just': { steps: ['If a student falls into this misconception: (1) Give them a two-column sheet: left column "My Point," right column.', '(2) Model "building language": "Adding to what [Peer] said about Khan\'s pride, I noticed Ramanand\'s reply in para.', '(4) Debrief by showing how their evidence-linked contributions shifted the group\'s understanding from character traits.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
