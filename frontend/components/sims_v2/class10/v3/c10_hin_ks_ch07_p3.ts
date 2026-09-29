import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch07_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch07_p3: SimDef = {
    id: 'v3_c10_hin_ks_ch07_p3',
    title: 'पाठ 7 · Part 3/3',
    subtitle: 'इस नोड में हम कविता के आशय स्पष्टीकरण और विश्लेषण के अभ्यास पर ध्यान केंद्रित करेंगे.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 7 · Part 3/3',
    chapters: ['c10_hin_ks_ch07'],
    nodeIds: ['c10_hin_ks_cbse_07_013', 'c10_hin_ks_cbse_07_014', 'c10_hin_ks_cbse_07_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'क्षितिज भाग-2 — पाठ 7\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'क्षितिज भाग-2 — पाठ 7\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_07_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — आशय-स्पष्टीकरण', 'पाठ 7 — परीक्षा-उत्तर', 'पाठ 7 — वाचन-पाठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_07_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 3/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 7\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 7\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_07_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 7 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_013', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 7\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि छात्र विश्लेषण में कठिनाई महसूस कर रहा है, तो उसे c10_hin_ks_cbse_07_002 (पद्यांश-वार.',
          misconception: 'छात्र अक्सर आशय-स्पष्टीकरण और विश्लेषण को एक ही मानते हैं और विश्लेषण के प्रश्न के उत्तर में केवल कविता के शब्दों के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 7\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'क्षितिज भाग-2 — पाठ 7\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 7\' का कथानक — \'क्षितिज भाग-2 — पाठ 7\' — क्षितिज भाग-2 का पाठ। पाठ का', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि छात्र विश्लेषण में कठिनाई महसूस कर रहा है, तो उसे c10_hin_ks_cbse_07_002 (पद्यांश-वार भावार्थ).',
                  misconception: 'छात्र अक्सर आशय-स्पष्टीकरण और विश्लेषण को एक ही मानते हैं और विश्लेषण के प्रश्न के उत्तर में केवल कविता के शब्दों के अर्थ दोहराते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को स्पष्ट रूप से बताएँ कि विश्लेषण में दो अनिवार्य चरण हैं: (1) शब्द/वस्तु की पहचान करें (जैसे "नदी"), (2) पूछें.', 'यह केंद्रीय भाव से कैसे जुड़ा है?" फिर उन्हें एक सरल फ्रेम दें: "[शब्द] का अर्थ [सतही अर्थ] है, लेकिन कवि ने इसे चुना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_014', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 7\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फंसे हों, तो c10_hin_ks_cbse_07_007 (प्रतीक और बिंब) और c10_hin_ks_cbse_07_006.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कविता की पंक्तियाँ उद्धृत कर देना ही Evidence (साक्ष्य) है" — जबकि बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 7\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
                  options: ['\'क्षितिज भाग-2 — पाठ 7\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 7\' का कथानक — \'क्षितिज भाग-2 — पाठ 7\' — क्षितिज भाग-2 का पाठ। पाठ का', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि फंसे हों, तो c10_hin_ks_cbse_07_007 (प्रतीक और बिंब) और c10_hin_ks_cbse_07_006 (अलंकार) पर वापस.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कविता की पंक्तियाँ उद्धृत कर देना ही Evidence (साक्ष्य) है" — जबकि बोर्ड परीक्षा में Evidence का.' }
          ],
            remediations: { 'evidence-evidence-evidence': { steps: ['**मॉडलिंग:** छात्र को एक प्रश्न दें (जैसे "कविता में \'आशा\' का बिंब पहचानिए") और तीन प्रकार के Evidence दिखाएं: (अ) पूरी.', '**अभ्यास:** 5 प्रश्न दें, प्रत्येक के लिए छात्र को कविता से **केवल एक पंक्ति/शब्द** चुनकर लिखना है — फिर बताना है.', '**फीडबैक लूप:** छात्र अपना उत्तर लिखे, फिर खुद ही PEEL चेकलिस्ट से जांचे: क्या मेरा Evidence मेरे Point को सीधा सपोर्ट.', 'यदि नहीं, तो पुनः लिखें। 3-4 चक्र में सुधार दिखेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_07_015', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 7\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि छात्र वाचन में लय नहीं पहचान पा रहा है, तो नोड c10_hin_ks_cbse_07_005 (छंद और.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन-पाठ का अर्थ केवल शब्दों को loud में बोलना है और लय, उच्‍चारों या विरामों पर ध्यान देने की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 7\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का',
                  options: ['\'क्षितिज भाग-2 — पाठ 7\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 7\' का कथानक — \'क्षितिज भाग-2 — पाठ 7\' — क्षितिज भाग-2 का पाठ। पाठ का', 'काव्य‑संरचना और पद्य‑विन्यास का अर्थ है कविता के रूप के तत्वों'],
                  hint: 'यदि छात्र वाचन में लय नहीं पहचान पा रहा है, तो नोड c10_hin_ks_cbse_07_005 (छंद और लय-विधान) की.',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन-पाठ का अर्थ केवल शब्दों को loud में बोलना है और लय, उच्‍चारों या विरामों पर ध्यान देने की आवश्यकता नहीं है.' }
          ],
            remediations: { 'loud': { steps: ['1) छात्र को एक छोटी पंक्ति (जैसे “ओं शान्तिः शान्तिः शान्तिः”) देकर धीरे-धीरे पढ़ने को कहें; प्रत्येक शब्द पर ताली.', 'उत्साही) पर चर्चा कराएँ, जिससे वे गति‑भाव संबंध समझें। 3) चर्चा बिंदु तैयार करते समय पाठ से एक स्पष्ट उद्धरण (उदाहरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
