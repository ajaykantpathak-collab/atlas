import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch06_p2: SimDef = {
    id: 'v3_c11_eng_h_ch06_p2',
    title: 'The Browning Version · Part 2/3',
    subtitle: 'Unpack a title that names both a translation and a teacher\'s hardened soul.',
    classLevel: 11, subject: 'eng_h', topic: 'The Browning Version · Part 2/3',
    chapters: ['c11_eng_h_ch06'],
    nodeIds: ['c11_eng_h_cbse_06_007', 'c11_eng_h_cbse_06_008', 'c11_eng_h_cbse_06_009', 'c11_eng_h_cbse_06_010', 'c11_eng_h_cbse_06_011', 'c11_eng_h_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a director staging a one-act play in one room', intro: 'A boy waits for a master who will never arrive — and forty compressed minutes expose twenty years of disappointment.', goal: 'Interpret the play\'s layered title and analyse how dramatic structure works through speech acts.' },
    discovery: {
        question: 'Why is the play called \'The Browning Version\'? It can\'t only be about a Greek translation.',
        options: ['It works three ways — Browning\'s Agamemnon is Crocker-Harris\'s project, and he himself is a \'browned\' version of a teacher, dried hard by disappointment', 'It refers only to the book Taplow gifts him', 'Browning wrote the play under a pseudonym', 'It is the school\'s motto, borrowed from Browning'],
        answer: 'It works three ways — Browning\'s Agamemnon is Crocker-Harris\'s project, and he himself is a \'browned\' version of a teacher, dried hard by disappointment',
        hook: 'The gift lands because the title was always about him — a man translated into a harder version of himself, finally read kindly.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are subsidiary ideas or motifs that run alongside the primary theme, enriching the text by exploring complementary or contrasting aspects of human experience.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track how a single room, a few visitors and some dialogue build a lifetime of failure — then place the true climax: the gift, or the final speech.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re trekking through a mountain pass — the main path (primary theme) gets you to the destination, but the side trails (secondary themes) reveal.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subsidiary idea that runs parallel to the primary theme, exploring', outcome: 'A secondary theme is a subsidiary idea that runs parallel to the primary theme, exploring.' },
                { text: 'less important themes', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" — listing things like.', reveals: 'students-often-treat-secondary-themes' },
                { text: 'list the themes', outcome: 'Not quite — Students often treat secondary themes as "sub-plots" or "minor topics" — listing things like.', reveals: 'students-often-treat-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are watching a scene where a tired teacher sits alone in a dusty classroom, tapping a ruler on a desk — the sound echoes like a heartbeat in.',
            decisions: [{ prompt: 'Define "organic imagery" and give one example from "The Browning Version" (describe the scene, do not quote).', options: [
                { text: 'Organic imagery appeals to internal bodily sensations (hunger, thirst, fatigue, nausea,', outcome: 'Organic imagery appeals to internal bodily sensations (hunger, thirst, fatigue, nausea, heartbeat).' },
                { text: 'imagery about nature', outcome: 'Not quite — Students believe "imagery = only visual description" and "metaphor = any comparison".', reveals: 'imagery-only-visual-description-and' },
                { text: 'organic', outcome: 'Not quite — Students believe "imagery = only visual description" and "metaphor = any comparison".', reveals: 'imagery-only-visual-description-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading the play and come across the word "agog" in Taplow\'s line: "I\'m agog to know." You don\'t know the word, but you notice the context:.',
            decisions: [{ prompt: 'What is the primary strategy for inferring the meaning of an unfamiliar word in a literary text like "The Browning Version"?', options: [
                { text: 'The primary strategy is to use context clues—words, phrases, or sentences surrounding the', outcome: 'The primary strategy is to use context clues—words, phrases, or sentences surrounding the.' },
                { text: 'look it up in a dictionary immediately', outcome: 'Not quite — Students often think vocabulary in context means memorizing dictionary definitions of difficult.', reveals: 'vocabulary-in-context-means-memorizing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you\'re reading a friend\'s travel blog about a Himalayan road trip — you notice they write "The road wound up the mountain" not "The mountain was wound.',
            decisions: [{ prompt: 'Identify the grammatical term for the underlined structure in this sentence from the text: "Tsetan sized me up as we clambered into his.', options: [
                { text: 'The underlined structure "as we clambered into his car" is a **subordinate adverbial', outcome: 'The underlined structure "as we clambered into his car" is a **subordinate adverbial clause.' },
                { text: 'as we clambered into his car', outcome: 'Not quite — Students believe "language usage" means listing grammatical labels (e.g., "this is a past tense.', reveals: 'language-usage-means-listing-grammatical' },
                { text: 'language usage', outcome: 'Not quite — Students believe "language usage" means listing grammatical labels (e.g., "this is a past tense.', reveals: 'language-usage-means-listing-grammatical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are reading a friend\'s travel blog about a trip to Ladakh.',
            decisions: [{ prompt: 'What is the primary difference between a literal comprehension question and an inferential comprehension question?', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "At what', outcome: 'A literal question asks for information directly stated in the text (e.g., "At what altitude did.' },
                { text: 'They write vague responses like', outcome: 'Not quite — Students often believe inferential questions have no "right" answer because they are "just.', reveals: 'inferential-questions-have-no-right' },
                { text: 'without citing the line', outcome: 'Not quite — Students often believe inferential questions have no "right" answer because they are "just.', reveals: 'inferential-questions-have-no-right' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school\'s drama fest you\'re directing a scene from \'The Browning Version\'. The actor playing Crocker-Harris asks: \'Why should I care that this is a 1940s British public school or that Rattigan lived a double life? Lines are lines — just tell me where to stand.\'',
            decisions: [{ prompt: 'Why does that context matter to the performance?', options: [
                { text: 'Because context is the interpretive lens, not trivia: 1940s public-school hierarchy explains why the classics master must perform emotional armour, and Rattigan\'s own repressed life in a criminalising era illuminates why Crocker-Harris cannot accept Taplow\'s small act of affection. The facts answer \'so what does he hide and why\'.', outcome: 'Learn context FOR the play, not ABOUT it: every fact earns its place only when it changes how a line is played.' },
                { text: 'The actor is right — biography and period details are exam trivia, irrelevant to delivering lines.', outcome: 'Flat delivery results: without the era\'s emotional repression, Taplow\'s gift reads as a minor prop instead of the play\'s seismic moment of being \'seen\'.', reveals: 'context-is-trivia' },
                { text: 'Update the scene to a modern Indian school — context is replaceable and the emotion stays identical.', outcome: 'The emotional logic isn\'t portable: forced retirement, classics\' decline and institutional coldness in 1948 Britain are the machinery producing his despair.', reveals: 'context-is-replaceable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_012', title: 'The bigger picture',
          caseStudy: { intro: 'In a one-act play, structure is character — every entrance forces someone to reveal what they\'d rather hide.',
            decisions: [{ prompt: 'What comes next? The Browning Version · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Browning Version · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_007', difficulty: 'standard',
          question: 'Secondary themes are subsidiary ideas or motifs that run alongside the primary.',
          hint: 'If stuck, review c11_eng_h_cbse_06_006 worked examples — practice writing the primary.',
          misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" — listing things like "dogs," "altitude," "tea,".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are subsidiary ideas or motifs that run alongside the primary theme,',
                  options: ['Secondary themes are subsidiary ideas or motifs that run alongside the primary theme,', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in drama refers to the arrangement of events and actions in', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review c11_eng_h_cbse_06_006 worked examples — practice writing the primary theme.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" — listing things like "dogs," "altitude," "tea," "Norbu" as separate.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student create a two-column table: Column A = concrete detail from text (e.g., "mastiffs chase car"), Column.', 'Practice with 5 details from "Silk Road" and 5 from "Father to Son." 3.', 'Then cluster Column B entries into 3-4 theme groups.', 'Finally, write one PEEL paragraph per cluster using two Column A details as Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" — listing things like "dogs," "altitude," "tea,".',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The secondary theme of \'altitude sickness and physical suffering\' in \'Silk Road\' is just realistic detail — it doesn\'t connect.', answer: '**Refute.** The physical suffering *is* the crucible of the spiritual journey',
                  options: ['**Refute.** The physical suffering *is* the crucible of the spiritual journey', 'list the themes'],
                  hint: 'If stuck, review c11_eng_h_cbse_06_006 worked examples — practice writing the primary theme.',
                  misconception: 'Students often treat secondary themes as "sub-plots" or "minor topics" — listing things like "dogs," "altitude," "tea," "Norbu" as separate.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student create a two-column table: Column A = concrete detail from text (e.g., "mastiffs chase car"), Column.', 'Practice with 5 details from "Silk Road" and 5 from "Father to Son." 3.', 'Then cluster Column B entries into 3-4 theme groups.', 'Finally, write one PEEL paragraph per cluster using two Column A details as Evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review "sensory modality classification" — practice labeling each adjective in.',
          misconception: 'Students believe "imagery = only visual description" and "metaphor = any comparison".',
          parts: [
                { id: 'a', prompt: 'Explain the difference between a *simple metaphor* and an *extended metaphor* using examples from the play (describe, don\'t quote).', answer: 'A simple metaphor makes a single comparison in one line (e.g., Taplow calling',
                  options: ['A simple metaphor makes a single comparison in one line (e.g., Taplow calling', 'just metaphors', 'imagery = only visual description', 'metaphor = any comparison'],
                  hint: 'Review "sensory modality classification" — practice labeling each adjective in a descriptive.',
                  misconception: 'Students believe "imagery = only visual description" and "metaphor = any comparison".' },
                { id: 'b', prompt: 'In the scene where Frank says, "You\'re not a human being, you\'re a — a *corpse*", identify the metaphor\'s tenor and vehicle.', answer: 'Tenor = Crocker-Harris',
                  options: ['Tenor = Crocker-Harris', 'analyze the effectiveness', 'imagery = only visual description', 'metaphor = any comparison'],
                  hint: 'Review "sensory modality classification" — practice labeling each adjective in a descriptive.',
                  misconception: 'Students believe "imagery = only visual description" and "metaphor = any comparison".' },
                { id: 'c', prompt: 'Compare the visual imagery of the "dusty classroom" (Act One) with the "spring sunlight" at the end (Act Two).', answer: 'Act One: "dust," "shadows," "faded maps," "cracked inkwell"',
                  options: ['Act One: "dust," "shadows," "faded maps," "cracked inkwell"', 'imagery = only visual description', 'metaphor = any comparison', '"imagery = only visual description" and "metaphor = any comparison"'],
                  hint: 'Review "sensory modality classification" — practice labeling each adjective in a descriptive.',
                  misconception: 'Students believe "imagery = only visual description" and "metaphor = any comparison".' }
          ],
            remediations: { 'imagery-only-visual-description-and': { steps: ['Have the student close their eyes and read aloud Crocker-Harris\'s first monologue — ask: "What do you *hear*?', 'What do you *feel in your chest*?" 2.', 'Give them a two-column table: "Explicit Metaphor" vs "Implied Metaphor" — fill three rows together from the text.', 'Assign: "Rewrite the \'dusty classroom\' description using *only* sound, smell, and touch words." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_009', difficulty: 'standard',
          question: 'Irony in literature is a contrast between expectation and reality, where the.',
          hint: 'Re-read the Taplow-Crocker-Harris scene (Act 1) and the final gift-giving moment.',
          misconception: 'Students often treat every unexpected event as "irony" (e.g., "It\'s ironic that Taplow likes the strict teacher").',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irony in literature is a contrast between expectation and reality, where the intended',
                  options: ['Irony in literature is a contrast between expectation and reality, where the intended', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in drama refers to the arrangement of events and actions in', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Re-read the Taplow-Crocker-Harris scene (Act 1) and the final gift-giving moment; annotate every.',
                  misconception: 'Students often treat every unexpected event as "irony" (e.g., "It\'s ironic that Taplow likes the strict teacher").' }
          ],
            remediations: { 'students-often-treat-every-unexpected': { steps: ['Give the student three index cards labelled VERBAL, SITUATIONAL, DRAMATIC.', 'Read aloud five moments from the play (e.g., Crocker-Harris\'s "popular" remark; the Headmaster\'s early pension cut.', 'Ask the student to hold up the correct card for each and articulate the *contradiction* (words vs.', 'If they mis-sort, ask: "What does the audience know that the speaker doesn\'t?" or "What did the character expect would.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_010', difficulty: 'standard',
          question: 'Vocabulary in Context: Key Words refers to the skill of inferring the meaning.',
          hint: 'If stuck, review Class 10 vocabulary-in-context node c10_engl_cbse_02_009 (Mandela.',
          misconception: 'Students often think vocabulary in context means memorizing dictionary definitions of difficult words from the play.',
          parts: [
                { id: 'a', prompt: 'Apply the context-clue strategy to infer the meaning of "mucking about" as used by Taplow: "I suppose I\'m just mucking about." The preceding lines show Taplow.', answer: 'Meaning: wasting time or behaving aimlessly',
                  options: ['Meaning: wasting time or behaving aimlessly', 'playing in mud'],
                  hint: 'If stuck, review Class 10 vocabulary-in-context node c10_engl_cbse_02_009 (Mandela speech) and.',
                  misconception: 'Students often think vocabulary in context means memorizing dictionary definitions of difficult words from the play.' },
                { id: 'b', prompt: 'Analyze how the playwright uses the phrase "the Browning Version" (referring to Taplow\'s translation of Aeschylus) to convey both literal and ironic meanings.', answer: 'Literally, it is Taplow\'s translation of Agamemnon',
                  options: ['Literally, it is Taplow\'s translation of Agamemnon', 'Oh, the Browning Version', 'not very good'],
                  hint: 'If stuck, review Class 10 vocabulary-in-context node c10_engl_cbse_02_009 (Mandela speech) and.',
                  misconception: 'Students often think vocabulary in context means memorizing dictionary definitions of difficult words from the play.' }
          ],
            remediations: { 'vocabulary-in-context-means-memorizing': { steps: ['If a student falls back on memorization, guide them through a three-step drill: (1) Pick any unfamiliar word from the.', '(2) Cover the dictionary; write down the sentence it appears in plus the two sentences before and after.', '(3) Highlight every clue (tone, contrast, character reaction) and write a one-sentence inference.', 'Repeat with five words until they see patterns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis of how.',
          hint: 'Review "Finite vs Non-finite Clauses" and "Tense-Aspect System in Narrative" from Class.',
          misconception: 'Students believe "language usage" means listing grammatical labels (e.g., "this is a past tense verb") without.',
          parts: [
                { id: 'a', prompt: 'Compare the two reported-speech constructions: (i) "I told her, through Daniel, that I was heading towards Mount Kailash" and (ii) "It\'s a cold," he said.', answer: 'In (i), "through Daniel" is an **adverbial of means** modifying "told"',
                  options: ['In (i), "through Daniel" is an **adverbial of means** modifying "told"', 'language usage', 'this is a past tense verb', '"language usage" means listing grammatical labels (e'],
                  hint: 'Review "Finite vs Non-finite Clauses" and "Tense-Aspect System in Narrative" from Class 10 Grammar.',
                  misconception: 'Students believe "language usage" means listing grammatical labels (e.g., "this is a past tense verb") without explaining **why that form.' }
          ],
            remediations: { 'language-usage-means-listing-grammatical': { steps: ['Give the student a two-column table: Column A = grammatical feature (e.g., "participial phrase"), Column B = textual.', 'Model one row together: "Having opened his door, Tsetan jumped out" → fronted participial phrase creates simultaneity.', 'Student completes three more rows from the text.', 'Student writes one 40-word answer linking a feature to narrative purpose using the frame: "The writer uses [feature].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_012', difficulty: 'standard',
          question: 'Literal comprehension involves retrieving information explicitly stated in the.',
          hint: 'If stuck, review the plot summary (c11_eng_h_cbse_06_002) and character profiles.',
          misconception: 'Students often believe inferential questions have no "right" answer because they are "just opinions." They write vague.',
          parts: [
                { id: 'a', prompt: 'In the passage, the author describes the Tibetan mastiffs as "shaggy monsters, blacker than the darkest night." If a question asks, "What does the phrase.', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'They write vague responses like', 'without citing the line', 'I wasn\'t convinced that the other would provide me with sufficient oxygen'],
                  hint: 'If stuck, review the plot summary (c11_eng_h_cbse_06_002) and character profiles.',
                  misconception: 'Students often believe inferential questions have no "right" answer because they are "just opinions." They write vague responses like "The.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer this literal question using the text: "What did Tsetan do when the car reached the snow patch at 5,210 metres?" Provide the.', answer: 'Point: Tsetan assessed the snow patch and cleared it for driving',
                  options: ['Point: Tsetan assessed the snow patch and cleared it for driving', 'They write vague responses like', 'without citing the line', 'I wasn\'t convinced that the other would provide me with sufficient oxygen'],
                  hint: 'If stuck, review the plot summary (c11_eng_h_cbse_06_002) and character profiles.',
                  misconception: 'Students often believe inferential questions have no "right" answer because they are "just opinions." They write vague responses like "The.' },
                { id: 'c', prompt: 'Analyze the following inferential question: "Why does the author say his experience at Hor was in \'stark contrast\' to earlier travellers\' accounts?" Identify.', answer: 'Evidence 1: The author describes Hor as "grim, miserable place',
                  options: ['Evidence 1: The author describes Hor as "grim, miserable place', 'They write vague responses like', 'without citing the line', 'I wasn\'t convinced that the other would provide me with sufficient oxygen'],
                  hint: 'If stuck, review the plot summary (c11_eng_h_cbse_06_002) and character profiles.',
                  misconception: 'Students often believe inferential questions have no "right" answer because they are "just opinions." They write vague responses like "The.' }
          ],
            remediations: { 'inferential-questions-have-no-right': { steps: ['Give the student a short paragraph from "Silk Road" and three questions: one literal, one inferential, one opinion.', 'Have them label each and highlight the text evidence for the first two.', 'For the inferential, guide them to write: "The text says X, which suggests Y because Z." 4.', 'Practice this "Evidence → Inference → Justification" scaffold daily until they automatically seek textual anchors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
