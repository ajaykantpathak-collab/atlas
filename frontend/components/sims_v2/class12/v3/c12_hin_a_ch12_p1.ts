import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch12_p1: SimDef = {
    id: 'v3_c12_hin_a_ch12_p1',
    title: 'संवदयिा · Part 1/3',
    subtitle: 'A union leader wrote the village in the village\'s own voice',
    classLevel: 12, subject: 'hin_a', topic: 'संवदयिा · Part 1/3',
    chapters: ['c12_hin_a_ch12'],
    nodeIds: ['c12_hin_a_cbse_12_001', 'c12_hin_a_cbse_12_002', 'c12_hin_a_cbse_12_003', 'c12_hin_a_cbse_12_004', 'c12_hin_a_cbse_12_005', 'c12_hin_a_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Socialist-fiction reader', intro: 'He fought the British, organised workers, then sat down to write the village as the village sounds.', goal: 'Read Renu\'s/Phanishwar Nath\'s story through socialist humanism — colloquial voice as the carrier of rural truth.' },
    discovery: {
        question: 'A Quit India activist and trade unionist writes a village story in the village\'s own tongue — why does the colloquial language matter as much as the plot?',
        options: ['Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance', 'Simple language for simple readers', 'Dialect is easier to write', 'Just realism for colour'],
        answer: 'Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance',
        hook: '\'Simple\' isn\'t \'artless\' — colloquial, descriptive, expressive prose immerses you in village life so hardship and tenderness land as lived, not reported. A socialist lens sees both the poverty AND the feeling; the story outlives its decade because the rural-urban divide still argues today.',
    },
    teaching: [
        { title: 'संवदयिा — पृष्ठभूमि और रचनाकार परिचय', text: 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक स्थिति, रचनात्मक यात्रा, और उसके युग के ऐतिहासिक संदर्भ को समझा जाता है ताकि पाठ के गहरे अर्थ और लेखन के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the village through its own speech: weigh a freedom fighter\'s lens on rural suffering, test why colloquiality is craft, and ask what a 1950s story still teaches a 2025 reader.',
        labels: ['संवदयिा — पृष्ठभूमि और', 'संवदयिा — कथानक और', 'संवदयिा — पाठ्य-परिवेश और', 'संवदयिा — पात्र-चित्रण: नायक/प्रमुख', 'संवदयिा — पात्र-चित्रण: सहायक', 'संवदयिा — मुख्य विषय'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family wants to shift the ageing grandmother — who has nursed half the village\'s children — into your city flat \'for her own good.\' She refuses flatly, and everyone calls it stubbornness.',
            decisions: [{ prompt: 'How does the climax of \'रेणु\' read her refusal?', options: [
                { text: 'As the story\'s peak of belonging — the nanny refuses the narrator\'s city offer with \'you are my mother, mother of the whole village\' echoing around her; she isn\'t refusing care, she\'s rooted where her care made her everyone\'s.', outcome: 'The story builds to that confrontation precisely so her staying reads as identity, not obstinacy — the village is her life\'s work, and removing her to \'safety\' removes her from herself.' },
                { text: 'Insist on the move — the city\'s facilities objectively outweigh a village attachment.', outcome: 'That\'s the narrator\'s own plan at the climax, and the story gives it no victory: her refusal stands because the measure of her good isn\'t amenities but the web of people who call her mother.', reveals: 'facilities-outweigh-roots' },
                { text: 'Let her stay but stop calling — if she chooses the village, she\'s chosen isolation.', outcome: 'The story\'s flashbacks exist to show she\'s the least alone person in it — the refusal closes the city plan, not the relationship; withdrawing contact punishes her for rootedness.', reveals: 'staying-equals-isolation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read voice as worldview — where the choice of dialect is itself a statement about whose reality counts.',
            decisions: [{ prompt: 'What comes next? संवदयिा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — संवदयिा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_001', difficulty: 'standard',
          question: 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल.',
          hint: 'यदि फंसे हुए महसूस हो रहे हैं, तो Class 11 में पढ़े गए किसी भी पाठ के लेखक परिचय (जैसे.',
          misconception: 'छात्र अक्सर लेखक के परिचय को केवल एक तथ्यात्मक पूर्वावलोकन मानते हैं जिसे याद लेकर भूल दिया जाता है, और वे यह नहीं समझ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक',
                  options: ['संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई', 'नायक/प्रमुख पात्र का चरित्र-चित्रण वह प्रक्रिया है जिसमें लेखक पात्र के शारीरिक लक्षणों,'],
                  hint: 'यदि फंसे हुए महसूस हो रहे हैं, तो Class 11 में पढ़े गए किसी भी पाठ के लेखक परिचय (जैसे.',
                  misconception: 'छात्र अक्सर लेखक के परिचय को केवल एक तथ्यात्मक पूर्वावलोकन मानते हैं जिसे याद लेकर भूल दिया जाता है, और वे यह नहीं समझ पाते कि लेखक के जीवन.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कैसे कोई specific घटना (जैसे लेखक के जीवन में किसी विशेष त्योहार का अनुभव या किसी सामाजिक आंदोलन में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_002', difficulty: 'standard',
          question: 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय.',
          hint: 'यदि छात्र घटनाओं के क्रम को कथानक मान रहा हो, तो उसे c11_hin_a_cbse_02_002 पर फिर से जाना.',
          misconception: 'छात्र अक्सर मानते हैं कि कथानक बस कहानी में हुई घटनाओं का क्रम है, और इसलिए वे परीक्षा में केवल घटनाओं को लिस्ट करके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,',
                  options: ['कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई', 'नायक/प्रमुख पात्र का चरित्र-चित्रण वह प्रक्रिया है जिसमें लेखक पात्र के शारीरिक लक्षणों,'],
                  hint: 'यदि छात्र घटनाओं के क्रम को कथानक मान रहा हो, तो उसे c11_hin_a_cbse_02_002 पर फिर से जाना चाहिए.',
                  misconception: 'छात्र अक्सर मानते हैं कि कथानक बस कहानी में हुई घटनाओं का क्रम है, और इसलिए वे परीक्षा में केवल घटनाओं को लिस्ट करके जवाब देते हैं, जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस भूल को दूर करने के लिए, छात्र को एक familiar कहानी (जैसे शेर और चूहा) लेनी चाहिए और पूछना चाहिए: "यदि हम घटनाओं को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है.',
          hint: 'यदि फँसें, तो Class 11 के नोड c11_hin_a_cbse_03_003 में पाठ्य-परिवेश की परिभाषा और सरल.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल कहानी के \'पृष्ठभूमि विवरण\' (जैसे साल या शहर का नाम) है, जो plot या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई',
                  options: ['पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'नायक/प्रमुख पात्र का चरित्र-चित्रण वह प्रक्रिया है जिसमें लेखक पात्र के शारीरिक लक्षणों,'],
                  hint: 'यदि फँसें, तो Class 11 के नोड c11_hin_a_cbse_03_003 में पाठ्य-परिवेश की परिभाषा और सरल पहचान के.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल कहानी के \'पृष्ठभूमि विवरण\' (जैसे साल या शहर का नाम) है, जो plot या characters से स्वतंत्र रूप से.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए: "यदि यही कहानी एक शहरी अपार्टमेंट में रात 2 बजे होती, तो क्या मुख्य पात्र अभी भी वैसा ही महसूस करता?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_004', difficulty: 'standard',
          question: 'नायक/प्रमुख पात्र का चरित्र-चित्रण वह प्रक्रिया है जिसमें लेखक पात्र के शारीरिक.',
          hint: 'यदि छात्र केवल बाहरी विवरणों पर फंसा हुआ है, तो उसे c11_hin_a_cbse_04_004 (कक्षा 11 में.',
          misconception: 'छात्र अक्सर नायक के चरित्र को केवल उसके बाहरी लक्षणों — जैसे कि उसका वेशभूषा, चेहरे का रंग, या शारीरिक ताकत — के आधार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'नायक/प्रमुख पात्र का चरित्र-चित्रण वह प्रक्रिया है जिसमें लेखक पात्र के शारीरिक लक्षणों,',
                  options: ['नायक/प्रमुख पात्र का चरित्र-चित्रण वह प्रक्रिया है जिसमें लेखक पात्र के शारीरिक लक्षणों,', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र केवल बाहरी विवरणों पर फंसा हुआ है, तो उसे c11_hin_a_cbse_04_004 (कक्षा 11 में नायक के.',
                  misconception: 'छात्र अक्सर नायक के चरित्र को केवल उसके बाहरी लक्षणों — जैसे कि उसका वेशभूषा, चेहरे का रंग, या शारीरिक ताकत — के आधार पर आंकते हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को सुधारने के लिए, छात्र को पाठ में कम से कम तीन ऐसे क्षणों की पहचान करनी होगी जहां नायक के आंतरिक गुण उसके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_005', difficulty: 'standard',
          question: 'सहायक पात्र वे कल्पित व्यक्ति होते हैं जो मुख्य पात्र के साथ बातचीत करके कथानक.',
          hint: 'यदि छात्र सहायक पात्र के चरित्र के गहरे विश्लेषण में फंस जाए, तो उसे पिछले नोड.',
          misconception: 'छात्र अक्सर सहायक पात्र को केवल \'मुख्य पात्र की मदद करने वाले\' या \'बस वहाँ मौजूद वाले\' के रूप में देखते हैं, जबकि उनकी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे कल्पित व्यक्ति होते हैं जो मुख्य पात्र के साथ बातचीत करके कथानक को आगे',
                  options: ['सहायक पात्र वे कल्पित व्यक्ति होते हैं जो मुख्य पात्र के साथ बातचीत करके कथानक को आगे', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र सहायक पात्र के चरित्र के गहरे विश्लेषण में फंस जाए, तो उसे पिछले नोड.',
                  misconception: 'छात्र अक्सर सहायक पात्र को केवल \'मुख्य पात्र की मदद करने वाले\' या \'बस वहाँ मौजूद वाले\' के रूप में देखते हैं, जबकि उनकी भूमिका बहुत अधिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह एक ऐसा दृश्य याद करे जहाँ मुख्य पात्र बहुत संघर्ष में दिख रहा हो—फिर उससे पूछिए: "उस दृश्य में कौन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार है जो पूरी कहानी को जोड़ता है, जबकि संदेश वह.',
          hint: 'पात्र-चित्रण और कथानक-संरचना की समीक्षा करें — विशेष रूप से c12_hin_a_cbse_12_004 और.',
          misconception: 'छात्र अक्सर मुख्य विषय को कहानी के सारांश या निष्कर्ष के साथ भ्रमित कर लेते हैं, जैसे कि "राजा ने राज्य जीता" को मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार है जो पूरी कहानी को जोड़ता है, जबकि संदेश वह उपयोगी सीख है',
                  options: ['मुख्य विषय वह केंद्रीय विचार है जो पूरी कहानी को जोड़ता है, जबकि संदेश वह उपयोगी सीख है', 'संवादिया — पृष्ठभूमि और रचनाकार परिचय वह अध्ययन है जिसमें लेखक के जीवनकाल, सामाजिक-आर्थिक', 'कथानक वह क्रमबद्ध घटनाओं की श्रृंखला है जो एक कहानी में होती है, जिसमें परिचय, संघर्ष,', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक-आर्थिक स्थिति और सांस्कृतिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'पात्र-चित्रण और कथानक-संरचना की समीक्षा करें — विशेष रूप से c12_hin_a_cbse_12_004 और.',
                  misconception: 'छात्र अक्सर मुख्य विषय को कहानी के सारांश या निष्कर्ष के साथ भ्रमित कर लेते हैं, जैसे कि "राजा ने राज्य जीता" को मुख्य विषय मान लेते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन महत्वपूर्ण क्षण चुनने को कहिए जहां पात्र का निर्णय या घटना का परिणाम दिखा रहा हो। फिर पूछिए.', 'यदि वे अभी भी भ्रमित हैं, तो बताइए कि मुख्य विषय हमेशा एक मूल्य या मानवीय स्थिति पर आधारित होता है जैसे डर, लालच.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
