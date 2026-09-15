import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p2',
    title: 'd¡qoj ukjk;.k · Part 2/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'd¡qoj ukjk;.k · Part 2/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_007', 'c12_hin_ar_cbse_02_008', 'c12_hin_ar_cbse_02_009', 'c12_hin_ar_cbse_02_010', 'c12_hin_ar_cbse_02_011', 'c12_hin_ar_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas or underlying messages in a literary work that complement the primary theme, adding depth and complexity; in "irax" (vkyksd èkUok), they include the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing on a foggy Delhi winter morning at 6 AM — your breath makes clouds, the sun is a pale coin, and you hear schoolchildren laughing.',
            decisions: [{ prompt: 'Define \'imagery\' (चित्रण) and \'metaphor\' (रूपक) in your own words using NCERT terminology.', options: [
                { text: 'Imagery: संवेदनाओं (इन्द्रियों) को सम्बोधित करने वाले शब्दों/पदों का प्रयोग जो पाठक के मन', outcome: 'Imagery: संवेदनाओं (इन्द्रियों) को सम्बोधित करने वाले शब्दों/पदों का प्रयोग जो पाठक के मन में सजीव.' },
                { text: 'ठिठुरन', outcome: 'Not quite — Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.', reveals: 'metaphor-and-simile-are-interchangeable' },
                { text: '(श्रवण)। Example metaphor', outcome: 'Not quite — Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.', reveals: 'metaphor-and-simile-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are watching a news clip of children playing in a war zone — they are laughing, but the toys in their hands are made from shell casings.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from everyday life for each (not from the poem).', options: [
                { text: 'Irony: a situation where the outcome is contrary to what was expected (e.g., a fire', outcome: 'Irony: a situation where the outcome is contrary to what was expected (e.g., a fire station burning.' },
                { text: 'red sky', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'any vivid description (e', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a news report about a war zone and encounter the word "राख" (ash) — you know its dictionary meaning, but in that context it carries the.',
            decisions: [{ prompt: 'Define "लकड़सुंघनी" (lakṛasug̱hanī) as used in the poem "इराक" and state its literal botanical meaning.', options: [
                { text: 'Correct answer: "लकड़सुंघनी" is a wild shrub/plant (Calotropis procera / आक) whose dry', outcome: 'Correct answer: "लकड़सुंघनी" is a wild shrub/plant (Calotropis procera / आक) whose dry stems are.' },
                { text: 'a type of wood', outcome: 'Not quite — Students treat "vocabulary in context" as a dictionary-lookup exercise: they memorize meanings.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'incense', outcome: 'Not quite — Students treat "vocabulary in context" as a dictionary-lookup exercise: they memorize meanings.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading the poem "irax" aloud and notice that some sentences don\'t follow the usual subject-object-verb order you use in daily conversation.',
            decisions: [{ prompt: 'Identify the tense and aspect of the verb phrase "mM+kus okys" in the line "irax mM+kus okys cPpksa osQ >qaM dks".', options: [
                { text: 'The verb phrase "mM+kus okys" consists of the infinitive "mM+kus" (to fly) + the present', outcome: 'The verb phrase "mM+kus okys" consists of the infinitive "mM+kus" (to fly) + the present participle.' },
                { text: 'incorrect', outcome: 'Not quite — Students often think poetic grammar is just "incorrect" or "broken" Hindi.', reveals: 'poetic-grammar-is-just-incorrect' },
                { text: 'broken', outcome: 'Not quite — Students often think poetic grammar is just "incorrect" or "broken" Hindi.', reveals: 'poetic-grammar-is-just-incorrect' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp forward about a childhood memory: the message explicitly says "I used to climb mango trees" (literal fact) but implies "I.',
            decisions: [{ prompt: 'Define literal comprehension and inferential comprehension in your own words.', options: [
                { text: '**Correct answer:** Literal comprehension asks for information directly stated in the', outcome: '**Correct answer:** Literal comprehension asks for information directly stated in the text (e.g.' },
                { text: 'personal opinion', outcome: 'Not quite — Students treat inferential questions as "give your opinion" questions.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'I think the mother is tired', outcome: 'Not quite — Students treat inferential questions as "give your opinion" questions.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'What comes next? d¡qoj ukjk;.k · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — d¡qoj ukjk;.k · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas or underlying messages in a literary.',
          hint: 'If stuck, revisit node 006 (Primary Theme) and re-read the poem focusing only on the.',
          misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the supporting ideas or underlying messages in a literary work that',
                  options: ['Secondary themes are the supporting ideas or underlying messages in a literary work that', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and narrative structure in a poem refer to the sequence of events, images, or', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'If stuck, revisit node 006 (Primary Theme) and re-read the poem focusing only on the flute player.',
                  misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions a river, so nature.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student re-read the poem with three colored pens: one for primary theme evidence, one for contrast pairs.', 'Ask them to write one sentence for each color: "This color shows the idea that ______." 3.', 'Then guide them to merge those sentences into named secondary themes (e.g., "Nature as a model of freedom").', 'Finally, have them explain how each secondary theme makes the primary theme richer — if they can\'t, return to step 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem\'s ending, where the flute music fades and children return home, undermines the theme of freedom because it shows freedom.', answer: 'Refute',
                  options: ['Refute', 'agrees with the claim reveals a binary mindset (free vs'],
                  hint: 'If stuck, revisit node 006 (Primary Theme) and re-read the poem focusing only on the flute player.',
                  misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions a river, so nature.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student re-read the poem with three colored pens: one for primary theme evidence, one for contrast pairs.', 'Ask them to write one sentence for each color: "This color shows the idea that ______." 3.', 'Then guide them to merge those sentences into named secondary themes (e.g., "Nature as a model of freedom").', 'Finally, have them explain how each secondary theme makes the primary theme richer — if they can\'t, return to step 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_008', difficulty: 'standard',
          question: 'Imagery (प्रतिबिंब/चित्रण) is the use of vivid, sensory language that appeals.',
          hint: 'If stuck on metaphor identification, revisit Class 11 node c11_hin_ar_cbse_02_008 worked.',
          misconception: 'Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.',
          parts: [
                { id: 'a', prompt: 'Compare the tactile imagery in stanza 2 ("बच्चों की ठिठुरी हुई मुट्ठियाँ", "सीटी बजाते") with the visual metaphor in stanza 3 ("एक एक्कस के लग्गीस...', answer: 'Tactile imagery: "ठिठुरी हुई मुट्ठियाँ" (clenched frozen fists) makes the cold',
                  options: ['Tactile imagery: "ठिठुरी हुई मुट्ठियाँ" (clenched frozen fists) makes the cold', 'imagery shows cold, metaphor shows line', '**metaphor and simile (रूपक और उपमा) are interchangeable**'],
                  hint: 'If stuck on metaphor identification, revisit Class 11 node c11_hin_ar_cbse_02_008 worked examples.',
                  misconception: 'Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.' }
          ],
            remediations: { 'metaphor-and-simile-are-interchangeable': { steps: ['Give the student two columns: "उपमा वाक्य" and "रूपक वाक्य" for the same tenor-vehicle pair (e.g., "चाँद चाँदी *जैसा*.', 'Ask them to list *three* qualities transferred in the metaphor that the simile cannot transfer.', 'Have them re-read stanza 2-3 of "इराव" and underline every word that *only makes sense because of the metaphor\'s.', 'Assign a 50-word answer: "कविता में \'मकई के भुट्टे-सी धूप\' रूपक न होता तो \'पौष्टिकता\' का भाव कैसे लुप्त होता?" — forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality — where the.',
          hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and.',
          misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "लोस्जक गक्वब" (the celebration turned into mourning) appears after a description of children playing.', answer: 'Situational irony occurs when there is a sharp contrast between what is expected',
                  options: ['Situational irony occurs when there is a sharp contrast between what is expected', 'red sky', 'any vivid description (e'],
                  hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.' },
                { id: 'b', prompt: 'Identify one symbol in the poem (e.g., "पेड्ह्यस ब\'क्कज" — broken toys) and explain what abstract idea it represents.', answer: 'Broken toys symbolize shattered innocence and the destruction of childhood',
                  options: ['Broken toys symbolize shattered innocence and the destruction of childhood', 'red sky', 'any vivid description (e'],
                  hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.' },
                { id: 'c', prompt: 'Compare the use of irony in the opening stanza (children playing amid explosions) with the irony in the closing stanza (the river and sky turning red).', answer: 'Opening stanza: personal irony',
                  options: ['Opening stanza: personal irony', 'red sky', 'any vivid description (e'],
                  hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit the definitions in c11_hin_ar_cbse_01_009 (Class 11 Irony & Symbolism) and create a two-column table: Device |.', 'Practice labeling: take 5 lines from the poem and tag each as *only* imagery, *only* irony, *only* symbol,.', 'Write one PEEL paragraph for each device using the template: Point → Evidence (line reference) → Explanation (how the.', 'Self-check: Does my explanation show *how* the device creates meaning, not just *what* it is?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_010', difficulty: 'standard',
          question: 'Vocabulary in Context: Key Words refers to the skill of identifying, defining.',
          hint: 'If unable to distinguish connotation from denotation, review the "शब्द-शक्ति".',
          misconception: 'Students treat "vocabulary in context" as a dictionary-lookup exercise: they memorize meanings of लकड़सुंघनी, ढिबरी.',
          parts: [
                { id: 'a', prompt: 'Explain why the poet uses "हकला" (haklā - stammering) to describe the fire\'s sound ("भभूका हकला") instead of a word like "गरजना" (roaring) or "धधकना" (blazing).', answer: 'Correct answer: "हकला" personifies the fire as a wounded, struggling entity',
                  options: ['Correct answer: "हकला" personifies the fire as a wounded, struggling entity', 'it describes crackling noise'],
                  hint: 'If unable to distinguish connotation from denotation, review the "शब्द-शक्ति" (word-power) section.',
                  misconception: 'Students treat "vocabulary in context" as a dictionary-lookup exercise: they memorize meanings of लकड़सुंघनी, ढिबरी, खपरैल etc.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student re-read the poem aloud, circling every word that feels "chosen" rather than "ordinary".', 'For each circled word, complete a 3-column table: Column A = Dictionary meaning; Column B = Connotation/associations.', 'Re-attempt Diagnostic Questions 2, 4, 5 using this table.', 'If still stuck, revisit c11_hin_ar_cbse_02_010 (Class 11 Vocabulary in Context) for the "lexical choice analysis".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the study of how grammatical.',
          hint: 'Review Class 11 grammar node on non-finite verbs (participles, infinitives) and.',
          misconception: 'Students often think poetic grammar is just "incorrect" or "broken" Hindi.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the study of how grammatical structures,',
                  options: ['Grammar: Language Usage in the Text refers to the study of how grammatical structures,', '"Before You Read: Context and Background" is a preparatory section that provides', 'Plot and narrative structure in a poem refer to the sequence of events, images, or', 'Setting in poetry refers to the time, place, and social environment where the poem\'s'],
                  hint: 'Review Class 11 grammar node on non-finite verbs (participles, infinitives) and tatpurusha samasa.',
                  misconception: 'Students often think poetic grammar is just "incorrect" or "broken" Hindi.' }
          ],
            remediations: { 'poetic-grammar-is-just-incorrect': { steps: ['Have the student read the poem aloud three times, marking pauses and stress.', 'Provide a side-by-side comparison: poetic line vs.', 'standard prose rewrite for 5 lines.', 'Ask the student to identify the grammatical difference (word order, case, verb form) and hypothesize the effect.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving information explicitly.',
          hint: 'If stuck, review **c11_hin_ar_cbse_01_012** (Class 11 Literal & Inferential.',
          misconception: 'Students treat inferential questions as "give your opinion" questions.',
          parts: [
                { id: 'a', prompt: 'Read the following lines from the poem (paraphrased): "The mother waits with cool shade-like food; when the children return hungry, she serves them." Formulate.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'she cooks rice'],
                  hint: 'If stuck, review **c11_hin_ar_cbse_01_012** (Class 11 Literal & Inferential Comprehension) and.',
                  misconception: 'Students treat inferential questions as "give your opinion" questions.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Have the student re‑read the poem stanza by stanza, highlighting every explicit action/description in one colour.', 'Practice converting each highlighted literal detail into a literal question‑answer pair.', 'For each inference anchor, write a "Because the text says ___, I infer ___" sentence.', 'Re‑attempt the NCERT exercise questions (vH;kl 1‑6) using this colour‑coded text.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
