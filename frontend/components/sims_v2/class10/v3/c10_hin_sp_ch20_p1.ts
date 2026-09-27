import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch20_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch20_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch20_p1',
    title: 'तोप · Part 1/3',
    subtitle: '**इस नोड में शामिल:** कवि वीरेन डंगवाल का संक्षिप्त जीवन परिचय, प्रमुख रचनाएँ, साहित्यिक.',
    classLevel: 10, subject: 'hin_sp', topic: 'तोप · Part 1/3',
    chapters: ['c10_hin_sp_ch20'],
    nodeIds: ['c10_hin_sp_cbse_20_001', 'c10_hin_sp_cbse_20_002', 'c10_hin_sp_cbse_20_003', 'c10_hin_sp_cbse_20_004', 'c10_hin_sp_cbse_20_005', 'c10_hin_sp_cbse_20_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करो आप एक पुराने किले के सामने खड़े हो जहाँ एक जंग लगी तोप रखी है — गाइड बताता है "यह 1857 की क्रांति.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पद 4 की अंतिम दो पंक्तियाँ देखें: "स्वतंत्रता का गला घोंट देती है / तोप की गूँज।" यहाँ पंक्ति-भंग (enjambment) का क्या प्रभाव है? लिखित रूप में विश्लेषण करें।',
        options: ['Correct: "स्वतंत्रता का गला घोंट देती है" पंक्ति अधूरी छूटती है', 'स्वतंत्रता का गला घोंट देती है', 'तोप की गूँज'],
        answer: 'Correct: "स्वतंत्रता का गला घोंट देती है" पंक्ति अधूरी छूटती है',
        hook: 'Students believe "काव्य-संरचना" means only **counting stanzas/lines** or **naming the chhand** (meter).',
    },
    teaching: [
        { title: 'तोप — कवि परिचय और पृष्ठभूमि', text: '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और रचनात्मक सरोकारों का संक्षिप्त विवरण; **पृष्ठभूमि** का अर्थ है कविता "तोप" लिखे जाने का ऐतिहासिक-सांस्कृतिक संदर्भ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_20_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तोप — कवि परिचय', 'तोप — पद्यांश-वार भावार्थ', 'तोप — काव्य-संरचना और', 'तोप — केंद्रीय भाव', 'तोप — छंद और', 'तोप — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_20_003', title: 'तोप — काव्य-संरचना और पद्य-विन्यास',
          caseStudy: { intro: 'Have you ever noticed how a good speaker pauses before a big revelation?',
            decisions: [{ prompt: '"तोप" कविता में कुल कितने पद (stanzas) हैं और प्रत्येक पद में औसतन कितनी पंक्तियाँ हैं? केवल संख्या बताएँ।', options: [
                { text: 'Correct: 5 पद, प्रत्येक में 4 पंक्तियाँ (कुल 20 पंक्तियाँ)', outcome: 'Correct: 5 पद, प्रत्येक में 4 पंक्तियाँ (कुल 20 पंक्तियाँ). Wrong answer reveals: Student has not.' },
                { text: 'or haven\'t physically counted', outcome: 'Not quite — Students believe "काव्य-संरचना" means only **counting stanzas/lines** or **naming the chhand**.', reveals: 'means-only-counting-stanzas-lines' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_20_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तोप like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तोप · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तोप · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_001', difficulty: 'standard',
          question: '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा.',
          hint: 'यदि अटके तो **कक्षा 9 की कविता विश्लेषण नोटबुक** देखें — विशेषतः "कवि परिचय कैसे लिखें".',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "कवि परिचय" = **जीवनी तथ्य रटना** (जन्म-मृत्यु, रचनाओं की सूची) और "पृष्ठभूमि".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और',
                  options: ['**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और', 'पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process of interpreting each', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s', 'केंद्रीय भाव कविता का वह **मूल सार/संदेश** है जिसे कवि संपूर्ण रचना के माध्यम से व्यक्त'],
                  hint: 'यदि अटके तो **कक्षा 9 की कविता विश्लेषण नोटबुक** देखें — विशेषतः "कवि परिचय कैसे लिखें" और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "कवि परिचय" = **जीवनी तथ्य रटना** (जन्म-मृत्यु, रचनाओं की सूची) और "पृष्ठभूमि" = **इतिहास की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — "कवि वीरेन डंगवाल का एक वाक्य में परिचय दो: **\'पहाड़ का जनवादी कवि जिसने आम आदमी के संघर्ष.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process.',
          hint: 'अगर फँसें तो **c10_hin_sp_cbse_20_001 (कवि परिचय और पृष्ठभूमि)** दोबारा पढ़ें — विशेष रूप.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पद्यांश-वार भावार्थ" का अर्थ है **प्रत्येक पंक्ति का शाब्दिक हिंदी अनुवाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process of interpreting each',
                  options: ['पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process of interpreting each', '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s', 'केंद्रीय भाव कविता का वह **मूल सार/संदेश** है जिसे कवि संपूर्ण रचना के माध्यम से व्यक्त'],
                  hint: 'अगर फँसें तो **c10_hin_sp_cbse_20_001 (कवि परिचय और पृष्ठभूमि)** दोबारा पढ़ें — विशेष रूप से.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पद्यांश-वार भावार्थ" का अर्थ है **प्रत्येक पंक्ति का शाब्दिक हिंदी अनुवाद (Literal Translation).' }
          ],
            remediations: { 'literal-translation': { steps: ['**चरणबद्ध उपचार (Targeted Remediation):** 1.', '**पहला कदम:** छात्र से कहें — "पहला पद्यांश पढ़ो और बताओ: **कवि क्या देख रहा है?** (तोप पड़ी है)। **क्या महसूस कर रहा.', '**दूसरा कदम:** द्वितीय पद्यांश पर पूछें — "**बोल कौन रहा है?** (इतिहास)। **किससे?** (तोप से)। **क्यों?** (क्योंकि तोप.', '**तीसरा कदम:** तृतीय पद्यांश में \'नींद\' शब्द पर रुकें — "क्या यह रात की नींद है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_003', difficulty: 'standard',
          question: 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of.',
          hint: 'अगर अटके: c10_hin_sp_cbse_20_002 के \'कठिन शब्द-कोश\' और \'पद-वार अन्वय\' दोहराएँ — विशेषकर.',
          misconception: 'Students believe "काव्य-संरचना" means only **counting stanzas/lines** or **naming the chhand** (meter).',
          parts: [
                { id: 'a', prompt: '"तोप" कविता में कुल कितने पद (stanzas) हैं और प्रत्येक पद में औसतन कितनी पंक्तियाँ हैं? केवल संख्या बताएँ।', answer: 'Correct: 5 पद, प्रत्येक में 4 पंक्तियाँ (कुल 20 पंक्तियाँ)',
                  options: ['Correct: 5 पद, प्रत्येक में 4 पंक्तियाँ (कुल 20 पंक्तियाँ)', 'or haven\'t physically counted'],
                  hint: 'अगर अटके: c10_hin_sp_cbse_20_002 के \'कठिन शब्द-कोश\' और \'पद-वार अन्वय\' दोहराएँ — विशेषकर \'निर्बंध\'.',
                  misconception: 'Students believe "काव्य-संरचना" means only **counting stanzas/lines** or **naming the chhand** (meter).' },
                { id: 'b', prompt: 'कवि ने पहले दो पदों में तोप का वर्णन किया है, लेकिन तीसरे पद में अचानक "नगर", "ग्राम", "वन" आ जाते हैं। इस संक्रमण (transition) का संरचनात्मक उद्देश्य क्या है?', answer: 'Correct: यह \'ज़ूम-आउट\' संरचना है',
                  options: ['Correct: यह \'ज़ूम-आउट\' संरचना है', 'काव्य-संरचना'],
                  hint: 'अगर अटके: c10_hin_sp_cbse_20_002 के \'कठिन शब्द-कोश\' और \'पद-वार अन्वय\' दोहराएँ — विशेषकर \'निर्बंध\'.',
                  misconception: 'Students believe "काव्य-संरचना" means only **counting stanzas/lines** or **naming the chhand** (meter).' },
                { id: 'c', prompt: 'पद 4 की अंतिम दो पंक्तियाँ देखें: "स्वतंत्रता का गला घोंट देती है / तोप की गूँज।" यहाँ पंक्ति-भंग (enjambment) का क्या प्रभाव है? लिखित रूप में विश्लेषण करें।', answer: 'Correct: "स्वतंत्रता का गला घोंट देती है" पंक्ति अधूरी छूटती है',
                  options: ['Correct: "स्वतंत्रता का गला घोंट देती है" पंक्ति अधूरी छूटती है', 'स्वतंत्रता का गला घोंट देती है', 'तोप की गूँज', 'एनजैम्ब्मेंट यहाँ क्रिया की निरंतरता और पीड़ा की अवधि बढ़ाता है।'],
                  hint: 'अगर अटके: c10_hin_sp_cbse_20_002 के \'कठिन शब्द-कोश\' और \'पद-वार अन्वय\' दोहराएँ — विशेषकर \'निर्बंध\'.',
                  misconception: 'Students believe "काव्य-संरचना" means only **counting stanzas/lines** or **naming the chhand** (meter).' }
          ],
            remediations: { 'means-only-counting-stanzas-lines': { steps: ['**Physical mapping exercise**: Print the poem.', 'Draw boxes around each stanza.', 'Arrow-connect stanzas: "What shifts?" (Subject → Scope → Impact → Philosophy).', 'Say aloud: "Stanza 1 introduces the actor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_004', difficulty: 'standard',
          question: 'केंद्रीय भाव कविता का वह **मूल सार/संदेश** है जिसे कवि संपूर्ण रचना के माध्यम.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** के नोट्स.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'केंद्रीय भाव\' और \'प्रधान रस\' को एक ही मान लेते हैं** — जैसे उत्तर में लिखते हैं: "केंद्रीय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव कविता का वह **मूल सार/संदेश** है जिसे कवि संपूर्ण रचना के माध्यम से व्यक्त',
                  options: ['केंद्रीय भाव कविता का वह **मूल सार/संदेश** है जिसे कवि संपूर्ण रचना के माध्यम से व्यक्त', '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और', 'पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process of interpreting each', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** के नोट्स दोबारा पढ़ें और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'केंद्रीय भाव\' और \'प्रधान रस\' को एक ही मान लेते हैं** — जैसे उत्तर में लिखते हैं: "केंद्रीय भाव वीर रस है।" **यह.' }
          ],
            remediations: { '1': { steps: ['**स्पष्ट अंतर सिखाएँ:** बोर्ड पर लिखें — **केंद्रीय भाव = कवि का \'कथ्य\' (संदेश)** | **रस = पाठक की \'अनुभूति\' (स्वाद)**।.', '**अभ्यास कराएँ:** 3 कविताएँ (वीर, करुण, शांत रस वाली) दें — प्रत्येक के लिए **दो अलग कॉलम** भरवाएँ: (क) केंद्रीय भाव.', '**\'तोप\' पर लागू करें:** छात्र से पूछें — "कवि ने वीर रस *क्यों* चुना?', 'कौन-सा संदेश पहुँचाने के लिए?" — जब वह बोले "संदेश पहुँचाने के लिए", तो कहें — "वही संदेश **केंद्रीय भाव** है, वीर रस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_005', difficulty: 'standard',
          question: 'छंद कविता का वह विधान है जिसमें पंक्तियों के **मात्रा/गण, विराम (यति), और तुक.',
          hint: 'अगर अटके तो **कक्षा 9 की \'पद्य परिचय\' पुस्तिका के \'मात्रा-गण-छंद\' पृष्ठ** दोहराएँ.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि \'तोप\' **दोहा या चौपाई** (वार्णिक छंद) में है क्योंकि उसकी पंक्तियाँ छोटी और तुकांत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता का वह विधान है जिसमें पंक्तियों के **मात्रा/गण, विराम (यति), और तुक',
                  options: ['छंद कविता का वह विधान है जिसमें पंक्तियों के **मात्रा/गण, विराम (यति), और तुक', '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और', 'पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process of interpreting each', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'अगर अटके तो **कक्षा 9 की \'पद्य परिचय\' पुस्तिका के \'मात्रा-गण-छंद\' पृष्ठ** दोहराएँ — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि \'तोप\' **दोहा या चौपाई** (वार्णिक छंद) में है क्योंकि उसकी पंक्तियाँ छोटी और तुकांत लगती हैं।.' }
          ],
            remediations: { '11': { steps: ['**पहला कदम**: छात्र से कहो — "पंक्ति \'तोप तुम आगे बढ़ो\' को उँगली पर गिनो: तो(2)+प(1)=3, तुम(2)=2, आ(2)+गे(1)=3.', '**दूसरा कदम**: उसे **लघु (।) और गुरु (ऽ) चिह्न** लगाकर गण लिखने का अभ्यास कराओ — एक पंक्ति रोज, तीन दिन तक। 3.', '**तीसरा कदम**: उसे समझाओ — "छंद नाम (मालिनी/इंद्रवज्रा) याद रखने से ज्यादा जरूरी है **मात्रा-गण-यति पहचानना** — बोर्ड.', '**चौथा कदम**: पिछले नोड (c10_hin_sp_cbse_20_003 काव्य-संरचना) से **पद्य-विन्यास** दोहराओ — पंक्ति-भंगिमा और यति का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_20_006', difficulty: 'standard',
          question: 'अलंकार शब्द की शक्ति को बढ़ाने वाली वह काव्य युक्ति है जिसमें अर्थ के सौंदर्य.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** पर लौटें और **प्रत्येक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'उपमा\' और \'रूपक\' को केवल \'तुलना सूचक शब्दों (जैसे/सी) की उपस्थिति/अनुपस्थिति\' तक सीमित कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार शब्द की शक्ति को बढ़ाने वाली वह काव्य युक्ति है जिसमें अर्थ के सौंदर्य और प्रभाव',
                  options: ['अलंकार शब्द की शक्ति को बढ़ाने वाली वह काव्य युक्ति है जिसमें अर्थ के सौंदर्य और प्रभाव', '**कवि परिचय** का अर्थ है कवि वीरेन डंगवाल के जीवन, साहित्यिक योगदान, विचारधारा और', 'पद्यांश-वार भावार्थ (Stanza-wise Meaning) is the systematic process of interpreting each', 'काव्य-संरचना (Poetic Structure) refers to the deliberate organization of a poem\'s'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_20_002 (पद्यांश-वार भावार्थ)** पर लौटें और **प्रत्येक पंक्ति का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'उपमा\' और \'रूपक\' को केवल \'तुलना सूचक शब्दों (जैसे/सी) की उपस्थिति/अनुपस्थिति\' तक सीमित कर देते हैं** — वे यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृष्टांत-आधारित स्पष्टीकरण:** दो वाक्य लिखवाएं — (क) "वह सिंह **जैसा** वीर है" (उपमा) → पूछें: "यहाँ वीरता सिंह में.', 'क्या वह अब भी मनुष्य है?" → निष्कर्ष निकालें: **रूपक में व्यक्तित्व का रूपांतरण (Transformation) होता है**। 2.', '**\'तोप\' कविता पर लागू करें:** पंक्ति *"तोप खड़ी है भूखी शेरनी सी"* vs *"तोप मृत्यु का देवता है"* — छात्र से कहें.', '**अभ्यास:** कक्षा में 5 वाक्य दें जिनमें उपमा/रूपक मिश्रित हों; छात्र **भेद बताए + कारण लिखे (आरोप/तुलना)**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
