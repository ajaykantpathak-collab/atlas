import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch15_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch15_p3: SimDef = {
    id: 'v3_c10_hin_kr_ch15_p3',
    title: 'साना-साना हाथ जोड़ि · Part 3/3',
    subtitle: 'यह नोड केवल "साना-साना हाथ जोड़ि" पाठ के आंतरिक साक्ष्य (internal evidence) पर आधारित.',
    classLevel: 10, subject: 'hin_kr', topic: 'साना-साना हाथ जोड़ि · Part 3/3',
    chapters: ['c10_hin_kr_ch15'],
    nodeIds: ['c10_hin_kr_cbse_15_013', 'c10_hin_kr_cbse_15_014', 'c10_hin_kr_cbse_15_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करो कि तुमने एक पुराना पारिवारिक फ़ोटो एल्बम खोला — तस्वीरें तो दिखती हैं, लेकिन उनके पीछे की कहानी.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहरे अर्थ, संरचना, भाषा-शैली, प्रतीक-योजना और सामाजिक-सांस्कृतिक अंतर्निहितताओं को तर्कसंगत ढंग से विखंडित करके व्याख्या करने की प्रक्रिया.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_15_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_15_014', title: 'Identify each idea',
          dissect: { specimen: 'साना-साना हाथ जोड़ि · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए गद्य/पद्य अंश से **प्रश्न की मांग के अनुसार**.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ पढ़ने या सुनने के बाद उसके मुख्य विषय.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_15_015', title: 'You made it',
          caseStudy: { intro: 'You finished साना-साना हाथ जोड़ि — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहरे अर्थ, संरचना.',
          hint: 'अगर फँस जाएँ तो "बिंब और रूपक" (नोड 008) तथा "विरोधाभास और प्रतीक" (नोड 009) को दोबारा.',
          misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ पाठ में कमियाँ निकालना या नकारात्मक टिप्पणी करना है। वास्तव में यह पाठ की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहरे अर्थ, संरचना, भाषा-शैली,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ के गहरे अर्थ, संरचना, भाषा-शैली,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'अगर फँस जाएँ तो "बिंब और रूपक" (नोड 008) तथा "विरोधाभास और प्रतीक" (नोड 009) को दोबारा देखें — ये.',
                  misconception: 'छात्र समझते हैं कि "आलोचनात्मक चिंतन" का अर्थ पाठ में कमियाँ निकालना या नकारात्मक टिप्पणी करना है। वास्तव में यह पाठ की बहु-स्तरीय संरचना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा अंश (3-4 पंक्तियाँ) देकर पूछो: "यहाँ लेखक क्या *नहीं* कह रहा, लेकिन इशारा कर रहा है?" — इससे.', 'फिर उसी अंश के दो भिन्न पाठकीय प्रमाण ढूँढ़ने को कहो जो विरोधाभासी लगें (जैसे: परंपरा का गौरव बनाम परंपरा का बोझ) और.', 'अंत में, बोर्ड के विगत वर्षों के 2-3 विश्लेषण-आधारित प्रश्नों के मॉडल उत्तर दिखाकर PEEL संरचना (Point, Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए गद्य/पद्य अंश से **प्रश्न की मांग.',
          hint: 'यदि अटके: **c10_hin_kr_cbse_15_012 (बोध-प्रश्न)** दोहराएं — विशेषकर \'आशय-सूचक\' प्रश्नों.',
          misconception: '**विशिष्ट भ्रांति:** *"पाठ से उद्धरण (कोट) डाल देना ही साक्ष्य (Evidence) है; व्याख्या (Explanation) की जरूरत नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए गद्य/पद्य अंश से **प्रश्न की मांग के अनुसार**',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी दिए गए गद्य/पद्य अंश से **प्रश्न की मांग के अनुसार**', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके: **c10_hin_kr_cbse_15_012 (बोध-प्रश्न)** दोहराएं — विशेषकर \'आशय-सूचक\' प्रश्नों का अभ्यास.',
                  misconception: '**विशिष्ट भ्रांति:** *"पाठ से उद्धरण (कोट) डाल देना ही साक्ष्य (Evidence) है; व्याख्या (Explanation) की जरूरत नहीं क्योंकि उद्धरण स्वयं.' }
          ],
            remediations: { 'evidence': { steps: ['**चरण 1:** छात्र से कहें — *"तुम्हारे उत्तर में उद्धरण तो है, लेकिन मैं (परीक्षक) नहीं समझ पाया कि यह उद्धरण तुम्हारे.', '**चरण 2:** एक **मॉडल Explanation वाक्य** दें: *"उद्धरण + \'इससे स्पष्ट होता है कि\' + बिंदु से जुड़ा विशेषण"* — उदा.', '*" \'वह शेर से लड़ा\' इससे स्पष्ट होता है कि वह प्राणों की परवाह नहीं करता = साहसी।"* 3.', '**चरण 3:** छात्र से **तीन अलग-अलग प्रश्नों** पर केवल Explanation वाक्य लिखवाएं (बिंदु/साक्ष्य आप दें)। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_15_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ पढ़ने या सुनने के बाद उसके मुख्य.',
          hint: 'यदि कठिनाई हो तो c10_hin_kr_cbse_15_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) के प्रश्नों.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑श्रवण: चर्चा‑बिंदु में केवल कहानी का सार या पात्रों के नाम दोहराने से काम चल जाएगा, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ पढ़ने या सुनने के बाद उसके मुख्य विषय,',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह कौशल है जिसमें पाठ पढ़ने या सुनने के बाद उसके मुख्य विषय,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है: रचना के रचयिता के जीवन, उनकी साहित्यिक यात्रा,', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ समय के अनुसार घटित होती हैं, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि कठिनाई हो तो c10_hin_kr_cbse_15_012 (बोध‑प्रश्न: वस्तुनिष्ठ और आशय‑सूचक) के प्रश्नों को दोबारा.',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑श्रवण: चर्चा‑बिंदु में केवल कहानी का सार या पात्रों के नाम दोहराने से काम चल जाएगा, जबकि वास्तव में बोर्ड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र केवल सार दोहरा रहा हो, तो उसे इस तीन‑चरणीय अभ्यास से गुज़रें: 1) पाठ से एक वाक्य चुनें जिसे वह महत्वपूर्ण.', '2) खुद से पूछें: इस वाक्य में कौन‑सी भावना या मूल्य छिपा हो सकता है?', '(उत्तर: शांतिपूर्ण समर्पण)। 3) अब उसी भावना को अपने जीवन के एक उदाहरण से जोड़कर लिखें: “जैसे परीक्षा के पहले मैं भी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
