import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch14_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch14_p2',
    title: 'शरिीष के फूल · Part 2/3',
    subtitle: 'The flag was born in a struggle — then the nation stopped looking',
    classLevel: 12, subject: 'hin_ar', topic: 'शरिीष के फूल · Part 2/3',
    chapters: ['c12_hin_ar_ch14'],
    nodeIds: ['c12_hin_ar_cbse_14_007', 'c12_hin_ar_cbse_14_008', 'c12_hin_ar_cbse_14_009', 'c12_hin_ar_cbse_14_010', 'c12_hin_ar_cbse_14_011', 'c12_hin_ar_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political-essay reader', intro: 'A scholar-activist watches the tricolor fade on a government school roof and reads a whole nation\'s fatigue in it.', goal: 'Read Jhande ki Phool/flag essay as a diagnosis of national morality — symbol versus substance.' },
    discovery: {
        question: 'A poet paints the tricolor with reverence — years later it\'s a torn rag on a rusted pole, used for mundane purposes. Why does the author call the flag a \'living being\'?',
        options: ['Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition', 'Flags wear out naturally', 'Poetic exaggeration', 'It moves in wind'],
        answer: 'Because it has a life-cycle — born in the freedom struggle, aged by neglect; its physical condition is the nation\'s moral condition',
        hook: 'The state guards the flag\'s display rules; the author asks whether it still embodies justice — ritualistic patriotism versus ethical substance. For him no science, politics or religion outranks humanity; the flag is a moral contract, not a protocol object.',
    },
    teaching: [
        { title: 'शरिीष के फूल — गौण विषय', text: '\'फकीर धुनी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the flag as the nation\'s pulse: trace its arc from tryst-with-destiny to faded neglect, weigh reverence against ritual, and ask what a torn tricolor diagnoses.',
        labels: ['शरिीष के फूल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_007', title: 'शरिीष के फूल — गौण विषय',
          caseStudy: { intro: '\'फकीर धुनी\' में फकीर-धुनी जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: '**REMEMBER LEVEL**: Define \'secondary theme\' in your own words and give ONE example of a secondary theme from any Class 11 or 12 Hindi Aroh.', options: [
                { text: 'A secondary theme is a significant recurring idea that supports and adds layers to the', outcome: 'A secondary theme is a significant recurring idea that supports and adds layers to the main.' },
                { text: 'corruption', outcome: 'Not quite — **Misconception**: "Secondary themes are just \'sub-topics\' or \'minor topics\' mentioned in the.', reveals: 'misconception-secondary-themes-are-just' },
                { text: 'corruption" is a theme', outcome: 'Not quite — **Misconception**: "Secondary themes are just \'sub-topics\' or \'minor topics\' mentioned in the.', reveals: 'misconception-secondary-themes-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_010', title: 'शरिीष के फूल — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'फकीर धुनी\' के मुख्य शब्द: फकीर-धुनी — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'Define "context clue" in your own words and give one example from the story "फकीरचंद" where a word\'s meaning changes based on its.', options: [
                { text: 'A context clue is a hint within the surrounding text (words, phrases, sentences) that', outcome: 'A context clue is a hint within the surrounding text (words, phrases, sentences) that helps infer.' },
                { text: 'context clue means looking in a dictionary', outcome: 'Not quite — Students treat the end-of-chapter glossary ("शब्दार्थ") as the *only* authoritative meaning.', reveals: 'students-treat-the-end-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college\'s broken hostel bench gets a fresh coat of paint for inspection day — splinters and all — and the warden declares the issue \'resolved.\' The repair request you filed months ago is still \'under process.\'',
            decisions: [{ prompt: 'What does \'फखरुद्दीन की खाट\' see in the painted bench?', options: [
                { text: 'The cot painted by the bureaucrat — surface performance standing in for repair; the story\'s unresolved ending, where the cot never reaches the museum, performs the same deferral your \'under process\' request is trapped in.', outcome: 'The chapter reads the paint as the critique: cosmetic attention is how the system answers demand without meeting it — the structure denies resolution because the institution does.' },
                { text: 'Accept it — at least something visible was done; half a fix beats none.', outcome: 'The story\'s whole satire depends on refusing that bargain: paint over rot is precisely the bureaucrat\'s move — it photographs as action while the object stays broken underneath.', reveals: 'cosmetic-counts-as-fix' },
                { text: 'Treat it as proof the system works — the request clearly reached someone who acted.', outcome: 'Action timed to inspection isn\'t the request being processed; the story distinguishes performance-for-audience from accountability — the file stays open because the gesture closed the matter.', reveals: 'inspection-response-equals-resolution' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a national symbol as a moral diagnostic — and tell display-patriotism from the justice the cloth was meant to carry.',
            decisions: [{ prompt: 'What comes next? शरिीष के फूल · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शरिीष के फूल · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_007', difficulty: 'standard',
          question: '\'फकीर धुनी\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck on distinguishing primary vs. secondary themes, review Node 006\'s worked.',
          misconception: '**Misconception**: "Secondary themes are just \'sub-topics\' or \'minor topics\' mentioned in the chapter — like \'Urdu.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' के गौण विषय',
                  options: ['\'फकीर धुनी\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on distinguishing primary vs. secondary themes, review Node 006\'s worked examples and.',
                  misconception: '**Misconception**: "Secondary themes are just \'sub-topics\' or \'minor topics\' mentioned in the chapter — like \'Urdu language\', \'Old Delhi.' }
          ],
            remediations: { 'misconception-secondary-themes-are-just': { steps: ['**Revisit Primary Theme (Node 006)**: Re-read the primary theme statement.', 'Ask: "What *other* big questions does the text ask *while* answering the primary one?" 2.', '**Topic-to-Theme Conversion Drill**: Take 3 topics from the chapter (e.g., "metro", "haveli", "craftsman").', 'For each, write a *thematic statement*: "The metro represents ______." → "The metro represents the *violent imposition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_008', difficulty: 'standard',
          question: '\'फकीर धुनी\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके: **c11_hin_ar_cbse_14_008** (कक्षा 11 का समान नोड) के **WORKED_EXAMPLE_1,2**.',
          misconception: '**सबसे घातक भ्रम:** छात्र **बिंब = वर्णन (description)** और **रूपक = उपमा (simile)** मानते हैं। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' में बिंब (imagery)',
                  options: ['\'फकीर धुनी\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: **c11_hin_ar_cbse_14_008** (कक्षा 11 का समान नोड) के **WORKED_EXAMPLE_1,2** दोहराओ — वहाँ.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **बिंब = वर्णन (description)** और **रूपक = उपमा (simile)** मानते हैं। **वास्तविकता:** - **बिंब** वर्णन नहीं.' }
          ],
            remediations: { 'description-simile': { steps: ['**पुनः पढ़ो:** पाठ के पहले दो पैराग्राफ **धीरे-धीरे बोलकर** पढ़ो — हर वाक्य पर रुको और पूछो: "मेरी कौन-सी इंद्रिय.', '**तालिका बनाओ:** दो कॉलम — **बिंब पद** | **इंद्रिय श्रेणी**। कम से कम 5 प्रविष्टियाँ भरो। 3.', '**रूपक-शल्यक्रिया:** पाठ से 3 वाक्य चुनो जहाँ \'है/था/थी\' के बाद सीधे संज्ञा आए (जैसे "स्मृति शिरीष है")। प्रत्येक के.', '**परीक्षा-अभ्यास:** CBSE 2023-24 सैंपल पेपर के **\'आशय स्पष्ट कीजिए\'** प्रश्न (पाठ-आधारित) हल करो — उत्तर में बिंब/रूपक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_009', difficulty: 'standard',
          question: '\'फकीर धुनी\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि फँसें तो: नोड 008 (बिंब और रूपक) के WORKED_EXAMPLE_1 व 2 को पुनः हल करें — विशेष रूप.',
          misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभास अलंकार (Oxymoron)** को एक मान लेते हैं। Oxymoron = दो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' में विरोधाभास',
                  options: ['\'फकीर धुनी\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो: नोड 008 (बिंब और रूपक) के WORKED_EXAMPLE_1 व 2 को पुनः हल करें — विशेष रूप से \'रूपक.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **विरोधाभास (Paradox)** और **विरोधाभास अलंकार (Oxymoron)** को एक मान लेते हैं। Oxymoron = दो विरोधी **शब्द** साथ.' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron': { steps: ['**चरण 1 — अवधारणा स्पष्टीकरण (15 मिनट):** छात्र को दो कॉलम बनाने को कहें: Column A: Oxymoron (पद-युग्म), Column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_010', difficulty: 'standard',
          question: '\'फकीर धुनी\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on connotation: Revisit Class 11 Chapter 14 node 009 (Irony/Symbolism) — the.',
          misconception: 'Students treat the end-of-chapter glossary ("शब्दार्थ") as the *only* authoritative meaning.',
          parts: [
                { id: 'a', prompt: 'In the sentence "फूँक मारकर उसने दीया बुझा दिया", the word "फूँक" is used. But earlier, the glossary defines "फूँक" as "वीर्यल उकेद ओक़्" (a specialized term).', answer: 'Contextual meaning: "फूँक" here means a deliberate, controlled breath',
                  options: ['Contextual meaning: "फूँक" here means a deliberate, controlled breath', 'फूँक means wind'],
                  hint: 'If stuck on connotation: Revisit Class 11 Chapter 14 node 009 (Irony/Symbolism) — the concept that.',
                  misconception: 'Students treat the end-of-chapter glossary ("शब्दार्थ") as the *only* authoritative meaning.' }
          ],
            remediations: { 'students-treat-the-end-of': { steps: ['Have them re-read the *exact paragraph* where the word appears (not the whole story).', 'Ask them to circle 3 words *adjacent* to the target word (e.g., for "नल फेर": "कर", "चला", "गया").', 'Ask: "What do these neighbors *do* to the meaning?" (e.g., "कर" makes it an action; "चला गया" adds departure).', 'Have them write: "In this paragraph, नल फेर suggests ____ because the text shows ____."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_011', difficulty: 'standard',
          question: '\'फकीर धुनी\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'If stuck on aspect identification, review Class 11 Hindi grammar chapter "Kriya ke Bhed".',
          misconception: 'Students treat "grammar in literature" as spotting parts of speech (noun, verb, adjective) — a Class 6 skill.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' में भाषा-प्रयोग',
                  options: ['\'फकीर धुनी\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on aspect identification, review Class 11 Hindi grammar chapter "Kriya ke Bhed" (Verb.',
                  misconception: 'Students treat "grammar in literature" as spotting parts of speech (noun, verb, adjective) — a Class 6 skill.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['Return to the text and highlight every word you would not use in a formal letter.', 'Group them: dialect nouns, aspectual verbs, idioms, inverted sentences.', 'For each group, write one sentence: "This [feature] makes the narrator sound [effect] because [reason]." 4.', 'Check c11_hin_ar_cbse_14_011 (Class 11 same-chapter grammar node) for worked examples of aspect and dialect analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_14_012', difficulty: 'standard',
          question: '\'फकीर धुनी\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र आशय-सूचक प्रश्न का \'साक्ष्य\' चरण नहीं कर पा रहा → c12_hin_ar_cbse_14_003.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आशय-सूचक प्रश्न = लंबा उत्तर" और "वस्तुनिष्ठ प्रश्न = छोटा उत्तर"। इसलिए वे 2-अंक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'फकीर धुनी\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'फकीर धुनी\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'फकीर धुनी\' का कथानक', '\'फकीर धुनी\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र आशय-सूचक प्रश्न का \'साक्ष्य\' चरण नहीं कर पा रहा → c12_hin_ar_cbse_14_003 (पाठ्य-परिवेश).',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "आशय-सूचक प्रश्न = लंबा उत्तर" और "वस्तुनिष्ठ प्रश्न = छोटा उत्तर"। इसलिए वे 2-अंक के आशय-सूचक प्रश्न.' }
          ],
            remediations: { '2-10': { steps: ['**पहचान अभ्यास:** छात्र को "शरीष के फूल" के NCERT अभ्यास प्रश्न (पाठ्यपुस्तक अंत) दें। प्रत्येक प्रश्न के सामने \'V\'.', '**संरचना अभ्यास:** 2 आशय-सूचक प्रश्न चुनें। छात्र से कहें: "केवल PEEL के 4 चरणों के शीर्षक लिखो (बिंदु, साक्ष्य.', '**पुनः निदान:** c12_hin_ar_cbse_14_006 (मुख्य विषय) और c12_hin_ar_cbse_14_008 (बिंब/रूपक) दोबारा पढ़वाएं — क्योंकि.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
