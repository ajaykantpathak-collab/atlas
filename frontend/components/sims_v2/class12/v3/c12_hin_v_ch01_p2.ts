import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch01_p2: SimDef = {
    id: 'v3_c12_hin_v_ch01_p2',
    title: 'सल्विर वैडिंग · Part 2/3',
    subtitle: 'He built the home that would replace him',
    classLevel: 12, subject: 'hin_v', topic: 'सल्विर वैडिंग · Part 2/3',
    chapters: ['c12_hin_v_ch01'],
    nodeIds: ['c12_hin_v_cbse_01_007', 'c12_hin_v_cbse_01_008', 'c12_hin_v_cbse_01_009', 'c12_hin_v_cbse_01_010', 'c12_hin_v_cbse_01_011', 'c12_hin_v_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Domestic-fiction reader', intro: 'A story where nothing violent happens — except a father funding the place where he\'ll wait to be forgotten.', goal: 'Read Silver Wedding through the joint-to-nuclear transition — \'log kya kahenge\' versus the ethics of old age.' },
    discovery: {
        question: 'An old man builds a retirement home with his own hands — not for himself, but so his children\'s guilt never has to show. Passive victim, or something else?',
        options: ['Agency as sacrifice — he controls the story by choosing the terms of his own irrelevance; the tragedy is that his choices are moral, invisible to a transactional world', 'Passive — things happen to him', 'Cruel manipulation', 'Just retirement planning'],
        answer: 'Agency as sacrifice — he controls the story by choosing the terms of his own irrelevance; the tragedy is that his choices are moral, invisible to a transactional world',
        hook: 'The villain isn\'t poverty — it\'s prosperity: \'log kya kahenge\' replaces love with performance, and the silver wedding of marriage becomes a silver waiting room for the parents. Vanaprastha was chosen withdrawal; the retirement home is bureaucratic deposit — that\'s the modernity critique.',
    },
    teaching: [
        { title: 'सल्विर वैडिंग — गौण विषय', text: '\'वितान भाग-2 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the silver wedding of abandonment: weigh \'log kya kahenge\' as a governing force, separate chosen renunciation from deposited old age, and read the quiet defiance inside \'jo hoga hoga.\'',
        labels: ['सल्विर वैडिंग — गौण', 'सल्विर वैडिंग — साहित्यिक', 'सल्विर वैडिंग — पदावली', 'सल्विर वैडिंग — व्याकरण', 'सल्विर वैडिंग — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_007', title: 'सल्विर वैडिंग — गौण विषय',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 1\' में वितान-भाग-2-—-पाठ-1 जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes a secondary theme from the primary theme in a literary text?', options: [
                { text: 'A secondary theme is a recurring idea that supports, contrasts, or complicates the', outcome: 'A secondary theme is a recurring idea that supports, contrasts, or complicates the primary theme.' },
                { text: 'secondary theme is less important', outcome: 'Not quite — Students believe "secondary theme" means "a theme that appears less often" — so they pick a topic.', reveals: 'secondary-theme-means-a-theme' },
                { text: 'secondary', outcome: 'Not quite — Students believe "secondary theme" means "a theme that appears less often" — so they pick a topic.', reveals: 'secondary-theme-means-a-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Volunteering at an old-age home, you find one resident, Shyam Lal, drifting mid-sentence into stories of his dead friend Phunkun whenever a train whistle sounds. The coordinator wants him \'redirected to the present\' every time.',
            decisions: [{ prompt: 'What does the story\'s dual-timeline structure say about that redirection?', options: [
                { text: 'Don\'t snap the thread — the story shows memory triggered by sound and sight is how he survives the present; the flashbacks aren\'t confusion but the architecture of a self, and dragging him \'back\' severs the only continuity he has.', outcome: 'The chapter\'s point: the non-linear present-past weave enacts memory-as-survival — what remains when everything else fades isn\'t the present but the friendship the present keeps summoning.' },
                { text: 'Support the redirection — dwelling in the past is unhealthy and the present is where he should live.', outcome: 'The story deliberately refuses that framing: the past isn\'t escape from his life, it IS the substance of it — the old-age home is bare precisely because the memories are full.', reveals: 'present-over-memory' },
                { text: 'Let him wander but treat the stories as symptoms of decline to be managed.', outcome: 'The chapter\'s ending is a spiral, not a circle — he returns to the same road and tree irreversibly changed; reading the returns as symptoms misses that each repetition carries accumulated meaning, not deterioration.', reveals: 'memory-is-symptom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a family story as a verdict on prosperity — where the eldest generation builds the very institution that will erase it.',
            decisions: [{ prompt: 'What comes next? सल्विर वैडिंग · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — सल्विर वैडिंग · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_007', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, revisit **c12_hin_v_cbse_01_006 (Primary Theme)** and re-do its Worked Example.',
          misconception: 'Students believe "secondary theme" means "a theme that appears less often" — so they pick a topic mentioned once (e.g.',
          parts: [
                { id: 'a', prompt: 'In the story, the old man\'s friend (fd\'kunk) refuses a government job offer that would secure his pension, saying "tks gqvk gksxk" (whatever happens, will.', answer: 'This illustrates the secondary theme of **dignity through self-reliance vs',
                  options: ['This illustrates the secondary theme of **dignity through self-reliance vs', 'it shows elderly neglect', 'main theme', 'secondary theme'],
                  hint: 'If stuck, revisit **c12_hin_v_cbse_01_006 (Primary Theme)** and re-do its Worked Example 2 — the.',
                  misconception: 'Students believe "secondary theme" means "a theme that appears less often" — so they pick a topic mentioned once (e.g., "the building.' }
          ],
            remediations: { 'secondary-theme-means-a-theme': { steps: ['If a student cannot distinguish secondary themes from random topics: 1.', 'Give them a 3-column table: Column A = Narrative Episode, Column B = What Happens, Column C = What Idea It Represents.', 'Have them fill 5 rows from the text (e.g., friend\'s visit → sits in silence → chosen family).', 'Ask: "Which ideas appear in ≥2 rows?" Those are secondary themes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "secondary theme" means "a theme that appears less often" — so they pick a topic mentioned once (e.g.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The grandson (Hkw"k.k) represents hope for reversing the primary theme of elderly alienation." Use the secondary theme.', answer: 'The statement is **partially false**',
                  options: ['The statement is **partially false**', 'yes/no', 'secondary theme', 'a theme that appears less often'],
                  hint: 'If stuck, revisit **c12_hin_v_cbse_01_006 (Primary Theme)** and re-do its Worked Example 2 — the.',
                  misconception: 'Students believe "secondary theme" means "a theme that appears less often" — so they pick a topic mentioned once (e.g., "the building.' }
          ],
            remediations: { 'secondary-theme-means-a-theme': { steps: ['If a student cannot distinguish secondary themes from random topics: 1.', 'Give them a 3-column table: Column A = Narrative Episode, Column B = What Happens, Column C = What Idea It Represents.', 'Have them fill 5 rows from the text (e.g., friend\'s visit → sits in silence → chosen family).', 'Ask: "Which ideas appear in ≥2 rows?" Those are secondary themes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_008', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'अगर अटके तो कक्षा 11 के नोड c11_hin_v_cbse_01_008 के \'कार्यविधि\' भाग को दोहराएँ जहाँ बिंब.',
          misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **हर तुलना रूपक है** और **हर वर्णन बिंब है**। उदाहरण: "वह शेर की तरह लड़ा".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'वितान भाग-2 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर अटके तो कक्षा 11 के नोड c11_hin_v_cbse_01_008 के \'कार्यविधि\' भाग को दोहराएँ जहाँ बिंब के 5.',
                  misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **हर तुलना रूपक है** और **हर वर्णन बिंब है**। उदाहरण: "वह शेर की तरह लड़ा" — छात्र कहते हैं "रूपक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र को पाठ के 5 वाक्य दें — 2 रूपक, 2 उपमा, 1 साधारण वाक्य। उसे **समासोक शब्द** (\'जैसे\', \'सा\', \'वत्\'.', '**चरण 2**: उसी पाठ से 5 वर्णनात्मक वाक्य दें। छात्र से पूछें: "पढ़ते ही तुम्हारे मन में क्या **सेंसेशन** (संवेदना) जगी.', 'स्वाद आया?" जिस वाक्य से कोई सेंसेशन न जगे → बिंब नहीं। 3.', '**चरण 3**: छात्र स्वयं एक रूपक और एक बिंब लिखे; शिक्षक दोनों की संरचना जाँचे। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_009', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो `c11_hin_v_cbse_01_009` के "कार्यात्मक उदाहरण" खंड को दोबारा पढ़ें और पाठ से.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी परिस्थिति (ironic situation)** या साधारण **विपरीतता (contrast)**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'वितान भाग-2 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो `c11_hin_v_cbse_01_009` के "कार्यात्मक उदाहरण" खंड को दोबारा पढ़ें और पाठ से 2-2 उदाहरण.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास** को **विरोधाभासी परिस्थिति (ironic situation)** या साधारण **विपरीतता (contrast)** मान लेते हैं।.' }
          ],
            remediations: { 'ironic-situation-contrast': { steps: ['**चरण 1:** कक्षा 11 के नोड `c11_hin_v_cbse_01_009` (विरोधाभास और प्रतीक) को दोबारा पढ़ें — विशेषकर **कार्यात्मक परिभाषा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_010', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि फंसे: c11_hin_v_cbse_01_010 (कक्षा 11 पदावली) के "प्रसंगिक अर्थ निकालना" खंड को.',
          misconception: '**विशिष्ट भ्रांति**: "पदावली के प्रश्नों में शब्द का अर्थ लिख देना पर्याप्त है — संदर्भ और महत्त्व की आवश्यकता नहीं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'वितान भाग-2 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे: c11_hin_v_cbse_01_010 (कक्षा 11 पदावली) के "प्रसंगिक अर्थ निकालना" खंड को दोहराएं — वहाँ.',
                  misconception: '**विशिष्ट भ्रांति**: "पदावली के प्रश्नों में शब्द का अर्थ लिख देना पर्याप्त है — संदर्भ और महत्त्व की आवश्यकता नहीं।" **वास्तविकता**: CBSE.' }
          ],
            remediations: { 'cbse-2023-24-2-0': { steps: ['**पुनर्निदान** (Re-diagnostic): छात्र से कहें — "पाठ से 5 अंग्रेजी-हिंदी मिश्रित शब्द छाँटें और प्रत्येक के लिए लिखें.', '**मॉडलिंग**: शिक्षक एक शब्द (जैसे "अरेंजमेंट") लेकर *थिंक-अलाउड* (Think-aloud) करें: "पाठ में लिखा है \'वैडिंग.', 'क्योंकि \'अरेंजमेंट\' कॉरपोरेट/इवेंट मैनेजमेंट की भाषा है, विवाह को प्रोजेक्ट बना देती है, भावनात्मक नहीं, लेन-देन वाली।".', '**अभ्यास**: छात्र को 3 शब्द देकर समान विश्लेषण करवाएँ — पहले मौखिक, फिर लिखित। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_011', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck on verb agreement, review the "Honorific Paradigm Table" in Class 11 Grammar.',
          misconception: 'Students treat honorific pronouns (आप/तुम/तू) as interchangeable "politeness levels" and ignore that verb agreement.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'वितान भाग-2 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck on verb agreement, review the "Honorific Paradigm Table" in Class 11 Grammar node.',
                  misconception: 'Students treat honorific pronouns (आप/तुम/तू) as interchangeable "politeness levels" and ignore that verb agreement *must* match the.' }
          ],
            remediations: { 'students-treat-honorific-pronouns-as': { steps: ['Revisit Class 11 node c11_hin_v_cbse_01_011 (Grammar: Language Usage) — specifically the honorific agreement table.', 'Take three dialogues from the current chapter, underline every pronoun-verb pair, and verify agreement.', 'Write five sentences converting "तुम" to "आप" and "तू" to "तुम", adjusting verbs each time (e.g., "तू जाता है → तुम.', 'Re-attempt Diagnostic Q3 (reported speech conversion) with a checklist: pronoun → verb agreement → aspect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_01_012', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अंश का आशय न पकड़ पाएँ, तो `c12_hin_v_cbse_01_008` (बिंब/रूपक) और.',
          misconception: 'छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर \'अपनी राय\' (opinion) देना होता है — जैसे "मुझे लगता है लेखक कहना चाहता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'वितान भाग-2 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 1\' का कथानक — \'वितान भाग-2 — पाठ 1\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अंश का आशय न पकड़ पाएँ, तो `c12_hin_v_cbse_01_008` (बिंब/रूपक) और `c12_hin_v_cbse_01_009`.',
                  misconception: 'छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर \'अपनी राय\' (opinion) देना होता है — जैसे "मुझे लगता है लेखक कहना चाहता है कि शादी बेकार है।".' }
          ],
            remediations: { 'opinion': { steps: ['छात्र को एक छोटा अंश (4-5 पंक्तियाँ) दें। 2.', 'कहें: "पहले हर वाक्य से एक तथ्य निकालो (वस्तुनिष्ठ)।" 3.', 'फिर कहें: "अब प्रत्येक तथ्य के आगे लिखो — \'लेखक ने यह क्यों लिखा?\' पाठ के शब्दों का हवाला देकर।" 4.', 'अंत में: दोनों को मिलाकर PEEL पैराग्राफ बनाओ। अभ्यास हेतु पूर्ववर्ती नोड `c12_hin_v_cbse_01_011` (व्याकरण: भाषा-प्रयोग).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
