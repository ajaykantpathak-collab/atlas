import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch01_p2: SimDef = {
    id: 'v3_c8_engl_ch01_p2',
    title: 'The Wit that Won Hearts · Part 2/3',
    subtitle: 'See how a palace shapes every word spoken in it',
    classLevel: 8, subject: 'engl', topic: 'The Wit that Won Hearts · Part 2/3',
    chapters: ['c8_engl_ch01'],
    nodeIds: ['c8_engl_ch1_15', 'c8_engl_ch1_16', 'c8_engl_ch1_17', 'c8_engl_ch1_2', 'c8_engl_ch1_3', 'c8_engl_ch1_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a court observer in Vijayanagara', intro: 'You\'re inside Krishnadeva Raya\'s court — golden halls, strict protocol, poets everywhere. Figure out how this setting silently controls every conversation, then watch Tenali work it.', goal: 'Analyze how setting — place, time period and socio-cultural environment — shapes character behaviour, mood and plot in \'The Wit that Won Hearts\'.' },
    discovery: {
        question: 'In Krishnadeva Raya\'s court, you can\'t just tell the king he\'s wrong — one rude word could mean banishment. So how does a clever courtier deliver criticism?',
        options: ['Through wit, riddles and indirect diplomacy — the setting forces cleverness over plain speaking', 'By shouting the truth loudly at the assembly', 'By writing an angry letter to the newspaper', 'Courtiers simply never disagreed with kings'],
        answer: 'Through wit, riddles and indirect diplomacy — the setting forces cleverness over plain speaking',
        hook: 'Setting isn\'t wallpaper — it changes what characters can even say. In a court where disrespect is dangerous, a joke becomes the only safe weapon, which is exactly why Tenali Ramakrishna\'s wit mattered.',
    },
    teaching: [
        { title: 'Poetic Devices: Metaphor and Hyperbole in Court Poetry', text: 'A metaphor is a figure of speech that directly equates two unrelated things to transfer qualities from one to the other (without using "like" or "as"), while a hyperbole is deliberate, extreme.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch1_15', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the Vijayanagara court like a detective: spot the granite pillars, the hushed courtiers, the strict etiquette — then explain why this 16th-century world makes Tenali\'s humour the perfect tool for solving royal disputes.',
        labels: ['Poetic Devices: Metaphor', 'Poem: Tone of Reverence', 'Writing: How to Structure', 'Character Analysis: Tenali Ramakrishna', 'Character Analysis: King Krishnadeva', 'Plot: The Quarrel Between'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch1_15', title: 'Poetic Devices: Metaphor and Hyperbole in Court Poetry',
          caseStudy: { intro: 'If a court poet proclaimed, "King Krishnadeva Raya\'s sword drank a thousand rivers of fear," did the sword literally open a mouth and sip water? Of course not!',
            decisions: [{ prompt: 'What is the structural difference between a simile and a metaphor?', options: [
                { text: 'A simile compares two things using comparison words such as "like" or "as" (e.g., "The', outcome: 'A simile compares two things using comparison words such as "like" or "as" (e.g., "The king is.' },
                { text: 'The King is a lion', outcome: 'Not quite — Students often mistake **Metaphor** for **Hyperbole** whenever an expression sounds impossible.', reveals: 'students-often-mistake-metaphor-for' },
                { text: 'A human cannot be an animal, so', outcome: 'Not quite — Students often mistake **Metaphor** for **Hyperbole** whenever an expression sounds impossible.', reveals: 'students-often-mistake-metaphor-for' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_17', title: 'Writing: How to Structure a Poem Analysis Answer (PEEL Method)',
          caseStudy: { intro: 'Imagine you are asked: "How does the poet convey admiration for the king in the court poem?" A typical student writes: "The poet really admires the king and.',
            decisions: [{ prompt: 'A student writes: "The poem is very beautiful and the poet uses many good devices." Identify which PEEL component is missing and rewrite.', options: [
                { text: 'The missing component is Evidence (and the Point is too vague)', outcome: 'The missing component is Evidence (and the Point is too vague).' },
                { text: 'add a quote', outcome: 'Not quite — Students treat PEEL as a rigid template where each letter gets one sentence, producing shallow.', reveals: 'students-treat-peel-as-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_3', title: 'Character Analysis: King Krishnadeva Raya as a Wise Ruler',
          caseStudy: { intro: 'Imagine your school principal makes a strict new rule that everyone in school dislikes.',
            decisions: [{ prompt: 'What is a "dynamic character," and would you classify King Krishnadeva Raya as one based on his actions in the story?', options: [
                { text: 'A dynamic character is one who undergoes an internal change, growth, or development', outcome: 'A dynamic character is one who undergoes an internal change, growth, or development throughout.' },
                { text: 'static', outcome: 'Not quite — Students often believe that because King Krishnadeva Raya got angry and engaged in a petty quarrel.', reveals: 'because-king-krishnadeva-raya-got' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_4', title: 'Plot: The Quarrel Between the King and Queen Thirumalambal',
          caseStudy: { intro: 'Think about a time a small argument between your parents or teachers created a tense atmosphere at home or school — everyone walked on eggshells until someone.',
            decisions: [{ prompt: 'What is the immediate cause of the quarrel between King Krishnadeva Raya and Queen Thirumalambal in the story?', options: [
                { text: 'The quarrel begins over a trivial matter: the King casually remarks that the Queen\'s', outcome: 'The quarrel begins over a trivial matter: the King casually remarks that the Queen\'s favourite.' },
                { text: 'a political dispute', outcome: 'Not quite — Students treat the quarrel as just "a fight scene" to summarize, rather than a **structural.', reveals: 'students-treat-the-quarrel-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_15', title: 'Use it in the wild',
          caseStudy: { intro: 'A class performs a skit where Tenali Ramakrishna marches up to King Krishnadeva Raya and shouts, \'You are wrong, Your Majesty!\' in front of the whole court. The teacher asks whether the scene is believable for its setting.',
            decisions: [{ prompt: 'What does the setting demand instead?', options: [
                { text: 'Indirect wit — a 16th-century royal court ran on strict protocol and the king\'s absolute power, so plain contradiction could mean banishment or worse; the setting is exactly why Tenali wraps criticism in humour and riddles.', outcome: 'This treats setting as more than a painted backdrop: time period, place and social rules together dictate how a character may speak.' },
                { text: 'The skit is fine — honest people speak their mind in every era, and setting is just scenery behind the dialogue.', outcome: 'That flattens setting into location only; the Vijayanagara court\'s hierarchy made direct defiance dangerous, so the scene breaks its own rules.', reveals: 'setting-is-scenery' },
                { text: 'Tenali should simply stay silent and say nothing at all, since courts tolerated no opinions.', outcome: 'Courtiers did influence kings — the point is how: clever indirection, not muteness, is what the setting makes necessary and what makes Tenali\'s role possible.', reveals: 'silence-is-safety' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_4', title: 'The bigger picture',
          caseStudy: { intro: 'Place, time and culture aren\'t background — they\'re the rules of the game. In a court that prizes intellect over muscle, wit wins hearts that swords never could.',
            decisions: [{ prompt: 'What comes next? The Wit that Won Hearts · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Wit that Won Hearts · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch1_15', difficulty: 'standard',
          question: 'A metaphor is a figure of speech that directly equates two unrelated things.',
          hint: 'If stuck, review c7_engl_ch01_014 to practice identifying simple metaphors before.',
          misconception: 'Students often mistake **Metaphor** for **Hyperbole** whenever an expression sounds impossible or dramatic.',
          parts: [
                { id: 'a', prompt: 'Read this line praising a court minister: "His mind is an endless library where wisdom never sleeps." Explain why this line is a metaphor and what specific.', answer: 'This line is a metaphor',
                  options: ['This line is a metaphor', 'a mind cannot literally be a building', 'The King is a lion', 'A human cannot be an animal, so'],
                  hint: 'If stuck, review c7_engl_ch01_014 to practice identifying simple metaphors before analyzing court.',
                  misconception: 'Students often mistake **Metaphor** for **Hyperbole** whenever an expression sounds impossible or dramatic.' }
          ],
            remediations: { 'students-often-mistake-metaphor-for': { steps: ['When a student makes this error, apply the two-step **Equality vs.', '**The Metaphor Test (A = B):** Ask, "Is the poet saying Thing A IS Thing B to share a quality?" If yes, it is.', '**The Hyperbole Test (Magnification):** Ask, "Is the poet taking a number, physical effect, or quantity and stretching.', 'Practice applying these two test questions on simple phrases before returning to court poetry stanzas.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_15', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often mistake **Metaphor** for **Hyperbole** whenever an expression sounds impossible or dramatic.',
          parts: [
                { id: 'a', prompt: 'A student states: "Court poets used hyperbole because they were telling lies to fool the king into giving them gold coins." Critique this statement.', answer: 'The student\'s claim is incorrect',
                  options: ['The student\'s claim is incorrect', 'The King is a lion', 'A human cannot be an animal, so'],
                  hint: 'If stuck, review c7_engl_ch01_014 to practice identifying simple metaphors before analyzing court.',
                  misconception: 'Students often mistake **Metaphor** for **Hyperbole** whenever an expression sounds impossible or dramatic.' }
          ],
            remediations: { 'students-often-mistake-metaphor-for': { steps: ['When a student makes this error, apply the two-step **Equality vs.', '**The Metaphor Test (A = B):** Ask, "Is the poet saying Thing A IS Thing B to share a quality?" If yes, it is.', '**The Hyperbole Test (Magnification):** Ask, "Is the poet taking a number, physical effect, or quantity and stretching.', 'Practice applying these two test questions on simple phrases before returning to court poetry stanzas.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_16', difficulty: 'standard',
          question: 'The tone of reverence and admiration in a poem refers to the speaker\'s attitude.',
          hint: 'If stuck, review how adjectives change the mood of a sentence in `c7_engl_ch03_015`.',
          misconception: 'Students often mistake *reverence and admiration* for a simple *happy or excited* tone.',
          parts: [
                { id: 'a', prompt: 'Read these two lines describing a court advisor: *Line A: "He trickster-like did slide away, with pockets full of gold."* *Line B: "With silver tongue and.', answer: 'Line B carries a tone of admiration',
                  options: ['Line B carries a tone of admiration', 'sounds positive, it reveals they are just scanning for isolated', 'words rather than analyzing how adjectives ('],
                  hint: 'If stuck, review how adjectives change the mood of a sentence in `c7_engl_ch03_015`.',
                  misconception: 'Students often mistake *reverence and admiration* for a simple *happy or excited* tone.' }
          ],
            remediations: { 'students-often-mistake-reverence-and': { steps: ['If a student struggles, take them out of the poem first.', 'Ask them: *"If you met a real-world hero, like a brave firefighter or a great historical leader, would you jump up and.', 'This visual highlighting helps them locate the exact building blocks of reverence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_17', difficulty: 'standard',
          question: 'The PEEL method is a structured writing framework for literary analysis.',
          hint: 'If students cannot move beyond paraphrase in the Explanation, review literary device.',
          misconception: 'Students treat PEEL as a rigid template where each letter gets one sentence, producing shallow answers.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The poem is very beautiful and the poet uses many good devices." Identify which PEEL component is missing and rewrite the sentence as.', answer: 'The missing component is Evidence (and the Point is too vague)',
                  options: ['The missing component is Evidence (and the Point is too vague)', 'add a quote'],
                  hint: 'If students cannot move beyond paraphrase in the Explanation, review literary device identification.',
                  misconception: 'Students treat PEEL as a rigid template where each letter gets one sentence, producing shallow answers.' }
          ],
            remediations: { 'students-treat-peel-as-a': { steps: ['Give the student a weak PEEL paragraph and ask them to circle each component.', 'If they cannot find the Explanation, they are paraphrasing, not analyzing.', 'Provide a quotation and ask: "What device is used?', 'What does it make the reader feel?" — these three answers become the Explanation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_2', difficulty: 'standard',
          question: 'Character analysis of Tenali Ramakrishna as a witty advisor examines his.',
          hint: 'If stuck, review how characters reveal who they are through what they say and do using.',
          misconception: 'Students frequently misinterpret Tenali Ramakrishna as merely a court jester whose sole function is to provide.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of Tenali Ramakrishna as a witty advisor examines his defining',
                  options: ['Character analysis of Tenali Ramakrishna as a witty advisor examines his defining', 'Setting refers to the time, place, and socio-cultural environment in', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual'],
                  hint: 'If stuck, review how characters reveal who they are through what they say and do using.',
                  misconception: 'Students frequently misinterpret Tenali Ramakrishna as merely a court jester whose sole function is to provide slapstick humor and silly.' }
          ],
            remediations: { 'students-frequently-misinterpret-tenali-ramakris': { steps: ['To fix this misconception, guide the student through the "Humor with Purpose" framework.', 'Ask the student two guiding questions whenever Tenali acts: (1) "What problem is the King or court facing?" and (2).', 'Have the student rewrite their character description by replacing words like "funny/silly" with precise trait words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_3', difficulty: 'standard',
          question: 'Character analysis of King Krishnadeva Raya as a wise ruler involves examining.',
          hint: 'If you are stuck, think of your favorite superhero. Do they ever make mistakes or get.',
          misconception: 'Students often believe that because King Krishnadeva Raya got angry and engaged in a petty quarrel with the Queen,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Character analysis of King Krishnadeva Raya as a wise ruler involves examining his',
                  options: ['Character analysis of King Krishnadeva Raya as a wise ruler involves examining his', 'Setting refers to the time, place, and socio-cultural environment in', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual'],
                  hint: 'If you are stuck, think of your favorite superhero. Do they ever make mistakes or get beaten in.',
                  misconception: 'Students often believe that because King Krishnadeva Raya got angry and engaged in a petty quarrel with the Queen, he cannot be analyzed.' }
          ],
            remediations: { 'because-king-krishnadeva-raya-got': { steps: ['If a student struggles with this, use the **"Mirror and Mud"** analogy: 1.', 'Ask: "If a brilliant scientist accidentally steps in a puddle and gets mud on their shoes, does that mean they are.', 'No, it just means they made a mess." 2.', 'Explain: "The King\'s quarrel with the Queen is like stepping in a mud puddle.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_4', difficulty: 'standard',
          question: 'Plot is the sequence of events that make up a story, arranged in.',
          hint: 'Review "plot mountain" diagram and practice mapping a familiar story (e.g.,.',
          misconception: 'Students treat the quarrel as just "a fight scene" to summarize, rather than a **structural hinge**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plot is the sequence of events that make up a story, arranged in a cause-and-effect chain',
                  options: ['Plot is the sequence of events that make up a story, arranged in a cause-and-effect chain', 'Setting refers to the time, place, and socio-cultural environment in', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual'],
                  hint: 'Review "plot mountain" diagram and practice mapping a familiar story (e.g., a Panchatantra tale).',
                  misconception: 'Students treat the quarrel as just "a fight scene" to summarize, rather than a **structural hinge**.' }
          ],
            remediations: { 'students-treat-the-quarrel-as': { steps: ['Have the student draw a **cause-effect chain**: Trivial remark → Hurt pride → Public silence → Court paralysis →.', 'Ask: "At which link could the chain have broken naturally?" (Answer: nowhere — that\'s why Tenali is needed).', 'Compare with a personal example: "Have you ever had a fight where neither person could apologize first?', 'What finally broke it?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
