import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch05_p2: SimDef = {
    id: 'v3_c11_eng_h_ch05_p2',
    title: 'The Ailing Planet: the Green Movement\'s Role · Part 2/3',
    subtitle: 'Tell the Green Movement from the Green Revolution — then read an essay built like a closing argument.',
    classLevel: 11, subject: 'eng_h', topic: 'The Ailing Planet: the Green Movement\'s Role · Part 2/3',
    chapters: ['c11_eng_h_ch05'],
    nodeIds: ['c11_eng_h_cbse_05_007', 'c11_eng_h_cbse_05_008', 'c11_eng_h_cbse_05_009', 'c11_eng_h_cbse_05_010', 'c11_eng_h_cbse_05_011', 'c11_eng_h_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a jury member hearing the planet\'s case', intro: 'The patient says \'I feel fine\'; the blood tests show organ failure. Palkhivala is the doctor-lawyer presenting the chart.', goal: 'Situate the Green Movement historically and analyse the essay\'s argumentative structure.' },
    discovery: {
        question: 'A student writes: \'The Green Movement increased wheat yields in Punjab.\' What went wrong?',
        options: ['They merged two different things — the Green Movement is the post-1972 environmental conscience; the Green Revolution was the 1960s farm technology', 'Nothing — the movement directly raised yields', 'The yields rose but only in Kerala, not Punjab', 'The Green Movement was a farming subsidy scheme'],
        answer: 'They merged two different things — the Green Movement is the post-1972 environmental conscience; the Green Revolution was the 1960s farm technology',
        hook: 'Two \'greens,\' opposite directions — one fed the world quickly, the other asked what that feeding cost the planet.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in a literary text are the underlying ideas, motifs, or messages that support, complicate, or run parallel to the primary theme, often revealing deeper layers of meaning about human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read Palkhivala\'s essay as a legal brief — thesis, evidence, authorities, verdict — and spot where he borrows Thatcher\'s \'life tenancy\' and Brown\'s \'borrowed from our children.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are a detective who has solved the main case (the primary theme) but discovers three hidden compartments in the evidence box — each containing.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of literary analysis and list one secondary theme from "The Adventure" other than the.', options: [
                { text: 'A secondary theme is a significant but subordinate idea that runs through a text,', outcome: 'A secondary theme is a significant but subordinate idea that runs through a text, supporting.' },
                { text: 'secondary themes', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor plot details," treating.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor plot details," treating.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re watching a film where the director uses extreme close-ups — a droplet of sweat, the vibration of a violin string, the blur of a passing train.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "The Adventure" without looking at the text.', options: [
                { text: 'Imagery: Language appealing to senses (e.g., "The train roared through Kalyan"', outcome: 'Imagery: Language appealing to senses (e.g., "The train roared through Kalyan".' },
                { text: 'like a magnet', outcome: 'Not quite — Students conflate *simile* and *metaphor* because both compare, and they treat *imagery* as only.', reveals: 'students-conflate-simile-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re watching a mystery thriller where the detective confidently declares "The butler couldn\'t possibly be the murderer" — but you, the viewer, saw.',
            decisions: [{ prompt: 'Define verbal irony, situational irony, and dramatic irony in one sentence each, using precise literary terminology.', options: [
                { text: 'Verbal irony occurs when a speaker\'s intended meaning is opposite to the literal meaning', outcome: 'Verbal irony occurs when a speaker\'s intended meaning is opposite to the literal meaning of their.' },
                { text: 'bad luck', outcome: 'Not quite — Students consistently confuse symbolism with "metaphor used more than once." They identify.', reveals: 'students-consistently-confuse-symbolism-with' },
                { text: 'coincidence', outcome: 'Not quite — Students consistently confuse symbolism with "metaphor used more than once." They identify.', reveals: 'students-consistently-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading "The Ailing Planet" and encounter the phrase "the green movement\'s role" – you know the individual words but the phrase carries.',
            decisions: [{ prompt: 'What is the primary strategy for inferring the meaning of an unfamiliar word like "astute" from its context in a sentence such as "The.', options: [
                { text: 'The primary strategy is to identify context clues: here, the phrase "enough to recognise', outcome: 'The primary strategy is to identify context clues: here, the phrase "enough to recognise the.' },
                { text: 'astute', outcome: 'Not quite — Students often believe that vocabulary in context means guessing a word\'s definition from its.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'powerful', outcome: 'Not quite — Students often believe that vocabulary in context means guessing a word\'s definition from its.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are Professor Gaitonde standing in the Azad Maidan: you see an empty presidential chair (literal observation), but you *infer* it symbolizes.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What was the name of the train Professor Gaitonde took from Pune.', options: [
                { text: '**Answer:** Literal', outcome: '**Answer:** Literal. The text explicitly states: "The Jijamata Express sped along the Pune-Bombay.' },
                { text: 'The Jijamata Express sped along the Pune-Bombay route', outcome: 'Not quite — Students treat "inferential" as "guessing" and write personal opinions (e.g., "I think Gaitonde was.', reveals: 'students-treat-inferential-as-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing an editorial for the school paper on \'the ailing planet\', a student drafts: \'The Green Movement that began in the 1960s fed millions by introducing high-yield wheat and fertilisers in Punjab — proof that the planet is healing.\'',
            decisions: [{ prompt: 'What confusion needs fixing before this goes to print?', options: [
                { text: 'Green Revolution ≠ Green Movement: the Revolution was a 1960s agricultural technology drive (HYV seeds, fertilisers) for food yield; the Movement began with the 1972 Stockholm Conference and champions sustainable development — and Palkhivala\'s article actually critiques the Revolution\'s ecological costs (chemical runoff, falling water tables). The draft praises the very thing the article warns about.', outcome: 'The two \'greens\' are nearly opposite in spirit: one maximises yield, the other asks whether present growth steals from future generations.' },
                { text: 'No fix needed — both are environmental efforts, so the example supports the editorial.', outcome: 'They\'re separable by date, method and goal; conflating them inverts the article\'s argument that yield-obsessed growth is part of the ailment.', reveals: 'green-movement-equals-revolution' },
                { text: 'The Movement is just about planting trees and saving tigers — keep the focus on wildlife.', outcome: 'Stockholm reframed ecology as planetary stewardship and intergenerational equity — a survival logic for economies, not a wildlife charity.', reveals: 'green-means-tigers-and-trees' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'A constitutional lawyer argued the planet\'s case like a court brief — and the verdict he wants is a duty, not a donation.',
            decisions: [{ prompt: 'What comes next? The Ailing Planet: the Green Movement\'s Role · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Ailing Planet: the Green Movement\'s Role · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes in a literary text are the underlying ideas, motifs,.',
          hint: 'Review c11_eng_h_cbse_05_006 (Primary Theme) and c11_eng_h_cbse_05_002 (Plot and.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor plot details," treating thematic analysis as plot.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the alternate history of India (where the East India Company is confined to Bombay, Calcutta, and Madras) functions as.', answer: 'The alternate history serves as a secondary theme of "sovereign self-respect and',
                  options: ['The alternate history serves as a secondary theme of "sovereign self-respect and', 'secondary themes', 'subplots', 'minor plot details'],
                  hint: 'Review c11_eng_h_cbse_05_006 (Primary Theme) and c11_eng_h_cbse_05_002 (Plot and Narrative.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor plot details," treating thematic analysis as plot enumeration.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student conflates plot with theme: 1.', 'Ask them to complete the sentence: "This event shows that ________" (e.g., "The bullet missing Vishwasrao shows that.', 'Have them write the abstract noun phrase (the theme) on a sticky note and the plot event on another; physically.', 'Practice with a familiar story (e.g., *The Thirsty Crow*: plot = crow drops stones; theme = *persistence solves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor plot details," treating thematic analysis as plot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of \'reality as subjective perception\' undermines the scientific rationality of the primary theme." Defend your.', answer: 'The claim is invalid',
                  options: ['The claim is invalid', 'catastrophic', 'fantastic', 'secondary themes'],
                  hint: 'Review c11_eng_h_cbse_05_006 (Primary Theme) and c11_eng_h_cbse_05_002 (Plot and Narrative.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor plot details," treating thematic analysis as plot enumeration.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student conflates plot with theme: 1.', 'Ask them to complete the sentence: "This event shows that ________" (e.g., "The bullet missing Vishwasrao shows that.', 'Have them write the abstract noun phrase (the theme) on a sticky note and the plot event on another; physically.', 'Practice with a familiar story (e.g., *The Thirsty Crow*: plot = crow drops stones; theme = *persistence solves.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review c7_engl_ch01_008 (sensory imagery classification) and c6_english_u1_005 (metaphor.',
          misconception: 'Students conflate *simile* and *metaphor* because both compare, and they treat *imagery* as only "visual description.".',
          parts: [
                { id: 'a', prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "The Adventure" without looking at the text.', answer: 'Imagery: Language appealing to senses (e.g., "The train roared through Kalyan"',
                  options: ['Imagery: Language appealing to senses (e.g., "The train roared through Kalyan"', 'like a magnet'],
                  hint: 'Review c7_engl_ch01_008 (sensory imagery classification) and c6_english_u1_005 (metaphor basics).',
                  misconception: 'Students conflate *simile* and *metaphor* because both compare, and they treat *imagery* as only "visual description." In "The Adventure,".' },
                { id: 'b', prompt: 'In the sentence "Like a piece of iron attracted to a magnet, he swiftly moved towards the chair," identify the literary device and explain why Narlikar chooses.', answer: 'This is a *simile* (explicit comparison using "like"), not a metaphor',
                  options: ['This is a *simile* (explicit comparison using "like"), not a metaphor', 'involuntary force'],
                  hint: 'Review c7_engl_ch01_008 (sensory imagery classification) and c6_english_u1_005 (metaphor basics).',
                  misconception: 'Students conflate *simile* and *metaphor* because both compare, and they treat *imagery* as only "visual description." In "The Adventure,".' },
                { id: 'c', prompt: 'Find a tactile image in the Azad Maidan scene (pp. 47-48) and explain how it transforms an abstract intellectual conflict into bodily experience.', answer: '"He soon became a target for a shower of tomatoes, eggs and other objects"',
                  options: ['"He soon became a target for a shower of tomatoes, eggs and other objects"', 'audience swarmed'],
                  hint: 'Review c7_engl_ch01_008 (sensory imagery classification) and c6_english_u1_005 (metaphor basics).',
                  misconception: 'Students conflate *simile* and *metaphor* because both compare, and they treat *imagery* as only "visual description." In "The Adventure,".' }
          ],
            remediations: { 'students-conflate-simile-and-metaphor': { steps: ['Have the student re-read only the Rajendra-Gaitonde dialogue (pp.', '49-52) and list every physics term used (electron, orbit, state, transition, radiation, macroscopic, microscopic.', 'For each term, ask: "What historical concept does this word *replace*?" — building a two-column mapping table.', 'Then ask: "If Narlikar had used \'like\' or \'as\' for each, how would the argument weaken?" — forcing recognition that the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, return to c10_engl_cbse_01_007 (irony types) and c8_engl_ch4_008 (symbol.',
          misconception: 'Students consistently confuse symbolism with "metaphor used more than once." They identify a comparison (e.g., "the.',
          parts: [
                { id: 'a', prompt: 'In "The Adventure," Professor Gaitonde says, "The East India Company had been wound up shortly after the events of 1857 — at least, that is what history books.', answer: 'This is situational irony: the historical reality Gaitonde experiences directly',
                  options: ['This is situational irony: the historical reality Gaitonde experiences directly', 'dramatic irony', 'metaphor used more than once', 'the train is like a time machine'],
                  hint: 'If stuck, return to c10_engl_cbse_01_007 (irony types) and c8_engl_ch4_008 (symbol tracking across.',
                  misconception: 'Students consistently confuse symbolism with "metaphor used more than once." They identify a comparison (e.g., "the train is like a time.' },
                { id: 'b', prompt: 'Analyze how the torn page from Bhausahebanchi Bakhar functions as a symbol at THREE different levels: literal, historical, and metaphysical.', answer: 'Literally, the torn page is physical evidence Gaitonde carries between worlds',
                  options: ['Literally, the torn page is physical evidence Gaitonde carries between worlds', 'it\'s proof he was there', 'metaphor used more than once', 'the train is like a time machine'],
                  hint: 'If stuck, return to c10_engl_cbse_01_007 (irony types) and c8_engl_ch4_008 (symbol tracking across.',
                  misconception: 'Students consistently confuse symbolism with "metaphor used more than once." They identify a comparison (e.g., "the train is like a time.' }
          ],
            remediations: { 'students-consistently-confuse-symbolism-with': { steps: ['Give the student three concrete objects from the chapter (the Bakhar, the chair, the train).', 'For each, have them list: (a) literal function in plot, (b) abstract idea it carries in first appearance, (c) how that.', 'Require them to write one paragraph per object using the template: "In [scene X], the [object] operates as [literal.', 'Only then reintroduce the term "symbolism" as the name for this tracked semantic accretion.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'Review "Context Clues Types" from Class 9-10: definition, synonym, antonym, example.',
          misconception: 'Students often believe that vocabulary in context means guessing a word\'s definition from its dictionary entry or root.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar words or',
                  options: ['Vocabulary in Context is the skill of determining the meaning of unfamiliar words or', '"Before You Read: Context and Background" is a pre-reading pedagogical section that', 'Plot and narrative structure refers to the organized sequence of events in a story and', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'Review "Context Clues Types" from Class 9-10: definition, synonym, antonym, example, general sense.',
                  misconception: 'Students often believe that vocabulary in context means guessing a word\'s definition from its dictionary entry or root word (e.g., assuming.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Have the student reread the specific sentence containing the target word and underline all context clues (punctuation.', 'Ask: "What does the author want us to understand here?', 'What words signal contrast, cause, or example?" 3.', 'Model think-aloud: "I see \'but\' before \'doctored accounts\', so \'doctored\' must contrast with \'graphic\' and \'germ.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_011', difficulty: 'standard',
          question: 'This topic covers the grammatical structures and lexical items used in the text.',
          hint: 'Review Class 10 grammar: \'Conditionals: Type 0, 1, 2, 3\' (especially the tense shift.',
          misconception: 'Students consistently write \'If I *would have known*, I *would have told* you\' (double \'would have\') for Third.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic covers the grammatical structures and lexical items used in the text to',
                  options: ['This topic covers the grammatical structures and lexical items used in the text to', '"Before You Read: Context and Background" is a pre-reading pedagogical section that', 'Plot and narrative structure refers to the organized sequence of events in a story and', 'Setting refers to the time, place, and social-historical context in'],
                  hint: 'Review Class 10 grammar: \'Conditionals: Type 0, 1, 2, 3\' (especially the tense shift rules) and.',
                  misconception: 'Students consistently write \'If I *would have known*, I *would have told* you\' (double \'would have\') for Third Conditionals because they.' }
          ],
            remediations: { 'students-consistently-write-if-i': { steps: ['**Isolate the time frame**: Draw a timeline.', 'Place the condition and result.', 'If both are past → Third Conditional (had + V3 / would have + V3).', 'If present/future → Second Conditional (V2 / would + V1).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension involves retrieving information explicitly stated in the.',
          hint: 'If stuck, re-read the "Understanding the Text" section in NCERT (pp.',
          misconception: 'Students treat "inferential" as "guessing" and write personal opinions (e.g., "I think Gaitonde was scared") instead.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What was the name of the train Professor Gaitonde took from Pune to Bombay?"', answer: '**Answer:** Literal',
                  options: ['**Answer:** Literal', 'The Jijamata Express sped along the Pune-Bombay route'],
                  hint: 'If stuck, re-read the "Understanding the Text" section in NCERT (pp.',
                  misconception: 'Students treat "inferential" as "guessing" and write personal opinions (e.g., "I think Gaitonde was scared") instead of *text-based.' }
          ],
            remediations: { 'students-treat-inferential-as-guessing': { steps: ['**Re-teach the Ladder of Inference:** Show a 3-rung ladder: Rung 1 (Literal): "Text says X." Rung 2 (Implicit Clue).', '**Color-Code the Text:** Give the student a printout.', 'Highlight literal facts (YELLOW), implicit clues (BLUE), and inference questions (GREEN).', 'Force them to draw arrows from BLUE to GREEN.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
