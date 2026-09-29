import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch13_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch13_p3: SimDef = {
    id: 'v3_c11_eng_w_ch13_p3',
    title: 'The World is too Much With Us (Poem) · Part 3/3',
    subtitle: 'Read a sonnet\'s turn as the hinge between diagnosis and desperation.',
    classLevel: 11, subject: 'eng_w', topic: 'The World is too Much With Us (Poem) · Part 3/3',
    chapters: ['c11_eng_w_ch13'],
    nodeIds: ['c11_eng_w_cbse_13_013', 'c11_eng_w_cbse_13_014', 'c11_eng_w_cbse_13_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Romantic watching a world too busy to see the sea', intro: 'Rush hour on a metro platform, 1802 edition — everyone \'getting and spending,\' nobody feeling the wind.', goal: 'Identify the Petrarchan octave-sestet structure and interpret the pagan wish correctly.' },
    discovery: {
        question: 'Wordsworth cries \'Great God! I\'d rather be / A Pagan suckled in a creed outworn.\' Is he renouncing his faith?',
        options: ['No — it\'s hyperbole against a society that commodifies nature; \'Pagan\' means perceiving divinity in sea and wind, not atheism', 'Yes — he is formally converting to paganism', 'Yes — the sestet rejects all religion equally', 'No — he is only being ironic about mythology'],
        answer: 'No — it\'s hyperbole against a society that commodifies nature; \'Pagan\' means perceiving divinity in sea and wind, not atheism',
        hook: 'He addresses the Christian God while damning the Christian-age marketplace — the creed he\'d swap is \'getting and spending,\' not worship itself.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'The World is too Much With Us\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_13_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the sonnet at the volta — octave as diagnosis, sestet as desperate wish — and test whether the turn could land anywhere but line 9.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'The World is too Much With Us\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'What is the specific structural division of a Petrarchan sonnet, and where does the volta (turn in thought) typically occur in this form?', options: [
                { text: 'A Petrarchan sonnet consists of an octave (8 lines, typically ABBAABBA) followed by a', outcome: 'A Petrarchan sonnet consists of an octave (8 lines, typically ABBAABBA) followed by a sestet (6.' },
                { text: 'three quatrains and a couplet', outcome: 'Not quite — Students often treat the poem as a simple "nature poem" celebrating pretty scenery, missing its.', reveals: 'students-often-treat-the-poem' },
                { text: 'volta at the end', outcome: 'Not quite — Students often treat the poem as a simple "nature poem" celebrating pretty scenery, missing its.', reveals: 'students-often-treat-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'The World is too Much With Us\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature answers?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Essay.' },
                { text: 'Paragraph, Essay, English, Literature', outcome: 'Not quite — Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza.', reveals: 'writing-based-on-the-chapter' },
                { text: 'writing based on the chapter', outcome: 'Not quite — Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza.', reveals: 'writing-based-on-the-chapter' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_013', title: 'Use it in the wild',
          caseStudy: { intro: 'On a weekend trip to the hills your friends spend the whole time filming stories, checking prices online, and planning purchases. Someone quotes \'the world is too much with us\' and another friend jokes, \'So Wordsworth wanted everyone to become atheists and worship sea gods?\'',
            decisions: [{ prompt: 'How do you explain what the sonnet is really arguing?', options: [
                { text: 'Explain the sonnet\'s turn: the octave diagnoses \'getting and spending\' — modern life wasting our powers and making us \'out of tune\' with sea and wind. At the volta he\'d \'rather be a Pagan\' — meaning a pre-Christian who saw divinity *in* nature (Proteus, Triton) — because even that beats a world that commodifies nature while claiming to be Christian.', outcome: '\'Pagan\' isn\'t atheism — it\'s Wordsworth\'s shocking contrast between a worldview that sacralises nature and a modernity too busy buying to see it.' },
                { text: 'Agree — Wordsworth rejected religion, so \'Pagan\' means he wanted a godless world.', outcome: 'That\'s the common misreading: \'Pagan\' here means a polytheist who perceives the divine within natural forces — the opposite of irreligion.', reveals: 'pagan-means-atheist' },
                { text: 'Say the poem has no real argument — it\'s just fourteen lines of pretty nature description.', outcome: 'The Petrarchan structure is the argument: octave states the problem, sestet offers the desperate alternative — it\'s an intellectual journey, not scenery.', reveals: 'sonnet-has-no-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_13_015', title: 'You made it',
          caseStudy: { intro: 'Eight lines to convict \'getting and spending,\' six to imagine a creed that still heard the sea — the hinge is the poem\'s whole argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_013', difficulty: 'standard',
          question: 'Critical thinking on \'The World is too Much With Us\' — analysing the text.',
          hint: 'If stuck, review the definition and function of "volta" in a Petrarchan sonnet (node.',
          misconception: 'Students often treat the poem as a simple "nature poem" celebrating pretty scenery, missing its *polemical* force.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking on \'The World is too Much With Us\'',
                  options: ['Critical thinking on \'The World is too Much With Us\'', '\'The World is too Much With Us\' (Woven Words, ch', 'The plot/narrative arc of \'The World is too Much With Us\'', 'The setting of \'The World is too Much With Us\''],
                  hint: 'If stuck, review the definition and function of "volta" in a Petrarchan sonnet (node.',
                  misconception: 'Students often treat the poem as a simple "nature poem" celebrating pretty scenery, missing its *polemical* force.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Have the student re-read *only* the first four lines and paraphrase "getting and spending, we lay waste our powers".', 'Ask: "What specific \'powers\' are wasted?', 'The power to earn money, or the power to *feel*?" 3.', 'Direct them to the phrase "Little we see in Nature that is ours" — circle "ours." Discuss: does "ours" mean "we own it".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_014', difficulty: 'standard',
          question: 'Writing skills from \'The World is too Much With Us\' — using the text as a model.',
          hint: 'If stuck, review PEEL method from c8_engl_ch1_17 and quote-embedding from.',
          misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza or listing literary devices.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing analytical paragraphs for literature answers?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Essay, English, Literature', 'writing based on the chapter', 'There is a metaphor in line 2, a simile in line 4'],
                  hint: 'If stuck, review PEEL method from c8_engl_ch1_17 and quote-embedding from c7_engl_ch04_015; then.',
                  misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza or listing literary devices they spotted (e.g.' },
                { id: 'b', prompt: 'Compare these two opening sentences for a long answer on the poem\'s theme: A) "In this poem, Wordsworth talks about how people are too busy making money." B).', answer: 'Sentence B is superior',
                  options: ['Sentence B is superior', 'writing based on the chapter', 'There is a metaphor in line 2, a simile in line 4'],
                  hint: 'If stuck, review PEEL method from c8_engl_ch1_17 and quote-embedding from c7_engl_ch04_015; then.',
                  misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza or listing literary devices they spotted (e.g.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student submits a summary or device-list, do not say "add analysis." Instead: (1) Have them highlight every.', '(2) Show them that summary sentences have no colour.', '(3) Give them a blank PEEL table for the specific question.', '(4) Co-construct one paragraph: you provide the Point, they find the Evidence, you model the Explanation, they write.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza or listing literary devices.',
          parts: [
                { id: 'a', prompt: 'A student writes in a 6-marker answer: "The reference to Proteus and Triton shows Wordsworth liked Greek mythology." Evaluate this interpretation.', answer: 'The interpretation is insufficient',
                  options: ['The interpretation is insufficient', 'writing based on the chapter', 'There is a metaphor in line 2, a simile in line 4'],
                  hint: 'If stuck, review PEEL method from c8_engl_ch1_17 and quote-embedding from c7_engl_ch04_015; then.',
                  misconception: 'Students believe "writing based on the chapter" means summarising the poem stanza-by-stanza or listing literary devices they spotted (e.g.' }
          ],
            remediations: { 'writing-based-on-the-chapter': { steps: ['If a student submits a summary or device-list, do not say "add analysis." Instead: (1) Have them highlight every.', '(2) Show them that summary sentences have no colour.', '(3) Give them a blank PEEL table for the specific question.', '(4) Co-construct one paragraph: you provide the Point, they find the Evidence, you model the Explanation, they write.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_13_015', difficulty: 'standard',
          question: 'Discussion points on \'The World is too Much With Us\' — speaking and listening.',
          hint: 'If stuck, return to c11_eng_w_cbse_13_008 and c11_eng_w_cbse_13_009 — re-annotate the.',
          misconception: 'Students treat "discussion points" as a list of *topics* to cover (e.g., "nature," "materialism," "mythology") rather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discussion points on \'The World is too Much With Us\'',
                  options: ['Discussion points on \'The World is too Much With Us\'', '\'The World is too Much With Us\' (Woven Words, ch', 'The plot/narrative arc of \'The World is too Much With Us\'', 'The setting of \'The World is too Much With Us\''],
                  hint: 'If stuck, return to c11_eng_w_cbse_13_008 and c11_eng_w_cbse_13_009 — re-annotate the poem focusing.',
                  misconception: 'Students treat "discussion points" as a list of *topics* to cover (e.g., "nature," "materialism," "mythology") rather than *argumentative.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['**Interrupt the label-habit**: Hand the student a printed poem with *only* the literary devices marked (oxymoron.', 'Tell me what work it *does* in the argument.', 'Not what it *means* — what it *does*." 2.', '**Enforce the "Quote-Claim-Link" protocol**: Every oral turn must contain (a) a direct phrase from the poem, (b).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
