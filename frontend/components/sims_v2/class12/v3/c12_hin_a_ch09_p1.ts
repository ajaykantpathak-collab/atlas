import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch09_p1: SimDef = {
    id: 'v3_c12_hin_a_ch09_p1',
    title: 'घनानंद · Part 1/3',
    subtitle: 'Cursed by his guru — he spent a life signing the guru\'s name',
    classLevel: 12, subject: 'hin_a', topic: 'घनानंद · Part 1/3',
    chapters: ['c12_hin_a_ch09'],
    nodeIds: ['c12_hin_a_cbse_09_001', 'c12_hin_a_cbse_09_002', 'c12_hin_a_cbse_09_003', 'c12_hin_a_cbse_09_004', 'c12_hin_a_cbse_09_005', 'c12_hin_a_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Braj Bhakti reader', intro: 'Court and guru both cast him out; he answered with a lifetime of poems that begin in longing and end in defiance.', goal: 'Read Ghananand\'s poems as guru-bhakti\'s two registers — virah\'s vigil and the public defence.' },
    discovery: {
        question: 'A court poet is exiled by his king and cursed by his own guru — then spends a lifetime signing the guru\'s name into his verses. What is that signature?',
        options: ['Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection', 'Pride disguised — signing the guru\'s name asserts his verses outrank the curse', 'A pen-name convention — court poets always published under a guru\'s seal', 'A public apology — the signature is the exile\'s lifelong plea for forgiveness'],
        answer: 'Devotion beyond betrayal — even expelled by both court and guru, he claims the guru as his; guru-bhakti as identity that outlasts rejection',
        hook: 'The two poems are one argument in two moods — private virah counting sleepless nights, then a public challenge daring the world to fault the guru. And the folk words aren\'t weakness: refined Braj deliberately fused with raw speech is craft, not compromise.',
    },
    teaching: [
        { title: 'घनानंद — कवि परिचय और पृष्ठभूमि', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the mendicant\'s nights: feel repetition stretch time in the longing poem, then stand in the marketplace challenge — and weigh a devotion that survives its own rejection.',
        labels: ['घनानंद — कवि परिचय', 'घनानंद — पद्यांश-वार भावार्थ', 'घनानंद — काव्य-संरचना और', 'घनानंद — केंद्रीय भाव', 'घनानंद — छंद और', 'घनानंद — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_001', title: 'घनानंद — कवि परिचय और पृष्ठभूमि',
          caseStudy: { intro: 'अंतरा भाग-2 खोलिए और पाठ 09 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who was ?kukuan’s guru, and what pivotal event altered the poet’s life trajectory?', options: [
                { text: '?kukuan’s guru was Latu (lqtku)', outcome: '?kukuan’s guru was Latu (lqtku). Because of his close relationship with Latu, ?kukuan gained.' },
                { text: 'Surdas', outcome: 'Not quite — Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are.', reveals: 'students-often-confuse-kukuan-with' },
                { text: 'Kabir or Tulsidas as guru, or missing the exile/curse', outcome: 'Not quite — Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are.', reveals: 'students-often-confuse-kukuan-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_002', title: 'घनानंद — पद्यांश-वार भावार्थ',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 9\' का क्रम: शुरुआत अंतरा-भाग-2-—-पाठ-9 से, घटनाएँ बढ़ती हैं, अंत \'अंतरा भाग-2 पर।',
            decisions: [{ prompt: 'What are the five standard stages of a narrative arc, and which stage typically contains the poem\'s turning point?', options: [
                { text: 'The five stages are exposition, rising action, climax, falling action, and denouement', outcome: 'The five stages are exposition, rising action, climax, falling action, and denouement.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza.', reveals: 'students-often-treat-plot-in' },
                { text: 'beginning, middle, end" or placing the turning point in the exposition', outcome: 'Not quite — Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza.', reveals: 'students-often-treat-plot-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_004', title: 'घनानंद — केंद्रीय भाव और रस',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'अंतरा भाग-2 — पाठ 9\' में अंतरा-भाग-2-—-पाठ-9 से पात्र उभरता है।',
            decisions: [{ prompt: 'Who is the protagonist in Kukuan\'s dohas, and what is his primary relationship that drives the poem?', options: [
                { text: 'The protagonist is the poetic speaker (Kukuan himself as the lover-poet), and his primary', outcome: 'The protagonist is the poetic speaker (Kukuan himself as the lover-poet), and his primary.' },
                { text: 'Lakshmi is the protagonist', outcome: 'Not quite — Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing.', reveals: 'students-treat-the-protagonist-as' },
                { text: 'the sakhi', outcome: 'Not quite — Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing.', reveals: 'students-treat-the-protagonist-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your team\'s short play about waiting for exam results ends on the protagonist\'s whispered plea, still unanswered. The director wants to add a closing scene where the result actually arrives \'so the climax is real.\'',
            decisions: [{ prompt: 'What does this chapter\'s treatment of unresolved longing say?', options: [
                { text: 'Resist the add-on — in the poem the beloved never appears and the climax is still the speaker\'s desperate plea; the peak is internal intensity, not external resolution, so the whispered plea already is the play\'s climax.', outcome: 'The chapter names this the open-ended narrative: emotional maximum without plot closure; tacking on the result would release the tension the play spent its length building.' },
                { text: 'Add the result scene — a climax requires something to be decided on stage.', outcome: 'That\'s the equation the chapter corrects — climax is the turning point of tension, not the delivery of news; the plea is where the character\'s need peaks, and the arrival would be denouement pretending to be climax.', reveals: 'climax-needs-outcome' },
                { text: 'Keep the open end but cut the final plea so the play stays evenly unresolved.', outcome: 'Removing the plea removes the peak — the poem builds toward that cry precisely so the silence after it lands as answer; flattening the ending flattens the whole arc.', reveals: 'unresolved-means-flat' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read guru-bhakti as both wound and banner — the poet who lost everything but the name he kept singing.',
            decisions: [{ prompt: 'What comes next? घनानंद · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — घनानंद · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
          misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and.',
          parts: [
                { id: 'a', prompt: 'Who was ?kukuan’s guru, and what pivotal event altered the poet’s life trajectory?', answer: '?kukuan’s guru was Latu (lqtku)',
                  options: ['?kukuan’s guru was Latu (lqtku)', 'Surdas', 'Kabir or Tulsidas as guru, or missing the exile/curse'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' },
                { id: 'b', prompt: 'Explain why ?kukuan is described as "lk{kkr jlewfrZ" (intense emotional poet) and how his language reflects this intensity.', answer: '?kukuan earners the label "lk{kkr jlewfrZ"',
                  options: ['?kukuan earners the label "lk{kkr jlewfrZ"', 'Braj language', 'emotion', 'Surdas'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' },
                { id: 'c', prompt: 'Compare the emotional tone of Poem 1 (viraha/longing) with Poem 2 (samvad/challenge). What does this shift reveal about ?kukuan’s conception of guru-bhakti?', answer: 'Poem 1 is inward, private, soaked in separation-pain (viraha)',
                  options: ['Poem 1 is inward, private, soaked in separation-pain (viraha)', 'Surdas'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' }
          ],
            remediations: { 'students-often-confuse-kukuan-with': { steps: ['Re-read the NCERT introductory paragraph (before the poems) and underline every biographical fact (dates, guru’s name.', 'Create a two-column table: left column = life event, right column = poetic consequence (e.g., exile → wandering.', 'Watch a 5-minute YouTube lecture on "Braj Bhakti poets: ?kukuan" (search exactly) to hear the dialect pronunciation.', 'Re-attempt Diagnostic Questions 1 and 4; if still incorrect, revisit Class 11 node c11_hin_ar_cbse_09_001.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "?kukuan’s use of folk dialects (e.g., \'owQdHkjh\', \'cgjk;cs\') weakens his literary status compared to poets who use pure Braj." Defend your.', answer: 'The claim is false',
                  options: ['The claim is false', 'Surdas'],
                  hint: 'If stuck, review the "Context and Background" section of Class 11 Chapter 1.',
                  misconception: 'Students often confuse ?kukuan with the more famous "Kabir" or "Surdas" because all three are Bhakti-era, use Braj, and write guru-bhakti.' }
          ],
            remediations: { 'students-often-confuse-kukuan-with': { steps: ['Re-read the NCERT introductory paragraph (before the poems) and underline every biographical fact (dates, guru’s name.', 'Create a two-column table: left column = life event, right column = poetic consequence (e.g., exile → wandering.', 'Watch a 5-minute YouTube lecture on "Braj Bhakti poets: ?kukuan" (search exactly) to hear the dialect pronunciation.', 'Re-attempt Diagnostic Questions 1 and 4; if still incorrect, revisit Class 11 node c11_hin_ar_cbse_09_001.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_002', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ।.',
          hint: 'Review the narrative arc mapping exercise from Class 11 Chapter 1.',
          misconception: 'Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza breaks, line enjambment.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', '\'अंतरा भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'Review the narrative arc mapping exercise from Class 11 Chapter 1 (c11_hin_ar_cbse_01_002) where.',
                  misconception: 'Students often treat "plot" in poetry as a simple summary of what happens, ignoring how stanza breaks, line enjambment, and speaker shifts.' }
          ],
            remediations: { 'students-often-treat-plot-in': { steps: ['Have the student re-read the first poem and physically mark each stanza with a label: E (exposition), R (rising),.', 'Ask them to justify each label with one line reference.', 'If they cannot distinguish rising from climax, give a mini-lesson using a परिचित Hindi film song with clear narrative.', 'Re-assess by having them analyze the second poem\'s dialogue turns as structural beats.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_003', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'यदि छात्र छंद की पहचान में फंसे हैं, तो उन्हें शब्द को धीरे-धीरे बोलकर अंतिम ध्वनि पर.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो शब्दों के अंत में समान अक्षर आ रहे हैं (जैसे \'빛\' और \'गति\' दोनों में \'ति\'), तो वे छंदित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'यदि छात्र छंद की पहचान में फंसे हैं, तो उन्हें शब्द को धीरे-धीरे बोलकर अंतिम ध्वनि पर ध्यान देना.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो शब्दों के अंत में समान अक्षर आ रहे हैं (जैसे \'빛\' और \'गति\' दोनों में \'ति\'), तो वे छंदित हैं — जबकि असल में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को देवनागरी लिपि में शब्दों को ध्वनिक इकाइयों में तोड़ने का अभ्यास करवाएँ — जैसे \'गति\' को ग+ति, \'빛\' को 빛 (एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_004', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'If stuck on "who is speaking?", return to the biography in c12_hin_a_cbse_09_001 — Kukuan.',
          misconception: 'Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing "the poet creates.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck on "who is speaking?", return to the biography in c12_hin_a_cbse_09_001 — Kukuan *names.',
                  misconception: 'Students treat the protagonist as a fictional character *separate* from the poet Kukuan, writing "the poet creates a character who.' }
          ],
            remediations: { 'students-treat-the-protagonist-as': { steps: ['Re-read both dohas aloud, circling every first-person pronoun/verb (मैं, मेरा, चाहूं, देखूं, सुनूं, भयो).', 'List only what the *speaker* says/does — ignore Lakshmi\'s actions or the sakhi\'s mention.', 'Revisit Class 11 node **c11_hin_ar_cbse_09_004** (Character Analysis: Protagonist) for the "speaker vs.', 'character" distinction in Kabir/Dadu.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_005', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'Work step by step.',
          misconception: 'छात्र často छंद को केवल तुकबंदी से जोड़कर समझते हैं — जैसे यदि दो पंक्तियों में अंत में तुकबंदी है (जैसे "जाने" और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे बढ़ाते', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Recall the definition.',
                  misconception: 'छात्र často छंद को केवल तुकबंदी से जोड़कर समझते हैं — जैसे यदि दो पंक्तियों में अंत में तुकबंदी है (जैसे "जाने" और "अनझे"), तो वे मान लेते.' }
          ],
            remediations: { 'asto': { steps: ['यदि छात्र छंद को केवल तुकबंदी से जोड़कर समझ रहा है, तो उसे निम्नलिखित चरण-दर-चरण अभ्यास करवाइए: पहला कदम: किसी भी दो.', 'वह शायद कहेगा हाँ क्योंकि तुक है। तीसरा कदम: अब उसे प्रत्येक पंक्ति के हर अक्षर पर मात्रा निर्धारित करने के लिए कहिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_09_006', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 9\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 9\' का केंद्रीय भाव और.',
          hint: 'यदि छात्र अलंकार के प्रकारों के बीच भ्रम में हो (जैसे रूपक और उपमा में अंतर नहीं कर पा.',
          misconception: 'छात्र अक्सर सोचते हैं कि अलंकार की पहचान करना पर्याप्त है — जैसे "यहाँ अनुप्रास है" या "यह रूपक है" लिख देना — और बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 9\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 9\' का केंद्रीय भाव और संदेश',
                  options: ['\'अंतरा भाग-2 — पाठ 9\' का मुख्य विषय — \'अंतरा भाग-2 — पाठ 9\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 9\' का कथानक — \'अंतरा भाग-2 — पाठ 9\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 9\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र अलंकार के प्रकारों के बीच भ्रम में हो (जैसे रूपक और उपमा में अंतर नहीं कर पा रहा हो), तो.',
                  misconception: 'छात्र अक्सर सोचते हैं कि अलंकार की पहचान करना पर्याप्त है — जैसे "यहाँ अनुप्रास है" या "यह रूपक है" लिख देना — और बोर्ड परीक्षा में full.' }
          ],
            remediations: { 'full': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर कैसे मजबूत बनाया जाए। उदाहरण देकर बताइए: "कमजोर: इस पंक्ति में रूपक है।" "मजबूत: इस.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
