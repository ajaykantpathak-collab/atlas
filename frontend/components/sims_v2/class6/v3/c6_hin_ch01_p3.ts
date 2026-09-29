import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch01_p3: SimDef = {
    id: 'v3_c6_hin_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'यह नोड केवल आलोचनात्मक चिंतन तक सीमित है — लेखन/चर्चा अगले नोड्स में।',
    classLevel: 6, subject: 'hin', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c6_hin_ch01'],
    nodeIds: ['c6_hin_cbse_01_013', 'c6_hin_cbse_01_014', 'c6_hin_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: '**तुम्हारे लिए:** अब आलोचक बनो — एक शक्ति और एक सीमा, दोनों पंक्ति-प्रमाण से। **पुनःस्मरण:** नोड 6 से — मुख्य.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन: कविता सफल है क्योंकि कवि भूगोल (हिमालय-सिंधु-गंगा) को भावना (मातृभूमि) में ढालता है; \'वह ...', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — लेखन-कौशल: कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव); अपने क्षेत्र का वर्णन.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — वाचन-श्रवण और चर्चा: कविता को लय में वाचन; पुस्तक की गतिविधि \'मिलकर करें मिलान\'.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 1 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन: कविता सफल है क्योंकि कवि भूगोल (हिमालय-सिंधु-गंगा) को भावना.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति जो आपको अच्छी लगी (शक्ति) और एक जो ज्यादा लगी (सीमा).',
          misconception: '1. छात्र \'आलोचना\' को \'केवल बुराई\' मानते हैं — आलोचना = शक्ति + सीमा, दोनों; केवल निन्दा नहीं। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन: कविता सफल है क्योंकि कवि भूगोल (हिमालय-सिंधु-गंगा) को भावना (मातृभूमि)',
                  options: ['आलोचनात्मक चिंतन: कविता सफल है क्योंकि कवि भूगोल (हिमालय-सिंधु-गंगा) को भावना (मातृभूमि)', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति जो आपको अच्छी लगी (शक्ति) और एक जो ज्यादा लगी (सीमा) — दोनों.',
                  misconception: '1. छात्र \'आलोचना\' को \'केवल बुराई\' मानते हैं — आलोचना = शक्ति + सीमा, दोनों; केवल निन्दा नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) \'आलोचना\' का अर्थ समझाओ — शक्ति + सीमा, केवल कमी नहीं। (2) एक पंक्ति से शक्ति, एक से सीमा खोजो। (3) तर्क.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_014', difficulty: 'standard',
          question: 'लेखन-कौशल: कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव); अपने.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति चुनिए, उसके 3 शब्दों का अर्थ लिखिए, फिर वाक्य बनाइए.',
          misconception: '1. छात्र भावार्थ लिखते समय पंक्ति दोहरा देते हैं — भावार्थ = शब्द-अर्थ + भाव + अपना वाक्य; केवल उद्धरण नहीं। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-कौशल: कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव)',
                  options: ['लेखन-कौशल: कविता की किसी पंक्ति का भावार्थ लिखना (शब्द-अर्थ + भाव)', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति चुनिए, उसके 3 शब्दों का अर्थ लिखिए, फिर वाक्य बनाइए — भावार्थ.',
                  misconception: '1. छात्र भावार्थ लिखते समय पंक्ति दोहरा देते हैं — भावार्थ = शब्द-अर्थ + भाव + अपना वाक्य; केवल उद्धरण नहीं। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) भावार्थ-विधि समझाओ — शब्द→अर्थ→भाव→उदाहरण। (2) एक पंक्ति का भावार्थ साथ लिखो। (3) अपने क्षेत्र के दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_01_015', difficulty: 'standard',
          question: 'वाचन-श्रवण और चर्चा: कविता को लय में वाचन; पुस्तक की गतिविधि \'मिलकर करें मिलान\'.',
          hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, ताली से लय बजाइए, फिर उसका भाव बोलिए — चर्चा.',
          misconception: '1. छात्र \'वंदे मातरम्\' को \'इसी कविता का हिस्सा\' मानते हैं — बंकिमचंद्र की अलग रचना है; तुलना-पाठ, न कि उद्धरण। 2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण और चर्चा: कविता को लय में वाचन; पुस्तक की गतिविधि \'मिलकर करें मिलान\'',
                  options: ['वाचन-श्रवण और चर्चा: कविता को लय में वाचन; पुस्तक की गतिविधि \'मिलकर करें मिलान\'', 'सोहनलाल द्विवेदी (1906–1988)', 'कविता का पाठ — छह छंद-खंड: (1) हिमालय आकाश चूमता, नीचे सिंधु (महासागर) झूमता', 'काव्य-परिवेश और छंद-रूप'],
                  hint: 'यदि अटका हुआ महसूस हो तो: एक पंक्ति पढ़िए, ताली से लय बजाइए, फिर उसका भाव बोलिए — चर्चा की शुरुआत।',
                  misconception: '1. छात्र \'वंदे मातरम्\' को \'इसी कविता का हिस्सा\' मानते हैं — बंकिमचंद्र की अलग रचना है; तुलना-पाठ, न कि उद्धरण। 2.' }
          ],
            remediations: { '1': { steps: ['**उपचार**: (1) चर्चा-नियम समझाओ — सुनो, प्रमाण दो, सम्मान करो। (2) \'कोयल पुकार\' पर तीन संभावनाएँ लिखवाओ। (3) \'वंदे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
