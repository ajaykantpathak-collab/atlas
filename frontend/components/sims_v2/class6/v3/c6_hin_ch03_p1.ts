import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch03_p1: SimDef = {
    id: 'v3_c6_hin_ch03_p1',
    title: 'पाठ 3 · Part 1/3',
    subtitle: 'इस नोड में केवल पाठ-3 की पृष्ठभूमि (कालखंड, सामाजिक परिस्थिति) और रचनाकार (जीवन-परिचय.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 3 · Part 1/3',
    chapters: ['c6_hin_ch03'],
    nodeIds: ['c6_hin_cbse_03_001', 'c6_hin_cbse_03_002', 'c6_hin_cbse_03_003', 'c6_hin_cbse_03_004', 'c6_hin_cbse_03_005', 'c6_hin_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुम्हें एक पुराना पत्र मिला है जिस पर न तारीख है, न भेजने वाले का नाम — तुम कैसे समझोगे कि पत्र.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'दो कहानियों का मुख्य विषय \'सच बोलना\' है। कहानी १ में नायक सच बोलकर इनाम पाता है। कहानी २ में नायक सच बोलकर सजा पाता है, लेकिन अंत में सम्मान पाता है। दोनों.',
        options: ['**Correct Answer:** कहानी १ का संदेश: **"सच बोलने से तुरंत लाभ मिलता है"**', 'सच बोलने से तुरंत लाभ मिलता है', 'सच बोलना कठिन हो सकता है, लेकिन अंततः यह सम्मान दिलाता है'],
        answer: '**Correct Answer:** कहानी १ का संदेश: **"सच बोलने से तुरंत लाभ मिलता है"**',
        hook: 'Students believe **मुख्य विषय = कहानी का सारांश (summary)** or **संदेश = कहानी का अंतिम वाक्य (last sentence)**.',
    },
    teaching: [
        { title: 'पाठ 3 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी साहित्यिक रचना के लिखे जाने का ऐतिहासिक, सामाजिक, सांस्कृतिक संदर्भ (पृष्ठभूमि) तथा रचनाकार के जीवन, विचारधारा, लेखन-शैली एवं प्रमुख कृतियों का संक्षिप्त.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 3 — पृष्ठभूमि', 'पाठ 3 — कथानक', 'पाठ 3 — पाठ्य-परिवेश', 'पाठ 3 — पात्र-चित्रण', 'पाठ 3 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_005', title: 'पाठ 3 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: 'Think about your best friend — how do they bring out your brave side or your funny side? In a story, सहायक पात्र do exactly that for the नायक.',
            decisions: [{ prompt: 'किसी कहानी में \'सहायक पात्र\' की परिभाषा अपने शब्दों में लिखिए। (Recall the basic definition.)', options: [
                { text: '**Correct Answer:** सहायक पात्र वे पात्र हैं जो मुख्य पात्र के साथ बातचीत करके कथानक को', outcome: '**Correct Answer:** सहायक पात्र वे पात्र हैं जो मुख्य पात्र के साथ बातचीत करके कथानक को आगे बढ़ाते.' },
                { text: 'वे कम महत्वपूर्ण पात्र हैं', outcome: 'Not quite — **Exact Error:** Students equate "सहायक पात्र" with "कम बोलने वाला पात्र" or "कम दृश्यों वाला.', reveals: 'exact-error-students-equate-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_006', title: 'पाठ 3 — मुख्य विषय और संदेश',
          caseStudy: { intro: 'Think about the last time you told a friend about a movie — did you just list what happened, or did you say what it was *really* about?',
            decisions: [{ prompt: 'किसी कहानी का \'मुख्य विषय\' और \'संदेश\' में क्या अंतर है? अपने शब्दों में समझाइए।', options: [
                { text: '**Correct Answer:** मुख्य विषय कहानी के अंदर चलने वाला केंद्रीय विचार है (जैसे:', outcome: '**Correct Answer:** मुख्य विषय कहानी के अंदर चलने वाला केंद्रीय विचार है (जैसे: \'ईमानदारी\'), जो.' },
                { text: 'राम ने सच्चाई बोली', outcome: 'Not quite — Students believe **मुख्य विषय = कहानी का सारांश (summary)** or **संदेश = कहानी का अंतिम वाक्य (last.', reveals: 'summary-or-last-sentence' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 3 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 3 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 3 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — किसी साहित्यिक रचना के लिखे जाने का.',
          hint: 'यदि अटके तो: कक्षा-5 में पढ़ी किसी कहानी (जैसे \'ईदगाह\') का \'पृष्ठभूमि-रचनाकार\' चार्ट.',
          misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि = रचनाकार की जीवनी" — छात्र अक्सर पाठ्यपुस्तक के \'पृष्ठभूमि\' शीर्षक वाले पैराग्राफ को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक', 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि अटके तो: कक्षा-5 में पढ़ी किसी कहानी (जैसे \'ईदगाह\') का \'पृष्ठभूमि-रचनाकार\' चार्ट बनाकर देखो.',
                  misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि = रचनाकार की जीवनी" — छात्र अक्सर पाठ्यपुस्तक के \'पृष्ठभूमि\' शीर्षक वाले पैराग्राफ को छोड़कर सीधे \'रचनाकार.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पृथक्करण अभ्यास:** छात्र से कहो — "पुस्तक खोलो, \'पृष्ठभूमि\' और \'रचनाकार परिचय\' वाले दोनों बॉक्स पर अलग-अलग रंग से.', '**मिलान खेल:** 6 कथन कार्ड बनाओ (3 पृष्ठभूमि के, 3 रचनाकार के); छात्र को सही शीर्षक के नीचे रखने को कहो। गलती होने पर.', '**मिनी-लेखन:** "एक वाक्य में पृष्ठभूमि लिखो, एक वाक्य में रचनाकार परिचय — दोनों में \'मैं\' या \'लेखक\' शब्द न आए।" इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_002', difficulty: 'standard',
          question: 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि.',
          hint: 'यदि फँसें तो \'कहानी का सारांश लिखना\' (कक्षा ५ का कौशल) दोहराएँ, फिर कारण-परिणाम तीर (→).',
          misconception: 'छात्र मानते हैं कि \'कथानक\' का अर्थ केवल \'घटनाओं की सूची\' है, इसलिए वे कहानी का सारांश लिख देते हैं और समझते हैं कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन',
                  options: ['कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक', 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि फँसें तो \'कहानी का सारांश लिखना\' (कक्षा ५ का कौशल) दोहराएँ, फिर कारण-परिणाम तीर (→) जोड़कर.',
                  misconception: 'छात्र मानते हैं कि \'कथानक\' का अर्थ केवल \'घटनाओं की सूची\' है, इसलिए वे कहानी का सारांश लिख देते हैं और समझते हैं कि उन्होंने कथानक विश्लेषण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से एक परिचित घटना (जैसे साइकिल सीखना) के ३ चरण बोलने को कहें: (क) गिरना, (ड) संतुलन बनाना, (च) चलना। 2.', 'पूछें: \'गिरने से संतुलन कैसे आया?\' — जब वे \'अभ्यास\' बोलें, तो समझाएँ: यही कारण-परिणाम कड़ी कथानक बनाती है। 3.', 'अब वही घटना कालानुक्रमिक और फिर फ्लैशबैक में लिखवाएँ। 4.', 'दोनों पढ़वाकर पूछें: \'कौन-सी ज्यादा रोचक लगी और क्यों?\' — इससे संरचना का प्रभाव स्पष्ट होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_003', difficulty: 'standard',
          question: '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक.',
          hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_03_002 (कथानक और आख्यान-संरचना)** पर वापस जाएँ और.',
          misconception: '**विशिष्ट भ्रांति:** *"परिवेश (Setting) केवल \'कहाँ और कब\' का जवाब देता है; वातावरण (Atmosphere) केवल \'कैसा लगा\' का जवाब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक',
                  options: ['**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c6_hin_cbse_03_002 (कथानक और आख्यान-संरचना)** पर वापस जाएँ और कहानी का.',
                  misconception: '**विशिष्ट भ्रांति:** *"परिवेश (Setting) केवल \'कहाँ और कब\' का जवाब देता है; वातावरण (Atmosphere) केवल \'कैसा लगा\' का जवाब देता है — दोनों.' }
          ],
            remediations: { 'setting': { steps: ['**चरण 1 (ठोस अनुभव):** छात्र को आँख बंद कराकर दो स्थितियाँ महसूस कराएँ: (क) "तुम अपने कमरे में अकेले हो, रात के 2 बजे.', '\'सुनसान\' की जगह \'उत्सव\' क्यों?"* → इससे **\'शब्द चयन → वातावरण\' का कारण-कार्य संबंध (Cause-Effect Link)** स्पष्ट होता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के.',
          hint: 'यदि अटके तो **c6_hin_cbse_03_002 (कथानक और आख्यान-संरचना)** दोहराओ — विशेषकर \'मोड़ बिंदु\'.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पात्र-चित्रण\' का अर्थ है पात्र की **सूची (list)** बनाना — जैसे: नाम, उम्र, रंग.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के',
                  options: ['पात्र-चित्रण (Character Sketch) किसी कहानी या उपन्यास के प्रमुख पात्र (नायक) के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक कहानी की घटनाओं का कारण-परिणाम से बँधा क्रमिक सिलसिला है, जबकि आख्यान-संरचना उन', '**पाठ्य-परिवेश (Setting)** कहानी घटित होने का भौतिक स्थान, समय अवधि, ऐतिहासिक'],
                  hint: 'यदि अटके तो **c6_hin_cbse_03_002 (कथानक और आख्यान-संरचना)** दोहराओ — विशेषकर \'मोड़ बिंदु\' और.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'पात्र-चित्रण\' का अर्थ है पात्र की **सूची (list)** बनाना — जैसे: नाम, उम्र, रंग, कपड़े, शौक। वे.' }
          ],
            remediations: { 'list': { steps: ['**पहला चरण:** छात्र से कहो — "पाठ खोलो और नायक के **केवल तीन संवाद** ढूँढ़ो जो तुम्हें सबसे महत्वपूर्ण लगते हैं। उन्हें.', '**दूसरा चरण:** प्रत्येक संवाद के सामने लिखो — "यह क्या दर्शाता है?" (गुण निकालना)। 3.', '**तीसरा चरण:** PEEL शीट दो: Point (गुण), Evidence (संवाद/कर्म), Explanation (कैसे प्रमाण गुण सिद्ध करता है), Link.', '**चौथा चरण:** एक मॉडल उत्तर दिखाओ (कमजोर vs मजबूत) और छात्र से अंतर पहचानने को कहो। **मूल मंत्र:** "पहले प्रमाण, फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) are fictional persons in a narrative who.',
          hint: 'If stuck, review **पात्र-चित्रण: नायक/प्रमुख पात्र (c6_hin_cbse_03_004)** — specifically.',
          misconception: '**Exact Error:** Students equate "सहायक पात्र" with "कम बोलने वाला पात्र" or "कम दृश्यों वाला पात्र" — they count.',
          parts: [
                { id: 'a', prompt: 'नीचे दिए गए अंश को पढ़कर बताइए कि \'दादी माँ\' यहाँ किस प्रकार की सहायक पात्र हैं और वे नायक के किस निर्णय को प्रभावित करती हैं?', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'दादी माँ ने रोका'],
                  hint: 'If stuck, review **पात्र-चित्रण: नायक/प्रमुख पात्र (c6_hin_cbse_03_004)** — specifically the "Trait.',
                  misconception: '**Exact Error:** Students equate "सहायक पात्र" with "कम बोलने वाला पात्र" or "कम दृश्यों वाला पात्र" — they count *screen time* instead.' }
          ],
            remediations: { 'exact-error-students-equate-with': { steps: ['** Give the student a 3-panel comic strip (or a 50-word micro-story) with 3 characters. Ask: "Who is the hero?', '** Have them complete this sentence frame: "Without [Character X], the hero would not ______ because ______." 3. **', '** Show two versions of the same scene — one with the supporting character\'s key line, one without.', '** Only then return to the textbook — map the same steps onto the actual text.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_03_006', difficulty: 'standard',
          question: '**मुख्य विषय (Main Theme)** is the central idea or universal concept that runs.',
          hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c6_hin_cbse_03_002) to practice identifying.',
          misconception: 'Students believe **मुख्य विषय = कहानी का सारांश (summary)** or **संदेश = कहानी का अंतिम वाक्य (last sentence)**.',
          parts: [
                { id: 'a', prompt: 'किसी कहानी का \'मुख्य विषय\' और \'संदेश\' में क्या अंतर है? अपने शब्दों में समझाइए।', answer: '**Correct Answer:** मुख्य विषय कहानी के अंदर चलने वाला केंद्रीय विचार है (जैसे:',
                  options: ['**Correct Answer:** मुख्य विषय कहानी के अंदर चलने वाला केंद्रीय विचार है (जैसे:', 'राम ने सच्चाई बोली'],
                  hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c6_hin_cbse_03_002) to practice identifying climax and.',
                  misconception: 'Students believe **मुख्य विषय = कहानी का सारांश (summary)** or **संदेश = कहानी का अंतिम वाक्य (last sentence)**.' },
                { id: 'b', prompt: 'दो कहानियों का मुख्य विषय \'सच बोलना\' है। कहानी १ में नायक सच बोलकर इनाम पाता है। कहानी २ में नायक सच बोलकर सजा पाता है, लेकिन अंत में सम्मान पाता है। दोनों.', answer: '**Correct Answer:** कहानी १ का संदेश: **"सच बोलने से तुरंत लाभ मिलता है"**',
                  options: ['**Correct Answer:** कहानी १ का संदेश: **"सच बोलने से तुरंत लाभ मिलता है"**', 'सच बोलने से तुरंत लाभ मिलता है', 'सच बोलना कठिन हो सकता है, लेकिन अंततः यह सम्मान दिलाता है', 'दोनों का संदेश एक ही है: सच बोलो'],
                  hint: 'If stuck, review "कथानक और आख्यान-संरचना" (c6_hin_cbse_03_002) to practice identifying climax and.',
                  misconception: 'Students believe **मुख्य विषय = कहानी का सारांश (summary)** or **संदेश = कहानी का अंतिम वाक्य (last sentence)**.' }
          ],
            remediations: { 'summary-or-last-sentence': { steps: ['**Concrete-to-Abstract Ladder:** Give the student 5 familiar stories (e.g., \'थोथा चना बाजे घना\', \'कछुआ और खरगोश\').', 'For each, ask: "कहानी में कौन-सा शब्द बार-बार आता है या पूरी कहानी जिस एक विचार पर टिकी है?" → Write that abstract noun.', '**Message Extraction:** Then ask: "लेखक इस विचार के बारे में हमें क्या समझाना चाहता है?" → Frame as a full sentence.', '**Visual Anchor:** Draw a tree: Roots = Theme (one word), Trunk = Events, Branches = Message (sentence).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
