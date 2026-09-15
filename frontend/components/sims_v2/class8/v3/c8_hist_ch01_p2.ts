import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch01_p2: SimDef = {
    id: 'v3_c8_hist_ch01_p2',
    title: 'Reshaping India\'s Political Map · Part 2/2',
    subtitle: 'Raiders for gold vs. builders of empire',
    classLevel: 8, subject: 'history', topic: 'Reshaping India\'s Political Map · Part 2/2',
    chapters: ['c8_hist_ch01'],
    nodeIds: ['c8_hist_ch1_5', 'c8_hist_ch1_6', 'c8_hist_ch1_7', 'c8_hist_ch1_8', 'c8_hist_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a strategist at a 12th-century Rajput court', intro: 'Armies are pouring through the Khyber and Bolan passes while rival kings squabble among themselves. Work out why the invaders keep winning — and what it would have taken to stop them.', goal: 'Analyze the Turkic and Afghan invasions — the difference between Mahmud of Ghazni\'s raids and Muhammad Ghori\'s conquests, the military edge of cavalry over elephants, and how political fragmentation enabled the Delhi Sultanate.' },
    discovery: {
        question: 'Indian armies had massive war elephants and famous warrior clans — so how did smaller Turkic armies keep beating them on open plains like Tarain?',
        options: ['Horse archers with iron stirrups could outrun and outflank slow elephants — and divided Rajput kingdoms couldn\'t unite to stop them', 'Indian warriors simply weren\'t brave enough', 'The elephants refused to fight', 'Turkic armies were ten times bigger'],
        answer: 'Horse archers with iron stirrups could outrun and outflank slow elephants — and divided Rajput kingdoms couldn\'t unite to stop them',
        hook: 'It wasn\'t a courage gap — it was a technology and unity gap. Mobile cavalry beat elephants, and rival kingdoms guarding separate forts got picked off one by one. Mahmud raided for gold; Ghori stayed to rule.',
    },
    teaching: [
        { title: 'Tughlaq Dynasty: Muhammad bin Tughlaq\'s Experiments', text: 'Muhammad bin Tughlaq (reign 1325–1351 CE) was a ruler of the Tughlaq Dynasty of the Delhi Sultanate who is famous for introducing highly ambitious, innovative administrative and economic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch1_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Investigate two very different invaders: Mahmud of Ghazni, who plundered temple wealth and left, versus Muhammad Ghori, who stayed to build an empire — then explain how the Second Battle of Tarain in 1192 opened Delhi to a whole new Sultanate.',
        labels: ['Tughlaq Dynasty: Muhammad bin', 'Lodhi Dynasty: Last Afghan', 'Vijayanagara Empire: Foundation', 'Bahmani Sultanate: Rise', 'Mughal Empire: Babur'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'dissect', nodeId: 'c8_hist_ch1_6', title: 'Identify each idea',
          dissect: { specimen: 'Reshaping India\'s Political Map · Part 2/2', spots: [
            { id: 's1', label: 'Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', prompt: 'Which idea is this? — Muhammad bin Tughlaq (reign 1325–1351 CE) was a ruler of the Tughlaq Dynasty of the Delhi.', answer: 'Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', options: ['Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', 'Lodhi Dynasty Last Afghan Rulers of Delhi', 'Vijayanagara Empire Foundation and Significance', 'Bahmani Sultanate Rise in the Deccan'] },
            { id: 's2', label: 'Lodhi Dynasty Last Afghan Rulers of Delhi', prompt: 'Which idea is this? — The Lodhi Dynasty (1451–1526 CE) was the fifth and final ruling dynasty of the Delhi.', answer: 'Lodhi Dynasty Last Afghan Rulers of Delhi', options: ['Lodhi Dynasty Last Afghan Rulers of Delhi', 'Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', 'Vijayanagara Empire Foundation and Significance', 'Bahmani Sultanate Rise in the Deccan'] },
            { id: 's3', label: 'Vijayanagara Empire Foundation and Significance', prompt: 'Which idea is this? — The Vijayanagara Empire was a major South Indian empire founded in 1336 CE along the.', answer: 'Vijayanagara Empire Foundation and Significance', options: ['Vijayanagara Empire Foundation and Significance', 'Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', 'Lodhi Dynasty Last Afghan Rulers of Delhi', 'Bahmani Sultanate Rise in the Deccan'] },
            { id: 's4', label: 'Bahmani Sultanate Rise in the Deccan', prompt: 'Which idea is this? — The Bahmani Sultanate was the first independent Islamic kingdom in the Deccan region.', answer: 'Bahmani Sultanate Rise in the Deccan', options: ['Bahmani Sultanate Rise in the Deccan', 'Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', 'Lodhi Dynasty Last Afghan Rulers of Delhi', 'Vijayanagara Empire Foundation and Significance'] },
            { id: 's5', label: 'Mughal Empire Babur and the Battle of Panipat 1526', prompt: 'Which idea is this? — The First Battle of Panipat (21 April 1526) was a landmark military conflict fought near.', answer: 'Mughal Empire Babur and the Battle of Panipat 1526', options: ['Mughal Empire Babur and the Battle of Panipat 1526', 'Tughlaq Dynasty Muhammad bin Tughlaqs Experiments', 'Lodhi Dynasty Last Afghan Rulers of Delhi', 'Vijayanagara Empire Foundation and Significance'] }
          ] } },
        { type: 'case', nodeId: 'c8_hist_ch1_5', title: 'Use it in the wild',
          caseStudy: { intro: 'For a history debate, Ravi argues: \'Mahmud of Ghazni and Muhammad Ghori did the same thing — both invaded to build an empire in Delhi, and both beat the Rajputs because Rajputs were cowards.\'',
            decisions: [{ prompt: 'Which parts of his argument fail the evidence?', options: [
                { text: 'Both parts. Mahmud raided for temple wealth to fund his Ghazni empire and never tried to govern the Gangetic plain; Ghori, 150 years later, annexed territory and left governors behind — leading to the Delhi Sultanate. And the Rajputs were famously brave: they lost to mobile horse archers with stirrups outmanoeuvring war elephants, plus rival kingdoms that never united.', outcome: 'This separates plunder from conquest and replaces a \'bravery\' story with structural causes — technology and political fragmentation.' },
                { text: 'Ravi is right — an invader is an invader, and whichever side loses a battle was simply less brave.', outcome: 'That erases the raid-versus-conquest distinction and ignores that the Rajputs actually defeated Ghori at the First Battle of Tarain in 1191 — courage was not the deficit; coordination and cavalry tactics were.', reveals: 'invaders-all-alike' },
                { text: 'The motives differed, but the Rajputs did lose because elephants are useless animals in any battle.', outcome: 'Elephants had won Indian battles for centuries; the failure was tactical — fast horse archers circling and panicking them — not the animals being inherently useless.', reveals: 'blame-the-elephants' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Plunder and conquest are not the same invasion. Mahmud took the treasure home; Ghori left governors behind. Fragmented kingdoms + fast cavalry = a new political map for North India.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch1_5', difficulty: 'standard',
          question: 'Muhammad bin Tughlaq (reign 1325–1351 CE) was a ruler of the Tughlaq Dynasty.',
          hint: 'If stuck, review the military conquests and administrative centralisation of Alauddin.',
          misconception: 'Students frequently believe that Muhammad bin Tughlaq’s experiments failed because he was an eccentric, irrational,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Muhammad bin Tughlaq (reign 1325–1351 CE) was a ruler of the Tughlaq Dynasty of the Delhi',
                  options: ['Muhammad bin Tughlaq (reign 1325–1351 CE) was a ruler of the Tughlaq Dynasty of the Delhi', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions'],
                  hint: 'If stuck, review the military conquests and administrative centralisation of Alauddin Khilji.',
                  misconception: 'Students frequently believe that Muhammad bin Tughlaq’s experiments failed because he was an eccentric, irrational, or "mad" ruler who made.' }
          ],
            remediations: { 'students-frequently-believe-that-muhammad': { steps: ['If a student struggles to understand this concept, use the "Plan vs.', 'Draw a two-column table on a board or paper.', 'Label Column 1: **"The Sultan\'s Brilliant Idea (The Plan)"** and Column 2: **"What He Forgot to Consider (The Execution.', 'For the Token Currency: Write "Replace silver with cheap copper/brass to save precious metals" in Column 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe that Muhammad bin Tughlaq’s experiments failed because he was an eccentric, irrational,.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: *"Muhammad bin Tughlaq was a foolish ruler who lacked any foresight."* Use his capital shift experiment to argue against this.', answer: 'The statement is inaccurate',
                  options: ['The statement is inaccurate', 'strategic intent', 'operational execution'],
                  hint: 'If stuck, review the military conquests and administrative centralisation of Alauddin Khilji.',
                  misconception: 'Students frequently believe that Muhammad bin Tughlaq’s experiments failed because he was an eccentric, irrational, or "mad" ruler who made.' }
          ],
            remediations: { 'students-frequently-believe-that-muhammad': { steps: ['If a student struggles to understand this concept, use the "Plan vs.', 'Draw a two-column table on a board or paper.', 'Label Column 1: **"The Sultan\'s Brilliant Idea (The Plan)"** and Column 2: **"What He Forgot to Consider (The Execution.', 'For the Token Currency: Write "Replace silver with cheap copper/brass to save precious metals" in Column 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_6', difficulty: 'standard',
          question: 'The Lodhi Dynasty (1451–1526 CE) was the fifth and final ruling dynasty of the.',
          hint: 'If stuck, review how Muhammad bin Tughlaq\'s failed experiments (c8_hist_ch1_5) and.',
          misconception: 'Students frequently believe that Ibrahim Lodhi was defeated by Babur purely because Babur possessed gunpowder and.',
          parts: [
                { id: 'a', prompt: 'In 1504 CE, Sikandar Lodhi established a new city that later became a major imperial capital.', answer: 'Sikandar Lodhi founded Agra in 1504 CE',
                  options: ['Sikandar Lodhi founded Agra in 1504 CE', 'Agra was created purely for architectural or personal aesthetic reasons'],
                  hint: 'If stuck, review how Muhammad bin Tughlaq\'s failed experiments (c8_hist_ch1_5) and Timur\'s invasion.',
                  misconception: 'Students frequently believe that Ibrahim Lodhi was defeated by Babur purely because Babur possessed gunpowder and superior cannons, viewing.' }
          ],
            remediations: { 'students-frequently-believe-that-ibrahim': { steps: ['Draw a political cause-and-effect flowchart: Tribal Afghan Nobility -> Alienation by Ibrahim Lodhi -> Invitation sent.', 'Compare court etiquette visually: Bahlul Lodhi sitting on a carpet with nobles as "first among equals" vs.', 'Ibrahim Lodhi seated on a high throne forcing nobles to stand in submission.', 'Emphasize that while gunpowder determined tactical success on the battlefield, political betrayal created the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_7', difficulty: 'standard',
          question: 'The Vijayanagara Empire was a major South Indian empire founded in 1336.',
          hint: 'If stuck, review node `c8_hist_ch1_5` to see why the Delhi Sultanate lost political hold.',
          misconception: 'Students often mistakenly believe that the Vijayanagara Empire was established solely as an isolated religious fortress.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Vijayanagara Empire was a major South Indian empire founded in 1336 CE along the',
                  options: ['The Vijayanagara Empire was a major South Indian empire founded in 1336 CE along the', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions'],
                  hint: 'If stuck, review node `c8_hist_ch1_5` to see why the Delhi Sultanate lost political hold over the.',
                  misconception: 'Students often mistakenly believe that the Vijayanagara Empire was established solely as an isolated religious fortress created purely.' }
          ],
            remediations: { 'students-often-mistakenly-believe-that': { steps: ['Locate Hampi on a physical map and identify the Tungabhadra river valley and Raichur Doab to show agricultural value.', 'Examine a list of trade items imported by Vijayanagara (e.g., Arabian horses, silk) to highlight economic motives.', 'Compare administrative titles to show how Sangama rulers adopted established regional administrative traditions (such.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_8', difficulty: 'standard',
          question: 'The Bahmani Sultanate was the first independent Islamic kingdom in the Deccan.',
          hint: 'Revisit topic `c8_hist_ch1_5` to review Muhammad bin Tughlaq\'s experiments and the.',
          misconception: 'Students often believe that the Bahmani Sultanate was a monolithic, centrally controlled empire that fell solely due.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Bahmani Sultanate was the first independent Islamic kingdom in the Deccan region of',
                  options: ['The Bahmani Sultanate was the first independent Islamic kingdom in the Deccan region of', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions'],
                  hint: 'Revisit topic `c8_hist_ch1_5` to review Muhammad bin Tughlaq\'s experiments and the rebellion.',
                  misconception: 'Students often believe that the Bahmani Sultanate was a monolithic, centrally controlled empire that fell solely due to external attacks.' }
          ],
            remediations: { 'the-bahmani-sultanate-was-a': { steps: ['When a student struggles with this concept: 1.', 'Draw a flow diagram showing the original 4 provinces (*tarafs*) split into 8 under Mahmud Gawan, highlighting how this.', 'Compare two noble profiles: an *Afaqi* (Persian scholar/trader favored for high administration) vs.', 'a *Deccani* (local noble holding traditional land grants), showing their competing economic and political interests.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_9', difficulty: 'standard',
          question: 'The First Battle of Panipat (21 April 1526) was a landmark military conflict.',
          hint: 'If stuck, review `c8_hist_ch1_6` to see how discontented nobles like Daulat Khan Lodi.',
          misconception: 'Students frequently believe that Babur won the Battle of Panipat simply because his cannons killed the entire Afghan.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The First Battle of Panipat (21 April 1526) was a landmark military conflict fought near',
                  options: ['The First Battle of Panipat (21 April 1526) was a landmark military conflict fought near', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions'],
                  hint: 'If stuck, review `c8_hist_ch1_6` to see how discontented nobles like Daulat Khan Lodi invited.',
                  misconception: 'Students frequently believe that Babur won the Battle of Panipat simply because his cannons killed the entire Afghan army instantly.' }
          ],
            remediations: { 'students-frequently-believe-that-babur': { steps: ['To fix this misconception, draw or review a tactical map of the Battle of Panipat showing Babur\'s defensive layout: 1.', 'Show the city of Panipat guarding Babur\'s right flank and a ditch filled with brushwood guarding his left flank.', 'Highlight the line of 700 carts (*araba*) tied together in the center with mantlets (wooden shields) between them for.', 'Trace the arching arrows of the *tulughma* divisions circling around Lodi\'s flanks.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
