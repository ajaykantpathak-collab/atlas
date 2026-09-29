import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p3',
    title: 'काले मेघा पानी दे · Part 3/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'काले मेघा पानी दे · Part 3/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_013', 'c12_hin_ar_cbse_12_014', 'c12_hin_ar_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'काले मेघा पानी दे — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'डाकिया के खत\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['काले मेघा पानी दे'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_015', title: 'काले मेघा पानी दे — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'डाकिया के खत\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What are the three core discussion themes explicitly listed in the textbook\'s vH;kl (exercise) section for "dkys es?kk ikuh ns"?', options: [
                { text: 'The three core discussion themes are: (1) Social hypocrisy and performative charity', outcome: 'The three core discussion themes are: (1) Social hypocrisy and performative charity (vaèkfo\'okl).' },
                { text: 'poverty', outcome: 'Not quite — Students treat "Speaking and Listening" as reading aloud the written answers from nodes 012-014.', reveals: 'students-treat-speaking-and-listening' },
                { text: 'water scarcity', outcome: 'Not quite — Students treat "Speaking and Listening" as reading aloud the written answers from nodes 012-014.', reveals: 'students-treat-speaking-and-listening' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_013', difficulty: 'standard',
          question: '\'डाकिया के खत\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck, return to node 012 (Comprehension) and re-read the text with a two-column.',
          misconception: 'Students conflate "critical interpretation" with "expressing a personal opinion about the characters." They write: "I.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' का आलोचनात्मक चिंतन',
                  options: ['\'डाकिया के खत\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to node 012 (Comprehension) and re-read the text with a two-column notebook.',
                  misconception: 'Students conflate "critical interpretation" with "expressing a personal opinion about the characters." They write: "I think the narrator.' }
          ],
            remediations: { 'students-conflate-critical-interpretation-with': { steps: ['If a student cannot move beyond personal opinion: 1.', '**Model the shift**: Take their opinion ("Narrator is bad") and rewrite it as a claim about the text: "The author.', '**Color-code a paragraph**: Highlight textual evidence (yellow), analytical verbs (green: "exposes", "undermines".', 'Show that analysis = evidence + verb + claim.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "critical interpretation" with "expressing a personal opinion about the characters." They write: "I.',
          parts: [
                { id: 'a', prompt: 'Evaluate the narrator\'s final act of rebellion (refusing to give water to the Banjaras *on their terms* but later providing it differently).', answer: 'It is a *conditional* redemption, not a full one',
                  options: ['It is a *conditional* redemption, not a full one', 'complete redemption', 'pure performance'],
                  hint: 'If stuck, return to node 012 (Comprehension) and re-read the text with a two-column notebook.',
                  misconception: 'Students conflate "critical interpretation" with "expressing a personal opinion about the characters." They write: "I think the narrator.' }
          ],
            remediations: { 'students-conflate-critical-interpretation-with': { steps: ['If a student cannot move beyond personal opinion: 1.', '**Model the shift**: Take their opinion ("Narrator is bad") and rewrite it as a claim about the text: "The author.', '**Color-code a paragraph**: Highlight textual evidence (yellow), analytical verbs (green: "exposes", "undermines".', 'Show that analysis = evidence + verb + claim.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_014', difficulty: 'standard',
          question: '\'डाकिया के खत\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि PEEL संरचना याद न रहे तो c11_hin_ar_cbse_01_014 के कार्यित उदाहरण (Worked Examples).',
          misconception: 'छात्र मानते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का सारांश लिखना या पात्रों का वर्णन करना। वास्तव में बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' पर पाठ-आधारित लेखन',
                  options: ['\'डाकिया के खत\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि PEEL संरचना याद न रहे तो c11_hin_ar_cbse_01_014 के कार्यित उदाहरण (Worked Examples) दोबारा.',
                  misconception: 'छात्र मानते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का सारांश लिखना या पात्रों का वर्णन करना। वास्तव में बोर्ड परीक्षा में हर प्रश्न एक.' }
          ],
            remediations: { 'theme': { steps: ['चरण 1: छात्र से कहें कि वह पिछले बोर्ड पेपर का कोई 5-अंकीय प्रश्न ले और उसका अपना लिखा उत्तर सामने रखे। चरण 2: साथ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_015', difficulty: 'standard',
          question: '\'डाकिया के खत\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'If stuck on oral fluency: return to node 010 (vocabulary: vaèkfo\'okl, cqokbZ, xqM+èkkuh.',
          misconception: 'Students treat "Speaking and Listening" as reading aloud the written answers from nodes 012-014.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'डाकिया के खत\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on oral fluency: return to node 010 (vocabulary: vaèkfo\'okl, cqokbZ, xqM+èkkuh, ikuh) and.',
                  misconception: 'Students treat "Speaking and Listening" as reading aloud the written answers from nodes 012-014.' }
          ],
            remediations: { 'students-treat-speaking-and-listening': { steps: ['If a student recites written answers in mock ASL: (1) Stop them at 30 seconds.', '(2) Play back their recording — ask: "Where did you take a breath?', 'Where did you look at your imaginary peer?" (3) Give them the PEEL Speaking Card: P=Point (1 sentence), E=Evidence (1.', '(4) Practice with a timer: 45 sec prep → 2 min speak → 30 sec peer response.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
