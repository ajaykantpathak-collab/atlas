import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p2: SimDef = {
    id: 'v3_c12_hin_a_ch06_p2',
    title: 'तुलसीदास · Part 2/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'तुलसीदास · Part 2/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_007', 'c12_hin_a_cbse_06_008', 'c12_hin_a_cbse_06_009', 'c12_hin_a_cbse_06_010', 'c12_hin_a_cbse_06_011', 'c12_hin_a_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'तुलसीदास — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'हजारी-जइके\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['तुलसीदास — साहित्यिक युक्तियाँ', 'तुलसीदास — मुख्य भाव', 'तुलसीदास — गौण भाव', 'तुलसीदास — पदावली: कठिन', 'तुलसीदास — व्याकरण: पद्य', 'तुलसीदास — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_008', title: 'तुलसीदास — मुख्य भाव और संदेश',
          caseStudy: { intro: '\'हजारी-जइके\' में बिंब ढूँढिए — हजारी-जइके — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define \'imagery\' (चित्रात्मकता) and \'metaphor\' (रूपक) in your own words, giving one original example of each (not from the textbook).', options: [
                { text: '**Correct Answer:** Imagery is descriptive language appealing to the five senses (e.g.,', outcome: '**Correct Answer:** Imagery is descriptive language appealing to the five senses (e.g., "The sharp.' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — **Misconception:** "Imagery is only about *visual* descriptions (pictures in the mind), and.', reveals: 'misconception-imagery-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_009', title: 'तुलसीदास — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'हजारी-जइके\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define verbal irony and give one example from the poem "Hajir-Jaik ka Izhaar" where Hajir\'s spoken words contradict her inner state.', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean.' },
                { text: 'It\'s ironic that it rained on her wedding day', outcome: 'Not quite — Students consistently confuse *situational irony* with *bad luck* or *coincidence* (e.g., "It\'s.', reveals: 'students-consistently-confuse-situational-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_010', title: 'तुलसीदास — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '\'हजारी-जइके\' के मुख्य शब्द: हजारी-जइके — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the literal meaning (वाच्यार्थ) of the Braj Bhasha word "लुसग़" as used in the line "लुसग़ लुसग़ लुसग़ लुसग़" from Raskhan\'s poem.', options: [
                { text: 'The word "लुसग़" (लुसग) is a present participle (वर्तमान कृदंत) from the root लुस् (to', outcome: 'The word "लुसग़" (लुसग) is a present participle (वर्तमान कृदंत) from the root लुस् (to.' },
                { text: 'trembling', outcome: 'Not quite — Students treat the NCERT \'शब्दार्थ\' list as a static glossary to memorise for 1-mark questions.', reveals: 'students-treat-the-ncert-list' },
                { text: 'dancing', outcome: 'Not quite — Students treat the NCERT \'शब्दार्थ\' list as a static glossary to memorise for 1-mark questions.', reveals: 'students-treat-the-ncert-list' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'What comes next? तुलसीदास · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तुलसीदास · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_007', difficulty: 'standard',
          question: '\'हजारी-जइके\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फँस जाएँ, तो कक्षा 11 अंतरा के **किसी एक काव्य (जैसे: \'जाग तुझको दूर जाना\'.',
          misconception: '**विशिष्ट भ्रांति:** "तुलसीदास के काव्य में हर बिंब प्रतीक है, और हर प्रतीक बिंब है।" **वास्तविकता:** **बिंब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' के गौण विषय',
                  options: ['\'हजारी-जइके\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ, तो कक्षा 11 अंतरा के **किसी एक काव्य (जैसे: \'जाग तुझको दूर जाना\'.',
                  misconception: '**विशिष्ट भ्रांति:** "तुलसीदास के काव्य में हर बिंब प्रतीक है, और हर प्रतीक बिंब है।" **वास्तविकता:** **बिंब = इंद्रियगत चित्र (साधन).' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "पाठ के किन्हीं 5 पदों में केवल **संज्ञा/विशेषण** शब्द छाँटिए जो आँखों को चित्र दिखाएँ (जैसे.', '**चरण 2:** उन्हीं शब्दों में से पूछें: "इनमें से कौन-सा शब्द **केवल चित्र नहीं, कोई बड़ा संदेश भी देता है**?', '(संकेत: कमल, धनुष, वन, नाम, मणि)।" इन्हें **प्रतीक-शब्द** चिह्नित कराएँ। 3.', '**चरण 3:** एक तालिका बनवाएँ: **शब्द | बिंब प्रकार (दृश्य/श्रव्य...) | प्रतीक अर्थ (हाँ/नहीं + क्या)**। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_008', difficulty: 'standard',
          question: '\'हजारी-जइके\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck on identifying senses, review "Sensory Word Bank" from Class 11 node.',
          misconception: '**Misconception:** "Imagery is only about *visual* descriptions (pictures in the mind), and metaphor is just a \'fancy.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of metaphor to the line "eSa tkum¡ fut ukFk lqHkkmQA" (I am yours, not of anyone else).', answer: '**Correct Answer:** - **Tenor (subject):** The speaker (gopi/soul)',
                  options: ['**Correct Answer:** - **Tenor (subject):** The speaker (gopi/soul)', 'without naming the implied noun'],
                  hint: 'If stuck on identifying senses, review "Sensory Word Bank" from Class 11 node.',
                  misconception: '**Misconception:** "Imagery is only about *visual* descriptions (pictures in the mind), and metaphor is just a \'fancy synonym\' for simile.' }
          ],
            remediations: { 'misconception-imagery-is-only-about': { steps: ['**Remediation Path (3 steps):** 1.', '**Sensory Re-calibration (15 min):** Give the student a 4-line unseen Hindi poem.', 'Ask them to *circle* every word triggering a sense and *label* the sense (V/A/T/O/G).', 'If they find only visual, assign "Sensory Walk" homework: describe a परिचित place (kitchen, bus stand) using *only*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_009', difficulty: 'standard',
          question: '\'हजारी-जइके\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the "tenor-vehicle" distinction in metaphors (c12_hin_a_cbse_06_008) and.',
          misconception: 'Students consistently confuse *situational irony* with *bad luck* or *coincidence* (e.g., "It\'s ironic that it rained.',
          parts: [
                { id: 'a', prompt: 'Define verbal irony and give one example from the poem "Hajir-Jaik ka Izhaar" where Hajir\'s spoken words contradict her inner state.', answer: 'Verbal irony occurs when a speaker says the opposite of what they mean',
                  options: ['Verbal irony occurs when a speaker says the opposite of what they mean', 'It\'s ironic that it rained on her wedding day'],
                  hint: 'If stuck, review the "tenor-vehicle" distinction in metaphors (c12_hin_a_cbse_06_008) and practice.',
                  misconception: 'Students consistently confuse *situational irony* with *bad luck* or *coincidence* (e.g., "It\'s ironic that it rained on her wedding day".' },
                { id: 'b', prompt: 'Apply the concept of situational irony to the moment in the prose when Hajir\'s mother (Daksha) tries to protect her from Krishna\'s influence but inadvertently.', answer: 'Step 1: Daksha fears Krishna\'s pull and imposes strict restrictions',
                  options: ['Step 1: Daksha fears Krishna\'s pull and imposes strict restrictions', 'It\'s ironic that it rained on her wedding day'],
                  hint: 'If stuck, review the "tenor-vehicle" distinction in metaphors (c12_hin_a_cbse_06_008) and practice.',
                  misconception: 'Students consistently confuse *situational irony* with *bad luck* or *coincidence* (e.g., "It\'s ironic that it rained on her wedding day".' }
          ],
            remediations: { 'students-consistently-confuse-situational-irony': { steps: ['If a student cannot distinguish irony types or reduces symbols to metaphors: 1) Have them create a three-column table.', '2) For symbolism, use the "onion peel" exercise: take the peacock feather — Layer 1 (physical): feather with.', '3) Re-attempt Diagnostic Questions 3 and 4 after this.', 'If still stuck, revisit c11_hin_ar_cbse_01_009 (Class 11 Irony and Symbolism) for foundational definitions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_010', difficulty: 'standard',
          question: '\'हजारी-जइके\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on Braj forms (लुसग़, फुल्कि), revisit Class 11 node c11_hin_v_cbse_01_010 where.',
          misconception: 'Students treat the NCERT \'शब्दार्थ\' list as a static glossary to memorise for 1-mark questions, ignoring that Raskhan\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' की पदावली',
                  options: ['\'हजारी-जइके\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on Braj forms (लुसग़, फुल्कि), revisit Class 11 node c11_hin_v_cbse_01_010 where Braj.',
                  misconception: 'Students treat the NCERT \'शब्दार्थ\' list as a static glossary to memorise for 1-mark questions, ignoring that Raskhan\'s vocabulary is.' }
          ],
            remediations: { 'students-treat-the-ncert-list': { steps: ['If a student cannot move beyond gloss-memorisation: (1) Assign a "Word Autopsy" for 5 key words: root > suffix >.', '(2) Have them read aloud the Braj lines focusing *only* on the target word\'s sound (e.g., the retroflex flap in लुसग़.', '(3) Map each word to its Sanskrit/Persian ancestor using Monier-Williams or Platts (online) to make etymology visible.', '(4) Re-attempt Diagnostic Q3 and Q6 after 48 hours — if they still substitute synonyms without prosodic justification.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_011', difficulty: 'standard',
          question: '\'हजारी-जइके\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि फंसे तो c12_hin_a_cbse_06_005 (छंद और लय-विधान) की दोबारा समीक्षा करें, विशेष रूप से.',
          misconception: 'छात्र अक्सर मानते हैं कि तुलसीदास के पद्यों में भाषा-प्रयोग का अर्थ केवल कठिन शब्दों के अर्थ जानना है, जबकि वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' में भाषा-प्रयोग',
                  options: ['\'हजारी-जइके\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे तो c12_hin_a_cbse_06_005 (छंद और लय-विधान) की दोबारा समीक्षा करें, विशेष रूप से मात्रा और.',
                  misconception: 'छात्र अक्सर मानते हैं कि तुलसीदास के पद्यों में भाषा-प्रयोग का अर्थ केवल कठिन शब्दों के अर्थ जानना है, जबकि वास्तव में यह वाक्य विन्यास.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति में वाक्य विन्यास बदलने से अर्थ में परिवर्तन आता है (जैसे "राम जाते हैं" vs "जाते हैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_012', difficulty: 'standard',
          question: '\'हजारी-जइके\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र शब्दार्थ में फंस रहा है तो c12_hin_a_cbse_06_010 (पदावली: कठिन शब्द और मुहावरे).',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों का उत्तर देते समय कविता की पंक्तियों को दोहराकर सोचते हैं कि वे भाव स्पष्ट कर रहे हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'हजारी-जइके\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'हजारी-जइके\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'हजारी-जइके\' का कथानक', '\'हजारी-जइके\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र शब्दार्थ में फंस रहा है तो c12_hin_a_cbse_06_010 (पदावली: कठिन शब्द और मुहावरे) को दोबारा.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों का उत्तर देते समय कविता की पंक्तियों को दोहराकर सोचते हैं कि वे भाव स्पष्ट कर रहे हैं, जैसे प्रश्न हो—"कवि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर कैसे मजबूत बनाया जाए। उदाहरण: कमजोर—"कवि कहता है कि प्रेम करें"। मजबूत—"कवि कहता है.', '(4) उत्तर में कारण जोड़ें—"क्योंकि" शब्द का प्रयोग करें। (5) संदर्भ से जोड़ें—कहाँ और कैसे प्रेम बताया गया है। इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
