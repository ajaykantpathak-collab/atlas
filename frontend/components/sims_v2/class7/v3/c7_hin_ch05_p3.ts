import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch05_p3: SimDef = {
    id: 'v3_c7_hin_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'इस नोड में पाठ 5 के आधार पर **विश्लेषणात्मक लेखन** सिखाया जाता है: साक्ष्य-आधारित.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c7_hin_ch05'],
    nodeIds: ['c7_hin_cbse_05_013', 'c7_hin_cbse_05_014', 'c7_hin_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने एक नया मोबाइल गेम खेला और रिव्यू लिखना है — तुम सिर्फ "मज़ा आया" नहीं लिखोगे, बल्कि बताओगे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें छात्र पाठ के विभिन्न अवयवों (कथानक, पात्र, भाषा, शैली, प्रतीक) को अलग-अलग करके उनकी परस्पर संबंध और लेखकीय उद्देश्य की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उसमें से सुसंगत प्रमाण.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — चर्चा-बिंदु वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जिन पर पाठ के वाचन या श्रवण के बाद.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_05_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है.',
          hint: 'यदि फँस जाएँ तो **विरोधाभास और प्रतीक** (c7_hin_cbse_05_009) दोहराएँ — ये सबसे अधिक.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें छात्र',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) पाठ के गहन अध्ययन की वह प्रक्रिया है जिसमें छात्र', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि फँस जाएँ तो **विरोधाभास और प्रतीक** (c7_hin_cbse_05_009) दोहराएँ — ये सबसे अधिक विश्लेषण-मूलक.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "आलोचनात्मक चिंतन" का अर्थ है **पाठ में कमियाँ निकालना** (fault-finding) या **नकारात्मक टिप्पणी.' }
          ],
            remediations: { 'fault-finding': { steps: ['**चरण 1**: छात्र से पूछो — "तुमने पाठ में क्या *देखा* जो तुम्हें रोचक/अजीब/महत्वपूर्ण लगा?" (निर्णय नहीं, अवलोकन.', 'पाठक को क्या महसूस/सोचने पर मजबूर करती है?" (कार्य-कारण जोड़ो)। **चरण 4**: मिलकर एक PEEL अनुच्छेद लिखो: Point →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उसमें से सुसंगत.',
          hint: 'यदि फँसें तो c7_hin_cbse_05_012 (बोध-प्रश्न) और c7_hin_cbse_05_013 (आलोचनात्मक चिंतन).',
          misconception: 'छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ पाठ का अनुवाद या सारांश लिखना है — वे प्रश्न "नायक के अंतर्द्वंद्व का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उसमें से सुसंगत प्रमाण',
                  options: ['पाठ-आधारित लेखन कौशल का अर्थ है किसी पाठ (गद्य/पद्य) को पढ़कर, उसमें से सुसंगत प्रमाण', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि फँसें तो c7_hin_cbse_05_012 (बोध-प्रश्न) और c7_hin_cbse_05_013 (आलोचनात्मक चिंतन) दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि "पाठ-आधारित लेखन" का अर्थ पाठ का अनुवाद या सारांश लिखना है — वे प्रश्न "नायक के अंतर्द्वंद्व का विश्लेषण कीजिए" के उत्तर.' }
          ],
            remediations: { '6': { steps: ['चरण 1: छात्र को एक ही प्रश्न के दो उत्तर दिखाएँ — एक सारांशात्मक (कमज़ोर), एक विश्लेषणात्मक (सशक्त) — और पूछें "कौन-सा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_05_015', difficulty: 'standard',
          question: 'चर्चा-बिंदु वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जिन पर पाठ के वाचन या.',
          hint: 'यदि अटके तो c7_hin_cbse_05_013 (आलोचनात्मक चिंतन) दोहराएँ — विशेष रूप से \'पाठ से प्रमाण.',
          misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का अर्थ है \'अपनी पसंद/नापसंद बताना\' — जैसे "मुझे कहानी अच्छी लगी क्योंकि नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'चर्चा-बिंदु वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जिन पर पाठ के वाचन या श्रवण के बाद',
                  options: ['चर्चा-बिंदु वे मुख्य विषय, प्रश्न या मुद्दे होते हैं जिन पर पाठ के वाचन या श्रवण के बाद', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी साहित्यिक कृति के लेखक के जीवन परिचय, उनकी रचनाधर्मिता,', 'कथानक वह क्रमबद्ध घटनाओं का अनुक्रम है जो किसी कहानी को आगे बढ़ाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (setting) किसी रचना में घटनाओं के घटित होने का **स्थान, काल और'],
                  hint: 'यदि अटके तो c7_hin_cbse_05_013 (आलोचनात्मक चिंतन) दोहराएँ — विशेष रूप से \'पाठ से प्रमाण लेकर.',
                  misconception: 'विद्यार्थी समझते हैं कि चर्चा-बिंदु का अर्थ है \'अपनी पसंद/नापसंद बताना\' — जैसे "मुझे कहानी अच्छी लगी क्योंकि नायक बहादुर था।" वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: विद्यार्थी को पाठ का एक छोटा अंश (3-4 पंक्तियाँ) दें और कहें — "इसमें से एक ऐसा प्रश्न बनाओ जिसका उत्तर पाठ में.', 'पाठ से प्रमाण दो।" चरण 3: दिखाएँ कि कैसे एक ही अंश से दो विपरीत तर्क बन सकते हैं। चरण 4: अब विद्यार्थी से कहें — "अब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
