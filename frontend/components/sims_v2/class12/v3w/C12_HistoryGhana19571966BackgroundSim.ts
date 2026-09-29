import type { SimDef } from '../../engine/types';
import C12_HistoryGhana19571966BackgroundSim from '../../../simulations/c6_12/C12_HistoryGhana19571966BackgroundSim';

/** v3 wrapped master — C12_HistoryGhana19571966BackgroundSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historyghana19571966backgroundsim: SimDef = {
    id: 'v3w_c12_historyghana19571966backgroundsim',
    title: 'Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind',
    subtitle: 'Covers Al-Biruni’s life (973–1048), his arrival in Ghazni (1017), his Sanskrit studies.',
    classLevel: 12, subject: 'history', topic: 'Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind',
    chapters: [],
    nodeIds: ['c12_hist_cbse_05_001', 'c12_hist_cbse_05_005', 'c12_hist_cbse_05_009', 'c12_hist_cbse_05_012', 'c12_hist_cbse_11_002', 'c12_hist_cbse_11_009', 'c12_hist_cbse_11_011', 'c12_hist_cbse_06_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a Class 12 student visiting the Qutb Minar complex in Delhi and noticing the Iron Pillar — a.', goal: 'Master Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind.' },
    discovery: {
        question: 'Why did Al-Biruni choose to write the *Kitab-ul-Hind* in Arabic rather than Persian or Sanskrit, and for whom did he intend it?',
        options: ['Arabic was the lingua franca of scholarship across the Islamic world', 'for the Mughal emperor', 'in Persian because it was the court language'],
        answer: 'Arabic was the lingua franca of scholarship across the Islamic world',
        hook: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.',
    },
    teaching: [
        { title: 'Al-Biruni (973–1048 CE) was a Persian.', text: 'Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day Uzbekistan) who accompanied Mahmud of Ghazni to India in 1017 CE and authored the *Kitab-ul-Hind*, a comprehensive 80-chapter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_05_001', title: 'Al-Biruni (973–1048 CE) was a Persian.',
          scaffold: { problem: 'Using the NCERT text, explain how Al-Biruni’s stated objectives for the *Kitab-ul-Hind* shaped its structure and content.',
            steps: [
            { text: 'Identify Al-Biruni’s two stated objectives from Source 1 (NCERT p.' },
            { text: 'Link Objective (a) to the “religion and philosophy” chapters and the question–description–comparison structure — the.' },
            { text: 'Link Objective (b) to the encyclopaedic scope (80 chapters on festivals, astronomy, alchemy, manners, weights/measures,.' },
            { text: 'Note how his mathematical orientation (precision, predictability) serves both objectives by making information.' },
            { text: 'Conclude that the structure is not arbitrary but teleological — designed to serve specific communicative purposes for a.', faded: true, blankAnswer: 'Al-Biruni’s dual objectives — facilitating religious.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_05_005', title: 'Ibn Battuta (1304–1377) was a Moroccan.',
          scaffold: { problem: 'Using Ibn Battuta\'s description of the *dawa* (foot-post) system, calculate the average speed of a message travelling from Delhi to Multan.',
            steps: [
            { text: 'Convert distance to metres: 400 km = 400,000 m.' },
            { text: 'Determine number of relays: 400,000 m / 536 m per *dawa* ≈ 746 runners.' },
            { text: 'Time per relay at 15 km/h (4.17 m/s): 536 m / 4.17 m/s ≈ 128.5 seconds ≈ 2.14 minutes.' },
            { text: 'Total running time: 746 × 2.14 min ≈ 1,596 min ≈ 26.6 hours.' },
            { text: 'Add rest/night stops (assume 8 hours/day for 2 days = 16 hrs): total ≈ 42.6 hours ≈ 1.8 days.' },
            { text: 'Compare with Ibn Battuta\'s 40 days for a caravan — the foot-post was ~22× faster, explaining why the Sultan used it for.', faded: true, blankAnswer: 'The foot-post could theoretically deliver a message in ~2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_05_009', title: 'François Bernier (1620–1688) was a.',
          scaffold: { problem: 'Using the textbook excerpts, explain how Bernier\'s description of his journey to Kashmir with the Mughal army reveals both his social.',
            steps: [
            { text: 'Identify the source — Bernier\'s first-person account of the Kashmir march (Source 4, p.' },
            { text: 'List the personnel and provisions he mentions: two Turkoman horses, Persian camel with driver, groom, cook,.' },
            { text: 'Analyse the entourage — a groom, cook, water-carrier, and camel driver indicate at least four servants; Turkoman horses.' },
            { text: 'Connect to Mughal imperial culture — the army moved as a mobile court; Bernier\'s "custom of the country" (water-carrier.' },
            { text: 'Evaluate significance — this is not a soldier\'s march but a grand procession; Bernier\'s ability to maintain this.', faded: true, blankAnswer: 'Bernier travelled as a high-status courtier with a 4+.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_05_012', title: 'This node synthesizes the accounts of.',
          scaffold: { problem: 'A board exam question asks: "Compare the motives and methods of Al-Biruni and François Bernier in studying Indian society.',
            steps: [
            { text: 'Identify the two travellers and their core motives — Al-Biruni: scholarly understanding for inter-religious dialogue;.' },
            { text: 'Identify their methods — Al-Biruni: philological mastery (Sanskrit), textual study of Brahmanical sources, comparative.' },
            { text: 'Trace how motive+method shapes caste analysis — Al-Biruni accepts varna theory from texts but critiques pollution using.' },
            { text: 'Trace how motive+method shapes land analysis — Al-Biruni barely discusses land tenure; Bernier imposes European.' },
            { text: 'Synthesize — Al-Biruni\'s framework is *internal* (engages indigenous categories on their terms, then critiques from.', faded: true, blankAnswer: 'Al-Biruni (11th c.) sought scholarly dialogue with Hindus;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_002', title: 'The Rowlatt Satyagraha (March–April.',
          scaffold: { problem: 'Using the NCERT text (pp. 289–290) and Source 8 (pp. 311–312), explain why the British Home Department consistently underestimated the.',
            steps: [
            { text: 'Identify the source — Source 8 is a *confidential* Home Department report, not a public statement; its audience is.' },
            { text: 'Note the institutional incentive — officials needed to show "control" to justify their positions; admitting mass unrest.' },
            { text: 'Find textual evidence — "meetings excite little or no interest" (Bengal), "march as theatrical" (Madras), "peasantry.' },
            { text: 'Contrast with nationalist sources — Gandhi\'s Dandi speech (Source 4, though 1930, same logic): "the power of peace and.' },
            { text: 'Synthesise — The colonial state *could not see* mass nationalism because its categories (loyal subjects, passive.', faded: true, blankAnswer: 'The Home Department underestimated support because its.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_009', title: 'The Poona Pact (1932) was an agreement.',
          scaffold: { problem: 'Using the NCERT Sources 5 and 6 (Gandhi\'s and Ambedkar\'s statements at the Round Table Conference), reconstruct the core philosophical.',
            steps: [
            { text: 'Identify Gandhi\'s core claim in Source 5 — separate electorates will "perpetuate the stigma" of untouchability because.' },
            { text: 'Identify Ambedkar\'s core claim in Source 6 — the Depressed Classes are economically dependent, socially branded as.' },
            { text: 'Map the causal logic: Gandhi believes social reform → political integration; Ambedkar believes political protection →.' },
            { text: 'Note the unstated assumption: Gandhi assumes caste Hindus will voluntarily reform if not given the "escape" of separate.' },
            { text: 'Evaluate which view the Poona Pact implemented — it rejected separate electorates (Gandhi\'s win on principle) but.', faded: true, blankAnswer: 'Gandhi argued separate electorates would eternally.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hist_cbse_05_005', title: 'Identify each idea',
          dissect: { specimen: 'Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind', spots: [
            { id: 's1', label: 'Al-Biruni 9731048 CE was a', prompt: 'Which idea is this? — Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day Uzbekistan) who.', answer: 'Al-Biruni 9731048 CE was a', options: ['Al-Biruni 9731048 CE was a', 'Ibn Battuta 13041377 was a', 'Franois Bernier 16201688 was a', 'This node synthesizes the accounts'] },
            { id: 's2', label: 'Ibn Battuta 13041377 was a', prompt: 'Which idea is this? — Ibn Battuta (1304–1377) was a Moroccan scholar and explorer whose travelogue, the *Rihla*.', answer: 'Ibn Battuta 13041377 was a', options: ['Ibn Battuta 13041377 was a', 'Al-Biruni 9731048 CE was a', 'Franois Bernier 16201688 was a', 'This node synthesizes the accounts'] },
            { id: 's3', label: 'Franois Bernier 16201688 was a', prompt: 'Which idea is this? — François Bernier (1620–1688) was a French physician, political philosopher, and historian.', answer: 'Franois Bernier 16201688 was a', options: ['Franois Bernier 16201688 was a', 'Al-Biruni 9731048 CE was a', 'Ibn Battuta 13041377 was a', 'This node synthesizes the accounts'] },
            { id: 's4', label: 'This node synthesizes the accounts', prompt: 'Which idea is this? — This node synthesizes the accounts of three medieval travellers — Al-Biruni (11th.', answer: 'This node synthesizes the accounts', options: ['This node synthesizes the accounts', 'Al-Biruni 9731048 CE was a', 'Ibn Battuta 13041377 was a', 'Franois Bernier 16201688 was a'] },
            { id: 's5', label: 'The Rowlatt Satyagraha MarchApril 1919', prompt: 'Which idea is this? — The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest organised.', answer: 'The Rowlatt Satyagraha MarchApril 1919', options: ['The Rowlatt Satyagraha MarchApril 1919', 'Al-Biruni 9731048 CE was a', 'Ibn Battuta 13041377 was a', 'Franois Bernier 16201688 was a'] },
            { id: 's6', label: 'The Poona Pact 1932 was', prompt: 'Which idea is this? — The Poona Pact (1932) was an agreement between Mahatma Gandhi and Dr. B.R.', answer: 'The Poona Pact 1932 was', options: ['The Poona Pact 1932 was', 'Al-Biruni 9731048 CE was a', 'Ibn Battuta 13041377 was a', 'Franois Bernier 16201688 was a'] }
          ] } }
    ],
    explore: { component: C12_HistoryGhana19571966BackgroundSim, prompt: 'Explore the interactive — Al-Biruni: Background, Arrival in India and the Kitab-ul-Hind' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_001', difficulty: 'standard',
          question: 'Al-Biruni (973–1048 CE) was a Persian scholar from Khwarizm (present-day.',
          hint: 'Revisit Class 11 node c11_hist_cbse_04_009 (Islamic Contributions to Science, Philosophy.',
          misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.',
          parts: [
                { id: 'a', prompt: 'Why did Al-Biruni choose to write the *Kitab-ul-Hind* in Arabic rather than Persian or Sanskrit, and for whom did he intend it?', answer: 'Arabic was the lingua franca of scholarship across the Islamic world',
                  options: ['Arabic was the lingua franca of scholarship across the Islamic world', 'for the Mughal emperor', 'in Persian because it was the court language'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.' }
          ],
            remediations: { 'al-biruni-travelled-widely-across': { steps: ['If the student conflates Al-Biruni’s method with travelogue writing: (1) Re-read NCERT pp.', '115–117, highlighting “Al-Biruni spent years in the company of Brahmana priests… learning Sanskrit” vs.', 'Ibn Battuta’s “travelling overland… reached Sind in 1333.” (2) Create a two-column table: *Textual/scholarly methods*.', '*Observational/itinerant methods* (Ibn Battuta, Bernier).'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: “Al-Biruni’s dependence on Brahmanical texts makes the *Kitab-ul-Hind* an unreliable source for understanding actual social practices in.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'travelled widely across India like Ibn Battuta', 'travellers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.' },
                { id: 'b', prompt: 'Construct a comparative timeline entry for Al-Biruni, Ibn Battuta, and Bernier showing: (a) century of travel, (b) place of origin, (c) language of writing,.', answer: '| Traveller | Century | Origin | Language | Motive | Structural Feature |',
                  options: ['| Traveller | Century | Origin | Language | Motive | Structural Feature |', 'travelled widely across India like Ibn Battuta', 'travellers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Al-Biruni “travelled widely across India like Ibn Battuta” and wrote a travelogue.' }
          ],
            remediations: { 'al-biruni-travelled-widely-across': { steps: ['If the student conflates Al-Biruni’s method with travelogue writing: (1) Re-read NCERT pp.', '115–117, highlighting “Al-Biruni spent years in the company of Brahmana priests… learning Sanskrit” vs.', 'Ibn Battuta’s “travelling overland… reached Sind in 1333.” (2) Create a two-column table: *Textual/scholarly methods*.', '*Observational/itinerant methods* (Ibn Battuta, Bernier).'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_005', difficulty: 'standard',
          question: 'Ibn Battuta (1304–1377) was a Moroccan scholar and explorer whose travelogue,.',
          hint: 'Revisit c6_history_ch07_023 (Administration Under the Delhi Sultanate) and.',
          misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.',
          parts: [
                { id: 'a', prompt: 'Why did Muhammad bin Tughlaq appoint Ibn Battuta as *qazi* of Delhi, and what does this reveal about the Sultan’s court?', answer: 'The Sultan was impressed by Ibn Battuta’s scholarly credentials in Islamic law',
                  options: ['The Sultan was impressed by Ibn Battuta’s scholarly credentials in Islamic law', 'because he was a spy', 'he bought the post'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.' },
                { id: 'b', prompt: 'Ibn Battuta describes the *dawa* (foot-post) system as having runners stationed every one-third of a mile (*dawa*) with bells on their rods.', answer: '1,100 km = 1,100,000 m',
                  options: ['1,100 km = 1,100,000 m', 'Ibn Battuta wrote the *Rihla* himself as a daily diary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.' }
          ],
            remediations: { 'ibn-battuta-wrote-the-rihla': { steps: ['Re-read the NCERT excerpt "Education and entertainment" (Source 3, p.', '121) where Ibn Juzayy explains the ruler’s command to record "cities seen, interesting events, rulers, scholars,.', 'Then watch the 5-minute video "How the Rihla was written" (search: *Ibn Juzayy Rihla compilation*).', 'Finally, attempt Diagnostic Question 5 again, explicitly framing the answer around "dictated memory vs.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Ibn Battuta’s *Rihla* is more useful for understanding the *mental world* of a 14th-century Muslim scholar than for reconstructing the.', answer: 'The claim is partially valid',
                  options: ['The claim is partially valid', 'Ibn Battuta wrote the *Rihla* himself as a daily diary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Ibn Battuta wrote the *Rihla* himself as a daily diary.' }
          ],
            remediations: { 'ibn-battuta-wrote-the-rihla': { steps: ['Re-read the NCERT excerpt "Education and entertainment" (Source 3, p.', '121) where Ibn Juzayy explains the ruler’s command to record "cities seen, interesting events, rulers, scholars,.', 'Then watch the 5-minute video "How the Rihla was written" (search: *Ibn Juzayy Rihla compilation*).', 'Finally, attempt Diagnostic Question 5 again, explicitly framing the answer around "dictated memory vs.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_009', difficulty: 'standard',
          question: 'François Bernier (1620–1688) was a French physician, political philosopher, and.',
          hint: 'Revisit c6_history_ch09_037 (Shah Jahan and Aurangzeb) for political context, and.',
          misconception: 'Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist who lived at court.',
          parts: [
                { id: 'a', prompt: 'Why did Bernier initially come to the Mughal Empire, and how did his role change during his stay?', answer: 'Bernier came "in search of opportunities" like many Europeans after 1600',
                  options: ['Bernier came "in search of opportunities" like many Europeans after 1600', 'he came as an ambassador', 'he stayed with Dara Shukoh throughout'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist who lived at court for 12 years.' }
          ],
            remediations: { 'bernier-was-an-objective-eyewitness': { steps: ['If the student holds the "objective eyewitness" misconception: (1) Re-read Source 12 in the textbook — Bernier\'s.', '(2) Compare with Abu\'l Fazl\'s definition of land revenue in *Ain-i-Akbari* (Class 6 node c6_history_ch09_035).', '(3) Complete the "Discuss" box on p.', '134: "Why do you think scholars like Bernier chose to compare India with Europe?" (4) Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist who lived at court.',
          parts: [
                { id: 'a', prompt: 'Bernier\'s *Travels in the Mughal Empire* was published in France (1670–71), translated into four European languages within five years, and reprinted eight.', answer: 'Al-Biruni wrote in Arabic for frontier scholars',
                  options: ['Al-Biruni wrote in Arabic for frontier scholars', 'language differences', 'objective eyewitness', 'crown ownership of land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Bernier was an "objective eyewitness" because he was a doctor and scientist who lived at court for 12 years.' }
          ],
            remediations: { 'bernier-was-an-objective-eyewitness': { steps: ['If the student holds the "objective eyewitness" misconception: (1) Re-read Source 12 in the textbook — Bernier\'s.', '(2) Compare with Abu\'l Fazl\'s definition of land revenue in *Ain-i-Akbari* (Class 6 node c6_history_ch09_035).', '(3) Complete the "Discuss" box on p.', '134: "Why do you think scholars like Bernier chose to compare India with Europe?" (4) Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_05_012', difficulty: 'standard',
          question: 'This node synthesizes the accounts of three medieval travellers — Al-Biruni.',
          hint: 'If unable to compare across travellers, return to c12_hist_cbse_05_002 (Al-Biruni\'s.',
          misconception: 'Students often think "Orientalism" begins only with 19th-century British colonial scholars (e.g., James Mill).',
          parts: [
                { id: 'a', prompt: 'A historian finds two descriptions of the caste system: one explains it through Purusha Sukta varna theory and compares it to Persian social categories; the.', answer: 'First: Al-Biruni (textual, comparative, attempts emic understanding but accepts',
                  options: ['First: Al-Biruni (textual, comparative, attempts emic understanding but accepts', 'Orientalism', '"Orientalism" begins only with 19th-century British colonial scholars (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Orientalism" begins only with 19th-century British colonial scholars (e.g., James Mill).' }
          ],
            remediations: { 'orientalism-begins-only-with-19th': { steps: ['If the student conflates Orientalism with only colonial-era writing: Re-read Source 12 (Bernier\'s "warning for Europe").', 'If the student sees Al-Biruni as uncritically Brahmanical: Revisit c12_hist_cbse_05_003 (Al-Biruni on Caste) and.', 'If the student treats Ibn Battuta as objective: Compare his coconut/paan descriptions (Sources 6, 7) with Abdur.', '"admired temple" (Source 10) — both use *rhetorical strategies*, not neutral recording.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_002', difficulty: 'standard',
          question: 'The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest.',
          hint: 'If unclear on the *difference* between early satyagrahas and Rowlatt Satyagraha, re-read.',
          misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the.',
          parts: [
                { id: 'a', prompt: 'What was the specific date of the Jallianwala Bagh massacre, who gave the firing order, and what was the crowd gathered for?', answer: 'The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)',
                  options: ['The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)', 'Gandhi was leading the protest', 'it was a planned satyagraha meeting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' },
                { id: 'b', prompt: 'A police fortnightly report from Bengal (March 1930, but similar tone existed in 1919) states: "The peasantry is engaged in harvesting...', answer: '(1) "Whose perspective does this report represent?"',
                  options: ['(1) "Whose perspective does this report represent?"', 'the hartal failed in Bengal', 'the Rowlatt Act *was* the wartime law'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' }
          ],
            remediations: { 'three-specific-errors-1-conflating': { steps: ['If the student holds any of the three misconceptions: **Step 1** – Re-read NCERT Class 12, Theme 11, pp.', '289–290 (the paragraph starting "During the Great War...', 'Rowlatt Act") and Class 10, Ch.', '2, node c10_hist_cbse_02_003 for the legislative distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Jallianwala Bagh massacre was the turning point that made Indian nationalism irreversible." Use evidence from the Rowlatt Satyagraha\'s.', answer: 'The claim is *partially valid but incomplete*',
                  options: ['The claim is *partially valid but incomplete*', 'the Rowlatt Act *was* the wartime law'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' }
          ],
            remediations: { 'three-specific-errors-1-conflating': { steps: ['If the student holds any of the three misconceptions: **Step 1** – Re-read NCERT Class 12, Theme 11, pp.', '289–290 (the paragraph starting "During the Great War...', 'Rowlatt Act") and Class 10, Ch.', '2, node c10_hist_cbse_02_003 for the legislative distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_009', difficulty: 'standard',
          question: 'The Poona Pact (1932) was an agreement between Mahatma Gandhi and Dr. B.R.',
          hint: 'If unclear on separate vs joint electorates, revisit the Class 10 Political Science.',
          misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all.',
          parts: [
                { id: 'a', prompt: 'Why did Gandhi oppose separate electorates for the Depressed Classes, and how did his argument differ from Ambedkar\'s justification for demanding them?', answer: 'Gandhi opposed separate electorates',
                  options: ['Gandhi opposed separate electorates', 'not wanting to divide Hindus', 'wanting more seats'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all along.' },
                { id: 'b', prompt: 'The Communal Award (August 1932) granted 71 reserved seats to Depressed Classes under separate electorates.', answer: 'Under separate electorates: Only Depressed Class voters vote for Depressed Class',
                  options: ['Under separate electorates: Only Depressed Class voters vote for Depressed Class', 'both systems let Dalits choose their own representatives'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all along.' },
                { id: 'c', prompt: 'Compare the immediate political outcome of the Poona Pact for Dalit representation in the 1937 provincial elections with its long-term consequence for the.', answer: 'In 1937, the primary panel system often failed',
                  options: ['In 1937, the primary panel system often failed', 'the system worked the same way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all along.' }
          ],
            remediations: { 'students-commonly-believe-the-poona': { steps: ['If the student conflates separate electorates with reserved seats, or cannot explain the primary panel mechanism: (1).', '(2) Draw a two-column comparison table: "Separate Electorates (Communal Award)" vs "Joint Electorates + Reserved Seats.', '(3) Re-read Source 5 and Source 6 in NCERT (pp.', '300-301) — highlight Gandhi\'s phrase "perpetuate the stigma" and Ambedkar\'s phrase "organised tyranny." (4) Redo.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
