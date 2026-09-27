import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch05_p1: SimDef = {
    id: 'v3_c6_hin_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'इस नोड में केवल लेखक का संक्षिप्त जीवन-परिचय, उनकी प्रमुख रचनाएँ, लेखन शैली की विशेषताएँ.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c6_hin_ch05'],
    nodeIds: ['c6_hin_cbse_05_001', 'c6_hin_cbse_05_002', 'c6_hin_cbse_05_003', 'c6_hin_cbse_05_004', 'c6_hin_cbse_05_005', 'c6_hin_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो तुम एक जासूस हो जिसे एक पुरानी चिट्ठी मिली है — तुम सबसे पहले क्या करोगे?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'रामायण में हनुमान को \'सहायक पात्र\' क्यों माना जाता है, केवल \'नायक का दोस्त\' नहीं? अंतर स्पष्ट करें।',
        options: ['**Correct Answer:** हनुमान \'सहायक पात्र\' हैं क्योंकि उनके बिना राम का कथानक', 'क्योंकि वे राम के भक्त हैं', 'वे बलवान हैं'],
        answer: '**Correct Answer:** हनुमान \'सहायक पात्र\' हैं क्योंकि उनके बिना राम का कथानक',
        hook: '**Specific Error:** Students believe सहायक पात्र are defined by **screen time** (कितनी बार आते हैं) or **relationship.',
    },
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी रचना (कहानी, कविता, निबंध) को लिखने वाले लेखक का जीवन-परिचय, उनकी साहित्यिक यात्रा, और उस समय की सामाजिक-सांस्कृतिक परिस्थितियाँ जिनमें रचना लिखी गई थी।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_005', title: 'पाठ 5 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: 'Think about your best friend — how do they help you shine, or how do they show a different side of you when you argue?',
            decisions: [{ prompt: 'किसी कहानी में \'सहायक पात्र\' की परिभाषा क्या है? अपने शब्दों में एक वाक्य में लिखें।', options: [
                { text: '**Correct Answer:** सहायक पात्र वे पात्र हैं जो मुख्य नायक नहीं होते लेकिन कथानक को आगे', outcome: '**Correct Answer:** सहायक पात्र वे पात्र हैं जो मुख्य नायक नहीं होते लेकिन कथानक को आगे बढ़ाने.' },
                { text: 'वे पात्र जो कम आते हैं', outcome: 'Not quite — **Specific Error:** Students believe सहायक पात्र are defined by **screen time** (कितनी बार आते हैं).', reveals: 'specific-error-students-believe-are' },
                { text: 'नायक के दोस्त', outcome: 'Not quite — **Specific Error:** Students believe सहायक पात्र are defined by **screen time** (कितनी बार आते हैं).', reveals: 'specific-error-students-believe-are' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 5 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी रचना (कहानी, कविता, निबंध) को.',
          hint: 'अगर अटका लगे तो कक्षा 5 की \'लेखक परिचय\' शीट दोबारा देखें — वहाँ केवल तथ्य थे, यहाँ.',
          misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का मतलब केवल **जन्मतिथि, मृत्युतिथि, प्रसिद्ध रचनाओं की सूची** याद करना है। वे यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के बाह्य'],
                  hint: 'अगर अटका लगे तो कक्षा 5 की \'लेखक परिचय\' शीट दोबारा देखें — वहाँ केवल तथ्य थे, यहाँ **कारण-कार्य.',
                  misconception: 'छात्र समझते हैं कि \'रचनाकार परिचय\' का मतलब केवल **जन्मतिथि, मृत्युतिथि, प्रसिद्ध रचनाओं की सूची** याद करना है। वे यह नहीं देखते कि लेखक के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहो: "चलो प्रेमचंद की एक कहानी (\'ईदगाह\' या \'बड़े भाई साहब\') खोलते हैं और उसमें **एक पात्र या प्रसंग** ढूँढते.', 'फिर पूछो: "लेखक ने अपने जीवन में यह दर्द कब झेला था?', 'अब एक तालिका बनवाओ: बाएँ कॉलम में \'लेखक के जीवन की घटना\', दाएँ में \'कहानी में उसका रूप\' — इससे \'जीवन → रचना\' का तीर.', 'अंत में कहो: "अब परीक्षा में जन्मतिथि नहीं, यह **संबंध** पूछा जाएगा।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_002', difficulty: 'standard',
          question: 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध.',
          hint: 'यदि अटका हुआ लगे: "कहानी के तीन भाग (आरंभ, मध्य, अंत) पहचानने का अभ्यास करें, फिर.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'घटनाओं का क्रम\' (Sequence of Events)** को **\'कथानक\' (Plot)** मान लेते हैं। वे "पहला क्या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध',
                  options: ['कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के बाह्य'],
                  hint: 'यदि अटका हुआ लगे: "कहानी के तीन भाग (आरंभ, मध्य, अंत) पहचानने का अभ्यास करें, फिर प्रत्येक जोड़ पर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'घटनाओं का क्रम\' (Sequence of Events)** को **\'कथानक\' (Plot)** मान लेते हैं। वे "पहला क्या हुआ, दूसरा क्या हुआ".' }
          ],
            remediations: { 'sequence-of-events-plot': { steps: ['**चरण 1 (ठोस बनाएं):** छात्र को दो वाक्य दें: "राम गिरा। रोया।" पूछें: "क्या यह कथानक है?', 'क्यों?" फिर दें: "राम **फिसलकर** गिरा **इसलिए** रोया।" अंतर रेखांकित करवाएं। **चरण 2 (दृश्य सहारा):** एक कॉमिक स्ट्रिप.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_003', difficulty: 'standard',
          question: '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक.',
          hint: 'यदि अटका हुआ लगे, तो c6_hin_cbse_05_002 के \'कथानक के पाँच चरण\' (विशेषतः पहला चरण) दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** "वातावरण केवल विशेषणों (adjectives) से बनता है — जितने ज्यादा डरावने/सुंदर विशेषण, उतना गहरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक',
                  options: ['**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के बाह्य'],
                  hint: 'यदि अटका हुआ लगे, तो c6_hin_cbse_05_002 के \'कथानक के पाँच चरण\' (विशेषतः पहला चरण) दोहराएँ और किसी.',
                  misconception: '**विशिष्ट भ्रांति:** "वातावरण केवल विशेषणों (adjectives) से बनता है — जितने ज्यादा डरावने/सुंदर विशेषण, उतना गहरा वातावरण।" **वास्तविकता:**.' }
          ],
            remediations: { 'adjectives': { steps: ['**पहला कदम:** छात्र को दो पैराग्राफ पढ़वाओ — एक केवल विशेषणों से भरा ("सुंदर, मनमोहक, रमणीय बगीचा"), दूसरा.', '**दूसरा कदम:** बोर्ड पर लिखो: **विशेषण = लेबल (Label), क्रिया/बिंब = अनुभव (Experience)**। छात्र से कहो: "अब \'डरावना.', '**तीसरा कदम:** उसके प्रयास पर प्रतिक्रिया दो: यदि उसने "अंधेरा, काला, भयानक कमरा" लिखा, तो कहो: "ये फिर लेबल हैं। कमरे.', 'हवा ने क्या *स्पर्श* कराया?" — इस **संवेदी क्रिया-विधि** (sensory verbing) पर 3-4 बार अभ्यास कराओ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक).',
          hint: 'यदि अटके: **c6_hin_cbse_05_002 (कथानक)** दोहराएँ — नायक के तीन मुख्य कार्य (शुरुआत, मध्य.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पात्र-चित्रण = नायक की **जीवनी (biography)** लिखना — यानी वह कहाँ पैदा हुआ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के बाह्य',
                  options: ['पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें कहानी के प्रमुख पात्र (नायक) के बाह्य', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटके: **c6_hin_cbse_05_002 (कथानक)** दोहराएँ — नायक के तीन मुख्य कार्य (शुरुआत, मध्य, अंत).',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि पात्र-चित्रण = नायक की **जीवनी (biography)** लिखना — यानी वह कहाँ पैदा हुआ, माता-पिता कौन थे, बचपन में.' }
          ],
            remediations: { 'biography': { steps: ['**चरणबद्ध सुधार (3-4 सत्रों में):** 1) **सत्र 1 — अंतर स्पष्ट करो:** दो पैराग्राफ दिखाओ — एक जीवनी, एक पात्र-चित्रण।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) are those characters in a story who are not.',
          hint: 'Review c6_hin_cbse_05_004 (नायक/प्रमुख पात्र) — specifically the "Character Arc Mapping".',
          misconception: '**Specific Error:** Students believe सहायक पात्र are defined by **screen time** (कितनी बार आते हैं) or **relationship.',
          parts: [
                { id: 'a', prompt: 'रामायण में हनुमान को \'सहायक पात्र\' क्यों माना जाता है, केवल \'नायक का दोस्त\' नहीं? अंतर स्पष्ट करें।', answer: '**Correct Answer:** हनुमान \'सहायक पात्र\' हैं क्योंकि उनके बिना राम का कथानक',
                  options: ['**Correct Answer:** हनुमान \'सहायक पात्र\' हैं क्योंकि उनके बिना राम का कथानक', 'क्योंकि वे राम के भक्त हैं', 'वे बलवान हैं'],
                  hint: 'Review c6_hin_cbse_05_004 (नायक/प्रमुख पात्र) — specifically the "Character Arc Mapping" worked.',
                  misconception: '**Specific Error:** Students believe सहायक पात्र are defined by **screen time** (कितनी बार आते हैं) or **relationship label** (भाई, दोस्त.' }
          ],
            remediations: { 'specific-error-students-believe-are': { steps: ['**Step-by-step remediation:** 1.', '**Concrete Comparison:** Take a familiar story (e.g., "Three Little Pigs").', 'For each, ask: "If we delete this character, what specific event *cannot happen*?" The wolf — no conflict.', 'The brick-house pig — no survival.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_05_006', difficulty: 'standard',
          question: 'किसी साहित्यिक रचना का **मुख्य विषय** वह केंद्रीय विचार या भाव है जिसे रचनाकार.',
          hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_05_002 (कथानक और आख्यान-संरचना) के \'चरमोत्कर्ष और.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'विषय\' को \'नैतिक शिक्षा (moral)\' या \'संदेश\' का पर्यायवाची मान लेते हैं** और दोनों को एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'किसी साहित्यिक रचना का **मुख्य विषय** वह केंद्रीय विचार या भाव है जिसे रचनाकार पूरी रचना',
                  options: ['किसी साहित्यिक रचना का **मुख्य विषय** वह केंद्रीय विचार या भाव है जिसे रचनाकार पूरी रचना', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) कहानी में घटित घटनाओं का वह तार्किक क्रम है जो कारण-कार्य संबंध', '**पाठ्य-परिवेश (Setting)** कहानी के घटित होने का भौतिक स्थान, समयकाल और सामाजिक'],
                  hint: 'यदि अटका हुआ महसूस हो तो c6_hin_cbse_05_002 (कथानक और आख्यान-संरचना) के \'चरमोत्कर्ष और समाधान\' भाग.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'विषय\' को \'नैतिक शिक्षा (moral)\' या \'संदेश\' का पर्यायवाची मान लेते हैं** और दोनों को एक ही पंक्ति में लिख.' }
          ],
            remediations: { 'moral': { steps: ['**अंतर स्पष्ट करो**: छात्र को दो कॉलम बनाने को कहो — बाएं "विषय (क्या है?)" दाएं "संदेश (क्या करें?)"। 5 जानी-पहचानी.', '**वाक्य-रूपांतरण अभ्यास**: विषय वाक्य को \'है/होता है\' में, संदेश वाक्य को \'चाहिए/करो/मत करो\' में बदलने का अभ्यास कराओ।.', '**पाठ-आधारित अभ्यास**: पाठ 5 के किसी एक प्रसंग को लेकर साथ मिलकर विषय-संदेश निकालो, फिर छात्र को अकेले दूसरे प्रसंग पर.', '**फीडबैक लूप**: हर बार पूछो — "यह वाक्य पाठ के बारे में बता रहा है या मुझे सलाह दे रहा है?" — इससे आंतरिक भेद स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
