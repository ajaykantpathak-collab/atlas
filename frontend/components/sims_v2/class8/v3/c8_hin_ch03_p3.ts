import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch03_p3: SimDef = {
    id: 'v3_c8_hin_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'यह नोड पाठ 3 के संदर्भ में विश्लेषण और व्याख्या की *प्रक्रिया* सिखाता है — साक्ष्य-आधारित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c8_hin_ch03'],
    nodeIds: ['c8_hin_cbse_03_013', 'c8_hin_cbse_03_014', 'c8_hin_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने एक फिल्म देखी और दोस्त पूछता है "कैसी लगी?" — तुम सिर्फ "अच्छी थी" नहीं कहते, बल्कि बताते हो.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक साहित्यिक कौशल है जिसमें पाठ के घटकों (कथानक, पात्र, भाषा, युक्तियाँ) को अलग-अलग करके उनकी आंतरिक संरचना, अंतर्संबंध और लेखक के उद्देश्य की जाँच की जाती है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य या पद्य) के विशिष्ट अंशों.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — चर्चा-बिंदु वे विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या सुनने के बाद विद्यार्थियों.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 3 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक साहित्यिक कौशल है जिसमें पाठ के घटकों.',
          hint: 'यदि अटका हुआ लगे: c8_hin_cbse_03_008 (बिंब/रूपक), c8_hin_cbse_03_009 (विरोधाभास/प्रतीक).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "विश्लेषण" का अर्थ है पाठ में प्रयुक्त अलंकारों (रूपक, उपमा, अनुप्रास) की *सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक साहित्यिक कौशल है जिसमें पाठ के घटकों (कथानक,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक साहित्यिक कौशल है जिसमें पाठ के घटकों (कथानक,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटका हुआ लगे: c8_hin_cbse_03_008 (बिंब/रूपक), c8_hin_cbse_03_009 (विरोधाभास/प्रतीक), और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "विश्लेषण" का अर्थ है पाठ में प्रयुक्त अलंकारों (रूपक, उपमा, अनुप्रास) की *सूची बनाना* — जैसे "यहाँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग:** एक छोटा अंश (2-3 पंक्तियाँ) लो। छात्र से पूछो: "यहाँ कौन-सी युक्ति है?" (पहचान)। फिर पूछो: "यदि लेखक इसकी.', '**संयुक्त अभ्यास:** तीन उदाहरण दो जहाँ एक ही युक्ति (रूपक) अलग-अलग काम करती है — छात्र को प्रत्येक का कार्य लिखना है। 3.', '**\'क्यों\' का नियम:** हर बार जब छात्र युक्ति पहचाने, तुरंत पूछो: "लेखक ने *यही* युक्ति *यहाँ* क्यों चुनी?', 'विकल्प क्या थे?" — इसे आदत बनाओ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य या पद्य) के विशिष्ट.',
          hint: 'यदि फँसें तो **c8_hin_cbse_03_013 (आलोचनात्मक चिंतन)** दोहराएँ — विशेष रूप से \'साक्ष्य से.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से उद्धरण (quote) दे देना ही पर्याप्त साक्ष्य (evidence) है"**। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य या पद्य) के विशिष्ट अंशों,',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए पाठ (गद्य या पद्य) के विशिष्ट अंशों,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि फँसें तो **c8_hin_cbse_03_013 (आलोचनात्मक चिंतन)** दोहराएँ — विशेष रूप से \'साक्ष्य से निष्कर्ष\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से उद्धरण (quote) दे देना ही पर्याप्त साक्ष्य (evidence) है"**। वे लिखते हैं: *"पंक्ति है: \'वह.' }
          ],
            remediations: { 'quote-evidence': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**"उद्धरण बनाम व्याख्या" टेबल बनवाएँ:** दो कॉलम — बाएँ: पाठ की 3 पंक्तियाँ (उद्धरण), दाएँ: प्रत्येक के लिए 2 वाक्य.', '**"क्यों?" खेल खेलें:** छात्र एक Point लिखे, आप बार-बार पूछें *"कैसे पता चला?', 'वह पंक्ति यह कैसे साबित करती है?"* — जब तक वह **कारण-कार्य संबंध (causal link)** न बोले। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु वे विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या सुनने के बाद.',
          hint: 'यदि अटके तो c8_hin_cbse_03_013 (आलोचनात्मक चिंतन) और c8_hin_cbse_03_012 (बोध-प्रश्न).',
          misconception: 'विद्यार्थी अक्सर मानते हैं कि चर्चा-बिंदु का अर्थ है "शिक्षक प्रश्न पूछें, हम उत्तर दें" — यह एक-तरफा संवाद है, चर्चा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु वे विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या सुनने के बाद विद्यार्थियों',
                  options: ['चर्चा-बिंदु वे विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या सुनने के बाद विद्यार्थियों', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटके तो c8_hin_cbse_03_013 (आलोचनात्मक चिंतन) और c8_hin_cbse_03_012 (बोध-प्रश्न) दोहराएं — तर्क.',
                  misconception: 'विद्यार्थी अक्सर मानते हैं कि चर्चा-बिंदु का अर्थ है "शिक्षक प्रश्न पूछें, हम उत्तर दें" — यह एक-तरफा संवाद है, चर्चा नहीं। असली चर्चा में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['कक्षा में "मछली-कटोरा" (fishbowl) गतिविधि कराएं: 4-5 विद्यार्थी घेरे में बैठकर चर्चा करें, बाकी बाहर से देखें और नोट.', 'फिर पूरी कक्षा मिलकर विश्लेषण करे: "चर्चा कब गहरी हुई?', 'अगली बार भूमिकाएं बदलें। इससे विद्यार्थी चर्चा के ढांचे को क्रिया में देखते हैं, केवल सिद्धांत में नहीं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
