import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p2',
    title: 'कैमरे में बंद अपाहजि · Part 2/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: 'कैमरे में बंद अपाहजि · Part 2/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_007', 'c12_hin_ar_cbse_04_008', 'c12_hin_ar_cbse_04_009', 'c12_hin_ar_cbse_04_010', 'c12_hin_ar_cbse_04_011', 'c12_hin_ar_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'कैमरे में बंद अपाहजि — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'दसेज में चाँद विकट\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['कैमरे में बंद अपाहजि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_009', title: 'कैमरे में बंद अपाहजि — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'दसेज में चाँद विकट\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "can vikfgt" (लोहे का पक्षी) in the poem, and what is the ironic gap between this label and the.', options: [
                { text: 'The literal meaning is "a bird made of iron," referring to an airplane', outcome: 'The literal meaning is "a bird made of iron," referring to an airplane.' },
                { text: 'iron bird', outcome: 'Not quite — Students often think irony in this poem is simply "the airplane is not a real bird" — a factual.', reveals: 'irony-in-this-poem-is' },
                { text: 'airplane', outcome: 'Not quite — Students often think irony in this poem is simply "the airplane is not a real bird" — a factual.', reveals: 'irony-in-this-poem-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_011', title: 'कैमरे में बंद अपाहजि — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: '\'दसेज में चाँद विकट\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'What is the primary tense used in the chapter "केसरी कुमार झा" for narrating past events, and why is it appropriate for a biography?', options: [
                { text: 'The primary tense is past perfect (पूर्ण भूतकाल) often combined with passive voice (e.g.,', outcome: 'The primary tense is past perfect (पूर्ण भूतकाल) often combined with passive voice (e.g., "नियुक्त.' },
                { text: 'simple past', outcome: 'Not quite — Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and.', reveals: 'students-treat-grammar-in-the' },
                { text: 'present tense', outcome: 'Not quite — Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and.', reveals: 'students-treat-grammar-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'What comes next? कैमरे में बंद अपाहजि · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कैमरे में बंद अपाहजि · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_007', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) के \'प्रतीक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कैमरा\' कविता में केवल एक तकनीकी उपकरण (technological device) है** और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' के गौण विषय',
                  options: ['\'दसेज में चाँद विकट\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) के \'प्रतीक की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'कैमरा\' कविता में केवल एक तकनीकी उपकरण (technological device) है** और \'अपाहजि\' केवल एक पात्र.' }
          ],
            remediations: { 'technological-device-character-multi-valency': { steps: ['**चरण 1:** छात्र से कहो: "कविता की पहली दो पंक्तियाँ पढ़ो और बताओ \'कैमरा\' यहाँ क्या *कर* रहा है — केवल फोटो खींच रहा है.', '**चरण 2:** नोड **c11_hin_ar_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) या **c11_hin_ar_cbse_14_007** (बादल को.', '**चरण 3:** एक छोटा अभ्यास दो: "अपने आसपास की किसी वस्तु (घड़ी, दरवाजा, खिड़की) को लेकर दो अर्थ लिखो — भौतिक और.', '**पुनर्निदान:** उपरोक्त DIAGNOSTIC_QUESTION_2 (फ्रेम का अर्थ) फिर से पूछो; यदि अब भी भौतिक अर्थ पर अटके तो नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_008', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ) के पद 1, 3, 5 को दोबारा पढ़ें और.',
          misconception: '**सबसे आम भ्रम:** छात्र मान लेते हैं कि कविता का मुख्य भाव \'अपाहिज की पीड़ा\' या \'विकलांगों के प्रति सहानुभूति\' है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' में बिंब (imagery)',
                  options: ['\'दसेज में चाँद विकट\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ) के पद 1, 3, 5 को दोबारा पढ़ें और \'दर्शक\' व.',
                  misconception: '**सबसे आम भ्रम:** छात्र मान लेते हैं कि कविता का मुख्य भाव \'अपाहिज की पीड़ा\' या \'विकलांगों के प्रति सहानुभूति\' है। **वास्तविकता:** कविता.' }
          ],
            remediations: { '1': { steps: ['चरण 1: छात्र से कहें — "कविता को फिर से पढ़ो, पर इस बार **अपाहिज को भूल जाओ**; केवल **कैमरा** और **दर्शक** क्या कर रहे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_009', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for.',
          misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss.',
          parts: [
                { id: 'a', prompt: 'What is the literal meaning of the phrase "can vikfgt" (लोहे का पक्षी) in the poem, and what is the ironic gap between this label and the reality of the object.', answer: 'The literal meaning is "a bird made of iron," referring to an airplane',
                  options: ['The literal meaning is "a bird made of iron," referring to an airplane', 'iron bird', 'airplane', 'the airplane is not a real bird'],
                  hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for definitions, and.',
                  misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss that the irony.' },
                { id: 'b', prompt: 'In the dialogue, the child asks the iron bird: "vkidk vikfgtiu rks nq[k nsrk gksxk nsrk gS?" (Does your bird-ness give you pain?).', answer: 'The question is verbally ironic',
                  options: ['The question is verbally ironic', 'the airplane is not a real bird'],
                  hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for definitions, and.',
                  misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss that the irony.' },
                { id: 'c', prompt: 'Apply the concept of symbolism: The poem describes the iron bird as having "cgqr cM+h rlohj" (very long wings) and "mlosQ gksaBksa ij ,d dlelkgV" (a pilot.', answer: 'The long wings symbolize technology\'s massive, imposed scale',
                  options: ['The long wings symbolize technology\'s massive, imposed scale', 'the airplane is not a real bird'],
                  hint: 'If stuck, review the Class 11 irony/symbolism node (c11_hin_ar_cbse_04_009) for definitions, and.',
                  misconception: 'Students often think irony in this poem is simply "the airplane is not a real bird" — a factual observation — and miss that the irony.' }
          ],
            remediations: { 'irony-in-this-poem-is': { steps: ['If the student cannot distinguish irony from mere contrast, return to the Class 11 node on irony.', 'situational irony with a simple Hindi example: "barish mein bheeGte hue kisi se puchna \'mazaa aa raha hai?\'" — the.', 'Then apply this to the poem: the child asks the airplane "do you feel cold?" knowing it cannot — that gap *is* the.', 'For symbolism, use the "nest" (घोंसला) as a concrete anchor: the real bird has one (symbol: home, continuity), the iron.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_010', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on context-clue identification, revisit **c11_hin_ar_cbse_04_010 (Vocabulary.',
          misconception: '**Misconception:** "Vocabulary in context means finding the *one correct dictionary meaning* that fits the sentence.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' की पदावली',
                  options: ['\'दसेज में चाँद विकट\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on context-clue identification, revisit **c11_hin_ar_cbse_04_010 (Vocabulary in Context.',
                  misconception: '**Misconception:** "Vocabulary in context means finding the *one correct dictionary meaning* that fits the sentence." **Why students make.' }
          ],
            remediations: { 'misconception-vocabulary-in-context-means': { steps: ['**Remediation Path (3 sessions):** **Session 1 (Diagnose):** Give the student 5 sentences from Chapter 4 with target.', 'Ask: "Write the meaning *only from this sentence* — no dictionary." Mark each: ✓ if they use context clues (contrast.', '**Session 2 (Micro-skill drill):** Teach the **\'Clue-Hunt Table\'**: Column A: Target word | Column B: ±3 surrounding.', 'Practice with 10 words from the chapter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_011', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'Review Class 11 Hindi grammar node c11_hin_ar_cbse_04_011 for passive transformation.',
          misconception: 'Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and stop there.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' में भाषा-प्रयोग',
                  options: ['\'दसेज में चाँद विकट\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review Class 11 Hindi grammar node c11_hin_ar_cbse_04_011 for passive transformation drills and.',
                  misconception: 'Students treat "grammar in the text" as a labeling exercise (e.g., "this is passive voice") and stop there.' }
          ],
            remediations: { 'students-treat-grammar-in-the': { steps: ['Return to the chapter and highlight every verb phrase with a colored pen.', 'Sort them into a table: Tense × Voice × Subject.', 'For the top three patterns, write one sentence each: "The author uses [pattern] here to [effect]." 4.', 'Re-attempt Diagnostic Question 4 orally, explaining the *function* of subordination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_012', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि \'कैमरा\' प्रतीक या \'दान की रसीद\' व्यंग्य समझ न आए, तो **c12_hin_ar_cbse_04_007.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर देने के लिए **\'कविता का सारांश\' लिखना काफी है**। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'दसेज में चाँद विकट\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि \'कैमरा\' प्रतीक या \'दान की रसीद\' व्यंग्य समझ न आए, तो **c12_hin_ar_cbse_04_007 (प्रतीक)** और.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर देने के लिए **\'कविता का सारांश\' लिखना काफी है**। वे लिखते हैं: "कविता में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहो — "एक पद्यांश लो, उस पर **केवल 3 वस्तुनिष्ठ प्रश्न** बनाओ (विकल्प सहित) और फिर **उनके उत्तर.', '- E: कौन सी **ठीक पंक्ति/शब्द** प्रमाण है?', '(पेंसिल से अंडरलाइन करो) - E: यह प्रमाण तुम्हारे दावे को कैसे सिद्ध करता है?', '- L: यह कविता के **केंद्रीय भाव** से कैसे जुड़ता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
