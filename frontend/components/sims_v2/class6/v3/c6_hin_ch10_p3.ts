import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch10_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch10_p3: SimDef = {
    id: 'v3_c6_hin_ch10_p3',
    title: 'पाठ 10 · Part 3/3',
    subtitle: 'इस नोड में पाठ के **विश्लेषण (Analysis) और व्याख्या (Interpretation) की प्रविधियाँ**.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 10 · Part 3/3',
    chapters: ['c6_hin_ch10'],
    nodeIds: ['c6_hin_cbse_10_013', 'c6_hin_cbse_10_014', 'c6_hin_cbse_10_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी कोई पहेली (जिगसॉ पज़ल) हल की है? पहले सारे टुकड़े बिखरे होते हैं, फिर तुम **किनारों वाले.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 10 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को केवल पढ़कर समझने तक सीमित न रखकर, उसके **गहरे अर्थ, लेखक के उद्देश्य, भाषा-शैली के प्रभाव और अंतर्निहित मान्यताओं** को तर्कसंगत ढंग से परखने और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_10_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 10 — आलोचनात्मक', 'पाठ 10 — लेखन', 'पाठ 10 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_10_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 10 · Part 3/3', spots: [
            { id: 's1', label: '10 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें से.', answer: '10 -', options: ['10 -', '10 - -'] },
            { id: 's2', label: '10 - -', prompt: 'Which idea is this? — \'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ, कविता या विषय को पढ़कर या सुनकर उस पर.', answer: '10 - -', options: ['10 - -', '10 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_10_015', title: 'You made it',
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
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को केवल पढ़कर समझने तक सीमित न.',
          hint: 'अगर अटके तो **c6_hin_cbse_10_008 (बिंब/रूपक)** और **c6_hin_cbse_10_009.',
          misconception: 'छात्र अक्सर समझते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'कमियाँ निकालना\' (Criticizing/Fault-finding) होता है**। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को केवल पढ़कर समझने तक सीमित न रखकर, उसके',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी पाठ को केवल पढ़कर समझने तक सीमित न रखकर, उसके', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'अगर अटके तो **c6_hin_cbse_10_008 (बिंब/रूपक)** और **c6_hin_cbse_10_009 (विरोधाभास/प्रतीक)** दोबारा.',
                  misconception: 'छात्र अक्सर समझते हैं कि **\'आलोचनात्मक चिंतन\' का अर्थ \'कमियाँ निकालना\' (Criticizing/Fault-finding) होता है**। उदाहरण: पढ़कर कहते हैं "कहानी.' }
          ],
            remediations: { 'criticizing-fault-finding': { steps: ['**चरण १:** छात्र के सामने एक **सरल कथन** रखो: *"आम मीठा होता है।"* पूछो: "क्या यह आलोचनात्मक कथन है?" (नहीं, यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें.',
          hint: 'अगर छात्र अटके, तो **c6_hin_cbse_10_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोहराएँ.',
          misconception: '**सबसे आम भ्रांति**: "अच्छा उत्तर लिखने का मतलब है **पाठ की अधिक से अधिक बातें याद करके लिख देना** (लंबा सारांश)।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें से',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है किसी पाठ (कहानी, कविता, निबंध) को पढ़कर, उसमें से', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'अगर छात्र अटके, तो **c6_hin_cbse_10_012 (बोध-प्रश्न)** के \'आशय-सूचक प्रश्न\' दोहराएँ — वहाँ सीखा.',
                  misconception: '**सबसे आम भ्रांति**: "अच्छा उत्तर लिखने का मतलब है **पाठ की अधिक से अधिक बातें याद करके लिख देना** (लंबा सारांश)।" **गलत तर्क**: छात्र.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को **दो नमूना उत्तर** दिखाओ — एक **सारांश-आधारित (कमज़ोर)**, एक **PEEL-आधारित (मजबूत)** — **उसी प्रश्न.', 'क्यों?" **चरण 2**: कमज़ोर उत्तर में **तीन रंगों से हाइलाइट** कराओ: (लाल) कहानी के प्रसंग जो प्रश्न से **सीधे नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_10_015', difficulty: 'standard',
          question: '\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ, कविता या विषय को पढ़कर या सुनकर.',
          hint: 'यदि अटके तो c6_hin_cbse_10_012 (बोध-प्रश्न) के \'आशय-सूचक प्रश्न\' दोहराएँ — वही साक्ष्य.',
          misconception: 'विद्यार्थी प्रायः समझते हैं कि \'चर्चा\' का अर्थ है **बारी-बारी से भाषण देना** (monologues in turn) — वे अपनी बात कहते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ, कविता या विषय को पढ़कर या सुनकर उस पर',
                  options: ['\'वाचन-श्रवण: चर्चा-बिंदु\' का अर्थ है किसी पाठ, कविता या विषय को पढ़कर या सुनकर उस पर', '**पृष्ठभूमि** से तात्पर्य उस ऐतिहासिक, सामाजिक, सांस्कृतिक और व्यक्तिगत परिवेश से है', 'कथानक (Plot) कहानी की घटनाओं का **कारण-प्रभाव (Cause-Effect) पर आधारित सुव्यवस्थित क्रम**', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके तो c6_hin_cbse_10_012 (बोध-प्रश्न) के \'आशय-सूचक प्रश्न\' दोहराएँ — वही साक्ष्य ढूँढने का.',
                  misconception: 'विद्यार्थी प्रायः समझते हैं कि \'चर्चा\' का अर्थ है **बारी-बारी से भाषण देना** (monologues in turn) — वे अपनी बात कहते हैं, अगले की सुनते.' }
          ],
            remediations: { 'monologues-in-turn': { steps: ['**मॉडलिंग**: शिक्षक दो विद्यार्थियों के साथ \'मछली-कटोरा\' (fishbowl) प्रदर्शन करे — एक सही चर्चा (सुनना, जोड़ना, प्रश्न.', '**संकेत कार्ड**: "मैं तुमसे सहमत हूँ क्योंकि...", "तुम्हारी बात से अलग मेरा विचार है...", "क्या तुम पाठ से उदाहरण दे.', '**चिंतन-लॉग**: चर्चा के बाद प्रत्येक विद्यार्थी लिखे: "मैंने किसकी बात से नया सीखा?" — इससे श्रवण की आदत बनेगी। 4.', '**शिक्षक की भूमिका**: बीच में न कूदें; मौन रहकर विद्यार्थियों को ही दिशा सुधारने दें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
