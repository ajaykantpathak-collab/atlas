import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch10_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch10_p1',
    title: 'èkeZohj Hkkjrh · Part 1/3',
    subtitle: 'A poet wrote prose so a servant\'s life would count',
    classLevel: 12, subject: 'hin_ar', topic: 'èkeZohj Hkkjrh · Part 1/3',
    chapters: ['c12_hin_ar_ch10'],
    nodeIds: ['c12_hin_ar_cbse_10_001', 'c12_hin_ar_cbse_10_002', 'c12_hin_ar_cbse_10_003', 'c12_hin_ar_cbse_10_004', 'c12_hin_ar_cbse_10_005', 'c12_hin_ar_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi sketch-reader', intro: 'From a collection of remembered lives, one woman steps forward — and a child\'s eye becomes the sharpest lens on inequality.', goal: 'Read the sketch through Mahadevi Verma\'s reformist lens — caste, gender and the child\'s innocent gaze.' },
    discovery: {
        question: 'A servant-woman, married at five, widowed young, speaks in village dialect inside a professor\'s household. Why did a poet famous for Chhayavad lyrics choose to record her?',
        options: ['Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change', 'She needed a memoir chapter', 'Servants make easy characters', 'Poetry didn\'t sell'],
        answer: 'Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change',
        hook: 'Don\'t read it as just a sad servant story — the context stages a power binary (master-servant, caste, literacy) that the child\'s innocent gaze both reveals and unsettles. The Avadhi dialect she speaks is authenticity itself: identity recorded with respect, not corrected.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" is a pre-reading section that provides essential information about the author (Mahadevi Verma), the source of the text (her autobiographical sketch.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you open your Hindi textbook to Chapter 10 and see the title “HkfDru” by Mahadevi Verma.',
            decisions: [{ prompt: '**REMEMBER:** Who is the author of *HkfDru* and what is the source collection of this sketch?', options: [
                { text: 'The author is Mahadevi Verma (1907–1987), a major Hindi poet and social reformer', outcome: 'The author is Mahadevi Verma (1907–1987), a major Hindi poet and social reformer.' },
                { text: 'Before You Read', outcome: 'Not quite — Students often treat the “Before You Read” section as optional background trivia and skip it.', reveals: 'students-often-treat-the-before' },
                { text: 'another author like Premchand or citing a different book like *Yama*', outcome: 'Not quite — Students often treat the “Before You Read” section as optional background trivia and skip it.', reveals: 'students-often-treat-the-before' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you are telling a friend about a movie you watched, but you start with the ending, then jump to the middle, then the beginning — your friend would.',
            decisions: [{ prompt: 'What is the narrative point of view used in "HkfDru", and who is the narrator?', options: [
                { text: 'The story is narrated in the first person by Mohan Rakesh (the author himself), who', outcome: 'The story is narrated in the first person by Mohan Rakesh (the author himself), who observes HkfDru.' },
                { text: 'third person omniscient', outcome: 'Not quite — Students often confuse *plot* (what happens) with *narrative structure* (how it\'s told).', reveals: 'students-often-confuse-plot-what' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into a house where the air feels heavy, the kitchen smells of smoke and spices, and a servant moves silently without ever speaking her name.',
            decisions: [{ prompt: 'What are the three main components of setting in a narrative, and which component is most prominent in the opening paragraphs of "HkfDru"?', options: [
                { text: 'The three components are physical (place), temporal (time), and social (environment)', outcome: 'The three components are physical (place), temporal (time), and social (environment).' },
                { text: 'time and place', outcome: 'Not quite — Students often treat setting as a static list of places (kitchen, courtyard, room) and atmosphere.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you\'re asked in the board exam: "HkfDru is not just a domestic worker; she is a mirror to society\'s hypocrisy.',
            decisions: [{ prompt: 'What is HkfDru\'s real name, and why does she refuse to reveal it to the narrator?', options: [
                { text: 'HkfDru never reveals her real name', outcome: 'HkfDru never reveals her real name; she says "I never use my name" and when asked during a police.' },
                { text: 'She forgot her name', outcome: 'Not quite — Students treat HkfDru as a "simple, illiterate servant" and write sketches listing traits like.', reveals: 'students-treat-hkfdru-as-a' },
                { text: 'life-knowledge', outcome: 'Not quite — Students treat HkfDru as a "simple, illiterate servant" and write sketches listing traits like.', reveals: 'students-treat-hkfdru-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you have a pet or have watched a stray animal visit your home daily — you feel a connection, but you also wonder: does this animal *choose* to be here.',
            decisions: [{ prompt: 'What is the primary theme of "HkfDru" as reflected in the evolving relationship between the narrator and the cow?', options: [
                { text: 'The primary theme is the mutual recognition of dignity and autonomy in a bond that', outcome: 'The primary theme is the mutual recognition of dignity and autonomy in a bond that refuses.' },
                { text: 'kindness to animals', outcome: 'Not quite — Students consistently conflate **theme** with **subject** or **moral**.', reveals: 'students-consistently-conflate-theme-with' },
                { text: 'the narrator\'s love for her cow', outcome: 'Not quite — Students consistently conflate **theme** with **subject** or **moral**.', reveals: 'students-consistently-conflate-theme-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a features-writing course, you\'re profiling the woman who\'s run your hostel kitchen for 30 years. Your editor wants a \'heartwarming\' ending where she cries as the final batch of students leaves — \'that\'s the emotional payoff.\'',
            decisions: [{ prompt: 'What would Mohan Rakesh\'s \'भक्तिन\' tell the editor?', options: [
                { text: 'Cut the tears — the story ends with the narrator noting Bhaktin\'s unbothered self-sufficiency at his own departure, and that refusal of sentimental closure IS the portrait; a lifetime of abandonment made her dignity non-negotiable, and dependency would betray her.', outcome: 'The chapter\'s lesson: the open, unsentimental ending honours her autonomy — the lack of payoff is the resolution, because her strength was never wired to anyone\'s leaving.' },
                { text: 'Add the crying scene — readers need emotional closure, and her reserve is just a detail to warm up.', outcome: 'That\'s the exact misreading: her composure isn\'t a gap in the story, it\'s the story — turning self-reliance into breakdown writes a different, lesser person.', reveals: 'tears-equal-depth' },
                { text: 'Reorder the piece chronologically — childhood, marriage, abandonment, kitchen — so her arc reads cleanly.', outcome: 'The story deliberately opens on her cooking now and folds the past in as flashback; the mundane present framing the hard past is what makes her endurance land — flattening the order flattens her.', reveals: 'chronology-equals-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an autobiographical sketch as a reformer\'s document — where one remembered woman exposes a whole system\'s quiet cruelties.',
            decisions: [{ prompt: 'What comes next? èkeZohj Hkkjrh · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — èkeZohj Hkkjrh · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" is a pre-reading section that.',
          hint: 'If stuck, revisit c11_hin_ar_cbse_01_001 (Class 11 Chapter 1 Before You Read) and re‑do.',
          misconception: 'Students often treat the “Before You Read” section as optional background trivia and skip it.',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** Who is the author of *HkfDru* and what is the source collection of this sketch?', answer: 'The author is Mahadevi Verma (1907–1987), a major Hindi poet and social reformer',
                  options: ['The author is Mahadevi Verma (1907–1987), a major Hindi poet and social reformer', 'Before You Read', 'another author like Premchand or citing a different book like *Yama*'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_01_001 (Class 11 Chapter 1 Before You Read) and re‑do its.',
                  misconception: 'Students often treat the “Before You Read” section as optional background trivia and skip it.' },
                { id: 'b', prompt: '**APPLY:** The “Before You Read” section mentions that the story uses *Avadhi/Braj* dialect words (e.g., *bZ dmu*, *jksVh*, *nky*).', answer: 'Example: *bZ dmu* (बहुत बड़ी बात)',
                  options: ['Example: *bZ dmu* (बहुत बड़ी बात)', 'picks a standard Hindi word (e'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_01_001 (Class 11 Chapter 1 Before You Read) and re‑do its.',
                  misconception: 'Students often treat the “Before You Read” section as optional background trivia and skip it.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['Re‑read the “Before You Read” box in the NCERT textbook (pages 62‑63) slowly, underlining every proper noun (Mahadevi.', 'Make a 4‑column table: Author Detail | Story Source | Setting | Social Issue.', 'Fill each column with one phrase from the text.', 'Watch a 5‑minute YouTube summary of Mahadevi Verma’s life (search “Mahadevi Verma biography NCERT”).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the “Before You Read” section as optional background trivia and skip it.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** The “Before You Read” section calls *HkfDru* a *laLej.kkRed js[kkfp=k* (realistic sketch).', answer: 'Yes, the label is appropriate',
                  options: ['Yes, the label is appropriate', 'just a memory', 'fiction because it’s written later'],
                  hint: 'If stuck, revisit c11_hin_ar_cbse_01_001 (Class 11 Chapter 1 Before You Read) and re‑do its.',
                  misconception: 'Students often treat the “Before You Read” section as optional background trivia and skip it.' }
          ],
            remediations: { 'students-often-treat-the-before': { steps: ['Re‑read the “Before You Read” box in the NCERT textbook (pages 62‑63) slowly, underlining every proper noun (Mahadevi.', 'Make a 4‑column table: Author Detail | Story Source | Setting | Social Issue.', 'Fill each column with one phrase from the text.', 'Watch a 5‑minute YouTube summary of Mahadevi Verma’s life (search “Mahadevi Verma biography NCERT”).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_002', difficulty: 'standard',
          question: 'Plot and narrative structure refer to the sequence of events in a story (plot).',
          hint: 'Review "narrative time vs. story time" in c11_hin_ar_cbse_10_002 — practice with a short.',
          misconception: 'Students often confuse *plot* (what happens) with *narrative structure* (how it\'s told).',
          parts: [
                { id: 'a', prompt: 'The story opens with HkfDru cooking in the kitchen. Why does the author choose this mundane activity as the opening scene instead of starting with her.', answer: 'The opening domestic scene grounds the reader in HkfDru\'s present reality',
                  options: ['The opening domestic scene grounds the reader in HkfDru\'s present reality', 'to introduce the setting'],
                  hint: 'Review "narrative time vs. story time" in c11_hin_ar_cbse_10_002 — practice with a short story like.',
                  misconception: 'Students often confuse *plot* (what happens) with *narrative structure* (how it\'s told).' }
          ],
            remediations: { 'students-often-confuse-plot-what': { steps: ['If a student cannot separate narrative order from chronological order: (1) Give them a 5-event summary of a familiar.', '(2) Ask them to reorder chronologically.', '(3) Then ask: "Why did the filmmaker choose this narrative order?" (4) Apply the same two-step to "HkfDru": list events.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a narrative.',
          hint: 'If stuck, review Class 11 "Setting and Atmosphere" node (c11_hin_ar_cbse_01_003) and.',
          misconception: 'Students often treat setting as a static list of places (kitchen, courtyard, room) and atmosphere as a single adjective.',
          parts: [
                { id: 'a', prompt: 'Explain how the description of HkfDru\'s daily routine in the kitchen creates a specific atmosphere.', answer: 'The kitchen routine',
                  options: ['The kitchen routine', 'it shows she works hard'],
                  hint: 'If stuck, review Class 11 "Setting and Atmosphere" node (c11_hin_ar_cbse_01_003) and practice on.',
                  misconception: 'Students often treat setting as a static list of places (kitchen, courtyard, room) and atmosphere as a single adjective (sad, tense).' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student re-read only the first and last five paragraphs of "HkfDru" and highlight every sensory word (smell.', 'Ask: "How does the kitchen feel at 5 AM vs 10 PM?', 'Then map each sensory detail to an emotional effect (e.g., smoke smell → suffocation).', 'Finally, write two sentences: "The setting is ____.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves a systematic examination of the.',
          hint: 'If stuck on separating narrator\'s view from author\'s view: review c11_hin_ar_cbse_05_004.',
          misconception: 'Students treat HkfDru as a "simple, illiterate servant" and write sketches listing traits like "hardworking, honest.',
          parts: [
                { id: 'a', prompt: 'What is HkfDru\'s real name, and why does she refuse to reveal it to the narrator?', answer: 'HkfDru never reveals her real name',
                  options: ['HkfDru never reveals her real name', 'She forgot her name', 'life-knowledge'],
                  hint: 'If stuck on separating narrator\'s view from author\'s view: review c11_hin_ar_cbse_05_004 (Usne Kaha.',
                  misconception: 'Students treat HkfDru as a "simple, illiterate servant" and write sketches listing traits like "hardworking, honest, loyal" with generic.' }
          ],
            remediations: { 'students-treat-hkfdru-as-a': { steps: ['Re-read the three key confrontation scenes: (a) the naming/police verification incident (p.63), (b) the cooking.', 'For each, write: What does the narrator EXPECT?', 'Revisit node c11_hin_ar_cbse_01_004 (Class 11 Character Analysis: Protagonist) to review the PEEL framework for.', 'Re-attempt Diagnostic Question 3 using the gap-analysis method — this forces evidence-based reasoning over.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_005', difficulty: 'standard',
          question: 'Supporting character analysis is the systematic examination of secondary.',
          hint: 'If unclear on "functional analysis," revisit the PEEL method in c12_hin_ar_cbse_10_004.',
          misconception: 'Students treat supporting characters as "background information" to memorize (names, relationships) rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Supporting character analysis is the systematic examination of secondary figures in a',
                  options: ['Supporting character analysis is the systematic examination of secondary figures in a', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If unclear on "functional analysis," revisit the PEEL method in c12_hin_ar_cbse_10_004 Worked.',
                  misconception: 'Students treat supporting characters as "background information" to memorize (names, relationships) rather than analytical tools.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student cannot move beyond description: (1) Give them a two-column table: Column A = "Supporting character\'s.', '(3) Assign: complete table for 2 more characters.', '(4) Re-diagnose: ask them to write one PEEL paragraph using their table.', 'If still stuck, revisit c12_hin_ar_cbse_10_004 (Protagonist Analysis) to see how HkfDru\'s traits were derived from.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea — the.',
          hint: 'If stuck, revisit the narrator\'s internal monologues in c12_hin_ar_cbse_10_004 and.',
          misconception: 'Students consistently conflate **theme** with **subject** or **moral**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme of a literary work is its central, unifying idea',
                  options: ['The primary theme of a literary work is its central, unifying idea', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, revisit the narrator\'s internal monologues in c12_hin_ar_cbse_10_004 and HkfDru\'s.',
                  misconception: 'Students consistently conflate **theme** with **subject** or **moral**.' }
          ],
            remediations: { 'students-consistently-conflate-theme-with': { steps: ['Re-read the three key episodes (arrival, naming, separation) with a single lens: **where does power shift or hold?**.', 'Use node **c12_hin_ar_cbse_10_004** (Protagonist Analysis) to map the narrator\'s own constraints — her reading, her.', 'Write a one-sentence theme statement using the template: "The story explores [abstract noun] through [character A\'s.', 'Discuss with teacher: "Why does the narrator say HkfDru taught her \'the meaning of freedom\'?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
