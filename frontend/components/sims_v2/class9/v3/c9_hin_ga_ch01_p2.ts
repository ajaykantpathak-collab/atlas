import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch01_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'यह नोड केंद्रीय-भाव तक सीमित — मुख्य-विषय-विस्तार नोड 8 में।',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c9_hin_ga_ch01'],
    nodeIds: ['c9_hin_ga_cbse_01_007', 'c9_hin_ga_cbse_01_008', 'c9_hin_ga_cbse_01_009', 'c9_hin_ga_cbse_01_010', 'c9_hin_ga_cbse_01_011', 'c9_hin_ga_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '**तुम्हारे लिए:** इस नोड में तुम कहानी-का-केंद्र, दोहरी-प्रेरणा और आंदोलन-दर्पण सीखोगे। **पुनःस्मरण:** नोड 6.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'बोर्ड परीक्षा में एक छात्र ने आशय-सूचक प्रश्न का उत्तर दिया: "लेखक गरीबी की आलोचना कर रहा है क्योंकि पात्र गरीब हैं।" इस उत्तर को 1/3 अंक मिले। मूल्यांकन.',
        options: ['**Correct Answer:** कमी 1: **सामान्यीकरण (Over-generalization)**', 'गरीबी की आलोचना', 'पात्र गरीब हैं'],
        answer: '**Correct Answer:** कमी 1: **सामान्यीकरण (Over-generalization)**',
        hook: '**Misconception:** "आशय-सूचक प्रश्नों के उत्तर \'पाठ के बाहर\' से आते हैं या ये केवल \'अनुमान\' (guesswork) होते हैं।".',
    },
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'केंद्रीय-भाव — स्वतंत्रता-सूत्र-1 + दोहरी-धुरी-2 + सीधापन-कीमत-1 + आंदोलन-दर्पण-8 + तीन-घेरे-1: स्वतंत्रता[\'सहज-नहीं-बार-बार-संघर्ष-सात-मुकाबले-हर-जीत-अस्थायी-आज़ादी-फिर-कमानी-1-सूत्र\'].', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_01_012', title: 'पाठ 1 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'दो बैलों की कथा\' के तथ्य: रचनाकार प्रेमचंद, विषय दो बैलों हीरा-मोती की कथा।',
            decisions: [{ prompt: 'पाठ 1 के संदर्भ में, \'वस्तुनिष्ठ प्रश्न\' और \'आशय-सूचक प्रश्न\' के बीच मूलभूत अंतर क्या है? संक्षेप में लिखिए।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न पाठ में स्पष्ट रूप से लिखे तथ्यों (तारीख, नाम,', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न पाठ में स्पष्ट रूप से लिखे तथ्यों (तारीख, नाम, घटना) की जाँच.' },
                { text: 'Objective questions are short and inferential are long', outcome: 'Not quite — **Misconception:** "आशय-सूचक प्रश्नों के उत्तर \'पाठ के बाहर\' से आते हैं या ये केवल \'अनुमान\'.', reveals: 'misconception-guesswork-why-it-happens' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_01_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_007', difficulty: 'standard',
          question: 'केंद्रीय-भाव — स्वतंत्रता-सूत्र-1 + दोहरी-धुरी-2 + सीधापन-कीमत-1.',
          hint: 'यदि अटका हुआ महसूस हो तो: सूत्र-1 + धुरी-1 + दर्पण-1 — बार-बार-संघर्ष, दो-ईंधन-एक-इंजन.',
          misconception: 'छात्र \'कहानी-केवल-पशु-प्रेम-की\' समझते हैं — परोक्ष-अर्थ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय-भाव — स्वतंत्रता-सूत्र-1 + दोहरी-धुरी-2 + सीधापन-कीमत-1 + आंदोलन-दर्पण-8 +',
                  options: ['केंद्रीय-भाव — स्वतंत्रता-सूत्र-1 + दोहरी-धुरी-2 + सीधापन-कीमत-1 + आंदोलन-दर्पण-8 +', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद के चार निर्णायक तथ्य (1880 में लमही में', '\'दो बैलों की कथा\' का कथानक', '\'दो बैलों की कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो: सूत्र-1 + धुरी-1 + दर्पण-1 — बार-बार-संघर्ष, दो-ईंधन-एक-इंजन.',
                  misconception: 'छात्र \'कहानी-केवल-पशु-प्रेम-की\' समझते हैं — परोक्ष-अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) सूत्र-1 — स्वतंत्रता-सहज-नहीं-बार-बार-संघर्ष-1-वक्तव्य। (2) धुरी-2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_008', difficulty: 'standard',
          question: '\'दो बैलों की कथा\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'अगर अटके: कक्षा 8 के "उपमा/रूपक/उत्प्रेक्षा" नोट्स दोबारा देखो, फिर **केवल अंतर** पर.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **हर तुलना रूपक है** और **हर वर्णन बिंब है**। उदाहरण: "फूल सुंदर है" — छात्र कहते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दो बैलों की कथा\' में बिंब (imagery)',
                  options: ['\'दो बैलों की कथा\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद के चार निर्णायक तथ्य (1880 में लमही में', '\'दो बैलों की कथा\' का कथानक', '\'दो बैलों की कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके: कक्षा 8 के "उपमा/रूपक/उत्प्रेक्षा" नोट्स दोबारा देखो, फिर **केवल अंतर** पर ध्यान दो.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **हर तुलना रूपक है** और **हर वर्णन बिंब है**। उदाहरण: "फूल सुंदर है" — छात्र कहते हैं "दृश्य बिंब".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**इंद्रिय-कार्ड बनाओ:** 5 कार्ड (👁️👂👃🖐️👅) — कविता पढ़ते समय हर बिंब-वाक्य पर सही कार्ड रखो, बोलो "यह स्पर्श बिंब.', '**रूपक-परिवर्तन अभ्यास:** 5 उपमा-वाक्य लो ("वह चीते जैसा तेज़ है") → "जैसे/जैसी" हटाकर रूपक बनाओ ("वह चीता है") → पूछो.', '**उपमान-तुलना शीट:** एक विषय (जैसे "समय") के लिए 5 उपमान लिखो (नदी, चोर, डॉक्टर, घड़ी, पेड़) — हर एक का **अलग प्रभाव**.', '**बोर्ड-शैली प्रश्न:** "कवि ने X बिंब/रूपक क्यों चुना?" — उत्तर 3 वाक्यों में: (i) क्या चित्र बना, (ii) कौन सी भावना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_009', difficulty: 'standard',
          question: '\'दो बैलों की कथा\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि फँस जाएँ तो **c9_hin_ga_cbse_01_008** के कार्यित उदाहरण (Worked Examples) दोहराएं.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **ऑक्सीमोरॉन (Oxymoron)** और **पैराडॉक्स (Paradox)** को एक मान लेते हैं। वे "मधुर कड़वाहट".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दो बैलों की कथा\' में विरोधाभास',
                  options: ['\'दो बैलों की कथा\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद के चार निर्णायक तथ्य (1880 में लमही में', '\'दो बैलों की कथा\' का कथानक', '\'दो बैलों की कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c9_hin_ga_cbse_01_008** के कार्यित उदाहरण (Worked Examples) दोहराएं — विशेष रूप.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **ऑक्सीमोरॉन (Oxymoron)** और **पैराडॉक्स (Paradox)** को एक मान लेते हैं। वे "मधुर कड़वाहट", "जीवित लाश", "खामोश.' }
          ],
            remediations: { 'oxymoron-paradox': { steps: ['**चरण 1:** छात्र को दो कॉलम बनाने को कहें — **ऑक्सीमोरॉन (पद-युग्म)** vs **पैराडॉक्स (पूर्ण कथन)** — और पाठ्यपुस्तक से.', 'हर बार **क्या नया अर्थ** जुड़ा?" — इसे टेबल में दर्ज करवाएं। **चरण 3:** PEEL ढांचे में एक मॉडल उत्तर साथ मिलकर लिखें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_010', difficulty: 'standard',
          question: '\'दो बैलों की कथा\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो पहले \'पाठ्य-परिवेश और वातावरण\' (c9_hin_ga_cbse_01_003) और \'मुख्य विषय और.',
          misconception: 'छात्र समझते हैं कि \'पदावली\' का अर्थ \'पाठ में आए कठिन या नए शब्दों की सूची बनाना और उनके शब्दकोशीय अर्थ लिखना\' है; वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दो बैलों की कथा\' की पदावली',
                  options: ['\'दो बैलों की कथा\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद के चार निर्णायक तथ्य (1880 में लमही में', '\'दो बैलों की कथा\' का कथानक', '\'दो बैलों की कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो पहले \'पाठ्य-परिवेश और वातावरण\' (c9_hin_ga_cbse_01_003) और \'मुख्य विषय और संदेश\'.',
                  misconception: 'छात्र समझते हैं कि \'पदावली\' का अर्थ \'पाठ में आए कठिन या नए शब्दों की सूची बनाना और उनके शब्दकोशीय अर्थ लिखना\' है; वे यह नहीं देख पाते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: \'पाठ का कोई एक पैराग्राफ जोर से पढ़ो और उन 3 शब्दों पर उँगली रखो जिन्हें हटाने से तुम्हें लगे कि बात.', 'फिर पूछें: \'इन शब्दों की जगह कोई और शब्द रखो — अब पढ़ो, क्या फर्क लगा?\' 3.', 'इस \'फर्क\' को बोर्ड पर लिखें: शब्द A → भाव X, शब्द B → भाव Y। 4.', 'अब समझाएँ: \'यही फर्क पदावली-विश्लेषण है — शब्दकोश नहीं, भाव-कोश बनाना है।\''], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_011', difficulty: 'standard',
          question: '\'दो बैलों की कथा\' में भाषा-प्रयोग — प्रेमचंद ने कैसे शब्द, वाक्य और शैली चुनी।',
          hint: 'यदि अटका हुआ महसूस हो तो **पद-परिचय (c9_hin_ga_cbse_01_010)** और **वाक्य-भेद (कक्षा 8.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग विश्लेषण\' का अर्थ है **व्याकरण की त्रुटियाँ ढूँढना** (जैसे: वर्तनी, लिंग, वचन की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दो बैलों की कथा\' में भाषा-प्रयोग',
                  options: ['\'दो बैलों की कथा\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद के चार निर्णायक तथ्य (1880 में लमही में', '\'दो बैलों की कथा\' का कथानक', '\'दो बैलों की कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **पद-परिचय (c9_hin_ga_cbse_01_010)** और **वाक्य-भेद (कक्षा 8 व्याकरण)**.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग विश्लेषण\' का अर्थ है **व्याकरण की त्रुटियाँ ढूँढना** (जैसे: वर्तनी, लिंग, वचन की गलतियाँ)। वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक ही विचार के **तीन रूप** लिखने को कहो: (क) कर्तृवाच्य, (ख) कर्मवाच्य, (ग) भाववाच्य — फिर पूछो: "प्रत्येक में.', 'कौन-सा रूप जिम्मेदारी तय करता है?', 'दो छोटे गद्यांश दो — एक सरकारी आदेश, एक कथा-प्रसंग — छात्र से कहो: "दोनों में आए **क्रिया-रूपों** को घेरो और बताओ अंतर.', '**शब्द-श्रेणी चार्ट** बनवाओ: तत्सम/तद्भव/देशज/विदेशी के 5-5 उदाहरण पाठ से छाँटकर लाओ और प्रत्येक के आगे लिखो: "लेखक ने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_012', difficulty: 'standard',
          question: '\'दो बैलों की कथा\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review **कथानक और आख्यान-संरचना (c9_hin_ga_cbse_01_002)** to re-establish the.',
          misconception: '**Misconception:** "आशय-सूचक प्रश्नों के उत्तर \'पाठ के बाहर\' से आते हैं या ये केवल \'अनुमान\' (guesswork) होते हैं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दो बैलों की कथा\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'दो बैलों की कथा\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद के चार निर्णायक तथ्य (1880 में लमही में', '\'दो बैलों की कथा\' का कथानक', '\'दो बैलों की कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **कथानक और आख्यान-संरचना (c9_hin_ga_cbse_01_002)** to re-establish the event.',
                  misconception: '**Misconception:** "आशय-सूचक प्रश्नों के उत्तर \'पाठ के बाहर\' से आते हैं या ये केवल \'अनुमान\' (guesswork) होते हैं।" **Why it happens:**.' }
          ],
            remediations: { 'misconception-guesswork-why-it-happens': { steps: ['**Color-Code the Text:** Give the student a photocopy of a key paragraph.', 'Ask them to highlight **Facts (Yellow)** — names, dates, actions — and **Clues (Green)** — adjectives, adverbs.', '**Question Surgery:** Take 5 mixed questions.', 'Ask the student to *physically cut and paste* them into two columns: "Answer is IN the text" vs "Answer is BETWEEN the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "आशय-सूचक प्रश्नों के उत्तर \'पाठ के बाहर\' से आते हैं या ये केवल \'अनुमान\' (guesswork) होते हैं।".',
          parts: [
                { id: 'a', prompt: 'बोर्ड परीक्षा में एक छात्र ने आशय-सूचक प्रश्न का उत्तर दिया: "लेखक गरीबी की आलोचना कर रहा है क्योंकि पात्र गरीब हैं।" इस उत्तर को 1/3 अंक मिले। मूल्यांकन.', answer: '**Correct Answer:** कमी 1: **सामान्यीकरण (Over-generalization)**',
                  options: ['**Correct Answer:** कमी 1: **सामान्यीकरण (Over-generalization)**', 'गरीबी की आलोचना', 'पात्र गरीब हैं', '**Wrong Answer Reveals:** If the student says'],
                  hint: 'If stuck, review **कथानक और आख्यान-संरचना (c9_hin_ga_cbse_01_002)** to re-establish the event.',
                  misconception: '**Misconception:** "आशय-सूचक प्रश्नों के उत्तर \'पाठ के बाहर\' से आते हैं या ये केवल \'अनुमान\' (guesswork) होते हैं।" **Why it happens:**.' }
          ],
            remediations: { 'misconception-guesswork-why-it-happens': { steps: ['**Color-Code the Text:** Give the student a photocopy of a key paragraph.', 'Ask them to highlight **Facts (Yellow)** — names, dates, actions — and **Clues (Green)** — adjectives, adverbs.', '**Question Surgery:** Take 5 mixed questions.', 'Ask the student to *physically cut and paste* them into two columns: "Answer is IN the text" vs "Answer is BETWEEN the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
