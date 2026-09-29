import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch05_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड पाठ ५ के आधार पर **विश्लेषण (Analysis)** और **व्याख्या (Interpretation)** के कौशल.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c9_hin_ga_ch05'],
    nodeIds: ['c9_hin_ga_cbse_05_013', 'c9_hin_ga_cbse_05_014', 'c9_hin_ga_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'रीढ़ की हड्डी\' का विश्लेषण — जगदीश चंद्र माथुर का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'रीढ़ की हड्डी\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — \'रीढ़ की हड्डी\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — \'रीढ़ की हड्डी\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_05_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_013', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि अटके: **c9_hin_ga_cbse_05_009 (विरोधाभास और प्रतीक)** और **c9_hin_ga_cbse_05_012.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ की कमियाँ निकालना (Criticize)" या "अपनी निजी राय देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' का आलोचनात्मक चिंतन',
                  options: ['\'रीढ़ की हड्डी\' का आलोचनात्मक चिंतन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c9_hin_ga_cbse_05_009 (विरोधाभास और प्रतीक)** और **c9_hin_ga_cbse_05_012 (बोध-प्रश्न)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आलोचनात्मक चिंतन = पाठ की कमियाँ निकालना (Criticize)" या "अपनी निजी राय देना (Opinion)"। **गलत.' }
          ],
            remediations: { 'criticize-opinion': { steps: ['**शब्दावली सुधार:** छात्र से कहें — "आलोचनात्मक चिंतन में \'आलोचना\' का अर्थ **\'मूल्यांकन\' (Evaluation)** है, निंदा नहीं।.', '**प्रमाण-आधारित अभ्यास:** एक छोटा अंश दें और पूछें: "यहाँ लेखक ने X किया। पाठ से **दो पंक्तियाँ** ढूँढो जो सिद्ध करें.', '**\'क्यों\' की श्रृंखला:** हर उत्तर के बाद पूछें — "पाठ में इसका सबूत कहाँ है?" → "वह सबूत आपके निष्कर्ष को कैसे पुष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_014', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_05_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** दोहराएँ — यह.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि "पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की बातें **अपने शब्दों में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' पर पाठ-आधारित लेखन',
                  options: ['\'रीढ़ की हड्डी\' पर पाठ-आधारित लेखन', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_05_012 (बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक)** दोहराएँ — यह पाठ से.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि "पाठ-आधारित उत्तर लिखने का अर्थ है पाठ की बातें **अपने शब्दों में दोहराना** (paraphrasing)".' }
          ],
            remediations: { 'paraphrasing-quotation-cbse-marking-scheme': { steps: ['**चरण 1:** विद्यार्थी को **दो उत्तर साथ रखकर** दिखाएँ — एक केवल सारांश (कमज़ोर), दूसरा PEEL सहित (मजबूत) — और पूछें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_015', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c9_hin_ga_cbse_05_012 (बोध-प्रश्न)** के वस्तुनिष्ठ प्रश्नों.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है **\'अपनी राय जोर-शोर से रखना और दूसरों को चुप कराना\'**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'रीढ़ की हड्डी\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c9_hin_ga_cbse_05_012 (बोध-प्रश्न)** के वस्तुनिष्ठ प्रश्नों को दोहराएं.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है **\'अपनी राय जोर-शोर से रखना और दूसरों को चुप कराना\'**। वे सोचते हैं कि जो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को एक **मॉडल चर्चा का वीडियो/ऑडियो** सुनवाएं (2 मिनट) जहाँ दो छात्र पाठ के एक बिंदु पर PEEL संरचना में.', 'कितनी बार सुना?" — यह मेटाकॉग्निशन विकसित करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
