import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch12_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch12_p2',
    title: 'Q.kh\'oj ukFk js.kq · Part 2/3',
    subtitle: 'Follow a village postman who delivers an argument instead of a letter.',
    classLevel: 11, subject: 'hin_ar', topic: 'Q.kh\'oj ukFk js.kq · Part 2/3',
    chapters: ['c11_hin_ar_ch12'],
    nodeIds: ['c11_hin_ar_cbse_12_007', 'c11_hin_ar_cbse_12_008', 'c11_hin_ar_cbse_12_009', 'c11_hin_ar_cbse_12_010', 'c11_hin_ar_cbse_12_011', 'c11_hin_ar_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a villager deciding whether \'पढ़ ले\' is an order or an invitation', intro: 'A postman calls at the door and finds the letters useless to the woman inside — so he tries to hand her the alphabet itself.', goal: 'Read the poem as a narrative of persuasion and evaluate its open, imperative ending.' },
    discovery: {
        question: 'A postman urges an illiterate villager to learn letters; the poem ends on \'पढ़ ले!\' — does the villager learn to read by the end?',
        options: ['No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader', 'Yes — she reads her letter in the final stanza', 'Yes — literacy is achieved by stanza six', 'No — the postman gives up instead'],
        answer: 'No — the resolution is aspirational: it ends on an imperative, not an achievement, handing the mission to the reader',
        hook: 'Agyeya the linguist wrote in the people\'s dialect on purpose — the poem isn\'t about letters, it\'s about reclaiming agency.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, supporting ideas in a literary work that complement and enrich the primary theme by exploring related social, psychological, or philosophical dimensions through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the postman\'s arrival to the command \'पढ़ ले!\' as a narrative arc, then argue whether a revolutionary poet\'s literacy poem can be called propaganda.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are describing a monsoon evening to a friend who has never experienced one — you would not just say "it rained"; you would say "the smell of wet.',
            decisions: [{ prompt: 'Define "imagery" (बिंब) and "metaphor" (रूपक) in your own words, and give one original example of each that is NOT from the textbook.', options: [
                { text: 'Imagery: Language that activates the five senses to create a concrete mental picture', outcome: 'Imagery: Language that activates the five senses to create a concrete mental picture (e.g., "The.' },
                { text: 'Her silence was like a locked room', outcome: 'Not quite — Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as.', reveals: 'students-consistently-treat-repetition-of' },
                { text: 'absence of comparative particles', outcome: 'Not quite — Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as.', reveals: 'students-consistently-treat-repetition-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are waiting for an important exam result letter, but the postman hands it to you with a smile and says, "I don\'t know what it says, but it looks.',
            decisions: [{ prompt: 'What is the central situational irony in the poem regarding the postman\'s profession and his personal ability?', options: [
                { text: 'The central situational irony is that the postman\'s profession revolves around delivering', outcome: 'The central situational irony is that the postman\'s profession revolves around delivering letters.' },
                { text: 'the postman is lazy', outcome: 'Not quite — Students often confuse the postman\'s illiteracy with simple character tragedy, missing that Renu.', reveals: 'students-often-confuse-the-postman' },
                { text: 'the letters are heavy', outcome: 'Not quite — Students often confuse the postman\'s illiteracy with simple character tragedy, missing that Renu.', reveals: 'students-often-confuse-the-postman' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp message from a friend saying "This exam was a *piece of cake*." If you look up *piece* and *cake* in a dictionary.',
            decisions: [{ prompt: 'What is the textbook meaning provided for the word **phUgrh** in the *kCn&Nfo* section of this chapter?', options: [
                { text: 'The textbook defines **phUgrh** as **igpkurh** (reading/studying)', outcome: 'The textbook defines **phUgrh** as **igpkurh** (reading/studying).' },
                { text: 'writing', outcome: 'Not quite — Students treat the *kCn&Nfo* list as a **memorization list for translation exams** (Hindi ->.', reveals: 'students-treat-the-kcn-nfo' },
                { text: 'speaking', outcome: 'Not quite — Students treat the *kCn&Nfo* list as a **memorization list for translation exams** (Hindi ->.', reveals: 'students-treat-the-kcn-nfo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Have you ever noticed how your grandmother\'s Hindi differs from your textbook Hindi?',
            decisions: [{ prompt: 'What is meant by \'language usage\' in the context of a literary text?', options: [
                { text: 'Language usage refers to the writer\'s deliberate choices in words, sentence structures,', outcome: 'Language usage refers to the writer\'s deliberate choices in words, sentence structures, and.' },
                { text: 'it means the language of the text', outcome: 'Not quite — Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than.', reveals: 'non-standard-grammar-in-literature' },
                { text: 'incorrect', outcome: 'Not quite — Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than.', reveals: 'non-standard-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp message from a friend: "I\'m fine, don\'t worry." Literally, the words say they are okay, but you infer they might be upset.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What does', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What does the mother.' },
                { text: 'inference', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal guess.', reveals: 'students-often-treat-inferential-questions' },
                { text: 'imagination', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" where any personal guess.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is adapting Agyeya\'s poem — a postman urging an illiterate villager to read — for a street play. The adapter wants to add a narrator to \'explain the poet\'s sadness about illiteracy\' and soften the postman\'s command \'पढ़ ले!\' into polite persuasion.',
            decisions: [{ prompt: 'Why do both changes miss the poem\'s design?', options: [
                { text: 'Keep it narrative and keep the force: this isn\'t a lyric about sadness — it\'s a performed confrontation carried entirely in dialogue, no narrator needed. The structure runs exposition (postman\'s arrival) through rising action (the villager\'s shame, the persuasion) to the climax \'पढ़ ले!\' and resolves in a vision of empowerment. Softening the command defuses the turning point — and context sharpens it: an experimentalist poet in the literacy-campaign era making language itself a tool of liberation.', outcome: 'The play preserves the poem\'s engine: dialogue as structure, the command as climax — oral culture crossing into literacy onstage.' },
                { text: 'Add the narrator — an audience needs someone to state the theme clearly.', outcome: 'The poem deliberately works without narration: the two voices carry the whole arc, and a narrator converts performance into summary.', reveals: 'narrator-needed-for-theme' },
                { text: 'Soften the command — \'please try reading\' is kinder and more realistic persuasion.', outcome: 'The imperative is the climax — the moment agency is handed over; softening it turns a demand for liberation into a suggestion.', reveals: 'soften-the-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'The poem never shows her reading — the last word is a command left open, because the literacy it imagines was still unfinished business.',
            decisions: [{ prompt: 'What comes next? Q.kh\'oj ukFk js.kq · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Q.kh\'oj ukFk js.kq · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, supporting ideas in a literary work that.',
          hint: 'यदि अटका हुआ महसूस हो, तो c11_hin_ar_cbse_12_002 (Plot and Narrative Structure) पर लौटकर.',
          misconception: '**भ्रांति: "द्वितीयक विषय प्राथमिक विषय के \'उप-विषय\' (sub-themes) होते हैं, इसलिए वे कम महत्वपूर्ण हैं और परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying, supporting ideas in a literary work that complement',
                  options: ['Secondary themes are the underlying, supporting ideas in a literary work that complement', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop'],
                  hint: 'यदि अटका हुआ महसूस हो, तो c11_hin_ar_cbse_12_002 (Plot and Narrative Structure) पर लौटकर कविता की.',
                  misconception: '**भ्रांति: "द्वितीयक विषय प्राथमिक विषय के \'उप-विषय\' (sub-themes) होते हैं, इसलिए वे कम महत्वपूर्ण हैं और परीक्षा में कम पूछे जाते हैं।"**.' }
          ],
            remediations: { 'sub-themes': { steps: ['**चरण 1:** छात्र से कहें: "कविता को तीन बार पढ़ो — पहली बार: कथानक के लिए, दूसरी बार: संबंधों (पत्नी, पुत्र, पिता) के.', '**चरण 2:** तीन स्तंभ बनाओ: (क) प्राथमिक विषय के साक्ष्य, (ख) संबंध-आधारित साक्ष्य, (ग) समय/शरीर-आधारित साक्ष्य। (ख) और.', '**चरण 3:** प्रत्येक द्वितीयक विषय के लिए एक वाक्य में लिखो: "यह विषय प्राथमिक विषय को कैसे *जटिल* (complicate) या.', '**चरण 4:** पिछले वर्ष के बोर्ड प्रश्नपत्रों से दो प्रश्न ढूँढ़ो जो द्वितीयक विषय पर हों (जैसे 2023: "पाथिक की पत्नी के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_008', difficulty: 'standard',
          question: 'Imagery (बिंब/प्रतीक) refers to the use of vivid, sensory language that creates.',
          hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
          misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because.',
          parts: [
                { id: 'a', prompt: 'In the poem, the phrase "डक्यस डक्यस" (dark dark) appears repeatedly. Is this primarily an auditory image, a visual image, or a metaphor?', answer: '"डक्यस डक्यस" is primarily a **visual image** (दृश्य बिंब)',
                  options: ['"डक्यस डक्यस" is primarily a **visual image** (दृश्य बिंब)', 'डक्यस डक्यस', 'the poet repeats it so it must stand for something else'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' },
                { id: 'b', prompt: 'The poem contains the line: "पैक लूँज ध यम्ढ गे" (Paik is the threshold\'s Yama).', answer: 'Tenor (उपमेय) = Paik',
                  options: ['Tenor (उपमेय) = Paik', 'Yama means death, so Paik brings death', 'threshold guardian', 'डक्यस डक्यस'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' },
                { id: 'c', prompt: 'Compare the tactile imagery in "बुढ़ हक्क न्कोकोन्ह :ेक्फुर् ल्स् एक्द्र ग्स र्फ्क्क म्ल्दक ब्क्व ब्स्ब क्को ध त्केउ् ल्स् त्क्म्क ग्क्व्क" (Old language.', answer: 'The tactile image (dry roti sticking) conveys **resistance and discomfort**',
                  options: ['The tactile image (dry roti sticking) conveys **resistance and discomfort**', 'डक्यस डक्यस', 'the poet repeats it so it must stand for something else'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' }
          ],
            remediations: { 'students-consistently-treat-repetition-of': { steps: ['**Isolate the device**: Give the student two stripped sentences — "The night was dark dark dark" (repetition + visual.', '"The night was a black blanket" (metaphor).', 'Ask: "Which one *says* A *is* B?" 2.', '**Map the senses**: Have the student draw a 5-column table (Sight, Sound, Smell, Touch, Taste) and place every.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because.',
          parts: [
                { id: 'a', prompt: 'Critique the following student interpretation: "The metaphor \'पैक वीएनह गे\' (Paik is a bird) means she is free and happy." Is this reading adequate?', answer: 'The reading is **inadequate**',
                  options: ['The reading is **inadequate**', 'डक्यस डक्यस', 'the poet repeats it so it must stand for something else'],
                  hint: 'If stuck, review the **Theme: Primary Theme and Message (c11_hin_ar_cbse_12_006)** node.',
                  misconception: 'Students consistently treat **repetition of a descriptive word** (e.g., "डक्यस डक्यस") as a metaphor simply because it is repeated, arguing.' }
          ],
            remediations: { 'students-consistently-treat-repetition-of': { steps: ['**Isolate the device**: Give the student two stripped sentences — "The night was dark dark dark" (repetition + visual.', '"The night was a black blanket" (metaphor).', 'Ask: "Which one *says* A *is* B?" 2.', '**Map the senses**: Have the student draw a 5-column table (Sight, Sound, Smell, Touch, Taste) and place every.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_009', difficulty: 'standard',
          question: 'Irony in this poem is the contrast between the postman\'s role as a deliverer.',
          hint: 'If stuck, review the "metaphor vs. symbol" distinction in c11_hin_ar_cbse_12_008:.',
          misconception: 'Students often confuse the postman\'s illiteracy with simple character tragedy, missing that Renu constructs it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony in this poem is the contrast between the postman\'s role as a deliverer of written',
                  options: ['Irony in this poem is the contrast between the postman\'s role as a deliverer of written', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop'],
                  hint: 'If stuck, review the "metaphor vs. symbol" distinction in c11_hin_ar_cbse_12_008: a metaphor.',
                  misconception: 'Students often confuse the postman\'s illiteracy with simple character tragedy, missing that Renu constructs it as systemic irony: the.' }
          ],
            remediations: { 'students-often-confuse-the-postman': { steps: ['Have the student list every occurrence of "पत्र", "पढ़ना", "डाकिया" in the poem with line references.', 'For each, ask: "Is this literal or does it stand for something bigger?" 3.', 'Create a two-column table: "What the postman says/does" vs.', '"What the reader knows is true" — this visualizes dramatic irony.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, re-read the **\'Before You Read\' (node 001)** section on Fakir Mohan Senapati\'s.',
          misconception: 'Students treat the *kCn&Nfo* list as a **memorization list for translation exams** (Hindi -> English meaning).',
          parts: [
                { id: 'a', prompt: 'What is the textbook meaning provided for the word **phUgrh** in the *kCn&Nfo* section of this chapter?', answer: 'The textbook defines **phUgrh** as **igpkurh** (reading/studying)',
                  options: ['The textbook defines **phUgrh** as **igpkurh** (reading/studying)', 'writing', 'speaking'],
                  hint: 'If stuck, re-read the **\'Before You Read\' (node 001)** section on Fakir Mohan Senapati\'s role.',
                  misconception: 'Students treat the *kCn&Nfo* list as a **memorization list for translation exams** (Hindi -> English meaning).' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['**Isolate the pivot:** Pick *one* word (e.g., *pkSik;ksa*).', '**Draw two columns:** Column A = "Child\'s World (Stanza 1-2)", Column B = "Mother\'s World (Stanza 3-4)".', '**Hunt evidence:** Find *pkSik;ksa* in text.', 'Column A: *pkSik;ksa* = letters (child struggles).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_011', difficulty: 'standard',
          question: 'Language usage in a literary text refers to the author\'s deliberate choices.',
          hint: 'Review Class 10 Hindi grammar: verb conjugations, case endings, and common dialect.',
          misconception: 'Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than deliberate representation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language usage in a literary text refers to the author\'s deliberate choices in',
                  options: ['Language usage in a literary text refers to the author\'s deliberate choices in', '"Before You Read: Context and Background" is a pre-reading pedagogical step that provides', 'Plot and narrative structure in a narrative poem refers to the organized sequence of', 'Setting and atmosphere in poetry refer to the physical, temporal, and emotional backdrop'],
                  hint: 'Review Class 10 Hindi grammar: verb conjugations, case endings, and common dialect differences.',
                  misconception: 'Students think non-standard grammar in literature is "incorrect" or "mistakes" rather than deliberate representation of speech communities.' }
          ],
            remediations: { 'non-standard-grammar-in-literature': { steps: ['Play an audio recording of a Bhojpuri speaker reading the poem; ask students to transcribe phonetically what they hear.', 'Create a three-column table: Dialect Word | Standard Hindi Equivalent | Grammatical Category (verb, adverb, etc.).', 'Discuss: "If Renu wrote *padhti* instead of *phUgrh*, what would the poem lose?" 4.', 'Practice converting two dialect lines to standard Hindi, then reading both aloud to hear the rhythmic difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_12_012', difficulty: 'standard',
          question: 'Literal comprehension refers to understanding information directly stated.',
          hint: 'If stuck, review the distinction between explicit statements and implied meanings using.',
          misconception: 'Students often treat inferential questions as "opinion questions" where any personal guess is valid.',
          parts: [
                { id: 'a', prompt: 'The poem states: "पैक लकुंज ध यM+ध गस" (The mother has a longing for the courtyard).', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'inference', 'imagination'],
                  hint: 'If stuck, review the distinction between explicit statements and implied meanings using simple.',
                  misconception: 'Students often treat inferential questions as "opinion questions" where any personal guess is valid.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['If a student gives an unsupported inference, do not say "read carefully." Instead: (1) Ask them to underline the exact.', '(2) If they cannot, guide them to the relevant stanza (e.g., the mother\'s dialogue in the third stanza).', '(3) Model the inference aloud: "The text says X, which suggests Y because..." (4) Have them rewrite the answer using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
