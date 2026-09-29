import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch07_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'Follow a simple request through an office where procedure eats its purpose.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c11_hin_ar_ch07'],
    nodeIds: ['c11_hin_ar_cbse_07_007', 'c11_hin_ar_cbse_07_008', 'c11_hin_ar_cbse_07_009', 'c11_hin_ar_cbse_07_010', 'c11_hin_ar_cbse_07_011', 'c11_hin_ar_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen trapped in a paper corridor', intro: 'One lost child, three offices, zero responsibility — Renu turns a queue into a verdict on the system.', goal: 'Read bureaucratic satire and analyse how episodic structure builds the indictment.' },
    discovery: {
        question: 'A lost child at the station gets shuffled: report at Platform 3, stamp at the Superintendent\'s, return — by which time the child is gone. Just slapstick?',
        options: ['No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty', 'Yes — it\'s comedy with no bite', 'Yes — the child should have waited properly', 'No — it\'s actually a ghost story'],
        answer: 'No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty',
        hook: 'Anchalik fiction\'s trick: village dialect and folk detail aren\'t decoration — they\'re the machinery that makes the bureaucracy look absurd.',
    },
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: '\'टेकु का इस्म+\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Chart the runaround office to office, identify where satire turns to indictment, and test whether the ending punishes the system or just exposes it.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'टेकु का इस्म+\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'टेकु का इस्म+\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire evening you pick Renu\'s story of a leopard cub passed between the Forest, Agriculture and Revenue departments while its mother waits. A classmate edits your script: \'Cut two of the three office refusals — they\'re repetitive — and make the climax the cub being rescued by officials.\'',
            decisions: [{ prompt: 'Why should you reject both edits?', options: [
                { text: 'Keep the pattern: the repeated refusals — forest guard, ranger, police, each citing rules and jurisdiction — ARE the structure; the circular paperwork mimics the bureaucracy being satirised. And the climax isn\'t the rescue outcome but the mother leopard bypassing the entire system: instinct achieves what the state couldn\'t, which is the satire\'s punch.', outcome: 'The script now bites as intended: repetition builds the indictment, and the resolution comes from circumventing bureaucracy, not satisfying it.' },
                { text: 'Accept the cuts — one refusal conveys the point; three is redundancy.', outcome: 'Repetition is the technique: a single refusal reads as one rude official; the pattern of identical refusals exposes a system, which is the satire\'s target.', reveals: 'repetition-is-redundancy' },
                { text: 'Let the officials save the cub — a competent government gives the story a hopeful close.', outcome: 'That reverses the satire: the story\'s logic demands the system fail while the animal\'s instinct succeeds — bureaucratic success would prove the system works.', reveals: 'officials-should-save-the-cub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'Every official followed the rules — that\'s the horror: the machine ran perfectly and the point was lost.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_007', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो नोड 006 (मुख्य विषय और संदेश) के \'वॉकथ्रू\' और \'कार्यित.',
          misconception: '**विशिष्ट भ्रांति:** "गौण विषय का अर्थ है — कहानी में चलने वाली **दूसरी समानांतर कहानी (Parallel Plot)** जिसका मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' के गौण विषय',
                  options: ['\'टेकु का इस्म+\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो नोड 006 (मुख्य विषय और संदेश) के \'वॉकथ्रू\' और \'कार्यित उदाहरण\' को.',
                  misconception: '**विशिष्ट भ्रांति:** "गौण विषय का अर्थ है — कहानी में चलने वाली **दूसरी समानांतर कहानी (Parallel Plot)** जिसका मुख्य कहानी से कोई लेना-देना.' }
          ],
            remediations: { 'parallel-plot-sub-plot': { steps: ['**चरण 1 — अवधारणा स्पष्टीकरण (5 मिनट):** छात्र के सामने एक **सरल कहानी का स्केलेटन (Skeleton)** रखें: "लड़का परीक्षा.', '☐ प्रत्येक के लिए \'कैसे समृद्ध करता है\' समझाया?', '☐ मुख्य विषय से लिंक किया?', '— अगले अभ्यास में यही चेकलिस्ट उपयोग होगी।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_008', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **पाठ 7 के कथानक (c11_hin_ar_cbse_07_002) और मुख्य विषय.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'रूपक\' को \'विस्तृत उपमा\' (Extended Simile) मान लेते हैं** — वे "जैसे/वैसे" न देखकर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' में बिंब (imagery)',
                  options: ['\'टेकु का इस्म+\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **पाठ 7 के कथानक (c11_hin_ar_cbse_07_002) और मुख्य विषय (c11_hin_ar_cbse_07_006) को.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर **\'रूपक\' को \'विस्तृत उपमा\' (Extended Simile) मान लेते हैं** — वे "जैसे/वैसे" न देखकर सोचते हैं कि रूपक बस.' }
          ],
            remediations: { 'extended-simile-identificatory-force': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र को दो वाक्य दें: "चाँद *जैसे* चमक रहा था" और "चाँद *थी* एक चाँदी की थाली"। पूछें.', '**चरण 2 — आरोप्य/आरोपित का खेल:** 5 दैनिक वाक्यों में रूपक ढूँढ़ने को कहें (जैसे "गुस्सा उबल पड़ा", "आँखें झील हैं")।.', '**चरण 3 — प्रभाव तुलना:** उसी भाव को उपमा और रूपक दोनों में लिखवाएँ ("यादें *जैसे* काँटे चुभती हैं" बनाम "यादें काँटे.', '**चरण 4 — पाठ पर लागू करें:** पाठ 7 के किसी अंश में से एक रूपक चुनकर उसका **\'अगर यह उपमा होता तो...\'** विश्लेषण करवाएँ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_009', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका महसूस हो तो **c11_hin_ar_cbse_07_008 (बिंब और रूपक)** दोबारा पढ़ें — विशेष रूप.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'विरोधाभास\' को \'विरोधाभासी स्थिति\' (Paradoxical situation) या \'विडंबना\' (Irony) से.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' में विरोधाभास',
                  options: ['\'टेकु का इस्म+\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_ar_cbse_07_008 (बिंब और रूपक)** दोबारा पढ़ें — विशेष रूप से \'रूपक के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः **\'विरोधाभास\' को \'विरोधाभासी स्थिति\' (Paradoxical situation) या \'विडंबना\' (Irony) से मिला देते हैं।** वे.' }
          ],
            remediations: { 'paradoxical-situation-irony-situational-irony': { steps: ['**स्पष्टीकरण चरण:** छात्र को तीन कथन दें — (क) "आग जलाती है" (साधारण कथन), (ख) "आग बुझाती है" (विरोध/असत्य), (ग) "आग ही.', '**अभ्यास चरण:** पाठ्यपुस्तक के किसी भी पाठ से ३ विरोधाभासी कथन छाँटने को कहें; प्रत्येक के लिए लिखवाएँ: (i) शाब्दिक.', '**प्रतीक हेतु:** एक ठोस वस्तु (दीया/नदी/पिंजरा) दें; छात्र से कहें: "इसका शाब्दिक अर्थ लिखो, फिर इस पाठ के प्रसंग में.', '**फीडबैक:** हर बार \'क्यों\' पूछें — जब तक छात्र **पाठ्य-साक्ष्य (textual evidence)** न दे, तब तक स्वीकार न करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_010', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, **re-read the "Before You Read" (node 001) and "Plot" (node 002) sections**.',
          misconception: '**The "Dictionary Definition Equals Contextual Meaning" Fallacy.** Students memorize the glossary meanings (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' की पदावली',
                  options: ['\'टेकु का इस्म+\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, **re-read the "Before You Read" (node 001) and "Plot" (node 002) sections**.',
                  misconception: '**The "Dictionary Definition Equals Contextual Meaning" Fallacy.** Students memorize the glossary meanings (e.g., "rxkI+kqQy = protection").' }
          ],
            remediations: { 'the-dictionary-definition-equals-contextual': { steps: ['**Targeted Remediation (3-Step "Context Clue Protocol"):** 1.', '**Locate & Isolate:** Find the *exact* paragraph.', 'Highlight the target word.', 'Read 2 sentences before and after.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_011', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'If stuck, review the \'kCn Nfo\' table in the textbook and practice identifying clauses.',
          misconception: 'Students often treat the Tatsam words as mere vocabulary to be memorized for meaning, not realizing that Renu uses them.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' में भाषा-प्रयोग',
                  options: ['\'टेकु का इस्म+\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review the \'kCn Nfo\' table in the textbook and practice identifying clauses in simple.',
                  misconception: 'Students often treat the Tatsam words as mere vocabulary to be memorized for meaning, not realizing that Renu uses them as *precision.' }
          ],
            remediations: { 'students-often-treat-the-tatsam': { steps: ['Have the student create a hierarchy chart of the forest designations from highest to lowest using the \'kCn Nfo\'.', 'Give them three compound sentences from the story text (not the exercise) and ask them to underline the two independent.', 'Ask them to rewrite one paragraph from the story replacing all Tatsam terms with simpler Hindi – then discuss what.', 'Finally, assign a timed practice: write a 50-word factual description of a school event using at least two Tatsam-style.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the Tatsam words as mere vocabulary to be memorized for meaning, not realizing that Renu uses them.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the factual description (lk{kkRdkj) exercise at the end of the chapter ("lk{kkRdkj vius&vki esa ,d foèkk gSA...") is better served by.', answer: 'Third-person objective report is more appropriate',
                  options: ['Third-person objective report is more appropriate', 'it\'s more emotional'],
                  hint: 'If stuck, review the \'kCn Nfo\' table in the textbook and practice identifying clauses in simple.',
                  misconception: 'Students often treat the Tatsam words as mere vocabulary to be memorized for meaning, not realizing that Renu uses them as *precision.' }
          ],
            remediations: { 'students-often-treat-the-tatsam': { steps: ['Have the student create a hierarchy chart of the forest designations from highest to lowest using the \'kCn Nfo\'.', 'Give them three compound sentences from the story text (not the exercise) and ask them to underline the two independent.', 'Ask them to rewrite one paragraph from the story replacing all Tatsam terms with simpler Hindi – then discuss what.', 'Finally, assign a timed practice: write a 50-word factual description of a school event using at least two Tatsam-style.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_012', difficulty: 'standard',
          question: '\'टेकु का इस्म+\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_07_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_07_009.',
          misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि आशय-सूचक प्रश्न का उत्तर **पाठ की किसी एक पंक्ति में \'छिपा\' होता है** जिसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'टेकु का इस्म+\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'टेकु का इस्म+\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'टेकु का इस्म+\' का कथानक', '\'टेकु का इस्म+\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_07_006 (मुख्य विषय और संदेश)** और **c11_hin_ar_cbse_07_009 (विरोधाभास.',
                  misconception: '**विशिष्ट भ्रांति:** विद्यार्थी मानते हैं कि आशय-सूचक प्रश्न का उत्तर **पाठ की किसी एक पंक्ति में \'छिपा\' होता है** जिसे ढूँढ़ना भर है.' }
          ],
            remediations: { 'keyword-matching': { steps: ['**पहला कदम:** विद्यार्थी को एक छोटा अंश (3-4 पंक्तियाँ) दें जिसमें **स्पष्ट कथन + निहित अर्थ** दोनों हों। पूछें: "यहाँ.', 'और लेखक *क्यों* ऐसा लिख रहा है?" — दोनों उत्तर अलग-अलग कॉलम में लिखवाएँ। 2.', '**दूसरा कदम:** **\'क्यों\' सीढ़ी (Why Ladder)** बनाएँ: प्रश्न → उत्तर 1 → "लेकिन क्यों?" → उत्तर 2 → "और गहराई से क्यों?".', '**तीसरा कदम:** दो समान प्रसंगों की **तुलना तालिका** बनवाएँ: एक में लेखक का समर्थन, दूसरे में विरोध — अंतर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
