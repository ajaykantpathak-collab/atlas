import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch28_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch28_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch28_p1',
    title: 'पतझड़ में टूटी पत्तयिाँ · Part 1/3',
    subtitle: 'यह नोड **केवल** लेखक परिचय, कृति की पृष्ठभूमि (काल, स्थान, परिवेश), संस्मरण विधा की पहचान.',
    classLevel: 10, subject: 'hin_sp', topic: 'पतझड़ में टूटी पत्तयिाँ · Part 1/3',
    chapters: ['c10_hin_sp_ch28'],
    nodeIds: ['c10_hin_sp_cbse_28_001', 'c10_hin_sp_cbse_28_002', 'c10_hin_sp_cbse_28_003', 'c10_hin_sp_cbse_28_004', 'c10_hin_sp_cbse_28_005', 'c10_hin_sp_cbse_28_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कक्षा में प्रवेश करते ही पूछें: *"क्या तुमने कभी अपने दादा-दादी से उनके बचपन के गांव के बारे में सुना है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पतझड़ में टूटी पत्तयिाँ — पृष्ठभूमि और रचनाकार परिचय', text: '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित एक **संस्मरणात्मक निबंध/रेखाचित्र** संग्रह है, जिसमें लेखक ने अपने पैतृक गांव बेनीपुर (बिहार) के ग्रामीण जीवन.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_28_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पतझड़ में टूटी पत्तयिाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_28_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पतझड़ में टूटी पत्तयिाँ like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पतझड़ में टूटी पत्तयिाँ · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पतझड़ में टूटी पत्तयिाँ · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_001', difficulty: 'standard',
          question: '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी**.',
          hint: 'यदि अटके तो **कक्षा 9 हिंदी स्पर्श/संचयन** के \'संस्मरण/रेखाचित्र\' संबंधी पाठ (जैसे: \'दिए.',
          misconception: '**सबसे आम भ्रम:** छात्र \'पतझड़ में टूटी पत्तियाँ\' को **\'पतझड़\' नामक कविता** या **\'टूटी पत्तियाँ\' नामक कहानी** समझ बैठते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित',
                  options: ['\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और', 'पात्र-चित्रण का अर्थ है कहानी/उपन्यास के किसी पात्र के व्यक्तित्व, स्वभाव, विचार,'],
                  hint: 'यदि अटके तो **कक्षा 9 हिंदी स्पर्श/संचयन** के \'संस्मरण/रेखाचित्र\' संबंधी पाठ (जैसे: \'दिए जल उठे\'.',
                  misconception: '**सबसे आम भ्रम:** छात्र \'पतझड़ में टूटी पत्तियाँ\' को **\'पतझड़\' नामक कविता** या **\'टूटी पत्तियाँ\' नामक कहानी** समझ बैठते हैं और पूरी कृति को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** कक्षा में **\'संस्मरण\', \'रेखाचित्र\', \'आत्मकथा\', \'जीवनी\', \'यात्रा-वृत्तांत\' — इन पांचों विधाओं का तुलनात्मक.', '**दूसरा कदम:** छात्रों से कहें कि वे अपने **दादा/नाना से एक घटना पूछकर संस्मरण शैली में 50 शब्दों में लिखें** — फिर.', '**तीसरा कदम:** NCERT पाठ्यपुस्तक के **\'पतझड़ में टूटी पत्तियाँ\' के प्रारंभिक पृष्ठ (भूमिका/प्रस्तावना)** को जोर से.', '**चौथा कदम:** पिछले 5 वर्षों के CBSE बोर्ड प्रश्नपत्रों से इस अध्याय के **\'लेखक परिचय\', \'शीर्षक सार्थकता\', \'विधा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि.',
          hint: 'यदि फँस जाएँ तो \'संस्मरण विधा की विशेषताएँ\' (Class 9 Hindi Sparsh/ Sanchayan में कवर).',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'कथानक का विश्लेषण\' का अर्थ केवल **घटनाओं का सारांश (Summary) लिखना** है — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और', 'पात्र-चित्रण का अर्थ है कहानी/उपन्यास के किसी पात्र के व्यक्तित्व, स्वभाव, विचार,'],
                  hint: 'यदि फँस जाएँ तो \'संस्मरण विधा की विशेषताएँ\' (Class 9 Hindi Sparsh/ Sanchayan में कवर) दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'कथानक का विश्लेषण\' का अर्थ केवल **घटनाओं का सारांश (Summary) लिखना** है — वे घटनाओं को \'क्या हुआ\'.' }
          ],
            remediations: { 'summary-6-9': { steps: ['**चरण 1:** छात्र से कहें: "पाठ को दोबारा पढ़ो और हर पैराग्राफ के आगे लिखो — **यह वर्तमान है या अतीत?', 'समय का संकेत देने वाला शब्द कौन-सा है?**" — एक टेबल बनवाएँ: पैरा संख्या | समय (वर्तमान/अतीत) | संकेत शब्द। 2.', '**चरण 2:** अब कहें: "घटनाओं को **जीवन-काल के क्रम (Life Chronology)** में लिखो — जन्म से मृत्यु/वर्तमान तक।" — यह कथानक.', '**चरण 3:** दोनों की तुलना करवाएँ: "लेखक ने जीवन-क्रम का पालन क्यों नहीं किया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और.',
          hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_28_002 (कथानक) के \'मुख्य घटनाक्रम\' और.',
          misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को केवल \'कहाँ और कब\' (Where and When) मान लेते हैं और \'वातावरण\' (Atmosphere) को केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और',
                  options: ['पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पात्र-चित्रण का अर्थ है कहानी/उपन्यास के किसी पात्र के व्यक्तित्व, स्वभाव, विचार,'],
                  hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_28_002 (कथानक) के \'मुख्य घटनाक्रम\' और c10_hin_sp_cbse_28_001.',
                  misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को केवल \'कहाँ और कब\' (Where and When) मान लेते हैं और \'वातावरण\' (Atmosphere) को केवल \'मूड\' (Mood) समझकर.' }
          ],
            remediations: { 'setting-where-and-when-atmosphere': { steps: ['छात्र को कहानी के पहले दो अनुच्छेद पढ़वाएँ और कहें — "हर संज्ञा (Noun) को घेरो जो भौतिक वस्तु/स्थान/समय बताती है.', 'फिर कहें — "अब हर विशेषण/क्रिया (Adjective/Verb) को रेखांकित करो जो भावना/मनोदशा दर्शाती है (टूटी, सूखी, खड़खड़ाहट.', 'अब दोनों सूचियों को आमने-सामने रखकर पूछें — "कौन सा भौतिक विवरण किस भावना को मूर्त करता है?', '(टूटी झोपड़ी → टूटा आत्मविश्वास; सूखे पत्ते → सूखे सपने)।" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_004', difficulty: 'standard',
          question: 'पात्र-चित्रण का अर्थ है कहानी/उपन्यास के किसी पात्र के व्यक्तित्व, स्वभाव.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_28_002 (कथानक) के \'प्रमुख मोड़\' खंड को दोबारा.',
          misconception: 'छात्र नायक को \'दुःखी/निराश व्यक्ति\' मानते हैं क्योंकि पाठ में माँ की मृत्यु, पिता की उपेक्षा, भाई से दूरी जैसे प्रसंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण का अर्थ है कहानी/उपन्यास के किसी पात्र के व्यक्तित्व, स्वभाव, विचार,',
                  options: ['पात्र-चित्रण का अर्थ है कहानी/उपन्यास के किसी पात्र के व्यक्तित्व, स्वभाव, विचार,', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_28_002 (कथानक) के \'प्रमुख मोड़\' खंड को दोबारा पढ़ें और.',
                  misconception: 'छात्र नायक को \'दुःखी/निराश व्यक्ति\' मानते हैं क्योंकि पाठ में माँ की मृत्यु, पिता की उपेक्षा, भाई से दूरी जैसे प्रसंग हैं — जबकि नायक का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से पूछो — "पाठ के किन्हीं 3 प्रसंग बताओ जहाँ नायक ने *चुनाव* किया (चुप रहना, बोलना, जाना, रुकना)।" चरण 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि फँस जाएँ तो नोड 004 (नायक चरित्र-चित्रण) के \'WORKED_EXAMPLE_1\' को दोहराएँ जहाँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों का चरित्र-चित्रण लिखते समय उन्हें \'स्वतंत्र इकाई\' मानकर उनकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि फँस जाएँ तो नोड 004 (नायक चरित्र-चित्रण) के \'WORKED_EXAMPLE_1\' को दोहराएँ जहाँ कृष्णकांत की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों का चरित्र-चित्रण लिखते समय उन्हें \'स्वतंत्र इकाई\' मानकर उनकी अच्छाइयों/बुराइयों की सूची बना देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के उन 5-6 प्रसंगों पर ले जाओ जहाँ नायक और सहायक पात्र का सीधा संवाद/सामना है (जैसे: पिता द्वारा खर्च.', 'प्रत्येक प्रसंग के लिए एक टेबल बनाओ: कॉलम 1 — सहायक पात्र का संवाद/कार्य; कॉलम 2 — नायक की तत्काल प्रतिक्रिया.', 'छात्र से कहो: "देखो, माँ के रोने पर कृष्णकांत क्या करता है?', 'वह खुद को दोषी मानता है या विद्रोह करता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार है जिसके इर्द-गिर्द पूरा.',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_28_002 (कथानक और आख्यान-संरचना)** दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"कहानी का विषय है: गंगू बूढ़ा है और मालकिन उसे निकाल देती है।"* **यह गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार है जिसके इर्द-गिर्द पूरा कथानक',
                  options: ['मुख्य विषय (Central Theme) कहानी का वह केंद्रीय विचार है जिसके इर्द-गिर्द पूरा कथानक', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_28_002 (कथानक और आख्यान-संरचना)** दोबारा पढ़ें — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"कहानी का विषय है: गंगू बूढ़ा है और मालकिन उसे निकाल देती है।"* **यह गलत क्यों है:** यह **कथानक.' }
          ],
            remediations: { 'plot-summary': { steps: ['**चरण 1 — अंतर स्पष्ट करो:** छात्र को दो वाक्य लिखवाओ — (क) "कहानी में क्या हुआ?" (घटना) (ख) "कहानी क्या कहती है?".', '**चरण 2 — सूत्र दो:** विषय = **विषयवस्तु (topic) + लेखक का दृष्टिकोण (author\'s stance)**। उदाहरण: विषयवस्तु = बुढ़ापा.', '**चरण 3 — अभ्यास:** NCERT की किसी भी कहानी (जैसे \'बड़े भाई साहब\') पर यही सूत्र लागू करवाओ — विषय निकालकर बोर्ड-शैली में.', '**चरण 4 — फीडबैक:** उसके लिखे विषय में \'क्या\' (what) और \'क्यों\' (why) दोनों हैं या नहीं, जाँचो — कमी हो तो सुधारो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
