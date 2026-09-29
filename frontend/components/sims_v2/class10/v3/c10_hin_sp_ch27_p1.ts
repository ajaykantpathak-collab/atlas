import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch27_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch27_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch27_p1',
    title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 1/3',
    subtitle: 'इस नोड में **केवल पृष्ठभूमि (ऐतिहासिक-सामाजिक संदर्भ) और रचनाकार परिचय (निराला का जीवन.',
    classLevel: 10, subject: 'hin_sp', topic: 'अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 1/3',
    chapters: ['c10_hin_sp_ch27'],
    nodeIds: ['c10_hin_sp_cbse_27_001', 'c10_hin_sp_cbse_27_002', 'c10_hin_sp_cbse_27_003', 'c10_hin_sp_cbse_27_004', 'c10_hin_sp_cbse_27_005', 'c10_hin_sp_cbse_27_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कवि-परिचय की दो पंक्तियाँ लिखिए — नाम-युग (निराला, छायावाद-प्रवर्तक) और चेतना (प्रगतिवादी समाज-दृष्टि)। फिर.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'अब कहाँ दूसरे के दुख से दुखी होने वाले — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और साहित्यिक पहचान (छायावाद के प्रवर्तक, प्रगतिवादी चेतना से जुड़ाव), शीर्षक की व्यंजना (दूसरे के दुख से दुखी होने की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_27_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['अब कहाँ दूसरे के'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_27_004', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['**Link लिखें** — इस प्रकार, संवेदनशीलता नायक की \'कमजोरी\'.', '**दूसरा Explanation लिखें** — यह सिद्ध करता है कि.', '**दूसरा Evidence खोजें** — नायक का अपनी व्यावहारिक हानि.', '**पहला Explanation लिखें** — यह दिखाता है कि संवेदनशीलता.', '**पहला Evidence खोजें** — पाठ से वह प्रसंग जहां नायक किसी.', '**Point निर्धारित करें** — नायक की संवेदनशीलता स्वैच्छिक.'], answer: '**Point निर्धारित करें** — नायक की संवेदनशीलता स्वैच्छिक. **पहला Evidence खोजें** — पाठ से वह प्रसंग जहां नायक किसी. **पहला Explanation लिखें** — यह दिखाता है कि संवेदनशीलता. **दूसरा Evidence खोजें** — नायक का अपनी व्यावहारिक हानि. **दूसरा Explanation लिखें** — यह सिद्ध करता है कि. **Link लिखें** — इस प्रकार, संवेदनशीलता नायक की \'कमजोरी\'.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_27_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through अब कहाँ दूसरे के दुख से दुखी होने वाले like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अब कहाँ दूसरे के दुख से दुखी होने वाले · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 9 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) के \'छायावाद\' और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि कविता **\'अतीत महान था, वर्तमान पतित है\'** का सरल रोमांटिक विलाप है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 9 की हिंदी पाठ्यपुस्तक (स्पर्श/संचयन) के \'छायावाद\' और \'प्रगतिवाद\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि कविता **\'अतीत महान था, वर्तमान पतित है\'** का सरल रोमांटिक विलाप है। **वास्तविकता:** निराला **अतीत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन:** कविता की पहली दो पंक्तियाँ जोर से पढ़ें — \'अब कहाँ…\' में **प्रश्नवाचक चिह्न** नहीं, **आक्रोश** सुनें। 2.', '**इतिहास जोड़ें:** 1943 के बंगाल अकाल की एक तस्वीर/विवरण दिखाएँ — पूछें: \'क्या यह अतीत की महानता है या वर्तमान का.', '**विचारधारा स्पष्ट करें:** प्रगतिशील लेखक संघ के **\'हथियार\' वाले वाक्य** को बोर्ड पर लिखें; निराला की कविता को उससे.', '**लघु-लेखन:** छात्र से 50 शब्दों में लिखवाएँ — \'कविता अतीत की प्रशंसा नहीं, वर्तमान को बदलने का आह्वान है — कैसे?\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_002', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक — \'अब कहाँ दूसरे के दुख से.',
          hint: 'यदि अटका लगे तो **किसी परिचित कहानी (जैसे \'पंच परमेश्वर\' या \'बड़े भाई साहब\')** को लेकर.',
          misconception: '**सबसे घातक भ्रम:** छात्र **\'कथानक\' (Plot) = \'सारांश/घटनाक्रम\' (Summary/Story)** मान लेते हैं। उदाहरण: परीक्षा में पूछा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पात्र-चित्रण'],
                  hint: 'यदि अटका लगे तो **किसी परिचित कहानी (जैसे \'पंच परमेश्वर\' या \'बड़े भाई साहब\')** को लेकर उपरोक्त.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **\'कथानक\' (Plot) = \'सारांश/घटनाक्रम\' (Summary/Story)** मान लेते हैं। उदाहरण: परीक्षा में पूछा जाए *"कथानक की.' }
          ],
            remediations: { 'plot-summary-story': { steps: ['**पुनः पाठ पढ़ो** केवल **पाँच पड़ावों (Five Beats)** के लिए: आरंभ → उद्दीपन → विकास → चरम → उपसंहार — प्रत्येक के सामने.', '**दो रंगों के पेन लो**: लाल से **घटनाएँ (What)**, नीले से **कारण-कारण लिंक (Why/How)** चिह्नित करो — जहाँ नीला न हो.', '**एक मित्र को 2 मिनट में कहानी सुनाओ** — यदि तुम केवल \'फिर ये हुआ, फिर वो हुआ\' कह पाए, तो कथानक नहीं समझा; यदि \'इसलिए.', '**भ्रम दूर होने तक** \'कथानक\' शब्द के आगे कोष्ठक में **(कारण-कार्य संरचना)** लिखकर अभ्यास करो।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_003', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting) — पाठ किस.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_27_002 (कथानक) के \'प्रमुख घटना-क्रम\' खंड को.',
          misconception: '**विशिष्ट भ्रांति**: विद्यार्थी मानते हैं कि \'परिवेश\' और \'वातावरण\' पर्यायवाची हैं — दोनों का अर्थ \'माहौल\' ही है। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_27_002 (कथानक) के \'प्रमुख घटना-क्रम\' खंड को दोहराएँ और.',
                  misconception: '**विशिष्ट भ्रांति**: विद्यार्थी मानते हैं कि \'परिवेश\' और \'वातावरण\' पर्यायवाची हैं — दोनों का अर्थ \'माहौल\' ही है। **गलत तर्क**: "कहानी गाँव.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: विद्यार्थी से कहें — "कहानी के किसी एक पात्र (जैसे गंगी) को चुनो। उसके **बाहर** क्या है?', '(जाति, गरीबी, पति की बीमारी, हरखू का घर) — यह **परिवेश** लिखो। अब उसके **अंदर** क्या है जब वह हरखू के दरवाजे खड़ी है?', '(भय, साहस, अपमान, कर्तव्य) — यह **वातावरण** लिखो।" **चरण 2**: दो कॉलम बनवाएँ — बाएँ \'परिवेश के साक्ष्य\' (पाठ से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_004', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पात्र-चित्रण — मुख्य पात्र की.',
          hint: 'यदि अटके हों तो **c10_hin_sp_cbse_27_002 (कथानक)** के \'प्रमुख घटनाक्रम\' खंड को दोहराएं और.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर नायक की संवेदनशीलता को **\'भावुकता\' (sentimentality)** या **\'कमजोरी\' (weakness)** मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पात्र-चित्रण',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके हों तो **c10_hin_sp_cbse_27_002 (कथानक)** के \'प्रमुख घटनाक्रम\' खंड को दोहराएं और नायक की.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर नायक की संवेदनशीलता को **\'भावुकता\' (sentimentality)** या **\'कमजोरी\' (weakness)** मान लेते हैं और उत्तर में.' }
          ],
            remediations: { 'sentimentality-weakness': { steps: ['**पाठ के 3 विशिष्ट अंश ढूंढें** जहां नायक *बिना बोले* प्रतिक्रिया देता है (आँखें भरना, रुक जाना, कांपना) — इन्हें.', '**तुलना करें:** किसी \'भावुक\' पात्र (जैसे फिल्मी हीरो जो रोकर सहानुभूति पाता है) और इस नायक में अंतर लिखें — नायक को कोई.', '**लिखें:** "नायक की संवेदनशीलता उसकी **नैतिक पहचान** है, कमजोरी नहीं — क्योंकि वह स्वार्थरहित है।" इस वाक्य को याद करें.', '**अभ्यास:** पिछले वर्ष के बोर्ड प्रश्न (जैसे: "नायक की संवेदनशीलता उसके लिए अभिशाप सिद्ध होती है — विवेचना कीजिए") का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_005', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के सहायक पात्र — वे चरित्र जो मुख्य.',
          hint: 'यदि अटके तो नोड 004 (मुख्य पात्र चित्रण) का \'गुण-प्रमाण सारणी\' दोबारा पढ़ें और अलोपीदीन.',
          misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों का चित्रण करते समय **केवल उनके गुण लिखते हैं** (जैसे: "मुंशीजी ईमानदार थे") और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के सहायक पात्र',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 004 (मुख्य पात्र चित्रण) का \'गुण-प्रमाण सारणी\' दोबारा पढ़ें और अलोपीदीन के प्रत्येक.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों का चित्रण करते समय **केवल उनके गुण लिखते हैं** (जैसे: "मुंशीजी ईमानदार थे") और **यह नहीं जोड़ते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ:** पाठ से अलोपीदीन और प्रत्येक सहायक पात्र के **संवाद/घटना वाले अंश** छांटें। 2.', '**सारणी बनाएं:** दो कॉलम — "सहायक पात्र का कार्य/संवाद" और "अलोपीदीन पर प्रभाव/प्रकट गुण"। 3.', '**लिखें:** प्रत्येक पात्र के लिए 3 पंक्तियों में: गुण + प्रमाण + अलोपीदीन पर प्रभाव। 4.', '**अभ्यास:** गत वर्ष के बोर्ड प्रश्न (2023, 2022) में सहायक पात्र पर पूछे गए प्रश्न हल करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_27_006', difficulty: 'standard',
          question: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का मुख्य विषय — \'अब कहाँ दूसरे के दुख.',
          hint: 'यदि फंसे हों, तो c10_hin_sp_cbse_27_002 (कथानक) के \'प्रसंग विश्लेषण\' खंड को दोहराएं.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर लिखते हैं — *"लेखक गरीबों की दुर्दशा दिखा रहा है"* या *"यह पाठ अमीर-गरीब के संघर्ष की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का मुख्य विषय',
                  options: ['\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = निराला (सुरयकुमार पांडेय) का जीवन-संक्षेप और', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का कथानक', '\'अब कहाँ दूसरे के दुख से दुखी होने वाले\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हों, तो c10_hin_sp_cbse_27_002 (कथानक) के \'प्रसंग विश्लेषण\' खंड को दोहराएं, विशेषकर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर लिखते हैं — *"लेखक गरीबों की दुर्दशा दिखा रहा है"* या *"यह पाठ अमीर-गरीब के संघर्ष की कहानी है"* **ठीक.' }
          ],
            remediations: { 'class-struggle-human-values-1': { steps: ['**चरणबद्ध उपचार (Remediation Steps):** 1.', '**अवधारणा स्पष्ट करें (5 मिनट):** छात्र से पूछें — "विषय (Theme) और कथानक (Plot) में क्या अंतर है?" उदाहरण दें: *फिल्म.', '**पाठ से साक्ष्य छांटें (10 मिनट):** छात्र को पाठ से **केवल वे वाक्य** छांटने को कहें जो **\'संवेदना\'** या **\'स्वार्थ\'**.', '**तुलना तालिका बनाएं (5 मिनट):** | पात्र | आर्थिक स्थिति | व्यवहार | प्रेरणा (स्वार्थ/संवेदना) |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
