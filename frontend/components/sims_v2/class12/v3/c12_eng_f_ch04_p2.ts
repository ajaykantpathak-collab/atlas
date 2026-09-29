import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch04_p2: SimDef = {
    id: 'v3_c12_eng_f_ch04_p2',
    title: 'The Rattrap · Part 2/3',
    subtitle: 'A wire rattrap, a stolen thirty kronor, and a philosophy tested',
    classLevel: 12, subject: 'eng_f', topic: 'The Rattrap · Part 2/3',
    chapters: ['c12_eng_f_ch04'],
    nodeIds: ['c12_eng_f_cbse_04_007', 'c12_eng_f_cbse_04_008', 'c12_eng_f_cbse_04_009', 'c12_eng_f_cbse_04_010', 'c12_eng_f_cbse_04_011', 'c12_eng_f_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary critic', intro: 'A vagabond believes the whole world is a trap baited with cheese. One Christmas, someone refuses to snap it shut.', goal: 'Read The Rattrap as moral allegory — genre, symbol and the redemption arc — rather than literal realism.' },
    discovery: {
        question: '\'Once upon a time there was a man who went around selling small rattraps of wire.\' What does that fairy-tale opening secretly license the story to do?',
        options: ['Become allegory — the peddler turns Everyman, the rattrap a universal symbol, and coincidences become structure rather than flaws', 'Nothing — openings don\'t matter', 'Promise a true crime account', 'Signal a children\'s story with no depth'],
        answer: 'Become allegory — the peddler turns Everyman, the rattrap a universal symbol, and coincidences become structure rather than flaws',
        hook: 'Read this as realism and the plot looks contrived — a stranger mistaken for an old comrade, a crofter who shows his money. Read it as fable and everything locks in: a Nobel laureate\'s belief that love awakens human goodness, bait and trap as the human condition.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Rattrap\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the trap: follow the peddler from his cynical philosophy — the world as a rattrap baited with comforts — through the forest \'prison\' to the Christmas-Eve kindness that springs him free.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Rattrap\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Name two secondary themes in "The Rattrap" besides the primary rattrap metaphor, and give one textual example for each.', options: [
                { text: 'Correct answer: (1) Human loneliness and need for bonding', outcome: 'Correct answer: (1) Human loneliness and need for bonding — the crofter lives alone, welcomes the.' },
                { text: 'kindness', outcome: 'Not quite — Students often think "secondary themes" means "less important themes" and give them one-sentence.', reveals: 'secondary-themes-means-less-important' },
                { text: 'secondary themes', outcome: 'Not quite — Students often think "secondary themes" means "less important themes" and give them one-sentence.', reveals: 'secondary-themes-means-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Rattrap\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "imagery" and "metaphor" in your own words, and give one example of each from "The Rattrap" (do not use the world-as-rattrap.', options: [
                { text: '**Correct answer:** Imagery = sensory language creating mental pictures (e.g., "the roads', outcome: '**Correct answer:** Imagery = sensory language creating mental pictures (e.g., "the roads near the.' },
                { text: 'like/as', outcome: 'Not quite — Students treat "imagery" and "metaphor" as *identification tasks* ("find the simile in line 5").', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'labeling', outcome: 'Not quite — Students treat "imagery" and "metaphor" as *identification tasks* ("find the simile in line 5").', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Rattrap\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'List the nine expressions highlighted in the "Notice these expressions in the text" box at the start of the NCERT chapter "The Rattrap".', options: [
                { text: 'The nine expressions are: (1) keep body and soul together, (2) hunger gleamed in his', outcome: 'The nine expressions are: (1) keep body and soul together, (2) hunger gleamed in his eyes, (3).' },
                { text: 'cheese and pork', outcome: 'Not quite — Students believe "infer meaning from context" means guessing a synonym that *could* fit.', reveals: 'infer-meaning-from-context-means' },
                { text: 'lion\'s den', outcome: 'Not quite — Students believe "infer meaning from context" means guessing a synonym that *could* fit.', reveals: 'infer-meaning-from-context-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Rattrap\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: '**REMEMBER:** Define a reflexive pronoun and give one example from "The Rattrap" where it is used reflexively (action reflects back on the.', options: [
                { text: 'A reflexive pronoun (myself, yourself, himself, etc.) is used when the subject and object', outcome: 'A reflexive pronoun (myself, yourself, himself, etc.) is used when the subject and object of a verb.' },
                { text: 'He made them himself at odd moments', outcome: 'Not quite — Students consistently treat every -self pronoun as "reflexive" because the form is identical.', reveals: 'students-consistently-treat-every-self' },
                { text: 'Noticing form', outcome: 'Not quite — Students consistently treat every -self pronoun as "reflexive" because the form is identical.', reveals: 'students-consistently-treat-every-self' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Rattrap\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "What did the crofter show the peddler to prove he had received thirty.', options: [
                { text: 'This is a **literal comprehension question**', outcome: 'This is a **literal comprehension question**. The answer is directly stated in the text: "the old.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe inferential questions are "opinion questions" with no wrong answers, so they write.', reveals: 'inferential-questions-are-opinion-questions' },
                { text: 'he told him about his cow\'s milk sales', outcome: 'Not quite — Students believe inferential questions are "opinion questions" with no wrong answers, so they write.', reveals: 'inferential-questions-are-opinion-questions' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A dhaba owner catches a hungry runaway boy pocketing bread. The staff want him handed to the police; the owner remembers how \'The Rattrap\' turns.',
            decisions: [{ prompt: 'What does the story suggest she do?', options: [
                { text: 'Meet him with dignity — food, shelter and honest trust first; Lagerlöf\'s point is that goodness awakened by kindness rehabilitates where punishment hardens.', outcome: 'The peddler became an honest man because Edla treated him like a captain, not a thief — trust is the lever that changes people.' },
                { text: 'Call the police at once — a thief is a thief, whatever his story.', outcome: 'That treats circumstance as character; the story shows the \'rattrap\' of poverty made the man, and kindness unmade it.', reveals: 'circumstance-equals-character' },
                { text: 'Slip him some money and send him on his way — problem solved without drama.', outcome: 'Cash without dignity leaves the trap shut; what changed the peddler was being trusted, not being tipped.', reveals: 'help-without-dignity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_04_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now switch reading modes — realist to allegorist — and watch the same story become a different machine. That flexibility is what top literature marks are made of.',
            decisions: [{ prompt: 'What comes next? The Rattrap · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Rattrap · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Rattrap\' — the supporting ideas and motifs that deepen.',
          hint: 'If stuck, return to c12_eng_f_cbse_04_006 and rewrite the primary theme in your own.',
          misconception: 'Students often think "secondary themes" means "less important themes" and give them one-sentence treatment.',
          parts: [
                { id: 'a', prompt: 'Name two secondary themes in "The Rattrap" besides the primary rattrap metaphor, and give one textual example for each.', answer: 'Correct answer: (1) Human loneliness and need for bonding',
                  options: ['Correct answer: (1) Human loneliness and need for bonding', 'kindness', 'secondary themes', 'less important themes'],
                  hint: 'If stuck, return to c12_eng_f_cbse_04_006 and rewrite the primary theme in your own words, then.',
                  misconception: 'Students often think "secondary themes" means "less important themes" and give them one-sentence treatment.' },
                { id: 'b', prompt: 'Explain how the crofter\'s loneliness functions as a "bait" in the rattrap metaphor. Use the exact phrase "bait" in your explanation.', answer: 'Correct answer: The crofter\'s loneliness makes him crave company, so he offers',
                  options: ['Correct answer: The crofter\'s loneliness makes him crave company, so he offers', 'the money was the bait', 'secondary themes', 'less important themes'],
                  hint: 'If stuck, return to c12_eng_f_cbse_04_006 and rewrite the primary theme in your own words, then.',
                  misconception: 'Students often think "secondary themes" means "less important themes" and give them one-sentence treatment.' },
                { id: 'c', prompt: 'The peddler signs his letter "Captain von Stahle." Identify which secondary theme this action illustrates and explain why he chooses that specific name.', answer: 'Correct answer: This illustrates redemption through empathy/dignity',
                  options: ['Correct answer: This illustrates redemption through empathy/dignity', 'A wrong answer that says', 'misses the sincere transformation', 'secondary themes'],
                  hint: 'If stuck, return to c12_eng_f_cbse_04_006 and rewrite the primary theme in your own words, then.',
                  misconception: 'Students often think "secondary themes" means "less important themes" and give them one-sentence treatment.' }
          ],
            remediations: { 'secondary-themes-means-less-important': { steps: ['If a student cannot distinguish primary vs secondary themes: (1) Have them reread node c12_eng_f_cbse_04_006 (Primary.', '(3) Ask: "What human experiences free people from the trap?" — guide them to kindness, trust, empathy.', '(4) Map each answer to a character: crofter (loneliness), ironmaster (pride), Edla (kindness), peddler (redemption).', '(5) Re-attempt Diagnostic Question 1 with this scaffold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary themes" means "less important themes" and give them one-sentence treatment.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The rattrap metaphor applies only to the peddler." Defend your position with evidence from at least two other characters.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'secondary themes', 'less important themes', 'lists characters without explaining *how* they\'re trapped lacks analytical depth'],
                  hint: 'If stuck, return to c12_eng_f_cbse_04_006 and rewrite the primary theme in your own words, then.',
                  misconception: 'Students often think "secondary themes" means "less important themes" and give them one-sentence treatment.' }
          ],
            remediations: { 'secondary-themes-means-less-important': { steps: ['If a student cannot distinguish primary vs secondary themes: (1) Have them reread node c12_eng_f_cbse_04_006 (Primary.', '(3) Ask: "What human experiences free people from the trap?" — guide them to kindness, trust, empathy.', '(4) Map each answer to a character: crofter (loneliness), ironmaster (pride), Edla (kindness), peddler (redemption).', '(5) Re-attempt Diagnostic Question 1 with this scaffold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_008', difficulty: 'standard',
          question: 'Imagery in \'The Rattrap\' — the vivid, sensory language that creates.',
          hint: 'If unable to distinguish tenor/vehicle in metaphor or map sensory words, review Class 11.',
          misconception: 'Students treat "imagery" and "metaphor" as *identification tasks* ("find the simile in line 5") rather than.',
          parts: [
                { id: 'a', prompt: 'The story opens with: "his clothes were in rags, his cheeks were sunken, and hunger gleamed in his eyes." Identify *which senses* each phrase appeals to, and.', answer: '**Correct answer:** "clothes in rags" → visual + tactile (texture)',
                  options: ['**Correct answer:** "clothes in rags" → visual + tactile (texture)', 'visual', 'to show he is poor', 'analysis of language'],
                  hint: 'If unable to distinguish tenor/vehicle in metaphor or map sensory words, review Class 11 Hornbill.',
                  misconception: 'Students treat "imagery" and "metaphor" as *identification tasks* ("find the simile in line 5") rather than *interpretive tools*.' },
                { id: 'b', prompt: 'Apply the concept of "extended metaphor" to the world-as-rattrap idea.', answer: '**Correct answer (4+ steps):** 1',
                  options: ['**Correct answer (4+ steps):** 1', 'how does the metaphor develop?', 'labeling', 'analyzing'],
                  hint: 'If unable to distinguish tenor/vehicle in metaphor or map sensory words, review Class 11 Hornbill.',
                  misconception: 'Students treat "imagery" and "metaphor" as *identification tasks* ("find the simile in line 5") rather than *interpretive tools*.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['**Re-read the two anchor passages** (para 2-3 for metaphor origin; para 7-8 for forest imagery) with a highlighter.', '**Make a 2-column table**: Column A = "Textual phrase," Column B = "Sense appealed to + Thematic effect." Fill 5 rows.', '**Re-attempt Diagnostic Q3** (extended metaphor trace) using your table.', 'If still stuck, revisit **c11_eng_h_cbse_01_008** (Class 11 Hornbill Ch1 Literary Devices: Imagery and Metaphor) for.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Rattrap\' — where opposite things are both true,.',
          hint: 'If stuck, review Class 11 node c11_eng_h_cbse_01_009 for irony/symbolism definitions and.',
          misconception: 'Students often treat irony and symbolism as separate, isolated devices — identifying "this is irony" and "this is.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'The Rattrap\'',
                  options: ['Irony and paradox in \'The Rattrap\'', '\'The Rattrap\' (Flamingo, ch', 'The plot/narrative arc of \'The Rattrap\'', 'The setting of \'The Rattrap\''],
                  hint: 'If stuck, review Class 11 node c11_eng_h_cbse_01_009 for irony/symbolism definitions and.',
                  misconception: 'Students often treat irony and symbolism as separate, isolated devices — identifying "this is irony" and "this is a symbol" without seeing.' }
          ],
            remediations: { 'students-often-treat-irony-and': { steps: ['If the student cannot distinguish irony types or trace symbolic evolution: (1) Return to c12_eng_f_cbse_04_008 (Imagery.', '(2) Create a three-column table: Column A = literal event/object, Column B = type of irony/symbol, Column C = thematic.', 'Fill it for 5 key moments.', '(3) Re-read the forest episode (peddler lost) and the final gift scene side-by-side; annotate how the *same object*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Rattrap\' — the words and phrases you must know to read.',
          hint: 'If stuck, return to the "Notice these expressions" box and practice the Context Clue.',
          misconception: 'Students believe "infer meaning from context" means guessing a synonym that *could* fit.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between the literal meaning of "keep body and soul together" and its contextual meaning in the opening paragraph of the story.', answer: 'Literally, the phrase means to maintain the connection between physical body and',
                  options: ['Literally, the phrase means to maintain the connection between physical body and', 'meaning in context', 'infer meaning from context', '"infer meaning from context" means guessing a synonym that *could* fit'],
                  hint: 'If stuck, return to the "Notice these expressions" box and practice the Context Clue Strategy.',
                  misconception: 'Students believe "infer meaning from context" means guessing a synonym that *could* fit. They ignore *connotation* and *collocation*.' },
                { id: 'b', prompt: 'In the sentence "The ironmaster nodded a haughty consent without honouring him with a single word," replace "haughty" with a synonym that preserves the exact.', answer: 'Synonym: "supercilious" (or "disdainful", "arrogant", "condescending")',
                  options: ['Synonym: "supercilious" (or "disdainful", "arrogant", "condescending")', 'infer meaning from context', '"infer meaning from context" means guessing a synonym that *could* fit'],
                  hint: 'If stuck, return to the "Notice these expressions" box and practice the Context Clue Strategy.',
                  misconception: 'Students believe "infer meaning from context" means guessing a synonym that *could* fit. They ignore *connotation* and *collocation*.' },
                { id: 'c', prompt: 'Compare the connotations of the labels used for the peddler: "vagabond," "stranger," "tramp," "ragamuffin," and "Captain von Stahle." How does each label.', answer: '- **Vagabond** (narrator): neutral/sociological, emphasizes rootlessness',
                  options: ['- **Vagabond** (narrator): neutral/sociological, emphasizes rootlessness', 'infer meaning from context', '"infer meaning from context" means guessing a synonym that *could* fit'],
                  hint: 'If stuck, return to the "Notice these expressions" box and practice the Context Clue Strategy.',
                  misconception: 'Students believe "infer meaning from context" means guessing a synonym that *could* fit. They ignore *connotation* and *collocation*.' }
          ],
            remediations: { 'infer-meaning-from-context-means': { steps: ['**Re-read the specific paragraph** for the target expression.', '**Annotate 3 context clues**: a preceding cause, a following effect, a descriptive detail.', '**Consult a dictionary** for 2-3 candidate meanings; eliminate those that clash with *any* clue.', '**Write a one-sentence justification** using the formula: "The word means X because the text shows Y and Z." 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_011', difficulty: 'standard',
          question: 'Language and style in \'The Rattrap\' — how the writer chose words, sentences and.',
          hint: 'Review the syntactic test: "Can I remove the -self word without breaking the sentence?".',
          misconception: 'Students consistently treat every -self pronoun as "reflexive" because the form is identical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'The Rattrap\'',
                  options: ['Language and style in \'The Rattrap\'', '\'The Rattrap\' (Flamingo, ch', 'The plot/narrative arc of \'The Rattrap\'', 'The setting of \'The Rattrap\''],
                  hint: 'Review the syntactic test: "Can I remove the -self word without breaking the sentence?" If yes →.',
                  misconception: 'Students consistently treat every -self pronoun as "reflexive" because the form is identical.' }
          ],
            remediations: { 'students-consistently-treat-every-self': { steps: ['Emphatic Drill:** Write five simple sentences on the board (e.g., "She cut herself," "She herself cut the cake").', 'Ask the student to delete the -self word.', 'If the sentence remains grammatical → emphatic; if it becomes incomplete → reflexive.', 'Practice with the four textbook sentences until 100% accuracy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_04_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Rattrap\' — questions answered straight from the.',
          hint: 'If stuck, immediately revisit c12_eng_f_cbse_04_002 (Plot) to re-sequence events and.',
          misconception: 'Students believe inferential questions are "opinion questions" with no wrong answers, so they write vague personal.',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "What did the crofter show the peddler to prove he had received thirty kronor?"', answer: 'This is a **literal comprehension question**',
                  options: ['This is a **literal comprehension question**', 'A wrong answer (e.g', 'he told him about his cow\'s milk sales', 'opinion questions'],
                  hint: 'If stuck, immediately revisit c12_eng_f_cbse_04_002 (Plot) to re-sequence events and.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no wrong answers, so they write vague personal reactions ("I think the.' },
                { id: 'b', prompt: 'Identify whether the following question is literal or inferential: "Why did the peddler decline the ironmaster\'s invitation to go to the manor house?"', answer: 'This is an **inferential comprehension question**',
                  options: ['This is an **inferential comprehension question**', 'because he was tired', 'because he didn\'t like the ironmaster', 'opinion questions'],
                  hint: 'If stuck, immediately revisit c12_eng_f_cbse_04_002 (Plot) to re-sequence events and.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no wrong answers, so they write vague personal reactions ("I think the.' },
                { id: 'c', prompt: 'Read this excerpt: "The stranger had stretched himself out on the floor and lay with a piece of pig iron under his head and his hat pulled down over his eyes.', answer: '**Literal answer**: Edla went up to the peddler and lifted his hat',
                  options: ['**Literal answer**: Edla went up to the peddler and lifted his hat', 'As soon as the young girl caught sight of him, she went up and lifted his hat', 'she woke him up gently', 'she offered him a fur coat'],
                  hint: 'If stuck, immediately revisit c12_eng_f_cbse_04_002 (Plot) to re-sequence events and.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no wrong answers, so they write vague personal reactions ("I think the.' },
                { id: 'd', prompt: 'Using the same excerpt, answer the inferential question: Why did the peddler jump up "abruptly" and seem "quite frightened" when Edla lifted his hat?', answer: '**Inferential answer**: The peddler reacted with fear',
                  options: ['**Inferential answer**: The peddler reacted with fear', 'The man was evidently used to sleeping with one eye open', 'Either he has stolen something or else he has escaped from jail', 'he was surprised by her beauty'],
                  hint: 'If stuck, immediately revisit c12_eng_f_cbse_04_002 (Plot) to re-sequence events and.',
                  misconception: 'Students believe inferential questions are "opinion questions" with no wrong answers, so they write vague personal reactions ("I think the.' }
          ],
            remediations: { 'inferential-questions-are-opinion-questions': { steps: ['If a student cannot distinguish literal from inferential questions, do this 3-step remediation: (1) Take 5 NCERT.', '(2) For inferential ones, have them list the 2-3 textual clues they combined (e.g., for "Why did Edla intercede?".', '(3) Re-attempt diagnostic questions 2 and 4 with this scaffold.', 'If still stuck, revisit c12_eng_f_cbse_04_002 (Plot) and c12_eng_f_cbse_04_004 (Protagonist) to rebuild event-sequence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
