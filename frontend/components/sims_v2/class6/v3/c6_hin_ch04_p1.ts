import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch04_p1: SimDef = {
    id: 'v3_c6_hin_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'यह नोड केवल रचनाकार के जीवन परिचय, उनकी प्रमुख रचनाएँ, साहित्यिक शैली तथा रचना-काल की.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c6_hin_ch04'],
    nodeIds: ['c6_hin_cbse_04_001', 'c6_hin_cbse_04_002', 'c6_hin_cbse_04_003', 'c6_hin_cbse_04_004', 'c6_hin_cbse_04_005', 'c6_hin_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुम्हें एक पुराना पत्र मिला है जिस पर पता नहीं लिखा — तुम सबसे पहले क्या करोगे?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ (Context) समझना तथा रचनाकार के जीवन, विचारधारा एवं साहित्यिक योगदान को जानना ताकि रचना के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 1/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य.', answer: '4 -', options: ['4 -', '4 -'] },
            { id: 's2', label: '4 -', prompt: 'Which idea is this? — पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक).', answer: '4 -', options: ['4 -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 4 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक.',
          hint: 'यदि अटका हुआ महसूस हो तो \'कहानी का केंद्रीय भाव कैसे निकालें\' (कक्षा 5 का कौशल) दोहराएँ.',
          misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है **लेखक की जन्म-तिथि, मृत्यु-तिथि, शिक्षा, पुरस्कार और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'कहानी का केंद्रीय भाव कैसे निकालें\' (कक्षा 5 का कौशल) दोहराएँ और फिर.',
                  misconception: 'छात्र समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है **लेखक की जन्म-तिथि, मृत्यु-तिथि, शिक्षा, पुरस्कार और प्रसिद्ध पुस्तकों की सूची.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहो — "पाठ का शीर्षक देखो और अनुमान लगाओ: इस कहानी में कौन-सी सामाजिक समस्या होगी?" 2.', '**दूसरा कदम:** अब रचनाकार परिचय पढ़ो और **केवल उन्हीं वाक्यों को रेखांकित करो** जो उस अनुमानित समस्या से जुड़ते हों। 3.', '**तीसरा कदम:** पूछो — "अगर यह वाक्य न होता, तो क्या तुम पाठ को उतनी गहराई से समझ पाते?" 4.', '**चौथा कदम:** इस अभ्यास को 2-3 पाठों पर दोहराओ; छात्र स्वयं सीख जाएगा कि परिचय \'स्मृति-परीक्षा\' नहीं, \'पाठ-प्रवेश की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_002', difficulty: 'standard',
          question: 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को.',
          hint: 'यदि छात्र शुरू भाग की पहचान करने में कठिनाई महसूस कर रहा है, तो उसे "कहानी की पृष्ठभूमि.',
          misconception: 'छात्र अक्सर मानते हैं कि कहानी का मध्य भाग केवल तभी होता है जब कोई बड़ा एक्शन या घटना हो, जैसे युद्ध या भाग-दौड़, बिना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य',
                  options: ['कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि छात्र शुरू भाग की पहचान करने में कठिनाई महसूस कर रहा है, तो उसे "कहानी की पृष्ठभूमि और रचनाकार.',
                  misconception: 'छात्र अक्सर मानते हैं कि कहानी का मध्य भाग केवल तभी होता है जब कोई बड़ा एक्शन या घटना हो, जैसे युद्ध या भाग-दौड़, बिना यह समझे कि मध्य भाग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र मध्य भाग को केवल एक्शन से जोड़ता है, तो उसे तीन सरल कहानियाँ दीजिए: 1.', 'एक कहानी जहाँ मध्य में एक पात्र किसी वाद्य यंत्र बजाने में विफल रहता है (शांतिपूर्ण लेकिन frustating)। 2.', 'एक कहानी जहाँ मध्य में एक बच्चा झूठ बोलने के डर से चुप रहता है (मनोवैज्ञानिक तनाव)। 3.', 'एक कहानी जहाँ मध्य में एक जानवर अपने बिल्ले को खोजने में असफल रहता है (खोज की विफलता)। फिर पूछिए: "इनमें से प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान.',
          hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_04_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेषकर यह.',
          misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को स्थैतिक \'पृष्ठभूमि\' (Backdrop) मान लेते हैं — जैसे दीवार पर टँगा चित्र — और यह नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),',
                  options: ['पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_04_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेषकर यह देखें कि.',
                  misconception: 'छात्र प्रायः \'परिवेश\' (Setting) को स्थैतिक \'पृष्ठभूमि\' (Backdrop) मान लेते हैं — जैसे दीवार पर टँगा चित्र — और यह नहीं देख पाते कि परिवेश.' }
          ],
            remediations: { 'setting-backdrop': { steps: ['छात्र को एक परिचित दृश्य (स्कूल की प्रार्थना सभा / बाज़ार की सुबह) चुनने को कहो। 2.', 'उससे कहो: \'आँख बंद करो और बताओ — क्या दिखता है?', 'त्वचा पर क्या महसूस होता है?', 'मन में कौन-सा भाव उठता है?\' — ये पाँचों इंद्रियाँ + मनोभाव = परिवेश के प्रमाण। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के प्रमुख.',
          hint: 'अगर छात्र अटका हो तो **कथानक-घटना चार्ट (c6_hin_cbse_04_002)** पर वापस जाएँ और.',
          misconception: '**भ्रांति**: "पात्र-चित्रण = विशेषणों की लंबी सूची + कहानी का सारांश।" **वास्तविक गलत तर्क**: छात्र सोचते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)',
                  options: ['पात्र-चित्रण (Character Sketch) वह साहित्यिक कौशल है जिसमें कहानी के प्रमुख पात्र (नायक)', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'अगर छात्र अटका हो तो **कथानक-घटना चार्ट (c6_hin_cbse_04_002)** पर वापस जाएँ और नायक-केंद्रित घटनाएँ.',
                  misconception: '**भ्रांति**: "पात्र-चित्रण = विशेषणों की लंबी सूची + कहानी का सारांश।" **वास्तविक गलत तर्क**: छात्र सोचते हैं कि "बहादुर, ईमानदार, दयालु.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग (2 मिनट)**: बोर्ड पर एक कमजोर उत्तर (केवल विशेषण) और एक मजबूत उत्तर (PEEL) साथ-साथ लिखो। पूछो: "कौन सा उत्तर.', '**साझा खोज (5 मिनट)**: कहानी का एक छोटा अंश पढ़ो; पूरी कक्षा से कहो: "नायक के **कर्म** वाले वाक्य लाल पेंसिल से.', '**माइक्रो-लेखन (5 मिनट)**: हर छात्र केवल **एक** PEEL पैराग्राफ लिखे — "नायक स्वार्थी है / नहीं है"। शिक्षक तुरंत फीडबैक.', '**आत्म-जाँच सूची**: देओ — ☐ Point लिखा?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Character) वह पात्र है जो नायक/प्रमुख पात्र के साथ.',
          hint: 'यदि अटका हुआ महसूस हो तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c6_hin_cbse_04_004) के.',
          misconception: 'छात्र मानते हैं कि \'सहायक पात्र = नायक का मित्र/सेवक\'। वास्तव में सहायक पात्र नायक का शत्रु, अजनबी, या यहाँ तक कि कोई.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Character) वह पात्र है जो नायक/प्रमुख पात्र के साथ अंतर्क्रिया',
                  options: ['सहायक पात्र (Supporting Character) वह पात्र है जो नायक/प्रमुख पात्र के साथ अंतर्क्रिया', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटका हुआ महसूस हो तो \'पात्र-चित्रण: नायक/प्रमुख पात्र\' (c6_hin_cbse_04_004) के \'कार्य-उदाहरण 2\'.',
                  misconception: 'छात्र मानते हैं कि \'सहायक पात्र = नायक का मित्र/सेवक\'। वास्तव में सहायक पात्र नायक का शत्रु, अजनबी, या यहाँ तक कि कोई वस्तु/पशु भी हो सकता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "किसी कहानी के तीन प्रमुख मोड़ (turning points) लिखो। फिर प्रत्येक मोड़ पर पूछो: \'यह मोड़ किसने दिया?\'.', 'एक टेबल बनवाएँ: स्तंभ 1 — सहायक पात्र का नाम, स्तंभ 2 — उसका नायक से संबंध (मित्र/शत्रु/अजनबी), स्तंभ 3 — उसका एक.', 'जब तक स्तंभ 4 में \'नायक की सोच/निर्णय बदला\' न आए, तब तक समझाएँ कि \'संबंध\' नहीं \'प्रभाव\' निर्णायक है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_04_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त.',
          hint: 'यदि अटके तो c6_hin_cbse_04_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेष रूप से \'संघर्ष\'.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **शीर्षक को ही विषय मान लेते हैं** (जैसे शीर्षक "बहादुर बालक" → विषय "बहादुरी")। वे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त रहता है',
                  options: ['मुख्य विषय (Central Theme) वह केंद्रीय विचार या भाव है जो पूरी रचना में व्याप्त रहता है', '\'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ है किसी रचना के लिखे जाने का ऐतिहासिक, सामाजिक और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएं होती हैं, जबकि आख्यान-संरचना कहानी को शुरू, मध्य', 'पाठ्य-परिवेश (Setting) कहानी घटित होने का समग्र संदर्भ है जिसमें स्थान (भौगोलिक/भौतिक),'],
                  hint: 'यदि अटके तो c6_hin_cbse_04_002 (कथानक और आख्यान-संरचना) दोहराएँ — विशेष रूप से \'संघर्ष\' और \'समाधान\'.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **शीर्षक को ही विषय मान लेते हैं** (जैसे शीर्षक "बहादुर बालक" → विषय "बहादुरी")। वे नहीं समझते कि शीर्षक केवल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम**: छात्र को एक परिचित कहानी (जैसे "चींटी और टिड्डा" या पंचतंत्र की कोई कथा) दें और पूछें: "इस कहानी का.', 'अब एक वाक्य में बताओ यह किस बारे में है — केवल \'मेहनत\' मत लिखो, पूरा वाक्य लिखो।" 2.', '**दूसरा कदम**: उसके उत्तर में से **कीवर्ड** (मेहनत, तैयारी, भविष्य) चुनें और बोर्ड पर लिखें: "विषय = कीवर्ड + उनके बीच.', '**तीसरा कदम**: उसी कहानी से दो घटनाएँ ढूँढने को कहें जो विषय को **साबित** करती हों। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
