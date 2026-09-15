import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch09_p2: SimDef = {
    id: 'v3_c12_eng_k_ch09_p2',
    title: 'Poems by Wordsworth (Poem) · Part 2/3',
    subtitle: '300 lines dreamed, a knock at the door, and a poem left unfinished on purpose',
    classLevel: 12, subject: 'eng_k', topic: 'Poems by Wordsworth (Poem) · Part 2/3',
    chapters: ['c12_eng_k_ch09'],
    nodeIds: ['c12_eng_k_cbse_09_007', 'c12_eng_k_cbse_09_008', 'c12_eng_k_cbse_09_009', 'c12_eng_k_cbse_09_010', 'c12_eng_k_cbse_09_011', 'c12_eng_k_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Romantic poetry critic', intro: 'An emperor\'s pleasure-dome, an opium dream, one ill-timed visitor — and English literature\'s most famous fragment.', goal: 'Read Kubla Khan through its dream composition, Romantic aims and the power of the unfinished fragment.' },
    discovery: {
        question: 'Coleridge dreams 300 perfect lines of Kubla Khan, wakes, writes — and a \'person from Porlock\' knocks. The rest vanishes forever. Is that a tragedy for literature?',
        options: ['Maybe the opposite — the fragment perfectly performs the Romantic idea that imagination outruns any page; its incompleteness is the aesthetic', 'Pure tragedy — half a masterpiece lost', 'It was never a real dream anyway', 'He should have locked the door'],
        answer: 'Maybe the opposite — the fragment perfectly performs the Romantic idea that imagination outruns any page; its incompleteness is the aesthetic',
        hook: 'Coleridge\'s aim was \'presenting the supernatural as real\' — Xanadu\'s dome, the sacred river, the demon-lover told flat as fact. Where Wordsworth made the ordinary strange, Coleridge made the strange ordinary. The fragment isn\'t broken; it\'s a glimpse of infinity the page couldn\'t hold.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, motifs, and underlying concerns that enrich the primary theme of a poem, operating as parallel threads that deepen meaning, create tension, or offer.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter Xanadu as a Romantic: place the real Mongol emperor beside the dream palace, weigh the Porlock knock as loss or gift, and read how the supernatural gets narrated like a news report.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a movie where the main plot is about a painter trying to capture a perfect sunset — that\'s your primary theme.',
            decisions: [{ prompt: 'What is a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, enriching', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, enriching it.' },
                { text: 'minor details', outcome: 'Not quite — Students consistently confuse **secondary themes with motifs or symbols**.', reveals: 'students-consistently-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students consistently confuse **secondary themes with motifs or symbols**.', reveals: 'students-consistently-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing in a forest at dusk: you *see* the fading light, *hear* the rustle of leaves, *smell* damp earth, *feel* the cool air on your skin.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from any Wordsworth poem you have studied.', options: [
                { text: 'Imagery: language appealing to senses (e.g., "the green earth"', outcome: 'Imagery: language appealing to senses (e.g., "the green earth" — visual).' },
                { text: 'like a flower', outcome: 'Not quite — Students consistently treat imagery as "only visual description" and metaphor as "just a fancy.', reveals: 'students-consistently-treat-imagery-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are reading "Kubla Khan" aloud and suddenly notice the jarring shift from the sunny pleasure dome to the "caves of ice" — that clash is your entry.',
            decisions: [{ prompt: 'Define symbolism and give one example from "Kubla Khan" without quoting the poem.', options: [
                { text: 'Symbolism is using a concrete object to represent an abstract idea', outcome: 'Symbolism is using a concrete object to represent an abstract idea.' },
                { text: 'the dome is a metaphor for a house', outcome: 'Not quite — Students often think "symbolism" means "any metaphor" and "irony" means "funny coincidence.".', reveals: 'symbolism-means-any-metaphor-and' },
                { text: 'symbolism', outcome: 'Not quite — Students often think "symbolism" means "any metaphor" and "irony" means "funny coincidence.".', reveals: 'symbolism-means-any-metaphor-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading "Kubla Khan" and hit the word "sinuous" in "gardens bright with sinuous rills." You could guess "curvy" from "rills" (streams), but the.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a poem like "Kubla Khan" when a dictionary is not allowed.', options: [
                { text: 'The primary strategy is contextual analysis: using the surrounding words, imagery,', outcome: 'The primary strategy is contextual analysis: using the surrounding words, imagery, grammatical.' },
                { text: 'guess from the first letter', outcome: 'Not quite — Students believe "vocabulary in context" means finding a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'skip the word', outcome: 'Not quite — Students believe "vocabulary in context" means finding a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you’re reading *Kubla Khan* aloud and stumble over “A stately pleasure-dome decree” — why doesn’t it say “decreed a stately pleasure-dome”?',
            decisions: [{ prompt: 'Identify the grammatical term for the word order in the opening line “In Xanadu did Kubla Khan / A stately pleasure-dome decree” and state.', options: [
                { text: 'The pattern is **subject-auxiliary inversion** (interrogative structure used', outcome: 'The pattern is **subject-auxiliary inversion** (interrogative structure used declaratively).' },
                { text: 'passive voice', outcome: 'Not quite — Students believe **“poetic grammar = broken grammar”** — they label inversions, ellipses,.', reveals: 'poetic-grammar-broken-grammar-they' },
                { text: 'normal order', outcome: 'Not quite — Students believe **“poetic grammar = broken grammar”** — they label inversions, ellipses,.', reveals: 'poetic-grammar-broken-grammar-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see the question: "What is the \'discordant note\' heard at the end of the third stanza, and what does it suggest.',
            decisions: [{ prompt: 'What is the difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What is the', outcome: 'A literal question asks for information directly stated in the text (e.g., "What is the name of the.' },
                { text: 'any personal opinion', outcome: 'Not quite — Students often believe inferential questions allow "any personal opinion" as long as it sounds.', reveals: 'inferential-questions-allow-any-personal' },
                { text: 'inferential questions allow "any personal opinion" as long', outcome: 'Not quite — Students often believe inferential questions allow "any personal opinion" as long as it sounds.', reveals: 'inferential-questions-allow-any-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A writer is mid-flow on a dazzling draft when a \'person from Porlock\' — a routine visitor — breaks the trance; the vision never fully returns.',
            decisions: [{ prompt: 'What does the Kubla Khan story teach a team managing creative work?', options: [
                { text: 'Protect uninterrupted flow — Coleridge\'s lost dream shows a vision in motion can\'t simply be \'resumed later\'; guard creative trance and capture what\'s salvageable rather than demanding instant re-entry.', outcome: 'The fragment is a wound, not a design: interruption destroyed the vision, and the surviving piece is still worth keeping.' },
                { text: 'No protection needed — you can always pick a thought back up where you left it.', outcome: 'Coleridge tried for hours and got only fragments; vision in flow is not a parked car.', reveals: 'flow-is-resumable' },
                { text: 'Discard the fragment — unfinished work is failed work.', outcome: 'Kubla Khan became a touchstone precisely as a fragment; incompleteness can still be monumental.', reveals: 'incomplete-means-worthless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend a fragment as a finished statement — and tell vision from fancy. The dome in air was never meant to be completed.',
            decisions: [{ prompt: 'What comes next? Poems by Wordsworth (Poem) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Poems by Wordsworth (Poem) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, motifs, and underlying concerns that.',
          hint: 'If unable to move from image to idea, revisit the "theme statement frame" from Class 9.',
          misconception: 'Students consistently confuse **secondary themes with motifs or symbols**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the supporting ideas, motifs, and underlying concerns that enrich',
                  options: ['Secondary themes are the supporting ideas, motifs, and underlying concerns that enrich', '"Before You Read: Context and Background" for *Kubla Khan* provides the essential', 'Plot and narrative structure in poetry refers to the deliberate arrangement of events,', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'If unable to move from image to idea, revisit the "theme statement frame" from Class 9.',
                  misconception: 'Students consistently confuse **secondary themes with motifs or symbols**.' }
          ],
            remediations: { 'students-consistently-confuse-secondary-themes': { steps: ['If the student cannot distinguish theme from motif: (1) Give them three motifs from the poem (river, dome, dulcimer).', 'Write it as a full sentence." (2) Have them complete this frame: "The motif of ______ suggests that ______." (3) Then.', '(4) Re-diagnose using Diagnostic Question 2 — if they still name images instead of ideas, revisit Class 11 node.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck on sensory classification, revisit the "five senses" anchor chart from.',
          misconception: 'Students consistently treat imagery as "only visual description" and metaphor as "just a fancy comparison." They write.',
          parts: [
                { id: 'a', prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from any Wordsworth poem you have studied.', answer: 'Imagery: language appealing to senses (e.g., "the green earth"',
                  options: ['Imagery: language appealing to senses (e.g., "the green earth"', 'like a flower'],
                  hint: 'If stuck on sensory classification, revisit the "five senses" anchor chart from c6_english_u1_005.',
                  misconception: 'Students consistently treat imagery as "only visual description" and metaphor as "just a fancy comparison." They write "the poet uses.' },
                { id: 'b', prompt: 'In "The Tables Turned", Wordsworth writes: "One impulse from a vernal wood / May teach you more of man, / Of moral evil and of good, / Than all the sages can.".', answer: 'Metaphor: "vernal wood" as teacher',
                  options: ['Metaphor: "vernal wood" as teacher', 'vernal wood', 'like/as', 'impulse'],
                  hint: 'If stuck on sensory classification, revisit the "five senses" anchor chart from c6_english_u1_005.',
                  misconception: 'Students consistently treat imagery as "only visual description" and metaphor as "just a fancy comparison." They write "the poet uses.' }
          ],
            remediations: { 'students-consistently-treat-imagery-as': { steps: ['If a student cannot distinguish sensory modes or identify tenor/vehicle: Step 1 — Return to c6_english_u1_005 (Poetic.', 'Step 2 — Take one stanza from "Lines Written in Early Spring" and physically highlight with five different coloured.', 'Step 3 — For every metaphor found, draw a two-column table: Tenor | Vehicle | Transferred Quality.', 'Step 4 — Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_009', difficulty: 'standard',
          question: 'Irony in poetry is a contrast between expectation and reality, often revealing.',
          hint: 'Review the difference between metaphor (direct comparison) and symbol (object standing.',
          misconception: 'Students often think "symbolism" means "any metaphor" and "irony" means "funny coincidence." In "Kubla Khan," they may.',
          parts: [
                { id: 'a', prompt: 'Define symbolism and give one example from "Kubla Khan" without quoting the poem.', answer: 'Symbolism is using a concrete object to represent an abstract idea',
                  options: ['Symbolism is using a concrete object to represent an abstract idea', 'the dome is a metaphor for a house', 'symbolism', 'any metaphor'],
                  hint: 'Review the difference between metaphor (direct comparison) and symbol (object standing for abstract.',
                  misconception: 'Students often think "symbolism" means "any metaphor" and "irony" means "funny coincidence." In "Kubla Khan," they may label the "damsel.' }
          ],
            remediations: { 'symbolism-means-any-metaphor-and': { steps: ['Re-read the poem focusing only on concrete nouns (dome, river, caves, damsel, milk, honeydew).', 'For each, write one abstract noun it could represent.', 'Revisit the Class 10 node c10_engl_cbse_01_007 (Irony in \'A Letter to God\') to relearn irony types.', 'Write a PEEL paragraph on one symbol and one irony, then compare with the worked examples below.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the meaning.',
          hint: 'If stuck, review "Imagery and Metaphor" (c12_eng_k_cbse_09_008) — specifically the worked.',
          misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'The poem uses "dulcimer" in "A damsel with a dulcimer / In a vision once I saw." Without prior knowledge of the instrument, use the immediate context (lines.', answer: 'From context: (1) It is a musical instrument ("on her dulcimer she played")',
                  options: ['From context: (1) It is a musical instrument ("on her dulcimer she played")', 'string instrument', 'vocabulary in context'],
                  hint: 'If stuck, review "Imagery and Metaphor" (c12_eng_k_cbse_09_008) — specifically the worked example.',
                  misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Have the student pick one misunderstood word (e.g., "chasm").', 'Ask them to draw the image the stanza creates around it (the slanted hill, cedarn cover, wailing woman).', 'Have them list 5 adjectives the image forces onto "chasm" (e.g., deep, terrifying, magnetic, ancient, supernatural).', 'Finally, write one sentence using "chasm" that captures *all* those adjectives without naming them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The word \'Paradise\' in the final line \'For he on honeydew hath fed, / And drunk the milk of Paradise\' refers only to the biblical Garden.', answer: 'The claim is false',
                  options: ['The claim is false', 'vocabulary in context'],
                  hint: 'If stuck, review "Imagery and Metaphor" (c12_eng_k_cbse_09_008) — specifically the worked example.',
                  misconception: 'Students believe "vocabulary in context" means finding a synonym that fits the sentence grammatically.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Have the student pick one misunderstood word (e.g., "chasm").', 'Ask them to draw the image the stanza creates around it (the slanted hill, cedarn cover, wailing woman).', 'Have them list 5 adjectives the image forces onto "chasm" (e.g., deep, terrifying, magnetic, ancient, supernatural).', 'Finally, write one sentence using "chasm" that captures *all* those adjectives without naming them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck, review **Class 11 Woven Words Grammar node `c11_eng_w_cbse_01_011`** — it has.',
          misconception: 'Students believe **“poetic grammar = broken grammar”** — they label inversions, ellipses, or archaic forms.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical term for the word order in the opening line “In Xanadu did Kubla Khan / A stately pleasure-dome decree” and state one effect of this.', answer: 'The pattern is **subject-auxiliary inversion** (interrogative structure used',
                  options: ['The pattern is **subject-auxiliary inversion** (interrogative structure used', 'passive voice', 'normal order', 'poetic grammar = broken grammar'],
                  hint: 'If stuck, review **Class 11 Woven Words Grammar node `c11_eng_w_cbse_01_011`** — it has the most.',
                  misconception: 'Students believe **“poetic grammar = broken grammar”** — they label inversions, ellipses, or archaic forms as “mistakes” or “poetic.' },
                { id: 'b', prompt: 'Explain in your own words why the poet shifts from past tense (“ran,” “were girdled,” “blossomed”) in the first two stanzas to present tense (“is forced,”.', answer: 'The past tense establishes the **dream-vision as a completed, recalled event**',
                  options: ['The past tense establishes the **dream-vision as a completed, recalled event**', 'past tense because it’s a narrative', 'poetic grammar = broken grammar', 'mistakes'],
                  hint: 'If stuck, review **Class 11 Woven Words Grammar node `c11_eng_w_cbse_01_011`** — it has the most.',
                  misconception: 'Students believe **“poetic grammar = broken grammar”** — they label inversions, ellipses, or archaic forms as “mistakes” or “poetic.' },
                { id: 'c', prompt: 'Compare the sentence structure of the first stanza (one long periodic sentence spanning 11 lines) with the final stanza (four shorter sentences, two of them.', answer: 'The first stanza’s **single periodic sentence**',
                  options: ['The first stanza’s **single periodic sentence**', 'poetic grammar = broken grammar', 'mistakes', 'poetic license'],
                  hint: 'If stuck, review **Class 11 Woven Words Grammar node `c11_eng_w_cbse_01_011`** — it has the most.',
                  misconception: 'Students believe **“poetic grammar = broken grammar”** — they label inversions, ellipses, or archaic forms as “mistakes” or “poetic.' }
          ],
            remediations: { 'poetic-grammar-broken-grammar-they': { steps: ['**Revisit Class 11 Grammar node** `c11_eng_h_cbse_01_011` (or equivalent) on *Sentence Transformation* — practise.', '**Do a “Verb Tense Map”** of *Kubla Khan*: draw three columns (Past / Present / Conditional), list every verb, and.', '**Re-diagnostic**: Give the student a fresh 6-line excerpt (e.g., from *The Rime of the Ancient Mariner*) and ask them.', 'If they still call them “errors,” repeat step 1 with a different text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_09_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'Review the distinction between literal and inferential questions using the Class 11.',
          misconception: 'Students often believe inferential questions allow "any personal opinion" as long as it sounds plausible.',
          parts: [
                { id: 'a', prompt: 'Compare the movement of water in the first half of the poem (the river Alph through gardens and caverns) with its movement in the fountain scene.', answer: 'The first half shows water moving \'with a mazy motion\' through \'wood and dale\'',
                  options: ['The first half shows water moving \'with a mazy motion\' through \'wood and dale\'', 'any personal opinion', 'inferential questions allow "any personal opinion" as long'],
                  hint: 'Review the distinction between literal and inferential questions using the Class 11 comprehension.',
                  misconception: 'Students often believe inferential questions allow "any personal opinion" as long as it sounds plausible.' }
          ],
            remediations: { 'inferential-questions-allow-any-personal': { steps: ['If a student cannot distinguish literal from inferential questions, do this 3-step remediation: (1) Give them five.', '(2) For each inferential one, require them to write the exact words from the rhyme that support their inference.', '(3) Return to "Kubla Khan" and re-attempt Diagnostic Questions 2 and 3, this time highlighting the quoted evidence in.', 'Only move forward when they can independently produce a PEEL paragraph where the Evidence step is a direct quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
