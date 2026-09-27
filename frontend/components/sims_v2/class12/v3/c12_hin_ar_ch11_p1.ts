import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch11_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch11_p1',
    title: 'बाज़ार दर्शन · Part 1/3',
    subtitle: 'The blind man saw the truth; the sighted chose the well',
    classLevel: 12, subject: 'hin_ar', topic: 'बाज़ार दर्शन · Part 1/3',
    chapters: ['c12_hin_ar_ch11'],
    nodeIds: ['c12_hin_ar_cbse_11_001', 'c12_hin_ar_cbse_11_002', 'c12_hin_ar_cbse_11_003', 'c12_hin_ar_cbse_11_004', 'c12_hin_ar_cbse_11_005', 'c12_hin_ar_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Psychoanalytic fiction reader', intro: 'A beggar who cannot see meets a society that refuses to. The story asks whose blindness is real.', goal: 'Read Bazar Darshan through psychoanalytic realism — blindness as epistemological and political condition.' },
    discovery: {
        question: 'A blind beggar is cheated because he can\'t see — but the story insists the real blindness belongs to everyone else. Blindness as what, then?',
        options: ['Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces', 'Poor eyesight only', 'Fate\'s cruelty', 'A medical condition'],
        answer: 'Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces',
        hook: 'This is the psychoanalytic turn in Hindi fiction — after Premchand\'s social realism came Jainendra\'s probe of the unconscious, where blindness is imposed by power and kept by utilitarian logic. The beggar isn\'t a pitiable character; he\'s the site where ideology does its violence.',
    },
    teaching: [
        { title: 'बाज़ार दर्शन — पृष्ठभूमि और रचनाकार परिचय', text: '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी है जो आधुनिक बाज़ारवाद के छद्म दर्शन (फिलॉसफी) को उजागर करती है, जहाँ मानवीय संवेदनाएँ, संस्कृति और नैतिकता भी.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['बाज़ार दर्शन — पृष्ठभूमि', 'बाज़ार दर्शन — कथानक', 'बाज़ार दर्शन — पाठ्य-परिवेश', 'बाज़ार दर्शन — पात्र-चित्रण', 'बाज़ार दर्शन — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate pays a \'career guru\' who diagnoses his low marks as a family curse and prescribes an absurd regime — copying his ancestors\' names 500 times. He complied for a month, then quietly stopped going. He\'s still failing.',
            decisions: [{ prompt: 'What does Nirala\'s \'खुजली उखाड़ जासा\' read in this episode?', options: [
                { text: 'The story ends where it began — the patient flees still itching; walking away from a bogus authority returns you to the problem untouched. The satire is that individual escape doesn\'t cure a systemic absurdity — question the prescription, don\'t just flee the clinic.', outcome: 'The circular structure — opening and closing on the itch — exists to show the quest was futile; his problem survives the guru because it was never the itch being treated.' },
                { text: 'At least he escaped before worse harm — quietly quitting was the smart move.', outcome: 'Escape isn\'t the story\'s victory — the patient who runs is still scratching on the last page; leaving the fraud unexamined leaves both the itch and the marketplace of absurd cures intact.', reveals: 'escape-equals-solution' },
                { text: 'The guru\'s method was sound in principle — he just needed to persist longer for results.', outcome: 'That\'s the blind faith in authority the story skewers: the diagnosis was theatrical nonsense from the start, and more obedience only deepens the farce.', reveals: 'persist-with-absurdity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read blindness as a social instrument — and catch the moment a story stops being about a beggar and starts being about us.',
            decisions: [{ prompt: 'What comes next? बाज़ार दर्शन · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बाज़ार दर्शन · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_001', difficulty: 'standard',
          question: '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक.',
          hint: 'यदि \'दाज्यू\' का कथानक/विषय धुंधला है, तो **c11_hin_ar_cbse_02_002 (कथानक)** और.',
          misconception: '**भ्रांति:** "शेखर जोशी प्रेमचंद की परंपरा के लेखक हैं, इसलिए उनकी कहानियाँ भी ग्रामीण यथार्थवाद तक सीमित हैं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी',
                  options: ['\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,', '\'बाज़ार दर्शन\' में नायक/प्रमुख पात्र (कथावाचक \'मैं\') एक संवेदनशील, मध्यवर्गीय युवा है जो'],
                  hint: 'यदि \'दाज्यू\' का कथानक/विषय धुंधला है, तो **c11_hin_ar_cbse_02_002 (कथानक)** और.',
                  misconception: '**भ्रांति:** "शेखर जोशी प्रेमचंद की परंपरा के लेखक हैं, इसलिए उनकी कहानियाँ भी ग्रामीण यथार्थवाद तक सीमित हैं।" **वास्तविकता:** जोशी जी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** शेखर जोशी की कहानी **\'दाज्यू\'** (कक्षा 11, आरोह पाठ 2) दोबारा पढ़ें — विशेषकर पलायन और भाई-भाई के संबंध.', '**दूसरा कदम:** जोशी जी के साक्षात्कार/आलेख (यूट्यूब/पुस्तक \'मेरी प्रिय कहानियाँ\' की भूमिका) देखें जहाँ वे बताते हैं.', '**तीसरा कदम:** इस नोड के **DIAGNOSTIC_QUESTION_3** को फिर से हल करें — अबकी बार \'दाज्यू\' और \'कोसी का घटवार\' के **समान.', '**पुनः निदान:** यदि अब भी शीर्षक का व्यंग्य न खुले, तो **\'व्यंग्य\' की परिभाषा** (कक्षा 11, आरोह पाठ 8 \'भक्तिन\' का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_002', difficulty: 'standard',
          question: 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से.',
          hint: 'अगर भेद न समझ आए तो कक्षा 11 के नोड c11_hin_ar_cbse_11_002 के \'कथानक vs आख्यान-संरचना\'.',
          misconception: 'छात्र समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं, या यह कि \'फ्लैशबैक\' केवल अतीत में जाना है — वे नहीं देखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता',
                  options: ['कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,', '\'बाज़ार दर्शन\' में नायक/प्रमुख पात्र (कथावाचक \'मैं\') एक संवेदनशील, मध्यवर्गीय युवा है जो'],
                  hint: 'अगर भेद न समझ आए तो कक्षा 11 के नोड c11_hin_ar_cbse_11_002 के \'कथानक vs आख्यान-संरचना\' खंड को.',
                  misconception: 'छात्र समझते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं, या यह कि \'फ्लैशबैक\' केवल अतीत में जाना है — वे नहीं देखते कि फ्लैशबैक एक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के पहले दो पृष्ठ दुबारा पढ़ने को कहें और हर बार जब समय-क्रम बदले, पेंसिल से किनारे \'⏪\' (पीछे) या \'⏩\' (आगे).', 'फिर उनसे पूछें: "प्रत्येक चिह्न पर रुककर बताओ: लेखक यहाँ अतीत/भविष्य क्यों गया?', 'अगर वह कालक्रम में लिखता तो क्या खो जाता?" 3.', 'इस अभ्यास के बाद उनसे DIAGNOSTIC_QUESTION_4 फिर पूछें — अब वे संरचनात्मक उद्देश्य बता पाएंगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक.',
          hint: 'यदि फँसें तो कक्षा 11 के किसी भी गद्य पाठ (जैसे \'आवारा मसीहा\' c11_hin_al_cbse_02_003) का.',
          misconception: 'छात्र \'पृष्ठभूमि\' (background — लेखक का जीवन, रचना काल, ऐतिहासिक घटनाएँ) और \'परिवेश\' (setting/milieu — कथा के भीतर की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', '\'बाज़ार दर्शन\' में नायक/प्रमुख पात्र (कथावाचक \'मैं\') एक संवेदनशील, मध्यवर्गीय युवा है जो'],
                  hint: 'यदि फँसें तो कक्षा 11 के किसी भी गद्य पाठ (जैसे \'आवारा मसीहा\' c11_hin_al_cbse_02_003) का परिवेश.',
                  misconception: 'छात्र \'पृष्ठभूमि\' (background — लेखक का जीवन, रचना काल, ऐतिहासिक घटनाएँ) और \'परिवेश\' (setting/milieu — कथा के भीतर की दुनिया) को एक मान.' }
          ],
            remediations: { 'background': { steps: ['चरण 1: छात्र से कहो — "उपन्यास के किसी एक पन्ने को खोलो जहाँ स्थान का वर्णन हो (अध्याय 1 या 2)। उसमें से केवल संज्ञाएँ.', 'एक वाक्य में लिखो।" चरण 3: इन वाक्यों को जोड़कर एक पैराग्राफ बनाओ — यही परिवेश-विश्लेषण है। चरण 4: पुनः डायग्नोस्टिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_004', difficulty: 'standard',
          question: '\'बाज़ार दर्शन\' में नायक/प्रमुख पात्र (कथावाचक \'मैं\') एक संवेदनशील, मध्यवर्गीय.',
          hint: 'यदि \'नायक के द्वंद्व\' को पकड़ने में कठिनाई हो तो कक्षा 11 के \'पात्र-चित्रण\' नोड.',
          misconception: 'छात्र प्रायः नायक को \'शोषित पीड़ित\' (victim) मानकर उसके \'समझौतों\' को मजबूरी का नाम दे देते हैं, जबकि पाठ दर्शाता है कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बाज़ार दर्शन\' में नायक/प्रमुख पात्र (कथावाचक \'मैं\') एक संवेदनशील, मध्यवर्गीय युवा है जो',
                  options: ['\'बाज़ार दर्शन\' में नायक/प्रमुख पात्र (कथावाचक \'मैं\') एक संवेदनशील, मध्यवर्गीय युवा है जो', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि \'नायक के द्वंद्व\' को पकड़ने में कठिनाई हो तो कक्षा 11 के \'पात्र-चित्रण\' नोड.',
                  misconception: 'छात्र प्रायः नायक को \'शोषित पीड़ित\' (victim) मानकर उसके \'समझौतों\' को मजबूरी का नाम दे देते हैं, जबकि पाठ दर्शाता है कि नायक **सक्रिय रूप.' }
          ],
            remediations: { 'victim': { steps: ['पाठ के उन तीन प्रसंगों को चिह्नित करें जहाँ नायक **चुनाव** करता है (इंटरव्यू में झूठ, डिफेक्टिव पीस बेचना, कमल की.', 'कक्षा 11 के \'पात्र-चित्रण\' नोड (c11_hin_ar_cbse_11_004) के \'चरित्र के विकास के चरण\' ढांचे को दोहराएँ और नायक पर लागू.', 'पुनः निदान: "नायक के तीन सक्रिय चुनाव लिखें जहाँ उसने नैतिकता पर व्यावहारिकता को चुना।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_005', difficulty: 'standard',
          question: 'सहायक पात्र वे गौण चरित्र हैं जो नायक के समानांतर या पृष्ठभूमि में रहकर कथानक.',
          hint: 'यदि अटके तो कक्षा 11 के \'पात्र-चित्रण: सहायक पात्र\' नोड्स (c11_hin_ar_cbse_01_005 आदि) को.',
          misconception: 'छात्र सहायक पात्रों को \'केवल नाम गिनाने\' (listing) तक सीमित कर देते हैं — जैसे "फल वाला, चाय वाला, रिक्शा वाला हैं".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे गौण चरित्र हैं जो नायक के समानांतर या पृष्ठभूमि में रहकर कथानक को आगे',
                  options: ['सहायक पात्र वे गौण चरित्र हैं जो नायक के समानांतर या पृष्ठभूमि में रहकर कथानक को आगे', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि अटके तो कक्षा 11 के \'पात्र-चित्रण: सहायक पात्र\' नोड्स (c11_hin_ar_cbse_01_005 आदि) को दोहराएँ.',
                  misconception: 'छात्र सहायक पात्रों को \'केवल नाम गिनाने\' (listing) तक सीमित कर देते हैं — जैसे "फल वाला, चाय वाला, रिक्शा वाला हैं" — और यह नहीं देखते कि.' }
          ],
            remediations: { 'listing': { steps: ['चरण 1: पाठ को फिर से पढ़ें और हर सहायक पात्र के सामने आने वाले पैराग्राफ को चिह्नित करें (हाइलाइटर से)। चरण 2: प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_006', difficulty: 'standard',
          question: '\'बाज़ार दर्शन\' का मुख्य विषय **आधुनिक उपभोक्तावादी संस्कृति (consumerist.',
          hint: 'यदि अटका हुआ महसूस हो, तो c11_hin_ar_cbse_11_006 (कक्षा 11 का समान नोड) दोहराएँ — वहाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि \'बाज़ार दर्शन\' का विषय **"बाज़ार बुरा है" (market is bad)** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बाज़ार दर्शन\' का मुख्य विषय **आधुनिक उपभोक्तावादी संस्कृति (consumerist culture) द्वारा',
                  options: ['\'बाज़ार दर्शन\' का मुख्य विषय **आधुनिक उपभोक्तावादी संस्कृति (consumerist culture) द्वारा', '\'बाज़ार दर्शन\' हिंदी के प्रख्यात कथाकार **शेखर जोशी** द्वारा रचित एक व्यंग्यात्मक कहानी', 'कथानक (प्लॉट) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी/उपन्यास में चित्रित वह भौगोलिक, सामाजिक,'],
                  hint: 'यदि अटका हुआ महसूस हो, तो c11_hin_ar_cbse_11_006 (कक्षा 11 का समान नोड) दोहराएँ — वहाँ \'विषय पहचान.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि \'बाज़ार दर्शन\' का विषय **"बाज़ार बुरा है" (market is bad)** या **"पूंजीवाद की आलोचना".' }
          ],
            remediations: { 'market-is-bad-critique-of': { steps: ['**चरण 1:** छात्र से कहें — "पाठ के 3 संवाद ढूंढो जहाँ \'कीमत\', \'भाव\', \'सौदा\', \'निवेश\' जैसे शब्द मनुष्य के लिए प्रयुक्त.', '**चरण 2:** पूछें — "इन शब्दों का शाब्दिक अर्थ (literal) क्या है और प्रसंगगत अर्थ (contextual) क्या है?', '**चरण 3:** समझाएं — "जब लेखक इन शब्दों का प्रयोग मनुष्य के लिए करता है, तो वह **रूपक (metaphor)** रच रहा है। यह रूपक ही.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_3 फिर से दें। यदि अब सही उत्तर दे, तो आगे बढ़ें; अन्यथा c12_hin_ar_cbse_11_008.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
