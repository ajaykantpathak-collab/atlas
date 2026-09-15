import type { SimDef } from '../../engine/types';

/** v3 generated — c6_history_ch09 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_history_ch09: SimDef = {
    id: 'v3_c6_history_ch09',
    title: 'The Mughal Empire',
    subtitle: 'This node covers the establishment of the Mughal Empire by Babur and his victory.',
    classLevel: 6, subject: 'history', topic: 'The Mughal Empire',
    chapters: ['c6_history_ch09'],
    nodeIds: ['c6_history_ch09_033', 'c6_history_ch09_034', 'c6_history_ch09_035', 'c6_history_ch09_036', 'c6_history_ch09_037', 'c6_history_ch09_038'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Imagine if your school principal changed, and the entire way the school was run suddenly shifted from one.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'In 1526, a traveler from Central Asia wins a single battle at Panipat — and the map of India changes for centuries. How could one morning do all that?',
        options: ['Babur defeated Ibrahim Lodi, ending the dominance of the Delhi Sultanate and planting the Mughal Empire', 'He found a magic crown lying on the battlefield', 'The Delhi army simply went home that day', 'He bought the throne of Delhi with trade goods'],
        answer: 'Babur defeated Ibrahim Lodi, ending the dominance of the Delhi Sultanate and planting the Mughal Empire',
        hook: 'Babur was not already an Indian king taking over. He was an outsider who saw India as a land of opportunity and had to fight his way in — the empire began with a battlefield, not a birthright.',
    },
    teaching: [
        { title: 'Babur and the Founding of the Mughal Empire', text: 'The Mughal Empire was a major ruling power in India established by Babur, a Central Asian ruler, after his victory over the Sultan of Delhi, Ibrahim Lodi, in the First Battle of Panipat in 1526.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_history_ch09_033', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Relive the First Battle of Panipat — weigh what Babur risked, what Ibrahim Lodi lost, and what a defeat would have done to the dream of a Mughal Empire.',
        labels: ['Babur and the Founding', 'Akbar: The Great Mughal', 'Mughal Administration: How', 'Mughal Art and Architecture', 'Shah Jahan and Aurangzeb', 'Society and Economy Under'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c6_history_ch09_033', title: 'Babur and the Founding of the Mughal Empire',
          caseStudy: { intro: 'Imagine if your school principal changed, and the entire way the school was run suddenly shifted from one system to a new one.',
            decisions: [{ prompt: 'Who was the first ruler of the Mughal Empire in India?', options: [
                { text: 'Babur', outcome: 'Babur. A wrong answer suggests the student is confusing Mughal rulers with later figures like Akbar.' },
                { text: 'Babur was already a powerful Indian King who just took over Delhi', outcome: 'Not quite — Students often think Babur was already a powerful Indian King who just took over Delhi.', reveals: 'babur-was-already-a-powerful' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_034', title: 'Akbar: The Great Mughal',
          caseStudy: { intro: 'Imagine you are the captain of a sports team that you inherited when you were very young, and for the first few years, a coach made all the decisions for you.',
            decisions: [{ prompt: 'Who was the person that acted as a regent for Akbar during the first few years of his reign?', options: [
                { text: 'Bairam Khan was his regent', outcome: 'Bairam Khan was his regent. A student who answers "Humayun" confuses the father with the protector.' },
                { text: 'Humayun', outcome: 'Not quite — Students often think Akbar inherited a stable empire and just kept it that way.', reveals: 'akbar-inherited-a-stable-empire' },
                { text: 'Akbar inherited a stable empire and just kept it that way', outcome: 'Not quite — Students often think Akbar inherited a stable empire and just kept it that way.', reveals: 'akbar-inherited-a-stable-empire' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_035', title: 'Mughal Administration: How the Empire Was Ruled',
          caseStudy: { intro: 'Imagine your school has a Principal, but they cannot manage the canteen, the bus routes, the sports equipment, and the exams all by themselves.',
            decisions: [{ prompt: 'Name the four main ministers who advised the Mughal Emperor at the centre.', options: [
                { text: 'The four ministers are the Vakil (prime minister), Diwan (finance), Mir Bakshi', outcome: 'The four ministers are the Vakil (prime minister), Diwan (finance), Mir Bakshi (military), and.' },
                { text: 'absolute authority', outcome: 'Not quite — Students often assume the Emperor did all the work personally because they read he had "absolute.', reveals: 'the-emperor-did-all-the' },
                { text: 'having the final say', outcome: 'Not quite — Students often assume the Emperor did all the work personally because they read he had "absolute.', reveals: 'the-emperor-did-all-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_036', title: 'Mughal Art and Architecture',
          caseStudy: { intro: 'Have you ever noticed how the gates of a park or a large government building look like a grand archway, or how a dome sits on top of a building to make it look.',
            decisions: [{ prompt: 'What are two primary building materials famously used in Mughal architecture?', options: [
                { text: 'Red sandstone and white marble', outcome: 'Red sandstone and white marble. A student who misses this likely hasn\'t engaged with the basic.' },
                { text: 'ancient Indian', outcome: 'Not quite — Students often confuse Mughal architecture with generic "ancient Indian" temple architecture.', reveals: 'students-often-confuse-mughal-architecture' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_037', title: 'Shah Jahan and Aurangzeb: The Peak and Decline',
          caseStudy: { intro: 'Imagine you are visiting a grand monument like the Red Fort—have you ever wondered who decided to build it and why?',
            decisions: [{ prompt: 'Name three famous structures built during the reign of Shah Jahan.', options: [
                { text: 'The Taj Mahal, the Red Fort in Delhi, and the Jama Masjid', outcome: 'The Taj Mahal, the Red Fort in Delhi, and the Jama Masjid. A wrong answer suggests the student.' },
                { text: 'because the Mughal Empire was "big" under Aurangzeb, it was at its strongest', outcome: 'Not quite — Students often assume that because the Mughal Empire was "big" under Aurangzeb, it was at its.', reveals: 'because-the-mughal-empire-was' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_038', title: 'Society and Economy Under the Mughals',
          caseStudy: { intro: 'Think about your own school: there are teachers, administrators, and students, all working together to keep the school running.',
            decisions: [{ prompt: 'Who occupied the highest position in the Mughal social structure?', options: [
                { text: 'The Emperor and the nobles', outcome: 'The Emperor and the nobles. A student answering "merchants" shows they are confusing the political.' },
                { text: 'merchants', outcome: 'Not quite — Students often think the Mughal Empire was purely a military state and ignore the "everyday".', reveals: 'the-mughal-empire-was-purely' },
                { text: 'everyday', outcome: 'Not quite — Students often think the Mughal Empire was purely a military state and ignore the "everyday".', reveals: 'the-mughal-empire-was-purely' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_033', title: 'Use it in the wild',
          caseStudy: { intro: 'At a museum, a sword labelled \'Panipat, 1526\' sits in a glass case. A student reads the card and protests: \'Babur was a foreigner who invaded — how did an outsider end up founding an Indian empire?\'',
            decisions: [{ prompt: 'How can a conqueror from outside found a genuinely Indian empire?', options: [
                { text: 'Because the dynasty he founded made India its home — Babur arrived from Central Asia and won at Panipat in 1526, but his successors ruled from India, built its cities, collected its taxes and patronised its culture for centuries. The empire was foreign in its founder\'s origin and Indian in where it lived, ruled and was remembered — both things are true at once.', outcome: '1526 is a turning point precisely because an outsider\'s victory began a dynasty that became part of India\'s own history — origin and identity are not the same thing.' },
                { text: 'The student\'s doubt stands — an empire founded by an invader can never be called Indian.', outcome: 'Dynasties take on the character of where they rule — the Mughals governed India, shaped its art and administration, and are studied as an Indian empire.', reveals: 'outsider-cant-be-indian' },
                { text: 'Babur was not really an outsider — the Mughals had always ruled in India before 1526.', outcome: 'Babur came from beyond India and won his empire by conquest — that is exactly why calling the empire he founded \'Indian\' is the interesting fact.', reveals: 'mughals-were-always-indian' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_038', title: 'You made it',
          caseStudy: { intro: 'One battle can end an era and begin another. Panipat, 1526 — the day the Sultanate closed and the Mughal age opened.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch09_033', difficulty: 'standard',
          question: 'The Mughal Empire was a major ruling power in India established by Babur,.',
          hint: 'Review the meaning of "Dynasty" and "Empire."',
          misconception: 'Students often think Babur was already a powerful Indian King who just took over Delhi.',
          parts: [
                { id: 'a', prompt: 'Who was the first ruler of the Mughal Empire in India?', answer: 'Babur',
                  options: ['Babur', 'Babur was already a powerful Indian King who just took over Delhi'],
                  hint: 'Review the meaning of "Dynasty" and "Empire."',
                  misconception: 'Students often think Babur was already a powerful Indian King who just took over Delhi.' }
          ],
            remediations: { 'babur-was-already-a-powerful': { steps: ['Ask the student: "Where was Babur born?" 2.', 'Point to Uzbekistan on a map.', 'Explain: "Babur was like a traveler who decided to build a house in a new neighborhood.', 'He wasn\'t born in the house; he had to win the right to live there." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_033', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Babur was already a powerful Indian King who just took over Delhi.',
          parts: [
                { id: 'a', prompt: 'Was the Mughal Empire established through a peaceful transition of power?', answer: 'No, it was established through a military battle (Panipat)',
                  options: ['No, it was established through a military battle (Panipat)', 'empires are formed by simple agreements rather than conflict', 'Babur was already a powerful Indian King who just took over Delhi'],
                  hint: 'Review the meaning of "Dynasty" and "Empire."',
                  misconception: 'Students often think Babur was already a powerful Indian King who just took over Delhi.' }
          ],
            remediations: { 'babur-was-already-a-powerful': { steps: ['Ask the student: "Where was Babur born?" 2.', 'Point to Uzbekistan on a map.', 'Explain: "Babur was like a traveler who decided to build a house in a new neighborhood.', 'He wasn\'t born in the house; he had to win the right to live there." 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_034', difficulty: 'standard',
          question: 'Akbar was the third Mughal emperor (reigned 1542–1605) who transformed the.',
          hint: 'Review the definition of a \'Regent\' and the life of Humayun.',
          misconception: 'Students often think Akbar inherited a stable empire and just kept it that way.',
          parts: [
                { id: 'a', prompt: 'Who was the person that acted as a regent for Akbar during the first few years of his reign?', answer: 'Bairam Khan was his regent',
                  options: ['Bairam Khan was his regent', 'Humayun', 'Akbar inherited a stable empire and just kept it that way'],
                  hint: 'Review the definition of a \'Regent\' and the life of Humayun.',
                  misconception: 'Students often think Akbar inherited a stable empire and just kept it that way.' }
          ],
            remediations: { 'akbar-inherited-a-stable-empire': { steps: ['First, ask the student to re-read the timeline of Humayun\'s death.', 'Then, explain that "inheriting" a throne is different from "securing" it.', 'Finally, have them list two challenges a 13-year-old might face when trying to control powerful, older nobles.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_035', difficulty: 'standard',
          question: 'The Mughal administrative system was a structured government hierarchy designed.',
          hint: 'Review the definition of "administration" as the process of organizing resources and.',
          misconception: 'Students often assume the Emperor did all the work personally because they read he had "absolute authority." This.',
          parts: [
                { id: 'a', prompt: 'Name the four main ministers who advised the Mughal Emperor at the centre.', answer: 'The four ministers are the Vakil (prime minister), Diwan (finance), Mir Bakshi',
                  options: ['The four ministers are the Vakil (prime minister), Diwan (finance), Mir Bakshi', 'absolute authority', 'having the final say', 'performing every task'],
                  hint: 'Review the definition of "administration" as the process of organizing resources and people.',
                  misconception: 'Students often assume the Emperor did all the work personally because they read he had "absolute authority." This is wrong because they.' }
          ],
            remediations: { 'the-emperor-did-all-the': { steps: ['Explain that "absolute authority" is like being the captain of a ship.', 'Ask: "Does the captain steer the ship, cook the food, and fix the engine all at once?" 3.', 'Once they say no, relate this back to the ministers.', 'Guide them to see that the ministers are the "crew" that keeps the ship running while the Emperor sets the direction.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_036', difficulty: 'standard',
          question: 'Mughal architecture is a unique building style that combined Indian, Persian.',
          hint: 'Review the definitions of "Persian" and "Central Asian" influences to understand the.',
          misconception: 'Students often confuse Mughal architecture with generic "ancient Indian" temple architecture.',
          parts: [
                { id: 'a', prompt: 'What are two primary building materials famously used in Mughal architecture?', answer: 'Red sandstone and white marble',
                  options: ['Red sandstone and white marble', 'ancient Indian'],
                  hint: 'Review the definitions of "Persian" and "Central Asian" influences to understand the cultural roots.',
                  misconception: 'Students often confuse Mughal architecture with generic "ancient Indian" temple architecture.' },
                { id: 'b', prompt: 'Why do historians call Mughal architecture a "blended" style?', answer: 'It is called blended',
                  options: ['It is called blended', 'it was only Persian', 'ancient Indian'],
                  hint: 'Review the definitions of "Persian" and "Central Asian" influences to understand the cultural roots.',
                  misconception: 'Students often confuse Mughal architecture with generic "ancient Indian" temple architecture.' }
          ],
            remediations: { 'students-often-confuse-mughal-architecture': { steps: ['Ask the student to look at a picture of a temple (e.g., Khajuraho) and a Mughal tomb (e.g., Taj Mahal).', 'Ask them to point out the round dome on the tomb versus the tiered tower of the temple.', 'Explain that the arch and dome were the "signature" of the Mughal style, whereas earlier builders used flat lintels.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_037', difficulty: 'standard',
          question: 'Shah Jahan’s reign marked the height of Mughal architectural splendor and.',
          hint: 'Review the policies of Akbar to understand the shift under his successors.',
          misconception: 'Students often assume that because the Mughal Empire was "big" under Aurangzeb, it was at its strongest.',
          parts: [
                { id: 'a', prompt: 'Name three famous structures built during the reign of Shah Jahan.', answer: 'The Taj Mahal, the Red Fort in Delhi, and the Jama Masjid',
                  options: ['The Taj Mahal, the Red Fort in Delhi, and the Jama Masjid', 'because the Mughal Empire was "big" under Aurangzeb, it was at its strongest'],
                  hint: 'Review the policies of Akbar to understand the shift under his successors.',
                  misconception: 'Students often assume that because the Mughal Empire was "big" under Aurangzeb, it was at its strongest.' }
          ],
            remediations: { 'because-the-mughal-empire-was': { steps: ['Explain that a large house with a broken foundation is less stable than a smaller house with a strong one.', 'Compare the empire to this house.', 'Ask the student to identify which "policies" might be the "cracks" in the foundation.', 'Guide them to see how policy choices affect the loyalty and cooperation of the subjects.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_038', difficulty: 'standard',
          question: 'Mughal society and economy refers to the organized way people lived, worked.',
          hint: 'Review the definition of "social hierarchy" from early chapters.',
          misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.',
          parts: [
                { id: 'a', prompt: 'Who occupied the highest position in the Mughal social structure?', answer: 'The Emperor and the nobles',
                  options: ['The Emperor and the nobles', 'merchants', 'everyday', 'the Mughal Empire was purely a military state and ignore the "everyday" economy'],
                  hint: 'Review the definition of "social hierarchy" from early chapters.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' },
                { id: 'b', prompt: 'If a drought destroyed the crops in a village, how would this affect an artisan living in a city?', answer: 'The artisan would suffer',
                  options: ['The artisan would suffer', 'everyday', 'the Mughal Empire was purely a military state and ignore the "everyday" economy'],
                  hint: 'Review the definition of "social hierarchy" from early chapters.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' },
                { id: 'c', prompt: 'How did the Bhakti and Sufi movements challenge the traditional social order of the time?', answer: 'They preached equality and devotion',
                  options: ['They preached equality and devotion', 'everyday', 'the Mughal Empire was purely a military state and ignore the "everyday" economy'],
                  hint: 'Review the definition of "social hierarchy" from early chapters.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' }
          ],
            remediations: { 'the-mughal-empire-was-purely': { steps: ['To fix this, ask the student to trace the journey of a piece of cotton fabric: from the farmer (raw material) to the.', 'Have them draw this as a chain to show that the Emperor\'s power relied on the stability of all these people below him.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
