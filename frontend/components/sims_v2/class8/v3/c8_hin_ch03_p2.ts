import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch03_p2: SimDef = {
    id: 'v3_c8_hin_ch03_p2',
    title: 'पाठ 3 · Part 2/3',
    subtitle: 'यह नोड कक्षा 8 के पाठ 3 में गौण विषयों की पहचान, विश्लेषण और मुख्य विषय से उनके संबंध पर.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 3 · Part 2/3',
    chapters: ['c8_hin_ch03'],
    nodeIds: ['c8_hin_cbse_03_007', 'c8_hin_cbse_03_008', 'c8_hin_cbse_03_009', 'c8_hin_cbse_03_010', 'c8_hin_cbse_03_011', 'c8_hin_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'क्या आपने कभी ध्यान दिया है कि जब आप अपने स्कूल के वार्षिक उत्सव की तैयारी करते हैं, तो मुख्य नाटक के साथ-साथ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — गौण विषय', text: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें किसी रचना में मुख्य विषय के समानांतर चलने वाले एक या अधिक सहायक विषय होते हैं, जो मुख्य विषय को गहराई, विस्तार और यथार्थवाद प्रदान करते हुए कथानक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — गौण', 'पाठ 3 — साहित्यिक', 'पाठ 3 — पदावली', 'पाठ 3 — व्याकरण', 'पाठ 3 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 2/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्द-चयन (पदावली), वाक्य-संरचना.', answer: '3 -', options: ['3 -', '3 - -'] },
            { id: 's2', label: '3 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में **स्पष्ट रूप से लिखा**.', answer: '3 - -', options: ['3 - -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें किसी रचना में मुख्य विषय के.',
          hint: 'यदि अटके तो c8_hin_cbse_03_006 (मुख्य विषय और संदेश) दोहराएँ — विशेष रूप से \'मुख्य विषय.',
          misconception: 'छात्र अक्सर मानते हैं कि **\'गौण विषय = मुख्य विषय का विस्तार/विवरण\'**। उदाहरण: यदि मुख्य विषय \'गरीबी\' है, तो वे \'भूख\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें किसी रचना में मुख्य विषय के समानांतर',
                  options: ['गौण विषय (Sub-theme) वह साहित्यिक अवधारणा है जिसमें किसी रचना में मुख्य विषय के समानांतर', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटके तो c8_hin_cbse_03_006 (मुख्य विषय और संदेश) दोहराएँ — विशेष रूप से \'मुख्य विषय की पहचान के.',
                  misconception: 'छात्र अक्सर मानते हैं कि **\'गौण विषय = मुख्य विषय का विस्तार/विवरण\'**। उदाहरण: यदि मुख्य विषय \'गरीबी\' है, तो वे \'भूख\', \'बेरोजगारी\', \'झुग्गी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 3 के **मुख्य विषय** को एक वाक्य में लिखने को कहें (पिछले नोड c8_hin_cbse_03_006 से)। 2.', 'फिर पाठ के **10 प्रमुख प्रसंगों** की सूची बनाने को कहें। 3.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "क्या यह प्रसंग मुख्य विषय को **सीधे** आगे बढ़ाता है?', 'जिन प्रसंगों के आगे \'नहीं\' आए, उन्हें समूहबद्ध करें — प्रत्येक समूह एक संभावित गौण विषय है। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक के मन में संवेदनात्मक अनुभूति.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 7 पाठ 3 (c7_hin_cbse_03_008)** के \'बिंब और रूपक\' खंड को.',
          misconception: 'छात्र अक्सर **उपमा (Simile) और रूपक (Metaphor)** को केवल \'तुलना\' मानकर दोनों को एक जैसा समझ लेते हैं — "दोनों में तुलना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक के मन में संवेदनात्मक अनुभूति (दृश्य, श्रव्य,',
                  options: ['**बिंब (Imagery)** शब्दों के माध्यम से पाठक के मन में संवेदनात्मक अनुभूति (दृश्य, श्रव्य,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 7 पाठ 3 (c7_hin_cbse_03_008)** के \'बिंब और रूपक\' खंड को दोबारा.',
                  misconception: 'छात्र अक्सर **उपमा (Simile) और रूपक (Metaphor)** को केवल \'तुलना\' मानकर दोनों को एक जैसा समझ लेते हैं — "दोनों में तुलना है ना, फिर अंतर.' }
          ],
            remediations: { 'simile-metaphor': { steps: ['**इंद्रिय-छँटाई अभ्यास:** छात्र को 10 वाक्य दें (मिश्रित: केवल कथन + बिंब)। उससे कहें: "हर वाक्य में बताओ — कौन-सी.', 'आँख, कान, नाक, त्वचा, जिह्वा — या कोई नहीं?" इससे बिंब = इंद्रिय-अनुभूति स्पष्ट होगा। 2.', '**रूपक-शल्यक्रिया:** एक रूपक दें (जैसे: "क्रोध ज्वालामुखी है")। पूछें: "यहाँ \'जैसे\' क्यों नहीं है?', 'यदि \'जैसे\' डाल दें तो अर्थ कैसे बदलेगा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में विरोधी या असंभव लगता है.',
          hint: 'यदि अटके: **कक्षा 7 के पाठ 3 (c7_hin_cbse_03_009)** के विरोधाभास-प्रतीक उदाहरण दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति (situational irony)** या साधारण **विरोध.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में विरोधी या असंभव लगता है, लेकिन',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में विरोधी या असंभव लगता है, लेकिन', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटके: **कक्षा 7 के पाठ 3 (c7_hin_cbse_03_009)** के विरोधाभास-प्रतीक उदाहरण दोहराएँ, फिर **कक्षा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति (situational irony)** या साधारण **विरोध (contradiction)** समझ लेते हैं।.' }
          ],
            remediations: { 'situational-irony-contradiction': { steps: ['**विरोधाभास के लिए:** छात्र को 3 वाक्य दें — एक साधारण विरोध, एक विरोधाभास, एक विडंबना। उसे "पहले सतही अर्थ लिखो, फिर.', '**प्रतीक के लिए:** पाठ से 3 वस्तुएँ चुनें (एक प्रतीक, दो सामान्य)। छात्र से पूछें: "कौन-सी वस्तु बार-बार आई?', 'किसके साथ भावुक प्रसंग जुड़े?', 'अगर वह वस्तु हटा दें तो क्या अर्थ घटेगा?" — केवल प्रतीक तीनों टेस्ट पास करेगा। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated list of significant.',
          hint: 'यदि अटका हुआ महसूस हो तो **c7_hin_cbse_03_010 (Class 7 पदावली)** के \'शब्द-अर्थ मिलान\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है **\'कठिन शब्दों की सूची जिसे रटकर अर्थ लिख देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated list of significant words in a',
                  options: ['पदावली: मुख्य शब्द (Key Vocabulary) refers to the curated list of significant words in a', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c7_hin_cbse_03_010 (Class 7 पदावली)** के \'शब्द-अर्थ मिलान\' और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है **\'कठिन शब्दों की सूची जिसे रटकर अर्थ लिख देना है\'।** वे शब्द को.' }
          ],
            remediations: { 'isolated-unit': { steps: ['**पाठ का एक पैराग्राफ चुनें** जिसमें 2-3 मुख्य शब्द हों। छात्र से कहें: "इन शब्दों को **लाल पेंसिल से घेरो**। अब.', '**शब्द-परिवार (word family) बनवाएँ:** मुख्य शब्द को केंद्र में रखकर उसके पर्याय, विलोम, उपमान, और उससे बने वाक्य.', '**\'शब्द-डायरी\' (Word Journal) शुरू करवाएँ:** हर मुख्य शब्द के लिए 3 कॉलम — (क) प्रसंगानुकूल अर्थ, (ख) पद-परिचय, (ग).', '**मौखिक अभ्यास:** कक्षा में "शब्द-चर्चा" — एक शब्द बोलें, छात्र 30 सेकंड में बताए: अर्थ, प्रसंग, प्रभाव।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्द-चयन (पदावली).',
          hint: 'अगर अटका हो तो कक्षा 7 का \'पाठ में भाषा-प्रयोग\' (c7_hin_cbse_03_011) दोहराएँ — विशेषकर.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल शुद्ध वर्तनी, सही कारक चिह्न या संधि-विच्छेद जानना है। वास्तव में परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्द-चयन (पदावली), वाक्य-संरचना',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा किसी रचना में शब्द-चयन (पदावली), वाक्य-संरचना', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'अगर अटका हो तो कक्षा 7 का \'पाठ में भाषा-प्रयोग\' (c7_hin_cbse_03_011) दोहराएँ — विशेषकर.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल शुद्ध वर्तनी, सही कारक चिह्न या संधि-विच्छेद जानना है। वास्तव में परीक्षा में पूछा जाता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 3 का कोई एक पैराग्राफ दें और कहें: "हर वाक्य को घेरे में लें और पूछें — लेखक ने *यह* शब्द क्यों चुना?', '*यह* वाक्य-रचना क्यों?" 2.', 'दो विकल्प दें: मूल वाक्य और उसका समानार्थी सरल रूप; छात्र से कहें: "दोनों पढ़ें, बताएँ कौन सा अधिक.', 'एक मुहावरा दें; छात्र से कहें: "इसे बिना मुहावरे के कहो; फिर दोनों वाक्य किसी तीसरे को पढ़वाओ और पूछो — कौन सा अधिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_03_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में **स्पष्ट रूप.',
          hint: 'यदि अटके तो **\'कथानक और आख्यान-संरचना\' (c8_hin_cbse_03_002)** और **\'पात्र-चित्रण: नायक\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का कोई एक सही उत्तर नहीं होता, जो मन में आए लिख दो।\'** वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में **स्पष्ट रूप से लिखा**',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर पाठ में **स्पष्ट रूप से लिखा**', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा,', 'कथानक (Plot) कहानी की घटनाओं का कारण-परिणाम (cause-effect) से बंधा हुआ सार्थक क्रम है,', 'पाठ्य-परिवेश (textual setting) refers to the time period, geographical location, physical'],
                  hint: 'यदि अटके तो **\'कथानक और आख्यान-संरचना\' (c8_hin_cbse_03_002)** और **\'पात्र-चित्रण: नायक\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का कोई एक सही उत्तर नहीं होता, जो मन में आए लिख दो।\'** वे इसे \'राय देना\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान कराओ:** छात्र को 5 वाक्य दें — 3 तथ्य (Fact), 2 निष्कर्ष (Inference)। उसे लेबल करने को कहें। गलती होने पर.', '**साक्ष्य ढूंढना सिखाओ:** एक आशय-सूचक प्रश्न दें (जैसे: "पात्र क्रोधित था?")। छात्र से कहें: "पाठ से **दो वाक्य/शब्द**.', '**\'मेरे ख्याल से\' प्रतिबंधित करो:** अभ्यास में नियम बनाएं — उत्तर में "मुझे लगता है", "मेरे अनुसार", "शायद" लिखने पर.', 'इसलिए..." संरचना स्वीकार होगी। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
