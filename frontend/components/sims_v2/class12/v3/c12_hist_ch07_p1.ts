import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch07_p1: SimDef = {
    id: 'v3_c12_hist_ch07_p1',
    title: 'An Imperial Capital: Vijayanagara · Part 1/2',
    subtitle: 'The priests remembered what the stones forgot',
    classLevel: 12, subject: 'history', topic: 'An Imperial Capital: Vijayanagara · Part 1/2',
    chapters: ['c12_hist_ch07'],
    nodeIds: ['c12_hist_cbse_07_001', 'c12_hist_cbse_07_002', 'c12_hist_cbse_07_003', 'c12_hist_cbse_07_004', 'c12_hist_cbse_07_005', 'c12_hist_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Urban-history archaeologist', intro: 'A dead city spread across boulders, and a surveyor who asked the priests what they remembered.', goal: 'Trace Vijayanagara\'s rediscovery — survey, epigraphy, photography and traveller accounts — and weigh each source\'s limits.' },
    discovery: {
        question: 'Hampi lay in ruins for 250 years — yet by 1900 historians had rebuilt an empire. What did Mackenzie find that the stones alone couldn\'t say?',
        options: ['Living memory — Virupaksha\'s priests still carried the city\'s story; oral tradition bridged the gap between dead ruins and a lost capital', 'Old photographs', 'Portuguese maps', 'Inscriptions explained everything'],
        answer: 'Living memory — Virupaksha\'s priests still carried the city\'s story; oral tradition bridged the gap between dead ruins and a lost capital',
        hook: 'No single source rebuilt it — survey maps gave space, inscriptions gave dates, photographs froze form, travellers gave eyes. And the name itself is a colonial frame: contemporaries called it \'karnataka samrajyamu.\' Source criticism is the discipline\'s real tool.',
    },
    teaching: [
        { title: 'Discovery of Vijayanagara: Mackenzie, Sewell and the Rayas of Karnataka', text: 'The discovery of Vijayanagara refers to the systematic archaeological and epigraphical recovery of the ruined capital city (Hampi) beginning with Colonel Colin Mackenzie\'s 1800 survey, followed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct a fallen capital like a historian: weigh priests\' memory against travellers\' detail, map what inscriptions date and what photos preserve, and test the modern label \'Vijayanagara Empire.\'',
        labels: ['Discovery of Vijayanagara: Mackenzie,', 'Founding of the Empire', 'The Three Dynasties: Sangama,', 'Rayas and Nayakas', 'Geography of the Capital', 'The Royal Centre: Mahanavami'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_001', title: 'Discovery of Vijayanagara: Mackenzie, Sewell and the Rayas of Karnataka',
          caseStudy: { intro: 'Imagine you visit Hampi today and see the Virupaksha temple still functioning while massive stone ruins sprawl across a boulder-strewn landscape.',
            decisions: [{ prompt: 'In what year did Colin Mackenzie first visit the ruins of Hampi, and what was his official position at the time?', options: [
                { text: 'Colin Mackenzie visited Hampi in 1800 as an engineer and antiquarian employed by the', outcome: 'Colin Mackenzie visited Hampi in 1800 as an engineer and antiquarian employed by the English East.' },
                { text: 'Robert Sewell', outcome: 'Not quite — Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten.', reveals: 'robert-sewell-discovered-vijayanagara-because' },
                { text: 'discovery', outcome: 'Not quite — Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten.', reveals: 'robert-sewell-discovered-vijayanagara-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_004', title: 'Rayas and Nayakas: The Amara-Nayaka System of Military Tenure',
          caseStudy: { intro: 'Imagine you are standing at the Mahanavami Dibba in Hampi during the Navaratri festival: rows of nayakas arrive with elephants, horses, and treasure chests.',
            decisions: [{ prompt: 'What is the literal meaning of the term "amara" in the Amara-Nayaka system, and which two linguistic roots do historians propose for it?', options: [
                { text: '"Amara" is derived either from Sanskrit *samara* (battle/war) or Persian *amir* (high', outcome: '"Amara" is derived either from Sanskrit *samara* (battle/war) or Persian *amir* (high.' },
                { text: 'amara means land grant', outcome: 'Not quite — Students conflate the Amara-Nayaka system with European feudalism: they assume nayakas were "feudal.', reveals: 'students-conflate-the-amara-nayaka' },
                { text: 'amara comes from Arabic *amir* meaning peasant', outcome: 'Not quite — Students conflate the Amara-Nayaka system with European feudalism: they assume nayakas were "feudal.', reveals: 'students-conflate-the-amara-nayaka' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_005', title: 'Geography of the Capital: Tungabhadra, Natural Defences and the Setting',
          caseStudy: { intro: 'Imagine you are standing on Matanga Hill at Hampi today, looking down at the boulder-strewn landscape cut by the Tungabhadra.',
            decisions: [{ prompt: 'What is the name of the most important tank built in the early 15th century to meet Vijayanagara’s water needs, and from which river did.', options: [
                { text: 'The Kamalapuram tank (early 15th century) and the Hiriya canal drew water from the', outcome: 'The Kamalapuram tank (early 15th century) and the Hiriya canal drew water from the Tungabhadra.' },
                { text: 'Tungabhadra tank', outcome: 'Not quite — Students often think the *granite hills alone* made Vijayanagara impregnable, and that the.', reveals: 'the-granite-hills-alone-made' },
                { text: 'Krishna River', outcome: 'Not quite — Students often think the *granite hills alone* made Vijayanagara impregnable, and that the.', reveals: 'the-granite-hills-alone-made' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_006', title: 'The Royal Centre: Mahanavami Dibba and the Great Platform',
          caseStudy: { intro: 'Imagine standing on the Mahanavami Dibba at Hampi today — a 40-foot-high stone platform covered in carvings of dancers, hunters, and elephants.',
            decisions: [{ prompt: 'Identify the two most impressive platforms in the "king\'s palace" enclosure of the Royal Centre and state the approximate base area and.', options: [
                { text: 'The two platforms are the "audience hall" and the "Mahanavami Dibba"', outcome: 'The two platforms are the "audience hall" and the "Mahanavami Dibba".' },
                { text: 'Royal Centre', outcome: 'Not quite — Students often think the "Royal Centre" was the king’s private residence — a palace where he lived.', reveals: 'the-royal-centre-was-the' },
                { text: 'palace', outcome: 'Not quite — Students often think the "Royal Centre" was the king’s private residence — a palace where he lived.', reveals: 'the-royal-centre-was-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a college debate, the proposition declares: \'Vijayanagara was a Kannada nation-state fighting a religious war against Islam.\' You hold the counter.',
            decisions: [{ prompt: 'What does the chapter\'s account of the empire say?', options: [
                { text: 'Both halves are anachronistic — \'karnataka samrajyamu\' named a geopolitical region holding Tamil, Telugu and Malayalam lands under Persianised titles like \'Hindu Suratrana\', and its sultans were rivals to trade, ally and borrow from, not a civilisational enemy.', outcome: 'The chapter shows a ritual-sovereignty empire that sited its capital on the Virupaksha cult for legitimacy and adapted the iqta into amara-nayaka — 14th-century statecraft, not 19th-century nationalism.' },
                { text: 'Concede — the name \'Karnataka empire\' and Hindu title prove both claims.', outcome: 'The name described the region, not a nation, and \'Hindu Sultan\' is itself the giveaway — the empire spoke in the shared Persianate vocabulary it supposedly warred against.', reveals: 'region-name-equals-nation' },
                { text: 'Counter that it was purely pragmatic — religion and sacred geography played no real role.', outcome: 'That discards why the capital sat at Virupaksha-Pampadevi and why orders were signed in the deity\'s name: ritual legitimacy was load-bearing, even if the polity wasn\'t a modern religious state.', reveals: 'pragmatism-erases-sacrality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now rebuild a lost city from layered sources — and ask whose name, whose memory, whose empire you\'re actually describing.',
            decisions: [{ prompt: 'What comes next? An Imperial Capital: Vijayanagara · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — An Imperial Capital: Vijayanagara · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_001', difficulty: 'standard',
          question: 'The discovery of Vijayanagara refers to the systematic archaeological and.',
          hint: 'Revisit c9_hist_ch1_6 (Evidence in History) for the "how historians interpret" framework.',
          misconception: 'Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten Empire* is famous), but.',
          parts: [
                { id: 'a', prompt: 'Compare the historiographical significance of (i) the 1836 start of systematic inscription collection at Hampi and (ii) Alexander Greenlaw\'s 1856 photographs.', answer: 'Inscriptions (1836+) provided stronger *chronological* evidence',
                  options: ['Inscriptions (1836+) provided stronger *chronological* evidence', 'discovery', 'first synthesis'],
                  hint: 'Revisit c9_hist_ch1_6 (Evidence in History) for the "how historians interpret" framework.',
                  misconception: 'Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten Empire* is famous), but Sewell (1900).' }
          ],
            remediations: { 'robert-sewell-discovered-vijayanagara-because': { steps: ['Re-read the NCERT Timeline 2 (p.', '193) to sequence: 1800 Mackenzie → 1836 Fleet inscriptions → 1856 Greenlaw photos → 1900 Sewell → 1902 Marshall.', 'Create a two-column table: "Source Type" vs.', '"What It Reveals" (e.g., Oral tradition → sacred geography; Inscriptions → chronology/genealogy; Photos → architectural.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten Empire* is famous), but.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The term \'Vijayanagara Empire\' is a modern colonial construct; contemporaries called it \'karnataka samrajyamu\'." Does this invalidate the.', answer: 'The claim is *partially true but misleading*',
                  options: ['The claim is *partially true but misleading*', 'biased', 'Vijayanagara Empire', 'discovery'],
                  hint: 'Revisit c9_hist_ch1_6 (Evidence in History) for the "how historians interpret" framework.',
                  misconception: 'Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten Empire* is famous), but Sewell (1900).' },
                { id: 'b', prompt: 'Design a research plan to investigate how the *amara-nayaka* system (military chiefs holding territory) functioned in the 1520s, using ONLY sources available.', answer: 'Sources: (1) Inscriptions (donative records showing nayaka land grants, titles,',
                  options: ['Sources: (1) Inscriptions (donative records showing nayaka land grants, titles,', 'discovery', 'first synthesis'],
                  hint: 'Revisit c9_hist_ch1_6 (Evidence in History) for the "how historians interpret" framework.',
                  misconception: 'Students often believe Robert Sewell *discovered* Vijayanagara (because his book *A Forgotten Empire* is famous), but Sewell (1900).' }
          ],
            remediations: { 'robert-sewell-discovered-vijayanagara-because': { steps: ['Re-read the NCERT Timeline 2 (p.', '193) to sequence: 1800 Mackenzie → 1836 Fleet inscriptions → 1856 Greenlaw photos → 1900 Sewell → 1902 Marshall.', 'Create a two-column table: "Source Type" vs.', '"What It Reveals" (e.g., Oral tradition → sacred geography; Inscriptions → chronology/genealogy; Photos → architectural.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_002', difficulty: 'standard',
          question: 'The Sangama dynasty (1336–1485) was the founding dynasty of the Vijayanagara.',
          hint: 'If stuck, review the Class 8 node c8_hist_ch1_7 (Vijayanagara Empire: Foundation) and.',
          misconception: 'Students often believe Harihara and Bukka were "Hindu heroes who escaped Muslim captivity and founded a Hindu kingdom.',
          parts: [
                { id: 'a', prompt: 'The NCERT text mentions that contemporaries called the empire *karnataka samrajyamu*.', answer: 'The claim is anachronistic',
                  options: ['The claim is anachronistic', 'nationalist'],
                  hint: 'If stuck, review the Class 8 node c8_hist_ch1_7 (Vijayanagara Empire: Foundation) and Class 6 node.',
                  misconception: 'Students often believe Harihara and Bukka were "Hindu heroes who escaped Muslim captivity and founded a Hindu kingdom to resist Islam.".' }
          ],
            remediations: { 'harihara-and-bukka-were-hindu': { steps: ['If the student holds the "Hindu resistance" misconception: Step 1 — Re-read NCERT pp.', '171–172 on *karnataka samrajyamu* and the "Hindu Suratrana" title; note the Arabic origin of "Suratrana." Step 2.', 'Step 3 — Study the *Amuktamalyada* excerpt (Source 2, p.', '173) where Krishnadeva Raya advises protecting *foreign sailors* and *merchants* — showing pragmatic inclusivity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_003', difficulty: 'standard',
          question: 'The succession of four ruling dynasties — Sangama (1336–1485), Saluva.',
          hint: 'If confused about the founding or early rulers, revisit c12_hist_cbse_07_002.',
          misconception: 'Students often believe the four dynasties were distinct families with clean successions (like father-to-son).',
          parts: [
                { id: 'a', prompt: 'Krishnadeva Raya (1509–1529) belonged to which dynasty, and what major territorial gains did he achieve?', answer: 'Krishnadeva Raya belonged to the Tuluva dynasty',
                  options: ['Krishnadeva Raya belonged to the Tuluva dynasty', 'apogee of the empire', 'Sangama or Aravidu dynasty, or omitting the Raichur Doab'],
                  hint: 'If confused about the founding or early rulers, revisit c12_hist_cbse_07_002 (Harihara/Bukka.',
                  misconception: 'Students often believe the four dynasties were distinct families with clean successions (like father-to-son).' }
          ],
            remediations: { 'the-four-dynasties-were-distinct': { steps: ['If the student confuses dynastic sequences or thinks transitions were hereditary: 1.', 'Revisit c12_hist_cbse_07_002 (Founding: Harihara and Bukka) to re-establish the Sangama baseline.', 'Create a 4-column table: Dynasty | Founder/Usurper | How they came to power | Key ruler | How they lost power.', '172–173) to fill each cell — note "military commanders" for Saluva/Tuluva, "minister" for Aravidu.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_004', difficulty: 'standard',
          question: 'The Amara-Nayaka system was the distinctive military-administrative framework.',
          hint: 'Revisit c6_history_ch07_023 and c7_hist_ch07_007; focus on the *difference* between.',
          misconception: 'Students conflate the Amara-Nayaka system with European feudalism: they assume nayakas were "feudal lords" who owed.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Amara-Nayaka system was the distinctive military-administrative framework of the',
                  options: ['The Amara-Nayaka system was the distinctive military-administrative framework of the', 'The discovery of Vijayanagara refers to the systematic archaeological and epigraphical', 'The Sangama dynasty (1336–1485) was the founding dynasty of the Vijayanagara Empire,', 'The succession of four ruling dynasties'],
                  hint: 'Revisit c6_history_ch07_023 and c7_hist_ch07_007; focus on the *difference* between "salary.',
                  misconception: 'Students conflate the Amara-Nayaka system with European feudalism: they assume nayakas were "feudal lords" who owed *personal homage* and.' }
          ],
            remediations: { 'students-conflate-the-amara-nayaka': { steps: ['If the student cannot distinguish amara-nayaka from iqta or European feudalism: (1) Revisit c6_history_ch07_023 (Delhi.', 'If still stuck, watch the 12-minute segment on "Vijayanagara\'s Nayaka System" in the NCERT Class 12 History YouTube.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_005', difficulty: 'standard',
          question: 'The geographical setting of Vijayanagara refers to the strategic selection of.',
          hint: 'Revisit c12_hist_cbse_07_002 (founding/dynasties) and the Map 1 (p.',
          misconception: 'Students often think the *granite hills alone* made Vijayanagara impregnable, and that the fortifications were merely.',
          parts: [
                { id: 'a', prompt: 'Why did the Vijayanagara rulers enclose agricultural fields *inside* the fortified walls, unlike most medieval cities where farms lay outside?', answer: 'To withstand long sieges: medieval sieges aimed to starve defenders',
                  options: ['To withstand long sieges: medieval sieges aimed to starve defenders', 'for tax collection', 'to keep peasants safe', 'walls on hills'],
                  hint: 'Revisit c12_hist_cbse_07_002 (founding/dynasties) and the Map 1 (p.',
                  misconception: 'Students often think the *granite hills alone* made Vijayanagara impregnable, and that the fortifications were merely “walls on hills.”.' },
                { id: 'b', prompt: 'Compare the water-management strategy of Vijayanagara (arid zone, tank + canal system) with that of the Harappan city of Dholavira (also arid, reservoir.', answer: 'Similarity: both built large reservoirs (Kamalapuram tank / Dholavira’s massive',
                  options: ['Similarity: both built large reservoirs (Kamalapuram tank / Dholavira’s massive', 'walls on hills'],
                  hint: 'Revisit c12_hist_cbse_07_002 (founding/dynasties) and the Map 1 (p.',
                  misconception: 'Students often think the *granite hills alone* made Vijayanagara impregnable, and that the fortifications were merely “walls on hills.”.' }
          ],
            remediations: { 'the-granite-hills-alone-made': { steps: ['If the student holds the above misconception: (1) Re-read NCERT pp.', '177–178 on fortifications — note “No mortar… wedge-shaped blocks… inner portion earth packed with rubble” and “enclosed.', 'lower town) — Harappa walled *only* the citadel; Vijayanagara walled *farms*.', '(3) Re-do Diagnostic Question 2 aloud, explaining *why* farms inside walls = siege strategy.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_07_006', difficulty: 'standard',
          question: 'The Royal Centre of Vijayanagara (c. 1336–1565 CE) was the south-western zone.',
          hint: 'If unclear on the Royal Centre\'s function, revisit the Amara-Nayaka system.',
          misconception: 'Students often think the "Royal Centre" was the king’s private residence — a palace where he lived daily.',
          parts: [
                { id: 'a', prompt: 'Identify the two most impressive platforms in the "king\'s palace" enclosure of the Royal Centre and state the approximate base area and height of the.', answer: 'The two platforms are the "audience hall" and the "Mahanavami Dibba"',
                  options: ['The two platforms are the "audience hall" and the "Mahanavami Dibba"', 'Royal Centre', 'palace', 'the "Royal Centre" was the king’s private residence'],
                  hint: 'If unclear on the Royal Centre\'s function, revisit the Amara-Nayaka system (c12_hist_cbse_07_004).',
                  misconception: 'Students often think the "Royal Centre" was the king’s private residence — a palace where he lived daily.' },
                { id: 'b', prompt: 'Explain why the Mahanavami Dibba is considered a "theatre of power" rather than a residential structure, using evidence from its architecture and the rituals.', answer: 'The Dibba’s massive scale (11,000 sq',
                  options: ['The Dibba’s massive scale (11,000 sq', 'king\'s palace', 'palace', 'Royal Centre'],
                  hint: 'If unclear on the Royal Centre\'s function, revisit the Amara-Nayaka system (c12_hist_cbse_07_004).',
                  misconception: 'Students often think the "Royal Centre" was the king’s private residence — a palace where he lived daily.' },
                { id: 'c', prompt: 'Compare the architectural features of the Lotus Mahal and the elephant stables.', answer: 'Both structures use arched openings and vaulted roofs',
                  options: ['Both structures use arched openings and vaulted roofs', 'Islamic influence', 'Royal Centre', 'palace'],
                  hint: 'If unclear on the Royal Centre\'s function, revisit the Amara-Nayaka system (c12_hist_cbse_07_004).',
                  misconception: 'Students often think the "Royal Centre" was the king’s private residence — a palace where he lived daily.' }
          ],
            remediations: { 'the-royal-centre-was-the': { steps: ['If the student confuses the Royal Centre with a residential palace: (1) Re-read the text section "4.', '179–180) focusing on "These are relatively large structures that do not seem to have been associated with ritual.', 'the superstructure of the secular buildings was made of perishable materials." (2) Compare Fig.', '7.11 (Mahanavami Dibba) with Fig.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
