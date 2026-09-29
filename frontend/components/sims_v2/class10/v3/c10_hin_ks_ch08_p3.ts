import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch08_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch08_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch08_p3',
    title: 'पाठ 8 · Part 3/3',
    subtitle: 'This node covers the *process and practice* of writing board-level आशय-स्पष्टीकरण and.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 8 · Part 3/3',
    chapters: ['c10_hin_ks_ch08'],
    nodeIds: ['c10_hin_ks_cbse_08_013', 'c10_hin_ks_cbse_08_014', 'c10_hin_ks_cbse_08_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'क्षितिज भाग-2 — पाठ 8\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'क्षितिज भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_08_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — आशय-स्पष्टीकरण', 'पाठ 8 — परीक्षा-उत्तर', 'पाठ 8 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_08_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 3/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', answer: '8 -', options: ['8 -', '8 - -'] },
            { id: 's2', label: '8 - -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 8\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.', answer: '8 - -', options: ['8 - -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_08_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 8 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_013', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, review c10_hin_ks_cbse_08_006 (alankar identification) and.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आशय-स्पष्टीकरण\' का अर्थ है "पद्यांश का भावार्थ लिख देना"। वे प्रसंग नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'If stuck, review c10_hin_ks_cbse_08_006 (alankar identification) and c10_hin_ks_cbse_08_008 (mukhya.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'आशय-स्पष्टीकरण\' का अर्थ है "पद्यांश का भावार्थ लिख देना"। वे प्रसंग नहीं लिखते, उद्धरण नहीं देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक मॉडल उत्तर दिखाइए जिसमें चारों चरण रंगीन हाइलाइट हों (प्रसंग-नीला, उद्धरण-हरा, विश्लेषण-पीला, केंद्रीय.', 'उससे कहिए: "इस उत्तर में 4 रंग हैं — प्रत्येक रंग एक अंक का प्रतिनिधित्व करता है। तुम्हारा उत्तर किस रंग में कमजोर है?".', 'उसे एक अधूरा उत्तर दो (जैसे केवल प्रसंग+उद्धरण) और कहो: "विश्लेषण और केंद्रीय भाव जोड़कर पूरा करो।" 4.', 'फिर उसे टाइमर के साथ 3 नए पद्यांशों पर अभ्यास कराओ — हर बार 4-चरण चेकलिस्ट से स्वयं जाँच कराए। 5वें प्रयास तक वह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल वह विधि है जिसमें प्रश्न की मांग के अनुसार बिंदु, सबूत.',
          hint: 'बोध-प्रश्न (c10_hin_ks_cbse_08_012) और आशय-स्पष्टीकरण (c10_hin_ks_cbse_08_013) की समीक्षा.',
          misconception: 'विद्यार्थी często मानते हैं कि उत्तर में जितने अधिक बिंदु या तथ्य लिखे जाएंगे, उतने ही अधिक अंक मिलेंगे, और इसलिए वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल वह विधि है जिसमें प्रश्न की मांग के अनुसार बिंदु, सबूत,',
                  options: ['परीक्षा-उत्तर लेखन कौशल वह विधि है जिसमें प्रश्न की मांग के अनुसार बिंदु, सबूत,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'बोध-प्रश्न (c10_hin_ks_cbse_08_012) और आशय-स्पष्टीकरण (c10_hin_ks_cbse_08_013) की समीक्षा कीजिए।',
                  misconception: 'विद्यार्थी często मानते हैं कि उत्तर में जितने अधिक बिंदु या तथ्य लिखे जाएंगे, उतने ही अधिक अंक मिलेंगे, और इसलिए वे PEEL संरचना को अनदेखा.' }
          ],
            remediations: { 'cz-sto': { steps: ['छात्र को दिखाइए कि एक ही सामग्री से दो उत्तर बनाइए: एक बिना PEEL के (सिर्फ बिंदुओं की सूची) और दूसरा PEEL के साथ। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_08_015', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 8\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'अगर अर्थ‑ग्रहण में कठिनाई हो तो c10_hin_ks_cbse_08_002 (पद्यांश‑वार भावार्थ) की.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑पाठ का अर्थ केवल तेज़ और लोड आवाज़ में पढ़ना है; वे रुकावट, स्वर‑उतार‑चढ़ाव और बल के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 8\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'क्षितिज भाग-2 — पाठ 8\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 8\' का कथानक — \'क्षितिज भाग-2 — पाठ 8\' — क्षितिज भाग-2 का पाठ। पाठ का', '\'क्षितिज भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'अगर अर्थ‑ग्रहण में कठिनाई हो तो c10_hin_ks_cbse_08_002 (पद्यांश‑वार भावार्थ) की पुनरावृत्ति करें।',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन‑पाठ का अर्थ केवल तेज़ और लोड आवाज़ में पढ़ना है; वे रुकावट, स्वर‑उतार‑चढ़ाव और बल के महत्व को नजरअंदाज़ कर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को eerst एक छोटा वाक्य दें और उसे पढ़ने के लिए कहें, फिर पूछें कि “आपकी आवाज़ में कहाँ बदलाव आया और क्यों?” यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
