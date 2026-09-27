import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_al_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_al_ch01_p1: SimDef = {
    id: 'v3_c11_hin_al_ch01_p1',
    title: 'हुसैन की कहानी अपनी ज़बानी · Part 1/3',
    subtitle: 'इस नोड में **केवल** रचनाकार परिचय (मंज़ूर एहतेशाम का जीवन परिचय, प्रमुख रचनाएँ, साहित्यिक.',
    classLevel: 11, subject: 'hin_al', topic: 'हुसैन की कहानी अपनी ज़बानी · Part 1/3',
    chapters: ['c11_hin_al_ch01'],
    nodeIds: ['c11_hin_al_cbse_01_001', 'c11_hin_al_cbse_01_002', 'c11_hin_al_cbse_01_003', 'c11_hin_al_cbse_01_004', 'c11_hin_al_cbse_01_005', 'c11_hin_al_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'क्या आपने कभी सोचा है कि कोई लेखक अपने बचपन की गलियों, अपनी अम्मी की डाँट, अपने शहर की खुशबू को कागज़ पर कैसे.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'हुसैन की कहानी अपनी ज़बानी — पृष्ठभूमि और रचनाकार परिचय', text: '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध कथाकार **मंज़ूर एहतेशाम** ने लिखा है। यह एक **आत्मकथात्मक उपन्यास** (Autobiographical Fiction) है जिसमें लेखक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_al_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['हुसैन की कहानी अपनी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_al_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through हुसैन की कहानी अपनी ज़बानी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? हुसैन की कहानी अपनी ज़बानी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — हुसैन की कहानी अपनी ज़बानी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_001', difficulty: 'standard',
          question: '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे.',
          hint: 'यदि छात्र अटका हुआ है, तो उसे **कक्षा 10 की पाठ्यपुस्तक (क्षितिज/कृतिका) में दी गई.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि **\'हुसैन = मंज़ूर एहतेशाम\' पूर्णतः समान हैं** और उपन्यास की हर घटना लेखक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध',
                  options: ['\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र के'],
                  hint: 'यदि छात्र अटका हुआ है, तो उसे **कक्षा 10 की पाठ्यपुस्तक (क्षितिज/कृतिका) में दी गई आत्मकथा/जीवनी के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मान लेते हैं कि **\'हुसैन = मंज़ूर एहतेशाम\' पूर्णतः समान हैं** और उपन्यास की हर घटना लेखक के जीवन की **सटीक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्टीकरण (2 मिनट):** छात्र से पूछें — "यदि आप अपने बचपन पर कहानी लिखें और उसमें एक ऐसा दोस्त जोड़ दें जो असल में न.', '**तुलना तालिका (5 मिनट):** बोर्ड पर बनाएँ: | तत्व | मंज़ूर एहतेशाम (लेखक) | हुसैन (पात्र) | |---|---|---| | जन्म |.', '**लेखक का वक्तव्य पढ़ाएँ:** मंज़ूर एहतेशाम के किसी साक्षात्कार का अंश दें जहाँ वे \'हुसैन\' को **\'आल्टर इगो\' (Alter Ego).', '**अभ्यास:** छात्र से कहें — "उपन्यास के पहले अध्याय से दो अंश चुनें: एक जो लेखक के जीवन से मेल खाता हो, एक जो कल्पित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से.',
          hint: 'यदि फँस जाएँ तो \'आत्मकथात्मक शैली की विशेषताएँ\' और \'कथानक बनाम आख्यान\' (Story.',
          misconception: 'छात्र प्रायः मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं क्योंकि दोनों \'कहानी\' से जुड़े हैं। वे फ्लैशबैक को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता',
                  options: ['कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र के'],
                  hint: 'यदि फँस जाएँ तो \'आत्मकथात्मक शैली की विशेषताएँ\' और \'कथानक बनाम आख्यान\' (Story vs Discourse) की.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं क्योंकि दोनों \'कहानी\' से जुड़े हैं। वे फ्लैशबैक को केवल \'अतीत में जाना\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ की १० प्रमुख घटनाओं को कागज पर उसी क्रम में लिखो जैसे वे पाठ में आई हैं (प्रस्तुति क्रम)।".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक और आख्यान-संरचना)** के \'आख्यान-ध्वनि\' खंड को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर \'पाठ्य-परिवेश\' को **केवल भौतिक पृष्ठभूमि (Physical Backdrop)** मान लेते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक और आख्यान-संरचना)** के \'आख्यान-ध्वनि\' खंड को दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर \'पाठ्य-परिवेश\' को **केवल भौतिक पृष्ठभूमि (Physical Backdrop)** मान लेते हैं — जैसे गाँव का नक्शा, मौसम.' }
          ],
            remediations: { 'physical-backdrop': { steps: ['**चरणबद्ध उपचार:** (1) छात्र से कहें: "पाठ के किसी एक पन्ने पर केवल **संज्ञा-सर्वनाम घेरे** जो \'स्थान\', \'समय\', \'समाज\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र.',
          hint: 'यदि फँस जाएँ तो **c11_hin_al_cbse_01_002 (कथानक संरचना)** दोहराएँ — प्रमुख मोड़ (Turning.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः हुसैन के चरित्र-चित्रण को **\'घटनाओं का कालानुक्रमिक सारांश\' (Chronological Summary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र के',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें किसी पात्र के', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_al_cbse_01_002 (कथानक संरचना)** दोहराएँ — प्रमुख मोड़ (Turning Points).',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः हुसैन के चरित्र-चित्रण को **\'घटनाओं का कालानुक्रमिक सारांश\' (Chronological Summary of Events)** समझ लेते.' }
          ],
            remediations: { 'chronological-summary-of-events': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**चरण 1 (अंतर स्पष्ट करें):** छात्र को एक ही प्रसंग (जैसे: पोस्टर पेंट करना) के दो संस्करण दिखाएँ — **संस्करण अ.', '**चरण 2 (PEEL ढाँचा सिखाएँ):** एक छोटा अभ्यास दें: **Point:** हुसैन जिम्मेदार पुत्र था। **Evidence:** पाठ से एक पंक्ति.', '**Link:** यह पाठ के मुख्य विषय \'संघर्ष में सृजन\' से कैसे जुड़ती है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक के साथ प्रत्यक्ष या.',
          hint: 'यदि अटके: **नोड 004 के \'नायक के चरित्र-लक्षण\' अनुभाग** को दोहराएँ और **नोड 002 के \'कथानक.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'सहायक पात्र का चरित्र-चित्रण\' = \'उस पात्र के गुण-दोषों की सूची बनाना\'**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक के साथ प्रत्यक्ष या अप्रत्यक्ष',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक के साथ प्रत्यक्ष या अप्रत्यक्ष', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटके: **नोड 004 के \'नायक के चरित्र-लक्षण\' अनुभाग** को दोहराएँ और **नोड 002 के \'कथानक के मोड़\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'सहायक पात्र का चरित्र-चित्रण\' = \'उस पात्र के गुण-दोषों की सूची बनाना\'**। **गलत तर्क:** वे लिखते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** केवल सहायक पात्रों के **संवाद/कार्य** चिह्नित करने के लिए — नायक के नहीं। 2.', '**तालिका बनाएँ:** स्तंभ — पात्र | संवाद/कार्य (पाठ संदर्भ) | नायक पर तात्कालिक प्रभाव | दीर्घकालिक कथात्मक कार्य। 3.', '**प्रत्येक पंक्ति के लिए पूछें:** "यह जानकारी नायक के **कौन से छिपे पहलू** को खोलती है?" — उत्तर ही आपका विश्लेषण है। 4.', '**अभ्यास:** माँ और पिता पर 50-50 शब्दों के दो **तुलनात्मक पैराग्राफ** लिखें — विशेषणों का प्रयोग **न्यूनतम**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_006', difficulty: 'standard',
          question: 'मुख्य विषय (Main Theme) किसी रचना का वह **केंद्रीय विचार या सार्वभौमिक सत्य**.',
          hint: 'यदि अटके तो **पात्र-चित्रण नोड्स (004, 005)** पर लौटें और हुसैन के \'सृजन-प्रसंगों\' की.',
          misconception: '**विषय = कथानक का सारांश (Plot Summary)** — यह सबसे गहरी भ्रांति है। छात्र लिखते हैं: *"मुख्य विषय है: हुसैन गरीब लड़का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Main Theme) किसी रचना का वह **केंद्रीय विचार या सार्वभौमिक सत्य** होता है जो',
                  options: ['मुख्य विषय (Main Theme) किसी रचना का वह **केंद्रीय विचार या सार्वभौमिक सत्य** होता है जो', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटके तो **पात्र-चित्रण नोड्स (004, 005)** पर लौटें और हुसैन के \'सृजन-प्रसंगों\' की सूची बनाएँ.',
                  misconception: '**विषय = कथानक का सारांश (Plot Summary)** — यह सबसे गहरी भ्रांति है। छात्र लिखते हैं: *"मुख्य विषय है: हुसैन गरीब लड़का था, मिट्टी से खेलता.' }
          ],
            remediations: { 'plot-summary': { steps: ['**पृथक्करण अभ्यास (Separation Drill):** छात्र से कहें — पाठ की **5 घटनाएँ** बाएँ कॉलम में, **5 विचार/भाव** दाएँ कॉलम.', '**\'तो क्या?\' तकनीक (So What?', 'Technique):** हर घटना के बाद पूछें — *"तो क्या?', 'इसका बड़ा मतलब क्या?"* — जब तक अमूर्त विषय न निकल आए। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
