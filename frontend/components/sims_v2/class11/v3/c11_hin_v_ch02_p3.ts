import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch02_p3: SimDef = {
    id: 'v3_c11_hin_v_ch02_p3',
    title: 'पाठ 2 · Part 3/3',
    subtitle: 'See a pond as a village\'s constitution, not its engineering.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 2 · Part 3/3',
    chapters: ['c11_hin_v_ch02'],
    nodeIds: ['c11_hin_v_cbse_02_013', 'c11_hin_v_cbse_02_014', 'c11_hin_v_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village deciding who owns the rain', intro: 'Tankers queue at the municipal tap while the old johad sits dry — the difference between them was never concrete, it was cooperation.', goal: 'Read the johad system as social institution and analyse the chapter\'s inductive structure.' },
    discovery: {
        question: 'Alwar\'s johads brought dead wells back to life — so is water revival basically an engineering project?',
        options: ['No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard', 'Yes — dig the right pond and the water follows', 'Yes — runoff math is the whole problem', 'No — because johads are religious structures'],
        answer: 'No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard',
        hook: 'The pond is the easy part — historically the dominant castes controlled the water; revival worked only when women\'s jal sabhas rewrote the sharing rules.',
    },
    teaching: [
        { title: 'पाठ 2 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के **स्पष्ट अर्थ** के साथ-साथ उसके **अंतर्निहित निहितार्थ, भाषाई संरचना, साहित्यिक युक्तियों, सांस्कृतिक-सामाजिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['पाठ 2 — आलोचनात्मक', 'पाठ 2 — लेखन', 'पाठ 2 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_02_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 3/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) वह संरचित प्रक्रिया है जिसमें विद्यार्थी.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **संरचित संवाद कौशल** है जिसमें शिक्षार्थी किसी पाठ को पढ़ने.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a project on water scarcity, a student presents Anupam Mishra\'s johad chapter as \'a DIY guide to building check-dams — shapes, sizes, materials.\' A classmate asks why the chapter spends so long on village meetings and voluntary labour.',
            decisions: [{ prompt: 'What is the chapter really about?', options: [
                { text: 'Read the johad as a social contract, not a technique: the chapter documents a decentralised water democracy — shramdaan and gram sabha decisions, shared labour across caste and gender, the three water categories managed as a common-pool resource. The engineering details serve the argument that community governance, marginalized by modern administration, is what kept wells alive.', outcome: 'The project reframes: the question isn\'t \'how to build a pond\' but \'how a community sustains its water democracy\' — the meetings are the technology.' },
                { text: 'Keep the technical reading — the social passages are human-interest padding around the engineering.', outcome: 'That inverts the essay: the technique is the lens; the analysis of common-pool governance is the subject.', reveals: 'johad-is-engineering-guide' },
                { text: 'Summarise it chronologically — first canals, then johads, then borewells — as a history of water tech.', outcome: 'The text\'s plot is an architecture of persuasion, not a timeline: it deliberately places traditional johads after modern canals to create rhetorical tension.', reveals: 'nonfiction-plot-is-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'The text ends not with a policy memo but trickling streams merging into sweet water — small flows self-organising into abundance is the whole argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें.',
          hint: 'यदि फँस जाएं तो **c11_hin_v_cbse_02_008 (बिंब/रूपक) और c11_hin_v_cbse_02_009.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' = \'पाठ में कमियाँ निकालना\' (fault-finding)** या **\'अपनी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक व्यवस्थित बौद्धिक प्रक्रिया है जिसमें पाठ के', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि फँस जाएं तो **c11_hin_v_cbse_02_008 (बिंब/रूपक) और c11_hin_v_cbse_02_009 (विरोधाभास/प्रतीक)**.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आलोचनात्मक चिंतन\' = \'पाठ में कमियाँ निकालना\' (fault-finding)** या **\'अपनी निजी राय देना\'.' }
          ],
            remediations: { 'fault-finding-personal-opinion-critical': { steps: ['**शब्दावली सुधार:** छात्र से कहें — "आलोचनात्मक (critical) का अर्थ यहाँ **\'निर्णायक/विवेचनात्मक\'.', '**अभ्यास:** एक छोटा अंश दें (4-5 पंक्तियाँ)। पूछें: "यहाँ लेखक ने **क्या किया है** (technique)?" — न कि "तुम्हें कैसा.', '**PEEL ढांचा लागू करवाएं:** हर बिंदु के लिए **Point → Evidence (पाठ पंक्ति/शब्द) → Explanation (कैसे/क्यों) → Link (थीम.', '**फीडबैक लूप:** छात्र के उत्तर में **\'निजी राय\' वाले वाक्य** लाल पेन से घेरें, पूछें: "यह पाठ से कहाँ सिद्ध होता है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) वह संरचित प्रक्रिया है जिसमें.',
          hint: 'यदि अटके: पहले c11_hin_v_cbse_02_012 (बोध प्रश्न) के \'आशय-सूचक\' प्रश्नों का अभ्यास करें.',
          misconception: '**विशिष्ट भ्रांति:** "उद्धरण (Evidence) जितना लंबा होगा, उत्तर उतना मजबूत होगा।" **गलत तर्क:** छात्र सोचते हैं कि पूरा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) वह संरचित प्रक्रिया है जिसमें विद्यार्थी',
                  options: ['लेखन कौशल: पाठ-आधारित (Text-based Writing Skill) वह संरचित प्रक्रिया है जिसमें विद्यार्थी', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके: पहले c11_hin_v_cbse_02_012 (बोध प्रश्न) के \'आशय-सूचक\' प्रश्नों का अभ्यास करें — वे.',
                  misconception: '**विशिष्ट भ्रांति:** "उद्धरण (Evidence) जितना लंबा होगा, उत्तर उतना मजबूत होगा।" **गलत तर्क:** छात्र सोचते हैं कि पूरा पैराग्राफ कॉपी कर.' }
          ],
            remediations: { 'evidence': { steps: ['**चरण 1:** छात्र को 5 अंक का एक प्रश्न दें और कहें: "केवल 20 शब्दों का उद्धरण चुनो, बाकी 80 शब्द Explanation के लिए.', '**चरण 2:** उसके लिखे उत्तर में पीले हाइलाइटर से Evidence, हरे से Explanation मार्क करवाएं — यदि हरा कम दिखे, तो समझाएं.', '**चरण 3:** एक ही प्रमाण से 3 अलग-अलग Explanation लिखने का अभ्यास करवाएं (शाब्दिक, प्रतीकात्मक, सामाजिक) — इससे \'कैसे.', '**चरण 4:** पिछले वर्ष के बोर्ड उत्तर (टॉपर vs औसत) साथ रखकर तुलना करवाएं — अंतर स्वयं दिखेगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **संरचित संवाद कौशल** है जिसमें शिक्षार्थी किसी पाठ.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_02_012 (बोध-प्रश्न)** और **c11_hin_v_cbse_02_013 (आलोचनात्मक.',
          misconception: 'छात्र समझते हैं कि **चर्चा-बिंदु = पाठ का सारांश + व्यक्तिगत राय**। वे पाठ के किसी प्रसंग को दोहराते हैं और कहते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **संरचित संवाद कौशल** है जिसमें शिक्षार्थी किसी पाठ को पढ़ने',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **संरचित संवाद कौशल** है जिसमें शिक्षार्थी किसी पाठ को पढ़ने', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_02_012 (बोध-प्रश्न)** और **c11_hin_v_cbse_02_013 (आलोचनात्मक चिंतन)**.',
                  misconception: 'छात्र समझते हैं कि **चर्चा-बिंदु = पाठ का सारांश + व्यक्तिगत राय**। वे पाठ के किसी प्रसंग को दोहराते हैं और कहते हैं "मुझे अच्छा लगा/बुरा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **एक छोटा प्रसंग (5-6 पंक्तियाँ)** दें और कहें: "यहाँ **कोई एक दावा** लिखो जो इस प्रसंग से सिद्ध होता हो, और.', 'फिर पूछें: "क्या कोई **दूसरा दावा** भी इसी प्रसंग से निकल सकता है?', 'उसका साक्ष्य क्या होगा?" 3.', 'फिर कहें: "अब अपने दावे को **एक वाक्य में** इस तरह लिखो कि उसमें **साहित्यिक पदावली** (बिंब, प्रतीक, विरोधाभास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
