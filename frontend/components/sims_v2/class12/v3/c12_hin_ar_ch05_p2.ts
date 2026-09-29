import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch05_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch05_p2',
    title: 'उषा · Part 2/3',
    subtitle: 'The poem is the plough — and inequality is the field',
    classLevel: 12, subject: 'hin_ar', topic: 'उषा · Part 2/3',
    chapters: ['c12_hin_ar_ch05'],
    nodeIds: ['c12_hin_ar_cbse_05_007', 'c12_hin_ar_cbse_05_008', 'c12_hin_ar_cbse_05_009', 'c12_hin_ar_cbse_05_010', 'c12_hin_ar_cbse_05_011', 'c12_hin_ar_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Symbolic poetry reader', intro: 'A folk tale about a cornfield becomes, in a symbolist\'s hands, a field report on inequality.', goal: 'Read Makka through Kedarnath Singh\'s post-1943 symbolic method — folk tale into social allegory.' },
    discovery: {
        question: 'Kedarnath Singh says the poet isn\'t a spectator of inequality but wants to touch it \'with the plough of poetry.\' What\'s being claimed about the poem itself?',
        options: ['The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield', 'Farmers should write poems', 'Poetry is hard labour literally', 'Agriculture needs poets'],
        answer: 'The poem is the plough — imagery that digs into and turns over injustice, not decoration over a cornfield',
        hook: 'After 1943 his images stopped describing and started symbolising — the maize field is a rural world, the dark night its weight, the plough the poet\'s intervention. \'Makka\' grows from a folk tale: read the field as a symbolic landscape, not a sketch.',
    },
    teaching: [
        { title: 'उषा — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'छरह फोह्क्कोजह तक्ष झ\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Work the symbolic field: trace folk-tale roots into the poem\'s images, decode what maize, night and plough each stand for, and judge a poet who ploughs inequality rather than just watching it.',
        labels: ['उषा — साहित्यिक युक्तियाँ', 'उषा — मुख्य भाव', 'उषा — गौण भाव', 'उषा — पदावली: कठिन', 'उषा — व्याकरण: पद्य', 'उषा — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_009', title: 'उषा — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'छरह फोह्क्कोजह तक्ष झ\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define \'irony\' (व्यंग्य/विडंबना) and \'symbolism\' (प्रतीकवाद) in your own words, giving one example from daily life (not from the poem) for.', options: [
                { text: '**Correct answer:** Irony', outcome: '**Correct answer:** Irony — a situation where the outcome is opposite to what was expected (e.g.,.' },
                { text: 'it rained on my wedding day', outcome: 'Not quite — **Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor.', reveals: 'misconception-irony-and-symbolism-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a photo-story assignment, your partner wants to scrap shots of a foggy winter field — \'nothing happens in them; we need drama.\' You suspect the quiet frames are the story.',
            decisions: [{ prompt: 'How does Nirala\'s \'मक्क\' settle the argument?', options: [
                { text: 'Keep them — the poem opens on a still, frost-covered morning and ends by realising the morning itself has become the poem; the ordinary observed fully is the subject, not the preface to one.', outcome: 'The structure — observation widening into realisation — is the claim: poetic weight isn\'t imported through drama but uncovered by attention, so \'nothing happens\' frames can carry the whole piece.' },
                { text: 'Scrap them — a subject must be dramatic for the art to be strong; description without event is filler.', outcome: 'That reads the poem\'s opening stanza as waiting-room material; the chapter shows the jump from scene to insight is the poem\'s spine — cutting the \'uneventful\' images cuts the argument.', reveals: 'drama-equals-subject' },
                { text: 'Keep them but add a dramatic climax shot so the essay has a proper arc.', outcome: 'That grafts a foreign arc onto the form: \'मक्क\' resolves by deepening the view, not by injecting an event — the epiphany is that nothing needed to happen.', reveals: 'arc-needs-a-climax' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a poem\'s images as instruments of change — symbolism that works the soil instead of framing it.',
            decisions: [{ prompt: 'What comes next? उषा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — उषा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_007', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फँसें तो c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब) के कार्यित.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः हर **सुंदर वर्णन** को "प्रतीक" मान लेते हैं — जैसे "उषा की लाली" को प्रतीक बता देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' के गौण विषय',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो c11_hin_a_cbse_13_007 (जाग तुझको दूर जाना — प्रतीक और बिंब) के कार्यित उदाहरण दोबारा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः हर **सुंदर वर्णन** को "प्रतीक" मान लेते हैं — जैसे "उषा की लाली" को प्रतीक बता देते हैं, जबकि वह केवल.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c11_hin_a_cbse_13_007** (जाग तुझको दूर जाना — प्रतीक और बिंब) या **c11_hin_ar_cbse_16_007** (आओ, मलिकर बचाएँ.', 'एक साधारण वाक्य दें: "दीपक जल रहा है" — पूछें: "यहाँ दीपक बिंब है या प्रतीक?', 'क्यों?" फिर बदलें: "दीपक अज्ञान के अंधकार में ज्ञान का प्रतीक है" — अब अंतर स्पष्ट करें। 3.', 'पुनः "उषा" कविता के दो पद चुनकर **हाइलाइटर से बिंब (पीला) और प्रतीक (नीला)** अलग-अलग रंग से मार्क करवाएँ। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_008', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके, तो **c12_hin_ar_cbse_05_007** के \'प्रतीक-निर्माण की 3-चरणीय विधि\' (Object →.',
          misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"उषा कविता का मुख्य भाव है: \'अंधेरे के बाद उजाला आता है\' / \'निराशा के बाद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' में बिंब (imagery)',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके, तो **c12_hin_ar_cbse_05_007** के \'प्रतीक-निर्माण की 3-चरणीय विधि\' (Object → Association →.',
                  misconception: '**विशिष्ट भ्रम:** छात्र अक्सर लिखते हैं — *"उषा कविता का मुख्य भाव है: \'अंधेरे के बाद उजाला आता है\' / \'निराशा के बाद आशा आती है\'।"* **यह.' }
          ],
            remediations: { 'natural-law-human-imperative': { steps: ['**पहला कदम:** छात्र से कहें — *"कविता की पहली और अंतिम पंक्ति साथ रखो। पूछो: \'पहली में कवि क्या देख रहा है?', 'अंतिम में क्या करने को कह रहा है?\'"* 2.', '**दूसरा कदम:** **क्रिया-श्रृंखला (Verb Chain)** बनवाएँ: सोना → उठना → जागना → चलना → गढ़ना → जलाना। पूछें: *"कौन-सी.', '**तीसरा कदम:** **पुनः निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_2 फिर से दें — अब प्रतीकों की \'मानसिक अवस्था\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_009', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008.',
          misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both.".',
          parts: [
                { id: 'a', prompt: 'Define \'irony\' (व्यंग्य/विडंबना) and \'symbolism\' (प्रतीकवाद) in your own words, giving one example from daily life (not from the poem) for each.', answer: '**Correct answer:** Irony',
                  options: ['**Correct answer:** Irony', 'it rained on my wedding day'],
                  hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008 WORKED_EXAMPLE_2 and.',
                  misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'In "मेघ", the sun is called "लाल गेंद" (red ball) in stanza 2. Explain why this description is **both** symbolic **and** ironic.', answer: '**Correct answer:** Symbolic',
                  options: ['**Correct answer:** Symbolic', 'it represents hope'],
                  hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008 WORKED_EXAMPLE_2 and.',
                  misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'Apply the concept: In the line "धुंध की चादर / जैसे किसी ने खींच ली हो" (the fog-sheet as if someone pulled it away), identify the symbol and explain the irony.', answer: '**Correct answer:** Symbol',
                  options: ['**Correct answer:** Symbol', 'like a sheet'],
                  hint: 'If stuck, review the "Metaphor vs. Symbol" table in c12_hin_ar_cbse_05_008 WORKED_EXAMPLE_2 and.',
                  misconception: '**Misconception:** "Irony and symbolism are just fancy names for \'metaphor\' — if I find a metaphor, I\'ve found both." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-irony-and-symbolism-are': { steps: ['**Revisit node c11_hin_ar_cbse_05_009** (Class 11 Irony & Symbolism) — re-read the definitions and the worked example.', '**Do a micro-drill:** Take any newspaper headline (e.g., "Traffic Police Chief Fined for Speeding").', 'Identify: (a) the expectation, (b) the reality, (c) the irony.', 'Then pick an object in the room (e.g., a cracked cup) and write one sentence making it a symbol of "resilience".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_010', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'अगर किसी शब्द का प्रसंगानुसार अर्थ न पकड़ में आए, तो c12_hin_ar_cbse_05_007 (प्रतीक और.',
          misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश खोलकर लिख देना है। वे नहीं देखते कि "तम" कविता में केवल \'अंधकार\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' की पदावली',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर किसी शब्द का प्रसंगानुसार अर्थ न पकड़ में आए, तो c12_hin_ar_cbse_05_007 (प्रतीक और बिंब) के उस.',
                  misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश खोलकर लिख देना है। वे नहीं देखते कि "तम" कविता में केवल \'अंधकार\' नहीं, \'अज्ञान-अवस्था\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता का कोई एक पद्यांश लें (जैसे पहला पद)। चरण 2: 5 कठिन शब्द छाँटें। चरण 3: प्रत्येक के लिए — (क) शब्दकोशीय.', '— तीनों लिखें। चरण 4: c12_hin_ar_cbse_05_007 (प्रतीक और बिंब) दोबारा पढ़ें और देखें कि ये शब्द वहाँ चर्चित प्रतीकों से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_011', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटका हुआ लगे: **c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कविता में भाषा-प्रयोग\' का अर्थ है **कठिन/तत्सम शब्दों का प्रयोग** (जैसे \'प्रभात\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' में भाषा-प्रयोग',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे: **c11_hin_a_cbse_13_011 (जाग तुझको दूर जाना — व्याकरण: पद्य में भाषा-प्रयोग)** पर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'कविता में भाषा-प्रयोग\' का अर्थ है **कठिन/तत्सम शब्दों का प्रयोग** (जैसे \'प्रभात\' के बदले \'अरुणोदय\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** छात्र से कहें — कविता की केवल पहली दो पंक्तियाँ **तीन बार ज़ोर से पढ़ें**, हर बार अलग भाव से.', '**शब्द-चयन तालिका (Word-choice table):** एक शीट बनाएँ — बाएँ कॉलम में कवि के शब्द, दाएँ में उनके 3 सरल पर्याय। छात्र से.', '**वाक्य-क्रम परिवर्तन (Syntax swap):** मूल पंक्ति लें, उसका सीधा क्रम (SVO) लिखवाएँ, फिर दोनों पढ़कर **बल/भाव का अंतर**.', '**पुनर्निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_2 फिर से दें — अब छात्र \'बल/भाव\' शब्दों का प्रयोग करके उत्तर दे सके.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_05_012', difficulty: 'standard',
          question: '\'छरह फोह्क्कोजह तक्ष झ\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि **कीवर्ड पहचान** में अटके → **c12_hin_ar_cbse_05_002 (भावार्थ)** दोबारा पढ़ें; यदि.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (opinion) होता है** — इसलिए वे लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'छरह फोह्क्कोजह तक्ष झ\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'छरह फोह्क्कोजह तक्ष झ\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'छरह फोह्क्कोजह तक्ष झ\' का कथानक', '\'छरह फोह्क्कोजह तक्ष झ\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि **कीवर्ड पहचान** में अटके → **c12_hin_ar_cbse_05_002 (भावार्थ)** दोबारा पढ़ें; यदि **PEEL.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **आशय-सूचक प्रश्न का उत्तर "अपनी राय" (opinion) होता है** — इसलिए वे लिख देते हैं: "मुझे लगता है कवि.' }
          ],
            remediations: { 'opinion-cbse-text-based-reasoning': { steps: ['**पुनरावृत्ति (Remediation Step 1):** छात्र को **c12_hin_ar_cbse_05_002 (पद्यांश-वार भावार्थ)** और.', '**अभ्यास (Step 2):** एक छोटा पद्यांश (4-5 पंक्तियाँ) दें — **पहले 3 वस्तुनिष्ठ प्रश्न बनवायें** (तथ्य-आधारित), फिर **2.', '**पुनः निदान (Re-diagnostic):** उसी पद्यांश पर **नया आशय-सूचक प्रश्न** दें — देखें कि क्या उत्तर में **PEEL.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
