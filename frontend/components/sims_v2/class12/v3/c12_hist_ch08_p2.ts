import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch08_p2: SimDef = {
    id: 'v3_c12_hist_ch08_p2',
    title: 'Peasants, Zamindars and the State (Mughal Era) · Part 2/2',
    subtitle: 'A census before census — written to prove Akbar\'s order',
    classLevel: 12, subject: 'history', topic: 'Peasants, Zamindars and the State (Mughal Era) · Part 2/2',
    chapters: ['c12_hist_ch08'],
    nodeIds: ['c12_hist_cbse_08_007', 'c12_hist_cbse_08_008', 'c12_hist_cbse_08_009', 'c12_hist_cbse_08_010', 'c12_hist_cbse_08_011', 'c12_hist_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Mughal source critic', intro: 'An empire without printing presses built a 1,000-page administrative mirror — and believed its own reflection.', goal: 'Evaluate the Ain-i-Akbari as administrative record and ideological project — its data, structure and \'view from the top.\'' },
    discovery: {
        question: 'Abu\'l Fazl\'s Ain-i-Akbari records every province\'s revenue, crops, zamindar castes and troops in tables — unlike any medieval chronicle. What made it a new kind of history?',
        options: ['A spreadsheet of sovereignty — it made society and economy administrable objects, not war-narrative; a paper empire mirroring the real one', 'It had more pages', 'Akbar ordered it', 'Persian was precise'],
        answer: 'A spreadsheet of sovereignty — it made society and economy administrable objects, not war-narrative; a paper empire mirroring the real one',
        hook: 'It\'s a \'view from the top\' — rebellion appears predestined to fail, and the numbers skew toward the imperial core (Bengal\'s columns are thin). Trust it as scale, not census — and cross-check the heartland\'s detail against regional records.',
    },
    teaching: [
        { title: 'Land Revenue System: Zabt, Kankut and the Measurement (Paimish) System', text: 'The Mughal land revenue system (c. 1556–1707) was the state\'s mechanism for assessing (jama) and collecting (hasil) the agricultural surplus as its primary income source.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_08_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read an empire as its administrators saw it: decode the five books, weigh the Ain\'s quantitative power against its courtly bias, and learn where its tables go silent.',
        labels: ['Land Revenue System: Zabt,', 'The Jagirdari System: Assignments,', 'The Zamindar\'s Right', 'Mughal Agrarian Society: Caste,', 'Trade in Agricultural Goods', 'The Crisis of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_007', title: 'Land Revenue System: Zabt, Kankut and the Measurement (Paimish) System',
          caseStudy: { intro: 'Imagine you are a revenue official (amin) in 1595 sent to a village near Agra with a measuring rope (jarib) and the Ain\'s dastur-ul-amal (revenue manual).',
            decisions: [{ prompt: 'What is the difference between *jama* and *hasil* in Mughal revenue terminology?', options: [
                { text: '*Jama* is the **assessed** revenue demand fixed after measurement/estimation', outcome: '*Jama* is the **assessed** revenue demand fixed after measurement/estimation; *hasil* is the.' },
                { text: 'jama is collected, hasil is assessed', outcome: 'Not quite — **Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor.', reveals: 'misconception-zabt-was-the-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_008', title: 'The Jagirdari System: Assignments, Transfer and the Crisis of jagirs',
          caseStudy: { intro: 'Imagine you\'re a Mughal mansabdar in 1650 holding a rank of 5000 zat/3000 sawar — you\'ve just been transferred from a fertile jagir in the Gangetic plains to.',
            decisions: [{ prompt: 'What was the primary form of payment for the majority of mansabdars under the Mughal Empire, and what was the key condition attached to it?', options: [
                { text: 'The majority of mansabdars were paid through revenue assignments called jagirs, not cash', outcome: 'The majority of mansabdars were paid through revenue assignments called jagirs, not cash (naqdi).' },
                { text: 'mansabdars were paid fixed cash salaries', outcome: 'Not quite — Students confuse jagirdars with zamindars, thinking both were hereditary landlords who owned land.', reveals: 'students-confuse-jagirdars-with-zamindars' },
                { text: 'jagirs were hereditary', outcome: 'Not quite — Students confuse jagirdars with zamindars, thinking both were hereditary landlords who owned land.', reveals: 'students-confuse-jagirdars-with-zamindars' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_009', title: 'The Zamindar\'s Right to Collect Revenue and the State\'s Negotiation',
          caseStudy: { intro: 'Imagine you are a village headman in 1650 Mughal India: a zamindar\'s agent arrives demanding the state\'s share of your harvest, but you know the zamindar also.',
            decisions: [{ prompt: 'What specific imperial document formalized a zamindar\'s right to collect revenue on behalf of the Mughal state, and what did it typically.', options: [
                { text: 'The imperial document was the sanad (or farman)', outcome: 'The imperial document was the sanad (or farman), which granted the zamindar hereditary.' },
                { text: 'the zamindar owned the land', outcome: 'Not quite — Students often think the zamindar "owned the land" in the modern property sense.', reveals: 'the-zamindar-owned-the-land' },
                { text: 'the state collected directly', outcome: 'Not quite — Students often think the zamindar "owned the land" in the modern property sense.', reveals: 'the-zamindar-owned-the-land' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_010', title: 'Mughal Agrarian Society: Caste, Jajmani and the Village Artisans',
          caseStudy: { intro: 'Imagine you visit a present-day village in Punjab or Maharashtra and see a blacksmith’s family still receiving a fixed share of grain from specific farming.',
            decisions: [{ prompt: 'What term did Mughal sources use for village menial-cum-agricultural labourers, and which caste-like groups were typically relegated.', options: [
                { text: 'Mughal sources used the term **majur** for menial-agricultural labourers', outcome: 'Mughal sources used the term **majur** for menial-agricultural labourers.' },
                { text: 'raiyat', outcome: 'Not quite — Students often think the **jajmani system was a uniform, pan-India institution with fixed rules**.', reveals: 'the-jajmani-system-was-a' },
                { text: 'jajmani', outcome: 'Not quite — Students often think the **jajmani system was a uniform, pan-India institution with fixed rules**.', reveals: 'the-jajmani-system-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_011', title: 'Trade in Agricultural Goods: Horses, Grain and the Market Mandis',
          caseStudy: { intro: 'Imagine walking into a modern grain mandi in Punjab or Madhya Pradesh — farmers arrive with tractor-trolleys, traders bid openly, and payments are digital.',
            decisions: [{ prompt: 'What were the two major seasonal crop cycles in Mughal India, and which staple crops dominated each?', options: [
                { text: 'The two cycles were kharif (autumn harvest, sown with monsoon rains) dominated by rice,', outcome: 'The two cycles were kharif (autumn harvest, sown with monsoon rains) dominated by rice, millets.' },
                { text: '85% lived in villages', outcome: 'Not quite — Students often believe Mughal agricultural trade was purely local/subistence because “85% lived.', reveals: 'mughal-agricultural-trade-was-purely' },
                { text: 'horse trade', outcome: 'Not quite — Students often believe Mughal agricultural trade was purely local/subistence because “85% lived.', reveals: 'mughal-agricultural-trade-was-purely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_012', title: 'The Crisis of the Mughal Empire: Revenue Shortfalls and Peasant Flight',
          caseStudy: { intro: 'Imagine you are a revenue official (amil-guzar) in 1680s Deccan: the emperor demands higher jama to fund the Deccan wars, but your village records show.',
            decisions: [{ prompt: 'What was the difference between jama and hasil in Mughal revenue terminology, and which one represented the state\'s assessed demand?', options: [
                { text: 'Jama was the assessed revenue demand fixed by the state', outcome: 'Jama was the assessed revenue demand fixed by the state; hasil was the actual amount collected.' },
                { text: 'peasant flight', outcome: 'Not quite — Students believe "peasant flight" meant peasants became landless labourers or migrated to cities.', reveals: 'peasant-flight-meant-peasants-became' },
                { text: '"peasant flight" meant peasants became landless labourers or migrated to cities', outcome: 'Not quite — Students believe "peasant flight" meant peasants became landless labourers or migrated to cities.', reveals: 'peasant-flight-meant-peasants-became' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a farm-stay internship, the host family debates next season\'s sowing: all food grains for the house, versus keeping a plot under cotton because the revenue demand arrives in cash and grain won\'t pay it.',
            decisions: [{ prompt: 'What does the Mughal agrarian chapter say about their dilemma?', options: [
                { text: 'Split the holding as Mughal peasants did — the state\'s push for jins-i-kamil cash crops like cotton and sugarcane existed precisely because revenue was assessed in cash; subsistence and commercial plots on one field was the normal answer, not a modern invention.', outcome: 'The chapter\'s dual-purpose peasant holding: the same seasonal logic fed the family and filled the treasury, so \'food or cash crop\' is a false either-or — the field carried both.' },
                { text: 'Advise all food grains — a peasant household\'s first duty is feeding itself; cash crops are the state\'s problem.', outcome: 'The revenue demand was the household\'s problem too — Mughal assessment pushed peasants toward cash crops whether or not they liked it; ignoring the cash need meant defaulting on the very claim that kept the land theirs.', reveals: 'subsistence-before-state' },
                { text: 'Advise all cash crop — higher prices mean better income for the family.', outcome: 'Jins-i-kamil meant high revenue, not necessarily high peasant gain — cash cropping served the fiscal system; a full-cash field left the family buying its own food at the market\'s mercy.', reveals: 'cash-crop-equals-profit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_08_012', title: 'You made it',
          caseStudy: { intro: 'You can now use a gazetteer critically — as both an instrument of rule and an argument that the rule was order itself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_007', difficulty: 'standard',
          question: 'The Mughal land revenue system (c. 1556–1707) was the state\'s mechanism for.',
          hint: 'Revisit **node 001 (Ain-i-Akbari)** — focus on the mulk-abadi tables showing measured.',
          misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The.',
          parts: [
                { id: 'a', prompt: 'What is the difference between *jama* and *hasil* in Mughal revenue terminology?', answer: '*Jama* is the **assessed** revenue demand fixed after measurement/estimation',
                  options: ['*Jama* is the **assessed** revenue demand fixed after measurement/estimation', 'jama is collected, hasil is assessed'],
                  hint: 'Revisit **node 001 (Ain-i-Akbari)** — focus on the mulk-abadi tables showing measured area (arazi).',
                  misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The Ain (Source 7).' },
                { id: 'b', prompt: 'Compare Kankut and Batai (bhaoli) in terms of: (a) who bears the risk of crop failure, (b) administrative staff required, (c) peasant\'s incentive to invest.', answer: 'who bears the risk of crop failure, (',
                  options: ['who bears the risk of crop failure, (', 'both are same'],
                  hint: 'Revisit **node 001 (Ain-i-Akbari)** — focus on the mulk-abadi tables showing measured area (arazi).',
                  misconception: '**Misconception:** "Zabt was the only Mughal revenue system; Kankut and Batai were minor exceptions." **Reality:** The Ain (Source 7).' }
          ],
            remediations: { 'misconception-zabt-was-the-only': { steps: ['Re-read **Source 5 (Classification of lands)** and **Source 7 (Ain on land revenue collection)** in the NCERT text.', 'Create a **two-column table**: Column A = "Core/Measured Region (Zabt)", Column B = "Frontier/Unmeasured Region.', 'Fill using the criteria: land measurement status, crop type, price stability, administrative capacity.', 'Attempt **Diagnostic Question 4 again** using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_008', difficulty: 'standard',
          question: 'The Jagirdari System was the Mughal institution of assigning revenue rights.',
          hint: 'If unclear on mansabdari ranks or the naqdi/jagir distinction, review c6_history_ch09_035.',
          misconception: 'Students confuse jagirdars with zamindars, thinking both were hereditary landlords who owned land.',
          parts: [
                { id: 'a', prompt: 'A mansabdar holds a jagir yielding 1 crore dams annually in assessed revenue (jama).', answer: 'With jama = 1 crore, expected hasil ≈ 70–80 lakh, but salary claim = 80 lakh',
                  options: ['With jama = 1 crore, expected hasil ≈ 70–80 lakh, but salary claim = 80 lakh', 'inheriting'],
                  hint: 'If unclear on mansabdari ranks or the naqdi/jagir distinction, review c6_history_ch09_035 (Mughal.',
                  misconception: 'Students confuse jagirdars with zamindars, thinking both were hereditary landlords who owned land.' }
          ],
            remediations: { 'students-confuse-jagirdars-with-zamindars': { steps: ['Revisit c12_hist_cbse_08_005 (Zamindars) to distinguish zamindar milkiyat vs.', 'jagirdar revenue assignment — make a two-column comparison table.', 'Re-read the mansabdari box in NCERT (Source 5, p.', '214) and trace the link: mansab rank → salary claim → jagir assignment → transfer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse jagirdars with zamindars, thinking both were hereditary landlords who owned land.',
          parts: [
                { id: 'a', prompt: 'Construct a historical argument: "The jagirdari system\'s collapse was not a failure of design but a success of its own logic." Use the concepts of transfer.', answer: 'The system successfully prevented feudal fragmentation for 150 years',
                  options: ['The system successfully prevented feudal fragmentation for 150 years', 'inheriting'],
                  hint: 'If unclear on mansabdari ranks or the naqdi/jagir distinction, review c6_history_ch09_035 (Mughal.',
                  misconception: 'Students confuse jagirdars with zamindars, thinking both were hereditary landlords who owned land.' }
          ],
            remediations: { 'students-confuse-jagirdars-with-zamindars': { steps: ['Revisit c12_hist_cbse_08_005 (Zamindars) to distinguish zamindar milkiyat vs.', 'jagirdar revenue assignment — make a two-column comparison table.', 'Re-read the mansabdari box in NCERT (Source 5, p.', '214) and trace the link: mansab rank → salary claim → jagir assignment → transfer.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_009', difficulty: 'standard',
          question: 'The zamindar\'s right to collect revenue refers to the Mughal state\'s practice.',
          hint: 'Revisit node c12_hist_cbse_08_005, section on "milkiyat vs. malguzari" and the.',
          misconception: 'Students often think the zamindar "owned the land" in the modern property sense.',
          parts: [
                { id: 'a', prompt: 'What specific imperial document formalized a zamindar\'s right to collect revenue on behalf of the Mughal state, and what did it typically guarantee?', answer: 'The imperial document was the sanad (or farman)',
                  options: ['The imperial document was the sanad (or farman)', 'the zamindar owned the land', 'the state collected directly', 'owned the land'],
                  hint: 'Revisit node c12_hist_cbse_08_005, section on "milkiyat vs. malguzari" and the Ain-i-Akbari\'s.',
                  misconception: 'Students often think the zamindar "owned the land" in the modern property sense.' },
                { id: 'b', prompt: 'Compare the zamindar\'s revenue-collection right (malguzari) with the jagirdar\'s revenue assignment (jagir).', answer: '1) Hereditary vs',
                  options: ['1) Hereditary vs', 'both collected revenue', 'owned the land', 'the zamindar "owned the land" in the modern property sense'],
                  hint: 'Revisit node c12_hist_cbse_08_005, section on "milkiyat vs. malguzari" and the Ain-i-Akbari\'s.',
                  misconception: 'Students often think the zamindar "owned the land" in the modern property sense.' }
          ],
            remediations: { 'the-zamindar-owned-the-land': { steps: ['If the student confuses zamindari revenue rights with land ownership: 1) Re-read NCERT pp.', '211-213 ("The Zamindars") focusing on the distinction between milkiyat (property) and malguzari (revenue right).', '2) Compare with node c12_hist_cbse_08_005 (Zamindars: Rights, Military Power) which details milkiyat vs.', '3) Do a quick table: "What the zamindar owned" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_010', difficulty: 'standard',
          question: 'Mughal agrarian society (c. 1556–1707) was a stratified rural order in which.',
          hint: 'If stuck, re-read c9_hist_ch3_009 (Social Categories: Varna and Jati System) focusing.',
          misconception: 'Students often think the **jajmani system was a uniform, pan-India institution with fixed rules** (like a government.',
          parts: [
                { id: 'a', prompt: 'What term did Mughal sources use for village menial-cum-agricultural labourers, and which caste-like groups were typically relegated to this status?', answer: 'Mughal sources used the term **majur** for menial-agricultural labourers',
                  options: ['Mughal sources used the term **majur** for menial-agricultural labourers', 'raiyat', 'jajmani'],
                  hint: 'If stuck, re-read c9_hist_ch3_009 (Social Categories: Varna and Jati System) focusing on the "jati.',
                  misconception: 'Students often think the **jajmani system was a uniform, pan-India institution with fixed rules** (like a government scheme), when in fact.' },
                { id: 'b', prompt: 'Explain why the distinction between "artisan" and "peasant" in Mughal villages was often fluid, citing two specific seasonal or economic reasons from the.', answer: 'The distinction was fluid',
                  options: ['The distinction was fluid', 'many groups performed the tasks of both', 'jajmani'],
                  hint: 'If stuck, re-read c9_hist_ch3_009 (Social Categories: Varna and Jati System) focusing on the "jati.',
                  misconception: 'Students often think the **jajmani system was a uniform, pan-India institution with fixed rules** (like a government scheme), when in fact.' }
          ],
            remediations: { 'the-jajmani-system-was-a': { steps: ['201–205 (sections 2.1, 2.3, 2.4) focusing on the *differences* between village panchayat and jati panchayat functions.', 'Revisit **c12_hist_cbse_08_003** (Village Community: Headman, Patwari) to clarify the village panchayat’s.', 'jati panchayat’s caste-regulation role.', 'Compare the Maratha *miras/watan* example (NCERT p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_011', difficulty: 'standard',
          question: 'Trade in agricultural goods during the Mughal era (16th–17th centuries) refers.',
          hint: 'Revisit NCERT pages 200–201 (crop cycles, jins-i kamil), 205–206 (village artisans, money.',
          misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss.',
          parts: [
                { id: 'a', prompt: 'Why did the Mughal state actively encourage peasants to cultivate jins-i kamil (cash crops) such as cotton and sugarcane?', answer: 'Cash crops yielded higher revenue per bigha',
                  options: ['Cash crops yielded higher revenue per bigha', 'for food security', 'to feed the army', '85% lived in villages'],
                  hint: 'Revisit NCERT pages 200–201 (crop cycles, jins-i kamil), 205–206 (village artisans, money.',
                  misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss that (1) jins-i.' },
                { id: 'b', prompt: 'Compare the economic function of a village haat (mandi) with that of a port city like Surat in the Mughal trade network.', answer: 'Haat: periodic, local, mixed barter/cash, handled grain, livestock, raw cotton',
                  options: ['Haat: periodic, local, mixed barter/cash, handled grain, livestock, raw cotton', '85% lived in villages', 'horse trade', 'Mughal agricultural trade was purely local/subistence'],
                  hint: 'Revisit NCERT pages 200–201 (crop cycles, jins-i kamil), 205–206 (village artisans, money.',
                  misconception: 'Students often believe Mughal agricultural trade was purely local/subistence because “85% lived in villages.” They miss that (1) jins-i.' }
          ],
            remediations: { 'mughal-agricultural-trade-was-purely': { steps: ['If the student cannot trace the cotton-silver circuit or confuses haat/port functions: (1) Re-read NCERT pages 215–217.', '(2) Draw the 4-node diagram (village → haat → port → Europe) with arrows for goods, silver, credit.', '(3) Re-attempt Diagnostic Question 4.', '(4) Watch a 10-min video on “Mughal India and the Global Silver Trade” (e.g., NCERT official channel).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_08_012', difficulty: 'standard',
          question: 'The Crisis of the Mughal Empire (c. 1658–1707) refers to the systemic.',
          hint: 'If unclear on *why* jagirdari transfers caused oppression: revisit c12_hist_cbse_08_008.',
          misconception: 'Students believe "peasant flight" meant peasants became landless labourers or migrated to cities.',
          parts: [
                { id: 'a', prompt: 'What was the difference between jama and hasil in Mughal revenue terminology, and which one represented the state\'s assessed demand?', answer: 'Jama was the assessed revenue demand fixed by the state',
                  options: ['Jama was the assessed revenue demand fixed by the state', 'peasant flight', '"peasant flight" meant peasants became landless labourers or migrated to cities'],
                  hint: 'If unclear on *why* jagirdari transfers caused oppression: revisit c12_hist_cbse_08_008 "The.',
                  misconception: 'Students believe "peasant flight" meant peasants became landless labourers or migrated to cities.' },
                { id: 'b', prompt: 'Why did the Mughal state\'s policy of frequent jagirdari transfers (every 3–4 years) contribute to revenue decline rather than prevent local power consolidation?', answer: 'Frequent transfers gave jagirdars no stake in long-term agricultural improvement',
                  options: ['Frequent transfers gave jagirdars no stake in long-term agricultural improvement', 'transfers prevented corruption', 'peasant flight', '"peasant flight" meant peasants became landless labourers or migrated to cities'],
                  hint: 'If unclear on *why* jagirdari transfers caused oppression: revisit c12_hist_cbse_08_008 "The.',
                  misconception: 'Students believe "peasant flight" meant peasants became landless labourers or migrated to cities.' },
                { id: 'c', prompt: 'Compare the peasant flight response in Mughal India (desertion to forest zones or rival zamindaris) with the European serf flight to towns ("town air makes.', answer: 'Mughal peasants fled to *other rural areas* (forests, rival zamindaris)',
                  options: ['Mughal peasants fled to *other rural areas* (forests, rival zamindaris)', 'peasant flight', '"peasant flight" meant peasants became landless labourers or migrated to cities'],
                  hint: 'If unclear on *why* jagirdari transfers caused oppression: revisit c12_hist_cbse_08_008 "The.',
                  misconception: 'Students believe "peasant flight" meant peasants became landless labourers or migrated to cities.' }
          ],
            remediations: { 'peasant-flight-meant-peasants-became': { steps: ['If the student conflates peasant flight with modern rural-urban migration: (1) Re-read c12_hist_cbse_08_004.', '(2) Study the Babur Nama excerpt (Source 1 in NCERT) on village mobility.', '(3) Map 3 villages in a pargana showing how a peasant could move 10 km to a zamindari with 20% lower revenue demand.', '(4) Re-attempt Diagnostic Question 4 with this corrected mental model.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
