import type { SimDef } from '../../engine/types';

/** v3 generated — c7_hist_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_hist_ch04_p2: SimDef = {
    id: 'v3_c7_hist_ch04_p2',
    title: 'The Gupta Era: An Age of Tireless Creativity · Part 2/2',
    subtitle: 'Covers the architectural features, sculpture styles, and mural painting techniques of the.',
    classLevel: 7, subject: 'history', topic: 'The Gupta Era: An Age of Tireless Creativity · Part 2/2',
    chapters: ['c7_hist_ch04'],
    nodeIds: ['c7_hist_ch04_007', 'c7_hist_ch04_008', 'c7_hist_ch04_009', 'c7_hist_ch04_010', 'c7_hist_ch04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking into a dark, rock-cut cave in the Sahyadri mountains of Maharashtra, striking a match.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A family of small-time local chiefs in Magadha ends up ruling an empire within a few generations — no single overnight conquest. What slow moves lifted the Guptas from Maharaja to Maharajadhiraja?',
        options: ['A fertile home base plus smart marriage alliances — the wedding of Chandragupta I to the Lichchhavi princess Kumaradevi raised the dynasty to imperial status', 'A secret treasure vault bought the throne', 'They conquered all of India in one campaign', 'A foreign emperor gifted them the crown'],
        answer: 'A fertile home base plus smart marriage alliances — the wedding of Chandragupta I to the Lichchhavi princess Kumaradevi raised the dynasty to imperial status',
        hook: 'Empires rarely erupt overnight. Sri Gupta and Ghatotkacha spent generations as local Maharajas first — and the gold coins showing the king beside queen Kumaradevi prove how precious that alliance was to their legitimacy.',
    },
    teaching: [
        { title: 'Art and Architecture: Ajanta Caves and Temples', text: 'The Ajanta Caves and Gupta-era temples represent the pinnacle of rock-cut architecture, sculpture, and mural painting in ancient India, flourishing under the patronage of the Gupta dynasty and their.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_hist_ch04_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read the evidence like a historian — early Maharaja titles, the Magadha heartland, a coin showing king and queen — and reconstruct how local chiefs became emperors.',
        labels: ['Art and Architecture: Ajanta', 'Economy and Trade During', 'Society and Culture', 'Vakataka Kingdom: Contemporaries', 'Decline of the Gupta'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c7_hist_ch04_009', title: 'Society and Culture in the Gupta Period',
          caseStudy: { intro: 'Imagine walking through a bustling town in ancient northern India during the 5th century CE, where Sanskrit plays are being performed in royal courts.',
            decisions: [{ prompt: 'Which prominent Sanskrit poet and dramatist, renowned for works like *Abhijñānaśākuntalam*, lived during the Gupta period and graced the.', options: [
                { text: 'Kalidasa', outcome: 'The correct answer is Kalidasa. A student who answers incorrectly by naming a Mauryan or Mughal.' },
                { text: 'Golden Age', outcome: 'Not quite — Students often assume that because the Gupta period is called the "Golden Age," life was.', reveals: 'because-the-gupta-period-is' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a class presentation, Dev plans to say: \'The Gupta Empire appeared overnight when one mighty conqueror swept across India in a single campaign.\' His teacher asks him to check the titles on early Gupta inscriptions and coins first.',
            decisions: [{ prompt: 'What will the evidence actually show Dev?', options: [
                { text: 'The first Guptas, Sri Gupta and Ghatotkacha, used the modest title Maharaja as local chiefs; only generations later did Chandragupta I take the imperial title Maharajadhiraja after marrying the Lichchhavi princess Kumaradevi — so the empire was built gradually through Magadha\'s fertile base, alliances and rising titles, not one battle.', outcome: 'This reads the sources correctly: title changes and joint royal coins trace a slow consolidation from local chieftains to sovereigns.' },
                { text: 'Dev\'s version stands — inscriptions exaggerate, so a single conquest story is close enough for a school presentation.', outcome: 'Coins and inscriptions are primary evidence; they record generations of subordinate Maharajas before any imperial title, directly contradicting overnight conquest.', reveals: 'empires-appear-overnight' },
                { text: 'The coins will show the Guptas began as outsiders who seized power in a desert region far from Magadha.', outcome: 'The dynasty rose inside Magadha — the same fertile Ganga basin with iron resources that had earlier sustained the Mauryas — so geography, not foreign invasion, was the base.', reveals: 'gupta-were-outsiders' }
            ] }] } },
        { type: 'case', nodeId: 'c7_hist_ch04_011', title: 'You made it',
          caseStudy: { intro: 'A title tells a story: Maharaja to Maharajadhiraja is a climb of decades, built on harvests and alliances before a single army marched.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch04_007', difficulty: 'standard',
          question: 'The Ajanta Caves and Gupta-era temples represent the pinnacle of rock-cut.',
          hint: 'Review c6_history_ch05_009 to recall how early stone monuments and rock-cut architecture.',
          misconception: 'Students often believe that the Ajanta Caves were carved and painted all at once during a single short campaign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Ajanta Caves and Gupta-era temples represent the pinnacle of rock-cut architecture,',
                  options: ['The Ajanta Caves and Gupta-era temples represent the pinnacle of rock-cut architecture,', 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha', 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the', 'The Gupta period (approximately 4th to 6th centuries CE) is termed the Classical Age of'],
                  hint: 'Review c6_history_ch05_009 to recall how early stone monuments and rock-cut architecture began.',
                  misconception: 'Students often believe that the Ajanta Caves were carved and painted all at once during a single short campaign by Emperor Chandragupta II.' }
          ],
            remediations: { 'the-ajanta-caves-were-carved': { steps: ['To fix this misconception, have the student examine a chronological chart of the Ajanta caves, separating them into.', 'Point out that the 5th-century revival happened during the Gupta-Vakataka era, long after the earliest caves were.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_008', difficulty: 'standard',
          question: 'This topic explores the vibrant economic life, bustling internal trade.',
          hint: 'Review c7_hist_ch04_004 to understand how the Gupta administrative structure collected.',
          misconception: 'Students often think that the abundance of Gupta gold coins means every ordinary farmer and laborer used gold daily.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic explores the vibrant economic life, bustling internal trade networks,',
                  options: ['This topic explores the vibrant economic life, bustling internal trade networks,', 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha', 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the', 'The Gupta period (approximately 4th to 6th centuries CE) is termed the Classical Age of'],
                  hint: 'Review c7_hist_ch04_004 to understand how the Gupta administrative structure collected taxes and.',
                  misconception: 'Students often think that the abundance of Gupta gold coins means every ordinary farmer and laborer used gold daily to buy food and.' }
          ],
            remediations: { 'the-abundance-of-gupta-gold': { steps: ['To fix this, guide the student to examine the different types of coins found in archaeological sites from the Gupta.', 'Show them that while kings issued magnificent gold coins for prestige and major trade, the common marketplace used.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_009', difficulty: 'standard',
          question: 'This topic explores the social structures, religious life, daily routines, and.',
          hint: 'Review node c7_hist_ch04_008 on Gupta economy and c7_hist_ch04_003 on the Classical Age.',
          misconception: 'Students often assume that because the Gupta period is called the "Golden Age," life was prosperous, egalitarian, and.',
          parts: [
                { id: 'a', prompt: 'Which prominent Sanskrit poet and dramatist, renowned for works like *Abhijñānaśākuntalam*, lived during the Gupta period and graced the court of Chandragupta.', answer: 'Kalidasa',
                  options: ['Kalidasa', 'Golden Age'],
                  hint: 'Review node c7_hist_ch04_008 on Gupta economy and c7_hist_ch04_003 on the Classical Age features.',
                  misconception: 'Students often assume that because the Gupta period is called the "Golden Age," life was prosperous, egalitarian, and culturally.' }
          ],
            remediations: { 'because-the-gupta-period-is': { steps: ['To fix this misconception, guide the student to examine historical inscriptions and legal texts (such as the Smritis).', 'Compare these primary sources with accounts of urban wealth to show that while elites enjoyed a flourishing classical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume that because the Gupta period is called the "Golden Age," life was prosperous, egalitarian, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The cultural achievements of the Gupta period were purely a result of royal court patronage, independent of the daily economic life.', answer: 'that the statement is inaccurate',
                  options: ['that the statement is inaccurate', 'Golden Age'],
                  hint: 'Review node c7_hist_ch04_008 on Gupta economy and c7_hist_ch04_003 on the Classical Age features.',
                  misconception: 'Students often assume that because the Gupta period is called the "Golden Age," life was prosperous, egalitarian, and culturally.' }
          ],
            remediations: { 'because-the-gupta-period-is': { steps: ['To fix this misconception, guide the student to examine historical inscriptions and legal texts (such as the Smritis).', 'Compare these primary sources with accounts of urban wealth to show that while elites enjoyed a flourishing classical.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_010', difficulty: 'standard',
          question: 'The Vakataka kingdom was a powerful dynasty that ruled parts of Central and.',
          hint: 'Review c7_hist_ch04_001 to re-familiarize yourself with the extent and influence of the.',
          misconception: 'Students often think that the Gupta Empire ruled the entire Indian subcontinent directly by themselves, completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Vakataka kingdom was a powerful dynasty that ruled parts of Central and Southern',
                  options: ['The Vakataka kingdom was a powerful dynasty that ruled parts of Central and Southern', 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha', 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the', 'The Gupta period (approximately 4th to 6th centuries CE) is termed the Classical Age of'],
                  hint: 'Review c7_hist_ch04_001 to re-familiarize yourself with the extent and influence of the Gupta.',
                  misconception: 'Students often think that the Gupta Empire ruled the entire Indian subcontinent directly by themselves, completely ignoring powerful.' }
          ],
            remediations: { 'the-gupta-empire-ruled-the': { steps: ['To fix this misconception, compare a political map of northern India (Gupta territory) with central/southern India.', 'Next, examine a specific historical event, such as Queen Prabhavatigupta ruling the Vakataka kingdom, to show how.', 'Finally, trace how art styles from both regions influenced each other at sites like Ajanta.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c7_hist_ch04_011', difficulty: 'standard',
          question: 'The decline of the Gupta Empire refers to the gradual weakening and eventual.',
          hint: 'Review c7_hist_ch04_004 on Gupta administration and governance before attempting this.',
          misconception: 'Students often think that the Gupta Empire fell suddenly in a single massive battle against foreign invaders like the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The decline of the Gupta Empire refers to the gradual weakening and eventual',
                  options: ['The decline of the Gupta Empire refers to the gradual weakening and eventual', 'The origins and rise of the Gupta Empire trace how a small regional dynasty in Magadha', 'This topic covers the reigns of Chandragupta I and his son Samudragupta, who laid the', 'The Gupta period (approximately 4th to 6th centuries CE) is termed the Classical Age of'],
                  hint: 'Review c7_hist_ch04_004 on Gupta administration and governance before attempting this topic.',
                  misconception: 'Students often think that the Gupta Empire fell suddenly in a single massive battle against foreign invaders like the Hunas, much like.' }
          ],
            remediations: { 'the-gupta-empire-fell-suddenly': { steps: ['To fix this misconception, guide the student to trace a timeline from Skandagupta\'s reign to the 6th century.', 'Show them a political map of Northern India during the late Gupta period, pointing out how smaller regional kingdoms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
