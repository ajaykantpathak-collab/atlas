import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch11_p1: SimDef = {
    id: 'v3_c12_eng_k_ch11_p1',
    title: 'The Wild Swans at Coole (Poem) · Part 1/3',
    subtitle: 'The swans haven\'t grown old — that\'s the wound',
    classLevel: 12, subject: 'eng_k', topic: 'The Wild Swans at Coole (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch11'],
    nodeIds: ['c12_eng_k_cbse_11_001', 'c12_eng_k_cbse_11_002', 'c12_eng_k_cbse_11_003', 'c12_eng_k_cbse_11_004', 'c12_eng_k_cbse_11_005', 'c12_eng_k_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'Nineteen years of the same lake, the same count, the same wings — and everything around them has changed.', goal: 'Read The Wild Swans at Coole through Yeats\'s 1916 world — Coole, Lady Gregory, the Rising — and its elegy for permanence.' },
    discovery: {
        question: 'Fifty-one, twice rejected, his country in revolt — Yeats counts the swans at Coole for the nineteenth autumn and finds them \'unwearied.\' What are the swans really measuring?',
        options: ['His own losses — their permanent passion throws his sore heart, failed loves and shaken Ireland into painful relief', 'Just the swan population', 'The lake\'s ecology', 'Nothing — it\'s a nature poem'],
        answer: 'His own losses — their permanent passion throws his sore heart, failed loves and shaken Ireland into painful relief',
        hook: '\'Nineteenth autumn\' is arithmetic with memory: 1916 minus nineteen lands on 1897, the year he met Lady Gregory — and in 1916 the Easter Rising and his final rejection arrived together. Without that scaffold the poem is pretty birds; with it, an elegy for a vanishing world.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" refers to the essential biographical, historical, literary, and geographical information about the poet W.B.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Make the count with him: fix the autumn arithmetic, weigh public collapse against private loss, and trace how the swans\' sudden flight \'scattering wheeling\' becomes everything he can no longer hold.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you are meeting a new classmate who seems quiet and intense. You\'d want to know: Where are they from? What have they been through?',
            decisions: [{ prompt: 'Who was W.B. Yeats, and what major literary honor did he receive in 1923?', options: [
                { text: 'W.B', outcome: 'W.B. Yeats (1865–1939) was an Irish poet, dramatist, and mystic, a driving force of the Irish.' },
                { text: 'context', outcome: 'Not quite — Students often think "context" means memorizing dates (1865, 1923, 1916) and names (Lady Gregory.', reveals: 'context-means-memorizing-dates-1865' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a film that opens with a beautiful lake scene, then cuts to a flashback of the same place 19 years earlier, then returns to the present.',
            decisions: [{ prompt: 'What is the primary temporal shift that occurs between stanza 1 and stanza 2 of "The Wild Swans at Coole"?', options: [
                { text: 'Stanza 1 establishes the present moment ("October twilight," "now"), while stanza 2 jumps', outcome: 'Stanza 1 establishes the present moment ("October twilight," "now"), while stanza 2 jumps back 19.' },
                { text: 'no shift', outcome: 'Not quite — Students treat "plot" in poetry as a sequence of physical events (like a story) and therefore claim.', reveals: 'students-treat-plot-in-poetry' },
                { text: 'shift to future', outcome: 'Not quite — Students treat "plot" in poetry as a sequence of physical events (like a story) and therefore claim.', reveals: 'students-treat-plot-in-poetry' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you visit your childhood park after twenty years — the trees are taller, the paths feel narrower, and a quiet sadness mixes with nostalgia.',
            decisions: [{ prompt: 'What is the difference between \'setting\' and \'atmosphere\' in a poem? Give a one-sentence distinction.', options: [
                { text: 'Setting is the concrete time, place, and physical environment (e.g., "Coole Park in', outcome: 'Setting is the concrete time, place, and physical environment (e.g., "Coole Park in October.' },
                { text: 'the weather', outcome: 'Not quite — Students treat setting and atmosphere as interchangeable labels: they underline "autumn,".', reveals: 'students-treat-setting-and-atmosphere' },
                { text: 'how does the setting create atmosphere?', outcome: 'Not quite — Students treat setting and atmosphere as interchangeable labels: they underline "autumn,".', reveals: 'students-treat-setting-and-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are looking at an old photograph of yourself from nineteen years ago — what do you feel? That is exactly where the speaker stands at Coole Park.',
            decisions: [{ prompt: 'Who is the protagonist in "The Wild Swans at Coole," and what is his primary role in the poem?', options: [
                { text: 'The protagonist is the first-person speaker, identified with the poet W.B', outcome: 'The protagonist is the first-person speaker, identified with the poet W.B. Yeats himself.' },
                { text: 'the swans are the protagonist', outcome: 'Not quite — Students often think the protagonist is "just the poet describing birds" and write plot summary.', reveals: 'the-protagonist-is-just-the' },
                { text: 'just the poet describing birds', outcome: 'Not quite — Students often think the protagonist is "just the poet describing birds" and write plot summary.', reveals: 'the-protagonist-is-just-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine sitting by a lake in October, watching a flock of swans take flight — their wings loud, their energy seemingly inexhaustible — while you feel the.',
            decisions: [{ prompt: 'What is the exact number of swans the speaker counts in the first stanza, and why does the precision of that number matter for.', options: [
                { text: 'The speaker counts fifty-nine swans ("nine-and-fifty")', outcome: 'The speaker counts fifty-nine swans ("nine-and-fifty"). The odd number — one swan without a mate.' },
                { text: 'about fifty', outcome: 'Not quite — Students routinely treat the swans as fifty-nine *individual* characters ("the swans are happy,".', reveals: 'students-routinely-treat-the-swans' },
                { text: 'many swans', outcome: 'Not quite — Students routinely treat the swans as fifty-nine *individual* characters ("the swans are happy,".', reveals: 'students-routinely-treat-the-swans' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you find an old photograph of yourself from ten years ago — you notice how much you\'ve changed while the background scenery looks exactly the same.',
            decisions: [{ prompt: 'What is the primary theme of "The Wild Swans at Coole" in one sentence?', options: [
                { text: 'The primary theme is the contrast between the timeless, unwearying vitality of nature', outcome: 'The primary theme is the contrast between the timeless, unwearying vitality of nature (embodied.' },
                { text: 'The poem is about beautiful swans in autumn', outcome: 'Not quite — Students often treat the swans as mere symbols of "beauty" or "freedom" and write essays about.', reveals: 'students-often-treat-the-swans' },
                { text: 'mystery', outcome: 'Not quite — Students often treat the swans as mere symbols of "beauty" or "freedom" and write essays about.', reveals: 'students-often-treat-the-swans' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Back at a childhood lake for the first time in twenty years, a middle-aged alum watches the birds scatter unchanged and says bitterly, \'they\'re the same — only I\'ve aged.\'',
            decisions: [{ prompt: 'How does Yeats frame that bitterness?', options: [
                { text: 'As the real subject — \'The Wild Swans at Coole\' holds both truths at once: the swans\' brilliant continuity and the speaker\'s nineteenth autumn; the pain is the gap, and naming it is the poem\'s consolation.', outcome: 'Continuity in the world plus change in the self is exactly the tension Yeats sits with — the swans aren\'t mocking him; they\'re measuring time.' },
                { text: 'He\'s right to be bitter — unchanging things exist to reproach the aging.', outcome: 'The poem reads permanence as beautiful, not mocking; turning it into an accusation is the bitterness talking.', reveals: 'permanence-as-reproach' },
                { text: 'Cheer up — nothing really changes, including him.', outcome: 'That denies the poem\'s whole grief; Yeats insists the change in the observer is real and counts.', reveals: 'change-blindness' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a landscape as a man\'s ledger of losses — modernist poetry where history hides inside private symbols.',
            decisions: [{ prompt: 'What comes next? The Wild Swans at Coole (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Wild Swans at Coole (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" refers to the essential biographical.',
          hint: 'If stuck, review the "Before You Read" section of any Class 11 Woven Words poem (e.g.',
          misconception: 'Students often think "context" means memorizing dates (1865, 1923, 1916) and names (Lady Gregory, Maud Gonne) for.',
          parts: [
                { id: 'a', prompt: 'The poem mentions "the nineteenth autumn." If the poem was published in 1917 (written 1916), in what year did Yeats first visit Coole and begin counting the.', answer: '1916 (composition year) minus 19 autumns = 1897',
                  options: ['1916 (composition year) minus 19 autumns = 1897', 'nineteenth autumn', 'context'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Woven Words poem (e.g.',
                  misconception: 'Students often think "context" means memorizing dates (1865, 1923, 1916) and names (Lady Gregory, Maud Gonne) for a 1-mark quiz.' },
                { id: 'b', prompt: 'Compare the historical context of 1916 Ireland (Easter Rising, WWI) with the personal context of Yeats\'s life at 51 (rejected by Maud Gonne, then by her.', answer: 'The 1916 Easter Rising shattered Yeats\'s belief in peaceful cultural nationalism',
                  options: ['The 1916 Easter Rising shattered Yeats\'s belief in peaceful cultural nationalism', 'Yeats was sad because of the Rising', 'context', 'lists events but fails to link them to the poem\'s emotional core (e'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Woven Words poem (e.g.',
                  misconception: 'Students often think "context" means memorizing dates (1865, 1923, 1916) and names (Lady Gregory, Maud Gonne) for a 1-mark quiz.' }
          ],
            remediations: { 'context-means-memorizing-dates-1865': { steps: ['If a student cannot answer Diagnostic Questions 2–4 correctly: (1) Have them re-read the textbook\'s introductory note.', '(2) Ask them to draw a simple timeline: 1897 (first visit) → 1916 (19th autumn, Easter Rising, Iseult\'s rejection) →.', '(3) Give them a 3-column table: "Historical Event / Personal Event / Poem Detail It Illuminates" and have them fill one.', '(4) Re-administer Diagnostic Question 4 orally, prompting: "Which word in the poem might connect to the Easter Rising?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "context" means memorizing dates (1865, 1923, 1916) and names (Lady Gregory, Maud Gonne) for.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The Wild Swans at Coole is just a beautiful nature poem about birds; the historical background is irrelevant." Evaluate this claim using.', answer: 'The claim is false',
                  options: ['The claim is false', 'context'],
                  hint: 'If stuck, review the "Before You Read" section of any Class 11 Woven Words poem (e.g.',
                  misconception: 'Students often think "context" means memorizing dates (1865, 1923, 1916) and names (Lady Gregory, Maud Gonne) for a 1-mark quiz.' }
          ],
            remediations: { 'context-means-memorizing-dates-1865': { steps: ['If a student cannot answer Diagnostic Questions 2–4 correctly: (1) Have them re-read the textbook\'s introductory note.', '(2) Ask them to draw a simple timeline: 1897 (first visit) → 1916 (19th autumn, Easter Rising, Iseult\'s rejection) →.', '(3) Give them a 3-column table: "Historical Event / Personal Event / Poem Detail It Illuminates" and have them fill one.', '(4) Re-administer Diagnostic Question 4 orally, prompting: "Which word in the poem might connect to the Easter Rising?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_002', difficulty: 'standard',
          question: 'In poetry, narrative structure refers to the organization of the speaker\'s.',
          hint: 'Review c11_eng_w_cbse_01_002 (Class 11 poem narrative structure) and practice identifying.',
          misconception: 'Students treat "plot" in poetry as a sequence of physical events (like a story) and therefore claim this poem "has.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In poetry, narrative structure refers to the organization of the speaker\'s observations,',
                  options: ['In poetry, narrative structure refers to the organization of the speaker\'s observations,', '"Before You Read: Context and Background" refers to the essential biographical,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s', 'Character analysis of the protagonist in a lyric poem involves examining the speaker\'s'],
                  hint: 'Review c11_eng_w_cbse_01_002 (Class 11 poem narrative structure) and practice identifying time.',
                  misconception: 'Students treat "plot" in poetry as a sequence of physical events (like a story) and therefore claim this poem "has no plot." They miss that.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['Have the student create a timeline on paper with five points (Stanza 1–5), labeling each with its time reference (now.', 'Ask them to write one sentence per stanza summarizing the *speaker\'s emotional state*, not the swans\' actions.', 'Re-read the poem aloud, pausing at each temporal marker ("since," "first," "now," "still," "some day") and naming the.', 'Re-attempt Diagnostic Question 4 with the timeline visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_003', difficulty: 'standard',
          question: 'Setting in poetry refers to the time, place, and physical environment where the.',
          hint: 'If stuck, return to c11_eng_w_cbse_01_003 and re-do the "sensory detail → emotion".',
          misconception: 'Students treat setting and atmosphere as interchangeable labels: they underline "autumn," "twilight," "water" and write.',
          parts: [
                { id: 'a', prompt: 'Apply the setting-atmosphere analysis to these two lines: "The woodland paths are dry, / Under the October twilight the water / Mirrors a still sky." Identify.', answer: 'Detail 1: "woodland paths are dry"',
                  options: ['Detail 1: "woodland paths are dry"', 'both show it\'s quiet', 'lists details without linking each to a distinct atmospheric quality (e'],
                  hint: 'If stuck, return to c11_eng_w_cbse_01_003 and re-do the "sensory detail → emotion" mapping exercise.',
                  misconception: 'Students treat setting and atmosphere as interchangeable labels: they underline "autumn," "twilight," "water" and write "this creates a sad.' }
          ],
            remediations: { 'students-treat-setting-and-atmosphere': { steps: ['Have the student list every concrete noun and adjective in stanza 1 (trees, autumn, beauty, woodland, paths, dry.', 'For each, ask "If this word were a colour/sound/temperature, what would it be?" (e.g., dry = beige, rough; brimming.', 'Group the sensory impressions into clusters (barrenness, suspension, abundance, vitality).', 'Map each cluster to an atmospheric layer (melancholy, eeriness, richness, energy).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist in a lyric poem involves examining the.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_004 (Character Analysis: Protagonist in a lyric poem).',
          misconception: 'Students often think the protagonist is "just the poet describing birds" and write plot summary instead of character.',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist in "The Wild Swans at Coole," and what is his primary role in the poem?', answer: 'The protagonist is the first-person speaker, identified with the poet W.B',
                  options: ['The protagonist is the first-person speaker, identified with the poet W.B', 'the swans are the protagonist', 'just the poet describing birds'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_004 (Character Analysis: Protagonist in a lyric poem) and.',
                  misconception: 'Students often think the protagonist is "just the poet describing birds" and write plot summary instead of character analysis.' },
                { id: 'b', prompt: 'Apply the concept of "contrast" to analyze how the protagonist\'s character is revealed in stanza 3 ("Unwearied still, lover by lover...").', answer: 'Contrast 1: The swans are "unwearied" and "their hearts have not grown old"',
                  options: ['Contrast 1: The swans are "unwearied" and "their hearts have not grown old"', 'unwearied', 'their hearts have not grown old', 'and he has aged across'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_004 (Character Analysis: Protagonist in a lyric poem) and.',
                  misconception: 'Students often think the protagonist is "just the poet describing birds" and write plot summary instead of character analysis.' }
          ],
            remediations: { 'the-protagonist-is-just-the': { steps: ['If a student writes summary instead of analysis, ask: "What does the speaker choose to notice?', 'Why does he count exactly fifty-nine swans?" Then have them list three adjectives for the speaker (e.g., melancholy.', 'Next, model a PEEL paragraph: Point — The speaker is haunted by time.', 'Evidence — "The nineteenth autumn has come upon me." Explanation — The precise number personalizes the universal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_005', difficulty: 'standard',
          question: 'In poetry, supporting characters are non-protagonist entities — often natural.',
          hint: 'If stuck, review "foil" using the protagonist\'s traits (c12_eng_k_cbse_11_004) and ask.',
          misconception: 'Students routinely treat the swans as fifty-nine *individual* characters ("the swans are happy," "the swans are free").',
          parts: [
                { id: 'a', prompt: 'What is the exact number of swans the speaker counts in the first stanza, and why does the precision of that number matter for characterizing them as.', answer: 'The speaker counts fifty-nine swans ("nine-and-fifty")',
                  options: ['The speaker counts fifty-nine swans ("nine-and-fifty")', 'about fifty', 'many swans'],
                  hint: 'If stuck, review "foil" using the protagonist\'s traits (c12_eng_k_cbse_11_004) and ask: "What does.',
                  misconception: 'Students routinely treat the swans as fifty-nine *individual* characters ("the swans are happy," "the swans are free") rather than.' },
                { id: 'b', prompt: 'Explain in your own words how the swans\' behavior in the second stanza ("All suddenly mount / And scatter wheeling in great broken rings / Upon their clamorous.', answer: 'The swans erupt into sudden, coordinated, noisy flight',
                  options: ['The swans erupt into sudden, coordinated, noisy flight', 'beautiful', 'peaceful'],
                  hint: 'If stuck, review "foil" using the protagonist\'s traits (c12_eng_k_cbse_11_004) and ask: "What does.',
                  misconception: 'Students routinely treat the swans as fifty-nine *individual* characters ("the swans are happy," "the swans are free") rather than.' }
          ],
            remediations: { 'students-routinely-treat-the-swans': { steps: ['Re-read stanza 1 aloud, circling "nine-and-fifty" and "swans" (plural verb, singular collective noun).', 'List every verb applied to "they" (the swans) across stanzas 2–5; note they are all plural verbs describing *one*.', 'Write one sentence: "The swans act as one character because ___." 4.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_11_006', difficulty: 'standard',
          question: 'The primary theme of a poem is the central, unifying idea or insight about life.',
          hint: 'If stuck, review how to annotate a poem for theme (node c11_eng_h_cbse_01_006 or similar).',
          misconception: 'Students often treat the swans as mere symbols of "beauty" or "freedom" and write essays about nature\'s loveliness.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the contrast the poet draws between himself and the swans in stanzas 2 and 4.', answer: 'The poet contrasts his own aging',
                  options: ['The poet contrasts his own aging', 'The poet is sad and the swans are happy', 'mystery', 'says "The poet is sad and the swans are happy" oversimplifies'],
                  hint: 'If stuck, review how to annotate a poem for theme (node c11_eng_h_cbse_01_006 or similar).',
                  misconception: 'Students often treat the swans as mere symbols of "beauty" or "freedom" and write essays about nature\'s loveliness, completely missing that.' },
                { id: 'b', prompt: 'How does the autumn setting in stanza 1 ("trees in their autumn beauty", "dry woodland paths", "October twilight") function as more than just background?', answer: 'Autumn is the season of maturity and impending decay',
                  options: ['Autumn is the season of maturity and impending decay', 'It sets a sad mood', 'mystery'],
                  hint: 'If stuck, review how to annotate a poem for theme (node c11_eng_h_cbse_01_006 or similar).',
                  misconception: 'Students often treat the swans as mere symbols of "beauty" or "freedom" and write essays about nature\'s loveliness, completely missing that.' }
          ],
            remediations: { 'students-often-treat-the-swans': { steps: ['Have the student re-read *only* the first-person lines ("I saw", "my heart", "I first made my count", "I awake") and.', 'Create a two-column T-chart: left column "Poet (Human Time)", right column "Swans (Nature\'s Time)".', 'Fill with phrases: "nineteenth autumn" / "unwearied still", "heart is sore" / "hearts have not grown old".', 'Ask: "If the swans flew away tomorrow, what would the poet lose?" — this forces the connection between the birds\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
