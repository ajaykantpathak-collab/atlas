import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch08_p2: SimDef = {
    id: 'v3_c12_hin_a_ch08_p2',
    title: 'वद्यिापति · Part 2/3',
    subtitle: 'A weaver taught God to speak the market\'s language',
    classLevel: 12, subject: 'hin_a', topic: 'वद्यिापति · Part 2/3',
    chapters: ['c12_hin_a_ch08'],
    nodeIds: ['c12_hin_a_cbse_08_007', 'c12_hin_a_cbse_08_008', 'c12_hin_a_cbse_08_009', 'c12_hin_a_cbse_08_010', 'c12_hin_a_cbse_08_011', 'c12_hin_a_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Nirgun Bhakti reader', intro: 'In Kashi\'s weaving lanes, a poet stitched four tongues into one — and aimed it at both temples and mosques.', goal: 'Read Kabir through Nirgun Bhakti, Sadhukkari language and the weaver\'s world as spiritual metaphor.' },
    discovery: {
        question: 'A weaver from Kashi writes verses in Sadhukkari — a mongrel tongue mixing Braj, Avadhi, Persian and Arabic — while priests guarded Sanskrit. What was Kabir really refusing?',
        options: ['The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion', 'Elite languages are hard', 'He only knew dialect', 'Nothing — language is neutral'],
        answer: 'The gatekeeping itself — his mixed lingua franca spoke past Sanskrit and Persian elites straight to artisans and mystics; the language was the rebellion',
        hook: 'Don\'t confuse simple words with simple thought — his loom, his market, his courtyard are dense metaphysics in a worker\'s vocabulary. Life is cloth on the loom of time; see the weaving before it\'s finished. The weaver\'s craft is the epistemology.',
    },
    teaching: [
        { title: 'वद्यिापति — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'अंतरा भाग-2 — पाठ 8\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit at Kabir\'s loom: trace how a julaha\'s tools became metaphysical vocabulary, weigh Nirgun devotion against both orthodoxies, and hear a marketplace tongue carry the sublime.',
        labels: ['वद्यिापति — साहित्यिक युक्तियाँ', 'वद्यिापति — मुख्य भाव', 'वद्यिापति — गौण भाव', 'वद्यिापति — पदावली: कठिन', 'वद्यिापति — व्याकरण: पद्य', 'वद्यिापति — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_a_cbse_08_009', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Identify the literal meaning in each context: \'लगन लगी है\'.', 'Trace the symbol\'s extension: The poet says "मैं तो.', 'Contrast with what the villagers *have*: they have rituals.', 'Locate every occurrence of \'लगन\' and related words (लगी.', 'Connect to theme: The symbol \'लगन\' encapsulates the.'], answer: 'Locate every occurrence of \'लगन\' and related words (लगी. Identify the literal meaning in each context: \'लगन लगी है\'. Contrast with what the villagers *have*: they have rituals. Trace the symbol\'s extension: The poet says "मैं तो. Connect to theme: The symbol \'लगन\' encapsulates the.' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend\'s mother has been sinking into helpless waiting since her husband\'s posting abroad — she watches the gate all day and does nothing else. In the chapter\'s three-stanza poem, the separated woman ends by turning to the lamp and commanding it to stay lit so he can find his way home.',
            decisions: [{ prompt: 'What does that final stanza suggest your friend could offer her?', options: [
                { text: 'A ritual of agency — the poem\'s turn is from passive watching (the path) to doing something (keeping the lamp); helping her convert waiting into a nightly act — a lit lamp, a call scheduled, a task kept — changes despair into participation.', outcome: 'The stanza\'s climax is the moment she stops describing pain and acts on the world she can reach; the lamp becomes a collaborator, not just a symbol.' },
                { text: 'Reassure her that waiting itself is love enough — she shouldn\'t need to do anything.', outcome: 'The poem shows static watching is the anguish, not the answer — stanza 2 is exactly that passive night; the relief arrives only when she takes hold of a ritual.', reveals: 'waiting-is-enough' },
                { text: 'Distract her entirely — get her to stop thinking about him altogether.', outcome: 'The poem neither abandons the longing nor dissolves it in distraction — it channels it into a small commanded act; forgetting isn\'t the resolution, agency within the wait is.', reveals: 'distraction-equals-relief' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Kabir\'s \'simple\' words as surgical philosophy — and see language choice as the heart of his defiance.',
            decisions: [{ prompt: 'What comes next? वद्यिापति · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — वद्यिापति · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फंस रहे हैं, तो कक्षा 11 के नोड c11_hin_a_cbse_01_008 और c11_hin_a_cbse_02_009 की.',
          misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही समझते हैं और किसी भी संवेदी विवरण को प्रतीक मान लेते हैं, जैसे कि "तेरे बिन अब चाँद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंस रहे हैं, तो कक्षा 11 के नोड c11_hin_a_cbse_01_008 और c11_hin_a_cbse_02_009 की बिंब और.',
                  misconception: 'छात्र अक्सर प्रतीक और बिंब को एक ही समझते हैं और किसी भी संवेदी विवरण को प्रतीक मान लेते हैं, जैसे कि "तेरे बिन अब चाँद जैसा" को प्रतीक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि वद्यिापति की कविता से दो पंक्तियाँ ले आएँ: एक जहाँ स्पष्ट बिंब हो (जैसे "तेरे बिन अब हवा की खुशबू.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि छात्र मुख्य भाव और गौण भाव के बीच अंतर करने में कठिनाई महसूस कर रहा है, तो उसे.',
          misconception: 'छात्र अक्सर वद्यिापति की कविता में सबसे बार-बार आने वाले शब्द या चित्र (जैसे "नदी", "पेड़") को मुख्य भाव मान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र मुख्य भाव और गौण भाव के बीच अंतर करने में कठिनाई महसूस कर रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर वद्यिापति की कविता में सबसे बार-बार आने वाले शब्द या चित्र (जैसे "नदी", "पेड़") को मुख्य भाव मान लेते हैं, जबकि वास्तव में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि कविता की दो प्रति लें: एक में वे केवल उन शब्दों को घेरें जो बार-बार आते हैं (जैसे "पानी", "पेड़") और.', 'यह अभ्यास छात्र को रूप और содерж के बीच का अंतर समझने में मदद करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, revisit the \'Symbol Mapping\' exercise in ON_FAILURE and re-read the Theme nodes.',
          misconception: 'Students often confuse *symbolism* with *imagery*: they identify a concrete object (e.g., \'loom\') and call it a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit the \'Symbol Mapping\' exercise in ON_FAILURE and re-read the Theme nodes (006.',
                  misconception: 'Students often confuse *symbolism* with *imagery*: they identify a concrete object (e.g., \'loom\') and call it a symbol simply because it.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If a student cannot distinguish symbol from image, give them two columns: Column A = "Physical details in Poem 1 (loom.', 'Ask them to draw arrows mapping each physical detail to its abstract counterpart — if a detail has no abstract partner.', 'For irony confusion, give three index cards labeled "Verbal", "Situational", "Dramatic" and three quote cards from the.', 'Re-diagnose with Diagnostic Question 3 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि फंसे हों, तो c11_hin_a_cbse_01_010 पर वापस जाएँ और अभ्यास कीजिए कि कैसे एक शब्द के कई.',
          misconception: 'छात्र अक्सर मुहावरे \'बिनु\' को केवल एक archaic अव्यय मानते हैं और इसके भावनात्मक भार को अनदेखा कर देते हैं—जैसे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों, तो c11_hin_a_cbse_01_010 पर वापस जाएँ और अभ्यास कीजिए कि कैसे एक शब्द के कई अर्थ हो.',
                  misconception: 'छात्र अक्सर मुहावरे \'बिनु\' को केवल एक archaic अव्यय मानते हैं और इसके भावनात्मक भार को अनदेखा कर देते हैं—जैसे लिखते हैं कि यह सिर्फ \'बिना\'.' }
          ],
            remediations: { 'archaic': { steps: ['छात्र को दिखाइए कि \'बिनु\' के बिना वाक्य कैसा पड़ेगा—जैसे "बिनु प्यार के" को "प्यार के बिना" में बदलने पर कैसे भाव कम हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि फँसें तो c11_hin_a_cbse_08_011 में दिए गए पाठ में भाषा-प्रयोग के आधारभूत उदाहरणों को.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कोई पद्यांश सुंदर लगता है या उसमें अलंकार है, तो उसका भाषा-प्रयोग उत्कृष्ट है — वे भूल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो c11_hin_a_cbse_08_011 में दिए गए पाठ में भाषा-प्रयोग के आधारभूत उदाहरणों को पुनः पढ़िए.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कोई पद्यांश सुंदर लगता है या उसमें अलंकार है, तो उसका भाषा-प्रयोग उत्कृष्ट है — वे भूल जाते हैं कि भाषा-प्रयोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि पहले पद्यांश पढ़कर शब्दों के अर्थ जानिए; फिर प्रत्येक शब्द को तत्सम/तद्भव के रूप में लेबल कीजिए; फिर.', 'अंत में, एक ही भाव को अलग शब्दों से कहकर तुलना कीजिए — जैसे "म기ณ म기ณ बँधे बँधावन" को "बंधन में बंधा हुआ" से बदलकर देखिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_08_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 8\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फंसे हों तो कविता के भावार्थ (c12_hin_a_cbse_08_002) और अलंकार.',
          misconception: 'विद्यार्थी अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ से सीधा उद्धरण देकर सोचते हैं कि उनका कार्य पूरा हो गया है, जैसे कि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 8\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 8\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 8\' का कथानक — \'अंतरा भाग-2 — पाठ 8\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 8\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे हों तो कविता के भावार्थ (c12_hin_a_cbse_08_002) और अलंकार (c12_hin_a_cbse_08_006) को.',
                  misconception: 'विद्यार्थी अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ से सीधा उद्धरण देकर सोचते हैं कि उनका कार्य पूरा हो गया है, जैसे कि प्रश्न "कवि ने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति पर दो तरह के प्रश्न कैसे बन सकते हैं: - वस्तुनिष्ठ: "कविता में \'नीलकंठ\' शब्द किस stanza.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
