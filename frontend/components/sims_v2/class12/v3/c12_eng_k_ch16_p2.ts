import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch16_p2: SimDef = {
    id: 'v3_c12_eng_k_ch16_p2',
    title: 'Film-Making (Non-fiction) · Part 2/3',
    subtitle: 'The conjurer\'s secret: you sit in darkness 27 minutes an hour',
    classLevel: 12, subject: 'eng_k', topic: 'Film-Making (Non-fiction) · Part 2/3',
    chapters: ['c12_eng_k_ch16'],
    nodeIds: ['c12_eng_k_cbse_16_007', 'c12_eng_k_cbse_16_008', 'c12_eng_k_cbse_16_009', 'c12_eng_k_cbse_16_010', 'c12_eng_k_cbse_16_011', 'c12_eng_k_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Film-craft essayist', intro: 'The \'poet of the human face\' explains why a screenplay can never contain a film — and why that\'s the point.', goal: 'Understand Bergman\'s film-as-rhythm philosophy, the conjurer and cathedral metaphors, and the adaptation debate with Eco.' },
    discovery: {
        question: 'Bergman calls the film-maker a conjurer whose audience sits in total darkness 27 minutes of every hour. What\'s the deception?',
        options: ['Persistence of vision — 24 still frames per second with dark gaps between them read as continuous motion; cinema is an illusion that works on the eye', 'Film is fake — nothing moves', 'Audiences nap during films', 'Projectors steal time'],
        answer: 'Persistence of vision — 24 still frames per second with dark gaps between them read as continuous motion; cinema is an illusion that works on the eye',
        hook: 'Bergman insists film is closer to music than literature — it hits emotion through rhythm and montage, not intellect. That\'s why he calls the script \'a very imperfect technical basis\': dialogue survives translation, but a film\'s breathing — its moods, tones, tensions — never fits into words.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, motifs, and concerns that run beneath the primary theme of a text, enriching its meaning by exploring related but distinct aspects of the human experience.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_16_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Argue film vs literature like Bergman: test the conjurer metaphor on a famous scene\'s editing rhythm, then cross-examine Eco\'s regret that an adaptation fixes \'how the reader must imagine.\'',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a film where the main plot is a director struggling to finish a movie — that\'s the primary theme.',
            decisions: [{ prompt: 'What is the difference between a primary theme and a secondary theme in a non-fiction essay like Bergman\'s "Film-Making"?', options: [
                { text: 'A primary theme is the central, unifying idea that the entire text revolves around (here:', outcome: 'A primary theme is the central, unifying idea that the entire text revolves around (here.' },
                { text: 'both are just main ideas', outcome: 'Not quite — Students often treat every topic Bergman mentions (childhood, religion, mentors, music, literature.', reveals: 'students-often-treat-every-topic' },
                { text: 'discuss the themes', outcome: 'Not quite — Students often treat every topic Bergman mentions (childhood, religion, mentors, music, literature.', reveals: 'students-often-treat-every-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re watching a film where the director shows a close-up of rain on a windowpane, then cuts to a character\'s tear-streaked face — you instantly feel.',
            decisions: [{ prompt: 'Identify the sensory imagery in this sentence from the text: "The landscape there is rugged, and our company was working by a little lake.', options: [
                { text: '**Correct answer:** Visual imagery: "rugged landscape," "little lake," "grey, rain-dimmed', outcome: '**Correct answer:** Visual imagery: "rugged landscape," "little lake," "grey, rain-dimmed sky,".' },
                { text: 'snowflakes', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* ("spot the metaphor") rather than.', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'rugged', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* ("spot the metaphor") rather than.', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Have you ever noticed how a filmmaker might say "I\'m just a conjurer" while actually claiming profound artistic authority?',
            decisions: [{ prompt: 'Define irony and symbolism as literary devices. Give one generic example of each (not from the text).', options: [
                { text: 'Irony: a contrast between expectation and reality (e.g., a fire station burning down)', outcome: 'Irony: a contrast between expectation and reality (e.g., a fire station burning down).' },
                { text: 'it rained on my wedding day', outcome: 'Not quite — Students often think any comparison is a symbol, or that irony is just "something funny.', reveals: 'any-comparison-is-a-symbol' },
                { text: 'the crane is a metaphor for freedom', outcome: 'Not quite — Students often think any comparison is a symbol, or that irony is just "something funny.', reveals: 'any-comparison-is-a-symbol' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re watching a classic Indian film like *Pather Panchali* without subtitles—you grasp the story through visuals, music, and actors\' expressions even.',
            decisions: [{ prompt: 'What are the four main types of context clues that help determine word meaning in a text? Give a one-sentence description of each.', options: [
                { text: 'The four main types are: 1) Definition/Explanation clues', outcome: 'The four main types are: 1) Definition/Explanation clues — the author directly defines or restates.' },
                { text: 'dictionary', outcome: 'Not quite — Students believe vocabulary-in-context means guessing a word\'s meaning from the single sentence.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'guessing', outcome: 'Not quite — Students believe vocabulary-in-context means guessing a word\'s meaning from the single sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are a film editor watching raw footage — you need to identify each shot\'s role (close-up, wide, cutaway) to assemble a coherent scene.',
            decisions: [{ prompt: 'Identify the Subject, Verb, and Object in this sentence from the text: "The film was a great success and was projected every night until.', options: [
                { text: 'Correct analysis', outcome: 'Correct analysis: This is a compound predicate sentence with two clauses joined by "and".' },
                { text: 'a great success', outcome: 'Not quite — Students consistently treat every noun phrase after a verb as an "Object", ignoring linking verbs.', reveals: 'students-consistently-treat-every-noun' },
                { text: 'in Uppsala', outcome: 'Not quite — Students consistently treat every noun phrase after a verb as an "Object", ignoring linking verbs.', reveals: 'students-consistently-treat-every-noun' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE board exam and see a question: "Why does Bergman compare film-making to conjuring?" You might panic because the answer isn\'t.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What childhood memory does Bergman associate with the \'magic lantern\'?"', options: [
                { text: '**Literal.** The text explicitly states: "This is where my magic lantern came in', outcome: '**Literal.** The text explicitly states: "This is where my magic lantern came in.' },
                { text: 'A student who labels this', outcome: 'Not quite — Students treat "inferential" as "guess the author\'s hidden thoughts" and write answers like.', reveals: 'students-treat-inferential-as-guess' },
                { text: 'confuses *detail retrieval* with *interpretation*', outcome: 'Not quite — Students treat "inferential" as "guess the author\'s hidden thoughts" and write answers like.', reveals: 'students-treat-inferential-as-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A studio buys rights to a dense literary novel and instructs the director: \'translate it page-for-page — faithfulness is everything.\'',
            decisions: [{ prompt: 'Would Bergman sign off?', options: [
                { text: 'No — Bergman says film and literature are different languages; a literal translation wastes enormous effort for little fruit — reinvent the story in film\'s own terms or don\'t adapt it.', outcome: 'The conjurer works with rhythm and image on the nerves, not with sentences; fidelity to the letter can betray the spirit.' },
                { text: 'Yes — faithful means page-for-page, anything less betrays the book.', outcome: 'Bergman\'s warning is that the \'complicated adjustments\' of literal adaptation usually bear no fruit; faithfulness is to the experience, not the page order.', reveals: 'faithful-equals-literal' },
                { text: 'Adapt anything — a film is basically an illustrated book anyway.', outcome: 'That erases the medium\'s distinct address to emotion; film isn\'t literature with pictures.', reveals: 'film-is-illustrated-text' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend cinema as its own language — rhythm and illusion, not filmed prose. Bergman gives you a craftsman\'s manifesto for an entire art form.',
            decisions: [{ prompt: 'What comes next? Film-Making (Non-fiction) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Film-Making (Non-fiction) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, motifs, and concerns that run.',
          hint: 'If stuck, return to node 006 and re-do its Worked Example 3 (thematic statement.',
          misconception: 'Students often treat every topic Bergman mentions (childhood, religion, mentors, music, literature, industry) as.',
          parts: [
                { id: 'a', prompt: 'Bergman writes: "Film has nothing to do with literature; the character and substance of the two art forms are usually in conflict." Yet he also says music and.', answer: 'The film-literature vs',
                  options: ['The film-literature vs', 'Bergman\'s opinion on books'],
                  hint: 'If stuck, return to node 006 and re-do its Worked Example 3 (thematic statement formulation) —.',
                  misconception: 'Students often treat every topic Bergman mentions (childhood, religion, mentors, music, literature, industry) as a separate secondary.' }
          ],
            remediations: { 'students-often-treat-every-topic': { steps: ['If the student cannot distinguish topics from developed themes: (1) Have them re-read the essay with four colored.', '(2) For each color, they must find ≥3 separated passages.', '(3) If a color has <3 passages, it\'s a topic, not a theme — discard or merge.', '(4) For each surviving color, write one "theme statement" (complete sentence) and one "connection sentence" linking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, revisit Class 11 Hornbill/Snapshots/Woven Words "Literary Devices: Imagery and.',
          misconception: 'Students treat imagery and metaphor as *identification exercises* ("spot the metaphor") rather than *interpretive.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the metaphor "a brightly coloured thread sticking out of the dark sack of the unconscious." What is the tenor, what is the vehicle.', answer: '**Correct answer:** Tenor = the initial vague idea for a film',
                  options: ['**Correct answer:** Tenor = the initial vague idea for a film', 'the thread is the film', 'the sack is the mind', 'cathedral'],
                  hint: 'If stuck, revisit Class 11 Hornbill/Snapshots/Woven Words "Literary Devices: Imagery and Metaphor".',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* ("spot the metaphor") rather than *interpretive tools*.' },
                { id: 'b', prompt: 'Bergman writes: "When I show a film I am guilty of deceit. I use an apparatus which is constructed to take advantage of a certain human weakness...', answer: '**Correct answer:** Vehicle = conjurer/magician',
                  options: ['**Correct answer:** Vehicle = conjurer/magician', 'director tricks audience', 'cathedral'],
                  hint: 'If stuck, revisit Class 11 Hornbill/Snapshots/Woven Words "Literary Devices: Imagery and Metaphor".',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* ("spot the metaphor") rather than *interpretive tools*.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Have the student re-read the "Split Second Impressions" and "Rhythm of a Film" sections aloud, marking every phrase.', 'For each highlighted phrase, ask: "What sense?', 'What abstract idea is this concrete image carrying?" — fill a two-column table.', 'Take the "conjurer" metaphor: have them list 5 qualities of a conjurer, then map each to film-making.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'Review the distinction between metaphor and symbol using the magic lantern vs.',
          misconception: 'Students often think any comparison is a symbol, or that irony is just "something funny or coincidental." In this text.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality, or',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality, or', 'This node provides the essential historical, biographical, and conceptual background', 'Plot and Narrative Structure in a non-fiction film essay refers to the author\'s', 'In non-fiction prose like Bergman\'s essay, **setting** refers to the specific physical,'],
                  hint: 'Review the distinction between metaphor and symbol using the magic lantern vs.',
                  misconception: 'Students often think any comparison is a symbol, or that irony is just "something funny or coincidental." In this text, they may label the.' }
          ],
            remediations: { 'any-comparison-is-a-symbol': { steps: ['Re-read the opening crane scene (paragraphs 1-3) and the cathedral passage (paragraphs 12-14) aloud.', 'For each, complete a two-column table: Column A = Literal Description (what is physically happening), Column.', 'For irony, locate three statements where Bergman says something negative about himself/film-making and ask: "Does the.', 'Re-attempt Diagnostic Questions 3 and 4 using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any comparison is a symbol, or that irony is just "something funny or coincidental." In this text.',
          parts: [
                { id: 'a', prompt: 'Bergman calls himself a \'conjurer\' and an \'impostor\'. Is this verbal irony? Justify with reference to the text.', answer: 'Yes, it is verbal irony',
                  options: ['Yes, it is verbal irony', 'something funny or coincidental', 'just a nice description', 'humility'],
                  hint: 'Review the distinction between metaphor and symbol using the magic lantern vs.',
                  misconception: 'Students often think any comparison is a symbol, or that irony is just "something funny or coincidental." In this text, they may label the.' },
                { id: 'b', prompt: 'Write a short paragraph (4-5 sentences) describing a symbolic object that could represent your own creative process, and include an ironic twist.', answer: 'A strong answer: "My creative process is a tangled ball of yarn',
                  options: ['A strong answer: "My creative process is a tangled ball of yarn', 'something funny or coincidental', 'just a nice description', 'humility'],
                  hint: 'Review the distinction between metaphor and symbol using the magic lantern vs.',
                  misconception: 'Students often think any comparison is a symbol, or that irony is just "something funny or coincidental." In this text, they may label the.' }
          ],
            remediations: { 'any-comparison-is-a-symbol': { steps: ['Re-read the opening crane scene (paragraphs 1-3) and the cathedral passage (paragraphs 12-14) aloud.', 'For each, complete a two-column table: Column A = Literal Description (what is physically happening), Column.', 'For irony, locate three statements where Bergman says something negative about himself/film-making and ask: "Does the.', 'Re-attempt Diagnostic Questions 3 and 4 using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning of words.',
          hint: 'If stuck, review the four types of context clues using a simpler text (e.g., Class 10 \'A.',
          misconception: 'Students believe vocabulary-in-context means guessing a word\'s meaning from the single sentence it appears in.',
          parts: [
                { id: 'a', prompt: 'What are the four main types of context clues that help determine word meaning in a text? Give a one-sentence description of each.', answer: 'The four main types are: 1) Definition/Explanation clues',
                  options: ['The four main types are: 1) Definition/Explanation clues', 'dictionary', 'guessing', 'montage'],
                  hint: 'If stuck, review the four types of context clues using a simpler text (e.g., Class 10 \'A Letter.',
                  misconception: 'Students believe vocabulary-in-context means guessing a word\'s meaning from the single sentence it appears in.' },
                { id: 'b', prompt: 'Choose ONE word from the list below that is unfamiliar to you.', answer: 'Example for "montage": Clue type = Definition/Explanation + Inference',
                  options: ['Example for "montage": Clue type = Definition/Explanation + Inference', 'montage', 'photo collage', 'editing principle that structures film\'s rhythm'],
                  hint: 'If stuck, review the four types of context clues using a simpler text (e.g., Class 10 \'A Letter.',
                  misconception: 'Students believe vocabulary-in-context means guessing a word\'s meaning from the single sentence it appears in.' },
                { id: 'c', prompt: 'Compare how Bergman and Eco each use the concept of "film" (or "movie") in their texts. Does the meaning or connotation shift?', answer: 'Bergman treats "film" as his primary medium of expression',
                  options: ['Bergman treats "film" as his primary medium of expression', 'montage', 'photo collage', 'editing principle that structures film\'s rhythm'],
                  hint: 'If stuck, review the four types of context clues using a simpler text (e.g., Class 10 \'A Letter.',
                  misconception: 'Students believe vocabulary-in-context means guessing a word\'s meaning from the single sentence it appears in.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Re-read the exact paragraph where the target word appears.', 'Identify the subject (film-making) and author\'s purpose (explaining craft/industry).', 'Hunt for signal phrases: "by which I mean," "that is," "for example," "however," "like." 4.', 'Break the word into morphemes (e.g., ir-rational = not rational).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_011', difficulty: 'standard',
          question: 'Sentence analysis in the context of "Film-Making" involves identifying the core.',
          hint: 'If stuck, review "Finite vs Non-finite Verbs" and "Transitive vs Intransitive vs Linking.',
          misconception: 'Students consistently treat every noun phrase after a verb as an "Object", ignoring linking verbs (be, seem, become).',
          parts: [
                { id: 'a', prompt: 'Identify the Subject, Verb, and Object in this sentence from the text: "The film was a great success and was projected every night until it broke."', answer: 'Correct analysis',
                  options: ['Correct analysis', 'a great success', 'in Uppsala', 'where?'],
                  hint: 'If stuck, review "Finite vs Non-finite Verbs" and "Transitive vs Intransitive vs Linking Verbs".',
                  misconception: 'Students consistently treat every noun phrase after a verb as an "Object", ignoring linking verbs (be, seem, become) that take Complements.' },
                { id: 'b', prompt: 'Explain in your own words why "in Uppsala" in the sentence "My grandmother had a very large old apartment in Uppsala" is an Adjunct and not an Object.', answer: '"In Uppsala" is a prepositional phrase answering "where?"',
                  options: ['"In Uppsala" is a prepositional phrase answering "where?"', 'Do as directed', 'Rewrite removing the adjunct', 'in Uppsala'],
                  hint: 'If stuck, review "Finite vs Non-finite Verbs" and "Transitive vs Intransitive vs Linking Verbs".',
                  misconception: 'Students consistently treat every noun phrase after a verb as an "Object", ignoring linking verbs (be, seem, become) that take Complements.' },
                { id: 'c', prompt: 'Analyse the sentence "Thus the script is a very imperfect technical basis for a film" into Subject, Verb, Complement, Intensifier, and Adjunct(s).', answer: 'Step 1: Verb = "is" (linking)',
                  options: ['Step 1: Verb = "is" (linking)', 'for a film', 'in Uppsala', 'where?'],
                  hint: 'If stuck, review "Finite vs Non-finite Verbs" and "Transitive vs Intransitive vs Linking Verbs".',
                  misconception: 'Students consistently treat every noun phrase after a verb as an "Object", ignoring linking verbs (be, seem, become) that take Complements.' }
          ],
            remediations: { 'students-consistently-treat-every-noun': { steps: ['Revisit the Class 6 node c6_english_u4_038 (Sentence Structure and Types of Sentences) to relearn Subject/Predicate.', 'Use the Class 11 Hornbill grammar nodes (e.g., c11_eng_h_cbse_01_011) to practice SVC vs SVO distinction with textbook.', 'Do a focused drill: take 10 sentences from the chapter, mark the verb, decide transitive/linking, then label everything.', 'Re-attempt Diagnostic Questions 1, 3, and 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_16_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck on "where to find evidence", revisit c12_eng_k_cbse_16_002 (Plot/Narrative.',
          misconception: 'Students treat "inferential" as "guess the author\'s hidden thoughts" and write answers like "Bergman feels sad about.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What childhood memory does Bergman associate with the \'magic lantern\'?"', answer: '**Literal.** The text explicitly states: "This is where my magic lantern came in',
                  options: ['**Literal.** The text explicitly states: "This is where my magic lantern came in', 'A student who labels this', 'confuses *detail retrieval* with *interpretation*', 'any "childhood memory" question requires guesswork'],
                  hint: 'If stuck on "where to find evidence", revisit c12_eng_k_cbse_16_002 (Plot/Narrative Structure).',
                  misconception: 'Students treat "inferential" as "guess the author\'s hidden thoughts" and write answers like "Bergman feels sad about his childhood" without.' }
          ],
            remediations: { 'students-treat-inferential-as-guess': { steps: ['Have the student pick any paragraph from the Bergman essay.', 'Ask them to write one literal question and one inferential question *from that same paragraph*.', 'For the inferential, require them to underline the exact words that serve as evidence and write the logical step in.', 'Repeat with the Eco interview.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
