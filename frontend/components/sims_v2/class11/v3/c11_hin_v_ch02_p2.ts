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
        { title: 'पाठ 2 — गौण विषय', text: '\'वितान भाग-1 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_009', title: 'पाठ 2 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 2\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony and give one example from the chapter where the Agarias\' labor produces an outcome opposite to what they deserve.', options: [
                { text: 'Situational irony occurs when actions produce results starkly contrary to intentions or', outcome: 'Situational irony occurs when actions produce results starkly contrary to intentions or justice.' },
                { text: 'irony means sarcasm', outcome: 'Not quite — Students conflate symbolism with imagery, treating every descriptive detail (e.g., "smoke,".', reveals: 'students-conflate-symbolism-with-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_011', title: 'पाठ 2 — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 2\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Define the term "इक्यजिकुह" as used in the chapter and state its English equivalent.', options: [
                { text: '"इक्यजिकुह" refers to the topsoil layer that is fertile and suitable for cultivation,', outcome: '"इक्यजिकुह" refers to the topsoil layer that is fertile and suitable for cultivation, equivalent.' },
                { text: 'इकरिकुह', outcome: 'Not quite — Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic.', reveals: 'students-often-equate-language-usage' },
                { text: 'जस्त.किकुह', outcome: 'Not quite — Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic.', reveals: 'students-often-equate-language-usage' }
            ] }] } },
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
          question: '\'वितान भाग-1 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय को 3.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = पाठ में कम आने वाला विषय" या "गौण विषय = मुख्य विषय से असंबंधित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'वितान भाग-1 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय को 3 बिंदुओं में.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "गौण विषय = पाठ में कम आने वाला विषय" या "गौण विषय = मुख्य विषय से असंबंधित प्रसंग"। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के 3 ऐसे प्रसंग चुनो जो मुख्य विषय (जल-प्रबंधन) से **सीधे** न जुड़ते हों पर तुम्हें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_008', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें और पाठ के 3-4.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **रूपक केवल सजावट/अलंकार** है और बिंब केवल **"चित्र बनाना"**। वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'वितान भाग-1 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_02_006 (मुख्य विषय और संदेश)** दोबारा पढ़ें और पाठ के 3-4 केंद्रीय.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **रूपक केवल सजावट/अलंकार** है और बिंब केवल **"चित्र बनाना"**। वे लिखते हैं: "लेखक ने रूपक का प्रयोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को एक साधारण वाक्य दें: *"बारिश हो रही है।"* पूछें: *"इसे बिंब से लिखो"* (उत्तर: *"टप-टप बूँदें टिन की.', '**चरण 2:** उसी वाक्य को रूपक से लिखने को कहें (उत्तर: *"आसमान रो रहा था"* या *"बारिश धरती की प्यास बुझाने आई दूत थी"*)।.', '**चरण 3:** दोनों के **प्रभाव की तुलना** कराएँ: पहला आपको *भीगने का एहसास* देता है, दूसरा *करुणा/पवित्रता/आशा* का अर्थ।.', '**चरण 4:** अब पाठ के किसी अंश पर यही प्रक्रिया दोहराएँ — पहले बिंब छाँटें, फिर रूपक, फिर पूछें: *"अगर यह युक्ति हटा दी.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_009', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'Revisit c11_hin_v_cbse_02_001 (Context) for Agaria socio-economic reality and.',
          misconception: 'Students conflate symbolism with imagery, treating every descriptive detail (e.g., "smoke," "hammer") as a symbol.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "underground stream" (भूमिगत नदी) functions as a symbol, not just a geographical detail. What abstract idea does it represent?', answer: 'The underground stream symbolizes the hidden, suppressed suffering and invisible',
                  options: ['The underground stream symbolizes the hidden, suppressed suffering and invisible', 'it shows water scarcity'],
                  hint: 'Revisit c11_hin_v_cbse_02_001 (Context) for Agaria socio-economic reality and c11_hin_v_cbse_02_008.',
                  misconception: 'Students conflate symbolism with imagery, treating every descriptive detail (e.g., "smoke," "hammer") as a symbol.' }
          ],
            remediations: { 'students-conflate-symbolism-with-imagery': { steps: ['Give the student two columns—"Literal Detail" vs. "Symbolic Meaning"—and have them classify 5 textual elements.', 'For irony, provide a 3-row table: "Expectation / Reality / Type of Irony" using the Agarias\' wages, the state\'s.', 'Ask them to rewrite one paragraph replacing symbols with literal language, then discuss what is lost.', 'Assign a micro-essay: "How does the chain symbolize what irony exposes?" forcing synthesis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_010', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review **Node 009 (प्रतीक/विरोधाभास)** — the mechanism of \'connotative surplus\'.',
          misconception: '**Specific Error:** Students believe \'मुख्य शब्द\' identification means **listing all Tatsam (Sanskrit-derived).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'वितान भाग-1 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review **Node 009 (प्रतीक/विरोधाभास)** — the mechanism of \'connotative surplus\' (व्यंजना).',
                  misconception: '**Specific Error:** Students believe \'मुख्य शब्द\' identification means **listing all Tatsam (Sanskrit-derived) or difficult words** in the.' }
          ],
            remediations: { 'specific-error-students-believe-identification': { steps: ['**Step-by-Step Remediation:** 1.', '**Concrete Demonstration:** Take ONE sentence from the text.', 'Replace the suspected \'मुख्य शब्द\' with 3 synonyms (one Tadbhav, one Tatsam, one English loan).', 'What died?" Force them to articulate the *loss* (हानि), not the *meaning* (अर्थ).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_011', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review the definitions of इक्यजिकुह, इकरिकुह, जस्त.किकुह, ओक्यूबज, बाखा, फोस्पा.',
          misconception: 'Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic patterns (passive voice.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'वितान भाग-1 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review the definitions of इक्यजिकुह, इकरिकुह, जस्त.किकुह, ओक्यूबज, बाखा, फोस्पा from the.',
                  misconception: 'Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic patterns (passive voice, clause embedding).' }
          ],
            remediations: { 'students-often-equate-language-usage': { steps: ['Have the student highlight every verb in two contrasting paragraphs (one technical, one narrative) and label each.', 'Ask them to list all nouns ending in "-इकुह" or "-आ" and break them into root + suffix.', 'Provide a short active-voice version of a technical description and ask them to convert it to passive, then discuss.', 'Finally, have them write a one-paragraph explanation of why the author\'s grammatical choices suit the text\'s purpose.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic patterns (passive voice.',
          parts: [
                { id: 'a', prompt: 'Critique the author\'s decision to retain dialect words like "बाखा", "जस्ता", "लद्दाखी" without glosses in the main text.', answer: 'Retaining dialect words without glosses preserves authenticity and respects the',
                  options: ['Retaining dialect words without glosses preserves authenticity and respects the', 'metaphor'],
                  hint: 'If stuck, review the definitions of इक्यजिकुह, इकरिकुह, जस्त.किकुह, ओक्यूबज, बाखा, फोस्पा from the.',
                  misconception: 'Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic patterns (passive voice, clause embedding).' }
          ],
            remediations: { 'students-often-equate-language-usage': { steps: ['Have the student highlight every verb in two contrasting paragraphs (one technical, one narrative) and label each.', 'Ask them to list all nouns ending in "-इकुह" or "-आ" and break them into root + suffix.', 'Provide a short active-voice version of a technical description and ask them to convert it to passive, then discuss.', 'Finally, have them write a one-paragraph explanation of why the author\'s grammatical choices suit the text\'s purpose.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_012', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ, तो तुरंत **पाठ 2 के \'मुख्य विषय और संदेश\' (c11_hin_v_cbse_02_006) और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = मेरी व्यक्तिगत राय (Personal Opinion)"। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'वितान भाग-1 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 2\' का कथानक — \'वितान भाग-1 — पाठ 2\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ, तो तुरंत **पाठ 2 के \'मुख्य विषय और संदेश\' (c11_hin_v_cbse_02_006) और \'विरोधाभास और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = मेरी व्यक्तिगत राय (Personal Opinion)"। **गलत तर्क:** "चूँकि उत्तर पाठ.' }
          ],
            remediations: { 'personal-opinion': { steps: ['**साक्ष्य-आधारित अभ्यास (Evidence-Based Drill):** छात्र को पाठ 2 के 5 आशय-सूचक प्रश्न दें। प्रत्येक के लिए उससे कहें.', '**\'शाब्दिक बनाम वास्तविक\' तालिका (Literal vs.', 'Actual Table):** एक कॉलम में पात्र के बोले शब्द लिखें, दूसरे में प्रसंग, तीसरे में वास्तविक अर्थ। छात्र से 5 उदाहरण.', '**PEEL ढाँचे पर बाध्यकारी लेखन:** हर आशय-सूचक उत्तर के लिए **P**oint (दावा), **E**vidence (उद्धरण), **E**xplanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
