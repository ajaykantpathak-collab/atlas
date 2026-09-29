import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch13_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch13_p2',
    title: 'पाठ 13 · Part 2/3',
    subtitle: 'Read a protest poem that never once explains its own violence.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 13 · Part 2/3',
    chapters: ['c11_hin_ar_ch13'],
    nodeIds: ['c11_hin_ar_cbse_13_007', 'c11_hin_ar_cbse_13_008', 'c11_hin_ar_cbse_13_009', 'c11_hin_ar_cbse_13_010', 'c11_hin_ar_cbse_13_011', 'c11_hin_ar_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a filmmaker cutting three reels of the same dark hour', intro: 'A folk idiom (\'लकड़ी का लक्खा\'), a Marxist poet, a street on fire — the poem shows you the footage and trusts you to name the crime.', goal: 'Analyse montage structure and the stanza-wise stacking of public violence, private fear and universal law.' },
    discovery: {
        question: 'Smoldering stakes, barefoot fleeing children, a police jeep — three images stacked with no connecting line. Sloppy writing?',
        options: ['No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment', 'Yes — a poem must state its causes', 'Yes — images without links are just a list', 'No — the jeep is clearly chasing the children in the text'],
        answer: 'No — the montage makes the reader infer the causal chain of state violence; the gap is the indictment',
        hook: 'The three stanzas aren\'t consecutive scenes — public chaos, private terror and eternal law are stacked as simultaneous faces of one Emergency-era moment.',
    },
    teaching: [
        { title: 'पाठ 13 — गौण विषय', text: '\'लकीरें खींचते हुए\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Mark the pronouns across the three stanzas to separate street, self and moral law, then defend why the poem refuses a linear plot.',
        labels: ['पाठ 13 — गौण', 'पाठ 13 — साहित्यिक', 'पाठ 13 — पदावली', 'पाठ 13 — व्याकरण', 'पाठ 13 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_007', title: 'पाठ 13 — गौण विषय',
          caseStudy: { intro: '\'लकीरें खींचते हुए\' में लकीरें-खींचते-हुए जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of function and scope?', options: [
                { text: 'A secondary theme is a supporting idea that explores a specific dimension of the primary', outcome: 'A secondary theme is a supporting idea that explores a specific dimension of the primary theme.' },
                { text: 'other topics mentioned in the poem', outcome: 'Not quite — Students believe secondary themes are simply "other topics mentioned in the poem" and list them.', reveals: 'secondary-themes-are-simply-other' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_010', title: 'पाठ 13 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'लकीरें खींचते हुए\' के मुख्य शब्द: लकीरें-खींचते-हुए — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary difference between a dictionary definition of a word and its contextual meaning in a poem?', options: [
                { text: 'A dictionary definition provides a fixed, decontextualized meaning, while contextual', outcome: 'A dictionary definition provides a fixed, decontextualized meaning, while contextual meaning in.' },
                { text: 'they are the same', outcome: 'Not quite — Students often believe that \'vocabulary in context\' means simply replacing the poetic word with.', reveals: 'vocabulary-in-context-means-simply' },
                { text: 'e;Llj = miyC/', outcome: 'Not quite — Students often believe that \'vocabulary in context\' means simply replacing the poetic word with.', reveals: 'vocabulary-in-context-means-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a protest-poetry evening, a student reads Nagarjun\'s poem and interprets it as a literal street scene: \'Police burn stakes, children run, the poet hides, then calls himself a king — confusing sequence, honestly.\'',
            decisions: [{ prompt: 'What\'s the better structural reading?', options: [
                { text: 'Read the three stanzas as simultaneous realities, not a sequence: Stanza 1 is public chaos, Stanza 2 the poet\'s private terror, Stanza 3 a universal moral law — stacked so that state violence, individual fear and enduring truth coexist in one totalitarian moment. And context sharpens it: a peasant-movement poet writing political satire in rustic imagery — the stake (लकड़ी) is a symbol of resistance, not firewood.', outcome: 'The \'confusing sequence\' resolves into deliberate design: structure is the argument — the poem forces three contradictory perspectives to be held at once.' },
                { text: 'Keep the story reading — find the causal links, like whether the police spotted the poet.', outcome: 'Hunting cause-and-effect across stanzas imports prose logic into a modernist poem: the stanzas are facets of one moment, not consecutive scenes.', reveals: 'stanzas-as-consecutive-scenes' },
                { text: 'Reclassify it as a nature poem — stakes, smoke and sunlight are rustic imagery.', outcome: 'The rustic surface is the disguise: a poet of peasant movements uses folk simplicity for political satire — nature imagery carries ideology.', reveals: 'satire-read-as-nature-poem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'Nagarjun stacks terror, conscience and law without explaining them — the reader assembling the causal chain is the poem\'s argument.',
            decisions: [{ prompt: 'What comes next? पाठ 13 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 13 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_007', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review node 006 (Primary Theme) — specifically the worked example showing how.',
          misconception: 'Students believe secondary themes are simply "other topics mentioned in the poem" and list them like tags (poverty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' के गौण विषय',
                  options: ['\'लकीरें खींचते हुए\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review node 006 (Primary Theme) — specifically the worked example showing how the primary.',
                  misconception: 'Students believe secondary themes are simply "other topics mentioned in the poem" and list them like tags (poverty, hunger, law, childhood).' }
          ],
            remediations: { 'secondary-themes-are-simply-other': { steps: ['If a student cannot move beyond listing topics, do this 3-step remediation: (1) Give them the first stanza with "िे.', 'How does the *shift in agency* from victim to speaker to ruler build the theme of legal oppression?" This forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_008', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी.',
          misconception: '**सबसे घातक भ्रम:** छात्र **बिंब को "चित्रात्मक वर्णन" मात्र** मानते हैं और **रूपक को "बिना \'जैसे\' वाली उपमा"** समझते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' में बिंब (imagery)',
                  options: ['\'लकीरें खींचते हुए\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 हिंदी पाठ्यपुस्तक (क्षितिज/कृतिका) के अलंकार संबंधी अभ्यास.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **बिंब को "चित्रात्मक वर्णन" मात्र** मानते हैं और **रूपक को "बिना \'जैसे\' वाली उपमा"** समझते हैं। **वास्तविकता:**.' }
          ],
            remediations: { '1': { steps: ['**चरणबद्ध सुधार (3 दिन का माइक्रो-प्लान):** **दिन 1 — इंद्रिय-जागरूकता:** कक्षा में 5 वस्तुएँ रखें (फूल, घंटी, बर्फ.', 'अर्थ वही रहा या फैला?" — चर्चा से पहचान स्थापित होगी कि रूपक **गुण नहीं, अस्तित्व आरोपित करता है**। **दिन 3 — विस्तारित.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_009', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_008 (बिंब और रूपक)** के \'व्यंजना-स्तर\' (Suggestive.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी स्थिति\' (Oxymoron)** समझ बैठते हैं। **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' में विरोधाभास',
                  options: ['\'लकीरें खींचते हुए\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_008 (बिंब और रूपक)** के \'व्यंजना-स्तर\' (Suggestive level) वाले.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी स्थिति\' (Oxymoron)** समझ बैठते हैं। **गलत तर्क:** "जब दो विरोधी शब्द.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र को दो कॉलम बनाने को कहें: बाएँ "Oxymoron (युग्म-विरोध)" — दो शब्द (जैसे: \'अंधी.', '**चरण 2 — \'क्यों\' पूछें:** हर Oxymoron के लिए पूछें: "यह कौन-सा चित्र बना रहा है?" (चित्रात्मक/चमत्कार)। हर Paradox के.', '**चरण 3 — पाठ-आधारित अभ्यास:** पाठ्यपुस्तक के किसी पाठ (जैसे \'नमक का दारोगा\', \'गागर में सागर\' आदि) से 2-2 उदाहरण.', '**चरण 4 — स्वयं रचवाएँ:** छात्र से एक Oxymoron और एक Paradox रचने को कहें, फिर दोनों का \'प्रभाव\' (Effect) लिखवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_010', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review the concept of \'metaphorical extension\' from c11_hin_ar_cbse_13_008.',
          misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from.',
          parts: [
                { id: 'a', prompt: 'Apply the context-clue strategy to determine the meaning of "csdjkj" in the line "u gks deh”k rks ik¡oksa ls isV <¡d ysaxs] ;s yksx fdrus equkflc gSa bl lI+kQj.', answer: 'Locate "csdjkj" — it appears in the vocabulary list as meaning \'छोटा/तुच्छ\'',
                  options: ['Locate "csdjkj" — it appears in the vocabulary list as meaning \'छोटा/तुच्छ\'', 'e;Llj = miyC/'],
                  hint: 'If stuck, review the concept of \'metaphorical extension\' from c11_hin_ar_cbse_13_008 using the.',
                  misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from the textbook\'s.' }
          ],
            remediations: { 'vocabulary-in-context-means-simply': { steps: ['Return to the poem and read only the lines containing the target word, ignoring the vocabulary box entirely.', 'Write a paraphrase of that stanza in your own simple Hindi without using the target word.', 'Compare your paraphrase with the textbook gloss — note where your version captures the emotion and where it falls flat.', 'Re-read the preface (page 131) where Nagarjun explains his intent: "jktuhfr vkSj lekt esa tks oqQN py jgk gS, mls.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The vocabulary list in the textbook (e;Llj, nj[r, eqrebu, csdjkj, fu”kke, ,gfr;kr, cgj, vlj) is sufficient for a complete understanding.', answer: 'The claim is false',
                  options: ['The claim is false', 'e;Llj = miyC/'],
                  hint: 'If stuck, review the concept of \'metaphorical extension\' from c11_hin_ar_cbse_13_008 using the.',
                  misconception: 'Students often believe that \'vocabulary in context\' means simply replacing the poetic word with a Hindi synonym from the textbook\'s.' }
          ],
            remediations: { 'vocabulary-in-context-means-simply': { steps: ['Return to the poem and read only the lines containing the target word, ignoring the vocabulary box entirely.', 'Write a paraphrase of that stanza in your own simple Hindi without using the target word.', 'Compare your paraphrase with the textbook gloss — note where your version captures the emotion and where it falls flat.', 'Re-read the preface (page 131) where Nagarjun explains his intent: "jktuhfr vkSj lekt esa tks oqQN py jgk gS, mls.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_011', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि अटका हुआ महसूस करें तो **\'वाक्य-रचना के प्रकार\' (simple/compound/complex) और \'अलंकार.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन/साहित्यिक शब्दों की सूची बनाना** या **अलंकारों के नाम गिनाना** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' में भाषा-प्रयोग',
                  options: ['\'लकीरें खींचते हुए\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस करें तो **\'वाक्य-रचना के प्रकार\' (simple/compound/complex) और \'अलंकार.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल **कठिन/साहित्यिक शब्दों की सूची बनाना** या **अलंकारों के नाम गिनाना** है। वे यह नहीं देखते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: **"एक वाक्य लो — \'वह चला गया\' — और इसे पाँच प्रसंगों (पुलिस रिपोर्ट, प्रेम-पत्र, डायरी, कविता, व्यंग्य).', 'फिर पूछें: **"कौन-सा संस्करण किस प्रसंग के लिए सर्वाधिक उपयुक्त है और क्यों?"** 3.', 'अन्त में **तुलनात्मक सारणी** बनवाएँ: प्रसंग | वाक्य | बदला तत्व | प्रभाव। इससे छात्र \'नियम\' से \'प्रयुक्ति\' और \'प्रभाव\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_13_012', difficulty: 'standard',
          question: '\'लकीरें खींचते हुए\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'If stuck, review **c11_hin_ar_cbse_13_002 (कथानक)** for event sequencing and.',
          misconception: '**भ्रांति:** "आशय-सूचक प्रश्न का उत्तर देने के लिए पाठ की पंक्तियाँ ज्यों की त्यों उद्धृत (Quote) कर देनी चाहिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'लकीरें खींचते हुए\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'लकीरें खींचते हुए\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'लकीरें खींचते हुए\' का कथानक', '\'लकीरें खींचते हुए\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_13_002 (कथानक)** for event sequencing and.',
                  misconception: '**भ्रांति:** "आशय-सूचक प्रश्न का उत्तर देने के लिए पाठ की पंक्तियाँ ज्यों की त्यों उद्धृत (Quote) कर देनी चाहिए, क्योंकि वही \'सही\' उत्तर.' }
          ],
            remediations: { 'quote': { steps: ['**पहचान अभ्यास (Identification Drill):** छात्र को पाठ 13 के 10 प्रश्न दें (मिश्रित: 5 वस्तुनिष्ठ, 5 आशय-सूचक)। उसे केवल.', '**\'क्यों\' सीढ़ी (Why Ladder):** एक वस्तुनिष्ठ तथ्य लें (जैसे: "नायक गया")। छात्र से 3 बार "क्यों?" पूछवाएँ। हर उत्तर.', '**PEEL टेम्पलेट:** खाली PEEL शीट दें। पहले केवल **Point** और **Evidence** भरने को कहें। जब यह सध जाए, तब.', '**शब्द-भंडार (Vocabulary Bank):** आशय व्यक्त करने वाले शब्दों की सूची बनवाएँ (दर्शाता है, प्रकट करता है, संकेत देता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
