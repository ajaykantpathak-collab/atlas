import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch28_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch28_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch28_p3',
    title: 'पतझड़ में टूटी पत्तयिाँ · Part 3/3',
    subtitle: 'यह नोड \'पतझड़ में टूटी पत्तियाँ\' कहानी के गहन विश्लेषण पर केंद्रित है — कथानक संरचना.',
    classLevel: 10, subject: 'hin_sp', topic: 'पतझड़ में टूटी पत्तयिाँ · Part 3/3',
    chapters: ['c10_hin_sp_ch28'],
    nodeIds: ['c10_hin_sp_cbse_28_013', 'c10_hin_sp_cbse_28_014', 'c10_hin_sp_cbse_28_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'पतझड़ में टूटी पत्तियाँ\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पतझड़ में टूटी पत्तयिाँ — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'पतझड़ में टूटी पत्तियाँ\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_28_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पतझड़ में टूटी पत्तयिाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_28_015', title: 'You made it',
          caseStudy: { intro: 'You finished पतझड़ में टूटी पत्तयिाँ — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_013', difficulty: 'standard',
          question: '\'पतझड़ में टूटी पत्तियाँ\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'अगर अटक जाएँ तो c10_hin_sp_cbse_28_008 (बिंब/प्रतीक) और c10_hin_sp_cbse_28_009.',
          misconception: 'विशिष्ट भ्रांति: छात्र \'आलोचनात्मक विश्लेषण\' को \'कहानी की कमियाँ निकालना\' या \'लेखक से असहमति जताना\' समझते हैं। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पतझड़ में टूटी पत्तियाँ\' का आलोचनात्मक चिंतन',
                  options: ['\'पतझड़ में टूटी पत्तियाँ\' का आलोचनात्मक चिंतन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रामवृक्ष बेनीपुरी का परिचय (ग्रामीण बिहार-जन्मे', '\'पतझड़ में टूटी पत्तियाँ\' का कथानक', '\'पतझड़ में टूटी पत्तियाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटक जाएँ तो c10_hin_sp_cbse_28_008 (बिंब/प्रतीक) और c10_hin_sp_cbse_28_009 (विरोधाभास/फ्लैशबैक).',
                  misconception: 'विशिष्ट भ्रांति: छात्र \'आलोचनात्मक विश्लेषण\' को \'कहानी की कमियाँ निकालना\' या \'लेखक से असहमति जताना\' समझते हैं। उदाहरण: "लेखक ने माँ का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "आलोचना का अर्थ \'दोष ढूँढना\' नहीं, \'डिज़ाइन समझना\' है। जैसे वास्तुकार घर की ड्राइंग देखता है.', 'वैसे ही हम कहानी की \'ड्राइंग\' देखेंगे।" चरण 2: एक छोटा अंश दें (कहानी के पहले पैराग्राफ जैसा) और पूछें: "लेखक ने यहाँ.', 'अगर \'धूप\', \'चहल-पहल\', \'गर्मी\' होते तो कहानी कैसे बदल जाती?" — यह \'चुनाव की पड़ताल\' सिखाता है। चरण 3: फिर पूछें: "बेटे.', 'क्या यह चुनाव समाज की किसी प्रवृत्ति को उजागर करता है?" — इससे \'चरित्र-चित्रण\' से \'सामाजिक प्रतीक\' तक की यात्रा होती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_014', difficulty: 'standard',
          question: '\'पतझड़ में टूटी पत्तियाँ\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की.',
          hint: 'यदि फंसें तो c10_hin_sp_cbse_28_004 (नायक चरित्र-चित्रण), c10_hin_sp_cbse_28_006 (मुख्य.',
          misconception: 'छात्र समझते हैं कि \'पाठ-आधारित उत्तर\' का अर्थ है पाठ की कहानी अपने शब्दों में दोहरा देना (Summary writing)। वे PEEL के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पतझड़ में टूटी पत्तियाँ\' पर पाठ-आधारित लेखन',
                  options: ['\'पतझड़ में टूटी पत्तियाँ\' पर पाठ-आधारित लेखन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रामवृक्ष बेनीपुरी का परिचय (ग्रामीण बिहार-जन्मे', '\'पतझड़ में टूटी पत्तियाँ\' का कथानक', '\'पतझड़ में टूटी पत्तियाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो c10_hin_sp_cbse_28_004 (नायक चरित्र-चित्रण), c10_hin_sp_cbse_28_006 (मुख्य विषय), और.',
                  misconception: 'छात्र समझते हैं कि \'पाठ-आधारित उत्तर\' का अर्थ है पाठ की कहानी अपने शब्दों में दोहरा देना (Summary writing)। वे PEEL के \'Explanation\' और.' }
          ],
            remediations: { 'summary-writing-peel-explanation-link': { steps: ['चरण 1: छात्र से एक कमजोर उत्तर (केवल घटनाओं वाला) और एक मजबूत उत्तर (PEEL वाला) साथ रखकर पढ़वाएं और पूछें: "कौन सा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_015', difficulty: 'standard',
          question: '\'पतझड़ में टूटी पत्तियाँ\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_28_004 (पात्र-चित्रण)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' पर बोलने/लिखने के लिए **\'सही उत्तर\' (right answer)** होना ज़रूरी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पतझड़ में टूटी पत्तियाँ\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'पतझड़ में टूटी पत्तियाँ\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = रामवृक्ष बेनीपुरी का परिचय (ग्रामीण बिहार-जन्मे', '\'पतझड़ में टूटी पत्तियाँ\' का कथानक', '\'पतझड़ में टूटी पत्तियाँ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_28_004 (पात्र-चित्रण)** और **c10_hin_sp_cbse_28_006.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' पर बोलने/लिखने के लिए **\'सही उत्तर\' (right answer)** होना ज़रूरी है — जैसे गणित में.' }
          ],
            remediations: { 'right-answer-2-2-4': { steps: ['**चरण 1:** छात्र को समझाएँ कि चर्चा-बिंदु = **\'खुला प्रश्न\' (open-ended question)** जिसका एक नहीं, अनेक वैध उत्तर हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
