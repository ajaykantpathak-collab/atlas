import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch14_p2: SimDef = {
    id: 'v3_c10_hin_kr_ch14_p2',
    title: 'जॉर्ज पंचम की नाक · Part 2/3',
    subtitle: 'इस नोड में गौण विषय की पहचान, उनके पाठ में स्थान, और मुख्य विषय के साथ संबंध समझाया जाता.',
    classLevel: 10, subject: 'hin_kr', topic: 'जॉर्ज पंचम की नाक · Part 2/3',
    chapters: ['c10_hin_kr_ch14'],
    nodeIds: ['c10_hin_kr_cbse_14_007', 'c10_hin_kr_cbse_14_008', 'c10_hin_kr_cbse_14_009', 'c10_hin_kr_cbse_14_010', 'c10_hin_kr_cbse_14_011', 'c10_hin_kr_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल आपने अपनी कक्षा में किसी दोस्त की कहानी सुनी जहां मुख्य घटना परीक्षा में पास होना था, लेकिन कहानी में.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय वह अंतर्निहित विचार या संदेश होता है जो मुख्य विषय को समर्थन देता है, लेकिन कहानी के केंद्रीय बिंदु नहीं होता। यह पात्रों के व्यवहार, घटनाओं या संवादों के माध्यम से सूक्ष्म रूप से प्रकट होता.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_kr_cbse_14_008', title: 'Identify each idea',
          dissect: { specimen: 'जॉर्ज पंचम की नाक · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अध्ययन लेखक द्वारा प्रयुक्त व्याकरणिक संरचनाओं — जैसे काल (tense).', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ (Objective) प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through जॉर्ज पंचम की नाक like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? जॉर्ज पंचम की नाक · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जॉर्ज पंचम की नाक · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_007', difficulty: 'standard',
          question: 'गौण विषय वह अंतर्निहित विचार या संदेश होता है जो मुख्य विषय को समर्थन देता है.',
          hint: 'यदि फंसे हों तो नोड 006 (मुख्य विषय और संदेश) की समीक्षा करें।',
          misconception: 'छात्र spesso गौण विषय को मुख्य विषय से अलग नहीं कर पाते और किसी भी पात्र के発言 या घटना को मुख्य विषय मान लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह अंतर्निहित विचार या संदेश होता है जो मुख्य विषय को समर्थन देता है, लेकिन',
                  options: ['गौण विषय वह अंतर्निहित विचार या संदेश होता है जो मुख्य विषय को समर्थन देता है, लेकिन', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि फंसे हों तो नोड 006 (मुख्य विषय और संदेश) की समीक्षा करें।',
                  misconception: 'छात्र spesso गौण विषय को मुख्य विषय से अलग नहीं कर पाते और किसी भी पात्र के発言 या घटना को मुख्य विषय मान लेते हैं। उदाहरण: वे राजा की नाक.' }
          ],
            remediations: { 'spesso': { steps: ['1) छात्र से पूछें: \'इस घटना का पाठ के समग्र संदेश से क्या संबंध है?\' 2) यदि उत्तर अस्पष्ट हो, तो उन्हें बताएं कि मुख्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की.',
          hint: 'यदि अटके तो c10_hin_kr_cbse_14_003 (परिवेश) और c10_hin_kr_cbse_14_006 (मुख्य विषय) दोबारा.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **रूपक और उपमा (Simile) को एक ही मान लेते हैं** क्योंकि दोनों तुलना करते हैं। वे पाठ में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों',
                  options: ['**बिंब (Imagery)** वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक की इंद्रियों', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि अटके तो c10_hin_kr_cbse_14_003 (परिवेश) और c10_hin_kr_cbse_14_006 (मुख्य विषय) दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **रूपक और उपमा (Simile) को एक ही मान लेते हैं** क्योंकि दोनों तुलना करते हैं। वे पाठ में "जैसे/वैसा/समान".' }
          ],
            remediations: { 'simile': { steps: ['**चरण 1 — भेद स्पष्ट करो:** छात्र को दो वाक्य देकर अंतर करवाओ: "वह शेर *जैसा* बहादुर है" (उपमा) बनाम "वह शेर *है*.', '**चरण 2 — इंद्रिय-चेकलिस्ट बनवाओ:** पाठ के किसी पैराग्राफ में पाँच कॉलम बनवाओ (देखना, सुनना, सूँघना, छूना, चखना) और हर.', '**चरण 3 — रूपक का \'गुण-मानचित्र\' (Quality Map) बनवाओ:** रूपक वाले वाक्य में उपमेय और उपमान के बीच तीर खींचकर गुण लिखवाओ.', '**चरण 4 — बोर्ड-शैली उत्तर लिखवाओ:** "रूपक: X = Y। आरोपित गुण: 1, 2, 3। प्रभाव: Z।" इस टेम्पलेट पर तीन अभ्यास करवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्टया असंगत, विरोधी या.',
          hint: 'यदि अटके तो **c10_hin_kr_cbse_14_008 (बिंब और रूपक)** के \'बहु-अर्थी बिंब विश्लेषण\' चरण को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **विरोधाभास-अलंकार (Oxymoron)** समझ लेते हैं और दोनों को एक मानकर "दो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्टया असंगत, विरोधी या असंभव',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो प्रथम दृष्टया असंगत, विरोधी या असंभव', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि अटके तो **c10_hin_kr_cbse_14_008 (बिंब और रूपक)** के \'बहु-अर्थी बिंब विश्लेषण\' चरण को दोहराएं.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **विरोधाभास-अलंकार (Oxymoron)** समझ लेते हैं और दोनों को एक मानकर "दो विरोधी शब्दों का मेल".' }
          ],
            remediations: { 'oxymoron': { steps: ['**चरणबद्ध उपचार:** (1) **स्पष्ट भेद बताएं:** बोर्ड पर "विरोधाभास-अलंकार" (Oxymoron) और "विरोधाभास-युक्ति" (Paradox) का.', 'कहां केवल संकेत?" (3) **पाठ-आधारित अभ्यास:** पाठ 2 से 3-3 उदाहरण निकालकर वर्गीकृत करवाएं: विरोधाभास-युक्ति / प्रतीक।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द किसी पाठ के उन **चयनित शब्दों/पदों** को कहते हैं जो पाठ के.',
          hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (c10_hin_kr_cbse_14_006)** नोड पर लौटें — वहां से.',
          misconception: '**विशिष्ट भ्रांति:** *"मुख्य शब्द वही हैं जो पाठ में **कठिन/अनजान** लगते हैं, या जिनका अर्थ शब्दकोश से ढूंढना पड़े।"*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द किसी पाठ के उन **चयनित शब्दों/पदों** को कहते हैं जो पाठ के **केंद्रीय',
                  options: ['पदावली: मुख्य शब्द किसी पाठ के उन **चयनित शब्दों/पदों** को कहते हैं जो पाठ के **केंद्रीय', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (c10_hin_kr_cbse_14_006)** नोड पर लौटें — वहां से व्यंग्य के.',
                  misconception: '**विशिष्ट भ्रांति:** *"मुख्य शब्द वही हैं जो पाठ में **कठिन/अनजान** लगते हैं, या जिनका अर्थ शब्दकोश से ढूंढना पड़े।"* **वास्तविकता:** बोर्ड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पाठ से 5 वाक्य निकालें** जिनमें \'नाक\', \'मूर्ति\', \'सेक्रेटरी\', \'इंडिया गेट\', \'पत्थर\' आए हों — उन्हें अलग कागज पर.', '**प्रत्येक वाक्य के नीचे तीन कॉलम बनाएं:** (क) शब्दकोश अर्थ, (ख) इस वाक्य में अर्थ, (ग) लेखक का इरादा/व्यंग्य। 3.', '**शिक्षक/सहपाठी के साथ चर्चा करें:** "क्या \'नाक\' का अर्थ यहां \'सूंघने वाला अंग\' है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अध्ययन लेखक द्वारा प्रयुक्त व्याकरणिक संरचनाओं — जैसे.',
          hint: 'यदि अटके तो कक्षा 9 की \'हिंदी व्याकरण\' पुस्तक के \'वाक्य विचार\' और \'काल-वाच्य\' अध्याय.',
          misconception: 'छात्र समझते हैं कि \'व्याकरण विश्लेषण\' का अर्थ केवल परिभाषाएँ रटना है (जैसे \'भूतकाल वह काल है जो...\') और परीक्षा में वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अध्ययन लेखक द्वारा प्रयुक्त व्याकरणिक संरचनाओं',
                  options: ['पाठ में भाषा-प्रयोग का अध्ययन लेखक द्वारा प्रयुक्त व्याकरणिक संरचनाओं', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'यदि अटके तो कक्षा 9 की \'हिंदी व्याकरण\' पुस्तक के \'वाक्य विचार\' और \'काल-वाच्य\' अध्याय दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'व्याकरण विश्लेषण\' का अर्थ केवल परिभाषाएँ रटना है (जैसे \'भूतकाल वह काल है जो...\') और परीक्षा में वे परिभाषा लिखकर अंक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के 5-6 वाक्य देकर कहें: "प्रत्येक वाक्य का काल, वाच्य, वाक्य-भेद पहचानो — केवल नाम मत लिखो, नियम भी बताओ.', 'फिर पूछें: "यदि लेखक यहाँ कर्तृवाच्य लिख देता (\'किसी ने नाक काटी\') तो अर्थ/प्रभाव कैसे बदलता?" 3.', 'अंत में एक छोटा अंश दें और कहें: "इसे दो तरह से लिखो — एक वर्णन शैली में (लंबे वाक्य), एक संवाद शैली में (सरल वाक्य).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_14_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ (Objective) प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से.',
          hint: 'If stuck, re-read the chapter using the "active reading" method: pause after each.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर **अपनी कल्पना से** लिखना है" — इसलिए वे पाठ के बाहर के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ (Objective) प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता',
                  options: ['**वस्तुनिष्ठ (Objective) प्रश्न** वे होते हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता', 'पृष्ठभूमि और रचनाकार परिचय (Background and Author Introduction) is the systematic study', 'कथानक किसी कहानी की घटनाओं का क्रमबद्ध विवरण है, whereas आख्यान-संरचना वह रूपरेखा है', 'पाठ्य-परिवेश लेखक के जीवनकाल, ऐतिहासिक period, सामाजिक-आर्थिक स्थिति और literary परम्परा'],
                  hint: 'If stuck, re-read the chapter using the "active reading" method: pause after each paragraph and ask.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "आशय-सूचक प्रश्न का उत्तर **अपनी कल्पना से** लिखना है" — इसलिए वे पाठ के बाहर के तर्क (जैसे "पहाड़ पर.' }
          ],
            remediations: { 'cbse-2': { steps: ['**लक्षित उपचार (4 चरण):** 1.', '**प्रश्न-प्रकार पहचान अभ्यास:** छात्र को 10 मिश्रित प्रश्न दें; प्रत्येक के आगे "व" (वस्तुनिष्ठ) या "आ" (आशय-सूचक).', '**साक्ष्य-हाइलाइटिंग:** आशय-सूचक प्रश्न के लिए पाठ से 3 वाक्य हाइलाइट करवाएँ जो निष्कर्ष का आधार बनें। फिर कहें: "इन.', '**PEEL टेम्पलेट दें:** P (निष्कर्ष), E (उद्धरण), E (व्याख्या), L (प्रश्न से लिंक)। 5 प्रश्नों पर अभ्यास करवाएँ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
