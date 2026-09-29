import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_007', 'c11_hin_ar_cbse_01_008', 'c11_hin_ar_cbse_01_009', 'c11_hin_ar_cbse_01_010', 'c11_hin_ar_cbse_01_011', 'c11_hin_ar_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: '\'इजसेपन\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_009', title: 'पाठ 1 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'इजसेपन\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony and give one example from daily life (not from the story).', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was', outcome: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was expected.' },
                { text: 'irony is just a coincidence', outcome: 'Not quite — Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha.', reveals: 'students-often-treat-every-unexpected' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha.', reveals: 'students-often-treat-every-unexpected' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_010', title: 'पाठ 1 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'इजसेपन\' के मुख्य शब्द: इजसेपन — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define "context clue" and name the six standard types taught at senior secondary level.', options: [
                { text: 'A context clue is a hint within the same sentence or surrounding sentences that helps a', outcome: 'A context clue is a hint within the same sentence or surrounding sentences that helps a reader.' },
                { text: 'synonym and antonym', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_011', title: 'पाठ 1 — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'इजसेपन\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'What is the grammatical term for the verb form "कराए गए" in the sentence "कागज़ात जमा कराए गए", and what does it indicate about agency.', options: [
                { text: 'The form "कराए गए" is a **causative passive** construction (कर्मवाच्य + causative)', outcome: 'The form "कराए गए" is a **causative passive** construction (कर्मवाच्य + causative).' },
                { text: 'language usage', outcome: 'Not quite — Students believe "language usage" only means identifying difficult words or listing idioms.', reveals: 'language-usage-only-means-identifying' },
                { text: '"language usage" only means identifying difficult words or listing idioms', outcome: 'Not quite — Students believe "language usage" only means identifying difficult words or listing idioms.', reveals: 'language-usage-only-means-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_012', title: 'पाठ 1 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'इजसेपन\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'इजसेपन\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: 'Identify whether the following question about "Udd Ka Naukri" is literal or inferential: "What specific action does Vyakti Singh take when.', options: [
                { text: '**Correct Answer: Literal.** The text explicitly states: "Vyakti Singh gave his savings', outcome: '**Correct Answer: Literal.** The text explicitly states: "Vyakti Singh gave his savings to the.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "subjective interpretation where any answer is valid if you.', reveals: 'inferential-means-subjective-interpretation-wher' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_007', difficulty: 'standard',
          question: '\'इजसेपन\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'अगर अटके तो \'मुख्य विषय\' (नोड 006) पर वापस जाएं और पाठ के केंद्रीय संघर्ष/संदेश को एक.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम महत्वपूर्ण विषय\' या \'साइड प्लॉट\'। वास्तव में, गौण विषय **कथा का विषयगत घनत्व.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इजसेपन\' के गौण विषय',
                  options: ['\'इजसेपन\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-वृत्त 1924 तक (असली नाम धनपत राय,', '\'इजसेपन\' का कथानक', '\'इजसेपन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो \'मुख्य विषय\' (नोड 006) पर वापस जाएं और पाठ के केंद्रीय संघर्ष/संदेश को एक स्पष्ट वाक्य.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' = \'कम महत्वपूर्ण विषय\' या \'साइड प्लॉट\'। वास्तव में, गौण विषय **कथा का विषयगत घनत्व (thematic density)**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के 3 ऐसे प्रसंग चुनो जो मुख्य कथा को आगे न बढ़ाते हों, फिर भी लेखक ने उन्हें रखा है।" 2.', 'प्रत्येक प्रसंग के लिए पूछें: "अगर यह प्रसंग हटा दिया जाए, तो मुख्य विषय की समझ पर क्या असर पड़ेगा?" 3.', 'छात्र लिखे: "प्रसंग X हटने पर मुख्य विषय Y अधूरा/कमजोर लगेगा क्योंकि..." — यह **कार्यात्मक अनिवार्यता (functional.', 'अंत में समझाएं: "जिसे तुम \'साइड स्टोरी\' समझते हो, वह वास्तव में मुख्य विषय का **सबूत/विस्तार/चुनौती** है।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_008', difficulty: 'standard',
          question: '\'इजसेपन\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो "उपमा और रूपक के सहायक शब्द" (कक्षा 9-10 व्याकरण) दोहराएँ — विशेषतः \'है\' बनाम.',
          misconception: 'छात्र **रूपक** और **उपमा** को केवल "तुलना" मानकर एक समझ लेते हैं क्योंकि दोनों में दो चीज़ें आती हैं। वे नहीं देखते कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इजसेपन\' में बिंब (imagery)',
                  options: ['\'इजसेपन\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-वृत्त 1924 तक (असली नाम धनपत राय,', '\'इजसेपन\' का कथानक', '\'इजसेपन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो "उपमा और रूपक के सहायक शब्द" (कक्षा 9-10 व्याकरण) दोहराएँ — विशेषतः \'है\' बनाम \'जैसे\' का.',
                  misconception: 'छात्र **रूपक** और **उपमा** को केवल "तुलना" मानकर एक समझ लेते हैं क्योंकि दोनों में दो चीज़ें आती हैं। वे नहीं देखते कि रूपक में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) छात्र को **पाँच वाक्य** दें: दो रूपक, दो उपमा, एक साधारण कथन — उसे **केवल सहायक शब्द (जैसे/वैसा/सा/है/हैं)** छाँटने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_009', difficulty: 'standard',
          question: '\'इजसेपन\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening.',
          misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance").',
          parts: [
                { id: 'a', prompt: 'In "Udd ka Naksha," Vyasingh frames Eka Okha to secure him a government job. Explain why this is situational irony, not just a plot twist.', answer: 'It is situational irony',
                  options: ['It is situational irony', 'it\'s ironic because Vyasingh is bad', 'turban'],
                  hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening (Vyasingh\'s.',
                  misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance") or misfortune ("Eka Okha.' },
                { id: 'b', prompt: 'Identify the central symbol in the story\'s title "Udd ka Naksha" and explain what abstract concept it represents, using one textual detail.', answer: 'The "map of the heart" (udd ka naksha) symbolises moral orientation',
                  options: ['The "map of the heart" (udd ka naksha) symbolises moral orientation', 'it\'s just a map of the village', 'turban'],
                  hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening (Vyasingh\'s.',
                  misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance") or misfortune ("Eka Okha.' }
          ],
            remediations: { 'students-often-treat-every-unexpected': { steps: ['**Isolate the expectation**: Have the student write two columns — "What characters/readers expect" vs.', '"What actually happens" — for three key scenes.', '**Symbol autopsy**: Pick one object (the map, the turban, the job letter).', 'Ask: "If this object could speak, what abstract truth would it tell?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance").',
          parts: [
                { id: 'a', prompt: 'Evaluate: Is the story\'s ending — Eka Okha unemployed but morally intact — a symbolic victory or a practical defeat?', answer: 'It is a symbolic victory',
                  options: ['It is a symbolic victory', 'turban'],
                  hint: 'If stuck, review the climax (Eka Okha tearing the appointment letter) and the opening (Vyasingh\'s.',
                  misconception: 'Students often treat every unexpected event as irony, labelling coincidence ("Vyasingh met Eka Okha by chance") or misfortune ("Eka Okha.' }
          ],
            remediations: { 'students-often-treat-every-unexpected': { steps: ['**Isolate the expectation**: Have the student write two columns — "What characters/readers expect" vs.', '"What actually happens" — for three key scenes.', '**Symbol autopsy**: Pick one object (the map, the turban, the job letter).', 'Ask: "If this object could speak, what abstract truth would it tell?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_010', difficulty: 'standard',
          question: '\'इजसेपन\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on clause parsing → review Class 10 Hindi Grammar "vakya vishleshan" (sentence.',
          misconception: 'Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the sentence it sits in.',
          parts: [
                { id: 'a', prompt: 'Apply the *contrast clue* strategy to determine the meaning of *vykSfdd* in the phrase *"vykSfdd ohjrk"* (from the sentence: *¯drq /eZ vykSfdd ohjrk osQ lkFk.', answer: 'The contrast phrase is *"vfopfyr [kM+k"* (paid/fixed salary)',
                  options: ['The contrast phrase is *"vfopfyr [kM+k"* (paid/fixed salary)', 'difficult', 'vocabulary in context'],
                  hint: 'If stuck on clause parsing → review Class 10 Hindi Grammar "vakya vishleshan" (sentence analysis).',
                  misconception: 'Students believe "vocabulary in context" means guessing a word\'s *dictionary definition* from the sentence it sits in.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Isolate the clause**: Have the student copy the exact sentence containing the target word and bracket the main clause.', '**Hunt for signals**: Highlight conjunctions (*ysfdu, blhfy, ;fn, tSls*), punctuation (dashes, commas), and repeated.', '**Map the semantic field**: List all words in the paragraph related to the target word\'s domain (e.g., for *vjnyh*.', '**Write a "context definition"**: Not a dictionary gloss, but a sentence: "*vjnyh* means the state of being trapped.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_011', difficulty: 'standard',
          question: '\'इजसेपन\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
          hint: 'If stuck, review "वाच्य परिवर्तन" (voice change) and "पुरुषवाचक सर्वनाम" (personal.',
          misconception: 'Students believe "language usage" only means identifying difficult words or listing idioms.',
          parts: [
                { id: 'a', prompt: 'Rewrite the clerk\'s line "आपको नक्शा दिखाना पड़ेगा" into the peasant\'s register using appropriate pronoun, verb agreement, and dialect marker.', answer: 'Peasant register: "तुझको नक्शा देखब पड़ै"',
                  options: ['Peasant register: "तुझको नक्शा देखब पड़ै"', 'पड़ेगा', 'language usage', '"language usage" only means identifying difficult words or listing idioms'],
                  hint: 'If stuck, review "वाच्य परिवर्तन" (voice change) and "पुरुषवाचक सर्वनाम" (personal pronouns) from.',
                  misconception: 'Students believe "language usage" only means identifying difficult words or listing idioms.' },
                { id: 'b', prompt: 'Compare the sentence structure of the narrator\'s opening description ("इज्सेपन/3" paragraph) with the clerk\'s first spoken line.', answer: 'The narrator uses long, hypotactic sentences with multiple subordinate clauses',
                  options: ['The narrator uses long, hypotactic sentences with multiple subordinate clauses', 'language usage', '"language usage" only means identifying difficult words or listing idioms'],
                  hint: 'If stuck, review "वाच्य परिवर्तन" (voice change) and "पुरुषवाचक सर्वनाम" (personal pronouns) from.',
                  misconception: 'Students believe "language usage" only means identifying difficult words or listing idioms.' }
          ],
            remediations: { 'language-usage-only-means-identifying': { steps: ['Give the student two parallel sentences: "अफसर ने फाइल मँगवाई" (active) vs "फाइल मँगवाई गई" (passive).', 'Ask: "Who is responsible in each?', 'Which protects the अफसर?" 2.', 'Provide a three-column table: Standard Hindi | Avadhi form in text | Grammatical difference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_012', difficulty: 'standard',
          question: '\'इजसेपन\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'Review the "Character Analysis: Protagonist" node (01004) and re-read pages 6-16 with.',
          misconception: 'Students believe "inferential" means "subjective interpretation where any answer is valid if you can argue for it.".',
          parts: [
                { id: 'a', prompt: 'Compare these two student answers to the same inferential question: "Why does Vyakti Singh\'s father remain silent when his son resigns?" - **Answer A:**.', answer: '**Correct Analysis:** Answer B demonstrates deeper analytical reasoning',
                  options: ['**Correct Analysis:** Answer B demonstrates deeper analytical reasoning', 'inferential'],
                  hint: 'Review the "Character Analysis: Protagonist" node (01004) and re-read pages 6-16 with a focus.',
                  misconception: 'Students believe "inferential" means "subjective interpretation where any answer is valid if you can argue for it." In reality, senior.' }
          ],
            remediations: { 'inferential-means-subjective-interpretation-wher': { steps: ['If a student cannot distinguish literal from inferential or writes unsupported inferences: 1.', '**Color-code the text:** Give them a photocopy of a key passage (e.g., pages 14-16).', 'Have them highlight **explicit facts** in yellow (literal) and **implied meanings** in green (inferential) — physically.', '**Play "Evidence or Opinion?":** Read 5 student sentences aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
