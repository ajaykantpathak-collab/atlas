import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch02_p2: SimDef = {
    id: 'v3_c11_eng_w_ch02_p2',
    title: 'A Pair of Mustachios (Short Story) · Part 2/3',
    subtitle: 'Watch facial hair become a caste certificate men will bankrupt themselves over.',
    classLevel: 11, subject: 'eng_w', topic: 'A Pair of Mustachios (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch02'],
    nodeIds: ['c11_eng_w_cbse_02_007', 'c11_eng_w_cbse_02_008', 'c11_eng_w_cbse_02_009', 'c11_eng_w_cbse_02_010', 'c11_eng_w_cbse_02_011', 'c11_eng_w_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a satirist decoding a village\'s moustache politics', intro: 'A moneylender dares to curl his moustache like a tiger\'s — and an impoverished Khan calls it theft of birthright.', goal: 'Analyse the doubled confrontation structure and the story\'s ironic non-resolution.' },
    discovery: {
        question: 'Two confrontations over one moustache tip: the first costs a nose-ring, the second costs everything Khan Azam Khan owns. Which is the climax?',
        options: ['The second — Khan stakes all his worldly possessions and loses permanently; loudness isn\'t the measure', 'The first — it has the fiercer dialogue and open threats', 'Neither — the climax is the moustache hierarchy being explained', 'The second — but only because the elders witness the deed'],
        answer: 'The second — Khan stakes all his worldly possessions and loses permanently; loudness isn\'t the measure',
        hook: 'Ramanand yields in round one and loses nothing real; the climax is where the stakes become irreversible.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'A Pair of Mustachios\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Map both confrontations onto the arc, then weigh the last line — \'My father was a Sultan\' — as resolution or the cycle restarting.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'A Pair of Mustachios\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that supports, contrasts with, or adds complexity', outcome: 'A secondary theme is a subordinate idea that supports, contrasts with, or adds complexity to the.' },
                { text: 'irony is a secondary theme', outcome: 'Not quite — Students treat secondary themes as "less important themes" or "subplots" — listing events (Khan.', reveals: 'students-treat-secondary-themes-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'A Pair of Mustachios\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "A Pair of Mustachios" without looking at the text.', options: [
                { text: 'Imagery: Language appealing to the senses (e.g., "faded remnants of a gold-brocaded', outcome: 'Imagery: Language appealing to the senses (e.g., "faded remnants of a gold-brocaded waistcoat".' },
                { text: 'imagery is just description', outcome: 'Not quite — Students often treat the moustache metaphors as *mere symbols* (e.g., "tiger moustache = bravery").', reveals: 'students-often-treat-the-moustache' },
                { text: 'metaphor uses \'like\'', outcome: 'Not quite — Students often treat the moustache metaphors as *mere symbols* (e.g., "tiger moustache = bravery").', reveals: 'students-often-treat-the-moustache' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'A Pair of Mustachios\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "A Pair of Mustachios" where the outcome is the opposite of what a character intends.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to', outcome: 'Situational irony occurs when the actual outcome of a situation is sharply contrary to what was.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often confuse verbal irony with lying or sarcasm alone, and they treat symbols as "hidden.', reveals: 'students-often-confuse-verbal-irony' },
                { text: 'hidden meanings', outcome: 'Not quite — Students often confuse verbal irony with lying or sarcasm alone, and they treat symbols as "hidden.', reveals: 'students-often-confuse-verbal-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'A Pair of Mustachios\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Define "loanword" and identify three French loanwords used in "A Pair of Mustachios" with their meanings in the story\'s context.', options: [
                { text: 'A loanword is a word adopted from one language into another without translation', outcome: 'A loanword is a word adopted from one language into another without translation.' },
                { text: 'moustache', outcome: 'Not quite — Students believe "language usage" means only identifying parts of speech (nouns, verbs) or tense.', reveals: 'language-usage-means-only-identifying' },
                { text: 'language usage', outcome: 'Not quite — Students believe "language usage" means only identifying parts of speech (nouns, verbs) or tense.', reveals: 'language-usage-means-only-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'A Pair of Mustachios\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define literal comprehension and give one example of a literal question from "A Pair of Mustachios".', options: [
                { text: '**Correct Answer:** Literal comprehension involves retrieving information directly stated', outcome: '**Correct Answer:** Literal comprehension involves retrieving information directly stated in the.' },
                { text: 'Why did Ramanand lower his moustache?', outcome: 'Not quite — Students believe "inferential" means "guessing the author\'s hidden thoughts" and therefore write.', reveals: 'inferential-means-guessing-the-author' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing the author\'s hidden thoughts" and therefore write.', reveals: 'inferential-means-guessing-the-author' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a street-play contest your troupe adapts Mulk Raj Anand\'s \'A Pair of Mustachios\' — a village moneylender with a \'tiger\' moustache versus a ruined landlord clinging to his \'goat\' style. A member wants to modernise it into a plain comedy about facial-hair fashion: \'Moustache shapes are just style choices, keep the jokes.\'',
            decisions: [{ prompt: 'What does the moustache actually carry in the story?', options: [
                { text: 'Rank itself — in Anand\'s colonial-India satire each moustache style is a class/caste badge; the landlord\'s refusal to lower his is clinging to vanished status while the moneylender\'s upward \'tiger\' twist is new money aping old nobility. Strip the hierarchy and the satire — laughing at social pretension — becomes mere grooming comedy.', outcome: 'The whiskers are a symbolic code for hierarchy; reading them as fashion erases the critique of class pride the story is built on.' },
                { text: 'The modernisation works — audiences today won\'t get caste references, so fashion jokes are safer.', outcome: 'Removing the code removes the story: the whole point is a status war fought through an absurd proxy — prestige marks mistaken for the prestige itself.', reveals: 'moustache-is-just-fashion' },
                { text: 'Turn it into a tragedy — the landlord loses everything, so play it straight and sad.', outcome: 'Anand\'s weapon is satire, not pathos; the comedy is precisely how the critique lands — solemnising it loses the sting.', reveals: 'satire-played-as-tragedy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'The moustache tips stay down, the heirlooms change hands, and the loser walks off inventing royal blood — the performance never ends.',
            decisions: [{ prompt: 'What comes next? A Pair of Mustachios (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Pair of Mustachios (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes in \'A Pair of Mustachios\' — the supporting ideas and motifs.',
          hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_02_006) and re-read the story.',
          misconception: 'Students treat secondary themes as "less important themes" or "subplots" — listing events (Khan pawns nose-ring, deed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'A Pair of Mustachios\'',
                  options: ['Secondary themes in \'A Pair of Mustachios\'', '\'A Pair of Mustachios\' (Woven Words, ch', 'The plot/narrative arc of \'A Pair of Mustachios\'', 'The setting of \'A Pair of Mustachios\''],
                  hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_02_006) and re-read the story focusing.',
                  misconception: 'Students treat secondary themes as "less important themes" or "subplots" — listing events (Khan pawns nose-ring, deed is signed) instead.' }
          ],
            remediations: { 'students-treat-secondary-themes-as': { steps: ['Have the student list the story\'s five main events in chronological order.', 'For each event, ask: "What big idea about money, power, identity, or society does this event *show*?" Write the idea.', 'Cluster identical/similar ideas.', 'The largest cluster = primary theme; the others = secondary themes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat secondary themes as "less important themes" or "subplots" — listing events (Khan pawns nose-ring, deed.',
          parts: [
                { id: 'a', prompt: 'Evaluate the role of the village community (landlord, priest, peasants, elders) in the climax. Do they uphold justice or reinforce the absurd social order?', answer: 'They reinforce the absurd order',
                  options: ['They reinforce the absurd order', 'fair deal', 'irony is a secondary theme'],
                  hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_02_006) and re-read the story focusing.',
                  misconception: 'Students treat secondary themes as "less important themes" or "subplots" — listing events (Khan pawns nose-ring, deed is signed) instead.' }
          ],
            remediations: { 'students-treat-secondary-themes-as': { steps: ['Have the student list the story\'s five main events in chronological order.', 'For each event, ask: "What big idea about money, power, identity, or society does this event *show*?" Write the idea.', 'Cluster identical/similar ideas.', 'The largest cluster = primary theme; the others = secondary themes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_008', difficulty: 'standard',
          question: 'Imagery in \'A Pair of Mustachios\' — the vivid, sensory language that creates.',
          hint: 'Review c6_english_u1_005 (metaphor/imagery basics) and c10_engl_cbse_03_007 (metaphor.',
          misconception: 'Students often treat the moustache metaphors as *mere symbols* (e.g., "tiger moustache = bravery") and miss that they.',
          parts: [
                { id: 'a', prompt: 'Explain why the narrator describes the moneylender Ramanand as brushing his moustache "with his oily hand so that it dropped like a dead fly." What sensory.', answer: 'The image combines tactile (oily/greasy), visual (drooping like a dead fly), and',
                  options: ['The image combines tactile (oily/greasy), visual (drooping like a dead fly), and', 'he has oily hair'],
                  hint: 'Review c6_english_u1_005 (metaphor/imagery basics) and c10_engl_cbse_03_007 (metaphor in prose.',
                  misconception: 'Students often treat the moustache metaphors as *mere symbols* (e.g., "tiger moustache = bravery") and miss that they are *metonymic.' }
          ],
            remediations: { 'students-often-treat-the-moustache': { steps: ['Have the student read aloud the opening paragraph listing the moustache types, then ask: "Who is speaking here — Anand.', 'Ask the student to draw the "tiger" and "goat" moustaches as described, then label each line with a sensory word.', 'Have them rewrite one metaphor as a simile ("His moustache was *like* a tiger\'s") and discuss what is lost (the direct.', 'Finally, assign a 3-sentence exit ticket: "The tiger moustache is not just a symbol; it is a ______ because ______."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_009', difficulty: 'standard',
          question: 'Irony and paradox in \'A Pair of Mustachios\' — where opposite things are both.',
          hint: 'Re-read the three key confrontations: (1) Khan\'s first visit over the nose-ring, (2) the.',
          misconception: 'Students often confuse verbal irony with lying or sarcasm alone, and they treat symbols as "hidden meanings" that only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'A Pair of Mustachios\'',
                  options: ['Irony and paradox in \'A Pair of Mustachios\'', '\'A Pair of Mustachios\' (Woven Words, ch', 'The plot/narrative arc of \'A Pair of Mustachios\'', 'The setting of \'A Pair of Mustachios\''],
                  hint: 'Re-read the three key confrontations: (1) Khan\'s first visit over the nose-ring, (2) the necklace.',
                  misconception: 'Students often confuse verbal irony with lying or sarcasm alone, and they treat symbols as "hidden meanings" that only the author intends.' }
          ],
            remediations: { 'students-often-confuse-verbal-irony': { steps: ['If a student cannot distinguish the types of irony, give them a three-column table: Situation | Expectation | Reality.', 'Fill it for three scenes (e.g., Khan pawns nose-ring → expects respect → gets temporary compliance).', 'For symbolism, ask them to draw the three moustache styles and label each with: Class | Literal Description | Symbolic.', 'Then have them write one sentence connecting each symbol to the theme "the hollowness of status symbols."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_010', difficulty: 'standard',
          question: 'Key vocabulary of \'A Pair of Mustachios\' — the words and phrases you must know.',
          hint: 'Review c11_eng_w_cbse_02_002 (Plot) and c11_eng_w_cbse_02_004 (Character) to re-anchor.',
          misconception: 'Students treat \'vocabulary in context\' as \'find the dictionary meaning of difficult words.\' They look up \'bourgeoise\' →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key vocabulary of \'A Pair of Mustachios\'',
                  options: ['Key vocabulary of \'A Pair of Mustachios\'', '\'A Pair of Mustachios\' (Woven Words, ch', 'The plot/narrative arc of \'A Pair of Mustachios\'', 'The setting of \'A Pair of Mustachios\''],
                  hint: 'Review c11_eng_w_cbse_02_002 (Plot) and c11_eng_w_cbse_02_004 (Character) to re-anchor each.',
                  misconception: 'Students treat \'vocabulary in context\' as \'find the dictionary meaning of difficult words.\' They look up \'bourgeoise\' → \'middle class\' and.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Return to the text with a three-column table: Word/Phrase | Context Sentence | What It Does (not just what it means).', 'For each entry, ask: "If Anand replaced this with a plain synonym, what satire would be lost?" 3.', 'Practice with the \'goat moustache\' passage: replace \'indifferent, thin little line\' with \'ordinary\' — discuss how.', 'Have the student write two sentences per word: one in Anand\'s register, one in modern casual English, then compare.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_011', difficulty: 'standard',
          question: 'Language and style in \'A Pair of Mustachios\' — how the writer chose words.',
          hint: 'Review "Diary as a Literary Form: Features and Personal Voice" (c10_engl_cbse_04_007).',
          misconception: 'Students believe "language usage" means only identifying parts of speech (nouns, verbs) or tense forms.',
          parts: [
                { id: 'a', prompt: 'Define "loanword" and identify three French loanwords used in "A Pair of Mustachios" with their meanings in the story\'s context.', answer: 'A loanword is a word adopted from one language into another without translation',
                  options: ['A loanword is a word adopted from one language into another without translation', 'moustache', 'language usage', 'moustache" as French'],
                  hint: 'Review "Diary as a Literary Form: Features and Personal Voice" (c10_engl_cbse_04_007) —.',
                  misconception: 'Students believe "language usage" means only identifying parts of speech (nouns, verbs) or tense forms.' },
                { id: 'b', prompt: 'Explain the difference between the narrator\'s register and Ramanand\'s register in the opening paragraph versus the bargaining scene. Why does this shift matter?', answer: 'The narrator uses formal, ironic, quasi-academic English ("resplendent rajas,"',
                  options: ['The narrator uses formal, ironic, quasi-academic English ("resplendent rajas,"', 'formal', 'language usage'],
                  hint: 'Review "Diary as a Literary Form: Features and Personal Voice" (c10_engl_cbse_04_007) —.',
                  misconception: 'Students believe "language usage" means only identifying parts of speech (nouns, verbs) or tense forms.' }
          ],
            remediations: { 'language-usage-means-only-identifying': { steps: ['If the student cannot distinguish registers: (1) Give them three short extracts — narrator\'s opening, Ramanand\'s.', '(3) Discuss how meaning changes: e.g., "draw up a deed" → "likho ek paper" → "prepare a document" — each carries.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension of \'A Pair of Mustachios\' — questions answered straight.',
          hint: 'If stuck on evidence location, review c11_eng_w_cbse_02_002 (Plot) for event sequence and.',
          misconception: 'Students believe "inferential" means "guessing the author\'s hidden thoughts" and therefore write answers based.',
          parts: [
                { id: 'a', prompt: 'Classify the following questions as Literal (L) or Inferential (I) and answer ONE of each type using the text: a) What item did Khan Azam Khan pawn first?', answer: '**Correct Classification & Answers:** a) L',
                  options: ['**Correct Classification & Answers:** a) L', 'inferential', 'guessing the author\'s hidden thoughts', 'I think Khan is foolish'],
                  hint: 'If stuck on evidence location, review c11_eng_w_cbse_02_002 (Plot) for event sequence and.',
                  misconception: 'Students believe "inferential" means "guessing the author\'s hidden thoughts" and therefore write answers based on personal feelings ("I.' }
          ],
            remediations: { 'inferential-means-guessing-the-author': { steps: ['**Re-teach Question Taxonomy:** Give the student 10 mixed questions from the story; have them highlight the *command.', '**Evidence Hunting Drill:** For 3 inferential questions, provide the inference; student must find *exact sentences*.', '**PEEL Scaffolding:** Provide a fill-in-the-blank PEEL template for a new inferential question.', 'Student completes only the Explanation and Link steps.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
