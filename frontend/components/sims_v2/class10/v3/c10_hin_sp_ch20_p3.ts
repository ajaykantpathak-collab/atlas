import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch20_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch20_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch20_p3',
    title: 'तोप · Part 3/3',
    subtitle: 'This node covers the step-by-step methodology for writing CBSE-style आशय-स्पष्टीकरण.',
    classLevel: 10, subject: 'hin_sp', topic: 'तोप · Part 3/3',
    chapters: ['c10_hin_sp_ch20'],
    nodeIds: ['c10_hin_sp_cbse_20_013', 'c10_hin_sp_cbse_20_014', 'c10_hin_sp_cbse_20_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'स्पर्श भाग-2 — पाठ 20\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: '"तोप" कविता के किसी एक पद में आए "गर्जन" शब्द का आशय स्पष्ट करते हुए बताइए कि कवि ने इस शब्द का चयन "आवाज़" या "ध्वनि" के स्थान पर क्यों किया होगा?',
        options: ['Correct answer: "गर्जन" का आशय है', '(सामान्य, मानवीय) या', '(भौतिक, निष्पक्ष) न चुनकर'],
        answer: 'Correct answer: "गर्जन" का आशय है',
        hook: 'Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).',
    },
    teaching: [
        { title: 'तोप — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'स्पर्श भाग-2 — पाठ 20\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_20_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तोप — आशय-स्पष्टीकरण और', 'तोप — परीक्षा-उत्तर लेखन', 'तोप — वाचन-पाठ और'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_20_013', title: 'तोप — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: '\'स्पर्श भाग-2 — पाठ 20\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: '"तोप" कविता के किसी एक पद में आए "गर्जन" शब्द का आशय स्पष्ट करते हुए बताइए कि कवि ने इस शब्द का चयन "आवाज़" या "ध्वनि" के स्थान पर क्यों.', options: [
                { text: 'Correct answer: "गर्जन" का आशय है', outcome: 'Correct answer: "गर्जन" का आशय है — बादल या शेर जैसी प्राकृतिक/दैवीय शक्ति की गंभीर, भयानक और.' },
                { text: '(सामान्य, मानवीय) या', outcome: 'Not quite — Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).', reveals: 'writing-paraphrase' },
                { text: '(भौतिक, निष्पक्ष) न चुनकर', outcome: 'Not quite — Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).', reveals: 'writing-paraphrase' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_20_015', title: 'You made it',
          caseStudy: { intro: 'You finished तोप — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_013', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, return to c10_hin_sp_cbse_20_006 (अलंकार पहचान अभ्यास) and.',
          misconception: 'Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).',
          parts: [
                { id: 'a', prompt: '"तोप" कविता के किसी एक पद में आए "गर्जन" शब्द का आशय स्पष्ट करते हुए बताइए कि कवि ने इस शब्द का चयन "आवाज़" या "ध्वनि" के स्थान पर क्यों किया होगा?', answer: 'Correct answer: "गर्जन" का आशय है',
                  options: ['Correct answer: "गर्जन" का आशय है', '(सामान्य, मानवीय) या', '(भौतिक, निष्पक्ष) न चुनकर', 'meaning'],
                  hint: 'If stuck, return to c10_hin_sp_cbse_20_006 (अलंकार पहचान अभ्यास) and c10_hin_sp_cbse_20_007 (प्रतीक.',
                  misconception: 'Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).' },
                { id: 'b', prompt: 'निम्न पंक्ति में कौन-सा अलंकार है और उसका आशय क्या है? "तोप की गर्जन में छिपी है आग की ज़बान" (A) रूपक — तोप की आवाज़ को आग की ज़बान कहना (B) उत्प्रेक्षा — तोप.', answer: 'Correct: (C) मानवीकरण',
                  options: ['Correct: (C) मानवीकरण', 'आग की ज़बान', 'मैं तुम्हें भस्म कर दूँगी', 'आशय-स्पष्टीकरण'],
                  hint: 'If stuck, return to c10_hin_sp_cbse_20_006 (अलंकार पहचान अभ्यास) and c10_hin_sp_cbse_20_007 (प्रतीक.',
                  misconception: 'Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).' }
          ],
            remediations: { 'writing-paraphrase': { steps: ['Give the student a 3-line stanza and ask: "कवि ने \'X\' शब्द क्यों लिखा, \'Y\' क्यों नहीं?" — force शब्द-शक्ति thinking.', 'Show two answers for same stanza: one "भावार्थ" (1.5/3), one "आशय-स्पष्टीकरण" (3/3).', 'Practice "Effect Sentence Starters": "इस अलंकार से कवि ______ दर्शाते हैं", "यह बिंब पाठक को ______ महसूस कराता है".', 'Daily 10-minute drill: pick ONE device from any poem, write ONLY its effect in 2 sentences — no identification,.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).',
          parts: [
                { id: 'a', prompt: 'एक छात्र ने इस आशय-स्पष्टीकरण में लिखा: "कवि तोप की प्रशंसा कर रहे हैं क्योंकि वह शक्तिशाली है।" इस व्याख्या का मूल्यांकन कीजिए: यह कहाँ सही है, कहाँ अधूरी, और.', answer: 'Evaluation: आंशिक रूप से सही (तोप *है* शक्तिशाली), पर अधूरी (शक्ति *किसके लिए*?',
                  options: ['Evaluation: आंशिक रूप से सही (तोप *है* शक्तिशाली), पर अधूरी (शक्ति *किसके लिए*?', 'शक्ति का लोकतांत्रीकरण', 'आशय-स्पष्टीकरण', 'भावार्थ लिखना'],
                  hint: 'If stuck, return to c10_hin_sp_cbse_20_006 (अलंकार पहचान अभ्यास) and c10_hin_sp_cbse_20_007 (प्रतीक.',
                  misconception: 'Students believe "आशय-स्पष्टीकरण" = "भावार्थ लिखना" (writing paraphrase).' }
          ],
            remediations: { 'writing-paraphrase': { steps: ['Give the student a 3-line stanza and ask: "कवि ने \'X\' शब्द क्यों लिखा, \'Y\' क्यों नहीं?" — force शब्द-शक्ति thinking.', 'Show two answers for same stanza: one "भावार्थ" (1.5/3), one "आशय-स्पष्टीकरण" (3/3).', 'Practice "Effect Sentence Starters": "इस अलंकार से कवि ______ दर्शाते हैं", "यह बिंब पाठक को ______ महसूस कराता है".', 'Daily 10-minute drill: pick ONE device from any poem, write ONLY its effect in 2 sentences — no identification,.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_014', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL में **Evidence (साक्ष्य) चुनने में अटकें** → तुरंत **नोड 002 (पद्यांश-वार.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"उत्तर जितना लंबा होगा, अंक उतने ज्यादा मिलेंगे"** और **"सब कुछ पता है तो सीधे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि PEEL में **Evidence (साक्ष्य) चुनने में अटकें** → तुरंत **नोड 002 (पद्यांश-वार भावार्थ)** और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **"उत्तर जितना लंबा होगा, अंक उतने ज्यादा मिलेंगे"** और **"सब कुछ पता है तो सीधे लिख दो, रूपरेखा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**कीवर्ड-ड्रिल (5 मिनट रोज):** पिछले 5 वर्षों के CBSE प्रश्न-पत्र लें, प्रत्येक प्रश्न का **निर्देश-शब्द (स्पष्ट.', '**PEEL-टेम्पलेट अभ्यास:** A4 शीट पर **PEEL का खाका** (चार कॉलम) छपवाएँ/बनाएँ। रोज एक 3-अंक/5-अंक का प्रश्न लें, **पहले.', '**शब्द-सीमा टाइमर:** मोबाइल पर **टाइमर सेट करें** (3 अंक = 4 मिनट, 5 अंक = 6 मिनट, 8 अंक = 10 मिनट)। रफ में रूपरेखा 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_015', difficulty: 'standard',
          question: '\'स्पर्श भाग-2 — पाठ 20\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'अगर अटके तो c10_hin_sp_cbse_20_005 (छंद-लय) और c10_hin_sp_cbse_20_007 (प्रतीक-बिंब).',
          misconception: '**सबसे घातक भ्रम:** "वाचन-पाठ का अर्थ है कविता को \'याद करके सुना देना\' और चर्चा-बिंदु का अर्थ है \'पाठ्यपुस्तक के पीछे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'स्पर्श भाग-2 — पाठ 20\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'स्पर्श भाग-2 — पाठ 20\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = कवि वीरेन डंगवाल का जीवन-संक्षेप (पहाड़ी/उत्तराखंडी', '\'स्पर्श भाग-2 — पाठ 20\' का कथानक — \'स्पर्श भाग-2 — पाठ 20\' — स्पर्श भाग-2 का पाठ। पाठ का', '\'स्पर्श भाग-2 — पाठ 20\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'अगर अटके तो c10_hin_sp_cbse_20_005 (छंद-लय) और c10_hin_sp_cbse_20_007 (प्रतीक-बिंब) दोबारा देखो.',
                  misconception: '**सबसे घातक भ्रम:** "वाचन-पाठ का अर्थ है कविता को \'याद करके सुना देना\' और चर्चा-बिंदु का अर्थ है \'पाठ्यपुस्तक के पीछे दिए प्रश्नों को पूछ.' }
          ],
            remediations: { 'performance-art': { steps: ['**चरणबद्ध उपचार:** (१) छात्र को कविता का **कोई एक पद** चुनकर केवल **ध्वनि-स्तर** पर पढ़ने को कहो — अर्थ भूल जाओ, केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
