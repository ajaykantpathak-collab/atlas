import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch13_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch13_p1',
    title: 'पहलवान की ढोलक · Part 1/3',
    subtitle: 'The king knew his name; the new order didn\'t',
    classLevel: 12, subject: 'hin_ar', topic: 'पहलवान की ढोलक · Part 1/3',
    chapters: ['c12_hin_ar_ch13'],
    nodeIds: ['c12_hin_ar_cbse_13_001', 'c12_hin_ar_cbse_13_002', 'c12_hin_ar_cbse_13_003', 'c12_hin_ar_cbse_13_004', 'c12_hin_ar_cbse_13_005', 'c12_hin_ar_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A folk singer\'s world ran on patronage and memory. Then the rules changed — and rules don\'t remember anyone.', goal: 'Read Dwivedi\'s story as the collision of feudal patronage and institutional modernity through a folk artist\'s fate.' },
    discovery: {
        question: 'A folk singer thrives under a king\'s patronage — then a new system of laws arrives that recognises neither his art nor his claim. What actually changed?',
        options: ['Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority', 'Just the ruler changed', 'The singer lost his voice', 'Art became free'],
        answer: 'Legitimacy itself — personal patronage gave way to impersonal institutions; the artist fell through the gap between two kinds of authority',
        hook: 'Dwivedi pioneered experimental fiction in Hindi — folk speech, oral rhythm, the lives of common people rendered with documentary warmth. The story isn\'t nostalgia for kings; it stages the collision where \'the system\' replaced \'the sovereign\' — and nobody told the artist.',
    },
    teaching: [
        { title: 'पहलवान की ढोलक — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Watch a folk artist meet the new order: weigh the king\'s court against bureaucratic law, track how art becomes \'profession\' under pressure, and find where dignity survives the transition.',
        labels: ['पहलवान की ढोलक —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_001', title: 'पहलवान की ढोलक — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-2 खोलिए और पाठ 13 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "इग्योका की क्षयद" and what is his recognized contribution to Hindi literature?', options: [
                { text: 'The author is हज़ारी प्रसाद द्विवेदी (Hazari Prasad Dwivedi), born in 1921 in Ballia', outcome: 'The author is हज़ारी प्रसाद द्विवेदी (Hazari Prasad Dwivedi), born in 1921 in Ballia.' },
                { text: 'famous writer', outcome: 'Not quite — Students treat the "Before You Read" box as optional reading — something to skip or memorize dates.', reveals: 'students-treat-the-before-you' },
                { text: 'Premchand or guessing a generic "famous writer', outcome: 'Not quite — Students treat the "Before You Read" box as optional reading — something to skip or memorize dates.', reveals: 'students-treat-the-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_003', title: 'पहलवान की ढोलक — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 13\' का परिवेश: \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्तक — स्थान और समय मिलकर माहौल बनाते.',
            decisions: [{ prompt: 'What are the three main components of setting in a narrative, and which component is most prominently established in the opening paragraph.', options: [
                { text: 'The three main components are time (historical period, time of day), place (geographical', outcome: 'The three main components are time (historical period, time of day), place (geographical location.' },
                { text: 'village', outcome: 'Not quite — Students often think setting is only "where and when" and atmosphere is just "mood," treating them.', reveals: 'setting-is-only-where-and' },
                { text: 'where and when', outcome: 'Not quite — Students often think setting is only "where and when" and atmosphere is just "mood," treating them.', reveals: 'setting-is-only-where-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A folk singer from your district gets signed by a big label that drops her dialect, renames her, and reworks her songs into a commercial formula. Two years later she returns to perform in a hometown she barely recognises — and only family gathers to listen.',
            decisions: [{ prompt: 'How does \'युगुक की ढोलकी\' / the flautist\'s tale frame her trajectory?', options: [
                { text: 'As ironic return — the village flautist\'s music was the community\'s lifeblood until court patronage lifted him out; he comes back to a transformed village where his art survives only as a private act for grandchildren — the circle closes but the commons is gone.', outcome: 'The chapter\'s structural point is that the ending mirrors the opening with the centre shifted: patronage didn\'t just elevate the artist, it displaced the audience — her homecoming performance is the same image, emptied.' },
                { text: 'As a success story — she gained a platform the village could never give her, so the arc is upward.', outcome: 'That reads the rise and skips the resolution\'s irony: the flautist also \'rose\' to court, and the story counts what the rise cost — a village waking to sirens instead of music isn\'t the same audience at a new address.', reveals: 'platform-equals-progress' },
                { text: 'As proof she should never have left — artists who take patronage are sellouts.', outcome: 'The story doesn\'t damn the move; it mourns the structural change — the new order that renamed the village and industrialised its rhythm. The artist didn\'t sell the community; the ground under it was sold around both.', reveals: 'patronage-equals-betrayal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a period story as a study of systems changing — and spot the person caught between the old legitimacy and the new.',
            decisions: [{ prompt: 'What comes next? पहलवान की ढोलक · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पहलवान की ढोलक · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review Class 11 Chapter 1 "नमक का दरोगा" Before You Read note.',
          misconception: 'Students treat the "Before You Read" box as optional reading — something to skip or memorize dates from.',
          parts: [
                { id: 'a', prompt: 'The context note contrasts "ज्क्त ल्कगच" (king\'s court) with "बफम;क" (the new order).', answer: 'The "king\'s court" represents traditional, personalistic legitimacy',
                  options: ['The "king\'s court" represents traditional, personalistic legitimacy', 'government'],
                  hint: 'If stuck, review Class 11 Chapter 1 "नमक का दरोगा" Before You Read note (c11_hin_ar_cbse_01_001).',
                  misconception: 'Students treat the "Before You Read" box as optional reading — something to skip or memorize dates from.' }
          ],
            remediations: { 'students-treat-the-before-you': { steps: ['If a student cannot articulate the context-themes link: 1.', 'Have them re-read only the first two paragraphs of the context note and underline every noun phrase denoting a social.', 'Ask: "Which of these roles still exist today?', 'Which have vanished?" — this connects past to present.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_002', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ.',
          hint: 'If stuck, review Class 11 "Plot and Narrative Structure" node (c11_hin_ar_cbse_13_002).',
          misconception: 'Students often confuse \'plot\' (what happens) with \'narrative structure\' (how it is told).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,',
                  options: ['\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'आरोह भाग-2 — पाठ 13\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review Class 11 "Plot and Narrative Structure" node (c11_hin_ar_cbse_13_002) focusing.',
                  misconception: 'Students often confuse \'plot\' (what happens) with \'narrative structure\' (how it is told).' }
          ],
            remediations: { 'students-often-confuse-plot-what': { steps: ['If the student cannot distinguish plot from structure: 1) Have them draw a timeline of 10 key events (plot).', '2) On a second line, mark where the narrative \'pauses\', \'speeds up\', \'looks back\', or \'changes tone\' (structure).', '3) Ask: "Why does the author spend three paragraphs describing the old king\'s court *after* Yagyu is already.', '4) Re-attempt Diagnostic Q4 with this visual aid.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_003', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and.',
          misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.',
          parts: [
                { id: 'a', prompt: 'Identify two sensory details from the storm scene (when the bell tower is struck by lightning) and explain how each contributes to the atmosphere of that.', answer: 'Example: "vkd\'k esa rkjs ped jgs Fks" (visual',
                  options: ['Example: "vkd\'k esa rkjs ped jgs Fks" (visual', 'where and when'],
                  hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and practice.',
                  misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.' },
                { id: 'b', prompt: 'Compare the atmosphere of the village during the daily bell routine with the atmosphere after the bell stops ringing permanently.', answer: 'During the routine, the atmosphere is oppressive, mechanical, and fearful',
                  options: ['During the routine, the atmosphere is oppressive, mechanical, and fearful', 'where and when'],
                  hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and practice.',
                  misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.' }
          ],
            remediations: { 'setting-is-only-where-and': { steps: ['If the student cannot link setting details to atmosphere, do this: 1) Pick one setting element (e.g., the bell).', '2) Find three quotes about it (sound, appearance, effect on people).', '3) For each quote, complete the sentence: "This detail makes the reader feel ______ because ______." 4) Write.', 'This forces the connection between concrete detail and emotional effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to set the climax during a violent storm. Is the storm merely a dramatic backdrop, or does it serve a deeper thematic purpose?', answer: 'The storm is not just backdrop',
                  options: ['The storm is not just backdrop', 'just weather for drama', 'where and when'],
                  hint: 'If stuck, revisit the Class 11 setting/atmosphere node (c11_hin_ar_cbse_01_003) and practice.',
                  misconception: 'Students often think setting is only "where and when" and atmosphere is just "mood," treating them as separate labels.' }
          ],
            remediations: { 'setting-is-only-where-and': { steps: ['If the student cannot link setting details to atmosphere, do this: 1) Pick one setting element (e.g., the bell).', '2) Find three quotes about it (sound, appearance, effect on people).', '3) For each quote, complete the sentence: "This detail makes the reader feel ______ because ______." 4) Write.', 'This forces the connection between concrete detail and emotional effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_004', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि फँस जाएँ तो **c11_hin_ar_cbse_13_004 (कक्षा 11 का पात्र-चित्रण नोड)** या.',
          misconception: '**सबसे घातक भ्रांति:** "पहलवान एक असफल पहलवान है जो बुढ़ापे में ढोलक बजाकर समय काटता है।" **वास्तविकता:** पहलवान ने.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-2 — पाठ 13\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_ar_cbse_13_004 (कक्षा 11 का पात्र-चित्रण नोड)** या.',
                  misconception: '**सबसे घातक भ्रांति:** "पहलवान एक असफल पहलवान है जो बुढ़ापे में ढोलक बजाकर समय काटता है।" **वास्तविकता:** पहलवान ने पहलवानी **नहीं हारी**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** कहानी के केवल वे अंश पढ़ें जहाँ पहलवान ढोलक बजा रहा है (पैरा 4-7, 12-15) — उसकी उँगलियों, थाप.', '**तुलना-तालिका (Comparison Table):** दो कॉलम बनाएँ — बाएँ: \'गाँव वाले पहलवान को कैसे देखते हैं\' (बूढ़ा, बेकार, बोझ).', '**लिखित अभ्यास:** 100 शब्दों में लिखें: "पहलवान की ढोलक उसकी देह नहीं, आत्मा है।" 4.', '**पुनर्निदान (Re-diagnostic):** उपरोक्त DIAGNOSTIC_QUESTION_3 और 5 का उत्तर दोबारा दें — अबकी बार \'शरीर\' नहीं, \'कला\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_005', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_13_004 के WORKED_EXAMPLE_1 और WORKED_EXAMPLE_2 दोबारा हल करें.',
          misconception: 'छात्र मानते हैं कि सहायक पात्र केवल \'कहानी आगे बढ़ाने\' के लिए होते हैं, जबकि **पहलवान की ढोलक** में हर सहायक पात्र नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'आरोह भाग-2 — पाठ 13\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_13_004 के WORKED_EXAMPLE_1 और WORKED_EXAMPLE_2 दोबारा हल करें — नायक के.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्र केवल \'कहानी आगे बढ़ाने\' के लिए होते हैं, जबकि **पहलवान की ढोलक** में हर सहायक पात्र नायक के **द्वंद्व (शक्ति.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: पाठ के उन सभी अंशों को चिह्नित करें जहाँ पहलवान किसी अन्य पात्र से संवाद करता है या कोई उसके बारे में बोलता है।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_13_006', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 13\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 13\' का केंद्रीय भाव और.',
          hint: 'यदि अटकें: c12_hin_ar_cbse_13_004 के "पहलवान का अंतर्द्वंद्व" खंड को दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि *"पहलवान ढोलक इसलिए फेंकता है क्योंकि वह उसे बजाना नहीं सीख पाया — यह असफलता की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 13\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 13\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-2 — पाठ 13\' का मुख्य विषय — \'आरोह भाग-2 — पाठ 13\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 13\' का कथानक — \'आरोह भाग-2 — पाठ 13\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 13\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटकें: c12_hin_ar_cbse_13_004 के "पहलवान का अंतर्द्वंद्व" खंड को दोबारा पढ़ें — विशेषकर वह अंश.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि *"पहलवान ढोलक इसलिए फेंकता है क्योंकि वह उसे बजाना नहीं सीख पाया — यह असफलता की कहानी है।"* **क्यों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ें:** c12_hin_ar_cbse_13_004 (नायक पात्र-चित्रण) — पहलवान के आंतरिक द्वंद्व (पहलवानी vs कलाकार) के नोट्स.', '**महत्वपूर्ण प्रसंग चिह्नित करें:** पाठ में तीन प्रसंग ढूँढ़ें जहाँ पहलवान ढोलक का ज़िक्र करता है — प्रत्येक के सामने.', '**लिखित अभ्यास:** 80 शब्दों में उत्तर लिखें — "ढोलक फेंकना हार नहीं, जीत है" — PEEL संरचना में। 4.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_5 का उत्तर बिना देखे लिखें; फिर DIAGNOSTIC_ANSWER_5 से मिलाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
