import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch03_p2: SimDef = {
    id: 'v3_c12_eng_k_ch03_p2',
    title: 'A Wedding in Brownsville (Short Story) · Part 2/3',
    subtitle: 'At a Brooklyn wedding, the dead take a seat',
    classLevel: 12, subject: 'eng_k', topic: 'A Wedding in Brownsville (Short Story) · Part 2/3',
    chapters: ['c12_eng_k_ch03'],
    nodeIds: ['c12_eng_k_cbse_03_007', 'c12_eng_k_cbse_03_008', 'c12_eng_k_cbse_03_009', 'c12_eng_k_cbse_03_010', 'c12_eng_k_cbse_03_011', 'c12_eng_k_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Jewish literature scholar', intro: 'A Yiddish Nobel laureate sends a tired doctor to a wedding where the guest list includes the dead.', goal: 'Read A Wedding in Brownsville through Holocaust memory, landsmanshaft culture and Singer\'s purposeful surrealism.' },
    discovery: {
        question: 'Dr. Margolin goes to a landsman\'s wedding in Brownsville and meets Raizel — the love he watched die in the Holocaust. A student calls it \'just a dream sequence, doesn\'t count.\' What\'s the flaw?',
        options: ['In Singer\'s surrealism the unreal carries historical truth — trauma blurs life and death for survivors, so the impossible encounter is the most honest realism available', 'None — it was clearly all a dream', 'Raizel survived secretly', 'Weddings cause hallucinations'],
        answer: 'In Singer\'s surrealism the unreal carries historical truth — trauma blurs life and death for survivors, so the impossible encounter is the most honest realism available',
        hook: 'The wedding is no celebration — for a community of shtetl survivors it\'s \'a feast of poisons,\' a ritual of memory. And the landsmanshaft matters: when your town was erased, the people from it become your only family. Surrealism is the only form big enough for what they carry.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'A Wedding in Brownsville\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Enter the Senciminer wedding as an outsider-turned-insider: decode the landsman ties, weigh Margolin\'s survivor\'s guilt against the community\'s defiant noise, and follow the taxi into the World of Twilight.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'A Wedding in Brownsville\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in your own words and give one example from any story you have studied previously.', options: [
                { text: 'A secondary theme is a supporting idea that runs alongside the main theme, developed', outcome: 'A secondary theme is a supporting idea that runs alongside the main theme, developed through.' },
                { text: 'the wedding is a secondary theme', outcome: 'Not quite — Students often mistake **recurring topics or motifs** for secondary themes.', reveals: 'students-often-mistake-recurring-topics' },
                { text: 'merely lists a plot event (e', outcome: 'Not quite — Students often mistake **recurring topics or motifs** for secondary themes.', reveals: 'students-often-mistake-recurring-topics' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'A Wedding in Brownsville\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor. Give one example of each from "A Wedding in Brownsville" without looking at the text.', options: [
                { text: 'Imagery: sensory language creating mental pictures (e.g., "The New York streets sprawled', outcome: 'Imagery: sensory language creating mental pictures (e.g., "The New York streets sprawled out, wet.' },
                { text: 'red as glowing metal', outcome: 'Not quite — Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two.', reveals: 'students-often-treat-imagery-and' },
                { text: 'the music played', outcome: 'Not quite — Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Look in \'A Wedding in Brownsville\' for moments where the surface meaning hides a deeper opposite — that\'s irony/paradox.',
            decisions: [{ prompt: 'Define situational irony and give one example from "A Wedding in Brownsville" where the outcome of an event is the opposite of what Dr.', options: [
                { text: 'Situational irony occurs when actions have an effect opposite to what was intended or', outcome: 'Situational irony occurs when actions have an effect opposite to what was intended or expected.' },
                { text: 'Margolin not wanting to go but going anyway', outcome: 'Not quite — Students often treat every unexpected event as "irony" and every object as a "symbol." In this.', reveals: 'students-often-treat-every-unexpected' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'A Wedding in Brownsville\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define the term "Landsman" as used in the story and explain what it reveals about Dr. Margolin\'s relationship to the Senciminer community.', options: [
                { text: 'Correct answer: "Landsman" (Yiddish: *landslayt*) means a person from the same hometown', outcome: 'Correct answer: "Landsman" (Yiddish: *landslayt*) means a person from the same hometown or region.' },
                { text: 'friend', outcome: 'Not quite — Students believe "vocabulary in context" means finding a dictionary definition that fits the.', reveals: 'vocabulary-in-context-means-finding' },
                { text: 'neighbour', outcome: 'Not quite — Students believe "vocabulary in context" means finding a dictionary definition that fits the.', reveals: 'vocabulary-in-context-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'A Wedding in Brownsville\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What are the four sentence structures classified in English grammar, and which coordinating conjunctions join independent clauses in.', options: [
                { text: 'The four structures are: Simple (one independent clause), Compound (two+ independent', outcome: 'The four structures are: Simple (one independent clause), Compound (two+ independent clauses joined.' },
                { text: 'complex-compound', outcome: 'Not quite — Students believe "sentence variety" means only alternating long and short sentences, ignoring.', reveals: 'sentence-variety-means-only-alternating' },
                { text: 'because', outcome: 'Not quite — Students believe "sentence variety" means only alternating long and short sentences, ignoring.', reveals: 'sentence-variety-means-only-alternating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'A Wedding in Brownsville\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "Where does', outcome: 'A literal question asks for information directly stated in the text (e.g., "Where does the wedding.' },
                { text: 'literal is easy, inferential is hard', outcome: 'Not quite — Students treat inferential questions as "guess what the author meant" and offer opinions like "I.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family wedding, an uncle who survived a violent displacement years ago freezes mid-dance, seeing faces that aren\'t there. Relatives hiss, \'it\'s been decades — move on.\'',
            decisions: [{ prompt: 'What does Singer\'s survivor-wedding story suggest instead?', options: [
                { text: 'Acknowledge it gently — \'A Wedding in Brownsville\' shows the dead return uninvited at celebrations; trauma intrudes on joy, and recognition helps more than \'get over it\'.', outcome: 'Survivor memory isn\'t a malfunction to suppress — the story treats the apparition as real grief doing its work.' },
                { text: 'They\'re right — decades should have healed it; the freeze is self-indulgence.', outcome: 'Time doesn\'t auto-delete trauma; the story\'s whole point is that annihilated worlds stay present at the feast.', reveals: 'time-heals-trauma-automatically' },
                { text: 'Whisk him away and never mention it — silence is kindest.', outcome: 'Pretending it didn\'t happen isolates the survivor further; the enclave exists precisely because shared memory needs company.', reveals: 'silence-as-care' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read surrealism as testimony — the form Singer needed because the Holocaust broke reality itself. Few chapters reward close reading like this one.',
            decisions: [{ prompt: 'What comes next? A Wedding in Brownsville (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Wedding in Brownsville (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes in \'A Wedding in Brownsville\' — the supporting ideas and.',
          hint: 'If unable to generate thematic statements, return to the primary theme node (006) and.',
          misconception: 'Students often mistake **recurring topics or motifs** for secondary themes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'A Wedding in Brownsville\'',
                  options: ['Secondary themes in \'A Wedding in Brownsville\'', '\'A Wedding in Brownsville\' (Kaleidoscope, ch', 'The plot/narrative arc of \'A Wedding in Brownsville\'', 'The setting of \'A Wedding in Brownsville\''],
                  hint: 'If unable to generate thematic statements, return to the primary theme node (006) and practice.',
                  misconception: 'Students often mistake **recurring topics or motifs** for secondary themes.' }
          ],
            remediations: { 'students-often-mistake-recurring-topics': { steps: ['If the student cannot distinguish topic from theme, have them complete this 3-step drill: 1) Pick a motif from the.', '2) Write what the story *says* about that motif (e.g., "Snow falls equally on the living and the dead, erasing.', '3) Generalize into a universal statement (e.g., "Nature’s indifference underscores the fragility of human.', 'Then map each statement to a secondary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_008', difficulty: 'standard',
          question: 'Imagery in \'A Wedding in Brownsville\' — the vivid, sensory language that.',
          hint: 'If stuck, revisit Class 11 Hornbill Chapter 3 Imagery and Metaphor node.',
          misconception: 'Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two metaphors".',
          parts: [
                { id: 'a', prompt: 'Apply the concept of extended metaphor to the "taxi ride" sequence (from "Dr Margolin\'s car was in the garage..." to "Suppose the weather never changed.', answer: 'Tenor: Dr Margolin\'s life/journey toward death/afterlife',
                  options: ['Tenor: Dr Margolin\'s life/journey toward death/afterlife', 'the snow is cold', 'simile', 'like this taxi'],
                  hint: 'If stuck, revisit Class 11 Hornbill Chapter 3 Imagery and Metaphor node (c11_eng_h_cbse_03_008) and.',
                  misconception: 'Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two metaphors".' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['If a student cannot distinguish imagery from metaphor or sees them as separate: (1) Have them re-read the taxi scene.', '(2) Ask: "Which sensory details *become* the metaphor?" (Answer: the frosted window → limited vision; the silent driver.', '(3) Assign a micro-writing task: "Rewrite the Raizel encounter using ONLY imagery — no metaphors.', 'Then rewrite using ONLY metaphors — no sensory details.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two metaphors".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The story\'s surrealism is created primarily through metaphor, not imagery." Defend or refute using at least three textual evidences.', answer: 'Refute',
                  options: ['Refute', 'surrealism = metaphor', 'wreath'],
                  hint: 'If stuck, revisit Class 11 Hornbill Chapter 3 Imagery and Metaphor node (c11_eng_h_cbse_03_008) and.',
                  misconception: 'Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two metaphors".' },
                { id: 'b', prompt: 'Create a new metaphor for Dr Margolin\'s relationship with his past, using sensory imagery from the story (snow, taxi, wedding hall, Raizel\'s eyes, etc.).', answer: 'Example: "His memories were the snow on Eastern Parkway',
                  options: ['Example: "His memories were the snow on Eastern Parkway', 'wreath'],
                  hint: 'If stuck, revisit Class 11 Hornbill Chapter 3 Imagery and Metaphor node (c11_eng_h_cbse_03_008) and.',
                  misconception: 'Students often treat imagery and metaphor as separate checklists: "Find three images" and "Find two metaphors".' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['If a student cannot distinguish imagery from metaphor or sees them as separate: (1) Have them re-read the taxi scene.', '(2) Ask: "Which sensory details *become* the metaphor?" (Answer: the frosted window → limited vision; the silent driver.', '(3) Assign a micro-writing task: "Rewrite the Raizel encounter using ONLY imagery — no metaphors.', 'Then rewrite using ONLY metaphors — no sensory details.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_009', difficulty: 'standard',
          question: 'Irony and paradox in \'A Wedding in Brownsville\' — where opposite things are.',
          hint: 'If the distinction between metaphor and symbol is fuzzy, revisit c12_eng_k_cbse_03_008.',
          misconception: 'Students often treat every unexpected event as "irony" and every object as a "symbol." In this story, Margolin\'s.',
          parts: [
                { id: 'a', prompt: 'Explain how dramatic irony functions in the taxi ride sequence (pages 25-26). What does the reader suspect before Dr. Margolin does?', answer: 'Dramatic irony arises when the audience knows more than the character',
                  options: ['Dramatic irony arises when the audience knows more than the character', 'lists only the accident scene misses the cumulative buildup'],
                  hint: 'If the distinction between metaphor and symbol is fuzzy, revisit c12_eng_k_cbse_03_008 (Imagery and.',
                  misconception: 'Students often treat every unexpected event as "irony" and every object as a "symbol." In this story, Margolin\'s hypochondria is *not*.' },
                { id: 'b', prompt: 'Identify a moment of verbal irony in the wedding hall dialogue (pages 28-30) and explain how it reveals the survivors\' psychological state.', answer: 'When a guest says, "Lechayim, Schloime-Dovid!',
                  options: ['When a guest says, "Lechayim, Schloime-Dovid!', 'sarcasm'],
                  hint: 'If the distinction between metaphor and symbol is fuzzy, revisit c12_eng_k_cbse_03_008 (Imagery and.',
                  misconception: 'Students often treat every unexpected event as "irony" and every object as a "symbol." In this story, Margolin\'s hypochondria is *not*.' },
                { id: 'c', prompt: 'Analyze the symbolism of the wedding canopy (chuppah) in the chapel scene (page 32). How does its meaning shift from tradition to something else?', answer: 'Traditionally, the chuppah symbolizes the new home the couple will build',
                  options: ['Traditionally, the chuppah symbolizes the new home the couple will build', 'only defines the chuppah traditionally ignores the contextual subversion'],
                  hint: 'If the distinction between metaphor and symbol is fuzzy, revisit c12_eng_k_cbse_03_008 (Imagery and.',
                  misconception: 'Students often treat every unexpected event as "irony" and every object as a "symbol." In this story, Margolin\'s hypochondria is *not*.' }
          ],
            remediations: { 'students-often-treat-every-unexpected': { steps: ['Re-read the taxi ride (pp.', '25-26) and chapel scene (pp.', '32-34) with two colored pens: one for irony (mark expectation vs.', 'reality), one for symbols (mark objects/places with extra meaning).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_010', difficulty: 'standard',
          question: 'Key vocabulary of \'A Wedding in Brownsville\' — the words and phrases you must.',
          hint: 'If stuck on cultural terms: revisit c12_eng_k_cbse_03_001 "Before You Read" section.',
          misconception: 'Students believe "vocabulary in context" means finding a dictionary definition that fits the sentence.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between "Senciminer" and "Tereshpoler" in the story. Why does the narrator distinguish them at the wedding?', answer: 'Correct answer: Senciminers are from the bride\'s hometown (Sencimin)',
                  options: ['Correct answer: Senciminers are from the bride\'s hometown (Sencimin)', 'guests', 'vocabulary in context'],
                  hint: 'If stuck on cultural terms: revisit c12_eng_k_cbse_03_001 "Before You Read" section on Isaac.',
                  misconception: 'Students believe "vocabulary in context" means finding a dictionary definition that fits the sentence.' },
                { id: 'b', prompt: 'Use the word "hypochondria" in an original sentence that demonstrates Dr. Margolin\'s psychological state as described in the story.', answer: 'Correct answer: "Margolin\'s hypochondria',
                  options: ['Correct answer: "Margolin\'s hypochondria', 'vocabulary in context'],
                  hint: 'If stuck on cultural terms: revisit c12_eng_k_cbse_03_001 "Before You Read" section on Isaac.',
                  misconception: 'Students believe "vocabulary in context" means finding a dictionary definition that fits the sentence.' },
                { id: 'c', prompt: 'Analyze how Singer\'s deliberate retention of Yiddish-inflected terms (e.g., "schnapps," "lechayim," "schloime-dovid," "gleischgeschaltet") shapes the story\'s.', answer: 'Correct answer: The untranslated terms create linguistic displacement',
                  options: ['Correct answer: The untranslated terms create linguistic displacement', 'vocabulary in context'],
                  hint: 'If stuck on cultural terms: revisit c12_eng_k_cbse_03_001 "Before You Read" section on Isaac.',
                  misconception: 'Students believe "vocabulary in context" means finding a dictionary definition that fits the sentence.' }
          ],
            remediations: { 'vocabulary-in-context-means-finding': { steps: ['Re-read the three "Stop and Think" sections in the NCERT text — they flag the exact cultural/historical terms students.', 'Create a three-column chart for 10 key words: Column A = word, Column B = contextual clues from the story (quote phrase.', 'Orally explain three words to a peer WITHOUT using dictionary definitions — only story evidence.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_011', difficulty: 'standard',
          question: 'Language and style in \'A Wedding in Brownsville\' — how the writer chose words.',
          hint: 'If clause identification fails, return to c6_english_u4_038 (Sentence Structure and Types.',
          misconception: 'Students believe "sentence variety" means only alternating long and short sentences, ignoring structural variety.',
          parts: [
                { id: 'a', prompt: 'Analyze sentence 5 from the paragraph: "Many Senciminers had survived, and, later, come to America from the camps, but most of them were younger people whom.', answer: 'Sentence 5 is Compound-Complex',
                  options: ['Sentence 5 is Compound-Complex', 'sentence variety'],
                  hint: 'If clause identification fails, return to c6_english_u4_038 (Sentence Structure and Types.',
                  misconception: 'Students believe "sentence variety" means only alternating long and short sentences, ignoring structural variety (simple/compound/complex).' }
          ],
            remediations: { 'sentence-variety-means-only-alternating': { steps: ['If a student cannot classify sentence 5 correctly or misplaces stress in "illustrious": 1.', 'Revisit c11_eng_h_cbse_01_011 (Grammar: Language Usage in the Text) — it covers basic sentence typing with simpler.', 'Do the "Sentence Structure" exercise in NCERT Class 10 Workbook Unit 3 (sentence combining/decombining).', 'For stress: Use the "stress-shift" rule drill — take 10 words ending in -tion/-sion/-ance/-ence/-ity, apply "primary.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension of \'A Wedding in Brownsville\' — questions answered.',
          hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text — they model the.',
          misconception: 'Students treat inferential questions as "guess what the author meant" and offer opinions like "I think Dr.',
          parts: [
                { id: 'a', prompt: 'In the story, Dr. Margolin thinks: "He had squandered his talents, continually changing his field of study; and he had wasted years in learning languages,.', answer: 'It is an inferential understanding',
                  options: ['It is an inferential understanding', 'literal', 'squandered', 'wasted'],
                  hint: 'If stuck, re-read the "Stop and Think" boxes in the NCERT text — they model the.',
                  misconception: 'Students treat inferential questions as "guess what the author meant" and offer opinions like "I think Dr.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Give them 5 questions from the story (mix of both).', 'Ask them to highlight the exact sentence that answers each.', 'For questions where no single sentence answers, have them list 2+ sentences they must combine.', 'Label the first type "literal," the second "inferential." Re-test with new questions after 2 days.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
