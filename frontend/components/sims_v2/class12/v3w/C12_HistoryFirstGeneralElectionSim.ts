import type { SimDef } from '../../engine/types';
import C12_HistoryFirstGeneralElectionSim from '../../../simulations/c6_12/C12_HistoryFirstGeneralElectionSim';

/** v3 wrapped master — C12_HistoryFirstGeneralElectionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historyfirstgeneralelectionsim: SimDef = {
    id: 'v3w_c12_historyfirstgeneralelectionsim',
    title: 'The Poona Pact (1932): Ambedkar, Separate Electorates and the Gandhi-Ambedkar Debate',
    subtitle: 'Covers the background (Second Round Table Conference, Communal Award), the.',
    classLevel: 12, subject: 'history', topic: 'The Poona Pact (1932): Ambedkar, Separate Electorates and the Gandhi-Ambedkar Debate',
    chapters: [],
    nodeIds: ['c12_hist_cbse_11_009', 'c12_hist_cbse_11_005', 'c12_hist_cbse_11_002', 'c12_hist_cbse_11_007', 'c12_hist_cbse_11_010', 'c12_hist_cbse_01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a Dalit student in 1932 reading about Gandhi\'s fast unto death against separate electorates.', goal: 'Master The Poona Pact (1932): Ambedkar, Separate Electorates and the Gandhi-Ambedkar Debate.' },
    discovery: {
        question: 'Why did Gandhi oppose separate electorates for the Depressed Classes, and how did his argument differ from Ambedkar\'s justification for demanding them?',
        options: ['Gandhi opposed separate electorates', 'not wanting to divide Hindus', 'wanting more seats'],
        answer: 'Gandhi opposed separate electorates',
        hook: 'Students commonly believe the Poona Pact simply "gave Dalits reserved seats" and that this was what Ambedkar wanted all.',
    },
    teaching: [
        { title: 'The Poona Pact (1932) was an agreement.', text: 'The Poona Pact (1932) was an agreement between Mahatma Gandhi and Dr. B.R.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_009', title: 'The Poona Pact (1932) was an agreement.',
          scaffold: { problem: 'Using the NCERT Sources 5 and 6 (Gandhi\'s and Ambedkar\'s statements at the Round Table Conference), reconstruct the core philosophical.',
            steps: [
            { text: 'Identify Gandhi\'s core claim in Source 5 — separate electorates will "perpetuate the stigma" of untouchability because.' },
            { text: 'Identify Ambedkar\'s core claim in Source 6 — the Depressed Classes are economically dependent, socially branded as.' },
            { text: 'Map the causal logic: Gandhi believes social reform → political integration; Ambedkar believes political protection →.' },
            { text: 'Note the unstated assumption: Gandhi assumes caste Hindus will voluntarily reform if not given the "escape" of separate.' },
            { text: 'Evaluate which view the Poona Pact implemented — it rejected separate electorates (Gandhi\'s win on principle) but.', faded: true, blankAnswer: 'Gandhi argued separate electorates would eternally.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_005', title: 'The Gandhi-Irwin Pact (March 1931) was.',
          scaffold: { problem: 'Using the NCERT sources (Source 3: Gandhi\'s Dandi speech, Source 4: Police reports, Source 5: Gandhi on separate electorates, Source 6:.',
            steps: [
            { text: 'Identify the British objective — avoid transferring power while appearing to consult Indians.' },
            { text: 'Map the three challengers invited by the British: Muslim League (communal representation), Princes (treaty.' },
            { text: 'Analyse Gandhi\'s position at the RTC (Source 5): he opposed separate electorates for Depressed Classes as "perpetuating.' },
            { text: 'Connect to British agency — the Viceroy and Secretary of State controlled the agenda, delegation list, and procedural.' },
            { text: 'Conclude — the Conference was designed to demonstrate Indian disunity, not to produce agreement.', faded: true, blankAnswer: 'The British fragmented unity by (a) widening the delegation.' }
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
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_007', title: 'The Congress Ministries (1937–39).',
          scaffold: { problem: 'Explain why the Congress decided to contest the 1937 provincial elections despite having boycotted the 1920 elections under the Government.',
            steps: [
            { text: 'Identify the key difference between the 1919 and 1935 Acts — the 1919 Act introduced dyarchy (divided subjects, no real.' },
            { text: 'Recall the Congress\'s 1934 decision to end the Civil Disobedience Movement and the debate over "Council Entry" — the.' },
            { text: 'Analyze the 1936 Lucknow Congress session where Nehru\'s presidency and the socialist influence shifted the balance —.' },
            { text: 'Note Gandhi\'s conditional consent — he allowed office acceptance only if ministries worked for civil liberties, peasant.' },
            { text: 'Conclude that the decision was tactical: use legislatures as platforms for mass mobilization and administrative.', faded: true, blankAnswer: 'Congress contested the 1937 elections because the 1935 Act.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_010', title: 'The Partition of India (1947) refers to.',
          scaffold: { problem: 'Using the 1946 election results and the Cabinet Mission Plan\'s grouping scheme, explain why the Muslim League accepted the Plan initially.',
            steps: [
            { text: 'Recall the 1946 election outcome — Congress won 91% of General (non-Muslim) seats; League won 87% of Muslim seats and.' },
            { text: 'Understand the Cabinet Mission\'s 3-tier scheme: Section A (Hindu-majority provinces), Section B (Muslim-majority NW:.' },
            { text: 'Identify the "Grouping Clause" ambiguity — the Mission\'s 16 May statement said grouping was compulsory initially but.' },
            { text: 'Analyze League\'s calculation — Jinnah accepted on 6 June because compulsory grouping gave Sections B/C a veto (Pakistan.' },
            { text: 'Conclude — League withdrew acceptance on 29 July 1946 because optional grouping destroyed the Pakistan safeguard;.', faded: true, blankAnswer: 'The League accepted the Cabinet Mission Plan on 6 June 1946.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_01_001', title: 'The discovery of the Harappan.',
          scaffold: { problem: 'A student finds a terracotta seal with a unicorn motif during a surface survey at a mound in Gujarat.',
            steps: [
            { text: 'Record the exact findspot using GPS and note the surface context (erosion, disturbance) — unlike Cunningham who only.' },
            { text: 'Conduct a systematic surface collection in a grid (learning from Wheeler\'s precision) to map artefact density and.' },
            { text: 'Excavate a small test trench following the mound\'s natural stratigraphy (Wheeler\'s method), leaving baulks for section.' },
            { text: 'Compare the seal\'s style, script signs, and manufacturing technique with the established corpus from.' },
            { text: 'Submit associated charcoal or bone samples for radiocarbon dating (modern scientific addition) to obtain absolute dates.' },
            { text: 'Synthesise stratigraphic position, artefact assemblage, comparative parallels, and scientific dates to assign the site.', faded: true, blankAnswer: 'The archaeologist would use stratigraphic excavation to.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hist_cbse_11_005', title: 'Identify each idea',
          dissect: { specimen: 'The Poona Pact (1932): Ambedkar, Separate Electorates and the Gandhi-Ambedkar Debate', spots: [
            { id: 's1', label: 'The Poona Pact 1932 was', prompt: 'Which idea is this? — The Poona Pact (1932) was an agreement between Mahatma Gandhi and Dr. B.R.', answer: 'The Poona Pact 1932 was', options: ['The Poona Pact 1932 was', 'The Gandhi-Irwin Pact March 1931', 'The Rowlatt Satyagraha MarchApril 1919', 'The Congress Ministries 193739 refers'] },
            { id: 's2', label: 'The Gandhi-Irwin Pact March 1931', prompt: 'Which idea is this? — The Gandhi-Irwin Pact (March 1931) was a political agreement between Mahatma Gandhi and.', answer: 'The Gandhi-Irwin Pact March 1931', options: ['The Gandhi-Irwin Pact March 1931', 'The Poona Pact 1932 was', 'The Rowlatt Satyagraha MarchApril 1919', 'The Congress Ministries 193739 refers'] },
            { id: 's3', label: 'The Rowlatt Satyagraha MarchApril 1919', prompt: 'Which idea is this? — The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest organised.', answer: 'The Rowlatt Satyagraha MarchApril 1919', options: ['The Rowlatt Satyagraha MarchApril 1919', 'The Poona Pact 1932 was', 'The Gandhi-Irwin Pact March 1931', 'The Congress Ministries 193739 refers'] },
            { id: 's4', label: 'The Congress Ministries 193739 refers', prompt: 'Which idea is this? — The Congress Ministries (1937–39) refers to the period when the Indian National Congress.', answer: 'The Congress Ministries 193739 refers', options: ['The Congress Ministries 193739 refers', 'The Poona Pact 1932 was', 'The Gandhi-Irwin Pact March 1931', 'The Rowlatt Satyagraha MarchApril 1919'] },
            { id: 's5', label: 'The Partition of India 1947', prompt: 'Which idea is this? — The Partition of India (1947) refers to the division of British India into two.', answer: 'The Partition of India 1947', options: ['The Partition of India 1947', 'The Poona Pact 1932 was', 'The Gandhi-Irwin Pact March 1931', 'The Rowlatt Satyagraha MarchApril 1919'] },
            { id: 's6', label: 'The discovery of the Harappan', prompt: 'Which idea is this? — The discovery of the Harappan Civilisation refers to the historical process (mid-19th to.', answer: 'The discovery of the Harappan', options: ['The discovery of the Harappan', 'The Poona Pact 1932 was', 'The Gandhi-Irwin Pact March 1931', 'The Rowlatt Satyagraha MarchApril 1919'] }
          ] } }
    ],
    explore: { component: C12_HistoryFirstGeneralElectionSim, prompt: 'Explore the interactive — The Poona Pact (1932): Ambedkar, Separate Electorates and the Gandhi-Ambedkar Debate' },
    challenges: [
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
            remediations: { 'students-commonly-believe-the-poona': { steps: ['If the student conflates separate electorates with reserved seats, or cannot explain the primary panel mechanism: (1).', '(2) Draw a two-column comparison table: "Separate Electorates (Communal Award)" vs "Joint Electorates + Reserved Seats.', '(3) Re-read Source 5 and Source 6 in NCERT (pp.', '300-301) — highlight Gandhi\'s phrase "perpetuate the stigma" and Ambedkar\'s phrase "organised tyranny." (4) Redo.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_005', difficulty: 'standard',
          question: 'The Gandhi-Irwin Pact (March 1931) was a political agreement between Mahatma.',
          hint: 'Revisit c12_hist_cbse_11_004 (Salt March) and the Lahore Congress 1929 resolution — the.',
          misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities*.',
          parts: [
                { id: 'a', prompt: 'Why did radical nationalists like Subhas Chandra Bose and Jawaharlal Nehru criticise the Gandhi-Irwin Pact despite the release of prisoners?', answer: 'They criticised it',
                  options: ['They criticised it', 'Gandhi betrayed the movement', 'prisoners were not all released'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities* to collect natural.' },
                { id: 'b', prompt: 'At the Second Round Table Conference, the Muslim League claimed to represent India\'s Muslims, the Princes claimed sovereignty over their territories, and.', answer: 'The Muslim League argued separate electorates were essential for Muslim minority',
                  options: ['The Muslim League argued separate electorates were essential for Muslim minority', 'British divide-and-rule', 'granted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities* to collect natural.' }
          ],
            remediations: { 'the-gandhi-irwin-pact-granted': { steps: ['If the student confuses the Pact\'s terms or misattributes the RTC\'s failure: (1) Re-read Source 3 and Source 4 in NCERT.', '(2) Use the "Three Challenges" table (Muslim League, Princes, Ambedkar) from the worked example below to map each.', '(3) Re-attempt Diagnostic Question 3 and 4 with this framework.', '(4) If still stuck, revisit c12_hist_cbse_11_004 (Salt March) to see the leverage Gandhi *had* before the Pact.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Gandhi-Irwin Pact was a strategic retreat that preserved the Congress\'s organisational capacity but conceded the political.', answer: 'Evidence for strategic retreat: (1) Congress retained its cadre and morale',
                  options: ['Evidence for strategic retreat: (1) Congress retained its cadre and morale', 'total surrender', 'total victory', 'granted'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Gandhi-Irwin Pact "granted" the right to make salt — it only permitted *coastal communities* to collect natural.' }
          ],
            remediations: { 'the-gandhi-irwin-pact-granted': { steps: ['If the student confuses the Pact\'s terms or misattributes the RTC\'s failure: (1) Re-read Source 3 and Source 4 in NCERT.', '(2) Use the "Three Challenges" table (Muslim League, Princes, Ambedkar) from the worked example below to map each.', '(3) Re-attempt Diagnostic Question 3 and 4 with this framework.', '(4) If still stuck, revisit c12_hist_cbse_11_004 (Salt March) to see the leverage Gandhi *had* before the Pact.'] } } },
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
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_007', difficulty: 'standard',
          question: 'The Congress Ministries (1937–39) refers to the period when the Indian National.',
          hint: 'If confused about the 1935 Act\'s federal structure, revisit the "Government of India Act.',
          misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely.',
          parts: [
                { id: 'a', prompt: 'Why did the Congress, which had boycotted legislatures during the Non-Cooperation and Civil Disobedience Movements, decide to contest the 1937 elections and.', answer: 'The Congress decided to contest elections to demonstrate its mass support, gain',
                  options: ['The Congress decided to contest elections to demonstrate its mass support, gain', 'British forced them', 'fully autonomous governments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely implement the nationalist.' },
                { id: 'b', prompt: 'A student claims: "The Congress ministries (1937–39) had full control over provincial administration and could implement any policy they wanted." Using.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'minority interests', 'fully autonomous governments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely implement the nationalist.' }
          ],
            remediations: { 'the-congress-ministries-1937-39': { steps: ['If the student cannot distinguish between the 1935 Act\'s promises and its actual constraints: (1) Re-read the.', '(2) Create a two-column table: "Powers of Congress Ministry" vs.', '"Powers of Governor/Viceroy" using the Act\'s provisions.', '(3) Re-attempt Diagnostic Question 3.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "The resignation of Congress ministries in October 1939 was a strategic blunder that handed political initiative to the Muslim League.".', answer: 'The argument has partial validity but oversimplifies',
                  options: ['The argument has partial validity but oversimplifies', 'fully autonomous governments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Congress ministries (1937–39) were "fully autonomous governments" that could freely implement the nationalist.' }
          ],
            remediations: { 'the-congress-ministries-1937-39': { steps: ['If the student cannot distinguish between the 1935 Act\'s promises and its actual constraints: (1) Re-read the.', '(2) Create a two-column table: "Powers of Congress Ministry" vs.', '"Powers of Governor/Viceroy" using the Act\'s provisions.', '(3) Re-attempt Diagnostic Question 3.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_010', difficulty: 'standard',
          question: 'The Partition of India (1947) refers to the division of British India into two.',
          hint: 'Revisit c12_hist_cbse_11_007 (Congress Ministries 1937-39) and the 1946 election data in.',
          misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was.',
          parts: [
                { id: 'a', prompt: 'On what date did the Muslim League observe Direct Action Day, and in which city did the worst violence initially break out?', answer: 'Direct Action Day was observed on 16 August 1946',
                  options: ['Direct Action Day was observed on 16 August 1946', 'divide and rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily on.' },
                { id: 'b', prompt: 'Why did the Cabinet Mission Plan (1946) fail to prevent Partition, despite proposing a united India with a loose federal structure?', answer: 'The Cabinet Mission Plan failed',
                  options: ['The Cabinet Mission Plan failed', 'British didn\'t want unity', 'divide and rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily on.' },
                { id: 'c', prompt: 'Analyze this excerpt from Mountbatten\'s 3 June 1947 broadcast: "I am sure that all parties will agree that the most urgent task is to find a way of.', answer: 'Mountbatten\'s insistence on speed (transfer by 15 Aug 1947, announced 3 June',
                  options: ['Mountbatten\'s insistence on speed (transfer by 15 Aug 1947, announced 3 June', 'divide and rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily on.' }
          ],
            remediations: { 'partition-was-decided-solely-by': { steps: ['If the student holds the "British conspiracy only" view: Step 1 — Revisit c12_hist_cbse_11_007 (Congress Ministries.', 'Step 2 — Analyze the 1946 election data (source: NCERT Fig.', '11.13 context): Congress 91% of General seats, League 87% of Muslim seats — ask "Could any British Viceroy ignore this.', 'Step 4 — Re-attempt Diagnostic Question 4 to test if the student can now articulate the Congress-League constitutional.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Gandhi\'s fasts in Calcutta (Sept 1947) and Delhi (Jan 1948) were symbolic gestures that did not materially stop Partition violence.".', answer: 'The argument is partially correct but incomplete',
                  options: ['The argument is partially correct but incomplete', 'divide and rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily on.' },
                { id: 'b', prompt: 'Construct a timeline with 8 entries showing the causal chain from the 1946 Cabinet Mission to the 1947 Radcliffe Award, labeling each entry as "Political.', answer: 'A strong timeline: 1',
                  options: ['A strong timeline: 1', 'divide and rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Partition was decided solely by the British "divide and rule" policy and that the Radcliffe Line was drawn arbitrarily on.' }
          ],
            remediations: { 'partition-was-decided-solely-by': { steps: ['If the student holds the "British conspiracy only" view: Step 1 — Revisit c12_hist_cbse_11_007 (Congress Ministries.', 'Step 2 — Analyze the 1946 election data (source: NCERT Fig.', '11.13 context): Congress 91% of General seats, League 87% of Muslim seats — ask "Could any British Viceroy ignore this.', 'Step 4 — Re-attempt Diagnostic Question 4 to test if the student can now articulate the Congress-League constitutional.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_001', difficulty: 'standard',
          question: 'The discovery of the Harappan Civilisation refers to the historical process.',
          hint: 'If unclear why Cunningham missed the Harappan Civilisation, revisit the concept of "Early.',
          misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.',
          parts: [
                { id: 'a', prompt: 'Who was the first Director-General of the Archaeological Survey of India (ASI) and what was his primary archaeological interest that caused him to overlook the.', answer: 'Alexander Cunningham was the first Director-General of the ASI (appointed 1861)',
                  options: ['Alexander Cunningham was the first Director-General of the ASI (appointed 1861)', 'discovered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.' }
          ],
            remediations: { 'the-harappan-civilisation-was-discovered': { steps: ['If the student confuses the sequence or contributions of Cunningham, Marshall, and Wheeler: (1) Re-read the.', '19–21) and create a three-column table: Archaeologist | Year/Role | Key Method/Insight | Limitation.', '(2) Watch the 10-minute video "Harappan Archaeology: From Cunningham to Wheeler" (available on NCERT\'s official YouTube.', '(3) Re-attempt Diagnostic Questions 1–4, writing a one-sentence justification for each answer.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.',
          parts: [
                { id: 'a', prompt: 'Construct a timeline of methodological shifts in Harappan archaeology from 1875 to 2013, annotating each entry with the archaeologist\'s name, their key.', answer: 'A strong timeline would include: 1',
                  options: ['A strong timeline would include: 1', 'discovered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Harappan Civilisation was "discovered" in a single moment by John Marshall in 1924.' }
          ],
            remediations: { 'the-harappan-civilisation-was-discovered': { steps: ['If the student confuses the sequence or contributions of Cunningham, Marshall, and Wheeler: (1) Re-read the.', '19–21) and create a three-column table: Archaeologist | Year/Role | Key Method/Insight | Limitation.', '(2) Watch the 10-minute video "Harappan Archaeology: From Cunningham to Wheeler" (available on NCERT\'s official YouTube.', '(3) Re-attempt Diagnostic Questions 1–4, writing a one-sentence justification for each answer.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
