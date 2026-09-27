import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch06_p2: SimDef = {
    id: 'v3_c6_hin_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'इस नोड में केवल गौण विषय की पहचान, मुख्य विषय से उसका संबंध, और पाठ्य-साक्ष्य (textual.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c6_hin_ch06'],
    nodeIds: ['c6_hin_cbse_06_007', 'c6_hin_cbse_06_008', 'c6_hin_cbse_06_009', 'c6_hin_cbse_06_010', 'c6_hin_cbse_06_011', 'c6_hin_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'क्या तुमने कभी ध्यान दिया है कि जब तुम अपनी माँ को खाना बनाते देखते हो, तो मुख्य काम \'सब्जी पकाना\' है, लेकिन.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'एक परीक्षा में आशय-सूचक प्रश्न आया: "लेखक ने शीर्षक \'अंतिम पाठ\' क्यों रखा?" छात्र A ने उत्तर दिया: "क्योंकि यह पाठ्यपुस्तक का अंतिम अध्याय है।" छात्र B ने.',
        options: ['**Correct Answer:** **छात्र B का उत्तर बेहतर है।** **Justification:** छात्र B ने', 'Implied Meaning', 'We should respect elders'],
        answer: '**Correct Answer:** **छात्र B का उत्तर बेहतर है।** **Justification:** छात्र B ने',
        hook: '**Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered by **guessing the moral of the.',
    },
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: 'गौण विषय (Sub-theme) कहानी का वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ समानांतर चलता है, उसे सहारा देता है, विस्तार देता है या उसके किसी पहलू को उजागर करता है, परन्तु कहानी का केंद्रीय संदेश.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_hin_cbse_06_012', title: 'पाठ 6 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: 'Have you ever had a friend say "I\'m fine" but their crossed arms and quiet voice told you they were actually upset?',
            decisions: [{ prompt: 'पाठ में पूछे गए प्रश्न में \'कौन\', \'क्या\', \'कब\', \'कहाँ\' जैसे प्रश्नवाचक शब्द हों, तो वह प्रश्न किस श्रेणी का माना जाएगा — वस्तुनिष्ठ या.', options: [
                { text: '**Correct Answer:** वह प्रश्न **वस्तुनिष्ठ (Objective)** श्रेणी का माना जाएगा क्योंकि', outcome: '**Correct Answer:** वह प्रश्न **वस्तुनिष्ठ (Objective)** श्रेणी का माना जाएगा क्योंकि \'कौन\'.' },
                { text: 'Implied Meaning', outcome: 'Not quite — **Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered.', reveals: 'specific-error-students-believe-that' },
                { text: 'We should respect elders', outcome: 'Not quite — **Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered.', reveals: 'specific-error-students-believe-that' }
            ] }] } },
        { type: 'case', nodeId: 'c6_hin_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 6 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कहानी का वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ.',
          hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (c6_hin_cbse_06_006)** के कार्यित उदाहरण (worked.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'गौण विषय\' को \'कहानी का कोई भी छोटा प्रसंग/वर्णन\' मान लेते हैं** — जैसे मौसम का वर्णन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कहानी का वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ समानांतर',
                  options: ['गौण विषय (Sub-theme) कहानी का वह सहायक विचार या प्रसंग है जो मुख्य विषय के साथ समानांतर', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (c6_hin_cbse_06_006)** के कार्यित उदाहरण (worked examples).',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'गौण विषय\' को \'कहानी का कोई भी छोटा प्रसंग/वर्णन\' मान लेते हैं** — जैसे मौसम का वर्णन, किसी पात्र का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**ठोस उदाहरण से शुरू करो:** एक परिचित कहानी (जैसे \'पंचतंत्र\' की कोई कथा) लो। मुख्य विषय लिखो (जैसे: \'बुद्धि बल से.', '**\'क्यों\' पूछो:** हर गौण विषय के लिए पूछो: "अगर यह प्रसंग हटा दें, तो मुख्य विषय पर क्या असर पड़ेगा?" — छात्र स्वयं.', '**वर्णन बनाम विषय का अभ्यास कराओ:** दो वाक्य दो: (अ) "बहुत तेज़ बारिश हो रही थी।" (ब) "बारिश में भी गाय को चारा देने.', '**सरल नियम दोहराओ:** "गौण विषय = छोटा प्रसंग + बड़ा विचार (जो मुख्य विषय से जुड़ा हो)।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** is the use of vivid, sensory language (sight, sound, smell.',
          hint: 'Review Class 5 "उपमा (Simile)" and practice converting similes to metaphors (remove.',
          misconception: 'Students confuse **बिंब (Imagery)** with **वर्णन (Description)** and **रूपक (Metaphor)** with **उपमा (Simile)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** is the use of vivid, sensory language (sight, sound, smell, taste,',
                  options: ['**बिंब (Imagery)** is the use of vivid, sensory language (sight, sound, smell, taste,', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'Review Class 5 "उपमा (Simile)" and practice converting similes to metaphors (remove "जैसा/सा") and.',
                  misconception: 'Students confuse **बिंब (Imagery)** with **वर्णन (Description)** and **रूपक (Metaphor)** with **उपमा (Simile)**.' }
          ],
            remediations: { 'students-confuse-imagery-with-description': { steps: ['** Give the student 5 simple sentences — 3 with बिंब, 2 without.', '** Show 3 pairs: रूपक vs उपमा (e.g., "जीवन संघर्ष है" vs "जीवन संघर्ष *जैसा* है").', '** Co-write a metaphor: Pick an abstract noun (दुख, आशा, समय). Ask: "अगर यह एक वस्तु/जीव होता, तो क्या होता?', '** Assign a 3-line poem on "बारिश" using 2 बिंब + 1 रूपक. Review together using the checklist: sense words?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_009', difficulty: 'standard',
          question: '**विरोधाभास** वह साहित्यिक युक्ति है जिसमें कथन पहली नज़र में असंगत या बेतुका.',
          hint: 'c6_hin_cbse_06_008 (बिंब और रूपक) दोहराएँ — विशेष रूप से \'रूपक में tenor और vehicle\'.',
          misconception: 'छात्र अक्सर सोचते हैं कि **विरोधाभास = गलती या बेतुकी बात** और **प्रतीक = सजावटी भाषा**। वे "जलते हुए पानी" को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** वह साहित्यिक युक्ति है जिसमें कथन पहली नज़र में असंगत या बेतुका लगता है,',
                  options: ['**विरोधाभास** वह साहित्यिक युक्ति है जिसमें कथन पहली नज़र में असंगत या बेतुका लगता है,', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'c6_hin_cbse_06_008 (बिंब और रूपक) दोहराएँ — विशेष रूप से \'रूपक में tenor और vehicle\' पहचानने का.',
                  misconception: 'छात्र अक्सर सोचते हैं कि **विरोधाभास = गलती या बेतुकी बात** और **प्रतीक = सजावटी भाषा**। वे "जलते हुए पानी" को विरोधाभास मानकर खारिज कर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक सरल विरोधाभास दो (जैसे "शोर में सन्नाटा") और पूछो: "कब महसूस किया?" — वास्तविक अनुभव से जोड़ो। 2.', 'एक जानी-पहचानी वस्तु (जैसे स्कूल का पहला बैग) लो और पूछो: "यह बैग केवल कपड़ा है या तुम्हारी \'बड़े होने की उत्सुकता\' का.', 'पाठ से एक छोटा अंश दो, मिलकर विरोधाभास/प्रतीक छाँटो, फिर छात्र को अकेले कोशिश करने दो। 4.', 'हर बार पूछो: "लेखक ने सीधी बात क्यों नहीं कही?" — लेखकीय इरादे पर लाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे **महत्वपूर्ण शब्द/पद** हैं जो पाठ के केंद्रीय विषय.',
          hint: 'यदि अटके तो **पाठ 6 — मुख्य विषय और संदेश (c6_hin_cbse_06_006)** दोबारा पढ़ें और नायक के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"मुख्य शब्द = कठिन/बड़े शब्द"** और **"संदर्भगत अर्थ = शब्दकोश अर्थ का हिंदी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे **महत्वपूर्ण शब्द/पद** हैं जो पाठ के केंद्रीय विषय, पात्रों की',
                  options: ['पदावली के मुख्य शब्द वे **महत्वपूर्ण शब्द/पद** हैं जो पाठ के केंद्रीय विषय, पात्रों की', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि अटके तो **पाठ 6 — मुख्य विषय और संदेश (c6_hin_cbse_06_006)** दोबारा पढ़ें और नायक के तीन प्रमुख.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"मुख्य शब्द = कठिन/बड़े शब्द"** और **"संदर्भगत अर्थ = शब्दकोश अर्थ का हिंदी अनुवाद"**। **गलत तर्क.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1: ठोस उदाहरण से तोड़ो भ्रांति** — कक्षा में दो वाक्य लिखो: (अ) "वह **पत्थर** दिल इंसान है।" (ब) "रास्ते में एक.', 'कोई \'संवेदनहीनता\' देखी?" जब वे अपने अनुभव से जोड़ेंगे, शब्द **रटे हुए नहीं, जिए हुए (Lived)** बन जाएँगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त वाक्य-रचना (सरल, संयुक्त.',
          hint: 'यदि फँसें तो c6_hin_cbse_06_010 (पदावली: मुख्य शब्द) दोहराएँ — विशेषकर शब्द-भेद और.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "बड़े/लंबे वाक्य = अच्छी हिंदी" और "छोटे वाक्य = कमज़ोर हिंदी"। इसलिए वे जबरन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त वाक्य-रचना (सरल, संयुक्त, मिश्र),',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है किसी रचना में प्रयुक्त वाक्य-रचना (सरल, संयुक्त, मिश्र),', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'यदि फँसें तो c6_hin_cbse_06_010 (पदावली: मुख्य शब्द) दोहराएँ — विशेषकर शब्द-भेद और शब्द-प्रकृति के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "बड़े/लंबे वाक्य = अच्छी हिंदी" और "छोटे वाक्य = कमज़ोर हिंदी"। इसलिए वे जबरन संयुक्त/मिश्र वाक्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान अभ्यास:** छात्र को 5-6 वाक्य दो (मिश्रित प्रकार के)। उसे केवल **क्रियाएँ गिनने** को कहो — हर क्रिया एक उपवाक्य।.', '**प्रसंग-प्रयोग:** दो छोटे पैराग्राफ दो — एक तनाव/क्रिया का (सरल वाक्य उपयुक्त), एक वर्णन/विचार का (मिश्र वाक्य.', 'अगर बदल दें तो क्या होगा?" 3.', '**पुनर्लेखन:** उसी भाव को तीनों प्रकार में लिखवाओ और हर बार **प्रभाव की तुलना** करवाओ। इससे \'नियम\' नहीं, \'चुनाव\' समझ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_012', difficulty: 'standard',
          question: 'Objective questions (वस्तुनिष्ठ प्रश्न) test factual recall or explicit details.',
          hint: 'If stuck, review **Literal Comprehension (Fact Retrieval)** using simple unseen passages.',
          misconception: '**Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered by **guessing the moral of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Objective questions (वस्तुनिष्ठ प्रश्न) test factual recall or explicit details directly',
                  options: ['Objective questions (वस्तुनिष्ठ प्रश्न) test factual recall or explicit details directly', 'पृष्ठभूमि (Background) कहानी के समय, स्थान, सामाजिक-सांस्कृतिक परिवेश और ऐतिहासिक संदर्भ', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-परिणाम (cause-effect) से जुड़ा हुआ क्रम', 'पाठ्य-परिवेश (setting) कहानी के घटित होने का समय, स्थान, भौगोलिक परिस्थितियाँ,'],
                  hint: 'If stuck, review **Literal Comprehension (Fact Retrieval)** using simple unseen passages — practice.',
                  misconception: '**Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered by **guessing the moral of the story** or writing.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-Step Remediation:** 1.', '**Isolate the Skill:** Give the student a single paragraph (3-4 lines).', 'Ask: "Underline the sentence that *directly answers* this factual question." Then ask: "Circle the words/phrases that.', '**The "Evidence Sandwich" Drill:** Provide the Inference (e.g., "The character is brave").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_06_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered by **guessing the moral of the.',
          parts: [
                { id: 'a', prompt: 'एक परीक्षा में आशय-सूचक प्रश्न आया: "लेखक ने शीर्षक \'अंतिम पाठ\' क्यों रखा?" छात्र A ने उत्तर दिया: "क्योंकि यह पाठ्यपुस्तक का अंतिम अध्याय है।" छात्र B ने.', answer: '**Correct Answer:** **छात्र B का उत्तर बेहतर है।** **Justification:** छात्र B ने',
                  options: ['**Correct Answer:** **छात्र B का उत्तर बेहतर है।** **Justification:** छात्र B ने', 'Implied Meaning', 'We should respect elders', 'What does the child\'s action reveal about his character?'],
                  hint: 'If stuck, review **Literal Comprehension (Fact Retrieval)** using simple unseen passages — practice.',
                  misconception: '**Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered by **guessing the moral of the story** or writing.' },
                { id: 'b', prompt: 'पाठ 6 (मान लीजिए \'संसार पुस्तक है\' या कोई भी पाठ) के आधार पर एक **आशय-सूचक प्रश्न** स्वयं बनाइए जिसका उत्तर \'हाँ\' या \'नहीं\' में न हो, और उसका उत्तर भी **पाठ के.', answer: '**Criteria for Good Answer:** 1',
                  options: ['**Criteria for Good Answer:** 1', 'Implied Meaning', 'We should respect elders', 'What does the child\'s action reveal about his character?'],
                  hint: 'If stuck, review **Literal Comprehension (Fact Retrieval)** using simple unseen passages — practice.',
                  misconception: '**Specific Error:** Students believe that "Implied Meaning" (आशय) questions are answered by **guessing the moral of the story** or writing.' }
          ],
            remediations: { 'specific-error-students-believe-that': { steps: ['**Step-by-Step Remediation:** 1.', '**Isolate the Skill:** Give the student a single paragraph (3-4 lines).', 'Ask: "Underline the sentence that *directly answers* this factual question." Then ask: "Circle the words/phrases that.', '**The "Evidence Sandwich" Drill:** Provide the Inference (e.g., "The character is brave").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
