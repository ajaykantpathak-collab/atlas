import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_al_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_al_ch02_p2: SimDef = {
    id: 'v3_c12_hin_al_ch02_p2',
    title: 'बस्किोहर की माटी · Part 2/3',
    subtitle: 'One clay bowl holding a whole childhood',
    classLevel: 12, subject: 'hin_al', topic: 'बस्किोहर की माटी · Part 2/3',
    chapters: ['c12_hin_al_ch02'],
    nodeIds: ['c12_hin_al_cbse_02_007', 'c12_hin_al_cbse_02_008', 'c12_hin_al_cbse_02_009', 'c12_hin_al_cbse_02_010', 'c12_hin_al_cbse_02_011', 'c12_hin_al_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi memoir reader', intro: 'A writer returns to his mother\'s wheel — where pots were shaped and so was he.', goal: 'Read Fulchand ki Ekawah as an autobiographical sketch — where genre turns memory into art.' },
    discovery: {
        question: 'Ashk remembers his potter mother shaping clay at dawn — one bowl, one breath, one life. Why does a short \'sketch\' hit harder than a full autobiography?',
        options: ['Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it', 'It\'s shorter, so easier', 'Autobiographies are boring', 'Sketches are more factual'],
        answer: 'Selection and shaping — an आत्मकथात्मक रेखाचित्र distils one memory with artistic unity, where a chronological life-record would dilute it',
        hook: 'Don\'t read it as a diary — it\'s craft: the potter\'s wheel, the mother\'s hands, the smell of wet earth chosen to carry loss and a vanishing craft. Genre is the message; biography alone is just a record.',
    },
    teaching: [
        { title: 'बस्किोहर की माटी — गौण विषय', text: '\'फणीश्वरनाथ रेणु की\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_al_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Step into the potter\'s village at first light: weigh how genre shapes memory, trace the mother-child bond through small acts, and read the wheel as a disappearing world.',
        labels: ['बस्किोहर की माटी —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_007', title: 'बस्किोहर की माटी — गौण विषय',
          caseStudy: { intro: '\'फणीश्वरनाथ रेणु की\' में फणीश्वरनाथ-रेणु-की जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the defining characteristic of a secondary theme in a literary work?', options: [
                { text: 'A secondary theme is a recurring idea that supports or contrasts with the primary theme,', outcome: 'A secondary theme is a recurring idea that supports or contrasts with the primary theme, explored.' },
                { text: 'any topic mentioned in the story', outcome: 'Not quite — Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the.', reveals: 'students-often-treat-secondary-theme' },
                { text: 'The village pond symbolizes the cyclical nature of rural life', outcome: 'Not quite — Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the.', reveals: 'students-often-treat-secondary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_009', title: 'बस्किोहर की माटी — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'फणीश्वरनाथ रेणु की\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony in your own words and give one example from "फणीक की याद" where the outcome contradicts the character\'s.', options: [
                { text: 'Situational irony occurs when actions produce an outcome opposite to what was intended or', outcome: 'Situational irony occurs when actions produce an outcome opposite to what was intended or expected.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often confuse symbolism with metaphor, treating every descriptive detail as a symbol.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re editing a college-magazine memoir about the writer\'s grandmother in a potters\' village. The draft is a flat factual list — born here, made pots, died there — and the writer insists \'it\'s autobiographical, so it must record everything exactly.\'',
            decisions: [{ prompt: 'What does the रेखाचित्र (sketch) genre of Ashk\'s \'फुलचंद की एकवह\' teach the edit?', options: [
                { text: 'Cut and shape — a रेखाचित्र selects one memory or figure and artistically intensifies it; the bond lives in sensory details like dawn on the potter\'s wheel and small acts of care, not in a complete chronology of facts.', outcome: 'The genre\'s power is selectivity: an autobiographical sketch is life transformed into art through emphasis, so \'record everything\' produces a register, not a remembrance.' },
                { text: 'Leave it — autobiography\'s contract with the reader is factual completeness, so selection would be dishonest.', outcome: 'That confuses the sketch with the full autobiography or a diary; the रेखाचित्र makes no such contract — its truth is thematic unity, and completeness is the wrong measure for it.', reveals: 'memoir-means-complete-facts' },
                { text: 'Improve it by adding the author\'s biography — more background facts will supply the missing depth.', outcome: 'That\'s the \'life equals text\' fallacy: the emotional force comes from craft — imagery and shaped memory — not from appending more verified biography.', reveals: 'biography-adds-depth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_al_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a sketch as deliberate art — one memory holding an entire childhood, a mother and a craft on the wheel.',
            decisions: [{ prompt: 'What comes next? बस्किोहर की माटी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — बस्किोहर की माटी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_007', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review the "Theme Statement Template" from c11_hin_ar_cbse_01_007 and practice.',
          misconception: 'Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the storm") and write.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain how a secondary theme differs from the primary theme in "फाल्गुन की एक घटना."', answer: 'The primary theme is the author\'s overarching reflection on childhood and the',
                  options: ['The primary theme is the author\'s overarching reflection on childhood and the', 'mother', 'nature'],
                  hint: 'If stuck, review the "Theme Statement Template" from c11_hin_ar_cbse_01_007 and practice on.',
                  misconception: 'Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the storm") and write a paragraph describing.' },
                { id: 'b', prompt: 'The passage describing the village fair (मेलों के दिन) includes sensory details of crowds, sweets, and the mother\'s anxiety.', answer: 'Secondary theme: "Communal rituals bind rural society but also expose its',
                  options: ['Secondary theme: "Communal rituals bind rural society but also expose its', 'the fair is fun'],
                  hint: 'If stuck, review the "Theme Statement Template" from c11_hin_ar_cbse_01_007 and practice on.',
                  misconception: 'Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the storm") and write a paragraph describing.' }
          ],
            remediations: { 'students-often-treat-secondary-theme': { steps: ['Revisit node c12_hin_al_cbse_02_006 (Primary Theme) and practice converting three topics from that node into thematic.', 'With the teacher, co-construct a thematic statement for "the mother\'s lullaby" in this chapter.', 'Re-attempt Diagnostic Question 3 using the new template.', 'If still stuck, review Class 11 node c11_hin_ar_cbse_01_007 (Theme: Secondary Themes) for the foundational method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the storm") and write.',
          parts: [
                { id: 'a', prompt: 'Which secondary theme in the story do you consider most significant for a modern reader? Justify with two reasons rooted in the text.', answer: 'The theme "tradition vs',
                  options: ['The theme "tradition vs', 'I like nature'],
                  hint: 'If stuck, review the "Theme Statement Template" from c11_hin_ar_cbse_01_007 and practice on.',
                  misconception: 'Students often treat "secondary theme" as "any minor topic" (e.g., "the pond," "the fair," "the storm") and write a paragraph describing.' }
          ],
            remediations: { 'students-often-treat-secondary-theme': { steps: ['Revisit node c12_hin_al_cbse_02_006 (Primary Theme) and practice converting three topics from that node into thematic.', 'With the teacher, co-construct a thematic statement for "the mother\'s lullaby" in this chapter.', 'Re-attempt Diagnostic Question 3 using the new template.', 'If still stuck, review Class 11 node c11_hin_ar_cbse_01_007 (Theme: Secondary Themes) for the foundational method.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_008', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ से बिंब और रूपक के उदाहरणों को दोबारा देखिए, जैसे.',
          misconception: 'छात्र अक्सर बिंब और रूपक को एक ही मान लेते हैं और किसी भी तुलनात्मक भाषा को रूपक कहते हैं, जैसे "उसकी हँसी फूलों जैसी".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' में बिंब (imagery)',
                  options: ['\'फणीश्वरनाथ रेणु की\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो कक्षा 11 के किसी भी पाठ से बिंब और रूपक के उदाहरणों को दोबारा देखिए, जैसे.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को एक ही मान लेते हैं और किसी भी तुलनात्मक भाषा को रूपक कहते हैं, जैसे "उसकी हँसी फूलों जैसी" को केवल रूपक मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले पाठ से दो वाक्य दीजिए: एक में स्पष्ट तुलना ("जैसे") और एक में प्रतीकात्मक उपयोग ("माटी की खुशबू")।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_009', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If unsure about the narrator\'s two voices, re-read the opening paragraph (p.',
          misconception: 'Students often confuse symbolism with metaphor, treating every descriptive detail as a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' में विरोधाभास',
                  options: ['\'फणीश्वरनाथ रेणु की\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If unsure about the narrator\'s two voices, re-read the opening paragraph (p.',
                  misconception: 'Students often confuse symbolism with metaphor, treating every descriptive detail as a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Re-read the butterfly passage (pp.', '17-18) and the mother\'s milk reflection (p.', '15) with a highlighter: mark every adjective the adult narrator uses to describe the child\'s perception vs.', 'his current understanding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_010', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on contextual meaning: re-read the **paragraph before and after** the target.',
          misconception: '**विशिष्ट भ्रांति:** "पदावली का अर्थ है कठिन शब्दों की सूची बनाकर उनके शब्दकोशीय अर्थ रट लेना।" **वास्तविकता:** इस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' की पदावली',
                  options: ['\'फणीश्वरनाथ रेणु की\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on contextual meaning: re-read the **paragraph before and after** the target word — 90%.',
                  misconception: '**विशिष्ट भ्रांति:** "पदावली का अर्थ है कठिन शब्दों की सूची बनाकर उनके शब्दकोशीय अर्थ रट लेना।" **वास्तविकता:** इस अध्याय में 70% प्रमुख.' }
          ],
            remediations: { '70': { steps: ['**पुनः पाठ पढ़ें** केवल "शब्द-शिकारी" की तरह: हर वाक्य में 1 ऐसा शब्द छाँटें जिसका अर्थ आप *संदेह* के साथ जानते हों। 2.', '**तीन-स्तरीय तालिका बनाएँ** (शब्द | शाब्दिक अर्थ | पाठ में लाक्षणिक अर्थ | व्यंजक अर्थ) — कम से कम 10 शब्दों के लिए। 3.', '**पीयर-टेस्ट:** किसी सहपाठी को अपना शब्द दें, उससे पूछें "इस शब्द से तुझे क्या *महसूस* होता है पाठ पढ़कर?" — यदि वह.', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_4 फिर से हल करें — इस बार 3 के बजाय 5 प्रसंग दीजिए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_011', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'Review Class 11 Hindi Grammar node c11_hin_ar_cbse_01_011 sections on "krdant formation".',
          misconception: 'Students treat dialect words (dey, oqQeqn, ¯l?kkM+k, cjgk, lqcqduk) as "vocabulary to memorize" rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' में भाषा-प्रयोग',
                  options: ['\'फणीश्वरनाथ रेणु की\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review Class 11 Hindi Grammar node c11_hin_ar_cbse_01_011 sections on "krdant formation" and.',
                  misconception: 'Students treat dialect words (dey, oqQeqn, ¯l?kkM+k, cjgk, lqcqduk) as "vocabulary to memorize" rather than **grammatical evidence of.' }
          ],
            remediations: { 'students-treat-dialect-words-dey': { steps: ['Revisit c11_hin_ar_cbse_01_011 (Class 11 Grammar: Language Usage) — specifically the section on **krdant formations**.', 'Take the first paragraph of "fcLdksgj dh ekVh" and highlight every word ending in "-k", "-n", "-Vh", "-Z" — classify.', 'For each, write the standard Hindi equivalent and the grammatical rule that derives the dialect form.', 'Re-attempt DIAGNOSTIC_QUESTION_1 and DIAGNOSTIC_QUESTION_5. If still stuck, review c12_hin_al_cbse_02_010 (Vocabulary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_al_cbse_02_012', difficulty: 'standard',
          question: '\'फणीश्वरनाथ रेणु की\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि प्रसंग पहचानने में अटके → c12_hin_al_cbse_02_002 (कथानक) और c12_hin_al_cbse_02_003.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आशय-सूचक\' प्रश्न का अर्थ है — **पाठ की पंक्तियों का हिंदी अनुवाद/सारांश** लिख.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फणीश्वरनाथ रेणु की\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'फणीश्वरनाथ रेणु की\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फणीश्वरनाथ रेणु की\' का कथानक', '\'फणीश्वरनाथ रेणु की\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि प्रसंग पहचानने में अटके → c12_hin_al_cbse_02_002 (कथानक) और c12_hin_al_cbse_02_003 (परिवेश).',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'आशय-सूचक\' प्रश्न का अर्थ है — **पाठ की पंक्तियों का हिंदी अनुवाद/सारांश** लिख देना। वास्तव में.' }
          ],
            remediations: { 'cbse-2023-24-independent-interpretation': { steps: ['**निदान**: छात्र से कहें — "पाठ का कोई एक पैराग्राफ पढ़कर **एक वाक्य में उसका आशय** बताओ, पाठ के शब्द न दोहराओ।" यदि वह.', '**मॉडलिंग**: शिक्षक उसी पैरा का PEEL उत्तर **बोलकर** दिखाए — Point, Evidence, Explanation, Link चरण अलग-अलग बोलें। 3.', '**अभ्यास**: छात्र को 3 अलग प्रसंग दें; प्रत्येक पर **केवल Point लिखने** को कहें (पहला चरण)। फिर Evidence जोड़ें। फिर.', '**पुनः निदान**: अगले कक्षा में अनदेखा अंश देकर वही प्रक्रिया दोहराएँ — समय सीमा 5 मिनट।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
