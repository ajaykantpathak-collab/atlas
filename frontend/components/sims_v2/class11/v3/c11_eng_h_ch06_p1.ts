import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch06_p1: SimDef = {
    id: 'v3_c11_eng_h_ch06_p1',
    title: 'The Browning Version · Part 1/3',
    subtitle: 'Unpack a title that names both a translation and a teacher\'s hardened soul.',
    classLevel: 11, subject: 'eng_h', topic: 'The Browning Version · Part 1/3',
    chapters: ['c11_eng_h_ch06'],
    nodeIds: ['c11_eng_h_cbse_06_001', 'c11_eng_h_cbse_06_002', 'c11_eng_h_cbse_06_003', 'c11_eng_h_cbse_06_004', 'c11_eng_h_cbse_06_005', 'c11_eng_h_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a director staging a one-act play in one room', intro: 'A boy waits for a master who will never arrive — and forty compressed minutes expose twenty years of disappointment.', goal: 'Interpret the play\'s layered title and analyse how dramatic structure works through speech acts.' },
    discovery: {
        question: 'Why is the play called \'The Browning Version\'? It can\'t only be about a Greek translation.',
        options: ['It works three ways — Browning\'s Agamemnon is Crocker-Harris\'s project, and he himself is a \'browned\' version of a teacher, dried hard by disappointment', 'It refers only to the book Taplow gifts him', 'Browning wrote the play under a pseudonym', 'It is the school\'s motto, borrowed from Browning'],
        answer: 'It works three ways — Browning\'s Agamemnon is Crocker-Harris\'s project, and he himself is a \'browned\' version of a teacher, dried hard by disappointment',
        hook: 'The gift lands because the title was always about him — a man translated into a harder version of himself, finally read kindly.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the essential historical, biographical, and literary framework needed to understand Terence Rattigan\'s one-act play *The Browning Version*.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track how a single room, a few visitors and some dialogue build a lifetime of failure — then place the true climax: the gift, or the final speech.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re handed a script titled *The Browning Version* with no introduction. You might wonder: "Is this a novel? A poem?',
            decisions: [{ prompt: 'What is the primary historical context that shapes the protagonist Andrew Crocker-Harris\'s professional crisis in *The Browning Version*?', options: [
                { text: 'The play is set in a British public school (private boarding school) in the late 1940s,', outcome: 'The play is set in a British public school (private boarding school) in the late 1940s, where.' },
                { text: 'It\'s about a university professor in modern times', outcome: 'Not quite — Students often treat "context" as a list of facts to memorise (author birth/death dates, school.', reveals: 'students-often-treat-context-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a 40-minute play unfold in real-time in a single schoolroom - no scene changes, no narrator explaining what happened yesterday.',
            decisions: [{ prompt: 'What are the five standard elements of dramatic plot structure (Freytag\'s Pyramid) in their correct sequential order?', options: [
                { text: 'The five elements in order: Exposition (introduction of setting, characters, situation),', outcome: 'The five elements in order: Exposition (introduction of setting, characters, situation), Rising.' },
                { text: 'in a play means', outcome: 'Not quite — Students believe "plot" in a play means "what happens" in story terms (like a novel summary) and.', reveals: 'plot-in-a-play-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into a classroom where a teacher sits alone, correcting papers while waiting for a student who is late.',
            decisions: [{ prompt: 'What is the primary physical setting of *The Browning Version*, and what time of day does the play open?', options: [
                { text: 'The play is set in a British public school, primarily in Andrew Crocker-Harris\'s', outcome: 'The play is set in a British public school, primarily in Andrew Crocker-Harris\'s classroom and.' },
                { text: 'a home setting', outcome: 'Not quite — Students often think "setting" is only the geographical location (e.g., "England") and "atmosphere".', reveals: 'setting-is-only-the-geographical' },
                { text: 'morning', outcome: 'Not quite — Students often think "setting" is only the geographical location (e.g., "England") and "atmosphere".', reveals: 'setting-is-only-the-geographical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are a detective trying to understand a person who says very little but reveals everything through small gestures.',
            decisions: [{ prompt: 'What is the primary textual evidence that reveals Andrew Crocker-Harris\'s self-perception as a failure?', options: [
                { text: 'Andrew\'s self-perception is revealed in his translation of Agamemnon where he says "I who', outcome: 'Andrew\'s self-perception is revealed in his translation of Agamemnon where he says "I who have been.' },
                { text: 'I who have been a failure', outcome: 'Not quite — Students often confuse Andrew\'s classroom strictness with his core personality, writing "He is.', reveals: 'students-often-confuse-andrew-s' },
                { text: 'I am not a success', outcome: 'Not quite — Students often confuse Andrew\'s classroom strictness with his core personality, writing "He is.', reveals: 'students-often-confuse-andrew-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are watching a play where the main character barely speaks but everyone else talks *about* him. How would you understand him?',
            decisions: [{ prompt: 'List the four supporting characters in "The Browning Version" and state one defining trait for each that contrasts with Andrew.', options: [
                { text: 'The four supporting characters are: (1) Millie Crocker-Harris', outcome: 'The four supporting characters are: (1) Millie Crocker-Harris — vitality and cruelty masking deep.' },
                { text: 'all are mean to Andrew', outcome: 'Not quite — Students treat supporting characters as "minor" — less important than the protagonist.', reveals: 'students-treat-supporting-characters-as' },
                { text: 'describes them similarly (e', outcome: 'Not quite — Students treat supporting characters as "minor" — less important than the protagonist.', reveals: 'students-treat-supporting-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you are Taplow, waiting for a teacher who has just been handed a premature retirement notice because he is "not liked" by the boys.',
            decisions: [{ prompt: 'What is the difference between a \'theme\' and a \'plot summary\' in literature?', options: [
                { text: 'A plot summary recounts *what happens* (sequence of events), while a theme states *what', outcome: 'A plot summary recounts *what happens* (sequence of events), while a theme states *what the work.' },
                { text: 'The theme is that a teacher gets a gift from', outcome: 'Not quite — Students routinely confuse the *primary theme* with the *most obvious plot event* (Taplow giving.', reveals: 'students-routinely-confuse-the-primary' },
                { text: 'be kind to teachers', outcome: 'Not quite — Students routinely confuse the *primary theme* with the *most obvious plot event* (Taplow giving.', reveals: 'students-routinely-confuse-the-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For the school\'s drama fest you\'re directing a scene from \'The Browning Version\'. The actor playing Crocker-Harris asks: \'Why should I care that this is a 1940s British public school or that Rattigan lived a double life? Lines are lines — just tell me where to stand.\'',
            decisions: [{ prompt: 'Why does that context matter to the performance?', options: [
                { text: 'Because context is the interpretive lens, not trivia: 1940s public-school hierarchy explains why the classics master must perform emotional armour, and Rattigan\'s own repressed life in a criminalising era illuminates why Crocker-Harris cannot accept Taplow\'s small act of affection. The facts answer \'so what does he hide and why\'.', outcome: 'Learn context FOR the play, not ABOUT it: every fact earns its place only when it changes how a line is played.' },
                { text: 'The actor is right — biography and period details are exam trivia, irrelevant to delivering lines.', outcome: 'Flat delivery results: without the era\'s emotional repression, Taplow\'s gift reads as a minor prop instead of the play\'s seismic moment of being \'seen\'.', reveals: 'context-is-trivia' },
                { text: 'Update the scene to a modern Indian school — context is replaceable and the emotion stays identical.', outcome: 'The emotional logic isn\'t portable: forced retirement, classics\' decline and institutional coldness in 1948 Britain are the machinery producing his despair.', reveals: 'context-is-replaceable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'In a one-act play, structure is character — every entrance forces someone to reveal what they\'d rather hide.',
            decisions: [{ prompt: 'What comes next? The Browning Version · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Browning Version · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the essential historical.',
          hint: 'If stuck, review c10_engl_cbse_09_001 (one-act play structure) and c10_engl_cbse_09_008.',
          misconception: 'Students often treat "context" as a list of facts to memorise (author birth/death dates, school system details) rather.',
          parts: [
                { id: 'a', prompt: 'Explain why the one-act play structure is particularly effective for *The Browning Version* rather than a full-length three-act structure.', answer: 'The one-act structure enforces unity of time, place, and action',
                  options: ['The one-act structure enforces unity of time, place, and action', 'It\'s shorter so easier to perform'],
                  hint: 'If stuck, review c10_engl_cbse_09_001 (one-act play structure) and c10_engl_cbse_09_008 (comedy vs.',
                  misconception: 'Students often treat "context" as a list of facts to memorise (author birth/death dates, school system details) rather than as.' }
          ],
            remediations: { 'students-often-treat-context-as': { steps: ['**Re-frame the task**: "Don\'t learn context *about* the play.', 'Learn context *for* the play." 2.', '**Use the "So What?" ladder**: For each context fact (e.g., "Classics was compulsory"), ask: "So what does this mean.', '**Practice with a familiar parallel**: Apply the same ladder to a modern Indian teacher facing NEP 2020 curriculum.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_002', difficulty: 'standard',
          question: 'Plot and narrative structure in drama refers to the arrangement of events and.',
          hint: 'Review "The Proposal" (Class 10, c10_engl_cbse_09_001) - identify its structural beats.',
          misconception: 'Students believe "plot" in a play means "what happens" in story terms (like a novel summary) and miss that dramatic.',
          parts: [
                { id: 'a', prompt: 'Identify the inciting incident in "The Browning Version" and explain why it must occur early in a one-act play\'s structure.', answer: 'The inciting incident is Taplow\'s arrival for extra work and his imitation of',
                  options: ['The inciting incident is Taplow\'s arrival for extra work and his imitation of', 'in a play means'],
                  hint: 'Review "The Proposal" (Class 10, c10_engl_cbse_09_001) - identify its structural beats as a one-act.',
                  misconception: 'Students believe "plot" in a play means "what happens" in story terms (like a novel summary) and miss that dramatic structure is built.' }
          ],
            remediations: { 'plot-in-a-play-means': { steps: ['If a student cannot distinguish dramatic action from narrative summary: (1) Have them read aloud only Crocker-Harris\'s.', '(2) Map the play on a timeline marking only "who enters/exits" and "what power shifts." (3) Rewrite one "plot summary".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a literary.',
          hint: 'Review the stage directions of Act 1 and Act 2 separately; list all physical details.',
          misconception: 'Students often think "setting" is only the geographical location (e.g., "England") and "atmosphere" is just the.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical setting of *The Browning Version*, and what time of day does the play open?', answer: 'The play is set in a British public school, primarily in Andrew Crocker-Harris\'s',
                  options: ['The play is set in a British public school, primarily in Andrew Crocker-Harris\'s', 'a home setting', 'morning', 'setting'],
                  hint: 'Review the stage directions of Act 1 and Act 2 separately; list all physical details.',
                  misconception: 'Students often think "setting" is only the geographical location (e.g., "England") and "atmosphere" is just the weather.' }
          ],
            remediations: { 'setting-is-only-the-geographical': { steps: ['Have the student re-read only the stage directions (ignoring dialogue) and highlight every adjective describing the.', 'Ask: "If you were a set designer, what three objects would you *must* include to show this man\'s life?" 3.', 'Practice writing one sentence per object linking it to an emotion: "The ink-stained desk = decades of thankless labor.".', 'Watch a 2-minute clip of a stage production (YouTube) and note how lighting and set design create mood before actors.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_004', difficulty: 'standard',
          question: 'Character analysis of a protagonist involves examining the central character\'s.',
          hint: 'Review the distinction between direct characterization (what the character says about.',
          misconception: 'Students often confuse Andrew\'s classroom strictness with his core personality, writing "He is a cruel, heartless.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of a protagonist involves examining the central character\'s',
                  options: ['Character analysis of a protagonist involves examining the central character\'s', '"Before You Read: Context and Background" provides the essential historical,', 'Plot and narrative structure in drama refers to the arrangement of events and actions in', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review the distinction between direct characterization (what the character says about themselves).',
                  misconception: 'Students often confuse Andrew\'s classroom strictness with his core personality, writing "He is a cruel, heartless teacher" as a character.' }
          ],
            remediations: { 'students-often-confuse-andrew-s': { steps: ['If a student writes "Andrew is strict and unpopular," ask: "Find three moments where the play shows Andrew\'s.', 'What does he translate for Taplow?', 'What does he say about his marriage?', 'How does he react to the Browning version?" Guide them to annotate these moments, then rewrite using the structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse Andrew\'s classroom strictness with his core personality, writing "He is a cruel, heartless.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether Andrew\'s final decision to speak at the prize-giving ceremony represents genuine transformation or momentary impulse.', answer: 'It represents genuine transformation',
                  options: ['It represents genuine transformation', 'He is a cruel, heartless teacher'],
                  hint: 'Review the distinction between direct characterization (what the character says about themselves).',
                  misconception: 'Students often confuse Andrew\'s classroom strictness with his core personality, writing "He is a cruel, heartless teacher" as a character.' }
          ],
            remediations: { 'students-often-confuse-andrew-s': { steps: ['If a student writes "Andrew is strict and unpopular," ask: "Find three moments where the play shows Andrew\'s.', 'What does he translate for Taplow?', 'What does he say about his marriage?', 'How does he react to the Browning version?" Guide them to annotate these moments, then rewrite using the structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining how secondary.',
          hint: 'If stuck, review c11_eng_h_cbse_06_004 focusing on Andrew\'s "negative capability" — his.',
          misconception: 'Students treat supporting characters as "minor" — less important than the protagonist.',
          parts: [
                { id: 'a', prompt: 'List the four supporting characters in "The Browning Version" and state one defining trait for each that contrasts with Andrew Crocker-Harris.', answer: 'The four supporting characters are: (1) Millie Crocker-Harris',
                  options: ['The four supporting characters are: (1) Millie Crocker-Harris', 'all are mean to Andrew', 'describes them similarly (e'],
                  hint: 'If stuck, review c11_eng_h_cbse_06_004 focusing on Andrew\'s "negative capability" — his silence and.',
                  misconception: 'Students treat supporting characters as "minor" — less important than the protagonist.' },
                { id: 'b', prompt: 'Frank Hunter says to Taplow: "He\'s not a human being. He\'s a sort of...', answer: 'Frank sees Andrew as a "shrine"',
                  options: ['Frank sees Andrew as a "shrine"', 'human being', 'Poor devil, he\'s not a bad sort', 'both dislike him'],
                  hint: 'If stuck, review c11_eng_h_cbse_06_004 focusing on Andrew\'s "negative capability" — his silence and.',
                  misconception: 'Students treat supporting characters as "minor" — less important than the protagonist.' }
          ],
            remediations: { 'students-treat-supporting-characters-as': { steps: ['If a student reduces supporting characters to plot devices: (1) Have them re-read Act 1 listing every line spoken.', '(2) Ask: "If this character were removed, what would we lose about Andrew?" (3) Create a four-column chart: Character |.', '(4) Practice writing one PEEL paragraph per character using the chart.', 'Emphasize: in this play, the protagonist is the negative space; the supporting characters are the lines that define it.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_06_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea or insight.',
          hint: 'If stuck, return to c11_eng_h_cbse_06_004 and re-analyse Crocker-Harris\'s "I have been.',
          misconception: 'Students routinely confuse the *primary theme* with the *most obvious plot event* (Taplow giving the book) or with.',
          parts: [
                { id: 'a', prompt: 'Compare the thematic function of the Browning translation of *Agamemnon* in the play with the copy of the same book that Taplow gives Crocker-Harris at the.', answer: 'Initially, the Browning version represents Crocker-Harris\'s pedantic, joyless',
                  options: ['Initially, the Browning version represents Crocker-Harris\'s pedantic, joyless', 'it\'s the same book so it means the same thing', 'be kind to teachers'],
                  hint: 'If stuck, return to c11_eng_h_cbse_06_004 and re-analyse Crocker-Harris\'s "I have been made to feel.',
                  misconception: 'Students routinely confuse the *primary theme* with the *most obvious plot event* (Taplow giving the book) or with a *moral lesson* ("be.' }
          ],
            remediations: { 'students-routinely-confuse-the-primary': { steps: ['Ask the student to reread only the final two pages (Taplow\'s gift scene) and highlight every word that conveys.', 'Have them complete this sentence frame: "The book is not just a book; it is a symbol of ________." 3.', 'Show a 2-minute clip of a teacher receiving an unexpected thank-you note; discuss what changed *inside* the teacher.', 'Re-attempt Diagnostic Question 4 with the prompt: "Focus on the *change* in the object\'s meaning."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
