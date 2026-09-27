import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch01_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch01_p2',
    title: 'आत्मपरचिय, एक गीत · Part 2/3',
    subtitle: '\'I am pulp\' — the intellectual who saw the machine from inside',
    classLevel: 12, subject: 'hin_ar', topic: 'आत्मपरचिय, एक गीत · Part 2/3',
    chapters: ['c12_hin_ar_ch01'],
    nodeIds: ['c12_hin_ar_cbse_01_007', 'c12_hin_ar_cbse_01_008', 'c12_hin_ar_cbse_01_009', 'c12_hin_ar_cbse_01_010', 'c12_hin_ar_cbse_01_011', 'c12_hin_ar_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi modern-poetry reader', intro: 'A Progressive poet who served both university and ministry writes about being ground to pulp. Context is the key.', goal: 'Situate Muktibodh\'s Vartmaan in the Progressive movement and post-1947 disillusionment.' },
    discovery: {
        question: 'Freedom came in 1947 — yet by the 1950s a professor-poet wrote \'मैं लुगदी हूँ\' — I am pulp. What turned independence into existential dread?',
        options: ['The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system', 'The poet was personally ill', 'Romanticism just ended', 'Poetry was unfashionable'],
        answer: 'The Progressive Writers\' disillusion — Nehruvian promises met unchanged feudal-capitalist reality, and the intellectual found himself commodified inside the system',
        hook: 'Muktibodh wasn\'t a छायावादी dreamer — he was Progressive: class, institutions, the writer\'s complicity. As academic and state functionary both, his \'I\' is lived conflict — self-pity becomes a calculated indictment of the intellectual inside the machine.',
    },
    teaching: [
        { title: 'आत्मपरचिय, एक गीत — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द या पद जो पाठक के मन में इंद्रियगत अनुभूति (दृश्य, श्रव्य, घ्राण, स्पर्श, रसानुभूति) उत्पन्न करते हैं। **प्रतीक (Symbol):** कोई ठोस वस्तु, व्यक्ति, घटना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read \'वर्तमान\' inside its decade: map the छायावाद-to-प्रगतिवाद shift, weigh the intellectual\'s self-deception against his conscience, and hear what \'pulp\' means from a man who served the state.',
        labels: ['आत्मपरचिय, एक गीत —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_ar_cbse_01_010', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['निष्कर्ष — तत्सम शब्द **संक्षिप्तता में गहन भाव-श्रृंखला**.', 'व्यंजना/प्रतीकात्मकता तक जाएँ — अनुराग = **आत्मा की वह गहन.', 'कविता के प्रसंग (Context) से लाक्षणिक अर्थ निकालें — यहाँ.', 'दोनों शब्दों के शब्दकोशीय अर्थ (अभिधा) लिखें — अनुराग.', 'तत्सम चयन का कारण विश्लेषित करें — संस्कृत धातुएँ (अनु+राग.'], answer: 'दोनों शब्दों के शब्दकोशीय अर्थ (अभिधा) लिखें — अनुराग. कविता के प्रसंग (Context) से लाक्षणिक अर्थ निकालें — यहाँ. व्यंजना/प्रतीकात्मकता तक जाएँ — अनुराग = **आत्मा की वह गहन. तत्सम चयन का कारण विश्लेषित करें — संस्कृत धातुएँ (अनु+राग. निष्कर्ष — तत्सम शब्द **संक्षिप्तता में गहन भाव-श्रृंखला**.' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your poem is accepted by the college magazine, but the editor returns it blood-red with corrections, insisting every comma and full stop sit exactly where the rulebook demands. Your gut says the rules are flattening the voice.',
            decisions: [{ prompt: 'What would Nirala\'s \'विराम चिह्न\' tell both sides?', options: [
                { text: 'Let the punctuation marks argue their case — but don\'t let them own the poem; Nirala personifies them, hears them out, then refuses to be their slave, and finally hands the judgment to the reader.', outcome: 'The poem\'s structure is the lesson: rules speak (rising action), the poet resists (climax), and the verdict is democratically opened (\'you decide\') — craft serves voice, not the reverse.' },
                { text: 'Delete every mark — if rules are tyranny, true freedom is a poem with no punctuation at all.', outcome: 'Nirala refuses slavery, not punctuation — the marks stay in the poem as characters with a hearing; abolishing them confuses liberation with vandalism.', reveals: 'freedom-means-no-rules' },
                { text: 'Accept every correction — punctuation exists to discipline expression, and the editor\'s word is final.', outcome: 'That\'s precisely the gulami the poet rejects at the climax; the poem stages the marks\' claims so the poet — and finally the reader — can overrule them.', reveals: 'rules-outrank-voice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now place a poem in its movement — and hear post-independence disillusion speaking as first-person dread.',
            decisions: [{ prompt: 'What comes next? आत्मपरचिय, एक गीत · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आत्मपरचिय, एक गीत · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_007', difficulty: 'standard',
          question: '**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द या पद जो पाठक के मन में.',
          hint: 'यदि फँस जाएँ तो कक्षा 11 के नोड **c11_hin_ar_cbse_13_009** (जाग तुझको दूर जाना.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **\'बिंब = प्रतीक\'** होता है। वे कविता में आए हर चित्र (जैसे: दीपक, अंधेरा, पथ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द या पद जो पाठक के मन में इंद्रियगत अनुभूति',
                  options: ['**बिंब (Imagery):** काव्य में प्रयुक्त वे शब्द या पद जो पाठक के मन में इंद्रियगत अनुभूति', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि फँस जाएँ तो कक्षा 11 के नोड **c11_hin_ar_cbse_13_009** (जाग तुझको दूर जाना — विरोधाभास और.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि **\'बिंब = प्रतीक\'** होता है। वे कविता में आए हर चित्र (जैसे: दीपक, अंधेरा, पथ, आंसू) को तुरंत प्रतीक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहो: "कविता की कोई 5 पंक्तियाँ चुनो जहाँ तुम्हें चित्र दिखे (बिंब)। उन्हें लिखो।" **चरण 2:** अब.', 'केवल वही प्रतीक है।" **चरण 3:** **तुलना तालिका** बनवाओ: | पंक्ति | बिंब (क्या दिखा?) | प्रतीक (क्या अर्थ?) | प्रतीक है?', '(हाँ/नहीं) | |---|---|---|---| | "जलता दीपक" | लौ, प्रकाश, ताप | आत्मोत्सर्ग, साधना | हाँ | | "चांदनी रात" | चाँद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_008', difficulty: 'standard',
          question: 'मुख्य भाव वह गहरा अनुभव या मनोदशा है जो कवि अपने गीत के माध्यम से पाठक में.',
          hint: 'यदि फंसे हुए महसूस हो, तो कक्षा 11 के किसी भी पाठ के "मुख्य विषय और संदेश" वाले नोड (जैसे.',
          misconception: 'छात्र अक्सर मुख्य भाव को गीत के पहले या अंतिम stanza से निकाल लेते हैं, मानते हैं कि वही कवि का अंतिम उद्देश्य है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य भाव वह गहरा अनुभव या मनोदशा है जो कवि अपने गीत के माध्यम से पाठक में जागृत करना',
                  options: ['मुख्य भाव वह गहरा अनुभव या मनोदशा है जो कवि अपने गीत के माध्यम से पाठक में जागृत करना', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि फंसे हुए महसूस हो, तो कक्षा 11 के किसी भी पाठ के "मुख्य विषय और संदेश" वाले नोड (जैसे.',
                  misconception: 'छात्र अक्सर मुख्य भाव को गीत के पहले या अंतिम stanza से निकाल लेते हैं, मानते हैं कि वही कवि का अंतिम उद्देश्य है। उदाहरण के लिए, यदि अंत.' }
          ],
            remediations: { 'stanza': { steps: ['छात्र से पूछिए कि वह गीत को तीन भागों में बाँटे: आरंभ (क्या हो रहा है?), मध्य (क्या बदल रहा है?), अंत (क्या सीख मिली.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_009', difficulty: 'standard',
          question: 'गौण भाव (Sub-theme) कविता में मुख्य भाव के समानांतर चलने वाली वह द्वितीयक.',
          hint: 'यदि अटका हो तो c12_hin_ar_cbse_01_008 (मुख्य भाव) के \'केंद्रीय भाव पहचान\' चरण को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः समझते हैं कि \'गौण भाव\' = \'कम महत्त्वपूर्ण भाव\' और \'विषयांतर\' = \'लेखक का भटकाव/गलती\'।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (Sub-theme) कविता में मुख्य भाव के समानांतर चलने वाली वह द्वितीयक भावनात्मक धारा',
                  options: ['गौण भाव (Sub-theme) कविता में मुख्य भाव के समानांतर चलने वाली वह द्वितीयक भावनात्मक धारा', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि अटका हो तो c12_hin_ar_cbse_01_008 (मुख्य भाव) के \'केंद्रीय भाव पहचान\' चरण को दोहराएँ — पहले.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः समझते हैं कि \'गौण भाव\' = \'कम महत्त्वपूर्ण भाव\' और \'विषयांतर\' = \'लेखक का भटकाव/गलती\'। **यथार्थ:** निराला में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** कविता के 5-6 पद चुनें; प्रत्येक के आगे M (मुख्य), G (गौण), V (विषयांतर) लिखें — शिक्षक के साथ मिलान करें।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_010', difficulty: 'standard',
          question: 'This topic covers the systematic identification, meaning, and contextual.',
          hint: 'यदि अटके तो **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) का \'शब्द-शक्ति.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल **शब्दकोश से अर्थ ढूँढ़ना** है। वे "ज्वाल", "अनुराग".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic covers the systematic identification, meaning, and contextual interpretation',
                  options: ['This topic covers the systematic identification, meaning, and contextual interpretation', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) का \'शब्द-शक्ति विश्लेषण\' भाग.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल **शब्दकोश से अर्थ ढूँढ़ना** है। वे "ज्वाल", "अनुराग", "विरह" के शब्दकोशीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्निदान (Re-diagnose):** छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जहाँ \'ज्वाल\' या \'अनुराग\' आया है। मुझे बताओ.', '**लक्षित पुनरावृत्ति:** Node **c11_hin_a_cbse_13_010** (जाग तुझको दूर जाना — पदावली) और **c11_hin_a_cbse_14_010** (बादल.', '**अभ्यास:** कविता के 5 कठिन शब्द चुनकर **तीन-स्तरीय अर्थ-तालिका** बनवाएँ: (क) शब्दकोशीय अर्थ (ख) काव्यात्मक अर्थ (ग).', '**पुनः जाँच:** अगले सत्र में उसी शब्द पर *Ashaya Spashtikaran* (node 013) शैली का प्रश्न दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग (Language use in poetry) refers to the deliberate.',
          hint: 'यदि फँसें तो c11_hin_ar_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग).',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में \'गलत\' व्याकरण (जैसे क्रिया न होना, उल्टा क्रम) कवि की **अज्ञानता** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग (Language use in poetry) refers to the deliberate deviation from',
                  options: ['पद्य में भाषा-प्रयोग (Language use in poetry) refers to the deliberate deviation from', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि फँसें तो c11_hin_ar_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग) पर लौटें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि कविता में \'गलत\' व्याकरण (जैसे क्रिया न होना, उल्टा क्रम) कवि की **अज्ञानता** या **लापरवाही** है, या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन:** छात्र को कविता के 3-4 पद मौन पढ़कर फिर जोर से पढ़ने को कहें — पूछें: "कहाँ रुकने का मन करता है?', 'कहाँ बात अधूरी लगती है?" वहीँ लोप/अन्वय है। 2.', '**तुलना अभ्यास:** उसी भाव को गद्य में लिखवाएँ (उदा.', '"मेरा कोई ठिकाना नहीं है") और काव्य-पंक्ति साथ रखें — पूछें: "क्या खोया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_01_012', difficulty: 'standard',
          question: 'बोध-प्रश्न (Comprehension Questions) in *आत्मपरिचय, एक गीत* are of two types.',
          hint: 'यदि फँस जाएँ तो c12_hin_ar_cbse_01_002 (भावार्थ) और c12_hin_ar_cbse_01_007 (प्रतीक) को.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न** का उत्तर देने के लिए केवल पंक्ति का **अनुवाद/भावार्थ** लिखना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न (Comprehension Questions) in *आत्मपरिचय, एक गीत* are of two types: (1)',
                  options: ['बोध-प्रश्न (Comprehension Questions) in *आत्मपरिचय, एक गीत* are of two types: (1)', 'कवि परिचय और पृष्ठभूमि वह साहित्यिक विश्लेषण है जिसमें कवि के जीवन-वृत्त,', 'पद्यांश-वार भावार्थ (Stanza-wise meaning) refers to the detailed, line-by-line', 'काव्य-संरचना (poetic structure) कविता के छंदों, पंक्तियों, विरामों और उनकी परस्पर'],
                  hint: 'यदि फँस जाएँ तो c12_hin_ar_cbse_01_002 (भावार्थ) और c12_hin_ar_cbse_01_007 (प्रतीक) को दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न** का उत्तर देने के लिए केवल पंक्ति का **अनुवाद/भावार्थ** लिखना काफी है।.' }
          ],
            remediations: { 'cbse-cuet': { steps: ['**चरण 1:** छात्र को c12_hin_ar_cbse_01_002 (पद्यांश-वार भावार्थ) और c12_hin_ar_cbse_01_007 (प्रतीक और बिंब) पर वापस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
