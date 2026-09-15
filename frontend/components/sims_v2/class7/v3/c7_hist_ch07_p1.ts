import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch07_p1: SimDef = {
    id: 'v3_c7_hist_ch07_p1',
    title: 'Turning Tides: 11th and 12th Centuries · Part 1/2',
    subtitle: 'Covers the broad socio-political and military transitions occurring across the Indian.',
    classLevel: 7, subject: 'history', topic: 'Turning Tides: 11th and 12th Centuries · Part 1/2',
    chapters: ['c7_hist_ch07'],
    nodeIds: ['c7_hist_ch07_001', 'c7_hist_ch07_002', 'c7_hist_ch07_003', 'c7_hist_ch07_004', 'c7_hist_ch07_005', 'c7_hist_ch07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking through the ruins of an ancient fort or temple built around the 11th or 12th century, such.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Mahmud of Ghazni raided rich temple cities again and again yet never stayed to rule — while a century later Muhammad Ghuri came and founded a lasting power. What changed between the raider and the conqueror?',
        options: ['Ghazni wanted plunder; Ghuri wanted territory — and rival regional kingdoms, too divided to unite, could not stop his fast-moving cavalry', 'Ghazni was scared of elephants; Ghuri was not', 'Nothing changed — both came to conquer', 'Ghuri arrived with a larger navy'],
        answer: 'Ghazni wanted plunder; Ghuri wanted territory — and rival regional kingdoms, too divided to unite, could not stop his fast-moving cavalry',
        hook: 'These centuries were not simply doom. While frontier cities suffered raids, interior kingdoms raised magnificent temples and thriving markets — and slow war elephants met their match in swift horse archers.',
    },
    teaching: [
        { title: '11th-12th Centuries: A Period of Transition', text: 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of political, military, and cultural transition, characterized by the decline of older regional empires, the rise.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compare the two northwestern invaders — their goals, their tactics, their aftermath — and explain how political rivalry among regional kingdoms left the door open.',
        labels: ['11th-12th Centuries: A Period', 'Turkic Invasions: Mahmud', 'Rajput Kingdoms: Resistance', 'Delhi Sultanate: Foundation', 'Economic Systems in 11th-12th', 'Military Organisation of New'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch07_001', title: '11th-12th Centuries: A Period of Transition',
          caseStudy: { intro: 'Imagine walking through the ruins of an ancient fort or temple built around the 11th or 12th century, such as those in parts of Rajasthan or Madhya Pradesh.',
            decisions: [{ prompt: 'Which two major external leaders launched prominent incursions into the Indian subcontinent from the northwest during the 11th and 12th.', options: [
                { text: 'Mahmud of Ghazni in the 11th century and Muhammad Ghuri in the 12th century', outcome: 'Mahmud of Ghazni in the 11th century and Muhammad Ghuri in the 12th century.' },
                { text: 'Babur or Aurangzeb', outcome: 'Not quite — Students often think that the 11th and 12th centuries mark an overnight, sudden collapse of Indian.', reveals: 'the-11th-and-12th-centuries' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_002', title: 'Turkic Invasions: Mahmud of Ghazni and Muhammad Ghori',
          caseStudy: { intro: 'Imagine visiting a magnificent ancient temple like Somnath in Gujarat and wondering how powerful raiding armies managed to cross mountain passes from distant.',
            decisions: [{ prompt: 'What was the primary motive of Mahmud of Ghazni\'s military expeditions into the Indian subcontinent during the 11th century?', options: [
                { text: 'Mahmud of Ghazni\'s primary motive was to accumulate immense wealth by plundering wealthy', outcome: 'Mahmud of Ghazni\'s primary motive was to accumulate immense wealth by plundering wealthy temple.' },
                { text: 'Mahmud stayed in India and ruled Delhi, confusing him with later Delhi Sultans', outcome: 'Not quite — Students often think that Mahmud of Ghazni and Muhammad Ghori were rulers of the same dynasty with.', reveals: 'mahmud-of-ghazni-and-muhammad' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_003', title: 'Rajput Kingdoms: Resistance and Governance',
          caseStudy: { intro: 'Imagine visiting a massive, imposing hill fort in Rajasthan, like Chittorgarh or Mehrangarh, and wondering how these grand stone structures were defended.',
            decisions: [{ prompt: 'What title was commonly used by local chiefs or powerful warriors who later assumed independent authority and established Rajput kingdoms.', options: [
                { text: '*Samanta* or *Mahasamanta* (subordinate rulers or great lords)', outcome: 'The correct answer is *Samanta* or *Mahasamanta* (subordinate rulers or great lords).' },
                { text: 'Emperor', outcome: 'Not quite — Students often assume that all Rajput kingdoms formed a single, unified empire under one emperor.', reveals: 'all-rajput-kingdoms-formed-a' },
                { text: 'Sultan', outcome: 'Not quite — Students often assume that all Rajput kingdoms formed a single, unified empire under one emperor.', reveals: 'all-rajput-kingdoms-formed-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_004', title: 'Delhi Sultanate: Foundation and Early Rulers',
          caseStudy: { intro: 'Have you ever visited the Qutb Minar complex in Delhi and wondered who built those towering monuments and why they chose Delhi as their capital?',
            decisions: [{ prompt: 'Who was the military commander and former slave who established the Slave (Mamluk) Dynasty and laid the foundation of the Delhi Sultanate.', options: [
                { text: 'Qutb-ud-din Aibak founded the Delhi Sultanate in 1206 CE after the death of Muhammad Ghori', outcome: 'Qutb-ud-din Aibak founded the Delhi Sultanate in 1206 CE after the death of Muhammad Ghori.' },
                { text: 'Ala-ud-din Khilji', outcome: 'Not quite — Students often think that the Delhi Sultanate was a single, stable empire from 1206 CE onwards.', reveals: 'the-delhi-sultanate-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two friends argue about the 12th-century battles of Tarain. One says: \'The Indian kings lost only because their soldiers were cowards — elephants and huge armies should have crushed any invader on open ground.\'',
            decisions: [{ prompt: 'What actually explains the outcome?', options: [
                { text: 'It was a tactical mismatch, not cowardice: Turkic horse archers struck fast, flanked and withdrew before slow infantry could respond, while war elephants could panic when hurt — and rival regional kingdoms, divided by feuds, never fielded a united defence.', outcome: 'This identifies the real mechanisms — cavalry mobility against elephant-heavy formations, plus political disunity — rather than blaming morale.' },
                { text: 'The friend is right — with bigger armies and more elephants, bravery alone decides battles, so losing can only mean cowardice.', outcome: 'Size and courage cannot offset mobility; fast cavalry dictated the pace of battle and fragmented kingdoms could not coordinate, whatever their soldiers\' bravery.', reveals: 'battles-are-bravery' },
                { text: 'The invasions mattered because Mahmud of Ghazni settled down and ruled the Gangetic plains like a Mughal emperor.', outcome: 'Mahmud\'s raids a century earlier aimed at plundering temple wealth, not permanent rule; conflating raiding with empire-building misreads the period.', reveals: 'raiders-were-rulers' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_006', title: 'The bigger picture',
          caseStudy: { intro: 'A raider takes the treasure and leaves; a conqueror takes the throne. Divided rivals learned the difference at Tarain.',
            decisions: [{ prompt: 'What comes next? Turning Tides: 11th and 12th Centuries · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Turning Tides: 11th and 12th Centuries · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch07_001', difficulty: 'standard',
          question: 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period.',
          hint: 'Review c6_history_ch06_019 on New Kingdoms and Dynasties to recall how regional rulers.',
          misconception: 'Students often think that the 11th and 12th centuries mark an overnight, sudden collapse of Indian civilization due.',
          parts: [
                { id: 'a', prompt: 'Which two major external leaders launched prominent incursions into the Indian subcontinent from the northwest during the 11th and 12th centuries respectively?', answer: 'Mahmud of Ghazni in the 11th century and Muhammad Ghuri in the 12th century',
                  options: ['Mahmud of Ghazni in the 11th century and Muhammad Ghuri in the 12th century', 'Babur or Aurangzeb'],
                  hint: 'Review c6_history_ch06_019 on New Kingdoms and Dynasties to recall how regional rulers established.',
                  misconception: 'Students often think that the 11th and 12th centuries mark an overnight, sudden collapse of Indian civilization due entirely to foreign.' },
                { id: 'b', prompt: 'Why did the political structure of the Indian subcontinent in the 11th and 12th centuries favor decentralized regional kingdoms rather than a single unified.', answer: 'Political authority became fragmented',
                  options: ['Political authority became fragmented', 'that all people rejected monarchy'],
                  hint: 'Review c6_history_ch06_019 on New Kingdoms and Dynasties to recall how regional rulers established.',
                  misconception: 'Students often think that the 11th and 12th centuries mark an overnight, sudden collapse of Indian civilization due entirely to foreign.' }
          ],
            remediations: { 'the-11th-and-12th-centuries': { steps: ['To fix this misconception, guide the student to examine a map of Mahmud of Ghazni\'s raids alongside a map of trade.', 'Show them that while northern frontier cities faced devastating raids, regional kingdoms deep in the interior were.', 'Emphasize that the 11th and 12th centuries were characterized by vibrant regional resilience and internal.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_002', difficulty: 'standard',
          question: 'The Turkic invasions of India in the 11th and 12th centuries, led primarily.',
          hint: 'Review the political map of post-Gupta regional kingdoms and note how rivalries among.',
          misconception: 'Students often think that Mahmud of Ghazni and Muhammad Ghori were rulers of the same dynasty with the exact same goal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of',
                  options: ['The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'This topic explores the rise, political organization, military resistance, and governance', 'The foundation of the Delhi Sultanate (starting in 1206 CE) marks the period when Turkic'],
                  hint: 'Review the political map of post-Gupta regional kingdoms and note how rivalries among local rulers.',
                  misconception: 'Students often think that Mahmud of Ghazni and Muhammad Ghori were rulers of the same dynasty with the exact same goal of founding a Muslim.' }
          ],
            remediations: { 'mahmud-of-ghazni-and-muhammad': { steps: ['To fix this misconception, use a timeline and map comparison exercise: 1.', 'Trace Mahmud\'s 17 raids on a map, highlighting how every campaign line returns to Ghazni in Afghanistan.', 'Trace Ghori\'s campaigns, highlighting how he left behind generals like Qutb-ud-din Aibak to govern conquered.', 'Compare their ultimate goals: Mahmud wanted portable wealth (gold, jewels); Ghori wanted permanent land, sovereignty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that Mahmud of Ghazni and Muhammad Ghori were rulers of the same dynasty with the exact same goal.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Mahmud of Ghazni was solely a religious zealot who attacked India only to destroy religious shrines." Is this interpretation fully.', answer: 'This interpretation is incomplete',
                  options: ['This interpretation is incomplete', 'Mahmud stayed in India and ruled Delhi, confusing him with later Delhi Sultans'],
                  hint: 'Review the political map of post-Gupta regional kingdoms and note how rivalries among local rulers.',
                  misconception: 'Students often think that Mahmud of Ghazni and Muhammad Ghori were rulers of the same dynasty with the exact same goal of founding a Muslim.' }
          ],
            remediations: { 'mahmud-of-ghazni-and-muhammad': { steps: ['To fix this misconception, use a timeline and map comparison exercise: 1.', 'Trace Mahmud\'s 17 raids on a map, highlighting how every campaign line returns to Ghazni in Afghanistan.', 'Trace Ghori\'s campaigns, highlighting how he left behind generals like Qutb-ud-din Aibak to govern conquered.', 'Compare their ultimate goals: Mahmud wanted portable wealth (gold, jewels); Ghori wanted permanent land, sovereignty.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_003', difficulty: 'standard',
          question: 'This topic explores the rise, political organization, military resistance, and.',
          hint: 'Review c6_history_ch06_019 to remember how regional kingdoms and new dynasties emerged.',
          misconception: 'Students often assume that all Rajput kingdoms formed a single, unified empire under one emperor, much like the Mauryas.',
          parts: [
                { id: 'a', prompt: 'What title was commonly used by local chiefs or powerful warriors who later assumed independent authority and established Rajput kingdoms during the 11th and.', answer: '*Samanta* or *Mahasamanta* (subordinate rulers or great lords)',
                  options: ['*Samanta* or *Mahasamanta* (subordinate rulers or great lords)', 'Emperor', 'Sultan', 'India versus invaders'],
                  hint: 'Review c6_history_ch06_019 to remember how regional kingdoms and new dynasties emerged after the.',
                  misconception: 'Students often assume that all Rajput kingdoms formed a single, unified empire under one emperor, much like the Mauryas or Guptas, and.' }
          ],
            remediations: { 'all-rajput-kingdoms-formed-a': { steps: ['To fix this misunderstanding, have the student examine a historical map of 12th-century northern India showing multiple.', 'Ask them to trace the borders of the Chauhans, Chandellas, and Solankis, and note how their territories bordered and.', 'Conclude by reading a brief historical excerpt highlighting a conflict between two neighboring Rajput clans to prove.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_004', difficulty: 'standard',
          question: 'The foundation of the Delhi Sultanate (starting in 1206 CE) marks the period.',
          hint: 'Review c7_hist_ch07_002 to re-examine how Muhammad Ghori\'s campaigns differed from Mahmud.',
          misconception: 'Students often think that the Delhi Sultanate was a single, stable empire from 1206 CE onwards, missing the reality.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The foundation of the Delhi Sultanate (starting in 1206 CE) marks the period when Turkic',
                  options: ['The foundation of the Delhi Sultanate (starting in 1206 CE) marks the period when Turkic', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review c7_hist_ch07_002 to re-examine how Muhammad Ghori\'s campaigns differed from Mahmud.',
                  misconception: 'Students often think that the Delhi Sultanate was a single, stable empire from 1206 CE onwards, missing the reality that early rulers spent.' }
          ],
            remediations: { 'the-delhi-sultanate-was-a': { steps: ['Review the political map of 13th-century northern India alongside the chronology of early sultans.', 'Step-by-step: 1) Identify that Aibak died unexpectedly playing polo in 1210 CE; 2) Look at how Iltutmish faced rival.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_005', difficulty: 'standard',
          question: 'This topic explores the agrarian structures, trade networks, merchant guilds.',
          hint: 'Review c7_hist_ch07_001 to understand the political landscape of regional kingdoms before.',
          misconception: 'Students often assume that the 11th and 12th centuries were a time of total economic stagnation and declining trade.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the agrarian structures, trade networks, merchant guilds (such as',
                  options: ['This topic explores the agrarian structures, trade networks, merchant guilds (such as', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review c7_hist_ch07_001 to understand the political landscape of regional kingdoms before studying.',
                  misconception: 'Students often assume that the 11th and 12th centuries were a time of total economic stagnation and declining trade because of political.' }
          ],
            remediations: { 'the-11th-and-12th-centuries': { steps: ['To fix this misconception, guide the student to examine copper-plate inscriptions and temple wall carvings from South.', 'Have them map out trade routes connecting coastal ports like Calicut or Bharuch to inland market centers.', 'Show them that merchant guilds expanded their operations precisely during this era of political division by forming.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_006', difficulty: 'standard',
          question: 'The military organisation of new powers in the 11th and 12th centuries refers.',
          hint: 'Review the methods of troop recruitment and horse trade discussed in c7_hist_ch07_002 and.',
          misconception: 'Students often think that armies in the 11th and 12th centuries were identical to modern national armies with uniform.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The military organisation of new powers in the 11th and 12th centuries refers to the',
                  options: ['The military organisation of new powers in the 11th and 12th centuries refers to the', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review the methods of troop recruitment and horse trade discussed in c7_hist_ch07_002 and.',
                  misconception: 'Students often think that armies in the 11th and 12th centuries were identical to modern national armies with uniform salaries and.' }
          ],
            remediations: { 'armies-in-the-11th-and': { steps: ['To fix this, guide the student to examine a medieval grant or contemporary account showing who paid the soldiers.', 'Explain that soldiers swore loyalty to their immediate commander or clan leader rather than directly to a distant.', 'Compare this to how regional lords contributed troops in earlier periods like the Gupta empire.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
