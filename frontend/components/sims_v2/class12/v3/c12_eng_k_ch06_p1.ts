import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch06_p1: SimDef = {
    id: 'v3_c12_eng_k_ch06_p1',
    title: 'A Poem for Magic (Poem) · Part 1/3',
    subtitle: 'The lecture where shadows teach love\'s timetable',
    classLevel: 12, subject: 'eng_k', topic: 'A Poem for Magic (Poem) · Part 1/3',
    chapters: ['c12_eng_k_ch06'],
    nodeIds: ['c12_eng_k_cbse_06_001', 'c12_eng_k_cbse_06_002', 'c12_eng_k_cbse_06_003', 'c12_eng_k_cbse_06_004', 'c12_eng_k_cbse_06_005', 'c12_eng_k_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Metaphysical poetry reader', intro: 'A 17th-century poet grabs his beloved\'s hand and gives her a lecture — on shadows. It becomes a theory of love.', goal: 'Follow Donne\'s shadow conceit through love\'s stages and read metaphysical wit as argument.' },
    discovery: {
        question: 'Donne warns his lover that \'his first minute, after noone, is night.\' Every love song says noon is the peak — what does he see that they don\'t?',
        options: ['That love which doesn\'t hold at noon doesn\'t plateau — it decays instantly; the falling shadows then blind the lovers themselves', 'Nothing — noon is always safe', 'The sun sets, so love must end', 'He means literal nightfall'],
        answer: 'That love which doesn\'t hold at noon doesn\'t plateau — it decays instantly; the falling shadows then blind the lovers themselves',
        hook: 'Metaphysical poetry argues through conceits, not pretty comparisons: morning shadows are the disguises lovers \'ourselves produced\'; afternoon shadows fall inward, blinding the deceivers. It\'s called a Lecture — the shadow is the syllabus.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '\'A Lecture Upon the Shadow\' (Kaleidoscope, ch. 6) — the context and background to this text: who wrote it, the period, and the literary movement it belongs to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Take Donne\'s three-hour walk: track the shadows from disguised morning through \'brave clearnesse\' to the afternoon when deceit turns inward — and decide if love can be \'full constant light.\'',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Start with the author of \'A Lecture Upon the Shadow\', then the period, then the literary context — background turns a text from a puzzle into a story you can.',
            decisions: [{ prompt: 'Define "metaphysical poetry" and name two characteristics that distinguish it from Elizabethan lyric poetry.', options: [
                { text: 'Metaphysical poetry is a 17th-century style marked by intellectual complexity, extended', outcome: 'Metaphysical poetry is a 17th-century style marked by intellectual complexity, extended conceits.' },
                { text: 'philosophical themes', outcome: 'Not quite — Students often think "metaphysical" means "abstract philosophy" and treat the poem as a static.', reveals: 'metaphysical-means-abstract-philosophy-and' },
                { text: 'metaphysical', outcome: 'Not quite — Students often think "metaphysical" means "abstract philosophy" and treat the poem as a static.', reveals: 'metaphysical-means-abstract-philosophy-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Identify where and when \'A Lecture Upon the Shadow\' is set, and how the setting shapes its mood and meaning.',
            decisions: [{ prompt: 'What is the literal, physical setting described in the first stanza of the poem?', options: [
                { text: 'The literal setting is a walk taken by two lovers lasting three hours, during', outcome: 'The literal setting is a walk taken by two lovers lasting three hours, during which the sun rises.' },
                { text: 'a garden at sunset', outcome: 'Not quite — Students often treat "setting" in poetry as merely a backdrop (e.g., "the poem is set outside") and.', reveals: 'students-often-treat-setting-in' },
                { text: 'a room at night', outcome: 'Not quite — Students often treat "setting" in poetry as merely a backdrop (e.g., "the poem is set outside") and.', reveals: 'students-often-treat-setting-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Pick the central figure in \'A Lecture Upon the Shadow\' — track their actions, words and choices to see who they really are.',
            decisions: [{ prompt: 'Who is the protagonist (speaker) in "A Lecture Upon the Shadow," and to whom is he speaking?', options: [
                { text: 'The protagonist is the poetic persona', outcome: 'The protagonist is the poetic persona — a male speaker addressing his female beloved ("Love,".' },
                { text: 'John Donne is the speaker', outcome: 'Not quite — Students often think the "protagonist" in a poem is the *poet* (John Donne) or the *beloved* (the.', reveals: 'the-protagonist-in-a-poem' },
                { text: 'The beloved is the protagonist', outcome: 'Not quite — Students often think the "protagonist" in a poem is the *poet* (John Donne) or the *beloved* (the.', reveals: 'the-protagonist-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Spot the secondary figures in \'A Lecture Upon the Shadow\' — how do they help, block or reveal the main character?',
            decisions: [{ prompt: 'In "A Lecture Upon the Shadow", who is the primary addressee of the poem, and what term does the speaker use to address them in the first.', options: [
                { text: 'The primary addressee is the beloved, addressed as "Love" in the first line: "Stand', outcome: 'The primary addressee is the beloved, addressed as "Love" in the first line: "Stand still, and.' },
                { text: 'the sun', outcome: 'Not quite — Students often think "supporting characters" in a poem must be human figures who speak or act.', reveals: 'supporting-characters-in-a-poem' },
                { text: 'the shadows', outcome: 'Not quite — Students often think "supporting characters" in a poem must be human figures who speak or act.', reveals: 'supporting-characters-in-a-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Ask what \'A Lecture Upon the Shadow\' keeps circling back to — that repeated idea is the primary theme.',
            decisions: [{ prompt: 'What is the difference between a **topic** and a **theme** in poetry?', options: [
                { text: 'A topic is a one-word subject (e.g., "love," "shadows," "time")', outcome: 'A topic is a one-word subject (e.g., "love," "shadows," "time").' },
                { text: 'Love and time', outcome: 'Not quite — Students often think the poem is **about the sun and shadows** and treat the love-element as mere.', reveals: 'the-poem-is-about-the' },
                { text: 'A wrong answer that gives only a topic (', outcome: 'Not quite — Students often think the poem is **about the sun and shadows** and treat the love-element as mere.', reveals: 'the-poem-is-about-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two co-founders courted each other with polished masks; now the startup struggles and each privately hides bad metrics \'to keep the other confident\'.',
            decisions: [{ prompt: 'What does Donne\'s shadow-lecture advise?', options: [
                { text: 'Drop the disguises — Donne\'s point is that love (or partnership) only stays at \'noon\' when shadows, the little deceits of courtship and decline, stop growing between the two.', outcome: 'Early \'infant\' disguises and late concealments are the same shadow at different hours; constancy needs daylight honesty.' },
                { text: 'Keep hiding — smooth confidence is what partnerships run on.', outcome: 'The poem argues exactly the reverse: managed appearances are shadows that lengthen until they blot out the thing itself.', reveals: 'disguise-maintains-love' },
                { text: 'Let it fade quietly — once the shadows start, decline is natural.', outcome: 'Donne\'s speaker fights decline with constancy; treating decay as destiny is surrender dressed as wisdom.', reveals: 'decline-is-destiny' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now follow a conceit as a logical machine, not decoration — the exact skill metaphysical poetry demands of a reader.',
            decisions: [{ prompt: 'What comes next? A Poem for Magic (Poem) · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Poem for Magic (Poem) · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_001', difficulty: 'standard',
          question: '\'A Lecture Upon the Shadow\' (Kaleidoscope, ch. 6) — the context and background.',
          hint: 'If stuck on the conceit\'s logic, review c11_eng_w_cbse_01_008 (Imagery and Metaphor).',
          misconception: 'Students often think "metaphysical" means "abstract philosophy" and treat the poem as a static description of love\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'A Lecture Upon the Shadow\' (Kaleidoscope, ch',
                  options: ['\'A Lecture Upon the Shadow\' (Kaleidoscope, ch', 'The plot/narrative arc of \'A Lecture Upon the Shadow\'', 'The setting of \'A Lecture Upon the Shadow\'', 'Character analysis in \'A Lecture Upon the Shadow\''],
                  hint: 'If stuck on the conceit\'s logic, review c11_eng_w_cbse_01_008 (Imagery and Metaphor) — specifically.',
                  misconception: 'Students often think "metaphysical" means "abstract philosophy" and treat the poem as a static description of love\'s stages.' }
          ],
            remediations: { 'metaphysical-means-abstract-philosophy-and': { steps: ['Revisit c11_eng_h_cbse_01_008 (Imagery and Metaphor) and c11_eng_w_cbse_01_008 to rebuild conceit analysis skills.', 'Re-read the NCERT "Understanding the Poem" Q1 and Q3: trace the shadow\'s behavior at three times (morning, noon.', 'Write a 50-word paraphrase of the poem\'s argument in modern English, then compare it to the original — note where.', 'Re-attempt Diagnostic Questions 2 and 3, speaking the reasoning aloud to catch where the conceit\'s reversal (shadows.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "metaphysical" means "abstract philosophy" and treat the poem as a static description of love\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Donne\'s poem argues that perfect, constant love is impossible for humans." Use the poem\'s final couplet ("Love is a growing, or full.', answer: 'The claim is partially defensible but incomplete',
                  options: ['The claim is partially defensible but incomplete', 'Donne is pessimistic', 'metaphysical', 'abstract philosophy'],
                  hint: 'If stuck on the conceit\'s logic, review c11_eng_w_cbse_01_008 (Imagery and Metaphor) — specifically.',
                  misconception: 'Students often think "metaphysical" means "abstract philosophy" and treat the poem as a static description of love\'s stages.' }
          ],
            remediations: { 'metaphysical-means-abstract-philosophy-and': { steps: ['Revisit c11_eng_h_cbse_01_008 (Imagery and Metaphor) and c11_eng_w_cbse_01_008 to rebuild conceit analysis skills.', 'Re-read the NCERT "Understanding the Poem" Q1 and Q3: trace the shadow\'s behavior at three times (morning, noon.', 'Write a 50-word paraphrase of the poem\'s argument in modern English, then compare it to the original — note where.', 'Re-attempt Diagnostic Questions 2 and 3, speaking the reasoning aloud to catch where the conceit\'s reversal (shadows.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_002', difficulty: 'standard',
          question: 'The plot/narrative arc of \'A Lecture Upon the Shadow\' — what happens, in what.',
          hint: 'If stuck, review the concept of "conceit" in metaphysical poetry (Class 11 Woven Words.',
          misconception: 'Students often treat the poem as a simple description of shadows at three times of day, missing that the *entire poem.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The plot/narrative arc of \'A Lecture Upon the Shadow\'',
                  options: ['The plot/narrative arc of \'A Lecture Upon the Shadow\'', '\'A Lecture Upon the Shadow\' (Kaleidoscope, ch', 'The setting of \'A Lecture Upon the Shadow\'', 'Character analysis in \'A Lecture Upon the Shadow\''],
                  hint: 'If stuck, review the concept of "conceit" in metaphysical poetry (Class 11 Woven Words, Chapter 1).',
                  misconception: 'Students often treat the poem as a simple description of shadows at three times of day, missing that the *entire poem is an argument*.' }
          ],
            remediations: { 'students-often-treat-the-poem': { steps: ['Re-read the poem aloud, pausing at each time marker (morning, noon, afternoon).', 'Draw a timeline with three columns: Time / Shadow Position / Love Stage.', 'Fill it using only lines from the poem.', 'Write one sentence answering: "What does the speaker want the beloved to understand?" 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_003', difficulty: 'standard',
          question: 'The setting of \'A Lecture Upon the Shadow\' — the place, time and atmosphere the.',
          hint: 'Review Class 11 node **c11_eng_h_cbse_01_003** (Setting and Atmosphere) for the.',
          misconception: 'Students often treat "setting" in poetry as merely a backdrop (e.g., "the poem is set outside") and "atmosphere" as.',
          parts: [
                { id: 'a', prompt: 'What is the literal, physical setting described in the first stanza of the poem?', answer: 'The literal setting is a walk taken by two lovers lasting three hours, during',
                  options: ['The literal setting is a walk taken by two lovers lasting three hours, during', 'a garden at sunset', 'a room at night'],
                  hint: 'Review Class 11 node **c11_eng_h_cbse_01_003** (Setting and Atmosphere) for the step-by-step.',
                  misconception: 'Students often treat "setting" in poetry as merely a backdrop (e.g., "the poem is set outside") and "atmosphere" as a static label (e.g.' },
                { id: 'b', prompt: 'Explain in your own words how the atmosphere changes from the beginning to the end of the poem.', answer: 'The atmosphere shifts from intellectual clarity and controlled openness ("brave',
                  options: ['The atmosphere shifts from intellectual clarity and controlled openness ("brave', 'romantic'],
                  hint: 'Review Class 11 node **c11_eng_h_cbse_01_003** (Setting and Atmosphere) for the step-by-step.',
                  misconception: 'Students often treat "setting" in poetry as merely a backdrop (e.g., "the poem is set outside") and "atmosphere" as a static label (e.g.' }
          ],
            remediations: { 'students-often-treat-setting-in': { steps: ['Have the student re-read the poem *only* for time markers and shadow descriptions, listing them in a three-column table.', 'Ask: "If this were a science demonstration, what is the independent variable?', '(Sun\'s altitude) What is the dependent variable?', '(Shadow length/direction)" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis in \'A Lecture Upon the Shadow\' — the central figure(s).',
          hint: 'If stuck, review "Speaker vs. Poet" and "Metaphysical Conceit" in c11_eng_w_cbse_01_004.',
          misconception: 'Students often think the "protagonist" in a poem is the *poet* (John Donne) or the *beloved* (the silent listener).',
          parts: [
                { id: 'a', prompt: 'Who is the protagonist (speaker) in "A Lecture Upon the Shadow," and to whom is he speaking?', answer: 'The protagonist is the poetic persona',
                  options: ['The protagonist is the poetic persona', 'John Donne is the speaker', 'The beloved is the protagonist', 'protagonist'],
                  hint: 'If stuck, review "Speaker vs. Poet" and "Metaphysical Conceit" in c11_eng_w_cbse_01_004 and.',
                  misconception: 'Students often think the "protagonist" in a poem is the *poet* (John Donne) or the *beloved* (the silent listener).' },
                { id: 'b', prompt: 'The speaker says: "Except our loves at this noone stay, / We shall new shadowes make the other way." Apply this to a real relationship: what specific behaviour.', answer: 'The speaker warns against love\'s decline ("westwardly decline")',
                  options: ['The speaker warns against love\'s decline ("westwardly decline")', 'problems', 'protagonist'],
                  hint: 'If stuck, review "Speaker vs. Poet" and "Metaphysical Conceit" in c11_eng_w_cbse_01_004 and.',
                  misconception: 'Students often think the "protagonist" in a poem is the *poet* (John Donne) or the *beloved* (the silent listener).' },
                { id: 'c', prompt: 'Compare the speaker\'s attitude toward love in the first stanza (morning shadows) with his attitude in the final two lines.', answer: 'First stanza: analytical, observational, almost scientific ("Stand still',
                  options: ['First stanza: analytical, observational, almost scientific ("Stand still', 'romantic', 'protagonist', 'sees no shift, or calls him "romantic" throughout'],
                  hint: 'If stuck, review "Speaker vs. Poet" and "Metaphysical Conceit" in c11_eng_w_cbse_01_004 and.',
                  misconception: 'Students often think the "protagonist" in a poem is the *poet* (John Donne) or the *beloved* (the silent listener).' }
          ],
            remediations: { 'the-protagonist-in-a-poem': { steps: ['Re-read the poem *only* for the speaker\'s verbs: "Stand still," "I will read," "we have spent," "we...', 'grow," "love hath not attain\'d," "Except our loves...', 'stay," "We shall new shadowes make." List them — notice how he centers *himself* as the knower.', 'Go to c11_eng_w_cbse_01_004 (Class 11 Woven Words Character Analysis: Protagonist) and re-do the "Speaker vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_005', difficulty: 'standard',
          question: 'Supporting characters in \'A Lecture Upon the Shadow\' — the secondary figures.',
          hint: 'Review the definition of dramatic monologue and the protagonist analysis of the speaker.',
          misconception: 'Students often think "supporting characters" in a poem must be human figures who speak or act.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the role the beloved plays in the poem. Does the beloved speak or act?', answer: 'The beloved is a silent listener who never speaks or acts in the poem',
                  options: ['The beloved is a silent listener who never speaks or acts in the poem', 'supporting characters', '"supporting characters" in a poem must be human figures who speak or act'],
                  hint: 'Review the definition of dramatic monologue and the protagonist analysis of the speaker in "A.',
                  misconception: 'Students often think "supporting characters" in a poem must be human figures who speak or act.' }
          ],
            remediations: { 'supporting-characters-in-a-poem': { steps: ['If a student cannot identify supporting characters, guide them through these steps: 1) Re-read the poem marking every.', '2) Classify each: speaker, addressee, personified metaphor, abstract concept.', '3) For each non-speaker, ask: "What does this entity do in the poem?', 'How does the speaker describe its actions?" 4) Use the worked examples below as models.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of \'A Lecture Upon the Shadow\' — the central idea the whole.',
          hint: 'If stuck, revisit **c11_eng_w_cbse_06_006** (Class 11 Woven Words Chapter 6 primary.',
          misconception: 'Students often think the poem is **about the sun and shadows** and treat the love-element as mere decoration.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a **topic** and a **theme** in poetry? Give the topic and a correct thematic statement for "A Lecture Upon the Shadow."', answer: 'A topic is a one-word subject (e.g., "love," "shadows," "time")',
                  options: ['A topic is a one-word subject (e.g., "love," "shadows," "time")', 'Love and time', 'A wrong answer that gives only a topic ('],
                  hint: 'If stuck, revisit **c11_eng_w_cbse_06_006** (Class 11 Woven Words Chapter 6 primary theme) for.',
                  misconception: 'Students often think the poem is **about the sun and shadows** and treat the love-element as mere decoration.' }
          ],
            remediations: { 'the-poem-is-about-the': { steps: ['If a student cannot move from literal shadow-description to metaphorical love-analysis: 1.', '**Re-read node 002 (Plot/Narrative Structure)** to confirm the three temporal stages.', '**Create a three-column table**: Column A = Shadow Behavior (literal), Column B = Love Behavior (metaphorical), Column.', 'Fill it together for morning/noon/afternoon.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
