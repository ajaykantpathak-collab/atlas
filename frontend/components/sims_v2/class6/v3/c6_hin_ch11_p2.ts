import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch11_p2: SimDef = {
    id: 'v3_c6_hin_ch11_p2',
    title: 'पाठ 11 · Part 2/3',
    subtitle: 'यह नोड कक्षा 6 के स्तर पर गौण विषय की पहचान, विश्लेषण और मुख्य विषय से संबंध समझाने तक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 11 · Part 2/3',
    chapters: ['c6_hin_ch11'],
    nodeIds: ['c6_hin_cbse_11_007', 'c6_hin_cbse_11_008', 'c6_hin_cbse_11_009', 'c6_hin_cbse_11_010', 'c6_hin_cbse_11_011', 'c6_hin_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी गौर किया है कि तुम्हारी पसंदीदा कार्टून सीरीज में, हीरो की मुख्य लड़ाई के साथ-साथ उसके दोस्तों.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो पाठ के मुख्य विषय (Main Theme) के साथ समानांतर चलता है, उसे स्पष्ट करता है, पात्रों के विभिन्न पहलू उजागर करता है और कथानक को गहराई तथा विस्तार.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — गौण', 'पाठ 11 — साहित्यिक', 'पाठ 11 — पदावली', 'पाठ 11 — व्याकरण', 'पाठ 11 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 2/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखे तथ्यों.', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो पाठ के मुख्य विषय (Main.',
          hint: 'यदि अटके तो **c6_hin_cbse_11_006 (मुख्य विषय और संदेश)** दोहराएँ — विशेष रूप से यह.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'कोई भी छोटी घटना या पात्र का कोई भी गुण\'। वे पाठ में आने वाली हर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो पाठ के मुख्य विषय (Main Theme) के साथ',
                  options: ['गौण विषय (Sub-theme) वह सहायक विचार या कथानक है जो पाठ के मुख्य विषय (Main Theme) के साथ', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटके तो **c6_hin_cbse_11_006 (मुख्य विषय और संदेश)** दोहराएँ — विशेष रूप से यह पहचानने का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'कोई भी छोटी घटना या पात्र का कोई भी गुण\'। वे पाठ में आने वाली हर छोटी बात (जैसे "नायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**अंतर स्पष्ट करो:** छात्र को दो कॉलम बनाने को कहो — बाएँ \'घटना/विवरण\', दाएँ \'संभावित गौण विषय\'। पाठ से 5 उदाहरण भरवाओ।.', '**प्रश्न पूछो:** "यह घटना कौन-से बड़े मानवीय अनुभव को दर्शाती है?" जब तक वह \'लालच\', \'डर\', \'कर्तव्य\' जैसे अमूर्त संज्ञा.', '**मुख्य विषय से जोड़ो:** फिर पूछो: "यह बड़ा अनुभव मुख्य विषय \'मित्रता/त्याग\' को कैसे बदलता/गहरा करता है?" 4.', '**अभ्यास:** एक नया छोटा पैराग्राफ दो (अन्य पाठ से) और उससे गौण विषय निकालने को कहो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** लेखक द्वारा शब्दों के माध्यम से पाठक की पाँचों इंद्रियों.',
          hint: 'अगर **इंद्रियगत बिंब** पहचानने में अटके → **अपने आस-पास के 5 मिनट के अनुभव** को पाँचों.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर समझते हैं कि **रूपक केवल "कविता की शोभा" के लिए होता है** — अर्थात् वह **सजावटी भाषा** है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** लेखक द्वारा शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृष्टि,',
                  options: ['**बिंब (Imagery):** लेखक द्वारा शब्दों के माध्यम से पाठक की पाँचों इंद्रियों (दृष्टि,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'अगर **इंद्रियगत बिंब** पहचानने में अटके → **अपने आस-पास के 5 मिनट के अनुभव** को पाँचों इंद्रियों.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर समझते हैं कि **रूपक केवल "कविता की शोभा" के लिए होता है** — अर्थात् वह **सजावटी भाषा** है जिसका काम **सुंदर.' }
          ],
            remediations: { '5': { steps: ['**दैनिक जीवन से शुरू करो:** छात्र से पूछो — "तुम्हारी माँ कहती है \'तुम **आँखों का तारा** हो\' — क्या तुम सचमुच तारा हो?', 'नहीं। फिर माँ ने **क्या कहा** और **क्यों कहा**?" — लिखवाओ: "माँ ने **मुझे तारा कहा** ताकि **मेरा मूल्य/प्रियता** दिखाए".', '**तुलना तालिका बनवाओ:** दो कॉलम — "उपमा" और "रूपक"। 5-5 वाक्य देओ (मिश्रित)। छात्र को **छाँटकर** तालिका में डालने को.', '**बिंब-खोज खेल:** एक छोटा अनुच्छेद देओ (बिना बिंब/रूपक चिह्नित किए)। छात्र को **रंगीन पेंसिल** से चिह्नित करना है: लाल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में असंगत या झूठा लगता है.',
          hint: 'अगर अटके तो c6_hin_cbse_11_008 (बिंब और रूपक) दोहराएं — विशेष रूप से "रूपक में तुलना छिपी.',
          misconception: 'छात्र **विरोधाभास** को केवल "विरोधी शब्दों का मेल" (ऑक्सीमोरन जैसा) समझ लेते हैं, जबकि विरोधाभास पूरा वाक्य/कथन होता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में असंगत या झूठा लगता है, लेकिन गहराई',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में असंगत या झूठा लगता है, लेकिन गहराई', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'अगर अटके तो c6_hin_cbse_11_008 (बिंब और रूपक) दोहराएं — विशेष रूप से "रूपक में तुलना छिपी होती है.',
                  misconception: 'छात्र **विरोधाभास** को केवल "विरोधी शब्दों का मेल" (ऑक्सीमोरन जैसा) समझ लेते हैं, जबकि विरोधाभास पूरा वाक्य/कथन होता है जो गहरा सत्य खोलता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को दो वाक्य दो — "वह रोता हुआ हंसा" (विरोधाभास) और "उसके हाथ में दीया था" (प्रतीक) — और पूछो: "पहले में.', 'दूसरे में दीया केवल दीया है या कुछ और?" चरण 2: विरोधाभास के लिए "उल्टा लगने वाला सत्य" और प्रतीक के लिए "चीज़ जो किसी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द उस पाठ के **सबसे महत्त्वपूर्ण 8-10 शब्द** होते हैं जो रचना.',
          hint: 'अगर अटके तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 004 (नायक पात्र-चित्रण)** दोबारा.',
          misconception: '**सबसे विशिष्ट भ्रम:** छात्र **संज्ञा/वस्तु-शब्दों** (जैसे: नदी, पहाड़, किताब, माँ, घर) को ही मुख्य शब्द मान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द उस पाठ के **सबसे महत्त्वपूर्ण 8-10 शब्द** होते हैं जो रचना के केंद्रीय',
                  options: ['पदावली: मुख्य शब्द उस पाठ के **सबसे महत्त्वपूर्ण 8-10 शब्द** होते हैं जो रचना के केंद्रीय', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'अगर अटके तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 004 (नायक पात्र-चित्रण)** दोबारा पढ़ें.',
                  misconception: '**सबसे विशिष्ट भ्रम:** छात्र **संज्ञा/वस्तु-शब्दों** (जैसे: नदी, पहाड़, किताब, माँ, घर) को ही मुख्य शब्द मान लेते हैं क्योंकि ये पाठ में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र को एक छोटा अनुच्छेद दो (5-6 पंक्तियाँ) जहाँ 2-3 वस्तुएँ बार-बार आएँ पर केंद्रीय भाव अलग हो। उदा.', '**दूसरा कदम:** पूछो — "कौन से शब्द बार-बार आए?" (खिलौने, किताब, बस्ता)। फिर पूछो — "लेखक क्या बताना चाहता है?" (गरीबी.', '**तीसरा कदम:** दिखाओ — "बार-बार आए शब्द वस्तुएँ हैं; जो भाव बता रहे हैं (**चमक, ललक**) वही मुख्य शब्द हैं।" 4.', '**चौथा कदम:** 3-4 ऐसे अभ्यास कराओ जहाँ वस्तु-शब्द और भाव-शब्द साथ हों — छात्र को हर बार **भाव-शब्द** छाँटने का अभ्यास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों.',
          hint: 'यदि अटका हुआ महसूस हो तो **पदावली: मुख्य शब्द (c6_hin_cbse_11_010)** दोहराएँ — विशेषकर उन.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "भाषा-प्रयोग" का अर्थ है **पाठ में आए कठिन शब्दों के अर्थ लिखना** या **मुहावरों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटका हुआ महसूस हो तो **पदावली: मुख्य शब्द (c6_hin_cbse_11_010)** दोहराएँ — विशेषकर उन शब्दों को.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "भाषा-प्रयोग" का अर्थ है **पाठ में आए कठिन शब्दों के अर्थ लिखना** या **मुहावरों की सूची बनाना**। वे यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १**: छात्र से कहो — "पाठ का कोई एक वाक्य चुनो जिसमें तुम्हें लगे कि लेखक ने शब्द बड़ी सावधानी से चुने हैं।" **चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_11_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखे.',
          hint: 'यदि अटका हुआ लगे: **c6_hin_cbse_11_002 (कथानक)** पर लौटें और किसी एक दृश्य के 3 तथ्य और 2.',
          misconception: '**सबसे आम और खतरनाक भ्रम:** "पाठ में जो लिखा है, वही वस्तुनिष्ठ सत्य है; आशय-सूचक का मतलब है \'अपने मन से कुछ भी बोल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखे तथ्यों,',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखे तथ्यों,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (Cause-Effect) क्रम में व्यवस्थित', 'पाठ्य-परिवेश और वातावरण किसी कहानी या पाठ में घटनाओं के घटित होने का **स्थान (जहाँ), समय'],
                  hint: 'यदि अटका हुआ लगे: **c6_hin_cbse_11_002 (कथानक)** पर लौटें और किसी एक दृश्य के 3 तथ्य और 2 संभावित.',
                  misconception: '**सबसे आम और खतरनाक भ्रम:** "पाठ में जो लिखा है, वही वस्तुनिष्ठ सत्य है; आशय-सूचक का मतलब है \'अपने मन से कुछ भी बोल दो\'।" **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (पहचान का अभ्यास):** छात्र को 5-6 वाक्य दें (मिश्रित: तथ्य, राय, विशेषण, भाव)। उसे दो कॉलम में बाँटने को कहें.', 'मुख्य बात से जोड़ो।" पहले मौखिक करवाएँ, फिर लिखित। **चरण 4 (फीडबैक लूप):** उसके उत्तर में लाल पेन से चिह्नित करें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
