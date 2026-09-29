import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch03_p3: SimDef = {
    id: 'v3_c12_hin_al_ch03_p3',
    title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 3/3',
    subtitle: 'The air was once sweet — then \'development\' arrived',
    classLevel: 12, subject: 'hin_al', topic: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में · Part 3/3',
    chapters: ['c12_hin_al_ch03'],
    nodeIds: ['c12_hin_al_cbse_03_013', 'c12_hin_al_cbse_03_014', 'c12_hin_al_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Ecological essayist', intro: 'A journalist returns to her Himalayan childhood and finds the air itself has changed. She files it as evidence.', goal: 'Read Apna Malwa as documented ecological witness — memory plus meteorological data against blind development.' },
    discovery: {
        question: 'A Kumaon village once breathed \'cold, sweet, fragrant air\'; now its springs are dry and its oaks gone. Shivani calls it \'the soil\'s incapacity\' — why not \'development\'s failure\'?',
        options: ['The reversal is the argument — the earth simply cannot regenerate water, air and life under the load we call progress; the limit is planetary, not moral', 'She\'s just being poetic', 'Soil got old', 'Development moved elsewhere'],
        answer: 'The reversal is the argument — the earth simply cannot regenerate water, air and life under the load we call progress; the limit is planetary, not moral',
        hook: 'This isn\'t nostalgia — it\'s evidence: 128 years of rainfall data, drought years defined, oak loss breaking the water cycle. Shivani was a rights-based journalist; her personal memory of mountain air is testimony in a case against ecologically blind development.',
    },
    teaching: [
        { title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'कंकाल में टमाटर की खेती\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand where the springs dried: read the rainfall record as indictment, follow oak loss to thermal shift to sensory death, and try on Shivani\'s inversion — development as the soil\'s incapacity.',
        labels: ['अपना मालवा-खाऊ-उजाड़ू सभ्यता में'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_013', title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'कंकाल में टमाटर की खेती\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'Define "critical analysis" in the context of studying a Hindi prose memoir like "कक्का और मटकमा में".', options: [
                { text: 'Critical analysis means breaking down the text\'s components', outcome: 'Critical analysis means breaking down the text\'s components — such as contrast, imagery, irony.' },
                { text: 'I think pollution is bad', outcome: 'Not quite — Students often believe critical analysis means expressing their personal opinion about the topic.', reveals: 'critical-analysis-means-expressing-their' },
                { text: 'interpretation', outcome: 'Not quite — Students often believe critical analysis means expressing their personal opinion about the topic.', reveals: 'critical-analysis-means-expressing-their' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_015', title: 'अपना मालवा-खाऊ-उजाड़ू सभ्यता में — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'कंकाल में टमाटर की खेती\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the central conflict presented in \'अपना देश\' that can serve as a discussion prompt for a class debate?', options: [
                { text: 'The central conflict is the tension between industrial/technological development', outcome: 'The central conflict is the tension between industrial/technological development (represented.' },
                { text: 'the author dislikes his hometown', outcome: 'Not quite — Students think "discussion points" means listing topics (e.g., "pollution, nostalgia.', reveals: 'discussion-points-means-listing-topics' },
                { text: 'discussion points', outcome: 'Not quite — Students think "discussion points" means listing topics (e.g., "pollution, nostalgia.', reveals: 'discussion-points-means-listing-topics' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Back in your hill hometown for a family wedding, you find the oak ridge replaced by a concrete parking strip and the spring your grandmother drew from now dry. A cousin shrugs: \'That\'s just nostalgia — the road and hotels are development.\'',
            decisions: [{ prompt: 'How would Shivani\'s framing in \'अपना मालवा\' answer him?', options: [
                { text: 'Invert his terms — what we call the technological capacity of development is the soil\'s incapacity; the dried spring isn\'t nostalgia\'s exaggeration but measurable evidence, like the 128-year rainfall record Shivani cites, that the land can no longer regenerate what the concrete took.', outcome: 'Shivani\'s chapter works as documented witness — sensory memory corroborated by data — so the reply isn\'t sentiment versus progress but a redefinition of what \'progress\' is costing the earth itself.' },
                { text: 'Agree with the cousin — fond memories of childhood air are subjective and can\'t argue against measurable growth.', outcome: 'Shivani pre-empts that dismissal by pairing memory with meteorological records; the nostalgia isn\'t sentimentality but observation that the data confirms — dismissing it as \'just feelings\' ignores the evidence.', reveals: 'nostalgia-is-not-evidence' },
                { text: 'Compromise — development is destructive but necessary, so mourn the spring and move on.', outcome: 'The chapter\'s point is sharper than trade-off talk: if \'development\' leaves the soil incapable of sustaining water, air and life, then the word is misapplied — accepting the cost as inevitable dodges the redefinition the text demands.', reveals: 'destruction-is-necessary-price' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue an environmental elegy with data, not just grief — and hear \'progress\' questioned by the land itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_013', difficulty: 'standard',
          question: '\'कंकाल में टमाटर की खेती\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, revisit the comprehension node (c12_hin_al_cbse_03_012) to ensure factual.',
          misconception: 'Students often believe critical analysis means expressing their personal opinion about the topic (e.g., "I think.',
          parts: [
                { id: 'a', prompt: 'Define "critical analysis" in the context of studying a Hindi prose memoir like "कक्का और मटकमा में". How does it differ from writing a summary?', answer: 'Critical analysis means breaking down the text\'s components',
                  options: ['Critical analysis means breaking down the text\'s components', 'I think pollution is bad', 'interpretation', 'reaction'],
                  hint: 'If stuck, revisit the comprehension node (c12_hin_al_cbse_03_012) to ensure factual clarity, then.',
                  misconception: 'Students often believe critical analysis means expressing their personal opinion about the topic (e.g., "I think pollution is bad") rather.' },
                { id: 'b', prompt: 'The author writes: "पहले के गाँव में नदी थी, हरियाली थी, पक्षी थे...', answer: 'The contrast does not just list differences',
                  options: ['The contrast does not just list differences', 'it shows the village changed', 'I think pollution is bad', 'interpretation'],
                  hint: 'If stuck, revisit the comprehension node (c12_hin_al_cbse_03_012) to ensure factual clarity, then.',
                  misconception: 'Students often believe critical analysis means expressing their personal opinion about the topic (e.g., "I think pollution is bad") rather.' }
          ],
            remediations: { 'critical-analysis-means-expressing-their': { steps: ['If a student conflates opinion with analysis: 1) Give them a single paragraph (e.g., the description of the dried.', '2) Ask: "Circle every adjective and verb the author uses.', 'Now, what *pattern* do you see?" (e.g., words of death: सूखा, मरा, खत्म, कंक्रीट).', '3) Ask: "If he wanted to just inform, he\'d say \'the river is dry.\' Why choose \'मरा हुआ\'?" 4) Guide them to write: "The.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe critical analysis means expressing their personal opinion about the topic (e.g., "I think.',
          parts: [
                { id: 'a', prompt: 'Write a 4-5 sentence paragraph from the perspective of the बांकस नदी (Bankas River) describing its own transformation from the author\'s childhood to the.', answer: 'A strong answer might read: "I was once the village\'s heartbeat',
                  options: ['A strong answer might read: "I was once the village\'s heartbeat', 'I think pollution is bad', 'interpretation', 'reaction'],
                  hint: 'If stuck, revisit the comprehension node (c12_hin_al_cbse_03_012) to ensure factual clarity, then.',
                  misconception: 'Students often believe critical analysis means expressing their personal opinion about the topic (e.g., "I think pollution is bad") rather.' }
          ],
            remediations: { 'critical-analysis-means-expressing-their': { steps: ['If a student conflates opinion with analysis: 1) Give them a single paragraph (e.g., the description of the dried.', '2) Ask: "Circle every adjective and verb the author uses.', 'Now, what *pattern* do you see?" (e.g., words of death: सूखा, मरा, खत्म, कंक्रीट).', '3) Ask: "If he wanted to just inform, he\'d say \'the river is dry.\' Why choose \'मरा हुआ\'?" 4) Guide them to write: "The.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_014', difficulty: 'standard',
          question: '\'कंकाल में टमाटर की खेती\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'यदि छात्र PEEL में Evidence और Explanation के बीच के अंतर को नहीं समझ पा रहा है, तो उसे.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में केवल उदाहरण दोहराना या पाठ से सीधी प्रतिलिपि बनाना पर्याप्त है, क्योंकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कंकाल में टमाटर की खेती\' पर पाठ-आधारित लेखन',
                  options: ['\'कंकाल में टमाटर की खेती\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'कंकाल में टमाटर की खेती\' का कथानक', '\'कंकाल में टमाटर की खेती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र PEEL में Evidence और Explanation के बीच के अंतर को नहीं समझ पा रहा है, तो उसे कक्षा 11 के.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में केवल उदाहरण दोहराना या पाठ से सीधी प्रतिलिपि बनाना पर्याप्त है, क्योंकि वे मानते हैं कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को सुधारने के लिए, छात्र को पहले एक कमजोर उत्तर (जैसे केवल उदाहरण देना) दिखाइए और पूछिए, "इस उत्तर में क्या कम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_03_015', difficulty: 'standard',
          question: '\'कंकाल में टमाटर की खेती\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, return to c12_hin_al_cbse_03_013 (Critical Thinking) and re-do the \'identify.',
          misconception: 'Students think "discussion points" means listing topics (e.g., "pollution, nostalgia, development").',
          parts: [
                { id: 'a', prompt: 'What is the central conflict presented in \'अपना देश\' that can serve as a discussion prompt for a class debate?', answer: 'The central conflict is the tension between industrial/technological development',
                  options: ['The central conflict is the tension between industrial/technological development', 'the author dislikes his hometown', 'discussion points', 'pollution, nostalgia, development'],
                  hint: 'If stuck, return to c12_hin_al_cbse_03_013 (Critical Thinking) and re-do the \'identify stakeholder.',
                  misconception: 'Students think "discussion points" means listing topics (e.g., "pollution, nostalgia, development").' },
                { id: 'b', prompt: 'Compare the author\'s description of Banksa\'s past (clean river, birds, cool breeze) with its present (polluted river, noise, heat).', answer: 'The before/after contrast functions as empirical evidence for the argument that',
                  options: ['The before/after contrast functions as empirical evidence for the argument that', 'It shows the author likes the past better', 'discussion points', 'pollution, nostalgia, development'],
                  hint: 'If stuck, return to c12_hin_al_cbse_03_013 (Critical Thinking) and re-do the \'identify stakeholder.',
                  misconception: 'Students think "discussion points" means listing topics (e.g., "pollution, nostalgia, development").' }
          ],
            remediations: { 'discussion-points-means-listing-topics': { steps: ['If a student produces topic-lists instead of discussion frames: (1) Have them pick ONE theme (e.g., \'river\'), (2) Find.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
