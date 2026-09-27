import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch03_p3: SimDef = {
    id: 'v3_c12_hin_al_ch03_p3',
    title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 3/3',
    subtitle: 'The air was once sweet — then \'development\' arrived',
    classLevel: 12, subject: 'hin_al', topic: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 3/3',
    chapters: ['c12_hin_al_ch03'],
    nodeIds: ['c12_hin_al_cbse_03_013', 'c12_hin_al_cbse_03_014', 'c12_hin_al_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Ecological essayist', intro: 'A journalist returns to her Himalayan childhood and finds the air itself has changed. She files it as evidence.', goal: 'Read Apna Malwa as documented ecological witness — memory plus meteorological data against blind development.' },
    discovery: {
        question: 'A Kumaon village once breathed \'cold, sweet, fragrant air\'; now its springs are dry and its oaks gone. Shivani calls it \'the soil\'s incapacity\' — why not \'development\'s failure\'?',
        options: ['The reversal is the argument — the earth simply cannot regenerate water, air and life under the load we call progress; the limit is planetary, not moral', 'She\'s just being poetic', 'Soil got old', 'Development moved elsewhere'],
        answer: 'The reversal is the argument — the earth simply cannot regenerate water, air and life under the load we call progress; the limit is planetary, not moral',
        hook: 'This isn\'t nostalgia — it\'s evidence: 128 years of rainfall data, drought years defined, oak loss breaking the water cycle. Shivani was a rights-based journalist; her personal memory of mountain air is testimony in a case against ecologically blind development.',
    },
    teaching: [
        { title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: पाठ का गहरा विश्लेषण करके उसके विषय, पात्र-चित्रण, भाषा-प्रयोग और साहित्यिक युक्तियों को समझना, और उनके आधार पर तर्कसंगत निष्कर्ष निकालना।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand where the springs dried: read the rainfall record as indictment, follow oak loss to thermal shift to sensory death, and try on Shivani\'s inversion — development as the soil\'s incapacity.',
        labels: ['अपना मालवा-खाऊ-उजाड़ू सभ्यता में'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c12_hin_al_cbse_03_014', title: 'Identify each idea',
          dissect: { specimen: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 3/3', spots: [
            { id: 's1', label: '-- -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ से साक्ष्य निकालकर, उसकी व्याख्या.', answer: '-- -', options: ['-- -', '-- - -'] },
            { id: 's2', label: '-- - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' एक सहभागितापूर्ण भाषा-कौशल गतिविधि है जिसमें शिक्षार्थी पाठ का.', answer: '-- - -', options: ['-- - -', '-- -'] }
          ] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Back in your hill hometown for a family wedding, you find the oak ridge replaced by a concrete parking strip and the spring your grandmother drew from now dry. A cousin shrugs: \'That\'s just nostalgia — the road and hotels are development.\'',
            decisions: [{ prompt: 'How would Shivani\'s framing in \'अपना मालवा\' answer him?', options: [
                { text: 'Invert his terms — what we call the technological capacity of development is the soil\'s incapacity; the dried spring isn\'t nostalgia\'s exaggeration but measurable evidence, like the 128-year rainfall record Shivani cites, that the land can no longer regenerate what the concrete took.', outcome: 'Shivani\'s chapter works as documented witness — sensory memory corroborated by data — so the reply isn\'t sentiment versus progress but a redefinition of what \'progress\' is costing the earth itself.' },
                { text: 'Agree with the cousin — fond memories of childhood air are subjective and can\'t argue against measurable growth.', outcome: 'Shivani pre-empts that dismissal by pairing memory with meteorological records; the nostalgia isn\'t sentimentality but observation that the data confirms — dismissing it as \'just feelings\' ignores the evidence.', reveals: 'nostalgia-is-not-evidence' },
                { text: 'Compromise — development is destructive but necessary, so mourn the spring and move on.', outcome: 'The chapter\'s point is sharper than trade-off talk: if \'development\' leaves the soil incapable of sustaining water, air and life, then the word is misapplied — accepting the cost as inevitable dodges the redefinition the text demands.', reveals: 'destruction-is-necessary-price' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue an environmental elegy with data, not just grief — and hear \'progress\' questioned by the land itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: पाठ का गहरा विश्लेषण करके उसके विषय, पात्र-चित्रण.',
          hint: 'यदि फंस रहे हैं तो कक्षा 11 के नोड c11_hin_a_cbse_03_013 का पुनः अध्ययन करें, जहाँ.',
          misconception: 'छात्र अक्सर पाठ के विश्लेषण में केवल घटनाओं का क्रम वर्णन कर देते हैं और मान लेते हैं कि यही आलोचनात्मक चिंतन है—जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: पाठ का गहरा विश्लेषण करके उसके विषय, पात्र-चित्रण, भाषा-प्रयोग और',
                  options: ['आलोचनात्मक चिंतन: पाठ का गहरा विश्लेषण करके उसके विषय, पात्र-चित्रण, भाषा-प्रयोग और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह'],
                  hint: 'यदि फंस रहे हैं तो कक्षा 11 के नोड c11_hin_a_cbse_03_013 का पुनः अध्ययन करें, जहाँ आलोचनात्मक चिंतन.',
                  misconception: 'छात्र अक्सर पाठ के विश्लेषण में केवल घटनाओं का क्रम वर्णन कर देते हैं और मान लेते हैं कि यही आलोचनात्मक चिंतन है—जैसे कि "पहले मालवा में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर जैसे "मालवा बदल गया" को कैसे मजबूत बनाया जाए: पहले उसे कहानी से दो विशिष्ट उदाहरण.', 'अंत में उसे कहिए कि लेखक के शब्द चयन (जैसे उजाड़ू, खाऊ) से ये भाव कैसे मजबूत होते हैं। इस 3-चरणीय प्रक्रिया से उसे समझ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ से साक्ष्य निकालकर, उसकी.',
          hint: 'यदि छात्र PEEL में Evidence और Explanation के बीच के अंतर को नहीं समझ पा रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में केवल उदाहरण दोहराना या पाठ से सीधी प्रतिलिपि बनाना पर्याप्त है, क्योंकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ से साक्ष्य निकालकर, उसकी व्याख्या',
                  options: ['पाठ-आधारित लेखन कौशल वह प्रक्रिया है जिसमें दिए गए पाठ से साक्ष्य निकालकर, उसकी व्याख्या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह'],
                  hint: 'यदि छात्र PEEL में Evidence और Explanation के बीच के अंतर को नहीं समझ पा रहा है, तो उसे कक्षा 11 के.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में केवल उदाहरण दोहराना या पाठ से सीधी प्रतिलिपि बनाना पर्याप्त है, क्योंकि वे मानते हैं कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को सुधारने के लिए, छात्र को पहले एक कमजोर उत्तर (जैसे केवल उदाहरण देना) दिखाइए और पूछिए, "इस उत्तर में क्या कम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहभागितापूर्ण भाषा-कौशल गतिविधि है जिसमें.',
          hint: 'यदि चर्चा में बोलते समय शब्द न सूझें या तर्क न बने, तो तुरंत पाठ खोलकर **सूरजमल के किसी.',
          misconception: 'छात्र अक्सर समझते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है **शिक्षक प्रश्न पूछे, छात्र उत्तर दें** — यह \'प्रश्नोत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहभागितापूर्ण भाषा-कौशल गतिविधि है जिसमें शिक्षार्थी पाठ का',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' एक सहभागितापूर्ण भाषा-कौशल गतिविधि है जिसमें शिक्षार्थी पाठ का', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह'],
                  hint: 'यदि चर्चा में बोलते समय शब्द न सूझें या तर्क न बने, तो तुरंत पाठ खोलकर **सूरजमल के किसी एक संवाद**.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है **शिक्षक प्रश्न पूछे, छात्र उत्तर दें** — यह \'प्रश्नोत्तर सत्र\' (Q&A) है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को पाठ का कोई **एक छोटा अंश (5-6 पंक्तियाँ)** दें और कहें — "इसे तीन बार पढ़ो: पहली बार अर्थ के लिए, दूसरी.', 'क्या स्वर में भाव था?" चरण 4: यही प्रक्रिया सप्ताह में दो बार दोहराएँ, हर बार अंश बदलें। 3 सप्ताह में \'साक्ष्य-आधारित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
