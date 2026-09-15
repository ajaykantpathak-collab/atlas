import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch09_p1: SimDef = {
    id: 'v3_c10_engl_ch09_p1',
    title: 'The Proposal · Part 1/2',
    subtitle: 'Watch a marriage proposal get demolished by a land dispute',
    classLevel: 10, subject: 'engl', topic: 'The Proposal · Part 1/2',
    chapters: ['c10_engl_ch09'],
    nodeIds: ['c10_engl_cbse_09_001', 'c10_engl_cbse_09_002', 'c10_engl_cbse_09_003', 'c10_engl_cbse_09_004', 'c10_engl_cbse_09_005', 'c10_engl_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre critic reviewing a farce that refuses to be romantic', intro: 'A man in evening dress comes to propose. Before he can finish, he and the bride-to-be are shouting about a strip of land worth almost nothing.', goal: 'Identify the farce genre, analyse the Oxen Meadows argument, and correct the \'romantic comedy\' misreading.' },
    discovery: {
        question: 'Lomov visits his neighbour to propose marriage — and the play ends with the \'engaged\' couple screaming about whose dog is superior. What is Chekhov actually satirising?',
        options: ['People who prize winning arguments and property over the very marriage they\'re arranging', 'Romantic love — the play says all proposals end badly', 'Bad manners — the characters just needed etiquette lessons', 'Dogs — the real subject is which breed is best'],
        answer: 'People who prize winning arguments and property over the very marriage they\'re arranging',
        hook: 'The proposal is bait, not the point. Chekhov makes the meadows worthless and the evidence vague on purpose — so you watch pride detonate over absolutely nothing.',
    },
    teaching: [
        { title: 'The Proposal: A One-Act Comedy About a Marriage Proposal', text: 'The Proposal is a one-act farce (a type of comedy) by Anton Chekhov that satirizes the absurdity of human pride and pettiness through a marriage proposal that gets completely derailed by trivial.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_09_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Dissect the Oxen Meadows quarrel line by line: find every ownership claim, notice how worthless the prize is, and explain why the argument is funniest precisely because it\'s pointless.',
        labels: ['The Proposal: A One-Act', 'Lomov and Natalya', 'The Second Argument', 'Ivan Chubukov: The Father\'s', 'Theme: Absurdity of Social', 'Dramatic Irony: The Proposal'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_001', title: 'The Proposal: A One-Act Comedy About a Marriage Proposal',
          caseStudy: { intro: 'Imagine you go to propose to someone, but before you can even ask, you start arguing about whose family owns a piece of land — and then you argue about whose.',
            decisions: [{ prompt: 'What is the genre of The Proposal, and what is its defining characteristic as a one-act play?', options: [
                { text: 'The Proposal is a **one-act farce**', outcome: 'The Proposal is a **one-act farce** — a comedy characterized by exaggerated situations, physical.' },
                { text: 'romantic comedy', outcome: 'Not quite — Students often think **The Proposal is a romantic comedy where the proposal is the climax**.', reveals: 'the-proposal-is-a-romantic' },
                { text: '**The Proposal is a romantic comedy where the proposal is the climax**', outcome: 'Not quite — Students often think **The Proposal is a romantic comedy where the proposal is the climax**.', reveals: 'the-proposal-is-a-romantic' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_002', title: 'Lomov and Natalya: The Argument Over Oxen Meadows',
          caseStudy: { intro: 'Imagine you\'re at a family wedding and two relatives start shouting over whose great-grandfather planted a specific mango tree — the tree doesn\'t even fruit.',
            decisions: [{ prompt: 'What is the exact reason Lomov gives for believing Oxen Meadows belongs to him?', options: [
                { text: 'Lomov claims his aunt\'s grandmother gave the meadows to Natalya\'s father\'s grandfather', outcome: 'Lomov claims his aunt\'s grandmother gave the meadows to Natalya\'s father\'s grandfather for.' },
                { text: 'It was a gift', outcome: 'Not quite — Students believe the argument is *about* the meadows\' value (300 roubles) or legal truth.', reveals: 'the-argument-is-about-the' },
                { text: 'the argument is *about* the meadows\' value (300 roubles) or legal truth', outcome: 'Not quite — Students believe the argument is *about* the meadows\' value (300 roubles) or legal truth.', reveals: 'the-argument-is-about-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_003', title: 'The Second Argument: The Superiority of Dogs (Guess vs Squeezer)',
          caseStudy: { intro: 'Imagine you\'re watching two neighbours argue over whose phone has a better camera — they start with megapixels, end up insulting each other\'s grandparents, and.',
            decisions: [{ prompt: 'What specific detail triggers the second argument between Lomov and Natalya?', options: [
                { text: 'Lomov mentions that his dog Guess has gone lame, and Natalya contradicts him by claiming', outcome: 'Lomov mentions that his dog Guess has gone lame, and Natalya contradicts him by claiming Squeezer.' },
                { text: 'they argue over the meadows again', outcome: 'Not quite — Students treat the dog argument as a *repeat* of the meadow argument — "just another petty fight.".', reveals: 'students-treat-the-dog-argument' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_004', title: 'Ivan Chubukov: The Father\'s Role and His Reaction to the Proposal',
          caseStudy: { intro: 'Imagine you are at a family wedding where the uncle suddenly starts shouting about a boundary wall instead of blessing the couple.',
            decisions: [{ prompt: 'What is Chubukov\'s very first reaction when Lomov announces he has come to ask for Natalya\'s hand in marriage?', options: [
                { text: 'Chubukov is overjoyed, embraces and kisses Lomov, calls him "my angel" and "my treasure,"', outcome: 'Chubukov is overjoyed, embraces and kisses Lomov, calls him "my angel" and "my treasure," and says.' },
                { text: 'He is suspicious', outcome: 'Not quite — Students often treat Chubukov\'s mood swings as "inconsistent writing" or "bad temper" rather than.', reveals: 'students-often-treat-chubukov-s' },
                { text: 'He asks about Lomov\'s health', outcome: 'Not quite — Students often treat Chubukov\'s mood swings as "inconsistent writing" or "bad temper" rather than.', reveals: 'students-often-treat-chubukov-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_005', title: 'Theme: Absurdity of Social Status, Pride and Petty Disputes',
          caseStudy: { intro: 'Imagine you\'re at a family wedding where the bride\'s father and groom\'s uncle start shouting over whose ancestor planted a mango tree first — while the couple.',
            decisions: [{ prompt: 'Define the central theme of "absurdity of social status" in *The Proposal* in one sentence using the play\'s context.', options: [
                { text: 'The theme exposes how landowning characters like Lomov, Natalya, and Chubukov prioritize', outcome: 'The theme exposes how landowning characters like Lomov, Natalya, and Chubukov prioritize petty.' },
                { text: 'they fight a lot', outcome: 'Not quite — Students think the theme is "people fight over small things" and write generic answers about.', reveals: 'the-theme-is-people-fight' },
                { text: 'people fight over small things', outcome: 'Not quite — Students think the theme is "people fight over small things" and write generic answers about.', reveals: 'the-theme-is-people-fight' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_006', title: 'Dramatic Irony: The Proposal Lost in Endless Arguments',
          caseStudy: { intro: 'Imagine watching a movie where you know the main character is about to walk into a surprise party, but the character thinks they’re walking into an empty house.',
            decisions: [{ prompt: 'Define dramatic irony in your own words and give one example from *The Proposal*.', options: [
                { text: 'Dramatic irony is when the audience knows something the characters do not', outcome: 'Dramatic irony is when the audience knows something the characters do not.' },
                { text: 'It’s when something unexpected happens', outcome: 'Not quite — Students often equate dramatic irony with *any* unexpected twist (situational irony) or with.', reveals: 'students-often-equate-dramatic-irony' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school drama club rehearses \'The Proposal\'. The lead actors play it as a tender love scene — soft voices, shy glances — and the show falls flat. A junior watching rehearsal blurts out, \'Shouldn\'t they be yelling about meadows and dogs instead?\'',
            decisions: [{ prompt: 'What has the club misunderstood about the play?', options: [
                { text: 'They are playing a farce as a romance. The play\'s comedy lives in three proud, irritable neighbours who quarrel hysterically over land and dogs while the actual proposal keeps getting lost — the shouting, interruptions and absurd priorities ARE the scene, not an obstacle to it.', outcome: 'Recognising the genre fixes the performance: Chekhov wrote a pressure-cooker farce where trivial disputes drown the marriage question, which is why the junior\'s instinct was right.' },
                { text: 'The club is right — since Lomov and Natalya get engaged at the end, the play is a romance and should be played gently.', outcome: 'An engagement alone does not make a romance — here it is the punchline of a farce, squeezed in between shouting matches about Oxen Meadows and the dogs.', reveals: 'engagement-means-romance' },
                { text: 'The play is really a tragedy about property disputes, so the actors should perform it with heavy seriousness.', outcome: 'The disputes are deliberately trivial and exaggerated for laughter — playing them as tragedy would miss the farce just as much as playing them as romance.', reveals: 'farce-is-tragedy' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'A marriage proposal derailed by meadows and dogs isn\'t a rom-com — it\'s a farce holding up a mirror: watch what people fight for when nobody\'s watching their dignity.',
            decisions: [{ prompt: 'What comes next? The Proposal · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Proposal · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_001', difficulty: 'standard',
          question: 'The Proposal is a one-act farce (a type of comedy) by Anton Chekhov that.',
          hint: 'If stuck, review Class 9 "Shruti\'s Musical Journey" (c9_engl_ch6_4) for play format and.',
          misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.',
          parts: [
                { id: 'a', prompt: 'What is the genre of The Proposal, and what is its defining characteristic as a one-act play?', answer: 'The Proposal is a **one-act farce**',
                  options: ['The Proposal is a **one-act farce**', 'romantic comedy', '**The Proposal is a romantic comedy where the proposal is the climax**'],
                  hint: 'If stuck, review Class 9 "Shruti\'s Musical Journey" (c9_engl_ch6_4) for play format and Class 6.',
                  misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.' },
                { id: 'b', prompt: 'Why does Lomov visit Chubukov\'s house, and what prevents him from achieving his goal immediately?', answer: 'Lomov visits to propose to Natalya, but he cannot propose immediately',
                  options: ['Lomov visits to propose to Natalya, but he cannot propose immediately', 'he proposes right away', 'Chubukov refuses', '**The Proposal is a romantic comedy where the proposal is the climax**'],
                  hint: 'If stuck, review Class 9 "Shruti\'s Musical Journey" (c9_engl_ch6_4) for play format and Class 6.',
                  misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.' },
                { id: 'c', prompt: 'Identify the setting of the play and explain how the single setting contributes to the farcical effect.', answer: 'The entire play takes place in **Chubukov\'s drawing room**',
                  options: ['The entire play takes place in **Chubukov\'s drawing room**', 'multiple locations', 'outdoors', '**The Proposal is a romantic comedy where the proposal is the climax**'],
                  hint: 'If stuck, review Class 9 "Shruti\'s Musical Journey" (c9_engl_ch6_4) for play format and Class 6.',
                  misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.' },
                { id: 'd', prompt: 'Compare Lomov\'s physical condition (as described in stage directions and dialogue) with his behaviour. What comic contrast does this create?', answer: 'Lomov suffers from **palpitations, numbness, and "nerves"**',
                  options: ['Lomov suffers from **palpitations, numbness, and "nerves"**', 'he is healthy', 'he stays calm', '**The Proposal is a romantic comedy where the proposal is the climax**'],
                  hint: 'If stuck, review Class 9 "Shruti\'s Musical Journey" (c9_engl_ch6_4) for play format and Class 6.',
                  misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.' }
          ],
            remediations: { 'the-proposal-is-a-romantic': { steps: ['Re-read the play\'s opening: highlight every line where Lomov mentions his health or the land — notice ZERO romantic.', 'Watch a 5-minute staged clip (YouTube: "The Proposal Chekhov one act") — see the physical comedy: Lomov clutching his.', 'Complete this sentence: "The play is not about the proposal; it\'s about ________." (Answer: arguments/pride/pettiness).', 'Explain to a peer: "If this were a romance, Lomov would kneel.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.',
          parts: [
                { id: 'a', prompt: 'Write a 3-line stage direction for a modern Indian adaptation: set the scene in a drawing room where a prospective groom arrives to propose but gets distracted.', answer: '**Stage Direction:** *A modern urban drawing room',
                  options: ['**Stage Direction:** *A modern urban drawing room', '**The Proposal is a romantic comedy where the proposal is the climax**'],
                  hint: 'If stuck, review Class 9 "Shruti\'s Musical Journey" (c9_engl_ch6_4) for play format and Class 6.',
                  misconception: 'Students often think **The Proposal is a romantic comedy where the proposal is the climax**.' }
          ],
            remediations: { 'the-proposal-is-a-romantic': { steps: ['Re-read the play\'s opening: highlight every line where Lomov mentions his health or the land — notice ZERO romantic.', 'Watch a 5-minute staged clip (YouTube: "The Proposal Chekhov one act") — see the physical comedy: Lomov clutching his.', 'Complete this sentence: "The play is not about the proposal; it\'s about ________." (Answer: arguments/pride/pettiness).', 'Explain to a peer: "If this were a romance, Lomov would kneel.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_002', difficulty: 'standard',
          question: 'The Oxen Meadows argument is the first major comic conflict in Chekhov\'s *The.',
          hint: 'If stuck, re-read the Class 9 node c9_engl_ch6_4 on "Dialogue and Dramatic Tension" —.',
          misconception: 'Students believe the argument is *about* the meadows\' value (300 roubles) or legal truth.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Natalya reacts so fiercely when Lomov claims the meadows, even though she didn\'t know they were disputed before.', answer: 'Natalya\'s fury stems from wounded pride and a sense of injustice',
                  options: ['Natalya\'s fury stems from wounded pride and a sense of injustice', 'It\'s worth 300 roubles', 'the argument is *about* the meadows\' value (300 roubles) or legal truth'],
                  hint: 'If stuck, re-read the Class 9 node c9_engl_ch6_4 on "Dialogue and Dramatic Tension" — it teaches.',
                  misconception: 'Students believe the argument is *about* the meadows\' value (300 roubles) or legal truth.' },
                { id: 'b', prompt: 'Apply the PEEL structure to answer: "How does Chekhov use the Oxen Meadows argument to reveal Lomov\'s hypochondria?" Write a 4-sentence response.', answer: '**Point:** Lomov\'s hypochondria surfaces physically as the argument intensifies',
                  options: ['**Point:** Lomov\'s hypochondria surfaces physically as the argument intensifies', 'the argument is *about* the meadows\' value (300 roubles) or legal truth'],
                  hint: 'If stuck, re-read the Class 9 node c9_engl_ch6_4 on "Dialogue and Dramatic Tension" — it teaches.',
                  misconception: 'Students believe the argument is *about* the meadows\' value (300 roubles) or legal truth.' }
          ],
            remediations: { 'the-argument-is-about-the': { steps: ['Ask the student: "If the meadows are worth so little, why do they scream for 10 minutes?" 2.', 'Have them highlight every insult in the text (grabber, intriguer, malicious, pettifogger).', 'Guide them to write: "The meadows are a *trigger*, not a *cause*." 4.', 'Assign a 3-sentence PEEL paragraph: "Chekhov uses a trivial land dispute to expose how ego overrides reason." This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_003', difficulty: 'standard',
          question: 'The second argument in *The Proposal* is a comic quarrel between Lomov and.',
          hint: 'Review the meadow argument (c10_engl_cbse_09_002) and the dramatic irony node.',
          misconception: 'Students treat the dog argument as a *repeat* of the meadow argument — "just another petty fight." They miss that the.',
          parts: [
                { id: 'a', prompt: 'Lomov claims Guess is "a first-rate dog" because he "went for 125 roubles" and "is a thoroughbred." Natalya counters that Squeezer cost 85 roubles but is "a.', answer: 'Price ≠ quality (Guess cost more but is lame',
                  options: ['Price ≠ quality (Guess cost more but is lame', 'Lomov is right because he paid more', 'says "Lomov is right'],
                  hint: 'Review the meadow argument (c10_engl_cbse_09_002) and the dramatic irony node.',
                  misconception: 'Students treat the dog argument as a *repeat* of the meadow argument — "just another petty fight." They miss that the meadow dispute was.' }
          ],
            remediations: { 'students-treat-the-dog-argument': { steps: ['Have the student create a two-column table: "Meadow Argument" vs "Dog Argument" with rows for *Trigger, Evidence Type.', 'Ask them to highlight every adjective Lomov uses for Guess vs Natalya for Squeezer — then categorize.', 'Role-play the argument with a partner, switching roles mid-way to feel the shift from "my dog is better" to "you are.', 'Finally, write one paragraph answering: "Why does Chekhov make the second argument about dogs, not land?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_004', difficulty: 'standard',
          question: 'Ivan Chubukov is a wealthy landowner and father of Natalya in Anton Chekhov\'s.',
          hint: 'If stuck, review c10_engl_cbse_09_001 (play summary) and c10_engl_cbse_09_008 (comedy.',
          misconception: 'Students often treat Chubukov\'s mood swings as "inconsistent writing" or "bad temper" rather than *deliberate satirical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ivan Chubukov is a wealthy landowner and father of Natalya in Anton Chekhov\'s one-act',
                  options: ['Ivan Chubukov is a wealthy landowner and father of Natalya in Anton Chekhov\'s one-act', 'The Proposal is a one-act farce (a type of comedy) by Anton Chekhov that satirizes the', 'The Oxen Meadows argument is the first major comic conflict in Chekhov\'s *The Proposal*', 'The second argument in *The Proposal* is a comic quarrel between Lomov and Natalya over'],
                  hint: 'If stuck, review c10_engl_cbse_09_001 (play summary) and c10_engl_cbse_09_008 (comedy genre.',
                  misconception: 'Students often treat Chubukov\'s mood swings as "inconsistent writing" or "bad temper" rather than *deliberate satirical characterisation*.' }
          ],
            remediations: { 'students-often-treat-chubukov-s': { steps: ['Re-read the three key scenes (welcome, Oxen Meadows fight, dog fight) and highlight every stage direction for Chubukov.', 'Create a two-column table: "What Chubukov SAYS" vs "What Chubukov WANTS (land/money)."', 'Watch a 5-minute stage performance clip (YouTube: "The Proposal Chekhov Chubukov") to see the physical comedy — the.', 'Rewrite one Board-style answer: "How does Chekhov use Chubukov to satirise the institution of marriage?" using the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_005', difficulty: 'standard',
          question: 'The theme of "Absurdity of Social Status, Pride and Petty Disputes" in *The.',
          hint: 'Review node 002 (Oxen Meadows argument) and node 004 (Chubukov\'s reactions) — these.',
          misconception: 'Students think the theme is "people fight over small things" and write generic answers about "unnecessary arguments.".',
          parts: [
                { id: 'a', prompt: 'Apply the theme to the second argument about dogs (Guess vs. Squeezer).', answer: 'Step 1: Locate the dog argument (after the proposal is supposedly settled)',
                  options: ['Step 1: Locate the dog argument (after the proposal is supposedly settled)', 'Guess is better', 'people fight over small things', 'unnecessary arguments'],
                  hint: 'Review node 002 (Oxen Meadows argument) and node 004 (Chubukov\'s reactions) — these contain the.',
                  misconception: 'Students think the theme is "people fight over small things" and write generic answers about "unnecessary arguments." The board exam.' }
          ],
            remediations: { 'the-theme-is-people-fight': { steps: ['Re-read the Oxen Meadows argument (node 002) and highlight every reference to "grandfather," "peasants," "deeds,".', 'Ask: "If the meadows are worth 300 roubles, why does Lomov say \'I\'ll go to court!\'?"', 'Connect to node 004 — Chubukov\'s "I\'ll not give my daughter..." uses marriage as a *status transaction*.', 'Write one paragraph using the template: "Chekhov uses [specific dispute] to show [specific status anxiety] through.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_09_006', difficulty: 'standard',
          question: 'Dramatic irony occurs when the audience knows crucial information that the.',
          hint: 'If stuck, review the play summary (node c10_engl_cbse_09_001) and the argument breakdowns.',
          misconception: 'Students often equate dramatic irony with *any* unexpected twist (situational irony) or with sarcasm (verbal irony).',
          parts: [
                { id: 'a', prompt: 'Define dramatic irony in your own words and give one example from *The Proposal*.', answer: 'Dramatic irony is when the audience knows something the characters do not',
                  options: ['Dramatic irony is when the audience knows something the characters do not', 'It’s when something unexpected happens'],
                  hint: 'If stuck, review the play summary (node c10_engl_cbse_09_001) and the argument breakdowns (nodes.',
                  misconception: 'Students often equate dramatic irony with *any* unexpected twist (situational irony) or with sarcasm (verbal irony).' },
                { id: 'b', prompt: 'Compare the dramatic irony in the Oxen Meadows argument and the dog argument. Which one more sharply highlights the theme of absurdity? Justify.', answer: 'The Oxen Meadows argument is the first diversion',
                  options: ['The Oxen Meadows argument is the first diversion', 'treats both arguments as identical fails to analyze the escalation of absurdity'],
                  hint: 'If stuck, review the play summary (node c10_engl_cbse_09_001) and the argument breakdowns (nodes.',
                  misconception: 'Students often equate dramatic irony with *any* unexpected twist (situational irony) or with sarcasm (verbal irony).' }
          ],
            remediations: { 'students-often-equate-dramatic-irony': { steps: ['Re‑teach the three ironies using a simple table: Verbal (saying opposite), Situational (outcome opposite), Dramatic.', 'Have the student highlight every line in the play where the proposal is mentioned.', 'Ask: “At this moment, does the character remember the proposal?', 'Practice writing one PEEL paragraph on the Oxen Meadows irony using the template: Point → Quote → Explanation → Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
