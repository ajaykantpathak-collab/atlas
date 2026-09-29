import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch18_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch18_p1',
    title: 'मनुष्यता · Part 1/3',
    subtitle: 'यह नोड केवल माखनलाल चतुर्वेदी के जीवन-परिचय, उनके युग (द्विवेदी युग/छायावादोत्तर).',
    classLevel: 10, subject: 'hin_sp', topic: 'मनुष्यता · Part 1/3',
    chapters: ['c10_hin_sp_ch18'],
    nodeIds: ['c10_hin_sp_cbse_18_001', 'c10_hin_sp_cbse_18_002', 'c10_hin_sp_cbse_18_003', 'c10_hin_sp_cbse_18_004', 'c10_hin_sp_cbse_18_005', 'c10_hin_sp_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कवि-परिचय से माखनलाल की तीन पहचानें नोट कीजिए — क्रांतिकारी कवि (\'क्रांति\', \'हिम तरंगिनी\' जैसे काव्यों के.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'तीसरे पद्यांश की इन पंक्तियों का भावार्थ लिखिए: *"जो सुख-दुःख को सम समझे, वही मनुष्य कहलाता है।"* **लागू करें:** भावार्थ के 4 चरण (प्रत्यक्ष, लक्ष्यार्थ.',
        options: ['**Correct Answer with Steps:** 1', 'मनुष्यता = कर्तव्यनिष्ठा + समता', 'सुख-दुःख में फर्क न करो'],
        answer: '**Correct Answer with Steps:** 1',
        hook: '**Specific Error:** Students believe "भावार्थ लिखना" means "कविता का सारांश लिखना" (writing a summary).',
    },
    teaching: [
        { title: 'मनुष्यता — कवि परिचय और पृष्ठभूमि', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल 1889, गवई — नर्मदापुरम/होशंगाबाद, मध्यप्रदेश), स्वतंत्रता आंदोलन में उनकी भूमिका, पत्रकारिता-योग (विशेषतः \'प्रभा\'.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_18_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['मनुष्यता — कवि परिचय', 'मनुष्यता — पद्यांश-वार भावार्थ', 'मनुष्यता — काव्य-संरचना और', 'मनुष्यता — केंद्रीय भाव', 'मनुष्यता — छंद और', 'मनुष्यता — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_18_002', title: 'मनुष्यता — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'अर्थ लिखिए\' का क्रम: शुरुआत अर्थ-लिखिए से, घटनाएँ बढ़ती हैं, अंत \'अर्थ लिखिए\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: '"मनुष्यता" कविता के पहले पद्यांश का **प्रत्यक्ष अर्थ** (literal meaning) लिखिए। केवल वही लिखें जो शब्द सीधे-सीधे कहते हैं, कोई व्याख्या.', options: [
                { text: '**Correct Answer:** पहले पद्यांश में कवि सीधे शब्दों में कहता है कि मनुष्य और पशु में', outcome: '**Correct Answer:** पहले पद्यांश में कवि सीधे शब्दों में कहता है कि मनुष्य और पशु में अंतर यह है कि.' },
                { text: 'कवि मनुष्य की महानता बताता है', outcome: 'Not quite — **Specific Error:** Students believe "भावार्थ लिखना" means "कविता का सारांश लिखना" (writing.', reveals: 'specific-error-students-believe-means' },
                { text: 'मनुष्य को दया करनी चाहिए', outcome: 'Not quite — **Specific Error:** Students believe "भावार्थ लिखना" means "कविता का सारांश लिखना" (writing.', reveals: 'specific-error-students-believe-means' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through मनुष्यता like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? मनुष्यता · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — मनुष्यता · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4.',
          hint: 'यदि अटके, तो कक्षा 9 की किसी भी कविता (जैसे \'साखी\' या \'पद\') का कवि परिचय दोहराएँ और देखें.',
          misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ केवल कवि की जन्मतिथि, मृत्युतिथि, प्रमुख रचनाएँ रटना है। वे यह नहीं देखते कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)', '\'अर्थ लिखिए\' का पात्र-चित्रण'],
                  hint: 'यदि अटके, तो कक्षा 9 की किसी भी कविता (जैसे \'साखी\' या \'पद\') का कवि परिचय दोहराएँ और देखें कि कवि के.',
                  misconception: 'छात्र समझते हैं कि \'कवि परिचय\' का अर्थ केवल कवि की जन्मतिथि, मृत्युतिथि, प्रमुख रचनाएँ रटना है। वे यह नहीं देखते कि बोर्ड परीक्षा में पूछे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कवि की जन्मतिथि भूल जाओ। मुझे तीन घटनाएँ बताओ जिनसे \'मनुष्यता\' कविता निकली।" चरण 2: यदि अटके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_002', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' का कथानक — \'अर्थ लिखिए\' — स्पर्श भाग-2 का पाठ। पाठ का कथानक, पात्र.',
          hint: 'If stuck, review Class 9 "पद्यांश विश्लेषण" technique (Kshitiz Chapter 2/3 poems).',
          misconception: '**Specific Error:** Students believe "भावार्थ लिखना" means "कविता का सारांश लिखना" (writing a summary).',
          parts: [
                { id: 'a', prompt: 'तीसरे पद्यांश की इन पंक्तियों का भावार्थ लिखिए: *"जो सुख-दुःख को सम समझे, वही मनुष्य कहलाता है।"* **लागू करें:** भावार्थ के 4 चरण (प्रत्यक्ष, लक्ष्यार्थ.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'मनुष्यता = कर्तव्यनिष्ठा + समता', 'सुख-दुःख में फर्क न करो', 'आशय स्पष्ट कीजिए'],
                  hint: 'If stuck, review Class 9 "पद्यांश विश्लेषण" technique (Kshitiz Chapter 2/3 poems) — specifically.',
                  misconception: '**Specific Error:** Students believe "भावार्थ लिखना" means "कविता का सारांश लिखना" (writing a summary).' }
          ],
            remediations: { 'specific-error-students-believe-means': { steps: ['**Isolate the stanza:** Give the student a printed copy of the poem with *only one stanza visible* (cover others with.', 'Ask: "केवल इसी के बारे में बोलो।" 2.', '**Color-code the 4 layers:** Use 4 colored pens — Blue for प्रत्यक्ष, Green for लक्ष्यार्थ, Red for अलंकार/बिंब, Black.', '**Stanza-link drill:** After writing meaning for Stanza 3, ask: "यह पद्यांश पद्यांश 2 से कैसे आगे बढ़ता है?" — force.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_003', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.',
          hint: 'अगर विद्यार्थी भावार्थ में अटका है तो पहले c10_hin_sp_cbse_18_002 के \'पद्यांश-वार.',
          misconception: 'विद्यार्थी समझते हैं कि **\'पद्य-विन्यास\' का अर्थ केवल \'छंद पहचानना\' (चौपाई, दोहा, रोला आदि) है** और वे मात्रा गिनने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)',
                  options: ['\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पात्र-चित्रण'],
                  hint: 'अगर विद्यार्थी भावार्थ में अटका है तो पहले c10_hin_sp_cbse_18_002 के \'पद्यांश-वार भावार्थ\' नोड को.',
                  misconception: 'विद्यार्थी समझते हैं कि **\'पद्य-विन्यास\' का अर्थ केवल \'छंद पहचानना\' (चौपाई, दोहा, रोला आदि) है** और वे मात्रा गिनने लगते हैं। जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** विद्यार्थी को कविता का **प्रिंटआउट/फोटोकॉपी** दें और कहें: "इसे पढ़ो मत, **देखो**।" — पदों के आकार, सफेद.', '**दूसरा कदम:** जोर से पढ़वाएँ और **हाथ से इशारा** करवाएँ: "यहाँ रुके?', 'क्यों?" — एनजैम्बमेंट vs एंड-स्टॉप्ड लाइन का भौतिक अनुभव करवाएँ। 3.', '**तीसरा कदम:** एक पद लें (जैसे पद 2) और पूछें: "अगर इसे 3 पंक्तियों में लिख दिया जाए तो क्या बदलेगा?" — संरचना के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_004', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके तो c10_hin_sp_cbse_18_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें और हर पद का भावार्थ.',
          misconception: 'विद्यार्थी समझते हैं कि **केंद्रीय भाव = कविता का सारांश (summary)**। वे पूरी कविता को दो-तीन वाक्यों में निचोड़ देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' का पात्र-चित्रण',
                  options: ['\'अर्थ लिखिए\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_18_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें और हर पद का भावार्थ अपने.',
                  misconception: 'विद्यार्थी समझते हैं कि **केंद्रीय भाव = कविता का सारांश (summary)**। वे पूरी कविता को दो-तीन वाक्यों में निचोड़ देते हैं और समझते हैं कि.' }
          ],
            remediations: { 'summary': { steps: ['विद्यार्थी को कविता का **पहला और अंतिम पद** आमने-सामने रखकर पढ़वाएँ और पूछें: "पहले क्या समस्या थी?', 'अंत में क्या समाधान मिला?" — इससे केंद्रीय भाव **समस्या-समाधान ढाँचे** में दिखेगा। 2.', 'रस के लिए **\'रस-चक्र\' चार्ट** बनवाएँ: एक टेबल में आलम्बन, उद्दीपन, अनुभाव, संचारी भाव के कॉलम बनाएँ और कविता के तीन.', '**करुण vs शांत vs वात्सल्य** के भेद के लिए तीन छोटे-छोटे दृश्य (वाक्य) दें और पूछें: "यहाँ कौन-सा रस है और क्यों?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_005', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते.',
          hint: 'अगर मात्रा गिनने में अटके: **\'मात्रा-चिह्न लगाओ\' अभ्यास** — प्रत्येक शब्द के नीचे पेंसिल.',
          misconception: 'छात्र **\'छंद\' को \'तुक/राइम\' (अंत्यानुप्रास) समझ लेते हैं** — वे सोचते हैं कि अगर पंक्तियों के अंत में तुक मिल रही है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' के सहायक पात्र',
                  options: ['\'अर्थ लिखिए\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर मात्रा गिनने में अटके: **\'मात्रा-चिह्न लगाओ\' अभ्यास** — प्रत्येक शब्द के नीचे पेंसिल से । और ऽ.',
                  misconception: 'छात्र **\'छंद\' को \'तुक/राइम\' (अंत्यानुप्रास) समझ लेते हैं** — वे सोचते हैं कि अगर पंक्तियों के अंत में तुक मिल रही है (जैसे \'पढ़ो/बढ़ो\') तो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **मात्रा-गणना का अभ्यास** कराएँ: 10 सरल शब्द लें (जैसे \'मनुष्य\', \'जगत\', \'दीपक\'), प्रत्येक के नीचे मात्रा-चिह्न.', '**गण-चक्र (8 गण: म, य, र, स, त, ज, भग, न)** को एक चार्ट पर लिखवाएँ और रटवाएँ नहीं — प्रत्येक गण का मात्रा-रूप (जैसे.', 'कविता की **एक पंक्ति को मिलकर विश्लेषित करें**: पहले मात्राएँ गिनें, फिर 4-4 के समूह बनाएँ, फिर गण नाम दें, फिर यति.', 'अंत में पूछें: "अगर यहाँ गुरु के बदले लघु आ जाए तो लय कैसे बदलेगी?" — यह \'लय-विधान\' की संवेदनशीलता जागृत करेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_18_006', difficulty: 'standard',
          question: '\'अर्थ लिखिए\' का मुख्य विषय — \'अर्थ लिखिए\' का केंद्रीय भाव और संदेश',
          hint: 'Review c10_hin_sp_cbse_18_002 (padyaansh-var bhavarth) and c10_hin_sp_cbse_18_004.',
          misconception: 'Students memorize alankar definitions (upama = "jaise/waisa", rupak = "hai") and hunt for keywords, but **fail.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अर्थ लिखिए\' का मुख्य विषय',
                  options: ['\'अर्थ लिखिए\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = माखनलाल चतुर्वेदी का जीवन-वृत्त (जन्म 4 अप्रैल', '\'अर्थ लिखिए\' का कथानक', '\'अर्थ लिखिए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review c10_hin_sp_cbse_18_002 (padyaansh-var bhavarth) and c10_hin_sp_cbse_18_004 (kendriya bhav.',
                  misconception: 'Students memorize alankar definitions (upama = "jaise/waisa", rupak = "hai") and hunt for keywords, but **fail to distinguish between upama.' }
          ],
            remediations: { 'students-memorize-alankar-definitions-upama': { steps: ['Give the student two nearly identical lines — "वह शेर जैसा बहादुर है" (upama) vs "वह शेर है बहादुरी में" (rupak) — ask.', 'Return to the poem line "नदी न संचय नीर" — ask: "क्या कवि कह रहा है नदी *जैसी* है मनुष्य, या नदी *ही* है मनुष्य?" Guide.', 'Practice 3 more poem lines (from Sparsh/other chapters) where comparative marker is absent — have them write: "Alankar.', 'Finally, ask them to re-write their earlier wrong answer for "नदी न संचय नीर" correctly — this consolidation locks the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
