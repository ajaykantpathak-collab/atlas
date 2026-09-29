import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch10_p3: SimDef = {
    id: 'v3_c9_hin_ga_ch10_p3',
    title: 'पाठ 10 · Part 3/3',
    subtitle: 'यह नोड कक्षा 9 स्तर पर गद्य/पद्य के **पाठ-आधारित** आलोचनात्मक विश्लेषण तक सीमित है.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 10 · Part 3/3',
    chapters: ['c9_hin_ga_ch10'],
    nodeIds: ['c9_hin_ga_cbse_10_013', 'c9_hin_ga_cbse_10_014', 'c9_hin_ga_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'निराला के पद\' का विश्लेषण — सूर्यकांत त्रिपाठी निराला का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'निराला के पद\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — आलोचनात्मक', 'पाठ 10 — लेखन', 'पाठ 10 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_10_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 3/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — \'निराला के पद\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — \'निराला के पद\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_10_015', title: 'You made it',
          caseStudy: { intro: 'You finished पाठ 10 — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_013', difficulty: 'standard',
          question: '\'निराला के पद\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि फँसे हों तो **c9_hin_ga_cbse_10_012 (बोध-प्रश्न)** पर लौटें: पहले पाठ का \'क्या\'.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "आलोचनात्मक चिंतन = नकारात्मक आलोचना करना (Fault-finding)" या "अपनी राय देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'निराला के पद\' का आलोचनात्मक चिंतन',
                  options: ['\'निराला के पद\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'निराला के पद\' का कथानक', '\'निराला के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसे हों तो **c9_hin_ga_cbse_10_012 (बोध-प्रश्न)** पर लौटें: पहले पाठ का \'क्या\' (Content) पक्का.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "आलोचनात्मक चिंतन = नकारात्मक आलोचना करना (Fault-finding)" या "अपनी राय देना (Opinion)"। **गलत तर्क.' }
          ],
            remediations: { 'fault-finding-opinion': { steps: ['**शब्दकोश सुधार**: छात्र से \'आलोचना\' (दैनिक) और \'समालोचना/आलोचनात्मक चिंतन\' (अकादमिक) के दो वाक्य बनवाएँ; अंतर स्पष्ट.', '**माइक्रो-टास्क**: एक छोटा पैराग्राफ (3-4 वाक्य) दें जिसमें एक तर्क और एक दोष हो; छात्र से केवल दोष पहचानने को कहें.', '**साक्ष्य-खोज खेल**: पाठ 10 के किसी अंश से 3 दावे (Claims) लिखवाएँ; प्रत्येक के लिए छात्र से पाठ-आधारित 1 साक्ष्य और 1.', '**मेटाकॉग्निशन प्रॉम्प्ट**: "तुम्हें यह दावा क्यों सही लगा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_014', difficulty: 'standard',
          question: '\'निराला के पद\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि अटके: **Node 006 (मुख्य विषय)** और **Node 013 (आलोचनात्मक चिंतन)** दोबारा पढ़ें.',
          misconception: '**भ्रम:** *"अच्छा उत्तर = कठिन शब्द + लंबा पैराग्राफ + पाठ की अधिकाधिक बातें।"* **वास्तविकता:** बोर्ड परीक्षक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'निराला के पद\' पर पाठ-आधारित लेखन',
                  options: ['\'निराला के पद\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'निराला के पद\' का कथानक', '\'निराला के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **Node 006 (मुख्य विषय)** और **Node 013 (आलोचनात्मक चिंतन)** दोबारा पढ़ें — विषय स्पष्ट.',
                  misconception: '**भ्रम:** *"अच्छा उत्तर = कठिन शब्द + लंबा पैराग्राफ + पाठ की अधिकाधिक बातें।"* **वास्तविकता:** बोर्ड परीक्षक **\'सटीकता\' (Precision)**.' }
          ],
            remediations: { 'precision': { steps: ['**पहला कदम:** छात्र से कहें — *"प्रश्न को दो बार पढ़ो। पहले \'क्या पूछा गया\' (Task Word: विश्लेषण/तुलना/औचित्य) घेरो।.', '**दूसरा कदम:** **\'पाठ-खोज\' (Text Hunt)** कराएं — केवल वे 2-3 वाक्य/पंक्तियां खोजें जो **सीधे** फोकस से जुड़ती हों। शेष.', '**तीसरा कदम:** **PEEL टेम्पलेट** पर जबरन लिखवाएं — चार कॉलम बनाएं: Point | Quote/Ref | Analysis | Link Back। खाली न.', '**चौथा कदम:** **\'कमजोर vs मजबूत\' उत्तर** की तुलना कराएं — छात्र स्वयं अंतर पहचाने। **मंत्र:** *"लिखो कम, सोचो ज्यादा।"*'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_10_015', difficulty: 'standard',
          question: '\'निराला के पद\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि फँसें तो c9_hin_ga_cbse_10_013 (आलोचनात्मक चिंतन) के \'प्रमाण-आधारित व्याख्या\' खंड को.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'चर्चा में भाग लेना\' = \'कुछ भी बोल देना\' या \'कहानी दोहराना\'। वे **\'बिंदु\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'निराला के पद\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'निराला के पद\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'निराला के पद\' का कथानक', '\'निराला के पद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो c9_hin_ga_cbse_10_013 (आलोचनात्मक चिंतन) के \'प्रमाण-आधारित व्याख्या\' खंड को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी समझते हैं कि \'चर्चा में भाग लेना\' = \'कुछ भी बोल देना\' या \'कहानी दोहराना\'। वे **\'बिंदु\' (point)** और.' }
          ],
            remediations: { 'point-evidence-claim-evidence-reasoning': { steps: ['**मॉडलिंग दिखाएँ:** शिक्षक एक छोटे पाठांश पर स्वयं चर्चा-बिंदु बनाएँ — बोर्ड पर लिखें: दावा → प्रमाण (उद्धरण) →.', '**निर्देशित अभ्यास:** विद्यार्थियों को जोड़े में दें — एक पाठांश, एक बिंदु। वे **संयुक्त रूप से** चारों चरण लिखें।.', 'क्या व्याख्या दावे से जुड़ी है?', '**फीडबैक लूप:** प्रत्येक जोड़े का एक नमूना बोर्ड पर लिखवाएँ — कक्षा मिलकर पहचाने: बल/कमजोरी। फिर विद्यार्थी अपने नोट्स.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
