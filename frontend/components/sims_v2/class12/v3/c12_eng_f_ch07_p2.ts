import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_f_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_f_ch07_p2: SimDef = {
    id: 'v3_c12_eng_f_ch07_p2',
    title: 'The Interview · Part 2/3',
    subtitle: 'A crime to some, a service to others — the genre that asks for a soul',
    classLevel: 12, subject: 'eng_f', topic: 'The Interview · Part 2/3',
    chapters: ['c12_eng_f_ch07'],
    nodeIds: ['c12_eng_f_cbse_07_007', 'c12_eng_f_cbse_07_008', 'c12_eng_f_cbse_07_009', 'c12_eng_f_cbse_07_010', 'c12_eng_f_cbse_07_011', 'c12_eng_f_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Literary journalist', intro: 'Every press conference hides a power struggle: who owns the truth — the questioner or the answered? This chapter puts the interview itself on trial.', goal: 'Evaluate the interview as a genre — its intrusions and its service — through celebrity objections and Umberto Eco\'s self-portrait.' },
    discovery: {
        question: 'Kipling called the interview \'immoral, a crime, vile\' — then interviewed Mark Twain himself. What does that contradiction expose about the genre?',
        options: ['The power asymmetry — celebrities condemn intrusion as subjects yet wield the interviewer\'s power when they need it', 'Nothing — people change their minds', 'Kipling was just joking', 'Interviews were illegal then'],
        answer: 'The power asymmetry — celebrities condemn intrusion as subjects yet wield the interviewer\'s power when they need it',
        hook: 'The interview is both \'supremely serviceable\' and an \'ordeal\' — Carroll feared being lionised, Kipling called it assault, yet the same medium lets Eco unpack semiotics on a Sunday. It\'s a genre with two faces, and this chapter is a commentary on the genre itself.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, complementary ideas that run alongside the primary theme in a text, enriching its meaning by exploring related but distinct dimensions of human experience.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_f_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dissect the interview as a form: weigh 130 years of celebrity objections against Denis Brian\'s defence, then run Eco\'s \'interstices\' over your own day — and script an interview with signallers that actually flows.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a celebrity interview on YouTube — the host asks about their new movie, but the star keeps steering the conversation toward their.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in a literary text, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a complementary idea that runs parallel to the primary theme,', outcome: 'A secondary theme is a complementary idea that runs parallel to the primary theme, exploring.' },
                { text: 'secondary theme means a less important theme', outcome: 'Not quite — Students often confuse secondary themes with "minor points" or "subplots," treating them as less.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'minor points', outcome: 'Not quite — Students often confuse secondary themes with "minor points" or "subplots," treating them as less.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re watching a celebrity interview on TV — the star leans back, sighs, and says, "This process feels like thumbprints on my windpipe." You instantly.',
            decisions: [{ prompt: 'Identify the metaphor in the phrase "thumbprints on his windpipe" (used by Saul Bellow) and state the two things being compared.', options: [
                { text: 'The metaphor compares the experience of being interviewed to **thumbprints pressing on a', outcome: 'The metaphor compares the experience of being interviewed to **thumbprints pressing on.' },
                { text: 'it means interviews are annoying', outcome: 'Not quite — Students routinely **confuse metaphor with simile** and **limit imagery to visual description**.', reveals: 'students-routinely-confuse-metaphor-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re watching a celebrity on a talk show who says, "I hate interviews, they steal my soul," while simultaneously promoting their new movie *through*.',
            decisions: [{ prompt: 'Define verbal irony and give one example from Part I of "The Interview" where a celebrity\'s words contradict their actions.', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean or believe, often', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean or believe, often.' },
                { text: 'immoral', outcome: 'Not quite — Students often confuse **irony with coincidence or bad luck**.', reveals: 'students-often-confuse-irony-with' },
                { text: 'a crime', outcome: 'Not quite — Students often confuse **irony with coincidence or bad luck**.', reveals: 'students-often-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading the Eco interview and hit the sentence: "I work in empty spaces. I call them interstices." You don\'t know *interstices*.',
            decisions: [{ prompt: 'What is the meaning of "commonplace" as used in the opening sentence: "Since its invention a little over 130 years ago, the interview has.', options: [
                { text: 'Correct answer: "Commonplace" here means *a usual or ordinary thing', outcome: 'Correct answer: "Commonplace" here means *a usual or ordinary thing; something that happens.' },
                { text: 'a common place/location', outcome: 'Not quite — Students often think "vocabulary in context" means *guessing* the meaning from a vague feeling.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'a habitual practice', outcome: 'Not quite — Students often think "vocabulary in context" means *guessing* the meaning from a vague feeling.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re listening to a podcast interview with your favourite scientist.',
            decisions: [{ prompt: 'Identify the linker in the following exchange from the text and name its type: Mukund: "Over 40!', options: [
                { text: 'Correct answer: Lexical repetition (exact repetition of the noun phrase "Over 40")', outcome: 'Correct answer: Lexical repetition (exact repetition of the noun phrase "Over 40").' },
                { text: 'reference pronoun', outcome: 'Not quite — Students treat **linkers** and **signallers** as synonyms for "conjunctions" (and, but, because).', reveals: 'students-treat-linkers-and-signallers' },
                { text: 'conjunction', outcome: 'Not quite — Students treat **linkers** and **signallers** as synonyms for "conjunctions" (and, but, because).', reveals: 'students-treat-linkers-and-signallers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re watching a press conference where a celebrity gives vague answers — you must separate what they actually said from what they hinted at.',
            decisions: [{ prompt: 'What is the key difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "How many', outcome: 'A literal question asks for information directly stated in the text (e.g., "How many novels has Eco.' },
                { text: 'questions about the text', outcome: 'Not quite — Students treat "inferential" as "guessing" and write personal opinions without textual evidence.', reveals: 'students-treat-inferential-as-guessing' },
                { text: 'Eco is arrogant', outcome: 'Not quite — Students treat "inferential" as "guessing" and write personal opinions without textual evidence.', reveals: 'students-treat-inferential-as-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school magazine you must interview a survivor of a public tragedy. A classmate urges you to \'ambush him at home — raw emotion makes the best copy\'.',
            decisions: [{ prompt: 'Ambush or arrange?', options: [
                { text: 'Arrange it with consent and boundaries — \'The Interview\' frames the genre as both a source of truth and a potential intrusion; ethical interviewing gets better answers and doesn\'t prey on pain.', outcome: 'Kipling called interviewing a crime; the craft\'s defence is consent — you can honour the reader and the subject at once.' },
                { text: 'Ambush — public interest justifies catching him off guard.', outcome: 'Surprise buys spectacle, not truth; the chapter\'s whole debate warns that intrusion deforms what it captures.', reveals: 'ends-justify-ambush' },
                { text: 'Cancel it — interviews are inherently invasive, so never do one.', outcome: 'Silvester also calls the interview \'supremely serviceable\' — the flaw is in the method, not the genre.', reveals: 'interviews-are-intrusion' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_f_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue both sides of the microphone — intrusion vs illumination — and steal Eco\'s trick of working inside life\'s empty spaces.',
            decisions: [{ prompt: 'What comes next? The Interview · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Interview · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, complementary ideas that run alongside the.',
          hint: 'If stuck, return to the two-column table exercise in ON_FAILURE: abstract concepts.',
          misconception: 'Students often confuse secondary themes with "minor points" or "subplots," treating them as less important details.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "interstices" (as Eco defines it) to explain how a secondary theme operates in Part II of the chapter.', answer: 'Eco defines interstices as "empty spaces in our lives"',
                  options: ['Eco defines interstices as "empty spaces in our lives"', 'minor points', 'subplots'],
                  hint: 'If stuck, return to the two-column table exercise in ON_FAILURE: abstract concepts (Column A) from.',
                  misconception: 'Students often confuse secondary themes with "minor points" or "subplots," treating them as less important details rather than distinct.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish secondary themes from evidence: (1) Have them re-read Part I and Part II with.', '(2) Model the process: "Eco\'s elevator story → Column A: \'Productive use of interstices\' | Column B: \'While waiting for.', 'I have already written an article!\'" (3) Ask them to generate three Column A entries from Part I (e.g., "Intrusion.', '(4) Re-diagnose using Diagnostic Question 6 — they must now produce a Column A concept with cross-part Column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse secondary themes with "minor points" or "subplots," treating them as less important details.',
          parts: [
                { id: 'a', prompt: 'Create a 4-5 sentence paragraph that identifies a secondary theme in "The Interview" not yet discussed, traces it across both parts, and explains its.', answer: 'A strong answer might identify "the ethics of intrusion"',
                  options: ['A strong answer might identify "the ethics of intrusion"', 'minor points', 'subplots'],
                  hint: 'If stuck, return to the two-column table exercise in ON_FAILURE: abstract concepts (Column A) from.',
                  misconception: 'Students often confuse secondary themes with "minor points" or "subplots," treating them as less important details rather than distinct.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If the student cannot distinguish secondary themes from evidence: (1) Have them re-read Part I and Part II with.', '(2) Model the process: "Eco\'s elevator story → Column A: \'Productive use of interstices\' | Column B: \'While waiting for.', 'I have already written an article!\'" (3) Ask them to generate three Column A entries from Part I (e.g., "Intrusion.', '(4) Re-diagnose using Diagnostic Question 6 — they must now produce a Column A concept with cross-part Column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If unable to separate tenor from vehicle, practice on 5 simple metaphors from daily.',
          misconception: 'Students routinely **confuse metaphor with simile** and **limit imagery to visual description**.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the imagery in "stealing that person\'s soul" (primitive cultures\' belief about photography) functions differently from a simple.', answer: 'The imagery **embodies the abstraction**',
                  options: ['The imagery **embodies the abstraction**', 'it means they think photos take your soul'],
                  hint: 'If unable to separate tenor from vehicle, practice on 5 simple metaphors from daily speech (e.g.',
                  misconception: 'Students routinely **confuse metaphor with simile** and **limit imagery to visual description**.' }
          ],
            remediations: { 'students-routinely-confuse-metaphor-with': { steps: ['**Revisit tenor/vehicle mapping**: Take three metaphors from the text (e.g., "interstices," "thumbprints on windpipe,".', 'For each, draw a two-column table: LEFT = Tenor (abstract concept), RIGHT = Vehicle (concrete image).', 'Write the *shared quality* in the middle.', '**Sense-audit imagery**: List every image in Part I.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck on irony types, review the "Kipling vs. Twain" and "Eco: professor vs.',
          misconception: 'Students often confuse **irony with coincidence or bad luck**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or events contrasts',
                  options: ['Irony is a literary device where the intended meaning of words or events contrasts', 'The "Before You Read: Context and Background" section for "The Interview" provides the', 'Narrative structure in non-fiction refers to the organizational framework that arranges', 'In non-fiction texts like "The Interview," **setting** refers to the contextual framework'],
                  hint: 'If stuck on irony types, review the "Kipling vs. Twain" and "Eco: professor vs.',
                  misconception: 'Students often confuse **irony with coincidence or bad luck**.' }
          ],
            remediations: { 'students-often-confuse-irony-with': { steps: ['**Revisit node c11_eng_h_cbse_01_009 (Class 11 Irony and Symbolism)** — specifically the worked examples distinguishing.', '**Re-read Part I of "The Interview"** with a two-column table: Column A = Celebrity\'s *stated view*; Column B = Their.', '**Re-read Part II** and underline every occurrence of "interstice," "empty space," "waiting," "elevator," "fist,".', '**Re-diagnostic**: Attempt DIAGNOSTIC_QUESTION_3 again, now requiring the answer to use the phrase "extended metaphor".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_010', difficulty: 'standard',
          question: 'Vocabulary in Context is the skill of determining the meaning of unfamiliar.',
          hint: 'If stuck on identifying clue types, review c11_eng_h_cbse_01_010 (Class 11 Vocabulary.',
          misconception: 'Students often think "vocabulary in context" means *guessing* the meaning from a vague feeling.',
          parts: [
                { id: 'a', prompt: 'What is the meaning of "commonplace" as used in the opening sentence: "Since its invention a little over 130 years ago, the interview has become a commonplace.', answer: 'Correct answer: "Commonplace" here means *a usual or ordinary thing',
                  options: ['Correct answer: "Commonplace" here means *a usual or ordinary thing', 'a common place/location', 'a habitual practice', 'vocabulary in context'],
                  hint: 'If stuck on identifying clue types, review c11_eng_h_cbse_01_010 (Class 11 Vocabulary in Context).',
                  misconception: 'Students often think "vocabulary in context" means *guessing* the meaning from a vague feeling.' },
                { id: 'b', prompt: 'In the phrase "extravagant claims for it as being, in its highest form, a source of truth," what does "extravagant" imply about the claims?', answer: 'Correct answer: (b) excessive/exaggerated',
                  options: ['Correct answer: (b) excessive/exaggerated', 'vocabulary in context', '"vocabulary in context" means *guessing* the meaning from a vague feeling'],
                  hint: 'If stuck on identifying clue types, review c11_eng_h_cbse_01_010 (Class 11 Vocabulary in Context).',
                  misconception: 'Students often think "vocabulary in context" means *guessing* the meaning from a vague feeling.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Re-read the Eco interview segment (Part II) and highlight every word Eco *explains* (interstices, semiotics, narrative.', 'Note the phrases: "I call them...", "which is...", "this is why...".', 'Make a 3-column table: Word | Context Clue Strategy (Definition/Contrast/Example/Inference) | Inferred Meaning.', 'Check dictionary *only after* filling the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_011', difficulty: 'standard',
          question: 'Discourse linkers are cohesive devices (reference pronouns like.',
          hint: 'If stuck, review Class 10 English Grammar: "Cohesive Devices" chapter (reference.',
          misconception: 'Students treat **linkers** and **signallers** as synonyms for "conjunctions" (and, but, because).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Discourse linkers are cohesive devices (reference pronouns like \'this/that/which\',',
                  options: ['Discourse linkers are cohesive devices (reference pronouns like \'this/that/which\',', 'The "Before You Read: Context and Background" section for "The Interview" provides the', 'Narrative structure in non-fiction refers to the organizational framework that arranges', 'In non-fiction texts like "The Interview," **setting** refers to the contextual framework'],
                  hint: 'If stuck, review Class 10 English Grammar: "Cohesive Devices" chapter (reference pronouns.',
                  misconception: 'Students treat **linkers** and **signallers** as synonyms for "conjunctions" (and, but, because).' }
          ],
            remediations: { 'students-treat-linkers-and-signallers': { steps: ['Revisit **c12_eng_f_cbse_07_010** (Vocabulary in Context) to strengthen recognition of repeated lexical items across.', 'Take the Eco interview transcript (NCERT pp.', 'Highlight every reference pronoun (this/that/which/it) in **yellow**, every lexical repetition in **green**, every.', 'For each highlighted item, write a one-sentence marginal note: "Links to previous mention of X" or "Signals shift from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_f_cbse_07_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck, review "reported speech vs. direct speech" in c12_eng_f_cbse_07_011 and.',
          misconception: 'Students treat "inferential" as "guessing" and write personal opinions without textual evidence.',
          parts: [
                { id: 'a', prompt: 'In Part I, the text states: "V. S. Naipaul \'feels that some people are wounded by interviews and lose a part of themselves.\'" Is this a literal or inferential.', answer: 'This is a literal statement',
                  options: ['This is a literal statement', 'Eco is arrogant', 'Eco values academic identity over literary fame'],
                  hint: 'If stuck, review "reported speech vs. direct speech" in c12_eng_f_cbse_07_011 and metaphor.',
                  misconception: 'Students treat "inferential" as "guessing" and write personal opinions without textual evidence.' }
          ],
            remediations: { 'students-treat-inferential-as-guessing': { steps: ['Revisit c12_eng_f_cbse_07_010 (Vocabulary) to clarify words like "interstices," "depersonalised," "seminal" that carry.', 'Practice with c11_eng_h_cbse_01_012 (Class 11 Comprehension) literal/inferential drills.', 'Do a re-diagnostic: take any paragraph from Part II, write 2 literal and 2 inferential questions, and self-check using.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
