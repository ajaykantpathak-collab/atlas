import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch05_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'इस नोड में केवल **गौण विषयों की पहचान, वर्गीकरण (समानांतर/विरोधी/विस्तारक), और मुख्य विषय.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c9_hin_ga_ch05'],
    nodeIds: ['c9_hin_ga_cbse_05_007', 'c9_hin_ga_cbse_05_008', 'c9_hin_ga_cbse_05_009', 'c9_hin_ga_cbse_05_010', 'c9_hin_ga_cbse_05_011', 'c9_hin_ga_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'रीढ़ की हड्डी\' में एकांकी, महिला, विवाह, स्वतंत्रता जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ 5 के किसी एक पात्र (नायक/सहायक) को चुनकर उसके लिए एक **आशय-सूचक प्रश्न** बनाइए जिसका उत्तर देने के लिए **कम से कम तीन अलग-अलग प्रसंगों/पैराग्राफ** से.',
        options: ['**Expected Answer Criteria:** 1', 'Inference means guessing', 'right answer'],
        answer: '**Expected Answer Criteria:** 1',
        hook: '**"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer" and they can write any.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: '\'रीढ़ की हड्डी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_05_012', title: 'पाठ 5 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'रीढ़ की हड्डी\' के तथ्य: रचनाकार जगदीश चंद्र माथुर, विषय महिला-जीवन की समस्या।',
            decisions: [{ prompt: 'पाठ 5 के आधार पर \'वस्तुनिष्ठ प्रश्न\' और \'आशय-सूचक प्रश्न\' की परिभाषा लिखिए। दोनों में मूलभूत अंतर क्या है?', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से लिखा होता है (तथ्य.' },
                { text: 'questions asked from the text', outcome: 'Not quite — **"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer".', reveals: 'inference-means-guessing' },
                { text: 'short vs long answer', outcome: 'Not quite — **"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer".', reveals: 'inference-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_007', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका हुआ महसूस हो, तो **c9_hin_ga_cbse_05_006 (मुख्य विषय और संदेश)** के.',
          misconception: '**भ्रांति:** "गौण विषय = उपकथा (Sub-plot) या छोटी घटनाएँ।" **वास्तविकता:** उपकथा **कथानक संरचना** का अंग है (घटनाओं का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' के गौण विषय',
                  options: ['\'रीढ़ की हड्डी\' के गौण विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c9_hin_ga_cbse_05_006 (मुख्य विषय और संदेश)** के \'WORKED_EXAMPLE_1\' को.',
                  misconception: '**भ्रांति:** "गौण विषय = उपकथा (Sub-plot) या छोटी घटनाएँ।" **वास्तविकता:** उपकथा **कथानक संरचना** का अंग है (घटनाओं का क्रम), जबकि गौण विषय.' }
          ],
            remediations: { 'sub-plot': { steps: ['**पुनः स्पष्टीकरण:** छात्र के साथ बैठकर एक परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) लें — मुख्य विषय पहचानें, फिर.', '**भेदाभ्यास:** दो कॉलम बनाएँ — बाएँ \'घटना/उपकथा\', दाएँ \'गौण विषय\'। 5-6 उदाहरण देकर मिलान करवाएँ (उदाहरण: घटना \'नायक.', '**प्रमाण-आधारित लेखन:** छात्र से कहें: "अब जो गौण विषय तुमने पहचाना, उसके लिए कहानी से **एक वाक्य/संवाद** ढूँढो जो उसे.', '**संबंध-मानचित्र:** मुख्य विषय को केंद्र में रखकर माइंड-मैप बनवाएँ जहाँ तीरों पर लिखवाएँ: \'समर्थन करता है\', \'चुनौती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_008', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Review "उपमा अलंकार" (Simile) definition and the 5 इंद्रियाँ (senses) with Hindi.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **हर तुलनात्मक वाक्य रूपक होता है**। वे "सी", "जैसा", "जैसे" वाले वाक्यों को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' में बिंब (imagery)',
                  options: ['\'रीढ़ की हड्डी\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review "उपमा अलंकार" (Simile) definition and the 5 इंद्रियाँ (senses) with Hindi vocabulary — this.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि **हर तुलनात्मक वाक्य रूपक होता है**। वे "सी", "जैसा", "जैसे" वाले वाक्यों को भी रूपक लिख देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**स्पष्ट विभाजन:** बोर्ड पर दो कॉलम बनाएँ — बाएँ: "उपमा (सी/जैसा/जैसे)" , दाएँ: "रूपक (है/था/हैं)"। 5-5 वाक्य लिखवाएँ.', '**Tenor-Vehicle खेल:** एक वस्तु दें (जैसे: पुस्तक) — छात्र को 3 रूपक बनाने को कहें जहाँ Tenor=पुस्तक, Vehicle=अलग-अलग.', '**बिंब-इंद्रिय मिलान:** 10 छोटे वाक्य दें (जैसे: "बारिश की बूँदें टिन की छत पर टप-टप गिरीं") — छात्र इंद्रिय लिखें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_009', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **c9_hin_ga_cbse_05_008 (बिंब और रूपक)** के कार्य-उदाहरण दोहराएँ: किसी बिंब.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर विरोधी लगने वाला वाक्य विरोधाभास है** (जैसे "वह अमीर गरीब है") और **हर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' में विरोधाभास',
                  options: ['\'रीढ़ की हड्डी\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c9_hin_ga_cbse_05_008 (बिंब और रूपक)** के कार्य-उदाहरण दोहराएँ: किसी बिंब को प्रतीक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **हर विरोधी लगने वाला वाक्य विरोधाभास है** (जैसे "वह अमीर गरीब है") और **हर बार-बार आने वाली वस्तु.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**विरोधाभास के लिए:** छात्र को तीन वाक्य दें — (क) विरोधी शब्द, (ख) साधारण विरोधी स्थिति, (ग) सच्चा विरोधाभास। पूछें.', 'ऐसा भी हो सकता है\' सोचने पर मजबूर करता है?"** केवल (ग) वही करेगा। 2.', '**प्रतीक के लिए:** पाठ से एक वस्तु चुनें (जैसे \'दरवाज़ा\')। पूछें: **"अगर लेखक दरवाज़े की जगह \'खिड़की\' लिख देता तो क्या.', '**अभ्यास:** पाठ के दो नए प्रसंग दें; छात्र से **\'क्यों\' और \'क्या निरूपित करता है\'** लिखवाएँ, केवल नाम न लिखवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_010', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो पाठ 5 के **कथानक संरचना (नोड 002)** और **मुख्य विषय (नोड 006)** को दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** "पदावली विश्लेषण का अर्थ पाठ के \'कठिन शब्दों\' की सूची बनाकर उनके शब्दकोश अर्थ लिखना है।" **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' की पदावली',
                  options: ['\'रीढ़ की हड्डी\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो पाठ 5 के **कथानक संरचना (नोड 002)** और **मुख्य विषय (नोड 006)** को दोबारा पढ़ें — शब्द.',
                  misconception: '**विशिष्ट भ्रांति:** "पदावली विश्लेषण का अर्थ पाठ के \'कठिन शब्दों\' की सूची बनाकर उनके शब्दकोश अर्थ लिखना है।" **गलत तर्क का स्रोत:** मध्य.' }
          ],
            remediations: { 'class-6-8-static-label': { steps: ['**चरण 1 — शब्द को \'लेबल\' से मुक्त करें:** छात्र से कहें: "इस शब्द को वाक्य से निकालकर अकेले बोलो — क्या अर्थ बदल गया?', 'अब इसे विपरीत भाव वाले वाक्य में डालो — क्या यह अब भी फिट बैठता है?" इससे शब्द की **संदर्भ-निर्भरता** प्रत्यक्ष होती.', '**चरण 2 — \'पर्यायवाची परीक्षण\' (Synonym Substitution Test):** मूल शब्द के 3 पर्यायवाची लिखवाएं। प्रत्येक को मूल वाक्य.', 'क्या नया जुड़ा?" छात्र स्वयं खोजेगा कि **कोई दो शब्द पूर्णतः समान नहीं होते**। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_011', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' में भाषा-प्रयोग — जगदीश चंद्र माथुर ने कैसे शब्द, वाक्य और शैली.',
          hint: 'अगर फँस जाएँ तो **पाठ 5 के पात्र-संवाद (नोड 004, 005)** दोबारा पढ़ें और पूछें: "यह पात्र.',
          misconception: 'छात्र समझते हैं कि **\'भाषा-प्रयोग\' का अर्थ \'कठिन/साहित्यिक शब्दों की पहचान\' है** — इसलिए वे पाठ में \'अनुप्रास\', \'यमक\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' में भाषा-प्रयोग',
                  options: ['\'रीढ़ की हड्डी\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर फँस जाएँ तो **पाठ 5 के पात्र-संवाद (नोड 004, 005)** दोबारा पढ़ें और पूछें: "यह पात्र *ऐसे*.',
                  misconception: 'छात्र समझते हैं कि **\'भाषा-प्रयोग\' का अर्थ \'कठिन/साहित्यिक शब्दों की पहचान\' है** — इसलिए वे पाठ में \'अनुप्रास\', \'यमक\', \'उपमा\' जैसे अलंकार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ 5 का **कोई एक संवाद-प्रसंग** दें (5-6 पंक्तियाँ)। 2.', 'कहें: "इसे **जोर से तीन बार पढ़ो** — पहली बार अर्थ के लिए, दूसरी बार **किसने-किससे-क्या-कहा** के लिए, तीसरी बार.', 'अब एक **तालिका** बनवाएँ: कॉलम 1 — प्रयुक्त शब्द/रचना, कॉलम 2 — सम्भावित विकल्प, कॉलम 3 — लेखक ने *यही* क्यों चुना?', 'कॉलम 4 — पाठक पर प्रभाव। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_012', difficulty: 'standard',
          question: '\'रीढ़ की हड्डी\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, re-read Node 002 (कथानक) for event sequence, Node 004 (नायक) for character.',
          misconception: '**"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer" and they can write any.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'रीढ़ की हड्डी\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'रीढ़ की हड्डी\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'रीढ़ की हड्डी\' का कथानक', '\'रीढ़ की हड्डी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read Node 002 (कथानक) for event sequence, Node 004 (नायक) for character evidence, and.',
                  misconception: '**"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer" and they can write any personal opinion.' }
          ],
            remediations: { 'inference-means-guessing': { steps: ['The "Highlighter Drill".** Give the student a fresh page of the text.', 'The "Because... therefore" Oral Rehearsal.** Before writing, student must say aloud: "Clue 1 says X. Clue 2 says Y.', 'The "Quote Diet".** Allow maximum **one short quote (≤ 8 words)** per answer. Rest must be paraphrase + analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_05_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer" and they can write any.',
          parts: [
                { id: 'a', prompt: 'पाठ 5 के किसी एक पात्र (नायक/सहायक) को चुनकर उसके लिए एक **आशय-सूचक प्रश्न** बनाइए जिसका उत्तर देने के लिए **कम से कम तीन अलग-अलग प्रसंगों/पैराग्राफ** से.', answer: '**Expected Answer Criteria:** 1',
                  options: ['**Expected Answer Criteria:** 1', 'Inference means guessing', 'right answer', 'मुझे लगता है नायक दुखी था क्योंकि'],
                  hint: 'If stuck, re-read Node 002 (कथानक) for event sequence, Node 004 (नायक) for character evidence, and.',
                  misconception: '**"Inference means guessing."** Students believe *ashay-suchak* questions have no "right answer" and they can write any personal opinion.' }
          ],
            remediations: { 'inference-means-guessing': { steps: ['The "Highlighter Drill".** Give the student a fresh page of the text.', 'The "Because... therefore" Oral Rehearsal.** Before writing, student must say aloud: "Clue 1 says X. Clue 2 says Y.', 'The "Quote Diet".** Allow maximum **one short quote (≤ 8 words)** per answer. Rest must be paraphrase + analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
