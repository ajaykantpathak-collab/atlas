import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch15_p3: SimDef = {
    id: 'v3_c11_hin_a_ch15_p3',
    title: 'हस्तक्षेप · Part 3/3',
    subtitle: 'This node covers the *methodology* and *practice* of writing board-standard "आशय स्पष्ट.',
    classLevel: 11, subject: 'hin_a', topic: 'हस्तक्षेप · Part 3/3',
    chapters: ['c11_hin_a_ch15'],
    nodeIds: ['c11_hin_a_cbse_15_013', 'c11_hin_a_cbse_15_014', 'c11_hin_a_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'हस्तक्षेप\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'हस्तक्षेप — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'हस्तक्षेप\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['हस्तक्षेप — आशय-स्पष्टीकरण और', 'हस्तक्षेप — परीक्षा-उत्तर लेखन', 'हस्तक्षेप — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You finished हस्तक्षेप — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_013', difficulty: 'standard',
          question: '\'हस्तक्षेप\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck, review **प्रतीक और बिंब (c11_hin_a_cbse_15_007)** and **केंद्रीय भाव.',
          misconception: '**विशिष्ट भ्रांति:** *"आशय-स्पष्टीकरण का अर्थ है पद्यांश का \'सरल हिंदी अनुवाद\' लिख देना।"* **गलत तर्क का स्रोत:** कक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' का आलोचनात्मक चिंतन',
                  options: ['\'हस्तक्षेप\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **प्रतीक और बिंब (c11_hin_a_cbse_15_007)** and **केंद्रीय भाव.',
                  misconception: '**विशिष्ट भ्रांति:** *"आशय-स्पष्टीकरण का अर्थ है पद्यांश का \'सरल हिंदी अनुवाद\' लिख देना।"* **गलत तर्क का स्रोत:** कक्षा 10 तक \'भावार्थ\'.' }
          ],
            remediations: { '10-11-suggestion': { steps: ['**लक्षित उपचार (3-चरणीय):** 1.', '**माइक्रो-ड्रिल:** छात्र को कविता के **केवल एक युग्म** (couplet) दें। कहें: *"इसका अनुवाद मत लिखो। केवल तीन प्रश्नों के.', '(ख) किन दो शब्दों में सबसे अधिक \'भार\' (weight) है और क्यों?', '(ग) यह युग्म कविता के तर्क को किस दिशा में मोड़ता है?"* — 5 मिनट में लिखवाएँ। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_014', difficulty: 'standard',
          question: '\'हस्तक्षेप\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फँसें तो **\'पद्यांश-वार भावार्थ\' (c11_hin_a_cbse_15_002)** और **\'साहित्यिक युक्तियाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"अच्छा उत्तर = कठिन शब्द + लंबे वाक्य + कविता की प्रशंसा"**। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' पर पाठ-आधारित लेखन',
                  options: ['\'हस्तक्षेप\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **\'पद्यांश-वार भावार्थ\' (c11_hin_a_cbse_15_002)** और **\'साहित्यिक युक्तियाँ: प्रतीक और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"अच्छा उत्तर = कठिन शब्द + लंबे वाक्य + कविता की प्रशंसा"**। **वास्तविकता:** CBSE परीक्षा में.' }
          ],
            remediations: { 'cbse-jargon': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहचान कराएँ:** छात्र को एक ही प्रश्न के दो उत्तर दें — एक \'भावस्पष्टीकरण\' (summary-based), दूसरा \'विश्लेषण\'.', '**PEEL का रंगीन अभ्यास:** छात्र अपने लिखे उत्तर में **चार रंगों** से हाइलाइट करे — **नीला (Point), हरा (Evidence), पीला.', '**\'क्यों\' का खेल:** छात्र द्वारा लिखे हर दावे (Point) पर शिक्षक पूछे — *"कविता में कहाँ लिखा है?"* (Evidence माँगना).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_015', difficulty: 'standard',
          question: '\'हस्तक्षेप\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 007 (प्रतीक और बिंब)** और **नोड 013 (आशय-विश्लेषण)** को.',
          misconception: 'छात्र अक्सर मान लेते हैं कि **\'वाचन-पाठ\' का अर्थ केवल \'सही उच्चारण और प्रवाह के साथ पढ़ना\' है** और \'चर्चा-बिंदु\' का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'हस्तक्षेप\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 007 (प्रतीक और बिंब)** और **नोड 013 (आशय-विश्लेषण)** को दोबारा देखें.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि **\'वाचन-पाठ\' का अर्थ केवल \'सही उच्चारण और प्रवाह के साथ पढ़ना\' है** और \'चर्चा-बिंदु\' का अर्थ \'पाठ पर आधारित.' }
          ],
            remediations: { 'interpretive-act': { steps: ['चरण 1: छात्र को **एक ही पद के दो भिन्न वाचन** करवाएँ — पहला \'समाचार-वाचन शैली\' में (सपाट, समान गति), दूसरा \'काव्य-वाचन.', 'अर्थ कैसे बदला?" चरण 2: छात्र से कहें: **"अब तुम तय करो — कवि इस पद को कैसे पढ़वाना चाहेगा?', 'पाठ में कौन-से संकेत हैं (शब्द-चयन, विराम-चिह्न, बिंभ-भार) जो तुम्हारा निर्णय मार्गदर्शित करते हैं?"** चरण 3: छात्र को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
