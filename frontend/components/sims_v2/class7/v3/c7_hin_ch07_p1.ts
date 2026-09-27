import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch07_p1: SimDef = {
    id: 'v3_c7_hin_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 7 के रचनाकार और उसकी पृष्ठभूमि तक सीमित है; इसमें कथानक, पात्र, विषय या.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c7_hin_ch07'],
    nodeIds: ['c7_hin_cbse_07_001', 'c7_hin_cbse_07_002', 'c7_hin_cbse_07_003', 'c7_hin_cbse_07_004', 'c7_hin_cbse_07_005', 'c7_hin_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करें कि आपको एक नई किताब मिली है — आप सबसे पहले क्या देखते हैं?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी पाठ को लिखे जाने का ऐतिहासिक-सामाजिक संदर्भ (पृष्ठभूमि) तथा रचनाकार के जीवन, साहित्यिक योगदान, विचारधारा और लेखन शैली की संक्षिप्त जानकारी, जिससे पाठ की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 1/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम.', answer: '7 -', options: ['7 -', '7 -'] },
            { id: 's2', label: '7 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल.', answer: '7 -', options: ['7 -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी पाठ को लिखे जाने का.',
          hint: 'यदि अटके तो कक्षा 6 के \'पृष्ठभूमि और रचनाकार परिचय\' (c6_hin_cbse_07_001) की प्रक्रिया.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **इतिहास की तारीखें, घटनाएँ और सामान्य जानकारी** रटना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र is the systematic analysis of'],
                  hint: 'यदि अटके तो कक्षा 6 के \'पृष्ठभूमि और रचनाकार परिचय\' (c6_hin_cbse_07_001) की प्रक्रिया दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पृष्ठभूमि\' का अर्थ केवल **इतिहास की तारीखें, घटनाएँ और सामान्य जानकारी** रटना है (जैसे: "1960 के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से पूछें — "पाठ में कोई एक ऐसा प्रसंग चुनो जहाँ तुम्हें लगा \'यह क्यों हो रहा है?\' या \'यह अजीब है\'।".', '**दूसरा कदम:** उस प्रसंग को लें और पूछें — "यह प्रसंग 1960 के दशक की किस सरकारी योजना/नियम से जुड़ता है?" (शिक्षक संकेत.', '**तीसरा कदम:** रचनाकार की जीवनी से एक प्रसंग जोड़ें — "श्रीलाल शुक्ल स्वयं उस योजना को लागू करने वाले अधिकारी थे। अब.', '**चौथा कदम:** छात्र से एक वाक्य में निष्कर्ष लिखवाएँ: "पृष्ठभूमि जानने से पाठ का अर्थ कैसे बदल गया?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला.',
          hint: 'यदि अटका हुआ महसूस हो तो: कक्षा ६ की किसी भी कहानी (जैसे \'वह चिड़िया जो\', \'साना-साना हाथ.',
          misconception: 'छात्र प्रायः मानते हैं कि \'कथानक के चरण\' (उद्घाटन, उत्थान, चरमोत्कर्ष, पतन, उपसंहार) और \'आख्यान-संरचना के प्रकार\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम',
                  options: ['कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र is the systematic analysis of'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कक्षा ६ की किसी भी कहानी (जैसे \'वह चिड़िया जो\', \'साना-साना हाथ जोड़ी\') को.',
                  misconception: 'छात्र प्रायः मानते हैं कि \'कथानक के चरण\' (उद्घाटन, उत्थान, चरमोत्कर्ष, पतन, उपसंहार) और \'आख्यान-संरचना के प्रकार\' (रैखिक, फ्लैशबैक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से एक परिचित फिल्म (जैसे \'बाहुबली\' या \'दंगल\') का कथानक ५ वाक्यों में लिखवाएँ — केवल घटनाओं का क्रम (क्या.', 'चरण 3: दोनों को साथ रखकर पूछें: "कथानक में चरमोत्कर्ष कहाँ था?', 'संरचना में वह किस स्थान पर दिखाया गया?" चरण 4: किसी छोटी कहानी (NCERT पाठ) पर यही अभ्यास करवाएँ — पहले कथानक-मानचित्र.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान.',
          hint: 'यदि अटकें: कक्षा 6 के किसी पाठ (जैसे \'वह चिड़िया जो\' या \'संसार पुस्तक है\') को दोबारा.',
          misconception: 'छात्र **\'परिवेश\' को \'स्थान मात्र\' (setting = place)** समझते हैं और **\'वातावरण\' को \'मौसम मात्र\' (atmosphere.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,',
                  options: ['पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र is the systematic analysis of'],
                  hint: 'यदि अटकें: कक्षा 6 के किसी पाठ (जैसे \'वह चिड़िया जो\' या \'संसार पुस्तक है\') को दोबारा पढ़कर केवल.',
                  misconception: 'छात्र **\'परिवेश\' को \'स्थान मात्र\' (setting = place)** समझते हैं और **\'वातावरण\' को \'मौसम मात्र\' (atmosphere = weather)**। वे लिखते हैं.' }
          ],
            remediations: { 'setting-place-atmosphere-weather': { steps: ['**पुनः पढ़ो** एक छोटा अंश (5-6 पंक्तियाँ) और **रंगीन पेंसिल से** चार अवयवों को चिह्नित करो: स्थान (नीला), काल/मौसम.', '**पूछो स्वयं से:** "अगर यह लाल/हरा/पीला अवयव हटा दूँ, तो क्या पात्र वही करेगा जो उसने किया?" — उत्तर \'नहीं\' में आए तो.', '**लिखो** एक वाक्य: *"इस अंश में [अवयव] पात्र को [क्रिया] करने के लिए बाध्य/प्रेरित करता है क्योंकि..."* — इसे 3 अलग-अलग.', '**तुलना करो:** वही दृश्य, बदला हुआ परिवेश (जैसे: दिन की जगह रात, गर्मी की जगह बरसात) — पात्र का व्यवहार कैसे बदलेगा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र is the systematic.',
          hint: 'यदि अटके: c7_hin_cbse_07_002 (कथानक) दोबारा पढ़ें — नायक के निर्णय-बिंदु पहचानें; फिर.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि पात्र-चित्रण = नायक के गुणों की सूची बनाना (बहादुर, ईमानदार, दयालु)। वे **गुण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र is the systematic analysis of',
                  options: ['पात्र-चित्रण (character portrayal) of the नायक/प्रमुख पात्र is the systematic analysis of', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके: c7_hin_cbse_07_002 (कथानक) दोबारा पढ़ें — नायक के निर्णय-बिंदु पहचानें; फिर.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी समझते हैं कि पात्र-चित्रण = नायक के गुणों की सूची बनाना (बहादुर, ईमानदार, दयालु)। वे **गुण (trait)** और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**साक्ष्य-गुण जोड़ी बनाएं:** विद्यार्थी से कहें — "पाठ से 3 कार्य/संवाद चुनो। प्रत्येक के सामने लिखो: यह क्या दर्शाता.', '**\'क्यों\' की सीढ़ी चढ़ाएं:** प्रत्येक गुण के लिए 3 बार "क्यों?" पूछें — "वह साहसी क्यों?', '→ क्योंकि वह खतरे में गया। खतरे में क्यों गया?', '→ क्योंकि भाई को बचाना था। भाई को बचाना क्यों जरूरी?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के साथ अंतःक्रिया.',
          hint: 'यदि अटके तो c7_hin_cbse_07_004 (नायक चित्रण) दोहराएँ — नायक स्पष्ट होगा तो सहायक पात्र का.',
          misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' = \'कम महत्वपूर्ण पात्र\'। वे यह नहीं देख पाते कि सहायक पात्र नायक का \'दर्पण\' (foil).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के साथ अंतःक्रिया करके कथा',
                  options: ['सहायक पात्र वे पात्र होते हैं जो कथानक में नायक/प्रमुख पात्र के साथ अंतःक्रिया करके कथा', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो c7_hin_cbse_07_004 (नायक चित्रण) दोहराएँ — नायक स्पष्ट होगा तो सहायक पात्र का प्रकार्य.',
                  misconception: 'छात्र समझते हैं कि \'सहायक पात्र\' = \'कम महत्वपूर्ण पात्र\'। वे यह नहीं देख पाते कि सहायक पात्र नायक का \'दर्पण\' (foil), \'विरोधी\' (antagonist).' }
          ],
            remediations: { 'foil': { steps: ['चरण 1: छात्र से पूछें — "यदि कहानी से इस पात्र को हटा दें, तो नायक की कहानी कैसे बदल जाएगी?" चरण 2: पाठ से दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_07_006', difficulty: 'standard',
          question: 'मुख्य विषय (Main Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में बार-बार.',
          hint: 'यदि अटके तो: Class 6 के किसी भी पाठ (जैसे पाठ 1 या 7) का \'मुख्य विषय और संदेश\' नोड.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **मुख्य विषय = कहानी का सारांश (summary)** या **लेखक का व्यक्तिगत मत (author\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Main Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में बार-बार उभरता है और',
                  options: ['मुख्य विषय (Main Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में बार-बार उभरता है और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी की घटनाओं का कारण-कार्य संबंध (cause-effect chain) वाला तार्किक क्रम', 'पाठ्य-परिवेश और वातावरण किसी रचना में घटनाओं के घटित होने का भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो: Class 6 के किसी भी पाठ (जैसे पाठ 1 या 7) का \'मुख्य विषय और संदेश\' नोड.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि **मुख्य विषय = कहानी का सारांश (summary)** या **लेखक का व्यक्तिगत मत (author\'s opinion)**। **गलत तर्क.' }
          ],
            remediations: { 'summary-author-s-opinion': { steps: ['**पुनः पढ़वाओ:** पाठ के 3 मुख्य प्रसंग चुनवाओ जहाँ एक जैसा भाव (जैसे त्याग, एकता, साहस) उभरे। 2.', '**टेबल बनवाओ:** दो कॉलम — \'प्रसंग/साक्ष्य\' और \'यह क्या दर्शाता है\'। छात्र स्वयं भरे। 3.', '**एक वाक्य में विषय लिखवाओ:** "यह पाठ ______ के बारे में है।" — खाली स्थान भरने को कहो। 4.', '**संदेश अलग करवाओ:** "लेखक हमसे क्या कहना चाहता है?" — उत्तर \'तुम्हें ______ करना चाहिए\' रूप में आएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
