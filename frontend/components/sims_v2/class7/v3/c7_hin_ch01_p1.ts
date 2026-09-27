import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch01_p1: SimDef = {
    id: 'v3_c7_hin_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'इस नोड में केवल रचनाकार का संक्षिप्त जीवन परिचय, उनकी प्रमुख रचनाएँ, साहित्यिक प्रवृत्ति.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c7_hin_ch01'],
    nodeIds: ['c7_hin_cbse_01_001', 'c7_hin_cbse_01_002', 'c7_hin_cbse_01_003', 'c7_hin_cbse_01_004', 'c7_hin_cbse_01_005', 'c7_hin_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुमने एक नया गाना सुना जो तुम्हें बहुत पसंद आया, लेकिन उसके बोल कुछ अजीब से लगे — अब तुम क्या.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए उसके रचनाकार (लेखक/कवि) के जीवन परिचय, उनकी साहित्यिक यात्रा, रचनाकाल की सामाजिक-सांस्कृतिक परिस्थितियों तथा उस.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 1/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative.', answer: '1 -', options: ['1 -', '1 -'] },
            { id: 's2', label: '1 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल.', answer: '1 -', options: ['1 -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 1 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 के किन्हीं दो पाठों (जैसे c6_hin_cbse_01_001 और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" का अर्थ है लेखक की जन्मतिथि, मृत्युतिथि, शिक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 के किन्हीं दो पाठों (जैसे c6_hin_cbse_01_001 और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" का अर्थ है लेखक की जन्मतिथि, मृत्युतिथि, शिक्षा, पुरस्कार और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**\'क्यों?\' का खेल खेलें (Play the \'Why\' Game):** छात्र से कहें: "लेखक की जन्मतिथि 1910 है। तो क्या?', 'अगर वे 1920 में पैदा होते तो इस कहानी में क्या अंतर आता?', 'तीन अंतर लिखो।" — यह तथ्य को \'कारक\' (Variable) में बदल देता है। 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_002', difficulty: 'standard',
          question: 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in.',
          hint: 'यदि अटका हुआ महसूस हो, तो Class 6 के \'कथानक और आख्यान-संरचना\' (c6_hin_cbse_01_002) का.',
          misconception: 'विद्यार्थी अक्सर मानते हैं कि \'चरम (climax)\' कहानी का सबसे \'रोमांचक\' या \'लंबा\' दृश्य होता है, जबकि वास्तव में चरम **वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,',
                  options: ['कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ महसूस हो, तो Class 6 के \'कथानक और आख्यान-संरचना\' (c6_hin_cbse_01_002) का.',
                  misconception: 'विद्यार्थी अक्सर मानते हैं कि \'चरम (climax)\' कहानी का सबसे \'रोमांचक\' या \'लंबा\' दृश्य होता है, जबकि वास्तव में चरम **वह बिंदु है जहां.' }
          ],
            remediations: { 'climax': { steps: ['विद्यार्थी से एक परिचित कहानी (जैसे \'खरगोश और कछुआ\') के केवल **तीन वाक्यों** में कथानक लिखवाएं: आरंभ, मध्य, अंत। 2.', 'फिर पूछें: "कौन-सा वाक्य तय करता है कि कौन जीता?" — वही चरम है। 3.', 'अब उसी कहानी को **उल्टे क्रम** (अंत → मध्य → आरंभ) में लिखने को कहें और पूछें: "पाठक को अब क्या अलग महसूस हुआ?" — इससे.', 'अंत में, दोनों संस्करणों की तुलना करवाकर \'कथानक\' vs \'संरचना\' का अंतर लिखवाएं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के \'पाठ्य-परिवेश और वातावरण\' नोड्स.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'परिवेश\' (setting)** और **\'वातावरण\' (atmosphere/mood)** को **पर्यायवाची** मानते हैं और दोनों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,',
                  options: ['पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 6 के \'पाठ्य-परिवेश और वातावरण\' नोड्स (c6_hin_cbse_01_003, 02_003.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'परिवेश\' (setting)** और **\'वातावरण\' (atmosphere/mood)** को **पर्यायवाची** मानते हैं और दोनों के लिए एक ही उत्तर.' }
          ],
            remediations: { 'setting-atmosphere-mood': { steps: ['**भेद स्पष्ट करो:** दो कॉलम बनाओ — बाएँ **\'क्या है?\' (परिवेश: तथ्य — स्थान, काल, वस्तुएँ, रीति-रिवाज)** दाएँ **\'क्या.', '**ज्ञात पाठ से अभ्यास:** कक्षा 6 के किसी पाठ (जैसे \'वह चिड़िया जो\') के दो अंश दो — एक केवल परिवेश, एक केवल वातावरण.', '**रंग-कोडिंग:** नए पाठ में परिवेश वाले शब्द **नीले** से, वातावरण वाले **लाल** से रेखांकित करवाओ; फिर पूछो: "नीले शब्द.', '**लेखन कार्य:** उपरोक्त DIAGNOSTIC_QUESTION_6 जैसा अभ्यास करवाओ — केवल परिवेश से वातावरण रचना।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम प्रमुख.',
          hint: 'यदि अटके: **c7_hin_cbse_01_002 (कथानक संरचना)** दोहराएँ — नायक के निर्णय *कहाँ* होते हैं.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **पात्र-चित्रण = गुणों की सूची (list of traits)**। वे लिखते हैं: "नायक बहादुर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम प्रमुख पात्र',
                  options: ['पात्र-चित्रण (Character Sketch) एक साहित्यिक विश्लेषण कौशल है जिसमें हम प्रमुख पात्र', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके: **c7_hin_cbse_01_002 (कथानक संरचना)** दोहराएँ — नायक के निर्णय *कहाँ* होते हैं (उत्कर्ष.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि **पात्र-चित्रण = गुणों की सूची (list of traits)**। वे लिखते हैं: "नायक बहादुर, दयालु, ईमानदार और.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**पहचान**: छात्र से कहें — "तुमने 4 गुण लिखे। अब **एक गुण चुनो** (जैसे बहादुरी) और पाठ खोलकर **वह सटीक प्रसंग/पंक्ति.', '**वर्गीकरण**: पूछें — "यह प्रमाण **सीधा वर्णन** है या **अप्रत्यक्ष प्रकटीकरण** (संवाद/कार्य/विचार/अन्य की राय)?" छात्र.', '**PEEL अभ्यास**: उसी गुण के लिए **PEEL पैराग्राफ** लिखवाएँ — Point (गुण), Evidence (पंक्ति), Explanation (यह गुण यहाँ.', '**तुलना**: छात्र का पहला संस्करण (सूची) और दूसरा संस्करण (PEEL) साथ रखें — पूछें: "कौन-सा अधिक प्रभावी है और क्यों?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Character) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'अगर अटके तो कक्षा 6 के \'पात्र-चित्रण: सहायक पात्र\' (c6_hin_cbse_01_005) का \'पात्र-प्रकार.',
          misconception: 'छात्र अक्सर \'सहायक पात्र\' को \'गौण पात्र\' (minor character) समझ लेते हैं और सोचते हैं कि इनका विश्लेषण कम गहरा होना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Character) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Character) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'अगर अटके तो कक्षा 6 के \'पात्र-चित्रण: सहायक पात्र\' (c6_hin_cbse_01_005) का \'पात्र-प्रकार पहचान.',
                  misconception: 'छात्र अक्सर \'सहायक पात्र\' को \'गौण पात्र\' (minor character) समझ लेते हैं और सोचते हैं कि इनका विश्लेषण कम गहरा होना चाहिए। असल में \'सहायक\'.' }
          ],
            remediations: { 'minor-character-supporting': { steps: ['छात्र से कहें: "किसी ऐसे व्यक्ति को याद करो जिसने तुम्हारी जिंदगी में बड़ा फर्क डाला हो लेकिन वह तुम्हारे \'मुख्य पात्र\'.', 'फिर पाठ से एक सहायक पात्र चुनें और पूछें: "अगर यह पात्र कहानी से हटा दिया जाए, तो नायक का कौन-सा निर्णय बदल जाएगा?', 'कौन-सा विषय (theme) कमजोर पड़ जाएगा?" 3.', 'छात्र को दो कॉलम बनाने को कहें: बायाँ — \'पात्र का नायक पर प्रभाव\', दायाँ — \'पात्र का अपना स्वतंत्र संघर्ष/निर्णय\'। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना.',
          hint: 'यदि अटके तो कक्षा 6 के पाठ 1 (c6_hin_cbse_01_006) का "विषय-संदेश पहचान" अभ्यास दोहराएं.',
          misconception: 'छात्र अक्सर **मुख्य विषय** को **कथानक का सारांश** लिख देते हैं — जैसे "कहानी रामू की है जो गांव जाता है और मुश्किलें.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना बुनी गई',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरी रचना बुनी गई', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो कक्षा 6 के पाठ 1 (c6_hin_cbse_01_006) का "विषय-संदेश पहचान" अभ्यास दोहराएं — वहां सरल.',
                  misconception: 'छात्र अक्सर **मुख्य विषय** को **कथानक का सारांश** लिख देते हैं — जैसे "कहानी रामू की है जो गांव जाता है और मुश्किलें झेलता है"। वे **विषय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ को एक वाक्य में बताओ — **\'यह कहानी ______ के बारे में है\'** — खाली जगह में **संज्ञा** भरो (जैसे.', 'फिर पूछें: "लेखक तुम्हें क्या **सीख** देकर गया?', 'पूरा वाक्य लिखो।" — यही संदेश है। 3.', 'अब कहें: "पाठ से दो लाइनें/घटनाएं ढूंढो जो तुम्हारी बात **साबित** करती हों।" — यह प्रमाण-आधारित सोच बनाता है। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
