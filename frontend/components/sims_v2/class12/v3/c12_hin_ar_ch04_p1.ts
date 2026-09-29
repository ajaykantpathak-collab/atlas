import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p1',
    title: 'कैमरे में बंद अपाहजि · Part 1/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: 'कैमरे में बंद अपाहजि · Part 1/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_001', 'c12_hin_ar_cbse_04_002', 'c12_hin_ar_cbse_04_003', 'c12_hin_ar_cbse_04_004', 'c12_hin_ar_cbse_04_005', 'c12_hin_ar_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'कैमरे में बंद अपाहजि — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['कैमरे में बंद अपाहजि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_001', title: 'कैमरे में बंद अपाहजि — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 04 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is Nagarjun (नागार्जुन) and what is his primary literary identity? (Answer in 2-3 sentences.)', options: [
                { text: 'Nagarjun (1929–1990) was a prominent Hindi poet, novelist, and journalist associated with', outcome: 'Nagarjun (1929–1990) was a prominent Hindi poet, novelist, and journalist associated with the.' },
                { text: 'He was a classical Sanskrit poet', outcome: 'Not quite — Students often think "Before You Read" is just a biographical sketch to memorize for 1-mark.', reveals: 'before-you-read-is-just' },
                { text: 'Before You Read', outcome: 'Not quite — Students often think "Before You Read" is just a biographical sketch to memorize for 1-mark.', reveals: 'before-you-read-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_004', title: 'कैमरे में बंद अपाहजि — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'दसेज में चाँद विकट\' में दसेज-में-चाँद-विकट से पात्र उभरता है।',
            decisions: [{ prompt: 'What is the primary textual evidence that establishes the protagonist’s physical exhaustion in the opening stanza of “dSejs esa can vikfgt”?', options: [
                { text: 'The phrase “can vikfgt” (tired to the bone) and the line “vkidk vikfgtiu rks nq[k nsrk', outcome: 'The phrase “can vikfgt” (tired to the bone) and the line “vkidk vikfgtiu rks nq[k nsrk gksxk” (your.' },
                { text: 'ge nwjn\'kZu ij cksysaxs', outcome: 'Not quite — Students often treat the protagonist as a mere mouthpiece for the poet’s biography (e.g., “j?kqohj.', reveals: 'students-often-treat-the-protagonist' },
                { text: 'author background', outcome: 'Not quite — Students often treat the protagonist as a mere mouthpiece for the poet’s biography (e.g., “j?kqohj.', reveals: 'students-often-treat-the-protagonist' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_006', title: 'कैमरे में बंद अपाहजि — साहित्यिक युक्तियाँ: अलंकार',
          caseStudy: { intro: 'सब घटनाएँ \'दसेज में चाँद विकट\' में \'दसेज में चाँद विकट\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "देश में चाँद विकृत" in the title of the poem?', options: [
                { text: 'The literal meaning is "the moon in the country is distorted/reflected imperfectly." A', outcome: 'The literal meaning is "the moon in the country is distorted/reflected imperfectly." A wrong answer.' },
                { text: 'the moon in the country is distorted/reflected imperfectly', outcome: 'Not quite — Students often equate the **primary theme** with the **subject matter** — writing "the poem.', reveals: 'students-often-equate-the-primary' },
                { text: 'the moon is ugly', outcome: 'Not quite — Students often equate the **primary theme** with the **subject matter** — writing "the poem.', reveals: 'students-often-equate-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'What comes next? कैमरे में बंद अपाहजि · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कैमरे में बंद अपाहजि · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review the \'Before You Read\' section of any Class 11 Aroh chapter (e.g.',
          misconception: 'Students often think "Before You Read" is just a biographical sketch to memorize for 1-mark questions.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why knowing the socio-political context of a poem is essential before analyzing its literary devices.', answer: 'Literary devices serve the poet\'s message',
                  options: ['Literary devices serve the poet\'s message', 'Context is only for history class', 'Before You Read', '"Before You Read" is just a biographical sketch to memorize for 1-mark questions'],
                  hint: 'Review the \'Before You Read\' section of any Class 11 Aroh chapter (e.g., c11_hin_ar_cbse_01_001).',
                  misconception: 'Students often think "Before You Read" is just a biographical sketch to memorize for 1-mark questions.' },
                { id: 'b', prompt: 'Compare the background note on Nagarjun with what you know about Premchand (from Class 11).', answer: 'Both worked as journalists',
                  options: ['Both worked as journalists', 'Journalism has no effect on fiction', 'Before You Read', '"Before You Read" is just a biographical sketch to memorize for 1-mark questions'],
                  hint: 'Review the \'Before You Read\' section of any Class 11 Aroh chapter (e.g., c11_hin_ar_cbse_01_001).',
                  misconception: 'Students often think "Before You Read" is just a biographical sketch to memorize for 1-mark questions.' }
          ],
            remediations: { 'before-you-read-is-just': { steps: ['If a student cannot articulate the poet\'s context, have them: (1) Re-read the \'Before You Read\' box and underline three.', '(2) Watch a 5-minute YouTube summary of the Progressive Writers\' Movement (search "प्रगतिशील लेखक आंदोलन नागार्जुन").', '(3) Write two sentences linking each underlined fact to a possible theme in the poem.', 'Then re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_002', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' का कथानक — \'दसेज में चाँद विकट\' — आरोह भाग-2 का पाठ। पाठ.',
          hint: 'If stuck, revisit Class 11 "काव्य सौंदर्य" chapter (c11_hin_ar_cbse_04_002) exercise.',
          misconception: 'Students treat "plot" in poetry as "what happens" and look for characters, events, and chronological order.',
          parts: [
                { id: 'a', prompt: 'Compare the structural function of the line "गें हम खुले बाँहों से कहेंगे कि क्या ऐसा है" (stanza 4) with "फिर हम चाँद पर लिखेंगे" (stanza 5).', answer: 'Correct: "कहेंगे" marks oral, public declaration',
                  options: ['Correct: "कहेंगे" marks oral, public declaration', 'express'],
                  hint: 'If stuck, revisit Class 11 "काव्य सौंदर्य" chapter (c11_hin_ar_cbse_04_002) exercise on mapping.',
                  misconception: 'Students treat "plot" in poetry as "what happens" and look for characters, events, and chronological order.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['Have the student read only the first and last stanza aloud, then ask: "What changed in *who is speaking* and *what form.', 'Give a 3-column table: Stanza | Speaker/Voice | Grammatical form of "विकृत" | Speech act.', 'Ask: "If you removed the pilot report, what would the poem lose?" — force articulation of the evidentiary function.', 'Re-attempt Diagnostic Question 5 with the table as scaffold.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "plot" in poetry as "what happens" and look for characters, events, and chronological order.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s structure is better described as "circular" (ending where it began) or "spiral" (returning to the starting image at a deeper.', answer: 'Correct: Spiral',
                  options: ['Correct: Spiral', 'circular'],
                  hint: 'If stuck, revisit Class 11 "काव्य सौंदर्य" chapter (c11_hin_ar_cbse_04_002) exercise on mapping.',
                  misconception: 'Students treat "plot" in poetry as "what happens" and look for characters, events, and chronological order.' }
          ],
            remediations: { 'students-treat-plot-in-poetry': { steps: ['Have the student read only the first and last stanza aloud, then ask: "What changed in *who is speaking* and *what form.', 'Give a 3-column table: Stanza | Speaker/Voice | Grammatical form of "विकृत" | Speech act.', 'Ask: "If you removed the pilot report, what would the poem lose?" — force articulation of the evidentiary function.', 'Re-attempt Diagnostic Question 5 with the table as scaffold.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_003', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटका हुआ महसूस करें तो कक्षा ११ के \'हस्तक्षेप\' कविता (c11_hin_ar_cbse_15_003) का.',
          misconception: 'विद्यार्थी समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद पहचानना (जैसे दोहा, चौपाई) या तुकांत बताना है — वे संरचना को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)',
                  options: ['\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस करें तो कक्षा ११ के \'हस्तक्षेप\' कविता (c11_hin_ar_cbse_15_003) का.',
                  misconception: 'विद्यार्थी समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद पहचानना (जैसे दोहा, चौपाई) या तुकांत बताना है — वे संरचना को स्थैतिक (स्टैटिक).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: विद्यार्थी से कविता जोर से पढ़वाएँ और केवल विराम चिह्नों (कॉमा, पूर्ण विराम, डैश) को चिह्नित करने को कहें.', 'कहाँ तेज चलती है?\' चरण २: प्रत्येक पद की पंक्तियाँ गिनवाएँ और तुकांत शब्दों को रेखांकित करवाएँ — पूछें: \'पैटर्न कहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_004', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck, revisit c11_hin_ar_cbse_01_004 and re‑write one PEEL paragraph on a परिचित.',
          misconception: 'Students often treat the protagonist as a mere mouthpiece for the poet’s biography (e.g., “j?kqohj lgk; was.',
          parts: [
                { id: 'a', prompt: 'Apply the “Action → Trait → Theme” framework to the protagonist’s act of sharing a cigarette (“ge ,d nqcZy dks yk,¡xs”). Write the three-step inference chain.', answer: 'Step 1 (Action): The protagonist lights and shares a single cigarette',
                  options: ['Step 1 (Action): The protagonist lights and shares a single cigarette', 'they smoke', 'author background'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_01_004 and re‑write one PEEL paragraph on a परिचित character.',
                  misconception: 'Students often treat the protagonist as a mere mouthpiece for the poet’s biography (e.g., “j?kqohj lgk; was a journalist, so the.' }
          ],
            remediations: { 'students-often-treat-the-protagonist': { steps: ['Re‑read the poem *without* the introductory biography.', 'Highlight every verb associated with the speaker (first‑person plural “ge”, “hum”).', 'For each verb, ask: “What choice does this verb reveal?” 4.', 'Write one sentence per verb linking the choice to a trait (e.g., “chooses to sit on floor → rejects false comfort →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_005', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि गुरु-लघु या गण बनाने में अटके: **c11_hin_a_cbse_13_005** के \'मात्रा-गण अभ्यास खंड\' को.',
          misconception: 'छात्र समझते हैं कि **\'मात्रा गिनकर गण बना लेना ही छंद-विश्लेषण पूरा हो गया\'** — जबकि बोर्ड/CUET में पूछा जाता है: **"इस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'दसेज में चाँद विकट\' के सहायक पात्र',
                  options: ['\'दसेज में चाँद विकट\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'दसेज में चाँद विकट\' का कथानक', '\'दसेज में चाँद विकट\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि गुरु-लघु या गण बनाने में अटके: **c11_hin_a_cbse_13_005** के \'मात्रा-गण अभ्यास खंड\' को 15 मिनट.',
                  misconception: 'छात्र समझते हैं कि **\'मात्रा गिनकर गण बना लेना ही छंद-विश्लेषण पूरा हो गया\'** — जबकि बोर्ड/CUET में पूछा जाता है: **"इस छंद/लय/यति/अनुप्रास.' }
          ],
            remediations: { 'cuet': { steps: ['**पुनः पढ़ो**: कविता की पहली 4 पंक्तियाँ **ताली बजाते हुए** पढ़ो — जहाँ ताली पड़े, वहाँ यति चिह्नित करो। 2.', '**मात्रा-तालिका बनाओ**: प्रत्येक शब्द के नीचे गुरु(2)/लघु(1) लिखो, फिर गण बाँधो (कविता के पहले दो पदों के लिए)। 3.', '**भाव-सेतु जोड़ो**: हर गण/यति/अनुप्रास के सामने एक वाक्य लिखो: "यह ——— भाव देता है क्योंकि ———"। 4.', '**पुनः-निदान**: उपरोक्त DIAGNOSTIC_Q2 और Q3 फिर से हल करो — अब उत्तर में \'भाव-प्रभाव\' अनिवार्य रूप से आएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_006', difficulty: 'standard',
          question: '\'दसेज में चाँद विकट\' का मुख्य विषय — \'दसेज में चाँद विकट\' का केंद्रीय भाव और.',
          hint: 'If stuck, review the "Speaker Identification" mini-lesson in node c12_hin_ar_cbse_04_002.',
          misconception: 'Students often equate the **primary theme** with the **subject matter** — writing "the poem is about labourers building.',
          parts: [
                { id: 'a', prompt: 'Analyse how the single word "नचनी" (dancer/entertainer) in the contractor\'s promise encapsulates the poem\'s critique of cultural diversion as a tool.', answer: '"नचनी" condenses three layers: (a) literal',
                  options: ['"नचनी" condenses three layers: (a) literal', 'as just a plot detail ('],
                  hint: 'If stuck, review the "Speaker Identification" mini-lesson in node c12_hin_ar_cbse_04_002 and the.',
                  misconception: 'Students often equate the **primary theme** with the **subject matter** — writing "the poem is about labourers building a road" — or with.' }
          ],
            remediations: { 'students-often-equate-the-primary': { steps: ['Re-read the poem **only for speaker shifts** — mark every "हम" and every contractor line in two colours.', 'List side-by-side: Contractor\'s Promises vs.', 'Workers\' Reality (use a T-chart).', 'Revisit node **c12_hin_ar_cbse_04_008** (Imagery and Metaphor) to see how the moon symbol is built, then return here.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
