import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch16_p2: SimDef = {
    id: 'v3_c11_hin_a_ch16_p2',
    title: 'घर में वापसी · Part 2/3',
    subtitle: 'यह नोड केवल \'घर में वापसी\' कविता में प्रयुक्त **बिंबों के प्रकार (पंचइंद्रिय वर्गीकरण)**.',
    classLevel: 11, subject: 'hin_a', topic: 'घर में वापसी · Part 2/3',
    chapters: ['c11_hin_a_ch16'],
    nodeIds: ['c11_hin_a_cbse_16_007', 'c11_hin_a_cbse_16_008', 'c11_hin_a_cbse_16_009', 'c11_hin_a_cbse_16_010', 'c11_hin_a_cbse_16_011', 'c11_hin_a_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'क्या आपने कभी किसी पुरानी तस्वीर को देखकर अचानक उस पल की गंध, आवाज़ या स्पर्श महसूस किया है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'घर में वापसी — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Imagery)** काव्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की पाँच इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद) को उद्दीप्त कर मूर्त संवेदनात्मक अनुभूति उत्पन्न करते हैं। **प्रतीक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['घर में वापसी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through घर में वापसी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? घर में वापसी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — घर में वापसी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_007', difficulty: 'standard',
          question: '**बिंब (Imagery)** काव्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की पाँच.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_16_006 (अलंकार)** के कार्यित उदाहरण (Worked Examples) दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'कोई भी सुंदर या भावपूर्ण वर्णन प्रतीक है\'**। उदाहरण: कविता में "माँ के हाथों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** काव्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की पाँच इंद्रियों',
                  options: ['**बिंब (Imagery)** काव्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की पाँच इंद्रियों', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_16_006 (अलंकार)** के कार्यित उदाहरण (Worked Examples) दोबारा देखें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'कोई भी सुंदर या भावपूर्ण वर्णन प्रतीक है\'**। उदाहरण: कविता में "माँ के हाथों की रोटी" का वर्णन.' }
          ],
            remediations: { 'evidence': { steps: ['**चरण 1 — बिंब शुद्धिकरण:** छात्र से कहें: "कविता की 10 पंक्तियाँ चुनो और प्रत्येक के आगे इंद्रिय चिह्न (👁️👂👃👋👅).', '**चरण 2 — प्रतीक लिटमस टेस्ट:** हर संभावित प्रतीक के लिए तीन प्रश्न पूछें: (क) क्या यह मूर्त वस्तु/क्रिया है?', '(हाँ) (ख) क्या इसका कोई *अतिरिक्त* अर्थ है जो पाठ से सिद्ध होता है?', '(हाँ/नहीं) (ग) क्या यह अर्थ कविता के केंद्रीय भाव को आगे बढ़ाता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_008', difficulty: 'standard',
          question: 'मुख्य भाव वह गहरा, सतत मनोभाव है जो कविता के पूरे प्रवाह में अनुभव होता है.',
          hint: 'यदि फँसे हुए हों, तो c11_hin_a_cbse_16_003 (काव्य-संरचना और पद्य-विन्यास) की stanza.',
          misconception: 'छात्र अक्सर मानते हैं कि मुख्य भाव वह एकल भाव है जिसे कविता के पहले या आखिरी पंक्तियों से निकाला जा सकता है—जैसे कि यदि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह गहरा, सतत मनोभाव है जो कविता के पूरे प्रवाह में अनुभव होता है (जैसे शोक में',
                  options: ['मुख्य भाव वह गहरा, सतत मनोभाव है जो कविता के पूरे प्रवाह में अनुभव होता है (जैसे शोक में', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'यदि फँसे हुए हों, तो c11_hin_a_cbse_16_003 (काव्य-संरचना और पद्य-विन्यास) की stanza analysis विधि.',
                  misconception: 'छात्र अक्सर मानते हैं कि मुख्य भाव वह एकल भाव है जिसे कविता के पहले या आखिरी पंक्तियों से निकाला जा सकता है—जैसे कि यदि कविता शुरू में "थकी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह कविता की एक प्रति ले और हर stanza के अंत में एक शब्द लिखे जो उस stanza के भाव को दर्शाता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_009', difficulty: 'standard',
          question: '**गौण भाव** कविता का वह सहायक भाव है जो मुख्य भाव को स्पष्ट, समृद्ध या.',
          hint: 'अगर अटके तो **c11_hin_a_cbse_16_004 (केंद्रीय भाव और रस)** और **c11_hin_a_cbse_16_007.',
          misconception: 'छात्र अक्सर **\'विषयांतर\' को \'कविता का भटकाव\' या \'लेखक का ध्यान भंग\' समझ लेते हैं**। वे सोचते हैं कि कवि मुख्य विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**गौण भाव** कविता का वह सहायक भाव है जो मुख्य भाव को स्पष्ट, समृद्ध या विस्तारित करता है,',
                  options: ['**गौण भाव** कविता का वह सहायक भाव है जो मुख्य भाव को स्पष्ट, समृद्ध या विस्तारित करता है,', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'अगर अटके तो **c11_hin_a_cbse_16_004 (केंद्रीय भाव और रस)** और **c11_hin_a_cbse_16_007 (प्रतीक और.',
                  misconception: 'छात्र अक्सर **\'विषयांतर\' को \'कविता का भटकाव\' या \'लेखक का ध्यान भंग\' समझ लेते हैं**। वे सोचते हैं कि कवि मुख्य विषय (वापसी) से हटकर फालतू की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "कविता का वह अंश पढ़ो जहाँ कवि पुरखों/बचपन की बात करता है। अब आँख बंद करो और सोचो: अगर ये.', 'या पीढ़ियों की कहानी?" **चरण 2:** उसे दो वाक्य लिखने को कहें: (क) विषयांतर के बिना \'घर\' की छवि। (ख) विषयांतर के साथ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_010', difficulty: 'standard',
          question: 'पदावली (Padavali) refers to the specific lexical choices — including archaic.',
          hint: 'यदि अटके तो \'शब्द-शक्ति\' (अभिधा/लक्षणा/व्यंजना) की कक्षा 10 की अवधारणा को दोहराएँ.',
          misconception: 'छात्र अक्सर मानते हैं कि \'कठिन शब्द\' का अर्थ केवल \'तत्सम/संस्कृतनिष्ठ शब्द\' होता है और \'मुहावरे\' केवल अलंकारिक सजावट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Padavali) refers to the specific lexical choices',
                  options: ['पदावली (Padavali) refers to the specific lexical choices', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'यदि अटके तो \'शब्द-शक्ति\' (अभिधा/लक्षणा/व्यंजना) की कक्षा 10 की अवधारणा को दोहराएँ, विशेषकर व्यंजना.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'कठिन शब्द\' का अर्थ केवल \'तत्सम/संस्कृतनिष्ठ शब्द\' होता है और \'मुहावरे\' केवल अलंकारिक सजावट हैं। वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कविता का कोई एक पद पढ़वाएँ और पूछें: "इस पद में कौन-सा शब्द तुम्हें सबसे अधिक \'भारी\' या \'अर्थवान\' लगता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा छंद, लय, अलंकार, प्रतीक, बिंब.',
          hint: 'यदि अटके तो c11_hin_a_cbse_16_010 (पदावली) और c11_hin_a_cbse_16_007 (प्रतीक-बिंब) दोहराएँ.',
          misconception: 'छात्र समझते हैं कि **\'कविता में व्याकरण के नियम टूट जाते हैं\'** या \'कवि व्याकरण नहीं जानता\'। वास्तव में कवि **नियम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा छंद, लय, अलंकार, प्रतीक, बिंब, मुहावरे और',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है कवि द्वारा छंद, लय, अलंकार, प्रतीक, बिंब, मुहावरे और', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_16_010 (पदावली) और c11_hin_a_cbse_16_007 (प्रतीक-बिंब) दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि **\'कविता में व्याकरण के नियम टूट जाते हैं\'** या \'कवि व्याकरण नहीं जानता\'। वास्तव में कवि **नियम जान-बूझ कर तोड़ता है**.' }
          ],
            remediations: { 'foregrounding-automatic-processing': { steps: ['छात्र से कहो: **"कविता की एक पंक्ति लो और उसे \'सामान्य बोलचाल\' में लिखो।"** 2.', 'फिर दोनों की **तुलना तालिका** बनाओ: पद-क्रम, शब्द-चयन, कारक, काल। 3.', 'पूछो: **"कवि ने क्या बदला और क्यों?"** — हर बदलाव के आगे \'भाव-प्रभाव\' लिखवाओ। 4.', 'अंत में वही प्रक्रिया दूसरी पंक्ति पर **स्वतंत्र रूप से** करवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_16_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न वे प्रश्न हैं जिनका उत्तर निश्चित, संक्षिप्त और एक ही सही.',
          hint: 'यदि अटके तो c11_hin_a_cbse_16_002 (पद्यांश-वार भावार्थ) और c11_hin_a_cbse_16_010 (कठिन.',
          misconception: 'छात्र समझते हैं कि \'वस्तुनिष्ठ\' का अर्थ \'सरल\' और \'आशय-सूचक\' का अर्थ \'कठिन\' है, इसलिए वे वस्तुनिष्ठ प्रश्नों को हल्के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न वे प्रश्न हैं जिनका उत्तर निश्चित, संक्षिप्त और एक ही सही होता है',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न वे प्रश्न हैं जिनका उत्तर निश्चित, संक्षिप्त और एक ही सही होता है', '\'घर में वापसी\' धूमिल (सुदामा पांडेय) द्वारा रचित एक आधुनिक हिंदी कविता है जो ग्रामीण', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/अनुच्छेद) को लेकर उसके', 'काव्य-संरचना कविता के आंतरिक अवयवों'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_16_002 (पद्यांश-वार भावार्थ) और c11_hin_a_cbse_16_010 (कठिन शब्द) को.',
                  misconception: 'छात्र समझते हैं कि \'वस्तुनिष्ठ\' का अर्थ \'सरल\' और \'आशय-सूचक\' का अर्थ \'कठिन\' है, इसलिए वे वस्तुनिष्ठ प्रश्नों को हल्के में लेते हैं (विकल्पों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को 5 वस्तुनिष्ठ और 5 आशय-सूचक प्रश्न दें जिनके उत्तर ज्ञात हों; उनसे \'निर्देशक शब्द\' (क्या, क्यों, कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
