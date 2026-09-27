import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_al_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_al_ch02_p2: SimDef = {
    id: 'v3_c11_hin_al_ch02_p2',
    title: 'आवारा मसीहा · Part 2/3',
    subtitle: 'यह नोड केवल \'आवारा मसीहा\' उपन्यास के गौण विषयों (जैसे: स्त्री-विमर्श, साम्प्रदायिक.',
    classLevel: 11, subject: 'hin_al', topic: 'आवारा मसीहा · Part 2/3',
    chapters: ['c11_hin_al_ch02'],
    nodeIds: ['c11_hin_al_cbse_02_007', 'c11_hin_al_cbse_02_008', 'c11_hin_al_cbse_02_009', 'c11_hin_al_cbse_02_010', 'c11_hin_al_cbse_02_011', 'c11_hin_al_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना करें आप एक फिल्म देख रहे हैं जहाँ हीरो का मुख्य लक्ष्य \'डॉक्टर बनना\' है, लेकिन साथ-साथ फिल्म उसकी बहन.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'आवारा मसीहा — गौण विषय', text: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें कृति का केंद्रीय विषय (मुख्य थीम) के समानांतर चलने वाले सहायक विचार, प्रसंग या सामाजिक यथार्थ आते हैं, जो मुख्य विषय को पुष्ट करते हैं, उसका.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_al_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['आवारा मसीहा — गौण', 'आवारा मसीहा — साहित्यिक', 'आवारा मसीहा — पदावली', 'आवारा मसीहा — व्याकरण', 'आवारा मसीहा — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_al_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through आवारा मसीहा like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? आवारा मसीहा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आवारा मसीहा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें कृति का केंद्रीय विषय.',
          hint: 'अगर अटके तो c11_hin_al_cbse_02_006 (मुख्य विषय) और c11_hin_al_cbse_02_002 (कथानक) को.',
          misconception: 'छात्र अक्सर मानते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' होता है, इसलिए वे इन्हें परीक्षा में छोड़ देते हैं या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें कृति का केंद्रीय विषय (मुख्य थीम) के',
                  options: ['गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें कृति का केंद्रीय विषय (मुख्य थीम) के', '"आवारा मसीहा" की पृष्ठभूमि और रचनाकार परिचय में कहानी के लेखक, उनके जीवन के तथ्य, कहानी', '**कथानक (Plot)** किसी रचना में घटित घटनाओं का कालानुक्रमिक (Chronological) क्रम है, जबकि', '\'पाठ्य-परिवेश और वातावरण\' किसी रचना में **काल, स्थान, सामाजिक-राजनीतिक परिस्थितियों,'],
                  hint: 'अगर अटके तो c11_hin_al_cbse_02_006 (मुख्य विषय) और c11_hin_al_cbse_02_002 (कथानक) को दोबारा पढ़ें.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'गौण विषय\' का अर्थ \'कम महत्वपूर्ण विषय\' होता है, इसलिए वे इन्हें परीक्षा में छोड़ देते हैं या केवल नाम गिना देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के किसी एक अध्याय को चुनो जहाँ शरत सीधे न हों, केवल समाज/पात्र दिखें (जैसे रहमत मियाँ का प्रसंग)।.', 'फिर पूछें: "यही प्रसंग अगर हटा दिया जाए तो शरत का चरित्र-चित्रण कितना अधूरा रह जाएगा?" 3.', 'अंत में समझाएँ: "यही गौण विषय की भूमिका है — नायक की अनुपस्थिति में भी नायक को \'बनाना\'।" 4.', 'अभ्यास: PEEL संरचना में 3 गौण विषयों पर 3 मिनी-उत्तर लिखवाएँ, हर बार Link चरण में मुख्य विषय से जोड़ने पर जोर दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि अटके तो **कक्षा 10 की \'अलंकार\' पाठ्य-सामग्री** (उपमा, रूपक, उत्प्रेक्षा की परिभाषा और.',
          misconception: 'छात्र प्रायः **बिंब को \'चित्रात्मक वर्णन\'** और **रूपक को \'सुंदर तुलना\'** मान लेते हैं। वास्तव में बिंब **इंद्रिय-बोध**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों', '"आवारा मसीहा" की पृष्ठभूमि और रचनाकार परिचय में कहानी के लेखक, उनके जीवन के तथ्य, कहानी', '**कथानक (Plot)** किसी रचना में घटित घटनाओं का कालानुक्रमिक (Chronological) क्रम है, जबकि', '\'पाठ्य-परिवेश और वातावरण\' किसी रचना में **काल, स्थान, सामाजिक-राजनीतिक परिस्थितियों,'],
                  hint: 'यदि अटके तो **कक्षा 10 की \'अलंकार\' पाठ्य-सामग्री** (उपमा, रूपक, उत्प्रेक्षा की परिभाषा और उदाहरण).',
                  misconception: 'छात्र प्रायः **बिंब को \'चित्रात्मक वर्णन\'** और **रूपक को \'सुंदर तुलना\'** मान लेते हैं। वास्तव में बिंब **इंद्रिय-बोध** जगाता है (चित्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "आँख बंद करो, मैं एक वाक्य पढ़ता हूँ — \'रसोई से जीरे की खुशबू आई\' — तुम्हें क्या **महसूस** हुआ?', 'अब \'रसोई में खाना बन रहा था\' — अंतर बताओ।" → इससे **बिंब = इंद्रिय-अनुभूति** स्पष्ट होगा। 2.', 'दो वाक्य दें: "वह फूल-सा कोमल है" (उपमा) और "वह कोमलता का फूल है" (रूपक) — पूछें: "दूसरे में \'वह\' **क्या बन गया**?" →.', 'पाठ से एक बिंब-रहित पैराग्राफ दें और कहें: "इसमें दो बिंब डालकर **मनोदशा** बदलो।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने.',
          hint: 'यदि अटके तो **c11_hin_al_cbse_02_004 (पात्र-चित्रण: नायक)** और **c11_hin_al_cbse_02_006.',
          misconception: '**विशिष्ट भ्रांति:** छात्र विरोधाभास को **\'विरोधी बातों का मेल\'** मात्र मान लेते हैं और प्रतीक को **\'किसी चीज़ का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले कथन या',
                  options: ['**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले कथन या', '"आवारा मसीहा" की पृष्ठभूमि और रचनाकार परिचय में कहानी के लेखक, उनके जीवन के तथ्य, कहानी', '**कथानक (Plot)** किसी रचना में घटित घटनाओं का कालानुक्रमिक (Chronological) क्रम है, जबकि', '\'पाठ्य-परिवेश और वातावरण\' किसी रचना में **काल, स्थान, सामाजिक-राजनीतिक परिस्थितियों,'],
                  hint: 'यदि अटके तो **c11_hin_al_cbse_02_004 (पात्र-चित्रण: नायक)** और **c11_hin_al_cbse_02_006 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र विरोधाभास को **\'विरोधी बातों का मेल\'** मात्र मान लेते हैं और प्रतीक को **\'किसी चीज़ का चिह्न\'**। वे यह नहीं समझ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः अवलोकन:** छात्र से कहें — "उपन्यास के पृष्ठ ४५-५० (या संबंधित अंश) पढ़ें और तीन ऐसी पंक्तियाँ चिह्नित करें जहाँ.', '**वर्गीकरण:** उन पंक्तियों को दो श्रेणियों में बाँटें — (क) जहाँ विरोधी बातें **गहरा सत्य खोलती हैं** (विरोधाभास), (ख).', '**मॉडल विश्लेषण:** शिक्षक एक प्रसंग (जैसे: शरत्चंद्र का अपनी माँ को पत्र लिखना पर न भेजना) का **संपूर्ण विश्लेषण**.', '**अभ्यास:** छात्र से ऐसा ही एक प्रसंग स्वतंत्र रूप से विश्लेषित करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द का अर्थ है — पाठ में प्रयुक्त वे **महत्वपूर्ण सांस्कृतिक.',
          hint: 'यदि अटके तो **c11_hin_al_cbse_02_003 (पाठ-परिवेश)** और **c11_hin_al_cbse_02_004.',
          misconception: 'छात्र **\'आवारा\' को केवल नकारात्मक अर्थ (बदचलन, आवारागर्द) में लेते हैं** और **\'मसीहा\' को केवल धार्मिक अर्थ (ईसा मसीह).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द का अर्थ है',
                  options: ['पदावली: मुख्य शब्द का अर्थ है', '"आवारा मसीहा" की पृष्ठभूमि और रचनाकार परिचय में कहानी के लेखक, उनके जीवन के तथ्य, कहानी', '**कथानक (Plot)** किसी रचना में घटित घटनाओं का कालानुक्रमिक (Chronological) क्रम है, जबकि', '\'पाठ्य-परिवेश और वातावरण\' किसी रचना में **काल, स्थान, सामाजिक-राजनीतिक परिस्थितियों,'],
                  hint: 'यदि अटके तो **c11_hin_al_cbse_02_003 (पाठ-परिवेश)** और **c11_hin_al_cbse_02_004 (नायक-चित्रण)**.',
                  misconception: 'छात्र **\'आवारा\' को केवल नकारात्मक अर्थ (बदचलन, आवारागर्द) में लेते हैं** और **\'मसीहा\' को केवल धार्मिक अर्थ (ईसा मसीह) में** — जबकि लेखक ने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**शब्द-चयन अभ्यास:** पाठ से 5 मुख्य शब्द चुनें (ब्रह्मसमाज, यती, साधु, गृहस्थ, आवारा, मसीहा)। प्रत्येक के लिए **तीन.', '**तुलना अभ्यास:** प्रत्येक शब्द के लिए **2-3 समानार्थी शब्द** लिखें और बताएँ कि **लेखक ने उनमें से इसी शब्द को क्यों.', '**लघु-लेखन:** किसी एक शब्द पर 50 शब्दों में लिखें: *"इस शब्द के बिना पाठ का अर्थ कैसे अधूरा रह जाता?"* — इससे **शब्द की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" का अर्थ है किसी साहित्यिक पाठ में शब्दों, वाक्य संरचना.',
          hint: 'यदि छात्र भाषा-प्रूपयोग के विश्लेषण में फंसे हुए हैं, तो उन्हें शब्दावली.',
          misconception: 'छात्र अक्सर मानते हैं कि "भाषा-प्रयोग" का अर्थ केवल कठिन शब्दों का उपयोग या अलंकार (जैसे रूपक, उत्प्रेरण) की पहचान करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" का अर्थ है किसी साहित्यिक पाठ में शब्दों, वाक्य संरचना, विराम',
                  options: ['"पाठ में भाषा-प्रयोग" का अर्थ है किसी साहित्यिक पाठ में शब्दों, वाक्य संरचना, विराम', '"आवारा मसीहा" की पृष्ठभूमि और रचनाकार परिचय में कहानी के लेखक, उनके जीवन के तथ्य, कहानी', '**कथानक (Plot)** किसी रचना में घटित घटनाओं का कालानुक्रमिक (Chronological) क्रम है, जबकि', '\'पाठ्य-परिवेश और वातावरण\' किसी रचना में **काल, स्थान, सामाजिक-राजनीतिक परिस्थितियों,'],
                  hint: 'यदि छात्र भाषा-प्रूपयोग के विश्लेषण में फंसे हुए हैं, तो उन्हें शब्दावली (c11_hin_al_cbse_02_010).',
                  misconception: 'छात्र अक्सर मानते हैं कि "भाषा-प्रयोग" का अर्थ केवल कठिन शब्दों का उपयोग या अलंकार (जैसे रूपक, उत्प्रेरण) की पहचान करना है, जबकि वे वाक्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान पैराग्राफ दें—एक में सामान्य वाक्य संरचना (सादाsubject-verb-object), दूसरे में वही भाव लाने के लिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_012', difficulty: 'standard',
          question: 'आशय-सूचक बोध वह कौशल है जिसमें पाठ में दिए गए स्पष्ट शब्दों के बजाय पात्रों के.',
          hint: 'यदि फंसे महसूस हो तो पात्र-चित्रण (नायक/प्रमुख पात्र) और पात्र-चित्रण: सहायक पात्र नोड्स.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि पात्र स्पष्ट रूप से कोई भावना व्यक्त नहीं कर रहा है (जैसे "मैं उदास नहीं हूँ" कह रहा है).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-सूचक बोध वह कौशल है जिसमें पाठ में दिए गए स्पष्ट शब्दों के बजाय पात्रों के व्यवहार,',
                  options: ['आशय-सूचक बोध वह कौशल है जिसमें पाठ में दिए गए स्पष्ट शब्दों के बजाय पात्रों के व्यवहार,', '"आवारा मसीहा" की पृष्ठभूमि और रचनाकार परिचय में कहानी के लेखक, उनके जीवन के तथ्य, कहानी', '**कथानक (Plot)** किसी रचना में घटित घटनाओं का कालानुक्रमिक (Chronological) क्रम है, जबकि', '\'पाठ्य-परिवेश और वातावरण\' किसी रचना में **काल, स्थान, सामाजिक-राजनीतिक परिस्थितियों,'],
                  hint: 'यदि फंसे महसूस हो तो पात्र-चित्रण (नायक/प्रमुख पात्र) और पात्र-चित्रण: सहायक पात्र नोड्स की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि पात्र स्पष्ट रूप से कोई भावना व्यक्त नहीं कर रहा है (जैसे "मैं उदास नहीं हूँ" कह रहा है), तो उसके पास कोई.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पहले छात्र से पूछिए कि क्या उन्होंने कभी ऐसा महसूस किया है जब उन्होंने कहा "मैं ठीक हूँ" लेकिन अंदर से टूटे हुए महसूस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
