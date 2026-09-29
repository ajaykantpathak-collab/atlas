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

    scenario: { role: 'a class 9 learner', intro: 'पहले रचनाकार: महात्मा गांधी (आत्मकथा)। फिर काल। फिर \'साँवले सपनों की याद\' का संदर्भ — गांधी का बचपन — सत्य और.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'साँवले सपनों की याद\' महात्मा गांधी (आत्मकथा) द्वारा रचित आत्मकथा है। रचनाकार का जीवन, काल और साहित्यिक परिवेश पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — \'साँवले सपनों की याद\' का कथानक — गांधी की आत्मकथा से अंश — बचपन की यादें, सत्य के प्रति.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — \'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.', answer: '4 -', options: ['4 -', '4 -'] }
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
          question: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय — \'साँवले सपनों की याद\' महात्मा गांधी.',
          hint: 'यदि फंसे हों तो कक्षा 8 की हिंदी पुस्तक (वसंत/भारत की खोज) के \'आधुनिक काल और खड़ी बोली का.',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में 1-2 अंकों के वस्तुनिष्ठ प्रश्नों (जैसे जन्म.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)', '\'साँवले सपनों की याद\' का पात्र-चित्रण'],
                  hint: 'यदि फंसे हों तो कक्षा 8 की हिंदी पुस्तक (वसंत/भारत की खोज) के \'आधुनिक काल और खड़ी बोली का विकास\'.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में 1-2 अंकों के वस्तुनिष्ठ प्रश्नों (जैसे जन्म तिथि, प्रसिद्ध रचनाएं).' }
          ],
            remediations: { '1-2': { steps: ['चरण 1: छात्र से पूछें — "यदि आज से 100 साल बाद कोई तुम्हारी व्हाट्सएप चैट पढ़ेगा, तो क्या वह तुम्हारे \'LOL\', \'BRB\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_002', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' का कथानक — गांधी की आत्मकथा से अंश — बचपन की यादें, सत्य.',
          hint: 'यदि अटकें तो कक्षा 8 की कहानी "बस की यात्रा" या "दीवानों की हस्ती" लेकर कथानक के पाँच.',
          misconception: 'छात्र समझते हैं कि "कालक्रम भंग" (Non-linear narrative) केवल फ्लैशबैक है, जबकि इसमें समानांतर कथाएँ (Parallel.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' का कथानक',
                  options: ['\'साँवले सपनों की याद\' का कथानक', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)', '\'साँवले सपनों की याद\' का पात्र-चित्रण'],
                  hint: 'यदि अटकें तो कक्षा 8 की कहानी "बस की यात्रा" या "दीवानों की हस्ती" लेकर कथानक के पाँच सोपान पहचानने.',
                  misconception: 'छात्र समझते हैं कि "कालक्रम भंग" (Non-linear narrative) केवल फ्लैशबैक है, जबकि इसमें समानांतर कथाएँ (Parallel narratives), पत्र-शैली.' }
          ],
            remediations: { 'non-linear-narrative': { steps: ['चरण 1: छात्र को एक छोटा अंश (100 शब्द) दें जिसमें केवल फ्लैशबैक हो; उससे युक्ति नाम और प्रभाव पूछें। चरण 2: दूसरा अंश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_003', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि घटनाओं का क्रम स्पष्ट नहीं है, तो नोड 002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह.',
          misconception: 'छात्र अक्सर **\'पृष्ठभूमि\' (Background)** और **\'परिवेश\' (Setting/Milieu)** को एक ही समझ लेते हैं। वे लिखते हैं: "कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)',
                  options: ['\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पात्र-चित्रण'],
                  hint: 'यदि घटनाओं का क्रम स्पष्ट नहीं है, तो नोड 002 (कथानक और आख्यान-संरचना) के \'घटना-प्रवाह चार्ट\' को.',
                  misconception: 'छात्र अक्सर **\'पृष्ठभूमि\' (Background)** और **\'परिवेश\' (Setting/Milieu)** को एक ही समझ लेते हैं। वे लिखते हैं: "कहानी गाँव में घटती है.' }
          ],
            remediations: { 'background-setting-milieu': { steps: ['**पुनर्पाठ (Re-read) कराएँ:** पाठ का कोई एक छोटा अंश (5-6 पंक्तियाँ) दें जहाँ केवल स्थान नहीं, सामाजिक नियम दिख रहे.', '**तुलना चार्ट बनवाएँ:** दो कॉलम — "केवल स्थान" vs "पूरा परिवेश"। छात्र स्वयं पाठ से उदाहरण भरें (जैसे: स्थान = कुआँ.', '**\'क्या होता यदि?\' खेलें:** "अगर यह कहानी शहर के फ्लैट में घटती तो नायक का निर्णय कैसे बदलता?" — इससे परिवेश के.', '**बोर्ड-शैली प्रश्न दें:** "पाठ के परिवेश ने नायक की नियति कैसे तय की?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_004', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँसें तो **नोड 002 (कथानक)** दोबारा पढ़ें — नायक के कार्य कथानक की घटनाओं में ही छिपे.',
          misconception: 'छात्र मानते हैं कि पात्र-चित्रण = नायक के \'अच्छे गुणों की सूची\' (दयालु, बहादुर, ईमानदार)। वे पाठ से **विशिष्ट प्रसंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' का पात्र-चित्रण',
                  options: ['\'साँवले सपनों की याद\' का पात्र-चित्रण', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **नोड 002 (कथानक)** दोबारा पढ़ें — नायक के कार्य कथानक की घटनाओं में ही छिपे होते हैं।',
                  misconception: 'छात्र मानते हैं कि पात्र-चित्रण = नायक के \'अच्छे गुणों की सूची\' (दयालु, बहादुर, ईमानदार)। वे पाठ से **विशिष्ट प्रसंग उद्धृत नहीं करते**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ खोलो, नायक से जुड़े **पाँच प्रसंग** पेंसिल से घेरो।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यहाँ नायक ने क्या **किया/कहा/सोचा**?" 3.', 'फिर पूछें: "इस हरकत से उसके **कौन-से गुण** का पता चलता है?" — गुण को प्रसंग के साथ तीर से जोड़ें। 4.', 'अंत में कहें: "अब इन्हीं तीरों को वाक्यों में बदलो — यही तुम्हारा पात्र-चित्रण है।" (यह प्रक्रिया \'गुण पहले, प्रमाण बाद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_005', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटका हुआ महसूस हो, तो c9_hin_ga_cbse_04_004 (नायक/प्रमुख पात्र) पर वापस जाएँ और नायक.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि "सहायक पात्र = कम बोलने वाला / कम दृश्यों वाला / नायक का दोस्त/सेवक".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' के सहायक पात्र',
                  options: ['\'साँवले सपनों की याद\' के सहायक पात्र', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो c9_hin_ga_cbse_04_004 (नायक/प्रमुख पात्र) पर वापस जाएँ और नायक का.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि "सहायक पात्र = कम बोलने वाला / कम दृश्यों वाला / नायक का दोस्त/सेवक" — यानी वे **उपस्थिति.' }
          ],
            remediations: { 'presence-screen-time-relationship-label': { steps: ['**पुनर्परिभाषित करें (Re-define):** विद्यार्थी से कहें: "भूल जाओ कि पात्र \'कौन है\' (नाम, संबंध, रूप)। केवल यह बताओ.', '**फंक्शन-कार्ड बनाएँ (Function Cards):** 5 कार्ड बनाएँ: FOIL, CATALYST, CONFIDANT, SYMBOL, COMIC RELIEF। प्रत्येक कार्ड.', '**PEEL का अभ्यास:** एक कमजोर उत्तर दें (जैसे: "श्याम अच्छा दोस्त है क्योंकि वह मदद करता है") — विद्यार्थी से कहें: "इसे.', '**तुलनात्मक अभ्यास:** दो सहायक पात्रों (एक फॉइल, एक कॉन्फिडेंट) की तुलना करने वाला 50-शब्दी अनुच्छेद लिखवाएँ — केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_04_006', difficulty: 'standard',
          question: '\'साँवले सपनों की याद\' का मुख्य विषय — गांधी का बचपन — सत्य और प्रयोग की सीख',
          hint: 'अगर अटके तो **c9_hin_ga_cbse_04_002 (कथानक संरचना)** और **c9_hin_ga_cbse_04_004 (नायक.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (Plot Summary) या \'लेखक का उद्देश्य\' (Author\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँवले सपनों की याद\' का मुख्य विषय',
                  options: ['\'साँवले सपनों की याद\' का मुख्य विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'साँवले सपनों की याद\' का कथानक', '\'साँवले सपनों की याद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो **c9_hin_ga_cbse_04_002 (कथानक संरचना)** और **c9_hin_ga_cbse_04_004 (नायक चित्रण)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (Plot Summary) या \'लेखक का उद्देश्य\' (Author\'s Purpose) मान लेते हैं**।.' }
          ],
            remediations: { 'plot-summary-author-s-purpose': { steps: ['**चरण 1:** छात्र से कहें: "पाठ की 5 बड़ी घटनाएँ बुलेट पॉइंट में लिखो।" (यह Plot निकालता है।) 2.', '**चरण 2:** पूछें: "इन पाँचों में कौन-सी एक बात **कॉमन** है?', 'एक शब्द/वाक्यांश में बताओ।" (यह Theme की ओर ले जाता है।) 3.', '**चरण 3:** कहें: "अब उस एक शब्द को लेकर पूरा वाक्य बनाओ: \'यह पाठ ______ के बारे में है\'।" (यह Theme Statement बनाता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
