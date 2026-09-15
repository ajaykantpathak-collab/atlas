import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch03_p2: SimDef = {
    id: 'v3_c11_eng_h_ch03_p2',
    title: 'Discovering Tut: the Saga Continues · Part 2/3',
    subtitle: 'Read a 3,300-year-old cold case where the first detectives damaged the body.',
    classLevel: 11, subject: 'eng_h', topic: 'Discovering Tut: the Saga Continues · Part 2/3',
    chapters: ['c11_eng_h_ch03'],
    nodeIds: ['c11_eng_h_cbse_03_007', 'c11_eng_h_cbse_03_008', 'c11_eng_h_cbse_03_009', 'c11_eng_h_cbse_03_010', 'c11_eng_h_cbse_03_011', 'c11_eng_h_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic reader working a pharaoh\'s cold case', intro: 'A mummy cemented in gold by ritual resins, a scan three millennia late — reconstruct what each era did to the evidence.', goal: 'Distinguish narrative order from chronology and evaluate how earlier interventions shaped the forensic record.' },
    discovery: {
        question: 'The article opens on the 2005 CT scan, jumps back to Carter\'s 1922 dig, then further back to Akhenaten\'s reign. Why scramble the timeline?',
        options: ['The flashbacks are rising action — they build the mystery of Tut\'s death that the scan must solve', 'Chronology doesn\'t matter in non-fiction', 'The scan is dull, so history is added for colour', 'The author couldn\'t decide where to begin'],
        answer: 'The flashbacks are rising action — they build the mystery of Tut\'s death that the scan must solve',
        hook: 'This is a cold case, not a chronicle — every jump backward is a clue the 2005 scan was called in to read.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas or messages that run alongside the primary theme, enriching the text by exploring complementary aspects of the human experience, historical context,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reorder the article\'s events into narrative order versus historical order, then assess what Carter\'s chiselling did to the evidence modern forensics inherited.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are watching a documentary where scientists use a CT scanner on a 3,300-year-old mummy — the main story is about what they discover, but the film.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in a literary text?', options: [
                { text: 'A secondary theme is a significant but subordinate idea that supports or contrasts with', outcome: 'A secondary theme is a significant but subordinate idea that supports or contrasts with the primary.' },
                { text: 'a minor detail', outcome: 'Not quite — Students often mistake recurring motifs (gold, curses, mummies) for themes.', reveals: 'students-often-mistake-recurring-motifs' },
                { text: 'a subplot', outcome: 'Not quite — Students often mistake recurring motifs (gold, curses, mummies) for themes.', reveals: 'students-often-mistake-recurring-motifs' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing in the Valley of the Kings at 6 p.m. on 5 January 2005: the wind is gritty on your face, the sky is a bruised purple, and.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" precisely as literary devices, and give one example of each from the first two paragraphs of "Discovering.', options: [
                { text: 'Imagery: sensory language creating mental pictures/sensations (e.g., "Dark-bellied clouds', outcome: 'Imagery: sensory language creating mental pictures/sensations (e.g., "Dark-bellied clouds had.' },
                { text: 'like a hammer', outcome: 'Not quite — Students treat "imagery" as synonymous with "visual description" and "metaphor" as any comparison.', reveals: 'students-treat-imagery-as-synonymous' },
                { text: 'description', outcome: 'Not quite — Students treat "imagery" as synonymous with "visual description" and "metaphor" as any comparison.', reveals: 'students-treat-imagery-as-synonymous' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are a detective examining a crime scene where the clues seem to contradict each other: the security system meant to protect the vault is what.',
            decisions: [{ prompt: 'Define situational irony and give one example from the chapter where the outcome of an action is the opposite of what was intended.', options: [
                { text: 'Situational irony occurs when the actual outcome of a situation is starkly different from', outcome: 'Situational irony occurs when the actual outcome of a situation is starkly different from what was.' },
                { text: 'Carter found the tomb', outcome: 'Not quite — Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that.', reveals: 'students-frequently-confuse-irony-with' },
                { text: 'The scanner broke', outcome: 'Not quite — Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that.', reveals: 'students-frequently-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading the sentence "Dark-bellied clouds had scudded across the desert sky" and you pause at "scudded." You don\'t know it.',
            decisions: [{ prompt: 'What is the primary contextual clue that distinguishes "forensic reconstruction" from a general "reconstruction" in the opening paragraph.', options: [
                { text: 'The primary clue is the phrase "precise data for an accurate forensic reconstruction"', outcome: 'The primary clue is the phrase "precise data for an accurate forensic reconstruction" linked to "CT.' },
                { text: 'rebuilding the tomb', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'forensic', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading a forensic report on a 3,300-year-old mummy — you would expect precise word pairings like "computed tomography" not "computer body.',
            decisions: [{ prompt: 'Define "collocation" and give one example from the chapter "Discovering Tut" that is NOT "funerary treasures".', options: [
                { text: 'A collocation is a predictable, habitual co-occurrence of two or more words that sounds', outcome: 'A collocation is a predictable, habitual co-occurrence of two or more words that sounds natural.' },
                { text: 'any adjective+noun pair like \'big tomb\'', outcome: 'Not quite — Students treat "Working with Words" as a vocabulary list to memorise rather than a linguistic.', reveals: 'students-treat-working-with-words' },
                { text: 'stunning artefacts', outcome: 'Not quite — Students treat "Working with Words" as a vocabulary list to memorise rather than a linguistic.', reveals: 'students-treat-working-with-words' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a news report about a scientific discovery: the headline gives you the literal facts (who, what, when), but to understand *why*.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is directly stated in the text (e.g., "When was the CT scan', outcome: 'A literal question\'s answer is directly stated in the text (e.g., "When was the CT scan done?" – "5.' },
                { text: 'Literal questions are easy, inferential are hard', outcome: 'Not quite — Students often think inferential questions are "opinion questions" with no right answer, so they.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'opinion questions', outcome: 'Not quite — Students often think inferential questions are "opinion questions" with no right answer, so they.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your archaeology-club poster on King Tut lists: \'1323 BCE — died; 1922 — tomb found; 2005 — CT scan.\' A teammate says the three dates are just facts to memorise, and asks why the 2005 team couldn\'t simply \'look at the body properly this time\'.',
            decisions: [{ prompt: 'How do the three events actually connect?', options: [
                { text: 'As a causal chain: Carter\'s 1922 excavation chiselled and dismembered the mummy to free it from hardened resins — creating the very damage the 2005 CT scan had to work around; and the 1323 BCE context (Akhenaten\'s religious upheaval) explains Tut\'s name change and the dynasty\'s collapse. The scan exists because the earlier handling destroyed what direct inspection could have answered.', outcome: 'Context is relational: each phase caused the next phase\'s problems — the article is about how evolving technology re-reads a mishandled past.' },
                { text: 'The teammate is right — dates are a list; the 2005 team just needed better eyes than Carter\'s crew.', outcome: 'The scan wasn\'t about better eyesight — 1,700 cross-sectional images were needed precisely because the body had been cut apart and reassembled in 1922.', reveals: 'context-as-memorised-dates' },
                { text: 'Carter\'s team was careful and professional; the damage story is exaggerated.', outcome: 'The text documents the dismemberment plainly; romanticising the discovery hides why forensic scanning became necessary eighty years later.', reveals: 'carter-did-no-damage' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'Tut\'s body reached the scanner already broken — by the resins that buried him and the rescue that dismembered him.',
            decisions: [{ prompt: 'What comes next? Discovering Tut: the Saga Continues · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Discovering Tut: the Saga Continues · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas or messages that run alongside the.',
          hint: 'Review the primary theme analysis in node 006 and the plot summary in node 002 to see.',
          misconception: 'Students often mistake recurring motifs (gold, curses, mummies) for themes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas or messages that run alongside the primary',
                  options: ['Secondary themes are the underlying ideas or messages that run alongside the primary', 'Before You Read: Context and Background provides essential historical, cultural, and', 'Plot is the sequence of events that make up a story, while narrative structure refers to', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review the primary theme analysis in node 006 and the plot summary in node 002 to see where.',
                  misconception: 'Students often mistake recurring motifs (gold, curses, mummies) for themes.' }
          ],
            remediations: { 'students-often-mistake-recurring-motifs': { steps: ['Ask the student to list five nouns that appear repeatedly in the text (e.g., gold, scanner, curse, resin, tomb).', 'For each noun, ask: "What human idea or conflict does this represent?" 3.', 'Guide them to phrase the answer as a complete sentence with an abstract noun (e.g., "The conflict between preservation.', 'Have them match each abstract idea to two textual moments.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review "tenor/vehicle/ground" terminology using a simple poem (e.g., "Hope is the thing.',
          misconception: 'Students treat "imagery" as synonymous with "visual description" and "metaphor" as any comparison.',
          parts: [
                { id: 'a', prompt: 'The text says: "The ritual resins had hardened, cementing Tut to the bottom of his solid gold coffin." Identify the metaphor here, name its tenor and vehicle.', answer: 'Metaphor: "cementing"',
                  options: ['Metaphor: "cementing"', 'the resin is like cement'],
                  hint: 'Review "tenor/vehicle/ground" terminology using a simple poem (e.g., "Hope is the thing with.',
                  misconception: 'Students treat "imagery" as synonymous with "visual description" and "metaphor" as any comparison.' }
          ],
            remediations: { 'students-treat-imagery-as-synonymous': { steps: ['**Re-sensitize senses**: Have the student close eyes while you read Para 1 aloud; they list every sensation felt (wind.', '**Metaphor surgery**: Take "cementing" — ask "If I replace this with \'sticking firmly\', what is lost?" (Answer: the.', 'Metaphor sort**: Give 5 comparisons from text; student sorts into two columns, justifying each.', '**Cross-domain mapping**: Practice creating metaphors where vehicle is from ancient Egypt, tenor is modern tech (as.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality—where the.',
          hint: 'If stuck, review the irony examples in Class 10 "A Letter to God" (c10_engl_cbse_01_005).',
          misconception: 'Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that the scanner broke".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the description "casket grey" (used for the sky) functions as a symbol rather than just a colour description.', answer: '"Casket grey" is a symbolic adjective',
                  options: ['"Casket grey" is a symbolic adjective', 'it means the sky was dark grey', 'It\'s ironic that the scanner broke'],
                  hint: 'If stuck, review the irony examples in Class 10 "A Letter to God" (c10_engl_cbse_01_005) and "The.',
                  misconception: 'Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that the scanner broke" — no, that\'s just.' },
                { id: 'b', prompt: 'Apply the concept of dramatic irony to the moment the guard jokes, "Curse of the pharaoh," when the CT scanner fails due to sand in the cooler fan.', answer: 'Dramatic irony exists when the audience possesses knowledge that characters lack',
                  options: ['Dramatic irony exists when the audience possesses knowledge that characters lack', 'It\'s ironic that the scanner broke'],
                  hint: 'If stuck, review the irony examples in Class 10 "A Letter to God" (c10_engl_cbse_01_005) and "The.',
                  misconception: 'Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that the scanner broke" — no, that\'s just.' },
                { id: 'c', prompt: 'Analyse how the *gold* of Tut\'s funerary treasures functions as a multi-layered symbol.', answer: 'For ancient Egyptians, gold symbolised divine flesh, eternal brilliance, and the',
                  options: ['For ancient Egyptians, gold symbolised divine flesh, eternal brilliance, and the', 'It\'s ironic that the scanner broke'],
                  hint: 'If stuck, review the irony examples in Class 10 "A Letter to God" (c10_engl_cbse_01_005) and "The.',
                  misconception: 'Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that the scanner broke" — no, that\'s just.' }
          ],
            remediations: { 'students-frequently-confuse-irony-with': { steps: ['**Isolate the mechanism**: Give the student two side-by-side sentences: "The fire station burned down" (irony) vs.', '"The fire station had a fire drill" (coincidence).', 'Ask: "What was the *purpose* of the fire station?', 'What *actually happened*?" 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that the scanner broke".',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s choice to end the chapter with the image of Orion "watching over the boy king." Does this symbolic closure resolve or undermine the.', answer: 'The ending *complicates* rather than resolves the scientific enterprise',
                  options: ['The ending *complicates* rather than resolves the scientific enterprise', 'It\'s ironic that the scanner broke'],
                  hint: 'If stuck, review the irony examples in Class 10 "A Letter to God" (c10_engl_cbse_01_005) and "The.',
                  misconception: 'Students frequently confuse **irony** with **coincidence** or **bad luck** (e.g., "It\'s ironic that the scanner broke" — no, that\'s just.' }
          ],
            remediations: { 'students-frequently-confuse-irony-with': { steps: ['**Isolate the mechanism**: Give the student two side-by-side sentences: "The fire station burned down" (irony) vs.', '"The fire station had a fire drill" (coincidence).', 'Ask: "What was the *purpose* of the fire station?', 'What *actually happened*?" 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of inferring precise meanings of words and.',
          hint: 'Review Class 9-10 vocabulary nodes on context clues (c9_engl_ch1_8, c10_engl_cbse_02_009).',
          misconception: 'Students believe "vocabulary in context" means guessing a synonym that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'Apply the context-clue strategy to determine the meaning of "circumvented" in this sentence: "If he hadn\'t cut the mummy free, thieves most certainly would.', answer: 'Step 1: Identify subject (thieves) and object (guards)',
                  options: ['Step 1: Identify subject (thieves) and object (guards)', 'defeated', 'killed', 'going around'],
                  hint: 'Review Class 9-10 vocabulary nodes on context clues (c9_engl_ch1_8, c10_engl_cbse_02_009) and.',
                  misconception: 'Students believe "vocabulary in context" means guessing a synonym that fits the sentence grammatically.' },
                { id: 'b', prompt: 'Analyze the collocation "casket grey" in "Dark-bellied clouds had scudded across the desert sky all day and now were veiling the stars in casket grey." How.', answer: '"Casket" explicitly evokes a coffin',
                  options: ['"Casket" explicitly evokes a coffin', 'vocabulary in context'],
                  hint: 'Review Class 9-10 vocabulary nodes on context clues (c9_engl_ch1_8, c10_engl_cbse_02_009) and.',
                  misconception: 'Students believe "vocabulary in context" means guessing a synonym that fits the sentence grammatically.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student gives only a generic synonym, do this: (1) Return to the exact sentence.', '(2) Ask: "What is the subject?', 'What is the weather doing?" (3) Have them list 5 verbs for cloud movement (drift, race, billow, scud, gather).', '(4) Ask which verb fits "dark-bellied" + "angry wind" + "veiling stars." (5) Show how "scudded" is the only one.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_011', difficulty: 'standard',
          question: 'Language usage in the text refers to the study of how lexical items combine.',
          hint: 'If stuck on collocation identification, review Class 6 "Adjectives and Adverbs".',
          misconception: 'Students treat "Working with Words" as a vocabulary list to memorise rather than a linguistic analysis task.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language usage in the text refers to the study of how lexical items combine into fixed',
                  options: ['Language usage in the text refers to the study of how lexical items combine into fixed', 'Before You Read: Context and Background provides essential historical, cultural, and', 'Plot is the sequence of events that make up a story, while narrative structure refers to', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck on collocation identification, review Class 6 "Adjectives and Adverbs" (c6_english_u3_028).',
                  misconception: 'Students treat "Working with Words" as a vocabulary list to memorise rather than a linguistic analysis task.' }
          ],
            remediations: { 'students-treat-working-with-words': { steps: ['Give the student a two-column table: Column A = 10 collocations from text, Column B = "Register".', 'Ask them to complete it using a dictionary.', 'Then have them rewrite paragraph 4 replacing each collocation with a synonym — discuss how tone shifts.', 'Finally, assign a mini-research: "Find one Indian language with <10,000 speakers and trace its domain loss over 50.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, review c11_eng_h_cbse_03_002 (Plot) to re-sequence events, and.',
          misconception: 'Students often think inferential questions are "opinion questions" with no right answer, so they write personal guesses.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the author writes: "The million-dollar scanner had quit because of sand in a cooler fan.', answer: 'The guard\'s nervousness is an *inferential* detail',
                  options: ['The guard\'s nervousness is an *inferential* detail', 'opinion questions', 'I think the curse is real', 'the curse is real")'],
                  hint: 'If stuck, review c11_eng_h_cbse_03_002 (Plot) to re-sequence events, and c11_eng_h_cbse_03_010.',
                  misconception: 'Students often think inferential questions are "opinion questions" with no right answer, so they write personal guesses (e.g., "I think the.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['Give the student a short paragraph from the chapter (e.g., the "angry wind" opening).', 'Ask them to highlight every *explicit fact* (literal).', 'For each highlighted fact, ask "What does this *suggest* about the mood/setting?" and require them to write the.', 'Practice with the textbook\'s "Understanding the text" questions: label each as L or I, then answer using the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
