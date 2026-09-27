import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch29_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch29_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch29_p1',
    title: 'कारतूस · Part 1/3',
    subtitle: 'This node covers: historical background of 1857 Revolt as relevant to the story\'s village.',
    classLevel: 10, subject: 'hin_sp', topic: 'कारतूस · Part 1/3',
    chapters: ['c10_hin_sp_ch29'],
    nodeIds: ['c10_hin_sp_cbse_29_001', 'c10_hin_sp_cbse_29_002', 'c10_hin_sp_cbse_29_003', 'c10_hin_sp_cbse_29_004', 'c10_hin_sp_cbse_29_005', 'c10_hin_sp_cbse_29_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'Think about the last time you heard a "dadi/naani ki kahani" (grandmother\'s tale) — it feels real because.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'कारतूस — पृष्ठभूमि और रचनाकार परिचय', text: '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण परिवेश को स्थापित करता है, जबकि रचनाकार परिचय हबीब तनवीर की लोक-रंगमंच शैली, छत्तीसगढ़ी लोक परंपरा के प्रति उनकी.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_29_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['कारतूस — पृष्ठभूमि और', 'कारतूस — कथानक और', 'कारतूस — पाठ्य-परिवेश और', 'कारतूस — पात्र-चित्रण: नायक/प्रमुख', 'कारतूस — पात्र-चित्रण: सहायक', 'कारतूस — मुख्य विषय'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_29_005', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['**Explain करें** — सिपाही नियमों का प्रतिनिधित्व करता है.', '**Evidence ढूंढें** — पाठ से: "तुम्हारा दिमाग खराब हो गया.', '**Point पहचानें** — सिपाही फौजी के \'अनुशासन और.', '**Link जोड़ें** — यह प्रसंग कहानी के केंद्रीय विषय.', '**उत्तर संश्लेषित करें** — PEEL प्रवाह में 60-80 शब्दों का.'], answer: '**Point पहचानें** — सिपाही फौजी के \'अनुशासन और. **Evidence ढूंढें** — पाठ से: "तुम्हारा दिमाग खराब हो गया. **Explain करें** — सिपाही नियमों का प्रतिनिधित्व करता है. **Link जोड़ें** — यह प्रसंग कहानी के केंद्रीय विषय. **उत्तर संश्लेषित करें** — PEEL प्रवाह में 60-80 शब्दों का.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_29_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through कारतूस like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? कारतूस · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कारतूस · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_001', difficulty: 'standard',
          question: '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और.',
          hint: 'If stuck, review Class 9 Hindi Sparsh chapter on "लोककला और लोकसाहित्य" (folk art and.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "पृष्ठभूमि परिचय" का अर्थ केवल **इतिहास की तारीखें, घटनाएँ और लेखक का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण',
                  options: ['"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,', '**पात्र-चित्रण (Character Sketch)** का अर्थ है'],
                  hint: 'If stuck, review Class 9 Hindi Sparsh chapter on "लोककला और लोकसाहित्य" (folk art and literature).',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि "पृष्ठभूमि परिचय" का अर्थ केवल **इतिहास की तारीखें, घटनाएँ और लेखक का जन्म-मृत्यु वर्ष रटना** है।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ खोलो और वह अंश ढूँढो जहाँ गाड़ीवान कारतूस ढोने से मना करता है। उस अंश में **कौन-से शब्द.', '(संकेत: \'चर्बी\', \'धर्म\', \'अंग्रेज़\', \'पाप\')" **चरण 2**: उन शब्दों को रेखांकित करवाएँ और पूछें — "यदि 1857 का विद्रोह न.', 'क्यों/क्यों नहीं?" → इससे **इतिहास-कथानक संबंध** स्पष्ट होगा। **चरण 3**: हबीब तनवीर का एक साक्षात्कार/वीडियो (YouTube.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_002', difficulty: 'standard',
          question: '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain).',
          hint: 'यदि फंसे: **पहले और अंतिम पैराग्राफ को साथ पढ़ें** → समान शब्द/चित्र पहचानें → पूछें.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'कथानक\' (plot)** और **\'आख्यान-संरचना\' (narrative structure)** को एक ही मान लेते हैं। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि',
                  options: ['**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,', '**पात्र-चित्रण (Character Sketch)** का अर्थ है'],
                  hint: 'यदि फंसे: **पहले और अंतिम पैराग्राफ को साथ पढ़ें** → समान शब्द/चित्र पहचानें → पूछें "लेखक ने कहानी.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'कथानक\' (plot)** और **\'आख्यान-संरचना\' (narrative structure)** को एक ही मान लेते हैं। वे लिखते हैं: "कहानी का.' }
          ],
            remediations: { 'plot-narrative-structure': { steps: ['**चरण 1:** छात्र से कहो: "कहानी के पहले पैराग्राफ और अंतिम पैराग्राफ को आमने-सामने रखकर पढ़ो। क्या समान है?', 'क्या अलग?" — इससे **वृताकार संरचना** दृश्यमान होगी। 2.', '**चरण 2:** एक **टाइमलाइन (timeline)** बनवाओ: बाएँ कॉलम में **वास्तविक घटना क्रम (chronological order)**, दाएँ कॉलम में.', '**चरण 3:** पूछो: "लेखक ने फांसी का दृश्य पहले क्यों दिखाया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_29_002 (कथानक) के \'मुख्य घटनाक्रम\' खंड को दोबारा.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'पाठ्य-परिवेश\' को केवल \'सेटिंग\' (स्थान-काल) मानकर 2-3 पंक्तियों में निपटा देते हैं — जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', '**पात्र-चित्रण (Character Sketch)** का अर्थ है'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_29_002 (कथानक) के \'मुख्य घटनाक्रम\' खंड को दोबारा पढ़ें और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'पाठ्य-परिवेश\' को केवल \'सेटिंग\' (स्थान-काल) मानकर 2-3 पंक्तियों में निपटा देते हैं — जैसे "कहानी मेरठ छावनी में.' }
          ],
            remediations: { '2-3-1857': { steps: ['छात्र से कहें: "कहानी का कोई एक पन्ना खोलो और केवल वही वाक्य छांटो जो **देखने, सुनने, सूंघने, महसूस करने** का विवरण.', 'उन ब्योरों को तीन स्तंभों में बांटें: भौतिक (धूल, बारूद, नदी), सामाजिक (जाति, रैंक, भाईचारा), मनोवैज्ञानिक (भय, संदेह.', 'अब पूछें: "इनमें से प्रत्येक ब्योरे के बिना कहानी का वह दृश्य कैसे बदल जाता?" — लिखित उत्तर मांगें। 4.', 'अंत में समझाएं: "यही परिवेश का \'कार्यात्मक विश्लेषण\' है जो बोर्ड परीक्षा में 3-4 अंक दिलाता है।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_004', difficulty: 'standard',
          question: '**पात्र-चित्रण (Character Sketch)** का अर्थ है — कहानी के किसी पात्र के.',
          hint: 'यदि अटके: **c10_hin_sp_cbse_29_002 (कथानक)** दोबारा पढ़ें — विशेषकर **चरमोत्कर्ष दृश्य**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र फौजी को **\'डरपोक सिपाही जो अंत में बहादुर बन गया\'** लिख देते हैं। **गलत तर्क:** वे **भय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पात्र-चित्रण (Character Sketch)** का अर्थ है',
                  options: ['**पात्र-चित्रण (Character Sketch)** का अर्थ है', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि अटके: **c10_hin_sp_cbse_29_002 (कथानक)** दोबारा पढ़ें — विशेषकर **चरमोत्कर्ष दृश्य** जहाँ फौजी.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र फौजी को **\'डरपोक सिपाही जो अंत में बहादुर बन गया\'** लिख देते हैं। **गलत तर्क:** वे **भय (fear)** और **कायरता.' }
          ],
            remediations: { 'fear-cowardice': { steps: ['**चरण 1:** छात्र से पूछो — **"फौजी के हाथ क्यों काँप रहे थे?', 'मृत्यु के भय से या धर्म-संकट से?"** पाठ की पंक्ति दिखाओ: *"फौजी ने कारतूस ले लिया। उसके हाथ काँप रहे थे।"* — चर्चा करो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक के समानांतर या उसके संपर्क में आकर कथानक.',
          hint: 'यदि फंसे: नोड 004 की PEEL शीट दोबारा बनाएं — फौजी के प्रत्येक गुण के लिए एक संवाद/प्रसंग.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्रों का विश्लेषण केवल उनके \'गुणों की सूची\' बनाने तक सीमित है (जैसे: सिपाही = सख्त.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक के समानांतर या उसके संपर्क में आकर कथानक को गति',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक के समानांतर या उसके संपर्क में आकर कथानक को गति', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'यदि फंसे: नोड 004 की PEEL शीट दोबारा बनाएं — फौजी के प्रत्येक गुण के लिए एक संवाद/प्रसंग लिखें; फिर.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्रों का विश्लेषण केवल उनके \'गुणों की सूची\' बनाने तक सीमित है (जैसे: सिपाही = सख्त, किसान = दयालु, डाकिया.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** केवल सहायक पात्रों के संवाद/क्रियाओं को हाइलाइट करते हुए (तीन रंगों से: सिपाही-लाल, किसान-हरा.', '**तालिका बनाएं** चार कॉलम: पात्र | संवाद/क्रिया | नायक पर प्रभाव | विषय से जुड़ाव — प्रत्येक पात्र के लिए 2-2 पंक्तियाँ.', '**PEEL अभ्यास:** एक पात्र चुनकर 80 शब्दों का उत्तर लिखें: "सिपाही फौजी के चरित्र को कैसे उभारता है?" — Point से शुरू.', '**स्व-मूल्यांकन:** जांचें कि क्या उत्तर में \'नायक का नाम\' और \'विषय का नाम\' दोनों आए हैं?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_29_006', difficulty: 'standard',
          question: '\'कारतूस\' कहानी का **मुख्य विषय (Central Theme)** **\'संवाद की विफलता और भाग्य की.',
          hint: 'अगर फँसे तो **नोड 29_002 (कथानक)** के \'मोड़ बिंदु (Turning Points)\' और **नोड 29_004.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'कारतूस\' को केवल \'कागज़ का टुकड़ा\' (Object) मानते हैं, \'प्रतीक (Symbol)\' नहीं मानते।** वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'कारतूस\' कहानी का **मुख्य विषय (Central Theme)** **\'संवाद की विफलता और भाग्य की विडम्बना\'',
                  options: ['\'कारतूस\' कहानी का **मुख्य विषय (Central Theme)** **\'संवाद की विफलता और भाग्य की विडम्बना\'', '"कारतूस" का पृष्ठभूमि परिचय 1857 के स्वतंत्रता संग्राम के ऐतिहासिक संदर्भ और ग्रामीण', '**कथानक (Plot)** कहानी में घटित घटनाओं का कारण-कार्य संबंध (cause-effect chain) है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कहानी की घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक,'],
                  hint: 'अगर फँसे तो **नोड 29_002 (कथानक)** के \'मोड़ बिंदु (Turning Points)\' और **नोड 29_004, 29_005.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'कारतूस\' को केवल \'कागज़ का टुकड़ा\' (Object) मानते हैं, \'प्रतीक (Symbol)\' नहीं मानते।** वे लिखते हैं: "नायक.' }
          ],
            remediations: { 'object': { steps: ['**चरण 1 (Concrete):** छात्र को कहानी के **तीन दृश्य (Scenes)** दोबारा पढ़वाओ: (क) नायक पर्ची पाता है, (ख) सूबेदार को.', 'गलती कहाँ हुई?"** — इसे टेबल में भरवाओ। **चरण 2 (Symbolic):** अब पूछो: **"अगर कागज़ की जगह कोई आदमी संदेश लेकर जाता, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
