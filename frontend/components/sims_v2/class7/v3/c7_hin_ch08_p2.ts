import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch08_p2: SimDef = {
    id: 'v3_c7_hin_ch08_p2',
    title: 'पाठ 8 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषय की पहचान, वर्गीकरण (समांतर/विरोधी/विस्तारक) और मुख्य विषय से संबंध.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 8 · Part 2/3',
    chapters: ['c7_hin_ch08'],
    nodeIds: ['c7_hin_cbse_08_007', 'c7_hin_cbse_08_008', 'c7_hin_cbse_08_009', 'c7_hin_cbse_08_010', 'c7_hin_cbse_08_011', 'c7_hin_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने कोई फिल्म देखी — हीरो का लक्ष्य मुख्य विषय है, लेकिन उसके दोस्त की प्रेम कहानी, माँ की.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — गौण विषय', text: 'गौण विषय (Sub-theme) कहानी का वह सहायक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे स्पष्ट करता है, उसका विस्तार करता है या उसके विरोधाभास को उजागर करता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — गौण', 'पाठ 8 — साहित्यिक', 'पाठ 8 — पदावली', 'पाठ 8 — व्याकरण', 'पाठ 8 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_08_012', title: 'पाठ 8 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'You\'ve just finished reading Chapter 8 and your teacher hands you a worksheet with two questions: "पात्र का नाम क्या है?" and "पात्र ने ऐसा निर्णय क्यों लिया?".',
            decisions: [{ prompt: 'पाठ 8 में \'वस्तुनिष्ठ प्रश्न\' और \'आशय-सूचक प्रश्न\' में क्या अंतर है? एक वाक्य में स्पष्ट कीजिए।', options: [
                { text: 'वस्तुनिष्ठ प्रश्न का उत्तर पाठ में सीधे-सीधे लिखा होता है (तथ्यात्मक), जबकि आशय-सूचक', outcome: 'वस्तुनिष्ठ प्रश्न का उत्तर पाठ में सीधे-सीधे लिखा होता है (तथ्यात्मक), जबकि आशय-सूचक प्रश्न का.' },
                { text: 'opinion questions', outcome: 'Not quite — Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they.', reveals: 'questions-are-opinion-questions-where' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कहानी का वह सहायक कथ्य है जो मुख्य विषय के समानांतर चलता.',
          hint: 'अगर मुख्य विषय अस्पष्ट है, तो c7_hin_cbse_08_006 (मुख्य विषय और संदेश) पर लौटें — "कहानी.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "गौण विषय = कम शब्दों में आने वाला विषय" या "गौण विषय = सहायक पात्रों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कहानी का वह सहायक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे',
                  options: ['गौण विषय (Sub-theme) कहानी का वह सहायक कथ्य है जो मुख्य विषय के समानांतर चलता है, उसे', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'अगर मुख्य विषय अस्पष्ट है, तो c7_hin_cbse_08_006 (मुख्य विषय और संदेश) पर लौटें — "कहानी अंततः क्या.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "गौण विषय = कम शब्दों में आने वाला विषय" या "गौण विषय = सहायक पात्रों की कहानी"। वे गौण विषय को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्परिभाषित करो**: छात्र के साथ बैठकर गौण विषय की परिभाषा बदलो — "कम महत्वपूर्ण" की जगह **"मुख्य विषय को पूरा करने.', '**कार्य-आधारित पहचान**: पाठ 8 के 5-6 प्रसंग चुनो। प्रत्येक के लिए पूछो: "यह प्रसंग मुख्य विषय (नोड 006) को कैसे आगे.', 'चुनौती देता है?" तीन कॉलम बनवाओ और प्रसंग चिपकवाओ। 3.', '**पात्र से विषय तक**: नोड 005 के सहायक पात्रों की सूची लो। प्रत्येक के लिए लिखवाओ: "इस पात्र का निजी दुख/संघर्ष कौन-सा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_008', difficulty: 'standard',
          question: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पांचों.',
          hint: 'अगर फंसे तो कक्षा 6 के पाठ 6 (c6_hin_cbse_06_008) का "उपमा बनाम रूपक" तुलना चार्ट और पाठ.',
          misconception: 'छात्र अक्सर **उपमा (Simile) को रूपक समझ लेते हैं** क्योंकि दोनों में तुलना होती है। वे "जैसे/जैसा/समान" शब्द देखते ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पांचों इंद्रियों',
                  options: ['बिंब (Imagery) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की पांचों इंद्रियों', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'अगर फंसे तो कक्षा 6 के पाठ 6 (c6_hin_cbse_06_008) का "उपमा बनाम रूपक" तुलना चार्ट और पाठ 7.',
                  misconception: 'छात्र अक्सर **उपमा (Simile) को रूपक समझ लेते हैं** क्योंकि दोनों में तुलना होती है। वे "जैसे/जैसा/समान" शब्द देखते ही सोचते हैं "यह तो.' }
          ],
            remediations: { 'simile': { steps: ['छात्र को 5 वाक्य दें जिनमें "जैसे/जैसा" हो और 5 बिना — उसे छांटने को कहें "रूपक कौन-सा है?" 2.', 'एक चित्र दिखाएं (जैसे बरसात का); छात्र से कहें: "आंखें बंद करो और बताओ क्या सूंघ रहे हो, क्या सुन रहे हो, त्वचा पर क्या.', 'फिर उससे कहें: "अब एक वाक्य लिखो जहां बरसात को **सीधे कोई और चीज़ कह दो** बिना \'जैसे\' बोले" — यह रूपक बनेगा। 4.', 'अंत में दोनों को मिलाकर एक छोटा अनुच्छेद लिखवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ.',
          hint: 'यदि अटका हुआ लगे तो c7_hin_cbse_08_008 के \'बिंब-रूपक पहचान अभ्यास\' दोहराएं — विशेषकर रूपक.',
          misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति** (situational irony) समझ बैठते हैं — जैसे "आग बुझाने वाला खुद जल गया".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ प्रस्तुत की',
                  options: ['**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जिसमें दो विरोधी बातें एक साथ प्रस्तुत की', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि अटका हुआ लगे तो c7_hin_cbse_08_008 के \'बिंब-रूपक पहचान अभ्यास\' दोहराएं — विशेषकर रूपक के.',
                  misconception: 'छात्र अक्सर **विरोधाभास** को **विरोधाभासी स्थिति** (situational irony) समझ बैठते हैं — जैसे "आग बुझाने वाला खुद जल गया" — जबकि साहित्यिक.' }
          ],
            remediations: { 'situational-irony-verbal-statement-paradox': { steps: ['छात्र को दो वाक्य दें: एक विरोधाभास ("मृत्यु जीवन का द्वार है"), एक साधारण विरोधी स्थिति ("डॉक्टर बीमार पड़ गया").', 'एक कहानी अंश दें जहाँ कोई वस्तु (जैसे दीया) 3-4 बार आए — छात्र से कहें: "हर बार इसका अर्थ लिखो। क्या अर्थ बदलता/गहराता.', 'स्पष्ट नियम दें: विरोधाभास = **वाक्य में विरोधी पदों का जानबूझकर मेल** → गहरा सत्य। प्रतीक = **पुनरावृत्त/केंद्रीय.', 'अभ्यास: पाठ्यपुस्तक के किसी पाठ से 2-2 उदाहरण छाँटने को कहें और उपरोक्त नियम से जाँचने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_010', difficulty: 'standard',
          question: 'पदावली (शब्दावली) का अर्थ है किसी पाठ में प्रयुक्त मुख्य शब्दों के अर्थ, उनके.',
          hint: 'यदि अटके तो कक्षा ६ की "पदावली: मुख्य शब्द" (c6_hin_cbse_08_010) दोहराएँ — विशेषकर.',
          misconception: 'छात्र समझते हैं कि "शब्द का अर्थ शब्दकोश में जो लिखा है, वही अंतिम है" — वे यह नहीं देखते कि एक ही शब्द (जैसे "मोह").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (शब्दावली) का अर्थ है किसी पाठ में प्रयुक्त मुख्य शब्दों के अर्थ, उनके विभिन्न',
                  options: ['पदावली (शब्दावली) का अर्थ है किसी पाठ में प्रयुक्त मुख्य शब्दों के अर्थ, उनके विभिन्न', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि अटके तो कक्षा ६ की "पदावली: मुख्य शब्द" (c6_hin_cbse_08_010) दोहराएँ — विशेषकर शब्द-परिवार.',
                  misconception: 'छात्र समझते हैं कि "शब्द का अर्थ शब्दकोश में जो लिखा है, वही अंतिम है" — वे यह नहीं देखते कि एक ही शब्द (जैसे "मोह") पाठ में "प्रेम".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ का वह अंश दें जहाँ शब्द आया है; उसे ज़ोर से पढ़ने को कहें। २.', 'पूछें: "आसपास के कौन-से शब्द इस शब्द का सुराग दे रहे हैं?" — उसे वे शब्द अंडरलाइन करवाएँ। ३.', 'शब्दकोश खोलकर *सभी* अर्थ पढ़ें, फिर मिलान करें: "कौन-सा अर्थ यहाँ फिट बैठता है?" ४.', 'अंत में छात्र से कहें: "अब इस शब्द से अपना एक वाक्य बनाओ जो पाठ की स्थिति से अलग हो।" — यह ४-चरणीय प्रक्रिया ३-४ बार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_011', difficulty: 'standard',
          question: 'भाषा-प्रयोग का अर्थ है किसी पाठ में लेखक द्वारा शब्दों, वाक्य-रचना, शैली और.',
          hint: 'यदि पहचान में कठिनाई हो तो **कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_XX_011 श्रृंखला)** के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है — **कठिन तत्सम शब्दों की पहचान करना** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'भाषा-प्रयोग का अर्थ है किसी पाठ में लेखक द्वारा शब्दों, वाक्य-रचना, शैली और व्याकरणिक',
                  options: ['भाषा-प्रयोग का अर्थ है किसी पाठ में लेखक द्वारा शब्दों, वाक्य-रचना, शैली और व्याकरणिक', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश से है जिसमें', 'कथानक (कथावस्तु) किसी रचना में घटनाओं का **तार्किक और कारणात्मक क्रम** है जो संघर्ष', 'पाठ्य-परिवेश (Setting) कहानी के भौतिक स्थान, समय अवधि और सामाजिक-सांस्कृतिक पृष्ठभूमि को'],
                  hint: 'यदि पहचान में कठिनाई हो तो **कक्षा 6 के व्याकरण अभ्यास (c6_hin_cbse_XX_011 श्रृंखला)** के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पाठ में भाषा-प्रयोग" का अर्थ है — **कठिन तत्सम शब्दों की पहचान करना** या **व्याकरण की त्रुटियाँ.' }
          ],
            remediations: { '6': { steps: ['**पहला कदम:** छात्र से पूछें — "अगर तुम अपने दोस्त से बात करो और प्रिंसिपल से, तो भाषा एक-सी होगी?', 'क्यों?" — वास्तविक जीवन से जोड़ें। 2.', '**दूसरा कदम:** पाठ 8 का एक संवाद-अंश दें और कहें — "इसे प्रिंसिपल को लिखे पत्र में बदलो। क्या-क्या बदलेगा?', 'सूची बनाओ।" — तुलनात्मक विश्लेषण करवाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective questions) test direct factual recall from the.',
          hint: 'Review c7_hin_cbse_08_006 (मुख्य विषय और संदेश) and c7_hin_cbse_08_004 (नायक.',
          misconception: 'Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they "feel" it\'s right.',
          parts: [
                { id: 'a', prompt: 'पाठ 8 से एक वस्तुनिष्ठ प्रश्न और एक आशय-सूचक प्रश्न बनाइए, और बताइए कि दूसरे प्रश्न का उत्तर देते समय आप किन दो पाठ्य-संकेतों (clues) को जोड़ेंगे?', answer: 'उदाहरण: वस्तुनिष्ठ',
                  options: ['उदाहरण: वस्तुनिष्ठ', 'opinion questions'],
                  hint: 'Review c7_hin_cbse_08_006 (मुख्य विषय और संदेश) and c7_hin_cbse_08_004 (नायक चरित्र-चित्रण) — these.',
                  misconception: 'Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they "feel" it\'s right.' },
                { id: 'b', prompt: 'नीचे दिए गए प्रश्न को पढ़कर बताइए: यह वस्तुनिष्ठ है या आशय-सूचक? कारण सहित उत्तर दीजिए। "लेखक ने शीर्षक \'अनदेखी डोर\' क्यों चुना होगा?"', answer: 'यह **आशय-सूचक प्रश्न** है। **चरण 1:** प्रश्न में "क्यों" है',
                  options: ['यह **आशय-सूचक प्रश्न** है। **चरण 1:** प्रश्न में "क्यों" है', 'opinion questions'],
                  hint: 'Review c7_hin_cbse_08_006 (मुख्य विषय और संदेश) and c7_hin_cbse_08_004 (नायक चरित्र-चित्रण) — these.',
                  misconception: 'Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they "feel" it\'s right.' },
                { id: 'c', prompt: 'पाठ 8 के दो प्रसंगों की तुलना कीजिए: एक जहाँ पात्र की बाह्य क्रिया (action) वर्णित है, और एक जहाँ उसकी आंतरिक मनोदशा (inner state) अंतर्निहित है। बताइए कि.', answer: 'प्रसंग 1 (बाह्य): "पात्र ने दरवाजा बंद किया और चुपचाप बैठ गया।"',
                  options: ['प्रसंग 1 (बाह्य): "पात्र ने दरवाजा बंद किया और चुपचाप बैठ गया।"', 'opinion questions'],
                  hint: 'Review c7_hin_cbse_08_006 (मुख्य विषय और संदेश) and c7_hin_cbse_08_004 (नायक चरित्र-चित्रण) — these.',
                  misconception: 'Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they "feel" it\'s right.' }
          ],
            remediations: { 'questions-are-opinion-questions-where': { steps: ['Give the student a 3-column table: Column A = Textual Clue (quote/paraphrase), Column B = What it literally says.', 'Practice with a familiar story (e.g., Panchatantra): "The lion didn\'t eat the mouse — Column A: \'लक्ष्मण ने चूहे को.', 'Have them convert Column C into a PEEL answer.', 'Only then return to Chapter 8 text — the structure transfers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_08_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they "feel" it\'s right.',
          parts: [
                { id: 'a', prompt: 'पाठ 8 के किसी एक पात्र के लिए एक नया आशय-सूचक प्रश्न बनाइए जिसका उत्तर पाठ में *नहीं* है, लेकिन पाठ्य-साक्ष्यों से तर्कसंगत निकाला जा सके। प्रश्न और उसका.', answer: '**प्रश्न:** "क्या पात्र अंत में अपने निर्णय से संतुष्ट होगा?',
                  options: ['**प्रश्न:** "क्या पात्र अंत में अपने निर्णय से संतुष्ट होगा?', 'opinion questions'],
                  hint: 'Review c7_hin_cbse_08_006 (मुख्य विषय और संदेश) and c7_hin_cbse_08_004 (नायक चरित्र-चित्रण) — these.',
                  misconception: 'Students believe आशय-सूचक questions are "opinion questions" where any answer is acceptable if they "feel" it\'s right.' }
          ],
            remediations: { 'questions-are-opinion-questions-where': { steps: ['Give the student a 3-column table: Column A = Textual Clue (quote/paraphrase), Column B = What it literally says.', 'Practice with a familiar story (e.g., Panchatantra): "The lion didn\'t eat the mouse — Column A: \'लक्ष्मण ने चूहे को.', 'Have them convert Column C into a PEEL answer.', 'Only then return to Chapter 8 text — the structure transfers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
