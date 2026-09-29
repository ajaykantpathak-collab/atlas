import type { SimDef } from '../../engine/types';
import C8_HistoryCivicsBattlePlassey1757Sim from '../../../simulations/c6_12/C8_HistoryCivicsBattlePlassey1757Sim';

/** v3 wrapped master — C8_HistoryCivicsBattlePlassey1757Sim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_historycivicsbattleplassey1757sim: SimDef = {
    id: 'v3w_c8_historycivicsbattleplassey1757sim',
    title: 'English East India Company: Trading Posts and Expansion',
    subtitle: 'Covers the period 1600–1757: the grant of royal charter, establishment of major factories.',
    classLevel: 8, subject: 'history', topic: 'English East India Company: Trading Posts and Expansion',
    chapters: [],
    nodeIds: ['c8_hist_ch3_5', 'c8_hist_ch3_6', 'c8_hist_ch3_7', 'c8_hist_ch4_1', 'c8_hist_ch3_1'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are visiting Fort St. George in Chennai today — the first British fortress in India.', goal: 'Master English East India Company: Trading Posts and Expansion.' },
    discovery: {
        question: 'Why did Mughal Emperor Jahangir grant a farman to the English in 1613 allowing them to establish a factory at Surat?',
        options: ['Jahangir granted the farman', 'the English defeated the Mughals', 'Jahangir wanted to convert to Christianity'],
        answer: 'Jahangir granted the farman',
        hook: 'Students believe the English East India Company conquered India through superior military technology from the start.',
    },
    teaching: [
        { title: 'The English East India Company (EIC).', text: 'The English East India Company (EIC) established its first trading posts (factories) in India in the early 17th century, beginning with Surat (1613), and gradually expanded its commercial and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_hist_ch3_5', title: 'The English East India Company (EIC).',
          scaffold: { problem: 'Explain how the English East India Company obtained the right to rent three villages (Sutanuti, Gobindapur, Kalikata) in 1698 and why this.',
            steps: [
            { text: 'Identify the key actors — EIC (Job Charnock), Mughal Subahdar of Bengal (Azim-ush-Shan), and local zamindars (Sabarna.' },
            { text: 'Trace the sequence: 1690 Charnock settles at Sutanuti after conflict with Mughals; 1696 Fort William construction.' },
            { text: 'Analyze the Mughal motivation — the Subahdar needed money for his Deccan campaign and saw the English as reliable.' },
            { text: 'Evaluate the significance — the Company became a zamindar (landholder) with legal right to collect rent, administer.' },
            { text: 'Connect to later expansion — this zamindari became the nucleus of Calcutta, the Company\'s future capital and base for.', faded: true, blankAnswer: 'The Company secured the three villages by paying a fixed.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch3_6', title: 'The Battle of Plassey (23 June 1757).',
          scaffold: { problem: 'Explain why the Battle of Plassey is considered the "turning point" from trade to territory for the British in India, using a cause-effect.',
            steps: [
            { text: 'Identify the pre-Plassey status — EIC was a commercial entity with factories (trading posts) at Calcutta, Madras,.' },
            { text: 'Identify the immediate trigger — Siraj-ud-Daulah\'s 1756 capture of Calcutta and the Black Hole incident gave Clive a.' },
            { text: 'Trace the conspiracy — Clive negotiated the secret treaty with Mir Jafar (commander), Rai Durlabh (minister), and Jagat.' },
            { text: 'Analyze the battle outcome — Mir Jafar\'s non-participation led to Siraj\'s defeat; Mir Jafar installed as Nawab; EIC.' },
            { text: 'Evaluate the structural shift — EIC now controlled Bengal\'s revenue resources through a puppet ruler, transforming from.', faded: true, blankAnswer: 'Plassey was the turning point because it gave the British a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch3_7', title: 'The Battle of Buxar (1764) was a.',
          scaffold: { problem: 'Trace the step-by-step escalation of conflict between Nawab Mir Qasim and the East India Company between 1760 and 1764, analyzing why a.',
            steps: [
            { text: 'Identify Mir Qasim\'s initial appointment (1760). The Company deposed Mir Jafar for failing to pay monetary demands and.' },
            { text: 'Identify Mir Qasim\'s sovereign reforms. Mir Qasim tried to build an independent state by moving his capital from.' },
            { text: 'Analyze the economic flashpoint (*dastaks*). Company servants misused free-trade passes (*dastaks*) for their private.' },
            { text: 'Examine Mir Qasim\'s countermeasure. To level the field, Mir Qasim abolished all internal trade duties for everyone,.' },
            { text: 'Conclude cause-effect chain. The British viewed equal trade for Indians as a threat to their dominance, declared war on.', faded: true, blankAnswer: 'Mir Qasim was installed as a puppet ruler, but his attempts.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch4_1', title: 'Early Resistance to British Rule refers.',
          scaffold: { problem: 'Analyze the causes of the Paika Rebellion (1817) using the "Colonial Policy -> Local Grievance -> Uprising" framework.',
            steps: [
            { text: 'Identify the colonial policy — Company\'s land revenue settlement in Odisha (1803) resumed *nishkar jagirs* (rent-free.' },
            { text: 'Identify the affected group — Paiks (hereditary peasant-militia) lost their livelihood and status; zamindars lost.' },
            { text: 'Trace the grievance chain — Land resumption -> Paiks become landless -> economic desperation -> cultural insult.' },
            { text: 'Explain the uprising\'s composition — Bakshi Jagabandhu (former commander) led Paiks, joined by zamindars, tribals.' },
            { text: 'Evaluate why it failed — Isolated to Odisha; no external support; Company used scorched-earth tactics and divided.', faded: true, blankAnswer: 'The Paika Rebellion was caused by the Company\'s land.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch3_1', title: 'Colonialism is a system where a.',
          scaffold: { problem: 'Using the three-stage framework (trade → fortified settlement → political domination), explain how the Portuguese established colonial rule.',
            steps: [
            { text: 'Identify the initial contact — Vasco da Gama (1498) sought pepper trade, but faced Arab merchant opposition in Calicut.' },
            { text: 'Recognize the shift to force — Albuquerque captured Goa (1510) not for trade alone but as a naval base to control the.' },
            { text: 'Analyze the fortified settlement — Goa became the capital of *Estado da Índia*, with forts, churches, and a married.' },
            { text: 'Trace political domination — Portuguese issued *cartazes* (passes) to Indian ships, taxed trade, and intervened in.' },
            { text: 'Evaluate significance — This created the *template*: armed trade → territorial base → maritime monopoly → political.', faded: true, blankAnswer: 'The Portuguese turned a trade mission into a colonial state.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_hist_ch3_6', title: 'Identify each idea',
          dissect: { specimen: 'English East India Company: Trading Posts and Expansion', spots: [
            { id: 's1', label: 'The English East India Company', prompt: 'Which idea is this? — The English East India Company (EIC) established its first trading posts (factories) in.', answer: 'The English East India Company', options: ['The English East India Company', 'The Battle of Plassey 23', 'The Battle of Buxar 1764', 'Early Resistance to British Rule'] },
            { id: 's2', label: 'The Battle of Plassey 23', prompt: 'Which idea is this? — The Battle of Plassey (23 June 1757) was a decisive military engagement near Murshidabad,.', answer: 'The Battle of Plassey 23', options: ['The Battle of Plassey 23', 'The English East India Company', 'The Battle of Buxar 1764', 'Early Resistance to British Rule'] },
            { id: 's3', label: 'The Battle of Buxar 1764', prompt: 'Which idea is this? — The Battle of Buxar (1764) was a decisive military conflict fought between the English.', answer: 'The Battle of Buxar 1764', options: ['The Battle of Buxar 1764', 'The English East India Company', 'The Battle of Plassey 23', 'Early Resistance to British Rule'] },
            { id: 's4', label: 'Early Resistance to British Rule', prompt: 'Which idea is this? — Early Resistance to British Rule refers to the series of localized, diverse uprisings.', answer: 'Early Resistance to British Rule', options: ['Early Resistance to British Rule', 'The English East India Company', 'The Battle of Plassey 23', 'The Battle of Buxar 1764'] },
            { id: 's5', label: 'Colonialism is a system where', prompt: 'Which idea is this? — Colonialism is a system where a powerful country establishes political control over a.', answer: 'Colonialism is a system where', options: ['Colonialism is a system where', 'The English East India Company', 'The Battle of Plassey 23', 'The Battle of Buxar 1764'] }
          ] } }
    ],
    explore: { component: C8_HistoryCivicsBattlePlassey1757Sim, prompt: 'Explore the interactive — English East India Company: Trading Posts and Expansion' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_hist_ch3_5', difficulty: 'standard',
          question: 'The English East India Company (EIC) established its first trading posts.',
          hint: 'If stuck, revisit c7_hist_ch04_004 (Gupta administration is not Mughal — correct.',
          misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.',
          parts: [
                { id: 'a', prompt: 'Why did Mughal Emperor Jahangir grant a farman to the English in 1613 allowing them to establish a factory at Surat?', answer: 'Jahangir granted the farman',
                  options: ['Jahangir granted the farman', 'the English defeated the Mughals', 'Jahangir wanted to convert to Christianity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.' }
          ],
            remediations: { 'the-english-east-india-company': { steps: ['Use a comparative map activity: Plot Portuguese (Goa, Diu), Dutch (Pulicat, Nagapattinam), and English (Surat, Madras,.', 'Color-code: red for fortified territories, blue for trade-only factories.', 'Ask: "Which European power held the most fortified land in 1700?" (Portuguese).', 'Then overlay Mughal empire boundaries.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The English East India Company\'s transition from traders to rulers was inevitable once they obtained the right to issue dastaks (trade.', answer: 'The statement is partially valid but oversimplified',
                  options: ['The statement is partially valid but oversimplified', 'military superiority'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.' },
                { id: 'b', prompt: 'Create a timeline with annotations showing how the English East India Company converted commercial privileges into territorial control at three specific.', answer: 'A strong timeline includes: 1613 Surat',
                  options: ['A strong timeline includes: 1613 Surat', 'military superiority'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the English East India Company conquered India through superior military technology from the start.' }
          ],
            remediations: { 'the-english-east-india-company': { steps: ['Use a comparative map activity: Plot Portuguese (Goa, Diu), Dutch (Pulicat, Nagapattinam), and English (Surat, Madras,.', 'Color-code: red for fortified territories, blue for trade-only factories.', 'Ask: "Which European power held the most fortified land in 1700?" (Portuguese).', 'Then overlay Mughal empire boundaries.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_6', difficulty: 'standard',
          question: 'The Battle of Plassey (23 June 1757) was a decisive military engagement near.',
          hint: 'If stuck, revisit the "farman of 1717" (Mughal emperor\'s trade grant to EIC) and.',
          misconception: 'Students believe the British won Plassey because of superior European military technology and discipline, imagining a.',
          parts: [
                { id: 'a', prompt: 'Why did Siraj-ud-Daulah attack the British factory at Calcutta in 1756, and how did the British respond?', answer: 'Siraj-ud-Daulah attacked Calcutta',
                  options: ['Siraj-ud-Daulah attacked Calcutta', 'trade disputes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the British won Plassey because of superior European military technology and discipline, imagining a classic "modern vs.' },
                { id: 'b', prompt: 'The Jagat Seths (wealthy Bengali bankers) financed the conspiracy against Siraj-ud-Daulah.', answer: 'The Jagat Seths backed the British',
                  options: ['The Jagat Seths backed the British', 'they hated Indians', 'they were pro-British ideologically'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the British won Plassey because of superior European military technology and discipline, imagining a classic "modern vs.' }
          ],
            remediations: { 'the-british-won-plassey-because': { steps: ['If the student holds this misconception, have them: (1) Compare the troop composition table — note French officers.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_7', difficulty: 'standard',
          question: 'The Battle of Buxar (1764) was a decisive military conflict fought between the.',
          hint: 'If stuck, review node `c8_hist_ch3_6` (Battle of Plassey) to understand how the East.',
          misconception: 'Students frequently believe that the Battle of Plassey (1757) gave the British direct, sovereign control over Bengal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Battle of Buxar (1764) was a decisive military conflict fought between the English',
                  options: ['The Battle of Buxar (1764) was a decisive military conflict fought between the English', 'The English East India Company (EIC) established its first trading posts (factories) in', 'The Battle of Plassey (23 June 1757) was a decisive military engagement near Murshidabad,', 'Early Resistance to British Rule refers to the series of localized, diverse uprisings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe that the Battle of Plassey (1757) gave the British direct, sovereign control over Bengal and the authority to.' }
          ],
            remediations: { 'students-frequently-believe-that-the': { steps: ['Step 1 (Distinction): Draw a clear 2-column comparative table on the board labeled "Plassey (1757)" vs "Buxar (1764)".', 'Step 2 (Actors & Legal Status): Under Plassey, write "Defeated Nawab Siraj-ud-Daulah -> Installed puppet Mir Jafar ->.', 'Step 3 (Primary Source Visual): Display the text/drawing of Clive receiving the Diwani grant from Shah Alam II in 1765,.', 'Step 4 (Re-assessment): Ask the student: "In which battle did the British defeat the supreme sovereign of India (the.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_1', difficulty: 'standard',
          question: 'Early Resistance to British Rule refers to the series of localized, diverse.',
          hint: 'Revisit c6_history_ch10_041 (Expansion of British Rule in India) — focus on the sections.',
          misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).',
          parts: [
                { id: 'a', prompt: 'The Sanyasi Rebellion (1770s) is often described as a bandit uprising. Why is this a misconception? Explain using the economic context of Bengal after 1765.', answer: 'The Sanyasis were not mere bandits',
                  options: ['The Sanyasis were not mere bandits', 'sepoy mutinies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' },
                { id: 'b', prompt: 'Compare the Vellore Mutiny (1806) and the Paika Rebellion (1817) on three dimensions: (a) immediate trigger, (b) social base, (c) British response.', answer: 'immediate trigger, (',
                  options: ['immediate trigger, (', 'Indians vs British', 'sepoy mutinies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' }
          ],
            remediations: { 'all-pre-1857-uprisings-were': { steps: ['Create a 3-column table: Uprising | Social Base (Peasant/Tribal/Sepoy/Ruler) | Primary Grievance (Land Tax / Cultural /.', 'Plot each uprising on an outline map of India.', 'Colour-code by social base.', 'Ask: "Which column has the most entries?" This visual comparison breaks the "all sepoy mutiny" myth by showing.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch4_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Pre-1857 uprisings failed because they lacked modern weapons and organization." Support your judgment with evidence from at least two.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'backwardness', 'sepoy mutinies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' },
                { id: 'b', prompt: 'Compare the Vellore Mutiny (1806) and the Paika Rebellion (1817) on three dimensions: (a) immediate trigger, (b) social base, (c) British response.', answer: 'immediate trigger, (',
                  options: ['immediate trigger, (', 'Indians vs British', 'sepoy mutinies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe all pre-1857 uprisings were "sepoy mutinies" driven by religious offense (like the greased cartridge).' }
          ],
            remediations: { 'all-pre-1857-uprisings-were': { steps: ['Create a 3-column table: Uprising | Social Base (Peasant/Tribal/Sepoy/Ruler) | Primary Grievance (Land Tax / Cultural /.', 'Plot each uprising on an outline map of India.', 'Colour-code by social base.', 'Ask: "Which column has the most entries?" This visual comparison breaks the "all sepoy mutiny" myth by showing.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_1', difficulty: 'standard',
          question: 'Colonialism is a system where a powerful country establishes political control.',
          hint: 'Revisit Class 6 Chapter "The Coming of the Europeans" (c6_history_ch10_039) and "The East.',
          misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.',
          parts: [
                { id: 'a', prompt: 'What year did Vasco da Gama reach Calicut, and which European power did he represent?', answer: 'Vasco da Gama reached Calicut in 1498 representing Portugal',
                  options: ['Vasco da Gama reached Calicut in 1498 representing Portugal', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' },
                { id: 'b', prompt: 'Compare the *motives* of the East India Company (chartered 1600) and the Mughal emperor Jahangir (who gave them a farman in 1615).', answer: 'Alignment: Company wanted trade monopoly',
                  options: ['Alignment: Company wanted trade monopoly', 'both wanted territory', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' }
          ],
            remediations: { 'colonialism-began-with-the-battle': { steps: ['Draw a 1498–1757 timeline on the board.', 'Mark Portuguese (1498, 1510 Goa), Dutch (1605 Masulipatnam), English (1600 charter, 1613 Surat, 1639 Madras), French.', 'Ask: "Who was strongest in 1650?" (Answer: Dutch in spice trade; Mughals on land).', 'Explain Plassey was a *turning point*, not the *start*. Use a map showing European enclaves pre-1757 to visualize the.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.',
          parts: [
                { id: 'a', prompt: '"Colonialism in India was inevitable after 1498." Evaluate this statement using evidence from the 16th–17th centuries.', answer: 'Not inevitable',
                  options: ['Not inevitable', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' },
                { id: 'b', prompt: 'Compare the *motives* of the East India Company (chartered 1600) and the Mughal emperor Jahangir (who gave them a farman in 1615).', answer: 'Alignment: Company wanted trade monopoly',
                  options: ['Alignment: Company wanted trade monopoly', 'both wanted territory', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.' }
          ],
            remediations: { 'colonialism-began-with-the-battle': { steps: ['Draw a 1498–1757 timeline on the board.', 'Mark Portuguese (1498, 1510 Goa), Dutch (1605 Masulipatnam), English (1600 charter, 1613 Surat, 1639 Madras), French.', 'Ask: "Who was strongest in 1650?" (Answer: Dutch in spice trade; Mughals on land).', 'Explain Plassey was a *turning point*, not the *start*. Use a map showing European enclaves pre-1757 to visualize the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
