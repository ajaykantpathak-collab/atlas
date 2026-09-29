import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch16_p1: SimDef = {
    id: 'v3_c12_hin_a_ch16_p1',
    title: 'दूसरा देवदास · Part 1/3',
    subtitle: 'The elephant saw everything — from inside the chain',
    classLevel: 12, subject: 'hin_a', topic: 'दूसरा देवदास · Part 1/3',
    chapters: ['c12_hin_a_ch16'],
    nodeIds: ['c12_hin_a_cbse_16_001', 'c12_hin_a_cbse_16_002', 'c12_hin_a_cbse_16_003', 'c12_hin_a_cbse_16_004', 'c12_hin_a_cbse_16_005', 'c12_hin_a_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A Sanskrit scholar who ran institutions writes the most radical thing — a story where the animal has more presence than the people.', goal: 'Read the story\'s circus as a microcosm of captivity — the elephant\'s chain beside the girl\'s invisibility.' },
    discovery: {
        question: 'A circus elephant in chains, a girl nobody sees — a story that takes the elephant out of the cage and gives it \'a permanent, definite human form.\' Why pair the two silences?',
        options: ['Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged', 'Circuses have both', 'To entertain children', 'Animals are sympathetic'],
        answer: 'Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged',
        hook: 'This is \'navlekhan\' — new writing — where the elephant isn\'t spectacle but witness, granted agency while humans look away. The Sanskrit-scholar author engineers words for emotional precision: the craft is the empathy.',
    },
    teaching: [
        { title: 'दूसरा देवदास — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the travelling circus as an anatomy of captivity: weigh the elephant\'s chain against the girl\'s silence, and test how experimental form carries feeling without breaking it.',
        labels: ['दूसरा देवदास — पृष्ठभूमि', 'दूसरा देवदास — कथानक', 'दूसरा देवदास — पाठ्य-परिवेश', 'दूसरा देवदास — पात्र-चित्रण', 'दूसरा देवदास — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_001', title: 'दूसरा देवदास — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 16 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "नवलेखन संकलन" and what is her primary literary recognition?', options: [
                { text: 'The author is ईरक कफ़ी (born 1940), a Sanskrit scholar and former director of the Central', outcome: 'The author is ईरक कफ़ी (born 1940), a Sanskrit scholar and former director of the Central Hindi.' },
                { text: 'a different author or confusing her with a poet', outcome: 'Not quite — Students treat the "Before You Read" box as optional reading to be skimmed, believing the story.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your uncle visits his widowed mother after years, hands over a cheque, and is back at the station by evening. She tells the family simply: \'I will stay here.\' Relatives declare the matter \'resolved — she\'s decided.\'',
            decisions: [{ prompt: 'How does the story\'s ending read her \'मैं यहीं रहूँगी\'?', options: [
                { text: 'As an open ending, not a resolution — her staying asserts agency but settles nothing between her and the son who offered money instead of himself; the family calling it \'resolved\' mistakes her decision for the conflict\'s settlement.', outcome: 'The chapter separates a character\'s decision from the story\'s closure: the son leaves, she stays, no reconciliation occurs — the sentence is her autonomy speaking, not peace made.' },
                { text: 'As closure — she made a choice, so the conflict between duty and autonomy is over.', outcome: 'That\'s the confusion the chapter names: a character\'s resolve isn\'t the same as resolved conflict — his money-versus-presence failure stands exactly as unanswered as before.', reveals: 'decision-equals-resolution' },
                { text: 'As surrender — she stayed because she had no other option left.', outcome: 'The flashbacks exist to prove the opposite: the house holds her whole married life and the son\'s childhood — her staying is chosen rootedness, and reading it as helplessness misses the agency the final line asserts.', reveals: 'staying-is-surrender' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the circus as a freedom allegory — and see how one chained animal can indict every human arrangement around it.',
            decisions: [{ prompt: 'What comes next? दूसरा देवदास · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — दूसरा देवदास · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit the "Before You Read" section of any Class 11 Antra chapter (e.g.',
          misconception: 'Students treat the "Before You Read" box as optional reading to be skimmed, believing the story text alone carries all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)', '\'नवलक नसोंनक़ल\' का पात्र-चित्रण'],
                  hint: 'If stuck, revisit the "Before You Read" section of any Class 11 Antra chapter (e.g.',
                  misconception: 'Students treat the "Before You Read" box as optional reading to be skimmed, believing the story text alone carries all examinable content.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot articulate the author\'s profile or the circus metaphor after reading the blurb, assign this 3-step.', '(2) Watch a 5-minute documentary clip on Indian travelling circuses (1970s-80s) to visualise the setting\'s sensory.', '(3) Write a 50-word prediction paragraph using the blurb\'s keywords (कैद, संवेदना, नवलेखन) — then compare with the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_002', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' का कथानक — \'नवलक नसोंनक़ल\' — अंतरा भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'अगर फ्लैशबैक या पाँच सोपान स्पष्ट न हों, तो कक्षा ११ के नोड c11_hin_a_cbse_01_002 के.',
          misconception: 'छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं। वे पाठ में घटनाओं को केवल क्रमवार लिख देते हैं (पहले यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' का कथानक',
                  options: ['\'नवलक नसोंनक़ल\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)', '\'नवलक नसोंनक़ल\' का पात्र-चित्रण'],
                  hint: 'अगर फ्लैशबैक या पाँच सोपान स्पष्ट न हों, तो कक्षा ११ के नोड c11_hin_a_cbse_01_002 के \'कथानक और.',
                  misconception: 'छात्र मानते हैं कि \'कथानक\' और \'आख्यान-संरचना\' पर्यायवाची हैं। वे पाठ में घटनाओं को केवल क्रमवार लिख देते हैं (पहले यह हुआ, फिर वह हुआ) और.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: छात्र से कहो — \'पाठ की १० प्रमुख घटनाएँ कागज़ पर लिखो। अब उन्हें दो कॉलम में बाँटो: (अ) काल-क्रम (Real Time) और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_003', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि परिवेश के स्तरों में भ्रम हो तो कक्षा 11 के नोड c11_hin_a_cbse_01_003 (पाठ्य-परिवेश.',
          misconception: 'छात्र प्रायः \'पाठ्य-परिवेश\' को केवल \'जहां कहानी घटित होती है\' (स्थान/समय) तक सीमित कर देते हैं और \'वातावरण\' को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)',
                  options: ['\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पात्र-चित्रण'],
                  hint: 'यदि परिवेश के स्तरों में भ्रम हो तो कक्षा 11 के नोड c11_hin_a_cbse_01_003 (पाठ्य-परिवेश और वातावरण).',
                  misconception: 'छात्र प्रायः \'पाठ्य-परिवेश\' को केवल \'जहां कहानी घटित होती है\' (स्थान/समय) तक सीमित कर देते हैं और \'वातावरण\' को \'मौसम/माहौल\' मान लेते हैं।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को कहानी के 5-6 मुख्य दृश्य पुनः पढ़वाएं और प्रत्येक में केवल भौतिक विवरण (रंग, ध्वनि, गंध, स्पर्श) पीले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_004', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि पात्र के आंतरिक मनोवैज्ञानिक विश्लेषण में कठिनाई हो, तो कक्षा 11 के पात्र-चित्रण के.',
          misconception: 'छात्र अक्सर देवदास के पात्र को केवल उनके बाहरी व्यवहार (जैसे शराब पीना या दुखी दिखना) के आधार पर मूल्यांकन करते हैं, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' का पात्र-चित्रण',
                  options: ['\'नवलक नसोंनक़ल\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि पात्र के आंतरिक मनोवैज्ञानिक विश्लेषण में कठिनाई हो, तो कक्षा 11 के पात्र-चित्रण के आधारभूत.',
                  misconception: 'छात्र अक्सर देवदास के पात्र को केवल उनके बाहरी व्यवहार (जैसे शराब पीना या दुखी दिखना) के आधार पर मूल्यांकन करते हैं, और मानते हैं कि उनका.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र देवदास के पात्र को केवल उनके बाहरी व्यवहार से समझने की गलती कर रहा है, तो पहले उसे देवदास के एक विशिष्ट दृश्य.', 'उनके चुप रहने का क्या कारण हो सकता है?" फिर उसे बताइए कि उनके चुप रहने और शराब पीने का अर्थ उनके अंदर के संघर्ष (जैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_005', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो c12_hin_a_cbse_16_003 (पाठ्य-परिवेश) पुनः पढ़ें — सामाजिक पृष्ठभूमि स्पष्ट.',
          misconception: 'छात्र सहायक पात्रों को \'नायक की कहानी में सहायता करने वाले\' मानकर उनका स्वतंत्र अस्तित्व और सामाजिक प्रतीकात्मकता भूल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' के सहायक पात्र',
                  options: ['\'नवलक नसोंनक़ल\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c12_hin_a_cbse_16_003 (पाठ्य-परिवेश) पुनः पढ़ें — सामाजिक पृष्ठभूमि स्पष्ट होते ही.',
                  misconception: 'छात्र सहायक पात्रों को \'नायक की कहानी में सहायता करने वाले\' मानकर उनका स्वतंत्र अस्तित्व और सामाजिक प्रतीकात्मकता भूल जाते हैं। उदाहरण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: पाठ से प्रत्येक सहायक पात्र के 3-3 संवाद/कार्य निकालें जो उनकी स्वतंत्र मानसिकता दर्शाते हों (न कि नायक के प्रति.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_006', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' का मुख्य विषय — \'नवलक नसोंनक़ल\' का केंद्रीय भाव और संदेश',
          hint: 'यदि फंसे हुए महसूस हो, तो कक्षा 11 के नोड c11_hin_a_cbse_01_006 (मुख्य विषय और संदेश) की.',
          misconception: 'छात्र अक्सर दूसरे देवदास के मुख्य विषय को केवल दासु और परवंती की असफल प्रेम कहानी तक सीमित रखते हैं और लिखते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' का मुख्य विषय',
                  options: ['\'नवलक नसोंनक़ल\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हुए महसूस हो, तो कक्षा 11 के नोड c11_hin_a_cbse_01_006 (मुख्य विषय और संदेश) की मुख्य विषय.',
                  misconception: 'छात्र अक्सर दूसरे देवदास के मुख्य विषय को केवल दासु और परवंती की असफल प्रेम कहानी तक सीमित रखते हैं और लिखते हैं कि "कहानी का संदेश यह है.' }
          ],
            remediations: { 'complete': { steps: ['छात्र को बताइए कि पहले वह कहानी के उन अंशों को दोबारा पढ़े जहाँ सामाजिक प्रतिक्रिया स्पष्ट हो — जैसे परवंती के परिवार.', 'इस तुलना के माध्यम से उसे समझायें कि मुख्य विषय व्यक्तिगत दुख नहीं, बल्कि सामाजिक बंधनों द्वारा व्यक्तिगत इच्छाओं का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
