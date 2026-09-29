import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_ks_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_ks_ch12_p1: SimDef = {
    id: 'v3_c10_hin_ks_ch12_p1',
    title: 'पाठ 12 · Part 1/3',
    subtitle: 'यह नोड केवल **कवि परिचय (जीवन-परिचय, युग, प्रमुख रचनाएँ) और रचना-पृष्ठभूमि (काल.',
    classLevel: 10, subject: 'hin_ks', topic: 'पाठ 12 · Part 1/3',
    chapters: ['c10_hin_ks_ch12'],
    nodeIds: ['c10_hin_ks_cbse_12_001', 'c10_hin_ks_cbse_12_002', 'c10_hin_ks_cbse_12_003', 'c10_hin_ks_cbse_12_004', 'c10_hin_ks_cbse_12_005', 'c10_hin_ks_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्षितिज भाग-2 खोलिए और पाठ 12 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 12 — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_ks_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 12 — कवि', 'पाठ 12 — पद्यांश-वार', 'पाठ 12 — काव्य-संरचना', 'पाठ 12 — केंद्रीय', 'पाठ 12 — छंद', 'पाठ 12 — साहित्यिक'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_ks_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 12 · Part 1/3', spots: [
            { id: 's1', label: '12 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ.', answer: '12 -', options: ['12 -', '12 - -', '12 -'] },
            { id: 's2', label: '12 - -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.', answer: '12 - -', options: ['12 - -', '12 -', '12 -'] },
            { id: 's3', label: '12 -', prompt: 'Which idea is this? — \'क्षितिज भाग-2 — पाठ 12\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.', answer: '12 -', options: ['12 -', '12 -', '12 - -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_ks_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 12 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 12 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 12 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'यदि अटके तो **कक्षा 9 की हिंदी पुस्तक (क्षितिज/कृतिका) के "छायावाद" परिचय पृष्ठ** दोबारा.',
          misconception: '**सबसे घातक भ्रम:** "कवि परिचय = जन्म/मृत्यु तिथि + रचनाओं की सूची रट लेना।" **वास्तविकता:** बोर्ड परीक्षा में कवि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'क्षितिज भाग-2 — पाठ 12\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो **कक्षा 9 की हिंदी पुस्तक (क्षितिज/कृतिका) के "छायावाद" परिचय पृष्ठ** दोबारा पढ़ें.',
                  misconception: '**सबसे घातक भ्रम:** "कवि परिचय = जन्म/मृत्यु तिथि + रचनाओं की सूची रट लेना।" **वास्तविकता:** बोर्ड परीक्षा में कवि परिचय **तथ्यों (facts).' }
          ],
            remediations: { 'facts': { steps: ['**तथ्य-पत्रक (fact-sheet) बनाएं:** कवि का नाम, युग, 3 प्रमुख रचनाएँ, 3 जीवन-घटनाएँ — एक शीट पर। 2.', '**पुल बनाएं (bridge-building):** कविता की 3 प्रमुख पंक्तियाँ बाईं ओर लिखें, दाईं ओर प्रत्येक के सामने वह **जीवन-घटना**.', '**मौखिक अभ्यास:** किसी साथी को समझाएं — "यह पंक्ति *इसलिए* आई क्योंकि कवि ने *वह* झेला था।" 4.', '**लिखित मॉक-उत्तर:** 60 सेकंड में 3-लाइन का उत्तर लिखें: **बिंदु → जीवन-प्रमाण → कविता पर प्रभाव**। इसे रोज़ दोहराएं जब.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_002', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का.',
          hint: 'यदि भाव पहचानने में कठिनाई हो तो कवि के जीवन के उस घटना को याद कीजिए जिस दौरान ऐसी भावना.',
          misconception: 'छात्र अक्सर stanza के भावार्थ निकालते समय केवल पहले और अंतिम शब्द पर फोकस करके भाव लगा लेते हैं—for example, stanza में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ',
                  options: ['\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', '\'क्षितिज भाग-2 — पाठ 12\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि भाव पहचानने में कठिनाई हो तो कवि के जीवन के उस घटना को याद कीजिए जिस दौरान ऐसी भावना व्यक्त की.',
                  misconception: 'छात्र अक्सर stanza के भावार्थ निकालते समय केवल पहले और अंतिम शब्द पर फोकस करके भाव लगा लेते हैं—for example, stanza में "रात आई, अंधेरा फैल.' }
          ],
            remediations: { 'stanza-for-example': { steps: ['छात्र को बताइए कि भावार्थ निकालना जैसे कोई कहानी सुनना है—हर पंक्ति को क्रम से सुनिए और मन में एक भाव का ग्राफ बनाइए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_003', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'अगर मात्रा गिनने में अटके → **\'वर्ण-विचार\' (Class 9 व्याकरण) का स्वर-भेद चार्ट** दोहराएँ.',
          misconception: '**छात्र मानते हैं: "पद्य-विन्यास = तुकबंदी (राइम स्कीम) + पंक्ति तोड़ना।"** **वास्तविकता**: हिंदी काव्य में **तुक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में',
                  options: ['\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 12\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'अगर मात्रा गिनने में अटके → **\'वर्ण-विचार\' (Class 9 व्याकरण) का स्वर-भेद चार्ट** दोहराएँ — विशेषकर.',
                  misconception: '**छात्र मानते हैं: "पद्य-विन्यास = तुकबंदी (राइम स्कीम) + पंक्ति तोड़ना।"** **वास्तविकता**: हिंदी काव्य में **तुक (प्रास) अनिवार्य नहीं**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १**: छात्र से **कोई भी २ पंक्तियाँ जोर-जोर से पढ़वाओ** — पूछो: "कहाँ रुके?', 'क्यों रुके?" → यति/विराम की व्यावहारिक पहचान। **चरण २**: उन्हीं पंक्तियों की **मात्रा गिनवाओ** (उंगलियों पर: अ=१, आ=२).', 'विराम?" → गति-नियंत्रण की समझ। **चरण ४**: अंत में **कवि का इरादा** पूछो: "कवि ने यहाँ यति क्यों डाली?', 'गति मंद क्यों रखी?" — संरचना→भाव संबंध स्थापित।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_004', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 12\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ) दोहराएँ — बिना अर्थ समझे रस नहीं.',
          misconception: 'छात्र \'केंद्रीय भाव\' और \'रस\' को एक ही मान लेते हैं और परीक्षा में पूछे जाने पर \'वीर रस\' के स्थान पर \'देशभक्ति\' या \'करुण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 12\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'क्षितिज भाग-2 — पाठ 12\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_12_002 (पद्यांश-वार भावार्थ) दोहराएँ — बिना अर्थ समझे रस नहीं पहचाना जा.',
                  misconception: 'छात्र \'केंद्रीय भाव\' और \'रस\' को एक ही मान लेते हैं और परीक्षा में पूछे जाने पर \'वीर रस\' के स्थान पर \'देशभक्ति\' या \'करुण रस\' के स्थान पर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — किसी फिल्म/सीरियल का एक दृश्य याद करो जहाँ तुम्हें तेज अनुभूति हुई (डर, हँसी, गर्व)। चरण 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_005', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 12\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ.',
          hint: 'यदि मात्रा गिनने में अटकें: **\'मात्रा-चक्र\' अभ्यास** करें — वर्णमाला के प्रत्येक वर्ण को.',
          misconception: '**सबसे घातक भ्रम:** "छंद का अर्थ केवल अंतिम शब्दों की तुक (rhyme) मिलाना है।" **वास्तविकता:** CBSE बोर्ड में हर साल 2-3.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 12\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे',
                  options: ['\'क्षितिज भाग-2 — पाठ 12\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि मात्रा गिनने में अटकें: **\'मात्रा-चक्र\' अभ्यास** करें — वर्णमाला के प्रत्येक वर्ण को लिखें.',
                  misconception: '**सबसे घातक भ्रम:** "छंद का अर्थ केवल अंतिम शब्दों की तुक (rhyme) मिलाना है।" **वास्तविकता:** CBSE बोर्ड में हर साल 2-3 अंक का प्रश्न आता.' }
          ],
            remediations: { 'rhyme-cbse-2-3': { steps: ['**मात्रा-गणना का दैनिक अभ्यास:** छात्र से कहें — रोज़ एक पंक्ति (अखबार की सुर्खी, गाने की लाइन) लें, वर्ण-विच्छेद करें.', '**गण-तालिका को कंठस्थ नहीं, समझें:** 8 गण (य/र/स/त/ज/भ/न/म) के **ध्वनि-प्रभाव** याद करें — य(गु-ल-गु) = गंभीर.', '**यति-स्थान चिह्नित करना सिखाएँ:** पंक्ति पढ़ते समय जहाँ स्वाभाविक साँस रुके, वहाँ \'/\' लगाएँ — फिर मात्राएँ गिनकर.', '**पिछले नोड (c10_hin_ks_cbse_12_003 काव्य-संरचना) से जुड़ें:** वहाँ पढ़े \'पद-लालित्य\' और \'गति\' को यहाँ \'गण-लय\' से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_ks_cbse_12_006', difficulty: 'standard',
          question: '\'क्षितिज भाग-2 — पाठ 12\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 12\' का केंद्रीय.',
          hint: 'यदि अटके तो c10_hin_ks_cbse_12_003 (पद्य-विन्यास) और c10_hin_ks_cbse_12_004 (केंद्रीय भाव.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"उपमा और रूपक में केवल \'जैसे/सा\' शब्द का फर्क है, बाकी दोनों एक ही चीज हैं"**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'क्षितिज भाग-2 — पाठ 12\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 12\' का केंद्रीय भाव और संदेश',
                  options: ['\'क्षितिज भाग-2 — पाठ 12\' का मुख्य विषय — \'क्षितिज भाग-2 — पाठ 12\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'क्षितिज भाग-2 — पाठ 12\' का कथानक — \'क्षितिज भाग-2 — पाठ 12\' — क्षितिज भाग-2 का पाठ। पाठ', '\'क्षितिज भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में'],
                  hint: 'यदि अटके तो c10_hin_ks_cbse_12_003 (पद्य-विन्यास) और c10_hin_ks_cbse_12_004 (केंद्रीय भाव और रस) को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"उपमा और रूपक में केवल \'जैसे/सा\' शब्द का फर्क है, बाकी दोनों एक ही चीज हैं"** — इसलिए वे रूपक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — दृश्य चार्ट बनाएँ:** एक टेबल बनाएँ जिसमें दो कॉलम हों — "उपमा" और "रूपक"; हर पंक्ति के लिए तीन पंक्तियाँ.', '**चरण 2 — \'जैसे\' शब्द का शिकार खेलें:** किसी भी कविता/पाठ से 10 पंक्तियाँ चुनें; प्रत्येक में \'जैसे/सा/वत्/समान\' शब्द.', '**चरण 3 — विधान-लेखन अभ्यास:** बोर्ड के पिछले 5 वर्षों के प्रश्नपत्रों से अलंकार-आधारित आशय-स्पष्टीकरण प्रश्न निकालें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
