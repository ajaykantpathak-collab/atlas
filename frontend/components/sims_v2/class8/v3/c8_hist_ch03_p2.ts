import type { SimDef } from '../../engine/types';

/** v3 generated — c8_hist_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_hist_ch03_p2: SimDef = {
    id: 'v3_c8_hist_ch03_p2',
    title: 'The Colonial Era in India · Part 2/2',
    subtitle: 'How merchants quietly became rulers',
    classLevel: 8, subject: 'history', topic: 'The Colonial Era in India · Part 2/2',
    chapters: ['c8_hist_ch03'],
    nodeIds: ['c8_hist_ch3_5', 'c8_hist_ch3_6', 'c8_hist_ch3_7', 'c8_hist_ch3_8', 'c8_hist_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a detective tracing Europe\'s entry into India', intro: 'The Basilica in Goa and Fort St. George in Chennai were built by men who arrived asking only to trade. Follow the money and the muskets to see how welcome guests took over the house.', goal: 'Understand colonialism as a system of political control and economic extraction, trace the three-stage European entry (trade, forts, domination), and distinguish it from earlier rulers like the Mughals.' },
    discovery: {
        question: 'The Mughals also came from outside and ruled India — so why do historians say British colonialism was a totally different beast?',
        options: ['The Mughals settled and reinvested revenue locally; the British drained India\'s wealth to a distant country for its own industrial profit', 'There was no difference — all foreign rule is identical', 'The British were simply crueler people', 'The Mughals never collected taxes'],
        answer: 'The Mughals settled and reinvested revenue locally; the British drained India\'s wealth to a distant country for its own industrial profit',
        hook: 'Colonialism didn\'t start at Plassey. Traders arrived in 1498, spent 250 years building fortified coastal enclaves — Goa, Madras, Pondicherry — and only then turned trade privileges into territory. Merchants became rulers one farman at a time.',
    },
    teaching: [
        { title: 'English East India Company: Trading Posts and Expansion', text: 'The English East India Company (EIC) established its first trading posts (factories) in India in the early 17th century, beginning with Surat (1613), and gradually expanded its commercial and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_hist_ch3_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Build the timeline from Vasco da Gama\'s 1498 landing at Calicut to British paramountcy: trace how trade posts became forts, how the East India Company played Mughal farmans into power, and how a private corporation ended up ruling a subcontinent.',
        labels: ['English East India Company', 'Battle of Plassey (1757)', 'Battle of Buxar (1764)', 'British Economic Exploitation: Revenue', 'Impact of British Rule'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c8_hist_ch3_5', title: 'English East India Company: Trading Posts and Expansion',
          caseStudy: { intro: 'Imagine you are visiting Fort St. George in Chennai today — the first British fortress in India. Why did a trading company build a fort?',
            decisions: [{ prompt: 'In which year did the English East India Company receive its royal charter from Queen Elizabeth I, and what was the charter\'s primary.', options: [
                { text: 'The charter was granted in 1600, giving the Company a 15-year monopoly on English trade', outcome: 'The charter was granted in 1600, giving the Company a 15-year monopoly on English trade with the.' },
                { text: 'military superiority', outcome: 'Not quite — Students believe the English East India Company conquered India through superior military.', reveals: 'the-english-east-india-company' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A student writes in her notebook: \'Colonialism began at Plassey in 1757 when the British government invaded India — just another foreign conquest like the Mughals before them.\' Her teacher asks her to check two claims against the record.',
            decisions: [{ prompt: 'What do the facts show?', options: [
                { text: 'Both claims need repair: Europeans had been in India since 1498 and moved in stages — trade, then fortified coastal enclaves, then political control — and Plassey was a turning point, not a start. Unlike the Mughals, who settled and reinvested revenue locally, the Company drained India\'s wealth to a distant state — that extraction is what makes it colonialism.', outcome: 'This places Plassey inside a 250-year multi-power process and draws the key structural line between settled conquerors and absentee exploiters.' },
                { text: 'Her note is correct — 1757 is the founding moment, and all foreign rulers are basically the same.', outcome: 'That compresses two and a half centuries of Portuguese, Dutch, French and English rivalry into one date and misses that Mughals lived off and spent within India while the Company shipped surplus home.', reveals: 'plassey-is-the-start' },
                { text: 'Only the date is wrong — colonialism began in 1498 the day Vasco da Gama landed, because arrival equals conquest.', outcome: 'Arrival was trade, not rule; for over two centuries Europeans held only fortified coastal posts, and conquest came much later through specific 18th-century contingencies.', reveals: 'arrival-equals-conquest' }
            ] }] } },
        { type: 'case', nodeId: 'c8_hist_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Colonialism is a system, not an invasion: a faraway state uses companies, navies and local rivalries to extract wealth. The pattern was trade → fortified settlement → political domination — and it took 250 years.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch3_5', difficulty: 'standard',
          question: 'The English East India Company (EIC) established its first trading posts.',
          hint: 'If stuck, revisit c7_hist_ch04_004 (Gupta administration is not Mughal — correct.',
          misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.',
          parts: [
                { id: 'a', prompt: 'Why did Mughal Emperor Jahangir grant a farman to the English in 1613 allowing them to establish a factory at Surat?', answer: 'Jahangir granted the farman',
                  options: ['Jahangir granted the farman', 'the English defeated the Mughals', 'Jahangir wanted to convert to Christianity', 'military superiority'],
                  hint: 'If stuck, revisit c7_hist_ch04_004 (Gupta administration is not Mughal — correct reference.',
                  misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.' }
          ],
            remediations: { 'the-english-east-india-company': { steps: ['Use a comparative map activity: Plot Portuguese (Goa, Diu), Dutch (Pulicat, Nagapattinam), and English (Surat, Madras.', 'Color-code: red for fortified territories, blue for trade-only factories.', 'Ask: "Which European power held the most fortified land in 1700?" (Portuguese).', 'Then overlay Mughal empire boundaries.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The English East India Company\'s transition from traders to rulers was inevitable once they obtained the right to issue dastaks (trade.', answer: 'The statement is partially valid but oversimplified',
                  options: ['The statement is partially valid but oversimplified', 'military superiority'],
                  hint: 'If stuck, revisit c7_hist_ch04_004 (Gupta administration is not Mughal — correct reference.',
                  misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.' },
                { id: 'b', prompt: 'Create a timeline with annotations showing how the English East India Company converted commercial privileges into territorial control at three specific.', answer: 'A strong timeline includes: 1613 Surat',
                  options: ['A strong timeline includes: 1613 Surat', 'military superiority'],
                  hint: 'If stuck, revisit c7_hist_ch04_004 (Gupta administration is not Mughal — correct reference.',
                  misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.' }
          ],
            remediations: { 'the-english-east-india-company': { steps: ['Use a comparative map activity: Plot Portuguese (Goa, Diu), Dutch (Pulicat, Nagapattinam), and English (Surat, Madras.', 'Color-code: red for fortified territories, blue for trade-only factories.', 'Ask: "Which European power held the most fortified land in 1700?" (Portuguese).', 'Then overlay Mughal empire boundaries.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_6', difficulty: 'standard',
          question: 'The Battle of Plassey (23 June 1757) was a decisive military engagement near.',
          hint: 'If stuck, revisit the "farman of 1717" (Mughal emperor\'s trade grant to EIC) and.',
          misconception: 'Students believe the British won Plassey because of superior European military technology and discipline, imagining.',
          parts: [
                { id: 'a', prompt: 'Why did Siraj-ud-Daulah attack the British factory at Calcutta in 1756, and how did the British respond?', answer: 'Siraj-ud-Daulah attacked Calcutta',
                  options: ['Siraj-ud-Daulah attacked Calcutta', 'trade disputes'],
                  hint: 'If stuck, revisit the "farman of 1717" (Mughal emperor\'s trade grant to EIC) and Siraj-ud-Daulah\'s.',
                  misconception: 'Students believe the British won Plassey because of superior European military technology and discipline, imagining a classic "modern vs.' },
                { id: 'b', prompt: 'The Jagat Seths (wealthy Bengali bankers) financed the conspiracy against Siraj-ud-Daulah.', answer: 'The Jagat Seths backed the British',
                  options: ['The Jagat Seths backed the British', 'they hated Indians', 'they were pro-British ideologically'],
                  hint: 'If stuck, revisit the "farman of 1717" (Mughal emperor\'s trade grant to EIC) and Siraj-ud-Daulah\'s.',
                  misconception: 'Students believe the British won Plassey because of superior European military technology and discipline, imagining a classic "modern vs.' }
          ],
            remediations: { 'the-british-won-plassey-because': { steps: ['If the student holds this misconception, have them: (1) Compare the troop composition table — note French officers.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_7', difficulty: 'standard',
          question: 'The Battle of Buxar (1764) was a decisive military conflict fought between the.',
          hint: 'If stuck, review node `c8_hist_ch3_6` (Battle of Plassey) to understand how the East.',
          misconception: 'Students frequently believe that the Battle of Plassey (1757) gave the British direct, sovereign control over Bengal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Battle of Buxar (1764) was a decisive military conflict fought between the English',
                  options: ['The Battle of Buxar (1764) was a decisive military conflict fought between the English', 'Colonialism is a system where a powerful country establishes political control over a', 'The Social and Cultural Impact of British Colonialism refers to the profound', 'Indian Response to British Expansion refers to the diverse armed and non-armed resistance'],
                  hint: 'If stuck, review node `c8_hist_ch3_6` (Battle of Plassey) to understand how the East India Company.',
                  misconception: 'Students frequently believe that the Battle of Plassey (1757) gave the British direct, sovereign control over Bengal and the authority.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Step 1 (Distinction): Draw a clear 2-column comparative table on the board labeled "Plassey (1757)" vs "Buxar (1764)".', 'Step 2 (Actors & Legal Status): Under Plassey, write "Defeated Nawab Siraj-ud-Daulah -> Installed puppet Mir Jafar ->.', 'Step 3 (Primary Source Visual): Display the text/drawing of Clive receiving the Diwani grant from Shah Alam II in 1765.', 'Step 4 (Re-assessment): Ask the student: "In which battle did the British defeat the supreme sovereign of India (the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_8', difficulty: 'standard',
          question: 'British economic exploitation refers to the systematic extraction of India\'s.',
          hint: 'If stuck, review the Treaty of Allahabad (1765) in node `c8_hist_ch3_7` to understand how.',
          misconception: 'Students often believe that the Permanent Settlement was beneficial to Indian peasants because the tax rate was "fixed".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'British economic exploitation refers to the systematic extraction of India\'s wealth by',
                  options: ['British economic exploitation refers to the systematic extraction of India\'s wealth by', 'Colonialism is a system where a powerful country establishes political control over a', 'The Social and Cultural Impact of British Colonialism refers to the profound', 'Indian Response to British Expansion refers to the diverse armed and non-armed resistance'],
                  hint: 'If stuck, review the Treaty of Allahabad (1765) in node `c8_hist_ch3_7` to understand how the.',
                  misconception: 'Students often believe that the Permanent Settlement was beneficial to Indian peasants because the tax rate was "fixed" and could not.' }
          ],
            remediations: { 'the-permanent-settlement-was-beneficial': { steps: ['If a student struggles with this concept, guide them through this step-by-step analytical breakdown: 1.', '**The Core Question**: Ask: "If you are a landlord who will lose your entire ancestral estate tomorrow if you don\'t pay.', '**Examine the Sunset Law**: Explain that the British showed no mercy to zamindars who missed deadlines, which forced.', '**Contrast with Pre-Colonial Times**: Highlight that under old rulers, a bad harvest meant paying less tax.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_9', difficulty: 'standard',
          question: 'The impact of British rule on Indian artisans and industries refers to the.',
          hint: 'If stuck, review c8_hist_ch3_8 to see how the East India Company used tax revenues.',
          misconception: 'Students often believe that Indian traditional handicrafts disappeared naturally simply because British machine-made.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The impact of British rule on Indian artisans and industries refers to the deliberate',
                  options: ['The impact of British rule on Indian artisans and industries refers to the deliberate', 'Colonialism is a system where a powerful country establishes political control over a', 'The Social and Cultural Impact of British Colonialism refers to the profound', 'Indian Response to British Expansion refers to the diverse armed and non-armed resistance'],
                  hint: 'If stuck, review c8_hist_ch3_8 to see how the East India Company used tax revenues collected from.',
                  misconception: 'Students often believe that Indian traditional handicrafts disappeared naturally simply because British machine-made cloth was cheaper and.' }
          ],
            remediations: { 'indian-traditional-handicrafts-disappeared-natur': { steps: ['If a student falls into this misconception, follow this step-by-step remediation: 1.', '**Compare Tariff Rates:** Show the student a comparative table of British tariffs on Indian goods (70-80%) versus.', 'Ask: "Is this a fair race?" 2.', '**Trace the Raw Cotton:** Walk through the supply chain: Indian weavers could not get raw cotton because British.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
