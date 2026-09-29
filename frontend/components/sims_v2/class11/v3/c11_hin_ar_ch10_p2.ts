import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch10_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch10_p2',
    title: 'पाठ 10 · Part 2/3',
    subtitle: 'Read a devotional poem as a plot of the soul, not a description of love.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 10 · Part 2/3',
    chapters: ['c11_hin_ar_ch10'],
    nodeIds: ['c11_hin_ar_cbse_10_007', 'c11_hin_ar_cbse_10_008', 'c11_hin_ar_cbse_10_009', 'c11_hin_ar_cbse_10_010', 'c11_hin_ar_cbse_10_011', 'c11_hin_ar_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a sakhi listening to Meera narrate her undoing', intro: 'Eyes rolling in trance, love-fever, body wasting, ornaments off — a whole renunciation compressed into a few stanzas.', goal: 'Analyse the poem\'s internal narrative progression from devotion to total renunciation.' },
    discovery: {
        question: '\'Nothing happens in Meera\'s poem — she just says she loves Krishna.\' Is that a fair critique?',
        options: ['No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union', 'Yes — a poem needs visible action to have a plot', 'Yes — devotion is a state, not a story', 'No — because she physically dances in stanza two'],
        answer: 'No — the events are internal: ornaments dropped, body wasting, social self shed — each a narrative beat toward union',
        hook: 'Bhakti verse plots the soul\'s trajectory, not the body\'s — \'discarding jewellery\' is the poem\'s rising action, abandonment is its climax.',
    },
    teaching: [
        { title: 'पाठ 10 — गौण विषय', text: '\'आरोह भाग-1 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace Meera\'s stanzas from a mind fixed on Giridhar to the shedding of every social marker, and defend the poem\'s narrative arc against \'nothing happens.\'',
        labels: ['पाठ 10 — गौण', 'पाठ 10 — साहित्यिक', 'पाठ 10 — पदावली', 'पाठ 10 — व्याकरण', 'पाठ 10 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_010', title: 'पाठ 10 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 10\' के मुख्य शब्द: आरोह-भाग-1-—-पाठ-10 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of a key word in a poem when a dictionary definition is insufficient?', options: [
                { text: 'The primary strategy is to analyze the immediate linguistic context (surrounding words,', outcome: 'The primary strategy is to analyze the immediate linguistic context (surrounding words, syntax) and.' },
                { text: 'look it up in a dictionary', outcome: 'Not quite — Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk").', reveals: 'the-glossary-meanings-provided-in' },
                { text: 'dkfu = e;kZnk', outcome: 'Not quite — Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk").', reveals: 'the-glossary-meanings-provided-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_012', title: 'पाठ 10 — बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 10\' के तथ्य: रचनाकार NCERT पाठ्यपुस्तक, विषय \'आरोह भाग-1।',
            decisions: [{ prompt: 'पाठ 10 के संदर्भ में, \'वस्तुनिष्ठ प्रश्न\' की परिभाषा लिखिए और एक उदाहरण दीजिए जो पाठ से सीधे तथ्य पूछता हो।', options: [
                { text: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वह है जिसका उत्तर पाठ में स्पष्ट रूप से लिखित तथ्य,', outcome: '**Correct Answer:** वस्तुनिष्ठ प्रश्न वह है जिसका उत्तर पाठ में स्पष्ट रूप से लिखित तथ्य, विवरण.' },
                { text: 'पाठ के अनुसार, नायक ने सुबह क्या खाया?', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान.', reveals: 'specific-error-students-believe-this' },
                { text: 'नायक ने सुबह दूध और रोटी खाई', outcome: 'Not quite — **Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान.', reveals: 'specific-error-students-believe-this' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a poetry-analysis session, a student presents Meera\'s bhajan and concludes: \'Nothing happens — Meera just describes her feelings. No events, no plot, so there\'s no structure to analyse.\'',
            decisions: [{ prompt: 'How do you show the poem\'s narrative architecture?', options: [
                { text: 'Trace the soul\'s trajectory: the bhakti \'plot\' is internal progression — stanza 1 establishes the mind fixed on Giridhar, stanza 2 shows the enacted consequences (body wasting, ornaments discarded — a real social rupture, not description), stanza 3 climaxes in the direct plea to stop worldly questioning. Each stanza escalates the renunciation — structure as spiritual arc from devotion to surrender.', outcome: 'The poem gains its plot: discarding ornaments isn\'t imagery but an enacted climax — bhakti narrative maps the devotee\'s journey, not external events.' },
                { text: 'Concede the point — lyric poems express emotion, they don\'t tell stories, so skip structure.', outcome: 'Lyric isn\'t structureless: emotional escalation with deliberate ordering is a narrative arc — \'no events\' confuses external action with inner plot.', reveals: 'lyric-has-no-plot' },
                { text: 'Invent a plot instead — narrate Meera\'s biography (marriage, leaving the palace) as the poem\'s storyline.', outcome: 'That\'s biography, not this text\'s structure: the poem compresses a whole renunciation into inner beats; importing her life story replaces analysis with anecdote.', reveals: 'biography-is-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'The stanza that wastes the body and drops the ornaments *is* the plot — renunciation told as a sequence of irreversible acts.',
            decisions: [{ prompt: 'What comes next? पाठ 10 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 10 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_007', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो c11_hin_ar_cbse_10_006 (मुख्य विषय और संदेश) को दोबारा पढ़ें और पाठ के 3.',
          misconception: 'छात्र अक्सर \'गौण विषय\' को \'उपकथानक\' (sub-plot) या \'विवरण\' (detail) मान लेते हैं। उदाहरण: पाठ 10 में \'नायक का गाँव जाना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'आरोह भाग-1 — पाठ 10\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_10_006 (मुख्य विषय और संदेश) को दोबारा पढ़ें और पाठ के 3 केंद्रीय.',
                  misconception: 'छात्र अक्सर \'गौण विषय\' को \'उपकथानक\' (sub-plot) या \'विवरण\' (detail) मान लेते हैं। उदाहरण: पाठ 10 में \'नायक का गाँव जाना\' एक घटना/प्रसंग है.' }
          ],
            remediations: { 'sub-plot-detail-10': { steps: ['चरण 1: छात्र से कहें — "पाठ के 5 प्रमुख प्रसंग लिखो। अब हर प्रसंग के सामने लिखो: \'यह प्रसंग किस विचार को आगे बढ़ाता.', 'कैसे?" चरण 4: जो दावेदार यह परीक्षा पास करें, उन्हें \'गौण विषय\' मानें। यह प्रक्रिया \'घटना\' और \'विचार-प्रवाह\' का भेद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_008', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Review the definitions of imagery and metaphor with simple examples (e.g., "The classroom.',
          misconception: 'Students often think that any descriptive word in the poem is an \'image\' and any comparison is a \'metaphor\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'आरोह भाग-1 — पाठ 10\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'Review the definitions of imagery and metaphor with simple examples (e.g., "The classroom was.',
                  misconception: 'Students often think that any descriptive word in the poem is an \'image\' and any comparison is a \'metaphor\'.' }
          ],
            remediations: { 'any-descriptive-word-in-the': { steps: ['Ask the student to list all weaving-related words in the poem (loom, shuttle, thread, cloth, weaver).', 'For each word, have them decide: is it used literally (describing the actual craft) or figuratively (representing.', 'Guide them to see that words like "शटल" (shuttle) are literal in the first stanza but become metaphorical for "breath".', 'Practice with a simpler poem where the metaphor is more explicit (e.g., "Time is a river") before returning to Kabir.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any descriptive word in the poem is an \'image\' and any comparison is a \'metaphor\'.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Kabir\'s use of weaving metaphors to communicate his philosophical ideas to a common audience in 15th-century India.', answer: 'The metaphors are highly effective',
                  options: ['The metaphors are highly effective', 'just decorative', 'confusing'],
                  hint: 'Review the definitions of imagery and metaphor with simple examples (e.g., "The classroom was.',
                  misconception: 'Students often think that any descriptive word in the poem is an \'image\' and any comparison is a \'metaphor\'.' }
          ],
            remediations: { 'any-descriptive-word-in-the': { steps: ['Ask the student to list all weaving-related words in the poem (loom, shuttle, thread, cloth, weaver).', 'For each word, have them decide: is it used literally (describing the actual craft) or figuratively (representing.', 'Guide them to see that words like "शटल" (shuttle) are literal in the first stanza but become metaphorical for "breath".', 'Practice with a simpler poem where the metaphor is more explicit (e.g., "Time is a river") before returning to Kabir.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_009', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review c11_hin_ar_cbse_10_006 (Theme: Primary Theme) — specifically the concept.',
          misconception: 'Students often confuse Kabir\'s *paradoxes* with *irony* — they label every contradictory statement as "irony" without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'आरोह भाग-1 — पाठ 10\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review c11_hin_ar_cbse_10_006 (Theme: Primary Theme) — specifically the concept.',
                  misconception: 'Students often confuse Kabir\'s *paradoxes* with *irony* — they label every contradictory statement as "irony" without checking if there\'s.' }
          ],
            remediations: { 'students-often-confuse-kabir-s': { steps: ['Give the student three short Kabir lines — one paradox, one irony, one plain statement — and ask them to sort them.', 'For the irony, ask: "Who is being mocked here? What did they expect vs what happened?"', 'For symbols, give the same symbol (e.g., "charkha" / spinning wheel) in two different Kabir verses and ask: "Does.', 'Have them rewrite a non-ironic line into an ironic one by adding a hypocritical speaker.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_010', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review the concept of "context clues" from Class 10 Hindi (or English) and.',
          misconception: 'Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk") are the only meanings.',
          parts: [
                { id: 'a', prompt: 'In the line "valqou ty lhafp&lhafp] izse&csfy cks;h", the word "csfy" is glossed as "izse dh csy".', answer: 'The compound "izse&csfy" (evening-shadow) evokes a specific visual and temporal',
                  options: ['The compound "izse&csfy" (evening-shadow) evokes a specific visual and temporal', 'they mean the same thing', 'dkfu = e;kZnk', 'the glossary meanings provided in the textbook (e'],
                  hint: 'If stuck, review the concept of "context clues" from Class 10 Hindi (or English) and practice with.',
                  misconception: 'Students often think that the glossary meanings provided in the textbook (e.g., "dkfu = e;kZnk") are the only meanings needed, and that the.' }
          ],
            remediations: { 'the-glossary-meanings-provided-in': { steps: ['Have the student read the stanza aloud three times, emphasizing the key word each time.', 'Ask: "What images, sounds, or feelings come to mind when you hear this word in this line?" 3.', 'Together, list all words in the stanza that relate to the key word (e.g., for "dkfu": yksd, ykt, [kks;h).', 'Guide the student to write a "word portrait": a 3-sentence description of the word\'s personality in this poem (e.g.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_011', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटके तो नोड 004 (नायक पात्र-चित्रण) और नोड 003 (पाठ्य-परिवेश) दोबारा पढ़ें — भाषा का.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ **कठिन/सजावटी शब्दों** का प्रयोग है, जबकि पाठ 10 में लेखक सरलतम तद्भव/देशज.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 10\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'आरोह भाग-1 — पाठ 10\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 10\' का कथानक — \'आरोह भाग-1 — पाठ 10\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 10\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो नोड 004 (नायक पात्र-चित्रण) और नोड 003 (पाठ्य-परिवेश) दोबारा पढ़ें — भाषा का \'कौन\' और.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ **कठिन/सजावटी शब्दों** का प्रयोग है, जबकि पाठ 10 में लेखक सरलतम तद्भव/देशज शब्दों ("भौजी".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ का कोई एक पृष्ठ खोलो और **लाल पेन** से हर सर्वनाम घेरो; फिर **नीले पेन** से हर क्रिया-रूप रेखांकित.', 'अब पूछें: "लाल/नीले निशानों का पैटर्न क्या बताता है पात्र के बारे में?" 3.', 'यदि फिर भी अटके, तो **दो वाक्य** लिखवाएँ — एक "मैं" से शुरू, दूसरा "हम" से — और दोनों का भावात्मक अंतर बोलकर बताने को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_10_012', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 10\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review **c11_hin_ar_cbse_10_010 (पदावली: मुख्य शब्द)** and.',
          misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान से पढ़ना है।" This.',
          parts: [
                { id: 'a', prompt: '\'आशय-सूचक प्रश्न\' और \'वस्तुनिष्ठ प्रश्न\' में मूल अंतर समझाते हुए बताइए कि "लेखक ने शीर्षक \'XYZ\' क्यों चुना?" किस श्रेणी में आएगा और क्यों?', answer: '**Correct Answer:** मूल अंतर: वस्तुनिष्ठ प्रश्न *पाठ में क्या लिखा है* पूछता है',
                  options: ['**Correct Answer:** मूल अंतर: वस्तुनिष्ठ प्रश्न *पाठ में क्या लिखा है* पूछता है', 'लेखक ने शीर्षक \'XYZ\' क्यों चुना?', 'title is in the text', 'आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_10_010 (पदावली: मुख्य शब्द)** and **c11_hin_ar_cbse_10_011.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान से पढ़ना है।" This is **wrong** because.' },
                { id: 'b', prompt: 'निम्नलिखित प्रश्नों को वस्तुनिष्ठ/आशय-सूचक में वर्गीकृत कीजिए और प्रत्येक के लिए *पाठगत साक्ष्य का प्रकार* बताइए जो उत्तर में चाहिए: (क) "नायक का नाम क्या है?".', answer: '**Correct Answer:** (क) वस्तुनिष्ठ',
                  options: ['**Correct Answer:** (क) वस्तुनिष्ठ', 'meaning', 'character', 'आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_10_010 (पदावली: मुख्य शब्द)** and **c11_hin_ar_cbse_10_011.',
                  misconception: '**Specific Error:** Students believe "आशय-सूचक प्रश्नों के उत्तर पाठ में *छिपे* होते हैं — बस ध्यान से पढ़ना है।" This is **wrong** because.' }
          ],
            remediations: { 'specific-error-students-believe-this': { steps: ['**Step-by-Step Remediation:** 1.', '**Contrast Drill:** Give the student 5 questions (mixed types).', 'Ask them to *only* label each as "Locate" (वस्तुनिष्ठ) or "Build" (आशय-सूचक) — no answering.', 'Discuss *why* each label fits using the "Can I point to one sentence?" test.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
