import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch16_p3: SimDef = {
    id: 'v3_c11_hin_a_ch16_p3',
    title: 'घर में वापसी · Part 3/3',
    subtitle: 'यह नोड \'घर में वापसी\' कविता के विशिष्ट पद्यांशों पर केंद्रित आशय-स्पष्टीकरण और विश्लेषण.',
    classLevel: 11, subject: 'hin_a', topic: 'घर में वापसी · Part 3/3',
    chapters: ['c11_hin_a_ch16'],
    nodeIds: ['c11_hin_a_cbse_16_013', 'c11_hin_a_cbse_16_014', 'c11_hin_a_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'क्या आपने कभी कोई पुरानी चिट्ठी पढ़ी है जहाँ शब्द कम हैं पर अर्थ गहरे?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'घर में वापसी — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण का अर्थ है काव्य-पंक्तियों के प्रत्यक्ष अर्थ को सरल भाषा में खोलकर लिखना, जबकि विश्लेषण का अर्थ है उन पंक्तियों में निहित गूढ़ भाव, प्रतीक-योजना, अलंकारिक सौंदर्य, छंद-विधान और कवि के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_16_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['घर में वापसी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c11_hin_a_cbse_16_014', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Point लिखें — प्रश्न के कीवर्ड (द्वैत, सीमा, संक्रमण).', 'पाठ्य साक्ष्य (Evidence) खोजें — पद 4 में "दहलीज पर ठिठके.', 'प्रश्न का विखंडन करें — निर्देशक: "स्पष्ट कीजिए" (व्याख्या.', 'शब्द गणना जांचें (70-80 शब्द) और रुब्रिक मिलान करें (1.', 'PEEL संरचना में पूर्ण उत्तर गढ़ें — Evidence को Explanation.'], answer: 'प्रश्न का विखंडन करें — निर्देशक: "स्पष्ट कीजिए" (व्याख्या. पाठ्य साक्ष्य (Evidence) खोजें — पद 4 में "दहलीज पर ठिठके. Point लिखें — प्रश्न के कीवर्ड (द्वैत, सीमा, संक्रमण). PEEL संरचना में पूर्ण उत्तर गढ़ें — Evidence को Explanation. शब्द गणना जांचें (70-80 शब्द) और रुब्रिक मिलान करें (1.' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'You finished घर में वापसी — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण का अर्थ है काव्य-पंक्तियों के प्रत्यक्ष अर्थ को सरल भाषा में.',
          hint: 'अगर अटके तो c11_hin_a_cbse_16_002 (भावार्थ) और c11_hin_a_cbse_16_007 (प्रतीक-बिंब) दोबारा.',
          misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण = शब्दार्थ लिखना और विश्लेषण = अलंकारों के नाम गिनाना। वास्तव में आशय-स्पष्टीकरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण का अर्थ है काव्य-पंक्तियों के प्रत्यक्ष अर्थ को सरल भाषा में खोलकर लिखना,',
                  options: ['आशय-स्पष्टीकरण का अर्थ है काव्य-पंक्तियों के प्रत्यक्ष अर्थ को सरल भाषा में खोलकर लिखना,', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'अगर अटके तो c11_hin_a_cbse_16_002 (भावार्थ) और c11_hin_a_cbse_16_007 (प्रतीक-बिंब) दोबारा पढ़ें.',
                  misconception: 'छात्र समझते हैं कि आशय-स्पष्टीकरण = शब्दार्थ लिखना और विश्लेषण = अलंकारों के नाम गिनाना। वास्तव में आशय-स्पष्टीकरण पंक्तियों के *तार्किक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पहले पद्यांश को अपनी भाषा में किसी मित्र को सुनाओ जैसे कहानी सुना रहे हो" (यह आशय निकालने का.', 'क्या बदल जाता अगर शब्द बदल देता?" (यह विश्लेषण की ओर ले जाता है)। चरण 3: एक मॉडल उत्तर दिखाएँ जहाँ आशय और विश्लेषण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) is the structured ability.',
          hint: 'If stuck, revisit **c11_hin_a_cbse_16_007 (प्रतीक और बिंब)** and **c11_hin_a_cbse_16_013.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"अधिक लिखना = अधिक अंक"** और **"सुंदर भाषा/अलंकार प्रयोग = अच्छे अंक"**। **ठीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) is the structured ability to decode a',
                  options: ['परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) is the structured ability to decode a', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'If stuck, revisit **c11_hin_a_cbse_16_007 (प्रतीक और बिंब)** and **c11_hin_a_cbse_16_013.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"अधिक लिखना = अधिक अंक"** और **"सुंदर भाषा/अलंकार प्रयोग = अच्छे अंक"**। **ठीक विपरीत:** CBSE हिंदी.' }
          ],
            remediations: { 'cbse-word-limit-3-50': { steps: ['**चरणबद्ध सुधार (3 दिन का माइक्रो-प्लान):** **दिन 1 — प्रश्न-विखंडन अभ्यास:** पिछले 5 वर्षों के CBSE प्रश्न-पत्रों से.', 'सटीक Evidence (पद संख्या/पंक्ति) अनिवार्य। **दिन 3 — टाइम्ड पूर्ण उत्तर:** 3 प्रश्न चुनिए (3, 4, 6 अंक)। घड़ी लगाकर.', '**मंत्र:** "सही ढांचे में कम लिखो, गलत ढांचे में ज्यादा नहीं।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_015', difficulty: 'standard',
          question: 'वाचन-पाठ कविता को **सस्वर, उचित विराम, बलाघात और लय के साथ पढ़ने** की प्रक्रिया.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_16_003 (पद्य-विन्यास) के \'विराम-चिह्न और पंक्ति-भंग\' खंड**.',
          misconception: 'विद्यार्थी समझते हैं कि **\'अच्छा वाचन\' = \'तेज, स्पष्ट, बिना अटके पढ़ना\'**। वे कविता को **समाचार वाचन** जैसा मानते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ कविता को **सस्वर, उचित विराम, बलाघात और लय के साथ पढ़ने** की प्रक्रिया है जिससे',
                  options: ['वाचन-पाठ कविता को **सस्वर, उचित विराम, बलाघात और लय के साथ पढ़ने** की प्रक्रिया है जिससे', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_16_003 (पद्य-विन्यास) के \'विराम-चिह्न और पंक्ति-भंग\' खंड** को दोहराएँ.',
                  misconception: 'विद्यार्थी समझते हैं कि **\'अच्छा वाचन\' = \'तेज, स्पष्ट, बिना अटके पढ़ना\'**। वे कविता को **समाचार वाचन** जैसा मानते हैं: गति, उच्चारण शुद्धता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल वाचन सुनाएँ:** शिक्षक/ऑडियो से उसी पद का **आदर्श वाचन** सुनें — ध्यान दें: कहाँ रुके, कहाँ स्वर बदला, कहाँ साँस.', '**\'कॉमा-खेल\' अभ्यास:** एक वाक्य लें — \'राम, गया, बाजार।\' तीन बार पढ़ें: (अ) हर कॉमा पर २ सेकंड रुकें, (ब) कॉमा पर न.', '**भाव-लय मिलान:** कविता के ४ पदों के **केंद्रीय भाव** लिखें; फिर प्रत्येक को **अनुचित लय** (खुशी के पद को शोक-लय में).', '**स्व-रिकॉर्डिंग तुलना:** अपना वाचन रिकॉर्ड कर मॉडल से मिलाएँ — **तीन अंतर** लिखें। यही आपका सुधार-मार्ग है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
