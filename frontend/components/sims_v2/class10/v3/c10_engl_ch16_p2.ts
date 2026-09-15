import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch16_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch16_p2: SimDef = {
    id: 'v3_c10_engl_ch16_p2',
    title: 'The Necklace · Part 2/2',
    subtitle: 'Pay for one night of glamour with ten years of poverty',
    classLevel: 10, subject: 'engl', topic: 'The Necklace · Part 2/2',
    chapters: ['c10_engl_ch16'],
    nodeIds: ['c10_engl_cbse_16_007', 'c10_engl_cbse_16_008', 'c10_engl_cbse_16_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a clerk\'s wife who longs for the rich life', intro: 'You are Matilda: pretty, born for luxury, married to a clerk. An invitation to the Minister\'s ball should be a dream — except you have nothing to wear. Your friend lends you diamonds. Then, somewhere in the night, they vanish.', goal: 'Examine how pride and the fear of shame turn a small accident into a life\'s catastrophe.' },
    discovery: {
        question: 'Matilda Loisel borrows a dazzling diamond necklace for one grand ball, loses it, and spends ten brutal years in poverty paying off the replacement — only to learn the original was fake, worth almost nothing. What is the cruellest irony here?',
        options: ['She destroyed her real life to pay for an imitation of the life she dreamed about', 'Her friend secretly knew it was fake all along', 'The replacement necklace was also fake, so she was cheated twice', 'The ball ticket itself was counterfeit'],
        answer: 'She destroyed her real life to pay for an imitation of the life she dreamed about',
        hook: 'Matilda\'s tragedy wasn\'t losing a necklace — it was that shame stopped her from simply confessing. One honest sentence at the ball would have saved ten years.',
    },
    teaching: [
        { title: 'The Shocking Revelation: The Necklace Was a Fake (Paste)', text: 'The "Shocking Revelation" refers to the climactic scene in Guy de Maupassant\'s "The Necklace" where Matilda Loisel, after ten years of crushing poverty to repay the debt for a replacement necklace.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Live one glittering evening on borrowed jewellery, then navigate the decade of debt that follows — and find the exact moment where honesty would have changed everything.',
        labels: ['The Shocking Revelation', 'Theme: Vanity, Materialism', 'Character Analysis: Matilda\'s Transformation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_007', title: 'The Shocking Revelation: The Necklace Was a Fake (Paste)',
          caseStudy: { intro: 'Imagine you\'ve spent ten years working double shifts, giving up every comfort, aging prematurely — all to repay a debt for something you lost.',
            decisions: [{ prompt: 'What was the actual monetary value of the necklace Matilda borrowed from Mme Forestier, as revealed in the final scene?', options: [
                { text: 'The necklace was worth 500 francs (paste/costume jewelry)', outcome: 'The necklace was worth 500 francs (paste/costume jewelry). A wrong answer (e.g., "36,000 francs".' },
                { text: '36,000 francs', outcome: 'Not quite — Students consistently confuse the *replacement necklace\'s cost* (36,000 francs) with the *original.', reveals: 'students-consistently-confuse-the-replacement' },
                { text: '40,000 francs', outcome: 'Not quite — Students consistently confuse the *replacement necklace\'s cost* (36,000 francs) with the *original.', reveals: 'students-consistently-confuse-the-replacement' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_008', title: 'Theme: Vanity, Materialism and the Tragic Irony of Appearances',
          caseStudy: { intro: 'Imagine you save for months to buy an expensive smartphone to impress friends, only to drop and shatter it the next day — and then discover the model was.',
            decisions: [{ prompt: 'What is the difference between a theme and a plot summary in a story like "The Necklace"?', options: [
                { text: 'A plot summary recounts *what happens* (Matilda borrows a necklace, loses it, works ten', outcome: 'A plot summary recounts *what happens* (Matilda borrows a necklace, loses it, works ten years.' },
                { text: 'questions require analytical commentary, not narration', outcome: 'Not quite — Students often think "theme = moral lesson" and write "The theme is *don\'t be greedy* or *be.', reveals: 'theme-moral-lesson-and-write' },
                { text: 'and write', outcome: 'Not quite — Students often think "theme = moral lesson" and write "The theme is *don\'t be greedy* or *be.', reveals: 'theme-moral-lesson-and-write' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_009', title: 'Character Analysis: Matilda\'s Transformation from Vanity to Suffering',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and see someone posting a perfect life — then you discover they\'re drowning in debt to maintain that image.',
            decisions: [{ prompt: 'What are the three distinct phases of Matilda Loisel\'s character transformation in "The Necklace"?', options: [
                { text: 'The three phases are: (1) The vain, discontented young wife who dreams of luxury and', outcome: 'The three phases are: (1) The vain, discontented young wife who dreams of luxury and feels entitled.' },
                { text: 'before and after', outcome: 'Not quite — Students often treat Matilda\'s transformation as a simple "riches to rags" plot summary, listing.', reveals: 'students-often-treat-matilda-s' },
                { text: 'confuse physical change with moral growth', outcome: 'Not quite — Students often treat Matilda\'s transformation as a simple "riches to rags" plot summary, listing.', reveals: 'students-often-treat-matilda-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is invited to a rich friend\'s birthday party and is miserable — not because she lacks a dress, but because hers isn\'t expensive-looking enough. She pressures her parents to borrow jewellery she cannot afford to replace.',
            decisions: [{ prompt: 'What warning does \'The Necklace\' give about this frame of mind?', options: [
                { text: 'Matilda suffered the same ache — \'born for all the delicacies and all the luxuries,\' she felt humiliated by an ordinary but adequate life, and one evening of borrowed splendour cost her ten years of real poverty. The story shows the sickness was the craving to appear rich, not the actual want — and borrowing to sustain appearances is exactly how her trap shut.', outcome: 'Her unhappiness was psychological before it was economic — envy of a life she imagined made the decent one she had feel like suffering, and the necklace\'s fake glitter made the irony complete.' },
                { text: 'She is right to want more — Matilda\'s story shows ambition is healthy and she deserved the better life she dreamed of.', outcome: 'Matilda\'s longing was not ambition to become something but envy to appear something — and it is that hunger for appearances, not aspiration, that the story punishes.', reveals: 'envy-is-ambition' },
                { text: 'The real moral is to simply never borrow anything, since objects themselves are dangerous.', outcome: 'The necklace was not cursed — the danger was Matilda\'s deception about losing it and her need to pose as wealthy; borrowing was just where the pretence became payable.', reveals: 'borrowing-is-the-sin' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_009', title: 'You made it',
          caseStudy: { intro: 'Ten years of scrubbing floors bought a necklace nobody needed, replacing one that was glass. Vanity wrote the bill; honesty could have torn it up.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_007', difficulty: 'standard',
          question: 'The "Shocking Revelation" refers to the climactic scene in Guy de Maupassant\'s.',
          hint: 'If stuck, review c10_engl_cbse_16_006 (the ten years of debt) to re-establish the.',
          misconception: 'Students consistently confuse the *replacement necklace\'s cost* (36,000 francs) with the *original necklace\'s value*.',
          parts: [
                { id: 'a', prompt: 'What was the actual monetary value of the necklace Matilda borrowed from Mme Forestier, as revealed in the final scene?', answer: 'The necklace was worth 500 francs (paste/costume jewelry)',
                  options: ['The necklace was worth 500 francs (paste/costume jewelry)', '36,000 francs', '40,000 francs', 'The necklace was worth 36,000 francs but they found out it was fake'],
                  hint: 'If stuck, review c10_engl_cbse_16_006 (the ten years of debt) to re-establish the *magnitude*.',
                  misconception: 'Students consistently confuse the *replacement necklace\'s cost* (36,000 francs) with the *original necklace\'s value* (500 francs), writing.' },
                { id: 'b', prompt: 'Explain in your own words why the revelation that the necklace was fake creates *dramatic irony* rather than just a surprise ending.', answer: 'Dramatic irony occurs when the audience knows something a character does not',
                  options: ['Dramatic irony occurs when the audience knows something a character does not', 'surprise', 'The necklace was worth 36,000 francs but they found out it was fake'],
                  hint: 'If stuck, review c10_engl_cbse_16_006 (the ten years of debt) to re-establish the *magnitude*.',
                  misconception: 'Students consistently confuse the *replacement necklace\'s cost* (36,000 francs) with the *original necklace\'s value* (500 francs), writing.' },
                { id: 'c', prompt: 'Analyze the contrast between Mme Forestier\'s tone ("My poor Matilda!") and Matilda\'s internal state in the final paragraph.', answer: 'Mme Forestier\'s tone is light, pitying, almost casual',
                  options: ['Mme Forestier\'s tone is light, pitying, almost casual', 'The necklace was worth 36,000 francs but they found out it was fake'],
                  hint: 'If stuck, review c10_engl_cbse_16_006 (the ten years of debt) to re-establish the *magnitude*.',
                  misconception: 'Students consistently confuse the *replacement necklace\'s cost* (36,000 francs) with the *original necklace\'s value* (500 francs), writing.' }
          ],
            remediations: { 'students-consistently-confuse-the-replacement': { steps: ['**Re-read the final 3 paragraphs aloud** — hear the tonal clash between Mme Forestier\'s lightness and Matilda\'s silence.', '**Make a two-column table**: "What Matilda believed" vs.', '"What was true" — fill in: necklace value, years lost, cause of poverty.', '**Write one sentence** using this frame: "The irony is that Matilda sacrificed ___ for a necklace that was actually.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_008', difficulty: 'standard',
          question: 'Theme is the central idea or underlying message that a literary work explores.',
          hint: 'If stuck, review the concept of *situational irony* from Class 9 (e.g., in "The Lost.',
          misconception: 'Students often think "theme = moral lesson" and write "The theme is *don\'t be greedy* or *be honest*." This is wrong.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the "tragic irony of appearances" operates in the story. Why is it *tragic* and not just surprising?', answer: 'The irony is tragic',
                  options: ['The irony is tragic', 'shocking twist', 'tragic', 'theme = moral lesson'],
                  hint: 'If stuck, review the concept of *situational irony* from Class 9 (e.g., in "The Lost Child".',
                  misconception: 'Students often think "theme = moral lesson" and write "The theme is *don\'t be greedy* or *be honest*." This is wrong because: (1) Themes.' }
          ],
            remediations: { 'theme-moral-lesson-and-write': { steps: ['**Re-read the revelation scene (node 007)** and annotate: *What does the fake necklace symbolise?* (Answer: The.', '**Create a three-column table:** Column 1 = Event, Column 2 = Shows Vanity/Materialism, Column 3 = Shows Ironic Gap.', '**Practice PEEL aloud:** "The theme of materialism is shown when...', '**Compare with a fable** (e.g., "The Fox and the Grapes") to distinguish *moral* (explicit lesson) from *theme*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "theme = moral lesson" and write "The theme is *don\'t be greedy* or *be honest*." This is wrong.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "The story\'s real theme is honesty — if Matilda had confessed immediately, she would have avoided ruin." Is this a valid thematic.', answer: 'No, this is a *moralistic* reading, not a thematic one',
                  options: ['No, this is a *moralistic* reading, not a thematic one', 'moral of the story', '(analytical skill)', 'and write'],
                  hint: 'If stuck, review the concept of *situational irony* from Class 9 (e.g., in "The Lost Child".',
                  misconception: 'Students often think "theme = moral lesson" and write "The theme is *don\'t be greedy* or *be honest*." This is wrong because: (1) Themes.' }
          ],
            remediations: { 'theme-moral-lesson-and-write': { steps: ['**Re-read the revelation scene (node 007)** and annotate: *What does the fake necklace symbolise?* (Answer: The.', '**Create a three-column table:** Column 1 = Event, Column 2 = Shows Vanity/Materialism, Column 3 = Shows Ironic Gap.', '**Practice PEEL aloud:** "The theme of materialism is shown when...', '**Compare with a fable** (e.g., "The Fox and the Grapes") to distinguish *moral* (explicit lesson) from *theme*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_009', difficulty: 'standard',
          question: 'Character transformation analysis examines how a protagonist\'s personality.',
          hint: 'Review the sequence of events in nodes 001-007, focusing on Matilda\'s choices at each.',
          misconception: 'Students often treat Matilda\'s transformation as a simple "riches to rags" plot summary, listing events without.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Matilda\'s vanity in Phase 1 directly leads to her suffering in Phase 2. Use the concept of "causal chain" in your answer.', answer: 'Matilda\'s vanity makes her borrow the necklace to appear wealthy at the ball',
                  options: ['Matilda\'s vanity makes her borrow the necklace to appear wealthy at the ball', 'bad luck', 'the lost necklace', 'confuse physical change with moral growth'],
                  hint: 'Review the sequence of events in nodes 001-007, focusing on Matilda\'s choices at each turning point.',
                  misconception: 'Students often treat Matilda\'s transformation as a simple "riches to rags" plot summary, listing events without analyzing *why* she.' },
                { id: 'b', prompt: 'Given this excerpt from the story: "She danced madly, ecstatically, drunk with pleasure...', answer: 'This excerpt belongs to Phase 1 (the ball night)',
                  options: ['This excerpt belongs to Phase 1 (the ball night)', 'joy continues', 'she becomes grateful', 'confuse physical change with moral growth'],
                  hint: 'Review the sequence of events in nodes 001-007, focusing on Matilda\'s choices at each turning point.',
                  misconception: 'Students often treat Matilda\'s transformation as a simple "riches to rags" plot summary, listing events without analyzing *why* she.' }
          ],
            remediations: { 'students-often-treat-matilda-s': { steps: ['If a student writes a plot summary instead of character analysis: (1) Ask them to highlight every sentence in their.', '(2) Give them the PEEL template: Point (trait), Evidence (quote/incident), Explanation (how evidence shows trait), Link.', '(3) Have them re-write one paragraph for Phase 1 using PEEL, then Phase 2, then Phase 3.', '(4) Finally, ask: "Which trait in Phase 1 *directly causes* the suffering in Phase 2?" — force the causal arrow.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
