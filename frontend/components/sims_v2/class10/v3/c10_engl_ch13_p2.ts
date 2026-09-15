import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch13_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch13_p2: SimDef = {
    id: 'v3_c10_engl_ch13_p2',
    title: 'A Question of Trust · Part 2/2',
    subtitle: 'Pull off a careful robbery, then lose it all to a better liar',
    classLevel: 10, subject: 'engl', topic: 'A Question of Trust · Part 2/2',
    chapters: ['c10_engl_ch13'],
    nodeIds: ['c10_engl_cbse_13_007', 'c10_engl_cbse_13_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a gentleman thief with a passion for rare books', intro: 'Once a year you stop being a respectable locksmith and become a careful, solitary burglar — not for greed, but for beautiful rare books. This year\'s job at Shotover Grange is going perfectly. Almost.', goal: 'Trace how a single misplaced trust undid months of meticulous planning, and weigh the irony of a thief being out-thieved.' },
    discovery: {
        question: 'Horace Danby is a respectable locksmith who robs one safe a year to buy rare books. At Shotover Grange, a charming young woman catches him mid-robbery, sweet-talks him into opening the safe \'for her jewellery\' — and he goes to prison while she walks free. What was the twist?',
        options: ['She was a fellow thief who tricked him into leaving his fingerprints all over the safe', 'She was an undercover police officer gathering evidence', 'She was the house owner\'s wife setting a trap for him', 'She hypnotised him into confessing to the owners'],
        answer: 'She was a fellow thief who tricked him into leaving his fingerprints all over the safe',
        hook: 'The man who believed in \'honour among thieves\' met a thief who didn\'t. His careful gloves came off the moment he trusted the wrong person.',
    },
    teaching: [
        { title: 'Character Analysis: Horace\'s Dual Nature (Respectable vs Criminal)', text: 'Character analysis of Horace Danby focuses on the deliberate contrast the author creates between his public persona as a respectable, honest locksmith and his private identity as a meticulous, annual.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plan a \'perfect\' annual burglary as a meticulous, honest-in-public thief — then discover mid-heist that the most dangerous person in the house isn\'t carrying a weapon but a smile.',
        labels: ['Character Analysis: Horace\'s Dual', 'Irony: The Thief Who'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_007', title: 'Character Analysis: Horace\'s Dual Nature (Respectable vs Criminal)',
          caseStudy: { intro: 'Imagine meeting a neighbor who is polite, runs a successful business, and helps everyone — then discovering they secretly pick locks once a year to steal.',
            decisions: [{ prompt: 'What is Horace Danby\'s profession and how often does he commit robbery?', options: [
                { text: 'Horace Danby is a locksmith by profession and commits robbery once every year', outcome: 'Horace Danby is a locksmith by profession and commits robbery once every year.' },
                { text: 'he is a professional thief', outcome: 'Not quite — Students frequently write: "Horace Danby was a thief who pretended to be a locksmith." This.', reveals: 'students-frequently-write-horace-danby' },
                { text: 'he steals monthly', outcome: 'Not quite — Students frequently write: "Horace Danby was a thief who pretended to be a locksmith." This.', reveals: 'students-frequently-write-horace-danby' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_008', title: 'Irony: The Thief Who Gets Robbed by Another Thief',
          caseStudy: { intro: 'Imagine a pickpocket working a crowded Mumbai local train who carefully lifts a wallet — only to realize later his own pocket has been picked by someone else.',
            decisions: [{ prompt: 'What is the definition of situational irony as it applies to literature?', options: [
                { text: 'Situational irony is a literary device where the actual outcome of a situation is the', outcome: 'Situational irony is a literary device where the actual outcome of a situation is the opposite.' },
                { text: 'irony is when something funny happens', outcome: 'Not quite — Students often confuse situational irony with "poetic justice" or "karma," writing answers like.', reveals: 'students-often-confuse-situational-irony' },
                { text: 'irony is sarcasm', outcome: 'Not quite — Students often confuse situational irony with "poetic justice" or "karma," writing answers like.', reveals: 'students-often-confuse-situational-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student copies homework daily but insists, \'I\'m basically honest — I only copy because I have no time, and I\'d never actually steal anything.\' His friend is reminded of Horace Danby, the respectable locksmith who robbed one safe a year to buy rare books.',
            decisions: [{ prompt: 'What does \'A Question of Trust\' suggest about this kind of self-image?', options: [
                { text: 'That \'not completely honest\' is still dishonest — Horace too saw himself as good and respectable, stealing only for books he loved, yet the story strips that excuse: he is outwitted by someone even less honest and ends up in prison. A good reason for a dishonest act does not make it honest.', outcome: 'The chapter\'s irony is aimed exactly at this self-deception — Horace\'s hobby-theft felt civilised to him, but the law and a cleverer criminal treated it as plain theft.' },
                { text: 'The student\'s self-image is accurate — copying homework is nothing like real theft, so the comparison fails completely.', outcome: 'The scale differs but the pattern is identical — both excuse a small dishonesty with a reasonable-sounding story, which is precisely the habit the story warns about.', reveals: 'small-dishonesty-is-harmless' },
                { text: 'Horace was actually honest, since he stole only to buy books rather than for greed.', outcome: 'The purpose of a theft does not change the act — he took what was not his, and his taste for books made the irony sharper, not the crime cleaner.', reveals: 'theft-for-good-reason-is-ok' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_13_008', title: 'You made it',
          caseStudy: { intro: 'Horace planned for locks, alarms and dogs — everything except another thief. Charm turned out to be the only safe he couldn\'t crack.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_007', difficulty: 'standard',
          question: 'Character analysis of Horace Danby focuses on the deliberate contrast the.',
          hint: 'Review the "Character Analysis: The Grandmother (Krishtakka)" node (c9_engl_ch1_2).',
          misconception: 'Students frequently write: "Horace Danby was a thief who pretended to be a locksmith." This reverses the textual.',
          parts: [
                { id: 'a', prompt: 'What is Horace Danby\'s profession and how often does he commit robbery?', answer: 'Horace Danby is a locksmith by profession and commits robbery once every year',
                  options: ['Horace Danby is a locksmith by profession and commits robbery once every year', 'he is a professional thief', 'he steals monthly'],
                  hint: 'Review the "Character Analysis: The Grandmother (Krishtakka)" node (c9_engl_ch1_2) — specifically.',
                  misconception: 'Students frequently write: "Horace Danby was a thief who pretended to be a locksmith." This reverses the textual reality.' },
                { id: 'b', prompt: 'Explain why the townspeople consider Horace Danby a "good and respectable citizen" despite his secret.', answer: 'The townspeople respect Horace',
                  options: ['The townspeople respect Horace', 'because he donates to charity', 'because he never gets caught'],
                  hint: 'Review the "Character Analysis: The Grandmother (Krishtakka)" node (c9_engl_ch1_2) — specifically.',
                  misconception: 'Students frequently write: "Horace Danby was a thief who pretended to be a locksmith." This reverses the textual reality.' }
          ],
            remediations: { 'students-frequently-write-horace-danby': { steps: ['If a student persists in calling Horace "a thief who pretends to be a locksmith": 1.', 'Ask them to re-read the first two paragraphs and underline every phrase describing his legitimate life (locksmith.', 'Ask them to circle every phrase describing his criminal activity (once a year, steals, books, agent).', 'Have them count: 7+ details for respectability vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_13_008', difficulty: 'standard',
          question: 'Situational irony occurs when the outcome of a situation is starkly opposite.',
          hint: 'Review the woman in red\'s manipulation (node 004) and Horace\'s glove mistake (node 005).',
          misconception: 'Students often confuse situational irony with "poetic justice" or "karma," writing answers like "Horace got what.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of situational irony to a new scenario: A cybersecurity expert who hacks systems to expose vulnerabilities is tricked by a "client" into.', answer: 'Expectation: The expert protects systems and outsmarts attackers',
                  options: ['Expectation: The expert protects systems and outsmarts attackers', 'he got hacked', 'poetic justice', 'Horace got what he deserved'],
                  hint: 'Review the woman in red\'s manipulation (node 004) and Horace\'s glove mistake (node 005) — these are.',
                  misconception: 'Students often confuse situational irony with "poetic justice" or "karma," writing answers like "Horace got what he deserved because he was.' },
                { id: 'b', prompt: 'Analyze how the woman in red\'s deception creates a double layer of irony: she robs Horace, and she also robs the actual owners of Shotover Grange.', answer: 'First layer: Horace (thief) is robbed by another thief',
                  options: ['First layer: Horace (thief) is robbed by another thief', 'poetic justice', 'Horace got what he deserved'],
                  hint: 'Review the woman in red\'s manipulation (node 004) and Horace\'s glove mistake (node 005) — these are.',
                  misconception: 'Students often confuse situational irony with "poetic justice" or "karma," writing answers like "Horace got what he deserved because he was.' }
          ],
            remediations: { 'students-often-confuse-situational-irony': { steps: ['Ask the student to list Horace\'s expectations before entering Shotover Grange (steal jewels, leave no trace, maintain.', 'List the actual outcomes (fingerprints everywhere, jewels gone, honour used against him).', 'Have them draw a two-column table: Expectation vs.', 'Reality, and write one sentence explaining why each reversal is caused by Horace\'s own traits, not luck.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
