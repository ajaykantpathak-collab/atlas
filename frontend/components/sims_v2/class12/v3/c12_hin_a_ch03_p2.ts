import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p2: SimDef = {
    id: 'v3_c12_hin_a_ch03_p2',
    title: 'osQnkjukFk ¯lg · Part 2/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'osQnkjukFk ¯lg · Part 2/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_007', 'c12_hin_a_cbse_03_008', 'c12_hin_a_cbse_03_009', 'c12_hin_a_cbse_03_010', 'c12_hin_a_cbse_03_011', 'c12_hin_a_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subsidiary ideas, motifs, or concerns that run parallel to the primary theme in a literary work, enriching the text by adding layers of meaning, highlighting specific aspects.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and see a photo of a simple home-cooked meal — a plain roti on a plate — captioned "Moonlight on my dinner.',
            decisions: [{ prompt: 'In Varjk\'s poem "नहीं वोस्यक", the line "यह तू है अक्रक चरखा जिसे फिर भी कोई और नहीं चलाता" primarily supports which secondary theme?', options: [
                { text: 'Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और', outcome: 'Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और आत्मनिर्भरता).' },
                { text: 'industrial progress', outcome: 'Not quite — Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list.', reveals: 'students-often-confuse-secondary-theme' },
                { text: 'secondary theme', outcome: 'Not quite — Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list.', reveals: 'students-often-confuse-secondary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing on a terrace at dusk: the sky bruises purple, a cool wind carries the scent of rain, and a lone streetlamp flickers.',
            decisions: [{ prompt: 'Define "बिंब" (imagery) and "रूपक" (metaphor) in your own words, giving one example from daily Hindi usage for each (not from the textbook).', options: [
                { text: '**Correct answer:** बिंब = इंद्रियों को संबोधित करने वाला शब्द/वाक्यांश जो मानसिक चित्र', outcome: '**Correct answer:** बिंब = इंद्रियों को संबोधित करने वाला शब्द/वाक्यांश जो मानसिक चित्र बनाता है.' },
                { text: 'तवे पर रोटी की सोंधी गंध', outcome: 'Not quite — **"Metaphor is just a fancy word for \'comparison\'."** Students write: "कवि ने चाँद की तुलना आशा से.', reveals: 'metaphor-is-just-a-fancy' },
                { text: 'समय धन है', outcome: 'Not quite — **"Metaphor is just a fancy word for \'comparison\'."** Students write: "कवि ने चाँद की तुलना आशा से.', reveals: 'metaphor-is-just-a-fancy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you see a sign saying "Silence Please" in a library where everyone is shouting — that jarring mismatch is irony in real life.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from daily life for each (not from the poems).', options: [
                { text: 'Irony: A situation where the outcome is contrary to what was expected (e.g., a fire', outcome: 'Irony: A situation where the outcome is contrary to what was expected (e.g., a fire station burning.' },
                { text: 'sarcasm', outcome: 'Not quite — Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.', reveals: 'students-often-conflate-symbolism-with' },
                { text: 'metaphor', outcome: 'Not quite — Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.', reveals: 'students-often-conflate-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE board exam and see a question: "कवि ने \'नहीं\' शब्द को बार-बार क्यों दोहराया है?" Your first instinct might be to write.',
            decisions: [{ prompt: 'निम्नलिखित में से कौन-सा प्रश्न शाब्दिक (literal) बोध की श्रेणी में आता है?', options: [
                { text: 'Correct: (ख) — This asks for a directly countable fact from the text', outcome: 'Correct: (ख) — This asks for a directly countable fact from the text.' },
                { text: 'no right answer', outcome: 'Not quite — Students believe inferential questions have "no right answer" — they think any personal opinion.', reveals: 'inferential-questions-have-no-right' },
                { text: 'inferential questions have "no right answer"', outcome: 'Not quite — Students believe inferential questions have "no right answer" — they think any personal opinion.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'What comes next? osQnkjukFk ¯lg · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — osQnkjukFk ¯lg · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes are the subsidiary ideas, motifs, or concerns that run.',
          hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद".',
          misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like.',
          parts: [
                { id: 'a', prompt: 'In Varjk\'s poem "नहीं वोस्यक", the line "यह तू है अक्रक चरखा जिसे फिर भी कोई और नहीं चलाता" primarily supports which secondary theme?', answer: 'Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और',
                  options: ['Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और', 'industrial progress', 'secondary theme', 'subplot'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' },
                { id: 'b', prompt: 'Explain in your own words how the secondary theme of "beauty in the mundane" operates differently in the two poems: "नहीं वोस्यक" and "मैंने देखा, एक चाँद".', answer: 'Correct answer: In "नहीं वोस्यक", beauty in the mundane is argued intellectually',
                  options: ['Correct answer: In "नहीं वोस्यक", beauty in the mundane is argued intellectually', 'descriptions of poor people\'s lives', 'secondary theme', 'subplot'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' },
                { id: 'c', prompt: 'Compare the role of "transformation" in both poems. In "नहीं वोस्यक", what transforms? In "मैंने देखा, एक चाँद", what transforms?', answer: 'Correct answer: In "नहीं वोस्यक", *perception* transforms',
                  options: ['Correct answer: In "नहीं वोस्यक", *perception* transforms', 'both show poor things becoming beautiful', 'secondary theme', 'subplot'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If the student lists nouns instead of thematic statements: (1) Have them re-read the last stanza of "नहीं वोस्यक" and.', '(3) Practice converting 5 nouns from the poem into thematic statements.', '(4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student interpretation: "The secondary theme of \'मैंने देखा, एक चाँद\' is hunger because the roti represents food scarcity." Is this a valid.', answer: 'Correct answer: No, it is not a valid secondary theme',
                  options: ['Correct answer: No, it is not a valid secondary theme', 'secondary theme', 'subplot', 'minor topic mentioned once'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If the student lists nouns instead of thematic statements: (1) Have them re-read the last stanza of "नहीं वोस्यक" and.', '(3) Practice converting 5 nouns from the poem into thematic statements.', '(4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_008', difficulty: 'standard',
          question: 'Imagery (बिंब) refers to the use of vivid, sensory language that appeals to the.',
          hint: 'If stuck on tenor/vehicle identification: Revisit Class 11 node c11_hin_ar_cbse_03_008.',
          misconception: '**"Metaphor is just a fancy word for \'comparison\'."** Students write: "कवि ने चाँद की तुलना आशा से की है" (The poet.',
          parts: [
                { id: 'a', prompt: 'Apply the "sensory mapping" technique to the first stanza of "मैंने देखा, एक चाँद".', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'चाँद, पहाड़, हवा', 'visual'],
                  hint: 'If stuck on tenor/vehicle identification: Revisit Class 11 node c11_hin_ar_cbse_03_008, section.',
                  misconception: '**"Metaphor is just a fancy word for \'comparison\'."** Students write: "कवि ने चाँद की तुलना आशा से की है" (The poet compared the moon.' }
          ],
            remediations: { 'metaphor-is-just-a-fancy': { steps: ['**Revisit Class 11 node c11_hin_ar_cbse_03_008** (Literary Devices: Imagery and Metaphor) — specifically the "तुलना.', 'Re-do the exercise converting 5 similes into metaphors (e.g., "वह शेर जैसा बहादुर है" → "वह शेर है").', '**Sensory Drill:** Take a mundane object (e.g., a cold cup of tea).', 'Write 5 lines, each invoking a *different* sense, *without* naming the object.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_009', difficulty: 'standard',
          question: 'Irony (व्यंग्य/विडंबना) is a literary device where the intended meaning.',
          hint: 'If stuck, review "Symbol vs Metaphor" distinction in c12_hin_a_cbse_03_008 and practice.',
          misconception: 'Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.',
          parts: [
                { id: 'a', prompt: 'Identify one symbol in "मैंने देखा, एक चाँद" and explain how the poet develops its symbolic meaning across the poem.', answer: 'The moon (चाँद) functions as a symbol of fragile freedom',
                  options: ['The moon (चाँद) functions as a symbol of fragile freedom', 'moon = beauty'],
                  hint: 'If stuck, review "Symbol vs Metaphor" distinction in c12_hin_a_cbse_03_008 and practice annotating.',
                  misconception: 'Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.' }
          ],
            remediations: { 'students-often-conflate-symbolism-with': { steps: ['Revisit node c12_hin_a_cbse_03_008 (Imagery and Metaphor) to sharpen the distinction: metaphor = explicit comparison.', 'Re-read "नहीं वोस्यक" marking every occurrence of "नहीं" and "यह" — trace how the poem builds an expectation then.', 'For symbolism, list all concrete nouns in "मैंने देखा, एक चाँद" (चाँद, फूल, पवन, तेल, गंध) and write the abstract idea.', 'Re-diagnostic: Write one PEEL paragraph analyzing the irony in the title "नहीं वोस्यक" using the structure: Point →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, revisit Class 11 Antra Chapter 1 Vocabulary node (c11_hin_ar_cbse_01_010) and.',
          misconception: 'Students memorize the NCERT glossary meanings as fixed definitions and apply them mechanically in all contexts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning of words as',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning of words as', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and narrative structure in poetry refers to the deliberate organization of images,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck, revisit Class 11 Antra Chapter 1 Vocabulary node (c11_hin_ar_cbse_01_010) and practice.',
                  misconception: 'Students memorize the NCERT glossary meanings as fixed definitions and apply them mechanically in all contexts.' }
          ],
            remediations: { 'students-memorize-the-ncert-glossary': { steps: ['Have the student pick 3 words they got wrong.', 'For each, re-read the specific stanza aloud.', 'Ask: \'What is happening in the image right before and after this word?\' 4.', 'Have them write the glossary meaning, then write a second \'poetic meaning\' sentence starting with \'In this line, the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck on samAs vigraha or karak assignment, review Class 11 Chapter 3 grammar.',
          misconception: 'Students treat "Language Usage" as **vocabulary listing** (defining "izÑr", "Lo;aHkw", "v;qr%") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic analysis of grammatical structures,',
                  options: ['Language Usage in the Text refers to the systematic analysis of grammatical structures,', '"Before You Read: Context and Background" is a preparatory literary skill where students', 'Plot and narrative structure in poetry refers to the deliberate organization of images,', 'Setting in poetry refers to the time, place, and physical environment where the poem\'s'],
                  hint: 'If stuck on samAs vigraha or karak assignment, review Class 11 Chapter 3 grammar exercises.',
                  misconception: 'Students treat "Language Usage" as **vocabulary listing** (defining "izÑr", "Lo;aHkw", "v;qr%") rather than **grammatical analysis**.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['**Revisit Class 11 Grammar Node**: Go to `c11_hin_ar_cbse_03_011` (or any Chapter 3 grammar node) and re-do the.', '**Mini-drill**: Take 5 lines from "nhi vosQyk", parse every verb (mood, tense, person), every compound (samAs type).', '**Re-diagnostic**: Answer Diagnostic Question 2 and 4 again *without notes*.', 'If you still paraphrase instead of analyzing grammatical function, repeat step 2 with a peer — teach them the parsing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension refers to understanding information explicitly stated.',
          hint: 'If stuck, review "Text: Plot and Narrative Structure" (c12_hin_a_cbse_03_002) to practice.',
          misconception: 'Students believe inferential questions have "no right answer" — they think any personal opinion counts.',
          parts: [
                { id: 'a', prompt: 'निम्नलिखित में से कौन-सा प्रश्न शाब्दिक (literal) बोध की श्रेणी में आता है? (क) कवि ने \'नहीं\' शब्द की पुनरावृत्ति से क्या प्रभाव उत्पन्न किया है?', answer: 'Correct: (ख) — This asks for a directly countable fact from the text',
                  options: ['Correct: (ख) — This asks for a directly countable fact from the text', 'no right answer', 'inferential questions have "no right answer"'],
                  hint: 'If stuck, review "Text: Plot and Narrative Structure" (c12_hin_a_cbse_03_002) to practice locating.',
                  misconception: 'Students believe inferential questions have "no right answer" — they think any personal opinion counts.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Give the student a 4-line unseen poem.', 'Ask them to write one literal question and one inferential question *with answers*.', 'For the inferential answer, demand: "Which exact word/line made you think this?"', 'If they cannot point to text, return to c11_hin_ar_cbse_01_012 (Class 11 Antra Comprehension) and practice the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
