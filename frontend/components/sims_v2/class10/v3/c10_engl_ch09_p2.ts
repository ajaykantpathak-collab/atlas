import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch09_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch09_p2: SimDef = {
    id: 'v3_c10_engl_ch09_p2',
    title: 'The Proposal · Part 2/2',
    subtitle: 'Watch a marriage proposal get demolished by a land dispute',
    classLevel: 10, subject: 'engl', topic: 'The Proposal · Part 2/2',
    chapters: ['c10_engl_ch09'],
    nodeIds: ['c10_engl_cbse_09_007', 'c10_engl_cbse_09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre critic reviewing a farce that refuses to be romantic', intro: 'A man in evening dress comes to propose. Before he can finish, he and the bride-to-be are shouting about a strip of land worth almost nothing.', goal: 'Identify the farce genre, analyse the Oxen Meadows argument, and correct the \'romantic comedy\' misreading.' },
    discovery: {
        question: 'Lomov visits his neighbour to propose marriage — and the play ends with the \'engaged\' couple screaming about whose dog is superior. What is Chekhov actually satirising?',
        options: ['People who prize winning arguments and property over the very marriage they\'re arranging', 'Romantic love — the play says all proposals end badly', 'Bad manners — the characters just needed etiquette lessons', 'Dogs — the real subject is which breed is best'],
        answer: 'People who prize winning arguments and property over the very marriage they\'re arranging',
        hook: 'The proposal is bait, not the point. Chekhov makes the meadows worthless and the evidence vague on purpose — so you watch pride detonate over absolutely nothing.',
    },
    teaching: [
        { title: 'Character Analysis: Lomov\'s Hypochondria and Nervousness', text: 'Hypochondria in Lomov\'s character is a comedic literary device where he obsessively imagines or exaggerates physical ailments (palpitations, numbness, "twitching" of body parts) despite no medical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_09_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dissect the Oxen Meadows quarrel line by line: find every ownership claim, notice how worthless the prize is, and explain why the argument is funniest precisely because it\'s pointless.',
        labels: ['Character Analysis: Lomov\'s Hypochondria', 'Comedy as a Genre'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_007', title: 'Character Analysis: Lomov\'s Hypochondria and Nervousness',
          caseStudy: { intro: 'Imagine you\'re about to give a class presentation and your heart races, palms sweat, and you suddenly "feel" a headache — that\'s nervousness.',
            decisions: [{ prompt: 'Define "hypochondria" as it applies to Lomov in *The Proposal*. Give one specific symptom he complains of in the opening scene.', options: [
                { text: 'Hypochondria is a condition where a person excessively worries about having a serious', outcome: 'Hypochondria is a condition where a person excessively worries about having a serious illness.' },
                { text: 'Lomov is actually sick', outcome: 'Not quite — Students treat Lomov\'s hypochondria as *either* a genuine medical condition ("He really has a weak.', reveals: 'students-treat-lomov-s-hypochondria' },
                { text: 'he fakes illness to avoid the proposal', outcome: 'Not quite — Students treat Lomov\'s hypochondria as *either* a genuine medical condition ("He really has a weak.', reveals: 'students-treat-lomov-s-hypochondria' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_008', title: 'Comedy as a Genre: Humour, Exaggeration and Satire in the Play',
          caseStudy: { intro: 'Imagine you are watching a viral video where two neighbours scream at each other for 20 minutes about whether a fence post is 2 cm over the line — while their.',
            decisions: [{ prompt: 'Define \'satire\' as a literary device and give one example from "The Proposal" where Chekhov satirizes the landed gentry\'s values.', options: [
                { text: 'Satire is the use of humour, irony, or exaggeration to expose and criticize people\'s', outcome: 'Satire is the use of humour, irony, or exaggeration to expose and criticize people\'s stupidity.' },
                { text: 'satire is just making fun of someone', outcome: 'Not quite — Students think "comedy genre" just means "the play is funny" and list random jokes.', reveals: 'comedy-genre-just-means-the' },
                { text: 'comedy genre', outcome: 'Not quite — Students think "comedy genre" just means "the play is funny" and list random jokes.', reveals: 'comedy-genre-just-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school drama club rehearses \'The Proposal\'. The lead actors play it as a tender love scene — soft voices, shy glances — and the show falls flat. A junior watching rehearsal blurts out, \'Shouldn\'t they be yelling about meadows and dogs instead?\'',
            decisions: [{ prompt: 'What has the club misunderstood about the play?', options: [
                { text: 'They are playing a farce as a romance. The play\'s comedy lives in three proud, irritable neighbours who quarrel hysterically over land and dogs while the actual proposal keeps getting lost — the shouting, interruptions and absurd priorities ARE the scene, not an obstacle to it.', outcome: 'Recognising the genre fixes the performance: Chekhov wrote a pressure-cooker farce where trivial disputes drown the marriage question, which is why the junior\'s instinct was right.' },
                { text: 'The club is right — since Lomov and Natalya get engaged at the end, the play is a romance and should be played gently.', outcome: 'An engagement alone does not make a romance — here it is the punchline of a farce, squeezed in between shouting matches about Oxen Meadows and the dogs.', reveals: 'engagement-means-romance' },
                { text: 'The play is really a tragedy about property disputes, so the actors should perform it with heavy seriousness.', outcome: 'The disputes are deliberately trivial and exaggerated for laughter — playing them as tragedy would miss the farce just as much as playing them as romance.', reveals: 'farce-is-tragedy' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_008', title: 'You made it',
          caseStudy: { intro: 'A marriage proposal derailed by meadows and dogs isn\'t a rom-com — it\'s a farce holding up a mirror: watch what people fight for when nobody\'s watching their dignity.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_007', difficulty: 'standard',
          question: 'Hypochondria in Lomov\'s character is a comedic literary device where.',
          hint: 'If stuck, revisit c9_engl_ch1_2 (Grandmother character analysis) — it models the exact.',
          misconception: 'Students treat Lomov\'s hypochondria as *either* a genuine medical condition ("He really has a weak heart!") *or*.',
          parts: [
                { id: 'a', prompt: 'In Act 2, Lomov says: "My left side has gone numb... my eyebrow is twitching." Apply the concept of "psychosomatic symptom" to explain what is actually.', answer: 'Step 1: Identify the trigger',
                  options: ['Step 1: Identify the trigger', 'acting', 'real heart attack', 'he\'s dying), creating tragicomic irony'],
                  hint: 'If stuck, revisit c9_engl_ch1_2 (Grandmother character analysis) — it models the exact PEEL.',
                  misconception: 'Students treat Lomov\'s hypochondria as *either* a genuine medical condition ("He really has a weak heart!") *or* deliberate acting ("He.' }
          ],
            remediations: { 'students-treat-lomov-s-hypochondria': { steps: ['Re-read Act 1 opening monologue — highlight every physical sensation Lomov names.', 'Mark each as "N" (nervousness: shaking, stammering) or "H" (hypochondria: "heart will burst," "veins throb").', 'Draw an arrow from each "N" to the "H" it triggers (e.g., trembling hands → "my heart is failing").', 'Write one PEEL paragraph: *Point* — Lomov\'s nervousness fuels his hypochondria. *Evidence* — "I\'m trembling all over...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_008', difficulty: 'standard',
          question: 'Comedy as a genre in "The Proposal" uses humour (verbal wit, situational.',
          hint: 'Review c10_engl_cbse_09_002 and c10_engl_cbse_09_003 for the exact arguments, and.',
          misconception: 'Students think "comedy genre" just means "the play is funny" and list random jokes.',
          parts: [
                { id: 'a', prompt: 'In the argument about Guess and Squeezer (the dogs), identify ONE line that uses exaggeration and ONE line that uses satire. Explain the effect of each.', answer: 'Exaggeration: Lomov says, "My heart\'s palpitating awfully',
                  options: ['Exaggeration: Lomov says, "My heart\'s palpitating awfully', 'comedy genre', 'the play is funny', '"comedy genre" just means "the play is funny" and list random jokes'],
                  hint: 'Review c10_engl_cbse_09_002 and c10_engl_cbse_09_003 for the exact arguments, and.',
                  misconception: 'Students think "comedy genre" just means "the play is funny" and list random jokes.' }
          ],
            remediations: { 'comedy-genre-just-means-the': { steps: ['Ask the student to list the three arguments in the play (proposal, meadows, dogs).', 'For each argument, have them highlight one line that makes them laugh (humour), one line that blows things out.', 'Have them write one PEEL paragraph for each device using the template: "Chekhov uses [device] when [character] says.', 'Give them a 3-mark board question and mark it together using the CBSE rubric: 1 mark for device identification, 1 for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "comedy genre" just means "the play is funny" and list random jokes.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The comedy in \'The Proposal\' is only meant to entertain; it has no serious purpose." Use evidence from the play to defend or refute.', answer: 'Refute',
                  options: ['Refute', 'comedy genre', 'the play is funny', '"comedy genre" just means "the play is funny" and list random jokes'],
                  hint: 'Review c10_engl_cbse_09_002 and c10_engl_cbse_09_003 for the exact arguments, and.',
                  misconception: 'Students think "comedy genre" just means "the play is funny" and list random jokes.' }
          ],
            remediations: { 'comedy-genre-just-means-the': { steps: ['Ask the student to list the three arguments in the play (proposal, meadows, dogs).', 'For each argument, have them highlight one line that makes them laugh (humour), one line that blows things out.', 'Have them write one PEEL paragraph for each device using the template: "Chekhov uses [device] when [character] says.', 'Give them a 3-mark board question and mark it together using the CBSE rubric: 1 mark for device identification, 1 for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
