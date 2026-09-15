import type { SimDef } from '../../engine/types';
import C12_HistoryMeerutMutinySim from '../../../simulations/c6_12/C12_HistoryMeerutMutinySim';

/** v3 wrapped master — C12_HistoryMeerutMutinySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historymeerutmutinysim: SimDef = {
    id: 'v3w_c12_historymeerutmutinysim',
    title: 'Meerut Mutiny',
    subtitle: 'Covers the events of 10–11 May 1857 at Meerut and Delhi, the cartridge controversy, the.',
    classLevel: 12, subject: 'history', topic: 'The Mutiny at Meerut: Mangal Pandey, the Greased Cartridges and the Spark',
    chapters: [],
    nodeIds: ['c12_hist_cbse_10_001', 'c12_hist_cbse_10_002', 'c12_hist_cbse_10_003', 'c12_hist_cbse_10_008', 'c12_hist_cbse_10_005', 'c12_hist_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a sepoy in the 3rd Light Cavalry at Meerut on 9 May 1857, watching 85 comrades sentenced to.', goal: 'Master Meerut Mutiny.' },
    discovery: {
        question: 'On what date did the sepoys at Meerut break into open mutiny, and what was the immediate trigger that afternoon?',
        options: ['The mutiny began on 10 May 1857', '31 March 1857 — Mangal Pandey\'s execution', 'the cartridge issue alone'],
        answer: 'The mutiny began on 10 May 1857',
        hook: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.',
    },
    teaching: [
        { title: 'The Mutiny at Meerut (10 May 1857) was the.', text: 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army sepoys in Meerut cantonment triggered by the refusal to use Enfield rifle cartridges rumoured to be greased with cow and pig.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_001', title: 'The Mutiny at Meerut (10 May 1857) was.',
          scaffold: { problem: 'Using the NCERT\'s "pattern of the uprising" (Section 1.1), explain why the mutiny at Aligarh (20 May 1857) followed the same sequence as.',
            steps: [
            { text: 'Identify the communication mechanism — the 7th Awadh Irregular Cavalry wrote to the 48th Native Infantry after refusing.' },
            { text: 'Note the standardised signal — evening gun or bugle call — which required no external coordination, only internal.' },
            { text: 'Map the target sequence — bell of arms (weapons), treasury (resources), government buildings (symbols of authority),.' },
            { text: 'Explain the march to Delhi — once local control was seized, the logical next step was to legitimise the rebellion under.' },
            { text: 'Conclude that the pattern reflects shared military culture, common grievances, and pre-existing networks — not.', faded: true, blankAnswer: 'Aligarh followed the Meerut pattern because (a) sepoy.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_002', title: 'The Spread of the Revolt refers to the.',
          scaffold: { problem: 'Explain how the revolt spread from Meerut to Delhi and then to the Gangetic plain cantonments in May 1857, using the concepts of “signal,”.',
            steps: [
            { text: 'Identify the starting event — Meerut sepoys mutiny on 10 May, seize bell of arms, cut telegraph, ride to Delhi.' },
            { text: 'Describe Delhi’s fall — sepoys arrive 11 May, enter Red Fort, compel Bahadur Shah to accept leadership; Delhi becomes.' },
            { text: 'Note the lull (12–13 May) then the cascade — news of Delhi’s fall triggers mutinies in Aligarh (20 May), Etawah,.' },
            { text: 'Recognise the repeating pattern in each cantonment: evening gun/bugle signal → seize bell of arms → plunder treasury →.' },
            { text: 'Conclude that the pattern’s uniformity points to communication (letters, emissaries, panchayats) rather than pure.', faded: true, blankAnswer: 'The revolt spread through a domino effect: Meerut’s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_003', title: 'Bahadur Shah Zafar (1775–1862), the.',
          scaffold: { problem: 'Using the NCERT text, explain how the events of 11–12 May 1857 at the Red Fort transformed the Meerut mutiny into a political rebellion.',
            steps: [
            { text: 'Identify the trigger — sepoys arrive at Red Fort on 11 May after overnight ride from Meerut.' },
            { text: 'Note the breach of protocol — sepoys enter the fort "without observing the elaborate court etiquette" and demand.' },
            { text: 'Record Bahadur Shah\'s initial "horror and rejection" followed by compliance when he realizes "he had very few options."' },
            { text: 'Explain the legitimizing effect — the revolt "acquired a kind of legitimacy because it could now be carried on in the.' },
            { text: 'Connect to the immediate spread — "Once word spread that Delhi had fallen to the rebels and Bahadur Shah had blessed.', faded: true, blankAnswer: 'The sepoys\' forced entry and demand for blessings converted.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_008', title: 'The Revolt in the Countryside refers to.',
          scaffold: { problem: 'Using the NCERT text and the Azamgarh Proclamation (Source 5), explain why the rebels attacked telegraph lines, revenue records, and.',
            steps: [
            { text: 'Identify the function of each target in colonial governance — telegraph = military/administrative coordination; revenue.' },
            { text: 'Connect to the rebels\' stated goals in the Azamgarh Proclamation — Section I (zemindars) demands light jumas and.' },
            { text: 'Analyze the Shah Mal case — his men "dug up metalled roads" and "destroyed the bridge" to prevent government forces.' },
            { text: 'Contrast with sepoy mutiny targets (bell of arms, white officers) — the countryside added a layer: dismantling the.' },
            { text: 'Conclude that the attacks were a coherent strategy to make the countryside ungovernable by the British and to restore.', faded: true, blankAnswer: 'Rebels attacked telegraph, records, and account books.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_005', title: 'The Awadh Revolt (1857-1858) refers to.',
          scaffold: { problem: 'Explain why the 1857 revolt in Awadh was more widespread and longer-lasting than in other regions, using the concept of "chain of.',
            steps: [
            { text: 'Identify the three linked groups in Awadh\'s chain — Nawab/taluqdars (political), peasants (economic), sepoys (military).' },
            { text: 'Trace the first link: Annexation (1856) deposed the Nawab, dissolving court patronage → cultural/economic loss for.' },
            { text: 'Trace the second link: Summary Settlement dispossessed taluqdars (67%→38% villages), destroying their forts and armed.' },
            { text: 'Trace the third link: Peasants lost taluqdari patronage (remission, loans) and faced 30-70% higher revenue → direct.' },
            { text: 'Trace the fourth link: Sepoys (mostly from Awadh villages) heard family grievances; cartridge rumor became the trigger.' },
            { text: 'Synthesize: The chain meant *no group had a stake in British rule* — unlike regions where zamindars were co-opted.', faded: true, blankAnswer: 'The revolt in Awadh was uniquely widespread because the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_010', title: 'The failure of the 1857 Revolt refers.',
          scaffold: { problem: 'Using the NCERT chapter, explain why the rebel "vision of unity" (Azamgarh Proclamation) could not be translated into a functioning.',
            steps: [
            { text: 'Identify the proclamation\'s target groups — zamindars (Section I), merchants (II), public servants (III), artisans.' },
            { text: 'Recognise the proclamation had NO enforcement mechanism — no tax collectors, no courts, no police, no army paymaster.' },
            { text: 'Contrast with British capacity — the British had the Summary Settlement revenue records, district collectors,.' },
            { text: 'Analyse the time gap — the proclamation was issued 25 August 1857, by which time Delhi had fallen (Sept 1857), Lucknow.' },
            { text: 'Conclude — unity requires INSTITUTIONS to mediate competing claims (e.g., zamindar vs. peasant, merchant vs. artisan).', faded: true, blankAnswer: 'The Azamgarh Proclamation articulated a broad coalition but.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hist_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Meerut Mutiny', spots: [
            { id: 's1', label: 'The Mutiny at Meerut 10', prompt: 'Which idea is this? — The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army sepoys in.', answer: 'The Mutiny at Meerut 10', options: ['The Mutiny at Meerut 10', 'The Spread of the Revolt', 'Bahadur Shah Zafar 17751862 the', 'The Revolt in the Countryside'] },
            { id: 's2', label: 'The Spread of the Revolt', prompt: 'Which idea is this? — The Spread of the Revolt refers to the rapid cascade of mutinies and civilian uprisings.', answer: 'The Spread of the Revolt', options: ['The Spread of the Revolt', 'The Mutiny at Meerut 10', 'Bahadur Shah Zafar 17751862 the', 'The Revolt in the Countryside'] },
            { id: 's3', label: 'Bahadur Shah Zafar 17751862 the', prompt: 'Which idea is this? — Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic and nominal.', answer: 'Bahadur Shah Zafar 17751862 the', options: ['Bahadur Shah Zafar 17751862 the', 'The Mutiny at Meerut 10', 'The Spread of the Revolt', 'The Revolt in the Countryside'] },
            { id: 's4', label: 'The Revolt in the Countryside', prompt: 'Which idea is this? — The Revolt in the Countryside refers to the widespread popular uprising in rural North.', answer: 'The Revolt in the Countryside', options: ['The Revolt in the Countryside', 'The Mutiny at Meerut 10', 'The Spread of the Revolt', 'Bahadur Shah Zafar 17751862 the'] },
            { id: 's5', label: 'The Awadh Revolt 1857-1858 refers', prompt: 'Which idea is this? — The Awadh Revolt (1857-1858) refers to the widespread popular uprising in the kingdom of.', answer: 'The Awadh Revolt 1857-1858 refers', options: ['The Awadh Revolt 1857-1858 refers', 'The Mutiny at Meerut 10', 'The Spread of the Revolt', 'Bahadur Shah Zafar 17751862 the'] },
            { id: 's6', label: 'The failure of the 1857', prompt: 'Which idea is this? — The failure of the 1857 Revolt refers to the inability of the Indian rebel forces —.', answer: 'The failure of the 1857', options: ['The failure of the 1857', 'The Mutiny at Meerut 10', 'The Spread of the Revolt', 'Bahadur Shah Zafar 17751862 the'] }
          ] } }
    ],
    explore: { component: C12_HistoryMeerutMutinySim, prompt: 'Explore the interactive — Meerut Mutiny' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_001', difficulty: 'standard',
          question: 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army.',
          hint: 'Revisit the Subsidiary Alliance in Awadh (c12_hist_cbse_10_006) and the Class 8 summary.',
          misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.',
          parts: [
                { id: 'a', prompt: 'On what date did the sepoys at Meerut break into open mutiny, and what was the immediate trigger that afternoon?', answer: 'The mutiny began on 10 May 1857',
                  options: ['The mutiny began on 10 May 1857', '31 March 1857 — Mangal Pandey\'s execution', 'the cartridge issue alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.' },
                { id: 'b', prompt: 'Why did the rumour about greased cartridges spread so rapidly and resist all British reassurances, despite the British issuing official denials?', answer: 'The rumour resonated',
                  options: ['The rumour resonated', 'sepoys were superstitious', 'British officers were insensitive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.' }
          ],
            remediations: { 'mangal-pandey-s-action-at': { steps: ['If the student conflates Mangal Pandey and Meerut: (1) Re-read NCERT pp.', '264–265 on the Dum Dum khalasi incident and the Barrackpore/Meerut distinction.', '(2) Create a two-column table: "Barrackpore (March 1857)" vs "Meerut (May 1857)" — columns: regiment, trigger, scale,.', '(3) Watch the 5-minute clip "1857: The Sepoy Mutiny Begins" (NCERT official) and note the narrator\'s phrasing: "the.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.',
          parts: [
                { id: 'a', prompt: 'The Azamgarh Proclamation (25 August 1857) promises "light Jumas," "dignity of zemindars," and "trade opened to native merchants." Evaluate whether this.', answer: 'It is primarily a conservative restoration: it appeals to Mughal-era hierarchies',
                  options: ['It is primarily a conservative restoration: it appeals to Mughal-era hierarchies', 'revolutionary', 'purely feudal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Mangal Pandey\'s action at Barrackpore (29 March 1857) directly caused the Meerut mutiny.' }
          ],
            remediations: { 'mangal-pandey-s-action-at': { steps: ['If the student conflates Mangal Pandey and Meerut: (1) Re-read NCERT pp.', '264–265 on the Dum Dum khalasi incident and the Barrackpore/Meerut distinction.', '(2) Create a two-column table: "Barrackpore (March 1857)" vs "Meerut (May 1857)" — columns: regiment, trigger, scale,.', '(3) Watch the 5-minute clip "1857: The Sepoy Mutiny Begins" (NCERT official) and note the narrator\'s phrasing: "the.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_002', difficulty: 'standard',
          question: 'The Spread of the Revolt refers to the rapid cascade of mutinies and civilian.',
          hint: 'If stuck, re-read the “Pattern of the Uprising” section (NCERT pp.',
          misconception: 'Students often believe the revolt spread *only* because sepoys imitated each other spontaneously, ignoring the.',
          parts: [
                { id: 'a', prompt: 'On what date did the Meerut sepoys reach the Red Fort in Delhi, and what immediate action did they demand from Bahadur Shah Zafar?', answer: 'The Meerut sepoys reached the Red Fort on the morning of 11 May 1857',
                  options: ['The Meerut sepoys reached the Red Fort on the morning of 11 May 1857', '10 May', 'they demanded money'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the revolt spread *only* because sepoys imitated each other spontaneously, ignoring the documentary evidence of.' }
          ],
            remediations: { 'the-revolt-spread-only-because': { steps: ['Re-read the “Lines of communication” subsection (NCERT pp.', '260–261) and list every piece of evidence for planning (letters, emissaries, panchayats).', 'Revisit c12_hist_cbse_10_001 to confirm the Meerut trigger and the sepoys’ march to Delhi.', '267) to trace the geographical spread and annotate each centre with its date and leader.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_003', difficulty: 'standard',
          question: 'Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic.',
          hint: 'Revisit the 1803 Treaty of Surji-Anjangaon (Class 8, c8_hist_ch1_9) and the 1856.',
          misconception: 'Students often think Bahadur Shah Zafar *initiated* or *planned* the revolt, picturing him as an active conspirator.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic and nominal',
                  options: ['Bahadur Shah Zafar (1775–1862), the last Mughal emperor, became the symbolic and nominal', 'The Mutiny at Meerut (10 May 1857) was the violent outbreak by Bengal Army sepoys in', 'The Spread of the Revolt refers to the rapid cascade of mutinies and civilian uprisings', 'The Revolt in the Countryside refers to the widespread popular uprising in rural North'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bahadur Shah Zafar *initiated* or *planned* the revolt, picturing him as an active conspirator.' }
          ],
            remediations: { 'bahadur-shah-zafar-initiated-or': { steps: ['If the student holds this misconception, have them re-read the NCERT paragraph on page 262 ("Leaders and followers").', 'Then ask: "Who approached whom?', 'Who set the terms?" Next, compare with Nana Saheb at Kanpur and Rani Lakshmibai at Jhansi (c12_hist_cbse_10_004) — all.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_008', difficulty: 'standard',
          question: 'The Revolt in the Countryside refers to the widespread popular uprising in.',
          hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue systems) and c12_hist_cbse_10_006 (Awadh.',
          misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic.',
          parts: [
                { id: 'a', prompt: 'What were the three main categories of British "symbols of power" attacked by rebels in the countryside, as described in the NCERT chapter?', answer: 'The three main categories were: (1) communication infrastructure',
                  options: ['The three main categories were: (1) communication infrastructure', 'only military targets', 'only religious sites'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' },
                { id: 'b', prompt: 'Compare Shah Mal\'s mobilisation in Barout (pargana Barout, UP) with Maulvi Ahmadullah Shah\'s movement in Awadh.', answer: 'Similarities: (1) Both used existing kinship/religious networks',
                  options: ['Similarities: (1) Both used existing kinship/religious networks', 'local leaders', 'peasant jacquerie'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' },
                { id: 'c', prompt: 'Analyze the Azamgarh Proclamation (Source 5) as a historical source.', answer: 'The sectional structure reveals a deliberate attempt to construct a cross-class,',
                  options: ['The sectional structure reveals a deliberate attempt to construct a cross-class,', 'just a list of complaints', 'peasant jacquerie'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' }
          ],
            remediations: { 'the-countryside-revolt-was-a': { steps: ['If the student holds the "spontaneous peasant jacquerie" misconception: (1) Re-read the Shah Mal case study (NCERT pp.', '263–64) and list his organisational actions: night mobilisation across 84 villages, intelligence network, "hall of.', '(2) Compare with the Azamgarh Proclamation\'s five sections — identify which social group each addresses and what.', '(3) Re-do Diagnostic Question 3 focusing on leadership methods.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_005', difficulty: 'standard',
          question: 'The Awadh Revolt (1857-1858) refers to the widespread popular uprising in the.',
          hint: 'Revisit c12_hist_cbse_10_006 (Annexation of Awadh) for the Subsidiary Alliance mechanics.',
          misconception: 'Students often think the Awadh Revolt was *only* about the taluqdars trying to regain their lost estates, ignoring the.',
          parts: [
                { id: 'a', prompt: 'Why did the removal of the Nawab in 1856 lead to the dissolution of the court culture and loss of livelihood for musicians, poets, artisans, and retainers?', answer: 'The Nawab\'s court was the central patron of Awadh\'s cultural economy',
                  options: ['The Nawab\'s court was the central patron of Awadh\'s cultural economy', 'the British banned cultural activities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Awadh Revolt was *only* about the taluqdars trying to regain their lost estates, ignoring the peasant dimension.' }
          ],
            remediations: { 'the-awadh-revolt-was-only': { steps: ['266-269 (Section 2.2-2.3) focusing on the phrases "ties of loyalty and patronage," "generous father figures," and.', 'Compare Source 3 (Hanwant Singh) and Source 6 (sepoy arzi) — note both mention "faith/religion" AND "land/revenue." 3.', 'Re-do Diagnostic Question 3 with a two-column table: Taluqdar Grievances vs.', 'Peasant Grievances → Shared Grievances.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_010', difficulty: 'standard',
          question: 'The failure of the 1857 Revolt refers to the inability of the Indian rebel.',
          hint: 'If unclear on the narrative, revisit c12_hist_cbse_10_001 (Meerut), c12_hist_cbse_10_002.',
          misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g.,.',
          parts: [
                { id: 'a', prompt: 'A student argues: "The rebels lost because they lacked modern weapons like the Enfield rifle." Using evidence from the NCERT chapter, explain why this.', answer: 'The Enfield rifle was indeed a British advantage, but the NCERT text emphasizes',
                  options: ['The Enfield rifle was indeed a British advantage, but the NCERT text emphasizes', 'lack of unity', 'Hindus and Muslims didn\'t cooperate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g., "Hindus and Muslims.' }
          ],
            remediations: { 'the-1857-revolt-failed-primarily': { steps: ['If the student conflates "lack of unity" with communal division or betrayal: 1.', 'Re-read NCERT pages 271–272 (Section 3.1 "The vision of unity") and 277–278 (Section 4 "Repression") to identify THREE.', 'Create a two-column table: "Rebel Capabilities" vs.', '"British Capabilities" for command, communication, logistics, finance, diplomacy.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g.,.',
          parts: [
                { id: 'a', prompt: 'Historian Eric Stokes argues the 1857 Revolt was "a traditionalist movement that failed because it looked backward to a vanished world." Evaluate this.', answer: 'Stokes\' interpretation is PARTIALLY valid but incomplete',
                  options: ['Stokes\' interpretation is PARTIALLY valid but incomplete', 'lack of unity', 'Hindus and Muslims didn\'t cooperate', 'princes betrayed the cause'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the 1857 Revolt failed primarily because of "lack of unity" in a vague, moral sense — e.g., "Hindus and Muslims.' }
          ],
            remediations: { 'the-1857-revolt-failed-primarily': { steps: ['If the student conflates "lack of unity" with communal division or betrayal: 1.', 'Re-read NCERT pages 271–272 (Section 3.1 "The vision of unity") and 277–278 (Section 4 "Repression") to identify THREE.', 'Create a two-column table: "Rebel Capabilities" vs.', '"British Capabilities" for command, communication, logistics, finance, diplomacy.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
