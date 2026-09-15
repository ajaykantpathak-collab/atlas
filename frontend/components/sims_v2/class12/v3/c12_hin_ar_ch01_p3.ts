import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch01_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch01_p3',
    title: 'vkyksd èkUok · Part 3/3',
    subtitle: '\'I am pulp\' — the intellectual who saw the machine from inside',
    classLevel: 12, subject: 'hin_ar', topic: 'vkyksd èkUok · Part 3/3',
    chapters: ['c12_hin_ar_ch01'],
    nodeIds: ['c12_hin_ar_cbse_01_013', 'c12_hin_ar_cbse_01_014', 'c12_hin_ar_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi modern-poetry reader', intro: 'A Progressive poet who served both university and ministry writes about being ground to pulp. Context is the key.', goal: 'Situate Muktibodh\'s Vartmaan in the Progressive movement and post-1947 disillusionment.' },
    discovery: {
        question: 'Freedom came in 1947 — yet by the 1950s a professor-poet wrote \'मैं लुगदी हूँ\' — I am pulp. What turned independence into existential dread?',
        options: ['The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system', 'The poet was personally ill', 'Romanticism just ended', 'Poetry was unfashionable'],
        answer: 'The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system',
        hook: 'Muktibodh wasn\'t a छायावादी dreamer — he was Progressive: class, institutions, the writer\'s complicity. As academic and state functionary both, his \'I\' is lived conflict — self-pity becomes a calculated indictment of the intellectual inside the machine.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation in literature refers to the ability to examine a text deeply, break down its components (themes, symbols, structure, language), and construct meaning.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are standing at a war memorial on a busy city street — people rush past, unaware of the names etched in stone.',
            decisions: [{ prompt: 'What is the central historical event referenced in the poem "vkyksd èkUok", and which line explicitly mentions its anniversary?', options: [
                { text: 'The central historical event is the 1857 revolt (First War of Independence)', outcome: 'The central historical event is the 1857 revolt (First War of Independence).' },
                { text: 'the poet is sad', outcome: 'Not quite — Students often treat "critical analysis" as listing literary devices (metaphor, alliteration).', reveals: 'students-often-treat-critical-analysis' },
                { text: 'the poem constructs a persona that interrogates collective memory', outcome: 'Not quite — Students often treat "critical analysis" as listing literary devices (metaphor, alliteration).', reveals: 'students-often-treat-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "Analyze how the poet uses the metaphor of \'morning\' to depict the speaker\'s rebellion." Most.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe that writing a good literature answer means quoting as many lines as possible.', reveals: 'writing-a-good-literature-answer' },
                { text: 'list quotes without explaining their significance', outcome: 'Not quite — Students believe that writing a good literature answer means quoting as many lines as possible.', reveals: 'writing-a-good-literature-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a Class 12 board exam viva or a CUET group discussion: the examiner gives you a poem and says "Discuss its central conflict." Where do you.',
            decisions: [{ prompt: 'What is the primary purpose of the "vH;kl" (exercise) questions given after the poem "वाक्य" in the NCERT textbook?', options: [
                { text: 'The vH;kl questions are designed to guide structured literary discussion by focusing on', outcome: 'The vH;kl questions are designed to guide structured literary discussion by focusing on specific.' },
                { text: 'to test memory of the poem', outcome: 'Not quite — Students believe "speaking and listening" means taking turns giving *opinions* ("I feel the poem.', reveals: 'speaking-and-listening-means-taking' },
                { text: 'speaking and listening', outcome: 'Not quite — Students believe "speaking and listening" means taking turns giving *opinions* ("I feel the poem.', reveals: 'speaking-and-listening-means-taking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your poem is accepted by the college magazine, but the editor returns it blood-red with corrections, insisting every comma and full stop sit exactly where the rulebook demands. Your gut says the rules are flattening the voice.',
            decisions: [{ prompt: 'What would Nirala\'s \'विराम चिह्न\' tell both sides?', options: [
                { text: 'Let the punctuation marks argue their case — but don\'t let them own the poem; Nirala personifies them, hears them out, then refuses to be their slave, and finally hands the judgment to the reader.', outcome: 'The poem\'s structure is the lesson: rules speak (rising action), the poet resists (climax), and the verdict is democratically opened (\'you decide\') — craft serves voice, not the reverse.' },
                { text: 'Delete every mark — if rules are tyranny, true freedom is a poem with no punctuation at all.', outcome: 'Nirala refuses slavery, not punctuation — the marks stay in the poem as characters with a hearing; abolishing them confuses liberation with vandalism.', reveals: 'freedom-means-no-rules' },
                { text: 'Accept every correction — punctuation exists to discipline expression, and the editor\'s word is final.', outcome: 'That\'s precisely the gulami the poet rejects at the climax; the poem stages the marks\' claims so the poet — and finally the reader — can overrule them.', reveals: 'rules-outrank-voice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now place a poem in its movement — and hear post-independence disillusion speaking as first-person dread.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation in literature refers to the.',
          hint: 'If stuck, return to c12_hin_ar_cbse_01_008 (Imagery and Metaphor) and practice the.',
          misconception: 'Students often treat "critical analysis" as listing literary devices (metaphor, alliteration) without explaining *why*.',
          parts: [
                { id: 'a', prompt: 'What is the central historical event referenced in the poem "vkyksd èkUok", and which line explicitly mentions its anniversary?', answer: 'The central historical event is the 1857 revolt (First War of Independence)',
                  options: ['The central historical event is the 1857 revolt (First War of Independence)', 'the poet is sad', 'the poem constructs a persona that interrogates collective memory', '1947 or the Quit India Movement'],
                  hint: 'If stuck, return to c12_hin_ar_cbse_01_008 (Imagery and Metaphor) and practice the "Device → Effect.',
                  misconception: 'Students often treat "critical analysis" as listing literary devices (metaphor, alliteration) without explaining *why* the poet chose them.' },
                { id: 'b', prompt: 'Explain in your own words the meaning of the metaphor "nqfu;k esa gw¡] nqfu;k dk rycxkj ugha gw¡" (The spark is in the fire, but the fire\'s reflection is not.', answer: 'The metaphor means the individual (spark) derives existence from the collective',
                  options: ['The metaphor means the individual (spark) derives existence from the collective', 'the poet is sad', 'the poem constructs a persona that interrogates collective memory'],
                  hint: 'If stuck, return to c12_hin_ar_cbse_01_008 (Imagery and Metaphor) and practice the "Device → Effect.',
                  misconception: 'Students often treat "critical analysis" as listing literary devices (metaphor, alliteration) without explaining *why* the poet chose them.' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['Re-read the poem aloud, marking every image related to "earth", "blood", "time", and "silence" with different colored.', 'Revisit node c12_hin_ar_cbse_01_008 (Literary Devices: Imagery and Metaphor) and c12_hin_ar_cbse_01_009 (Irony and.', 'Write one PEEL paragraph on the metaphor "nqfu;k esa gw¡..." using the template: Point → Evidence (quote) → Explanation.', 'Self-check: Does my explanation show *how* the device creates meaning, not just *what* it is?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, revisit Class 11 Hindi Aroh Chapter 1 Writing Skills node.',
          misconception: 'Students believe that writing a good literature answer means quoting as many lines as possible.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line', 'list quotes without explaining their significance', 'writing a good literature answer means quoting as many lines as possible'],
                  hint: 'If stuck, revisit Class 11 Hindi Aroh Chapter 1 Writing Skills node (c11_hin_ar_cbse_01_014) and.',
                  misconception: 'Students believe that writing a good literature answer means quoting as many lines as possible.' },
                { id: 'b', prompt: 'Compare two student responses to the question "Discuss the significance of the line \'eSa nqfu;k dk g¡w ,d u;k nhokuk!\'".', answer: 'Response B demonstrates ANALYZE-level thinking',
                  options: ['Response B demonstrates ANALYZE-level thinking', 'writing a good literature answer means quoting as many lines as possible'],
                  hint: 'If stuck, revisit Class 11 Hindi Aroh Chapter 1 Writing Skills node (c11_hin_ar_cbse_01_014) and.',
                  misconception: 'Students believe that writing a good literature answer means quoting as many lines as possible.' }
          ],
            remediations: { 'writing-a-good-literature-answer': { steps: ['Take a 6-mark question from a past paper.', 'Write a response using ONLY one quote but with full PEEL breakdown.', 'Compare with the marking scheme — notice that 3 of 6 marks are for Explanation+Link.', 'Practice converting three weak \'quote-heavy\' answers into PEEL paragraphs. Re-do Diagnostic Question 3 after this drill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that writing a good literature answer means quoting as many lines as possible.',
          parts: [
                { id: 'a', prompt: 'A student writes in the exam: "The poet uses irony when he says \'tx Hko&lkxj rjus dks uko cuk,] eSa Hko ekStksa ij eLr cgk djrk gw¡\' because he is actually.', answer: 'The interpretation is invalid',
                  options: ['The interpretation is invalid', 'writing a good literature answer means quoting as many lines as possible'],
                  hint: 'If stuck, revisit Class 11 Hindi Aroh Chapter 1 Writing Skills node (c11_hin_ar_cbse_01_014) and.',
                  misconception: 'Students believe that writing a good literature answer means quoting as many lines as possible.' }
          ],
            remediations: { 'writing-a-good-literature-answer': { steps: ['Take a 6-mark question from a past paper.', 'Write a response using ONLY one quote but with full PEEL breakdown.', 'Compare with the marking scheme — notice that 3 of 6 marks are for Explanation+Link.', 'Practice converting three weak \'quote-heavy\' answers into PEEL paragraphs. Re-do Diagnostic Question 3 after this drill.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points is the skill of engaging.',
          hint: 'If stuck, return to node 013 (Critical Thinking) and convert each analytical claim there.',
          misconception: 'Students believe "speaking and listening" means taking turns giving *opinions* ("I feel the poem is sad").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points is the skill of engaging in structured,',
                  options: ['Speaking and Listening: Discussion Points is the skill of engaging in structured,', '"Before You Read: Context and Background" is the preparatory step where students gather', 'Narrative structure in poetry refers to the deliberate organization of events, speaker\'s', 'Setting in poetry refers to the temporal, spatial, and socio-cultural backdrop against'],
                  hint: 'If stuck, return to node 013 (Critical Thinking) and convert each analytical claim there into.',
                  misconception: 'Students believe "speaking and listening" means taking turns giving *opinions* ("I feel the poem is sad").' }
          ],
            remediations: { 'speaking-and-listening-means-taking': { steps: ['Have the student re-read the vH;kl questions (textbook p.', '7-8) and convert each into a "Discussion Card": Card front = question, Card back = 2 line references + 1 follow-up.', 'Practice a 3-minute solo rehearsal: pick one card, speak for 60 seconds using PEEL (Point, Evidence, Explanation.', 'Pair with a peer: each plays "devil\'s advocate" — must disagree using *different* textual evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
