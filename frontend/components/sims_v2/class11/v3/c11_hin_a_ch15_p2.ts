import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch15_p2: SimDef = {
    id: 'v3_c11_hin_a_ch15_p2',
    title: 'हस्तक्षेप · Part 2/3',
    subtitle: 'This node covers the identification, classification (types of imagery: visual, auditory.',
    classLevel: 11, subject: 'hin_a', topic: 'हस्तक्षेप · Part 2/3',
    chapters: ['c11_hin_a_ch15'],
    nodeIds: ['c11_hin_a_cbse_15_007', 'c11_hin_a_cbse_15_008', 'c11_hin_a_cbse_15_009', 'c11_hin_a_cbse_15_010', 'c11_hin_a_cbse_15_011', 'c11_hin_a_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'हस्तक्षेप\' में हस्तक्षेप जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'हस्तक्षेप — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'हस्तक्षेप\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['हस्तक्षेप — साहित्यिक युक्तियाँ', 'हस्तक्षेप — मुख्य भाव', 'हस्तक्षेप — गौण भाव', 'हस्तक्षेप — पदावली: कठिन', 'हस्तक्षेप — व्याकरण: पद्य', 'हस्तक्षेप — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c11_hin_a_cbse_15_007', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Analyze the second occurrence: "बंद रास्ता" — the path.', 'Classify the first occurrence: "टेढ़ा-मेढ़ा रास्ता" creates.', 'Analyze the third occurrence: "खुला रास्ता" — the barrier.', 'Synthesize: The semantic shift is **Physical path →.', 'Locate all three occurrences in the poem\'s stanza-wise.'], answer: 'Locate all three occurrences in the poem\'s stanza-wise. Classify the first occurrence: "टेढ़ा-मेढ़ा रास्ता" creates. Analyze the second occurrence: "बंद रास्ता" — the path. Analyze the third occurrence: "खुला रास्ता" — the barrier. Synthesize: The semantic shift is **Physical path →.' } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through हस्तक्षेप like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? हस्तक्षेप · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — हस्तक्षेप · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_007', difficulty: 'standard',
          question: '\'हस्तक्षेप\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review **c11_hin_a_cbse_15_006 (अलंकार)** to recall how रूपक (metaphor) works.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **"हर बिंब एक प्रतीक होता है"** या **"प्रतीक केवल कवि बनाता है, पाठक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' के गौण विषय',
                  options: ['\'हस्तक्षेप\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c11_hin_a_cbse_15_006 (अलंकार)** to recall how रूपक (metaphor) works — a symbol.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **"हर बिंब एक प्रतीक होता है"** या **"प्रतीक केवल कवि बनाता है, पाठक नहीं।"** **गलत तर्क का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**अंतर स्पष्ट करें (5 मिनट):** छात्र को दो कॉलम बनाने को कहें: **बिंब** (क्या दिखा/सुना/महसूस हुआ?', '— तात्कालिक, इंद्रियगत) बनाम **प्रतीक** (क्या अर्थ बार-बार जुड़ा?', '— अमूर्त, बौद्धिक, पुनरावृत्तिपरक)। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_008', difficulty: 'standard',
          question: '\'हस्तक्षेप\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_15_007 (प्रतीक और बिंब)** नोड पर लौटकर प्रत्येक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि कविता में \'हस्तक्षेप\' **केवल नकारात्मक अर्थ में** प्रयुक्त हुआ है और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' में बिंब (imagery)',
                  options: ['\'हस्तक्षेप\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_a_cbse_15_007 (प्रतीक और बिंब)** नोड पर लौटकर प्रत्येक प्रमुख.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि कविता में \'हस्तक्षेप\' **केवल नकारात्मक अर्थ में** प्रयुक्त हुआ है और कवि **सभी प्रकार के.' }
          ],
            remediations: { 'binary-thinking': { steps: ['**चरण 1:** छात्र से कहें: "कविता का पहला और अंतिम पद साथ-साथ पढ़ो। \'हस्तक्षेप\' शब्द दोनों में है — लेकिन **कर्ता.', 'अंत में कौन है?" **चरण 2:** बोर्ड पर लिखें: **हस्तक्षेप 1 (सत्ता) = बाह्य + बलपूर्वक + विनाशकारी** | **हस्तक्षेप 2 (जन).', 'या यह कि \'हस्तक्षेप का चरित्र बदलना चाहिए\'?" — इस प्रश्न से छात्र **संदेश की सूक्ष्मता** तक पहुंचेगा। **चरण 4:** अभ्यास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_009', difficulty: 'standard',
          question: '\'हस्तक्षेप\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो: नोड 008 (मुख्य भाव) और नोड 007 (प्रतीक-बिंब) दोबारा पढ़ें — विशेषकर \'प्रतीक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में मुख्य भाव से **हटकर आने वाला हर प्रसंग \'विषयांतर\' है**। वे \'गौण भाव\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' में विरोधाभास',
                  options: ['\'हस्तक्षेप\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो: नोड 008 (मुख्य भाव) और नोड 007 (प्रतीक-बिंब) दोबारा पढ़ें — विशेषकर \'प्रतीक की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में मुख्य भाव से **हटकर आने वाला हर प्रसंग \'विषयांतर\' है**। वे \'गौण भाव\' और \'विषयांतर\' को अलग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता के **तीन लगातार पद** पढ़वाइए और पूछिए: "इनमें कौन-सा शब्द/बिंब मुख्य भाव \'प्रतिरोध\' की ओर इशारा करता.', 'फिर उनसे कहिए: "मान लो यह प्रसंग हटा दिया जाए — क्या मुख्य भाव कमजोर पड़ेगा?" यदि **हाँ** → गौण भाव; यदि **नहीं** →.', 'मुक्तिबोध की एक छोटी कविता (जैसे \'अँधेरे में\' का अंश) देकर यही अभ्यास करवाइए — तुलनात्मक दृष्टि विकसित होगी। 4.', 'अंत में: छात्र स्वयं एक \'जानबूझकर लिखा विषयांतर\' और एक \'सचेत गौण भाव\' लिखे — रचनात्मक अनुप्रयोग से अवधारणा स्थिर होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_010', difficulty: 'standard',
          question: '\'हस्तक्षेप\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **c11_hin_a_cbse_15_004 (केंद्रीय भाव और रस)** और **c11_hin_a_cbse_15_002.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"कठिन शब्दों के अर्थ रटना" ही पदावली की तैयारी है**। वे "वितान" का अर्थ "आकाश".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' की पदावली',
                  options: ['\'हस्तक्षेप\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_15_004 (केंद्रीय भाव और रस)** और **c11_hin_a_cbse_15_002 (पद्यांश-वार.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"कठिन शब्दों के अर्थ रटना" ही पदावली की तैयारी है**। वे "वितान" का अर्थ "आकाश" रट लेते हैं, लेकिन यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — *"कविता की वह पंक्ति दोबारा पढ़ो जहां यह शब्द आया है। शब्द को वाक्य से अलग मत करो।"* **चरण.', '\'छत\' या \'आसमान\' क्यों नहीं?"* — इससे **शब्द-चयन की सायासता (deliberate choice)** समझ आएगी। **चरण 3**: मुहावरों के लिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_011', difficulty: 'standard',
          question: '\'हस्तक्षेप\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि फँसें तो **कक्षा 9-10 की हिंदी व्याकरण पुस्तक** के \'वाक्य विचार\', \'कारक\', \'समास\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि मुक्तिबोध जैसे प्रगतिशील कवियों की भाषा में व्याकरणिक \'त्रुटियाँ\' या \'अनगढ़पन\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' में भाषा-प्रयोग',
                  options: ['\'हस्तक्षेप\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **कक्षा 9-10 की हिंदी व्याकरण पुस्तक** के \'वाक्य विचार\', \'कारक\', \'समास\' अध्याय दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि मुक्तिबोध जैसे प्रगतिशील कवियों की भाषा में व्याकरणिक \'त्रुटियाँ\' या \'अनगढ़पन\' होता है क्योंकि वे.' }
          ],
            remediations: { 'rule-governed': { steps: ['**माइक्रो-ड्रिल:** कविता से 5 वाक्य चुनें। प्रत्येक को **मानक गद्य क्रम (Standard Prose Order)** में लिखें। फिर दोनों.', 'अर्थ में क्या जुड़ा/घटा?* 2.', '**कारक-चिह्न मैपिंग:** एक पंक्ति लें (जैसे "सभ्यता रोग निदान")। सभी संभावित कारक चिह्न डालकर **पूर्ण वाक्य** बनाएं.', '**समास-विघटन अभ्यास:** कविता के 5 प्रमुख समास पदों का **विग्रह** करें और फिर **अन्य समास प्रकार** में पुनर्गठित करें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_15_012', difficulty: 'standard',
          question: '\'हस्तक्षेप\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो c11_hin_a_cbse_15_007 (प्रतीक और बिंब) के कार्यित उदाहरण (worked examples).',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि आशय-सूचक प्रश्नों का उत्तर \'कवि के मन की बात\' बताना है — इसलिए वे लिखते हैं "कवि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हस्तक्षेप\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'हस्तक्षेप\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हस्तक्षेप\' का कथानक', '\'हस्तक्षेप\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_15_007 (प्रतीक और बिंब) के कार्यित उदाहरण (worked examples) दोबारा करें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि आशय-सूचक प्रश्नों का उत्तर \'कवि के मन की बात\' बताना है — इसलिए वे लिखते हैं "कवि कहना चाहते हैं कि.' }
          ],
            remediations: { 'authorial-intent-poetic-meaning': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहचान अभ्यास:** छात्र को 10 मिश्रित प्रश्न दें (5 वस्तुनिष्ठ, 5 आशय-सूचक) — उसे केवल वर्गीकृत करने को कहें, उत्तर न.', '**साक्ष्य-खोज ड्रिल:** एक आशय-सूचक प्रश्न लें (जैसे "पक्षी का लौटना पराजय है या समझौता?") — छात्र से कहें: "उत्तर मत.', '**PEEL टेम्पलेट भरवाएं:** खाली PEEL शीट दें (P:__, E:__, E:__, L:__) — पहले केवल E (Evidence) कॉलम भरवाएं, फिर P, फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
