import type { SimDef } from '../../engine/types';
import C12_HistoryPeasantsZamindarsStateSim from '../../../simulations/c6_12/C12_HistoryPeasantsZamindarsStateSim';

/** v3 wrapped master — C12_HistoryPeasantsZamindarsStateSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historypeasantszamindarsstatesim: SimDef = {
    id: 'v3w_c12_historypeasantszamindarsstatesim',
    title: 'The Village Community: Headman (Muqaddam), Patwari and Collective Responsibility',
    subtitle: 'This node covers the internal structure and functioning of the Mughal village community:.',
    classLevel: 12, subject: 'history', topic: 'The Village Community: Headman (Muqaddam), Patwari and Collective Responsibility',
    chapters: [],
    nodeIds: ['c12_hist_cbse_08_003', 'c12_hist_cbse_08_005', 'c12_hist_cbse_08_006', 'c12_hist_cbse_08_007', 'c12_hist_cbse_08_009', 'c12_hist_cbse_08_011', 'c12_hist_cbse_08_012', 'c12_hist_cbse_09_002', 'c12_hist_cbse_08_001', 'c12_hist_cbse_08_004', 'c12_hist_cbse_08_010', 'c12_hist_cbse_08_002', 'c12_hist_cbse_09_004', 'c12_hist_cbse_09_007', 'c12_hist_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are visiting a present-day gram panchayat office in rural India and see the sarpanch and.', goal: 'Master The Village Community: Headman (Muqaddam), Patwari and Collective Responsibility.' },
    discovery: {
        question: 'A village panchayat in 1650 Punjab receives a petition from lower-caste cultivators complaining that the zamindar\'s officials are demanding begar (unpaid.',
        options: ['Desertion was effective', 'peasants had no power', 'desertion was rare'],
        answer: 'Desertion was effective',
        hook: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village.',
    },
    teaching: [
        { title: 'The village community in Mughal India (c..', text: 'The village community in Mughal India (c. 1550–1700) was a collective social unit comprising cultivators, a village panchayat (assembly of elders), and a headman (muqaddam/mandal) assisted by a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_08_003', title: 'The village community in Mughal India.',
          scaffold: { problem: 'Using Babur\'s description of village mobility (Source 1, NCERT p.',
            steps: [
            { text: 'Identify Babur\'s observation — he describes a highly mobile peasantry in early 16th century (pre-Mughal consolidation).' },
            { text: 'Identify the NCERT\'s settled village model — by Akbar\'s reign (late 16th century), the Ain-i-Akbari documents fixed.' },
            { text: 'Analyze the temporal shift — Babur writes c. 1520s; Ain-i-Akbari compiled 1590s.' },
            { text: 'Reconcile through state intervention — the muqaddam/patwari system, revenue contracts (zabt), and zamindar patronage.' },
            { text: 'Evaluate significance — the "mobile village" reflects pre-imperial fluidity; the "settled community" reflects Mughal.', faded: true, blankAnswer: 'Babur describes a pre-Mughal, rain-fed frontier where low.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_08_005', title: 'Zamindars in Mughal India (c..',
          scaffold: { problem: 'Using the Ain\'s data (384,558 sawar; 4,277,057 piyada; 1,863 elephants; 4,260 cannons; 4,500 boats), calculate the approximate military.',
            steps: [
            { text: 'Divide each Ain total by 3,000 to get per-pargana averages: sawar ≈ 128, piyada ≈ 1,425, elephants ≈ 0.6, cannons ≈.' },
            { text: 'Note that elephants, cannons, and boats are concentrated in large zamindaris (e.g., Bengal riverine, Rajputana forts) —.' },
            { text: 'Recognise that the Ain\'s totals aggregate across vastly different ecological zones (Punjab plains vs. Bengal delta vs.' },
            { text: 'Conclude that "typical" is a statistical fiction; historians must use regional records (Gujarat, Maharashtra, Rajasthan.' },
            { text: 'Connect to board exam requirement: "Explain limitations of Ain\'s quantitative data" (NCERT p.', faded: true, blankAnswer: 'Per-pargana average: ~128 sawar, ~1,425 piyada, <1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_08_006', title: 'The Zamindar\'s Military Retainers and.',
          scaffold: { problem: 'Explain how the Ain-i Akbari\'s mulk-abadi tables structurally integrate zamindar military power into the Mughal revenue system.',
            steps: [
            { text: 'Identify the mulk-abadi as the third daftar of the Ain, covering fiscal-administrative data for each suba.' },
            { text: 'Note the eight-column table structure for each sarkar: column 2 lists qilachas (forts), columns 7–8 list zamindar.' },
            { text: 'Recognise that placing forts and zamindar troops *inside* the revenue table (alongside measured area, cash revenue,.' },
            { text: 'Infer the logic: the state assessed zamindar military strength *simultaneously* with revenue potential — a strong.' },
            { text: 'Conclude that the Ain institutionalises zamindar military power as a component of revenue administration, not an.', faded: true, blankAnswer: 'The mulk-abadi tables integrate zamindar military power by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_08_007', title: 'The Mughal land revenue system (c..',
          scaffold: { problem: 'A revenue official in 1595 must assess jama for a village with 150 bighas Polaj (wheat + cotton), 50 bighas Parauti (fallow this year), 30.',
            steps: [
            { text: 'Identify land categories and their areas from the village record (paimish).' },
            { text: 'Apply the Ain\'s principle: "add together the produce of each sort, and the third of this represents the medium produce,.' },
            { text: 'Calculate Polaj jama: two crops per year. Wheat (rabi): 150 × 10 = 1,500 dams. Cotton (kharif): 150 × 15 = 2,250 dams.' },
            { text: 'Calculate Parauti jama (fallow, so only one crop assumed when cultivated): rate = 2/3 of Polaj average.' },
            { text: 'Chachar rate = 1/2 of Polaj average = 6.25 dams. 30 × 6.25 = 187.5 dams.' },
            { text: 'Banjar rate = 1/4 of Polaj average = 3.125 dams. 20 × 3.125 = 62.5 dams.' },
            { text: 'Sum = 3,750 + 416.5 + 187.5 + 62.5 = 4,416.5 dams ≈ 4,417 dams annual jama.', faded: true, blankAnswer: 'Total annual jama = 4,417 dams. This demonstrates how Zabt.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_08_009', title: 'The zamindar\'s right to collect revenue.',
          scaffold: { problem: 'Analyze a 1658 sanad granting a Rajput zamindar revenue rights over 50 villages in Amber suba.',
            steps: [
            { text: 'Identify the variables: jama = 2,00,000 dams; collection rate = 90% → actual hasil = 1,80,000 dams.' },
            { text: 'Calculate nankar (collection charge): 15% of hasil = 27,000 dams.' },
            { text: 'Calculate state\'s share: hasil - nankar = 1,53,000 dams (remitted to treasury).' },
            { text: 'Add milkiyat income: assume 5 villages yield 20,000 dams (conservative estimate).' },
            { text: 'Net income = nankar + milkiyat = 47,000 dams.' },
            { text: 'Analyze incentives: nankar incentivizes maximizing collection (cooperation); but high jama or military costs (200.', faded: true, blankAnswer: 'Net annual income ≈ 47,000 dams. The structure aligns.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_08_011', title: 'Trade in agricultural goods during the.',
          scaffold: { problem: 'Explain how the cultivation of cotton in the Deccan plateau connected to global trade in the 17th century, and identify the points where.',
            steps: [
            { text: 'Identify cotton as a jins-i kamil crop grown widely in the Deccan (Berar, Khandesh) for market sale, not just.' },
            { text: 'Describe the peasant’s decision: he allocates land to cotton because cash revenue demand (zabt) forces him to earn.' },
            { text: 'Trace the physical movement: harvested cotton → village haat (zamindar collects market dues) → banjara caravan → qasba.' },
            { text: 'At Surat, European factors (English, Dutch) purchase cotton/textiles with silver rupees or bullion; the broker issues a.' },
            { text: 'Silver flows back: minted into rupyas → state treasury → pays mansabdars → mansabdars/jagirdars collect revenue in cash.' },
            { text: 'State fiscal benefit: (a) higher revenue rates on cotton land, (b) market dues at haats (zamindar’s share, part of.', faded: true, blankAnswer: 'Cotton linked Deccan villages to global markets via a.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hist_cbse_08_005', title: 'Identify each idea',
          dissect: { specimen: 'The Village Community: Headman (Muqaddam), Patwari and Collective Responsibility', spots: [
            { id: 's1', label: 'The village community in Mughal', prompt: 'Which idea is this? — The village community in Mughal India (c. 1550–1700) was a collective social unit.', answer: 'The village community in Mughal', options: ['The village community in Mughal', 'Zamindars in Mughal India c', 'The Zamindars Military Retainers and', 'The Mughal land revenue system'] },
            { id: 's2', label: 'Zamindars in Mughal India c', prompt: 'Which idea is this? — Zamindars in Mughal India (c. 1556–1707) were landed proprietors who held extensive.', answer: 'Zamindars in Mughal India c', options: ['Zamindars in Mughal India c', 'The village community in Mughal', 'The Zamindars Military Retainers and', 'The Mughal land revenue system'] },
            { id: 's3', label: 'The Zamindars Military Retainers and', prompt: 'Which idea is this? — The Zamindar\'s Military Retainers and the Fortified Stronghold (Qila) refers to the armed.', answer: 'The Zamindars Military Retainers and', options: ['The Zamindars Military Retainers and', 'The village community in Mughal', 'Zamindars in Mughal India c', 'The Mughal land revenue system'] },
            { id: 's4', label: 'The Mughal land revenue system', prompt: 'Which idea is this? — The Mughal land revenue system (c. 1556–1707) was the state\'s mechanism for assessing.', answer: 'The Mughal land revenue system', options: ['The Mughal land revenue system', 'The village community in Mughal', 'Zamindars in Mughal India c', 'The Zamindars Military Retainers and'] },
            { id: 's5', label: 'The zamindars right to collect', prompt: 'Which idea is this? — The zamindar\'s right to collect revenue refers to the Mughal state\'s practice of.', answer: 'The zamindars right to collect', options: ['The zamindars right to collect', 'The village community in Mughal', 'Zamindars in Mughal India c', 'The Zamindars Military Retainers and'] },
            { id: 's6', label: 'Trade in agricultural goods during', prompt: 'Which idea is this? — Trade in agricultural goods during the Mughal era (16th–17th centuries) refers to the.', answer: 'Trade in agricultural goods during', options: ['Trade in agricultural goods during', 'The village community in Mughal', 'Zamindars in Mughal India c', 'The Zamindars Military Retainers and'] }
          ] } }
    ],
    explore: { component: C12_HistoryPeasantsZamindarsStateSim, prompt: 'Explore the interactive — The Village Community: Headman (Muqaddam), Patwari and Collective Responsibility' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_003', difficulty: 'standard',
          question: 'The village community in Mughal India (c. 1550–1700) was a collective social.',
          hint: 'If stuck, revisit c7_hist_ch07_007 (Delhi Sultanate village officials) and.',
          misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village.',
          parts: [
                { id: 'a', prompt: 'A village panchayat in 1650 Punjab receives a petition from lower-caste cultivators complaining that the zamindar\'s officials are demanding begar (unpaid.', answer: 'Desertion was effective',
                  options: ['Desertion was effective', 'peasants had no power', 'desertion was rare'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' },
                { id: 'b', prompt: 'Compare the functions of the Mughal village panchayat (as described in Section 2.2) with those of a present-day Gram Panchayat under the 73rd Amendment.', answer: 'Similarities: (1) Both manage local welfare (water, roads, dispute resolution)',
                  options: ['Similarities: (1) Both manage local welfare (water, roads, dispute resolution)', 'same function, different era'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' }
          ],
            remediations: { 'students-often-conflate-the-muqaddam': { steps: ['If the student confuses muqaddam with zamindar: (1) Re-read NCERT Section 2.2 ("Panchayats and headmen") and Section 5.', 'If the "little republic" misconception persists: re-read Section 2.4 and list three specific inequalities the NCERT.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the British officials\' description of the Mughal village as a "little republic" (Section 2.4).', answer: 'The "little republic" label obscures more than it reveals',
                  options: ['The "little republic" label obscures more than it reveals', 'little republic', 'this was not a sign of rural egalitarianism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' },
                { id: 'b', prompt: 'Compare the functions of the Mughal village panchayat (as described in Section 2.2) with those of a present-day Gram Panchayat under the 73rd Amendment.', answer: 'Similarities: (1) Both manage local welfare (water, roads, dispute resolution)',
                  options: ['Similarities: (1) Both manage local welfare (water, roads, dispute resolution)', 'same function, different era'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate the muqaddam (village headman) with the zamindar, thinking both are "landlords" who own village land.' }
          ],
            remediations: { 'students-often-conflate-the-muqaddam': { steps: ['If the student confuses muqaddam with zamindar: (1) Re-read NCERT Section 2.2 ("Panchayats and headmen") and Section 5.', 'If the "little republic" misconception persists: re-read Section 2.4 and list three specific inequalities the NCERT.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_005', difficulty: 'standard',
          question: 'Zamindars in Mughal India (c. 1556–1707) were landed proprietors who held.',
          hint: 'If unclear on jama vs. hasil or the amil\'s duties, re-read node c12_hist_cbse_08_007.',
          misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights.',
          parts: [
                { id: 'a', prompt: 'Why did the Mughal state confirm zamindari rights through an imperial sanad rather than allowing conquest alone to legitimise a zamindar\'s authority?', answer: 'The state needed to control military resources and revenue flows',
                  options: ['The state needed to control military resources and revenue flows', 'the state respected traditional rights', 'zamindars were the owners of all land in their zamindari'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights (nankar/malikana).' },
                { id: 'b', prompt: 'Compare the zamindar\'s role in surplus extraction with that of the jagirdar (node 008).', answer: 'Similarities: both acted as intermediaries between state and peasantry',
                  options: ['Similarities: both acted as intermediaries between state and peasantry', 'dual intermediary', 'zamindars were the owners of all land in their zamindari'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights (nankar/malikana).' }
          ],
            remediations: { 'students-often-write-zamindars-were': { steps: ['Re-read the NCERT paragraphs on "The Zamindars" (pp.', '211–213) focusing on the distinction between milkiyat and revenue-collection lands.', 'Then revisit node c12_hist_cbse_08_003 (Village Community) to see how the muqaddam/patwari recorded peasant holdings.', 'Finally, re-attempt Diagnostic Question 1 and 4, writing a one-paragraph explanation of the property-rights distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Zamindars were exploiters of the peasantry with no redeeming function." Use evidence from bhakti literature and seventeenth-century.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'zamindars were the owners of all land in their zamindari'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights (nankar/malikana).' },
                { id: 'b', prompt: 'Compare the zamindar\'s role in surplus extraction with that of the jagirdar (node 008).', answer: 'Similarities: both acted as intermediaries between state and peasantry',
                  options: ['Similarities: both acted as intermediaries between state and peasantry', 'dual intermediary', 'zamindars were the owners of all land in their zamindari'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write "zamindars were the owners of all land in their zamindari" — confusing revenue-collection rights (nankar/malikana).' }
          ],
            remediations: { 'students-often-write-zamindars-were': { steps: ['Re-read the NCERT paragraphs on "The Zamindars" (pp.', '211–213) focusing on the distinction between milkiyat and revenue-collection lands.', 'Then revisit node c12_hist_cbse_08_003 (Village Community) to see how the muqaddam/patwari recorded peasant holdings.', 'Finally, re-attempt Diagnostic Question 1 and 4, writing a one-paragraph explanation of the property-rights distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_006', difficulty: 'standard',
          question: 'The Zamindar\'s Military Retainers and the Fortified Stronghold (Qila) refers to.',
          hint: 'If stuck, revisit the "parallel army" box in NCERT Theme 8 (p.',
          misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the.',
          parts: [
                { id: 'a', prompt: 'Why did the Mughal state tolerate zamindars maintaining forts (qilachas) and large armed contingents when these could challenge imperial authority?', answer: 'The state tolerated zamindar military power',
                  options: ['The state tolerated zamindar military power', 'the state was too weak to stop them', 'private armies defying the emperor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the emperor." In reality, the.' }
          ],
            remediations: { 'zamindar-forts-qilachas-and-retainers': { steps: ['Re-read NCERT Theme 8, Section 5 ("The Zamindars"), focusing on the "parallel army" box and the sanad/colonisation.', 'Revisit node c12_hist_cbse_08_005 (Zamindars: Rights, Military Power) to recall the revenue-military link.', 'Compare the Ain\'s zamindar troop table (mulk-abadi columns 7–8) with the mansabdari system (node 08_008).', 'Re-attempt Diagnostic Questions 2 and 4 — they test the core symbiotic logic.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Zamindar military power was purely exploitative — peasants supported zamindars in uprisings only under coercion."', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'element of reciprocity, paternalism and patronage', 'private armies defying the emperor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the emperor." In reality, the.' },
                { id: 'b', prompt: 'Construct a historical argument: "The qilacha was more a symbol of negotiated authority than a tool of rebellion." Use three pieces of evidence from the Mughal.', answer: 'Strong argument uses: (1) Sanad requirement',
                  options: ['Strong argument uses: (1) Sanad requirement', 'private armies defying the emperor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think zamindar forts (qilachas) and retainers were inherently rebellious — "private armies defying the emperor." In reality, the.' }
          ],
            remediations: { 'zamindar-forts-qilachas-and-retainers': { steps: ['Re-read NCERT Theme 8, Section 5 ("The Zamindars"), focusing on the "parallel army" box and the sanad/colonisation.', 'Revisit node c12_hist_cbse_08_005 (Zamindars: Rights, Military Power) to recall the revenue-military link.', 'Compare the Ain\'s zamindar troop table (mulk-abadi columns 7–8) with the mansabdari system (node 08_008).', 'Re-attempt Diagnostic Questions 2 and 4 — they test the core symbiotic logic.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_007', difficulty: 'standard',
          question: 'The Mughal land revenue system (c. 1556–1707) was the state\'s mechanism for.',
          hint: 'Revisit **node 001 (Ain-i-Akbari)** — focus on the mulk-abadi tables showing measured.',
          misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The.',
          parts: [
                { id: 'a', prompt: 'What is the difference between *jama* and *hasil* in Mughal revenue terminology?', answer: '*Jama* is the **assessed** revenue demand fixed after measurement/estimation',
                  options: ['*Jama* is the **assessed** revenue demand fixed after measurement/estimation', 'jama is collected, hasil is assessed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The Ain (Source 7).' },
                { id: 'b', prompt: 'Compare Kankut and Batai (bhaoli) in terms of: (a) who bears the risk of crop failure, (b) administrative staff required, (c) peasant\'s incentive to invest in.', answer: 'who bears the risk of crop failure, (',
                  options: ['who bears the risk of crop failure, (', 'both are same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The Ain (Source 7).' }
          ],
            remediations: { 'misconception-zabt-was-the-only': { steps: ['Re-read **Source 5 (Classification of lands)** and **Source 7 (Ain on land revenue collection)** in the NCERT text.', 'Create a **two-column table**: Column A = "Core/Measured Region (Zabt)", Column B = "Frontier/Unmeasured Region.', 'Fill using the criteria: land measurement status, crop type, price stability, administrative capacity.', 'Attempt **Diagnostic Question 4 again** using the table.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The.',
          parts: [
                { id: 'a', prompt: 'Compare Kankut and Batai (bhaoli) in terms of: (a) who bears the risk of crop failure, (b) administrative staff required, (c) peasant\'s incentive to invest in.', answer: 'who bears the risk of crop failure, (',
                  options: ['who bears the risk of crop failure, (', 'both are same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The Ain (Source 7).' }
          ],
            remediations: { 'misconception-zabt-was-the-only': { steps: ['Re-read **Source 5 (Classification of lands)** and **Source 7 (Ain on land revenue collection)** in the NCERT text.', 'Create a **two-column table**: Column A = "Core/Measured Region (Zabt)", Column B = "Frontier/Unmeasured Region.', 'Fill using the criteria: land measurement status, crop type, price stability, administrative capacity.', 'Attempt **Diagnostic Question 4 again** using the table.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_009', difficulty: 'standard',
          question: 'The zamindar\'s right to collect revenue refers to the Mughal state\'s practice.',
          hint: 'Revisit node c12_hist_cbse_08_005, section on "milkiyat vs. malguzari" and the.',
          misconception: 'Students often think the zamindar "owned the land" in the modern property sense.',
          parts: [
                { id: 'a', prompt: 'What specific imperial document formalized a zamindar\'s right to collect revenue on behalf of the Mughal state, and what did it typically guarantee?', answer: 'The imperial document was the sanad (or farman)',
                  options: ['The imperial document was the sanad (or farman)', 'the zamindar owned the land', 'the state collected directly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the zamindar "owned the land" in the modern property sense.' },
                { id: 'b', prompt: 'Compare the zamindar\'s revenue-collection right (malguzari) with the jagirdar\'s revenue assignment (jagir).', answer: '1) Hereditary vs',
                  options: ['1) Hereditary vs', 'both collected revenue', 'owned the land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the zamindar "owned the land" in the modern property sense.' }
          ],
            remediations: { 'the-zamindar-owned-the-land': { steps: ['If the student confuses zamindari revenue rights with land ownership: 1) Re-read NCERT pp.', '211-213 ("The Zamindars") focusing on the distinction between milkiyat (property) and malguzari (revenue right).', '2) Compare with node c12_hist_cbse_08_005 (Zamindars: Rights, Military Power) which details milkiyat vs.', '3) Do a quick table: "What the zamindar owned" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the zamindar "owned the land" in the modern property sense.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The zamindar\'s right to collect revenue was a purely exploitative mechanism that drained peasant surplus for the state." Use evidence from.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'owned the land', 'the zamindar "owned the land" in the modern property sense'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the zamindar "owned the land" in the modern property sense.' },
                { id: 'b', prompt: 'Compare the zamindar\'s revenue-collection right (malguzari) with the jagirdar\'s revenue assignment (jagir).', answer: '1) Hereditary vs',
                  options: ['1) Hereditary vs', 'both collected revenue', 'owned the land', 'the zamindar "owned the land" in the modern property sense'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the zamindar "owned the land" in the modern property sense.' }
          ],
            remediations: { 'the-zamindar-owned-the-land': { steps: ['If the student confuses zamindari revenue rights with land ownership: 1) Re-read NCERT pp.', '211-213 ("The Zamindars") focusing on the distinction between milkiyat (property) and malguzari (revenue right).', '2) Compare with node c12_hist_cbse_08_005 (Zamindars: Rights, Military Power) which details milkiyat vs.', '3) Do a quick table: "What the zamindar owned" vs.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_011', difficulty: 'standard',
          question: 'Trade in agricultural goods during the Mughal era (16th–17th centuries) refers.',
          hint: 'Revisit NCERT pages 200–201 (crop cycles, jins-i kamil), 205–206 (village artisans, money.',
          misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss.',
          parts: [
                { id: 'a', prompt: 'Why did the Mughal state actively encourage peasants to cultivate jins-i kamil (cash crops) such as cotton and sugarcane?', answer: 'Cash crops yielded higher revenue per bigha',
                  options: ['Cash crops yielded higher revenue per bigha', 'for food security', 'to feed the army'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss that (1) jins-i.' },
                { id: 'b', prompt: 'Compare the economic function of a village haat (mandi) with that of a port city like Surat in the Mughal trade network.', answer: 'Haat: periodic, local, mixed barter/cash, handled grain, livestock, raw cotton',
                  options: ['Haat: periodic, local, mixed barter/cash, handled grain, livestock, raw cotton', '85% lived in villages', 'horse trade'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss that (1) jins-i.' }
          ],
            remediations: { 'mughal-agricultural-trade-was-purely': { steps: ['If the student cannot trace the cotton-silver circuit or confuses haat/port functions: (1) Re-read NCERT pages 215–217.', '(2) Draw the 4-node diagram (village → haat → port → Europe) with arrows for goods, silver, credit.', '(3) Re-attempt Diagnostic Question 4.', '(4) Watch a 10-min video on “Mughal India and the Global Silver Trade” (e.g., NCERT official channel).'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss.',
          parts: [
                { id: 'a', prompt: 'Compare the economic function of a village haat (mandi) with that of a port city like Surat in the Mughal trade network.', answer: 'Haat: periodic, local, mixed barter/cash, handled grain, livestock, raw cotton',
                  options: ['Haat: periodic, local, mixed barter/cash, handled grain, livestock, raw cotton', '85% lived in villages', 'horse trade', 'Mughal agricultural trade was purely local/subistence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss that (1) jins-i.' }
          ],
            remediations: { 'mughal-agricultural-trade-was-purely': { steps: ['If the student cannot trace the cotton-silver circuit or confuses haat/port functions: (1) Re-read NCERT pages 215–217.', '(2) Draw the 4-node diagram (village → haat → port → Europe) with arrows for goods, silver, credit.', '(3) Re-attempt Diagnostic Question 4.', '(4) Watch a 10-min video on “Mughal India and the Global Silver Trade” (e.g., NCERT official channel).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
