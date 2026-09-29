import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch12_p2: SimDef = {
    id: 'v3_c12_hin_a_ch12_p2',
    title: 'संवदयिा · Part 2/3',
    subtitle: 'A union leader wrote the village in the village\'s own voice',
    classLevel: 12, subject: 'hin_a', topic: 'संवदयिा · Part 2/3',
    chapters: ['c12_hin_a_ch12'],
    nodeIds: ['c12_hin_a_cbse_12_007', 'c12_hin_a_cbse_12_008', 'c12_hin_a_cbse_12_009', 'c12_hin_a_cbse_12_010', 'c12_hin_a_cbse_12_011', 'c12_hin_a_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Socialist-fiction reader', intro: 'He fought the British, organised workers, then sat down to write the village as the village sounds.', goal: 'Read Renu\'s/Phanishwar Nath\'s story through socialist humanism — colloquial voice as the carrier of rural truth.' },
    discovery: {
        question: 'A Quit India activist and trade unionist writes a village story in the village\'s own tongue — why does the colloquial language matter as much as the plot?',
        options: ['Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance', 'Simple language for simple readers', 'Dialect is easier to write', 'Just realism for colour'],
        answer: 'Voice is the politics — a socialist eye sees suffering with human warmth, and only the village\'s own speech can carry that truth without the textbook\'s distance',
        hook: '\'Simple\' isn\'t \'artless\' — colloquial, descriptive, expressive prose immerses you in village life so hardship and tenderness land as lived, not reported. A socialist lens sees both the poverty AND the feeling; the story outlives its decade because the rural-urban divide still argues today.',
    },
    teaching: [
        { title: 'संवदयिा — गौण विषय', text: '\'अंतरा भाग-2 — पाठ 12\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the village through its own speech: weigh a freedom fighter\'s lens on rural suffering, test why colloquiality is craft, and ask what a 1950s story still teaches a 2025 reader.',
        labels: ['संवदयिा — गौण विषय', 'संवदयिा — साहित्यिक युक्तियाँ', 'संवदयिा — पदावली: मुख्य', 'संवदयिा — व्याकरण: पाठ', 'संवदयिा — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_011', title: 'संवदयिा — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 12\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify three dialectal vocabulary items from the story "Laoofnak" and give their standard Hindi equivalents.', options: [
                { text: 'Correct answer: (1) dkcqyh&dk;nk → doctor (compounder), (2) ekjI+kQr → ekant', outcome: 'Correct answer: (1) dkcqyh&dk;nk → doctor (compounder), (2) ekjI+kQr → ekant (solitude/privacy).' },
                { text: 'dkcqyh = dakhu', outcome: 'Not quite — Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore.', reveals: 'students-treat-dialect-as-merely' },
                { text: 'fuekSfN;s', outcome: 'Not quite — Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore.', reveals: 'students-treat-dialect-as-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family wants to shift the ageing grandmother — who has nursed half the village\'s children — into your city flat \'for her own good.\' She refuses flatly, and everyone calls it stubbornness.',
            decisions: [{ prompt: 'How does the climax of \'रेणु\' read her refusal?', options: [
                { text: 'As the story\'s peak of belonging — the nanny refuses the narrator\'s city offer with \'you are my mother, mother of the whole village\' echoing around her; she isn\'t refusing care, she\'s rooted where her care made her everyone\'s.', outcome: 'The story builds to that confrontation precisely so her staying reads as identity, not obstinacy — the village is her life\'s work, and removing her to \'safety\' removes her from herself.' },
                { text: 'Insist on the move — the city\'s facilities objectively outweigh a village attachment.', outcome: 'That\'s the narrator\'s own plan at the climax, and the story gives it no victory: her refusal stands because the measure of her good isn\'t amenities but the web of people who call her mother.', reveals: 'facilities-outweigh-roots' },
                { text: 'Let her stay but stop calling — if she chooses the village, she\'s chosen isolation.', outcome: 'The story\'s flashbacks exist to show she\'s the least alone person in it — the refusal closes the city plan, not the relationship; withdrawing contact punishes her for rootedness.', reveals: 'staying-equals-isolation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read voice as worldview — where the choice of dialect is itself a statement about whose reality counts.',
            decisions: [{ prompt: 'What comes next? संवदयिा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — संवदयिा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फँसें तो c12_hin_a_cbse_12_006 (मुख्य विषय और संदेश) पर फिर से काम करें और मुख्य विषय.',
          misconception: 'students अक्सर मानते हैं कि यदि कोई पात्र या घटना कहानी में बार-बार आती है या भावनात्मक रूप से मजबूत है, तो वह मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो c12_hin_a_cbse_12_006 (मुख्य विषय और संदेश) पर फिर से काम करें और मुख्य विषय से गौण.',
                  misconception: 'students अक्सर मानते हैं कि यदि कोई पात्र या घटना कहानी में बार-बार आती है या भावनात्मक रूप से मजबूत है, तो वह मुख्य विषय होना चाहिए।.' }
          ],
            remediations: { 'students': { steps: ['छात्र को दिखाएँ कि कहानी के अंत में क्या बदलता है: यदि बूढ़ा पात्र की बातें हटा दें और मुख्य संघर्ष का समाधान समान रहे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि छात्र बिंब और रूपक के बीच के अंतर को समझ नहीं पा रहा है, तो कक्षा 11 के नोड.',
          misconception: 'छात्र अक्सर बिंब और रूपक को इस कारण से混동 करते हैं कि दोनों चित्रात्मक भाषा का प्रयोग करते हैं और दोनों ही कविता की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र बिंब और रूपक के बीच के अंतर को समझ नहीं पा रहा है, तो कक्षा 11 के नोड.',
                  misconception: 'छात्र अक्सर बिंब और रूपक को इस कारण से混동 करते हैं कि दोनों चित्रात्मक भाषा का प्रयोग करते हैं और दोनों ही कविता की सुंदरता बढ़ाते हैं। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो अलग-अलग रंग के हाईलाइटर दें: एक बिंब के लिए (शब्दों के चारों ओर घेरा डालें जो मन में चित्र, आवाज़, गंध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, revisit the distinction between literal and figurative meaning using the.',
          misconception: 'Students often treat irony and symbolism as "hidden meanings" to be guessed rather than textual patterns to be traced.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit the distinction between literal and figurative meaning using the imagery/metaphor.',
                  misconception: 'Students often treat irony and symbolism as "hidden meanings" to be guessed rather than textual patterns to be traced.' }
          ],
            remediations: { 'students-often-treat-irony-and': { steps: ['If a student cannot distinguish irony types or reduces symbols to single-word labels: (1) Give them a three-column.', 'Have them fill it for three scenes.', '(2) For symbols, use the "Physical → Abstract → Thematic" ladder: list 3 physical traits of the kite, then the abstract.', '(3) Re-read the Chhoti Chachi–Gajadhar dialogue (pages 79-80) aloud, pausing to ask: "What does she hear?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'अगर फँसें तो कथानक (c12_hin_a_cbse_12_002) और प्रमुख पात्र (c12_hin_a_cbse_12_004) पर.',
          misconception: 'छात्र अक्सर मुख्य शब्दों को पाठ के कठिन, अप्रयुक्त या Sanskrit pochod के शब्दों से जोड़कर समझते हैं, जैसे \'धर्म\', \'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'अगर फँसें तो कथानक (c12_hin_a_cbse_12_002) और प्रमुख पात्र (c12_hin_a_cbse_12_004) पर दोबारा ध्यान.',
                  misconception: 'छात्र अक्सर मुख्य शब्दों को पाठ के कठिन, अप्रयुक्त या Sanskrit pochod के शब्दों से जोड़कर समझते हैं, जैसे \'धर्म\', \' moksha\' को मुख्य शब्द.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ के तीन छोटे वाक्य दें और पूछें: "इन वाक्यों में कौन सा शब्द सबसे अधिक बार आया है और क्यों लगता है कि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck on compound verbs: revisit Class 11 node c11_hin_ar_cbse_05_011 (aspectual.',
          misconception: 'Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore the systematic.',
          parts: [
                { id: 'a', prompt: 'Identify three dialectal vocabulary items from the story "Laoofnak" and give their standard Hindi equivalents.', answer: 'Correct answer: (1) dkcqyh&dk;nk → doctor (compounder), (2) ekjI+kQr → ekant',
                  options: ['Correct answer: (1) dkcqyh&dk;nk → doctor (compounder), (2) ekjI+kQr → ekant', 'dkcqyh = dakhu', 'fuekSfN;s'],
                  hint: 'If stuck on compound verbs: revisit Class 11 node c11_hin_ar_cbse_05_011 (aspectual verbs) and.',
                  misconception: 'Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore the systematic grammatical differences.' },
                { id: 'b', prompt: 'In the dialogue "cM+h gosyh vc ukeek=k dks gh cM+h gosyh gSA" — identify the sentence type, the grammatical function of "vc" and "gh", and rewrite the sentence.', answer: 'Correct answer: Sentence type = declarative/assertive with emphatic focus',
                  options: ['Correct answer: Sentence type = declarative/assertive with emphatic focus', 'Ab badi gosai sirf badi gosai hai', 'Badi gosai ab badi gosai hai', '— the student hasn\'t grasped that Hindi particles like'],
                  hint: 'If stuck on compound verbs: revisit Class 11 node c11_hin_ar_cbse_05_011 (aspectual verbs) and.',
                  misconception: 'Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore the systematic grammatical differences.' }
          ],
            remediations: { 'students-treat-dialect-as-merely': { steps: ['Have the student isolate 10 sentences from the beggar woman\'s dialogue and 10 from Gyaneshwar\'s.', 'Create a two-column table: Column A = her sentence, Column B = standard Hindi translation.', 'For each pair, identify EXACTLY what changed: verb ending? postposition? pronoun? particle? word order?', 'Generalize 3-4 grammatical rules from the patterns (e.g., "She consistently uses -us infinitive where standard uses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore the systematic.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to render the beggar woman\'s internal monologue ("fdlosQ fy, bruk nq[k >syw¡\\...") in the same dialectal register as her spoken.', answer: 'Correct answer: It enhances psychological realism',
                  options: ['Correct answer: It enhances psychological realism', 'it confuses readers'],
                  hint: 'If stuck on compound verbs: revisit Class 11 node c11_hin_ar_cbse_05_011 (aspectual verbs) and.',
                  misconception: 'Students treat "dialect" as merely a list of vocabulary substitutions (dkcqyh = doctor) and ignore the systematic grammatical differences.' }
          ],
            remediations: { 'students-treat-dialect-as-merely': { steps: ['Have the student isolate 10 sentences from the beggar woman\'s dialogue and 10 from Gyaneshwar\'s.', 'Create a two-column table: Column A = her sentence, Column B = standard Hindi translation.', 'For each pair, identify EXACTLY what changed: verb ending? postposition? pronoun? particle? word order?', 'Generalize 3-4 grammatical rules from the patterns (e.g., "She consistently uses -us infinitive where standard uses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_12_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 12\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि आशय-सूचक प्रश्न पहचानने में अटके: **c11_hin_a_cbse_07_012** (सामान्य गलतियाँ पहचानना).',
          misconception: '**सबसे घातक भ्रम:** "आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ **कॉपी-पेस्ट** करके दे दो।" **वास्तविकता:** CBSE.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 12\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 12\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 12\' का कथानक — \'अंतरा भाग-2 — पाठ 12\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 12\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि आशय-सूचक प्रश्न पहचानने में अटके: **c11_hin_a_cbse_07_012** (सामान्य गलतियाँ पहचानना) और.',
                  misconception: '**सबसे घातक भ्रम:** "आशय-सूचक प्रश्न का उत्तर पाठ की पंक्तियाँ **कॉपी-पेस्ट** करके दे दो।" **वास्तविकता:** CBSE मार्किंग स्कीम में.' }
          ],
            remediations: { 'cbse-1': { steps: ['**चरण 1:** छात्र को 5 वस्तुनिष्ठ और 5 आशय-सूचक प्रश्न दें (मिश्रित क्रम में)। उससे कहें: **"प्रत्येक प्रश्न के आगे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
