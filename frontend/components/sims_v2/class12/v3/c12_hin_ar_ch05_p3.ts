import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p3',
    title: 'उषा · Part 3/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'उषा · Part 3/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_013', 'c12_hin_ar_cbse_05_014', 'c12_hin_ar_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'उषा — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (Interpretation/Explanation of Purport) वह प्रक्रिया है जिसमें काव्य-पंक्तियों के शब्दार्थ से आगे बढ़कर उनके गहन भाव, प्रसंगानुकूल अभिप्राय, अलंकारिक सौंदर्य और कवि के अभीष्ट संदेश को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['उषा — आशय-स्पष्टीकरण और', 'उषा — परीक्षा-उत्तर लेखन', 'उषा — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (Interpretation/Explanation of Purport) वह प्रक्रिया है जिसमें.',
          hint: 'यदि किसी पंक्ति का **भावार्थ नहीं खुल रहा**, तो तुरंत c12_hin_ar_cbse_05_002 (पद्यांश-वार.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **आशय-स्पष्टीकरण = शब्दार्थ + अनुवाद**। वे पंक्ति-दर-पंक्ति हिंदी अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण (Interpretation/Explanation of Purport) वह प्रक्रिया है जिसमें',
                  options: ['आशय-स्पष्टीकरण (Interpretation/Explanation of Purport) वह प्रक्रिया है जिसमें', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि किसी पंक्ति का **भावार्थ नहीं खुल रहा**, तो तुरंत c12_hin_ar_cbse_05_002 (पद्यांश-वार भावार्थ).',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **आशय-स्पष्टीकरण = शब्दार्थ + अनुवाद**। वे पंक्ति-दर-पंक्ति हिंदी अर्थ लिखकर समझते हैं कि.' }
          ],
            remediations: { 'cbse-3-5-context': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_05_002 (पद्यांश-वार भावार्थ) और c12_hin_ar_cbse_05_007 (प्रतीक और बिंब) — वहाँ दिए गए.', '**अभ्यास:** \'उषा\' के किसी एक पद्यांश को लेकर **PEEL शीट** बनाएँ — Point (क्या कहना है), Evidence (कौन-सी पंक्ति/शब्द).', '**परीक्षण:** c12_hin_ar_cbse_05_012 (बोध-प्रश्न) के **आशय-सूचक प्रश्नों** को हल करें और अपने उत्तरों को मार्किंग स्कीम.', '**फीडबैक:** शिक्षक/सहपाठी से पूछें: "मेरे उत्तर में कौन-सा बिंदु (प्रसंग/भाव/अलंकार/केंद्रीय भाव/शैली) छूटा है?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल, CBSE बोर्ड परीक्षा के मानक (marking scheme) और.',
          hint: 'यदि PEEL संरचना में फँसें, तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_014) या.',
          misconception: '**विशिष्ट भ्रांति:** *"लंबा उत्तर = अधिक अंक"* — छात्र मानते हैं कि 5 अंकों के प्रश्न में **पूरी कविता का भावार्थ** लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल, CBSE बोर्ड परीक्षा के मानक (marking scheme) और समय-सीमा के',
                  options: ['परीक्षा-उत्तर लेखन कौशल, CBSE बोर्ड परीक्षा के मानक (marking scheme) और समय-सीमा के', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि PEEL संरचना में फँसें, तो कक्षा 11 के \'जाग तुझको दूर जाना\' (c11_hin_a_cbse_13_014) या.',
                  misconception: '**विशिष्ट भ्रांति:** *"लंबा उत्तर = अधिक अंक"* — छात्र मानते हैं कि 5 अंकों के प्रश्न में **पूरी कविता का भावार्थ** लिख देने से पूरे अंक.' }
          ],
            remediations: { '5-cbse-conciseness-relevance-2023': { steps: ['**तत्काल निदान:** छात्र से पिछले वर्ष के बोर्ड पेपर का कोई 5-अंकीय प्रश्न लेकर **टाइमर लगा कर 7 मिनट में उत्तर.', '**PEEL ड्रिल:** उसी प्रश्न पर **केवल PEEL संरचना में बुलेट पॉइंट्स** बनवाएँ (पूर्ण वाक्य नहीं)। फिर उन बुलेट्स को 80-90.', '**उद्धरण-चयन अभ्यास:** कविता से 10 पंक्तियाँ दें, छात्र से कहें — *"इनमें से केवल वे 2 पंक्तियाँ छाँटो जो इस प्रश्न का.', '**पुनः निदान:** एक सप्ताह बाद नया प्रश्न देकर वही प्रक्रिया दोहराएँ — अब अंक सुधार और समय पालन दोनों जाँचें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_015', difficulty: 'standard',
          question: 'वाचन-पाठ कविता के शब्दों को सही उच्चारण, लय, गति और भाव के साथ मौखिक रूप से.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_05_005 (छंद-लय) और c12_hin_ar_cbse_05_007 (प्रतीक-बिंब) पर.',
          misconception: 'छात्र समझते हैं कि वाचन-पाठ = \'तेज़ और साफ़ बोलना\'। वास्तव में वाचन-पाठ = \'भावानुसार स्वर-विधान\'। उदाहरण: "उषा!',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ कविता के शब्दों को सही उच्चारण, लय, गति और भाव के साथ मौखिक रूप से प्रस्तुत करने',
                  options: ['वाचन-पाठ कविता के शब्दों को सही उच्चारण, लय, गति और भाव के साथ मौखिक रूप से प्रस्तुत करने', 'उषा — कवि परिचय और पृष्ठभूमि का तात्पर्य कवियत्री उषा के व्यक्तिगत जीवन, साहित्यिक', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza) का स्वतंत्र अर्थ', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_05_005 (छंद-लय) और c12_hin_ar_cbse_05_007 (प्रतीक-बिंब) पर लौटें.',
                  misconception: 'छात्र समझते हैं कि वाचन-पाठ = \'तेज़ और साफ़ बोलना\'। वास्तव में वाचन-पाठ = \'भावानुसार स्वर-विधान\'। उदाहरण: "उषा!' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को c12_hin_ar_cbse_05_005 (छंद और लय-विधान) दोबारा पढ़वाएँ और प्रत्येक पद को ताली बजाकर लय में बोलने को कहें। 2.', 'c12_hin_ar_cbse_05_007 (प्रतीक और बिंब) से दो बिंब चुनवाएँ और पूछें: "इस बिंब को पढ़ते समय तुम्हारा चेहरा कैसा होगा?".', 'एक पद रिकॉर्ड करवाएँ, फिर शिक्षक का आदर्श वाचन सुनवाएँ; अंतर पहचानने को कहें। 4.', 'पुनः निदान: DIAGNOSTIC_QUESTION_3 दोहराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
