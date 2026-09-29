import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch07_p2: SimDef = {
    id: 'v3_c11_eng_h_ch07_p2',
    title: 'The Adventure · Part 2/3',
    subtitle: 'Distinguish a parallel present from time travel in a scientist\'s alternate history.',
    classLevel: 11, subject: 'eng_h', topic: 'The Adventure · Part 2/3',
    chapters: ['c11_eng_h_ch07'],
    nodeIds: ['c11_eng_h_cbse_07_007', 'c11_eng_h_cbse_07_008', 'c11_eng_h_cbse_07_009', 'c11_eng_h_cbse_07_010', 'c11_eng_h_cbse_07_011', 'c11_eng_h_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physicist auditing a historian\'s two missing days', intro: 'A truck, a blackout, and a Bombay where the East India Company still stands — explain it without calling it a dream.', goal: 'Explain the story\'s frame structure and the scientific ideas powering its alternate history.' },
    discovery: {
        question: 'Professor Gaitonde wakes in a Bombay where the Marathas won Panipat. Did he travel back to 1761?',
        options: ['No — he shifted to a parallel present where that past unfolded differently; he never left his own century', 'Yes — the truck collision sent his body to 1761', 'Yes — but only his mind travelled, in a dream', 'No — he hallucinated while comatose, and the story says so'],
        answer: 'No — he shifted to a parallel present where that past unfolded differently; he never left his own century',
        hook: 'Not time travel but a sidestep — many-worlds says another \'now\' exists where Panipat went the other way.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Laburnum Top\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the frame story from the inner alternate history, map the Bombay episode onto five dramatic stages, and judge whether Rajendra\'s physics is real resolution or decoration.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Laburnum Top\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Name any two secondary themes present in "The Adventure" besides the primary theme of alternate history.', options: [
                { text: 'Two secondary themes are: (1) The role of chance and contingency in shaping historical', outcome: 'Two secondary themes are: (1) The role of chance and contingency in shaping historical outcomes.' },
                { text: 'the Battle of Panipat', outcome: 'Not quite — Students often confuse secondary themes with "subplots" or "minor topics." For example, they list.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'Professor Gaitonde\'s journey', outcome: 'Not quite — Students often confuse secondary themes with "subplots" or "minor topics." For example, they list.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Laburnum Top\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "The Adventure" where Professor Gaitonde\'s expectations about history are contradicted.', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply different from what', outcome: 'Situational irony occurs when the outcome of a situation is sharply different from what was.' },
                { text: 'the train is a metaphor for life\'s journey', outcome: 'Not quite — Students often confuse *symbolism* with *metaphor* — they say "the train is a metaphor for life\'s.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Laburnum Top\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "contextual meaning" and explain how it differs from "denotative meaning" using one example from any text you have studied.', options: [
                { text: 'Contextual meaning is the specific sense a word acquires from its surrounding linguistic', outcome: 'Contextual meaning is the specific sense a word acquires from its surrounding linguistic.' },
                { text: 'The Adventure', outcome: 'Not quite — Students treat "vocabulary in context" as "find the meaning of difficult words" and hunt for.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'transition', outcome: 'Not quite — Students treat "vocabulary in context" as "find the meaning of difficult words" and hunt for.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Laburnum Top\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question in the CBSE Class 11.', options: [
                { text: 'A literal question\'s answer is explicitly stated in the text and can be located in one or', outcome: 'A literal question\'s answer is explicitly stated in the text and can be located in one or two.' },
                { text: 'inferential means guessing', outcome: 'Not quite — Students believe "inferential" means "any answer I think makes sense" and therefore write opinions.', reveals: 'inferential-means-any-answer-i' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "any answer I think makes sense" and therefore write opinions.', reveals: 'inferential-means-any-answer-i' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your book club discusses \'The Adventure\'. One member summarises: \'Professor Gaitonde time-travels to 1761, and his presence near the battle makes the Marathas win — classic butterfly-effect time travel.\'',
            decisions: [{ prompt: 'Is that what the story does?', options: [
                { text: 'No — it\'s a many-worlds shift, not time travel: Gaitonde never visits 1761; the collision triggers a catastrophic transition so his consciousness lands in a parallel PRESENT — a modern Bombay (Victoria Terminus, Forbes building) where the Marathas won long ago. He meets the outcome, not the battle.', outcome: 'Alternate history ≠ time travel: the divergence happened in the past, but the professor experiences a contemporary world-line that branched from it.' },
                { text: 'The summary is right — he goes back and changes the result at Panipat.', outcome: 'He changes nothing and goes nowhere backward — he observes a world-line where events already differed; the \'travel\' is horizontal between presents, not diagonal into 1761.', reveals: 'alternate-history-is-time-travel' },
                { text: 'It\'s a dream — the truck crash knocked him out and he hallucinated the other Bombay.', outcome: 'Narlikar, an astrophysicist, grounds it in catastrophe theory and quantum branching — the story insists on a physical mechanism, not \'it was all a dream\'.', reveals: 'it-was-all-a-dream' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'Narlikar the astrophysicist smuggled real theory into fiction — the torn Bakhar page is the clue that refuses to stay a dream.',
            decisions: [{ prompt: 'What comes next? The Adventure · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Adventure · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Laburnum Top\' — the supporting ideas and motifs that.',
          hint: 'If stuck, return to c11_eng_h_cbse_07_006 and re-do the "theme statement + three.',
          misconception: 'Students often confuse secondary themes with "subplots" or "minor topics." For example, they list "the Azad Maidan.',
          parts: [
                { id: 'a', prompt: 'Read this excerpt from a hypothetical story: "Archaeologist Meera found a coin that proved King Vikramaditya never existed.', answer: 'The dialogue illustrates the theme "history as constructed narrative vs',
                  options: ['The dialogue illustrates the theme "history as constructed narrative vs', 'history', 'archaeology', 'subplots'],
                  hint: 'If stuck, return to c11_eng_h_cbse_07_006 and re-do the "theme statement + three evidences".',
                  misconception: 'Students often confuse secondary themes with "subplots" or "minor topics." For example, they list "the Azad Maidan lecture" or "Gaitonde\'s.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists plot events as themes: (1) Have them write the event as a noun phrase (e.g., "the train journey").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse secondary themes with "subplots" or "minor topics." For example, they list "the Azad Maidan.',
          parts: [
                { id: 'a', prompt: 'Evaluate which secondary theme — "the fallibility of historical sources" or "the psychological impact of displaced identity" — is more central to the story\'s.', answer: '"The fallibility of historical sources" is more central',
                  options: ['"The fallibility of historical sources" is more central', 'displaced identity', 'subplots', 'minor topics'],
                  hint: 'If stuck, return to c11_eng_h_cbse_07_006 and re-do the "theme statement + three evidences".',
                  misconception: 'Students often confuse secondary themes with "subplots" or "minor topics." For example, they list "the Azad Maidan lecture" or "Gaitonde\'s.' },
                { id: 'b', prompt: 'Write a 100-word paragraph imagining a deleted scene where Gaitonde meets a historian in the alternate reality who refuses to accept the Bakhar\'s account.', answer: 'A strong answer creates a scene where the historian argues: "The Bakhar is court',
                  options: ['A strong answer creates a scene where the historian argues: "The Bakhar is court', 'subplots', 'minor topics', 'the Azad Maidan lecture'],
                  hint: 'If stuck, return to c11_eng_h_cbse_07_006 and re-do the "theme statement + three evidences".',
                  misconception: 'Students often confuse secondary themes with "subplots" or "minor topics." For example, they list "the Azad Maidan lecture" or "Gaitonde\'s.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists plot events as themes: (1) Have them write the event as a noun phrase (e.g., "the train journey").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_008', difficulty: 'standard',
          question: 'Imagery in \'The Laburnum Top\' — the vivid, sensory language that creates.',
          hint: 'If stuck, review c11_eng_h_cbse_07_002 (Plot) focusing on the sequence of reality-tests.',
          misconception: 'Students often treat imagery as merely "descriptive writing" and metaphor as merely "decoration." In "The Adventure,".',
          parts: [
                { id: 'a', prompt: 'In the sentence "History had taken a different turn, perhaps at the Battle of Panipat," the phrase "taken a different turn" is a metaphor.', answer: 'Source domain: a journey/road (turns, paths)',
                  options: ['Source domain: a journey/road (turns, paths)', 'it means history changed', 'says "it means history changed" misses the metaphorical mapping'],
                  hint: 'If stuck, review c11_eng_h_cbse_07_002 (Plot) focusing on the sequence of reality-tests Gaitonde.',
                  misconception: 'Students often treat imagery as merely "descriptive writing" and metaphor as merely "decoration." In "The Adventure," the olfactory imagery.' }
          ],
            remediations: { 'students-often-treat-imagery-as': { steps: ['Have the student reread the Victoria Terminus arrival scene (first 3 paragraphs) with three highlighters: one for each.', 'Ask: "If you removed all highlighted phrases, what would Gaitonde *know* about where he is?" Guide them to see that.', 'For metaphor, give the sentence "The train of history had jumped the tracks." Have them draw the two domains.', 'history/events) and list three mappings (tracks = predetermined course, jumping = sudden divergence, derailment.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Laburnum Top\' — where opposite things are both true.',
          hint: 'If stuck, review c11_eng_h_cbse_07_008 (Imagery and Metaphor) — the step from.',
          misconception: 'Students often confuse *symbolism* with *metaphor* — they say "the train is a metaphor for life\'s journey" — but.',
          parts: [
                { id: 'a', prompt: 'Analyze how the history books in the alternate timeline function as symbols.', answer: 'The history books symbolize the malleability of recorded truth',
                  options: ['The history books symbolize the malleability of recorded truth', 'the train is a metaphor for life\'s journey'],
                  hint: 'If stuck, review c11_eng_h_cbse_07_008 (Imagery and Metaphor) — the step from "comparison".',
                  misconception: 'Students often confuse *symbolism* with *metaphor* — they say "the train is a metaphor for life\'s journey" — but in this story, the train.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Have the student list 3 moments where Gaitonde\'s expectations fail — then label each as situational, dramatic,.', 'Give them two columns: "Literal Object" and "Abstract Idea" — match train, books, lecture chair, Azad Maidan.', 'Ask: "If this object were removed, would the theme still be clear?" — if yes, it\'s not a central symbol.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Laburnum Top\' — the words and phrases you must know.',
          hint: 'If stuck on register identification: Review Class 10 "Nelson Mandela" vocabulary node.',
          misconception: 'Students treat "vocabulary in context" as "find the meaning of difficult words" and hunt for obscure terms (e.g.',
          parts: [
                { id: 'a', prompt: 'In "The Adventure," the phrase "catastrophe theory" appears. Explain why the author uses this specific scientific term instead of simpler alternatives like.', answer: '"Catastrophe theory" is a precise mathematical framework (René Thom\'s topology)',
                  options: ['"Catastrophe theory" is a precise mathematical framework (René Thom\'s topology)', 'difficult vocabulary'],
                  hint: 'If stuck on register identification: Review Class 10 "Nelson Mandela" vocabulary node.',
                  misconception: 'Students treat "vocabulary in context" as "find the meaning of difficult words" and hunt for obscure terms (e.g., "bifurcation") while.' },
                { id: 'b', prompt: 'Analyze how the connotation of the word "alternative" evolves across the story — from Gaitonde\'s initial hypothesis to the final revelation.', answer: 'Initially, "alternative" connotes "academic possibility"',
                  options: ['Initially, "alternative" connotes "academic possibility"', 'alternative', 'different'],
                  hint: 'If stuck on register identification: Review Class 10 "Nelson Mandela" vocabulary node.',
                  misconception: 'Students treat "vocabulary in context" as "find the meaning of difficult words" and hunt for obscure terms (e.g., "bifurcation") while.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Give the student a 100-word excerpt from the story\'s climax.', 'Ask them to highlight every word that refers to "reality/existence" (real, world, history, book, experience, fact.', 'Have them write the contextual definition for each IN THAT EXCERPT ONLY.', 'Compare with dictionary definitions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_011', difficulty: 'standard',
          question: 'Language and style in \'The Laburnum Top\' — how the writer chose words.',
          hint: 'Review Class 10 reported speech rules (backshift, pronoun change, time/place adverbials).',
          misconception: 'Students treat grammar in literature as \'correctness\' rather than \'choice\', assuming past tense is just \'how stories.',
          parts: [
                { id: 'a', prompt: 'Compare these two sentences from the text: (a) "The train stopped at a small station." (b) "The train had been stopped by a signal failure." Analyze the voice.', answer: '"The train stopped at a small station." (',
                  options: ['"The train stopped at a small station." (', 'both are active'],
                  hint: 'Review Class 10 reported speech rules (backshift, pronoun change, time/place adverbials) and Class.',
                  misconception: 'Students treat grammar in literature as \'correctness\' rather than \'choice\', assuming past tense is just \'how stories are told\'.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['Give the student a 5-sentence excerpt with all verbs blanked; ask them to fill in tenses based on time markers (e.g.', 'Have them physically map the story\'s three time zones (1761, 20th-century \'real\', 20th-century \'alternate\') on.', 'Practice converting 5 direct-speech lines to reported speech with backshift, highlighting how the reporting verb.', 'Finally, ask them to rewrite one paragraph changing all passives to actives and discuss what is lost (scientific.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_07_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Laburnum Top\' — questions answered straight from.',
          hint: 'If stuck, re-read the Rajendra Deshpande dialogue sections (catastrophe theory.',
          misconception: 'Students believe "inferential" means "any answer I think makes sense" and therefore write opinions unsupported by the.',
          parts: [
                { id: 'a', prompt: 'Analyse the following two questions on "The Adventure" and explain which requires a multi-clue inference chain and why: (a) "Where did Professor Gaitonde stay.', answer: 'Question (b) requires a multi-clue inference chain: Clue 1',
                  options: ['Question (b) requires a multi-clue inference chain: Clue 1', 'inferential', 'any answer I think makes sense', 'Gaitonde was dreaming'],
                  hint: 'If stuck, re-read the Rajendra Deshpande dialogue sections (catastrophe theory explanation) and the.',
                  misconception: 'Students believe "inferential" means "any answer I think makes sense" and therefore write opinions unsupported by the text — e.g.' }
          ],
            remediations: { 'inferential-means-any-answer-i': { steps: ['Give the student a 5-sentence excerpt from "The Adventure" and three questions — one literal, one inferential, one.', 'For the inferential question, have them highlight the exact phrases they used as clues (colour-code).', 'Model the 3-step chain aloud: "Clue A + Clue B → logical link → conclusion."', 'Assign two practice questions daily for a week, insisting on the Point-Evidence-Explanation format with clause-level.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
