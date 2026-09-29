import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_w_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_w_ch05_p2: SimDef = {
    id: 'v3_c11_eng_w_ch05_p2',
    title: 'Pigeons at Daybreak (Short Story) · Part 2/3',
    subtitle: 'Read the pigeons as the story\'s structural heartbeat, not its wallpaper.',
    classLevel: 11, subject: 'eng_w', topic: 'Pigeons at Daybreak (Short Story) · Part 2/3',
    chapters: ['c11_eng_w_ch05'],
    nodeIds: ['c11_eng_w_cbse_05_007', 'c11_eng_w_cbse_05_008', 'c11_eng_w_cbse_05_009', 'c11_eng_w_cbse_05_010', 'c11_eng_w_cbse_05_011', 'c11_eng_w_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader tracking a motif through one morning routine', intro: 'An old man, a rooftop of pigeons, a son\'s visit that cracks the routine — watch the birds mirror what he can\'t say.', goal: 'Distinguish plot summary from structural analysis and read a recurring motif.' },
    discovery: {
        question: 'Are the pigeons in \'Pigeons at Daybreak\' just set dressing while the real story is a father and son?',
        options: ['No — the pigeons anchor all three structural nodes: the routine, the panic of the confrontation, and the altered ritual at the end', 'Yes — the title is decorative and the plot is the son\'s visit', 'No — the pigeons are the literal antagonists of the story', 'Yes — the birds only establish that the man is old'],
        answer: 'No — the pigeons anchor all three structural nodes: the routine, the panic of the confrontation, and the altered ritual at the end',
        hook: 'A motif that returns at exposition, climax and resolution isn\'t decoration — it\'s the story\'s pulse.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes in \'Pappachi\' — the supporting ideas and motifs that deepen the text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_w_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the pigeon motif through the arc\'s nodes and show how the resumed morning ritual has quietly changed by the end.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Look beneath the main theme of \'Pappachi\' for the recurring secondary ideas that give it layers.',
            decisions: [{ prompt: 'Define "secondary theme" in your own words and give one example from any story you have studied previously.', options: [
                { text: 'A secondary theme is a supporting idea that runs beneath the main theme, adding layers of', outcome: 'A secondary theme is a supporting idea that runs beneath the main theme, adding layers of meaning.' },
                { text: 'it\'s just a minor topic', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and list topics like.', reveals: 'secondary-theme-means-less-important' },
                { text: 'secondary', outcome: 'Not quite — Students often think "secondary theme" means "less important theme" and list topics like.', reveals: 'secondary-theme-means-less-important' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Find the lines in \'Pappachi\' that paint pictures — imagery is how the text comes alive.',
            decisions: [{ prompt: 'What is the difference between imagery and metaphor? Give one example of each from any text you have read.', options: [
                { text: 'Imagery uses sensory language to create mental pictures (e.g., "the smell of wet earth"),', outcome: 'Imagery uses sensory language to create mental pictures (e.g., "the smell of wet earth"), while.' },
                { text: 'imagery is only visual', outcome: 'Not quite — Students often think any descriptive language is imagery, but imagery must appeal to the senses.', reveals: 'any-descriptive-language-is-imagery' },
                { text: 'any descriptive language is imagery, but imagery must appeal to the senses', outcome: 'Not quite — Students often think any descriptive language is imagery, but imagery must appeal to the senses.', reveals: 'any-descriptive-language-is-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Note the difficult or loaded words in \'Pappachi\' — their meaning carries the text\'s precision.',
            decisions: [{ prompt: 'What is the primary context clue type that helps a reader infer the meaning of "ignominy of retirement" in the opening paragraph.', options: [
                { text: 'The primary clue is **contrast/inference**: the text states Pappachi "was having trouble', outcome: 'The primary clue is **contrast/inference**: the text states Pappachi "was having trouble coping.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students treat "vocabulary in context" as "guess the meaning from the general story vibe" rather.', reveals: 'students-treat-vocabulary-in-context' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Read \'Pappachi\' for style: what words did the writer choose, and what effect do they create?',
            decisions: [{ prompt: 'What is the definition of a complex sentence, and can you find one example from the first paragraph of "Pappachi\'s Moth"?', options: [
                { text: 'A complex sentence contains one independent clause and at least one dependent clause', outcome: 'A complex sentence contains one independent clause and at least one dependent clause.' },
                { text: 'language usage', outcome: 'Not quite — Students often think "language usage" means only identifying parts of speech or naming tenses.', reveals: 'language-usage-means-only-identifying' },
                { text: '"language usage" means only identifying parts of speech or naming tenses', outcome: 'Not quite — Students often think "language usage" means only identifying parts of speech or naming tenses.', reveals: 'language-usage-means-only-identifying' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Answer \'Pappachi\' questions by finding the facts in the text — the answer is on the page.',
            decisions: [{ prompt: 'Define a literal comprehension question and an inferential comprehension question in your own words.', options: [
                { text: 'A literal question asks for information explicitly stated in the text (e.g., "What did', outcome: 'A literal question asks for information explicitly stated in the text (e.g., "What did Pappachi.' },
                { text: 'guessing', outcome: 'Not quite — Students often think inferential questions are "guessing" with no right answer, so they write vague.', reveals: 'inferential-questions-are-guessing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a family-fiction unit your class reads \'Pappachi\'s Moth\' — an Imperial Entomologist whose new moth is named after someone else, and whose wife\'s pickle business out-earns him. A student says: \'It\'s a sad story about a bitter old man; the science and Kerala details are background flavour.\'',
            decisions: [{ prompt: 'Why do the entomology and setting details matter?', options: [
                { text: 'Because Pappachi\'s wound is professional, not vague: an Imperial Entomologist\'s life\'s honour is a named species, and the \'taxonomic reshuffle\' that denies him the moth is a public, official erasure — inside a rigid post-colonial Kerala hierarchy where rank defines a man. His violence spikes precisely when Mammachi\'s success and his obscurity collide; the moth is the symbol of stolen credit, not set-dressing.', outcome: 'Context — scientific prestige culture plus Kerala\'s hierarchies — turns domestic bitterness into a study of wounded patriarchal pride.' },
                { text: 'The student is right — it\'s a domestic drama; the moth could be any hobby disappointment.', outcome: 'An unnamed-moth discovery is a career-defining honour in taxonomy; swapping it for \'a hobby\' shrinks a public humiliation into a private sulking.', reveals: 'moth-is-just-a-hobby' },
                { text: 'Read it as a feminist triumph only — Mammachi\'s business succeeding is the whole story.', outcome: 'Her success matters, but as a trigger inside a status system: the chapter studies how a man\'s rage feeds on her competence — flattening it to triumph misses the violence.', reveals: 'story-is-only-triumph' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_w_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'He feeds the pigeons again at daybreak — same gesture, different man; the motif records what the plot can\'t say.',
            decisions: [{ prompt: 'What comes next? Pigeons at Daybreak (Short Story) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Pigeons at Daybreak (Short Story) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes in \'Pappachi\' — the supporting ideas and motifs that deepen.',
          hint: 'If stuck, review the "Topic vs Theme" distinction using the worked example.',
          misconception: 'Students often think "secondary theme" means "less important theme" and list topics like "pickle-making".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes in \'Pappachi\'',
                  options: ['Secondary themes in \'Pappachi\'', '\'Pappachi\' (Woven Words, ch', 'The plot/narrative arc of \'Pappachi\'', 'The setting of \'Pappachi\''],
                  hint: 'If stuck, review the "Topic vs Theme" distinction using the worked example in c11_eng_w_cbse_05_006.',
                  misconception: 'Students often think "secondary theme" means "less important theme" and list topics like "pickle-making" or "entomology" as themes.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student lists topics instead of themes: (1) Have them complete the sentence frame: "The story shows that [abstract.', '(2) Give them three abstract nouns from the story (jealousy, silence, legacy) and ask them to find two pieces.', '(3) Model the difference: "Pickle-making" (topic) vs.', '"Economic independence threatening patriarchal control" (theme).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "less important theme" and list topics like "pickle-making".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Mammachi\'s pickle-making success is the true antagonist of the story, not Pappachi\'s violence." Defend or refute using textual.', answer: 'Refute — the pickle business is the **catalyst**, not the antagonist',
                  options: ['Refute — the pickle business is the **catalyst**, not the antagonist', 'the attention his wife was suddenly getting', 'not a suitable job for a high-ranking ex-government official', 'secondary theme'],
                  hint: 'If stuck, review the "Topic vs Theme" distinction using the worked example in c11_eng_w_cbse_05_006.',
                  misconception: 'Students often think "secondary theme" means "less important theme" and list topics like "pickle-making" or "entomology" as themes.' }
          ],
            remediations: { 'secondary-theme-means-less-important': { steps: ['If a student lists topics instead of themes: (1) Have them complete the sentence frame: "The story shows that [abstract.', '(2) Give them three abstract nouns from the story (jealousy, silence, legacy) and ask them to find two pieces.', '(3) Model the difference: "Pickle-making" (topic) vs.', '"Economic independence threatening patriarchal control" (theme).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_008', difficulty: 'standard',
          question: 'Imagery in \'Pappachi\' — the vivid, sensory language that creates word-pictures.',
          hint: 'Review the definitions of imagery and metaphor from Class 10 poetry nodes (e.g.',
          misconception: 'Students often think any descriptive language is imagery, but imagery must appeal to the senses.',
          parts: [
                { id: 'a', prompt: 'In "Pigeons at Daybreak", the author describes the morning light. How does the imagery of light function beyond mere description? Explain in your own words.', answer: 'The imagery of light may symbolize hope, clarity, or the passage of time',
                  options: ['The imagery of light may symbolize hope, clarity, or the passage of time', 'any descriptive language is imagery, but imagery must appeal to the senses'],
                  hint: 'Review the definitions of imagery and metaphor from Class 10 poetry nodes (e.g.',
                  misconception: 'Students often think any descriptive language is imagery, but imagery must appeal to the senses.' }
          ],
            remediations: { 'any-descriptive-language-is-imagery': { steps: ['If the student cannot distinguish imagery from mere description, have them list the five senses and find one word for.', 'For metaphor confusion, give them pairs: "A is B" (metaphor) vs "A is like B" (simile) and ask them to convert.', 'Then practice identifying the tenor and vehicle in a metaphor from the story.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_009', difficulty: 'standard',
          question: 'Irony and paradox in \'Pappachi\' — where opposite things are both true,.',
          hint: 'Review the definitions and examples of irony and symbolism from Class 10 nodes.',
          misconception: 'Students often label any unfortunate event as "ironic" — for example, calling Pappachi\'s retirement "ironic" because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony and paradox in \'Pappachi\'',
                  options: ['Irony and paradox in \'Pappachi\'', '\'Pappachi\' (Woven Words, ch', 'The plot/narrative arc of \'Pappachi\'', 'The setting of \'Pappachi\''],
                  hint: 'Review the definitions and examples of irony and symbolism from Class 10 nodes c10_engl_cbse_01_007.',
                  misconception: 'Students often label any unfortunate event as "ironic" — for example, calling Pappachi\'s retirement "ironic" because he was once powerful.' }
          ],
            remediations: { 'students-often-label-any-unfortunate': { steps: ['Re-read the definitions of the three irony types in Class 10\'s "A Letter to God" (c10_engl_cbse_01_007) and "The.', 'Create a two-column table: Column A = Pappachi\'s expectations; Column B = Actual outcomes.', 'For symbols, list 5 objects, then write the abstract idea each *could* represent; discard those that lack textual.', 'Practice writing one PEEL paragraph per device using the worked examples as templates.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_010', difficulty: 'standard',
          question: 'Key vocabulary of \'Pappachi\' — the words and phrases you must know to read the.',
          hint: 'Review Class 10 Grammar node c10_engl_cbse_04_007 (Diary as a Literary Form) which covers.',
          misconception: 'Students treat "vocabulary in context" as "guess the meaning from the general story vibe" rather than a rigorous.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Key vocabulary of \'Pappachi\'',
                  options: ['Key vocabulary of \'Pappachi\'', '\'Pappachi\' (Woven Words, ch', 'The plot/narrative arc of \'Pappachi\'', 'The setting of \'Pappachi\''],
                  hint: 'Review Class 10 Grammar node c10_engl_cbse_04_007 (Diary as a Literary Form) which covers.',
                  misconception: 'Students treat "vocabulary in context" as "guess the meaning from the general story vibe" rather than a rigorous linguistic process.' }
          ],
            remediations: { 'students-treat-vocabulary-in-context': { steps: ['**Isolate the clause**: Have the student copy the exact sentence containing the target phrase onto a sticky note.', '**Bracket the clues**: Physically bracket every word/phrase in that sentence and the next that relates to the target.', 'to Joint Director, Entomology]).', '**Label the clue type**: Together, name each bracket: "appositive definition", "career progression detail", "synonym.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_011', difficulty: 'standard',
          question: 'Language and style in \'Pappachi\' — how the writer chose words, sentences and.',
          hint: 'Review Class 10 grammar nodes on voice (c10_engl_cbse_01_001) and sentence variety.',
          misconception: 'Students often think "language usage" means only identifying parts of speech or naming tenses.',
          parts: [
                { id: 'a', prompt: 'Rewrite the following sentence from the text in active voice: "The beatings weren\'t new.', answer: 'Active rewrite: "The beatings weren\'t new',
                  options: ['Active rewrite: "The beatings weren\'t new', 'language usage', '"language usage" means only identifying parts of speech or naming tenses'],
                  hint: 'Review Class 10 grammar nodes on voice (c10_engl_cbse_01_001) and sentence variety.',
                  misconception: 'Students often think "language usage" means only identifying parts of speech or naming tenses.' }
          ],
            remediations: { 'language-usage-means-only-identifying': { steps: ['If a student only identifies grammatical labels without connecting to effect, guide them through this sequence: (1).', '(2) Ask: "What is the literal meaning?" (3) Ask: "How would the meaning change if the sentence were structured.', '(5) Finally, ask them to write a one-sentence explanation of the author\'s choice.', 'Repeat with three sentences until they habitually link form to function.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_w_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension of \'Pappachi\' — questions answered straight from the text.',
          hint: 'If stuck, re-read the "Understanding the Text" questions in the NCERT textbook (page 60).',
          misconception: 'Students often think inferential questions are "guessing" with no right answer, so they write vague opinions.',
          parts: [
                { id: 'a', prompt: 'Read this line from the story: "He slouched around the compound in his immaculately tailored suits, weaving sullen circles around mounds of red chillies and.', answer: 'It is a literal question',
                  options: ['It is a literal question', 'guessing'],
                  hint: 'If stuck, re-read the "Understanding the Text" questions in the NCERT textbook (page 60) and.',
                  misconception: 'Students often think inferential questions are "guessing" with no right answer, so they write vague opinions.' },
                { id: 'b', prompt: 'Answer this inferential question using evidence from the story: "Why did Mammachi\'s violin lessons stop abruptly?" Provide a Point, Evidence, and Explanation.', answer: 'Point: Mammachi\'s violin lessons stopped',
                  options: ['Point: Mammachi\'s violin lessons stopped', 'they moved to Ayemenem', 'guessing'],
                  hint: 'If stuck, re-read the "Understanding the Text" questions in the NCERT textbook (page 60) and.',
                  misconception: 'Students often think inferential questions are "guessing" with no right answer, so they write vague opinions.' }
          ],
            remediations: { 'inferential-questions-are-guessing-with': { steps: ['If a student cannot distinguish literal from inferential, do this: 1.', 'Give them 5 questions from the story; ask them to highlight the exact words in the text that answer each.', 'For questions where no single sentence contains the answer, guide them to list 2-3 clues from different parts of the.', 'Have them write a "Because the text says...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
