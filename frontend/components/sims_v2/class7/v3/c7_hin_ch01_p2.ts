import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch01_p2: SimDef = {
    id: 'v3_c7_hin_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'यह नोड केवल गौण विषयों की पहचान, वर्गीकरण (मुख्य विषय के पूरक/विरोधी/स्वतंत्र), और मुख्य.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c7_hin_ch01'],
    nodeIds: ['c7_hin_cbse_01_007', 'c7_hin_cbse_01_008', 'c7_hin_cbse_01_009', 'c7_hin_cbse_01_010', 'c7_hin_cbse_01_011', 'c7_hin_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना करो तुम एक शादी के वीडियो देख रहे हो: मुख्य विषय है \'विवाह संपन्न होना\', लेकिन साथ-साथ चल रहे हैं.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: 'गौण विषय (Sub-theme) कथा में मुख्य विषय के समानांतर चलने वाला वह सहायक विचार या प्रसंग है जो मुख्य विषय को पुष्ट करता है, उसका विस्तार करता है, या उसके विपरीत जाकर द्वंद्व उत्पन्न करता है। यह कथा में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_hin_cbse_01_012', title: 'पाठ 1 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Think about the last WhatsApp forward you received — how do you know if it\'s a fact (like "School reopens Monday") or someone\'s opinion (like "This is the best.',
            decisions: [{ prompt: 'पाठ में पूछा गया: "नायक का नाम क्या है?" — यह किस प्रकार का प्रश्न है और क्यों?', options: [
                { text: 'यह वस्तुनिष्ठ प्रश्न है क्योंकि इसका उत्तर पाठ में स्पष्ट रूप से दिया होता है (तथ्यात्मक', outcome: 'यह वस्तुनिष्ठ प्रश्न है क्योंकि इसका उत्तर पाठ में स्पष्ट रूप से दिया होता है (तथ्यात्मक ज्ञान)।.' },
                { text: 'correct answer', outcome: 'Not quite — Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like.', reveals: 'questions-have-a-single-correct' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hin_cbse_01_012', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथा में मुख्य विषय के समानांतर चलने वाला वह सहायक विचार या.',
          hint: 'यदि अटका हुआ है तो c7_hin_cbse_01_006 (मुख्य विषय) दोहराएँ — विशेषकर \'मुख्य विषय कैसे.',
          misconception: 'छात्र समझते हैं कि गौण विषय = "कहानी में आने वाला कोई भी छोटा प्रसंग/विचार"। वे *पुनरावृत्ति (recurrence)* और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथा में मुख्य विषय के समानांतर चलने वाला वह सहायक विचार या प्रसंग है',
                  options: ['गौण विषय (Sub-theme) कथा में मुख्य विषय के समानांतर चलने वाला वह सहायक विचार या प्रसंग है', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ है तो c7_hin_cbse_01_006 (मुख्य विषय) दोहराएँ — विशेषकर \'मुख्य विषय कैसे निकालें\' की.',
                  misconception: 'छात्र समझते हैं कि गौण विषय = "कहानी में आने वाला कोई भी छोटा प्रसंग/विचार"। वे *पुनरावृत्ति (recurrence)* और *कार्यात्मक संबंध (functional.' }
          ],
            remediations: { 'recurrence-functional-relationship': { steps: ['**पुनरावृत्ति खोज अभ्यास:** पाठ के 10-15 मुख्य प्रसंगों की सूची बनवाओ। छात्र से कहो: "जो विचार/प्रसंग/चिंता कम से कम 3.', '**मुख्य विषय से जोड़ तालिका:** एक टेबल बनवाओ — कॉलम: गौण विषय | प्रसंग 1 | प्रसंग 2 | प्रसंग 3 | मुख्य विषय पर प्रभाव.', '**विरोधी उदाहरण दिखाओ:** परिवेश वर्णन (जैसे \'बारिश हुई\') और गौण विषय (जैसे \'बारिश से फसल बचाने की चिंता जो किसान की.', '**मौखिक परीक्षण:** "यह प्रसंग गौण विषय क्यों है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_008', difficulty: 'standard',
          question: 'बिंब (इमेजरी) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में.',
          hint: 'यदि अटका लगे तो कक्षा 6 के पाठ 1-13 के बिंब-रूपक अभ्यास (c6_hin_cbse_01_008 से.',
          misconception: 'छात्र अक्सर समझते हैं कि **हर तुलनात्मक वाक्य रूपक है** — वे "जैसा", "जैसे", "समान", "सदृश" वाले वाक्यों को भी रूपक लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब (इमेजरी) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में',
                  options: ['बिंब (इमेजरी) वह साहित्यिक युक्ति है जिसमें शब्दों के माध्यम से पाठक के मन में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका लगे तो कक्षा 6 के पाठ 1-13 के बिंब-रूपक अभ्यास (c6_hin_cbse_01_008 से c6_hin_cbse_13_008).',
                  misconception: 'छात्र अक्सर समझते हैं कि **हर तुलनात्मक वाक्य रूपक है** — वे "जैसा", "जैसे", "समान", "सदृश" वाले वाक्यों को भी रूपक लिख देते हैं। असल में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 5 वाक्य दो — प्रत्येक में एक इंद्रिय बिंब हो (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद) — उसे बिंब प्रकार पहचानने को.', 'फिर 5 वाक्य दो जिनमें "जैसा/जैसे/सी" हों — उसे उपमा पहचानने को कहो। 3.', 'उन्हीं 5 वाक्यों से "जैसा/जैसे/सी" हटाकर रूपक में बदलने को कहो और उपमान-उपमेय बताने को कहो। 4.', 'अंत में एक छोटा अनुच्छेद दो जिसमें मिश्रित बिंब और रूपक हों — उसे छाँटने और प्रभाव बताने को कहो। चरण-दर-चरण अभ्यास से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में असंगत या गलत लगता है.',
          hint: 'यदि अटका हुआ महसूस हो तो **c7_hin_cbse_01_008 (बिंब और रूपक)** के कार्यविधि उदाहरण.',
          misconception: '**सबसे आम गलती**: छात्र **हर विपरीतार्थक वाक्य को विरोधाभास मान लेते हैं** (जैसे "वह रो रहा था पर हँस भी रहा था" — यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में असंगत या गलत लगता है, लेकिन गहराई',
                  options: ['**विरोधाभास (Paradox)** एक ऐसा कथन है जो पहली नज़र में असंगत या गलत लगता है, लेकिन गहराई', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c7_hin_cbse_01_008 (बिंब और रूपक)** के कार्यविधि उदाहरण (worked.',
                  misconception: '**सबसे आम गलती**: छात्र **हर विपरीतार्थक वाक्य को विरोधाभास मान लेते हैं** (जैसे "वह रो रहा था पर हँस भी रहा था" — यह केवल विरोधी भावनाएँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को एक साधारण विरोधी वाक्य ("वह गुस्से में मुस्कुराया") और एक विरोधाभास ("क्रोध ही उसकी शांति थी") साथ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वे विशिष्ट शब्द या पद होते हैं जो किसी पाठ के केंद्रीय विषय.',
          hint: 'यदि अटके तो **\'शब्द-शक्ति (अभिधा, लक्षणा, व्यंजना)\'** (कक्षा 6 व्याकरण/साहित्य) और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो **पाठ में सबसे ज्यादा बार आए हों (Frequency)** या जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वे विशिष्ट शब्द या पद होते हैं जो किसी पाठ के केंद्रीय विषय, भाव,',
                  options: ['पदावली: मुख्य शब्द वे विशिष्ट शब्द या पद होते हैं जो किसी पाठ के केंद्रीय विषय, भाव,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके तो **\'शब्द-शक्ति (अभिधा, लक्षणा, व्यंजना)\'** (कक्षा 6 व्याकरण/साहित्य) और **\'प्रसंगानुकूल.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि \'मुख्य शब्द\' वही हैं जो **पाठ में सबसे ज्यादा बार आए हों (Frequency)** या जो **सबसे लंबे/कठिन/तत्सम.' }
          ],
            remediations: { 'frequency': { steps: ['**काउंटर-उदाहरण दें:** एक छोटा पैराग्राफ लिखें जहाँ \'और/लेकिन\' १० बार आए और \'त्याग\' १ बार। पूछें: "कौन सा शब्द पाठ का.', '**शब्द-बादल (Word Cloud) दिखाएं:** पाठ का वर्ड क्लाउड बनाएं (ऑनलाइन टूल से)। बड़ा आकार = ज्यादा आवृत्ति। दिखाएं कि.', '**\'शब्द-प्रतिस्थापन परीक्षण\' करवाएं:** मुख्य शब्द हटाकर समानार्थी रखें। यदि पाठ का \'स्वाद/भाव\' बदल जाए → वह मुख्य शब्द.', '**अभ्यास:** पाठ 1 के १० शब्द दें, छात्र को \'मुख्य/सामान्य\' में छाँटकर कारण बताने को कहें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" refers to the conscious choice of vocabulary, sentence.',
          hint: 'यदि अटके: **कक्षा 6 के किसी भी पाठ का एक संवाद** लें → उसे **तीन रजिस्टरों**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है **कठिन शब्दों के अर्थ लिखना** या **व्याकरणिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" refers to the conscious choice of vocabulary, sentence structure,',
                  options: ['"पाठ में भाषा-प्रयोग" refers to the conscious choice of vocabulary, sentence structure,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी रचना (कहानी, कविता, निबंध) को समझने के लिए', 'कथानक (plot) is the logical sequence of events linked by cause-and-effect in a narrative,', 'पाठ्य-परिवेश और वातावरण किसी रचना में वर्णित **भौगोलिक स्थान, ऐतिहासिक काल,'],
                  hint: 'यदि अटके: **कक्षा 6 के किसी भी पाठ का एक संवाद** लें → उसे **तीन रजिस्टरों**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "भाषा-प्रयोग विश्लेषण" का अर्थ है **कठिन शब्दों के अर्थ लिखना** या **व्याकरणिक त्रुटियाँ ढूँढ़ना**।.' }
          ],
            remediations: { '6-vocabulary-rules-pragmatics-register': { steps: ['**मिनी-टास्क दें:** कक्षा के दो छात्रों को एक ही स्थिति (जैसे: होमवर्क न लाने पर शिक्षक से क्षमा माँगना) में **दो अलग.', '**पाठ पर लौटें:** उसी पाठ से एक संवाद चुनें — छात्रों से कहें: "इस संवाद को **तीन बार** पढ़ो: (क) मूल रूप में, (ख).', '**लिखित अभ्यास:** एक पैराग्राफ दें जिसमें register shift हो (जैसे: पात्र पहले बड़ों से बात करता है, फिर दोस्तों से).', '**फीडबैक लूप:** अगले तीन पाठों में हर बार एक "भाषा-प्रयोग" प्रश्न अनिवार्य रूप से दें — जब तक छात्र **कार्यात्मक कारण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिया होता है.',
          hint: 'Review Class 6 बोध-प्रश्न (c6_hin_cbse_01_012) focusing on the "Question Word -> Question.',
          misconception: 'Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like a treasure, so they.',
          parts: [
                { id: 'a', prompt: '"लेखक ने इस घटना का वर्णन क्यों किया होगा?" — इस प्रश्न का उत्तर पाठ की किस पंक्ति में मिलेगा?', answer: 'इसका उत्तर किसी एक पंक्ति में नहीं मिलेगा',
                  options: ['इसका उत्तर किसी एक पंक्ति में नहीं मिलेगा', 'correct answer'],
                  hint: 'Review Class 6 बोध-प्रश्न (c6_hin_cbse_01_012) focusing on the "Question Word -> Question Type".',
                  misconception: 'Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like a treasure, so they waste time re-reading.' },
                { id: 'b', prompt: 'दोनों प्रश्नों की तुलना करें: (अ) "कहानी किस गाँव में घटित होती है?" (ब) "गाँव का वातावरण पात्र के निर्णय को कैसे प्रभावित करता है?" — उत्तर देने की प्रक्रिया.', answer: '(अ) के लिए पाठ में एक स्थान खोजना पड़ता है (स्कैनिंग)',
                  options: ['(अ) के लिए पाठ में एक स्थान खोजना पड़ता है (स्कैनिंग)', 'correct answer'],
                  hint: 'Review Class 6 बोध-प्रश्न (c6_hin_cbse_01_012) focusing on the "Question Word -> Question Type".',
                  misconception: 'Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like a treasure, so they waste time re-reading.' }
          ],
            remediations: { 'questions-have-a-single-correct': { steps: ['Give the student a 3-sentence micro-story (e.g., "Ravi came home wet. His shoes were muddy.', 'Ask: "Did it rain? How do you know?" — force them to state the inference ("Yes, it rained") + evidence ("wet, muddy.', 'Repeat with a text excerpt from Chapter 1.', 'Create a 2-column chart: "Text says..." vs "I infer..." to make the invisible thinking visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_01_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like a treasure, so they.',
          parts: [
                { id: 'a', prompt: 'कथन: "आशय-सूचक प्रश्नों के उत्तर पाठ में छिपे होते हैं, बस ध्यान से पढ़ना पड़ता है।" — इस कथन का मूल्यांकन करें। सहमत हैं या असहमत? कारण दें।', answer: 'असहमत। आशय-सूचक उत्तर पाठ में \'छिपे\' नहीं होते',
                  options: ['असहमत। आशय-सूचक उत्तर पाठ में \'छिपे\' नहीं होते', 'correct answer'],
                  hint: 'Review Class 6 बोध-प्रश्न (c6_hin_cbse_01_012) focusing on the "Question Word -> Question Type".',
                  misconception: 'Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like a treasure, so they waste time re-reading.' },
                { id: 'b', prompt: 'पाठ 1 के किसी भी पात्र के लिए एक आशय-सूचक प्रश्न बनाएँ जिसका उत्तर देने के लिए कम से कम दो अलग-अलग प्रसंगों के साक्ष्य चाहिएँ।', answer: 'उदाहरण: "नायक की दृढ़ता किन दो घटनाओं से प्रकट होती है?"',
                  options: ['उदाहरण: "नायक की दृढ़ता किन दो घटनाओं से प्रकट होती है?"', 'correct answer'],
                  hint: 'Review Class 6 बोध-प्रश्न (c6_hin_cbse_01_012) focusing on the "Question Word -> Question Type".',
                  misconception: 'Students believe that आशय-सूचक questions have a single "correct answer" hiding in the text like a treasure, so they waste time re-reading.' }
          ],
            remediations: { 'questions-have-a-single-correct': { steps: ['Give the student a 3-sentence micro-story (e.g., "Ravi came home wet. His shoes were muddy.', 'Ask: "Did it rain? How do you know?" — force them to state the inference ("Yes, it rained") + evidence ("wet, muddy.', 'Repeat with a text excerpt from Chapter 1.', 'Create a 2-column chart: "Text says..." vs "I infer..." to make the invisible thinking visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
