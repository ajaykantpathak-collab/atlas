import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p2',
    title: 'काले मेघा पानी दे · Part 2/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'काले मेघा पानी दे · Part 2/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_007', 'c12_hin_ar_cbse_12_008', 'c12_hin_ar_cbse_12_009', 'c12_hin_ar_cbse_12_010', 'c12_hin_ar_cbse_12_011', 'c12_hin_ar_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'काले मेघा पानी दे — गौण विषय', text: 'गौण विषय (Sub-theme) वे सहायक विषय या उप-कथाएँ हैं जो पाठ के मुख्य विषय (Central Theme) को विकसित, पूरक, या विस्तारित करते हैं; ये स्वतंत्र रूप से पूर्ण नहीं होते, बल्कि मुख्य विषय की व्याख्या में.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['काले मेघा पानी दे'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_ar_cbse_12_008', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['वाक्य को दो भागों में बाँटें — "धरती ऐसी तप रही थी" (बिंब.', '"तप रही थी" — स्पर्श इंद्रिय को संबोधित करता है (उष्णता का.', '"मानो भट्ठी हो" में "मानो" उपमा-सूचक है, अतः यह रूपक नहीं.', 'प्रभाव विश्लेषण: स्पर्श बिंब पाठक को शारीरिक तपन का एहसास.', 'विषय से जुड़ाव: यह उपमा \'प्रकृति का क्रूर रूप\' विषय को.'], answer: 'वाक्य को दो भागों में बाँटें — "धरती ऐसी तप रही थी" (बिंब. "तप रही थी" — स्पर्श इंद्रिय को संबोधित करता है (उष्णता का. "मानो भट्ठी हो" में "मानो" उपमा-सूचक है, अतः यह रूपक नहीं. प्रभाव विश्लेषण: स्पर्श बिंब पाठक को शारीरिक तपन का एहसास. विषय से जुड़ाव: यह उपमा \'प्रकृति का क्रूर रूप\' विषय को.' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'What comes next? काले मेघा पानी दे · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — काले मेघा पानी दे · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वे सहायक विषय या उप-कथाएँ हैं जो पाठ के मुख्य विषय.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_12_006 (मुख्य विषय और संदेश) पर लौटें — वहाँ मुख्य विषय की.',
          misconception: 'छात्र अक्सर \'गौण विषय\' को \'मुख्य विषय का छोटा रूप\' या \'कहानी की कोई भी छोटी घटना\' समझ लेते हैं। उदाहरण: वे लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वे सहायक विषय या उप-कथाएँ हैं जो पाठ के मुख्य विषय (Central Theme)',
                  options: ['गौण विषय (Sub-theme) वे सहायक विषय या उप-कथाएँ हैं जो पाठ के मुख्य विषय (Central Theme)', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_12_006 (मुख्य विषय और संदेश) पर लौटें — वहाँ मुख्य विषय की पहचान की.',
                  misconception: 'छात्र अक्सर \'गौण विषय\' को \'मुख्य विषय का छोटा रूप\' या \'कहानी की कोई भी छोटी घटना\' समझ लेते हैं। उदाहरण: वे लिख देते हैं — \'गौण विषय: नायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के 5 प्रमुख प्रसंग लिखो जो मुख्य कथानक (पानी खोजना) से अलग हों।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यह प्रसंग कौन-सा सामाजिक/मानवीय मुद्दा उठाता है?" 3.', 'उन मुद्दों को समूहित करें — जो 2+ बार आए, वही गौण विषय हैं। 4.', 'फिर प्रत्येक गौण विषय के लिए PEEL पैराग्राफ लिखने का अभ्यास कराएँ। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the.',
          hint: 'If stuck on separating tenor/vehicle, practice with 5 simple metaphors from daily life.',
          misconception: 'Students treat बिंब and रूपक as *labels* to spot and list, not as *functional tools* the author uses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the five senses',
                  options: ['**बिंब (Imagery)** is the use of vivid, sensory language that appeals to the five senses', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'If stuck on separating tenor/vehicle, practice with 5 simple metaphors from daily life (e.g., "समय.',
                  misconception: 'Students treat बिंब and रूपक as *labels* to spot and list, not as *functional tools* the author uses.' }
          ],
            remediations: { 'students-treat-and-as-labels': { steps: ['Re-read the opening and closing paragraphs of "काले मेघा पानी दे" *only for sensory words* — highlight them in 5.', 'Pick 3 highlighted phrases; for each, write: "यह _____ इंद्रिय को संबोधित करता है और _____ (विषय/पात्र/वातावरण) को.', 'Find 2 sentences where two nouns are equated without "जैसे/सा"; fill a table: उपमेय | उपमान | निहित समानता | कथानक में.', 'Re-attempt DIAGNOSTIC_QUESTION_4 and _5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox/विडंबना)** वह साहित्यिक युक्ति है जहाँ कथन या स्थिति में.',
          hint: 'यदि अटके हों, तो c11_hin_ar_cbse_12_009 के WORKED_EXAMPLE_1-2 दोहराएँ — वहाँ.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **विरोधाभास = विरोधाभासी विशेषण** (जैसे "काले मेघा" — काला = अशुभ, मेघा = शुभ)।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox/विडंबना)** वह साहित्यिक युक्ति है जहाँ कथन या स्थिति में दो विरोधी',
                  options: ['**विरोधाभास (Paradox/विडंबना)** वह साहित्यिक युक्ति है जहाँ कथन या स्थिति में दो विरोधी', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि अटके हों, तो c11_hin_ar_cbse_12_009 के WORKED_EXAMPLE_1-2 दोहराएँ — वहाँ विरोधाभास/प्रतीक की.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **विरोधाभास = विरोधाभासी विशेषण** (जैसे "काले मेघा" — काला = अशुभ, मेघा = शुभ)। **वास्तविकता**: इस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ से वह वाक्य ढूँढ़ो जहाँ तुम्हें लगा \'अरे, यह तो उल्टा हुआ!\'" — वही विरोधाभास का बिंदु.', 'विरोधाभास से क्या **अतिरिक्त प्रभाव** पैदा हुआ?" (उत्तर: पाठक स्वयं निष्कर्ष निकाले, प्रभाव गहरा हो)। **चरण 3**: प्रतीक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary) किसी रचना में प्रयुक्त उन **मुख्य शब्दों का समूह** है जो.',
          hint: 'यदि "देशज शब्द" और "संदर्भगत अर्थ" की अवधारणा अस्पष्ट है, तो **कक्षा 11 हिंदी आरोह पाठ 12.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "पदावली" का अर्थ है — **कठिन शब्दों के अर्थ रट लेना** (rote-learning dictionary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary) किसी रचना में प्रयुक्त उन **मुख्य शब्दों का समूह** है जो रचना के',
                  options: ['पदावली (Vocabulary) किसी रचना में प्रयुक्त उन **मुख्य शब्दों का समूह** है जो रचना के', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि "देशज शब्द" और "संदर्भगत अर्थ" की अवधारणा अस्पष्ट है, तो **कक्षा 11 हिंदी आरोह पाठ 12.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "पदावली" का अर्थ है — **कठिन शब्दों के अर्थ रट लेना** (rote-learning dictionary meanings)। वे लिखते.' }
          ],
            remediations: { 'rote-learning-dictionary-meanings': { steps: ['**पुनः पाठ पढ़ें** — केवल उन अंशों को जहाँ लक्षित शब्द आए हैं (स्किमिंग नहीं, क्लोज रीडिंग)। 2.', '**तीन-स्तरीय तालिका बनाएँ** प्रत्येक शब्द के लिए: - स्तर 1: शब्दकोशीय अर्थ (शब्दकोश से) - स्तर 2: पाठ में प्रसंगगत अर्थ.', 'विकल्प शब्दों से तुलना करें) 3.', '**भाई नोड (c12_hin_ar_cbse_12_008: बिंब और रूपक)** पर जाएँ — देखें कि ये शब्द कैसे बिंब रचते हैं। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_011', difficulty: 'standard',
          question: '**व्याकरण: पाठ में भाषा-प्रयोग** refers to the analytical study of how.',
          hint: 'यदि शब्द-श्रेणी या वाक्य-भेद पहचानने में अटकें, तो **c11_hin_ar_cbse_12_011 (कक्षा 11.',
          misconception: '**भ्रान्ति:** *"व्याकरण: पाठ में भाषा-प्रयोग का अर्थ है पाठ में आए कठिन शब्दों के अर्थ लिखना, संधि-विच्छेद करना, या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**व्याकरण: पाठ में भाषा-प्रयोग** refers to the analytical study of how grammatical',
                  options: ['**व्याकरण: पाठ में भाषा-प्रयोग** refers to the analytical study of how grammatical', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि शब्द-श्रेणी या वाक्य-भेद पहचानने में अटकें, तो **c11_hin_ar_cbse_12_011 (कक्षा 11 आरोह पाठ 12.',
                  misconception: '**भ्रान्ति:** *"व्याकरण: पाठ में भाषा-प्रयोग का अर्थ है पाठ में आए कठिन शब्दों के अर्थ लिखना, संधि-विच्छेद करना, या उपसर्ग-प्रत्यय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — *"पाठ का कोई एक पृष्ठ खोलो। तीन वाक्य छाँटो जो तुम्हें \'ग्रामीण\' लगते हैं। उन्हें यहाँ.', 'वह तत्सम/तद्भव/देशज/विदेशज में से कौन सा है?', 'यदि उसकी जगह तत्सम शब्द रख दें (जैसे \'पनघट\' → \'जलाशय\'), तो दृश्य कैसे बदलेगा?"* **चरण 3:** छात्र को **PEEL शीट** दें: |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर एक निश्चित तथ्य.',
          hint: 'यदि आशय-सूचक उत्तर नहीं बन पा रहे, तो c12_hin_ar_cbse_12_006 (मुख्य विषय) और.',
          misconception: 'छात्र समझते हैं कि \'आशय-सूचक\' प्रश्न का उत्तर पाठ की किसी पंक्ति को उठाकर थोड़ा घुमा-फिराकर लिख देना है — जबकि वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर एक निश्चित तथ्य, शब्द,',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे हैं जिनका उत्तर एक निश्चित तथ्य, शब्द,', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि आशय-सूचक उत्तर नहीं बन पा रहे, तो c12_hin_ar_cbse_12_006 (मुख्य विषय) और c12_hin_ar_cbse_12_008.',
                  misconception: 'छात्र समझते हैं कि \'आशय-सूचक\' प्रश्न का उत्तर पाठ की किसी पंक्ति को उठाकर थोड़ा घुमा-फिराकर लिख देना है — जबकि वास्तव में आशय-सूचक उत्तर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के 3-4 मुख्य प्रसंग दें और प्रत्येक के लिए पूछें: "यहाँ *क्या* हो रहा है?', '(वस्तुनिष्ठ) — यहाँ *क्यों* और *कैसे* हो रहा है?', '(आशय-सूचक)" — दोनों उत्तर साथ-साथ लिखवाएँ। 2.', 'पूर्ववर्ती नोड c12_hin_ar_cbse_12_006 (मुख्य विषय और संदेश) और c12_hin_ar_cbse_12_008 (साहित्यिक युक्तियाँ: बिंब और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
