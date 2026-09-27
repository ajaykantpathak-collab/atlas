import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch09_p1: SimDef = {
    id: 'v3_c7_hin_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'इस नोड में केवल पाठ 9 की पृष्ठभूमि (काल, समाज, परिवेश) और रचनाकार के जीवन के प्रासंगिक.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c7_hin_ch09'],
    nodeIds: ['c7_hin_cbse_09_001', 'c7_hin_cbse_09_002', 'c7_hin_cbse_09_003', 'c7_hin_cbse_09_004', 'c7_hin_cbse_09_005', 'c7_hin_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'मान लीजिए आपको एक पुराना पारिवारिक फोटो एल्बम मिलता है जिसमें दादा जी की तस्वीर है, लेकिन आप उन्हें जानते.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ (पृष्ठभूमि) तथा लेखक के जीवन, विचारधारा और लेखन शैली (रचनाकार परिचय) को जानना, ताकि रचना की गहराई.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है — यानी घटनाएँ वास्तव.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है.', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक.',
          hint: 'यदि अटके तो कक्षा 6 के नोड **c6_hin_cbse_09_001** (पाठ 9 — पृष्ठभूमि और रचनाकार परिचय) के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — लेखक का जन्म-स्थान, जन्म-तिथि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा लेखक नायक/प्रमुख'],
                  hint: 'यदि अटके तो कक्षा 6 के नोड **c6_hin_cbse_09_001** (पाठ 9 — पृष्ठभूमि और रचनाकार परिचय) के \'रचनाकार.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — लेखक का जन्म-स्थान, जन्म-तिथि, शिक्षा, प्रमुख रचनाएँ और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**तथ्य छाँटना**: छात्र से कहें — "लेखक के जीवन के 5 तथ्य लिखो। अब प्रत्येक के आगे ✓ या ✗ लगाओ: क्या इस तथ्य का पाठ 9 के.', '**संबंध बनाना**: प्रत्येक ✓ तथ्य के लिए एक वाक्य लिखवाएँ: "यह तथ्य पाठ में यहाँ झलकता है: ______।" 3.', '**पृष्ठभूमि जोड़ना**: तत्कालीन समाज की एक बड़ी घटना (कानून, आंदोलन, अकाल, सुधार) चुनवाएँ और पूछें: "इस घटना ने लेखक को.', 'पाठ में उसकी छाप कहाँ दिखती है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है — यानी.',
          hint: 'यदि छात्र अटका है, तो \'कहानी मानचित्रण\' (story mapping) का अभ्यास करवाएँ: किसी परिचित.',
          misconception: 'छात्र अक्सर समझते हैं कि \'कथानक = कहानी का सारांश\' और \'आख्यान-संरचना = अध्यायों में विभाजन\'। यह गलत है क्योंकि: (1).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा लेखक नायक/प्रमुख'],
                  hint: 'यदि छात्र अटका है, तो \'कहानी मानचित्रण\' (story mapping) का अभ्यास करवाएँ: किसी परिचित कहानी.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'कथानक = कहानी का सारांश\' और \'आख्यान-संरचना = अध्यायों में विभाजन\'। यह गलत है क्योंकि: (1) सारांश में कारण-कार्य.' }
          ],
            remediations: { '1-causality': { steps: ['**चरण 1:** छात्र से एक परिचित फिल्म (जैसे \'बाहुबली\' या \'दंगल\') का कथानक कालानुक्रमिक क्रम में लिखवाएँ। **चरण 2:** फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 6 के पाठ 9 (c6_hin_cbse_09_003) के \'परिवेश पहचान\' अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'वातावरण\' (Atmosphere/Mood) और \'टोन\' (Tone/लहजा) एक ही चीज़ हैं, और दोनों लेखक के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,',
                  options: ['पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा लेखक नायक/प्रमुख'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 6 के पाठ 9 (c6_hin_cbse_09_003) के \'परिवेश पहचान\' अभ्यास दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'वातावरण\' (Atmosphere/Mood) और \'टोन\' (Tone/लहजा) एक ही चीज़ हैं, और दोनों लेखक के दृष्टिकोण को दर्शाते.' }
          ],
            remediations: { 'atmosphere-mood-tone': { steps: ['**चरणबद्ध उपचार:** (1) छात्र को दो छोटे अंश दो — एक \'करुण वातावरण + व्यंग्यात्मक टोन\' वाला, दूसरा \'उल्लासपूर्ण वातावरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा लेखक.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के किसी भी पाठ (जैसे पाठ 1, 4, या 9) का नायक-चित्रण**.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'पात्र के गुणों की सूची\' (trait list)** को **\'पात्र-चित्रण\' (characterization)** मान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा लेखक नायक/प्रमुख',
                  options: ['पात्र-चित्रण (Characterization) एक साहित्यिक प्रक्रिया है जिसके द्वारा लेखक नायक/प्रमुख', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के किसी भी पाठ (जैसे पाठ 1, 4, या 9) का नायक-चित्रण** दोबारा.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'पात्र के गुणों की सूची\' (trait list)** को **\'पात्र-चित्रण\' (characterization)** मान लेते हैं। वे लिखते.' }
          ],
            remediations: { 'trait-list-characterization': { steps: ['**चरण 1**: छात्र से कहें — "पाठ खोलो और नायक के **सबसे कठिन 3 फैसले** ढूंढो। प्रत्येक के आगे लिखो: उसने क्या किया?', 'उसका शरीर कैसे प्रतिक्रिया दे रहा था?" **चरण 2**: एक **दो-स्तंभ तालिका** बनवाएं: बाएं कॉलम में **प्रमाण (पाठ से.', '(जैसे: वह साहसी भी है और डरपोक भी)" — यही **जटिलता** है। **चरण 4**: अंत में कहें — "अब लिखो: \'लेखक ने नायक का साहस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कहानी में रहते हैं.',
          hint: 'यदि अटके तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_005 से c6_hin_cbse_09_005) का \'सहायक.',
          misconception: 'छात्र अक्सर मानते हैं कि **\'सहायक पात्र = कम महत्त्वपूर्ण पात्र\'**। वे स्क्रीन-टाइम या संवादों की संख्या से महत्त्व.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कहानी में रहते हैं, कथानक को',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कहानी में रहते हैं, कथानक को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'यदि अटके तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_005 से c6_hin_cbse_09_005) का \'सहायक पात्र\' खंड.',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'सहायक पात्र = कम महत्त्वपूर्ण पात्र\'**। वे स्क्रीन-टाइम या संवादों की संख्या से महत्त्व आंकते हैं। असल में, एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित कहानी (जैसे \'थ्री इडियट्स\' फ़िल्म) दें और पूछें: "रणछोड़दास (नायक) के अलावा फरहान और राजू के बिना.', 'फिर समझाएँ: "फरहान कला का सपना दिखाता है (थीम), राजू पारिवारिक दबाव दिखाता है (यथार्थ) — दोनों नायक के दो पहलू उजागर.', 'अब पाठ पर लौटें: हर सहायक पात्र के लिए पूछें — "यह नायक का कौन-सा पहलू उजागर करता है?', 'कथानक में कौन-सा मोड़ लाता है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_09_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह एक व्यापक विचार या सार्वभौमिक सत्य है जो पूरी.',
          hint: 'अगर अटका लगे तो c7_hin_cbse_09_004 और c7_hin_cbse_09_005 के \'निर्णायक मोड़\' वाले खंड.',
          misconception: 'छात्र अक्सर मान लेते हैं कि **मुख्य विषय = कहानी का नैतिक उपदेश (Moral)** जो अंत में साफ़-साफ़ लिखा होता है, जैसे "सच.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह एक व्यापक विचार या सार्वभौमिक सत्य है जो पूरी रचना में',
                  options: ['मुख्य विषय (Central Theme) वह एक व्यापक विचार या सार्वभौमिक सत्य है जो पूरी रचना में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का कालानुक्रमिक (chronological) क्रम है', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का समय, स्थान, भौगोलिक और सामाजिक परिदृश्य है,'],
                  hint: 'अगर अटका लगे तो c7_hin_cbse_09_004 और c7_hin_cbse_09_005 के \'निर्णायक मोड़\' वाले खंड दोबारा पढ़ें।',
                  misconception: 'छात्र अक्सर मान लेते हैं कि **मुख्य विषय = कहानी का नैतिक उपदेश (Moral)** जो अंत में साफ़-साफ़ लिखा होता है, जैसे "सच बोलो"। जबकि.' }
          ],
            remediations: { 'moral': { steps: ['छात्र से कहो: "पाठ के तीन सबसे बड़े मोड़ (turning points) लिखो जहाँ पात्र ने चुनाव किया।" 2.', 'हर मोड़ के सामने लिखवाओ: "पात्र ने क्या चुना?', 'तीनों उत्तरों में **कौन-सा शब्द/विचार बार-बार आ रहा है** — उसे घेरो (वही विषय है)। 4.', 'अब पूछो: "लेखक इस बार-बार आने वाले विचार से हमें क्या समझाना चाहता है?" — वही संदेश है। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
