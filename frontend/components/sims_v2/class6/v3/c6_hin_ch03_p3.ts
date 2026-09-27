import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch03_p3: SimDef = {
    id: 'v3_c6_hin_ch03_p3',
    title: 'पाठ 3 · Part 3/3',
    subtitle: 'यह नोड पाठ के विश्लेषण और व्याख्या पर केंद्रित है - अर्थात् "क्या कहा गया है" नहीं, बल्कि.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 3 · Part 3/3',
    chapters: ['c6_hin_ch03'],
    nodeIds: ['c6_hin_cbse_03_013', 'c6_hin_cbse_03_014', 'c6_hin_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना कीजिए कि आपने एक कहानी पढ़ी जिसमें मुख्य पात्र एक झूठ बोलकर पुरस्कार जीत जाता है। सबसे पहले, हम खुद से.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ को गहराई से पढ़ते हैं, उसके अर्थ को समझते हैं, फिर उसके पीछे के कारण, संदेश और लेखक के इरादे का मूल्यांकन करते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — आलोचनात्मक', 'पाठ 3 — लेखन', 'पाठ 3 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 3/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है: किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर, उससे.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' पाठ पर आधारित एक संवादात्मक प्रक्रिया है जिसमें विद्यार्थी.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ को गहराई से पढ़ते हैं, उसके.',
          hint: 'यदि फंसें तो "पात्र-चित्रण: प्रमुख पात्र" (c6_hin_cbse_03_004) और "साहित्यिक युक्तियाँ.',
          misconception: 'छात्र अक्सर सोचते हैं कि आलोचनात्मक चिंतन का मतलब है पाठ में मौजूद हर बात पर नकारात्मक टिप्पणी करना या लेखक की गलतियां.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ को गहराई से पढ़ते हैं, उसके अर्थ को',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें हम किसी पाठ को गहराई से पढ़ते हैं, उसके अर्थ को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि फंसें तो "पात्र-चित्रण: प्रमुख पात्र" (c6_hin_cbse_03_004) और "साहित्यिक युक्तियाँ: रूपक और.',
                  misconception: 'छात्र अक्सर सोचते हैं कि आलोचनात्मक चिंतन का मतलब है पाठ में मौजूद हर बात पर नकारात्मक टिप्पणी करना या लेखक की गलतियां खोजना। उदाहरण के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को बताएं कि आलोचनात्मक चिंतन का अर्थ है "गहराई से सोचना", नकारात्मक नहीं। फिर कोई सरल उदाहरण दें: "यदि कोई कहता.', 'क्या वह वास्तव में क्या कहना चाहता है?" इस प्रकार उन्हें साक्ष्य-आधारित अर्थ निकालना सिखाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है: किसी दिए गए पाठ (कहानी, कविता, निबंध) को.',
          hint: 'यदि अटके: **c6_hin_cbse_03_012 (बोध-प्रश्न)** और **c6_hin_cbse_03_013 (आलोचनात्मक.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से उद्धरण (quote) डाल देना ही Evidence है"** — इसलिए वे लंबे-लंबे संवाद नकल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है: किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर, उससे',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है: किसी दिए गए पाठ (कहानी, कविता, निबंध) को पढ़कर, उससे', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि अटके: **c6_hin_cbse_03_012 (बोध-प्रश्न)** और **c6_hin_cbse_03_013 (आलोचनात्मक चिंतन)** दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"पाठ से उद्धरण (quote) डाल देना ही Evidence है"** — इसलिए वे लंबे-लंबे संवाद नकल कर लेते हैं लेकिन.' }
          ],
            remediations: { 'quote-evidence-point': { steps: ['**मॉडलिंग:** एक छोटे पैराग्राफ (3-4 वाक्य) का PEEL विश्लेषण **सामने करके दिखाएँ** — "देखो, मैंने पहले Point लिखा, फिर.', '**संयुक्त अभ्यास:** छात्र को एक **तैयार Point + Evidence** दें और केवल **Explanation लिखने** को कहें — फिर चर्चा करें.', '**रंग-कोडिंग:** छात्र के लिखे उत्तर में **Point=लाल, Evidence=नीला, Explanation=हरा, Link=पीला** हाइलाइट करवाएँ — जहाँ.', '**प्रतिपुष्टि लूप:** हर बार उत्तर जाँचते समय पूछें: *"यह वाक्य तुम्हारे Point को सिद्ध करता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' पाठ पर आधारित एक संवादात्मक प्रक्रिया है जिसमें.',
          hint: 'अगर फंसे हों तो c6_hin_cbse_03_013 (आलोचनात्मक चिंतन) के \'पाठ से प्रमाण लेकर व्याख्या.',
          misconception: 'विद्यार्थी मानते हैं कि चर्चा में **जोर से बोलना**, **अंतिम शब्द कहना**, या **शिक्षक को खुश करने वाली बात कहना** सफलता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' पाठ पर आधारित एक संवादात्मक प्रक्रिया है जिसमें विद्यार्थी',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' पाठ पर आधारित एक संवादात्मक प्रक्रिया है जिसमें विद्यार्थी', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'अगर फंसे हों तो c6_hin_cbse_03_013 (आलोचनात्मक चिंतन) के \'पाठ से प्रमाण लेकर व्याख्या करना\' खंड को.',
                  misconception: 'विद्यार्थी मानते हैं कि चर्चा में **जोर से बोलना**, **अंतिम शब्द कहना**, या **शिक्षक को खुश करने वाली बात कहना** सफलता है। असल में वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**रुकें और मॉडल करें:** शिक्षक स्वयं एक चर्चा-बिंदु लें, पाठ खोलकर प्रमाण दिखाएं, फिर बोलें — विद्यार्थी देखें कि.', '**सुनने का अभ्यास:** जोड़े में बैठाएं — एक बोले, दूसरा **बोले बिना** 30 सेकंड सुने, फिर **सार दोहराए** ("तुम कह रहे हो.', '**प्रमाण-कार्ड बांटें:** हर विद्यार्थी को पाठ से 2-3 प्रमाण (वाक्य/घटना) लिखित दें; चर्चा में बोलने से पहले कार्ड.', '**प्रतिबिंबन:** चर्चा के बाद पूछें: "आज तुमने किसकी बात सुनकर अपनी राय बदली?" — इससे सुनने का मूल्य स्थापित होता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
