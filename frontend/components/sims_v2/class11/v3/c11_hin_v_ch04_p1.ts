import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch04_p1: SimDef = {
    id: 'v3_c11_hin_v_ch04_p1',
    title: 'पाठ 4 · Part 1/3',
    subtitle: 'Test the claim that the most local art travels the farthest.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 4 · Part 1/3',
    chapters: ['c11_hin_v_ch04'],
    nodeIds: ['c11_hin_v_cbse_04_001', 'c11_hin_v_cbse_04_002', 'c11_hin_v_cbse_04_003', 'c11_hin_v_cbse_04_004', 'c11_hin_v_cbse_04_005', 'c11_hin_v_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader mapping Indian art\'s hidden continuum', intro: 'Mandana on a mud wall in a village, Kathak in a Jaipur auditorium — the essay asks what these share, not what divides them.', goal: 'Analyse the folk-classical continuum and the essay\'s classification-driven structure.' },
    discovery: {
        question: '\'The more local an art is in its expression, the more universal it becomes\' — can that paradox actually hold?',
        options: ['Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes', 'No — local art stays local by definition', 'Yes — but only after foreigners validate it', 'No — universality requires abandoning the local'],
        answer: 'Yes — Warli\'s rice-paste spirals use only circle, triangle and square: the most local cosmology drawn in the most universal shapes',
        hook: 'Folk and classical aren\'t two boxes — Kathak grew out of kathavachaks and temple dances sank back into villages; the continuum never stops trading.',
    },
    teaching: [
        { title: 'पाठ 4 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace how the essay runs every art form through the same folk→classical→living-continuity arc, and judge what that repeated pattern proves.',
        labels: ['पाठ 4 — पृष्ठभूमि', 'पाठ 4 — कथानक', 'पाठ 4 — पाठ्य-परिवेश', 'पाठ 4 — पात्र-चित्रण', 'पाठ 4 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_005', title: 'पाठ 4 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 4\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'सहायक पात्र की परिभाषा देते हुए बताइए कि वह नायक से किस मूलभूत बात में भिन्न होता है?', options: [
                { text: '**Correct Answer:** सहायक पात्र वह है जो नायक के साथ अंतःक्रिया करके कथानक को गति देता', outcome: '**Correct Answer:** सहायक पात्र वह है जो नायक के साथ अंतःक्रिया करके कथानक को गति देता है, नायक के.' },
                { text: 'सहायक पात्र कम महत्वपूर्ण होता है', outcome: 'Not quite — **"Supporting characters are just \'less important\' versions of the protagonist."** Students treat.', reveals: 'supporting-characters-are-just-less' },
                { text: 'कहानी में कम आता है', outcome: 'Not quite — **"Supporting characters are just \'less important\' versions of the protagonist."** Students treat.', reveals: 'supporting-characters-are-just-less' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_006', title: 'पाठ 4 — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'वितान भाग-1 — पाठ 4\' में \'वितान भाग-1 — पाठ 4\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the primary theme of Chapter 4 "Hkkjrh; dykvksa esa cstksM+yrk" as stated in the NCERT Vitan textbook?', options: [
                { text: 'The primary theme is the organic unity and continuous evolution of Indian arts (painting,', outcome: 'The primary theme is the organic unity and continuous evolution of Indian arts (painting, music.' },
                { text: 'Indian arts are very old', outcome: 'Not quite — Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts".', reveals: 'students-confuse-theme-with-topic' },
                { text: 'There are many types of Indian art', outcome: 'Not quite — Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts".', reveals: 'students-confuse-theme-with-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school exhibition on \'Indian Arts\', a student sorts every item into two rigid boxes — \'folk/tribal\' (Mandana, Warli, Madhubani) and \'classical\' (Kathak, Mughal miniatures) — insisting the categories never mix, \'like traditional vs modern.\'',
            decisions: [{ prompt: 'What does the chapter say about that border?', options: [
                { text: 'Show the continuum: the chapter argues folk and classical are endpoints in constant संवाद — folk forms get codified into classical (Kathak rising from the kathavachak tradition), classical forms dissolve back into folk (temple dance becoming village ritual), and both root in the Natya Shastra. Crucially, Indian arts were never museum objects — they lived inside births, harvests and worship.', outcome: 'The exhibition gets a third section — \'the dialogue\': Kathak\'s folk origins, Madhubani\'s codification — proving the categories are porous by design.' },
                { text: 'Keep the two boxes — separate categories make the exhibition clearer for visitors.', outcome: 'Clarity here falsifies: the text\'s central claim is fluidity, and a rigid folk/classical wall hides exactly the unity-in-diversity the chapter demonstrates.', reveals: 'folk-classical-are-fixed-boxes' },
                { text: 'Treat the art list as the structure — painting, then music, then dance is just a table of contents.', outcome: 'The sequence is argumentative: each art form follows the same folk→classical→modern trajectory to prove the thesis that arts are rooted in life.', reveals: 'structure-is-topic-list' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Bhimbetka\'s cave lines, a Rajasthani wall at Diwali, a Tanjore court repertoire — one argument repeated until it becomes evidence.',
            decisions: [{ prompt: 'What comes next? पाठ 4 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 4 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the Class 10 History chapter "Print Culture and the Modern World".',
          misconception: 'Students treat "folk art" (yksddyk) and "classical art" (\'kkL=kh; dyk) as two separate, fixed categories - like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 4\' का कथानक — \'वितान भाग-1 — पाठ 4\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'वितान भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review the Class 10 History chapter "Print Culture and the Modern World" (section.',
                  misconception: 'Students treat "folk art" (yksddyk) and "classical art" (\'kkL=kh; dyk) as two separate, fixed categories - like "traditional vs modern.".' }
          ],
            remediations: { 'students-treat-folk-art-yksddyk': { steps: ['Ask the student to list 5 Indian art forms they know.', 'For each, ask "Is this folk or classical?" - they\'ll likely categorize confidently.', 'Show the counter-evidence from text: "Kathak started as temple storytelling (folk) → became court dance (classical) →.', 'Have them re-read the paragraph on page 61: "\'kkL=kh; vkSj yksddykvksa osQ chp dHkh u •Re gksus okyk laokn gh budh rkdr.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_002', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 4\' का कथानक — \'वितान भाग-1 — पाठ 4\' — वितान भाग-1 का पाठ।.',
          hint: 'यदि अटका महसूस हो तो **c11_hin_v_cbse_04_001** के \'रचनाकार की दृष्टि\' खंड को दोहराएँ.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'फ्लैशबैक\' (Analepsis) केवल अतीत में जाना है**, और **\'फ्लैशफॉरवर्ड\' (Prolepsis).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 4\' का कथानक — \'वितान भाग-1 — पाठ 4\' — वितान भाग-1 का पाठ। पाठ का',
                  options: ['\'वितान भाग-1 — पाठ 4\' का कथानक — \'वितान भाग-1 — पाठ 4\' — वितान भाग-1 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'वितान भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_v_cbse_04_001** के \'रचनाकार की दृष्टि\' खंड को दोहराएँ — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'फ्लैशबैक\' (Analepsis) केवल अतीत में जाना है**, और **\'फ्लैशफॉरवर्ड\' (Prolepsis) केवल भविष्य देखना.' }
          ],
            remediations: { 'analepsis': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें: "घड़ी की सुई पीछे घुमाना (समय) और मशीन का पुर्जा खोलकर खराबी ढूंढना (कारण).', '**चरण 2 — सूक्ष्म पठन:** पाठ्य-पुस्तक के किसी फ्लैशबैक अंश (जैसे \'बड़े घर की बेटी\' का विवाह प्रसंग) दें और पूछें: "यह.', 'और *क्यों* रखा गया है यहाँ?" छात्र को **काल (When)** और **कार्य (Function)** अलग-अलग कॉलम में लिखवाएँ। 3.', '**चरण 3 — तुलनात्मक अभ्यास:** दो कहानियाँ दें — एक में फ्लैशबैक \'कारण\' के लिए, दूसरे में केवल \'सजावट\' के लिए। छात्र से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_003', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके तो c11_hin_v_cbse_04_001 के \'ऐतिहासिक-सांस्कृतिक पृष्ठभूमि\' खंड को दोबारा पढ़ें.',
          misconception: 'छात्र \'वातावरण\' (atmosphere/mood) और \'परिवेश\' (setting/milieu) को पर्यायवाची मान लेते हैं। वातावरण = भावनात्मक तापमान.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'वितान भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 4\' का कथानक — \'वितान भाग-1 — पाठ 4\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटके तो c11_hin_v_cbse_04_001 के \'ऐतिहासिक-सांस्कृतिक पृष्ठभूमि\' खंड को दोबारा पढ़ें — विशेषकर.',
                  misconception: 'छात्र \'वातावरण\' (atmosphere/mood) और \'परिवेश\' (setting/milieu) को पर्यायवाची मान लेते हैं। वातावरण = भावनात्मक तापमान (भय, उल्लास, तनाव) जो.' }
          ],
            remediations: { 'atmosphere-mood-setting-milieu': { steps: ['चरण 1: छात्र से कहें — "किसी दृश्य के केवल तीन भौतिक विवरण लिखो (जैसे: टूटी खिड़की, बजबजाती नाली, दीवार पर पान की.', '(वातावरण)।" चरण 3: पूछें — "यहीं रहने वाला एक किशोर इन विवरणों के कारण कौन-सा निर्णय ले सकता है?', '(परिवेश का सक्रिय प्रभाव)।" चरण 4: दोनों उत्तरों को आमने-सामने रखकर अंतर स्पष्ट करें — "पहला पाठक की अनुभूति है, दूसरा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_004', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि छात्र अटका हो, तो **\'पाठ्य-परिवेश और वातावरण\' (नोड 003)** के नोट्स दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि नायक के गुणों की **सूची (List of traits)** बनाना ही पात्र-चित्रण है। वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'वितान भाग-1 — पाठ 4\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 4\' का कथानक — \'वितान भाग-1 — पाठ 4\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 4\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र अटका हो, तो **\'पाठ्य-परिवेश और वातावरण\' (नोड 003)** के नोट्स दोबारा पढ़ें — विशेषकर वह.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि नायक के गुणों की **सूची (List of traits)** बनाना ही पात्र-चित्रण है। वे लिखते हैं: "नायक ईमानदार.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**माइक्रो-टास्क**: छात्र से कहें — "पाठ से **केवल तीन वाक्य** छाँटिए जहाँ नायक **कुछ करता है** (सोचता/बोलता नहीं, करता.', '**PEEL फ्रेम भरवाएँ**: Point (गुण) → Evidence (उद्धृत वाक्य) → Explanation (यह क्रिया गुण को *कैसे* सिद्ध करती है) →.', '**तुलनात्मक विश्लेषण**: सहायक पात्र (नोड 005) के समान गुण (जैसे: दोनों साहसी) लेकर पूछें — "दोनों की साहस में **क्या.', 'नायक की साहस **कथानक का केंद्र** कैसे है?" इससे \'प्रमुख पात्र\' की **कथात्मक केंद्रीयता** स्पष्ट होगी। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_005', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 4\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'If stuck, return to **c11_hin_v_cbse_04_004** and re-do the protagonist\'s PEEL analysis.',
          misconception: '**"Supporting characters are just \'less important\' versions of the protagonist."** Students treat "supporting" as.',
          parts: [
                { id: 'a', prompt: 'मान लीजिए पाठ में एक सहायक पात्र केवल **एक बार** आता है, परन्तु उसका संवाद नायक का जीवन बदल देता है। ऐसे पात्र का विश्लेषण कैसे करेंगे? चरण लिखिए।', answer: '**Correct Answer Steps:** 1',
                  options: ['**Correct Answer Steps:** 1', 'यह पात्र महत्वपूर्ण नहीं क्योंकि कम आया'],
                  hint: 'If stuck, return to **c11_hin_v_cbse_04_004** and re-do the protagonist\'s PEEL analysis for 3 key.',
                  misconception: '**"Supporting characters are just \'less important\' versions of the protagonist."** Students treat "supporting" as a **hierarchy.' },
                { id: 'b', prompt: 'दो सहायक पात्रों की तुलना कीजिए: एक जो नायक का **विश्वासपात्र (confidant)** है, दूसरा जो **विरोधी (antagonist foil)** है। दोनों नायक के चरित्र-उद्घाटन में कैसे.', answer: '**Correct Answer:** *विश्वासपात्र*: नायक के आंतरिक द्वंद्व को **बाह्य करता है**',
                  options: ['**Correct Answer:** *विश्वासपात्र*: नायक के आंतरिक द्वंद्व को **बाह्य करता है**', 'मुझे डर लगता है कि मैं पिता जैसा न बन जाऊँ', 'चुप रहने से अन्याय बढ़ता है'],
                  hint: 'If stuck, return to **c11_hin_v_cbse_04_004** and re-do the protagonist\'s PEEL analysis for 3 key.',
                  misconception: '**"Supporting characters are just \'less important\' versions of the protagonist."** Students treat "supporting" as a **hierarchy.' }
          ],
            remediations: { 'supporting-characters-are-just-less': { steps: ['**Re-read the text with a "function lens"**: Pick ONE supporting character.', 'Make a 3-column table: *Scene | What they do/say | What this REVEALS about protagonist/theme*.', '**Ask the "Removal Test" aloud**: "If I delete this character, what specific thing breaks — a revelation, a conflict,.', '**Practice the PEEL paragraph**: Point (Function), Evidence (Quote), Explanation (Mechanism), Link (Theme).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_04_006', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 4\' का मुख्य विषय — \'वितान भाग-1 — पाठ 4\' का केंद्रीय भाव और.',
          hint: 'Review the \'Topic vs Theme\' distinction using a परिचित text (e.g., a Class 10 story).',
          misconception: 'Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts" or "The theme.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the chapter establishes the connection between \'yksd dyk\' (folk art) and \'\'kkL=kh; dyk\' (classical art) as part of the primary.', answer: 'The chapter argues that classical arts evolved from folk traditions',
                  options: ['The chapter argues that classical arts evolved from folk traditions', 'folk art is for villagers, classical is for kings'],
                  hint: 'Review the \'Topic vs Theme\' distinction using a परिचित text (e.g., a Class 10 story) — write both.',
                  misconception: 'Students confuse \'theme\' with \'topic\' or \'subject matter\'. They write: "The theme is Indian arts" or "The theme is types of Indian.' }
          ],
            remediations: { 'students-confuse-theme-with-topic': { steps: ['Ask the student to re-read the FIRST and LAST paragraphs of the chapter only — these frame the argument.', 'Have them highlight every sentence that makes a CLAIM (uses words like "is", "remains", "reflects", "evolves from") vs.', 'Ask: "If you had to explain this chapter to someone who never saw Indian art, what ONE idea would you want them.', 'Guide them to phrase that one idea as a complete sentence with a verb — that\'s the theme. Do not let them list examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
