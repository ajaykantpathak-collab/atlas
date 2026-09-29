import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch03_p2: SimDef = {
    id: 'v3_c12_hin_v_ch03_p2',
    title: 'अतीत में दबे पाँव · Part 2/3',
    subtitle: 'Fifteen years of glory, five centuries of silence',
    classLevel: 12, subject: 'hin_v', topic: 'अतीत में दबे पाँव · Part 2/3',
    chapters: ['c12_hin_v_ch03'],
    nodeIds: ['c12_hin_v_cbse_03_007', 'c12_hin_v_cbse_03_008', 'c12_hin_v_cbse_03_009', 'c12_hin_v_cbse_03_010', 'c12_hin_v_cbse_03_011', 'c12_hin_v_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical travelogue reader', intro: 'A writer stands among red-sandstone ruins and rebuilds Akbar\'s abandoned capital in prose.', goal: 'Read the chapter as reconstruction — architectural evidence, urban planning and the paradox of a city built to last that didn\'t.' },
    discovery: {
        question: 'Fatehpur Sikri was built for eternity — then abandoned within fifteen years, its silence loud under the Buland Darwaza. What makes the ruin worth reconstructing?',
        options: ['The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone', 'Tourist value', 'Mughal nostalgia', 'Pretty sandstone'],
        answer: 'The text\'s thesis — \'among the world\'s two most magnificent cities\' isn\'t flattery but a benchmark the ruins must now answer to, stone by stone',
        hook: 'Don\'t mistake it for a romantic travelogue — the writer records workers\' quarters, graded housing and cheap labour inside the glory. \'Prachin\' signals reconstruction: read the architecture as evidence for a lost urban order, caste-free craft zoning and planned water — not just ornament.',
    },
    teaching: [
        { title: 'अतीत में दबे पाँव — गौण विषय', text: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk the ghost capital like an archaeologist: cluster the proper nouns into rulers, monuments and events, weigh the planned-city claim against the labour it cost, and measure ruins against the boast.',
        labels: ['अतीत में दबे पाँव'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_008', title: 'अतीत में दबे पाँव — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' में बिंब ढूँढिए — वखत-खि-अगवत्स-नमकस-और-गालिब-की-पूर्व — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor, and which one does the author use when describing the Great Bath as "flaèkq ?kkVh.', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "the ruins *are like* a book")', outcome: 'A simile compares two things using "like" or "as" (e.g., "the ruins *are like* a book"); a metaphor.' },
                { text: '*any* descriptive detail is imagery', outcome: 'Not quite — Students consistently confuse **imagery** with **description** — they think *any* descriptive.', reveals: 'students-consistently-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_010', title: 'अतीत में दबे पाँव — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के मुख्य शब्द: वखत-खि-अगवत्स-नमकस-और-गालिब-की-पूर्व — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Identify the semantic field (category of meaning) to which the word "लरवि" belongs in the context of this chapter, and quote the specific.', options: [
                { text: 'Correct answer: "लरवि" belongs to the architectural/urban planning semantic field', outcome: 'Correct answer: "लरवि" belongs to the architectural/urban planning semantic field.' },
                { text: 'historical period', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'cultural practice', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_011', title: 'अतीत में दबे पाँव — व्याकरण: पाठ में भाषा-प्रयोग',
          caseStudy: { intro: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the predominant verb voice used in the descriptive passages of the chapter (e.g., "खुदाई की गई", "अवशेष मिले") and state its.', options: [
                { text: 'The predominant voice is कर्मण्य प्रयोग (passive voice), formed with past participle +', outcome: 'The predominant voice is कर्मण्य प्रयोग (passive voice), formed with past participle + auxiliary.' },
                { text: 'कर्तृ प्रयोग', outcome: 'Not quite — Students treat "language usage" as merely identifying word meanings or spotting figures of speech.', reveals: 'students-treat-language-usage-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a smart-city meeting in your town, a planner pitches clearing an old quarter for a parking complex: \'It\'s just decayed walls — real progress is glass and concrete, not ruins.\'',
            decisions: [{ prompt: 'How does the Rajgir chapter answer that pitch?', options: [
                { text: 'Ancient Rajgir\'s ruins document a city with planned streets, drains and housing without caste barriers — a \'society-governed\' civilisation; the author contrasts its civic wisdom with today\'s chaotic neglect precisely to show modernity excavated the history but didn\'t learn it.', outcome: 'The chapter\'s argument: the ruins aren\'t the opposite of progress but a rebuke to it — the \'decayed walls\' hold urban planning and social ethics the glass-and-concrete pitch hasn\'t matched.' },
                { text: 'Side with the planner — sentimentality about ruins can\'t run a modern city.', outcome: 'The chapter isn\'t nostalgia — it\'s a comparison of civic competence: the ancient city governed itself socially where the modern one only manages to excavate; dismissing the walls discards the evidence, not the sentiment.', reveals: 'ruins-equal-stagnation' },
                { text: 'Propose freezing the whole quarter as a museum — heritage must be untouched.', outcome: 'The author\'s point is that Rajgir was lived-in and socially governed, not embalmed; turning it into a sealed exhibit repeats the mistake of treating civic life as a monument instead of a model to inhabit.', reveals: 'heritage-means-freeze' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a travelogue as urban history — where a dead city\'s plan still argues what a city could be.',
            decisions: [{ prompt: 'What comes next? अतीत में दबे पाँव · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — अतीत में दबे पाँव · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_007', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के गौण विषय — मुख्य विषय के साथ चलने.',
          hint: 'यदि अटका हुआ महसूस हो, तो **c12_hin_v_cbse_03_006 (मुख्य विषय और संदेश)** पर लौटें.',
          misconception: '**विशिष्ट भ्रांति:** "गौण विषय = कम अंक वाला विषय / वैकल्पिक विषय / केवल प्रसंगों की सूची।" **वास्तविकता:** CBSE बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के गौण विषय',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो, तो **c12_hin_v_cbse_03_006 (मुख्य विषय और संदेश)** पर लौटें — मुख्य विषय को.',
                  misconception: '**विशिष्ट भ्रांति:** "गौण विषय = कम अंक वाला विषय / वैकल्पिक विषय / केवल प्रसंगों की सूची।" **वास्तविकता:** CBSE बोर्ड में गौण विषय पर.' }
          ],
            remediations: { 'cbse-4-6': { steps: ['**पुनः पठन (Re-read):** पाठ के वे 3-4 प्रसंग चिह्नित करें जो मुख्य कथानक (लेखक की स्मृति-यात्रा) से सीधे नहीं जुड़े.', '**तालिका बनाएं:** तीन कॉलम — (क) गौण विषय का नाम, (ख) पाठ्य-साक्ष्य (पंक्ति/प्रसंग), (ग) मुख्य विषय से संबंध.', '**PEEL अभ्यास:** प्रत्येक गौण विषय के लिए एक PEEL अनुच्छेद लिखें। 4.', '**पुनः निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_2 और 4 को दोबारा हल करें — यदि अब उत्तर में \'कार्यात्मक विश्लेषण\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_008', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' में बिंब (imagery) — शब्दों से बने जीवंत.',
          hint: 'If stuck, return to Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_008) and re-do the.',
          misconception: 'Students consistently confuse **imagery** with **description** — they think *any* descriptive detail is imagery.',
          parts: [
                { id: 'a', prompt: 'The author writes: "ekSle tkM+s dk Fkk ij nqigj dh èkwi cgqr dM+h FkhA lkjs vkye dks tSls ,d iQhosQ jax esa jaxus dh dksf\'k\'k djrh gqbZ" (The evening sun.', answer: '**Visual imagery** dominates',
                  options: ['**Visual imagery** dominates', 'tactile', 'auditory', 'explain the effect'],
                  hint: 'If stuck, return to Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_008) and re-do the "sense-mapping".',
                  misconception: 'Students consistently confuse **imagery** with **description** — they think *any* descriptive detail is imagery.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['**Re-teach the sense-test**: Give the student 5 sentences from the text (e.g., "nwljh eaf"ky ij f[kM+fd;k¡" — visual.', 'Ask: *Which sense organ receives this?* If they cannot name the organ, it\'s not imagery.', '**Metaphor surgery**: Take a simile from the text ("tSls lqcg yksx" — like naked people) and convert it to metaphor.', 'Ask: *What changed in meaning?* The shift from comparison to identity is the lesson.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse **imagery** with **description** — they think *any* descriptive detail is imagery.',
          parts: [
                { id: 'a', prompt: 'Create a 4-line poetic response (in Hindi or English) from the perspective of a Harappan brick, using **one metaphor** and **two distinct types of imagery**.', answer: '**Example response:** "I am the *backbone* of a city that forgot its name',
                  options: ['**Example response:** "I am the *backbone* of a city that forgot its name', 'I am *like* a backbone', '*any* descriptive detail is imagery'],
                  hint: 'If stuck, return to Class 11 Aroh Chapter 3 (c11_hin_ar_cbse_03_008) and re-do the "sense-mapping".',
                  misconception: 'Students consistently confuse **imagery** with **description** — they think *any* descriptive detail is imagery.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['**Re-teach the sense-test**: Give the student 5 sentences from the text (e.g., "nwljh eaf"ky ij f[kM+fd;k¡" — visual.', 'Ask: *Which sense organ receives this?* If they cannot name the organ, it\'s not imagery.', '**Metaphor surgery**: Take a simile from the text ("tSls lqcg yksx" — like naked people) and convert it to metaphor.', 'Ask: *What changed in meaning?* The shift from comparison to identity is the lesson.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_009', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' में विरोधाभास — विपरीत बातें मिलकर गहरा.',
          hint: 'If stuck, re-read the "Before You Read" context (node c12_hin_v_cbse_03_001) and the.',
          misconception: 'Students often confuse irony with mere coincidence or sadness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' में विरोधाभास',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read the "Before You Read" context (node c12_hin_v_cbse_03_001) and the "Setting and.',
                  misconception: 'Students often confuse irony with mere coincidence or sadness.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Re-read the opening and closing paragraphs of the chapter aloud; mark every phrase that contrasts past and present.', 'For each marked phrase, ask: "Is there a contradiction between expectation (from the name, original purpose, or past.', 'List every physical object described in detail (stupa, pillars, lion capital, museum, pathways).', 'For each, write one abstract noun it could represent (e.g., stupa → continuity; broken pillar → fragility of empire).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_010', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' की पदावली — मुख्य शब्द और प्रयोग जो.',
          hint: 'If stuck on a word, apply the "Modifier Hunt" technique: locate the word in the text.',
          misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write single-word synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' की पदावली',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on a word, apply the "Modifier Hunt" technique: locate the word in the text, copy the full.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from surrounding words" and write single-word synonyms (e.g., लरवि = किला).' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student re-read the "लरवि" paragraph (page 39) and physically underline every adjective, verb, and.', 'Ask them to sort these modifiers into "physical description" vs. "functional significance" columns.', 'Model the inference: "Because the text says \'लरवि के दोनों ओर द्वार हैं...', 'Assign the same exercise for "ओककक" and "खखखख" as homework; require a 3-sentence justification per word citing specific.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_011', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने.',
          hint: 'If stuck on participle identification, review Class 11 Vitan grammar nodes.',
          misconception: 'Students treat "language usage" as merely identifying word meanings or spotting figures of speech.',
          parts: [
                { id: 'a', prompt: 'Explain why the author uses तत्सम (Sanskrit-derived) compounds like "पुरातात्त्विक", "ऐतिहासिक", "सांस्कृतिक" instead of their तद्भव or देशज equivalents in the.', answer: 'These तत्सम words establish an academic, authoritative register appropriate for',
                  options: ['These तत्सम words establish an academic, authoritative register appropriate for', 'they sound more difficult', 'the author wanted to show off vocabulary'],
                  hint: 'If stuck on participle identification, review Class 11 Vitan grammar nodes (c11_hin_v_cbse_01_011.',
                  misconception: 'Students treat "language usage" as merely identifying word meanings or spotting figures of speech.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['Have the student highlight every verb in two paragraphs — color-code: red for passive, blue for active, green for.', 'Ask: "Who does the action in red verbs?', 'Read a colloquial version of the same paragraph aloud — have them list *exact* grammatical differences (tense, voice.', 'Revisit c11_hin_v_cbse_01_011 (Class 11 Grammar node) for participle identification drill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_03_012', difficulty: 'standard',
          question: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में.',
          hint: 'यदि छात्र आशय-सूचक प्रश्नों में \'क्या\' (What) और \'क्यों\' (Why) का अंतर नहीं कर पा रहा, तो.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्नों का उत्तर पाठ की पंक्तियों को ज्यों-का-त्यों उद्धृत (Quote).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का कथानक', '\'वखत खि अगवत्स-नमकस और गालिब की पूर्व\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र आशय-सूचक प्रश्नों में \'क्या\' (What) और \'क्यों\' (Why) का अंतर नहीं कर पा रहा, तो तुरंत.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्नों का उत्तर पाठ की पंक्तियों को ज्यों-का-त्यों उद्धृत (Quote) करके या उनका हिंदी.' }
          ],
            remediations: { 'quote-inferential-evidence': { steps: ['**चरणबद्ध उपचार (Remediation Path):** 1.', '**निदान (Diagnose):** छात्र से एक आशय-सूचक प्रश्न पूछें और उसका उत्तर लिखवाएँ। यदि वह पंक्तियाँ कॉपी करता है या केवल.', '**स्पष्टीकरण (Clarify):** उसे समझाएँ — "पाठ = कच्चा माल (Raw Material), तुम्हारा दिमाग = फैक्ट्री, उत्तर = तैयार माल.', '**अभ्यास (Guided Practice):** पाठ के 3-4 छोटे अंश दें। प्रत्येक के लिए कहें: (क) एक वस्तुनिष्ठ प्रश्न बनाओ, (ख) एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
