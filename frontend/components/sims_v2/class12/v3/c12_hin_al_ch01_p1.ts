import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch01_p1: SimDef = {
    id: 'v3_c12_hin_al_ch01_p1',
    title: 'सूरदास की झोंपड़ी · Part 1/3',
    subtitle: 'In this village, even the dead owed the landlord',
    classLevel: 12, subject: 'hin_al', topic: 'सूरदास की झोंपड़ी · Part 1/3',
    chapters: ['c12_hin_al_ch01'],
    nodeIds: ['c12_hin_al_cbse_01_001', 'c12_hin_al_cbse_01_002', 'c12_hin_al_cbse_01_003', 'c12_hin_al_cbse_01_004', 'c12_hin_al_cbse_01_005', 'c12_hin_al_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi regional-literature reader', intro: 'A custom where the dead were auctioned for debt sounds invented — it wasn\'t. Renu documented it from life.', goal: 'Read Laknak ki Saai through zamindari exploitation, informal credit and the custom of साईँ.' },
    discovery: {
        question: 'In 1950s Bihar, a landlord auctions a peasant family\'s dead to recover a debt — the custom called \'साईँ.\' Why did the corpse become collateral?',
        options: ['No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself', 'It was a religious ritual', 'Villages had no money at all', 'The dead were community property'],
        answer: 'No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself',
        hook: 'This isn\'t a funeral rite — it\'s feudal economics with the corpse as collateral, turning even death into a transaction. Renu was a Quit India fighter and rural journalist: the आंचलिक dialect and documented detail make it an indictment, not a village sketch.',
    },
    teaching: [
        { title: 'सूरदास की झोंपड़ी — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Renu\'s Bihar as a documentarian: decode the custom that auctions the dead, weigh the zamindar-peasant power imbalance, and read dialect as resistance.',
        labels: ['सूरदास की झोंपड़ी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_001', title: 'सूरदास की झोंपड़ी — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'अंतराल भाग-2 खोलिए और पाठ 01 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the author of "लड़कनक की साईँ" and what is the literal meaning of the word \'साईँ\' in the title?', options: [
                { text: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), a prominent आंचलिक कथाकार from Bihar', outcome: 'The author is Phanishwar Nath Renu (फणीश्वरनाथ रेणु), a prominent आंचलिक कथाकार from Bihar.' },
                { text: 'Premchand or defining \'साईँ\' as a funeral ritual', outcome: 'Not quite — Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral.', reveals: 'students-often-treat-before-you' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On an NGO internship in a village, you watch a moneylender stall a poor family\'s funeral until they \'settle his dues\' — the crowd shrugs that debt must be honoured. Your field note reads: \'cruel individual.\'',
            decisions: [{ prompt: 'What does the context of Renu\'s \'साईँ\' add to that diagnosis?', options: [
                { text: 'Rewrite the note as a systemic failure — \'साईँ\' treated even a corpse as loan collateral because peasants had no formal credit; the moneylender blocking the rites isn\'t just a cruel man, he\'s the visible edge of a system where the borrower\'s dignity is the last asset on the books.', outcome: 'Renu\'s story is an indictment of the credit vacuum and landlord power that made bodies payable — \'poverty\' alone doesn\'t explain it; the absence of institutional alternatives does.' },
                { text: 'Keep the note as written — one cruel man harassing a grieving family is the whole story.', outcome: 'That flattens Renu\'s critique into a villain sketch: the custom persisted because the village economy had no other way to secure a loan, so removing one lender leaves the machinery intact.', reveals: 'cruelty-is-individual' },
                { text: 'Side with the crowd — a debt is a debt, and rituals shouldn\'t shield borrowers from repayment.', outcome: 'That naturalises exactly what the story exposes: when a corpse can be collateral, \'honouring debt\' has already swallowed human dignity — the crowd\'s shrug is the system\'s success, not its excuse.', reveals: 'debt-before-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a regional story as evidence of a system — where even grief was mortgaged to the landlord.',
            decisions: [{ prompt: 'What comes next? सूरदास की झोंपड़ी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सूरदास की झोंपड़ी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
          misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the custom of \'साईँ\' emerged in rural Bihar and what it tells us about the relationship between peasants and landlords.', answer: '\'साईँ\' emerged because peasants had no access to formal credit',
                  options: ['\'साईँ\' emerged because peasants had no access to formal credit', 'poverty'],
                  hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.' },
                { id: 'b', prompt: 'Phanishwar Nath Renu participated in the 1942 Quit India Movement and worked as a journalist in rural Bihar.', answer: 'His involvement in the freedom struggle exposed him to the gap between political',
                  options: ['His involvement in the freedom struggle exposed him to the gap between political', 'he wrote realistically'],
                  hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['Re‑read the "पाठ परिचय" (Text Introduction) in the NCERT textbook and underline every proper noun (author, region.', 'Watch a 5‑minute video on "जमींदारी प्रथा और ग्रामीण ऋण" (e.g., from NCERT’s official YouTube channel) to visualize the.', 'Discuss with the teacher: "If the landlord already owns the land, why does he need the body?" — this question forces.', 'Re‑attempt Diagnostic Questions 2 and 4; if answers improve, move forward.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "A reader can fully appreciate \'लड़कनक की साईँ\' without any knowledge of the historical context or the custom of \'साईँ\' because the story’s.', answer: 'The claim is false',
                  options: ['The claim is false', 'universalist'],
                  hint: 'If stuck, review the "पाठ परिचय" section of any Class 11 Hindi chapter (e.g.',
                  misconception: 'Students often treat "Before You Read" as a skippable summary and assume \'साईँ\' is merely a funeral ceremony.' }
          ],
            remediations: { 'students-often-treat-before-you': { steps: ['Re‑read the "पाठ परिचय" (Text Introduction) in the NCERT textbook and underline every proper noun (author, region.', 'Watch a 5‑minute video on "जमींदारी प्रथा और ग्रामीण ऋण" (e.g., from NCERT’s official YouTube channel) to visualize the.', 'Discuss with the teacher: "If the landlord already owns the land, why does he need the body?" — this question forces.', 'Re‑attempt Diagnostic Questions 2 and 4; if answers improve, move forward.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_002', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' का कथानक — \'ल्वज्नकल की >कसईम+ह\' — अंतराल भाग-2 का पाठ।.',
          hint: 'If unable to map reading vs. chronological order, practice with a परिचित film (e.g.',
          misconception: 'Students equate "plot" with "what happens" and "structure" with "beginning-middle-end", treating them as synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' का कथानक',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)', '\'ल्वज्नकल की >कसईम+ह\' का पात्र-चित्रण'],
                  hint: 'If unable to map reading vs. chronological order, practice with a परिचित film (e.g., "Baghban".',
                  misconception: 'Students equate "plot" with "what happens" and "structure" with "beginning-middle-end", treating them as synonyms.' }
          ],
            remediations: { 'students-equate-plot-with-what': { steps: ['Have the student take ANY short story (even a fable) and create a two-column table: Column A = events in reading order.', 'For every row where A ≠ B, write one sentence: "The author places [event] here instead of chronologically to achieve.', 'Practice with the NCERT story — map the ledger scene (reading order: late; chronological: middle) and articulate its.', 'Re-attempt Diagnostic Question 3. If still stuck, revisit c11_hin_ar_cbse_01_002 (Class 11 Plot basics) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_003', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि अटके, तो कक्षा 11 के \'हुसैन की कहानी अपनी ज़बानी\' (c11_hin_al_cbse_01_003) का.',
          misconception: 'छात्र अक्सर \'परिवेश\' (Setting) को केवल \'स्थान और समय\' (Place and Time) मान लेते हैं, और \'वातावरण\' (Atmosphere) को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पात्र-चित्रण'],
                  hint: 'यदि अटके, तो कक्षा 11 के \'हुसैन की कहानी अपनी ज़बानी\' (c11_hin_al_cbse_01_003) का परिवेश-वातावरण.',
                  misconception: 'छात्र अक्सर \'परिवेश\' (Setting) को केवल \'स्थान और समय\' (Place and Time) मान लेते हैं, और \'वातावरण\' (Atmosphere) को \'मौसम\' (Weather) समझते.' }
          ],
            remediations: { 'setting-place-and-time': { steps: ['चरण 1: छात्र को कहानी के पहले दो पैराग्राफ जोर से पढ़वाएं और हर संज्ञा (Noun) को घेरने को कहें — फिर पूछें: \'इनमें से.', 'लेखक ने इन्हें क्यों चुना?\' चरण 3: छात्र से कहें कि वह झोंपड़ी का चित्र बनाए और हर भाग को लेबल करे — फिर प्रत्येक लेबल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_004', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि छात्र मुख्य पात्र की पहचान में कठिनाई महसूस कर रहा है, तो उसे पात्र के आंतरिक लक्षणों.',
          misconception: 'छात्र अक्सर मुख्य पात्र की पहचान करते समय केवल उसके बाहरी दिखावे, सामाजिक स्थिति या कहानी में आने वाली बारंबारता पर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' का पात्र-चित्रण',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र मुख्य पात्र की पहचान में कठिनाई महसूस कर रहा है, तो उसे पात्र के आंतरिक लक्षणों (विचार.',
                  misconception: 'छात्र अक्सर मुख्य पात्र की पहचान करते समय केवल उसके बाहरी दिखावे, सामाजिक स्थिति या कहानी में आने वाली बारंबारता पर निर्भर करते हैं, जैसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र इस गलती को दोहराता है, तो उसे निम्नलिखित चरणों का पालन करना चाहिए: - चरण 1: पाठ को दोबारा पढ़ें और प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_005', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'यदि नायक की विशेषताएं (तर्कशीलता, गरिमा, विद्रोह) स्पष्ट न हों, तो c12_hin_al_cbse_01_004.',
          misconception: 'छात्र मानते हैं कि सहायक पात्रों का चित्रण केवल \'उनके नाम और एक वाक्य में भूमिका\' लिखना है। **गलत:** बोर्ड/CUET में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' के सहायक पात्र',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि नायक की विशेषताएं (तर्कशीलता, गरिमा, विद्रोह) स्पष्ट न हों, तो c12_hin_al_cbse_01_004 के.',
                  misconception: 'छात्र मानते हैं कि सहायक पात्रों का चित्रण केवल \'उनके नाम और एक वाक्य में भूमिका\' लिखना है। **गलत:** बोर्ड/CUET में पूछा जाता है — "पुजारी.' }
          ],
            remediations: { 'cuet': { steps: ['चरण 1: c12_hin_al_cbse_01_002 (कथानक) दोबारा पढ़ें — घटनाक्रम में सहायक पात्र कब-कहाँ आते हैं, चिह्नित करें। चरण 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_006', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' का मुख्य विषय — \'ल्वज्नकल की >कसईम+ह\' का केंद्रीय भाव और.',
          hint: 'यदि फंसें तो c12_hin_al_cbse_01_002 (कथानक और आख्यान-संरचना) पर दोबारा जाएं — घटनाओं के.',
          misconception: 'छात्र अक्सर मुख्य विषय को पाठ के पहले या最后 वाक्य से जोड़कर मान लेते हैं कि वह वहीं स्पष्ट रूप से लिखा है — जैसे यदि पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' का मुख्य विषय',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो c12_hin_al_cbse_01_002 (कथानक और आख्यान-संरचना) पर दोबारा जाएं — घटनाओं के क्रम को.',
                  misconception: 'छात्र अक्सर मुख्य विषय को पाठ के पहले या最后 वाक्य से जोड़कर मान लेते हैं कि वह वहीं स्पष्ट रूप से लिखा है — जैसे यदि पाठ शुरू में "झोंपड़ी.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ पढ़ने के लिए कहिए और प्रत्येक stanza के बाद पूछिए: "यहां क्या दोहराया जा रहा है?" फिर उसके उत्तर पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
