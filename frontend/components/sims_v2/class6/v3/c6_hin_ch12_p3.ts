import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch12_p3: SimDef = {
    id: 'v3_c6_hin_ch12_p3',
    title: 'पाठ 12 · Part 3/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर किसी कहानी/कविता के पात्र, कथानक, विषय, बिंब-प्रतीक आदि का.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 12 · Part 3/3',
    chapters: ['c6_hin_ch12'],
    nodeIds: ['c6_hin_cbse_12_013', 'c6_hin_cbse_12_014', 'c6_hin_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी कोई फिल्म देखी और फिर दोस्त को बताया कि "हीरो ने वो फैसला *इसलिए* लिया क्योंकि बचपन में उसके.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन में \'विश्लेषण\' किसी पाठ के अवयवों (पात्र, कथानक, भाषा, युक्तियाँ) को अलग-अलग करके उनकी जांच करना है, जबकि \'व्याख्या\' उन अवयवों के परस्पर संबंध और गहरे अर्थ को तर्कसंगत ढंग से स्पष्ट.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — आलोचनात्मक', 'पाठ 12 — लेखन', 'पाठ 12 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_12_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 3/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based writing skill) means constructing written responses.', answer: '12 -', options: ['12 -', '12 - -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ, घटना या.', answer: '12 - -', options: ['12 - -', '12 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 12 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन में \'विश्लेषण\' किसी पाठ के अवयवों (पात्र, कथानक, भाषा.',
          hint: 'यदि फंसे हों, तो c6_hin_cbse_12_008 (बिंब-रूपक), c6_hin_cbse_12_009 (विरोधाभास-प्रतीक).',
          misconception: 'छात्र अक्सर समझते हैं कि \'विश्लेषण\' का मतलब है पाठ में से \'अच्छी-अच्छी बातें\' या \'नैतिक शिक्षा\' निकालकर लिख देना। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन में \'विश्लेषण\' किसी पाठ के अवयवों (पात्र, कथानक, भाषा, युक्तियाँ) को',
                  options: ['आलोचनात्मक चिंतन में \'विश्लेषण\' किसी पाठ के अवयवों (पात्र, कथानक, भाषा, युक्तियाँ) को', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि फंसे हों, तो c6_hin_cbse_12_008 (बिंब-रूपक), c6_hin_cbse_12_009 (विरोधाभास-प्रतीक), और.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'विश्लेषण\' का मतलब है पाठ में से \'अच्छी-अच्छी बातें\' या \'नैतिक शिक्षा\' निकालकर लिख देना। वे पात्र के किसी एक कार्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक छोटा-सा प्रसंग दें (3-4 वाक्य) और पूछें: "यहाँ क्या हुआ?" (सारांश), फिर "लेखक ने यह शब्द *क्यों* चुना?".', 'एक ही घटना के दो विपरीत दृष्टिकोण दिखाएं (जैसे: चोर vs भूखा पिता) और पूछें "कौन सही है?" — फिर बताएं कि विश्लेषण में हम.', '\'PEEL\' विधि (Point, Evidence, Explanation, Link) का एक तैयार ढांचा दें और उसी में उत्तर लिखने का अभ्यास करवाएं जब तक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) means constructing written.',
          hint: 'If stuck, review **c6_hin_cbse_12_012 (बोध-प्रश्न)** for evidence-location practice and.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है **पाठ का सारांश (summary) लिखना** या **पंक्तियाँ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) means constructing written responses',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based writing skill) means constructing written responses', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'If stuck, review **c6_hin_cbse_12_012 (बोध-प्रश्न)** for evidence-location practice and.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है **पाठ का सारांश (summary) लिखना** या **पंक्तियाँ रटकर उतार देना**। वे.' }
          ],
            remediations: { 'summary-peel-explanation-link-evidence': { steps: ['**मॉडलिंग (Modeling):** शिक्षक बोर्ड पर एक ही प्रश्न के दो उत्तर लिखें — एक \'सारांश-शैली\' (कमजोर) और एक \'PEEL-शैली\'.', '**रंग-कोडिंग (Color-coding):** छात्रों को अपने उत्तर में Point (लाल), Evidence (नीला), Explanation (हरा), Link (पीला).', '**साक्ष्य-खोज अभ्यास (Evidence Hunt):** 5 मिनट का टाइमर लगाएं — छात्रों को एक प्रश्न दें और केवल साक्ष्य (उद्धरण/विवरण).', '**वाक्य-प्रारंभक (Sentence Starters):** Explanation के लिए "यह दर्शाता है कि...", "इससे पता चलता है कि...", Link के लिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_12_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ.',
          hint: 'यदि फँसें तो c6_hin_cbse_12_013 (आलोचनात्मक चिंतन) के \'क्यों-कैसे\' प्रश्न बनाने का अभ्यास.',
          misconception: 'छात्र समझते हैं कि चर्चा-बिंदु बनाने का अर्थ है पाठ से **प्रश्न निकालना** (जैसे: "पात्र का नाम क्या था?", "कहाँ गया.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ, घटना या',
                  options: ['चर्चा-बिंदु (Discussion Points) वे मुख्य विषय या प्रश्न होते हैं जो किसी पाठ, घटना या', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ और लेखक के', 'कथानक कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) क्रम में व्यवस्थित ढांचा', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का भौतिक स्थान, समयावधि और सामाजिक परिस्थितियों'],
                  hint: 'यदि फँसें तो c6_hin_cbse_12_013 (आलोचनात्मक चिंतन) के \'क्यों-कैसे\' प्रश्न बनाने का अभ्यास दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि चर्चा-बिंदु बनाने का अर्थ है पाठ से **प्रश्न निकालना** (जैसे: "पात्र का नाम क्या था?", "कहाँ गया था?"), जबकि असली.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ का एक छोटा अंश (3-4 पंक्तियाँ) दें और पूछें: "यहाँ पात्र क्या महसूस कर रहा होगा?', 'तुम उसकी जगह होते तो क्या करते?" — इससे \'तथ्य\' से \'भावना/विचार\' पर ध्यान जाता है। 2.', 'बोर्ड पर दो प्रश्न लिखें: एक तथ्यात्मक, एक चर्चा-बिंदु। छात्र से अंतर पहचानने को कहें। 3.', 'छात्र को कहें: "आज घर जाकर माता-पिता से एक चर्चा-बिंदु पूछो — जैसे \'अगर तुम्हें एक दिन के लिए प्रधानमंत्री बनाया जाए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
