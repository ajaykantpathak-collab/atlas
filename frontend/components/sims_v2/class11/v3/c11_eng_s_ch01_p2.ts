import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch01_p2: SimDef = {
    id: 'v3_c11_eng_s_ch01_p2',
    title: 'The Summer of the Beautiful White Horse · Part 2/3',
    subtitle: 'Test a boy\'s loophole logic against a tribe\'s absolute honesty.',
    classLevel: 11, subject: 'eng_s', topic: 'The Summer of the Beautiful White Horse · Part 2/3',
    chapters: ['c11_eng_s_ch01'],
    nodeIds: ['c11_eng_s_cbse_01_007', 'c11_eng_s_cbse_01_008', 'c11_eng_s_cbse_01_009', 'c11_eng_s_cbse_01_010', 'c11_eng_s_cbse_01_011', 'c11_eng_s_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader untangling a childhood memory from its excuses', intro: 'A stolen horse ridden at dawn by a boy who swears it isn\'t theft — the adult telling the story knows better, and so does the tribe.', goal: 'Analyse the retrospective frame and evaluate the boys\' moral reasoning against the Garoghlanian code.' },
    discovery: {
        question: 'Mourad has the neighbour\'s missing horse but insists it isn\'t stealing — \'it wouldn\'t become stealing until we offered to sell.\' By his own tribe\'s code, is he right?',
        options: ['No — the Garoghlanian reputation for honesty is absolute, and his rule is a child\'s rationalisation', 'Yes — borrowing for joy isn\'t theft in any moral system', 'Yes — the code only forbids selling stolen goods', 'No — but only because John Byro actually recognised the horse'],
        answer: 'No — the Garoghlanian reputation for honesty is absolute, and his rule is a child\'s rationalisation',
        hook: '\'Proud first, honest next\' — the boys\' loophole collapses the moment Mourad himself snaps, \'Are you inviting a member of the Garoghlanian family to steal?\'',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Summer of the Beautiful White Horse\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Separate the adult narrator\'s nostalgia from nine-year-old Aram\'s excuses, order the events chronologically, and place the real moment of moral reckoning.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Summer of the Beautiful White Horse\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the difference between a primary theme and a secondary theme in a literary work?', options: [
                { text: 'A primary theme is the central, dominating idea that structures the entire narrative', outcome: 'A primary theme is the central, dominating idea that structures the entire narrative (e.g., honesty.' },
                { text: 'honesty', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and write one-sentence mentions.', reveals: 'secondary-theme-means-less-important' },
                { text: 'secondary theme', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and write one-sentence mentions.', reveals: 'secondary-theme-means-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Summer of the Beautiful White Horse\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the definition of imagery in literature? Give one example of visual imagery from the story.', options: [
                { text: 'Imagery is descriptive language that appeals to the senses to create mental pictures', outcome: 'Imagery is descriptive language that appeals to the senses to create mental pictures.' },
                { text: 'imagery is just any description', outcome: 'Not quite — Students often think any descriptive language is imagery, but imagery must specifically evoke.', reveals: 'any-descriptive-language-is-imagery' },
                { text: 'A is B', outcome: 'Not quite — Students often think any descriptive language is imagery, but imagery must specifically evoke.', reveals: 'any-descriptive-language-is-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'The Summer of the Beautiful White Horse\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and symbolism in your own words, giving one example of each from the story.', options: [
                { text: 'Situational irony occurs when the outcome contradicts expectations: the Garoghlanian', outcome: 'Situational irony occurs when the outcome contradicts expectations: the Garoghlanian family.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that the horse.', reveals: 'students-often-confuse-irony-with' },
                { text: 'the horse is just a horse', outcome: 'Not quite — Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that the horse.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Summer of the Beautiful White Horse\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What are the four main types of context clues used to infer word meanings in a narrative text?', options: [
                { text: 'The four main types are: (1) Definition/Explanation clues (the author defines the word', outcome: 'The four main types are: (1) Definition/Explanation clues (the author defines the word directly).' },
                { text: 'dictionary', outcome: 'Not quite — Students believe "vocabulary in context" means guessing any plausible meaning that fits the.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'guessing', outcome: 'Not quite — Students believe "vocabulary in context" means guessing any plausible meaning that fits the.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Summer of the Beautiful White Horse\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the primary narrative tense used in the story and quote one verb phrase from the first paragraph that illustrates it.', options: [
                { text: 'The primary narrative tense is simple past (e.g., "was," "came," "woke," "looked")', outcome: 'The primary narrative tense is simple past (e.g., "was," "came," "woke," "looked").' },
                { text: 'present tense', outcome: 'Not quite — Students treat "grammar analysis" as labeling parts of speech (e.g., "Vazire is a noun, run is.', reveals: 'students-treat-grammar-analysis-as' },
                { text: 'past perfect', outcome: 'Not quite — Students treat "grammar analysis" as labeling parts of speech (e.g., "Vazire is a noun, run is.', reveals: 'students-treat-grammar-analysis-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Summer of the Beautiful White Horse\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What was the name of the farmer who visited Aram\'s house looking for.', options: [
                { text: '**Answer:** Literal', outcome: '**Answer:** Literal. The name "John Byro" is explicitly stated in the text when the farmer visits.' },
                { text: 'not immediately remembered', outcome: 'Not quite — Students believe inferential questions ask for their *personal opinion* or *guesswork*.', reveals: 'inferential-questions-ask-for-their' },
                { text: 'not explicitly stated', outcome: 'Not quite — Students believe inferential questions ask for their *personal opinion* or *guesswork*.', reveals: 'inferential-questions-ask-for-their' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading circle is adapting \'The Summer of the Beautiful White Horse\' into a short play. The scriptwriter adds a police chase and a courtroom verdict scene: \'A stolen horse needs a crime plot — someone\'s got to arrest Mourad.\'',
            decisions: [{ prompt: 'Does the story support a police-case climax?', options: [
                { text: 'No — the conflict is internal, not legal: the Garoghlanian tribe\'s creed (\'proud first, honest next\') means the real drama is Aram struggling to square \'no Garoghlanian could be a thief\' with the horse standing in front of him. The resolution is the tribe\'s values quietly reasserting themselves — not a court.', outcome: 'Context is the key: an Armenian immigrant community in California whose honour code makes the horse\'s presence a paradox, not a police file.' },
                { text: 'The chase works — theft is theft, and every stolen-horse story needs law and order stakes.', outcome: 'That imports a generic crime plot; the story\'s tension is moral — a boy reconciling tribal honesty with longing — and the horse is returned without any authority involved.', reveals: 'internal-conflict-needs-police' },
                { text: 'Set it in Armenia — the tribe\'s homeland is the natural stage for the horse story.', outcome: 'The story is set in California\'s San Joaquin Valley; the diaspora setting and the idealised Garoghlanian identity are essential context, not decoration.', reveals: 'story-set-in-armenia' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'The horse goes back not because anyone was caught, but because the tribe\'s name couldn\'t survive being caught.',
            decisions: [{ prompt: 'What comes next? The Summer of the Beautiful White Horse · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Summer of the Beautiful White Horse · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Summer of the Beautiful White Horse\' — the supporting.',
          hint: 'Review "Theme: Primary Theme and Message" (c11_eng_s_cbse_01_006) and re-read the John.',
          misconception: 'Students often think "secondary theme" means "less important theme" and write one-sentence mentions like "Another theme.',
          parts: [
                { id: 'a', prompt: 'The story opens with Aram describing the world as "full of every imaginable kind of magnificence" and life as a "delightful and mysterious dream." Which.', answer: 'This establishes the secondary theme of **nostalgia and childhood innocence**',
                  options: ['This establishes the secondary theme of **nostalgia and childhood innocence**', 'it sets the setting', 'borrowing', 'secondary theme'],
                  hint: 'Review "Theme: Primary Theme and Message" (c11_eng_s_cbse_01_006) and re-read the John Byro.',
                  misconception: 'Students often think "secondary theme" means "less important theme" and write one-sentence mentions like "Another theme is poverty.".' },
                { id: 'b', prompt: 'Apply the concept of secondary themes to this scenario: In a different story, a poor child takes a book from a rich neighbor\'s library to read, intending.', answer: 'The secondary theme would be **hunger for knowledge/education**',
                  options: ['The secondary theme would be **hunger for knowledge/education**', 'poverty', 'secondary theme', 'less important theme'],
                  hint: 'Review "Theme: Primary Theme and Message" (c11_eng_s_cbse_01_006) and re-read the John Byro.',
                  misconception: 'Students often think "secondary theme" means "less important theme" and write one-sentence mentions like "Another theme is poverty.".' },
                { id: 'c', prompt: 'Analyze how the "crazy streak" in the Garoghlanian family (embodied by Mourad and Uncle Khosrove) functions as a secondary theme.', answer: 'The "crazy streak" represents **individuality within a collective identity**',
                  options: ['The "crazy streak" represents **individuality within a collective identity**', 'characterization', 'secondary theme', 'less important theme'],
                  hint: 'Review "Theme: Primary Theme and Message" (c11_eng_s_cbse_01_006) and re-read the John Byro.',
                  misconception: 'Students often think "secondary theme" means "less important theme" and write one-sentence mentions like "Another theme is poverty.".' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student lists themes without analysis: (1) Have them pick ONE secondary theme and find 3 textual moments where.', '(2) Ask: "How does this moment change your understanding of the primary theme?" (3) Model a PEEL paragraph: Point.', '(4) Practice with a familiar story (e.g., "The Necklace" — secondary theme: vanity vs.', 'reality) before returning to Saroyan.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "less important theme" and write one-sentence mentions like "Another theme.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The secondary theme of poverty in the story exists only to explain why the boys couldn\'t buy a horse." Defend or refute with textual.', answer: '**Refute.** Poverty is not just circumstantial',
                  options: ['**Refute.** Poverty is not just circumstantial', 'secondary theme', 'less important theme', 'Another theme is poverty'],
                  hint: 'Review "Theme: Primary Theme and Message" (c11_eng_s_cbse_01_006) and re-read the John Byro.',
                  misconception: 'Students often think "secondary theme" means "less important theme" and write one-sentence mentions like "Another theme is poverty.".' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student lists themes without analysis: (1) Have them pick ONE secondary theme and find 3 textual moments where.', '(2) Ask: "How does this moment change your understanding of the primary theme?" (3) Model a PEEL paragraph: Point.', '(4) Practice with a familiar story (e.g., "The Necklace" — secondary theme: vanity vs.', 'reality) before returning to Saroyan.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_008', difficulty: 'standard',
          question: 'Imagery in \'The Summer of the Beautiful White Horse\' — the vivid, sensory.',
          hint: 'Review the definitions of visual, auditory, olfactory, tactile, gustatory imagery and the.',
          misconception: 'Students often think any descriptive language is imagery, but imagery must specifically evoke a sensory experience.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the difference between a simile and a metaphor.', answer: 'A simile uses "like" or "as" to compare',
                  options: ['A simile uses "like" or "as" to compare', 'like/as', 'A is B', 'A is like B'],
                  hint: 'Review the definitions of visual, auditory, olfactory, tactile, gustatory imagery and the.',
                  misconception: 'Students often think any descriptive language is imagery, but imagery must specifically evoke a sensory experience.' }
          ],
            remediations: { 'any-descriptive-language-is-imagery': { steps: ['Have the student list the five senses and find one textual example for each sense from the story.', 'Give them three sentences: one literal, one simile, one metaphor.', 'Ask them to label each and explain why.', 'Use a think-aloud: model how to ask "Is this literally true?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Summer of the Beautiful White Horse\' — where opposite.',
          hint: 'If stuck, review Class 10 irony examples (c10_engl_cbse_01_005, c10_engl_cbse_09_006) and.',
          misconception: 'Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that the horse threw Aram" —.',
          parts: [
                { id: 'a', prompt: 'Explain the dramatic irony in the scene where John Byro examines the horse\'s mouth and says, "Tooth for tooth...', answer: 'Dramatic irony exists',
                  options: ['Dramatic irony exists', 'John Byro is fooled', 'It\'s not irony because he knows', 'It\'s ironic that the horse threw Aram'],
                  hint: 'If stuck, review Class 10 irony examples (c10_engl_cbse_01_005, c10_engl_cbse_09_006) and symbolism.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that the horse threw Aram" — no, that\'s just plot).' },
                { id: 'b', prompt: 'Compare the situational irony of Mourad stealing the horse with the verbal irony in his statement: "What? he roared.', answer: 'Situational irony: the tribe\'s honesty contrasts with the theft itself',
                  options: ['Situational irony: the tribe\'s honesty contrasts with the theft itself', 'It\'s ironic that the horse threw Aram'],
                  hint: 'If stuck, review Class 10 irony examples (c10_engl_cbse_01_005, c10_engl_cbse_09_006) and symbolism.',
                  misconception: 'Students often confuse irony with mere coincidence or bad luck (e.g., "It\'s ironic that the horse threw Aram" — no, that\'s just plot).' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the three key scenes: (a) Mourad at the window (opening), (b) John Byro\'s visit (middle), (c) The horse\'s.', 'Make a T-chart: left column "What the tribe believes/claims", right column "What actually happens".', 'For each row, name the irony type.', 'For symbols, use the "Concrete → Abstract" bridge: Horse (concrete) → Freedom/Innocence/Purity (abstract); Robin →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Summer of the Beautiful White Horse\' — the words and.',
          hint: 'Review Class 9 "Vocabulary in Context" (c9_engl_ch1_8) exercises on clue-type.',
          misconception: 'Students believe "vocabulary in context" means guessing any plausible meaning that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'In the opening paragraph, the narrator says: "One day back there in the good old days when I was nine and the world was full of every imaginable kind.', answer: '"Magnificence" means splendor, beauty, or grandeur',
                  options: ['"Magnificence" means splendor, beauty, or grandeur', 'horses', 'vocabulary in context'],
                  hint: 'Review Class 9 "Vocabulary in Context" (c9_engl_ch1_8) exercises on clue-type classification using.',
                  misconception: 'Students believe "vocabulary in context" means guessing any plausible meaning that fits the sentence.' },
                { id: 'b', prompt: 'Read this sentence from the text: "We were poor. We had no money.', answer: '"Poverty-stricken" means severely affected by poverty / extremely poor',
                  options: ['"Poverty-stricken" means severely affected by poverty / extremely poor', 'hungry', 'vocabulary in context'],
                  hint: 'Review Class 9 "Vocabulary in Context" (c9_engl_ch1_8) exercises on clue-type classification using.',
                  misconception: 'Students believe "vocabulary in context" means guessing any plausible meaning that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Isolate the target word\'s sentence and the two sentences before/after.', 'Highlight all punctuation marks (dashes, commas, semicolons) and conjunctions (and, but, or).', 'Label each highlighted element with its clue type (e.g., "comma + or = definition clue").', 'Write a one-sentence justification: "The word X means Y because [specific clue] shows Z." 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_011', difficulty: 'standard',
          question: 'Language and style in \'The Summer of the Beautiful White Horse\' — how the.',
          hint: 'Review Class 10 grammar: tenses (especially past perfect), reported speech, and sentence.',
          misconception: 'Students treat "grammar analysis" as labeling parts of speech (e.g., "Vazire is a noun, run is a verb").',
          parts: [
                { id: 'a', prompt: 'Rewrite the direct speech "Leap out of the window, he said, if you want to ride" into indirect speech, maintaining the original meaning and narrative tone.', answer: 'He told me to leap out of the window if I wanted to ride',
                  options: ['He told me to leap out of the window if I wanted to ride', 'told me', 'to infinitive', '(3) Adjust pronoun'],
                  hint: 'Review Class 10 grammar: tenses (especially past perfect), reported speech, and sentence variety.',
                  misconception: 'Students treat "grammar analysis" as labeling parts of speech (e.g., "Vazire is a noun, run is a verb").' }
          ],
            remediations: { 'students-treat-grammar-analysis-as': { steps: ['Have the student read paragraphs 3 and 4 aloud, marking natural pauses.', 'Ask: "Why \'had stolen\' here but \'stole\' later?" Guide them to see past perfect = earlier than narrative past.', 'Model one PEEL analysis: Point — Saroyan uses past perfect for Aram\'s realisation.', 'Evidence — "It was true, then.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Summer of the Beautiful White Horse\' — questions.',
          hint: 'Review "Evidence vs. Assumption" from c8_engl_ch3_10 — practice identifying which.',
          misconception: 'Students believe inferential questions ask for their *personal opinion* or *guesswork*.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What was the name of the farmer who visited Aram\'s house looking for his stolen horse?"', answer: '**Answer:** Literal',
                  options: ['**Answer:** Literal', 'not immediately remembered', 'not explicitly stated', 'inferential questions ask for their *personal opinion* or *guesswork*'],
                  hint: 'Review "Evidence vs. Assumption" from c8_engl_ch3_10 — practice identifying which statements in.',
                  misconception: 'Students believe inferential questions ask for their *personal opinion* or *guesswork*.' },
                { id: 'b', prompt: 'The text states: "We were poor. We had no money. Our whole tribe was poverty-stricken." Later, Aram says: "Maybe it wasn\'t stealing at all.', answer: '**Answer:** Aram rationalizes',
                  options: ['**Answer:** Aram rationalizes', 'because Mourad is crazy', 'because they\'re poor', 'inferential questions ask for their *personal opinion* or *guesswork*'],
                  hint: 'Review "Evidence vs. Assumption" from c8_engl_ch3_10 — practice identifying which statements in.',
                  misconception: 'Students believe inferential questions ask for their *personal opinion* or *guesswork*.' }
          ],
            remediations: { 'inferential-questions-ask-for-their': { steps: ['If a student cannot distinguish literal from inferential: 1.', 'Give them 5 questions from the chapter; have them highlight the exact sentence that answers each.', 'Questions where no single sentence exists are inferential.', 'For each inferential question, require them to complete this template: "The text says ______ and ______.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
