import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch02_p2: SimDef = {
    id: 'v3_c12_eng_k_ch02_p2',
    title: 'Eveline (Short Story) · Part 2/3',
    subtitle: 'The ship waited. The railing won.',
    classLevel: 12, subject: 'eng_k', topic: 'Eveline (Short Story) · Part 2/3',
    chapters: ['c12_eng_k_ch02'],
    nodeIds: ['c12_eng_k_cbse_02_007', 'c12_eng_k_cbse_02_008', 'c12_eng_k_cbse_02_009', 'c12_eng_k_cbse_02_010', 'c12_eng_k_cbse_02_011', 'c12_eng_k_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist fiction reader', intro: 'A young woman must choose between a sailor and her dead mother\'s promise — and history has already chosen for her.', goal: 'Read Eveline through Dubliners\' paralysis, Joycean epiphany and the colonial-economic forces behind her freeze.' },
    discovery: {
        question: 'A boat to Buenos Aires waits, Frank holds her hand — and Eveline grips the iron railing instead. A classmate blames \'her abusive father.\' What bigger forces does that verdict miss?',
        options: ['Economics, Catholic duty and colonial gravity — no independent income, a deathbed promise, and the promise of Buenos Aires itself was suspect', 'Nothing — the father is the sole cause', 'She simply didn\'t love Frank', 'The ship left without her'],
        answer: 'Economics, Catholic duty and colonial gravity — no independent income, a deathbed promise, and the promise of Buenos Aires itself was suspect',
        hook: 'Joyce\'s epiphany isn\'t a joyful aha — it\'s bleak clarity: the organ tune carries her mother\'s fate, and Eveline sees escape as another trap. Modernism\'s move is interiority — \'evening invade the avenue\' — her paralysis is the real plot.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Eveline\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit at that window in 1904 Dublin: weigh the dusty cretonne, the seven shillings, the deathbed promise and Frank\'s tales — and judge whether Eveline\'s stillness is failure or colonised fate.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Eveline\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in the context of a short story and name one secondary theme from "Eveline" other than the primary theme of escape.', options: [
                { text: 'A secondary theme is a recurring idea that supports the primary theme by adding layers of', outcome: 'A secondary theme is a recurring idea that supports the primary theme by adding layers of meaning.' },
                { text: 'the theme is about a girl leaving home', outcome: 'Not quite — Students often treat secondary themes as "minor themes" that can be listed without showing how they.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Eveline\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from the opening paragraph of *Eveline*.', options: [
                { text: 'Imagery: “odour of dusty cretonne” (olfactory + tactile)', outcome: 'Imagery: “odour of dusty cretonne” (olfactory + tactile). Metaphor: “evening invade the avenue”.' },
                { text: 'imagery is just description', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* — “spot the device, name it, move.', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'evening invade', outcome: 'Not quite — Students treat imagery and metaphor as *identification exercises* — “spot the device, name it, move.', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'Eveline\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "Eveline" where the outcome contradicts what Eveline (or the reader) expects.', options: [
                { text: 'Situational irony occurs when events turn out opposite to what is expected', outcome: 'Situational irony occurs when events turn out opposite to what is expected.' },
                { text: 'It\'s ironic that her father is mean', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — they identify a vivid description (e.g., "the.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'the black mass of the boat', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — they identify a vivid description (e.g., "the.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Eveline\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What are the five main types of context clues readers use to infer word meaning, and give one example of each type from any text you have.', options: [
                { text: 'The five main types are: (1) Definition/Explanation', outcome: 'The five main types are: (1) Definition/Explanation — the text defines the word directly (e.g.' },
                { text: 'dictionary', outcome: 'Not quite — Students think "vocabulary in context" means *finding a synonym in the same sentence*.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'guessing', outcome: 'Not quite — Students think "vocabulary in context" means *finding a synonym in the same sentence*.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Eveline\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is the grammatical rule for parallelism when using correlative conjunctions like "not only... but also"?', options: [
                { text: 'The rule: the grammatical structure following "not only" must be identical to the', outcome: 'The rule: the grammatical structure following "not only" must be identical to the structure.' },
                { text: 'just use the same words', outcome: 'Not quite — Students believe parallelism means "repeating the same words" (e.g., "She wanted to leave, she.', reveals: 'parallelism-means-repeating-the-same' },
                { text: 'repeating the same words', outcome: 'Not quite — Students believe parallelism means "repeating the same words" (e.g., "She wanted to leave, she.', reveals: 'parallelism-means-repeating-the-same' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Eveline\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question when studying a literary.', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What is the', outcome: 'A literal question asks for information directly stated in the text (e.g., "What is the name.' },
                { text: 'any opinion', outcome: 'Not quite — Students believe inferential questions allow "any opinion" as long as it sounds plausible.', reveals: 'inferential-questions-allow-any-opinion' },
                { text: 'treats an inferential question as literal (e', outcome: 'Not quite — Students believe inferential questions allow "any opinion" as long as it sounds plausible.', reveals: 'inferential-questions-allow-any-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Offered a scholarship abroad, a student freezes: a dying promise at home pulls one way, escape the other. Weeks pass and she hasn\'t answered the offer at all.',
            decisions: [{ prompt: 'What does \'Eveline\' warn about this limbo?', options: [
                { text: 'That paralysis is itself a choice — Joyce\'s Eveline stays not because duty won but because habit and guilt froze her; decide deliberately or the indecision decides for you.', outcome: 'The story\'s tragedy is that Eveline never chooses — she defaults. Naming the trade-off and choosing is the way out of paralysis.' },
                { text: 'Stay — duty to family always outranks personal freedom.', outcome: 'Joyce doesn\'t crown duty; he shows a mind so colonised by obligation it can\'t move — that\'s the disease, not the answer.', reveals: 'duty-paralysis' },
                { text: 'Let the deadline lapse — whatever happens without deciding was meant to be.', outcome: 'Defaulting is choosing by other means; Eveline \'chose\' to stay precisely by failing to choose.', reveals: 'avoidance-as-choice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a girl frozen at a railing as a whole country\'s paralysis. Joyce teaches that the hardest prisons are built of duty, memory and fear.',
            decisions: [{ prompt: 'What comes next? Eveline (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Eveline (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes in \'Eveline\' — the supporting ideas and motifs that deepen the.',
          hint: 'Revisit node 006 (Primary Theme) and node 002 (Plot) — map each hesitation moment to the.',
          misconception: 'Students often treat secondary themes as "minor themes" that can be listed without showing how they interconnect.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Eveline\'',
                  options: ['Secondary themes in \'Eveline\'', '\'Eveline\' (Kaleidoscope, ch', 'The plot/narrative arc of \'Eveline\'', 'The setting of \'Eveline\''],
                  hint: 'Revisit node 006 (Primary Theme) and node 002 (Plot) — map each hesitation moment to the primary.',
                  misconception: 'Students often treat secondary themes as "minor themes" that can be listed without showing how they interconnect — e.g., writing.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists themes without textual weaving: 1) Have them reread the "Stop and Think" questions in the NCERT text.', '2) Assign a two-column exercise: Column A = textual detail (quote or moment), Column B = which secondary theme.', '3) Ask them to write one paragraph connecting two themes using a single evidence chain (e.g., the street organ →.', '4) Re-diagnose with Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as "minor themes" that can be listed without showing how they interconnect.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the secondary theme of "limited agency of women" strengthens or weakens the story\'s critique of Irish society.', answer: 'It strengthens the critique: Eveline hands over "entire wages',
                  options: ['It strengthens the critique: Eveline hands over "entire wages', 'it\'s just her personal problem'],
                  hint: 'Revisit node 006 (Primary Theme) and node 002 (Plot) — map each hesitation moment to the primary.',
                  misconception: 'Students often treat secondary themes as "minor themes" that can be listed without showing how they interconnect — e.g., writing.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists themes without textual weaving: 1) Have them reread the "Stop and Think" questions in the NCERT text.', '2) Assign a two-column exercise: Column A = textual detail (quote or moment), Column B = which secondary theme.', '3) Ask them to write one paragraph connecting two themes using a single evidence chain (e.g., the street organ →.', '4) Re-diagnose with Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_008', difficulty: 'standard',
          question: 'Imagery in \'Eveline\' — the vivid, sensory language that creates word-pictures.',
          hint: 'Revisit Class 11 Literary Devices node (c11_eng_h_cbse_01_008) and Class 10 Symbolism.',
          misconception: 'Students treat imagery and metaphor as *identification exercises* — “spot the device, name it, move on.” They write.',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor in your own words, giving one example of each from the opening paragraph of *Eveline*.', answer: 'Imagery: “odour of dusty cretonne” (olfactory + tactile)',
                  options: ['Imagery: “odour of dusty cretonne” (olfactory + tactile)', 'imagery is just description', 'evening invade', 'like/as'],
                  hint: 'Revisit Class 11 Literary Devices node (c11_eng_h_cbse_01_008) and Class 10 Symbolism node.',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* — “spot the device, name it, move on.” They write “Joyce uses olfactory.' },
                { id: 'b', prompt: 'Identify one example of auditory imagery and one of kinesthetic (movement) imagery from the middle section of the story (after Eveline reviews the familiar.', answer: 'Auditory: “a street organ playing” (hearing)',
                  options: ['Auditory: “a street organ playing” (hearing)', 'the boat blew a long mournful whistle'],
                  hint: 'Revisit Class 11 Literary Devices node (c11_eng_h_cbse_01_008) and Class 10 Symbolism node.',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* — “spot the device, name it, move on.” They write “Joyce uses olfactory.' },
                { id: 'c', prompt: 'Compare the metaphorical function of the “window” in the first paragraph with the “iron railing” in the final scene.', answer: 'The window is a transparent barrier',
                  options: ['The window is a transparent barrier', 'both are just objects'],
                  hint: 'Revisit Class 11 Literary Devices node (c11_eng_h_cbse_01_008) and Class 10 Symbolism node.',
                  misconception: 'Students treat imagery and metaphor as *identification exercises* — “spot the device, name it, move on.” They write “Joyce uses olfactory.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['Re-read the first and last three paragraphs of *Eveline* with a highlighter: yellow for sensory words, pink for.', 'For each highlight, write a one-sentence marginal note: “This smell makes me feel ___ because ___.” 3.', 'Group notes into “domestic stagnation” (dust, cretonne, harmonium) and “overwhelming escape” (sea, boat, whistle).', 'Draft one PEEL paragraph using the template: Point → Quote → Explain sensation → Link to paralysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Eveline\' — where opposite things are both true,.',
          hint: 'If stuck, revisit node 004 (Eveline\'s psychology) and node 006 (paralysis theme) — irony.',
          misconception: 'Students often confuse *symbolism* with *imagery* — they identify a vivid description (e.g., "the black mass of the.',
          parts: [
                { id: 'a', prompt: 'Define situational irony and give one example from "Eveline" where the outcome contradicts what Eveline (or the reader) expects.', answer: 'Situational irony occurs when events turn out opposite to what is expected',
                  options: ['Situational irony occurs when events turn out opposite to what is expected', 'It\'s ironic that her father is mean', 'the black mass of the boat'],
                  hint: 'If stuck, revisit node 004 (Eveline\'s psychology) and node 006 (paralysis theme) — irony and.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they identify a vivid description (e.g., "the black mass of the boat") and call it.' },
                { id: 'b', prompt: 'Apply the concept of dramatic irony to the scene where Eveline hears the street organ playing the same tune as on her mother\'s death night.', answer: 'Dramatic irony arises',
                  options: ['Dramatic irony arises', 'The music makes her sad', 'the black mass of the boat'],
                  hint: 'If stuck, revisit node 004 (Eveline\'s psychology) and node 006 (paralysis theme) — irony and.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they identify a vivid description (e.g., "the black mass of the boat") and call it.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If a student cannot distinguish irony from coincidence or symbol from image: (1) Give them a two-column table: Column.', '(2) Have them fill it for three moments in the story.', '(3) Ask: "Where is the *gap* between columns?" That gap is irony (for events) or symbolism (for objects).', 'Re-diagnose with DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Eveline\' — the words and phrases you must know to read the.',
          hint: 'If unable to label clue types automatically, revisit c11_eng_h_cbse_01_010 exercises.',
          misconception: 'Students think "vocabulary in context" means *finding a synonym in the same sentence*.',
          parts: [
                { id: 'a', prompt: 'What are the five main types of context clues readers use to infer word meaning, and give one example of each type from any text you have read.', answer: 'The five main types are: (1) Definition/Explanation',
                  options: ['The five main types are: (1) Definition/Explanation', 'dictionary', 'guessing', 'vocabulary in context'],
                  hint: 'If unable to label clue types automatically, revisit c11_eng_h_cbse_01_010 exercises on clue.',
                  misconception: 'Students think "vocabulary in context" means *finding a synonym in the same sentence*.' },
                { id: 'b', prompt: 'In the opening paragraph of "Eveline," the phrase "odour of dusty cretonne" appears.', answer: '"Cretonne" is a heavy cotton fabric used for curtains/upholstery',
                  options: ['"Cretonne" is a heavy cotton fabric used for curtains/upholstery', 'vocabulary in context', 'elated', 'unaccustomed part of the theatre'],
                  hint: 'If unable to label clue types automatically, revisit c11_eng_h_cbse_01_010 exercises on clue.',
                  misconception: 'Students think "vocabulary in context" means *finding a synonym in the same sentence*.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['If a student cannot distinguish clue types or link word meaning to theme: (1) Have them re-read c12_eng_k_cbse_02_003.', '(2) Do a "clue hunt" on one paragraph: highlight the target word, circle 3 context phrases, label each clue type.', '(3) Practice with a non-literary text (newspaper editorial) where clues are more explicit.', '(4) Re-attempt DIAGNOSTIC_QUESTION_4 with "invariable" — if still stuck, revisit c11_eng_h_cbse_01_010 (Class 11.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_011', difficulty: 'standard',
          question: 'Language and style in \'Eveline\' — how the writer chose words, sentences and.',
          hint: 'If unable to label phrases/clauses, review `c6_english_u4_038` (Sentence Structure).',
          misconception: 'Students believe parallelism means "repeating the same words" (e.g., "She wanted to leave, she wanted to escape").',
          parts: [
                { id: 'a', prompt: 'Compare the parallelism in these two sentences from the text. What different *relationship* does each show?', answer: '(i) uses "but" to coordinate two independent clauses with *contrastive* meaning',
                  options: ['(i) uses "but" to coordinate two independent clauses with *contrastive* meaning', 'both show contrast', 'Appreciation', 'repeating the same words'],
                  hint: 'If unable to label phrases/clauses, review `c6_english_u4_038` (Sentence Structure) exercises.',
                  misconception: 'Students believe parallelism means "repeating the same words" (e.g., "She wanted to leave, she wanted to escape").' }
          ],
            remediations: { 'parallelism-means-repeating-the-same': { steps: ['Revisit the 6 NCERT example sentences (page 19-20). For each, physically bracket the parallel units with coloured pens.', 'Take 5 non-parallel sentences from your own essays; rewrite each in 3 ways (all infinitives, all gerunds, all noun.', 'For stress, use an online dictionary (Oxford/Cambridge) — listen, clap, mark the dot `ˈ` before the stressed syllable.', 'Re-attempt Diagnostic Questions 3 and 6. If still stuck, review Class 6 node `c6_english_u4_038` (Sentence Structure).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Eveline\' — questions answered straight from the text.',
          hint: 'If stuck, return to c12_eng_k_cbse_02_002 (Plot) to map the story\'s five key scenes, then.',
          misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds plausible.',
          parts: [
                { id: 'a', prompt: 'In the story, Eveline reviews the familiar objects in her room and wonders "where on earth all the dust came from." An inferential question might ask: "What.', answer: 'The inference "dust represents father\'s abuse" is weak',
                  options: ['The inference "dust represents father\'s abuse" is weak', 'any opinion', 'inferential questions allow "any opinion" as long'],
                  hint: 'If stuck, return to c12_eng_k_cbse_02_002 (Plot) to map the story\'s five key scenes, then.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds plausible.' },
                { id: 'b', prompt: 'Apply the PEE (Point-Evidence-Explanation) structure to answer this inferential question: "Why does Eveline\'s father forbid her from seeing Frank?" Write.', answer: 'Point: Eveline\'s father forbids the relationship',
                  options: ['Point: Eveline\'s father forbids the relationship', 'I know these sailor chaps', 'any opinion', 'inferential questions allow "any opinion" as long'],
                  hint: 'If stuck, return to c12_eng_k_cbse_02_002 (Plot) to map the story\'s five key scenes, then.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds plausible.' },
                { id: 'c', prompt: 'Analyze the following two questions from a board exam paper and classify each as literal (L) or inferential (I). Justify your classification for each.', answer: 'Q1 = Literal',
                  options: ['Q1 = Literal', 'any opinion', 'inferential questions allow "any opinion" as long'],
                  hint: 'If stuck, return to c12_eng_k_cbse_02_002 (Plot) to map the story\'s five key scenes, then.',
                  misconception: 'Students believe inferential questions allow "any opinion" as long as it sounds plausible.' }
          ],
            remediations: { 'inferential-questions-allow-any-opinion': { steps: ['If a student cannot distinguish literal from inferential questions: (1) Give them 5 questions from "Eveline" and have.', '(2) For every inferential question they mislabel, ask: "Which exact sentence in the story gives this answer?" When they.', '(3) Practice the "Evidence Sandwich" drill: write a claim, then find two quotes that support it, then explain the link.', 'Repeat with three inferential questions from the NCERT "Understanding the Text" section.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
