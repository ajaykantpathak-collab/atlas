import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch01_p2: SimDef = {
    id: 'v3_c11_eng_w_ch01_p2',
    title: 'The Lament (Short Story) · Part 2/3',
    subtitle: 'Find the climax inside a grieving man, not in the loudest scene.',
    classLevel: 11, subject: 'eng_w', topic: 'The Lament (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch01'],
    nodeIds: ['c11_eng_w_cbse_01_007', 'c11_eng_w_cbse_01_008', 'c11_eng_w_cbse_01_009', 'c11_eng_w_cbse_01_010', 'c11_eng_w_cbse_01_011', 'c11_eng_w_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a listener shadowing an invisible cabdriver', intro: 'Twilight snow, a phantom cabby, a son newly buried — everyone rides, nobody hears.', goal: 'Distinguish a story of character from a story of incident and locate its internal climax.' },
    discovery: {
        question: 'A cabdriver\'s son has died and he can\'t get a single passenger to listen. Where does Chekhov place the climax — the shouting drunks, or somewhere quieter?',
        options: ['The quiet turn inward — after the last fare leaves, his grief \'rends his heart with greater force\' and he sees the totality of his isolation', 'The brawl with the three young men — loudest scene equals climax', 'The officer\'s first call for a cab', 'The stable scene, because that\'s where the story ends'],
        answer: 'The quiet turn inward — after the last fare leaves, his grief \'rends his heart with greater force\' and he sees the totality of his isolation',
        hook: 'The rowdy passengers are noise on the way up — in a story of character, the climax is a realisation, not a collision.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Lament\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Mark each fare as a failed attempt to speak, find the internal climax, and decide whether the circular ending on the horse is stasis or release.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Lament\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, giving one original example of each (not from the textbook).', options: [
                { text: 'Imagery: descriptive language appealing to the senses (e.g., "The scorching sand burned', outcome: 'Imagery: descriptive language appealing to the senses (e.g., "The scorching sand burned my soles").' },
                { text: 'simile', outcome: 'Not quite — Students routinely treat "imagery" as a synonym for "visual description" and miss auditory.', reveals: 'students-routinely-treat-imagery-as' },
                { text: 'Time is *like* a thief', outcome: 'Not quite — Students routinely treat "imagery" as a synonym for "visual description" and miss auditory.', reveals: 'students-routinely-treat-imagery-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Lament\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary contextual clue that reveals the meaning of "gingerbread horse" in the opening paragraph of The Lament?', options: [
                { text: 'The primary clues are the descriptive details: "white", "motionless", "angularity",', outcome: 'The primary clues are the descriptive details: "white", "motionless", "angularity", "straight.' },
                { text: 'motionless', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'angularity', outcome: 'Not quite — Students believe "vocabulary in context" means guessing a synonym that fits the sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Lament\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is the common morphological and semantic feature shared by the words *snuffle, snort, sniffle, snore* in the Language Work section.', options: [
                { text: 'All four words begin with the consonant cluster *sn-* and denote nasal, often', outcome: 'All four words begin with the consonant cluster *sn-* and denote nasal, often involuntary, sounds.' },
                { text: 'they are all verbs', outcome: 'Not quite — Students treat the Language Work exercises as isolated vocabulary drills (e.g., "memorise the *sn-*.', reveals: 'students-treat-the-language-work' },
                { text: 'they all relate to sleep', outcome: 'Not quite — Students treat the Language Work exercises as isolated vocabulary drills (e.g., "memorise the *sn-*.', reveals: 'students-treat-the-language-work' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Lament\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define the difference between a literal comprehension question and an inferential comprehension question in your own words.', options: [
                { text: 'A literal comprehension question asks for information directly stated in the text (e.g.,', outcome: 'A literal comprehension question asks for information directly stated in the text (e.g., "What.' },
                { text: 'inferential questions are also directly stated', outcome: 'Not quite — Students often believe that inferential questions have no "right" answer and that any guess.', reveals: 'inferential-questions-have-no-right' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often believe that inferential questions have no "right" answer and that any guess.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your film club is adapting Chekhov\'s \'The Lament\' — a St. Petersburg cabdriver whose son just died tries to tell his passengers, who won\'t listen. The director wants to cut the snow-and-dusk opening and add a funeral flashback: \'Give the audience the sad event directly.\'',
            decisions: [{ prompt: 'Does the rewrite honour how Chekhov builds grief?', options: [
                { text: 'No — Chekhov\'s method is objective observation: the snow, the \'phantom\' cabdriver hunched motionless, the \'gingerbread horse\' mirror Iona\'s frozen grief and social invisibility in 1880s St. Petersburg. The power is that nobody listens — a flashback dramatising the death would kill the very silence the story is about; grief finally pours out to the horse because humans refuse it.', outcome: 'Context (cabdriver precarity, Chekhov\'s clinical restraint) is the lens that makes the opening atmosphere do the emotional work — not a flashback.' },
                { text: 'The rewrite works — audiences need the funeral scene to feel the loss.', outcome: 'That reverses the point: the story withholds the event so we watch grief fail to find a listener — showing the death directly turns lament into melodrama.', reveals: 'show-the-sad-event-directly' },
                { text: 'Cut the weather too — scenery is filler; get straight to the dialogue.', outcome: 'The weather IS the psychology — snow and twilight externalise Iona\'s buried sorrow and the city\'s indifference; stripping it leaves a bare anecdote.', reveals: 'setting-is-filler' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'He finally tells the whole story — to a horse. The circle closes, but the grief has moved from suppressed to spoken.',
            decisions: [{ prompt: 'What comes next? The Lament (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Lament (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Lament\' — the supporting ideas and motifs that deepen.',
          hint: 'If stuck, review the definition of \'theme\' vs. \'topic\' and practice extracting themes.',
          misconception: 'Students often confuse secondary themes with subplots or minor events.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'The Lament\'',
                  options: ['Secondary themes in \'The Lament\'', '\'The Lament\' (Woven Words, ch', 'The plot/narrative arc of \'The Lament\'', 'The setting of \'The Lament\''],
                  hint: 'If stuck, review the definition of \'theme\' vs. \'topic\' and practice extracting themes from.',
                  misconception: 'Students often confuse secondary themes with subplots or minor events.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student lists events instead of themes, guide them: (1) Pick one event (e.g., the humpback\'s insults).', '(2) Ask: "What larger idea about society or human nature does this event represent?" (3) Formulate as a noun phrase.', '(5) Explain how it makes Iona\'s grief more profound.', 'Practice with three events to build the habit of abstraction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_008', difficulty: 'standard',
          question: 'Imagery in \'The Lament\' — the vivid, sensory language that creates.',
          hint: 'If stuck, revisit the definitions and examples of imagery types and metaphor structure.',
          misconception: 'Students routinely treat "imagery" as a synonym for "visual description" and miss auditory, tactile, kinesthetic, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery in \'The Lament\'',
                  options: ['Imagery in \'The Lament\'', '\'The Lament\' (Woven Words, ch', 'The plot/narrative arc of \'The Lament\'', 'The setting of \'The Lament\''],
                  hint: 'If stuck, revisit the definitions and examples of imagery types and metaphor structure in Class 10.',
                  misconception: 'Students routinely treat "imagery" as a synonym for "visual description" and miss auditory, tactile, kinesthetic, and organic images that.' }
          ],
            remediations: { 'students-routinely-treat-imagery-as': { steps: ['Give the student a one-page excerpt from the story (opening or stable scene) and ask them to highlight *only*.', 'Have them list every direct comparison (A is B) and test each: "Can I insert \'like\' without changing meaning?" If yes →.', 'For each confirmed metaphor, fill a three-column table: Tenor | Vehicle | Ground (shared quality).', 'Finally, ask: "Which metaphor changes across the story?" guiding them to the gingerbread → foal shift.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely treat "imagery" as a synonym for "visual description" and miss auditory, tactile, kinesthetic, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the organic imagery (internal bodily sensations) in the passage: "Iona shifts about on his seat as if he were on needles...', answer: 'The organic imagery is effective, not melodramatic',
                  options: ['The organic imagery is effective, not melodramatic', 'overdone', 'restraint', 'absence of feeling'],
                  hint: 'If stuck, revisit the definitions and examples of imagery types and metaphor structure in Class 10.',
                  misconception: 'Students routinely treat "imagery" as a synonym for "visual description" and miss auditory, tactile, kinesthetic, and organic images that.' }
          ],
            remediations: { 'students-routinely-treat-imagery-as': { steps: ['Give the student a one-page excerpt from the story (opening or stable scene) and ask them to highlight *only*.', 'Have them list every direct comparison (A is B) and test each: "Can I insert \'like\' without changing meaning?" If yes →.', 'For each confirmed metaphor, fill a three-column table: Tenor | Vehicle | Ground (shared quality).', 'Finally, ask: "Which metaphor changes across the story?" guiding them to the gingerbread → foal shift.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Lament\' — where opposite things are both true,.',
          hint: 'If stuck, re-read the story focusing *only* on dialogue tags and stage directions (e.g.',
          misconception: 'Students often confuse **irony with mere coincidence or bad luck**.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the horse in "The Lament" functions as a symbol rather than just a literal animal. What abstract idea does it embody?', answer: 'The horse transcends its literal role',
                  options: ['The horse transcends its literal role', 'it is white and looks like a gingerbread horse'],
                  hint: 'If stuck, re-read the story focusing *only* on dialogue tags and stage directions (e.g., "Iona.',
                  misconception: 'Students often confuse **irony with mere coincidence or bad luck**.' },
                { id: 'b', prompt: 'Apply the concept of dramatic irony to the scene where Iona tells the officer, "My son, Barin, died this week." What does the reader know that the officer does.', answer: 'The reader knows the depth of Iona\'s grief',
                  options: ['The reader knows the depth of Iona\'s grief', 'the officer is rude'],
                  hint: 'If stuck, re-read the story focusing *only* on dialogue tags and stage directions (e.g., "Iona.',
                  misconception: 'Students often confuse **irony with mere coincidence or bad luck**.' },
                { id: 'c', prompt: 'Analyze how the symbolism of "snow" evolves across the story\'s beginning, middle, and end.', answer: 'Initially, snow establishes a realistic **setting** ("thick wet snow',
                  options: ['Initially, snow establishes a realistic **setting** ("thick wet snow', 'treats snow only as weather description misses its dynamic symbolic arc'],
                  hint: 'If stuck, re-read the story focusing *only* on dialogue tags and stage directions (e.g., "Iona.',
                  misconception: 'Students often confuse **irony with mere coincidence or bad luck**.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['If a student cannot distinguish irony from misfortune, guide them through a **three-column table**: Column 1.', 'Fill it for each passenger encounter.', 'For symbolism, use the **"So What?" test**: "The horse is white.', 'It makes him look like a phantom.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Lament\' — the words and phrases you must know to read.',
          hint: 'If stuck on "slough", review the Class 9 vocabulary node c9_engl_ch1_008 where.',
          misconception: 'Students believe "vocabulary in context" means guessing a synonym that fits the sentence grammatically.',
          parts: [
                { id: 'a', prompt: 'In the sentence "Iona shifts about on his seat as if he were on needles", apply the context-clue strategy to deduce the meaning.', answer: 'Locate phrase',
                  options: ['Locate phrase', 'he was cold', 'vocabulary in context'],
                  hint: 'If stuck on "slough", review the Class 9 vocabulary node c9_engl_ch1_008 where "murmuring" and.',
                  misconception: 'Students believe "vocabulary in context" means guessing a synonym that fits the sentence grammatically.' },
                { id: 'b', prompt: 'Analyze the sound-word cluster: snuffle, snort, sniffle, snore.', answer: 'All four begin with /sn/ and involve nasal airflow –',
                  options: ['All four begin with /sn/ and involve nasal airflow –', 'they start with sn', 'vocabulary in context'],
                  hint: 'If stuck on "slough", review the Class 9 vocabulary node c9_engl_ch1_008 where "murmuring" and.',
                  misconception: 'Students believe "vocabulary in context" means guessing a synonym that fits the sentence grammatically.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['**Re-anchor in the physical text**: Have the student physically act out "shifts about on his seat as if he were.', '**Color-code the context clues**: Use three highlighters – one for physical description, one for emotional state, one.', '**Sound-map the verbs**: Draw a continuum line from "quiet/nasal" (snuffle, sniffle) to "loud/oral" (guffaw, shriek).', 'the passengers\' sounds fall.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_011', difficulty: 'standard',
          question: 'Language and style in \'The Lament\' — how the writer chose words, sentences and.',
          hint: 'Review "Vocabulary in Context: Key Words" (c11_eng_w_cbse_01_010) and "Literary Devices.',
          misconception: 'Students treat the Language Work exercises as isolated vocabulary drills (e.g., "memorise the *sn-* words") rather than.',
          parts: [
                { id: 'a', prompt: 'What is the common morphological and semantic feature shared by the words *snuffle, snort, sniffle, snore* in the Language Work section of "The Lament"?', answer: 'All four words begin with the consonant cluster *sn-* and denote nasal, often',
                  options: ['All four words begin with the consonant cluster *sn-* and denote nasal, often', 'they are all verbs', 'they all relate to sleep'],
                  hint: 'Review "Vocabulary in Context: Key Words" (c11_eng_w_cbse_01_010) and "Literary Devices: Imagery.',
                  misconception: 'Students treat the Language Work exercises as isolated vocabulary drills (e.g., "memorise the *sn-* words") rather than as analytical tools.' }
          ],
            remediations: { 'students-treat-the-language-work': { steps: ['Have the student read aloud the opening paragraph and the stable scene, circling every *sn-* word and every *white*.', 'Ask: "What sound does your nose make when you cry but don\'t want anyone to hear?" — connect to *snuffle*.', 'Use a two-column table: Column A = word/phrase from text; Column B = body sensation it evokes.', 'Fill for *needles, equilibrium, suffocating, wriggle, giggle, jeer, sigh*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Lament\' — questions answered straight from the.',
          hint: 'If stuck, review the PEEL answer structure from c10_engl_cbse_04_007 (Diary as Literary.',
          misconception: 'Students often believe that inferential questions have no "right" answer and that any guess is acceptable.',
          parts: [
                { id: 'a', prompt: 'In "The Lament", the officer asks Iona, "What did he die of?" and Iona replies, "They say high fever." Is the question "What was the cause of Iona\'s son\'s.', answer: 'It is a literal question',
                  options: ['It is a literal question', 'we don\'t know for sure', 'inferential questions have no "right" answer and that any guess is acceptable'],
                  hint: 'If stuck, review the PEEL answer structure from c10_engl_cbse_04_007 (Diary as Literary Form) and.',
                  misconception: 'Students often believe that inferential questions have no "right" answer and that any guess is acceptable.' },
                { id: 'b', prompt: 'Using the PEEL structure, write a 3-sentence answer to the inferential question: "Why does Iona turn to his horse at the end of the story?" Include a point.', answer: 'Point: Iona turns to his horse',
                  options: ['Point: Iona turns to his horse', 'inferential questions have no "right" answer and that any guess is acceptable'],
                  hint: 'If stuck, review the PEEL answer structure from c10_engl_cbse_04_007 (Diary as Literary Form) and.',
                  misconception: 'Students often believe that inferential questions have no "right" answer and that any guess is acceptable.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['If a student cannot distinguish literal from inferential, give them a two-column table: Column A: 5 questions from the.', 'Column B: "Literal" or "Inferential".', 'Ask them to highlight the words in the question that signal the type (e.g., "according to the text", "what does the.', '"why", "how does the author imply", "what can you infer").'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
