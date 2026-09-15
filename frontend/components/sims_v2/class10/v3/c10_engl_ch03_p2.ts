import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch03_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch03_p2: SimDef = {
    id: 'v3_c10_engl_ch03_p2',
    title: 'Two Stories About Flying · Part 2/2',
    subtitle: 'Watch a terrified seagull get tricked into his first flight',
    classLevel: 10, subject: 'engl', topic: 'Two Stories About Flying · Part 2/2',
    chapters: ['c10_engl_ch03'],
    nodeIds: ['c10_engl_cbse_03_007', 'c10_engl_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a behavioural scientist reading a bird family\'s strategy', intro: 'His brothers and sister flew days ago. He watches from the ledge, pretending to sleep, too scared to try — until his mother weaponises his own stomach.', goal: 'Analyse fear as layered psychology and support claims about the family\'s deliberate staging with evidence.' },
    discovery: {
        question: 'The young seagull\'s mother flies up with a piece of fish — then halts mid-air, just out of his reach. Starving, he dives at the fish and finds himself flying. Was the family abandoning him all along?',
        options: ['No — they staged a controlled crisis: withholding food, circling, calling, until hunger beat fear', 'Yes — they gave up on him and left him to survive or starve', 'No — the mother simply couldn\'t land on the narrow ledge', 'Partly — they abandoned him but came back when they heard him cry'],
        answer: 'No — they staged a controlled crisis: withholding food, circling, calling, until hunger beat fear',
        hook: 'The first flight wasn\'t bravery — it was engineering. His family built a situation where staying afraid cost more than jumping.',
    },
    teaching: [
        { title: 'Symbolism: Flight as a Metaphor for Independence and Growth', text: 'Symbolism is a literary device where a concrete object, action, or image (the symbol) represents an abstract idea, quality, or concept beyond its literal meaning.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track every detail the author plants — the mocking siblings, the hunger, the mother hovering with fish — and argue whether the seagull conquered fear or fear was outmanoeuvred.',
        labels: ['Symbolism: Flight as', 'Character Analysis: The Seagull'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_007', title: 'Symbolism: Flight as a Metaphor for Independence and Growth',
          caseStudy: { intro: 'Think about the last time you did something completely on your own for the first time — riding a bicycle without training wheels, giving a presentation,.',
            decisions: [{ prompt: 'What is the definition of a symbol in literature, and how does it differ from a literal description?', options: [
                { text: 'A symbol is a concrete object, action, or image that stands for an abstract idea beyond', outcome: 'A symbol is a concrete object, action, or image that stands for an abstract idea beyond its literal.' },
                { text: 'a symbol is just a fancy word for a metaphor', outcome: 'Not quite — Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that.', reveals: 'symbolism-means-finding-hidden-meanings' },
                { text: 'symbolism', outcome: 'Not quite — Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that.', reveals: 'symbolism-means-finding-hidden-meanings' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_008', title: 'Character Analysis: The Seagull vs the Lost Pilot',
          caseStudy: { intro: 'Imagine you\'re in the exam hall and the question asks: "Compare how the young seagull and the lost pilot conquer their fear of flying." You might freeze.',
            decisions: [{ prompt: 'What is the primary emotion that paralyzes the young seagull at the beginning of "His First Flight," and what specific fear grips the pilot.', options: [
                { text: 'The young seagull is paralyzed by the fear of falling', outcome: 'The young seagull is paralyzed by the fear of falling — he believes his wings will not support him.' },
                { text: 'the seagull fears hunger or the pilot fears lightning', outcome: 'Not quite — Students treat both characters as "brave heroes who overcame fear" and write generic praise.', reveals: 'students-treat-both-characters-as' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior student has memorised her lines for the school play but freezes at every rehearsal, terrified of the stage. Her older brother, who just read the story of the young seagull\'s first flight, says: \'I know exactly what\'s going on with you.\'',
            decisions: [{ prompt: 'What does the seagull\'s story actually suggest about her fear?', options: [
                { text: 'That the fear is self-doubt, not inability — the seagull could fly perfectly well but was paralysed by the unknown, and only hunger pushed him over the edge, where instinct took over. For the student, the fix is not more skill but the first leap — one pushed step, and the capability she already has will carry her.', outcome: 'The story\'s point is that fear of the unknown outlives itself in one moment of action — the seagull discovered wings only after falling into air, and stage fright works the same way.' },
                { text: 'It proves she should wait until she feels zero fear — the seagull only flew once he was calm and ready.', outcome: 'The seagull was never calm — he flew because hunger forced the leap while he was still terrified; waiting for fear to disappear first would have left him on the ledge forever.', reveals: 'brave-means-fearless' },
                { text: 'It proves her fear means she is genuinely not ready, since instincts warn us away from things we cannot do.', outcome: 'The seagull\'s fear was false alarm — his wings were ready while his mind was not; a prepared student\'s fright is the same kind of false signal.', reveals: 'fear-proves-unreadiness' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_03_008', title: 'You made it',
          caseStudy: { intro: 'Sometimes the only way past a ledge is a push you don\'t recognise as love. Hunger did what courage couldn\'t — and the sea caught him gently.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_007', difficulty: 'standard',
          question: 'Symbolism is a literary device where a concrete object, action, or image (the.',
          hint: 'If stuck, review c10_engl_cbse_03_005 (Theme: Courage, Self-Reliance) and.',
          misconception: 'Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that there is ONE correct.',
          parts: [
                { id: 'a', prompt: 'In "His First Flight," the young seagull stands on the ledge while his siblings have already flown.', answer: 'The ledge symbolizes the comfort zone',
                  options: ['The ledge symbolizes the comfort zone', 'the ledge is just where he lives', 'the ledge represents his home', 'symbolism'],
                  hint: 'If stuck, review c10_engl_cbse_03_005 (Theme: Courage, Self-Reliance) and c6_english_u3_025.',
                  misconception: 'Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that there is ONE correct symbolic.' },
                { id: 'b', prompt: 'Analyze how the *storm* in "The Black Aeroplane" functions differently as a symbol compared to *hunger* in "His First Flight," even though both act.', answer: 'Hunger is an internal, biological catalyst',
                  options: ['Hunger is an internal, biological catalyst', 'both make them fly', 'symbolism', 'the theme is flight'],
                  hint: 'If stuck, review c10_engl_cbse_03_005 (Theme: Courage, Self-Reliance) and c6_english_u3_025.',
                  misconception: 'Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that there is ONE correct symbolic.' }
          ],
            remediations: { 'symbolism-means-finding-hidden-meanings': { steps: ['Have the student list 5 physical actions in the seagull\'s story (e.g., stepping off ledge, flapping wings, feeling air.', 'For each action, ask "What is the character feeling *inside* at this exact moment?"', 'Pair each physical action with the internal state — this creates the symbol map.', 'Repeat for the pilot\'s story.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that there is ONE correct.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The mysterious black aeroplane is the real symbol of guidance in the story, not flight itself." Defend or refute using evidence.', answer: 'Refute',
                  options: ['Refute', 'Two Stories About Flying', 'symbolism', 'the theme is flight'],
                  hint: 'If stuck, review c10_engl_cbse_03_005 (Theme: Courage, Self-Reliance) and c6_english_u3_025.',
                  misconception: 'Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that there is ONE correct symbolic.' },
                { id: 'b', prompt: 'Create an original metaphor for "growing up" using a different physical action (not flight), and explain the four symbolic stages that correspond.', answer: 'Example: Learning to swim',
                  options: ['Example: Learning to swim', 'symbolism', 'the theme is flight', 'flight symbolizes the theme of independence'],
                  hint: 'If stuck, review c10_engl_cbse_03_005 (Theme: Courage, Self-Reliance) and c6_english_u3_025.',
                  misconception: 'Students believe "symbolism" means "finding hidden meanings the author secretly put in" and that there is ONE correct symbolic.' }
          ],
            remediations: { 'symbolism-means-finding-hidden-meanings': { steps: ['Have the student list 5 physical actions in the seagull\'s story (e.g., stepping off ledge, flapping wings, feeling air.', 'For each action, ask "What is the character feeling *inside* at this exact moment?"', 'Pair each physical action with the internal state — this creates the symbol map.', 'Repeat for the pilot\'s story.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_03_008', difficulty: 'standard',
          question: 'Character comparison analysis examines how two protagonists from different.',
          hint: 'If stuck, review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis.',
          misconception: 'Students treat both characters as "brave heroes who overcame fear" and write generic praise.',
          parts: [
                { id: 'a', prompt: 'What is the primary emotion that paralyzes the young seagull at the beginning of "His First Flight," and what specific fear grips the pilot in "The Black.', answer: 'The young seagull is paralyzed by the fear of falling',
                  options: ['The young seagull is paralyzed by the fear of falling', 'the seagull fears hunger or the pilot fears lightning'],
                  hint: 'If stuck, review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis: Jahnavi".',
                  misconception: 'Students treat both characters as "brave heroes who overcame fear" and write generic praise.' },
                { id: 'b', prompt: 'Analyze how the *absence of a mentor* shapes each character\'s journey. The seagull\'s parents demonstrate but do not guide; the pilot has no human guide at all.', answer: 'The seagull grows through *observation and trial*',
                  options: ['The seagull grows through *observation and trial*', 'learn independently'],
                  hint: 'If stuck, review "Character Analysis: Suraj" (c6_english_u4_032) and "Character Analysis: Jahnavi".',
                  misconception: 'Students treat both characters as "brave heroes who overcame fear" and write generic praise.' }
          ],
            remediations: { 'students-treat-both-characters-as': { steps: ['Have the student draw a two-column table: "Seagull\'s Fear" vs.', 'Ask: "Which fear is chosen? Which is forced?"', 'Re-read the last paragraph of each story — highlight verbs showing agency ("dived", "flapped", "followed", "landed").', 'Practice writing one PEEL paragraph contrasting the *source* of their courage (instinct vs. faith).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
