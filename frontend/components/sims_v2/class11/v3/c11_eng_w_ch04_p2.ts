import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch04_p2: SimDef = {
    id: 'v3_c11_eng_w_ch04_p2',
    title: 'The Adventure of the Three Garridebs (Short Story) · Part 2/3',
    subtitle: 'See through the inheritance story to the press under the floorboards.',
    classLevel: 11, subject: 'eng_w', topic: 'The Adventure of the Three Garridebs (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch04'],
    nodeIds: ['c11_eng_w_cbse_04_007', 'c11_eng_w_cbse_04_008', 'c11_eng_w_cbse_04_009', 'c11_eng_w_cbse_04_010', 'c11_eng_w_cbse_04_011', 'c11_eng_w_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Watson, narrating a case he misunderstood until the end', intro: 'An American lawyer, a name worth millions, a harmless recluse — Holmes hears the counterfeiters\' machinery already turning.', goal: 'Separate the decoy plot from the real one and map the story\'s structural beats.' },
    discovery: {
        question: 'Most of this Holmes story follows a hunt for a third man named Garrideb to claim millions. What is the plot actually about?',
        options: ['Luring a collector out of his room so a killer can reach the counterfeiting press buried beneath it', 'A genuine inheritance shared by three men with a rare surname', 'A legal dispute over an American estate', 'A missing-persons case solved by advertisement'],
        answer: 'Luring a collector out of his room so a killer can reach the counterfeiting press buried beneath it',
        hook: 'The story is a double helix — Watson chases the whimsical fake plot while Holmes reads the real one in an American spelling and a frayed coat.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, concerns, or messages that run parallel to the primary theme in a literary work, enriching the narrative by exploring human experiences, social commentary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Split the false inheritance trail from the true criminal plot, then place the inciting incident, the Birmingham trick and the cellar climax.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a magician perform a trick—your eyes follow the obvious hand movements (the primary plot: Holmes catching a criminal), but the real.',
            decisions: [{ prompt: 'Identify three secondary themes present in "The Adventure of the Three Garridebs" and provide one textual reference for each.', options: [
                { text: 'Correct answer: (1) Greed/avarice – John Garrideb invents the Alexander Hamilton Garrideb', outcome: 'Correct answer: (1) Greed/avarice – John Garrideb invents the Alexander Hamilton Garrideb legacy.' },
                { text: 'Holmes solves the case', outcome: 'Not quite — Students commonly confuse "secondary themes" with "subplots" or "minor events." They list things.', reveals: 'students-commonly-confuse-secondary-themes' },
                { text: 'secondary themes', outcome: 'Not quite — Students commonly confuse "secondary themes" with "subplots" or "minor events." They list things.', reveals: 'students-commonly-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading a mystery novel late at night: the author writes "the fog clung to the cobblestones like a damp shroud" and you instantly feel the.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one example of each from everyday language (not from the text).', options: [
                { text: 'Imagery: Language that creates sensory experiences (e.g., "The aroma of frying onions', outcome: 'Imagery: Language that creates sensory experiences (e.g., "The aroma of frying onions filled the.' },
                { text: 'uses \'like\' or \'as\' for metaphor reveals confusion with simile', outcome: 'Not quite — Students often treat imagery and metaphor as interchangeable "figurative language" and write "the.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a mystery novel and encounter the phrase "the suspect wore a cadaverous face." You don\'t have a dictionary handy, but you notice the.',
            decisions: [{ prompt: 'Identify the expression from the NCERT list that means "a long, confusing, and meaningless statement or story" and quote the exact sentence.', options: [
                { text: 'The expression is "rigmarole of lies" (appearing in Holmes\'s line: "what on earth could', outcome: 'The expression is "rigmarole of lies" (appearing in Holmes\'s line: "what on earth could be the.' },
                { text: 'syncopated dialogue', outcome: 'Not quite — Students often treat "context clues" as a single undifferentiated strategy and simply guess.', reveals: 'students-often-treat-context-clues' },
                { text: 'rigmarole', outcome: 'Not quite — Students often treat "context clues" as a single undifferentiated strategy and simply guess.', reveals: 'students-often-treat-context-clues' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re a detective like Holmes examining a suspicious document.',
            decisions: [{ prompt: 'Identify the specific American spelling variants in the advertisement text that Holmes notices, and state the corresponding British.', options: [
                { text: 'The advertisement contains: \'plows\' (British: ploughs), \'buckboards\' (British:', outcome: 'The advertisement contains: \'plows\' (British: ploughs), \'buckboards\' (British: carts/wagons).' },
                { text: 'language usage', outcome: 'Not quite — Students believe "language usage" questions only ask for definitions of idioms.', reveals: 'language-usage-questions-only-ask' },
                { text: '"language usage" questions only ask for definitions of idioms', outcome: 'Not quite — Students believe "language usage" questions only ask for definitions of idioms.', reveals: 'language-usage-questions-only-ask' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re a detective like Holmes examining a crime scene—some clues are visible (literal: a footprint, a letter), while others require deduction.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What was the address on Nathan Garrideb\'s brass plate?" Explain your.', options: [
                { text: 'This is a literal question', outcome: 'This is a literal question because the answer ("136, Little Ryder Street, W.") is explicitly stated.' },
                { text: 'specific detail retrieval', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any reasonable guess earns.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'interpretation', outcome: 'Not quite — Students believe inferential questions are "opinion questions" where any reasonable guess earns.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your mystery-writing club studies \'The Adventure of the Three Garridebs\'. A member plots a knockoff where the detective just \'gets lucky and guesses the villain\', dismissing the story\'s real references — 1902 London addresses, the South African War, an American criminal — as \'period clutter we can delete\'.',
            decisions: [{ prompt: 'What do those \'clutter\' details actually do?', options: [
                { text: 'They\'re the realism engine of the genre: verifiable London geography, dated history (Boer War service) and the American underworld anchor Holmes\'s deductions in a checkable world, so readers feel the reasoning is earned, not authorial luck. Detective fiction\'s contract is that clues + context yield the solution — delete the anchors and deduction collapses into guessing.', outcome: 'The genre lives on the illusion that you could verify it all; real-world reference is load-bearing, not decorative.' },
                { text: 'The member is right — dates and street names are trivia; a detective can solve by pure intuition.', outcome: 'Holmes\'s method is contextual inference — era, place and record are the evidence; \'lucky guessing\' breaks the genre\'s promise of reproducible reasoning.', reveals: 'deduction-is-lucky-guessing' },
                { text: 'Swap 1902 London for a fantasy city — deductions work in invented worlds equally well.', outcome: 'Invented settings let authors cheat (any fact can be conjured); the Holmes contract requires a real, fixed world the reader could in principle audit.', reveals: 'realism-is-optional-in-mystery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'The absurdity was the bait — a \'whimsical\' will lowered a collector\'s guard better than any robbery could.',
            decisions: [{ prompt: 'What comes next? The Adventure of the Three Garridebs (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Adventure of the Three Garridebs (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, concerns, or messages that run.',
          hint: 'If stuck, review c11_eng_w_cbse_04_006 (Primary Theme) and practice the "So what?".',
          misconception: 'Students commonly confuse "secondary themes" with "subplots" or "minor events." They list things that happen (e.g.',
          parts: [
                { id: 'a', prompt: 'Explain how Nathan Garrideb\'s obsession with his collection functions as a secondary theme.', answer: 'Correct answer: Nathan Garrideb\'s collecting obsession represents the theme of',
                  options: ['Correct answer: Nathan Garrideb\'s collecting obsession represents the theme of', 'fill gaps in my collection', 'the Hans Sloane of my age', 'secondary themes'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_006 (Primary Theme) and practice the "So what?" ladder: take.',
                  misconception: 'Students commonly confuse "secondary themes" with "subplots" or "minor events." They list things that happen (e.g., "Holmes checks the.' }
          ],
            remediations: { 'students-commonly-confuse-secondary-themes': { steps: ['If a student cannot distinguish plot from theme, do this 3-step remediation: (1) Take a single scene (e.g., Holmes.', 'Ask: "What happens?" (plot).', 'Then ask: "What idea about human nature does this illustrate?" (theme).', 'Model: "Holkes notices \'plough\' misspelled as \'plow\'—this shows truth resides in details others overlook." (2) Give the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid and descriptive language that appeals to the senses.',
          hint: 'Review the tenor/vehicle/ground model of metaphor (from c6_english_u1_005) and the.',
          misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write "the author uses imagery.',
          parts: [
                { id: 'a', prompt: 'Find two examples of tactile imagery in the description of Nathan Garrideb\'s room (pp.', answer: 'Examples: "a piece of chamois leather in his right hand with',
                  options: ['Examples: "a piece of chamois leather in his right hand with', 'round spectacles', 'goat\'s beard'],
                  hint: 'Review the tenor/vehicle/ground model of metaphor (from c6_english_u1_005) and the sensory imagery.',
                  misconception: 'Students often treat imagery and metaphor as interchangeable "figurative language" and write "the author uses imagery like \'castle in the.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['Have the student list the five senses and find one textual example appealing to each (e.g., visual: "fat brick face".', 'For metaphor, use the Tennyson formula: "Tenor = Vehicle" (e.g., "Holmes\'s face = cold mask").', 'Practice converting a simile ("His face was like a mask") into a metaphor ("His face was a mask") and discuss the shift.', 'Re-attempt Diagnostic Questions 2 and 4 with this framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'Review Class 10 English nodes c10_engl_cbse_01_007 (Irony) and c10_engl_cbse_03_007.',
          misconception: 'Students often confuse *coincidence* with *situational irony*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', '"Before You Read: Context and Background" provides the essential historical, literary,', 'Plot and narrative structure refer to the organized sequence of events in a story and the', 'Setting is the specific time, place, and social environment in'],
                  hint: 'Review Class 10 English nodes c10_engl_cbse_01_007 (Irony) and c10_engl_cbse_03_007 (Symbolism) for.',
                  misconception: 'Students often confuse *coincidence* with *situational irony*. They think the mere fact that three men share the name "Garrideb" is ironic.' }
          ],
            remediations: { 'students-often-confuse-coincidence-with': { steps: ['Re-read the scene where Holmes exposes the advertisement\'s American spellings ("plough" vs.', '"plow", "buckboards") — this proves the "coincidence" was manufactured.', 'List the three irony types with definitions; match each to a specific story moment (e.g., verbal: Holmes\'s "whimsical".', 'For symbolism, pick one object (the cellar, the name, the castle-in-air) and complete the sentence: "This represents.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the precise meaning.',
          hint: 'If stuck, re-read the "Look for these expressions" box on textbook p.',
          misconception: 'Students often treat "context clues" as a single undifferentiated strategy and simply guess a synonym that "fits the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the phrase "with a disconsolate air" reveals Nathan Garrideb\'s emotional state at that moment in the story, using two textual.', answer: '"Disconsolate" means hopelessly unhappy; the phrase shows Nathan\'s resignation',
                  options: ['"Disconsolate" means hopelessly unhappy; the phrase shows Nathan\'s resignation', 'disconsolate'],
                  hint: 'If stuck, re-read the "Look for these expressions" box on textbook p.',
                  misconception: 'Students often treat "context clues" as a single undifferentiated strategy and simply guess a synonym that "fits the sentence." In senior.' },
                { id: 'b', prompt: 'In the sentence "He wove his plot with remarkable cunning," the word "wove" is used metaphorically.', answer: 'Literal meaning: to interlace threads to make fabric',
                  options: ['Literal meaning: to interlace threads to make fabric', 'as merely'],
                  hint: 'If stuck, re-read the "Look for these expressions" box on textbook p.',
                  misconception: 'Students often treat "context clues" as a single undifferentiated strategy and simply guess a synonym that "fits the sentence." In senior.' }
          ],
            remediations: { 'students-often-treat-context-clues': { steps: ['If a student cannot name clue types, conduct a 10-minute micro-lesson: give five isolated sentences each illustrating.', 'Have the student label each, then return to the Garrideb expressions and re-analyse two using the same labels.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of how specific.',
          hint: 'Review "abductive reasoning vs deductive reasoning" from c11_eng_w_cbse_04_002 (Plot and.',
          misconception: 'Students believe "language usage" questions only ask for definitions of idioms.',
          parts: [
                { id: 'a', prompt: 'Identify the specific American spelling variants in the advertisement text that Holmes notices, and state the corresponding British spellings for each.', answer: 'The advertisement contains: \'plows\' (British: ploughs), \'buckboards\' (British:',
                  options: ['The advertisement contains: \'plows\' (British: ploughs), \'buckboards\' (British:', 'language usage', '"language usage" questions only ask for definitions of idioms'],
                  hint: 'Review "abductive reasoning vs deductive reasoning" from c11_eng_w_cbse_04_002 (Plot and Narrative.',
                  misconception: 'Students believe "language usage" questions only ask for definitions of idioms.' },
                { id: 'b', prompt: 'Analyze how the expression "castle in the air fell down, it buried him beneath the ruins" operates on three levels: literal imagery, psychological.', answer: 'Level 1 (literal): A castle built in the air is impossible',
                  options: ['Level 1 (literal): A castle built in the air is impossible', 'it means his dreams were destroyed', 'language usage', '"language usage" questions only ask for definitions of idioms'],
                  hint: 'Review "abductive reasoning vs deductive reasoning" from c11_eng_w_cbse_04_002 (Plot and Narrative.',
                  misconception: 'Students believe "language usage" questions only ask for definitions of idioms.' }
          ],
            remediations: { 'language-usage-questions-only-ask': { steps: ['Have the student create a two-column table: Column A = American word from text, Column B = British equivalent, Column.', 'For each figurative expression, draw a three-box flowchart: Source Domain → Mapping → Target Meaning (e.g., Hunting →.', 'Practice writing one PEEL paragraph per expression using the template: "Conan Doyle uses [expression] from the [source.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck, review c11_eng_w_cbse_04_002 (Plot) to re-sequence events, and.',
          misconception: 'Students believe inferential questions are "opinion questions" where any reasonable guess earns marks.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What was the address on Nathan Garrideb\'s brass plate?" Explain your classification in one.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'specific detail retrieval', 'interpretation', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_002 (Plot) to re-sequence events, and c11_eng_w_cbse_04_004/005.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any reasonable guess earns marks.' },
                { id: 'b', prompt: 'The text states: "Holmes had spent several days in bed, as was his habit from time to time." A student answers an inferential question "Why did Holmes stay.', answer: 'The answer is insufficient',
                  options: ['The answer is insufficient', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_002 (Plot) to re-sequence events, and c11_eng_w_cbse_04_004/005.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any reasonable guess earns marks.' },
                { id: 'c', prompt: 'ANALYZE: Compare the literal question "What did the advertisement for Howard Garrideb say?" with the inferential question "How did Holmes deduce the.', answer: '**Literal anchors (directly stated):** - Advertisement text: "HOWARD GARRIDEB',
                  options: ['**Literal anchors (directly stated):** - Advertisement text: "HOWARD GARRIDEB', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_002 (Plot) to re-sequence events, and c11_eng_w_cbse_04_004/005.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any reasonable guess earns marks.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['**Isolate the error:** Ask the student to highlight every word in their answer that comes directly from the text vs.', '**Rebuild the chain:** For each inference, demand: "Which sentence in the text makes this necessary?" If none, the.', '**Practice negation hunting:** Assign a 10-minute exercise: "Find 5 things the text explicitly says are NOT.', '**Re-write one answer** using only: "The text states X, which implies Y, because Z." This formula forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe inferential questions are "opinion questions" where any reasonable guess earns marks.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: A student writes: "Holmes guessed Nathan would go to Little Ryder Street because he\'s smart." Critique this answer against board-exam standards.', answer: 'The answer fails',
                  options: ['The answer fails', 'opinion questions'],
                  hint: 'If stuck, review c11_eng_w_cbse_04_002 (Plot) to re-sequence events, and c11_eng_w_cbse_04_004/005.',
                  misconception: 'Students believe inferential questions are "opinion questions" where any reasonable guess earns marks.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['**Isolate the error:** Ask the student to highlight every word in their answer that comes directly from the text vs.', '**Rebuild the chain:** For each inference, demand: "Which sentence in the text makes this necessary?" If none, the.', '**Practice negation hunting:** Assign a 10-minute exercise: "Find 5 things the text explicitly says are NOT.', '**Re-write one answer** using only: "The text states X, which implies Y, because Z." This formula forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
