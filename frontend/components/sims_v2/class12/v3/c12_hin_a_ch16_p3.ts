import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch16_p3: SimDef = {
    id: 'v3_c12_hin_a_ch16_p3',
    title: 'दूसरा देवदास · Part 3/3',
    subtitle: 'The elephant saw everything — from inside the chain',
    classLevel: 12, subject: 'hin_a', topic: 'दूसरा देवदास · Part 3/3',
    chapters: ['c12_hin_a_ch16'],
    nodeIds: ['c12_hin_a_cbse_16_013', 'c12_hin_a_cbse_16_014', 'c12_hin_a_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A Sanskrit scholar who ran institutions writes the most radical thing — a story where the animal has more presence than the people.', goal: 'Read the story\'s circus as a microcosm of captivity — the elephant\'s chain beside the girl\'s invisibility.' },
    discovery: {
        question: 'A circus elephant in chains, a girl nobody sees — a story that takes the elephant out of the cage and gives it \'a permanent, definite human form.\' Why pair the two silences?',
        options: ['Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged', 'Circuses have both', 'To entertain children', 'Animals are sympathetic'],
        answer: 'Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged',
        hook: 'This is \'navlekhan\' — new writing — where the elephant isn\'t spectacle but witness, granted agency while humans look away. The Sanskrit-scholar author engineers words for emotional precision: the craft is the empathy.',
    },
    teaching: [
        { title: 'दूसरा देवदास — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन का अर्थ है पाठ को गहराई से पढ़कर उसके विषय, पात्र-चित्रण, साहित्यिक युक्तियों और संदेश का विश्लेषण करना, न कि केवल सतही समझ दिखाना।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_16_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the travelling circus as an anatomy of captivity: weigh the elephant\'s chain against the girl\'s silence, and test how experimental form carries feeling without breaking it.',
        labels: ['दूसरा देवदास — आलोचनात्मक', 'दूसरा देवदास — लेखन', 'दूसरा देवदास — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your uncle visits his widowed mother after years, hands over a cheque, and is back at the station by evening. She tells the family simply: \'I will stay here.\' Relatives declare the matter \'resolved — she\'s decided.\'',
            decisions: [{ prompt: 'How does the story\'s ending read her \'मैं यहीं रहूँगी\'?', options: [
                { text: 'As an open ending, not a resolution — her staying asserts agency but settles nothing between her and the son who offered money instead of himself; the family calling it \'resolved\' mistakes her decision for the conflict\'s settlement.', outcome: 'The chapter separates a character\'s decision from the story\'s closure: the son leaves, she stays, no reconciliation occurs — the sentence is her autonomy speaking, not peace made.' },
                { text: 'As closure — she made a choice, so the conflict between duty and autonomy is over.', outcome: 'That\'s the confusion the chapter names: a character\'s resolve isn\'t the same as resolved conflict — his money-versus-presence failure stands exactly as unanswered as before.', reveals: 'decision-equals-resolution' },
                { text: 'As surrender — she stayed because she had no other option left.', outcome: 'The flashbacks exist to prove the opposite: the house holds her whole married life and the son\'s childhood — her staying is chosen rootedness, and reading it as helplessness misses the agency the final line asserts.', reveals: 'staying-is-surrender' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'You can now read the circus as a freedom allegory — and see how one chained animal can indict every human arrangement around it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन का अर्थ है पाठ को गहराई से पढ़कर उसके विषय, पात्र-चित्रण.',
          hint: 'यदि विश्लेषण सतही लगे, तो c12_hin_a_cbse_16_004 पर वापस जाएं और देवीदास के प्रत्येक.',
          misconception: 'छात्र अक्सर देवीदास के चरित्र को केवल एक दुर्भाग्यपूर्ण प्रेमी मानते हैं और उसके आत्म-विनाश को प्रेम की विफलता से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन का अर्थ है पाठ को गहराई से पढ़कर उसके विषय, पात्र-चित्रण, साहित्यिक',
                  options: ['आलोचनात्मक चिंतन का अर्थ है पाठ को गहराई से पढ़कर उसके विषय, पात्र-चित्रण, साहित्यिक', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि विश्लेषण सतही लगे, तो c12_hin_a_cbse_16_004 पर वापस जाएं और देवीदास के प्रत्येक प्रमुख निर्णय.',
                  misconception: 'छात्र अक्सर देवीदास के चरित्र को केवल एक दुर्भाग्यपूर्ण प्रेमी मानते हैं और उसके आत्म-विनाश को प्रेम की विफलता से जोड़ते हैं, जबकि पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि देवीदास ने Parigi में क्यों नहीं रुका जब वह जानता था कि चंद्रमुखी उससे मिलने आई थी—इससे उसकी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct.',
          hint: 'If stuck on Evidence selection → revisit c12_hin_a_cbse_16_002 (plot) and 004/005.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "पाठ-आधारित उत्तर" = "पाठ का सारांश लिखना" या "पाठ से उद्धरण चिपकाना"। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct structured,',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based writing skill) is the ability to construct structured,', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'If stuck on Evidence selection → revisit c12_hin_a_cbse_16_002 (plot) and 004/005 (characters).',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि "पाठ-आधारित उत्तर" = "पाठ का सारांश लिखना" या "पाठ से उद्धरण चिपकाना"। वे **Evidence** और.' }
          ],
            remediations: { 'evidence-explanation': { steps: ['**चरण 1**: छात्र से कहें — "एक कमजोर उत्तर लिखो जो केवल कथ्य बताए।" (उदाहरण: "देवदास दुखी था क्योंकि पारो की शादी हो.', '— उन्हें लाल पेन से मार्क करो। **चरण 3**: अब उसी कथ्य को लेकर **मजबूत उत्तर सह-लिखो** — छात्र से Evidence चुनवाओ, तुम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_015', difficulty: 'standard',
          question: 'वाचन-श्रवण वह प्रक्रिया है जिसमें पाठ को उच्चरित करके सुना जाता है, उसके बाद.',
          hint: 'यदि फँसें तो Class 11 के किसी भी पाठ का वाचन-श्रवण अनुभव दोबारा करें — विशेष रूप से ध्यान.',
          misconception: 'छात्र अक्सर सोचते हैं कि वाचन-श्रवण में केवल \'सही\' पढ़ना मायने रखता है — अर्थात् उच्चारण की शुद्धता, गति, और आवाज़ की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण वह प्रक्रिया है जिसमें पाठ को उच्चरित करके सुना जाता है, उसके बाद चर्चा के',
                  options: ['वाचन-श्रवण वह प्रक्रिया है जिसमें पाठ को उच्चरित करके सुना जाता है, उसके बाद चर्चा के', '"दूसरा देवदास" मन्नू भंडारी द्वारा लिखित एक आधुनिक हिंदी कहानी है जो शरतचंद्र', 'कथानक (Plot) घटनाओं का तार्किक-कारणात्मक क्रम है जो कहानी बनाता है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश और वातावरण का अर्थ है रचना में चित्रित वह समग्र भौतिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसें तो Class 11 के किसी भी पाठ का वाचन-श्रवण अनुभव दोबारा करें — विशेष रूप से ध्यान दें कि.',
                  misconception: 'छात्र अक्सर सोचते हैं कि वाचन-श्रवण में केवल \'सही\' पढ़ना मायने रखता है — अर्थात् उच्चारण की शुद्धता, गति, और आवाज़ की स्पष्टता — जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस धारणा में फँसा है कि वाचन सिर्फ पढ़ने की तकनीक है, तो उसे इस प्रकार सुधारा जाए: सबसे पहले, उसे दो ऑडियो.', 'क्यों?" फिर उसे उसी पाठ को दोनों तरह से पढ़ने के लिए कहें और अपने अनुभव नोट करने को कहें। इस तुलनात्मक अभ्यास से उसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
