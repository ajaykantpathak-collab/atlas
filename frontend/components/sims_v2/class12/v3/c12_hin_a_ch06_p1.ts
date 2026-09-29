import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p1: SimDef = {
    id: 'v3_c12_hin_a_ch06_p1',
    title: 'तुलसीदास · Part 1/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'तुलसीदास · Part 1/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_001', 'c12_hin_a_cbse_06_002', 'c12_hin_a_cbse_06_003', 'c12_hin_a_cbse_06_004', 'c12_hin_a_cbse_06_005', 'c12_hin_a_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'तुलसीदास — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['तुलसीदास — कवि परिचय', 'तुलसीदास — पद्यांश-वार भावार्थ', 'तुलसीदास — काव्य-संरचना और', 'तुलसीदास — केंद्रीय भाव', 'तुलसीदास — छंद और', 'तुलसीदास — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_001', title: 'तुलसीदास — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 06 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who was Raskhan, and during which period did he live?', options: [
                { text: 'Raskhan (रसखान) was a 16th–17th century Hindi poet (c', outcome: 'Raskhan (रसखान) was a 16th–17th century Hindi poet (c. 1532–1623) born in a Muslim family, possibly.' },
                { text: 'He was a Mughal emperor', outcome: 'Not quite — Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic".', reveals: 'raskhan-s-muslim-background-makes' },
                { text: 'He wrote in Sanskrit', outcome: 'Not quite — Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic".', reveals: 'raskhan-s-muslim-background-makes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_002', title: 'तुलसीदास — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'हजारी-जइके\' का क्रम: शुरुआत हजारी-जइके से, घटनाएँ बढ़ती हैं, अंत \'हजारी-जइके\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the chronological sequence of major life events presented in the biographical sketch of Raskhan before he composed "हजारी-जइके"?', options: [
                { text: 'Correct sequence: Birth in Kannauj (c', outcome: 'Correct sequence: Birth in Kannauj (c. 1532) → Early loss of parents → Education in Persian/Arabic.' },
                { text: 'life journey', outcome: 'Not quite — Students treat the biographical sketch as "just facts" and the poem as "just images," missing that.', reveals: 'students-treat-the-biographical-sketch' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_004', title: 'तुलसीदास — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'हजारी-जइके\' में हजारी-जइके से पात्र उभरता है।',
            decisions: [{ prompt: 'What is the primary difference between analyzing a protagonist in a fictional narrative versus analyzing a historical-poetic figure like.', options: [
                { text: 'In fictional narratives, the protagonist is a constructed character whose traits we infer', outcome: 'In fictional narratives, the protagonist is a constructed character whose traits we infer only from.' },
                { text: 'Both use dialogues and actions', outcome: 'Not quite — Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his.', reveals: 'students-treat-raskhan-s-conversion' },
                { text: 'कहा जाता है', outcome: 'Not quite — Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his.', reveals: 'students-treat-raskhan-s-conversion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_005', title: 'तुलसीदास — छंद और लय-विधान',
          caseStudy: { intro: '\'हजारी-जइके\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'Identify the two supporting characters who appear in BOTH prose excerpts (जयदेव and मैथिलीशरण गुप्त) but are absent from the poem "हरि-केसव.', options: [
                { text: 'Correct answer: यशोदा (Krishna\'s foster mother) and रोहिणी/बलराम की माता (implied in', outcome: 'Correct answer: यशोदा (Krishna\'s foster mother) and रोहिणी/बलराम की माता (implied in second.' },
                { text: 'गोपियाँ', outcome: 'Not quite — Students treat supporting characters as "background decoration" and write only physical.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_006', title: 'तुलसीदास — साहित्यिक युक्तियाँ: अलंकार',
          caseStudy: { intro: 'सब घटनाएँ \'हजारी-जइके\' में \'हजारी-जइके\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'तुलसीदास के पद्यों में \'अनुप्रास अलंकार\' की पहचान करने का सबसे सीधा नियम क्या है? उदाहरण सहित बताइए।', options: [
                { text: '**Correct answer**: अनुप्रास अलंकार तब होता है जब एक ही वर्ण (व्यंजन या स्वर) की आवृत्ति', outcome: '**Correct answer**: अनुप्रास अलंकार तब होता है जब एक ही वर्ण (व्यंजन या स्वर) की आवृत्ति बार-बार.' },
                { text: 'कनक कनक ते सौ गुनी', outcome: 'Not quite — **Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and.', reveals: 'exact-error-students-memorize-alankar' },
                { text: 'word repetition', outcome: 'Not quite — **Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and.', reveals: 'exact-error-students-memorize-alankar' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'What comes next? तुलसीदास · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तुलसीदास · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read".',
          misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial.',
          parts: [
                { id: 'a', prompt: 'Who was Raskhan, and during which period did he live?', answer: 'Raskhan (रसखान) was a 16th–17th century Hindi poet (c',
                  options: ['Raskhan (रसखान) was a 16th–17th century Hindi poet (c', 'He was a Mughal emperor', 'He wrote in Sanskrit', 'unusual'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' },
                { id: 'b', prompt: 'The "Before You Read" section mentions Raskhan\'s works include *dohas*, *pads*, and *savaiyas*.', answer: 'It would be a *doha*',
                  options: ['It would be a *doha*', 'savaiya', 'unusual', 'syncretic'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' }
          ],
            remediations: { 'raskhan-s-muslim-background-makes': { steps: ['Re-read the "Before You Read" box *aloud* slowly, underlining every proper noun (Raskhan, Jake Panjrekul, Vrindavan.', 'Create a two-column table: left column = facts from the text (birth, turning point, works, death), right column.', 'Watch a 5-minute video on "Bhakti Movement and Syncretism" (e.g., NCERT Class 12 History Chapter 6 summary).', 'Re-attempt Diagnostic Question 2 and 5, checking if your answers now reflect the *internal logic of bhakti* rather than.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Raskhan\'s poetry is merely an imitation of Surdas or other Hindu Bhakti poets." Defend your judgment with evidence from the context.', answer: 'The statement is false',
                  options: ['The statement is false', 'unusual', 'syncretic', 'He was a Muslim who wrote Hindu poems'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' },
                { id: 'b', prompt: 'Write a short paragraph (4–5 lines) in Hindi or English imagining Raskhan\'s inner monologue at the moment he decided to leave his earlier life and settle.', answer: 'A strong response might be: "The verse from Jake Panjrekul echoed in my heart',
                  options: ['A strong response might be: "The verse from Jake Panjrekul echoed in my heart', 'unusual', 'syncretic', 'He was a Muslim who wrote Hindu poems'],
                  hint: 'If stuck, review Class 11 Hindi *Antra* Chapter 1 "Before You Read" (c11_hin_ar_cbse_01_001) and.',
                  misconception: 'Students often think Raskhan\'s Muslim background makes his Krishna-bhakti "unusual" or "syncretic" in a superficial way, leading them.' }
          ],
            remediations: { 'raskhan-s-muslim-background-makes': { steps: ['Re-read the "Before You Read" box *aloud* slowly, underlining every proper noun (Raskhan, Jake Panjrekul, Vrindavan.', 'Create a two-column table: left column = facts from the text (birth, turning point, works, death), right column.', 'Watch a 5-minute video on "Bhakti Movement and Syncretism" (e.g., NCERT Class 12 History Chapter 6 summary).', 'Re-attempt Diagnostic Question 2 and 5, checking if your answers now reflect the *internal logic of bhakti* rather than.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_002', difficulty: 'standard',
          question: '\'हजारी-जइके\' का कथानक — \'हजारी-जइके\' — अंतरा भाग-2 का पाठ। पाठ का कथानक, पात्र.',
          hint: 'If unable to map structure, revisit c11_hin_ar_cbse_01_002 (prose narrative arcs) and.',
          misconception: 'Students treat the biographical sketch as "just facts" and the poem as "just images," missing that *both are carefully.',
          parts: [
                { id: 'a', prompt: 'What is the chronological sequence of major life events presented in the biographical sketch of Raskhan before he composed "हजारी-जइके"?', answer: 'Correct sequence: Birth in Kannauj (c',
                  options: ['Correct sequence: Birth in Kannauj (c', 'life journey'],
                  hint: 'If unable to map structure, revisit c11_hin_ar_cbse_01_002 (prose narrative arcs) and.',
                  misconception: 'Students treat the biographical sketch as "just facts" and the poem as "just images," missing that *both are carefully structured.' },
                { id: 'b', prompt: 'Compare the narrative structure of the biographical prose (linear, chronological) with the poem\'s structure (imagistic, emotional escalation).', answer: 'Prose uses *chronological causality* (event A → event B) to establish historical',
                  options: ['Prose uses *chronological causality* (event A → event B) to establish historical', 'linear', 'descriptive'],
                  hint: 'If unable to map structure, revisit c11_hin_ar_cbse_01_002 (prose narrative arcs) and.',
                  misconception: 'Students treat the biographical sketch as "just facts" and the poem as "just images," missing that *both are carefully structured.' }
          ],
            remediations: { 'students-treat-the-biographical-sketch': { steps: ['Re-read the biographical sketch *only for sequence markers*: "पहले", "फिर", "बाद में", "तब" — mark each temporal.', 'Re-read the poem *stanza by stanza* asking: "What changes from previous stanza?" (Not "what is described?" but "what.', 'Complete node c11_hin_ar_cbse_01_002 (Class 11 Plot & Narrative Structure) Exercise 3 on "emotional arc as plot." 4.', 'Re-attempt Diagnostic Question 4 — if still stuck, map both texts on a two-column chart: Left = Prose Event, Right.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_003', difficulty: 'standard',
          question: '\'हजारी-जइके\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.',
          hint: 'यदि तुकाबंदी पहचान में फँस गए हैं, तो c12_hin_a_cbse_06_002 में भावार्थ विश्लेषण पर फिर.',
          misconception: 'छात्र अक्सर यह मानते हैं कि यदि एक पद में तुकाबंदी योजना स्थिर नहीं है, तो यह खराब कविता है या तुलसीदास ने छंद नियमों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)',
                  options: ['\'हजारी-जइके\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पात्र-चित्रण'],
                  hint: 'यदि तुकाबंदी पहचान में फँस गए हैं, तो c12_hin_a_cbse_06_002 में भावार्थ विश्लेषण पर फिर से विचार.',
                  misconception: 'छात्र अक्सर यह मानते हैं कि यदि एक पद में तुकाबंदी योजना स्थिर नहीं है, तो यह खराब कविता है या तुलसीदास ने छंद नियमों का पालन नहीं किया। यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक विशिष्ट पद (जैसे रामचरितमानस से एक दुखद क्षण) दिखाइए जहाँ तुकाबंदी बदलती है। उनसे पहले स्थिर तुकाबंदी वाले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_004', difficulty: 'standard',
          question: '\'हजारी-जइके\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck on "how to analyze a real person as character," revisit c11_hin_v_cbse_01_004.',
          misconception: 'Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his religion." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' का पात्र-चित्रण',
                  options: ['\'हजारी-जइके\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on "how to analyze a real person as character," revisit c11_hin_v_cbse_01_004 (Vitan.',
                  misconception: 'Students treat Raskhan\'s "conversion" as a single event (Muslim → Hindu) and write: "He changed his religion." This is historically.' }
          ],
            remediations: { 'students-treat-raskhan-s-conversion': { steps: ['Have the student re-read the biographical sketch (पृष्ठ 33-34) and underline every *process verb* — "सीखा" (learnt).', 'In the poems, highlight *first-person markers* ("मेरे", "मैं", "मुझको") and *address terms* ("प्राणनाथ", "मन मंदिर").', 'Create a two-column timeline: Left column = biographical actions (external), Right column = poetic expressions.', 'Rewrite the "conversion" sentence as: "Raskhan\'s *gradual alignment* of outer life (language, location, community) with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_005', difficulty: 'standard',
          question: '\'हजारी-जइके\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते.',
          hint: 'If stuck on PEEL, revisit c12_hin_a_cbse_06_004 Worked Example 2.',
          misconception: 'Students treat supporting characters as "background decoration" and write only physical descriptions or plot summaries.',
          parts: [
                { id: 'a', prompt: 'In the second prose excerpt (मैथिलीशरण गुप्त), Yashoda sends Krishna to Vrindavan.', answer: 'Sample PEEL response: Point',
                  options: ['Sample PEEL response: Point', 'dramatic agency'],
                  hint: 'If stuck on PEEL, revisit c12_hin_a_cbse_06_004 Worked Example 2.',
                  misconception: 'Students treat supporting characters as "background decoration" and write only physical descriptions or plot summaries.' },
                { id: 'b', prompt: 'Compare the portrayal of maternal anxiety in Yashoda (prose excerpt 1) vs. the implied mother-figure in the poem "हरि-केसव की प्रीति".', answer: 'Correct answer: Prose (जयदेव) uses detailed narration',
                  options: ['Correct answer: Prose (जयदेव) uses detailed narration', 'both show love'],
                  hint: 'If stuck on PEEL, revisit c12_hin_a_cbse_06_004 Worked Example 2.',
                  misconception: 'Students treat supporting characters as "background decoration" and write only physical descriptions or plot summaries.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Re-read node c12_hin_a_cbse_06_004 (Protagonist Analysis) to recall how Krishna\'s divinity is established.', 'Take the prose excerpt 1 (जयदेव). Highlight every verb associated with Yashoda in one color, every verb associated with.', 'For each Yashoda-verb, ask: "What does this human action reveal about the divine child?"', 'Write 3 PEEL paragraphs linking one verb each to a specific aspect of Krishna\'s divinity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_006', difficulty: 'standard',
          question: '\'हजारी-जइके\' का मुख्य विषय — \'हजारी-जइके\' का केंद्रीय भाव और संदेश',
          hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.).',
          misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords*.',
          parts: [
                { id: 'a', prompt: 'दिए गए पदांश में अलंकार पहचानिए और बताइए कि वह पद के केंद्रीय भाव को कैसे तीव्र करता है: "सीय राम मय सब जग जानी / करहु प्रणाम जोरि जुग पानी"', answer: '**Correct answer**: **यमक अलंकार**',
                  options: ['**Correct answer**: **यमक अलंकार**', 'अनुप्रास'],
                  hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.) and.',
                  misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords* in the text.' },
                { id: 'b', prompt: 'तुलसीदास एक ही भाव को व्यक्त करने के लिए दो अलग-अलग अलंकारों — उपमा और रूपक — का प्रयोग कब और क्यों करते हैं? एक पद से उदाहरण देकर विश्लेषण कीजिए।', answer: '**Correct answer**: - **उपमा** (explicit comparison: "जैसे...वैसे")',
                  options: ['**Correct answer**: - **उपमा** (explicit comparison: "जैसे...वैसे")', 'comparison figures'],
                  hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.) and.',
                  misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords* in the text.' }
          ],
            remediations: { 'exact-error-students-memorize-alankar': { steps: ['Take ONE pada (e.g., "सीय राम मय सब जग जानी").', '**Read it 3 times**: (a) literal meaning, (b) theological meaning (what does Tulsidas want the bhakta to *realize*?).', '**Ask**: "If I delete this word/phrase, does the *realization* weaken?" If yes → that\'s your alankar\'s *function*.', '**Revisit Class 11 nodes**: `c11_hin_a_cbse_13_006` (जाग तुझको दूर जाना — अलंकार) and `c11_hin_a_cbse_14_006` (बादल को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
