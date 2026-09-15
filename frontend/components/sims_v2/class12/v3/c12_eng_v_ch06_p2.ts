import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch06_p2: SimDef = {
    id: 'v3_c12_eng_v_ch06_p2',
    title: 'Memories of Childhood · Part 2/3',
    subtitle: 'A pair of scissors and a string-held packet — oppression\'s small tools',
    classLevel: 12, subject: 'eng_v', topic: 'Memories of Childhood · Part 2/3',
    chapters: ['c12_eng_v_ch06'],
    nodeIds: ['c12_eng_v_cbse_06_007', 'c12_eng_v_cbse_06_008', 'c12_eng_v_cbse_06_009', 'c12_eng_v_cbse_06_010', 'c12_eng_v_cbse_06_011', 'c12_eng_v_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Memoir analyst', intro: 'A Dakota girl hides under a bed to save her hair; a Tamil girl watches an elder carry food like it\'s radioactive. Two systems, one chapter.', goal: 'Read both childhood narratives as systemic oppression — forced assimilation and caste — working through children.' },
    discovery: {
        question: 'Two childhoods, two systems: Zitkala-Sa\'s braids cut off at a boarding school; a Dalit elder carrying a vadai packet by its string so no one is \'polluted.\' What links these memories?',
        options: ['Both are systems working on children — state-enforced assimilation in one, everyday untouchability in the other; small scenes revealing whole machines', 'Nothing — different countries', 'Both are just sad anecdotes', 'Only racism links them'],
        answer: 'Both are systems working on children — state-enforced assimilation in one, everyday untouchability in the other; small scenes revealing whole machines',
        hook: 'The haircut was cultural annihilation, not hygiene — among her people only mourners and captured cowards were shingled. And the packet carried by its string was pollution theory performed in public. Each scene is evidence, not anecdote; read the system inside the memory.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, motifs, and concerns that run alongside the primary theme in a literary work, enriching its texture and providing multiple layers of meaning; in "Memories.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Cross two worlds of enforced shame: decode the Carlisle school\'s bells and scissors beside a Tamil village\'s rules of touch — and weigh Judewin\'s submission against Annan\'s counsel to study and fight.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re sitting in the examination hall and the question asks: "Compare how the theme of \'education as a tool of liberation\' appears in both extracts.".',
            decisions: [{ prompt: 'List any three secondary themes present in both "The Cutting of My Long Hair" and "We Too Are Human Beings."', options: [
                { text: 'Correct answer: Cultural erasure/loss of identity (hair cutting / caste pollution rules),', outcome: 'Correct answer: Cultural erasure/loss of identity (hair cutting / caste pollution rules), childhood.' },
                { text: 'little animals driven by a herder', outcome: 'Not quite — Students consistently treat "secondary themes" as "minor themes" — assuming they are less important.', reveals: 'students-consistently-treat-secondary-themes' },
                { text: 'pollution', outcome: 'Not quite — Students consistently treat "secondary themes" as "minor themes" — assuming they are less important.', reveals: 'students-consistently-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a film of your own most painful childhood memory — what do you *see* (the colour of the walls), *hear* (the sound of a bell), *feel*.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words. Give one example of each from *any* text you have studied previously (Class 6–11).', options: [
                { text: '**Correct Answer:** Imagery is descriptive language that appeals to the senses (sight,', outcome: '**Correct Answer:** Imagery is descriptive language that appeals to the senses (sight, sound.' },
                { text: 'like a thief', outcome: 'Not quite — **Students think "imagery" means only visual description (pictures in the mind) and that "metaphor".', reveals: 'students-think-imagery-means-only' },
                { text: 'imagery', outcome: 'Not quite — **Students think "imagery" means only visual description (pictures in the mind) and that "metaphor".', reveals: 'students-think-imagery-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are reading Bama\'s description of the elder carrying the vadai packet by its string — at first it looks funny, but your brother explains it\'s.',
            decisions: [{ prompt: 'Define situational irony and give one example from Zitkala-Sa\'s narrative where the outcome is the opposite of what the character intends.', options: [
                { text: 'Situational irony occurs when actions produce an outcome contrary to what was intended or', outcome: 'Situational irony occurs when actions produce an outcome contrary to what was intended or expected.' },
                { text: 'the hair cutting is sad', outcome: 'Not quite — Students often confuse irony with coincidence or bad luck. For example, they label Zitkala-Sa\'s.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Have you ever noticed how a writer\'s choice of "I was dragged" instead of "They dragged me" makes you feel the victim\'s helplessness more sharply?',
            decisions: [{ prompt: 'Identify the tense and voice of the verb phrase "had been stripped" in the sentence "my blanket had been stripped from my shoulders" from.', options: [
                { text: 'The verb phrase "had been stripped" is in the past perfect passive voice', outcome: 'The verb phrase "had been stripped" is in the past perfect passive voice.' },
                { text: 'simple past passive', outcome: 'Not quite — Students often treat "grammar analysis" as labelling parts of speech or tenses without linking.', reveals: 'students-often-treat-grammar-analysis' },
                { text: 'past perfect active', outcome: 'Not quite — Students often treat "grammar analysis" as labelling parts of speech or tenses without linking.', reveals: 'students-often-treat-grammar-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you receive a text from a friend: "I\'m fine." The **literal** meaning is exactly those words.',
            decisions: [{ prompt: 'What is the **explicit reason** Zitkala-Sa gives for hiding under the bed on her first day at the Carlisle school?', options: [
                { text: 'Correct answer: She hides', outcome: 'Correct answer: She hides because her friend Judewin warned her that the authorities plan to cut.' },
                { text: 'She was scared of the bell', outcome: 'Not quite — Students treat inferential questions as **"write your opinion"** and give answers like "Zitkala-Sa.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'She missed her mother', outcome: 'Not quite — Students treat inferential questions as **"write your opinion"** and give answers like "Zitkala-Sa.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At your coaching institute, a girl from a marginalised community is quietly served tea last and made to sit apart \'as per tradition.\' She\'s furious and ready to drop out; others say either fight publicly or swallow it.',
            decisions: [{ prompt: 'Which path does \'Memories of Childhood\' validate?', options: [
                { text: 'Annan\'s answer to Bama: the humiliation is real and rage is justified, but the durable reply is to study, excel, and make yourself impossible to keep out — Bama tops her class and the same village comes to her.', outcome: 'Both episodes pair violation with response: Zitkala-Sa loses her hair to forced assimilation; Bama converts the vadai-packet humiliation into academic climb, because education is the one door the hierarchy can\'t hold shut.' },
                { text: 'Make a scene right there — public protest is the only language such insults understand.', outcome: 'The chapter distinguishes anger from strategy: Bama\'s fury is validated but channelled; Annan explicitly warns that indignation without education changes nothing about who gets served last.', reveals: 'outrage-equals-resistance' },
                { text: 'Advise her to endure quietly — making waves will only make the exclusion worse.', outcome: 'That\'s the reading the paired structure refutes: neither woman resigns — one resists bodily and is overpowered, the other resists through achievement; the chapter never treats silent endurance as dignity.', reveals: 'endurance-equals-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a childhood memory as forensic evidence of oppression — and tell the difference between resistance that submits and resistance that studies.',
            decisions: [{ prompt: 'What comes next? Memories of Childhood · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Memories of Childhood · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, motifs, and concerns that run.',
          hint: 'If stuck, return to c12_eng_v_cbse_06_006 and re-do the "Theme-Evidence Mapping" exercise.',
          misconception: 'Students consistently treat "secondary themes" as "minor themes" — assuming they are less important or less examinable.',
          parts: [
                { id: 'a', prompt: 'Analyze how the theme of "intergenerational wisdom" functions as both comfort and catalyst for resistance in both extracts.', answer: 'Correct answer: In Zitkala-Sa, the mother\'s teachings ("only unskilled warriors',
                  options: ['Correct answer: In Zitkala-Sa, the mother\'s teachings ("only unskilled warriors', 'both give advice'],
                  hint: 'If stuck, return to c12_eng_v_cbse_06_006 and re-do the "Theme-Evidence Mapping" exercise for the.',
                  misconception: 'Students consistently treat "secondary themes" as "minor themes" — assuming they are less important or less examinable.' }
          ],
            remediations: { 'students-consistently-treat-secondary-themes': { steps: ['If a student cannot distinguish primary from secondary themes or finds no textual evidence: (1) Have them re-read both.', '(2) Use the "Theme-Evidence Table" template: Column A = Theme Name, Column B = Zitkala-Sa quote, Column C = Bama quote.', '(3) Assign a micro-task: "Find three moments where a child notices something an adult ignores" — this unlocks the.', '(4) Re-diagnose with Diagnostic Question 2 after 48 hours to check retention.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If unsure about tenor/vehicle or sensory modes, review **c11_eng_h_cbse_01_008** (Class.',
          misconception: '**Students think "imagery" means only visual description (pictures in the mind) and that "metaphor" is just decorative.',
          parts: [
                { id: 'a', prompt: 'In Zitkala-Sa\'s extract, the narrator says: *"The constant clash of harsh noises, with an undercurrent of many voices murmuring an unknown tongue, made.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'murmuring', 'imagery', 'metaphor'],
                  hint: 'If unsure about tenor/vehicle or sensory modes, review **c11_eng_h_cbse_01_008** (Class 11 Imagery.',
                  misconception: '**Students think "imagery" means only visual description (pictures in the mind) and that "metaphor" is just decorative language.** *Why.' },
                { id: 'b', prompt: '**Analyze:** Compare how **tactile imagery** (touch) is used in the two extracts.', answer: '**Correct Answer:** Zitkala-Sa: "cold blades against my neck"',
                  options: ['**Correct Answer:** Zitkala-Sa: "cold blades against my neck"', 'invasive touch', 'imagery', 'metaphor'],
                  hint: 'If unsure about tenor/vehicle or sensory modes, review **c11_eng_h_cbse_01_008** (Class 11 Imagery.',
                  misconception: '**Students think "imagery" means only visual description (pictures in the mind) and that "metaphor" is just decorative language.** *Why.' }
          ],
            remediations: { 'students-think-imagery-means-only': { steps: ['**Revisit sensory classification:** Take the Zitkala-Sa extract (para 1) and highlight every word appealing to sound.', '**Metaphor surgery:** Pick one metaphor (e.g., "bedlam").', 'Write: Tenor = ___; Vehicle = ___; Ground (shared quality) = ___; Cultural baggage of vehicle = ___.', '**Re-diagnostic:** Retry Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students think "imagery" means only visual description (pictures in the mind) and that "metaphor" is just decorative.',
          parts: [
                { id: 'a', prompt: '**Evaluate:** Which metaphor more powerfully encapsulates the **central trauma** of its narrator — Zitkala-Sa\'s *"my long hair was shingled like a coward\'s"*.', answer: '**Correct Answer:** Zitkala-Sa\'s metaphor is more powerful *as a metaphor*',
                  options: ['**Correct Answer:** Zitkala-Sa\'s metaphor is more powerful *as a metaphor*', 'caste is worse', 'imagery', 'metaphor'],
                  hint: 'If unsure about tenor/vehicle or sensory modes, review **c11_eng_h_cbse_01_008** (Class 11 Imagery.',
                  misconception: '**Students think "imagery" means only visual description (pictures in the mind) and that "metaphor" is just decorative language.** *Why.' }
          ],
            remediations: { 'students-think-imagery-means-only': { steps: ['**Revisit sensory classification:** Take the Zitkala-Sa extract (para 1) and highlight every word appealing to sound.', '**Metaphor surgery:** Pick one metaphor (e.g., "bedlam").', 'Write: Tenor = ___; Vehicle = ___; Ground (shared quality) = ___; Cultural baggage of vehicle = ___.', '**Re-diagnostic:** Retry Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1 Literary Devices: Irony and Symbolism.',
          misconception: 'Students often confuse irony with coincidence or bad luck. For example, they label Zitkala-Sa\'s hair cutting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where there is a contrast between expectation and reality',
                  options: ['Irony is a literary device where there is a contrast between expectation and reality', 'The "Before You Read: Context and Background" section for "Memories of Childhood"', 'Plot and Narrative Structure refers to the sequence of events in a story and the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 Literary Devices: Irony and Symbolism.',
                  misconception: 'Students often confuse irony with coincidence or bad luck. For example, they label Zitkala-Sa\'s hair cutting as "ironic" simply because.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['Revisit the definitions: write one sentence each for situational, dramatic, and verbal irony with a non-text example.', 'Reread the two key scenes (hair cutting, vadai packet) and annotate: "What did the character expect?" vs "What.', 'Practice with a simpler text: use the Class 10 "A Letter to God" (c10_engl_cbse_01_007) where Lencho\'s faith brings him.', 'Return to "Memories of Childhood" and write a 4-sentence PEEL paragraph for one irony and one symbol.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'If stuck, review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" vocabulary node.',
          misconception: 'Students treat vocabulary-in-context questions as "find the synonym" exercises.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar words by',
                  options: ['Vocabulary in Context is the skill of determining the meaning of unfamiliar words by', 'The "Before You Read: Context and Background" section for "Memories of Childhood"', 'Plot and Narrative Structure refers to the sequence of events in a story and the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review Class 11 Hornbill Chapter 1 "The Portrait of a Lady" vocabulary node.',
                  misconception: 'Students treat vocabulary-in-context questions as "find the synonym" exercises.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student re-read the "bedlam" paragraph aloud, circling every sensory word (metallic, clatter, clash.', 'Ask: "Which sense does each word appeal to?', 'How does the pile-up of sensory words create the meaning of \'bedlam\'?" 2.', 'For "shingled," have them draw two quick sketches: one of "short hair" (neutral) and one of "shingled hair" (blunt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'If stuck on tense/voice identification, review the verb phrase structure table.',
          misconception: 'Students often treat "grammar analysis" as labelling parts of speech or tenses without linking to authorial intent.',
          parts: [
                { id: 'a', prompt: 'Identify the tense and voice of the verb phrase "had been stripped" in the sentence "my blanket had been stripped from my shoulders" from Zitkala-Sa\'s.', answer: 'The verb phrase "had been stripped" is in the past perfect passive voice',
                  options: ['The verb phrase "had been stripped" is in the past perfect passive voice', 'simple past passive', 'past perfect active'],
                  hint: 'If stuck on tense/voice identification, review the verb phrase structure table in c6_english_u2_018.',
                  misconception: 'Students often treat "grammar analysis" as labelling parts of speech or tenses without linking to authorial intent.' }
          ],
            remediations: { 'students-often-treat-grammar-analysis': { steps: ['Revisit the distinction between tense (time) and aspect (viewpoint on time) using c6_english_u2_018 (Tenses) and.', 'Practice converting 5 active sentences from the text to passive and vice versa, then articulate the shift.', 'Complete a focused exercise: highlight every verb in a 50-word segment, label tense/voice, and write one sentence per.', 'Re-attempt Diagnostic Question 4 as a check.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_06_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'Review **c12_eng_v_cbse_06_002 (Plot)** for event mapping and **c12_eng_v_cbse_06_004.',
          misconception: 'Students treat inferential questions as **"write your opinion"** and give answers like "Zitkala-Sa hid because she was.',
          parts: [
                { id: 'a', prompt: 'What is the **explicit reason** Zitkala-Sa gives for hiding under the bed on her first day at the Carlisle school?', answer: 'Correct answer: She hides',
                  options: ['Correct answer: She hides', 'She was scared of the bell', 'She missed her mother', 'What did the elder carry?'],
                  hint: 'Review **c12_eng_v_cbse_06_002 (Plot)** for event mapping and **c12_eng_v_cbse_06_004 (Character)**.',
                  misconception: 'Students treat inferential questions as **"write your opinion"** and give answers like "Zitkala-Sa hid because she was a rebellious child".' },
                { id: 'b', prompt: '**Apply** the literal/inferential distinction to this new question: "Why did Zitkala-Sa cry when the third bell was tapped?" Classify the question type and.', answer: 'Classification: **Literal** (the text explicitly states the reason)',
                  options: ['Classification: **Literal** (the text explicitly states the reason)', 'What did the elder carry?', 'He carried vadais humiliatingly', 'humiliatingly'],
                  hint: 'Review **c12_eng_v_cbse_06_002 (Plot)** for event mapping and **c12_eng_v_cbse_06_004 (Character)**.',
                  misconception: 'Students treat inferential questions as **"write your opinion"** and give answers like "Zitkala-Sa hid because she was a rebellious child".' },
                { id: 'c', prompt: '**Analyze** the following two questions and identify which requires synthesizing clues from **multiple paragraphs** of Bama\'s extract: (a) What did Bama see.', answer: 'Question (b) is the inferential one requiring synthesis',
                  options: ['Question (b) is the inferential one requiring synthesis', 'What did the elder carry?', 'He carried vadais humiliatingly', 'humiliatingly'],
                  hint: 'Review **c12_eng_v_cbse_06_002 (Plot)** for event mapping and **c12_eng_v_cbse_06_004 (Character)**.',
                  misconception: 'Students treat inferential questions as **"write your opinion"** and give answers like "Zitkala-Sa hid because she was a rebellious child".' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['**Re-read** the two extracts with two highlighters: **yellow** for explicit facts (who, what, when, where), **pink**.', '**Practice classification**: Take the "Reading with Insight" questions at chapter-end and label each L or I.', '**Write one-sentence answers** for three literal questions using **only quoted phrases**.', '**Write one inferential answer** using the template: "The text shows _____ (clue 1) and _____ (clue 2), so it suggests.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
