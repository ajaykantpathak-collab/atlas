import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch06_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'इस नोड में **केवल** पाठ 6 की पृष्ठभूमि (काल/समाज/राजनीति) और रचनाकार के जीवन के **उन.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c9_hin_ga_ch06'],
    nodeIds: ['c9_hin_ga_cbse_06_001', 'c9_hin_ga_cbse_06_002', 'c9_hin_ga_cbse_06_003', 'c9_hin_ga_cbse_06_004', 'c9_hin_ga_cbse_06_005', 'c9_hin_ga_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'कल्पना करें कि आपको एक पुराना पत्र मिला है जिसमें कोई किसी \'आंदोलन\' की बात कर रहा है — आप उसे तब तक नहीं समझ.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश है, जबकि **रचनाकार परिचय** लेखक के जीवन वृत्त, साहित्यिक योगदान, विचारधारा और भाषा-शैली का संक्षिप्त विवरण है.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती.', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_001', difficulty: 'standard',
          question: '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और.',
          hint: 'अगर अटके तो \'यथार्थवाद\' और \'प्रगतिवाद\' की परिभाषा दोहराएँ — ये दो विचारधाराएँ कक्षा 9 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **इतिहास की तारीखें, राजा-महाराजाओं के नाम, या बड़ी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश',
                  options: ['**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,', 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, भाषा,'],
                  hint: 'अगर अटके तो \'यथार्थवाद\' और \'प्रगतिवाद\' की परिभाषा दोहराएँ — ये दो विचारधाराएँ कक्षा 9 के अधिकांश.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **इतिहास की तारीखें, राजा-महाराजाओं के नाम, या बड़ी राजनीतिक घटनाएँ (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला चरण:** छात्र से कहें — "पाठ 6 के **किसी एक पात्र** को चुनो। उसके **तीन निर्णय/संवाद** लिखो। अब बताओ: वह ऐसा.', 'क्या कारण केवल उसके मन का है या उसके **समाज/परिवार/आर्थिक हालात** का दबाव है?" 2.', '**दूसरा चरण:** रचनाकार की **आत्मकथा/साक्षात्कार/संस्मरण** का **एक छोटा अंश** दें (पाठ्यपुस्तक की \'रचनाकार परिचय\' से आगे.', 'यह अनुभव पाठ 6 के किस प्रसंग से मेल खाता है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा.',
          hint: 'यदि अटका लगे तो **\'कहानी के भाग\' (आरंभ-मध्य-अंत)** और **\'समय-क्रम संकेतक\' (तब, फिर, बाद.',
          misconception: '**"कथानक और आख्यान-संरचना एक ही हैं क्योंकि दोनों घटनाओं के क्रम से जुड़े हैं।"** — यह भूल इसलिए होती है क्योंकि NCERT.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,', '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश', 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, भाषा,'],
                  hint: 'यदि अटका लगे तो **\'कहानी के भाग\' (आरंभ-मध्य-अंत)** और **\'समय-क्रम संकेतक\' (तब, फिर, बाद में.',
                  misconception: '**"कथानक और आख्यान-संरचना एक ही हैं क्योंकि दोनों घटनाओं के क्रम से जुड़े हैं।"** — यह भूल इसलिए होती है क्योंकि NCERT कक्षा 8 तक \'कहानी के.' }
          ],
            remediations: { 'ncert-8': { steps: ['**दृश्य साधन बनाएँ:** एक ही ५-घटना कथानक को **दो कार्ड-स्ट्रिप्स** पर लिखें — एक रैखिक क्रम में, एक फ्लैशबैक क्रम में।.', '**भाषा दें:** **\'क्या हुआ\' (Story/Plot)** बनाम **\'कैसे बताया\' (Discourse/Structure)** — इस जोड़ी को बार-बार दोहराएँ। 3.', '**माइक्रो-लेखन:** छात्र से ३ वाक्यों की घटना लिखवाएँ, फिर उसी को **फ्लैशबैक से शुरू कर** पुनर्लेखन करवाएँ। दोनों पढ़कर.', '**बोर्ड-शैली प्रश्न:** "लेखक ने फ्लैशबैक क्यों प्रयुक्त किया?" — उत्तर फ्रेम दें: **"लेखक ने X संरचना प्रयुक्त की ताकि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें.',
          hint: 'यदि अटके तो: NCERT कक्षा 9 गद्य खंड के किसी भी पाठ का पहला पृष्ठ खोलें और केवल \'कहाँ\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'वातावरण\' केवल मौसम या प्रकाश (बारिश, अंधेरा, धूप) से बनता है। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती',
                  options: ['पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती', '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,', 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, भाषा,'],
                  hint: 'यदि अटके तो: NCERT कक्षा 9 गद्य खंड के किसी भी पाठ का पहला पृष्ठ खोलें और केवल \'कहाँ\', \'कब\', \'कैसा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'वातावरण\' केवल मौसम या प्रकाश (बारिश, अंधेरा, धूप) से बनता है। **वास्तविकता:** वातावरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक ही स्थान (जैसे: रेलवे स्टेशन) के तीन चित्र दिखाएँ: (क) सुबह की भीड़, (ख) रात का सन्नाटा, (ग) दंगा ग्रस्त.', 'प्रत्येक के लिए पूछें: "यहाँ खड़े व्यक्ति के मन में क्या चल रहा है?" — उत्तर में आए शब्द (उत्साह, भय, आतंक) ही.', 'फिर पाठ से एक पैराग्राफ लेकर यही अभ्यास कराएँ: भौतिक विवरण घेरें → भाव शब्द रेखांकित करें → पात्र की प्रतिक्रिया से.', 'अंत में 3-चरणीय उत्तर लिखने का अभ्यास: (i) परिवेश तथ्य, (ii) वातावरण नाम, (iii) पात्र पर प्रभाव + पाठगत साक्ष्य।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_004', difficulty: 'standard',
          question: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार.',
          hint: 'यदि छात्र फंस जाए तो उसे पाठ में किसी एक पात्र के बारे में केवल एक बात बताने के लिए.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई पात्र सुंदर, välklädd या शिष्टाचार से भरा हुआ है तो वह आंतरिक रूप से भी अच्छा होना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, भाषा,',
                  options: ['पात्र-चित्रण वह प्रक्रिया है जिसमें लेखक किसी पात्र के शारीरिक लक्षण, व्यवहार, भाषा,', '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,', 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती'],
                  hint: 'यदि छात्र फंस जाए तो उसे पाठ में किसी एक पात्र के बारे में केवल एक बात बताने के लिए कहिए—जैसे वह.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई पात्र सुंदर, välklädd या शिष्टाचार से भरा हुआ है तो वह आंतरिक रूप से भी अच्छा होना चाहिए—उदाहरण के लिए यदि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['पहले छात्र से पूछिए कि क्या उन्होंने कभी ऐसा किसी को देखा है जो दिखने में अच्छा था लेकिन व्यवहार में बुरा—जैसे कोई.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र हैं जो नायक के समानांतर या अधीनस्थ भूमिका निभाते हुए कथानक.',
          hint: 'यदि अटका हुआ महसूस हो तो: नोड 004 के \'चरित्र-विश्लेषण चेकलिस्ट\' को दोहराएँ और नोड 002 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र का विश्लेषण\' का अर्थ है — उसका नाम, जाति, व्यवसाय, रूप-रंग लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र हैं जो नायक के समानांतर या अधीनस्थ भूमिका निभाते हुए कथानक को गति',
                  options: ['सहायक पात्र वे पात्र हैं जो नायक के समानांतर या अधीनस्थ भूमिका निभाते हुए कथानक को गति', '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,', 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती'],
                  hint: 'यदि अटका हुआ महसूस हो तो: नोड 004 के \'चरित्र-विश्लेषण चेकलिस्ट\' को दोहराएँ और नोड 002 के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'सहायक पात्र का विश्लेषण\' का अर्थ है — उसका नाम, जाति, व्यवसाय, रूप-रंग लिख देना। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ से किन्हीं दो सहायक पात्रों के **केवल तीन-तीन संवाद** छाँटकर लिखो जो नायक से बोले गए.', '**चरण 2:** प्रत्येक संवाद के सामने लिखवाएँ: "यह संवाद नायक के **कौन-से गुण** को उजागर करता है?" (जैसे: साहस, स्वार्थ.', '**चरण 3:** पूछें: "यदि यह पात्र न होता, तो नायक **क्या नहीं कर पाता या क्या गलत कर बैठता**?" 4.', '**चरण 4:** इन उत्तरों को जोड़कर एक पैराग्राफ बनवाएँ — यही \'विश्लेषणात्मक उत्तर\' का प्रारूप है। इसे दो बार अभ्यास कराएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_06_006', difficulty: 'standard',
          question: '**मुख्य विषय** पाठ का वह केंद्रीय विचार या भाव है जो संपूर्ण रचना में बार-बार.',
          hint: 'If stuck, review **node 004 (protagonist\'s core conflict and transformation)** — the.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी अक्सर \'मुख्य विषय\' को **कथानक का सारांश (plot summary)** समझ बैठते हैं — जैसे "यह कहानी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय** पाठ का वह केंद्रीय विचार या भाव है जो संपूर्ण रचना में बार-बार उभरता है और',
                  options: ['**मुख्य विषय** पाठ का वह केंद्रीय विचार या भाव है जो संपूर्ण रचना में बार-बार उभरता है और', '**पृष्ठभूमि** किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक परिवेश', 'कथानक (Plot) कहानी में घटित घटनाओं का कारण-परिणाम (cause-effect) से बँधा तार्किक क्रम है,', 'पाठ्य-परिवेश (Setting) कथा का भौतिक, ऐतिहासिक और सामाजिक संदर्भ है जिसमें घटनाएँ घटती'],
                  hint: 'If stuck, review **node 004 (protagonist\'s core conflict and transformation)** — the theme almost.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी अक्सर \'मुख्य विषय\' को **कथानक का सारांश (plot summary)** समझ बैठते हैं — जैसे "यह कहानी एक गरीब किसान की है.' }
          ],
            remediations: { 'plot-summary-events-idea-6': { steps: ['**स्पष्ट भेद कराएं:** विद्यार्थी से कहें — "पाठ की 3 मुख्य घटनाएं लिखो" (कथानक) फिर "इन तीनों में कॉमन कौन-सा विचार.', '**\'क्यों?\' की श्रृंखला चलाएं:** प्रत्येक घटना के बाद पूछें — "लेखक ने यह घटना *क्यों* रखी?', 'क्या दिखाना चाहता था?" 3-4 बार \'क्यों\' पूछने पर विषय उभरता है। 3.', '**विषय-वाक्य लेखन अभ्यास:** "यह पाठ ______ के बारे में है" — रिक्त स्थान में **संज्ञा-वाक्यांश** भरवाएं (जैसे \'मानवीय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
