import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch06_p1: SimDef = {
    id: 'v3_c8_hin_ch06_p1',
    title: 'एक टोकरी भर मट्टिी · Part 1/3',
    subtitle: 'यह नोड केवल मोहन राकेश का संक्षिप्त जीवन परिचय, उनकी प्रमुख रचनाएँ, नई कहानी आंदोलन में.',
    classLevel: 8, subject: 'hin', topic: 'एक टोकरी भर मट्टिी · Part 1/3',
    chapters: ['c8_hin_ch06'],
    nodeIds: ['c8_hin_cbse_06_001', 'c8_hin_cbse_06_002', 'c8_hin_cbse_06_003', 'c8_hin_cbse_06_004', 'c8_hin_cbse_06_005', 'c8_hin_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करें कि आप किसी अनजान शहर में नए घर में शिफ्ट हुए हैं — आप पहले आस-पड़ोस, बाजार, स्कूल का पता लगाते.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: '"एक टोकरी भर मिट्टी" के नायक का एक आंतरिक संघर्ष (internal conflict) बताएँ और पाठ से एक प्रमाण दें जो यह दर्शाता हो।',
        options: ['**Correct answer:** नायक का आंतरिक संघर्ष है', 'यही तो मेरी पहचान है', 'मालिक से झगड़ा'],
        answer: '**Correct answer:** नायक का आंतरिक संघर्ष है',
        hook: '**Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest, hardworking).** **Why.',
    },
    teaching: [
        { title: 'एक टोकरी भर मट्टिी — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के जीवन-परिचय, साहित्यिक योगदान एवं लेखन शैली का संक्षिप्त विवेचन है जो पाठ को गहराई से समझने का आधार प्रदान करता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['एक टोकरी भर मट्टिी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_004', title: 'एक टोकरी भर मट्टिी — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'Think about your best friend — if someone asked you to describe them so a stranger would *really* know them, you wouldn\'t just say "tall, wears glasses." You\'d.',
            decisions: [{ prompt: 'नायक (प्रमुख पात्र) की परिभाषा क्या है? केवल नाम न बताएँ — उनकी कहानी में भूमिका स्पष्ट करें।', options: [
                { text: '**Correct answer:** नायक वह पात्र है जिसके आंतरिक संघर्ष, निर्णय और परिवर्तन कथानक को आगे', outcome: '**Correct answer:** नायक वह पात्र है जिसके आंतरिक संघर्ष, निर्णय और परिवर्तन कथानक को आगे बढ़ाते.' },
                { text: 'नायक वह है जो सबसे ज्यादा आता है', outcome: 'Not quite — **Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest.', reveals: 'students-believe-listing-traits-like' },
                { text: 'अच्छा इंसान है', outcome: 'Not quite — **Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest.', reveals: 'students-believe-listing-traits-like' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through एक टोकरी भर मट्टिी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? एक टोकरी भर मट्टिी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — एक टोकरी भर मट्टिी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और.',
          hint: 'अगर अटक जाएँ तो कक्षा 7 के \'पृष्ठभूमि और रचनाकार परिचय\' (c7_hin_cbse_06_001) के नोट्स.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल तथ्यों (जन्मतिथि, रचनाओं की सूची) को रटने का काम है। वे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के',
                  options: ['पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान', 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र means systematically'],
                  hint: 'अगर अटक जाएँ तो कक्षा 7 के \'पृष्ठभूमि और रचनाकार परिचय\' (c7_hin_cbse_06_001) के नोट्स दोहराएँ और.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल तथ्यों (जन्मतिथि, रचनाओं की सूची) को रटने का काम है। वे नहीं देख पाते कि मोहन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पूछें — "अगर आप कल अपने घर से जबरन निकाल दिए जाएँ, तो आप क्या साथ ले जाएँगे?', 'वही \'मट्टिी\' है।" चरण 2: मोहन राकेश की जीवनी की टाइमलाइन बनवाएँ (जन्म → विभाजन → शिक्षा → नौकरियाँ → लेखन) और हर घटना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है.',
          hint: 'अगर अटके तो कक्षा 7 के \'कथानक और आख्यान-संरचना\' नोड (c7_hin_cbse_06_002) के \'कारण-कार्य.',
          misconception: 'छात्र **\'घटनाओं का कालानुक्रमिक क्रम\' (Chronological Order of Events)** को ही \'आख्यान-संरचना\' मान लेते हैं। वे समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान', 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र means systematically'],
                  hint: 'अगर अटके तो कक्षा 7 के \'कथानक और आख्यान-संरचना\' नोड (c7_hin_cbse_06_002) के \'कारण-कार्य श्रृंखला\'.',
                  misconception: 'छात्र **\'घटनाओं का कालानुक्रमिक क्रम\' (Chronological Order of Events)** को ही \'आख्यान-संरचना\' मान लेते हैं। वे समझते हैं: "कहानी में पहले.' }
          ],
            remediations: { 'chronological-order-of-events': { steps: ['छात्र के सामने एक **दो-स्तंभ तालिका** बनवाएँ: बाएँ स्तंभ में **\'कब हुआ\' (कालानुक्रम)**, दाएँ में **\'कब बताया गया\'.', 'कहानी पढ़ते हुए प्रत्येक घटना को दोनों स्तंभों में भरवाएँ — अंतर स्वयं दिखेगा। 3.', 'फिर पूछो: "लेखक ने दाएँ स्तंभ का क्रम क्यों चुना?', 'बाएँ से क्या लाभ खो जाता?" — इससे फ़्लैशबैक का प्रयोजन स्पष्ट होगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है.',
          hint: 'अगर कथानक अस्पष्ट है, तो c8_hin_cbse_06_002 के \'कथानक-चरण सारांश\' को दोबारा पढ़ें और.',
          misconception: 'छात्र अक्सर \'पाठ्य-परिवेश\' को केवल \'कहानी कहां घटती है\' (स्थान मात्र) समझ लेते हैं और समय (ऐतिहासिक काल/दिन का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र means systematically'],
                  hint: 'अगर कथानक अस्पष्ट है, तो c8_hin_cbse_06_002 के \'कथानक-चरण सारांश\' को दोबारा पढ़ें और घटनाओं का.',
                  misconception: 'छात्र अक्सर \'पाठ्य-परिवेश\' को केवल \'कहानी कहां घटती है\' (स्थान मात्र) समझ लेते हैं और समय (ऐतिहासिक काल/दिन का पहर/ऋतु), सामाजिक संरचना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन दृश्य चुनने को कहो: (क) ग्रीष्म में मिट्टी खोदना, (ख) वर्षा में चाक चलाना, (ग) आंवा पकना। 2.', 'प्रत्येक के लिए एक टेबल बनवाओ: स्तंभ 1 — परिवेश के 3 संवेदी विवरण; स्तंभ 2 — नायक की शारीरिक क्रिया; स्तंभ 3 — नायक की.', 'फिर पूछो: "अगर ग्रीष्म न होती, वर्षा न आती, आंवा न पकता — तो नायक के निर्णय कैसे बदलते?" 4.', 'अंत में समझाओ: परिवेश = केवल जगह नहीं, यह पात्र का \'बाहरी मन\' है जो उसके \'भीतर\' को चलाता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र means.',
          hint: 'If stuck, review "PEEL paragraph structure" (from writing skills nodes) and "internal.',
          misconception: '**Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest, hardworking).** **Why.',
          parts: [
                { id: 'a', prompt: '"एक टोकरी भर मिट्टी" के नायक का एक आंतरिक संघर्ष (internal conflict) बताएँ और पाठ से एक प्रमाण दें जो यह दर्शाता हो।', answer: '**Correct answer:** नायक का आंतरिक संघर्ष है',
                  options: ['**Correct answer:** नायक का आंतरिक संघर्ष है', 'यही तो मेरी पहचान है', 'मालिक से झगड़ा', 'पात्र-चित्रण'],
                  hint: 'If stuck, review "PEEL paragraph structure" (from writing skills nodes) and "internal vs external.',
                  misconception: '**Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest, hardworking).** **Why this error happens:**.' },
                { id: 'b', prompt: 'निम्नलिखित अंश में नायक की कौन-सी विशेषता प्रकट होती है? प्रमाण सहित समझाएँ: "उसने टोकरी नहीं रखी। कंधे झुके, पर रुका नहीं।"', answer: '**Correct answer:** विशेषता',
                  options: ['**Correct answer:** विशेषता', 'वह मेहनती है', 'कंधे झुके', 'रुका नहीं'],
                  hint: 'If stuck, review "PEEL paragraph structure" (from writing skills nodes) and "internal vs external.',
                  misconception: '**Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest, hardworking).** **Why this error happens:**.' }
          ],
            remediations: { 'students-believe-listing-traits-like': { steps: ['**Step-by-step remediation:** 1.', '**Confront the list:** Ask the student to pick *one* trait they listed (e.g., "hardworking") and find **three moments.', '**Introduce the "But" column:** Make a two-column table: "Trait" | "Complicating Moment" — e.g., "Hardworking" | "But.', '**Shift to PEEL:** Have them rewrite *one* trait as a PEEL paragraph: **Point** (He shows quiet resilience).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest, hardworking).** **Why.',
          parts: [
                { id: 'a', prompt: 'क्या नायक अंत में \'विजयी\' होता है? अपने उत्तर का औचित्य पाठ के विषय (theme) से जोड़कर दीजिए।', answer: '**Correct answer:** **नहीं, पारंपरिक अर्थ में विजयी नहीं**',
                  options: ['**Correct answer:** **नहीं, पारंपरिक अर्थ में विजयी नहीं**', 'श्रम की गरिमा और अस्मिता की रक्षा', 'हाँ, वह घर पहुँच गया', 'नहीं, वह गरीब ही रहा'],
                  hint: 'If stuck, review "PEEL paragraph structure" (from writing skills nodes) and "internal vs external.',
                  misconception: '**Students believe "पात्र-चित्रण" = "गुणों की सूची बनाना" (listing traits like brave, honest, hardworking).** **Why this error happens:**.' }
          ],
            remediations: { 'students-believe-listing-traits-like': { steps: ['**Step-by-step remediation:** 1.', '**Confront the list:** Ask the student to pick *one* trait they listed (e.g., "hardworking") and find **three moments.', '**Introduce the "But" column:** Make a two-column table: "Trait" | "Complicating Moment" — e.g., "Hardworking" | "But.', '**Shift to PEEL:** Have them rewrite *one* trait as a PEEL paragraph: **Point** (He shows quiet resilience).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो कथा में नायक के साथ रहकर कथानक को आगे बढ़ाते.',
          hint: 'यदि फँस जाएँ तो नोड 004 (नायक चित्रण) के \'मास्टर जी के गुणों की सूची\' दोबारा पढ़ें और फिर.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र केवल \'कहानी भरने\' के लिए होते हैं और उनके संवाद/व्यवहार का कोई गहरा अर्थ नहीं होता।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो कथा में नायक के साथ रहकर कथानक को आगे बढ़ाते हैं, नायक',
                  options: ['सहायक पात्र वे पात्र होते हैं जो कथा में नायक के साथ रहकर कथानक को आगे बढ़ाते हैं, नायक', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि फँस जाएँ तो नोड 004 (नायक चित्रण) के \'मास्टर जी के गुणों की सूची\' दोबारा पढ़ें और फिर.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र केवल \'कहानी भरने\' के लिए होते हैं और उनके संवाद/व्यवहार का कोई गहरा अर्थ नहीं होता। उदाहरण: माधव का "मास्टर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पाठ से माधव के **तीन संवाद** निकालो और प्रत्येक के आगे लिखो: "इससे मास्टर जी का कौन-सा गुण दिखा?" 2.', 'ग्रामीणों के **दो प्रसंग** चिह्नित करो जहाँ वे बोलते/चुप रहते हैं — पूछो: "उनकी चुप्पी क्या कहती है?" 3.', 'एक टेबल बनाओ: पात्र | कार्य/संवाद | नायक पर प्रभाव | सामाजिक अर्थ। 4.', 'शिक्षक के साथ मिलकर एक \'कमजोर सहायक पात्र\' (जैसे माधव) को \'मजबूत\' बनाने पर चर्चा करो — कहानी कैसे बदलेगी?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_06_006', difficulty: 'standard',
          question: '**मुख्य विषय** वह केंद्रीय विचार या प्रसंग है जिसके इर्द-गिर्द पूरी कहानी घूमती.',
          hint: 'यदि अटके तो c8_hin_cbse_06_002 (कथानक) और c8_hin_cbse_06_004 (नायक चित्रण) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मान लेते हैं कि **\'विषय\' = \'कहानी का सारांश (summary)\'** और **\'संदेश\' = \'अंत में लिखी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय** वह केंद्रीय विचार या प्रसंग है जिसके इर्द-गिर्द पूरी कहानी घूमती है (जैसे',
                  options: ['**मुख्य विषय** वह केंद्रीय विचार या प्रसंग है जिसके इर्द-गिर्द पूरी कहानी घूमती है (जैसे', 'पृष्ठभूमि और रचनाकार परिचय किसी रचना के ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ और लेखक के', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) क्रम है, जबकि', 'पाठ्य-परिवेश (Setting) किसी रचना में घटनाओं के घटित होने का समग्र संदर्भ है जिसमें स्थान'],
                  hint: 'यदि अटके तो c8_hin_cbse_06_002 (कथानक) और c8_hin_cbse_06_004 (नायक चित्रण) दोबारा पढ़ें — विषय वहीं.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मान लेते हैं कि **\'विषय\' = \'कहानी का सारांश (summary)\'** और **\'संदेश\' = \'अंत में लिखी नैतिक शिक्षा (moral.' }
          ],
            remediations: { 'summary-moral-of-the-story': { steps: ['**पहला कदम:** छात्र से कहो — "कहानी की 3 मुख्य घटनाएँ लिखो।" फिर पूछो — "अब हर घटना के आगे लिखो: *इससे लेखक को क्या.', '**दूसरा कदम:** बोर्ड पर दो कॉलम बनाओ — **\'क्या हुआ\' (घटना)** और **\'क्या अर्थ निकला\' (भाव/विषय)**। छात्र से मिलान करवाओ।.', '**तीसरा कदम:** एक नया छोटा प्रसंग दो (जैसे DIAGNOSTIC_Q3 में दिया) और पूछो — "यहाँ विषय क्या है?', 'तुम्हें कैसे पता चला?" — इससे **अनुप्रयोग (apply)** का अभ्यास होगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
