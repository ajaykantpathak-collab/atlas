import type { SimDef } from '../../engine/types';
import C8_SocialScienceCulturalCurrentsSim from '../../../simulations/c6_12/C8_SocialScienceCulturalCurrentsSim';

/** v3 wrapped master — C8_SocialScienceCulturalCurrentsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_socialscienceculturalcurrentssim: SimDef = {
    id: 'v3w_c8_socialscienceculturalcurrentssim',
    title: 'Social Science Cultural Currents',
    subtitle: 'This node covers the definition, core features (political control, economic exploitation,.',
    classLevel: 8, subject: 'science', topic: 'Colonialism: Definition and Historical Context',
    chapters: [],
    nodeIds: ['c8_hist_ch3_1', 'c8_hist_ch3_10', 'c8_hist_ch5_1', 'c8_hist_ch5_10', 'c8_hist_ch5_11', 'c8_hist_ch5_9', 'c8_hist_ch4_1', 'c8_hist_ch4_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are visiting the Basilica of Bom Jesus in Old Goa or St.', goal: 'Master Social Science Cultural Currents.' },
    discovery: {
        question: 'Compare the *motives* of the East India Company (chartered 1600) and the Mughal emperor Jahangir (who gave them a farman in 1615).',
        options: ['Alignment: Company wanted trade monopoly', 'both wanted territory', 'colonialism *began* with the Battle of Plassey (1757) and was *only* British'],
        answer: 'Alignment: Company wanted trade monopoly',
        hook: 'Students think colonialism *began* with the Battle of Plassey (1757) and was *only* British.',
    },
    teaching: [
        { title: 'Colonialism is a system where a powerful.', text: 'Colonialism is a system where a powerful country establishes political control over a weaker territory, exploits its resources and labor for economic gain, and imposes its cultural and administrative.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_hist_ch3_1', title: 'Colonialism is a system where a.',
          scaffold: { problem: 'Using the three-stage framework (trade → fortified settlement → political domination), explain how the Portuguese established colonial rule.',
            steps: [
            { text: 'Identify the initial contact — Vasco da Gama (1498) sought pepper trade, but faced Arab merchant opposition in Calicut.' },
            { text: 'Recognize the shift to force — Albuquerque captured Goa (1510) not for trade alone but as a naval base to control the.' },
            { text: 'Analyze the fortified settlement — Goa became the capital of *Estado da Índia*, with forts, churches, and a married.' },
            { text: 'Trace political domination — Portuguese issued *cartazes* (passes) to Indian ships, taxed trade, and intervened in.' },
            { text: 'Evaluate significance — This created the *template*: armed trade → territorial base → maritime monopoly → political.', faded: true, blankAnswer: 'The Portuguese turned a trade mission into a colonial state.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch3_10', title: 'The Social and Cultural Impact of.',
          scaffold: { problem: 'Explain why the 1835 English Education Act is considered a turning point in Indian social history, using the formula: Colonial Policy +.',
            steps: [
            { text: 'Identify the Colonial Policy—Macaulay\'s Minute and the 1835 Act defunded Oriental learning (Sanskrit/Arabic) and made.' },
            { text: 'Identify the Indigenous Reform Tradition—Raja Ram Mohan Roy had already petitioned for Western science education in.' },
            { text: 'Identify Material Dislocation—c8_hist_ch3_9 shows weavers/artisans losing livelihoods; families saw English education.' },
            { text: 'Trace the Contested Modernity—The Act produced a Western-educated intelligentsia (later nationalists) but also deepened.' },
            { text: 'Evaluate significance—The Act didn\'t just impose English; it restructured the social ladder, making English the new.', faded: true, blankAnswer: 'The 1835 Act was a turning point because it made English.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch5_1', title: 'Indian architecture is a continuous.',
          scaffold: { problem: 'Explain why the Kandariya Mahadeva Temple at Khajuraho (c. 1030 CE) could achieve a soaring 31-metre shikhara without mortar or iron.',
            steps: [
            { text: 'Identify the structural system — the shikhara is built by corbelling horizontal stone courses, each projecting slightly.' },
            { text: 'Analyse the material — fine-grained sandstone from nearby quarries allows precise dressing and tight joints,.' },
            { text: 'Examine the plan — the high plinth (jagati) and multiple projecting balconies (urah shringas) act as buttressing.' },
            { text: 'Consider the symbolic driver — the shikhara must represent Mount Meru; its verticality is non-negotiable, so the.' },
            { text: 'Contrast with Gothic — European cathedrals used pointed arches and vaults that thrust outward, requiring external.', faded: true, blankAnswer: 'The Kandariya Mahadeva\'s height comes from corbelled stone.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch5_10', title: 'Colonial architecture in India.',
          scaffold: { problem: 'Explain why the British chose Gothic Revival for St. Paul\'s Cathedral, Kolkata (1847) but Indo-Saracenic for the Madras High Court (1892),.',
            steps: [
            { text: 'Identify the building type and date—St. Paul\'s is an Anglican cathedral built under Company rule (pre-1857); Madras.' },
            { text: 'Analyze the intended audience—St. Paul\'s served the British expatriate community and projected Anglican religious.' },
            { text: 'Examine the stylistic signals—Gothic Revival (pointed arches, verticality, stained glass) signaled Victorian Christian.' },
            { text: 'Connect to political context—Pre-1857, the Company emphasized its distinct European identity; post-1857, the Crown.' },
            { text: 'Evaluate significance—The stylistic switch was not aesthetic but ideological: architecture as a tool for managing.', faded: true, blankAnswer: 'St. Paul\'s used Gothic Revival to assert British Christian.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch5_11', title: 'Regional architecture in India.',
          scaffold: { problem: 'Explain why Bishnupur’s temples use terracotta narrative panels instead of stone sculpture, linking geology, technology, and religious.',
            steps: [
            { text: 'Identify the geological constraint — Bengal’s alluvial plain has no quarryable stone; the nearest sandstone is 300 km.' },
            { text: 'Recognize the technological solution — local potters (kumbhakars) developed high-fired terracotta bricks and moulded.' },
            { text: 'Connect to religious practice — the Malla kings adopted Gaudiya Vaishnavism (c.' },
            { text: 'Contrast with stone temples — unlike Khajuraho or Konark where stone carvers chisel each figure, Bishnupur’s moulds.' },
            { text: 'Evaluate significance — this is not "poor man’s stone" but a deliberate material culture: terracotta’s red colour.', faded: true, blankAnswer: 'Bishnupur’s terracotta panels arise from the convergence of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_hist_ch5_9', title: 'Stepwells (vavs in Gujarat, baoris in.',
          scaffold: { problem: 'Using the architectural evidence of Rani ki Vav, explain how the Solanki dynasty used water architecture to legitimise their rule in 11th.',
            steps: [
            { text: 'Identify the patron (Queen Udayamati), date (c. 1063 CE), and dynasty (Solanki/Chaulukya) — establish historical.' },
            { text: 'Analyse the architectural form — inverted temple descending 7 levels to water, with 500+ sculptures predominantly.' },
            { text: 'Connect iconography to political theology — Vishnu as preserver-king mirrors the Solanki ruler\'s role; the descent to.' },
            { text: 'Situate in regional ecology — Gujarat\'s uncertain monsoon made water control = political control; the stepwell served.' },
            { text: 'Compare with contemporary temple patronage (e.g., Modhera Sun Temple, same dynasty) — stepwells reached wider publics.', faded: true, blankAnswer: 'Rani ki Vav legitimised Solanki rule by transforming a.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_hist_ch3_10', title: 'Identify each idea',
          dissect: { specimen: 'Social Science Cultural Currents', spots: [
            { id: 's1', label: 'Colonialism is a system where', prompt: 'Which idea is this? — Colonialism is a system where a powerful country establishes political control over a.', answer: 'Colonialism is a system where', options: ['Colonialism is a system where', 'The Social and Cultural Impact', 'Indian architecture is a continuous', 'Colonial architecture in India 16th20th'] },
            { id: 's2', label: 'The Social and Cultural Impact', prompt: 'Which idea is this? — The Social and Cultural Impact of British Colonialism refers to the profound.', answer: 'The Social and Cultural Impact', options: ['The Social and Cultural Impact', 'Colonialism is a system where', 'Indian architecture is a continuous', 'Colonial architecture in India 16th20th'] },
            { id: 's3', label: 'Indian architecture is a continuous', prompt: 'Which idea is this? — Indian architecture is a continuous tradition from the 3rd millennium BCE to the present.', answer: 'Indian architecture is a continuous', options: ['Indian architecture is a continuous', 'Colonialism is a system where', 'The Social and Cultural Impact', 'Colonial architecture in India 16th20th'] },
            { id: 's4', label: 'Colonial architecture in India 16th20th', prompt: 'Which idea is this? — Colonial architecture in India (16th–20th century) refers to the forts, churches, and.', answer: 'Colonial architecture in India 16th20th', options: ['Colonial architecture in India 16th20th', 'Colonialism is a system where', 'The Social and Cultural Impact', 'Indian architecture is a continuous'] },
            { id: 's5', label: 'Regional architecture in India 17th19th', prompt: 'Which idea is this? — Regional architecture in India (17th–19th centuries) refers to distinct building.', answer: 'Regional architecture in India 17th19th', options: ['Regional architecture in India 17th19th', 'Colonialism is a system where', 'The Social and Cultural Impact', 'Indian architecture is a continuous'] },
            { id: 's6', label: 'Stepwells vavs in Gujarat baoris', prompt: 'Which idea is this? — Stepwells (vavs in Gujarat, baoris in Rajasthan) are multi-storeyed subterranean.', answer: 'Stepwells vavs in Gujarat baoris', options: ['Stepwells vavs in Gujarat baoris', 'Colonialism is a system where', 'The Social and Cultural Impact', 'Indian architecture is a continuous'] }
          ] } }
    ],
    explore: { component: C8_SocialScienceCulturalCurrentsSim, prompt: 'Explore the interactive — Social Science Cultural Currents' },
    challenges: [
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
            remediations: { 'colonialism-began-with-the-battle': { steps: ['Draw a 1498–1757 timeline on the board.', 'Mark Portuguese (1498, 1510 Goa), Dutch (1605 Masulipatnam), English (1600 charter, 1613 Surat, 1639 Madras), French.', 'Ask: "Who was strongest in 1650?" (Answer: Dutch in spice trade; Mughals on land).', 'Explain Plassey was a *turning point*, not the *start*. Use a map showing European enclaves pre-1757 to visualize the.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_10', difficulty: 'standard',
          question: 'The Social and Cultural Impact of British Colonialism refers to the profound.',
          hint: 'Revisit c8_hist_ch3_9 (economic ruin of artisans) and c7_hist_ch06_008 (Bhakti movement\'s.',
          misconception: 'Students think British social reforms (banning sati, allowing widow remarriage) were universally welcomed by Indians as.',
          parts: [
                { id: 'a', prompt: 'In which year was the English Education Act passed, and who was the Governor-General responsible for it?', answer: 'The English Education Act was passed in 1835 under Governor-General Lord William',
                  options: ['The English Education Act was passed in 1835 under Governor-General Lord William', 'progress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think British social reforms (banning sati, allowing widow remarriage) were universally welcomed by Indians as "progress." In.' }
          ],
            remediations: { 'british-social-reforms-banning-sati': { steps: ['Show the 1829 petition by orthodox Hindus to the Privy Council opposing the sati ban (primary source).', 'Contrast with Roy\'s 1830 petition supporting it.', 'Map both positions on a spectrum: "Collaboration with British," "Resistance using British law," "Rejection of British.', 'Ask student to place Phule\'s 1873 *Gulamgiri* on this spectrum and explain why.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch3_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think British social reforms (banning sati, allowing widow remarriage) were universally welcomed by Indians as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "British social legislation (like the Widow Remarriage Act, 1856) was purely a humanitarian measure." Use evidence from the period to.', answer: 'The statement is largely false',
                  options: ['The statement is largely false', 'progress'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think British social reforms (banning sati, allowing widow remarriage) were universally welcomed by Indians as "progress." In.' }
          ],
            remediations: { 'british-social-reforms-banning-sati': { steps: ['Show the 1829 petition by orthodox Hindus to the Privy Council opposing the sati ban (primary source).', 'Contrast with Roy\'s 1830 petition supporting it.', 'Map both positions on a spectrum: "Collaboration with British," "Resistance using British law," "Rejection of British.', 'Ask student to place Phule\'s 1873 *Gulamgiri* on this spectrum and explain why.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_1', difficulty: 'standard',
          question: 'Indian architecture is a continuous tradition from the 3rd millennium BCE to.',
          hint: 'Review the Mauryan polished pillars (monolithic technology) and the Gupta-era Dashavatara.',
          misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until.',
          parts: [
                { id: 'a', prompt: 'Name two distinct historical periods before the 12th century CE when Indian architecture made significant technological advances in stone construction, and.', answer: 'Mauryan period (3rd century BCE)',
                  options: ['Correct answer: Mauryan period (3rd century BCE)', 'technology', 'Indian architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'b', prompt: 'Why did Indian builders continue using the post-and-lintel (trabeate) system for temples long after the arch and dome were known from the 12th century onwards?', answer: 'The trabeate system was deeply tied to Hindu temple symbolism',
                  options: ['Correct answer: The trabeate system was deeply tied to Hindu temple symbolism', 'they didn\'t know how to build arches', 'Indian architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'c', prompt: 'A historian argues that the shift from rock-cut to free-standing structural temples in the Deccan (e.g., Chalukya temples at Badami, Pattadakal) was driven.', answer: 'Correct reasoning: The claim is partially true but incomplete',
                  options: ['Correct reasoning: The claim is partially true but incomplete', 'Indian architecture', 'Hindu architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' }
          ],
            remediations: { 'indian-architecture-is-a-single': { steps: ['If the student holds this misconception, have them compare three images side-by-side: (1) a 7th-century Chalukya temple.', 'Ask: "Which building uses \'Islamic\' technology?" Guide them to see that all three use corbelling — the mosque screen.', 'Then introduce the true arch in the Alai Darwaza (1311 CE) as a *new* arrival, not the beginning of Indian stone.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Indo-Islamic architecture is simply a mechanical mixing of Hindu and Islamic elements." Use the concepts of *syncretism* and.', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'Hindu motifs on Islamic buildings', 'Indian architecture', 'Hindu architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' },
                { id: 'b', prompt: 'Create a conceptual timeline (not just dates) showing how the *idea* of the "sacred mountain" (Meru/Kailasa) evolves in built form from the Buddhist stupa.', answer: 'Expected answer: 1) Stupa (3rd c',
                  options: ['Expected answer: 1) Stupa (3rd c', 'Indian architecture', 'Hindu architecture', 'new technology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Indian architecture" is a single, unchanging style called "Hindu architecture" until Muslims brought "new.' }
          ],
            remediations: { 'indian-architecture-is-a-single': { steps: ['If the student holds this misconception, have them compare three images side-by-side: (1) a 7th-century Chalukya temple.', 'Ask: "Which building uses \'Islamic\' technology?" Guide them to see that all three use corbelling — the mosque screen.', 'Then introduce the true arch in the Alai Darwaza (1311 CE) as a *new* arrival, not the beginning of Indian stone.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_10', difficulty: 'standard',
          question: 'Colonial architecture in India (16th–20th century) refers to the forts,.',
          hint: 'Revisit c6_history_ch10_039 (European arrival sequence) and c7_hist_ch07_008.',
          misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built.',
          parts: [
                { id: 'a', prompt: 'Why did the British shift from Neo-Classical to Indo-Saracenic style for major public buildings after 1857?', answer: 'After the 1857 Revolt, the British Crown sought to legitimize rule by visually',
                  options: ['After the 1857 Revolt, the British Crown sought to legitimize rule by visually', 'legitimate heirs to Indian empire', 'aesthetic preference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built British buildings in.' },
                { id: 'b', prompt: 'Compare the spatial layout of Fort St. George (Chennai) with the Red Fort (Delhi).', answer: 'Fort St',
                  options: ['Fort St', 'the British just built British buildings in India', 'colonial architecture in India was a one-way copy of European styles (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built British buildings in.' }
          ],
            remediations: { 'colonial-architecture-in-india-was': { steps: ['Show side-by-side images of the British Museum (London) and Victoria Memorial (Kolkata)—ask students to list 5.', 'Read a 1900 letter by architect William Emerson describing his study of "Indian Saracenic" buildings before designing.', 'Have students trace the origin of the chhatri (Rajput) and bangla roof (Bengal) in Indo-Saracenic buildings using the.', 'Rewrite the misconception as: "Colonial architecture was a dialogue—unequal, but a dialogue—between European imperial.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Indo-Saracenic architecture was a genuine synthesis of Indian and European traditions, not just a British imposition." Defend your.', answer: 'The claim is partially valid but overstated',
                  options: ['The claim is partially valid but overstated', 'the British just built British buildings in India', 'colonial architecture in India was a one-way copy of European styles (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe colonial architecture in India was a one-way copy of European styles (e.g., "the British just built British buildings in.' }
          ],
            remediations: { 'colonial-architecture-in-india-was': { steps: ['Show side-by-side images of the British Museum (London) and Victoria Memorial (Kolkata)—ask students to list 5.', 'Read a 1900 letter by architect William Emerson describing his study of "Indian Saracenic" buildings before designing.', 'Have students trace the origin of the chhatri (Rajput) and bangla roof (Bengal) in Indo-Saracenic buildings using the.', 'Rewrite the misconception as: "Colonial architecture was a dialogue—unequal, but a dialogue—between European imperial.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_11', difficulty: 'standard',
          question: 'Regional architecture in India (17th–19th centuries) refers to distinct.',
          hint: 'If stuck, revisit c8_hist_ch5_5’s worked example on temple typology and c8_hist_ch5_7’s.',
          misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards.',
          parts: [
                { id: 'a', prompt: 'Name the primary building material used in Bishnupur temples and explain why it was chosen over stone.', answer: 'The primary material is terracotta (burnt clay bricks and tiles)',
                  options: ['The primary material is terracotta (burnt clay bricks and tiles)', 'marble', 'variations of the same Indian architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards and ornamentation.' },
                { id: 'b', prompt: 'A Chettinad mansion has a central courtyard (mutram), thick lime-plastered walls, and Burma teak columns.', answer: 'The courtyard enables cross-ventilation in the hot, humid Tamil coast',
                  options: ['The courtyard enables cross-ventilation in the hot, humid Tamil coast', 'traditional', 'variations of the same Indian architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards and ornamentation.' }
          ],
            remediations: { 'these-three-styles-are-variations': { steps: ['Revisit c8_hist_ch5_5 (Temple Architecture) and c8_hist_ch5_7 (Islamic Architecture) to recall how imperial styles.', 'Use a map to trace the trade routes — Bengal silk to Mughal courts, Shekhawati caravans to Delhi/Sindh, Chettinad ships.', 'Create a three-column table: Patron | Building Type | Key Material | Climate Response. Fill it using textbook images.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Regional architecture in Bishnupur, Shekhawati, and Chettinad is merely a simplified copy of Mughal or Dravida styles." Provide.', answer: 'The statement is false',
                  options: ['The statement is false', 'variations of the same Indian architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards and ornamentation.' },
                { id: 'b', prompt: 'Design a comparative timeline (1600–1900) that plots the peak building activity in all three regions alongside major historical events (e.g., Mughal decline,.', answer: 'Bishnupur peaks 1600–1750 (Malla zenith before Maratha raids)',
                  options: ['Bishnupur peaks 1600–1750 (Malla zenith before Maratha raids)', 'variations of the same Indian architecture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe these three styles are "variations of the same Indian architecture" because they all use courtyards and ornamentation.' }
          ],
            remediations: { 'these-three-styles-are-variations': { steps: ['Revisit c8_hist_ch5_5 (Temple Architecture) and c8_hist_ch5_7 (Islamic Architecture) to recall how imperial styles.', 'Use a map to trace the trade routes — Bengal silk to Mughal courts, Shekhawati caravans to Delhi/Sindh, Chettinad ships.', 'Create a three-column table: Patron | Building Type | Key Material | Climate Response. Fill it using textbook images.'] } } },
        { type: 'subpart', nodeId: 'c8_hist_ch5_9', difficulty: 'standard',
          question: 'Stepwells (vavs in Gujarat, baoris in Rajasthan) are multi-storeyed.',
          hint: 'Revisit c7_hist_ch06_003 (Chalukya/Solanki kingdom) and c7_hist_ch06_007 (Nagara temple.',
          misconception: 'Students often think stepwells are "just fancy wells" or "underground temples" — missing that they are a distinct.',
          parts: [
                { id: 'a', prompt: 'Why did rulers in arid western India invest in elaborate stepwells rather than simple open wells or tanks?', answer: 'Stepwells provided year-round access to receding groundwater through descending',
                  options: ['Stepwells provided year-round access to receding groundwater through descending', 'water storage', 'just fancy wells'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think stepwells are "just fancy wells" or "underground temples" — missing that they are a distinct architectural category.' }
          ],
            remediations: { 'stepwells-are-just-fancy-wells': { steps: ['Show a cross-section diagram of Rani ki Vav (available on UNESCO/ASI websites) — have students label: water table,.', 'Compare with a simple open well diagram — list what the stepwell adds (cooling, storage, ritual space, social space).', 'Read a 12th-century Sanskrit inscription from Patan (translated) describing Udayamati\'s merit-making — discuss why a.', 'Map stepwell locations against rainfall zones — students see the correlation between aridity and stepwell density,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
