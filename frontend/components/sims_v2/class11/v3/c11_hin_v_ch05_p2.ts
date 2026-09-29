import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p2: SimDef = {
    id: 'v3_c11_hin_v_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_007', 'c11_hin_v_cbse_05_008', 'c11_hin_v_cbse_05_009', 'c11_hin_v_cbse_05_010', 'c11_hin_v_cbse_05_011', 'c11_hin_v_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: '\'वितान भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_008', title: 'पाठ 5 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 5\' में बिंब ढूँढिए — वितान-भाग-1-—-पाठ-5 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "metaphor" and give one example from everyday Hindi usage (not from the textbook).', options: [
                { text: 'A metaphor is a direct comparison between two unlike things stating one *is* the other', outcome: 'A metaphor is a direct comparison between two unlike things stating one *is* the other (e.g., "समय.' },
                { text: 'like/as', outcome: 'Not quite — Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory.', reveals: 'imagery-is-only-visual-description' },
                { text: 'बहादुर जैसे शेर', outcome: 'Not quite — Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_009', title: 'पाठ 5 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 5\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony and give one example from daily life (not from the textbook).', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was', outcome: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was expected.' },
                { text: 'the burning pyre', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_010', title: 'पाठ 5 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 5\' के मुख्य शब्द: वितान-भाग-1-—-पाठ-5 — इनका अर्थ जानिए।',
            decisions: [{ prompt: '"पदावली: मुख्य शब्द" की परिभाषा देते हुए स्पष्ट कीजिए कि यह सामान्य \'कठिन शब्द\' या \'अधिक प्रयुक्त शब्द\' से किस प्रकार भिन्न है?', options: [
                { text: '**Correct Answer:** मुख्य शब्द वे शब्द हैं जो पाठ के केन्द्रीय विषय, भावभूमि और विचारधारा', outcome: '**Correct Answer:** मुख्य शब्द वे शब्द हैं जो पाठ के केन्द्रीय विषय, भावभूमि और विचारधारा को वहन.' },
                { text: 'difficult words', outcome: 'Not quite — **Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s.', reveals: 'specific-error-students-believe-that' },
                { text: 'दुष्कर', outcome: 'Not quite — **Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_007', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय स्पष्ट न हो, तो c11_hin_v_cbse_05_006 के \'WORKED_EXAMPLE_1\' को दोहराएं.',
          misconception: 'छात्र अक्सर गौण विषय को \'उपकथानक\' (sub-plot) या \'प्रसंगिक विवरण\' (incidental detail) समझ लेते हैं — वे सोचते हैं कि कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'वितान भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो, तो c11_hin_v_cbse_05_006 के \'WORKED_EXAMPLE_1\' को दोहराएं जहां मुख्य.',
                  misconception: 'छात्र अक्सर गौण विषय को \'उपकथानक\' (sub-plot) या \'प्रसंगिक विवरण\' (incidental detail) समझ लेते हैं — वे सोचते हैं कि कोई भी छोटी घटना या.' }
          ],
            remediations: { 'sub-plot-incidental-detail': { steps: ['चरण 1: छात्र से कहें — "पाठ के 5 मुख्य प्रसंग लिखो जो तुम्हें याद हैं।" चरण 2: प्रत्येक प्रसंग के आगे लिखवाएं — "इस.', '(घटना नहीं, विचार — जैसे: \'विश्वासघात\', \'आशा\', \'पलायन\')।" चरण 3: अब मुख्य विषय (पिछले नोड से) लिखवाएं और पूछें: "कौन-से.', 'कौन-से समानांतर चल रहे हैं?" चरण 4: समानांतर चलने वाले विचारों में से वे चुनें जो कम से कम दो बार उभरे हों — वही गौण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_008', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Re-read the chapter summary and theme analysis (node 006) to anchor device-hunting in the.',
          misconception: 'Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory, olfactory, tactile.',
          parts: [
                { id: 'a', prompt: 'Compare the metaphor "जिंदगी एक बोझ है" (life is a burden) with "जिंदगी एक नदी है" (life is a river).', answer: '"Burden" implies weight, exhaustion, and a desire to drop it',
                  options: ['"Burden" implies weight, exhaustion, and a desire to drop it', 'the sky was blue', 'imagery is *only* visual description (e'],
                  hint: 'Re-read the chapter summary and theme analysis (node 006) to anchor device-hunting in the central.',
                  misconception: 'Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory, olfactory, tactile, and gustatory.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['Take the student to a well-known Hindi poem (e.g., Nirala\'s "सरोज स्मृति") and explicitly label *five* sensory images.', 'Give two sentences: "वह शेर है" vs "वह शेर जैसा है".', 'Ask: "Which one makes \'he\' *become* the lion?', 'What qualities of lion now belong to \'he\'?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory, olfactory, tactile.',
          parts: [
                { id: 'a', prompt: 'Critique this student claim: "The metaphor \'आशा की किरण\' (ray of hope) is clichéd and therefore ineffective in the chapter\'s climax." Defend or refute using.', answer: 'Refute: While common, its effectiveness here depends on *contextual preparation*',
                  options: ['Refute: While common, its effectiveness here depends on *contextual preparation*', 'the sky was blue', 'imagery is *only* visual description (e'],
                  hint: 'Re-read the chapter summary and theme analysis (node 006) to anchor device-hunting in the central.',
                  misconception: 'Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory, olfactory, tactile, and gustatory.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['Take the student to a well-known Hindi poem (e.g., Nirala\'s "सरोज स्मृति") and explicitly label *five* sensory images.', 'Give two sentences: "वह शेर है" vs "वह शेर जैसा है".', 'Ask: "Which one makes \'he\' *become* the lion?', 'What qualities of lion now belong to \'he\'?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_009', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review node 008 (Imagery and Metaphor) focusing on the difference between.',
          misconception: 'Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the burning pyre") is.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the narrator\'s father says, "हम जल्दी लौट आएंगे" (We will return soon) while locking the house forever.', answer: 'This is verbal irony',
                  options: ['This is verbal irony', 'situational irony', 'the burning pyre'],
                  hint: 'If stuck, review node 008 (Imagery and Metaphor) focusing on the difference between *comparison*.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the burning pyre") is a symbol.' },
                { id: 'b', prompt: 'Compare the irony in the father\'s promise to return with the symbolism of the "टूटी हुई चारपाई" (broken cot) left behind.', answer: 'The father\'s verbal irony (promise vs',
                  options: ['The father\'s verbal irony (promise vs', 'the burning pyre'],
                  hint: 'If stuck, review node 008 (Imagery and Metaphor) focusing on the difference between *comparison*.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the burning pyre") is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Re-teach the distinction: Imagery appeals to senses; symbolism assigns *reप्रस्तुतिal* meaning.', 'Use a non-text example: a wedding ring (image: gold circle) vs.', 'symbol (eternal commitment).', 'For irony, create a 3-column table: Type | Definition | Text Example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_010', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review **\'भावार्थ और लक्षणा\' (Connotation and Suggested Meaning)** from Class.',
          misconception: '**Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s "शब्दार्थ" (glossary).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'वितान भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review **\'भावार्थ और लक्षणा\' (Connotation and Suggested Meaning)** from Class 10 Hindi.',
                  misconception: '**Specific Error:** Students believe that "मुख्य शब्द" = **words that appear in the textbook\'s "शब्दार्थ" (glossary) box** or **words the.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Targeted Remediation (4 Steps):** 1.', '**De-glossary Drill:** Give a 100-word unseen passage *without* a glossary.', 'Ask: "Circle 5 words that, if removed, would make the passage meaningless / change its core argument." Compare circles.', '**Morphological Expansion Exercise:** Take ONE candidate word (e.g., "याद").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_011', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'Review Class 10 Hindi Vyakaran: समास के भेद व विग्रह, वाच्य परिवर्तन (कर्तृ/कर्मणी), और.',
          misconception: 'Students treat "grammar in text" as **spotting isolated rules** (e.g., "here is a passive verb") rather than **tracing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'वितान भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review Class 10 Hindi Vyakaran: समास के भेद व विग्रह, वाच्य परिवर्तन (कर्तृ/कर्मणी), और अव्यय/योजक.',
                  misconception: 'Students treat "grammar in text" as **spotting isolated rules** (e.g., "here is a passive verb") rather than **tracing a grammatical.' }
          ],
            remediations: { 'students-treat-grammar-in-text': { steps: ['**Isolate one paragraph** (3-4 sentences) from the text.', '**Color-code**: verbs (blue), connectives (red), compounds (green), nominalizations (orange).', '**Ask for each color**: "What work does this do *in this sentence* and *for the paragraph\'s argument*?" 4.', '**Rewrite the paragraph** in simple active voice with no compounds — read both aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_012', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो पहले नोड 006 (मुख्य विषय) और 008-009 (साहित्यिक युक्तियाँ) दोहराएँ — ये.',
          misconception: 'विद्यार्थी समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है "अपनी मनमर्जी की राय लिख दो" — इसलिए वे पाठ के साक्ष्य दिए बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'वितान भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो पहले नोड 006 (मुख्य विषय) और 008-009 (साहित्यिक युक्तियाँ) दोहराएँ — ये आशय-सूचक.',
                  misconception: 'विद्यार्थी समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है "अपनी मनमर्जी की राय लिख दो" — इसलिए वे पाठ के साक्ष्य दिए बिना सामान्य ज्ञान या नैतिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी को एक छोटा अनुच्छेद दें और कहें — "केवल वही लिखो जो यहाँ लिखा है" (वस्तुनिष्ठ अभ्यास)। चरण 2: उसी.', 'पाठ से दो वाक्य उठाकर सिद्ध करो" (आशय-सूचक अभ्यास)। चरण 3: उसके उत्तर में \'साक्ष्य\' और \'व्याख्या\' अलग-अलग रंग से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
