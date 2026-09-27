import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p3: SimDef = {
    id: 'v3_c12_hin_a_ch14_p3',
    title: 'शेर, पहचान, चार हाथ, साझा · Part 3/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'शेर, पहचान, चार हाथ, साझा · Part 3/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_013', 'c12_hin_a_cbse_14_014', 'c12_hin_a_cbse_14_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'शेर, पहचान, चार हाथ, साझा — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'पात्र-चित्रण का आलोचनात्मक विश्लेषण वह प्रक्रिया है जिसमें पाठ में आए पात्र के बाह्य और आंतरिक गुणों, उनके कार्यों, बातचीत, संबंधों और विकास का व्यवस्थित रूप से मूल्यांकन करके उनके चरित्र के गहरे.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['शेर, पहचान, चार हाथ,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_013', difficulty: 'standard',
          question: 'पात्र-चित्रण का आलोचनात्मक विश्लेषण वह प्रक्रिया है जिसमें पाठ में आए पात्र के.',
          hint: 'यदि फंसे हों तो पात्र के प्रत्येक उल्लेख को समय के क्रम में लिखिए और देखिए कि उनके.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई पात्र एक नायक है या मुख्य पात्र है, तो उसके सभी कार्यों को स्वचालित रूप से सही या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण का आलोचनात्मक विश्लेषण वह प्रक्रिया है जिसमें पाठ में आए पात्र के बाह्य और',
                  options: ['पात्र-चित्रण का आलोचनात्मक विश्लेषण वह प्रक्रिया है जिसमें पाठ में आए पात्र के बाह्य और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फंसे हों तो पात्र के प्रत्येक उल्लेख को समय के क्रम में लिखिए और देखिए कि उनके कार्यों या.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई पात्र एक नायक है या मुख्य पात्र है, तो उसके सभी कार्यों को स्वचालित रूप से सही या आदर्श मान लेना चाहिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि क्या वे वास्तविक जीवन में किसी ऐसे व्यक्ति को जानते हैं जो लोकप्रिय होने के बावजूद गलतियाँ करता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य या poesía) के आधार पर.',
          hint: 'यदि फंसे हुए हों तो पाठ-आधारित प्रश्नों के लिए साक्ष्य खोजने की technique को revisit करें.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि वे प्रश्न का उत्तर जानते हैं तो उन्हें पाठ से उदाहरण देने की आवश्यकता नहीं है — वे सोचते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य या poesía) के आधार पर प्रश्न के',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी दिए गए पाठ (गद्य या poesía) के आधार पर प्रश्न के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फंसे हुए हों तो पाठ-आधारित प्रश्नों के लिए साक्ष्य खोजने की technique को revisit करें.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि वे प्रश्न का उत्तर जानते हैं तो उन्हें पाठ से उदाहरण देने की आवश्यकता नहीं है — वे सोचते हैं कि "मुझे पता है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें कि वह अपना पिछला उत्तर ले और प्रत्येक वाक्य के लिए खुद से पूछे: "क्या मैंने इसे सिर्फ माना है या पाठ से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें छात्र पाठ को ध्यान से पढ़ते या.',
          hint: 'यदि छात्र चर्चा-बिंदुओं को घटनाओं से भ्रमित कर रहा है, तो उसे कथानक और पात्र-चित्रण के.',
          misconception: 'छात्र अक्सर चर्चा-बिंदुओं को कहानी के事实ात्मक घटनाओं (जैसे "शेर आया", "चार हाथ देखे", "वह चुप रहा") के रूप में याद करके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें छात्र पाठ को ध्यान से पढ़ते या सुनते हैं,',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु वह प्रक्रिया है जिसमें छात्र पाठ को ध्यान से पढ़ते या सुनते हैं,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र चर्चा-बिंदुओं को घटनाओं से भ्रमित कर रहा है, तो उसे कथानक और पात्र-चित्रण के नोड्स.',
                  misconception: 'छात्र अक्सर चर्चा-बिंदुओं को कहानी के事实ात्मक घटनाओं (जैसे "शेर आया", "चार हाथ देखे", "वह चुप रहा") के रूप में याद करके लिखते हैं, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले कहानी के तीन असामान्य या दोहराए गए विवरणों की पहचान करने के लिए कहें — जैसे "शेर", "चार हाथ", और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
