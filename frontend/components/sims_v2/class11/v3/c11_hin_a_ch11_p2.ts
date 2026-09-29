import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch11_p2: SimDef = {
    id: 'v3_c11_hin_a_ch11_p2',
    title: 'पाठ 11 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, वर्गीकरण (पूरक/विरोधी/विस्तारक), मुख्य विषय से संबंध.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 11 · Part 2/3',
    chapters: ['c11_hin_a_ch11'],
    nodeIds: ['c11_hin_a_cbse_11_007', 'c11_hin_a_cbse_11_008', 'c11_hin_a_cbse_11_009', 'c11_hin_a_cbse_11_010', 'c11_hin_a_cbse_11_011', 'c11_hin_a_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'अंतरा भाग-1 — पाठ 11\' में अंतरा-भाग-1-—-पाठ-11 जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — गौण विषय', text: '\'अंतरा भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 11 — गौण', 'पाठ 11 — साहित्यिक', 'पाठ 11 — पदावली', 'पाठ 11 — व्याकरण', 'पाठ 11 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 2/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.', answer: '11 -', options: ['11 -', '11 - -'] },
            { id: 's2', label: '11 - -', prompt: 'Which idea is this? — \'अंतरा भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '11 - -', options: ['11 - -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_007', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 006 (मुख्य विषय और संदेश)** के \'मास्टरी क्राइटेरिया\' की.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "गौण विषय = कम शब्दों में आने वाला विषय" या "गौण विषय = कोई भी छोटा प्रसंग"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 006 (मुख्य विषय और संदेश)** के \'मास्टरी क्राइटेरिया\' की जाँच करें.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "गौण विषय = कम शब्दों में आने वाला विषय" या "गौण विषय = कोई भी छोटा प्रसंग"। **वास्तविकता**: गौण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़वाएँ** — छात्र से कहें: "पाठ 11 को केवल उन प्रसंगों के लिए पढ़ो जो नायिका/नायक के *सीधे* संघर्ष से.', '**विषय निष्कर्षण** — प्रत्येक घेरे हुए प्रसंग के लिए पूछो: "यह प्रसंग किस बड़ी सामाजिक/सांस्कृतिक/मनोवैज्ञानिक सच्चाई.', 'एक वाक्य में लिखो।" (यही गौण विषय है)। 3.', '**संबंध-मानचित्रण** — एक टेबल बनवाओ: कॉलम 1: गौण विषय, कॉलम 2: पाठ संदर्भ, कॉलम 3: मुख्य विषय से संबंध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_008', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके: **NCERT कक्षा 9-10 हिंदी पाठ्यपुस्तक (कृतिका/क्षितिज) के काव्य खंड** से किन्हीं.',
          misconception: '**विशिष्ट भ्रम:** छात्र **रूपक (Metaphor)** और **प्रतीक (Symbol)** को एक मान लेते हैं। वे "समय नदी है" (रूपक) और "नदी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: **NCERT कक्षा 9-10 हिंदी पाठ्यपुस्तक (कृतिका/क्षितिज) के काव्य खंड** से किन्हीं ५ कविताएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **रूपक (Metaphor)** और **प्रतीक (Symbol)** को एक मान लेते हैं। वे "समय नदी है" (रूपक) और "नदी समय का प्रतीक है".' }
          ],
            remediations: { 'metaphor-symbol': { steps: ['**दो वाक्य लिखवाएँ:** (अ) "क्रोध ज्वालामुखी है" (रूपक) — पूछें: यहाँ क्रोध को ज्वालामुखी **कहा** गया है या **सूचित**.', '(ब) एक लघु कथा दें जहाँ \'ज्वालामुखी\' शब्द ३ बार आए पर \'क्रोध\' शब्द कभी न आए — पूछें: यहाँ ज्वालामुखी क्या कर रहा है?', '**तुलना सारणी** बनवाएँ: स्तंभ — "सीधी घोषणा (रूपक)" vs "बार-बार सूचना (प्रतीक)"। ३.', '**पाठ से उद्धरण** छाँटने को कहें: एक रूपक, एक प्रतीक — फिर दोनों की कार्य-प्रणाली मौखिक रूप से समझवाएँ। ४.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_009', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **c11_hin_a_cbse_11_008 (बिंब और रूपक)** के \'रूपक के दो अंग: उपमान और उपमेय\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** और **\'विरोधाभास अलंकार/ऑक्शीमोरॉन\' (Oxymoron)** को एक ही समझ बैठते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_a_cbse_11_008 (बिंब और रूपक)** के \'रूपक के दो अंग: उपमान और उपमेय\' तथा \'बिंब.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** और **\'विरोधाभास अलंकार/ऑक्शीमोरॉन\' (Oxymoron)** को एक ही समझ बैठते हैं। वे "मधुर.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**भेद स्पष्ट करें:** छात्र को दो कॉलम बनाने को कहें — बाएँ **ऑक्शीमोरॉन** (पदबंध, 2 शब्द, क्षणिक प्रभाव), दाएँ.', '**\'क्यों\' पूछें:** हर विरोधाभास के लिए पूछें — "इस विरोध के पीछे कौन सा सत्य छिपा है?" यदि छात्र उत्तर न दे पाए, तो वह.', '**प्रतीक के लिए \'मैपिंग\' अभ्यास:** एक टेबल बनवाएँ: कॉलम 1 — पाठ में वस्तु का शाब्दिक वर्णन; कॉलम 2 — वस्तु के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_010', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **कक्षा 10 की "शब्द और अर्थ" इकाई** (विशेषकर लक्षणा-व्यंजना) दोहराएँ — NCERT.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **मुख्य शब्द = पाठ में सबसे अधिक बार आने वाले शब्द (फ्रीक्वेंसी-आधारित)**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **कक्षा 10 की "शब्द और अर्थ" इकाई** (विशेषकर लक्षणा-व्यंजना) दोहराएँ — NCERT कक्षा 10.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **मुख्य शब्द = पाठ में सबसे अधिक बार आने वाले शब्द (फ्रीक्वेंसी-आधारित)**। **गलत तर्क:** वे शब्द-गणना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को एक छोटा अनुच्छेद (50 शब्द) दें और कहें: "केवल 3 शब्द चुनो जो इस अनुच्छेद का **प्राण** हों — बार-बार.', '**चरण 2:** उसके चुने शब्दों पर पूछें: "अगर यह शब्द हटा दें तो अनुच्छेद का अर्थ कितना बदलेगा?', '1-10 के पैमाने पर बताओ।" — इससे **कीनेस (केंद्रीयता)** समझ आएगी। 3.', '**चरण 3:** पाठ 11 के किसी एक पैराग्राफ में **कॉलोकेशन (सह-उपस्थिति)** ढूँढ़ने को कहें: "कौन से दो शब्द बार-बार साथ आते.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_011', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_11_010 (पदावली: मुख्य शब्द)** पर लौटें और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ **\'कठिन/तत्सम शब्दों की पहचान करना\'** या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_11_010 (पदावली: मुख्य शब्द)** पर लौटें और **तत्सम/तद्भव/देशज.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पाठ में भाषा-प्रयोग\' का अर्थ **\'कठिन/तत्सम शब्दों की पहचान करना\'** या **\'अलंकार ढूँढ़ना\'** मात्र.' }
          ],
            remediations: { '10': { steps: ['**चरण 1:** छात्र को पाठ 11 के **एक ही प्रसंग के दो रूपांतर** दिखाएँ — मूल पाठ और उसका \'सामान्यीकृत\' संस्करण (जहाँ.', 'यह वाक्य छोटा क्यों?" — **\'क्यों\' का अभ्यास** भ्रांति तोड़ता है। **चरण 4:** बोर्ड पैटर्न के **\'आशय स्पष्ट कीजिए\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_012', difficulty: 'standard',
          question: '\'अंतरा भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ, तो **c11_hin_a_cbse_11_002 (कथानक)** और **c11_hin_a_cbse_11_010 (पदावली)**.',
          misconception: '**भ्रांति:** "आशय-सूचक प्रश्नों के उत्तर \'अनुमान\' (guess) होते हैं, इसलिए जो मन में आए लिख दो — गलत नहीं हो सकता।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-1 — पाठ 11\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-1 — पाठ 11\' का कथानक — \'अंतरा भाग-1 — पाठ 11\' — अंतरा भाग-1 का पाठ। पाठ का', '\'अंतरा भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ, तो **c11_hin_a_cbse_11_002 (कथानक)** और **c11_hin_a_cbse_11_010 (पदावली)** को दोहराएँ.',
                  misconception: '**भ्रांति:** "आशय-सूचक प्रश्नों के उत्तर \'अनुमान\' (guess) होते हैं, इसलिए जो मन में आए लिख दो — गलत नहीं हो सकता।" **वास्तविकता:** यह.' }
          ],
            remediations: { 'guess': { steps: ['**चरण 1:** छात्र को एक छोटा गद्यांश दें जिसमें एक चरित्र की क्रिया और उसके विपरीत भाव का संकेत हो (जैसे: "वह.', 'कैसे पता चला?" — छात्र जब "आँखें नम थीं" बोले, तो रेखांकित करें: **यही साक्ष्य है, यही अनुमान का आधार है**। **चरण 3:**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
