import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch02_p2: SimDef = {
    id: 'v3_c8_hist_ch02_p2',
    title: 'The Rise of the Marathas · Part 2/2',
    subtitle: 'How farmers and mountains forged a warrior people',
    classLevel: 8, subject: 'history', topic: 'The Rise of the Marathas · Part 2/2',
    chapters: ['c8_hist_ch02'],
    nodeIds: ['c8_hist_ch2_5', 'c8_hist_ch2_6', 'c8_hist_ch2_7', 'c8_hist_ch2_8', 'c8_hist_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler in the Deccan Sultanate courts', intro: 'Walk the Pandharpur pilgrimage where thousands sing in Marathi — then ask why the Sultans can\'t hold these hills without local Maratha sardars. The answer is older than any king.', goal: 'Understand the origins of Maratha identity — the fluid Kunbi–Maratha continuum, the rise of Marathi from Maharashtri Prakrit, and how Bhakti culture and Sahyadri geography united them.' },
    discovery: {
        question: 'Long before Shivaji, farmers in Maharashtra tilled fields in the monsoon and rode as cavalry in the war season. How did peasants become a warrior identity?',
        options: ['The Kunbi–Maratha line was fluid — cultivators who fought and won land grants rose to Maratha status, bound together by the Marathi language', 'Marathas were always a fixed royal caste from ancient times', 'They were imported warriors from Central Asia', 'Anyone rich could simply buy the title'],
        answer: 'The Kunbi–Maratha line was fluid — cultivators who fought and won land grants rose to Maratha status, bound together by the Marathi language',
        hook: 'Identity wasn\'t frozen in caste. A Kunbi farmer could pick up a sword, earn a watan and become Maratha — and Bhakti poets singing abhangas in Marathi stitched farmers and warriors into one people before any empire existed.',
    },
    teaching: [
        { title: 'Maratha Navy: Founding and Strategic Importance', text: 'The Maratha Navy was the maritime military wing established by Chhatrapati Shivaji Maharaj around 1657–1659 along the Konkan coastline to protect the sovereign territory of the Maratha state from.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch2_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how a scattered agrarian people fused into a political force: the rugged Sahyadri hills that made them indispensable to Deccan Sultans, the Marathi language rising from Maharashtri Prakrit, and the Bhakti movement uniting them.',
        labels: ['Maratha Navy: Founding', 'Shivaji\'s Administration: Ashtapradhan', 'Coronation of Shivaji at', 'Mughal-Maratha Wars: Conflict with', 'Maratha Expansion: Dakshina Digvijaya'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hist_ch2_6', title: 'Identify each idea',
          dissect: { specimen: 'The Rise of the Marathas · Part 2/2', spots: [
            { id: 's1', label: 'Maratha Navy Founding and Strategic Importance', prompt: 'Which idea is this? — The Maratha Navy was the maritime military wing established by Chhatrapati Shivaji.', answer: 'Maratha Navy Founding and Strategic Importance', options: ['Maratha Navy Founding and Strategic Importance', 'Shivajis Administration Ashtapradhan and Revenue System', 'Coronation of Shivaji at Raigad 1674', 'Mughal-Maratha Wars Conflict with Aurangzeb'] },
            { id: 's2', label: 'Shivajis Administration Ashtapradhan and Revenue System', prompt: 'Which idea is this? — Shivaji\'s administration was a highly centralized governance system established.', answer: 'Shivajis Administration Ashtapradhan and Revenue System', options: ['Shivajis Administration Ashtapradhan and Revenue System', 'Maratha Navy Founding and Strategic Importance', 'Coronation of Shivaji at Raigad 1674', 'Mughal-Maratha Wars Conflict with Aurangzeb'] },
            { id: 's3', label: 'Coronation of Shivaji at Raigad 1674', prompt: 'Which idea is this? — The Coronation of Shivaji Maharaj took place on June 6, 1674, at Raigad Fort, where.', answer: 'Coronation of Shivaji at Raigad 1674', options: ['Coronation of Shivaji at Raigad 1674', 'Maratha Navy Founding and Strategic Importance', 'Shivajis Administration Ashtapradhan and Revenue System', 'Mughal-Maratha Wars Conflict with Aurangzeb'] },
            { id: 's4', label: 'Mughal-Maratha Wars Conflict with Aurangzeb', prompt: 'Which idea is this? — The Mughal-Maratha Wars (1680–1707) were a series of intense military conflicts fought.', answer: 'Mughal-Maratha Wars Conflict with Aurangzeb', options: ['Mughal-Maratha Wars Conflict with Aurangzeb', 'Maratha Navy Founding and Strategic Importance', 'Shivajis Administration Ashtapradhan and Revenue System', 'Coronation of Shivaji at Raigad 1674'] },
            { id: 's5', label: 'Maratha Expansion Dakshina Digvijaya Southern Conquest', prompt: 'Which idea is this? — The Dakshina Digvijaya (1677–1678) was Chhatrapati Shivaji Maharaj’s strategic southern.', answer: 'Maratha Expansion Dakshina Digvijaya Southern Conquest', options: ['Maratha Expansion Dakshina Digvijaya Southern Conquest', 'Maratha Navy Founding and Strategic Importance', 'Shivajis Administration Ashtapradhan and Revenue System', 'Coronation of Shivaji at Raigad 1674'] }
          ] } },
        { type: 'case', nodeId: 'c8_hist_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate insists the Marathas \'appeared out of nowhere in the 1600s when Shivaji created them as a warrior caste.\' A friend points to the older Wari pilgrimage, where farmers have sung Marathi abhangas together for centuries.',
            decisions: [{ prompt: 'Whose account does the evidence support?', options: [
                { text: 'The friend\'s — Maratha identity grew for centuries before Shivaji: Kunbi cultivators served as seasonal cavalry and rose into Maratha status, while the Marathi language and Bhakti saints like Dnyaneshwar welded farmers and warriors into one regional community long before any coronation.', outcome: 'This credits the deep linguistic and cultural groundwork instead of crediting one ruler with inventing a people.' },
                { text: 'The first classmate is right — a political identity begins only when a king proclaims it, so \'Maratha\' started with Shivaji.', outcome: 'Identity is built by shared language and custom, not proclamation; the Bhakti movement and Sultanate service had fused that community by the 16th century.', reveals: 'kings-invent-peoples' },
                { text: 'Both are partly wrong — Kunbis and Marathas were always two sealed, unrelated castes with no overlap.', outcome: 'Records show the same families farmed in peace and rode as militia in war; it was a fluid continuum, not two fixed castes.', reveals: 'castes-were-sealed' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Empires aren\'t born from crowns — they grow from soil, songs and shared words. Marathi gave farmers and horsemen one voice, and the mountains gave them a battlefield only they could master.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch2_5', difficulty: 'standard',
          question: 'The Maratha Navy was the maritime military wing established by Chhatrapati.',
          hint: 'Revisit node `c8_hist_ch2_4` to review how Shivaji utilized geographic terrain (Western.',
          misconception: 'Students often assume that Indian rulers prior to the British era never understood naval power or built warships.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Maratha Navy was the maritime military wing established by Chhatrapati Shivaji',
                  options: ['The Maratha Navy was the maritime military wing established by Chhatrapati Shivaji', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'Revisit node `c8_hist_ch2_4` to review how Shivaji utilized geographic terrain (Western Ghats) for.',
                  misconception: 'Students often assume that Indian rulers prior to the British era never understood naval power or built warships, believing that sea trade.' }
          ],
            remediations: { 'indian-rulers-prior-to-the': { steps: ['To correct this misconception: 1.', 'Examine a historical map of the Konkan coastline showing sea forts like Sindhudurg, Vijaydurg, Suvarnadurg, and.', 'Compare the structural features of an inland hill fort (e.g., Raigad) with a sea fort (*Jal Durg* like Sindhudurg.', 'Review primary historical records, such as the *Adnyapatra* (a Maratha royal treatise on statecraft), which explicitly.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_6', difficulty: 'standard',
          question: 'Shivaji\'s administration was a highly centralized governance system established.',
          hint: 'If you are struggling, review how the Mughal *Jagirdars* collected taxes in Class 7.',
          misconception: 'Students often assume that *Chauth* and *Sardeshmukhi* were part of the domestic tax system paid by Shivaji’s own.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Shivaji\'s administration was a highly centralized governance system established in',
                  options: ['Shivaji\'s administration was a highly centralized governance system established in', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'If you are struggling, review how the Mughal *Jagirdars* collected taxes in Class 7.',
                  misconception: 'Students often assume that *Chauth* and *Sardeshmukhi* were part of the domestic tax system paid by Shivaji’s own subjects inside the.' }
          ],
            remediations: { 'chauth-and-sardeshmukhi-were-part': { steps: ['To correct this misconception, use a diagram of two concentric circles.', 'Label the inner circle **"Swarajya" (Direct Rule)** and the outer ring **"Mughlai" (Foreign Territory)**.', '- Ask the student: "If you are a farmer inside the inner circle, who protects you?" (The Maratha state).', 'Explain that they pay direct land revenue (up to 40%) for this administration.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_7', difficulty: 'standard',
          question: 'The Coronation of Shivaji Maharaj took place on June 6, 1674, at Raigad Fort.',
          hint: 'If stuck, review `c8_hist_ch2_6` to see how Shivaji\'s administrative system was organized.',
          misconception: 'Students often believe that Shivaji Maharaj became the king and began his rule only in 1674 after the coronation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Coronation of Shivaji Maharaj took place on June 6, 1674, at Raigad Fort, where he',
                  options: ['The Coronation of Shivaji Maharaj took place on June 6, 1674, at Raigad Fort, where he', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'If stuck, review `c8_hist_ch2_6` to see how Shivaji\'s administrative system was organized before.',
                  misconception: 'Students often believe that Shivaji Maharaj became the king and began his rule only in 1674 after the coronation ritual.' }
          ],
            remediations: { 'shivaji-maharaj-became-the-king': { steps: ['Explain the distinction between *de facto* power (actual physical control of land and military) and *de jure* power.', 'Have the student list three actions Shivaji took *before* 1674 (e.g., capturing Torna in 1646, defeating Afzal Khan.', 'Compare a military rebel\'s position with a crowned king\'s position when signing a peace treaty with foreign powers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_8', difficulty: 'standard',
          question: 'The Mughal-Maratha Wars (1680–1707) were a series of intense military conflicts.',
          hint: 'If stuck, review `c8_hist_ch2_4` to re-examine how Shivaji built hill forts and utilized.',
          misconception: 'Students often believe that the Mughal-Maratha War ended with the death of Chhatrapati Shivaji Maharaj in 1680 or the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mughal-Maratha Wars (1680–1707) were a series of intense military conflicts fought',
                  options: ['The Mughal-Maratha Wars (1680–1707) were a series of intense military conflicts fought', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'If stuck, review `c8_hist_ch2_4` to re-examine how Shivaji built hill forts and utilized light.',
                  misconception: 'Students often believe that the Mughal-Maratha War ended with the death of Chhatrapati Shivaji Maharaj in 1680 or the execution.' }
          ],
            remediations: { 'the-mughal-maratha-war-ended': { steps: ['Have the student construct a comparative timeline from 1680 to 1707 tracking leadership changes on the Maratha side.', 'Show a map of the Deccan highlighting key sieges (e.g., Satara, Sinhagad, Jinji) to demonstrate how capturing single.', 'Analyze primary account excerpts describing how Maratha raiders attacked Mughal supply convoys far behind imperial.', 'Re-evaluate the concept of "Imperial Overreach" to help the student recognize why a larger army can lose a prolonged.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_9', difficulty: 'standard',
          question: 'The Dakshina Digvijaya (1677–1678) was Chhatrapati Shivaji Maharaj’s strategic.',
          hint: 'If stuck, review how Shivaji Maharaj used diplomacy and defensive fort-building.',
          misconception: 'Students often believe that the Dakshina Digvijaya was a quick, aggressive plundering raid (similar to the early.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Dakshina Digvijaya (1677–1678) was Chhatrapati Shivaji Maharaj’s strategic southern',
                  options: ['The Dakshina Digvijaya (1677–1678) was Chhatrapati Shivaji Maharaj’s strategic southern', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'If stuck, review how Shivaji Maharaj used diplomacy and defensive fort-building in Maharashtra.',
                  misconception: 'Students often believe that the Dakshina Digvijaya was a quick, aggressive plundering raid (similar to the early Maratha campaigns.' }
          ],
            remediations: { 'the-dakshina-digvijaya-was-a': { steps: ['If a student struggles to grasp the strategic importance of the Dakshina Digvijaya, guide them through this map-based.', '**Locate the Distances:** Show the student a map of India.', 'Point out Pune/Raigad (Maharashtra) in the West, and Jinji/Vellore (Tamil Nadu) in the Southeast—over 1,000 kilometers.', '**Simulate the Threat:** Ask: "If a massive Mughal army of 300,000 soldiers invades Maharashtra, can they easily.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
