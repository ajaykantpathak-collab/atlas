import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch02_p1: SimDef = {
    id: 'v3_c11_hin_v_ch02_p1',
    title: 'पाठ 2 · Part 1/3',
    subtitle: 'See a pond as a village\'s constitution, not its engineering.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 2 · Part 1/3',
    chapters: ['c11_hin_v_ch02'],
    nodeIds: ['c11_hin_v_cbse_02_001', 'c11_hin_v_cbse_02_002', 'c11_hin_v_cbse_02_003', 'c11_hin_v_cbse_02_004', 'c11_hin_v_cbse_02_005', 'c11_hin_v_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village deciding who owns the rain', intro: 'Tankers queue at the municipal tap while the old johad sits dry — the difference between them was never concrete, it was cooperation.', goal: 'Read the johad system as social institution and analyse the chapter\'s inductive structure.' },
    discovery: {
        question: 'Alwar\'s johads brought dead wells back to life — so is water revival basically an engineering project?',
        options: ['No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard', 'Yes — dig the right pond and the water follows', 'Yes — runoff math is the whole problem', 'No — because johads are religious structures'],
        answer: 'No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard',
        hook: 'The pond is the easy part — historically the dominant castes controlled the water; revival worked only when women\'s jal sabhas rewrote the sharing rules.',
    },
    teaching: [
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_001', title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'वितान भाग-1 खोलिए और पाठ 02 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'What is the literal meaning of the term *johad* as used in the context of traditional water management in Rajasthan, and which geographical.', options: [
                { text: 'A *johad* is a crescent-shaped earthen check-dam built across a slope to capture and', outcome: 'A *johad* is a crescent-shaped earthen check-dam built across a slope to capture and store monsoon.' },
                { text: 'rainwater harvesting techniques', outcome: 'Not quite — Students often believe the chapter is primarily about "rainwater harvesting techniques" and.', reveals: 'the-chapter-is-primarily-about' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_002', title: 'पाठ 2 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 2\' का क्रम: शुरुआत पाठ-2 से, घटनाएँ बढ़ती हैं, अंत \'वितान भाग-1 पर।',
            decisions: [{ prompt: 'Identify the three distinct structural phases in the opening section (pages 9-11) where the author moves from immediate sensory observation.', options: [
                { text: 'Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2)', outcome: 'Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2).' },
                { text: 'introduction, body, conclusion', outcome: 'Not quite — Students treat "plot" in non-fiction as a chronological timeline of events described in the text.', reveals: 'students-treat-plot-in-non' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_004', title: 'पाठ 2 — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'वितान भाग-1 — पाठ 2\' में पाठ-2 से पात्र उभरता है।',
            decisions: [{ prompt: 'पाठ 2 के नायक की किन्हीं दो बाह्य विशेषताओं (physical/external traits) का उल्लेख करें जो पाठ में सीधे वर्णित हैं।', options: [
                { text: 'Correct answer: [Specific to Vitan Ch 2 text', outcome: 'Correct answer: [Specific to Vitan Ch 2 text — e.g., "नायक की झुकी हुई कमर और फटे कुर्ते की बाँहें".' },
                { text: 'वह गरीब है', outcome: 'Not quite — Students believe character analysis = listing adjectives with one quote each ("He is honest.', reveals: 'character-analysis-listing-adjectives-with' },
                { text: 'वह ईमानदार है', outcome: 'Not quite — Students believe character analysis = listing adjectives with one quote each ("He is honest.', reveals: 'character-analysis-listing-adjectives-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a project on water scarcity, a student presents Anupam Mishra\'s johad chapter as \'a DIY guide to building check-dams — shapes, sizes, materials.\' A classmate asks why the chapter spends so long on village meetings and voluntary labour.',
            decisions: [{ prompt: 'What is the chapter really about?', options: [
                { text: 'Read the johad as a social contract, not a technique: the chapter documents a decentralised water democracy — shramdaan and gram sabha decisions, shared labour across caste and gender, the three water categories managed as a common-pool resource. The engineering details serve the argument that community governance, marginalized by modern administration, is what kept wells alive.', outcome: 'The project reframes: the question isn\'t \'how to build a pond\' but \'how a community sustains its water democracy\' — the meetings are the technology.' },
                { text: 'Keep the technical reading — the social passages are human-interest padding around the engineering.', outcome: 'That inverts the essay: the technique is the lens; the analysis of common-pool governance is the subject.', reveals: 'johad-is-engineering-guide' },
                { text: 'Summarise it chronologically — first canals, then johads, then borewells — as a history of water tech.', outcome: 'The text\'s plot is an architecture of persuasion, not a timeline: it deliberately places traditional johads after modern canals to create rhetorical tension.', reveals: 'nonfiction-plot-is-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'The text ends not with a policy memo but trickling streams merging into sweet water — small flows self-organising into abundance is the whole argument.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management.',
          misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the.',
          parts: [
                { id: 'a', prompt: 'A village in Alwar district receives 600 mm annual rainfall. Using the concept of *johad* catchment-to-command ratio described in the background, calculate the.', answer: 'Step 1: Crop water need = 10 ha × 500 mm = 50,000 m³',
                  options: ['Step 1: Crop water need = 10 ha × 500 mm = 50,000 m³', 'rainwater harvesting techniques'],
                  hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management section) and.',
                  misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the engineering.' }
          ],
            remediations: { 'the-chapter-is-primarily-about': { steps: ['If a student cannot articulate the socio-ecological frame, conduct a 3-step remediation: (1) Show two 2-minute clips.', '(2) Give a one-paragraph excerpt from the chapter where the author describes a *gram sabha* conflict over water.', '(3) Assign a mini-inquiry: "Interview one elder in your neighborhood about how water decisions were made 30 years ago.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Reviving *johads* is only a technical fix for water scarcity; it does not require social restructuring." Use evidence from the.', answer: 'The statement is invalid',
                  options: ['The statement is invalid', 'rainwater harvesting techniques'],
                  hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management section) and.',
                  misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the engineering.' },
                { id: 'b', prompt: 'Design a 3-minute podcast script for Class 11 students that introduces the chapter\'s context using a "Then vs Now" narrative structure.', answer: 'A strong script opens with the sound of a dry hand-pump vs',
                  options: ['A strong script opens with the sound of a dry hand-pump vs', 'rainwater harvesting techniques'],
                  hint: 'If stuck, review Class 11 Geography Chapter "Water Resources" (watershed management section) and.',
                  misconception: 'Students often believe the chapter is primarily about "rainwater harvesting techniques" and therefore focus only on the engineering.' }
          ],
            remediations: { 'the-chapter-is-primarily-about': { steps: ['If a student cannot articulate the socio-ecological frame, conduct a 3-step remediation: (1) Show two 2-minute clips.', '(2) Give a one-paragraph excerpt from the chapter where the author describes a *gram sabha* conflict over water.', '(3) Assign a mini-inquiry: "Interview one elder in your neighborhood about how water decisions were made 30 years ago.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_002', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ।.',
          hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and.',
          misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals.',
          parts: [
                { id: 'a', prompt: 'Identify the three distinct structural phases in the opening section (pages 9-11) where the author moves from immediate sensory observation to systemic.', answer: 'Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2)',
                  options: ['Correct answer: (1) Visceral Scene-Setting (the canal-digging tableau), (2)', 'introduction, body, conclusion'],
                  hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and practice labeling.',
                  misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals were built, then.' },
                { id: 'b', prompt: 'The author inserts a detailed description of the \'johad\' (traditional check-dam) construction process on pages 14-15.', answer: 'Correct answer: The sequencing follows a "failure-before-alternative" rhetorical',
                  options: ['Correct answer: The sequencing follows a "failure-before-alternative" rhetorical', 'chronological order', 'traditional comes first historically'],
                  hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and practice labeling.',
                  misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals were built, then.' },
                { id: 'c', prompt: 'On page 16, the author describes how laborers\' payment shifted from "annual grain share" to "cash wages" to "contract-based piece rates." Map this progression.', answer: 'Correct answer: Escalation (specifically, escalating alienation)',
                  options: ['Correct answer: Escalation (specifically, escalating alienation)', 'contrast', 'parallelism', 'framing'],
                  hint: 'Review "rhetorical modes" (narration, description, exposition, argumentation) and practice labeling.',
                  misconception: 'Students treat "plot" in non-fiction as a chronological timeline of events described in the text (e.g., "first canals were built, then.' }
          ],
            remediations: { 'students-treat-plot-in-non': { steps: ['Give the student a 3-paragraph op-ed on a परिचित topic (e.g., "Why Delhi\'s odd-even scheme fails").', 'Have them physically cut and reorder the paragraphs—ask "Does the argument still work? Why/why not?"', 'Map this to the textbook: identify the "hook" paragraph (page 9 canal scene), the "evidence" section (pages 10-13.', 'Explicitly name the principle: "Non-fiction plot = the minimum number of pieces that must stay in this order for the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_003', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'अगर अटके तो \'कथानक और आख्यान-संरचना\' (नोड 002) के \'घटना-परिवेश संबंध\' खंड को दोबारा पढ़ें.',
          misconception: 'छात्र प्रायः समझते हैं कि **\'वातावरण\' लेखक द्वारा सीधे बताई गई भावना है** (जैसे "माहौल उदास था") और **\'परिवेश\' केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'अगर अटके तो \'कथानक और आख्यान-संरचना\' (नोड 002) के \'घटना-परिवेश संबंध\' खंड को दोबारा पढ़ें — विशेषकर.',
                  misconception: 'छात्र प्रायः समझते हैं कि **\'वातावरण\' लेखक द्वारा सीधे बताई गई भावना है** (जैसे "माहौल उदास था") और **\'परिवेश\' केवल स्थान का नाम है** (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (अवधारणा स्पष्टीकरण):** छात्र को दो वाक्य दें — एक तथ्यात्मक (परिवेश), एक बिंबात्मक (वातावरण) — और पूछें: "पहला.', 'दूसरा तुम्हें क्या *महसूस* कराता है?" 2.', '**चरण 2 (बिंब खोज):** किसी ज्ञात पाठ (जैसे \'नमक का दारोगा\' का बाज़ार दृश्य) से 5 संवेदी बिंब (दृश्य, श्रव्य, घ्राण.', '**चरण 3 (मैपिंग):** प्रत्येक बिंब के सामने लिखवाएं: यह परिवेश का कौन-सा तत्व दर्शाता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_004', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck: Review "Show vs. Tell" distinction using a familiar film scene (e.g., *Masaan*.',
          misconception: 'Students believe character analysis = listing adjectives with one quote each ("He is honest [quote], poor [quote].',
          parts: [
                { id: 'a', prompt: 'पाठ 2 के नायक की किन्हीं दो बाह्य विशेषताओं (physical/external traits) का उल्लेख करें जो पाठ में सीधे वर्णित हैं।', answer: 'Correct answer: [Specific to Vitan Ch 2 text',
                  options: ['Correct answer: [Specific to Vitan Ch 2 text', 'वह गरीब है', 'वह ईमानदार है', 'He is honest [quote], poor [quote], brave [quote]'],
                  hint: 'If stuck: Review "Show vs. Tell" distinction using a familiar film scene (e.g., *Masaan* — Deepak.',
                  misconception: 'Students believe character analysis = listing adjectives with one quote each ("He is honest [quote], poor [quote], brave [quote]").' }
          ],
            remediations: { 'character-analysis-listing-adjectives-with': { steps: ['Give the student a 50-word character description *without* the character\'s name (e.g., "A man who mends his own shoes.', 'Ask: "What *one word* captures the tension between these behaviors?" (Expected: dignity/self-respect/swabhiman).', 'Now open the text: "Find *three moments* where this tension *plays out* — not where it\'s described, where it *happens*."', 'Have them write one PEEL paragraph for *just one moment*. This shifts focus from labeling to *evidence-first reasoning*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_005', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके तो c11_hin_v_cbse_02_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) के \'आंतरिक द्वंद्व\'.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र का विश्लेषण केवल \'वह नायक की मदद करता है/नहीं करता\' तक सीमित है। वे पात्र के \'आंतरिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'वितान भाग-1 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c11_hin_v_cbse_02_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) के \'आंतरिक द्वंद्व\' और \'चरित्र.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र का विश्लेषण केवल \'वह नायक की मदद करता है/नहीं करता\' तक सीमित है। वे पात्र के \'आंतरिक द्वंद्व\' (internal.' }
          ],
            remediations: { 'internal-conflict': { steps: ['चरण 1: छात्र से कहें — \'पाठ के किसी सहायक पात्र के तीन संवाद चुनें जो नायक से संबंधित न हों (अपने परिवार, अपने सपने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_006', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' का मुख्य विषय — \'वितान भाग-1 — पाठ 2\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो **नोड 002 (कथानक संरचना)** के \'चरमोत्कर्ष\' और \'उपसंहार\' भाग को दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"मुख्य विषय = लेखक का व्यक्तिगत मत" (Author\'s Personal Opinion)** — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' का मुख्य विषय — \'वितान भाग-1 — पाठ 2\' का केंद्रीय भाव और संदेश',
                  options: ['\'वितान भाग-1 — पाठ 2\' का मुख्य विषय — \'वितान भाग-1 — पाठ 2\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **नोड 002 (कथानक संरचना)** के \'चरमोत्कर्ष\' और \'उपसंहार\' भाग को दोबारा पढ़ें — विषय का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"मुख्य विषय = लेखक का व्यक्तिगत मत" (Author\'s Personal Opinion)** — वे सोचते हैं लेखक जो.' }
          ],
            remediations: { 'author-s-personal-opinion-internal': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें — "पाठ के किसी पात्र का एक कथन चुनो जो तुम्हें लगता है लेखक का मत है। अब पाठ.', 'यदि हाँ, तो विषय वह नहीं जो एक पात्र कहता, बल्कि वह जो **पूरी रचना सिद्ध करती है**।" 2.', '**चरण 2 — \'विषय कथन\' (Thematic Statement) लिखवाएं:** "विषय को एक शब्द में न लिखो (जैसे \'गरीबी\'), बल्कि **पूर्ण वाक्य**.', '**चरण 3 — साक्ष्य-मिलान:** उस वाक्य के पक्ष में पाठ से 3 साक्ष्य मांगें। यदि न मिलें, तो विषय कथन गलत है — नया बनाएं। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
