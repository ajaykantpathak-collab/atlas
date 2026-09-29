import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch15_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch15_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch15_p2',
    title: 'पाठ 15 · Part 2/3',
    subtitle: 'Watch a poem dismantle your definitions before it offers its own.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 15 · Part 2/3',
    chapters: ['c11_hin_ar_ch15'],
    nodeIds: ['c11_hin_ar_cbse_15_007', 'c11_hin_ar_cbse_15_008', 'c11_hin_ar_cbse_15_009', 'c11_hin_ar_cbse_15_010', 'c11_hin_ar_cbse_15_011', 'c11_hin_ar_cbse_15_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a hill journalist naming the cruelty inside ordinary leaving', intro: 'Men leave Garhwal for Delhi\'s scaffolds and it barely counts as news — the poem asks what \'small\' and \'cruel\' really mean.', goal: 'Analyse the negative-then-positive argumentative structure and the poem\'s migrant-labour context.' },
    discovery: {
        question: 'The poem opens by listing what cruelty is NOT — three whole stanzas of negatives. Cut them and lose nothing?',
        options: ['No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle', 'Yes — a poem should state its thesis upfront', 'Yes — negative definitions are logically empty', 'No — but only because the poem would be too short'],
        answer: 'No — the demolition of easy answers is what makes the positive definition land: cruelty as dignity\'s slow death in daily struggle',
        hook: 'The refrain flips at the fourth stanza — \'not this\' becomes \'this is the most dangerous\' — and the imagery turns from home\'s warmth to a worker\'s weary feet.',
    },
    teaching: [
        { title: 'पाठ 15 — गौण विषय', text: '\'लघुता सबसे छोटी नहीं होती\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_15_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Find the stanza where negation flips to assertion, then weigh the title\'s provocation — \'the smallest is not the smallest\' — against 1980s hill migration.',
        labels: ['पाठ 15 — गौण', 'पाठ 15 — साहित्यिक', 'पाठ 15 — पदावली', 'पाठ 15 — व्याकरण', 'पाठ 15 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_009', title: 'पाठ 15 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'लघुता सबसे छोटी नहीं होती\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'In the poem "lcls [krjukd", the phrase "lcls [krjukd ugha gksrk" (is not the most cruel) is repeated multiple times.', options: [
                { text: 'The repetition creates structural irony by establishing a pattern of negation: each time', outcome: 'The repetition creates structural irony by establishing a pattern of negation: each time the poet.' },
                { text: 'it emphasizes the point', outcome: 'Not quite — Students often confuse the poem\'s irony with simple contrast ("the poet says war is not cruel").', reveals: 'students-often-confuse-the-poem' },
                { text: 'the poet says war is not cruel', outcome: 'Not quite — Students often confuse the poem\'s irony with simple contrast ("the poet says war is not cruel").', reveals: 'students-often-confuse-the-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_010', title: 'पाठ 15 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'लघुता सबसे छोटी नहीं होती\' के मुख्य शब्द: लघुता-सबसे-छोटी-नहीं-होती — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define "contextual meaning" of a word in a poem and give one example from "सबसे कठिन" where the contextual meaning sharply diverges from.', options: [
                { text: 'Contextual meaning is the specific semantic and emotional value a word acquires from its', outcome: 'Contextual meaning is the specific semantic and emotional value a word acquires from its.' },
                { text: 'रम्य means beautiful', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a kavi sammelan themed on migration, someone offers \'Laguta Sabse Chhoti Nahin Hoti\' but introduces it as \'a gentle poem about how small people also matter — mothers\' love, fathers\' laps, childhood warmth.\'',
            decisions: [{ prompt: 'What is the poem actually arguing, and how is it built?', options: [
                { text: 'Read the title as provocation from a people\'s-advocate journalist of Tehri Garhwal who watched villages empty as men left for Delhi\'s construction sites: \'smallness\' is redefined as the erosion of dignity when survival fractures belonging. Structurally it argues by elimination — the first stanzas keep saying what cruelty is NOT before the positives arrive, climaxing in the weary worker\'s feet — dignity dying slowly in everyday struggle.', outcome: 'The introduction is corrected: it\'s not a warm affirmation of small lives but a reckoning with what migration does to human worth — built like a debate, not a lullaby.' },
                { text: 'Keep the gentle reading — the poem lists tender images of family, so it\'s about the dignity of simple lives.', outcome: 'The early stanzas are negatives — what cruelty is NOT — positioned to be stripped away; reading them as the thesis stops before the poem\'s real answer.', reveals: 'poem-is-gentle-affirmation' },
                { text: 'Present it as having no real structure — it\'s a mood piece on poverty, not an argument.', outcome: 'The argumentative architecture is precise: sequenced denials, a refrain as hinge, and a final image as verdict — structure performs the elimination.', reveals: 'poem-has-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_15_012', title: 'The bigger picture',
          caseStudy: { intro: 'Written by a journalist who watched Tehri\'s villages empty to Delhi\'s construction sites — \'small\' was never about size; it\'s about what we\'re trained not to see.',
            decisions: [{ prompt: 'What comes next? पाठ 15 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 15 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_007', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक.',
          hint: 'Review the primary theme analysis (node 006) focusing on how the poet defines "smallest".',
          misconception: 'Students commonly believe secondary themes are simply "less important themes" or "sub-themes" that can be listed like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' के गौण विषय',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review the primary theme analysis (node 006) focusing on how the poet defines "smallest" through.',
                  misconception: 'Students commonly believe secondary themes are simply "less important themes" or "sub-themes" that can be listed like topics (loneliness.' }
          ],
            remediations: { 'students-commonly-believe-secondary-themes': { steps: ['If a student cannot move beyond labeling, guide them through this sequence: (1) Pick ONE image from the poem (e.g., the.', '(2) Ask: "What does this window SEE?', 'What does it FAIL to hold?" (3) Connect each answer to a specific line.', '(4) Ask: "So what argument about urban life is the window making?" (5) Generalize: "This is how the theme of alienation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students commonly believe secondary themes are simply "less important themes" or "sub-themes" that can be listed like.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of mortality in \'lcls [krjukd\' is not about death as an event but about death as a daily condition." Support your.', answer: 'The claim is accurate',
                  options: ['The claim is accurate', 'lcls [krjukd og xhr gksrk gS / vkiosQ dkuksa rd igq¡pus osQ fy'],
                  hint: 'Review the primary theme analysis (node 006) focusing on how the poet defines "smallest" through.',
                  misconception: 'Students commonly believe secondary themes are simply "less important themes" or "sub-themes" that can be listed like topics (loneliness.' }
          ],
            remediations: { 'students-commonly-believe-secondary-themes': { steps: ['If a student cannot move beyond labeling, guide them through this sequence: (1) Pick ONE image from the poem (e.g., the.', '(2) Ask: "What does this window SEE?', 'What does it FAIL to hold?" (3) Connect each answer to a specific line.', '(4) Ask: "So what argument about urban life is the window making?" (5) Generalize: "This is how the theme of alienation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_008', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके: **उपमा और रूपक के १०-१० उदाहरण** लिखकर उनके **विधानिक अंतर** (जैसे/सा की.',
          misconception: '**विशिष्ट भ्रम:** छात्र **हर अंतर्निहित तुलना को रूपक मान लेते हैं** — जैसे "वह शेर दिल का है" (यह रूपक है), लेकिन "वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' में बिंब (imagery)',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **उपमा और रूपक के १०-१० उदाहरण** लिखकर उनके **विधानिक अंतर** (जैसे/सा की.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **हर अंतर्निहित तुलना को रूपक मान लेते हैं** — जैसे "वह शेर दिल का है" (यह रूपक है), लेकिन "वह शेर *जैसा* बहादुर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण १:** छात्र को ५ वाक्य दें — २ उपमा, २ रूपक, १ केवल बिंब। कहें: "हर वाक्य में \'जैसे/सा/सम\' ढूँढ़ो। जहाँ न हो, वहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_009', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती.',
          hint: 'Review the "Symbol vs. Metaphor" table in node 008 and re-read the poem marking only the.',
          misconception: 'Students often confuse the poem\'s irony with simple contrast ("the poet says war is not cruel") or treat the symbols.',
          parts: [
                { id: 'a', prompt: 'The poem lists "esgur dh ywV" (beauty of youth), "iqfyl dh ekj" (mother\'s love), and "xíkjh&yksHk dh eq_h" (soldier\'s sacrifice) as things that are NOT the.', answer: 'By including cherished values',
                  options: ['By including cherished values', 'the poet is saying these good things are also cruel', 'the poet says war is not cruel', 'thorn = pain'],
                  hint: 'Review the "Symbol vs. Metaphor" table in node 008 and re-read the poem marking only the refrain.',
                  misconception: 'Students often confuse the poem\'s irony with simple contrast ("the poet says war is not cruel") or treat the symbols as static metaphors.' },
                { id: 'b', prompt: 'Compare the symbolic progression from "?kM+h" (thorn) → "pk¡n" (wound) → "xhr" (poison) → "jkr" (burning) → "fn\'kk" (darkness).', answer: 'The sequence maps the internalization of oppression: a thorn pricks from outside',
                  options: ['The sequence maps the internalization of oppression: a thorn pricks from outside', 'the poet says war is not cruel', 'thorn = pain'],
                  hint: 'Review the "Symbol vs. Metaphor" table in node 008 and re-read the poem marking only the refrain.',
                  misconception: 'Students often confuse the poem\'s irony with simple contrast ("the poet says war is not cruel") or treat the symbols as static metaphors.' }
          ],
            remediations: { 'students-often-confuse-the-poem': { steps: ['Have the student physically number the stanzas 1–5 and mark every occurrence of "lcls [krjukd ugha gksrk" with.', 'Ask: "What changes between the first time you see this phrase and the last time?" Guide them to see that the *meaning*.', 'Draw the symbolic chain on paper: thorn → wound → poison → fire → darkness.', 'Ask: "If you remove \'poison\', does \'fire\' still make sense?" This forces recognition of causal linkage.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_010', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की.',
          hint: 'Review "tenor-vehicle-ground" framework for metaphor analysis from c11_hin_ar_cbse_15_008.',
          misconception: 'Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding sentences." They.',
          parts: [
                { id: 'a', prompt: 'The poem repeats "सबसे कठिन नहीं" (not the most difficult) four times before revealing what *is* most difficult.', answer: 'The anaphoric repetition creates a semantic funnel: each negation strips away a',
                  options: ['The anaphoric repetition creates a semantic funnel: each negation strips away a', 'no longer denotes', 'impossible to endure without fragmentation of self', 'it emphasizes the word'],
                  hint: 'Review "tenor-vehicle-ground" framework for metaphor analysis from c11_hin_ar_cbse_15_008 and.',
                  misconception: 'Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding sentences." They treat context as.' },
                { id: 'b', prompt: 'Compare the contextual meanings of "ओझल" (vanishing) in "ओझल होती आँखें" (vanishing eyes) and "व्योम" (sky) in "व्योम तक पहुँचती पुकार" (call reaching the.', answer: '"ओझल" literally means "disappearing from sight"',
                  options: ['"ओझल" literally means "disappearing from sight"', 'vocabulary in context', 'guessing the meaning of hard words from surrounding sentences'],
                  hint: 'Review "tenor-vehicle-ground" framework for metaphor analysis from c11_hin_ar_cbse_15_008 and.',
                  misconception: 'Students believe "vocabulary in context" means "guessing the meaning of hard words from surrounding sentences." They treat context as.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Take ONE word from the poem (e.g., "पछताना" – to regret).', 'Write its dictionary definition.', 'Find its exact line in the poem.', 'List 3 contextual forces acting on it: (a) the verb tense (infinitive as noun), (b) the preceding image ("घर से दूर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_011', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द.',
          hint: 'अगर अटके तो कक्षा 9-10 के \'शब्द-भेद\' और \'वाच्य-परिवर्तन\' के अभ्यास पुनः देखें, विशेषकर.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है पाठ में आए **कठिन शब्दों के अर्थ लिखना** या **संधि-समास-विग्रह करना**। वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' में भाषा-प्रयोग',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर अटके तो कक्षा 9-10 के \'शब्द-भेद\' और \'वाच्य-परिवर्तन\' के अभ्यास पुनः देखें, विशेषकर तत्सम-तद्भव.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ है पाठ में आए **कठिन शब्दों के अर्थ लिखना** या **संधि-समास-विग्रह करना**। वे यह नहीं देख पाते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के **एक ही भाव** (जैसे \'क्रोध\') के लिए प्रयुक्त **3-4 अलग शब्द** (जैसे: क्रोध, रोष, कोप, गुस्सा, खून.', 'हर शब्द के लिए पूछो: "यह शब्द यहाँ ही क्यों?', '\'गुस्सा\' यहाँ क्यों नहीं चला?" 3.', 'छात्र से कहो कि वह **अपनी भाषा में** उस शब्द की \'ध्वनि\', \'लंबाई\', \'संस्कृति\' और \'भाव-तीव्रता\' का वर्णन करे — शब्दकोश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_15_012', difficulty: 'standard',
          question: '\'लघुता सबसे छोटी नहीं होती\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र अटका हो तो **पाठ 15 के मुख्य विषय (नोड 006) और साहित्यिक युक्तियाँ (नोड 008.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर लंबा होना चाहिए\'** और **\'वस्तुनिष्ठ प्रश्न का उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लघुता सबसे छोटी नहीं होती\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'लघुता सबसे छोटी नहीं होती\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लघुता सबसे छोटी नहीं होती\' का कथानक', '\'लघुता सबसे छोटी नहीं होती\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र अटका हो तो **पाठ 15 के मुख्य विषय (नोड 006) और साहित्यिक युक्तियाँ (नोड 008, 009)** की.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'आशय-सूचक प्रश्न का उत्तर लंबा होना चाहिए\'** और **\'वस्तुनिष्ठ प्रश्न का उत्तर एक शब्द/वाक्य में.' }
          ],
            remediations: { 'paraphrasing': { steps: ['**पहचान अभ्यास:** छात्र को 10 मिश्रित प्रश्न दें (पाठ 15 के)। उसे केवल **लेबल** करना है: V (वस्तुनिष्ठ) / A (आशय-सूचक)।.', '**साक्ष्य-उद्धरण अभ्यास:** 3 आशय-सूचक प्रश्न दें। छात्र को **उत्तर नहीं लिखना**, केवल **पाठ की वे 2-3 पंक्तियाँ/शब्द.', '**PEEL ढाँचा सिखाएँ:** हर आशय-सूचक उत्तर के लिए: **P**oint (सीधा उत्तर), **E**vidence (पाठ-संदर्भ/उद्धरण).', '**आदर्श उत्तर तुलना:** बोर्ड के मॉडल उत्तर (मार्किंग स्कीम) और छात्र का उत्तर साथ रखें। छात्र से पूछें: "आपके उत्तर में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
