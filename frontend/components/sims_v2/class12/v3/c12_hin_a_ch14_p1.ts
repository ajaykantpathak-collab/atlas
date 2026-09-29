import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p1: SimDef = {
    id: 'v3_c12_hin_a_ch14_p1',
    title: 'शेर, पहचान, चार हाथ, साझा · Part 1/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'शेर, पहचान, चार हाथ, साझा · Part 1/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_001', 'c12_hin_a_cbse_14_002', 'c12_hin_a_cbse_14_003', 'c12_hin_a_cbse_14_004', 'c12_hin_a_cbse_14_005', 'c12_hin_a_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'शेर, पहचान, चार हाथ, साझा — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['शेर, पहचान, चार हाथ,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_002', title: 'शेर, पहचान, चार हाथ, साझा — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 14\' का क्रम: शुरुआत अंतरा-भाग-2-—-पाठ-14 से, घटनाएँ बढ़ती हैं, अंत \'अंतरा भाग-2 पर।',
            decisions: [{ prompt: 'Define the five elements of Freytag\'s Pyramid (plot diagram) in the correct order.', options: [
                { text: 'The five elements are: 1) Exposition (introduction of setting, characters, situation), 2)', outcome: 'The five elements are: 1) Exposition (introduction of setting, characters, situation), 2) Rising.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative.', reveals: 'students-often-confuse-plot-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_004', title: 'शेर, पहचान, चार हाथ, साझा — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'अंतरा भाग-2 — पाठ 14\' में अंतरा-भाग-2-—-पाठ-14 से पात्र उभरता है।',
            decisions: [{ prompt: 'Define "protagonist" and name the protagonist of each of the four stories in this chapter.', options: [
                { text: 'A protagonist is the central character who drives the narrative\'s primary conflict and', outcome: 'A protagonist is the central character who drives the narrative\'s primary conflict and undergoes.' },
                { text: 'most pages', outcome: 'Not quite — Students consistently identify the narrator of "कसज" as the protagonist because the story.', reveals: 'students-consistently-identify-the-narrator' },
                { text: 'protagonist', outcome: 'Not quite — Students consistently identify the narrator of "कसज" as the protagonist because the story.', reveals: 'students-consistently-identify-the-narrator' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'What comes next? शेर, पहचान, चार हाथ, साझा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शेर, पहचान, चार हाथ, साझा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit the Class 11 Antra Chapter 14 "Before You Read".',
          misconception: 'Students often treat the "Before You Read" section as optional background reading to be skimmed or skipped, believing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, revisit the Class 11 Antra Chapter 14 "Before You Read" (c11_hin_ar_cbse_14_001) and.',
                  misconception: 'Students often treat the "Before You Read" section as optional background reading to be skimmed or skipped, believing the real learning.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['If a student cannot answer the diagnostic questions, do not re-read the section passively.', 'Instead: (1) Have them create a 3-column table: Author Detail | Story Element It Illuminates | Evidence from Summary.', '(2) Ask them to match each vocabulary word to the story summary where it fits best and explain why.', '(3) Have them orally retell the central conflict of each story in one sentence using the words "power", "resistance".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_002', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ।.',
          hint: 'Review Freytag\'s Pyramid using a known story (e.g., "The Thirsty Crow") and practice.',
          misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the.',
          parts: [
                { id: 'a', prompt: 'Given the following micro-story summary, map its events onto the five-stage plot diagram: "A farmer finds a magical pot that doubles anything put inside.', answer: 'Exposition: Farmer finds magical doubling pot',
                  options: ['Exposition: Farmer finds magical doubling pot', 'rising action', 'climax'],
                  hint: 'Review Freytag\'s Pyramid using a known story (e.g., "The Thirsty Crow") and practice labeling each.',
                  misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the order in which the.' }
          ],
            remediations: { 'students-often-confuse-plot-the': { steps: ['**Re-teach the distinction**: Use a परिचित Bollywood movie (e.g., *Andhadhun* or *Drishyam*) — ask the student to list.', 'The difference is narrative structure.', '**Re-read \'ksj\' with a highlighter**: Mark every paragraph as E (Exposition), R (Rising), C (Climax), F (Falling),.', '**Peer discussion**: Pair with a student who grasped it; have them explain why the author chose first-person limited.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the.',
          parts: [
                { id: 'a', prompt: 'Evaluate which story\'s narrative structure most effectively delivers its central theme. Justify your choice with specific structural evidence.', answer: '\'ksj\' is most effective',
                  options: ['\'ksj\' is most effective', 'I liked the message of \'igpku\''],
                  hint: 'Review Freytag\'s Pyramid using a known story (e.g., "The Thirsty Crow") and practice labeling each.',
                  misconception: 'Students often confuse **plot** (the chronological sequence of events: A → B → C) with **narrative structure** (the order in which the.' }
          ],
            remediations: { 'students-often-confuse-plot-the': { steps: ['**Re-teach the distinction**: Use a परिचित Bollywood movie (e.g., *Andhadhun* or *Drishyam*) — ask the student to list.', 'The difference is narrative structure.', '**Re-read \'ksj\' with a highlighter**: Mark every paragraph as E (Exposition), R (Rising), C (Climax), F (Falling),.', '**Peer discussion**: Pair with a student who grasped it; have them explain why the author chose first-person limited.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_003', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और.',
          hint: 'यदि छात्र पाठ्य-परिवेश की पहचान में फँस गया है, तो उसे कक्षा 11 के पाठ 1, 2 और 3 के.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल तभी मायने रखता है जब पाठ स्पष्ट रूप से ऐतिहासिक घटनाओं का उल्लेख करे—जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि छात्र पाठ्य-परिवेश की पहचान में फँस गया है, तो उसे कक्षा 11 के पाठ 1, 2 और 3 के "पाठ्य-परिवेश.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल तभी मायने रखता है जब पाठ स्पष्ट रूप से ऐतिहासिक घटनाओं का उल्लेख करे—जैसे यदि कोई पाठ "1947 में.' }
          ],
            remediations: { '1947': { steps: ['यदि छात्र इस गलतफहमी में फंसा है, तो उसे इस प्रकार सुधारें: पहले, उसे एक ऐसा पाठ दें जिसमें स्पष्ट ऐतिहासिक संदर्भ न हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_004', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और.',
          hint: 'If stuck on indirect characterization, review Class 11 node c11_hin_ar_cbse_14_004\'s.',
          misconception: 'Students consistently identify the narrator of "कसज" as the protagonist because the story is filtered through his.',
          parts: [
                { id: 'a', prompt: 'Using the King in "इगपुकु," explain the difference between a flat and a round character. Is the King flat or round? Justify with two textual details.', answer: 'A flat character embodies a single trait and does not change',
                  options: ['A flat character embodies a single trait and does not change', 'flat because he is a symbol'],
                  hint: 'If stuck on indirect characterization, review Class 11 node c11_hin_ar_cbse_14_004\'s "show don\'t.',
                  misconception: 'Students consistently identify the narrator of "कसज" as the protagonist because the story is filtered through his observations ("मैंने.' },
                { id: 'b', prompt: 'Read this new paragraph: "The village headman announced a new tax. The farmers whispered but paid. Next month he doubled it. The farmers sold jewelry.', answer: 'Trait 1: Exploitative',
                  options: ['Trait 1: Exploitative', 'he is bad'],
                  hint: 'If stuck on indirect characterization, review Class 11 node c11_hin_ar_cbse_14_004\'s "show don\'t.',
                  misconception: 'Students consistently identify the narrator of "कसज" as the protagonist because the story is filtered through his observations ("मैंने.' }
          ],
            remediations: { 'students-consistently-identify-the-narrator': { steps: ['Re-read the opening of "कसज" (node c12_hin_a_cbse_14_002) and list every character mentioned in the first three.', 'Count textual references: how many paragraphs focus on the narrator\'s actions vs.', 'कसज\'s neck as the site of action?', 'Ask: "If this character were removed, would the plot exist?" Apply to both narrator and कसज.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_005', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि फंसे हों तो मुख्य पात्र के चरित्र-चित्रण (c12_hin_a_cbse_14_004) की समीक्षा करें.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र का महत्व केवल तभी होता है जब वह मुख्य पात्र के लक्ष्य में bezpośred्त रूप से मदद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों तो मुख्य पात्र के चरित्र-चित्रण (c12_hin_a_cbse_14_004) की समीक्षा करें — वहां मुख्य.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र का महत्व केवल तभी होता है जब वह मुख्य पात्र के लक्ष्य में bezpośred्त रूप से मदद करता है (जैसे हथियार.' }
          ],
            remediations: { 'bezpo-red': { steps: ['छात्र को बताइए कि कहानी को केवल एक \'मिशन\' नहीं, बल्कि एक \'मानव अनुभव\' मानिए। फिर किसी znan कहानी (जैसे \'गोदान\') से एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_006', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 14\' का केंद्रीय भाव.',
          hint: 'यदि अटके तो **कथानक नोड (c12_hin_a_cbse_14_002)** पर वापस जाएँ और घटनाक्रम का.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "नैतिक शिक्षा (मोरल)"। **वास्तविकता:** विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 14\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 14\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **कथानक नोड (c12_hin_a_cbse_14_002)** पर वापस जाएँ और घटनाक्रम का **फ्लोचार्ट** बनाएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "नैतिक शिक्षा (मोरल)"। **वास्तविकता:** विषय **सार्वभौमिक मानवीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के **तीन प्रसंग** चुनो जहाँ पात्र **अकेले असफल** हुए और **साथ सफल** हुए।" 2.', 'उनसे प्रत्येक प्रसंग का **एक वाक्य में निचोड़** लिखवाएँ — "अकेला शेर हारा", "पहचान अकेला भटका", "चार हाथ अकेला थका"। 3.', 'अब पूछें: "इन तीनों वाक्यों में **क्या समान है**?" — उत्तर मिलेगा: "अकेलापन = असफलता, साथ = सफलता"। 4.', 'इसी समानता को **सार्वभौमिक वाक्य** में बदलवाएँ — यही मुख्य विषय है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
