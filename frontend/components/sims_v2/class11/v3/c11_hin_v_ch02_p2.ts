import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch02_p2: SimDef = {
    id: 'v3_c11_hin_v_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'See a pond as a village\'s constitution, not its engineering.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c11_hin_v_ch02'],
    nodeIds: ['c11_hin_v_cbse_02_007', 'c11_hin_v_cbse_02_008', 'c11_hin_v_cbse_02_009', 'c11_hin_v_cbse_02_010', 'c11_hin_v_cbse_02_011', 'c11_hin_v_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village deciding who owns the rain', intro: 'Tankers queue at the municipal tap while the old johad sits dry — the difference between them was never concrete, it was cooperation.', goal: 'Read the johad system as social institution and analyse the chapter\'s inductive structure.' },
    discovery: {
        question: 'Alwar\'s johads brought dead wells back to life — so is water revival basically an engineering project?',
        options: ['No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard', 'Yes — dig the right pond and the water follows', 'Yes — runoff math is the whole problem', 'No — because johads are religious structures'],
        answer: 'No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard',
        hook: 'The pond is the easy part — historically the dominant castes controlled the water; revival worked only when women\'s jal sabhas rewrote the sharing rules.',
    },
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के समानांतर चलकर उसे विस्तार, संदर्भ, विरोधाभास या पूरकता प्रदान करता है तथा पाठ के केंद्रीय संदेश को बहुआयामी बनाता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_v_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 2 · Part 2/3', spots: [
            { id: 's1', label: '2 -', prompt: 'Which idea is this? — "पाठ में भाषा-प्रयोग" (Language Use in the Text) refers to the analytical study of the.', answer: '2 -', options: ['2 -', '2 - -'] },
            { id: 's2', label: '2 - -', prompt: 'Which idea is this? — वस्तुनिष्ठ बोध-प्रश्न पाठ में स्पष्टतः उल्लिखित तथ्यों, घटनाओं, पात्रों के कथन या आँकड़ों.', answer: '2 - -', options: ['2 - -', '2 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a project on water scarcity, a student presents Anupam Mishra\'s johad chapter as \'a DIY guide to building check-dams — shapes, sizes, materials.\' A classmate asks why the chapter spends so long on village meetings and voluntary labour.',
            decisions: [{ prompt: 'What is the chapter really about?', options: [
                { text: 'Read the johad as a social contract, not a technique: the chapter documents a decentralised water democracy — shramdaan and gram sabha decisions, shared labour across caste and gender, the three water categories managed as a common-pool resource. The engineering details serve the argument that community governance, marginalized by modern administration, is what kept wells alive.', outcome: 'The project reframes: the question isn\'t \'how to build a pond\' but \'how a community sustains its water democracy\' — the meetings are the technology.' },
                { text: 'Keep the technical reading — the social passages are human-interest padding around the engineering.', outcome: 'That inverts the essay: the technique is the lens; the analysis of common-pool governance is the subject.', reveals: 'johad-is-engineering-guide' },
                { text: 'Summarise it chronologically — first canals, then johads, then borewells — as a history of water tech.', outcome: 'The text\'s plot is an architecture of persuasion, not a timeline: it deliberately places traditional johads after modern canals to create rhetorical tension.', reveals: 'nonfiction-plot-is-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'The text ends not with a policy memo but trickling streams merging into sweet water — small flows self-organising into abundance is the whole argument.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय को 3.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = पाठ में कम आने वाला विषय" या "गौण विषय = मुख्य विषय से असंबंधित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के समानांतर चलकर',
                  options: ['गौण विषय (Sub-theme) वह सहायक कथ्य-तत्व है जो मुख्य विषय (Central Theme) के समानांतर चलकर', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय को 3 बिंदुओं में.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = पाठ में कम आने वाला विषय" या "गौण विषय = मुख्य विषय से असंबंधित प्रसंग"। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के 3 ऐसे प्रसंग चुनो जो मुख्य विषय (जल-प्रबंधन) से **सीधे** न जुड़ते हों पर तुम्हें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों द्वारा पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें और पाठ के 3-4.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **रूपक केवल सजावट/अलंकार** है और बिंब केवल **"चित्र बनाना"**। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों द्वारा पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध, स्वाद)',
                  options: ['**बिंब (Imagery):** शब्दों द्वारा पाठक की इंद्रियों (दृष्टि, श्रवण, स्पर्श, गंध, स्वाद)', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें और पाठ के 3-4 केंद्रीय.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **रूपक केवल सजावट/अलंकार** है और बिंब केवल **"चित्र बनाना"**। वे लिखते हैं: "लेखक ने रूपक का प्रयोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को एक साधारण वाक्य दें: *"बारिश हो रही है।"* पूछें: *"इसे बिंब से लिखो"* (उत्तर: *"टप-टप बूँदें टिन की.', '**चरण 2:** उसी वाक्य को रूपक से लिखने को कहें (उत्तर: *"आसमान रो रहा था"* या *"बारिश धरती की प्यास बुझाने आई दूत थी"*)।.', '**चरण 3:** दोनों के **प्रभाव की तुलना** कराएँ: पहला आपको *भीगने का एहसास* देता है, दूसरा *करुणा/पवित्रता/आशा* का अर्थ।.', '**चरण 4:** अब पाठ के किसी अंश पर यही प्रक्रिया दोहराएँ — पहले बिंब छाँटें, फिर रूपक, फिर पूछें: *"अगर यह युक्ति हटा दी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox/Irony)** एक ऐसी साहित्यिक युक्ति है जहाँ कथन या स्थिति में.',
          hint: 'यदि अटके: c11_hin_v_cbse_02_006 (मुख्य विषय) और c11_hin_v_cbse_02_002 (कथानक) पर लौटें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास** को केवल "विरोधी बातें कहना" (oxymoron जैसे "जीवित मृत") समझ लेते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox/Irony)** एक ऐसी साहित्यिक युक्ति है जहाँ कथन या स्थिति में प्रकट',
                  options: ['**विरोधाभास (Paradox/Irony)** एक ऐसी साहित्यिक युक्ति है जहाँ कथन या स्थिति में प्रकट', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि अटके: c11_hin_v_cbse_02_006 (मुख्य विषय) और c11_hin_v_cbse_02_002 (कथानक) पर लौटें — विषय और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **विरोधाभास** को केवल "विरोधी बातें कहना" (oxymoron जैसे "जीवित मृत") समझ लेते हैं और **प्रतीक** को "कोई.' }
          ],
            remediations: { 'oxymoron': { steps: ['**पुनर्परीक्षण (Re-visit):** छात्र से कहें: "पाठ के उस अंश को फिर से पढ़ो जहाँ तुम्हें विरोधाभास/प्रतीक लगा। अब तीन.', '(ख) इच्छित/निहित अर्थ क्या है?', '(ग) दोनों के बीच का **तनाव (tension)** क्या सत्य खोलता है?" 2.', '**तुलनात्मक अभ्यास:** दो वाक्य दें — (क) "वह रोता हुआ हँस रहा था" (विरोधाभास) बनाम (ख) "मधुर कड़वाहट" (ऑक्सीमोरॉन).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द refers to the curated set of semantically dense.',
          hint: 'If stuck, review **Node 009 (प्रतीक/विरोधाभास)** — the mechanism of \'connotative surplus\'.',
          misconception: '**Specific Error:** Students believe \'मुख्य शब्द\' identification means **listing all Tatsam (Sanskrit-derived).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द refers to the curated set of semantically dense, contextually charged,',
                  options: ['पदावली: मुख्य शब्द refers to the curated set of semantically dense, contextually charged,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'If stuck, review **Node 009 (प्रतीक/विरोधाभास)** — the mechanism of \'connotative surplus\' (व्यंजना).',
                  misconception: '**Specific Error:** Students believe \'मुख्य शब्द\' identification means **listing all Tatsam (Sanskrit-derived) or difficult words** in the.' }
          ],
            remediations: { 'specific-error-students-believe-identification': { steps: ['**Step-by-Step Remediation:** 1.', '**Concrete Demonstration:** Take ONE sentence from the text.', 'Replace the suspected \'मुख्य शब्द\' with 3 synonyms (one Tadbhav, one Tatsam, one English loan).', 'What died?" Force them to articulate the *loss* (हानि), not the *meaning* (अर्थ).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" (Language Use in the Text) refers to the analytical study.',
          hint: 'Review "पदावली: मुख्य शब्द" (c11_hin_v_cbse_02_010) — focus on the \'Deshaj/आंचलिक\' word.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "व्याकरण: पाठ में भाषा-प्रयोग" का अर्थ है पाठ में आए **संधि, समास, उपसर्ग-प्रत्यय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" (Language Use in the Text) refers to the analytical study of the',
                  options: ['"पाठ में भाषा-प्रयोग" (Language Use in the Text) refers to the analytical study of the', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'Review "पदावली: मुख्य शब्द" (c11_hin_v_cbse_02_010) — focus on the \'Deshaj/आंचलिक\' word list and.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "व्याकरण: पाठ में भाषा-प्रयोग" का अर्थ है पाठ में आए **संधि, समास, उपसर्ग-प्रत्यय, कारक, काल** आदि की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**लेबलिंग बंद करें, कार्य देखें:** छात्र को एक वाक्य दें (जैसे: "वह चुपचाप चला गया" बनाम "उसके द्वारा चुपचाप जाया गया").', 'नायक की मनःस्थिति क्या झलकती है?" — इसे 3-4 विपरीत युग्म (contrasting pairs) पर करवाएँ। 2.', '**रजिस्टर मैपिंग:** पाठ के 3 अंश चुनें (वर्णन, संवाद, आंतरिक मोनोलॉग)। छात्र से कहें: "प्रत्येक में 3 शब्द चुनो जो.', '**मिनी-निबंध लेखन:** 100 शब्दों में लिखवाएँ: "पाठ 2 में \'बखरी\' शब्द केवल \'बड़ा घर\' नहीं है — यह सामंती संरचना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ बोध-प्रश्न पाठ में स्पष्टतः उल्लिखित तथ्यों, घटनाओं, पात्रों के कथन.',
          hint: 'यदि फँस जाएँ, तो तुरंत **पाठ 2 के \'मुख्य विषय और संदेश\' (c11_hin_v_cbse_02_006) और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = मेरी व्यक्तिगत राय (Personal Opinion)"। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ बोध-प्रश्न पाठ में स्पष्टतः उल्लिखित तथ्यों, घटनाओं, पात्रों के कथन या आँकड़ों',
                  options: ['वस्तुनिष्ठ बोध-प्रश्न पाठ में स्पष्टतः उल्लिखित तथ्यों, घटनाओं, पात्रों के कथन या आँकड़ों', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक अनुशासन है जिसमें किसी रचना के रचयिता के', 'कथानक (Plot) घटनाओं का तार्किक और कालानुक्रमिक क्रम है जो कहानी के \'क्या हुआ\' को दर्शाता', 'पाठ्य-परिवेश (Setting) कथा में घटनाओं का भौगोलिक, ऐतिहासिक, सामाजिक और सांस्कृतिक संदर्भ'],
                  hint: 'यदि फँस जाएँ, तो तुरंत **पाठ 2 के \'मुख्य विषय और संदेश\' (c11_hin_v_cbse_02_006) और \'विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = मेरी व्यक्तिगत राय (Personal Opinion)"। **गलत तर्क:** "चूँकि उत्तर पाठ.' }
          ],
            remediations: { 'personal-opinion': { steps: ['**साक्ष्य-आधारित अभ्यास (Evidence-Based Drill):** छात्र को पाठ 2 के 5 आशय-सूचक प्रश्न दें। प्रत्येक के लिए उससे कहें.', '**\'शाब्दिक बनाम वास्तविक\' तालिका (Literal vs.', 'Actual Table):** एक कॉलम में पात्र के बोले शब्द लिखें, दूसरे में प्रसंग, तीसरे में वास्तविक अर्थ। छात्र से 5 उदाहरण.', '**PEEL ढाँचे पर बाध्यकारी लेखन:** हर आशय-सूचक उत्तर के लिए **P**oint (दावा), **E**vidence (उद्धरण), **E**xplanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
