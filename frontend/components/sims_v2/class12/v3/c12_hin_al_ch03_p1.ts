import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch03_p1: SimDef = {
    id: 'v3_c12_hin_al_ch03_p1',
    title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 1/3',
    subtitle: 'The air was once sweet — then \'development\' arrived',
    classLevel: 12, subject: 'hin_al', topic: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 1/3',
    chapters: ['c12_hin_al_ch03'],
    nodeIds: ['c12_hin_al_cbse_03_001', 'c12_hin_al_cbse_03_002', 'c12_hin_al_cbse_03_003', 'c12_hin_al_cbse_03_004', 'c12_hin_al_cbse_03_005', 'c12_hin_al_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Ecological essayist', intro: 'A journalist returns to her Himalayan childhood and finds the air itself has changed. She files it as evidence.', goal: 'Read Apna Malwa as documented ecological witness — memory plus meteorological data against blind development.' },
    discovery: {
        question: 'A Kumaon village once breathed \'cold, sweet, fragrant air\'; now its springs are dry and its oaks gone. Shivani calls it \'the soil\'s incapacity\' — why not \'development\'s failure\'?',
        options: ['The reversal is the argument — the earth simply cannot regenerate water, air and life under the load we call progress; the limit is planetary, not moral', 'She\'s just being poetic', 'Soil got old', 'Development moved elsewhere'],
        answer: 'The reversal is the argument — the earth simply cannot regenerate water, air and life under the load we call progress; the limit is planetary, not moral',
        hook: 'This isn\'t nostalgia — it\'s evidence: 128 years of rainfall data, drought years defined, oak loss breaking the water cycle. Shivani was a rights-based journalist; her personal memory of mountain air is testimony in a case against ecologically blind development.',
    },
    teaching: [
        { title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के संदर्भ और लेखन शैली का अध्ययन करना, ताकि पाठ के गहरे अर्थ और लेखक के उद्देश्य को समझा जा सके।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand where the springs dried: read the rainfall record as indictment, follow oak loss to thermal shift to sensory death, and try on Shivani\'s inversion — development as the soil\'s incapacity.',
        labels: ['अपना मालवा-खाऊ-उजाड़ू सभ्यता में'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c12_hin_al_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 1/3', spots: [
            { id: 's1', label: '-- -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि.', answer: '-- -', options: ['-- -', '-- -'] },
            { id: 's2', label: '-- -', prompt: 'Which idea is this? — पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह.', answer: '-- -', options: ['-- -', '-- -'] }
          ] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Back in your hill hometown for a family wedding, you find the oak ridge replaced by a concrete parking strip and the spring your grandmother drew from now dry. A cousin shrugs: \'That\'s just nostalgia — the road and hotels are development.\'',
            decisions: [{ prompt: 'How would Shivani\'s framing in \'अपना मालवा\' answer him?', options: [
                { text: 'Invert his terms — what we call the technological capacity of development is the soil\'s incapacity; the dried spring isn\'t nostalgia\'s exaggeration but measurable evidence, like the 128-year rainfall record Shivani cites, that the land can no longer regenerate what the concrete took.', outcome: 'Shivani\'s chapter works as documented witness — sensory memory corroborated by data — so the reply isn\'t sentiment versus progress but a redefinition of what \'progress\' is costing the earth itself.' },
                { text: 'Agree with the cousin — fond memories of childhood air are subjective and can\'t argue against measurable growth.', outcome: 'Shivani pre-empts that dismissal by pairing memory with meteorological records; the nostalgia isn\'t sentimentality but observation that the data confirms — dismissing it as \'just feelings\' ignores the evidence.', reveals: 'nostalgia-is-not-evidence' },
                { text: 'Compromise — development is destructive but necessary, so mourn the spring and move on.', outcome: 'The chapter\'s point is sharper than trade-off talk: if \'development\' leaves the soil incapable of sustaining water, air and life, then the word is misapplied — accepting the cost as inevitable dodges the redefinition the text demands.', reveals: 'destruction-is-necessary-price' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue an environmental elegy with data, not just grief — and hear \'progress\' questioned by the land itself.',
            decisions: [{ prompt: 'What comes next? अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक.',
          hint: 'यदि फंसे हुए महसूस हो तो कक्षा 11 के किसी भी पाठ के लेखक परिचय नोड (जैसे.',
          misconception: 'छात्र अक्सर मानते हैं कि लेखक का परिचय केवल जन्म तिथि और प्रमुख कार्यों की सूची भर है — जैसे "ज्योतिबा फुले 1827 में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह', 'कथानक में नायक या प्रमुख पात्र वह मुख्य पात्र है जिसके अनुभव, संघर्ष और विकास कथा की'],
                  hint: 'यदि फंसे हुए महसूस हो तो कक्षा 11 के किसी भी पाठ के लेखक परिचय नोड (जैसे c11_hin_a_cbse_01_001) को.',
                  misconception: 'छात्र अक्सर मानते हैं कि लेखक का परिचय केवल जन्म तिथि और प्रमुख कार्यों की सूची भर है — जैसे "ज्योतिबा फुले 1827 में पैदा हुए, उन्होंने.' }
          ],
            remediations: { '1827': { steps: ['छात्र को पहले ज्योतिबा फुले के जीवन के तीन प्रमुख पहलुओं पर ध्यान केंद्रित करने के लिए कहें: (1) उनकी सामाजिक पृष्ठभूमि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है.',
          hint: 'यदि अटका लगे तो c11_hin_a_cbse_01_002 (आरोह पाठ 1 कथानक-संरचना) के \'कथानक बनाम आख्यान\'.',
          misconception: 'विद्यार्थी समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — दोनों का अर्थ \'कहानी का क्रम\' मान लेते हैं। असल में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि',
                  options: ['कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह', 'कथानक में नायक या प्रमुख पात्र वह मुख्य पात्र है जिसके अनुभव, संघर्ष और विकास कथा की'],
                  hint: 'यदि अटका लगे तो c11_hin_a_cbse_01_002 (आरोह पाठ 1 कथानक-संरचना) के \'कथानक बनाम आख्यान\' तुलना चार्ट.',
                  misconception: 'विद्यार्थी समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — दोनों का अर्थ \'कहानी का क्रम\' मान लेते हैं। असल में कथानक = घटनाओं का.' }
          ],
            remediations: { 'fabula': { steps: ['चरण 1: विद्यार्थी से कहें — पाठ की १० प्रमुख घटनाएँ कागज़ पर तारीख़-वार लिखो (कथानक)। चरण 2: अब पाठ खोलकर देखो लेखक ने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि.',
          hint: 'यदि पाठ्य-परिवेश या वातावरण की पहचान में कठिनाई हो, तो कथानक और आख्यान-संरचना.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल कठिन शब्दों के उपयोग को mean करता है, और वातावरण सिर्फ़ कहानी के घटनाक्रम से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह',
                  options: ['पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'कथानक में नायक या प्रमुख पात्र वह मुख्य पात्र है जिसके अनुभव, संघर्ष और विकास कथा की'],
                  hint: 'यदि पाठ्य-परिवेश या वातावरण की पहचान में कठिनाई हो, तो कथानक और आख्यान-संरचना.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल कठिन शब्दों के उपयोग को mean करता है, और वातावरण सिर्फ़ कहानी के घटनाक्रम से जुड़ा feeling है.' }
          ],
            remediations: { 'mean': { steps: ['छात्र को दिखाइए कि दो वाक्य लें: "हम भोजन करते हैं" और "हमारा खाऊ जारी है" — पहले से शब्दचयन और सामाजिक टिप्पणी में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_004', difficulty: 'standard',
          question: 'कथानक में नायक या प्रमुख पात्र वह मुख्य पात्र है जिसके अनुभव, संघर्ष और विकास.',
          hint: 'यदि फँसें तो कक्षा 11 के पाठ 3 के पाठ्य-परिवेश और वातावरण (c11_hin_a_cbse_03_003) को पुनः.',
          misconception: 'छात्र अक्सर प्रमुख पात्र के चरित्र-चित्रण को केवल उसकी \'सकारात्मक\' गुणों (जैसे साहस, ईमानदारी) तक सीमित रखते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक में नायक या प्रमुख पात्र वह मुख्य पात्र है जिसके अनुभव, संघर्ष और विकास कथा की',
                  options: ['कथानक में नायक या प्रमुख पात्र वह मुख्य पात्र है जिसके अनुभव, संघर्ष और विकास कथा की', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह'],
                  hint: 'यदि फँसें तो कक्षा 11 के पाठ 3 के पाठ्य-परिवेश और वातावरण (c11_hin_a_cbse_03_003) को पुनः देखें.',
                  misconception: 'छात्र अक्सर प्रमुख पात्र के चरित्र-चित्रण को केवल उसकी \'सकारात्मक\' गुणों (जैसे साहस, ईमानदारी) तक सीमित रखते हैं और उसकी कमजोरियों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एक सरल पात्र (जैसे किसी लोककथा के नायक) लें और उससे पूछें: "इस पात्र की कौन सी कार्रवाई आपको बताती है कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ बातचीत करके उसकी विशेषताओं.',
          hint: 'यदि फंसें तो c11_hin_a_cbse_03_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) की दोहराव करें.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र का कार्य केवल मुख्य पात्र की मदद करना है (जैसे उसकी योजना में सहयोग करना या उसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ बातचीत करके उसकी विशेषताओं को उजागर',
                  options: ['सहायक पात्र वे पात्र होते हैं जो मुख्य पात्र के साथ बातचीत करके उसकी विशेषताओं को उजागर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह'],
                  hint: 'यदि फंसें तो c11_hin_a_cbse_03_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) की दोहराव करें, जिसमें मुख्य.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र का कार्य केवल मुख्य पात्र की मदद करना है (जैसे उसकी योजना में सहयोग करना या उसे सलाह देना), जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले मुख्य पात्र के साथ एक संघर्षपूर्ण संबंध वाले पात्र की पहचान करने के लिए कहें (जैसे जो मुख्य पात्र की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार या अवधारणा है जो लेखक अपनी रचना के माध्यम से.',
          hint: 'यदि फंसे हुए हों तो कक्षा 11 के मुख्य विषय और संदेश (c11_hin_a_cbse_01_006) की अवधारणा को.',
          misconception: 'छात्र अक्सर मुख्य विषय को कहानी के शीर्षक या एक विशिष्ट घटना (जैसे "खाऊ की भूख") से जोड़कर समझते हैं, जबकि यह पूरी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार या अवधारणा है जो लेखक अपनी रचना के माध्यम से दोहराना चाहता',
                  options: ['मुख्य विषय वह केंद्रीय विचार या अवधारणा है जो लेखक अपनी रचना के माध्यम से दोहराना चाहता', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-आर्थिक परिस्थितियों, युग के', 'कथानक (Plot) घटनाओं का कारण-कार्य शृंखला में व्यवस्थित क्रमिक प्रस्तुतीकरण है, जबकि', 'पाठ्य-परिवेश वह भाषा, शैली, संरचना और शब्दचयन है जिसमें कहानी लिखी गई है, जबकि वातावरण वह'],
                  hint: 'यदि फंसे हुए हों तो कक्षा 11 के मुख्य विषय और संदेश (c11_hin_a_cbse_01_006) की अवधारणा को दोहराएँ।',
                  misconception: 'छात्र अक्सर मुख्य विषय को कहानी के शीर्षक या एक विशिष्ट घटना (जैसे "खाऊ की भूख") से जोड़कर समझते हैं, जबकि यह पूरी कहानी के माध्यम से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के प्रत्येक भाग के बाद खुद से पूछने के लिए प्रेरित करें: "इस भाग में क्या दिखाया जा रहा है कि हम क्या खो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
