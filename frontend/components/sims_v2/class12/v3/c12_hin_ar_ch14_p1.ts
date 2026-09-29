import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch14_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch14_p1',
    title: 'शरिीष के फूल · Part 1/3',
    subtitle: 'The flag was born in a struggle — then the nation stopped looking',
    classLevel: 12, subject: 'hin_ar', topic: 'शरिीष के फूल · Part 1/3',
    chapters: ['c12_hin_ar_ch14'],
    nodeIds: ['c12_hin_ar_cbse_14_001', 'c12_hin_ar_cbse_14_002', 'c12_hin_ar_cbse_14_003', 'c12_hin_ar_cbse_14_004', 'c12_hin_ar_cbse_14_005', 'c12_hin_ar_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political-essay reader', intro: 'A scholar-activist watches the tricolor fade on a government school roof and reads a whole nation\'s fatigue in it.', goal: 'Read Jhande ki Phool/flag essay as a diagnosis of national morality — symbol versus substance.' },
    discovery: {
        question: 'A poet paints the tricolor with reverence — years later it\'s a torn rag on a rusted pole, used for mundane purposes. Why does the author call the flag a \'living being\'?',
        options: ['Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition', 'Flags wear out naturally', 'Poetic exaggeration', 'It moves in wind'],
        answer: 'Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition',
        hook: 'The state guards the flag\'s display rules; the author asks whether it still embodies justice — ritualistic patriotism versus ethical substance. For him no science, politics or religion outranks humanity; the flag is a moral contract, not a protocol object.',
    },
    teaching: [
        { title: 'शरिीष के फूल — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['शरिीष के फूल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_001', title: 'शरिीष के फूल — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 14 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "f\'kjh\\"k ds Qwy" and what is his most notable literary award?', options: [
                { text: 'The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan)', outcome: 'The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan).' },
                { text: 'Premchand or confusing the award with Jnanpith', outcome: 'Not quite — Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth.', reveals: 'students-treat-before-you-read' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_002', title: 'शरिीष के फूल — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'फकीर धुनी\' का क्रम: शुरुआत फकीर-धुनी से, घटनाएँ बढ़ती हैं, अंत \'फकीर धुनी\' का केंद्रीय भाव और संदेश पर।',
            decisions: [{ prompt: 'What is the primary narrative perspective used in "फखरुद्दीन की खाट", and what is the immediate effect of this choice on the reader\'s.', options: [
                { text: 'The story uses a first-person narrative perspective ("मैं")', outcome: 'The story uses a first-person narrative perspective ("मैं"). This limits the reader\'s knowledge.' },
                { text: 'third-person omniscient', outcome: 'Not quite — Students often confuse "plot summary" with "narrative structure analysis".', reveals: 'students-often-confuse-plot-summary' },
                { text: 'plot summary', outcome: 'Not quite — Students often confuse "plot summary" with "narrative structure analysis".', reveals: 'students-often-confuse-plot-summary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_004', title: 'शरिीष के फूल — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'फकीर धुनी\' में फकीर-धुनी से पात्र उभरता है।',
            decisions: [{ prompt: 'What is the primary role of the narrator-protagonist in "फख़्हक़ के क़याम"? Answer in one sentence.', options: [
                { text: 'The narrator-protagonist serves as a reflective consciousness that uses the pen as a', outcome: 'The narrator-protagonist serves as a reflective consciousness that uses the pen as a metaphor.' },
                { text: 'He is a pen collector', outcome: 'Not quite — Students often treat the pen as the protagonist because the title focuses on it.', reveals: 'students-often-treat-the-pen' },
                { text: 'He tells a story about a pen', outcome: 'Not quite — Students often treat the pen as the protagonist because the title focuses on it.', reveals: 'students-often-treat-the-pen' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_005', title: 'शरिीष के फूल — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'फकीर धुनी\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'Name the painter\'s internal conflict as revealed in the text and state the specific line that shows his unwillingness to flatter the fool.', options: [
                { text: 'The painter (चित्रकार) is torn between artistic integrity (वुक्लृद ;क्सह) and survival', outcome: 'The painter (चित्रकार) is torn between artistic integrity (वुक्लृद ;क्सह) and survival.' },
                { text: 'fear of king', outcome: 'Not quite — Students treat supporting characters as "minor" and write one-line descriptions (e.g., "painter.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_006', title: 'शरिीष के फूल — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'फकीर धुनी\' में \'फकीर धुनी\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the literal meaning of \'voèkwr\' (व्यतिक्र) as used by Dwivedi ji in the context of f\'kjh"k grass, and how does he redefine.', options: [
                { text: 'Literal meaning: \'voèkwr\' means \'perversion\' or \'deviation from norm\' (from vi + atikram)', outcome: 'Literal meaning: \'voèkwr\' means \'perversion\' or \'deviation from norm\' (from vi + atikram).' },
                { text: 'voèkwr means struggle', outcome: 'Not quite — Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and.', reveals: 'students-treat-f-kjh-k' },
                { text: 'resilience', outcome: 'Not quite — Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and.', reveals: 'students-treat-f-kjh-k' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college\'s broken hostel bench gets a fresh coat of paint for inspection day — splinters and all — and the warden declares the issue \'resolved.\' The repair request you filed months ago is still \'under process.\'',
            decisions: [{ prompt: 'What does \'फखरुद्दीन की खाट\' see in the painted bench?', options: [
                { text: 'The cot painted by the bureaucrat — surface performance standing in for repair; the story\'s unresolved ending, where the cot never reaches the museum, performs the same deferral your \'under process\' request is trapped in.', outcome: 'The chapter reads the paint as the critique: cosmetic attention is how the system answers demand without meeting it — the structure denies resolution because the institution does.' },
                { text: 'Accept it — at least something visible was done; half a fix beats none.', outcome: 'The story\'s whole satire depends on refusing that bargain: paint over rot is precisely the bureaucrat\'s move — it photographs as action while the object stays broken underneath.', reveals: 'cosmetic-counts-as-fix' },
                { text: 'Treat it as proof the system works — the request clearly reached someone who acted.', outcome: 'Action timed to inspection isn\'t the request being processed; the story distinguishes performance-for-audience from accountability — the file stays open because the gesture closed the matter.', reveals: 'inspection-response-equals-resolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a national symbol as a moral diagnostic — and tell display-patriotism from the justice the cloth was meant to carry.',
            decisions: [{ prompt: 'What comes next? शरिीष के फूल · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शरिीष के फूल · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_14_001 and practice the "3-Column Pre-Read Table".',
          misconception: 'Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth year and award name.',
          parts: [
                { id: 'a', prompt: 'Who is the author of "f\'kjh\\"k ds Qwy" and what is his most notable literary award?', answer: 'The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan)',
                  options: ['The author is Gatikhj Izlkn F}osnh (born 1907, Churu, Rajasthan)', 'Premchand or confusing the award with Jnanpith'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_14_001 and practice the "3-Column Pre-Read Table": Column 1.',
                  misconception: 'Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth year and award name but miss the.' },
                { id: 'b', prompt: 'In your own words, explain why the author calls the flag a "voèkwr" (living being) rather than a mere symbol. Use one detail from the introductory passage.', answer: 'The author calls the flag a voèkwr',
                  options: ['The author calls the flag a voèkwr', 'voèkwr'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_14_001 and practice the "3-Column Pre-Read Table": Column 1.',
                  misconception: 'Students treat "Before You Read" as optional background trivia — they memorize the author\'s birth year and award name but miss the.' }
          ],
            remediations: { 'students-treat-before-you-read': { steps: ['Re-read the author bio in the textbook and list *three* life-events that shaped his flag-view (e.g., village.', 'Draw a two-column table: "State\'s Flag" (protocol, material, occasions) vs.', '"Author\'s Flag" (breathing, suffering, moral witness).', 'Write one paragraph explaining how the author\'s *scholar-activist* identity bridges these columns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_002', difficulty: 'standard',
          question: '\'फकीर धुनी\' का कथानक — \'फकीर धुनी\' — आरोह भाग-2 का पाठ। पाठ का कथानक, पात्र और.',
          hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the.',
          misconception: 'Students often confuse "plot summary" with "narrative structure analysis".',
          parts: [
                { id: 'a', prompt: 'What is the primary narrative perspective used in "फखरुद्दीन की खाट", and what is the immediate effect of this choice on the reader\'s access to events?', answer: 'The story uses a first-person narrative perspective ("मैं")',
                  options: ['The story uses a first-person narrative perspective ("मैं")', 'third-person omniscient', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' },
                { id: 'b', prompt: 'The story opens with the narrator describing the cot in the present, then shifts to the poet\'s memory of the bureaucrat painting the cot.', answer: 'The shift is a flashback',
                  options: ['The shift is a flashback', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' }
          ],
            remediations: { 'students-often-confuse-plot-summary': { steps: ['Give them a 5-event strip from the story (e.g., 1. Cot made, 2. Bureaucrat paints, 3. Poet sees it, 4.', 'Ask them to arrange in story-time (chronological) and then in text-order (narrated).', 'Have them label each shift (flashback, frame, digression).', 'Re-attempt Diagnostic Question 3. If still stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "plot summary" with "narrative structure analysis".',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the story\'s ending: the narrator\'s final rhetorical question ("गाड़ी ज्यों की त्यों धरी रह गई") after the cot\'s anti-climactic.', answer: 'The open-ended closure strengthens the satire',
                  options: ['The open-ended closure strengthens the satire', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' },
                { id: 'b', prompt: 'Create a one-paragraph alternate ending for "फखरुद्दीन की खाट" that retains the first-person frame but changes the narrative structure to a linear.', answer: 'Alternate ending (linear): "Fakhruddin bought the cot in 1940',
                  options: ['Alternate ending (linear): "Fakhruddin bought the cot in 1940', 'plot summary', 'narrative structure analysis'],
                  hint: 'Review "frame narrative" and "flashback" in Class 11 node c11_hin_ar_cbse_01_002 with the "नमक का.',
                  misconception: 'Students often confuse "plot summary" with "narrative structure analysis".' }
          ],
            remediations: { 'students-often-confuse-plot-summary': { steps: ['Give them a 5-event strip from the story (e.g., 1. Cot made, 2. Bureaucrat paints, 3. Poet sees it, 4.', 'Ask them to arrange in story-time (chronological) and then in text-order (narrated).', 'Have them label each shift (flashback, frame, digression).', 'Re-attempt Diagnostic Question 3. If still stuck, revisit Class 11 node c11_hin_ar_cbse_01_002 (Plot and Narrative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_003', difficulty: 'standard',
          question: '\'फकीर धुनी\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित.',
          hint: 'यदि परिवेश के सामाजिक-आर्थिक आयाम पकड़ में न आएँ तो कक्षा 11 के नोड.',
          misconception: 'छात्र अक्सर \'परिवेश\' और \'वातावरण\' को समानार्थी मानकर केवल भौतिक परिवेश (पहाड़, नदी, मौसम) पर लिख देते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)',
                  options: ['\'फकीर धुनी\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पात्र-चित्रण'],
                  hint: 'यदि परिवेश के सामाजिक-आर्थिक आयाम पकड़ में न आएँ तो कक्षा 11 के नोड c11_hin_ar_cbse_14_003.',
                  misconception: 'छात्र अक्सर \'परिवेश\' और \'वातावरण\' को समानार्थी मानकर केवल भौतिक परिवेश (पहाड़, नदी, मौसम) पर लिख देते हैं और सामाजिक-सांस्कृतिक-आर्थिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "उपन्यास के किन्हीं दो पन्ने खोलो जहाँ केवल प्रकृति वर्णन न हो, बल्कि लोग बात कर रहे हों, काम कर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_004', difficulty: 'standard',
          question: '\'फकीर धुनी\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck, re-read the "Before You Read" (node 001) for author context, then list 10 "I".',
          misconception: 'Students often treat the pen as the protagonist because the title focuses on it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' का पात्र-चित्रण',
                  options: ['\'फकीर धुनी\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read the "Before You Read" (node 001) for author context, then list 10 "I" statements.',
                  misconception: 'Students often treat the pen as the protagonist because the title focuses on it.' }
          ],
            remediations: { 'students-often-treat-the-pen': { steps: ['Ask them to highlight every sentence with "मैं" (I) in the text.', 'Have them list what the "I" does, thinks, feels, remembers.', 'Show how each "I" statement builds a portrait of a specific intellectual personality.', 'Assign a rewrite: "Write a character sketch of the person holding the pen, using only evidence from the \'I\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_005', difficulty: 'standard',
          question: '\'फकीर धुनी\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते.',
          hint: 'Review "Character Analysis: Supporting Characters" from Class 11 Chapter 1.',
          misconception: 'Students treat supporting characters as "minor" and write one-line descriptions (e.g., "painter paints portrait").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' के सहायक पात्र',
                  options: ['\'फकीर धुनी\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review "Character Analysis: Supporting Characters" from Class 11 Chapter 1 (c11_hin_ar_cbse_01_005).',
                  misconception: 'Students treat supporting characters as "minor" and write one-line descriptions (e.g., "painter paints portrait").' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['Re-read the text marking every speech/action by painter, king, queen, courtiers, people.', 'For each, complete: "This character ______ (verb) which ______ (effect on fool\'s paradise)." 3.', 'Group the verbs: flatter, reward, categorize, pretend, endure.', 'Write one PEEL paragraph per group showing how that verb *sustains the central irony*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_006', difficulty: 'standard',
          question: '\'फकीर धुनी\' का मुख्य विषय — \'फकीर धुनी\' का केंद्रीय भाव और संदेश',
          hint: 'If stuck: Revisit c12_hin_ar_cbse_14_002 (narrative structure) to map the essay\'s three.',
          misconception: 'Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and write: "The grass.',
          parts: [
                { id: 'a', prompt: 'Analyze how Dwivedi ji uses the first-person narrative shift ("eSa lksprk gw¡", "eSa f\'kjh"k osQ iwQyksa dks ns[kdj dgrk gw¡") to transform a botanical.', answer: 'Shift 1: "eSa lksprk gw¡ fd iqjkus dh ;g vfèkdkj&fyIlk D;ksa ugha le; jgrs"',
                  options: ['Shift 1: "eSa lksprk gw¡ fd iqjkus dh ;g vfèkdkj&fyIlk D;ksa ugha le; jgrs"', 'resilience', 'heroism'],
                  hint: 'If stuck: Revisit c12_hin_ar_cbse_14_002 (narrative structure) to map the essay\'s three movements.',
                  misconception: 'Students treat "f\'kjh"k" as merely a *symbol of strength* (like "oak tree" in English poetry) and write: "The grass represents strong.' }
          ],
            remediations: { 'students-treat-f-kjh-k': { steps: ['Re-read the opening paragraph ("tgk¡ cSB osQ ;g ys[k fy[k jgk gw¡...") aloud — notice the physical posture: "nk,¡&ck,¡".', 'List 5 adjectives Dwivedi ji uses for f\'kjh"k — N/A mean "strong/heroic."', 'Rewrite your theme statement replacing "strength" with "endurance against erasure."', 'Re-attempt Diagnostic Q2 with this corrected lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
