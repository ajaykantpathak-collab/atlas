import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch01_p1: SimDef = {
    id: 'v3_c8_hist_ch01_p1',
    title: 'Reshaping India\'s Political Map · Part 1/2',
    subtitle: 'Raiders for gold vs. builders of empire',
    classLevel: 8, subject: 'history', topic: 'Reshaping India\'s Political Map · Part 1/2',
    chapters: ['c8_hist_ch01'],
    nodeIds: ['c8_hist_ch1_1', 'c8_hist_ch1_10', 'c8_hist_ch1_11', 'c8_hist_ch1_2', 'c8_hist_ch1_3', 'c8_hist_ch1_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a strategist at a 12th-century Rajput court', intro: 'Armies are pouring through the Khyber and Bolan passes while rival kings squabble among themselves. Work out why the invaders keep winning — and what it would have taken to stop them.', goal: 'Analyze the Turkic and Afghan invasions — the difference between Mahmud of Ghazni\'s raids and Muhammad Ghori\'s conquests, the military edge of cavalry over elephants, and how political fragmentation enabled the Delhi Sultanate.' },
    discovery: {
        question: 'Indian armies had massive war elephants and famous warrior clans — so how did smaller Turkic armies keep beating them on open plains like Tarain?',
        options: ['Horse archers with iron stirrups could outrun and outflank slow elephants — and divided Rajput kingdoms couldn\'t unite to stop them', 'Indian warriors simply weren\'t brave enough', 'The elephants refused to fight', 'Turkic armies were ten times bigger'],
        answer: 'Horse archers with iron stirrups could outrun and outflank slow elephants — and divided Rajput kingdoms couldn\'t unite to stop them',
        hook: 'It wasn\'t a courage gap — it was a technology and unity gap. Mobile cavalry beat elephants, and rival kingdoms guarding separate forts got picked off one by one. Mahmud raided for gold; Ghori stayed to rule.',
    },
    teaching: [
        { title: 'Invasions from Central Asia: Turkic and Afghan Invaders', text: 'The Turkic and Afghan invasions refer to a series of military campaigns into northern India between the late 10th and late 12th centuries CE, led primarily by rulers of the Ghaznavid and Ghurid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch1_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Investigate two very different invaders: Mahmud of Ghazni, who plundered temple wealth and left, versus Muhammad Ghori, who stayed to build an empire — then explain how the Second Battle of Tarain in 1192 opened Delhi to a whole new Sultanate.',
        labels: ['Invasions from Central Asia', 'Akbar\'s Reign: Administration', 'Impact of Invasions', 'Delhi Sultanate: Establishment', 'Mamluk (Slave) Dynasty: Qutb-ud-din', 'Khilji Dynasty: Alauddin Khilji\'s'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch1_10', title: 'Akbar\'s Reign: Administration and Religious Policy',
          caseStudy: { intro: 'Imagine visiting the grand sandstone city of Fatehpur Sikri and standing inside a unique hall called the Ibadat Khana, where thinkers from different faiths.',
            decisions: [{ prompt: 'Who was the revenue minister under Akbar who introduced a standardized land assessment system known as Zabt?', options: [
                { text: 'Raja Todar Mal was Akbar\'s revenue minister who implemented the Zabt system based on', outcome: 'Raja Todar Mal was Akbar\'s revenue minister who implemented the Zabt system based on careful land.' },
                { text: 'Din-i-Ilahi', outcome: 'Not quite — Students often believe that Akbar created a brand-new, mandatory religion called "Din-i-Ilahi" and.', reveals: 'akbar-created-a-brand-new' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch1_2', title: 'Delhi Sultanate: Establishment and Early Rulers',
          caseStudy: { intro: 'Imagine standing near the Qutb Minar complex in Mehrauli, South Delhi, looking at stone towers built more than 800 years ago.',
            decisions: [{ prompt: 'In which year was the Delhi Sultanate established, and who was its first ruler?', options: [
                { text: 'The Delhi Sultanate was established in 1206 CE by Qutb-ud-din Aibak', outcome: 'The Delhi Sultanate was established in 1206 CE by Qutb-ud-din Aibak.' },
                { text: 'Mahmud of Ghazni (early 11th century)', outcome: 'Not quite — Students frequently believe that the Delhi Sultanate was established as a direct extension of.', reveals: 'students-frequently-believe-that-the' },
                { text: 'Muhammad of Ghur', outcome: 'Not quite — Students frequently believe that the Delhi Sultanate was established as a direct extension of.', reveals: 'students-frequently-believe-that-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For a history debate, Ravi argues: \'Mahmud of Ghazni and Muhammad Ghori did the same thing — both invaded to build an empire in Delhi, and both beat the Rajputs because Rajputs were cowards.\'',
            decisions: [{ prompt: 'Which parts of his argument fail the evidence?', options: [
                { text: 'Both parts. Mahmud raided for temple wealth to fund his Ghazni empire and never tried to govern the Gangetic plain; Ghori, 150 years later, annexed territory and left governors behind — leading to the Delhi Sultanate. And the Rajputs were famously brave: they lost to mobile horse archers with stirrups outmanoeuvring war elephants, plus rival kingdoms that never united.', outcome: 'This separates plunder from conquest and replaces a \'bravery\' story with structural causes — technology and political fragmentation.' },
                { text: 'Ravi is right — an invader is an invader, and whichever side loses a battle was simply less brave.', outcome: 'That erases the raid-versus-conquest distinction and ignores that the Rajputs actually defeated Ghori at the First Battle of Tarain in 1191 — courage was not the deficit; coordination and cavalry tactics were.', reveals: 'invaders-all-alike' },
                { text: 'The motives differed, but the Rajputs did lose because elephants are useless animals in any battle.', outcome: 'Elephants had won Indian battles for centuries; the failure was tactical — fast horse archers circling and panicking them — not the animals being inherently useless.', reveals: 'blame-the-elephants' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch1_4', title: 'The bigger picture',
          caseStudy: { intro: 'Plunder and conquest are not the same invasion. Mahmud took the treasure home; Ghori left governors behind. Fragmented kingdoms + fast cavalry = a new political map for North India.',
            decisions: [{ prompt: 'What comes next? Reshaping India\'s Political Map · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Reshaping India\'s Political Map · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch1_1', difficulty: 'standard',
          question: 'The Turkic and Afghan invasions refer to a series of military campaigns into.',
          hint: 'If struggling, review Class 7 node `c7_hist_ch07_002` (Turkic Invasions) and.',
          misconception: 'Students often assume that Mahmud of Ghazni and Muhammad Ghori were identical in their motives and that both set out.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Turkic and Afghan invasions refer to a series of military campaigns into northern',
                  options: ['The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions', 'The Delhi Sultanate was a major medieval Islamic polity based in Delhi that ruled'],
                  hint: 'If struggling, review Class 7 node `c7_hist_ch07_002` (Turkic Invasions) and `c7_hist_ch07_003`.',
                  misconception: 'Students often assume that Mahmud of Ghazni and Muhammad Ghori were identical in their motives and that both set out with the single goal.' }
          ],
            remediations: { 'mahmud-of-ghazni-and-muhammad': { steps: ['Draw a comparative two-column chart labeled "Mahmud of Ghazni (1000–1027 CE)" and "Muhammad Ghori (1175–1206 CE)".', 'Trace their operational routes on a map: show Ghazni raiding deep into temple hubs (Mathura, Somnath) and returning.', 'Highlight the distinction between "resource extraction" (raiding) and "state formation" (empire-building).', 'Re-assess the student by giving them three historical scenario descriptions and asking them to classify each as either.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_10', difficulty: 'standard',
          question: 'Akbar\'s reign (1556–1605) established a centralized administrative framework.',
          hint: 'If confused about Akbar\'s governance, review c8_hist_ch1_9 to see how Babur\'s initial.',
          misconception: 'Students often believe that Akbar created a brand-new, mandatory religion called "Din-i-Ilahi" and forced all his.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the',
                  options: ['Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions', 'The Delhi Sultanate was a major medieval Islamic polity based in Delhi that ruled'],
                  hint: 'If confused about Akbar\'s governance, review c8_hist_ch1_9 to see how Babur\'s initial military.',
                  misconception: 'Students often believe that Akbar created a brand-new, mandatory religion called "Din-i-Ilahi" and forced all his subjects to convert.' }
          ],
            remediations: { 'akbar-created-a-brand-new': { steps: ['Examine primary court accounts describing Akbar\'s discussions in the Ibadat Khana to observe that attendees retained.', 'Compare the official state directive of Sulh-i Kul (which applied to the entire empire, revoking taxes like Jizya) with.', 'Create a two-column chart contrasting "State Policy (Sulh-i Kul)" with "Personal Court Ethics (Din-i-Ilahi)" to clarify.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Akbar created a brand-new, mandatory religion called "Din-i-Ilahi" and forced all his.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Akbar\'s administrative success was entirely dependent on military conquest rather than revenue and civil governance." Do you agree.', answer: 'Disagree',
                  options: ['Disagree', 'Din-i-Ilahi'],
                  hint: 'If confused about Akbar\'s governance, review c8_hist_ch1_9 to see how Babur\'s initial military.',
                  misconception: 'Students often believe that Akbar created a brand-new, mandatory religion called "Din-i-Ilahi" and forced all his subjects to convert.' }
          ],
            remediations: { 'akbar-created-a-brand-new': { steps: ['Examine primary court accounts describing Akbar\'s discussions in the Ibadat Khana to observe that attendees retained.', 'Compare the official state directive of Sulh-i Kul (which applied to the entire empire, revoking taxes like Jizya) with.', 'Create a two-column chart contrasting "State Policy (Sulh-i Kul)" with "Personal Court Ethics (Din-i-Ilahi)" to clarify.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_11', difficulty: 'standard',
          question: 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal.',
          hint: 'If stuck, review how the Delhi Sultanate collected taxes and distributed lands under the.',
          misconception: 'Students often believe that medieval invasions resulted solely in continuous destruction, economic collapse, and social.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions',
                  options: ['The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The Delhi Sultanate was a major medieval Islamic polity based in Delhi that ruled'],
                  hint: 'If stuck, review how the Delhi Sultanate collected taxes and distributed lands under the Iqta.',
                  misconception: 'Students often believe that medieval invasions resulted solely in continuous destruction, economic collapse, and social devastation across.' }
          ],
            remediations: { 'medieval-invasions-resulted-solely-in': { steps: ['Have the student review a map of 14th-century trade routes connecting Delhi to Central Asia and Gujarat.', 'Compare a list of pre-invasion agricultural tools with post-invasion additions like the Persian Wheel (Rahat).', 'Guide the student to complete a two-column chart separating "Short-Term Military Impacts" from "Long-Term Economic &.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_2', difficulty: 'standard',
          question: 'The Delhi Sultanate was a major medieval Islamic polity based in Delhi that.',
          hint: 'Review the outcome of the Second Battle of Tarain (1192 CE) and examine why Muhammad.',
          misconception: 'Students frequently believe that the Delhi Sultanate was established as a direct extension of a unified foreign foreign.',
          parts: [
                { id: 'a', prompt: 'In which year was the Delhi Sultanate established, and who was its first ruler?', answer: 'The Delhi Sultanate was established in 1206 CE by Qutb-ud-din Aibak',
                  options: ['The Delhi Sultanate was established in 1206 CE by Qutb-ud-din Aibak', 'Mahmud of Ghazni (early 11th century)', 'Muhammad of Ghur'],
                  hint: 'Review the outcome of the Second Battle of Tarain (1192 CE) and examine why Muhammad of Ghur left.',
                  misconception: 'Students frequently believe that the Delhi Sultanate was established as a direct extension of a unified foreign foreign empire that.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Direct the student to examine a timeline and map showing the fractured Ghurid empire after 1206 CE.', 'Walk through the three rival generals: Yaldiz in Ghazni, Qabacha in Sindh, and Aibak in Delhi/Lahore.', 'Ask: "If Aibak stayed loyal to Ghazni, who would get India\'s wealth?" Guide them to deduce that by declaring.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_3', difficulty: 'standard',
          question: 'The Mamluk Dynasty (1206–1290 CE) was the founding dynasty of the Delhi.',
          hint: 'If stuck, revisit node `c8_hist_ch1_2` to review how Muhammad Ghori\'s campaigns.',
          misconception: 'Students frequently believe that the rulers of the Mamluk Dynasty were continuously enslaved while ruling, or that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mamluk Dynasty (1206–1290 CE) was the founding dynasty of the Delhi Sultanate,',
                  options: ['The Mamluk Dynasty (1206–1290 CE) was the founding dynasty of the Delhi Sultanate,', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions'],
                  hint: 'If stuck, revisit node `c8_hist_ch1_2` to review how Muhammad Ghori\'s campaigns established Turkic.',
                  misconception: 'Students frequently believe that the rulers of the Mamluk Dynasty were continuously enslaved while ruling, or that sovereign power was.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Direct the student to trace the individual life paths of Qutb-ud-din Aibak and Shams-ud-din Iltutmish: step 1 (Purchase.', 'Compare a hereditary kingdom (where the eldest son automatically succeeds) with the early Delhi Sultanate (where the.', 'Reinforce the Arabic origin of the word *Mamluk* (\'one who is owned\') as an institutional military class, contrasting.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch1_4', difficulty: 'standard',
          question: 'The Khilji Dynasty (1290–1320 CE), led primarily by Sultan Alauddin Khilji (r.',
          hint: 'If stuck, review how Iltutmish organized the *Iqta* system in `c8_hist_ch1_3` and notice.',
          misconception: 'Students often believe that Alauddin Khilji\'s market control policy was a benevolent social welfare scheme created.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Khilji Dynasty (1290–1320 CE), led primarily by Sultan Alauddin Khilji (r',
                  options: ['The Khilji Dynasty (1290–1320 CE), led primarily by Sultan Alauddin Khilji (r', 'The Turkic and Afghan invasions refer to a series of military campaigns into northern', 'Akbar\'s reign (1556–1605) established a centralized administrative framework through the', 'The socio-economic impacts of Central Asian, Turkic, Afghan, and Mughal invasions'],
                  hint: 'If stuck, review how Iltutmish organized the *Iqta* system in `c8_hist_ch1_3` and notice how local.',
                  misconception: 'Students often believe that Alauddin Khilji\'s market control policy was a benevolent social welfare scheme created to help poor citizens.' }
          ],
            remediations: { 'alauddin-khilji-s-market-control': { steps: ['Direct the student to trace the chain of cause and effect: Mongol Threat -> Need for Large Army -> Cash Salary Burden.', 'Have the student examine historical source excerpts (such as Ziauddin Barani\'s *Tarikh-i-Firuz Shahi*) describing the.', 'Ask the student to answer: "If a farmer is forced to sell wheat at a fixed cheap price in Delhi, does the farmer profit.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
