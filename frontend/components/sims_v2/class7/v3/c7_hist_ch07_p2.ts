import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch07_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch07_p2: SimDef = {
    id: 'v3_c7_hist_ch07_p2',
    title: 'Turning Tides: 11th and 12th Centuries · Part 2/2',
    subtitle: 'Covers the structural governance, revenue administration, and military organization.',
    classLevel: 7, subject: 'history', topic: 'Turning Tides: 11th and 12th Centuries · Part 2/2',
    chapters: ['c7_hist_ch07'],
    nodeIds: ['c7_hist_ch07_007', 'c7_hist_ch07_008', 'c7_hist_ch07_009', 'c7_hist_ch07_010', 'c7_hist_ch07_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine visiting a massive medieval fort like Qutb Minar or Tughlaqabad in Delhi and wondering how an emperor.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Mahmud of Ghazni raided rich temple cities again and again yet never stayed to rule — while a century later Muhammad Ghuri came and founded a lasting power. What changed between the raider and the conqueror?',
        options: ['Ghazni wanted plunder; Ghuri wanted territory — and rival regional kingdoms, too divided to unite, could not stop his fast-moving cavalry', 'Ghazni was scared of elephants; Ghuri was not', 'Nothing changed — both came to conquer', 'Ghuri arrived with a larger navy'],
        answer: 'Ghazni wanted plunder; Ghuri wanted territory — and rival regional kingdoms, too divided to unite, could not stop his fast-moving cavalry',
        hook: 'These centuries were not simply doom. While frontier cities suffered raids, interior kingdoms raised magnificent temples and thriving markets — and slow war elephants met their match in swift horse archers.',
    },
    teaching: [
        { title: 'Administrative Systems Under the Delhi Sultanate', text: 'The administrative systems under the Delhi Sultanate refer to the centralized political structures, revenue collection methods (such as *iqta* system), and military governance established by Turkic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compare the two northwestern invaders — their goals, their tactics, their aftermath — and explain how political rivalry among regional kingdoms left the door open.',
        labels: ['Administrative Systems Under', 'Art and Architecture: Indo-Islamic', 'Literature and Science', 'Cultural Interactions: Indian', 'Impact of Invasions'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch07_009', title: 'Literature and Science in 11th-12th Centuries',
          caseStudy: { intro: 'When you visit an old temple or read stories from your region, do you ever wonder how our local languages and traditional calendars were shaped centuries ago?',
            decisions: [{ prompt: 'What was the primary language used for official court inscriptions and classical poetry before the 11th century, which gradually shared.', options: [
                { text: 'Sanskrit was the primary language used for official court inscriptions and classical', outcome: 'Sanskrit was the primary language used for official court inscriptions and classical literature.' },
                { text: 'English', outcome: 'Not quite — Students often assume that the 11th and 12th centuries were an era of total cultural stagnation due.', reveals: 'the-11th-and-12th-centuries' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two friends argue about the 12th-century battles of Tarain. One says: \'The Indian kings lost only because their soldiers were cowards — elephants and huge armies should have crushed any invader on open ground.\'',
            decisions: [{ prompt: 'What actually explains the outcome?', options: [
                { text: 'It was a tactical mismatch, not cowardice: Turkic horse archers struck fast, flanked and withdrew before slow infantry could respond, while war elephants could panic when hurt — and rival regional kingdoms, divided by feuds, never fielded a united defence.', outcome: 'This identifies the real mechanisms — cavalry mobility against elephant-heavy formations, plus political disunity — rather than blaming morale.' },
                { text: 'The friend is right — with bigger armies and more elephants, bravery alone decides battles, so losing can only mean cowardice.', outcome: 'Size and courage cannot offset mobility; fast cavalry dictated the pace of battle and fragmented kingdoms could not coordinate, whatever their soldiers\' bravery.', reveals: 'battles-are-bravery' },
                { text: 'The invasions mattered because Mahmud of Ghazni settled down and ruled the Gangetic plains like a Mughal emperor.', outcome: 'Mahmud\'s raids a century earlier aimed at plundering temple wealth, not permanent rule; conflating raiding with empire-building misreads the period.', reveals: 'raiders-were-rulers' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch07_011', title: 'You made it',
          caseStudy: { intro: 'A raider takes the treasure and leaves; a conqueror takes the throne. Divided rivals learned the difference at Tarain.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch07_007', difficulty: 'standard',
          question: 'The administrative systems under the Delhi Sultanate refer to the centralized.',
          hint: 'Review c7_hist_ch07_004 to reinforce how military conquest preceded the need for.',
          misconception: 'Students often believe that the Delhi Sultanate was governed as a uniform, tightly-knit bureaucratic empire similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The administrative systems under the Delhi Sultanate refer to the centralized political',
                  options: ['The administrative systems under the Delhi Sultanate refer to the centralized political', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review c7_hist_ch07_004 to reinforce how military conquest preceded the need for administrative.',
                  misconception: 'Students often believe that the Delhi Sultanate was governed as a uniform, tightly-knit bureaucratic empire similar to modern nation-states.' }
          ],
            remediations: { 'the-delhi-sultanate-was-governed': { steps: ['To fix this misconception, compare a map of direct imperial crown lands (*khalisa*) with *iqta* territories using.', 'Have the student trace how a village tax rupee moved from a local peasant through the village headman (*muqaddam*).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_008', difficulty: 'standard',
          question: 'The Indo-Islamic synthesis in art and architecture refers to the cultural and.',
          hint: 'Review c7_hist_ch07_004 to understand who the early rulers of the Delhi Sultanate were.',
          misconception: 'Students often assume that Indo-Islamic architecture appeared fully formed overnight with the arrival of Turkic rulers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indo-Islamic synthesis in art and architecture refers to the cultural and structural',
                  options: ['The Indo-Islamic synthesis in art and architecture refers to the cultural and structural', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review c7_hist_ch07_004 to understand who the early rulers of the Delhi Sultanate were and how.',
                  misconception: 'Students often assume that Indo-Islamic architecture appeared fully formed overnight with the arrival of Turkic rulers in the 12th century.' }
          ],
            remediations: { 'indo-islamic-architecture-appeared-fully': { steps: ['To fix this misconception, examine visual comparisons of early 13th-century monuments (such as the Qutb Minar complex).', 'Have the student trace how local artisans adapted their techniques to meet the new structural demands of Turkic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_009', difficulty: 'standard',
          question: 'This topic explores the flourishing of regional literature in vernacular.',
          hint: 'Review node c7_hist_ch07_001 to understand the political atmosphere before examining.',
          misconception: 'Students often assume that the 11th and 12th centuries were an era of total cultural stagnation due to political.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the flourishing of regional literature in vernacular languages and',
                  options: ['This topic explores the flourishing of regional literature in vernacular languages and', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review node c7_hist_ch07_001 to understand the political atmosphere before examining literary and.',
                  misconception: 'Students often assume that the 11th and 12th centuries were an era of total cultural stagnation due to political conflicts and invasions.' }
          ],
            remediations: { 'the-11th-and-12th-centuries': { steps: ['To fix this, guide the student to examine side-by-side examples of a 12th-century regional inscription and.', 'Show them how new scripts and local idioms emerged precisely when regional kingdoms were consolidating their rule.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_010', difficulty: 'standard',
          question: 'This topic explores the cultural interactions, synthesis, and exchanges between.',
          hint: 'Review c7_hist_ch07_001 to understand the political transition of the 11th and 12th.',
          misconception: 'Students often think that the arrival of Turkic rulers in the 11th and 12th centuries caused an immediate and total.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the cultural interactions, synthesis, and exchanges between Indian',
                  options: ['This topic explores the cultural interactions, synthesis, and exchanges between Indian', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review c7_hist_ch07_001 to understand the political transition of the 11th and 12th centuries.',
                  misconception: 'Students often think that the arrival of Turkic rulers in the 11th and 12th centuries caused an immediate and total replacement of Indian.' }
          ],
            remediations: { 'the-arrival-of-turkic-rulers': { steps: ['To fix this misconception, examine a specific architectural or linguistic artifact from the period—such as a building.', 'Explain step-by-step how local Indian artisans built these structures using their traditional skill sets, proving that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch07_011', difficulty: 'standard',
          question: 'This topic explores how the Turkic and other invasions during the 11th and 12th.',
          hint: 'Review c7_hist_ch07_002 on Turkic Invasions to understand who the invaders were and where.',
          misconception: 'Students often think that the 11th and 12th-century invasions instantly and completely replaced existing Indian social.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores how the Turkic and other invasions during the 11th and 12th centuries',
                  options: ['This topic explores how the Turkic and other invasions during the 11th and 12th centuries', 'The 11th and 12th centuries in the Indian subcontinent marked a pivotal period of', 'The Turkic invasions of India in the 11th and 12th centuries, led primarily by Mahmud of', 'This topic explores the rise, political organization, military resistance, and governance'],
                  hint: 'Review c7_hist_ch07_002 on Turkic Invasions to understand who the invaders were and where they.',
                  misconception: 'Students often think that the 11th and 12th-century invasions instantly and completely replaced existing Indian social structures with.' }
          ],
            remediations: { 'the-11th-and-12th-century': { steps: ['To fix this misconception, compare the political level (who collected taxes at the top) with the local level (how.', 'Show students that while kings and capitals changed, the daily life of a peasant or artisan in a village remained.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
