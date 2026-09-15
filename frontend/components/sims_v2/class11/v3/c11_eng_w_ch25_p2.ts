import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch25_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch25_p2: SimDef = {
    id: 'v3_c11_eng_w_ch25_p2',
    title: 'The Story (Essay) · Part 2/3',
    subtitle: 'Separate story\'s \'and then\' from plot\'s \'why\' — Forster\'s sharpest knife.',
    classLevel: 11, subject: 'eng_w', topic: 'The Story (Essay) · Part 2/3',
    chapters: ['c11_eng_w_ch25'],
    nodeIds: ['c11_eng_w_cbse_25_007', 'c11_eng_w_cbse_25_008', 'c11_eng_w_cbse_25_009', 'c11_eng_w_cbse_25_010', 'c11_eng_w_cbse_25_011', 'c11_eng_w_cbse_25_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a critic auditing what a novel cannot live without', intro: 'A lecture hall, 1927: a novelist insists the humble story — crude, chronological, ancient — is the backbone no novel escapes.', goal: 'Apply the story-plot distinction and evaluate time as the novel\'s inescapable fabric.' },
    discovery: {
        question: '\'The king died and then the queen died\' versus \'The king died and then the queen died of grief.\' Forster says only one is a plot — which?',
        options: ['The second — it adds causality; the first is merely a story, a tapeworm of time', 'The first — plot just means events in order', 'Both — plot and story are synonyms', 'Neither — both are only chronology'],
        answer: 'The second — it adds causality; the first is merely a story, a tapeworm of time',
        hook: 'A story only asks \'and then?\'; a plot makes you ask \'why?\' — the whole machinery of the novel hangs on that difference.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in Ruskin\'s "What is a Good Book?" are the subsidiary philosophical arguments that support the primary thesis (the distinction between "books of the hour" and "true books").', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_25_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split \'life in time\' from \'life by values\' in real sentences, then test Forster\'s claim that no novelist — not Sterne, not Proust — can deny time.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re standing in a massive library with limited time—you can only read ten books this year. Which ones do you choose?',
            decisions: [{ prompt: 'Define the term "secondary theme" in the context of a non-fiction argumentative essay like Ruskin\'s.', options: [
                { text: 'A secondary theme is a recurring subordinate idea that supports, illustrates, or', outcome: 'A secondary theme is a recurring subordinate idea that supports, illustrates, or complicates the.' },
                { text: 'a minor topic mentioned once', outcome: 'Not quite — Students conflate "secondary theme" with "minor detail" and list topics Ruskin *mentions* (e.g.', reveals: 'students-conflate-secondary-theme-with' },
                { text: 'secondary', outcome: 'Not quite — Students conflate "secondary theme" with "minor detail" and list topics Ruskin *mentions* (e.g.', reveals: 'students-conflate-secondary-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are mining for gold in the Australian outback: you don\'t just glance at the surface; you examine each rock, crush it, and smelt it to find the pure.',
            decisions: [{ prompt: 'What is the difference between a simile and a metaphor, and which one does Ruskin use when he writes "your pickaxes are your own care, wit.', options: [
                { text: 'A simile compares two things using "like" or "as"', outcome: 'A simile compares two things using "like" or "as"; a metaphor states one thing *is* another without.' },
                { text: 'the electric forces of the earth', outcome: 'Not quite — Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are.', reveals: 'students-often-treat-every-figurative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and see a post claiming "This 30-second video will teach you more than any book!" That claim is ironic because.',
            decisions: [{ prompt: 'Define verbal irony and give one example from Ruskin\'s essay where the literal meaning of a phrase contradicts its intended meaning.', options: [
                { text: 'Verbal irony occurs when a speaker says one thing but means the opposite, often to', outcome: 'Verbal irony occurs when a speaker says one thing but means the opposite, often to criticize.' },
                { text: 'bright accounts', outcome: 'Not quite — Students often confuse Ruskin\'s *verbal irony* (praising "books of the hour" to dismiss them) with.', reveals: 'students-often-confuse-ruskin-s' },
                { text: 'good-humoured', outcome: 'Not quite — Students often confuse Ruskin\'s *verbal irony* (praising "books of the hour" to dismiss them) with.', reveals: 'students-often-confuse-ruskin-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading Ruskin\'s essay and encounter "canaille" in the phrase "words of modern canaille." You might guess it means "common people" from the.',
            decisions: [{ prompt: 'In the phrase "words of modern canaille," what is the literal meaning of "canaille" and from which language does it originate?', options: [
                { text: '"Canaille" literally means "the common people" or "rabble" and originates from French', outcome: '"Canaille" literally means "the common people" or "rabble" and originates from French (from Old.' },
                { text: 'villains', outcome: 'Not quite — Students treat "vocabulary in context" as guessing meaning from surrounding sentences (a Class 6-8.', reveals: 'students-treat-vocabulary-in-context' },
                { text: 'enemies', outcome: 'Not quite — Students treat "vocabulary in context" as guessing meaning from surrounding sentences (a Class 6-8.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are listening to a TED Talk versus reading a textbook chapter — the speaker uses repetition, direct address, and dramatic pauses to keep you.',
            decisions: [{ prompt: 'What is the grammatical term for a sentence that begins with a coordinating conjunction like "And" or "But", and why is it traditionally.', options: [
                { text: 'The term is "initial conjunction" or "sentence-initial coordinator"', outcome: 'The term is "initial conjunction" or "sentence-initial coordinator".' },
                { text: 'It\'s always wrong', outcome: 'Not quite — Students believe starting a sentence with "And" or "But" is a grammatical error.', reveals: 'starting-a-sentence-with-and' },
                { text: 'starting a sentence with "And" or "But" is a grammatical error', outcome: 'Not quite — Students believe starting a sentence with "And" or "But" is a grammatical error.', reveals: 'starting-a-sentence-with-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in your Class 11 English exam and see a question: "According to Ruskin, why are books of the hour not true books?" You need to know.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal comprehension question asks for information directly stated in the text, while', outcome: 'A literal comprehension question asks for information directly stated in the text, while.' },
                { text: 'literal questions are easy, inferential are hard', outcome: 'Not quite — Students often believe that any question answered from the text is literal, and any question.', reveals: 'any-question-answered-from-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your reading club is debating a \'one book per month\' rule where members pick whatever is trending online. You invoke Ruskin\'s \'What is a Good Book?\' A member fires back: \'That Victorian essay is just a loose rant — old books good, newspapers bad, then something about gold mining and spelling.\'',
            decisions: [{ prompt: 'How do you show the essay is a tight argument, not a rant?', options: [
                { text: 'Walk them through the architecture: Distinction (books of the hour vs books of all time) → Definition of a true book → Urgency → the mining analogy (you must dig and smelt for the author\'s meaning as for gold) → Prescription (read letter by letter). Each move necessitates the next. And Ruskin\'s context explains the values: a critic of industrial capitalism prized permanence over multiplication, labour over conveyance.', outcome: 'The \'rant\' resolves into engineering: distinction creates the category, analogy explains the process, prescription hands over the tool — the club sees why \'trending\' is exactly Ruskin\'s \'book of the hour\'.' },
                { text: 'Concede the structure point but keep the conclusion — Ruskin liked old books, so just pick classics.', outcome: 'Keeping the conclusion while denying the argument misses his actual demand: not oldness but the disciplined, letter-by-letter labour a true book requires of its reader.', reveals: 'ruskin-just-means-old-books' },
                { text: 'Agree it\'s loose — Victorian prose is famously rambling, so mine it for a few quotes instead.', outcome: 'The sentence complexity hides the moves, it doesn\'t erase them; treating it as a quote-bag skips the argumentative arc that carries the reader from premise to conviction.', reveals: 'victorian-prose-is-formless' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_25_012', title: 'The bigger picture',
          caseStudy: { intro: 'Writers can hide the clock, flip it, or alter its hands — but the reader keeps rebuilding the time-line, which is exactly Forster\'s point.',
            decisions: [{ prompt: 'What comes next? The Story (Essay) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Story (Essay) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_007', difficulty: 'standard',
          question: 'Secondary themes in Ruskin\'s "What is a Good Book?" are the subsidiary.',
          hint: 'Review c11_eng_w_cbse_25_006\'s worked example on distinguishing "books of the hour".',
          misconception: 'Students conflate "secondary theme" with "minor detail" and list topics Ruskin *mentions* (e.g., "the House.',
          parts: [
                { id: 'a', prompt: 'Define the term "secondary theme" in the context of a non-fiction argumentative essay like Ruskin\'s.', answer: 'A secondary theme is a recurring subordinate idea that supports, illustrates, or',
                  options: ['A secondary theme is a recurring subordinate idea that supports, illustrates, or', 'a minor topic mentioned once', 'secondary', 'incidental'],
                  hint: 'Review c11_eng_w_cbse_25_006\'s worked example on distinguishing "books of the hour" (multiplication.',
                  misconception: 'Students conflate "secondary theme" with "minor detail" and list topics Ruskin *mentions* (e.g., "the House of Commons," "Australian.' }
          ],
            remediations: { 'students-conflate-secondary-theme-with': { steps: ['Have the student create a two-column table: Column A = "Illustration/Example in Text" (miner, House of Commons.', 'Ask: "If you removed the miner analogy, which *argument* about reading would collapse?" (Answer: that true reading.', 'Practice converting three illustrations into their abstract thematic claims until the student sees examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the "Metaphor and Imagery" node from Class 8 (c8_engl_ch4_7) and practice the.',
          misconception: 'Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are *analogies* (explicitly.',
          parts: [
                { id: 'a', prompt: 'What is the difference between a simile and a metaphor, and which one does Ruskin use when he writes "your pickaxes are your own care, wit and learning"?', answer: 'A simile compares two things using "like" or "as"',
                  options: ['A simile compares two things using "like" or "as"', 'the electric forces of the earth'],
                  hint: 'Review the "Metaphor and Imagery" node from Class 8 (c8_engl_ch4_7) and practice the.',
                  misconception: 'Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are *analogies* (explicitly signaled.' },
                { id: 'b', prompt: 'Apply the concept of extended metaphor to the mining passage (paragraphs 5–7). List the tenors and vehicles for at least three elements of the comparison.', answer: 'Tenor → Vehicle: (1) Author\'s meaning → gold',
                  options: ['Tenor → Vehicle: (1) Author\'s meaning → gold', 'gold = meaning', 'the electric forces of the earth'],
                  hint: 'Review the "Metaphor and Imagery" node from Class 8 (c8_engl_ch4_7) and practice the.',
                  misconception: 'Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are *analogies* (explicitly signaled.' }
          ],
            remediations: { 'students-often-treat-every-figurative': { steps: ['Have the student reread paragraphs 5–7 and highlight only words that trigger a physical sensation (touch, temperature.', 'Ask them to complete a two‑column table: Column A = concrete sensory word; Column B = sense activated.', 'Then, for each metaphor, fill a three‑row template: Tenor | Vehicle | Quality Transferred.', 'Finally, ask them to explain why "electric forces" is *not* imagery.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are *analogies* (explicitly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of Ruskin\'s metaphor of the "court of the Dead" versus the mining metaphor for conveying his idea of literary excellence.', answer: 'The mining metaphor is more persuasive for the *process* of reading',
                  options: ['The mining metaphor is more persuasive for the *process* of reading', 'the electric forces of the earth'],
                  hint: 'Review the "Metaphor and Imagery" node from Class 8 (c8_engl_ch4_7) and practice the.',
                  misconception: 'Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are *analogies* (explicitly signaled.' },
                { id: 'b', prompt: 'Create a new metaphor (not a simile) that captures the relationship between a reader and a difficult classic text, and explain the tenor, vehicle, and two.', answer: 'Example: "A classic text is a mountain',
                  options: ['Example: "A classic text is a mountain', 'the electric forces of the earth'],
                  hint: 'Review the "Metaphor and Imagery" node from Class 8 (c8_engl_ch4_7) and practice the.',
                  misconception: 'Students often treat every figurative comparison in Ruskin as a metaphor, missing that some are *analogies* (explicitly signaled.' }
          ],
            remediations: { 'students-often-treat-every-figurative': { steps: ['Have the student reread paragraphs 5–7 and highlight only words that trigger a physical sensation (touch, temperature.', 'Ask them to complete a two‑column table: Column A = concrete sensory word; Column B = sense activated.', 'Then, for each metaphor, fill a three‑row template: Tenor | Vehicle | Quality Transferred.', 'Finally, ask them to explain why "electric forces" is *not* imagery.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_009', difficulty: 'standard',
          question: 'Irony in Ruskin\'s essay is the rhetorical contrast between what is explicitly.',
          hint: 'If stuck, review the "peerage of words" passage (para 5) and the mining passage (para 6).',
          misconception: 'Students often confuse Ruskin\'s *verbal irony* (praising "books of the hour" to dismiss them) with *sarcasm* (mocking.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of situational irony to this scenario: Ruskin praises the "multiplication" of the author\'s voice through print, yet argues the printed volume.', answer: 'Situational irony arises',
                  options: ['Situational irony arises', 'it\'s ironic that he likes print', 'books of the hour'],
                  hint: 'If stuck, review the "peerage of words" passage (para 5) and the mining passage (para 6).',
                  misconception: 'Students often confuse Ruskin\'s *verbal irony* (praising "books of the hour" to dismiss them) with *sarcasm* (mocking tone), and they treat.' },
                { id: 'b', prompt: 'Analyze how the extended mining metaphor (pickaxes, shovels, smelting furnace, gold in fissures) functions as a symbol system.', answer: 'The mining metaphor is a coherent symbol system: the author\'s meaning = gold',
                  options: ['The mining metaphor is a coherent symbol system: the author\'s meaning = gold', 'mining shows reading is hard', 'books of the hour'],
                  hint: 'If stuck, review the "peerage of words" passage (para 5) and the mining passage (para 6).',
                  misconception: 'Students often confuse Ruskin\'s *verbal irony* (praising "books of the hour" to dismiss them) with *sarcasm* (mocking tone), and they treat.' }
          ],
            remediations: { 'students-often-confuse-ruskin-s': { steps: ['If a student conflates irony with sarcasm, have them compare the tone of Lencho\'s second letter (sarcastic: "Only 70.', 'If they reduce symbols to metaphors, ask them to draw the mining metaphor as a flowchart: Input (words/rock) → Tools.', 'Then ask: "Which part is a metaphor?', 'Which part is a symbol system?" This visual breakdown forces the distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, re-read the paragraph beginning "A well-educated gentleman may not know many.',
          misconception: 'Students treat "vocabulary in context" as guessing meaning from surrounding sentences (a Class 6-8 skill).',
          parts: [
                { id: 'a', prompt: 'Apply the "syllable by syllable — nay, letter by letter" method to the word "inscription" in the sentence: "That his \'writing\', it is, in his small human.', answer: 'Step 1: Identify root *script* (Latin *scribere* "to write")',
                  options: ['Step 1: Identify root *script* (Latin *scribere* "to write")', 'writing on stone'],
                  hint: 'If stuck, re-read the paragraph beginning "A well-educated gentleman may not know many.',
                  misconception: 'Students treat "vocabulary in context" as guessing meaning from surrounding sentences (a Class 6-8 skill).' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['Have the student list the four highlighted words and write their dictionary etymologies (Oxford/Lexico).', 'For each, find the exact sentence in the text and annotate: grammatical role, metaphorical extension, contrast pair.', 'Practice the "syllable by syllable" method on "equivocally" (*equi* + *voc* + *al* + *ly*) and "reticence" (*reticere*.', 'Rewrite one paragraph of the essay replacing each target word with a "modern canaille" synonym; discuss what precision.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of an author\'s.',
          hint: 'Review sentence structure (simple, compound, complex) and conjunctions from Class 10.',
          misconception: 'Students believe starting a sentence with "And" or "But" is a grammatical error.',
          parts: [
                { id: 'a', prompt: 'What is the grammatical term for a sentence that begins with a coordinating conjunction like "And" or "But", and why is it traditionally discouraged in formal.', answer: 'The term is "initial conjunction" or "sentence-initial coordinator"',
                  options: ['The term is "initial conjunction" or "sentence-initial coordinator"', 'It\'s always wrong', 'starting a sentence with "And" or "But" is a grammatical error'],
                  hint: 'Review sentence structure (simple, compound, complex) and conjunctions from Class 10 grammar.',
                  misconception: 'Students believe starting a sentence with "And" or "But" is a grammatical error.' },
                { id: 'b', prompt: 'Analyze how the extended mining metaphor (gold, fissures, pickaxes, smelting furnace) in paragraphs 10–12 interacts with the shift from descriptive.', answer: 'The metaphor frames reading as physical labor',
                  options: ['The metaphor frames reading as physical labor', 'starting a sentence with "And" or "But" is a grammatical error'],
                  hint: 'Review sentence structure (simple, compound, complex) and conjunctions from Class 10 grammar.',
                  misconception: 'Students believe starting a sentence with "And" or "But" is a grammatical error.' }
          ],
            remediations: { 'starting-a-sentence-with-and': { steps: ['Show the student the opening of Lincoln\'s Gettysburg Address ("Four score...', 'And so...") and Churchill\'s speeches — both use initial "And" for gravity and flow.', 'Have them rewrite a paragraph of Ruskin replacing every initial "And" with "Furthermore" or "Also", then read both.', 'Ask: "What does the \'And\' do that \'Furthermore\' doesn\'t?" Guide them to notice the lighter, faster, more urgent rhythm.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_25_012', difficulty: 'standard',
          question: 'Literal comprehension questions require retrieving explicitly stated.',
          hint: 'Review the annotation strategies from c11_eng_w_cbse_25_002 (Text: Plot and Narrative.',
          misconception: 'Students often believe that any question answered from the text is literal, and any question requiring an opinion.',
          parts: [
                { id: 'a', prompt: 'Compare the cognitive demands of answering Question 1 ("What, according to Ruskin, are the limitations of the good book of the hour?") and Question 3 ("Why.', answer: 'Question 3 requires more inference',
                  options: ['Question 3 requires more inference', 'says both are literal shows inability to recognize synthesis across paragraphs'],
                  hint: 'Review the annotation strategies from c11_eng_w_cbse_25_002 (Text: Plot and Narrative Structure).',
                  misconception: 'Students often believe that any question answered from the text is literal, and any question requiring an opinion is inferential.' }
          ],
            remediations: { 'any-question-answered-from-the': { steps: ['If a student cannot distinguish literal from inferential, have them take a short passage and label each sentence.', 'Walk through the difference: literal = direct match; inferential = combine clues.', 'Practice with NCERT questions 1 and 3 from the text.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
