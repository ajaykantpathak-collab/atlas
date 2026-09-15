import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch03_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch03_p2',
    title: 'gfj\'kadj ijlkbZ · Part 2/3',
    subtitle: 'Watch a first creative act survive its own terror — and its own comedy.',
    classLevel: 11, subject: 'hin_ar', topic: 'gfj\'kadj ijlkbZ · Part 2/3',
    chapters: ['c11_hin_ar_ch03'],
    nodeIds: ['c11_hin_ar_cbse_03_007', 'c11_hin_ar_cbse_03_008', 'c11_hin_ar_cbse_03_009', 'c11_hin_ar_cbse_03_010', 'c11_hin_ar_cbse_03_011', 'c11_hin_ar_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time creator guarding a small bottle of ink', intro: 'An adult writer looks back at the day everything that could go wrong on a makeshift stage did — and the dream survived anyway.', goal: 'Read the ink bottle as a symbol of fragile creative courage and locate the play-night climax.' },
    discovery: {
        question: 'A story built around a tiny ink bottle — \'दाई साल\' of a first attempt. Just a prop on a desk?',
        options: ['No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins', 'Yes — objects in titles are always decorative', 'No — the ink is secretly magical', 'Yes — the real subject is the writing desk'],
        answer: 'No — the bottle is the finite reservoir of creative courage: one wasted dip could end the attempt before it begins',
        hook: 'The Nayi Kahani writer makes the labour of writing itself the story — doubt, ghosts, landlords and all.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes (गौण विषय) are the underlying ideas, motifs, or concerns that run parallel to the primary theme in a literary work, enriching the narrative by adding layers of meaning, revealing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track a first creative attempt through its chaos — the stage, the mix-up of two actors as one \'भूत\' — and ask why the imperfection is the point.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a school play where the main story is about a boy trying to stage a production, but you keep noticing other stories happening.',
            decisions: [{ prompt: 'What is the definition of a secondary theme (गौण विषय) in a literary text, and how does it differ from the primary theme (मुख्य विषय)?', options: [
                { text: 'A secondary theme is a subordinate idea that runs alongside the primary theme, adding', outcome: 'A secondary theme is a subordinate idea that runs alongside the primary theme, adding depth and.' },
                { text: 'less important themes', outcome: 'Not quite — Students believe secondary themes are "sub-plots" or "minor topics" that can be listed like items.', reveals: 'secondary-themes-are-sub-plots' },
                { text: 'sub-plots', outcome: 'Not quite — Students believe secondary themes are "sub-plots" or "minor topics" that can be listed like items.', reveals: 'secondary-themes-are-sub-plots' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are describing your grandmother\'s kitchen to a friend who has never seen it.',
            decisions: [{ prompt: 'What is the precise technical difference between a Simile (उपमा अलंकार) and a Metaphor (रूपक अलंकार) in Hindi grammar?', options: [
                { text: 'In a Simile (उपमा), the उपमेय (subject) and उपमान (object of comparison) are linked', outcome: 'In a Simile (उपमा), the उपमेय (subject) and उपमान (object of comparison) are linked explicitly by.' },
                { text: 'Simile uses \'like\', metaphor doesn\'t', outcome: 'Not quite — Students consistently confuse **Extended Description** (विस्तृत वर्णन) with **Imagery**.', reveals: 'students-consistently-confuse-extended-descripti' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are writing a crucial exam and your pen stops working—right when you need it most.',
            decisions: [{ prompt: 'Define situational irony and give a one-sentence example from daily life (not from the textbook).', options: [
                { text: 'Situational irony occurs when the outcome of a situation is the opposite of what was', outcome: 'Situational irony occurs when the outcome of a situation is the opposite of what was expected.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often treat *any* unexpected event as irony, ignoring the necessity of a clear.', reveals: 'students-often-treat-any-unexpected' },
                { text: 'the pen *is like* a sword', outcome: 'Not quite — Students often treat *any* unexpected event as irony, ignoring the necessity of a clear.', reveals: 'students-often-treat-any-unexpected' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you receive a WhatsApp forward: "Mummy ne kaha khana khake jana" – you know *exactly* what was said (literal).',
            decisions: [{ prompt: 'What is the defining difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question\'s answer is explicitly written in the text (e.g., "What did the author', outcome: 'A literal question\'s answer is explicitly written in the text (e.g., "What did the author find.' },
                { text: 'Inferential means it\'s not in the book', outcome: 'Not quite — Students believe "inferential" means "any answer not in the book is correct" – they treat inference.', reveals: 'inferential-means-any-answer-not' },
                { text: 'inferential', outcome: 'Not quite — Students believe "inferential" means "any answer not in the book is correct" – they treat inference.', reveals: 'inferential-means-any-answer-not' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your literary magazine plans a feature on \'writers writing about writing.\' A junior editor suggests Ikappiya\'s story but calls it \'a plain autobiography of a struggling writer — Nayi Kahani is just a label to memorise for exams.\'',
            decisions: [{ prompt: 'How do you pitch the story properly?', options: [
                { text: 'Pitch it as the Nayi Kahani sensibility in action: written in 1955, in a newly independent nation redefining its voice, the story rejects romantic idealism for middle-class realism — a writer afraid to dip his pen, the tiny ink bottle as symbol of fragile creation. The retrospective adult narration adds reflection and dramatic irony; the meandering, episode-based structure is the movement\'s rejection of plot-driven storytelling.', outcome: 'The feature now explains why a 1955 story about fearing a blank page matters differently — context turns autobiography into a movement\'s manifesto.' },
                { text: 'Run it as autobiography — the author\'s own struggle told straight, no movement talk needed.', outcome: 'Dropping the Nayi Kahani frame misreads the structure: the episodic drift and reflective hindsight are deliberate craft, not diary habits.', reveals: 'story-is-plain-autobiography' },
                { text: 'Extract a moral instead — \'every writer should just start writing\' — for an inspirational box item.', outcome: 'The story isn\'t a productivity lesson; it\'s about the doubt and precarity of becoming a writer when the nation itself is finding its voice.', reveals: 'story-is-motivation-piece' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'The botched performance isn\'t failure — it\'s proof that art gets made by people who risk wasting their only ink.',
            decisions: [{ prompt: 'What comes next? gfj\'kadj ijlkbZ · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — gfj\'kadj ijlkbZ · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_007', difficulty: 'standard',
          question: 'Secondary themes (गौण विषय) are the underlying ideas, motifs, or concerns that.',
          hint: 'Review node 006 (Primary Theme) and node 002 (Plot Structure) — specifically the.',
          misconception: 'Students believe secondary themes are "sub-plots" or "minor topics" that can be listed like items (e.g., "friendship.',
          parts: [
                { id: 'a', prompt: 'Compare how the secondary theme of "adult world vs. child world" (बड़ों की दुनिया बनाम बच्चों की दुनिया) operates in the landlord episode (मकान मालिक का.', answer: 'The landlord episode shows the adult world as obstructive and incomprehensible',
                  options: ['The landlord episode shows the adult world as obstructive and incomprehensible', 'oppressive', 'supportive', 'sub-plots'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Plot Structure) — specifically the distinction.',
                  misconception: 'Students believe secondary themes are "sub-plots" or "minor topics" that can be listed like items (e.g., "friendship, rain, lanterns").' }
          ],
            remediations: { 'secondary-themes-are-sub-plots': { steps: ['Give the student a two-column table — Column A: Concrete Events from Text (e.g., "cot used as stage"), Column.', 'Have them fill 5 rows independently.', 'Ask them to group rows with the same abstract idea — each group is a secondary theme.', 'Require them to write one analytical sentence per group explaining how that theme deepens the primary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe secondary themes are "sub-plots" or "minor topics" that can be listed like items (e.g., "friendship.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of nostalgia (स्मृति/उदासीनता) in this chapter is merely the author\'s sentimental indulgence and does not serve.', answer: 'Refute',
                  options: ['Refute', 'sub-plots', 'minor topics', 'friendship, rain, lanterns'],
                  hint: 'Review node 006 (Primary Theme) and node 002 (Plot Structure) — specifically the distinction.',
                  misconception: 'Students believe secondary themes are "sub-plots" or "minor topics" that can be listed like items (e.g., "friendship, rain, lanterns").' }
          ],
            remediations: { 'secondary-themes-are-sub-plots': { steps: ['Give the student a two-column table — Column A: Concrete Events from Text (e.g., "cot used as stage"), Column.', 'Have them fill 5 rows independently.', 'Ask them to group rows with the same abstract idea — each group is a secondary theme.', 'Require them to write one analytical sentence per group explaining how that theme deepens the primary theme.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_008', difficulty: 'standard',
          question: 'Imagery (चित्रात्मकता/बिंब) refers to the use of vivid, sensory language that.',
          hint: 'Review "बिंब और अलंकार" (Imagery and Figures of Speech) from Class 10 NCERT Hindi.',
          misconception: 'Students consistently confuse **Extended Description** (विस्तृत वर्णन) with **Imagery** (बिंब/चित्रात्मकता).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery (चित्रात्मकता/बिंब) refers to the use of vivid, sensory language that appeals to',
                  options: ['Imagery (चित्रात्मकता/बिंब) refers to the use of vivid, sensory language that appeals to', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and Narrative Structure refers to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'Review "बिंब और अलंकार" (Imagery and Figures of Speech) from Class 10 NCERT Hindi (Kshitij/Kritika).',
                  misconception: 'Students consistently confuse **Extended Description** (विस्तृत वर्णन) with **Imagery** (बिंब/चित्रात्मकता).' }
          ],
            remediations: { 'students-consistently-confuse-extended-descripti': { steps: ['** Give the student a 3-sentence "non-imagery" description (e.g., "The well was deep and made of bricks.', '** Ask: "Which sentence lets you *hear* the pulley? Which lets you *feel* the depth?" **', '** Have them circle *only* the sensory words in the second sentence (स्वाद/गंध/स्पर्श/ध्वनि/रूप). **', '** Drill: Convert 5 factual sentences from the chapter into imagery-rich versions by adding *one* sensory.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contrast between expectation and.',
          hint: 'Revisit the plot-summary node (c11_hin_ar_cbse_03_002) for event order, and the.',
          misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.',
          parts: [
                { id: 'a', prompt: 'Compare the irony in the pen-failure episode (opening) with the irony in the doll episode (middle).', answer: 'The opening uses situational irony (tool fails the professional)',
                  options: ['The opening uses situational irony (tool fails the professional)', 'situational', 'internal conflict', 'the pen *is like* a sword'],
                  hint: 'Revisit the plot-summary node (c11_hin_ar_cbse_03_002) for event order, and the imagery/metaphor.',
                  misconception: 'Students often treat *any* unexpected event as irony, ignoring the necessity of a clear expectation-reality clash.' }
          ],
            remediations: { 'students-often-treat-any-unexpected': { steps: ['**Isolate the expectation**: Have the student complete the sentence "The writer expected ______, but ______ happened".', '**Symbol hunt**: Give a list of 5 recurring objects (pen, doll, storm, portraits, lighthouse).', 'For each, ask: "If this object were a message, what would it say?" 3.', '**Type-sorting**: Provide 4 short scenarios (2 ironic, 2 coincidental).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, re-read pages 32-34 (the prelude to premiere) and 35-38 (the premiere night).',
          misconception: 'Students treat the \'kCn&Nfo\' list as a glossary to memorize (word → single Hindi meaning) rather than as textual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vocabulary in Context refers to the skill of determining the precise meaning,',
                  options: ['Vocabulary in Context refers to the skill of determining the precise meaning,', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and Narrative Structure refers to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, re-read pages 32-34 (the prelude to premiere) and 35-38 (the premiere night) - these.',
                  misconception: 'Students treat the \'kCn&Nfo\' list as a glossary to memorize (word → single Hindi meaning) rather than as textual anchors requiring.' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['Have the student locate ONE word (e.g., \'unkjn\') in the text using Ctrl+F or manual scan.', 'Read 3 sentences before and after.', 'Ask: "What is the SPECIFIC situation? What does the word DO here - name, describe, judge, metaphorize?"', 'Compare with dictionary meaning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_011', difficulty: 'standard',
          question: 'Language Usage in the Text refers to the systematic analysis of grammatical.',
          hint: 'If stuck, review Class 10 "क्रिया के भेद" (especially संयुक्त क्रिया) and "सर्वनाम के.',
          misconception: '**Misconception:** "Grammar analysis means labeling every verb tense and part of speech." **Why it persists:** Class 10.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Language Usage in the Text refers to the systematic analysis of grammatical structures,',
                  options: ['Language Usage in the Text refers to the systematic analysis of grammatical structures,', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and Narrative Structure refers to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and physical environment in'],
                  hint: 'If stuck, review Class 10 "क्रिया के भेद" (especially संयुक्त क्रिया) and "सर्वनाम के भेद".',
                  misconception: '**Misconception:** "Grammar analysis means labeling every verb tense and part of speech." **Why it persists:** Class 10 board exams reward.' }
          ],
            remediations: { 'misconception-grammar-analysis-means-labeling': { steps: ['**Isolate the gap:** Give the student two sentences from the text — one narrative ("मैंने देखा"), one dialogue ("बेटा.', '**Micro-drill:** Provide a 3-sentence strip with *only* compound verbs removed (e.g., "खा लिया → खाया", "बैठ गया →.', 'Have them read both versions aloud and articulate the *felt difference* in completion vs.', '**Re-anchor to theme:** Connect the grammatical choice to the chapter\'s core tension — **tradition vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_03_012', difficulty: 'standard',
          question: 'Literal comprehension questions require answers directly stated in the text.',
          hint: 'If stuck, re-read the "Text: Plot and Narrative Structure" (node 002) and "Vocabulary.',
          misconception: 'Students believe "inferential" means "any answer not in the book is correct" – they treat inference as creative.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the author describes the junk dealer\'s son saying, "Ye meri chhoti bahen hai, iski shaadi ke liye rakha tha." The author does not comment.', answer: 'Inference: The dealer was very poor',
                  options: ['Inference: The dealer was very poor', 'He was generous', 'inferential', 'any answer not in the book is correct'],
                  hint: 'If stuck, re-read the "Text: Plot and Narrative Structure" (node 002) and "Vocabulary in Context".',
                  misconception: 'Students believe "inferential" means "any answer not in the book is correct" – they treat inference as creative writing.' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this new question on the same chapter: "List the three things the author and his team did to the window frame.', answer: 'Literal',
                  options: ['Literal', 'inferential because it needs sequencing', 'inferential', 'any answer not in the book is correct'],
                  hint: 'If stuck, re-read the "Text: Plot and Narrative Structure" (node 002) and "Vocabulary in Context".',
                  misconception: 'Students believe "inferential" means "any answer not in the book is correct" – they treat inference as creative writing.' },
                { id: 'c', prompt: 'Analyze the author\'s statement: "Natak ka kaam chal raha tha, lekin mann mein ek dar baitha hua tha." The text does not name the fear.', answer: 'The fear was that the window would not arrive/be ready in time for the play',
                  options: ['The fear was that the window would not arrive/be ready in time for the play', 'inferential', 'any answer not in the book is correct'],
                  hint: 'If stuck, re-read the "Text: Plot and Narrative Structure" (node 002) and "Vocabulary in Context".',
                  misconception: 'Students believe "inferential" means "any answer not in the book is correct" – they treat inference as creative writing.' }
          ],
            remediations: { 'inferential-means-any-answer-not': { steps: ['Give the student a 2-column table: Column A = Literal Question (answer in one sentence from text), Column.', 'Practice with 5 questions from the chapter: physically highlight the answer sentence for literal; for inferential.', 'therefore..." sentence frame: "The text says [clue 1] and [clue 2], therefore [inference]." 4.', 'Verify every inference against the "So what?" test: Does this inference change how we understand the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
