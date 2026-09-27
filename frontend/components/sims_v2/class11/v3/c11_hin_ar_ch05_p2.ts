import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch05_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'See a modern institution carrying an old hierarchy in its walls.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c11_hin_ar_ch05'],
    nodeIds: ['c11_hin_ar_cbse_05_007', 'c11_hin_ar_cbse_05_008', 'c11_hin_ar_cbse_05_009', 'c11_hin_ar_cbse_05_010', 'c11_hin_ar_cbse_05_011', 'c11_hin_ar_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing a cantonment\'s promise of equality', intro: 'A new nation, a cantonment town, an old ladder of caste — the story asks who the new order is really for.', goal: 'Analyse caste and education in a post-independence cantonment setting through Nayi Kahani realism.' },
    discovery: {
        question: 'Post-1947 India promised a modern, equal cantonment — did the new order actually erase caste?',
        options: ['No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity', 'Yes — the army\'s discipline abolished caste overnight', 'Yes — independence legally ended all discrimination', 'No — because cantonments don\'t exist anymore'],
        answer: 'No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity',
        hook: 'Nayi Kahani\'s rule: no heroes, no easy rescue — just middle-class realism where dignity must be fought for inside an unequal system.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को विस्तार, गहराई और बहुआयामी परिप्रेक्ष्य प्रदान करता है, बिना केंद्रीय कथ्य को विस्थापित किए।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the cantonment\'s social structure, trace how education collides with caste, and argue whether the story\'s resolution is hope or realism.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 2/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी रचना के उद्देश्य, परिवेश और पात्रों के.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — **वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिए गए तथ्यों.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates a story set in an army cantonment where a Dalit boy\'s education is his only escape. One student calls it \'a sad tale about one cruel officer and a lucky boy — the quarters, the school, the floods are just background.\'',
            decisions: [{ prompt: 'What\'s missing from that reading?', options: [
                { text: 'Reframe through context and structure: Shukla/Shivprasad Singh write in the Nayi Kahani mode — the cantonment is a designed microcosm where quarters are allotted by rank and caste and the school is the only porous boundary, so institutions, not one villain, reproduce caste. And the elliptical structure — childhood, flood, clerkship with years skipped — enacts how change for a lower-caste life isn\'t a smooth climb but rare visible breakthroughs between invisible struggle.', outcome: 'The debate shifts from pity to analysis: \'Low Quarter vs Officer Quarter\' reads as structural evidence, and the gaps in time become the argument.' },
                { text: 'Keep the individual-villain reading — the story works as a warning about cruel officers.', outcome: 'Personalising it hides the target: the story dissects how school, army and family as systems reproduce caste — replacing one officer changes nothing.', reveals: 'caste-is-one-bad-officer' },
                { text: 'Fill in the missing years in your summary — schooling and job-hunting must have happened, so narrate them.', outcome: 'The ellipsis is deliberate: making struggle invisible between breakthroughs is how the structure mirrors the theme — summarising the gaps erases the design.', reveals: 'gaps-are-just-missing-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'The story refuses both cynicism and fantasy — dignity is possible, but only through struggle the system makes necessary.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक.',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_05_006 (मुख्य विषय और संदेश) पर वापस जाएँ और.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'दूसरे दर्जे का विषय\' (secondary importance) है, इसलिए वे परीक्षा में इसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय के समानांतर चलकर कथानक को', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_05_006 (मुख्य विषय और संदेश) पर वापस जाएँ और मुख्य विषय के.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'दूसरे दर्जे का विषय\' (secondary importance) है, इसलिए वे परीक्षा में इसे नजरअंदाज करते हैं। वास्तविक.' }
          ],
            remediations: { 'secondary-importance': { steps: ['चरण 1: छात्र से कहें — "पाठ के किसी एक पृष्ठ को खोलें और केवल उन वाक्यों को रेखांकित करें जो मुख्य पात्र के मुख्य.', 'लिखकर दिखाएँ।" चरण 3: छात्र के लिखे का मिलान करें — यदि वह कहता है "कहानी समझ में नहीं आएगी" या "गहराई चली जाएगी", तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (दृश्य, श्रव्य, घ्राण.',
          hint: 'यदि अटका लगे तो कक्षा 10 की \'अलंकार\' पाठ्य-सामग्री (उपमा, रूपक, उत्प्रेक्षा) को दोहराएँ.',
          misconception: '**सटीक भ्रांति:** छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (Visual Description)** और **रूपक = सुंदर तुलना (Fancy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (दृश्य, श्रव्य, घ्राण, स्पर्श,',
                  options: ['**बिंब (Imagery)** शब्दों के माध्यम से पाठक की इंद्रियों (दृश्य, श्रव्य, घ्राण, स्पर्श,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटका लगे तो कक्षा 10 की \'अलंकार\' पाठ्य-सामग्री (उपमा, रूपक, उत्प्रेक्षा) को दोहराएँ, विशेषकर.',
                  misconception: '**सटीक भ्रांति:** छात्र समझते हैं कि **बिंब = केवल दृश्य वर्णन (Visual Description)** और **रूपक = सुंदर तुलना (Fancy Comparison)**। **क्यों.' }
          ],
            remediations: { 'visual-description-fancy-comparison': { steps: ['**इंद्रिय-जागरूकता अभ्यास:** कक्षा में 30 सेकंड आँख बंद करवाएँ — फिर पूछें: "अभी तुम्हें क्या सुनाई दिया?', 'त्वचा पर क्या महसूस हुआ?" इसे \'बिंब-डायरी\' से जोड़ें। 2.', '**रूपक-शल्यक्रिया:** किसी सरल वाक्य ("परीक्षा कठिन थी") को लें — छात्रों से कहें: "कठिन को किसी मूर्त वस्तु/प्राणी से.', '**संयुक्त विश्लेषण:** एक छोटी कविता दें जहाँ बिंब और रूपक घुले-मिले हों; छात्र पहले रंगीन पेंसिल से बिंब (लाल=दृश्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_009', difficulty: 'standard',
          question: 'विरोधाभास (पैराडॉक्स) एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_05_008 (बिंब और रूपक) के "कार्यात्मक भेद" खंड को दोहराएं।',
          misconception: 'छात्र अक्सर मानते हैं कि विरोधाभास केवल "विरोधी शब्दों का युग्म" (ऑक्सीमोरॉन) है, जबकि विरोधाभास वाक्य/स्थिति स्तर पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास (पैराडॉक्स) एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार एक',
                  options: ['विरोधाभास (पैराडॉक्स) एक ऐसी साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी कथन या विचार एक', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_05_008 (बिंब और रूपक) के "कार्यात्मक भेद" खंड को दोहराएं।',
                  misconception: 'छात्र अक्सर मानते हैं कि विरोधाभास केवल "विरोधी शब्दों का युग्म" (ऑक्सीमोरॉन) है, जबकि विरोधाभास वाक्य/स्थिति स्तर पर भी हो सकता है (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को "ऑक्सीमोरॉन" (विरोधाभास-अलंकार) और "विरोधाभास" (पैराडॉक्स) का अंतर स्पष्ट करें: ऑक्सीमोरॉन = दो शब्द (जैसे.', 'एक ही पाठ से दो उदाहरण दें: एक ऑक्सीमोरॉन, एक स्थिति-विरोधाभास — छात्र से दोनों का प्रभाव तुलना करवाएं। 3.', 'प्रतीक के लिए: कोई एक वस्तु (जैसे "नीम का पेड़") लें और तीन अलग कहानियों में उसके बदलते अर्थ दिखाएं — इससे "निजी बनाम.', 'अंत में छात्र से कहें: "अब अपने शब्दों में परिभाषा लिखो" — यदि वह कार्यात्मक भेद बता दे तो मास्टरी मानें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_010', difficulty: 'standard',
          question: '**पदावली: मुख्य शब्द** किसी पाठ में प्रयुक्त उन **महत्वपूर्ण शब्दों/पदों** का.',
          hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (नोड 006)** और **\'पात्र-चित्रण: नायक\' (नोड 004)**.',
          misconception: '**विशिष्ट भ्रांति:** *"मुख्य शब्द वही हैं जो पाठ में \'कठिन\' या \'अनजान\' लगते हैं।"* **गलत तर्क:** छात्र **शब्द की जटिलता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पदावली: मुख्य शब्द** किसी पाठ में प्रयुक्त उन **महत्वपूर्ण शब्दों/पदों** का समुच्चय है',
                  options: ['**पदावली: मुख्य शब्द** किसी पाठ में प्रयुक्त उन **महत्वपूर्ण शब्दों/पदों** का समुच्चय है', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (नोड 006)** और **\'पात्र-चित्रण: नायक\' (नोड 004)** दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** *"मुख्य शब्द वही हैं जो पाठ में \'कठिन\' या \'अनजान\' लगते हैं।"* **गलत तर्क:** छात्र **शब्द की जटिलता (difficulty)** को.' }
          ],
            remediations: { 'difficulty-significance': { steps: ['**पाठ के 3 अनुच्छेद** चुनकर छात्र से कहें: *"हर अनुच्छेद से **एक शब्द** उठाओ जो अगर हटा दिया जाए तो उस अनुच्छेद का.', 'फिर उन 3 शब्दों को **पाठ के शीर्षक/मुख्य विषय** से जोड़ने को कहें — *"ये शब्द शीर्षक को कैसे सिद्ध करते हैं?"* 3.', 'अब **शब्द-आवृत्ति सारणी** बनवाएँ: पाठ के 10 सबसे अधिक आए शब्द गिनें, फिर पूछें — *"इनमें से कौन से 3 शब्द पाठ की.', 'अंत में: **बोर्ड प्रश्न पैटर्न** दिखाएँ — *"देखो, यही पूछा जाता है: \'मुख्य शब्द चुनकर प्रसंगिक अर्थ लिखो\' — अब तुम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी रचना के उद्देश्य, परिवेश और.',
          hint: 'यदि अटके तो \'पदावली: मुख्य शब्द\' (c11_hin_ar_cbse_05_010) के \'भावार्थ बनाम शब्दार्थ\' खंड.',
          misconception: 'छात्र समझते हैं कि \'व्याकरण: पाठ में भाषा-प्रयोग\' का अर्थ केवल \'अशुद्ध वाक्यों को शुद्ध करना\' या \'पद-परिचय करना\' है। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी रचना के उद्देश्य, परिवेश और पात्रों के',
                  options: ['पाठ में भाषा-प्रयोग का तात्पर्य लेखक द्वारा अपनी रचना के उद्देश्य, परिवेश और पात्रों के', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके तो \'पदावली: मुख्य शब्द\' (c11_hin_ar_cbse_05_010) के \'भावार्थ बनाम शब्दार्थ\' खंड को दोहराएँ।',
                  misconception: 'छात्र समझते हैं कि \'व्याकरण: पाठ में भाषा-प्रयोग\' का अर्थ केवल \'अशुद्ध वाक्यों को शुद्ध करना\' या \'पद-परिचय करना\' है। वे यह नहीं देख पाते कि.' }
          ],
            remediations: { 'grammar-stylistic-choice': { steps: ['चरण 1: छात्र से कहें — "किसी एक वाक्य को लीजिए (जैसे: \'उसने दरवाज़ा खोला\' बनाम \'दरवाज़ा खुला\')। दोनों का तथ्यात्मक अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिए गए.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_05_002 (कथानक)** और **c11_hin_ar_cbse_05_006 (मुख्य विषय)**.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **आशय-सूचक प्रश्नों का उत्तर "अपने शब्दों में" लिखने का अर्थ है — पाठ से प्रमाण न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिए गए तथ्यों,',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से दिए गए तथ्यों,', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है: किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक,', 'कथानक (Plot) घटनाओं का वह सुव्यवस्थित क्रम है जो कारण-कार्य संबंध (Causality) से बँधा', 'पाठ्य-परिवेश (Setting) कथा का वह स्पेशियो-टेम्पोरल फ्रेमवर्क है जिसमें स्थान, काल,'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_05_002 (कथानक)** और **c11_hin_ar_cbse_05_006 (मुख्य विषय)** दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **आशय-सूचक प्रश्नों का उत्तर "अपने शब्दों में" लिखने का अर्थ है — पाठ से प्रमाण न देना**। वे लिखते.' }
          ],
            remediations: { '10': { steps: ['**चरण 1**: छात्र को एक छोटा पाठांश दें और पूछें: "यहाँ लेखक क्या कहना चाहता है?" — जब वह उत्तर दे, तो तुरंत पूछें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
