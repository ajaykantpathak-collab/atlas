import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch02_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch02_p2',
    title: 'पाठ 2 · Part 2/3',
    subtitle: 'Watch a quiet cook defeat his master without ever raising his voice.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 2 · Part 2/3',
    chapters: ['c11_hin_ar_ch02'],
    nodeIds: ['c11_hin_ar_cbse_02_007', 'c11_hin_ar_cbse_02_008', 'c11_hin_ar_cbse_02_009', 'c11_hin_ar_cbse_02_010', 'c11_hin_ar_cbse_02_011', 'c11_hin_ar_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener piecing together a servant\'s hidden past', intro: 'Puris puff on the stove while a nickname — \'उल्हनिहु\' — opens a trapdoor into a whole colonial history.', goal: 'Analyse the story\'s flashback structure and read its silent ending as resistance.' },
    discovery: {
        question: 'The cook Phenku ends the story serving puris in silence — the narrator learned nothing, so the ending resolves nothing?',
        options: ['Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history', 'Right — an open ending is a narrative failure', 'Right — the colonial anecdote deserved a dramatic payoff', 'Wrong — he actually resigns at the end'],
        answer: 'Wrong — the ending mirrors the opening transformed: silent service becomes the resolution once we know his buried history',
        hook: 'The story hides its oldest event two-thirds of the way in — a flashback that only lands because we met the dignified cook first.',
    },
    teaching: [
        { title: 'पाठ 2 — गौण विषय', text: '\'फेंकू उल्हनिहु\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reorder the five scenes by narrative logic rather than chronology, and argue why the colonial-officer flashback lands where it does.',
        labels: ['पाठ 2 — गौण', 'पाठ 2 — साहित्यिक', 'पाठ 2 — पदावली', 'पाठ 2 — व्याकरण', 'पाठ 2 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_008', title: 'पाठ 2 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'फेंकू उल्हनिहु\' में बिंब ढूँढिए — फेंकू-उल्हनिहु — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one original example for each (not from the textbook).', options: [
                { text: '**Correct Answer:** Imagery: Descriptive language appealing to senses (e.g., "The monsoon', outcome: '**Correct Answer:** Imagery: Descriptive language appealing to senses (e.g., "The monsoon air.' },
                { text: 'Her smile was like sunshine', outcome: 'Not quite — **Misconception:** "Imagery is just \'descriptive writing\' or \'visual description,\' and metaphor.', reveals: 'misconception-imagery-is-just-descriptive' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_012', title: 'पाठ 2 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'फेंकू उल्हनिहु\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'फेंकू उल्हनिहु\' का केंद्रीय भाव और संदेश।',
            decisions: [{ prompt: 'Define literal comprehension and give one example of a literal question from the chapter "Fe;k¡ ulh#íhu".', options: [
                { text: 'Literal comprehension is the ability to identify information explicitly stated in the text', outcome: 'Literal comprehension is the ability to identify information explicitly stated in the text.' },
                { text: 'She is poor and struggles', outcome: 'Not quite — Students treat inferential questions as "guess what the author meant" and either: (a) quote.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a regional-literature seminar you present Renu\'s anchalik katha and Yashpal\'s \'Phenku\' story. A classmate objects: \'These dialect words and folk songs are local colour — decoration. And the Phenku story is simple: master questions cook, cook answers, done in order.\'',
            decisions: [{ prompt: 'What\'s the better analysis?', options: [
                { text: 'Show the machinery: in anchalik fiction the dialect, folk songs and agrarian rituals aren\'t colour — they carry the meaning and the tension between tradition and modernity. And Yashpal\'s structure is the argument: the colonial-officer anecdote arrives as a flashback two-thirds in, so we meet Phenku\'s present dignity BEFORE learning his past — the quiet \'simple\' cook becomes the moral centre while the talkative master shrinks.', outcome: 'Both corrections land: form is meaning — dialect is the story\'s engine, and narrative sequencing is how the servant outwits the master without raising his voice.' },
                { text: 'Agree dialect is decoration — translate it into standard Hindi so the \'real\' story shows clearly.', outcome: 'Removing the regional register removes the story: anchalik katha locates meaning in the specific soil, speech and ritual of the region.', reveals: 'dialect-is-decoration' },
                { text: 'Retell Phenku chronologically — put the officer anecdote first so events run in order.', outcome: 'Chronological retelling destroys the irony: the flashback\'s late placement is what lets present dignity precede past humiliation.', reveals: 'reorder-flashback-chronologically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'A servant who never raises his voice outwits everyone — the structure does the same to the reader.',
            decisions: [{ prompt: 'What comes next? पाठ 2 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 2 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_007', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) पर वापस जाएँ — मुख्य विषय को 3 अलग-अलग कोणों से.',
          misconception: 'छात्र समझते हैं कि \'गौण विषय = कम अंक वाला विषय\' या \'गौण विषय = प्रसंग मात्र\'। वास्तव में बोर्ड परीक्षा में 3-4 अंक के.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' के गौण विषय',
                  options: ['\'फेंकू उल्हनिहु\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) पर वापस जाएँ — मुख्य विषय को 3 अलग-अलग कोणों से लिखकर.',
                  misconception: 'छात्र समझते हैं कि \'गौण विषय = कम अंक वाला विषय\' या \'गौण विषय = प्रसंग मात्र\'। वास्तव में बोर्ड परीक्षा में 3-4 अंक के प्रश्न प्रायः गौण.' }
          ],
            remediations: { '3-4-functional-relationship': { steps: ['छात्र को नोड 006 (मुख्य विषय) पर वापस ले जाएँ — पहले मुख्य विषय को एक वाक्य में लिखवाएँ। 2.', 'पाठ के 5-6 प्रमुख प्रसंग चुनवाएँ, प्रत्येक से पूछें: "यह प्रसंग मुख्य विषय को क्या नई जानकारी/कोण देता है?" 3.', 'उत्तरों को तीन कॉलम में लिखवाएँ: प्रसंग | देता जानकारी | गौण विषय का नाम। 4.', 'फिर PEEL संरचना में एक उत्तर लिखवाएँ: Point (गौण विषय का नाम), Evidence (प्रसंग/संवाद), Explanation (कैसे मुख्य विषय को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_008', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Re-read the chapter with a highlighter: **Yellow** for visual, **Blue** for.',
          misconception: '**Misconception:** "Imagery is just \'descriptive writing\' or \'visual description,\' and metaphor is just \'a fancy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' में बिंब (imagery)',
                  options: ['\'फेंकू उल्हनिहु\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Re-read the chapter with a highlighter: **Yellow** for visual, **Blue** for tactile/thermal.',
                  misconception: '**Misconception:** "Imagery is just \'descriptive writing\' or \'visual description,\' and metaphor is just \'a fancy comparison.\'" **Why.' }
          ],
            remediations: { 'misconception-imagery-is-just-descriptive': { steps: ['**Step 1 (Sensory Audit):** Give the student a 5-column table (Sight, Sound, Smell, Touch, Taste).', 'Assign: "Scan pages 22–28.', 'Put *every* sensory phrase in the correct column.', 'Find at least 3 per column." **Step 2 (Metaphor Surgery):** For the compound word on page 27, have them physically cut.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_009', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 के WORKED_EXAMPLE_2** (रूपक विश्लेषण) को दोहराएँ और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **प्रतीक (Symbol)** को **रूपक (Metaphor)** या **बिंब (Image)** समझ बैठते हैं और लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' में विरोधाभास',
                  options: ['\'फेंकू उल्हनिहु\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **नोड 008 के WORKED_EXAMPLE_2** (रूपक विश्लेषण) को दोहराएँ और फिर इसी.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः **प्रतीक (Symbol)** को **रूपक (Metaphor)** या **बिंब (Image)** समझ बैठते हैं और लिखते हैं: "लेखक ने नदी.' }
          ],
            remediations: { 'symbol-metaphor-image-1': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र को तीन कॉलम बनवाएँ: **बिंब / रूपक / प्रतीक**। प्रत्येक में पाठ से एक-एक उदाहरण.', 'क्या *बार-बार* आकर *अर्थ विस्तार* पा रहा है?" 2.', '**चरण 2 — विरोधाभास का \'सत्य-परीक्षण\':** हर विरोधाभासी वाक्य के लिए पूछें: "सतह पर क्या विरोध है?', 'गहरे में कौन-सा सत्य खुल रहा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_010', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'Re-read the \'Before You Read\' (c11_hin_ar_cbse_02_001) section on Nirmal Verma\'s focus.',
          misconception: 'Students treat the \'kCn&Nfo\' glossary as the *final authority* on word meaning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' की पदावली',
                  options: ['\'फेंकू उल्हनिहु\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Re-read the \'Before You Read\' (c11_hin_ar_cbse_02_001) section on Nirmal Verma\'s focus on urban.',
                  misconception: 'Students treat the \'kCn&Nfo\' glossary as the *final authority* on word meaning.' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['Take the glossary word \'ukuckbZ\'.', 'Find its *every* occurrence in the story (pages 22, 24, 25).', 'For each, note: Speaker → Listener → Triggering Event → Emotional Charge.', 'Make a 3-column table: Dictionary Meaning | Contextual Meaning | Evidence Phrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_011', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि फँसें तो c11_hin_ar_cbse_02_010 (पदावली) के \'शब्द-वर्गीकरण अभ्यास\' और कक्षा 10 के.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन/तत्सम/संस्कृतनिष्ठ शब्दों का प्रयोग** है। वे सरल तद्भव शब्दों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फेंकू उल्हनिहु\' में भाषा-प्रयोग',
                  options: ['\'फेंकू उल्हनिहु\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फेंकू उल्हनिहु\' का कथानक', '\'फेंकू उल्हनिहु\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो c11_hin_ar_cbse_02_010 (पदावली) के \'शब्द-वर्गीकरण अभ्यास\' और कक्षा 10 के \'वाक्य-विचार\'.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन/तत्सम/संस्कृतनिष्ठ शब्दों का प्रयोग** है। वे सरल तद्भव शब्दों, आंचलिक प्रयोगों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ-2 का कोई एक पृष्ठ खोलो और **लाल पेन** से केवल **क्रिया-पद** (verbs) घेरो।" 2.', 'फिर पूछो: "क्या सभी क्रियाएँ एक ही कोटि की हैं?', '(कर्तृवाच्य/कर्मवाच्य/भाववाच्य, साधारण/सम्मानसूचक)।" 3.', 'अब **नीले पेन** से **संज्ञा/सर्वनाम** घेरवाओ: "कितने तत्सम?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_02_012', difficulty: 'standard',
          question: '\'फेंकू उल्हनिहु\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'Review the chapter summary (node 002) and the protagonist\'s character profile (node 004).',
          misconception: 'Students treat inferential questions as "guess what the author meant" and either: (a) quote a single unrelated line.',
          parts: [
                { id: 'a', prompt: 'Read this hypothetical excerpt based on the chapter\'s style: "Her fingers flew over the bamboo strips, weaving a pattern her grandmother taught her, humming.', answer: 'This is an **inferential** question',
                  options: ['This is an **inferential** question', 'grandmother taught her'],
                  hint: 'Review the chapter summary (node 002) and the protagonist\'s character profile (node 004) to refresh.',
                  misconception: 'Students treat inferential questions as "guess what the author meant" and either: (a) quote a single unrelated line as "proof", or (b).' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['**Model the bridge**: Take a simple inferential question ("Why did the narrator feel shame?").', 'Write a 3-column table on board: **Clue 1** (Text: "vk¡[kksa osQ oaQps ge ij isQj fn,A") → **Clue 2** (Text: "esjk D;k.', '**Inference**: He realized his narrow definition of literacy failed against her lived wisdom.', '**Guided practice**: Give a परिचित text (e.g., a Class 10 Hindi chapter).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
