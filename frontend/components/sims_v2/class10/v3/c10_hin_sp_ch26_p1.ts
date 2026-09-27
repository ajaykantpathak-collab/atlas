import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch26_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch26_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch26_p1',
    title: 'तीसरी कसम के शल्पिकार शैलेंद्र · Part 1/3',
    subtitle: 'यह नोड केवल पाठ की **पृष्ठभूमि (रेणु की कहानी, फिल्म का निर्माण)**, **रचनाकार परिचय.',
    classLevel: 10, subject: 'hin_sp', topic: 'तीसरी कसम के शल्पिकार शैलेंद्र · Part 1/3',
    chapters: ['c10_hin_sp_ch26'],
    nodeIds: ['c10_hin_sp_cbse_26_001', 'c10_hin_sp_cbse_26_002', 'c10_hin_sp_cbse_26_003', 'c10_hin_sp_cbse_26_004', 'c10_hin_sp_cbse_26_005', 'c10_hin_sp_cbse_26_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्या तुमने कभी सोचा है कि कोई किताब पढ़कर तुम्हें जो दुनिया दिखती है, वही फिल्म में क्यों नहीं दिखती?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तीसरी कसम के शल्पिकार शैलेंद्र — पृष्ठभूमि और रचनाकार परिचय', text: '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी फिल्म *तीसरी कसम* (1966) के निर्माण-प्रक्रिया, शैलेंद्र के संघर्ष, और साहित्य व सिनेमा के अंतर्संबंध को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_26_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तीसरी कसम के शल्पिकार'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_26_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तीसरी कसम के शल्पिकार शैलेंद्र like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तीसरी कसम के शल्पिकार शैलेंद्र · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तीसरी कसम के शल्पिकार शैलेंद्र · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_001', difficulty: 'standard',
          question: '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए.',
          hint: 'यदि अटके तो **कक्षा 9 की हिंदी पुस्तक (स्पर्श/संचयन) में "रेणु" या "संस्मरण" शीर्षक वाले.',
          misconception: '**सबसे घातक भ्रांति:** छात्र समझते हैं कि **"तीसरी कसम" शैलेंद्र की लिखी कहानी है** और रेणु जी ने केवल उस पर टिप्पणी की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी',
                  options: ['"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के बाह्य'],
                  hint: 'यदि अटके तो **कक्षा 9 की हिंदी पुस्तक (स्पर्श/संचयन) में "रेणु" या "संस्मरण" शीर्षक वाले.',
                  misconception: '**सबसे घातक भ्रांति:** छात्र समझते हैं कि **"तीसरी कसम" शैलेंद्र की लिखी कहानी है** और रेणु जी ने केवल उस पर टिप्पणी की है। **वास्तविकता:**.' }
          ],
            remediations: { '1950-screenplay-dialogues': { steps: ['**स्पष्ट भेद लिखवाएँ:** बोर्ड पर दो कॉलम बनाएँ — "मूल कहानी: मारे गए गुलफ़ाम (लेखक: फणीश्वरनाथ रेणु)" vs "फिल्म: तीसरी.', '**शीर्षक का विश्लेषण करवाएँ:** "शिल्पकार" = *craftsperson* (फिल्म का शिल्प गढ़ने वाला), *नहीं* "रचयिता" (creator.', '**पाठ के पहले पैरा को जोर से पढ़वाएँ:** जहाँ रेणु जी लिखते हैं — "मेरी कहानी \'मारे गए गुलफ़ाम\' पर..." — इससे.', '**अभ्यास प्रश्न दें:** "पाठ के लेखक और फिल्म के पटकथा लेखक में अंतर स्पष्ट कीजिए।" — इसका 3-4 पंक्तियों का उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_002', difficulty: 'standard',
          question: 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत.',
          hint: 'अगर फँस जाएँ तो c10_hin_sp_cbse_26_001 (पृष्ठभूमि और रचना) दोबारा पढ़ें — शैलेंद्र की.',
          misconception: 'छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — वे दोनों को \'कहानी क्या हुई\' समझते हैं। वास्तव में कथानक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,',
                  options: ['कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के बाह्य'],
                  hint: 'अगर फँस जाएँ तो c10_hin_sp_cbse_26_001 (पृष्ठभूमि और रचना) दोबारा पढ़ें — शैलेंद्र की रचनात्मक मंशा.',
                  misconception: 'छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं — वे दोनों को \'कहानी क्या हुई\' समझते हैं। वास्तव में कथानक = घटनाओं की आंतरिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कहानी की 5 प्रमुख घटनाएँ कागज़ पर उसी क्रम में लिखो जैसे वे *घटीं* (क्रोनोलॉजिकल)।" चरण 2: फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_003', difficulty: 'standard',
          question: '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित.',
          hint: 'यदि फँसें तो **c10_hin_sp_cbse_26_002** के "कथानक-सार" और "प्रमुख प्रसंग" पुनः पढ़ें.',
          misconception: '**विशिष्ट भ्रम:** छात्र "परिवेश वर्णन" को **सूचीबद्ध करना** (Listing) समझते हैं — जैसे "लेखक ने नदी, खेत, मेला, नौटंकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक',
                  options: ['**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के बाह्य'],
                  hint: 'यदि फँसें तो **c10_hin_sp_cbse_26_002** के "कथानक-सार" और "प्रमुख प्रसंग" पुनः पढ़ें — विशेषकर मेले.',
                  misconception: '**विशिष्ट भ्रम:** छात्र "परिवेश वर्णन" को **सूचीबद्ध करना** (Listing) समझते हैं — जैसे "लेखक ने नदी, खेत, मेला, नौटंकी लिखा है" — और.' }
          ],
            remediations: { 'listing': { steps: ['**चरण 1:** छात्र को **एक पैरा** दें (जैसे: मेले का प्रारंभिक वर्णन) और कहें — **"यहाँ हर संज्ञा को घेरे, हर विशेषण को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र.',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_26_002 (कथानक)** के \'प्रमुख घटनाक्रम\' खंड को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र हिरामन के चरित्र-चित्रण में **\'प्रेम\' (Love) को केंद्रीय विषय मानकर** लिखते हैं — "हिरामन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के बाह्य',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण विधि है जिसमें किसी पात्र के बाह्य', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_26_002 (कथानक)** के \'प्रमुख घटनाक्रम\' खंड को दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र हिरामन के चरित्र-चित्रण में **\'प्रेम\' (Love) को केंद्रीय विषय मानकर** लिखते हैं — "हिरामन हीराबाई से बहुत प्यार.' }
          ],
            remediations: { 'love': { steps: ['**पाठ के 3 कस्म-प्रसंगों को दोबारा पढ़ें** (पृष्ठ 132-134, NCERT स्पर्श भाग-2) और प्रत्येक से पूछें: "यहाँ हिरामन ने.', '**\'प्रेम\' शब्द को 5 मिनट के लिए \'प्रतिबंधित\' (Ban) करें** और हिरामन का वर्णन केवल इन शब्दों से करें: नैतिकता, मर्यादा.', '**हीराबाई के नजरिए से** एक पैराग्राफ लिखें: "हिरामन ने मेरे लिए क्या किया?" — फिर पूछें: "क्या इसमें \'प्रेम\' शब्द आया?', '**बोर्ड उत्तर संरचना** का अभ्यास करें: **विशेषता → पाठ प्रमाण (संदर्भ/संवाद) → व्याख्या → मुख्य थीम से लिंक**। इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो मुख्य पात्रों.',
          hint: 'यदि अटके: c10_hin_sp_cbse_26_004 (नायक-चित्रण) के WORKED_EXAMPLE_1 को दोहराओ — वही विधि.',
          misconception: '**विशिष्ट भ्रांति:** "सहायक पात्रों के नाम याद करना काफी है, उनके संवाद/व्यवहार का विश्लेषण जरूरी नहीं।" **क्यों होती.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो मुख्य पात्रों (नायक-नायिका) के',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो मुख्य पात्रों (नायक-नायिका) के', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_26_004 (नायक-चित्रण) के WORKED_EXAMPLE_1 को दोहराओ — वही विधि सहायक.',
                  misconception: '**विशिष्ट भ्रांति:** "सहायक पात्रों के नाम याद करना काफी है, उनके संवाद/व्यवहार का विश्लेषण जरूरी नहीं।" **क्यों होती है:** छात्र पाठ को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** पाठ खोलकर पृष्ठ 132-135 पर **केवल सहायक पात्रों के संवाद** हाइलाइट करो (हीरामन/हीराबाई के नहीं)। 2.', '**चरण 2:** प्रत्येक पात्र के लिए 3 कॉलम बनाओ: (क) संवाद/कृत्य, (ख) स्वभाव/मनोविज्ञान, (ग) हीरामन/हीराबाई पर प्रभाव। 3.', '**चरण 3:** रामचरण के लिए भरो — (क) "कसम मत खा", (ख) व्यावहारिक/हितैषी, (ग) हीरामन को यथार्थ में लाता है। 4.', '**चरण 4:** इसी तरह बुधिया, मंगनी, ठेकेदार के लिए भरो। अब 150 शब्दों का उत्तर लिखो: *"रामचरण हीरामन का यथार्थवादी स्वर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_006', difficulty: 'standard',
          question: '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ का **मुख्य विषय** ग्रामीण जीवन की सहजता.',
          hint: 'यदि अटके तो **पात्र-चित्रण नोड्स (c10_hin_sp_cbse_26_004, 005)** दोबारा पढ़ें — विशेषकर.',
          misconception: '**विशिष्ट भ्रांति**: अधिकांश छात्र मानते हैं कि **"तीसरी कसम" हीरामन की हार या निराशा का प्रतीक है** — कि वह स्त्रियों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ का **मुख्य विषय** ग्रामीण जीवन की सहजता, मानवीय',
                  options: ['"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ का **मुख्य विषय** ग्रामीण जीवन की सहजता, मानवीय', '"तीसरी कसम के शिल्पकार शैलेंद्र" पाठ फणीश्वरनाथ रेणु की कहानी *"मारे गए गुलफ़ाम"* पर बनी', 'कथानक (प्लॉट) कहानी की घटनाओं का कारण-कार्य संबंध (कॉज़-इफेक्ट चेन) सहित सुसंगत क्रम है,', '**पाठ्य-परिवेश और वातावरण** (Textual Setting & Atmosphere) किसी रचना में वर्णित भौगोलिक'],
                  hint: 'यदि अटके तो **पात्र-चित्रण नोड्स (c10_hin_sp_cbse_26_004, 005)** दोबारा पढ़ें — विशेषकर हीरामन के.',
                  misconception: '**विशिष्ट भ्रांति**: अधिकांश छात्र मानते हैं कि **"तीसरी कसम" हीरामन की हार या निराशा का प्रतीक है** — कि वह स्त्रियों से डरकर, आहत होकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **हीराबाई की विदाई का दृश्य** (अंतिम 2-3 पैराग्राफ) **जोर से पढ़वाएँ** — उससे पूछें: "हीरामन यहाँ रो क्यों रहा.', '**तुलना करवाएँ**: पहली दो कसमों के टूटने पर हीरामन का व्यवहार (क्रोध, ग्लानि) vs तीसरी कसम पर (शांति, मौन) — **अंतर.', '**व्यक्तिगत उदाहरण**: पूछें — "कभी तुमने किसी की खुशी के लिए अपनी इच्छा छोड़ी है?', 'कैसा लगा — हार या जीत?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
