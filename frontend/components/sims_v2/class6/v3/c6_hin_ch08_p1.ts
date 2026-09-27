import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch08_p1: SimDef = {
    id: 'v3_c6_hin_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 8 की पृष्ठभूमि (ऐतिहासिक/सामाजिक संदर्भ) और रचनाकार के जीवन परिचय एवं.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c6_hin_ch08'],
    nodeIds: ['c6_hin_cbse_08_001', 'c6_hin_cbse_08_002', 'c6_hin_cbse_08_003', 'c6_hin_cbse_08_004', 'c6_hin_cbse_08_005', 'c6_hin_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुम एक जासूस हो जिसे एक पुरानी डायरी मिली है — तुम सबसे पहले क्या करोगे?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है जिसमें कहानी घटित होती है, जबकि रचनाकार परिचय (Author Introduction) लेखक के जीवन, उनकी साहित्यिक यात्रा, प्रमुख.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — **कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम).', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_001', difficulty: 'standard',
          question: 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 5 की पाठ्यपुस्तक के किसी भी पाठ का \'लेखक परिचय\' और \'पाठ का.',
          misconception: 'छात्र अक्सर सोचते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में पूछे जाने वाले \'रटने लायक तथ्य\' (dates, birth.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है',
                  options: ['पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),', 'पात्र-चित्रण (Character Sketch) एक संरचित विश्लेषण है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 5 की पाठ्यपुस्तक के किसी भी पाठ का \'लेखक परिचय\' और \'पाठ का सार\' साथ.',
                  misconception: 'छात्र अक्सर सोचते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' केवल परीक्षा में पूछे जाने वाले \'रटने लायक तथ्य\' (dates, birth place, awards) हैं। वे.' }
          ],
            remediations: { 'dates': { steps: ['छात्र के सामने पाठ्यपुस्तक का \'पृष्ठभूमि/रचनाकार परिचय\' वाला पृष्ठ खोलें और पूछें: "यहाँ लिखी किन 2 बातों का सीधा संबंध.', 'फिर कहें: "मान लो रचनाकार अमीर राजकुमार होता, तो क्या यह कहानी वैसी ही लिखी जाती?', 'क्यों?" — इससे \'रचनाकार का जीवन = रचना का दृष्टिकोण\' स्पष्ट होगा। 3.', 'अंत में एक \'कनेक्शन चार्ट\' बनवाएं: बाएं कॉलम में \'रचनाकार के जीवन की घटना\', दाएं कॉलम में \'कहानी में उसकी झलक\'। इसे 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_002', difficulty: 'standard',
          question: '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण.',
          hint: 'यदि छात्र अटका है, तो "कारण-कार्य शृंखला (Cause-Effect Chain)" का अभ्यास करवाओ: दैनिक.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"कथानक के सोपान (Exposition, Rising Action, Climax, आदि) ही आख्यान-संरचना हैं"**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →',
                  options: ['**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),', 'पात्र-चित्रण (Character Sketch) एक संरचित विश्लेषण है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि छात्र अटका है, तो "कारण-कार्य शृंखला (Cause-Effect Chain)" का अभ्यास करवाओ: दैनिक जीवन की.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **"कथानक के सोपान (Exposition, Rising Action, Climax, आदि) ही आख्यान-संरचना हैं"** — यानी वे सोचते हैं.' }
          ],
            remediations: { 'exposition': { steps: ['**चरण 1**: छात्र से एक परिचित फिल्म (जैसे *बाहुबली* या *तारे ज़मीन पर*) का **कथानक-क्रम** लिखवाओ — केवल घटनाएँ समय-क्रम.', 'क्यों?" — इससे **संरचना का कार्य (Function)** स्पष्ट होगा। **चरण 4**: अब कथानक-आरेख (Plot Diagram) बनवाओ जिसमें **दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय.',
          hint: 'यदि अटके तो c6_hin_cbse_08_002 (कथानक और आख्यान-संरचना) के \'कथानक के सोपान\' भाग को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'परिवेश\' (setting) और \'वातावरण\' (atmosphere/mood) एक ही चीज़ हैं और दोनों का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पात्र-चित्रण (Character Sketch) एक संरचित विश्लेषण है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटके तो c6_hin_cbse_08_002 (कथानक और आख्यान-संरचना) के \'कथानक के सोपान\' भाग को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'परिवेश\' (setting) और \'वातावरण\' (atmosphere/mood) एक ही चीज़ हैं और दोनों का काम केवल \'सुंदर वर्णन\'.' }
          ],
            remediations: { 'setting-atmosphere-mood-static-backdrop': { steps: ['**चरण 1 — संवेदी लंगर (sensory anchor) दें:** छात्र को आँखें बंद कराकर उसके अपने कमरे का वर्णन करवाएँ — अभी (दोपहर) और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक संरचित विश्लेषण है जिसमें कहानी के प्रमुख.',
          hint: 'यदि फँस जाएँ तो c6_hin_cbse_08_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेषकर "चरमोत्कर्ष.',
          misconception: 'छात्र अक्सर **पात्र-चित्रण** को **पात्र-विवरण (character description)** समझ लेते हैं। वे नायक का कद, रंग, कपड़े, उम्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक संरचित विश्लेषण है जिसमें कहानी के प्रमुख पात्र (नायक)',
                  options: ['पात्र-चित्रण (Character Sketch) एक संरचित विश्लेषण है जिसमें कहानी के प्रमुख पात्र (नायक)', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि फँस जाएँ तो c6_hin_cbse_08_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेषकर "चरमोत्कर्ष (climax)".',
                  misconception: 'छात्र अक्सर **पात्र-चित्रण** को **पात्र-विवरण (character description)** समझ लेते हैं। वे नायक का कद, रंग, कपड़े, उम्र लिखकर रुक जाते हैं और.' }
          ],
            remediations: { 'character-description': { steps: ['छात्र से कहो: "एक पन्ने पर नायक का चित्र बनाओ और लेबल लगाओ (बाह्य)। फिर दूसरे पन्ने पर उसके **दिमाग़ का चित्र** बनाओ.', 'कहानी के तीन बिंदु चुनो: शुरुआत, मध्य, अंत। हर बिंदु पर पूछो: "यहाँ नायक क्या **सोच** रहा है?', 'क्या **महसूस** कर रहा है?" उत्तर तीर (→) से जोड़ो। 3.', 'अंत में पूछो: "पहले तीर और आख़िरी तीर में क्या फ़र्क़ है?" वही फ़र्क़ परिवर्तन (arc) है — उसे वाक्य में लिखो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c6_hin_cbse_08_004) दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\'। वे \'महत्व\' को \'स्क्रीन टाइम/पृष्ठ संख्या\' से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि अटके तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c6_hin_cbse_08_004) दोहराएँ — विशेषकर \'पात्र के गुण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\'। वे \'महत्व\' को \'स्क्रीन टाइम/पृष्ठ संख्या\' से नापते हैं। उदाहरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "अपनी प्रिय कहानी के 3 मुख्य दृश्य लिखो जहाँ नायक अकेला न हो।" 2.', 'हर दृश्य में पूछो: "यह दूसरा पात्र क्या *कर* रहा है?', 'नायक की प्रतिक्रिया क्या है?" 3.', 'एक तालिका बनाओ: पात्र | कार्य | नायक पर प्रभाव | प्रकार (सखा/मार्गदर्शक/विरोधी)। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जिसके चारों ओर पूरी.',
          hint: 'यदि अटका हुआ लगे, तो **c6_hin_cbse_08_002 (कथानक)** और **c6_hin_cbse_08_004.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'कहानी का सारांश (plot summary)\'** को **\'मुख्य विषय (theme)\'** मान लेते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जिसके चारों ओर पूरी रचना बुनी',
                  options: ['मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जिसके चारों ओर पूरी रचना बुनी', 'पृष्ठभूमि (Background) किसी रचना का ऐतिहासिक, सामाजिक, सांस्कृतिक और भौगोलिक परिवेश है', '**कथानक (Plot)** कहानी की घटनाओं का कारण-कार्य संबंध सहित तार्किक क्रम है (कारण → कार्य →', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी में वर्णित भौतिक स्थान (स्थान, समय, मौसम),'],
                  hint: 'यदि अटका हुआ लगे, तो **c6_hin_cbse_08_002 (कथानक)** और **c6_hin_cbse_08_004 (नायक-चित्रण)** दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'कहानी का सारांश (plot summary)\'** को **\'मुख्य विषय (theme)\'** मान लेते हैं। **उदाहरण:** पाठ "साँप और.' }
          ],
            remediations: { 'plot-summary-theme-what-happens': { steps: ['**चरण 1:** छात्र को एक **बहुत छोटा अंश (3-4 वाक्य)** दें और पूछें — *"इसमें क्या हुआ?"* (सारांश) और फिर — *"इससे लेखक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
