import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch12_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch12_p2: SimDef = {
    id: 'v3_c10_engl_ch12_p2',
    title: 'The Midnight Visitor · Part 2/2',
    subtitle: 'Outwit an armed spy using nothing but a made-up balcony',
    classLevel: 10, subject: 'engl', topic: 'The Midnight Visitor · Part 2/2',
    chapters: ['c10_engl_ch12'],
    nodeIds: ['c10_engl_cbse_12_007', 'c10_engl_cbse_12_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a secret agent who looks nothing like one', intro: 'A young writer named Fowler followed you all evening expecting mystery and danger — and got a damp hotel room instead. Then the door opens, and there\'s a man with a gun. Time to become interesting.', goal: 'Show how calm thinking and convincing detail can overturn a physically hopeless situation.' },
    discovery: {
        question: 'Secret agent Ausable is fat, speaks with an American accent, and lives in a gloomy hotel room — nothing like a film spy. When rival agent Max bursts in with a pistol, Ausable wins without firing a shot or throwing a punch. How?',
        options: ['He invents a balcony outside the window so convincingly that Max steps backwards into thin air', 'He secretly signals the police through his telephone', 'He offers Max double the money to switch sides', 'He uses a hidden trapdoor installed by French intelligence'],
        answer: 'He invents a balcony outside the window so convincingly that Max steps backwards into thin air',
        hook: 'Ausable\'s weapon wasn\'t a gun — it was a believable lie told calmly. The story argues presence of mind beats physical strength and spy-movie glamour.',
    },
    teaching: [
        { title: 'Character Analysis: Ausable\'s Intelligence vs Max\'s Gullibility', text: 'From \'English chapter c10_engl_cbse_12\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'You are an unimpressive-looking agent cornered by an armed intruder. Invent a detail so believable that your enemy defeats himself — while a knock at the door keeps raising the stakes.',
        labels: ['Character Analysis: Ausable\'s Intelligence', 'Suspense and Surprise: How'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_007', title: 'Character Analysis: Ausable\'s Intelligence vs Max\'s Gullibility',
          caseStudy: { intro: 'Imagine you\'re watching a thriller where the "hero" doesn\'t look heroic at all — he\'s overweight, messy, and lives in a gloomy hotel room.',
            decisions: [{ prompt: 'What is the one physical detail about Ausable that contradicts the stereotypical image of a secret agent, as described in the opening.', options: [
                { text: 'Ausable is described as "fat" and "sloppy" with a "room on the sixth and top floor of a', outcome: 'Ausable is described as "fat" and "sloppy" with a "room on the sixth and top floor of a gloomy.' },
                { text: 'he has a gun', outcome: 'Not quite — Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish.".', reveals: 'character-analysis-means-listing-adjectives' },
                { text: 'he is muscular', outcome: 'Not quite — Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish.".', reveals: 'character-analysis-means-listing-adjectives' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_008', title: 'Suspense and Surprise: How the Plot Twists Resolve the Conflict',
          caseStudy: { intro: 'Imagine you are watching a thriller movie where the hero is trapped in a room with a villain holding a gun — your heart races because you don\'t know how he\'ll.',
            decisions: [{ prompt: 'What is the difference between suspense and surprise in a narrative, and which one does the fake balcony primarily create for the reader.', options: [
                { text: 'Suspense is the prolonged tension created by uncertainty about an outcome', outcome: 'Suspense is the prolonged tension created by uncertainty about an outcome; surprise is the sudden.' },
                { text: 'How does the author build tension?', outcome: 'Not quite — Students believe the "midnight visitor" (the waiter) is the planned twist Ausable orchestrated, and.', reveals: 'the-midnight-visitor-the-waiter' },
                { text: 'midnight visitor', outcome: 'Not quite — Students believe the "midnight visitor" (the waiter) is the planned twist Ausable orchestrated, and.', reveals: 'the-midnight-visitor-the-waiter' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Casting a spy skit for the school function, the class picks the tallest, fittest boy for the agent role because \'a spy has to look like James Bond.\' The teacher quietly suggests the quick-witted boy with the ordinary face instead.',
            decisions: [{ prompt: 'What does \'The Midnight Visitor\' say the teacher knows?', options: [
                { text: 'That real cleverness wears no uniform — Ausable is fat, sloppy and accented, yet he survives a gunman purely by inventing a balcony and a knock at the door, talking Max into his own doom. A spy\'s weapon is presence of mind, not physique — the unremarkable-looking boy is the truer casting.', outcome: 'The story builds its whole joke on the gap between the romantic spy image and the real thing — Ausable wins because Max, like the class, trusted appearances.' },
                { text: 'The class is right — audiences need a spy who looks the part, and quick thinking cannot be acted anyway.', outcome: 'The entire play IS quick thinking — Ausable\'s escape is a dialogue performance of wit under pressure, which an actor of any build can carry off.', reveals: 'hero-must-look-heroic' },
                { text: 'Neither matters — a spy skit succeeds only if there are gadgets and fight scenes, not talking.', outcome: 'The story contains no gadgets or fights at all — its suspense comes entirely from words and a believable lie, which is what makes it dramatic.', reveals: 'drama-needs-action' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_12_008', title: 'You made it',
          caseStudy: { intro: 'Max brought a pistol; Ausable brought a story. The story won, because a lie believed is stronger than a weapon feared.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_007', difficulty: 'standard',
          question: 'From \'English chapter c10_engl_cbse_12\': the skill or concept this node.',
          hint: 'If stuck, review c9_engl_ch1_2 (Grandmother analysis) for PEEL structure and.',
          misconception: 'Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish." In board exams, this.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Max believes Ausable\'s story about the balcony without checking for himself.', answer: 'Max believes the balcony story',
                  options: ['Max believes the balcony story', 'Max is stupid', 'character analysis', 'Ausable is smart, Max is foolish'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother analysis) for PEEL structure and c8_engl_ch1_2 (Tenali.',
                  misconception: 'Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish." In board exams, this earns 1/3 marks.' }
          ],
            remediations: { 'character-analysis-means-listing-adjectives': { steps: ['Re-read the two key scenes — Ausable\'s balcony speech (para 12-14) and the climax at the window (para 22-24).', 'Highlight every verb showing Ausable *acting* (invented, complained, warned, smiled) vs Max *reacting* (stiffened.', 'For each highlighted verb, write one sentence: "This shows [trait] because [explanation]."', 'Pair one Ausable action with one Max reaction to build a comparative PEEL paragraph. Do this for 3 pairs minimum.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish." In board exams, this.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Max\'s gullibility is the sole reason for his downfall." Defend or challenge using two pieces of evidence from the story.', answer: 'Challenge: Max\'s gullibility is *exploited* by Ausable\'s active intelligence',
                  options: ['Challenge: Max\'s gullibility is *exploited* by Ausable\'s active intelligence', 'Yes, Max is foolish', 'character analysis', 'Ausable is smart, Max is foolish'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother analysis) for PEEL structure and c8_engl_ch1_2 (Tenali.',
                  misconception: 'Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish." In board exams, this earns 1/3 marks.' },
                { id: 'b', prompt: 'Create a 4-line dialogue where a modern-day Ausable tricks a Max-like character using a fake "security feature" (e.g., biometric lock, motion sensor) instead.', answer: '**Ausable:** "Don\'t move',
                  options: ['**Ausable:** "Don\'t move', 'character analysis', 'Ausable is smart, Max is foolish', '"character analysis" means listing adjectives: "Ausable is smart, Max is foolish'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother analysis) for PEEL structure and c8_engl_ch1_2 (Tenali.',
                  misconception: 'Students think "character analysis" means listing adjectives: "Ausable is smart, Max is foolish." In board exams, this earns 1/3 marks.' }
          ],
            remediations: { 'character-analysis-means-listing-adjectives': { steps: ['Re-read the two key scenes — Ausable\'s balcony speech (para 12-14) and the climax at the window (para 22-24).', 'Highlight every verb showing Ausable *acting* (invented, complained, warned, smiled) vs Max *reacting* (stiffened.', 'For each highlighted verb, write one sentence: "This shows [trait] because [explanation]."', 'Pair one Ausable action with one Max reaction to build a comparative PEEL paragraph. Do this for 3 pairs minimum.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_12_008', difficulty: 'standard',
          question: 'Suspense is the sustained anxiety or uncertainty a reader feels about the.',
          hint: 'If stuck, review c10_engl_cbse_12_004 (the balcony lie) and c10_engl_cbse_12_005 (the.',
          misconception: 'Students believe the "midnight visitor" (the waiter) is the planned twist Ausable orchestrated, and that the balcony.',
          parts: [
                { id: 'a', prompt: 'What is the difference between suspense and surprise in a narrative, and which one does the fake balcony primarily create for the reader before Max jumps?', answer: 'Suspense is the prolonged tension created by uncertainty about an outcome',
                  options: ['Suspense is the prolonged tension created by uncertainty about an outcome', 'How does the author build tension?', 'midnight visitor'],
                  hint: 'If stuck, review c10_engl_cbse_12_004 (the balcony lie) and c10_engl_cbse_12_005 (the knock scene).',
                  misconception: 'Students believe the "midnight visitor" (the waiter) is the planned twist Ausable orchestrated, and that the balcony lie was just a stall.' }
          ],
            remediations: { 'the-midnight-visitor-the-waiter': { steps: ['If a student holds this misconception, have them re-read Ausable\'s dialogue before the knock: "I told them to send.', 'I was expecting a report." Ask: "Does he say he called the police?', 'What does \'report\' imply?" Then trace the timeline: 1) Max enters with gun.', '2) Ausable invents balcony.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
