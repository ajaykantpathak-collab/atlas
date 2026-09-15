import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch08_p1: SimDef = {
    id: 'v3_c7_hist_ch08_p1',
    title: 'India, a Home to Many · Part 1/2',
    subtitle: 'Covers the broad historical context of migration into the Indian subcontinent from.',
    classLevel: 7, subject: 'history', topic: 'India, a Home to Many · Part 1/2',
    chapters: ['c7_hist_ch08'],
    nodeIds: ['c7_hist_ch08_001', 'c7_hist_ch08_002', 'c7_hist_ch08_003', 'c7_hist_ch08_004', 'c7_hist_ch08_005', 'c7_hist_ch08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'When you walk through your neighborhood or look at your school, do you notice people who speak different.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Centuries ago, families fleeing persecution sailed to the Malabar coast — and local rulers let them settle, trade, and worship in peace. Why would kings welcome complete strangers?',
        options: ['Welcoming migrants was smart statecraft — traders and skilled settlers enriched the economy, and a long ethos of tolerance let newcomers thrive', 'The rulers were tricked and could not stop them', 'Only because the migrants promised to give up all their customs', 'They were not welcomed — every arrival was an invasion'],
        answer: 'Welcoming migrants was smart statecraft — traders and skilled settlers enriched the economy, and a long ethos of tolerance let newcomers thrive',
        hook: 'Not every outsider arrived with an army. Most came as traders or refugees through sea routes and mountain passes — and migration flowed both ways: newcomers adopted local language and food while adding their own crafts, faiths, and flavours to the mosaic.',
    },
    teaching: [
        { title: 'India as a Home for Migrants: Historical Context', text: 'The historical context of India as a home for migrants refers to the subcontinent\'s millennia-long tradition of welcoming, absorbing, and integrating diverse foreign populations, traders, refugees.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch08_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sort the arrivals — merchant ships, refugee families, conquering armies — then show how geography, from the Khyber Pass to the monsoon sea routes, made India both reachable and welcoming.',
        labels: ['India as a Home', 'Reasons People Sought Refuge', 'Parsis (Zoroastrians): Migration', 'Jewish Communities in India', 'Christian Communities: Early Arrival', 'Muslim Communities: Integration'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch08_001', title: 'India as a Home for Migrants: Historical Context',
          caseStudy: { intro: 'When you walk through your neighborhood or look at your school, do you notice people who speak different languages, celebrate unique festivals, or eat diverse.',
            decisions: [{ prompt: 'What geographical features of the Indian subcontinent naturally encouraged both maritime and land-based migration and trade over thousands.', options: [
                { text: 'the vast coastline along the Arabian Sea and Indian Ocean, accessible mountain passes in', outcome: 'The correct answer highlights the vast coastline along the Arabian Sea and Indian Ocean, accessible.' },
                { text: 'India was completely isolated by mountains', outcome: 'Not quite — Students often believe that all people who arrived from outside India in ancient and medieval times.', reveals: 'all-people-who-arrived-from' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a discussion on India\'s past, Rehan says: \'Everyone who ever came to India from outside arrived as an invader — foreigners always came to conquer.\' A classmate mentions Parsis, Jewish traders on the Malabar coast and Arab merchants.',
            decisions: [{ prompt: 'How should the group evaluate Rehan\'s claim?', options: [
                { text: 'Reject it: most arrivals were traders drawn by monsoon sea routes and rich markets, or refugees fleeing persecution — like the Zoroastrians — whom local rulers welcomed with land and freedoms; they settled, married locally and enriched India\'s culture without conquering anyone.', outcome: 'This separates peaceful mercantile and refugee migration from military invasion, matching the historical record of plural, welcomed communities.' },
                { text: 'Rehan is right — crossing the sea or a mountain pass to reach India is itself an act of conquest, whatever the newcomers intended.', outcome: 'Intent and record matter: merchant guilds and refugee groups arrived with royal permission and integrated into local economies, leaving no conquest behind.', reveals: 'all-arrivals-invaded' },
                { text: 'The migrants did come peacefully, but they had to erase their own languages, foods and faiths completely to be accepted.', outcome: 'Integration was two-way synthesis, not erasure: migrants kept distinct practices while adopting local customs, adding crafts, cuisines and traditions to the mosaic.', reveals: 'migrants-erased-heritage' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch08_006', title: 'The bigger picture',
          caseStudy: { intro: 'India was never one thread — it is a fabric woven from many arrivals. Those who came for shelter stayed to become part of the pattern.',
            decisions: [{ prompt: 'What comes next? India, a Home to Many · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — India, a Home to Many · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch08_001', difficulty: 'standard',
          question: 'The historical context of India as a home for migrants refers to the.',
          hint: 'Review the trade routes and regional kingdom interactions covered in Class 6 medieval.',
          misconception: 'Students often believe that all people who arrived from outside India in ancient and medieval times were violent.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The historical context of India as a home for migrants refers to the subcontinent\'s',
                  options: ['The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical', 'The history and settlement of Jewish communities in India encompasses the arrival,'],
                  hint: 'Review the trade routes and regional kingdom interactions covered in Class 6 medieval history.',
                  misconception: 'Students often believe that all people who arrived from outside India in ancient and medieval times were violent conquerors who forced.' }
          ],
            remediations: { 'all-people-who-arrived-from': { steps: ['To fix this misconception, guide the student to examine the nature of different arrivals by contrasting the records.', 'Use a comparative chart separating \'Traders and Refugees\' from \'Conquerors\' to show that groups like Zoroastrians and.', 'Emphasize that Indian history encompasses centuries of peaceful cultural exchange alongside political conflicts.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_002', difficulty: 'standard',
          question: 'The socio-political and religious conditions across ancient and medieval.',
          hint: 'Review the basic concepts of migration from geography and revisit how medieval kingdoms.',
          misconception: 'Students often think that people migrated to India exclusively to conquer territory and establish political empires.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The socio-political and religious conditions across ancient and medieval Eurasia that',
                  options: ['The socio-political and religious conditions across ancient and medieval Eurasia that', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical', 'The history and settlement of Jewish communities in India encompasses the arrival,'],
                  hint: 'Review the basic concepts of migration from geography and revisit how medieval kingdoms interacted.',
                  misconception: 'Students often think that people migrated to India exclusively to conquer territory and establish political empires, failing to recognize.' }
          ],
            remediations: { 'people-migrated-to-india-exclusively': { steps: ['To correct this misunderstanding, guide the student to examine specific primary sources and arrival narratives, such.', 'Have them compare the military motives of conquerors with the peaceful, refugee status of communities who sought.', 'Ask the student to list two groups that came seeking religious freedom versus two groups that came for political.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_003', difficulty: 'standard',
          question: 'The migration and settlement of Parsis (Zoroastrians) in India refers to the.',
          hint: 'Review the general reasons why people sought refuge in India from node c7_hist_ch08_002.',
          misconception: 'Students often confuse the Parsi migration with later mercantile migrations or British-era arrivals, assuming they came.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical',
                  options: ['The migration and settlement of Parsis (Zoroastrians) in India refers to the historical', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The history and settlement of Jewish communities in India encompasses the arrival,'],
                  hint: 'Review the general reasons why people sought refuge in India from node c7_hist_ch08_002 before.',
                  misconception: 'Students often confuse the Parsi migration with later mercantile migrations or British-era arrivals, assuming they came for trade under.' }
          ],
            remediations: { 'students-often-confuse-the-parsi': { steps: ['To fix this error, guide the student to examine a medieval timeline comparing the 8th–10th century CE Islamic conquest.', 'Point out that early Parsis were farmers, weavers, and refugees, not colonial traders, and worked under the protection.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_004', difficulty: 'standard',
          question: 'The history and settlement of Jewish communities in India encompasses the.',
          hint: 'Review c7_hist_ch08_001 to understand India\'s historical role as a sanctuary for diverse.',
          misconception: 'Students often believe that all Jewish people in India arrived at the exact same time during the British colonial.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The history and settlement of Jewish communities in India encompasses the arrival,',
                  options: ['The history and settlement of Jewish communities in India encompasses the arrival,', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review c7_hist_ch08_001 to understand India\'s historical role as a sanctuary for diverse global.',
                  misconception: 'Students often believe that all Jewish people in India arrived at the exact same time during the British colonial period, similar.' }
          ],
            remediations: { 'all-jewish-people-in-india': { steps: ['To fix this misconception, map out a chronological timeline comparing ancient maritime trade routes of the 1st.', 'Highlight the copper-plate grants of Kerala and Marathi-speaking Bene Israel communities to show deep indigenous roots.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_005', difficulty: 'standard',
          question: 'This topic explores the early arrival of Christianity in India, traditionally.',
          hint: 'Review the geography of the Malabar Coast and ancient trade routes connecting Rome.',
          misconception: 'Students often assume that Christianity in India was entirely introduced by Portuguese and British colonizers in the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the early arrival of Christianity in India, traditionally associated',
                  options: ['This topic explores the early arrival of Christianity in India, traditionally associated', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review the geography of the Malabar Coast and ancient trade routes connecting Rome, Persia, and.',
                  misconception: 'Students often assume that Christianity in India was entirely introduced by Portuguese and British colonizers in the modern era, completely.' }
          ],
            remediations: { 'christianity-in-india-was-entirely': { steps: ['To fix this misconception, review a map of ancient Indian Ocean trade routes alongside the timeline of world religions.', 'Explain that long before Vasco da Gama landed in Calicut in 1498, flourishing Christian, Jewish, and Muslim trading.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch08_006', difficulty: 'standard',
          question: 'The integration and contribution of Muslim communities in the Indian.',
          hint: 'Review c6_history_ch06_017 on the Sufi movement and c6_history_ch09_036 on Mughal art and.',
          misconception: 'Students often think that Muslim communities remained entirely separate foreign groups in India, overlooking the deep.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The integration and contribution of Muslim communities in the Indian subcontinent refers',
                  options: ['The integration and contribution of Muslim communities in the Indian subcontinent refers', 'The historical context of India as a home for migrants refers to the subcontinent\'s', 'The socio-political and religious conditions across ancient and medieval Eurasia that', 'The migration and settlement of Parsis (Zoroastrians) in India refers to the historical'],
                  hint: 'Review c6_history_ch06_017 on the Sufi movement and c6_history_ch09_036 on Mughal art and.',
                  misconception: 'Students often think that Muslim communities remained entirely separate foreign groups in India, overlooking the deep localization.' }
          ],
            remediations: { 'muslim-communities-remained-entirely-separate': { steps: ['Compare the clothing worn by courtiers in Persian paintings with those in Indian Mughal paintings to spot local fabric.', 'Trace the evolution of Hindustani classical music and instruments.', 'Conclude by showing how communities shared local resources, festivals, and idioms, proving that integration was deep.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
