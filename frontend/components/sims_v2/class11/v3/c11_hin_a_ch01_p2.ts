import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch01_p2: SimDef = {
    id: 'v3_c11_hin_a_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, वर्गीकरण (विस्तारक/विरोधी/पूरक), और मुख्य विषय से.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c11_hin_a_ch01'],
    nodeIds: ['c11_hin_a_cbse_01_007', 'c11_hin_a_cbse_01_008', 'c11_hin_a_cbse_01_009', 'c11_hin_a_cbse_01_010', 'c11_hin_a_cbse_01_011', 'c11_hin_a_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 1\' में अंतरा-भाग-1-—-पाठ-1 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: '\'अंतरा भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 2/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_007', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) पर लौटें और मुख्य विषय के 3-4 प्रमाण (संवाद.',
          misconception: 'छात्र अक्सर \'गौण विषय\' को \'सहायक पात्रों की कहानी\' या \'पृष्ठभूमि विवरण\' समझ लेते हैं — जैसे पाठ 1 में यदि किसी पात्र की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) पर लौटें और मुख्य विषय के 3-4 प्रमाण (संवाद, घटना.',
                  misconception: 'छात्र अक्सर \'गौण विषय\' को \'सहायक पात्रों की कहानी\' या \'पृष्ठभूमि विवरण\' समझ लेते हैं — जैसे पाठ 1 में यदि किसी पात्र की बीमारी का प्रसंग.' }
          ],
            remediations: { '1': { steps: ['चरण 1: छात्र से कहें — \'पाठ के किसी एक प्रसंग को चुनो (जैसे चाचा का शहर जाना)। अब लिखो: यह प्रसंग किस "बड़े विचार" (Big.', 'परंपरा का टूटना?\' चरण 2: उस "बड़े विचार" को एक वाक्य में लिखवाएँ — वही गौण विषय है। चरण 3: पूछें — \'यह बड़ा विचार मुख्य.', '— क्या यह उसे मजबूत करता है, कमजोर, या जटिल बनाता है?\' चरण 4: इस प्रक्रिया को 3-4 प्रसंगों पर दोहराएँ जब तक छात्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_008', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो, तो **उपमा और रूपक के 10-10 उदाहरण** लिखकर उनके **सूचक शब्दों.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'मानवीकरण (Personification)\' को \'रूपक\' मान लेते हैं** जब भी कोई अमूर्त भाव/निर्जीव वस्तु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **उपमा और रूपक के 10-10 उदाहरण** लिखकर उनके **सूचक शब्दों (Markers)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'मानवीकरण (Personification)\' को \'रूपक\' मान लेते हैं** जब भी कोई अमूर्त भाव/निर्जीव वस्तु मानवीय क्रिया करती.' }
          ],
            remediations: { 'personification': { steps: ['**चरण 1 (पृथक्करण):** छात्र को 5 वाक्य दें जिनमें मानवीकरण, रूपक, उपमा, बिंब मिश्रित हों। कहें: "पहले **केवल क्रियाओं**.', '**चरण 2 (उपमान-खोज):** एक रूपक दें (जैसे: "क्रोध ज्वालामुखी है")। पूछें: "ज्वालामुखी के **कौन-से 3 गुण** क्रोध पर लागू.', '(दबना, अचानक फटना, विनाश करना)। \'पहाड़\' क्यों नहीं चुना गया?" → यह **तनाव (Tension)** समझाता है। 3.', '**चरण 3 (लेखन अभ्यास):** छात्र से कहें: "अपने किसी डर/सपने पर 2 पंक्तियों का **मौलिक रूपक** लिखो जिसमें मानवीकरण **न**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_009', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो c11_hin_a_cbse_01_008 के \'रूपक से प्रतीक तक\' खंड को दोहराएँ और एक ही कविता.',
          misconception: 'छात्र प्रायः **विरोधाभास** को केवल \'वाक्य में विरोधी शब्दों का मेल\' (ऑक्सीमोरॉन) मान लेते हैं, जबकि Class 11 में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_01_008 के \'रूपक से प्रतीक तक\' खंड को दोहराएँ और एक ही कविता में.',
                  misconception: 'छात्र प्रायः **विरोधाभास** को केवल \'वाक्य में विरोधी शब्दों का मेल\' (ऑक्सीमोरॉन) मान लेते हैं, जबकि Class 11 में **स्थितिगत विरोधाभास**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के तीन पन्ने खोलो और हर पृष्ठ पर एक वाक्य ढूँढ़ो जहाँ पात्र \'कहता कुछ है, करता कुछ और है\' — उन्हें.', 'फिर पूछें: "कौन-सी वस्तु/चित्र कम से कम तीन बार आया है और हर बार उसका अर्थ गहरा होता गया?" — उसे नोट कराओ। 3.', 'अब दोनों को जोड़कर एक वाक्य में लिखवाएँ: "लेखक ने इस विरोधाभास और प्रतीक के जरिए ______ थीम को ______ तरह उभारा है।" 4.', 'इस अभ्यास को दो अलग-अलग पाठों पर दुहराएँ; चौथी बार छात्र स्वयं पैटर्न पकड़ लेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_010', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-परिवार चार्ट\' (word family chart)** बनाएं: एक मुख्य शब्द.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि पदावली विश्लेषण = **पर्यायवाची शब्द लिखना** या **शब्दकोश से अर्थ नकल करना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'शब्द-परिवार चार्ट\' (word family chart)** बनाएं: एक मुख्य शब्द → उसकी.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि पदावली विश्लेषण = **पर्यायवाची शब्द लिखना** या **शब्दकोश से अर्थ नकल करना**। वे \'मर्म\', \'हृदय\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार**: 1) **शब्द-परिवार बनाएं**: पाठ के 5 मुख्य शब्द लें, प्रत्येक के लिए — धातु, मूल अर्थ, 3 पर्याय, 3.', 'क्यों?" (शिक्षक मॉडल करके दिखाए)। 3) **ध्वनि-मानचित्रण**: शब्द उच्चारें, वर्णों को ध्वन्यात्मक वर्ग में बांटें, महसूस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_011', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि फँसे हों, तो **कक्षा 10 हिंदी व्याकरण: वाक्य-रूपांतरण (काल/वाच्य परिवर्तन) और.',
          misconception: '**"भाषा-प्रयोग = कठिन/सजावटी शब्दों की पहचान"** — छात्र समझते हैं कि \'अलंकार छाँटना\' या \'तत्सम/तद्भव बताना\' ही.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसे हों, तो **कक्षा 10 हिंदी व्याकरण: वाक्य-रूपांतरण (काल/वाच्य परिवर्तन) और शब्द-शक्ति.',
                  misconception: '**"भाषा-प्रयोग = कठिन/सजावटी शब्दों की पहचान"** — छात्र समझते हैं कि \'अलंकार छाँटना\' या \'तत्सम/तद्भव बताना\' ही भाषा-प्रयोग विश्लेषण है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**माइक्रो-ड्रिल:** पाठ-1 से **एक वाक्य लें** → उसके **काल/वाच्य/लंबाई/शब्द-शक्ति** बदलकर **3 वैरिएंट बनाएँ** → प्रत्येक.', '**कलर-कोडिंग:** फोटोकॉपी पर **काल=लाल, वाच्य=नीला, वाक्य-लंबाई=हरा, अलंकार=पीला** से हाइलाइट करें → पैटर्न देखें.', '**PEEL-लेखन:** एक भाषा-लक्षण चुनें (जैसे: "संवाद में प्रश्नवाचक वाक्यों की बाढ़") → **Point:** लेखक पाठक को निर्णायक.', '**पीयर-रिव्यू:** साथी का विश्लेषण पढ़ें → पूछें: "यहाँ \'क्यों\' उत्तर मिला या केवल \'क्या\'?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_01_012', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो **नोड 002 (कथानक)** और **नोड 006 (मुख्य विषय)** को दोबारा पढ़ें — तथ्य और.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'लेखक ने क्या लिखा है\' (what the author wrote)** और **\'लेखक क्या कहना चाहता है\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 1\' का कथानक — \'अंतरा भाग-1 — पाठ 1\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो **नोड 002 (कथानक)** और **नोड 006 (मुख्य विषय)** को दोबारा पढ़ें — तथ्य और आशय के स्रोत.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **\'लेखक ने क्या लिखा है\' (what the author wrote)** और **\'लेखक क्या कहना चाहता है\' (what the author.' }
          ],
            remediations: { 'what-the-author-wrote-what': { steps: ['**चरण 1 — अंतर स्पष्ट करें:** छात्र को दो वाक्य दें: "आकाश नीला है" (तथ्य) और "आकाश की नीलिमा शांति का प्रतीक है".', '**चरण 2 — कीवर्ड पहचान सिखाएँ:** वस्तुनिष्ठ के लिए **कौन, क्या, कब, कहाँ, कितना**; आशय-सूचक के लिए **क्यों, कैसे, क्या.', '**चरण 3 — मॉडल उत्तर दिखाएँ:** एक ही अंश पर दोनों प्रकार के प्रश्नों के आदर्श उत्तर साथ रखें; छात्र से अंतर ढूँढ़ने को.', '**चरण 4 — अभ्यास कराएँ:** एक छोटा गद्यांश देकर 2-2 प्रश्न बनवाएँ और उत्तर लिखवाएँ; तुरंत फीडबैक दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
