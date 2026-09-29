import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch05_p3: SimDef = {
    id: 'v3_c8_hin_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'यह नोड \'साँच बराबर तप नहीं (कबीर के दोहे)\' (मल्हार कक्षा 6, कबीर दास) के इस पहलू तक सीमित.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c8_hin_ch05'],
    nodeIds: ['c8_hin_cbse_05_013', 'c8_hin_cbse_05_014', 'c8_hin_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का विश्लेषण — कबीर दास ने कबीर की नीति — सत्य, विनम्रता, गुरु का महत्व.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का आलोचनात्मक चिंतन — कबीर दास का उद्देश्य, पाठ की सफलता, और प्रमाण-आधारित मूल्यांकन।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hin_cbse_05_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 5 · Part 3/3', spots: [
            { id: 's1', label: '5 -', prompt: 'Which idea is this? — लेखन-रचना-प्रस्तुति — 4-काम-किट.', answer: '5 -', options: ['5 -', '5 - -'] },
            { id: 's2', label: '5 - -', prompt: 'Which idea is this? — \'साँच बराबर तप नहीं (कबीर के दोहे)\' पर वाचन-श्रवण और चर्चा — कविता (दोहे) को सुनने, पढ़ने.', answer: '5 - -', options: ['5 - -', '5 -'] }
          ] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 5 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_013', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का आलोचनात्मक चिंतन — कबीर दास का उद्देश्य.',
          hint: 'Work step by step.',
          misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का आलोचनात्मक चिंतन',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' का आलोचनात्मक चिंतन', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र आलोचना को \'दोष निकालना\' मानते हैं — यह विश्लेषण है, प्रमाण-आधारित मूल्यांकन।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_014', difficulty: 'standard',
          question: 'लेखन-रचना-प्रस्तुति — 4-काम-किट.',
          hint: 'यदि अटका हुआ महसूस हो तो: कहानी-3 + नियम-5 + मोड-5 — 3-कहानी-परत, 5-दोहा-नियम.',
          misconception: 'छात्र कविता-पाठ को \'सबसे-आसान-मोड\' रखते हैं — कठिन-अर्थ: पाठ-सबसे-कठिन-आवाज़-अकेली-4-बीट-ढोती-विराम-बल-से-तराजू-तौलता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन-रचना-प्रस्तुति',
                  options: ['लेखन-रचना-प्रस्तुति', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'यदि अटका हुआ महसूस हो तो: कहानी-3 + नियम-5 + मोड-5 — 3-कहानी-परत, 5-दोहा-नियम, 5-प्रस्तुति-मोड; तीन.',
                  misconception: 'छात्र कविता-पाठ को \'सबसे-आसान-मोड\' रखते हैं — कठिन-अर्थ: पाठ-सबसे-कठिन-आवाज़-अकेली-4-बीट-ढोती-विराम-बल-से-तराजू-तौलता.' }
          ],
            remediations: { '4': { steps: ['**उपचार**: (1) कहानी-3 — तत्त्व-सेटअप-पेऑफ-3-परत-कहानी। (2) निबंध-3 — सवाल-फ्रेम-सबूत-3-परत-निबंध। (3) नियम-5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_015', difficulty: 'standard',
          question: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' पर वाचन-श्रवण और चर्चा — कविता (दोहे) को.',
          hint: 'Work step by step.',
          misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'साँच बराबर तप नहीं (कबीर के दोहे)\' पर वाचन-श्रवण और चर्चा',
                  options: ['\'साँच बराबर तप नहीं (कबीर के दोहे)\' पर वाचन-श्रवण और चर्चा', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पृष्ठभूमि और रचनाकार परिचय', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का कथानक/पाठ', '\'साँच बराबर तप नहीं (कबीर के दोहे)\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र चर्चा में केवल अपनी बात दोहराते हैं — चर्चा सुनने और प्रमाण देने का कौशल है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
