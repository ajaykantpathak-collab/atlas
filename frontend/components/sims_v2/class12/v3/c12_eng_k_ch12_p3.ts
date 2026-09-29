import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch12_p3: SimDef = {
    id: 'v3_c12_eng_k_ch12_p3',
    title: 'Time and Time Again (Poem) · Part 3/3',
    subtitle: 'The clocks never agreed — that was the city\'s harmony',
    classLevel: 12, subject: 'eng_k', topic: 'Time and Time Again (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch12'],
    nodeIds: ['c12_eng_k_cbse_12_013', 'c12_eng_k_cbse_12_014', 'c12_eng_k_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Indian English poetry reader', intro: 'A linguist who translated ancient Tamil verse hears Indian cities in their clock towers — every one offbeat, all of them together.', goal: 'Read Time and Time Again through its clock-tower metaphor for pluralism, and the lament for rhythms broken by violence.' },
    discovery: {
        question: 'Old-city clock towers strike the hour \'slightly off\' each other — never together. A.K. Ramanujan builds a poem on that tiny imperfection. What is he actually clocking?',
        options: ['The perennial feuds and seasonal alliances of Hindu, Christian and Muslim neighbours — a plural city that coexists without ever synchronising', 'Bad clockmakers', 'Indian Standard Time delays', 'Nothing — just sounds'],
        answer: 'The perennial feuds and seasonal alliances of Hindu, Christian and Muslim neighbours — a plural city that coexists without ever synchronising',
        hook: 'A tower left \'eyeless, silent\' after a riot — or a \'precise act of nature\' in lightning — equates human violence with natural disaster. Nature\'s fury is lawful and exact; communal hatred is lawless. The poem doesn\'t condemn or accept — it bears witness, a wistful lament for a shattered rhythm.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Time and Time Again\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_12_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Listen to an Indian city\'s towers: hear alloy, maker\'s hand and donor\'s whim inside each bell, then follow the poem to the knocked-out clockwork and the zigzag sky showing through.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Time and Time Again\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the central extended metaphor in "Time and Time Again" and what real-world entity does it represent?', options: [
                { text: 'The central extended metaphor is the clocktowers of an old city', outcome: 'The central extended metaphor is the clocktowers of an old city, which represent the diverse.' },
                { text: 'the poem is about broken clocks', outcome: 'Not quite — Students often reduce the poem to \'a poem about communal riots\'.', reveals: 'students-often-reduce-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Time and Time Again\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Evidence, Line', outcome: 'Not quite — Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A city\'s peace committee proposes demolishing a clock tower scarred by an old riot \'so the cycle of conflict is forgotten\'.',
            decisions: [{ prompt: 'Does erasing the landmark break the cycle?', options: [
                { text: 'No — Ramanujan\'s time-worn city shows violence repeats time and time again when memory is paved over; keep the scar visible and fix the causes, not the evidence.', outcome: 'The poem\'s looped time warns that forgetting is how the cycle reloads; honest memory is the interruption.' },
                { text: 'Yes — remove the symbol and the hostility loses its rallying point.', outcome: 'The poem\'s violence outlives its monuments; symbols don\'t cause the repetition, unaddressed grievances do.', reveals: 'erasure-prevents-repetition' },
                { text: 'It doesn\'t matter — history always repeats, so nothing we do helps.', outcome: 'Ramanujan observes the cycle to indict it; fatalism just agrees to the next round.', reveals: 'fatalism-about-cycles' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear civic time as a metaphor for coexistence — and read a broken clock face as a broken social contract.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_013', difficulty: 'standard',
          question: 'Critical thinking on \'Time and Time Again\' — analysing the text to reach.',
          hint: 'If stuck, revisit the metaphor-mapping exercise in c11_eng_h_cbse_01_013 and the.',
          misconception: 'Students often reduce the poem to \'a poem about communal riots\'.',
          parts: [
                { id: 'a', prompt: 'What is the central extended metaphor in "Time and Time Again" and what real-world entity does it represent?', answer: 'The central extended metaphor is the clocktowers of an old city',
                  options: ['The central extended metaphor is the clocktowers of an old city', 'the poem is about broken clocks'],
                  hint: 'If stuck, revisit the metaphor-mapping exercise in c11_eng_h_cbse_01_013 and the imagery/symbolism.',
                  misconception: 'Students often reduce the poem to \'a poem about communal riots\'.' }
          ],
            remediations: { 'students-often-reduce-the-poem': { steps: ['If the metaphor remains opaque, have the student re-read stanza 1 and list: alloy, shaking hand, donor\'s whim.', 'Ask: \'If each clock = a community, what does each detail represent?\' Then move to stanza 2: \'What does "eyeless.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_014', difficulty: 'standard',
          question: 'Writing skills from \'Time and Time Again\' — using the text as a model.',
          hint: 'If stuck, revisit c12_eng_k_cbse_12_013\'s "Critical Thinking" exercises — specifically.',
          misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and sprinkling a few device.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Evidence, Line', 'writing based on the chapter'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_12_013\'s "Critical Thinking" exercises — specifically the worked.',
                  misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and sprinkling a few device names.' },
                { id: 'b', prompt: 'A student writes: "The poem shows clocks are different because of religion." Why is this an incomplete point for a board exam answer?', answer: 'The statement is a plot summary, not an analytical point',
                  options: ['The statement is a plot summary, not an analytical point', 'writing based on the chapter'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_12_013\'s "Critical Thinking" exercises — specifically the worked.',
                  misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and sprinkling a few device names.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student produces a summary-heavy answer: (1) Have them highlight every sentence that makes a claim about the.', 'every sentence that merely recounts *content* ("The clocks show different times").', '(2) Delete all content-recount sentences.', '(3) For each remaining craft claim, demand one textual detail and one "why this matters" sentence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and sprinkling a few device.',
          parts: [
                { id: 'a', prompt: 'A student ends their paragraph on the poem\'s tone with: "So the poet is sad about violence." Evaluate this link sentence against the marking scheme expectation.', answer: 'The link is too reductive',
                  options: ['The link is too reductive', 'writing based on the chapter'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_12_013\'s "Critical Thinking" exercises — specifically the worked.',
                  misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza and sprinkling a few device names.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student produces a summary-heavy answer: (1) Have them highlight every sentence that makes a claim about the.', 'every sentence that merely recounts *content* ("The clocks show different times").', '(2) Delete all content-recount sentences.', '(3) For each remaining craft claim, demand one textual detail and one "why this matters" sentence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_12_015', difficulty: 'standard',
          question: 'Discussion points on \'Time and Time Again\' — speaking and listening around the.',
          hint: 'If stuck, revisit c12_eng_k_cbse_12_008 (imagery and metaphor) and c12_eng_k_cbse_12_006.',
          misconception: 'Students often think a discussion point is just stating whether they liked the poem or summarizing the plot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'Time and Time Again\'',
                  options: ['Discussion points on \'Time and Time Again\'', '\'Time and Time Again\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Time and Time Again\'', 'The setting of \'Time and Time Again\''],
                  hint: 'If stuck, revisit c12_eng_k_cbse_12_008 (imagery and metaphor) and c12_eng_k_cbse_12_006 (primary.',
                  misconception: 'Students often think a discussion point is just stating whether they liked the poem or summarizing the plot.' }
          ],
            remediations: { 'a-discussion-point-is-just': { steps: ['If a student cannot generate a text-based discussion point, guide them through: 1) Re-read the poem and underline three.', '2) Turn each phrase into a \'Why...?\' or \'What does...', '3) Practice asking the question to a partner and listening for their evidence.', 'This builds the habit of anchoring talk in the text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
