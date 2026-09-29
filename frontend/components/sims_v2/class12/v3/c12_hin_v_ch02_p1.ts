import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch02_p1: SimDef = {
    id: 'v3_c12_hin_v_ch02_p1',
    title: 'जूझ · Part 1/3',
    subtitle: 'She stitched quilts on credit — so the goats could be someone else\'s',
    classLevel: 12, subject: 'hin_v', topic: 'जूझ · Part 1/3',
    chapters: ['c12_hin_v_ch02'],
    nodeIds: ['c12_hin_v_cbse_02_001', 'c12_hin_v_cbse_02_002', 'c12_hin_v_cbse_02_003', 'c12_hin_v_cbse_02_004', 'c12_hin_v_cbse_02_005', 'c12_hin_v_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Memoir reader', intro: 'A memoir of a boy who reached school late, ashamed — and the mother who calculated that it was worth it.', goal: 'Read the autobiographical sketch through education-as-liberation and the hidden machinery of class readiness.' },
    discovery: {
        question: 'A boy tends goats while other children walk to school — but his mother stitches quilts on credit for officials just to pay his fees. Why does she insist?',
        options: ['Education is the only asset that can\'t be seized — unlike land or livestock, it breaks the cycle of patron-client labour forever', 'Mother\'s love needs no reason', 'Schools were free then', 'To please the teacher'],
        answer: 'Education is the only asset that can\'t be seized — unlike land or livestock, it breaks the cycle of patron-client labour forever',
        hook: 'Read it as calculation, not just sentiment — and notice what the classroom reveals: the fluent classmate\'s ease is cultural capital, not talent. Even the teacher\'s method is real pedagogy — rhythm, repetition and emotion make poems survive decades in a student\'s memory.',
    },
    teaching: [
        { title: 'जूझ — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a goat-herd into a classroom: weigh a mother\'s economic logic, decode what separates the ready student from the late one, and ask what made one teacher\'s verse unforgettable.',
        labels: ['जूझ — पृष्ठभूमि और', 'जूझ — कथानक और', 'जूझ — पाठ्य-परिवेश और', 'जूझ — पात्र-चित्रण: नायक/प्रमुख', 'जूझ — पात्र-चित्रण: सहायक', 'जूझ — मुख्य विषय'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_001', title: 'जूझ — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'वितान भाग-2 खोलिए और पाठ 02 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of *ikB\'kkyk tkus osQ fy, eu rM+irk Fkk* and what is his primary literary identity?', options: [
                { text: 'The author is V.K', outcome: 'The author is V.K. Anand (वी.के. आनंद), a noted Hindi writer and poet associated with the *Nayi.' },
                { text: 'Premchand or Harivansh Rai Bachchan', outcome: 'Not quite — Students treat "context" as a static list of facts (author birth/death, publication year) rather.', reveals: 'students-treat-context-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_003', title: 'जूझ — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 2\' का परिवेश: \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्त — स्थान और समय मिलकर माहौल बनाते.',
            decisions: [{ prompt: 'What are the three primary physical settings described in the chapter "ikB\'kkyk tkus osQ fy, eu rM+irk Fkk"?', options: [
                { text: 'The three primary physical settings are: (1) the narrator\'s impoverished village home', outcome: 'The three primary physical settings are: (1) the narrator\'s impoverished village home with his.' },
                { text: 'home and school', outcome: 'Not quite — Students often treat setting as a static list of locations ("home, school, teacher\'s house") and.', reveals: 'students-often-treat-setting-as' },
                { text: 'examination hall', outcome: 'Not quite — Students often treat setting as a static list of locations ("home, school, teacher\'s house") and.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Profiling a self-made poet for the alumni magazine, you compress his schooling into one line — \'attended village school\' — and spend the word count on his awards. Your subject objects: \'the whole story is in the teacher who stayed after class.\'',
            decisions: [{ prompt: 'What does the pacing of \'पाठशाला जाने के लिए मन तड़पता था\' confirm?', options: [
                { text: 'He\'s right — the memoir stretches thin on years of schooling and lingers on the teacher\'s poetry sessions because the structure enacts the theme: education-as-awakening gets the slow scenes, education-as-certification gets the summary.', outcome: 'The chapter\'s pacing rule: narrative time follows meaning, not duration — the moments that made him get the slow telling, so the profile should spend its lines where the formation happened.' },
                { text: 'Keep the awards-led structure — readers want the outcome, and the schooling is background.', outcome: 'The memoir\'s frame exists to show the outcome without the process is a résumé, not a story — the reader knows he became a poet; what the retrospective adds is how it felt to become one.', reveals: 'outcome-over-process' },
                { text: 'Balance it evenly — give every year of schooling equal lines so the profile is complete.', outcome: 'Equal coverage is the chronological fallacy the chapter corrects — a formative hour can outweigh a routine year; completeness measured by calendar is flatness measured by meaning.', reveals: 'even-pacing-is-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a school memoir as a class document — where literacy is the one inheritance poverty cannot confiscate.',
            decisions: [{ prompt: 'What comes next? जूझ · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जूझ · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, revisit **c11_hin_v_cbse_02_001** (Lalu\'s context) and practice the "3-column.',
          misconception: 'Students treat "context" as a static list of facts (author birth/death, publication year) rather than a dynamic lens.',
          parts: [
                { id: 'a', prompt: 'Who is the author of *ikB\'kkyk tkus osQ fy, eu rM+irk Fkk* and what is his primary literary identity?', answer: 'The author is V.K',
                  options: ['The author is V.K', 'Premchand or Harivansh Rai Bachchan'],
                  hint: 'If stuck, revisit **c11_hin_v_cbse_02_001** (Lalu\'s context) and practice the "3-column table".',
                  misconception: 'Students treat "context" as a static list of facts (author birth/death, publication year) rather than a dynamic lens.' }
          ],
            remediations: { 'students-treat-context-as-a': { steps: ['Re-read the Class 11 node **c11_hin_v_cbse_01_001** (Before You Read: Context and Background for Vitan Ch.1) — note how.', 'Create a 3-column table: *Historical Event → Textual Trace → Thematic Payoff* for Anand\'s life (e.g., Colonial.', 'Re-attempt Diagnostic Q2 and Q4 using the table.', 'If still stuck, watch the 12-min NCERT "Author Introduction" video for Vitan Ch.2 (DIKSHA portal) and pause to note.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_002', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ।.',
          hint: 'यदि अटका हुआ महसूस हो तो कक्षा 11 वितान पाठ 1 या आरोह पाठ 1 के \'कथानक और आख्यान-संरचना\'.',
          misconception: 'छात्र प्रायः \'कथानक\' (Plot) और \'कहानी\' (Story) को समानार्थी मान लेते हैं: फॉरस्टर के शब्दों में, \'कहानी\' केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का',
                  options: ['\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'वितान भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि अटका हुआ महसूस हो तो कक्षा 11 वितान पाठ 1 या आरोह पाठ 1 के \'कथानक और आख्यान-संरचना\' नोड.',
                  misconception: 'छात्र प्रायः \'कथानक\' (Plot) और \'कहानी\' (Story) को समानार्थी मान लेते हैं: फॉरस्टर के शब्दों में, \'कहानी\' केवल कालक्रमानुसार घटनाओं का योग.' }
          ],
            remediations: { 'plot-story': { steps: ['छात्र को फॉरस्टर का \'कहानी बनाम कथानक\' उदाहरण पुनः पढ़ाएँ (c11_hin_v_cbse_01_002 या c11_hin_a_cbse_01_002 देखें)। 2.', '\'जूझ\' की 5-6 प्रमुख घटनाएँ कार्ड पर लिखवाएँ और उन्हें कालक्रम (Story) और कारण-कार्य क्रम (Plot) में अलग-अलग जमाने को.', 'फ्लैशबैक वाले अंश (जैसे पिता की मृत्यु का प्रसंग) चिह्नित करवाएँ और पूछें: "यह अतीत की घटना वर्तमान संघर्ष को कैसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_003', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If unable to separate description from narration, practice with c11_hin_v_cbse_02_003.',
          misconception: 'Students often treat setting as a static list of locations ("home, school, teacher\'s house") and atmosphere as a single.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "temporal setting" to trace how the school atmosphere changes from the narrator\'s primary school days to his higher-class experience.', answer: 'Shift 1: Primary school',
                  options: ['Shift 1: Primary school', 'teachers were nicer later'],
                  hint: 'If unable to separate description from narration, practice with c11_hin_v_cbse_02_003 exercises.',
                  misconception: 'Students often treat setting as a static list of locations ("home, school, teacher\'s house") and atmosphere as a single adjective per.' },
                { id: 'b', prompt: 'Analyze how the "teacher\'s house" setting functions differently from both the home and school settings.', answer: 'The teacher\'s house is a liminal space',
                  options: ['The teacher\'s house is a liminal space', 'just another school scene'],
                  hint: 'If unable to separate description from narration, practice with c11_hin_v_cbse_02_003 exercises.',
                  misconception: 'Students often treat setting as a static list of locations ("home, school, teacher\'s house") and atmosphere as a single adjective per.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read ONLY the descriptive passages (skip dialogue/action) for three settings: opening home scene.', 'Create a three-column table: Column A = sensory details quoted (sound/sight/smell/touch), Column B = emotional effect.', 'Compare Column B across settings — student must articulate the shift from passive suffering to active engagement.', 'Re-attempt Diagnostic Question 4 using this table. If still stuck, revisit c11_hin_v_cbse_02_003 (Class 11 Setting and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static list of locations ("home, school, teacher\'s house") and atmosphere as a single.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to end the chapter with the narrator returning to his village home after educational success.', answer: 'It reinforces the message',
                  options: ['It reinforces the message', 'it shows he never really left', 'it undermines liberation'],
                  hint: 'If unable to separate description from narration, practice with c11_hin_v_cbse_02_003 exercises.',
                  misconception: 'Students often treat setting as a static list of locations ("home, school, teacher\'s house") and atmosphere as a single adjective per.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read ONLY the descriptive passages (skip dialogue/action) for three settings: opening home scene.', 'Create a three-column table: Column A = sensory details quoted (sound/sight/smell/touch), Column B = emotional effect.', 'Compare Column B across settings — student must articulate the shift from passive suffering to active engagement.', 'Re-attempt Diagnostic Question 4 using this table. If still stuck, revisit c11_hin_v_cbse_02_003 (Class 11 Setting and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_004', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटक जाएं, तो **\'साक्ष्य-आधारित तर्क\' (Evidence-Based Argument)** की मूल अवधारणा (Node.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि चरित्र-चित्रण में नायक के **\'गुणों की सूची\' (List of Traits)** बनाना पर्याप्त.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'वितान भाग-2 — पाठ 2\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटक जाएं, तो **\'साक्ष्य-आधारित तर्क\' (Evidence-Based Argument)** की मूल अवधारणा (Node.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि चरित्र-चित्रण में नायक के **\'गुणों की सूची\' (List of Traits)** बनाना पर्याप्त है — जैसे "वह ईमानदार.' }
          ],
            remediations: { 'list-of-traits': { steps: ['**पुनः पाठ पढ़ें (Re-read)** — Node **c12_hin_v_cbse_02_002** (कथानक) से नायक के **तीन प्रमुख मोड़ (Turning Points)**.', '**साक्ष्य तालिका बनाएं (Evidence Table)** — एक कागज पर तीन कॉलम बनाएं: **प्रसंग | पाठगत साक्ष्य (उद्धरण/सार) | प्रकट.', '**\'क्यों\' पूछने का अभ्यास (Why Drill)** — प्रत्येक गुण के लिए 3 बार "क्यों?" पूछें। उत्तर पाठ से ही आएगा। 4.', '**पुनः निदान (Re-diagnostic)**: Diagnostic Question 3 को दोबारा हल करें — इस बार दो प्रसंगों की तुलना में **\'परिवर्तन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_005', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि फँस जाएँ: **c11_hin_v_cbse_01_005** (कक्षा 11 वितान पाठ 1 सहायक पात्र) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **"नायक की सहायता करने वाले साधन (tools/helpers)"** मानते हैं — जैसे वे नायक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'वितान भाग-2 — पाठ 2\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ: **c11_hin_v_cbse_01_005** (कक्षा 11 वितान पाठ 1 सहायक पात्र) दोबारा पढ़ें — वहाँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र सहायक पात्रों को **"नायक की सहायता करने वाले साधन (tools/helpers)"** मानते हैं — जैसे वे नायक की \'सेवा\' के लिए ही.' }
          ],
            remediations: { 'tools-helpers': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलें और **केवल उन पन्नों को पढ़ें जहाँ छोटे ठाकुर बोल नहीं रहा — जहाँ कोई और बोल रहा है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_006', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' का मुख्य विषय — \'वितान भाग-2 — पाठ 2\' का केंद्रीय भाव और.',
          hint: 'यदि फँसें तो: c12_hin_v_cbse_02_005 (माँ का चरित्र-चित्रण) के \'चरित्र-परिवर्तन\' खंड को.',
          misconception: '**विषय = कथानक का सारांश** — यह सबसे घातक भ्रम है। छात्र लिखते हैं: "जूझ भुवन नामक लड़के की कहानी है जो पढ़ना चाहता था.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' का मुख्य विषय — \'वितान भाग-2 — पाठ 2\' का केंद्रीय भाव और संदेश',
                  options: ['\'वितान भाग-2 — पाठ 2\' का मुख्य विषय — \'वितान भाग-2 — पाठ 2\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो: c12_hin_v_cbse_02_005 (माँ का चरित्र-चित्रण) के \'चरित्र-परिवर्तन\' खंड को दोबारा पढ़ें.',
                  misconception: '**विषय = कथानक का सारांश** — यह सबसे घातक भ्रम है। छात्र लिखते हैं: "जूझ भुवन नामक लड़के की कहानी है जो पढ़ना चाहता था पर महाजन ने नहीं.' }
          ],
            remediations: { 'moral-lesson': { steps: ['छात्र को कहानी के **अंतिम तीन पृष्ठ** फिर से पढ़वाएँ — विशेषकर भुवन-माँ संवाद। 2.', 'पूछें: "लेखक ने अंत यहीं क्यों रोका?', 'अगर माँ चुप रह जाती तो क्या बदलता?" 3.', 'साथ में **c12_hin_v_cbse_02_004** (नायक पात्र-चित्रण) और **c12_hin_v_cbse_02_005** (सहायक पात्र) दोबारा देखें — विषय.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
