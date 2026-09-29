import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch23_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch23_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch23_p1',
    title: 'बड़े भाई साहब · Part 1/3',
    subtitle: 'यह नोड केवल प्रेमचंद का संक्षिप्त जीवन-परिचय, उनकी लेखन शैली की विशेषताएँ, कहानी की.',
    classLevel: 10, subject: 'hin_sp', topic: 'बड़े भाई साहब · Part 1/3',
    chapters: ['c10_hin_sp_ch23'],
    nodeIds: ['c10_hin_sp_cbse_23_001', 'c10_hin_sp_cbse_23_002', 'c10_hin_sp_cbse_23_003', 'c10_hin_sp_cbse_23_004', 'c10_hin_sp_cbse_23_005', 'c10_hin_sp_cbse_23_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कवि-परिचय से प्रेमचंद के तीन तथ्य उतारिए: असली नाम (धनपत राय), उपनाम की कहानी (नवाब राय से जुड़कर \'प्रेमचंद\'.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'बड़े भाई साहब — पृष्ठभूमि और रचनाकार परिचय', text: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय, 1880-1936, \'प्रेमचंद\' उपनाम की गाथा, यथार्थवादी लेखन), औपनिवेशिक शिक्षा-व्यवस्था की विशेषताएँ (परीक्षा-केंद्रित.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_23_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['बड़े भाई साहब —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_23_004', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['**Evidence 2 (प्रमाण 2)** खोजें — गुल्ली-डंडा प्रसंग.', '**Explanation 1 (व्याख्या 1)** — यह दर्शाता है कि नायक.', '**Evidence 1 (प्रमाण 1)** खोजें — पतंग प्रसंग: "पतंग उड़ाने.', '**Link (जुड़ाव)** — दोनों प्रमाण मिलकर सिद्ध करते हैं कि.', '**Point (बिंदु)** स्पष्ट करें — "नायक में व्यावहारिक बुद्धि.'], answer: '**Point (बिंदु)** स्पष्ट करें — "नायक में व्यावहारिक बुद्धि. **Evidence 1 (प्रमाण 1)** खोजें — पतंग प्रसंग: "पतंग उड़ाने. **Explanation 1 (व्याख्या 1)** — यह दर्शाता है कि नायक. **Evidence 2 (प्रमाण 2)** खोजें — गुल्ली-डंडा प्रसंग. **Link (जुड़ाव)** — दोनों प्रमाण मिलकर सिद्ध करते हैं कि.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_23_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through बड़े भाई साहब like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? बड़े भाई साहब · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बड़े भाई साहब · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_001', difficulty: 'standard',
          question: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत.',
          hint: 'अगर अटके तो कक्षा 9 की हिंदी पुस्तक \'स्पर्श\' के \'प्रेमचंद\' अध्याय को दोबारा पढ़ें.',
          misconception: 'छात्र समझते हैं कि \'बड़े भाई साहब\' केवल दो भाइयों की मीठी-नोकझोंक की कहानी है और प्रेमचंद ने इसे मनोरंजन के लिए लिखा।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,',
                  options: ['इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)', '\'बड़े भाई साहब\' का पात्र-चित्रण'],
                  hint: 'अगर अटके तो कक्षा 9 की हिंदी पुस्तक \'स्पर्श\' के \'प्रेमचंद\' अध्याय को दोबारा पढ़ें — विशेषकर.',
                  misconception: 'छात्र समझते हैं कि \'बड़े भाई साहब\' केवल दो भाइयों की मीठी-नोकझोंक की कहानी है और प्रेमचंद ने इसे मनोरंजन के लिए लिखा। वास्तव में प्रेमचंद.' }
          ],
            remediations: { '1934': { steps: ['चरण 1: छात्र को प्रेमचंद की जीवनी की समयरेखा (टाइमलाइन) बनाने को कहें — 1880 जन्म, 1898 मैट्रिक फेल, 1905 नौकरी, 1910.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_002', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' का कथानक — \'बड़े भाई साहब\' — स्पर्श भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'यदि फ्रेटैग पिरामिड या वाचक प्रकार स्पष्ट न हों, तो **कक्षा 9 हिंदी स्पर्श/क्षितिज** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कथानक\' (Plot) और \'कहानी का सारांश\' (Summary) एक ही चीज़ हैं। वे परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' का कथानक',
                  options: ['\'बड़े भाई साहब\' का कथानक', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)', '\'बड़े भाई साहब\' का पात्र-चित्रण'],
                  hint: 'यदि फ्रेटैग पिरामिड या वाचक प्रकार स्पष्ट न हों, तो **कक्षा 9 हिंदी स्पर्श/क्षितिज** के \'कहानी.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कथानक\' (Plot) और \'कहानी का सारांश\' (Summary) एक ही चीज़ हैं। वे परीक्षा में "कथानक की संरचना समझाइए".' }
          ],
            remediations: { 'plot-summary-summary-writing': { steps: ['**चरण 1:** छात्र से कहें: "कहानी के 5 मुख्य पड़ाव (Milestones) लिखो — केवल घटना नहीं, **मोड़ (Turning Point)** जहाँ.', '**चरण 2:** प्रत्येक पड़ाव के आगे लिखवाएं: **"यहाँ से आगे क्या बदला?"** (Consequence) — इससे कारण-कार्य श्रृंखला बनेगी।.', '**चरण 3:** फ्रेटैग पिरामिड का खाका (Template) दें और छात्र से अपने 5 पड़ाव उसमें फिट करने को कहें। 4.', '**चरण 4:** अंत में पूछें: "लेखक ने इस क्रम को क्यों चुना?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_003', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'अगर फँसें तो "कथानक और आख्यान-संरचना" (c10_hin_sp_cbse_23_002) के प्रसंग-सारांश दोहराएँ.',
          misconception: 'छात्र "परिवेश" (setting) और "वातावरण" (atmosphere) को **पर्यायवाची** मानते हैं — वे लिखते हैं: "परिवेश हॉस्टल का कमरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)',
                  options: ['\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पात्र-चित्रण'],
                  hint: 'अगर फँसें तो "कथानक और आख्यान-संरचना" (c10_hin_sp_cbse_23_002) के प्रसंग-सारांश दोहराएँ — विशेषकर.',
                  misconception: 'छात्र "परिवेश" (setting) और "वातावरण" (atmosphere) को **पर्यायवाची** मानते हैं — वे लिखते हैं: "परिवेश हॉस्टल का कमरा है" और "वातावरण भी.' }
          ],
            remediations: { 'setting-atmosphere': { steps: ['चरण 1: छात्र से कहें — "कहानी के किसी एक पन्ने पर **लाल पेन से भौतिक विवरण** (कमरा, मौसम, वस्तुएँ) और **नीले पेन से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_004', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_23_002 (कथानक)** के \'प्रमुख घटनाक्रम\' खंड को दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** "नायक (छोटा भाई) पढ़ाई में कमजोर है, इसलिए वह \'हीन\' या \'दोषपूर्ण\' पात्र है।" **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' का पात्र-चित्रण',
                  options: ['\'बड़े भाई साहब\' का पात्र-चित्रण', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_23_002 (कथानक)** के \'प्रमुख घटनाक्रम\' खंड को दोबारा पढ़ें और.',
                  misconception: '**विशिष्ट भ्रांति:** "नायक (छोटा भाई) पढ़ाई में कमजोर है, इसलिए वह \'हीन\' या \'दोषपूर्ण\' पात्र है।" **वास्तविकता:** प्रेमचंद ने नायक को.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ-पठन (Re-reading):** कहानी के केवल उन अंशों को पढ़ें जहाँ नायक **बोलता** या **कार्य करता** है (भाई के भाषणों.', '**गुण-प्रमाण सारणी (Trait-Evidence Table):** एक कागज पर 4 कॉलम बनाएँ: प्रसंग संकेत | नायक का कथन/कार्य | प्रकट गुण |.', '**तुलनात्मक चर्चा:** किसी साथी/शिक्षक से पूछें: "क्या तुम ऐसे दोस्त को \'बुरा\' मानोगे जो फेल होकर भी खुश रहता है?".', '**मॉडल उत्तर देखें:** CBSE टॉपर उत्तर पुस्तिकाओं (Model Answers) में नायक के चित्रण देखें — वे कभी \'लापरवाह\' शब्द नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_005', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_23_004 (नायक का चरित्र-चित्रण) के \'कार्य-प्रमाण तालिका\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "सहायक पात्र = कम महत्वपूर्ण पात्र" और परीक्षा में उनके नाम लिखकर छोड़ देते हैं।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' के सहायक पात्र',
                  options: ['\'बड़े भाई साहब\' के सहायक पात्र', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_23_004 (नायक का चरित्र-चित्रण) के \'कार्य-प्रमाण तालिका\'.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "सहायक पात्र = कम महत्वपूर्ण पात्र" और परीक्षा में उनके नाम लिखकर छोड़ देते हैं। **वास्तविकता:** CBSE.' }
          ],
            remediations: { 'cbse-action': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलो और हर उस पृष्ठ पर टिक लगाओ जहाँ अम्माँ/अब्बा/सुपरिंटेंडेंट/सहपाठी का जिक्र है।" 2.', '**चरण 2:** प्रत्येक टिक के आगे लिखवाएँ: "इससे बड़े भाई साहब के बारे में क्या *नया* पता चला?" (नया = जो पहले नहीं पता.', '**चरण 3:** इन उत्तरों को PEEL फॉर्मेट में लिखवाएँ: **P**oint (कौन-सा गुण उभरा), **E**vidence (पाठ का वाक्य).', '**चरण 4:** दोहराएँ जब तक वे \'कार्य (function)\' और \'क्रिया (action)\' में अंतर न करने लगें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_23_006', difficulty: 'standard',
          question: '\'बड़े भाई साहब\' का मुख्य विषय — \'बड़े भाई साहब\' का केंद्रीय भाव और संदेश',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_23_002 (कथानक)** और **c10_hin_sp_cbse_23_004/005.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय = बड़े भाई की ईर्ष्या (jealousy) या छोटे भाई की विजय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'बड़े भाई साहब\' का मुख्य विषय',
                  options: ['\'बड़े भाई साहब\' का मुख्य विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = प्रेमचंद का जीवन-संक्षेप (मूल नाम धनपत राय,', '\'बड़े भाई साहब\' का कथानक', '\'बड़े भाई साहब\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_23_002 (कथानक)** और **c10_hin_sp_cbse_23_004/005 (पात्र-चित्रण)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'मुख्य विषय = बड़े भाई की ईर्ष्या (jealousy) या छोटे भाई की विजय (triumph)\'**। **क्यों होती है:**.' }
          ],
            remediations: { 'jealousy-triumph': { steps: ['**पुनर्पाठ (Re-read):** छात्र से कहें — "केवल अंतिम 2 पृष्ठ फिर पढ़ो, जहाँ बड़े भाई छोटे भाई को गले लगाते हैं। पूछो.', '**द्वंद्व-तालिका (Dialectic Table):** बनवाएँ — दो कॉलम: \'किताबी ज्ञान\' vs \'अनुभवी ज्ञान\'। प्रत्येक प्रसंग (समय-सारणी.', '**प्रश्न-परिवर्तन (Reframe Question):** "किसकी जीत हुई?" के स्थान पर पूछें: "कहानी अंत में क्या **सिखाती** है?" 4.', '**लेखन-अभ्यास:** 80 शब्दों में लिखवाएँ: "बड़े भाई की असफलता वास्तव में उनकी सफलता क्यों है?" — इससे विषय (theme) घटना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
