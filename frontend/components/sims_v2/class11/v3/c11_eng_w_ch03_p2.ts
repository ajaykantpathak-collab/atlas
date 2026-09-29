import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch03_p2: SimDef = {
    id: 'v3_c11_eng_w_ch03_p2',
    title: 'The Rocking-horse Winner (Short Story) · Part 2/3',
    subtitle: 'Follow a whisper through a house to a fatal Derby win.',
    classLevel: 11, subject: 'eng_w', topic: 'The Rocking-horse Winner (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch03'],
    nodeIds: ['c11_eng_w_cbse_03_007', 'c11_eng_w_cbse_03_008', 'c11_eng_w_cbse_03_009', 'c11_eng_w_cbse_03_010', 'c11_eng_w_cbse_03_011', 'c11_eng_w_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader inside a house that keeps asking for money', intro: 'A boy rides a rocking-horse furiously and names winners; the family calls it luck. Count what the luck is fed.', goal: 'Identify the structural climax and evaluate how the ending serves the critique of materialism.' },
    discovery: {
        question: 'Paul wins eighty thousand pounds on the Derby — and dies immediately after. Why would Lawrence deny the story its happy ending?',
        options: ['To make the acquisition of money literally fatal — the whisper\'s promise that luck brings more money becomes a deadly irony', 'Because the author disliked tidy resolutions', 'To punish the uncle for betting on a child', 'Because Paul\'s gift was the real ending all along'],
        answer: 'To make the acquisition of money literally fatal — the whisper\'s promise that luck brings more money becomes a deadly irony',
        hook: 'The climax isn\'t the race result — it\'s the frenzied ride the night before, where Paul forces the \'knowing\' out of a wooden horse.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'The Rocking-horse Winner\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the whispering house as the story\'s engine, place the true climax on the last ride, and test whether the opening counts as in medias res.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'The Rocking-horse Winner\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that supports, complicates, or enriches the', outcome: 'A secondary theme is a subordinate idea that supports, complicates, or enriches the primary theme.' },
                { text: 'horse racing', outcome: 'Not quite — Students often treat secondary themes as a simple list of "topics" present in the story (e.g.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'equates secondary themes with minor topics (e', outcome: 'Not quite — Students often treat secondary themes as a simple list of "topics" present in the story (e.g.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'The Rocking-horse Winner\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the precise difference between a metaphor and a simile, and why does that distinction matter for analyzing the rocking-horse as.', options: [
                { text: 'A simile compares two things using "like" or "as" (e.g., "He rode *like* a madman"),', outcome: 'A simile compares two things using "like" or "as" (e.g., "He rode *like* a madman"), preserving the.' },
                { text: 'They are the same', outcome: 'Not quite — Students often treat imagery and metaphor as **identification exercises** ("Find three metaphors").', reveals: 'students-often-treat-imagery-and' },
                { text: 'it creates a picture', outcome: 'Not quite — Students often treat imagery and metaphor as **identification exercises** ("Find three metaphors").', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'The Rocking-horse Winner\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is a context clue, and name the five main types used to infer word meaning in a text.', options: [
                { text: 'A context clue is a hint within the surrounding text that helps a reader deduce the', outcome: 'A context clue is a hint within the surrounding text that helps a reader deduce the meaning of.' },
                { text: 'looking in a dictionary', outcome: 'Not quite — Students treat "careered" as a noun (profession) because they know "career" as a noun, ignoring the.', reveals: 'students-treat-careered-as-a' },
                { text: 'guessing', outcome: 'Not quite — Students treat "careered" as a noun (profession) because they know "career" as a noun, ignoring the.', reveals: 'students-treat-careered-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'The Rocking-horse Winner\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the proverb used by Uncle Oscar in the story and state its literal meaning in one sentence.', options: [
                { text: 'The proverb is "A bird in the hand is worth two in the bush," meaning it is better to', outcome: 'The proverb is "A bird in the hand is worth two in the bush," meaning it is better to keep a small.' },
                { text: 'make hay while the sun shines', outcome: 'Not quite — Students treat "Language Usage" exercises as vocabulary memorization tasks — learning dictionary.', reveals: 'students-treat-language-usage-exercises' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'The Rocking-horse Winner\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and an inferential comprehension question in the context.', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What was', outcome: 'A literal question asks for information directly stated in the text (e.g., "What was Paul\'s.' },
                { text: 'questions about the story', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion," leading them to write.', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion," leading them to write.', reveals: 'inferential-means-guessing-or-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your book club debates \'The Rocking-horse Winner\': a boy rides his toy horse furiously to divine race winners, trying to stop the house whispering \'There must be more money.\' A member calls it \'a ghost story about a haunted house — spooky but shallow\'.',
            decisions: [{ prompt: 'What is the whispering house really about?', options: [
                { text: 'Post-WWI money anxiety wearing a ghost story\'s mask: Lawrence\'s genteel-poor family — \'luck\' and \'filthy lucre\' as household religion — turns domestic economics into haunting. The whispers are the metaphor for a society eating itself alive over status and cash; the boy\'s gift is doomed because feeding the craving only raises its voice.', outcome: 'Context is the lens: Lawrence\'s own mining-village class tension and post-war wealth panic turn a spooky detail into social diagnosis.' },
                { text: 'It IS a ghost story — the whispering is supernatural, end of analysis.', outcome: 'The haunting is a vehicle: treating the whispers as literal ghosts misses that they articulate the mother\'s hunger for money and the family myth of \'luck\'.', reveals: 'whispers-are-just-ghosts' },
                { text: 'It\'s a moral lesson for kids — don\'t gamble on horses.', outcome: 'The betting is symptom, not subject: the critique is of a household economy built on loveless consumption that literally consumes the child.', reveals: 'story-is-anti-gambling' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The house kept whispering \'there must be more money\' — the story ends by showing exactly what more money costs.',
            decisions: [{ prompt: 'What comes next? The Rocking-horse Winner (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Rocking-horse Winner (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes in \'The Rocking-horse Winner\' — the supporting ideas and.',
          hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_03_006) and practice converting.',
          misconception: 'Students often treat secondary themes as a simple list of "topics" present in the story (e.g., "gambling," "family,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'The Rocking-horse Winner\'',
                  options: ['Secondary themes in \'The Rocking-horse Winner\'', '\'The Rocking-horse Winner\' (Woven Words, ch', 'The plot/narrative arc of \'The Rocking-horse Winner\'', 'The setting of \'The Rocking-horse Winner\''],
                  hint: 'If stuck, review the primary theme node (c11_eng_w_cbse_03_006) and practice converting topics into.',
                  misconception: 'Students often treat secondary themes as a simple list of "topics" present in the story (e.g., "gambling," "family," "luck") rather than.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists topics instead of thematic statements, guide them through this 3-step fix: (1) Take their topic.', 'What is the outcome?" (2) Help them formulate a complete sentence: "Gambling in the story is portrayed as a destructive.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_008', difficulty: 'standard',
          question: 'Imagery in \'The Rocking-horse Winner\' — the vivid, sensory language that.',
          hint: 'If stuck, review **c7_engl_ch04_008 (Sensory Imagery and Suspense Building)** — it models.',
          misconception: 'Students often treat imagery and metaphor as **identification exercises** ("Find three metaphors") rather than.',
          parts: [
                { id: 'a', prompt: 'Analyze the auditory imagery of the house’s whisper: "There must be more money!', answer: 'Lawrence physicalizes the abstraction through: 1',
                  options: ['Lawrence physicalizes the abstraction through: 1', 'the house whispered', 'The horse *was* his chariot'],
                  hint: 'If stuck, review **c7_engl_ch04_008 (Sensory Imagery and Suspense Building)** — it models tracing.',
                  misconception: 'Students often treat imagery and metaphor as **identification exercises** ("Find three metaphors") rather than **functional analysis**.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Re-teach the mechanism**: Use a non-literary example: "Time is a thief" (metaphor) vs.', '"Time is like a thief" (simile) vs.', '"The clock stole my afternoon" (personification).', 'Ask: *What qualities transfer in each?* 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat imagery and metaphor as **identification exercises** ("Find three metaphors") rather than.',
          parts: [
                { id: 'a', prompt: 'Create a new metaphor for the house’s whisper that a modern Indian teenager might use (e.g., involving smartphones, social media, or exam pressure).', answer: '**Metaphor**: "The house was a notification that never cleared',
                  options: ['**Metaphor**: "The house was a notification that never cleared', 'The horse *was* his chariot'],
                  hint: 'If stuck, review **c7_engl_ch04_008 (Sensory Imagery and Suspense Building)** — it models tracing.',
                  misconception: 'Students often treat imagery and metaphor as **identification exercises** ("Find three metaphors") rather than **functional analysis**.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Re-teach the mechanism**: Use a non-literary example: "Time is a thief" (metaphor) vs.', '"Time is like a thief" (simile) vs.', '"The clock stole my afternoon" (personification).', 'Ask: *What qualities transfer in each?* 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_009', difficulty: 'standard',
          question: 'Irony and paradox in \'The Rocking-horse Winner\' — where opposite things are.',
          hint: 'If stuck, re-read the story focusing only on the rocking-horse scenes and the.',
          misconception: 'Students often treat irony as mere "bad luck" or "coincidence" (e.g., "It\'s ironic that Paul died young") without.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of dramatic irony to the scene where Paul\'s mother asks Uncle Oscar about the birthday gift and the lawyer\'s letter.', answer: 'The reader knows the five thousand pounds comes from Paul\'s betting winnings',
                  options: ['The reader knows the five thousand pounds comes from Paul\'s betting winnings', 'she doesn\'t know the source'],
                  hint: 'If stuck, re-read the story focusing only on the rocking-horse scenes and the whispering-house.',
                  misconception: 'Students often treat irony as mere "bad luck" or "coincidence" (e.g., "It\'s ironic that Paul died young") without identifying the.' }
          ],
            remediations: { 'students-often-treat-irony-as': { steps: ['Have the student create a two-column table: Column A = "What the character expects / What the object looks like".', 'For each row, ask: "Is the gap between A and B ironic?', 'For symbols, add a third column: "What abstract idea does this physical trait represent?" 4.', 'Practice with three clear examples from the text (e.g., mother\'s definition of luck vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_010', difficulty: 'standard',
          question: 'Key vocabulary of \'The Rocking-horse Winner\' — the words and phrases you must.',
          hint: 'Review Class 10 Vocabulary in Context (c10_engl_cbse_02_009) — specifically the.',
          misconception: 'Students treat "careered" as a noun (profession) because they know "career" as a noun, ignoring the -ed verb ending and.',
          parts: [
                { id: 'a', prompt: 'Compare the use of "reiterated" in two passages: (a) Bassett: "\'It\'s as if he had it from heaven,\' Bassett reiterated." (b) Paul: "\'I\'ve got to know for the.', answer: 'In (a), "reiterated" (clue: religious tone',
                  options: ['In (a), "reiterated" (clue: religious tone', 'repeated'],
                  hint: 'Review Class 10 Vocabulary in Context (c10_engl_cbse_02_009) — specifically the inference-clue.',
                  misconception: 'Students treat "careered" as a noun (profession) because they know "career" as a noun, ignoring the -ed verb ending and the adverb "wildly".' }
          ],
            remediations: { 'students-treat-careered-as-a': { steps: ['**Isolate the syntax**: Have the student underline the target word, label its part of speech (verb/noun/adjective), and.', '**Reconstruct the clause**: Rewrite the sentence replacing the target word with a blank; ask "What action/quality fits.', '**Map the clue chain**: Draw arrows from clue words to the blank (e.g., "wildly" → ______; "in" → ______).', '**Contrast with dictionary**: Only after inference, check dictionary; discuss how context adds connotation (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_011', difficulty: 'standard',
          question: 'Language and style in \'The Rocking-horse Winner\' — how the writer chose words.',
          hint: 'If stuck, return to the "Look for these expressions in the story" box at the start of the.',
          misconception: 'Students treat "Language Usage" exercises as vocabulary memorization tasks — learning dictionary definitions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language and style in \'The Rocking-horse Winner\'',
                  options: ['Language and style in \'The Rocking-horse Winner\'', '\'The Rocking-horse Winner\' (Woven Words, ch', 'The plot/narrative arc of \'The Rocking-horse Winner\'', 'The setting of \'The Rocking-horse Winner\''],
                  hint: 'If stuck, return to the "Look for these expressions in the story" box at the start of the NCERT.',
                  misconception: 'Students treat "Language Usage" exercises as vocabulary memorization tasks — learning dictionary definitions of "smirk," "grimace," "sneer".' }
          ],
            remediations: { 'students-treat-language-usage-exercises': { steps: ['Have the student locate the exact sentence for each target word/phrase in the NCERT text (provide page/line references).', 'For each, complete a three-column table: Column A = literal/dictionary meaning, Column B = contextual meaning in this.', 'Practice converting Column C insights into PEEL-structured answers: "The word \'smirking\' (Point) applied to the doll.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension of \'The Rocking-horse Winner\' — questions answered.',
          hint: 'If stuck, review c11_eng_w_cbse_03_002 (Plot) for event sequencing and.',
          misconception: 'Students believe "inferential" means "guessing" or "giving your opinion," leading them to write answers like "I think.',
          parts: [
                { id: 'a', prompt: 'In the story, the house whispers "There must be more money!" Identify whether the following question is literal or inferential: "What specific phrase does the.', answer: '"What specific phrase does the house whisper?" is LITERAL',
                  options: ['"What specific phrase does the house whisper?" is LITERAL', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck, review c11_eng_w_cbse_03_002 (Plot) for event sequencing and c11_eng_w_cbse_03_004.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion," leading them to write answers like "I think Paul rode the horse.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer this inferential question: "Why does Paul ride the rocking-horse \'with a frenzy that made the little girls peer at him.', answer: '**Point:** Paul rides frenziedly',
                  options: ['**Point:** Paul rides frenziedly', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck, review c11_eng_w_cbse_03_002 (Plot) for event sequencing and c11_eng_w_cbse_03_004.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion," leading them to write answers like "I think Paul rode the horse.' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['If a student conflates inference with opinion: (1) Give them a literal fact from the story (e.g., "Paul\'s eyes had.', '(2) Show two answers to "Why did Hester ask for the full 5,000 pounds?" — Answer A: "Because she was greedy" (opinion).', '(3) Have them rewrite Answer A using Answer B\'s structure.', '(4) Drill: for every inferential claim, they must write "The text shows..." followed by a quote.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
