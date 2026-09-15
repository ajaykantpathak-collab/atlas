import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p2',
    title: 'Hkkjrh; f\'k{kk · Part 2/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'Hkkjrh; f\'k{kk · Part 2/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_007', 'c11_hin_ar_cbse_16_008', 'c11_hin_ar_cbse_16_009', 'c11_hin_ar_cbse_16_010', 'c11_hin_ar_cbse_16_011', 'c11_hin_ar_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the subsidiary ideas that run parallel to the primary theme, enriching the text by exploring specific social, cultural, ecological, or psychological dimensions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are reading the poem aloud and notice the poet repeatedly mentions "mati" (soil), "beej" (seed), "ritu" (season), and "bhasha" (language) in the.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature?', options: [
                { text: 'A secondary theme is a subordinate idea that supports or complements the primary theme,', outcome: 'A secondary theme is a subordinate idea that supports or complements the primary theme, exploring.' },
                { text: 'it\'s just another topic', outcome: 'Not quite — Students often list topics like "farming," "seasons," or "village life" as secondary themes without.', reveals: 'students-often-list-topics-like' },
                { text: 'the theme is farming', outcome: 'Not quite — Students often list topics like "farming," "seasons," or "village life" as secondary themes without.', reveals: 'students-often-list-topics-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are scrolling through Instagram and see a reel of a Diwali evening: the *visual* of flickering diyas, the *auditory* crackle of sparklers, the.',
            decisions: [{ prompt: 'Define "imagery" (चित्रण) and "metaphor" (रूपक) in your own words, giving one original example for each that is NOT from the textbook.', options: [
                { text: '**Correct Answer:** Imagery is descriptive language appealing to the five senses (e.g.,', outcome: '**Correct Answer:** Imagery is descriptive language appealing to the five senses (e.g., "The.' },
                { text: 'description', outcome: 'Not quite — Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.', reveals: 'any-comparison-is-a-metaphor' },
                { text: 'like/as', outcome: 'Not quite — Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.', reveals: 'any-comparison-is-a-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are lying awake at 2 AM, exhausted but unable to sleep because your mind replays the day\'s disappointments — you might whisper to the darkness.',
            decisions: [{ prompt: 'Define verbal irony and situational irony with one example each from everyday life (not from the poem).', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying "Great job!".' },
                { text: 'comparison (e.g', outcome: 'Not quite — Students often confuse symbolism with metaphor, treating every symbol as a direct "A = B".', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading a WhatsApp forward in Hindi that uses the word "नक़्श" - you might think "map" but in a poetry context it means "impression on the.',
            decisions: [{ prompt: 'From the \'शब्द-अर्थ\' box in the textbook, which word is defined as "किसी चीज़ को लेकर जुनून की हद तक चले जाने का भाव"?', options: [
                { text: '**विडम्बन** (vD[kM+iu)', outcome: 'The correct answer is **विडम्बन** (vD[kM+iu). A wrong answer like "तर्कशीलता" reveals the student.' },
                { text: 'तर्कशीलता', outcome: 'Not quite — Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and.', reveals: 'students-treat-the-box-as' },
                { text: 'विडम्बन', outcome: 'Not quite — Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and.', reveals: 'students-treat-the-box-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading a poem where words don\'t follow normal sentence order — "Hkhrj dh vkx" (the poison of hatred) instead of "vkx Hkhrj dh".',
            decisions: [{ prompt: 'Identify the samas (compound type) in "vkcks&gok" and "vD[kM+iu" from the poem\'s vocabulary list, and state the meaning of each compound.', options: [
                { text: 'vkcks&gok is a Tatpurusha samas (tyok;q + gok = tyok;q dk gok) meaning "deep darkness of', outcome: 'vkcks&gok is a Tatpurusha samas (tyok;q + gok = tyok;q dk gok) meaning "deep darkness of the.' },
                { text: 'poetic language', outcome: 'Not quite — Students assume "poetic language" means only figures of speech (alankar) like metaphor.', reveals: 'poetic-language-means-only-figures' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and the first question asks, "What does the poet compare words to in the opening lines?" while the second asks, "Why.',
            decisions: [{ prompt: 'What is the basic difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What color is', outcome: 'A literal question asks for information directly stated in the text (e.g., "What color is the.' },
                { text: 'literal questions are easy and inferential are hard', outcome: 'Not quite — Students believe inferential questions have "no right answer" and that any personal opinion counts.', reveals: 'inferential-questions-have-no-right' },
                { text: 'no right answer', outcome: 'Not quite — Students believe inferential questions have "no right answer" and that any personal opinion counts.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'What comes next? Hkkjrh; f\'k{kk · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Hkkjrh; f\'k{kk · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_007', difficulty: 'standard',
          question: 'Secondary themes are the subsidiary ideas that run parallel to the primary.',
          hint: 'Review the primary theme (node 006) and the setting/atmosphere (node 003) to re-ground.',
          misconception: 'Students often list topics like "farming," "seasons," or "village life" as secondary themes without articulating the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the subsidiary ideas that run parallel to the primary theme,',
                  options: ['Secondary themes are the subsidiary ideas that run parallel to the primary theme,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Narrative structure in poetry refers to the organized progression of ideas, images, and', 'Setting in a poem refers to the time, place, and social environment in'],
                  hint: 'Review the primary theme (node 006) and the setting/atmosphere (node 003) to re-ground yourself.',
                  misconception: 'Students often list topics like "farming," "seasons," or "village life" as secondary themes without articulating the poet\'s perspective.' }
          ],
            remediations: { 'students-often-list-topics-like': { steps: ['Ask the student to pick one recurring image (e.g., "beej" - seed) and complete the sentence: "The poet uses the seed.', 'Have them find two other images that complete the same sentence.', 'Guide them to generalize the completed sentence into a thematic statement.', 'Verify by checking if the statement can be supported by at least three distinct stanzas.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_008', difficulty: 'standard',
          question: 'Imagery (प्रतिबिंब/चित्रण) is the use of vivid, sensory language that appeals.',
          hint: 'Review Class 9/10 Hindi grammar chapter "अलंकार" (Figures of Speech) – specifically उपमा.',
          misconception: 'Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.',
          parts: [
                { id: 'a', prompt: 'In the line "बाँसुरी की बाँक में / जीवन की गूँज" (Stanza 2), identify the metaphor. What is the tenor and what is the vehicle?', answer: '**Correct Answer:** Metaphor: "बाँसुरी की बाँक" (flute\'s curve/tune) = vehicle',
                  options: ['**Correct Answer:** Metaphor: "बाँसुरी की बाँक" (flute\'s curve/tune) = vehicle', '**any comparison is a metaphor** and **any descriptive word is imagery**'],
                  hint: 'Review Class 9/10 Hindi grammar chapter "अलंकार" (Figures of Speech) – specifically उपमा (simile).',
                  misconception: 'Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.' },
                { id: 'b', prompt: 'APPLY: The poem uses "इव्वल की इव्वल चमक" (Stanza 1). Classify the *primary* sensory appeal (visual, auditory, etc.). Then, rewrite this phrase as a simile.', answer: '**Correct Answer:** Primary appeal: Visual (bright, steady light)',
                  options: ['**Correct Answer:** Primary appeal: Visual (bright, steady light)', 'auditory', 'tactile', '**any comparison is a metaphor** and **any descriptive word is imagery**'],
                  hint: 'Review Class 9/10 Hindi grammar chapter "अलंकार" (Figures of Speech) – specifically उपमा (simile).',
                  misconception: 'Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.' }
          ],
            remediations: { 'any-comparison-is-a-metaphor': { steps: ['**Sensory Sort Drill:** Give the student 15 words from the poem (इव्वल, बाँसुरी, फुसफुसाहट, मेंहदी, सन्नाटा, etc.).', 'Ask them to sort into 5 sense columns (दृश्य, श्रव्य, घ्राण, स्पर्श, स्वाद).', '**Metaphor Surgery:** Take 3 similes from Class 10 texts (e.g., "वीर तुम बढ़े चलो...', 'तुम अनंत हो *जैसे* सागर").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: A student claims: "The metaphor \'हाथों की मेंहदी\' (Stanza 3) for \'tradition\' is weak because mehndi fades quickly, but traditions are long-lasting.".', answer: '**Correct Answer:** Refute',
                  options: ['**Correct Answer:** Refute', '**any comparison is a metaphor** and **any descriptive word is imagery**'],
                  hint: 'Review Class 9/10 Hindi grammar chapter "अलंकार" (Figures of Speech) – specifically उपमा (simile).',
                  misconception: 'Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.' },
                { id: 'b', prompt: 'CREATE: Write a 4-line Hindi poem stanza (छंद) about "exam stress" using: (a) at least two distinct sensory images (label them), (b) one metaphor equating.', answer: '**Expected Answer Criteria:** 1',
                  options: ['**Expected Answer Criteria:** 1', '**any comparison is a metaphor** and **any descriptive word is imagery**'],
                  hint: 'Review Class 9/10 Hindi grammar chapter "अलंकार" (Figures of Speech) – specifically उपमा (simile).',
                  misconception: 'Students believe **any comparison is a metaphor** and **any descriptive word is imagery**.' }
          ],
            remediations: { 'any-comparison-is-a-metaphor': { steps: ['**Sensory Sort Drill:** Give the student 15 words from the poem (इव्वल, बाँसुरी, फुसफुसाहट, मेंहदी, सन्नाटा, etc.).', 'Ask them to sort into 5 sense columns (दृश्य, श्रव्य, घ्राण, स्पर्श, स्वाद).', '**Metaphor Surgery:** Take 3 similes from Class 10 texts (e.g., "वीर तुम बढ़े चलो...', 'तुम अनंत हो *जैसे* सागर").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or situations.',
          hint: 'If stuck, review the metaphor analysis in node 008 (especially "thou dh xekZgV") and the.',
          misconception: 'Students often confuse symbolism with metaphor, treating every symbol as a direct "A = B" comparison (e.g., "ink.',
          parts: [
                { id: 'a', prompt: 'In the poem, the speaker says "vkvks] feydj cpk,¡" (Come, let\'s sleep).', answer: 'The invitation is verbally ironic',
                  options: ['The invitation is verbally ironic', 'comparison (e.g'],
                  hint: 'If stuck, review the metaphor analysis in node 008 (especially "thou dh xekZgV") and the theme.',
                  misconception: 'Students often confuse symbolism with metaphor, treating every symbol as a direct "A = B" comparison (e.g., "ink = sadness").' },
                { id: 'b', prompt: 'Analyze how the symbol of "nkSj" (time/night) operates differently in the first half of the poem (where it is a setting) versus the final stanza (where the.', answer: 'Initially, "nkSj" is a passive backdrop',
                  options: ['Initially, "nkSj" is a passive backdrop', 'comparison (e.g'],
                  hint: 'If stuck, review the metaphor analysis in node 008 (especially "thou dh xekZgV") and the theme.',
                  misconception: 'Students often confuse symbolism with metaphor, treating every symbol as a direct "A = B" comparison (e.g., "ink = sadness").' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If the student conflates symbol and metaphor: 1) Have them list all concrete nouns in the poem (ink, night, dreams.', '2) For each, ask: "What does this object *do* in the poem?', 'What feelings or ideas *surround* it?" 3) Show how "ekVh" appears in the poet\'s bio ("uxkM+s dh rjg ctrs \'kCn") and.', '4) Contrast with a clear metaphor from node 008 (e.g., "thou dh xekZgV" — life\'s zigzag) to show metaphor is a stated.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review the concept of "शब्द-शक्ति" (word-power: अभिधा, लक्षणा, व्यंजना) from.',
          misconception: 'Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and stopping there.',
          parts: [
                { id: 'a', prompt: 'From the \'शब्द-अर्थ\' box in the textbook, which word is defined as "किसी चीज़ को लेकर जुनून की हद तक चले जाने का भाव"?', answer: '**विडम्बन** (vD[kM+iu)',
                  options: ['**विडम्बन** (vD[kM+iu)', 'तर्कशीलता', 'विडम्बन'],
                  hint: 'If stuck, review the concept of "शब्द-शक्ति" (word-power: अभिधा, लक्षणा, व्यंजना) from Class 9-10.',
                  misconception: 'Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and stopping there.' }
          ],
            remediations: { 'students-treat-the-box-as': { steps: ['Have the student locate all 3 occurrences of "वक़्स-गोक" in the poem and write the exact line for each.', 'Ask "What is the grammatical role here? Noun? Adverb? Verb modifier?"', 'Guide them to see the shift: first occurrence = noun (the deep sleep of tradition), second = adverbial (sleepily.', 'Assign: "Write 3 sentences using \'नींद\' in three different grammatical roles" to cement the concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_011', difficulty: 'standard',
          question: 'Language usage in poetry refers to the deliberate grammatical, lexical, and.',
          hint: 'Review Class 10 Hindi Grammar: Samas Vigrah and Vibhakti Pratyaya exercises, focusing.',
          misconception: 'Students assume "poetic language" means only figures of speech (alankar) like metaphor or alliteration, ignoring how.',
          parts: [
                { id: 'a', prompt: 'In the line "Hkhrj dh vkx / èkuq"k dh Mksjh", explain why the poet uses the genitive case (dh) for both "Hkhrj" and "èkuq"k" instead of the instrumental case.', answer: 'The genitive "dh" establishes possession/origin',
                  options: ['The genitive "dh" establishes possession/origin', 'poetic language'],
                  hint: 'Review Class 10 Hindi Grammar: Samas Vigrah and Vibhakti Pratyaya exercises, focusing on Tatpurusha.',
                  misconception: 'Students assume "poetic language" means only figures of speech (alankar) like metaphor or alliteration, ignoring how core grammar — case.' }
          ],
            remediations: { 'poetic-language-means-only-figures': { steps: ['Have the student rewrite three poem lines in standard prose order (SOV) and compare: "vkx Hkhrj dh gS" vs "Hkhrj.', 'Give a table of 5 poem compounds; have them split each into component words, identify samas type using the \'kCn&Nfo.', 'Ask them to replace all genitives (dh/ki/ki) with instrumental (se) in one stanza and read aloud — discuss how agency.', 'Finally, have them compose two lines using the [Noun+dh+Noun] pattern on a personal struggle, forcing grammatical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'If stuck, review the poem\'s summary and key vocabulary list in node.',
          misconception: 'Students believe inferential questions have "no right answer" and that any personal opinion counts as a valid.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "Hkksykiu fny dk vD[kM+iu] tq>k:iu Hkh" appears.', answer: 'The answer is incomplete',
                  options: ['The answer is incomplete', 'no right answer'],
                  hint: 'If stuck, review the poem\'s summary and key vocabulary list in node c11_hin_ar_cbse_16_002 and.',
                  misconception: 'Students believe inferential questions have "no right answer" and that any personal opinion counts as a valid inference.' },
                { id: 'b', prompt: 'Apply the literal comprehension strategy to this question: "According to the poem, what are the three things the poet says are \'for children\' (cPpksa osQ.', answer: 'Steps: 1) Identify keywords: "cPpksa osQ fy," and "three things"',
                  options: ['Steps: 1) Identify keywords: "cPpksa osQ fy," and "three things"', 'toys, games, stories', 'no right answer'],
                  hint: 'If stuck, review the poem\'s summary and key vocabulary list in node c11_hin_ar_cbse_16_002 and.',
                  misconception: 'Students believe inferential questions have "no right answer" and that any personal opinion counts as a valid inference.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Have the student re-read the poem with a highlighter, marking only explicit facts (names, colors, actions, direct.', 'Practice converting 5 literal questions into inferential ones by adding "Why," "How," or "What does this suggest.', 'For each inferential question, require the student to write: "The text says _____, which implies _____ because _____.".', 'Use the vocabulary node (c11_hin_ar_cbse_16_010) to clarify words like \'vD[kM+iu\' and \'tq>k:iu\' that are often.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
