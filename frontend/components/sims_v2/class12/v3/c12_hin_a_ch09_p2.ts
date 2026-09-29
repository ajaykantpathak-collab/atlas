import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p2: SimDef = {
    id: 'v3_c12_hin_a_ch09_p2',
    title: 'घनानंद · Part 2/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'घनानंद · Part 2/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_007', 'c12_hin_a_cbse_09_008', 'c12_hin_a_cbse_09_009', 'c12_hin_a_cbse_09_010', 'c12_hin_a_cbse_09_011', 'c12_hin_a_cbse_09_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride disguised — signing the guru\'s name asserts his verses outrank the curse', 'A pen-name convention — court poets always published under a guru\'s seal', 'A public apology — the signature is the exile\'s lifelong plea for forgiveness'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'घनानंद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'अंतरा भाग-2 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['घनानंद — साहित्यिक युक्तियाँ', 'घनानंद — मुख्य भाव', 'घनानंद — गौण भाव', 'घनानंद — पदावली: कठिन', 'घनानंद — व्याकरण: पद्य', 'घनानंद — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_009', title: 'घनानंद — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 9\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony (व्यंग्य) in your own words and give one example from daily life (not from the textbook).', options: [
                { text: 'Irony is when words or situations convey a meaning opposite to their literal sense', outcome: 'Irony is when words or situations convey a meaning opposite to their literal sense — e.g., saying.' },
                { text: 'irony means sarcasm', outcome: 'Not quite — Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any.', reveals: 'irony-and-symbolism-are-the' },
                { text: 'irony is a lie', outcome: 'Not quite — Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any.', reveals: 'irony-and-symbolism-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_011', title: 'घनानंद — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 9\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the Braj Bhasha present-tense plural verb ending used in the first doha (line "dfg dfg vkou Nchys euHkkou dks") and state its.', options: [
                { text: 'The Braj ending is **-ys** (in "Nchys" = नचैस)', outcome: 'The Braj ending is **-ys** (in "Nchys" = नचैस) which corresponds to modern Khari Boli **-te hain**.' },
                { text: '-te hain', outcome: 'Not quite — Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" rather than.', reveals: 'students-treat-braj-bhasha-forms' },
                { text: 'ब्रजभाषा का रूप लिखिए', outcome: 'Not quite — Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" rather than.', reveals: 'students-treat-braj-bhasha-forms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_012', title: 'घनानंद — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 9\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'अंतरा भाग-2।',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "According to the first poem, what time of day is described in the.', options: [
                { text: '**Correct:** Literal', outcome: '**Correct:** Literal. The question asks for a detail explicitly stated in the text (time of day).' },
                { text: 'inferential', outcome: 'Not quite — Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They.', reveals: 'inferential-questions-have-no-right' },
                { text: 'no right answer', outcome: 'Not quite — Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'What comes next? घनानंद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — घनानंद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फंसे हों तो **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) पर लौटें.',
          misconception: 'छात्र **प्रतीक** और **रूपक/उपमा** में भेद नहीं करते — वे "चंदन" को केवल उपमान (उपमा का हिस्सा) मान लेते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों तो **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) पर लौटें — वहां.',
                  misconception: 'छात्र **प्रतीक** और **रूपक/उपमा** में भेद नहीं करते — वे "चंदन" को केवल उपमान (उपमा का हिस्सा) मान लेते हैं, जबकि प्रतीक **स्वतंत्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **एक पद** दें (जैसे "चंदन तनु लेपन...") और पूछें: "यहां चंदन केवल लकड़ी है या कुछ और कह रहा है?".', '**पांच इंद्रियों** के नाम लिखवाएं और प्रत्येक के लिए पद से एक-एक शब्द छांटने को कहें — **बिंब-वर्गीकरण** का अभ्यास.', '**c12_hin_a_cbse_09_006** (अलंकार) दोबारा पढ़वाएं: अलंकार = शाब्दिक सौंदर्य, प्रतीक = अर्थ-गहराई — **भेद-स्पष्टीकरण**.', 'पुनः डायग्नोस्टिक Q2, Q3 दें — सुधार न दिखे तो **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) पर लौटें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_a_cbse_09_004 (केंद्रीय भाव और रस) पर लौटें — वहाँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र घनानंद के \'सुजन\' (प्रेयसी) को केवल ऐतिहासिक/लौकिक स्त्री मान लेते हैं और राधा-कृष्ण प्रसंग को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो: c12_hin_a_cbse_09_004 (केंद्रीय भाव और रस) पर लौटें — वहाँ शृंगार रस की.',
                  misconception: '**विशिष्ट भ्रम:** छात्र घनानंद के \'सुजन\' (प्रेयसी) को केवल ऐतिहासिक/लौकिक स्त्री मान लेते हैं और राधा-कृष्ण प्रसंग को मात्र अलंकारिक समझते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्अध्ययन:** c12_hin_a_cbse_09_002 (पद्यांश-वार भावार्थ) से 3 पद चुनें और प्रत्येक में \'सुजन\' व \'राधा\' के प्रसंग.', '**तुलनात्मक अभ्यास:** c11_hin_a_cbse_13_008 (जाग तुझको दूर जाना — मुख्य भाव और संदेश) देखें — वहाँ भी \'प्रेम=मोक्ष\' है.', '**पुनर्निदान:** ऊपर दिए गए DIAGNOSTIC_QUESTION_4 को दोबारा हल करें, इस बार प्रत्येक उदाहरण में \'लोक-लाज\' और \'शास्त्र\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_009 for device definitions and practice.',
          misconception: 'Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any non-literal language.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_009 for device definitions and practice.',
                  misconception: 'Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any non-literal language as "metaphor".' }
          ],
            remediations: { 'irony-and-symbolism-are-the': { steps: ['Re-read the two stanzas of "Varjak" aloud, marking every word that describes nature (garden, breeze, night, clouds).', 'For each marked word, ask: "Does this word mean what it says, or does it carry a second meaning?" — if second meaning.', 'Ask: "Does the scene described match the speaker\'s feeling?" — if opposite, it\'s situational irony.', 'Write one PEEL paragraph for each device using the template: "In stanza X, the poet uses [device] when describing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any non-literal language.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The thunderclouds in stanza 2 are just a weather description — they don\'t symbolize anything because the poet doesn\'t say \'this represents.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'metaphor', 'imagery', 'Varjak'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_009 for device definitions and practice.',
                  misconception: 'Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any non-literal language as "metaphor".' },
                { id: 'b', prompt: 'Write a 4-line poem fragment (in Hindi or English) that uses BOTH irony and symbolism to express the feeling of waiting for someone who never arrives.', answer: 'Example: "The clock ticks *cheerfully* (irony)',
                  options: ['Example: "The clock ticks *cheerfully* (irony)', 'metaphor', 'imagery', 'Varjak'],
                  hint: 'If stuck, review Class 11 node c11_hin_ar_cbse_01_009 for device definitions and practice.',
                  misconception: 'Students often think irony and symbolism are the same as "metaphor" or "imagery" — they label any non-literal language as "metaphor".' }
          ],
            remediations: { 'irony-and-symbolism-are-the': { steps: ['Re-read the two stanzas of "Varjak" aloud, marking every word that describes nature (garden, breeze, night, clouds).', 'For each marked word, ask: "Does this word mean what it says, or does it carry a second meaning?" — if second meaning.', 'Ask: "Does the scene described match the speaker\'s feeling?" — if opposite, it\'s situational irony.', 'Write one PEEL paragraph for each device using the template: "In stanza X, the poet uses [device] when describing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on a word\'s poetic force, review the **\'Context and Background\' node.',
          misconception: 'Students treat the NCERT glossary meanings as **exhaustive definitions** to be memorized for fill-in-the-blanks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck on a word\'s poetic force, review the **\'Context and Background\' node.',
                  misconception: 'Students treat the NCERT glossary meanings as **exhaustive definitions** to be memorized for fill-in-the-blanks, ignoring that Kabir\'s.' }
          ],
            remediations: { 'students-treat-the-ncert-glossary': { steps: ['**Revisit the poem\'s audio recording** (NCERT/CIET) — hear the rhythm of \'vkukdkuh vkjlh\' as a rhythmic pair.', '**Make a 3-column table**: Word | NCERT Gloss | Poetic Function (contrast, metaphor, ritual, theological).', '**Re-do Diagnostic Q2 & Q4** using the table.', '**Ask teacher/peer**: "Show me one line where \'iSt\' means something different in another Bhakti poet." If unable to.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck on segmentation, review Class 11 *kriya visheshan* and *kriya ke bhed* nodes.',
          misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" rather than a rule-governed literary.',
          parts: [
                { id: 'a', prompt: 'Identify the Braj Bhasha present-tense plural verb ending used in the first doha (line "dfg dfg vkou Nchys euHkkou dks") and state its modern Khari Boli.', answer: 'The Braj ending is **-ys** (in "Nchys" = नचैस)',
                  options: ['The Braj ending is **-ys** (in "Nchys" = नचैस)', '-te hain', 'ब्रजभाषा का रूप लिखिए'],
                  hint: 'If stuck on segmentation, review Class 11 *kriya visheshan* and *kriya ke bhed* nodes.',
                  misconception: 'Students treat Braj Bhasha forms as "incorrect Hindi" or "spelling mistakes" rather than a rule-governed literary dialect with its own.' }
          ],
            remediations: { 'students-treat-braj-bhasha-forms': { steps: ['If a student cannot distinguish Braj morphology from Khari Boli, remediate in three steps: (1) **Isolate the paradigm**.', '(2) **Map sound laws** — drill the top 5 Braj→Khari Boli correspondences: *-ys → -te hain, -au → -ta hoon, -e → -te.', '(3) **Re-diagnose** — give a fresh Braj couplet (e.g., from Surdas) and ask the student to annotate *only* verb endings.', 'Mastery = 4/5 correct annotations without *shabdarth* help.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck on "what counts as evidence," review **c12_hin_a_cbse_09_010** for word meanings.',
          misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They write vague feelings.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "According to the first poem, what time of day is described in the opening stanza?"', answer: '**Correct:** Literal',
                  options: ['**Correct:** Literal', 'inferential', 'no right answer', 'it\'s just my opinion'],
                  hint: 'If stuck on "what counts as evidence," review **c12_hin_a_cbse_09_010** for word meanings and.',
                  misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They write vague feelings ("I think the poet.' },
                { id: 'b', prompt: 'A student answers the textbook question "dfo us ^pkgr pyu ;s lanslks ys lqtku dks* D;ksa dgk gS?" with: "Because the bird flew away." Explain why this answer.', answer: '**Correct explanation:** The question asks *why the poet says this* (the poet\'s',
                  options: ['**Correct explanation:** The question asks *why the poet says this* (the poet\'s', 'what caused the event', 'what does the poet convey', 'no right answer'],
                  hint: 'If stuck on "what counts as evidence," review **c12_hin_a_cbse_09_010** for word meanings and.',
                  misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They write vague feelings ("I think the poet.' },
                { id: 'c', prompt: 'APPLY: The second poem contains the line "owQdHkjh ewdrk cqyk; vki cksfygSA" (You have filled the cup of sorrow with the poison of irony).', answer: '**Steps & Answer:** 1',
                  options: ['**Steps & Answer:** 1', 'they are sad', 'sorrow', 'vki cksfyg'],
                  hint: 'If stuck on "what counts as evidence," review **c12_hin_a_cbse_09_010** for word meanings and.',
                  misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They write vague feelings ("I think the poet.' },
                { id: 'd', prompt: 'ANALYZE: Compare the two textbook questions: (1) "dfo ekSu gksdj izsfedk osQ dkSu ls iz.k ikyu dks ns[kuk pkgrk gS?" and (2) "?kukuan dh jpukvksa dh Hkkf"kd.', answer: '**Correct:** (1) Inferential',
                  options: ['**Correct:** (1) Inferential', 'long answer', 'no right answer', 'it\'s just my opinion'],
                  hint: 'If stuck on "what counts as evidence," review **c12_hin_a_cbse_09_010** for word meanings and.',
                  misconception: 'Students believe **inferential questions have "no right answer" — "it\'s just my opinion."** They write vague feelings ("I think the poet.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['**Revisit the two poems** with a highlighter: mark every concrete noun/verb (bird, fly, cup, poison) in yellow — these.', '**Take one textbook inferential question** (e.g., Q2: "dfo ekSu gksdj...").', 'Write the answer in three columns: **Evidence (line)** → **Reasoning (what it implies)** → **Conclusion (answer)**.', '**Re-diagnostic:** Ask the student to convert a literal question ("What did the bird do?") into an inferential one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
