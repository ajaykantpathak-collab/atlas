import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch02_p1: SimDef = {
    id: 'v3_c8_hist_ch02_p1',
    title: 'The Rise of the Marathas · Part 1/2',
    subtitle: 'How farmers and mountains forged a warrior people',
    classLevel: 8, subject: 'history', topic: 'The Rise of the Marathas · Part 1/2',
    chapters: ['c8_hist_ch02'],
    nodeIds: ['c8_hist_ch2_1', 'c8_hist_ch2_10', 'c8_hist_ch2_11', 'c8_hist_ch2_2', 'c8_hist_ch2_3', 'c8_hist_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler in the Deccan Sultanate courts', intro: 'Walk the Pandharpur pilgrimage where thousands sing in Marathi — then ask why the Sultans can\'t hold these hills without local Maratha sardars. The answer is older than any king.', goal: 'Understand the origins of Maratha identity — the fluid Kunbi–Maratha continuum, the rise of Marathi from Maharashtri Prakrit, and how Bhakti culture and Sahyadri geography united them.' },
    discovery: {
        question: 'Long before Shivaji, farmers in Maharashtra tilled fields in the monsoon and rode as cavalry in the war season. How did peasants become a warrior identity?',
        options: ['The Kunbi–Maratha line was fluid — cultivators who fought and won land grants rose to Maratha status, bound together by the Marathi language', 'Marathas were always a fixed royal caste from ancient times', 'They were imported warriors from Central Asia', 'Anyone rich could simply buy the title'],
        answer: 'The Kunbi–Maratha line was fluid — cultivators who fought and won land grants rose to Maratha status, bound together by the Marathi language',
        hook: 'Identity wasn\'t frozen in caste. A Kunbi farmer could pick up a sword, earn a watan and become Maratha — and Bhakti poets singing abhangas in Marathi stitched farmers and warriors into one people before any empire existed.',
    },
    teaching: [
        { title: 'Who Were the Marathas: Origins and Marathi Language', text: 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior population originating in the rugged Deccan plateau of Maharashtra, whose collective identity coalesced between the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch2_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace how a scattered agrarian people fused into a political force: the rugged Sahyadri hills that made them indispensable to Deccan Sultans, the Marathi language rising from Maharashtri Prakrit, and the Bhakti movement uniting them.',
        labels: ['Who Were the Marathas', 'Maratha Confederacy: Peshwas', 'Legacy of the Maratha', 'Yadava Dynasty and Early', 'Chhatrapati Shivaji Maharaj: Early', 'Shivaji\'s Military Campaigns'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch2_11', title: 'Legacy of the Maratha Empire in Indian History',
          caseStudy: { intro: 'Have you ever wondered why the Indian Navy\'s modern crest features an octagonal seal inspired by the Rajmudra of Chhatrapati Shivaji Maharaj?',
            decisions: [{ prompt: 'Which 17th-century administrative glossary was commissioned under Chhatrapati Shivaji Maharaj to replace Persian administrative terms with.', options: [
                { text: 'The *Rajavyavahara Kosha*', outcome: 'The *Rajavyavahara Kosha*. If a student answers "Ashtapradhan" or "Chauth", they confuse.' },
                { text: 'Ashtapradhan', outcome: 'Not quite — Students frequently believe that the Maratha Empire was purely a regional guerrilla kingdom.', reveals: 'students-frequently-believe-that-the' },
                { text: 'Chauth', outcome: 'Not quite — Students frequently believe that the Maratha Empire was purely a regional guerrilla kingdom.', reveals: 'students-frequently-believe-that-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch2_3', title: 'Chhatrapati Shivaji Maharaj: Early Life and Rise',
          caseStudy: { intro: 'When you visit mountain forts like Rajgad or Torna in Maharashtra, have you ever wondered how a young teenager managed to challenge powerful empires from these.',
            decisions: [{ prompt: 'In which fort was Shivaji Maharaj born in 1630, and who were his parents?', options: [
                { text: 'Shivaji Maharaj was born at Shivneri Fort near Junnar in 1630 to Shahaji Bhonsle, a noble', outcome: 'Shivaji Maharaj was born at Shivneri Fort near Junnar in 1630 to Shahaji Bhonsle, a noble military.' },
                { text: 'Raigad or Pratapgad', outcome: 'Not quite — Students often believe that Shivaji Maharaj began his career as an officer in the Mughal or Bijapur.', reveals: 'shivaji-maharaj-began-his-career' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch2_4', title: 'Shivaji\'s Military Campaigns and Fort Building',
          caseStudy: { intro: 'Have you ever played a game of tag or hide-and-seek in a park filled with dense trees, rocks, and narrow pathways?',
            decisions: [{ prompt: 'Which was the first fort captured by Shivaji Maharaj in 1646 at the young age of 16, which marked the formal beginning of his campaign for.', options: [
                { text: 'Torna Fort (also known as Prachandagad)', outcome: 'Torna Fort (also known as Prachandagad). *What a wrong answer reveals:* If a student answers.' },
                { text: 'Raigad', outcome: 'Not quite — Students often believe that guerrilla warfare (*Ganimi Kava*) was a chaotic, disorganized form.', reveals: 'guerrilla-warfare-ganimi-kava-was' },
                { text: 'Sinhagad', outcome: 'Not quite — Students often believe that guerrilla warfare (*Ganimi Kava*) was a chaotic, disorganized form.', reveals: 'guerrilla-warfare-ganimi-kava-was' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate insists the Marathas \'appeared out of nowhere in the 1600s when Shivaji created them as a warrior caste.\' A friend points to the older Wari pilgrimage, where farmers have sung Marathi abhangas together for centuries.',
            decisions: [{ prompt: 'Whose account does the evidence support?', options: [
                { text: 'The friend\'s — Maratha identity grew for centuries before Shivaji: Kunbi cultivators served as seasonal cavalry and rose into Maratha status, while the Marathi language and Bhakti saints like Dnyaneshwar welded farmers and warriors into one regional community long before any coronation.', outcome: 'This credits the deep linguistic and cultural groundwork instead of crediting one ruler with inventing a people.' },
                { text: 'The first classmate is right — a political identity begins only when a king proclaims it, so \'Maratha\' started with Shivaji.', outcome: 'Identity is built by shared language and custom, not proclamation; the Bhakti movement and Sultanate service had fused that community by the 16th century.', reveals: 'kings-invent-peoples' },
                { text: 'Both are partly wrong — Kunbis and Marathas were always two sealed, unrelated castes with no overlap.', outcome: 'Records show the same families farmed in peace and rode as militia in war; it was a fluid continuum, not two fixed castes.', reveals: 'castes-were-sealed' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'Empires aren\'t born from crowns — they grow from soil, songs and shared words. Marathi gave farmers and horsemen one voice, and the mountains gave them a battlefield only they could master.',
            decisions: [{ prompt: 'What comes next? The Rise of the Marathas · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Rise of the Marathas · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch2_1', difficulty: 'standard',
          question: 'The term \'Marathas\' historically designates the Marathi-speaking.',
          hint: 'If confused, review Class 7 topic c7_hist_ch06_008 to recall how saint-poets like Kabir.',
          misconception: 'Students frequently believe that \'Maratha\' has always referred strictly to a single, closed royal warrior caste that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior',
                  options: ['The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,', 'The Yadava Dynasty (also known as the Seuna dynasty, c'],
                  hint: 'If confused, review Class 7 topic c7_hist_ch06_008 to recall how saint-poets like Kabir and Ravidas.',
                  misconception: 'Students frequently believe that \'Maratha\' has always referred strictly to a single, closed royal warrior caste that existed with fixed.' }
          ],
            remediations: { 'students-frequently-believe-that-maratha': { steps: ['Direct the student to examine a village revenue document (*firman* or *sanad*) showing titles: point out that the same.', 'Provide a simple Venn diagram contrasting *Kunbi* (agricultural base) and *Maratha* (military/chivalric status).', 'Have the student write a one-paragraph life narrative of a 16th-century Deccan villager explaining how his life shifted.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_10', difficulty: 'standard',
          question: 'The Maratha Confederacy refers to the decentralized political system.',
          hint: 'If stuck, review `c8_hist_ch2_6` (Shivaji\'s Administration) to refresh how the office.',
          misconception: 'Students often believe that the Maratha Empire under the Peshwas remained a tightly centralized kingdom ruled directly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Maratha Confederacy refers to the decentralized political system established in',
                  options: ['The Maratha Confederacy refers to the decentralized political system established in', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The legacy of the Maratha Empire refers to the enduring administrative, military,', 'The Yadava Dynasty (also known as the Seuna dynasty, c'],
                  hint: 'If stuck, review `c8_hist_ch2_6` (Shivaji\'s Administration) to refresh how the office of Peshwa.',
                  misconception: 'Students often believe that the Maratha Empire under the Peshwas remained a tightly centralized kingdom ruled directly from one single.' }
          ],
            remediations: { 'the-maratha-empire-under-the': { steps: ['Map Analysis: Have the student locate Pune, Satara, Gwalior (Scindia), Indore (Holkar), Baroda (Gaekwad), and Nagpur.', 'Compare and Contrast Chart: Guide the student to build a table contrasting Shivaji Maharaj\'s administration.', 'Discussion: Explain how managing an empire spanning from Punjab to Odisha required delegating power to regional.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_11', difficulty: 'standard',
          question: 'The legacy of the Maratha Empire refers to the enduring administrative.',
          hint: 'Revisit node c8_hist_ch2_10 to review how the five major Maratha families divided.',
          misconception: 'Students frequently believe that the Maratha Empire was purely a regional guerrilla kingdom confined to the hills.',
          parts: [
                { id: 'a', prompt: 'Which 17th-century administrative glossary was commissioned under Chhatrapati Shivaji Maharaj to replace Persian administrative terms with Sanskrit terminology.', answer: 'The *Rajavyavahara Kosha*',
                  options: ['The *Rajavyavahara Kosha*', 'Ashtapradhan', 'Chauth'],
                  hint: 'Revisit node c8_hist_ch2_10 to review how the five major Maratha families divided administrative.',
                  misconception: 'Students frequently believe that the Maratha Empire was purely a regional guerrilla kingdom confined to the hills of Western Maharashtra.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Direct the student to an 18th-century political map of India (circa 1770–1790) showing the territorial extent of the.', 'Have the student compare the territory under the Mughal Emperor Shah Alam II (confined to Delhi) with the vast.', 'Guide the student to construct a brief timeline from 1761 (Panipat) to 1818 (Surrender of Peshwa Baji Rao II).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_2', difficulty: 'standard',
          question: 'The Yadava Dynasty (also known as the Seuna dynasty, c. 1187–1317 CE) was.',
          hint: 'If stuck, review `c7_hist_ch06_003` to understand how regional Deccan dynasties broke.',
          misconception: 'Students frequently believe that Maratha political identity, Marathi literature, and fort architecture suddenly emerged.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Yadava Dynasty (also known as the Seuna dynasty, c',
                  options: ['The Yadava Dynasty (also known as the Seuna dynasty, c', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'If stuck, review `c7_hist_ch06_003` to understand how regional Deccan dynasties broke away from.',
                  misconception: 'Students frequently believe that Maratha political identity, Marathi literature, and fort architecture suddenly emerged out of nowhere with.' }
          ],
            remediations: { 'students-frequently-believe-that-maratha': { steps: ['Place a timeline on the board showing three distinct eras: Yadava Dynasty (1187–1317 CE) -> Deccan Sultanates.', 'Examine maps showing Yadava-era Hemadpanthi temples and forts across modern Maharashtra to visualize territorial.', 'Read an excerpt from Sant Dnyaneshwar’s *Dnyaneshwari* (written in 1290 CE under Yadava rule) to demonstrate that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_3', difficulty: 'standard',
          question: 'Chhatrapati Shivaji Maharaj (1630–1680) was the founder of the Maratha Empire.',
          hint: 'If stuck, review `c6_history_ch08_028` to understand who ruled the Deccan region before.',
          misconception: 'Students often believe that Shivaji Maharaj began his career as an officer in the Mughal or Bijapur military who later.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Chhatrapati Shivaji Maharaj (1630–1680) was the founder of the Maratha Empire in western',
                  options: ['Chhatrapati Shivaji Maharaj (1630–1680) was the founder of the Maratha Empire in western', 'The term \'Marathas\' historically designates the Marathi-speaking peasant-warrior', 'The Maratha Confederacy refers to the decentralized political system established in', 'The legacy of the Maratha Empire refers to the enduring administrative, military,'],
                  hint: 'If stuck, review `c6_history_ch08_028` to understand who ruled the Deccan region before Shivaji.',
                  misconception: 'Students often believe that Shivaji Maharaj began his career as an officer in the Mughal or Bijapur military who later rebelled due.' }
          ],
            remediations: { 'shivaji-maharaj-began-his-career': { steps: ['Point out Shahaji Bhonsle\'s position as a noble in Bijapur to establish the contrast with Shivaji\'s choices.', 'Show a map of the Pune, Chakan, and Indapur jagir given to young Shivaji under the guardianship of Jijabai and Dadoji.', 'Examine the Oath of Raireshwar (1645), where young Shivaji and his Mavala companions pledged to establish self-rule.', 'Re-evaluate the capture of Torna (1646) as an intentional declaration of sovereignty rather than a military dispute.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch2_4', difficulty: 'standard',
          question: 'Shivaji\'s military campaigns and fort-building strategy (mid-to-late 17th.',
          hint: 'If stuck, review `c8_hist_ch2_3` to understand how Shivaji\'s youth among the Mavali hills.',
          misconception: 'Students often believe that guerrilla warfare (*Ganimi Kava*) was a chaotic, disorganized form of combat used.',
          parts: [
                { id: 'a', prompt: 'Which was the first fort captured by Shivaji Maharaj in 1646 at the young age of 16, which marked the formal beginning of his campaign for *Swarajya*?', answer: 'Torna Fort (also known as Prachandagad)',
                  options: ['Torna Fort (also known as Prachandagad)', 'Raigad', 'Sinhagad'],
                  hint: 'If stuck, review `c8_hist_ch2_3` to understand how Shivaji\'s youth among the Mavali hills built his.',
                  misconception: 'Students often believe that guerrilla warfare (*Ganimi Kava*) was a chaotic, disorganized form of combat used on impulse because Shivaji’s.' }
          ],
            remediations: { 'guerrilla-warfare-ganimi-kava-was': { steps: ['If a student struggles to comprehend how guerrilla warfare worked, use this step-by-step physical simulation: 1.', '**The Map Setup:** Draw a single narrow line representing a mountain pass on a whiteboard, surrounded by high, rugged.', '**The Mughal Force:** Place a heavy, slow-moving magnet or eraser (the Mughal army with heavy carts and cavalry) inside.', 'Show how it cannot turn around easily or deploy weapons sideways.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
