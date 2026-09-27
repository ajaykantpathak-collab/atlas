import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch04_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'यह नोड केवल मैथिलीशरण गुप्त के जीवन परिचय, द्विवेदी युग की प्रमुख विशेषताओं (खड़ी बोली का.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c9_hin_ga_ch04'],
    nodeIds: ['c9_hin_ga_cbse_04_001', 'c9_hin_ga_cbse_04_002', 'c9_hin_ga_cbse_04_003', 'c9_hin_ga_cbse_04_004', 'c9_hin_ga_cbse_04_005', 'c9_hin_ga_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'कल्पना कीजिए आप एक जासूस हैं जिसे एक पुराना पत्र (पाठ 4) मिला है, लेकिन पत्र की भाषा थोड़ी पुरानी और औपचारिक.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता है, जबकि रचनाकार परिचय लेखक के जीवन दर्शन, साहित्यिक योगदान और युगीन प्रभावों का संक्षिप्त विवरण होता है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें.', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_001', difficulty: 'standard',
          question: 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक.',
          hint: 'यदि फंसे हों तो कक्षा 8 की हिंदी पुस्तक (वसंत/भारत की खोज) के \'आधुनिक काल और खड़ी बोली का.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में 1-2 अंकों के वस्तुनिष्ठ प्रश्नों (जैसे जन्म.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता',
                  options: ['पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें', 'पात्र-चित्रण एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें नायक/प्रमुख पात्र के बाह्य रूप,'],
                  hint: 'यदि फंसे हों तो कक्षा 8 की हिंदी पुस्तक (वसंत/भारत की खोज) के \'आधुनिक काल और खड़ी बोली का विकास\'.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में 1-2 अंकों के वस्तुनिष्ठ प्रश्नों (जैसे जन्म तिथि, प्रसिद्ध रचनाएं).' }
          ],
            remediations: { '1-2': { steps: ['चरण 1: छात्र से पूछें — "यदि आज से 100 साल बाद कोई तुम्हारी व्हाट्सएप चैट पढ़ेगा, तो क्या वह तुम्हारे \'LOL\', \'BRB\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_002', difficulty: 'standard',
          question: 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें.',
          hint: 'यदि अटकें तो कक्षा 8 की कहानी "बस की यात्रा" या "दीवानों की हस्ती" लेकर कथानक के पाँच.',
          misconception: 'छात्र समझते हैं कि "कालक्रम भंग" (Non-linear narrative) केवल फ्लैशबैक है, जबकि इसमें समानांतर कथाएँ (Parallel.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,',
                  options: ['कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें', 'पात्र-चित्रण एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें नायक/प्रमुख पात्र के बाह्य रूप,'],
                  hint: 'यदि अटकें तो कक्षा 8 की कहानी "बस की यात्रा" या "दीवानों की हस्ती" लेकर कथानक के पाँच सोपान पहचानने.',
                  misconception: 'छात्र समझते हैं कि "कालक्रम भंग" (Non-linear narrative) केवल फ्लैशबैक है, जबकि इसमें समानांतर कथाएँ (Parallel narratives), पत्र-शैली.' }
          ],
            remediations: { 'non-linear-narrative': { steps: ['चरण 1: छात्र को एक छोटा अंश (100 शब्द) दें जिसमें केवल फ्लैशबैक हो; उससे युक्ति नाम और प्रभाव पूछें। चरण 2: दूसरा अंश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा.',
          hint: 'यदि घटनाओं का क्रम स्पष्ट नहीं है, तो नोड 002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह.',
          misconception: 'छात्र अक्सर **\'पृष्ठभूमि\' (Background)** और **\'परिवेश\' (Setting/Milieu)** को एक ही समझ लेते हैं। वे लिखते हैं: "कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें',
                  options: ['पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पात्र-चित्रण एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें नायक/प्रमुख पात्र के बाह्य रूप,'],
                  hint: 'यदि घटनाओं का क्रम स्पष्ट नहीं है, तो नोड 002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह चार्ट\' को.',
                  misconception: 'छात्र अक्सर **\'पृष्ठभूमि\' (Background)** और **\'परिवेश\' (Setting/Milieu)** को एक ही समझ लेते हैं। वे लिखते हैं: "कहानी गाँव में घटती है.' }
          ],
            remediations: { 'background-setting-milieu': { steps: ['**पुनर्पाठ (Re-read) कराएँ:** पाठ का कोई एक छोटा अंश (5-6 पंक्तियाँ) दें जहाँ केवल स्थान नहीं, सामाजिक नियम दिख रहे.', '**तुलना चार्ट बनवाएँ:** दो कॉलम — "केवल स्थान" vs "पूरा परिवेश"। छात्र स्वयं पाठ से उदाहरण भरें (जैसे: स्थान = कुआँ.', '**\'क्या होता यदि?\' खेलें:** "अगर यह कहानी शहर के फ्लैट में घटती तो नायक का निर्णय कैसे बदलता?" — इससे परिवेश के.', '**बोर्ड-शैली प्रश्न दें:** "पाठ के परिवेश ने नायक की नियति कैसे तय की?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें नायक/प्रमुख पात्र के.',
          hint: 'यदि फँसें तो **नोड 002 (कथानक)** दोबारा पढ़ें — नायक के कार्य कथानक की घटनाओं में ही छिपे.',
          misconception: 'छात्र मानते हैं कि पात्र-चित्रण = नायक के \'अच्छे गुणों की सूची\' (दयालु, बहादुर, ईमानदार)। वे पाठ से **विशिष्ट प्रसंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें नायक/प्रमुख पात्र के बाह्य रूप,',
                  options: ['पात्र-चित्रण एक साहित्यिक विश्लेषण प्रक्रिया है जिसमें नायक/प्रमुख पात्र के बाह्य रूप,', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि फँसें तो **नोड 002 (कथानक)** दोबारा पढ़ें — नायक के कार्य कथानक की घटनाओं में ही छिपे होते हैं।',
                  misconception: 'छात्र मानते हैं कि पात्र-चित्रण = नायक के \'अच्छे गुणों की सूची\' (दयालु, बहादुर, ईमानदार)। वे पाठ से **विशिष्ट प्रसंग उद्धृत नहीं करते**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ खोलो, नायक से जुड़े **पाँच प्रसंग** पेंसिल से घेरो।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यहाँ नायक ने क्या **किया/कहा/सोचा**?" 3.', 'फिर पूछें: "इस हरकत से उसके **कौन-से गुण** का पता चलता है?" — गुण को प्रसंग के साथ तीर से जोड़ें। 4.', 'अंत में कहें: "अब इन्हीं तीरों को वाक्यों में बदलो — यही तुम्हारा पात्र-चित्रण है।" (यह प्रक्रिया \'गुण पहले, प्रमाण बाद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटका हुआ महसूस हो, तो c9_hin_ga_cbse_04_004 (नायक/प्रमुख पात्र) पर वापस जाएँ और नायक.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि "सहायक पात्र = कम बोलने वाला / कम दृश्यों वाला / नायक का दोस्त/सेवक".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'यदि अटका हुआ महसूस हो, तो c9_hin_ga_cbse_04_004 (नायक/प्रमुख पात्र) पर वापस जाएँ और नायक का.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि "सहायक पात्र = कम बोलने वाला / कम दृश्यों वाला / नायक का दोस्त/सेवक" — यानी वे **उपस्थिति.' }
          ],
            remediations: { 'presence-screen-time-relationship-label': { steps: ['**पुनर्परिभाषित करें (Re-define):** विद्यार्थी से कहें: "भूल जाओ कि पात्र \'कौन है\' (नाम, संबंध, रूप)। केवल यह बताओ.', '**फंक्शन-कार्ड बनाएँ (Function Cards):** 5 कार्ड बनाएँ: FOIL, CATALYST, CONFIDANT, SYMBOL, COMIC RELIEF। प्रत्येक कार्ड.', '**PEEL का अभ्यास:** एक कमजोर उत्तर दें (जैसे: "श्याम अच्छा दोस्त है क्योंकि वह मदद करता है") — विद्यार्थी से कहें: "इसे.', '**तुलनात्मक अभ्यास:** दो सहायक पात्रों (एक फॉइल, एक कॉन्फिडेंट) की तुलना करने वाला 50-शब्दी अनुच्छेद लिखवाएँ — केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो संपूर्ण रचना में.',
          hint: 'अगर अटके तो **c9_hin_ga_cbse_04_002 (कथानक संरचना)** और **c9_hin_ga_cbse_04_004 (नायक.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (Plot Summary) या \'लेखक का उद्देश्य\' (Author\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो संपूर्ण रचना में व्याप्त',
                  options: ['मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जो संपूर्ण रचना में व्याप्त', 'पृष्ठभूमि किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक संदर्भ होता', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम से बंधा तार्किक क्रम है जिसमें आरंभ,', 'पाठ्य-परिवेश (Setting/Context) किसी रचना में घटनाओं के घटित होने का समग्र ढाँचा है जिसमें'],
                  hint: 'अगर अटके तो **c9_hin_ga_cbse_04_002 (कथानक संरचना)** और **c9_hin_ga_cbse_04_004 (नायक चित्रण)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (Plot Summary) या \'लेखक का उद्देश्य\' (Author\'s Purpose) मान लेते हैं**।.' }
          ],
            remediations: { 'plot-summary-author-s-purpose': { steps: ['**चरण 1:** छात्र से कहें: "पाठ की 5 बड़ी घटनाएँ बुलेट पॉइंट में लिखो।" (यह Plot निकालता है।) 2.', '**चरण 2:** पूछें: "इन पाँचों में कौन-सी एक बात **कॉमन** है?', 'एक शब्द/वाक्यांश में बताओ।" (यह Theme की ओर ले जाता है।) 3.', '**चरण 3:** कहें: "अब उस एक शब्द को लेकर पूरा वाक्य बनाओ: \'यह पाठ ______ के बारे में है\'।" (यह Theme Statement बनाता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
