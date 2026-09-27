import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch04_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'इस नोड में कविता के आशय स्पष्टीकरण और विश्लेषण का अभ्यास किया जाता है; यह व्याकरण के.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c10_hin_ks_ch04'],
    nodeIds: ['c10_hin_ks_cbse_04_013', 'c10_hin_ks_cbse_04_014', 'c10_hin_ks_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना कीजिए आप किसी फिल्म को देख रहे हैं और अपने दोस्त से कहते हैं किfilm का क्या संदेश था—आप बस कहानी नहीं.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण कविता या गद्यांश के अंतर्निहित भाव, संदेश और लेखक के उद्देश्य को पंक्तियों के आधार पर स्पष्ट रूप से बताना है, जबकि विश्लेषण उसके तत्वों (छंद, अलंकार, भाषा आदि) को तोड़कर समझने की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — आशय-स्पष्टीकरण', 'पाठ 4 — परीक्षा-उत्तर', 'पाठ 4 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — आशय-स्पष्टीकरण कविता या गद्यांश के अंतर्निहित भाव, संदेश और लेखक के उद्देश्य को पंक्तियों.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वाचन-पाठ और चर्चा-बिंदु का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम और भाव के.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_04_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण कविता या गद्यांश के अंतर्निहित भाव, संदेश और लेखक के उद्देश्य को.',
          hint: 'यदि आशय स्पष्टीकरण में कठिनाई हो तो node c10_hin_ks_cbse_04_012 की आशय‑सूचक प्रश्नों की.',
          misconception: 'छात्र अक्सर मानते हैं कि आशय‑स्पष्टीकरण केवल stanza का सार लिखना है, जैसे "इस stanza में कवि नदी का वर्णन कर रहा है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण कविता या गद्यांश के अंतर्निहित भाव, संदेश और लेखक के उद्देश्य को पंक्तियों',
                  options: ['आशय-स्पष्टीकरण कविता या गद्यांश के अंतर्निहित भाव, संदेश और लेखक के उद्देश्य को पंक्तियों', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि आशय स्पष्टीकरण में कठिनाई हो तो node c10_hin_ks_cbse_04_012 की आशय‑सूचक प्रश्नों की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि आशय‑स्पष्टीकरण केवल stanza का सार लिखना है, जैसे "इस stanza में कवि नदी का वर्णन कर रहा है", बिना यह बताए कि इस.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र को stanza पढ़कर दो‑तीन मुख्य शब्द या वाक्यांश underline करने को कहें। 2.', 'उन शब्दों से आने वाली भावना (जैसे डर, आशा, संघर्ष) पूछें। 3.', 'फिर उन शब्दों के आधार पर एक बिंदु बनाएँ (जैसे "कवि आशा व्यक्त कर रहा है")। 4.', 'उसी stanza से एक पं quotation देकर साक्ष्य दें। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल, CBSE बोर्ड परीक्षा के मानदंडों के अनुरूप, साहित्यिक.',
          hint: 'यदि अटके: **c10_hin_ks_cbse_04_004 (केंद्रीय भाव और रस)** और **c10_hin_ks_cbse_04_013.',
          misconception: '**भ्रांति:** "उत्तर जितना लंबा लिखेंगे, अंक उतने ज्यादा मिलेंगे।" **वास्तविकता:** CBSE अंकन योजना **सघनता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल, CBSE बोर्ड परीक्षा के मानदंडों के अनुरूप, साहित्यिक प्रश्नों',
                  options: ['परीक्षा-उत्तर लेखन कौशल, CBSE बोर्ड परीक्षा के मानदंडों के अनुरूप, साहित्यिक प्रश्नों', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि अटके: **c10_hin_ks_cbse_04_004 (केंद्रीय भाव और रस)** और **c10_hin_ks_cbse_04_013.',
                  misconception: '**भ्रांति:** "उत्तर जितना लंबा लिखेंगे, अंक उतने ज्यादा मिलेंगे।" **वास्तविकता:** CBSE अंकन योजना **सघनता (Conciseness)** और **प्रासंगिकता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — निदान:** छात्र से एक 3-अंकीय प्रश्न का उत्तर लिखवाएं और PEEL चेकलिस्ट (P?', 'L?) से जांचें। **चरण 2 — मॉडलिंग:** उसी प्रश्न का आदर्श उत्तर दिखाएं, प्रत्येक चरण को हाइलाइट करें (रंगीन पेन से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_04_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम.',
          hint: 'यदि कठिनाई हो तो काव्य-संरचना (छंद और लय-विधान) और साहित्यिक युक्तियाँ: अलंकार nodes की.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-पाठ का अर्थ केवल सही उच्चारण और समान गति से पढ़ना है, और चर्चा बिंदु तैयार करते समय वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम और भाव के',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है किसी पद्य या गद्यांश को उचित स्वर, लय, विराम और भाव के', 'कवि परिचय और पृष्ठभूमि का तात्पर्य कवि के जीवन के प्रमुख तथ्यों', 'पद्यांश-वार भावार्थ is the process of interpreting each stanza of a poem by identifying', 'काव्य-संरचना कविता के समग्र रूप को परिभाषित करती है, जिसमें stanza की संख्या, प्रत्येक'],
                  hint: 'यदि कठिनाई हो तो काव्य-संरचना (छंद और लय-विधान) और साहित्यिक युक्तियाँ: अलंकार nodes की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-पाठ का अर्थ केवल सही उच्चारण और समान गति से पढ़ना है, और चर्चा बिंदु तैयार करते समय वे केवल पाठ का शब्दार्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र की इस गलती को सुधारने के लिए निम्न चरण-apन अपनाएँ: 1) छात्र को किसी एक stanza को धीरे-धीरे आवाज़ निकालकर पढ़ने के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
