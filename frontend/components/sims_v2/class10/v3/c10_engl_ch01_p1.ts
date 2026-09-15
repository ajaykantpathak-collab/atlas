import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch01_p1: SimDef = {
    id: 'v3_c10_engl_ch01_p1',
    title: 'A Letter to God · Part 1/2',
    subtitle: 'Read a letter to God and the irony of the humans who answered it',
    classLevel: 10, subject: 'engl', topic: 'A Letter to God · Part 1/2',
    chapters: ['c10_engl_ch01'],
    nodeIds: ['c10_engl_cbse_01_001', 'c10_engl_cbse_01_002', 'c10_engl_cbse_01_003', 'c10_engl_cbse_01_004', 'c10_engl_cbse_01_005', 'c10_engl_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a literary detective decoding what a farmer\'s letter really means', intro: 'A farmer loses everything to one hour of hail, and his solution is a stamp, a pen and an address no post office can deliver.', goal: 'Analyse Lencho\'s faith as literal and transactional, and support every claim with textual evidence.' },
    discovery: {
        question: 'Lencho\'s crops are destroyed, so he writes a letter addressed simply \'To God\' demanding 100 pesos. When the post office staff collect 70 and send it, he\'s angry — not grateful. What does his anger reveal?',
        options: ['His faith was so literal he believed God sent the full amount — and the post office \'stole\' the rest', 'He\'s ungrateful — 70 pesos should have been enough', 'He realised too late that writing to God was foolish', 'He was angry the letter took so long to deliver'],
        answer: 'His faith was so literal he believed God sent the full amount — and the post office \'stole\' the rest',
        hook: 'Lencho isn\'t a fool — he\'s a man with no bank, no insurance, no helpline. When no human institution will help, absolute faith in God is the only plan left.',
    },
    teaching: [
        { title: 'Lencho\'s Faith in God: Character and Belief System', text: 'Lencho\'s faith in God is an unwavering, literal belief that God directly intervenes in human affairs to provide for the needy, characterized by a childlike trust that bypasses human intermediaries.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Reread the hailstorm scene and hunt the imagery — \'frozen pearls,\' a field \'white as if covered with salt\' — then build a PEEL answer on what Lencho\'s faith really is.',
        labels: ['Lencho\'s Faith in God', 'The Hailstorm and Its', 'Lencho\'s Letter to God', 'The Postmaster\'s Reaction', 'Lencho\'s Anger at Receiving', 'Theme: Faith, Hope'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_001', title: 'Lencho\'s Faith in God: Character and Belief System',
          caseStudy: { intro: 'Imagine you are a farmer who has lost everything to a sudden storm — your year\'s income, your family\'s food, your children\'s school fees.',
            decisions: [{ prompt: 'What is the one phrase Lencho uses to describe his own physical strength and work ethic in the story, and what does it reveal about his.', options: [
                { text: 'The phrase is "ox of a man." It reveals Lencho is hardworking, enduring, and physically', outcome: 'The phrase is "ox of a man." It reveals Lencho is hardworking, enduring, and physically strong like.' },
                { text: 'farmer', outcome: 'Not quite — Students think Lencho is "foolish" or "superstitious" for writing a letter to God.', reveals: 'lencho-is-foolish-or-superstitious' },
                { text: 'strong man', outcome: 'Not quite — Students think Lencho is "foolish" or "superstitious" for writing a letter to God.', reveals: 'lencho-is-foolish-or-superstitious' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_002', title: 'The Hailstorm and Its Impact on Lencho\'s Crops',
          caseStudy: { intro: 'Imagine you are a farmer in a Indian village — you\'ve watched your wheat grow for months, the harvest is days away, and suddenly the sky turns dark.',
            decisions: [{ prompt: 'What two similes does the author use to describe the hailstones and the field after the storm?', options: [
                { text: 'The hailstones are compared to "frozen pearls" and the field is described as "white as if', outcome: 'The hailstones are compared to "frozen pearls" and the field is described as "white as if covered.' },
                { text: 'frozen pearls', outcome: 'Not quite — Students treat the hailstorm as just "bad weather" or a plot device, writing "the hailstorm.', reveals: 'students-treat-the-hailstorm-as' },
                { text: 'white as if covered with salt', outcome: 'Not quite — Students treat the hailstorm as just "bad weather" or a plot device, writing "the hailstorm.', reveals: 'students-treat-the-hailstorm-as' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_003', title: 'Lencho\'s Letter to God: Content and the Request for 100 Pesos',
          caseStudy: { intro: 'Imagine you are a farmer who has just watched your entire year\'s harvest turn to ice in minutes — what would you write in a letter to God if you believed.',
            decisions: [{ prompt: 'What exact amount of money does Lencho request in his letter to God?', options: [
                { text: 'Lencho requests one hundred pesos', outcome: 'Lencho requests one hundred pesos. A wrong answer (e.g., "some money," "a lot of money," or.' },
                { text: 'some money', outcome: 'Not quite — Students often believe Lencho\'s request for 100 pesos is either an arbitrary large number born.', reveals: 'lencho-s-request-for-100' },
                { text: 'a lot of money', outcome: 'Not quite — Students often believe Lencho\'s request for 100 pesos is either an arbitrary large number born.', reveals: 'lencho-s-request-for-100' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_004', title: 'The Postmaster\'s Reaction and the Collection of Money',
          caseStudy: { intro: 'Imagine you are a postmaster in a small village and a letter arrives addressed simply to "God" — written by a poor farmer who lost everything in a hailstorm.',
            decisions: [{ prompt: 'What specific action does the postmaster take after reading Lencho\'s letter to God, and what does he write on the envelope when sending the.', options: [
                { text: 'The postmaster collects money from his employees and contributes part of his own salary,', outcome: 'The postmaster collects money from his employees and contributes part of his own salary, gathering.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often think the postmaster collects money *because* he feels sorry for Lencho\'s poverty.', reveals: 'the-postmaster-collects-money-because' },
                { text: 'he signs his own name', outcome: 'Not quite — Students often think the postmaster collects money *because* he feels sorry for Lencho\'s poverty.', reveals: 'the-postmaster-collects-money-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_005', title: 'Lencho\'s Anger at Receiving 70 Pesos: Irony of the Story',
          caseStudy: { intro: 'Imagine you helped a friend anonymously by collecting money from classmates, but when they receive it, they thank God and accuse your classmates of stealing.',
            decisions: [{ prompt: 'What is the exact amount of money Lencho receives in the envelope, and what amount did he originally request from God in his first letter?', options: [
                { text: 'Lencho receives 70 pesos but requested 100 pesos in his first letter', outcome: 'Lencho receives 70 pesos but requested 100 pesos in his first letter.' },
                { text: 'Lencho asked for 100 but got 70', outcome: 'Not quite — Students often think the irony is simply "Lencho asked for 100 but got 70" — treating it as.', reveals: 'the-irony-is-simply-lencho' },
                { text: 'he received 100 pesos or requested 70', outcome: 'Not quite — Students often think the irony is simply "Lencho asked for 100 but got 70" — treating it as.', reveals: 'the-irony-is-simply-lencho' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_006', title: 'Theme: Faith, Hope and Human Generosity vs Naivety',
          caseStudy: { intro: 'Imagine you see a friend praying intensely for money to pay their rent, and you secretly slip cash under their door — but when they find it, they thank God and.',
            decisions: [{ prompt: 'Define the term "naivety" as it applies to Lencho\'s character in *A Letter to God*. Give one textual example.', options: [
                { text: 'Naivety here means Lencho\'s innocent lack of worldly awareness', outcome: 'Naivety here means Lencho\'s innocent lack of worldly awareness — he cannot conceive that humans.' },
                { text: 'A wrong answer would define naivety generally as', outcome: 'Not quite — Students think the theme is simply "Faith is rewarded" or "God helps those who help themselves.".', reveals: 'the-theme-is-simply-faith' },
                { text: 'Faith is rewarded', outcome: 'Not quite — Students think the theme is simply "Faith is rewarded" or "God helps those who help themselves.".', reveals: 'the-theme-is-simply-faith' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After reading \'A Letter to God\', a classmate laughs at Lencho: \'What an idiot — he wrote a letter to God, then got angry at the very people who helped him.\' The class is asked to defend or challenge that verdict.',
            decisions: [{ prompt: 'What is the fairest reading of Lencho\'s behaviour?', options: [
                { text: 'His faith was real and, in his position, almost rational — a hailstorm had destroyed his crop and a poor farmer had no other appeal left. But the same certainty became rigidity: so sure God had sent exactly one hundred pesos, he could only read the shortfall as theft by the post office staff who had actually collected the money for him.', outcome: 'This reads both sides of Lencho — faith as the strength that made him act, and as the flaw that made him misjudge the humans who quietly helped him.' },
                { text: 'The classmate is right — writing to God was simply irrational, and no sensible person would do it.', outcome: 'Within Lencho\'s world — an isolated farmer whose whole year\'s food was destroyed — appealing to God was the only channel he had; the letter is desperation expressed through faith, not stupidity.', reveals: 'faith-is-irrational' },
                { text: 'Lencho\'s faith actually failed him, because God never delivered the full hundred pesos he asked for.', outcome: 'The story never shows the request failing — the money arrived through human hands; the failure was Lencho\'s inability to see goodness coming through people rather than directly from heaven.', reveals: 'faith-means-full-payment' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'The story\'s deepest irony: the people who answered his letter proved his faith in God — while he accused them of robbing him. Faith and irony share one envelope.',
            decisions: [{ prompt: 'What comes next? A Letter to God · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Letter to God · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_001', difficulty: 'standard',
          question: 'Lencho\'s faith in God is an unwavering, literal belief that God directly.',
          hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) — practice finding 3.',
          misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Lencho decides to write a letter to God instead of going to the bank, the government, or his neighbours for help.', answer: 'Lencho writes to God',
                  options: ['Lencho writes to God', 'he was religious', 'he had no other choice', 'foolish'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) — practice finding 3 traits with.',
                  misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God. They confuse his *literalism* with ignorance.' },
                { id: 'b', prompt: 'Apply the PEEL structure to write a 4-sentence answer: "How does the author show Lencho\'s faith is literal and transactional, not symbolic?" Use one piece.', answer: '**Point:** Lencho treats faith as a direct transaction with God',
                  options: ['**Point:** Lencho treats faith as a direct transaction with God', 'Lencho had faith', 'foolish', 'superstitious'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) — practice finding 3 traits with.',
                  misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God. They confuse his *literalism* with ignorance.' },
                { id: 'c', prompt: 'Analyse the relationship between Lencho\'s simplicity and his faith. Does his lack of education strengthen or weaken his belief system?', answer: 'His simplicity strengthens his faith',
                  options: ['His simplicity strengthens his faith', 'education doesn\'t matter', 'foolish', 'superstitious'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) — practice finding 3 traits with.',
                  misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God. They confuse his *literalism* with ignorance.' }
          ],
            remediations: { 'lencho-is-foolish-or-superstitious': { steps: ['Ask the student to list all the human institutions Lencho *could* have approached (bank, government, landlord.', 'For each, ask "Why didn\'t he go there?" using text clues (e.g., "he knew the post office employees were crooks" implies.', 'Show that his choice of God is a *reasoned rejection* of unreliable humans, not blind superstition.', 'Have them rewrite their answer replacing "foolish" with "strategic in a broken system."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Lencho\'s faith is admirable but dangerous because it makes him blind to human kindness." Defend your position with evidence from the.', answer: 'The statement is partially true',
                  options: ['The statement is partially true', 'faith is always good', 'faith is foolish', 'foolish'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) — practice finding 3 traits with.',
                  misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God. They confuse his *literalism* with ignorance.' },
                { id: 'b', prompt: 'Create a 4-line diary entry from Lencho\'s perspective the night before he writes the first letter, showing his faith, his worry for his family, and his.', answer: 'A strong entry: "The hail took everything',
                  options: ['A strong entry: "The hail took everything', 'foolish', 'superstitious', 'Lencho is "foolish" or "superstitious" for writing a letter to God'],
                  hint: 'If stuck, review c9_engl_ch1_2 (Grandmother character analysis) — practice finding 3 traits with.',
                  misconception: 'Students think Lencho is "foolish" or "superstitious" for writing a letter to God. They confuse his *literalism* with ignorance.' }
          ],
            remediations: { 'lencho-is-foolish-or-superstitious': { steps: ['Ask the student to list all the human institutions Lencho *could* have approached (bank, government, landlord.', 'For each, ask "Why didn\'t he go there?" using text clues (e.g., "he knew the post office employees were crooks" implies.', 'Show that his choice of God is a *reasoned rejection* of unreliable humans, not blind superstition.', 'Have them rewrite their answer replacing "foolish" with "strategic in a broken system."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_002', difficulty: 'standard',
          question: 'The hailstorm in "A Letter to God" is a sudden, violent weather event where.',
          hint: 'Review Class 6 "Poetic Devices: Imagery, Metaphor" (c6_english_u1_005) and Class 7.',
          misconception: 'Students treat the hailstorm as just "bad weather" or a plot device, writing "the hailstorm destroyed the crops.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author describes the rain turning into hail as "the rain changed" rather than saying "a hailstorm began."', answer: 'The phrase "the rain changed" mirrors Lencho\'s perspective',
                  options: ['The phrase "the rain changed" mirrors Lencho\'s perspective', 'it\'s a meteorological transition'],
                  hint: 'Review Class 6 "Poetic Devices: Imagery, Metaphor" (c6_english_u1_005) and Class 7 "Literary.',
                  misconception: 'Students treat the hailstorm as just "bad weather" or a plot device, writing "the hailstorm destroyed the crops so Lencho wrote a letter.".' },
                { id: 'b', prompt: 'Compare the imagery of the "frozen pearls" (before destruction) with "white as if covered with salt" (after destruction).', answer: '"Frozen pearls" suggests beauty and value',
                  options: ['"Frozen pearls" suggests beauty and value', 'author\'s craft'],
                  hint: 'Review Class 6 "Poetic Devices: Imagery, Metaphor" (c6_english_u1_005) and Class 7 "Literary.',
                  misconception: 'Students treat the hailstorm as just "bad weather" or a plot device, writing "the hailstorm destroyed the crops so Lencho wrote a letter.".' }
          ],
            remediations: { 'students-treat-the-hailstorm-as': { steps: ['Re-read the hailstorm paragraphs aloud with the student, pausing at every image.', 'Have them draw two quick sketches — "Before: frozen pearls" and "After: covered with salt" — labeling sensory words.', 'Practice a 3-mark answer: "How does the author make the destruction vivid?', 'Compare their answer to the marking scheme rubric.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_003', difficulty: 'standard',
          question: 'This topic examines the specific content of Lencho\'s letter to God, focusing.',
          hint: 'Review the hailstorm impact node (c10_engl_cbse_01_002) for the extent of crop loss, and.',
          misconception: 'Students often believe Lencho\'s request for 100 pesos is either an arbitrary large number born of desperation or a sign.',
          parts: [
                { id: 'a', prompt: 'What exact amount of money does Lencho request in his letter to God?', answer: 'Lencho requests one hundred pesos',
                  options: ['Lencho requests one hundred pesos', 'some money', 'a lot of money'],
                  hint: 'Review the hailstorm impact node (c10_engl_cbse_01_002) for the extent of crop loss, and revisit.',
                  misconception: 'Students often believe Lencho\'s request for 100 pesos is either an arbitrary large number born of desperation or a sign of greed.' },
                { id: 'b', prompt: 'In your own words, explain why Lencho asks for exactly 100 pesos and not a different amount.', answer: 'Lencho asks for 100 pesos',
                  options: ['Lencho asks for 100 pesos', 'he just guessed', 'he wanted a large sum'],
                  hint: 'Review the hailstorm impact node (c10_engl_cbse_01_002) for the extent of crop loss, and revisit.',
                  misconception: 'Students often believe Lencho\'s request for 100 pesos is either an arbitrary large number born of desperation or a sign of greed.' }
          ],
            remediations: { 'lencho-s-request-for-100': { steps: ['Re-read the letter excerpt aloud, highlighting every phrase that mentions money, purpose, or time.', 'Return to node c10_engl_cbse_01_002 and list the specific losses caused by the hailstorm (total crop destruction,.', 'Match each loss to a need in the letter: no crop → need seeds; no food → need money to live.', 'Write a one-sentence summary: "Lencho asks for 100 pesos because he needs X for seeds and Y for food until harvest.".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_004', difficulty: 'standard',
          question: 'The postmaster\'s reaction refers to his compassionate response to Lencho\'s.',
          hint: 'If stuck, review c10_engl_cbse_01_003 (Lencho\'s Letter to God) and c10_engl_cbse_01_001.',
          misconception: 'Students often think the postmaster collects money *because* he feels sorry for Lencho\'s poverty.',
          parts: [
                { id: 'a', prompt: 'Compare the postmaster\'s reaction to Lencho\'s letter with how a typical bureaucrat might respond.', answer: 'A typical bureaucrat would discard or file the letter as "undeliverable"',
                  options: ['A typical bureaucrat would discard or file the letter as "undeliverable"', 'the postmaster is kind', 'the postmaster collects money *because* he feels sorry for Lencho\'s poverty'],
                  hint: 'If stuck, review c10_engl_cbse_01_003 (Lencho\'s Letter to God) and c10_engl_cbse_01_001 (Lencho\'s.',
                  misconception: 'Students often think the postmaster collects money *because* he feels sorry for Lencho\'s poverty.' }
          ],
            remediations: { 'the-postmaster-collects-money-because': { steps: ['If the student confuses pity with reverence for faith: (1) Ask them to find the exact line where the postmaster speaks.', '(2) Have them compare two scenarios: helping a poor man vs.', 'helping a man because his faith moves you.', '(3) Ask: "If Lencho had written to the government for money, would the postmaster have collected?" (No — the address.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_005', difficulty: 'standard',
          question: 'Lencho\'s anger at receiving 70 pesos instead of the 100 he requested from God.',
          hint: 'If stuck, review c10_engl_cbse_01_004 (Postmaster\'s collection) and c10_engl_cbse_01_001.',
          misconception: 'Students often think the irony is simply "Lencho asked for 100 but got 70" — treating it as a numerical mismatch.',
          parts: [
                { id: 'a', prompt: 'What is the exact amount of money Lencho receives in the envelope, and what amount did he originally request from God in his first letter?', answer: 'Lencho receives 70 pesos but requested 100 pesos in his first letter',
                  options: ['Lencho receives 70 pesos but requested 100 pesos in his first letter', 'Lencho asked for 100 but got 70', 'he received 100 pesos or requested 70'],
                  hint: 'If stuck, review c10_engl_cbse_01_004 (Postmaster\'s collection) and c10_engl_cbse_01_001 (Lencho\'s.',
                  misconception: 'Students often think the irony is simply "Lencho asked for 100 but got 70" — treating it as a numerical mismatch.' },
                { id: 'b', prompt: 'Explain in your own words why Lencho becomes angry after counting the money, even though he asked God for help and received some money.', answer: 'Lencho becomes angry',
                  options: ['Lencho becomes angry', 'he is greedy', 'he is ungrateful', 'Lencho asked for 100 but got 70'],
                  hint: 'If stuck, review c10_engl_cbse_01_004 (Postmaster\'s collection) and c10_engl_cbse_01_001 (Lencho\'s.',
                  misconception: 'Students often think the irony is simply "Lencho asked for 100 but got 70" — treating it as a numerical mismatch.' },
                { id: 'c', prompt: 'Analyze how Lencho\'s second letter to God ("God: Of the money I asked for, only seventy pesos reached me. Send me the rest, since I need it very much.', answer: 'The letter highlights (1) unwavering faith in God',
                  options: ['The letter highlights (1) unwavering faith in God', 'faithful', 'suspicious', 'Lencho asked for 100 but got 70'],
                  hint: 'If stuck, review c10_engl_cbse_01_004 (Postmaster\'s collection) and c10_engl_cbse_01_001 (Lencho\'s.',
                  misconception: 'Students often think the irony is simply "Lencho asked for 100 but got 70" — treating it as a numerical mismatch.' }
          ],
            remediations: { 'the-irony-is-simply-lencho': { steps: ['Re-read the two key paragraphs aloud — the money-counting scene and the second letter.', 'Draw a two-column table: Column A = "What the postmaster/employees DID and INTENDED" (collected 70 pesos, wanted.', 'Write one sentence connecting them: "The irony is that the people Lencho calls \'crooks\' are the ones who helped him."', 'Practice writing this as a 3-mark board answer using PEEL: Point (situational irony), Evidence (quote "bunch of crooks".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_01_006', difficulty: 'standard',
          question: 'The theme of "Faith, Hope and Human Generosity vs Naivety" in *A Letter to God*.',
          hint: 'If stuck, review c9_engl_ch1_4 and c9_engl_ch1_5 (theme tracing in "How I Taught.',
          misconception: 'Students think the theme is simply "Faith is rewarded" or "God helps those who help themselves." They miss the.',
          parts: [
                { id: 'a', prompt: 'Define the term "naivety" as it applies to Lencho\'s character in *A Letter to God*. Give one textual example.', answer: 'Naivety here means Lencho\'s innocent lack of worldly awareness',
                  options: ['Naivety here means Lencho\'s innocent lack of worldly awareness', 'A wrong answer would define naivety generally as', 'Faith is rewarded', 'God helps those who help themselves'],
                  hint: 'If stuck, review c9_engl_ch1_4 and c9_engl_ch1_5 (theme tracing in "How I Taught My Grandmother.',
                  misconception: 'Students think the theme is simply "Faith is rewarded" or "God helps those who help themselves." They miss the *critical tension*: Lencho\'s.' },
                { id: 'b', prompt: 'Apply the theme to a new situation: A farmer\'s crops fail. He prays for rain. His neighbour secretly irrigates his field at night.', answer: 'Faith: Farmer prays for rain (divine intervention)',
                  options: ['Faith: Farmer prays for rain (divine intervention)', 'ungrateful', 'Faith is rewarded', 'God helps those who help themselves'],
                  hint: 'If stuck, review c9_engl_ch1_4 and c9_engl_ch1_5 (theme tracing in "How I Taught My Grandmother.',
                  misconception: 'Students think the theme is simply "Faith is rewarded" or "God helps those who help themselves." They miss the *critical tension*: Lencho\'s.' },
                { id: 'c', prompt: 'Analyze how the theme develops across the three letters in the story (Lencho\'s first letter, the postmaster\'s reply with money, Lencho\'s second letter).', answer: 'Letter 1 (Lencho→God): Establishes faith/hope',
                  options: ['Letter 1 (Lencho→God): Establishes faith/hope', 'Faith is rewarded', 'God helps those who help themselves', 'the theme is simply "Faith is rewarded" or "God helps those who help themselves'],
                  hint: 'If stuck, review c9_engl_ch1_4 and c9_engl_ch1_5 (theme tracing in "How I Taught My Grandmother.',
                  misconception: 'Students think the theme is simply "Faith is rewarded" or "God helps those who help themselves." They miss the *critical tension*: Lencho\'s.' }
          ],
            remediations: { 'the-theme-is-simply-faith': { steps: ['Re-read the three letter scenes side-by-side (textbook pages).', 'Make a three-column table: Column A = What Lencho believes (God), Column B = What actually happens (Humans), Column.', 'Write one PEEL paragraph for each column using direct phrases from text.', 'Practice the 2023 CBSE sample question: "Lencho\'s faith was unshakeable but his naivety was pitiable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
