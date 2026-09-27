import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch06_p1: SimDef = {
    id: 'v3_c7_hin_ch06_p1',
    title: 'पाठ 6 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 6 की पृष्ठभूमि (ऐतिहासिक/सामाजिक परिवेश) और रचनाकार के जीवन के प्रासंगिक.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 6 · Part 1/3',
    chapters: ['c7_hin_ch06'],
    nodeIds: ['c7_hin_cbse_06_001', 'c7_hin_cbse_06_002', 'c7_hin_cbse_06_003', 'c7_hin_cbse_06_004', 'c7_hin_cbse_06_005', 'c7_hin_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो कि तुम एक नई कक्षा में आए हो और शिक्षक तुम्हें बिना कुछ बताए एक कहानी पढ़ने को दे दें — तुम्हें.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 6 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ (पृष्ठभूमि) तथा लेखक के जीवन, विचारधारा, लेखन शैली और प्रमुख कृतियों का संक्षिप्त विवरण (रचनाकार.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — पृष्ठभूमि', 'पाठ 6 — कथानक', 'पाठ 6 — पाठ्य-परिवेश', 'पाठ 6 — पात्र-चित्रण', 'पाठ 6 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 6 · Part 1/3', spots: [
            { id: 's1', label: '6 -', prompt: 'Which idea is this? — कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज.', answer: '6 -', options: ['6 -', '6 -'] },
            { id: 's2', label: '6 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि.', answer: '6 -', options: ['6 -', '6 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_06_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक.',
          hint: 'अगर अटके तो कक्षा 6 के पाठ 6 (c6_hin_cbse_06_001) या पाठ 7 (c6_hin_cbse_07_001) का.',
          misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है लेखक का जन्म-मृत्यु वर्ष, शिक्षा, पुरस्कार और पुस्तकों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी/उपन्यास के प्रमुख'],
                  hint: 'अगर अटके तो कक्षा 6 के पाठ 6 (c6_hin_cbse_06_001) या पाठ 7 (c6_hin_cbse_07_001) का \'पृष्ठभूमि और.',
                  misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है लेखक का जन्म-मृत्यु वर्ष, शिक्षा, पुरस्कार और पुस्तकों की सूची रट लेना। वे यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) छात्र को लेखक की जीवनी के 5-6 मुख्य बिंदु दें और कहें: "इनमें से किन्हीं दो को चुनो जो तुम्हें लगता है पाठ 6 से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है.',
          hint: 'यदि अटका हुआ लगे तो कक्षा 6 के पाठ 6 (कथानक और आख्यान-संरचना) के \'कथानक के सोपान\' भाग को.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"कथानक = कहानी का आरंभ-मध्य-अंत" और "आख्यान-संरचना = वही चीज़ फैंसी नाम से"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज',
                  options: ['कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी/उपन्यास के प्रमुख'],
                  hint: 'यदि अटका हुआ लगे तो कक्षा 6 के पाठ 6 (कथानक और आख्यान-संरचना) के \'कथानक के सोपान\' भाग को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"कथानक = कहानी का आरंभ-मध्य-अंत" और "आख्यान-संरचना = वही चीज़ फैंसी नाम से"**। वे **फ्लैशबैक** को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दृश्य-कार्ड गतिविधि:** कहानी की 6-8 प्रमुख घटनाओं को अलग-अलग कागज़ के टुकड़ों (कार्ड) पर लिखवाओ। छात्र से कहो: "पहले.', 'लेखक ने वहाँ क्या छिपाया/दिखाया?" 2.', '**\'क्यों?\' का अभ्यास:** हर खिसकी हुई घटना के लिए छात्र से एक वाक्य में पूछो — "लेखक ने इसे यहाँ क्यों रखा?" (उत्तर.', '**सरल से जटिल:** पहले रैखिक कहानी (पंचतंत्र) से शुरू करो, फिर फ्लैशबैक वाली (प्रेमचंद की \'बड़े भाई साहब\' का अंतिम भाग).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक.',
          hint: 'यदि अटकें तो कक्षा 6 के \'पाठ्य-परिवेश और वातावरण\' नोड्स (c6_hin_cbse_01_003 से.',
          misconception: 'विद्यार्थी समझते हैं कि \'पाठ्य-परिवेश\' का अर्थ केवल कहानी का समय और स्थान लिख देना है (जैसे \'कहानी गाँव में, गर्मियों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि',
                  options: ['पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी/उपन्यास के प्रमुख'],
                  hint: 'यदि अटकें तो कक्षा 6 के \'पाठ्य-परिवेश और वातावरण\' नोड्स (c6_hin_cbse_01_003 से c6_hin_cbse_06_003).',
                  misconception: 'विद्यार्थी समझते हैं कि \'पाठ्य-परिवेश\' का अर्थ केवल कहानी का समय और स्थान लिख देना है (जैसे \'कहानी गाँव में, गर्मियों में हुई\'), और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['1) विद्यार्थी को एक ही दृश्य के दो संस्करण पढ़वाओ: केवल तथ्यात्मक वर्णन और संवेदनात्मक वर्णन; पूछो \'कौन-सा तुम्हें वहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी/उपन्यास.',
          hint: 'यदि अटके: **कक्षा 6 पाठ 1 या 4 का नायक-चित्रण** दोबारा पढ़ें और PEEL संरचना में लिखने का.',
          misconception: '**सबसे आम गलतफहमी:** छात्र समझते हैं कि पात्र-चित्रण का अर्थ है नायक के **अच्छे गुणों की सूची** बनाना (जैसे: बहादुर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी/उपन्यास के प्रमुख',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण है जिसमें कहानी/उपन्यास के प्रमुख', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि अटके: **कक्षा 6 पाठ 1 या 4 का नायक-चित्रण** दोबारा पढ़ें और PEEL संरचना में लिखने का अभ्यास.',
                  misconception: '**सबसे आम गलतफहमी:** छात्र समझते हैं कि पात्र-चित्रण का अर्थ है नायक के **अच्छे गुणों की सूची** बनाना (जैसे: बहादुर, ईमानदार, दयालु.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़वाएँ** एक विशेष लेंस के साथ: "केवल नायक से जुड़े वाक्य छाँटो — उसके बोले शब्द, उसके किए काम, दूसरों की.', '**चार-कॉलम टेबल** बनवाएँ: | आयाम (रूप/गुण/संवाद/कार्य/संबंध) | पाठ्य-प्रमाण (पंक्ति/घटना) | यह क्या दर्शाता है?', '| कहानी में कहाँ (शुरुआत/मध्य/अंत) | 3.', '**मॉडल दिखाएँ:** एक कमजोर उत्तर (सिर्फ गुणों की सूची) और एक मजबूत उत्तर (PEEL संरचना में) साथ रखकर पूछो: "दूसरा उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका) के साथ रहकर कथानक.',
          hint: 'यदि अटका हुआ लगे तो c7_hin_cbse_06_004 (नायक चित्रण) और c6_hin_cbse_06_005 (Class 6 सहायक.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र = नायक का दोस्त/सहयोगी\' — यानी सहायक पात्र हमेशा सकारात्मक, मददगार, और नायक के पक्ष में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका) के साथ रहकर कथानक को गति देते',
                  options: ['सहायक पात्र वे पात्र होते हैं जो प्रमुख पात्र (नायक/नायिका) के साथ रहकर कथानक को गति देते', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि अटका हुआ लगे तो c7_hin_cbse_06_004 (नायक चित्रण) और c6_hin_cbse_06_005 (Class 6 सहायक पात्र.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र = नायक का दोस्त/सहयोगी\' — यानी सहायक पात्र हमेशा सकारात्मक, मददगार, और नायक के पक्ष में होता है। यह गलती.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछो: "क्या कोई पात्र नायक को नुकसान पहुँचाकर भी कहानी को आगे बढ़ा सकता है?" — उदाहरण दो: \'महाभारत\' में शकुनी.', 'पाठ से एक ऐसा सहायक पात्र चुनो जो नायक की गलती करवाता हो — उसके संवाद/कार्य रेखांकित करो। 3.', 'समझाओ: "साहित्य में \'सहायक\' का अर्थ \'कथानक का सहायक\' (plot-helper) है, \'नायक का मित्र\' नहीं।" 4.', 'अभ्यास: दो पात्रों के कार्ड बनाओ — एक \'मित्र-सहायक\', एक \'शत्रु-सहायक\' — और दोनों के कथात्मक कार्य लिखवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_06_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जिसके इर्द-गिर्द.',
          hint: 'यदि अटके तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_006 से c6_hin_cbse_06_006 तक) का.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (plot summary)** समझ बैठते हैं। **उदाहरण:** पाठ — "एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जिसके इर्द-गिर्द पूरी रचना',
                  options: ['मुख्य विषय (Central Theme) वह मूल विचार या केंद्रीय भाव है जिसके इर्द-गिर्द पूरी रचना', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी पाठ के लिखे जाने का ऐतिहासिक, सामाजिक,', 'कथानक (Plot) कहानी की घटनाओं का **कारण-कार्य संबंध** वाला तार्किक क्रम है (उदाहरण: बीज', 'पाठ्य-परिवेश (setting) किसी कहानी या कविता का वह समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि'],
                  hint: 'यदि अटके तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_006 से c6_hin_cbse_06_006 तक) का \'मुख्य विषय और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\' (plot summary)** समझ बैठते हैं। **उदाहरण:** पाठ — "एक बूढ़ा किसान अपने.' }
          ],
            remediations: { 'plot-summary': { steps: ['**पहला कदम:** छात्र से कहो — "पाठ की **कहानी 2 वाक्यों में** सुनाओ।" (यह कथानक है)। 2.', '**दूसरा कदम:** अब पूछो — "इस कहानी से लेखक तुम्हें **क्या समझाना** चाहता है?', 'एक शब्द/वाक्यांश में बताओ — जैसे: लालच, त्याग, साहस, एकता।" (यह विषय है)। 3.', '**तीसरा कदम:** पूछो — "तो तुम्हें **क्या सीख** मिली जो तुम अपने जीवन में लगा सको?" (यह संदेश है)। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
