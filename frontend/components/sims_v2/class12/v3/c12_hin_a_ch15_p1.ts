import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch15_p1: SimDef = {
    id: 'v3_c12_hin_a_ch15_p1',
    title: 'जहाँ कोई वापसी नहीं · Part 1/3',
    subtitle: 'The survey line was straight; the damage wasn\'t',
    classLevel: 12, subject: 'hin_a', topic: 'जहाँ कोई वापसी नहीं · Part 1/3',
    chapters: ['c12_hin_a_ch15'],
    nodeIds: ['c12_hin_a_cbse_15_001', 'c12_hin_a_cbse_15_002', 'c12_hin_a_cbse_15_003', 'c12_hin_a_cbse_15_004', 'c12_hin_a_cbse_15_005', 'c12_hin_a_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Displacement-narrative reader', intro: 'A dam was drawn on a map; a hundred villages learned they lived inside a line.', goal: 'Read Tedhi Lakeer through development-induced displacement and Renu\'s reportage-fiction method.' },
    discovery: {
        question: 'A surveyor draws a straight red line for a dam across tribal land — on the earth it becomes a crooked scar. Why did Renu name the story \'The Crooked Line\'?',
        options: ['The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth', 'The terrain was hilly', 'Surveyors make mistakes', 'A meandering river'],
        answer: 'The line is morally crooked — promises run straight, reality bends: the survey ignores contours, villages and consent; development\'s path is crooked because it refuses the land\'s truth',
        hook: 'This is reportage-fiction about a real wound — the Koel-Karo project threatening 120+ villages. Renu captures the pre-movement moment: resistance raw and leaderless, dismissed as backwardness before it could become an Andolan. The deepest irony — the democratic state itself ran the displacement.',
    },
    teaching: [
        { title: 'जहाँ कोई वापसी नहीं — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_15_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the Chotanagpur hills before the dam: weigh whose \'development\' submerges whom, compare raw tribal refusal with organised protest, and decode the crooked line\'s triple meaning.',
        labels: ['जहाँ कोई वापसी नहीं'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_001', title: 'जहाँ कोई वापसी नहीं — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 15 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of the story "टेढ़ी लकीर" and what is his most famous novel that established him as a pioneer of the "Anchalik".', options: [
                { text: 'The author is Phanishwar Nath Renu (1929–2005)', outcome: 'The author is Phanishwar Nath Renu (1929–2005). His most famous novel is *Maila Anchal* (1954).' },
                { text: 'social realism', outcome: 'Not quite — Students treat the "Before You Read" section as optional background reading — skimming the author.', reveals: 'students-treat-the-before-you' },
                { text: 'regional realism', outcome: 'Not quite — Students treat the "Before You Read" section as optional background reading — skimming the author.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_002', title: 'जहाँ कोई वापसी नहीं — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'टेढ़ी लकीर\' का क्रम: शुरुआत टेढ़ी-लकीर से, घटनाएँ बढ़ती हैं, अंत \'टेढ़ी लकीर\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the name of the village where the story "tgk¡ dksbZ okilh ugha" is set?', options: [
                { text: 'The village is called Veerpur (ve>j xk¡o)', outcome: 'The village is called Veerpur (ve>j xk¡o). A wrong answer (e.g., naming a different village from.' },
                { text: 'a different village from another story', outcome: 'Not quite — Students often treat the story as a simple chronological report: "First the village was nice, then.', reveals: 'students-often-treat-the-story' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_005', title: 'जहाँ कोई वापसी नहीं — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'टेढ़ी लकीर\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'Identify three supporting characters in "वहाँ कोई नहीं" and state one key trait for each.', options: [
                { text: 'Correct answer: The old woman (बुढ़िया)', outcome: 'Correct answer: The old woman (बुढ़िया) — wise, keeper of oral history; the contractor (ठेकेदार).' },
                { text: 'flashbacks', outcome: 'Not quite — Students often treat supporting characters as "minor" and therefore less important for exams.', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a piece on your hometown\'s transformation — the river now a drain, fields under a factory — your editor wants it chronological: \'village past, then highway, then industry, then today.\'',
            decisions: [{ prompt: 'What structure does Renu\'s \'जहाँ कोई वापसी नहीं\' use instead, and why?', options: [
                { text: 'Open in the damaged present, then break into flashes of the lost past with your own commentary between them — the fragmented telling enacts the severed bond between people and land, making the reader live the loss rather than read a progress report.', outcome: 'The chapter\'s point: a linear telling makes change look like neutral sequence; the non-linear juxtaposition of what is against what was is where the critique lives.' },
                { text: 'Go chronological — \'village → factory\' order keeps the article clear and fair to both sides.', outcome: 'Chronology launders the verdict into inevitability; the story opens with the polluted present precisely so the reader enters with the damage already done — \'fair\' sequencing is how loss gets normalised.', reveals: 'chronology-is-neutral' },
                { text: 'Skip the past entirely and report only today\'s conditions — nostalgia is bias.', outcome: 'Without the remembered village the present has no baseline; the story\'s commentary works because the reader holds both timeframes at once — past-only is romance, present-only is bookkeeping.', reveals: 'past-is-bias' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_15_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a dam story as an invoice for the city\'s electricity — paid in forests, rivers and a people\'s memory.',
            decisions: [{ prompt: 'What comes next? जहाँ कोई वापसी नहीं · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जहाँ कोई वापसी नहीं · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on the "development irony," revisit Class 11 Economics node on "Critical.',
          misconception: 'Students treat the "Before You Read" section as optional background reading — skimming the author bio and skipping the.',
          parts: [
                { id: 'a', prompt: 'Who is the author of the story "टेढ़ी लकीर" and what is his most famous novel that established him as a pioneer of the "Anchalik" (regional) novel in Hindi?', answer: 'The author is Phanishwar Nath Renu (1929–2005)',
                  options: ['The author is Phanishwar Nath Renu (1929–2005)', 'social realism', 'regional realism', 'Premchand or identifying *Godaan* as Renu\'s work'],
                  hint: 'If stuck on the "development irony," revisit Class 11 Economics node on "Critical Appraisal.',
                  misconception: 'Students treat the "Before You Read" section as optional background reading — skimming the author bio and skipping the historical context.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['**Immediate remediation:** Re-read the NCERT "Before You Read" page (pp.', '108-109) *aloud* — hearing the terms "कोयल-कारो परियोजना," "पाँचवीं अनुसूची," "आदिवासी विस्थापन" anchors them.', '**Targeted research (15 mins):** Search "Koel Karo project tribal resistance 1970s" — watch one 5-min video (e.g., from.', '**Re-diagnostic:** Answer Diagnostic Question 3 again *in writing*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_002', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' का कथानक — \'टेढ़ी लकीर\' — अंतरा भाग-2 का पाठ। पाठ का कथानक, पात्र.',
          hint: 'Review the difference between linear and non-linear narrative structures using the Class.',
          misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then.',
          parts: [
                { id: 'a', prompt: 'What is the name of the village where the story "tgk¡ dksbZ okilh ugha" is set?', answer: 'The village is called Veerpur (ve>j xk¡o)',
                  options: ['The village is called Veerpur (ve>j xk¡o)', 'a different village from another story'],
                  hint: 'Review the difference between linear and non-linear narrative structures using the Class 11 node.',
                  misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then it got polluted.".' },
                { id: 'b', prompt: 'In your own words, explain how the narrative moves between past and present in the story. Does it follow a straight timeline?', answer: 'The narrative does not follow a straight timeline',
                  options: ['The narrative does not follow a straight timeline', 'it goes from past to present in order'],
                  hint: 'Review the difference between linear and non-linear narrative structures using the Class 11 node.',
                  misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then it got polluted.".' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Have the student draw two timelines: one with events in *historical order* (village life → land acquisition → factory →.', 'Ask: "Why did the author put the factory\'s arrival *after* the description of the polluted river?" 3.', 'Guide them to see that the structure makes the reader feel the *result* before the *cause*, creating a sense.', 'Re-attempt Diagnostic Question 4 with this visual aid.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then.',
          parts: [
                { id: 'a', prompt: 'Is the reflective narrative structure effective in conveying the author\'s message about development? Justify your answer with two specific structural choices.', answer: 'Yes, it is effective',
                  options: ['Yes, it is effective', 'yes, it\'s good'],
                  hint: 'Review the difference between linear and non-linear narrative structures using the Class 11 node.',
                  misconception: 'Students often treat the story as a simple chronological report: "First the village was nice, then a factory came, then it got polluted.".' }
          ],
            remediations: { 'students-often-treat-the-story': { steps: ['Have the student draw two timelines: one with events in *historical order* (village life → land acquisition → factory →.', 'Ask: "Why did the author put the factory\'s arrival *after* the description of the polluted river?" 3.', 'Guide them to see that the structure makes the reader feel the *result* before the *cause*, creating a sense.', 'Re-attempt Diagnostic Question 4 with this visual aid.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_003', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.',
          hint: 'यदि फंस रहे हैं, तो कक्षा 11 के किसी भी पाठ में पाठ्य-परिवेश और वातावरण (जैसे.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि पाठ्य-परिवेश केवल कहानी में आने वाले भौतिक विवरणों (जैसे घर का रंग, नदी का नाम, मौसम) को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting)',
                  options: ['\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेढ़ी लकीर\' का कथानक', '\'टेढ़ी लकीर\' का पात्र-चित्रण'],
                  hint: 'यदि फंस रहे हैं, तो कक्षा 11 के किसी भी पाठ में पाठ्य-परिवेश और वातावरण (जैसे.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि पाठ्य-परिवेश केवल कहानी में आने वाले भौतिक विवरणों (जैसे घर का रंग, नदी का नाम, मौसम) को शामिल करता है, जबकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वह अपने own जीवन में एक ऐसी स्थिति याद करे जब वह किसी नए miejscu गया और वहां के अनौपचारिक नियमों को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_004', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि पात्र के आंतरिक संघर्ष को समझने में कठिनाई हो तो c11_hin_a_cbse_04_004 (हुसैन की.',
          misconception: 'छात्र अक्सर सुरेंद्र के चरित्र को केवल उसके अंतिम कार्यों (जैसे पछताना या पकड़ा जाना) के आधार पर आंकते हैं, मानकर चलते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेढ़ी लकीर\' का पात्र-चित्रण',
                  options: ['\'टेढ़ी लकीर\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेढ़ी लकीर\' का कथानक', '\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि पात्र के आंतरिक संघर्ष को समझने में कठिनाई हो तो c11_hin_a_cbse_04_004 (हुसैन की कहानी अपनी.',
                  misconception: 'छात्र अक्सर सुरेंद्र के चरित्र को केवल उसके अंतिम कार्यों (जैसे पछताना या पकड़ा जाना) के आधार पर आंकते हैं, मानकर चलते हैं कि उसका पूरा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस गलती को दूर करने के लिए, छात्र को कहानी को समय-k्रम में विभक्त करने के लिए कहें: (1) सुरेंद्र का प्रारंभिक अवस्था.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_005', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते.',
          hint: 'If stuck, review the "Character Analysis: Protagonist" node (c12_hin_a_cbse_15_004) and.',
          misconception: 'Students often treat supporting characters as "minor" and therefore less important for exams.',
          parts: [
                { id: 'a', prompt: 'Identify three supporting characters in "वहाँ कोई नहीं" and state one key trait for each.', answer: 'Correct answer: The old woman (बुढ़िया)',
                  options: ['Correct answer: The old woman (बुढ़िया)', 'flashbacks'],
                  hint: 'If stuck, review the "Character Analysis: Protagonist" node (c12_hin_a_cbse_15_004) and the Class.',
                  misconception: 'Students often treat supporting characters as "minor" and therefore less important for exams.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Re-read the story marking every scene where a non-Vej character speaks or acts.', 'For each, write one sentence: "This character represents ______ because ______."', 'Pick two characters and write a PEEL paragraph each (Point, Evidence, Explanation, Link to theme).', 'Compare your paragraphs with the model answers in the textbook\'s "अभ्यास" section.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_15_006', difficulty: 'standard',
          question: '\'टेढ़ी लकीर\' का मुख्य विषय — \'टेढ़ी लकीर\' का केंद्रीय भाव और संदेश',
          hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो तो कथानक संरचना (c12_hin_a_cbse_15_002) और.',
          misconception: 'छात्र अक्सर मुख्य विषय को कहानी के अंत में दिए गए स्पष्ट निष्कर्ष या लेखक के सीधे कथन के रूप में समझते हैं, जैसे कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेढ़ी लकीर\' का मुख्य विषय',
                  options: ['\'टेढ़ी लकीर\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेढ़ी लकीर\' का कथानक', '\'टेढ़ी लकीर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो तो कथानक संरचना (c12_hin_a_cbse_15_002) और पात्र-चित्रण.',
                  misconception: 'छात्र अक्सर मुख्य विषय को कहानी के अंत में दिए गए स्पष्ट निष्कर्ष या लेखक के सीधे कथन के रूप में समझते हैं, जैसे कि "लेखक ने कहा कि वापस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी के तीन अलग-अलग हिस्सों (आरंभ, मध्य, अंत) चुनने के लिए कहें जहाँ पात्र फंसे महसूस करते हैं। प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
