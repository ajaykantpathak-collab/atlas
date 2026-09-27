import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch02_p2: SimDef = {
    id: 'v3_c6_hin_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'यह नोड केवल **गौण विषय की पहचान, वर्गीकरण और मुख्य विषय से संबंध** समझाने तक सीमित है.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c6_hin_ch02'],
    nodeIds: ['c6_hin_cbse_02_007', 'c6_hin_cbse_02_008', 'c6_hin_cbse_02_009', 'c6_hin_cbse_02_010', 'c6_hin_cbse_02_011', 'c6_hin_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुमने एक नई फिल्म देखी — कहानी दोस्ती (मुख्य विषय) पर है, लेकिन बीच-बीच में परिवार का दबाव, करियर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय (Sub-theme) कहानी का वह सहायक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता है, उसे गहराई देता है, या उसके विभिन्न पहलुओं को उजागर करता है; यह स्वतंत्र रूप से कहानी नहीं चला सकता, पर मुख्य.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है (तथ्य-आधारित).', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 2 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कहानी का वह सहायक केंद्रीय विचार है जो मुख्य विषय का.',
          hint: 'यदि अटके, तो c6_hin_cbse_02_006 (मुख्य विषय और संदेश) पर वापस जाएँ — विशेष रूप से \'विषय.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"गौण विषय = कहानी का कोई भी छोटा-मोटा प्रसंग या पात्र की कोई आदत"**। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कहानी का वह सहायक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता है,',
                  options: ['गौण विषय (Sub-theme) कहानी का वह सहायक केंद्रीय विचार है जो मुख्य विषय का समर्थन करता है,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके, तो c6_hin_cbse_02_006 (मुख्य विषय और संदेश) पर वापस जाएँ — विशेष रूप से \'विषय vs कथानक\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"गौण विषय = कहानी का कोई भी छोटा-मोटा प्रसंग या पात्र की कोई आदत"**। उदाहरण: पाठ \'वह चिड़िया जो\'.' }
          ],
            remediations: { 'detail-idea-universal-human-concern': { steps: ['**पहला कदम:** छात्र से कहो — "कहानी का एक वाक्य में **सार** लिखो (क्या हुआ?)। फिर एक वाक्य में **सारांश** लिखो (कहानी.', '**दूसरा कदम:** उसी कहानी से 3-4 प्रसंग चुनो और पूछो: "इस प्रसंग से लेखक **कौन-सा बड़ा सवाल** उठा रहा है?" — प्रत्येक.', '**तीसरा कदम:** छात्र से कहो — "अब मुख्य विषय लिखो, फिर हर गौण विषय के आगे तीर खींचकर लिखो: **यह मुख्य विषय को कैसे.', '**चौथा कदम:** यदि फिर अटका हो, तो **अपने जीवन का उदाहरण** दो: "तुम्हारा मुख्य लक्ष्य = अच्छे अंक लाना; गौण विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन.',
          hint: 'अगर अटके तो **उपमा (Simile) और विशेषण (Adjectives)** की कक्षा 5 की व्याकरण पुस्तिका के.',
          misconception: 'छात्र अक्सर **हर तुलना को रूपक मान लेते हैं** — वे \'जैसे\', \'सा\', \'सम\', \'प्रतिबिंब\' जैसे शब्दों को नज़रअंदाज़ कर देते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'अगर अटके तो **उपमा (Simile) और विशेषण (Adjectives)** की कक्षा 5 की व्याकरण पुस्तिका के उदाहरण.',
                  misconception: 'छात्र अक्सर **हर तुलना को रूपक मान लेते हैं** — वे \'जैसे\', \'सा\', \'सम\', \'प्रतिबिंब\' जैसे शब्दों को नज़रअंदाज़ कर देते हैं और केवल "दो चीज़ों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र को 5 वाक्य दें — प्रत्येक में एक इंद्रिय को जगाने वाला बिंब हो (जैसे: "जलेबी की गंध पूरे बाज़ार में.', '**दूसरा कदम:** 5 जोड़ी वाक्य दें — एक उपमा, एक रूपक (विषय समान)। छात्र से **\'जैसे/सा\' ढूँढ़ने** को कहें — जहाँ न हो.', '**तीसरा कदम:** एक सरल रूपक दें ("गुस्सा ज्वालामुखी है") — छात्र से **उपमान-उपमेय** अलग करवाएँ और पूछें: "ज्वालामुखी के.', '**चौथा कदम:** कक्षा की किसी कविता से 2-3 बिंब और 1 रूपक **मिलकर** पहचानें और चर्चा करें कि कवि ने इन्हें **क्यों** चुना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें एक साथ.',
          hint: 'यदि अटके तो c6_hin_cbse_02_008 (बिंब और रूपक) के \'रूपक बनाम प्रतीक\' अंतर वाले अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विडंबना (irony)** या **विरोधाभासी स्थिति (oxymoron)** मान लेते हैं, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें एक साथ कही जाती',
                  options: ['**विरोधाभास** एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी बातें एक साथ कही जाती', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके तो c6_hin_cbse_02_008 (बिंब और रूपक) के \'रूपक बनाम प्रतीक\' अंतर वाले अभ्यास दोहराएं।',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विडंबना (irony)** या **विरोधाभासी स्थिति (oxymoron)** मान लेते हैं, और **प्रतीक** को **रूपक.' }
          ],
            remediations: { 'irony-oxymoron': { steps: ['**विरोधाभास के लिए:** छात्र से कहो — "एक वाक्य लिखो जहां तुम खुश दिखो पर दुखी हो। फिर बताओ: दोनों बातें एक साथ सच कैसे.', 'कौन-सा बड़ा सत्य खुल रहा है?" इसे 3-4 उदाहरणों से अभ्यास कराओ (जैसे: "शोर में सन्नाटा", "भीड़ में अकेलापन")। 2.', '**प्रतीक के लिए:** कक्षा में एक वस्तु रखो (जैसे टूटी कलम, सूखा फूल, पुराना टिकट)। पूछो: "यह क्या है?', 'और इस कहानी में क्या बन सकती है?" फिर पाठ से एक प्रतीक लेकर उसके **शाब्दिक गुण** (रंग, आकार, व्यवहार) लिखवाओ और फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे चुनिंदा, महत्वपूर्ण शब्द होते हैं जो किसी पाठ के केंद्रीय.',
          hint: 'यदि अटका लगे तो c6_hin_cbse_02_006 (मुख्य विषय और संदेश) दोबारा देखें — विशेषकर \'विषय.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "जिस शब्द का अर्थ मुझे नहीं आता, वही मुख्य शब्द है।" **गलत तर्क**: वे शब्दकोश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे चुनिंदा, महत्वपूर्ण शब्द होते हैं जो किसी पाठ के केंद्रीय विषय, भाव',
                  options: ['पदावली: मुख्य शब्द वे चुनिंदा, महत्वपूर्ण शब्द होते हैं जो किसी पाठ के केंद्रीय विषय, भाव', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटका लगे तो c6_hin_cbse_02_006 (मुख्य विषय और संदेश) दोबारा देखें — विशेषकर \'विषय कैसे पहचानें\'.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि "जिस शब्द का अर्थ मुझे नहीं आता, वही मुख्य शब्द है।" **गलत तर्क**: वे शब्दकोश खोलकर हर अपरिचित शब्द का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम**: छात्र को एक छोटा अनुच्छेद दो (5-6 वाक्य) और कहो: "केवल 3 शब्द घेरो जिनके बिना यह पैराग्राफ अपना मतलब खो.', '**दूसरा कदम**: उसके चुने शब्दों पर पूछो: "यह शब्द कितनी बार आया?', 'क्या यह शीर्षक से जुड़ता है?', 'क्या यह कोई बड़ा भाव (जैसे प्रेम, संघर्ष, न्याय) ले आता है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों.',
          hint: 'यदि अटके तो "पदावली: मुख्य शब्द" (c6_hin_cbse_02_010) पर वापस जाएँ और शब्दों के संदर्भगत.',
          misconception: 'विद्यार्थी अक्सर समझते हैं कि "भाषा-प्रयोग" का अर्थ केवल व्याकरण की शुद्धता (सही वर्तनी, सही कारक, सही काल) है। वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों, वाक्य-रचना, मुहावरों, लोकोक्तियों और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'यदि अटके तो "पदावली: मुख्य शब्द" (c6_hin_cbse_02_010) पर वापस जाएँ और शब्दों के संदर्भगत अर्थ.',
                  misconception: 'विद्यार्थी अक्सर समझते हैं कि "भाषा-प्रयोग" का अर्थ केवल व्याकरण की शुद्धता (सही वर्तनी, सही कारक, सही काल) है। वे यह नहीं देख पाते कि लेखक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: विद्यार्थी से कहो कि वह अपनी किसी प्रिय कहानी/फिल्म के एक संवाद को दो तरह से लिखे — एक "पुस्तक की भाषा" में, एक.', 'क्यों?" चरण ३: समझाओ कि लेखक पात्र और स्थिति के अनुसार भाषा बदलते हैं — यही "भाषा-प्रयोग" का कौशल है। चरण ४: अब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है.',
          hint: 'अगर अटके तो c6_hin_cbse_02_002 (कथानक संरचना) और c6_hin_cbse_02_004 (पात्र-चित्रण) दोबारा.',
          misconception: 'छात्र मानते हैं कि **आशय-सूचक प्रश्न का उत्तर भी पाठ में कहीं \'छिपा\' होता है और बस ध्यान से पढ़ने पर मिल जाएगा**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है (तथ्य-आधारित),',
                  options: ['वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है (तथ्य-आधारित),', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) है जो नायक के', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित वह समग्र पृष्ठभूमि है जिसमें काल (समय),'],
                  hint: 'अगर अटके तो c6_hin_cbse_02_002 (कथानक संरचना) और c6_hin_cbse_02_004 (पात्र-चित्रण) दोबारा देखें.',
                  misconception: 'छात्र मानते हैं कि **आशय-सूचक प्रश्न का उत्तर भी पाठ में कहीं \'छिपा\' होता है और बस ध्यान से पढ़ने पर मिल जाएगा**। उदाहरण: गद्यांश में लिखा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्ट अंतर दिखाएं:** एक ही गद्यांश पर दोनों प्रकार के 3-3 प्रश्न लिखकर बोर्ड पर रखें; छात्रों से कहें: "लाल पेन से.', '**\'क्यों\' का जादू सिखाएं:** आशय-सूचक प्रश्न अक्सर \'क्यों\', \'कैसे\', \'क्या सीख मिली\' से शुरू होते हैं। छात्र को कहें: "जब.', '**मौखिक अभ्यास:** कक्षा में एक घटना सुनाएं (जैसे: "अमन ने गिरते हुए बूढ़े को संभाला") और तुरंत पूछें: "वस्तुनिष्ठ.', '**प्रतिक्रिया दें:** गलत उत्तर पर न डांटें, पूछें: "यह उत्तर तुमने पाठ की किस लाइन से लिया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
