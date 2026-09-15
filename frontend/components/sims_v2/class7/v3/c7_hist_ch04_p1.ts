import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch04_p1: SimDef = {
    id: 'v3_c7_hist_ch04_p1',
    title: 'The Gupta Era: An Age of Tireless Creativity · Part 1/2',
    subtitle: 'Covers the foundational origins of the Gupta dynasty, the political conditions.',
    classLevel: 7, subject: 'history', topic: 'The Gupta Era: An Age of Tireless Creativity · Part 1/2',
    chapters: ['c7_hist_ch04'],
    nodeIds: ['c7_hist_ch04_001', 'c7_hist_ch04_002', 'c7_hist_ch04_003', 'c7_hist_ch04_004', 'c7_hist_ch04_005', 'c7_hist_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine visiting the ruins of an ancient brick temple or looking at a museum coin minted 1,700 years ago that.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A family of small-time local chiefs in Magadha ends up ruling an empire within a few generations — no single overnight conquest. What slow moves lifted the Guptas from Maharaja to Maharajadhiraja?',
        options: ['A fertile home base plus smart marriage alliances — the wedding of Chandragupta I to the Lichchhavi princess Kumaradevi raised the dynasty to imperial status', 'A secret treasure vault bought the throne', 'They conquered all of India in one campaign', 'A foreign emperor gifted them the crown'],
        answer: 'A fertile home base plus smart marriage alliances — the wedding of Chandragupta I to the Lichchhavi princess Kumaradevi raised the dynasty to imperial status',
        hook: 'Empires rarely erupt overnight. Sri Gupta and Ghatotkacha spent generations as local Maharajas first — and the gold coins showing the king beside queen Kumaradevi prove how precious that alliance was to their legitimacy.',
    },
    teaching: [
        { title: 'Gupta Empire: Origins and Rise to Power', text: 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha rose to political prominence in the early 4th century CE, eventually unifying northern India into a powerful.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch04_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the evidence like a historian — early Maharaja titles, the Magadha heartland, a coin showing king and queen — and reconstruct how local chiefs became emperors.',
        labels: ['Gupta Empire: Origins', 'Chandragupta I and Samudragupta', 'Gupta Period as', 'Administration and Governance Under', 'Kalidasa: Literary Contributions', 'Science and Mathematics'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch04_003', title: 'Gupta Period as the Classical Age: Reasons',
          caseStudy: { intro: 'Imagine walking into a gallery filled with finely carved stone sculptures, brilliant mathematical texts, and timeless Sanskrit plays like Shakuntala—all.',
            decisions: [{ prompt: 'What is the primary reason historians refer to the Gupta period as the "Classical Age" of ancient India?', options: [
                { text: 'The Gupta period is called the Classical Age', outcome: 'The Gupta period is called the Classical Age because it witnessed remarkable, standard-setting.' },
                { text: 'Golden Age', outcome: 'Not quite — Students often think the Gupta "Golden Age" meant that every single person in society lived a life.', reveals: 'the-gupta-golden-age-meant' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_004', title: 'Administration and Governance Under the Guptas',
          caseStudy: { intro: 'Imagine walking through a vast kingdom in ancient India where local village councils manage their own water tanks and temples, yet everyone knows the great.',
            decisions: [{ prompt: 'What title did Gupta rulers like Samudragupta and Chandragupta II adopt to show their supreme status and power over lesser kings?', options: [
                { text: 'Gupta rulers adopted grand titles such as *Maharajadhiraja* (King of Kings),', outcome: 'Gupta rulers adopted grand titles such as *Maharajadhiraja* (King of Kings), *Parama-bhattaraka*.' },
                { text: 'Emperor', outcome: 'Not quite — Students often think that because the Gupta period is called the "Golden Age," the administration.', reveals: 'because-the-gupta-period-is' },
                { text: 'Golden Age', outcome: 'Not quite — Students often think that because the Gupta period is called the "Golden Age," the administration.', reveals: 'because-the-gupta-period-is' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_005', title: 'Kalidasa: Literary Contributions of the Gupta Era',
          caseStudy: { intro: 'Imagine reading a story written over 1,500 years ago where the characters talk about falling in love in a lush Himalayan forest or send a message of longing.',
            decisions: [{ prompt: 'In which classical language did Kalidasa compose his famous plays and poetry, which was the official and court language of the Gupta empire?', options: [
                { text: 'Kalidasa composed his works in Sanskrit', outcome: 'Kalidasa composed his works in Sanskrit. If a student answers "Prakrit" or "Tamil," it reveals.' },
                { text: 'Prakrit', outcome: 'Not quite — Students often think Kalidasa lived during the Mauryan period under Ashoka because they confuse the.', reveals: 'kalidasa-lived-during-the-mauryan' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_006', title: 'Science and Mathematics in the Gupta Period',
          caseStudy: { intro: 'Imagine looking at a massive iron pillar standing outdoors in Delhi for over 1,600 years without rusting a single speck—how is that even possible today, let.',
            decisions: [{ prompt: 'Who was the famous Gupta-era mathematician and astronomer who calculated the approximate value of pi ($\\pi$) and argued that the Earth.', options: [
                { text: 'Aryabhata', outcome: 'The correct answer is Aryabhata. A student who answers "Kalidasa" is confusing Gupta literature.' },
                { text: 'Kalidasa', outcome: 'Not quite — Students often believe that the concept of zero and the decimal system were invented in Europe.', reveals: 'the-concept-of-zero-and' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class presentation, Dev plans to say: \'The Gupta Empire appeared overnight when one mighty conqueror swept across India in a single campaign.\' His teacher asks him to check the titles on early Gupta inscriptions and coins first.',
            decisions: [{ prompt: 'What will the evidence actually show Dev?', options: [
                { text: 'The first Guptas, Sri Gupta and Ghatotkacha, used the modest title Maharaja as local chiefs; only generations later did Chandragupta I take the imperial title Maharajadhiraja after marrying the Lichchhavi princess Kumaradevi — so the empire was built gradually through Magadha\'s fertile base, alliances and rising titles, not one battle.', outcome: 'This reads the sources correctly: title changes and joint royal coins trace a slow consolidation from local chieftains to sovereigns.' },
                { text: 'Dev\'s version stands — inscriptions exaggerate, so a single conquest story is close enough for a school presentation.', outcome: 'Coins and inscriptions are primary evidence; they record generations of subordinate Maharajas before any imperial title, directly contradicting overnight conquest.', reveals: 'empires-appear-overnight' },
                { text: 'The coins will show the Guptas began as outsiders who seized power in a desert region far from Magadha.', outcome: 'The dynasty rose inside Magadha — the same fertile Ganga basin with iron resources that had earlier sustained the Mauryas — so geography, not foreign invasion, was the base.', reveals: 'gupta-were-outsiders' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'A title tells a story: Maharaja to Maharajadhiraja is a climb of decades, built on harvests and alliances before a single army marched.',
            decisions: [{ prompt: 'What comes next? The Gupta Era: An Age of Tireless Creativity · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Gupta Era: An Age of Tireless Creativity · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch04_001', difficulty: 'standard',
          question: 'The origins and rise of the Gupta Empire trace how a small regional dynasty.',
          hint: 'Review the political setup of post-Mauryan regional kingdoms in Class 6 history to see.',
          misconception: 'Students often believe that the Gupta Empire appeared suddenly across all of India overnight due to a massive, single.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha',
                  options: ['The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha', 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the', 'The Gupta period (approximately 4th to 6th centuries CE) is termed the Classical Age of', 'Administration and governance under the Guptas (c'],
                  hint: 'Review the political setup of post-Mauryan regional kingdoms in Class 6 history to see how small.',
                  misconception: 'Students often believe that the Gupta Empire appeared suddenly across all of India overnight due to a massive, single military invasion.' }
          ],
            remediations: { 'the-gupta-empire-appeared-suddenly': { steps: ['To fix this misconception, guide the student to examine the titles used by early rulers compared to later ones.', 'Show them that Sri Gupta and Ghatotkacha used the lesser title *Maharaja* (great king), whereas Chandragupta I and.', 'Explain that this shift in titles reflects a decades-long process of growth from local vassals to independent imperial.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_002', difficulty: 'standard',
          question: 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who.',
          hint: 'Review the rise of the Mauryan Empire in Class 6 (c6_history_ch05_007) and the origins.',
          misconception: 'Students often think that Samudragupta directly ruled every single territory mentioned in the Allahabad Pillar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the',
                  options: ['This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the', 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha', 'The Gupta period (approximately 4th to 6th centuries CE) is termed the Classical Age of', 'Administration and governance under the Guptas (c'],
                  hint: 'Review the rise of the Mauryan Empire in Class 6 (c6_history_ch05_007) and the origins of the.',
                  misconception: 'Students often think that Samudragupta directly ruled every single territory mentioned in the Allahabad Pillar inscription in the same way.' }
          ],
            remediations: { 'samudragupta-directly-ruled-every-single': { steps: ['To fix this, draw a simple three-tier diagram on the board representing Samudragupta\'s empire: Tier 1 (Core territory.', 'Compare this to how a school principal delegates power to class monitors versus branch heads, showing that direct rule.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_003', difficulty: 'standard',
          question: 'The Gupta period (approximately 4th to 6th centuries CE) is termed the.',
          hint: 'Review node c7_hist_ch04_002 to re-examine how imperial expansion secured resources and.',
          misconception: 'Students often think the Gupta "Golden Age" meant that every single person in society lived a life of luxury and.',
          parts: [
                { id: 'a', prompt: 'What is the primary reason historians refer to the Gupta period as the "Classical Age" of ancient India?', answer: 'The Gupta period is called the Classical Age',
                  options: ['The Gupta period is called the Classical Age', 'Golden Age'],
                  hint: 'Review node c7_hist_ch04_002 to re-examine how imperial expansion secured resources and peace.',
                  misconception: 'Students often think the Gupta "Golden Age" meant that every single person in society lived a life of luxury and wealth, failing.' }
          ],
            remediations: { 'the-gupta-golden-age-meant': { steps: ['To correct this misconception, guide students to examine social and economic source materials alongside royal.', 'Compare the fine gold coins and elaborate temple reliefs with the daily life conditions of rural agricultural laborers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_004', difficulty: 'standard',
          question: 'Administration and governance under the Guptas (c. 4th to 6th centuries CE).',
          hint: 'Review c6_history_ch05_010 (The Mauryan Administration) to contrast strict imperial.',
          misconception: 'Students often think that because the Gupta period is called the "Golden Age," the administration must have been.',
          parts: [
                { id: 'a', prompt: 'What title did Gupta rulers like Samudragupta and Chandragupta II adopt to show their supreme status and power over lesser kings?', answer: 'Gupta rulers adopted grand titles such as *Maharajadhiraja* (King of Kings),',
                  options: ['Gupta rulers adopted grand titles such as *Maharajadhiraja* (King of Kings),', 'Emperor', 'Golden Age'],
                  hint: 'Review c6_history_ch05_010 (The Mauryan Administration) to contrast strict imperial control with.',
                  misconception: 'Students often think that because the Gupta period is called the "Golden Age," the administration must have been completely centralized.' }
          ],
            remediations: { 'because-the-gupta-period-is': { steps: ['To fix this misconception, compare a primary source excerpt on Mauryan spies with a Gupta land grant inscription.', 'Notice how the Gupta inscription details tax exemptions and administrative rights given to a local grantee rather than.', 'Emphasize that "Golden Age" refers to art, science, and literature under royal patronage, not an egalitarian or purely.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that because the Gupta period is called the "Golden Age," the administration must have been.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Gupta administration was simply a weaker carbon copy of Mauryan centralization." Defend your position using structural evidence.', answer: 'This statement is false',
                  options: ['This statement is false', 'Golden Age'],
                  hint: 'Review c6_history_ch05_010 (The Mauryan Administration) to contrast strict imperial control with.',
                  misconception: 'Students often think that because the Gupta period is called the "Golden Age," the administration must have been completely centralized.' }
          ],
            remediations: { 'because-the-gupta-period-is': { steps: ['To fix this misconception, compare a primary source excerpt on Mauryan spies with a Gupta land grant inscription.', 'Notice how the Gupta inscription details tax exemptions and administrative rights given to a local grantee rather than.', 'Emphasize that "Golden Age" refers to art, science, and literature under royal patronage, not an egalitarian or purely.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_005', difficulty: 'standard',
          question: 'This topic explores the brilliant literary contributions of Kalidasa, one.',
          hint: 'Review node c7_hist_ch04_003 to understand the general features of the Gupta "Golden Age".',
          misconception: 'Students often think Kalidasa lived during the Mauryan period under Ashoka because they confuse the major ancient.',
          parts: [
                { id: 'a', prompt: 'In which classical language did Kalidasa compose his famous plays and poetry, which was the official and court language of the Gupta empire?', answer: 'Kalidasa composed his works in Sanskrit',
                  options: ['Kalidasa composed his works in Sanskrit', 'Prakrit'],
                  hint: 'Review node c7_hist_ch04_003 to understand the general features of the Gupta "Golden Age" before.',
                  misconception: 'Students often think Kalidasa lived during the Mauryan period under Ashoka because they confuse the major ancient empires of India.' }
          ],
            remediations: { 'kalidasa-lived-during-the-mauryan': { steps: ['To fix this error, review the chronological timeline from c6_history_ch05_007 (Mauryan Empire) to c7_hist_ch04_003.', 'Have the student create a simple timeline showing that the Mauryan Empire (c.', '321–185 BCE) used Prakrit and Brahmi for administrative edicts (like Ashoka\'s pillars), whereas the Gupta Empire (c.', '4th–6th century CE) marked the golden age of Sanskrit court literature, featuring Kalidasa.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_006', difficulty: 'standard',
          question: 'The remarkable advancements in astronomy, mathematics, and metallurgy achieved.',
          hint: 'Review c6_history_ch04_004 to understand how early craftspeople worked with metals and.',
          misconception: 'Students often believe that the concept of zero and the decimal system were invented in Europe or the Middle East.',
          parts: [
                { id: 'a', prompt: 'Who was the famous Gupta-era mathematician and astronomer who calculated the approximate value of pi ($\\pi$) and argued that the Earth rotates on its axis?', answer: 'Aryabhata',
                  options: ['Aryabhata', 'Kalidasa'],
                  hint: 'Review c6_history_ch04_004 to understand how early craftspeople worked with metals and weights.',
                  misconception: 'Students often believe that the concept of zero and the decimal system were invented in Europe or the Middle East, completely overlooking.' }
          ],
            remediations: { 'the-concept-of-zero-and': { steps: ['To fix this misconception, guide the student to examine historical trade routes and primary records where Arab.', 'Have them compare Roman numerals (like XLIX) with decimal numbers to physically experience how impossible complex.', 'Finally, trace the transmission timeline from Sanskrit texts to ninth-century Baghdad translations by scholars like.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
