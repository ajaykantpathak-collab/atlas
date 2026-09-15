import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch03_p2: SimDef = {
    id: 'v3_c7_hist_ch03_p2',
    title: 'The Age of Reorganisation · Part 2/2',
    subtitle: 'Covers the development of overland and maritime trade routes, Indian kingdoms involved.',
    classLevel: 7, subject: 'history', topic: 'The Age of Reorganisation · Part 2/2',
    chapters: ['c7_hist_ch03'],
    nodeIds: ['c7_hist_ch03_007', 'c7_hist_ch03_008', 'c7_hist_ch03_009', 'c7_hist_ch03_010', 'c7_hist_ch03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking through a bustling ancient Indian port market in Bharuch or Tamralipti, where you can hear.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The giant Mauryan Empire collapses into rival regional kingdoms — it sounds like a dark age, yet markets boomed, coins multiplied, and new art styles flowered. Why did breaking apart energise the subcontinent?',
        options: ['Regional rulers competed to attract merchants — patronising craft guilds, minting coins, and guarding trade routes to grow their own economies', 'It did not — everything fell into ruin', 'Foreign invaders ran every market single-handedly', 'The empire secretly kept ruling from hiding'],
        answer: 'Regional rulers competed to attract merchants — patronising craft guilds, minting coins, and guarding trade routes to grow their own economies',
        hook: 'Political fragmentation is not the same as decline. Post-Maurya coins carried two languages and gods from different cultures on a single piece of metal — evidence of an age of reorganisation, not a dark age.',
    },
    teaching: [
        { title: 'Trade Routes: Silk Route and Indian Connections', text: 'The Silk Route was a vast network of ancient trade routes that connected China and the Mediterranean across Asia, with significant branch networks deeply connecting the Indian subcontinent through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold a bilingual coin from this era — decode what its two scripts and mixed deities reveal — then argue why the post-Maurya centuries deserve the name Age of Reorganisation.',
        labels: ['Trade Routes: Silk Route', 'Assimilation of Foreign Invaders', 'Cultural Confluence: Blending', 'Religious Developments: Buddhism', 'Art and Architecture'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch03_007', title: 'Trade Routes: Silk Route and Indian Connections',
          caseStudy: { intro: 'Imagine walking through a bustling ancient Indian port market in Bharuch or Tamralipti, where you can hear merchants speaking Greek, Chinese, and Prakrit.',
            decisions: [{ prompt: 'What was the primary luxury item exported from China that gave the famous trans-Asian trade route its modern name?', options: [
                { text: 'silk', outcome: 'The correct answer is silk. A student who answers "cotton" or "spices" is confusing Chinese exports.' },
                { text: 'cotton', outcome: 'Not quite — Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end.', reveals: 'the-silk-route-was-a' },
                { text: 'spices', outcome: 'Not quite — Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end.', reveals: 'the-silk-route-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch03_009', title: 'Cultural Confluence: Blending of Traditions',
          caseStudy: { intro: 'Imagine visiting a modern city where traditional local food is served with international fusion flavors, creating something entirely new yet deeply familiar.',
            decisions: [{ prompt: 'What is the term used to describe the blending of different cultural traditions, beliefs, and artistic styles into a new, combined form?', options: [
                { text: 'The correct term is cultural confluence or syncretism', outcome: 'The correct term is cultural confluence or syncretism. A student who answers "assimilation".' },
                { text: 'assimilation', outcome: 'Not quite — Students often assume that when foreign groups like the Kushanas or Indo-Greeks entered India, they.', reveals: 'when-foreign-groups-like-the' },
                { text: 'conquest', outcome: 'Not quite — Students often assume that when foreign groups like the Kushanas or Indo-Greeks entered India, they.', reveals: 'when-foreign-groups-like-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After learning that the Mauryan Empire broke apart, Tara tells her study group: \'So obviously India went into a dark age — trade died, towns emptied, and culture collapsed until the next big empire.\'',
            decisions: [{ prompt: 'How should the group correct her?', options: [
                { text: 'Fragmentation is not collapse: regional dynasties like the Shungas and Satavahanas competed to attract merchants, minted their own artistic coins, patronised craft guilds, and trade with Rome and Central Asia via the Silk Route actually boomed.', outcome: 'This replaces the \'empire or darkness\' assumption with the evidence: decentralised rival states fostered commerce and cultural blending.' },
                { text: 'Tara is right — without one emperor, there was no one to protect traders, so all exchange must have stopped.', outcome: 'Regional rulers depended on commercial taxes and actively protected routes and guilds; rival kingdoms made travel more competitive, not impossible.', reveals: 'fragmentation-means-collapse' },
                { text: 'The real reason the period mattered is that foreign invaders like the Kushanas completely replaced Indian culture with their own.', outcome: 'Foreign groups assimilated into local religions and produced hybrid art like the Gandhara school — synthesis, not replacement.', reveals: 'foreigners-replaced-culture' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch03_011', title: 'You made it',
          caseStudy: { intro: 'When one centre of power dissolves, many centres of creativity ignite. The map fragmented; the civilisation diversified.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch03_007', difficulty: 'standard',
          question: 'The Silk Route was a vast network of ancient trade routes that connected China.',
          hint: 'Review node c7_hist_ch03_004 on the Kushana Empire to understand how foreign rulers.',
          misconception: 'Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end to end, similar.',
          parts: [
                { id: 'a', prompt: 'What was the primary luxury item exported from China that gave the famous trans-Asian trade route its modern name?', answer: 'silk',
                  options: ['silk', 'cotton', 'spices', 'Silk Route'],
                  hint: 'Review node c7_hist_ch03_004 on the Kushana Empire to understand how foreign rulers secured.',
                  misconception: 'Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end to end, similar to a modern national.' },
                { id: 'b', prompt: 'Why did Kushana rulers like Kanishka take a special interest in protecting and controlling the Silk Route?', answer: 'that controlling the Silk Route allowed the Kushanas to levy taxes on merchants,',
                  options: ['that controlling the Silk Route allowed the Kushanas to levy taxes on merchants,', 'Silk Route'],
                  hint: 'Review node c7_hist_ch03_004 on the Kushana Empire to understand how foreign rulers secured.',
                  misconception: 'Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end to end, similar to a modern national.' }
          ],
            remediations: { 'the-silk-route-was-a': { steps: ['To fix this, have the student trace two different pathways on a blank map of Asia—one overland through the Pamir.', 'Explain that merchants did not travel the entire length from Rome to China; instead, goods were passed along through.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end to end, similar.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Silk Route was primarily an economic highway for commercial goods, and cultural exchange was merely a minor accidental side.', answer: 'The statement is false and should be refuted',
                  options: ['The statement is false and should be refuted', 'Silk Route'],
                  hint: 'Review node c7_hist_ch03_004 on the Kushana Empire to understand how foreign rulers secured.',
                  misconception: 'Students often think that the "Silk Route" was a single, paved highway guarded by soldiers from end to end, similar to a modern national.' }
          ],
            remediations: { 'the-silk-route-was-a': { steps: ['To fix this, have the student trace two different pathways on a blank map of Asia—one overland through the Pamir.', 'Explain that merchants did not travel the entire length from Rome to China; instead, goods were passed along through.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_008', difficulty: 'standard',
          question: 'The process by which foreign ruling groups such as the Indo-Greeks, Sakas.',
          hint: 'Review node c7_hist_ch03_004 (Kushana Empire) to see how foreign kings integrated into.',
          misconception: 'Students often believe that foreign invaders like the Sakas and Kushanas ruled India purely through military force and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The process by which foreign ruling groups such as the Indo-Greeks, Sakas, Parthians, and',
                  options: ['The process by which foreign ruling groups such as the Indo-Greeks, Sakas, Parthians, and', 'The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of'],
                  hint: 'Review node c7_hist_ch03_004 (Kushana Empire) to see how foreign kings integrated into local.',
                  misconception: 'Students often believe that foreign invaders like the Sakas and Kushanas ruled India purely through military force and maintained.' }
          ],
            remediations: { 'foreign-invaders-like-the-sakas': { steps: ['To fix this misunderstanding, examine the coins of the Kushana king Kanishka alongside earlier Indo-Greek coins.', 'Point out how foreign kings are depicted wearing Central Asian coats on one side, but their coins feature images.', 'Guide the student to conclude that rulers had to adopt local cultural symbols to govern effectively, proving that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_009', difficulty: 'standard',
          question: 'Cultural confluence during the post-Maurya period refers to the rich blending.',
          hint: 'Review c7_hist_ch03_008 (Assimilation of Foreign Invaders into Indian Society).',
          misconception: 'Students often assume that when foreign groups like the Kushanas or Indo-Greeks entered India, they completely wiped.',
          parts: [
                { id: 'a', prompt: 'What is the term used to describe the blending of different cultural traditions, beliefs, and artistic styles into a new, combined form?', answer: 'The correct term is cultural confluence or syncretism',
                  options: ['The correct term is cultural confluence or syncretism', 'assimilation', 'conquest'],
                  hint: 'Review c7_hist_ch03_008 (Assimilation of Foreign Invaders into Indian Society) to understand how.',
                  misconception: 'Students often assume that when foreign groups like the Kushanas or Indo-Greeks entered India, they completely wiped out local cultures and.' }
          ],
            remediations: { 'when-foreign-groups-like-the': { steps: ['To correct this, guide the student to examine ancient coins from the Kushana period.', 'Show them that while the front of the coin depicted a Greek or Central Asian king, the reverse often featured Indian.', 'Explain that this visual evidence proves rulers actively adopted local beliefs to connect with their subjects.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_010', difficulty: 'standard',
          question: 'During the 6th century BCE and the subsequent post-Mauryan reorganisation.',
          hint: 'Review c7_hist_ch03_001 to understand how trade routes and political fragmentation.',
          misconception: 'Students often believe that Buddhism and Jainism completely wiped out Vedic traditions overnight across the entire.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'During the 6th century BCE and the subsequent post-Mauryan reorganisation period,',
                  options: ['During the 6th century BCE and the subsequent post-Mauryan reorganisation period,', 'The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of'],
                  hint: 'Review c7_hist_ch03_001 to understand how trade routes and political fragmentation created.',
                  misconception: 'Students often believe that Buddhism and Jainism completely wiped out Vedic traditions overnight across the entire Indian subcontinent.' }
          ],
            remediations: { 'buddhism-and-jainism-completely-wiped': { steps: ['To fix this misconception, have the student map out contemporary religious practices using archaeological evidence from.', 'Emphasize that religious change in ancient India was a process of gradual transformation and coexistence rather than.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_011', difficulty: 'standard',
          question: 'The art and architecture of the post-Maurya reorganisation period (c.',
          hint: 'Review c7_hist_ch03_001 (Post-Maurya Period) and c7_hist_ch03_006 (Gandhara and Mathura.',
          misconception: 'Students often think that the art and architecture of the post-Maurya period were uniformly Buddhist and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The art and architecture of the post-Maurya reorganisation period (c',
                  options: ['The art and architecture of the post-Maurya reorganisation period (c', 'The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of'],
                  hint: 'Review c7_hist_ch03_001 (Post-Maurya Period) and c7_hist_ch03_006 (Gandhara and Mathura Schools.',
                  misconception: 'Students often think that the art and architecture of the post-Maurya period were uniformly Buddhist and state-sponsored, failing.' }
          ],
            remediations: { 'the-art-and-architecture-of': { steps: ['To fix this misconception, guide the student to examine primary source evidence from cave inscriptions (such as those.', 'Have them list the occupations of donors mentioned in the inscriptions (e.g., silk weavers, royal officials, foreign.', 'Then, compare a Mauryan monolithic pillar inscription (which focuses on royal imperial authority) with a post-Maurya.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
