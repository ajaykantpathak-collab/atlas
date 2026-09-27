import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch01_p3: SimDef = {
    id: 'v3_c12_hin_al_ch01_p3',
    title: 'सूरदास की झोंपड़ी · Part 3/3',
    subtitle: 'In this village, even the dead owed the landlord',
    classLevel: 12, subject: 'hin_al', topic: 'सूरदास की झोंपड़ी · Part 3/3',
    chapters: ['c12_hin_al_ch01'],
    nodeIds: ['c12_hin_al_cbse_01_013', 'c12_hin_al_cbse_01_014', 'c12_hin_al_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi regional-literature reader', intro: 'A custom where the dead were auctioned for debt sounds invented — it wasn\'t. Renu documented it from life.', goal: 'Read Laknak ki Saai through zamindari exploitation, informal credit and the custom of साईँ.' },
    discovery: {
        question: 'In 1950s Bihar, a landlord auctions a peasant family\'s dead to recover a debt — the custom called \'साईँ.\' Why did the corpse become collateral?',
        options: ['No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself', 'It was a religious ritual', 'Villages had no money at all', 'The dead were community property'],
        answer: 'No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself',
        hook: 'This isn\'t a funeral rite — it\'s feudal economics with the corpse as collateral, turning even death into a transaction. Renu was a Quit India fighter and rural journalist: the आंचलिक dialect and documented detail make it an indictment, not a village sketch.',
    },
    teaching: [
        { title: 'सूरदास की झोंपड़ी — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह कौशल है जिसमें छात्र किसी साहित्यिक पाठ के तत्वों—जैसे पात्र, विषय, साहित्यिक युक्तियाँ, और संदर्भ—to तोड़कर उनके बीच के संबंधों को समझता है, साक्ष्य के आधार.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Renu\'s Bihar as a documentarian: decode the custom that auctions the dead, weigh the zamindar-peasant power imbalance, and read dialect as resistance.',
        labels: ['सूरदास की झोंपड़ी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'On an NGO internship in a village, you watch a moneylender stall a poor family\'s funeral until they \'settle his dues\' — the crowd shrugs that debt must be honoured. Your field note reads: \'cruel individual.\'',
            decisions: [{ prompt: 'What does the context of Renu\'s \'साईँ\' add to that diagnosis?', options: [
                { text: 'Rewrite the note as a systemic failure — \'साईँ\' treated even a corpse as loan collateral because peasants had no formal credit; the moneylender blocking the rites isn\'t just a cruel man, he\'s the visible edge of a system where the borrower\'s dignity is the last asset on the books.', outcome: 'Renu\'s story is an indictment of the credit vacuum and landlord power that made bodies payable — \'poverty\' alone doesn\'t explain it; the absence of institutional alternatives does.' },
                { text: 'Keep the note as written — one cruel man harassing a grieving family is the whole story.', outcome: 'That flattens Renu\'s critique into a villain sketch: the custom persisted because the village economy had no other way to secure a loan, so removing one lender leaves the machinery intact.', reveals: 'cruelty-is-individual' },
                { text: 'Side with the crowd — a debt is a debt, and rituals shouldn\'t shield borrowers from repayment.', outcome: 'That naturalises exactly what the story exposes: when a corpse can be collateral, \'honouring debt\' has already swallowed human dignity — the crowd\'s shrug is the system\'s success, not its excuse.', reveals: 'debt-before-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a regional story as evidence of a system — where even grief was mortgaged to the landlord.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह कौशल है जिसमें छात्र किसी साहित्यिक.',
          hint: 'पात्र-चित्रण: नायक/प्रमुख पात्र (c12_hin_al_cbse_01_004) की समीक्षा करें, जहाँ पात्रों के.',
          misconception: 'छात्र अक्सर सूरदास की झोंपड़ी के विश्लेषण में पात्रों के कार्यों का केवल वर्णन करके सोचते हैं कि उन्होंने आलोचनात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह कौशल है जिसमें छात्र किसी साहित्यिक पाठ के',
                  options: ['आलोचनात्मक चिंतन: विश्लेषण और व्याख्या वह कौशल है जिसमें छात्र किसी साहित्यिक पाठ के', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'पात्र-चित्रण: नायक/प्रमुख पात्र (c12_hin_al_cbse_01_004) की समीक्षा करें, जहाँ पात्रों के व्यवहार.',
                  misconception: 'छात्र अक्सर सूरदास की झोंपड़ी के विश्लेषण में पात्रों के कार्यों का केवल वर्णन करके सोचते हैं कि उन्होंने आलोचनात्मक चिंतन किया है, जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर जैसे "सूरदास झोंपड़ी नहीं सुधारते" को कैसे सुधारा जाए: पहले पूछिए कि "क्या हो सकता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए पाठ्यांश से संबंधित.',
          hint: 'अगर छात्र पाठ से उचित साक्ष्य नहीं चुन पा रहा है, तो उसे c12_hin_al_cbse_01_004 और.',
          misconception: 'छात्र अक्सर पाठ-आधारित उत्तर लिखते समय प्रश्न के अनुसार उत्तर नहीं देते हैं, बल्कि पाठ से याद किए गए किसी भी तथ्य को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए पाठ्यांश से संबंधित जानकारी को',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए पाठ्यांश से संबंधित जानकारी को', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'अगर छात्र पाठ से उचित साक्ष्य नहीं चुन पा रहा है, तो उसे c12_hin_al_cbse_01_004 और.',
                  misconception: 'छात्र अक्सर पाठ-आधारित उत्तर लिखते समय प्रश्न के अनुसार उत्तर नहीं देते हैं, बल्कि पाठ से याद किए गए किसी भी तथ्य को लिख देना शुरू कर देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले प्रश्न को दो बार पढ़कर पूछना चाहिए: "इस प्रश्न में वास्तव� क्या पूछा जा रहा है?" फिर उसे प्रश्न के.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें छात्र पाठ को聲लय, रुकावट और.',
          hint: 'यदि आवाज़ modulation में कठिनाई हो तो c12_hin_al_cbse_01_003 (पाठ्य-परिवेश और वातावरण) की.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण का अर्थ केवल सही उच्चारण और तेज़ गति से पढ़ना है, जबकि असल में यह पाठ की聲लय, रुकावट.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें छात्र पाठ को聲लय, रुकावट और भावभंगिमा के',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें छात्र पाठ को聲लय, रुकावट और भावभंगिमा के', 'सूरदास की झोंपड़ी का पृष्ठभूमि और रचनाकार परिचय वह विवरण है जो सूरदास के जीवन, उनके', 'कथानक (Plot) किसी रचना में घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कारण-कार्य संबंध', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का भौतिक, सामाजिक, ऐतिहासिक और'],
                  hint: 'यदि आवाज़ modulation में कठिनाई हो तो c12_hin_al_cbse_01_003 (पाठ्य-परिवेश और वातावरण) की समीक्षा.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण का अर्थ केवल सही उच्चारण और तेज़ गति से पढ़ना है, जबकि असल में यह पाठ की聲लय, रुकावट और भावभंगिमा को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले एक छोटा अंश (2-3 पंक्तियाँ) देकर धीमी गति से पढ़ने के लिए कहें, फिर पूछें कि "आपकी आवाज़ में किन शब्दों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
