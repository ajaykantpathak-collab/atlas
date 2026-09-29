import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch11_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch11_p1',
    title: 'बाज़ार दर्शन · Part 1/3',
    subtitle: 'The blind man saw the truth; the sighted chose the well',
    classLevel: 12, subject: 'hin_ar', topic: 'बाज़ार दर्शन · Part 1/3',
    chapters: ['c12_hin_ar_ch11'],
    nodeIds: ['c12_hin_ar_cbse_11_001', 'c12_hin_ar_cbse_11_002', 'c12_hin_ar_cbse_11_003', 'c12_hin_ar_cbse_11_004', 'c12_hin_ar_cbse_11_005', 'c12_hin_ar_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Psychoanalytic fiction reader', intro: 'A beggar who cannot see meets a society that refuses to. The story asks whose blindness is real.', goal: 'Read Bazar Darshan through psychoanalytic realism — blindness as epistemological and political condition.' },
    discovery: {
        question: 'A blind beggar is cheated because he can\'t see — but the story insists the real blindness belongs to everyone else. Blindness as what, then?',
        options: ['Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces', 'Poor eyesight only', 'Fate\'s cruelty', 'A medical condition'],
        answer: 'Wilful ignorance — the \'familiar well\' of habit and prejudice; society sees numbers and utility, never faces',
        hook: 'This is the psychoanalytic turn in Hindi fiction — after Premchand\'s social realism came Jainendra\'s probe of the unconscious, where blindness is imposed by power and kept by utilitarian logic. The beggar isn\'t a pitiable character; he\'s the site where ideology does its violence.',
    },
    teaching: [
        { title: 'बाज़ार दर्शन — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Look past the beggar\'s eyes: decode the \'familiar well\' that traps the sighted, test utilitarian arguments against lived faces, and separate spiritual darkness from manufactured blindness.',
        labels: ['बाज़ार दर्शन — पृष्ठभूमि', 'बाज़ार दर्शन — कथानक', 'बाज़ार दर्शन — पाठ्य-परिवेश', 'बाज़ार दर्शन — पात्र-चित्रण', 'बाज़ार दर्शन — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_006', title: 'बाज़ार दर्शन — मुख्य विषय और संदेश',
          caseStudy: { intro: 'सब घटनाएँ \'करुणा का नायक\' में \'करुणा का नायक\' का केंद्रीय भाव और संदेश की ओर ले जाती हैं — यही मुख्य विषय है।',
            decisions: [{ prompt: 'What is the literal meaning of the phrase "चोर का चोर" as used in the story\'s concluding section, and which character speaks it?', options: [
                { text: 'The phrase "चोर का चोर" literally means "thief of the thief" and is spoken by the', outcome: 'The phrase "चोर का चोर" literally means "thief of the thief" and is spoken by the narrator (the.' },
                { text: 'it means the police catch the thief', outcome: 'Not quite — Students treat "चोरी" in this story only as the peasant woman\'s act of taking ghee.', reveals: 'students-treat-in-this-story' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate pays a \'career guru\' who diagnoses his low marks as a family curse and prescribes an absurd regime — copying his ancestors\' names 500 times. He complied for a month, then quietly stopped going. He\'s still failing.',
            decisions: [{ prompt: 'What does Nirala\'s \'खुजली उखाड़ जासा\' read in this episode?', options: [
                { text: 'The story ends where it began — the patient flees still itching; walking away from a bogus authority returns you to the problem untouched. The satire is that individual escape doesn\'t cure a systemic absurdity — question the prescription, don\'t just flee the clinic.', outcome: 'The circular structure — opening and closing on the itch — exists to show the quest was futile; his problem survives the guru because it was never the itch being treated.' },
                { text: 'At least he escaped before worse harm — quietly quitting was the smart move.', outcome: 'Escape isn\'t the story\'s victory — the patient who runs is still scratching on the last page; leaving the fraud unexamined leaves both the itch and the marketplace of absurd cures intact.', reveals: 'escape-equals-solution' },
                { text: 'The guru\'s method was sound in principle — he just needed to persist longer for results.', outcome: 'That\'s the blind faith in authority the story skewers: the diagnosis was theatrical nonsense from the start, and more obedience only deepens the farce.', reveals: 'persist-with-absurdity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read blindness as a social instrument — and catch the moment a story stops being about a beggar and starts being about us.',
            decisions: [{ prompt: 'What comes next? बाज़ार दर्शन · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बाज़ार दर्शन · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck on "psychoanalytic story" definition: Re-read c11_hin_ar_cbse_11_002 (Plot.',
          misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के',
                  options: ['रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)', '\'करुणा का नायक\' का पात्र-चित्रण'],
                  hint: 'If stuck on "psychoanalytic story" definition: Re-read c11_hin_ar_cbse_11_002 (Plot of R;kxi=k) and.',
                  misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the story directly." **Why.' }
          ],
            remediations: { 'misconception-before-you-read-is': { steps: ['If a student cannot articulate the three mastery criteria: 1.', '**Revisit** c11_hin_ar_cbse_11_001 (Class 11 Chapter 11 Before You Read) — compare how *that* pre-reading framed.', '**Re-do** Diagnostic Questions 2 & 4 orally with a peer — force verbalization of "ipsZ¯”kx ikoj" and "vuhfr\'kkL=k".', '**Re-diagnostic:** Write a 50-word definition of "ck”kkj" *as used by tSusanz dekj* (not dictionary meaning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The pre-reading section over-intellectualizes a simple story about a blind beggar.', answer: '**Correct answer:** Refute',
                  options: ['**Correct answer:** Refute', 'background info'],
                  hint: 'If stuck on "psychoanalytic story" definition: Re-read c11_hin_ar_cbse_11_002 (Plot of R;kxi=k) and.',
                  misconception: '**Misconception:** "Before You Read is just author bio + difficult word meanings — I can skip it and understand the story directly." **Why.' }
          ],
            remediations: { 'misconception-before-you-read-is': { steps: ['If a student cannot articulate the three mastery criteria: 1.', '**Revisit** c11_hin_ar_cbse_11_001 (Class 11 Chapter 11 Before You Read) — compare how *that* pre-reading framed.', '**Re-do** Diagnostic Questions 2 & 4 orally with a peer — force verbalization of "ipsZ¯”kx ikoj" and "vuhfr\'kkL=k".', '**Re-diagnostic:** Write a 50-word definition of "ck”kkj" *as used by tSusanz dekj* (not dictionary meaning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_002', difficulty: 'standard',
          question: '\'करुणा का नायक\' का कथानक — \'करुणा का नायक\' — आरोह भाग-2 का पाठ। पाठ का कथानक.',
          hint: 'If stuck, review c11_hin_ar_cbse_11_002 (Plot and Narrative Structure) and practice.',
          misconception: 'Students often treat "plot" as a mere summary of "what happens" and "narrative structure" as synonymous with "sequence.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' का कथानक',
                  options: ['\'करुणा का नायक\' का कथानक', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)', '\'करुणा का नायक\' का पात्र-चित्रण'],
                  hint: 'If stuck, review c11_hin_ar_cbse_11_002 (Plot and Narrative Structure) and practice mapping.',
                  misconception: 'Students often treat "plot" as a mere summary of "what happens" and "narrative structure" as synonymous with "sequence of events." They.' }
          ],
            remediations: { 'students-often-treat-plot-as': { steps: ['Re-read the story solely to mark structural signposts: underline the opening itch description, circle the diagnosis.', 'Revisit c11_hin_ar_cbse_11_002 (Plot and Narrative Structure) and draw Freytag\'s pyramid for a परिचित story (e.g., "The.', 'Write a 5-sentence structural summary (not plot summary) using terms: exposition, inciting incident, rising action.', 'Compare with a peer: does your summary explain *how* the structure serves satire?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_003', difficulty: 'standard',
          question: '\'करुणा का नायक\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में.',
          hint: 'यदि फँसें तो कक्षा 11 के किसी भी गद्य पाठ (जैसे \'आवारा मसीहा\' c11_hin_al_cbse_02_003) का.',
          misconception: 'छात्र \'पृष्ठभूमि\' (background — लेखक का जीवन, रचना काल, ऐतिहासिक घटनाएँ) और \'परिवेश\' (setting/milieu — कथा के भीतर की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)',
                  options: ['\'करुणा का नायक\' का पाठ्य-परिवेश (setting)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पात्र-चित्रण'],
                  hint: 'यदि फँसें तो कक्षा 11 के किसी भी गद्य पाठ (जैसे \'आवारा मसीहा\' c11_hin_al_cbse_02_003) का परिवेश.',
                  misconception: 'छात्र \'पृष्ठभूमि\' (background — लेखक का जीवन, रचना काल, ऐतिहासिक घटनाएँ) और \'परिवेश\' (setting/milieu — कथा के भीतर की दुनिया) को एक मान.' }
          ],
            remediations: { 'background': { steps: ['चरण 1: छात्र से कहो — "उपन्यास के किसी एक पन्ने को खोलो जहाँ स्थान का वर्णन हो (अध्याय 1 या 2)। उसमें से केवल संज्ञाएँ.', 'एक वाक्य में लिखो।" चरण 3: इन वाक्यों को जोड़कर एक पैराग्राफ बनाओ — यही परिवेश-विश्लेषण है। चरण 4: पुनः डायग्नोस्टिक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_004', difficulty: 'standard',
          question: '\'करुणा का नायक\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि \'नायक के द्वंद्व\' को पकड़ने में कठिनाई हो तो कक्षा 11 के \'पात्र-चित्रण\' नोड.',
          misconception: 'छात्र प्रायः नायक को \'शोषित पीड़ित\' (victim) मानकर उसके \'समझौतों\' को मजबूरी का नाम दे देते हैं, जबकि पाठ दर्शाता है कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' का पात्र-चित्रण',
                  options: ['\'करुणा का नायक\' का पात्र-चित्रण', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि \'नायक के द्वंद्व\' को पकड़ने में कठिनाई हो तो कक्षा 11 के \'पात्र-चित्रण\' नोड.',
                  misconception: 'छात्र प्रायः नायक को \'शोषित पीड़ित\' (victim) मानकर उसके \'समझौतों\' को मजबूरी का नाम दे देते हैं, जबकि पाठ दर्शाता है कि नायक **सक्रिय रूप.' }
          ],
            remediations: { 'victim': { steps: ['पाठ के उन तीन प्रसंगों को चिह्नित करें जहाँ नायक **चुनाव** करता है (इंटरव्यू में झूठ, डिफेक्टिव पीस बेचना, कमल की.', 'कक्षा 11 के \'पात्र-चित्रण\' नोड (c11_hin_ar_cbse_11_004) के \'चरित्र के विकास के चरण\' ढांचे को दोहराएँ और नायक पर लागू.', 'पुनः निदान: "नायक के तीन सक्रिय चुनाव लिखें जहाँ उसने नैतिकता पर व्यावहारिकता को चुना।"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_005', difficulty: 'standard',
          question: '\'करुणा का नायक\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को आगे.',
          hint: 'यदि अटके तो कक्षा 11 के \'पात्र-चित्रण: सहायक पात्र\' नोड्स (c11_hin_ar_cbse_01_005 आदि) को.',
          misconception: 'छात्र सहायक पात्रों को \'केवल नाम गिनाने\' (listing) तक सीमित कर देते हैं — जैसे "फल वाला, चाय वाला, रिक्शा वाला हैं".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' के सहायक पात्र',
                  options: ['\'करुणा का नायक\' के सहायक पात्र', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो कक्षा 11 के \'पात्र-चित्रण: सहायक पात्र\' नोड्स (c11_hin_ar_cbse_01_005 आदि) को दोहराएँ.',
                  misconception: 'छात्र सहायक पात्रों को \'केवल नाम गिनाने\' (listing) तक सीमित कर देते हैं — जैसे "फल वाला, चाय वाला, रिक्शा वाला हैं" — और यह नहीं देखते कि.' }
          ],
            remediations: { 'listing': { steps: ['चरण 1: पाठ को फिर से पढ़ें और हर सहायक पात्र के सामने आने वाले पैराग्राफ को चिह्नित करें (हाइलाइटर से)। चरण 2: प्रत्येक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_11_006', difficulty: 'standard',
          question: '\'करुणा का नायक\' का मुख्य विषय — \'करुणा का नायक\' का केंद्रीय भाव और संदेश',
          hint: 'If stuck, revisit c11_hin_ar_cbse_11_006 (Theme: Primary Theme and Message for "नमक का.',
          misconception: 'Students treat "चोरी" in this story only as the peasant woman\'s act of taking ghee.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'करुणा का नायक\' का मुख्य विषय',
                  options: ['\'करुणा का नायक\' का मुख्य विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'करुणा का नायक\' का कथानक', '\'करुणा का नायक\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_11_006 (Theme: Primary Theme and Message for "नमक का दरोगा") and.',
                  misconception: 'Students treat "चोरी" in this story only as the peasant woman\'s act of taking ghee.' }
          ],
            remediations: { 'students-treat-in-this-story': { steps: ['If a student cannot move beyond the ghee-theft anecdote: (1) Have them re-read only the woman\'s monologue starting.', '(2) Ask them to list every abstract noun she associates with theft: तनाव, बैचैनी, नींद, चैन, आत्मा, विश्वास.', '(3) Have them match each to a character in the story.', '(4) Re-attempt Diagnostic Q2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
