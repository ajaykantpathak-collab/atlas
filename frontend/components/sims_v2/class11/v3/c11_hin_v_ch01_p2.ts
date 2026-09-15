import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p2: SimDef = {
    id: 'v3_c11_hin_v_ch01_p2',
    title: 'tc lsD\'ku vkfI+kQlj · Part 2/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'tc lsD\'ku vkfI+kQlj · Part 2/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_007', 'c11_hin_v_cbse_01_008', 'c11_hin_v_cbse_01_009', 'c11_hin_v_cbse_01_010', 'c11_hin_v_cbse_01_011', 'c11_hin_v_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the supporting ideas, motifs, and concerns that run alongside the primary theme in a literary work, enriching its texture and providing multiple layers of meaning.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re listening to a podcast about a famous painter, and suddenly you realize the host isn\'t just telling a biography—they\'re also exploring how.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literary analysis, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea or motif that runs parallel to the primary theme,', outcome: 'A secondary theme is a supporting idea or motif that runs parallel to the primary theme, adding.' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'minor topics', outcome: 'Not quite — Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you\'re standing before a painting in a museum — you see colors, lines, textures.',
            decisions: [{ prompt: 'According to the author, what is the primary distinction between fp=kiV laxhr (visual art) and \'kkL=kh; laxhr (literary art) in terms.', options: [
                { text: 'The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk"', outcome: 'The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk" (immediate/existential state).' },
                { text: 'visual art uses colors, literary art uses words', outcome: 'Not quite — Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt.', reveals: 'students-conflate-imagery-with-figurative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re reading a newspaper cartoon where a politician promises "transparency" while standing behind a brick wall labeled "secrecy." You instantly grasp.',
            decisions: [{ prompt: 'Define verbal irony and situational irony in your own words, giving one example of each from everyday life (not from the textbook).', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying "Great job!".' },
                { text: 'situational irony', outcome: 'Not quite — Students often believe irony and symbolism are merely decorative "figures of speech" that authors.', reveals: 'irony-and-symbolism-are-merely' },
                { text: 'figures of speech', outcome: 'Not quite — Students often believe irony and symbolism are merely decorative "figures of speech" that authors.', reveals: 'irony-and-symbolism-are-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the essay and repeatedly encounter the word "xkuiu" (aesthetic experience).',
            decisions: [{ prompt: 'What is the most reliable first step when encountering an unfamiliar key word in a senior secondary Hindi prose text?', options: [
                { text: 'The most reliable first step is to locate all occurrences of the word in the chapter and', outcome: 'The most reliable first step is to locate all occurrences of the word in the chapter and examine.' },
                { text: 'look up the dictionary meaning first', outcome: 'Not quite — Students believe vocabulary in context means guessing a word\'s meaning from the single sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine a teacher who says "The homework is due tomorrow" (declarative — states a fact, positions the student as receiver of information) versus one who says.',
            decisions: [{ prompt: 'Define the four main sentence types (declarative, interrogative, imperative, exclamatory) in your own words and give one everyday example.', options: [
                { text: 'Declarative: states a fact or opinion (e.g., "The exam begins at 9 a.m.")', outcome: 'Declarative: states a fact or opinion (e.g., "The exam begins at 9 a.m.") — positions the reader.' },
                { text: 'declarative ends with a period, interrogative ends with a question mark', outcome: 'Not quite — Students treat grammar as a *separate layer* from meaning — they analyze "what the chapter says".', reveals: 'students-treat-grammar-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a WhatsApp forward claiming "Yashodhar\'s art caused a revolution." Your first instinct is to check: does the text actually say that,.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question in the context of this.', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What name was', outcome: 'A literal question asks for information directly stated in the text (e.g., "What name was given.' },
                { text: 'is automatically inferential, and any', outcome: 'Not quite — Students often believe that any question starting with "Why" or "How" is automatically inferential.', reveals: 'any-question-starting-with-why' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'What comes next? tc lsD\'ku vkfI+kQlj · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — tc lsD\'ku vkfI+kQlj · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_007', difficulty: 'standard',
          question: 'Secondary themes are the supporting ideas, motifs, and concerns that run.',
          hint: 'If stuck, review node 006 (Primary Theme) and practice distinguishing "what happens".',
          misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the supporting ideas, motifs, and concerns that run alongside the',
                  options: ['Secondary themes are the supporting ideas, motifs, and concerns that run alongside the', '"Before You Read: Context and Background" provides the historical, cultural, and literary', 'Plot and Narrative Structure refers to the organized sequence of events in a literary', 'Setting in this essay refers to the physical, temporal, and cultural backdrop against'],
                  hint: 'If stuck, review node 006 (Primary Theme) and practice distinguishing "what happens" (plot/topics).',
                  misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio history," "Yaksh.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists topics instead of themes: (1) Have them reread paragraphs 2-4 and 6-7, highlighting every sentence.', '(2) Ask: "What idea is this claim *an example of*?" (3) Group similar claims into 3-4 clusters—each cluster is.', '(4) Verify each cluster against the primary theme: does it deepen, complicate, or extend the main argument?', 'If not, it\'s a topic, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio.',
          parts: [
                { id: 'a', prompt: 'Evaluate Saxena\'s claim that "fp=kiV laxhr us yksxksa dks dku fcxkM+ fn, gS" (visual art has given people the gift of seeing).', answer: 'Defensible insight, not overstatement',
                  options: ['Defensible insight, not overstatement', 'hyperbole', 'rjg&rjg dh y; osQ Hkh izdkj', 'secondary themes'],
                  hint: 'If stuck, review node 006 (Primary Theme) and practice distinguishing "what happens" (plot/topics).',
                  misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio history," "Yaksh.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists topics instead of themes: (1) Have them reread paragraphs 2-4 and 6-7, highlighting every sentence.', '(2) Ask: "What idea is this claim *an example of*?" (3) Group similar claims into 3-4 clusters—each cluster is.', '(4) Verify each cluster against the primary theme: does it deepen, complicate, or extend the main argument?', 'If not, it\'s a topic, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_008', difficulty: 'standard',
          question: 'Imagery (fp=kiV laxhr) in this chapter refers to the author\'s technique.',
          hint: 'Review the "Before You Read" context (c11_hin_v_cbse_01_001) on the tradition of Indian.',
          misconception: 'Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt for decorative.',
          parts: [
                { id: 'a', prompt: 'According to the author, what is the primary distinction between fp=kiV laxhr (visual art) and \'kkL=kh; laxhr (literary art) in terms of their "rky".', answer: 'The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk"',
                  options: ['The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk"', 'visual art uses colors, literary art uses words'],
                  hint: 'Review the "Before You Read" context (c11_hin_v_cbse_01_001) on the tradition of Indian xkf;dk.',
                  misconception: 'Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt for decorative comparisons in the.' },
                { id: 'b', prompt: 'The author describes three types of "y;" (rhythm): foyafcry; (musical), eè;y; (poetic), and nzqry; (prosaic).', answer: 'Nzqry; is "rs"k" (prosaic/ordinary)',
                  options: ['Nzqry; is "rs"k" (prosaic/ordinary)', 'nzqry; is the most musical'],
                  hint: 'Review the "Before You Read" context (c11_hin_v_cbse_01_001) on the tradition of Indian xkf;dk.',
                  misconception: 'Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt for decorative comparisons in the.' }
          ],
            remediations: { 'students-conflate-imagery-with-figurative': { steps: ['Have the student re-read only the first two pages, highlighting every concrete noun (room, paint, brush, canvas, light.', 'Ask: "Which of these details could a camera capture?', 'Which require the writer\'s perception?" 3.', 'Map each highlighted detail to the author\'s claim about fp=kiV laxhr\'s "Loj" and "y;." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_009', difficulty: 'standard',
          question: 'Irony (व्यंग्य) is a literary device where the intended meaning of words.',
          hint: 'If stuck, review the "three colors = three sounds" analogy in the middle of the chapter.',
          misconception: 'Students often believe irony and symbolism are merely decorative "figures of speech" that authors add for beauty.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the narrator initially mistakes the bell sound for a divine or supernatural occurrence, but it turns out to be the announcement of Yashpal\'s.', answer: 'This is situational irony',
                  options: ['This is situational irony', 'verbal irony', 'dramatic irony', 'figures of speech'],
                  hint: 'If stuck, review the "three colors = three sounds" analogy in the middle of the chapter (paragraphs.',
                  misconception: 'Students often believe irony and symbolism are merely decorative "figures of speech" that authors add for beauty.' }
          ],
            remediations: { 'irony-and-symbolism-are-merely': { steps: ['Have the student re-read the first two paragraphs and physically mark (with pencil) every sentence where the narrator\'s.', 'Create a two-column table: Column A = concrete object (bell, painting, colors), Column B = abstract idea it represents.', 'Ask: "Which device attacks the old view? Which builds the new view?" Guide them to see irony as the wrecking ball and.', 'Assign a 100-word response: "Explain how the bell\'s meaning changes from para 1 to para 5 using the E/R table and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_010', difficulty: 'standard',
          question: 'Vocabulary in context is the skill of determining the precise meaning of words.',
          hint: 'Review "Text: Plot and Narrative Structure" (c11_hin_v_cbse_01_002) and practice mapping.',
          misconception: 'Students believe vocabulary in context means guessing a word\'s meaning from the single sentence where it first appears.',
          parts: [
                { id: 'a', prompt: 'In the sentence "yrk dh yksdfiz;rk dk eq[; eeZ ;g ^xkuiu* gh gSA" (The main basis of Yashodhara\'s creativity is this \'xkuiu\'), use the surrounding paragraph.', answer: '"xkuiu" means a transformative aesthetic experience that fuses sensory modes and',
                  options: ['"xkuiu" means a transformative aesthetic experience that fuses sensory modes and', 'artistic feeling'],
                  hint: 'Review "Text: Plot and Narrative Structure" (c11_hin_v_cbse_01_002) and practice mapping the.',
                  misconception: 'Students believe vocabulary in context means guessing a word\'s meaning from the single sentence where it first appears.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot trace semantic evolution, conduct a "Word Trajectory Mapping" exercise: (1) Select one key term.', '(2) Find all 3-4 occurrences in the chapter.', '(3) For each, copy the full sentence and underline the subject, verb, and object associated with the term.', '(4) Create a two-column table: "Earlier usage" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_011', difficulty: 'standard',
          question: 'Grammar in the context of literary analysis refers to the study of how.',
          hint: 'If the student cannot connect grammar to rhetoric, return to node 006 (Theme) and.',
          misconception: 'Students treat grammar as a *separate layer* from meaning — they analyze "what the chapter says" (content) and "what.',
          parts: [
                { id: 'a', prompt: 'Define the four main sentence types (declarative, interrogative, imperative, exclamatory) in your own words and give one everyday example of each.', answer: 'Declarative: states a fact or opinion (e.g., "The exam begins at 9 a.m.")',
                  options: ['Declarative: states a fact or opinion (e.g., "The exam begins at 9 a.m.")', 'declarative ends with a period, interrogative ends with a question mark'],
                  hint: 'If the student cannot connect grammar to rhetoric, return to node 006 (Theme) and re-establish the.',
                  misconception: 'Students treat grammar as a *separate layer* from meaning — they analyze "what the chapter says" (content) and "what devices it uses".' }
          ],
            remediations: { 'students-treat-grammar-as-a': { steps: ['Select a key passage from the chapter. Have the student identify every sentence and label its type (declarative.', 'Have the student identify all rhetorical questions in the passage.', 'Have the student identify all verbs and label them active or passive. Ask: "Who is doing the action?', 'Have the student rewrite the passage converting all rhetorical questions to statements and all passive verbs to active.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck, review node c11_hin_v_cbse_01_002 (Plot and Narrative Structure) to refresh the.',
          misconception: 'Students often believe that any question starting with "Why" or "How" is automatically inferential, and any.',
          parts: [
                { id: 'a', prompt: 'The text states: "चित्रकला के कारण जनमानस की दृष्टि और चिंतन में परिवर्तन आया।" If a question asks, "How did visual art affect common people\'s thinking?",.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'effect', 'is automatically inferential, and any'],
                  hint: 'If stuck, review node c11_hin_v_cbse_01_002 (Plot and Narrative Structure) to refresh the sequence.',
                  misconception: 'Students often believe that any question starting with "Why" or "How" is automatically inferential, and any "What/Who/When" question.' },
                { id: 'b', prompt: 'Based on the passage, answer: "Why did the author feel that Yashodhar\'s sounds (words) had a \'music\' that merged two words into one?" Provide a step-by-step.', answer: 'Step 1: Locate the reference',
                  options: ['Step 1: Locate the reference', 'is automatically inferential, and any'],
                  hint: 'If stuck, review node c11_hin_v_cbse_01_002 (Plot and Narrative Structure) to refresh the sequence.',
                  misconception: 'Students often believe that any question starting with "Why" or "How" is automatically inferential, and any "What/Who/When" question.' }
          ],
            remediations: { 'any-question-starting-with-why': { steps: ['Give the student a mixed list of 10 questions from the chapter exercises.', 'Ask them to highlight the exact sentence(s) that answer each question.', 'For questions where no single sentence contains the full answer, guide them to list the 2-3 sentences they must combine.', 'Have them label each question "प्रत्यक्ष" (literal) or "निहित" (inferential) based on whether the answer was found.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
