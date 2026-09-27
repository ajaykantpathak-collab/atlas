import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch04_p2: SimDef = {
    id: 'v3_c11_hin_a_ch04_p2',
    title: 'पाठ 4 · Part 2/3',
    subtitle: 'इस नोड में केवल \'गौण विषय\' की पहचान, विश्लेषण और मुख्य विषय से संबंध समझाना शामिल है; यह.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 4 · Part 2/3',
    chapters: ['c11_hin_a_ch04'],
    nodeIds: ['c11_hin_a_cbse_04_007', 'c11_hin_a_cbse_04_008', 'c11_hin_a_cbse_04_009', 'c11_hin_a_cbse_04_010', 'c11_hin_a_cbse_04_011', 'c11_hin_a_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'मान लो तुमने हाल ही में कोई वेब सीरीज़ देखी जहाँ हीरो का मुख्य लक्ष्य IAS बनना है (मुख्य विषय), लेकिन साथ में.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को विस्तार, गहराई और यथार्थपरकता प्रदान करता है; यह स्वतंत्र नहीं होता, बल्कि मुख्य विषय की व्याख्या, पूरकता या.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — गौण', 'पाठ 4 — साहित्यिक', 'पाठ 4 — पदावली', 'पाठ 4 — व्याकरण', 'पाठ 4 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 2/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा **विषय, परिवेश, पात्रों की मनोदशा और.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न (Objective Questions):** वे प्रश्न जिनका उत्तर पाठ में स्पष्ट रूप से.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक.',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं, तो नोड 006 (मुख्य विषय और संदेश) पर लौटें — वहाँ दिए गए \'थीम.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि गौण विषय = \'कहानी में आए कोई भी छोटे-मोटे प्रसंग/घटनाएँ\' (जैसे: गाँव का मेला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं, तो नोड 006 (मुख्य विषय और संदेश) पर लौटें — वहाँ दिए गए \'थीम स्टेटमेंट.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि गौण विषय = \'कहानी में आए कोई भी छोटे-मोटे प्रसंग/घटनाएँ\' (जैसे: गाँव का मेला, बरसात का वर्णन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़वाएँ** केवल गौण विषय खोजने के लिए: छात्र को कहें — "पाठ को इस प्रश्न के साथ पढ़ो: \'यह प्रसंग मुख्य विषय.', '**T-चार्ट बनवाएँ**: बाएँ कॉलम में \'मुख्य विषय का कथन\', दाएँ में \'संबंधित प्रसंग/संवाद/घटना\' — फिर पूछो: "यह प्रसंग.', '**मॉडल उत्तर दिखाओ**: नोड 006 के मुख्य विषय से जुड़ा एक गौण विषय का PEEL उत्तर (ऊपर DIAGNOSTIC_ANSWER_3 जैसा) दिखाओ और.', '**फीडबैक लूप**: छात्र का लिखा PEEL जाँचो — यदि Link मुख्य विषय तक नहीं पहुँचता, तो पूछो: "यह गौण विषय मुख्य विषय से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_008', difficulty: 'standard',
          question: '**बिंब** शब्द की इंद्रियगत अनुभूति को जगाने वाली वह भाषा-शक्ति है जो पाठक के मन.',
          hint: 'यदि अटके तो **\'उपमा और रूपक का मूल भेद: साधर्म्य बनाम तादात्म्य\'** दोहराएँ — NCERT कक्षा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'रूपक\' और \'उपमा\' को केवल \'जैसे/वैसे\' के आधार पर अलग करते हैं** — यदि \'जैसे\' नहीं तो रूपक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब** शब्द की इंद्रियगत अनुभूति को जगाने वाली वह भाषा-शक्ति है जो पाठक के मन में मूर्त',
                  options: ['**बिंब** शब्द की इंद्रियगत अनुभूति को जगाने वाली वह भाषा-शक्ति है जो पाठक के मन में मूर्त', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि अटके तो **\'उपमा और रूपक का मूल भेद: साधर्म्य बनाम तादात्म्य\'** दोहराएँ — NCERT कक्षा 10.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'रूपक\' और \'उपमा\' को केवल \'जैसे/वैसे\' के आधार पर अलग करते हैं** — यदि \'जैसे\' नहीं तो रूपक, यदि \'जैसे\' तो उपमा।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को तीन वाक्य दें: (क) "वह शेर जैसा बहादुर है" (ख) "वह शेर है" (ग) "शेर दहाड़ा" — पूछें: प्रत्येक में.', '**चरण 2:** समझाएँ: (ख) में उपमेय \'वह\' + उपमान \'शेर\' + क्रिया \'है\' = **स्पष्ट रूपक**। (ग) में उपमेय **लुप्त** (प्रसंग से.', '**चरण 3:** अभ्यास: 5 पंक्तियाँ दें जहाँ उपमेय लुप्त हो — छात्र से उपमेय **पुनर्निर्मित** करवाएँ। 4.', '**चरण 4:** बोर्ड परीक्षा प्रश्न दिखाएँ: "रूपक की विशेषता बताइए" — आदर्श उत्तर में **\'सीधी पहचान\'** और **\'उपमेय की उपमान.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत या.',
          hint: 'यदि अटका लगे तो **c11_hin_a_cbse_04_008 (बिंब और रूपक)** के "कार्य-उदाहरण" पुनः पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **"विरोधाभासी स्थिति" (situational irony)** समझ लेते हैं — जैसे "अग्निशमन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत या आत्म-विरोधी',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत या आत्म-विरोधी', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि अटका लगे तो **c11_hin_a_cbse_04_008 (बिंब और रूपक)** के "कार्य-उदाहरण" पुनः पढ़ें — विशेषतः वह.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **विरोधाभास** को **"विरोधाभासी स्थिति" (situational irony)** समझ लेते हैं — जैसे "अग्निशमन गाड़ी में आग लग.' }
          ],
            remediations: { 'situational-irony-paradox-verbal-device': { steps: ['**चरण 1 — पुनर्परिभाषित करें:** छात्र से कहें — "विरोधाभास को **\'सत्य का छलावा\'** और प्रतीक को **\'अर्थ का पात्र\'**.', '(ख) "हार" और "जीत" यहाँ प्रतीक हैं या नहीं?', '— इससे **भेद स्पष्ट** होगा। **चरण 3 — पाठ-वापसी:** पाठ के जिस अंश में कठिनाई हुई, वहाँ **पेंसिल से तीन घेरे** बनवाएँ.', 'क्या प्रतीक के तीन स्तर दिखे?" — इससे **मेटाकॉग्निशन** सक्रिय होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द refers to the curated set of semantically dense.',
          hint: 'यदि अटके तो **"संकेतार्थ बनाम कोशीय अर्थ" (Connotation vs Denotation)** की अवधारणा को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "मुख्य शब्द" का अर्थ है **"पाठ में आए कठिन/अपरिचित शब्द जिनके अर्थ शब्दकोश में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द refers to the curated set of semantically dense, contextually pivotal,',
                  options: ['पदावली: मुख्य शब्द refers to the curated set of semantically dense, contextually pivotal,', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि अटके तो **"संकेतार्थ बनाम कोशीय अर्थ" (Connotation vs Denotation)** की अवधारणा को कक्षा 10 के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "मुख्य शब्द" का अर्थ है **"पाठ में आए कठिन/अपरिचित शब्द जिनके अर्थ शब्दकोश में ढूँढ़ने हैं"**। वे.' }
          ],
            remediations: { '10-vocabulary-dictionary-meaning': { steps: ['**चरण 1 (तत्काल निदान):** छात्र से कहें: *"पाठ से कोई 3 शब्द चुनो जो तुम्हें \'महत्वपूर्ण\' लगते हैं। अब प्रत्येक के लिए.', 'पात्र की आवाज़?"* **चरण 3 (संवृद्धि):** छात्र से कहें: *"घर/मोहल्ले में सुने किन्हीं 3 बोलचाल के शब्द (जैसे \'भैया\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा **विषय, परिवेश, पात्रों की मनोदशा.',
          hint: 'यदि फँसें तो **कक्षा 10 हिंदी व्याकरण: शब्द-भेद, वाक्य-भेद, अलंकार** और **पाठ 4 पदावली.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'कठिन/संस्कृतनिष्ठ/तत्सम शब्दों का अधिक प्रयोग = अच्छी/साहित्यिक भाषा\'**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा **विषय, परिवेश, पात्रों की मनोदशा और',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है रचनाकार द्वारा **विषय, परिवेश, पात्रों की मनोदशा और', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि फँसें तो **कक्षा 10 हिंदी व्याकरण: शब्द-भेद, वाक्य-भेद, अलंकार** और **पाठ 4 पदावली नोड.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'कठिन/संस्कृतनिष्ठ/तत्सम शब्दों का अधिक प्रयोग = अच्छी/साहित्यिक भाषा\'**। **गलत तर्क:** वे पाठ 4 में.' }
          ],
            remediations: { '4': { steps: ['**पहला कदम:** छात्र से कहें — "पाठ 4 के किसी एक पृष्ठ पर **लाल पेन से केवल तत्सम शब्द** घेरें, **नीले पेन से केवल.', '**दूसरा कदम:** पूछें — "जहाँ तत्सम अधिक हैं, वहाँ प्रसंग/पात्र/मनोदशा क्या है?', 'जहाँ तद्भव अधिक हैं, वहाँ क्या है?" छात्र स्वयं **पैटर्न (pattern)** देखेगा। 3.', '**तीसरा कदम:** बोर्ड परीक्षा का एक **विगत-वर्ष प्रश्न (PYQ)** दें जिसमें भाषा-प्रभाव पूछा गया हो — छात्र को **PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_04_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न (Objective Questions):** वे प्रश्न जिनका उत्तर पाठ में.',
          hint: 'यदि फँस जाएँ तो **नोड 008 (बिंब-रूपक) और नोड 009 (विरोधाभास-प्रतीक)** को दोबारा पढ़ें और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्न\' का उत्तर \'अपनी कल्पना से\' या \'सामान्य ज्ञान से\' लिखा जाता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न (Objective Questions):** वे प्रश्न जिनका उत्तर पाठ में स्पष्ट रूप से',
                  options: ['**वस्तुनिष्ठ प्रश्न (Objective Questions):** वे प्रश्न जिनका उत्तर पाठ में स्पष्ट रूप से', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक एवं राजनीतिक परिवेश से है', 'कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य परक क्रम है जो संघर्ष (conflict) से प्रारंभ', 'पाठ्य-परिवेश और वातावरण (Setting and Atmosphere) किसी रचना में कथानक घटित होने का समग्र'],
                  hint: 'यदि फँस जाएँ तो **नोड 008 (बिंब-रूपक) और नोड 009 (विरोधाभास-प्रतीक)** को दोबारा पढ़ें और पाठ 4 में.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्न\' का उत्तर \'अपनी कल्पना से\' या \'सामान्य ज्ञान से\' लिखा जाता है**, क्योंकि प्रश्न.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अंतर स्पष्ट करें:** छात्र को दो प्रश्न दें — एक वस्तुनिष्ठ ("पात्र का नाम?"), एक आशय-सूचक ("पात्र ने चुप्पी.', 'दूसरे का उत्तर पाठ की किस लाइन में **नहीं** मिला, लेकिन किस लाइन से **संकेत** मिला?" 2.', '**चरण 2 — \'आशय\' शब्द को परिभाषित करें:** लिखवाएँ — "आशय = लेखक का वह इरादा/भाव जो शब्दों के **पीछे** छिपा है, शब्दों.', '**चरण 3 — अभ्यास कराएँ:** पाठ 4 के 3 छोटे अंश दें, प्रत्येक पर एक आशय-सूचक प्रश्न बनवाएँ और **साक्ष्य सहित उत्तर**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
