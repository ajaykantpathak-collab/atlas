import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch26_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch26_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch26_p2',
    title: 'तीसरी कसम के शल्पिकार शैलेंद्र · Part 2/3',
    subtitle: 'This node covers identification, evidence-based analysis, and thematic interconnection.',
    classLevel: 10, subject: 'hin_sp', topic: 'तीसरी कसम के शल्पिकार शैलेंद्र · Part 2/3',
    chapters: ['c10_hin_sp_ch26'],
    nodeIds: ['c10_hin_sp_cbse_26_007', 'c10_hin_sp_cbse_26_008', 'c10_hin_sp_cbse_26_009', 'c10_hin_sp_cbse_26_010', 'c10_hin_sp_cbse_26_011', 'c10_hin_sp_cbse_26_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में तीसरी-कसम-के-शिल्पकार-शैलेंद्र जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ से एक ऐसा प्रसंग चुनिए जहां जाति-आधारित भेदभाव अप्रत्यक्ष रूप से प्रकट होता है। उसका विश्लेषण कीजिए कि यह गौण विषय मुख्य कथानक को कैसे प्रभावित करता है।',
        options: ['Correct answer: प्रसंग', 'अपनी बिरादरी', 'गांव वालों ने बुरा कहा'],
        answer: 'Correct answer: प्रसंग',
        hook: 'Students treat subsidiary themes as "extra information" or "background details" that can be memorized as a list (e.g.',
    },
    teaching: [
        { title: 'तीसरी कसम के शल्पिकार शैलेंद्र — गौण विषय', text: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_26_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तीसरी कसम के शल्पिकार'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_26_007', title: 'तीसरी कसम के शल्पिकार शैलेंद्र — गौण विषय',
          caseStudy: { intro: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में तीसरी-कसम-के-शिल्पकार-शैलेंद्र जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'पाठ \'तीसरी कसम के शिल्पकार शैलेंद्र\' में किन्हीं दो गौण विषयों के नाम लिखिए जो मुख्य कथानक के समानांतर चलते हैं।', options: [
                { text: 'Correct answer: सामाजिक वर्ग-भेद (जाति/वर्ग आधारित असमानता) और आर्थिक शोषण (साहूकारी', outcome: 'Correct answer: सामाजिक वर्ग-भेद (जाति/वर्ग आधारित असमानता) और आर्थिक शोषण (साहूकारी प्रथा, गरीबी).' },
                { text: 'हीरामन-हीराबाई का संबंध', outcome: 'Not quite — Students treat subsidiary themes as "extra information" or "background details" that can.', reveals: 'students-treat-subsidiary-themes-as' },
                { text: 'शैलेंद्र का जीवन', outcome: 'Not quite — Students treat subsidiary themes as "extra information" or "background details" that can.', reveals: 'students-treat-subsidiary-themes-as' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_26_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तीसरी कसम के शल्पिकार शैलेंद्र like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तीसरी कसम के शल्पिकार शैलेंद्र · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तीसरी कसम के शल्पिकार शैलेंद्र · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_007', difficulty: 'standard',
          question: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' के गौण विषय — मुख्य विषय के साथ चलने वाले.',
          hint: 'अगर अटके तो c10_hin_sp_cbse_26_002 (कथानक) और c10_hin_sp_cbse_26_006 (मुख्य विषय) दोबारा.',
          misconception: 'Students treat subsidiary themes as "extra information" or "background details" that can be memorized as a list (e.g.',
          parts: [
                { id: 'a', prompt: 'पाठ से एक ऐसा प्रसंग चुनिए जहां जाति-आधारित भेदभाव अप्रत्यक्ष रूप से प्रकट होता है। उसका विश्लेषण कीजिए कि यह गौण विषय मुख्य कथानक को कैसे प्रभावित करता है।', answer: 'Correct answer: प्रसंग',
                  options: ['Correct answer: प्रसंग', 'अपनी बिरादरी', 'गांव वालों ने बुरा कहा', 'कैसे प्रभावित करता है'],
                  hint: 'अगर अटके तो c10_hin_sp_cbse_26_002 (कथानक) और c10_hin_sp_cbse_26_006 (मुख्य विषय) दोबारा पढ़ें.',
                  misconception: 'Students treat subsidiary themes as "extra information" or "background details" that can be memorized as a list (e.g., "poverty, caste.' }
          ],
            remediations: { 'students-treat-subsidiary-themes-as': { steps: ['Ask the student to re-read Chapter 26 and highlight every mention of money, caste, gender restriction, or village.', 'For each color, pick the top 2 highlighted passages and write: "This shows [theme] because..." — forcing.', 'Practice one 3-mark board-style question daily: "पाठ से उदाहरण देकर समझाइए कि आर्थिक शोषण हीरामन के निर्णयों को कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_008', difficulty: 'standard',
          question: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँसें तो: पाठ के दो प्रमुख प्रसंग — (1) हीराबाई का गाड़ी में बैठना, (2) हीराबाई की.',
          misconception: 'छात्र प्रायः बिंब को "वर्णन" (description) और रूपक को "उपमा" (simile) मान बैठते हैं। वे लिखते हैं: "लेखक ने सुंदर वर्णन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में बिंब (imagery)',
                  options: ['\'तीसरी कसम के शिल्पकार शैलेंद्र\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रेणु (फणीश्वरनाथ रेणु', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का कथानक', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो: पाठ के दो प्रमुख प्रसंग — (1) हीराबाई का गाड़ी में बैठना, (2) हीराबाई की विदा — को.',
                  misconception: 'छात्र प्रायः बिंब को "वर्णन" (description) और रूपक को "उपमा" (simile) मान बैठते हैं। वे लिखते हैं: "लेखक ने सुंदर वर्णन किया है" — जबकि.' }
          ],
            remediations: { 'description-simile': { steps: ['चरण 1: छात्र से कहें — "आँखें बंद करो, मैं कहूँगा \'जले हुए टोस्ट की गंध\' — तुम्हें क्या हुआ?" (वे कहेंगे: गंध आई)। चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_009', difficulty: 'standard',
          question: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_26_004 (हीरामन चरित्र) और c10_hin_sp_cbse_26_002 (कथानक).',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोध (Contradiction/विरोधी कथन)** को एक मान लेते हैं। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में विरोधाभास',
                  options: ['\'तीसरी कसम के शिल्पकार शैलेंद्र\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रेणु (फणीश्वरनाथ रेणु', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का कथानक', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_26_004 (हीरामन चरित्र) और c10_hin_sp_cbse_26_002 (कथानक) दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोध (Contradiction/विरोधी कथन)** को एक मान लेते हैं। **गलत तर्क:** "हीरामन ने कसम.' }
          ],
            remediations: { 'paradox-contradiction': { steps: ['छात्र को पाठ के **पैराग्राफ 12-14** (हीरामन का हिराबाई से अंतिम संवाद) पढ़ने को कहें। 2.', 'पूछें: "यहाँ हीरामन क्या कहता है?', 'दोनों में क्या फर्क है?" 3.', 'समझाएँ: "विरोधाभास = **कथन + आचरण = दोनों सत्य**"। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_010', difficulty: 'standard',
          question: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की.',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_26_002 (कथानक और आख्यान-शैली)** और **c10_hin_sp_cbse_26_003.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पदावली" का अर्थ है **कठिन शब्दों के समानार्थी (synonyms) रट लेना**। वे "बावला.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' की पदावली',
                  options: ['\'तीसरी कसम के शिल्पकार शैलेंद्र\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रेणु (फणीश्वरनाथ रेणु', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का कथानक', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_26_002 (कथानक और आख्यान-शैली)** और **c10_hin_sp_cbse_26_003.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "पदावली" का अर्थ है **कठिन शब्दों के समानार्थी (synonyms) रट लेना**। वे "बावला = पागल", "अल्हड़.' }
          ],
            remediations: { 'synonyms': { steps: ['**शब्द-डायरी बनाएँ:** पाठ के 15 मुख्य शब्दों की तीन-स्तंभ तालिका बनाएँ — (क) शब्द, (ख) शब्दकोशीय अर्थ, (ग) प्रसंगानुसार.', '**प्रसंग-खोज अभ्यास:** प्रत्येक शब्द के लिए पाठ से वह **सटीक वाक्य** ढूँढ़ें जहाँ वह आया है; उसे कॉपी में लिखें। 3.', '**निहितार्थ-चर्चा:** शिक्षक/अभिभावक के साथ बैठकर पूछें: "लेखक ने \'पागल\' के बजाय \'बावला\' क्यों लिखा?" — उत्तर में.', '**वाक्य-निर्माण:** प्रत्येक शब्द से **दो वाक्य** बनाएँ — एक शब्दकोशीय अर्थ में, एक प्रसंगानुसार अर्थ में। अंतर महसूस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_011', difficulty: 'standard',
          question: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे.',
          hint: 'Review Class 9 Hindi Bhasha aur Vyakaran: "भाषा, बोली और मानक भाषा" chapter.',
          misconception: 'Students consistently label Bhojpuri grammatical forms (e.g., "बइठल बा", "जाईब", "रउआ") as "grammatical errors".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' में भाषा-प्रयोग',
                  options: ['\'तीसरी कसम के शिल्पकार शैलेंद्र\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रेणु (फणीश्वरनाथ रेणु', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का कथानक', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review Class 9 Hindi Bhasha aur Vyakaran: "भाषा, बोली और मानक भाषा" chapter — specifically the.',
                  misconception: 'Students consistently label Bhojpuri grammatical forms (e.g., "बइठल बा", "जाईब", "रउआ") as "grammatical errors" or "incorrect Hindi".' }
          ],
            remediations: { 'students-consistently-label-bhojpuri-grammatical': { steps: ['Show the student a Bhojpuri grammar mini-chart (verb endings: -ब/-इब for future, \'बा\' for \'है\', pronouns: हम/रउआ/ऊ).', 'Have them translate 5 standard Hindi sentences into Bhojpuri using the chart — they\'ll see the *rules* operating.', 'Return to the text — ask: "If Renu used \'errors\', why are they *consistent* across 100+ pages?', 'Practice writing: "रेणु ने भोजपुरी व्याकरण के मानक रूपों का सायास प्रयोग किया है..." — this phrasing earns full marks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_26_012', difficulty: 'standard',
          question: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे.',
          hint: 'If stuck, re-read the chapter focusing only on Shailendra\'s first-person reflections.',
          misconception: 'Students treat intent-based questions as "opinion questions" where any personal view earns marks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तीसरी कसम के शिल्पकार शैलेंद्र\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'तीसरी कसम के शिल्पकार शैलेंद्र\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रेणु (फणीश्वरनाथ रेणु', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का कथानक', '\'तीसरी कसम के शिल्पकार शैलेंद्र\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read the chapter focusing only on Shailendra\'s first-person reflections (marked.',
                  misconception: 'Students treat intent-based questions as "opinion questions" where any personal view earns marks.' }
          ],
            remediations: { 'students-treat-intent-based-questions': { steps: ['Give the student a 3-column table — Column A: Objective Qs from past papers, Column B: Intent-based Qs, Column.', 'Take one intent-based Q they answered poorly. Highlight every sentence in their answer.', 'Practice 3 more intent-based Qs with the template until they self-correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
