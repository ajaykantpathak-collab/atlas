import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p1',
    title: 'काले मेघा पानी दे · Part 1/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'काले मेघा पानी दे · Part 1/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_001', 'c12_hin_ar_cbse_12_002', 'c12_hin_ar_cbse_12_003', 'c12_hin_ar_cbse_12_004', 'c12_hin_ar_cbse_12_005', 'c12_hin_ar_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'काले मेघा पानी दे — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['काले मेघा पानी दे'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_001', title: 'काले मेघा पानी दे — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 12 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "dkys es?kk ikuh ns" and what is his primary literary region? (Recall level)', options: [
                { text: 'The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand', outcome: 'The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand.' },
                { text: 'es<d&eaMyh', outcome: 'Not quite — Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth.', reveals: 'students-treat-before-you-read' },
                { text: 'Premchand or placing him in Rajasthan', outcome: 'Not quite — Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_002', title: 'काले मेघा पानी दे — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'डाकिया के खत\' का क्रम: शुरुआत डाकिया-के-खत से, घटनाएँ बढ़ती हैं, अंत \'डाकिया के खत\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the narrative point of view used in the story "डाकिया के खत" and who is the narrator?', options: [
                { text: 'The story uses first-person retrospective point of view', outcome: 'The story uses first-person retrospective point of view; the narrator is an adult recalling.' },
                { text: 'third person', outcome: 'Not quite — Students think "plot = summary of events in order" and write a paragraph retelling the story.', reveals: 'plot-summary-of-events-in' },
                { text: 'the postman is the narrator', outcome: 'Not quite — Students think "plot = summary of events in order" and write a paragraph retelling the story.', reveals: 'plot-summary-of-events-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_004', title: 'काले मेघा पानी दे — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'डाकिया के खत\' में डाकिया-के-खत से पात्र उभरता है।',
            decisions: [{ prompt: 'Who is the protagonist of "dkys es?kk ikuh ns" and what is their narrative perspective?', options: [
                { text: 'The protagonist is the first-person narrator ("eSa"), an educated, relatively privileged', outcome: 'The protagonist is the first-person narrator ("eSa"), an educated, relatively privileged observer.' },
                { text: 'central subject of the story\'s events', outcome: 'Not quite — Students often think the protagonist must be the "hero" or the most suffering character.', reveals: 'the-protagonist-must-be-the' },
                { text: 'the character through whose consciousness the story is filtered', outcome: 'Not quite — Students often think the protagonist must be the "hero" or the most suffering character.', reveals: 'the-protagonist-must-be-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_005', title: 'काले मेघा पानी दे — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'डाकिया के खत\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'List the four supporting characters in "dkys es?kk ikuh ns" and give one defining action or dialogue for each.', options: [
                { text: 'The four supporting characters are: (1) banj lsuk (the elder girl)', outcome: 'The four supporting characters are: (1) banj lsuk (the elder girl) — defining action: carries water.' },
                { text: 'the poor people', outcome: 'Not quite — Students treat supporting characters as "minor" = "less important for exams".', reveals: 'students-treat-supporting-characters-as' },
                { text: 'the narrator or vague descriptions like "the poor people', outcome: 'Not quite — Students treat supporting characters as "minor" = "less important for exams".', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'What comes next? काले मेघा पानी दे · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — काले मेघा पानी दे · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit Class 11 Hindi node c11_hin_ar_cbse_01_001 (context for "Namak.',
          misconception: 'Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth year, then jump to the.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "dkys es?kk ikuh ns" and what is his primary literary region? (Recall level)', answer: 'The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand',
                  options: ['The author is Shekhar Joshi (शेखर जोशी), born in 1926 in Bageshwar, Uttarakhand', 'es<d&eaMyh', 'Premchand or placing him in Rajasthan'],
                  hint: 'If stuck, revisit Class 11 Hindi node c11_hin_ar_cbse_01_001 (context for "Namak Ka Daroga") and.',
                  misconception: 'Students treat "Before You Read" as a skippable summary. They read the author\'s name and birth year, then jump to the story, missing that.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Have the student open a physical map of Uttarakhand, trace a ridge line, and mark where springs (naulas) would form.', 'Assign a 10-minute search: "Uttarakhand water crisis 2023 news" — list three headlines.', 'Re-read the "Before You Read" box aloud, pausing after each sentence to ask: "What does this tell me about the story\'s.', 'Re-attempt Diagnostic Question 2 — if still stuck, revisit Class 11 node c11_hin_ar_cbse_01_001 (context for "Namak.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_002', difficulty: 'standard',
          question: '\'डाकिया के खत\' का कथानक — \'डाकिया के खत\' — आरोह भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
          misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.',
          parts: [
                { id: 'a', prompt: 'What is the narrative point of view used in the story "डाकिया के खत" and who is the narrator?', answer: 'The story uses first-person retrospective point of view',
                  options: ['The story uses first-person retrospective point of view', 'third person', 'the postman is the narrator', 'plot = summary of events in order'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'b', prompt: 'Explain how the episodic structure (letter by letter) controls the pacing of the story. Why doesn\'t the narrator tell all events in one continuous flow?', answer: 'The episodic structure creates rhythmic pauses',
                  options: ['The episodic structure creates rhythmic pauses', 'it\'s just how the story happened', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'c', prompt: 'Map the five plot stages onto the story: identify the specific event that serves as the CLIMAX and justify why it\'s not the first or last letter.', answer: 'Climax = the letter announcing the son\'s death in war',
                  options: ['Climax = the letter announcing the son\'s death in war', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'd', prompt: 'Compare the narrative time (how long the telling takes) vs. story time (how long the events take). What does the compression/expansion reveal about memory?', answer: 'Story time spans years (multiple letters over seasons)',
                  options: ['Story time spans years (multiple letters over seasons)', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' }
          ],
            remediations: { 'plot-summary-of-events-in': { steps: ['Re-read ONLY the first and last paragraphs — identify the frame (adult narrator speaking).', 'List every letter mentioned in order with one-line effect on villagers.', 'Draw a plot mountain on paper — place each letter on it.', 'Ask "Why THIS order?" for each transition. Re-do Diagnostic Q3 after this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.',
          parts: [
                { id: 'a', prompt: 'Evaluate: Does the frame narrative (adult narrator bookending the childhood memory) strengthen or weaken the story\'s social commentary on rural communication?', answer: 'Strengthens',
                  options: ['Strengthens', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' },
                { id: 'b', prompt: 'Create a 3-panel storyboard sketch (describe in words) for a film adaptation that visually represents the narrative structure\'s shift from collective hope.', answer: 'Panel 1: Wide shot of village square at dawn',
                  options: ['Panel 1: Wide shot of village square at dawn', 'plot = summary of events in order', '"plot = summary of events in order" and write a paragraph retelling the story'],
                  hint: 'If stuck, review "Story vs Plot" distinction using a परिचित film (e.g., *Sholay* — story.',
                  misconception: 'Students think "plot = summary of events in order" and write a paragraph retelling the story.' }
          ],
            remediations: { 'plot-summary-of-events-in': { steps: ['Re-read ONLY the first and last paragraphs — identify the frame (adult narrator speaking).', 'List every letter mentioned in order with one-line effect on villagers.', 'Draw a plot mountain on paper — place each letter on it.', 'Ask "Why THIS order?" for each transition. Re-do Diagnostic Q3 after this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_003', difficulty: 'standard',
          question: '\'डाकिया के खत\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि परिवेश के चार आयाम (भौगोलिक, सामाजिक, सांस्कृतिक, मनोवैज्ञानिक) अलग-अलग पहचानने में.',
          misconception: '**सबसे घातक भ्रम:** "परिवेश = पृष्ठभूमि (background) = कहानी जहाँ घटती है, उसकी जगह और समय।" **वास्तविकता:** "काले मेघा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)',
                  options: ['\'डाकिया के खत\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पात्र-चित्रण'],
                  hint: 'यदि परिवेश के चार आयाम (भौगोलिक, सामाजिक, सांस्कृतिक, मनोवैज्ञानिक) अलग-अलग पहचानने में कठिनाई हो.',
                  misconception: '**सबसे घातक भ्रम:** "परिवेश = पृष्ठभूमि (background) = कहानी जहाँ घटती है, उसकी जगह और समय।" **वास्तविकता:** "काले मेघा पानी दे" में परिवेश.' }
          ],
            remediations: { 'background': { steps: ['**पुनर्अध्ययन (Re-study):** कक्षा 11 के नोड `c11_hin_ar_cbse_01_003` (पाठ 1 — पाठ्य-परिवेश और वातावरण) और.', '**माइक्रो-व्यायाम (Micro-exercise):** कहानी के पृष्ठ 1-2 (NCERT) से केवल **भौगोलिक विवरण** छाँटकर लिखें, फिर पृष्ठ 3-4.', '**पुनर्निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_3 को दोबारा हल करें — इस बार चार-चरणीय संरचना (प्रसंग →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_004', difficulty: 'standard',
          question: '\'डाकिया के खत\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck, review the definition of "first-person protagonist" in c11_hin_ar_cbse_12_004.',
          misconception: 'Students often think the protagonist must be the "hero" or the most suffering character.',
          parts: [
                { id: 'a', prompt: 'Find two passages where the narrator\'s internal monologue questions social or scientific progress.', answer: 'Passage 1: "foKku dk viuk roZQ gS vkSj fo\'okl dk viuk lkeF;ZA"',
                  options: ['Passage 1: "foKku dk viuk roZQ gS vkSj fo\'okl dk viuk lkeF;ZA"', 'the protagonist must be the "hero" or the most suffering character'],
                  hint: 'If stuck, review the definition of "first-person protagonist" in c11_hin_ar_cbse_12_004 and.',
                  misconception: 'Students often think the protagonist must be the "hero" or the most suffering character.' }
          ],
            remediations: { 'the-protagonist-must-be-the': { steps: ['Re-read the opening paragraph: identify every "eSa" (I) and "esjk" (my).', 'List 5 things the narrator does vs.', 'Review node c11_hin_ar_cbse_12_004 (Class 11 Protagonist Analysis) for the definition of "first-person protagonist".', 'Complete the diagnostic question 1 again, then write a one-sentence distinction: "The protagonist is the ___; the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_005', difficulty: 'standard',
          question: '\'डाकिया के खत\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
          misconception: 'Students treat supporting characters as "minor" = "less important for exams".',
          parts: [
                { id: 'a', prompt: 'List the four supporting characters in "dkys es?kk ikuh ns" and give one defining action or dialogue for each.', answer: 'The four supporting characters are: (1) banj lsuk (the elder girl)',
                  options: ['The four supporting characters are: (1) banj lsuk (the elder girl)', 'the poor people', 'the narrator or vague descriptions like "the poor people'],
                  hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
                  misconception: 'Students treat supporting characters as "minor" = "less important for exams".' },
                { id: 'b', prompt: 'Explain why the children are called "es<d&eaMyh" (half-mother) by the neighbourhood. What does this name reveal about their social reality?', answer: 'The name "es<d&eaMyh" is given',
                  options: ['The name "es<d&eaMyh" is given', 'it\'s just a nickname', 'because they look alike'],
                  hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
                  misconception: 'Students treat supporting characters as "minor" = "less important for exams".' },
                { id: 'c', prompt: 'Compare the narrator\'s wife (esjh fj\'rs) and thth as two mothers facing water scarcity. How do their contrasting responses structure the story\'s class critique?', answer: 'Similarity: Both are mothers protecting children',
                  options: ['Similarity: Both are mothers protecting children', 'both are kind mothers'],
                  hint: 'If stuck on "function in story", review the concept of "foil character" from Class 11.',
                  misconception: 'Students treat supporting characters as "minor" = "less important for exams".' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If the student cannot move beyond trait-listing: 1.', 'Have them create a 3-column table: Character | Textual Evidence (quote + page) | Function in Story (plot/theme/foil).', 'Assign them to find *only* thth\'s dialogues in the last 3 pages (pp.', '94-96) and annotate each with: "What does she reveal about the narrator?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_006', difficulty: 'standard',
          question: '\'डाकिया के खत\' का मुख्य विषय — \'डाकिया के खत\' का केंद्रीय भाव और संदेश',
          hint: 'अगर विषय नहीं पकड़ पा रहे, तो कक्षा 11 के किसी भी पाठ (जैसे c11_hin_ar_cbse_01_006) का.',
          misconception: 'छात्र अक्सर समझते हैं कि **\'मुख्य विषय\' = \'कथानक का सारांश\'**। वे लिखते हैं: "गाँव में सूखा पड़ा, किसान परेशान हुए, फिर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' का मुख्य विषय',
                  options: ['\'डाकिया के खत\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर विषय नहीं पकड़ पा रहे, तो कक्षा 11 के किसी भी पाठ (जैसे c11_hin_ar_cbse_01_006) का \'मुख्य विषय\'.',
                  misconception: 'छात्र अक्सर समझते हैं कि **\'मुख्य विषय\' = \'कथानक का सारांश\'**। वे लिखते हैं: "गाँव में सूखा पड़ा, किसान परेशान हुए, फिर बारिश हुई" — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "पाठ की 5 प्रमुख घटनाएँ लिखो" (याद स्तर)। चरण 2: प्रत्येक घटना के आगे पूछें — "इससे लेखक क्या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
