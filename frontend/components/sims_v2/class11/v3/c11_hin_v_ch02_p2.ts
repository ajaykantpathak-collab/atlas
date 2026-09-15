import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch02_p2: SimDef = {
    id: 'v3_c11_hin_v_ch02_p2',
    title: 'ikB\'kkyk tkus osQ fy, · Part 2/3',
    subtitle: 'See a pond as a village\'s constitution, not its engineering.',
    classLevel: 11, subject: 'hin_v', topic: 'ikB\'kkyk tkus osQ fy, · Part 2/3',
    chapters: ['c11_hin_v_ch02'],
    nodeIds: ['c11_hin_v_cbse_02_007', 'c11_hin_v_cbse_02_008', 'c11_hin_v_cbse_02_009', 'c11_hin_v_cbse_02_010', 'c11_hin_v_cbse_02_011', 'c11_hin_v_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village deciding who owns the rain', intro: 'Tankers queue at the municipal tap while the old johad sits dry — the difference between them was never concrete, it was cooperation.', goal: 'Read the johad system as social institution and analyse the chapter\'s inductive structure.' },
    discovery: {
        question: 'Alwar\'s johads brought dead wells back to life — so is water revival basically an engineering project?',
        options: ['No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard', 'Yes — dig the right pond and the water follows', 'Yes — runoff math is the whole problem', 'No — because johads are religious structures'],
        answer: 'No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard',
        hook: 'The pond is the easy part — historically the dominant castes controlled the water; revival worked only when women\'s jal sabhas rewrote the sharing rules.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying, often interconnected ideas in a literary text that support, complicate, or contrast with the primary theme; they emerge through recurring motifs, character.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you\'re watching a documentary about a village in Rajasthan where people build johads (earthen check dams) by hand — you notice the main story is about.',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting or parallel idea that runs through a text alongside the', outcome: 'A secondary theme is a supporting or parallel idea that runs through a text alongside the primary.' },
                { text: 'less important themes', outcome: 'Not quite — Students often confuse **secondary themes with "sub-plots" or "minor topics"** — they list elements.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'sub-plots', outcome: 'Not quite — Students often confuse **secondary themes with "sub-plots" or "minor topics"** — they list elements.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are standing barefoot on the white salt flats of the Rann of Kutch at noon — the glare hurts your eyes, the heat burns your soles, and the air.',
            decisions: [{ prompt: 'What is the definition of imagery in literature? List the five senses it can appeal to.', options: [
                { text: 'Imagery is the use of descriptive language that appeals to the five senses', outcome: 'Imagery is the use of descriptive language that appeals to the five senses — sight, sound, smell.' },
                { text: 'imagery means pictures in a book', outcome: 'Not quite — Students often think imagery only means "visual description" and miss auditory, tactile, olfactory.', reveals: 'imagery-only-means-visual-description' },
                { text: 'visual description', outcome: 'Not quite — Students often think imagery only means "visual description" and miss auditory, tactile, olfactory.', reveals: 'imagery-only-means-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you watch a blacksmith forge a strong chain, yet that same chain is used to bind his own hands—this is the central irony of the chapter.',
            decisions: [{ prompt: 'Define situational irony and give one example from the chapter where the Agarias\' labor produces an outcome opposite to what they deserve.', options: [
                { text: 'Situational irony occurs when actions produce results starkly contrary to intentions or', outcome: 'Situational irony occurs when actions produce results starkly contrary to intentions or justice.' },
                { text: 'irony means sarcasm', outcome: 'Not quite — Students conflate symbolism with imagery, treating every descriptive detail (e.g., "smoke,".', reveals: 'students-conflate-symbolism-with-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are reading the chapter and notice words like "इक्यजिकुह", "इकरिकुह", "जस्त.किकुह" and sentences like "ओक्यूबज बनाई जाती है" appearing repeatedly.',
            decisions: [{ prompt: 'Define the term "इक्यजिकुह" as used in the chapter and state its English equivalent.', options: [
                { text: '"इक्यजिकुह" refers to the topsoil layer that is fertile and suitable for cultivation,', outcome: '"इक्यजिकुह" refers to the topsoil layer that is fertile and suitable for cultivation, equivalent.' },
                { text: 'इकरिकुह', outcome: 'Not quite — Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic.', reveals: 'students-often-equate-language-usage' },
                { text: 'जस्त.किकुह', outcome: 'Not quite — Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic.', reveals: 'students-often-equate-language-usage' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see a question: "Why do laborers risk their lives building embankments in flood-prone areas?" Your first instinct.',
            decisions: [{ prompt: 'What is the fundamental difference between a literal comprehension question and an inferential comprehension question in the CBSE Class 11.', options: [
                { text: 'A literal question asks for information directly stated in the text (e.g., "What are the', outcome: 'A literal question asks for information directly stated in the text (e.g., "What are the three.' },
                { text: 'questions from the text', outcome: 'Not quite — Students believe inferential questions allow "any reasonable opinion" and treat textual evidence.', reveals: 'inferential-questions-allow-any-reasonable' },
                { text: 'any reasonable opinion', outcome: 'Not quite — Students believe inferential questions allow "any reasonable opinion" and treat textual evidence.', reveals: 'inferential-questions-allow-any-reasonable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a project on water scarcity, a student presents Anupam Mishra\'s johad chapter as \'a DIY guide to building check-dams — shapes, sizes, materials.\' A classmate asks why the chapter spends so long on village meetings and voluntary labour.',
            decisions: [{ prompt: 'What is the chapter really about?', options: [
                { text: 'Read the johad as a social contract, not a technique: the chapter documents a decentralised water democracy — shramdaan and gram sabha decisions, shared labour across caste and gender, the three water categories managed as a common-pool resource. The engineering details serve the argument that community governance, marginalized by modern administration, is what kept wells alive.', outcome: 'The project reframes: the question isn\'t \'how to build a pond\' but \'how a community sustains its water democracy\' — the meetings are the technology.' },
                { text: 'Keep the technical reading — the social passages are human-interest padding around the engineering.', outcome: 'That inverts the essay: the technique is the lens; the analysis of common-pool governance is the subject.', reveals: 'johad-is-engineering-guide' },
                { text: 'Summarise it chronologically — first canals, then johads, then borewells — as a history of water tech.', outcome: 'The text\'s plot is an architecture of persuasion, not a timeline: it deliberately places traditional johads after modern canals to create rhetorical tension.', reveals: 'nonfiction-plot-is-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'The text ends not with a policy memo but trickling streams merging into sweet water — small flows self-organising into abundance is the whole argument.',
            decisions: [{ prompt: 'What comes next? ikB\'kkyk tkus osQ fy, · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — ikB\'kkyk tkus osQ fy, · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying, often interconnected ideas in a literary.',
          hint: 'If stuck, review node 006 (Primary Theme) and practice writing the primary theme.',
          misconception: 'Students often confuse **secondary themes with "sub-plots" or "minor topics"** — they list elements like "pond.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secondary themes are the underlying, often interconnected ideas in a literary text that',
                  options: ['Secondary themes are the underlying, often interconnected ideas in a literary text that', 'Before You Read: Context and Background is a pre-reading strategy that equips students', 'Plot and Narrative Structure in non-fiction expository texts refers to the logical', 'Setting refers to the physical, temporal, and social environment in'],
                  hint: 'If stuck, review node 006 (Primary Theme) and practice writing the primary theme statement with.',
                  misconception: 'Students often confuse **secondary themes with "sub-plots" or "minor topics"** — they list elements like "pond construction process,".' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists plot points as themes: (1) Ask them to convert each noun into a complete sentence with a verb.', '(2) Have them find three textual moments where this tension appears — not just where ponds are built, but where labor\'s.', '(3) Use a two-column table: Column A = "What the text shows happening" (plot), Column B = "What this pattern suggests.', 'Practice with 2-3 clear examples from the text before independent work.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse **secondary themes with "sub-plots" or "minor topics"** — they list elements like "pond.',
          parts: [
                { id: 'a', prompt: 'Create a 4-line poetic stanza or a 3-sentence micro-narrative that embodies the secondary theme of "water as social memory" — how ponds store not just water.', answer: '**Micro-narrative:** "The old johad holds more than rain',
                  options: ['**Micro-narrative:** "The old johad holds more than rain', 'sub-plots', 'minor topics', 'pond construction process'],
                  hint: 'If stuck, review node 006 (Primary Theme) and practice writing the primary theme statement with.',
                  misconception: 'Students often confuse **secondary themes with "sub-plots" or "minor topics"** — they list elements like "pond construction process,".' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists plot points as themes: (1) Ask them to convert each noun into a complete sentence with a verb.', '(2) Have them find three textual moments where this tension appears — not just where ponds are built, but where labor\'s.', '(3) Use a two-column table: Column A = "What the text shows happening" (plot), Column B = "What this pattern suggests.', 'Practice with 2-3 clear examples from the text before independent work.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_008', difficulty: 'standard',
          question: 'Imagery is the use of vivid, sensory language that appeals to the five senses.',
          hint: 'Review the "Setting and Atmosphere" node (c11_hin_v_cbse_02_003) and practice listing.',
          misconception: 'Students often think imagery only means "visual description" and miss auditory, tactile, olfactory, and gustatory.',
          parts: [
                { id: 'a', prompt: 'What is the definition of imagery in literature? List the five senses it can appeal to.', answer: 'Imagery is the use of descriptive language that appeals to the five senses',
                  options: ['Imagery is the use of descriptive language that appeals to the five senses', 'imagery means pictures in a book', 'visual description', 'A is B'],
                  hint: 'Review the "Setting and Atmosphere" node (c11_hin_v_cbse_02_003) and practice listing sensory words.',
                  misconception: 'Students often think imagery only means "visual description" and miss auditory, tactile, olfactory, and gustatory images.' },
                { id: 'b', prompt: 'Compare the metaphors "उसफर-उसफर तसलक ओक़कन इसपहन्क एकेक गस" (mirage-like illusion) and "ओक़बज़ ओक्कज़ उस्के तय दक्स..." (salt pan separates salt from water).', answer: 'The first metaphor portrays the salt pan as an elusive, dreamlike mirage',
                  options: ['The first metaphor portrays the salt pan as an elusive, dreamlike mirage', 'visual description', 'A is B', 'A is like B'],
                  hint: 'Review the "Setting and Atmosphere" node (c11_hin_v_cbse_02_003) and practice listing sensory words.',
                  misconception: 'Students often think imagery only means "visual description" and miss auditory, tactile, olfactory, and gustatory images.' }
          ],
            remediations: { 'imagery-only-means-visual-description': { steps: ['Have the student close their eyes and listen to a 30-second audio of a busy kitchen; ask them to list every non-visual.', 'Give them two sentences: "The exam was a monster" and "The exam was like a monster"; ask which is a metaphor and why.', 'Return to the text and together annotate one paragraph, labeling each sensory image with a colored pencil (red=sight.', 'Ask them to rewrite one visual-only description from the text by adding two other senses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_009', difficulty: 'standard',
          question: 'Irony (विडंबना) is a literary device where the intended meaning of words.',
          hint: 'Revisit c11_hin_v_cbse_02_001 (Context) for Agaria socio-economic reality and.',
          misconception: 'Students conflate symbolism with imagery, treating every descriptive detail (e.g., "smoke," "hammer") as a symbol.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "underground stream" (भूमिगत नदी) functions as a symbol, not just a geographical detail. What abstract idea does it represent?', answer: 'The underground stream symbolizes the hidden, suppressed suffering and invisible',
                  options: ['The underground stream symbolizes the hidden, suppressed suffering and invisible', 'it shows water scarcity'],
                  hint: 'Revisit c11_hin_v_cbse_02_001 (Context) for Agaria socio-economic reality and c11_hin_v_cbse_02_008.',
                  misconception: 'Students conflate symbolism with imagery, treating every descriptive detail (e.g., "smoke," "hammer") as a symbol.' }
          ],
            remediations: { 'students-conflate-symbolism-with-imagery': { steps: ['Give the student two columns—"Literal Detail" vs. "Symbolic Meaning"—and have them classify 5 textual elements.', 'For irony, provide a 3-row table: "Expectation / Reality / Type of Irony" using the Agarias\' wages, the state\'s.', 'Ask them to rewrite one paragraph replacing symbols with literal language, then discuss what is lost.', 'Assign a micro-essay: "How does the chain symbolize what irony exposes?" forcing synthesis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, re-read the third and fourth paragraphs of the reference text where the author.',
          misconception: 'Students treat key terms as static definitions to memorize (e.g., "ikyjikuh = rainwater") rather than as relational.',
          parts: [
                { id: 'a', prompt: 'In the sentence "oqaQbZ dh xgjkbZ esa py jgs esgurh dke ij ogk¡ dh xjeh dk vlj iM+sxkA," the word "esgurh" modifies "dke." Using context clues from the.', answer: 'Correct answer: "esgurh" means arduous/backbreaking/grueling',
                  options: ['Correct answer: "esgurh" means arduous/backbreaking/grueling', 'difficult'],
                  hint: 'If stuck, re-read the third and fourth paragraphs of the reference text where the author explicitly.',
                  misconception: 'Students treat key terms as static definitions to memorize (e.g., "ikyjikuh = rainwater") rather than as relational concepts defined.' }
          ],
            remediations: { 'students-treat-key-terms-as': { steps: ['Have the student locate ONE key term in the text and highlight every sentence where it appears or is implicitly.', 'Ask them to write: "The author explains [term] by showing how it differs from [other term] and by describing what.', 'Give them a 3-column table: Term | Contrast Pair | Functional Description in Text.', 'Practice with ikyjikuh/ikrkyikuh/jstk.khikuh first (explicitly structured by author), then move to [khai/vkM+kd/pj[kh.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis.',
          hint: 'If stuck, review the definitions of इक्यजिकुह, इकरिकुह, जस्त.किकुह, ओक्यूबज, बाखा, फोस्पा.',
          misconception: 'Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic patterns (passive voice.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the systematic analysis of grammatical',
                  options: ['Grammar: Language Usage in the Text refers to the systematic analysis of grammatical', 'Before You Read: Context and Background is a pre-reading strategy that equips students', 'Plot and Narrative Structure in non-fiction expository texts refers to the logical', 'Setting refers to the physical, temporal, and social environment in'],
                  hint: 'If stuck, review the definitions of इक्यजिकुह, इकरिकुह, जस्त.किकुह, ओक्यूबज, बाखा, फोस्पा from the.',
                  misconception: 'Students often equate "language usage" with "difficult vocabulary" only, ignoring syntactic patterns (passive voice, clause embedding).' }
          ],
            remediations: { 'students-often-equate-language-usage': { steps: ['Have the student highlight every verb in two contrasting paragraphs (one technical, one narrative) and label each.', 'Ask them to list all nouns ending in "-इकुह" or "-आ" and break them into root + suffix.', 'Provide a short active-voice version of a technical description and ask them to convert it to passive, then discuss.', 'Finally, have them write a one-paragraph explanation of why the author\'s grammatical choices suit the text\'s purpose.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve explicitly stated.',
          hint: 'If stuck, review the soil classification section (pages 12-13) and the advance-system.',
          misconception: 'Students believe inferential questions allow "any reasonable opinion" and treat textual evidence as optional.',
          parts: [
                { id: 'a', prompt: 'In the passage, the author describes three soil types: ikyjikuh, ikrkyikuh, and jstk.khikuh.', answer: 'This is an inferential question',
                  options: ['This is an inferential question', 'any reasonable opinion'],
                  hint: 'If stuck, review the soil classification section (pages 12-13) and the advance-system description.',
                  misconception: 'Students believe inferential questions allow "any reasonable opinion" and treat textual evidence as optional decoration.' },
                { id: 'b', prompt: 'A student writes this answer to "Why do laborers continue dangerous embankment work?": "Because they are poor and need money." Using the PEEL structure.', answer: 'The answer lacks Evidence (E) and Explanation (E) from the text',
                  options: ['The answer lacks Evidence (E) and Explanation (E) from the text', 'text says so', 'any reasonable opinion'],
                  hint: 'If stuck, review the soil classification section (pages 12-13) and the advance-system description.',
                  misconception: 'Students believe inferential questions allow "any reasonable opinion" and treat textual evidence as optional decoration.' }
          ],
            remediations: { 'inferential-questions-allow-any-reasonable': { steps: ['Give the student a two-column table: Column A = Literal questions from the text (with answers), Column B = Inferential.', 'Have them highlight textual evidence in the passage for each Column B answer using two colors: one for Evidence 1.', 'Practice converting a literal question ("What is jstk.khikuh?") into an inferential one ("Why does the author call.', 'Provide a checklist: "Does my answer quote/paraphrase two distinct text segments?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
