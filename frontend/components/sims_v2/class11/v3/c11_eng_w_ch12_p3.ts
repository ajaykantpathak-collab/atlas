import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch12_p3: SimDef = {
    id: 'v3_c11_eng_w_ch12_p3',
    title: 'Telephone Conversation (Poem) · Part 3/3',
    subtitle: 'Hear a rental call become a colour inspection — answered with devastating politeness.',
    classLevel: 11, subject: 'eng_w', topic: 'Telephone Conversation (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch12'],
    nodeIds: ['c11_eng_w_cbse_12_013', 'c11_eng_w_cbse_12_014', 'c11_eng_w_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a caller pricing a flat in 1960s London', intro: 'Price, location — agreed. Then one confession turns a transaction into an interrogation about melanin.', goal: 'Analyse the poem\'s dramatic structure and evaluate satire as a response to racism.' },
    discovery: {
        question: 'Asked \'HOW DARK?\' on a phone call about a flat, the speaker answers with jokes — \'plain or milk chocolate?\' Does the wit weaken the protest?',
        options: ['It amplifies it — humour refuses victimhood and exposes racism\'s \'clinical, crushing\' absurdity', 'It weakens it — jokes trivialise discrimination', 'Neither — the humour is separate from the politics', 'It weakens it — satire can\'t confront real prejudice'],
        answer: 'It amplifies it — humour refuses victimhood and exposes racism\'s \'clinical, crushing\' absurdity',
        hook: 'The telephone strips away everything but voice — so the only place racism can operate is a question about shade, and the poem dismantles it there.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis refers to the disciplined process of examining a text\'s explicit and implicit meanings, evaluating the author\'s choices (structure, language, tone, devices).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the pivot where a housing call becomes a racial negotiation, read the silences and capitals as structure, and judge the open ending.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you overhear a phone call where someone is judged solely by their skin colour before they\'ve even been seen.',
            decisions: [{ prompt: 'What is the central conflict in "Telephone Conversation" and how is it introduced in the opening lines?', options: [
                { text: 'The central conflict is racial prejudice in housing access, introduced through the', outcome: 'The central conflict is racial prejudice in housing access, introduced through the speaker\'s.' },
                { text: 'the conflict is about rent price', outcome: 'Not quite — Students often think the poem is primarily about the landlady\'s individual racism, missing that.', reveals: 'the-poem-is-primarily-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "How does Soyinka use irony to expose the landlady\'s prejudice?" Your mind goes blank because you.',
            decisions: [{ prompt: 'What does PEEL stand for in the context of writing analytical answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the poem or retelling the.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the poem or retelling the.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a group discussion about a time someone made an assumption about you based on your appearance — how did you respond?',
            decisions: [{ prompt: 'What is the central issue addressed in Wole Soyinka\'s "Telephone Conversation"?', options: [
                { text: 'The central issue is racial prejudice in housing, specifically a white landlady\'s', outcome: 'The central issue is racial prejudice in housing, specifically a white landlady\'s invasive.' },
                { text: 'it\'s about a phone call', outcome: 'Not quite — Students often treat the poem as a simple narrative about a rude landlady and a victimized speaker.', reveals: 'students-often-treat-the-poem' },
                { text: 'it\'s about miscommunication', outcome: 'Not quite — Students often treat the poem as a simple narrative about a rude landlady and a victimized speaker.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class debate on \'Does racism still exist in polite society?\', a teammate wants to use Soyinka\'s \'Telephone Conversation\' but plans to present it as \'a true story about one rude landlady in Africa.\' You suspect both parts of that framing are wrong.',
            decisions: [{ prompt: 'What\'s the strongest way to deploy the poem in the debate?', options: [
                { text: 'Present it as a 1960s London incident — legal \'No Blacks\' rental ads, pre-Race Relations Act Britain — where the telephone strips away everything but voice, so racism must operate through a single question: \'HOW DARK?\' The poem\'s power is how a Nobel laureate\'s intellect gets reduced to a colour swatch, and how the silences and capitalised words turn prejudice\'s absurdity into structure.', outcome: 'Setting plus form become your evidence: systemic racism in \'polite\' Britain, exposed line by line until the speaker seizes control — \'wouldn\'t you rather see for yourself?\'' },
                { text: 'Go with the teammate\'s version — it\'s about one landlady\'s bad manners, so treat it as an anecdote about individual rudeness.', outcome: 'Individualising it loses the argument: the poem documents a legal, systemic rental market where \'HOW DARK?\' was a normal question to ask.', reveals: 'racism-is-one-rude-person' },
                { text: 'Use it as an \'African literature\' example since Soyinka is Nigerian — the landlady represents colonial attitudes back home.', outcome: 'The setting is London, not Africa; misplacing it geographically hides that the poem targets British racism experienced by an African abroad.', reveals: 'nigerian-poet-means-africa-setting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_12_015', title: 'You made it',
          caseStudy: { intro: '\'Wouldn\'t you rather see for yourself?\' — he ends the call by refusing the category, leaving the door open and the verdict with her.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis refers to the disciplined process.',
          hint: 'Review the distinction between verbal irony (saying one thing, meaning another) and.',
          misconception: 'Students often think the poem is primarily about the landlady\'s individual racism, missing that Soyinka targets the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the poet uses capital letters for the landlady\'s questions ("HOW DARK?", "ARE YOU LIGHT OR VERY DARK?") but not for the speaker\'s.', answer: 'Capitalization visually enacts the landlady\'s institutional power and reductive',
                  options: ['Capitalization visually enacts the landlady\'s institutional power and reductive', 'it shows she is shouting'],
                  hint: 'Review the distinction between verbal irony (saying one thing, meaning another) and situational.',
                  misconception: 'Students often think the poem is primarily about the landlady\'s individual racism, missing that Soyinka targets the *system* of racial.' }
          ],
            remediations: { 'the-poem-is-primarily-about': { steps: ['Have the student list every colour word in the poem and categorize them: landlady\'s terms (DARK, LIGHT) vs.', 'speaker\'s terms (sepia, brunette, peroxide blonde, raven black).', 'Ask: "Who creates more categories?', 'Who refuses to stay in one?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the poem is primarily about the landlady\'s individual racism, missing that Soyinka targets the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the poem\'s ending: "Madam,\' I pleaded, \'wouldn\'t you rather / See for yourself?" Is this a moment of defeat, defiance,.', answer: 'It is defiance disguised as invitation',
                  options: ['It is defiance disguised as invitation', 'pleaded'],
                  hint: 'Review the distinction between verbal irony (saying one thing, meaning another) and situational.',
                  misconception: 'Students often think the poem is primarily about the landlady\'s individual racism, missing that Soyinka targets the *system* of racial.' }
          ],
            remediations: { 'the-poem-is-primarily-about': { steps: ['Have the student list every colour word in the poem and categorize them: landlady\'s terms (DARK, LIGHT) vs.', 'speaker\'s terms (sepia, brunette, peroxide blonde, raven black).', 'Ask: "Who creates more categories?', 'Who refuses to stay in one?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "Telephone Conversation" involve crafting.',
          hint: 'Revisit c11_eng_w_cbse_12_009 (Irony and Symbolism) and c11_eng_w_cbse_12_013 (Critical.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling the conversation.',
          parts: [
                { id: 'a', prompt: 'What does PEEL stand for in the context of writing analytical answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'writing skills based on the chapter'],
                  hint: 'Revisit c11_eng_w_cbse_12_009 (Irony and Symbolism) and c11_eng_w_cbse_12_013 (Critical Thinking).',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling the conversation.' },
                { id: 'b', prompt: 'Compare the tone of a diary entry written by the speaker immediately after the call versus a formal letter to the editor about housing discrimination.', answer: 'Diary entry: First-person intimate voice, fragmented sentences ("Silence',
                  options: ['Diary entry: First-person intimate voice, fragmented sentences ("Silence', 'I felt so bad', 'The systemic prejudice is alarming', 'writing skills based on the chapter'],
                  hint: 'Revisit c11_eng_w_cbse_12_009 (Irony and Symbolism) and c11_eng_w_cbse_12_013 (Critical Thinking).',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the poem or retelling the conversation.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['Show the student two sample answers for the same question: a 2-mark summary vs a 6-mark PEEL analysis.', 'Highlight in colour: Point (blue), Evidence (green), Explanation (yellow), Link (pink).', 'Give them a "PEEL template" with sentence starters: "The poet uses [device] to show [theme]...', 'This reveals [analysis]...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_12_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for "Telephone Conversation" refers.',
          hint: 'Review the worked examples in c11_eng_w_cbse_12_009 for step-by-step irony analysis.',
          misconception: 'Students often treat the poem as a simple narrative about a rude landlady and a victimized speaker, missing that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points for "Telephone Conversation" refers to',
                  options: ['Speaking and Listening: Discussion Points for "Telephone Conversation" refers to', 'Before You Read: Context and Background provides essential historical, biographical, and', 'Plot and narrative structure in poetry refers to the organized sequence of events and the', 'Setting in poetry refers to the time, place, and physical environment where the poetic'],
                  hint: 'Review the worked examples in c11_eng_w_cbse_12_009 for step-by-step irony analysis.',
                  misconception: 'Students often treat the poem as a simple narrative about a rude landlady and a victimized speaker, missing that the *speaker controls the.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the poem aloud, marking every colour word and every silence.', 'Identify who speaks more: the landlady asks, but the speaker *describes* — note the shift in descriptive power.', 'Review node c11_eng_w_cbse_12_009 (Irony and Symbolism) to see how the "clinical" language is mocked.', 'Practice explaining the joke in "palm of my hand, soles of my feet / Are a peroxide blonde" to a peer — if you can\'t.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
