import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch01_p2: SimDef = {
    id: 'v3_c6_hin_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'इस नोड में केवल गौण विषय की पहचान, मुख्य विषय से उसका संबंध, और पाठ-आधारित प्रमाण देना.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c6_hin_ch01'],
    nodeIds: ['c6_hin_cbse_01_007', 'c6_hin_cbse_01_008', 'c6_hin_cbse_01_009', 'c6_hin_cbse_01_010', 'c6_hin_cbse_01_011', 'c6_hin_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी रोटी-सब्जी खाते समय सोचा है कि अचार या सलाद क्यों परोसा जाता है?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'एक नई कविता की इन पंक्तियों पर विचार करें: "फूल मुस्कुराए जब भंवरा आया / पत्ते थिरके जब हवा चली।" एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न बनाएं जिनके उत्तर.',
        options: ['वस्तुनिष्ठ: "कविता में फूल कब मुस्कुराए?" (उत्तर: जब भंवरा आया', '** They treat inferential questions as', 'opinion questions'],
        answer: 'वस्तुनिष्ठ: "कविता में फूल कब मुस्कुराए?" (उत्तर: जब भंवरा आया',
        hook: 'Students believe **"If I can\'t find the exact sentence in the text, the answer is wrong/doesn\'t exist."** They treat.',
    },
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'गौण विषय (Sub-theme) कहानी या कविता में मुख्य विषय के साथ चलने वाला वह सहायक विचार या प्रसंग है जो मुख्य विषय को स्पष्ट, समृद्ध या विस्तारित करता है, परन्तु स्वयं स्वतंत्र रूप से कथा का केंद्र नहीं.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_012', title: 'पाठ 1 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Have you ever had a friend say "I\'m fine" but their crossed arms and silence told you they were actually upset?',
            decisions: [{ prompt: 'पाठ में पूछे गए प्रश्न "कहानी का मुख्य पात्र कौन है?" और "मुख्य पात्र ने वह निर्णय क्यों लिया?" में क्या अंतर है?', options: [
                { text: '"कहानी का मुख्य पात्र कौन है?" वस्तुनिष्ठ प्रश्न है क्योंकि इसका उत्तर पाठ में सीधे लिखा', outcome: '"कहानी का मुख्य पात्र कौन है?" वस्तुनिष्ठ प्रश्न है क्योंकि इसका उत्तर पाठ में सीधे लिखा होता है।.' },
                { text: '** They treat inferential questions as', outcome: 'Not quite — Students believe **"If I can\'t find the exact sentence in the text, the answer is wrong/doesn\'t.', reveals: 'if-i-can-t-find' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe **"If I can\'t find the exact sentence in the text, the answer is wrong/doesn\'t.', reveals: 'if-i-can-t-find' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कहानी या कविता में मुख्य विषय के साथ चलने वाला वह सहायक.',
          hint: 'अगर अटके तो नोड 006 (मुख्य विषय और संदेश) की कार्यप्रणाली दोहराएं: पाठ का सार लिखें, फिर.',
          misconception: 'छात्र अक्सर गौण विषय को \'कहानी का कोई भी छोटा प्रसंग\' या \'दूसरा मुख्य विषय\' समझ लेते हैं। वास्तव में गौण विषय स्वतंत्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कहानी या कविता में मुख्य विषय के साथ चलने वाला वह सहायक विचार या',
                  options: ['गौण विषय (Sub-theme) कहानी या कविता में मुख्य विषय के साथ चलने वाला वह सहायक विचार या', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'अगर अटके तो नोड 006 (मुख्य विषय और संदेश) की कार्यप्रणाली दोहराएं: पाठ का सार लिखें, फिर एक वाक्य.',
                  misconception: 'छात्र अक्सर गौण विषय को \'कहानी का कोई भी छोटा प्रसंग\' या \'दूसरा मुख्य विषय\' समझ लेते हैं। वास्तव में गौण विषय स्वतंत्र विषय नहीं, बल्कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक परिचित कहानी (जैसे \'बंदर और मगरमच्छ\') दें और मुख्य विषय लिखवाएं। २.', 'फिर पूछें: \'कहानी में और कौन-सी बात बार-बार आई जो इस मुख्य बात को साबित करती रही?\' — छात्र के उत्तर को बोर्ड पर लिखें।.', 'प्रत्येक उत्तर के आगे पूछें: \'यह मुख्य विषय को कैसे सहारा देता है?\' — तीर खींचकर संबंध दिखाएं। ४.', 'अंत में परिभाषा दोहराएं: \'गौण विषय = मुख्य विषय का सहायक विचार, प्रमाण सहित\'। ५.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the.',
          hint: 'If stuck, review "संज्ञा, क्रिया, विशेषण" identification in simple Hindi sentences (Class.',
          misconception: 'Students confuse **बिंब** with **adjectives/description** and **रूपक** with **उपमा (simile)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the five senses',
                  options: ['**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the five senses', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'If stuck, review "संज्ञा, क्रिया, विशेषण" identification in simple Hindi sentences (Class 5.',
                  misconception: 'Students confuse **बिंब** with **adjectives/description** and **रूपक** with **उपमा (simile)**.' }
          ],
            remediations: { 'students-confuse-with-adjectives-description': { steps: ['** Give the student 5 simple sentences, each targeting one sense (e.g., "The lemon tasted sour" → taste).', '** Show 3 metaphors and 3 similes side-by-side. Ask: "Which ones use \'like/as\'?" → label those उपमा.', '** For quality-transfer, use the "Quality Bridge" template: "X है Y → Y की कौन-सी विशेषता X पर लागू होती है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_01_008 (बिंब और रूपक)** के कार्य उदाहरणों को.',
          misconception: 'छात्र अक्सर सोचते हैं कि **विरोधाभास का अर्थ "गलत कथन" या "बकवास" है** और **प्रतीक का अर्थ "सुंदर सजावट" या "तुलना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ कहकर एक गहरा',
                  options: ['**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ कहकर एक गहरा', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_01_008 (बिंब और रूपक)** के कार्य उदाहरणों को दोहराएँ.',
                  misconception: 'छात्र अक्सर सोचते हैं कि **विरोधाभास का अर्थ "गलत कथन" या "बकवास" है** और **प्रतीक का अर्थ "सुंदर सजावट" या "तुलना" है**। उदाहरण: पंक्ति.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास के लिए:** छात्र को 3 दैनिक जीवन के विरोधाभास बोलने को कहो (जैसे "जल्दी करो धीरे-धीरे", "खामोश आवाज़")। फिर.', 'या ये किसी हालत का सच्चा चित्र हैं?" इससे वे \'विरोध\' को \'सत्य का द्वार\' समझने लगेंगे। 2.', '**प्रतीक के लिए:** कक्षा में रखी किसी एक वस्तु (चॉक, डस्टर, घंटी) को उठाओ और पूछो: "यह क्या है?', 'और क्या यह किसी आदत/नियम/भावना की याद दिलाती है?" जैसे घंटी = समय की पाबंदी, अनुशासन। फिर पाठ की पंक्ति पर लौटकर यही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द का अर्थ है — पाठ में आए उन **चुनिंदा शब्दों की पहचान और.',
          hint: 'यदि फँस जाएँ तो \'पाठ 1 — मुख्य विषय और संदेश\' (c6_hin_cbse_01_006) दोहराएँ: विषय पता होगा.',
          misconception: 'छात्र मानते हैं कि **मुख्य शब्द = कठिन/नया/लंबा शब्द**। वे \'प्रतिबिंब\', \'अनंत\', \'चिरंतन\' जैसे शब्दों को घेर लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द का अर्थ है',
                  options: ['पदावली: मुख्य शब्द का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि फँस जाएँ तो \'पाठ 1 — मुख्य विषय और संदेश\' (c6_hin_cbse_01_006) दोहराएँ: विषय पता होगा तो उसके.',
                  misconception: 'छात्र मानते हैं कि **मुख्य शब्द = कठिन/नया/लंबा शब्द**। वे \'प्रतिबिंब\', \'अनंत\', \'चिरंतन\' जैसे शब्दों को घेर लेते हैं क्योंकि वे "शब्दकोश.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को एक परिचित वाक्य दें — "माँ ने **थाली** रख दी।" पूछें: "यहाँ मुख्य शब्द कौन-सा है?" (उत्तर: थाली नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग का अर्थ है किसी पाठ में शब्दों, वाक्यों, विराम चिह्नों और शैली का.',
          hint: 'यदि अटका हुआ लगे: **पदावली नोड (c6_hin_cbse_01_010)** के \'शब्दों के भाव-पक्ष\' खंड को.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है — **कठिन/तत्सम शब्दों का प्रयोग करना** (जैसे \'गृह\' के लिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग का अर्थ है किसी पाठ में शब्दों, वाक्यों, विराम चिह्नों और शैली का ऐसा चयन',
                  options: ['भाषा-प्रयोग का अर्थ है किसी पाठ में शब्दों, वाक्यों, विराम चिह्नों और शैली का ऐसा चयन', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध (cause-effect chain)** है जो नायक के', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित वह काल, स्थान, सामाजिक-सांस्कृतिक'],
                  hint: 'यदि अटका हुआ लगे: **पदावली नोड (c6_hin_cbse_01_010)** के \'शब्दों के भाव-पक्ष\' खंड को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है — **कठिन/तत्सम शब्दों का प्रयोग करना** (जैसे \'गृह\' के लिए \'घर\', \'जल\' के लिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**वास्तविक जीवन से जोड़ो:** छात्र से पूछो — "तुम अपनी माँ से कैसे बोलते हो?', 'फिर फर्क क्यों?" — उसे **अपनी ही भाषा-शैली बदलने** का बोध कराओ। 2.', '**पाठ से दो संवाद निकालो:** एक बुजुर्ग का, एक बच्चे का। छात्र से कहो — "दोनों के संबोधन शब्द, क्रिया रूप, वाक्य लंबाई.', '**\'क्यों\' पर अड़ो:** हर अंतर पर पूछो — "लेखक ने ऐसा **क्यों** किया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_012', difficulty: 'standard',
          question: 'Vastu-nishth (objective) questions test recall of explicit facts, details,.',
          hint: 'If stuck, review **c6_hin_cbse_01_002 (Plot/Events)** to list explicit facts, and.',
          misconception: 'Students believe **"If I can\'t find the exact sentence in the text, the answer is wrong/doesn\'t exist."** They treat.',
          parts: [
                { id: 'a', prompt: 'एक नई कविता की इन पंक्तियों पर विचार करें: "फूल मुस्कुराए जब भंवरा आया / पत्ते थिरके जब हवा चली।" एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न बनाएं जिनके उत्तर.', answer: 'वस्तुनिष्ठ: "कविता में फूल कब मुस्कुराए?" (उत्तर: जब भंवरा आया',
                  options: ['वस्तुनिष्ठ: "कविता में फूल कब मुस्कुराए?" (उत्तर: जब भंवरा आया', '** They treat inferential questions as', 'opinion questions'],
                  hint: 'If stuck, review **c6_hin_cbse_01_002 (Plot/Events)** to list explicit facts, and.',
                  misconception: 'Students believe **"If I can\'t find the exact sentence in the text, the answer is wrong/doesn\'t exist."** They treat inferential questions.' }
          ],
            remediations: { 'if-i-can-t-find': { steps: ['**Play the "Evidence Detective" game:** Give the student 3 explicit sentences (clues) from a familiar story.', 'Ask: "What *must* be true even if not written?" (e.g., "Rohan wet his umbrella.', '**Color-code the text:** Use a yellow highlighter for **Explicit Facts** (Vastu-nishth) and a green highlighter for.', '**Sentence Stems:** Force the structure: "The text says ______.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
