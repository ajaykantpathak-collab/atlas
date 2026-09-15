import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch16_p1: SimDef = {
    id: 'v3_c10_engl_ch16_p1',
    title: 'The Necklace · Part 1/2',
    subtitle: 'Pay for one night of glamour with ten years of poverty',
    classLevel: 10, subject: 'engl', topic: 'The Necklace · Part 1/2',
    chapters: ['c10_engl_ch16'],
    nodeIds: ['c10_engl_cbse_16_001', 'c10_engl_cbse_16_002', 'c10_engl_cbse_16_003', 'c10_engl_cbse_16_004', 'c10_engl_cbse_16_005', 'c10_engl_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a clerk\'s wife who longs for the rich life', intro: 'You are Matilda: pretty, born for luxury, married to a clerk. An invitation to the Minister\'s ball should be a dream — except you have nothing to wear. Your friend lends you diamonds. Then, somewhere in the night, they vanish.', goal: 'Examine how pride and the fear of shame turn a small accident into a life\'s catastrophe.' },
    discovery: {
        question: 'Matilda Loisel borrows a dazzling diamond necklace for one grand ball, loses it, and spends ten brutal years in poverty paying off the replacement — only to learn the original was fake, worth almost nothing. What is the cruellest irony here?',
        options: ['She destroyed her real life to pay for an imitation of the life she dreamed about', 'Her friend secretly knew it was fake all along', 'The replacement necklace was also fake, so she was cheated twice', 'The ball ticket itself was counterfeit'],
        answer: 'She destroyed her real life to pay for an imitation of the life she dreamed about',
        hook: 'Matilda\'s tragedy wasn\'t losing a necklace — it was that shame stopped her from simply confessing. One honest sentence at the ball would have saved ten years.',
    },
    teaching: [
        { title: 'Matilda Loisel: A Woman Dissatisfied with Her Modest Life', text: 'Character analysis of Matilda Loisel focuses on her persistent dissatisfaction with her modest middle-class life, her yearning for luxury and social status, and how these traits drive the narrative\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Live one glittering evening on borrowed jewellery, then navigate the decade of debt that follows — and find the exact moment where honesty would have changed everything.',
        labels: ['Matilda Loisel: A Woman', 'The Invitation to', 'Borrowing the Necklace from', 'The Ball: Matilda\'s Night', 'The Loss of', 'Ten Years of Debt'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_001', title: 'Matilda Loisel: A Woman Dissatisfied with Her Modest Life',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and see someone constantly posting about their "dream life" while ignoring the good things they already have.',
            decisions: [{ prompt: 'What is Matilda Loisel\'s social and economic background at the start of the story, and how does the author describe her marriage?', options: [
                { text: 'Matilda was born into a family of clerks and married a petty clerk (M', outcome: 'Matilda was born into a family of clerks and married a petty clerk (M.' },
                { text: 'she was poor', outcome: 'Not quite — Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and.', reveals: 'students-consistently-confuse-matilda-s' },
                { text: 'she married a rich man', outcome: 'Not quite — Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and.', reveals: 'students-consistently-confuse-matilda-s' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_002', title: 'The Invitation to the Ball: Matilda\'s Desire for a Dress and Jewels',
          caseStudy: { intro: 'Imagine you\'re invited to the most exclusive party of the year — a diplomat\'s gala where everyone will be dressed in designer clothes and real diamonds.',
            decisions: [{ prompt: 'What specific amount does Matilda demand for a dress, and what does this amount represent in the Loisel household budget?', options: [
                { text: 'Matilda demands 400 francs for a dress', outcome: 'Matilda demands 400 francs for a dress. This is the exact amount her husband had saved to buy a gun.' },
                { text: 'she asks for 500 francs', outcome: 'Not quite — Students believe Matilda\'s distress is *about the invitation* — they write "She was upset because.', reveals: 'matilda-s-distress-is-about' },
                { text: 'it\'s their monthly rent', outcome: 'Not quite — Students believe Matilda\'s distress is *about the invitation* — they write "She was upset because.', reveals: 'matilda-s-distress-is-about' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_003', title: 'Borrowing the Necklace from Mme Forestier',
          caseStudy: { intro: 'Imagine you\'re Matilda — you\'ve just convinced your husband to spend 400 francs on a dress, but you still feel "poor" without jewellery.',
            decisions: [{ prompt: 'What specific piece of jewellery does Matilda choose from Mme Forestier\'s collection, and how is it described in the text?', options: [
                { text: 'Matilda chooses a **diamond necklace** (also called a "rivière" or river of diamonds)', outcome: 'Matilda chooses a **diamond necklace** (also called a "rivière" or river of diamonds) —.' },
                { text: 'a bracelet', outcome: 'Not quite — Students believe Mme Forestier *knows* the necklace is fake and *lends it deliberately* to teach.', reveals: 'mme-forestier-knows-the-necklace' },
                { text: 'pearl necklace', outcome: 'Not quite — Students believe Mme Forestier *knows* the necklace is fake and *lends it deliberately* to teach.', reveals: 'mme-forestier-knows-the-necklace' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_004', title: 'The Ball: Matilda\'s Night of Triumph and Joy',
          caseStudy: { intro: 'Imagine you\'ve saved for months to buy the perfect outfit for your school farewell, and for one night everyone notices you — teachers compliment you, friends.',
            decisions: [{ prompt: 'What is the immediate emotional state of Matilda during the ball, and which two textual phrases best capture it?', options: [
                { text: 'Matilda feels ecstatic triumph', outcome: 'Matilda feels ecstatic triumph — "drunk with pleasure" and "floating on a cloud of happiness".' },
                { text: 'she feels grateful', outcome: 'Not quite — Students think the ball scene is the story\'s "happy part" before the sad part begins.', reveals: 'the-ball-scene-is-the' },
                { text: 'she feels anxious', outcome: 'Not quite — Students think the ball scene is the story\'s "happy part" before the sad part begins.', reveals: 'the-ball-scene-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_005', title: 'The Loss of the Necklace: The Turning Point of the Story',
          caseStudy: { intro: 'Imagine you\'re at a wedding, dancing happily, and suddenly realize your mother\'s gold bangles are missing from your wrist — that heart-stopping moment when joy.',
            decisions: [{ prompt: 'At what precise moment in the story does Matilda realize the necklace is lost, and what is her immediate physical reaction described in the.', options: [
                { text: 'Matilda realizes the loss when she reaches home and stands before the mirror to admire', outcome: 'Matilda realizes the loss when she reaches home and stands before the mirror to admire herself one.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe the turning point is the *ball itself* (Matilda\'s triumph) because it\'s the most.', reveals: 'the-turning-point-is-the' },
                { text: 'Mme Forestier told her', outcome: 'Not quite — Students believe the turning point is the *ball itself* (Matilda\'s triumph) because it\'s the most.', reveals: 'the-turning-point-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_006', title: 'Ten Years of Debt and Hard Work to Replace the Necklace',
          caseStudy: { intro: 'Imagine you borrowed your friend\'s expensive smartwatch for a party, lost it, and instead of confessing, you and your family spent the next ten years doing.',
            decisions: [{ prompt: 'List the four specific lifestyle changes the Loisels make to repay the debt, as explicitly described in the text.', options: [
                { text: 'Correct answer: (1) They dismiss their maid/servant', outcome: 'Correct answer: (1) They dismiss their maid/servant. (2) They change lodgings, moving from their.' },
                { text: 'they became poor', outcome: 'Not quite — Students often believe the "ten years" is only about financial debt repayment.', reveals: 'the-ten-years-is-only' },
                { text: 'they worked hard', outcome: 'Not quite — Students often believe the "ten years" is only about financial debt repayment.', reveals: 'the-ten-years-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student is invited to a rich friend\'s birthday party and is miserable — not because she lacks a dress, but because hers isn\'t expensive-looking enough. She pressures her parents to borrow jewellery she cannot afford to replace.',
            decisions: [{ prompt: 'What warning does \'The Necklace\' give about this frame of mind?', options: [
                { text: 'Matilda suffered the same ache — \'born for all the delicacies and all the luxuries,\' she felt humiliated by an ordinary but adequate life, and one evening of borrowed splendour cost her ten years of real poverty. The story shows the sickness was the craving to appear rich, not the actual want — and borrowing to sustain appearances is exactly how her trap shut.', outcome: 'Her unhappiness was psychological before it was economic — envy of a life she imagined made the decent one she had feel like suffering, and the necklace\'s fake glitter made the irony complete.' },
                { text: 'She is right to want more — Matilda\'s story shows ambition is healthy and she deserved the better life she dreamed of.', outcome: 'Matilda\'s longing was not ambition to become something but envy to appear something — and it is that hunger for appearances, not aspiration, that the story punishes.', reveals: 'envy-is-ambition' },
                { text: 'The real moral is to simply never borrow anything, since objects themselves are dangerous.', outcome: 'The necklace was not cursed — the danger was Matilda\'s deception about losing it and her need to pose as wealthy; borrowing was just where the pretence became payable.', reveals: 'borrowing-is-the-sin' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ten years of scrubbing floors bought a necklace nobody needed, replacing one that was glass. Vanity wrote the bill; honesty could have torn it up.',
            decisions: [{ prompt: 'What comes next? The Necklace · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Necklace · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_001', difficulty: 'standard',
          question: 'Character analysis of Matilda Loisel focuses on her persistent dissatisfaction.',
          hint: 'Review "PEEL paragraph structure" from Class 9 writing nodes (c9_engl_ch1_7.',
          misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The.',
          parts: [
                { id: 'a', prompt: 'What is Matilda Loisel\'s social and economic background at the start of the story, and how does the author describe her marriage?', answer: 'Matilda was born into a family of clerks and married a petty clerk (M',
                  options: ['Matilda was born into a family of clerks and married a petty clerk (M', 'she was poor', 'she married a rich man', 'she was poor and wanted to be rich'],
                  hint: 'Review "PEEL paragraph structure" from Class 9 writing nodes (c9_engl_ch1_7, c9_engl_ch8_7) and.',
                  misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The text explicitly.' },
                { id: 'b', prompt: 'Identify three specific sensory details from Matilda\'s daydreams (e.g., "tall bronze candelabra," "perfumed chambers") and explain what each reveals about her.', answer: '1) "Tall bronze candelabra" → desire for grandeur/aristocratic display',
                  options: ['1) "Tall bronze candelabra" → desire for grandeur/aristocratic display', 'she was poor and wanted to be rich'],
                  hint: 'Review "PEEL paragraph structure" from Class 9 writing nodes (c9_engl_ch1_7, c9_engl_ch8_7) and.',
                  misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The text explicitly.' },
                { id: 'c', prompt: 'Compare Matilda\'s reaction to her modest dinner (boiled beef, stewed fruit) with M. Loisel\'s reaction ("Ah, good stew!").', answer: 'Matilda sighs with despair and escapes into fantasy',
                  options: ['Matilda sighs with despair and escapes into fantasy', 'both are unhappy', 'he doesn\'t care', 'she was poor and wanted to be rich'],
                  hint: 'Review "PEEL paragraph structure" from Class 9 writing nodes (c9_engl_ch1_7, c9_engl_ch8_7) and.',
                  misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The text explicitly.' }
          ],
            remediations: { 'students-consistently-confuse-matilda-s': { steps: ['1) Re-read the first two paragraphs with a highlighter: mark every word describing their home, meals, and staff.', '2) Create a two-column table: "Textual Evidence of Comfort" vs.', '"Matilda\'s Perception." 3) Discuss: "If they had a maid, were they poor?" 4) Rewrite the character sketch opening.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Matilda Loisel is a victim of her social circumstances in 19th-century France." Defend or refute using evidence from the opening.', answer: 'Refute',
                  options: ['Refute', 'she was poor and wanted to be rich'],
                  hint: 'Review "PEEL paragraph structure" from Class 9 writing nodes (c9_engl_ch1_7, c9_engl_ch8_7) and.',
                  misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The text explicitly.' },
                { id: 'b', prompt: 'Write a 4-line diary entry from Matilda\'s perspective on an ordinary evening before the invitation arrives, capturing her voice, tone, and dominant emotion.', answer: 'Sample: "Another evening of boiled beef and silence',
                  options: ['Sample: "Another evening of boiled beef and silence', 'she was poor and wanted to be rich'],
                  hint: 'Review "PEEL paragraph structure" from Class 9 writing nodes (c9_engl_ch1_7, c9_engl_ch8_7) and.',
                  misconception: 'Students consistently confuse Matilda\'s *modest* life with *poverty*, writing "she was poor and wanted to be rich." The text explicitly.' }
          ],
            remediations: { 'students-consistently-confuse-matilda-s': { steps: ['1) Re-read the first two paragraphs with a highlighter: mark every word describing their home, meals, and staff.', '2) Create a two-column table: "Textual Evidence of Comfort" vs.', '"Matilda\'s Perception." 3) Discuss: "If they had a maid, were they poor?" 4) Rewrite the character sketch opening.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_002', difficulty: 'standard',
          question: 'This topic covers the pivotal plot segment in "The Necklace" where Matilda.',
          hint: 'Review c10_engl_cbse_16_001 worked examples on \'showing character through reaction.',
          misconception: 'Students believe Matilda\'s distress is *about the invitation* — they write "She was upset because she had nothing.',
          parts: [
                { id: 'a', prompt: 'What specific amount does Matilda demand for a dress, and what does this amount represent in the Loisel household budget?', answer: 'Matilda demands 400 francs for a dress',
                  options: ['Matilda demands 400 francs for a dress', 'she asks for 500 francs', 'it\'s their monthly rent', 'She was upset because she had nothing to wear to the ball'],
                  hint: 'Review c10_engl_cbse_16_001 worked examples on \'showing character through reaction to ordinary.',
                  misconception: 'Students believe Matilda\'s distress is *about the invitation* — they write "She was upset because she had nothing to wear to the ball.".' }
          ],
            remediations: { 'matilda-s-distress-is-about': { steps: ['Re-read the opening paragraph of the story (node c10_engl_cbse_16_001) and list three sentences that prove Matilda was.', 'Draw a two-column table: Column A = "What Matilda lacks" (dress, jewels, admiration), Column B = "What she already had.', 'Rewrite the diagnostic answer for Q2 using this structure: "The invitation exposes her pre-existing lack of X, which.', 'Practice with a similar scenario: "A student gets a scholarship but cries because she has no new shoes for the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_003', difficulty: 'standard',
          question: 'This topic examines the pivotal scene where Matilda Loisel visits her wealthy.',
          hint: 'Review "Character Analysis: Matilda\'s Dissatisfaction" (c10_engl_cbse_16_001) and.',
          misconception: 'Students believe Mme Forestier *knows* the necklace is fake and *lends it deliberately* to teach Matilda a lesson,.',
          parts: [
                { id: 'a', prompt: 'Why does Matilda reject the other pieces of jewellery (bracelets, pearl necklace, cross) before selecting the diamond necklace?', answer: 'Matilda rejects the other pieces',
                  options: ['Matilda rejects the other pieces', 'the others were ugly', 'she just liked diamonds'],
                  hint: 'Review "Character Analysis: Matilda\'s Dissatisfaction" (c10_engl_cbse_16_001) and practice the PEEL.',
                  misconception: 'Students believe Mme Forestier *knows* the necklace is fake and *lends it deliberately* to teach Matilda a lesson, or that she is.' }
          ],
            remediations: { 'mme-forestier-knows-the-necklace': { steps: ['Re-read the borrowing scene aloud, highlighting every verb describing Mme Forestier\'s actions (opened, said, smiled.', 'Ask: "Does any verb suggest she knows it\'s fake?', 'Does any verb suggest she expects trouble?" 3.', 'Contrast with Matilda\'s verbs (trembled, hesitated, fastened, ecstatic).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_004', difficulty: 'standard',
          question: 'The Ball scene in "The Necklace" is the narrative climax where Matilda Loisel.',
          hint: 'If stuck, review c10_engl_cbse_16_003 (Borrowing the Necklace) — specifically the moment.',
          misconception: 'Students think the ball scene is the story\'s "happy part" before the sad part begins.',
          parts: [
                { id: 'a', prompt: 'What is the immediate emotional state of Matilda during the ball, and which two textual phrases best capture it?', answer: 'Matilda feels ecstatic triumph',
                  options: ['Matilda feels ecstatic triumph', 'she feels grateful', 'she feels anxious', 'happy part'],
                  hint: 'If stuck, review c10_engl_cbse_16_003 (Borrowing the Necklace) — specifically the moment Matilda.',
                  misconception: 'Students think the ball scene is the story\'s "happy part" before the sad part begins.' },
                { id: 'b', prompt: 'Why does Maupassant spend nearly a page describing Matilda\'s success at the ball when the story is really about the necklace loss?', answer: 'The extended description creates dramatic irony',
                  options: ['The extended description creates dramatic irony', 'to show she was happy', 'to describe the party', 'happy part'],
                  hint: 'If stuck, review c10_engl_cbse_16_003 (Borrowing the Necklace) — specifically the moment Matilda.',
                  misconception: 'Students think the ball scene is the story\'s "happy part" before the sad part begins.' },
                { id: 'c', prompt: 'In the ball scene, Matilda\'s husband Loisel falls asleep in a side room.', answer: 'Loisel\'s sleep highlights Matilda\'s total self-absorption',
                  options: ['Loisel\'s sleep highlights Matilda\'s total self-absorption', 'Loisel is tired', 'happy part', 'the ball scene is the story\'s "happy part" before the sad part begins'],
                  hint: 'If stuck, review c10_engl_cbse_16_003 (Borrowing the Necklace) — specifically the moment Matilda.',
                  misconception: 'Students think the ball scene is the story\'s "happy part" before the sad part begins.' }
          ],
            remediations: { 'the-ball-scene-is-the': { steps: ['If a student writes "happy ending" or "joyful night" in practice answers: (1) Have them reread the last sentence of the.', 'threw over her shoulders the modest wraps..." — ask: why "modest wraps" after diamonds?', '(2) Make them list three things Matilda *ignores* at the ball (husband, time, reality).', '(3) Assign a 50-word rewrite: "Rewrite the ball scene from Loisel\'s perspective in the anteroom." This forces the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_005', difficulty: 'standard',
          question: 'The turning point in a narrative is the moment of highest tension where the.',
          hint: 'If stuck, review c10_engl_cbse_16_001 (Matilda\'s character) and c6_english_u1_001 (plot.',
          misconception: 'Students believe the turning point is the *ball itself* (Matilda\'s triumph) because it\'s the most dramatic scene,.',
          parts: [
                { id: 'a', prompt: 'Why does Loisel insist on searching the entire route and involving the police and newspapers instead of immediately confessing to Mme Forestier?', answer: 'Loisel searches desperately',
                  options: ['Loisel searches desperately', 'while Matilda', 'A wrong answer focusing only on'],
                  hint: 'If stuck, review c10_engl_cbse_16_001 (Matilda\'s character) and c6_english_u1_001 (plot structure.',
                  misconception: 'Students believe the turning point is the *ball itself* (Matilda\'s triumph) because it\'s the most dramatic scene, or the *revelation at the.' }
          ],
            remediations: { 'the-turning-point-is-the': { steps: ['**Re-read the search scene aloud** (from "She took off the wraps" to "We must see about replacing the diamonds") and.', '**Draw a narrative arc** on paper: label Exposition (nodes 001-002), Rising Action (nodes 003-004), **Turning Point.', 'Place the loss at the peak.', '**Write one sentence** answering: "What single decision made *at the moment of loss* caused the ten years.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_16_006', difficulty: 'standard',
          question: 'The "Ten Years of Debt and Hard Work" is the falling action phase in *The.',
          hint: 'If stuck, re-read the "Loss of the Necklace" node (c10_engl_cbse_16_005) and the.',
          misconception: 'Students often believe the "ten years" is only about financial debt repayment.',
          parts: [
                { id: 'a', prompt: 'List the four specific lifestyle changes the Loisels make to repay the debt, as explicitly described in the text.', answer: 'Correct answer: (1) They dismiss their maid/servant',
                  options: ['Correct answer: (1) They dismiss their maid/servant', 'they became poor', 'they worked hard', 'ten years'],
                  hint: 'If stuck, re-read the "Loss of the Necklace" node (c10_engl_cbse_16_005) and the "Matilda\'s.',
                  misconception: 'Students often believe the "ten years" is only about financial debt repayment.' },
                { id: 'b', prompt: 'Explain why Matilda agrees to the plan of replacing the necklace secretly rather than confessing the loss to Mme Forestier immediately.', answer: 'Correct answer: Matilda agrees',
                  options: ['Correct answer: Matilda agrees', 'she didn\'t think of confessing', 'Monsieur Loisel forced her', 'ten years'],
                  hint: 'If stuck, re-read the "Loss of the Necklace" node (c10_engl_cbse_16_005) and the "Matilda\'s.',
                  misconception: 'Students often believe the "ten years" is only about financial debt repayment.' },
                { id: 'c', prompt: 'Analyze how Monsieur Loisel\'s character is revealed through his actions during these ten years. Contrast his response with Matilda\'s.', answer: 'Correct answer: Monsieur Loisel displays quiet heroism and unconditional love',
                  options: ['Correct answer: Monsieur Loisel displays quiet heroism and unconditional love', 'just a clerk', 'ten years', 'the "ten years" is only about financial debt repayment'],
                  hint: 'If stuck, re-read the "Loss of the Necklace" node (c10_engl_cbse_16_005) and the "Matilda\'s.',
                  misconception: 'Students often believe the "ten years" is only about financial debt repayment.' }
          ],
            remediations: { 'the-ten-years-is-only': { steps: ['Re-read the paragraph beginning "She came to know the heavy work of the house..." and highlight every verb describing.', 'Draw a two-column table: "Before the Ball" vs "After Ten Years" — fill with textual quotes (e.g., "dressed elegantly".', 'Explain aloud: "The irony is that she became the opposite of what she wanted to be." 4.', 'Practice a 3-mark answer: "How does Maupassant show the physical toll on Matilda?" using the PEEL structure from Worked.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
