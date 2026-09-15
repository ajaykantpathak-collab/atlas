import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch04_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch04_p2',
    title: 'f\'k{kk · Part 2/3',
    subtitle: 'Read a bureaucratic \'order\' as parody — and a soldier\'s letter as an accusation.',
    classLevel: 11, subject: 'hin_ar', topic: 'f\'k{kk · Part 2/3',
    chapters: ['c11_hin_ar_ch04'],
    nodeIds: ['c11_hin_ar_cbse_04_007', 'c11_hin_ar_cbse_04_008', 'c11_hin_ar_cbse_04_009', 'c11_hin_ar_cbse_04_010', 'c11_hin_ar_cbse_04_011', 'c11_hin_ar_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader unmasking a ridiculous official letter', intro: 'A letter reaches the king from his own soldier — part chronicle of past glory, part folk tale, part indictment.', goal: 'Decode Guleri\'s linguistic satire and analyse the letter\'s fragmented narrative structure.' },
    discovery: {
        question: 'A British officer\'s order arrives dressed in legal English, dead Sanskrit and bazaar Hindi — is the absurdity just clumsy writing?',
        options: ['No — the linguistic mess is the satire: colonial authority is shown as performance, not competence', 'Yes — the officer simply couldn\'t write Hindi', 'No — it\'s actually a translation error by the editor', 'Yes — satire requires elegant language'],
        answer: 'No — the linguistic mess is the satire: colonial authority is shown as performance, not competence',
        hook: 'Guleri edited a paper through the 1899 famine that killed crores while grain was exported — the mock-bureaucratic \'order\' is a weapon, not a joke.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement and enrich the primary theme, often exploring specific social, psychological, historical, or moral dimensions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a soldier\'s letter into its blocks — past glory, present misery, the snake-and-two-women folktale — and ask what the broken structure does to the ruler reading it.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a political cartoon where a giant bulldozer labeled "British Law" crushes a tiny hut labeled "Indian Rights" — you instantly *see* the.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from everyday language (not from the textbook).', options: [
                { text: 'Imagery: language that creates sensory experiences (e.g., "The sizzling sound of pakoras', outcome: 'Imagery: language that creates sensory experiences (e.g., "The sizzling sound of pakoras hitting.' },
                { text: 'description', outcome: 'Not quite — Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is.', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'comparison using like/as', outcome: 'Not quite — Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is.', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine a friend who says "Oh, wonderful weather!" while standing in a thunderstorm soaking wet — you instantly know they mean the opposite of the literal.',
            decisions: [{ prompt: 'Define verbal irony, situational irony, and dramatic irony in your own words, giving one everyday example of each (not from the textbook).', options: [
                { text: 'Verbal irony: a speaker says the opposite of what they mean (e.g., "What a brilliant', outcome: 'Verbal irony: a speaker says the opposite of what they mean (e.g., "What a brilliant idea!" when.' },
                { text: 'something unexpected happens', outcome: 'Not quite — Students treat irony and symbolism as *labeling exercises* — they identify "here is irony" and.', reveals: 'students-treat-irony-and-symbolism' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the opening paragraph where फकीरचंद\'s "फटे जूते" are described not with pity but with a strange pride.',
            decisions: [{ prompt: 'Define "Vocabulary in Context" and give one example from Chapter 4 where the contextual meaning of a word differs from its dictionary.', options: [
                { text: 'Vocabulary in Context means deriving word meaning from textual clues (surrounding', outcome: 'Vocabulary in Context means deriving word meaning from textual clues (surrounding sentences, tone.' },
                { text: 'it means old shoes', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from nearby words" — so they look.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from nearby words" — so they look.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a text where an Indian narrator sarcastically addresses an Englishman as "एब यकडबल्यूएमज़ेड" (Mr.',
            decisions: [{ prompt: 'What is the meaning of the word "इक्ज़िट" (exit) as used in the context of the chapter\'s language exercise, and from which language is.', options: [
                { text: 'The word "इक्ज़िट" means "निकास" or "बाहर जाने का रास्ता" and is borrowed from English', outcome: 'The word "इक्ज़िट" means "निकास" or "बाहर जाने का रास्ता" and is borrowed from English.' },
                { text: 'language usage', outcome: 'Not quite — Students often think "language usage" only means identifying parts of speech (noun, verb).', reveals: 'language-usage-only-means-identifying' },
                { text: 'it\'s a Sanskrit word', outcome: 'Not quite — Students often think "language usage" only means identifying parts of speech (noun, verb).', reveals: 'language-usage-only-means-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re in the exam hall staring at a question: "लेखक ने मिस्टर यंग को \'एक वकील\' क्यों कहा?" You panic because the text never explicitly says "he is.',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is explicitly stated in the text (e.g., "What year did Mr', outcome: 'A literal question\'s answer is explicitly stated in the text (e.g., "What year did Mr.' },
                { text: 'Inferential questions are just opinions', outcome: 'Not quite — Students believe inferential questions have "no right answer" or that "any interpretation is valid.', reveals: 'inferential-questions-have-no-right' },
                { text: 'no right answer', outcome: 'Not quite — Students believe inferential questions have "no right answer" or that "any interpretation is valid.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a satire-writing workshop you take Guleri\'s sketch — a soldier\'s letter to his ruler mixing Sanskrit, Persian officialese and folk tale. A participant says: \'The mixed language is sloppy writing, and the snake-and-two-women folk tale is a pointless digression from the letter\'s complaint.\'',
            decisions: [{ prompt: 'How do you defend the text\'s design?', options: [
                { text: 'Decode the hybridity: the officer\'s mangled officialese (vakil, daftar, hukm) parodies the Persianised bureaucratic register — colonial power as performative language — while the elder sister\'s brave Sanskritised speech vs the younger\'s fearful fragments allegorise indigenous tradition vs colonised psyche. And the folk tale isn\'t digression: it\'s a parallel symbolic sub-plot doing the work of satire and allegory inside the letter form.', outcome: 'The workshop sees context as decoder: Guleri\'s famine-era journalism weaponised language — every register switch and the embedded tale are the critique.' },
                { text: 'Agree the language is sloppy — clean it into uniform modern Hindi for the exercise.', outcome: 'Uniforming the register erases the satire: the collision of Sanskrit, Persian and colloquial speech is precisely how colonial authority gets mocked.', reveals: 'hybrid-language-is-sloppy' },
                { text: 'Cut the folk tale — a letter should stick to its complaint.', outcome: 'The sub-plot carries the allegorical weight: it mirrors and sharpens the main letter\'s charge, so cutting it removes the satire\'s core.', reveals: 'folk-tale-is-digression' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'Two sisters face the same officer — one answers in courage and Sanskritised rebuke, one in fear; both are true, and that refusal of a clean binary is the honesty.',
            decisions: [{ prompt: 'What comes next? f\'k{kk · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — f\'k{kk · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'If stuck, review the distinction between \'topic\' (colonialism) and \'theme\' (colonialism.',
          misconception: 'Students often treat every recurring topic (e.g., "British officers", "Indian poverty") as a secondary theme.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying, supporting ideas in a literary work that complement',
                  options: ['Secondary themes are the underlying, supporting ideas in a literary work that complement', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Setting refers to the time, place, and historical context in'],
                  hint: 'If stuck, review the distinction between \'topic\' (colonialism) and \'theme\' (colonialism is morally.',
                  misconception: 'Students often treat every recurring topic (e.g., "British officers", "Indian poverty") as a secondary theme.' }
          ],
            remediations: { 'students-often-treat-every-recurring': { steps: ['Give the student a two-column table: Column A lists recurring motifs (e.g., "officer\'s uniform", "historical names".', 'Ask them to write in Column B: "What idea about colonialism does this motif *prove*?" 3.', 'Model one: Motif = "officer quotes British law" → Idea = "colonialism uses law as a shield".', 'Have them complete three more, then convert each Column B entry into a thematic statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_008', difficulty: 'standard',
          question: 'Imagery (बिंब/प्रतिबिंब) is the use of vivid, sensory language that appeals.',
          hint: 'Review the "Before You Read" context (node 001) and the "Plot and Narrative Structure".',
          misconception: 'Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is a visual image," "Here is.',
          parts: [
                { id: 'a', prompt: 'In the passage describing the "huge bulldozer" (vnuk DyoZQ), the narrator writes: "its roar cutting through the air with great speed." Identify the *two*.', answer: 'Auditory image: "roar" (sound of machinery/violence)',
                  options: ['Auditory image: "roar" (sound of machinery/violence)', 'or only'],
                  hint: 'Review the "Before You Read" context (node 001) and the "Plot and Narrative Structure" analysis.',
                  misconception: 'Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is a visual image," "Here is a metaphor") rather.' },
                { id: 'b', prompt: 'The narrator states: "Your and your queen\'s laundry used to be washed in the tears of great kings and their mothers\' milk." Identify the *tenor* (target).', answer: 'Tenor: British exploitation of India\'s resources and dignity',
                  options: ['Tenor: British exploitation of India\'s resources and dignity', 'sadness'],
                  hint: 'Review the "Before You Read" context (node 001) and the "Plot and Narrative Structure" analysis.',
                  misconception: 'Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is a visual image," "Here is a metaphor") rather.' },
                { id: 'c', prompt: 'Compare the *visual imagery* of "the tears of great kings" with the *tactile imagery* of "mothers\' milk" in the same metaphor.', answer: '"Tears of great kings"',
                  options: ['"Tears of great kings"', 'sad images'],
                  hint: 'Review the "Before You Read" context (node 001) and the "Plot and Narrative Structure" analysis.',
                  misconception: 'Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is a visual image," "Here is a metaphor") rather.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Return to the "laundry" metaphor. Ask the student: "List every word in the vehicle domain (laundry, wash, tears, milk).', 'Have the student draw a two-column map: Vehicle Attributes → Transferred to Tenor.', 'Ask: "If the metaphor were \'British rule is a butcher cutting meat,\' how would the critique change?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is a visual image," "Here is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The extended metaphor of the \'two eyes of the phantom\' (f\'ko\'kaHkq osQ nks xk;sa) is more effective than the \'bulldozer\' imagery because.', answer: 'Refute',
                  options: ['Refute', 'better', 'device-spotting'],
                  hint: 'Review the "Before You Read" context (node 001) and the "Plot and Narrative Structure" analysis.',
                  misconception: 'Students treat imagery and metaphor as *decorative labels* to be hunted and named ("Here is a visual image," "Here is a metaphor") rather.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Return to the "laundry" metaphor. Ask the student: "List every word in the vehicle domain (laundry, wash, tears, milk).', 'Have the student draw a two-column map: Vehicle Attributes → Transferred to Tenor.', 'Ask: "If the metaphor were \'British rule is a butcher cutting meat,\' how would the critique change?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_009', difficulty: 'standard',
          question: 'Irony (व्यंग्य) is a literary device in which the intended meaning of.',
          hint: 'If the student cannot identify the irony in the narrator\'s praise of Curzon, return.',
          misconception: 'Students treat irony and symbolism as *labeling exercises* — they identify "here is irony" and "here is a symbol" and.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the narrator addresses Lord Curzon with elaborate courtesy and formal respect, calling him a great administrator and reformer.', answer: 'This is verbal irony operating at the level of sustained address',
                  options: ['This is verbal irony operating at the level of sustained address', 'sarcasm', 'dramatic irony'],
                  hint: 'If the student cannot identify the irony in the narrator\'s praise of Curzon, return to node 003.',
                  misconception: 'Students treat irony and symbolism as *labeling exercises* — they identify "here is irony" and "here is a symbol" and stop, as if the goal.' },
                { id: 'b', prompt: 'The narrator describes the British legal system as having "long arms" that "only pick the pockets of the poor." Identify the symbol embedded here and explain.', answer: 'The symbol is the "long arms of the law"',
                  options: ['The symbol is the "long arms of the law"', 'picking pockets'],
                  hint: 'If the student cannot identify the irony in the narrator\'s praise of Curzon, return to node 003.',
                  misconception: 'Students treat irony and symbolism as *labeling exercises* — they identify "here is irony" and "here is a symbol" and stop, as if the goal.' },
                { id: 'c', prompt: 'Compare the irony in the narrator\'s praise of Curzon\'s "reforms" with the situational irony of the narrator\'s return to India finding "the same" conditions.', answer: 'The verbal irony of praising Curzon\'s "reforms" targets colonial *rhetoric*',
                  options: ['The verbal irony of praising Curzon\'s "reforms" targets colonial *rhetoric*', 'just irony'],
                  hint: 'If the student cannot identify the irony in the narrator\'s praise of Curzon, return to node 003.',
                  misconception: 'Students treat irony and symbolism as *labeling exercises* — they identify "here is irony" and "here is a symbol" and stop, as if the goal.' }
          ],
            remediations: { 'students-treat-irony-and-symbolism': { steps: ['Return to the narrator\'s address to Curzon. Ask the student to read the first three paragraphs aloud, marking every.', 'Have the student draw a two-column table: Column A = "What the narrator says (surface)," Column B = "What the narrator.', 'For symbolism, ask the student to pick one concrete object from the chapter (e.g., the bulldozer, the phantom, the.', 'Ask the student to rewrite one paragraph of the chapter *without* irony — stating the criticism directly.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning of words.',
          hint: 'If stuck, review "Before You Read" (node 001) section on "Historical Background: 1903.',
          misconception: 'Students believe "vocabulary in context" means "guess the meaning from nearby words" — so they look only at the.',
          parts: [
                { id: 'a', prompt: 'In the sentence "वायसराय के सामने फकीरचंद के फटे जूते एक चुनौती थे", explain why "चुनौती" (challenge) is used instead of "शर्म" (shame) or "गरीबी" (poverty).', answer: '"चुनौती" reframes poverty as resistance',
                  options: ['"चुनौती" reframes poverty as resistance', 'चुनौती means difficulty', 'vocabulary in context', 'guess the meaning from nearby words'],
                  hint: 'If stuck, review "Before You Read" (node 001) section on "Historical Background: 1903 Delhi Durbar.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from nearby words" — so they look only at the immediate sentence.' },
                { id: 'b', prompt: 'The text references "नेपोलियन" and "वेलिंगटन" when describing फकीरचंद\'s walk.', answer: 'Strategy: Locate the reference (Para 3: "नेपोलियन और वेलिंगटन के जूते भी...")',
                  options: ['Strategy: Locate the reference (Para 3: "नेपोलियन और वेलिंगटन के जूते भी...")', 'author compares him to great men', 'vocabulary in context', 'guess the meaning from nearby words'],
                  hint: 'If stuck, review "Before You Read" (node 001) section on "Historical Background: 1903 Delhi Durbar.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from nearby words" — so they look only at the immediate sentence.' },
                { id: 'c', prompt: 'Analyze how the word "व्यंग्य" (satire/irony) functions as a *master key* for unlocking the contextual meanings of at least three other key words in the.', answer: '"व्यंग्य" signals that *all* key words operate in inversion mode: (1) फकीरचंद',
                  options: ['"व्यंग्य" signals that *all* key words operate in inversion mode: (1) फकीरचंद', 'व्यंग्य', 'vocabulary in context', 'guess the meaning from nearby words'],
                  hint: 'If stuck, review "Before You Read" (node 001) section on "Historical Background: 1903 Delhi Durbar.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from nearby words" — so they look only at the immediate sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['**Re-read with "Satire Lens" on**: Tell the student: "Assume every noun is a metaphor.', 'Re-read Para 1-5 asking: \'What is this object *really* doing in the story?\'" 2.', '**Map the Power Flip**: Draw a two-column table: Column A = British words (वायसराय, लॉर्ड, दरबार, जूते-पॉलिश), Column.', 'For each pair, find the sentence where Column B defeats Column A.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the analysis of specific.',
          hint: 'Review the "शब्द-निर्माण" and "भाषा-परिवार" concepts from Class 9-10 Hindi grammar.',
          misconception: 'Students often think "language usage" only means identifying parts of speech (noun, verb) or correcting grammar errors.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the analysis of specific grammatical',
                  options: ['Grammar: Language Usage in the Text refers to the analysis of specific grammatical', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Setting refers to the time, place, and historical context in'],
                  hint: 'Review the "शब्द-निर्माण" and "भाषा-परिवार" concepts from Class 9-10 Hindi grammar.',
                  misconception: 'Students often think "language usage" only means identifying parts of speech (noun, verb) or correcting grammar errors.' }
          ],
            remediations: { 'language-usage-only-means-identifying': { steps: ['List each word\'s language origin (वकील - Arabic, न्यायालय - Sanskrit, बहस - Persian).', 'Ask why the author might choose this mix in a colonial court scene.', 'Convert to Sanskritized Hindi and discuss the shift in tone.', 'Connect to the chapter\'s theme of linguistic imposition. Repeat with two more sentences until they see grammar as.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'Re-read the chapter with a highlighter: mark every proper noun, number, and law named.',
          misconception: 'Students believe inferential questions have "no right answer" or that "any interpretation is valid if you explain it.".',
          parts: [
                { id: 'a', prompt: 'In the chapter, the narrator says: "आपके देश के कानून तो बड़े न्यायप्रिय हैं।" Is the question "What is the narrator\'s attitude toward British law?" literal.', answer: 'It is inferential',
                  options: ['It is inferential', 'literal, because the word \'न्यायप्रिय\' is in the text', 'no right answer', 'inferential'],
                  hint: 'Re-read the chapter with a highlighter: mark every proper noun, number, and law named (literal.',
                  misconception: 'Students believe inferential questions have "no right answer" or that "any interpretation is valid if you explain it." In Class 11 board.' },
                { id: 'b', prompt: 'Given the passage: "अंग्रेज़ी राज में... कानून का राज था।" A question asks: "List two specific laws mentioned by the narrator that exploited Indians.".', answer: 'Step 1: Scan for keywords "कानून", "नियम", "लगान"',
                  options: ['Step 1: Scan for keywords "कानून", "नियम", "लगान"', 'The British made unfair laws', 'no right answer', 'inferential'],
                  hint: 'Re-read the chapter with a highlighter: mark every proper noun, number, and law named (literal.',
                  misconception: 'Students believe inferential questions have "no right answer" or that "any interpretation is valid if you explain it." In Class 11 board.' },
                { id: 'c', prompt: 'The narrator describes Mr. Young: "आपके शासन में... एक वकील का बेटा वकील बनता है।" Compare the literal meaning of this statement with its inferential.', answer: 'Literal: The narrator states a factual pattern',
                  options: ['Literal: The narrator states a factual pattern', 'no right answer', 'inferential', 'personal opinion'],
                  hint: 'Re-read the chapter with a highlighter: mark every proper noun, number, and law named (literal.',
                  misconception: 'Students believe inferential questions have "no right answer" or that "any interpretation is valid if you explain it." In Class 11 board.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Give the student a 3-column table: Question | Type (L/I) | Evidence Location.', 'Practice with 5 questions from the chapter: two literal (e.g., "What post did Mr.', 'Young hold?"), three inferential (e.g., "Why does the narrator mention the 1857 rebellion?").', 'For each inferential, force the student to write: "The text says _____, which implies _____ because _____." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
