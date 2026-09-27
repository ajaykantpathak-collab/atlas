import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hin_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hin_ch05_p1: SimDef = {
    id: 'v3_c8_hin_ch05_p1',
    title: 'पाठ 5 · Part 1/3',
    subtitle: 'यह नोड केवल पाठ 5 के रचनाकार के जीवन परिचय, उनके युग की प्रमुख प्रवृत्तियों, और उनकी लेखन.',
    classLevel: 8, subject: 'hin', topic: 'पाठ 5 · Part 1/3',
    chapters: ['c8_hin_ch05'],
    nodeIds: ['c8_hin_cbse_05_001', 'c8_hin_cbse_05_002', 'c8_hin_cbse_05_003', 'c8_hin_cbse_05_004', 'c8_hin_cbse_05_005', 'c8_hin_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 8 learner', intro: 'कल्पना कीजिए आपको एक पुराना पारिवारिक फ़ोटो एल्बम मिलता है जिसमें तस्वीरें तो हैं लेकिन कोई कैप्शन नहीं — आप.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'एक लघु कथानक (५ घटनाएँ) रचें और उसे दो भिन्न संरचनाओं में प्रस्तुत करने की रूपरेखा दें: (क) रैखिक (linear), (ख) फ्लैशबैक युक्त (non-linear)। समझाएँ कि दूसरी.',
        options: ['**कथानक (कालक्रम):** १', 'memories', 'thoughts'],
        answer: '**कथानक (कालक्रम):** १',
        hook: 'Students confuse **chronological order of events** (plot) with **order of narration** (structure), and worse, they.',
    },
    teaching: [
        { title: 'पाठ 5 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ के लेखक के जीवन परिचय, उनकी साहित्यिक यात्रा, रचनाकाल की सामाजिक-सांस्कृतिक परिस्थितियों, और उनकी लेखन शैली की प्रमुख विशेषताओं का संक्षिप्त विवरण जिससे.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hin_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 5 — पृष्ठभूमि', 'पाठ 5 — कथानक', 'पाठ 5 — पाठ्य-परिवेश', 'पाठ 5 — पात्र-चित्रण', 'पाठ 5 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_002', title: 'पाठ 5 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: 'Think of your favorite web series — why does Episode 1 sometimes show the *ending* first, then jump to "Three Weeks Earlier"?',
            decisions: [{ prompt: 'कथानक (plot) और आख्यान-संरचना (narrative structure) में मूल अंतर क्या है? एक वाक्य में लिखें।', options: [
                { text: 'कथानक घटनाओं का वास्तविक कालानुक्रमिक क्रम है; आख्यान-संरचना उन्हें प्रस्तुत करने का', outcome: 'कथानक घटनाओं का वास्तविक कालानुक्रमिक क्रम है; आख्यान-संरचना उन्हें प्रस्तुत करने का लेखकीय ढंग है।.' },
                { text: 'memories', outcome: 'Not quite — Students confuse **chronological order of events** (plot) with **order of narration** (structure).', reveals: 'students-confuse-chronological-order-of' },
                { text: 'thoughts', outcome: 'Not quite — Students confuse **chronological order of events** (plot) with **order of narration** (structure).', reveals: 'students-confuse-chronological-order-of' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_003', title: 'पाठ 5 — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: 'Think of your favorite scary movie scene — what makes it scary *before* the ghost appears? The creaking floorboard, cold wind, flickering bulb, 3 AM silence.',
            decisions: [{ prompt: 'पाठ्य-परिवेश (textual setting) के तीन मुख्य घटक कौन-से हैं जो वातावरण बनाने में सहायक होते हैं?', options: [
                { text: '**Correct answer**: काल (time), स्थान (place), और संवेदनात्मक विवरण (sensory details', outcome: '**Correct answer**: काल (time), स्थान (place), और संवेदनात्मक विवरण (sensory details — दृश्य.' },
                { text: 'time and place', outcome: 'Not quite — **Exact error**: Students treat "setting = time + place" as a **fill-in-the-blank fact** (e.g.', reveals: 'exact-error-students-treat-setting' },
                { text: 'How does the description of the dusty window *create* loneliness?', outcome: 'Not quite — **Exact error**: Students treat "setting = time + place" as a **fill-in-the-blank fact** (e.g.', reveals: 'exact-error-students-treat-setting' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hin_cbse_05_006', title: 'The bigger picture',
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
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है — पाठ के लेखक के जीवन परिचय, उनकी.',
          hint: 'अगर अटका हुआ लगे तो कक्षा 7 के किसी भी पाठ (c7_hin_cbse_01_001 से c7_hin_cbse_10_001 तक).',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्युतिथि, प्रमुख रचनाओं की सूची, और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी कहानी के मुख्य पात्र के बाहरी दिखावे,'],
                  hint: 'अगर अटका हुआ लगे तो कक्षा 7 के किसी भी पाठ (c7_hin_cbse_01_001 से c7_hin_cbse_10_001 तक) का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'रचनाकार परिचय\' का अर्थ है — जन्मतिथि, मृत्युतिथि, प्रमुख रचनाओं की सूची, और पुरस्कार याद कर लेना।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहचान कराएं:** छात्र से पूछें — "तुमने जो तीन तथ्य लिखे (जन्म, पुरस्कार, रचनाएँ), उनमें से *कौन-सा एक* इस पाठ के किसी.', 'पेंसिल से गोला लगाओ।" (आमतौर पर कोई नहीं जुड़ेगा)। 2.', '**पुल बनाएं:** शिक्षक स्वयं एक जुड़ाव दिखाएं — "देखो, लेखक ने 12 साल की उम्र में पिता को खोया था; पाठ में नायक भी 12.', '**अभ्यास कराएं:** छात्र से कहें — "अब तुम लेखक के जीवन से *एक* और प्रसंग चुनो और पाठ के *एक* दृश्य से जोड़कर दो वाक्य.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता.',
          hint: 'Review "event sequencing" and "flashback identification" from Class 7 Chapter 5.',
          misconception: 'Students confuse **chronological order of events** (plot) with **order of narration** (structure), and worse, they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि',
                  options: ['कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social', 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी कहानी के मुख्य पात्र के बाहरी दिखावे,'],
                  hint: 'Review "event sequencing" and "flashback identification" from Class 7 Chapter 5.',
                  misconception: 'Students confuse **chronological order of events** (plot) with **order of narration** (structure), and worse, they treat structural devices.' }
          ],
            remediations: { 'students-confuse-chronological-order-of': { steps: ['**Concrete mapping exercise:** Take a familiar story (e.g., \'रामायण\' or a recent movie).', 'Have the student draw two timelines: Top line = actual event order (Plot).', 'Bottom line = order in the text/film (Structure).', 'Mark every jump/flashback with an arrow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse **chronological order of events** (plot) with **order of narration** (structure), and worse, they.',
          parts: [
                { id: 'a', prompt: 'एक लघु कथानक (५ घटनाएँ) रचें और उसे दो भिन्न संरचनाओं में प्रस्तुत करने की रूपरेखा दें: (क) रैखिक (linear), (ख) फ्लैशबैक युक्त (non-linear)। समझाएँ कि दूसरी.', answer: '**कथानक (कालक्रम):** १',
                  options: ['**कथानक (कालक्रम):** १', 'memories', 'thoughts'],
                  hint: 'Review "event sequencing" and "flashback identification" from Class 7 Chapter 5.',
                  misconception: 'Students confuse **chronological order of events** (plot) with **order of narration** (structure), and worse, they treat structural devices.' }
          ],
            remediations: { 'students-confuse-chronological-order-of': { steps: ['**Concrete mapping exercise:** Take a familiar story (e.g., \'रामायण\' or a recent movie).', 'Have the student draw two timelines: Top line = actual event order (Plot).', 'Bottom line = order in the text/film (Structure).', 'Mark every jump/flashback with an arrow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and.',
          hint: 'Review "संवेदनात्मक विवरण (sensory details)" identification — practice with non-literary.',
          misconception: '**Exact error**: Students treat "setting = time + place" as a **fill-in-the-blank fact** (e.g., "Story happens.',
          parts: [
                { id: 'a', prompt: 'एक नई स्थिति में समान कौशल लागू करें: आप एक कहानी लिख रहे हैं जहाँ नायक एक पुराने पुस्तकालय में रात बिताता है। **चार विशिष्ट संवेदनात्मक विवरण** लिखें जो.', answer: '**Sample strong answer**: 1',
                  options: ['**Sample strong answer**: 1', 'अंधेरा था', 'डरावना था', 'How does the description of the dusty window *create* loneliness?'],
                  hint: 'Review "संवेदनात्मक विवरण (sensory details)" identification — practice with non-literary texts.',
                  misconception: '**Exact error**: Students treat "setting = time + place" as a **fill-in-the-blank fact** (e.g., "Story happens in 1990s, village = done").' }
          ],
            remediations: { 'exact-error-students-treat-setting': { steps: ['**Step-by-step remediation**: 1.', '**Sensory Hunt**: Give a 3-sentence description (e.g., "The kitchen smelled of burnt toast.', 'Cold air seeped under the door.").', 'Ask: "Circle every word that appeals to a sense.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_004', difficulty: 'standard',
          question: 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी कहानी के मुख्य पात्र के बाहरी.',
          hint: 'यदि फंसे हुए महसूस करें तो कक्षा 7 में पढ़े गए पात्र-चित्रण: नायक/प्रमुख पात्र.',
          misconception: 'छात्र अक्सर प्रमुख पात्र के "बाहर से देखे जाने वाले गुणों" (जैसे उसकी शक्ति, बहादुरी, या दिखावा) को ही उसका पूरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी कहानी के मुख्य पात्र के बाहरी दिखावे,',
                  options: ['पात्र-चित्रण: नायक/प्रमुख पात्र का अर्थ है किसी कहानी के मुख्य पात्र के बाहरी दिखावे,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि फंसे हुए महसूस करें तो कक्षा 7 में पढ़े गए पात्र-चित्रण: नायक/प्रमुख पात्र (c7_hin_cbse_04_004).',
                  misconception: 'छात्र अक्सर प्रमुख पात्र के "बाहर से देखे जाने वाले गुणों" (जैसे उसकी शक्ति, बहादुरी, या दिखावा) को ही उसका पूरा व्यक्तित्व मान लेते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें कि वह पात्र के एक बाहरी गुण (जैसे "बहादुर") को चुनें और फिर पाठ में उस गुण के दो अलग-अलग उदाहरण ढूंढे.', 'अगर नहीं, तो कौन सा उदाहरण उसके बारे में अधिक सच बताता है और क्यों?" इससे छात्र को यह समझने में मदद मिलेगी कि बाहरी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ बातचीत, संघर्ष या.',
          hint: 'यदि फँस जाएँ, तो पहले नायक का \'चरित्र-मानचित्र\' (character map) बनाएँ — उसके 3 प्रमुख.',
          misconception: 'छात्र अक्सर सहायक पात्र को \'माइनर कैरेक्टर\' (minor character) समझ लेते हैं और सोचते हैं कि उनका विश्लेषण कम गहराई का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ बातचीत, संघर्ष या सहयोग के',
                  options: ['सहायक पात्र वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ बातचीत, संघर्ष या सहयोग के', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'यदि फँस जाएँ, तो पहले नायक का \'चरित्र-मानचित्र\' (character map) बनाएँ — उसके 3 प्रमुख गुण, 2 प्रमुख.',
                  misconception: 'छात्र अक्सर सहायक पात्र को \'माइनर कैरेक्टर\' (minor character) समझ लेते हैं और सोचते हैं कि उनका विश्लेषण कम गहराई का होना चाहिए। वे \'सहायक\'.' }
          ],
            remediations: { 'minor-character-secondary-less-important': { steps: ['छात्र से कहें: "किसी ऐसे दोस्त के बारे में सोचो जो तुम्हारी जिंदगी में \'साइडकिक\' नहीं, बल्कि बराबर का हिस्सेदार है.', 'फिर पाठ से एक सहायक पात्र चुनकर वही प्रश्न पूछें: "अगर यह पात्र न होता, तो नायक का फैसला/क्लाइमेक्स/संदेश कैसे बदलता?".', 'छात्र को \'पात्र-मानचित्र\' (character map) बनाने को कहें: केंद्र में नायक, चारों ओर सहायक पात्र, तीरों पर लिखें — \'क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_hin_cbse_05_006', difficulty: 'standard',
          question: 'मुख्य विषय (main theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण पाठ.',
          hint: 'अगर अटके तो c8_hin_cbse_05_002 (कथानक) और c8_hin_cbse_05_004 (नायक चित्रण) दोबारा पढ़ें.',
          misconception: 'छात्र अक्सर "मुख्य विषय" को "कहानी का सारांश" (summary) या "नायक की मुख्य समस्या" समझ लेते हैं। उदाहरण: पाठ 5 में वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (main theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण पाठ में',
                  options: ['मुख्य विषय (main theme) वह केंद्रीय विचार या सार्वभौमिक सत्य है जो संपूर्ण पाठ में', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी की रीढ़ बनाता है, जबकि', 'पाठ्य-परिवेश (textual setting) refers to the time, place, physical details, and social'],
                  hint: 'अगर अटके तो c8_hin_cbse_05_002 (कथानक) और c8_hin_cbse_05_004 (नायक चित्रण) दोबारा पढ़ें — विषय.',
                  misconception: 'छात्र अक्सर "मुख्य विषय" को "कहानी का सारांश" (summary) या "नायक की मुख्य समस्या" समझ लेते हैं। उदाहरण: पाठ 5 में वे लिख देते हैं "मुख्य.' }
          ],
            remediations: { 'summary-5-what-happens-what': { steps: ['(1) छात्र से कहें: "पाठ की तीन बड़ी घटनाएँ लिखो। अब प्रत्येक के आगे लिखो: \'इससे लेखक क्या कहना चाहता है?\' — तीनों उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
