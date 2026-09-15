import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch01_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch01_p2: SimDef = {
    id: 'v3_c10_engl_ch01_p2',
    title: 'A Letter to God · Part 2/2',
    subtitle: 'Read a letter to God and the irony of the humans who answered it',
    classLevel: 10, subject: 'engl', topic: 'A Letter to God · Part 2/2',
    chapters: ['c10_engl_ch01'],
    nodeIds: ['c10_engl_cbse_01_007', 'c10_engl_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a literary detective decoding what a farmer\'s letter really means', intro: 'A farmer loses everything to one hour of hail, and his solution is a stamp, a pen and an address no post office can deliver.', goal: 'Analyse Lencho\'s faith as literal and transactional, and support every claim with textual evidence.' },
    discovery: {
        question: 'Lencho\'s crops are destroyed, so he writes a letter addressed simply \'To God\' demanding 100 pesos. When the post office staff collect 70 and send it, he\'s angry — not grateful. What does his anger reveal?',
        options: ['His faith was so literal he believed God sent the full amount — and the post office \'stole\' the rest', 'He\'s ungrateful — 70 pesos should have been enough', 'He realised too late that writing to God was foolish', 'He was angry the letter took so long to deliver'],
        answer: 'His faith was so literal he believed God sent the full amount — and the post office \'stole\' the rest',
        hook: 'Lencho isn\'t a fool — he\'s a man with no bank, no insurance, no helpline. When no human institution will help, absolute faith in God is the only plan left.',
    },
    teaching: [
        { title: 'Irony in \'A Letter to God\': The Twist of Lencho\'s Second Letter', text: 'Irony in \'A Letter to God\' refers to the contrast between what Lencho expects and what actually happens, particularly in his second letter where he accuses the post office employees of stealing the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reread the hailstorm scene and hunt the imagery — \'frozen pearls,\' a field \'white as if covered with salt\' — then build a PEEL answer on what Lencho\'s faith really is.',
        labels: ['Irony in \'A Letter', 'Character Analysis: The Postmaster'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_007', title: 'Irony in \'A Letter to God\': The Twist of Lencho\'s Second Letter',
          caseStudy: { intro: 'Imagine you help a friend anonymously, but later they complain that "someone" stole part of your gift — not knowing you were the giver.',
            decisions: [{ prompt: 'What is the main irony in Lencho\'s second letter to God?', options: [
                { text: 'The main irony is that Lencho accuses the post office employees of stealing the missing', outcome: 'The main irony is that Lencho accuses the post office employees of stealing the missing 30 pesos.' },
                { text: 'The irony is that God didn\'t send the money', outcome: 'Not quite — Students often think irony simply means "something funny or unexpected." In board exams, they.', reveals: 'irony-simply-means-something-funny' },
                { text: 'something funny or unexpected', outcome: 'Not quite — Students often think irony simply means "something funny or unexpected." In board exams, they.', reveals: 'irony-simply-means-something-funny' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_008', title: 'Character Analysis: The Postmaster as a Symbol of Kindness',
          caseStudy: { intro: 'Imagine you receive a letter addressed to "God" from a desperate farmer who lost everything. What would you do?',
            decisions: [{ prompt: 'What is the postmaster\'s immediate reaction when he first reads Lencho\'s letter to God?', options: [
                { text: 'The postmaster initially laughs at the letter\'s address, but quickly becomes serious and', outcome: 'The postmaster initially laughs at the letter\'s address, but quickly becomes serious and moved.' },
                { text: 'He gets angry', outcome: 'Not quite — Students often think the postmaster\'s kindness is merely "doing a good deed" or "being a nice.', reveals: 'the-postmaster-s-kindness-is' },
                { text: 'doing a good deed', outcome: 'Not quite — Students often think the postmaster\'s kindness is merely "doing a good deed" or "being a nice.', reveals: 'the-postmaster-s-kindness-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After reading \'A Letter to God\', a classmate laughs at Lencho: \'What an idiot — he wrote a letter to God, then got angry at the very people who helped him.\' The class is asked to defend or challenge that verdict.',
            decisions: [{ prompt: 'What is the fairest reading of Lencho\'s behaviour?', options: [
                { text: 'His faith was real and, in his position, almost rational — a hailstorm had destroyed his crop and a poor farmer had no other appeal left. But the same certainty became rigidity: so sure God had sent exactly one hundred pesos, he could only read the shortfall as theft by the post office staff who had actually collected the money for him.', outcome: 'This reads both sides of Lencho — faith as the strength that made him act, and as the flaw that made him misjudge the humans who quietly helped him.' },
                { text: 'The classmate is right — writing to God was simply irrational, and no sensible person would do it.', outcome: 'Within Lencho\'s world — an isolated farmer whose whole year\'s food was destroyed — appealing to God was the only channel he had; the letter is desperation expressed through faith, not stupidity.', reveals: 'faith-is-irrational' },
                { text: 'Lencho\'s faith actually failed him, because God never delivered the full hundred pesos he asked for.', outcome: 'The story never shows the request failing — the money arrived through human hands; the failure was Lencho\'s inability to see goodness coming through people rather than directly from heaven.', reveals: 'faith-means-full-payment' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_008', title: 'You made it',
          caseStudy: { intro: 'The story\'s deepest irony: the people who answered his letter proved his faith in God — while he accused them of robbing him. Faith and irony share one envelope.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_007', difficulty: 'standard',
          question: 'Irony in \'A Letter to God\' refers to the contrast between what Lencho expects.',
          hint: 'If stuck, review c10_engl_cbse_01_003 (first letter), c10_engl_cbse_01_004 (postmaster\'s.',
          misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that.',
          parts: [
                { id: 'a', prompt: 'Explain why Lencho\'s second letter creates *dramatic irony* for the reader.', answer: 'Dramatic irony occurs',
                  options: ['Dramatic irony occurs', 'It\'s dramatic irony', 'something funny or unexpected', 'The irony is that Lencho got only 70 pesos instead of 100'],
                  hint: 'If stuck, review c10_engl_cbse_01_003 (first letter), c10_engl_cbse_01_004 (postmaster\'s.',
                  misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that Lencho got only 70.' },
                { id: 'b', prompt: 'Apply the concept of situational irony to the outcome of Lencho\'s first letter. What did Lencho expect, and what actually happened?', answer: 'Step 1: Lencho expected God to send him 100 pesos directly (by miracle)',
                  options: ['Step 1: Lencho expected God to send him 100 pesos directly (by miracle)', 'Lencho got less money', 'something funny or unexpected', 'The irony is that Lencho got only 70 pesos instead of 100'],
                  hint: 'If stuck, review c10_engl_cbse_01_003 (first letter), c10_engl_cbse_01_004 (postmaster\'s.',
                  misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that Lencho got only 70.' },
                { id: 'c', prompt: 'Analyze how the irony in the second letter changes the reader\'s view of the postmaster\'s character.', answer: 'The irony transforms the postmaster from a mere helper into a tragic figure of',
                  options: ['The irony transforms the postmaster from a mere helper into a tragic figure of', 'The postmaster feels bad', 'something funny or unexpected', 'The irony is that Lencho got only 70 pesos instead of 100'],
                  hint: 'If stuck, review c10_engl_cbse_01_003 (first letter), c10_engl_cbse_01_004 (postmaster\'s.',
                  misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that Lencho got only 70.' }
          ],
            remediations: { 'irony-simply-means-something-funny': { steps: ['If a student gives the "unexpected amount" answer, do NOT say "review irony definition." Instead: 1) Ask: "Who actually.', '2) Ask: "Who does Lencho blame in the second letter?" (Same people).', '3) Say: "The irony is the *match* between the givers and the blamed.', 'Write one sentence using this pattern: \'Lencho calls ___ crooks, but they are actually ___.\' " 4) Have them rewrite.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the irony in Lencho\'s second letter strengthens or weakens the story\'s message about faith. Justify your view.', answer: 'The irony *strengthens* the message by showing faith\'s complexity',
                  options: ['The irony *strengthens* the message by showing faith\'s complexity', 'It weakens faith', 'something funny or unexpected', 'The irony is that Lencho got only 70 pesos instead of 100'],
                  hint: 'If stuck, review c10_engl_cbse_01_003 (first letter), c10_engl_cbse_01_004 (postmaster\'s.',
                  misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that Lencho got only 70.' },
                { id: 'b', prompt: 'Create a 3-sentence alternate ending for the story where the irony is resolved (Lencho learns the truth). How does this change the theme?', answer: 'Example: "The postmaster hands Lencho the list of donors',
                  options: ['Example: "The postmaster hands Lencho the list of donors', 'something funny or unexpected', 'The irony is that Lencho got only 70 pesos instead of 100', 'irony simply means "something funny or unexpected'],
                  hint: 'If stuck, review c10_engl_cbse_01_003 (first letter), c10_engl_cbse_01_004 (postmaster\'s.',
                  misconception: 'Students often think irony simply means "something funny or unexpected." In board exams, they write: "The irony is that Lencho got only 70.' }
          ],
            remediations: { 'irony-simply-means-something-funny': { steps: ['If a student gives the "unexpected amount" answer, do NOT say "review irony definition." Instead: 1) Ask: "Who actually.', '2) Ask: "Who does Lencho blame in the second letter?" (Same people).', '3) Say: "The irony is the *match* between the givers and the blamed.', 'Write one sentence using this pattern: \'Lencho calls ___ crooks, but they are actually ___.\' " 4) Have them rewrite.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_008', difficulty: 'standard',
          question: 'Character analysis of the postmaster in "A Letter to God" involves examining.',
          hint: 'Review the PEEL/TEE structure from c9_engl_ch1_2 (Krishtakka analysis) and practice with.',
          misconception: 'Students often think the postmaster\'s kindness is merely "doing a good deed" or "being a nice boss." They miss that.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the postmaster decides to collect money and send it to Lencho.', answer: 'The postmaster wants to preserve Lencho\'s faith in God',
                  options: ['The postmaster wants to preserve Lencho\'s faith in God', 'He does it because it\'s his job', 'doing a good deed', 'being a nice boss'],
                  hint: 'Review the PEEL/TEE structure from c9_engl_ch1_2 (Krishtakka analysis) and practice with a minor.',
                  misconception: 'Students often think the postmaster\'s kindness is merely "doing a good deed" or "being a nice boss." They miss that he *becomes* the.' },
                { id: 'b', prompt: 'The postmaster contributes part of his own salary and asks his employees and friends to donate.', answer: 'Evidence: "He put the letter in the mailbox',
                  options: ['Evidence: "He put the letter in the mailbox', 'doing a good deed', 'being a nice boss', 'the postmaster\'s kindness is merely "doing a good deed" or "being a nice boss'],
                  hint: 'Review the PEEL/TEE structure from c9_engl_ch1_2 (Krishtakka analysis) and practice with a minor.',
                  misconception: 'Students often think the postmaster\'s kindness is merely "doing a good deed" or "being a nice boss." They miss that he *becomes* the.' },
                { id: 'c', prompt: 'Compare the postmaster\'s kindness with Lencho\'s faith. How are they different forms of belief?', answer: 'Lencho\'s faith is vertical (directed at God, absolute, unquestioning)',
                  options: ['Lencho\'s faith is vertical (directed at God, absolute, unquestioning)', 'Both believe in God', 'doing a good deed', 'being a nice boss'],
                  hint: 'Review the PEEL/TEE structure from c9_engl_ch1_2 (Krishtakka analysis) and practice with a minor.',
                  misconception: 'Students often think the postmaster\'s kindness is merely "doing a good deed" or "being a nice boss." They miss that he *becomes* the.' }
          ],
            remediations: { 'the-postmaster-s-kindness-is': { steps: ['Re-read the scene where the postmaster reads the letter aloud to his staff — note his tone shift.', 'Highlight every verb describing his actions: "laughed," "became serious," "tapped," "asked," "contributed," "signed." 3.', 'For each verb, write the trait it reveals (e.g., "tapped" → thoughtful).', 'Finally, answer: "Which trait makes him a *symbol*?" — the answer is the *combination* of empathy + initiative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
