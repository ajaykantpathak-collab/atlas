import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch03_p1: SimDef = {
    id: 'v3_c8_hist_ch03_p1',
    title: 'The Colonial Era in India · Part 1/2',
    subtitle: 'How merchants quietly became rulers',
    classLevel: 8, subject: 'history', topic: 'The Colonial Era in India · Part 1/2',
    chapters: ['c8_hist_ch03'],
    nodeIds: ['c8_hist_ch3_1', 'c8_hist_ch3_10', 'c8_hist_ch3_11', 'c8_hist_ch3_2', 'c8_hist_ch3_3', 'c8_hist_ch3_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a detective tracing Europe\'s entry into India', intro: 'The Basilica in Goa and Fort St. George in Chennai were built by men who arrived asking only to trade. Follow the money and the muskets to see how welcome guests took over the house.', goal: 'Understand colonialism as a system of political control and economic extraction, trace the three-stage European entry (trade, forts, domination), and distinguish it from earlier rulers like the Mughals.' },
    discovery: {
        question: 'The Mughals also came from outside and ruled India — so why do historians say British colonialism was a totally different beast?',
        options: ['The Mughals settled and reinvested revenue locally; the British drained India\'s wealth to a distant country for its own industrial profit', 'There was no difference — all foreign rule is identical', 'The British were simply crueler people', 'The Mughals never collected taxes'],
        answer: 'The Mughals settled and reinvested revenue locally; the British drained India\'s wealth to a distant country for its own industrial profit',
        hook: 'Colonialism didn\'t start at Plassey. Traders arrived in 1498, spent 250 years building fortified coastal enclaves — Goa, Madras, Pondicherry — and only then turned trade privileges into territory. Merchants became rulers one farman at a time.',
    },
    teaching: [
        { title: 'Colonialism: Definition and Historical Context', text: 'Colonialism is a system where a powerful country establishes political control over a weaker territory, exploits its resources and labor for economic gain, and imposes its cultural and administrative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch3_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build the timeline from Vasco da Gama\'s 1498 landing at Calicut to British paramountcy: trace how trade posts became forts, how the East India Company played Mughal farmans into power, and how a private corporation ended up ruling a subcontinent.',
        labels: ['Colonialism: Definition and Historical', 'Social and Cultural Impact', 'Indian Response to British', 'Age of Colonialism: European', 'Portuguese in India: Vasco', 'Dutch and French East'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch3_1', title: 'Colonialism: Definition and Historical Context',
          caseStudy: { intro: 'Imagine you are visiting the Basilica of Bom Jesus in Old Goa or St.',
            decisions: [{ prompt: 'What year did Vasco da Gama reach Calicut, and which European power did he represent?', options: [
                { text: 'Vasco da Gama reached Calicut in 1498 representing Portugal', outcome: 'Vasco da Gama reached Calicut in 1498 representing Portugal. A wrong answer (e.g., 1600, British).' },
                { text: 'colonialism *began* with the Battle of Plassey (1757) and was *only* British', outcome: 'Not quite — Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.', reveals: 'colonialism-began-with-the-battle' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_10', title: 'Social and Cultural Impact of British Colonialism',
          caseStudy: { intro: 'Imagine walking past your school and noticing the medium of instruction is English, the curriculum includes Shakespeare, and the building looks like a British.',
            decisions: [{ prompt: 'In which year was the English Education Act passed, and who was the Governor-General responsible for it?', options: [
                { text: 'The English Education Act was passed in 1835 under Governor-General Lord William', outcome: 'The English Education Act was passed in 1835 under Governor-General Lord William Bentinck, based.' },
                { text: 'progress', outcome: 'Not quite — Students think British social reforms (banning sati, allowing widow remarriage) were universally.', reveals: 'british-social-reforms-banning-sati' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_11', title: 'Indian Response to British Expansion: Resistance Movements',
          caseStudy: { intro: 'Imagine you are visiting the Jhansi Fort in Uttar Pradesh and see the cannon marks on its walls — traces of Rani Lakshmibai\'s fight in 1857.',
            decisions: [{ prompt: 'Name any three major resistance movements against British rule that occurred BEFORE the Revolt of 1857, along with their regions.', options: [
                { text: 'Correct answer: Sanyasi-Fakir Rebellion (Bengal, 1760s–1800), Polygar Wars (Tamil Nadu,', outcome: 'Correct answer: Sanyasi-Fakir Rebellion (Bengal, 1760s–1800), Polygar Wars (Tamil Nadu, 1799–1805).' },
                { text: 'sepoy mutiny', outcome: 'Not quite — Students believe the Revolt of 1857 was primarily a "sepoy mutiny" triggered only by greased.', reveals: 'the-revolt-of-1857-was' },
                { text: 'only 1857 or post-1857 movements', outcome: 'Not quite — Students believe the Revolt of 1857 was primarily a "sepoy mutiny" triggered only by greased.', reveals: 'the-revolt-of-1857-was' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_4', title: 'Dutch and French East India Companies in India',
          caseStudy: { intro: 'Imagine you are visiting Pondicherry today and notice French street names and colonial architecture alongside a Dutch cemetery in Kochi.',
            decisions: [{ prompt: 'In which year was the French East India Company founded, and where was its first major settlement in India?', options: [
                { text: 'The French East India Company was founded in 1664 and its first major settlement was', outcome: 'The French East India Company was founded in 1664 and its first major settlement was Pondicherry.' },
                { text: 'minor players', outcome: 'Not quite — Students often think the Dutch and French were "minor players" who never threatened British rule.', reveals: 'the-dutch-and-french-were' },
                { text: 'the Dutch and French were "minor players" who never threatened British rule', outcome: 'Not quite — Students often think the Dutch and French were "minor players" who never threatened British rule.', reveals: 'the-dutch-and-french-were' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A student writes in her notebook: \'Colonialism began at Plassey in 1757 when the British government invaded India — just another foreign conquest like the Mughals before them.\' Her teacher asks her to check two claims against the record.',
            decisions: [{ prompt: 'What do the facts show?', options: [
                { text: 'Both claims need repair: Europeans had been in India since 1498 and moved in stages — trade, then fortified coastal enclaves, then political control — and Plassey was a turning point, not a start. Unlike the Mughals, who settled and reinvested revenue locally, the Company drained India\'s wealth to a distant state — that extraction is what makes it colonialism.', outcome: 'This places Plassey inside a 250-year multi-power process and draws the key structural line between settled conquerors and absentee exploiters.' },
                { text: 'Her note is correct — 1757 is the founding moment, and all foreign rulers are basically the same.', outcome: 'That compresses two and a half centuries of Portuguese, Dutch, French and English rivalry into one date and misses that Mughals lived off and spent within India while the Company shipped surplus home.', reveals: 'plassey-is-the-start' },
                { text: 'Only the date is wrong — colonialism began in 1498 the day Vasco da Gama landed, because arrival equals conquest.', outcome: 'Arrival was trade, not rule; for over two centuries Europeans held only fortified coastal posts, and conquest came much later through specific 18th-century contingencies.', reveals: 'arrival-equals-conquest' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_4', title: 'The bigger picture',
          caseStudy: { intro: 'Colonialism is a system, not an invasion: a faraway state uses companies, navies and local rivalries to extract wealth. The pattern was trade → fortified settlement → political domination — and it took 250 years.',
            decisions: [{ prompt: 'What comes next? The Colonial Era in India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Colonial Era in India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch3_1', difficulty: 'standard',
          question: 'Colonialism is a system where a powerful country establishes political control.',
          hint: 'Revisit Class 6 Chapter "The Coming of the Europeans" (c6_history_ch10_039) and "The East.',
          misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.',
          parts: [
                { id: 'a', prompt: 'What year did Vasco da Gama reach Calicut, and which European power did he represent?', answer: 'Vasco da Gama reached Calicut in 1498 representing Portugal',
                  options: ['Vasco da Gama reached Calicut in 1498 representing Portugal', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Revisit Class 6 Chapter "The Coming of the Europeans" (c6_history_ch10_039) and "The East India.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' },
                { id: 'b', prompt: 'Compare the *motives* of the East India Company (chartered 1600) and the Mughal emperor Jahangir (who gave them a farman in 1615).', answer: 'Alignment: Company wanted trade monopoly',
                  options: ['Alignment: Company wanted trade monopoly', 'both wanted territory', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Revisit Class 6 Chapter "The Coming of the Europeans" (c6_history_ch10_039) and "The East India.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' }
          ],
            remediations: { 'colonialism-began-with-the-battle': { steps: ['Draw a 1498–1757 timeline on the board.', 'Mark Portuguese (1498, 1510 Goa), Dutch (1605 Masulipatnam), English (1600 charter, 1613 Surat, 1639 Madras), French.', 'Ask: "Who was strongest in 1650?" (Answer: Dutch in spice trade; Mughals on land).', 'Explain Plassey was a *turning point*, not the *start*. Use a map showing European enclaves pre-1757 to visualize the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.',
          parts: [
                { id: 'a', prompt: '"Colonialism in India was inevitable after 1498." Evaluate this statement using evidence from the 16th–17th centuries.', answer: 'Not inevitable',
                  options: ['Not inevitable', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Revisit Class 6 Chapter "The Coming of the Europeans" (c6_history_ch10_039) and "The East India.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' }
          ],
            remediations: { 'colonialism-began-with-the-battle': { steps: ['Draw a 1498–1757 timeline on the board.', 'Mark Portuguese (1498, 1510 Goa), Dutch (1605 Masulipatnam), English (1600 charter, 1613 Surat, 1639 Madras), French.', 'Ask: "Who was strongest in 1650?" (Answer: Dutch in spice trade; Mughals on land).', 'Explain Plassey was a *turning point*, not the *start*. Use a map showing European enclaves pre-1757 to visualize the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_10', difficulty: 'standard',
          question: 'The Social and Cultural Impact of British Colonialism refers to the profound.',
          hint: 'Revisit c8_hist_ch3_9 (economic ruin of artisans) and c7_hist_ch06_008 (Bhakti movement\'s.',
          misconception: 'Students think British social reforms (banning sati, allowing widow remarriage) were universally welcomed by Indians.',
          parts: [
                { id: 'a', prompt: 'In which year was the English Education Act passed, and who was the Governor-General responsible for it?', answer: 'The English Education Act was passed in 1835 under Governor-General Lord William',
                  options: ['The English Education Act was passed in 1835 under Governor-General Lord William', 'progress'],
                  hint: 'Revisit c8_hist_ch3_9 (economic ruin of artisans) and c7_hist_ch06_008 (Bhakti movement\'s social.',
                  misconception: 'Students think British social reforms (banning sati, allowing widow remarriage) were universally welcomed by Indians as "progress.".' }
          ],
            remediations: { 'british-social-reforms-banning-sati': { steps: ['Show the 1829 petition by orthodox Hindus to the Privy Council opposing the sati ban (primary source).', 'Contrast with Roy\'s 1830 petition supporting it.', 'Map both positions on a spectrum: "Collaboration with British," "Resistance using British law," "Rejection of British.', 'Ask student to place Phule\'s 1873 *Gulamgiri* on this spectrum and explain why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_11', difficulty: 'standard',
          question: 'Indian Response to British Expansion refers to the diverse armed and non-armed.',
          hint: 'Review c8_hist_ch3_8 (British Economic Exploitation) — specifically the comparison table.',
          misconception: 'Students believe the Revolt of 1857 was primarily a "sepoy mutiny" triggered only by greased cartridges, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Analyze the causes of the Revolt of 1857 by categorizing them into: (a) Economic, (b) Political, (c) Military, and (d) Social-Religious.', answer: 'Correct answer: (a) Economic',
                  options: ['Correct answer: (a) Economic', 'British were bad', 'sepoy mutiny'],
                  hint: 'Review c8_hist_ch3_8 (British Economic Exploitation) — specifically the comparison table of three.',
                  misconception: 'Students believe the Revolt of 1857 was primarily a "sepoy mutiny" triggered only by greased cartridges, ignoring the deep economic.' }
          ],
            remediations: { 'the-revolt-of-1857-was': { steps: ['Revisit c8_hist_ch3_8 (British revenue systems) and c8_hist_ch3_9 (impact on artisans) — list three ways each policy.', 'Use a map of India (1857) to mark: (a) regions where revolt spread, (b) regions that stayed quiet, (c) princely states.', 'Compare the 1857 proclamation (Azamgarh Proclamation) with a pre-1857 tribal petition (e.g., Santhal petition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_2', difficulty: 'standard',
          question: 'The Age of Colonialism from the 15th century refers to the era of global.',
          hint: 'If stuck, review how the Roman and Mughal Empires traded, and look at a map of the.',
          misconception: 'Students often believe that European colonialism in India began with the British East India Company and that they were.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Age of Colonialism from the 15th century refers to the era of global history when',
                  options: ['The Age of Colonialism from the 15th century refers to the era of global history when', 'Colonialism is a system where a powerful country establishes political control over a', 'The Social and Cultural Impact of British Colonialism refers to the profound', 'Indian Response to British Expansion refers to the diverse armed and non-armed resistance'],
                  hint: 'If stuck, review how the Roman and Mughal Empires traded, and look at a map of the ancient Silk.',
                  misconception: 'Students often believe that European colonialism in India began with the British East India Company and that they were the first Europeans.' }
          ],
            remediations: { 'european-colonialism-in-india-began': { steps: ['Have the student look at a timeline comparing the arrival of different European powers in India (Portuguese: 1498.', 'Show them a map of India highlighting Portuguese Goa alongside British Madras/Calcutta to visualize spatial coexistence.', 'Ask the student to calculate the time gap between Vasco da Gama’s arrival and the Battle of Plassey (1757) to realize.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_3', difficulty: 'standard',
          question: 'The Portuguese in India refers to the period beginning with Vasco da Gama\'s.',
          hint: 'If stuck, review how the Ottoman Empire\'s control of overland routes in western Asia.',
          misconception: 'Students often believe that the Portuguese conquered vast territories across India in the same manner as the British.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Portuguese in India refers to the period beginning with Vasco da Gama\'s arrival at',
                  options: ['The Portuguese in India refers to the period beginning with Vasco da Gama\'s arrival at', 'Colonialism is a system where a powerful country establishes political control over a', 'The Social and Cultural Impact of British Colonialism refers to the profound', 'Indian Response to British Expansion refers to the diverse armed and non-armed resistance'],
                  hint: 'If stuck, review how the Ottoman Empire\'s control of overland routes in western Asia (following the.',
                  misconception: 'Students often believe that the Portuguese conquered vast territories across India in the same manner as the British East India Company did.' }
          ],
            remediations: { 'the-portuguese-conquered-vast-territories': { steps: ['To correct this, have the student look at a physical map of India and locate Goa, Daman, and Diu.', 'Point out how tiny these enclaves are compared to the vast Indian landmass.', 'Explain that while the British used land armies (Sepoys) to conquer inland kingdoms to collect land revenue, the.', 'Introduce the term "Thalassocracy" (an empire of the seas) and contrast it with "Territorial Empire" to help them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_4', difficulty: 'standard',
          question: 'The Dutch East India Company (VOC, 1602) and French East India Company (1664).',
          hint: 'Review the Portuguese factory system in c8_hist_ch3_3 — the Dutch and French copied its.',
          misconception: 'Students often think the Dutch and French were "minor players" who never threatened British rule.',
          parts: [
                { id: 'a', prompt: 'A historian argues: "The French East India Company failed in India because it lacked naval power." Using evidence from the 1740s–1760s, evaluate this claim.', answer: 'The claim is partially correct but incomplete',
                  options: ['The claim is partially correct but incomplete', 'French lost at Wandiwash', 'minor players', 'the Dutch and French were "minor players" who never threatened British rule'],
                  hint: 'Review the Portuguese factory system in c8_hist_ch3_3 — the Dutch and French copied its.',
                  misconception: 'Students often think the Dutch and French were "minor players" who never threatened British rule.' }
          ],
            remediations: { 'the-dutch-and-french-were': { steps: ['Re-read the worked example on Dutch textile procurement (WORKED_EXAMPLE_1) to see how Dutch factories fed the.', 'Use a map of Indian Ocean trade routes (c7_hist_ch03_007) to trace Dutch ships from Pulicat to Batavia.', 'Compare the French company\'s royal funding vs.', 'English EIC\'s private trade profits using a two-column table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
