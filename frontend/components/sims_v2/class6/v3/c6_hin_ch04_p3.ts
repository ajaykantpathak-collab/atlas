import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch04_p3: SimDef = {
    id: 'v3_c6_hin_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'यह नोड पाठ के गहरे विश्लेषण और तर्कसंगत व्याख्या पर केंद्रित है—उदाहरण के लिए, एक पात्र.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c6_hin_ch04'],
    nodeIds: ['c6_hin_cbse_04_013', 'c6_hin_cbse_04_014', 'c6_hin_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना कीजिए आप अपने दोस्त के साथ एक नई वीडियो गेम खेल रहे हैं, और वह अचानक गुस्सा हो जाता है। आप तुरंत नहीं.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन का अर्थ है किसी पाठ को ध्यान से पढ़कर, उसके भागों (जैसे पात्र, घटना, भाषा) को तोड़कर देखना, उनके बीच के संबंध समझना, और फिर उनके आधार पर तर्कसंगत निष्कर्ष निकालना, ताकि हम सिर्फ सतही.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) को पढ़कर, उसकी विषयवस्तु.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 4 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन का अर्थ है किसी पाठ को ध्यान से पढ़कर, उसके भागों (जैसे पात्र.',
          hint: 'पात्र-चित्रण (नायक/प्रमुख पात्र) और पाठ्य-परिवेश और वातावरण अवधारणाओं की समीक्षा करें।',
          misconception: 'छात्र अक्सर मानते हैं कि यदि एक पात्र एक अच्छी बात कहता है (जैसे "सच बोलना महत्वपूर्ण है"), तो वह पूरी कहानी में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन का अर्थ है किसी पाठ को ध्यान से पढ़कर, उसके भागों (जैसे पात्र, घटना,',
                  options: ['आलोचनात्मक चिंतन का अर्थ है किसी पाठ को ध्यान से पढ़कर, उसके भागों (जैसे पात्र, घटना,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'पात्र-चित्रण (नायक/प्रमुख पात्र) और पाठ्य-परिवेश और वातावरण अवधारणाओं की समीक्षा करें।',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि एक पात्र एक अच्छी बात कहता है (जैसे "सच बोलना महत्वपूर्ण है"), तो वह पूरी कहानी में ईमानदार होना चाहिए, और यदि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछें: "क्या आप हमेशा एक जैसे व्यवहार करते हैं?', 'क्या आप कभी गुस्सा होते हैं जबकि सामान्यतः शांत रहते हैं?" फिर कहें: "ठीक वैसे ही कहानी के पात्र भी होते हैं—वे एक दिन.', 'क्या किसी ने उसे मजबूर किया?', 'फिर तय करें कि ये दो व्यवहार उसे \'अस्थिर\' बनाते हैं या \'मनुष्य\'।" इससे वे स्थिरता के भ्रम को तोड़ते हैं और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) को पढ़कर, उसकी.',
          hint: 'यदि अटके: **c6_hin_cbse_04_012 (बोध-प्रश्न)** के अभ्यास दोहराएं — विशेषकर \'पाठ से उद्धरण.',
          misconception: '**सबसे आम भ्रम:** *"उत्तर लंबा लिखने से नंबर मिलते हैं"* — छात्र सोचते हैं कि जितना ज़्यादा लिखेंगे, उतने अच्छे अंक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) को पढ़कर, उसकी विषयवस्तु,',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य/पद्य) को पढ़कर, उसकी विषयवस्तु,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटके: **c6_hin_cbse_04_012 (बोध-प्रश्न)** के अभ्यास दोहराएं — विशेषकर \'पाठ से उद्धरण ढूंढना\' और.',
                  misconception: '**सबसे आम भ्रम:** *"उत्तर लंबा लिखने से नंबर मिलते हैं"* — छात्र सोचते हैं कि जितना ज़्यादा लिखेंगे, उतने अच्छे अंक मिलेंगे। इसलिए वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल दिखाएं:** छात्र को एक ही प्रश्न के दो उत्तर दें — एक PEEL संरचित (4 पंक्तियाँ), एक लंबा असंरचित (10 पंक्तियाँ)।.', '**साक्ष्य खोज खेल:** पाठ का एक पैराग्राफ दें, कहें: *"इसमें से 2 वाक्य निकालो जो \'साहस\' सिद्ध करते हों"* — केवल चयन.', '**PEEL भरो अभ्यास:** अधूरा PEEL ढांचा दें (Point और Evidence भरे हों, Explanation और Link खाली) — छात्र केवल खाली जगह.', '**स्व-मूल्यांकन चेकलिस्ट:** दें: ☐ Point स्पष्ट?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_04_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **\'चर्चा\' का अर्थ है \'अपनी राय थोपना\' या \'बहस जीतना\'।** वे सोचते हैं कि जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या',
                  options: ['चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ को पढ़ने या', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_04_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोबारा हल करें.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि **\'चर्चा\' का अर्थ है \'अपनी राय थोपना\' या \'बहस जीतना\'।** वे सोचते हैं कि जो सबसे तेज़/ऊंची.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**\'हाँ, और...\' (Yes, And...) खेल खिलाओ:** जोड़े में एक वाक्य से शुरू करो, दूसरा "हाँ, और..." कहकर उसमें जोड़े — असहमति.', '**\'पाठ दिखाओ\' नियम लागू करो:** चर्चा में हर दावे के लिए पृष्ठ संख्या/पंक्ति बताना अनिवार्य करो। शिक्षक स्वयं मॉडल करें.', '**भूमिका परिवर्तन (Role Reversal):** जो छात्र सबसे अधिक बोलता है, उसे \'श्रोता/सारांशकर्ता\' (Listener/Summarizer) बनाओ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
