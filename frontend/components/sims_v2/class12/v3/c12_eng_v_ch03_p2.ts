import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch03_p2: SimDef = {
    id: 'v3_c12_eng_v_ch03_p2',
    title: 'Journey to the End of the Earth · Part 2/3',
    subtitle: 'Humanity arrived in the last seconds — and changed the climate anyway',
    classLevel: 12, subject: 'eng_v', topic: 'Journey to the End of the Earth · Part 2/3',
    chapters: ['c12_eng_v_ch03'],
    nodeIds: ['c12_eng_v_cbse_03_007', 'c12_eng_v_cbse_03_008', 'c12_eng_v_cbse_03_009', 'c12_eng_v_cbse_03_010', 'c12_eng_v_cbse_03_011', 'c12_eng_v_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Environmental essayist', intro: 'A ship of schoolchildren heads to the frozen archive where Earth keeps its past — and its prognosis.', goal: 'Read Antarctica as planetary archive — Gondwana, ice cores and the case for intergenerational climate education.' },
    discovery: {
        question: 'On Earth\'s geological clock, all of human civilisation fits in the last seconds — yet \'for humans, the prognosis isn\'t good.\' How can a blink of a species threaten a 500-million-year system?',
        options: ['Because we\'ve changed the atmosphere\'s boundary conditions faster than the planet can adapt — a CO₂ blanket rearranges climate the way continental drift once did', 'We can\'t — the claim is exaggerated', 'Industry is bigger than geology', 'Ice melts every summer anyway'],
        answer: 'Because we\'ve changed the atmosphere\'s boundary conditions faster than the planet can adapt — a CO₂ blanket rearranges climate the way continental drift once did',
        hook: 'This isn\'t a travelogue — it\'s a geological argument wearing a journey\'s clothes. Antarctica\'s ice cores hold half a million years of carbon records; Gondwana\'s breakup rearranged the climate once, and our emissions are rearranging it again — the same scale of forcing, at a thousand times the speed.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Journey to the End of the Earth\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Join Students on Ice at the bottom of the world: read the continent as archive — Gondwana\'s drift, the circumpolar current, the frozen carbon diary — and weigh why teenagers, not tourists, were taken there.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Journey to the End of the Earth\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'What is a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding', outcome: 'A secondary theme is a supporting idea that runs parallel to the primary theme, adding depth.' },
                { text: 'secondary theme means less important', outcome: 'Not quite — Students often list *topics* (e.g., "Gondwana," "Students on Ice," "phytoplankton") as themes.', reveals: 'students-often-list-topics-e' },
                { text: 'theme = topic', outcome: 'Not quite — Students often list *topics* (e.g., "Gondwana," "Students on Ice," "phytoplankton") as themes.', reveals: 'students-often-list-topics-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Journey to the End of the Earth\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'Define "metaphor" and distinguish it from "simile" using an example from *Journey to the End of the Earth*.', options: [
                { text: 'A metaphor directly equates two unlike things (A *is* B) to transfer qualities', outcome: 'A metaphor directly equates two unlike things (A *is* B) to transfer qualities; a simile compares.' },
                { text: 'giant ping-pong ball', outcome: 'Not quite — Students treat imagery and metaphor as **identification exercises** ("spot the device") rather than.', reveals: 'students-treat-imagery-and-metaphor' },
                { text: 'like/as', outcome: 'Not quite — Students treat imagery and metaphor as **identification exercises** ("spot the device") rather than.', reveals: 'students-treat-imagery-and-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Journey to the End of the Earth\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'Define "context clue" and name the four main types (with one example clue word/phrase for each type).', options: [
                { text: 'A context clue is a hint within the text that helps define an unfamiliar word', outcome: 'A context clue is a hint within the text that helps define an unfamiliar word.' },
                { text: 'in other words', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from the general topic" (e.g.', reveals: 'vocabulary-in-context-means-guess' },
                { text: 'also known as', outcome: 'Not quite — Students believe "vocabulary in context" means "guess the meaning from the general topic" (e.g.', reveals: 'vocabulary-in-context-means-guess' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Journey to the End of the Earth\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'Identify the tense and aspect of the verb phrase "had been travelling" in the sentence "By the time I actually set foot on the Antarctic.', options: [
                { text: 'Past perfect progressive (past perfect continuous)', outcome: 'Past perfect progressive (past perfect continuous). It establishes a duration of action.' },
                { text: 'past continuous', outcome: 'Not quite — Students treat "grammar in literature" as spotting parts of speech (e.g., "there are many.', reveals: 'students-treat-grammar-in-literature' },
                { text: 'past perfect', outcome: 'Not quite — Students treat "grammar in literature" as spotting parts of speech (e.g., "there are many.', reveals: 'students-treat-grammar-in-literature' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Journey to the End of the Earth\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Identify whether each question is literal (L) or inferential (I): (a) "Name the Russian research vessel the author travelled on." (b) "Why.', options: [
                { text: '(a) L — directly stated: "Akademik Shokalskiy"', outcome: '(a) L — directly stated: "Akademik Shokalskiy". (b) I — requires interpreting "prognosis".' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion." They write answers like.', reveals: 'inferential-means-guessing-or-giving' },
                { text: 'guessing', outcome: 'Not quite — Students believe "inferential" means "guessing" or "giving your opinion." They write answers like.', reveals: 'inferential-means-guessing-or-giving' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re back from an internship field visit to a shrinking wetland and must write it up. Your draft is a day-by-day diary: arrived, walked, sampled water, came home.',
            decisions: [{ prompt: 'How would the structure of \'Journey to the End of the Earth\' improve it?', options: [
                { text: 'Restructure it as an argument, not a diary — open with the sensory arrival, flash back to the wetland\'s deep history, lay out the human damage, describe the restoration effort, and end on one epiphanic moment of physically standing in the water.', outcome: 'Doshi makes structure the argument: the Gondwana timescale reframes the present, the Students on Ice section pivots from despair to agency, and the walk on the frozen ocean condenses the whole thesis into one moment.' },
                { text: 'Keep the diary — chronological order is the most honest record of what you actually did.', outcome: 'That produces the summary-level reading the chapter warns against: the geological flashback isn\'t \'background\', it\'s the device that makes the later data mean something; without it the visit is a list of events.', reveals: 'chronology-equals-honesty' },
                { text: 'Cut the personal parts and report only the data so it reads as objective science.', outcome: 'The text\'s first-person reflective voice is what anchors geological scale in human perception; stripping the \'I\' loses the epiphany that turns information into responsibility.', reveals: 'objectivity-needs-no-i' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue Antarctica\'s case on geological timescales — and explain why one white continent holds the planet\'s whole medical record.',
            decisions: [{ prompt: 'What comes next? Journey to the End of the Earth · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Journey to the End of the Earth · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes in \'Journey to the End of the Earth\' — the supporting ideas.',
          hint: 'If stuck, revisit c11_eng_h_cbse_03_007 (Class 11 Hornbill Chapter 3 secondary themes).',
          misconception: 'Students often list *topics* (e.g., "Gondwana," "Students on Ice," "phytoplankton") as themes.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "geological time vs. human time" to explain why Doshi calls human civilisation "a paltry 12,000 years — barely a few seconds on the.', answer: 'Step 1: Identify the two time scales',
                  options: ['Step 1: Identify the two time scales', 'theme = topic'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_03_007 (Class 11 Hornbill Chapter 3 secondary themes) — it uses.',
                  misconception: 'Students often list *topics* (e.g., "Gondwana," "Students on Ice," "phytoplankton") as themes.' }
          ],
            remediations: { 'students-often-list-topics-e': { steps: ['If a student cannot convert topics to thematic statements: 1.', 'Give them a 3-column table: **Topic** | **Author\'s Attitude/Comment** | **Thematic Statement (Topic + Attitude)**.', 'Fill Row 1 together: Topic = Phytoplankton; Attitude = "wondrous and most important process," "parable for existence".', 'Student completes Rows 2-3 for Gondwana and Students on Ice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_008', difficulty: 'standard',
          question: 'Imagery in \'Journey to the End of the Earth\' — the vivid, sensory language that.',
          hint: 'If stuck on sense modalities: revisit c7_engl_ch01_008 (Imagery and Sound in Nature.',
          misconception: 'Students treat imagery and metaphor as **identification exercises** ("spot the device") rather than **interpretive.',
          parts: [
                { id: 'a', prompt: 'Define "metaphor" and distinguish it from "simile" using an example from *Journey to the End of the Earth*.', answer: 'A metaphor directly equates two unlike things (A *is* B) to transfer qualities',
                  options: ['A metaphor directly equates two unlike things (A *is* B) to transfer qualities', 'giant ping-pong ball', 'like/as'],
                  hint: 'If stuck on sense modalities: revisit c7_engl_ch01_008 (Imagery and Sound in Nature Descriptions).',
                  misconception: 'Students treat imagery and metaphor as **identification exercises** ("spot the device") rather than **interpretive tools** ("what does this.' }
          ],
            remediations: { 'students-treat-imagery-and-metaphor': { steps: ['If a student cannot move beyond identification: (1) Give them a two-column table: Column A = "Quoted phrase," Column.', '(3) Ask: "Which column would earn marks in a 3-mark Board question?" (4) Direct them to re-read the "Walk on the ocean".', 'If still stuck, revisit **c11_eng_h_cbse_01_008** (Class 11 Literary Devices: Imagery and Metaphor) for the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Journey to the End of the Earth\' — where opposite things.',
          hint: 'If stuck, revisit the PEEL paragraph structure from c12_eng_v_cbse_03_008 and practice.',
          misconception: 'Students often treat irony and symbolism as decorative "labels" to hunt for, rather than analytical tools.',
          parts: [
                { id: 'a', prompt: 'The author describes Antarctica as "a giant ping-pong ball devoid of any human markers — no trees, billboards, buildings." Is this primarily irony, symbolism.', answer: 'Correct answer: It is primarily symbolism',
                  options: ['Correct answer: It is primarily symbolism', 'calls it only irony misses the representational function'],
                  hint: 'If stuck, revisit the PEEL paragraph structure from c12_eng_v_cbse_03_008 and practice identifying.',
                  misconception: 'Students often treat irony and symbolism as decorative "labels" to hunt for, rather than analytical tools.' }
          ],
            remediations: { 'students-often-treat-irony-and': { steps: ['If a student cannot move beyond identification, have them: (1) Re-read the chapter with two highlighters — one for.', '(2) For each highlighted passage, complete the sentence: "This is not just X; it represents Y because..." (3) Write one.', '(4) Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat irony and symbolism as decorative "labels" to hunt for, rather than analytical tools.',
          parts: [
                { id: 'a', prompt: 'Evaluate the effectiveness of the chapter\'s closing irony: the author wonders if humans will "go the way of the dinosaurs" while standing with teenagers "who.', answer: 'Correct answer: It strengthens the call to action',
                  options: ['Correct answer: It strengthens the call to action', 'it undermines because it suggests we\'ll go extinct anyway', 'it\'s not irony, just contrast'],
                  hint: 'If stuck, revisit the PEEL paragraph structure from c12_eng_v_cbse_03_008 and practice identifying.',
                  misconception: 'Students often treat irony and symbolism as decorative "labels" to hunt for, rather than analytical tools.' }
          ],
            remediations: { 'students-often-treat-irony-and': { steps: ['If a student cannot move beyond identification, have them: (1) Re-read the chapter with two highlighters — one for.', '(2) For each highlighted passage, complete the sentence: "This is not just X; it represents Y because..." (3) Write one.', '(4) Re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Journey to the End of the Earth\' — the words and phrases you.',
          hint: 'If stuck on clause/conjunction identification: review c11_eng_w_cbse_01_011 (Grammar.',
          misconception: 'Students believe "vocabulary in context" means "guess the meaning from the general topic" (e.g., "it\'s about.',
          parts: [
                { id: 'a', prompt: 'Define "context clue" and name the four main types (with one example clue word/phrase for each type).', answer: 'A context clue is a hint within the text that helps define an unfamiliar word',
                  options: ['A context clue is a hint within the text that helps define an unfamiliar word', 'in other words', 'also known as', 'however'],
                  hint: 'If stuck on clause/conjunction identification: review c11_eng_w_cbse_01_011 (Grammar: Language.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the general topic" (e.g., "it\'s about Antarctica, so \'calving\' must.' },
                { id: 'b', prompt: 'In the sentence "For a sun-worshipping South Indian like myself, two weeks in a place where 90 per cent of the Earth\'s total ice volumes are stored is.', answer: '"Chilling prospect" means a frightening or daunting future possibility',
                  options: ['"Chilling prospect" means a frightening or daunting future possibility', 'cold weather forecast', 'vocabulary in context', 'guess the meaning from the general topic'],
                  hint: 'If stuck on clause/conjunction identification: review c11_eng_w_cbse_01_011 (Grammar: Language.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the general topic" (e.g., "it\'s about Antarctica, so \'calving\' must.' },
                { id: 'c', prompt: 'The word "amalgamated" appears in: "a giant amalgamated southern supercontinent — Gondwana".', answer: 'Meaning: combined/united into a single entity',
                  options: ['Meaning: combined/united into a single entity', 'A wrong answer (e.g', 'broken', '(together) +'],
                  hint: 'If stuck on clause/conjunction identification: review c11_eng_w_cbse_01_011 (Grammar: Language.',
                  misconception: 'Students believe "vocabulary in context" means "guess the meaning from the general topic" (e.g., "it\'s about Antarctica, so \'calving\' must.' }
          ],
            remediations: { 'vocabulary-in-context-means-guess': { steps: ['If a student cannot identify clue types or misdefines words: 1.', '**Revisit Clue Types**: Use c11_eng_h_cbse_01_010 (Vocabulary in Context: Key Words) — re-do its Worked Example 1 with.', '**Micro-Practice**: Give 5 sentences from the chapter (one per clue type).', 'Student must: (a) underline the target word, (b) circle the clue phrase, (c) name the clue type, (d) write the meaning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_011', difficulty: 'standard',
          question: 'Language and style in \'Journey to the End of the Earth\' — how the writer chose.',
          hint: 'If stuck on modal classification, review the "epistemic vs deontic" distinction using.',
          misconception: 'Students treat "grammar in literature" as spotting parts of speech (e.g., "there are many adjectives") rather than.',
          parts: [
                { id: 'a', prompt: 'Identify the tense and aspect of the verb phrase "had been travelling" in the sentence "By the time I actually set foot on the Antarctic continent I had been.', answer: 'Past perfect progressive (past perfect continuous)',
                  options: ['Past perfect progressive (past perfect continuous)', 'past continuous', 'past perfect'],
                  hint: 'If stuck on modal classification, review the "epistemic vs deontic" distinction using.',
                  misconception: 'Students treat "grammar in literature" as spotting parts of speech (e.g., "there are many adjectives") rather than analysing how.' }
          ],
            remediations: { 'students-treat-grammar-in-literature': { steps: ['Revisit c11_eng_h_cbse_01_011 (Grammar: Language Usage in the Text - Hornbill Ch1) for tense-aspect basics in narrative.', 'Practice converting 5 participial phrases from the text into full relative clauses, then compare rhythm/emphasis.', 'Create a two-column table: modal verb | modality type | rhetorical effect for all modals in the chapter.', 'Re-attempt Diagnostic Questions 2, 3, 4 with the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Journey to the End of the Earth\' — questions answered.',
          hint: 'If stuck on distinguishing question types, revisit Class 11 Hornbill Chapter 1.',
          misconception: 'Students believe "inferential" means "guessing" or "giving your opinion." They write answers like "I think the author.',
          parts: [
                { id: 'a', prompt: 'Identify whether each question is literal (L) or inferential (I): (a) "Name the Russian research vessel the author travelled on." (b) "Why does the author say.', answer: '"Name the Russian research vessel the author travelled on." (',
                  options: ['"Name the Russian research vessel the author travelled on." (', 'inferential', 'guessing', 'giving your opinion'],
                  hint: 'If stuck on distinguishing question types, revisit Class 11 Hornbill Chapter 1 Comprehension node.',
                  misconception: 'Students believe "inferential" means "guessing" or "giving your opinion." They write answers like "I think the author feels sad about.' }
          ],
            remediations: { 'inferential-means-guessing-or-giving': { steps: ['If a student cannot distinguish literal/inferential or produces opinion-based inferences: (1) Give them the four NCERT.', '(2) For each insight question, build a 3-column table: Textual Clue | Deduction | Thematic Link.', '(3) Practice converting 5 literal questions from the chapter into inferential variants (e.g., literal: "What.', '(4) Re-diagnose using Diagnostic Question 2 — require full ICE structure.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
