import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_a_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_a_ch11_p1: SimDef = {
    id: 'v3_c11_hin_a_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'This node covers *only* the extrinsic context: the author\'s biography, literary.',
    classLevel: 11, subject: 'hin_a', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c11_hin_a_ch11'],
    nodeIds: ['c11_hin_a_cbse_11_001', 'c11_hin_a_cbse_11_002', 'c11_hin_a_cbse_11_003', 'c11_hin_a_cbse_11_004', 'c11_hin_a_cbse_11_005', 'c11_hin_a_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If you found a letter written in 1947 mentioning \'the midnight hour,\' would you understand.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय', text: 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in which the chapter\'s text was written, alongside a biographical and literary introduction to the author (रचनाकार परिचय).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_a_cbse_11_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        labels: ['पाठ 11 — पृष्ठभूमि', 'पाठ 11 — कथानक', 'पाठ 11 — पाठ्य-परिवेश', 'पाठ 11 — पात्र-चित्रण', 'पाठ 11 — मुख्य'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_a_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 11 · Part 1/3', spots: [
            { id: 's1', label: '11 -', prompt: 'Which idea is this? — कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि.', answer: '11 -', options: ['11 -', '11 -'] },
            { id: 's2', label: '11 -', prompt: 'Which idea is this? — पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality.', answer: '11 -', options: ['11 -', '11 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_a_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 11 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_001', difficulty: 'standard',
          question: 'This topic covers the historical, social, and cultural context (पृष्ठभूमि).',
          hint: 'यदि अटका महसूस हो तो **\'हिंदी कहानी का विकास क्रम\' (Development of Hindi Short Story)**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'पृष्ठभूमि\' को **\'कहानी का सारांश\' (Summary of the story)** समझ लेते हैं। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in',
                  options: ['This topic covers the historical, social, and cultural context (पृष्ठभूमि) in', 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि', 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of', 'पात्र-चित्रण (Characterization) में नायक/प्रमुख पात्र वह केंद्रीय पात्र होता है जिसके'],
                  hint: 'यदि अटका महसूस हो तो **\'हिंदी कहानी का विकास क्रम\' (Development of Hindi Short Story)** नामक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'पृष्ठभूमि\' को **\'कहानी का सारांश\' (Summary of the story)** समझ लेते हैं। वे लिखते हैं: "पृष्ठभूमि: यह कहानी एक.' }
          ],
            remediations: { 'summary-of-the-story': { steps: ['**भेद स्पष्ट करें:** छात्र से कहें: "अपनी पाठ्यपुस्तक खोलें। \'पृष्ठभूमि\' शीर्षक वाले बॉक्स में झाँकें। क्या उसमें.', 'यदि हाँ, तो यह \'कथानक/परिवेश\' है, \'पृष्ठभूमि\' नहीं।" 2.', '**दो-स्तरीय तालिका बनाएँ:** बाएँ कॉलम में लिखें: **पाठ्य-परिवेश (Setting)** — गाँव का नाम, मौसम, घर का वर्णन। दाएँ कॉलम.', '**लिंक स्थापित करें:** पूछें: "दाएँ कॉलम की कौन सी घटना बाएँ कॉलम के पात्र को प्रभावित कर रही है?" यही \'पृष्ठभूमि\' की.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता.',
          hint: 'यदि फॉर्स्टर का भेद या फ्रेटैग पिरामिड स्पष्ट न हो, तो **किसी भी परिचित कहानी.',
          misconception: 'छात्र समझते हैं कि **\'कथानक\' का अर्थ केवल \'क्या-क्या हुआ\' की सूची बनाना है**। वे फ्रेटैग पिरामिड के पाँच सोपान रट लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि',
                  options: ['कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि', 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in', 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of', 'पात्र-चित्रण (Characterization) में नायक/प्रमुख पात्र वह केंद्रीय पात्र होता है जिसके'],
                  hint: 'यदि फॉर्स्टर का भेद या फ्रेटैग पिरामिड स्पष्ट न हो, तो **किसी भी परिचित कहानी (पंचतंत्र/बचपन की.',
                  misconception: 'छात्र समझते हैं कि **\'कथानक\' का अर्थ केवल \'क्या-क्या हुआ\' की सूची बनाना है**। वे फ्रेटैग पिरामिड के पाँच सोपान रट लेते हैं पर यह नहीं देखते.' }
          ],
            remediations: { 'rising-action': { steps: ['छात्र को एक परिचित फिल्म (जैसे *शोले* या *बाहुबली*) के **केवल 5 प्रमुख दृश्य** लिखने को कहें — फिर पूछें: "दृश्य 2.', 'दृश्य 3, दृश्य 2 का **परिणाम** कैसे है?" — तीर (→) खींचकर कारण-कार्य श्रृंखला दिखाएँ। 2.', 'फिर उसी फिल्म को **गैर-रैखिक क्रम** में पुनर्व्यवस्थित करने को कहें (जैसे: अंत → फ्लैशबैक → मध्य → आरंभ) और पूछें: "अब.', 'अंत में पाठ की किसी कहानी (जैसे *नमक का दरोगा* या *अपना-अपना भाग्य*) पर यही अभ्यास दोहराएँ — पहले घटनाएँ, फिर.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the.',
          hint: 'यदि अटका हुआ महसूस हो: **पाठ के पहले और अंतिम अनुच्छेद** को साथ रखकर पढ़ें — परिवेश में.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि "परिवेश विश्लेषण" = "वर्णनात्मक विशेषणों की सूची बनाना" (listing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of',
                  options: ['पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of', 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in', 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि', 'पात्र-चित्रण (Characterization) में नायक/प्रमुख पात्र वह केंद्रीय पात्र होता है जिसके'],
                  hint: 'यदि अटका हुआ महसूस हो: **पाठ के पहले और अंतिम अनुच्छेद** को साथ रखकर पढ़ें — परिवेश में क्या बदला?',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि "परिवेश विश्लेषण" = "वर्णनात्मक विशेषणों की सूची बनाना" (listing descriptive adjectives)। वे.' }
          ],
            remediations: { 'listing-descriptive-adjectives': { steps: ['**चरण 1 — पुनर्प्रशिक्षण (Re-teach):** विद्यार्थी के साथ पाठ का **एक छोटा अंश (5-6 पंक्तियाँ)** लें। उससे पूछें: "यहाँ.', 'यदि यह विवरण हटा दें, तो कहानी में क्या बदल जाएगा?"** → यही \'क्रियात्मक विश्लेषण\' (functional analysis) है। **चरण 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) में नायक/प्रमुख पात्र वह केंद्रीय पात्र होता है.',
          hint: 'अगर अटके तो c11_hin_a_cbse_11_002 (कथानक और आख्यान-संरचना) के \'चरमोत्कर्ष और मोड़\' खंड को.',
          misconception: '**Specific Error:** Students equate "प्रमुख पात्र" with "जो सबसे ज्यादा पन्नों पर दिखाई दे" या "जिससे हम सहानुभूति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) में नायक/प्रमुख पात्र वह केंद्रीय पात्र होता है जिसके',
                  options: ['पात्र-चित्रण (Characterization) में नायक/प्रमुख पात्र वह केंद्रीय पात्र होता है जिसके', 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in', 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि', 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of'],
                  hint: 'अगर अटके तो c11_hin_a_cbse_11_002 (कथानक और आख्यान-संरचना) के \'चरमोत्कर्ष और मोड़\' खंड को दोहराएं.',
                  misconception: '**Specific Error:** Students equate "प्रमुख पात्र" with "जो सबसे ज्यादा पन्नों पर दिखाई दे" या "जिससे हम सहानुभूति रखें"। **Why.' }
          ],
            remediations: { 'specific-error-students-equate-with': { steps: ['**Re-anchor on causality:** Ask the student to draw a **cause-effect flowchart** of the story\'s 5 major events.', 'Label each event with "Who decided/acted?" — the name appearing most as *cause* (not just participant) is the.', '**Contrast with narrator:** In \'Usne Kaha Tha\', list 3 things the *narrator* does vs 3 things *Lahna Singh* does.', 'Show how Lahna\'s actions *cause* the narrator\'s observations.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या अधीनस्थ भूमिका.',
          hint: 'यदि अटके तो नोड 004 (नायक का चरित्र-चित्रण) और नोड 002 (कथानक संरचना) के \'Turning Points\'.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' का विश्लेषण करते समय केवल यह लिखना काफी है कि "वह नायक का दोस्त/भाई/नौकर था और उसकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या अधीनस्थ भूमिका निभाकर कथानक',
                  options: ['सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या अधीनस्थ भूमिका निभाकर कथानक', 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in', 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि', 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of'],
                  hint: 'यदि अटके तो नोड 004 (नायक का चरित्र-चित्रण) और नोड 002 (कथानक संरचना) के \'Turning Points\' खंड को.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र\' का विश्लेषण करते समय केवल यह लिखना काफी है कि "वह नायक का दोस्त/भाई/नौकर था और उसकी मदद करता था।" वे यह.' }
          ],
            remediations: { 'structural-function-confidant': { steps: ['छात्र से कहें: "पाठ से उस सहायक पात्र के **केवल तीन संवाद/कार्य** छांटो जो नायक के फैसले को सीधे बदलते हों।" (Focus.', 'फिर पूछें: "अगर यह पात्र हटा दिया जाए, तो नायक क्या **नहीं** कर पाएगा?" (Counterfactual Reasoning) 3.', 'अंत में लिखवाएं: "इस पात्र की भूमिका ______ (Foil/Confidant/Catalyst) है क्योंकि यह नायक के ______ (गुण/द्वंद्व/निर्णय).', 'इस अभ्यास को दो अलग पाठों पर दोहराएं — पैटर्न पहचान (Pattern Recognition) से भ्रांति टूटती है।'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_a_cbse_11_006', difficulty: 'standard',
          question: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार, भाव या.',
          hint: 'यदि अटके: **\'कथानक बनाम विषय\' अभ्यास** करें — किसी जानी-पहचानी कहानी (जैसे \'ईदगाह\') का.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'मुख्य विषय एक शब्द या वाक्यांश में कहा जा सकता है\'** (जैसे: \'गरीबी\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार, भाव या चिंतन-धारा है जो',
                  options: ['**मुख्य विषय (Central Theme)** किसी रचना का वह केंद्रीय विचार, भाव या चिंतन-धारा है जो', 'This topic covers the historical, social, and cultural context (पृष्ठभूमि) in', 'कथानक (Plot) घटनाओं का वह कारण-कार्य-आधारित क्रम है जो नाटकीय तनाव उत्पन्न करता है, जबकि', 'पाठ्य-परिवेश और वातावरण (Textual Environment and Atmosphere) refers to the totality of'],
                  hint: 'यदि अटके: **\'कथानक बनाम विषय\' अभ्यास** करें — किसी जानी-पहचानी कहानी (जैसे \'ईदगाह\') का प्लॉट 3.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **\'मुख्य विषय एक शब्द या वाक्यांश में कहा जा सकता है\'** (जैसे: \'गरीबी\', \'भ्रष्टाचार\', \'प्रेम\')।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार**: (1) छात्र से कहें: **"पाठ के 3 प्रमुख पात्रों के नाम लिखो और प्रत्येक का एक केंद्रीय संघर्ष लिखो।"**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
