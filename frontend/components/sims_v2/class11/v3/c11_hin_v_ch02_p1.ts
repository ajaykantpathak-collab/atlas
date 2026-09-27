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
        { title: 'पाठ 2 — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के जीवन-वृत्त, साहित्यिक योगदान, विचारधारा तथा रचना-काल की सामाजिक-सांस्कृतिक-राजनीतिक परिस्थितियों का व्यवस्थित अध्ययन.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['पाठ 2 — पृष्ठभूमि', 'पाठ 2 — कथानक', 'पाठ 2 — पाठ्य-परिवेश', 'पाठ 2 — पात्र-चित्रण', 'पाठ 2 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_004', title: 'पाठ 2 — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'Think of the last time you described a friend to someone — you didn\'t just say "nice person"; you shared that time they missed their bus to help an elderly.',
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
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता.',
          hint: 'यदि छात्र \'रचनाकार की दृष्टि\' और \'रचना की दृष्टि\' का संबंध नहीं बना पा रहा हो, तो आचार्य.',
          misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि और रचनाकार परिचय का अर्थ है — लेखक का जन्म-मृत्यु वर्ष, शिक्षा, प्रमुख रचनाओं की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ', 'पात्र-चित्रण (Character portrayal) नायक/प्रमुख पात्र के व्यक्तित्व, चरित्र, संवाद,'],
                  hint: 'यदि छात्र \'रचनाकार की दृष्टि\' और \'रचना की दृष्टि\' का संबंध नहीं बना पा रहा हो, तो आचार्य रामचंद्र.',
                  misconception: '**विशिष्ट भ्रांति:** "पृष्ठभूमि और रचनाकार परिचय का अर्थ है — लेखक का जन्म-मृत्यु वर्ष, शिक्षा, प्रमुख रचनाओं की सूची रट लेना।".' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पहला कदम:** छात्र से कहें — "श्रीलाल शुक्ल की कोई एक कहानी/उपन्यास अंश पढ़ें (जैसे: \'पहला पड़ाव\' या \'राग दरबारी\' का.', '**दूसरा कदम:** 1960 के दशक के ग्रामीण भारत की किन्हीं दो सरकारी योजनाओं (जैसे: सामुदायिक विकास कार्यक्रम, पंचायती राज.', '**तीसरा कदम:** छात्र को \'रचनाकार परिचय\' के नोट्स को \'तथ्य-सूची\' से \'कारण-कार्य तालिका\' में बदलने को कहें — कॉलम 1: लेखक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_002', difficulty: 'standard',
          question: 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\'.',
          hint: 'यदि छात्र घटनाओं का कालक्रम नहीं बना पाता, तो उसे **कहानी का घटना-चित्र (story.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'कथानक का विश्लेषण\' का अर्थ केवल घटनाओं को क्रम से लिखना है (समरी/सार लिखना)। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता',
                  options: ['कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ', 'पात्र-चित्रण (Character portrayal) नायक/प्रमुख पात्र के व्यक्तित्व, चरित्र, संवाद,'],
                  hint: 'यदि छात्र घटनाओं का कालक्रम नहीं बना पाता, तो उसे **कहानी का घटना-चित्र (story map/flowchart)**.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि \'कथानक का विश्लेषण\' का अर्थ केवल घटनाओं को क्रम से लिखना है (समरी/सार लिखना)। वे नहीं समझते कि बोर्ड.' }
          ],
            remediations: { 'structural-functionality': { steps: ['**चरण 1 — दृश्यीकरण (Visualization):** छात्र से कहें: "किसी फिल्म/सीरियल का कोई दृश्य याद करो जहाँ कहानी अचानक अतीत में.', '**चरण 2 — माइक्रो-टेक्स्ट अभ्यास:** 5-6 वाक्यों का एक पैराग्राफ दो जिसमें फ्लैशबैक हो। छात्र से दोनों क्रम लिखवाएँ। फिर.', '**चरण 3 — प्रभाव-प्रश्न (Effect-question):** हर फ्लैशबैक/फोरशैडोइंग के लिए तीन प्रश्न पूछने का अभ्यास कराएँ: (क) यह कब.', '**चरण 4 — बोर्ड-शैली उत्तर:** PEEL संरचना (Point-Evidence-Explanation-Link) में एक नमूना उत्तर लिखकर दिखाएँ जहाँ संरचना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और.',
          hint: 'अगर अटके तो \'कथानक और आख्यान-संरचना\' (नोड 002) के \'घटना-परिवेश संबंध\' खंड को दोबारा पढ़ें.',
          misconception: 'छात्र प्रायः समझते हैं कि **\'वातावरण\' लेखक द्वारा सीधे बताई गई भावना है** (जैसे "माहौल उदास था") और **\'परिवेश\' केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ',
                  options: ['पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पात्र-चित्रण (Character portrayal) नायक/प्रमुख पात्र के व्यक्तित्व, चरित्र, संवाद,'],
                  hint: 'अगर अटके तो \'कथानक और आख्यान-संरचना\' (नोड 002) के \'घटना-परिवेश संबंध\' खंड को दोबारा पढ़ें — विशेषकर.',
                  misconception: 'छात्र प्रायः समझते हैं कि **\'वातावरण\' लेखक द्वारा सीधे बताई गई भावना है** (जैसे "माहौल उदास था") और **\'परिवेश\' केवल स्थान का नाम है** (जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (अवधारणा स्पष्टीकरण):** छात्र को दो वाक्य दें — एक तथ्यात्मक (परिवेश), एक बिंबात्मक (वातावरण) — और पूछें: "पहला.', 'दूसरा तुम्हें क्या *महसूस* कराता है?" 2.', '**चरण 2 (बिंब खोज):** किसी ज्ञात पाठ (जैसे \'नमक का दारोगा\' का बाज़ार दृश्य) से 5 संवेदी बिंब (दृश्य, श्रव्य, घ्राण.', '**चरण 3 (मैपिंग):** प्रत्येक बिंब के सामने लिखवाएं: यह परिवेश का कौन-सा तत्व दर्शाता है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character portrayal) नायक/प्रमुख पात्र के व्यक्तित्व, चरित्र.',
          hint: 'If stuck: Review "Show vs. Tell" distinction using a familiar film scene (e.g., *Masaan*.',
          misconception: 'Students believe character analysis = listing adjectives with one quote each ("He is honest [quote], poor [quote].',
          parts: [
                { id: 'a', prompt: 'पाठ 2 के नायक की किन्हीं दो बाह्य विशेषताओं (physical/external traits) का उल्लेख करें जो पाठ में सीधे वर्णित हैं।', answer: 'Correct answer: [Specific to Vitan Ch 2 text',
                  options: ['Correct answer: [Specific to Vitan Ch 2 text', 'वह गरीब है', 'वह ईमानदार है', 'He is honest [quote], poor [quote], brave [quote]'],
                  hint: 'If stuck: Review "Show vs. Tell" distinction using a familiar film scene (e.g., *Masaan* — Deepak.',
                  misconception: 'Students believe character analysis = listing adjectives with one quote each ("He is honest [quote], poor [quote], brave [quote]").' }
          ],
            remediations: { 'character-analysis-listing-adjectives-with': { steps: ['Give the student a 50-word character description *without* the character\'s name (e.g., "A man who mends his own shoes.', 'Ask: "What *one word* captures the tension between these behaviors?" (Expected: dignity/self-respect/swabhiman).', 'Now open the text: "Find *three moments* where this tension *plays out* — not where it\'s described, where it *happens*."', 'Have them write one PEEL paragraph for *just one moment*. This shifts focus from labeling to *evidence-first reasoning*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe character analysis = listing adjectives with one quote each ("He is honest [quote], poor [quote].',
          parts: [
                { id: 'a', prompt: 'नायक की दृष्टि से एक डायरी-प्रविष्टि लिखें जो पाठ में *नहीं* आई किसी घटना (जैसे: रात को नींद न आना, पुरानी चिट्ठी पढ़ना) को कल्पित करे, लेकिन उसके स्थापित.', answer: 'Expected criteria: (1) Voice matches protagonist\'s diction/tone from text',
                  options: ['Expected criteria: (1) Voice matches protagonist\'s diction/tone from text', 'He is honest [quote], poor [quote], brave [quote]'],
                  hint: 'If stuck: Review "Show vs. Tell" distinction using a familiar film scene (e.g., *Masaan* — Deepak.',
                  misconception: 'Students believe character analysis = listing adjectives with one quote each ("He is honest [quote], poor [quote], brave [quote]").' }
          ],
            remediations: { 'character-analysis-listing-adjectives-with': { steps: ['Give the student a 50-word character description *without* the character\'s name (e.g., "A man who mends his own shoes.', 'Ask: "What *one word* captures the tension between these behaviors?" (Expected: dignity/self-respect/swabhiman).', 'Now open the text: "Find *three moments* where this tension *plays out* — not where it\'s described, where it *happens*."', 'Have them write one PEEL paragraph for *just one moment*. This shifts focus from labeling to *evidence-first reasoning*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके तो c11_hin_v_cbse_02_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) के \'आंतरिक द्वंद्व\'.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र का विश्लेषण केवल \'वह नायक की मदद करता है/नहीं करता\' तक सीमित है। वे पात्र के \'आंतरिक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र हैं जो नायक/प्रमुख पात्र के समानांतर या', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके तो c11_hin_v_cbse_02_004 (पात्र-चित्रण: नायक/प्रमुख पात्र) के \'आंतरिक द्वंद्व\' और \'चरित्र.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र का विश्लेषण केवल \'वह नायक की मदद करता है/नहीं करता\' तक सीमित है। वे पात्र के \'आंतरिक द्वंद्व\' (internal.' }
          ],
            remediations: { 'internal-conflict': { steps: ['चरण 1: छात्र से कहें — \'पाठ के किसी सहायक पात्र के तीन संवाद चुनें जो नायक से संबंधित न हों (अपने परिवार, अपने सपने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_006', difficulty: 'standard',
          question: 'मुख्य विषय (Central Theme) किसी साहित्यिक रचना में निहित वह **सार्वभौमिक.',
          hint: 'यदि अटके तो **नोड 002 (कथानक संरचना)** के \'चरमोत्कर्ष\' और \'उपसंहार\' भाग को दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"मुख्य विषय = लेखक का व्यक्तिगत मत" (Author\'s Personal Opinion)** — वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय (Central Theme) किसी साहित्यिक रचना में निहित वह **सार्वभौमिक केंद्रीय विचार',
                  options: ['मुख्य विषय (Central Theme) किसी साहित्यिक रचना में निहित वह **सार्वभौमिक केंद्रीय विचार', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके तो **नोड 002 (कथानक संरचना)** के \'चरमोत्कर्ष\' और \'उपसंहार\' भाग को दोबारा पढ़ें — विषय का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"मुख्य विषय = लेखक का व्यक्तिगत मत" (Author\'s Personal Opinion)** — वे सोचते हैं लेखक जो.' }
          ],
            remediations: { 'author-s-personal-opinion-internal': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें — "पाठ के किसी पात्र का एक कथन चुनो जो तुम्हें लगता है लेखक का मत है। अब पाठ.', 'यदि हाँ, तो विषय वह नहीं जो एक पात्र कहता, बल्कि वह जो **पूरी रचना सिद्ध करती है**।" 2.', '**चरण 2 — \'विषय कथन\' (Thematic Statement) लिखवाएं:** "विषय को एक शब्द में न लिखो (जैसे \'गरीबी\'), बल्कि **पूर्ण वाक्य**.', '**चरण 3 — साक्ष्य-मिलान:** उस वाक्य के पक्ष में पाठ से 3 साक्ष्य मांगें। यदि न मिलें, तो विषय कथन गलत है — नया बनाएं। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
