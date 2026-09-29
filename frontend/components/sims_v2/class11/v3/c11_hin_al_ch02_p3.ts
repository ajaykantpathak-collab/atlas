import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_al_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_al_ch02_p3: SimDef = {
    id: 'v3_c11_hin_al_ch02_p3',
    title: 'आवारा मसीहा · Part 3/3',
    subtitle: 'यह नोड \'आवारा मसीहा\' के पाठ-आधारित विश्लेषण (Textual Analysis) और व्याख्या.',
    classLevel: 11, subject: 'hin_al', topic: 'आवारा मसीहा · Part 3/3',
    chapters: ['c11_hin_al_ch02'],
    nodeIds: ['c11_hin_al_cbse_02_013', 'c11_hin_al_cbse_02_014', 'c11_hin_al_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: '\'आवारा मसीहा\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'आवारा मसीहा — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'आवारा मसीहा\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_al_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['आवारा मसीहा — आलोचनात्मक', 'आवारा मसीहा — लेखन', 'आवारा मसीहा — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_al_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'You finished आवारा मसीहा — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_013', difficulty: 'standard',
          question: '\'आवारा मसीहा\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'यदि फँस जाएँ तो **\'आवारा मसीहा — साहित्यिक युक्तियाँ: बिंब और रूपक\'.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में \'कमियाँ निकालना\' (Fault-finding) या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' का आलोचनात्मक चिंतन',
                  options: ['\'आवारा मसीहा\' का आलोचनात्मक चिंतन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **\'आवारा मसीहा — साहित्यिक युक्तियाँ: बिंब और रूपक\' (c11_hin_al_cbse_02_008)** और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'आलोचनात्मक चिंतन\' का अर्थ पाठ में \'कमियाँ निकालना\' (Fault-finding) या लेखक/पात्र की \'आलोचना करना\'.' }
          ],
            remediations: { 'fault-finding-criticizing-in-negative': { steps: ['**अवधारणा स्पष्टीकरण (2 मिनट):** छात्र को समझाएँ — "आलोचनात्मक चिंतन = जासूस की तरह सुराग (पाठगत साक्ष्य) जोड़कर रहस्य.', '**मॉडलिंग (5 मिनट):** एक छोटे प्रसंग (जैसे शरत्चंद्र का पहला उपन्यास छपना) लें और *दो* उत्तर लिखकर दिखाएँ: (अ).', '**निर्देशित अभ्यास (10 मिनट):** छात्र से एक प्रसंग चुनकर केवल *तीन* पाठगत साक्ष्य (बिंब/शब्द/वाक्य) निकालने को कहें.', '**स्वतंत्र अभ्यास:** गृहकार्य हेतु एक नया प्रसंग देकर वही प्रक्रिया (साक्ष्य → पैटर्न → व्याख्या) लिखने को दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_014', difficulty: 'standard',
          question: '\'आवारा मसीहा\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फँसें तो **c11_hin_al_cbse_02_013 (आलोचनात्मक चिंतन)** दोहराएँ — विशेषकर \'प्रमाण से.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है **पाठ का अनुवाद या सारांश** लिख देना। वे **PEEL.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' पर पाठ-आधारित लेखन',
                  options: ['\'आवारा मसीहा\' पर पाठ-आधारित लेखन', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c11_hin_al_cbse_02_013 (आलोचनात्मक चिंतन)** दोहराएँ — विशेषकर \'प्रमाण से व्याख्या.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "पाठ-आधारित उत्तर" का अर्थ है **पाठ का अनुवाद या सारांश** लिख देना। वे **PEEL के Explanation और.' }
          ],
            remediations: { 'peel-explanation-link-evidence-class': { steps: ['**पहचान कराएँ:** छात्र से कहें — "अपना लिखा उत्तर पढ़ो और बताओ: तुमने प्रश्न का **क्या** उत्तर दिया और **कैसे** दिया?".', '**PEEL रंगीन करें:** चार रंगों (P/E/E/L) से उनके उत्तर को हाइलाइट करवाएँ — जहाँ रंग न लगे, वहाँ चरण छूटा है। 3.', '**मॉडल दिखाएँ:** उसी प्रश्न का एक मॉडल PEEL उत्तर दें और तुलना करवाएँ। 4.', '**अभ्यास:** अगले तीन प्रश्नों में केवल **Explanation और Link** लिखने को कहें (Point और Evidence आप दें) — धीरे-धीरे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_02_015', difficulty: 'standard',
          question: '\'आवारा मसीहा\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_al_cbse_02_012 (बोध-प्रश्न)** के वस्तुनिष्ठ/आशय-सूचक.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **"पाठ से मनपसंद उद्धरण उठाकर अपने पूर्वाग्रह (bias).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आवारा मसीहा\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'आवारा मसीहा\' पर वाचन-श्रवण और चर्चा-बिंदु', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आवारा मसीहा\' का कथानक', '\'आवारा मसीहा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_al_cbse_02_012 (बोध-प्रश्न)** के वस्तुनिष्ठ/आशय-सूचक प्रश्नों को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'चर्चा-बिंदु\' का अर्थ है **"पाठ से मनपसंद उद्धरण उठाकर अपने पूर्वाग्रह (bias) को सही साबित करना"**।.' }
          ],
            remediations: { 'bias': { steps: ['**मॉडलिंग:** शिक्षक पाठ के **एक छोटे अंश** (2-3 पैरा) पर **दो विपरीत व्याख्याएँ** प्रस्तुत करे — एक \'चयनात्मक उद्धरण\'.', '**अभ्यास:** छात्रों को **\'लेखक vs पात्र\' पहचान तालिका** दें: कॉलम 1 में संवाद/कथन, कॉलम 2 में \'कौन बोल रहा है?\', कॉलम 3.', '**फीडबैक:** अगली चर्चा में शिक्षक **\'साक्ष्य की गुणवत्ता\' रूब्रिक** (प्रासंगिकता, पूर्णता, संदर्भ) का उपयोग करे और.', '**आत्म-मूल्यांकन:** छात्र अपनी चर्चा का **ऑडियो सुनकर** स्वयं चिह्नित करे: "मैंने कितनी बार \'मुझे लगता है\' के बजाय \'पाठ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
