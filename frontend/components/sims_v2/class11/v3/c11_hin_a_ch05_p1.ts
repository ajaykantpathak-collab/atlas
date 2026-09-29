import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch05_p1: SimDef = {
    id: 'v3_c11_hin_a_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 5 की ऐतिहासिक-सांस्कृतिक पृष्ठभूमि और संबंधित रचनाकार के जीवन-साहित्यिक.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c11_hin_a_ch05'],
    nodeIds: ['c11_hin_a_cbse_05_001', 'c11_hin_a_cbse_05_002', 'c11_hin_a_cbse_05_003', 'c11_hin_a_cbse_05_004', 'c11_hin_a_cbse_05_005', 'c11_hin_a_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'अंतरा भाग-1 खोलिए और पाठ 05 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 1/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का.', answer: '5 -', options: ['5 -', '5 -'] },
            { id: 's2', label: '5 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.', answer: '5 -', options: ['5 -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि अटके तो **\'हिंदी कहानी का विकास क्रम\' (विशेषकर आंचलिक कहानी की अवधारणा)** और **\'कोसी.',
          misconception: '**विशिष्ट भ्रांति**: "पृष्ठभूमि और रचनाकार परिचय केवल \'तथ्यों की सूची\' (नाम, जन्म, पुस्तकें, ऐतिहासिक घटनाएं) है जिसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो **\'हिंदी कहानी का विकास क्रम\' (विशेषकर आंचलिक कहानी की अवधारणा)** और **\'कोसी अंचल का.',
                  misconception: '**विशिष्ट भ्रांति**: "पृष्ठभूमि और रचनाकार परिचय केवल \'तथ्यों की सूची\' (नाम, जन्म, पुस्तकें, ऐतिहासिक घटनाएं) है जिसे परीक्षा में लिख देना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित सुधार (चरणबद्ध)**: 1.', '**पृथक्करण**: छात्र से कहें — "रचनाकार के जीवन की 3 घटनाएं लिखो जो सीधे पाठ 5 के कथानक/पात्र से जुड़ती हों (जैसे: बाढ़.', '**संयोजन**: फिर पूछें — "इन घटनाओं ने रेणु की *भाषा* (बोली), *दृष्टि* (सह-अस्तित्व), और *शिल्प* (लोकगीत अंतर्कथन) को.', '**लेखन अभ्यास**: एक 40-शब्दी उत्तर लिखवाएं: "रेणु का बाढ़-अनुभव पाठ 5 को \'रिपोर्ताज\' नहीं \'कलात्मक यथार्थ\' बनाता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_002', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ।.',
          hint: 'यदि फ्रेटैग पिरामिड अस्पष्ट है, तो **\'बड़े भाई साहब\' (प्रेमचंद)** को लेकर 15 मिनट में.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'कथानक में घटनाओं का क्रम\' को ही \'आख्यान-संरचना\' मान लेते हैं** और यह नहीं देखते कि लेखक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फ्रेटैग पिरामिड अस्पष्ट है, तो **\'बड़े भाई साहब\' (प्रेमचंद)** को लेकर 15 मिनट में पांचों चरण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'कथानक में घटनाओं का क्रम\' को ही \'आख्यान-संरचना\' मान लेते हैं** और यह नहीं देखते कि लेखक **जानबूझकर कालक्रम भंग.' }
          ],
            remediations: { 'temporal-distortion': { steps: ['**चरण 1 (दृश्यीकरण):** छात्र से कहें: "कहानी की 5 प्रमुख घटनाएं **कागज पर तीर (→) बनाकर कालक्रम में लिखो**। फिर **पाठ.', '**चरण 2 (नामकरण):** प्रत्येक विचलन के लिए सही शब्द दें: अतीत में जाना = **एनालेस्पिस (Analepsis)**, भविष्य संकेत.', '**चरण 3 (कार्य-निर्धारण):** पूछें: "यदि लेखक कालक्रम में लिखता तो क्या फर्क पड़ता?" — उत्तर में **तनाव, आश्चर्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_003', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पृष्ठभूमि और रचनाकार परिचय\' (node 001) के \'युगबोध\' खंड और.',
          misconception: 'छात्र प्रायः मान लेते हैं कि \'परिवेश\' (setting) केवल कहानी का \'बैकड्रॉप\' (पृष्ठभूमि) है — स्थिर, निष्क्रिय और कथानक से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पृष्ठभूमि और रचनाकार परिचय\' (node 001) के \'युगबोध\' खंड और \'कथानक और.',
                  misconception: 'छात्र प्रायः मान लेते हैं कि \'परिवेश\' (setting) केवल कहानी का \'बैकड्रॉप\' (पृष्ठभूमि) है — स्थिर, निष्क्रिय और कथानक से अलग। वे यह नहीं देख.' }
          ],
            remediations: { 'setting': { steps: ['छात्र को एक परिचित दृश्य (अपना कक्षा-कक्ष) दें और कहें: "इसे तीन वाक्यों में ऐसा लिखो कि पाठक को लगे — (क) यहाँ परीक्षा.', 'फिर पूछें: "कौन-से शब्दों ने वातावरण बदला?" — इससे \'भाषा-शैली → वातावरण\' का कारण-कार्य सम्बन्ध स्पष्ट होगा। 3.', 'अन्त में पाठ के किसी अंश पर लागू करवाएँ: "लेखक ने यहाँ कौन-से तीन संवेदी ब्यौरे (sensory details) चुने हैं और वे कौन-सा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_004', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके: **c11_hin_a_cbse_05_002 (कथानक और आख्यान-संरचना)** के \'संकट बिंदु\' (Crisis.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = **पात्र के गुणों की सूची (List of Traits)** बनाना — जैसे "नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: **c11_hin_a_cbse_05_002 (कथानक और आख्यान-संरचना)** के \'संकट बिंदु\' (Crisis Points) खंड को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि पात्र-चित्रण = **पात्र के गुणों की सूची (List of Traits)** बनाना — जैसे "नायक: ईमानदार, बहादुर.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**लक्षित सुधार (Targeted Remediation):** 1.', '**चरण 1 — \'विशेषण प्रतिबंध\' (Adjective Ban):** छात्र से कहें — "आज के अभ्यास में आप **कोई विशेषण (Adjective) प्रयोग.', '**चरण 2 — \'साक्ष्य→व्याख्या\' जोड़ी (Evidence→Inference Pairing):** प्रत्येक कथन के लिए दो वाक्य अनिवार्य: (क) पाठ में.', '(ख) इससे पात्र के बारे में क्या *निष्कर्ष* निकलता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_005', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके हों, तो **नायक के चरित्र-चित्रण नोड (c11_hin_a_cbse_05_004)** के \'चरित्र-विकास.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"सहायक पात्र = नायक का मित्र/सहयोगी" (friend/ally)**। **गलत तर्क**: वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके हों, तो **नायक के चरित्र-चित्रण नोड (c11_hin_a_cbse_05_004)** के \'चरित्र-विकास (character.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **"सहायक पात्र = नायक का मित्र/सहयोगी" (friend/ally)**। **गलत तर्क**: वे \'सहायक\' शब्द को दैनिक जीवन.' }
          ],
            remediations: { 'friend-ally': { steps: ['**चरण 1**: छात्र से पूछें — "क्या कहानी में कोई पात्र ऐसा है जो नायक से **नफरत** करता है या **विरोध** करता है?', 'क्या उसके बिना नायक का चरित्र पूरा समझ आएगा?" **चरण 2**: समझाएं: "साहित्य में \'सहायक\' का अर्थ **\'मददगार\' नहीं, \'कथात्मक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_05_006', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 5\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 5\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो **कथानक के मोड़ (c11_hin_a_cbse_05_002)** और **नायक के चरित्र-चित्रण.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **मुख्य विषय एक वाक्य में लिखी कोई \'नैतिक शिक्षा\' (Moral) होती है** — जैसे "सच.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 5\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 5\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-1 — पाठ 5\' का मुख्य विषय — \'अंतरा भाग-1 — पाठ 5\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 5\' का कथानक — \'अंतरा भाग-1 — पाठ 5\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **कथानक के मोड़ (c11_hin_a_cbse_05_002)** और **नायक के चरित्र-चित्रण.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **मुख्य विषय एक वाक्य में लिखी कोई \'नैतिक शिक्षा\' (Moral) होती है** — जैसे "सच बोलो", "बड़ों का आदर.' }
          ],
            remediations: { 'moral': { steps: ['**पहचान:** छात्र से कहें — "पाठ के तीन प्रसंग चुनो जहाँ नायक दुविधा में हो। प्रत्येक में लिखो: नायक ने क्या चुना?', 'क्यों?" — इससे **चयन (Choice)** सामने आता है, उपदेश नहीं। 2.', '**तुलना:** दो प्रसंगों की तुलना करवाएँ — "पहले प्रसंग में नायक X चुनता है, तीसरे में Y — क्या बदला?', 'विषय में क्या विकास हुआ?" — इससे विषय की **गतिशीलता** समझ आएगी। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
