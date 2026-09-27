import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch05_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'इस नोड में पद्यांश के आशय‑स्पष्टीकरण और विश्लेषण की विधि, उत्तर लेखन की संरचना.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c10_hin_ks_ch05'],
    nodeIds: ['c10_hin_ks_cbse_05_013', 'c10_hin_ks_cbse_05_014', 'c10_hin_ks_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप अपने दोस्त को एक फिल्म के एक सीन का भाव बताना चाहते हैं – आप सबसे पहले उस सीन को ध्यान से.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय‑स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के पीछे छिपे भाव, संदेश और लेखक के उद्देश्य को स्पष्ट शब्दों में बताना, जबकि विश्लेषण में उसके निर्माण‑तत्वों (छंद, अलंकार, भाषा‑प्रयोग) को तोड़कर.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आशय-स्पष्टीकरण', 'पाठ 5 — परीक्षा-उत्तर', 'पाठ 5 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — आशय‑स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के पीछे छिपे भाव, संदेश और लेखक के.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — वाचन-पाठ का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम चिह्न और भाव के साथ głos.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 5 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_013', difficulty: 'standard',
          question: 'आशय‑स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के पीछे छिपे भाव, संदेश और.',
          hint: 'यदि फंसे तो नोड 006 (साहित्यिक युक्तियाँ: अलंकार) और नोड 010 (पदावली: कठिन शब्द और.',
          misconception: 'छात्र अक्सर आशय‑स्पष्टीकरण को पंक्तियों के शब्द‑शब्द अनुवाद या केवल भाव‑शब्दों की सूची समझ लेते हैं, जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय‑स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के पीछे छिपे भाव, संदेश और लेखक के',
                  options: ['आशय‑स्पष्टीकरण का अर्थ है किसी पद्यांश या गद्यांश के पीछे छिपे भाव, संदेश और लेखक के', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि फंसे तो नोड 006 (साहित्यिक युक्तियाँ: अलंकार) और नोड 010 (पदावली: कठिन शब्द और मुहावरे) की.',
                  misconception: 'छात्र अक्सर आशय‑स्पष्टीकरण को पंक्तियों के शब्द‑शब्द अनुवाद या केवल भाव‑शब्दों की सूची समझ लेते हैं, जबकि वास्तव में स्पष्टीकरण में लेखक के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को निम्नलिखित चरणों के माध्यम से अभ्यास करवाएं: 1️⃣ पद्यांश को दो‑तीन बार głos से पढ़कर स्वर और लय को महसूस करें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_014', difficulty: 'standard',
          question: 'Exam answer writing skill is the ability to construct a structured.',
          hint: 'If stuck, review c10_hin_ks_cbse_05_004 (केंद्रीय भाव) and c10_hin_ks_cbse_05_007 (प्रतीक.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "उद्धरण देना" का अर्थ है पूरी पंक्ति या पद लिख देना। वे 3 अंक के प्रश्न में 2-3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Exam answer writing skill is the ability to construct a structured, evidence-based',
                  options: ['Exam answer writing skill is the ability to construct a structured, evidence-based', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'If stuck, review c10_hin_ks_cbse_05_004 (केंद्रीय भाव) and c10_hin_ks_cbse_05_007 (प्रतीक और बिंब).',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "उद्धरण देना" का अर्थ है पूरी पंक्ति या पद लिख देना। वे 3 अंक के प्रश्न में 2-3 पूरा पद लिखकर समय.' }
          ],
            remediations: { '3-2-3-cbse': { steps: ['**मॉडल उत्तर दिखाएं:** उसी प्रश्न का दो उत्तर दें — एक "पूरा पद उद्धृत + कम व्याख्या" (2/5 अंक), दूसरा "कीवर्ड उद्धृत.', '**अभ्यास ड्रिल:** 5 प्रश्न दें, प्रत्येक के लिए छात्र को **केवल** उद्धरण भाग लिखने को कहें (अधिकतम 3 शब्द)। फिर उन्हें.', '**चेकलिस्ट दें:** हर उत्तर के बाद छात्र स्वयं जांचे — (☐ कीवर्ड उद्धृत?', '☐ व्याख्या में \'कैसे/क्यों\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_05_015', difficulty: 'standard',
          question: 'वाचन-पाठ का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम चिह्न और भाव.',
          hint: 'यदि फँसें तो केंद्रीय भाव और रस (node c10_hin_ks_cbse_05_004) की समीक्षा करें।',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑पाठ का अर्थ केवल शब्दों को शुद्ध‑उच्चारण (pronounce) करना है और वे विराम चिह्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम चिह्न और भाव के साथ głos',
                  options: ['वाचन-पाठ का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम चिह्न और भाव के साथ głos', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय, उनकी साहित्यिक यात्रा, युगीन', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) के शब्दों,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाह्य रूप (पद विभाजन, पंक्ति लंबाई, तुक'],
                  hint: 'यदि फँसें तो केंद्रीय भाव और रस (node c10_hin_ks_cbse_05_004) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑पाठ का अर्थ केवल शब्दों को शुद्ध‑उच्चारण (pronounce) करना है और वे विराम चिह्न, स्वर‑व्यंजन या भाव को अनदेखा.' }
          ],
            remediations: { 'pronounce': { steps: ['छात्र को एक छोटा वाक्य दें और उसे أولاً बिना विराम के पढ़ने को कहें, फिर विराम के साथ पढ़ने को कहें — अंतर को सुनकर.', 'वाक्य के प्रत्येक विराम चिह्न पर रुकावट डालने का अभ्यास करवाएँ और पूछें कि इस रुकावट से अर्थ में क्या परिवर्तन आया?', 'भाव को स्वर में लाने के लिए, छात्र को वाक्य के भाव (खुश, दुख, आश्चर्य) को पहचानने के लिए कहें और फिर उस भाव के अनुरूप.', 'अंत में छात्र से उसी वाक्य के आधार पर एक चर्चा‑बिंदु पूछें (जैसे “इस वाक्य से क्या भाव व्यक्त हो रहा है?”) ताकि वे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
