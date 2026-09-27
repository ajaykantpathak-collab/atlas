import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch23_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch23_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch23_p3',
    title: 'बड़े भाई साहब · Part 3/3',
    subtitle: 'यह नोड **केवल \'बड़े भाई साहब\' पाठ** पर केंद्रित आलोचनात्मक विश्लेषण और व्याख्या कौशल.',
    classLevel: 10, subject: 'hin_sp', topic: 'बड़े भाई साहब · Part 3/3',
    chapters: ['c10_hin_sp_ch23'],
    nodeIds: ['c10_hin_sp_cbse_23_013', 'c10_hin_sp_cbse_23_014', 'c10_hin_sp_cbse_23_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्या आपने कभी सोचा है कि बड़े भाई साहब बार-बार फेल क्यों होते हैं जबकि वे दिन-रात पढ़ते रहते हैं, और छोटा भाई.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'बड़े भाई साहब — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति की **संरचना, भाषा, शिल्प, दृष्टिकोण और अंतर्निहित अर्थों** का तर्कसंगत, प्रमाण-आधारित विश्लेषण और व्याख्या करने की प्रक्रिया है, जिसमें पाठ के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_23_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['बड़े भाई साहब —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_23_015', title: 'You made it',
          caseStudy: { intro: 'You finished बड़े भाई साहब — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति की **संरचना, भाषा.',
          hint: 'यदि फँसें तो **c10_hin_sp_cbse_23_009 (विरोधाभास और व्यंग्य)** तथा.',
          misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' = \'कमियाँ निकालना\' (finding faults)**। वे बड़े भाई की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति की **संरचना, भाषा, शिल्प,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक कृति की **संरचना, भाषा, शिल्प,', '\'बड़े भाई साहब\' प्रेमचंद द्वारा रचित एक आत्मकथात्मक लघुकथा है जो दो भाइयों के माध्यम से', 'कथानक (Plot) किसी कहानी की घटनाओं का तार्किक और कारण-कार्य संबंध पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौतिक स्थान, समय, सामाजिक परिस्थितियों और'],
                  hint: 'यदि फँसें तो **c10_hin_sp_cbse_23_009 (विरोधाभास और व्यंग्य)** तथा **c10_hin_sp_cbse_23_006 (मुख्य.',
                  misconception: '**सबसे घातक गलतफहमी:** छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' = \'कमियाँ निकालना\' (finding faults)**। वे बड़े भाई की समय-सारणी, उनके फेल.' }
          ],
            remediations: { 'finding-faults': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "आलोचनात्मक चिंतन का अर्थ \'बुराई खोजना\' नहीं, **\'रचना-प्रक्रिया समझना\'.', 'अगर वे पास हो जाते तो पाठ का अर्थ कैसे बदल जाता?" 2.', '**\'क्यों\' की श्रृंखला (Chain of Why) चलाएँ:** हर उत्तर पर तीन बार \'क्यों\' पूछें — (क्यों फेल हुए?', '→ रटंत पद्धति के कारण → क्यों रटंत पद्धति?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है — NCERT पाठ्यपुस्तक के किसी गद्य/पद्य अंश से.',
          hint: 'यदि अटके — **c10_hin_sp_cbse_23_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' खंड को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि **पाठ-आधारित उत्तर लिखने का अर्थ है — पाठ का सारांश (समरी) लिखना या घटनाओं को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है', '\'बड़े भाई साहब\' प्रेमचंद द्वारा रचित एक आत्मकथात्मक लघुकथा है जो दो भाइयों के माध्यम से', 'कथानक (Plot) किसी कहानी की घटनाओं का तार्किक और कारण-कार्य संबंध पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौतिक स्थान, समय, सामाजिक परिस्थितियों और'],
                  hint: 'यदि अटके — **c10_hin_sp_cbse_23_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' खंड को दोहराएँ; वहाँ.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि **पाठ-आधारित उत्तर लिखने का अर्थ है — पाठ का सारांश (समरी) लिखना या घटनाओं को क्रमबद्ध करना**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध सुधार:** 1) **पहचान:** विद्यार्थी से पूछो — "तुमने जो लिखा, क्या वह **प्रश्न का सीधा उत्तर** है या **कहानी का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी साहित्यिक पाठ को पढ़ने या सुनने के बाद.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_23_012 (बोध-प्रश्न) के \'आशय-सूचक\' प्रश्नों का अभ्यास दोहराएं.',
          misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा-बिंदु\' पर बोलने का अर्थ है अपनी निजी राय (personal opinion) देना — जैसे "मुझे बड़े भाई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी साहित्यिक पाठ को पढ़ने या सुनने के बाद, उससे',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु का अर्थ है किसी साहित्यिक पाठ को पढ़ने या सुनने के बाद, उससे', '\'बड़े भाई साहब\' प्रेमचंद द्वारा रचित एक आत्मकथात्मक लघुकथा है जो दो भाइयों के माध्यम से', 'कथानक (Plot) किसी कहानी की घटनाओं का तार्किक और कारण-कार्य संबंध पर आधारित क्रमबद्ध', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौतिक स्थान, समय, सामाजिक परिस्थितियों और'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_23_012 (बोध-प्रश्न) के \'आशय-सूचक\' प्रश्नों का अभ्यास दोहराएं — वे.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'चर्चा-बिंदु\' पर बोलने का अर्थ है अपनी निजी राय (personal opinion) देना — जैसे "मुझे बड़े भाई पसंद नहीं क्योंकि वे.' }
          ],
            remediations: { 'personal-opinion-text-based-argument': { steps: ['चरण 1: छात्र से कहें — "अपना वाक्य रोकें। अब पाठ खोलें और वह **सटीक पंक्ति** ढूंढें जो आपके विचार को साबित करती हो।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
