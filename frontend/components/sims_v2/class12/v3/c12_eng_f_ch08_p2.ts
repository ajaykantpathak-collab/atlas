import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch08_p2: SimDef = {
    id: 'v3_c12_eng_f_ch08_p2',
    title: 'Going Places · Part 2/3',
    subtitle: 'A boutique in the head, a biscuit factory at the gate',
    classLevel: 12, subject: 'eng_f', topic: 'Going Places · Part 2/3',
    chapters: ['c12_eng_f_ch08'],
    nodeIds: ['c12_eng_f_cbse_08_007', 'c12_eng_f_cbse_08_008', 'c12_eng_f_cbse_08_009', 'c12_eng_f_cbse_08_010', 'c12_eng_f_cbse_08_011', 'c12_eng_f_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coming-of-age critic', intro: 'Sophie dreams in colour inside a grey industrial town. The distance between the two is the whole story.', goal: 'Distinguish adolescent fantasy from socio-economic reality in Going Places and unpack its double-edged title.' },
    discovery: {
        question: 'A student summarises Going Places as \'a girl who becomes a fashion designer and meets her footballer.\' What did they mistake for plot?',
        options: ['Sophie\'s fantasies — the boutique and Danny Casey are imagined constructions set against a biscuit-factory future, not events', 'Nothing — that\'s exactly what happens', 'Her real career plan', 'The sequel\'s plot'],
        answer: 'Sophie\'s fantasies — the boutique and Danny Casey are imagined constructions set against a biscuit-factory future, not events',
        hook: 'The title works twice: \'going places\' as ambition and as bitter irony — she\'s a working-class girl earmarked for a factory, unlikely to physically go anywhere. Confusing her daydreams with the story\'s facts is the exact trap the chapter sets.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas that run parallel to the primary theme, enriching the narrative by exploring related social, psychological, or emotional dimensions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map Sophie\'s dream-world against her street: weigh the boutique fantasies and hero worship against the steamy kitchen, grimy father and waiting canal — and decide how the title earns its irony.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re sitting in the exam hall and the question reads: "How does Barton use imagery and metaphor to contrast Sophie\'s inner world with her outer.',
            decisions: [{ prompt: 'Define imagery and metaphor in your own words, and give one example of each from "Going Places" (quote the exact phrase).', options: [
                { text: 'Imagery: Language appealing to senses to create mental pictures', outcome: 'Imagery: Language appealing to senses to create mental pictures.' },
                { text: 'like a ghost', outcome: 'Not quite — Students consistently confuse **metaphor** with **symbolism** in this chapter.', reveals: 'students-consistently-confuse-metaphor-with' },
                { text: 'the city slept', outcome: 'Not quite — Students consistently confuse **metaphor** with **symbolism** in this chapter.', reveals: 'students-consistently-confuse-metaphor-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are scrolling through social media and see a friend post a photo of a luxury vacation with the caption "Living my best life #blessed," but you know.',
            decisions: [{ prompt: 'Define verbal irony and give one example from "Going Places" where Sophie uses verbal irony (or where her words are ironic in hindsight).', options: [
                { text: '**Correct Answer:** Verbal irony occurs when a speaker says something but means the', outcome: '**Correct Answer:** Verbal irony occurs when a speaker says something but means the opposite,.' },
                { text: 'This another of your wild stories?', outcome: 'Not quite — **Misconception:** "Irony in literature is just when something funny or unexpected happens." **Why.', reveals: 'misconception-irony-in-literature-is' },
                { text: 'Danny Casey is a metaphor for hope', outcome: 'Not quite — **Misconception:** "Irony in literature is just when something funny or unexpected happens." **Why.', reveals: 'misconception-irony-in-literature-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading a novel on the metro and your phone dies — no dictionary app.',
            decisions: [{ prompt: 'What does the word *incongruity* mean in the sentence: "Sophie wondered at the incongruity of the delicate bow which fastened her apron.', options: [
                { text: '**Correct answer: B) A lack of harmony or suitability between two things.** The context', outcome: '**Correct answer: B) A lack of harmony or suitability between two things.** The context contrasts.' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means *guessing* the meaning from a vague feeling.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: '"vocabulary in context" means *guessing* the meaning from a vague feeling', outcome: 'Not quite — Students believe "vocabulary in context" means *guessing* the meaning from a vague feeling.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re telling a friend about your morning: "I burnt the toast, rushing to catch the bus." You\'ve just used a present participle ("rushing") to show.',
            decisions: [{ prompt: 'Identify the present participle phrase showing simultaneity in this sentence from the text: "Jansie, linking arms with her along the.', options: [
                { text: 'The present participle phrase is "linking arms with her along the street"', outcome: 'The present participle phrase is "linking arms with her along the street".' },
                { text: 'looked', outcome: 'Not quite — Students believe ANY -ing word in the text is a "present participle for simultaneity".', reveals: 'any-ing-word-in-the' },
                { text: 'present participle for simultaneity', outcome: 'Not quite — Students believe ANY -ing word in the text is a "present participle for simultaneity".', reveals: 'any-ing-word-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in the CBSE exam hall and see a question: "Why did Sophie wriggle when Geoff told her father about meeting Danny Casey?" Your heart.',
            decisions: [{ prompt: 'What is the key difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'Literal questions have answers directly stated in the text (e.g., "What does Sophie dream', outcome: 'Literal questions have answers directly stated in the text (e.g., "What does Sophie dream of?" → "a.' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing" — so they write vague opinions ("Sophie is sad.', reveals: 'inferential-means-guessing-so-they' },
                { text: 'guessing', outcome: 'Not quite — Students believe "inferential" means "guessing" — so they write vague opinions ("Sophie is sad.', reveals: 'inferential-means-guessing-so-they' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend from a struggling family talks of opening a boutique and \'meeting famous people\', spinning stories everyone half-believes. As her closest friend, you can choose how to respond.',
            decisions: [{ prompt: 'How do you handle her dreaming?', options: [
                { text: 'Respect the dream but ground it — talk honestly about money, training and next steps; \'Going Places\' shows fantasy becomes painful only when it substitutes for a plan.', outcome: 'Sophie\'s tragedy isn\'t ambition — it\'s that nothing connects the dream to the biscuit factory she\'s earmarked for.' },
                { text: 'Let the stories ride — dreaming costs nothing and planning is a buzzkill.', outcome: 'Sophie\'s Danny Casey fable shows untethered fantasy turns into self-deception and isolation.', reveals: 'fantasy-substitutes-plans' },
                { text: 'Tell her bluntly she\'ll end up at the factory and should stop embarrassing herself.', outcome: 'Mockery kills the aspiration without offering a path — the story critiques the trap, not the dreaming.', reveals: 'mockery-cures-dreaming' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_08_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hold a character\'s fantasy and her fate in the same frame — the double vision this story demands and every adolescent knows.',
            decisions: [{ prompt: 'What comes next? Going Places · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Going Places · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas that run parallel to the primary.',
          hint: 'If stuck, review node 006 (Primary Theme) and re-read the family dinner scene.',
          misconception: 'Students often treat every topic mentioned in the story (football, boutique, biscuit factory, motorcycle) as a separate.',
          parts: [
                { id: 'a', prompt: 'Geoff\'s silence is described as "words had to be prized out of him like stones out of the ground." Sophie is "jealous of his silence" because "when he wasn\'t.', answer: 'Geoff\'s silence symbolises the inaccessible adult world Sophie craves',
                  options: ['Geoff\'s silence symbolises the inaccessible adult world Sophie craves', 'Geoff is shy', 'they don\'t talk much'],
                  hint: 'If stuck, review node 006 (Primary Theme) and re-read the family dinner scene (father/mother/Geoff.',
                  misconception: 'Students often treat every topic mentioned in the story (football, boutique, biscuit factory, motorcycle) as a separate theme.' }
          ],
            remediations: { 'students-often-treat-every-topic': { steps: ['Have the student list 5 concrete topics from the story (e.g., biscuit factory, Danny Casey, Geoff\'s motorcycle.', 'For each, ask: "What bigger idea about life/human nature does this represent?" Guide them to abstract: factory → class.', 'Have them write one sentence per theme: "The story shows that [abstract idea] by [specific evidence]." 4.', 'Re-test with Diagnostic Question 2 using a new detail (e.g., mother\'s "stooped back" and "delicate bow").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck on device identification: return to c11_eng_h_cbse_01_008 worked examples and.',
          misconception: 'Students consistently confuse **metaphor** with **symbolism** in this chapter.',
          parts: [
                { id: 'a', prompt: 'Define imagery and metaphor in your own words, and give one example of each from "Going Places" (quote the exact phrase).', answer: 'Imagery: Language appealing to senses to create mental pictures',
                  options: ['Imagery: Language appealing to senses to create mental pictures', 'like a ghost', 'the city slept', 'metaphor'],
                  hint: 'If stuck on device identification: return to c11_eng_h_cbse_01_008 worked examples and re-do the.',
                  misconception: 'Students consistently confuse **metaphor** with **symbolism** in this chapter.' },
                { id: 'b', prompt: 'In the sentence "She saw herself riding there behind Geoff. He wore new, shining black leathers and she a yellow dress with a kind of cape that flew out.', answer: 'This is visual imagery (colour, movement, clothing detail)',
                  options: ['This is visual imagery (colour, movement, clothing detail)', 'tactile imagery because of the leather', 'kinesthetic imagery', 'identifies metaphor correctly'],
                  hint: 'If stuck on device identification: return to c11_eng_h_cbse_01_008 worked examples and re-do the.',
                  misconception: 'Students consistently confuse **metaphor** with **symbolism** in this chapter.' }
          ],
            remediations: { 'students-consistently-confuse-metaphor-with': { steps: ['**Revisit definitions**: Use c11_eng_h_cbse_01_008 (Class 11 Imagery and Metaphor node) to drill the *formal.', '**Practice sorting**: Take 10 quotes from "Going Places" (e.g., "ghost past defenders," "amber glow," "pilgrimage,".', '**Re-diagnostic**: Write one sentence for each category explaining *why* the quote fits *that* category and not the.', '**Escalate**: If still confused, map each device to its *function* in the story (Metaphor = condenses theme; Symbol.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse **metaphor** with **symbolism** in this chapter.',
          parts: [
                { id: 'a', prompt: 'Create a new metaphor for Sophie\'s *disappointment* at the canal that uses **tactile imagery** (touch/texture/temperature) and explain in two sentences how.', answer: '**Metaphor:** "Disappointment settled on her shoulders like damp wool',
                  options: ['**Metaphor:** "Disappointment settled on her shoulders like damp wool', 'identifies metaphor correctly', 'confuses metaphor with symbol/imagery'],
                  hint: 'If stuck on device identification: return to c11_eng_h_cbse_01_008 worked examples and re-do the.',
                  misconception: 'Students consistently confuse **metaphor** with **symbolism** in this chapter.' }
          ],
            remediations: { 'students-consistently-confuse-metaphor-with': { steps: ['**Revisit definitions**: Use c11_eng_h_cbse_01_008 (Class 11 Imagery and Metaphor node) to drill the *formal.', '**Practice sorting**: Take 10 quotes from "Going Places" (e.g., "ghost past defenders," "amber glow," "pilgrimage,".', '**Re-diagnostic**: Write one sentence for each category explaining *why* the quote fits *that* category and not the.', '**Escalate**: If still confused, map each device to its *function* in the story (Metaphor = condenses theme; Symbol.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, return to **c12_eng_f_cbse_08_008 (Imagery and Metaphor)** and re-do the.',
          misconception: '**Misconception:** "Irony in literature is just when something funny or unexpected happens." **Why it\'s wrong:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events is opposite to',
                  options: ['Irony is a literary device where the intended meaning of words or events is opposite to', 'Context and background provide the essential framework', 'Plot is the structured sequence of events in a narrative, organized through', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, return to **c12_eng_f_cbse_08_008 (Imagery and Metaphor)** and re-do the exercise "Find 3.',
                  misconception: '**Misconception:** "Irony in literature is just when something funny or unexpected happens." **Why it\'s wrong:** Students often equate.' }
          ],
            remediations: { 'misconception-irony-in-literature-is': { steps: ['**Revisit node c12_eng_f_cbse_08_008 (Imagery and Metaphor)** to clarify the distinction between metaphor (explicit.', 'Do the exercise: "List 5 objects in the story.', 'For each, write: Literal function → Emotional association → Thematic meaning." 2.', '**Re-read the canal scene (paragraphs starting "After dark she walked by the canal...")** with a highlighter.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of inferring the meaning of unfamiliar words.',
          hint: 'If stuck on clue types, review c11_eng_h_cbse_01_010 "Vocabulary in Context: Key Words".',
          misconception: 'Students believe "vocabulary in context" means *guessing* the meaning from a vague feeling.',
          parts: [
                { id: 'a', prompt: 'Compare the two uses of *chuffed* in the chapter: 1. Jansie: "I\'d have thought he\'d be chuffed as anything." 2.', answer: 'Jansie uses *chuffed* (colloquial, working-class British slang)',
                  options: ['Jansie uses *chuffed* (colloquial, working-class British slang)', 'vocabulary in context', '"vocabulary in context" means *guessing* the meaning from a vague feeling'],
                  hint: 'If stuck on clue types, review c11_eng_h_cbse_01_010 "Vocabulary in Context: Key Words".',
                  misconception: 'Students believe "vocabulary in context" means *guessing* the meaning from a vague feeling.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot distinguish literal vs.', 'metaphorical meaning or misses register: 1.', '**Revisit c11_eng_h_cbse_01_010 (Vocabulary in Context: Key Words)** — re-do the "metaphorical expressions" exercise.', '**Re-read the "Working with Words" section of Going Places** (NCERT p.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_011', difficulty: 'standard',
          question: 'Present participles (verb+ing forms) used without auxiliary verbs to indicate.',
          hint: 'If stuck on participle identification, review "finite vs non-finite verbs" from Class 11.',
          misconception: 'Students believe ANY -ing word in the text is a "present participle for simultaneity".',
          parts: [
                { id: 'a', prompt: 'Identify the present participle phrase showing simultaneity in this sentence from the text: "Jansie, linking arms with her along the street, looked doubtful.".', answer: 'The present participle phrase is "linking arms with her along the street"',
                  options: ['The present participle phrase is "linking arms with her along the street"', 'looked', 'present participle for simultaneity', 'ANY -ing word in the text is a "present participle for simultaneity"'],
                  hint: 'If stuck on participle identification, review "finite vs non-finite verbs" from Class 11 grammar.',
                  misconception: 'Students believe ANY -ing word in the text is a "present participle for simultaneity".' },
                { id: 'b', prompt: 'Analyze the metaphorical expression "Words had to be prized out of him like stones out of the ground." Identify the two domains being compared and explain how.', answer: 'Domains: (1) extracting words from Geoff → (2) quarrying stones from earth',
                  options: ['Domains: (1) extracting words from Geoff → (2) quarrying stones from earth', 'prized', 'present participle for simultaneity', 'ANY -ing word in the text is a "present participle for simultaneity"'],
                  hint: 'If stuck on participle identification, review "finite vs non-finite verbs" from Class 11 grammar.',
                  misconception: 'Students believe ANY -ing word in the text is a "present participle for simultaneity".' }
          ],
            remediations: { 'any-ing-word-in-the': { steps: ['Revisit c11_eng_h_cbse_01_011 (Class 11 Grammar: Language Usage) — review participle vs gerund vs continuous tense with.', 'Take 5 sentences from "Going Places"; for each -ing word, apply the "while/as" test: if "while [subject] [verb]" fits.', 'Create a "Metaphor Map" for the text: list each metaphorical expression, its source domain, target domain, and effect.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_08_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck on inference, re-read the "Understanding the text" questions in NCERT (p.',
          misconception: 'Students believe "inferential" means "guessing" — so they write vague opinions ("Sophie is sad because she\'s poor").',
          parts: [
                { id: 'a', prompt: 'Classify this question from "Going Places" as literal or inferential: "Which country did Danny Casey play for?" Explain your reasoning using the text.', answer: 'Literal',
                  options: ['Literal', 'inferential', 'guessing', 'Sophie is sad because she\'s poor'],
                  hint: 'If stuck on inference, re-read the "Understanding the text" questions in NCERT (p.',
                  misconception: 'Students believe "inferential" means "guessing" — so they write vague opinions ("Sophie is sad because she\'s poor") without textual proof.' },
                { id: 'b', prompt: 'Answer this inferential question using the PEEL structure (Point, Evidence, Explanation, Link): "Why didn\'t Sophie want Jansie to know about her story with.', answer: 'Point: Sophie feared Jansie would spread her secret',
                  options: ['Point: Sophie feared Jansie would spread her secret', 'Explanation', 'inferential', 'guessing'],
                  hint: 'If stuck on inference, re-read the "Understanding the text" questions in NCERT (p.',
                  misconception: 'Students believe "inferential" means "guessing" — so they write vague opinions ("Sophie is sad because she\'s poor") without textual proof.' },
                { id: 'c', prompt: 'Analyze: The NCERT asks: "Did Sophie really meet Danny Casey?" Compare a literal-only answer vs an inferential answer. Which earns full marks and why?', answer: 'Literal-only: "No, she only imagined it." → 1/2 marks (incomplete)',
                  options: ['Literal-only: "No, she only imagined it." → 1/2 marks (incomplete)', 'inferential', 'guessing', 'Sophie is sad because she\'s poor'],
                  hint: 'If stuck on inference, re-read the "Understanding the text" questions in NCERT (p.',
                  misconception: 'Students believe "inferential" means "guessing" — so they write vague opinions ("Sophie is sad because she\'s poor") without textual proof.' }
          ],
            remediations: { 'inferential-means-guessing-so-they': { steps: ['Take NCERT Q1 (literal) and Q3 (inferential) from "Understanding the text".', 'Highlight words in Q1 answered by one sentence ("class-mates and friends").', 'For Q3, list 3 clues: Geoff\'s silence, motorcycle, unknown world.', 'Practice converting 5 literal questions from previous chapters (Class 11 Hornbill c11_eng_h_cbse_01_012) into.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
