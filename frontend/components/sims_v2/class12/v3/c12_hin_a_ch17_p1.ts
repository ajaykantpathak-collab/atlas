import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch17_p1: SimDef = {
    id: 'v3_c12_hin_a_ch17_p1',
    title: 'कुटज · Part 1/3',
    subtitle: 'The courtyard is its mornings — not its name',
    classLevel: 12, subject: 'hin_a', topic: 'कुटज · Part 1/3',
    chapters: ['c12_hin_a_ch17'],
    nodeIds: ['c12_hin_a_cbse_17_001', 'c12_hin_a_cbse_17_002', 'c12_hin_a_cbse_17_003', 'c12_hin_a_cbse_17_004', 'c12_hin_a_cbse_17_005', 'c12_hin_a_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Philosophical-essay reader', intro: 'A scholar who ran All India Radio asks whether a word should come from the dictionary or from the courtyard where life happens.', goal: 'Read Aangan through naam-versus-svaroop — social labels against lived essence, tyag as uncelebrated art.' },
    discovery: {
        question: 'An Aadhaar number opens every door — subsidies, banks, travel — yet it isn\'t you. A 1950s essayist said this exact thing about \'naam\' and \'svaroop.\' What\'s the split?',
        options: ['Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth', 'Aadhaar is fake identity', 'Names are always wrong', 'Svaroop means appearance'],
        answer: 'Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth',
        hook: 'Mishra insists on \'aangan\' over the Sanskritised \'angana\' — the lived word carries cow-dung smell and children\'s play; the formal word is sterile. And tyag is redefined: not self-denial or heroic martyrdom but daily, uncelebrated duty — a mother\'s life as art.',
    },
    teaching: [
        { title: 'कुटज — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand in a courtyard at dawn: watch the space reveal itself as process, not object; weigh name against essence; and test whether sacrifice is suffering or transcendence.',
        labels: ['कुटज — पृष्ठभूमि और', 'कुटज — कथानक और', 'कुटज — पाठ्य-परिवेश और', 'कुटज — पात्र-चित्रण: नायक/प्रमुख', 'कुटज — पात्र-चित्रण: सहायक', 'कुटज — मुख्य विषय'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_001', title: 'कुटज — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 17 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "oqQVt" and what are three key roles he held that influenced his writing?', options: [
                { text: 'The author is Pt', outcome: 'The author is Pt. Govind Narayan Mishra (1907–1979). Three key roles: (1) Sanskrit scholar and.' },
                { text: 'Hindi writer', outcome: 'Not quite — Students treat "Before You Read" as optional background reading and skip to the text.', reveals: 'students-treat-before-you-read' },
                { text: 'only "Hindi writer" or confusing him with another Mishra', outcome: 'Not quite — Students treat "Before You Read" as optional background reading and skip to the text.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_005', title: 'कुटज — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'Name the three most prominent supporting characters in "oqQVt" and state one defining trait for each, based solely on the text.', options: [
                { text: 'Correct answer: (1) Jaghe (the old woman)', outcome: 'Correct answer: (1) Jaghe (the old woman) — resilient dignity / stubborn attachment to the house.' },
                { text: 'the old woman', outcome: 'Not quite — Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition").', reveals: 'students-treat-supporting-characters-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a housing-for-all poster contest, a teammate\'s entry shows a glossy apartment block with the line \'shelter = square feet.\' You recall the essay that starts on a mud-walled village lane and ends in a Sanskrit verse on what makes a dwelling a home.',
            decisions: [{ prompt: 'How would the essay \'कुटिर\' reframe the poster?', options: [
                { text: 'Shift the claim from floor area to shelter-as-value — the essay builds from one village lane to etymology to a universal ideal precisely to show a home is protection offered without discrimination, not a purchasable quantity.', outcome: 'The chapter\'s method is the message: digression from concrete scene to philosophy is how the essay lifts \'house\' into \'home\' — the poster needs that ascent, not a bigger number.' },
                { text: 'Keep the poster — for a scheme, square footage is the honest measurable promise.', outcome: 'Measurability isn\'t the essay\'s unit of meaning: the text argues a dwelling earns its name by what it shelters, and a poster that equates home with area repeats the reduction the essay spends its length undoing.', reveals: 'home-equals-area' },
                { text: 'Drop both and show a Sanskrit shloka alone — the philosophical ending is the essay\'s best part.', outcome: 'The verse lands because the village lane came first — the essay\'s frame pairs particular scene with universal ideal; keeping the abstraction without the mud walls cuts the argument\'s root.', reveals: 'abstraction-alone-convinces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate the label from the life — and hear a Sanskrit scholar argue that the truest word is the one that\'s been lived in.',
            decisions: [{ prompt: 'What comes next? कुटज · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कुटज · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on Progressive Writers\' Movement, revisit **c11_hin_ar_cbse_01_001**.',
          misconception: 'Students treat "Before You Read" as optional background reading and skip to the text.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "oqQVt" and what are three key roles he held that influenced his writing?', answer: 'The author is Pt',
                  options: ['The author is Pt', 'Hindi writer', 'only "Hindi writer" or confusing him with another Mishra'],
                  hint: 'If stuck on Progressive Writers\' Movement, revisit **c11_hin_ar_cbse_01_001** (Premchand\'s context).',
                  misconception: 'Students treat "Before You Read" as optional background reading and skip to the text.' },
                { id: 'b', prompt: 'Apply the distinction between "uke" (name) and ":i" (form/essence) to a real-life example from contemporary India (e.g., Aadhaar, caste certificates, social.', answer: 'Example: **Aadhaar card**',
                  options: ['Example: **Aadhaar card**', 'Aadhaar *is* identity', 'uke blfy, cM+k gksrk gS fd mls lekt dh LohÑfr feyh gksrh gS'],
                  hint: 'If stuck on Progressive Writers\' Movement, revisit **c11_hin_ar_cbse_01_001** (Premchand\'s context).',
                  misconception: 'Students treat "Before You Read" as optional background reading and skip to the text.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['129–130 (author bio) and 130–131 (essay opening)** with a pencil.', 'Underline every proper noun (Premchand, Dinkar, All India Radio, Sanskrit, Progressive Writers) and every key term.', '**Create a 3-column table**: Column 1 = Term, Column 2 = Sanskrit root / literal meaning, Column 3 = Mishra\'s expanded.', 'Fill for: oqQVt, owQVt, uke, :i, thuk, LokFkZ, ftthfo"kk.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_002', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ।.',
          hint: 'यदि फ्लैशबैक और समानांतर कथासूत्र समझ न आएँ तो c11_hin_a_cbse_02_002 (आवारा मसीहा — कथानक.',
          misconception: 'छात्र \'कथानक\' और \'आख्यान-संरचना\' को समानार्थी मानते हैं और परीक्षा में दोनों के लिए घटनाओं का सारांश लिख देते हैं। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-2 — पाठ 17\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि फ्लैशबैक और समानांतर कथासूत्र समझ न आएँ तो c11_hin_a_cbse_02_002 (आवारा मसीहा — कथानक और.',
                  misconception: 'छात्र \'कथानक\' और \'आख्यान-संरचना\' को समानार्थी मानते हैं और परीक्षा में दोनों के लिए घटनाओं का सारांश लिख देते हैं। वे नहीं समझते कि कथानक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कुटज की केवल तीन मुख्य घटनाएँ लिखो (बिना व्याख्या के)।" चरण 2: फिर पूछें — "लेखक ने इन्हें किस.', 'पहला क्या दिखाया, दूसरा क्या?" चरण 3: तुलना कराएँ: घटनाओं का वास्तविक कालक्रम (लोककथाएँ पुरानी हैं, कुटज देखना नया).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_003', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि सामाजिक परिवेश की पहचान में कठिनाई हो, तो c12_hin_a_cbse_17_001 (पृष्ठभूमि और रचनाकार.',
          misconception: 'छात्र अक्सरkutj के वातावरण को केवल शारीरिक वर्णन (जैसे नदी का पानी, खेतों की हरी-भरीता) तक सीमित रखते हैं, सामाजिक और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 17\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि सामाजिक परिवेश की पहचान में कठिनाई हो, तो c12_hin_a_cbse_17_001 (पृष्ठभूमि और रचनाकार परिचय) को.',
                  misconception: 'छात्र अक्सरkutj के वातावरण को केवल शारीरिक वर्णन (जैसे नदी का पानी, खेतों की हरी-भरीता) तक सीमित रखते हैं, सामाजिक और ऐतिहासिक तनावों को.' }
          ],
            remediations: { 'kutj': { steps: ['पहले छात्र से kutj के दो अलग-अलग सामाजिक पृष्ठभूमि वाले पात्रों (जैसे एक ब्राह्मण और एक दलित) के बीच एक संवाद अंश चुनने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_004', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'यदि छात्र पात्र के आंतरिक विश्लेषण में फंस जाए तो उसे कक्षा 11 के पात्र-चित्रण नोड.',
          misconception: 'छात्र अक्सर नायक के पात्र-चित्रण को केवल उसकेheroic कार्यों (जैसे मौजी द्वारा भोलिया को बचाना या खेत जोतना) तक सीमित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र पात्र के आंतरिक विश्लेषण में फंस जाए तो उसे कक्षा 11 के पात्र-चित्रण नोड.',
                  misconception: 'छात्र अक्सर नायक के पात्र-चित्रण को केवल उसकेheroic कार्यों (जैसे मौजी द्वारा भोलिया को बचाना या खेत जोतना) तक सीमित रखते हैं, मानते हैं कि.' }
          ],
            remediations: { 'heroic': { steps: ['छात्र से कहिए कि वह मौजी के किसी एक दृश्य (जैसे ठाकुर के सामने चुप रहना) को ले और पूछे: "इस पल में मौजी क्या कहना चाहता.', 'उसका शरीर क्या बता रहा है जो उसके शब्द नहीं बता रहे?', 'क्या वह अंदर से डर रहा है, भ्रमित है, या नियंत्रित हो रहा है?" फिर उस विश्लेषण को उसके आर्क (शुरूआती विद्रोह → भ्रम →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_005', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'If stuck, return to c12_hin_a_cbse_17_004 (Protagonist) and c12_hin_a_cbse_17_002 (Plot).',
          misconception: 'Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition") rather than as dynamic.',
          parts: [
                { id: 'a', prompt: 'Name the three most prominent supporting characters in "oqQVt" and state one defining trait for each, based solely on the text.', answer: 'Correct answer: (1) Jaghe (the old woman)',
                  options: ['Correct answer: (1) Jaghe (the old woman)', 'the old woman'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_004 (Protagonist) and c12_hin_a_cbse_17_002 (Plot) — map each.',
                  misconception: 'Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition") rather than as dynamic figures whose.' },
                { id: 'b', prompt: 'Explain in your own words how Jaghe\'s refusal to leave the crumbling house functions as a foil to the narrator\'s intellectual meditation on "oqQVt".', answer: 'Correct answer: Jaghe embodies lived, visceral attachment — she stays',
                  options: ['Correct answer: Jaghe embodies lived, visceral attachment — she stays', 'she loves the house'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_004 (Protagonist) and c12_hin_a_cbse_17_002 (Plot) — map each.',
                  misconception: 'Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition") rather than as dynamic figures whose.' },
                { id: 'c', prompt: 'Compare the villagers\' collective silence during the house\'s decay with Jaghe\'s vocal defiance.', answer: 'Correct answer: The villagers represent passive, communal endurance',
                  options: ['Correct answer: The villagers represent passive, communal endurance', 'better', 'labels one "better" misses the textual balance'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_004 (Protagonist) and c12_hin_a_cbse_17_002 (Plot) — map each.',
                  misconception: 'Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition") rather than as dynamic figures whose.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['If a student cannot move beyond symbolic labels: (1) Have them re-read *only* the dialogues/actions of one supporting.', '133-134) and list verbs — "refuses", "cooks", "waits", "challenges".', '(2) Ask: "What does *this verb* force the narrator to confront?" (3) Practice one PEEL paragraph per character using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition") rather than as dynamic.',
          parts: [
                { id: 'a', prompt: 'Critique the view that the supporting characters in "oqQVt" are merely symbolic ciphers with no individual agency.', answer: 'Correct answer: They are *not* mere ciphers',
                  options: ['Correct answer: They are *not* mere ciphers', 'symbol-hunting'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_004 (Protagonist) and c12_hin_a_cbse_17_002 (Plot) — map each.',
                  misconception: 'Students treat supporting characters in "oqQVt" as static symbols (e.g., "Jaghe = tradition") rather than as dynamic figures whose.' }
          ],
            remediations: { 'students-treat-supporting-characters-in': { steps: ['If a student cannot move beyond symbolic labels: (1) Have them re-read *only* the dialogues/actions of one supporting.', '133-134) and list verbs — "refuses", "cooks", "waits", "challenges".', '(2) Ask: "What does *this verb* force the narrator to confront?" (3) Practice one PEEL paragraph per character using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_006', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 17\' का केंद्रीय भाव.',
          hint: 'यदि मुख्य विषय का विश्लेषण करने में कठिनाई हो, तो पहले पात्र-चित्रण नोड्स.',
          misconception: 'छात्र अक्सर kutj के मुख्य संदेश को \'शहरी जीवन बुरा है, ग्रामीण जीवन आदर्श है\' के रूप में सरलीकृत कर देते हैं, जबकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 17\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 17\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मुख्य विषय का विश्लेषण करने में कठिनाई हो, तो पहले पात्र-चित्रण नोड्स (c12_hin_a_cbse_17_004 और.',
                  misconception: 'छात्र अक्सर kutj के मुख्य संदेश को \'शहरी जीवन बुरा है, ग्रामीण जीवन आदर्श है\' के रूप में सरलीकृत कर देते हैं, जबकि उपन्यास वास्तव में यह.' }
          ],
            remediations: { 'kutj': { steps: ['यदि छात्र kutj का संदेश केवल \'गाँव अच्छा, शहर बुरा\' मान रहा है, तो उसे सबसे पहले उपन्यास के उन अंशों की पहचान करने के.', 'क्या उनके बीच भी झगड़े, जातीय भेद, या आर्थिक असमानता है?', 'इस तुलनात्मक विश्लेषण के माध्यम से धीरे-धीरे उसे दिखाएँ कि उपन्यास किसी एक जीवन शैली को नहीं बल्कि विकास के उन रूपों की.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
