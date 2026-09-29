import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch06_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch06_p2',
    title: 'पाठ 6 · Part 2/3',
    subtitle: 'Watch a tuition room become the whole education system in miniature.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 6 · Part 2/3',
    chapters: ['c11_hin_ar_ch06'],
    nodeIds: ['c11_hin_ar_cbse_06_007', 'c11_hin_ar_cbse_06_008', 'c11_hin_ar_cbse_06_009', 'c11_hin_ar_cbse_06_010', 'c11_hin_ar_cbse_06_011', 'c11_hin_ar_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a spectator trapped in one room with the exam machine', intro: 'A mother sweeping, a teacher collecting fees, a student drowning — and a one-act play that won\'t open a window.', goal: 'Analyse the one-act form\'s unity and compression as a critique of tuition culture.' },
    discovery: {
        question: 'Usha Priyamvada\'s one-act play ends with जटुह deciding to start a movement — no tidy solution. Is that a weak ending?',
        options: ['No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself', 'Yes — a play must resolve its conflict', 'Yes — starting a movement solves nothing for the boy', 'No — but only because sequels were planned'],
        answer: 'No — the open end refuses a false fix; the claustrophobic single room was always the trapped system itself',
        hook: 'One room, one act, no exits — the form itself is the argument: students and parents have nowhere to step out to.',
    },
    teaching: [
        { title: 'पाठ 6 — गौण विषय', text: '\'आरोह भाग-1 — पाठ 6\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the entrances and exits as French scenes, place the climax where the tuition teacher confronts the principal, and defend the unresolved close.',
        labels: ['पाठ 6 — गौण', 'पाठ 6 — साहित्यिक', 'पाठ 6 — पदावली', 'पाठ 6 — व्याकरण', 'पाठ 6 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_008', title: 'पाठ 6 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 6\' में बिंब ढूँढिए — आरोह-भाग-1-—-पाठ-6 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, and give one example of each from everyday language (not from the textbook).', options: [
                { text: 'Imagery: language that creates sensory impressions (e.g., "The kitchen smelled of frying', outcome: 'Imagery: language that creates sensory impressions (e.g., "The kitchen smelled of frying onions and.' },
                { text: 'Time is like a thief', outcome: 'Not quite — Students often think imagery is only visual ("pictures in the mind") and miss auditory, olfactory.', reveals: 'imagery-is-only-visual-pictures' },
                { text: 'The sky was blue', outcome: 'Not quite — Students often think imagery is only visual ("pictures in the mind") and miss auditory, olfactory.', reveals: 'imagery-is-only-visual-pictures' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_009', title: 'पाठ 6 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 6\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'पाठ 6 के प्रसंग में \'विरोधाभास\' की परिभाषा लिखिए और बताइए कि यह सामान्य विरोधाभास (logical contradiction) से कैसे भिन्न है।', options: [
                { text: '**Correct Answer:** साहित्यिक विरोधाभास (विरोधाभास अलंकार/युक्ति) वह है जहाँ दो विरोधी', outcome: '**Correct Answer:** साहित्यिक विरोधाभास (विरोधाभास अलंकार/युक्ति) वह है जहाँ दो विरोधी बातें एक साथ.' },
                { text: 'मृत्यु ही जीवन है', outcome: 'Not quite — **Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn.', reveals: 'specific-error-students-identify-any' },
                { text: 'यह कथन झूठा है', outcome: 'Not quite — **Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn.', reveals: 'specific-error-students-identify-any' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_011', title: 'पाठ 6 — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 6\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Define डक्सम फेफ्डलाक्स and डक्सम फ्लोफपाक्स in your own words, giving one original example from the play for each.', options: [
                { text: 'डक्सम फेफ्डलाक्स = inserting a single English word into a Hindi sentence (e.g., "V~;w\'ku"', outcome: 'डक्सम फेफ्डलाक्स = inserting a single English word into a Hindi sentence (e.g., "V~;w\'ku".' },
                { text: 'code-mixing', outcome: 'Not quite — Students often think "code-mixing" just means "using English words in Hindi" and treat every.', reveals: 'code-mixing-just-means-using' },
                { text: 'using English words in Hindi', outcome: 'Not quite — Students often think "code-mixing" just means "using English words in Hindi" and treat every.', reveals: 'code-mixing-just-means-using' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your drama club is rehearsing Usha Priyamvada\'s one-act play about a family fighting over a son\'s tuition fees. The student director plans to \'break it into three scenes for variety\' and end with an uplifting speech where the parents renounce tuition.',
            decisions: [{ prompt: 'Why do both changes betray the play\'s design?', options: [
                { text: 'Hold the form: it\'s a one-act play — a single continuous act where every entrance and exit (French scenes) turns the same screw tighter. Splitting it into \'scenes\' breaks the compression that mirrors the student\'s inescapable pressure. And the happy ending kills the point: the Nayi Kahani one-acter refuses easy solutions, forcing the audience to sit with a system that commodifies childhood.', outcome: 'The production keeps its claustrophobia: one unbroken space, one unbroken pressure — discomfort is the playwright\'s method, not a flaw to fix.' },
                { text: 'Allow the scene breaks — entrances and exits are just like act divisions anyway.', outcome: 'French scenes are character shifts inside one continuous act, not act breaks; treating them as divisions imports a multi-act logic the form deliberately refuses.', reveals: 'french-scenes-are-acts' },
                { text: 'Keep the uplifting finale — audiences prefer resolution, and it gives the play a message.', outcome: 'The resolution would lie: the play\'s power is making the tuition trap felt without an exit — solving it on stage lets the audience off the hook.', reveals: 'happy-ending-improves-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'The play compresses everything a novel would spread out — that\'s why the pressure on one student\'s homework feels inescapable.',
            decisions: [{ prompt: 'What comes next? पाठ 6 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 6 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_007', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय स्पष्ट न हो तो नोड 006 (मुख्य विषय और संदेश) पर लौटें — विशेषकर \'मुख्य.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'पक्ष कथा\' (sub-plot) समझकर केवल **घटनाओं की सूची** बना देते हैं (जैसे: \'नायिका.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मुख्य विषय स्पष्ट न हो तो नोड 006 (मुख्य विषय और संदेश) पर लौटें — विशेषकर \'मुख्य विषय कैसे.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'पक्ष कथा\' (sub-plot) समझकर केवल **घटनाओं की सूची** बना देते हैं (जैसे: \'नायिका का बीमार पड़ना\'.' }
          ],
            remediations: { 'sub-plot': { steps: ['**अवधारणा स्पष्ट करें:** छात्र से कहें — \'घटना = कैमरे से दिखने वाला दृश्य; गौण विषय = उस दृश्य का अर्थ/संदेश। जैसे.', '**अभ्यास दें:** पाठ 6 के 5 प्रसंग दें; प्रत्येक के लिए पूछें — \'यहाँ क्या हो रहा है?\' (घटना) → \'यह क्या कहना चाहता है?\'.', '**संबंध जोड़ें:** प्रत्येक पहचाने गए गौण विषय के लिए पूछें — \'यह मुख्य विषय को कैसे आगे बढ़ाता है?\' — लिखित में.', '**उत्तर-लेखन ढाँचा दें:** तालिका प्रारूप (गौण विषय | प्रसंग/साक्ष्य | मुख्य विषय से संबंध) में 2 उदाहरण हल करवाएँ। फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_008', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, re-read the stage directions on pages 70 and 73 and the principal\'s monologue.',
          misconception: 'Students often think imagery is only visual ("pictures in the mind") and miss auditory, olfactory, tactile, gustatory.',
          parts: [
                { id: 'a', prompt: 'Find a metaphor in जटुह\'s dialogue on page 72 where he compares the education system to something else.', answer: 'Line: "यह तो भट्टी है, भट्टी!" (This is a furnace, a furnace!)',
                  options: ['Line: "यह तो भट्टी है, भट्टी!" (This is a furnace, a furnace!)', 'जैसे भट्टी', 'it\'s hot', 'pictures in the mind'],
                  hint: 'If stuck, re-read the stage directions on pages 70 and 73 and the principal\'s monologue on page 80.',
                  misconception: 'Students often think imagery is only visual ("pictures in the mind") and miss auditory, olfactory, tactile, gustatory images.' }
          ],
            remediations: { 'imagery-is-only-visual-pictures': { steps: ['Sensory walk: Take the student through a परिचित scene (school canteen at lunch).', 'Taste?" List five sensory details.', 'Metaphor mapping: Give a simple metaphor ("Homework is a mountain").', 'Draw two columns: Source (mountain) → Target (homework).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_009', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review **c11_hin_ar_cbse_06_008 (बिंब और रूपक)** — specifically the worked.',
          misconception: '**Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn as a paradox.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_06_008 (बिंब और रूपक)** — specifically the worked example.',
                  misconception: '**Specific Error:** Students identify *any* recurring object as a symbol and *any* surprising turn as a paradox.' }
          ],
            remediations: { 'specific-error-students-identify-any': { steps: ['**Concrete → Abstract Drill:** Pick a concrete object from the student’s room (e.g., a cracked phone screen).', 'Ask: "What does it *literally* mean?', 'Now, if this were in a story about \'broken communication\', what could it mean at the start (carelessness)?', 'At the climax (irreparable rift)?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_010', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review **\'प्रतीक और विरोधाभास\' (node 009)** — because most मुख्य शब्द in this.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "मुख्य शब्द = पाठ में आए कठिन/अनजान शब्द जिनके अर्थ शब्दकोश से ढूँढ़ने हैं।".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review **\'प्रतीक और विरोधाभास\' (node 009)** — because most मुख्य शब्द in this chapter.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "मुख्य शब्द = पाठ में आए कठिन/अनजान शब्द जिनके अर्थ शब्दकोश से ढूँढ़ने हैं।" **क्यों होती है:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पाठ पढ़ें** केवल मुख्य शब्दों को घेरते हुए — अर्थ नहीं, **स्थिति** (position) नोट करें: किस संवाद में?', '**एक शब्द चुनें** (जो सबसे ज्यादा बार आया हो)। उसके **सभी प्रसंग** एक कॉलम में लिखें। दूसरे कॉलम में प्रत्येक प्रसंग का.', '**तीसरे कॉलम में** लिखें: "यह अर्थ पिछले प्रसंग से कैसे अलग/आगे है?" 4.', 'शिक्षक से पूछें: "क्या इस शब्द का अर्थ-परिवर्तन पाठ के **विषय-परिवर्तन** (thematic shift) को दर्शाता है?" — यही.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_011', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'Review Class 10 Hindi grammar: पद परिचय (parts of speech) and वाक्य विचार (sentence.',
          misconception: 'Students often think "code-mixing" just means "using English words in Hindi" and treat every English-origin word.',
          parts: [
                { id: 'a', prompt: 'Explain why the playwright makes the school director (funs\'kd) say "cksMZ dk dke gh ;g gS fd f\'k{kk osQ izpkj&izlkj esa ftruk Hkh gks losQ lg;ksx djsA" while.', answer: 'The director uses bureaucratic register ("izpkj&izlkj", "lg;ksx") to legitimise',
                  options: ['The director uses bureaucratic register ("izpkj&izlkj", "lg;ksx") to legitimise', 'code-mixing', 'using English words in Hindi'],
                  hint: 'Review Class 10 Hindi grammar: पद परिचय (parts of speech) and वाक्य विचार (sentence structure).',
                  misconception: 'Students often think "code-mixing" just means "using English words in Hindi" and treat every English-origin word as identical.' }
          ],
            remediations: { 'code-mixing-just-means-using': { steps: ['Give the student a two-column table: Column A = 5 sentences from the play with English words; Column B = labels.', 'Ask them to circle the English element and draw an arrow to the Hindi grammatical slot it occupies (noun slot, verb.', 'Have them explain aloud: "This word sits in a Hindi noun phrase → फेफ्डलाक्स" vs.', '"This phrase forces Hindi word order to change → फ्लोफपाक्स".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_06_012', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 6\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो c11_hin_ar_cbse_06_002 (कथानक संरचना) और c11_hin_ar_cbse_06_006 (मुख्य विषय).',
          misconception: 'छात्रों की सबसे गहरी भ्रांति यह है कि \'आशय-सूचक प्रश्न का उत्तर लंबा लिखने से अंक मिलते हैं\' — इसलिए वे पाठ के बड़े अंश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 6\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 6\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 6\' का कथानक — \'आरोह भाग-1 — पाठ 6\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 6\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_06_002 (कथानक संरचना) और c11_hin_ar_cbse_06_006 (मुख्य विषय) को दोहराएँ.',
                  misconception: 'छात्रों की सबसे गहरी भ्रांति यह है कि \'आशय-सूचक प्रश्न का उत्तर लंबा लिखने से अंक मिलते हैं\' — इसलिए वे पाठ के बड़े अंश नकल कर देते हैं या.' }
          ],
            remediations: { 'point-wise-analysis': { steps: ['चरण 1: छात्र को एक छोटा गद्यांश (5-6 वाक्य) दें और कहें: "इसमें से तीन तथ्य निकालो जो कोई भी पढ़कर बता सकता है" — यह.', '\'दुखी\' या \'निराश\' क्यों नहीं?" — यह आशय-सूचक सोच की शुरुआत है। चरण 3: छात्र को दोनों प्रकार के 5-5 प्रश्न बनाने को कहें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
