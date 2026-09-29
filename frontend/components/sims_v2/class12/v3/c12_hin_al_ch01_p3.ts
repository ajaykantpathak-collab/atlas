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
        { title: 'सूरदास की झोंपड़ी — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'ल्वज्नकल की >कसईम+ह\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Renu\'s Bihar as a documentarian: decode the custom that auctions the dead, weigh the zamindar-peasant power imbalance, and read dialect as resistance.',
        labels: ['सूरदास की झोंपड़ी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_015', title: 'सूरदास की झोंपड़ी — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'ल्वज्नकल की >कसईम+ह\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'List three major themes from "lwjnkl dh >ksaiM+h" that can serve as the basis for a structured class discussion.', options: [
                { text: 'Correct answer: (1) Aging and loss of dignity, (2) Family responsibility vs', outcome: 'Correct answer: (1) Aging and loss of dignity, (2) Family responsibility vs.' },
                { text: 'the stick breaks, the son gets angry, the old man leaves', outcome: 'Not quite — Students believe a "discussion point" is simply retelling a scene or stating whether they liked.', reveals: 'a-discussion-point-is-simply' },
                { text: 'discussion point', outcome: 'Not quite — Students believe a "discussion point" is simply retelling a scene or stating whether they liked.', reveals: 'a-discussion-point-is-simply' }
            ] }] } },
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
          question: '\'ल्वज्नकल की >कसईम+ह\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'पात्र-चित्रण: नायक/प्रमुख पात्र (c12_hin_al_cbse_01_004) की समीक्षा करें, जहाँ पात्रों के.',
          misconception: 'छात्र अक्सर सूरदास की झोंपड़ी के विश्लेषण में पात्रों के कार्यों का केवल वर्णन करके सोचते हैं कि उन्होंने आलोचनात्मक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' का आलोचनात्मक चिंतन',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'पात्र-चित्रण: नायक/प्रमुख पात्र (c12_hin_al_cbse_01_004) की समीक्षा करें, जहाँ पात्रों के व्यवहार.',
                  misconception: 'छात्र अक्सर सूरदास की झोंपड़ी के विश्लेषण में पात्रों के कार्यों का केवल वर्णन करके सोचते हैं कि उन्होंने आलोचनात्मक चिंतन किया है, जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर जैसे "सूरदास झोंपड़ी नहीं सुधारते" को कैसे सुधारा जाए: पहले पूछिए कि "क्या हो सकता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_014', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL संरचना लागू करने में अटकें, तो कक्षा 11 अंतरा के किसी भी अध्याय के लेखन कौशल नोड.',
          misconception: '**विशिष्ट भ्रांति:** "लेखन कौशल (Writing Skills) का अर्थ है कहानी का सारांश (summary) लिखना या अपने शब्दों में कथानक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' पर पाठ-आधारित लेखन',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि PEEL संरचना लागू करने में अटकें, तो कक्षा 11 अंतरा के किसी भी अध्याय के लेखन कौशल नोड.',
                  misconception: '**विशिष्ट भ्रांति:** "लेखन कौशल (Writing Skills) का अर्थ है कहानी का सारांश (summary) लिखना या अपने शब्दों में कथानक दोहराना।".' }
          ],
            remediations: { 'writing-skills-summary-cbse-writing': { steps: ['**चरण 1:** छात्र से कहें — "पाठ से कोई एक वाक्य चुनो जो तुम्हें सबसे मार्मिक (poignant) लगा। उसे कॉपी में लिखो।".', '**E** = पाठ में लिखा है...', '**L** = इससे कहानी का विषय...', 'उभरता है। **चरण 4:** छात्र से इसी टेम्पलेट में 3 वाक्य लिखवाएँ। अगले दिन वही प्रश्न दोहराएँ — यदि संरचना सही परंतु.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_015', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, revisit character analysis (nodes 004, 005) and theme analysis (nodes 006, 007).',
          misconception: 'Students believe a "discussion point" is simply retelling a scene or stating whether they liked a character.',
          parts: [
                { id: 'a', prompt: 'List three major themes from "lwjnkl dh >ksaiM+h" that can serve as the basis for a structured class discussion.', answer: 'Correct answer: (1) Aging and loss of dignity, (2) Family responsibility vs',
                  options: ['Correct answer: (1) Aging and loss of dignity, (2) Family responsibility vs', 'the stick breaks, the son gets angry, the old man leaves', 'discussion point', 'lists plot events (e'],
                  hint: 'If stuck, revisit character analysis (nodes 004, 005) and theme analysis (nodes 006, 007) to gather.',
                  misconception: 'Students believe a "discussion point" is simply retelling a scene or stating whether they liked a character.' },
                { id: 'b', prompt: 'Given the discussion prompt "Is the son justified in his behavior toward his father?", outline two arguments for and two against, using textual evidence for.', answer: 'Correct answer: For: (1) Son provides food and shelter',
                  options: ['Correct answer: For: (1) Son provides food and shelter', 'he is mean', 'discussion point'],
                  hint: 'If stuck, revisit character analysis (nodes 004, 005) and theme analysis (nodes 006, 007) to gather.',
                  misconception: 'Students believe a "discussion point" is simply retelling a scene or stating whether they liked a character.' },
                { id: 'c', prompt: 'Compare the daughter-in-law\'s treatment of the old man with the grandson\'s attitude. What does this contrast reveal about generational change in the family?', answer: 'Correct answer: The daughter-in-law is cruel and calculating',
                  options: ['Correct answer: The daughter-in-law is cruel and calculating', 'both are bad', 'grandson is good', 'discussion point'],
                  hint: 'If stuck, revisit character analysis (nodes 004, 005) and theme analysis (nodes 006, 007) to gather.',
                  misconception: 'Students believe a "discussion point" is simply retelling a scene or stating whether they liked a character.' }
          ],
            remediations: { 'a-discussion-point-is-simply': { steps: ['Have the student re-read three key scenes: the stick-breaking demand (pp.', '3-4), the old man\'s monologue about the five sticks (p.', '5), and the final departure (p.', 'For each scene, write one Claim-Evidence-Explanation paragraph (e.g., Claim: The stick holds memories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_015', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a "discussion point" is simply retelling a scene or stating whether they liked a character.',
          parts: [
                { id: 'a', prompt: 'Judge the effectiveness of the ending (old man walking away with the stick) as a discussion starter. Does it resolve or deepen the conflict?', answer: 'Correct answer: It deepens the conflict',
                  options: ['Correct answer: It deepens the conflict', 'it resolves everything', 'discussion point'],
                  hint: 'If stuck, revisit character analysis (nodes 004, 005) and theme analysis (nodes 006, 007) to gather.',
                  misconception: 'Students believe a "discussion point" is simply retelling a scene or stating whether they liked a character.' }
          ],
            remediations: { 'a-discussion-point-is-simply': { steps: ['Have the student re-read three key scenes: the stick-breaking demand (pp.', '3-4), the old man\'s monologue about the five sticks (p.', '5), and the final departure (p.', 'For each scene, write one Claim-Evidence-Explanation paragraph (e.g., Claim: The stick holds memories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
