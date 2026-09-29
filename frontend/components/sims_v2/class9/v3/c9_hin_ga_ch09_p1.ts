import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch09_p1: SimDef = {
    id: 'v3_c9_hin_ga_ch09_p1',
    title: 'पाठ 9 · Part 1/3',
    subtitle: 'This node covers the methodology for researching and analyzing the background context and.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 9 · Part 1/3',
    chapters: ['c9_hin_ga_ch09'],
    nodeIds: ['c9_hin_ga_cbse_09_001', 'c9_hin_ga_cbse_09_002', 'c9_hin_ga_cbse_09_003', 'c9_hin_ga_cbse_09_004', 'c9_hin_ga_cbse_09_005', 'c9_hin_ga_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'गंगा खोलिए और पाठ 09 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1).', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 9 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 9 — पृष्ठभूमि', 'पाठ 9 — कथानक', 'पाठ 9 — पाठ्य-परिवेश', 'पाठ 9 — पात्र-चित्रण', 'पाठ 9 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 9 · Part 1/3', spots: [
            { id: 's1', label: '9 -', prompt: 'Which idea is this? — \'तुलसीदास के दोहे\' का कथानक — तुलसीदास के दोहों में नीति, प्रेम और जीवन-मूल्यों का बोध.', answer: '9 -', options: ['9 -', '9 -'] },
            { id: 's2', label: '9 -', prompt: 'Which idea is this? — \'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित है।', answer: '9 -', options: ['9 -', '9 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 9 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 9 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 9 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 8 History \'The Making of the National Movement\' and Class 8 Hindi.',
          misconception: 'छात्र अक्सर \'पृष्ठभूमि\' और \'रचनाकार परिचय\' को एक-दूसरे का पर्याय मान लेते हैं — जैसे "प्रेमचंद गरीब थे, इसलिए पृष्ठभूमि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)', '\'तुलसीदास के दोहे\' का पात्र-चित्रण'],
                  hint: 'If stuck, review Class 8 History \'The Making of the National Movement\' and Class 8 Hindi \'हिंदी.',
                  misconception: 'छात्र अक्सर \'पृष्ठभूमि\' और \'रचनाकार परिचय\' को एक-दूसरे का पर्याय मान लेते हैं — जैसे "प्रेमचंद गरीब थे, इसलिए पृष्ठभूमि ग्रामीण है"। यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: दो कॉलम बनाएं — बाएं \'पृष्ठभूमि\' (काल, स्थान, सामाजिक संरचना, आर्थिक स्थिति, राजनीतिक घटनाएं), दाएं \'रचनाकार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_002', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' का कथानक — तुलसीदास के दोहों में नीति, प्रेम और जीवन-मूल्यों.',
          hint: 'अगर अटके तो E.M. फॉर्स्टर का प्रसिद्ध उदाहरण दोहराएँ: "The king died and then the queen.',
          misconception: 'छात्र समझते हैं कि \'आख्यान-संरचना\' केवल **कालक्रम (chronology)** का सवाल है — यानी घटनाएँ कब घटीं। असल में संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' का कथानक',
                  options: ['\'तुलसीदास के दोहे\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)', '\'तुलसीदास के दोहे\' का पात्र-चित्रण'],
                  hint: 'अगर अटके तो E.M. फॉर्स्टर का प्रसिद्ध उदाहरण दोहराएँ: "The king died and then the queen died".',
                  misconception: 'छात्र समझते हैं कि \'आख्यान-संरचना\' केवल **कालक्रम (chronology)** का सवाल है — यानी घटनाएँ कब घटीं। असल में संरचना **सूचना-नियंत्रण.' }
          ],
            remediations: { 'chronology-information-management': { steps: ['छात्र को एक छोटी कहानी (जैसे \'बूढ़ी काकी\') दें और कहें: "तीन बार पढ़ो — पहली बार: क्या हुआ?', 'दूसरी बार: लेखन ने तुम्हें क्या **नहीं** बताया जब तक अंत न आया?', 'तीसरी बार: अगर क्रम बदल दें तो प्रभाव कैसे बदलेगा?" 2.', 'Freytag’s Pyramid पर कहानी के बिंदु चिपकाने का **हाथों-हाथ (hands-on)** अभ्यास कराएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_003', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटकें तो c9_hin_ga_cbse_09_002 के "कथानक के चरण" और c9_hin_ga_cbse_09_001 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र "परिवेश" और "वातावरण" को समानार्थी मानते हैं और परीक्षा में दोनों के लिए एक ही उत्तर लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)',
                  options: ['\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पात्र-चित्रण'],
                  hint: 'यदि अटकें तो c9_hin_ga_cbse_09_002 के "कथानक के चरण" और c9_hin_ga_cbse_09_001 के "रचनाकालीन.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र "परिवेश" और "वातावरण" को समानार्थी मानते हैं और परीक्षा में दोनों के लिए एक ही उत्तर लिख देते हैं — जैसे "गाँव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — विभेद स्पष्ट करो:** दो कॉलम बनाओ। बाएँ: "परिवेश = क्या है?', '(तथ्य: स्थान, समय, समाज)"। दाएँ: "वातावरण = कैसा लगता है?', '(भाव: भय, शांति, घुटन)"। 2.', '**चरण 2 — एक ही दृश्य के दो वातावरण दिखाओ:** वही कमरा — (क) सुबह धूप, चिड़ियों की चहचहाहट → आशा का वातावरण; (ख) रात.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_004', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटके: **कथानक-मानचित्र (plot map)** बनाएँ — प्रत्येक प्रमुख घटना के आगे लिखें: "नायक.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** + **कहानी का सारांश (plot.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' का पात्र-चित्रण',
                  options: ['\'तुलसीदास के दोहे\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **कथानक-मानचित्र (plot map)** बनाएँ — प्रत्येक प्रमुख घटना के आगे लिखें: "नायक ने क्या.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि पात्र-चित्रण = **गुणों की सूची (list of traits)** + **कहानी का सारांश (plot summary)**। वे लिखते हैं.' }
          ],
            remediations: { 'list-of-traits-plot-summary': { steps: ['**पहला कदम:** छात्र से कहें: "अपना लिखा हुआ पढ़ो और हर विशेषण (बहादुर, ईमानदार, आदि) के आगे **पेंसिल से एक.', '**दूसरा कदम:** जहाँ साक्ष्य न मिले, वहाँ **लाल निशान** लगाएँ — ये **दावे बिना प्रमाण** हैं। 3.', '**तीसरा कदम:** एक-एक साक्ष्य के लिए **\'कैसे/क्यों\' (how/why)** पूछें और उत्तर को **Explanation** वाक्य में बदलें। 4.', '**चौथा कदम:** अंत में **Link वाक्य** जोड़ें जो विशेषता को नायक के **केंद्रीय चरित्र/थीम** से जोड़े। इस **4-चरणीय ऑडिट**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_005', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके: नोड 004 के \'कार्येड उदाहरण\' दोबारा पढ़ें और नायक के चरित्र-गुणों की सूची बनाकर.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'सहायक पात्र = कम संवाद/कम दृश्य = कम विश्लेषण\'। इसलिए वे धनिया या गोबर के केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' के सहायक पात्र',
                  options: ['\'तुलसीदास के दोहे\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: नोड 004 के \'कार्येड उदाहरण\' दोबारा पढ़ें और नायक के चरित्र-गुणों की सूची बनाकर रखें; फिर.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'सहायक पात्र = कम संवाद/कम दृश्य = कम विश्लेषण\'। इसलिए वे धनिया या गोबर के केवल प्रमुख दृश्य (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read)**: पाठ से उस सहायक पात्र के **सभी संवाद** (बड़े-छोटे) अलग कागज पर उतारें — दृश्य न देखकर केवल.', '**वर्गीकरण (Classify)**: प्रत्येक संवाद के आगे लिखें: (क) नायक को संबोधित, (ख) स्वयं का भाव, (ग) कथानक-सूचना। 3.', '**मिलान (Map)**: (क) वाले संवादों से पूछें: "यह होरी के किस गुण को चुनौती दे रहा है / पुष्ट कर रहा है?" — यही बोर्ड.', '**अभ्यास (Drill)**: एक सहायक पात्र पर 50 शब्दों का माइक्रो-उत्तर लिखें: "पात्र X, संवाद Y द्वारा, नायक के गुण Z को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_09_006', difficulty: 'standard',
          question: '\'तुलसीदास के दोहे\' का मुख्य विषय — तुलसीदास के दोहे — नीति और जीवन-दर्शन',
          hint: 'यदि अटके तो "पात्र-चित्रण: नायक" नोड (c9_hin_ga_cbse_09_004) के \'संघर्ष के क्षण\' खंड को.',
          misconception: 'छात्र प्रायः **\'मुख्य विषय\' को \'कथानक का सारांश\' मान लेते हैं** — जैसे लिख देते हैं "नायक गाँव आया, भेदभाव देखा, लड़ा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तुलसीदास के दोहे\' का मुख्य विषय',
                  options: ['\'तुलसीदास के दोहे\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'तुलसीदास के दोहे\' का कथानक', '\'तुलसीदास के दोहे\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो "पात्र-चित्रण: नायक" नोड (c9_hin_ga_cbse_09_004) के \'संघर्ष के क्षण\' खंड को दोबारा.',
                  misconception: 'छात्र प्रायः **\'मुख्य विषय\' को \'कथानक का सारांश\' मान लेते हैं** — जैसे लिख देते हैं "नायक गाँव आया, भेदभाव देखा, लड़ा, जीत गया"। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के तीन सबसे महत्त्वपूर्ण दृश्य चुनो जहाँ नायक को चुनना पड़ा — चुप रहना या बोलना। उन तीनों में कॉमन.', 'फिर पूछें: "लेखक ने अंत में नायक को जीतते हुए नहीं, लड़ते हुए क्यों दिखाया?" — इससे संदेश \'परिणाम नहीं, प्रक्रिया\' समझ.', 'अब एक टेबल बनवाएँ: कॉलम 1 = प्रसंग, कॉलम 2 = नायक का कृत्य, कॉलम 3 = कौन-सा मूल्य उभरा। इससे विषय के साक्ष्य जुड़ेंगे।.', 'अंत में PEEL शीट पर एक मॉडल उत्तर साथ लिखवाएँ, फिर छात्र को स्वयं लिखने दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
