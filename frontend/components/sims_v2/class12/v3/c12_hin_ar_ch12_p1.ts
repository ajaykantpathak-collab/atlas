import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p1',
    title: 'काले मेघा पानी दे · Part 1/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'काले मेघा पानी दे · Part 1/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_001', 'c12_hin_ar_cbse_12_002', 'c12_hin_ar_cbse_12_003', 'c12_hin_ar_cbse_12_004', 'c12_hin_ar_cbse_12_005', 'c12_hin_ar_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'काले मेघा पानी दे — पृष्ठभूमि और रचनाकार परिचय', text: '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत के सूखे, अभाव और व्यवस्था के प्रति आक्रोश को प्रकृति के माध्यम से अभिव्यक्त करती है; इसमें बादल (मेघ) प्रतीक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['काले मेघा पानी दे'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'What comes next? काले मेघा पानी दे · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — काले मेघा पानी दे · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_001', difficulty: 'standard',
          question: '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो.',
          hint: 'अगर \'प्रतीक\' समझने में अटके तो **c11_hin_ar_cbse_16_007** (आओ मिलकर बचाएँ — साहित्यिक.',
          misconception: '**सबसे बड़ी गलतफहमी:** छात्र समझते हैं कि \'काले मेघा पानी दे\' केवल **वर्षा-प्रार्थना** या **प्रकृति-चित्रण** की कविता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत',
                  options: ['\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, आंतरिक मनोवृत्ति,'],
                  hint: 'अगर \'प्रतीक\' समझने में अटके तो **c11_hin_ar_cbse_16_007** (आओ मिलकर बचाएँ — साहित्यिक युक्तियाँ.',
                  misconception: '**सबसे बड़ी गलतफहमी:** छात्र समझते हैं कि \'काले मेघा पानी दे\' केवल **वर्षा-प्रार्थना** या **प्रकृति-चित्रण** की कविता है। **वास्तविकता:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्अध्ययन:** कक्षा 11 के नोड **c11_hin_ar_cbse_16_001** (आओ मिलकर बचाएँ — कवि परिचय और पृष्ठभूमि) और.', '**तुलनात्मक अभ्यास:** धूमिल की एक और कविता \'मोचीराम\' (यूट्यूब/पाठ्यपुस्तक) पढ़ें — देखें कि कैसे वे \'मोची\' को प्रतीक.', '**पुनर्निदान:** ऊपर दिए गए **DIAGNOSTIC_QUESTION_3** और **5** को फिर से हल करें; इस बार उत्तर में \'प्रतीक\', \'व्यंग्य\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित.',
          hint: 'यदि फँस जाएँ तो \'फ्रेटैग पिरामिड\' (Freytag\'s Pyramid) के पाँच सोपानों को \'काले मेघा पानी.',
          misconception: 'छात्र \'कथानक\' (Plot) और \'आख्यान-संरचना\' (Narrative Structure) को एक ही मान लेते हैं — वे घटनाओं की सूची (Summary) लिखकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध',
                  options: ['कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, आंतरिक मनोवृत्ति,'],
                  hint: 'यदि फँस जाएँ तो \'फ्रेटैग पिरामिड\' (Freytag\'s Pyramid) के पाँच सोपानों को \'काले मेघा पानी दे\' पर.',
                  misconception: 'छात्र \'कथानक\' (Plot) और \'आख्यान-संरचना\' (Narrative Structure) को एक ही मान लेते हैं — वे घटनाओं की सूची (Summary) लिखकर समझते हैं कि.' }
          ],
            remediations: { 'plot-narrative-structure-summary': { steps: ['छात्र को एक छोटी कहानी (जैसे \'ईदगाह\' या \'बड़े भाई साहब\') दें और कहें: "केवल घटनाएँ क्रम से लिखो" (यह कथानक है)। फिर.', 'क्या क्रम बदलने से प्रभाव बदलेगा?" (यह संरचना है)। 2.', '\'काले मेघा पानी दे\' के 3 प्रमुख फ्लैशबैक प्रसंग छाँटकर पूछें: "यदि यह प्रसंग यहाँ न होकर कहानी के आरंभ में होता, तो.', 'पूर्व कक्षा के नोड `c11_hin_ar_cbse_02_002` (पाठ 2 — कथानक और आख्यान-संरचना) को दोहराएँ जहाँ रैखिक/अरैखिक संरचना का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_003', difficulty: 'standard',
          question: '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक.',
          hint: 'यदि परिवेश के चार आयाम (भौगोलिक, सामाजिक, सांस्कृतिक, मनोवैज्ञानिक) अलग-अलग पहचानने में.',
          misconception: '**सबसे घातक भ्रम:** "परिवेश = पृष्ठभूमि (background) = कहानी जहाँ घटती है, उसकी जगह और समय।" **वास्तविकता:** "काले मेघा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और',
                  options: ['"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, आंतरिक मनोवृत्ति,'],
                  hint: 'यदि परिवेश के चार आयाम (भौगोलिक, सामाजिक, सांस्कृतिक, मनोवैज्ञानिक) अलग-अलग पहचानने में कठिनाई हो.',
                  misconception: '**सबसे घातक भ्रम:** "परिवेश = पृष्ठभूमि (background) = कहानी जहाँ घटती है, उसकी जगह और समय।" **वास्तविकता:** "काले मेघा पानी दे" में परिवेश.' }
          ],
            remediations: { 'background': { steps: ['**पुनर्अध्ययन (Re-study):** कक्षा 11 के नोड `c11_hin_ar_cbse_01_003` (पाठ 1 — पाठ्य-परिवेश और वातावरण) और.', '**माइक्रो-व्यायाम (Micro-exercise):** कहानी के पृष्ठ 1-2 (NCERT) से केवल **भौगोलिक विवरण** छाँटकर लिखें, फिर पृष्ठ 3-4.', '**पुनर्निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_3 को दोबारा हल करें — इस बार चार-चरणीय संरचना (प्रसंग →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, आंतरिक.',
          hint: 'यदि अटके: **c11_hin_ar_cbse_01_004** (पात्र-चित्रण आधार) और **c12_hin_ar_cbse_12_003**.',
          misconception: '**सबसे आम भ्रम:** छात्र नायक को **\'एक सामान्य ग्रामीण बालक\'** मानकर उसका चित्रण करते हैं — उसका रूप-रंग, कपड़े, खेलकूद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, आंतरिक मनोवृत्ति,',
                  options: ['पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के बाह्य रूप, आंतरिक मनोवृत्ति,', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि अटके: **c11_hin_ar_cbse_01_004** (पात्र-चित्रण आधार) और **c12_hin_ar_cbse_12_003**.',
                  misconception: '**सबसे आम भ्रम:** छात्र नायक को **\'एक सामान्य ग्रामीण बालक\'** मानकर उसका चित्रण करते हैं — उसका रूप-रंग, कपड़े, खेलकूद, स्कूल न जाना आदि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें (Close Reading):** केवल नायक से जुड़े **संवाद, कार्य, वर्णन** को हाइलाइट करें (३ रंगों में.', '**तालिका बनाएं:** तीन कॉलम — (गुण) | (पाठ प्रमाण) | (प्रतीकात्मक अर्थ) — जैसे: *दृढ़ता | "हाथ झटककर चल दिया" | निराशा.', '**तुलना करें:** c11_hin_ar_cbse_01_004 (कक्षा 11 का कोई नायक, जैसे \'उसने कहा था\' का लहना सिंह) से तुलना करें — वहाँ.', '**पुनः निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_4 और 5 का उत्तर बिना पाठ देखे दें। यदि फिर गलत, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_005', difficulty: 'standard',
          question: 'सहायक पात्र (supporting characters) वे पात्र हैं जो नायक के समानांतर या उसके.',
          hint: 'यदि फँस जाएँ तो: c11_hin_ar_cbse_12_005 (कक्षा 11 का सहायक पात्र चित्रण नोड) दोबारा पढ़ें.',
          misconception: '**सबसे घातक गलतफहमी**: "सहायक पात्रों का चित्रण = उनके नाम + दो-चार संवाद लिख देना।" छात्र समझते हैं कि बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (supporting characters) वे पात्र हैं जो नायक के समानांतर या उसके इर्द-गिर्द',
                  options: ['सहायक पात्र (supporting characters) वे पात्र हैं जो नायक के समानांतर या उसके इर्द-गिर्द', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि फँस जाएँ तो: c11_hin_ar_cbse_12_005 (कक्षा 11 का सहायक पात्र चित्रण नोड) दोबारा पढ़ें — विशेषकर.',
                  misconception: '**सबसे घातक गलतफहमी**: "सहायक पात्रों का चित्रण = उनके नाम + दो-चार संवाद लिख देना।" छात्र समझते हैं कि बोर्ड परीक्षा में "दादी ने कहा...".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** — केवल सहायक पात्रों के संवाद/कार्य वाले अंश (हाइलाइटर से चिह्नित करें)। 2.', '**तालिका बनाएँ** — चार कॉलम: पात्र | संवाद/कार्य (2 प्रमाण) | नायक पर प्रभाव | विषय में योगदान.', '**PEEL अभ्यास** — प्रत्येक पात्र के लिए एक पैराग्राफ लिखें: Point (भूमिका), Evidence (उद्धरण), Explanation (विश्लेषण).', '**पुनः निदान** — ऊपर दिए गए DIAGNOSTIC_QUESTION_3 और 4 को फिर से हल करें; यदि उत्तर में \'द्वंद्व\', \'foil\', \'सामूहिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_006', difficulty: 'standard',
          question: '"काले मेघा पानी दे" पाठ का मुख्य विषय **ग्रामीण जीवन की विडंबना, प्रकृति पर.',
          hint: 'अगर विषय नहीं पकड़ पा रहे, तो कक्षा 11 के किसी भी पाठ (जैसे c11_hin_ar_cbse_01_006) का.',
          misconception: 'छात्र अक्सर समझते हैं कि **\'मुख्य विषय\' = \'कथानक का सारांश\'**। वे लिखते हैं: "गाँव में सूखा पड़ा, किसान परेशान हुए, फिर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"काले मेघा पानी दे" पाठ का मुख्य विषय **ग्रामीण जीवन की विडंबना, प्रकृति पर निर्भरता, और',
                  options: ['"काले मेघा पानी दे" पाठ का मुख्य विषय **ग्रामीण जीवन की विडंबना, प्रकृति पर निर्भरता, और', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'अगर विषय नहीं पकड़ पा रहे, तो कक्षा 11 के किसी भी पाठ (जैसे c11_hin_ar_cbse_01_006) का \'मुख्य विषय\'.',
                  misconception: 'छात्र अक्सर समझते हैं कि **\'मुख्य विषय\' = \'कथानक का सारांश\'**। वे लिखते हैं: "गाँव में सूखा पड़ा, किसान परेशान हुए, फिर बारिश हुई" — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ की 5 प्रमुख घटनाएँ लिखो" (याद स्तर)। चरण 2: प्रत्येक घटना के आगे पूछें — "इससे लेखक क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
