import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch07_p2: SimDef = {
    id: 'v3_c12_hist_ch07_p2',
    title: 'An Imperial Capital: Vijayanagara · Part 2/2',
    subtitle: 'The priests remembered what the stones forgot',
    classLevel: 12, subject: 'history', topic: 'An Imperial Capital: Vijayanagara · Part 2/2',
    chapters: ['c12_hist_ch07'],
    nodeIds: ['c12_hist_cbse_07_007', 'c12_hist_cbse_07_008', 'c12_hist_cbse_07_009', 'c12_hist_cbse_07_010', 'c12_hist_cbse_07_011', 'c12_hist_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Urban-history archaeologist', intro: 'A dead city spread across boulders, and a surveyor who asked the priests what they remembered.', goal: 'Trace Vijayanagara\'s rediscovery — survey, epigraphy, photography and traveller accounts — and weigh each source\'s limits.' },
    discovery: {
        question: 'Hampi lay in ruins for 250 years — yet by 1900 historians had rebuilt an empire. What did Mackenzie find that the stones alone couldn\'t say?',
        options: ['Living memory — Virupaksha\'s priests still carried the city\'s story; oral tradition bridged the gap between dead ruins and a lost capital', 'Old photographs', 'Portuguese maps', 'Inscriptions explained everything'],
        answer: 'Living memory — Virupaksha\'s priests still carried the city\'s story; oral tradition bridged the gap between dead ruins and a lost capital',
        hook: 'No single source rebuilt it — survey maps gave space, inscriptions gave dates, photographs froze form, travellers gave eyes. And the name itself is a colonial frame: contemporaries called it \'karnataka samrajyamu.\' Source criticism is the discipline\'s real tool.',
    },
    teaching: [
        { title: 'The Mahanavami Festival: Navaratri, Royal Ritual and State Display', text: 'The Mahanavami Festival was the principal state ceremony of the Vijayanagara Empire, celebrated over nine days (Navaratri) culminating on Mahanavami (the great ninth day) in September-October.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_07_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct a fallen capital like a historian: weigh priests\' memory against travellers\' detail, map what inscriptions date and what photos preserve, and test the modern label \'Vijayanagara Empire.\'',
        labels: ['The Mahanavami Festival: Navaratri,', 'The Sacred Centre: Virupaksha', 'Temple Architecture: Gopuram, Mandapa', 'Irrigation and Water Management', 'The Battle of Talikota', 'Vijayanagara\'s Economy: Trade, Horses'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_008', title: 'The Sacred Centre: Virupaksha Temple and the Hampi Bazaar',
          caseStudy: { intro: 'Imagine you are standing at the Virupaksha Temple today — the towering gopuram still dominates the landscape, and the bazaar street stretching from its gateway.',
            decisions: [{ prompt: 'What is the earliest datable phase of the Virupaksha Temple at Hampi, and which dynasty\'s inscriptions confirm it?', options: [
                { text: 'The earliest shrine dates to the 9th-10th centuries, confirmed by inscriptions from the', outcome: 'The earliest shrine dates to the 9th-10th centuries, confirmed by inscriptions from the.' },
                { text: '14th century Sangama period', outcome: 'Not quite — Students often think the Virupaksha Temple was *built* by the Vijayanagara kings from scratch.', reveals: 'the-virupaksha-temple-was-built' },
                { text: 'Vijayanagara architecture originating at Hampi', outcome: 'Not quite — Students often think the Virupaksha Temple was *built* by the Vijayanagara kings from scratch.', reveals: 'the-virupaksha-temple-was-built' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_009', title: 'Temple Architecture: Gopuram, Mandapa and the Vimana of Vijayanagara',
          caseStudy: { intro: 'Imagine standing before the eastern gopuram of the Virupaksha temple at Hampi — its nine storeys soar above you, covered in stucco figures of deities, while.',
            decisions: [{ prompt: 'What is the term used in the NCERT for the towering royal gateways of Vijayanagara temples that often dwarf the central shrine\'s tower?', options: [
                { text: 'The NCERT uses the term **raya gopuram** (royal gateway)', outcome: 'The NCERT uses the term **raya gopuram** (royal gateway). A wrong answer like "vimana".' },
                { text: 'vimana', outcome: 'Not quite — Students often think **Vijayanagara temple architecture is merely a "late phase" of Dravida style**.', reveals: 'vijayanagara-temple-architecture-is-merely' },
                { text: 'shikhara', outcome: 'Not quite — Students often think **Vijayanagara temple architecture is merely a "late phase" of Dravida style**.', reveals: 'vijayanagara-temple-architecture-is-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_010', title: 'Irrigation and Water Management: Tanks, Canals and the Tungabhadra System',
          caseStudy: { intro: 'Imagine you are standing at the ruins of Hampi today, looking at the massive stone channels that once brought water to the royal centre.',
            decisions: [{ prompt: 'Name the most important tank built in the early years of the fifteenth century at Vijayanagara and state its two primary functions.', options: [
                { text: 'The Kamalapuram tank, built in the early 15th century, irrigated nearby fields and', outcome: 'The Kamalapuram tank, built in the early 15th century, irrigated nearby fields and supplied water.' },
                { text: 'the Hiriya canal or a temple tank', outcome: 'Not quite — Students often conflate the Hiriya canal and the Kamalapuram tank, thinking both were built.', reveals: 'students-often-conflate-the-hiriya' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_011', title: 'The Battle of Talikota (1565): Rama Raya and the Fall of Vijayanagara',
          caseStudy: { intro: 'Imagine standing at the Virupaksha temple in Hampi today — the only structure where worship continued uninterrupted even after 1565.',
            decisions: [{ prompt: 'In which year was the Battle of Talikota fought, and what was the alternative name for this battle mentioned in the NCERT text?', options: [
                { text: 'The Battle of Talikota was fought in 1565 and is also called the Battle of', outcome: 'The Battle of Talikota was fought in 1565 and is also called the Battle of Rakshasi-Tangadi.' },
                { text: 'Battle of Panipat', outcome: 'Not quite — Students commonly believe the Battle of Talikota was a "Hindu vs Muslim" religious war that ended.', reveals: 'students-commonly-believe-the-battle' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_012', title: 'Vijayanagara\'s Economy: Trade, Horses and the Portuguese Connection',
          caseStudy: { intro: 'Imagine you are standing at the Virupaksha temple bazaar in Hampi today — the same street where, 500 years ago, Portuguese chronicler Domingo Paes saw rubies.',
            decisions: [{ prompt: 'From which two primary regions were war-horses imported into Vijayanagara, and which merchant community initially dominated this trade.', options: [
                { text: 'Horses were imported from Arabia and Central Asia', outcome: 'Horses were imported from Arabia and Central Asia; the trade was initially controlled by Arab.' },
                { text: 'Portugal and Persia', outcome: 'Not quite — Students believe "Vijayanagara imported horses *from* the Portuguese" — conflating the *carrier*.', reveals: 'vijayanagara-imported-horses-from-the' },
                { text: 'Indian merchants', outcome: 'Not quite — Students believe "Vijayanagara imported horses *from* the Portuguese" — conflating the *carrier*.', reveals: 'vijayanagara-imported-horses-from-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a college debate, the proposition declares: \'Vijayanagara was a Kannada nation-state fighting a religious war against Islam.\' You hold the counter.',
            decisions: [{ prompt: 'What does the chapter\'s account of the empire say?', options: [
                { text: 'Both halves are anachronistic — \'karnataka samrajyamu\' named a geopolitical region holding Tamil, Telugu and Malayalam lands under Persianised titles like \'Hindu Suratrana\', and its sultans were rivals to trade, ally and borrow from, not a civilisational enemy.', outcome: 'The chapter shows a ritual-sovereignty empire that sited its capital on the Virupaksha cult for legitimacy and adapted the iqta into amara-nayaka — 14th-century statecraft, not 19th-century nationalism.' },
                { text: 'Concede — the name \'Karnataka empire\' and Hindu title prove both claims.', outcome: 'The name described the region, not a nation, and \'Hindu Sultan\' is itself the giveaway — the empire spoke in the shared Persianate vocabulary it supposedly warred against.', reveals: 'region-name-equals-nation' },
                { text: 'Counter that it was purely pragmatic — religion and sacred geography played no real role.', outcome: 'That discards why the capital sat at Virupaksha-Pampadevi and why orders were signed in the deity\'s name: ritual legitimacy was load-bearing, even if the polity wasn\'t a modern religious state.', reveals: 'pragmatism-erases-sacrality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'You can now rebuild a lost city from layered sources — and ask whose name, whose memory, whose empire you\'re actually describing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_007', difficulty: 'standard',
          question: 'The Mahanavami Festival was the principal state ceremony of the Vijayanagara.',
          hint: 'If unclear on nayaka obligations, revisit c12_hist_cbse_07_004 and identify the specific.',
          misconception: 'Students commonly believe the Mahanavami Festival was "just a grand Hindu festival like Dussehra" and miss its specific.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mahanavami Festival was the principal state ceremony of the Vijayanagara Empire,',
                  options: ['The Mahanavami Festival was the principal state ceremony of the Vijayanagara Empire,', 'The discovery of Vijayanagara refers to the systematic archaeological and epigraphical', 'The Sangama dynasty (1336–1485) was the founding dynasty of the Vijayanagara Empire,', 'The succession of four ruling dynasties'],
                  hint: 'If unclear on nayaka obligations, revisit c12_hist_cbse_07_004 and identify the specific phrases.',
                  misconception: 'Students commonly believe the Mahanavami Festival was "just a grand Hindu festival like Dussehra" and miss its specific function as the.' }
          ],
            remediations: { 'students-commonly-believe-the-mahanavami': { steps: ['If the student conflates the festival with generic Navaratri celebrations: (1) Re-read the Paes and Nuniz excerpts.', '180–181) focusing on the words "stipulated tribute," "inspected his army," and "subordinate kings." (2) Review the.', '(3) Map each festival ceremony to one nayaka obligation: tribute presentation → revenue; army inspection → military.', '(4) Re-attempt Diagnostic Question 5 with this framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_008', difficulty: 'standard',
          question: 'The Sacred Centre of Vijayanagara refers to the northern rocky zone along the.',
          hint: 'If stuck, revisit c7_hist_ch06_007 (Temple Architecture: Nagara and Dravida Styles) and.',
          misconception: 'Students often think the Virupaksha Temple was *built* by the Vijayanagara kings from scratch in the 14th century.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Sacred Centre of Vijayanagara refers to the northern rocky zone along the Tungabhadra',
                  options: ['The Sacred Centre of Vijayanagara refers to the northern rocky zone along the Tungabhadra', 'The discovery of Vijayanagara refers to the systematic archaeological and epigraphical', 'The Sangama dynasty (1336–1485) was the founding dynasty of the Vijayanagara Empire,', 'The succession of four ruling dynasties'],
                  hint: 'If stuck, revisit c7_hist_ch06_007 (Temple Architecture: Nagara and Dravida Styles) and.',
                  misconception: 'Students often think the Virupaksha Temple was *built* by the Vijayanagara kings from scratch in the 14th century.' }
          ],
            remediations: { 'the-virupaksha-temple-was-built': { steps: ['If the student holds the "built from scratch" misconception: Step 1 — Revisit c12_hist_cbse_07_005 (Geography of the.', 'Step 2 — Study the NCERT line: "The Virupaksha temple was built over centuries...', 'earliest shrine dated to the ninth-tenth centuries." Step 3 — Compare with c8_hist_ch5_6 (Brihadiswara Temple) to see.', 'Step 4 — Re-attempt Diagnostic Question 1 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Virupaksha Temple was *built* by the Vijayanagara kings from scratch in the 14th century.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Hampi Bazaar was primarily a religious market serving pilgrims, not a centre of long-distance trade." Use evidence from Paes and.', answer: 'The statement is false',
                  options: ['The statement is false', 'Vijayanagara architecture originating at Hampi'],
                  hint: 'If stuck, revisit c7_hist_ch06_007 (Temple Architecture: Nagara and Dravida Styles) and.',
                  misconception: 'Students often think the Virupaksha Temple was *built* by the Vijayanagara kings from scratch in the 14th century.' }
          ],
            remediations: { 'the-virupaksha-temple-was-built': { steps: ['If the student holds the "built from scratch" misconception: Step 1 — Revisit c12_hist_cbse_07_005 (Geography of the.', 'Step 2 — Study the NCERT line: "The Virupaksha temple was built over centuries...', 'earliest shrine dated to the ninth-tenth centuries." Step 3 — Compare with c8_hist_ch5_6 (Brihadiswara Temple) to see.', 'Step 4 — Re-attempt Diagnostic Question 1 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_009', difficulty: 'standard',
          question: 'Temple architecture in Vijayanagara (c. 1336–1565 CE) represents the imperial.',
          hint: 'If unable to label a Dravida plan, revisit c7_hist_ch06_007 (Nagara vs Dravida) and.',
          misconception: 'Students often think **Vijayanagara temple architecture is merely a "late phase" of Dravida style** — just bigger.',
          parts: [
                { id: 'a', prompt: 'What is the term used in the NCERT for the towering royal gateways of Vijayanagara temples that often dwarf the central shrine\'s tower?', answer: 'The NCERT uses the term **raya gopuram** (royal gateway)',
                  options: ['The NCERT uses the term **raya gopuram** (royal gateway)', 'vimana', 'shikhara', 'late phase'],
                  hint: 'If unable to label a Dravida plan, revisit c7_hist_ch06_007 (Nagara vs Dravida) and c8_hist_ch5_6.',
                  misconception: 'Students often think **Vijayanagara temple architecture is merely a "late phase" of Dravida style** — just bigger versions of Chola/Pallava.' },
                { id: 'b', prompt: 'Why did Krishnadeva Raya add a massive eastern gopuram and a pillared hall to the pre-existing Virupaksha temple instead of building a new temple from scratch?', answer: 'Krishnadeva Raya expanded Virupaksha',
                  options: ['Krishnadeva Raya expanded Virupaksha', 'showing wealth', 'late phase', 'Do you think chariots would have actually been built like this?'],
                  hint: 'If unable to label a Dravida plan, revisit c7_hist_ch06_007 (Nagara vs Dravida) and c8_hist_ch5_6.',
                  misconception: 'Students often think **Vijayanagara temple architecture is merely a "late phase" of Dravida style** — just bigger versions of Chola/Pallava.' }
          ],
            remediations: { 'vijayanagara-temple-architecture-is-merely': { steps: ['If the student conflates Vijayanagara with generic Dravida: 1) Revisit **c7_hist_ch06_007** (Nagara vs Dravida) and.', '185–188 focusing on the phrases "structures of immense scale," "raya gopurams," "mandapas or pavilions and long.', '4) Re-diagnose with Question 4 — if the answer still says "both are Dravida," repeat step 1.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_010', difficulty: 'standard',
          question: 'Irrigation and water management in Vijayanagara (c. 14th–16th century) refers.',
          hint: 'If stuck, revisit the “Geography of the Capital” node (c12_hist_cbse_07_005) and the.',
          misconception: 'Students often conflate the Hiriya canal and the Kamalapuram tank, thinking both were built by Krishnadeva Raya.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Irrigation and water management in Vijayanagara (c',
                  options: ['Irrigation and water management in Vijayanagara (c', 'The discovery of Vijayanagara refers to the systematic archaeological and epigraphical', 'The Sangama dynasty (1336–1485) was the founding dynasty of the Vijayanagara Empire,', 'The succession of four ruling dynasties'],
                  hint: 'If stuck, revisit the “Geography of the Capital” node (c12_hist_cbse_07_005) and the “Amara-Nayaka.',
                  misconception: 'Students often conflate the Hiriya canal and the Kamalapuram tank, thinking both were built by Krishnadeva Raya.' }
          ],
            remediations: { 'students-often-conflate-the-hiriya': { steps: ['Re-read the “Water resources” subsection (3.1) in the NCERT chapter, noting the dynasty associated with each structure.', 'Create a two-column table: Structure | Builder Dynasty | Primary Function.', 'Watch a 5-minute video on Hampi’s aqueducts (search “Hiriya canal Vijayanagara”).', 'Re-attempt Diagnostic Questions 1 and 3, checking each answer against the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_011', difficulty: 'standard',
          question: 'The Battle of Talikota (also known as Rakshasi-Tangadi), fought in January.',
          hint: 'If stuck, revisit the dynastic timeline in node 003 (focus on 1529-1565 transition from.',
          misconception: 'Students commonly believe the Battle of Talikota was a "Hindu vs Muslim" religious war that ended South Indian Hindu.',
          parts: [
                { id: 'a', prompt: 'In which year was the Battle of Talikota fought, and what was the alternative name for this battle mentioned in the NCERT text?', answer: 'The Battle of Talikota was fought in 1565 and is also called the Battle of',
                  options: ['The Battle of Talikota was fought in 1565 and is also called the Battle of', 'Battle of Panipat'],
                  hint: 'If stuck, revisit the dynastic timeline in node 003 (focus on 1529-1565 transition from Tuluva.',
                  misconception: 'Students commonly believe the Battle of Talikota was a "Hindu vs Muslim" religious war that ended South Indian Hindu rule.' },
                { id: 'b', prompt: 'Why did the Deccan Sultanates (Bijapur, Ahmadnagar, Golconda) form an alliance against Vijayanagara in 1565, despite having fought among themselves previously?', answer: 'The Sultanates allied',
                  options: ['The Sultanates allied', 'religious differences', 'territorial ambition'],
                  hint: 'If stuck, revisit the dynastic timeline in node 003 (focus on 1529-1565 transition from Tuluva.',
                  misconception: 'Students commonly believe the Battle of Talikota was a "Hindu vs Muslim" religious war that ended South Indian Hindu rule.' },
                { id: 'c', prompt: 'Compare the Vijayanagara-Sultanate relations under Krishnadeva Raya (1509-1529) with those under Rama Raya (1542-1565).', answer: 'Krishnadeva Raya maintained a balance of power',
                  options: ['Krishnadeva Raya maintained a balance of power', 'relations were always hostile', 'establisher of the Yavana kingdom'],
                  hint: 'If stuck, revisit the dynastic timeline in node 003 (focus on 1529-1565 transition from Tuluva.',
                  misconception: 'Students commonly believe the Battle of Talikota was a "Hindu vs Muslim" religious war that ended South Indian Hindu rule.' }
          ],
            remediations: { 'students-commonly-believe-the-battle': { steps: ['If the student holds the "religious war" misconception: Step 1 — Re-read Source 2 in NCERT (Krishnadeva Raya\'s.', 'Step 2 — Map the Sultanates and Vijayanagara on the sketch map (Map 1, p.174) and trace the Raichur doab and west coast.', 'Step 4 — Re-attempt Diagnostic Question 2 and 4 with this evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_012', difficulty: 'standard',
          question: 'Vijayanagara\'s economy (c. 1336–1565 CE) was a state-directed commercial system.',
          hint: 'If unclear on *why horses mattered militarily*, revisit c12_hist_cbse_07_004.',
          misconception: 'Students believe "Vijayanagara imported horses *from* the Portuguese" — conflating the *carrier* (Portuguese ships).',
          parts: [
                { id: 'a', prompt: 'From which two primary regions were war-horses imported into Vijayanagara, and which merchant community initially dominated this trade before 1498?', answer: 'Horses were imported from Arabia and Central Asia',
                  options: ['Horses were imported from Arabia and Central Asia', 'Portugal and Persia', 'Indian merchants', 'Portuguese brought horses'],
                  hint: 'If unclear on *why horses mattered militarily*, revisit c12_hist_cbse_07_004 (amara-nayaka cavalry.',
                  misconception: 'Students believe "Vijayanagara imported horses *from* the Portuguese" — conflating the *carrier* (Portuguese ships) with the *source*.' },
                { id: 'b', prompt: 'A Portuguese document from c. 1520 states: "The King of Bisnaga buys 13,000 horses a year at 400 cruzados each." Using the amara-nayaka system.', answer: '13,000 × 400 = 5.2 million cruzados = 52% of 10 million cruzados',
                  options: ['13,000 × 400 = 5.2 million cruzados = 52% of 10 million cruzados', 'Vijayanagara imported horses *from* the Portuguese', 'Portuguese brought horses to India for the first time', 'Vijayanagara depended on Portuguese breeding programmes'],
                  hint: 'If unclear on *why horses mattered militarily*, revisit c12_hist_cbse_07_004 (amara-nayaka cavalry.',
                  misconception: 'Students believe "Vijayanagara imported horses *from* the Portuguese" — conflating the *carrier* (Portuguese ships) with the *source*.' }
          ],
            remediations: { 'vijayanagara-imported-horses-from-the': { steps: ['Re-read NCERT §2.1 "Kings and traders" (pp.', '172–173) and highlight every mention of *horse source* vs.', 'Map the route: Arabia → Hormuz → Indian west coast (Goa/Bhatkal) → Vijayanagara — label who controlled each segment.', 'Re-attempt Diagnostic Q1 and Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
