import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hin_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hin_ch03_p1: SimDef = {
    id: 'v3_c7_hin_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'इस नोड में कक्षा 7 के पाठ 3 के रचनाकार का जीवन-परिचय, उनकी प्रमुख रचनाएँ, लेखन शैली की.',
    classLevel: 7, subject: 'hin', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c7_hin_ch03'],
    nodeIds: ['c7_hin_cbse_03_001', 'c7_hin_cbse_03_002', 'c7_hin_cbse_03_003', 'c7_hin_cbse_03_004', 'c7_hin_cbse_03_005', 'c7_hin_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'कल्पना कीजिए आपने एक पुराना पत्र पढ़ा जिसमें किसी ने लिखा है "बचपन में नदी पार करके स्कूल जाता था" — क्या आप.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का जीवन-परिचय, उनकी रचनाधर्मिता, उस कालखंड की सामाजिक-सांस्कृतिक परिस्थितियाँ, और उन परिस्थितियों का रचना के विषय व शैली.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hin_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hin_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 3 · Part 1/3', spots: [
            { id: 's1', label: '3 -', prompt: 'Which idea is this? — कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है.', answer: '3 -', options: ['3 -', '3 -'] },
            { id: 's2', label: '3 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और.', answer: '3 -', options: ['3 -', '3 -'] }
          ] } },
        { type: 'case', nodeId: 'c7_hin_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का.',
          hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 6 के **पाठ 1 या 2 के रचनाकार परिचय (c6_hin_cbse_01_001.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "रचनाकार परिचय = जन्मतिथि, मृत्युतिथि, प्रसिद्ध पुस्तकें रट लेना"। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसमें लेखक किसी पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो, तो कक्षा 6 के **पाठ 1 या 2 के रचनाकार परिचय (c6_hin_cbse_01_001.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "रचनाकार परिचय = जन्मतिथि, मृत्युतिथि, प्रसिद्ध पुस्तकें रट लेना"। **वास्तविकता:** परीक्षा और बोध में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**जीवन-घटना → लेखन-प्रभाव** का एक **फ्लोचार्ट** बनवाएँ: (जन्म/परिवेश) → (शिक्षा/संघर्ष) → (नौकरी/अनुभव) → (विचारधारा) →.', 'पाठ 3 के **किन्हीं दो प्रसंग** चुनकर, प्रत्येक के सामने लिखवाएँ: "यह प्रसंग लेखक के जीवन के किस अनुभव से जुड़ता है?" 3.', 'कक्षा 6 के किसी परिचित रचनाकार (जैसे प्रेमचंद) को लेकर यही अभ्यास **दोहराएँ** — पुराने ज्ञात पर नया कौशल (लिंक जोड़ना).', 'अंत में: "अगर लेखक का यह अनुभव न होता, तो पाठ कैसे अलग होता?" — यह **प्रतिवादात्मक चिंतन (counterfactual thinking)**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_002', difficulty: 'standard',
          question: 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे.',
          hint: 'यदि फँस जाएँ तो कक्षा 6 के पाठ 1, 2, 3 के \'कथानक और आख्यान-संरचना\' नोड्स दोहराएँ.',
          misconception: 'छात्र समझते हैं कि **\'कथानक = घटनाओं का क्रमिक सारांश\'** और **\'आख्यान-संरचना = बस फ्लैशबैक का होना/न होना\'**। वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,',
                  options: ['कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसमें लेखक किसी पात्र के'],
                  hint: 'यदि फँस जाएँ तो कक्षा 6 के पाठ 1, 2, 3 के \'कथानक और आख्यान-संरचना\' नोड्स दोहराएँ — विशेषतः फ्रेटैग.',
                  misconception: 'छात्र समझते हैं कि **\'कथानक = घटनाओं का क्रमिक सारांश\'** और **\'आख्यान-संरचना = बस फ्लैशबैक का होना/न होना\'**। वे यह नहीं देखते कि: (1).' }
          ],
            remediations: { '1': { steps: ['**चरण 1 — अवधारणा स्पष्ट करें:** छात्र से कहें: "घर से स्कूल आने की घटनाएँ लिखो। फिर लिखो: \'मैं कक्षा में बैठा हूँ — 20.', '**चरण 2 — कारण-परिणाम जोड़ें:** उसी घटना-क्रम में \'क्यों\' जोड़ें: "बस छूटी **क्योंकि** अलार्म नहीं बजा → ऑटो मिला.', '**चरण 3 — लघु पाठ पर अभ्यास:** एक पैराग्राफ दें, छात्र से कहें: "हर वाक्य के आगे तीर (→) लगाकर कारण-परिणाम दिखाओ। फिर.', '**चरण 4 — प्रभाव पर चर्चा:** पूछें: "अगर लेखक फ्लैशबैक न करता तो क्या अंतर पड़ता?" — इससे संरचना का कार्य समझ में आएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 के पाठ 3 (c6_hin_cbse_03_003) का \'परिवेश पहचान\' अभ्यास.',
          misconception: 'छात्र प्रायः समझते हैं कि **\'परिवेश = स्थान मात्र\' (जहाँ घटना घटी)** और **\'वातावरण = पात्र की भावना\' (पात्र को क्या लग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और',
                  options: ['पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसमें लेखक किसी पात्र के'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 6 के पाठ 3 (c6_hin_cbse_03_003) का \'परिवेश पहचान\' अभ्यास दोहराएँ.',
                  misconception: 'छात्र प्रायः समझते हैं कि **\'परिवेश = स्थान मात्र\' (जहाँ घटना घटी)** और **\'वातावरण = पात्र की भावना\' (पात्र को क्या लग रहा है)**। **गलत.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें: "अपना कमरा देखो — दीवारें, खिड़की, मेज, रोशनी = **परिवेश**। अब आँख बंद करो.', '**चरण 2 — चार-खाना तालिका बनवाएँ:** किसी पाठ के दो पैराग्राफ लेकर स्तंभ बनवाएँ: स्थान | काल | सामाजिक | भौतिक → इनसे.', '**चरण 3 — \'क्या होगा अगर?\' खेलें:** "यही दृश्य रात को होता तो वातावरण क्या होता?', 'बरसात में होता तो?" — इससे परिवेश-परिवर्तन → वातावरण-परिवर्तन का कारण-कार्य संबंध पक्का होगा। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसमें लेखक किसी.',
          hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_01_004 (कक्षा 6 पात्र-चित्रण नायक) की "पाँच.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि "नायक का चरित्र-चित्रण = नायक के अच्छे गुणों की सूची"। वे लिखते हैं: "नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसमें लेखक किसी पात्र के',
                  options: ['पात्र-चित्रण (Characterization) वह साहित्यिक प्रक्रिया है जिसमें लेखक किसी पात्र के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_01_004 (कक्षा 6 पात्र-चित्रण नायक) की "पाँच खिड़कियाँ" तालिका.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर मानते हैं कि "नायक का चरित्र-चित्रण = नायक के अच्छे गुणों की सूची"। वे लिखते हैं: "नायक ईमानदार, बहादुर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल दिखाओ:** एक ही नायक का दो संस्करण दो — (क) गुणों की सूची, (ख) साक्ष्य-आधारित विश्लेषण (PEEL संरचना: Point.', '**साक्ष्य-खोज अभ्यास:** पाठ से 3 वाक्य चुनवाओ जो नायक के *एक* गुण को *दिखाते* हों (न कि बताते हों)। छात्र को हाइलाइट.', '**प्रश्न-सीढ़ी चढ़ाओ:** "नायक X कैसा है?" → "कैसे पता चला?" → "पाठ में कहाँ दिखा?" → "इससे कहानी पर क्या असर पड़ा?".', '**तुलना कराओ:** एक स्थैतिक पात्र और एक गतिशील पात्र का लघु अंश देकर पूछो: "कौन नायक हो सकता है और क्यों?" — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक को आगे बढ़ाते.',
          hint: 'यदि अटके तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_005 आदि) का सहायक पात्र चित्रण दोहराएं.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र का चित्रण करते समय केवल उसका "नायक से संबंध" (भाई, मित्र, गुरु) लिखना पर्याप्त है। वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक को आगे बढ़ाते हैं, उसके',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ कथानक को आगे बढ़ाते हैं, उसके', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके तो कक्षा 6 के किसी भी पाठ (c6_hin_cbse_01_005 आदि) का सहायक पात्र चित्रण दोहराएं और देखें.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र का चित्रण करते समय केवल उसका "नायक से संबंध" (भाई, मित्र, गुरु) लिखना पर्याप्त है। वे यह नहीं देखते कि वही.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें कि पाठ से एक सहायक पात्र चुनें और उसके केवल तीन संवाद/कार्य ढूंढें जो नायक को सीधे प्रभावित करते.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_hin_cbse_03_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह **सार्वभौमिक विचार या मानवीय अनुभव** है जो पूरी.',
          hint: 'यदि अटके: **नायक के तीन निर्णायक क्षण** पहचानो — (1) प्रारंभिक इच्छा, (2) सबसे बड़ी.',
          misconception: '**सबसे आम गलती:** छात्र **विषय को "एक शब्द" (जैसे: प्रेम, देशभक्ति, गरीबी) में लिखकर समझ लेते हैं कि काम पूरा हो गया**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह **सार्वभौमिक विचार या मानवीय अनुभव** है जो पूरी रचना में',
                  options: ['मुख्य विषय (Central Theme) वह **सार्वभौमिक विचार या मानवीय अनुभव** है जो पूरी रचना में', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण है जिसमें किसी रचना के लेखक का', 'कथानक (प्लॉट) घटनाओं का वह तार्किक और कारण-परिणामात्मक क्रम है जो कहानी को आगे बढ़ाता है,', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समय, स्थान, सामाजिक-सांस्कृतिक पृष्ठभूमि और'],
                  hint: 'यदि अटके: **नायक के तीन निर्णायक क्षण** पहचानो — (1) प्रारंभिक इच्छा, (2) सबसे बड़ी परीक्षा, (3).',
                  misconception: '**सबसे आम गलती:** छात्र **विषय को "एक शब्द" (जैसे: प्रेम, देशभक्ति, गरीबी) में लिखकर समझ लेते हैं कि काम पूरा हो गया**। **क्यों होती है:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: *"कहानी का नाम लिए बिना बताओ — यह कहानी **जीवन के किस बड़े सत्य** के बारे में है?"* (उसे "गरीबी" से.', 'पूछो: *"लेखक इस सत्य को **कैसे सिद्ध करता है**?', 'दो जगह दिखाओ जहाँ पात्र का व्यवहार इस सत्य को दिखाता है।"* (प्रमाण माँगो)। 3.', 'कहो: *"अब एक वाक्य में लिखो: **लेखक हमें क्या सिखाना चाहता है**?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
