import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch07_p3: SimDef = {
    id: 'v3_c12_eng_k_ch07_p3',
    title: 'Poems by Milton (Poem) · Part 3/3',
    subtitle: 'The blind poet wrote these poems with perfect sight',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Milton (Poem) · Part 3/3',
    chapters: ['c12_eng_k_ch07'],
    nodeIds: ['c12_eng_k_cbse_07_013', 'c12_eng_k_cbse_07_014', 'c12_eng_k_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Renaissance poetry scholar', intro: 'Before the blindness, before the epic — a young Milton was already picking fights with Time itself.', goal: 'Read Milton\'s On Time and On Shakespeare through the right context — a young classicist\'s defiance, not a blind seer\'s hindsight.' },
    discovery: {
        question: 'Milton, the blind poet who dictated Paradise Lost — surely his blindness is the key to \'On Time\' and \'On Shakespeare.\' Is it?',
        options: ['No — both were written around 1630, decades before he lost his sight; the lenses that matter are his classical learning and Puritan worldview', 'Yes — blindness explains everything Milton wrote', 'Only for On Time', 'His blindness was partial anyway'],
        answer: 'No — both were written around 1630, decades before he lost his sight; the lenses that matter are his classical learning and Puritan worldview',
        hook: 'Biography traps readers who don\'t check dates. These are a sighted 22-year-old\'s poems: Time as \'envious\' Cronos devouring its children, hours dragged by a clock\'s \'heavy plummets,\' and Shakespeare needing no monument because his \'easie numbers\' live in readers\' hearts — merit over marble.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in poetry analysis is the disciplined process of examining a poem\'s structure, language, imagery, and themes to form an evidence-based interpretation that goes beyond surface.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Milton young: feel time crawl in leaden plummet-steps, hear why the poem calls Time envious, and weigh the claim that a writer\'s true pyramid is built inside his readers.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a detective examining a crime scene — the poem is the scene, and the poet\'s words are the clues.',
            decisions: [{ prompt: 'In Milton\'s "On Time", what does the phrase "heavy Plummets pace" literally refer to, and what does it suggest about the poet\'s view.', options: [
                { text: 'The "heavy Plummets pace" literally refers to the lead weight (plummet) that regulates a', outcome: 'The "heavy Plummets pace" literally refers to the lead weight (plummet) that regulates a mechanical.' },
                { text: 'Time flies fast like a plummet falling', outcome: 'Not quite — Students often treat "critical analysis" as "listing poetic devices" — they identify a metaphor.', reveals: 'students-often-treat-critical-analysis' },
                { text: 'Fly envious Time', outcome: 'Not quite — Students often treat "critical analysis" as "listing poetic devices" — they identify a metaphor.', reveals: 'students-often-treat-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you\'re in the exam hall facing a 6-mark question: "Write a critical appreciation of \'On Shakespeare\'." Your mind goes blank — you know the poem but.',
            decisions: [{ prompt: 'What are the four components of the PEEL paragraph structure used in literary analysis answers?', options: [
                { text: 'The four components are: **Point** (topic sentence stating the argument), **Evidence**', outcome: 'The four components are: **Point** (topic sentence stating the argument), **Evidence** (quoted.' },
                { text: 'Introduction, Body, Conclusion', outcome: 'Not quite — Students believe "critical appreciation" means listing poetic devices (simile, metaphor.', reveals: 'critical-appreciation-means-listing-poetic' },
                { text: 'critical appreciation', outcome: 'Not quite — Students believe "critical appreciation" means listing poetic devices (simile, metaphor.', reveals: 'critical-appreciation-means-listing-poetic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a literature circle where your teacher asks: "Milton says Time is \'envious\' and \'greedy\' — is Time really a villain, or is Milton projecting.',
            decisions: [{ prompt: 'What is the primary purpose of a literary discussion on a poem like Milton\'s "On Time" in a Class 12 classroom?', options: [
                { text: 'The primary purpose is to collaboratively construct meaning by testing interpretations', outcome: 'The primary purpose is to collaboratively construct meaning by testing interpretations against.' },
                { text: 'to express your feelings about the poem', outcome: 'Not quite — Students treat literary discussion as a "sharing circle" where all opinions are equally valid.', reveals: 'students-treat-literary-discussion-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A school\'s board debates an expensive marble statue for a beloved retiring teacher versus funding the reading programme she built her life around.',
            decisions: [{ prompt: 'Which honours her — the marble or the work?', options: [
                { text: 'The work — Milton\'s \'On Shakespeare\' argues the true monument is built in transformed readers\' minds; fund what she changed, not what commemorates her.', outcome: 'Shakespeare needs no tomb because his books are the sepulchre; a legacy lives in continued effect, not in stone.' },
                { text: 'The statue — a lasting monument is the only real proof of legacy.', outcome: 'Milton\'s point is precisely that marble is the weaker memorial; people who carry the teaching are the monument.', reveals: 'monument-equals-legacy' },
                { text: 'Neither — legacies are vanity; dissolve the programme and move on.', outcome: 'That confuses humility with erasure; sustaining her work honours her without feeding ego.', reveals: 'legacy-is-vanity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You can now match the man to the moment — and avoid the exam\'s favourite biographical trap. Milton\'s early poems carry republican fire before the darkness came.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_013', difficulty: 'standard',
          question: 'Critical thinking in poetry analysis is the disciplined process of examining.',
          hint: 'If stuck, return to c12_eng_k_cbse_07_012 and re-answer the NCERT "Understanding the.',
          misconception: 'Students often treat "critical analysis" as "listing poetic devices" — they identify a metaphor in "On Time" (Time as.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Milton calls Time "envious" in the opening line of "On Time". What is Time envious of, according to the poem\'s logic?', answer: 'Time is "envious"',
                  options: ['Time is "envious"', 'Time is envious of humans', 'last of all, thy greedy self consum\'d'],
                  hint: 'If stuck, return to c12_eng_k_cbse_07_012 and re-answer the NCERT "Understanding the Poem".',
                  misconception: 'Students often treat "critical analysis" as "listing poetic devices" — they identify a metaphor in "On Time" (Time as a devouring monster).' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['If a student cannot move beyond device identification: 1) Have them re-read the "Understanding the Poem" questions.', '2) Model a think-aloud on "On Time" lines 5-8: "So little is our loss / So little is thy gain" — ask: why "so little"?', 'Because what Time takes is "false and vain".', 'The metaphor of the womb/devouring isn\'t just decoration; it sets up the accounting metaphor of loss/gain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_014', difficulty: 'standard',
          question: 'Writing skills based on a poetry chapter at Class 12 level refer to the ability.',
          hint: 'If stuck on analysis, return to c12_eng_k_cbse_07_008 (Imagery and Metaphor) and.',
          misconception: 'Students believe "critical appreciation" means listing poetic devices (simile, metaphor, alliteration) and explaining.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on a poetry chapter at Class 12 level refer to the ability to',
                  options: ['Writing skills based on a poetry chapter at Class 12 level refer to the ability to', '"Before You Read: Context and Background" for Milton\'s poems provides the essential', 'In poetry, plot and narrative structure refers to the organized progression of ideas,', 'Setting in poetry refers to the temporal, spatial, and metaphysical context in'],
                  hint: 'If stuck on analysis, return to c12_eng_k_cbse_07_008 (Imagery and Metaphor) and.',
                  misconception: 'Students believe "critical appreciation" means listing poetic devices (simile, metaphor, alliteration) and explaining their *dictionary.' }
          ],
            remediations: { 'critical-appreciation-means-listing-poetic': { steps: ['**Diagnose:** Ask student to highlight every sentence in their answer that *analyzes effect* vs.', 'If <50% are analysis, they\'re device-spotting.', '**Remediate:** Give a 4-line poem fragment.', 'Have them write *only* the Explanation step of PEEL for one device — no Point, Evidence, Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical appreciation" means listing poetic devices (simile, metaphor, alliteration) and explaining.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: *"Milton\'s \'On Shakespeare\' is more effective because it uses simpler language than \'On Time\'."* Defend or challenge with two specific.', answer: '**Challenge.** Simplicity ≠ effectiveness',
                  options: ['**Challenge.** Simplicity ≠ effectiveness', 'simple words', 'clear meaning', 'critical appreciation'],
                  hint: 'If stuck on analysis, return to c12_eng_k_cbse_07_008 (Imagery and Metaphor) and.',
                  misconception: 'Students believe "critical appreciation" means listing poetic devices (simile, metaphor, alliteration) and explaining their *dictionary.' }
          ],
            remediations: { 'critical-appreciation-means-listing-poetic': { steps: ['**Diagnose:** Ask student to highlight every sentence in their answer that *analyzes effect* vs.', 'If <50% are analysis, they\'re device-spotting.', '**Remediate:** Give a 4-line poem fragment.', 'Have them write *only* the Explanation step of PEEL for one device — no Point, Evidence, Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_07_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points for Milton\'s poems involves.',
          hint: 'If stuck, revisit c12_eng_k_cbse_07_008 and c12_eng_k_cbse_07_009 for device.',
          misconception: 'Students treat literary discussion as a "sharing circle" where all opinions are equally valid, leading to vague.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points for Milton\'s poems involves structured oral',
                  options: ['Speaking and Listening: Discussion Points for Milton\'s poems involves structured oral', '"Before You Read: Context and Background" for Milton\'s poems provides the essential', 'In poetry, plot and narrative structure refers to the organized progression of ideas,', 'Setting in poetry refers to the temporal, spatial, and metaphysical context in'],
                  hint: 'If stuck, revisit c12_eng_k_cbse_07_008 and c12_eng_k_cbse_07_009 for device identification, then.',
                  misconception: 'Students treat literary discussion as a "sharing circle" where all opinions are equally valid, leading to vague comments like "It\'s deep".' }
          ],
            remediations: { 'students-treat-literary-discussion-as': { steps: ['Have the student re-read c12_eng_k_cbse_07_008 (Imagery and Metaphor) and c12_eng_k_cbse_07_009 (Irony and Symbolism).', 'Practice the "Claim-Evidence-Response" protocol: make one claim about a poem, quote the exact line, then have a partner.', 'Record a 2-minute solo "discussion" on a phone, then replay and count how many times you cite text vs.', 'Re-attempt Diagnostic Questions 3 and 5 with the Claim-Evidence-Response structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
