import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch01_p2: SimDef = {
    id: 'v3_c12_hin_al_ch01_p2',
    title: 'सूरदास की झोंपड़ी · Part 2/3',
    subtitle: 'In this village, even the dead owed the landlord',
    classLevel: 12, subject: 'hin_al', topic: 'सूरदास की झोंपड़ी · Part 2/3',
    chapters: ['c12_hin_al_ch01'],
    nodeIds: ['c12_hin_al_cbse_01_007', 'c12_hin_al_cbse_01_008', 'c12_hin_al_cbse_01_009', 'c12_hin_al_cbse_01_010', 'c12_hin_al_cbse_01_011', 'c12_hin_al_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi regional-literature reader', intro: 'A custom where the dead were auctioned for debt sounds invented — it wasn\'t. Renu documented it from life.', goal: 'Read Laknak ki Saai through zamindari exploitation, informal credit and the custom of साईँ.' },
    discovery: {
        question: 'In 1950s Bihar, a landlord auctions a peasant family\'s dead to recover a debt — the custom called \'साईँ.\' Why did the corpse become collateral?',
        options: ['No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself', 'It was a religious ritual', 'Villages had no money at all', 'The dead were community property'],
        answer: 'No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself',
        hook: 'This isn\'t a funeral rite — it\'s feudal economics with the corpse as collateral, turning even death into a transaction. Renu was a Quit India fighter and rural journalist: the आंचलिक dialect and documented detail make it an indictment, not a village sketch.',
    },
    teaching: [
        { title: 'सूरदास की झोंपड़ी — गौण विषय', text: 'गौण विषय वे छोटे-छोटे विषय या विचार हैं जो मुख्य कहानी के साथ चलते हैं, उसे सपोर्ट करते हैं और मुख्य संदेश को स्पष्ट या गहरा बनाने में मदद करते हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Renu\'s Bihar as a documentarian: decode the custom that auctions the dead, weigh the zamindar-peasant power imbalance, and read dialect as resistance.',
        labels: ['सूरदास की झोंपड़ी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On an NGO internship in a village, you watch a moneylender stall a poor family\'s funeral until they \'settle his dues\' — the crowd shrugs that debt must be honoured. Your field note reads: \'cruel individual.\'',
            decisions: [{ prompt: 'What does the context of Renu\'s \'साईँ\' add to that diagnosis?', options: [
                { text: 'Rewrite the note as a systemic failure — \'साईँ\' treated even a corpse as loan collateral because peasants had no formal credit; the moneylender blocking the rites isn\'t just a cruel man, he\'s the visible edge of a system where the borrower\'s dignity is the last asset on the books.', outcome: 'Renu\'s story is an indictment of the credit vacuum and landlord power that made bodies payable — \'poverty\' alone doesn\'t explain it; the absence of institutional alternatives does.' },
                { text: 'Keep the note as written — one cruel man harassing a grieving family is the whole story.', outcome: 'That flattens Renu\'s critique into a villain sketch: the custom persisted because the village economy had no other way to secure a loan, so removing one lender leaves the machinery intact.', reveals: 'cruelty-is-individual' },
                { text: 'Side with the crowd — a debt is a debt, and rituals shouldn\'t shield borrowers from repayment.', outcome: 'That naturalises exactly what the story exposes: when a corpse can be collateral, \'honouring debt\' has already swallowed human dignity — the crowd\'s shrug is the system\'s success, not its excuse.', reveals: 'debt-before-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a regional story as evidence of a system — where even grief was mortgaged to the landlord.',
            decisions: [{ prompt: 'What comes next? सूरदास की झोंपड़ी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सूरदास की झोंपड़ी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय वे छोटे-छोटे विषय या विचार हैं जो मुख्य कहानी के साथ चलते हैं, उसे.',
          hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो c12_hin_al_cbse_01_006 नोड को दोबारा देखिए जहाँ.',
          misconception: 'छात्र अक्सर गौण विषय को \'अवश्यक नहीं\' या \'फिलर materiał\' मानते हैं, सोचते हैं कि यदि इन्हें हटा दिया जाए तो कहानी पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वे छोटे-छोटे विषय या विचार हैं जो मुख्य कहानी के साथ चलते हैं, उसे सपोर्ट करते',
                  options: ['गौण विषय वे छोटे-छोटे विषय या विचार हैं जो मुख्य कहानी के साथ चलते हैं, उसे सपोर्ट करते', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि मुख्य विषय की पहचान में कठिनाई हो, तो c12_hin_al_cbse_01_006 नोड को दोबारा देखिए जहाँ मुख्य.',
                  misconception: 'छात्र अक्सर गौण विषय को \'अवश्यक नहीं\' या \'फिलर materiał\' मानते हैं, सोचते हैं कि यदि इन्हें हटा दिया जाए तो कहानी पर कोई फर्क नहीं.' }
          ],
            remediations: { 'materia': { steps: ['छात्र को पाठ में एक ऐसा अंश चुनने के लिए कहिए जहाँ कोई छोटी घटना हो (जैसे सूरदास का झोंपड़ी में बैठना) और पूछिए: "यदि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_008', difficulty: 'standard',
          question: 'बिंब वह संकेत या चित्र है जो किसी विचार, भावना या अवधारणा को बिना सीधे कहे.',
          hint: 'यदि फंसें तो कक्षा 11 के c11_hin_a_cbse_01_008 नोड revisit करें, जहाँ बिंब-रूपक की.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द गहरा लगता है (जैसे \'नील\', \'भारी\', \'टूटा\') तो वह स्वचालित रूप से रूपक है, क्योंकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह संकेत या चित्र है जो किसी विचार, भावना या अवधारणा को बिना सीधे कहे संकेत करता है',
                  options: ['बिंब वह संकेत या चित्र है जो किसी विचार, भावना या अवधारणा को बिना सीधे कहे संकेत करता है', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि फंसें तो कक्षा 11 के c11_hin_a_cbse_01_008 नोड revisit करें, जहाँ बिंब-रूपक की परिभाषा उदाहरणों.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई शब्द गहरा लगता है (जैसे \'नील\', \'भारी\', \'टूटा\') तो वह स्वचालित रूप से रूपक है, क्योंकि वे रूपक को \'गहरा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि दो वाक्य लें: (1) \'उसकी मुस्कान चाँद जैसी थी\' (रूपक—दो स्पष्ट चीजें: मुस्कान और चाँद) और (2) \'उसके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_009', difficulty: 'standard',
          question: 'विरोधाभास एक साहित्यिक युक्ति है जिसमें दो विपरीत या असंगत विचार, छवियों या.',
          hint: 'यदि छात्र फँसें तो उन्हें सूरदास की झोंपड़ी के पात्र-चित्रण (c12_hin_al_cbse_01_004) और.',
          misconception: 'विद्यार्थी अक्सर सूरदास की झोंपड़ी में विरोधाभास को केवल बाहरी सादगी (झोंपड़ी की simplicity) और आंतरिक खुशी (मन की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास एक साहित्यिक युक्ति है जिसमें दो विपरीत या असंगत विचार, छवियों या स्थितियों को',
                  options: ['विरोधाभास एक साहित्यिक युक्ति है जिसमें दो विपरीत या असंगत विचार, छवियों या स्थितियों को', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि छात्र फँसें तो उन्हें सूरदास की झोंपड़ी के पात्र-चित्रण (c12_hin_al_cbse_01_004) और मुख्य विषय.',
                  misconception: 'विद्यार्थी अक्सर सूरदास की झोंपड़ी में विरोधाभास को केवल बाहरी सादगी (झोंपड़ी की simplicity) और आंतरिक खुशी (मन की आनंद) के बीच के सरल अंतर.' }
          ],
            remediations: { 'simplicity': { steps: ['छात्र को सबसे पहले सूरदास की झोंपड़ी के उन पद्यांशों को दोबारा पढ़ने के लिए कहिए जहाँ बाहरी वर्णन (झोंपड़ी का निर्माण.', 'क्यों या क्यों नहीं?" इससे उन्हें एहसास होगा कि विरोधाभास बस गरीबी का वर्णन नहीं, बल्कि आध्यात्मिक मूल्य की स्वतंत्रता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वो महत्वपूर्ण शब्द होते हैं जो पाठ के विषय, भाव या पात्रों.',
          hint: 'यदि फंसें तो कक्षा 11 के पदावली नोड (c11_hin_a_cbse_01_010) की मुख्य शब्दों की पहचान और.',
          misconception: 'छात्र अक्सर मुख्य शब्दों के पर्यायवाची को उनके समान अर्थ मानकर interchangeably उपयोग कर देते हैं, जैसे \'भक्त\' को \'सेवक\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वो महत्वपूर्ण शब्द होते हैं जो पाठ के विषय, भाव या पात्रों को समझने की',
                  options: ['पदावली: मुख्य शब्द वो महत्वपूर्ण शब्द होते हैं जो पाठ के विषय, भाव या पात्रों को समझने की', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि फंसें तो कक्षा 11 के पदावली नोड (c11_hin_a_cbse_01_010) की मुख्य शब्दों की पहचान और अर्थ बताने.',
                  misconception: 'छात्र अक्सर मुख्य शब्दों के पर्यायवाची को उनके समान अर्थ मानकर interchangeably उपयोग कर देते हैं, जैसे \'भक्त\' को \'सेवक\' के समान समझना, जबकि.' }
          ],
            remediations: { 'interchangeably': { steps: ['छात्र को दो वाक्य दीजिए: एक में \'भक्त\' और दूसरे में \'सेवक\' का प्रयोग सही संदर्भ में करिए; फिर पूछिए कि प्रत्येक शब्द.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_011', difficulty: 'standard',
          question: 'सूरदास की झोंपड़ी पाठ में भाषा-प्रयोग का तात्पर्य उस पाठ में प्रयुक्त शब्दों.',
          hint: 'कक्षा 11 के अलंकार और शैली के मूल 개념 (c11_hin_a_cbse_01_011) को दोहराएँ — विशेष रूप से.',
          misconception: 'छात्र अक्सर भाषा-प्रयोग को केवल "शब्दों के अर्थ निकालने" तक सीमित रखते हैं, जैसे "झोंपड़ी" का अर्थ छोटा घर बताना, लेकिन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सूरदास की झोंपड़ी पाठ में भाषा-प्रयोग का तात्पर्य उस पाठ में प्रयुक्त शब्दों, वाक्य',
                  options: ['सूरदास की झोंपड़ी पाठ में भाषा-प्रयोग का तात्पर्य उस पाठ में प्रयुक्त शब्दों, वाक्य', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'कक्षा 11 के अलंकार और शैली के मूल 개념 (c11_hin_a_cbse_01_011) को दोहराएँ — विशेष रूप से रूपक और उपमा.',
                  misconception: 'छात्र अक्सर भाषा-प्रयोग को केवल "शब्दों के अर्थ निकालने" तक सीमित रखते हैं, जैसे "झोंपड़ी" का अर्थ छोटा घर बताना, लेकिन यह नहीं देखते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहिए कि वह पाठ के दो वाक्यों को आवाज़ में पढ़े — एक सरल वाक्य ("मैं झोंपड़ी में रहता हूँ") और एक अलंकारिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर निश्चित होते हैं और इनमें.',
          hint: 'यदि छात्र मुख्य विषय पहचानने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_al_cbse_01_006.',
          misconception: 'छात्र अक्सर वस्तुनिष्ठ प्रश्नों में विकल्पों के शब्दों को पाठ के शब्दों से सीधे मिलान करके उत्तर चुनते हैं, जैसे कि यदि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर निश्चित होते हैं और इनमें बहुविकल्पीय,',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनके उत्तर निश्चित होते हैं और इनमें बहुविकल्पीय,', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि छात्र मुख्य विषय पहचानने में कठिनाई महसूस कर रहा है, तो उसे c12_hin_al_cbse_01_006 नोड को फिर.',
                  misconception: 'छात्र अक्सर वस्तुनिष्ठ प्रश्नों में विकल्पों के शब्दों को पाठ के शब्दों से सीधे मिलान करके उत्तर चुनते हैं, जैसे कि यदि विकल्प में "त्याग".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाएँ कि एक ही शब्द (जैसे "त्याग") अलग-अलग संदर्भों में अलग अर्थ रख सकता है। पहले पाठ से दो वाक्य लें—एक जहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
