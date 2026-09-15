import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_k_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_k_ch14_p2: SimDef = {
    id: 'v3_c12_eng_k_ch14_p2',
    title: 'Chasing the Rainbow (Non-fiction) · Part 2/3',
    subtitle: 'Two essays, one word \'freedom,\' opposite wars',
    classLevel: 12, subject: 'eng_k', topic: 'Chasing the Rainbow (Non-fiction) · Part 2/3',
    chapters: ['c12_eng_k_ch14'],
    nodeIds: ['c12_eng_k_cbse_14_007', 'c12_eng_k_cbse_14_008', 'c12_eng_k_cbse_14_009', 'c12_eng_k_cbse_14_010', 'c12_eng_k_cbse_14_011', 'c12_eng_k_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Essayist-critic', intro: 'A socialist playwright and a man who refused to be anyone\'s guru both wrote about freedom — and meant entirely different things.', goal: 'Contrast Shaw\'s socio-economic freedom with Krishnamurti\'s psychological freedom, and the historical moments that shaped each.' },
    discovery: {
        question: 'Shaw says discipline can enslave; Krishnamurti says discipline is a prison. A student concludes \'they agree — both hate discipline.\' What\'s flattened?',
        options: ['Different targets — Shaw attacks economic coercion and wants just laws; Krishnamurti attacks psychological conformity and wants no external authority at all', 'Nothing — same word, same idea', 'Shaw actually loves discipline', 'Krishnamurti wants stricter schools'],
        answer: 'Different targets — Shaw attacks economic coercion and wants just laws; Krishnamurti attacks psychological conformity and wants no external authority at all',
        hook: 'Same word, different war: a Fabian socialist in Depression-era Britain fights \'wage slavery\' with structural reform; a teacher who rejected guruhood fights \'conditioning\' in the mind. Freedom for Shaw is fair distribution; for Krishnamurti it\'s self-awakened intelligence. History wrote their definitions.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, concerns, or motifs that run alongside the primary theme in a text, enriching its meaning and providing additional layers of interpretation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_k_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run two definitions of freedom side by side: trace Shaw\'s natural vs unnatural slavery and his jab at voting between \'two rich friends,\' then test Krishnamurti\'s claim that discipline and freedom can\'t share a mind.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are reading a newspaper editorial about "freedom of speech" — the main argument is clear, but as you read, you notice the writer also touches.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in a non-fiction text?', options: [
                { text: 'A secondary theme is a significant but subordinate idea that recurs throughout a text,', outcome: 'A secondary theme is a significant but subordinate idea that recurs throughout a text.' },
                { text: 'the main message of the text', outcome: 'Not quite — Students often think "secondary theme" means "any other topic mentioned in the text." They list.', reveals: 'secondary-theme-means-any-other' },
                { text: 'secondary theme', outcome: 'Not quite — Students often think "secondary theme" means "any other topic mentioned in the text." They list.', reveals: 'secondary-theme-means-any-other' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading a speech about "freedom" but the speaker never uses the word "freedom" — instead, they describe a bird in a cage, a prisoner breaking.',
            decisions: [{ prompt: 'Define "metaphor" and distinguish it from "simile" using the exact terminology expected in a CBSE Class 12 answer.', options: [
                { text: 'A metaphor is a direct comparison between two unlike things where one thing *is* said to', outcome: 'A metaphor is a direct comparison between two unlike things where one thing *is* said to be the.' },
                { text: 'metaphor uses like or as', outcome: 'Not quite — Students often treat imagery and metaphor as **decoration** — "the author used a metaphor to make.', reveals: 'students-often-treat-imagery-and' },
                { text: 'identifying the device', outcome: 'Not quite — Students often treat imagery and metaphor as **decoration** — "the author used a metaphor to make.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you\'re reading a political speech where the leader says "We\'re fighting for peace by dropping bombs" — you instantly sense the contradiction.',
            decisions: [{ prompt: 'Define verbal irony and give one example from Shaw\'s "Freedom" where the author says the opposite of what he means to criticize a political.', options: [
                { text: 'Verbal irony occurs when a speaker intentionally says something that contradicts their', outcome: 'Verbal irony occurs when a speaker intentionally says something that contradicts their true.' },
                { text: 'Irony is when something funny happens', outcome: 'Not quite — Students consistently confuse **irony** with **sarcasm** or **coincidence**.', reveals: 'students-consistently-confuse-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading Shaw\'s essay and encounter the phrase "wage slavery" — you know "wage" and "slavery" separately, but together they carry a sharp.',
            decisions: [{ prompt: 'What is the primary meaning of the word "shirk" as used in Shaw\'s sentence: "These natural jobs cannot be shirked"?', options: [
                { text: 'In this context, "shirk" means "to avoid or neglect a duty or responsibility."', outcome: 'In this context, "shirk" means "to avoid or neglect a duty or responsibility." A wrong answer like.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students often treat "vocabulary in context" as "guess the meaning from surrounding words" and stop.', reveals: 'students-often-treat-vocabulary-in' },
                { text: 'reveals the student is guessing from sound-alike words (e.g', outcome: 'Not quite — Students often treat "vocabulary in context" as "guess the meaning from surrounding words" and stop.', reveals: 'students-often-treat-vocabulary-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are listening to a powerful speech: the speaker uses long, winding sentences to build a case, then suddenly fires short, sharp questions that don’t.',
            decisions: [{ prompt: 'Define simple, complex, and compound sentences. Give one example of each from the "Freedom" text (cite the sentence or its first few words).', options: [
                { text: '**Correct answer:** - Simple: one finite verb, one clause', outcome: '**Correct answer:** - Simple: one finite verb, one clause. Example: “Nature is kind to her slaves.”.' },
                { text: 'As we must eat we must first provide food', outcome: 'Not quite — Students consistently confuse **compound** and **complex** sentences because both contain.', reveals: 'students-consistently-confuse-compound-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re reading Shaw\'s essay and a question asks: "How many hours does Shaw say we spend sleeping?" — that\'s literal, the answer is right there.',
            decisions: [{ prompt: 'Identify whether the following question is literal or inferential: "According to Shaw, what fraction of our lifetime do we spend sleeping?"', options: [
                { text: 'Literal', outcome: 'Literal. The answer ("one third") is explicitly stated in the opening paragraph of Shaw\'s essay.' },
                { text: 'inferential', outcome: 'Not quite — Students believe inferential questions have "no right answer" or that "any opinion backed by.', reveals: 'inferential-questions-have-no-right' },
                { text: 'hidden meaning', outcome: 'Not quite — Students believe inferential questions have "no right answer" or that "any opinion backed by.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A firm advertises \'total freedom at work\' while wages force everyone into overtime obedience; meanwhile a visiting guru sells \'inner liberation\' workshops to the same exhausted staff.',
            decisions: [{ prompt: 'Shaw and Krishnamurti would diagnose this how?', options: [
                { text: 'Two different cages — Shaw\'s \'wage slavery\' names the economic chain, Krishnamurti\'s \'conditioning\' names the psychological one; fix the pay structure AND the mind, neither talk alone liberates.', outcome: 'Outer constraint and inner conditioning are separate problems; a mindfulness seminar can\'t shorten a workday.' },
                { text: 'The guru is right — freedom is an inner state, so circumstances don\'t matter.', outcome: 'That\'s Krishnamurti without Shaw; the wage chain binds regardless of how free the mind feels.', reveals: 'inner-freedom-fixes-outer-chains' },
                { text: 'Only the law matters — pass rules and freedom follows automatically.', outcome: 'Shaw himself mocks that faith; conditioning survives rulebooks, which is why both diagnoses are needed.', reveals: 'rules-create-freedom' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_k_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue freedom on two axes — the economic and the psychological — and spot when identical words hide opposite arguments.',
            decisions: [{ prompt: 'What comes next? Chasing the Rainbow (Non-fiction) · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chasing the Rainbow (Non-fiction) · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, concerns, or motifs that run.',
          hint: 'If stuck, review the "Primary Theme and Message" node (c12_eng_k_cbse_14_006) and.',
          misconception: 'Students often think "secondary theme" means "any other topic mentioned in the text." They list random subjects (e.g.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying ideas, concerns, or motifs that run alongside the',
                  options: ['Secondary themes are the underlying ideas, concerns, or motifs that run alongside the', 'Before You Read: Context and Background is a pre-reading strategy where students', 'In non-fiction, **plot** refers to the logical sequence of ideas, arguments, or events', 'Setting in non-fiction refers to the historical, cultural, and immediate context of the'],
                  hint: 'If stuck, review the "Primary Theme and Message" node (c12_eng_k_cbse_14_006) and practice writing.',
                  misconception: 'Students often think "secondary theme" means "any other topic mentioned in the text." They list random subjects (e.g., "sleep," "voting,".' }
          ],
            remediations: { 'secondary-theme-means-any-other': { steps: ['Revisit node c12_eng_k_cbse_14_006 (Primary Theme) to solidify the concept of thematic hierarchy.', 'Re-read both essays with a highlighter, marking every paragraph that discusses *how people are controlled* (not just.', 'Group highlights into 3-4 clusters; each cluster is a candidate secondary theme.', 'Test each: "Does the author return to this?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "any other topic mentioned in the text." They list random subjects (e.g.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Krishnamurti\'s concept of freedom is more radical than Shaw\'s because it rejects all forms of authority, including the authority.', answer: 'The statement is partially true but reductive',
                  options: ['The statement is partially true but reductive', 'true freedom requires critical self-awareness, not mere rebellion', 'anti-reason', 'secondary theme'],
                  hint: 'If stuck, review the "Primary Theme and Message" node (c12_eng_k_cbse_14_006) and practice writing.',
                  misconception: 'Students often think "secondary theme" means "any other topic mentioned in the text." They list random subjects (e.g., "sleep," "voting,".' },
                { id: 'b', prompt: 'Write a 50-word paragraph that introduces a secondary theme of your choice from the chapter, using a rhetorical question (as Krishnamurti does) to engage the.', answer: 'Example: "Do we mistake the right to vote for the reality of freedom?',
                  options: ['Example: "Do we mistake the right to vote for the reality of freedom?', 'secondary theme', 'any other topic mentioned in the text', 'voting'],
                  hint: 'If stuck, review the "Primary Theme and Message" node (c12_eng_k_cbse_14_006) and practice writing.',
                  misconception: 'Students often think "secondary theme" means "any other topic mentioned in the text." They list random subjects (e.g., "sleep," "voting,".' }
          ],
            remediations: { 'secondary-theme-means-any-other': { steps: ['Revisit node c12_eng_k_cbse_14_006 (Primary Theme) to solidify the concept of thematic hierarchy.', 'Re-read both essays with a highlighter, marking every paragraph that discusses *how people are controlled* (not just.', 'Group highlights into 3-4 clusters; each cluster is a candidate secondary theme.', 'Test each: "Does the author return to this?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'If stuck, review the "Metaphor Mapping" exercise from Class 11 Hornbill Chapter 1.',
          misconception: 'Students often treat imagery and metaphor as **decoration** — "the author used a metaphor to make it beautiful".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Imagery is the use of vivid, sensory language that appeals to the five senses (sight,',
                  options: ['Imagery is the use of vivid, sensory language that appeals to the five senses (sight,', 'Before You Read: Context and Background is a pre-reading strategy where students', 'In non-fiction, **plot** refers to the logical sequence of ideas, arguments, or events', 'Setting in non-fiction refers to the historical, cultural, and immediate context of the'],
                  hint: 'If stuck, review the "Metaphor Mapping" exercise from Class 11 Hornbill Chapter 1.',
                  misconception: 'Students often treat imagery and metaphor as **decoration** — "the author used a metaphor to make it beautiful" — rather than.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['If a student cannot move beyond identification, do this 3-step remediation: 1.', '**Revisit the "Metaphor Mapping" template** (from c11_eng_h_cbse_01_008 / c11_eng_s_cbse_01_008): draw two columns.', '**Re-read the "Stop and Think" questions** in the NCERT text (pp.', '124, 127, 131) — each is designed to force metaphor analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or situations.',
          hint: 'If stuck, review the "Irony vs Sarcasm vs Coincidence" distinction.',
          misconception: 'Students consistently confuse **irony** with **sarcasm** or **coincidence**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony is a literary device where the intended meaning of words or situations contradicts',
                  options: ['Irony is a literary device where the intended meaning of words or situations contradicts', 'Before You Read: Context and Background is a pre-reading strategy where students', 'In non-fiction, **plot** refers to the logical sequence of ideas, arguments, or events', 'Setting in non-fiction refers to the historical, cultural, and immediate context of the'],
                  hint: 'If stuck, review the "Irony vs Sarcasm vs Coincidence" distinction in c11_eng_h_cbse_01_009 and the.',
                  misconception: 'Students consistently confuse **irony** with **sarcasm** or **coincidence**.' }
          ],
            remediations: { 'students-consistently-confuse-irony-with': { steps: ['If the student cannot distinguish irony types or explain symbolic function: 1.', 'Revisit **c11_eng_h_cbse_01_009** (Class 11 Irony and Symbolism) — focus on the "Stop and Think" questions there.', 'Do a **device-mapping exercise**: Create a two-column table.', 'Column A: Quote from Shaw/Krishnamurti.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, revisit the "Stop and Think" questions in the NCERT text — they directly target.',
          misconception: 'Students often treat "vocabulary in context" as "guess the meaning from surrounding words" and stop at a synonym.',
          parts: [
                { id: 'a', prompt: 'What is the primary meaning of the word "shirk" as used in Shaw\'s sentence: "These natural jobs cannot be shirked"?', answer: 'In this context, "shirk" means "to avoid or neglect a duty or responsibility."',
                  options: ['In this context, "shirk" means "to avoid or neglect a duty or responsibility."', 'A wrong answer like', 'reveals the student is guessing from sound-alike words (e.g', 'colloquially) rather than analyzing the sentence structure'],
                  hint: 'If stuck, revisit the "Stop and Think" questions in the NCERT text — they directly target the.',
                  misconception: 'Students often treat "vocabulary in context" as "guess the meaning from surrounding words" and stop at a synonym.' },
                { id: 'b', prompt: 'Explain the difference in connotation between "chattel slavery" and "wage slavery" as Shaw uses them in the paragraph beginning "When chattel slavery of the.', answer: '"Chattel slavery" denotes legal ownership of human beings as property',
                  options: ['"Chattel slavery" denotes legal ownership of human beings as property', 'both mean forced labour'],
                  hint: 'If stuck, revisit the "Stop and Think" questions in the NCERT text — they directly target the.',
                  misconception: 'Students often treat "vocabulary in context" as "guess the meaning from surrounding words" and stop at a synonym.' }
          ],
            remediations: { 'students-often-treat-vocabulary-in': { steps: ['Have the student re-read the specific paragraph containing the word, highlighting every clause that modifies.', 'Ask: "What is the author *arguing* in this paragraph?" and "How does this word serve that argument?" 3.', 'Student writes two sentences: one using the word in the author\'s sense, one using it in a modern Indian context (e.g.', 'Re-diagnose with a fresh context sentence from an unseen non-fiction passage.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic study of how.',
          hint: 'If stuck, review **c6_english_u4_038** (Sentence Structure and Types of Sentences) and.',
          misconception: 'Students consistently confuse **compound** and **complex** sentences because both contain conjunctions.',
          parts: [
                { id: 'a', prompt: 'Define simple, complex, and compound sentences. Give one example of each from the "Freedom" text (cite the sentence or its first few words).', answer: '**Correct answer:** - Simple: one finite verb, one clause',
                  options: ['**Correct answer:** - Simple: one finite verb, one clause', 'As we must eat we must first provide food'],
                  hint: 'If stuck, review **c6_english_u4_038** (Sentence Structure and Types of Sentences) and do the.',
                  misconception: 'Students consistently confuse **compound** and **complex** sentences because both contain conjunctions.' }
          ],
            remediations: { 'students-consistently-confuse-compound-and': { steps: ['**Revisit clause identification:** Go back to **c6_english_u4_038** (Sentence Structure and Types of Sentences).', 'Practice: take 10 sentences from any newspaper, underline every finite verb, bracket each clause, label.', '**Conjunction sort:** Make two columns — Coordinators (*and, but, or, so, yet, for, nor*) vs.', 'Subordinators (*because, although, if, when, as, since, while*).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_k_cbse_14_012', difficulty: 'standard',
          question: 'Literal comprehension involves retrieving explicitly stated information from.',
          hint: 'If unable to separate literal from inferential, practice with Class 7 nodes.',
          misconception: 'Students believe inferential questions have "no right answer" or that "any opinion backed by a quote works.".',
          parts: [
                { id: 'a', prompt: 'Identify whether the following question is literal or inferential: "According to Shaw, what fraction of our lifetime do we spend sleeping?"', answer: 'Literal',
                  options: ['Literal', 'inferential', 'hidden meaning', 'no right answer'],
                  hint: 'If unable to separate literal from inferential, practice with Class 7 nodes (c11_engl_ch01_009.',
                  misconception: 'Students believe inferential questions have "no right answer" or that "any opinion backed by a quote works." In reality, CBSE marking.' },
                { id: 'b', prompt: 'Apply the literal/inferential distinction to this new question on Shaw\'s text: "What does Shaw mean when he writes \'Nature is kind to her slaves\'?" Provide.', answer: 'Shaw means natural necessities (eating, sleeping, reproduction) are biologically',
                  options: ['Shaw means natural necessities (eating, sleeping, reproduction) are biologically', 'Evidence 2', 'Nature treats us well', 'no right answer'],
                  hint: 'If unable to separate literal from inferential, practice with Class 7 nodes (c11_engl_ch01_009.',
                  misconception: 'Students believe inferential questions have "no right answer" or that "any opinion backed by a quote works." In reality, CBSE marking.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['If a student conflates literal/inferential or produces unsupported inferences: (1) Give them a 5-question sort: 3.', '(2) Use Shaw\'s "Nature is kind to her slaves" — model the inference chain: Quote A + Quote B → Contrast → Inference.', '(3) Re-diagnose with a fresh inferential question on Krishnamurti\'s "villagers" passage; require three distinct.', 'If still stuck, revisit c11_eng_h_cbse_01_012 (Class 11 Hornbill comprehension) for scaffolded practice.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
