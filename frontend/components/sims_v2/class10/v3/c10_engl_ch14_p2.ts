import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch14_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch14_p2: SimDef = {
    id: 'v3_c10_engl_ch14_p2',
    title: 'Footprints without Feet · Part 2/2',
    subtitle: 'Become invisible — and learn why that solves nothing',
    classLevel: 10, subject: 'engl', topic: 'Footprints without Feet · Part 2/2',
    chapters: ['c10_engl_ch14'],
    nodeIds: ['c10_engl_cbse_14_007', 'c10_engl_cbse_14_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a brilliant but lawless scientist', intro: 'You have done what no physicist dreamed of: swallowed rare drugs, watched your body turn transparent as air. Then you step outside into a London January and realise the cold doesn\'t care that it can\'t see you.', goal: 'Explain the refractive-index logic of Griffin\'s invisibility and judge how a discovery\'s value depends on the hands that hold it.' },
    discovery: {
        question: 'Griffin discovers drugs that make the human body\'s refractive index match air — light passes through him, so he becomes invisible. But footprints appear in mud, snow shows his steps, and stolen food bulges visibly in his invisible stomach. What does this reveal about his \'perfect\' power?',
        options: ['Invisibility hides the body, not its effects — he still leaves evidence wherever he goes', 'The drugs were imperfect and kept wearing off randomly', 'His power worked only in daylight, like a vampire reversed', 'He could only stay invisible while holding his breath'],
        answer: 'Invisibility hides the body, not its effects — he still leaves evidence wherever he goes',
        hook: 'Griffin could vanish but could not hide his footprints, his breath in cold air, or the food inside him. Being unseen is not the same as being untraceable.',
    },
    teaching: [
        { title: 'Theme: Misuse of Scientific Discovery and Its Consequences', text: 'The theme "Misuse of Scientific Discovery and Its Consequences" refers to the central idea in *Footprints without Feet* that scientific breakthroughs, when pursued without ethical responsibility.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Test a scientific breakthrough that bends light around a human body — then survive a winter night as an invisible man who still needs warmth, food and shelter, all of which give him away.',
        labels: ['Theme: Misuse of Scientific', 'Character Analysis: Griffin as'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_007', title: 'Theme: Misuse of Scientific Discovery and Its Consequences',
          caseStudy: { intro: 'Imagine a scientist in today\'s India invents a device that can make anyone invisible.',
            decisions: [{ prompt: 'State the central theme of *Footprints without Feet* in one precise sentence, using the exact terminology expected in a CBSE board answer.', options: [
                { text: 'Correct answer: "The central theme is the misuse of scientific discovery and its', outcome: 'Correct answer: "The central theme is the misuse of scientific discovery and its consequences.' },
                { text: 'A wrong answer like', outcome: 'Not quite — Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write.', reveals: 'the-theme-is-science-is' },
                { text: 'Griffin is a bad person', outcome: 'Not quite — Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write.', reveals: 'the-theme-is-science-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_008', title: 'Character Analysis: Griffin as a Brilliant but Lawless Scientist',
          caseStudy: { intro: 'Imagine you are a judge in a courtroom where Griffin stands trial for his crimes — but his defense lawyer argues, "He\'s a genius who discovered invisibility!',
            decisions: [{ prompt: 'What are the TWO defining character traits of Griffin as presented in the chapter \'Footprints without Feet\'?', options: [
                { text: 'Griffin is defined by his **scientific brilliance** (he discovers the formula for', outcome: 'Griffin is defined by his **scientific brilliance** (he discovers the formula for invisibility.' },
                { text: 'he is a misunderstood genius', outcome: 'Not quite — Students often write: "Griffin is a tragic hero because society rejected him." This is wrong.', reveals: 'students-often-write-griffin-is' },
                { text: 'he is just a criminal', outcome: 'Not quite — Students often write: "Griffin is a tragic hero because society rejected him." This is wrong.', reveals: 'students-often-write-griffin-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a sleepover, the group debates which superpower they\'d want. Most pick invisibility — \'imagine what you could get away with!\' One quiet kid who just read \'Footprints without Feet\' says the story changed his mind.',
            decisions: [{ prompt: 'What caution does Griffin\'s story actually offer?', options: [
                { text: 'That a great power without character becomes a crime spree — Griffin was a brilliant scientist who made his body transparent like glass, but instead of serving science he used invisibility to steal, assault and terrorise. The story shows the discovery was not the problem; the man misusing it was. A power only amplifies what the person already is.', outcome: 'Griffin could have been celebrated for one of the great discoveries; because he chose selfish ends, invisibility turned a promising scientist into a hunted lawbreaker.' },
                { text: 'The story proves science itself is dangerous — discoveries like invisibility should simply never be made.', outcome: 'The science was neutral — the harm came from Griffin\'s choices; a discovery\'s danger lies in its misuse, not its existence.', reveals: 'science-itself-is-evil' },
                { text: 'It proves invisibility is the best power to have, since Griffin got away with everything thanks to it.', outcome: 'He did not get away — he was chased, freezing, forced to bandage himself visible again, and finally cornered; the power gave him no peace at all.', reveals: 'invisibility-has-no-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_008', title: 'You made it',
          caseStudy: { intro: 'Science gave Griffin a miracle, and he used it for arson and theft. The footprints in the snow were the honest part of him — the man remained visible in his choices.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_007', difficulty: 'standard',
          question: 'The theme "Misuse of Scientific Discovery and Its Consequences" refers to the.',
          hint: 'If stuck, review the "Theme and Message" nodes from Class 6 (c6_english_u1_003) and Class.',
          misconception: 'Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write answers like.',
          parts: [
                { id: 'a', prompt: 'State the central theme of *Footprints without Feet* in one precise sentence, using the exact terminology expected in a CBSE board answer.', answer: 'Correct answer: "The central theme is the misuse of scientific discovery and its',
                  options: ['Correct answer: "The central theme is the misuse of scientific discovery and its', 'A wrong answer like', 'Griffin is a bad person', 'Science is dangerous'],
                  hint: 'If stuck, review the "Theme and Message" nodes from Class 6 (c6_english_u1_003) and Class 7.',
                  misconception: 'Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write answers like "Griffin suffered because.' },
                { id: 'b', prompt: 'Explain in your own words why Griffin\'s decision to set fire to his landlord\'s house (Node c10_engl_cbse_14_002) is the *first critical misuse* of his.', answer: 'Correct answer: Setting the house on fire is the first misuse',
                  options: ['Correct answer: Setting the house on fire is the first misuse', 'He was angry at his landlord', 'Science is dangerous', 'Invisibility is a curse'],
                  hint: 'If stuck, review the "Theme and Message" nodes from Class 6 (c6_english_u1_003) and Class 7.',
                  misconception: 'Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write answers like "Griffin suffered because.' }
          ],
            remediations: { 'the-theme-is-science-is': { steps: ['Have the student re-read the summary of Nodes 001–006 and highlight every verb that shows Griffin *choosing* an action.', 'Ask: "If Griffin had the same power but chose differently at *each* highlighted moment, what would change?" Write two.', 'Guide them to formulate the theme sentence: "When a scientific discovery is **misused** (choice), it leads.', 'Practice writing one PEEL paragraph using the fire incident: Point → Evidence (quote/action) → Explanation (why it\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write answers like.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "Griffin\'s downfall was inevitable the moment he chose to keep his discovery secret and use it for personal gain." Defend or challenge this statement.', answer: 'Correct answer (defend): "The statement is accurate',
                  options: ['Correct answer (defend): "The statement is accurate', 'A wrong answer that says', 'Science is dangerous', 'Invisibility is a curse'],
                  hint: 'If stuck, review the "Theme and Message" nodes from Class 6 (c6_english_u1_003) and Class 7.',
                  misconception: 'Students often believe the theme is "Science is dangerous" or "Invisibility is a curse." They write answers like "Griffin suffered because.' }
          ],
            remediations: { 'the-theme-is-science-is': { steps: ['Have the student re-read the summary of Nodes 001–006 and highlight every verb that shows Griffin *choosing* an action.', 'Ask: "If Griffin had the same power but chose differently at *each* highlighted moment, what would change?" Write two.', 'Guide them to formulate the theme sentence: "When a scientific discovery is **misused** (choice), it leads.', 'Practice writing one PEEL paragraph using the fire incident: Point → Evidence (quote/action) → Explanation (why it\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_008', difficulty: 'standard',
          question: 'From \'English chapter c10_engl_cbse_14\': the skill or concept this node.',
          hint: 'If stuck on evidence selection, review c10_engl_cbse_14_002 (arson), 004 (store theft).',
          misconception: 'Students often write: "Griffin is a tragic hero because society rejected him." This is wrong because the text gives.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'From \'English chapter c10_engl_cbse_14\': the skill or concept this node teaches, applied',
                  options: ['From \'English chapter c10_engl_cbse_14\': the skill or concept this node teaches, applied', 'Griffin\'s discovery of invisibility is a fictional scientific process in', 'Griffin\'s act of setting fire to his landlord\'s house is a pivotal plot event in', 'This node covers the pivotal plot event in H.G'],
                  hint: 'If stuck on evidence selection, review c10_engl_cbse_14_002 (arson), 004 (store theft), 005.',
                  misconception: 'Students often write: "Griffin is a tragic hero because society rejected him." This is wrong because the text gives **zero evidence**.' }
          ],
            remediations: { 'students-often-write-griffin-is': { steps: ['If a student writes the "tragic hero" answer: (1) Ask them to find the *first* crime Griffin commits (arson) and the.', '(2) Have them list Griffin\'s *options* at that moment (pay rent, negotiate, leave peacefully).', '(3) Show the textual phrase "lawless person" used by the narrator (not by villagers).', '(4) Assign a 3-column table: Situation | Griffin\'s Choice | Legal Alternative — to visually prove agency.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
