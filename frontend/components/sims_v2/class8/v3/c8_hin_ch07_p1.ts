import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch07_p1: SimDef = {
    id: 'v3_c8_hin_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'यह नोड **केवल** पाठ 7 के रचनाकार (जीवन परिचय, प्रमुख रचनाएँ, साहित्यिक प्रवृत्ति) और पाठ.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c8_hin_ch07'],
    nodeIds: ['c8_hin_cbse_07_001', 'c8_hin_cbse_07_002', 'c8_hin_cbse_07_003', 'c8_hin_cbse_07_004', 'c8_hin_cbse_07_005', 'c8_hin_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना करो तुमने एक पुराना ख़त पाया जिस पर कोई तारीख़ नहीं, कोई पता नहीं — बस शब्द हैं। क्या तुम उसका पूरा.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'एक कहानी में लेखक चरमोत्कर्ष (climax) को शुरुआत में दिखाता है, फिर फ्लैशबैक में बताता है कि वहां तक कैसे पहुंचे। यह कौन-सी संरचनात्मक युक्ति है और इसका पाठक पर.',
        options: ['**Correct answer:** यह **इन मीडिया रेस (in medias res)** या **अनुक्रमभंग', 'यह स्थिति कैसे आई?', 'flashback'],
        answer: '**Correct answer:** यह **इन मीडिया रेस (in medias res)** या **अनुक्रमभंग',
        hook: '**Specific error:** Students believe *"नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle, end)"* — they memorize.',
    },
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — किसी रचना के लिखे जाने का **ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ** तथा **रचनाकार के व्यक्तित्व, जीवन-दर्शन एवं साहित्यिक योगदान** का संक्षिप्त विवेचन, जिससे.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_002', title: 'पाठ 7 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: 'Think of your favorite movie — say, *Bahubali*. You remember the *story*: Shivudu climbs the waterfall, discovers his past, fights Bhallaladeva.',
            decisions: [{ prompt: 'कथानक (plot) और आख्यान-संरचना (narrative structure) में मूल अंतर क्या है? एक वाक्य में लिखें।', options: [
                { text: '**Correct answer:** कथानक घटनाओं का कालानुक्रमिक कारण-कार्य क्रम है (क्या हुआ), जबकि', outcome: '**Correct answer:** कथानक घटनाओं का कालानुक्रमिक कारण-कार्य क्रम है (क्या हुआ), जबकि आख्यान-संरचना.' },
                { text: 'both are the same', outcome: 'Not quite — **Specific error:** Students believe *"नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle.', reveals: 'specific-error-students-believe' },
                { text: 'structure is just the beginning-middle-end', outcome: 'Not quite — **Specific error:** Students believe *"नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle.', reveals: 'specific-error-students-believe' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_07_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है — किसी रचना के लिखे जाने का **ऐतिहासिक.',
          hint: 'यदि अटका हुआ महसूस हो, तो **कक्षा 7 के पाठ 7 (c7_hin_cbse_07_001) का \'रचनाकार परिचय\' खंड.',
          misconception: '**विशिष्ट भ्रांति:** *"रचनाकार परिचय = जन्मतिथि, मृत्युतिथि, प्रसिद्ध रचनाओं की सूची रट लेना।"* **क्यों होती है:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**', 'पात्र-चित्रण एक विश्लेषणात्मक कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **कक्षा 7 के पाठ 7 (c7_hin_cbse_07_001) का \'रचनाकार परिचय\' खंड दोबारा.',
                  misconception: '**विशिष्ट भ्रांति:** *"रचनाकार परिचय = जन्मतिथि, मृत्युतिथि, प्रसिद्ध रचनाओं की सूची रट लेना।"* **क्यों होती है:** कक्षा 6-7 में \'रचनाकार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**सामने बैठकर** रचनाकार की जीवनी के **3-4 प्रमुख प्रसंग** (बचपन का संघर्ष, कोई बड़ा आंदोलन, कोई व्यक्तिगत त्रासदी.', 'पाठ 7 खोलकर **एक-एक प्रसंग के सामने** पूछें: *"इस प्रसंग की छाया पाठ में कहाँ दिखती है?', 'कोई संवाद, कोई प्रसंग, कोई पात्र का निर्णय — ढूँढ़ो।"* 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_002', difficulty: 'standard',
          question: '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect.',
          hint: 'If stuck, review **c7_hin_cbse_07_002** — specifically the worked example mapping "कहानी.',
          misconception: '**Specific error:** Students believe *"नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle, end)"* — they memorize.',
          parts: [
                { id: 'a', prompt: 'एक कहानी में लेखक चरमोत्कर्ष (climax) को शुरुआत में दिखाता है, फिर फ्लैशबैक में बताता है कि वहां तक कैसे पहुंचे। यह कौन-सी संरचनात्मक युक्ति है और इसका पाठक पर.', answer: '**Correct answer:** यह **इन मीडिया रेस (in medias res)** या **अनुक्रमभंग',
                  options: ['**Correct answer:** यह **इन मीडिया रेस (in medias res)** या **अनुक्रमभंग', 'यह स्थिति कैसे आई?', 'flashback', 'नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle, end)'],
                  hint: 'If stuck, review **c7_hin_cbse_07_002** — specifically the worked example mapping "कहानी के क्रम".',
                  misconception: '**Specific error:** Students believe *"नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle, end)"* — they memorize the 3-part label.' },
                { id: 'b', prompt: 'नीचे दी गई कहानी की घटनाओं को **कालानुक्रमिक क्रम (plot timeline)** और **प्रस्तुति क्रम (narrative order)** में अलग-अलग लिखें: *कहानी:* "रामू ने सुबह दफ्तर.', answer: '**Correct answer:** **Plot Timeline (कालानुक्रमिक):** 1',
                  options: ['**Correct answer:** **Plot Timeline (कालानुक्रमिक):** 1', 'नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle, end)'],
                  hint: 'If stuck, review **c7_hin_cbse_07_002** — specifically the worked example mapping "कहानी के क्रम".',
                  misconception: '**Specific error:** Students believe *"नैरेटिव स्ट्रक्चर = शुरुआत, मध्य, अंत (beginning, middle, end)"* — they memorize the 3-part label.' }
          ],
            remediations: { 'specific-error-students-believe': { steps: ['**Step-by-step remediation:** 1.', '**Visual mapping:** Give the student a 2-column table.', 'Left: "कहानी में घटनाओं का क्रम (Text order)" — they number paragraphs 1,2,3...', 'Right: "पात्र के जीवन में घटनाओं का क्रम (Character\'s life order)" — they reorder the same events chronologically.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक.',
          hint: 'यदि अटका हुआ लगे तो **\'संवेदी शब्दों की सूची बनाना\' (sensory word mapping)** दोहराएँ: पाठ.',
          misconception: 'छात्र समझते हैं कि **\'परिवेश = वातावरण\'** और परिवेश का वर्णन केवल \'सजावट\' या \'पृष्ठभूमि\' है जिसे याद करके परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**',
                  options: ['पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पात्र-चित्रण एक विश्लेषणात्मक कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ लगे तो **\'संवेदी शब्दों की सूची बनाना\' (sensory word mapping)** दोहराएँ: पाठ से 10.',
                  misconception: 'छात्र समझते हैं कि **\'परिवेश = वातावरण\'** और परिवेश का वर्णन केवल \'सजावट\' या \'पृष्ठभूमि\' है जिसे याद करके परीक्षा में लिख देना काफी है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**माइक्रो-टेक्स्ट अभ्यास:** छात्र को 3-4 वाक्यों का अंश दो जहाँ परिवेश स्पष्ट हो पर वातावरण न लिखा हो (उदा: "ट्रेन.', 'दो विपरीत संभावनाएँ दो (उत्साह/उदासी) और बताओ कौन-से शब्द बदलने से कौन-सा वातावरण बनेगा।" 2.', '**शब्द-प्रतिस्थापन खेल:** उसी अंश में 3 शब्द बदलवाओ (कुली → \'थके कुली\', घड़ी ने आठ बजाए → \'घड़ी ने आठ बजाए, पर ट्रेन न.', '**लेखक की कुर्सी:** छात्र से कहो: "तुम लेखक हो। पात्र को भयभीत दिखाना है। परिवेश में कौन-सी 3 चीज़ें रखोगे/बदलोगे?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक विश्लेषणात्मक कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख.',
          hint: 'यदि छात्र अटका है, तो **\'तीन-स्तंभ नोट्स\' (Three-Column Notes)** की विधि सिखाएँ: स्तंभ 1.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि नायक का पात्र-चित्रण लिखने का अर्थ है — नायक के **अच्छे गुणों की प्रशंसा करना**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक विश्लेषणात्मक कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र (नायक)',
                  options: ['पात्र-चित्रण एक विश्लेषणात्मक कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र (नायक)', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि छात्र अटका है, तो **\'तीन-स्तंभ नोट्स\' (Three-Column Notes)** की विधि सिखाएँ: स्तंभ 1 — पाठ का.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि नायक का पात्र-चित्रण लिखने का अर्थ है — नायक के **अच्छे गुणों की प्रशंसा करना** (Praise) या **कहानी का.' }
          ],
            remediations: { 'praise-plot-summary': { steps: ['**चरण 1 — निदान:** छात्र से पूछें: "इस कहानी में नायक ने ऐसा कोई काम किया जो उसके \'अच्छे गुण\' के विपरीत जाता हो?', 'या कोई बात कही जो उसने की नहीं?" यदि वह एक भी उदाहरण न दे पाए, तो समझें वह **एकआयामी (One-dimensional) दृष्टिकोण** में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ.',
          hint: 'यदि अटका हुआ महसूस हो तो c8_hin_cbse_07_004 के \'नायक के आंतरिक संघर्ष\' खंड को दोबारा.',
          misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' — वे स्क्रीन टाइम/पृष्ठ संख्या को महत्व मानते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ अंतःक्रिया',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के साथ अंतःक्रिया', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'यदि अटका हुआ महसूस हो तो c8_hin_cbse_07_004 के \'नायक के आंतरिक संघर्ष\' खंड को दोबारा पढ़ें — सहायक.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'सहायक पात्र = कम महत्वपूर्ण पात्र\' — वे स्क्रीन टाइम/पृष्ठ संख्या को महत्व मानते हैं, जबकि साहित्य में एक दृश्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछें: "पाठ में वह एक पात्र ढूंढो जो केवल एक बार आता है लेकिन नायक का फैसला बदल देता है — उसका नाम लिखो।" 2.', 'फिर पूछें: "उसके बिना कहानी का अंत क्या होता?', 'अब समझाएं: "देखो, वह कम आया पर उसका काम (function) सबसे बड़ा था — यही सहायक पात्र की परिभाषा है।" 4.', 'अभ्यास दें: तीन कहानियों (पंचतंत्र, हैरी पॉटर, महाभारत) से एक-एक सहायक पात्र चुनकर उसका प्रकार्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_07_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या भाव है जिसके चारों ओर.',
          hint: 'अगर अटके तो **c8_hin_cbse_07_002 (कथानक संरचना)** और **c8_hin_cbse_07_004 (नायक चित्रण)**.',
          misconception: 'छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\'** और **\'संदेश\' को \'लेखक का उपदेश\'** मान लेते हैं। उदाहरण: पाठ 7 में वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरा कथानक,',
                  options: ['मुख्य विषय (Central Theme) पाठ का वह केंद्रीय विचार या भाव है जिसके चारों ओर पूरा कथानक,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है', '**कथानक (Plot)** is the logical sequence of events linked by cause-and-effect in a story', 'पाठ्य-परिवेश (Setting) कहानी के घटित होने का **भौतिक स्थान, समय और सामाजिक परिस्थिति**'],
                  hint: 'अगर अटके तो **c8_hin_cbse_07_002 (कथानक संरचना)** और **c8_hin_cbse_07_004 (नायक चित्रण)** दोबारा.',
                  misconception: 'छात्र अक्सर **\'मुख्य विषय\' को \'कथानक का सारांश\'** और **\'संदेश\' को \'लेखक का उपदेश\'** मान लेते हैं। उदाहरण: पाठ 7 में वे लिख देते हैं.' }
          ],
            remediations: { '7': { steps: ['**अंतर स्पष्ट करें**: छात्र से कहें — "किसी फिल्म का नाम लो। उसका **सारांश** 2 वाक्यों में दो। फिर उसका **विषय** 1.', '**प्रमाण-आधारित अभ्यास**: पाठ 7 के 3 प्रसंग छाँटें; प्रत्येक के आगे लिखवाएँ — "यह प्रसंग किस विचार को बल देता है?" फिर.', '**संदेश निष्कर्षण**: अंतिम दृश्य पर पूछें — "लेखक यहाँ पाठक के मन में कौन-सा भाव छोड़कर गया है?" फिर उसे **सार्वभौमिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
