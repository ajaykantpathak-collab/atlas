import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch14_p3: SimDef = {
    id: 'v3_c11_hin_a_ch14_p3',
    title: 'बादल को घरिते देखा है · Part 3/3',
    subtitle: 'यह नोड केवल \'बादल को घरिते देखा है\' कविता के पद्यांशों के आशय-स्पष्टीकरण की **विधि.',
    classLevel: 11, subject: 'hin_a', topic: 'बादल को घरिते देखा है · Part 3/3',
    chapters: ['c11_hin_a_ch14'],
    nodeIds: ['c11_hin_a_cbse_14_013', 'c11_hin_a_cbse_14_014', 'c11_hin_a_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'बादल को घिरते देखा है\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'बादल को घरिते देखा है — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'बादल को घिरते देखा है\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['बादल को घरिते देखा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'You finished बादल को घरिते देखा है — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_013', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फंसे हों तो c11_hin_a_cbse_14_002 (भावार्थ) और c11_hin_a_cbse_14_004 (केंद्रीय भाव).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-स्पष्टीकरण = कठिन शब्दों के अर्थ + अलंकारों के नाम + कवि का नाम"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' का आलोचनात्मक चिंतन',
                  options: ['\'बादल को घिरते देखा है\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हों तो c11_hin_a_cbse_14_002 (भावार्थ) और c11_hin_a_cbse_14_004 (केंद्रीय भाव) दोहराएं.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-स्पष्टीकरण = कठिन शब्दों के अर्थ + अलंकारों के नाम + कवि का नाम"। वे **\'क्या\' (What.' }
          ],
            remediations: { 'what-content-how-why-craft': { steps: ['**लक्षित उपचार (3-चरणीय):** 1.', '**\'क्या vs क्यों\' अभ्यास:** छात्र को 5 पद्यांश दें। प्रत्येक के लिए दो कॉलम बनवाएं: बायाँ — "क्या लिखा है?" (केवल.', '**\'अलंकार-कार्य\' मैपिंग:** एक शीट दें जहाँ अलंकारों के नाम न हों, केवल उनके **कार्य** लिखे हों (जैसे: "तीव्रता दिखाना".', '**माइक्रो-आशय लेखन:** पूरे पद्यांश के बजाय **एक पंक्ति** का आशय-स्पष्टीकरण 50 शब्दों में लिखने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_014', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_14_013 (आशय-स्पष्टीकरण और विश्लेषण)** के.',
          misconception: 'छात्र मानते हैं कि **\'पंक्तियाँ उद्धृत कर देना ही साक्ष्य (Evidence) देना है\'** — वे पंक्ति लिखते हैं और अगले वाक्य में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' पर पाठ-आधारित लेखन',
                  options: ['\'बादल को घिरते देखा है\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_14_013 (आशय-स्पष्टीकरण और विश्लेषण)** के \'पंक्ति-अन्वेषण.',
                  misconception: 'छात्र मानते हैं कि **\'पंक्तियाँ उद्धृत कर देना ही साक्ष्य (Evidence) देना है\'** — वे पंक्ति लिखते हैं और अगले वाक्य में नया बिंदु शुरू कर.' }
          ],
            remediations: { 'evidence-unpacking-the-quote': { steps: ['छात्र को एक **कमजोर उत्तर** (केवल उद्धरण, बिना व्याख्या) और **बलवान उत्तर** (उद्धरण+व्याख्या+संबंध) साथ रखकर दिखाओ.', 'उसे **\'उद्धरण-अन्वेषण\' (Quote-Unpacking) ड्रिल** कराओ: रोज एक पंक्ति लो, 3 वाक्य उसकी व्याख्या में लिखो (अर्थ, शिल्प.', '**PEEL चेकलिस्ट** वाला टेम्पलेट दो: P□ E□ E□ L□ — हर उत्तर लिखने के बाद टिक करे। 4.', '3 अंक के 5 प्रश्नों का **टाइम्ड अभ्यास** (7 मिनट/प्रश्न) कराओ, फिर स्वयं चेकलिस्ट से जाँचने को कहो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_14_015', difficulty: 'standard',
          question: '\'बादल को घिरते देखा है\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_14_002 (पद्यांश-वार भावार्थ)** और **c11_hin_a_cbse_14_007.',
          misconception: 'छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है \'प्रश्नों की सूची\' तैयार करना** — जैसे "कवि कौन है?", "छंद क्या है?".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बादल को घिरते देखा है\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'बादल को घिरते देखा है\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'बादल को घिरते देखा है\' का कथानक', '\'बादल को घिरते देखा है\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_14_002 (पद्यांश-वार भावार्थ)** और **c11_hin_a_cbse_14_007.',
                  misconception: 'छात्र समझते हैं कि **\'चर्चा-बिंदु\' का अर्थ है \'प्रश्नों की सूची\' तैयार करना** — जैसे "कवि कौन है?", "छंद क्या है?", "कठिन शब्दों के अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **एक छोटी कविता (4-6 पंक्तियाँ)** दें और कहें: "इसके लिए **पाँच तथ्यात्मक प्रश्न** और **पाँच व्याख्यात्मक.', 'फिर पूछें: "कौन-से प्रश्न चर्चा को लंबा और गहरा ले जाएँगे?', 'क्यों?" — इससे **प्रश्न-प्रकार का भेद** स्पष्ट होगा। 3.', 'अब उसी कविता पर **दो छात्रों की नकली चर्चा** लिखवाएँ — एक केवल सहमत, दूसरा तर्क से असहमत। छात्र से कहें: "बताओ किस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
