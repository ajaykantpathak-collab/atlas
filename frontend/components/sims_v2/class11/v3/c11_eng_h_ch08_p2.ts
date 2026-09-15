import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch08_p2: SimDef = {
    id: 'v3_c11_eng_h_ch08_p2',
    title: 'Silk Road · Part 2/3',
    subtitle: 'Follow a geographer\'s pilgrimage where description is not the absence of plot.',
    classLevel: 11, subject: 'eng_h', topic: 'Silk Road · Part 2/3',
    chapters: ['c11_eng_h_ch08'],
    nodeIds: ['c11_eng_h_cbse_08_007', 'c11_eng_h_cbse_08_008', 'c11_eng_h_cbse_08_009', 'c11_eng_h_cbse_08_010', 'c11_eng_h_cbse_08_011', 'c11_eng_h_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a traveller-log analyst riding to Kailash', intro: 'Altitude headaches, a grim town called Hor, a stranger named Norbu — the plot is the road, but the meaning is in the pauses.', goal: 'Trace the travelogue\'s linear-yet-layered structure and read its title as metaphor.' },
    discovery: {
        question: 'Middleton drives a modern highway toward Mount Kailash — so why is the account called \'Silk Road\'?',
        options: ['The route retraces ancient paths, and the \'silk\' now traded is stories, beliefs and human connection', 'He was smuggling silk along NH 219', 'The title is ironic — the region never saw the real Silk Road', 'Pilgrims still carry bolts of silk to Kailash'],
        answer: 'The route retraces ancient paths, and the \'silk\' now traded is stories, beliefs and human connection',
        hook: 'The old road moved fabric; Middleton\'s road moves meaning — same track, different cargo.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, motifs, and recurring concerns in a text that support and enrich the primary theme but are not the central message.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Order the journey — Ravu to Hor to Darchen to the pass — and separate the action from the reflective pauses inside the linear timeline.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re trekking through the Himalayas and notice not just the destination but the changing landscape, the prayer flags fluttering at every pass, the.',
            decisions: [{ prompt: 'What is the difference between a primary theme and a secondary theme in a literary text? Provide a one-sentence distinction.', options: [
                { text: 'A primary theme is the central, unifying idea that the entire text revolves around, while', outcome: 'A primary theme is the central, unifying idea that the entire text revolves around, while.' },
                { text: 'secondary themes are less important', outcome: 'Not quite — Students often treat secondary themes as "sub-topics" or "minor ideas" and list them without.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'hospitality is a secondary theme', outcome: 'Not quite — Students often treat secondary themes as "sub-topics" or "minor ideas" and list them without.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are scrolling through a travel blog about Ladakh: the writer describes "air so thin it feels like breathing through a straw" and "mountains.',
            decisions: [{ prompt: 'Define "organic imagery" and give one example from *Silk Road* where the narrator describes an internal bodily sensation (e.g., nausea.', options: [
                { text: 'Organic imagery refers to language that conveys internal physiological states', outcome: 'Organic imagery refers to language that conveys internal physiological states — hunger, thirst.' },
                { text: 'the wind howling', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "flowery language" rather than *structural*.', reveals: 'students-often-treat-imagery-and' },
                { text: 'snow-capped peaks', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "flowery language" rather than *structural*.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re planning a trek to a holy mountain expecting a smooth, paved path but find yourself on a rough, icy track at 5,000 meters—this gap between.',
            decisions: [{ prompt: 'Define situational irony and give one example from "Silk Road" where the narrator\'s expectations about the journey clash with reality.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is sharply different from', outcome: 'Situational irony occurs when the actual outcome of a situation is sharply different from what was.' },
                { text: 'any prominent object (e', outcome: 'Not quite — Students often confuse symbolism with mere description: they think any prominent object (e.g., the.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading "Silk Road" and encounter the sentence: "The *drokba* led his flock across the *changtang*, his *prostrate* form a silhouette against.',
            decisions: [{ prompt: 'In the sentence "The *kora* around Mount Kailash is a *circumambulation* performed by pilgrims," which context-clue type directly defines.', options: [
                { text: 'The apposition clue: "*circumambulation* performed by pilgrims" renames *kora* with a', outcome: 'The apposition clue: "*circumambulation* performed by pilgrims" renames *kora* with a definition.' },
                { text: 'example clue', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from the sentence" and stop at.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'contrast clue', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from the sentence" and stop at.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading Middleton\'s description of the "dry, cold desert" and notice he writes: "The snow-capped mountains *glistening* in the sun, we *drove*.',
            decisions: [{ prompt: 'Identify the tense and voice of the verb phrase "had been travelling" in a narrative context. What time relationship does it establish?', options: [
                { text: 'Correct: Past perfect continuous, active voice', outcome: 'Correct: Past perfect continuous, active voice. It establishes an action that started before.' },
                { text: 'past continuous', outcome: 'Not quite — Students treat "grammar in text" as a labeling exercise (underline the tense) rather than.', reveals: 'students-treat-grammar-in-text' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the question asks: *"Why does the narrator describe the tea at Hor as \'the worst tea I have ever tasted\'?"*.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question in the context of Class.', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., \'At what', outcome: 'A literal question asks for information explicitly stated in the text (e.g., \'At what altitude.' },
                { text: 'inferential questions are answered by \'guessing\' or \'personal opinion\' (e', outcome: 'Not quite — Students believe inferential questions are answered by \'guessing\' or \'personal opinion\' (e.g., \'I.', reveals: 'inferential-questions-are-answered-by' },
                { text: 'the narrator felt happy because', outcome: 'Not quite — Students believe inferential questions are answered by \'guessing\' or \'personal opinion\' (e.g., \'I.', reveals: 'inferential-questions-are-answered-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a geography-literature crossover project you must classify Nick Middleton\'s \'Silk Road\'. A teammate files it under \'history of the ancient trade route\' and another under \'pilgrimage narrative by a devout traveller to Mount Kailash\'.',
            decisions: [{ prompt: 'What kind of text is it, and what does the title actually mean?', options: [
                { text: 'A modern travelogue: a British geographer (observer, not pilgrim) drives a modern highway that follows the ancient Silk Road toward Kailash — sacred to Hindus, Buddhists, Jains and Bon alike. The title is metaphorical: the \'silk\' moving along the road now is stories, beliefs and human exchange, not fabric.', outcome: 'Genre shapes reading: travel writing blends personal journey, factual observation and reflection — the trade-route history is backdrop, not subject.' },
                { text: 'It\'s a history essay about silk trade — the road trip is just an excuse.', outcome: 'The route\'s history is context; the text\'s engine is the present-day journey and the people met — a travelogue, not a trade monograph.', reveals: 'title-is-literal-trade-route' },
                { text: 'It\'s a pilgrimage account — anyone travelling toward Kailash is a pilgrim.', outcome: 'Middleton is an observing geographer; his lens is landscape and culture, not devotion — mistaking narrator for pilgrim misreads the whole register.', reveals: 'traveller-equals-pilgrim' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'A travelogue can be a straight line on the map and still move in circles inside the traveller\'s head.',
            decisions: [{ prompt: 'What comes next? Silk Road · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Silk Road · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, motifs, and recurring concerns in.',
          hint: 'Review the definition of "theme" vs "topic" and practice writing theme statements using.',
          misconception: 'Students often treat secondary themes as "sub-topics" or "minor ideas" and list them without showing how they.',
          parts: [
                { id: 'a', prompt: 'Analyze how the secondary theme of "faith as daily practice" (prayer flags, prostrations, butter lamps) interacts with the primary theme of "the author\'s.', answer: 'In the scene at Darchen where the author observes pilgrims performing full-body',
                  options: ['In the scene at Darchen where the author observes pilgrims performing full-body', 'hospitality is a secondary theme'],
                  hint: 'Review the definition of "theme" vs "topic" and practice writing theme statements using the.',
                  misconception: 'Students often treat secondary themes as "sub-topics" or "minor ideas" and list them without showing how they *function* in the text.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student reread the chapter with three colored highlighters: one for landscape/environment, one for.', 'For each color, write one sentence explaining what *idea* (not event) the highlighted passages collectively suggest.', 'Take one idea and trace it across three non-consecutive pages — note how the author\'s treatment of it changes (e.g.', 'Write a 3-sentence explanation of how that idea deepens the primary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as "sub-topics" or "minor ideas" and list them without showing how they.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The secondary theme of \'Western scientific rationality vs.', answer: 'Refute',
                  options: ['Refute', 'hospitality is a secondary theme'],
                  hint: 'Review the definition of "theme" vs "topic" and practice writing theme statements using the.',
                  misconception: 'Students often treat secondary themes as "sub-topics" or "minor ideas" and list them without showing how they *function* in the text.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student reread the chapter with three colored highlighters: one for landscape/environment, one for.', 'For each color, write one sentence explaining what *idea* (not event) the highlighted passages collectively suggest.', 'Take one idea and trace it across three non-consecutive pages — note how the author\'s treatment of it changes (e.g.', 'Write a 3-sentence explanation of how that idea deepens the primary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the "tenor/vehicle" distinction using I.A. Richards\' terminology (standard.',
          misconception: 'Students often treat imagery and metaphor as decorative "flowery language" rather than *structural* devices that.',
          parts: [
                { id: 'a', prompt: 'Define "organic imagery" and give one example from *Silk Road* where the narrator describes an internal bodily sensation (e.g., nausea, breathlessness.', answer: 'Organic imagery refers to language that conveys internal physiological states',
                  options: ['Organic imagery refers to language that conveys internal physiological states', 'the wind howling', 'snow-capped peaks'],
                  hint: 'Review the "tenor/vehicle" distinction using I.A. Richards\' terminology (standard in Class 11 CBSE.',
                  misconception: 'Students often treat imagery and metaphor as decorative "flowery language" rather than *structural* devices that organize the travelogue\'s.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['Return to the text and physically act out the narrator\'s journey: stand up, simulate labored breathing at 5,000m, feel.', 'Create a two-column table: Column A = every metaphor in the chapter (source → target); Column B = the *single dominant.', 'For each row, answer: "At this point in the journey, why does the narrator *need* this quality?" This forces functional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'Review the narrator\'s diary-like entries in the text (especially Day 1–3) to re-establish.',
          misconception: 'Students often confuse symbolism with mere description: they think any prominent object (e.g., the mountain) is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality,',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and Narrative Structure in "Silk Road" refers to the sequence of events (plot) and', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review the narrator\'s diary-like entries in the text (especially Day 1–3) to re-establish his.',
                  misconception: 'Students often confuse symbolism with mere description: they think any prominent object (e.g., the mountain) is a symbol just because it\'s.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If a student misidentifies symbols or irony: (1) Have them list the narrator\'s stated expectations before each journey.', '(2) Mark where reality diverges—label each gap as situational, verbal, or dramatic.', '(3) For symbols, ask: "What does this object *stand for* in the culture or the narrator\'s mind?" Require a two-column.', 'Practice with a fresh passage from the chapter.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'Review "context clue classification" from Class 9 (c9_engl_ch1_8) using the 5-type.',
          misconception: 'Students believe "vocabulary in context" means "guess the meaning from the sentence" and stop at a single synonym.',
          parts: [
                { id: 'a', prompt: 'The author writes: "Unlike the *bustling* Lhasa, the *changtang* lay *desolate* under a *merciless* sun." Explain how the contrast clue here helps you infer.', answer: 'The contrast marker "Unlike" sets up antonymic relationship: *bustling* (full of',
                  options: ['The contrast marker "Unlike" sets up antonymic relationship: *bustling* (full of', 'desolate means empty', 'vocabulary in context', 'guess the meaning from the sentence'],
                  hint: 'Review "context clue classification" from Class 9 (c9_engl_ch1_8) using the 5-type framework.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the sentence" and stop at a single synonym.' },
                { id: 'b', prompt: 'Analyze how the cluster of altitude-related terms (*altitude sickness, headache, nausea, oxygen, diameter, pulmonary edema*) in the medical emergency passage.', answer: 'The semantic field transforms a personal health crisis into a universal human',
                  options: ['The semantic field transforms a personal health crisis into a universal human', 'vocabulary in context', 'guess the meaning from the sentence'],
                  hint: 'Review "context clue classification" from Class 9 (c9_engl_ch1_8) using the 5-type framework.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the sentence" and stop at a single synonym.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['Give the student a 3-sentence excerpt from Silk Road with one target word bolded.', 'Ask: "What part of speech is this?', 'Prove it using only this sentence\'s grammar." 3.', 'Ask: "Find two words within 5 words left/right that relate to the target.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'If stuck, review "Non-finite clauses as sentence compressors" (Class 10 grammar workbook.',
          misconception: 'Students treat "grammar in text" as a labeling exercise (underline the tense) rather than a *functional* analysis.',
          parts: [
                { id: 'a', prompt: 'Identify the tense and voice of the verb phrase "had been travelling" in a narrative context. What time relationship does it establish?', answer: 'Correct: Past perfect continuous, active voice',
                  options: ['Correct: Past perfect continuous, active voice', 'past continuous'],
                  hint: 'If stuck, review "Non-finite clauses as sentence compressors" (Class 10 grammar workbook, Unit 4).',
                  misconception: 'Students treat "grammar in text" as a labeling exercise (underline the tense) rather than a *functional* analysis.' }
          ],
            remediations: { 'students-treat-grammar-in-text': { steps: ['Give the student two minimal pairs: "We drove 5 hours" vs "We had been driving 5 hours when..." — ask: which emphasizes.', 'Show a text strip: convert all participles to relative clauses — read aloud, hear the clunky rhythm.', 'Assign: find 3 passive verbs in the monastery paragraph; for each, ask "Who does the action?', 'Have them rewrite a 5-sentence travel journal entry using at least 3 different non-finite structures.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_08_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'Review the \'Plot and Narrative Structure\' (c11_eng_h_cbse_08_002) and \'Setting and.',
          misconception: 'Students believe inferential questions are answered by \'guessing\' or \'personal opinion\' (e.g., \'I think the narrator.',
          parts: [
                { id: 'a', prompt: 'Read this excerpt from *Silk Road* (paraphrased): *\'The road was rough and bumpy...', answer: '**Point:** The phrase suggests acute altitude sickness (acute mountain sickness)',
                  options: ['**Point:** The phrase suggests acute altitude sickness (acute mountain sickness)', 'inferential questions are answered by \'guessing\' or \'personal opinion\' (e', 'the narrator felt happy because'],
                  hint: 'Review the \'Plot and Narrative Structure\' (c11_eng_h_cbse_08_002) and \'Setting and Atmosphere\'.',
                  misconception: 'Students believe inferential questions are answered by \'guessing\' or \'personal opinion\' (e.g., \'I think the narrator felt happy.' }
          ],
            remediations: { 'inferential-questions-are-answered-by': { steps: ['Give a 5-sentence paragraph from *Silk Road* (e.g., the Hor tea scene).', 'Ask them to highlight *only* the sentences that are literal facts.', 'For each highlighted fact, ask: \'What does this fact *imply* about the narrator/setting/theme that isn\'t written?\'', 'Co-construct a 3-column table: **Textual Fact** | **Inference** | **Justification (Why?)**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
