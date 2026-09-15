import type { SimDef } from '../../engine/types';
import C10_HistoryCivicsPresidentExecutiveLegislativeSim from '../../../simulations/c6_12/C10_HistoryCivicsPresidentExecutiveLegislativeSim';

/** v3 wrapped master — C10_HistoryCivicsPresidentExecutiveLegislativeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_historycivicspresidentexecutivelegislativesim: SimDef = {
    id: 'v3w_c10_historycivicspresidentexecutivelegislativesim',
    title: 'President Executive Legislative',
    subtitle: 'Covers the constitutional and conventional roles of the Opposition in India\'s.',
    classLevel: 10, subject: 'history', topic: 'Role of Opposition Parties in a Democracy',
    chapters: [],
    nodeIds: ['c10_civ_cbse_04_008', 'c10_civ_cbse_02_007', 'c10_civ_cbse_02_009', 'c10_civ_cbse_02_004', 'c10_civ_cbse_01_004', 'c10_civ_cbse_01_005', 'c10_civ_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you are watching a televised Lok Sabha session where the ruling party has 300+ seats and the main.', goal: 'Master President Executive Legislative.' },
    discovery: {
        question: 'A State government refuses to implement a Central law on "Prevention of Cruelty to Animals" (a Concurrent List subject), claiming it violates State autonomy.',
        options: ['The Centre\'s directions are constitutionally valid', 'State can refuse', 'Centre-State relations'],
        answer: 'The Centre\'s directions are constitutionally valid',
        hook: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.',
    },
    teaching: [
        { title: 'The Opposition in a democracy refers to the.', text: 'The Opposition in a democracy refers to the political party or coalition of parties that secures the second-largest number of seats in the legislature and does not form the government; its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_civ_cbse_04_008', title: 'The Opposition in a democracy refers to.',
          scaffold: { problem: 'In the 2019-24 Lok Sabha, the largest opposition party had 52 seats (below the 10% threshold of 54).',
            steps: [
            { text: 'Recall the 10% threshold rule (Direction 121) for official recognition in Lok Sabha.' },
            { text: 'Note that 10% of 543 is 54.3 → 55 seats required; the party had 52.' },
            { text: 'Identify the exception: The Speaker used discretionary power under Direction 121(2) to recognise the leader because the.' },
            { text: 'Analyse the implication: Rules can be flexibly interpreted when democratic legitimacy demands it — but this discretion.' },
            { text: 'Conclude that institutional conventions often matter more than rigid thresholds; the Opposition\'s effectiveness depends.', faded: true, blankAnswer: 'The Speaker exercised discretionary recognition under.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_02_007', title: 'Centre-State relations in Indian.',
          scaffold: { problem: 'The Parliament passes a law on "Public Health and Sanitation" (State List, Entry 6) during a national pandemic, citing Entry 29 of.',
            steps: [
            { text: 'Identify the constitutional entries in conflict — State List Entry 6 (Public Health) vs Concurrent List Entry 29.' },
            { text: 'Recall Article 246 — Parliament has exclusive power on Union List, State on State List, both on Concurrent List.' },
            { text: 'Apply the "pith and substance" doctrine (judicial test) — if the law\'s true character falls under Concurrent Entry 29.' },
            { text: 'Check for emergency provisions — Article 250 allows Parliament to legislate on State List during Emergency (Article.' },
            { text: 'Conclusion — The Central law is valid if its pith and substance is preventing inter-state spread of disease (Concurrent.', faded: true, blankAnswer: 'The Central law is constitutionally valid under Concurrent.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_02_009', title: 'Regionalism in Indian federalism refers.',
          scaffold: { problem: 'The Centre passes a law on "public order" (State List Entry 1) using Article 249 (Rajya Sabha resolution in national interest).',
            steps: [
            { text: 'Identify the subject — "public order" is Entry 1 of State List (List II, Seventh Schedule).' },
            { text: 'Identify the Centre\'s claimed power — Article 249 allows Parliament to legislate on State List subjects if Rajya Sabha.' },
            { text: 'Check procedural compliance — Was the Rajya Sabha resolution passed with 2/3 majority?' },
            { text: 'Apply judicial test — Supreme Court (in cases like State of Rajasthan v.' },
            { text: 'Determine outcome — If procedure followed, Central law prevails under Article 254(1). If not, it is ultra vires.', faded: true, blankAnswer: 'The law is valid if Rajya Sabha passed a valid 2/3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_02_004', title: 'India\'s three-tier system of government.',
          scaffold: { problem: 'A news report states: "The Union Government has directed all State Governments to implement a new model Panchayat law drafted by the.',
            steps: [
            { text: 'Identify the constitutional status of Panchayats — they are created under Article 243B by State Legislature, not by.' },
            { text: 'Recall Article 243G — powers, authority, and responsibilities of Panchayats are determined by *State Legislature* by.' },
            { text: 'Check Union\'s legislative competence — "Local Government" is a State List subject (Entry 5, List II).' },
            { text: 'Consider if Union can issue directions — Article 256 says States must comply with Union laws, but only on matters where.' },
            { text: 'Conclude — The directive is advisory only; States are not constitutionally bound to adopt it.', faded: true, blankAnswer: 'The directive is not constitutionally binding. Panchayats.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_01_004', title: 'Horizontal distribution of power refers.',
          scaffold: { problem: 'The President of India promulgates an Ordinance when Parliament is not in session. The Ordinance makes changes to the Land Acquisition Act.',
            steps: [
            { text: 'Identify the organs involved — President (Executive head) promulgated Ordinance; Parliament (Legislature) did not.' },
            { text: 'Recall constitutional provision — Article 123 allows President to issue Ordinances when Parliament is not in session,.' },
            { text: 'Apply to scenario — Executive used temporary legislative power (Ordinance) because Legislature was unavailable; this is.' },
            { text: 'Analyze the check that operated — Legislature\'s failure to pass the Bill acted as a Legislative check on Executive.' },
            { text: 'Conclude — Horizontal power sharing worked: Executive filled a gap temporarily, but Legislature retained ultimate.', faded: true, blankAnswer: 'Executive promulgated Ordinance under Article 123.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_01_005', title: 'Vertical division of power refers to.',
          scaffold: { problem: 'The Parliament passes a law regulating "Vocational Training" for electricians.',
            steps: [
            { text: 'Identify the subject "Vocational Training" — check the Seventh Schedule.' },
            { text: 'Recall Article 254(1): If a State law conflicts with a Union law on a Concurrent subject, the Union law prevails,.' },
            { text: 'Check for Exception under Article 254(2): If the State law was reserved for President\'s assent and received it, the.' },
            { text: 'Apply to scenario: Unless Tamil Nadu\'s law was reserved for President and got assent (rare), the Parliamentary law.' },
            { text: 'Conclude: The Union law on vocational training will prevail over the Tamil Nadu law due to Article 254(1), unless the.', faded: true, blankAnswer: 'The Parliamentary law prevails under Article 254(1) because.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_civ_cbse_02_007', title: 'Identify each idea',
          dissect: { specimen: 'President Executive Legislative', spots: [
            { id: 's1', label: 'The Opposition in a democracy', prompt: 'Which idea is this? — The Opposition in a democracy refers to the political party or coalition of parties that.', answer: 'The Opposition in a democracy', options: ['The Opposition in a democracy', 'Centre-State relations in Indian federalism', 'Regionalism in Indian federalism refers', 'Indias three-tier system of government'] },
            { id: 's2', label: 'Centre-State relations in Indian federalism', prompt: 'Which idea is this? — Centre-State relations in Indian federalism refer to the constitutional framework.', answer: 'Centre-State relations in Indian federalism', options: ['Centre-State relations in Indian federalism', 'The Opposition in a democracy', 'Regionalism in Indian federalism refers', 'Indias three-tier system of government'] },
            { id: 's3', label: 'Regionalism in Indian federalism refers', prompt: 'Which idea is this? — Regionalism in Indian federalism refers to the assertion of distinct cultural,.', answer: 'Regionalism in Indian federalism refers', options: ['Regionalism in Indian federalism refers', 'The Opposition in a democracy', 'Centre-State relations in Indian federalism', 'Indias three-tier system of government'] },
            { id: 's4', label: 'Indias three-tier system of government', prompt: 'Which idea is this? — India\'s three-tier system of government divides governance powers among the Union.', answer: 'Indias three-tier system of government', options: ['Indias three-tier system of government', 'The Opposition in a democracy', 'Centre-State relations in Indian federalism', 'Regionalism in Indian federalism refers'] },
            { id: 's5', label: 'Horizontal distribution of power refers', prompt: 'Which idea is this? — Horizontal distribution of power refers to the separation of powers among the three.', answer: 'Horizontal distribution of power refers', options: ['Horizontal distribution of power refers', 'The Opposition in a democracy', 'Centre-State relations in Indian federalism', 'Regionalism in Indian federalism refers'] },
            { id: 's6', label: 'Vertical division of power refers', prompt: 'Which idea is this? — Vertical division of power refers to the constitutional distribution of legislative,.', answer: 'Vertical division of power refers', options: ['Vertical division of power refers', 'The Opposition in a democracy', 'Centre-State relations in Indian federalism', 'Regionalism in Indian federalism refers'] }
          ] } }
    ],
    explore: { component: C10_HistoryCivicsPresidentExecutiveLegislativeSim, prompt: 'Explore the interactive — President Executive Legislative' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_008', difficulty: 'standard',
          question: 'The Opposition in a democracy refers to the political party or coalition of.',
          hint: 'Revisit c8_civ_ch2_6 "Functions of Parliament: Lawmaking, Budget, Oversight" and memorise.',
          misconception: 'Students often think the Opposition\'s job is only to "oppose everything the government does" — i.e., blind.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Opposition in a democracy refers to the political party or coalition of parties that',
                  options: ['The Opposition in a democracy refers to the political party or coalition of parties that', 'Centre-State relations in Indian federalism refer to the constitutional framework', 'Regionalism in Indian federalism refers to the assertion of distinct cultural,', 'India\'s three-tier system of government divides governance powers among the Union'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Opposition\'s job is only to "oppose everything the government does" — i.e., blind obstructionism.' }
          ],
            remediations: { 'the-opposition-s-job-is': { steps: ['Re-read the NCERT Class 10 Political Parties chapter section "Role of Opposition" and list the four positive functions.', 'Watch a 15-minute clip of Lok Sabha Question Hour (available on Sansad TV YouTube) and note how Opposition MPs frame.', 'Compare with a no-confidence motion debate transcript to see how the same MPs switch from constructive questioning to.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_007', difficulty: 'standard',
          question: 'Centre-State relations in Indian federalism refer to the constitutional.',
          hint: 'Revisit c10_civ_cbse_02_005 (Distribution of Powers) and Article 254 (repugnancy clause).',
          misconception: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article establishes the Finance Commission and what is its primary function in Centre-State financial relations?', answer: 'Article 280 establishes the Finance Commission',
                  options: ['Article 280 establishes the Finance Commission', 'Centre-State relations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.' },
                { id: 'b', prompt: 'A State government refuses to implement a Central law on "Prevention of Cruelty to Animals" (a Concurrent List subject), claiming it violates State autonomy.', answer: 'The Centre\'s directions are constitutionally valid',
                  options: ['The Centre\'s directions are constitutionally valid', 'State can refuse', 'Centre-State relations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Centre-State relations" means the Centre controls everything and States are mere agents.' }
          ],
            remediations: { 'centre-state-relations-means-the': { steps: ['If the student holds this misconception, do this 3-step remediation: (1) Open the Constitution (or NCERT) to Part XI.', 'Highlight Articles 246 (legislative distribution), 256 (State obligation to Central law), 257 (Centre\'s directions to.', 'Bommai vs Union of India (1994) summary: Supreme Court laid down that Article 356 is subject to judicial review,.', '(3) Write a one-page comparison table: "Central Power" vs "State Autonomy" with article numbers.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_009', difficulty: 'standard',
          question: 'Regionalism in Indian federalism refers to the assertion of distinct cultural,.',
          hint: 'If stuck, revisit c10_civ_cbse_02_005 (Distribution of Powers) for legislative conflicts,.',
          misconception: 'Students often think "regionalism = separatism" and "Centre-State tension = federalism failure." In reality,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Regionalism in Indian federalism refers to the assertion of distinct cultural,',
                  options: ['Regionalism in Indian federalism refers to the assertion of distinct cultural,', 'The Opposition in a democracy refers to the political party or coalition of parties that', 'Centre-State relations in Indian federalism refer to the constitutional framework', 'India\'s three-tier system of government divides governance powers among the Union'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "regionalism = separatism" and "Centre-State tension = federalism failure." In reality, regionalism *created*.' }
          ],
            remediations: { 'regionalism-separatism-and-centre-state': { steps: ['Re-read the S.R. Bommai judgment summary (Class 9 Judiciary node) — it defines "constitutional breakdown" narrowly.', 'List 3 demands for new states (Telangana, Vidarbha, Bodoland) and classify each as "accommodated," "ongoing," or.', 'Trace one GST Council decision (e.g., rate cut on electric vehicles) — note how States and Centre voted.', 'Write one paragraph: "Federalism in India works because tensions are resolved through ______, not because tensions.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_004', difficulty: 'standard',
          question: 'India\'s three-tier system of government divides governance powers among the.',
          hint: 'If stuck, revisit Class 6 "Levels of Government" (c6_civics_ch11_013) and Class 9.',
          misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure,.',
          parts: [
                { id: 'a', prompt: 'Which constitutional amendment acts formally established the third tier of government (Local Self-Government) as a constitutional requirement in India?', answer: 'The 73rd Constitutional Amendment Act (1992) for rural Panchayats and the 74th',
                  options: ['The 73rd Constitutional Amendment Act (1992) for rural Panchayats and the 74th', '42nd Amendment', 'original Constitution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure, like the three.' },
                { id: 'b', prompt: 'Why does the Constitution describe India as a "Union of States" (Article 1) rather than a "Federation of States"?', answer: '"Union of States" indicates that the Union is indestructible while States can be',
                  options: ['"Union of States" indicates that the Union is indestructible while States can be', 'it means the same as federation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure, like the three.' }
          ],
            remediations: { 'the-three-tiers-union': { steps: ['Re-read Article 1 (Union of States) and Articles 243B/243Q (local government creation by State law).', 'Make a two-column table: "Union/State Powers (Original Constitution, Seventh Schedule)" vs.', 'Use a concrete example: "Who can create a new district? State (Article 3). Who can create a new Gram Panchayat?', 'Practice writing: "Local government is a constitutionalised *sub-State* tier, not a federal unit."'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The 73rd and 74th Amendments made local governments truly independent third tier of federalism in India." Support your answer with two.', answer: 'The statement is partially correct but overstated',
                  options: ['The statement is partially correct but overstated', 'yes, they are fully independent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the three tiers (Union, State, Local) are coordinate and equal partners in a federal structure, like the three.' }
          ],
            remediations: { 'the-three-tiers-union': { steps: ['Re-read Article 1 (Union of States) and Articles 243B/243Q (local government creation by State law).', 'Make a two-column table: "Union/State Powers (Original Constitution, Seventh Schedule)" vs.', 'Use a concrete example: "Who can create a new district? State (Article 3). Who can create a new Gram Panchayat?', 'Practice writing: "Local government is a constitutionalised *sub-State* tier, not a federal unit."'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_004', difficulty: 'standard',
          question: 'Horizontal distribution of power refers to the separation of powers among the.',
          hint: 'Revisit c7_civ_ch03_002 (Three Organs) and c8_civ_ch2_12 (Separation of Powers) — focus.',
          misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have.',
          parts: [
                { id: 'a', prompt: 'Name the three organs of government in horizontal power sharing and cite one constitutional article range for each at the Union level.', answer: 'Legislature (Parliament)',
                  options: ['Legislature (Parliament)', 'Prime Minister makes laws', 'make laws'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have majority support.' },
                { id: 'b', prompt: 'A new law passed by Parliament requires all social media platforms to remove "anti-national" content within 24 hours without a court order.', answer: 'Parliament (Legislature) made the law',
                  options: ['Parliament (Legislature) made the law', 'the Ministry made the law', 'make laws'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have majority support.' }
          ],
            remediations: { 'the-prime-minister-and-cabinet': { steps: ['Re-read Article 79 ("There shall be a Parliament...") and Article 75 ("Council of Ministers to aid and advise.', 'Watch a 5-minute Sansad TV clip of Question Hour — see Ministers *answering* to MPs, not commanding them.', 'Write one sentence each: "Only Parliament can ______" (make/amend/repeal laws); "Executive can only ______" (issue.', 'Practice a past board question: "Distinguish between the legislative and executive functions with examples."'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Horizontal power sharing is effective in India because the Judiciary is completely independent and can strike down any law." Consider.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'Judiciary is supreme', 'make laws'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have majority support.' },
                { id: 'b', prompt: 'Create a flowchart showing how a Bill becomes an Act and where each of the three organs exercises its power or check in the process.', answer: 'Flowchart: Bill introduced (Legislature initiates) → Debate/Vote in both Houses',
                  options: ['Flowchart: Bill introduced (Legislature initiates) → Debate/Vote in both Houses', 'make laws'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Prime Minister and Cabinet (Executive) "make laws" because they introduce most Bills and have majority support.' }
          ],
            remediations: { 'the-prime-minister-and-cabinet': { steps: ['Re-read Article 79 ("There shall be a Parliament...") and Article 75 ("Council of Ministers to aid and advise.', 'Watch a 5-minute Sansad TV clip of Question Hour — see Ministers *answering* to MPs, not commanding them.', 'Write one sentence each: "Only Parliament can ______" (make/amend/repeal laws); "Executive can only ______" (issue.', 'Practice a past board question: "Distinguish between the legislative and executive functions with examples."'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_005', difficulty: 'standard',
          question: 'Vertical division of power refers to the constitutional distribution of.',
          hint: 'If stuck, revisit Class 9 node c9_civ_ch1_9 (Federalism and Decentralisation) and Class 6.',
          misconception: 'Students often believe that "Local Government" is a third *federal* tier with its own exclusive list of subjects in the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vertical division of power refers to the constitutional distribution of legislative,',
                  options: ['Vertical division of power refers to the constitutional distribution of legislative,', 'The Opposition in a democracy refers to the political party or coalition of parties that', 'Centre-State relations in Indian federalism refer to the constitutional framework', 'Regionalism in Indian federalism refers to the assertion of distinct cultural,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Local Government" is a third *federal* tier with its own exclusive list of subjects in the Constitution,.' }
          ],
            remediations: { 'local-government-is-a-third': { steps: ['Re-read Article 243G and 243W — note the phrase "subject to the provisions of this Constitution, the Legislature of a.', 'Compare the Seventh Schedule (Union/State/Concurrent Lists) with the Eleventh/Twelfth Schedules — the latter are *only.', 'Analyze a State Panchayati Raj Act (e.g., Karnataka Panchayat Raj Act, 1993) to see how the State Legislature actually.', 'Practice a board-style question: "Distinguish between the constitutional status of State Governments and Local.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_01_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "Local Government" is a third *federal* tier with its own exclusive list of subjects in the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Indian Constitution establishes a federal system with a strong unitary bias." Use the vertical division of powers (legislative,.', answer: 'The statement is accurate',
                  options: ['The statement is accurate', 'Local Government'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "Local Government" is a third *federal* tier with its own exclusive list of subjects in the Constitution,.' }
          ],
            remediations: { 'local-government-is-a-third': { steps: ['Re-read Article 243G and 243W — note the phrase "subject to the provisions of this Constitution, the Legislature of a.', 'Compare the Seventh Schedule (Union/State/Concurrent Lists) with the Eleventh/Twelfth Schedules — the latter are *only.', 'Analyze a State Panchayati Raj Act (e.g., Karnataka Panchayat Raj Act, 1993) to see how the State Legislature actually.', 'Practice a board-style question: "Distinguish between the constitutional status of State Governments and Local.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
