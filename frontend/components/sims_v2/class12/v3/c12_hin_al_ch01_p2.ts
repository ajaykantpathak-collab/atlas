import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch01_p2: SimDef = {
    id: 'v3_c12_hin_al_ch01_p2',
    title: 'सूरदास की झोंपड़ी · Part 2/3',
    subtitle: 'In this village, even the dead owed the landlord',
    classLevel: 12, subject: 'hin_al', topic: 'सूरदास की झोंपड़ी · Part 2/3',
    chapters: ['c12_hin_al_ch01'],
    nodeIds: ['c12_hin_al_cbse_01_007', 'c12_hin_al_cbse_01_008', 'c12_hin_al_cbse_01_009', 'c12_hin_al_cbse_01_010', 'c12_hin_al_cbse_01_011', 'c12_hin_al_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi regional-literature reader', intro: 'A custom where the dead were auctioned for debt sounds invented — it wasn\'t. Renu documented it from life.', goal: 'Read Laknak ki Saai through zamindari exploitation, informal credit and the custom of साईँ.' },
    discovery: {
        question: 'In 1950s Bihar, a landlord auctions a peasant family\'s dead to recover a debt — the custom called \'साईँ.\' Why did the corpse become collateral?',
        options: ['No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself', 'It was a religious ritual', 'Villages had no money at all', 'The dead were community property'],
        answer: 'No formal credit existed — peasants borrowed at crushing interest, and the only thing a landlord could still seize was the dead body itself',
        hook: 'This isn\'t a funeral rite — it\'s feudal economics with the corpse as collateral, turning even death into a transaction. Renu was a Quit India fighter and rural journalist: the आंचलिक dialect and documented detail make it an indictment, not a village sketch.',
    },
    teaching: [
        { title: 'सूरदास की झोंपड़ी — गौण विषय', text: '\'ल्वज्नकल की >कसईम+ह\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Renu\'s Bihar as a documentarian: decode the custom that auctions the dead, weigh the zamindar-peasant power imbalance, and read dialect as resistance.',
        labels: ['सूरदास की झोंपड़ी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_007', title: 'सूरदास की झोंपड़ी — गौण विषय',
          caseStudy: { intro: '\'ल्वज्नकल की >कसईम+ह\' में ल्वज्नकल-की->कसईम+ह जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'Define "secondary theme" in your own words and give one example from any Class 11 or 12 Hindi story you have studied.', options: [
                { text: 'A secondary theme is a significant but subordinate thematic strand that runs alongside', outcome: 'A secondary theme is a significant but subordinate thematic strand that runs alongside the primary.' },
                { text: 'Munshi gets transferred', outcome: 'Not quite — Students conflate **subplot** with **secondary theme** — they think "Narayan\'s reform work" or "the.', reveals: 'students-conflate-subplot-with-secondary' },
                { text: 'corruption', outcome: 'Not quite — Students conflate **subplot** with **secondary theme** — they think "Narayan\'s reform work" or "the.', reveals: 'students-conflate-subplot-with-secondary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_008', title: 'सूरदास की झोंपड़ी — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'ल्वज्नकल की >कसईम+ह\' में बिंब ढूँढिए — ल्वज्नकल-की->कसईम+ह — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define \'imagery\' (प्रतिबिंब) and \'metaphor\' (रूपक) in your own words, giving one example of each from the opening paragraph of the story.', options: [
                { text: '**Correct Answer:** Imagery is language appealing to senses (e.g., "पीली रोशनी",', outcome: '**Correct Answer:** Imagery is language appealing to senses (e.g., "पीली रोशनी", "टेढ़े-मेढ़े.' },
                { text: 'like/as', outcome: 'Not quite — Students often think **imagery is only visual description** ("the author paints a picture") and.', reveals: 'imagery-is-only-visual-description' },
                { text: 'the author paints a picture', outcome: 'Not quite — Students often think **imagery is only visual description** ("the author paints a picture") and.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_009', title: 'सूरदास की झोंपड़ी — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'ल्वज्नकल की >कसईम+ह\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony and give one example from the story where the actual outcome is the opposite of what the characters expect.', options: [
                { text: 'Situational irony occurs when events turn out contrary to what is expected or appropriate', outcome: 'Situational irony occurs when events turn out contrary to what is expected or appropriate.' },
                { text: 'any object mentioned in the story is a symbol', outcome: 'Not quite — Students often confuse symbolism with simple description: they think any object mentioned in the.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_012', title: 'सूरदास की झोंपड़ी — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'ल्वज्नकल की >कसईम+ह\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'ल्वज्नकल की >कसईम+ह\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: '**REMEMBER:** According to the text, what specific action does lwjnkl take when HkSjksa asks him to leave the room after the argument about.', options: [
                { text: '**Correct Answer:** lwjnkl moves to the threshold (dehleez) of the house and sits there', outcome: '**Correct Answer:** lwjnkl moves to the threshold (dehleez) of the house and sits there silently.' },
                { text: 'He argues back', outcome: 'Not quite — Students treat inferential questions as "opinion questions" where any answer is valid if they.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'He leaves the house', outcome: 'Not quite — Students treat inferential questions as "opinion questions" where any answer is valid if they.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On an NGO internship in a village, you watch a moneylender stall a poor family\'s funeral until they \'settle his dues\' — the crowd shrugs that debt must be honoured. Your field note reads: \'cruel individual.\'',
            decisions: [{ prompt: 'What does the context of Renu\'s \'साईँ\' add to that diagnosis?', options: [
                { text: 'Rewrite the note as a systemic failure — \'साईँ\' treated even a corpse as loan collateral because peasants had no formal credit; the moneylender blocking the rites isn\'t just a cruel man, he\'s the visible edge of a system where the borrower\'s dignity is the last asset on the books.', outcome: 'Renu\'s story is an indictment of the credit vacuum and landlord power that made bodies payable — \'poverty\' alone doesn\'t explain it; the absence of institutional alternatives does.' },
                { text: 'Keep the note as written — one cruel man harassing a grieving family is the whole story.', outcome: 'That flattens Renu\'s critique into a villain sketch: the custom persisted because the village economy had no other way to secure a loan, so removing one lender leaves the machinery intact.', reveals: 'cruelty-is-individual' },
                { text: 'Side with the crowd — a debt is a debt, and rituals shouldn\'t shield borrowers from repayment.', outcome: 'That naturalises exactly what the story exposes: when a corpse can be collateral, \'honouring debt\' has already swallowed human dignity — the crowd\'s shrug is the system\'s success, not its excuse.', reveals: 'debt-before-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a regional story as evidence of a system — where even grief was mortgaged to the landlord.',
            decisions: [{ prompt: 'What comes next? सूरदास की झोंपड़ी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सूरदास की झोंपड़ी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_007', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If unable to separate primary from secondary themes, review node 006 and practice the.',
          misconception: 'Students conflate **subplot** with **secondary theme** — they think "Narayan\'s reform work" or "the new settlement" are.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between the primary theme and a secondary theme using "लाजवंती की चिट्ठी." State the primary theme in one sentence, then name one.', answer: 'Primary theme: The story centers on the gendered trauma of Partition',
                  options: ['Primary theme: The story centers on the gendered trauma of Partition', 'primary theme is Partition, secondary theme is marriage'],
                  hint: 'If unable to separate primary from secondary themes, review node 006 and practice the "topic →.',
                  misconception: 'Students conflate **subplot** with **secondary theme** — they think "Narayan\'s reform work" or "the new settlement" are secondary themes.' }
          ],
            remediations: { 'students-conflate-subplot-with-secondary': { steps: ['If student cannot move beyond topics to thematic statements: 1) Have them list 5 recurring nouns/images in the story.', '2) For each, complete: "The story argues that ______ [noun] ______ [verb phrase showing consequence/critique].".', 'Does it connect to primary theme?', '4) Discard statements that are plot summary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate **subplot** with **secondary theme** — they think "Narayan\'s reform work" or "the new settlement" are.',
          parts: [
                { id: 'a', prompt: 'Evaluate: Which secondary theme more powerfully critiques Partition-era patriarchy — "male ego disguised as honor" (Sunderlal) or "social reform rhetoric.', answer: '**Male ego disguised as honor** is the sharper critique',
                  options: ['**Male ego disguised as honor** is the sharper critique', 'WRONG ANSWER REVEALS: If student picks Narayan because'],
                  hint: 'If unable to separate primary from secondary themes, review node 006 and practice the "topic →.',
                  misconception: 'Students conflate **subplot** with **secondary theme** — they think "Narayan\'s reform work" or "the new settlement" are secondary themes.' }
          ],
            remediations: { 'students-conflate-subplot-with-secondary': { steps: ['If student cannot move beyond topics to thematic statements: 1) Have them list 5 recurring nouns/images in the story.', '2) For each, complete: "The story argues that ______ [noun] ______ [verb phrase showing consequence/critique].".', 'Does it connect to primary theme?', '4) Discard statements that are plot summary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_008', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review the definition of \'tenor\' and \'vehicle\' in metaphor (Class 11) and.',
          misconception: 'Students often think **imagery is only visual description** ("the author paints a picture") and **metaphor is just.',
          parts: [
                { id: 'a', prompt: 'Define \'imagery\' (प्रतिबिंब) and \'metaphor\' (रूपक) in your own words, giving one example of each from the opening paragraph of the story (page 2: "ने के ने में.', answer: '**Correct Answer:** Imagery is language appealing to senses (e.g., "पीली रोशनी",',
                  options: ['**Correct Answer:** Imagery is language appealing to senses (e.g., "पीली रोशनी",', 'like/as', 'the author paints a picture', 'it\'s like saying A is B'],
                  hint: 'If stuck, review the definition of \'tenor\' and \'vehicle\' in metaphor (Class 11) and practice.',
                  misconception: 'Students often think **imagery is only visual description** ("the author paints a picture") and **metaphor is just a fancy simile** ("it\'s.' },
                { id: 'b', prompt: 'Explain why the author describes the staircase\'s heat as "विष की साँस" (poison\'s breath) and "घृणा की विष की साँस" (hatred\'s poisonous breath) instead.', answer: '**Correct Answer:** The metaphor transforms a physical sensation (heat) into a',
                  options: ['**Correct Answer:** The metaphor transforms a physical sensation (heat) into a', 'it\'s more poetic', 'it creates a picture', 'the author paints a picture'],
                  hint: 'If stuck, review the definition of \'tenor\' and \'vehicle\' in metaphor (Class 11) and practice.',
                  misconception: 'Students often think **imagery is only visual description** ("the author paints a picture") and **metaphor is just a fancy simile** ("it\'s.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['**Re-read the opening paragraph (page 2) aloud** — mark every word appealing to a sense (V=visual, A=auditory.', 'Count: you should find ≥5 sensory words in 4 lines.', '**Draw a two-column table**: Column A = "Staircase qualities described" (hot, crooked, dark, breath-like, poisonous.', 'Draw arrows connecting each pair — this makes the metaphor visible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_009', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the Class 11 node c11_hin_ar_cbse_01_009 (Literary Devices: Irony and.',
          misconception: 'Students often confuse symbolism with simple description: they think any object mentioned in the story is a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' में विरोधाभास',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review the Class 11 node c11_hin_ar_cbse_01_009 (Literary Devices: Irony and Symbolism).',
                  misconception: 'Students often confuse symbolism with simple description: they think any object mentioned in the story is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If a student cannot distinguish symbol from object, have them list five objects in the story, then for each ask: "What.', 'Does the text support that meaning in multiple scenes?" For irony, give them three scenarios (one ironic, two not) and.', 'Then return to the text and mark every moment where a character says one thing but does another, or where the outcome.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_010', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि फंसें तो कक्षा 11 के पदावली नोड (c11_hin_a_cbse_01_010) की मुख्य शब्दों की पहचान और.',
          misconception: 'छात्र अक्सर मुख्य शब्दों के पर्यायवाची को उनके समान अर्थ मानकर interchangeably उपयोग कर देते हैं, जैसे \'भक्त\' को \'सेवक\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' की पदावली',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें तो कक्षा 11 के पदावली नोड (c11_hin_a_cbse_01_010) की मुख्य शब्दों की पहचान और अर्थ बताने.',
                  misconception: 'छात्र अक्सर मुख्य शब्दों के पर्यायवाची को उनके समान अर्थ मानकर interchangeably उपयोग कर देते हैं, जैसे \'भक्त\' को \'सेवक\' के समान समझना, जबकि.' }
          ],
            remediations: { 'interchangeably': { steps: ['छात्र को दो वाक्य दीजिए: एक में \'भक्त\' और दूसरे में \'सेवक\' का प्रयोग सही संदर्भ में करिए; फिर पूछिए कि प्रत्येक शब्द.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_011', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'Review Class 11 Antara Chapter 1 "गलता लोहा" grammar analysis (c11_hin_ar_cbse_01_011).',
          misconception: 'Students treat dialectal forms in the text as "grammatical errors" or "incorrect Hindi" rather than deliberate literary.',
          parts: [
                { id: 'a', prompt: 'Explain why the author uses "rqe" (तुम) and "vki" (आप) interchangeably for the same character Taj in different dialogues, and what this reveals about power.', answer: 'Taj uses "vki" (आप) with Ukhadke (e.g., "vki gh fcxkM+ nsaxs"',
                  options: ['Taj uses "vki" (आप) with Ukhadke (e.g., "vki gh fcxkM+ nsaxs"', 'inconsistent usage', 'author\'s mistake'],
                  hint: 'Review Class 11 Antara Chapter 1 "गलता लोहा" grammar analysis (c11_hin_ar_cbse_01_011) where.',
                  misconception: 'Students treat dialectal forms in the text as "grammatical errors" or "incorrect Hindi" rather than deliberate literary reप्रस्तुति.' },
                { id: 'b', prompt: 'Rewrite the following standard Hindi sentence into the story\'s dialectal style as spoken by Chhajju: "उसने कहा कि वह कल आएगा।" Show all morphological changes.', answer: 'Step 1: **Pronoun shift**',
                  options: ['Step 1: **Pronoun shift**', 'उसने कहा कि वह आएगा'],
                  hint: 'Review Class 11 Antara Chapter 1 "गलता लोहा" grammar analysis (c11_hin_ar_cbse_01_011) where.',
                  misconception: 'Students treat dialectal forms in the text as "grammatical errors" or "incorrect Hindi" rather than deliberate literary reप्रस्तुति.' },
                { id: 'c', prompt: 'Analyze how the imperative mood shifts in Lajwanti\'s speech from the beginning (page 3: "vc rks vanj&ckgj lc ,d gks x;k gSA") to the climax (page 8: "lp&lp crk.', answer: '**Beginning**: Lajwanti uses **declarative statements with implied command**',
                  options: ['**Beginning**: Lajwanti uses **declarative statements with implied command**', 'tone change'],
                  hint: 'Review Class 11 Antara Chapter 1 "गलता लोहा" grammar analysis (c11_hin_ar_cbse_01_011) where.',
                  misconception: 'Students treat dialectal forms in the text as "grammatical errors" or "incorrect Hindi" rather than deliberate literary reप्रस्तुति.' }
          ],
            remediations: { 'students-treat-dialectal-forms-in': { steps: ['Have the student list 10 "strange words" from the dialogue (pages 3-8).', 'Together, map each to its standard Hindi equivalent (e.g., "osQ → के", "mls → उसे", "rqe → तुम").', 'Ask: "If the author knew standard Hindi (she writes narration in it), why choose these forms *only* for characters?"', 'Guide to the answer: "To show *who* speaks — their region, class, power."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_01_012', difficulty: 'standard',
          question: '\'ल्वज्नकल की >कसईम+ह\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review the plot summary (c12_hin_al_cbse_01_002) and character analyses.',
          misconception: 'Students treat inferential questions as "opinion questions" where any answer is valid if they "feel" it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'ल्वज्नकल की >कसईम+ह\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'ल्वज्नकल की >कसईम+ह\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'ल्वज्नकल की >कसईम+ह\' का कथानक', '\'ल्वज्नकल की >कसईम+ह\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review the plot summary (c12_hin_al_cbse_01_002) and character analyses.',
                  misconception: 'Students treat inferential questions as "opinion questions" where any answer is valid if they "feel" it.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['**Revisit Prerequisite:** Have the student re-read c12_hin_al_cbse_01_002 (Plot) and c12_hin_al_cbse_01_004.', '**Micro-drill:** Give 5 sentences from the chapter.', 'Ask student to label each: "Explicit Fact" or "Implied Meaning".', '**Scaffolded Inference:** Use the "Evidence → Reasoning → Conclusion" template (3-column table) for 3 inferential.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
