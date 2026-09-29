import type { SimDef } from '../../engine/types';

/** v3 generated — c8_engl_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_engl_ch01_p1: SimDef = {
    id: 'v3_c8_engl_ch01_p1',
    title: 'The Wit that Won Hearts · Part 1/3',
    subtitle: 'See how a palace shapes every word spoken in it',
    classLevel: 8, subject: 'engl', topic: 'The Wit that Won Hearts · Part 1/3',
    chapters: ['c8_engl_ch01'],
    nodeIds: ['c8_engl_ch1_1', 'c8_engl_ch1_10', 'c8_engl_ch1_11', 'c8_engl_ch1_12', 'c8_engl_ch1_13', 'c8_engl_ch1_14'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a court observer in Vijayanagara', intro: 'You\'re inside Krishnadeva Raya\'s court — golden halls, strict protocol, poets everywhere. Figure out how this setting silently controls every conversation, then watch Tenali work it.', goal: 'Analyze how setting — place, time period and socio-cultural environment — shapes character behaviour, mood and plot in \'The Wit that Won Hearts\'.' },
    discovery: {
        question: 'In Krishnadeva Raya\'s court, you can\'t just tell the king he\'s wrong — one rude word could mean banishment. So how does a clever courtier deliver criticism?',
        options: ['Through wit, riddles and indirect diplomacy — the setting forces cleverness over plain speaking', 'By shouting the truth loudly at the assembly', 'By writing an angry letter to the newspaper', 'Courtiers simply never disagreed with kings'],
        answer: 'Through wit, riddles and indirect diplomacy — the setting forces cleverness over plain speaking',
        hook: 'Setting isn\'t wallpaper — it changes what characters can even say. In a court where disrespect is dangerous, a joke becomes the only safe weapon, which is exactly why Tenali Ramakrishna\'s wit mattered.',
    },
    teaching: [
        { title: 'Setting: Vijayanagara Empire Under Krishnadeva Raya', text: 'From \'English chapter c8_engl_ch1\': the skill or concept this node teaches, applied to the actual text.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_engl_ch1_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the Vijayanagara court like a detective: spot the granite pillars, the hushed courtiers, the strict etiquette — then explain why this 16th-century world makes Tenali\'s humour the perfect tool for solving royal disputes.',
        labels: ['Setting: Vijayanagara Empire Under', 'Comprehension: How Tenali Reunited', 'Critical Thinking: Wit', 'Writing: Retelling a Story', 'Poem: Summary and Central', 'Poem: Rhyme Scheme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_engl_ch1_1', title: 'Setting: Vijayanagara Empire Under Krishnadeva Raya',
          caseStudy: { intro: 'Imagine visiting a grand, bustling palace filled with golden throne rooms, scholar-poets debating, and courtiers whispering under strict royal protocols—how.',
            decisions: [{ prompt: 'What are the three main components that make up the setting of a literary story set in a historical kingdom like Vijayanagara?', options: [
                { text: 'The three main components are physical place (the geography, palace, courtrooms), time', outcome: 'The three main components are physical place (the geography, palace, courtrooms), time period (the.' },
                { text: 'a palace in India', outcome: 'Not quite — Students often mistake "setting" as merely a passive physical location (e.g., "a palace in South.', reveals: 'students-often-mistake-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_11', title: 'Critical Thinking: Wit vs Force as Tools of Diplomacy',
          caseStudy: { intro: 'Imagine two students arguing over who gets to lead a school project team.',
            decisions: [{ prompt: 'What is the primary difference between using \'force\' and using \'wit\' to resolve a conflict?', options: [
                { text: '\'Force\' relies on power, threats, authority, or physical strength to compel obedience,', outcome: '\'Force\' relies on power, threats, authority, or physical strength to compel obedience, whereas.' },
                { text: 'telling jokes', outcome: 'Not quite — Students frequently misinterpret \'wit\' as merely making childish jokes or using deceitful tricks.', reveals: 'students-frequently-misinterpret-wit-as' },
                { text: 'only fighting in wars', outcome: 'Not quite — Students frequently misinterpret \'wit\' as merely making childish jokes or using deceitful tricks.', reveals: 'students-frequently-misinterpret-wit-as' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_12', title: 'Writing: Retelling a Story with Wit and Humour',
          caseStudy: { intro: 'Imagine listening to a friend recount a boring event vs. hearing a friend tell the exact same story so cleverly that the whole room bursts into laughter.',
            decisions: [{ prompt: 'What is the difference between simple humour and \'wit\' in story writing?', options: [
                { text: 'Humour refers generally to anything funny or amusing, whereas \'wit\' specifically refers', outcome: 'Humour refers generally to anything funny or amusing, whereas \'wit\' specifically refers to mental.' },
                { text: 'retelling a story with humour', outcome: 'Not quite — Students often believe that "retelling a story with humour" means adding childish slapstick, random.', reveals: 'retelling-a-story-with-humour' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_13', title: 'Poem: Summary and Central Idea of the Court Poem',
          caseStudy: { intro: 'Imagine you are telling a friend about a movie you watched. If you list the actions step-by-step—"First the king got angry, then the courtier cracked a joke.',
            decisions: [{ prompt: 'What is the primary difference between a poem\'s summary and its central idea?', options: [
                { text: 'A summary retells the sequence of events or main points stanza-by-stanza, whereas the', outcome: 'A summary retells the sequence of events or main points stanza-by-stanza, whereas the central idea.' },
                { text: 'Tenali Ramakrishna\'s Wit', outcome: 'Not quite — Students often confuse the **topic** (e.g., "Tenali Ramakrishna\'s Wit"), the **summary** (e.g.', reveals: 'students-often-confuse-the-topic' },
                { text: 'Tenali tells a story to the king, the king laughs and gives him gold', outcome: 'Not quite — Students often confuse the **topic** (e.g., "Tenali Ramakrishna\'s Wit"), the **summary** (e.g.', reveals: 'students-often-confuse-the-topic' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A class performs a skit where Tenali Ramakrishna marches up to King Krishnadeva Raya and shouts, \'You are wrong, Your Majesty!\' in front of the whole court. The teacher asks whether the scene is believable for its setting.',
            decisions: [{ prompt: 'What does the setting demand instead?', options: [
                { text: 'Indirect wit — a 16th-century royal court ran on strict protocol and the king\'s absolute power, so plain contradiction could mean banishment or worse; the setting is exactly why Tenali wraps criticism in humour and riddles.', outcome: 'This treats setting as more than a painted backdrop: time period, place and social rules together dictate how a character may speak.' },
                { text: 'The skit is fine — honest people speak their mind in every era, and setting is just scenery behind the dialogue.', outcome: 'That flattens setting into location only; the Vijayanagara court\'s hierarchy made direct defiance dangerous, so the scene breaks its own rules.', reveals: 'setting-is-scenery' },
                { text: 'Tenali should simply stay silent and say nothing at all, since courts tolerated no opinions.', outcome: 'Courtiers did influence kings — the point is how: clever indirection, not muteness, is what the setting makes necessary and what makes Tenali\'s role possible.', reveals: 'silence-is-safety' }
            ] }] } },
        { type: 'case', nodeId: 'c8_engl_ch1_14', title: 'The bigger picture',
          caseStudy: { intro: 'Place, time and culture aren\'t background — they\'re the rules of the game. In a court that prizes intellect over muscle, wit wins hearts that swords never could.',
            decisions: [{ prompt: 'What comes next? The Wit that Won Hearts · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Wit that Won Hearts · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_engl_ch1_1', difficulty: 'standard',
          question: 'From \'English chapter c8_engl_ch1\': the skill or concept this node teaches.',
          hint: 'If stuck, review how physical surroundings create mood in Class 7 story settings before.',
          misconception: 'Students often mistake "setting" as merely a passive physical location (e.g., "a palace in South India") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c8_engl_ch1\': the skill or concept this node teaches, applied to',
                  options: ['From \'English chapter c8_engl_ch1\': the skill or concept this node teaches, applied to', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual', 'Retelling a story with wit and humour involves taking a base narrative and enhancing it'],
                  hint: 'If stuck, review how physical surroundings create mood in Class 7 story settings before evaluating.',
                  misconception: 'Students often mistake "setting" as merely a passive physical location (e.g., "a palace in South India") rather than an active literary.' }
          ],
            remediations: { 'students-often-mistake-setting-as': { steps: ['When a student ignores the cultural/historical setting, walk them through the "3-Layer Setting Map": (1) Physical Space.', 'Have the student re-read a paragraph describing the court and ask: "If Tenali said \'You are wrong, King!\' directly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_10', difficulty: 'standard',
          question: 'Comprehension of narrative resolution in folk literature involves analyzing how.',
          hint: 'If stuck on constructing comprehension answers, review node `c8_engl_ch1_5` to recap.',
          misconception: 'Students often write comprehension answers as simple plot retellings (e.g., "Tenali did a trick, the King laughed, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comprehension of narrative resolution in folk literature involves analyzing how a',
                  options: ['Comprehension of narrative resolution in folk literature involves analyzing how a', 'From \'English chapter c8_engl_ch1\': the skill or concept this node teaches, applied to', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual', 'Retelling a story with wit and humour involves taking a base narrative and enhancing it'],
                  hint: 'If stuck on constructing comprehension answers, review node `c8_engl_ch1_5` to recap Tenali\'s.',
                  misconception: 'Students often write comprehension answers as simple plot retellings (e.g., "Tenali did a trick, the King laughed, and then they stopped.' }
          ],
            remediations: { 'students-often-write-comprehension-answers': { steps: ['Teach the PEEL Framework explicitly: 1.', '**Point**: State your claim clearly in the first sentence.', '**Evidence**: Mention specific actions or dialogue from the text.', '**Explanation**: Explain *why* this action caused a shift in character thinking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_11', difficulty: 'standard',
          question: 'Wit versus force as tools of diplomacy is the critical evaluation of how.',
          hint: 'If stuck, review node `c8_engl_ch1_5` to see the exact steps Tenali Ramakrishna took.',
          misconception: 'Students frequently misinterpret \'wit\' as merely making childish jokes or using deceitful tricks, and \'force\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual',
                  options: ['Wit versus force as tools of diplomacy is the critical evaluation of how intellectual', 'From \'English chapter c8_engl_ch1\': the skill or concept this node teaches, applied to', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Retelling a story with wit and humour involves taking a base narrative and enhancing it'],
                  hint: 'If stuck, review node `c8_engl_ch1_5` to see the exact steps Tenali Ramakrishna took to resolve the.',
                  misconception: 'Students frequently misinterpret \'wit\' as merely making childish jokes or using deceitful tricks, and \'force\' as strictly physical combat.' }
          ],
            remediations: { 'students-frequently-misinterpret-wit-as': { steps: ['When a student exhibits this misconception, take these immediate remediation steps: 1.', 'Clarify definitions using a simple direct contrast: "Force = commanding people what to do through power; Wit = helping.', 'Walk through a non-literary analogy: Contrast a referee giving a player a penalty card (Force) versus a referee using.', 'Re-read the relevant scene in the text with the student and highlight the exact words Tenali Ramakrishna used.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_12', difficulty: 'standard',
          question: 'Retelling a story with wit and humour involves taking a base narrative and.',
          hint: 'If stuck, review how humor devices (irony, exaggeration, snappy dialogue) work using node.',
          misconception: 'Students often believe that "retelling a story with humour" means adding childish slapstick, random silly sounds (like.',
          parts: [
                { id: 'a', prompt: 'Analyze the comic effect in this passage: "King Krishnadeva Raya glared at the burnt dish.', answer: 'The device used is internal monologue combined with dramatic irony/humorous',
                  options: ['The device used is internal monologue combined with dramatic irony/humorous', 'retelling a story with humour'],
                  hint: 'If stuck, review how humor devices (irony, exaggeration, snappy dialogue) work using node.',
                  misconception: 'Students often believe that "retelling a story with humour" means adding childish slapstick, random silly sounds (like "boing" or "oops").' }
          ],
            remediations: { 'retelling-a-story-with-humour': { steps: ['When a student defaults to slapstick or silly jokes: 1.', 'Show them two contrasting lines: "The guard fell into a puddle (Slapstick)" vs.', '"The guard fell into a puddle, declaring he was merely inspecting the mud for royal safety (Wit)." 2.', 'Explain that wit comes from the *brain* and *words*, not physical accidents.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_12', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "retelling a story with humour" means adding childish slapstick, random silly sounds (like.',
          parts: [
                { id: 'a', prompt: 'Evaluate these two retellings of Tenali Ramakrishna tricking a greedy scholar: Version A: "Tenali gave the scholar a box of mud and said it contained rare.', answer: 'Version B is far more effective',
                  options: ['Version B is far more effective', 'it is shorter and gets straight to the point', 'retelling a story with humour'],
                  hint: 'If stuck, review how humor devices (irony, exaggeration, snappy dialogue) work using node.',
                  misconception: 'Students often believe that "retelling a story with humour" means adding childish slapstick, random silly sounds (like "boing" or "oops").' }
          ],
            remediations: { 'retelling-a-story-with-humour': { steps: ['When a student defaults to slapstick or silly jokes: 1.', 'Show them two contrasting lines: "The guard fell into a puddle (Slapstick)" vs.', '"The guard fell into a puddle, declaring he was merely inspecting the mud for royal safety (Wit)." 2.', 'Explain that wit comes from the *brain* and *words*, not physical accidents.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_13', difficulty: 'standard',
          question: 'A poem **summary** is a concise restatement of the main events or narrative.',
          hint: 'If stuck, ask the student: "What happens at the beginning, middle, and end of the poem?".',
          misconception: 'Students often confuse the **topic** (e.g., "Tenali Ramakrishna\'s Wit"), the **summary** (e.g., "Tenali tells a story.',
          parts: [
                { id: 'a', prompt: 'Read the following statement about a court poem: *"The poem describes how Tenali Rama enters the royal court, presents a clever riddle to King Krishnadeva.', answer: 'This statement is a **summary**',
                  options: ['This statement is a **summary**', 'what happens in the poem', 'the underlying theme of the poem', 'Tenali Ramakrishna\'s Wit'],
                  hint: 'If stuck, ask the student: "What happens at the beginning, middle, and end of the poem?" Write.',
                  misconception: 'Students often confuse the **topic** (e.g., "Tenali Ramakrishna\'s Wit"), the **summary** (e.g., "Tenali tells a story to the king, the king.' },
                { id: 'b', prompt: 'A court poem describes a king who threatens war over an insult, but his wise poet recites a verse showing how anger destroys kingdoms, prompting the king.', answer: '**B**',
                  options: ['**B**', 'Tenali Ramakrishna\'s Wit', 'Tenali tells a story to the king, the king laughs and gives him gold', 'Intellectual wit and humour are effective tools for diplomatic problem-solving'],
                  hint: 'If stuck, ask the student: "What happens at the beginning, middle, and end of the poem?" Write.',
                  misconception: 'Students often confuse the **topic** (e.g., "Tenali Ramakrishna\'s Wit"), the **summary** (e.g., "Tenali tells a story to the king, the king.' }
          ],
            remediations: { 'students-often-confuse-the-topic': { steps: ['When a student fails to distinguish summary from central idea, follow this 4-step remediation: 1.', '**The "Topic vs Message" Test:** Ask the student to state the topic in 1–2 words (e.g., "Wit").', 'Then ask: "What does the poet want us to understand *about* wit?" Force them to write a full sentence starting with.', '**Two-Column Chart:** Have the student draw a table with two columns labeled *"What Happens in the Stanza (Summary)"*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_engl_ch1_14', difficulty: 'standard',
          question: 'Rhyme scheme is the patterned arrangement of rhyming sounds at the ends.',
          hint: 'If stuck, read the final words of each line in isolation out loud, ignore line meanings.',
          misconception: 'Students often confuse eye-rhyme (words that look visually similar, such as *crown* and *own*, or *cough* and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rhyme scheme is the patterned arrangement of rhyming sounds at the ends of poetic lines,',
                  options: ['Rhyme scheme is the patterned arrangement of rhyming sounds at the ends of poetic lines,', 'From \'English chapter c8_engl_ch1\': the skill or concept this node teaches, applied to', 'Comprehension of narrative resolution in folk literature involves analyzing how a', 'Wit versus force as tools of diplomacy is the critical evaluation of how intellectual'],
                  hint: 'If stuck, read the final words of each line in isolation out loud, ignore line meanings.',
                  misconception: 'Students often confuse eye-rhyme (words that look visually similar, such as *crown* and *own*, or *cough* and *through*) with true phonetic.' }
          ],
            remediations: { 'students-often-confuse-eye-rhyme': { steps: ['When a student struggles, take them back to the "Clap and Tap" exercise.', 'Read the lines aloud together and tap a desk or clap on every spoken syllable rather than counting words on paper.', 'Have the student write down the syllable counts next to each line.', 'To fix end-rhyme errors, ask the student to pronounce only the final sound of each line into a microphone or out loud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
