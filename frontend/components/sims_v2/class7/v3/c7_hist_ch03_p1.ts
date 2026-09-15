import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch03_p1: SimDef = {
    id: 'v3_c7_hist_ch03_p1',
    title: 'The Age of Reorganisation · Part 1/2',
    subtitle: 'Covers the political fragmentation, economic shifts, and emergence of regional/foreign.',
    classLevel: 7, subject: 'history', topic: 'The Age of Reorganisation · Part 1/2',
    chapters: ['c7_hist_ch03'],
    nodeIds: ['c7_hist_ch03_001', 'c7_hist_ch03_002', 'c7_hist_ch03_003', 'c7_hist_ch03_004', 'c7_hist_ch03_005', 'c7_hist_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking through a bustling ancient market town where you hear Greek, Prakrit, and Sanskrit spoken all.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The giant Mauryan Empire collapses into rival regional kingdoms — it sounds like a dark age, yet markets boomed, coins multiplied, and new art styles flowered. Why did breaking apart energise the subcontinent?',
        options: ['Regional rulers competed to attract merchants — patronising craft guilds, minting coins, and guarding trade routes to grow their own economies', 'It did not — everything fell into ruin', 'Foreign invaders ran every market single-handedly', 'The empire secretly kept ruling from hiding'],
        answer: 'Regional rulers competed to attract merchants — patronising craft guilds, minting coins, and guarding trade routes to grow their own economies',
        hook: 'Political fragmentation is not the same as decline. Post-Maurya coins carried two languages and gods from different cultures on a single piece of metal — evidence of an age of reorganisation, not a dark age.',
    },
    teaching: [
        { title: 'Post-Maurya Period: Age of Reorganisation', text: 'The post-Maurya period (c. 200 BCE – 300 CE) was an age of political fragmentation and vibrant reorganisation across the Indian subcontinent following the collapse of the centralised Mauryan Empire.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Hold a bilingual coin from this era — decode what its two scripts and mixed deities reveal — then argue why the post-Maurya centuries deserve the name Age of Reorganisation.',
        labels: ['Post-Maurya Period: Age', 'Shunga Dynasty: Rise', 'Satavahana Kingdom: Deccan Region', 'Kushana Empire: Foreign Rulers', 'Indo-Greek Kingdoms: Cultural Confluence', 'Gandhara and Mathura Schools'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch03_006', title: 'Gandhara and Mathura Schools of Art',
          caseStudy: { intro: 'Imagine visiting a museum and seeing two statues of the Buddha from the same historical era: one looks like a Greek god with wavy hair wrapped in a heavy.',
            decisions: [{ prompt: 'Which primary material was predominantly used by sculptors of the Gandhara school of art, located in the northwestern frontier of the.', options: [
                { text: 'Blue-grey schist and stucco (plaster) were predominantly used by Gandhara artists', outcome: 'Blue-grey schist and stucco (plaster) were predominantly used by Gandhara artists.' },
                { text: 'spotted red sandstone', outcome: 'Not quite — Students often believe that the Gandhara and Mathura schools were competing political factions.', reveals: 'the-gandhara-and-mathura-schools' },
                { text: 'one school copied the other directly', outcome: 'Not quite — Students often believe that the Gandhara and Mathura schools were competing political factions.', reveals: 'the-gandhara-and-mathura-schools' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After learning that the Mauryan Empire broke apart, Tara tells her study group: \'So obviously India went into a dark age — trade died, towns emptied, and culture collapsed until the next big empire.\'',
            decisions: [{ prompt: 'How should the group correct her?', options: [
                { text: 'Fragmentation is not collapse: regional dynasties like the Shungas and Satavahanas competed to attract merchants, minted their own artistic coins, patronised craft guilds, and trade with Rome and Central Asia via the Silk Route actually boomed.', outcome: 'This replaces the \'empire or darkness\' assumption with the evidence: decentralised rival states fostered commerce and cultural blending.' },
                { text: 'Tara is right — without one emperor, there was no one to protect traders, so all exchange must have stopped.', outcome: 'Regional rulers depended on commercial taxes and actively protected routes and guilds; rival kingdoms made travel more competitive, not impossible.', reveals: 'fragmentation-means-collapse' },
                { text: 'The real reason the period mattered is that foreign invaders like the Kushanas completely replaced Indian culture with their own.', outcome: 'Foreign groups assimilated into local religions and produced hybrid art like the Gandhara school — synthesis, not replacement.', reveals: 'foreigners-replaced-culture' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'When one centre of power dissolves, many centres of creativity ignite. The map fragmented; the civilisation diversified.',
            decisions: [{ prompt: 'What comes next? The Age of Reorganisation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Age of Reorganisation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch03_001', difficulty: 'standard',
          question: 'The post-Maurya period (c. 200 BCE – 300 CE) was an age of political.',
          hint: 'Review the administrative structure in c6_history_ch05_010 to understand how provincial.',
          misconception: 'Students often think that the collapse of the Mauryan Empire plunged the Indian subcontinent into economic and cultural.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The post-Maurya period (c',
                  options: ['The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of', 'The Kushana Empire was a powerful realm established in the 1st to 3rd centuries CE by the'],
                  hint: 'Review the administrative structure in c6_history_ch05_010 to understand how provincial governors.',
                  misconception: 'Students often think that the collapse of the Mauryan Empire plunged the Indian subcontinent into economic and cultural darkness, assuming.' }
          ],
            remediations: { 'the-collapse-of-the-mauryan': { steps: ['To fix this, guide the student to compare a map of the centralised Mauryan Empire (c6_history_ch05_007) with a map.', 'Point out how multiple independent trade hubs, coin mints, and distinct art styles appear across different regions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_002', difficulty: 'standard',
          question: 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the.',
          hint: 'Review c6_history_ch05_012 (After the Mauryas: Post-Mauryan Kingdoms) and.',
          misconception: 'Students often believe that the end of the Mauryan Empire meant the complete collapse of civilization and culture.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern',
                  options: ['The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The post-Maurya period (c', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of', 'The Kushana Empire was a powerful realm established in the 1st to 3rd centuries CE by the'],
                  hint: 'Review c6_history_ch05_012 (After the Mauryas: Post-Mauryan Kingdoms) and c7_hist_ch03_001.',
                  misconception: 'Students often believe that the end of the Mauryan Empire meant the complete collapse of civilization and culture in northern India.' }
          ],
            remediations: { 'the-end-of-the-mauryan': { steps: ['To fix this misconception, guide the student through a comparative timeline of Mauryan and Shunga monuments using.', 'Show them how simple brick structures from earlier periods were upgraded with stone railings and carved gateways during.', 'Conclude by having them trace how local craftsmen continued their trade under new royal patrons, proving that culture.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_003', difficulty: 'standard',
          question: 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan.',
          hint: 'Review the post-Maurya political landscape in node c7_hist_ch03_001 to see how local.',
          misconception: 'Students often assume that the entire Indian subcontinent was ruled uniformly under one large empire after the Mauryas.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of',
                  options: ['The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of', 'The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Kushana Empire was a powerful realm established in the 1st to 3rd centuries CE by the'],
                  hint: 'Review the post-Maurya political landscape in node c7_hist_ch03_001 to see how local leaders gained.',
                  misconception: 'Students often assume that the entire Indian subcontinent was ruled uniformly under one large empire after the Mauryas fell, viewing.' }
          ],
            remediations: { 'the-entire-indian-subcontinent-was': { steps: ['To fix this misconception, have the student trace the borders of the Mauryan Empire versus the Satavahana kingdom on.', 'Point out how the Satavahanas mastered the Deccan plateau—a region with distinct river valleys, black soil, and.', 'Compare this local adaptation with how modern states manage different geographical zones.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_004', difficulty: 'standard',
          question: 'The Kushana Empire was a powerful realm established in the 1st to 3rd centuries.',
          hint: 'Review the political map of post-Maurya India in c7_hist_ch03_001 and trace how regional.',
          misconception: 'Students often confuse the Kushanas with earlier Greek invaders (Indo-Greeks) or later Turkic invaders, assuming all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Kushana Empire was a powerful realm established in the 1st to 3rd centuries CE by the',
                  options: ['The Kushana Empire was a powerful realm established in the 1st to 3rd centuries CE by the', 'The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of'],
                  hint: 'Review the political map of post-Maurya India in c7_hist_ch03_001 and trace how regional kingdoms.',
                  misconception: 'Students often confuse the Kushanas with earlier Greek invaders (Indo-Greeks) or later Turkic invaders, assuming all groups from the.' }
          ],
            remediations: { 'students-often-confuse-the-kushanas': { steps: ['To fix this misconception, review a comparative map of Central Asia and northwest India alongside a timeline showing.', 'Examine a picture of a Kushana coin showing bilingual inscriptions (Greek script with Bactrian language) next to images.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_005', difficulty: 'standard',
          question: 'The Indo-Greek kingdoms were principalities established in the northwestern.',
          hint: 'Review c7_hist_ch03_001 (Post-Maurya Period: Age of Reorganisation) to understand how the.',
          misconception: 'Students often think that foreign rulers like the Indo-Greeks completely replaced Indian culture with Greek culture.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indo-Greek kingdoms were principalities established in the northwestern regions of',
                  options: ['The Indo-Greek kingdoms were principalities established in the northwestern regions of', 'The post-Maurya period (c', 'The Shunga Dynasty was an ancient Indian royal dynasty that ruled parts of the northern', 'The Satavahana kingdom was a powerful regional dynasty that ruled the Deccan region of'],
                  hint: 'Review c7_hist_ch03_001 (Post-Maurya Period: Age of Reorganisation) to understand how the political.',
                  misconception: 'Students often think that foreign rulers like the Indo-Greeks completely replaced Indian culture with Greek culture in the territories they.' }
          ],
            remediations: { 'foreign-rulers-like-the-indo': { steps: ['To fix this misconception, examine a photograph of an Indo-Greek coin showing King Menander adopting the title.', 'Explain that rulers who want to collect taxes and maintain order must speak the language and respect the beliefs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_006', difficulty: 'standard',
          question: 'The Gandhara and Mathura Schools of Art were two major artistic traditions that.',
          hint: 'Review c7_hist_ch03_004 (Kushana Empire) and c7_hist_ch03_005 (Indo-Greek Kingdoms).',
          misconception: 'Students often believe that the Gandhara and Mathura schools were competing political factions rather than regional.',
          parts: [
                { id: 'a', prompt: 'A museum exhibits a 2nd-century CE Buddha statue carved from spotted red sandstone, seated in a lotus posture with a broad chest and a radiant halo adorned.', answer: 'This sculpture belongs to the Mathura school',
                  options: ['This sculpture belongs to the Mathura school', 'one school copied the other directly'],
                  hint: 'Review c7_hist_ch03_004 (Kushana Empire) and c7_hist_ch03_005 (Indo-Greek Kingdoms) to understand.',
                  misconception: 'Students often believe that the Gandhara and Mathura schools were competing political factions rather than regional artistic styles,.' }
          ],
            remediations: { 'the-gandhara-and-mathura-schools': { steps: ['To fix this misconception, compare two images side by side: a Greco-Roman bust and a Mathura Yaksha sculpture from.', 'Point out that Mathura art used local red sandstone because quarries were nearby in Sikri, and its heavy-set, powerful.', 'Explain that artists in different regions simply used the artistic tools and materials most familiar to them while.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the Gandhara and Mathura schools were competing political factions rather than regional.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim that the Gandhara school was purely Greek in origin and had no connection to Indian spiritual traditions.', answer: 'This claim is false',
                  options: ['This claim is false', 'one school copied the other directly'],
                  hint: 'Review c7_hist_ch03_004 (Kushana Empire) and c7_hist_ch03_005 (Indo-Greek Kingdoms) to understand.',
                  misconception: 'Students often believe that the Gandhara and Mathura schools were competing political factions rather than regional artistic styles,.' }
          ],
            remediations: { 'the-gandhara-and-mathura-schools': { steps: ['To fix this misconception, compare two images side by side: a Greco-Roman bust and a Mathura Yaksha sculpture from.', 'Point out that Mathura art used local red sandstone because quarries were nearby in Sikri, and its heavy-set, powerful.', 'Explain that artists in different regions simply used the artistic tools and materials most familiar to them while.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
