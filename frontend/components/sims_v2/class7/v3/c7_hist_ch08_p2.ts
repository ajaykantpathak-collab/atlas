import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch08_p2: SimDef = {
    id: 'v3_c7_hist_ch08_p2',
    title: 'India, a Home to Many · Part 2/2',
    subtitle: 'Covers the social and cultural mechanisms of adaptation and integration experienced.',
    classLevel: 7, subject: 'history', topic: 'India, a Home to Many · Part 2/2',
    chapters: ['c7_hist_ch08'],
    nodeIds: ['c7_hist_ch08_007', 'c7_hist_ch08_008', 'c7_hist_ch08_009', 'c7_hist_ch08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you visit a bustling market in a historic Indian city like Kochi, Delhi, or Mumbai, you notice how.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Centuries ago, families fleeing persecution sailed to the Malabar coast — and local rulers let them settle, trade, and worship in peace. Why would kings welcome complete strangers?',
        options: ['Welcoming migrants was smart statecraft — traders and skilled settlers enriched the economy, and a long ethos of tolerance let newcomers thrive', 'The rulers were tricked and could not stop them', 'Only because the migrants promised to give up all their customs', 'They were not welcomed — every arrival was an invasion'],
        answer: 'Welcoming migrants was smart statecraft — traders and skilled settlers enriched the economy, and a long ethos of tolerance let newcomers thrive',
        hook: 'Not every outsider arrived with an army. Most came as traders or refugees through sea routes and mountain passes — and migration flowed both ways: newcomers adopted local language and food while adding their own crafts, faiths, and flavours to the mosaic.',
    },
    teaching: [
        { title: 'Assimilation: How Foreign Communities Adapted to Indian Society', text: 'Assimilation refers to the historical process by which foreign communities migrating into Indian society gradually adopted local languages, customs, and social practices while retaining elements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort the arrivals — merchant ships, refugee families, conquering armies — then show how geography, from the Khyber Pass to the monsoon sea routes, made India both reachable and welcoming.',
        labels: ['Assimilation: How Foreign Communities', 'Cultural Contributions of Migrant', 'Vasudhaiva Kutumbakam: The World', 'India\'s Tradition of Tolerance'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c7_hist_ch08_008', title: 'Identify each idea',
          dissect: { specimen: 'India, a Home to Many · Part 2/2', spots: [
            { id: 's1', label: 'Cultural Contributions of Migrant Communities', prompt: 'Which idea is this? — The enduring contributions made by diverse migrant and refugee communities—such.', answer: 'Cultural Contributions of Migrant Communities', options: ['Cultural Contributions of Migrant Communities', 'Vasudhaiva Kutumbakam The World is One Family', 'Indias Tradition of Tolerance and Pluralism'] },
            { id: 's2', label: 'Vasudhaiva Kutumbakam The World is One Family', prompt: 'Which idea is this? — The ancient Indian philosophical concept of "Vasudhaiva Kutumbakam," meaning "the world.', answer: 'Vasudhaiva Kutumbakam The World is One Family', options: ['Vasudhaiva Kutumbakam The World is One Family', 'Cultural Contributions of Migrant Communities', 'Indias Tradition of Tolerance and Pluralism'] },
            { id: 's3', label: 'Indias Tradition of Tolerance and Pluralism', prompt: 'Which idea is this? — The long-standing civilizational ethos of India that embraces diversity, welcomes diverse.', answer: 'Indias Tradition of Tolerance and Pluralism', options: ['Indias Tradition of Tolerance and Pluralism', 'Cultural Contributions of Migrant Communities', 'Vasudhaiva Kutumbakam The World is One Family'] }
          ] } },
        { type: 'case', nodeId: 'c7_hist_ch08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a discussion on India\'s past, Rehan says: \'Everyone who ever came to India from outside arrived as an invader — foreigners always came to conquer.\' A classmate mentions Parsis, Jewish traders on the Malabar coast and Arab merchants.',
            decisions: [{ prompt: 'How should the group evaluate Rehan\'s claim?', options: [
                { text: 'Reject it: most arrivals were traders drawn by monsoon sea routes and rich markets, or refugees fleeing persecution — like the Zoroastrians — whom local rulers welcomed with land and freedoms; they settled, married locally and enriched India\'s culture without conquering anyone.', outcome: 'This separates peaceful mercantile and refugee migration from military invasion, matching the historical record of plural, welcomed communities.' },
                { text: 'Rehan is right — crossing the sea or a mountain pass to reach India is itself an act of conquest, whatever the newcomers intended.', outcome: 'Intent and record matter: merchant guilds and refugee groups arrived with royal permission and integrated into local economies, leaving no conquest behind.', reveals: 'all-arrivals-invaded' },
                { text: 'The migrants did come peacefully, but they had to erase their own languages, foods and faiths completely to be accepted.', outcome: 'Integration was two-way synthesis, not erasure: migrants kept distinct practices while adopting local customs, adding crafts, cuisines and traditions to the mosaic.', reveals: 'migrants-erased-heritage' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch08_010', title: 'You made it',
          caseStudy: { intro: 'India was never one thread — it is a fabric woven from many arrivals. Those who came for shelter stayed to become part of the pattern.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch08_007', difficulty: 'standard',
          question: 'Assimilation refers to the historical process by which foreign communities.',
          hint: 'Review c7_hist_ch08_001 to recall why diverse groups traveled to the Indian subcontinent.',
          misconception: 'Students often think that assimilation means foreign communities completely threw away their ancestral traditions the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Assimilation refers to the historical process by',
                  options: ['Assimilation refers to the historical process by', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review c7_hist_ch08_001 to recall why diverse groups traveled to the Indian subcontinent.',
                  misconception: 'Students often think that assimilation means foreign communities completely threw away their ancestral traditions the moment they landed.' }
          ],
            remediations: { 'assimilation-means-foreign-communities-completel': { steps: ['To fix this misconception, examine historical records of community interactions such as marriage alliances, local land.', 'Compare a specific immigrant community\'s traditional practices from their homeland with how they lived in India after.', 'Emphasize that integration is a spectrum where communities can be fiercely loyal to their spiritual roots while being.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_008', difficulty: 'standard',
          question: 'The enduring contributions made by diverse migrant and refugee communities—such.',
          hint: 'Review c7_hist_ch08_007 to understand the basic mechanisms of how foreign communities.',
          misconception: 'Students often believe that cultural contributions from migrant communities were forced upon the local population.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The enduring contributions made by diverse migrant and refugee communities—such as',
                  options: ['The enduring contributions made by diverse migrant and refugee communities—such as', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review c7_hist_ch08_007 to understand the basic mechanisms of how foreign communities adapted.',
                  misconception: 'Students often believe that cultural contributions from migrant communities were forced upon the local population by rulers, thinking that.' }
          ],
            remediations: { 'cultural-contributions-from-migrant-communities': { steps: ['To fix this misconception, examine a specific example of textile weaving or culinary evolution where local artisans and.', 'Compare local motifs with introduced patterns to show how neither completely replaced the other, but instead merged.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_009', difficulty: 'standard',
          question: 'The ancient Indian philosophical concept of "Vasudhaiva Kutumbakam," meaning.',
          hint: 'Review c7_hist_ch08_007 to understand the practical ways communities assimilated before.',
          misconception: 'Students often think that *Vasudhaiva Kutumbakam* meant that ancient Indian society had no social conflicts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The ancient Indian philosophical concept of "Vasudhaiva Kutumbakam," meaning "the world',
                  options: ['The ancient Indian philosophical concept of "Vasudhaiva Kutumbakam," meaning "the world', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review c7_hist_ch08_007 to understand the practical ways communities assimilated before studying.',
                  misconception: 'Students often think that *Vasudhaiva Kutumbakam* meant that ancient Indian society had no social conflicts or prejudices, imagining.' }
          ],
            remediations: { 'vasudhaiva-kutumbakam-meant-that-ancient': { steps: ['To fix this misconception, compare the philosophical texts promoting universal brotherhood with primary sources.', 'Guide the student to see that while the ideal of *Vasudhaiva Kutumbakam* provided a moral framework for welcoming.', 'Emphasize that ideals guide historical action without eliminating human flaws or structural inequalities.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_010', difficulty: 'standard',
          question: 'The long-standing civilizational ethos of India that embraces diversity.',
          hint: 'Review c7_hist_ch08_008 on cultural contributions and c7_hist_ch08_009 on Vasudhaiva.',
          misconception: 'Students often think that pluralism and tolerance in India mean people lived completely separate lives without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The long-standing civilizational ethos of India that embraces diversity, welcomes diverse',
                  options: ['The long-standing civilizational ethos of India that embraces diversity, welcomes diverse', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review c7_hist_ch08_008 on cultural contributions and c7_hist_ch08_009 on Vasudhaiva Kutumbakam.',
                  misconception: 'Students often think that pluralism and tolerance in India mean people lived completely separate lives without interacting, or conversely.' }
          ],
            remediations: { 'pluralism-and-tolerance-in-india': { steps: ['To fix this misconception, examine primary sources such as medieval miniature paintings showing Hindu and Muslim.', 'Guide the student to see that distinct identities (like wearing specific attire or following specific rituals).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
