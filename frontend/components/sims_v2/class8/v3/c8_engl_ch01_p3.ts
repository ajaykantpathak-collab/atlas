import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch01_p3 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch01_p3: SimDef = {
    id: 'v3_c8_engl_ch01_p3',
    title: 'The Wit that Won Hearts · Part 3/3',
    subtitle: 'See how a palace shapes every word spoken in it',
    classLevel: 8, subject: 'engl', topic: 'The Wit that Won Hearts · Part 3/3',
    chapters: ['c8_engl_ch01'],
    nodeIds: ['c8_engl_ch1_5', 'c8_engl_ch1_6', 'c8_engl_ch1_7', 'c8_engl_ch1_8', 'c8_engl_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a court observer in Vijayanagara', intro: 'You\'re inside Krishnadeva Raya\'s court — golden halls, strict protocol, poets everywhere. Figure out how this setting silently controls every conversation, then watch Tenali work it.', goal: 'Analyze how setting — place, time period and socio-cultural environment — shapes character behaviour, mood and plot in \'The Wit that Won Hearts\'.' },
    discovery: {
        question: 'In Krishnadeva Raya\'s court, you can\'t just tell the king he\'s wrong — one rude word could mean banishment. So how does a clever courtier deliver criticism?',
        options: ['Through wit, riddles and indirect diplomacy — the setting forces cleverness over plain speaking', 'By shouting the truth loudly at the assembly', 'By writing an angry letter to the newspaper', 'Courtiers simply never disagreed with kings'],
        answer: 'Through wit, riddles and indirect diplomacy — the setting forces cleverness over plain speaking',
        hook: 'Setting isn\'t wallpaper — it changes what characters can even say. In a court where disrespect is dangerous, a joke becomes the only safe weapon, which is exactly why Tenali Ramakrishna\'s wit mattered.',
    },
    teaching: [
        { title: 'Tenali Ramakrishna\'s Strategy: Using Wit to Resolve Conflict', text: 'Tenali Ramakrishna\'s conflict resolution strategy is a method of "indirect correction" that uses humor, absurdity, and parallel framing to expose the folly of a dispute.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch1_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the Vijayanagara court like a detective: spot the granite pillars, the hushed courtiers, the strict etiquette — then explain why this 16th-century world makes Tenali\'s humour the perfect tool for solving royal disputes.',
        labels: ['Tenali Ramakrishna\'s Strategy: Using', 'Theme: Power of Wit', 'Ashtadiggajas: The Eight Celebrated', 'Literary Device: Humour', 'Vocabulary in Context: Renowned,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch1_5', title: 'Tenali Ramakrishna\'s Strategy: Using Wit to Resolve Conflict',
          caseStudy: { intro: 'Imagine your two best friends have had a massive fight over who is better at sports, and they have stopped talking to each other.',
            decisions: [{ prompt: 'What is the primary difference between a "direct confrontation" strategy and Tenali Ramakrishna\'s "indirect correction" strategy?', options: [
                { text: 'Direct confrontation openly accuses a person of being wrong', outcome: 'Direct confrontation openly accuses a person of being wrong, which triggers defensiveness and.' },
                { text: 'being funny', outcome: 'Not quite — Students often confuse **wit** with **sarcasm** or **mockery**.', reveals: 'students-often-confuse-wit-with' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_7', title: 'Ashtadiggajas: The Eight Celebrated Poets of the Court',
          caseStudy: { intro: 'Imagine your school is participating in a major state-level championship.',
            decisions: [{ prompt: 'What does the term "Ashtadiggajas" literally mean, and whose royal court did they adorn?', options: [
                { text: 'The term "Ashtadiggajas" literally means "eight elephants in the eight directions" (the', outcome: 'The term "Ashtadiggajas" literally means "eight elephants in the eight directions" (the pillars.' },
                { text: 'eight poets', outcome: 'Not quite — Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali.', reveals: 'all-eight-of-the-ashtadiggajas' },
                { text: 'elephants', outcome: 'Not quite — Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali.', reveals: 'all-eight-of-the-ashtadiggajas' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_8', title: 'Literary Device: Humour and Its Role in the Narrative',
          caseStudy: { intro: 'Think about a time when a well-timed joke stopped an argument between friends or family members — the tension broke, people laughed, and the problem suddenly.',
            decisions: [{ prompt: 'What is the definition of humour as a literary device in a narrative?', options: [
                { text: 'Humour as a literary device is the use of wit, irony, exaggeration, or absurdity to amuse', outcome: 'Humour as a literary device is the use of wit, irony, exaggeration, or absurdity to amuse while.' },
                { text: 'humour is something funny', outcome: 'Not quite — Students often believe humour in a story is only for "light relief" or entertainment, so they label.', reveals: 'humour-in-a-story-is' },
                { text: 'light relief', outcome: 'Not quite — Students often believe humour in a story is only for "light relief" or entertainment, so they label.', reveals: 'humour-in-a-story-is' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_9', title: 'Vocabulary in Context: Renowned, Illustrious, Insurmountable, Trivial',
          caseStudy: { intro: 'Imagine you are playing a video game. You face a giant boss level that feels absolutely impossible to beat—this is an **insurmountable** obstacle.',
            decisions: [{ prompt: 'Define the word **insurmountable** and break it down into its prefix, root word, and suffix.', options: [
                { text: '**Answer:** *Insurmountable* means "impossible to overcome." * **Prefix:** *in-* (not) *', outcome: '**Answer:** *Insurmountable* means "impossible to overcome." * **Prefix:** *in-* (not) * **Root.' },
                { text: 'impossible to overcome', outcome: 'Not quite — Students often treat **renowned** and **illustrious** as completely interchangeable synonyms for.', reveals: 'students-often-treat-renowned-and' },
                { text: 'very difficult', outcome: 'Not quite — Students often treat **renowned** and **illustrious** as completely interchangeable synonyms for.', reveals: 'students-often-treat-renowned-and' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A class performs a skit where Tenali Ramakrishna marches up to King Krishnadeva Raya and shouts, \'You are wrong, Your Majesty!\' in front of the whole court. The teacher asks whether the scene is believable for its setting.',
            decisions: [{ prompt: 'What does the setting demand instead?', options: [
                { text: 'Indirect wit — a 16th-century royal court ran on strict protocol and the king\'s absolute power, so plain contradiction could mean banishment or worse; the setting is exactly why Tenali wraps criticism in humour and riddles.', outcome: 'This treats setting as more than a painted backdrop: time period, place and social rules together dictate how a character may speak.' },
                { text: 'The skit is fine — honest people speak their mind in every era, and setting is just scenery behind the dialogue.', outcome: 'That flattens setting into location only; the Vijayanagara court\'s hierarchy made direct defiance dangerous, so the scene breaks its own rules.', reveals: 'setting-is-scenery' },
                { text: 'Tenali should simply stay silent and say nothing at all, since courts tolerated no opinions.', outcome: 'Courtiers did influence kings — the point is how: clever indirection, not muteness, is what the setting makes necessary and what makes Tenali\'s role possible.', reveals: 'silence-is-safety' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Place, time and culture aren\'t background — they\'re the rules of the game. In a court that prizes intellect over muscle, wit wins hearts that swords never could.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch1_5', difficulty: 'standard',
          question: 'Tenali Ramakrishna\'s conflict resolution strategy is a method of "indirect.',
          hint: 'If you are stuck, review the details of the quarrel in `c8_engl_ch1_4` to see exactly why.',
          misconception: 'Students often confuse **wit** with **sarcasm** or **mockery**.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a "direct confrontation" strategy and Tenali Ramakrishna\'s "indirect correction" strategy?', answer: 'Direct confrontation openly accuses a person of being wrong',
                  options: ['Direct confrontation openly accuses a person of being wrong', 'being funny'],
                  hint: 'If you are stuck, review the details of the quarrel in `c8_engl_ch1_4` to see exactly why direct.',
                  misconception: 'Students often confuse **wit** with **sarcasm** or **mockery**.' }
          ],
            remediations: { 'students-often-confuse-wit-with': { steps: ['If a student struggles with this concept, use the "Mirror vs.', 'Explain: "Sarcasm is like pointing a bright flashlight directly into someone\'s eyes.', 'It blinds them, makes them angry, and they close their eyes (defensiveness).', 'Wit is like opening a window to let in natural light so they can see the room clearly for themselves." 2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_6', difficulty: 'standard',
          question: 'Wit is the ability to use quick, inventive, and sharp intelligence, while.',
          hint: 'If stuck, review node `c8_engl_ch1_5` to revisit how Tenali Ramakrishna planned and.',
          misconception: 'Students frequently mistake "wit and humour" for "clowning around or distraction." They assume Tenali Ramakrishna.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Wit is the ability to use quick, inventive, and sharp intelligence, while humour is the',
                  options: ['Wit is the ability to use quick, inventive, and sharp intelligence, while humour is the', 'Setting refers to the time, place, and socio-cultural environment in', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual'],
                  hint: 'If stuck, review node `c8_engl_ch1_5` to revisit how Tenali Ramakrishna planned and executed his.',
                  misconception: 'Students frequently mistake "wit and humour" for "clowning around or distraction." They assume Tenali Ramakrishna is merely telling jokes.' }
          ],
            remediations: { 'students-frequently-mistake-wit-and': { steps: ['Ask the student: "If your parent is very angry at a mistake you made, will arguing back make them calm down?" (Student.', 'Ask: "Why does direct arguing fail?" (Student answers: Because they feel challenged or disrespected). 3.', 'Explain the concept of the "Ego Shield." When people feel challenged, their pride puts up a shield.', 'Have the student rewrite a failed argument from the story into a "Witty Strategy" using a 2-column comparison table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_7', difficulty: 'standard',
          question: 'The Ashtadiggajas (literally meaning "eight elephants of the directions").',
          hint: 'If stuck, review how Tenali Ramakrishna uses his quick-thinking strategies.',
          misconception: 'Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali Ramakrishna.',
          parts: [
                { id: 'a', prompt: 'In a court dispute, a proud foreign scholar challenges the King with a highly complex riddle from ancient texts.', answer: '**Step-by-step application:** 1',
                  options: ['**Step-by-step application:** 1', 'funny court jesters'],
                  hint: 'If stuck, review how Tenali Ramakrishna uses his quick-thinking strategies in `c8_engl_ch1_2`.',
                  misconception: 'Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali Ramakrishna.' },
                { id: 'b', prompt: 'Read this short description: *"While the elder scholars debated the complex grammatical structure of the enemy king\'s threatening letter, Tenali Ramakrishna.', answer: 'This scene highlights the contrast between **bookish, formal scholarship** and',
                  options: ['This scene highlights the contrast between **bookish, formal scholarship** and', 'foolish', 'useless', 'funny court jesters'],
                  hint: 'If stuck, review how Tenali Ramakrishna uses his quick-thinking strategies in `c8_engl_ch1_2`.',
                  misconception: 'Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali Ramakrishna.' }
          ],
            remediations: { 'all-eight-of-the-ashtadiggajas': { steps: ['If the student struggles with this concept: 1.', 'Draw a clear analogy: "Think of a modern film crew.', 'You have serious dramatic actors, screenwriters, and directors who make grand historical movies (like the seven.', 'But you also need a brilliant comic actor who keeps the audience hooked and brings everyday joy (like Tenali).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali Ramakrishna.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: *"Without Tenali Ramakrishna\'s wit, the Ashtadiggajas would have been a dry, inaccessible group of scholars who could not help the.', answer: '*Stance - Agree:* I agree with this statement',
                  options: ['*Stance - Agree:* I agree with this statement', 'funny court jesters'],
                  hint: 'If stuck, review how Tenali Ramakrishna uses his quick-thinking strategies in `c8_engl_ch1_2`.',
                  misconception: 'Students often assume that all eight of the Ashtadiggajas were "funny court jesters" like Tenali Ramakrishna.' }
          ],
            remediations: { 'all-eight-of-the-ashtadiggajas': { steps: ['If the student struggles with this concept: 1.', 'Draw a clear analogy: "Think of a modern film crew.', 'You have serious dramatic actors, screenwriters, and directors who make grand historical movies (like the seven.', 'But you also need a brilliant comic actor who keeps the audience hooked and brings everyday joy (like Tenali).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_8', difficulty: 'standard',
          question: 'Humour as a literary device is the deliberate use of wit, irony, exaggeration.',
          hint: 'Re-read the plot summary (c8_engl_ch1_4) and Tenali\'s character profile (c8_engl_ch1_2).',
          misconception: 'Students often believe humour in a story is only for "light relief" or entertainment, so they label any funny line.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how humour in "The Wit that Won Hearts" is different from the humour in a limerick or a joke book.', answer: 'In the story, humour is integrated into the plot and character',
                  options: ['In the story, humour is integrated into the plot and character', 'both make people laugh', 'light relief', 'humour'],
                  hint: 'Re-read the plot summary (c8_engl_ch1_4) and Tenali\'s character profile (c8_engl_ch1_2) to locate.',
                  misconception: 'Students often believe humour in a story is only for "light relief" or entertainment, so they label any funny line as "humour" without.' }
          ],
            remediations: { 'humour-in-a-story-is': { steps: ['If a student cannot move beyond "it\'s funny," use a familiar Indian family scenario: "Imagine your parents are arguing.', 'Your older sibling says, \'At least the smoke alarm didn\'t call the fire brigade — it would have fined us for bad.', 'Now map this: 1) Conflict exists.', '2) Humorous exaggeration (hyperbole) reframes the mistake as absurd.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_9', difficulty: 'standard',
          question: '**Vocabulary in Context** involves determining the meaning of unfamiliar.',
          hint: 'If stuck, review the concept of "Adjectives and Context Clues" from Class 7.',
          misconception: 'Students often treat **renowned** and **illustrious** as completely interchangeable synonyms for "famous," and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Vocabulary in Context** involves determining the meaning of unfamiliar or nuanced words',
                  options: ['**Vocabulary in Context** involves determining the meaning of unfamiliar or nuanced words', 'Setting refers to the time, place, and socio-cultural environment in', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual'],
                  hint: 'If stuck, review the concept of "Adjectives and Context Clues" from Class 7.',
                  misconception: 'Students often treat **renowned** and **illustrious** as completely interchangeable synonyms for "famous," and **insurmountable** as.' }
          ],
            remediations: { 'students-often-treat-renowned-and': { steps: ['**Draw a "Scale of Difficulty" on a board:** Place a 1 at the left and a 10 at the right.', 'Put "trivial" (like a broken pencil lead) at 1.', 'Put "insurmountable" (like jumping to the moon) at 10.', 'Ask the student to place situations along this scale.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
