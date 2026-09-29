import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch16_p2: SimDef = {
    id: 'v3_c12_hin_a_ch16_p2',
    title: 'दूसरा देवदास · Part 2/3',
    subtitle: 'The elephant saw everything — from inside the chain',
    classLevel: 12, subject: 'hin_a', topic: 'दूसरा देवदास · Part 2/3',
    chapters: ['c12_hin_a_ch16'],
    nodeIds: ['c12_hin_a_cbse_16_007', 'c12_hin_a_cbse_16_008', 'c12_hin_a_cbse_16_009', 'c12_hin_a_cbse_16_010', 'c12_hin_a_cbse_16_011', 'c12_hin_a_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental-fiction reader', intro: 'A Sanskrit scholar who ran institutions writes the most radical thing — a story where the animal has more presence than the people.', goal: 'Read the story\'s circus as a microcosm of captivity — the elephant\'s chain beside the girl\'s invisibility.' },
    discovery: {
        question: 'A circus elephant in chains, a girl nobody sees — a story that takes the elephant out of the cage and gives it \'a permanent, definite human form.\' Why pair the two silences?',
        options: ['Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged', 'Circuses have both', 'To entertain children', 'Animals are sympathetic'],
        answer: 'Parallel captivity — the elephant\'s chains mirror the girl\'s social invisibility; the circus is a microcosm where freedom\'s fragility is staged',
        hook: 'This is \'navlekhan\' — new writing — where the elephant isn\'t spectacle but witness, granted agency while humans look away. The Sanskrit-scholar author engineers words for emotional precision: the craft is the empathy.',
    },
    teaching: [
        { title: 'दूसरा देवदास — गौण विषय', text: '\'नवलक नसोंनक़ल\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the travelling circus as an anatomy of captivity: weigh the elephant\'s chain against the girl\'s silence, and test how experimental form carries feeling without breaking it.',
        labels: ['दूसरा देवदास — गौण', 'दूसरा देवदास — साहित्यिक', 'दूसरा देवदास — पदावली', 'दूसरा देवदास — व्याकरण', 'दूसरा देवदास — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_007', title: 'दूसरा देवदास — गौण विषय',
          caseStudy: { intro: '\'नवलक नसोंनक़ल\' में नवलक-नसोंनक़ल जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that supports and enriches the primary theme,', outcome: 'A secondary theme is a subordinate idea that supports and enriches the primary theme, adding layers.' },
                { text: 'subplots', outcome: 'Not quite — Students often think secondary themes are just "subplots" or minor events.', reveals: 'secondary-themes-are-just-subplots' },
                { text: 'secondary themes are just "subplots" or minor events', outcome: 'Not quite — Students often think secondary themes are just "subplots" or minor events.', reveals: 'secondary-themes-are-just-subplots' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_008', title: 'दूसरा देवदास — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'नवलक नसोंनक़ल\' में बिंब ढूँढिए — नवलक-नसोंनक़ल — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Identify the sensory imagery in this line from the story: "इहरी धुंध में लिपटी ठंडी हवा के झोंके जब-तब खिड़कियों से टकराते हुए कमरे में घुस.', options: [
                { text: 'Correct answer: Tactile imagery (touch)', outcome: 'Correct answer: Tactile imagery (touch) — "ठंडी हवा के झोंके" (cold gusts of wind) and "कमरे में.' },
                { text: 'imagery of cold', outcome: 'Not quite — Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.', reveals: 'students-consistently-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_011', title: 'दूसरा देवदास — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'नवलक नसोंनक़ल\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'In the sentence "vkse t; txnh\'k gjs ls gj dh ikSM+h xqatk;eku gks tkrh gSA" (page 118), identify the grammatical subject and explain why.', options: [
                { text: 'Correct answer: The grammatical subject is "gj dh ikSM+h" (feminine singular)', outcome: 'Correct answer: The grammatical subject is "gj dh ikSM+h" (feminine singular).' },
                { text: 'txnh\'k', outcome: 'Not quite — Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get.', reveals: 'students-treat-grammar-in-literature' },
                { text: 'wrong Hindi', outcome: 'Not quite — Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get.', reveals: 'students-treat-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your uncle visits his widowed mother after years, hands over a cheque, and is back at the station by evening. She tells the family simply: \'I will stay here.\' Relatives declare the matter \'resolved — she\'s decided.\'',
            decisions: [{ prompt: 'How does the story\'s ending read her \'मैं यहीं रहूँगी\'?', options: [
                { text: 'As an open ending, not a resolution — her staying asserts agency but settles nothing between her and the son who offered money instead of himself; the family calling it \'resolved\' mistakes her decision for the conflict\'s settlement.', outcome: 'The chapter separates a character\'s decision from the story\'s closure: the son leaves, she stays, no reconciliation occurs — the sentence is her autonomy speaking, not peace made.' },
                { text: 'As closure — she made a choice, so the conflict between duty and autonomy is over.', outcome: 'That\'s the confusion the chapter names: a character\'s resolve isn\'t the same as resolved conflict — his money-versus-presence failure stands exactly as unanswered as before.', reveals: 'decision-equals-resolution' },
                { text: 'As surrender — she stayed because she had no other option left.', outcome: 'The flashbacks exist to prove the opposite: the house holds her whole married life and the son\'s childhood — her staying is chosen rootedness, and reading it as helplessness misses the agency the final line asserts.', reveals: 'staying-is-surrender' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read the circus as a freedom allegory — and see how one chained animal can indict every human arrangement around it.',
            decisions: [{ prompt: 'What comes next? दूसरा देवदास · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — दूसरा देवदास · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_007', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review the distinction between plot and theme using the Class 11 node.',
          misconception: 'Students often think secondary themes are just "subplots" or minor events.',
          parts: [
                { id: 'a', prompt: 'In "नवलिक नसोंनकल", the ancestral home (gj dh ikSM+h) is described in detail.', answer: 'The house symbolizes the fading joint family tradition and Yashoda\'s memories',
                  options: ['The house symbolizes the fading joint family tradition and Yashoda\'s memories', 'subplots', 'secondary themes are just "subplots" or minor events'],
                  hint: 'If stuck, review the distinction between plot and theme using the Class 11 node.',
                  misconception: 'Students often think secondary themes are just "subplots" or minor events.' }
          ],
            remediations: { 'secondary-themes-are-just-subplots': { steps: ['Revisit node c12_hin_a_cbse_16_006 (Primary Theme) to understand the central message.', 'Use a two-column table: Column A = Event/Quote, Column B = Underlying Idea (Theme).', 'Practice with 5 examples from the story.', 'Re-attempt Diagnostic Questions 2 and 4, focusing on moving from event to idea.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_008', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If unable to classify sensory type or find tenor/vehicle, review Class 11 node.',
          misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.',
          parts: [
                { id: 'a', prompt: 'Identify the sensory imagery in this line from the story: "इहरी धुंध में लिपटी ठंडी हवा के झोंके जब-तब खिड़कियों से टकराते हुए कमरे में घुस आते थे।" Name the.', answer: 'Correct answer: Tactile imagery (touch)',
                  options: ['Correct answer: Tactile imagery (touch)', 'imagery of cold'],
                  hint: 'If unable to classify sensory type or find tenor/vehicle, review Class 11 node.',
                  misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.' },
                { id: 'b', prompt: 'Explain in your own words the metaphor in this passage: "लाहको अंगीठी के सामने बैठा अपनी ठिठुरी हुई उँगलियों को ताप रहा था। अंगीठी की आग उसके भीतर की ठंड को भी.', answer: 'Correct answer: Tenor = लाहको की आंतरिक निराशा/रचनात्मक ठहराव (Lahko\'s inner',
                  options: ['Correct answer: Tenor = लाहको की आंतरिक निराशा/रचनात्मक ठहराव (Lahko\'s inner', 'Lahko\'s cold hands', 'ठिठुरी हुई उँगलियों', 'भीतर की ठंड'],
                  hint: 'If unable to classify sensory type or find tenor/vehicle, review Class 11 node.',
                  misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.' },
                { id: 'c', prompt: 'Apply the concept: In the scene where Yashoda serves food to the child (pages 124-125), find ONE olfactory (smell) and ONE gustatory (taste) image.', answer: 'Correct answer steps: 1',
                  options: ['Correct answer steps: 1', 'imagery'],
                  hint: 'If unable to classify sensory type or find tenor/vehicle, review Class 11 node.',
                  misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.' },
                { id: 'd', prompt: 'Analyze the extended metaphor of "अंगीठी" (fireplace) across the story.', answer: 'Correct answer: Scene 1 (p.118): "लाहको अंगीठी के सामने बैठा..."',
                  options: ['Correct answer: Scene 1 (p.118): "लाहको अंगीठी के सामने बैठा..."', 'analyze'],
                  hint: 'If unable to classify sensory type or find tenor/vehicle, review Class 11 node.',
                  misconception: 'Students consistently confuse **imagery** with **description** and **metaphor** with **simile**.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['Have the student re-read only the first two pages (118-119) with three colored pencils: red for tactile (cold/heat).', 'For each colored phrase, write the sense name in margin.', 'Find every "X है Y" or "X बना Y" construction (without जैसे/वैसे).', 'Re-attempt Diagnostic Questions 2 and 4 using this table. If still stuck, revisit Class 11 node c11_hin_ar_cbse_01_008.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_009', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि छात्र प्रतीक और बिंब में भ्रमित हो, तो उसे c12_hin_a_cbse_16_008 नोड पर वापस जाना.',
          misconception: 'छात्र अक्सर विरोधाभास को 단순히 \'विपरीत बात कहना\' या \'ताना मारना\' समझते हैं, जैसे कि कोई कहे "वाह, बहुत सुंदर बनी हो!" जब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' में विरोधाभास',
                  options: ['\'नवलक नसोंनक़ल\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र प्रतीक और बिंब में भ्रमित हो, तो उसे c12_hin_a_cbse_16_008 नोड पर वापस जाना चाहिए और याद.',
                  misconception: 'छात्र अक्सर विरोधाभास को 단순히 \'विपरीत बात कहना\' या \'ताना मारना\' समझते हैं, जैसे कि कोई कहे "वाह, बहुत सुंदर बनी हो!" जब कपड़े फटे हों — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले दो वाक्य दिए जाइए: एक जिसमें स्पष्ट व्यंग्य हो (जैसे "अरे, आज बहुत देर से आए हो, बधाई हो!") और एक जिसमें.', 'फिर दूसरे में परिणाम क्या हुआ और क्या अपेक्षित था?', 'इस तुलना से स्पष्ट करिए कि विरोधाभास बोलने के इरादे में नहीं, बल्कि घटना के परिणाम और अपेक्षा के बीच के अंतर में है।.', 'समाज क्या अपेक्षा करता था?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_010', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, re-read the \'शब्दार्थ और व्याख्या\' section in NCERT and match each entry to its.',
          misconception: 'Students treat the NCERT glossary as a fixed dictionary equivalent, writing \'चकित = surprised\' in exams without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' की पदावली',
                  options: ['\'नवलक नसोंनक़ल\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read the \'शब्दार्थ और व्याख्या\' section in NCERT and match each entry to its paragraph.',
                  misconception: 'Students treat the NCERT glossary as a fixed dictionary equivalent, writing \'चकित = surprised\' in exams without explaining how the word\'s.' }
          ],
            remediations: { 'students-treat-the-ncert-glossary': { steps: ['If a student cannot move beyond dictionary meanings: 1) Pick one word (e.g., \'क्सèkwfy csyk\').', '2) Have them read the exact paragraph aloud twice, noting the rhythm.', '3) Ask: \'What is the elephant doing while this word is used?', 'What is the mood?\' 4) Co-construct a \'context card\': word | scene | sensory details | emotional tone | one original.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_011', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'If stuck on ergativity: review Class 11 node c11_hin_ar_cbse_01_011, section "Verb.',
          misconception: 'Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get marks.',
          parts: [
                { id: 'a', prompt: 'In the sentence "vkse t; txnh\'k gjs ls gj dh ikSM+h xqatk;eku gks tkrh gSA" (page 118), identify the grammatical subject and explain why the verb "gks tkrh.', answer: 'Correct answer: The grammatical subject is "gj dh ikSM+h" (feminine singular)',
                  options: ['Correct answer: The grammatical subject is "gj dh ikSM+h" (feminine singular)', 'txnh\'k', 'wrong Hindi', 'the verb agrees with "txnh\'k'],
                  hint: 'If stuck on ergativity: review Class 11 node c11_hin_ar_cbse_01_011, section "Verb Agreement with.',
                  misconception: 'Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get marks.' },
                { id: 'b', prompt: 'Analyze the compound verb "?kcjkuk" (page 121: "yM+dh ?kcjkgV esa Bhd ls pIiy igu ugha ikbZA") and "vpZuk djuk" (page 121: "yM+dh dk vk¡[k ew¡ndj vpZuk djuk").', answer: 'Correct analysis: 1',
                  options: ['Correct analysis: 1', 'wrong Hindi'],
                  hint: 'If stuck on ergativity: review Class 11 node c11_hin_ar_cbse_01_011, section "Verb Agreement with.',
                  misconception: 'Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get marks.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['If a student cannot distinguish ergative vs.', 'non-ergative agreement (Diagnostic 1), have them revisit Class 11 Hindi Core grammar node **c11_hin_ar_cbse_01_011**.', 'If they confuse honorific levels (Diagnostic 2,3), use **c11_hin_ar_cbse_02_011** (honorific system in narrative) and.', 'For compound verb analysis failure (Diagnostic 4), assign **c11_hin_ar_cbse_03_011** (compound verbs: vector verbs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get marks.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The dialectal forms in the story (e.g., \'xaxk th dk izkphu eafnj\', \'vkse t; txnh\'k gjs\', \'ck¡V djuk\') are merely decorative local color.', answer: 'Refute',
                  options: ['Refute', 'decorative', 'wrong Hindi'],
                  hint: 'If stuck on ergativity: review Class 11 node c11_hin_ar_cbse_01_011, section "Verb Agreement with.',
                  misconception: 'Students treat "grammar in literature" as a labeling exercise: underline verbs, name the tense, get marks.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['If a student cannot distinguish ergative vs.', 'non-ergative agreement (Diagnostic 1), have them revisit Class 11 Hindi Core grammar node **c11_hin_ar_cbse_01_011**.', 'If they confuse honorific levels (Diagnostic 2,3), use **c11_hin_ar_cbse_02_011** (honorific system in narrative) and.', 'For compound verb analysis failure (Diagnostic 4), assign **c11_hin_ar_cbse_03_011** (compound verbs: vector verbs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_16_012', difficulty: 'standard',
          question: '\'नवलक नसोंनक़ल\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'पाठ पढ़ने की आधारभूत कौशल (c11_hin_a_cbse_01_012) की समीक्षा करें, जहाँ टेक्स्ट में.',
          misconception: 'छात्र अक्सर वस्तुनिष्ठ प्रश्नों के उत्तर देते समय टेक्स्ट में स्पष्ट रूप से लिखित तथ्य को खोजने की बजाय अपनी याद या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नवलक नसोंनक़ल\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'नवलक नसोंनक़ल\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'नवलक नसोंनक़ल\' का कथानक', '\'नवलक नसोंनक़ल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'पाठ पढ़ने की आधारभूत कौशल (c11_hin_a_cbse_01_012) की समीक्षा करें, जहाँ टेक्स्ट में स्पष्ट रूप से.',
                  misconception: 'छात्र अक्सर वस्तुनिष्ठ प्रश्नों के उत्तर देते समय टेक्स्ट में स्पष्ट रूप से लिखित तथ्य को खोजने की बजाय अपनी याद या सामान्य ज्ञान पर भरोसा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['अगर छात्र वस्तुनिष्ठ प्रश्नों में गलती कर रहा है, तो उसे टेक्स्ट में एक पेंसिल से हल्का सा underline करके दिखाएं कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
