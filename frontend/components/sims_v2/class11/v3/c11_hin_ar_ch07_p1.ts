import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch07_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch07_p1',
    title: 'पाठ 7 · Part 1/3',
    subtitle: 'Follow a simple request through an office where procedure eats its purpose.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 7 · Part 1/3',
    chapters: ['c11_hin_ar_ch07'],
    nodeIds: ['c11_hin_ar_cbse_07_001', 'c11_hin_ar_cbse_07_002', 'c11_hin_ar_cbse_07_003', 'c11_hin_ar_cbse_07_004', 'c11_hin_ar_cbse_07_005', 'c11_hin_ar_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen trapped in a paper corridor', intro: 'One lost child, three offices, zero responsibility — Renu turns a queue into a verdict on the system.', goal: 'Read bureaucratic satire and analyse how episodic structure builds the indictment.' },
    discovery: {
        question: 'A lost child at the station gets shuffled: report at Platform 3, stamp at the Superintendent\'s, return — by which time the child is gone. Just slapstick?',
        options: ['No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty', 'Yes — it\'s comedy with no bite', 'Yes — the child should have waited properly', 'No — it\'s actually a ghost story'],
        answer: 'No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty',
        hook: 'Anchalik fiction\'s trick: village dialect and folk detail aren\'t decoration — they\'re the machinery that makes the bureaucracy look absurd.',
    },
    teaching: [
        { title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the runaround office to office, identify where satire turns to indictment, and test whether the ending punishes the system or just exposes it.',
        labels: ['पाठ 7 — पृष्ठभूमि', 'पाठ 7 — कथानक', 'पाठ 7 — पाठ्य-परिवेश', 'पाठ 7 — पात्र-चित्रण', 'पाठ 7 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_001', title: 'पाठ 7 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 07 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is Phanishwar Nath Renu, and what literary movement is he associated with in Hindi literature?', options: [
                { text: 'Phanishwar Nath Renu (1914–1977) is a seminal Hindi writer from Aurahi Hingna, Araria', outcome: 'Phanishwar Nath Renu (1914–1977) is a seminal Hindi writer from Aurahi Hingna, Araria (Bihar), and.' },
                { text: 'Chhayavad poet', outcome: 'Not quite — Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village.', reveals: 'students-often-confuse-anchalik-sahitya' },
                { text: 'modernist novelist', outcome: 'Not quite — Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village.', reveals: 'students-often-confuse-anchalik-sahitya' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_002', title: 'पाठ 7 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'टेकु का इस्म+\' का क्रम: शुरुआत टेकु-का-इस्म+ से, घटनाएँ बढ़ती हैं, अंत \'टेकु का इस्म+\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What are the five stages of Freytag\'s pyramid (plot structure) in their correct order?', options: [
                { text: 'Exposition → Rising Action → Climax → Falling Action → Resolution', outcome: 'Exposition → Rising Action → Climax → Falling Action → Resolution.' },
                { text: 'the cub is saved', outcome: 'Not quite — Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end".', reveals: 'students-equate-plot-with-what' },
                { text: 'the mother leopard arrives', outcome: 'Not quite — Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end".', reveals: 'students-equate-plot-with-what' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_005', title: 'पाठ 7 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'टेकु का इस्म+\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'List the names of four supporting characters from "tkequ dk isM+" and state one defining action each performs in the story.', options: [
                { text: 'Correct answer: 1', outcome: 'Correct answer: 1. Old poet (ncs gq, vkneh) – refuses to leave the tree, reveals he is a poet. 2.' },
                { text: 'the officers', outcome: 'Not quite — Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.', reveals: 'supporting-characters-exist-only-to' },
                { text: 'hinder', outcome: 'Not quite — Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.', reveals: 'supporting-characters-exist-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire evening you pick Renu\'s story of a leopard cub passed between the Forest, Agriculture and Revenue departments while its mother waits. A classmate edits your script: \'Cut two of the three office refusals — they\'re repetitive — and make the climax the cub being rescued by officials.\'',
            decisions: [{ prompt: 'Why should you reject both edits?', options: [
                { text: 'Keep the pattern: the repeated refusals — forest guard, ranger, police, each citing rules and jurisdiction — ARE the structure; the circular paperwork mimics the bureaucracy being satirised. And the climax isn\'t the rescue outcome but the mother leopard bypassing the entire system: instinct achieves what the state couldn\'t, which is the satire\'s punch.', outcome: 'The script now bites as intended: repetition builds the indictment, and the resolution comes from circumventing bureaucracy, not satisfying it.' },
                { text: 'Accept the cuts — one refusal conveys the point; three is redundancy.', outcome: 'Repetition is the technique: a single refusal reads as one rude official; the pattern of identical refusals exposes a system, which is the satire\'s target.', reveals: 'repetition-is-redundancy' },
                { text: 'Let the officials save the cub — a competent government gives the story a hopeful close.', outcome: 'That reverses the satire: the story\'s logic demands the system fail while the animal\'s instinct succeeds — bureaucratic success would prove the system works.', reveals: 'officials-should-save-the-cub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every official followed the rules — that\'s the horror: the machine ran perfectly and the point was lost.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review Class 10 Hindi literary history: the transition from Chhayavad\'s romanticism.',
          misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)', '\'टेकु का इस्म+\' का पात्र-चित्रण'],
                  hint: 'Review Class 10 Hindi literary history: the transition from Chhayavad\'s romanticism to Pragativad\'s.',
                  misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms, assuming any story.' }
          ],
            remediations: { 'students-often-confuse-anchalik-sahitya': { steps: ['If a student conflates Anchalik with Gramin: (1) Show a 2-column comparison: Column A—Premchand\'s standardized Hindi.', '(2) Ask: "Could \'टेकी का इमला\' happen in a Punjab village?', 'Why or why not?" Guide them to see that the Forest-Agriculture-Revenue jurisdictional dispute over a *single tree*.', '(3) Have them underline 5 dialect words in the first two pages and hypothesize their standard Hindi equivalents.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms.',
          parts: [
                { id: 'a', prompt: 'Create a 3-sentence "Before You Read" note for a classmate who has never read Renu, explaining what to expect in terms of language, tone, and central.', answer: 'Expect Hindi infused with Maithili/Bhojpuri rhythms—words like "टेकी," "इमला,"',
                  options: ['Expect Hindi infused with Maithili/Bhojpuri rhythms—words like "टेकी," "इमला,"', 'Anchalik Sahitya', 'Gramin Sahitya'],
                  hint: 'Review Class 10 Hindi literary history: the transition from Chhayavad\'s romanticism to Pragativad\'s.',
                  misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms, assuming any story.' }
          ],
            remediations: { 'students-often-confuse-anchalik-sahitya': { steps: ['If a student conflates Anchalik with Gramin: (1) Show a 2-column comparison: Column A—Premchand\'s standardized Hindi.', '(2) Ask: "Could \'टेकी का इमला\' happen in a Punjab village?', 'Why or why not?" Guide them to see that the Forest-Agriculture-Revenue jurisdictional dispute over a *single tree*.', '(3) Have them underline 5 dialect words in the first two pages and hypothesize their standard Hindi equivalents.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_002', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' का कथानक — \'टेकु का इस्म+\' — आरोह भाग-1 का पाठ। पाठ का कथानक.',
          hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main.',
          misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).',
          parts: [
                { id: 'a', prompt: 'What are the five stages of Freytag\'s pyramid (plot structure) in their correct order?', answer: 'Exposition → Rising Action → Climax → Falling Action → Resolution',
                  options: ['Exposition → Rising Action → Climax → Falling Action → Resolution', 'the cub is saved', 'the mother leopard arrives'],
                  hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main conflict: human.',
                  misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).' },
                { id: 'b', prompt: 'In "तेंदुए का शिशु," the forest guard, ranger, and police officer all refuse immediate help.', answer: 'Each refusal escalates the institutional hierarchy (guard → ranger → police →',
                  options: ['Each refusal escalates the institutional hierarchy (guard → ranger → police →', 'to make the story longer', 'to show different characters', 'the cub is saved'],
                  hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main conflict: human.',
                  misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).' },
                { id: 'c', prompt: 'Map the following events to Freytag\'s stages: (a) Mother leopard appears at the tea garden, (b) Cub discovered under the bush, (c) Forest guard cites rules and.', answer: 'Cub discovered under the bush, (',
                  options: ['Cub discovered under the bush, (', 'the cub is saved', 'the mother leopard arrives'],
                  hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main conflict: human.',
                  misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).' }
          ],
            remediations: { 'students-equate-plot-with-what': { steps: ['Show a 2-minute clip from a परिचित film (e.g., *3 Idiots*: Virus\'s repeated "no" to Joy Lobo\'s project → escalating.', 'Map it to Freytag together.', 'Give the student a 6-panel storyboard template.', 'Have them draw *only* the bureaucratic refusal scenes (guard, ranger, police, superintendent) — one panel each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_003', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक और आख्यान-संरचना)** के \'घटना-विश्लेषण\' अभ्यास.',
          misconception: '**विशिष्ट भ्रम:** छात्र **\'ऐतिहासिक पृष्ठभूमि\' (historical background)** और **\'पाठ्य-परिवेश\' (setting)** को समानार्थी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)',
                  options: ['\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पात्र-चित्रण'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 002 (कथानक और आख्यान-संरचना)** के \'घटना-विश्लेषण\' अभ्यास को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **\'ऐतिहासिक पृष्ठभूमि\' (historical background)** और **\'पाठ्य-परिवेश\' (setting)** को समानार्थी मान लेते हैं। **गलत.' }
          ],
            remediations: { 'historical-background-setting-1942': { steps: ['**चरणबद्ध सुधार (Remediation):** 1.', '**माइक्रो-रीडिंग (Micro-reading):** छात्र को **एक पृष्ठ का गद्यांश** दें (जैसे \'उषा प्रियंवदा की \'वापसी\' का पहला पन्ना).', '**टेबल बनवाएँ (Tabulation):** पाँच कॉलम — **स्थान | काल | समाज | अर्थव्यवस्था | प्रकृति** — प्रत्येक घिरे शब्द को उचित.', '**कारण-कार्य तीर (Causal arrows):** पूछें — *"इस कॉलम की चीज़ पात्र को क्या करने को मजबूर करती है?"* — तीर खींचकर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_004', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 003 (पाठ्य-परिवेश और वातावरण)** दोबारा पढ़ें — परिवेश के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (List of Adjectives)** + **कहानी का सारांश**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' का पात्र-चित्रण',
                  options: ['\'टेकु का इस्म+\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 003 (पाठ्य-परिवेश और वातावरण)** दोबारा पढ़ें — परिवेश के.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि पात्र-चित्रण = **गुणों की सूची (List of Adjectives)** + **कहानी का सारांश**। वे लिखते हैं: "नायक.' }
          ],
            remediations: { 'list-of-adjectives': { steps: ['**मॉडलिंग**: बोर्ड के **उत्कृष्ट उत्तर (Model Answer)** और **कमजोर उत्तर** साथ रखकर दिखाएँ — अंतर केवल **PEEL संरचना**.', '**साझा अभ्यास**: कक्षा में एक छोटे पात्र (सहायक पात्र) पर **सामूहिक PEEL** लिखवाएँ — शिक्षक बोर्ड पर चरण-दर-चरण लिखे.', '**साक्ष्य-खोज खेल**: ५ मिनट में पाठ से नायक के **किसी एक गुण** के **३ साक्ष्य** ढूंढने का टाइम्ड अभ्यास कराएँ। 4.', '**स्व-मूल्यांकन चेकलिस्ट**: छात्र को अपना उत्तर जाँचने के लिए दें — "क्या हर विशेषण के आगे पृ.सं./पैरा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_005', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'Review c11_hin_ar_cbse_07_004 worked examples on mother\'s character; practice identifying.',
          misconception: 'Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.',
          parts: [
                { id: 'a', prompt: 'List the names of four supporting characters from "tkequ dk isM+" and state one defining action each performs in the story.', answer: 'Correct answer: 1',
                  options: ['Correct answer: 1', 'the officers', 'hinder', 'the mother or vague descriptions like "the officers'],
                  hint: 'Review c11_hin_ar_cbse_07_004 worked examples on mother\'s character; practice identifying her key.',
                  misconception: 'Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.' },
                { id: 'b', prompt: 'Explain in your own words why the old poet (ncs gq, vkneh) refuses to move from under the tree even when threatened with death.', answer: 'Correct answer: The poet refuses',
                  options: ['Correct answer: The poet refuses', 'hinder'],
                  hint: 'Review c11_hin_ar_cbse_07_004 worked examples on mother\'s character; practice identifying her key.',
                  misconception: 'Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.' }
          ],
            remediations: { 'supporting-characters-exist-only-to': { steps: ['Re-read the story marking every scene where a non-mother character speaks.', 'Create a two-column table: Column A = Character\'s exact words/actions; Column B = What larger force they represent.', 'For each character, write one sentence: "This character is not just a person; they are the embodiment of ______." 4.', 'Compare the poet\'s "vksl" (poet) identity with the mother\'s "ekyh" (mother) identity—both are *roles* that transcend.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_006', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' का मुख्य विषय — \'टेकु का इस्म+\' का केंद्रीय भाव और संदेश',
          hint: 'यदि फंसे हुए हों, तो पात्र-चित्रण (विशेष रूप से सहायक पात्रों) की समीक्षा करें — क्योंकि.',
          misconception: 'छात्र अक्सर मुख्य विषय को पाठ की morale या सीख के समान मान लेते हैं — जैसे यदि कोई कहानी ईमानदारी की प्रशंसा करती है तो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' का मुख्य विषय',
                  options: ['\'टेकु का इस्म+\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हुए हों, तो पात्र-चित्रण (विशेष रूप से सहायक पात्रों) की समीक्षा करें — क्योंकि वे अक्सर.',
                  misconception: 'छात्र अक्सर मुख्य विषय को पाठ की morale या सीख के समान मान लेते हैं — जैसे यदि कोई कहानी ईमानदारी की प्रशंसा करती है तो वे कहते हैं कि विषय.' }
          ],
            remediations: { 'morale': { steps: ['छात्र से पूछिए: "यदि इस कहानी के अंत में कोई नैतिक शिक्षा लिखी होती, तो वह क्या होती?" फिर कहिए: "अब उसी कहानी को पढ़िए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
