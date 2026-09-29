import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch08_p1: SimDef = {
    id: 'v3_c6_hin_ch08_p1',
    title: 'पाठ 8 · Part 1/3',
    subtitle: 'यह नोड \'एंजेला\' (मल्हार कक्षा 6, (विदेशी कथा-अनुवाद)) के इस पहलू तक सीमित है — वास्तविक.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 8 · Part 1/3',
    chapters: ['c6_hin_ch08'],
    nodeIds: ['c6_hin_cbse_08_001', 'c6_hin_cbse_08_002', 'c6_hin_cbse_08_003', 'c6_hin_cbse_08_004', 'c6_hin_cbse_08_005', 'c6_hin_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'पहले रचनाकार: (विदेशी कथा-अनुवाद)। फिर काल और परिवेश। फिर \'एंजेला\' का विषय — बच्चों की कल्पना-दुनिया और.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 8 — पृष्ठभूमि और रचनाकार परिचय', text: '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय — (विदेशी कथा-अनुवाद) द्वारा रचित कहानी। रचनाकार का जीवन, काल और साहित्यिक संदर्भ पाठ की व्याख्या की कुंजी है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 8 — पृष्ठभूमि', 'पाठ 8 — कथानक', 'पाठ 8 — पाठ्य-परिवेश', 'पाठ 8 — पात्र-चित्रण', 'पाठ 8 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 8 · Part 1/3', spots: [
            { id: 's1', label: '8 -', prompt: 'Which idea is this? — \'एंजेला\' का कथानक/पाठ — लंदन की एंजेला दोस्तों के साथ काल्पनिक खेल खेलती है — ताजमहल.', answer: '8 -', options: ['8 -', '8 -'] },
            { id: 's2', label: '8 -', prompt: 'Which idea is this? — \'एंजेला\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में घटित है।', answer: '8 -', options: ['8 -', '8 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 8 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 8 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 8 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_001', difficulty: 'standard',
          question: '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय — (विदेशी कथा-अनुवाद) द्वारा रचित कहानी।.',
          hint: 'Work step by step.',
          misconception: 'छात्र \'एंजेला\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय',
                  options: ['\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय', '\'एंजेला\' का कथानक/पाठ', '\'एंजेला\' का पाठ्य-परिवेश', '\'एंजेला\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र \'एंजेला\' को बिना कवि-परिचय के पढ़ते हैं — रचनाकार का संदर्भ ही पाठ के इरादे को खोलता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_002', difficulty: 'standard',
          question: '\'एंजेला\' का कथानक/पाठ — लंदन की एंजेला दोस्तों के साथ काल्पनिक खेल खेलती है.',
          hint: 'Work step by step.',
          misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'एंजेला\' में क्रम ही भाव बनाता है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एंजेला\' का कथानक/पाठ',
                  options: ['\'एंजेला\' का कथानक/पाठ', '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय', '\'एंजेला\' का पाठ्य-परिवेश', '\'एंजेला\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र कथानक को केवल घटना-क्रम मानते हैं — \'एंजेला\' में क्रम ही भाव बनाता है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_003', difficulty: 'standard',
          question: '\'एंजेला\' का पाठ्य-परिवेश — कहानी किस स्थान, समय और वातावरण में घटित है।',
          hint: 'Work step by step.',
          misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एंजेला\' का पाठ्य-परिवेश',
                  options: ['\'एंजेला\' का पाठ्य-परिवेश', '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय', '\'एंजेला\' का कथानक/पाठ', '\'एंजेला\' का पात्र/केंद्रीय विचार'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र परिवेश को \'पीछे की सजावट\' मानते हैं — परिवेश पाठ के भाव का हिस्सा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_004', difficulty: 'standard',
          question: '\'एंजेला\' का पात्र/केंद्रीय विचार — एंजेला मुख्य पात्र/अवधारणा है, जिसके माध्यम.',
          hint: 'Work step by step.',
          misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'एंजेला\' में एंजेला पाठ की आत्मा है।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एंजेला\' का पात्र/केंद्रीय विचार',
                  options: ['\'एंजेला\' का पात्र/केंद्रीय विचार', '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय', '\'एंजेला\' का कथानक/पाठ', '\'एंजेला\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र मुख्य पात्र को केवल \'किरदार\' मानते हैं — \'एंजेला\' में एंजेला पाठ की आत्मा है।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_005', difficulty: 'standard',
          question: '\'एंजेला\' के सहायक पात्र/तत्व — जेम्स, कीरा मुख्य के साथ रहकर पाठ को आगे बढ़ाते.',
          hint: 'Work step by step.',
          misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एंजेला\' के सहायक पात्र/तत्व',
                  options: ['\'एंजेला\' के सहायक पात्र/तत्व', '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय', '\'एंजेला\' का कथानक/पाठ', '\'एंजेला\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र सहायक पात्र को \'कमज़ोर\' मानते हैं — वे मुख्य पात्र के शक्ति-दर्पण हैं।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_08_006', difficulty: 'standard',
          question: '\'एंजेला\' का मुख्य विषय — बच्चों की कल्पना-दुनिया और विदेशी जीवन — एंजेला की.',
          hint: 'Work step by step.',
          misconception: 'छात्र विषय को कथानक मान लेते हैं — \'एंजेला\' की घटनाएँ कथानक हैं, बच्चों की कल्पना-दुनिया और विदेशी जीवन विषय।',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'एंजेला\' का मुख्य विषय',
                  options: ['\'एंजेला\' का मुख्य विषय', '\'एंजेला\' का पृष्ठभूमि और रचनाकार परिचय', '\'एंजेला\' का कथानक/पाठ', '\'एंजेला\' का पाठ्य-परिवेश'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र विषय को कथानक मान लेते हैं — \'एंजेला\' की घटनाएँ कथानक हैं, बच्चों की कल्पना-दुनिया और विदेशी जीवन विषय।' }
          ],
            remediations: { 'wrong-idea': { steps: ['**उपचार**: (1) संबंधित पंक्ति/घटना दोबारा पढ़वाओ। (2) शब्द-अर्थ मिलकर निकालो। (3) भाव अपने शब्दों में बुलवाओ। (4).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
