import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch05_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch05_p2',
    title: 'पाठ 5 · Part 2/3',
    subtitle: 'See a modern institution carrying an old hierarchy in its walls.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 5 · Part 2/3',
    chapters: ['c11_hin_ar_ch05'],
    nodeIds: ['c11_hin_ar_cbse_05_007', 'c11_hin_ar_cbse_05_008', 'c11_hin_ar_cbse_05_009', 'c11_hin_ar_cbse_05_010', 'c11_hin_ar_cbse_05_011', 'c11_hin_ar_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader testing a cantonment\'s promise of equality', intro: 'A new nation, a cantonment town, an old ladder of caste — the story asks who the new order is really for.', goal: 'Analyse caste and education in a post-independence cantonment setting through Nayi Kahani realism.' },
    discovery: {
        question: 'Post-1947 India promised a modern, equal cantonment — did the new order actually erase caste?',
        options: ['No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity', 'Yes — the army\'s discipline abolished caste overnight', 'Yes — independence legally ended all discrimination', 'No — because cantonments don\'t exist anymore'],
        answer: 'No — the cantonment\'s modern surface hides intact caste hierarchy, and education becomes the contested route to dignity',
        hook: 'Nayi Kahani\'s rule: no heroes, no easy rescue — just middle-class realism where dignity must be fought for inside an unequal system.',
    },
    teaching: [
        { title: 'पाठ 5 — गौण विषय', text: '\'आरोह भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map the cantonment\'s social structure, trace how education collides with caste, and argue whether the story\'s resolution is hope or realism.',
        labels: ['पाठ 5 — गौण', 'पाठ 5 — साहित्यिक', 'पाठ 5 — पदावली', 'पाठ 5 — व्याकरण', 'पाठ 5 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_008', title: 'पाठ 5 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 5\' में बिंब ढूँढिए — आरोह-भाग-1-—-पाठ-5 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from daily life (not from the textbook).', options: [
                { text: 'Imagery is language that creates sensory impressions (e.g., "the sizzle of frying', outcome: 'Imagery is language that creates sensory impressions (e.g., "the sizzle of frying pakoras" appeals.' },
                { text: 'visual description', outcome: 'Not quite — Students often think imagery is only "visual description" and metaphor is only "poetic decoration".', reveals: 'imagery-is-only-visual-description' },
                { text: 'poetic decoration', outcome: 'Not quite — Students often think imagery is only "visual description" and metaphor is only "poetic decoration".', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_011', title: 'पाठ 5 — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 5\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the grammatical term for the word formation process seen in "dkV&Nk¡Vdj" (page 56) and "fdukjs mx" (page 56) where two verbs.', options: [
                { text: 'The term is **compound verb (saMyukta kriya / dvikriyaka)** – specifically a', outcome: 'The term is **compound verb (saMyukta kriya / dvikriyaka)** – specifically a **conjunctive.' },
                { text: 'samasa', outcome: 'Not quite — Students believe "grammar in text" means merely **labeling parts of speech** (noun, verb, tense).', reveals: 'grammar-in-text-means-merely' },
                { text: 'kriya visheshan', outcome: 'Not quite — Students believe "grammar in text" means merely **labeling parts of speech** (noun, verb, tense).', reveals: 'grammar-in-text-means-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class debates a story set in an army cantonment where a Dalit boy\'s education is his only escape. One student calls it \'a sad tale about one cruel officer and a lucky boy — the quarters, the school, the floods are just background.\'',
            decisions: [{ prompt: 'What\'s missing from that reading?', options: [
                { text: 'Reframe through context and structure: Shukla/Shivprasad Singh write in the Nayi Kahani mode — the cantonment is a designed microcosm where quarters are allotted by rank and caste and the school is the only porous boundary, so institutions, not one villain, reproduce caste. And the elliptical structure — childhood, flood, clerkship with years skipped — enacts how change for a lower-caste life isn\'t a smooth climb but rare visible breakthroughs between invisible struggle.', outcome: 'The debate shifts from pity to analysis: \'Low Quarter vs Officer Quarter\' reads as structural evidence, and the gaps in time become the argument.' },
                { text: 'Keep the individual-villain reading — the story works as a warning about cruel officers.', outcome: 'Personalising it hides the target: the story dissects how school, army and family as systems reproduce caste — replacing one officer changes nothing.', reveals: 'caste-is-one-bad-officer' },
                { text: 'Fill in the missing years in your summary — schooling and job-hunting must have happened, so narrate them.', outcome: 'The ellipsis is deliberate: making struggle invisible between breakthroughs is how the structure mirrors the theme — summarising the gaps erases the design.', reveals: 'gaps-are-just-missing-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'The story refuses both cynicism and fantasy — dignity is possible, but only through struggle the system makes necessary.',
            decisions: [{ prompt: 'What comes next? पाठ 5 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 5 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_007', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_05_006 (मुख्य विषय और संदेश) पर वापस जाएँ और.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'दूसरे दर्जे का विषय\' (secondary importance) है, इसलिए वे परीक्षा में इसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो c11_hin_ar_cbse_05_006 (मुख्य विषय और संदेश) पर वापस जाएँ और मुख्य विषय के.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय\' का अर्थ \'दूसरे दर्जे का विषय\' (secondary importance) है, इसलिए वे परीक्षा में इसे नजरअंदाज करते हैं। वास्तविक.' }
          ],
            remediations: { 'secondary-importance': { steps: ['चरण 1: छात्र से कहें — "पाठ के किसी एक पृष्ठ को खोलें और केवल उन वाक्यों को रेखांकित करें जो मुख्य पात्र के मुख्य.', 'लिखकर दिखाएँ।" चरण 3: छात्र के लिखे का मिलान करें — यदि वह कहता है "कहानी समझ में नहीं आएगी" या "गहराई चली जाएगी", तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_008', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review the "Setting and Atmosphere" node (c11_hin_ar_cbse_05_003).',
          misconception: 'Students often think imagery is only "visual description" and metaphor is only "poetic decoration".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review the "Setting and Atmosphere" node (c11_hin_ar_cbse_05_003) to re-परिचितize with.',
                  misconception: 'Students often think imagery is only "visual description" and metaphor is only "poetic decoration".' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['Have the student close their eyes and describe their kitchen at breakfast using all five senses; then map each sense.', 'Give them two columns: "Literal statement" and "Metaphorical implication".', 'Practice converting "Eksgu is poor" into metaphorical images from the text.', 'Use a think-aloud: read a paragraph aloud, pausing at each sensory word, and ask "What does this make me feel?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think imagery is only "visual description" and metaphor is only "poetic decoration".',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the metaphor "eksgu dh vk¡[kksa esa ,d ltZd dh ped Fkh" (a lamp\'s flame in Eksgu\'s eyes) in conveying her resilience versus her.', answer: 'The metaphor is effective',
                  options: ['The metaphor is effective', 'just a description of shiny eyes', 'visual description', 'poetic decoration'],
                  hint: 'If stuck, review the "Setting and Atmosphere" node (c11_hin_ar_cbse_05_003) to re-परिचितize with.',
                  misconception: 'Students often think imagery is only "visual description" and metaphor is only "poetic decoration".' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['Have the student close their eyes and describe their kitchen at breakfast using all five senses; then map each sense.', 'Give them two columns: "Literal statement" and "Metaphorical implication".', 'Practice converting "Eksgu is poor" into metaphorical images from the text.', 'Use a think-aloud: read a paragraph aloud, pausing at each sensory word, and ask "What does this make me feel?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_009', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, re-read the Imagery and Metaphor node (c11_hin_ar_cbse_05_008) and the Theme.',
          misconception: 'Students often treat every unfortunate event as \'irony\' and every object mentioned as a \'symbol\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, re-read the Imagery and Metaphor node (c11_hin_ar_cbse_05_008) and the Theme: Primary.',
                  misconception: 'Students often treat every unfortunate event as \'irony\' and every object mentioned as a \'symbol\'.' }
          ],
            remediations: { 'students-often-treat-every-unfortunate': { steps: ['Give the student a two-column table — Column A: \'Event/Object\', Column B: \'Device Type + Reason\'.', 'Provide 5 clear examples from the text (e.g., Thakur\'s promise, Eksgu\'s death, laVh, fugkbZ, rsjg song).', 'Ask the student to fill Column B using the definitions: irony = expectation vs reality; symbol = concrete → abstract.', 'Discuss each filled row, correcting mislabels by pointing to the specific textual gap (for irony) or the abstract idea.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_010', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (नोड 006)** और **\'पात्र-चित्रण: नायक\' (नोड 004)**.',
          misconception: '**विशिष्ट भ्रांति:** *"मुख्य शब्द वही हैं जो पाठ में \'कठिन\' या \'अनजान\' लगते हैं।"* **गलत तर्क:** छात्र **शब्द की जटिलता.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **\'मुख्य विषय और संदेश\' (नोड 006)** और **\'पात्र-चित्रण: नायक\' (नोड 004)** दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** *"मुख्य शब्द वही हैं जो पाठ में \'कठिन\' या \'अनजान\' लगते हैं।"* **गलत तर्क:** छात्र **शब्द की जटिलता (difficulty)** को.' }
          ],
            remediations: { 'difficulty-significance': { steps: ['**पाठ के 3 अनुच्छेद** चुनकर छात्र से कहें: *"हर अनुच्छेद से **एक शब्द** उठाओ जो अगर हटा दिया जाए तो उस अनुच्छेद का.', 'फिर उन 3 शब्दों को **पाठ के शीर्षक/मुख्य विषय** से जोड़ने को कहें — *"ये शब्द शीर्षक को कैसे सिद्ध करते हैं?"* 3.', 'अब **शब्द-आवृत्ति सारणी** बनवाएँ: पाठ के 10 सबसे अधिक आए शब्द गिनें, फिर पूछें — *"इनमें से कौन से 3 शब्द पाठ की.', 'अंत में: **बोर्ड प्रश्न पैटर्न** दिखाएँ — *"देखो, यही पूछा जाता है: \'मुख्य शब्द चुनकर प्रसंगिक अर्थ लिखो\' — अब तुम.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_011', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'If stuck, review **Class 10 Hindi B Vyakaran: Kriya (Verb) – finite vs.',
          misconception: 'Students believe "grammar in text" means merely **labeling parts of speech** (noun, verb, tense) in isolated sentences.',
          parts: [
                { id: 'a', prompt: 'Identify the grammatical term for the word formation process seen in "dkV&Nk¡Vdj" (page 56) and "fdukjs mx" (page 56) where two verbs combine to express.', answer: 'The term is **compound verb (saMyukta kriya / dvikriyaka)** – specifically a',
                  options: ['The term is **compound verb (saMyukta kriya / dvikriyaka)** – specifically a', 'samasa', 'kriya visheshan', 'grammar in text'],
                  hint: 'If stuck, review **Class 10 Hindi B Vyakaran: Kriya (Verb) – finite vs.',
                  misconception: 'Students believe "grammar in text" means merely **labeling parts of speech** (noun, verb, tense) in isolated sentences.' },
                { id: 'b', prompt: 'Convert the following direct speech from page 66 into correct indirect speech (loZuke), making all necessary changes to pronouns, tense, and reporting verb.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'firk us eksgu dks FkksM+k ngh yk ns ck”kkj ls yksdjA', '(imperative) or failing to add', 'grammar in text'],
                  hint: 'If stuck, review **Class 10 Hindi B Vyakaran: Kriya (Verb) – finite vs.',
                  misconception: 'Students believe "grammar in text" means merely **labeling parts of speech** (noun, verb, tense) in isolated sentences.' }
          ],
            remediations: { 'grammar-in-text-means-merely': { steps: ['**Isolate the pattern**: Give the student only the four imperative sentences (page 66).', 'Have them convert each to indirect speech using a 3-column table: Direct | Reporting Verb Change | Indirect Result.', 'Drill the pronoun/tense shifts until automatic.', '**Morphology bootcamp**: Provide 10 words from the text with suffixes (-u, -pan, -hat, -ai).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_05_012', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_05_002 (कथानक)** और **c11_hin_ar_cbse_05_006 (मुख्य विषय)**.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **आशय-सूचक प्रश्नों का उत्तर "अपने शब्दों में" लिखने का अर्थ है — पाठ से प्रमाण न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 5\' का कथानक — \'आरोह भाग-1 — पाठ 5\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_05_002 (कथानक)** और **c11_hin_ar_cbse_05_006 (मुख्य विषय)** दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **आशय-सूचक प्रश्नों का उत्तर "अपने शब्दों में" लिखने का अर्थ है — पाठ से प्रमाण न देना**। वे लिखते.' }
          ],
            remediations: { '10': { steps: ['**चरण 1**: छात्र को एक छोटा पाठांश दें और पूछें: "यहाँ लेखक क्या कहना चाहता है?" — जब वह उत्तर दे, तो तुरंत पूछें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
