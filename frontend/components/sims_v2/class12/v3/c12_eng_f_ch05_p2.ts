import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch05_p2: SimDef = {
    id: 'v3_c12_eng_f_ch05_p2',
    title: 'Indigo · Part 2/3',
    subtitle: 'The court case Gandhi lost on purpose — and won a movement',
    classLevel: 12, subject: 'eng_f', topic: 'Indigo · Part 2/3',
    chapters: ['c12_eng_f_ch05'],
    nodeIds: ['c12_eng_f_cbse_05_007', 'c12_eng_f_cbse_05_008', 'c12_eng_f_cbse_05_009', 'c12_eng_f_cbse_05_010', 'c12_eng_f_cbse_05_011', 'c12_eng_f_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Historical biographer', intro: 'A sharecropper walked to Lucknow to fetch a lawyer. What came back was a method that would free a nation.', goal: 'Understand the Champaran satyagraha\'s economic roots and Gandhi\'s discovery that fearlessness precedes law.' },
    discovery: {
        question: 'Gandhi arrives in Champaran, disobeys a court order, pleads guilty — and the case collapses. Students call him \'a brilliant courtroom strategist.\' What did he actually discover?',
        options: ['Courts were useless for fear-stricken peasants — the real relief was freedom from fear, won by mass civil disobedience outside the courtroom', 'Exactly — he won on a legal technicality', 'The judge was bribed', 'The peasants hired better lawyers'],
        answer: 'Courts were useless for fear-stricken peasants — the real relief was freedom from fear, won by mass civil disobedience outside the courtroom',
        hook: 'Champaran began as humanitarian relief — peasants forced to grow indigo on 3/20 of their land, then charged compensation when synthetic dye made it worthless — and became political only under repression. It was a satyagraha template, not a lawsuit.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Indigo\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct the first satyagraha: decode the tinkathia trap and the synthetic-indigo squeeze, weigh the professor who dared shelter Gandhi, then watch fearlessness — not litigation — bend an empire.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Indigo\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a "secondary theme" in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea or motif that runs parallel to the primary theme,', outcome: 'A secondary theme is a supporting idea or motif that runs parallel to the primary theme, adding.' },
                { text: 'minor details', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor characters." They think.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse "secondary themes" with "subplots" or "minor characters." They think.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Indigo\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, then give one example of each from the "Indigo" chapter (cite the approximate location.', options: [
                { text: 'Imagery: sensory language creating mental pictures (e.g., "town of Motihari black with', outcome: 'Imagery: sensory language creating mental pictures (e.g., "town of Motihari black with peasants".' },
                { text: 'like a battle', outcome: 'Not quite — Students treat imagery and metaphor as decorative "figures of speech" to be *spotted* and *named*.', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'poor and emaciated', outcome: 'Not quite — Students treat imagery and metaphor as decorative "figures of speech" to be *spotted* and *named*.', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Indigo\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What are the four common types of context clues used to infer word meanings?', options: [
                { text: 'The four types are: (1) Definition/Explanation clue', outcome: 'The four types are: (1) Definition/Explanation clue — e.g., "sharecroppers ...' },
                { text: 'dictionary', outcome: 'Not quite — Students often think vocabulary in context means guessing the meaning from a single sentence.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'guessing', outcome: 'Not quite — Students often think vocabulary in context means guessing the meaning from a single sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Indigo\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the grammatical term for the underlined structure in this sentence from *Indigo*: "When I first visited Gandhi in 1942 at his.', options: [
                { text: 'The underlined structure is a **fronted adverbial subordinate clause of time** (also', outcome: 'The underlined structure is a **fronted adverbial subordinate clause of time** (also called.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students treat "direct speech = quotation marks" and "comma before \'when/because/if\'" as mechanical.', reveals: 'students-treat-direct-speech-quotation' },
                { text: 'main clause', outcome: 'Not quite — Students treat "direct speech = quotation marks" and "comma before \'when/because/if\'" as mechanical.', reveals: 'students-treat-direct-speech-quotation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Indigo\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What was the sharecropping arrangement in Champaran regarding indigo.', options: [
                { text: 'This is a **literal** question', outcome: 'This is a **literal** question because the answer is explicitly stated in the text: "The landlords.' },
                { text: 'List the places Gandhi visited', outcome: 'Not quite — Students often treat inferential questions as "opinion questions" and write answers based.', reveals: 'students-often-treat-inferential-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Interning in a village, you\'re asked by sharecroppers to draft and file their entire grievance for them — \'you\'re educated, you handle it\'.',
            decisions: [{ prompt: 'What would the Champaran lesson say?', options: [
                { text: 'Coach them to organise and represent themselves — Gandhi\'s real win at Champaran was curing the peasants\' fear and dependency, not merely the refund he negotiated.', outcome: 'Doing it for them leaves the helplessness intact; self-reliance was the point of the satyagraha, not the settlement.' },
                { text: 'File it yourself — they need results, and you write better petitions.', outcome: 'That wins a case but not freedom; they remain dependent on the next educated outsider.', reveals: 'dependency-not-empowerment' },
                { text: 'Tell them to wait until a strong leader comes along.', outcome: 'Champaran began because ordinary people acted — waiting for saviours is the very fear the episode broke.', reveals: 'waiting-for-savior' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue why Champaran mattered more than a courtroom win — it manufactured courage. Fischer\'s biography reads like a field manual for moral resistance.',
            decisions: [{ prompt: 'What comes next? Indigo · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Indigo · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes in \'Indigo\' — the supporting ideas and motifs that deepen the.',
          hint: 'If stuck, review c12_eng_f_cbse_05_006 (Primary Theme) and practice converting three plot.',
          misconception: 'Students often confuse "secondary themes" with "subplots" or "minor characters." They think identifying a secondary.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Indigo\'',
                  options: ['Secondary themes in \'Indigo\'', '\'Indigo\' (Flamingo, ch', 'The plot/narrative arc of \'Indigo\'', 'The setting of \'Indigo\''],
                  hint: 'If stuck, review c12_eng_f_cbse_05_006 (Primary Theme) and practice converting three plot points.',
                  misconception: 'Students often confuse "secondary themes" with "subplots" or "minor characters." They think identifying a secondary theme means listing.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student cannot distinguish theme from plot/character arc: Step 1 — Have them complete this sentence frame for.', 'Step 2 — Give them two statements: "Gandhi refused Andrews\' help" (plot) vs "Self-reliance is necessary for true.', 'Ask which is the theme and why.', 'Step 3 — Re-read the "Understanding the text" Q3 in NCERT: "How do we know that ordinary people too contributed to the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_008', difficulty: 'standard',
          question: 'Imagery in \'Indigo\' — the vivid, sensory language that creates word-pictures.',
          hint: 'Review c11_eng_h_cbse_01_008 worked examples on separating vehicle/tenor in metaphors and.',
          misconception: 'Students treat imagery and metaphor as decorative "figures of speech" to be *spotted* and *named* for marks, rather.',
          parts: [
                { id: 'a', prompt: 'The text says: "The whole area throbbed with the activity of the investigators and the vehement protests of the landlords." Identify the imagery type, the.', answer: 'Type: kinetic/organic imagery (internal sensation of rhythm/pulse)',
                  options: ['Type: kinetic/organic imagery (internal sensation of rhythm/pulse)', 'auditory imagery', 'it\'s just a verb'],
                  hint: 'Review c11_eng_h_cbse_01_008 worked examples on separating vehicle/tenor in metaphors and mapping.',
                  misconception: 'Students treat imagery and metaphor as decorative "figures of speech" to be *spotted* and *named* for marks, rather than as *argumentative.' },
                { id: 'b', prompt: 'In the courtroom scene, Gandhi says he disregarded the order "not for want of respect for lawful authority, but in obedience to the higher law of our being.', answer: 'Metaphors: (1) "higher law of our being"',
                  options: ['Metaphors: (1) "higher law of our being"', 'symbolism'],
                  hint: 'Review c11_eng_h_cbse_01_008 worked examples on separating vehicle/tenor in metaphors and mapping.',
                  misconception: 'Students treat imagery and metaphor as decorative "figures of speech" to be *spotted* and *named* for marks, rather than as *argumentative.' },
                { id: 'c', prompt: 'Compare the imagery in these two passages: (a) "Sharecroppers from Champaran began arriving on foot and by conveyance to see their champion" and (b) "Morning.', answer: 'Passage (a): movement imagery ("arriving on foot," "by conveyance")',
                  options: ['Passage (a): movement imagery ("arriving on foot," "by conveyance")', 'crowds'],
                  hint: 'Review c11_eng_h_cbse_01_008 worked examples on separating vehicle/tenor in metaphors and mapping.',
                  misconception: 'Students treat imagery and metaphor as decorative "figures of speech" to be *spotted* and *named* for marks, rather than as *argumentative.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['If a student cannot move beyond identification: (1) Have them re-read the "Motihari black with peasants" paragraph and.', '(2) Ask: "If Fischer wrote \'many peasants gathered,\' what *experience* is lost?" (3) Guide them to complete this.', 'If still stuck, revisit c11_eng_h_cbse_01_008 (Class 11 Imagery and Metaphor) for foundational practice on *function*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Indigo\' — where opposite things are both true, or meaning.',
          hint: 'If stuck on identifying irony: reread the courtroom scene (Motihari) and the settlement.',
          misconception: 'Students often confuse irony with coincidence or bad luck. In "Indigo," they may say "It\'s ironic that synthetic indigo.',
          parts: [
                { id: 'a', prompt: 'In the Motihari court scene, Gandhi says he is involved in a "conflict of duties" — not to set a bad example as a lawbreaker, but to render "humanitarian and.', answer: 'Verbal irony occurs',
                  options: ['Verbal irony occurs', 'Gandhi is being sarcastic'],
                  hint: 'If stuck on identifying irony: reread the courtroom scene (Motihari) and the settlement scene.',
                  misconception: 'Students often confuse irony with coincidence or bad luck. In "Indigo," they may say "It\'s ironic that synthetic indigo was invented" — but.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If the student cannot distinguish irony from coincidence: (1) Have them reread the definition: irony = contrast between.', '(2) Use a two-column table: Column A = "What the character/reader expects", Column B = "What actually happens" for.', '(3) Revisit c12_eng_f_cbse_05_002 (Plot) to map the narrative arc, then c12_eng_f_cbse_05_006 (Primary Theme) to see.', '(4) Re-diagnostic: Ask them to explain the irony in the planters hiring thugs while claiming to be law-upholding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse irony with coincidence or bad luck. In "Indigo," they may say "It\'s ironic that synthetic indigo.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the peasants\' spontaneous demonstration outside the Motihari courthouse as a symbol.', answer: 'Yes, the demonstration is a more powerful symbol of collective liberation',
                  options: ['Yes, the demonstration is a more powerful symbol of collective liberation', 'the beginning of their liberation from fear of the British', 'Contributions made by anonymous Indians to the freedom movement'],
                  hint: 'If stuck on identifying irony: reread the courtroom scene (Motihari) and the settlement scene.',
                  misconception: 'Students often confuse irony with coincidence or bad luck. In "Indigo," they may say "It\'s ironic that synthetic indigo was invented" — but.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If the student cannot distinguish irony from coincidence: (1) Have them reread the definition: irony = contrast between.', '(2) Use a two-column table: Column A = "What the character/reader expects", Column B = "What actually happens" for.', '(3) Revisit c12_eng_f_cbse_05_002 (Plot) to map the narrative arc, then c12_eng_f_cbse_05_006 (Primary Theme) to see.', '(4) Re-diagnostic: Ask them to explain the irony in the planters hiring thugs while claiming to be law-upholding.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Indigo\' — the words and phrases you must know to read the.',
          hint: 'Review the "Context Clue Flowchart" from Class 11 (c11_eng_h_cbse_05_010) and practice.',
          misconception: 'Students often think vocabulary in context means guessing the meaning from a single sentence.',
          parts: [
                { id: 'a', prompt: 'What are the four common types of context clues used to infer word meanings? List them with a one-word example for each type from the chapter "Indigo".', answer: 'The four types are: (1) Definition/Explanation clue',
                  options: ['The four types are: (1) Definition/Explanation clue', 'dictionary', 'guessing', 'vocabulary in context means guessing the meaning from a single sentence'],
                  hint: 'Review the "Context Clue Flowchart" from Class 11 (c11_eng_h_cbse_05_010) and practice with the.',
                  misconception: 'Students often think vocabulary in context means guessing the meaning from a single sentence.' },
                { id: 'b', prompt: 'In the sentence "It was an extraordinary thing in those days for a government professor to harbour a man like me", explain why \'harbour\' does not mean \'a place.', answer: '\'Harbour\' here is a **verb** meaning \'to give shelter or refuge to\'',
                  options: ['\'Harbour\' here is a **verb** meaning \'to give shelter or refuge to\'', 'vocabulary in context means guessing the meaning from a single sentence'],
                  hint: 'Review the "Context Clue Flowchart" from Class 11 (c11_eng_h_cbse_05_010) and practice with the.',
                  misconception: 'Students often think vocabulary in context means guessing the meaning from a single sentence.' },
                { id: 'c', prompt: 'Using the context-clue method, infer the meaning of \'synthetic indigo\' in the passage: "Presently, the landlords learned that Germany had developed synthetic.', answer: 'Synthetic indigo: artificially manufactured indigo dye produced in',
                  options: ['Synthetic indigo: artificially manufactured indigo dye produced in', 'vocabulary in context means guessing the meaning from a single sentence'],
                  hint: 'Review the "Context Clue Flowchart" from Class 11 (c11_eng_h_cbse_05_010) and practice with the.',
                  misconception: 'Students often think vocabulary in context means guessing the meaning from a single sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot infer meanings, have them: (1) Re-read the specific paragraph containing the word, (2) Highlight.', 'Then re-attempt Diagnostic Questions 2 and 3.', 'If still stuck, review Class 11 vocabulary nodes (c11_eng_h_cbse_01_010, c11_eng_h_cbse_02_010) for basic context-clue.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_011', difficulty: 'standard',
          question: 'Language and style in \'Indigo\' — how the writer chose words, sentences and tone.',
          hint: 'If clause identification is shaky, review Class 8/9 grammar: "Subordinate Clauses and.',
          misconception: 'Students treat "direct speech = quotation marks" and "comma before \'when/because/if\'" as mechanical rules, missing that.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Fischer uses direct speech for Gandhi\'s court statement ("I am involved in a conflict of duties...") but reported speech for the.', answer: 'Direct speech preserves Gandhi\'s exact words, voice, and moral authority',
                  options: ['Direct speech preserves Gandhi\'s exact words, voice, and moral authority', 'direct speech is for important people'],
                  hint: 'If clause identification is shaky, review Class 8/9 grammar: "Subordinate Clauses and Conjunctions".',
                  misconception: 'Students treat "direct speech = quotation marks" and "comma before \'when/because/if\'" as mechanical rules, missing that Fischer *chooses*.' }
          ],
            remediations: { 'students-treat-direct-speech-quotation': { steps: ['Revisit the textbook\'s "Thinking about language" Q2 (comma rule) — copy the three example sentences (a, b, c) and.', 'In the *Indigo* text, highlight every direct speech quotation in yellow and every reported speech in pink; count each.', 'Write one PEEL paragraph analysing a single grammatical choice (e.g., "The passive voice in \'was served with.', 'Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Indigo\' — questions answered straight from the text.',
          hint: 'If stuck, re-read the "Think as you read" questions embedded in the NCERT text (pages.',
          misconception: 'Students often treat inferential questions as "opinion questions" and write answers based on personal feelings.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What was the sharecropping arrangement in Champaran regarding indigo cultivation?"', answer: 'This is a **literal** question',
                  options: ['This is a **literal** question', 'List the places Gandhi visited'],
                  hint: 'If stuck, re-read the "Think as you read" questions embedded in the NCERT text (pages 46-53) — they.',
                  misconception: 'Students often treat inferential questions as "opinion questions" and write answers based on personal feelings or general knowledge (e.g.' },
                { id: 'b', prompt: 'Explain in your own words why the servants at Rajendra Prasad\'s house thought Gandhi was another peasant.', answer: 'The servants knew Shukla as a poor yeoman who pestered their master',
                  options: ['The servants knew Shukla as a poor yeoman who pestered their master', 'because Gandhi was poor', 'List the places Gandhi visited'],
                  hint: 'If stuck, re-read the "Think as you read" questions embedded in the NCERT text (pages 46-53) — they.',
                  misconception: 'Students often treat inferential questions as "opinion questions" and write answers based on personal feelings or general knowledge (e.g.' },
                { id: 'c', prompt: 'Apply the PEEL structure to answer this inferential question: "Why did Gandhi chide the lawyers for collecting big fees from the sharecroppers?" Use evidence.', answer: '**Point:** Gandhi chided the lawyers',
                  options: ['**Point:** Gandhi chided the lawyers', 'List the places Gandhi visited'],
                  hint: 'If stuck, re-read the "Think as you read" questions embedded in the NCERT text (pages 46-53) — they.',
                  misconception: 'Students often treat inferential questions as "opinion questions" and write answers based on personal feelings or general knowledge (e.g.' }
          ],
            remediations: { 'students-often-treat-inferential-questions': { steps: ['Label each as L (literal) or I (inferential).', 'For L, highlight the exact sentence(s) in the text.', 'For I, write the inference and the evidence chain.', 'Re-attempt Diagnostic Questions 1-4. If still stuck, revisit c12_eng_f_cbse_05_002 (Plot and Narrative Structure).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
