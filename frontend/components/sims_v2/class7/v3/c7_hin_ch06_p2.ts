import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch06_p2: SimDef = {
    id: 'v3_c7_hin_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों की पहचान, उनका मुख्य विषय से संबंध, और उनके कार्य (पुष्टि.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c7_hin_ch06'],
    nodeIds: ['c7_hin_cbse_06_007', 'c7_hin_cbse_06_008', 'c7_hin_cbse_06_009', 'c7_hin_cbse_06_010', 'c7_hin_cbse_06_011', 'c7_hin_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'क्या तुमने कभी गौर किया कि तुम्हारी पसंदीदा कहानी में हीरो के लक्ष्य के अलावा भी कई छोटी-मोटी बातें चलती रहती.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 6 में से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न लिखिए। दोनों के उत्तर भी दीजिए।',
        options: ['वस्तुनिष्ठ प्रश्न: "पाठ 6 के नायक का नाम क्या है?"', 'पाठ में छिपा हुआ', 'ढूँढना'],
        answer: 'वस्तुनिष्ठ प्रश्न: "पाठ 6 के नायक का नाम क्या है?"',
        hook: 'Students believe that **आशय-सूचक प्रश्नों का उत्तर "पाठ में छिपा हुआ" होता है और बस उसे "ढूँढना" पड़ता है** — जैसे कोई.',
    },
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जहाँ पाठ में मुख्य विषय के समानांतर चलने वाले छोटे-छोटे विषय उभरते हैं, जो मुख्य विषय को पुष्ट करते हैं, उसका विस्तार करते हैं, या उसके विभिन्न पहलुओं को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_06_012', title: 'पाठ 6 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Think about the last time you read a WhatsApp message from a friend saying "Fine." — the *word* is objective (वस्तुनिष्ठ), but the *meaning* (आशय) could.',
            decisions: [{ prompt: 'पाठ 6 में से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न लिखिए। दोनों के उत्तर भी दीजिए।', options: [
                { text: 'वस्तुनिष्ठ प्रश्न: "पाठ 6 के नायक का नाम क्या है?"', outcome: 'वस्तुनिष्ठ प्रश्न: "पाठ 6 के नायक का नाम क्या है?" — उत्तर: [नायक का नाम, पाठ से सीधे लिया गया]।.' },
                { text: 'पाठ में छिपा हुआ', outcome: 'Not quite — Students believe that **आशय-सूचक प्रश्नों का उत्तर "पाठ में छिपा हुआ" होता है और बस उसे "ढूँढना".', reveals: 'constructed-clues' },
                { text: 'ढूँढना', outcome: 'Not quite — Students believe that **आशय-सूचक प्रश्नों का उत्तर "पाठ में छिपा हुआ" होता है और बस उसे "ढूँढना".', reveals: 'constructed-clues' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जहाँ पाठ में मुख्य विषय के.',
          hint: 'अगर अटके तो c7_hin_cbse_06_006 (मुख्य विषय और संदेश) को दोबारा पढ़ें और पाठ 6 के मुख्य.',
          misconception: 'छात्र अक्सर गौण विषय को \'पक्ष-कथा\' (subplot) या \'छोटी कहानी\' समझ लेते हैं — वे सोचते हैं कि कोई भी प्रसंग जो मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जहाँ पाठ में मुख्य विषय के समानांतर चलने',
                  options: ['गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जहाँ पाठ में मुख्य विषय के समानांतर चलने', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'अगर अटके तो c7_hin_cbse_06_006 (मुख्य विषय और संदेश) को दोबारा पढ़ें और पाठ 6 के मुख्य विषय को अपने.',
                  misconception: 'छात्र अक्सर गौण विषय को \'पक्ष-कथा\' (subplot) या \'छोटी कहानी\' समझ लेते हैं — वे सोचते हैं कि कोई भी प्रसंग जो मुख्य कहानी से थोड़ा अलग हो.' }
          ],
            remediations: { 'subplot': { steps: ['चरण 1: छात्र को पाठ 6 का कोई एक छोटा अंश (5-6 पंक्तियाँ) दो और पूछो: \'यहाँ क्या *हो* रहा है?\' (घटना) और \'यहाँ क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_008', difficulty: 'standard',
          question: 'बिंब (Imagery) लेखन की वह युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 6 के किसी भी पाठ (उदा. c6_hin_cbse_06_008) के \'बिंब-रूपक पहचान\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'रूपक\' और \'उपमा\' को केवल \'जैसे/सा\' की उपस्थिति/अनुपस्थिति तक सीमित कर देते हैं** और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) लेखन की वह युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों इंद्रियों',
                  options: ['बिंब (Imagery) लेखन की वह युक्ति है जिसमें शब्दों के माध्यम से पाठक की पाँचों इंद्रियों', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 6 के किसी भी पाठ (उदा. c6_hin_cbse_06_008) के \'बिंब-रूपक पहचान\' अभ्यास को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर **\'रूपक\' और \'उपमा\' को केवल \'जैसे/सा\' की उपस्थिति/अनुपस्थिति तक सीमित कर देते हैं** और यह नहीं समझते कि.' }
          ],
            remediations: { 'vehicle-tenor-transfer-of-identity': { steps: ['**चरण 1 — ठोस उदाहरण से शुरू करो:** छात्र को दो वाक्य दो: "वह फूल जैसा सुंदर है" और "वह फूल है"। पूछो: "दूसरे में क्या.', '**चरण 2 — क्रिया-पद (verb) परीक्षण कराओ:** रूपक वाले वाक्य से संज्ञा (फूल) के क्रियापद उठाओ — "खिलना", "मुरझाना".', '**चरण 3 — बिंब-प्रकार चार्ट बनवाओ:** एक टेबल दो जिसमें पाँच इंद्रियाँ हों; छात्र से किसी एक परिचित दृश्य (रसोई, बारिश.', '**चरण 4 — प्रतिदिन एक \'रूपक शिकार\':** अगले तीन दिन तक रोज़ अखबार, विज्ञापन, या बातचीत में एक रूपक ढूँढ़ कर लाने को कहो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जहाँ पहली नज़र में विरोधी लगने.',
          hint: 'यदि अटके तो कक्षा ६ पाठ १३ (c6_hin_cbse_13_009) के \'प्रतीक-रचना\' अभ्यास को दोहराएँ — वही.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **विरोधाभासी परिस्थिति (Paradoxical Situation)** या **विडंबना (Irony)** समझ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जहाँ पहली नज़र में विरोधी लगने वाले दो',
                  options: ['**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जहाँ पहली नज़र में विरोधी लगने वाले दो', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि अटके तो कक्षा ६ पाठ १३ (c6_hin_cbse_13_009) के \'प्रतीक-रचना\' अभ्यास को दोहराएँ — वही प्रतीक की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **विरोधाभासी परिस्थिति (Paradoxical Situation)** या **विडंबना (Irony)** समझ बैठते हैं। उदाहरण.' }
          ],
            remediations: { 'paradoxical-situation-irony-situational-irony': { steps: ['**चरण १:** छात्र को दो वाक्य देकर पूछो: "कौन-सा विरोधाभास है, कौन-सा विडंबना?" — (अ) "वह इतना दयालु था कि किसी की मदद न.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय भाव, विषय या.',
          hint: 'यदि छात्र अटका हो तो कक्षा 6 के पदावली नोड (c6_hin_cbse_01_010) की \'शब्द-अर्थ-प्रसंग\'.',
          misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' का अर्थ **शब्दकोश खोलकर पहला अर्थ लिख देना** है। वे यह नहीं देखते कि वही शब्द अलग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय भाव, विषय या पात्र की',
                  options: ['पदावली के मुख्य शब्द वे विशिष्ट शब्द होते हैं जो पाठ के केंद्रीय भाव, विषय या पात्र की', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि छात्र अटका हो तो कक्षा 6 के पदावली नोड (c6_hin_cbse_01_010) की \'शब्द-अर्थ-प्रसंग\' तालिका वाली.',
                  misconception: 'छात्र समझते हैं कि \'मुख्य शब्द\' का अर्थ **शब्दकोश खोलकर पहला अर्थ लिख देना** है। वे यह नहीं देखते कि वही शब्द अलग प्रसंग में अलग \'स्वाद\'.' }
          ],
            remediations: { '6': { steps: ['छात्र को पाठ 6 के किसी एक पैराग्राफ में से 5 शब्द छांटने को कहें जो \'महत्वपूर्ण\' लगते हों। 2.', 'प्रत्येक शब्द के लिए: (क) शब्दकोश अर्थ लिखें, (ख) उस प्रसंग को 1-2 पंक्तियों में अपने शब्दों में बताएं जहां वह आया है.', 'शिक्षक/अभिभावक साथ बैठकर छात्र के \'शब्दकोश अर्थ\' और \'प्रसंगानुकूल अर्थ\' की तुलना करें, अंतर दिखाएं। 4.', 'फिर छात्र से पूछें: \'अगर लेखक यहाँ इस शब्द की जगह उसका पर्यायवाची रख देता, तो क्या फर्क पड़ता?\' — इस प्रश्न का उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-संरचना, मुहावरों.',
          hint: 'अगर अटके तो कक्षा 6 का \'क्रिया और वाच्य\' (c6_hin_cbse_06_011 का व्याकरण भाग) दोहराएँ।',
          misconception: 'छात्र मानते हैं कि \'अच्छी भाषा\' = \'कठिन तत्सम शब्द + लंबे वाक्य + शुद्ध व्याकरण\'। इसलिए जब पाठ में कोई पात्र "का रे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-संरचना, मुहावरों, लोकोक्तियों,',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-संरचना, मुहावरों, लोकोक्तियों,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'अगर अटके तो कक्षा 6 का \'क्रिया और वाच्य\' (c6_hin_cbse_06_011 का व्याकरण भाग) दोहराएँ।',
                  misconception: 'छात्र मानते हैं कि \'अच्छी भाषा\' = \'कठिन तत्सम शब्द + लंबे वाक्य + शुद्ध व्याकरण\'। इसलिए जब पाठ में कोई पात्र "का रे, काहे रोवत हो?" बोलता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पाठ 6 से दो विपरीत अंश (एक वर्णन, एक संवाद) छाँटो। 2.', 'दोनों के वाक्य गिनो, औसत लंबाई निकालो। 3.', 'प्रत्येक में 5-5 शब्द छाँटो और बताओ: तत्सम/तद्भव/देशज/विदेशी?', 'पूछो: "अगर लेखक यहाँ इसके विपरीत शब्द डाल दे तो क्या बदलेगा?" 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) text में directly दी गई factual जानकारी.',
          hint: 'If stuck, review c7_hin_cbse_06_002 (plot structure) to re-sequence events, and.',
          misconception: 'Students believe that **आशय-सूचक प्रश्नों का उत्तर "पाठ में छिपा हुआ" होता है और बस उसे "ढूँढना" पड़ता है** — जैसे कोई.',
          parts: [
                { id: 'a', prompt: 'पाठ 6 में से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न लिखिए। दोनों के उत्तर भी दीजिए।', answer: 'वस्तुनिष्ठ प्रश्न: "पाठ 6 के नायक का नाम क्या है?"',
                  options: ['वस्तुनिष्ठ प्रश्न: "पाठ 6 के नायक का नाम क्या है?"', 'पाठ में छिपा हुआ', 'ढूँढना', 'बाहर बारिश हो रही थी, वह खिड़की पर खड़ा था।'],
                  hint: 'If stuck, review c7_hin_cbse_06_002 (plot structure) to re-sequence events, and c7_hin_cbse_06_010.',
                  misconception: 'Students believe that **आशय-सूचक प्रश्नों का उत्तर "पाठ में छिपा हुआ" होता है और बस उसे "ढूँढना" पड़ता है** — जैसे कोई खजाना ढूँढ रहे हों।.' },
                { id: 'b', prompt: 'पाठ 6 में एक ऐसा प्रसंग ढूँढिए जहाँ एक ही घटना के लिए वस्तुनिष्ठ और आशय-सूचक — दोनों प्रकार के प्रश्न पूछे जा सकते हैं। दोनों प्रश्न लिखिए और बताइए कि उनके.', answer: 'प्रसंग: [पाठ 6 की कोई घटना, जैसे',
                  options: ['प्रसंग: [पाठ 6 की कोई घटना, जैसे', 'पाठ में छिपा हुआ', 'ढूँढना', 'बाहर बारिश हो रही थी, वह खिड़की पर खड़ा था।'],
                  hint: 'If stuck, review c7_hin_cbse_06_002 (plot structure) to re-sequence events, and c7_hin_cbse_06_010.',
                  misconception: 'Students believe that **आशय-सूचक प्रश्नों का उत्तर "पाठ में छिपा हुआ" होता है और बस उसे "ढूँढना" पड़ता है** — जैसे कोई खजाना ढूँढ रहे हों।.' }
          ],
            remediations: { 'constructed-clues': { steps: ['**पहला चरण:** छात्र को एक छोटा अनुच्छेद (3-4 वाक्य) दें जिसमें केवल वस्तुनिष्ठ तथ्य हों। उससे 3 वस्तुनिष्ठ प्रश्न पूछें.', '**दूसरा चरण:** उसी अनुच्छेद में 1-2 शब्द बदलकर निहित अर्थ डालें (जैसे: "वह मुस्कुराया" → "वह जबरन मुस्कुराया")। अब.', '**तीसरा चरण:** साथ मिलकर पाठ के *पहले* और *बाद* के वाक्य देखें। पूछें: "कौन-से शब्द बताते हैं कि वह दुखी था?" — उन.', '**चौथा चरण:** समझाएँ: "आशय = पाठ के संकेत (clues) + तुम्हारा तर्क (reasoning)। संकेत पाठ में हैं, तर्क तुम्हें लगाना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
